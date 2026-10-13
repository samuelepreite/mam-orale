/**
 * C4 · Potenza trasmessa e velocità ottima (domande q15, q46). Dispensa pp. 143, 148, 152, 154 (manoscritto).
 * Modello principale: quello della dispensa, T₂ fissata dal rullo tenditore (p. 152). La variante delle domande
 * (T₁ = T_max) è dentro d070, nei passi 9–12, con fonte esterna dichiarata (NF-22). d068 non è nella dispensa (NF-07).
 */
import type { ArgomentoContenuto, Dimostrazione, Fonte } from '../types';
import { U } from '../../engine/num';
import { arrow, dot, line, poly, svg, text } from '../svg';
import { integraEulero, massimoAureo, potenzaCinghia } from '../../engine/c4';

const L = String.raw;
const D = (pag: number | [number, number]): Fonte => ({ tipo: 'dispensa', pag });
const VARIANTE: Fonte = {
  tipo: 'esterna',
  ref: 'trattazione classica della velocità ottima della cinghia con tensione massima ammissibile fissata (domande 15 e 46, dimostrazione 70)',
  nota: 'La dispensa fissa T₂ (p. 152). Fissando invece T₁ = T_max si ottiene ρV² = T_max/3: risultato corretto in quel modello ma assente dalla dispensa (NF-22, da chiedere al docente).',
};
const RESISTENZA: Fonte = {
  tipo: 'esterna',
  ref: 'verifica di resistenza a trazione della cinghia nel dimensionamento classico delle trasmissioni a cinghia',
  nota: 'La dispensa non tratta una tensione ammissibile né la verifica di resistenza (NF-07): a p. 143 la «tensione massima» è la T₁ necessaria per la coppia.',
};

// ------------------------------------------------------------------ disegno (diagramma di p. 152)
function disegno() {
  const x0 = 56, y0 = 222, sx = 190, sy = 150; // V* = 1 → x0 + sx; W_max = 1 → y0 − sy
  const W = (v: number) => 1.5 * (v - (v * v * v) / 3); // k(T₂V − ρV³) con T₂ = 1, ρ = 1/3, k = 1,5
  const vz = Math.sqrt(3);
  const pts: [number, number][] = Array.from({ length: 61 }, (_, i) => { const v = (vz * i) / 60; return [x0 + sx * v, y0 - sy * W(v)]; });
  const xs = x0 + sx, ys = y0 - sy, xz = x0 + sx * vz;
  return svg(430, 262, [
    arrow(x0, y0, x0 + 360, y0, 'l', 'V', 4, 12), arrow(x0, y0, x0, 40, 'l', 'W(V)', 22, 4),
    poly(pts, 'a'),
    line(x0, ys, xs, ys, 'd'), line(xs, ys, xs, y0, 'd'),
    dot(xs, ys, 'W^MAX', 40, -12, 'a'), dot(xz, y0, '', 0, 0),
    text(x0 - 6, y0 + 14, '0', { c: 'm', size: 12, anchor: 'end' }),
    text(xs, y0 + 16, '√(T₂/3ρ)', { c: 'a', size: 12 }),
    text(xz, y0 + 32, '√(T₂/ρ)', { c: 'm', size: 12 }),
    text(xs - 8, ys + 40, 'ρV² = T₂/3', { c: 'm', size: 12, anchor: 'end' }),
    text(xz - 8, y0 - 22, 'W = 0', { c: 'm', size: 12, anchor: 'end' }),
    text(x0 + 60, 26, 'W = (e^{fβ} − 1)(T₂ − ρV²)V,  T₂ fissata', { c: 'l', size: 12, anchor: 'start' }),
  ], 'Potenza trasmissibile in funzione della velocità della cinghia, con T₂ fissata');
}

// ------------------------------------------------------------------ campioni
const base = (rnd: () => number) => {
  const rho = U(rnd, 0.1, 0.6), V = U(rnd, 5, 35), R = U(rnd, 0.05, 0.3), f = U(rnd, 0.15, 0.45), beta = U(rnd, 2.4, 3.6);
  const rhoV2 = rho * V * V, T2 = rhoV2 + U(rnd, 50, 400), E = Math.exp(f * beta);
  return { rho, V, R, f, beta, rhoV2, T2, E };
};
/** T₂ del ramo lasco quando il tenditore fissa il teso: bisezione sulla tensione integrata (indipendente dalla formula) */
const lascoDaTeso = (A: number, rhoV2: number, f: number, beta: number) => {
  let a = rhoV2 + 1e-9, b = A;
  for (let i = 0; i < 70; i++) { const m = (a + b) / 2; if (integraEulero(m, rhoV2, f, beta, 200) < A) a = m; else b = m; }
  return (a + b) / 2;
};

