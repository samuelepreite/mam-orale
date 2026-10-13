/**
 * C6 · Accoppiamento motore–carico diretto (domanda q08). Dispensa pp. 194–200.
 * d101 equazione del moto (T.F.V.), d102 regime e avviamento, d103 stabilità, d104 transitorio da fermo e t_%.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { arrow, dot, line, poly, rect, rot, svg } from '../svg';
import { tx } from './etichette';
import {
  CARICO_P197, CARICO_P198, MOTORE_ASINCRONO, bisezione, cmAsincrono, cuParabolico, dcmAsincrono, dcuParabolico,
  puntiDiRegime, rk4, simulaDiretto, transitorioCC,
} from '../../engine/c6';

// ------------------------------------------------------------------ disegno (pp. 197: schema e caratteristiche)
/** schema a blocchi motore – inerzie – utilizzatore su un albero (stile delle figure della dispensa) */
export function schemaDiretto(y: number) {
  return [
    rect(8, y - 22, 70, 44, 'l'), tx(43, y, 'Motore', { size: 13 }),
    line(78, y, 320, y, 'l', 3),
    rect(124, y - 32, 12, 64, 'soft'), rect(124, y - 32, 12, 64, 'l'), tx(130, y - 42, 'I_m', { size: 13 }),
    rect(254, y - 32, 12, 64, 'soft'), rect(254, y - 32, 12, 64, 'l'), tx(260, y - 42, 'I_u', { size: 13 }),
    rect(320, y - 22, 72, 44, 'l'), tx(356, y, 'Utilizzatore', { size: 11 }),
    // C_m e ω concordi (verso «in giù» davanti all'albero), C_u opposta
    rot(104, y, 16, 120, 240, 'f', ''), tx(98, y + 30, 'C_m', { c: 'f', size: 12 }),
    rot(192, y, 16, 120, 240, 'v', ''), tx(192, y + 30, 'ω, ω̇', { c: 'v', size: 12 }),
    rot(288, y, 16, 240, 120, 'f', ''), tx(290, y + 30, 'C_u', { c: 'f', size: 12 }),
  ];
}

function disegno() {
  const M = MOTORE_ASINCRONO, C = CARICO_P197;
  const x0 = 50, y0 = 285, W = 300, H = 130; // grafico C–ω
  const sx = (w: number) => x0 + (w / (M.omegaS * 1.05)) * W;
  const sy = (c: number) => y0 - (c / 110) * H;
  const pts = (f: (w: number) => number, a: number, b: number) => Array.from({ length: 80 }, (_, k) => a + ((b - a) * k) / 79).map((w) => [sx(w), sy(f(w))] as [number, number]);
  const P = puntiDiRegime((w) => cmAsincrono(w, M), (w) => cuParabolico(w, C), M.omegaS, (w) => dcmAsincrono(w, M), (w) => dcuParabolico(w, C))[0];
  return svg(400, 312, [
    ...schemaDiretto(52),
    // assi
    arrow(x0, y0, x0 + W + 14, y0, 'l'), arrow(x0, y0, x0, y0 - H - 16, 'l'),
    tx(x0 + W + 16, y0 - 12, 'ω', { size: 13 }), tx(x0 - 12, y0 - H - 14, 'C', { size: 13 }),
    poly(pts((w) => cmAsincrono(w, M), 0, M.omegaS), 'm'), tx(sx(45), sy(cmAsincrono(45, M)) - 12, 'C_m', { c: 'm', size: 13 }),
    poly(pts((w) => cuParabolico(w, C), 0, 98), 'a'), tx(sx(98) + 14, sy(cuParabolico(98, C)), 'C_u', { c: 'a', size: 13 }),
    tx(x0 - 16, sy(cmAsincrono(0, M)), 'C_A', { size: 11, c: 'm' }), tx(x0 - 18, sy(C.Cu0), 'C_u0', { size: 11, c: 'a' }),
    line(sx(P.omega), sy(P.C), sx(P.omega), y0, 'd'), dot(sx(P.omega), sy(P.C), 'P', -12, -10, 'a'),
    tx(sx(P.omega) - 4, y0 + 12, 'ω_R', { size: 12 }), tx(sx(M.omegaS) + 4, y0 + 12, 'ω_S', { size: 12, c: 'm' }),
  ], 'Accoppiamento diretto: schema e caratteristiche meccaniche con il punto di regime P');
}

// ------------------------------------------------------------------ d101
const P197 = { tipo: 'dispensa', pag: 197 } as const;

