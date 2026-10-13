/**
 * Transizioni di stato dell'app (pure): registrano un evento e aggiornano la ripetizione distanziata.
 * La UI chiama solo queste funzioni, così la logica è testabile senza interfaccia.
 */
import type { AppState, PassoLog, Riscontro, RichiamoLog, SimLog } from '../storage/store';
import { defaultState, newId } from '../storage/store';
import { MAX_NOTA, MAX_RISPOSTA, MAX_TESTO } from '../storage/sync';
import { rebuildSrs, schedulePasso, scheduleRichiamo, scheduleSim } from './srs';

const nowIso = () => new Date().toISOString();

export function addPasso(s: AppState, p: Omit<PassoLog, 'id' | 'at'> & { id?: string; at?: string }): AppState {
  const log: PassoLog = { ...p, id: p.id ?? newId(), at: p.at ?? nowIso() };
  let n: AppState = { ...s, passi: [...s.passi, log] };
  if (log.livello >= 2) {
    const prev = n.argomenti[log.argId];
    n = { ...n, argomenti: { ...n.argomenti, [log.argId]: { vistoAt: prev?.vistoAt ?? log.at, livello: Math.max(prev?.livello ?? 1, log.livello) as 1 | 2 | 3 } } };
  }
  return schedulePasso(n, log);
}

export function addPassi(s: AppState, ps: (Omit<PassoLog, 'id' | 'at'> & { at?: string })[]): AppState {
  return ps.reduce((acc, p) => addPasso(acc, p), s);
}

export function addRichiamo(s: AppState, r: Omit<RichiamoLog, 'id' | 'at'> & { at?: string }): AppState {
  const log: RichiamoLog = { ...r, id: newId(), at: r.at ?? nowIso() };
  return scheduleRichiamo({ ...s, richiami: [...s.richiami, log] }, log);
}

/** tronca i testi liberi (limite di dimensione dei documenti sincronizzati) */
function limita(x: SimLog): SimLog {
  return {
    ...x,
    testo: x.testo ? x.testo.slice(0, MAX_TESTO) : undefined,
    nota: x.nota ? x.nota.slice(0, MAX_NOTA) : undefined,
    daNonDire: x.daNonDire.slice(0, 10).map((d) => d.slice(0, 300)),
    passoMancante: x.passoMancante?.slice(0, 300),
    catena: x.catena.slice(0, 3).map((c) => ({ ...c, domanda: c.domanda.slice(0, 600), risposta: c.risposta?.slice(0, MAX_RISPOSTA) })),
  };
}

/** Registra una simulazione (nuova) e aggiorna le schede delle voci di rubrica e del passo mancante. */
export function addSimulazione(s: AppState, sim: Omit<SimLog, 'id' | 'at'> & { id?: string; at?: string }): AppState {
  const log: SimLog = limita({ ...sim, id: sim.id ?? newId(), at: sim.at ?? nowIso() });
  return scheduleSim({ ...s, simulazioni: [...s.simulazioni, log] }, log);
}

/** Aggiorna una simulazione già registrata (domande a catena, nota): le schede si ricalcolano. */
export function updateSimulazione(s: AppState, id: string, patch: Partial<Omit<SimLog, 'id' | 'at'>>): AppState {
  const simulazioni = s.simulazioni.map((x) => (x.id === id ? limita({ ...x, ...patch, aggiornatoAt: nowIso() }) : x));
  return rebuildSrs({ ...s, simulazioni });
}

/** Lezione guidata: avanza al passo `passo` (non torna indietro); `done` la chiude e rende visto l'argomento. */
export function lessonStep(s: AppState, argId: string, passo: number, done = false): AppState {
  const now = nowIso();
  const prev = s.lezioni[argId] ?? { passo: 0, startedAt: now, feedback: {} };
  const next = { ...prev, passo: Math.max(prev.passo, passo), doneAt: prev.doneAt ?? (done ? now : undefined) };
  let n: AppState = { ...s, lezioni: { ...s.lezioni, [argId]: next } };
  if (done) {
    const a = n.argomenti[argId];
    n = { ...n, argomenti: { ...n.argomenti, [argId]: { vistoAt: a?.vistoAt ?? now, livello: Math.max(a?.livello ?? 1, 2) as 1 | 2 | 3 } } };
  }
  return n;
}

export function lessonFeedback(s: AppState, argId: string, stepId: string, v: Riscontro, note?: string): AppState {
  const now = nowIso();
  const prev = s.lezioni[argId] ?? { passo: 0, startedAt: now, feedback: {} };
  return { ...s, lezioni: { ...s.lezioni, [argId]: { ...prev, feedback: { ...prev.feedback, [stepId]: { v, note: note?.trim() || undefined, at: now } } } } };
}

/** Ricalcola le schede FSRS dalla storia (avvio, fusione tra dispositivi, import). */
export const rebuildAll = (s: AppState): AppState => rebuildSrs(s);

/** «Azzera»: storia vuota, impostazioni tenute, `resetAt` per gli altri dispositivi. */
export function azzera(s: AppState): AppState {
  const now = nowIso();
  return { ...defaultState(), settings: s.settings, meta: { settingsAt: now, resetAt: now } };
}