// ------------------------------------------------------------------ d068 tensione massima
export const d068: Dimostrazione = {
  id: 'd068',
  titolo: 'Tensione massima nella cinghia e tenditore sul ramo lasco',
  enunciato: 'Individuare la tensione massima della cinghia, mostrare perché il tenditore va sul ramo lasco e scrivere la condizione di resistenza.',
  ipotesi: [
    'motrice con coppia C₁ ≤ C_MAX; f uguale sulle pulegge; V costante',
    'forzamento con rullo tenditore che impone una tensione costante A al ramo su cui agisce',
    'resistenza (fonte esterna): tensione ammissibile T_amm a trazione; nessun contributo di flessione (EJ ≅ 0)',
  ],
  sample: (rnd) => {
    const b = base(rnd), q = U(rnd, 0.1, 0.95), al = U(rnd, 0.5, 2), A = b.T2;
    const Cmax = (A - b.rhoV2) * (b.E - 1) * b.R, C = q * Cmax, T1 = A + C / b.R;
    const thetaS = Math.log((T1 - b.rhoV2) / (A - b.rhoV2)) / b.f;
    let Tmx = 0;
    for (let i = 0; i <= 400; i++) { const th = (b.beta * i) / 400; Tmx = Math.max(Tmx, th <= thetaS ? b.rhoV2 + (A - b.rhoV2) * Math.exp(b.f * th) : T1); }
    const Fp = 2 * A * Math.sin(al / 2);
    const T1isg = integraEulero(A, b.rhoV2, b.f, b.beta), Cl = (T1isg - A) * b.R;
    const T2t = lascoDaTeso(A, b.rhoV2, b.f, b.beta), Ct = (A - T2t) * b.R;
    const Tamm = T1 * U(rnd, 1.05, 2), Cres = (Tamm - A) * b.R;
    return { ...b, q, al, A, Cmax, C, T1, thetaS, Tmx, Fp, T1isg, Cl, T2t, Ct, Tamm, Cres };
  },
  passi: [
    {
      id: 'd068.1',
      latex: L`C_1 = (T_1 - T_2)\,R \;\Rightarrow\; T_1 = T_2 + \dfrac{C_1}{R}`,
      perche: L`La tensione del ramo teso dipende dalla coppia da trasmettere: serve un salto di tensione $C_1/R$ fra i due rami.`,
      fonte: D(143),
      distrattori: [],
      num: (v) => [v.T1, v.T2 + v.C / v.R],
    },
    {
      id: 'd068.2',
      latex: L`T_{max} = \max_{0 \le \theta \le \beta} T(\theta) = T_1`,
      perche: L`Lungo l'arco la tensione cresce da $T_2$ a $T_1$ nello scorrimento e resta $T_1$ nell'aderenza (d064): la tensione massima è quella del ramo teso. $T_1$ è già la tensione totale del ramo, centrifuga compresa.`,
      fonte: { tipo: 'deduzione', da: 'pp. 142–144 (legge della tensione) e p. 136 («Tsup = Tmax nel ramo teso»)', spiegazione: 'Il massimo della legge a tratti è T₁; la dispensa lo dice a parole a p. 136.' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`T_{max} = T_1 + \rho V^2`, errore: 'convenzione', spiega: 'Nella dispensa T₁ è la tensione del ramo, che già «contiene» la centrifuga: ρV² non si somma una seconda volta.', num: (v) => [v.Tmx, v.T1 + v.rhoV2] },
        { latex: L`T_{max} = \rho V^2 + (T_2 - \rho V^2)\,e^{f\beta}`, errore: 'ipotesi', spiega: 'Questo è T₁ solo in incipiente scorrimento globale; con C₁ < C_MAX la tensione si ferma a T₂ + C₁/R.', num: (v) => [v.Tmx, v.rhoV2 + (v.T2 - v.rhoV2) * v.E] },
      ],
      num: (v) => [v.Tmx, v.T1],
    },
    {
      id: 'd068.3',
      latex: L`T_2 = \dfrac{F_p}{2\sin(\alpha/2)} = A = \text{cost} \;\Rightarrow\; T_1 = A + \dfrac{C_1}{R}`,
      perche: L`Il rullo tenditore sul ramo lasco, spinto da una molla o da un peso, fissa $T_2$ ($F_p = 2T_2\sin\frac{\alpha}{2}$, $\alpha$ deviazione del ramo): all'aumentare della coppia cresce solo $T_1$.`,
      fonte: D(148),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{T_1 + T_2}{2} = A`, errore: 'ipotesi', spiega: 'È il forzamento a base fissata (p. 149), con il valore medio costante; col tenditore è costante T₂.', num: (v) => [(v.T1 + v.T2) / 2, v.A] },
        { latex: L`T_1 = A`, errore: 'indice', spiega: 'Così il tenditore sarebbe sul ramo teso: è la soluzione peggiore (passo successivo).', num: (v) => [v.T1, v.A] },
      ],
      num: (v) => [v.T1, v.Fp / (2 * Math.sin(v.al / 2)) + v.C / v.R],
    },
    {
      id: 'd068.4',
      latex: L`\text{lasco: } T_1 = (A - \rho V^2)\,e^{f\beta_{min}} + \rho V^2,\quad C_1^{max}\big|_{lasco} = (A - \rho V^2)\,(e^{f\beta_{min}} - 1)\,R_1`,
      perche: L`In incipiente scorrimento globale con $T_2 = A$: equazione di Eulero risolta rispetto a $T_1$, poi $C = (T_1 - T_2)R_1$.`,
      fonte: D(154),
      chiave: true,
      distrattori: [
        { latex: L`C_1^{max}\big|_{lasco} = A\,(e^{f\beta_{min}} - 1)\,R_1`, errore: 'termine-perso', spiega: 'Si è persa la centrifuga: il fattore è A − ρV².', num: (v) => [v.Cl, v.A * (v.E - 1) * v.R] },
        { latex: L`C_1^{max}\big|_{lasco} = (A - \rho V^2)\,e^{f\beta_{min}}\,R_1`, errore: 'concetto', spiega: 'Questa è (T₁ − ρV²)R: la coppia è la differenza T₁ − T₂.', num: (v) => [v.Cl, (v.A - v.rhoV2) * v.E * v.R] },
      ],
      num: (v) => [v.Cl, (v.A - v.rhoV2) * (v.E - 1) * v.R],
    },
    {
      id: 'd068.5',
      latex: L`\text{teso: } T_1 = A,\ T_2 = (A - \rho V^2)\,e^{-f\beta_{min}} + \rho V^2,\quad C_1^{max}\big|_{teso} = (A - \rho V^2)\Big(1 - \dfrac{1}{e^{f\beta_{min}}}\Big)R_1`,
      perche: L`Se il tenditore fissa il ramo teso, la tensione massima resta $A$ e al crescere della coppia deve calare $T_2$: ma non può scendere più di tanto, perché deve restare sopra la centrifuga.`,
      fonte: D([151, 154]),
      chiave: true,
      distrattori: [
        { latex: L`C_1^{max}\big|_{teso} = (A - \rho V^2)\,(e^{f\beta_{min}} - 1)\,R_1`, errore: 'concetto', spiega: 'Con T₁ fissato il lasco si ricava dividendo per e^{fβ}: il fattore diventa 1 − e^{−fβ}, non e^{fβ} − 1.', num: (v) => [v.Ct, (v.A - v.rhoV2) * (v.E - 1) * v.R] },
        { latex: L`C_1^{max}\big|_{teso} = (A - \rho V^2)\,(1 - e^{f\beta_{min}})\,R_1`, errore: 'segno', spiega: 'Da (T₁ − ρV²)/(T₂ − ρV²) = e^{fβ} segue T₂ − ρV² = (T₁ − ρV²)e^{−fβ}: con e^{+fβ} la coppia sarebbe negativa.', num: (v) => [v.Ct, (v.A - v.rhoV2) * (1 - v.E) * v.R] },
      ],
      num: (v) => [v.Ct, (v.A - v.rhoV2) * (1 - 1 / v.E) * v.R],
    },
    {
      id: 'd068.6',
      latex: L`\dfrac{C_1^{max}\big|_{lasco}}{C_1^{max}\big|_{teso}} = \dfrac{e^{f\beta_{min}} - 1}{\big(e^{f\beta_{min}} - 1\big)/e^{f\beta_{min}}} = e^{f\beta_{min}}`,
      perche: L`A parità di tensione imposta dal tenditore e di velocità, sul ramo lasco si trasmette una coppia massima $e^{f\beta_{min}}$ volte più grande: per questo il tenditore si mette sul lasco, e per questo la dispensa fissa $T_2$.`,
      fonte: D(154),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{C_1^{max}|_{lasco}}{C_1^{max}|_{teso}} = 1`, errore: 'concetto', spiega: 'Non è indifferente: con T₁ fissato la coppia massima è divisa per e^{fβ}.', num: (v) => [v.Cl / v.Ct, 1] },
        { latex: L`\dfrac{C_1^{max}|_{lasco}}{C_1^{max}|_{teso}} = e^{-f\beta_{min}}`, errore: 'indice', spiega: 'Il ramo lasco è il più favorevole: il rapporto è maggiore di 1.', num: (v) => [v.Cl / v.Ct, 1 / v.E] },
      ],
      num: (v) => [v.Cl / v.Ct, v.E],
    },
    {
      id: 'd068.7',
      latex: L`T_1 \le T_{amm} \;\Rightarrow\; C_1 \le (T_{amm} - T_2)\,R`,
      perche: L`Oltre all'aderenza ($C_1 \le C_{MAX}$) c'è il limite di resistenza del ramo teso: la coppia ammissibile è la minore delle due. La dispensa non tratta questa verifica.`,
      fonte: RESISTENZA,
      distrattori: [],
      num: (v) => [(v.Tamm - v.A) * v.R, v.Cres],
    },
    {
      id: 'd068.8',
      latex: L`EJ_x \cong 0 \;\Rightarrow\; \text{nessun contributo di flessione nel modello}`,
      perche: L`Nel modello della dispensa la cinghia è un flessibile ideale: la curvatura cambia senza sforzi. Le trattazioni di progetto aggiungono una tensione di flessione, che qui non c'è.`,
      fonte: { tipo: 'deduzione', da: 'p. 132 (flessibile ideale)', spiegazione: 'Con rigidezza flessionale nulla la flessione non produce tensioni nella cinghia.' },
      aggiunto: true,
      distrattori: [],
    },
  ],
  risultato: { latex: L`T_{max} = T_1 = T_2 + \dfrac{C_1}{R}\ \ (\le T_{amm}),\qquad \dfrac{C^{max}|_{lasco}}{C^{max}|_{teso}} = e^{f\beta_{min}}`, fonte: { tipo: 'deduzione', da: 'pp. 143, 154 (dispensa) e verifica di resistenza (fonte esterna)', spiegazione: 'T₁ dalla coppia e confronto lasco/teso dalla dispensa; il limite T_amm è esterno (NF-07).' } },
  gancio: 'La tensione massima è il teso, T₂ + C/R: il tenditore va sul lasco, che rende e^{fβ} volte di più.',
};