export const d101: Dimostrazione = {
  id: 'd101',
  titolo: 'Equazione del moto dell\'accoppiamento diretto',
  enunciato: 'Ricavare l\'equazione differenziale del moto di un motore collegato direttamente (stesso albero) a un utilizzatore.',
  ipotesi: [
    'collegamento rigido: motore e utilizzatore hanno la stessa velocità angolare ω',
    'inerzie costanti I_m (lato motore) e I_u (lato utilizzatore)',
    'C_m coppia motrice concorde con ω; C_u modulo della coppia resistente, opposta a ω',
    'condizioni non stazionarie: le inerzie non si trascurano',
  ],
  sample: (rnd) => {
    const Cm = U(rnd, 20, 200), Cu = U(rnd, 5, 150), Im = U(rnd, 0.05, 2), Iu = U(rnd, 0.1, 5), w = U(rnd, 10, 300);
    return { Cm, Cu, Im, Iu, w, wd: (Cm - Cu) / (Im + Iu) };
  },
  passi: [
    {
      id: 'd101.1',
      latex: '\\omega_m = \\omega_u = \\omega, \\qquad \\dot\\omega_m = \\dot\\omega_u = \\dot\\omega',
      perche: 'Motore e utilizzatore sono calettati sullo stesso albero, senza organi di trasmissione: il sistema ha un solo grado di libertà e una sola velocità angolare.',
      fonte: P197,
      distrattori: [],
    },
    {
      id: 'd101.2',
      latex: 'W_m + W_u = \\dfrac{dE_K}{dt}, \\qquad W_m = C_m\\,\\omega,\\quad W_u = -C_u\\,\\omega,\\quad E_K = \\tfrac12 I_m\\omega^2 + \\tfrac12 I_u\\omega^2',
      perche: 'Teorema delle forze vive (T.F.V.): la potenza di tutte le coppie è la derivata dell\'energia cinetica. La potenza del motore è positiva, quella dell\'utilizzatore negativa perché $C_u$ si oppone al moto.',
      fonte: P197,
      aggiunto: true,
      distrattori: [],
    },
    {
      id: 'd101.3',
      latex: 'C_m\\,\\omega - C_u\\,\\omega = I_m\\,\\dot\\omega\\,\\omega + I_u\\,\\dot\\omega\\,\\omega',
      perche: 'Derivando l\'energia cinetica: $\\frac{d}{dt}\\left(\\tfrac12 I\\omega^2\\right) = I\\omega\\dot\\omega$ per ciascuna inerzia. È la riga della dispensa.',
      fonte: P197,
      chiave: true,
      distrattori: [
        { latex: 'C_m\\,\\omega + C_u\\,\\omega = (I_m + I_u)\\,\\dot\\omega\\,\\omega', errore: 'segno', spiega: 'C_u è resistente: la sua potenza è negativa.', num: (v) => [v.Cm * v.w + v.Cu * v.w, (v.Im + v.Iu) * v.wd * v.w] },
        { latex: 'C_m\\,\\omega - C_u\\,\\omega = I_m\\,\\dot\\omega\\,\\omega', errore: 'termine-perso', spiega: 'In condizioni non stazionarie anche l\'inerzia dell\'utilizzatore va accelerata.', num: (v) => [v.Cm * v.w - v.Cu * v.w, v.Im * v.wd * v.w] },
        { latex: 'C_m\\,\\omega - C_u\\,\\omega = \\tfrac12 (I_m + I_u)\\,\\dot\\omega\\,\\omega', errore: 'fattore', spiega: 'La derivata di ½Iω² è Iωω̇: il ½ si semplifica con il 2 dell\'esponente.', num: (v) => [v.Cm * v.w - v.Cu * v.w, 0.5 * (v.Im + v.Iu) * v.wd * v.w] },
      ],
      num: (v) => [v.Cm * v.w - v.Cu * v.w, v.Im * v.wd * v.w + v.Iu * v.wd * v.w],
    },
    {
      id: 'd101.4',
      latex: '\\dot\\omega = \\dfrac{C_m - C_u}{I_m + I_u}',
      perche: 'Si divide per $\\omega \\neq 0$ e si raccoglie $\\dot\\omega$. È il risultato evidenziato nella dispensa.',
      fonte: P197,
      chiave: true,
      distrattori: [
        { latex: '\\dot\\omega = \\dfrac{C_m - C_u}{I_m}', errore: 'termine-perso', spiega: 'Al denominatore c\'è l\'inerzia di tutto ciò che gira con ω: I_m + I_u.', num: (v) => [v.wd, (v.Cm - v.Cu) / v.Im] },
        { latex: '\\dot\\omega = \\dfrac{C_m - C_u}{(I_m + I_u)\\,\\omega}', errore: 'fattore', spiega: 'ω compare in tutti i termini e si semplifica: non resta al denominatore.', num: (v) => [v.wd, (v.Cm - v.Cu) / ((v.Im + v.Iu) * v.w)] },
      ],
      num: (v) => [v.wd, (v.Cm - v.Cu) / (v.Im + v.Iu)],
    },
    {
      id: 'd101.5',
      latex: 'I_{eq}\\,\\dot\\omega = C_m(\\omega) - C_u(\\omega), \\qquad I_{eq} = I_m + I_u',
      perche: 'Le due coppie dipendono da ω (caratteristiche meccaniche): «il numeratore non è costante», quindi l\'equazione è in generale non lineare e si studia con il grafico delle caratteristiche. $I_{eq}$ è il nome che la dispensa usa a p. 199 senza definirlo (NF-221).',
      fonte: { tipo: 'dispensa', pag: [197, 199] },
      distrattori: [],
      num: (v) => [(v.Im + v.Iu) * v.wd, v.Cm - v.Cu],
    },
  ],
  risultato: { latex: '(I_m + I_u)\\,\\dot\\omega = C_m(\\omega) - C_u(\\omega)', fonte: P197 },
  gancio: 'Una sola ω: le inerzie si sommano e la coppia in eccesso le accelera.',
};

