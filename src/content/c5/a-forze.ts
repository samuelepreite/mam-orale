/**
 * C5 parte a · Forze fra denti dritti senza e con attrito, rendimento istantaneo, strisciamento e potenza dissipata
 * (domanda q25). Dispensa pp. 162, 169–170, 172 (tools/testi/cap5a.md).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { contattoConAttrito, puntoRetta } from '../../engine/c5a';
import { figIngranaggio } from './a-figure';

const DEG = Math.PI / 180;
type V = [number, number];
const wk = (w: number, r: V): V => [-w * r[1], w * r[0]];
const cz = (a: V, b: V) => a[0] * b[1] - a[1] * b[0];
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1];
const P169 = { tipo: 'dispensa', pag: 169 } as const;

/** dati comuni: ruota 1 motrice antioraria, 2 condotta oraria; x = CP > 0 */
function dati(rnd: () => number): Vars {
  const R1 = U(rnd, 0.03, 0.2), R2 = U(rnd, 0.02, 0.15), th = U(rnd, 14, 25) * DEG, f = U(rnd, 0.03, 0.15);
  const C1 = U(rnd, 5, 500), w1 = U(rnd, 5, 300);
  const x = U(rnd, 0.02, 0.8) * Math.min(R1, R2) * Math.sin(th);
  const w2 = (-w1 * R1) / R2;
  const c = Math.cos(th), sn = Math.sin(th), t = Math.tan(th);
  return { R1, R2, th, f, C1, w1, w2, x, c, sn, t, Rf1: R1 * c, Rf2: R2 * c };
}

/** velocità nel contatto P = C + s u (vettori, polo O₁ nell'origine) */
function velocita(v: Vars, s: number) {
  const i = v.R1 + v.R2;
  const P = puntoRetta(v.R1, v.th, s), PC: V = [P[0] - v.R1, P[1]], P2: V = [P[0] - i, P[1]];
  const V1 = wk(v.w1, P), V2 = wk(v.w2, P2);
  const V21: V = [V2[0] - V1[0], V2[1] - V1[1]], V12: V = [-V21[0], -V21[1]];
  return { P, PC, V1, V2, V21, V12, rel21: wk(v.w2 - v.w1, PC) };
}

// ------------------------------------------------------------------ d083 senza attrito
export const d083: Dimostrazione = {
  id: 'd083',
  titolo: 'Forze fra denti dritti senza attrito',
  enunciato: 'Con contatto liscio, ricavare la forza scambiata fra i denti in funzione della coppia motrice e scomporla in componente tangenziale (che trasmette la coppia) e radiale.',
  ipotesi: ['contatto liscio (f = 0)', 'regime, masse delle ruote ininfluenti; ruota 1 motrice', 'profili a evolvente: la normale comune è la retta di pressione'],
  sample: (rnd) => {
    const v = dati(rnd);
    const r = contattoConAttrito({ R1: v.R1, R2: v.R2, theta: v.th, f: 0, s: -v.x, C1: v.C1, w1: v.w1 });
    const F21: V = [-r.N * v.sn, -r.N * v.c]; // forza della 2 sulla 1, lungo −u (verso H₁)
    const Q = Math.abs(dot(F21, [0, 1])), Rr = Math.abs(dot(F21, [1, 0])); // componenti nel punto C: tangente alla primitiva e radiale
    return { ...v, N: r.N, C2: r.C2, Q, Rr };
  },
  passi: [
    {
      id: 'd083.1',
      latex: '\\underline{F}_{2,1} \\parallel \\overline{H_1H_2}',
      perche: 'Senza attrito la forza di contatto è normale alle superfici dei denti; per i profili a evolvente la normale comune è la retta di pressione, quindi la forza ha sempre la stessa direzione durante l\'ingranamento.',
      fonte: { tipo: 'dispensa', pag: 162 },
      distrattori: [],
    },
    {
      id: 'd083.2',
      latex: 'C_1 - F_{2,1}\\,R_{f1} = 0 \\;\\Rightarrow\\; C_1 = F_{2,1}R_{f1}',
      perche: 'Equilibrio alla rotazione della ruota 1 attorno a $O_1$ (II equazione cardinale): il braccio di una forza diretta lungo la retta di pressione è la distanza di $O_1$ dalla retta, cioè $\\overline{O_1H_1} = R_{f1}$, qualunque sia il punto di contatto.',
      fonte: { tipo: 'dispensa', pag: 162 },
      chiave: true,
      distrattori: [
        { latex: 'C_1 = F_{2,1}R_1', errore: 'indice', spiega: 'R₁ è la distanza di O₁ da C, ma la forza non è perpendicolare a O₁C: il braccio è il raggio fondamentale R_f1 = R₁ cos θ.', num: (v) => [v.C1, v.N * v.R1] },
        { latex: 'C_1 = F_{2,1}R_{f1}\\cos\\theta', errore: 'fattore', spiega: 'Il cos θ è già dentro R_f1 = R₁ cos θ: contarlo due volte sottostima la coppia.', num: (v) => [v.C1, v.N * v.Rf1 * v.c] },
      ],
      num: (v) => [v.C1, v.N * v.Rf1],
    },
    {
      id: 'd083.3',
      latex: 'Q = F_{2,1}\\cos\\theta \\;\\Rightarrow\\; C_1 = F_{2,1}\\cos\\theta\\,R_1 = Q\\,R_1',
      perche: 'Portando la forza in C e scomponendola: la componente tangente alla primitiva è $Q = F_{2,1}\\cos\\theta$ (θ è l\'angolo fra la retta di pressione e la tangente alle primitive), con braccio $R_1$. È lo stesso momento di prima, perché $R_{f1} = R_1\\cos\\theta$.',
      fonte: { tipo: 'dispensa', pag: 162 },
      chiave: true,
      distrattori: [
        { latex: 'Q = F_{2,1}\\sin\\theta', errore: 'concetto', spiega: 'F sin θ è la componente radiale: θ è misurato dalla tangente alle primitive, quindi la tangenziale ha il coseno.', num: (v) => [v.C1, v.N * v.sn * v.R1] },
        { latex: 'Q = \\dfrac{F_{2,1}}{\\cos\\theta}', errore: 'fattore', spiega: 'Una componente non può superare la forza: Q = F cos θ, e quindi F = Q/cos θ.', num: (v) => [v.C1, (v.N / v.c) * v.R1] },
      ],
      num: (v) => [v.C1, v.Q * v.R1],
    },
    {
      id: 'd083.4',
      latex: 'R_{2,1} = F_{2,1}\\sin\\theta = Q\\tan\\theta',
      perche: 'La componente radiale passa per $O_1$: dà momento nullo e non trasmette potenza, ma carica alberi e supporti (tende ad allontanare le ruote). Cresce con l\'angolo di pressione.',
      fonte: { tipo: 'deduzione', da: 'p. 162 (Q = F cos θ) e p. 172 («R₂,₁ sarà sempre radiale quindi darà momento nullo»)', spiegazione: 'scomposizione della forza lungo la retta di pressione nelle direzioni tangente e radiale in C (NF-191)' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Rr, v.Q * v.t],
    },
    {
      id: 'd083.5',
      latex: 'C_2 = F_{1,2}R_{f2} \\;\\Rightarrow\\; \\dfrac{C_1}{C_2} = \\dfrac{R_{f1}}{R_{f2}} = -\\tau',
      perche: 'Stesso equilibrio sulla ruota 2, con la reazione $F_{1,2} = -F_{2,1}$ (azione e reazione): le coppie stanno come i raggi fondamentali, cioè come i primitivi.',
      fonte: { tipo: 'dispensa', pag: 162 },
      distrattori: [],
      num: (v) => [v.C1 / v.C2, v.Rf1 / v.Rf2],
    },
    {
      id: 'd083.6',
      latex: 'F_{2,1} = \\dfrac{C_1}{R_1\\cos\\theta} = \\dfrac{Q}{\\cos\\theta}',
      perche: 'Forza fra i denti in funzione della coppia motrice: a parità di coppia, un angolo di pressione più grande aumenta la forza (e la radiale).',
      fonte: { tipo: 'dispensa', pag: [162, 170] },
      distrattori: [],
      num: (v) => [v.N, v.C1 / (v.R1 * v.c)],
    },
  ],
  risultato: { latex: 'C_1 = F_{2,1}R_{f1} = Q R_1,\\quad Q = F_{2,1}\\cos\\theta,\\quad R_{2,1} = F_{2,1}\\sin\\theta = Q\\tan\\theta', fonte: { tipo: 'dispensa', pag: [162, 172] } },
  gancio: 'La forza corre sulla retta di pressione: braccio R_f, tangenziale Q = F cos θ, radiale F sin θ a momento nullo.',
};