// ------------------------------------------------------------------ d069 potenza trasmessa
export const d069: Dimostrazione = {
  id: 'd069',
  titolo: 'Potenza trasmessa dalla cinghia',
  enunciato: 'Ricavare la potenza trasmessa dalla cinghia e la potenza massima a forzamento fissato.',
  ipotesi: [
    'V₁ ≃ V₂ ≃ V (cinghia molto rigida assialmente), V = ωR con R costante',
    'potenza massima: θ* = β_min e T₂ fissata dal forzamento',
  ],
  sample: (rnd) => {
    const b = base(rnd), q = U(rnd, 0.2, 1), omega = b.V / b.R, thetaS = q * b.beta;
    const T1 = integraEulero(b.T2, b.rhoV2, b.f, thetaS), C = (T1 - b.T2) * b.R, W = C * omega, Vz = Math.sqrt(b.T2 / b.rho);
    return { ...b, q, omega, thetaS, T1, C, W, Vz };
  },
  passi: [
    {
      id: 'd069.1',
      latex: L`W = C_1\,\omega_1`,
      perche: L`Potenza di una coppia: coppia per velocità angolare. La dispensa chiama la potenza $W$.`,
      fonte: D(143),
      distrattori: [],
    },
    {
      id: 'd069.2',
      latex: L`C_1\omega_1 = (T_1 - T_2)\,\underbrace{R_1\omega_1}_{V_1 \simeq V} = (T_1 - T_2)\,V`,
      perche: L`Si sostituisce $C_1 = (T_1 - T_2)R_1$: il raggio per la velocità angolare è la velocità della cinghia. La potenza è la forza trasmessa per la velocità.`,
      fonte: D(143),
      chiave: true,
      distrattori: [
        { latex: L`W = (T_1 + T_2)\,V`, errore: 'segno', spiega: 'Conta la differenza delle tensioni, quella che dà coppia.', num: (v) => [v.W, (v.T1 + v.T2) * v.V] },
        { latex: L`W = (T_1 - T_2)\,\omega_1`, errore: 'fattore', spiega: 'Manca il raggio: (T₁ − T₂)ω non è una potenza.', num: (v) => [v.W, (v.T1 - v.T2) * v.omega] },
      ],
      num: (v) => [v.W, (v.T1 - v.T2) * v.V],
    },
    {
      id: 'd069.3',
      latex: L`W^{MAX} = C_{MAX}\,\omega = (e^{f\theta^*} - 1)\,(T_2 - \rho V^2)\,\underbrace{R\,\omega}_{V}`,
      perche: L`Fissato il forzamento ($T_2$) si usa la coppia ottenuta dall'equazione di Eulero; «massima» vuol dire con $\theta^*$ pari all'angolo limitante.`,
      fonte: D(152),
      chiave: true,
      distrattori: [
        { latex: L`W^{MAX} = (e^{f\theta^*} - 1)\,T_2\,V`, errore: 'termine-perso', spiega: 'Si è persa la centrifuga: è proprio il termine che crea il massimo rispetto a V.', num: (v) => [v.W, (Math.exp(v.f * v.thetaS) - 1) * v.T2 * v.V] },
        { latex: L`W^{MAX} = (e^{f\theta^*} - 1)\,(T_2 - \rho V^2)\,R`, errore: 'fattore', spiega: 'Questa è la coppia: manca la ω.', num: (v) => [v.W, (Math.exp(v.f * v.thetaS) - 1) * (v.T2 - v.rhoV2) * v.R] },
      ],
      num: (v) => [v.W, (Math.exp(v.f * v.thetaS) - 1) * (v.T2 - v.rhoV2) * v.V],
    },
    {
      id: 'd069.4',
      latex: L`W^{MAX} = (e^{f\theta^*} - 1)\,(T_2 V - \rho V^3)`,
      perche: L`Sviluppando: un termine cresce con $V$, l'altro con $V^3$. È la funzione da massimizzare.`,
      fonte: D(152),
      distrattori: [],
      num: (v) => [v.W, (Math.exp(v.f * v.thetaS) - 1) * (v.T2 * v.V - v.rho * v.V ** 3)],
    },
    {
      id: 'd069.5',
      latex: L`T_2 - \rho V^2 = 0 \;\Rightarrow\; V = \sqrt{\dfrac{T_2}{\rho}}\quad (W = 0)`,
      perche: L`A questa velocità la centrifuga eguaglia la tensione del ramo lasco: la cinghia non preme più sulla puleggia e non trasmette potenza.`,
      fonte: D(152),
      chiave: true,
      distrattori: [
        { latex: L`V = \sqrt{\dfrac{T_2}{3\rho}}\quad (W = 0)`, errore: 'indice', spiega: 'Questa è la velocità di potenza massima, non nulla.', num: (v) => [v.rho * (v.T2 / (3 * v.rho)), v.T2] },
        { latex: L`V = \dfrac{T_2}{\rho}`, errore: 'fattore', spiega: 'Manca la radice: ρV² = T₂.', num: (v) => [v.rho * (v.T2 / v.rho) ** 2, v.T2] },
      ],
      num: (v) => [v.rho * v.Vz * v.Vz, v.T2],
    },
    {
      id: 'd069.6',
      latex: L`V = \omega R,\ R = \text{cost} \;\Rightarrow\; W = W(\omega)`,
      perche: L`La potenza dipende dalla coppia massima, già massimizzata rispetto a $\theta^*$, e dalla velocità: con il raggio fissato è funzione della velocità angolare.`,
      fonte: D(152),
      distrattori: [],
      num: (v) => [v.V, v.omega * v.R],
    },
  ],
  risultato: { latex: L`W = (T_1 - T_2)\,V,\qquad W^{MAX} = (e^{f\theta^*} - 1)(T_2 - \rho V^2)\,V`, fonte: D([143, 152]) },
  gancio: 'Potenza = salto di tensione × velocità della cinghia.',
};