// ------------------------------------------------------------------ d102
export const d102: Dimostrazione = {
  id: 'd102',
  titolo: 'Punto di regime e avviamento',
  enunciato: 'Ricavare la condizione di regime dell\'accoppiamento diretto e la condizione perché il sistema si avvii; calcolare la velocità di regime di un motore in corrente continua con utilizzatore a coppia costante.',
  ipotesi: [
    'equazione del moto (I_m + I_u) ω̇ = C_m(ω) − C_u(ω) (d101)',
    'caratteristiche meccaniche note: C_m(ω) del motore, C_u(ω) dell\'utilizzatore',
    'esempio: motore c.c. con caratteristica rettilinea decrescente, utilizzatore a coppia costante C_u,0 (p. 199)',
  ],
  sample: (rnd) => {
    const Cm0 = U(rnd, 50, 300), Km = U(rnd, 0.2, 3), Cu0 = U(rnd, 0.1, 0.8) * Cm0, I = U(rnd, 0.1, 5), w = U(rnd, 0, 1) * (Cm0 / Km);
    const wP = (Cm0 - Cu0) / Km, wS = Cm0 / Km, CA = Cm0;
    return { Cm0, Km, Cu0, I, w, wP, wS, CA, Cmw: Cm0 - Km * w, wd: (Cm0 - Km * w - Cu0) / I, wd0: (CA - Cu0) / I };
  },
  passi: [
    {
      id: 'd102.1',
      latex: '(I_m + I_u)\\,\\dot\\omega = C_m(\\omega) - C_u(\\omega)',
      perche: 'Si parte dall\'equazione del moto (d101). Il segno di $C_m - C_u$ dice se il sistema accelera o decelera.',
      fonte: P197,
      distrattori: [],
      num: (v) => [v.I * v.wd, v.Cmw - v.Cu0],
    },
    {
      id: 'd102.2',
      latex: '\\dot\\omega = 0 \\iff C_m(\\omega_R) = C_u(\\omega_R)',
      perche: 'A regime la velocità non cambia: la coppia accelerante è nulla. Graficamente è il punto P dove le due caratteristiche si intersecano («punto di stazionarietà»); $\\omega_R$ è la velocità di regime.',
      fonte: P197,
      chiave: true,
      distrattori: [
        { latex: 'C_m(\\omega_R) = 0', errore: 'concetto', spiega: 'Coppia motrice nulla è il regime a vuoto (ω_S): con il carico il motore si ferma prima, dove C_m = C_u.', num: (v) => [v.Cm0 - v.Km * v.wP, 0] },
        { latex: '\\dfrac{dC_m}{d\\omega}(\\omega_R) = 0', errore: 'concetto', spiega: 'Il massimo della coppia motrice non è il regime: il regime è l\'intersezione con la caratteristica dell\'utilizzatore.' },
      ],
      num: (v) => [v.Cm0 - v.Km * v.wP, v.Cu0],
      visual: { kind: 'meccanismo', id: 'c6-regime' },
    },
    {
      id: 'd102.3',
      latex: '\\dot\\omega(0) = \\dfrac{C_A - C_{u0}}{I_m + I_u} > 0 \\iff C_A > C_{u0}',
      perche: 'Da fermo ($\\omega = 0$) il sistema parte solo se allo spunto la coppia del motore $C_A$ supera quella che serve a muovere l\'utilizzatore $C_{u0}$ (p. 197: «il sistema si avvia poiché allo spunto la coppia fornita dal motore è maggiore»).',
      fonte: P197,
      distrattori: [
        { latex: 'C_A > 0', errore: 'ipotesi', spiega: 'Non basta che il motore dia coppia: deve vincere la coppia resistente a ω = 0.' },
        { latex: 'C_{max} > C_{u0}', errore: 'concetto', spiega: 'All\'avvio conta la coppia a ω = 0 (spunto), non il massimo che il motore raggiunge più avanti.' },
      ],
      num: (v) => [v.I * v.wd0, v.CA - v.Cu0],
    },
    {
      id: 'd102.4',
      latex: 'C_m(\\omega) = C_{m,0} - K_m\\,\\omega, \\qquad K_m = \\left|\\dfrac{dC_m}{d\\omega}\\right| = \\dfrac{C_{m,0}}{\\omega_S} > 0',
      perche: 'Esempio di p. 199: la caratteristica del motore in corrente continua è una retta decrescente da $C_{m,0}$ (a ω = 0) a zero (a $\\omega_S$). Da qui in poi la dispensa usa $K_m$ come **modulo** della pendenza: lo si dichiara.',
      fonte: { tipo: 'dispensa', pag: 199 },
      correzione: { nf: 'NF-28', dispensaScrive: 'K_m = -\\dfrac{C_{m0}}{\\omega_S},\\quad C_m = C_o - K_m\\,\\omega_p' },
      distrattori: [],
      num: (v) => [v.Cm0 - v.Km * v.wS, 0],
    },
    {
      id: 'd102.5',
      latex: 'C_{m,0} - K_m\\,\\omega_P = C_{u,0} \\;\\Rightarrow\\; \\omega_P = \\dfrac{C_{m,0} - C_{u,0}}{K_m}',
      perche: 'Si eguagliano le due caratteristiche ($C_u = C_{u,0}$ perché la sua pendenza è nulla) e si risolve in $\\omega_P$. Con $K_m > 0$ e $C_{m,0} > C_{u,0}$ la velocità di regime è positiva.',
      fonte: { tipo: 'dispensa', pag: 199 },
      chiave: true,
      distrattori: [
        { latex: '\\omega_P = \\dfrac{C_{m,0} + C_{u,0}}{K_m}', errore: 'segno', spiega: 'Il carico abbassa il regime: C_u,0 si sottrae.', num: (v) => [v.wP, (v.Cm0 + v.Cu0) / v.Km] },
        { latex: '\\omega_P = \\dfrac{C_{m,0}}{K_m}', errore: 'termine-perso', spiega: 'Questa è ω_S, il regime a vuoto: manca la coppia del carico.', num: (v) => [v.wP, v.Cm0 / v.Km] },
        { latex: '\\omega_P = (C_{m,0} - C_{u,0})\\,K_m', errore: 'fattore', spiega: 'K_m è una coppia per unità di velocità: si divide, non si moltiplica (controllo dimensionale).', num: (v) => [v.wP, (v.Cm0 - v.Cu0) * v.Km] },
      ],
      num: (v) => [v.wP, (v.Cm0 - v.Cu0) / v.Km],
    },
    {
      id: 'd102.6',
      latex: 'C_m(\\omega_Q) = C_u(\\omega_Q), \\qquad C_m(\\omega_P) = C_u(\\omega_P), \\qquad \\omega_Q < \\omega_P',
      perche: 'Le caratteristiche possono intersecarsi più volte (esempio di p. 198): Q sul tratto crescente della $C_m$ e P su quello discendente. Sono entrambi punti di stazionarietà; quale sia davvero il regime lo decide la stabilità (d103).',
      fonte: { tipo: 'dispensa', pag: 198 },
      distrattori: [],
    },
  ],
  risultato: { latex: 'C_m(\\omega_R) = C_u(\\omega_R); \\qquad \\text{motore c.c.:}\\ \\omega_P = \\dfrac{C_{m,0} - C_{u,0}}{K_m}', fonte: { tipo: 'dispensa', pag: [197, 199] } },
  gancio: 'Regime = incrocio delle caratteristiche; avvio = motore sopra il carico a ω = 0.',
};

