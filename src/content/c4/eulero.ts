/**
 * C4 · Equazione di Eulero, legge della tensione, arco di scorrimento, coppia massima (domande q19, q45).
 * Dispensa pp. 140–147, 150–151 (appunti battuti e manoscritto). Errori dei casi di θ* a pp. 142, 146 (NF-20).
 */
import type { ArgomentoContenuto, Dimostrazione, Fonte } from '../types';
import { U } from '../../engine/num';
import { angle, arc, arrow, circle, dot, line, pt, rot, svg, text } from '../svg';
import { arcoAvvolto, integraEulero, simpson, tensioneArco } from '../../engine/c4';

const L = String.raw;
const D = (pag: number | [number, number]): Fonte => ({ tipo: 'dispensa', pag });

// ------------------------------------------------------------------ disegno (figure di p. 144 e p. 141)
function disegno() {
  const cx = 160, cy = 132, R = 72;
  const aP = 90, aS = 162, aQ = 270; // P₁ ingresso (in alto), S₁ separazione, Q₁ uscita (in basso)
  const [px, py] = pt(cx, cy, R, aP), [sx, sy] = pt(cx, cy, R, aS), [qx, qy] = pt(cx, cy, R, aQ);
  // concio ingrandito (p. 141): centro di curvatura in basso, apertura dθ esagerata
  const kx = 420, ky = 236, kr = 96, k0 = 74, k1 = 106;
  const face = (a: number) => { const [x0, y0] = pt(kx, ky, kr - 9, a), [x1, y1] = pt(kx, ky, kr + 9, a); return line(x0, y0, x1, y1, 'l', 2); };
  const tang = (a: number, s: 1 | -1, len: number): [number, number, number, number] => {
    const [x0, y0] = pt(kx, ky, kr, a);
    const t = (a * Math.PI) / 180;
    return [x0, y0, x0 + s * len * -Math.sin(t), y0 - s * len * Math.cos(t)];
  };
  const [l0x, l0y, l1x, l1y] = tang(k1, 1, 40); // faccia in θ (sinistra): T(θ) verso l'esterno del concio
  const [r0x, r0y, r1x, r1y] = tang(k0, -1, 48); // faccia in θ + dθ (destra): T(θ + dθ)
  const [mx, my] = pt(kx, ky, kr, 90);
  const [c0x, c0y] = pt(kx, ky, kr - 12, k0), [c1x, c1y] = pt(kx, ky, kr - 12, k1);
  return svg(520, 290, [
    circle(cx, cy, R, 'l'), dot(cx, cy, 'O₁', -14, 12),
    // arco di aderenza α₁ (P₁ → S₁) e di scorrimento θ* (S₁ → Q₁)
    arc(cx, cy, R + 5, aP, aS, 'v'), arc(cx, cy, R + 5, aS, aQ, 'a'),
    line(cx, cy, px, py, 'm'), line(cx, cy, sx, sy, 'm'), line(cx, cy, qx, qy, 'm'),
    angle(cx, cy, 30, aP, aS, 'α₁', 'm'), angle(cx, cy, 44, aS, aQ, 'θ*', 'a'),
    dot(px, py, 'P₁', -6, -12), dot(sx, sy, 'S₁', -14, -6), dot(qx, qy, 'Q₁', -6, 14),
    // rami: T₁ in alto (entra in P₁), T₂ in basso (esce da Q₁)
    line(px, py - 5, 320, py - 5, 'a', 3), line(qx, qy + 5, 320, qy + 5, 'a', 3),
    arrow(256, py - 5, 308, py - 5, 'f', 'T₁', 4, -12), arrow(256, qy + 5, 308, qy + 5, 'f', 'T₂', 4, 14),
    arrow(240, py - 19, 196, py - 19, 'v', 'V', -2, -9), arrow(196, qy + 19, 240, qy + 19, 'v', 'V', 2, 11),
    rot(cx, cy, R - 12, -55, -15, 'v', 'ω₁'), rot(cx, cy, 26, -10, 60, 'f', 'C₁'),
    text(cx - R - 12, cy - 58, 'aderenza', { c: 'v', size: 12, anchor: 'end' }),
    text(cx - R - 12, cy + 50, 'scorrimento', { c: 'a', size: 12, anchor: 'end' }),
    text(cx + 6, cy + R + 30, 'θ misurato da Q₁', { c: 'm', size: 12 }),
    // concio
    text(kx, 44, 'concio (p. 141)', { c: 'm', size: 12 }),
    arc(kx, ky, kr, k0, k1, 'a'), face(k0), face(k1),
    line(kx, ky, c0x, c0y, 'd'), line(kx, ky, c1x, c1y, 'd'),
    angle(kx, ky, 26, k0, k1, 'dθ', 'm'),
    arrow(l0x, l0y, l1x, l1y, 'f', 'T(θ)', -14, -12), arrow(r0x, r0y, r1x, r1y, 'f', 'T(θ+dθ)', -4, 16),
    arrow(mx - 6, my - 4, mx - 6, my - 40, 'f', 'dF_N', -26, 0), arrow(mx + 8, my - 4, mx + 8, my - 26, 'v', '', 0, 0),
    text(mx + 14, my - 34, 'dm V²/R', { c: 'v', size: 12, anchor: 'start' }),
    arrow(mx + 14, my + 14, mx - 22, my + 14, 'f', 'dF_T', -16, 10),
  ], 'Puleggia motrice con arco di aderenza e arco di scorrimento; concio di cinghia con le forze');
}

// ------------------------------------------------------------------ campioni
const base = (rnd: () => number) => {
  const rho = U(rnd, 0.1, 0.6), V = U(rnd, 5, 35), R = U(rnd, 0.05, 0.3), f = U(rnd, 0.15, 0.45);
  const rhoV2 = rho * V * V, T2 = rhoV2 + U(rnd, 50, 400);
  return { rho, V, R, f, rhoV2, T2 };
};
/** arco con coppia parziale: q = C/C_MAX ∈ (0,1) */
const conCoppia = (rnd: () => number) => {
  const b = base(rnd), beta = U(rnd, 2.4, 3.6), q = U(rnd, 0.1, 0.95), EA = U(rnd, 2e4, 2e5);
  const s = arcoAvvolto({ T2: b.T2, rhoV2: b.rhoV2, f: b.f, beta, C: 0, R: b.R });
  const C = q * s.Cmax, T1 = b.T2 + C / b.R;
  const thetaS = Math.log((T1 - b.rhoV2) / (b.T2 - b.rhoV2)) / b.f;
  return { ...b, beta, q, EA, Cmax: s.Cmax, C, T1, thetaS, alpha: beta - thetaS };
};

