/**
 * Padronanza, ripassi riusciti e livello di fading (scelte didattiche, dichiarate qui e in «Come funziona»):
 *
 * - padronanza di un argomento = media pesata della ritenibilità FSRS dei suoi passi (passi chiave × 2) e delle voci
 *   di rubrica già valutate in simulazione (peso della voce). Un passo mai ripassato vale 0; un passo il cui ultimo
 *   esito è stato sbagliato/fermato vale 0 finché non lo si rifà giusto (subito dopo un ripasso FSRS darebbe 1 anche
 *   a un errore).
 * - padronanza di capitolo = media degli argomenti del capitolo pesata col peso d'orale (formulazioni; «non nella
 *   dispensa» a metà); gli argomenti in preparazione contano 0.
 * - livello di fading di una dimostrazione: 1 (lezione guidata) → 2 dopo la lezione → 3 quando tutti i passi chiave
 *   hanno ritenibilità ≥ SOGLIA_FADING (0,9) e l'ultimo esito di ciascuno è giusto; torna a 2 se l'ultimo tentativo
 *   di un passo chiave è sbagliato o fermato.
 * - livello 2 a due fasi: prima si nascondono i passi non chiave; quando sono tutti riusciti almeno una volta
 *   (ultimo esito giusto o esitante) si nascondono anche i chiave.
 * - ripasso riuscito di un argomento: un giro dell'allenatore o della sessione (livello ≥ 2) su una sua dimostrazione,
 *   con almeno 2 passi (o tutti, se sono meno), almeno il 75 % giusti o esitanti e nessun passo chiave sbagliato o
 *   fermato; oppure una simulazione con punteggio ≥ 60 %. Si contano i GIORNI distinti con un ripasso riuscito.
 */
import type { Argomento, CapId, Dimostrazione } from '../content/types';
import type { AppState, PassoLog } from '../storage/store';
import { CATALOGO, argDi, dimsDi, passiDi, pesoOrale, type Catalogo } from './catalogo';
import { rubricaDi, punteggio } from './rubrica';
import { card, retrievability, Rating } from './srs';

export const SOGLIA_FADING = 0.9;
export const SOGLIA_PADRONANZA = 0.8;
export const SOGLIA_GIRO = 0.75;
export const SOGLIA_SIM = 0.6;

const dayKey = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

/** valore di un passo per la padronanza (0–1) */
export function valorePasso(state: AppState, passoId: string, now: Date): number {
  const c = card(state, `passo:${passoId}`);
  if (!c || c.lastGrade === Rating.Again) return 0;
  return retrievability(c, now);
}

export function padronanzaArgomento(state: AppState, a: Argomento, now: Date = new Date(), cat: Catalogo = CATALOGO): number {
  if (!a.contenuto) return 0;
  let w = 0;
  let s = 0;
  for (const { passo } of passiDi(cat, a)) {
    const k = passo.chiave ? 2 : 1;
    w += k;
    s += k * valorePasso(state, passo.id, now);
  }
  for (const v of rubricaDi(a, cat)) {
    const c = card(state, `rubrica:${a.id}:${v.id}`);
    if (!c) continue;
    w += v.peso;
    s += v.peso * (c.lastGrade === Rating.Again ? 0 : retrievability(c, now));
  }
  return w > 0 ? s / w : 0;
}

export function padronanze(state: AppState, now: Date = new Date(), cat: Catalogo = CATALOGO): Record<string, number> {
  return Object.fromEntries(cat.argomenti.map((a) => [a.id, padronanzaArgomento(state, a, now, cat)]));
}

export interface CapitoloPadronanza {
  cap: CapId;
  padronanza: number;
  pronti: number;
  totale: number;
}
export function padronanzaCapitoli(state: AppState, now: Date = new Date(), cat: Catalogo = CATALOGO, pad = padronanze(state, now, cat)): CapitoloPadronanza[] {
  const caps: CapId[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];
  return caps.map((cap) => {
    const as = cat.argomenti.filter((a) => a.cap === cap);
    const W = as.reduce((t, a) => t + pesoOrale(a), 0);
    return { cap, padronanza: W > 0 ? as.reduce((t, a) => t + pesoOrale(a) * (pad[a.id] ?? 0), 0) / W : 0, pronti: as.filter((a) => a.contenuto).length, totale: as.length };
  });
}

/** ultimo esito (livello ≥ 2) di ciascun passo */
export function ultimiEsiti(state: AppState): Map<string, PassoLog> {
  const m = new Map<string, PassoLog>();
  for (const p of state.passi) {
    if (p.livello < 2) continue;
    const prev = m.get(p.passoId);
    if (!prev || prev.at <= p.at) m.set(p.passoId, p);
  }
  return m;
}