// ------------------------------------------------------------------ d103
export const d103: Dimostrazione = {
  id: 'd103',
  titolo: 'Stabilità del punto di regime',
  enunciato: 'Ricavare analiticamente la condizione di stabilità di un punto di regime P dell\'accoppiamento diretto, linearizzando le caratteristiche nell\'intorno di P.',
  ipotesi: [
    'P punto di regime: C_m,P = C_u,P',
    'piccole perturbazioni: le caratteristiche si sviluppano in serie di Taylor al primo ordine in P',
    'qui K_m = dC_m/dω e K_u = dC_u/dω sono pendenze CON il loro segno (p. 198)',
  ],
  sample: (rnd) => {
    const CP = U(rnd, 20, 200), Km = U(rnd, -5, 1), Ku = U(rnd, 0, 3), I = U(rnd, 0.1, 5), wP = U(rnd, 20, 200);
    const Om0 = U(rnd, 0.5, 5) * (rnd() < 0.5 ? -1 : 1), t = U(rnd, 0, 3);
    const Om = Om0 * Math.exp(((Km - Ku) * t) / I);
    return { CP, Km, Ku, I, wP, Om0, t, Om };
  },
  passi: [
    {
      id: 'd103.1',
      latex: 'C_m \\simeq C_{m,P} + K_m(\\omega - \\omega_P), \\qquad C_u \\simeq C_{u,P} + K_u(\\omega - \\omega_P), \\qquad K = \\dfrac{dC}{d\\omega}\\Big|_P',
      perche: 'Sviluppo in serie di ciascuna caratteristica nell\'intorno di P troncato al primo ordine: si sostituiscono le curve con le loro rette tangenti in P.',
      fonte: { tipo: 'dispensa', pag: 198 },
      distrattori: [],
    },
    {
      id: 'd103.2',
      latex: '\\Omega = \\omega - \\omega_P, \\qquad \\omega_P = \\text{cost} \\Rightarrow \\dot\\Omega = \\dot\\omega',
      perche: 'Si studia lo scostamento dalla velocità di regime; la sua derivata è l\'accelerazione del sistema.',
      fonte: { tipo: 'dispensa', pag: 198 },
      distrattori: [],
    },
    {
      id: 'd103.3',
      latex: '\\dfrac{d\\Omega}{dt} = \\dfrac{C_{m,P} + K_m\\Omega - C_{u,P} - K_u\\Omega}{I_m + I_u} = \\dfrac{(K_m - K_u)\\,\\Omega}{I_m + I_u}',
      perche: 'Si sostituiscono le rette tangenti nell\'equazione del moto; le coppie in P si cancellano perché P è un punto di regime ($C_{m,P} = C_{u,P}$). Resta un\'equazione lineare in Ω.',
      fonte: { tipo: 'dispensa', pag: 198 },
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{d\\Omega}{dt} = \\dfrac{(K_m + K_u)\\,\\Omega}{I_m + I_u}', errore: 'segno', spiega: 'La coppia dell\'utilizzatore è resistente: la sua pendenza si sottrae.', num: (v) => [((v.Km - v.Ku) * v.Om) / v.I, ((v.Km + v.Ku) * v.Om) / v.I] },
        { latex: '\\dfrac{d\\Omega}{dt} = \\dfrac{(K_m - K_u)\\,\\omega}{I_m + I_u}', errore: 'indice', spiega: 'Le rette tangenti dipendono dallo scostamento ω − ω_P = Ω, non da ω.', num: (v) => [((v.Km - v.Ku) * v.Om) / v.I, ((v.Km - v.Ku) * (v.wP + v.Om)) / v.I] },
      ],
      num: (v) => [(v.CP + v.Km * v.Om - (v.CP + v.Ku * v.Om)) / v.I, ((v.Km - v.Ku) * v.Om) / v.I],
    },
    {
      id: 'd103.4',
      latex: '\\int_{\\Omega_0}^{\\Omega}\\dfrac{d\\Omega}{\\Omega} = \\int_0^t \\dfrac{K_m - K_u}{I_m + I_u}\\,dt \\;\\Rightarrow\\; \\ln\\dfrac{\\Omega}{\\Omega_0} = \\dfrac{K_m - K_u}{I_m + I_u}\\,t',
      perche: 'Separazione delle variabili e integrazione da $t = 0$ (scostamento iniziale $\\Omega_0$, la perturbazione) al generico $t$.',
      fonte: { tipo: 'dispensa', pag: 198 },
      distrattori: [],
      num: (v) => [Math.log(v.Om / v.Om0), ((v.Km - v.Ku) * v.t) / v.I],
    },
    {
      id: 'd103.5',
      latex: '\\Omega(t) = \\Omega_0\\,e^{\\frac{K_m - K_u}{I_m + I_u}\\,t}',
      perche: 'Esponenziale dello scostamento: cresce o si smorza a seconda del segno di $K_m - K_u$. È il risultato evidenziato di p. 198 (grafico di p. 199).',
      fonte: { tipo: 'dispensa', pag: [198, 199] },
      chiave: true,
      distrattori: [
        { latex: '\\Omega(t) = \\Omega_0\\,e^{\\frac{K_u - K_m}{I_m + I_u}\\,t}', errore: 'segno', spiega: 'L\'esponente è (K_m − K_u)/I: con il segno scambiato il criterio si capovolge.', num: (v) => [v.Om, v.Om0 * Math.exp(((v.Ku - v.Km) * v.t) / v.I)] },
        { latex: '\\Omega(t) = \\Omega_0\\Big(1 + \\dfrac{K_m - K_u}{I_m + I_u}\\,t\\Big)', errore: 'concetto', spiega: 'dΩ/dt proporzionale a Ω si integra in un esponenziale, non in una retta.', num: (v) => [v.Om, v.Om0 * (1 + ((v.Km - v.Ku) * v.t) / v.I)] },
      ],
      num: (v) => [v.Om, v.Om0 * Math.exp(((v.Km - v.Ku) * v.t) / v.I)],
    },
    {
      id: 'd103.6',
      latex: 'K_m - K_u < 0 \\iff \\Omega(t) \\to 0 \\iff \\text{P stabile}; \\qquad K_m > K_u \\Rightarrow \\text{instabile}',
      perche: 'Se l\'esponente è negativo lo scostamento si smorza e il sistema torna in P. A parole (p. 199): P è stabile se nel punto d\'intersezione la pendenza della caratteristica dell\'utilizzatore è maggiore di quella del motore.',
      fonte: { tipo: 'dispensa', pag: [198, 199] },
      chiave: true,
      distrattori: [
        { latex: 'K_m - K_u > 0 \\Rightarrow \\text{stabile}', errore: 'segno', spiega: 'Con esponente positivo lo scostamento cresce: è il caso instabile.' },
        { latex: 'K_m < 0 \\Rightarrow \\text{stabile}', errore: 'ipotesi', spiega: 'Conta la differenza delle pendenze: un carico con pendenza ancora più negativa renderebbe P instabile anche con K_m < 0.' },
        { latex: 'C_m > C_u \\Rightarrow \\text{stabile}', errore: 'concetto', spiega: 'In P le coppie sono uguali: la stabilità dipende da come cambiano (pendenze), non dai valori.' },
      ],
      visual: { kind: 'meccanismo', id: 'c6-regime' },
    },
    {
      id: 'd103.7',
      latex: '\\text{Q (p. 198): } K_m > K_u \\Rightarrow \\begin{cases} \\omega < \\omega_Q: C_u > C_m,\\ \\text{il sistema si ferma} \\\\ \\omega > \\omega_Q: C_m > C_u,\\ \\text{il sistema va in P} \\end{cases}',
      perche: 'È la lettura qualitativa della dispensa: nel punto Q sul tratto crescente della $C_m$ una perturbazione non si richiude; P sul tratto discendente è stabile. Il criterio analitico dà lo stesso verdetto.',
      fonte: { tipo: 'dispensa', pag: [197, 198] },
      distrattori: [],
    },
  ],
  risultato: { latex: '\\Omega(t) = \\Omega_0\\,e^{\\frac{K_m - K_u}{I_m + I_u}t}: \\quad \\text{stabile} \\iff \\dfrac{dC_m}{d\\omega}\\Big|_P < \\dfrac{dC_u}{d\\omega}\\Big|_P', fonte: { tipo: 'dispensa', pag: [198, 199] } },
  gancio: 'Se ω sale, la coppia netta deve diventare frenante: la curva del carico deve salire più di quella del motore.',
};

