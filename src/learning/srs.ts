/**
 * Ripetizione distanziata con FSRS (libreria ts-fsrs, licenza MIT) dietro un'interfaccia nostra, come in SEIMAFI:
 * il resto dell'app usa solo `review`, `dueCards`, `retrievability`, `forecast`, `rebuildSrs`.
 *
 * Schede (ARCHITETTURA §3–4):
 *   `passo:<id>`            un passo di dimostrazione (id del passo, p. es. `passo:d071.3`)
 *   `rubrica:<arg>:<voce>`  una voce della rubrica dell'orale (dalle simulazioni)
 *   `disegno:<arg>`         il disegno alla lavagna (checklist degli elementi obbligatori)
 *
 * Esito → voto FSRS (gli errori tornano prima):
 *   sbagliato / fermato → Again (torna domani) · esitante → Hard · giusto → Good · giusto con sicurezza ≥ 4 → Easy.
 * Il livello 1 (lezione guidata) si registra ma NON programma. Voci di rubrica: 1 → Good, ½ → Hard, 0 → Again;
 * il «passo mancante» segnalato in una simulazione dà Again alla sua scheda. Disegno: tutti gli elementi obbligatori
 * → Good, altrimenti Again. Le previsioni si registrano ma non si programmano.
 * Parametri: ritenzione 0,9, senza fuzz e senza passi a breve termine (l'unità dell'app è il giorno).
 */
import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from 'ts-fsrs';
import type { AppState, Esito, PassoLog, RichiamoLog, SimLog } from '../storage/store';

export const SRS_PARAMS = generatorParameters({ request_retention: 0.9, enable_fuzz: false, enable_short_term: false });
const scheduler = fsrs(SRS_PARAMS);
const DAY = 86400000;

export interface StoredCard {
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number;
  last_review?: string;
  /** argomento a cui la scheda appartiene */
  arg: string;
  lastGrade?: number;
}

export type CardId = `passo:${string}` | `rubrica:${string}` | `disegno:${string}`;

const toCard = (s: StoredCard): Card => ({
  due: new Date(s.due),
  stability: s.stability,
  difficulty: s.difficulty,
  elapsed_days: s.elapsed_days,
  scheduled_days: s.scheduled_days,
  learning_steps: s.learning_steps,
  reps: s.reps,
  lapses: s.lapses,
  state: s.state as State,
  last_review: s.last_review ? new Date(s.last_review) : undefined,
});
const fromCard = (c: Card, arg: string, grade?: number): StoredCard => ({
  due: c.due.toISOString(),
  stability: c.stability,
  difficulty: c.difficulty,
  elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
  state: c.state,
  last_review: c.last_review?.toISOString(),
  arg,
  lastGrade: grade,
});

/** Esito di un passo → voto FSRS. */
export function gradeEsito(esito: Esito, sicurezza?: number): Grade {
  if (esito === 'sbagliato' || esito === 'fermato') return Rating.Again;
  if (esito === 'esitante') return Rating.Hard;
  return (sicurezza ?? 0) >= 4 ? Rating.Easy : Rating.Good;
}
/** Punti di una voce di rubrica → voto FSRS. */
export const gradePunti = (p: number): Grade => (p >= 1 ? Rating.Good : p > 0 ? Rating.Hard : Rating.Again);

/** Aggiorna (o crea) la scheda dopo un ripasso. */
export function review(prev: StoredCard | undefined, grade: Grade, now: Date, arg: string): StoredCard {
  const card = prev ? toCard(prev) : createEmptyCard(now);
  const next = scheduler.next(card, now, grade).card;
  if (grade === Rating.Again) {
    // un errore torna il giorno dopo (la stabilità resta quella calcolata da FSRS)
    next.due = new Date(now.getTime() + DAY);
    next.scheduled_days = 1;
  }
  return fromCard(next, arg, grade);
}

