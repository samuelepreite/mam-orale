/**
 * La sessione «Oggi» (principi didattici, in ordine):
 *  1. recupero attivo: 3–6 passi scaduti (FSRS) o più deboli di argomenti già visti, alternando i capitoli
 *     (interleaving) e al massimo 2 passi per dimostrazione;
 *  2. un argomento nuovo, nell'ordine dei prerequisiti della mappa, se resta tempo;
 *  3. ripasso di una dimostrazione dal primo passo scaduto (i precedenti si mostrano già fatti);
 *  4. una simulazione d'orale ogni tanto (ogni 3 giorni), sempre nell'ultima settimana se c'è la data dell'orale.
 *
 * Il piano si calcola sulla storia PRECEDENTE a oggi (le schede ricostruite fino alla mezzanotte), così resta lo stesso
 * per tutta la giornata; l'avanzamento si legge dagli eventi di oggi. Un passo di un argomento visto e mai allenato
 * conta come scaduto. Tempi stimati (scelte didattiche): 2 min per passo di recupero, 1,5 min per passo di ripasso
 * più 3, lezione 8 min + 1,5 per passo + 2 per previsione, simulazione 12 min.
 */
import type { Argomento, CapId } from '../content/types';
import type { AppState } from '../storage/store';
import { CATALOGO, dimsDi, passiDi, type Catalogo } from './catalogo';
import { valorePasso } from './mastery';
import { card, rebuildSrs } from './srs';

const DAY = 86400000;
export const MIN = { recupero: 2, ripassoPasso: 1.5, ripassoBase: 3, lezioneBase: 8, lezionePasso: 1.5, previsione: 2, simulazione: 12 };
export const GIORNI_TRA_SIMULAZIONI = 3;

export interface PassoRef {
  argId: string;
  dimId: string;
  passoId: string;
  i: number;
  cap: CapId;
}

export interface PianoOggi {
  giorno: string;
  recupero: PassoRef[];
  nuovo?: { argId: string };
  ripasso?: { argId: string; dimId: string; da: number };
  simulazione?: { ultimaSettimana: boolean };
  minuti: { recupero: number; nuovo: number; ripasso: number; simulazione: number; totale: number; disponibili: number };
}

