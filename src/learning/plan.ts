/**
 * Piano di studio PARAMETRICO, senza data obbligatoria (decisione dello studente, WORKFLOW.md).
 *
 *  - obiettivo: ogni argomento d'orale (non di complemento) con almeno `ripassiObiettivo` ripassi riusciti
 *    (giorni distinti, learning/mastery.ts `giorniRipasso`);
 *  - ritmo attuale: ripassi riusciti al giorno negli ultimi 14 giorni (tutti gli argomenti);
 *  - giorni stimati = ripassi che mancano / ritmo (almeno tanti giorni quanti i ripassi che mancano all'argomento più
 *    indietro: due ripassi dello stesso argomento non contano nello stesso giorno);
 *  - con la data dell'orale: giorni disponibili fino all'orale meno l'ultima settimana (simulazioni; metà del tempo se
 *    mancano meno di due settimane); in tempo se i giorni stimati non li superano; a rischio gli argomenti che, nell'ordine
 *    di priorità, non entrano nei ripassi che il ritmo permette, e quelli già padroneggiati il cui ricordo previsto
 *    all'orale scende sotto 0,8;
 *  - ordine: priorità = peso (numero di formulazioni) × (1 − padronanza), con i prerequisiti
 *    non ancora fatti messi prima dell'argomento che li richiede.
 */
import type { Argomento } from '../content/types';
import type { AppState } from '../storage/store';
import { CATALOGO, passiDi, pesoOrale, type Catalogo } from './catalogo';
import { giorniRipasso, padronanze } from './mastery';
import { card, retrievability } from './srs';

const DAY = 86400000;
export const FINESTRA_RITMO = 14;

export interface VocePiano {
  argId: string;
  priorita: number;
  padronanza: number;
  ripassi: number;
  mancano: number;
  pronto: boolean;
}
export interface Piano {
  obiettivo: number;
  argomenti: number;
  completati: number;
  ripassiMancanti: number;
  ritmo: number;
  giorniStimati: number | null;
  dataOrale?: string;
  giorniAllOrale?: number;
  giorniDisponibili?: number;
  inTempo?: boolean;
  aRischio: string[];
  ordine: VocePiano[];
  avvisi: string[];
}

/** ricordo medio previsto alla data `when` dei passi dell'argomento (null se nessuna scheda) */
export function ricordoAl(state: AppState, a: Argomento, when: Date, cat: Catalogo = CATALOGO): number | null {
  const cs = passiDi(cat, a).map(({ passo }) => card(state, `passo:${passo.id}`)).filter((c) => !!c && c.last_review);
  if (!cs.length) return null;
  return cs.reduce((s, c) => s + retrievability(c, when), 0) / cs.length;
}

export function pianoStudio(state: AppState, now: Date = new Date(), cat: Catalogo = CATALOGO, pad = padronanze(state, now, cat)): Piano {
  const N = state.settings.ripassiObiettivo;
  const giorni = giorniRipasso(state, cat);
  const ripassi = (id: string) => giorni[id]?.size ?? 0;
  const target = cat.argomenti.filter((a) => !a.complemento);
  const avvisi: string[] = [];

  // ritmo: ripassi riusciti al giorno negli ultimi 14 giorni
  const from = now.getTime() - FINESTRA_RITMO * DAY;
  let recenti = 0;
  for (const set of Object.values(giorni))
    for (const k of set) {
      const [y, m, d] = k.split('-').map(Number);
      const t = new Date(y, m - 1, d).getTime();
      if (t >= from - DAY && t <= now.getTime()) recenti++;
    }
  const ritmo = recenti / FINESTRA_RITMO;

  const mancano = (a: Argomento) => Math.max(0, N - ripassi(a.id));
  const ripassiMancanti = target.reduce((s, a) => s + mancano(a), 0);
  const maxMancano = target.reduce((m, a) => Math.max(m, mancano(a)), 0);
  const giorniStimati = ripassiMancanti === 0 ? 0 : ritmo > 0 ? Math.max(maxMancano, Math.ceil(ripassiMancanti / ritmo)) : null;
  if (giorniStimati === null) avvisi.push('Ritmo non ancora stimabile: servono alcuni ripassi riusciti negli ultimi 14 giorni.');

  // ordine per priorità con i prerequisiti prima
  const byId = new Map(cat.argomenti.map((a) => [a.id, a]));
  const prio = (a: Argomento) => pesoOrale(a) * (1 - Math.min(1, pad[a.id] ?? 0));
  const daFare = cat.argomenti.filter((a) => mancano(a) > 0 || (a.complemento && (pad[a.id] ?? 0) < 0.8));
  const daFareIds = new Set(daFare.map((a) => a.id));
  const sorted = [...daFare].sort((x, y) => prio(y) - prio(x) || cat.argomenti.indexOf(x) - cat.argomenti.indexOf(y));
  const ordine: VocePiano[] = [];
  const seen = new Set<string>();
  const visit = (a: Argomento, stack: Set<string>) => {
    if (seen.has(a.id) || stack.has(a.id)) return;
    stack.add(a.id);
    for (const p of a.prerequisiti) {
      const pa = byId.get(p);
      if (pa && daFareIds.has(pa.id)) visit(pa, stack);
    }
    seen.add(a.id);
    ordine.push({ argId: a.id, priorita: prio(a), padronanza: pad[a.id] ?? 0, ripassi: ripassi(a.id), mancano: a.complemento ? 0 : mancano(a), pronto: !!a.contenuto });
  };
  for (const a of sorted) visit(a, new Set());

  const out: Piano = {
    obiettivo: N,
    argomenti: target.length,
    completati: target.filter((a) => mancano(a) === 0).length,
    ripassiMancanti,
    ritmo,
    giorniStimati,
    aRischio: [],
    ordine,
    avvisi,
  };

  if (state.settings.dataOrale) {
    const orale = new Date(state.settings.dataOrale + 'T00:00:00');
    const oggi = new Date(now);
    oggi.setHours(0, 0, 0, 0);
    const g = Math.round((orale.getTime() - oggi.getTime()) / DAY);
    out.dataOrale = state.settings.dataOrale;
    out.giorniAllOrale = g;
    if (g <= 0) {
      avvisi.push('La data dell\'orale è oggi o già passata: aggiornala in «Altro».');
      out.giorniDisponibili = 0;
    } else {
      const sim = g >= 14 ? 7 : Math.floor(g / 2);
      out.giorniDisponibili = g - sim;
    }
    out.inTempo = giorniStimati !== null && giorniStimati <= (out.giorniDisponibili ?? 0);
    // capienza: ripassi che il ritmo permette nei giorni disponibili
    let capienza = Math.floor(ritmo * (out.giorniDisponibili ?? 0));
    const rischio = new Set<string>();
    for (const v of ordine) {
      if (!v.mancano) continue;
      if (capienza >= v.mancano) capienza -= v.mancano;
      else {
        rischio.add(v.argId);
        capienza = 0;
      }
    }
    for (const a of target)
      if (mancano(a) === 0) {
        const r = ricordoAl(state, a, orale, cat);
        if (r !== null && r < 0.8) rischio.add(a.id);
      }
    out.aRischio = cat.argomenti.filter((a) => rischio.has(a.id)).map((a) => a.id);
  }
  return out;
}

