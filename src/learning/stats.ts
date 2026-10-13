/**
 * Statistiche per «Progressi» (funzioni pure): padronanza per capitolo e argomento, passi dove ci si blocca
 * (più Again: sbagliato/fermato ai livelli 2–3 e passi mancanti nelle simulazioni), argomenti a rischio,
 * calibrazione sicurezza/esito, simulazioni, errori per tipo, previsione dei ripassi dei prossimi 14 giorni.
 */
import type { Errore } from '../content/types';
import type { AppState } from '../storage/store';
import { CATALOGO, indicePassi, type Catalogo } from './catalogo';
import { calibrazione, padronanzaCapitoli, padronanze, ripassiRiusciti, statoArgomento, type StatoArgomento } from './mastery';
import { pianoStudio, type Piano } from './plan';
import { punteggio, rubricaDi } from './rubrica';
import { cardsOf, forecast } from './srs';

export interface RigaArgomento {
  id: string;
  titolo: string;
  cap: string;
  padronanza: number;
  ripassi: number;
  stato: StatoArgomento;
}
export interface Blocco {
  passoId: string;
  dimId: string;
  argId: string;
  latex: string;
  n: number;
  ultimo: string;
}

export const ERRORI_TESTO: Record<Errore, string> = {
  segno: 'segno',
  ipotesi: 'ipotesi dimenticata',
  'termine-perso': 'termine perso',
  fattore: 'fattore sbagliato',
  indice: 'indici scambiati',
  convenzione: 'convenzione',
  concetto: 'concetto',
};

export function passiBlocco(state: AppState, cat: Catalogo = CATALOGO, n = 8): Blocco[] {
  const idx = indicePassi(cat);
  const m = new Map<string, Blocco>();
  const add = (passoId: string, at: string) => {
    const x = idx.get(passoId);
    if (!x) return;
    const b = m.get(passoId) ?? { passoId, dimId: x.dim.id, argId: x.argId, latex: x.passo.latex, n: 0, ultimo: at };
    b.n++;
    if (at > b.ultimo) b.ultimo = at;
    m.set(passoId, b);
  };
  for (const p of state.passi) if (p.livello >= 2 && (p.esito === 'sbagliato' || p.esito === 'fermato')) add(p.passoId, p.at);
  for (const s of state.simulazioni) if (s.passoMancante) add(s.passoMancante, s.at);
  return [...m.values()].sort((x, y) => y.n - x.n || y.ultimo.localeCompare(x.ultimo)).slice(0, n);
}

export function erroriPerTipo(state: AppState): [Errore, number][] {
  const c: Partial<Record<Errore, number>> = {};
  for (const p of state.passi) if (p.errore) c[p.errore] = (c[p.errore] ?? 0) + 1;
  return (Object.entries(c) as [Errore, number][]).sort((x, y) => y[1] - x[1]);
}

export function riepilogoSimulazioni(state: AppState, cat: Catalogo = CATALOGO) {
  const righe = [...state.simulazioni]
    .sort((x, y) => y.at.localeCompare(x.at))
    .map((s) => {
      const a = cat.argomenti.find((x) => x.id === s.argId);
      return { id: s.id, at: s.at, argId: s.argId, q: s.q, durataS: s.durataS, correttore: s.correttore, punteggio: a ? punteggio(rubricaDi(a, cat), s.voci) : 0 };
    });
  const media = righe.length ? righe.reduce((t, r) => t + r.punteggio, 0) / righe.length : null;
  return { n: righe.length, media, righe };
}

export interface Dashboard {
  capitoli: ReturnType<typeof padronanzaCapitoli>;
  argomenti: RigaArgomento[];
  blocchi: Blocco[];
  piano: Piano;
  calibrazione: ReturnType<typeof calibrazione>;
  simulazioni: ReturnType<typeof riepilogoSimulazioni>;
  previsione: number[];
  schede: number;
  errori: [Errore, number][];
  passiFatti: number;
  riscontriConfusi: number;
}

export function dashboard(state: AppState, now: Date = new Date(), cat: Catalogo = CATALOGO): Dashboard {
  const pad = padronanze(state, now, cat);
  const rip = ripassiRiusciti(state, cat);
  return {
    capitoli: padronanzaCapitoli(state, now, cat, pad),
    argomenti: cat.argomenti.map((a) => ({ id: a.id, titolo: a.titolo, cap: a.cap, padronanza: pad[a.id] ?? 0, ripassi: rip[a.id] ?? 0, stato: statoArgomento(state, a, pad[a.id] ?? 0, rip[a.id] ?? 0) })),
    blocchi: passiBlocco(state, cat),
    piano: pianoStudio(state, now, cat, pad),
    calibrazione: calibrazione(state),
    simulazioni: riepilogoSimulazioni(state, cat),
    previsione: forecast(state, now, 14),
    schede: cardsOf(state).length,
    errori: erroriPerTipo(state),
    passiFatti: state.passi.filter((p) => p.livello >= 2).length,
    riscontriConfusi: Object.values(state.lezioni).reduce((t, l) => t + Object.values(l.feedback).filter((f) => f.v === 'confuso').length, 0),
  };
}

/** Giorni consecutivi di studio fino a oggi. */
export function serie(state: AppState, now: Date): number {
  const days = new Set([...state.passi, ...state.simulazioni, ...state.richiami].map((e) => new Date(e.at).toDateString()));
  let n = 0;
  const d = new Date(now);
  while (days.has(d.toDateString())) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