// ------------------------------------------------------------------ d057 forza centrifuga
export const d057: Dimostrazione = {
  id: 'd057',
  titolo: 'Forza centrifuga nella cinghia',
  enunciato: 'Ricavare la forza centrifuga su un concio di cinghia avvolto e il suo effetto sulla forza normale scambiata con la puleggia.',
  ipotesi: [
    'regime (ω̇ = 0): l\'unica forza d\'inerzia del concio è quella centrifuga',
    'velocità V costante, raggio R della puleggia; ρ massa per unità di lunghezza',
    'concio infinitesimo di apertura dθ: si trascurano gli infinitesimi di ordine superiore',
  ],
  sample: (rnd) => {
    const b = base(rnd), dth = U(rnd, 0.001, 0.02), h = 1e-6, T = b.T2;
    const ds = b.R * dth, dm = b.rho * ds, dFc = (dm * b.V * b.V) / b.R, dFN = T * dth - dFc, Vlim = Math.sqrt(b.T2 / b.rho);
    return { ...b, dth, h, T, ds, dm, dFc, dFN, Vlim };
  },
  passi: [
    {
      id: 'd057.1',
      latex: L`ds = R\,d\theta,\qquad dm = \rho\,ds = \rho R\,d\theta`,
      perche: L`Concio tra le sezioni $\theta$ e $\theta + d\theta$: è lungo $R\,d\theta$ e ha massa $\rho R\,d\theta$. La dispensa usa $\rho$ come massa per unità di lunghezza senza definirlo.`,
      fonte: D(141),
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.dm, v.rho * v.R * v.dth],
    },
    {
      id: 'd057.2',
      latex: L`dF_c = dm\,\dfrac{V^2}{R} = \rho V^2\,d\theta`,
      perche: L`Con l'impostazione di D'Alembert la forza d'inerzia del concio (accelerazione centripeta $V^2/R$) è la centrifuga, radiale verso l'esterno. Per unità d'angolo vale $\rho V^2$: non dipende dal raggio.`,
      fonte: D(141),
      chiave: true,
      correzione: { nf: 'NF-35', dispensaScrive: L`dm\,\frac{V(\theta)^2}{2}` },
      distrattori: [
        { latex: L`dF_c = dm\,\dfrac{V^2}{2}`, errore: 'fattore', spiega: 'È il refuso della prima equazione normale di p. 141 (NF-35): l\'accelerazione è V²/R.', num: (v) => [v.dFc, (v.dm * v.V * v.V) / 2] },
        { latex: L`dF_c = \rho V^2 R\,d\theta`, errore: 'fattore', spiega: 'Il raggio si semplifica: dm = ρR dθ e l\'accelerazione è V²/R.', num: (v) => [v.dFc, v.rho * v.V * v.V * v.R * v.dth] },
      ],
      num: (v) => [v.dFc, v.rhoV2 * v.dth],
    },
    {
      id: 'd057.3',
      latex: L`T(\theta+d\theta)\sin\dfrac{d\theta}{2} + T(\theta)\sin\dfrac{d\theta}{2} \simeq 2T\,\dfrac{d\theta}{2} = T\,d\theta`,
      perche: L`Le tensioni sono perpendicolari alle facce, inclinate di $d\theta/2$ sulla tangente nel punto medio: le loro componenti radiali, verso il centro, sommano a $T\,d\theta$ al primo ordine.`,
      fonte: D(141),
      correzione: { nf: 'NF-35', dispensaScrive: L`T(\theta+d\theta)\sin(\theta/2) + T(\theta)\sin(\theta/2)` },
      distrattori: [],
      num: (v) => [(2 * v.T * Math.sin(v.h / 2)) / v.h, v.T],
    },
    {
      id: 'd057.4',
      latex: L`-T\,d\theta + dF_N + \rho V^2\,d\theta = 0 \;\Rightarrow\; dF_N = (T - \rho V^2)\,d\theta`,
      perche: L`Equilibrio radiale: le tensioni spingono il concio verso il centro, la puleggia e la forza centrifuga verso l'esterno. La centrifuga «toglie» tensione utile: la cinghia preme sulla puleggia solo con $T - \rho V^2$.`,
      fonte: D(141),
      chiave: true,
      distrattori: [
        { latex: L`dF_N = (T + \rho V^2)\,d\theta`, errore: 'segno', spiega: 'La centrifuga tende a staccare la cinghia dalla puleggia: riduce la forza normale, non la aumenta.', num: (v) => [v.dFN, (v.T + v.rhoV2) * v.dth] },
        { latex: L`dF_N = T\,d\theta`, errore: 'termine-perso', spiega: 'È la forma valida solo per il nastro fermo (V = 0): con la cinghia in moto c\'è il termine centrifugo.', num: (v) => [v.dFN, v.T * v.dth] },
      ],
      num: (v) => [v.dFN, (v.T - v.rhoV2) * v.dth],
    },
    {
      id: 'd057.5',
      latex: L`dF_N > 0 \iff T > \rho V^2;\qquad T_2 = \rho V^2 \;\Rightarrow\; V = \sqrt{T_2/\rho}`,
      perche: L`Perché la cinghia resti attaccata, anche la tensione minima $T_2$ deve superare il valore limite $\rho V^2$: per questo la cinghia è pretensionata. A $V = \sqrt{T_2/\rho}$ la forza normale nel ramo lasco si annulla e la cinghia non trasmette più nulla. Le domande chiamano $\rho V^2$ «tensione centrifuga» $T_c$.`,
      fonte: D([140, 152]),
      chiave: true,
      distrattori: [
        { latex: L`V = \sqrt{\rho/T_2}`, errore: 'indice', spiega: 'Da ρV² = T₂ si ricava V² = T₂/ρ: la tensione sta al numeratore.', num: (v) => [v.rho * (v.rho / v.T2), v.T2] },
        { latex: L`V = T_2/\rho`, errore: 'fattore', spiega: 'Manca la radice: ρV² = T₂ dà V = √(T₂/ρ).', num: (v) => [v.rho * (v.T2 / v.rho) ** 2, v.T2] },
      ],
      num: (v) => [v.rho * v.Vlim * v.Vlim, v.T2],
    },
  ],
  risultato: { latex: L`dF_c = \rho V^2\,d\theta,\qquad dF_N = (T - \rho V^2)\,d\theta`, fonte: D(141) },
  gancio: 'La centrifuga per unità d\'angolo è ρV²: si sottrae alla tensione che preme la cinghia.',
};