// ------------------------------------------------------------------ d084 con attrito, rendimento istantaneo
export const d084: Dimostrazione = {
  id: 'd084',
  titolo: 'Forze con attrito e rendimento istantaneo',
  enunciato: 'Con attrito coulombiano f fra i denti, trovare il verso della forza d\'attrito, scrivere l\'equilibrio alla rotazione delle due ruote con il contatto P a distanza x da C e ricavare il rendimento istantaneo in accesso e in recesso.',
  ipotesi: [
    'ruota 1 motrice antioraria (coppia C₁), ruota 2 condotta oraria (coppia resistente C₂); regime',
    'attrito coulombiano: F_T = f F_N, perpendicolare alla retta di pressione, opposto alla velocità relativa',
    'x = CP ≥ 0: in accesso P fra B e C (verso H₁), in recesso fra C e A (verso H₂)',
  ],
  sample: (rnd) => {
    const v = dati(rnd);
    const A = contattoConAttrito({ R1: v.R1, R2: v.R2, theta: v.th, f: v.f, s: -v.x, C1: v.C1, w1: v.w1 });
    const Rr = contattoConAttrito({ R1: v.R1, R2: v.R2, theta: v.th, f: v.f, s: v.x, C1: v.C1, w1: v.w1 });
    const C0 = contattoConAttrito({ R1: v.R1, R2: v.R2, theta: v.th, f: v.f, s: 0, C1: v.C1, w1: v.w1 });
    const vel = velocita(v, -v.x);
    return { ...v, NA: A.N, C2A: A.C2, etaA: A.eta, NR: Rr.N, C2R: Rr.C2, etaR: Rr.eta, eta0: C0.eta, V21x: vel.V21[0], rel21x: vel.rel21[0] };
  },
  passi: [
    {
      id: 'd084.1',
      latex: '\\underline{V}^{rel}_{2,1} = \\underline{V_2} - \\underline{V_1} = \\underline{\\omega}_{2,1}\\wedge(P - C),\\qquad \\underline{\\omega}_{2,1} = \\underline{\\omega_2} - \\underline{\\omega_1}',
      perche: 'Per trovare il verso dell\'attrito serve la velocità relativa nel contatto: $V_1$ è la velocità di trascinamento, e C è il C.I.R. del moto relativo (d074).',
      fonte: P169,
      distrattori: [],
      num: (v) => [v.V21x, v.rel21x],
    },
    {
      id: 'd084.2',
      latex: '\\omega_2\\ \\text{oraria},\\ \\omega_1\\ \\text{antioraria} \\Rightarrow \\underline{\\omega}_{2,1}\\ \\text{oraria} \\Rightarrow \\underline{F}_T^{2,1} = f F_N^{2,1}\\ \\text{opposta a } \\underline{V}^{rel}_{1,2}',
      perche: '«Orario meno antiorario» dà una rotazione relativa oraria; $\\omega_{1,2} = -\\omega_{2,1}$ è antioraria. Con P fra B e C, $V^{rel}_{1,2} = \\omega_{1,2}\\wedge(P - C)$ è perpendicolare alla retta, verso il basso a destra: l\'attrito della 2 sulla 1 è opposto, verso l\'alto a sinistra. Quando P passa oltre C, $P - C$ cambia verso e con esso l\'attrito.',
      fonte: P169,
      chiave: true,
      distrattori: [
        { latex: '\\underline{F}_T^{2,1}\\ \\text{concorde a } \\underline{V}^{rel}_{1,2}', errore: 'segno', spiega: 'L\'attrito si oppone allo strisciamento del corpo su cui agisce: su 1 è opposto alla velocità di 1 rispetto a 2.' },
        { latex: '\\underline{F}_T^{2,1}\\ \\text{con lo stesso verso in accesso e in recesso}', errore: 'concetto', spiega: 'La velocità relativa si annulla in C e cambia verso: l\'attrito si inverte passando per il punto primitivo.' },
      ],
    },
    {
      id: 'd084.3',
      latex: 'O_1)\\quad C_1 - F_N^{2,1}\\,\\overline{O_1H_1} + F_T^{2,1}\\,\\overline{PH_1} = 0 \\;\\Rightarrow\\; C_1 - F_N^{2,1}R_{f1} + F_T^{2,1}\\big(R_1\\sin\\theta - x\\big) = 0',
      perche: 'Equilibrio alla rotazione della ruota 1 in accesso: la normale ha braccio $R_{f1}$; l\'attrito è perpendicolare alla retta di pressione, quindi il suo braccio è la distanza di $O_1$ misurata lungo la retta, $\\overline{PH_1} = \\overline{CH_1} - x = R_1\\sin\\theta - x$, e il suo momento ha il verso di $C_1$.',
      fonte: P169,
      chiave: true,
      distrattori: [
        { latex: 'C_1 - F_N^{2,1}R_{f1} + F_T^{2,1}\\big(R_1\\sin\\theta + x\\big) = 0', errore: 'segno', spiega: 'In accesso P sta fra C e H₁: PH₁ = CH₁ − x. Con + x è il braccio PH₂ della ruota 2 (o il caso di recesso).', num: (v) => [v.C1, v.NA * v.Rf1 - v.f * v.NA * (v.R1 * v.sn + v.x)] },
        { latex: 'C_1 - F_N^{2,1}R_{f1} + F_T^{2,1}R_1 = 0', errore: 'concetto', spiega: 'L\'attrito è perpendicolare alla retta di pressione: il braccio si misura lungo la retta, da H₁ a P.', num: (v) => [v.C1, v.NA * v.Rf1 - v.f * v.NA * v.R1] },
        { latex: 'C_1 - F_N^{2,1}R_{f1} + F_T^{2,1}x = 0', errore: 'termine-perso', spiega: 'Il braccio è misurato da H₁ (piede della perpendicolare da O₁), non da C: manca il tratto CH₁ = R₁ sin θ.', num: (v) => [v.C1, v.NA * v.Rf1 - v.f * v.NA * v.x] },
      ],
      num: (v) => [v.C1, v.NA * v.Rf1 - v.f * v.NA * (v.R1 * v.sn - v.x)],
    },
    {
      id: 'd084.4',
      latex: 'F_N^{2,1} = \\dfrac{C_1}{R_1\\cos\\theta - f\\,(R_1\\sin\\theta - x)}',
      perche: 'Si sostituisce $F_T = f F_N$ e $R_{f1} = R_1\\cos\\theta$ e si risolve per la normale.',
      fonte: P169,
      distrattori: [],
      num: (v) => [v.NA, v.C1 / (v.R1 * v.c - v.f * (v.R1 * v.sn - v.x))],
    },
    {
      id: 'd084.5',
      latex: 'O_2)\\quad C_2 - F_N^{1,2}R_{f2} + F_T^{1,2}\\big(R_2\\sin\\theta + x\\big) = 0 \\;\\Rightarrow\\; F_N^{1,2} = \\dfrac{C_2}{R_2\\cos\\theta - f\\,(R_2\\sin\\theta + x)}',
      perche: 'Stesso equilibrio sulla ruota 2, con le reazioni $F^{1,2} = -F^{2,1}$: il braccio dell\'attrito è $\\overline{PH_2} = \\overline{CH_2} + x = R_2\\sin\\theta + x$ e il suo momento si oppone alla rotazione della 2 (qui $C_2$ è il modulo della coppia resistente).',
      fonte: P169,
      distrattori: [],
      num: (v) => [v.C2A, v.NA * (v.R2 * v.c - v.f * (v.R2 * v.sn + v.x))],
    },
    {
      id: 'd084.6',
      latex: '\\dfrac{C_2}{C_1} = \\dfrac{R_2\\cos\\theta - f\\,(R_2\\sin\\theta + x)}{R_1\\cos\\theta - f\\,(R_1\\sin\\theta - x)}',
      perche: 'La normale è la stessa sulle due ruote ($|F_N^{1,2}| = |F_N^{2,1}|$): si uguagliano le due espressioni.',
      fonte: P169,
      distrattori: [],
      num: (v) => [v.C2A / v.C1, (v.R2 * v.c - v.f * (v.R2 * v.sn + v.x)) / (v.R1 * v.c - v.f * (v.R1 * v.sn - v.x))],
    },
    {
      id: 'd084.7',
      latex: '\\eta_A = \\dfrac{|C_2||\\omega_2|}{|C_1||\\omega_1|} = \\dfrac{C_2}{C_1}\\dfrac{R_1}{R_2} = \\dfrac{1 - f\\Big(\\tan\\theta + \\dfrac{x}{R_2\\cos\\theta}\\Big)}{1 - f\\Big(\\tan\\theta - \\dfrac{x}{R_1\\cos\\theta}\\Big)} \\le 1',
      perche: 'Rendimento istantaneo: potenza uscente su potenza entrante. Con $|\\omega_2|/|\\omega_1| = R_1/R_2$ e raccogliendo $R_i\\cos\\theta$ si ottiene la forma della dispensa (fase di accesso, da B a C).',
      fonte: P169,
      chiave: true,
      distrattori: [
        { latex: '\\eta_A = \\dfrac{C_2}{C_1}', errore: 'termine-perso', spiega: 'Il rendimento è un rapporto di potenze: manca il rapporto delle velocità |ω₂|/|ω₁| = R₁/R₂.', num: (v) => [v.etaA, v.C2A / v.C1] },
        { latex: '\\eta_A = \\dfrac{1 - f\\Big(\\tan\\theta + \\dfrac{x}{R_2\\cos\\theta}\\Big)}{1 - f\\Big(\\tan\\theta + \\dfrac{x}{R_1\\cos\\theta}\\Big)}', errore: 'segno', spiega: 'Sulla ruota 1 il braccio dell\'attrito è R₁ sin θ − x: al denominatore c\'è tan θ − x/(R₁ cos θ).', num: (v) => [v.etaA, (1 - v.f * (v.t + v.x / (v.R2 * v.c))) / (1 - v.f * (v.t + v.x / (v.R1 * v.c)))] },
      ],
      num: (v) => [v.etaA, (1 - v.f * (v.t + v.x / (v.R2 * v.c))) / (1 - v.f * (v.t - v.x / (v.R1 * v.c)))],
    },
    {
      id: 'd084.8',
      latex: '\\text{recesso:}\\quad F_N^{2,1} = \\dfrac{C_1}{R_1\\cos\\theta + f\\,(R_1\\sin\\theta + x)}',
      perche: 'Oltre C l\'attrito cambia verso: ora si oppone al comando sulla ruota 1, e il contatto è a distanza $R_1\\sin\\theta + x$ da $H_1$. È la formula che q25 attribuisce alla dispensa senza dire che vale in recesso (NF-26).',
      fonte: { tipo: 'deduzione', da: 'p. 169 (stesso equilibrio con P fra C e A; η_R scritto dalla dispensa)', spiegazione: 'equilibrio alla rotazione della ruota 1 con l\'attrito invertito e braccio CH₁ + x' },
      aggiunto: true,
      distrattori: [
        { latex: '\\text{recesso:}\\quad F_N^{2,1} = \\dfrac{C_1}{R_1\\cos\\theta - f\\,(R_1\\sin\\theta - x)}', errore: 'concetto', spiega: 'È la formula di accesso: in recesso l\'attrito e il braccio cambiano.', num: (v) => [v.NR, v.C1 / (v.R1 * v.c - v.f * (v.R1 * v.sn - v.x))] },
      ],
      num: (v) => [v.NR, v.C1 / (v.R1 * v.c + v.f * (v.R1 * v.sn + v.x))],
    },
    {
      id: 'd084.9',
      latex: '\\eta_R = \\dfrac{1 + f\\Big(\\tan\\theta - \\dfrac{x}{R_2\\cos\\theta}\\Big)}{1 + f\\Big(\\tan\\theta + \\dfrac{x}{R_1\\cos\\theta}\\Big)}',
      perche: 'Rendimento in fase di recesso (da C ad A): stessi passaggi con l\'attrito invertito.',
      fonte: P169,
      distrattori: [],
      num: (v) => [v.etaR, (1 + v.f * (v.t - v.x / (v.R2 * v.c))) / (1 + v.f * (v.t + v.x / (v.R1 * v.c)))],
    },
    {
      id: 'd084.10',
      latex: 'x = 0:\\quad \\eta_A = \\eta_R = 1',
      perche: 'In C non c\'è strisciamento, l\'attrito non lavora: il rendimento istantaneo vale 1 e cala allontanandosi da C, in accesso e in recesso.',
      fonte: P169,
      distrattori: [],
      num: (v) => [v.eta0, 1],
    },
  ],
  risultato: {
    latex: '\\eta_A = \\dfrac{1 - f\\big(\\tan\\theta + \\frac{x}{R_2\\cos\\theta}\\big)}{1 - f\\big(\\tan\\theta - \\frac{x}{R_1\\cos\\theta}\\big)},\\qquad \\eta_R = \\dfrac{1 + f\\big(\\tan\\theta - \\frac{x}{R_2\\cos\\theta}\\big)}{1 + f\\big(\\tan\\theta + \\frac{x}{R_1\\cos\\theta}\\big)}',
    fonte: P169,
  },
  gancio: 'Verso dell\'attrito da ω₂,₁, bracci R_f per la normale e PH per l\'attrito; il rendimento è 1 solo in C.',
};