// ------------------------------------------------------------------ d104
const P199 = { tipo: 'dispensa', pag: 199 } as const;
const P200 = { tipo: 'dispensa', pag: 200 } as const;

export const d104: Dimostrazione = {
  id: 'd104',
  titolo: 'Transitorio di avviamento e tempo al 90 %',
  enunciato: 'Motore in corrente continua (caratteristica rettilinea) e utilizzatore a coppia costante: ricavare la legge ω(t) dell\'avviamento da fermo e il tempo per raggiungere una frazione assegnata della velocità di regime.',
  ipotesi: [
    'C_m = C_m,0 − K_m ω con K_m > 0 modulo della pendenza (NF-28); C_u = C_u,0 costante (K_u = 0)',
    'C_m,0 > C_u,0: il sistema si avvia; P stabile perché K_m (con segno) < 0 = K_u',
    'partenza da fermo: ω(0) = 0; I_eq = I_m + I_u (NF-221)',
  ],
  sample: (rnd) => {
    const Cm0 = U(rnd, 50, 300), Km = U(rnd, 0.2, 3), Cu0 = U(rnd, 0.1, 0.8) * Cm0, Ieq = U(rnd, 0.1, 5), p = U(rnd, 0.5, 0.99);
    const tc = Ieq / Km, t = U(rnd, 0.1, 3) * tc, wP = (Cm0 - Cu0) / Km;
    const wClosed = (s: number) => wP * (1 - Math.exp(-s / tc));
    const w = rk4((_s, y) => (Cm0 - Km * y - Cu0) / Ieq, 0, 0, t, 2000); // integrazione numerica indipendente
    const wd = (wP / tc) * Math.exp(-t / tc);
    const hi = 50 * tc;
    const t90 = bisezione((s) => wClosed(s) - 0.9 * wP, 0, hi), tp = bisezione((s) => wClosed(s) - p * wP, 0, hi);
    return { Cm0, Km, Cu0, Ieq, p, t, wP, w, wc: wClosed(t), wd, t90, tp };
  },
  passi: [
    {
      id: 'd104.1',
      latex: 'I_{eq}\\,\\dfrac{d\\omega}{dt} = C_{m,0} - K_m\\,\\omega - C_{u,0}, \\qquad I_{eq} = I_m + I_u',
      perche: 'Equazione del moto (d101) con le due caratteristiche: retta decrescente del motore, costante dell\'utilizzatore. $K_m$ qui è il modulo della pendenza, quindi il termine è $-K_m\\omega$.',
      fonte: P199,
      correzione: { nf: 'NF-28', dispensaScrive: 'K_m = -\\dfrac{C_{m0}}{\\omega_S} < 0 \\ \\text{e poi}\\ \\dfrac{d\\omega}{dt} = \\dfrac{C_{m,0} - K_m\\omega - C_{u,0}}{I_{eq}}' },
      distrattori: [],
      num: (v) => [v.Ieq * v.wd, v.Cm0 - v.Km * v.wc - v.Cu0],
    },
    {
      id: 'd104.2',
      latex: '\\int_0^{\\omega}\\dfrac{d\\omega}{C_{m,0} - C_{u,0} - K_m\\omega} = \\int_0^t \\dfrac{dt}{I_{eq}} \\;\\Rightarrow\\; -\\dfrac{1}{K_m}\\ln\\dfrac{C_{m,0} - C_{u,0} - K_m\\omega}{C_{m,0} - C_{u,0}} = \\dfrac{t}{I_{eq}}',
      perche: 'Separazione delle variabili e integrazione da fermo. La primitiva di $1/(A - K_m\\omega)$ è $-\\frac{1}{K_m}\\ln(A - K_m\\omega)$: il segno meno viene dalla derivata del denominatore.',
      fonte: P199,
      chiave: true,
      distrattori: [
        { latex: '+\\dfrac{1}{K_m}\\ln\\dfrac{C_{m,0} - C_{u,0} - K_m\\omega}{C_{m,0} - C_{u,0}} = \\dfrac{t}{I_{eq}}', errore: 'segno', spiega: 'La derivata di (A − K_m ω) è −K_m: la primitiva ha −1/K_m. Con + il tempo verrebbe negativo.', num: (v) => [Math.log((v.Cm0 - v.Cu0 - v.Km * v.w) / (v.Cm0 - v.Cu0)) / v.Km, v.t / v.Ieq] },
        { latex: '-\\ln\\dfrac{C_{m,0} - C_{u,0} - K_m\\omega}{C_{m,0} - C_{u,0}} = \\dfrac{t}{I_{eq}}', errore: 'fattore', spiega: 'Manca 1/K_m dalla primitiva.', num: (v) => [-Math.log((v.Cm0 - v.Cu0 - v.Km * v.w) / (v.Cm0 - v.Cu0)), v.t / v.Ieq] },
      ],
      num: (v) => [-Math.log((v.Cm0 - v.Cu0 - v.Km * v.w) / (v.Cm0 - v.Cu0)) / v.Km, v.t / v.Ieq],
    },
    {
      id: 'd104.3',
      latex: '\\omega(t) = \\dfrac{1}{K_m}\\Big[C_{m,0} - C_{u,0} - (C_{m,0} - C_{u,0})\\,e^{-\\frac{K_m t}{I_{eq}}}\\Big] = \\omega_P\\Big(1 - e^{-\\frac{K_m t}{I_{eq}}}\\Big)',
      perche: 'Si esplicita ω. La prima forma è quella evidenziata nella dispensa; raccogliendo si vede che ω sale con legge esponenziale verso $\\omega_P$ con costante di tempo $I_{eq}/K_m$.',
      fonte: { tipo: 'dispensa', pag: [199, 200] },
      chiave: true,
      distrattori: [
        { latex: '\\omega(t) = \\omega_P\\Big(1 - e^{+\\frac{K_m t}{I_{eq}}}\\Big)', errore: 'segno', spiega: 'Con esponente positivo ω diventerebbe negativa e divergerebbe: il punto è stabile, l\'esponenziale si smorza.', num: (v) => [v.w, v.wP * (1 - Math.exp((v.Km * v.t) / v.Ieq))] },
        { latex: '\\omega(t) = \\omega_P\\,e^{-\\frac{K_m t}{I_{eq}}}', errore: 'concetto', spiega: 'Partendo da fermo ω deve crescere da 0 a ω_P; questa decresce da ω_P a 0.', num: (v) => [v.w, v.wP * Math.exp((-v.Km * v.t) / v.Ieq)] },
        { latex: '\\omega(t) = \\omega_P\\Big(1 - e^{-\\frac{t}{K_m I_{eq}}}\\Big)', errore: 'fattore', spiega: 'La costante di tempo è I_eq/K_m (più inerzia, più lento; motore più «rigido», più veloce).', num: (v) => [v.w, v.wP * (1 - Math.exp(-v.t / (v.Km * v.Ieq)))] },
      ],
      num: (v) => [v.w, (v.Cm0 - v.Cu0 - (v.Cm0 - v.Cu0) * Math.exp((-v.Km * v.t) / v.Ieq)) / v.Km],
    },
    {
      id: 'd104.4',
      latex: 't = 0:\\ \\omega = 0; \\qquad t \\to \\infty:\\ \\omega \\to \\omega_P = \\dfrac{C_{m,0} - C_{u,0}}{K_m}',
      perche: 'Controllo degli estremi: si parte da fermo e si tende **asintoticamente** al regime (d102). In un tempo finito il regime non si raggiunge mai: per questo si definisce un tempo al 90 %.',
      fonte: P200,
      distrattori: [],
    },
    {
      id: 'd104.5',
      latex: '0{,}9\\,\\omega_P = \\omega_P\\Big(1 - e^{-\\frac{K_m t_{90\\%}}{I_{eq}}}\\Big) \\;\\Rightarrow\\; \\ln(1 - 0{,}9) = -\\dfrac{K_m\\,t_{90\\%}}{I_{eq}}',
      perche: 'Si impone che la velocità sia il 90 % di quella di regime; $\\omega_P$ si semplifica, resta $e^{-K_m t/I_{eq}} = 0{,}1$ e si prende il logaritmo.',
      fonte: P200,
      distrattori: [],
      num: (v) => [Math.log(1 - 0.9), (-v.Km * v.t90) / v.Ieq],
    },
    {
      id: 'd104.6',
      latex: 't_{\\%} = -\\dfrac{I_{eq}}{K_m}\\,\\ln(1 - \\%)',
      perche: 'Generalizzando a una frazione qualsiasi della velocità di regime. La dispensa nella formula generale perde il logaritmo, che invece c\'è nella riga del 90 % subito sopra.',
      fonte: P200,
      chiave: true,
      correzione: { nf: 'NF-28', dispensaScrive: 't_{\\%} = -\\dfrac{I_{eq}}{K_m}(1 - \\%)' },
      distrattori: [
        { latex: 't_{\\%} = -\\dfrac{I_{eq}}{K_m}(1 - \\%)', errore: 'termine-perso', spiega: 'È la riga della dispensa senza ln (NF-28): darebbe un tempo negativo e, per il 90 %, 0,1 I_eq/K_m invece di 2,30 I_eq/K_m.', num: (v) => [v.tp, (-v.Ieq / v.Km) * (1 - v.p)] },
        { latex: 't_{\\%} = -\\dfrac{I_{eq}}{K_m}\\,\\ln(\\%)', errore: 'indice', spiega: 'Resta da percorrere la frazione 1 − %: è e^{−K_m t/I} = 1 − %, non %.', num: (v) => [v.tp, (-v.Ieq / v.Km) * Math.log(v.p)] },
        { latex: 't_{\\%} = -\\dfrac{K_m}{I_{eq}}\\,\\ln(1 - \\%)', errore: 'fattore', spiega: 'Il tempo cresce con l\'inerzia: I_eq al numeratore («tempo ∝ inerzia», p. 200).', num: (v) => [v.tp, (-v.Km / v.Ieq) * Math.log(1 - v.p)] },
      ],
      num: (v) => [v.tp, (-v.Ieq / v.Km) * Math.log(1 - v.p)],
      visual: { kind: 'meccanismo', id: 'c6-transitorio' },
    },
    {
      id: 'd104.7',
      latex: 't_{90\\%} = \\dfrac{I_{eq}}{K_m}\\,\\ln 10 \\simeq 2{,}30\\,\\dfrac{I_{eq}}{K_m}',
      perche: 'Valore numerico utile all\'orale. «N.B. tempo ∝ inerzia del sistema» (p. 200): raddoppiando $I_{eq}$ raddoppia il tempo di avviamento.',
      fonte: P200,
      distrattori: [],
      num: (v) => [v.t90, (v.Ieq / v.Km) * Math.log(10)],
    },
  ],
  risultato: { latex: '\\omega(t) = \\omega_P\\big(1 - e^{-K_m t/I_{eq}}\\big), \\qquad t_{\\%} = -\\dfrac{I_{eq}}{K_m}\\ln(1 - \\%)', fonte: P200, correzione: { nf: 'NF-28', dispensaScrive: 't_{\\%} = -\\dfrac{I_{eq}}{K_m}(1 - \\%)' } },
  gancio: 'Primo ordine: costante di tempo I_eq/K_m; al 90 % ci vogliono ln 10 ≈ 2,3 costanti di tempo.',
};