// ------------------------------------------------------------------ d062 equilibrio del concio
export const d062: Dimostrazione = {
  id: 'd062',
  titolo: 'Equilibrio infinitesimo del flessibile sulla puleggia',
  enunciato: 'Scrivere l\'equilibrio tangenziale e radiale di un concio di cinghia avvolto e ricavare l\'equazione differenziale di Eulero.',
  ipotesi: [
    'regime (ω̇ = 0): forza d\'inerzia solo centrifuga, dm V²/R (D\'Alembert)',
    'aderenza: dT = 0; strisciamento (o incipiente): attrito coulombiano |dF_T| = f dF_N, opposto alla velocità relativa',
    'tensione crescente nel verso di θ crescente; forza normale e d\'inerzia applicate al centro del concio',
  ],
  sample: (rnd) => {
    const b = base(rnd), theta = U(rnd, 0, 3), h = 1e-9;
    const T = tensioneArco(b.T2, b.rhoV2, b.f, theta), dT = b.f * (b.T2 - b.rhoV2) * Math.exp(b.f * theta);
    const Tp = tensioneArco(b.T2, b.rhoV2, b.f, theta + h);
    const radial = ((Tp + T) * Math.sin(h / 2)) / h; // componenti radiali delle tensioni per unità di dθ
    const dFN = radial - b.rhoV2; // dall'equilibrio radiale
    const dFT = b.f * dFN; // incipiente strisciamento
    return { ...b, theta, h, T, dT, Tp, radial, dFN, dFT };
  },
  passi: [
    {
      id: 'd062.1',
      latex: L`\text{aderenza: } \dfrac{dT}{dz} = 0,\ V^{rel} = 0,\ dF_T^{ATTR} = 0 \;\Rightarrow\; T = \text{cost}`,
      perche: L`Un concio teso con la stessa tensione ai due estremi non tende ad allungarsi rispetto alla puleggia: niente velocità relativa, niente attrito, tensione costante.`,
      fonte: D(140),
      distrattori: [],
    },
    {
      id: 'd062.2',
      latex: L`\text{strisciamento: } dF_T^{ATTR} = -f\,|dF_N|\,\dfrac{\underline V^{rel}}{|\underline V^{rel}|}`,
      perche: L`Se la tensione cambia lungo il concio, il concio si allunga e striscia sulla puleggia: nasce l'attrito di Coulomb, proporzionale alla forza normale e opposto alla velocità relativa.`,
      fonte: D(140),
      distrattori: [],
    },
    {
      id: 'd062.3',
      latex: L`dm\,\dfrac{V^2}{R} = \rho R\,d\theta\,\dfrac{V^2}{R} = \rho V^2\,d\theta`,
      perche: L`Forza d'inerzia del concio: solo la componente centrifuga, perché $\dot\omega = 0$ (niente componente tangenziale). Si applica al centro del concio come la normale: spostarle darebbe differenze di ordine superiore.`,
      fonte: D(141),
      distrattori: [],
      num: (v) => [((v.rho * v.R * v.V * v.V) / v.R), v.rhoV2],
    },
    {
      id: 'd062.4',
      latex: L`T(\theta+d\theta)\cos\dfrac{d\theta}{2} - T(\theta)\cos\dfrac{d\theta}{2} - dF_T^{ATTR} = 0 \;\Rightarrow\; \dfrac{dT}{d\theta} = \dfrac{dF_T^{ATTR}}{d\theta}`,
      perche: L`Equilibrio tangenziale: $\cos(d\theta/2) \simeq 1$; la differenza di tensione è equilibrata dall'attrito (in modulo), che ha verso opposto a quello in cui la tensione cresce.`,
      fonte: D(141),
      chiave: true,
      correzione: { nf: 'NF-35', dispensaScrive: L`T(\theta+d\theta)\cos(\theta/2) - T(\theta)\cos(\theta/2) - dF_T^{ATTR} = 0` },
      distrattori: [
        { latex: L`\dfrac{dT}{d\theta} = 0`, errore: 'ipotesi', spiega: 'È il concio in aderenza: dove la cinghia striscia la tensione cambia.', num: (v) => [v.dT, 0] },
        { latex: L`\dfrac{dT}{d\theta} = -\dfrac{dF_T^{ATTR}}{d\theta}`, errore: 'segno', spiega: 'In modulo i due termini si equilibrano: l\'attrito, opposto alla crescita di T, ne compensa l\'aumento.', num: (v) => [v.dT, -v.dFT] },
      ],
      num: (v) => [v.dT, v.dFT],
    },
    {
      id: 'd062.5',
      latex: L`-T(\theta+d\theta)\sin\dfrac{d\theta}{2} - T(\theta)\sin\dfrac{d\theta}{2} + dF_N + dm\dfrac{V^2}{R} = 0 \;\Rightarrow\; -T\,d\theta - \underbrace{dT\,\tfrac{d\theta}{2}}_{\to 0} + dF_N + \rho V^2\,d\theta = 0`,
      perche: L`Equilibrio radiale: le componenti delle tensioni verso il centro, la normale della puleggia e la centrifuga verso l'esterno. $\sin(d\theta/2) \simeq d\theta/2$ e il prodotto $dT\,d\theta$ è di ordine superiore.`,
      fonte: D(141),
      chiave: true,
      correzione: { nf: 'NF-35', dispensaScrive: L`-T(\theta+d\theta)\sin(\theta/2) - T(\theta)\sin(\theta/2) + dF_N + dm\frac{V(\theta)^2}{2} = 0` },
      distrattori: [
        { latex: L`+T\,d\theta + dF_N + \rho V^2\,d\theta = 0`, errore: 'segno', spiega: 'Le componenti radiali delle tensioni sono dirette verso il centro, la normale verso l\'esterno: hanno segni opposti.' },
        { latex: L`-T\,d\theta + dF_N = 0`, errore: 'termine-perso', spiega: 'Manca la forza centrifuga: la cinghia è in moto sulla puleggia.' },
      ],
      num: (v) => [v.radial, v.T],
    },
    {
      id: 'd062.6',
      latex: L`\dfrac{dF_N}{d\theta} = T(\theta) - \rho V^2`,
      perche: L`Dall'equilibrio radiale. È la forza normale per unità d'angolo: positiva solo se la tensione vince la centrifuga.`,
      fonte: D(141),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{dF_N}{d\theta} = T + \rho V^2`, errore: 'segno', spiega: 'La centrifuga spinge verso l\'esterno come la normale: la riduce.', num: (v) => [v.dFN, v.T + v.rhoV2] },
        { latex: L`\dfrac{dF_N}{d\theta} = T`, errore: 'termine-perso', spiega: 'Vale solo a cinghia ferma (freno a nastro).', num: (v) => [v.dFN, v.T] },
        { latex: L`\dfrac{dF_N}{d\theta} = \dfrac{T - \rho V^2}{R}`, errore: 'fattore', spiega: 'Per unità d\'angolo non compare R; diviso R sarebbe la forza per unità di lunghezza.', num: (v) => [v.dFN, (v.T - v.rhoV2) / v.R] },
      ],
      num: (v) => [v.dFN, v.T - v.rhoV2],
    },
    {
      id: 'd062.7',
      latex: L`dF_T^{ATTR} = f\,dF_N \;\Rightarrow\; \dfrac{dT}{d\theta} = f\,\big(T(\theta) - \rho V^2\big)`,
      perche: L`Nell'arco di scorrimento l'attrito è al limite, $|dF_T| = f\,dF_N$: sostituendo la normale nell'equilibrio tangenziale si ottiene l'equazione differenziale di Eulero. Nell'arco di aderenza invece $|dF_T| < f\,dF_N$ e $dT = 0$.`,
      fonte: D(141),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{dT}{d\theta} = f\,T`, errore: 'termine-perso', spiega: 'Manca la centrifuga: vale per il nastro fermo, non per la cinghia in moto.', num: (v) => [v.dT, v.f * v.T] },
        { latex: L`\dfrac{dT}{d\theta} = \dfrac{1}{f}\,(T - \rho V^2)`, errore: 'fattore', spiega: 'dF_T = f dF_N: f moltiplica, non divide (dF_N = dF_T/f).', num: (v) => [v.dT, (v.T - v.rhoV2) / v.f] },
        { latex: L`\dfrac{dT}{d\theta} = f\,(T - \rho V^2)\ \text{su tutto } \beta`, errore: 'ipotesi', spiega: 'dF_T = f dF_N vale solo dove la cinghia striscia; nell\'aderenza la tensione è costante.' },
      ],
      num: (v) => [v.dT, v.f * (v.T - v.rhoV2)],
    },
  ],
  risultato: { latex: L`\dfrac{dT}{d\theta} = f\,\big(T(\theta) - \rho V^2\big)\quad\text{(arco di scorrimento)}`, fonte: D(141) },
  gancio: 'Tangenziale: dT = dF_T. Radiale: dF_N = (T − ρV²)dθ. Coulomb al limite le unisce.',
};

// ------------------------------------------------------------------ d063 equazione di Eulero
export const d063: Dimostrazione = {
  id: 'd063',
  titolo: 'Equazione di Eulero (integrazione)',
  enunciato: 'Integrare dT/dθ = f(T − ρV²) con la condizione nella sezione d\'uscita e ottenere il rapporto delle tensioni.',
  ipotesi: [
    'V costante lungo l\'arco (V₁ ≃ V₂ ≃ V) perché EA è molto grande e ε molto piccola',
    'condizione al contorno spaziale: θ = 0 nella sezione d\'uscita della cinghia dal contatto, T(0) = T₂',
    'contatto: T > ρV² in tutto l\'arco',
  ],
  sample: (rnd) => {
    const b = base(rnd), beta = U(rnd, 2.4, 3.6), theta = U(rnd, 0, beta), thetaS = U(rnd, 0.2, 1) * beta;
    const T = tensioneArco(b.T2, b.rhoV2, b.f, theta), dT = b.f * (T - b.rhoV2);
    const K = Math.log(b.T2 - b.rhoV2), c = Math.exp(K);
    const T1 = integraEulero(b.T2, b.rhoV2, b.f, thetaS), T1n = integraEulero(b.T2, 0, b.f, beta);
    return { ...b, beta, theta, thetaS, T, dT, K, c, T1, T1n };
  },
  passi: [
    {
      id: 'd063.1',
      latex: L`V(\theta) \simeq V_1 \simeq V_2 \simeq V = \text{cost}\qquad (EA \gg\ \Rightarrow\ \varepsilon \ll)`,
      perche: L`Senza questa ipotesi le variabili non si separano: $V$ dipenderebbe da $T$ (d059). Con una cinghia molto rigida assialmente le variazioni di velocità sono trascurabili.`,
      fonte: D(142),
      chiave: true,
      distrattori: [],
    },
    {
      id: 'd063.2',
      latex: L`\dfrac{dT}{T(\theta) - \rho V^2} = f\,d\theta`,
      perche: L`Equazione a variabili separabili: a sinistra solo $T$, a destra solo $\theta$.`,
      fonte: D(142),
      distrattori: [],
      num: (v) => [v.dT / (v.T - v.rhoV2), v.f],
    },
    {
      id: 'd063.3',
      latex: L`\displaystyle\int \dfrac{dT}{T - \rho V^2} = \int f\,d\theta \;\Rightarrow\; \ln|T - \rho V^2| = f\theta + K`,
      perche: L`Si integrano i due membri; $K$ è la costante d'integrazione. È un problema di Cauchy spaziale: la variabile è l'angolo, non il tempo, e serve una sola condizione.`,
      fonte: D(142),
      distrattori: [],
      num: (v) => [Math.log(v.T - v.rhoV2), v.f * v.theta + v.K],
    },
    {
      id: 'd063.4',
      latex: L`T > \rho V^2 \;\Rightarrow\; T - \rho V^2 = e^{K} e^{f\theta} = c\,e^{f\theta},\quad c > 0`,
      perche: L`Si toglie il valore assoluto con una scelta di segno fisica: la tensione deve vincere la centrifuga, altrimenti la cinghia si stacca dalla puleggia.`,
      fonte: D(142),
      chiave: true,
      distrattori: [
        { latex: L`T - \rho V^2 = -c\,e^{f\theta}`, errore: 'segno', spiega: 'Con T < ρV² la forza normale sarebbe negativa: la cinghia non toccherebbe la puleggia.', num: (v) => [v.T - v.rhoV2, -v.c * Math.exp(v.f * v.theta)] },
        { latex: L`T = c\,e^{f\theta}`, errore: 'termine-perso', spiega: 'Esponenziale è T − ρV², non T: il termine centrifugo resta.', num: (v) => [v.T, v.c * Math.exp(v.f * v.theta)] },
      ],
      num: (v) => [v.T - v.rhoV2, v.c * Math.exp(v.f * v.theta)],
    },
    {
      id: 'd063.5',
      latex: L`T(0) = T_2 \;\Rightarrow\; T_2 - \rho V^2 = c\,e^{f\cdot 0} \;\Rightarrow\; c = T_2 - \rho V^2`,
      perche: L`La condizione si dà nella sezione d'uscita, dove la cinghia lascia la motrice con la tensione del ramo lasco.`,
      fonte: D(142),
      chiave: true,
      distrattori: [
        { latex: L`c = T_1 - \rho V^2`, errore: 'indice', spiega: 'Nella sezione d\'uscita della motrice (θ = 0) c\'è il ramo lasco, T₂.', num: (v) => [v.c, v.T1 - v.rhoV2] },
        { latex: L`c = T_2`, errore: 'termine-perso', spiega: 'In θ = 0 vale T₂ − ρV² = c.', num: (v) => [v.c, v.T2] },
      ],
      num: (v) => [v.c, v.T2 - v.rhoV2],
    },
    {
      id: 'd063.6',
      latex: L`\dfrac{T(\theta) - \rho V^2}{T_2 - \rho V^2} = e^{f\theta}`,
      perche: L`Equazione di Eulero: nell'arco di scorrimento la tensione «al netto della centrifuga» cresce in modo esponenziale con l'angolo.`,
      fonte: D(142),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{T(\theta)}{T_2} = e^{f\theta}`, errore: 'termine-perso', spiega: 'Senza ρV² è la forma del nastro fermo; per la cinghia in moto la centrifuga si sottrae a entrambe le tensioni.', num: (v) => [v.T / v.T2, Math.exp(v.f * v.theta)] },
        { latex: L`\dfrac{T(\theta) - \rho V^2}{T_2 - \rho V^2} = e^{-f\theta}`, errore: 'segno', spiega: 'Da T₂ verso l\'interno dell\'arco la tensione cresce: esponente positivo.', num: (v) => [(v.T - v.rhoV2) / (v.T2 - v.rhoV2), Math.exp(-v.f * v.theta)] },
      ],
      num: (v) => [(v.T - v.rhoV2) / (v.T2 - v.rhoV2), Math.exp(v.f * v.theta)],
    },
    {
      id: 'd063.7',
      latex: L`\theta = \theta^*:\quad \dfrac{T_1 - \rho V^2}{T_2 - \rho V^2} = e^{f\theta^*}`,
      perche: L`All'estremo dell'arco di scorrimento la tensione arriva a $T_1$ e da lì resta costante (aderenza). $\theta^*$ deve essere minore di $\beta_1$.`,
      fonte: D([142, 143]),
      distrattori: [],
      num: (v) => [(v.T1 - v.rhoV2) / (v.T2 - v.rhoV2), Math.exp(v.f * v.thetaS)],
    },
    {
      id: 'd063.8',
      latex: L`\rho V^2 = 0,\ \theta^* = \beta:\quad \dfrac{T_1}{T_2} = e^{f\beta}`,
      perche: L`Caso del freno a nastro: il nastro è fermo (niente centrifuga) e il tamburo gli striscia sotto su tutto l'arco.`,
      fonte: D(153),
      distrattori: [],
      num: (v) => [v.T1n / v.T2, Math.exp(v.f * v.beta)],
    },
  ],
  risultato: { latex: L`\dfrac{T(\theta) - \rho V^2}{T_2 - \rho V^2} = e^{f\theta},\qquad \dfrac{T_1 - \rho V^2}{T_2 - \rho V^2} = e^{f\theta^*}`, fonte: D([142, 143]) },
  gancio: 'Separa, integra, togli il modulo (T > ρV²), metti T(0) = T₂ all\'uscita.',
};