// ------------------------------------------------------------------ d085 velocità di strisciamento
export const d085: Dimostrazione = {
  id: 'd085',
  titolo: 'Velocità di strisciamento fra i denti',
  enunciato: 'Ricavare la velocità relativa fra i profili nel punto di contatto P a distanza x da C, per due ruote esterne.',
  ipotesi: ['ruote esterne, ω₁ e ω₂ opposte; C punto di puro rotolamento', 'P sulla retta di pressione, x = CP'],
  sample: (rnd) => {
    const v = dati(rnd);
    const s = (U(rnd, -1, 1) * v.x) || v.x;
    const vel = velocita(v, s);
    const r = contattoConAttrito({ R1: v.R1, R2: v.R2, theta: v.th, f: v.f, s, C1: v.C1, w1: v.w1 });
    const u: V = [v.sn, v.c];
    return { ...v, s, V21y: vel.V21[1], rel21y: vel.rel21[1], vr: r.vrel, vrDotU: dot(vel.V21, u) / Math.hypot(vel.V21[0], vel.V21[1]) };
  },
  passi: [
    {
      id: 'd085.1',
      latex: '\\underline{V}^{R}_{2,1} = (\\underline{\\omega_2} - \\underline{\\omega_1})\\wedge(P - C)',
      perche: 'Velocità del punto di contatto della ruota 2 rispetto alla ruota 1: rotazione relativa attorno a C, che è il C.I.R. del moto relativo (d074).',
      fonte: { tipo: 'dispensa', pag: [160, 169] },
      distrattori: [],
      num: (v) => [v.V21y, v.rel21y],
    },
    {
      id: 'd085.2',
      latex: '\\omega_1\\omega_2 < 0 \\;\\Rightarrow\\; |\\omega_2 - \\omega_1| = |\\omega_1| + |\\omega_2|',
      perche: 'Nelle ruote esterne le velocità angolari hanno versi opposti: la differenza delle componenti lungo k ha per modulo la somma dei moduli.',
      fonte: { tipo: 'dispensa', pag: 170 },
      chiave: true,
      distrattori: [
        { latex: '|\\omega_2 - \\omega_1| = |\\omega_1| - |\\omega_2|', errore: 'segno', spiega: 'Con versi opposti la differenza vettoriale somma i moduli; la differenza dei moduli vale per le ruote interne (ω concordi).', num: (v) => [Math.abs(v.w2 - v.w1), Math.abs(v.w1) - Math.abs(v.w2)] },
        { latex: '|\\omega_2 - \\omega_1| = |\\omega_1|', errore: 'termine-perso', spiega: 'Il moto relativo coinvolge entrambe le rotazioni: non basta quella della motrice.', num: (v) => [Math.abs(v.w2 - v.w1), Math.abs(v.w1)] },
      ],
      num: (v) => [Math.abs(v.w2 - v.w1), Math.abs(v.w1) + Math.abs(v.w2)],
    },
    {
      id: 'd085.3',
      latex: '|\\underline{V}^{rel}| = (|\\omega_1| + |\\omega_2|)\\,x,\\qquad \\underline{V}^{rel} \\perp \\overline{H_1H_2}',
      perche: '$P - C$ sta sulla retta di pressione e ω è perpendicolare al piano: il prodotto vettoriale è perpendicolare alla retta, cioè tangente ai profili (strisciamento puro, niente componente normale), e ha modulo $|\\omega_2 - \\omega_1|\\cdot\\overline{CP}$.',
      fonte: { tipo: 'dispensa', pag: 170 },
      chiave: true,
      distrattori: [
        { latex: '|\\underline{V}^{rel}| = (|\\omega_1| + |\\omega_2|)\\,R_1', errore: 'concetto', spiega: 'Il braccio è la distanza dal C.I.R. relativo C, non dal centro O₁: in C lo strisciamento è nullo.', num: (v) => [v.vr, (Math.abs(v.w1) + Math.abs(v.w2)) * v.R1] },
        { latex: '\\underline{V}^{rel} \\parallel \\overline{H_1H_2}', errore: 'concetto', spiega: 'Una componente lungo la normale comune vorrebbe dire compenetrazione o distacco: la velocità relativa è tangente ai profili.', num: (v) => [Math.abs(v.vrDotU), 1] },
      ],
      num: (v) => [v.vr, (Math.abs(v.w1) + Math.abs(v.w2)) * Math.abs(v.s)],
    },
    {
      id: 'd085.4',
      latex: 'x = 0 \\Rightarrow \\underline{V}^{rel} = \\underline{0};\\qquad P - C \\text{ cambia verso in } C \\Rightarrow \\underline{V}^{rel} \\text{ cambia verso}',
      perche: 'In C c\'è rotolamento puro; lo strisciamento cresce linearmente allontanandosi da C, in versi opposti in accesso e in recesso. Per questo conviene che il contatto avvenga vicino a C.',
      fonte: { tipo: 'dispensa', pag: [160, 170] },
      distrattori: [],
    },
    {
      id: 'd085.5',
      latex: '|\\underline{V}^{rel}| = |\\omega_1|\\Big(1 + \\dfrac{R_1}{R_2}\\Big)x = |\\omega_1|\\,(1 + |\\tau|)\\,x',
      perche: 'Con $|\\omega_2| = |\\omega_1| R_1/R_2$: a parità di velocità della motrice, lo strisciamento è maggiore quando la condotta è piccola (|τ| grande). Con la dentiera ($\\tau = 0$) resta $|\\omega_1|x$.',
      fonte: { tipo: 'deduzione', da: 'p. 170 (|V^rel| = (|ω₁| + |ω₂|)x) e |τ| = R₁/R₂', spiegazione: 'sostituzione di |ω₂| = |τ||ω₁|' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.vr, Math.abs(v.w1) * (1 + v.R1 / v.R2) * Math.abs(v.s)],
    },
  ],
  risultato: { latex: '\\underline{V}^{R}_{2,1} = (\\underline{\\omega_2} - \\underline{\\omega_1})\\wedge(P - C),\\qquad |\\underline{V}^{rel}| = (|\\omega_1| + |\\omega_2|)\\,x', fonte: { tipo: 'dispensa', pag: [160, 170] } },
  gancio: 'Rotazione relativa attorno a C: velocità di strisciamento = (|ω₁| + |ω₂|) per la distanza da C.',
};

