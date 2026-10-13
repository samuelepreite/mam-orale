/**
 * Sincronizzazione dei progressi sull'account dello studente (come SEIMAFI).
 *
 * Sulla pagina pubblicata in claude.ai la capability `db` offre a ogni utente uno spazio privato
 * (`data/users/<id>/…`). Lì salviamo la storia; localStorage resta come copia locale e per l'uso offline.
 * Fuori da claude.ai (sviluppo, file singolo) la sincronizzazione non c'è.
 *
 * Scelte:
 *  - si sincronizza solo la STORIA: le schede FSRS si ricalcolano (`rebuildSrs`), così due dispositivi non possono
 *    avere schede incoerenti;
 *  - fusione per unione: passi, richiami e simulazioni per id (per le simulazioni vince l'ultima modifica);
 *    lezioni: passo massimo, riscontri più recenti; argomenti: prima visita, livello massimo; impostazioni: le più recenti;
 *  - «Azzera» registra `resetAt`: la fusione scarta tutto ciò che è precedente, anche sugli altri dispositivi;
 *  - documenti a blocchi di dimensione fissa (limite 256 KiB per documento): `core`, `pas-<i>`, `ric-<i>`, `sim-<i>`;
 *  - prima di ogni scrittura si rilegge e si fonde (lettura → fusione → scrittura); si scrivono solo i documenti cambiati.
 */
import type { AppState, ArgomentoState, LezioneState, PassoLog, RichiamoLog, SimLog } from './store';
import { SCHEMA_VERSION } from './store';

export const PAS_CHUNK = 400;
export const RIC_CHUNK = 500;
export const SIM_CHUNK = 8;
/** lunghezze massime salvate (una simulazione resta sotto i 25 KB, un blocco sotto i 256 KiB) */
export const MAX_TESTO = 5000;
export const MAX_RISPOSTA = 2000;
export const MAX_NOTA = 1000;

export type Docs = Record<string, Record<string, unknown>>;

const maxIso = (a?: string, b?: string) => (!a ? b : !b ? a : a > b ? a : b);
const minIso = (a?: string, b?: string) => (!a ? b : !b ? a : a < b ? a : b);
const simAt = (s: SimLog) => s.aggiornatoAt ?? s.at;

/** Fonde due stati (stesso studente, due dispositivi). Le schede FSRS vanno ricalcolate dopo. */
export function mergeStates(a: AppState, b: AppState): AppState {
  const resetAt = maxIso(a.meta?.resetAt, b.meta?.resetAt);
  const after = (iso?: string) => !resetAt || (!!iso && iso >= resetAt);

  const passi = new Map<string, PassoLog>();
  for (const x of [...a.passi, ...b.passi]) if (after(x.at)) passi.set(x.id, x);
  const richiami = new Map<string, RichiamoLog>();
  for (const x of [...a.richiami, ...b.richiami]) if (after(x.at)) richiami.set(x.id, x);
  const sims = new Map<string, SimLog>();
  for (const x of [...a.simulazioni, ...b.simulazioni]) {
    if (!after(x.at)) continue;
    const prev = sims.get(x.id);
    if (!prev || simAt(x) > simAt(prev)) sims.set(x.id, x);
  }

  const argomenti: Record<string, ArgomentoState> = {};
  for (const src of [a.argomenti, b.argomenti])
    for (const [id, s] of Object.entries(src ?? {})) {
      if (s.vistoAt && !after(s.vistoAt)) continue;
      const prev = argomenti[id];
      argomenti[id] = !prev ? { ...s } : { vistoAt: minIso(prev.vistoAt, s.vistoAt), livello: Math.max(prev.livello, s.livello) as 1 | 2 | 3 };
    }

  const lezioni: Record<string, LezioneState> = {};
  for (const src of [a.lezioni, b.lezioni])
    for (const [id, l] of Object.entries(src ?? {})) {
      if (!after(l.startedAt)) continue;
      const prev = lezioni[id];
      if (!prev) {
        lezioni[id] = { ...l, feedback: { ...l.feedback } };
        continue;
      }
      const feedback = { ...prev.feedback };
      for (const [k, f] of Object.entries(l.feedback ?? {})) if (!feedback[k] || feedback[k].at < f.at) feedback[k] = f;
      lezioni[id] = { passo: Math.max(prev.passo, l.passo), startedAt: minIso(prev.startedAt, l.startedAt)!, doneAt: minIso(prev.doneAt, l.doneAt), feedback };
    }

  const aNewer = (a.meta?.settingsAt ?? '') >= (b.meta?.settingsAt ?? '');
  const byAt = <T extends { at: string; id: string }>(x: T, y: T) => x.at.localeCompare(y.at) || x.id.localeCompare(y.id);
  return {
    version: SCHEMA_VERSION,
    settings: aNewer ? a.settings : b.settings,
    passi: [...passi.values()].sort(byAt),
    richiami: [...richiami.values()].sort(byAt),
    simulazioni: [...sims.values()].sort(byAt),
    argomenti,
    lezioni,
    srs: {},
    meta: { settingsAt: aNewer ? a.meta?.settingsAt : b.meta?.settingsAt, resetAt },
  };
}

/** Stato → documenti del database (blocchi di dimensione fissa). */
export function toDocs(s: AppState): Docs {
  const docs: Docs = {};
  const chunk = <T>(prefix: string, list: T[], size: number) => {
    const n = Math.ceil(list.length / size);
    for (let i = 0; i < n; i++) docs[`${prefix}-${i}`] = { items: list.slice(i * size, (i + 1) * size) };
    return n;
  };
  const nP = chunk('pas', s.passi, PAS_CHUNK);
  const nR = chunk('ric', s.richiami, RIC_CHUNK);
  const nS = chunk('sim', s.simulazioni, SIM_CHUNK);
  docs.core = { v: SCHEMA_VERSION, settings: s.settings, lezioni: s.lezioni, argomenti: s.argomenti, meta: s.meta ?? {}, chunks: { pas: nP, ric: nR, sim: nS } };
  return docs;
}

