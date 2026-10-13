/**
 * C5 parte a · Ruote dentate: dalle ruote di frizione alla legge dell'ingranamento, evolvente, passo e modulo,
 * rapporto di trasmissione (domanda q22). Dispensa pp. 156–167 (tools/testi/cap5a.md).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { evolvente, interasseVariato } from '../../engine/c5a';
import { figIngranaggio } from './a-figure';

const DEG = Math.PI / 180;
type V = [number, number];
const wk = (w: number, r: V): V => [-w * r[1], w * r[0]]; // ω k ∧ r
const cz = (a: V, b: V) => a[0] * b[1] - a[1] * b[0];
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1];
const norm = (a: V) => Math.hypot(a[0], a[1]);
const zInt = (rnd: () => number, lo: number, hi: number) => Math.round(U(rnd, lo, hi));

// ------------------------------------------------------------------ d072 ruote di frizione
export const d072: Dimostrazione = {
  id: 'd072',
  titolo: 'Ruote di frizione: rapporto di trasmissione e coppia massima',
  enunciato: 'Due ruote di raggi R₁ e R₂, premute l\'una contro l\'altra da F_N, rotolano senza strisciare in C. Ricavare τ = ω₂/ω₁ dalla cinematica e dalla T.F.V., e il limite di coppia dato dall\'aderenza.',
  ipotesi: [
    'contatto esterno nel punto C sull\'interasse; assi fissi in O₁ e O₂',
    'aderenza: F_t ≤ f F_N, quindi niente strisciamento e velocità relativa nulla in C',
    'moto piano: ω = ω k, con un verso positivo comune per le due ruote',
    'regime (ω̇ = 0) e nessuna perdita nella T.F.V.',
  ],
  sample: (rnd) => {
    const R1 = U(rnd, 0.03, 0.2), R2 = U(rnd, 0.03, 0.3), w1 = U(rnd, 5, 100);
    const FN = U(rnd, 100, 2000), f = U(rnd, 0.1, 0.5);
    const C1 = U(rnd, 0.2, 0.95) * f * FN * R1;
    const V1 = wk(w1, [R1, 0])[1];
    const w2 = -(w1 * R1) / R2; // da V_C|1 = V_C|2
    const V2 = wk(w2, [-R2, 0])[1];
    const C2 = (-C1 * w1) / w2; // T.F.V. in regime
    const VRO2 = wk(w2 - w1, [R2, 0])[1];
    return { R1, R2, w1, w2, V1, V2, C1, C2, FN, f, VRO2, tau: w2 / w1 };
  },
  passi: [
    {
      id: 'd072.1',
      latex: '\\underline{V_C}\\big|_{\\in 1} = \\underline{\\omega_1}\\wedge(C - O_1) = \\omega_1\\underline{k}\\wedge R_1\\underline{i} = \\omega_1 R_1\\,\\underline{j}',
      perche: 'Velocità di C pensato come punto della ruota 1: $O_1$ è fermo, quindi resta solo $\\omega_1 \\wedge (C - O_1)$, con $C - O_1 = R_1\\underline i$ e $\\underline k \\wedge \\underline i = \\underline j$.',
      fonte: { tipo: 'dispensa', pag: 156 },
      distrattori: [],
      num: (v) => [v.V1, v.w1 * v.R1],
    },
    {
      id: 'd072.2',
      latex: '\\underline{V_C}\\big|_{\\in 2} = \\underline{\\omega_2}\\wedge(C - O_2) = \\omega_2\\underline{k}\\wedge(-R_2\\underline{i}) = -\\omega_2 R_2\\,\\underline{j}',
      perche: 'Stesso conto per C come punto della ruota 2: ora $C$ sta a sinistra di $O_2$, quindi $C - O_2 = -R_2\\underline i$ e compare il segno meno.',
      fonte: { tipo: 'dispensa', pag: 156 },
      distrattori: [
        { latex: '\\underline{V_C}\\big|_{\\in 2} = \\omega_2 R_2\\,\\underline{j}', errore: 'segno', spiega: 'C − O₂ punta verso sinistra (−R₂ i): da qui nasce il segno negativo di τ.', num: (v) => [v.V2, v.w2 * v.R2] },
      ],
      num: (v) => [v.V2, -v.w2 * v.R2],
    },
    {
      id: 'd072.3',
      latex: '\\underline{V_C}\\big|_{\\in 1} = \\underline{V_C}\\big|_{\\in 2} \\;\\Rightarrow\\; \\omega_1 R_1 = -\\omega_2 R_2',
      perche: 'Finché c\'è aderenza ($F_t \\le f F_N$) le ruote rotolano senza strisciare: la velocità relativa in C è nulla, cioè le velocità periferiche sono uguali. C è il C.I.R. del moto relativo.',
      fonte: { tipo: 'dispensa', pag: [156, 157] },
      chiave: true,
      distrattori: [
        { latex: '\\omega_1 R_1 = \\omega_2 R_2', errore: 'segno', spiega: 'Con ω come componenti lungo k (verso comune) le due ruote esterne girano in versi opposti: ω₁R₁ = −ω₂R₂. Senza segno vale solo in modulo.', num: (v) => [v.w1 * v.R1, v.w2 * v.R2] },
        { latex: '\\omega_1 R_2 = -\\omega_2 R_1', errore: 'indice', spiega: 'Ogni ω moltiplica il raggio della sua ruota: la velocità periferica di 1 è ω₁R₁.', num: (v) => [v.w1 * v.R2, -v.w2 * v.R1] },
      ],
      num: (v) => [v.w1 * v.R1, -v.w2 * v.R2],
    },
    {
      id: 'd072.4',
      latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = -\\dfrac{R_1}{R_2} < 0',
      perche: 'Rapporto di trasmissione della dispensa: uscita su entrata, con segno. È negativo perché le velocità angolari sono opposte, e costante perché i raggi lo sono: non dipende né dalla posizione né dalla potenza trasmessa.',
      fonte: { tipo: 'dispensa', pag: [156, 157] },
      chiave: true,
      distrattori: [
        { latex: '\\tau = -\\dfrac{R_2}{R_1}', errore: 'convenzione', spiega: 'È il reciproco i = ω₁/ω₂ delle fonti derivate (NF-09): nella dispensa τ = ω_uscita/ω_entrata.', num: (v) => [v.tau, -v.R2 / v.R1] },
        { latex: '\\tau = \\dfrac{R_1}{R_2}', errore: 'segno', spiega: 'Per il contatto esterno τ < 0: le ruote girano in versi opposti.', num: (v) => [v.tau, v.R1 / v.R2] },
      ],
      num: (v) => [v.tau, -v.R1 / v.R2],
    },
    {
      id: 'd072.5',
      latex: '\\underline{V}^R_{O_2} = \\underline{V}^R_C + (\\underline{\\omega_2} - \\underline{\\omega_1})\\wedge(O_2 - C) = (\\omega_2 - \\omega_1)R_2\\,\\underline{j} = -\\omega_1(R_1 + R_2)\\,\\underline{j}',
      perche: 'Visto da un osservatore solidale alla ruota 1: $\\omega^R_{2,1} = \\omega_2 - \\omega_1$ e $V^R_C = 0$, perché C è il centro di istantanea rotazione del moto relativo. Con $\\omega_2 R_2 = -\\omega_1 R_1$ si ottiene la velocità relativa del centro $O_2$.',
      fonte: { tipo: 'dispensa', pag: 157 },
      distrattori: [
        { latex: '\\underline{V}^R_{O_2} = -\\omega_1 (R_2 - R_1)\\,\\underline{j}', errore: 'segno', spiega: 'ω₂R₂ = −ω₁R₁, quindi (ω₂ − ω₁)R₂ = −ω₁R₁ − ω₁R₂: i raggi si sommano.', num: (v) => [v.VRO2, -v.w1 * (v.R2 - v.R1)] },
      ],
      num: (v) => [v.VRO2, -v.w1 * (v.R1 + v.R2)],
    },
    {
      id: 'd072.6',
      latex: '\\underline{C_1}\\cdot\\underline{\\omega_1} + \\underline{C_2}\\cdot\\underline{\\omega_2} = 0 \\;\\Rightarrow\\; \\tau = \\dfrac{\\omega_{2z}}{\\omega_{1z}} = -\\dfrac{C_{1z}}{C_{2z}}',
      perche: 'Teorema delle forze vive in regime ($\\dot\\omega_1 = \\dot\\omega_2 = 0$) e senza perdite: la potenza entrante $C_1\\omega_1 > 0$ esce tutta, $C_2\\omega_2 < 0$. Diviso per $C_{2z}\\omega_{1z}$ dà il rapporto con le coppie.',
      fonte: { tipo: 'dispensa', pag: 157 },
      distrattori: [
        { latex: '\\tau = -\\dfrac{C_{2z}}{C_{1z}}', errore: 'indice', spiega: 'Le coppie stanno al contrario delle velocità: una riduzione di velocità è una moltiplicazione di coppia.', num: (v) => [v.tau, -v.C2 / v.C1] },
        { latex: '\\tau = \\dfrac{C_{1z}}{C_{2z}}', errore: 'segno', spiega: 'C₁ω₁ e C₂ω₂ hanno segno opposto (una potenza entra, l\'altra esce): il segno meno resta.', num: (v) => [v.tau, v.C1 / v.C2] },
      ],
      num: (v) => [v.tau, -v.C1 / v.C2],
    },
    {
      id: 'd072.7',
      latex: '\\dfrac{C_{1z}}{C_{2z}} = \\dfrac{R_1}{R_2} = -\\tau > 0',
      perche: 'Unendo i due risultati: le coppie hanno lo stesso segno lungo k e stanno come i raggi. È anche l\'equilibrio alla rotazione delle due ruote con la stessa forza tangenziale: $C_1 = F_t R_1$, $C_2 = F_t R_2$.',
      fonte: { tipo: 'dispensa', pag: [156, 157] },
      distrattori: [],
      num: (v) => [v.C1 / v.C2, v.R1 / v.R2],
    },
    {
      id: 'd072.8',
      latex: 'C_1 = F_t R_1 \\le f F_N R_1 \\;\\Rightarrow\\; |C_1^{max}| = f|F_N|R_1,\\quad |C_2^{max}| = f|F_N|R_2',
      perche: 'Equilibrio alla rotazione della ruota 1: la coppia motrice è equilibrata solo dalla forza d\'aderenza, che non può superare $f F_N$. Oltre questo limite le ruote strisciano: per questo le ruote di frizione non vanno oltre una certa potenza e si passa alle ruote dentate, che affidano la coppia alla forza normale.',
      fonte: { tipo: 'dispensa', pag: [156, 157] },
      chiave: true,
      distrattori: [
        { latex: '|C_1^{max}| = f|F_N|R_2', errore: 'indice', spiega: 'Il braccio della forza d\'aderenza sulla ruota 1 è il suo raggio R₁.' },
        { latex: '|C_1^{max}| = |F_N|R_1', errore: 'termine-perso', spiega: 'La forza tangenziale massima è f F_N, non F_N: senza f si confonde la forza premente con quella trasmessa.' },
      ],
    },
  ],
  risultato: { latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = -\\dfrac{R_1}{R_2} = -\\dfrac{C_{1z}}{C_{2z}},\\qquad |C_i^{max}| = f|F_N|R_i', fonte: { tipo: 'dispensa', pag: [156, 157] } },
  gancio: 'Stessa velocità in C, raggi opposti nel segno: τ = −R₁/R₂. La coppia la limita f F_N.',
};

// ------------------------------------------------------------------ geometria generica di due profili (d073, d074)
const profiliGenerici = (rnd: () => number): Vars => {
  const i = U(rnd, 0.1, 0.5), c = U(rnd, 0.3, 0.7) * i, th = U(rnd, 5, 40) * DEG, s = U(rnd, -0.15, 0.15) * i, w1 = U(rnd, 5, 50);
  const n: V = [Math.sin(th), Math.cos(th)];
  const P: V = [c + s * n[0], s * n[1]], P2: V = [P[0] - i, P[1]];
  const w2 = (w1 * cz(P, n)) / cz(P2, n); // componenti normali uguali
  const V1 = wk(w1, P), V2 = wk(w2, P2);
  const V1n = dot(V1, n), V2n = dot(V2, n);
  const nV1 = norm(V1), nV2 = norm(V2);
  const cosa1 = Math.abs(V1n) / nV1, cosa2 = Math.abs(V2n) / nV2;
  const d1 = Math.abs(cz(P, n)), d2 = Math.abs(cz(P2, n)); // O₁H₁, O₂H₂
  const PC: V = [P[0] - c, P[1]], CO2: V = [c - i, 0], CO1: V = [c, 0];
  const Vr: V = [V2[0] - V1[0], V2[1] - V1[1]];
  const T1 = wk(w2, PC), T2 = wk(w2, CO2), T3 = wk(w1, PC), T4 = wk(w1, CO1);
  return {
    i, c, th, s, w1, w2, nV1, nV2, V1n, V2n, cosa1, cosa2, d1, d2, OP1: norm(P), OP2: norm(P2), tau: w2 / w1,
    Vr0: Vr[0], Vr1: Vr[1], Vrn: norm(Vr), somma0: T1[0] + T2[0] - T3[0] - T4[0],
    rel1: wk(w2 - w1, PC)[1], relPiu1: wk(w2 + w1, PC)[1], relO1: wk(w2 - w1, P)[1],
  };
};

// ------------------------------------------------------------------ d073 triangoli simili
export const d073: Dimostrazione = {
  id: 'd073',
  titolo: 'Rapporto di trasmissione con i triangoli simili',
  enunciato: 'Due corpi qualsiasi ruotano attorno ai centri fissi O₁ e O₂ e si toccano in P; la normale comune in P taglia l\'interasse in C. Dimostrare che |τ| = O₁H₁/O₂H₂ = O₁C/O₂C, con H₁ e H₂ piedi delle perpendicolari dai centri sulla normale.',
  ipotesi: [
    'profili qualsiasi («ameboidi»), contatto in un punto P₁ ≡ P₂',
    'nessuna compenetrazione né distacco: le componenti normali delle velocità di P₁ e P₂ sono uguali',
    'la componente tangente può differire (strisciamento)',
  ],
  sample: profiliGenerici,
  passi: [
    {
      id: 'd073.1',
      latex: '\\underline{V}_{P_1} = \\underline{V}_{O_1} + \\underline{\\omega_1}\\wedge(P_1 - O_1) \\;\\Rightarrow\\; |V_1| = |\\omega_1|\\,\\overline{O_1P_1}, \\quad |V_2| = |\\omega_2|\\,\\overline{O_2P_2}',
      perche: '$O_1$ è un centro fisso ($V_{O_1} = 0$): la velocità di $P_1$ è perpendicolare a $O_1P_1$ e vale $\\omega_1$ per la distanza. Lo stesso per $P_2$ rispetto a $O_2$.',
      fonte: { tipo: 'dispensa', pag: 158 },
      distrattori: [],
      num: (v) => [v.nV1, Math.abs(v.w1) * v.OP1],
    },
    {
      id: 'd073.2',
      latex: '\\underline{V_1}\\cdot\\underline{n} = \\underline{V_2}\\cdot\\underline{n} \\;\\Rightarrow\\; |V_1|\\cos\\alpha_1 = |V_2|\\cos\\alpha_2',
      perche: 'Se un corpo spinge l\'altro senza urto, nel punto di contatto le componenti lungo la normale comune $n$ devono coincidere: se fossero diverse i corpi si compenetrerebbero o si staccherebbero. $\\alpha_i$ è l\'angolo fra $V_i$ e la normale.',
      fonte: { tipo: 'dispensa', pag: 158 },
      chiave: true,
      distrattori: [
        { latex: '\\underline{V_1} = \\underline{V_2}', errore: 'concetto', spiega: 'L\'uguaglianza completa vale solo in C (rotolamento puro): altrove le componenti tangenti differiscono e c\'è strisciamento.', num: (v) => [v.nV1, v.nV2] },
        { latex: '|V_1|\\sin\\alpha_1 = |V_2|\\sin\\alpha_2', errore: 'concetto', spiega: 'Sono le componenti tangenti: possono essere diverse, la loro differenza è la velocità di strisciamento.', num: (v) => [v.nV1 * Math.sqrt(1 - v.cosa1 ** 2), v.nV2 * Math.sqrt(1 - v.cosa2 ** 2)] },
      ],
      num: (v) => [v.V1n, v.V2n],
    },
    {
      id: 'd073.3',
      latex: '\\dfrac{|\\omega_2|}{|\\omega_1|} = \\dfrac{\\overline{O_1P_1}\\cos\\alpha_1}{\\overline{O_2P_2}\\cos\\alpha_2}',
      perche: 'Si sostituiscono $|V_i| = |\\omega_i|\\,\\overline{O_iP_i}$ nell\'uguaglianza delle componenti normali e si ricava il rapporto delle velocità angolari.',
      fonte: { tipo: 'dispensa', pag: 158 },
      distrattori: [],
      num: (v) => [Math.abs(v.w2) / Math.abs(v.w1), (v.OP1 * v.cosa1) / (v.OP2 * v.cosa2)],
    },
    {
      id: 'd073.4',
      latex: '\\overline{O_1P_1}\\cos\\alpha_1 = \\overline{O_1H_1},\\ \\ \\overline{O_2P_2}\\cos\\alpha_2 = \\overline{O_2H_2} \\;\\Rightarrow\\; \\dfrac{|\\omega_2|}{|\\omega_1|} = \\dfrac{\\overline{O_1H_1}}{\\overline{O_2H_2}}',
      perche: 'L\'angolo fra $O_1P_1$ e la perpendicolare $O_1H_1$ alla normale è ancora $\\alpha_1$ (lati a due a due perpendicolari: $V_1 \\perp O_1P_1$, $n \\perp O_1H_1$). Nel triangolo rettangolo $O_1H_1P_1$ il cateto è $\\overline{O_1P_1}\\cos\\alpha_1$.',
      fonte: { tipo: 'dispensa', pag: 158 },
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{|\\omega_2|}{|\\omega_1|} = \\dfrac{\\overline{O_1P_1}}{\\overline{O_2P_2}}', errore: 'concetto', spiega: 'Conta la distanza dei centri dalla normale (O_iH_i), non dal punto di contatto: il cos α non si semplifica.', num: (v) => [Math.abs(v.w2) / Math.abs(v.w1), v.OP1 / v.OP2] },
        { latex: '\\dfrac{|\\omega_2|}{|\\omega_1|} = \\dfrac{\\overline{O_2H_2}}{\\overline{O_1H_1}}', errore: 'indice', spiega: 'La ruota con il braccio più corto rispetto alla normale gira più veloce: ω₂ sta con O₁H₁ al numeratore.', num: (v) => [Math.abs(v.w2) / Math.abs(v.w1), v.d2 / v.d1] },
      ],
      num: (v) => [Math.abs(v.w2) / Math.abs(v.w1), v.d1 / v.d2],
    },
    {
      id: 'd073.5',
      latex: '\\widehat{O_1H_1C} \\sim \\widehat{O_2H_2C} \\;\\Rightarrow\\; \\dfrac{\\overline{O_1H_1}}{\\overline{O_2H_2}} = \\dfrac{\\overline{O_1C}}{\\overline{O_2C}}',
      perche: 'I due triangoli sono rettangoli in $H_1$ e $H_2$ e hanno gli angoli in C opposti al vertice, quindi uguali: sono simili e i lati omologhi sono proporzionali.',
      fonte: { tipo: 'dispensa', pag: 159 },
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{\\overline{O_1H_1}}{\\overline{O_2H_2}} = \\dfrac{\\overline{O_1C}}{\\overline{O_1O_2}}', errore: 'concetto', spiega: 'I lati omologhi sono le ipotenuse O₁C e O₂C dei due triangoli, non l\'interasse.', num: (v) => [v.d1 / v.d2, v.c / v.i] },
        { latex: '\\dfrac{\\overline{O_1H_1}}{\\overline{O_2H_2}} = \\dfrac{\\overline{O_2C}}{\\overline{O_1C}}', errore: 'indice', spiega: 'O₁H₁ è il cateto del triangolo di O₁, omologo all\'ipotenusa O₁C dello stesso triangolo.', num: (v) => [v.d1 / v.d2, (v.i - v.c) / v.c] },
      ],
      num: (v) => [v.d1 / v.d2, v.c / (v.i - v.c)],
    },
    {
      id: 'd073.6',
      latex: '|\\tau| = \\dfrac{\\overline{O_1C}}{\\overline{O_2C}} \\;\\Rightarrow\\; \\tau = -\\dfrac{\\overline{O_1C}}{\\overline{O_2C}}\\ \\ (\\text{C fra } O_1 \\text{ e } O_2)',
      perche: 'Il rapporto dei segmenti è positivo e dà il modulo. Se C cade fra i centri (ruote esterne) le velocità angolari sono opposte, quindi τ è negativo; per le circonferenze primitive $\\overline{O_1C} = R_1$ e $\\overline{O_2C} = R_2$.',
      fonte: { tipo: 'dispensa', pag: [159, 160] },
      correzione: { nf: 'NF-181', dispensaScrive: '\\frac{\\overline{O_1H_1}}{\\overline{O_2H_2}} = \\frac{\\overline{O_1C_1}}{\\overline{O_2C_2}} = \\tau = -\\frac{R_1}{R_2}' },
      distrattori: [
        { latex: '\\tau = \\dfrac{\\overline{O_1C}}{\\overline{O_2C}}', errore: 'segno', spiega: 'Un rapporto di lunghezze è positivo, ma τ ha segno: con C interno all\'interasse le ruote girano in versi opposti.', num: (v) => [v.tau, v.c / (v.i - v.c)] },
      ],
      num: (v) => [v.tau, -v.c / (v.i - v.c)],
    },
  ],
  risultato: { latex: '|\\tau| = \\dfrac{\\overline{O_1H_1}}{\\overline{O_2H_2}} = \\dfrac{\\overline{O_1C}}{\\overline{O_2C}},\\qquad \\tau = -\\dfrac{\\overline{O_1C}}{\\overline{O_2C}}', fonte: { tipo: 'dispensa', pag: [158, 160] }, correzione: { nf: 'NF-181', dispensaScrive: '\\frac{\\overline{O_1H_1}}{\\overline{O_2H_2}} = \\tau = -\\frac{R_1}{R_2}' } },
  gancio: 'Componenti normali uguali, poi due triangoli rettangoli con l\'angolo in C opposto al vertice.',
};

// ------------------------------------------------------------------ d074 legge fondamentale
export const d074: Dimostrazione = {
  id: 'd074',
  titolo: 'Legge fondamentale dell\'ingranamento',
  enunciato: 'Dimostrare che il rapporto di trasmissione è costante se e solo se la normale comune ai profili nel punto di contatto taglia l\'interasse sempre nello stesso punto C, e che la velocità di strisciamento è V^R₂,₁ = (ω₂ − ω₁)∧(P − C).',
  ipotesi: [
    'centri O₁ e O₂ fissi (centri assoluti)',
    'contatto senza compenetrazione né distacco (vale il risultato di d073)',
    'C = intersezione fra interasse e normale comune in P',
  ],
  sample: profiliGenerici,
  passi: [
    {
      id: 'd074.1',
      latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = -\\dfrac{\\overline{O_1C}}{\\overline{O_2C}}',
      perche: 'È il risultato dei triangoli simili (d073): il rapporto di trasmissione dipende solo da dove la normale comune taglia l\'interasse.',
      fonte: { tipo: 'dispensa', pag: [159, 160] },
      distrattori: [],
      num: (v) => [v.tau, -v.c / (v.i - v.c)],
    },
    {
      id: 'd074.2',
      latex: '\\tau = \\text{cost} \\iff \\dfrac{\\overline{O_1C}}{\\overline{O_2C}} = \\text{cost} \\iff C\\ \\text{fisso sull\'interasse}',
      perche: 'Con $O_1$ e $O_2$ fissi, il rapporto $\\overline{O_1C}/\\overline{O_2C}$ resta costante solo se C non si muove. Quindi i profili devono essere fatti in modo che, al variare del punto di contatto P, la normale comune passi sempre per lo stesso punto C dell\'interasse: è la legge dell\'ingranamento. C è il C.I.R. del moto relativo e il punto di rotolamento puro.',
      fonte: { tipo: 'dispensa', pag: [158, 159] },
      chiave: true,
      distrattori: [
        { latex: '\\tau = \\text{cost} \\iff \\text{la normale ha inclinazione costante}', errore: 'concetto', spiega: 'Basta che passi per C: con i profili cicloidali la normale cambia inclinazione ma τ resta costante. L\'inclinazione costante è un pregio in più dell\'evolvente.' },
        { latex: '\\tau = \\text{cost} \\iff P\\ \\text{fisso}', errore: 'concetto', spiega: 'Il punto di contatto P si sposta sempre, lungo la normale: è C, non P, che deve restare fermo.' },
      ],
    },
    {
      id: 'd074.3',
      latex: 'P \\equiv C:\\ V^{rel}_N = 0,\\ V^{rel}_{tg} = 0\\ (\\text{rotolamento});\\qquad P \\ne C:\\ V^{rel}_N = 0,\\ V^{rel}_{tg} \\ne 0\\ (\\text{strisciamento})',
      perche: 'Classificazione dei punti di contatto: nell\'urto entrambe le componenti relative sono diverse da zero; nel rotolamento sono nulle; nello strisciamento la normale è nulla (niente compenetrazione o distacco) e resta una componente tangente.',
      fonte: { tipo: 'dispensa', pag: 159 },
      distrattori: [],
    },
    {
      id: 'd074.4',
      latex: '\\underline{V}^R_{2,1} = \\underline{V_2} - \\underline{V_1} = \\underline{\\omega_2}\\wedge(P - C) + \\underline{\\omega_2}\\wedge(C - O_2) - \\underline{\\omega_1}\\wedge(P - C) - \\underline{\\omega_1}\\wedge(C - O_1)',
      perche: 'Velocità relativa nel contatto ($V_1$ è la velocità di trascinamento): si scrivono $V_i = \\omega_i \\wedge (P - O_i)$ e si somma e sottrae C dentro le parentesi, $P - O_i = (P - C) + (C - O_i)$.',
      fonte: { tipo: 'dispensa', pag: 160 },
      distrattori: [],
      num: (v) => [v.Vr0, v.somma0],
    },
    {
      id: 'd074.5',
      latex: '\\underline{\\omega_2}\\wedge(C - O_2) = \\underline{\\omega_1}\\wedge(C - O_1) \\;\\Rightarrow\\; \\underline{V}^R_{2,1} = (\\underline{\\omega_2} - \\underline{\\omega_1})\\wedge(P - C)',
      perche: 'I due termini con $C - O_i$ sono le velocità di C come punto delle due ruote: sono uguali perché C è punto di puro rotolamento ($\\omega_1 \\overline{O_1C} = -\\omega_2 \\overline{O_2C}$), quindi si elidono. Resta una rotazione relativa $\\omega_2 - \\omega_1$ attorno a C.',
      fonte: { tipo: 'dispensa', pag: 160 },
      chiave: true,
      distrattori: [
        { latex: '\\underline{V}^R_{2,1} = (\\underline{\\omega_2} + \\underline{\\omega_1})\\wedge(P - C)', errore: 'segno', spiega: 'La velocità angolare relativa è la differenza ω₂ − ω₁ (moto relativo di 2 rispetto a 1). Il modulo |ω₁| + |ω₂| nasce dai versi opposti, non da una somma vettoriale.', num: (v) => [v.Vr1, v.relPiu1] },
        { latex: '\\underline{V}^R_{2,1} = (\\underline{\\omega_2} - \\underline{\\omega_1})\\wedge(P - O_1)', errore: 'indice', spiega: 'Il polo del moto relativo è C, il C.I.R. relativo, non il centro O₁.', num: (v) => [v.Vr1, v.relO1] },
      ],
      num: (v) => [v.Vr1, v.rel1],
    },
    {
      id: 'd074.6',
      latex: '|\\underline{V}^R_{2,1}| = |\\omega_2 - \\omega_1|\\,\\overline{PC}',
      perche: 'Il prodotto vettoriale di un vettore lungo k per $P - C$ nel piano ha modulo uguale al prodotto dei moduli. La velocità di strisciamento cresce con la distanza di P da C: conviene che il contatto avvenga vicino a C, per ridurre le perdite.',
      fonte: { tipo: 'dispensa', pag: 160 },
      distrattori: [],
      num: (v) => [v.Vrn, Math.abs(v.w2 - v.w1) * Math.abs(v.s)],
    },
  ],
  risultato: { latex: '\\tau = -\\dfrac{\\overline{O_1C}}{\\overline{O_2C}} = \\text{cost} \\iff C\\ \\text{fisso};\\qquad \\underline{V}^R_{2,1} = (\\underline{\\omega_2} - \\underline{\\omega_1})\\wedge(P - C)', fonte: { tipo: 'dispensa', pag: [158, 160] } },
  gancio: 'La normale comune deve passare sempre per C: lì si rotola, altrove si striscia in proporzione a PC.',
};

// ------------------------------------------------------------------ d075 evolvente
export const d075: Dimostrazione = {
  id: 'd075',
  titolo: 'Evolvente: la normale comune è fissa',
  enunciato: 'Mostrare che il profilo a evolvente di circonferenza soddisfa la legge dell\'ingranamento con una normale comune fissa (la retta di pressione), che τ = −R_f1/R_f2 e che τ non cambia se cambia l\'interasse.',
  ipotesi: [
    'evolvente generata da una retta che rotola senza strisciare sulla circonferenza fondamentale (raggio R_f)',
    'due ruote con profili a evolvente in contatto in P; assi fissi',
    'contatto liscio e regime (η = 1) per il ricavo con le coppie',
  ],
  sample: (rnd) => {
    const Rf1 = U(rnd, 0.03, 0.15), Rf2 = U(rnd, 0.03, 0.15), th = U(rnd, 14, 25) * DEG, g = U(rnd, 0.1, 1.2);
    const i = (Rf1 + Rf2) / Math.cos(th);
    const R1 = (i * Rf1) / (Rf1 + Rf2), R2 = (i * Rf2) / (Rf1 + Rf2); // C divide l'interasse come le fondamentali
    const E = evolvente(Rf1, g);
    const C1 = U(rnd, 5, 200), F = C1 / Rf1, C2 = F * Rf2, w1 = U(rnd, 5, 100), w2 = (-w1 * C1) / C2;
    const i2 = i * U(rnd, 1.01, 1.08);
    const iv = interasseVariato({ Rf1, Rf2, i: i2 });
    return {
      Rf1, Rf2, th, g, i, R1, R2, C1, C2, w1, w2, i2, R1p: iv.R1, R2p: iv.R2, cth2: Math.cos(iv.theta),
      PQ: E.PQ, dPPQ: E.dP[0] * (E.P[0] - E.Q[0]) + E.dP[1] * (E.P[1] - E.Q[1]), dPP: E.dP[0] * E.P[0] + E.dP[1] * E.P[1],
    };
  },
  passi: [
    {
      id: 'd075.1',
      latex: 'P = Q + R_f\\gamma\\,\\underline{t}_Q, \\qquad \\overline{PQ} = \\overset{\\frown}{HQ} = R_f\\gamma',
      perche: 'Generazione: una retta rotola senza strisciare sulla fondamentale partendo dal contatto in H; un «pennino» solidale alla retta, inizialmente in H, traccia l\'evolvente. Senza strisciamento il tratto di retta svolto è uguale all\'arco percorso dal contatto: $\\overline{PQ} = R_f\\gamma$.',
      fonte: { tipo: 'dispensa', pag: [158, 161], fig: 'Fig. 5-23' },
      distrattori: [],
      num: (v) => [v.PQ, v.Rf1 * v.g],
      visual: { kind: 'meccanismo', id: 'c5a-evolvente' },
    },
    {
      id: 'd075.2',
      latex: '\\dfrac{dP}{d\\gamma} = R_f\\gamma\\,(\\cos\\gamma,\\ \\sin\\gamma) \\;\\perp\\; (P - Q) \\;\\Rightarrow\\; (\\underline{dP}\\cdot(P - Q)) = 0',
      perche: 'La retta generatrice ruota attorno al punto di tangenza Q, che è il suo C.I.R.: la velocità del pennino è perpendicolare a QP. Quindi la normale all\'evolvente in P è proprio la retta generatrice, tangente in Q alla fondamentale.',
      fonte: { tipo: 'dispensa', pag: [158, 161] },
      chiave: true,
      distrattori: [
        { latex: '\\text{la normale all\'evolvente in } P \\text{ passa per il centro } O', errore: 'concetto', spiega: 'Passa per O la normale alla circonferenza; quella dell\'evolvente è tangente alla fondamentale in Q.', num: (v) => [v.dPP, 0] },
        { latex: '\\text{le normali all\'evolvente passano tutte per un punto fisso}', errore: 'concetto', spiega: 'Per una sola evolvente le normali sono tutte tangenti alla fondamentale, in punti Q diversi (NF-25). Il punto fisso C compare solo con due ruote in presa.' },
      ],
      num: (v) => [v.dPPQ, 0],
      visual: { kind: 'meccanismo', id: 'c5a-evolvente' },
    },
    {
      id: 'd075.3',
      latex: '\\underline{n}_{P}\\ \\text{tangente a } \\mathcal{C}_{f1} \\text{ e a } \\mathcal{C}_{f2} \\;\\Rightarrow\\; \\underline{n}_P \\equiv I_1I_2\\ (H_1H_2)\\ \\text{fissa} \\;\\Rightarrow\\; C\\ \\text{fisso}',
      perche: 'In P i due denti hanno la normale in comune; per la proprietà appena vista essa è tangente a entrambe le fondamentali, quindi è la tangente comune $I_1I_2$. Questa retta non dipende dalla posizione delle ruote: P si sposta lungo di essa, e la sua intersezione C con l\'interasse è fissa. È la retta di pressione, direzione della forza fra i denti.',
      fonte: { tipo: 'dispensa', pag: 162, fig: 'Fig. 5-24' },
      chiave: true,
      correzione: { nf: 'NF-25', dispensaScrive: '\\text{«la normale all\'evolvente passa sempre per un punto fisso (c.i.r.)»}' },
      distrattori: [
        { latex: '\\underline{n}_P \\equiv O_1O_2', errore: 'concetto', spiega: 'La congiungente dei centri è l\'interasse: la normale comune lo taglia in C con l\'angolo di pressione θ.' },
        { latex: '\\underline{n}_P\\ \\text{tangente alle primitive in } C', errore: 'concetto', spiega: 'La tangente alle primitive in C è la perpendicolare all\'interasse; la retta di pressione è inclinata di θ rispetto a essa ed è tangente alle fondamentali.' },
      ],
    },
    {
      id: 'd075.4',
      latex: 'R_{f1} = \\overline{O_1H_1} = R_1\\cos\\theta, \\qquad R_{f2} = R_2\\cos\\theta',
      perche: 'Triangolo $O_1H_1C$: rettangolo in $H_1$, ipotenusa $\\overline{O_1C} = R_1$, angolo θ in $O_1$ (uguale all\'angolo fra la retta di pressione e la verticale per C, lati perpendicolari). θ è l\'angolo di pressione.',
      fonte: { tipo: 'dispensa', pag: [162, 166] },
      distrattori: [
        { latex: 'R_{f1} = R_1\\sin\\theta', errore: 'concetto', spiega: 'R₁ sin θ è il cateto CH₁ lungo la retta di pressione; il raggio fondamentale è il cateto adiacente all\'angolo in O₁.', num: (v) => [v.Rf1, v.R1 * Math.sin(v.th)] },
      ],
      num: (v) => [v.Rf1, v.R1 * Math.cos(v.th)],
    },
    {
      id: 'd075.5',
      latex: 'C_1 = F_{2,1}R_{f1},\\ \\ C_2 = F_{2,1}R_{f2},\\ \\ C_1\\omega_1 + C_2\\omega_2 = 0 \\;\\Rightarrow\\; \\tau = -\\dfrac{C_1}{C_2} = -\\dfrac{R_{f1}}{R_{f2}}',
      perche: 'Equilibrio alla rotazione di ciascuna ruota (II equazione cardinale): la forza fra i denti è lungo la retta di pressione, con braccio uguale al raggio fondamentale. Con la T.F.V. in regime ($\\eta = 1$) il rapporto delle coppie dà τ.',
      fonte: { tipo: 'dispensa', pag: 162 },
      chiave: true,
      distrattori: [
        { latex: '\\tau = -\\dfrac{R_{f2}}{R_{f1}}', errore: 'indice', spiega: 'τ = −C₁/C₂ e le coppie stanno come i raggi fondamentali: R_f1 al numeratore.', num: (v) => [v.w2 / v.w1, -v.Rf2 / v.Rf1] },
        { latex: '\\tau = -\\dfrac{R_{f1}}{R_{f2}}\\cos\\theta', errore: 'fattore', spiega: 'Il cos θ è lo stesso per le due ruote e si semplifica: τ = −R_f1/R_f2 = −R₁/R₂.', num: (v) => [v.w2 / v.w1, (-v.Rf1 / v.Rf2) * Math.cos(v.th)] },
      ],
      num: (v) => [v.w2 / v.w1, -v.Rf1 / v.Rf2],
    },
    {
      id: 'd075.6',
      latex: '\\tau = -\\dfrac{\\overline{O_1C}}{\\overline{O_2C}} = -\\dfrac{R_{f1}/\\cos\\theta}{R_{f2}/\\cos\\theta} = -\\dfrac{R_{f1}}{R_{f2}}',
      perche: 'Stesso risultato dai triangoli simili: le ipotenuse $\\overline{O_iC}$ valgono $R_{fi}/\\cos\\theta$.',
      fonte: { tipo: 'dispensa', pag: 162 },
      distrattori: [],
      num: (v) => [-v.R1 / v.R2, -v.Rf1 / v.Rf2],
    },
    {
      id: 'd075.7',
      latex: "i' \\ne i:\\quad \\cos\\theta' = \\dfrac{R_{f1} + R_{f2}}{i'},\\quad R_1' = \\dfrac{R_{f1}}{\\cos\\theta'} \\;\\Rightarrow\\; \\tau' = -\\dfrac{R_1'}{R_2'} = -\\dfrac{R_{f1}}{R_{f2}} = \\tau",
      perche: 'Se si cambia l\'interasse (montaggio, usura) le fondamentali non cambiano, perché sono una proprietà della ruota tagliata: cambiano i raggi primitivi e l\'angolo di pressione, ma non il loro rapporto. È un pregio dell\'evolvente: τ è insensibile agli errori d\'interasse.',
      fonte: { tipo: 'dispensa', pag: 162 },
      chiave: true,
      distrattori: [
        { latex: "\\cos\\theta' = \\cos\\theta", errore: 'concetto', spiega: 'L\'angolo di pressione cambia: la tangente comune alle fondamentali si inclina diversamente quando i centri si allontanano.', num: (v) => [v.cth2, (v.Rf1 + v.Rf2) / v.i] },
        { latex: "\\tau' = -\\dfrac{R_1}{R_2}\\,\\dfrac{i'}{i}", errore: 'concetto', spiega: 'I primitivi crescono entrambi nella stessa proporzione: il loro rapporto resta R_f1/R_f2.', num: (v) => [-v.R1p / v.R2p, (-v.R1 / v.R2) * (v.i2 / v.i)] },
      ],
      num: (v) => [-v.R1p / v.R2p, -v.Rf1 / v.Rf2],
    },
  ],
  risultato: { latex: '\\text{evolvente} \\Rightarrow \\text{normale comune fissa } H_1H_2 \\Rightarrow \\tau = -\\dfrac{R_{f1}}{R_{f2}} = -\\dfrac{R_1}{R_2}\\ \\text{costante, anche se cambia l\'interasse}', fonte: { tipo: 'dispensa', pag: [161, 162] } },
  gancio: 'La retta che svolge l\'evolvente è la sua normale: con due ruote è la tangente comune alle fondamentali, ferma.',
};

// ------------------------------------------------------------------ d076 passo e modulo
export const d076: Dimostrazione = {
  id: 'd076',
  titolo: 'Passo, modulo e proporzionamento modulare',
  enunciato: 'Ricavare dalla definizione di passo la relazione m z = 2R e le dimensioni del dente nel proporzionamento modulare.',
  ipotesi: ['z denti uguali sulla primitiva; profili omologhi equidistanti', 'proporzionamento modulare (a = m, d = 5/4 m)'],
  sample: (rnd) => {
    const m = U(rnd, 1, 8), z = zInt(rnd, 12, 80), th = U(rnd, 14, 25) * DEG;
    const R = (m * z) / 2, p = (2 * Math.PI * R) / z, a = m, d = 1.25 * m, zs = 5 / (2 * (1 - Math.cos(th)));
    return { m, z, th, R, p, a, d, zs };
  },
  passi: [
    {
      id: 'd076.1',
      latex: 'p\\,z = 2\\pi R',
      perche: 'Il passo p è l\'arco di primitiva fra due profili omologhi successivi: z passi fanno tutta la circonferenza primitiva.',
      fonte: { tipo: 'dispensa', pag: 163 },
      distrattori: [],
      num: (v) => [v.p * v.z, 2 * Math.PI * v.R],
    },
    {
      id: 'd076.2',
      latex: 'p_1 = p_2',
      perche: 'Due ruote ingranano solo se hanno lo stesso passo: ogni pieno (dente) di una entra nel vuoto (vano) dell\'altra, e le primitive rotolano senza strisciare, quindi in un passo di 1 deve passare un passo di 2.',
      fonte: { tipo: 'dispensa', pag: 163 },
      chiave: true,
      distrattori: [
        { latex: 'z_1 = z_2', errore: 'concetto', spiega: 'Il numero di denti può essere diverso: è proprio quello che fa il rapporto di trasmissione. Deve coincidere il passo.' },
        { latex: 'R_1 = R_2', errore: 'concetto', spiega: 'Raggi diversi danno τ ≠ −1; la compatibilità richiede lo stesso passo (cioè lo stesso modulo).' },
      ],
    },
    {
      id: 'd076.3',
      latex: 'm = \\dfrac{p}{\\pi}',
      perche: 'Definizione di modulo: il passo diviso π. Si sceglie m (razionale, unificato) invece di p, che conterrebbe sempre π.',
      fonte: { tipo: 'dispensa', pag: 165 },
      distrattori: [],
      num: (v) => [v.m, v.p / Math.PI],
    },
    {
      id: 'd076.4',
      latex: 'm\\,z = 2R \\;\\Rightarrow\\; R = \\dfrac{m z}{2}',
      perche: 'Si sostituisce $p = \\pi m$ in $p z = 2\\pi R$ e si semplifica π: il diametro primitivo è modulo per numero di denti.',
      fonte: { tipo: 'dispensa', pag: 165 },
      chiave: true,
      distrattori: [
        { latex: 'R = m z', errore: 'fattore', spiega: 'm z è il diametro primitivo 2R, non il raggio.', num: (v) => [v.R, v.m * v.z] },
        { latex: 'R = \\dfrac{\\pi m z}{2}', errore: 'fattore', spiega: 'Il π si semplifica: è proprio il motivo per cui si introduce il modulo.', num: (v) => [v.R, (Math.PI * v.m * v.z) / 2] },
      ],
      num: (v) => [v.m * v.z, 2 * v.R],
    },
    {
      id: 'd076.5',
      latex: 'a = m,\\quad d = \\tfrac{5}{4}m \\;\\Rightarrow\\; h = a + d = \\tfrac{9}{4}m',
      perche: 'Proporzionamento modulare: addendum (primitiva → testa) uguale al modulo, dedendum (primitiva → fondo) un quarto in più, perché la testa del dente coniugato non tocchi il fondo. L\'altezza non può superare un certo limite, altrimenti si ha interferenza.',
      fonte: { tipo: 'dispensa', pag: 165 },
      distrattori: [
        { latex: 'h = 2m', errore: 'fattore', spiega: 'Addendum e dedendum non sono uguali: d = 5/4 m lascia il gioco di fondo, quindi h = 9/4 m.', num: (v) => [v.a + v.d, 2 * v.m] },
      ],
      num: (v) => [v.a + v.d, (9 * v.m) / 4],
    },
    {
      id: 'd076.6',
      latex: 'R_t = R + a = \\dfrac{m(z + 2)}{2}, \\qquad R_{fondo} = R - d = \\dfrac{m(z - 2{,}5)}{2}',
      perche: 'Raggi di troncatura di testa e di fondo in funzione di z e m, sommando o togliendo addendum e dedendum al raggio primitivo.',
      fonte: { tipo: 'deduzione', da: 'p. 165 (a = m, d = 5/4 m) e R = mz/2', spiegazione: 'somma e differenza dei raggi con addendum e dedendum' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.R + v.a, (v.m * (v.z + 2)) / 2],
    },
    {
      id: 'd076.7',
      latex: 'R - \\tfrac{5}{4}m = R\\cos\\theta \\iff z^* = \\dfrac{5}{2(1 - \\cos\\theta)}\\ \\ (\\approx 41{,}4 \\text{ per } \\theta = 20^\\circ)',
      perche: 'Per $z < z^*$ il fondo è sotto la fondamentale: la parte di fianco interna alla fondamentale non è più evolvente e non può trasmettere forza (la dispensa lo nota a p. 165). Con 20° succede quasi sempre (z < 41).',
      fonte: { tipo: 'deduzione', da: 'p. 165 («il diametro di fondo può essere inferiore a quello della fondamentale»)', spiegazione: 'si uguagliano R − 5m/4 e R cos θ con R = mz/2 e si risolve in z' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [(v.m * v.zs) / 2 - 1.25 * v.m, ((v.m * v.zs) / 2) * Math.cos(v.th)],
    },
  ],
  risultato: { latex: 'p = \\pi m,\\qquad R = \\dfrac{m z}{2},\\qquad a = m,\\ d = \\tfrac54 m,\\ h = \\tfrac94 m', fonte: { tipo: 'dispensa', pag: [163, 165] } },
  gancio: 'z passi fanno la primitiva: p z = 2πR, e con p = πm il π sparisce: 2R = m z.',
};

// ------------------------------------------------------------------ d077 interasse
export const d077: Dimostrazione = {
  id: 'd077',
  titolo: 'Interasse di due ruote dentate',
  enunciato: 'Esprimere l\'interasse di due ruote in presa in funzione del modulo e dei numeri di denti, per ruote esterne e interne.',
  ipotesi: ['ruote con lo stesso modulo m, montate all\'interasse nominale (primitive tangenti in C)'],
  sample: (rnd) => {
    const m = U(rnd, 1, 8), z2 = zInt(rnd, 12, 40), z1 = z2 + zInt(rnd, 5, 60);
    const R1 = (m * z1) / 2, R2 = (m * z2) / 2, i = R1 + R2, ii = R1 - R2, tauAbs = R1 / R2;
    return { m, z1, z2, R1, R2, i, ii, tauAbs };
  },
  passi: [
    {
      id: 'd077.1',
      latex: '\\overline{O_1O_2} = i = R_1 + R_2',
      perche: 'Le circonferenze primitive sono tangenti esternamente in C, che sta sull\'interasse: la distanza dei centri è la somma dei raggi primitivi.',
      fonte: { tipo: 'dispensa', pag: 167 },
      distrattori: [],
      num: (v) => [v.i, v.R1 + v.R2],
    },
    {
      id: 'd077.2',
      latex: 'R_1 = \\dfrac{m z_1}{2},\\qquad R_2 = \\dfrac{m z_2}{2}\\quad (\\text{stesso } m)',
      perche: 'Le due ruote devono avere lo stesso passo, quindi lo stesso modulo; ciascun raggio primitivo è $mz/2$.',
      fonte: { tipo: 'dispensa', pag: [163, 165] },
      chiave: true,
      distrattori: [
        { latex: 'R_1 = m z_1', errore: 'fattore', spiega: 'm z è il diametro primitivo.', num: (v) => [v.R1, v.m * v.z1] },
        { latex: 'R_1 = \\dfrac{m_1 z_1}{2},\\ R_2 = \\dfrac{m_2 z_2}{2},\\ m_1 \\ne m_2', errore: 'concetto', spiega: 'Con moduli diversi i passi sono diversi e le ruote non ingranano.' },
      ],
      num: (v) => [v.R1, (v.m * v.z1) / 2],
    },
    {
      id: 'd077.3',
      latex: 'i = \\dfrac{m\\,(z_1 + z_2)}{2}',
      perche: 'Si sommano i due raggi primitivi: l\'interasse è metà modulo per la somma dei denti. Con il modulo unificato l\'interasse non è libero: è fissato da m e dai denti.',
      fonte: { tipo: 'deduzione', da: 'p. 167 (i = R₁ + R₂) e p. 165 (R = mz/2)', spiegazione: 'sostituzione dei raggi primitivi nell\'interasse' },
      aggiunto: true,
      distrattori: [
        { latex: 'i = m\\,(z_1 + z_2)', errore: 'fattore', spiega: 'È la somma dei diametri: l\'interasse è la somma dei raggi.', num: (v) => [v.i, v.m * (v.z1 + v.z2)] },
      ],
      num: (v) => [v.i, (v.m * (v.z1 + v.z2)) / 2],
    },
    {
      id: 'd077.4',
      latex: '|\\tau| = \\dfrac{R_1}{R_2} \\;\\Rightarrow\\; R_1 = \\dfrac{i\\,|\\tau|}{1 + |\\tau|},\\qquad R_2 = \\dfrac{i}{1 + |\\tau|}',
      perche: 'Dati interasse e rapporto, i raggi primitivi sono fissati: si risolve il sistema $R_1 + R_2 = i$, $R_1 = |\\tau| R_2$. Serve negli esercizi di progetto.',
      fonte: { tipo: 'deduzione', da: 'p. 167 (i = R₁ + R₂) e p. 166 (|τ| = R₁/R₂)', spiegazione: 'sistema lineare nei due raggi' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.R1, (v.i * v.tauAbs) / (1 + v.tauAbs)],
    },
    {
      id: 'd077.5',
      latex: '\\text{ruote interne: } i = R_1 - R_2 = \\dfrac{m\\,(z_1 - z_2)}{2}',
      perche: 'Con la corona (dentatura interna, ruota 1) la primitiva piccola è tangente internamente: i centri stanno dalla stessa parte di C e l\'interasse è la differenza dei raggi.',
      fonte: { tipo: 'deduzione', da: 'p. 172 (primitiva piccola tangente internamente alla grande)', spiegazione: 'stessa costruzione dell\'interasse con C esterno al segmento O₁O₂' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.ii, (v.m * (v.z1 - v.z2)) / 2],
    },
  ],
  risultato: { latex: 'i = \\dfrac{m(z_1 + z_2)}{2}\\ (\\text{esterne}),\\qquad i = \\dfrac{m(z_1 - z_2)}{2}\\ (\\text{interne})', fonte: { tipo: 'deduzione', da: 'p. 167 e p. 165', spiegazione: 'i = R₁ ± R₂ con R = mz/2 (la forma esplicita non è scritta nella dispensa)' } },
  gancio: 'Interasse = somma dei raggi primitivi = metà modulo per la somma dei denti.',
};

// ------------------------------------------------------------------ d078 τ con i denti
export const d078: Dimostrazione = {
  id: 'd078',
  titolo: 'Rapporto di trasmissione con i numeri di denti',
  enunciato: 'Dimostrare che per due ruote dentate in presa τ = −z₁/z₂ (esterne) e τ = +z₁/z₂ (interne), e che il pignone–dentiera ha τ = 0.',
  ipotesi: ['stesso modulo m (stesso passo)', 'stesso angolo di pressione θ', 'primitive che rotolano senza strisciare in C'],
  sample: (rnd) => {
    const m = U(rnd, 1, 8), z1 = zInt(rnd, 12, 90), z2 = zInt(rnd, 12, 90), th = U(rnd, 14, 25) * DEG, w1 = U(rnd, 5, 300);
    const R1 = (m * z1) / 2, R2 = (m * z2) / 2;
    const w2 = (-w1 * R1) / R2; // contatto esterno: ω₁R₁ = −ω₂R₂
    const w2i = (w1 * R1) / R2; // contatto interno: C dalla stessa parte dei due centri
    return { m, z1, z2, th, w1, w2, w2i, R1, R2, Rf1: R1 * Math.cos(th), Rf2: R2 * Math.cos(th) };
  },
  passi: [
    {
      id: 'd078.1',
      latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = -\\dfrac{R_1}{R_2}',
      perche: 'Dal punto di vista cinematico due ruote dentate si comportano come due ruote di frizione con i raggi primitivi $R_1 = \\overline{O_1C}$ e $R_2 = \\overline{O_2C}$.',
      fonte: { tipo: 'dispensa', pag: [162, 166] },
      distrattori: [],
      num: (v) => [v.w2 / v.w1, -v.R1 / v.R2],
    },
    {
      id: 'd078.2',
      latex: '-\\dfrac{R_1}{R_2} = -\\dfrac{R_{f1}}{R_{f2}}',
      perche: 'I raggi fondamentali sono $R_{fi} = R_i\\cos\\theta$ con lo stesso θ: il rapporto non cambia.',
      fonte: { tipo: 'dispensa', pag: 166 },
      distrattori: [],
      num: (v) => [-v.R1 / v.R2, -v.Rf1 / v.Rf2],
    },
    {
      id: 'd078.3',
      latex: '\\tau = -\\dfrac{m z_1/2}{m z_2/2} = -\\dfrac{z_1}{z_2}',
      perche: 'Con lo stesso modulo $R_i = m z_i/2$: m e 1/2 si semplificano. Il rapporto dipende solo dai numeri di denti, interi: è esattamente costante.',
      fonte: { tipo: 'dispensa', pag: [163, 166] },
      chiave: true,
      correzione: { nf: 'NF-25', dispensaScrive: '\\tau = \\frac{\\omega_2}{\\omega_1} = -\\frac{R_1}{R_2} = \\frac{z_1}{z_2}\\ \\ (\\text{p. 163})' },
      distrattori: [
        { latex: '\\tau = -\\dfrac{z_2}{z_1}', errore: 'convenzione', spiega: 'È i = ω₁/ω₂ delle fonti derivate (NF-09). Con τ = uscita/entrata la ruota motrice sta al numeratore.', num: (v) => [v.w2 / v.w1, -v.z2 / v.z1] },
        { latex: '\\tau = \\dfrac{z_1}{z_2}', errore: 'segno', spiega: 'È la riga di p. 163 (NF-25): per ruote esterne il segno meno non si perde.', num: (v) => [v.w2 / v.w1, v.z1 / v.z2] },
      ],
      num: (v) => [v.w2 / v.w1, -v.z1 / v.z2],
    },
    {
      id: 'd078.4',
      latex: '\\text{ruote interne: } \\omega_1 R_1 = \\omega_2 R_2 \\;\\Rightarrow\\; \\tau = +\\dfrac{z_1}{z_2} > 0',
      perche: 'Con una corona a dentatura interna C sta dalla stessa parte dei due centri: le velocità periferiche concordi danno ω concordi, quindi τ positivo.',
      fonte: { tipo: 'dispensa', pag: [164, 172] },
      distrattori: [],
      num: (v) => [v.w2i / v.w1, v.z1 / v.z2],
    },
    {
      id: 'd078.5',
      latex: 'R_2 \\to \\infty\\ (\\rho = 1/R_2 \\to 0) \\;\\Rightarrow\\; \\tau = -\\dfrac{R_1}{R_2} \\to 0',
      perche: 'Pignone–dentiera: la primitiva della ruota 2 si appiattisce in una retta, la dentiera trasla e non ruota ($\\omega_2 = 0$), mentre il pignone gira. È l\'ingranaggio con τ = 0.',
      fonte: { tipo: 'dispensa', pag: 164 },
      distrattori: [],
    },
  ],
  risultato: { latex: '\\tau = \\dfrac{\\omega_2}{\\omega_1} = -\\dfrac{R_1}{R_2} = -\\dfrac{R_{f1}}{R_{f2}} = -\\dfrac{z_1}{z_2}\\ (\\text{esterne}),\\qquad \\tau = +\\dfrac{z_1}{z_2}\\ (\\text{interne})', fonte: { tipo: 'dispensa', pag: [166, 172] } },
  gancio: 'Stesso modulo ⇒ i raggi stanno come i denti: τ = −z₁/z₂, il segno dice il verso.',
};

// ------------------------------------------------------------------ argomento
export const ruoteDentate: ArgomentoContenuto = {
  id: 'c5-ruote-dentate',
  cosaDireSubito:
    'Parto dalle ruote di frizione: due cilindri che rotolano senza strisciare danno τ = ω₂/ω₁ = −R₁/R₂, ma la coppia trasmissibile è limitata dall\'aderenza, f F_N R. Le ruote dentate affidano la coppia alla forza normale fra i denti; τ resta costante solo se la normale comune ai profili taglia l\'interasse sempre nello stesso punto C. Il profilo a evolvente lo garantisce: la normale comune è la tangente alle due fondamentali, una retta fissa, e τ = −R₁/R₂ = −z₁/z₂.',
  sistemaIpotesi: [
    'Sistema: due ruote con centri fissi O₁ e O₂, interasse i; verso positivo comune per le ω (asse k).',
    'Ruote di frizione: aderenza F_t ≤ f F_N, rotolamento puro in C.',
    'Ruote dentate: contatto senza compenetrazione né distacco (componenti normali uguali), strisciamento ammesso.',
    'Profili a evolvente generati sulle fondamentali R_f = R cos θ; stesso modulo m per le due ruote.',
    'Per le coppie: regime e contatto liscio (η = 1).',
  ],
  disegno: {
    svg: figIngranaggio({ simili: true, contatto: 'P', titolo: 'Due ruote a evolvente: primitive, fondamentali, retta di pressione per C' }),
    didascalia: 'Ruote esterne: primitive (tratteggiate) tangenti in C, fondamentali, retta di pressione tangente in H₁ e H₂, angolo di pressione θ, triangoli simili O₁H₁C e O₂H₂C (pp. 159, 162, 166).',
    fonte: { tipo: 'dispensa', pag: [159, 166], fig: 'Fig. 5-24 e schizzi manoscritti' },
    elementi: [
      { id: 'interasse', testo: 'centri O₁ e O₂ sull\'interasse orizzontale', obbligatorio: true },
      { id: 'primitive', testo: 'circonferenze primitive R₁, R₂ tangenti in C', obbligatorio: true },
      { id: 'fondamentali', testo: 'circonferenze fondamentali R_f1, R_f2 (interne alle primitive)', obbligatorio: true },
      { id: 'retta', testo: 'retta di pressione per C, tangente alle fondamentali in H₁ e H₂ (angoli retti)', obbligatorio: true },
      { id: 'theta', testo: 'angolo di pressione θ (tra la verticale per C e la retta; uguale in O₁ e O₂)', obbligatorio: true },
      { id: 'P', testo: 'punto di contatto P sulla retta di pressione', obbligatorio: true },
      { id: 'omega', testo: 'versi ω₁ e ω₂ opposti (τ < 0)', obbligatorio: true },
      { id: 'evolvente', testo: 'a parte: costruzione dell\'evolvente (retta che rotola sulla fondamentale, PQ normale)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\underline{V_1}\\cdot\\underline{n} = \\underline{V_2}\\cdot\\underline{n} \\;\\Rightarrow\\; |\\tau| = \\dfrac{\\overline{O_1H_1}}{\\overline{O_2H_2}} = \\dfrac{\\overline{O_1C}}{\\overline{O_2C}}',
    spiegazione: 'Componenti normali delle velocità uguali nel contatto, poi i triangoli simili: τ dipende solo da dove la normale comune taglia l\'interasse. Per le ruote di frizione la partenza è V_C|₁ = V_C|₂.',
    fonte: { tipo: 'dispensa', pag: [158, 159] },
  },
  dimostrazioni: ['d072', 'd073', 'd074', 'd075', 'd076', 'd077', 'd078'],
  significato:
    'Il rapporto di trasmissione di un ingranaggio è una proprietà geometrica: dipende solo dal punto C in cui la normale comune taglia l\'interasse. L\'evolvente rende questa normale una retta fissa, la retta di pressione, lungo la quale si scambia sempre la forza: τ = −z₁/z₂ è esattamente costante, non dipende dalla potenza, e non cambia nemmeno se l\'interasse è un po\' diverso dal nominale.',
  fraseDaRicordare: 'La normale comune deve passare sempre per C; con l\'evolvente è la tangente comune alle fondamentali, e τ = −R_f1/R_f2 = −z₁/z₂.',
  daNonDire: [
    { frase: 'La normale a un\'evolvente passa sempre per un punto fisso.', perche: 'Le normali di una sola evolvente sono tangenti alla fondamentale in punti diversi; la normale fissa è quella comune a due ruote in presa (NF-25).', fonte: { tipo: 'dispensa', pag: 161 } },
    { frase: 'τ = z₁/z₂ (senza segno) oppure τ = z₂/z₁.', perche: 'Nella dispensa τ = ω_uscita/ω_entrata con segno: −z₁/z₂ per ruote esterne (NF-09, NF-25).', fonte: { tipo: 'dispensa', pag: [163, 166] } },
    { frase: 'Nel punto di contatto le velocità dei due denti sono uguali.', perche: 'Sono uguali solo le componenti normali; quelle tangenti differiscono (strisciamento), tranne in C.', fonte: { tipo: 'dispensa', pag: [158, 159] } },
    { frase: 'Il punto primitivo è P.', perche: 'Nella dispensa C è il punto primitivo (C.I.R. del moto relativo) e P il punto di contatto, che si muove; le fonti derivate usano P per il primitivo (NF-11).', fonte: { tipo: 'dispensa', pag: [159, 162] } },
    { frase: 'Con i profili cicloidali il rapporto di trasmissione non è costante.', perche: 'Anche i profili cicloidali rispettano la legge dell\'ingranamento; cambia l\'inclinazione della normale, non τ (NF-187).', fonte: { tipo: 'dispensa', pag: 159 } },
  ],
  approfondimenti: [
    { domanda: 'Perché non bastano le ruote di frizione?', tipo: 'approfondimento', attesa: 'La coppia passa per la forza d\'aderenza, che non supera f F_N: |C^max| = f|F_N|R. Oltre, le ruote strisciano e τ non è più garantito; per grandi potenze servirebbero forze di serraggio enormi. I denti trasmettono la coppia con la forza normale.', fonte: { tipo: 'dispensa', pag: [156, 157] } },
    { domanda: 'Che cosa succede se la normale comune oscilla attorno a C?', tipo: 'approfondimento', attesa: 'τ varia durante l\'ingranamento e la forza cambia direzione: nascono rumore e sollecitazioni dinamiche, quindi usura precoce o rottura a fatica dei denti. Può succedere per errori di lavorazione o deformazioni sotto carico.', fonte: { tipo: 'dispensa', pag: 159 } },
    { domanda: 'Se monto le ruote a un interasse un po\' maggiore, cosa cambia?', tipo: 'approfondimento', attesa: 'Le fondamentali sono fisse, quindi τ = −R_f1/R_f2 non cambia; cambiano i raggi primitivi (crescono nella stessa proporzione) e l\'angolo di pressione: cos θ\' = (R_f1 + R_f2)/i\'.', fonte: { tipo: 'dispensa', pag: 162 } },
    { domanda: 'Qual è l\'ingranaggio con τ = 0?', tipo: 'approfondimento', attesa: 'Pignone e dentiera: con R₂ → ∞ la primitiva della dentiera diventa una retta, la dentiera trasla con velocità ω₁R₁ e non ruota, quindi τ = −R₁/R₂ → 0.', fonte: { tipo: 'dispensa', pag: 164 } },
    { domanda: 'Dove avviene lo strisciamento fra i denti e quanto vale?', tipo: 'collegamento', argomento: 'c5-forze-dritti', attesa: 'In C è nullo (rotolamento puro); altrove V^R₂,₁ = (ω₂ − ω₁)∧(P − C), di modulo (|ω₁| + |ω₂|)·CP: cresce allontanandosi da C ed è la causa delle perdite per attrito.', fonte: { tipo: 'dispensa', pag: [160, 170] } },
    { domanda: 'Quanti denti sono in presa contemporaneamente?', tipo: 'collegamento', argomento: 'c5-denti-presa', attesa: 'Il contatto corre sulla retta di pressione fra le teste, nel segmento AB; il numero di denti in presa è z_p = AB/(p cos θ), che deve essere almeno 1 per la continuità del moto.', fonte: { tipo: 'dispensa', pag: 166 } },
    { domanda: 'Come si scrive la velocità del punto di contatto? Da dove viene ω∧(P − O)?', tipo: 'collegamento', argomento: 'c1-velocita', attesa: 'Formula fondamentale dei moti rigidi V_P = V_O + ω∧(P − O); con O fisso resta ω∧(P − O), perpendicolare a OP e di modulo ω·OP.', fonte: { tipo: 'dispensa', pag: 158 } },
  ],
  simboli: [
    { simbolo: '\\tau = \\omega_2/\\omega_1', significato: 'rapporto di trasmissione uscita/entrata, con segno', altrove: 'i = ω₁/ω₂ (reciproco) in d072, d073, d078' },
    { simbolo: 'C', significato: 'punto primitivo: intersezione della normale comune con l\'interasse, C.I.R. del moto relativo', altrove: 'P «punto di passo» in d074 e q22' },
    { simbolo: 'P', significato: 'punto di contatto fra i profili (si muove sulla retta di pressione)' },
    { simbolo: 'R,\\ R_f', significato: 'raggio primitivo e raggio fondamentale (R_f = R cos θ)', altrove: 'r_p, r_b' },
    { simbolo: 'H_1,\\ H_2', significato: 'punti di tangenza della retta di pressione con le fondamentali', altrove: 'I₁, I₂ nella Fig. 5-24' },
    { simbolo: '\\theta', significato: 'angolo di pressione', altrove: 'ϑ nelle scansioni del libro, α nelle fonti derivate' },
    { simbolo: 'f', significato: 'coefficiente d\'aderenza delle ruote di frizione', altrove: 'μ in q22' },
    { simbolo: 'p,\\ m,\\ z', significato: 'passo, modulo (m = p/π), numero di denti' },
    { simbolo: 'a,\\ d,\\ i', significato: 'addendum, dedendum, interasse', altrove: 'a = interasse e d = diametro in d076, d077' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5a-evolvente' }, { kind: 'meccanismo', id: 'c5a-ingranamento' }],
  previsioni: [
    {
      id: 'c5a-interasse',
      domanda: 'Allontano i centri di due ruote a evolvente del 5 %. Il rapporto di trasmissione…',
      opzioni: ['cresce del 5 %', 'resta uguale', 'cala del 5 %', 'diventa variabile durante l\'ingranamento'],
      corretta: 1,
      spiega: 'τ = −R_f1/R_f2 dipende dalle fondamentali, che sono della ruota: cambiano solo i primitivi (nella stessa proporzione) e l\'angolo di pressione.',
      verify: () => {
        const a = interasseVariato({ Rf1: 0.05, Rf2: 0.02, i: 0.0745 }), b = interasseVariato({ Rf1: 0.05, Rf2: 0.02, i: 0.0745 * 1.05 });
        return Math.abs(a.tau - b.tau) < 1e-12 ? 1 : b.tau < a.tau ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5a-ingranamento' },
    },
    {
      id: 'c5a-evolvente-pq',
      domanda: 'La retta ha rotolato di un angolo γ sulla fondamentale. Il segmento PQ, dal pennino al punto di tangenza, rispetto all\'arco HQ è…',
      opzioni: ['più corto', 'uguale', 'più lungo'],
      corretta: 1,
      spiega: 'Rotolamento senza strisciamento: il tratto di retta svolto è uguale all\'arco percorso, PQ = R_f γ.',
      verify: () => {
        const e = evolvente(0.05, 0.9);
        return Math.abs(e.PQ - e.arcoHQ) < 1e-12 ? 1 : e.PQ < e.arcoHQ ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5a-evolvente' },
    },
  ],
  nf: ['NF-09', 'NF-11', 'NF-25', 'NF-181', 'NF-185', 'NF-186', 'NF-187'],
};