// ------------------------------------------------------------------ d064 legge della tensione lungo l'arco
export const d064: Dimostrazione = {
  id: 'd064',
  titolo: 'Legge di variazione della tensione lungo l\'arco',
  enunciato: 'Ricavare T(θ) su tutto l\'arco avvolto della motrice, con le zone di aderenza e di scorrimento, e verificare che l\'attrito dà la coppia trasmessa.',
  ipotesi: [
    'motrice con coppia C₁ < C_MAX; θ misurato dalla sezione d\'uscita Q₁ all\'indietro, T(0) = T₂',
    'scorrimento per 0 ≤ θ ≤ θ*, aderenza per θ* ≤ θ ≤ β₁ (T = T₁)',
    'V costante nel termine centrifugo; V(θ) = V₀(1 + T/EA) solo per la velocità relativa',
  ],
  sample: (rnd) => {
    const s = conCoppia(rnd), theta = U(rnd, 0, 1) * s.thetaS;
    const Tth = integraEulero(s.T2, s.rhoV2, s.f, theta), Ts = integraEulero(s.T2, s.rhoV2, s.f, s.thetaS);
    const V0 = s.V / (1 + s.T1 / s.EA), Vth = V0 * (1 + Tth / s.EA);
    const Iint = s.R * simpson((th) => s.f * (tensioneArco(s.T2, s.rhoV2, s.f, th) - s.rhoV2), 0, s.thetaS);
    return { ...s, theta, Tth, Ts, V0, Vth, Iint };
  },
  passi: [
    {
      id: 'd064.1',
      latex: L`\theta = 0\ \text{in } Q_1\ (\text{sezione d'uscita}),\qquad T(0) = T_2`,
      perche: L`L'origine degli angoli è dove la cinghia lascia la puleggia: lì la tensione è quella del ramo lasco.`,
      fonte: D([141, 142]),
      distrattori: [],
    },
    {
      id: 'd064.2',
      latex: L`T(\theta) = \rho V^2 + (T_2 - \rho V^2)\,e^{f\theta},\qquad 0 \le \theta \le \theta^*`,
      perche: L`È l'equazione di Eulero risolta rispetto a $T$: nell'arco di scorrimento la tensione cresce in modo esponenziale andando da $Q_1$ verso $S_1$. La dispensa la lascia in forma di rapporto.`,
      fonte: D(142),
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`T(\theta) = T_2\,e^{f\theta}`, errore: 'termine-perso', spiega: 'Esponenziale è solo la parte T − ρV²: la centrifuga si somma come costante.', num: (v) => [v.Tth, v.T2 * Math.exp(v.f * v.theta)] },
        { latex: L`T(\theta) = \rho V^2 + (T_1 - \rho V^2)\,e^{-f\theta}`, errore: 'convenzione', spiega: 'Questa forma vale con θ misurato da S₁, dove T = T₁; con θ dall\'uscita si parte da T₂.', num: (v) => [v.Tth, v.rhoV2 + (v.T1 - v.rhoV2) * Math.exp(-v.f * v.theta)] },
        { latex: L`T(\theta) = T_2\,(1 + f\theta)`, errore: 'concetto', spiega: 'Ogni tratto aumenta T di una frazione costante: la crescita è esponenziale, non lineare.', num: (v) => [v.Tth, v.T2 * (1 + v.f * v.theta)] },
      ],
      num: (v) => [v.Tth, v.rhoV2 + (v.T2 - v.rhoV2) * Math.exp(v.f * v.theta)],
    },
    {
      id: 'd064.3',
      latex: L`T(\theta^*) = T_1,\qquad T(\theta) = T_1\ \ \text{per}\ \theta^* \le \theta \le \beta_1\ (\text{arco } \alpha_1)`,
      perche: L`In $S_1$ la tensione ha raggiunto $T_1$; da $S_1$ a $P_1$ la cinghia aderisce e la tensione resta costante. L'arco avvolto non è tutto in scorrimento: $\theta^* < \beta_1$.`,
      fonte: D([142, 144]),
      chiave: true,
      distrattori: [
        { latex: L`T_1 = \rho V^2 + (T_2 - \rho V^2)\,e^{f\beta_1}`, errore: 'ipotesi', spiega: 'Vale solo in incipiente scorrimento globale (θ* = β₁); con coppia minore della massima resta un arco di aderenza.', num: (v) => [v.T1, v.rhoV2 + (v.T2 - v.rhoV2) * Math.exp(v.f * v.beta)] },
        { latex: L`T_1 = T_2`, errore: 'concetto', spiega: 'Solo con coppia nulla: per trasmettere C₁ serve T₁ − T₂ = C₁/R₁.', num: (v) => [v.T1, v.T2] },
      ],
      num: (v) => [v.Ts, v.T1],
    },
    {
      id: 'd064.4',
      latex: L`P_1 \xrightarrow{\ \alpha_1:\ T = T_1\ } S_1 \xrightarrow{\ \theta^*:\ T \downarrow\ } Q_1`,
      perche: L`Nel verso del moto la cinghia prima aderisce, poi striscia verso l'uscita. Se ci fosse prima scorrimento, la cinghia dovrebbe andare più veloce della puleggia e l'attrito risulterebbe concorde alla coppia motrice: impossibile (p. 146).`,
      fonte: D([144, 146]),
      chiave: true,
      distrattori: [
        { latex: L`P_1 \xrightarrow{\ \theta^*\ } S_1 \xrightarrow{\ \alpha_1\ } Q_1`, errore: 'concetto', spiega: 'Prima scorrimento e poi aderenza è contraddittorio: l\'attrito avrebbe il verso della coppia (dimostrazione per assurdo di p. 146).' },
        { latex: L`\text{sulla motrice } T \uparrow \text{ nel verso del moto}`, errore: 'segno', spiega: 'La motrice cede energia alla cinghia «tirando» il ramo teso: lungo il moto la tensione cala da T₁ a T₂.' },
      ],
    },
    {
      id: 'd064.5',
      latex: L`\text{condotta: } Q_2 \xrightarrow{\ \alpha_2:\ T = T_2\ } S_2 \xrightarrow{\ \theta^*:\ T \uparrow\ } P_2`,
      perche: L`Sulla condotta la cinghia entra dal ramo lasco, aderisce con $T_2$ e poi striscia con tensione crescente fino a $T_1$ all'uscita. La legge è la stessa con $\theta$ misurato dall'inizio dello scorrimento ($S_2$), dove $T = T_2$.`,
      fonte: { tipo: 'deduzione', da: 'p. 144 (figura) e p. 142', spiegazione: 'Il testo di p. 144 scambia P₂ e Q₂ (NF-169); dalla figura la cinghia entra sulla condotta in Q₂ ed esce in P₂.' },
      aggiunto: true,
      distrattori: [],
    },
    {
      id: 'd064.6',
      latex: L`V(\theta) = V_0\Big(1 + \dfrac{T(\theta)}{EA}\Big) < \omega_1 R_1 = V_0\Big(1 + \dfrac{T_1}{EA}\Big)`,
      perche: L`Nell'arco di scorrimento della motrice la tensione cala, la cinghia si accorcia e va più piano della periferia: la velocità relativa è all'indietro e l'attrito sulla cinghia è in avanti, con verso opposto alla velocità relativa.`,
      fonte: { tipo: 'deduzione', da: 'p. 138 (V = V₀(1 + T/EA)) e p. 144', spiegazione: 'La dispensa lo descrive a parole a p. 144; qui con la legge della velocità di p. 138.' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Vth / v.V, (1 + v.Tth / v.EA) / (1 + v.T1 / v.EA)],
    },
    {
      id: 'd064.7',
      latex: L`\dfrac{dF_N}{d\theta} = T(\theta) - \rho V^2 = (T_2 - \rho V^2)\,e^{f\theta}`,
      perche: L`Anche la pressione della cinghia sulla puleggia cresce esponenzialmente nello scorrimento ed è costante nell'aderenza; la centrifuga la abbassa uniformemente.`,
      fonte: { tipo: 'deduzione', da: 'p. 141 (dF_N/dθ = T − ρV²) e p. 142', spiegazione: 'Si sostituisce la legge di T(θ) nell\'equilibrio radiale.' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Tth - v.rhoV2, (v.T2 - v.rhoV2) * Math.exp(v.f * v.theta)],
    },
    {
      id: 'd064.8',
      latex: L`R\displaystyle\int_0^{\theta^*} f\,\dfrac{dF_N}{d\theta}\,d\theta = (T_1 - T_2)\,R = C_1`,
      perche: L`Il momento delle azioni d'attrito sull'arco è proprio la coppia trasmessa: nell'aderenza l'attrito è nullo, tutta la coppia passa nell'arco di scorrimento.`,
      fonte: { tipo: 'deduzione', da: 'pp. 141–143', spiegazione: 'Integrale di f(T₂ − ρV²)e^{fθ} tra 0 e θ*, uguale a T₁ − T₂ per l\'equazione di Eulero.' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Iint, v.C],
    },
  ],
  risultato: { latex: L`T(\theta) = \begin{cases} \rho V^2 + (T_2 - \rho V^2)\,e^{f\theta} & 0 \le \theta \le \theta^* \\ T_1 & \theta^* \le \theta \le \beta_1 \end{cases}`, fonte: D([142, 144]) },
  gancio: 'Dall\'uscita all\'indietro: esponenziale finché striscia, piatta dove aderisce.',
};