/** Probabilità di ricordare ora (0–1); 0 per una scheda mai ripassata. */
export function retrievability(c: StoredCard | undefined, now: Date): number {
  if (!c || !c.last_review) return 0;
  const r = scheduler.get_retrievability(toCard(c), now, false);
  return Number.isFinite(r) ? Math.max(0, Math.min(1, r)) : 0;
}

const put = (s: AppState, id: CardId, grade: Grade, at: string, arg: string): AppState => ({ ...s, srs: { ...s.srs, [id]: review(s.srs[id] as StoredCard | undefined, grade, new Date(at), arg) } });

export function schedulePasso(s: AppState, p: PassoLog): AppState {
  if (p.livello === 1) return s;
  return put(s, `passo:${p.passoId}`, gradeEsito(p.esito, p.sicurezza), p.at, p.argId);
}

export const isScheduledRichiamo = (qid: string) => qid.startsWith('disegno:');
export function scheduleRichiamo(s: AppState, r: RichiamoLog): AppState {
  if (!isScheduledRichiamo(r.qid)) return s;
  return put(s, r.qid as CardId, r.corretto ? Rating.Good : Rating.Again, r.at, r.argId);
}

export function scheduleSim(s: AppState, sim: SimLog): AppState {
  let n = s;
  for (const [voce, punti] of Object.entries(sim.voci)) n = put(n, `rubrica:${sim.argId}:${voce}`, gradePunti(punti), sim.at, sim.argId);
  if (sim.passoMancante && /^d\d{3}\.\d+$/.test(sim.passoMancante)) n = put(n, `passo:${sim.passoMancante}`, Rating.Again, sim.at, sim.argId);
  return n;
}

export const cardsOf = (state: AppState) => Object.entries(state.srs) as [CardId, StoredCard][];
export const card = (state: AppState, id: CardId) => state.srs[id] as StoredCard | undefined;

/** Schede scadute a `now`, dalla meno ricordata. */
export function dueCards(state: AppState, now: Date, prefix?: 'passo' | 'rubrica' | 'disegno'): { id: CardId; card: StoredCard; r: number }[] {
  return cardsOf(state)
    .filter(([id, c]) => (!prefix || id.startsWith(prefix + ':')) && new Date(c.due) <= now)
    .map(([id, card]) => ({ id, card, r: retrievability(card, now) }))
    .sort((x, y) => x.r - y.r || x.id.localeCompare(y.id));
}

/** Numero di schede in scadenza per ciascuno dei prossimi `days` giorni (il giorno 0 comprende le arretrate). */
export function forecast(state: AppState, now: Date, days = 14): number[] {
  const out = Array(days).fill(0);
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  for (const [, c] of cardsOf(state)) {
    const d = Math.floor((new Date(c.due).getTime() - start.getTime()) / DAY);
    const i = Math.max(0, d);
    if (i < days) out[i]++;
  }
  return out;
}

/** Ricostruisce tutte le schede dalla storia (dopo una fusione, un import, all'avvio). `before`: solo eventi precedenti. */
export function rebuildSrs(state: AppState, before?: string): AppState {
  type Ev = { at: string; f: (s: AppState) => AppState };
  const ok = (at: string) => !before || at < before;
  const events: Ev[] = [
    ...state.passi.filter((p) => ok(p.at)).map((p) => ({ at: p.at, f: (s: AppState) => schedulePasso(s, p) })),
    ...state.richiami.filter((r) => ok(r.at)).map((r) => ({ at: r.at, f: (s: AppState) => scheduleRichiamo(s, r) })),
    ...state.simulazioni.filter((m) => ok(m.at)).map((m) => ({ at: m.at, f: (s: AppState) => scheduleSim(s, m) })),
  ].sort((x, y) => x.at.localeCompare(y.at));
  let s: AppState = { ...state, srs: {} };
  for (const e of events) s = e.f(s);
  return s;
}

export { Rating, State };