/** Documenti → stato (senza schede FSRS). Documenti mancanti o malformati vengono ignorati. */
export function fromDocs(docs: Docs, base: AppState): AppState | null {
  const core = docs.core as { settings?: AppState['settings']; lezioni?: AppState['lezioni']; argomenti?: AppState['argomenti']; meta?: AppState['meta'] } | undefined;
  if (!core) return null;
  const items = <T>(prefix: string) =>
    Object.keys(docs)
      .filter((k) => k.startsWith(prefix + '-'))
      .sort((x, y) => Number(x.split('-')[1]) - Number(y.split('-')[1]))
      .flatMap((k) => (Array.isArray(docs[k]?.items) ? (docs[k].items as T[]) : []));
  return {
    ...base,
    settings: { ...base.settings, ...(core.settings ?? {}) },
    lezioni: core.lezioni ?? {},
    argomenti: core.argomenti ?? {},
    meta: core.meta ?? {},
    passi: items<PassoLog>('pas'),
    richiami: items<RichiamoLog>('ric'),
    simulazioni: items<SimLog>('sim'),
    srs: {},
  };
}

/** Documenti da scrivere: solo quelli cambiati rispetto all'ultima versione nota del server. */
export function changedDocs(next: Docs, known: Record<string, string>): string[] {
  return Object.keys(next).filter((k) => JSON.stringify(next[k]) !== known[k]);
}

// ------------------------------------------------------------------ adattatore per la capability `db`

interface DocSnap {
  id: string;
  exists: boolean;
  data(): Record<string, unknown> | undefined;
}
interface DbLike {
  collection(path: string): { get(): Promise<{ docs: DocSnap[] }>; doc(id: string): { set(d: Record<string, unknown>): Promise<void> } };
}
interface ClaudeLike {
  use(name: string): Promise<unknown>;
}

export interface CloudStore {
  pull(): Promise<Docs>;
  push(docs: Docs, ids: string[]): Promise<void>;
}

/** Collega lo spazio privato dell'utente; `null` se la pagina non gira su claude.ai o l'utente non può scrivere. */
export async function connectCloud(): Promise<CloudStore | null> {
  const claude = (globalThis as unknown as { claude?: ClaudeLike }).claude;
  if (!claude?.use) return null;
  try {
    const [db, user] = (await Promise.all([claude.use('db'), claude.use('user')])) as [DbLike | null, { id(): Promise<string | null> } | null];
    if (!db || !user) return null;
    const uid = await user.id();
    if (!uid) return null;
    return cloudFromDb(db, uid);
  } catch {
    return null;
  }
}

export function cloudFromDb(db: DbLike, uid: string): CloudStore {
  const col = db.collection(`data/users/${uid}`);
  return {
    async pull() {
      const snap = await col.get();
      const out: Docs = {};
      for (const d of snap.docs) if (d.exists) out[d.id] = d.data() ?? {};
      return out;
    },
    async push(docs, ids) {
      const order = [...ids.filter((i) => i !== 'core'), ...ids.filter((i) => i === 'core')];
      for (const id of order) await col.doc(id).set(docs[id]); // uno alla volta (regola del db)
    },
  };
}

// ------------------------------------------------------------------ controllore (lettura → fusione → scrittura)

export type SyncStatus = 'locale' | 'collegamento' | 'sincronizzato' | 'errore';

/** Chiave della storia: due stati con la stessa chiave non hanno nulla da sincronizzare. */
export const historyKey = (s: AppState) => JSON.stringify(toDocs(s));

export class SyncController {
  private known: Record<string, string> = {};
  private timer: ReturnType<typeof setTimeout> | null = null;
  private running: Promise<void> | null = null;
  private again = false;
  lastKey = '';

  constructor(
    private store: CloudStore,
    private getState: () => AppState,
    private setState: (s: AppState) => void,
    /** ricalcola ciò che non si sincronizza (schede FSRS) */
    private finalize: (s: AppState) => AppState,
    private onStatus: (s: SyncStatus, detail?: string) => void,
    private empty: () => AppState,
    private delayMs = 2500,
  ) {}

  sync(): Promise<void> {
    if (this.running) {
      this.again = true;
      return this.running;
    }
    this.running = this.cycle().finally(() => {
      this.running = null;
      if (this.again) {
        this.again = false;
        void this.sync();
      }
    });
    return this.running;
  }

  schedule() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = null;
      void this.sync();
    }, this.delayMs);
  }

  private async cycle() {
    try {
      const docs = await this.store.pull();
      this.known = Object.fromEntries(Object.entries(docs).map(([k, v]) => [k, JSON.stringify(v)]));
      const remote = fromDocs(docs, this.empty());
      const cur = this.getState();
      const merged = remote ? this.finalize(mergeStates(cur, remote)) : cur;
      const key = historyKey(merged);
      if (key !== historyKey(cur)) this.setState(merged);
      const next = toDocs(merged);
      const ids = changedDocs(next, this.known);
      if (ids.length) {
        await this.store.push(next, ids);
        for (const id of ids) this.known[id] = JSON.stringify(next[id]);
      }
      this.lastKey = key;
      this.onStatus('sincronizzato');
    } catch (e) {
      const code = (e as { code?: string })?.code;
      this.onStatus('errore', code === 'quota_exceeded' ? 'spazio esaurito sul server' : code === 'revoked' || code === 'not_granted' ? 'accesso non disponibile' : 'connessione non riuscita, riprovo più tardi');
    }
  }
}