// ------------------------------------------------------------------ d086 potenza dissipata
export const d086: Dimostrazione = {
  id: 'd086',
  titolo: 'Potenza dissipata per attrito fra i denti',
  enunciato: 'Ricavare la potenza dissipata per attrito nel contatto fra due denti e il suo andamento mentre il contatto percorre il segmento AB.',
  ipotesi: [
    'attrito coulombiano F_T = f F_N opposto alla velocità relativa',
    'ipotesi semplificata della dispensa: F_N pari a quella del contatto liscio, C₁/(R₁ cos θ)',
    'regime: ω₁ costante; ruota 1 motrice',
  ],
  sample: (rnd) => {
    const v = dati(rnd);
    const s = -v.x;
    const vel = velocita(v, s);
    const r = contattoConAttrito({ R1: v.R1, R2: v.R2, theta: v.th, f: v.f, s, C1: v.C1, w1: v.w1 });
    const vr = Math.hypot(vel.V12[0], vel.V12[1]);
    const FT21: V = [(-v.f * r.N * vel.V12[0]) / vr, (-v.f * r.N * vel.V12[1]) / vr];
    const W = dot(FT21, vel.V12), triplo = cz(vel.PC, FT21) * (v.w1 - v.w2);
    // il contatto avanza sulla retta: L(φ) = R_f1(λ₀ + φ + θ) (origine dell'evolvente)
    const lam0 = U(rnd, 0, 1), dphi = 1e-3, vP = ((v.Rf1 * (lam0 + dphi + v.th) - v.Rf1 * (lam0 + v.th)) / dphi) * v.w1;
    // energia dissipata da una coppia di denti: K|s(t)| con s da −BC a AC; due tratti lineari (trapezi esatti)
    const BC = U(rnd, 0.3, 1) * v.R2 * v.sn, AC = U(rnd, 0.3, 1) * v.R2 * v.sn;
    const tB = BC / (v.Rf1 * v.w1), tA = AC / (v.Rf1 * v.w1);
    const E = (r.K * (BC + 0)) / 2 * tB + (r.K * (0 + AC)) / 2 * tA;
    return { ...v, N: r.N, W, triplo, K: r.K, Kx: r.Kx, vP, BC, AC, E };
  },
  passi: [
    {
      id: 'd086.1',
      latex: 'W^{DISS}_{ATTR} = \\underline{F_T}^{2,1}\\cdot\\underline{V}^{rel}_{1,2} = \\underline{F_T}^{2,1}\\cdot\\underline{\\omega}^R_{1,2}\\wedge(P - C) = (P - C)\\wedge\\underline{F_T}^{2,1}\\cdot\\underline{\\omega}^R_{1,2} < 0',
      perche: 'La potenza dell\'attrito è la forza d\'attrito su 1 per la velocità di 1 rispetto a 2 (le reazioni normali non lavorano nel moto relativo). Il prodotto misto si permuta ciclicamente. È negativa perché l\'attrito è opposto alla velocità relativa.',
      fonte: { tipo: 'dispensa', pag: 170 },
      distrattori: [],
      num: (v) => [v.W, v.triplo],
    },
    {
      id: 'd086.2',
      latex: '|W^{DISS}_{ATTR}| = |\\underline{F_T}^{2,1}|\\,|\\underline{V}^{rel}_{1,2}| = f\\,|F_N^{2,1}|\\,\\big(|\\omega_1| + |\\omega_2|\\big)\\,x',
      perche: 'Forza d\'attrito e velocità relativa sono parallele (opposte): il modulo del prodotto scalare è il prodotto dei moduli, con $|F_T| = f|F_N|$ e $|V^{rel}| = (|\\omega_1| + |\\omega_2|)x$ (d085).',
      fonte: { tipo: 'dispensa', pag: 170 },
      chiave: true,
      distrattori: [
        { latex: '|W^{DISS}| = f\\,|F_N|\\,\\big(|\\omega_1| - |\\omega_2|\\big)\\,x', errore: 'segno', spiega: 'Nelle ruote esterne la velocità angolare relativa è la somma dei moduli.', num: (v) => [Math.abs(v.W), v.f * v.N * (Math.abs(v.w1) - Math.abs(v.w2)) * v.x] },
        { latex: '|W^{DISS}| = f\\,|F_N|\\,|\\omega_1|\\,R_1', errore: 'concetto', spiega: 'Conta la velocità di strisciamento, non quella periferica: il braccio è la distanza da C.', num: (v) => [Math.abs(v.W), v.f * v.N * Math.abs(v.w1) * v.R1] },
      ],
      num: (v) => [Math.abs(v.W), v.f * v.N * (Math.abs(v.w1) + Math.abs(v.w2)) * v.x],
    },
    {
      id: 'd086.3',
      latex: '|F_N| \\simeq \\dfrac{C_1}{R_1\\cos\\theta} \\;\\Rightarrow\\; |W^{DISS}_{ATTR}| \\simeq \\underbrace{f\\,\\dfrac{C_1}{R_1\\cos\\theta}\\big(|\\omega_1| + |\\omega_2|\\big)}_{K}\\,x = K\\,x',
      perche: 'Ipotesi semplificata: per f piccolo la normale è quasi quella del contatto liscio. Allora la potenza dissipata è proporzionale alla distanza del contatto da C.',
      fonte: { tipo: 'dispensa', pag: 170 },
      chiave: true,
      distrattori: [
        { latex: 'K = f\\,\\dfrac{C_1}{R_1}\\big(|\\omega_1| + |\\omega_2|\\big)', errore: 'fattore', spiega: 'La normale del contatto liscio è C₁/R_f1 = C₁/(R₁ cos θ): il braccio è il raggio fondamentale.', num: (v) => [v.Kx, ((v.f * v.C1) / v.R1) * (Math.abs(v.w1) + Math.abs(v.w2)) * v.x] },
        { latex: '|W^{DISS}| \\simeq K\\,x^2', errore: 'concetto', spiega: 'Forza quasi costante per velocità di strisciamento lineare in x: la potenza è lineare in x.', num: (v) => [v.Kx, v.K * v.x * v.x] },
      ],
      num: (v) => [v.Kx, ((v.f * v.C1) / (v.R1 * v.c)) * (Math.abs(v.w1) + Math.abs(v.w2)) * v.x],
    },
    {
      id: 'd086.4',
      latex: '\\dot s = R_{f1}\\,\\omega_1 = \\text{cost} \\;\\Rightarrow\\; x(t)\\ \\text{lineare: diagramma a V, nullo in C, massimo in B e in A}',
      perche: 'Il punto di contatto è il punto della retta generatrice che svolge l\'evolvente della ruota 1: avanza sulla retta con la velocità periferica della fondamentale, costante. Quindi $|W| = Kx$ scende linearmente da B a C e risale da C ad A.',
      fonte: { tipo: 'deduzione', da: 'p. 170 (diagramma |W| in funzione di t con B, C, A) e p. 161 (retta che rotola sulla fondamentale)', spiegazione: 'la distanza del contatto da H₁ è R_f1 per l\'angolo di rotazione dell\'origine dell\'evolvente' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.vP, v.Rf1 * v.w1],
    },
    {
      id: 'd086.5',
      latex: 'E = \\int_{\\Delta t} K\\,|x|\\,dt = \\dfrac{K\\,\\big(\\overline{BC}^2 + \\overline{CA}^2\\big)}{2\\,R_{f1}\\,|\\omega_1|}',
      perche: 'L\'energia dissipata mentre una coppia di denti percorre AB è l\'area dei due triangoli del diagramma (accesso e recesso), con $dt = ds/(R_{f1}\\omega_1)$. Per ridurla conviene un segmento dei contatti corto e ben centrato su C.',
      fonte: { tipo: 'deduzione', da: 'p. 170 («area = energia dissipata durante l\'ingranamento tra due denti»)', spiegazione: 'integrale di Kx sul tempo di contatto con x lineare nel tempo' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.E, (v.K * (v.BC ** 2 + v.AC ** 2)) / (2 * v.Rf1 * Math.abs(v.w1))],
    },
  ],
  risultato: { latex: 'W^{DISS}_{ATTR} = \\underline{F_T}^{2,1}\\cdot\\underline{V}^{rel}_{1,2} < 0,\\qquad |W^{DISS}_{ATTR}| = f|F_N|(|\\omega_1| + |\\omega_2|)\\,x \\simeq K\\,x', fonte: { tipo: 'dispensa', pag: 170 } },
  gancio: 'Attrito per strisciamento: zero in C, lineare in x, un diagramma a V la cui area è l\'energia persa per dente.',
};