// ------------------------------------------------------------------ d070 velocità ottima
export const d070: Dimostrazione = {
  id: 'd070',
  titolo: 'Velocità ottima per la massima potenza',
  enunciato: 'Trovare la velocità della cinghia che rende massima la potenza trasmissibile, nel modello della dispensa (T₂ fissata) e nella variante delle domande (T₁ = T_max).',
  ipotesi: [
    'incipiente scorrimento globale sulla puleggia limitante: θ* = β_min',
    'modello della dispensa: T₂ = cost (rullo tenditore sul ramo lasco); si trascurano le variazioni di V lungo la cinghia',
    'variante (fonte esterna, passi 9–12): T₁ = T_max fissata dalla resistenza del ramo teso',
  ],
  sample: (rnd) => {
    const rho = U(rnd, 0.1, 0.6), f = U(rnd, 0.15, 0.45), beta = U(rnd, 2.4, 3.6), R = U(rnd, 0.05, 0.3);
    const T2 = U(rnd, 100, 600), Tmax = U(rnd, 400, 1500), E = Math.exp(f * beta), k = E - 1, kv = 1 - 1 / E;
    const Wf = (x: number) => (T2 - rho * x * x) * k * R * (x / R); // C_MAX ω
    const V = U(rnd, 0.2, 1.6) * Math.sqrt(T2 / (3 * rho)), h = 1e-6 * V;
    const W = Wf(V), dW = (Wf(V + h) - Wf(V - h)) / (2 * h);
    const Vz = Math.sqrt(T2 / rho), Vs = massimoAureo(Wf, 0, Vz), H = 0.1 * Vs;
    const d2 = (Wf(Vs + H) - 2 * Wf(Vs) + Wf(Vs - H)) / (H * H), Wmx = Wf(Vs);
    const T1s = integraEulero(T2, rho * Vs * Vs, f, beta);
    // variante: T₁ = T_max, T₂ dal rapporto di Eulero
    const T2v = (x: number) => rho * x * x + (Tmax - rho * x * x) / E;
    const Wv = (x: number) => (Tmax - T2v(x)) * x;
    const Vv = massimoAureo(Wv, 0, Math.sqrt(Tmax / rho));
    return { rho, f, beta, R, T2, Tmax, E, k, kv, V, h, W, dW, Vz, Vs, H, d2, Wmx, T1s, T2V: T2v(V), WvV: Wv(V), Vv, T2vs: T2v(Vv), Wvmx: Wv(Vv) };
  },
  passi: [
    {
      id: 'd070.1',
      latex: L`\theta^* = \beta_{min},\qquad T_2 = \text{cost}\ \ \text{(rullo tenditore sul ramo lasco)}`,
      perche: L`È l'ipotesi della dispensa, giustificata a p. 154: il tenditore sul lasco rende $e^{f\beta}$ volte più coppia che sul teso. Quindi si cerca il massimo «dei massimi»: la coppia è già massima rispetto a $\theta^*$.`,
      fonte: D([152, 154]),
      chiave: true,
      distrattori: [
        { latex: L`T_1 = T_{max} = \text{cost}`, errore: 'ipotesi', spiega: 'È l\'ipotesi delle domande 15 e 46, non della dispensa (NF-22): porta a un altro risultato (passi 9–12).' },
        { latex: L`T_1 - T_2 = \text{cost}`, errore: 'concetto', spiega: 'A differenza di tensione costante W = (T₁ − T₂)V crescerebbe sempre con V: non ci sarebbe un ottimo.' },
      ],
    },
    {
      id: 'd070.2',
      latex: L`W(V) = (e^{f\beta_{min}} - 1)\,(T_2 - \rho V^2)\,V = k\,(T_2 V - \rho V^3),\quad k = e^{f\beta_{min}} - 1`,
      perche: L`Potenza in incipiente scorrimento globale (d069) con $T_2$ fissata: $k$ non dipende da $V$.`,
      fonte: D(152),
      distrattori: [],
      num: (v) => [v.W, v.k * (v.T2 * v.V - v.rho * v.V ** 3)],
    },
    {
      id: 'd070.3',
      latex: L`\dfrac{dW}{dV} = k\,\dfrac{d(T_2 V - \rho V^3)}{dV} = k\,(T_2 - 3\rho V^2)`,
      perche: L`Si deriva rispetto a $V$: il termine lineare dà $T_2$, il cubico $3\rho V^2$.`,
      fonte: D(152),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{dW}{dV} = k\,(T_2 - \rho V^2)`, errore: 'termine-perso', spiega: 'Si è derivato solo V, non V³: la derivata di ρV³ è 3ρV².', num: (v) => [v.dW, v.k * (v.T2 - v.rho * v.V ** 2)] },
        { latex: L`\dfrac{dW}{dV} = k\,(T_2 - 2\rho V^2)`, errore: 'fattore', spiega: 'd(V³)/dV = 3V².', num: (v) => [v.dW, v.k * (v.T2 - 2 * v.rho * v.V ** 2)] },
      ],
      num: (v) => [v.dW, v.k * (v.T2 - 3 * v.rho * v.V ** 2)],
    },
    {
      id: 'd070.4',
      latex: L`\dfrac{dW}{dV} = 0 \;\Rightarrow\; T_2 - 3\rho V^2 = 0 \;\Rightarrow\; V^* = \sqrt{\dfrac{T_2}{3\rho}}`,
      perche: L`Velocità della cinghia per ottenere la potenza massima: dipende solo dal forzamento e dalla massa lineare.`,
      fonte: D(152),
      chiave: true,
      distrattori: [
        { latex: L`V^* = \sqrt{\dfrac{T_2}{\rho}}`, errore: 'concetto', spiega: 'A questa velocità la potenza è nulla, non massima.', num: (v) => [v.rho * v.Vs * v.Vs, v.T2] },
        { latex: L`\rho V^{*2} = \dfrac{T_1}{3}`, errore: 'ipotesi', spiega: 'Nel modello della dispensa è fissata T₂, non T₁: all\'ottimo T₁ = T₂(1 + 2e^{fβ})/3 e ρV*² = T₂/3 (NF-22).', num: (v) => [v.rho * v.Vs * v.Vs, v.T1s / 3] },
      ],
      num: (v) => [3 * v.rho * v.Vs * v.Vs, v.T2],
    },
    {
      id: 'd070.5',
      latex: L`\dfrac{d^2W}{dV^2} = -6k\rho V^* < 0`,
      perche: L`La derivata seconda è negativa: il punto stazionario è un massimo, come mostra il grafico di p. 152.`,
      fonte: { tipo: 'deduzione', da: 'p. 152 (W(V) e grafico)', spiegazione: 'Derivata seconda di k(T₂V − ρV³); la dispensa lo mostra solo col diagramma.' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.d2, -6 * v.k * v.rho * v.Vs],
    },
    {
      id: 'd070.6',
      latex: L`\rho V^{*2} = \dfrac{T_2}{3},\qquad \sqrt{\dfrac{T_2}{\rho}} = \sqrt{3}\,V^*`,
      perche: L`All'ottimo un terzo della tensione del ramo lasco è «consumato» dalla centrifuga. La curva parte da zero, ha il massimo in $V^*$ e torna a zero in $\sqrt3\,V^*$.`,
      fonte: D(152),
      distrattori: [],
      num: (v) => [v.Vz / v.Vs, Math.sqrt(3)],
    },
    {
      id: 'd070.7',
      latex: L`W^{MAX} = \dfrac{2}{3}\,(e^{f\beta_{min}} - 1)\,T_2\,\sqrt{\dfrac{T_2}{3\rho}}`,
      perche: L`Sostituendo $\rho V^{*2} = T_2/3$: $T_2 - \rho V^{*2} = \frac23 T_2$. La dispensa non scrive questo valore.`,
      fonte: { tipo: 'deduzione', da: 'p. 152', spiegazione: 'W(V*) con ρV*² = T₂/3 (NF-171).' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Wmx, (2 / 3) * v.k * v.T2 * Math.sqrt(v.T2 / (3 * v.rho))],
    },
    {
      id: 'd070.8',
      latex: L`T_1^* = \rho V^{*2} + (T_2 - \rho V^{*2})\,e^{f\beta_{min}} = \dfrac{T_2}{3}\,\big(1 + 2e^{f\beta_{min}}\big)`,
      perche: L`La tensione massima all'ottimo non è fissata: la dà l'equazione di Eulero. Quindi in questo modello $\rho V^{*2} = T_2/3$, non $T_1/3$.`,
      fonte: { tipo: 'deduzione', da: 'pp. 143, 152', spiegazione: 'Equazione di Eulero con θ* = β_min e ρV*² = T₂/3 (NF-171).' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`T_1^* = 3\rho V^{*2}`, errore: 'ipotesi', spiega: 'È la relazione della variante (ρV² = T_max/3); qui 3ρV*² = T₂.', num: (v) => [v.T1s, 3 * v.rho * v.Vs * v.Vs] },
        { latex: L`T_1^* = T_2\,e^{f\beta_{min}}`, errore: 'termine-perso', spiega: 'Si è persa la centrifuga nell\'equazione di Eulero.', num: (v) => [v.T1s, v.T2 * v.E] },
      ],
      num: (v) => [v.T1s, (v.T2 / 3) * (1 + 2 * v.E)],
    },
    {
      id: 'd070.9',
      latex: L`\text{variante: } T_1 = T_{max} \;\Rightarrow\; T_2 - \rho V^2 = (T_{max} - \rho V^2)\,e^{-f\beta}`,
      perche: L`Fonte esterna (domande 15 e 46): si fissa la tensione del ramo teso al massimo ammissibile e si ricava il lasco dall'equazione di Eulero.`,
      fonte: VARIANTE,
      chiave: true,
      distrattori: [
        { latex: L`T_2 - \rho V^2 = (T_{max} - \rho V^2)\,e^{f\beta}`, errore: 'segno', spiega: 'Il lasco è minore del teso: si divide per e^{fβ}.', num: (v) => [v.T2V - v.rho * v.V ** 2, (v.Tmax - v.rho * v.V ** 2) * v.E] },
        { latex: L`T_2 = T_{max}\,e^{-f\beta}`, errore: 'termine-perso', spiega: 'La centrifuga va tolta a entrambe le tensioni prima del rapporto.', num: (v) => [v.T2V, v.Tmax / v.E] },
      ],
      num: (v) => [v.T2V - v.rho * v.V ** 2, (v.Tmax - v.rho * v.V ** 2) / v.E],
    },
    {
      id: 'd070.10',
      latex: L`W = (T_1 - T_2)\,V = (T_{max} - \rho V^2)\,(1 - e^{-f\beta})\,V`,
      perche: L`Con $T_1$ fissata il fattore di Eulero è $1 - e^{-f\beta}$ invece di $e^{f\beta} - 1$.`,
      fonte: VARIANTE,
      distrattori: [],
      num: (v) => [v.WvV, (v.Tmax - v.rho * v.V ** 2) * v.kv * v.V],
    },
    {
      id: 'd070.11',
      latex: L`\dfrac{dW}{dV} = (1 - e^{-f\beta})\,(T_{max} - 3\rho V^2) = 0 \;\Rightarrow\; \rho V^{*2} = \dfrac{T_{max}}{3},\quad V^* = \sqrt{\dfrac{T_{max}}{3\rho}}`,
      perche: L`Stesso conto con $T_{max}$ al posto di $T_2$: nella variante la centrifuga all'ottimo è un terzo della tensione massima. È la «frase da ricordare» delle domande, che però non è nella dispensa.`,
      fonte: VARIANTE,
      chiave: true,
      distrattori: [
        { latex: L`\rho V^{*2} = \dfrac{T_2}{3}`, errore: 'ipotesi', spiega: 'È il risultato del modello della dispensa; nella variante la tensione fissata è T_max.', num: (v) => [v.rho * v.Vv * v.Vv, v.T2vs / 3] },
        { latex: L`\rho V^{*2} = \dfrac{T_{max}}{2}`, errore: 'fattore', spiega: 'd(V³)/dV = 3V²: il fattore è 1/3.', num: (v) => [v.rho * v.Vv * v.Vv, v.Tmax / 2] },
      ],
      num: (v) => [3 * v.rho * v.Vv * v.Vv, v.Tmax],
    },
    {
      id: 'd070.12',
      latex: L`W^{MAX} = \dfrac{2}{3}\,T_{max}\,(1 - e^{-f\beta})\,\sqrt{\dfrac{T_{max}}{3\rho}}`,
      perche: L`Potenza massima nella variante (domanda 46). La radice copre tutta la frazione $T_{max}/3\rho$ (NF-172).`,
      fonte: VARIANTE,
      distrattori: [],
      num: (v) => [v.Wvmx, (2 / 3) * v.Tmax * v.kv * Math.sqrt(v.Tmax / (3 * v.rho))],
    },
  ],
  risultato: { latex: L`V^* = \sqrt{\dfrac{T_2}{3\rho}},\qquad \rho V^{*2} = \dfrac{T_2}{3}\quad (T_2\ \text{fissata})`, fonte: D(152) },
  gancio: 'V contro V³: la derivata dà un terzo. Un terzo di T₂ (dispensa) o di T_max (domande): dipende da cosa tieni fisso.',
};

