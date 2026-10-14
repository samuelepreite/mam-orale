/**
 * Simulazione dell'orale (ARCHITETTURA §4): estrazione pesata della domanda, domande a catena, aiuto locale alla
 * correzione (parole chiave). Nessun servizio esterno: la correzione è un'autovalutazione guidata sulla rubrica.
 *
 * Estrazione (scelta didattica): peso di una formulazione = (1 − padronanza dell'argomento, almeno 0,1) ×
 * (1 + quota dei suoi passi scaduti); così il peso di un argomento è
 * proporzionale al numero delle sue formulazioni. Niente ripetizioni ravvicinate: escluse le domande delle ultime 3
 * simulazioni e quelle degli ultimi 2 giorni; l'argomento dell'ultima simulazione pesa un quinto. Solo gli argomenti
 * con contenuto; un argomento senza domanda propria ha la formulazione
 * «Mi parli di …» (q = 0) con peso ½.
 */
import type { Argomento, VoceRubrica } from '../content/types';
import type { AppState } from '../storage/store';
import { CATALOGO, argDi, dimsDi, type Catalogo } from './catalogo';
import { padronanzaArgomento } from './mastery';
import { card } from './srs';

const DAY = 86400000;

export interface Estratta {
  argId: string;
  q: number;
  testo: string;
}

export function formulazioniDi(a: Argomento): { q: number; testo: string }[] {
  return a.formulazioni.length ? a.formulazioni : [{ q: 0, testo: `Mi parli di: ${a.titolo.charAt(0).toLowerCase()}${a.titolo.slice(1)}.` }];
}

export function pesiEstrazione(state: AppState, now: Date = new Date(), cat: Catalogo = CATALOGO, soloArg?: string): (Estratta & { peso: number })[] {
  const recenti = [...state.simulazioni].sort((x, y) => y.at.localeCompare(x.at));
  const ultimi3 = new Set(recenti.slice(0, 3).map((s) => `${s.argId}|${s.q}`));
  const ultimi2g = new Set(recenti.filter((s) => now.getTime() - Date.parse(s.at) < 2 * DAY).map((s) => `${s.argId}|${s.q}`));
  const ultimoArg = recenti[0]?.argId;
  const out: (Estratta & { peso: number })[] = [];
  for (const a of cat.argomenti) {
    if (!a.contenuto || (soloArg && a.id !== soloArg)) continue;
    const pad = padronanzaArgomento(state, a, now, cat);
    const passi = dimsDi(cat, a).flatMap((d) => d.passi);
    const scaduti = passi.filter((p) => {
      const c = card(state, `passo:${p.id}`);
      return c && new Date(c.due) <= now;
    }).length;
    const urg = 1 + (passi.length ? scaduti / passi.length : 0);
    const base = Math.max(0.1, 1 - pad) * urg * (a.id === ultimoArg && !soloArg ? 0.2 : 1);
    for (const f of formulazioniDi(a)) {
      const k = `${a.id}|${f.q}`;
      const fresca = !ultimi3.has(k) && !ultimi2g.has(k);
      out.push({ argId: a.id, q: f.q, testo: f.testo, peso: (fresca ? base : 0) * (a.formulazioni.length ? 1 : 0.5) });
    }
  }
  // se tutto è escluso (poche domande disponibili), si torna ai pesi senza esclusioni
  if (out.length && out.every((o) => o.peso === 0)) for (const o of out) o.peso = 1;
  return out;
}

export function estraiDomanda(state: AppState, rnd: () => number, now: Date = new Date(), cat: Catalogo = CATALOGO, soloArg?: string): Estratta | null {
  const pesi = pesiEstrazione(state, now, cat, soloArg);
  const tot = pesi.reduce((s, p) => s + p.peso, 0);
  if (!pesi.length || tot <= 0) return null;
  let x = rnd() * tot;
  for (const p of pesi) {
    x -= p.peso;
    if (x < 0 && p.peso > 0) return { argId: p.argId, q: p.q, testo: p.testo };
  }
  const last = [...pesi].reverse().find((p) => p.peso > 0)!;
  return { argId: last.argId, q: last.q, testo: last.testo };
}