// ------------------------------------------------------------------ argomento
const M = MOTORE_ASINCRONO;
const cmA = (w: number) => cmAsincrono(w, M);

export const diretto: ArgomentoContenuto = {
  id: 'c6-diretto',
  cosaDireSubito:
    'Nell\'accoppiamento diretto motore e utilizzatore stanno sullo stesso albero e hanno la stessa ω. Con il teorema delle forze vive ottengo (I_m + I_u) ω̇ = C_m(ω) − C_u(ω): la coppia in eccesso accelera le due inerzie. Il regime è l\'intersezione delle due caratteristiche meccaniche ed è stabile se lì la pendenza della caratteristica del motore è minore di quella dell\'utilizzatore.',
  sistemaIpotesi: [
    'Sistema: motore (inerzia I_m) e utilizzatore (inerzia I_u) sullo stesso albero, senza trasmissione: una sola velocità ω.',
    'Caratteristiche meccaniche note: C_m(ω) del motore (p. es. asincrono, p. 195) e C_u(ω) dell\'utilizzatore (p. es. ascensore a coppia costante, veicolo parabolico, p. 196).',
    'C_m concorde con ω, C_u modulo della coppia resistente; condizioni non stazionarie, quindi le inerzie contano.',
    'Stabilità: piccole perturbazioni, caratteristiche linearizzate nel punto di regime.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Schema dell\'accoppiamento diretto (p. 197) e caratteristiche: motore asincrono da C_A, utilizzatore da C_u0, regime nel punto P a ω_R.',
    fonte: { tipo: 'dispensa', pag: 197, fig: 'schema motore–I_m–I_u–utilizzatore e grafico C–ω' },
    elementi: [
      { id: 'schema', testo: 'motore, albero unico con i dischi I_m e I_u, utilizzatore', obbligatorio: true },
      { id: 'versi', testo: 'C_m concorde con ω e ω̇, C_u opposta', obbligatorio: true },
      { id: 'assi', testo: 'grafico con C in ordinata e ω in ascissa', obbligatorio: true },
      { id: 'cm', testo: 'caratteristica del motore: C_A a ω = 0, massimo, discesa ripida fino a ω_S', obbligatorio: true },
      { id: 'cu', testo: 'caratteristica dell\'utilizzatore da C_u0 (crescente)', obbligatorio: true },
      { id: 'P', testo: 'punto P d\'intersezione e velocità di regime ω_R sull\'asse', obbligatorio: true },
      { id: 'tangenti', testo: 'rette tangenti in P (per la stabilità, p. 198)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'C_m\\,\\omega - C_u\\,\\omega = I_m\\,\\dot\\omega\\,\\omega + I_u\\,\\dot\\omega\\,\\omega',
    spiegazione: 'Teorema delle forze vive: potenza motrice meno potenza resistente uguale alla derivata dell\'energia cinetica delle due inerzie, che ruotano con la stessa ω.',
    fonte: P197,
  },
  dimostrazioni: ['d101', 'd102', 'd103', 'd104'],
  significato:
    'L\'equazione dice che il sistema accelera finché la coppia motrice supera quella resistente e si ferma in velocità dove le caratteristiche si incrociano. Ma un incrocio è un vero regime solo se è stabile: se la velocità sale, la coppia netta deve diventare frenante. Per questo il motore asincrono lavora sul tratto discendente e ripido della sua caratteristica («zona di normale funzionamento», p. 195). Il regime si raggiunge asintoticamente, con un tempo proporzionale all\'inerzia.',
  fraseDaRicordare: 'Regime dove le caratteristiche si incrociano; stabile se lì la curva del motore scende più di quella del carico: dC_m/dω < dC_u/dω.',
  daNonDire: [
    { frase: 'Ogni punto d\'intersezione delle caratteristiche è un punto di regime stabile.', perche: 'Nell\'esempio di p. 198 il punto Q sul tratto crescente della C_m è instabile: con una perturbazione il sistema si ferma oppure va in P.', fonte: { tipo: 'dispensa', pag: 198 } },
    { frase: 'È stabile se la caratteristica del motore è decrescente.', perche: 'Il criterio è sulla differenza delle pendenze: K_m − K_u < 0. Una C_m decrescente non basta se la C_u scende ancora di più.', fonte: { tipo: 'dispensa', pag: [198, 199] } },
    { frase: 't_% = −(I_eq/K_m)(1 − %).', perche: 'Manca il logaritmo (errore della dispensa, NF-28): t_% = −(I_eq/K_m) ln(1 − %), cioè t_90% ≈ 2,3 I_eq/K_m.', fonte: { tipo: 'dispensa', pag: 200 } },
    { frase: 'Il sistema arriva a regime dopo un tempo t_R.', perche: 'La velocità tende asintoticamente a ω_P: per questo si usa il tempo al 90 %.', fonte: { tipo: 'dispensa', pag: 200 } },
    { frase: 'K_m = −C_m0/ω_S e quindi C_m = C_m0 − K_m ω.', perche: 'Mescola le due convenzioni della dispensa (NF-28): o K_m è la pendenza con segno (C_m = C_m0 + K_m ω) o è il suo modulo (C_m = C_m0 − K_m ω). Va dichiarato.', fonte: { tipo: 'dispensa', pag: 199 } },
    { frase: 'L\'equazione si ricava sommando i momenti sull\'albero.', perche: 'Non è sbagliato, ma la dispensa la ricava con il T.F.V. (bilancio di potenze), che è il metodo che poi serve con la trasmissione.', fonte: P197 },
  ],
  approfondimenti: [
    { domanda: 'Perché usi il teorema delle forze vive e non l\'equilibrio dei momenti?', tipo: 'collegamento', argomento: 'c1-statica-dinamica', attesa: 'Per un solo grado di libertà sono equivalenti; il bilancio di potenze però vale anche quando motore e utilizzatore ruotano a velocità diverse (trasmissione), ed è come lo scrive la dispensa.', fonte: P197 },
    { domanda: 'Il sistema si avvia sempre?', tipo: 'approfondimento', attesa: 'No: serve C_m(0) > C_u(0), cioè coppia di spunto C_A maggiore della coppia resistente a ω = 0. Nell\'esempio di p. 198 C_A < C_u0: da fermo non parte.', fonte: { tipo: 'dispensa', pag: [197, 198] } },
    { domanda: 'Nell\'esempio con due intersezioni, che cosa succede se il sistema è in Q e la velocità cala un poco?', tipo: 'approfondimento', attesa: 'C_u supera C_m, il sistema decelera fino a fermarsi; se invece la velocità cresce, C_m > C_u e il sistema accelera fino a P, che è stabile.', fonte: { tipo: 'dispensa', pag: 198 } },
    { domanda: 'Dove lavora normalmente un motore asincrono e perché?', tipo: 'approfondimento', attesa: 'Sul tratto discendente e ripido fra la velocità nominale e quella di sincronismo (zona di normale funzionamento): lì K_m è molto negativa e il punto è stabile; a sinistra del massimo il funzionamento può essere instabile.', fonte: { tipo: 'dispensa', pag: 195 } },
    { domanda: 'Quanto tempo serve per arrivare al 90 % del regime e da cosa dipende?', tipo: 'approfondimento', attesa: 't_90% = (I_eq/K_m) ln 10 ≈ 2,3 I_eq/K_m: proporzionale all\'inerzia, inversamente proporzionale alla pendenza del motore.', fonte: P200 },
    { domanda: 'Che caratteristica ha un ascensore? E un\'automobile?', tipo: 'approfondimento', attesa: 'Ascensore: coppia costante C_u = (M_cab − M_contr) g R, indipendente da ω. Auto: C_u = (f M g cos α + M g sin α + ½ρC_x S V²) R_p, parabolica in V (la dispensa scrive f M g senza cos α, NF-28).', fonte: { tipo: 'dispensa', pag: [195, 196] } },
    { domanda: 'E se fra motore e utilizzatore c\'è un riduttore?', tipo: 'collegamento', argomento: 'c6-trasmissione', attesa: 'Si riduce tutto all\'albero motore: (I_m + τ² I_u) ω̇_m = C_m − τ C_u; il regime è C_m = τ C_u.', fonte: { tipo: 'dispensa', pag: 201 } },
  ],
  simboli: [
    { simbolo: 'C_m,\\ C_u', significato: 'coppia motrice; modulo della coppia resistente dell\'utilizzatore' },
    { simbolo: 'I_m,\\ I_u', significato: 'inerzia lato motore e lato utilizzatore', altrove: 'J_m, J_u nelle risposte alle domande' },
    { simbolo: 'I_{eq}', significato: 'inerzia equivalente: I_m + I_u nell\'accoppiamento diretto (NF-221)', altrove: 'J_eq' },
    { simbolo: '\\omega,\\ \\dot\\omega', significato: 'velocità e accelerazione angolare comuni' },
    { simbolo: '\\omega_R,\\ \\omega_P', significato: 'velocità di regime (punto P d\'intersezione)', altrove: 'ω_r in q08, ω₀ in d102' },
    { simbolo: 'K_m,\\ K_u', significato: 'pendenze dC/dω in P, con segno nella stabilità (p. 198); nelle pp. 199–206 K_m è il modulo (NF-28)', altrove: 'q08 usa f′(ω) = dC_m/dω − dC_u/dω' },
    { simbolo: '\\Omega', significato: 'scostamento ω − ω_P dalla velocità di regime', altrove: 'δω (q08), Δω (d103–d104)' },
    { simbolo: 'C_A,\\ C_{u0}', significato: 'coppie a ω = 0: spunto del motore, utilizzatore', altrove: 'C_s (p. 194), M_s (figura p. 195)' },
    { simbolo: '\\omega_S', significato: 'velocità di sincronismo (coppia motrice nulla)', altrove: 'n_0 in giri/min nella figura di p. 195' },
    { simbolo: 't_{\\%}', significato: 'tempo per raggiungere la frazione % della velocità di regime' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c6-regime' }, { kind: 'meccanismo', id: 'c6-transitorio' }],
  previsioni: [
    {
      id: 'c6-dir-Q',
      domanda: 'Esempio di p. 198: il sistema è nel punto Q (tratto crescente della C_m) e una piccola perturbazione ne riduce la velocità. Che cosa succede?',
      opzioni: ['torna in Q', 'si porta in P', 'rallenta fino a fermarsi', 'oscilla attorno a Q'],
      corretta: 2,
      spiega: 'Sotto ω_Q la coppia resistente supera la motrice: il sistema decelera e, a ω = 0, la coppia di spunto non basta a ripartire (C_A < C_u0).',
      verify: () => {
        const cu = (w: number) => cuParabolico(w, CARICO_P198);
        const [Q, P] = puntiDiRegime(cmA, cu, M.omegaS, (w) => dcmAsincrono(w, M), (w) => dcuParabolico(w, CARICO_P198));
        const fine = simulaDiretto(Q.omega - 1, 60, cmA, cu, 2);
        return fine < 1e-6 ? 2 : Math.abs(fine - P.omega) < 0.5 ? 1 : Math.abs(fine - Q.omega) < 0.5 ? 0 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c6-regime' },
    },
    {
      id: 'c6-dir-P',
      domanda: 'Esempio di p. 197: in P la caratteristica del motore scende ripida e quella dell\'utilizzatore sale. P è…',
      opzioni: ['stabile', 'instabile', 'indifferente: dipende dall\'inerzia'],
      corretta: 0,
      spiega: 'K_m < 0 < K_u, quindi K_m − K_u < 0: lo scostamento si smorza. L\'inerzia cambia solo la rapidità, non il verdetto.',
      verify: () => {
        const [P] = puntiDiRegime(cmA, (w) => cuParabolico(w, CARICO_P197), M.omegaS, (w) => dcmAsincrono(w, M), (w) => dcuParabolico(w, CARICO_P197));
        return P.stabile ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c6-regime' },
    },
    {
      id: 'c6-dir-inerzia',
      domanda: 'Raddoppi l\'inerzia I_eq lasciando uguali le caratteristiche. Il tempo per arrivare al 90 % del regime…',
      opzioni: ['resta uguale', 'raddoppia', 'si dimezza', 'quadruplica'],
      corretta: 1,
      spiega: 't_90% = (I_eq/K_m) ln 10: è proporzionale all\'inerzia («tempo ∝ inerzia», p. 200). La velocità di regime invece non cambia.',
      verify: () => {
        const a = transitorioCC({ Cm0: 100, Km: 1, Cu0: 40, Ieq: 2 }).tPerc(0.9), b = transitorioCC({ Cm0: 100, Km: 1, Cu0: 40, Ieq: 4 }).tPerc(0.9);
        const r = b / a;
        return Math.abs(r - 1) < 1e-9 ? 0 : Math.abs(r - 2) < 1e-9 ? 1 : Math.abs(r - 0.5) < 1e-9 ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c6-transitorio' },
    },
    {
      id: 'c6-dir-ln10',
      domanda: 'Quante costanti di tempo I_eq/K_m servono per arrivare al 90 % della velocità di regime?',
      opzioni: ['0,1', '0,9', 'circa 2,3', '10'],
      corretta: 2,
      spiega: 'e^{−t/T} = 0,1 ⇒ t = T ln 10 ≈ 2,30 T. Lo 0,1 è quello che darebbe la formula della dispensa senza logaritmo (NF-28).',
      verify: () => {
        const r = transitorioCC({ Cm0: 100, Km: 2, Cu0: 30, Ieq: 3 });
        const n = r.tPerc(0.9) / r.T;
        return [0.1, 0.9, Math.log(10), 10].findIndex((x) => Math.abs(x - n) < 1e-9);
      },
      visual: { kind: 'meccanismo', id: 'c6-transitorio' },
    },
  ],
  nf: ['NF-28', 'NF-221', 'NF-223', 'NF-224', 'NF-230'],
};