export const inizioGiorno = (now: Date) => {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d;
};
export const giornoIso = (now: Date) => {
  const d = inizioGiorno(now);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/** argomenti visti prima dell'istante `t` */
export function vistiPrima(state: AppState, t: string, cat: Catalogo = CATALOGO): Argomento[] {
  return cat.argomenti.filter((a) => {
    if (!a.contenuto) return false;
    const v = state.argomenti[a.id]?.vistoAt ?? state.lezioni[a.id]?.doneAt;
    return (!!v && v < t) || state.passi.some((p) => p.argId === a.id && p.livello >= 2 && p.at < t);
  });
}

/** Ordine di studio: mappa con i prerequisiti prima (visita in profondità). */
export function ordineStudio(cat: Catalogo = CATALOGO): Argomento[] {
  const byId = new Map(cat.argomenti.map((a) => [a.id, a]));
  const out: Argomento[] = [];
  const seen = new Set<string>();
  const visit = (a: Argomento) => {
    if (seen.has(a.id)) return;
    seen.add(a.id);
    for (const p of a.prerequisiti) {
      const pa = byId.get(p);
      if (pa) visit(pa);
    }
    out.push(a);
  };
  cat.argomenti.forEach(visit);
  return out;
}

export const minutiLezione = (a: Argomento, cat: Catalogo = CATALOGO) => MIN.lezioneBase + MIN.lezionePasso * passiDi(cat, a).length + MIN.previsione * (a.contenuto?.previsioni?.length ?? 0);

/** prossimo argomento nuovo: il primo (in ordine di studio) con contenuto, non visto, con i prerequisiti pronti già visti */
export function prossimoNuovo(state: AppState, t: string, cat: Catalogo = CATALOGO): Argomento | undefined {
  const visti = new Set(vistiPrima(state, t, cat).map((a) => a.id));
  const byId = new Map(cat.argomenti.map((a) => [a.id, a]));
  const cand = ordineStudio(cat).filter((a) => a.contenuto && !visti.has(a.id));
  return cand.find((a) => a.prerequisiti.every((p) => visti.has(p) || !byId.get(p)?.contenuto)) ?? cand[0];
}

export function pianoOggi(state: AppState, now: Date = new Date(), cat: Catalogo = CATALOGO): PianoOggi {
  const start = inizioGiorno(now);
  const t0 = start.toISOString();
  const snap = rebuildSrs(state, t0);
  const visti = vistiPrima(state, t0, cat);
  const disponibili = Math.max(10, state.settings.minutiGiorno);
  const scaduto = (passoId: string) => {
    const c = card(snap, `passo:${passoId}`);
    return !c || new Date(c.due) <= now;
  };

  // 1. recupero attivo
  const nRec = Math.max(3, Math.min(6, Math.round(disponibili / 10)));
  const cand = visti.flatMap((a) =>
    passiDi(cat, a).map(({ dim, passo, i }) => ({ ref: { argId: a.id, dimId: dim.id, passoId: passo.id, i, cap: a.cap } as PassoRef, due: scaduto(passo.id), v: valorePasso(snap, passo.id, now), chiave: !!passo.chiave })),
  );
  cand.sort((x, y) => Number(y.due) - Number(x.due) || x.v - y.v || Number(y.chiave) - Number(x.chiave) || x.ref.passoId.localeCompare(y.ref.passoId));
  const perCap = new Map<CapId, typeof cand>();
  for (const c of cand) perCap.set(c.ref.cap, [...(perCap.get(c.ref.cap) ?? []), c]);
  const recupero: PassoRef[] = [];
  const perDim = new Map<string, number>();
  const caps = [...perCap.keys()];
  for (let giro = 0; recupero.length < nRec && giro < cand.length; giro++) {
    let preso = false;
    for (const cap of caps) {
      if (recupero.length >= nRec) break;
      const lista = perCap.get(cap)!;
      const k = lista.findIndex((c) => (perDim.get(c.ref.dimId) ?? 0) < 2);
      if (k < 0) continue;
      const [c] = lista.splice(k, 1);
      perDim.set(c.ref.dimId, (perDim.get(c.ref.dimId) ?? 0) + 1);
      recupero.push(c.ref);
      preso = true;
    }
    if (!preso) break;
  }
  const inRecupero = new Set(recupero.map((r) => r.passoId));
  let usati = recupero.length * MIN.recupero;

  // 3. ripasso dal primo passo scaduto (si decide prima del nuovo: viene prima nel tempo disponibile)
  let ripasso: PianoOggi['ripasso'];
  let mRip = 0;
  const dims = visti.flatMap((a) => dimsDi(cat, a).map((d) => ({ a, d })));
  const conScadenze = dims
    .map(({ a, d }) => ({ a, d, idx: d.passi.map((p, i) => (scaduto(p.id) && !inRecupero.has(p.id) ? i : -1)).filter((i) => i >= 0) }))
    .filter((x) => x.idx.length > 0)
    .sort((x, y) => y.idx.length - x.idx.length || x.d.id.localeCompare(y.d.id));
  if (conScadenze.length) {
    const { a, d, idx } = conScadenze[0];
    ripasso = { argId: a.id, dimId: d.id, da: idx[0] };
    mRip = MIN.ripassoBase + MIN.ripassoPasso * (d.passi.length - idx[0]);
    usati += mRip;
  }

  // 2. argomento nuovo se resta tempo (o se non c'è altro da fare)
  let nuovo: PianoOggi['nuovo'];
  let mNuovo = 0;
  const n = prossimoNuovo(state, t0, cat);
  if (n) {
    const m = minutiLezione(n, cat);
    if (disponibili - usati >= Math.min(15, m) || (!recupero.length && !ripasso)) {
      nuovo = { argId: n.id };
      mNuovo = m;
      usati += m;
    }
  }

  // 4. simulazione
  let simulazione: PianoOggi['simulazione'];
  const orale = state.settings.dataOrale ? new Date(state.settings.dataOrale + 'T00:00:00') : undefined;
  const giorniAllOrale = orale ? Math.round((orale.getTime() - start.getTime()) / DAY) : undefined;
  const ultimaSettimana = giorniAllOrale !== undefined && giorniAllOrale >= 0 && giorniAllOrale <= 7;
  const ultimaSim = state.simulazioni.filter((s) => s.at < t0).map((s) => s.at).sort().pop();
  const distanziata = !ultimaSim || start.getTime() - inizioGiorno(new Date(ultimaSim)).getTime() >= GIORNI_TRA_SIMULAZIONI * DAY;
  if (visti.length && (ultimaSettimana || (distanziata && disponibili - usati >= MIN.simulazione))) simulazione = { ultimaSettimana };
  const mSim = simulazione ? MIN.simulazione : 0;

  const rec = recupero.length * MIN.recupero;
  return { giorno: giornoIso(now), recupero, nuovo, ripasso, simulazione, minuti: { recupero: rec, nuovo: mNuovo, ripasso: mRip, simulazione: mSim, totale: rec + mNuovo + mRip + mSim, disponibili } };
}

export interface Avanzamento {
  recupero: boolean[];
  nuovo: boolean;
  ripasso: boolean;
  simulazione: boolean;
  fatti: number;
  totale: number;
}

/** Cosa è già fatto oggi del piano (dagli eventi di oggi). */
export function avanzamento(state: AppState, piano: PianoOggi, now: Date = new Date(), cat: Catalogo = CATALOGO): Avanzamento {
  const t0 = inizioGiorno(now).toISOString();
  const oggi = state.passi.filter((p) => p.at >= t0);
  const recupero = piano.recupero.map((r) => oggi.some((p) => p.passoId === r.passoId && p.dove === 'recupero'));
  const nuovo = !!piano.nuovo && (state.lezioni[piano.nuovo.argId]?.doneAt ?? '') >= t0;
  let ripasso = false;
  if (piano.ripasso) {
    const d = cat.dimostrazioni[piano.ripasso.dimId];
    const fatti = new Set(oggi.filter((p) => p.dove === 'ripasso' && p.dimId === piano.ripasso!.dimId).map((p) => p.passoId));
    ripasso = !!d && d.passi.slice(piano.ripasso.da).every((p) => fatti.has(p.id));
  }
  const simulazione = !!piano.simulazione && state.simulazioni.some((s) => s.at >= t0);
  const voci = [...recupero, ...(piano.nuovo ? [nuovo] : []), ...(piano.ripasso ? [ripasso] : []), ...(piano.simulazione ? [simulazione] : [])];
  return { recupero, nuovo, ripasso, simulazione, fatti: voci.filter(Boolean).length, totale: voci.length };
}
