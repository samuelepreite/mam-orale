/**
 * C5 parte b · Ruote dentate coniche (domanda q28): rapporto di trasmissione (p. 190) e forze scambiate (p. 191).
 * Dimostrazioni d099, d100.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U, radOf } from '../../engine/num';
import { angle, arrow, dot, line, poly, svg, text } from '../svg';
import { coniPrimitivi, forzeConiche } from '../../engine/c5b';

// ------------------------------------------------------------------ disegno (Fig. 5-36 p. 190 e forze di p. 191)
function disegno() {
  const ox = 190, oy = 270, L = 170, p1 = radOf(30), p2 = radOf(45);
  const P: [number, number] = [ox, oy - L];
  const ax = (phi: number, s: 1 | -1, len: number): [number, number] => [ox + s * len * Math.sin(phi), oy - len * Math.cos(phi)];
  const refl = (phi: number, s: 1 | -1): [number, number] => {
    // riflesso di P rispetto all'asse del cono (cono 1 a sinistra: s = −1)
    const u = [s * Math.sin(phi), -Math.cos(phi)], d = [P[0] - ox, P[1] - oy];
    const k = d[0] * u[0] + d[1] * u[1];
    return [ox + 2 * k * u[0] - d[0], oy + 2 * k * u[1] - d[1]];
  };
  const P1 = refl(p1, -1), P2 = refl(p2, 1);
  const f1 = ax(p1, -1, L * Math.cos(p1)); // piede di P sull'asse 1
  // forza F'' su 1 (perpendicolare alla generatrice, verso l'asse 1) e sue componenti
  const Fs = 70, A1 = Fs * Math.sin(p1), R1 = Fs * Math.cos(p1);
  const u1 = [-Math.sin(p1), -Math.cos(p1)]; // asse 1 (verso uscente dal vertice, in coordinate SVG)
  const dl = Math.hypot(f1[0] - P[0], f1[1] - P[1]);
  const rdir = [(f1[0] - P[0]) / dl, (f1[1] - P[1]) / dl]; // da P verso l'asse 1
  return svg(420, 300, [
    poly([[ox, oy], P, P1], 'l', true), poly([[ox, oy], P, P2], 'l', true),
    line(ox, oy, ...ax(p1, -1, L * 1.15), 'm', 1), line(ox, oy, ...ax(p2, 1, L * 1.05), 'm', 1),
    line(ox, oy, P[0], P[1], 'a', 2),
    dot(ox, oy, 'O', 0, 16), dot(P[0], P[1], 'P', 10, -12, 'a'),
    angle(ox, oy, 70, 90, 90 + 30, 'φ₁'), angle(ox, oy, 95, 90 - 45, 90, 'φ₂'), angle(ox, oy, 36, 90 - 45, 90 + 30, 'ψ', 'a'),
    line(P[0], P[1], f1[0], f1[1], 'd'), text((P[0] + f1[0]) / 2 + 4, (P[1] + f1[1]) / 2 + 14, 'r₁', { c: 'm', size: 13 }),
    text(P1[0] - 6, P1[1] - 14, '1 (ω₁)', { size: 13, anchor: 'end' }), text(P2[0] + 8, P2[1] - 8, '2 (ω₂)', { size: 13, anchor: 'start' }),
    // forze sul dente di 1 in P: F'' ⊥ generatrice, radiale R₁ (verso l'asse 1) e assiale A₁ (lungo l'asse, via dal vertice)
    arrow(P[0], P[1], P[0] - Fs, P[1], 'f', 'F″', -4, -10),
    arrow(P[0], P[1], P[0] + R1 * rdir[0], P[1] + R1 * rdir[1], 'f', 'R₁', -14, 10),
    arrow(P[0], P[1], P[0] + A1 * u1[0], P[1] + A1 * u1[1], 'f', 'A₁', -12, -6),
    text(P[0] + 14, P[1] + 22, 'V ⊥ al piano', { size: 11, c: 'v', anchor: 'start' }),
  ], 'Coni primitivi con vertice comune O, generatrice di contatto OP, semiaperture φ₁ e φ₂, forze sulla ruota 1');
}

// ------------------------------------------------------------------ d099 rapporto di trasmissione
const P190 = { tipo: 'dispensa', pag: 190 } as const;

export const d099: Dimostrazione = {
  id: 'd099',
  titolo: 'Ruote coniche: rapporto di trasmissione e coni primitivi',
  enunciato: 'Ricavare il rapporto di trasmissione di due ruote coniche dai coni primitivi, le semiaperture dei coni noti τ e l\'angolo fra gli assi, e la velocità della ruota piano-conica.',
  ipotesi: [
    'assi concorrenti nel vertice O; superfici primitive = due coni che rotolano senza strisciare lungo la generatrice comune OP',
    'φ₁, φ₂ semiaperture dei coni primitivi, ψ angolo fra gli assi; velocità angolari in modulo',
    'a una data distanza dal vertice valgono le relazioni delle ruote cilindriche (passo e modulo proporzionali alla distanza)',
  ],
  sample: (rnd) => {
    const p1 = radOf(U(rnd, 10, 60)), p2 = radOf(U(rnd, 10, 75)), L = U(rnd, 0.05, 0.3), m = U(rnd, 0.002, 0.006);
    const r1 = L * Math.sin(p1), r2 = L * Math.sin(p2), w1 = U(rnd, 50, 300);
    const V = w1 * r1, w2 = V / r2, tau = w2 / w1, psi = p1 + p2;
    const pc = coniPrimitivi(tau, psi);
    const q1 = radOf(U(rnd, 10, 70)), wpc = (w1 * Math.sin(q1)) / Math.sin(Math.PI / 2); // piano-conica
    const tau90 = U(rnd, 0.2, 3), pc90 = coniPrimitivi(tau90, Math.PI / 2);
    return { p1, p2, L, m, r1, r2, w1, w2, V, tau, psi, f1: pc.phi1, f2: pc.phi2, z1: (2 * r1) / m, z2: (2 * r2) / m, q1, wpc, tau90, f190: pc90.phi1 };
  },
  passi: [
    {
      id: 'd099.1',
      latex: 'V = \\omega_1 r_1 = \\omega_2 r_2',
      perche: 'Il punto P all\'estremo della generatrice comune appartiene a entrambi i coni; lungo la generatrice la velocità relativa è nulla, quindi la velocità di P è la stessa sui due coni.',
      fonte: P190,
      distrattori: [],
      num: (v) => [v.w1 * v.r1, v.w2 * v.r2],
    },
    {
      id: 'd099.2',
      latex: '\\overline{OP} = \\dfrac{r_1}{\\sin\\varphi_1} = \\dfrac{r_2}{\\sin\\varphi_2}',
      perche: 'Il raggio della base di ciascun cono è il cateto opposto alla semiapertura nel triangolo rettangolo con ipotenusa la generatrice $\\overline{OP}$.',
      fonte: P190,
      chiave: true,
      distrattori: [
        { latex: '\\overline{OP} = \\dfrac{r_1}{\\cos\\varphi_1}', errore: 'indice', spiega: 'r₁ è opposto a φ₁ (φ₁ è misurata dall\'asse): OP = r₁/sin φ₁.', num: (v) => [v.L, v.r1 / Math.cos(v.p1)] },
        { latex: '\\overline{OP} = r_1\\sin\\varphi_1', errore: 'fattore', spiega: 'La generatrice è l\'ipotenusa, più lunga di r₁.', num: (v) => [v.L, v.r1 * Math.sin(v.p1)] },
      ],
      num: (v) => [v.r1 / Math.sin(v.p1), v.r2 / Math.sin(v.p2)],
    },
    {
      id: 'd099.3',
      latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = \\dfrac{r_1}{r_2} = \\dfrac{\\sin\\varphi_1}{\\sin\\varphi_2}',
      perche: 'Si dividono le due righe precedenti: il rapporto dipende solo dalle aperture dei coni.',
      fonte: P190,
      chiave: true,
      distrattori: [
        { latex: '\\tau = \\dfrac{\\sin\\varphi_2}{\\sin\\varphi_1}', errore: 'convenzione', spiega: 'È |i| = ω₁/ω₂ di d099, il reciproco: con τ = ω₂/ω₁ della dispensa il numeratore è sin φ₁ (NF-09).', num: (v) => [v.tau, Math.sin(v.p2) / Math.sin(v.p1)] },
        { latex: '\\tau = \\dfrac{\\varphi_1}{\\varphi_2}', errore: 'concetto', spiega: 'Contano i raggi, cioè i seni delle semiaperture, non gli angoli.', num: (v) => [v.tau, v.p1 / v.p2] },
        { latex: '\\tau = \\dfrac{\\operatorname{tg}\\varphi_1}{\\operatorname{tg}\\varphi_2}', errore: 'concetto', spiega: 'Le tangenti sarebbero giuste con le altezze dei coni uguali; qui è comune la generatrice OP.', num: (v) => [v.tau, Math.tan(v.p1) / Math.tan(v.p2)] },
      ],
      num: (v) => [v.tau, Math.sin(v.p1) / Math.sin(v.p2)],
    },
    {
      id: 'd099.4',
      latex: '\\psi = \\varphi_1 + \\varphi_2',
      perche: 'I due assi stanno da parti opposte della generatrice comune: l\'angolo fra gli assi è la somma delle semiaperture.',
      fonte: P190,
      distrattori: [],
      num: (v) => [v.psi, v.p1 + v.p2],
    },
    {
      id: 'd099.5',
      latex: '\\sin\\varphi_1 = \\tau\\sin(\\psi - \\varphi_1) \\;\\Rightarrow\\; \\operatorname{tg}\\varphi_1 = \\dfrac{\\sin\\psi}{\\frac{1}{\\tau} + \\cos\\psi}',
      perche: 'Noti $\\psi$ e $\\tau$ si progettano i coni. Si sviluppa $\\sin(\\psi - \\varphi_1) = \\sin\\psi\\cos\\varphi_1 - \\cos\\psi\\sin\\varphi_1$, si divide per $\\tau\\cos\\varphi_1$ e si raccoglie $\\operatorname{tg}\\varphi_1$.',
      fonte: P190,
      chiave: true,
      distrattori: [
        { latex: '\\operatorname{tg}\\varphi_1 = \\dfrac{\\sin\\psi}{\\tau + \\cos\\psi}', errore: 'indice', spiega: 'Questa è la formula di φ₂. Il cono 1 ha la ruota d\'entrata: compare 1/τ.', num: (v) => [Math.tan(v.f1), Math.sin(v.psi) / (v.tau + Math.cos(v.psi))] },
        { latex: '\\operatorname{tg}\\varphi_1 = \\dfrac{\\sin\\psi}{\\frac{1}{\\tau} - \\cos\\psi}', errore: 'segno', spiega: 'Portando −τ cos ψ sin φ₁ a sinistra il segno cambia: 1/τ + cos ψ.', num: (v) => [Math.tan(v.f1), Math.sin(v.psi) / (1 / v.tau - Math.cos(v.psi))] },
      ],
      num: (v) => [Math.tan(v.p1), Math.sin(v.psi) / (1 / v.tau + Math.cos(v.psi))],
    },
    {
      id: 'd099.6',
      latex: '\\operatorname{tg}\\varphi_2 = \\dfrac{\\sin\\psi}{\\tau + \\cos\\psi}',
      perche: 'Allo stesso modo da $\\sin\\varphi_2 = \\sin\\varphi_1/\\tau = \\sin(\\psi - \\varphi_2)/\\tau$.',
      fonte: P190,
      distrattori: [],
      num: (v) => [Math.tan(v.p2), Math.sin(v.psi) / (v.tau + Math.cos(v.psi))],
    },
    {
      id: 'd099.7',
      latex: '\\psi = \\dfrac{\\pi}{2}:\\ \\operatorname{tg}\\varphi_1 = \\tau',
      perche: 'Caso più comune (assi perpendicolari, come nel differenziale): $\\sin\\psi = 1$, $\\cos\\psi = 0$.',
      fonte: { tipo: 'deduzione', da: 'p. 190', spiegazione: 'formula di tg φ₁ con ψ = 90°' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [Math.tan(v.f190), v.tau90],
    },
    {
      id: 'd099.8',
      latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = \\dfrac{r_1}{r_2} = \\dfrac{z_1}{z_2}',
      perche: 'I denti hanno profilo a evolvente con circonferenza fondamentale variabile con la distanza dal vertice: passo, modulo e altezza sono proporzionali a quella distanza. A una data distanza il modulo è lo stesso per le due ruote e $m z = 2r$.',
      fonte: P190,
      distrattori: [],
      num: (v) => [v.tau, v.z1 / v.z2],
    },
    {
      id: 'd099.9',
      latex: '\\varphi_2 = \\dfrac{\\pi}{2}:\\ \\omega_2 = \\dfrac{\\sin\\varphi_1}{\\sin\\frac{\\pi}{2}}\\,\\omega_1 = \\omega_1\\sin\\varphi_1',
      perche: 'Ruota piano-conica: il cono primitivo diventa un piano. È il corrispondente della dentiera, ma non trasla: ruota con $\\omega_2 = \\omega_1\\sin\\varphi_1$.',
      fonte: P190,
      distrattori: [],
      num: (v) => [v.wpc, v.w1 * Math.sin(v.q1)],
    },
  ],
  risultato: { latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = \\dfrac{\\sin\\varphi_1}{\\sin\\varphi_2} = \\dfrac{z_1}{z_2},\\quad \\operatorname{tg}\\varphi_1 = \\dfrac{\\sin\\psi}{1/\\tau + \\cos\\psi},\\ \\operatorname{tg}\\varphi_2 = \\dfrac{\\sin\\psi}{\\tau + \\cos\\psi}', fonte: P190 },
  gancio: 'Stessa velocità in P, stessa generatrice OP: τ = sin φ₁/sin φ₂.',
};

// ------------------------------------------------------------------ d100 forze scambiate
const P191 = { tipo: 'dispensa', pag: 191 } as const;

export const d100: Dimostrazione = {
  id: 'd100',
  titolo: 'Forze scambiate dalle ruote coniche',
  enunciato: 'Scomporre la forza scambiata fra i denti di due ruote coniche in componente tangenziale, radiale e assiale in funzione della coppia sulla ruota 1.',
  ipotesi: [
    'attrito trascurato; F giace nel piano Π perpendicolare alla generatrice di contatto, inclinata di θ (angolo di pressione) sulla tangenziale',
    'forza applicata nel punto di contatto, a distanza r₁ dall\'asse della ruota 1 (in pratica a metà della fascia)',
    'φ₁ semiapertura del cono primitivo della ruota 1',
  ],
  sample: (rnd) => {
    const C1 = U(rnd, 10, 500), r1 = U(rnd, 0.03, 0.15), th = radOf(U(rnd, 15, 25)), p1 = radOf(U(rnd, 10, 60)), tau = U(rnd, 0.3, 3);
    const r2 = r1 / tau;
    // vettori nel piano degli assi: generatrice g = (0, 1), asse 1 u₁ = (−sin φ₁, cos φ₁), n = (−1, 0) ⊥ g verso l'asse 1;
    // la tangenziale è perpendicolare al piano degli assi. F = F (cos θ · t + sin θ · n)
    const F = C1 / (r1 * Math.cos(th));
    const Fn = [-F * Math.sin(th), 0]; // componente nel piano degli assi (F'')
    const u1 = [-Math.sin(p1), Math.cos(p1)];
    const A1 = Fn[0] * u1[0] + Fn[1] * u1[1];
    const R1 = Math.hypot(Fn[0] - A1 * u1[0], Fn[1] - A1 * u1[1]);
    const Q = F * Math.cos(th), Fs = Math.hypot(Fn[0], Fn[1]);
    // ruota 2 con assi perpendicolari: asse u₂ = (sin φ₂, cos φ₂), φ₂ = π/2 − φ₁
    const p2 = Math.PI / 2 - p1, u2 = [Math.sin(p2), Math.cos(p2)];
    const A2 = Math.abs(-Fn[0] * u2[0] - Fn[1] * u2[1]);
    const e = forzeConiche({ C1, r1, theta: th, phi1: p1 });
    return { C1, r1, r2, th, p1, p2, F, Q, Fs, A1, R1, A2, C2: Q * r2, Ae: e.A };
  },
  passi: [
    {
      id: 'd100.1',
      latex: 'Q = F\\cos\\theta, \\qquad F\'\' = F\\sin\\theta',
      perche: 'Nel piano $\\Pi$ perpendicolare alla generatrice di contatto la forza si scompone in una componente tangenziale $Q$ e in una normale a $Q$ che interseca gli assi delle ruote, $F\'\'$ (nella figura del libro $F\'$).',
      fonte: P191,
      distrattori: [],
      num: (v) => [v.Fs, v.F * Math.sin(v.th)],
    },
    {
      id: 'd100.2',
      latex: 'C_1 = Q\\,r_1,\\quad C_2 = Q\\,r_2 \\;\\Rightarrow\\; F = \\dfrac{C_1}{r_1\\cos\\vartheta} = \\dfrac{C_2}{r_2\\cos\\vartheta}',
      perche: 'Le coppie sulle ruote sono equilibrate solo dal momento di $Q$ rispetto ai rispettivi assi: $F\'\'$ interseca gli assi e non dà momento.',
      fonte: P191,
      chiave: true,
      distrattori: [
        { latex: 'F = \\dfrac{C_1}{r_1}', errore: 'termine-perso', spiega: 'C₁/r₁ è solo la componente tangenziale Q = F cos θ.', num: (v) => [v.F, v.C1 / v.r1] },
        { latex: 'F = \\dfrac{C_1}{r_1\\sin\\vartheta}', errore: 'indice', spiega: 'La componente che fa momento è F cos θ: θ è misurato dalla tangenziale.', num: (v) => [v.F, v.C1 / (v.r1 * Math.sin(v.th))] },
      ],
      num: (v) => [v.F, v.C2 / (v.r2 * Math.cos(v.th))],
    },
    {
      id: 'd100.3',
      latex: 'A = F\'\'\\sin\\varphi_1 = F\\sin\\theta\\sin\\varphi_1, \\qquad R = F\'\'\\cos\\varphi_1 = F\\sin\\theta\\cos\\varphi_1',
      perche: '$F\'\'$ sta nel piano degli assi ed è perpendicolare alla generatrice; l\'asse della ruota 1 forma l\'angolo $\\varphi_1$ con la generatrice, quindi $F\'\'$ forma $\\varphi_1$ con la direzione radiale: componente radiale (verso l\'asse) e assiale (via dal vertice).',
      fonte: P191,
      chiave: true,
      distrattori: [
        { latex: 'A = F\'\'\\cos\\varphi_1, \\quad R = F\'\'\\sin\\varphi_1', errore: 'indice', spiega: 'Con φ₁ → 0 (cono che diventa un cilindro) la spinta assiale deve sparire: A va con sin φ₁.', num: (v) => [v.A1, v.Fs * Math.cos(v.p1)] },
        { latex: 'A = F\'\'\\sin\\varphi_2', errore: 'indice', spiega: 'Per la ruota 1 conta il suo cono, φ₁; con φ₂ si ottiene la spinta assiale della ruota 2.', num: (v) => [v.A1, v.Fs * Math.sin(v.p2)] },
      ],
      num: (v) => [v.A1, v.F * Math.sin(v.th) * Math.sin(v.p1)],
    },
    {
      id: 'd100.4',
      latex: 'Q = \\dfrac{C_1}{r_1}, \\qquad A = \\dfrac{C_1}{r_1}\\operatorname{tg}\\theta\\sin\\varphi_1, \\qquad R = \\dfrac{C_1}{r_1}\\operatorname{tg}\\theta\\cos\\varphi_1',
      perche: 'Si sostituisce $F = C_1/(r_1\\cos\\theta)$: $F\\sin\\theta = Q\\operatorname{tg}\\theta$.',
      fonte: P191,
      chiave: true,
      distrattori: [
        { latex: 'A = \\dfrac{C_1}{r_1}\\sin\\theta\\sin\\varphi_1', errore: 'termine-perso', spiega: 'F″ = F sin θ = Q tg θ, non Q sin θ: manca 1/cos θ.', num: (v) => [v.A1, (v.C1 / v.r1) * Math.sin(v.th) * Math.sin(v.p1)] },
        { latex: 'R = \\dfrac{C_1}{r_1}\\operatorname{tg}\\theta', errore: 'termine-perso', spiega: 'Quella è la radiale delle cilindriche: qui F″ si divide fra radiale e assiale secondo φ₁.', num: (v) => [v.R1, (v.C1 / v.r1) * Math.tan(v.th)] },
      ],
      num: (v) => [v.R1, (v.C1 / v.r1) * Math.tan(v.th) * Math.cos(v.p1)],
    },
    {
      id: 'd100.5',
      latex: '\\psi = \\dfrac{\\pi}{2}:\\ A_2 = F\'\'\\sin\\varphi_2 = F\'\'\\cos\\varphi_1 = R_1, \\qquad R_2 = A_1',
      perche: 'Con assi perpendicolari $\\varphi_2 = \\pi/2 - \\varphi_1$: la spinta assiale su una ruota è la forza radiale sull\'altra (azione e reazione della stessa $F\'\'$).',
      fonte: { tipo: 'deduzione', da: 'p. 191', spiegazione: 'stessa scomposizione di F″ rispetto all\'asse della ruota 2, con φ₁ + φ₂ = π/2' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.A2, v.R1],
    },
    {
      id: 'd100.6',
      latex: 'A \\ne 0 \\;\\Rightarrow\\; \\text{cuscinetti per carichi radiali e assiali}',
      perche: 'Come le elicoidali, anche le coniche hanno sempre una spinta assiale: gli alberi devono essere sostenuti da cuscinetti capaci di reggerla.',
      fonte: P191,
      distrattori: [],
    },
  ],
  risultato: { latex: 'Q = \\dfrac{C_1}{r_1},\\quad A = \\dfrac{C_1}{r_1}\\operatorname{tg}\\theta\\sin\\varphi_1,\\quad R = \\dfrac{C_1}{r_1}\\operatorname{tg}\\theta\\cos\\varphi_1', fonte: P191 },
  gancio: 'Q fa la coppia; la parte che punta agli assi, Q tg θ, il cono la divide in radiale (cos φ₁) e assiale (sin φ₁).',
};

// ------------------------------------------------------------------ argomento
export const coniche: ArgomentoContenuto = {
  id: 'c5-coniche',
  cosaDireSubito:
    'Le ruote coniche trasmettono il moto fra assi concorrenti: le superfici primitive sono due coni con il vertice comune che rotolano senza strisciare lungo una generatrice. Uguagliando la velocità del punto P all\'estremo della generatrice si ha τ = ω₂/ω₁ = r₁/r₂ = sin φ₁/sin φ₂ = z₁/z₂. Per le forze lavoro nel piano perpendicolare alla generatrice: Q = C₁/r₁ e la componente Q tg θ si divide in radiale e assiale secondo φ₁.',
  sistemaIpotesi: [
    'Sistema: due ruote coniche con assi concorrenti in O, angolo ψ fra gli assi, semiaperture φ₁ e φ₂ dei coni primitivi.',
    'Rotolamento senza strisciamento lungo la generatrice comune OP.',
    'Velocità angolari in modulo (assi non paralleli).',
    'Forze: attrito trascurato, F nel piano Π ⊥ alla generatrice, θ angolo di pressione.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Coni primitivi di una coppia di ruote coniche (Fig. 5-36, p. 190) con la scomposizione della forza sulla ruota 1 (p. 191).',
    fonte: { tipo: 'dispensa', pag: [190, 191], fig: 'Fig. 5-36 e figura delle forze (scansione del libro)' },
    elementi: [
      { id: 'vertice', testo: 'vertice comune O e generatrice di contatto OP', obbligatorio: true },
      { id: 'assi', testo: 'assi dei due coni, semiaperture φ₁ e φ₂, ψ = φ₁ + φ₂', obbligatorio: true },
      { id: 'raggi', testo: 'raggi r₁ e r₂ di P dai due assi', obbligatorio: true },
      { id: 'V', testo: 'velocità V di P perpendicolare al piano degli assi', obbligatorio: false },
      { id: 'forze', testo: 'in P: F″ ⊥ alla generatrice, radiale R₁ verso l\'asse 1, assiale A₁ lungo l\'asse 1', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: 'V = \\omega_1 r_1 = \\omega_2 r_2, \\qquad \\overline{OP} = \\dfrac{r_1}{\\sin\\varphi_1} = \\dfrac{r_2}{\\sin\\varphi_2}',
    spiegazione: 'Stessa velocità del punto di contatto sui due coni e stessa generatrice comune.',
    fonte: { tipo: 'dispensa', pag: 190 },
  },
  dimostrazioni: ['d099', 'd100'],
  significato:
    'Il rapporto dipende solo dalle aperture dei coni, quindi noti τ e ψ si progettano i coni (tg φ₁ = τ con assi perpendicolari). Le forze sono quelle di una ruota cilindrica nel piano normale alla generatrice, ma la componente che punta agli assi si divide fra radiale e assiale: anche le coniche hanno sempre una spinta assiale.',
  fraseDaRicordare: 'τ = sin φ₁/sin φ₂ = z₁/z₂; A = (C₁/r₁) tg θ sin φ₁, R = (C₁/r₁) tg θ cos φ₁.',
  daNonDire: [
    { frase: 'Il rapporto è ω₁/ω₂ = z₂/z₁.', perche: 'È |i| di d099, il reciproco: nella dispensa τ = ω₂/ω₁ = z₁/z₂ (NF-09).', fonte: { tipo: 'dispensa', pag: 190 } },
    { frase: 'Uso la ruota cilindrica fittizia equivalente.', perche: 'La dispensa ragiona nel piano Π perpendicolare alla generatrice di contatto, senza ruota fittizia (q28; NF-208).', fonte: { tipo: 'dispensa', pag: 191 } },
    { frase: 'A = Q sin θ sin φ₁.', perche: 'La componente che interseca gli assi è F sin θ = Q tg θ.', fonte: { tipo: 'dispensa', pag: 191 } },
    { frase: 'τ = tg φ₁/tg φ₂.', perche: 'I coni hanno in comune la generatrice, non l\'altezza: τ = sin φ₁/sin φ₂ (tg φ₁ = τ solo con assi perpendicolari).', fonte: { tipo: 'dispensa', pag: 190 } },
  ],
  approfondimenti: [
    { domanda: 'Come scegli le aperture dei coni noti τ e l\'angolo fra gli assi?', tipo: 'approfondimento', attesa: 'Da sin φ₁ = τ sin(ψ − φ₁): tg φ₁ = sin ψ/(1/τ + cos ψ), tg φ₂ = sin ψ/(τ + cos ψ). Con ψ = 90°, tg φ₁ = τ.', fonte: { tipo: 'dispensa', pag: 190 } },
    { domanda: 'Che cos\'è la ruota piano-conica?', tipo: 'approfondimento', attesa: 'Quella con semiapertura retta: il cono primitivo diventa un piano. È il corrispondente della dentiera, ma ruota: ω₂ = ω₁ sin φ₁.', fonte: { tipo: 'dispensa', pag: 190 } },
    { domanda: 'Dove si usano nel corso le coniche?', tipo: 'collegamento', argomento: 'c5-differenziale', attesa: 'Nel differenziale: pignone conico e corona conica fra albero di trasmissione e semiassi; solari e planetari conici.', fonte: { tipo: 'dispensa', pag: 176 } },
    { domanda: 'Che differenza c\'è con le forze delle ruote cilindriche a denti dritti?', tipo: 'collegamento', argomento: 'c5-forze-dritti', attesa: 'Nelle cilindriche Q tg θ è tutta radiale; nelle coniche la stessa componente si divide fra radiale (cos φ₁) e assiale (sin φ₁).', fonte: { tipo: 'dispensa', pag: 191 } },
    { domanda: 'Con assi perpendicolari che legame c\'è fra le forze sulle due ruote?', tipo: 'approfondimento', attesa: 'La spinta assiale su una ruota è la forza radiale sull\'altra: A₂ = R₁, R₂ = A₁, perché φ₂ = 90° − φ₁.', fonte: { tipo: 'deduzione', da: 'p. 191', spiegazione: 'scomposizione di F″ rispetto ai due assi con φ₁ + φ₂ = 90°' } },
    { domanda: 'Come sono fatti i denti di una ruota conica?', tipo: 'approfondimento', attesa: 'Hanno ancora profilo a evolvente, ma la circonferenza fondamentale ha diametro variabile con la distanza dal vertice: passo, modulo e altezza sono proporzionali a quella distanza.', fonte: { tipo: 'dispensa', pag: 190 } },
  ],
  simboli: [
    { simbolo: '\\tau', significato: 'ω₂/ω₁ = r₁/r₂ = z₁/z₂ (in modulo)', altrove: '|i| = ω₁/ω₂ in d099 (reciproco, NF-09)' },
    { simbolo: '\\varphi_1,\\ \\varphi_2,\\ \\psi', significato: 'semiaperture dei coni primitivi e angolo fra gli assi', altrove: 'δ in d100, φ in q28' },
    { simbolo: '\\theta', significato: 'angolo di pressione (ϑ nella scansione)', altrove: 'α in d100' },
    { simbolo: "F'',\\ Q,\\ R,\\ A", significato: 'componente che interseca gli assi (F′ nella figura), tangenziale, radiale, assiale', altrove: 'F_a in q28 per F″ (da non confondere con l\'assiale A)' },
    { simbolo: 'r_1,\\ r_2', significato: 'raggi del punto di contatto dai due assi', altrove: 'r_m raggio medio in d100' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5b-coniche' }],
  previsioni: [
    {
      id: 'c5b-con-uguali',
      domanda: 'Due ruote coniche uguali (τ = 1) con assi perpendicolari: le semiaperture dei coni valgono…',
      opzioni: ['30° e 60°', '45° e 45°', '90° e 0°', 'dipende dal modulo'],
      corretta: 1,
      spiega: 'tg φ₁ = sin ψ/(1/τ + cos ψ) = 1/(1 + 0) = 1: φ₁ = φ₂ = 45°.',
      verify: () => {
        const c = coniPrimitivi(1, Math.PI / 2);
        return Math.abs(c.phi1 - Math.PI / 4) < 1e-9 && Math.abs(c.phi2 - Math.PI / 4) < 1e-9 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c5b-coniche' },
    },
    {
      id: 'c5b-con-assiale',
      domanda: 'Pignone con cono molto stretto (φ₁ piccolo): la sua spinta assiale, rispetto alla radiale, è…',
      opzioni: ['più grande', 'più piccola', 'uguale', 'nulla sempre'],
      corretta: 1,
      spiega: 'A/R = tg φ₁: con φ₁ piccolo la spinta assiale è piccola (al limite il cono diventa un cilindro).',
      verify: () => {
        const f = forzeConiche({ C1: 100, r1: 0.05, theta: radOf(20), phi1: radOf(15) });
        return Math.abs(f.A - f.R) < 1e-9 ? 2 : f.A < f.R ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c5b-coniche' },
    },
  ],
  nf: ['NF-09', 'NF-208'],
};
