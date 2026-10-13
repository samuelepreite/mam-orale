/**
 * C2 · Cuscinetti volventi: cinematica, carico, attrito (domanda q36). Dispensa pp. 97–99 (appunti battuti e
 * manoscritto che sostituiscono il §2.4 mancante, NF-03). Dimostrazioni d036 e d037.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { cuscinettoCarico, cuscinettoCinematica } from '../../engine/c2';
import { angle, arrow, circle, dot, line, pt, rot, svg, text } from '../svg';

// ------------------------------------------------------------------ disegno (figure di p. 98)
function disegno() {
  // sinistra: cinematica
  const ox = 112, oy = 150, Ri = 58, Re = 96, r = (Re - Ri) / 2, Rg = (Re + Ri) / 2;
  const elems: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = 90 + k * 45;
    const [x, y] = pt(ox, oy, Rg, a);
    elems.push(circle(x, y, r - 1, k === 0 ? 'l' : 'm'));
  }
  const [gx, gy] = pt(ox, oy, Rg, 90);
  const left = [
    circle(ox, oy, Re + 9, 'g'), circle(ox, oy, Re, 'l'), circle(ox, oy, Ri, 'l'), circle(ox, oy, Ri - 9, 'g'),
    circle(ox, oy, Rg, 'd'),
    ...elems,
    dot(ox, oy, 'Ω', -12, 12),
    dot(gx, gy, 'G', 10, 2), dot(gx, gy - r, 'E', -12, -6), dot(gx, gy + r, 'I', -12, 6),
    line(ox, oy, ox + Re, oy, 'm', 1), text(ox + Re / 2 + 18, oy - 10, 'R_e', { c: 'm', size: 12 }),
    line(ox, oy, ...pt(ox, oy, Ri, 200), 'm', 1), text(...pt(ox, oy, Ri / 2, 216), 'R_i', { c: 'm', size: 12 }),
    line(ox, oy, ...pt(ox, oy, Rg, 125), 'm', 1), text(...pt(ox, oy, Rg / 2 + 8, 136), 'R_g', { c: 'm', size: 12 }),
    rot(ox, oy, 26, 240, 330, 'v', 'ω_i'),
    rot(gx, gy, r + 8, 150, 30, 'v', 'ω_v'),
    rot(ox, oy, Re + 20, 60, 30, 'v', 'ω_g'),
    text(ox, 18, 'cinematica', { c: 'm', size: 12 }),
  ];
  // destra: distribuzione del carico (z = 12, γ = 30°)
  const cx = 330, cy = 120, Rr = 66;
  const loads: string[] = [];
  for (let i = -2; i <= 2; i++) {
    const a = -90 + i * 30;
    const [x, y] = pt(cx, cy, Rr, a);
    const L = 44 * Math.cos((i * 30 * Math.PI) / 180);
    const [x2, y2] = pt(x, y, L, a + 180);
    loads.push(circle(x, y, 8, 'l'), arrow(x + (x - cx) * 0.6, y + (y - cy) * 0.6, x + (x - cx) * 0.6 + (x2 - x), y + (y - cy) * 0.6 + (y2 - y), 'f'));
  }
  const right = [
    circle(cx, cy, Rr + 10, 'l'), circle(cx, cy, Rr - 10, 'l'),
    line(cx - Rr - 22, cy, cx + Rr + 22, cy, 'd'),
    ...loads,
    arrow(cx, cy - 30, cx, cy + 16, 'f', 'Q', 14, -12),
    text(cx + 10, cy + Rr + 52, 'P₀', { c: 'f' }),
    text(...pt(cx, cy, Rr + 50, -30), 'P_i', { c: 'f' }),
    angle(cx, cy, 30, -90, -60, 'γ'),
    text(cx, 18, 'carico sui rulli: P_i = P₀ cos iγ', { c: 'm', size: 12 }),
  ];
  return svg(440, 300, [...left, ...right], 'Cuscinetto radiale: a sinistra cinematica (anelli, elemento volvente con contatti E e I, gabbia), a destra carico Q ripartito sugli elementi della metà inferiore');
}

// ------------------------------------------------------------------ d036 cinematica (p. 98)
const P98 = { tipo: 'dispensa', pag: 98 } as const;

export const d036: Dimostrazione = {
  id: 'd036',
  titolo: 'Cuscinetto volvente: velocità del centro, rotazione propria e gabbia',
  enunciato: 'Gli anelli interno ed esterno ruotano con ω_i e ω_e. Ricavare la velocità del centro di un elemento volvente, la sua velocità di rotazione propria ω_v e la velocità angolare della gabbia ω_g.',
  ipotesi: [
    'elemento volvente rigido di raggio r = (R_e − R_i)/2, in rotolamento senza strisciamento su entrambe le piste',
    'velocità tangenziali come componenti lungo t̂ = k̂ ∧ ĵ (verso antiorario), con ĵ radiale verso l\'esterno nel punto considerato',
    'gabbia rigida trascinata dai centri degli elementi, che stanno sulla circonferenza di raggio R_g = (R_e + R_i)/2',
  ],
  sample: (rnd) => {
    const Ri = U(rnd, 0.01, 0.05), r = U(rnd, 0.002, 0.01), Re = Ri + 2 * r;
    const omegaI = U(rnd, 50, 300), omegaE = U(rnd, -300, 300);
    const k = cuscinettoCinematica({ omegaI, omegaE, Ri, Re });
    return { Ri, Re, r, omegaI, omegaE, VE: omegaE * Re, VI: omegaI * Ri, VG: k.VG, omegaV: k.omegaV, Rg: k.Rg, omegaG: k.omegaG, omegaG0: (omegaI * Ri) / (Re + Ri) };
  },
  passi: [
    {
      id: 'd036.1',
      latex: 'V_E = \\omega_e R_e, \\qquad V_I = \\omega_i R_i',
      perche: 'Velocità dei punti delle piste a contatto con l\'elemento: $\\vec V = \\omega\\hat k \\wedge R\\hat j$ con il centro $\\Omega$ fermo, cioè $\\omega R$ lungo $\\hat t$.',
      fonte: P98,
      distrattori: [],
      num: (v) => [v.VE, v.omegaE * v.Re],
    },
    {
      id: 'd036.2',
      latex: 'V_E = V_G + \\omega_v \\wedge \\underbrace{(E - G)}_{r\\hat j} = V_G + \\omega_v\\,r',
      perche: 'Puro rotolamento: il punto E dell\'elemento ha la velocità della pista esterna. Con la formula del corpo rigido applicata all\'elemento (E e G sono suoi punti) si lega $V_E$ alla velocità del centro e alla rotazione propria.',
      fonte: P98,
      chiave: true,
      distrattori: [
        { latex: 'V_E = V_G', errore: 'ipotesi', spiega: 'L\'elemento ruota su sé stesso: va aggiunto ω_v ∧ (E − G).', num: (v) => [v.VG, v.VE] },
        { latex: 'V_E = V_G - \\omega_v\\,r', errore: 'segno', spiega: 'E sta sopra G (E − G = r ĵ): k̂ ∧ ĵ = t̂ dà + ω_v r. Il segno meno spetta al contatto interno.', num: (v) => [v.VG - v.omegaV * v.r, v.VE] },
      ],
      num: (v) => [v.VG + v.omegaV * v.r, v.VE],
    },
    {
      id: 'd036.3',
      latex: 'V_I = V_G + \\omega_v \\wedge \\underbrace{(I - G)}_{-r\\hat j} = V_G - \\omega_v\\,r',
      perche: 'Stesso vincolo sul contatto interno: I sta sotto G.',
      fonte: P98,
      distrattori: [],
      num: (v) => [v.VG - v.omegaV * v.r, v.VI],
    },
    {
      id: 'd036.4',
      latex: 'V_E + V_I = 2V_G + \\omega_v \\wedge \\big[(E - G) + (I - G)\\big] = 2V_G \\;\\Rightarrow\\; V_G = \\dfrac{V_E + V_I}{2}',
      perche: 'Sommando le due relazioni i termini di rotazione si elidono perché $E - G$ e $I - G$ sono opposti: il centro va alla media delle velocità delle due piste.',
      fonte: P98,
      chiave: true,
      distrattori: [
        { latex: 'V_G = \\dfrac{V_E - V_I}{2}', errore: 'segno', spiega: 'Con la differenza si elide V_G, non la rotazione: la differenza dà ω_v.', num: (v) => [v.VG, (v.VE - v.VI) / 2] },
        { latex: 'V_G = V_E + V_I', errore: 'fattore', spiega: 'La somma vale 2V_G.', num: (v) => [v.VG, v.VE + v.VI] },
      ],
      num: (v) => [v.VG, (v.VE + v.VI) / 2],
    },
    {
      id: 'd036.5',
      latex: 'V_E - V_I = \\omega_v \\wedge \\big[(E - G) - (I - G)\\big] = 2r\\,\\omega_v \\;\\Rightarrow\\; \\omega_v = \\dfrac{\\omega_e R_e - \\omega_i R_i}{R_e - R_i}',
      perche: 'Sottraendo si elide $V_G$; il diametro dell\'elemento è $|E - I| = 2r = R_e - R_i$. È la velocità di rotazione propria dell\'elemento volvente.',
      fonte: P98,
      chiave: true,
      correzione: { nf: 'NF-126', dispensaScrive: '\\omega_v = \\frac{V_E - V_I}{(E - I)} \\ \\text{(«calcolo la } \\omega_G\\text{»)}' },
      distrattori: [
        { latex: '\\omega_v = \\dfrac{\\omega_e R_e - \\omega_i R_i}{R_e + R_i}', errore: 'indice', spiega: 'Si divide per il diametro dell\'elemento, R_e − R_i, non per R_e + R_i (che è 2R_g).', num: (v) => [v.omegaV, (v.omegaE * v.Re - v.omegaI * v.Ri) / (v.Re + v.Ri)] },
        { latex: '\\omega_v = \\dfrac{\\omega_i R_i - \\omega_e R_e}{R_e - R_i}', errore: 'convenzione', spiega: 'Con ω e velocità tutte lungo k̂ e t̂ il segno è quello della dispensa; questo sarebbe il verso orario positivo.', num: (v) => [v.omegaV, (v.omegaI * v.Ri - v.omegaE * v.Re) / (v.Re - v.Ri)] },
      ],
      num: (v) => [v.omegaV, (v.omegaE * v.Re - v.omegaI * v.Ri) / (v.Re - v.Ri)],
    },
    {
      id: 'd036.6',
      latex: 'V_G = \\omega_g R_g:\\quad \\omega_e R_e + \\omega_i R_i = 2\\,\\omega_g R_g \\;\\Rightarrow\\; \\omega_g = \\dfrac{\\omega_e R_e + \\omega_i R_i}{2R_g}',
      perche: 'La gabbia è trascinata dai centri degli elementi: il centro G è anche un punto della gabbia, che ruota attorno a $\\Omega$ con $\\omega_g$. Dalla somma $V_E + V_I = 2V_G$.',
      fonte: P98,
      chiave: true,
      correzione: { nf: 'NF-35', dispensaScrive: '\\omega_e \\wedge R_e\\hat j + \\omega_i \\wedge R_i\\hat j = \\omega_g \\wedge R_g\\hat j' },
      distrattori: [
        { latex: '\\omega_g = \\dfrac{\\omega_e R_e + \\omega_i R_i}{R_g}', errore: 'fattore', spiega: 'È la riga intermedia della dispensa senza il 2 (NF-35): la somma delle velocità delle piste vale 2V_G.', num: (v) => [v.omegaG, (v.omegaE * v.Re + v.omegaI * v.Ri) / v.Rg] },
        { latex: '\\omega_g = \\dfrac{\\omega_e + \\omega_i}{2}', errore: 'concetto', spiega: 'Si mediano le velocità lineari dei contatti, non quelle angolari: i raggi delle piste sono diversi.', num: (v) => [v.omegaG, (v.omegaE + v.omegaI) / 2] },
      ],
      num: (v) => [v.omegaG, (v.omegaE * v.Re + v.omegaI * v.Ri) / (2 * v.Rg)],
    },
    {
      id: 'd036.7',
      latex: 'R_g = \\dfrac{R_e + R_i}{2} \\;\\Rightarrow\\; \\omega_g = \\dfrac{\\omega_e R_e + \\omega_i R_i}{R_e + R_i}',
      perche: 'Il centro dell\'elemento sta a metà tra le due piste.',
      fonte: P98,
      distrattori: [],
      num: (v) => [v.omegaG, (v.omegaE * v.Re + v.omegaI * v.Ri) / (v.Re + v.Ri)],
    },
    {
      id: 'd036.8',
      latex: '\\omega_e = 0:\\quad \\dfrac{\\omega_g}{\\omega_i} = \\dfrac{R_i}{R_e + R_i} < \\dfrac12, \\qquad \\omega_v = -\\dfrac{\\omega_i R_i}{R_e - R_i}',
      perche: 'Caso usuale, anello esterno fisso al telaio: E è il CIR dell\'elemento, la gabbia gira a meno di metà dell\'albero e l\'elemento ruota su sé stesso in verso opposto all\'anello interno.',
      fonte: { tipo: 'deduzione', da: 'p. 98', spiegazione: 'formule generali di ω_g e ω_v con ω_e = 0 (R_i < R_e)' },
      aggiunto: true,
      distrattori: [
        { latex: '\\omega_g = \\dfrac{\\omega_i}{2}', errore: 'concetto', spiega: 'Il centro va a metà della velocità del contatto interno, ma sta su un raggio maggiore: ω_g/ω_i = R_i/(2R_g) < 1/2 (q36 scrive ≃ 1/2).', num: (v) => [v.omegaG0, v.omegaI / 2] },
      ],
      num: (v) => [v.omegaG0 / v.omegaI, v.Ri / (v.Re + v.Ri)],
    },
  ],
  risultato: { latex: 'V_G = \\dfrac{V_E + V_I}{2}, \\quad \\omega_v = \\dfrac{\\omega_e R_e - \\omega_i R_i}{R_e - R_i}, \\quad \\omega_g = \\dfrac{\\omega_e R_e + \\omega_i R_i}{R_e + R_i}', fonte: P98 },
  gancio: 'Due contatti ⇒ due equazioni del corpo rigido: la somma dà il centro (e la gabbia), la differenza la rotazione propria.',
};

// ------------------------------------------------------------------ d037 carico e attrito (pp. 98–99)
const P99 = { tipo: 'dispensa', pag: 99 } as const;
const simpson = (f: (x: number) => number, a: number, b: number, n = 400) => {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
};

export const d037: Dimostrazione = {
  id: 'd037',
  titolo: 'Cuscinetto volvente: distribuzione del carico e momento d\'attrito',
  enunciato: 'Un cuscinetto radiale a z rulli porta il carico Q. Ricavare il carico sul rullo più caricato e il momento resistente dovuto all\'attrito volvente, confrontandolo con un cuscinetto radente.',
  ipotesi: [
    'anelli indeformabili; conta solo lo schiacciamento hertziano degli elementi nella metà inferiore della corona',
    'rulli: schiacciamento proporzionale al carico, δ = kP; elementi equispaziati di γ = 2π/z',
    'z abbastanza grande da sostituire le somme con medie integrali; α piccolo (cos α ≃ 1)',
  ],
  sample: (rnd) => {
    const z = Math.round(U(rnd, 8, 24)), gamma = (2 * Math.PI) / z;
    const idx: number[] = [];
    for (let i = -Math.floor(z / 4); i <= Math.floor(z / 4); i++) if (Math.abs(i * gamma) < Math.PI / 2 - 1e-12) idx.push(i);
    const k = U(rnd, 1e-9, 1e-8), delta0 = U(rnd, 2e-6, 2e-5), P0 = delta0 / k;
    const i = idx[Math.floor(rnd() * idx.length)];
    const deltai = delta0 * (0 * Math.sin(i * gamma) + -1 * -Math.cos(i * gamma)); // proiezione dello spostamento verticale sulla radiale
    const Pi = deltai / k;
    const Q = idx.reduce((s, j) => s + P0 * Math.cos(j * gamma) * Math.cos(j * gamma), 0);
    const S2 = idx.reduce((s, j) => s + Math.cos(j * gamma) ** 2, 0), S1 = idx.reduce((s, j) => s + Math.cos(j * gamma), 0);
    const Sall = Array.from({ length: z }, (_, j) => Math.cos(j * gamma) ** 2).reduce((a, b) => a + b, 0);
    const fv = U(rnd, 0.001, 0.003), Rg = U(rnd, 0.02, 0.08), alpha = Math.asin(fv);
    const rho = Rg * Math.sin(alpha);
    const dist = Math.abs(0 * Math.cos(alpha) - -Rg * Math.sin(alpha)); // |G × d| con G = (0, −R_g), d = (sin α, cos α)
    const sommaFrho = idx.reduce((s, j) => s + ((P0 * Math.cos(j * gamma)) / Math.cos(alpha)) * rho, 0);
    return {
      z, gamma, i, k, delta0, P0, deltai, Pi, Q, S2, S1, Sall, fv, Rg, alpha, rho, dist, sommaFrho, Relem: U(rnd, 0.003, 0.01),
      mean2: simpson((x) => Math.cos(x) ** 2, -Math.PI / 2, Math.PI / 2) / Math.PI,
      mean1: simpson((x) => Math.cos(x), -Math.PI / 2, Math.PI / 2) / Math.PI,
    };
  },
  passi: [
    {
      id: 'd037.1',
      latex: '\\text{spostamento dell\'anello interno} = \\delta_0 = \\text{schiacciamento dell\'elemento centrale}',
      perche: 'Sotto $Q$ l\'anello interno comprime gli elementi della metà inferiore, che trasferiscono il carico all\'anello esterno. Gli anelli non si deformano: l\'anello interno trasla verso il basso di $\\delta_0$, che è lo schiacciamento del rullo sulla verticale.',
      fonte: P98,
      distrattori: [],
    },
    {
      id: 'd037.2',
      latex: '\\delta_i = \\delta_0\\cos(i\\gamma), \\qquad \\gamma = \\dfrac{2\\pi}{z}',
      perche: 'Il rullo $i$-esimo è a $i\\gamma$ dalla verticale: il suo schiacciamento è la componente radiale dello spostamento verticale $\\delta_0$.',
      fonte: P98,
      distrattori: [],
      num: (v) => [v.deltai, v.delta0 * Math.cos(v.i * v.gamma)],
    },
    {
      id: 'd037.3',
      latex: '\\delta = kP \\;\\Rightarrow\\; P_i = P_0\\cos(i\\gamma)',
      perche: 'Per i rulli si assume lo schiacciamento proporzionale al carico: i carichi seguono le deformazioni, massimi sul rullo centrale e nulli a 90°.',
      fonte: P98,
      chiave: true,
      distrattori: [
        { latex: 'P_i = P_0\\cos^2(i\\gamma)', errore: 'fattore', spiega: 'Il quadrato compare solo nell\'equilibrio, quando si proietta P_i in verticale.', num: (v) => [v.Pi, v.P0 * Math.cos(v.i * v.gamma) ** 2] },
        { latex: 'P_i = P_0 \\ \\text{per ogni } i', errore: 'ipotesi', spiega: 'I rulli non sono caricati ugualmente: lo schiacciamento cala con cos iγ.', num: (v) => [v.Pi, v.P0] },
      ],
      num: (v) => [v.Pi, v.P0 * Math.cos(v.i * v.gamma)],
    },
    {
      id: 'd037.4',
      latex: 'Q = \\sum_{-z/4}^{z/4} P_i\\cos(i\\gamma) = P_0\\sum_{-z/4}^{z/4}\\cos^2(i\\gamma)',
      perche: 'Equilibrio verticale dell\'anello interno: le reazioni dei rulli caricati (metà inferiore, $|i\\gamma| \\le 90°$) proiettate in verticale bilanciano $Q$.',
      fonte: P98,
      chiave: true,
      distrattori: [
        { latex: 'Q = \\sum P_i', errore: 'termine-perso', spiega: 'Le P_i sono radiali: va presa la componente verticale P_i cos iγ.', num: (v) => [v.Q, v.P0 * v.S1] },
        { latex: 'Q = P_0\\sum_{i=0}^{z-1}\\cos^2(i\\gamma)', errore: 'ipotesi', spiega: 'Solo la metà inferiore è caricata: i rulli di sopra non sono compressi.', num: (v) => [v.Q, v.P0 * v.Sall] },
      ],
      num: (v) => [v.Q, v.P0 * v.S2],
    },
    {
      id: 'd037.5',
      latex: '\\sum_{-z/4}^{z/4}\\cos^2(i\\gamma) \\simeq \\dfrac z2\\,\\overline{\\cos^2(i\\gamma)}',
      perche: 'Gli elementi caricati sono circa $z/2$ (esattamente $z/2 + 1$): per $z$ abbastanza grande la somma si sostituisce con il loro numero per il valor medio.',
      fonte: P99,
      distrattori: [],
    },
    {
      id: 'd037.6',
      latex: '\\overline{\\cos^2(i\\gamma)} \\simeq \\dfrac1\\pi\\int_{-\\pi/2}^{\\pi/2}\\cos^2\\theta\\,d\\theta = \\dfrac{1}{2\\pi}\\int_{-\\pi/2}^{\\pi/2}(1 + \\cos 2\\theta)\\,d\\theta = \\dfrac12',
      perche: 'La media discreta si approssima con la media integrale sull\'arco caricato; l\'integrale di $\\cos 2\\theta$ su un periodo è nullo.',
      fonte: P99,
      correzione: { nf: 'NF-135', dispensaScrive: '\\frac1\\pi\\int_{-\\pi/2}^{\\pi/2}\\frac{1 - \\cos(2x)}{2}' },
      distrattori: [
        { latex: '\\overline{\\cos^2} = \\dfrac2\\pi', errore: 'indice', spiega: '2/π è la media di cos θ, che servirà per la somma dei carichi; la media di cos² è 1/2.', num: (v) => [v.mean2, 2 / Math.PI] },
        { latex: '\\overline{\\cos^2} = 1', errore: 'concetto', spiega: 'Vale 1 solo per il rullo centrale; in media sull\'arco è 1/2.', num: (v) => [v.mean2, 1] },
      ],
      num: (v) => [v.mean2, 0.5],
    },
    {
      id: 'd037.7',
      latex: 'Q \\simeq P_0\\,\\dfrac z2\\cdot\\dfrac12 = P_0\\,\\dfrac z4 \\;\\Rightarrow\\; P_0 = \\dfrac{4Q}{z}',
      perche: 'Il rullo più caricato porta quattro volte il carico medio $Q/z$: è il valore che serve per dimensionare.',
      fonte: P99,
      chiave: true,
      distrattori: [
        { latex: 'P_0 = \\dfrac{Q}{z}', errore: 'ipotesi', spiega: 'Sarebbe il carico diviso ugualmente su tutti i rulli: ne lavora solo metà, e non ugualmente.', num: (v) => [v.Q / ((v.z / 2) * v.mean2), v.Q / v.z] },
        { latex: 'P_0 = \\dfrac{2Q}{z}', errore: 'fattore', spiega: 'Tiene conto della metà corona ma non della media 1/2 di cos².', num: (v) => [v.Q / ((v.z / 2) * v.mean2), (2 * v.Q) / v.z] },
      ],
      num: (v) => [v.Q / ((v.z / 2) * v.mean2), (4 * v.Q) / v.z],
    },
    {
      id: 'd037.8',
      latex: '\\text{sfere: } P_0 = \\dfrac{4{,}37\\,Q}{z} \\simeq \\dfrac{5Q}{z}',
      perche: 'Per le sfere il contatto hertziano non è lineare e il coefficiente cresce; la dispensa dà il valore senza derivazione e usa $5Q/z$ come stima conservativa per entrambi i tipi.',
      fonte: P99,
      distrattori: [],
    },
    {
      id: 'd037.9',
      latex: '\\sin\\alpha = \\dfrac uR = f_v',
      perche: 'Per la deformazione elastica dell\'elemento, il carico che gli arriva si inclina di $\\alpha$ e la sua retta è spostata di $u$ (parametro volvente) rispetto al centro dell\'elemento di raggio $R$: è l\'attrito volvente del capitolo 2.3.',
      fonte: P99,
      distrattori: [],
    },
    {
      id: 'd037.10',
      latex: '\\rho = R_g\\sin\\alpha = R_g\\,f_v',
      perche: 'La retta d\'azione su ogni elemento passa vicino al suo centro, che sta a $R_g$ dal centro del cuscinetto, inclinata di $\\alpha$ sulla radiale: la sua distanza da $\\Omega$ è $R_g\\sin\\alpha$. Tutte le rette inviluppano la **circonferenza di attrito volvente** di raggio $\\rho$, come il cerchio d\'attrito del perno.',
      fonte: P99,
      chiave: true,
      distrattori: [
        { latex: '\\rho = R\\,f_v', errore: 'indice', spiega: 'R è il raggio dell\'elemento: il braccio rispetto al centro del cuscinetto si misura da Ω, quindi R_g.', num: (v) => [v.dist, v.Relem * v.fv] },
        { latex: '\\rho = R_g\\cos\\alpha', errore: 'indice', spiega: 'Con α → 0 il braccio deve annullarsi (niente attrito, retta radiale).', num: (v) => [v.dist, v.Rg * Math.cos(v.alpha)] },
      ],
      num: (v) => [v.dist, v.Rg * v.fv],
    },
    {
      id: 'd037.11',
      latex: 'M_f = \\sum_i F_i\\,\\rho = \\sum_i\\dfrac{P_i}{\\cos\\alpha}\\,R_g\\,f_v',
      perche: 'Ogni elemento trasmette $F_i = P_i/\\cos\\alpha$ (componente radiale $P_i$) con braccio $\\rho$: i momenti hanno tutti lo stesso verso e si sommano.',
      fonte: P99,
      distrattori: [],
      num: (v) => [v.sommaFrho, ((v.P0 * v.S1) / Math.cos(v.alpha)) * v.Rg * v.fv],
    },
    {
      id: 'd037.12',
      latex: '\\sum P_i \\simeq P_0\\,\\dfrac z2\\cdot\\dfrac1\\pi\\int_{-\\pi/2}^{\\pi/2}\\cos\\theta\\,d\\theta = P_0\\,\\dfrac z2\\cdot\\dfrac2\\pi = P_0\\,\\dfrac z\\pi',
      perche: 'Stessa sostituzione di prima, ora con la media di $\\cos$ (che vale $2/\\pi$) perché nel momento entrano i moduli dei carichi, non le componenti verticali.',
      fonte: P99,
      distrattori: [],
      num: (v) => [v.P0 * (v.z / 2) * v.mean1, (v.P0 * v.z) / Math.PI],
    },
    {
      id: 'd037.13',
      latex: 'M_f \\simeq P_0\\,\\dfrac z\\pi\\,R_g f_v, \\quad P_0 \\simeq \\dfrac{5Q}{z} \\;\\Rightarrow\\; M_f \\simeq \\dfrac5\\pi\\,Q\\,R_g\\,f_v',
      perche: 'Con $\\cos\\alpha \\simeq 1$ e il carico massimo conservativo $5Q/z$ il numero di elementi si semplifica: circa $1{,}6\\,Q R_g f_v$ (con $4Q/z$ dei rulli verrebbe $\\frac4\\pi Q R_g f_v$).',
      fonte: P99,
      chiave: true,
      correzione: { nf: 'NF-127', dispensaScrive: 'M_f \\simeq \\underbrace{P_0\\frac z\\pi}_{Q\\frac 5z}\\frac{1}{\\cos\\alpha} R_g f_v = Q\\frac5\\pi R_g f_v' },
      distrattori: [
        { latex: 'M_f = Q\\,R_g\\,f_v', errore: 'termine-perso', spiega: 'La somma dei moduli dei carichi supera Q (Q ne è la somma delle componenti verticali): ΣP_i ≈ (5/π)Q.', num: (v) => [((5 * v.Q) / v.z) * (v.z / Math.PI) * v.Rg * v.fv, v.Q * v.Rg * v.fv] },
        { latex: 'M_f = \\dfrac5\\pi\\,Q\\,R\\,f_v \\ (R \\text{ raggio dell\'elemento})', errore: 'indice', spiega: 'Il braccio si misura dal centro del cuscinetto: ρ = R_g f_v.', num: (v) => [((5 * v.Q) / v.z) * (v.z / Math.PI) * v.Rg * v.fv, (5 / Math.PI) * v.Q * v.Relem * v.fv] },
      ],
      num: (v) => [((5 * v.Q) / v.z) * (v.z / Math.PI) * v.Rg * v.fv, (5 / Math.PI) * v.Q * v.Rg * v.fv],
    },
    {
      id: 'd037.14',
      latex: '\\text{radente: } M_p = Q\\,r\\,f_d \\quad\\Rightarrow\\quad f_v \\ll f_d \\;\\Rightarrow\\; M_f \\ll M_p',
      perche: 'In un cuscinetto radente il momento è il carico per il raggio del perno per il coefficiente d\'attrito (cerchio d\'attrito, $QR\\sin\\varphi \\simeq QRf$). Poiché $f_v$ è di uno o due ordini di grandezza più piccolo di $f_d$, la resistenza alla rotazione del volvente è molto minore.',
      fonte: P99,
      correzione: { nf: 'NF-127', dispensaScrive: 'M_p = Q\\,R_e\\,f_d \\ \\text{(lettura incerta)}' },
      distrattori: [],
    },
  ],
  risultato: { latex: 'P_0 = \\dfrac{4Q}{z}\\ (\\text{rulli}),\\ \\simeq \\dfrac{5Q}{z}\\ (\\text{sfere}); \\qquad M_f \\simeq \\dfrac5\\pi\\,Q\\,R_g\\,f_v', fonte: P99 },
  gancio: 'Carichi a coseno sulla metà di sotto: Q = P₀·(z/2)·(1/2), quindi P₀ = 4Q/z; le rette inclinate di f_v sfiorano un cerchio di raggio R_g f_v.',
};

// ------------------------------------------------------------------ argomento
export const cuscinetti: ArgomentoContenuto = {
  id: 'c2-cuscinetti',
  cosaDireSubito:
    'Un cuscinetto volvente sostituisce lo strisciamento tra albero e foro con il rotolamento di sfere o rulli tra un anello interno e uno esterno, tenuti a passo da una gabbia. Con la formula del corpo rigido sui due contatti si trova che il centro dell\'elemento va alla media delle velocità delle piste e la gabbia gira a ω_g = (ω_e R_e + ω_i R_i)/(R_e + R_i). Il carico radiale si ripartisce a coseno sulla metà inferiore, con P₀ = 4Q/z sul rullo più caricato, e il momento d\'attrito è circa (5/π) Q R_g f_v, molto minore di quello di un radente.',
  sistemaIpotesi: [
    'Sistema: anello interno (raggio di pista R_i, ω_i), anello esterno (R_e, ω_e), z elementi di raggio r = (R_e − R_i)/2, gabbia sulla circonferenza dei centri R_g.',
    'Rotolamento senza strisciamento sulle due piste; anelli indeformabili.',
    'Carico radiale Q: schiacciamento degli elementi della metà inferiore, lineare nel carico per i rulli.',
    'Attrito volvente: carico sull\'elemento inclinato di α con sin α = f_v.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Cuscinetto radiale (dispensa p. 98): a sinistra la cinematica dell\'elemento con i contatti E e I, a destra la distribuzione del carico sui rulli della metà inferiore.',
    fonte: { tipo: 'dispensa', pag: 98, fig: 'cinematica (manoscritta) e distribuzione del carico (libro)' },
    elementi: [
      { id: 'anelli', testo: 'centro Ω, anello interno (R_i, ω_i) e anello esterno (R_e, ω_e)', obbligatorio: true },
      { id: 'elemento', testo: 'elemento volvente di centro G e raggio r, contatti E (pista esterna) e I (pista interna)', obbligatorio: true },
      { id: 'gabbia', testo: 'circonferenza dei centri R_g e gabbia con ω_g', obbligatorio: true },
      { id: 'omegav', testo: 'rotazione propria ω_v dell\'elemento', obbligatorio: false },
      { id: 'carico', testo: 'carico Q sull\'anello interno e reazioni radiali P_i sugli elementi della metà inferiore, massima P₀ in basso', obbligatorio: true },
      { id: 'gamma', testo: 'passo angolare γ = 2π/z', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'V_E = V_G + \\omega_v \\wedge (E - G), \\quad V_I = V_G + \\omega_v \\wedge (I - G); \\qquad Q = \\sum P_i\\cos(i\\gamma)',
    spiegazione: 'Formula del corpo rigido sull\'elemento ai due contatti (con le velocità delle piste), ed equilibrio verticale dell\'anello interno sotto il carico.',
    fonte: { tipo: 'dispensa', pag: 98 },
  },
  dimostrazioni: ['d036', 'd037'],
  significato:
    'Il cuscinetto volvente scambia l\'attrito radente con l\'attrito volvente, uno o due ordini di grandezza più piccolo e quasi indipendente da carico e velocità (più regolare). Il prezzo è che il carico si concentra su pochi elementi: il più caricato porta 4–5 volte il carico medio, ed è quello che dimensiona il cuscinetto.',
  fraseDaRicordare: 'Centro dell\'elemento alla media delle velocità delle piste; P₀ = 4Q/z (rulli), 5Q/z (sfere); M_f ≃ (5/π) Q R_g f_v.',
  daNonDire: [
    { frase: 'La gabbia gira a metà della velocità dell\'albero.', perche: 'Con anello esterno fermo ω_g/ω_i = R_i/(R_e + R_i), sempre minore di 1/2 (q36 scrive ≃ 1/2, NF-134).', fonte: { tipo: 'dispensa', pag: 98 } },
    { frase: 'Tutti gli elementi portano lo stesso carico Q/z.', perche: 'Solo la metà inferiore è caricata e con legge a coseno: il più caricato porta 4Q/z.', fonte: { tipo: 'dispensa', pag: [98, 99] } },
    { frase: 'Q è il carico sul singolo rullo e P quello esterno.', perche: 'Nella dispensa Q è il carico esterno e P_i quelli sugli elementi; d037 li inverte (NF-40).', fonte: { tipo: 'dispensa', pag: 98 } },
    { frase: 'ω_g = (ω_e R_e + ω_i R_i)/R_g.', perche: 'Manca il 2: la somma delle velocità delle piste è 2V_G (la riga intermedia della dispensa lo perde, NF-35).', fonte: { tipo: 'dispensa', pag: 98 } },
    { frase: 'La durata dipende dalla fatica di contatto, come dice la dispensa.', perche: 'La dispensa non parla di fatica (NF-40): se lo dici, presentalo come completamento.', fonte: { tipo: 'dispensa', pag: [97, 99] } },
  ],
  approfondimenti: [
    {
      domanda: 'Da che cosa è fatto un cuscinetto volvente e perché conviene?',
      tipo: 'approfondimento',
      attesa: 'Anello interno solidale all\'albero, anello esterno solidale al foro (telaio), elementi volventi (sfere, rulli, rulli conici) equidistanziati da una gabbia. Attrito molto basso e grande regolarità: f_v quasi indipendente da carico e velocità, al contrario dei radenti.',
      fonte: { tipo: 'dispensa', pag: 97 },
    },
    {
      domanda: 'Che tipi di cuscinetti conosci?',
      tipo: 'approfondimento',
      attesa: 'Radiali (carichi ortogonali all\'asse), assiali o reggispinta (carichi lungo l\'asse), obliqui (entrambe le componenti). Gli obliqui reggono il carico assiale in un solo verso, per questo si montano a coppie contrapposte.',
      fonte: { tipo: 'dispensa', pag: 97 },
    },
    {
      domanda: 'Con l\'anello esterno fermo, chi è il CIR dell\'elemento e quanto vale ω_g?',
      tipo: 'approfondimento',
      attesa: 'Il contatto E con la pista ferma: V_E = 0, quindi V_G = V_I/2 = ω_i R_i/2 e ω_g = ω_i R_i/(R_e + R_i) < ω_i/2; l\'elemento ruota in verso opposto all\'albero.',
      fonte: { tipo: 'deduzione', da: 'p. 98', spiegazione: 'formule generali con ω_e = 0' },
    },
    {
      domanda: 'Quanto vale il momento d\'attrito di un radente a pari carico?',
      tipo: 'approfondimento',
      attesa: 'M_p = Q r f_d, con r raggio del perno (cerchio d\'attrito); con f_v ≈ 0,001 contro f_d ≈ 0,1 il volvente resiste circa cento volte meno.',
      fonte: { tipo: 'dispensa', pag: 99 },
    },
    {
      domanda: 'Perché la durata di un cuscinetto è limitata anche senza usura?',
      tipo: 'approfondimento',
      attesa: 'Ogni elemento entra ed esce dalla zona caricata a ogni giro: il carico di contatto è ciclico e porta a fatica superficiale (pitting). La dispensa non lo tratta.',
      fonte: { tipo: 'esterna', ref: 'trattazione classica della durata dei cuscinetti volventi (fatica di contatto)', nota: 'citato in q36, assente nella dispensa (NF-40)' },
    },
    {
      domanda: 'Da dove viene l\'inclinazione α del carico sull\'elemento?',
      tipo: 'collegamento',
      argomento: 'c2-volvente',
      attesa: 'È l\'attrito volvente: per l\'isteresi la reazione si sposta di u rispetto al centro dell\'elemento di raggio R, quindi sin α = u/R = f_v.',
      fonte: { tipo: 'dispensa', pag: [88, 99] },
    },
    {
      domanda: 'Che strumento di cinematica hai usato per l\'elemento?',
      tipo: 'collegamento',
      argomento: 'c1-velocita',
      attesa: 'La formula fondamentale del corpo rigido V_P = V_G + ω ∧ (P − G) sui due punti di contatto, con il vincolo di rotolamento senza strisciamento (velocità uguali a quelle delle piste).',
      fonte: { tipo: 'dispensa', pag: 98 },
    },
  ],
  simboli: [
    { simbolo: '\\omega_i,\\ \\omega_e', significato: 'velocità angolari degli anelli interno ed esterno', altrove: 'ω₁ (anello interno) in q36' },
    { simbolo: '\\omega_v,\\ \\omega_g', significato: 'rotazione propria dell\'elemento e velocità della gabbia' },
    { simbolo: 'R_i,\\ R_e,\\ R_g', significato: 'raggi della pista interna, esterna e della circonferenza dei centri', altrove: 'r_i, r_s (raggio della sfera) in q36' },
    { simbolo: 'E,\\ I,\\ G,\\ \\Omega', significato: 'contatti esterno e interno, centro dell\'elemento, centro del cuscinetto' },
    { simbolo: 'Q,\\ P_i,\\ P_0', significato: 'carico radiale esterno, carichi sugli elementi, carico massimo', altrove: 'd037 inverte: Q_i sugli elementi, P esterno' },
    { simbolo: 'z,\\ \\gamma,\\ \\delta_i', significato: 'numero di elementi, passo angolare 2π/z, schiacciamenti' },
    { simbolo: '\\rho,\\ M_f,\\ M_p', significato: 'raggio della circonferenza di attrito volvente, momento resistente volvente e radente' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c2-cuscinetto' }],
  previsioni: [
    {
      id: 'c2-cusc-gabbia',
      domanda: 'Anello esterno fermo, albero a 3000 giri/min, R_i = 20 mm, R_e = 30 mm. La gabbia gira a…',
      opzioni: ['1500 giri/min', '1200 giri/min', '2000 giri/min', '3000 giri/min'],
      corretta: 1,
      spiega: 'ω_g/ω_i = R_i/(R_e + R_i) = 20/50 = 0,4: 1200 giri/min, meno della metà.',
      verify: () => {
        const k = cuscinettoCinematica({ omegaI: 3000, omegaE: 0, Ri: 0.02, Re: 0.03 });
        const n = Math.round(k.omegaG);
        return n === 1500 ? 0 : n === 1200 ? 1 : n === 2000 ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c2-cuscinetto' },
    },
    {
      id: 'c2-cusc-carico',
      domanda: 'Cuscinetto a 16 rulli con carico radiale 8 kN. Il rullo più caricato porta circa…',
      opzioni: ['0,5 kN', '1 kN', '2 kN', '8 kN'],
      corretta: 2,
      spiega: 'P₀ ≃ 4Q/z = 4·8/16 = 2 kN (il conto esatto con la somma dà 2 kN anche lui: la somma dei cos² su 7 rulli vale 4).',
      verify: () => {
        const c = cuscinettoCarico({ Q: 8000, z: 16 });
        return Math.abs(c.P0approx - 2000) < 1e-9 && Math.abs(c.P0 - 2000) < 1 ? 2 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c2-cuscinetto' },
    },
  ],
  nf: ['NF-03', 'NF-35', 'NF-40', 'NF-126', 'NF-127', 'NF-133', 'NF-134', 'NF-135'],
};