// ------------------------------------------------------------------ argomento
export const velocitaOttima: ArgomentoContenuto = {
  id: 'c4-velocita-ottima',
  cosaDireSubito:
    'La potenza trasmissibile al limite d\'aderenza è W = C_MAX ω = (e^{fβ} − 1)(T₂ − ρV²)V: cresce con V, ma la centrifuga ρV² mangia la tensione che preme la cinghia sulla puleggia. Nella dispensa T₂ è fissata dal tenditore sul ramo lasco: dW/dV = 0 dà V* = √(T₂/3ρ), cioè ρV² = T₂/3, e la potenza si annulla a V = √(T₂/ρ). Le domande invece fissano T₁ = T_max e trovano ρV² = T_max/3: è un altro modello.',
  sistemaIpotesi: [
    'Sistema: trasmissione a due pulegge in incipiente scorrimento globale sulla puleggia limitante (θ* = β_min).',
    'Forzamento con rullo tenditore sul ramo lasco: T₂ = A costante (p. 148, 154).',
    'V₁ ≃ V₂ ≃ V; V = ωR con R costante, quindi W è funzione di ω.',
    'Variante delle domande (fonte esterna): T₁ = T_max costante, limite di resistenza del ramo teso.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Andamento di W(V) a forzamento fissato (dispensa p. 152): massimo in √(T₂/3ρ), zero in √(T₂/ρ).',
    fonte: { tipo: 'dispensa', pag: 152, fig: 'diagramma manoscritto «ANDAMENTO W»' },
    elementi: [
      { id: 'assi', testo: 'assi V (ascisse) e W(V) (ordinate), origine 0', obbligatorio: true },
      { id: 'curva', testo: 'curva che parte da 0, sale e torna a 0', obbligatorio: true },
      { id: 'max', testo: 'massimo W^MAX in V* = √(T₂/3ρ), con le tratteggiate', obbligatorio: true },
      { id: 'zero', testo: 'potenza nulla in V = √(T₂/ρ)', obbligatorio: true },
      { id: 'formula', testo: 'W = (e^{fβ} − 1)(T₂ − ρV²)V con T₂ fissata', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`W^{MAX} = C_{MAX}\,\omega = (e^{f\theta^*} - 1)\,(T_2 - \rho V^2)\,V`,
    spiegazione: 'Coppia massima a forzamento fissato (equazione di Eulero con θ* = β_min) moltiplicata per ω, con Rω = V.',
    fonte: { tipo: 'dispensa', pag: 152 },
  },
  dimostrazioni: ['d068', 'd069', 'd070'],
  significato:
    'La velocità della cinghia ha due effetti opposti: moltiplica la forza trasmessa, ma la centrifuga riduce la tensione utile T₂ − ρV². Il compromesso è a ρV² = T₂/3; oltre, la potenza cala fino ad annullarsi a √3 volte la velocità ottima. Il risultato dipende da quale tensione si tiene fissa: con il tenditore sul lasco (dispensa) un terzo di T₂, con la tensione massima ammissibile (domande) un terzo di T_max.',
  fraseDaRicordare: 'Con T₂ fissata dal tenditore: ρV*² = T₂/3, V* = √(T₂/3ρ); a √3·V* la potenza è nulla.',
  daNonDire: [
    { frase: 'All\'ottimo la centrifuga è un terzo della tensione massima, come dice la dispensa.', perche: 'Nella dispensa è fissata T₂: ρV*² = T₂/3. T_max/3 è il risultato della variante delle domande (NF-22).', fonte: { tipo: 'dispensa', pag: 152 } },
    { frase: 'La velocità ottima è V = √(T₂/ρ).', perche: 'A quella velocità la potenza è nulla; l\'ottimo è √(T₂/3ρ).', fonte: { tipo: 'dispensa', pag: 152 } },
    { frase: 'Più veloce va la cinghia, più potenza trasmette.', perche: 'Solo fino a V*: poi la centrifuga prevale e W cala.', fonte: { tipo: 'dispensa', pag: 152 } },
    { frase: 'Il tenditore si mette sul ramo teso per controllare la tensione massima.', perche: 'Sul teso la coppia massima è e^{fβ} volte minore: va sul lasco (p. 154).', fonte: { tipo: 'dispensa', pag: 154 } },
    { frase: 'v_opt = T_max/√(3m).', perche: 'Errore di impaginazione delle domande: la radice copre tutta la frazione, √(T_max/3m) (NF-172).', fonte: VARIANTE },
    { frase: 'La dispensa dà W^MAX = (2/3)…', perche: 'La dispensa non scrive la potenza massima: è una deduzione (NF-171).', fonte: { tipo: 'deduzione', da: 'p. 152', spiegazione: 'W(V*) con ρV*² = T₂/3' } },
  ],
  approfondimenti: [
    { domanda: 'Perché la dispensa fissa proprio T₂?', tipo: 'approfondimento', attesa: 'Perché il rullo tenditore si mette sul ramo lasco: lì, a parità di tensione imposta, la coppia massima è e^{fβ_min} volte quella che si avrebbe sul teso (p. 154).', fonte: { tipo: 'dispensa', pag: 154 } },
    { domanda: 'Che cosa cambia se si fissa la tensione massima T₁ = T_max?', tipo: 'approfondimento', attesa: 'T₁ − T₂ = (T_max − ρV²)(1 − e^{−fβ}), quindi W ∝ (T_max − ρV²)V e ρV*² = T_max/3. È il modello delle domande, non della dispensa.', fonte: VARIANTE },
    { domanda: 'Quanto vale la tensione del ramo teso alla velocità ottima della dispensa?', tipo: 'approfondimento', attesa: 'T₁* = ρV*² + (T₂ − ρV*²)e^{fβ} = T₂(1 + 2e^{fβ})/3: non è tre volte ρV*².', fonte: { tipo: 'deduzione', da: 'pp. 143, 152', spiegazione: 'Eulero con ρV*² = T₂/3' } },
    { domanda: 'Che significato fisico ha la velocità √(T₂/ρ)?', tipo: 'approfondimento', attesa: 'La centrifuga eguaglia la tensione del lasco: la forza normale sul ramo lasco si annulla, la cinghia non preme più e non trasmette potenza.', fonte: { tipo: 'dispensa', pag: [140, 152] } },
    { domanda: 'Perché si dice che W è funzione di ω?', tipo: 'approfondimento', attesa: 'Perché C_MAX è già massimizzata rispetto a θ* e V = ωR con R costante: resta solo la velocità di rotazione.', fonte: { tipo: 'dispensa', pag: 152 } },
    { domanda: 'Da dove viene l\'equazione che usi per C_MAX?', tipo: 'collegamento', argomento: 'c4-eulero', attesa: 'Dall\'equazione di Eulero con θ* = β_min: T₁ − T₂ = (T₂ − ρV²)(e^{fβ_min} − 1), per R.', fonte: { tipo: 'dispensa', pag: 143 } },
    { domanda: 'Come si fissa T₂ in pratica?', tipo: 'approfondimento', attesa: 'Con un rullo tenditore a molla o a gravità sul ramo lasco: F_p = 2T₂ sin(α/2), con F_p = F_m (molla) o P b₁/b₂ (peso).', fonte: { tipo: 'dispensa', pag: 148 } },
    { domanda: 'E con la base fissata dopo la regolazione?', tipo: 'approfondimento', attesa: 'Vale (T₁ + T₂)/2 = T₀: allora T₁ − T₂ = 2(e^{fβ} − 1)/(e^{fβ} + 1)·(T₀ − ρV²) e l\'ottimo è ρV*² = T₀/3. La dispensa enuncia la relazione senza dimostrarla (NF-173).', fonte: { tipo: 'deduzione', da: 'p. 149 e p. 143', spiegazione: 'Eulero più (T₁ + T₂)/2 = T₀: W ∝ (T₀ − ρV²)V' } },
  ],
  simboli: [
    { simbolo: 'W', significato: 'potenza', altrove: 'P nelle domande' },
    { simbolo: L`V,\ V^*`, significato: 'velocità della cinghia, velocità ottima', altrove: 'v, v_opt' },
    { simbolo: L`\rho V^2`, significato: 'termine centrifugo', altrove: 'T_c = mv² nelle domande' },
    { simbolo: L`k = e^{f\beta_{min}} - 1`, significato: 'fattore di Eulero con T₂ fissata', altrove: '1 − e^{−μβ} nella variante (T₁ fissata)' },
    { simbolo: L`A`, significato: 'tensione imposta dal tenditore (p. 154)' },
    { simbolo: L`T_{max}`, significato: 'tensione massima ammissibile del ramo teso (solo variante, fonte esterna)', altrove: 'in D «tensione massima» è la T₁ richiesta dalla coppia (p. 143)' },
    { simbolo: L`T_{amm}`, significato: 'tensione ammissibile a trazione (fonte esterna)' },
    { simbolo: 'f', significato: 'coefficiente d\'attrito', altrove: 'μ' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c4-potenza-v' }],
  previsioni: [
    {
      id: 'c4-vo-forzamento',
      domanda: 'Raddoppio la forza del tenditore, quindi T₂. La velocità ottima della cinghia…',
      opzioni: ['raddoppia', 'cresce di √2 volte', 'resta uguale', 'si dimezza'],
      corretta: 1,
      spiega: 'V* = √(T₂/3ρ): raddoppiando T₂ la velocità ottima cresce di √2.',
      verify: () => {
        const p = { modello: 'dispensa' as const, rho: 0.3, f: 0.3, beta: Math.PI, V: 10 };
        const r = potenzaCinghia({ ...p, T: 400 }).Vopt / potenzaCinghia({ ...p, T: 200 }).Vopt;
        return Math.abs(r - Math.SQRT2) < 1e-12 ? 1 : Math.abs(r - 2) < 1e-12 ? 0 : Math.abs(r - 1) < 1e-12 ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c4-potenza-v' },
    },
    {
      id: 'c4-vo-terzo',
      domanda: 'Nel modello della dispensa (T₂ fissata), alla velocità di massima potenza il termine centrifugo ρV² vale…',
      opzioni: ['T₂/3', 'T₁/3', 'T₂', 'T₂/√3'],
      corretta: 0,
      spiega: 'dW/dV = k(T₂ − 3ρV²) = 0. T₁/3 è il risultato del modello con T₁ fissata, che non è quello della dispensa.',
      verify: () => {
        const p = { modello: 'dispensa' as const, T: 300, rho: 0.3, f: 0.3, beta: Math.PI };
        const vs = massimoAureo((x) => potenzaCinghia({ ...p, V: x }).W, 0, potenzaCinghia({ ...p, V: 1 }).Vzero);
        const o = potenzaCinghia({ ...p, V: vs });
        return Math.abs(o.rhoV2 / (p.T / 3) - 1) < 1e-6 ? 0 : Math.abs(o.rhoV2 / (o.T1 / 3) - 1) < 1e-6 ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c4-potenza-v' },
    },
  ],
  nf: ['NF-07', 'NF-22', 'NF-171', 'NF-172', 'NF-173'],
};
