/**
 * C3 · Ipotesi di Reye–Archard e distribuzione di pressione (domanda q37).
 * Dispensa pp. 108–109 (tamburo), 114 (pattino), 116 e 120 (disco, frizione (5.85)).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { consumoEstremi, discoSettore, simpson } from '../../engine/c3';
import { angle, arc, arrow, circle, dot, line, pin, pt, rot, svg, text } from '../svg';
import { D, dot as dt, wk } from './comune';

// ------------------------------------------------------------------ disegno (p. 108: ceppo esterno, O' sotto O)
function disegno() {
  const cx = 140, cy = 112, R = 70;
  const ox = cx, oy = cy + 108; // cerniera O' sotto O
  const a0 = -40, a1 = 40, th = 22;
  const [px, py] = pt(cx, cy, R, th);
  const [ux, uy] = pt(cx, cy, R + 9, a1);
  const [lx, ly] = pt(cx, cy, R + 9, a0);
  const [nx, ny] = pt(cx, cy, R - 24, th);
  const [qx, qy] = pt(cx, cy, R + 30, a0 - 9);
  const [e0x, e0y] = pt(cx, cy, R, a0);
  const [e1x, e1y] = pt(cx, cy, R, a1);
  return svg(340, 290, [
    line(cx - R - 18, cy, cx + R + 60, cy, 'd'), line(cx, cy - R - 16, cx, oy, 'd'),
    text(cx + R + 66, cy - 8, 'x', { c: 'm' }),
    circle(cx, cy, R, 'l'),
    arc(cx, cy, R + 5, a0, a1, 'a'), arc(cx, cy, R + 9, a0, a1, 'a'),
    line(ux, uy, cx + R + 24, cy - 74, 'l', 3), line(lx, ly, ox + 6, oy - 4, 'l', 3),
    pin(ox, oy, "O'"),
    arrow(cx + R + 72, cy - 74, cx + R + 28, cy - 74, 'f', 'F', 10, -12),
    line(cx, cy, e0x, e0y, 'm'), line(cx, cy, e1x, e1y, 'm'), line(cx, cy, px, py, 'm'),
    dot(cx, cy, 'O', -12, -10),
    rot(cx, cy, 28, 200, 265, 'v', 'ω'),
    angle(cx, cy, 30, 0, th, 'θ'),
    arc(cx, cy, R + 22, a0, a1, 'm'), text(qx, qy, 'α', { c: 'a', size: 14 }),
    dot(cx + R, cy, 'm', 10, 12),
    dot(px, py, 'P', 8, -12, 'a'),
    arrow(px, py, nx, ny, 'm'), text(...pt(cx, cy, R - 16, th - 9), 'n', { c: 'm', it: true }),
    arrow(px, py, px - 46, py, 'v'), text(px - 40, py - 14, 'V_acc', { c: 'v', size: 12 }),
    text(170, 270, 'δ̇(θ) = ω_acc · OO′ · cos θ  ≃  δ̇(0)  ⇒  p ≃ p₀', { c: 'a', size: 13 }),
  ], 'Ceppo esterno incernierato in O′ sotto O: consumo nel punto P dalla velocità di accostamento');
}

// ------------------------------------------------------------------ d040 · legge di usura (pp. 108–109)
export const d040: Dimostrazione = {
  id: 'd040',
  titolo: 'Ipotesi di Reye: consumo proporzionale alla potenza dissipata',
  enunciato: 'Enunciare l\'ipotesi di Reye, ricavare il legame fra consumo e pressione e, dalla cinematica di accostamento del ceppo, la distribuzione di pressione nel freno a tamburo.',
  ipotesi: [
    'consumo δ̇ = dδ/dt: spessore di materiale d\'attrito asportato nell\'unità di tempo, misurato lungo la normale',
    'attrito coulombiano dF_T = f dF_N, con f, k, ω, R costanti sul ceppo',
    'ceppo esterno ad accostamento rigido, cerniera O\' sulla verticale per O (figura di p. 108); arco simmetrico −α/2…α/2',
  ],
  sample: (rnd) => {
    const k = U(rnd, 0.5, 2), f = U(rnd, 0.2, 0.5), w = U(rnd, 10, 100), R = U(rnd, 0.1, 0.3), p = U(rnd, 1e5, 1e6);
    const dA = U(rnd, 1e-5, 1e-4), alpha = U(rnd, Math.PI / 3, Math.PI / 2), theta = U(rnd, -alpha / 2, alpha / 2);
    const d = U(rnd, 0.1, 0.3), wacc = U(rnd, 0.01, 0.1);
    return { k, f, w, R, p, dA, alpha, theta, d, wacc, kp: k * f * w * R, dd: k * f * w * R * p };
  },
  passi: [
    {
      id: 'd040.1',
      latex: '\\text{portata} = \\dfrac{d\\delta\\,dA}{dt} = \\dot\\delta\\,dA \\;\\left[\\tfrac{m^3}{s}\\right],\\qquad \\dot\\delta = \\dfrac{d\\delta}{dt}\\ \\text{(consumo)}',
      perche: 'Definizioni di p. 108: il volume di materiale d\'attrito asportato nell\'unità di tempo da un\'area $dA$ è la «portata»; lo spessore asportato nell\'unità di tempo è il consumo $\\dot\\delta$.',
      fonte: D(108),
      distrattori: [],
    },
    {
      id: 'd040.2',
      latex: '\\dot\\delta\\,dA = k\\,\\big|\\,d\\underline F_T\\cdot\\underline V_P|_{\\rm rel}\\big|',
      perche: 'È l\'ipotesi dell\'usura di Reye: il volume asportato nell\'unità di tempo è proporzionale alla **potenza dissipata** dalla forza d\'attrito elementare, cioè al prodotto della forza tangenziale per la velocità di strisciamento.',
      fonte: D(109),
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta\\,dA = k\\,|d\\underline F_N|', errore: 'concetto', spiega: 'Così il consumo dipenderebbe solo dal carico: Reye mette in gioco la potenza dissipata, quindi anche la velocità di strisciamento.' },
        { latex: '\\dot\\delta\\,dA = k\\,|d\\underline F_T|\\,|\\underline V_{acc}|', errore: 'concetto', spiega: 'La velocità che dissipa è quella di strisciamento del tamburo rispetto al ceppo, non quella (piccolissima) di accostamento del ceppo.' },
      ],
    },
    {
      id: 'd040.3',
      latex: '\\dot\\delta\\,dA = k\\,\\big|(-f\\,p\\,dA\\,\\underline e_\\theta)\\cdot(\\omega R\\,\\underline e_\\theta)\\big| = k f p\\,\\omega R\\,dA',
      perche: 'Si sostituiscono $d\\underline F_T = -f\\,p\\,dA\\,\\underline e_\\theta$ (p. 106) e $\\underline V_P|_{\\rm rel} = \\omega R\\,\\underline e_\\theta$: i due vettori sono paralleli e il prodotto scalare vale $f p\\,\\omega R\\,dA$ in modulo. Poi si semplifica $dA$.',
      fonte: D(109),
      distrattori: [],
      num: (v) => {
        const e: [number, number] = [-Math.sin(v.theta), Math.cos(v.theta)];
        const dFT: [number, number] = [-v.f * v.p * v.dA * e[0], -v.f * v.p * v.dA * e[1]];
        const V: [number, number] = [v.w * v.R * e[0], v.w * v.R * e[1]];
        return [(v.k * Math.abs(dt(dFT, V))) / v.dA, v.k * v.f * v.p * v.w * v.R];
      },
    },
    {
      id: 'd040.4',
      latex: '\\dot\\delta(\\theta) = \\underbrace{k f \\omega R}_{k\'}\\;p(\\theta) = k\'\\,p(\\theta)',
      perche: '$f$, $\\omega$, $R$ e $k$ non dipendono dal punto: la loro combinazione è una costante $k\'$. Quindi **consumo e pressione sono proporzionali**: dove so il consumo, so la pressione.',
      fonte: D(109),
      distrattori: [
        { latex: '\\dot\\delta = \\dfrac{k\'}{p}', errore: 'concetto', spiega: 'Più pressione vuol dire più potenza dissipata, quindi più consumo, non meno.', num: (v) => [v.dd, v.kp / v.p] },
      ],
      num: (v) => [v.dd, v.kp * v.p],
    },
    {
      id: 'd040.5',
      latex: '\\dot\\delta = \\underline V_{acc}(P)\\cdot\\underline n = \\underline\\omega_{acc}\\wedge\\big[(P-O) + (O-O\')\\big]\\cdot\\underline n = \\omega_{acc}\\,\\overline{OO\'}\\cos\\theta',
      perche: 'Il consumo si legge dalla **cinematica di accostamento**: il ceppo ruota attorno a $O\'$ e la velocità di $P$ lungo la normale è lo spessore consumato nell\'unità di tempo. Si spezza $(P-O\')$: $\\underline\\omega_{acc}\\wedge(P-O)$ è tangente all\'arco, quindi perpendicolare a $\\underline n$, e resta $\\underline\\omega_{acc}\\wedge(O-O\')\\cdot\\underline n = \\omega_{acc}\\overline{OO\'}(-\\underline i\\cdot\\underline n) = \\omega_{acc}\\overline{OO\'}\\cos\\theta$.',
      fonte: D(108),
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta = \\omega_{acc}\\,\\overline{OO\'}\\sin\\theta', errore: 'convenzione', spiega: 'θ si misura dalla bisettrice (asse x per O): il prodotto −i·n vale cos θ, non sin θ.', num: (v) => [v.wacc * v.d * Math.cos(v.theta), v.wacc * v.d * Math.sin(v.theta)] },
        { latex: '\\dot\\delta = \\omega_{acc}\\,R\\cos\\theta', errore: 'termine-perso', spiega: 'Il termine con R, ω_acc∧(P−O), è tangente e sparisce nel prodotto con n: resta il braccio OO\'.', num: (v) => [v.wacc * v.d * Math.cos(v.theta), v.wacc * v.R * Math.cos(v.theta)] },
      ],
      num: (v) => {
        const P: [number, number] = [v.R * Math.cos(v.theta), v.R * Math.sin(v.theta)];
        const Vacc = wk(v.wacc, P[0] - 0, P[1] + v.d); // O' = (0, −d)
        const n: [number, number] = [-Math.cos(v.theta), -Math.sin(v.theta)];
        return [dt(Vacc, n), v.wacc * v.d * Math.cos(v.theta)];
      },
    },
    {
      id: 'd040.6',
      latex: '\\dfrac{\\dot\\delta(\\alpha/2)}{\\dot\\delta(0)} = \\cos\\dfrac{\\alpha}{2} \\;\\xrightarrow{\\ \\alpha = \\pi/2\\ }\\; \\dfrac{\\sqrt2}{2} \\simeq 0{,}7',
      perche: 'Il consumo segue una legge cosinusoidale: massimo al centro dell\'arco ($\\theta = 0$, punto m), minimo agli estremi. Con l\'apertura usuale $\\alpha \\le 90°$ agli estremi il consumo cala al più del 30 %.',
      fonte: D(108),
      distrattori: [
        { latex: '\\dfrac{\\dot\\delta(\\alpha/2)}{\\dot\\delta(0)} = \\cos\\alpha', errore: 'fattore', spiega: 'L\'estremo dell\'arco è a θ = α/2, non a α: con α = 90° il calo è del 30 %, non del 100 %.', num: (v) => [Math.cos(v.alpha / 2), Math.cos(v.alpha)] },
      ],
      num: (v) => [(v.wacc * v.d * Math.cos(v.alpha / 2)) / (v.wacc * v.d), consumoEstremi(v.alpha)],
    },
    {
      id: 'd040.7',
      latex: '\\dot\\delta(\\theta) \\simeq \\dot\\delta(0) \\;\\Rightarrow\\; p(\\theta) = \\dfrac{\\dot\\delta}{k\'} \\simeq p_0 \\quad\\text{(pressione uniforme)}',
      perche: 'Si trascura la variazione del consumo lungo l\'arco (consumo uniforme). Poiché la pressione è proporzionale al consumo, anche la pressione è uniforme: è la giustificazione della $p = p_0$ usata a pp. 106–107.',
      fonte: D(109),
      chiave: true,
      distrattori: [
        { latex: 'p(\\theta) = \\dfrac{K\'\'}{R}\\ \\text{perché}\\ p\\,v = \\text{cost}', errore: 'concetto', spiega: 'Nel tamburo tutti i punti strisciano alla stessa velocità ωR: la pressione segue il consumo, che qui viene dalla rotazione attorno a O\'. L\'iperbole K\'\'/r è del disco.' },
        { latex: 'p(\\theta) = p_0\\ \\text{perché il ceppo è nuovo}', errore: 'ipotesi', spiega: 'Qui la pressione uniforme non è un\'ipotesi sul ceppo nuovo: viene da Reye più la cinematica (consumo quasi uniforme per α ≤ 90°).' },
      ],
    },
  ],
  risultato: { latex: '\\dot\\delta = k\'\\,p,\\quad k\' = k f\\omega R;\\qquad \\text{tamburo: } \\dot\\delta = \\dot\\delta(0)\\cos\\theta \\simeq \\dot\\delta(0) \\Rightarrow p \\simeq p_0', fonte: D([108, 109]) },
  gancio: 'Il consumo lo dà la cinematica, Reye lo trasforma in pressione: δ̇ = k\'p.',
};

// ------------------------------------------------------------------ d041 · pressione iperbolica nel disco (pp. 116, 120)
export const d041: Dimostrazione = {
  id: 'd041',
  titolo: 'Distribuzione di pressione da Reye nel disco: p = K\'\'/r',
  enunciato: 'Ricavare con l\'ipotesi di Reye la distribuzione di pressione su un pattino (o una corona) premuto su un disco rotante con accostamento traslatorio.',
  ipotesi: [
    'disco che ruota con ω; pattino a settore fra r_i e r_e, accostamento rigido traslatorio (coppia prismatica) perpendicolare al disco',
    'ipotesi di Reye: δ̇ dA = k |dF_T · V_P|; attrito coulombiano con f costante',
  ],
  sample: (rnd) => {
    const ri = U(rnd, 0.05, 0.1), re = ri + U(rnd, 0.03, 0.1), r = U(rnd, ri, re);
    const k = U(rnd, 0.5, 2), f = U(rnd, 0.2, 0.5), w = U(rnd, 10, 100), dd = U(rnd, 1, 2), dA = U(rnd, 1e-5, 1e-4);
    const alpha = U(rnd, Math.PI / 6, Math.PI / 2), N = U(rnd, 1000, 10000), theta = U(rnd, -alpha / 2, alpha / 2);
    const kp = k * f * w, K = dd / kp, p = K / r;
    return { ri, re, r, k, f, w, dd, dA, alpha, N, theta, kp, K, p };
  },
  passi: [
    {
      id: 'd041.1',
      latex: '\\underline V_P = \\underline\\omega\\wedge(P-O) = \\omega\\,r\\,\\underline e_\\theta',
      perche: 'La velocità di strisciamento del punto $P$ del disco cresce con il raggio $r$ (la dispensa a p. 116 scrive $R$ per il raggio corrente).',
      fonte: D(116),
      distrattori: [],
    },
    {
      id: 'd041.2',
      latex: '\\underline V_{acc}\\ \\text{uguale in tutti i punti e} \\perp \\text{disco} \\;\\Rightarrow\\; \\dot\\delta = \\underline V_{acc}\\cdot\\hat m = \\text{costante}',
      perche: 'Il pattino è guidato da una coppia prismatica: l\'atto di moto di accostamento è **traslatorio**, tutti i punti hanno la stessa velocità normale al disco, quindi il consumo è uniforme (pp. 116, 126).',
      fonte: D([116, 126]),
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta \\propto r\\ \\text{(fuori si striscia di più)}', errore: 'concetto', spiega: 'Il consumo a regime è imposto dalla cinematica di accostamento: il pattino trasla e si consuma in modo uniforme. Che fuori si strisci di più cambia la pressione, non il consumo.' },
        { latex: '\\dot\\delta = \\dot\\delta(0)\\cos\\theta\\ \\text{come nel tamburo}', errore: 'ipotesi', spiega: 'La legge cosinusoidale viene dalla rotazione del ceppo attorno a O\'. Qui l\'accostamento è una traslazione.' },
      ],
    },
    {
      id: 'd041.3',
      latex: '\\dot\\delta\\,dA = k\\,\\big|(-f p\\,dA\\,\\underline e_\\theta)\\cdot\\omega r\\,\\underline e_\\theta\\big| \\;\\Rightarrow\\; \\dot\\delta = \\underbrace{k f\\omega}_{k\'}\\,r\\,p(r)',
      perche: 'Reye con la velocità di strisciamento $\\omega r$: il consumo è proporzionale al prodotto della pressione per il raggio.',
      fonte: D(116),
      distrattori: [],
      num: (v) => {
        const e: [number, number] = [-Math.sin(v.theta), Math.cos(v.theta)];
        const dFT: [number, number] = [-v.f * v.p * v.dA * e[0], -v.f * v.p * v.dA * e[1]];
        const V: [number, number] = [v.w * v.r * e[0], v.w * v.r * e[1]];
        return [(v.k * Math.abs(dt(dFT, V))) / v.dA, v.kp * v.r * v.p];
      },
    },
    {
      id: 'd041.4',
      latex: '\\dot\\delta = k\'\\,r\\,p(r) = \\text{cost} \\;\\Rightarrow\\; p(r) = \\dfrac{\\dot\\delta}{k\'\\,r} = \\dfrac{K\'\'}{r}',
      perche: 'Consumo uniforme e $\\dot\\delta \\propto r\\,p$: il prodotto $r\\,p$ deve essere costante. La pressione è **iperbolica**: alta al raggio interno, bassa all\'esterno ($K\'\' = \\dot\\delta/k\'$).',
      fonte: D(116),
      chiave: true,
      distrattori: [
        { latex: 'p(r) = K\'\'\\,r', errore: 'indice', spiega: 'Se r·p è costante, p va come 1/r: più fuori si striscia più veloce, quindi serve meno pressione per consumare uguale.', num: (v) => [v.p, v.K * v.r] },
        { latex: 'p(r) = \\dfrac{K\'\'}{r^2}', errore: 'fattore', spiega: 'La velocità di strisciamento è lineare in r: basta 1/r.', num: (v) => [v.p, v.K / (v.r * v.r)] },
      ],
      num: (v) => [v.dd / (v.kp * v.r), v.K / v.r],
    },
    {
      id: 'd041.5',
      latex: 'F_N = \\int_{-\\alpha/2}^{\\alpha/2}\\!\\!\\int_{r_i}^{r_e} \\dfrac{K\'\'}{r}\\,r\\,dr\\,d\\theta = K\'\'\\,\\alpha\\,(r_e - r_i)',
      perche: 'Sul pattino a settore $dA = r\\,dr\\,d\\theta$: la $r$ dell\'area si semplifica con quella della pressione e l\'integrale è immediato (p. 116).',
      fonte: D(116),
      distrattori: [],
      num: (v) => [simpson((r) => v.alpha * (v.K / r) * r, v.ri, v.re), v.K * v.alpha * (v.re - v.ri)],
    },
    {
      id: 'd041.6',
      latex: 'N = \\int_{r_i}^{r_e} \\dfrac{K}{r}\\,2\\pi r\\,dr = 2\\pi K (r_e - r_i) \\;\\Rightarrow\\; p = \\dfrac{N}{2\\pi r\\,(r_e - r_i)}',
      perche: 'Per la corona completa della frizione ($\\alpha = 2\\pi$) si esprime la costante con la forza assiale $N$: è la (5.85) del libro.',
      fonte: D(120, { eq: '(5.85)' }),
      distrattori: [
        { latex: 'p = \\dfrac{N}{\\pi\\,(r_e^2 - r_i^2)}', errore: 'ipotesi', spiega: 'È la pressione uniforme (disco nuovo): con l\'usura stabilizzata la pressione dipende da r.', num: (v) => [v.N / (2 * Math.PI * v.r * (v.re - v.ri)), v.N / (Math.PI * (v.re ** 2 - v.ri ** 2))] },
      ],
      num: (v) => {
        const Kc = v.N / (2 * Math.PI * (v.re - v.ri));
        return [simpson((r) => (Kc / r) * 2 * Math.PI * r, v.ri, v.re), v.N];
      },
    },
    {
      id: 'd041.7',
      latex: '\\dfrac{p(r_i)}{p(r_e)} = \\dfrac{r_e}{r_i} > 1',
      perche: 'La pressione massima è al raggio interno ($p_1$ nella Fig. 5-62 b), la minima all\'esterno ($p_2$). Il disco nuovo parte da pressione uniforme (Fig. 5-62 a) e si consuma di più all\'esterno finché si arriva a questa distribuzione (Fig. 5-62 c).',
      fonte: D(108, { fig: '5-62' }),
      distrattori: [],
      num: (v) => {
        const r = discoSettore({ ri: v.ri, re: v.re, alpha: v.alpha, f: v.f, FN: v.N, legge: 'usura' });
        return [r.pr(v.ri) / r.pr(v.re), v.re / v.ri];
      },
    },
  ],
  risultato: { latex: 'p(r) = \\dfrac{K\'\'}{r},\\qquad F_N = K\'\'\\alpha(r_e - r_i),\\qquad \\text{corona: } p = \\dfrac{N}{2\\pi r(r_e - r_i)}', fonte: D([116, 120]) },
  gancio: 'Il pattino trasla: consumo uniforme; fuori si striscia di più: pressione come 1/r.',
};

// ------------------------------------------------------------------ argomento
export const reye: ArgomentoContenuto = {
  id: 'c3-reye',
  cosaDireSubito:
    'L\'ipotesi di Reye dice che il volume di materiale d\'attrito asportato nell\'unità di tempo è proporzionale alla potenza dissipata: δ̇ dA = k |dF_T · V|, quindi il consumo è proporzionale alla pressione per la velocità di strisciamento. Serve perché la statica da sola non dà la distribuzione di pressione: ricavo il consumo dalla cinematica di accostamento, δ̇ = V_acc · n, e da lì la pressione.',
  sistemaIpotesi: [
    'Contatto fra materiale d\'attrito (ferodo) e un elemento che striscia: tamburo, nastro o disco.',
    'Usura stabilizzata: il consumo δ̇ è quello imposto dal moto di accostamento dell\'elemento frenante.',
    'Attrito coulombiano dF_T = f dF_N; k costante del materiale.',
    'Tre casi della dispensa: tamburo (rotazione attorno a O\'), pattino (rotazione attorno a O sul nastro), disco (traslazione).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Consumo nel ceppo esterno (dispensa p. 108): la velocità di accostamento ω_acc∧(O−O′) proiettata sulla normale dà δ̇ = ω_acc·OO′·cos θ.',
    fonte: D(108, { fig: 'schizzo manoscritto con ω_acc∧(O−O′)' }),
    elementi: [
      { id: 'tamburo', testo: 'tamburo di centro O e raggio R, con il verso di ω', obbligatorio: true },
      { id: 'ceppo', testo: 'ceppo esterno con arco α simmetrico rispetto all\'asse x (bisettrice)', obbligatorio: true },
      { id: 'cerniera', testo: 'cerniera O′ sulla verticale per O, distanza OO′', obbligatorio: true },
      { id: 'P', testo: 'punto P sull\'arco all\'angolo θ e normale n verso O', obbligatorio: true },
      { id: 'vacc', testo: 'velocità di accostamento ω_acc∧(O−O′) in P (la parte normale all\'arco)', obbligatorio: true },
      { id: 'm', testo: 'punto medio m dell\'arco, dove il consumo è massimo', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\dot\\delta\\,dA = k\\,\\big|d\\underline F_T\\cdot\\underline V_P|_{\\rm rel}\\big| \\;\\Rightarrow\\; \\dot\\delta = k f v\\,p, \\qquad \\dot\\delta = \\underline V_{acc}(P)\\cdot\\underline n',
    spiegazione: 'Reye lega consumo e pressione; la cinematica di accostamento dà il consumo. Messe insieme danno la pressione.',
    fonte: D([108, 109]),
  },
  dimostrazioni: ['d040', 'd041'],
  significato:
    'Reye chiude il problema iperstatico del contatto esteso: la pressione segue il consumo diviso la velocità di strisciamento. Tamburo: la velocità è ωR ovunque e il consumo è quasi uniforme, quindi p ≃ p₀. Pattino: il consumo cresce linearmente con la distanza da O*, quindi p = k′x. Disco: il consumo è uniforme ma la velocità cresce con r, quindi p = K″/r.',
  fraseDaRicordare: 'Consumo dalla cinematica, pressione da Reye: δ̇ = k′ p (per la velocità).',
  daNonDire: [
    { frase: 'Reye dice che p·v è costante.', perche: 'Reye dice δ̇ ∝ p·v. Il prodotto è costante solo dove il consumo è uniforme, e il consumo si ricava dalla cinematica: nel pattino non è uniforme (NF-144).', fonte: D(109) },
    { frase: 'Nel tamburo il consumo è esattamente uniforme.', perche: 'È δ̇(0) cos θ: con α = 90° agli estremi è il 70 % del centro. La pressione uniforme è un\'approssimazione.', fonte: D(108) },
    { frase: 'Nel disco la pressione è più alta all\'esterno, dove si striscia di più.', perche: 'È il contrario: consumo uniforme e velocità ∝ r danno p = K″/r, massima al raggio interno.', fonte: D(116) },
    { frase: 'Il consumo dipende dalla velocità di accostamento del ceppo moltiplicata per l\'attrito.', perche: 'La potenza dissipata usa la velocità di strisciamento (ωR); la velocità di accostamento serve a ricavare il consumo come sua componente normale.', fonte: D([108, 109]) },
  ],
  approfondimenti: [
    { domanda: 'Perché nel freno a tamburo si può prendere la pressione uniforme?', tipo: 'collegamento', argomento: 'c3-ceppi', attesa: 'Il ceppo ruota attorno a O′: il consumo è ω_acc·OO′·cos θ, al più il 30 % in meno agli estremi per α ≤ 90°. Trascurando la variazione il consumo è uniforme, e per Reye anche la pressione.', fonte: D([108, 109]) },
    { domanda: 'E nel freno a pattino?', tipo: 'collegamento', argomento: 'c3-pattino', attesa: 'Il pattino ruota attorno a O sopra il nastro: il consumo è ω_acc·x, lineare con la distanza da O*; la velocità del nastro è la stessa ovunque, quindi p = k′x.', fonte: D(114) },
    { domanda: 'Che pressione c\'è su un pattino del freno a disco, e perché?', tipo: 'collegamento', argomento: 'c3-disco', attesa: 'Il pattino trasla (coppia prismatica): consumo uniforme; la velocità di strisciamento è ωr; quindi r·p costante, p = K″/r, massima al raggio interno.', fonte: D(116) },
    { domanda: 'Com\'è la pressione in una frizione nuova e come cambia?', tipo: 'collegamento', argomento: 'c3-frizione-piana', attesa: 'Da nuova è ragionevole p costante (Fig. 5-62 a); con p costante si consuma di più all\'esterno, il disco diventa più sottile al diametro esterno (Fig. 5-62 c) e la pressione si porta a K/r (5.85).', fonte: D([108, 120]) },
    { domanda: 'Perché serve un\'ipotesi in più oltre alla statica?', tipo: 'approfondimento', attesa: 'Il contatto esteso è iperstatico: le equazioni cardinali danno le risultanti, non come la pressione si distribuisce. Il pattino ad accostamento rigido è iperstatico di un grado (p. 114).', fonte: D(114) },
    { domanda: 'Quanto vale il consumo agli estremi del ceppo con α = 90°?', tipo: 'approfondimento', attesa: 'δ̇(45°)/δ̇(0) = cos 45° ≈ 0,71: circa il 30 % in meno che al centro.', fonte: D(108) },
  ],
  simboli: [
    { simbolo: '\\dot\\delta', significato: 'consumo: spessore asportato nell\'unità di tempo (lungo la normale)' },
    { simbolo: 'k,\\ \\bar k,\\ k\',\\ K\'\'', significato: 'costanti dell\'ipotesi d\'usura (la dispensa le ridefinisce su ogni pagina)', altrove: 'K nelle risposte alle domande' },
    { simbolo: 'f', significato: 'coefficiente d\'attrito', altrove: 'μ nelle domande (q37)' },
    { simbolo: '\\underline V_{acc},\\ \\omega_{acc}', significato: 'velocità e velocità angolare del moto di accostamento' },
    { simbolo: '\\underline n,\\ \\hat m', significato: 'versore normale alla superficie d\'attrito (n nel tamburo, m nel pattino, m̂ = −k̂ nel disco)' },
    { simbolo: 'O\'', significato: 'cerniera (centro di rotazione) del ceppo; OO′ la sua distanza dal centro del tamburo' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c3-ceppo-consumo' }, { kind: 'meccanismo', id: 'c3-disco' }],
  previsioni: [
    {
      id: 'c3-reye-estremi',
      domanda: 'Ceppo esterno con cerniera sotto O e arco α = 90°: il consumo agli estremi dell\'arco, rispetto al centro, è circa…',
      opzioni: ['uguale', 'il 70 %', 'la metà', 'nullo'],
      corretta: 1,
      spiega: 'δ̇(α/2)/δ̇(0) = cos 45° ≈ 0,71: −30 %, che la dispensa trascura per prendere p uniforme.',
      verify: () => {
        const r = consumoEstremi(Math.PI / 2);
        return Math.abs(r - 1) < 0.05 ? 0 : Math.abs(r - 0.7) < 0.05 ? 1 : Math.abs(r - 0.5) < 0.05 ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c3-ceppo-consumo' },
    },
    {
      id: 'c3-reye-disco',
      domanda: 'Pattino del freno a disco, usura stabilizzata: dove è massima la pressione?',
      opzioni: ['al raggio interno', 'al raggio medio', 'al raggio esterno', 'è uniforme'],
      corretta: 0,
      spiega: 'p = K″/r: massima a r_i. Il consumo è uniforme e fuori si striscia di più.',
      verify: () => {
        const r = discoSettore({ ri: 0.06, re: 0.12, alpha: 1, f: 0.35, FN: 3000, legge: 'usura' });
        return r.pr(0.06) > r.pr(0.09) && r.pr(0.09) > r.pr(0.12) ? 0 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c3-disco' },
    },
  ],
  nf: ['NF-144'],
};