// ------------------------------------------------------------------ d065 angolo di scorrimento
export const d065: Dimostrazione = {
  id: 'd065',
  titolo: 'Angolo di scorrimento θ*',
  enunciato: 'Ricavare l\'arco di scorrimento necessario a trasmettere una coppia e discutere i casi limite.',
  ipotesi: [
    'equazione di Eulero sull\'arco di scorrimento (d063), T₂ e ρV² noti',
    'θ* + α₁ = β₁: l\'arco avvolto è diviso in scorrimento e aderenza',
  ],
  sample: (rnd) => {
    const s = conCoppia(rnd);
    // θ* trovato per bisezione sulla tensione integrata numericamente (indipendente dalla formula)
    let a = 0, b = s.beta;
    for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (integraEulero(s.T2, s.rhoV2, s.f, m, 200) < s.T1) a = m; else b = m; }
    return { ...s, thetaN: (a + b) / 2 };
  },
  passi: [
    {
      id: 'd065.1',
      latex: L`\theta^* + \alpha_1 = \beta_1`,
      perche: L`$\theta^*$ è l'arco di scorrimento, $\alpha_1$ quello di aderenza, $\beta_1$ l'angolo di avvolgimento.`,
      fonte: D(142),
      distrattori: [],
      num: (v) => [v.thetaS + v.alpha, v.beta],
    },
    {
      id: 'd065.2',
      latex: L`\theta^* = \dfrac{1}{f}\,\ln\dfrac{T_1 - \rho V^2}{T_2 - \rho V^2}`,
      perche: L`Si inverte l'equazione di Eulero: è l'arco minimo che serve per passare da $T_2$ a $T_1$ sfruttando l'attrito al massimo in ogni punto. La dispensa la scrive così per la verifica a tre pulegge.`,
      fonte: D([142, 151]),
      chiave: true,
      distrattori: [
        { latex: L`\theta^* = f\,\ln\dfrac{T_1 - \rho V^2}{T_2 - \rho V^2}`, errore: 'fattore', spiega: 'Dall\'esponente fθ* si divide per f.', num: (v) => [v.thetaN, v.f * Math.log((v.T1 - v.rhoV2) / (v.T2 - v.rhoV2))] },
        { latex: L`\theta^* = \dfrac{1}{f}\,\ln\dfrac{T_1}{T_2}`, errore: 'termine-perso', spiega: 'Con la cinghia in moto la centrifuga va tolta a entrambe le tensioni.', num: (v) => [v.thetaN, Math.log(v.T1 / v.T2) / v.f] },
        { latex: L`\theta^* = \dfrac{1}{f}\,\ln\dfrac{T_2 - \rho V^2}{T_1 - \rho V^2}`, errore: 'segno', spiega: 'Così θ* verrebbe negativo: il teso sta al numeratore.', num: (v) => [v.thetaN, Math.log((v.T2 - v.rhoV2) / (v.T1 - v.rhoV2)) / v.f] },
      ],
      num: (v) => [v.thetaN, Math.log((v.T1 - v.rhoV2) / (v.T2 - v.rhoV2)) / v.f],
    },
    {
      id: 'd065.3',
      latex: L`T_1 = T_2 + \dfrac{C_1}{R_1} \;\Rightarrow\; \theta^* = \dfrac{1}{f}\,\ln\!\Big(1 + \dfrac{C_1}{R_1\,(T_2 - \rho V^2)}\Big)`,
      perche: L`Con il tenditore che fissa $T_2$, più coppia vuol dire più salto di tensione e quindi un arco di scorrimento più lungo: la zona di scorrimento si espande a spese dell'aderenza.`,
      fonte: { tipo: 'deduzione', da: 'p. 143 (C₁ = (T₁ − T₂)R; «aumentando θ*»)', spiegazione: 'Si sostituisce T₁ = T₂ + C₁/R₁ nella formula di θ*.' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`\theta^* = \dfrac{C_1}{f\,R_1\,(T_2 - \rho V^2)}`, errore: 'concetto', spiega: 'È solo il primo termine dello sviluppo per coppie piccole: θ* cresce col logaritmo della coppia.', num: (v) => [v.thetaS, v.C / (v.f * v.R * (v.T2 - v.rhoV2))] },
        { latex: L`\theta^* = \dfrac{1}{f}\,\ln\!\Big(1 + \dfrac{C_1}{R_1\,T_2}\Big)`, errore: 'termine-perso', spiega: 'La centrifuga riduce la tensione utile: a parità di coppia serve più arco.', num: (v) => [v.thetaS, Math.log(1 + v.C / (v.R * v.T2)) / v.f] },
      ],
      num: (v) => [v.thetaS, Math.log(1 + v.C / (v.R * (v.T2 - v.rhoV2))) / v.f],
    },
    {
      id: 'd065.4',
      latex: L`C_1 = 0 \;\Rightarrow\; T_1 = T_2 \;\Rightarrow\; \theta^* = 0,\ \alpha_1 = \beta_1`,
      perche: L`Senza coppia le tensioni sono uguali, non c'è scorrimento: tutto l'arco avvolto è in aderenza.`,
      fonte: D(144),
      chiave: true,
      correzione: { nf: 'NF-20', dispensaScrive: L`\text{se } \theta^* = 0 \text{ si ha incipiente di scorrimento globale (p. 142)}` },
      distrattori: [
        { latex: L`\theta^* = 0 \Rightarrow \text{incipiente scorrimento globale}`, errore: 'concetto', spiega: 'È l\'errore di p. 142 (NF-20): θ* = 0 vuol dire coppia nulla e tutto in aderenza.' },
        { latex: L`C_1 = 0 \Rightarrow \alpha_1 = 0`, errore: 'indice', spiega: 'α₁ è l\'arco di aderenza: con coppia nulla è tutto β₁, non zero.' },
      ],
      num: (v) => [Math.log(1 + 0 / (v.R * (v.T2 - v.rhoV2))) / v.f, 0],
    },
    {
      id: 'd065.5',
      latex: L`\theta^* = \beta_1 \iff \alpha_1 = 0 \iff C_1 = C_{MAX}`,
      perche: L`Incipiente scorrimento globale: tutto l'arco striscia con l'attrito al massimo, ma la coppia massima è ancora trasmessa. Un piccolo aumento di coppia porta allo scorrimento completo.`,
      fonte: D([142, 143]),
      chiave: true,
      correzione: { nf: 'NF-20', dispensaScrive: L`\text{se } \alpha = 0 \text{ la coppia non potrà essere trasmessa (p. 142)};\ \theta^* = \alpha\ \text{(p. 146)}` },
      distrattori: [
        { latex: L`\theta^* = \alpha_1`, errore: 'indice', spiega: 'È la riga di p. 146 (NF-20): la condizione è θ* = β₁, cioè α₁ = 0.' },
        { latex: L`\alpha_1 = 0 \Rightarrow \text{nessuna coppia trasmessa}`, errore: 'concetto', spiega: 'Con α₁ = 0 si trasmette proprio la coppia massima: lo slittamento arriva solo chiedendo di più.' },
      ],
      num: (v) => [Math.log(1 + v.Cmax / (v.R * (v.T2 - v.rhoV2))) / v.f, v.beta],
    },
    {
      id: 'd065.6',
      latex: L`C_1 > C_{MAX} \;\Rightarrow\; \theta^* > \beta_1\ \text{impossibile: slittamento globale}`,
      perche: L`Non c'è arco sufficiente: la cinghia slitta sulla puleggia, genera calore e si usura.`,
      fonte: D([142, 147]),
      distrattori: [],
    },
  ],
  risultato: { latex: L`\theta^* = \dfrac{1}{f}\,\ln\dfrac{T_1 - \rho V^2}{T_2 - \rho V^2},\qquad 0 \le \theta^* \le \beta_1`, fonte: D([142, 151]) },
  gancio: 'Coppia nulla: θ* = 0. Coppia massima: θ* = β. In mezzo il logaritmo.',
};

