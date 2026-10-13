/**
 * C1 · Manovellismo di spinta: cinematica, CIR, punti morti (domande q03, q31). Dispensa pp. 24–27, 30–32, 47–49.
 * La velocità esatta del pistone e l'attrito nella guida non sono in D: deduzioni (NF-108, NF-109).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { jasin, jatan2, jc, jcos, jmul, jpolar, jsc, jsin, jsqrt, jsub, jt, manovellismo, norm, sub, wedge, type J, type V2 } from '../../engine/c1';
import { angle, arrow, dim, dot, ground, hinge, line, pin, rect, rot, svg, text } from '../svg';
import { D, DED, L, get, pj, put, pv } from './comune';

// ------------------------------------------------------------------ disegno (schema cinematico di p. 25, CIR di p. 26)
function disegno() {
  const A: V2 = [70, 172], r = 70, l = 190, th = (32 * Math.PI) / 180;
  const B: V2 = [A[0] + r * Math.cos(th), A[1] - r * Math.sin(th)];
  const sg = (r / l) * Math.sin(th), g = Math.asin(sg);
  const C: V2 = [B[0] + l * Math.cos(g), A[1]];
  const K: V2 = [C[0], A[1] - (C[0] - A[0]) * Math.tan(th)];
  const thd = (th * 180) / Math.PI, gd = (g * 180) / Math.PI;
  const vb = 52;
  return svg(400, 250, [
    line(A[0] - 30, A[1], 385, A[1], 'd'), text(388, A[1] - 10, 'x', { c: 'm' }),
    arrow(A[0], A[1] + 30, A[0], 20, 'm'), text(A[0] - 10, 22, 'y', { c: 'm' }),
    ground(C[0] + 48, A[1] - 21, C[0] - 48, A[1] - 21),
    line(C[0] - 48, A[1] + 21, C[0] + 48, A[1] + 21, 'g', 2),
    rect(C[0] - 24, A[1] - 17, 48, 34, 'soft'), rect(C[0] - 24, A[1] - 17, 48, 34, 'l'),
    line(A[0], A[1], K[0], K[1], 'd'), line(C[0], A[1] + 30, K[0], K[1] - 4, 'd'),
    line(B[0], B[1], B[0], A[1], 'd'), text(B[0] + 8, A[1] + 12, 'H', { c: 'm' }),
    line(A[0], A[1], B[0], B[1], 'l', 5), line(B[0], B[1], C[0], C[1], 'l', 4),
    pin(A[0], A[1]), hinge(B[0], B[1], 'B', -4, -14), hinge(C[0], C[1], 'C', 10, 26),
    text(A[0] + 14, A[1] + 14, 'A'), text((A[0] + B[0]) / 2 - 8, (A[1] + B[1]) / 2 - 12, '1', { c: 'm' }),
    text((B[0] + C[0]) / 2, (B[1] + C[1]) / 2 - 12, '2', { c: 'm' }), text(C[0] + 36, A[1] + 2, '3', { c: 'm' }),
    angle(A[0], A[1], 30, 0, thd, 'θ'), angle(C[0], C[1], 44, 180 - gd, 180, 'γ'),
    rot(A[0], A[1], 20, 110, 190, 'v', 'ω₁'),
    arrow(B[0], B[1], B[0] - vb * Math.sin(th), B[1] - vb * Math.cos(th), 'v', 'V_B', -16, -2),
    arrow(C[0], C[1], C[0] - 46, C[1], 'v', 'V_C', -8, 16),
    dot(K[0], K[1], 'K', 12, 4, 'a'), rot(K[0], K[1], 22, 250, 190, 'a', 'ω₂'),
    dim(A[0], A[1] + 34, C[0], A[1] + 34, 'x_C', 12),
  ], 'Manovellismo di spinta centrato: manovella 1, biella 2, pistone 3, angoli θ e γ, CIR K della biella');
}

// ------------------------------------------------------------------ campione: manovellismo con θ = ω₁t (getti esatti)
const sampleM = (rnd: () => number): Vars => {
  const r = U(rnd, 0.02, 0.2), lam = U(rnd, 0.12, 0.45), l = r / lam, w = U(rnd, 10, 300);
  let th = U(rnd, -Math.PI, Math.PI);
  if (Math.abs(Math.cos(th)) < 0.05) th += 0.2; // lontano da θ = ±90° (CIR all'infinito)
  const T: J = jt(th, w);
  const Bj = jpolar(jc(r), T);
  const sg = jsc(lam, jsin(T));
  const g = jasin(sg);
  const cgj = jsqrt(jsub(jc(1), jmul(sg, sg)));
  const xC = jsub(Bj[0], jsc(-l, cgj)); // x_C = x_B + l cos γ
  const s = jsin(T);
  const xA: J = [0, 1, 2].map((i) => r * jcos(T)[i] + (i === 0 ? l : 0) - ((l * lam * lam) / 2) * jmul(s, s)[i]) as J; // legge approssimata
  const bAng = jatan2(jsc(-1, Bj[1]), jsub(xC, Bj[0])); // angolo della biella C − B
  const m = manovellismo({ r, l, theta: th, omega1: w });
  const gGeo = Math.atan2(Bj[1][0], xC[0] - Bj[0][0]); // γ letto dalla geometria
  const o: Vars = { r, l, lam, w, th, g: g[0], gd: g[1], gGeo, xC: xC[0], VC: xC[1], aC: xC[2], xA: xA[0], VA: xA[1], aA: xA[2], w2: bAng[1], w2d: bAng[2] };
  put(o, 'B', [Bj[0][0], Bj[1][0]]); put(o, 'VB', [Bj[0][1], Bj[1][1]]); put(o, 'aB', [Bj[0][2], Bj[1][2]]);
  put(o, 'C', [xC[0], 0]); put(o, 'aCv', [xC[2], 0]);
  put(o, 'K', m.K ?? [NaN, NaN]);
  o.xC0 = manovellismo({ r, l, theta: 0, omega1: w }).xC;
  o.xCpi = manovellismo({ r, l, theta: Math.PI, omega1: w }).xC;
  o.aC0 = manovellismo({ r, l, theta: 0, omega1: w }).aC;
  o.aCpi = manovellismo({ r, l, theta: Math.PI, omega1: w }).aC;
  o.VC0 = manovellismo({ r, l, theta: 0, omega1: w }).VC;
  o.VCpi = manovellismo({ r, l, theta: Math.PI, omega1: w }).VC;
  return o;
};
const CB = (v: Vars): V2 => sub(get(v, 'C'), get(v, 'B'));

// ------------------------------------------------------------------ d010 posizione (p. 31)
export const d010: Dimostrazione = {
  id: 'd010',
  titolo: 'Manovellismo: relazione geometrica di posizione',
  enunciato: 'Ricavare la posizione x_C del pistone in funzione dell\'angolo di manovella θ nel manovellismo di spinta centrato.',
  ipotesi: ['manovellismo centrato: asse del pistone per la cerniera fissa A (asse x)', 'manovella AB = r, biella BC = l, λ = r/l < 1', 'θ angolo di manovella, γ angolo di biella (q03 e d010 lo chiamano φ)'],
  sample: sampleM,
  passi: [
    {
      id: 'd010.1',
      latex: L`x_C = r\cos\theta + l\cos\gamma`,
      perche: 'Proiezione sull\'asse $x$ della spezzata $A\\to B\\to C$: la manovella contribuisce $r\\cos\\theta$ (fino al piede $H$), la biella $l\\cos\\gamma$.',
      fonte: D(31),
      distrattori: [],
      num: (v) => [v.xC, v.r * Math.cos(v.th) + v.l * Math.cos(v.gGeo)],
    },
    {
      id: 'd010.2',
      latex: L`\theta = \omega_1 t`,
      perche: 'La manovella ruota con velocità angolare costante e antioraria: l\'angolo cresce linearmente nel tempo.',
      fonte: D(31),
      distrattori: [],
    },
    {
      id: 'd010.3',
      latex: L`y_B = r\sin\theta = l\sin\gamma \;\Rightarrow\; \sin\gamma = \lambda\sin\theta,\quad \lambda = \dfrac{r}{l}`,
      perche: 'Il punto $B$ è comune a manovella e biella: la sua quota si scrive in due modi (il pistone è sull\'asse $x$). Uguagliando si lega l\'angolo di biella a quello di manovella.',
      fonte: D(31),
      chiave: true,
      distrattori: [
        { latex: L`\sin\gamma = \dfrac{\sin\theta}{\lambda}`, errore: 'indice', spiega: 'Da r sin θ = l sin γ si ha sin γ = (r/l) sin θ: con λ < 1 la biella è sempre meno inclinata della manovella.', num: (v) => [Math.sin(v.gGeo), Math.sin(v.th) / v.lam] },
        { latex: L`r\cos\theta = l\cos\gamma`, errore: 'concetto', spiega: 'Il vincolo comune è la quota di B (asse y): le ascisse si sommano, non si uguagliano.', num: (v) => [v.r * Math.cos(v.th), v.l * Math.cos(v.gGeo)] },
      ],
      num: (v) => [v.l * Math.sin(v.gGeo), v.r * Math.sin(v.th)],
    },
    {
      id: 'd010.4',
      latex: L`\cos^2\gamma = 1 - \lambda^2\sin^2\theta`,
      perche: 'Si eleva al quadrato e si usa $\\sin^2\\gamma + \\cos^2\\gamma = 1$.',
      fonte: D(31),
      distrattori: [
        { latex: L`\cos^2\gamma = 1 - \lambda\sin^2\theta`, errore: 'fattore', spiega: 'Elevando al quadrato sin γ = λ sin θ anche λ va al quadrato.', num: (v) => [Math.cos(v.gGeo) ** 2, 1 - v.lam * Math.sin(v.th) ** 2] },
      ],
      num: (v) => [Math.cos(v.gGeo) ** 2, 1 - v.lam ** 2 * Math.sin(v.th) ** 2],
    },
    {
      id: 'd010.5',
      latex: L`x_C = r\cos\theta + l\sqrt{1-\lambda^2\sin^2\theta} = r\cos\theta + \sqrt{l^2 - r^2\sin^2\theta}`,
      perche: 'Si prende la radice positiva ($\\cos\\gamma > 0$ perché $\\lambda < 1$) e si sostituisce: è la legge **esatta** della posizione, da cui si deriva la velocità. La dispensa passa subito all\'approssimazione (d013).',
      fonte: DED('p. 31', 'sostituzione di cos γ = √(1 − λ² sin² θ) nella x_C della dispensa: forma chiusa non scritta in D'),
      chiave: true,
      distrattori: [
        { latex: L`x_C = r\cos\theta + \sqrt{1-\lambda^2\sin^2\theta}`, errore: 'fattore', spiega: 'Manca la lunghezza di biella l davanti alla radice: la radice è cos γ, adimensionale.', num: (v) => [v.xC, v.r * Math.cos(v.th) + Math.sqrt(1 - v.lam ** 2 * Math.sin(v.th) ** 2)] },
        { latex: L`x_C = r\cos\theta - l\sqrt{1-\lambda^2\sin^2\theta}`, errore: 'segno', spiega: 'Con λ < 1 la biella punta sempre verso il pistone: cos γ > 0, radice positiva.', num: (v) => [v.xC, v.r * Math.cos(v.th) - v.l * Math.sqrt(1 - v.lam ** 2 * Math.sin(v.th) ** 2)] },
      ],
      num: (v) => [v.xC, v.r * Math.cos(v.th) + Math.sqrt(v.l ** 2 - v.r ** 2 * Math.sin(v.th) ** 2)],
    },
    {
      id: 'd010.6',
      latex: L`\theta = 0:\ x_C = r + l\ (\text{PMS});\quad \theta = \pi:\ x_C = l - r\ (\text{PMI});\quad \text{corsa} = 2r`,
      perche: 'Ai punti morti manovella e biella sono allineate: punto morto superiore con $\\theta = 0$, inferiore con $\\theta = \\pi$ (p. 26). La corsa è il doppio della manovella, non dipende da $l$ (nell\'esempio di p. 32: 0,12 e 0,06 m, corsa 0,06 m).',
      fonte: DED('pp. 26 e 32', 'legge esatta valutata ai punti morti della dispensa; confronto con i grafici di p. 32'),
      distrattori: [
        { latex: L`\text{corsa} = 2l`, errore: 'indice', spiega: 'La biella resta allineata in entrambi i punti morti: la differenza delle due posizioni è 2r.', num: (v) => [v.xC0 - v.xCpi, 2 * v.l] },
      ],
      num: (v) => [v.xC0 - v.xCpi, 2 * v.r],
    },
  ],
  risultato: { latex: L`x_C = r\cos\theta + l\cos\gamma,\quad \sin\gamma = \lambda\sin\theta \;\Rightarrow\; x_C = r\cos\theta + l\sqrt{1-\lambda^2\sin^2\theta}`, fonte: D(31) },
  gancio: 'Prima la chiusura geometrica (la quota di B in due modi), poi le derivate.',
};

// ------------------------------------------------------------------ d013 legge approssimata (pp. 31–32)
export const d013: Dimostrazione = {
  id: 'd013',
  titolo: 'Manovellismo: legge approssimata della corsa',
  enunciato: 'Ottenere l\'approssimazione della posizione del pistone per λ = r/l piccolo.',
  ipotesi: ['λ ≪ 1 per scelta progettuale: si trascurano i termini in λ⁴', 'cos γ > 0 (λ < 1)'],
  sample: sampleM,
  passi: [
    {
      id: 'd013.1',
      latex: L`\cos^2\gamma = 1 - \lambda^2\sin^2\theta`,
      perche: 'Si parte dalla relazione esatta fra gli angoli (d010).',
      fonte: D(31),
      distrattori: [],
      num: (v) => [Math.cos(v.gGeo) ** 2, 1 - v.lam ** 2 * Math.sin(v.th) ** 2],
    },
    {
      id: 'd013.2',
      latex: L`\cos^2\gamma = 1 - \lambda^2\sin^2\theta + \dfrac{\lambda^4}{4}\sin^4\theta - \dfrac{\lambda^4}{4}\sin^4\theta = \left(1 - \dfrac{\lambda^2}{2}\sin^2\theta\right)^2 - \dfrac{\lambda^4}{4}\sin^4\theta`,
      perche: 'Si aggiunge e si toglie lo stesso termine per completare il quadrato: è un\'identità esatta, non ancora un\'approssimazione.',
      fonte: D(31),
      chiave: true,
      distrattori: [
        { latex: L`\cos^2\gamma = \left(1 - \dfrac{\lambda^2}{2}\sin^2\theta\right)^2`, errore: 'termine-perso', spiega: 'Qui il termine λ⁴ sin⁴θ/4 va ancora tolto: lo si trascura solo nel passo successivo, dichiarando λ ≪ 1.', num: (v) => [Math.cos(v.gGeo) ** 2, (1 - (v.lam ** 2 / 2) * Math.sin(v.th) ** 2) ** 2] },
        { latex: L`\cos^2\gamma = \left(1 - \lambda^2\sin^2\theta\right)^2 - \lambda^4\sin^4\theta`, errore: 'fattore', spiega: 'Il doppio prodotto di (1 − λ²sin²θ/2)² è −λ²sin²θ: serve il fattore 1/2.', num: (v) => [Math.cos(v.gGeo) ** 2, (1 - v.lam ** 2 * Math.sin(v.th) ** 2) ** 2 - v.lam ** 4 * Math.sin(v.th) ** 4] },
      ],
      num: (v) => [Math.cos(v.gGeo) ** 2, (1 - (v.lam ** 2 / 2) * Math.sin(v.th) ** 2) ** 2 - (v.lam ** 4 / 4) * Math.sin(v.th) ** 4],
    },
    {
      id: 'd013.3',
      latex: L`\lambda \ll 1 \;\Rightarrow\; \cos\gamma \simeq 1 - \dfrac{\lambda^2}{2}\sin^2\theta`,
      perche: 'Il termine $\\frac{\\lambda^4}{4}\\sin^4\\theta$ è del quarto ordine in $\\lambda$: si trascura e si prende la radice positiva. È un\'approssimazione (la dispensa scrive «=»); equivale a $\\sqrt{1-u}\\simeq 1 - u/2$ con $u = \\lambda^2\\sin^2\\theta$.',
      fonte: D(31),
      chiave: true,
      correzione: { nf: 'NF-36', dispensaScrive: L`\cos\gamma = 1 - \frac{\lambda^2}{2}\sin^2\theta` },
      distrattori: [
        { latex: L`\cos\gamma \simeq 1 - \lambda^2\sin^2\theta`, errore: 'fattore', spiega: 'Quello è cos²γ: estraendo la radice il termine si dimezza.', num: (v) => [Math.cos(v.gGeo), 1 - v.lam ** 2 * Math.sin(v.th) ** 2] },
        { latex: L`\cos\gamma \simeq 1 - \dfrac{\lambda}{2}\sin^2\theta`, errore: 'fattore', spiega: 'La correzione è del secondo ordine in λ: λ²/2, non λ/2.', num: (v) => [Math.cos(v.gGeo), 1 - (v.lam / 2) * Math.sin(v.th) ** 2] },
      ],
    },
    {
      id: 'd013.4',
      latex: L`x_C \simeq r\cos\theta + l\left(1 - \dfrac{\lambda^2}{2}\sin^2\theta\right) = r\cos\omega_1 t + l\left(1 - \dfrac{\lambda^2}{2}\sin^2\omega_1 t\right)`,
      perche: 'Si sostituisce nella legge della posizione con $\\theta = \\omega_1 t$: è la legge approssimata che la dispensa deriva per velocità e accelerazione.',
      fonte: D(32),
      correzione: { nf: 'NF-36', dispensaScrive: L`x_C = r\cos\omega_1 t + l\left(1 - \frac{\lambda^2}{2}\sin^2\omega_1 t\right)` },
      distrattori: [],
    },
    {
      id: 'd013.5',
      latex: L`\sin^2\theta = \dfrac{1-\cos2\theta}{2} \;\Rightarrow\; x_C \simeq \left(l - \dfrac{r^2}{4l}\right) + r\cos\theta + \dfrac{r^2}{4l}\cos2\theta`,
      perche: 'Con la formula di duplicazione la posizione approssimata diventa una costante più due armoniche: la primaria in $\\theta$ di ampiezza $r$ e la secondaria in $2\\theta$ di ampiezza $r^2/4l = \\lambda r/4$, che nasce dalla lunghezza finita della biella. La dispensa non scrive questa forma (NF-111).',
      fonte: DED('p. 32', 'formula di duplicazione applicata alla legge approssimata; la dispensa mostra le due armoniche solo in V_C e a_C'),
      distrattori: [
        { latex: L`x_C \simeq l + r\cos\theta + \dfrac{r^2}{4l}\cos2\theta`, errore: 'termine-perso', spiega: 'Dalla duplicazione resta anche una costante −r²/4l.', num: (v) => [v.xA, v.l + v.r * Math.cos(v.th) + (v.r ** 2 / (4 * v.l)) * Math.cos(2 * v.th)] },
      ],
      num: (v) => [v.xA, v.l - v.r ** 2 / (4 * v.l) + v.r * Math.cos(v.th) + (v.r ** 2 / (4 * v.l)) * Math.cos(2 * v.th)],
    },
  ],
  risultato: { latex: L`x_C \simeq r\cos\omega_1 t + l\left(1 - \dfrac{\lambda^2}{2}\sin^2\omega_1 t\right)`, fonte: D(32), correzione: { nf: 'NF-36', dispensaScrive: '«=» al posto di «≃»' } },
  gancio: 'Completa il quadrato, butta λ⁴: la biella finita aggiunge una seconda armonica.',
};

// ------------------------------------------------------------------ d011 velocità del pistone (pp. 26, 32)
export const d011: Dimostrazione = {
  id: 'd011',
  titolo: 'Manovellismo: velocità del pistone',
  enunciato: 'Derivare la velocità del pistone: forma approssimata della dispensa, forma esatta e lettura con il CIR della biella; velocità ai punti morti.',
  ipotesi: ['ω₁ costante, θ = ω₁t', 'legge approssimata per λ ≪ 1 (d013) e legge esatta (d010)'],
  sample: sampleM,
  passi: [
    {
      id: 'd011.1',
      latex: L`V_C = \dfrac{dx_C}{dt} = -r\omega_1\sin\theta - l\,\lambda^2\,\omega_1\sin\theta\cos\theta`,
      perche: 'Il pistone si muove solo lungo $x$: la sua velocità è la derivata di $x_C$. Si deriva la legge approssimata con la regola della catena ($\\dot\\theta = \\omega_1$).',
      fonte: D(32),
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.VA, -v.r * v.w * Math.sin(v.th) - v.l * v.lam ** 2 * v.w * Math.sin(v.th) * Math.cos(v.th)],
    },
    {
      id: 'd011.2',
      latex: L`l\lambda^2 = r\lambda,\ \sin\theta\cos\theta = \tfrac12\sin2\theta \;\Rightarrow\; V_C \simeq -r\omega_1\left[\sin\omega_1 t + \dfrac{\lambda}{2}\sin2\omega_1 t\right]`,
      perche: 'Si raccoglie $-r\\omega_1$: la velocità del pistone è la somma di due armoniche, con pulsazioni $\\omega_1$ e $2\\omega_1$. La seconda sparirebbe con biella infinita ($\\lambda \\to 0$).',
      fonte: D(32),
      chiave: true,
      correzione: { nf: 'NF-36', dispensaScrive: L`V_C = -r\omega_1\left[\sin(\omega_1 t) + \frac{\lambda}{2}\sin(2\omega_1 t)\right]` },
      distrattori: [
        { latex: L`V_C \simeq -r\omega_1\left[\sin\omega_1 t + \lambda\sin2\omega_1 t\right]`, errore: 'fattore', spiega: 'sin θ cos θ = ½ sin 2θ: il coefficiente della seconda armonica è λ/2 (λ è quello dell\'accelerazione).', num: (v) => [v.VA, -v.r * v.w * (Math.sin(v.th) + v.lam * Math.sin(2 * v.th))] },
        { latex: L`V_C \simeq -r\omega_1\sin\omega_1 t`, errore: 'termine-perso', spiega: 'Così la biella sarebbe infinitamente lunga: con λ finito c\'è la seconda armonica.', num: (v) => [v.VA, -v.r * v.w * Math.sin(v.th)] },
        { latex: L`V_C \simeq +r\omega_1\left[\sin\omega_1 t + \dfrac{\lambda}{2}\sin2\omega_1 t\right]`, errore: 'segno', spiega: 'Per 0 < θ < π il pistone si avvicina ad A (x_C diminuisce): V_C < 0.', num: (v) => [v.VA, v.r * v.w * (Math.sin(v.th) + (v.lam / 2) * Math.sin(2 * v.th))] },
      ],
      num: (v) => [v.VA, -v.r * v.w * (Math.sin(v.th) + (v.lam / 2) * Math.sin(2 * v.th))],
    },
    {
      id: 'd011.3',
      latex: L`\sin\gamma = \lambda\sin\theta \;\Rightarrow\; \dot\gamma\cos\gamma = \lambda\,\omega_1\cos\theta \;\Rightarrow\; \dot\gamma = \dfrac{\lambda\,\omega_1\cos\theta}{\cos\gamma}`,
      perche: 'Per la forma esatta serve la velocità angolare della biella: si deriva il vincolo sulla quota di $B$. La velocità angolare della biella è $\\omega_2 = -\\dot\\gamma$ (con $\\gamma$ misurato come in figura).',
      fonte: DED('p. 31 (sin γ = λ sin θ)', 'derivata nel tempo del vincolo; la dispensa non la fa (q03, NF-109)'),
      distrattori: [
        { latex: L`\dot\gamma = \lambda\,\omega_1`, errore: 'termine-perso', spiega: 'Derivando seno a destra e a sinistra compaiono i coseni: vale λω₁ solo ai punti morti con θ = 0.', num: (v) => [v.gd, v.lam * v.w] },
      ],
      num: (v) => [v.gd, (v.lam * v.w * Math.cos(v.th)) / Math.cos(v.g)],
    },
    {
      id: 'd011.4',
      latex: L`V_C = -r\omega_1\sin\theta - l\,\dot\gamma\sin\gamma = -r\omega_1\,\dfrac{\sin(\theta+\gamma)}{\cos\gamma}`,
      perche: 'Si deriva la legge esatta $x_C = r\\cos\\theta + l\\cos\\gamma$ e si sostituisce $\\dot\\gamma$; raccogliendo con la formula di addizione del seno si ottiene una forma compatta, valida per qualsiasi $\\lambda < 1$.',
      fonte: DED('p. 31 (x_C esatta)', 'derivata della legge esatta di posizione (q03, d011); non scritta nella dispensa (NF-109)'),
      chiave: true,
      distrattori: [
        { latex: L`V_C = -r\omega_1\sin\theta`, errore: 'termine-perso', spiega: 'Si è dimenticato che anche l\'angolo di biella γ cambia nel tempo.', num: (v) => [v.VC, -v.r * v.w * Math.sin(v.th)] },
        { latex: L`V_C = -r\omega_1\,\dfrac{\sin(\theta-\gamma)}{\cos\gamma}`, errore: 'segno', spiega: 'sin θ cos γ + cos θ sin γ = sin(θ + γ).', num: (v) => [v.VC, (-v.r * v.w * Math.sin(v.th - v.g)) / Math.cos(v.g)] },
      ],
      num: (v) => [v.VC, (-v.r * v.w * Math.sin(v.th + v.g)) / Math.cos(v.g)],
    },
    {
      id: 'd011.5',
      latex: L`\vec V_B = \vec\omega_2\wedge(B-K),\quad \vec V_C = \vec\omega_2\wedge(C-K) \;\Rightarrow\; \dfrac{V_C}{V_B} = \dfrac{\overline{KC}}{\overline{KB}}`,
      perche: 'Metodo grafico: il CIR $K$ della biella sta sul prolungamento della manovella (normale a $\\vec V_B$) e sulla normale alla guida per $C$. Le velocità di $B$ e $C$ stanno come le distanze da $K$ (q31).',
      fonte: D(26),
      distrattori: [
        { latex: L`\dfrac{V_C}{V_B} = \dfrac{\overline{KB}}{\overline{KC}}`, errore: 'indice', spiega: 'La velocità è proporzionale alla distanza dal CIR: il punto più lontano da K è il più veloce.', num: (v) => [Math.abs(v.VC) / norm(get(v, 'VB')), norm(sub(get(v, 'B'), get(v, 'K'))) / norm(sub(get(v, 'C'), get(v, 'K')))] },
      ],
      num: (v) => [Math.abs(v.VC) / norm(get(v, 'VB')), norm(sub(get(v, 'C'), get(v, 'K'))) / norm(sub(get(v, 'B'), get(v, 'K')))],
    },
    {
      id: 'd011.6',
      latex: L`\theta = 0,\ \pi:\ \sin\theta = \sin\gamma = 0 \;\Rightarrow\; V_C = 0,\quad K\equiv C`,
      perche: 'Ai punti morti manovella e biella sono allineate: la normale a $\\vec V_B$ coincide con l\'asse e incontra la normale alla guida proprio in $C$, che è quindi il CIR e ha velocità nulla. La biella però ruota ($\\omega_2 = \\mp\\lambda\\omega_1$): non è ferma.',
      fonte: D(26),
      chiave: true,
      distrattori: [
        { latex: L`\theta = \pm\dfrac{\pi}{2}:\ V_C = 0`, errore: 'concetto', spiega: 'A θ = 90° la velocità del pistone è circa massima; si annulla quando manovella e biella sono allineate.', num: (v) => [manovellismo({ r: v.r, l: v.l, theta: Math.PI / 2, omega1: v.w }).VC, 0] },
        { latex: L`\theta = 0,\ \pi:\ \omega_2 = 0`, errore: 'concetto', spiega: 'È il pistone a fermarsi, non la biella: ω₂ = ∓λω₁ (la biella ruota attorno a C).', num: (v) => [manovellismo({ r: v.r, l: v.l, theta: 0, omega1: v.w }).omega2, 0] },
      ],
      num: (v) => [Math.abs(v.VC0) + Math.abs(v.VCpi), 0],
    },
  ],
  risultato: { latex: L`V_C \simeq -r\omega_1\left[\sin\omega_1 t + \tfrac{\lambda}{2}\sin2\omega_1 t\right],\qquad V_C = -r\omega_1\,\dfrac{\sin(\theta+\gamma)}{\cos\gamma}`, fonte: D(32) },
  gancio: 'Due armoniche, ω₁ e 2ω₁; ai punti morti K ≡ C e il pistone si ferma.',
};

// ------------------------------------------------------------------ d012 accelerazione del pistone (pp. 26–27, 32)
export const d012: Dimostrazione = {
  id: 'd012',
  titolo: 'Manovellismo: accelerazione del pistone',
  enunciato: 'Ricavare l\'accelerazione del pistone con il poligono delle accelerazioni e analiticamente; armonica primaria e secondaria; valori ai punti morti.',
  ipotesi: ['ω₁ costante: ω̇₁ = 0', 'legge approssimata (λ ≪ 1) per la forma analitica'],
  sample: sampleM,
  passi: [
    {
      id: 'd012.1',
      latex: L`\vec a_B = \cancel{\vec a_A} + \cancel{\dot{\vec\omega}_1\wedge(B-A)} - \omega_1^2(B-A) = -\omega_1^2(B-A)`,
      perche: 'Rivals sulla manovella con polo nella cerniera fissa $A$: con $\\omega_1$ costante $B$ ha solo accelerazione centripeta, diretta da $B$ verso $A$.',
      fonte: D(26),
      distrattori: [
        { latex: L`\vec a_B = 0`, errore: 'concetto', spiega: 'ω₁ costante non vuol dire accelerazione nulla: B percorre una circonferenza, c\'è la centripeta.', num: (v) => [pv(v, 'aB'), 0] },
      ],
      num: (v) => [pv(v, 'aB'), -v.w * v.w * pv(v, 'B')],
    },
    {
      id: 'd012.2',
      latex: L`\vec a_C = \vec a_B + \dot{\vec\omega}_2\wedge(C-B) - \omega_2^2(C-B)`,
      perche: 'Rivals sulla biella da $B$ a $C$: di $\\vec a_B$ si conosce tutto; di $-\\omega_2^2(C-B)$ modulo, direzione e verso; di $\\dot{\\vec\\omega}_2\\wedge(C-B)$ solo la direzione ($\\perp$ biella); di $\\vec a_C$ la direzione (guida). Due incognite scalari: si chiude il poligono.',
      fonte: D(27),
      chiave: true,
      distrattori: [
        { latex: L`\vec a_C = \vec a_B - \omega_2^2(C-B)`, errore: 'ipotesi', spiega: 'ω₁ è costante, ω₂ no: la velocità angolare della biella cambia con θ, quindi c\'è il termine tangenziale.', num: (v) => [pv(v, 'aCv'), pv(v, 'aB') - v.w2 ** 2 * pj(CB(v))] },
        { latex: L`\vec a_C = \vec a_B + \dot{\vec\omega}_2\wedge(C-B)`, errore: 'termine-perso', spiega: 'Manca la centripeta della biella −ω₂²(C − B), che è nota perché ω₂ si ricava dalle velocità.', num: (v) => [pv(v, 'aCv'), pv(v, 'aB') + pj(wedge(v.w2d, CB(v)))] },
      ],
      num: (v) => [pv(v, 'aCv'), pv(v, 'aB') + pj(wedge(v.w2d, CB(v))) - v.w2 ** 2 * pj(CB(v))],
    },
    {
      id: 'd012.3',
      latex: L`a_C \simeq \dfrac{dV_C}{dt} = -r\omega_1^2\left[\cos\omega_1 t + \lambda\cos2\omega_1 t\right]`,
      perche: 'Analiticamente si deriva la velocità approssimata: dalla seconda armonica $\\frac{\\lambda}{2}\\sin2\\omega_1 t$ esce $\\lambda\\cos2\\omega_1 t$ (il 2 della pulsazione semplifica l\'1/2).',
      fonte: D(32),
      chiave: true,
      correzione: { nf: 'NF-36', dispensaScrive: L`a_C = -r\omega_1^2\left[\cos(\omega_1 t) + \lambda\cos(2\omega_1 t)\right]` },
      distrattori: [
        { latex: L`a_C \simeq -r\omega_1^2\left[\cos\omega_1 t + \dfrac{\lambda}{2}\cos2\omega_1 t\right]`, errore: 'fattore', spiega: 'Derivando sin 2ω₁t esce un 2: (λ/2)·2 = λ.', num: (v) => [v.aA, -v.r * v.w ** 2 * (Math.cos(v.th) + (v.lam / 2) * Math.cos(2 * v.th))] },
        { latex: L`a_C \simeq -r\omega_1^2\left[\cos\omega_1 t + 2\lambda\cos2\omega_1 t\right]`, errore: 'fattore', spiega: 'Il coefficiente della velocità era λ/2, non λ: (λ/2)·2 = λ.', num: (v) => [v.aA, -v.r * v.w ** 2 * (Math.cos(v.th) + 2 * v.lam * Math.cos(2 * v.th))] },
      ],
      num: (v) => [v.aA, -v.r * v.w ** 2 * (Math.cos(v.th) + v.lam * Math.cos(2 * v.th))],
    },
    {
      id: 'd012.4',
      latex: L`a_I = -r\omega_1^2\cos\omega_1 t,\qquad a_{II} = -\lambda\,r\omega_1^2\cos2\omega_1 t`,
      perche: 'Anche l\'accelerazione è somma di due armoniche: la primaria (come un moto armonico di ampiezza $r$) e la secondaria a pulsazione doppia, di ampiezza $\\lambda$ volte la primaria, dovuta alla biella finita.',
      fonte: D(32),
      distrattori: [],
    },
    {
      id: 'd012.5',
      latex: L`\text{PMS } (\theta = 0):\ a_C = -r\omega_1^2(1+\lambda);\qquad \text{PMI } (\theta = \pi):\ a_C = +r\omega_1^2(1-\lambda)`,
      perche: 'Ai punti morti le due armoniche si sommano (PMS) o si sottraggono (PMI): il pistone è fermo ma la sua accelerazione è massima in modulo al PMS. Qui la forma approssimata coincide con quella esatta, perché $\\gamma = 0$. Esempio di p. 32 ($r = 0{,}03$ m, $\\lambda = 1/3$, 1000 giri/min): $-438{,}6$ e $+219{,}3$ m/s².',
      fonte: DED('p. 32 (formula e grafico di a_C)', 'valori della formula ai punti morti, confrontati con i minimi e massimi del grafico'),
      distrattori: [
        { latex: L`\theta = 0,\ \pi:\ a_C = 0`, errore: 'concetto', spiega: 'Velocità nulla non vuol dire accelerazione nulla: ai punti morti il pistone inverte il moto, l\'accelerazione è massima in modulo.', num: (v) => [Math.abs(v.aC0), 0] },
        { latex: L`\text{PMS}:\ a_C = -r\omega_1^2(1-\lambda)`, errore: 'segno', spiega: 'A θ = 0 sia cos θ sia cos 2θ valgono 1: le armoniche si sommano.', num: (v) => [v.aC0, -v.r * v.w ** 2 * (1 - v.lam)] },
      ],
      num: (v) => [v.aC0 + 2 * v.aCpi, -v.r * v.w ** 2 * (1 + v.lam) + 2 * v.r * v.w ** 2 * (1 - v.lam)],
    },
  ],
  risultato: { latex: L`a_C \simeq -r\omega_1^2\left[\cos\omega_1 t + \lambda\cos2\omega_1 t\right]`, fonte: D(32), correzione: { nf: 'NF-36', dispensaScrive: '«=» al posto di «≃»' } },
  gancio: 'La seconda armonica è il prezzo della biella finita: al PMS le armoniche si sommano, (1 + λ).',
};

// ------------------------------------------------------------------ argomento
const M0 = { r: 0.03, l: 0.09, omega1: (1000 * 2 * Math.PI) / 60 };
export const manovellismoArg: ArgomentoContenuto = {
  id: 'c1-manovellismo',
  cosaDireSubito:
    'Il manovellismo di spinta trasforma la rotazione della manovella nel moto alternativo del pistone, o viceversa. Ha tre membri mobili — manovella AB, biella BC, pistone C — con tre coppie rotoidali e una prismatica: 9 − 8 = 1 grado di libertà. Ai punti morti, θ = 0 e θ = π, manovella e biella sono allineate: il CIR della biella coincide con C e la velocità del pistone è nulla.',
  sistemaIpotesi: [
    'Sistema: telaio, manovella 1 (AB = r, cerniera fissa A), biella 2 (BC = l), pistone 3 (C) su guida fissa; manovellismo centrato: asse del pistone per A.',
    'Manovella con ω₁ costante e antioraria: θ = ω₁t, ω̇₁ = 0.',
    'λ = r/l < 1 (per scelta progettuale molto minore di 1: si trascura λ⁴).',
    'Statica: masse trascurate; attrito nella guida trascurato nella dispensa (con attrito: deduzione, NF-108).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Manovellismo di spinta centrato con il CIR della biella (dispensa pp. 25–26): K sul prolungamento di AB e sulla normale alla guida per C.',
    fonte: D([25, 26], 'schema cinematico e figure manoscritte'),
    elementi: [
      { id: 'assi', testo: 'assi x, y con origine nella cerniera fissa A; asse del pistone = asse x', obbligatorio: true },
      { id: 'membri', testo: 'manovella 1 (AB), biella 2 (BC), pistone 3 nella guida fissa, numerati', obbligatorio: true },
      { id: 'angoli', testo: 'angolo di manovella θ in A e angolo di biella γ in C', obbligatorio: true },
      { id: 'vB', testo: 'ω₁ antioraria e V_B ⊥ AB', obbligatorio: true },
      { id: 'cir', testo: 'CIR K della biella: prolungamento di AB ∩ normale alla guida per C', obbligatorio: true },
      { id: 'vC', testo: 'V_C lungo la guida e verso di ω₂', obbligatorio: false },
      { id: 'quota', testo: 'x_C e il piede H di B sull\'asse', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`x_C = r\cos\theta + l\cos\gamma,\qquad r\sin\theta = l\sin\gamma\quad(\lambda = r/l)`,
    spiegazione: 'Chiusura geometrica: ascissa del pistone e quota del punto B scritta dai due membri.',
    fonte: D(31),
  },
  dimostrazioni: ['d010', 'd013', 'd011', 'd012'],
  significato:
    'Se la biella fosse infinita il pistone farebbe un moto armonico; con la biella finita compare una seconda armonica a 2ω₁, di peso λ, che rende il moto asimmetrico (accelerazione più grande al PMS che al PMI). Ai punti morti il pistone si ferma e, staticamente, una forza sul pistone ha braccio nullo rispetto ad A: non può far girare la manovella. Per questo serve un volano o più cilindri sfasati.',
  fraseDaRicordare: 'Ai punti morti manovella e biella sono allineate: K ≡ C, V_C = 0, braccio nullo; la biella però continua a ruotare.',
  daNonDire: [
    { frase: 'Ai punti morti la biella è ferma.', perche: 'È fermo il pistone: la biella ruota attorno a C con ω₂ = ∓λω₁.', fonte: DED('p. 26', 'ω₂ = −λω₁cos θ/cos γ valutata a θ = 0, π (verificata con SymPy)') },
    { frase: 'La biella ruota sempre in verso orario.', perche: 'Orario solo per |θ| < 90°; a θ = ±90° ω₂ = 0 (CIR all\'infinito), oltre è antiorario (NF-101).', fonte: D(26) },
    { frase: 'V_C = −rω₁[sin θ + (λ/2) sin 2θ] è la velocità esatta.', perche: 'È approssimata al secondo ordine in λ (la dispensa scrive «=»): l\'esatta è −rω₁ sin(θ+γ)/cos γ (NF-36, NF-109).', fonte: D(32) },
    { frase: 'Ai punti morti anche l\'accelerazione del pistone è nulla.', perche: 'È massima in modulo: −rω₁²(1+λ) al PMS, rω₁²(1−λ) al PMI.', fonte: D(32) },
    { frase: 'L\'attrito nella guida sposta (o elimina) i punti morti.', perche: 'I punti morti sono geometrici; l\'attrito cambia la forza nella biella e la coppia, non la posizione dei punti morti (NF-108).', fonte: DED('p. 74 (angolo d\'attrito)', 'equilibrio del pistone con la reazione della guida inclinata dell\'angolo d\'attrito') },
    { frase: 'Il CIR del pistone è in C.', perche: 'Il pistone trasla: il suo CIR è all\'infinito in direzione normale alla guida; C è il CIR della biella solo ai punti morti (NF-102).', fonte: D(26) },
  ],
  approfondimenti: [
    { domanda: 'Dammi i nomi dei membri e delle coppie, e il conto dei gradi di libertà.', tipo: 'approfondimento', attesa: 'Telaio 0, manovella 1 (A–B), biella 2 (B–C), pistone 3. Rotoidali in A (0–1), B (1–2), C (2–3), prismatica pistone–guida (3–0). 3 corpi × 3 = 9 GDL, 4 coppie × 2 = 8 gradi di vincolo: 1 GDL.', fonte: D(25) },
    { domanda: 'Dove sono i CIR dei tre membri mobili?', tipo: 'approfondimento', attesa: 'Manovella: in A (cerniera fissa). Biella: incrocio del prolungamento di AB con la normale alla guida per C. Pistone: all\'infinito, perché trasla. V_C/V_B = KC/KB.', fonte: DED('pp. 25–26 (CIR della manovella e della biella)', 'il CIR del pistone traslante è all\'infinito (NF-102)') },
    { domanda: 'In che verso ruota la biella?', tipo: 'approfondimento', attesa: 'Con ω₁ antioraria: oraria per |θ| < 90°, nulla a θ = 90° (K all\'infinito, la biella trasla istantaneamente), antioraria fra 90° e 270°. Ai punti morti ω₂ = ∓λω₁.', fonte: DED('p. 26', 'segno di ω₂ = −λω₁cos θ/cos γ (NF-101)') },
    { domanda: 'Perché si chiamano punti morti anche dal punto di vista statico?', tipo: 'collegamento', argomento: 'c1-statica-dinamica', attesa: 'La biella è a due forze: la spinta passa per BC. La coppia sulla manovella è C₁ = F₂,₁·b con b = r sin(θ+γ): ai punti morti b = 0, una forza sul pistone non dà coppia. Il motore monocilindrico supera il punto morto con l\'inerzia del volano o con più cilindri sfasati.', fonte: DED('p. 49 (C₁ = F₂,₁ b)', 'braccio della forza della biella rispetto ad A nullo con manovella e biella allineate (NF-108)') },
    { domanda: 'E se c\'è attrito fra pistone e guida?', tipo: 'collegamento', argomento: 'c2-attrito', attesa: 'La reazione della guida non è più normale: è inclinata dell\'angolo d\'attrito φ_att = arctan f contro il moto. Dall\'equilibrio del pistone P = F/(cos γ + f sin γ) e C₁ = −P r sin(θ+γ). L\'attrito cambia la coppia (e dissipa potenza), non i punti morti.', fonte: DED('p. 74 (angolo d\'attrito) e pp. 47–49 (statica del manovellismo)', 'equilibrio del pistone con T = f N (NF-108)') },
    { domanda: 'Fammi l\'esempio numerico della dispensa.', tipo: 'approfondimento', attesa: `r = 0,03 m, λ = 1/3 (l = 0,09 m), 1000 giri/min (ω₁ ≈ 104,7 rad/s, periodo 0,06 s): x_C fra 0,06 e 0,12 m, a_C(0) ≈ ${(manovellismo({ ...M0, theta: 0 }).aCapprox).toFixed(1).replace('.', ',')} m/s², a_C(π) ≈ +${(manovellismo({ ...M0, theta: Math.PI }).aCapprox).toFixed(1).replace('.', ',')} m/s².`, fonte: D(32) },
    { domanda: 'Dove è massima la velocità del pistone?', tipo: 'approfondimento', attesa: 'Non a 90°: dalla forma approssimata dV_C/dθ = 0 dà cos θ + λ cos 2θ = 0, cioè un po\' prima di 90° nella corsa verso A (e simmetricamente). A 90° la biella trasla e V_C = V_B = rω₁.', fonte: DED('p. 32', 'massimo della velocità approssimata; a θ = 90° K è all\'infinito e V_C = V_B (NF-109)') },
    { domanda: 'Perché si vuole λ piccolo?', tipo: 'approfondimento', attesa: 'Per scelta progettuale: la biella è più inclinata se λ è grande (spinte laterali sulla guida R₃ = F tan γ maggiori) e la seconda armonica pesa di più. Con λ ≪ 1 vale la legge approssimata.', fonte: DED('pp. 31, 48', 'λ ≪ 1 dichiarato a p. 31; R₃ = F tan γ dal triangolo delle forze di p. 48') },
  ],
  simboli: [
    { simbolo: '\\theta', significato: 'angolo di manovella (θ = ω₁t)' },
    { simbolo: '\\gamma', significato: 'angolo di biella sull\'asse x', altrove: 'φ in q03 e d010 (NF-13)' },
    { simbolo: '\\lambda = r/l', significato: 'rapporto manovella/biella', altrove: 'non usato in q03' },
    { simbolo: 'r,\\ l', significato: 'lunghezze di manovella e biella' },
    { simbolo: '\\omega_1,\\ \\omega_2', significato: 'velocità angolari di manovella e biella' },
    { simbolo: 'K', significato: 'CIR della biella', altrove: 'K₂₀ in q31 (telaio = 0)' },
    { simbolo: 'f', significato: 'coefficiente d\'attrito pistone–guida (deduzione)', altrove: 'μ in q03 (NF-08)' },
    { simbolo: '\\text{PMS},\\ \\text{PMI}', significato: 'punto morto superiore (θ = 0) e inferiore (θ = π)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c1-manovellismo' }],
  previsioni: [
    {
      id: 'c1-man-90',
      domanda: 'Manovella a θ = 90°: dov\'è il CIR della biella e quanto vale ω₂?',
      opzioni: ['in C, ω₂ = 0', 'all\'infinito, ω₂ = 0: la biella trasla istantaneamente', 'in B, ω₂ = ω₁', 'in A, ω₂ = −ω₁'],
      corretta: 1,
      spiega: 'V_B è orizzontale come V_C: le due normali sono verticali e parallele. Tutti i punti della biella hanno la stessa velocità, V_C = V_B = rω₁.',
      verify: () => {
        const m = manovellismo({ r: 0.05, l: 0.2, theta: Math.PI / 2, omega1: 10 });
        return m.cirAllInfinito && Math.abs(m.omega2) < 1e-9 && Math.abs(Math.abs(m.VC) - 0.5) < 1e-9 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c1-manovellismo' },
    },
    {
      id: 'c1-man-pms',
      domanda: 'Con λ = 1/3, il modulo dell\'accelerazione del pistone al PMS rispetto a quello al PMI è…',
      opzioni: ['uguale', 'doppio', 'metà', 'nullo in entrambi'],
      corretta: 1,
      spiega: '(1 + λ)/(1 − λ) = (4/3)/(2/3) = 2: al PMS le due armoniche si sommano, al PMI si sottraggono.',
      verify: () => {
        const a0 = manovellismo({ ...M0, theta: 0 }).aC, a1 = manovellismo({ ...M0, theta: Math.PI }).aC;
        const k = Math.abs(a0) / Math.abs(a1);
        return Math.abs(k - 2) < 1e-9 ? 1 : Math.abs(k - 1) < 1e-9 ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c1-manovellismo' },
    },
    {
      id: 'c1-man-vmax',
      domanda: 'Nella corsa verso A (0 < θ < π) la velocità del pistone è massima in modulo…',
      opzioni: ['a θ = 90°', 'prima di 90°', 'dopo 90°', 'ai punti morti'],
      corretta: 1,
      spiega: 'dV_C/dθ ∝ cos θ + λ cos 2θ: a 90° vale −λ < 0, quindi il massimo è già passato. Con biella infinita sarebbe a 90°.',
      verify: () => {
        let best = 0, thBest = 0;
        for (let k = 1; k < 18000; k++) {
          const th = (k * Math.PI) / 18000;
          const v = Math.abs(manovellismo({ r: 0.05, l: 0.2, theta: th, omega1: 1 }).VC);
          if (v > best) { best = v; thBest = th; }
        }
        return thBest < Math.PI / 2 - 1e-3 ? 1 : thBest > Math.PI / 2 + 1e-3 ? 2 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c1-manovellismo' },
    },
  ],
  nf: ['NF-13', 'NF-15', 'NF-36', 'NF-101', 'NF-102', 'NF-108', 'NF-109', 'NF-111'],
};