export function livelloDim(state: AppState, argId: string, dim: Dimostrazione, now: Date = new Date(), ultimi = ultimiEsiti(state)): 1 | 2 | 3 {
  const lezione = !!state.lezioni[argId]?.doneAt || !!state.argomenti[argId]?.vistoAt;
  const chiavi = dim.passi.filter((p) => p.chiave);
  const fatti = dim.passi.some((p) => ultimi.has(p.id));
  if (!lezione && !fatti) return 1;
  if (!chiavi.length) return 2;
  const sbagliato = chiavi.some((p) => {
    const u = ultimi.get(p.id);
    return u && (u.esito === 'sbagliato' || u.esito === 'fermato');
  });
  if (sbagliato) return 2;
  const tutti = chiavi.every((p) => ultimi.get(p.id)?.esito === 'giusto' && valorePasso(state, p.id, now) >= SOGLIA_FADING);
  return tutti ? 3 : 2;
}

/** Fase del livello 2: 'non-chiave' (si nascondono solo i passi non chiave) o 'tutti'. */
export function faseLivello2(state: AppState, dim: Dimostrazione, ultimi = ultimiEsiti(state)): 'non-chiave' | 'tutti' {
  const nonChiave = dim.passi.filter((p) => !p.chiave);
  if (!nonChiave.length) return 'tutti';
  return nonChiave.every((p) => {
    const e = ultimi.get(p.id)?.esito;
    return e === 'giusto' || e === 'esitante';
  })
    ? 'tutti'
    : 'non-chiave';
}

/** Passi nascosti al livello 2 nella fase data. */
export const passiNascosti = (dim: Dimostrazione, fase: 'non-chiave' | 'tutti') => new Set(dim.passi.filter((p) => fase === 'tutti' || !p.chiave).map((p) => p.id));

/** Un giro (stesso `giro`) è riuscito? */
export function giroRiuscito(logs: PassoLog[], dim: Dimostrazione): boolean {
  const chiave = new Set(dim.passi.filter((p) => p.chiave).map((p) => p.id));
  const min = Math.min(2, dim.passi.length);
  if (logs.length < min) return false;
  const ok = logs.filter((l) => l.esito === 'giusto' || l.esito === 'esitante').length;
  if (ok / logs.length < SOGLIA_GIRO) return false;
  return !logs.some((l) => chiave.has(l.passoId) && (l.esito === 'sbagliato' || l.esito === 'fermato'));
}

/** Giorni (yyyy-m-d) con un ripasso riuscito, per argomento. */
export function giorniRipasso(state: AppState, cat: Catalogo = CATALOGO): Record<string, Set<string>> {
  const out: Record<string, Set<string>> = {};
  const add = (arg: string, at: string) => (out[arg] ??= new Set()).add(dayKey(at));
  const giri = new Map<string, PassoLog[]>();
  for (const p of state.passi) {
    if (p.livello < 2 || !p.giro || p.dove === 'recupero') continue;
    const k = `${p.giro}|${p.dimId}`;
    const l = giri.get(k);
    if (l) l.push(p);
    else giri.set(k, [p]);
  }
  for (const logs of giri.values()) {
    const dim = cat.dimostrazioni[logs[0].dimId];
    if (dim && giroRiuscito(logs, dim)) add(logs[0].argId, logs[logs.length - 1].at);
  }
  for (const s of state.simulazioni) {
    const a = argDi(cat, s.argId);
    if (a && punteggio(rubricaDi(a, cat), s.voci) >= SOGLIA_SIM) add(s.argId, s.at);
  }
  return out;
}
export function ripassiRiusciti(state: AppState, cat: Catalogo = CATALOGO): Record<string, number> {
  return Object.fromEntries(Object.entries(giorniRipasso(state, cat)).map(([k, v]) => [k, v.size]));
}

export type StatoArgomento = 'in-preparazione' | 'da-fare' | 'in-corso' | 'padroneggiato';
export const STATO_TESTO: Record<StatoArgomento, string> = { 'in-preparazione': 'in preparazione', 'da-fare': 'da fare', 'in-corso': 'in corso', padroneggiato: 'padroneggiato' };

export function statoArgomento(state: AppState, a: Argomento, padronanza: number, ripassi: number): StatoArgomento {
  if (!a.contenuto) return 'in-preparazione';
  const toccato = !!state.argomenti[a.id]?.vistoAt || !!state.lezioni[a.id] || state.passi.some((p) => p.argId === a.id);
  if (!toccato) return 'da-fare';
  return padronanza >= SOGLIA_PADRONANZA && ripassi >= state.settings.ripassiObiettivo ? 'padroneggiato' : 'in-corso';
}

/** Calibrazione (metacognizione): per ciascuna sicurezza 1–5, quota di passi riusciti (esitante = ½). */
export function calibrazione(state: AppState) {
  return [1, 2, 3, 4, 5].map((c) => {
    const ps = state.passi.filter((p) => p.livello >= 2 && p.sicurezza === c);
    const v = ps.reduce((s, p) => s + (p.esito === 'giusto' ? 1 : p.esito === 'esitante' ? 0.5 : 0), 0);
    return { sicurezza: c, n: ps.length, riuscita: ps.length ? v / ps.length : null };
  });
}

export const dimsArg = dimsDi;