// ------------------------------------------------------------------ d066 coppia massima
export const d066: Dimostrazione = {
  id: 'd066',
  titolo: 'Coppia massima trasmissibile',
  enunciato: 'Ricavare la coppia massima che la cinghia trasmette prima dello slittamento globale, con il termine centrifugo.',
  ipotesi: [
    'incipiente scorrimento globale sulla puleggia limitante: θ* = β_min',
    'T₂ fissata (forzamento), V costante, f uguale sulle pulegge',
  ],
  sample: (rnd) => {
    const b = base(rnd), beta = U(rnd, 2.4, 3.6), dlt = U(rnd, 1, 10), E = Math.exp(b.f * beta);
    const T1 = integraEulero(b.T2, b.rhoV2, b.f, beta), Cmax = (T1 - b.T2) * b.R;
    const Cmax2 = (integraEulero(b.T2, b.rhoV2 + dlt, b.f, beta) - b.T2) * b.R;
    const C0 = (integraEulero(b.T2, 0, b.f, beta) - b.T2) * b.R;
    return { ...b, beta, dlt, E, T1, Cmax, Cmax2, C0 };
  },
  passi: [
    {
      id: 'd066.1',
      latex: L`\theta^* = \min\{\beta_1, \beta_2\} = \beta_{min}`,
      perche: L`La coppia è massima quando sulla puleggia limitante tutto l'arco è in scorrimento.`,
      fonte: D(143),
      distrattori: [],
    },
    {
      id: 'd066.2',
      latex: L`T_1 - \rho V^2 = e^{f\beta_{min}}\,(T_2 - \rho V^2)`,
      perche: L`Equazione di Eulero con $\theta^* = \beta_{min}$, risolta rispetto alla tensione del ramo teso.`,
      fonte: D(143),
      distrattori: [],
      num: (v) => [v.T1 - v.rhoV2, v.E * (v.T2 - v.rhoV2)],
    },
    {
      id: 'd066.3',
      latex: L`T_1 - T_2 = e^{f\beta_{min}}(T_2 - \rho V^2) + \rho V^2 - T_2 = (T_2 - \rho V^2)\,(e^{f\beta_{min}} - 1)`,
      perche: L`Si sottrae $T_2$ ai due membri e si raccoglie $T_2 - \rho V^2$: la differenza di tensione disponibile.`,
      fonte: D(143),
      chiave: true,
      distrattori: [
        { latex: L`T_1 - T_2 = T_2\,(e^{f\beta_{min}} - 1)`, errore: 'termine-perso', spiega: 'Si è persa la centrifuga: vale solo per V → 0.', num: (v) => [v.T1 - v.T2, v.T2 * (v.E - 1)] },
        { latex: L`T_1 - T_2 = (T_2 - \rho V^2)\,(e^{f\beta_{min}} + 1)`, errore: 'segno', spiega: 'Raccogliendo T₂ − ρV² resta e^{fβ} − 1.', num: (v) => [v.T1 - v.T2, (v.T2 - v.rhoV2) * (v.E + 1)] },
        { latex: L`T_1 - T_2 = (T_1 - \rho V^2)\,(e^{f\beta_{min}} - 1)`, errore: 'indice', spiega: 'Con T₂ fissato si raccoglie T₂ − ρV²; con T₁ fissato il fattore sarebbe (1 − e^{−fβ}).', num: (v) => [v.T1 - v.T2, (v.T1 - v.rhoV2) * (v.E - 1)] },
      ],
      num: (v) => [v.T1 - v.T2, (v.T2 - v.rhoV2) * (v.E - 1)],
    },
    {
      id: 'd066.4',
      latex: L`C_{MAX} = (T_1 - T_2)\,R = (T_2 - \rho V^2)\,(e^{f\beta_{min}} - 1)\,R`,
      perche: L`Si moltiplica per il raggio della puleggia su cui si calcola la coppia (non per forza quella con $\beta_{min}$).`,
      fonte: D(143),
      chiave: true,
      distrattori: [
        { latex: L`C_{MAX} = (T_2 - \rho V^2)\,(e^{f\beta_{min}} - 1)`, errore: 'termine-perso', spiega: 'Manca il raggio: è una forza, non una coppia (in una riga di p. 143 la dispensa lo dimentica).', num: (v) => [v.Cmax, (v.T2 - v.rhoV2) * (v.E - 1)] },
        { latex: L`C_{MAX} = (T_2 - \rho V^2)\,e^{f\beta_{min}}\,R`, errore: 'concetto', spiega: 'Questo è (T₁ − ρV²)R: la coppia viene dalla differenza delle tensioni.', num: (v) => [v.Cmax, (v.T2 - v.rhoV2) * v.E * v.R] },
      ],
      num: (v) => [v.Cmax, (v.T2 - v.rhoV2) * (v.E - 1) * v.R],
    },
    {
      id: 'd066.5',
      latex: L`\rho V^2 \to 0:\quad C_{MAX} = T_2\,(e^{f\beta_{min}} - 1)\,R`,
      perche: L`Forma classica, senza centrifuga: vale a bassa velocità.`,
      fonte: D(143),
      distrattori: [],
      num: (v) => [v.C0, v.T2 * (v.E - 1) * v.R],
    },
    {
      id: 'd066.6',
      latex: L`\dfrac{\partial C_{MAX}}{\partial(\rho V^2)} = -(e^{f\beta_{min}} - 1)\,R < 0`,
      perche: L`A parità di forzamento, più la cinghia va veloce meno coppia può trasmettere: la centrifuga riduce la tensione che preme la cinghia sulla puleggia.`,
      fonte: { tipo: 'deduzione', da: 'p. 143 (C_MAX)', spiegazione: 'C_MAX è lineare in ρV² con coefficiente −(e^{fβ} − 1)R.' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{\partial C_{MAX}}{\partial(\rho V^2)} = +(e^{f\beta_{min}} - 1)\,R`, errore: 'segno', spiega: 'La centrifuga si sottrae a T₂: aumentandola la coppia cala.', num: (v) => [(v.Cmax2 - v.Cmax) / v.dlt, (v.E - 1) * v.R] },
        { latex: L`\dfrac{\partial C_{MAX}}{\partial(\rho V^2)} = 0`, errore: 'concetto', spiega: 'La centrifuga agisce su tutti e due i rami ma non si elide: riduce T₂ − ρV², che moltiplica e^{fβ} − 1.', num: (v) => [(v.Cmax2 - v.Cmax) / v.dlt, 0] },
      ],
      num: (v) => [(v.Cmax2 - v.Cmax) / v.dlt, -(v.E - 1) * v.R],
    },
  ],
  risultato: { latex: L`C_{MAX} = (T_2 - \rho V^2)\,(e^{f\beta_{min}} - 1)\,R`, fonte: D(143) },
  gancio: 'Tutto l\'arco limitante striscia: C_MAX = (T₂ − ρV²)(e^{fβ_min} − 1)R.',
};

// ------------------------------------------------------------------ d067 puleggia limitante
export const d067: Dimostrazione = {
  id: 'd067',
  titolo: 'Puleggia limitante',
  enunciato: 'Mostrare quale puleggia va per prima in incipiente scorrimento globale, con due e con tre pulegge.',
  ipotesi: [
    'le pulegge sono attraversate dagli stessi rami: stesse T₁, T₂ (o T′, T″, T‴ con tre pulegge) e stesso ρV²',
    'coefficiente d\'attrito uguale sulle pulegge (ipotesi sottintesa dalla dispensa); poi il caso generale',
    'tre pulegge di ugual raggio: partitore (1 motrice, 2 e 3 condotte), tenditore sul ramo lasco',
  ],
  sample: (rnd) => {
    const b = base(rnd), beta1 = U(rnd, 2.4, 3.0), beta2 = 2 * Math.PI - beta1, q = U(rnd, 0.1, 0.95), f2 = b.f * U(rnd, 0.6, 0.9);
    const Cm = (beta: number) => (b.T2 - b.rhoV2) * (Math.exp(b.f * beta) - 1) * b.R;
    const C = q * Cm(beta1), T1 = b.T2 + C / b.R, r = (T1 - b.rhoV2) / (b.T2 - b.rhoV2);
    const th1 = Math.log(r) / b.f, th2 = Math.log(r) / b.f, th2f = Math.log(r) / f2;
    // tre pulegge: T'' minima (lasco, tenditore), T''' intermedia, T' massima
    const Tm = b.T2, TM = T1, Ti = Tm + U(rnd, 0.2, 0.8) * (TM - Tm);
    const C1 = (TM - Tm) * b.R, C2 = (TM - Ti) * b.R, C3 = (Ti - Tm) * b.R;
    const t1 = Math.log((TM - b.rhoV2) / (Tm - b.rhoV2)) / b.f, t2 = Math.log((TM - b.rhoV2) / (Ti - b.rhoV2)) / b.f, t3 = Math.log((Ti - b.rhoV2) / (Tm - b.rhoV2)) / b.f;
    return { ...b, beta1, beta2, q, f2, C, T1, th1, th2, th2f, Cm1: Cm(beta1), Cm2: Cm(beta2), Tm, TM, Ti, C1, C2, C3, t1, t2, t3 };
  },
  passi: [
    {
      id: 'd067.1',
      latex: L`\dfrac{T_1 - \rho V^2}{T_2 - \rho V^2} = e^{f\theta_1^*} = e^{f\theta_2^*} \;\Rightarrow\; \theta_1^* = \theta_2^*`,
      perche: L`Le due pulegge vedono gli stessi rami: stesso rapporto di Eulero, quindi (a parità di $f$) lo stesso arco di scorrimento.`,
      fonte: D(143),
      distrattori: [],
      num: (v) => [v.th1, v.th2],
    },
    {
      id: 'd067.2',
      latex: L`\theta^* \le \beta_1,\ \theta^* \le \beta_2 \;\Rightarrow\; C_{MAX} = (T_2 - \rho V^2)(e^{f\beta_{min}} - 1)R`,
      perche: L`Lo stesso $\theta^*$ deve stare dentro tutti e due gli archi: il limite lo dà l'arco più piccolo. «Si sceglie l'angolo più piccolo».`,
      fonte: D(143),
      chiave: true,
      distrattori: [
        { latex: L`C_{MAX} = (T_2 - \rho V^2)(e^{f\beta_{max}} - 1)R`, errore: 'concetto', spiega: 'Sulla puleggia con l\'arco minore θ* = β arriverebbe prima: oltre quella coppia lì la cinghia slitta.', num: (v) => [Math.min(v.Cm1, v.Cm2), Math.max(v.Cm1, v.Cm2)] },
        { latex: L`C_{MAX} = (T_2 - \rho V^2)(e^{f\beta_2} - 1)R`, errore: 'indice', spiega: 'Non conta quale puleggia è motrice o condotta, conta l\'arco più piccolo (qui β₁ < β₂).', num: (v) => [Math.min(v.Cm1, v.Cm2), v.Cm2] },
      ],
      num: (v) => [Math.min(v.Cm1, v.Cm2), (v.T2 - v.rhoV2) * (Math.exp(v.f * Math.min(v.beta1, v.beta2)) - 1) * v.R],
    },
    {
      id: 'd067.3',
      latex: L`\beta_1 < \beta_2 \;\Rightarrow\; \text{la puleggia 1 (piccola) va per prima in I.S.G.}`,
      perche: L`Nella trasmissione aperta la puleggia piccola ha l'arco minore (p. 132): è lei a limitare la coppia, anche se la grande trasmette più coppia. Per prima cosa si controllano gli angoli di avvolgimento.`,
      fonte: D([132, 143]),
      chiave: true,
      distrattori: [
        { latex: L`\text{va per prima la puleggia grande, che ha la coppia maggiore}`, errore: 'concetto', spiega: 'Le due pulegge hanno la stessa differenza di tensione T₁ − T₂: decide l\'arco, non la coppia.' },
        { latex: L`\text{va per prima sempre la motrice}`, errore: 'concetto', spiega: 'Con due pulegge decide l\'angolo di avvolgimento: se la motrice fosse la grande limiterebbe la condotta.' },
      ],
    },
    {
      id: 'd067.4',
      latex: L`f_1\theta_1^* = f_2\theta_2^* = \ln\dfrac{T_1 - \rho V^2}{T_2 - \rho V^2} \;\Rightarrow\; \text{limita } \min_i\,(f_i\beta_i)`,
      perche: L`Se i coefficienti d'attrito sono diversi, gli archi di scorrimento sono diversi: va per prima in scorrimento globale la puleggia con il prodotto $f\beta$ minore. Il confronto diretto dei $\beta$ vale solo a parità di $f$.`,
      fonte: { tipo: 'deduzione', da: 'p. 143 (equazione di Eulero sulle due pulegge)', spiegazione: 'Lo stesso rapporto delle tensioni con f diversi dà fθ* uguali (NF-168).' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`\theta_1^* = \theta_2^*\ \text{sempre}`, errore: 'ipotesi', spiega: 'Vale solo se f₁ = f₂: è uguale il prodotto fθ*.', num: (v) => [v.th1, v.th2f] },
        { latex: L`\text{limita sempre } \beta_{min}`, errore: 'ipotesi', spiega: 'Con f diversi una puleggia con arco maggiore ma f minore può limitare per prima.' },
      ],
      num: (v) => [v.f * v.th1, v.f2 * v.th2f],
    },
    {
      id: 'd067.5',
      latex: L`\dfrac{C_1}{R} = T' - T'',\ \dfrac{C_2}{R} = T' - T''',\ \dfrac{C_3}{R} = T''' - T'' \;\Rightarrow\; C_1 = C_2 + C_3`,
      perche: L`Tre pulegge di ugual raggio (partitore): equilibrio di ciascuna puleggia con le tensioni dei suoi due rami, $T'' < T''' < T'$. La coppia della motrice si ripartisce sulle due condotte.`,
      fonte: D(150),
      distrattori: [],
      num: (v) => [v.C1, v.C2 + v.C3],
    },
    {
      id: 'd067.6',
      latex: L`\ln\dfrac{T' - \rho V^2}{T'' - \rho V^2} = \ln\dfrac{T' - \rho V^2}{T''' - \rho V^2} + \ln\dfrac{T''' - \rho V^2}{T'' - \rho V^2} \;\Rightarrow\; \theta_1^* = \theta_2^* + \theta_3^*`,
      perche: L`I rapporti di Eulero si moltiplicano, quindi gli archi di scorrimento si sommano: la motrice del partitore, che vede il salto di tensione più grande, ha l'arco di scorrimento più lungo. A parità di angoli e di $f$ va sempre per prima la 1, qualunque sia la ripartizione delle coppie.`,
      fonte: { tipo: 'deduzione', da: 'pp. 150–151 (verifica di θ₂* e θ₃*)', spiegazione: 'Somma dei logaritmi; corregge la frase di p. 150 sull\'«80% della coppia» (NF-170).' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`\theta_1^* = \theta_2^*\,\theta_3^*`, errore: 'concetto', spiega: 'Si moltiplicano i rapporti delle tensioni, non gli angoli: gli angoli (logaritmi) si sommano.', num: (v) => [v.t1, v.t2 * v.t3] },
        { latex: L`\text{va per prima la condotta che riceve più coppia}`, errore: 'concetto', spiega: 'A parità di angoli θ₁* è maggiore di θ₂* e di θ₃*: la 2 può arrivarci prima solo se β₂ (o f₂) è più piccolo (NF-170).' },
      ],
      num: (v) => [v.t1, v.t2 + v.t3],
    },
    {
      id: 'd067.7',
      latex: L`\theta_1^* = \beta_1 \;\Rightarrow\; \theta_2^* = \tfrac{1}{f}\ln\tfrac{T'-\rho V^2}{T'''-\rho V^2} \le \beta_2,\quad \theta_3^* \le \beta_3`,
      perche: L`Metodo della dispensa con tre pulegge: si ipotizza quale puleggia va in I.S.G., si calcolano le tensioni e si verifica che gli altri archi di scorrimento stiano dentro i rispettivi avvolgimenti; se la verifica non torna si cambia ipotesi.`,
      fonte: D(151),
      distrattori: [],
    },
  ],
  risultato: { latex: L`\theta^*_{lim} = \beta_{min}\ \ (f \text{ uguale});\qquad \text{in generale limita } \min_i f_i\beta_i`, fonte: D(143) },
  gancio: 'Stessi rami, stesso salto: decide l\'arco più corto (a parità di f).',
};