// ------------------------------------------------------------------ argomento
export const forzeDritti: ArgomentoContenuto = {
  id: 'c5-forze-dritti',
  cosaDireSubito:
    'Senza attrito la forza fra i denti è lungo la retta di pressione: dall\'equilibrio alla rotazione C₁ = F R_f1 = Q R₁, con la tangenziale Q = F cos θ che trasmette la coppia e la radiale F sin θ che carica i supporti. Con attrito, fuori da C i denti strisciano con velocità (|ω₁| + |ω₂|)x: l\'attrito f F_N è perpendicolare alla retta e opposto alla velocità relativa, entra negli equilibri con braccio R sin θ ∓ x, e dà un rendimento istantaneo che vale 1 in C e cala allontanandosi.',
  sistemaIpotesi: [
    'Ruota 1 motrice antioraria con coppia C₁, ruota 2 condotta oraria con coppia resistente C₂; regime.',
    'Profili a evolvente: normale comune = retta di pressione da H₁ a H₂.',
    'Attrito coulombiano con coefficiente f, opposto alla velocità relativa nel contatto.',
    'P a distanza x da C: accesso fra B e C, recesso fra C e A.',
  ],
  disegno: {
    svg: figIngranaggio({ forze: true, titolo: 'Forze nel contatto in accesso: normale verso H₁, attrito perpendicolare, velocità relativa' }),
    didascalia: 'Contatto P in accesso a distanza x da C: F_N^{2,1} lungo la retta verso H₁, F_T^{2,1} perpendicolare alla retta opposta a V^rel₁,₂; coppie C₁ (motrice) e C₂ (resistente) (p. 169).',
    fonte: { tipo: 'dispensa', pag: 169, fig: 'schizzo su quadretti' },
    elementi: [
      { id: 'ruote', testo: 'O₁, O₂, C sull\'interasse; fondamentali; ω₁ antioraria e ω₂ oraria', obbligatorio: true },
      { id: 'retta', testo: 'retta di pressione da H₁ a H₂ con gli angoli retti e θ', obbligatorio: true },
      { id: 'P', testo: 'P fra C e H₁ a distanza x (accesso)', obbligatorio: true },
      { id: 'FN', testo: 'F_N^{2,1} lungo la retta, verso H₁', obbligatorio: true },
      { id: 'Vrel', testo: 'V^rel₁,₂ perpendicolare alla retta e F_T^{2,1} opposta', obbligatorio: true },
      { id: 'bracci', testo: 'bracci R_f1 (della normale) e PH₁ = R₁ sin θ − x (dell\'attrito)', obbligatorio: true },
      { id: 'coppie', testo: 'coppie C₁ e C₂', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'C_1 - F_N^{2,1}R_{f1} + F_T^{2,1}\\big(R_1\\sin\\theta - x\\big) = 0,\\qquad F_T = f F_N',
    spiegazione: 'Equilibrio alla rotazione della ruota 1 in accesso; con f = 0 si ritrova C₁ = F R_f1 = Q R₁.',
    fonte: P169,
  },
  dimostrazioni: ['d083', 'd084', 'd085', 'd086'],
  significato:
    'Il dente trasmette la coppia con la componente tangenziale; la radiale non lavora ma pesa sui cuscinetti. L\'attrito non lavora in C, dove si rotola, e lavora sempre di più allontanandosi: la potenza persa cresce linearmente con x, e il rendimento istantaneo è 1 solo nel punto primitivo. Un ingranaggio ben fatto ha un segmento dei contatti corto e centrato su C.',
  fraseDaRicordare: 'C₁ = F R_f1 = Q R₁; con attrito F_N = C₁/(R₁ cos θ − f(R₁ sin θ − x)) in accesso, η = 1 solo in C, |W| = f F_N(|ω₁| + |ω₂|)x.',
  daNonDire: [
    { frase: 'La formula della dispensa è F_N = C₁/(R₁ cos θ + f(R₁ sin θ + x)).', perche: 'Quella è la fase di recesso; la dispensa scrive l\'accesso, F_N = C₁/(R₁ cos θ − f(R₁ sin θ − x)). q25 le confonde (NF-26).', fonte: P169 },
    { frase: 'Il braccio della forza normale è il raggio primitivo.', perche: 'La forza è lungo la retta di pressione: il braccio è il raggio fondamentale R_f = R cos θ. Il raggio primitivo è il braccio della sola componente Q.', fonte: { tipo: 'dispensa', pag: 162 } },
    { frase: 'L\'attrito ha sempre lo stesso verso durante l\'ingranamento.', perche: 'La velocità relativa si annulla in C e cambia verso: l\'attrito si inverte fra accesso e recesso.', fonte: P169 },
    { frase: 'Il rendimento dell\'ingranaggio è costante.', perche: 'Quello istantaneo dipende da x: vale 1 in C e cala verso A e B. Il valore tipico 0,98 è un valore medio.', fonte: P169 },
    { frase: 'Con attrito la risultante è inclinata dell\'angolo d\'attrito.', perche: 'Non è nella dispensa (NF-191): la dispensa lavora con le due componenti F_N e F_T = f F_N negli equilibri. Se lo si dice, va presentato come osservazione.', fonte: { tipo: 'deduzione', da: 'p. 169', spiegazione: 'tg φ = F_T/F_N = f, ma la dispensa non lo scrive' } },
  ],
  approfondimenti: [
    { domanda: 'Come trovi il verso della forza d\'attrito?', tipo: 'approfondimento', attesa: 'Dalla velocità relativa: ω₂,₁ = ω₂ − ω₁ (orario meno antiorario: oraria), V^rel₁,₂ = ω₁,₂∧(P − C); l\'attrito su 1 è opposto a V^rel₁,₂ e cambia verso quando P passa per C.', fonte: P169 },
    { domanda: 'Perché il rendimento vale 1 in C?', tipo: 'approfondimento', attesa: 'In C la velocità relativa è nulla (rotolamento puro): l\'attrito non lavora. Con x = 0 le formule di η_A e η_R danno entrambe 1.', fonte: P169 },
    { domanda: 'Come varia la potenza dissipata durante il contatto di una coppia di denti?', tipo: 'approfondimento', attesa: 'Con F_N ≈ C₁/(R₁ cos θ), |W| = Kx: diagramma a V nel tempo, massimo in B, zero in C, massimo in A. L\'area dei due triangoli è l\'energia dissipata.', fonte: { tipo: 'dispensa', pag: 170 } },
    { domanda: 'A che cosa serve la componente radiale?', tipo: 'approfondimento', attesa: 'A niente per la trasmissione: passa per il centro, momento nullo. Tende ad allontanare le ruote e carica alberi e cuscinetti; vale Q tan θ, quindi cresce con l\'angolo di pressione.', fonte: { tipo: 'deduzione', da: 'pp. 162, 172', spiegazione: 'scomposizione di F lungo la retta di pressione (NF-191)' } },
    { domanda: 'Come passi dal rendimento istantaneo al rendimento di un rotismo?', tipo: 'collegamento', argomento: 'c5-rendimento-ordinario', attesa: 'Per l\'ingranaggio si usa un rendimento medio (≈ 0,98): T.F.V. con perdite η C₁ω₁ + C₂ω₂ = 0, W_diss = −(1 − η)C₁ω₁; in una cascata di ingranaggi in serie η_tot = η_I η_II η_III.', fonte: { tipo: 'dispensa', pag: [181, 184] } },
    { domanda: 'Che legge d\'attrito usi?', tipo: 'collegamento', argomento: 'c2-attrito', attesa: 'Coulomb: forza tangenziale f volte la normale, opposta alla velocità relativa di strisciamento, indipendente dall\'area e (in prima approssimazione) dalla velocità.', fonte: { tipo: 'dispensa', pag: 169 } },
  ],
  simboli: [
    { simbolo: 'F_N^{2,1},\\ F_T^{2,1}', significato: 'forza normale e d\'attrito della ruota 2 sulla ruota 1', altrove: 'F_n, F_att in q25' },
    { simbolo: 'Q,\\ R_{2,1}', significato: 'componente tangenziale (alla primitiva) e radiale della forza fra i denti', altrove: 'F_t e F_r in q25 e d083' },
    { simbolo: 'f', significato: 'coefficiente d\'attrito fra i denti', altrove: 'μ in q25, d084, d086' },
    { simbolo: 'x', significato: 'distanza CP del contatto da C lungo la retta di pressione' },
    { simbolo: '\\eta_A,\\ \\eta_R', significato: 'rendimento istantaneo in accesso (B → C) e in recesso (C → A)' },
    { simbolo: 'W^{DISS}_{ATTR},\\ K', significato: 'potenza dissipata per attrito e costante della legge |W| = Kx' },
    { simbolo: '\\underline{V}^{rel}_{1,2}', significato: 'velocità della ruota 1 rispetto alla 2 nel contatto', altrove: 'v_s, v_rel in d085, q25' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5a-rendimento' }],
  previsioni: [
    {
      id: 'c5a-eta-C',
      domanda: 'Il contatto passa per il punto primitivo C. In quell\'istante il rendimento istantaneo vale…',
      opzioni: ['1', 'il minimo', 'circa 0,98', '0'],
      corretta: 0,
      spiega: 'In C c\'è rotolamento puro: velocità relativa nulla, l\'attrito non lavora.',
      verify: () => {
        const e = contattoConAttrito({ R1: 0.1, R2: 0.05, theta: 20 * DEG, f: 0.1, s: 0, C1: 50, w1: 100 }).eta;
        return Math.abs(e - 1) < 1e-12 ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5a-rendimento' },
    },
    {
      id: 'c5a-W-x',
      domanda: 'Il contatto si allontana da C dal doppio della distanza. La potenza dissipata per attrito…',
      opzioni: ['circa raddoppia', 'circa quadruplica', 'resta uguale', 'si dimezza'],
      corretta: 0,
      spiega: 'Velocità di strisciamento proporzionale a x, forza normale quasi costante: |W| ≈ Kx.',
      verify: () => {
        const p = { R1: 0.1, R2: 0.05, theta: 20 * DEG, f: 0.08, C1: 50, w1: 100 };
        const r = contattoConAttrito({ ...p, s: -0.01 }).Wdiss / contattoConAttrito({ ...p, s: -0.005 }).Wdiss;
        return Math.abs(r - 2) < 0.1 ? 0 : Math.abs(r - 4) < 0.2 ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5a-rendimento' },
    },
  ],
  nf: ['NF-08', 'NF-26', 'NF-191'],
};
