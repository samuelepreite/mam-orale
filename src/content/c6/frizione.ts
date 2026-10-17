/**
 * C6 · Accoppiamento motore–carico con frizione (domanda q10). Dispensa pp. 202–206 (appunti) e libro §5.7.1,
 * pp. 117–119 (scansione: lavoro dissipato (5.82), innesto impulsivo (5.83), Fig. 5-72) — NF-38.
 * d108 equazioni in strisciamento, d109 sincronizzazione e aderenza, d110 energia dissipata.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { arrow, dot, line, poly, rect, rot, svg } from '../svg';
import { tx } from './etichette';
import { DATI_FRIZIONE, bisezione, frizione as modello, innestoCostante, rk4, simpson } from '../../engine/c6';

// ------------------------------------------------------------------ disegno (p. 202 schema; p. 206 diagramma ω(t))
function disegno() {
  const y = 50;
  const disco = (x: number, h = 56) => rect(x - 5, y - h / 2, 10, h, 'soft') + rect(x - 5, y - h / 2, 10, h, 'l');
  const F = modello(DATI_FRIZIONE);
  const x0 = 46, y0 = 285, W = 320, H = 140, T = F.tQ + 3.2 * F.Teq;
  const sx = (t: number) => x0 + (t / T) * W, sy = (w: number) => y0 - (w / 160) * H;
  const curva = (f: (t: number) => number, a: number, b: number) => Array.from({ length: 60 }, (_, k) => a + ((b - a) * k) / 59).map((t) => [sx(t), sy(f(t))] as [number, number]);
  return svg(400, 328, [
    rect(4, y - 20, 56, 40, 'l'), tx(32, y, 'Motore', { size: 11 }),
    line(60, y, 138, y, 'l', 3), disco(92), tx(92, y - 36, 'I_m', { size: 12 }),
    rect(136, y - 24, 4, 48, 'l'), rect(146, y - 24, 4, 48, 'a'), tx(143, y + 38, 'frizione', { size: 11, c: 'm' }),
    arrow(178, y - 30, 154, y - 30, 'f', 'F', 10, -8), arrow(108, y - 30, 132, y - 30, 'f'),
    line(150, y, 206, y, 'l', 3),
    rect(206, y - 18, 56, 36, 'l'), tx(234, y - 4, 'Rid/Molt', { size: 10 }), tx(234, y + 10, 'τ', { c: 'a', size: 12 }),
    line(262, y, 340, y, 'l', 3), disco(300), tx(300, y - 36, 'I_u', { size: 12 }),
    rect(340, y - 20, 56, 40, 'l'), tx(368, y, 'Utilizz.', { size: 11 }),
    rot(77, y, 12, 120, 240, 'v'), tx(75, y + 26, 'ω_m', { c: 'v', size: 11 }),
    rot(178, y, 12, 120, 240, 'v'), tx(178, y + 26, 'ω_c', { c: 'v', size: 11 }),
    rot(320, y, 12, 240, 120, 'f'), tx(324, y + 26, 'C_u', { c: 'f', size: 11 }),
    // diagramma ω(t) (pp. 205–206)
    arrow(x0, y0, x0 + W + 14, y0, 'l'), arrow(x0, y0, x0, y0 - H - 14, 'l'),
    tx(x0 + W + 16, y0 - 12, 't', { size: 13 }), tx(x0 - 12, y0 - H - 12, 'ω', { size: 13 }),
    poly(curva(F.omegaMs, 0, F.tQ), 'v'), poly(curva(F.omegaMs, F.tQ, Math.min(T, F.tQ + 1.5)), 'd'),
    poly(curva(F.omegaCs, 0, F.tQ), 'a'), poly(curva(F.omegaCs, F.tQ, F.tQ + 0.45), 'd'),
    poly(curva(F.omegaAd, F.tQ, T), 'l'),
    tx(sx(0.25) + 18, sy(F.omegaMs(0.25)) - 10, 'ω_m', { c: 'v', size: 12 }), tx(sx(F.tQ * 0.55) + 14, sy(F.omegaCs(F.tQ * 0.55)) + 6, 'ω_c', { c: 'a', size: 12 }),
    line(x0, sy(F.wReg), x0 + W, sy(F.wReg), 'd'), tx(x0 + W, sy(F.wReg) + 12, 'ω_m,REG', { anchor: 'end', size: 11 }),
    tx(x0 - 6, sy(DATI_FRIZIONE.wI), 'ω_m^I', { anchor: 'end', size: 11 }),
    line(sx(F.tQ), sy(F.wQ), sx(F.tQ), y0, 'd'), dot(sx(F.tQ), sy(F.wQ), 'Q', -12, -10, 'a'),
    tx(sx(F.tQ), y0 + 12, 't_Q', { size: 11 }),
    tx(sx(F.tQ / 2), y0 + 30, 'strisciamento', { c: 'm', size: 11 }), tx(sx(F.tQ) + 60, y0 + 30, 'aderenza', { c: 'm', size: 11 }),
  ], 'Accoppiamento con frizione: schema e velocità dei due dischi fino alla sincronizzazione in Q');
}

// ------------------------------------------------------------------ d108
const P202 = { tipo: 'dispensa', pag: 202 } as const;
const P203 = { tipo: 'dispensa', pag: 203 } as const;
const P204 = { tipo: 'dispensa', pag: 204 } as const;

export const d108: Dimostrazione = {
  id: 'd108',
  titolo: 'Frizione: equazioni del moto durante lo strisciamento',
  enunciato: 'Al rilascio della frizione i dischi strisciano: scrivere e integrare le equazioni del moto del lato motore e del lato utilizzatore.',
  ipotesi: [
    'rilascio istantaneo: la coppia trasmessa passa da 0 a C_fr e resta costante (F_N costante, f radente)',
    'all\'istante del contatto (t = 0): motore al regime a vuoto ω_m^I, lato utilizzatore fermo (ω_c = 0)',
    'motore linearizzato nel punto P d\'intersezione con C_fr: C_m = C_m,0 − K_m ω_m, K_m > 0 modulo (NF-28)',
    'utilizzatore a coppia costante C_u,0, trasmissione τ fra disco condotto e utilizzatore, inerzia del disco condotto trascurata',
  ],
  sample: (rnd) => {
    const f = U(rnd, 0.25, 0.45), FN = U(rnd, 1000, 6000), ri = U(rnd, 0.06, 0.1), re = ri + U(rnd, 0.03, 0.08), m = 1 + Math.floor(2 * rnd());
    const Cfr = f * FN * ((ri + re) / 2) * m;
    const Cm0 = U(rnd, 1.5, 4) * Cfr, Km = U(rnd, 0.5, 4), wI = U(rnd, 0.6, 1) * (Cm0 / Km);
    const Im = U(rnd, 0.2, 2), Iu = U(rnd, 1, 20), tau = U(rnd, 0.2, 1), Cu0 = (U(rnd, 0.05, 0.5) * Cfr) / tau, t = U(rnd, 0, 2) * (Im / Km);
    const A = Cm0 - Cfr, B = A - Km * wI;
    const wmc = (A - B * Math.exp((-Km * t) / Im)) / Km; // forma chiusa
    const wmd = (B / Im) * Math.exp((-Km * t) / Im);
    const wmNum = rk4((_s, y) => (Cm0 - Km * y - Cfr) / Im, wI, 0, t, 2000); // integrazione numerica indipendente
    const a = (Cfr - tau * Cu0) / (tau * tau * Iu);
    const wcNum = rk4(() => (Cfr * 1 - Cu0 * tau) / (Iu * tau * tau), 0, 0, t, 50);
    return { f, FN, ri, re, m, Cfr, Cm0, Km, wI, Im, Iu, tau, Cu0, t, wmc, wmd, wmNum, a, wcNum };
  },
  passi: [
    {
      id: 'd108.1',
      latex: 'C_{fr} = f\\,F_N\\,r_m\\,m, \\qquad r_m = \\dfrac{r_i + r_e}{2}',
      perche: 'Coppia trasmessa in strisciamento: forza normale di chiusura $F_N$, coefficiente d\'attrito **radente** $f$ (c\'è velocità relativa fra i dischi), raggio medio della corona, $m$ dischi. È costante finché $F_N$ è costante.',
      fonte: P202,
      correzione: { nf: 'NF-28', dispensaScrive: 'C_{fr} = f_{att}\\,|F_N|\\,\\bar r\\,m' },
      distrattori: [
        { latex: 'C_{fr} = f_{att}\\,F_N\\,r_m\\,m', errore: 'concetto', spiega: 'È la riga evidenziata della dispensa (NF-28): durante l\'innesto i dischi strisciano, si usa il coefficiente radente f; f_att dà solo il limite in aderenza.' },
        { latex: 'r_m = \\dfrac{r_e - r_i}{2}', errore: 'segno', spiega: 'Il raggio medio è la media dei raggi; (r_e − r_i)/2 è metà della larghezza della corona.', num: (v) => [(v.ri + v.re) / 2, (v.re - v.ri) / 2] },
      ],
      num: (v) => [v.Cfr, v.f * v.FN * ((v.ri + v.re) / 2) * v.m],
    },
    {
      id: 'd108.2',
      latex: 'C_{fr}^{(a)} \\le f_{att}\\,F_N\\,r_m\\,m \\qquad (\\omega_{rel} = 0)',
      perche: 'In aderenza la coppia nella frizione non è fissata dall\'attrito ma dall\'equilibrio del sistema; può arrivare al più al limite d\'aderenza (con $f_{att} > f$).',
      fonte: P202,
      distrattori: [],
    },
    {
      id: 'd108.3',
      latex: 'C_m - C_{fr} = I_m\\,\\dot\\omega_m',
      perche: 'Lato motore: la frizione è un **utilizzatore fittizio** a coppia costante $C_{fr}$, opposta alla coppia motrice (la forza d\'attrito si oppone alla velocità del disco motore rispetto al condotto). È un accoppiamento diretto con la sola inerzia $I_m$.',
      fonte: P203,
      chiave: true,
      distrattori: [
        { latex: 'C_m + C_{fr} = I_m\\,\\dot\\omega_m', errore: 'segno', spiega: 'Il disco motore è più veloce del condotto: l\'attrito lo frena.', num: (v) => [v.Cm0 - v.Km * v.wmc + v.Cfr, v.Im * v.wmd] },
        { latex: 'C_m - \\tau C_u = (I_m + \\tau^2 I_u)\\,\\dot\\omega_m', errore: 'concetto', spiega: 'Questa vale dopo la sincronizzazione: in strisciamento i due lati sono separati e comunicano solo tramite C_fr.', num: (v) => [v.Cm0 - v.Km * v.wmc - v.tau * v.Cu0, (v.Im + v.tau ** 2 * v.Iu) * v.wmd] },
      ],
      num: (v) => [v.Cm0 - v.Km * v.wmc - v.Cfr, v.Im * v.wmd],
    },
    {
      id: 'd108.4',
      latex: 'C_m(\\omega_m) \\simeq C_{m,0} - K_m\\,\\omega_m',
      perche: 'Si linearizza la caratteristica del motore a combustione interna nel punto P dove incontra la retta orizzontale $C_{fr}$; $C_{m,0}$ è l\'intercetta della retta tangente (non la coppia reale a ω = 0) e $K_m$ il modulo della pendenza (NF-28, NF-231).',
      fonte: P203,
      distrattori: [],
    },
    {
      id: 'd108.5',
      latex: '\\omega_m(t) = \\dfrac{1}{K_m}\\Big[(C_{m,0} - C_{fr}) - (C_{m,0} - C_{fr} - K_m\\,\\omega_m^{I})\\,e^{-\\frac{K_m t}{I_m}}\\Big]',
      perche: 'Si separano le variabili e si integra da $\\omega_m^{I}$ (contatto dei dischi, $t = 0$) come a p. 199. Con $C_{fr}$ maggiore della coppia del motore a $\\omega_m^I$ il motore rallenta, con costante di tempo $I_m/K_m$.',
      fonte: P203,
      chiave: true,
      distrattori: [
        { latex: '\\omega_m(t) = \\dfrac{1}{K_m}\\Big[(C_{m,0} - C_{fr}) - (C_{m,0} - C_{fr} - K_m\\omega_m^{I})\\,e^{+\\frac{K_m t}{I_m}}\\Big]', errore: 'segno', spiega: 'Il punto P è stabile (K_m > 0 come modulo): l\'esponenziale si smorza.', num: (v) => [v.wmNum, (v.Cm0 - v.Cfr - (v.Cm0 - v.Cfr - v.Km * v.wI) * Math.exp((v.Km * v.t) / v.Im)) / v.Km] },
        { latex: '\\omega_m(t) = \\dfrac{1}{K_m}\\Big[(C_{m,0} - C_{fr}) - (C_{m,0} - C_{fr})\\,e^{-\\frac{K_m t}{I_m}}\\Big]', errore: 'ipotesi', spiega: 'Questa parte da ω_m = 0 (come l\'avviamento di p. 199): qui il motore all\'innesto gira già a ω_m^I.', num: (v) => [v.wmNum, (v.Cm0 - v.Cfr - (v.Cm0 - v.Cfr) * Math.exp((-v.Km * v.t) / v.Im)) / v.Km] },
        { latex: '\\omega_m(t) = \\dots\\, e^{-\\frac{K_m t}{I_m + \\tau^2 I_u}}', errore: 'concetto', spiega: 'In strisciamento il motore accelera solo la propria inerzia I_m.', num: (v) => [v.wmNum, (v.Cm0 - v.Cfr - (v.Cm0 - v.Cfr - v.Km * v.wI) * Math.exp((-v.Km * v.t) / (v.Im + v.tau ** 2 * v.Iu))) / v.Km] },
      ],
      num: (v) => [v.wmNum, (v.Cm0 - v.Cfr - (v.Cm0 - v.Cfr - v.Km * v.wI) * Math.exp((-v.Km * v.t) / v.Im)) / v.Km],
    },
    {
      id: 'd108.6',
      latex: 't \\to \\infty:\\ \\omega_m \\to \\dfrac{C_{m,0} - C_{fr}}{K_m}',
      perche: 'Sarebbe la velocità di regime «se i dischi fossero sempre in slittamento (che non è vero)»: prima arriva la sincronizzazione. La dispensa a p. 203 la chiama $\\omega_P$ (NF-223).',
      fonte: P203,
      distrattori: [],
    },
    {
      id: 'd108.7',
      latex: 'C_{fr} - \\tau\\,C_u = \\tau^2 I_u\\,\\dot\\omega_c',
      perche: 'Lato utilizzatore: la frizione è un **motore fittizio** di coppia $C_{fr}$ che muove il disco condotto ($\\omega_c$) e, attraverso la trasmissione, l\'utilizzatore ($\\omega_u = \\tau\\omega_c$). È l\'equazione di p. 201 con $C_m \\to C_{fr}$ e $I_m \\to 0$.',
      fonte: P204,
      chiave: true,
      distrattori: [
        { latex: 'I_u\\,\\dot\\omega_u = C_{fr} - C_u', errore: 'ipotesi', spiega: 'È la forma delle fonti derivate (d108, q10, NF-30): vale solo con τ = 1. Con il riduttore coppia e inerzia vanno ridotte al disco condotto.', num: (v) => [v.Cfr - v.Cu0, v.Iu * v.tau * v.a] },
        { latex: 'C_{fr} - \\dfrac{C_u}{\\tau} = \\tau^2 I_u\\,\\dot\\omega_c', errore: 'indice', spiega: 'La coppia ridotta al disco condotto è τC_u (ω_u/ω_c = τ).', num: (v) => [v.Cfr - v.Cu0 / v.tau, v.tau ** 2 * v.Iu * v.a] },
      ],
      num: (v) => [v.Cfr - v.tau * v.Cu0, v.tau ** 2 * v.Iu * v.a],
    },
    {
      id: 'd108.8',
      latex: '\\omega_c(t) = \\dfrac{C_{fr} - \\tau\\,C_{u,0}}{\\tau^2 I_u}\\,t',
      perche: 'Con utilizzatore a coppia costante il secondo membro è costante: legge lineare dal riposo ($\\omega_c(0) = 0$). Il carico parte solo se $C_{fr} > \\tau C_{u,0}$.',
      fonte: P204,
      distrattori: [],
      num: (v) => [v.wcNum, ((v.Cfr - v.tau * v.Cu0) / (v.tau ** 2 * v.Iu)) * v.t],
    },
  ],
  risultato: { latex: 'I_m\\dot\\omega_m = C_m - C_{fr}, \\qquad \\tau^2 I_u\\,\\dot\\omega_c = C_{fr} - \\tau C_u \\;\\Rightarrow\\; \\omega_m(t)\\ \\text{esponenziale},\\ \\omega_c(t)\\ \\text{lineare}', fonte: { tipo: 'dispensa', pag: [203, 204] } },
  gancio: 'Strisciando, la frizione è un carico per il motore e un motore per il carico.',
};

// ------------------------------------------------------------------ d109
const P205 = { tipo: 'dispensa', pag: 205 } as const;
const P206 = { tipo: 'dispensa', pag: 206 } as const;

export const d109: Dimostrazione = {
  id: 'd109',
  titolo: 'Frizione: sincronizzazione (punto Q) e moto in aderenza',
  enunciato: 'Determinare l\'istante t_Q in cui i dischi della frizione raggiungono la stessa velocità e il moto successivo, verificando che i dischi restino in aderenza.',
  ipotesi: [
    'leggi del moto in strisciamento della d108 (motore linearizzato, C_fr e C_u,0 costanti)',
    'dopo Q i dischi aderiscono: accoppiamento motore–carico con riduttore τ (η = 1)',
    'I_eq = I_m + τ² I_u (quello di p. 206, NF-221)',
  ],
  sample: (rnd) => {
    const Cm0 = U(rnd, 150, 400), Km = U(rnd, 1, 4), wI = U(rnd, 0.85, 1) * (Cm0 / Km), Cfr = U(rnd, 0.25, 0.7) * Cm0;
    const Im = U(rnd, 0.3, 2), Iu = U(rnd, 2, 15), tau = U(rnd, 0.3, 0.8), Cu0 = (U(rnd, 0.1, 0.6) * Cfr) / tau;
    const F = modello({ Cm0, Km, wI, Cfr, Im, Iu, tau, Cu0 });
    const tQ = F.tQ, wQ = F.wQ, Ieq = Im + tau * tau * Iu, t2 = tQ + U(rnd, 0.2, 3) * (Ieq / Km);
    const w2 = rk4((_s, y) => (Cm0 - Km * y - tau * Cu0) / Ieq, wQ, tQ, t2, 3000);
    const wd2 = (Cm0 - Km * w2 - tau * Cu0) / Ieq;
    const CmC = U(rnd, 0.2, 0.9) * Cfr;
    const tQc = bisezione((s) => wI - ((Cfr - CmC) / Im) * s - F.a * s, 0, wI / F.a);
    const ts = wI / ((Cfr - (Cm0 - Km * wI)) / Im + F.a); // accelerazioni «congelate» all'istante iniziale (d109 del fascicolo)
    return { Cm0, Km, wI, Cfr, Im, Iu, tau, Cu0, a: F.a, tQ, wQ, Ieq, t2, w2, wd2, CmC, tQc, ts, wmQ: F.omegaMs(tQ), wcQ: F.omegaCs(tQ) };
  },
  passi: [
    {
      id: 'd109.1',
      latex: '\\Delta\\omega = \\omega_m - \\omega_c, \\qquad \\Delta\\omega(t_Q) = 0 \\iff \\omega_m(t_Q) = \\omega_c(t_Q)',
      perche: 'Diagrammando le leggi orarie dei due dischi (p. 205) la curva del motore scende, la retta del condotto sale: si incontrano nel punto Q, dove la velocità relativa si annulla e i dischi sono «finalmente in aderenza».',
      fonte: P205,
      distrattori: [],
      num: (v) => [v.wmQ, v.wcQ],
    },
    {
      id: 'd109.2',
      latex: '\\dfrac{1}{K_m}\\Big[(C_{m,0} - C_{fr}) - (C_{m,0} - C_{fr} - K_m\\omega_m^{I})\\,e^{-\\frac{K_m t_Q}{I_m}}\\Big] = \\dfrac{C_{fr} - \\tau C_{u,0}}{\\tau^2 I_u}\\,t_Q',
      perche: 'Si eguagliano le due leggi della d108. È un\'equazione **trascendente** (esponenziale contro retta): $t_Q$ non ha forma chiusa e si trova graficamente, come fa la dispensa, o numericamente. La soluzione è unica: la differenza $\\omega_m - \\omega_c$ parte positiva ($\\omega_m^I > 0$, $\\omega_c(0) = 0$), è concava o decrescente (un esponenziale limitato meno una retta crescente) e tende a $-\\infty$, quindi si annulla una sola volta.',
      fonte: P205,
      chiave: true,
      distrattori: [
        { latex: 't_Q = \\dfrac{\\Delta\\omega(0)}{-\\Delta\\dot\\omega(0)}', errore: 'ipotesi', spiega: 'È la formula del fascicolo (d109, NF-30): supporrebbe accelerazioni costanti, ma ω̇_m cambia nel tempo perché la coppia del motore dipende da ω_m.', num: (v) => [v.tQ, v.ts] },
        { latex: '\\omega_m(t_Q) = \\omega_u(t_Q) = \\tau\\,\\omega_c(t_Q)', errore: 'convenzione', spiega: 'Si confrontano le velocità dei due dischi della frizione; ω_u è a valle del riduttore.', num: (v) => [v.wmQ, v.tau * v.wcQ] },
      ],
      num: (v) => [(v.Cm0 - v.Cfr - (v.Cm0 - v.Cfr - v.Km * v.wI) * Math.exp((-v.Km * v.tQ) / v.Im)) / v.Km, ((v.Cfr - v.tau * v.Cu0) / (v.tau ** 2 * v.Iu)) * v.tQ],
    },
    {
      id: 'd109.3',
      latex: 'K_m = 0\\ (C_m\\ \\text{costante}):\\quad t_Q = \\dfrac{\\omega_m^{I}}{\\dfrac{C_{fr} - C_m}{I_m} + \\dfrac{C_{fr} - \\tau C_{u,0}}{\\tau^2 I_u}}',
      perche: 'Solo se anche la coppia motrice è costante le due leggi sono rette (curva 1 della Fig. 5-72 del libro) e la velocità relativa cala linearmente: allora $t_Q$ è il rapporto fra la velocità relativa iniziale e la somma delle due accelerazioni.',
      fonte: { tipo: 'deduzione', da: 'p. 205 con K_m = 0; libro p. 118–119 (Fig. 5-72)', spiegazione: 'Con C_m costante la legge del motore diventa ω_m = ω_m^I − (C_fr − C_m)t/I_m e l\'equazione di Q è lineare in t_Q.' },
      distrattori: [
        { latex: 't_Q = \\dfrac{\\omega_m^{I}}{\\dfrac{C_{fr} - C_m}{I_m} + \\dfrac{C_{fr} - C_{u,0}}{I_u}}', errore: 'ipotesi', spiega: 'Senza τ (fonti derivate, NF-30): il lato utilizzatore va ridotto al disco condotto.', num: (v) => [v.tQc, v.wI / ((v.Cfr - v.CmC) / v.Im + (v.Cfr - v.Cu0) / v.Iu)] },
      ],
      num: (v) => [v.tQc, v.wI / ((v.Cfr - v.CmC) / v.Im + (v.Cfr - v.tau * v.Cu0) / (v.tau ** 2 * v.Iu))],
    },
    {
      id: 'd109.4',
      latex: 't > t_Q:\\quad \\dot\\omega_m = \\dfrac{C_m - \\tau\\,C_u}{I_m + \\tau^2 I_u} = \\dfrac{C_{m,0} - K_m\\omega_m - \\tau C_u}{I_{eq}}',
      perche: 'Da Q in poi le equazioni dello strisciamento non valgono più: i dischi girano insieme e il sistema è un accoppiamento motore–carico con riduttore (d105).',
      fonte: { tipo: 'dispensa', pag: [205, 206] },
      distrattori: [],
    },
    {
      id: 'd109.5',
      latex: '\\omega_m(t) = \\dfrac{1}{K_m}\\Big[(C_{m,0} - \\tau C_{u,0}) - (C_{m,0} - K_m\\omega_Q - \\tau C_{u,0})\\,e^{-\\frac{K_m}{I_{eq}}(t - t_Q)}\\Big]',
      perche: 'Si integra fra $t_Q$ (velocità $\\omega_Q$) e il generico $t$, come a p. 199 ma con il tempo che parte da $t_Q$ e con l\'inerzia equivalente $I_m + \\tau^2 I_u$.',
      fonte: P206,
      chiave: true,
      distrattori: [
        { latex: '\\dots\\,e^{-\\frac{K_m}{I_m + I_u}(t - t_Q)}', errore: 'ipotesi', spiega: 'Con il riduttore l\'inerzia del carico si riporta con τ² (I_eq di p. 206 ≠ quello di p. 199, NF-221).', num: (v) => [v.w2, (v.Cm0 - v.tau * v.Cu0 - (v.Cm0 - v.Km * v.wQ - v.tau * v.Cu0) * Math.exp((-v.Km / (v.Im + v.Iu)) * (v.t2 - v.tQ))) / v.Km] },
        { latex: '\\dots\\,e^{-\\frac{K_m}{I_{eq}}\\,t}', errore: 'indice', spiega: 'L\'integrazione parte da t_Q: l\'esponente contiene t − t_Q.', num: (v) => [v.w2, (v.Cm0 - v.tau * v.Cu0 - (v.Cm0 - v.Km * v.wQ - v.tau * v.Cu0) * Math.exp((-v.Km / v.Ieq) * v.t2)) / v.Km] },
        { latex: '\\omega_m(t) = \\dfrac{1}{K_m}\\Big[(C_{m,0} - C_{fr}) - \\dots\\Big]', errore: 'concetto', spiega: 'Dopo Q la frizione non impone più C_fr: il motore vede il carico ridotto τC_u.', num: (v) => [v.w2, (v.Cm0 - v.Cfr - (v.Cm0 - v.Km * v.wQ - v.Cfr) * Math.exp((-v.Km / v.Ieq) * (v.t2 - v.tQ))) / v.Km] },
      ],
      num: (v) => [v.w2, (v.Cm0 - v.tau * v.Cu0 - (v.Cm0 - v.Km * v.wQ - v.tau * v.Cu0) * Math.exp((-v.Km / v.Ieq) * (v.t2 - v.tQ))) / v.Km],
    },
    {
      id: 'd109.6',
      latex: 't \\to \\infty:\\quad \\omega_m \\to \\omega_{m,REG} = \\dfrac{C_{m,0} - \\tau\\,C_{u}}{K_m}',
      perche: 'Velocità di regime del sistema accoppiato (diagramma finale di p. 206): sotto il grafico, da 0 a $t_Q$ «strisciamento frizione», da $t_Q$ in poi «aderenza frizione».',
      fonte: P206,
      distrattori: [],
    },
    {
      id: 'd109.7',
      latex: 'C_{fr}^{(a)} = C_m - I_m\\dot\\omega_m = \\tau\\,C_u + \\tau^2 I_u\\,\\dot\\omega_m \\;\\le\\; f_{att}\\,F_N\\,r_m\\,m',
      perche: 'In aderenza la coppia nella frizione è quella «determinata dall\'equilibrio dinamico di tutto il sistema» (libro, p. 117): si ricava dal lato motore o, uguale, dal lato utilizzatore. Se superasse il limite d\'aderenza la frizione tornerebbe a slittare.',
      fonte: { tipo: 'deduzione', da: 'p. 202 (limite d\'aderenza) e libro p. 117', spiegazione: 'equazione del lato motore di p. 203 scritta in aderenza, con la coppia della frizione incognita; il lato utilizzatore di p. 204 dà lo stesso valore' },
      chiave: true,
      distrattori: [
        { latex: 'C_{fr}^{(a)} = C_{fr} = f\\,F_N\\,r_m\\,m', errore: 'concetto', spiega: 'f F_N r_m m è la coppia di strisciamento: in aderenza la coppia è quella che serve all\'equilibrio, di solito minore.', num: (v) => [v.Cm0 - v.Km * v.w2 - v.Im * v.wd2, v.Cfr] },
        { latex: 'C_{fr}^{(a)} = C_m', errore: 'termine-perso', spiega: 'Una parte della coppia motrice accelera l\'inerzia del motore stesso.', num: (v) => [v.Cm0 - v.Km * v.w2 - v.Im * v.wd2, v.Cm0 - v.Km * v.w2] },
      ],
      num: (v) => [v.Cm0 - v.Km * v.w2 - v.Im * v.wd2, v.tau * v.Cu0 + v.tau ** 2 * v.Iu * v.wd2],
    },
  ],
  risultato: { latex: '\\omega_m(t_Q) = \\omega_c(t_Q)\\ \\text{(trascendente)}; \\quad t > t_Q:\\ \\omega_m \\to \\dfrac{C_{m,0} - \\tau C_u}{K_m}', fonte: { tipo: 'dispensa', pag: [205, 206] } },
  gancio: 'Q è dove la curva del motore incontra la retta del carico: si trova sul grafico, non con una formula.',
};

// ------------------------------------------------------------------ d110 (libro pp. 117–118, NF-38)
const L117 = { tipo: 'dispensa', pag: 117 } as const;
const L118 = { tipo: 'dispensa', pag: 118 } as const;

export const d110: Dimostrazione = {
  id: 'd110',
  titolo: 'Frizione: lavoro dissipato all\'innesto',
  enunciato: 'Calcolare il lavoro dissipato per attrito durante l\'innesto di una frizione; caso particolare dell\'innesto impulsivo.',
  ipotesi: [
    'elemento 1 sull\'albero motore (I₁, ω₁₀), elemento 2 sull\'albero condotto (I₂, ω₂₀), velocità comune finale ω_f (libro, Fig. 5-71)',
    'coppie C_m, C_r e coppia d\'attrito C_f costanti, C_f maggiore di C_m e di C_r (Fig. 5-72)',
    'innesto impulsivo: durata così breve che il lavoro delle coppie esterne è trascurabile',
    'con il riduttore del cap. 6: I₁ = I_m, I₂ = τ²I_u, ω₂ = ω_c (NF-227)',
  ],
  sample: (rnd) => {
    const I1 = U(rnd, 0.2, 2), I2 = U(rnd, 0.5, 5), w10 = U(rnd, 80, 300), w20 = U(rnd, 0.01, 0.3) * w10, Cf = U(rnd, 50, 300);
    const Cm = U(rnd, 0.1, 0.8) * Cf, Cr = U(rnd, 0.1, 0.8) * Cf;
    const G = innestoCostante({ I1, I2, w10, w20, Cm, Cr, Cf });
    const G0 = innestoCostante({ I1, I2, w10, w20, Cm: 0, Cr: 0, Cf });
    const t = U(rnd, 0, 1) * G.tStar, w1 = G.w1(t), w2 = G.w2(t);
    // modello del cap. 6 (motore linearizzato) per il collegamento finale
    const Cm0 = U(rnd, 150, 400), Km = U(rnd, 1, 4), Cfr = U(rnd, 0.25, 0.7) * Cm0, tau = U(rnd, 0.3, 0.8);
    const F = modello({ Cm0, Km, wI: U(rnd, 0.85, 1) * (Cm0 / Km), Cfr, Im: U(rnd, 0.3, 2), Iu: U(rnd, 2, 15), tau, Cu0: (U(rnd, 0.1, 0.6) * Cfr) / tau });
    const Ech = F.energia(F.tQ), Esim = Cfr * simpson((s) => F.omegaMs(s) - F.omegaCs(s), 0, F.tQ, 4000);
    return {
      I1, I2, w10, w20, Cf, Cm, Cr, tStar: G.tStar, wf: G.wf, int1: G.int1, int2: G.int2, Lf: G.Lf,
      t, w1, w2, a1: G.a1, a2: G.a2, wf0: G0.wf, Lf0: G0.Lf, tStar0: G0.tStar, Ech, Esim,
    };
  },
  passi: [
    {
      id: 'd110.1',
      latex: 'C_m\\,d\\vartheta_1 - C_r\\,d\\vartheta_2 - dL_f = dE, \\qquad E = \\tfrac12 I_1\\omega_1^2 + \\tfrac12 I_2\\omega_2^2',
      perche: 'Equazione dell\'energia per tutta la frizione: il lavoro della coppia motrice meno quello della resistente meno il lavoro perso per attrito $dL_f$ è la variazione d\'energia cinetica.',
      fonte: L117,
      distrattori: [],
    },
    {
      id: 'd110.2',
      latex: 'L_f = \\tfrac12\\big[I_1\\omega_{10}^2 + I_2\\omega_{20}^2 - (I_1 + I_2)\\,\\omega_f^2\\big] + \\int_\\tau C_m\\,\\omega_1\\,dt - \\int_\\tau C_r\\,\\omega_2\\,dt',
      perche: 'Si integra su tutta la durata dell\'innesto, da $(\\omega_{10}, \\omega_{20})$ a $(\\omega_f, \\omega_f)$, con $d\\vartheta = \\omega\\,dt$. È la (5.82): energia cinetica persa più lavoro del motore meno lavoro del carico. (Qui τ è la durata dell\'innesto, non il rapporto di trasmissione: NF-229.)',
      fonte: { tipo: 'dispensa', pag: 117, eq: '5.82' },
      chiave: true,
      distrattori: [
        { latex: 'L_f = \\tfrac12\\big[I_1\\omega_{10}^2 + I_2\\omega_{20}^2 - (I_1 + I_2)\\,\\omega_f^2\\big]', errore: 'ipotesi', spiega: 'Vale solo per l\'innesto impulsivo: in generale durante lo strisciamento motore e carico continuano a fare lavoro.', num: (v) => [v.Lf, 0.5 * (v.I1 * v.w10 ** 2 + v.I2 * v.w20 ** 2 - (v.I1 + v.I2) * v.wf ** 2)] },
        { latex: 'L_f = \\tfrac12\\big[\\dots\\big] + \\int_\\tau C_m\\,\\omega_1\\,dt + \\int_\\tau C_r\\,\\omega_2\\,dt', errore: 'segno', spiega: 'Il lavoro della coppia resistente è negativo: si sottrae.', num: (v) => [v.Lf, 0.5 * (v.I1 * v.w10 ** 2 + v.I2 * v.w20 ** 2 - (v.I1 + v.I2) * v.wf ** 2) + v.Cm * v.int1 + v.Cr * v.int2] },
      ],
      num: (v) => [v.Lf, 0.5 * (v.I1 * v.w10 ** 2 + v.I2 * v.w20 ** 2 - (v.I1 + v.I2) * v.wf ** 2) + v.Cm * v.int1 - v.Cr * v.int2],
    },
    {
      id: 'd110.3',
      latex: '\\dfrac{dL_f}{dt} = C_m\\omega_1 - C_r\\omega_2 - \\dfrac{dE}{dt} = C_f\\,(\\omega_1 - \\omega_2)',
      perche: 'Dalle due equazioni di equilibrio dinamico del libro ($C_m - C_f = I_1\\dot\\omega_1$, $C_f - C_r = I_2\\dot\\omega_2$) moltiplicate per $\\omega_1$ e $\\omega_2$ e sommate: la potenza persa è la coppia d\'attrito per la **velocità relativa** dei due elementi.',
      fonte: { tipo: 'deduzione', da: 'libro p. 118 (equilibri dinamici) e (5.82)', spiegazione: 'somma delle due equazioni del moto moltiplicate per le rispettive velocità: la forma locale della (5.82)' },
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{dL_f}{dt} = C_f\\,(\\omega_1 + \\omega_2)', errore: 'segno', spiega: 'La coppia d\'attrito agisce con verso opposto sui due elementi: conta la differenza delle velocità.', num: (v) => [v.Cm * v.w1 - v.Cr * v.w2 - (v.I1 * v.w1 * v.a1 + v.I2 * v.w2 * v.a2), v.Cf * (v.w1 + v.w2)] },
        { latex: '\\dfrac{dL_f}{dt} = C_f\\,\\omega_1', errore: 'concetto', spiega: 'C_f ω₁ è la potenza che il motore cede alla frizione; una parte (C_f ω₂) passa al condotto e non si perde.', num: (v) => [v.Cm * v.w1 - v.Cr * v.w2 - (v.I1 * v.w1 * v.a1 + v.I2 * v.w2 * v.a2), v.Cf * v.w1] },
      ],
      num: (v) => [v.Cm * v.w1 - v.Cr * v.w2 - (v.I1 * v.w1 * v.a1 + v.I2 * v.w2 * v.a2), v.Cf * (v.w1 - v.w2)],
    },
    {
      id: 'd110.4',
      latex: 'L_f = \\int_0^{t^*} C_f\\,(\\omega_1 - \\omega_2)\\,dt = C_f\\,\\dfrac{(\\omega_{10} - \\omega_{20})\\,t^*}{2}',
      perche: 'Con coppie costanti la velocità relativa cala linearmente fino a zero in $t^*$: l\'integrale è l\'area del triangolo fra le due rette del diagramma. In generale $L_f$ è $C_f$ per l\'area fra le curve $\\omega_1(t)$ e $\\omega_2(t)$.',
      fonte: { tipo: 'deduzione', da: 'passo precedente e Fig. 5-72', spiegazione: 'integrale di una velocità relativa che decresce linearmente da ω₁₀ − ω₂₀ a 0' },
      distrattori: [],
      num: (v) => [v.Lf, (v.Cf * (v.w10 - v.w20) * v.tStar) / 2],
    },
    {
      id: 'd110.5',
      latex: 'I_1\\,\\omega_{10} + I_2\\,\\omega_{20} = (I_1 + I_2)\\,\\omega_f',
      perche: 'Innesto assimilabile a un urto: l\'impulso delle coppie esterne è trascurabile, la coppia d\'attrito è interna e si conserva il momento della quantità di moto (eq. (3.65) del libro).',
      fonte: L118,
      distrattori: [],
    },
    {
      id: 'd110.6',
      latex: '\\omega_f = \\dfrac{I_1\\,\\omega_{10} + I_2\\,\\omega_{20}}{I_1 + I_2}',
      perche: 'Velocità comune alla fine dell\'innesto impulsivo: media delle velocità iniziali pesata con le inerzie. Non dipende da quanto si serra la frizione.',
      fonte: { tipo: 'dispensa', pag: 118, eq: '5.83' },
      chiave: true,
      distrattori: [
        { latex: '\\omega_f = \\dfrac{\\omega_{10} + \\omega_{20}}{2}', errore: 'ipotesi', spiega: 'Media semplice: varrebbe solo con inerzie uguali.', num: (v) => [v.wf0, (v.w10 + v.w20) / 2] },
        { latex: '\\omega_f = \\dfrac{I_1\\,\\omega_{10}}{I_1 + I_2}', errore: 'termine-perso', spiega: 'Vale solo se il condotto è fermo all\'inizio (ω₂₀ = 0).', num: (v) => [v.wf0, (v.I1 * v.w10) / (v.I1 + v.I2)] },
      ],
      num: (v) => [v.wf0, (v.I1 * v.w10 + v.I2 * v.w20) / (v.I1 + v.I2)],
    },
    {
      id: 'd110.7',
      latex: 'L_f = \\tfrac12\\big[I_1\\omega_{10}^2 + I_2\\omega_{20}^2 - (I_1 + I_2)\\,\\omega_f^2\\big] = \\dfrac{I_1 I_2}{2\\,(I_1 + I_2)}\\,(\\omega_{10} - \\omega_{20})^2',
      perche: 'Si sostituisce la (5.83) nella (5.82) senza gli integrali. È l\'energia persa in un urto anelastico: dipende solo dalle inerzie e dalla differenza di velocità iniziale, non da $C_f$.',
      fonte: L118,
      chiave: true,
      distrattori: [
        { latex: 'L_f = \\tfrac12\\,(I_1 + I_2)\\,(\\omega_{10} - \\omega_{20})^2', errore: 'fattore', spiega: 'Il fattore è l\'inerzia «ridotta» I₁I₂/(I₁ + I₂), minore della più piccola delle due.', num: (v) => [v.Lf0, 0.5 * (v.I1 + v.I2) * (v.w10 - v.w20) ** 2] },
        { latex: 'L_f = \\tfrac12\\,I_1\\,\\omega_{10}^2', errore: 'concetto', spiega: 'Non si perde tutta l\'energia del motore: alla fine i due alberi girano insieme a ω_f.', num: (v) => [v.Lf0, 0.5 * v.I1 * v.w10 ** 2] },
      ],
      num: (v) => [v.Lf0, ((v.I1 * v.I2) / (2 * (v.I1 + v.I2))) * (v.w10 - v.w20) ** 2],
    },
    {
      id: 'd110.8',
      latex: 'E_{diss} = \\int_0^{t_Q} C_{fr}\\,(\\omega_m - \\omega_c)\\,dt, \\qquad \\omega_c = \\omega_u/\\tau',
      perche: 'Nel modello del cap. 6 (pp. 203–205) la velocità relativa è quella fra disco motore e disco **condotto**; l\'integrale (area fra le curve di p. 205 per $C_{fr}$) ha forma chiusa perché $\\omega_m$ è esponenziale e $\\omega_c$ lineare. Il fascicolo scrive $|\\omega_m - \\omega_u|$, giusto solo senza riduttore (NF-227).',
      fonte: { tipo: 'deduzione', da: 'pp. 203–205 e passo 3', spiegazione: 'potenza dissipata C_fr·(velocità relativa dei dischi) integrata fino alla sincronizzazione' },
      distrattori: [],
      num: (v) => [v.Ech, v.Esim],
    },
  ],
  risultato: { latex: 'L_f = \\int C_f\\,(\\omega_1 - \\omega_2)\\,dt; \\qquad \\text{innesto impulsivo: } L_f = \\dfrac{I_1 I_2}{2(I_1 + I_2)}(\\omega_{10} - \\omega_{20})^2', fonte: L118 },
  gancio: 'La frizione scalda finché c\'è velocità relativa: energia = coppia × area fra le due curve.',
};

// ------------------------------------------------------------------ argomento
const FD = modello(DATI_FRIZIONE);

export const frizione: ArgomentoContenuto = {
  id: 'c6-frizione',
  cosaDireSubito:
    'La frizione collega motore e utilizzatore per attrito. All\'innesto i dischi strisciano e trasmettono una coppia costante C_fr = f F_N r_m m, che per il lato motore è un utilizzatore fittizio e per il lato condotto un motore fittizio: due equazioni separate, il motore rallenta e il condotto accelera. Nel punto Q le velocità dei dischi coincidono; da lì c\'è aderenza e il sistema è un accoppiamento con trasmissione, mentre durante lo strisciamento si è dissipata energia in calore.',
  sistemaIpotesi: [
    'Sistema: motore a combustione interna (I_m) – frizione (disco motore e disco condotto) – riduttore/moltiplicatore τ – utilizzatore (I_u).',
    'All\'innesto: motore al regime a vuoto ω_m^I (C_m = 0), lato utilizzatore fermo; rilascio istantaneo della frizione.',
    'In strisciamento C_fr = f F_N r_m m costante (f radente); in aderenza C_fr ≤ f_att F_N r_m m.',
    'Motore linearizzato nel punto P con la retta C_fr (K_m modulo della pendenza); utilizzatore a coppia costante C_u,0.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Schema dell\'accoppiamento con frizione (p. 202) e velocità dei due dischi (pp. 205–206): ω_m scende, ω_c sale, si incontrano in Q; poi aderenza fino a ω_REG.',
    fonte: { tipo: 'dispensa', pag: [202, 206], fig: 'schema motore–frizione–Rid/Molt–utilizzatore; diagrammi ω(t)' },
    elementi: [
      { id: 'schema', testo: 'motore con I_m, due dischi di frizione premuti da F, riduttore τ, utilizzatore con I_u', obbligatorio: true },
      { id: 'velocita', testo: 'ω_m sul disco motore, ω_c sul disco condotto, ω_u = τω_c', obbligatorio: true },
      { id: 'coppie', testo: 'C_fr opposta a C_m sul lato motore, motrice sul lato condotto', obbligatorio: true },
      { id: 'grafico', testo: 'diagramma ω–t: ω_m esponenziale decrescente da ω_m^I, ω_c retta dall\'origine', obbligatorio: true },
      { id: 'Q', testo: 'punto Q e istante t_Q; zone «strisciamento» e «aderenza»', obbligatorio: true },
      { id: 'reg', testo: 'curva comune dopo Q che tende a ω_m,REG', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'I_m\\,\\dot\\omega_m = C_m - C_{fr}, \\qquad \\tau^2 I_u\\,\\dot\\omega_c = C_{fr} - \\tau\\,C_u, \\qquad C_{fr} = f\\,F_N\\,r_m\\,m',
    spiegazione: 'Due accoppiamenti separati (pp. 203–204): la frizione è un utilizzatore fittizio per il motore e un motore fittizio per il condotto; finché c\'è strisciamento trasmette la coppia d\'attrito costante.',
    fonte: { tipo: 'dispensa', pag: [202, 204] },
  },
  dimostrazioni: ['d108', 'd109', 'd110'],
  significato:
    'Durante l\'innesto la frizione è l\'unico legame fra i due lati: impone a entrambi la stessa coppia ma non la stessa velocità. Il motore perde giri, il carico li prende, e la sincronizzazione arriva quando le due leggi si incontrano; con il motore linearizzato quel tempo si trova solo sul grafico. Dopo Q la coppia nella frizione scende al valore che serve all\'equilibrio e deve restare sotto il limite d\'aderenza. Tutto il tempo dello strisciamento è energia trasformata in calore: coppia d\'attrito per l\'area fra le due curve.',
  fraseDaRicordare: 'Strisciando la frizione è un carico per il motore e un motore per il carico; in Q i dischi si agganciano e torna l\'accoppiamento con trasmissione.',
  daNonDire: [
    { frase: 'Durante l\'innesto la coppia è f_att F_N r_m m.', perche: 'In strisciamento si usa il coefficiente radente f; f_att dà solo il limite dell\'aderenza (la dispensa lo scrive nella formula evidenziata e si corregge subito dopo, NF-28).', fonte: P202 },
    { frase: 'Per il carico scrivo I_u ω̇_u = C_fr − C_u.', perche: 'Vale solo senza riduttore: con τ è τ²I_u ω̇_c = C_fr − τC_u (NF-30).', fonte: P204 },
    { frase: 't_Q = Δω(0)/(−Δω̇): la velocità relativa cala linearmente.', perche: 'Solo con coppie tutte costanti; con il motore linearizzato ω_m è esponenziale e t_Q si trova graficamente (NF-30).', fonte: P205 },
    { frase: 'In aderenza la frizione trasmette C_fr.', perche: 'Trasmette la coppia richiesta dall\'equilibrio dinamico, al più il limite f_att F_N r_m m.', fonte: { tipo: 'dispensa', pag: [117, 202] } },
    { frase: 'Il motore tende a (C_m,0 − C_fr)/K_m.', perche: 'Sarebbe il regime se i dischi slittassero sempre, «che non è vero»: dopo Q il regime è (C_m,0 − τC_u)/K_m.', fonte: { tipo: 'dispensa', pag: [203, 206] } },
    { frase: 'L\'energia dissipata è ∫ C_fr |ω_m − ω_u| dt.', perche: 'La velocità relativa è quella fra i due dischi: ω_m − ω_c, con ω_c = ω_u/τ (NF-227).', fonte: { tipo: 'deduzione', da: 'pp. 204–205', spiegazione: 'ω_u è a valle del riduttore, non sul disco condotto' } },
  ],
  approfondimenti: [
    { domanda: 'Perché durante lo strisciamento la coppia della frizione è costante?', tipo: 'approfondimento', attesa: 'Attrito coulombiano: la forza d\'attrito è f per la forza normale, indipendente dalla velocità relativa; con F_N costante e rilascio istantaneo C_fr = f F_N r_m m non cambia (gradino nel grafico di p. 202).', fonte: P202 },
    { domanda: 'Da dove viene il raggio medio (r_i + r_e)/2?', tipo: 'collegamento', argomento: 'c3-frizione-piana', attesa: 'Dall\'ipotesi di Reye (usura uniforme): p = K/r e la coppia è f N (r_e + r_i)/2, (5.84); con i superfici d\'attrito i f N (r_e + r_i)/2, (5.86). A pressione uniforme il raggio equivalente sarebbe ⅔(r_e³ − r_i³)/(r_e² − r_i²) (NF-228).', fonte: { tipo: 'dispensa', pag: [119, 120] } },
    { domanda: 'Perché non dai t_Q con una formula?', tipo: 'approfondimento', attesa: 'Perché ω_m(t) è esponenziale e ω_c(t) lineare: eguagliarle dà un\'equazione trascendente. Solo con coppia motrice costante le due leggi sono rette e t_Q = ω_m^I/(somma delle due accelerazioni).', fonte: P205 },
    { domanda: 'Quanta energia si dissipa nell\'innesto?', tipo: 'collegamento', argomento: 'c3-frizione-piana', attesa: `L_f = ∫C_f(ω₁ − ω₂)dt, (5.82); se l'innesto è impulsivo L_f = I₁I₂(ω₁₀ − ω₂₀)²/(2(I₁+I₂)) con ω_f della (5.83). Con i dati dell'animazione: impulsivo ≈ ${(FD.Eimp / 1000).toFixed(1).replace('.', ',')} kJ, con il motore che spinge durante lo strisciamento ≈ ${(FD.energia(FD.tQ) / 1000).toFixed(1).replace('.', ',')} kJ.`, fonte: { tipo: 'dispensa', pag: [117, 118] } },
    { domanda: 'Che cosa garantisce che dopo Q i dischi restino attaccati?', tipo: 'approfondimento', attesa: 'La coppia richiesta C_m − I_m ω̇_m = τC_u + τ²I_u ω̇_m deve restare sotto f_att F_N r_m m; altrimenti la frizione ricomincia a slittare.', fonte: { tipo: 'dispensa', pag: [117, 202] } },
    { domanda: 'Che cosa succede se rilasci la frizione con il carico molto pesante e il motore debole?', tipo: 'approfondimento', attesa: 'Il motore rallenta verso (C_m,0 − C_fr)/K_m: se questa velocità è sotto ω_MIN e la sincronizzazione arriva tardi, il motore si spegne prima di Q. Deduzione dal modello di p. 203.', fonte: { tipo: 'deduzione', da: 'pp. 202–203', spiegazione: 'regime fittizio del lato motore confrontato con la velocità minima ω_MIN del motore a c.i.' } },
    { domanda: 'Dopo la sincronizzazione che equazione usi?', tipo: 'collegamento', argomento: 'c6-trasmissione', attesa: 'Quella dell\'accoppiamento con riduttore: (I_m + τ²I_u) ω̇_m = C_m − τC_u, integrata da (t_Q, ω_Q) fino al regime (C_m,0 − τC_u)/K_m.', fonte: P206 },
  ],
  simboli: [
    { simbolo: 'C_{fr}', significato: 'coppia trasmessa dalla frizione (strisciamento: f F_N r_m m)', altrove: 'C_f nel libro (pp. 117–120), C_fr,max = nμF R_m in q10' },
    { simbolo: 'f,\\ f_{att}', significato: 'coefficiente d\'attrito radente; coefficiente d\'aderenza', altrove: 'μ_d, μ_s' },
    { simbolo: 'F_N,\\ r_m,\\ m', significato: 'forza normale di chiusura, raggio medio (r_i + r_e)/2, numero di dischi', altrove: 'N, i (superfici) nel libro; F, R_m, n in q10' },
    { simbolo: '\\omega_m^{I}', significato: 'velocità del motore al contatto dei dischi (regime a vuoto)' },
    { simbolo: '\\omega_c', significato: 'velocità del disco condotto (la dispensa a p. 204 lo dice «solidale al lato motore», NF-222)', altrove: 'ω_fr,u in q10, ω₂ nel libro, ω_u in d108–d110' },
    { simbolo: 'Q,\\ t_Q,\\ \\omega_Q', significato: 'punto e istante di sincronizzazione (diverso dal Q instabile di p. 198, NF-223)', altrove: 't* nel libro, t_s in d109' },
    { simbolo: 'I_{eq}', significato: 'I_m + τ²I_u dopo la sincronizzazione (p. 206, NF-221)' },
    { simbolo: 'L_f,\\ I_1,\\ I_2,\\ \\omega_{10},\\ \\omega_{20},\\ \\omega_f', significato: 'lavoro dissipato, inerzie e velocità iniziali e finale dei due alberi (libro)', altrove: 'E_diss in q10 e d110' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c6-frizione' }],
  previsioni: [
    {
      id: 'c6-fr-serra',
      domanda: 'Si serra di più la frizione (C_fr più grande), tutto il resto uguale. Il tempo di sincronizzazione t_Q…',
      opzioni: ['diminuisce', 'aumenta', 'non cambia'],
      corretta: 0,
      spiega: 'Il condotto accelera di più e il motore rallenta più in fretta: le due curve si incontrano prima (e a una velocità ω_Q più bassa).',
      verify: () => {
        const a = modello(DATI_FRIZIONE).tQ, b = modello({ ...DATI_FRIZIONE, Cfr: 170 }).tQ;
        return b < a ? 0 : b > a ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c6-frizione' },
    },
    {
      id: 'c6-fr-dopoQ',
      domanda: 'Con i dati dell\'animazione, dopo il punto Q la velocità comune dei dischi…',
      opzioni: ['sale verso ω_m,REG = (C_m,0 − τC_u)/K_m', 'resta uguale a ω_Q', 'scende verso (C_m,0 − C_fr)/K_m'],
      corretta: 0,
      spiega: 'In aderenza il motore vede solo il carico ridotto τC_u, molto più piccolo di C_fr: la coppia netta è positiva e il sistema accelera fino al regime (diagramma di p. 206).',
      verify: () => {
        const F = modello(DATI_FRIZIONE);
        const sale = F.omegaAd(F.tQ + 1) > F.wQ && F.wReg > F.wQ;
        return sale ? 0 : Math.abs(F.omegaAd(F.tQ + 1) - F.wQ) < 1e-9 ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c6-frizione' },
    },
    {
      id: 'c6-fr-energia',
      domanda: 'Rispetto all\'innesto impulsivo del libro, nel modello del cap. 6 (il motore continua a spingere durante lo strisciamento) l\'energia dissipata è…',
      opzioni: ['maggiore', 'minore', 'uguale'],
      corretta: 0,
      spiega: 'Nella (5.82) compare anche il lavoro del motore durante lo strisciamento: la frizione dissipa più dell\'energia cinetica persa nell\'urto.',
      verify: () => {
        const F = modello(DATI_FRIZIONE);
        const E = F.energia(F.tQ);
        return E > F.Eimp ? 0 : E < F.Eimp ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c6-frizione' },
    },
  ],
  nf: ['NF-28', 'NF-30', 'NF-38', 'NF-221', 'NF-222', 'NF-223', 'NF-227', 'NF-228', 'NF-229', 'NF-231'],
};