// ------------------------------------------------------------------ approfondimenti (domande a catena)

export interface ApprofondimentoId {
  id: string;
  domanda: string;
  attesa: string;
  tipo: string;
  argomento?: string;
}
export const approfondimentiDi = (a: Argomento): ApprofondimentoId[] => (a.contenuto?.approfondimenti ?? []).map((x, i) => ({ id: `a${i + 1}`, domanda: x.domanda, attesa: x.attesa, tipo: x.tipo, argomento: x.argomento }));

/** 1–2 domande a catena scelte tra gli approfondimenti curati (un approfondimento e un collegamento, se ci sono). */
export function scegliCatena(a: Argomento, rnd: () => number, n = 2): ApprofondimentoId[] {
  const all = approfondimentiDi(a);
  const pick = (xs: ApprofondimentoId[]) => (xs.length ? xs[Math.floor(rnd() * xs.length) % xs.length] : undefined);
  const first = pick(all.filter((x) => x.tipo === 'approfondimento')) ?? pick(all);
  const rest = all.filter((x) => x !== first);
  const second = pick(rest.filter((x) => x.tipo !== first?.tipo)) ?? pick(rest);
  return [first, second].filter((x): x is ApprofondimentoId => !!x).slice(0, n);
}

// ------------------------------------------------------------------ aiuto alla correzione (locale, senza servizi esterni)

export type Punti = 0 | 0.5 | 1;

const STOP = new Set('della delle dello degli dalla dalle dallo nella nelle nello negli sulla sulle sullo sono come anche perché quindi quando ogni tutto tutti tutta tutte questo questa questi queste quello quella quelli quelle essere viene vengono deve devono dove cioè sempre molto ancora altro altra altri altre fino senza dopo prima mentre però invece dentro sopra sotto verso circa stesso stessa'.split(' '));
const normT = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
/** parole chiave di un testo atteso: parole di almeno 5 lettere, senza formule né parole vuote */
export function paroleChiave(s: string): string[] {
  const testo = normT(s.replace(/\$[^$]*\$/g, ' ').replace(/\\[a-zA-Z]+/g, ' '));
  return [...new Set(testo.split(/[^a-z]+/).filter((w) => w.length >= 5 && !STOP.has(w)))];
}
const radice = (w: string) => w.slice(0, Math.max(5, w.length - 2));

/**
 * Suggerimento dei punti per voce dal confronto per parole chiave tra la trascrizione e le attese della rubrica
 * (come l'aiuto automatico del preorale di SEIMAFI): approssimato, lo studente lo conferma o lo cambia.
 * Un'attesa è «trovata» se compare almeno il 40 % delle sue parole chiave (confronto sulle radici).
 */
export function suggerisciPunti(testo: string, rub: VoceRubrica[]): Record<string, { punti: Punti; trovate: number; totali: number }> {
  const parole = new Set(normT(testo).split(/[^a-z]+/).filter((w) => w.length >= 5).map(radice));
  const out: Record<string, { punti: Punti; trovate: number; totali: number }> = {};
  for (const v of rub) {
    const att = v.attese.filter((x) => paroleChiave(x).length > 0);
    const trovate = att.filter((x) => {
      const k = paroleChiave(x).map(radice);
      return k.filter((w) => parole.has(w)).length / k.length >= 0.4;
    }).length;
    const q = att.length ? trovate / att.length : 0;
    out[v.id] = { punti: q >= 0.67 ? 1 : q >= 0.34 ? 0.5 : 0, trovate, totali: att.length };
  }
  return out;
}

/** frasi «da non dire» che la trascrizione sembra contenere (metà delle parole chiave presenti) */
export function sospettiDaNonDire(testo: string, frasi: string[]): string[] {
  const parole = new Set(normT(testo).split(/[^a-z]+/).filter((w) => w.length >= 5).map(radice));
  return frasi.filter((f) => {
    const k = paroleChiave(f).map(radice);
    return k.length >= 2 && k.filter((w) => parole.has(w)).length / k.length >= 0.6;
  });
}

export { argDi };