// ------------------------------------------------------------------ argomento
export const eulero: ArgomentoContenuto = {
  id: 'c4-eulero',
  cosaDireSubito:
    'L\'equazione di Eulero dice come cambia la tensione lungo l\'arco in cui la cinghia striscia sulla puleggia. Dall\'equilibrio di un concio, tangenziale e radiale con la forza centrifuga, e con l\'attrito al limite dF_T = f dF_N, si ottiene dT/dθ = f(T − ρV²); integrando dalla sezione d\'uscita, (T − ρV²)/(T₂ − ρV²) = e^{fθ}. L\'arco avvolto si divide in aderenza, a tensione costante, e scorrimento θ*: quando θ* arriva a β_min la coppia è la massima, C_MAX = (T₂ − ρV²)(e^{fβ_min} − 1)R.',
  sistemaIpotesi: [
    'Sistema: concio di cinghia avvolto sulla motrice (raggio R), tra θ e θ + dθ; θ misurato dalla sezione d\'uscita.',
    'Regime (ω̇ = 0): forza d\'inerzia solo centrifuga dm V²/R; V costante lungo l\'arco (EA molto grande).',
    'Aderenza: tensione costante, niente attrito. Scorrimento: attrito coulombiano al limite, |dF_T| = f dF_N, opposto alla velocità relativa.',
    'Contatto: T > ρV² ovunque (cinghia pretensionata).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Motrice (dispensa p. 144): la cinghia entra in P₁ col ramo teso, aderisce fino a S₁, striscia fino all\'uscita Q₁. A destra il concio di p. 141.',
    fonte: { tipo: 'dispensa', pag: [141, 144], fig: 'figure manoscritte della puleggia motrice e del concio' },
    elementi: [
      { id: 'puleggia', testo: 'puleggia motrice con O₁, ω₁ e C₁ concorde', obbligatorio: true },
      { id: 'rami', testo: 'ramo teso T₁ che entra in P₁, ramo lasco T₂ che esce da Q₁', obbligatorio: true },
      { id: 'zone', testo: 'arco di aderenza α₁ (P₁–S₁) e di scorrimento θ* (S₁–Q₁) verso l\'uscita', obbligatorio: true },
      { id: 'origine', testo: 'origine di θ nella sezione d\'uscita Q₁', obbligatorio: true },
      { id: 'concio', testo: 'concio con T(θ), T(θ + dθ) perpendicolari alle facce, apertura dθ', obbligatorio: true },
      { id: 'forze', testo: 'dF_N verso l\'esterno, dm V²/R verso l\'esterno, dF_T tangente opposta alla crescita di T', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: L`dT = dF_T^{ATTR},\qquad dF_N = (T - \rho V^2)\,d\theta,\qquad dF_T^{ATTR} = f\,dF_N`,
    spiegazione: 'Equilibrio tangenziale e radiale del concio (con la centrifuga) e legge di Coulomb al limite nell\'arco di scorrimento.',
    fonte: { tipo: 'dispensa', pag: [140, 141] },
  },
  dimostrazioni: ['d057', 'd062', 'd063', 'd064', 'd065', 'd066', 'd067'],
  significato:
    'L\'attrito moltiplica la tensione in modo esponenziale con l\'arco che striscia: per questo bastano pochi radianti per trasmettere coppie grandi. La coppia non usa tutto l\'arco: cresce allargando la zona di scorrimento a spese di quella di aderenza, fino all\'incipiente scorrimento globale. La centrifuga si sottrae alla tensione che preme la cinghia sulla puleggia e riduce la coppia massima; senza attrito la cinghia non trasmette nulla.',
  fraseDaRicordare: 'Dove aderisce la tensione è costante, dove striscia è esponenziale; prima aderenza, poi scorrimento verso l\'uscita.',
  daNonDire: [
    { frase: 'θ* = 0 è l\'incipiente scorrimento globale.', perche: 'È l\'errore di p. 142 (NF-20): θ* = 0 vuol dire coppia nulla; l\'incipiente scorrimento globale è θ* = β.', fonte: { tipo: 'dispensa', pag: 142 } },
    { frase: 'Se l\'arco di aderenza si annulla la coppia non si trasmette.', perche: 'Con α = 0 si trasmette ancora la coppia massima: lo slittamento arriva solo chiedendo di più (NF-20).', fonte: { tipo: 'dispensa', pag: 142 } },
    { frase: 'dF_T = f dF_N su tutto l\'arco avvolto.', perche: 'Solo nell\'arco di scorrimento; nell\'aderenza l\'attrito non è al limite e la tensione è costante (NF-167).', fonte: { tipo: 'dispensa', pag: [140, 141] } },
    { frase: 'Sulla puleggia la cinghia prima striscia e poi aderisce.', perche: 'È il contrario: la dispensa lo dimostra per assurdo (p. 146).', fonte: { tipo: 'dispensa', pag: 146 } },
    { frase: 'Limita sempre la puleggia con l\'angolo di avvolgimento minore.', perche: 'Solo a parità di coefficiente d\'attrito: in generale limita il minimo di fβ (NF-168).', fonte: { tipo: 'deduzione', da: 'p. 143', spiegazione: 'stesso rapporto delle tensioni, fθ* uguali' } },
    { frase: 'La centrifuga agisce su entrambi i rami e quindi si elide.', perche: 'Si sottrae a T₂ in C_MAX = (T₂ − ρV²)(e^{fβ} − 1)R: riduce la coppia trasmissibile.', fonte: { tipo: 'dispensa', pag: 143 } },
    { frase: 'Nell\'equilibrio radiale la centrifuga è dm V²/2.', perche: 'Refuso di p. 141 (NF-35): è dm V²/R = ρV² dθ.', fonte: { tipo: 'dispensa', pag: 141 } },
  ],
  approfondimenti: [
    { domanda: 'Perché la forza normale e quella d\'inerzia si applicano al centro del concio?', tipo: 'approfondimento', attesa: 'Divide l\'angolo a metà e, se si mettessero altrove (per esempio a due terzi), le differenze sarebbero di ordine superiore.', fonte: { tipo: 'dispensa', pag: 141 } },
    { domanda: 'Perché puoi separare le variabili?', tipo: 'approfondimento', attesa: 'Perché si assume V costante sull\'arco (V₁ ≃ V₂ ≃ V): EA è molto grande e ε piccola. Altrimenti V dipenderebbe da T.', fonte: { tipo: 'dispensa', pag: 142 } },
    { domanda: 'Che cosa cambia nel freno a nastro?', tipo: 'collegamento', argomento: 'c4-freno-nastro', attesa: 'Il nastro è fermo, quindi ρV² = 0, e il tamburo striscia sotto tutto il nastro, θ* = β: T₁/T₂ = e^{fβ}.', fonte: { tipo: 'dispensa', pag: 153 } },
    { domanda: 'Perché prima aderenza e poi scorrimento?', tipo: 'approfondimento', attesa: 'Se all\'ingresso ci fosse scorrimento la cinghia dovrebbe andare più veloce della periferia e l\'attrito sarebbe concorde alla coppia motrice: non c\'è equilibrio. Sulla motrice nello scorrimento la cinghia va più piano della puleggia.', fonte: { tipo: 'dispensa', pag: [144, 146] } },
    { domanda: 'Come influisce la velocità sulla potenza trasmissibile?', tipo: 'collegamento', argomento: 'c4-velocita-ottima', attesa: 'W = C_MAX ω = (e^{fβ} − 1)(T₂ − ρV²)V: la centrifuga cresce con V², la potenza ha un massimo a V = √(T₂/3ρ) e si annulla a √(T₂/ρ).', fonte: { tipo: 'dispensa', pag: 152 } },
    { domanda: 'Quale attrito usi, statico o dinamico, e dove?', tipo: 'collegamento', argomento: 'c2-attrito', attesa: 'Nell\'arco di scorrimento la cinghia striscia (o è al limite): |dF_T| = f dF_N, opposto alla velocità relativa. Nell\'aderenza l\'attrito è minore del limite e la tensione non cambia.', fonte: { tipo: 'dispensa', pag: 140 } },
    { domanda: 'Con tre pulegge chi va per prima in scorrimento globale?', tipo: 'approfondimento', attesa: 'Si fa un\'ipotesi (di solito la motrice del partitore, che vede il salto di tensione maggiore) e si verificano gli altri θ* ≤ β. A parità di angoli θ₁* = θ₂* + θ₃*, quindi va per prima la 1.', fonte: { tipo: 'dispensa', pag: [150, 151] } },
    { domanda: 'Come imposti un esercizio sulle trasmissioni a cinghia?', tipo: 'approfondimento', attesa: 'Con tre equazioni: C_i = (T₁ − T₂)R_i usata N − 1 volte (N pulegge), l\'equazione di Eulero sulla puleggia che si ipotizza in incipiente scorrimento globale, l\'equazione del forzamento (rullo tenditore: T₂ = cost; base mobile: αT₁ + βT₂ = cost). Poi si verifica θ* ≤ β sulle altre pulegge.', fonte: { tipo: 'dispensa', pag: [147, 151] } },
    { domanda: 'Che analogia c\'è con lo pneumatico?', tipo: 'approfondimento', attesa: 'L\'impronta ha una zona anteriore in aderenza e una posteriore in scorrimento, dove nasce la forza di trazione; più coppia allarga lo scorrimento a spese dell\'aderenza.', fonte: { tipo: 'dispensa', pag: [145, 146] } },
  ],
  simboli: [
    { simbolo: 'f', significato: 'coefficiente d\'attrito cinghia–puleggia', altrove: 'μ nelle domande' },
    { simbolo: L`\rho`, significato: 'massa per unità di lunghezza della cinghia (non definita in D)', altrove: 'm nelle domande, ρ_l nelle dimostrazioni' },
    { simbolo: L`\rho V^2`, significato: 'termine centrifugo per unità d\'angolo', altrove: 'T_c = mv² («tensione centrifuga»), mai usato in D (NF-13)' },
    { simbolo: L`\theta`, significato: 'posizione angolare sull\'arco, da 0 nella sezione d\'uscita' },
    { simbolo: L`\theta^*`, significato: 'arco (angolo) di scorrimento' },
    { simbolo: L`\alpha_1`, significato: 'arco di aderenza (θ* + α₁ = β₁)', altrove: 'α ha altri tre significati nel capitolo (forzamento, tenditore)' },
    { simbolo: L`\beta_1,\ \beta_{min}`, significato: 'angolo di avvolgimento, minimo tra le pulegge' },
    { simbolo: L`dF_N,\ dF_T^{ATTR}`, significato: 'azione normale e d\'attrito della puleggia sul concio', altrove: 'dN, dF_T' },
    { simbolo: L`S_1,\ S_2`, significato: 'punti di separazione tra aderenza e scorrimento' },
    { simbolo: L`T',\ T'',\ T'''`, significato: 'tensioni massima, minima e intermedia con tre pulegge' },
    { simbolo: 'I.S.G.', significato: 'incipiente scorrimento globale (θ* = β)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c4-tensione-arco' }],
  previsioni: [
    {
      id: 'c4-eu-aderenza',
      domanda: 'Con T₂ fissata dal tenditore, aumento la coppia trasmessa (restando sotto C_MAX). L\'arco di aderenza α…',
      opzioni: ['si allunga', 'resta uguale', 'si accorcia', 'si annulla subito'],
      corretta: 2,
      spiega: 'Serve più salto di tensione, quindi più arco di scorrimento: θ* = (1/f) ln[1 + C/(R(T₂ − ρV²))] cresce e α = β − θ* cala.',
      verify: () => {
        const p = { T2: 100, rhoV2: 10, f: 0.3, beta: Math.PI, R: 0.1 };
        const a = arcoAvvolto({ ...p, C: 5 }).alfa, b = arcoAvvolto({ ...p, C: 10 }).alfa;
        return b < a ? (b <= 0 ? 3 : 2) : b > a ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c4-tensione-arco' },
    },
    {
      id: 'c4-eu-centrifuga',
      domanda: 'A parità di T₂, f e β, la cinghia passa da velocità quasi nulla a una velocità con ρV² = 0,3 T₂. La coppia massima…',
      opzioni: ['resta uguale', 'cala del 30 %', 'cresce del 30 %', 'cala di e^{fβ} volte'],
      corretta: 1,
      spiega: 'C_MAX = (T₂ − ρV²)(e^{fβ} − 1)R: il fattore T₂ − ρV² passa da T₂ a 0,7 T₂.',
      verify: () => {
        const p = { T2: 100, f: 0.3, beta: Math.PI, R: 0.1, C: 0 };
        const r = arcoAvvolto({ ...p, rhoV2: 30 }).Cmax / arcoAvvolto({ ...p, rhoV2: 0 }).Cmax;
        return Math.abs(r - 0.7) < 1e-12 ? 1 : r > 1 ? 2 : Math.abs(r - 1) < 1e-12 ? 0 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c4-tensione-arco' },
    },
  ],
  nf: ['NF-13', 'NF-20', 'NF-35', 'NF-167', 'NF-168', 'NF-169', 'NF-170'],
};
