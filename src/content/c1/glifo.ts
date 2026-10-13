/**
 * C1 · Glifo oscillante: rapido ritorno e forze vive (domanda q01). Dispensa pp. 64–65 (glifo a sei membri, solo
 * esempio delle forze vive). Il rapido ritorno non è nella dispensa: deduzione (NF-07, NF-103).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import {
  dot, estremiGlifo, estremiGlifoNumerici, glifo, jadd, jatan2, jc, jmul, jnorm, jpolar, jsc, jsqrt, jsub, jt, sub, wedge, type J, type JV, type V2,
} from '../../engine/c1';
import { angle, arc, arrow, ground, hinge, line, pin, rect, rot, svg, text } from '../svg';
import { D, DED, EST, L, get, pj, put, pv } from './comune';

// ------------------------------------------------------------------ disegno (figura di p. 64, con le posizioni estreme)
function disegno() {
  const S = (p: V2): V2 => [200 + p[0], 182 - p[1]];
  const r = 50, d = 100, Lg = 220, l3 = 120, yE = 113, th = (40 * Math.PI) / 180;
  const G = glifo({ r, d, L: Lg, l3, yE, theta: th, omega1: 1 });
  const dl = (Math.asin(r / d) * 180) / Math.PI;
  const [A, B, C, Dp, E] = [G.A, G.B, G.C, G.D, G.E].map(S);
  const u: V2 = [Math.cos(G.psi), -Math.sin(G.psi)], nn: V2 = [-u[1] * 5, u[0] * 5];
  const ext = (deg: number) => { const a = (deg * Math.PI) / 180; return S([Lg * 0.9 * Math.cos(a), -d + Lg * 0.9 * Math.sin(a)]); };
  return svg(400, 300, [
    arc(A[0], A[1], r, 0, 359.9, 'd'),
    arc(A[0], A[1], r + 9, -dl, 180 + dl, 'a'), arc(A[0], A[1], r + 9, 180 + dl, 360 - dl, 'v'),
    text(A[0], A[1] - r - 22, 'π + 2δ (corsa lenta)', { c: 'a', size: 12 }), text(A[0] + 96, A[1] + 58, 'π − 2δ (rapida)', { c: 'v', size: 12 }),
    line(...C, ...ext(90 - dl), 'd'), line(...C, ...ext(90 + dl), 'd'), line(...C, ...A, 'm'),
    angle(C[0], C[1], 46, 90 - dl, 90, 'δ'),
    // glifo con la cava (due bordi paralleli)
    line(C[0] + nn[0], C[1] + nn[1], Dp[0] + nn[0], Dp[1] + nn[1], 'l', 2), line(C[0] - nn[0], C[1] - nn[1], Dp[0] - nn[0], Dp[1] - nn[1], 'l', 2),
    line(A[0], A[1], B[0], B[1], 'l', 5), line(Dp[0], Dp[1], E[0], E[1], 'l', 4),
    line(E[0] - 70, E[1] - 13, E[0] + 30, E[1] - 13, 'g', 2), ground(E[0] + 30, E[1] + 13, E[0] - 70, E[1] + 13),
    rect(E[0] - 20, E[1] - 11, 40, 22, 'soft'), rect(E[0] - 20, E[1] - 11, 40, 22, 'l'),
    arrow(E[0] - 62, E[1], E[0] - 22, E[1], 'f', 'F', -12, -14),
    pin(A[0], A[1]), pin(C[0], C[1]), hinge(B[0], B[1], 'B', 12, -4), hinge(Dp[0], Dp[1], 'D', 10, -10), hinge(E[0], E[1], 'E', 0, -20),
    text(A[0] - 16, A[1] - 8, 'A'), text(C[0] - 18, C[1] - 6, 'C'),
    text((A[0] + B[0]) / 2 + 4, (A[1] + B[1]) / 2 + 12, '1', { c: 'm' }), text(C[0] + 0.62 * (Dp[0] - C[0]) + 12, C[1] + 0.62 * (Dp[1] - C[1]), '2', { c: 'm' }),
    text((Dp[0] + E[0]) / 2, (Dp[1] + E[1]) / 2 - 10, '3', { c: 'm' }), text(E[0] + 26, E[1] - 22, '4', { c: 'm' }),
    text(A[0] - 30, (A[1] + C[1]) / 2, 'd', { c: 'm' }),
    rot(A[0], A[1], 20, 100, 190, 'v', 'ω₁'),
  ], 'Glifo oscillante a sei membri con le posizioni estreme tangenti alla circonferenza del perno B');
}

// ------------------------------------------------------------------ campione: glifo con θ = ω₁t (getti esatti)
const sampleG = (rnd: () => number): Vars => {
  const d = U(rnd, 0.6, 1.4), r = d * U(rnd, 0.2, 0.75), w = U(rnd, 0.5, 5), Lg = d + r + U(rnd, 0.3, 1);
  const l3 = U(rnd, 0.8, 1.5), yE = -d + Lg * U(rnd, 0.9, 1.02), F = U(rnd, 50, 500);
  const th = U(rnd, -Math.PI, Math.PI);
  const T: J = jt(th, w);
  const Bj = jpolar(jc(r), T);
  const CB: JV = [Bj[0], jadd(Bj[1], jc(d))];
  const psi = jatan2(CB[1], CB[0]), rho = jnorm(CB);
  const Dj = jpolar(jc(Lg), psi);
  const dy = jsub(jadd(Dj[1], jc(-d)), jc(yE));
  const xE = jsub(Dj[0], jsqrt(jsub(jc(l3 * l3), jmul(dy, dy))));
  const b3 = jatan2(jsc(-1, dy), jsub(xE, Dj[0])); // angolo della biella E − D
  const e = estremiGlifo(r, d), n = estremiGlifoNumerici(r, d);
  const Ge = glifo({ r, d, L: Lg, l3, yE, theta: e.thDestra, omega1: w });
  const psiE = jatan2(jadd(jsc(r, [Math.sin(e.thDestra), Math.cos(e.thDestra) * w, 0]), jc(d)), jsc(r, [Math.cos(e.thDestra), -Math.sin(e.thDestra) * w, 0]));
  const o: Vars = { r, d, w, Lg, l3, yE, F, th, psi: psi[0], w2: psi[1], rho: rho[0], Vrel: rho[1], xE: xE[0], VE: xE[1], w3: b3[1] };
  o.delta = e.delta; o.lentaN = n.lenta; o.rapidaN = n.rapida; o.thDN = n.thDestra; o.ampN = n.ampiezzaGlifo;
  o.w2ext = psiE[1];
  put(o, 'B', [Bj[0][0], Bj[1][0]]); put(o, 'VB', [Bj[0][1], Bj[1][1]]);
  put(o, 'C', [0, -d]); put(o, 'D', [Dj[0][0], Dj[1][0] - d]); put(o, 'VD', [Dj[0][1], Dj[1][1]]);
  put(o, 'E', [xE[0], yE]);
  put(o, 'Be', Ge.B); put(o, 'u', [Math.cos(psi[0]), Math.sin(psi[0])]);
  return o;
};

// ------------------------------------------------------------------ d008 rapido ritorno (deduzione)
const RR = DED('pp. 33–37 (cinematica relativa) e p. 64 (geometria del glifo)', 'la dispensa non dimostra il rapido ritorno: le posizioni estreme si trovano imponendo ω₂ = 0 (velocità del perno tutta relativa, lungo la cava) e i tempi da ω₁ costante (NF-07, NF-103)');

export const d008: Dimostrazione = {
  id: 'd008',
  titolo: 'Glifo oscillante: perché una corsa è più veloce dell\'altra',
  enunciato: 'Trovare le posizioni estreme del glifo e mostrare che, con ω₁ costante, le due corse avvengono in tempi diversi nel rapporto (π + 2δ)/(π − 2δ), con sin δ = r/d.',
  ipotesi: ['manovella AB = r con ω₁ costante; fulcro del glifo C a distanza d = AC > r', 'il perno B scorre nella cava del glifo (coppia prismatica fra membri mobili)', 'non è nella dispensa: deduzione (NF-07); notazione di D, δ per l\'angolo del triangolo (NF-103)'],
  sample: sampleG,
  passi: [
    {
      id: 'd008.1',
      latex: L`\psi\ \text{estremo} \;\Leftrightarrow\; \omega_2 = \dot\psi = 0`,
      perche: 'Nelle posizioni estreme il glifo inverte il verso di oscillazione: la sua velocità angolare $\\omega_2$ si annulla.',
      fonte: RR,
      chiave: true,
      distrattori: [],
      num: (v) => [v.w2ext, 0],
    },
    {
      id: 'd008.2',
      latex: L`\omega_2 = 0 \Rightarrow \vec V_B = \vec V_{rel}\parallel(B-C);\quad \vec V_B\perp(B-A) \;\Rightarrow\; (B-C)\perp(B-A)`,
      perche: 'Con il glifo fermo la velocità del perno è tutta relativa, cioè lungo la cava; ma $B$ appartiene alla manovella, quindi $\\vec V_B\\perp AB$. La cava è perpendicolare ad $AB$: la retta $CB$ è **tangente** alla circonferenza descritta da $B$.',
      fonte: RR,
      chiave: true,
      distrattori: [
        { latex: L`\text{estremi quando } B \text{ è sulla retta } AC`, errore: 'concetto', spiega: 'Con B su AC il glifo è verticale, a metà dell\'oscillazione: lì la sua velocità angolare è massima, non nulla.' },
        { latex: L`\text{estremi a } \theta = 0 \text{ e } \theta = \pi`, errore: 'concetto', spiega: 'Quelli sono i punti morti del manovellismo centrato; nel glifo gli estremi sono a θ = −δ e θ = π + δ.', num: (v) => [v.thDN, 0] },
      ],
      num: (v) => [dot(sub(get(v, 'Be'), [0, 0]), sub(get(v, 'Be'), get(v, 'C'))), 0],
    },
    {
      id: 'd008.3',
      latex: L`\triangle ABC \text{ rettangolo in } B,\ \overline{AC} = d:\quad \sin\delta = \dfrac{r}{d}`,
      perche: 'Nel triangolo rettangolo l\'ipotenusa è $AC = d$ e il cateto opposto all\'angolo $\\delta$ in $C$ è la manovella $r$. $\\delta$ è anche la semiampiezza dell\'oscillazione del glifo attorno ad $AC$.',
      fonte: RR,
      distrattori: [
        { latex: L`\tan\delta = \dfrac{r}{d}`, errore: 'concetto', spiega: 'd è l\'ipotenusa (AC), non un cateto: il rapporto r/d è un seno.', num: (v) => [v.ampN / 2, Math.atan(v.r / v.d)] },
      ],
      num: (v) => [v.ampN / 2, Math.asin(v.r / v.d)],
    },
    {
      id: 'd008.4',
      latex: L`\widehat{BAC} = \dfrac{\pi}{2} - \delta \;\Rightarrow\; \theta_{\text{estr}} = -\delta,\ \ \pi + \delta`,
      perche: 'Le due posizioni estreme sono simmetriche rispetto ad $AC$ (verticale, $C$ sotto $A$): la manovella forma con $AC$ l\'angolo $\\pi/2-\\delta$ da una parte e dall\'altra. Misurando $\\theta$ dall\'orizzontale si ha $-\\delta$ e $\\pi+\\delta$: i due raggi **non** sono opposti.',
      fonte: RR,
      distrattori: [],
      num: (v) => [v.thDN, -v.delta],
    },
    {
      id: 'd008.5',
      latex: L`\Delta\theta_{\text{lenta}} = \pi + 2\delta,\qquad \Delta\theta_{\text{rapida}} = 2\pi - (\pi + 2\delta) = \pi - 2\delta`,
      perche: 'Fra $-\\delta$ e $\\pi+\\delta$ la manovella percorre l\'arco che passa lontano da $C$ ($\\pi+2\\delta$) in una corsa e l\'arco vicino a $C$ ($\\pi-2\\delta$) nell\'altra. La somma è un giro.',
      fonte: RR,
      chiave: true,
      distrattori: [
        { latex: L`\Delta\theta_{\text{lenta}} = \Delta\theta_{\text{rapida}} = \pi`, errore: 'concetto', spiega: 'Vale nel manovellismo centrato (estremi a 0 e π), non nel glifo: qui gli estremi non sono diametralmente opposti.', num: (v) => [v.lentaN, Math.PI] },
        { latex: L`\Delta\theta_{\text{lenta}} = \pi + \delta,\ \ \Delta\theta_{\text{rapida}} = \pi - \delta`, errore: 'fattore', spiega: 'Ogni estremo si sposta di δ oltre l\'orizzontale: lo scarto totale è 2δ.', num: (v) => [v.lentaN, Math.PI + v.delta] },
      ],
      num: (v) => [v.lentaN + 2 * v.rapidaN, Math.PI + 2 * v.delta + 2 * (Math.PI - 2 * v.delta)],
    },
    {
      id: 'd008.6',
      latex: L`t = \dfrac{\Delta\theta}{\omega_1} \;\Rightarrow\; \dfrac{t_{\text{lenta}}}{t_{\text{rapida}}} = \dfrac{\pi + 2\delta}{\pi - 2\delta} > 1`,
      perche: 'Con $\\omega_1$ costante il tempo è proporzionale all\'angolo percorso dalla manovella: non è il motore che accelera, è la geometria che dà angoli diversi.',
      fonte: RR,
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{t_{\text{lenta}}}{t_{\text{rapida}}} = \dfrac{\pi - 2\delta}{\pi + 2\delta}`, errore: 'indice', spiega: 'La corsa lenta è quella con l\'angolo maggiore: il rapporto è maggiore di 1.', num: (v) => [v.lentaN / v.rapidaN, (Math.PI - 2 * v.delta) / (Math.PI + 2 * v.delta)] },
        { latex: L`t = \Delta\theta\,\omega_1`, errore: 'fattore', spiega: 'Angolo = velocità angolare × tempo: t = Δθ/ω₁.', num: (v) => [v.lentaN / v.w, v.lentaN * v.w] },
      ],
      num: (v) => [v.lentaN / v.w / (v.rapidaN / v.w), (Math.PI + 2 * v.delta) / (Math.PI - 2 * v.delta)],
    },
    {
      id: 'd008.7',
      latex: L`\text{stessa corsa } s:\quad \dfrac{\bar v_{\text{rapida}}}{\bar v_{\text{lenta}}} = \dfrac{s/t_{\text{rapida}}}{s/t_{\text{lenta}}} = \dfrac{\pi + 2\delta}{\pi - 2\delta}`,
      perche: 'Andata e ritorno coprono la stessa escursione del glifo ($2\\delta$) e quindi la stessa corsa del corsoio: la corsa più breve nel tempo ha velocità media maggiore. Dire solo «c\'è il rapido ritorno» è una tautologia.',
      fonte: RR,
      distrattori: [],
      num: (v) => [v.lentaN / v.rapidaN, (Math.PI + 2 * v.delta) / (Math.PI - 2 * v.delta)],
    },
  ],
  risultato: { latex: L`\sin\delta = \dfrac{r}{d},\qquad \dfrac{t_{\text{lenta}}}{t_{\text{rapida}}} = \dfrac{\pi + 2\delta}{\pi - 2\delta}`, fonte: RR },
  gancio: 'Stessa corsa, angoli di manovella diversi: a ω costante angoli diversi vogliono dire tempi diversi.',
};

// ------------------------------------------------------------------ d009 velocità nel glifo e forze vive (pp. 34–37, 64–65)
const P65 = D([64, 65]);
const REL = DED('pp. 34 e 37 (cinematica relativa del pistone oleodinamico)', 'stesso metodo del pistone: riferimento mobile solidale al membro con la guida (qui il glifo), punto P = perno B della manovella');

export const d009: Dimostrazione = {
  id: 'd009',
  titolo: 'Glifo: velocità con il triangolo cinematico e coppia motrice con le forze vive',
  enunciato: 'Ricavare la velocità angolare del glifo e la velocità del corsoio dalla composizione delle velocità nel perno B, e la coppia sulla manovella con il teorema delle forze vive (glifo a sei membri della dispensa).',
  ipotesi: ['ω₁ costante; il perno B scorre nella cava del glifo 2 (fulcro C)', 'glifo CD, biella DE, corsoio 4 su guida orizzontale, forza F sul corsoio (p. 64)', 'forze vive: masse trascurate (E_cine = 0), niente attrito nella cava e nella guida (implicite in D, NF-103)'],
  sample: sampleG,
  passi: [
    {
      id: 'd009.1',
      latex: L`\vec V_B = \vec\omega_1\wedge(B-A),\qquad V_B = \omega_1 r \perp AB`,
      perche: 'Il perno $B$ come punto della manovella, che ruota attorno alla cerniera fissa $A$.',
      fonte: D(25),
      distrattori: [],
      num: (v) => [pv(v, 'VB'), pj(wedge(v.w, get(v, 'B')))],
    },
    {
      id: 'd009.2',
      latex: L`\vec V_B = \vec V_{t,B} + \vec V_{rel,B},\quad \vec V_{t,B} = \vec\omega_2\wedge(B-C),\quad \vec V_{rel,B}\parallel(B-C)`,
      perche: 'Riferimento mobile solidale al glifo: la velocità di trascinamento è quella che $B$ avrebbe se fosse saldato al glifo (rotazione attorno a $C$), la relativa è lo scorrimento lungo la cava. È il metodo del pistone oleodinamico.',
      fonte: REL,
      chiave: true,
      distrattori: [
        { latex: L`\vec V_B = \vec\omega_2\wedge(B-C)`, errore: 'termine-perso', spiega: 'B non è un punto fisso del glifo: scorre nella cava, quindi c\'è anche la velocità relativa.', num: (v) => [pv(v, 'VB'), pj(wedge(v.w2, sub(get(v, 'B'), get(v, 'C'))))] },
        { latex: L`\vec V_{rel,B}\perp(B-C)`, errore: 'concetto', spiega: 'La coppia prismatica permette solo lo scorrimento lungo la cava: la relativa è parallela a (B − C).' },
      ],
      num: (v) => [pv(v, 'VB'), pj(wedge(v.w2, sub(get(v, 'B'), get(v, 'C')))) + v.Vrel * pv(v, 'u')],
    },
    {
      id: 'd009.3',
      latex: L`\omega_2 = \dfrac{\omega_1 r\cos(\theta-\psi)}{\overline{CB}},\qquad V_{rel} = -\omega_1 r\sin(\theta-\psi)`,
      perche: 'Si proietta il triangolo sulla normale alla cava (dà la trascinamento, $\\omega_2\\,\\overline{CB}$) e sulla cava (dà la relativa). $\\psi$ è l\'angolo del glifo, $\\overline{CB}$ varia nel tempo.',
      fonte: REL,
      chiave: true,
      distrattori: [
        { latex: L`\omega_2 = \dfrac{\omega_1 r}{\overline{CB}}`, errore: 'concetto', spiega: 'Solo la componente di V_B normale alla cava fa ruotare il glifo; quella lungo la cava è scorrimento.', num: (v) => [v.w2, (v.w * v.r) / v.rho] },
        { latex: L`\omega_2 = \omega_1`, errore: 'concetto', spiega: 'Il glifo oscilla, non gira con la manovella: ω₂ cambia segno a ogni corsa.', num: (v) => [v.w2, v.w] },
      ],
      num: (v) => [v.w2 + 3 * v.Vrel, (v.w * v.r * Math.cos(v.th - v.psi)) / v.rho - 3 * v.w * v.r * Math.sin(v.th - v.psi)],
    },
    {
      id: 'd009.4',
      latex: L`\vec V_D = \vec\omega_2\wedge(D-C),\qquad V_D = \omega_2\,\overline{CD}`,
      perche: 'L\'estremo $D$ è un punto del glifo, che ruota attorno al fulcro fisso $C$.',
      fonte: P65,
      aggiunto: true,
      distrattori: [],
      num: (v) => [pv(v, 'VD'), pj(wedge(v.w2, sub(get(v, 'D'), get(v, 'C'))))],
    },
    {
      id: 'd009.5',
      latex: L`\vec V_E = \vec V_D + \vec\omega_3\wedge(E-D),\qquad \vec V_E \parallel \text{guida}`,
      perche: 'Formula fondamentale sulla biella $DE$: di $\\vec V_D$ si sa tutto, di $\\vec\\omega_3\\wedge(E-D)$ la direzione, di $\\vec V_E$ la direzione (guida orizzontale): triangolo delle velocità come nel manovellismo.',
      fonte: P65,
      aggiunto: true,
      distrattori: [
        { latex: L`\vec V_E = \vec V_D`, errore: 'ipotesi', spiega: 'Solo se la biella traslasse (ω₃ = 0): in generale DE ruota.', num: (v) => [v.VE, v.VDx] },
      ],
      num: (v) => [v.VE, v.VDx - v.w3 * (v.yE - v.Dy)],
    },
    {
      id: 'd009.6',
      latex: L`\vec F\cdot\vec V_E + \vec C_1\cdot\vec\omega_1 = 0 \;\Rightarrow\; C_1 = -\dfrac{F\,V_E}{\omega_1}`,
      perche: 'Teorema delle forze vive con masse trascurate: la potenza delle forze esterne è nulla. Le reazioni in $A$ e $C$ non lavorano (punti fissi), $R_4$ è perpendicolare a $\\vec V_E$: restano la forza sul corsoio e la coppia motrice. Quando il corsoio va contro $F$ la coppia è concorde con $\\omega_1$ (motrice).',
      fonte: D(65),
      chiave: true,
      distrattori: [
        { latex: L`\vec F\cdot\vec V_E + \vec C_1\cdot\vec\omega_1 + \vec R_A\cdot\vec V_A + \vec R_C\cdot\vec V_C \ne 0`, errore: 'concetto', spiega: 'Le reazioni delle cerniere fisse hanno potenza nulla: i loro punti di applicazione sono fermi.' },
        { latex: L`C_1 = +\dfrac{F\,V_E}{\omega_1}`, errore: 'segno', spiega: 'La somma delle potenze è zero: la potenza della coppia è opposta a quella della forza.', num: (v) => [-(v.F * v.VE) / v.w, (v.F * v.VE) / v.w] },
      ],
      num: (v) => [v.F * v.VE + -((v.F * glifo({ r: v.r, d: v.d, L: v.Lg, l3: v.l3, yE: v.yE, theta: v.th, omega1: v.w }).VE) / v.w) * v.w, 0],
    },
  ],
  risultato: { latex: L`\vec\omega_1\wedge(B-A) = \vec\omega_2\wedge(B-C) + \vec V_{rel,B},\qquad C_1 = -\dfrac{F\,V_E}{\omega_1}`, fonte: D(65) },
  gancio: 'Il perno nella cava: trascinamento col glifo più scorrimento lungo la cava; poi le forze vive saltano tutte le reazioni.',
};

// ------------------------------------------------------------------ argomento
export const glifoArg: ArgomentoContenuto = {
  id: 'c1-glifo',
  cosaDireSubito:
    'Il glifo oscillante è un meccanismo a rapido ritorno: la manovella AB gira con ω₁ costante e il suo perno B scorre nella cava del glifo, che oscilla attorno al fulcro fisso C. Andata e ritorno hanno la stessa corsa, ma la manovella le compie in angoli diversi, π + 2δ e π − 2δ con sin δ = r/d: a ω₁ costante angoli diversi vogliono dire tempi diversi. Nella dispensa il glifo è l\'esempio del teorema delle forze vive.',
  sistemaIpotesi: [
    'Sistema (p. 64): manovella 1 (AB = r, cerniera fissa A), glifo 2 con fulcro fisso C (AC = d > r) ed estremo D, biella 3 (DE), corsoio 4 su guida orizzontale con la forza F.',
    'Il perno B scorre nella cava del glifo: coppia prismatica fra due membri mobili.',
    'Manovella con ω₁ costante.',
    'Forze vive: masse trascurate (E_cine = 0), niente attrito nella cava e nella guida.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Glifo a sei membri della dispensa (p. 64) con le due posizioni estreme, tangenti alla circonferenza del perno B, e i due archi di manovella π ± 2δ.',
    fonte: D(64, 'figura su griglia del glifo; posizioni estreme aggiunte'),
    elementi: [
      { id: 'fissi', testo: 'cerniere fisse A (manovella) e C (fulcro del glifo), distanza d', obbligatorio: true },
      { id: 'manovella', testo: 'manovella AB = r con ω₁ e circonferenza descritta da B', obbligatorio: true },
      { id: 'cava', testo: 'glifo CD con la cava in cui scorre il perno B', obbligatorio: true },
      { id: 'estremi', testo: 'posizioni estreme: CB tangente alla circonferenza (CB ⊥ AB), angolo δ in C', obbligatorio: true },
      { id: 'archi', testo: 'archi di manovella π + 2δ (lontano da C) e π − 2δ (vicino a C)', obbligatorio: true },
      { id: 'uscita', testo: 'biella DE, corsoio 4 sulla guida e forza F', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`\vec\omega_1\wedge(B-A) = \vec\omega_2\wedge(B-C) + \vec V_{rel,B},\qquad \text{estremi: } \omega_2 = 0 \Rightarrow CB\perp AB`,
    spiegazione: 'Velocità del perno come punto della manovella e come punto che scorre nel glifo; agli estremi il glifo è fermo.',
    fonte: DED('pp. 34, 37 e 64', 'cinematica relativa della dispensa applicata al perno del glifo (NF-103)'),
  },
  dimostrazioni: ['d008', 'd009'],
  significato:
    'Non è il motore a girare più in fretta in metà giro: ω₁ è costante. È la geometria del glifo che trasforma due archi diversi di manovella nella stessa escursione del glifo. Si sfrutta per avere una corsa di lavoro lenta e un ritorno a vuoto rapido. Per le forze, le vive permettono di saltare tutte le reazioni interne e vincolari: basta la potenza di F e della coppia motrice.',
  fraseDaRicordare: 'Stessa corsa, angoli di manovella diversi (π ± 2δ, sin δ = r/d): a ω₁ costante tempi diversi.',
  daNonDire: [
    { frase: 'Una corsa è più veloce perché c\'è il rapido ritorno.', perche: 'È una tautologia: va detto che la corsa è la stessa ma l\'angolo di manovella è diverso, e a ω₁ costante l\'angolo è il tempo.', fonte: RR },
    { frase: 'In una metà del giro la manovella gira più veloce.', perche: 'ω₁ è costante: cambia l\'angolo percorso, non la velocità del motore.', fonte: RR },
    { frase: 'Le posizioni estreme sono a θ = 0 e θ = π.', perche: 'Sono i punti morti del manovellismo centrato; nel glifo gli estremi sono dove CB è tangente alla circonferenza di B, a θ = −δ e π + δ.', fonte: RR },
    { frase: 'La dispensa dimostra il rapido ritorno alle pp. 21–24.', perche: 'Lì c\'è l\'asta vincolata in due punti; il glifo è solo a pp. 64–65 come esempio delle forze vive (NF-103).', fonte: D([21, 65]) },
    { frase: 'Nel teorema delle forze vive metto anche le reazioni in A e in C.', perche: 'A e C sono fissi: le loro reazioni hanno potenza nulla; anche R₄ è perpendicolare a V_E.', fonte: D(65) },
  ],
  approfondimenti: [
    { domanda: 'Quale delle due corse è quella lenta?', tipo: 'approfondimento', attesa: 'Quella in cui B percorre l\'arco π + 2δ lontano da C: lì il braccio CB è lungo e il glifo ruota piano. Nella figura della dispensa, con ω₁ antioraria, è la corsa in cui il corsoio va verso sinistra contro F: la corsa di lavoro.', fonte: DED('p. 64 (figura) e d009', 'ω₂ = ω₁ r cos(θ − ψ)/CB è piccolo quando CB è grande') },
    { domanda: 'Quanto vale il rapporto dei tempi se la manovella è metà della distanza fra le cerniere?', tipo: 'approfondimento', attesa: 'r/d = 0,5 ⇒ δ = 30°: (180° + 60°)/(180° − 60°) = 2. La corsa lenta dura il doppio.', fonte: RR },
    { domanda: 'Come trovi la velocità angolare del glifo?', tipo: 'collegamento', argomento: 'c1-moto-relativo', attesa: 'Riferimento mobile solidale al glifo: ω⃗₁∧(B−A) = ω⃗₂∧(B−C) + V⃗_rel; proiettando sulla normale alla cava ω₂ = ω₁ r cos(θ − ψ)/CB. Agli estremi ω₂ = 0.', fonte: D([34, 37]) },
    { domanda: 'Come scrive la dispensa la coppia motrice del glifo?', tipo: 'collegamento', argomento: 'c1-statica-dinamica', attesa: 'Con le forze vive a masse nulle: F⃗·V⃗_E + C⃗₁·ω⃗₁ = 0, perché le reazioni in A e C non lavorano e R₄ ⊥ V_E. Quindi C₁ = −F V_E/ω₁.', fonte: D(65) },
    { domanda: 'Nel manovellismo centrato c\'è rapido ritorno?', tipo: 'collegamento', argomento: 'c1-manovellismo', attesa: 'No: i punti morti sono a θ = 0 e π, diametralmente opposti, quindi andata e ritorno durano mezzo giro ciascuna. Nel glifo gli estremi a −δ e π + δ non sono opposti.', fonte: D(26) },
    { domanda: 'Quali ipotesi usa (senza dirle) la dispensa nell\'esempio delle forze vive?', tipo: 'approfondimento', attesa: 'Masse trascurate e nessun attrito: né fra perno e cava, né fra corsoio e guida. Altrimenti comparirebbero la variazione di energia cinetica e la potenza dissipata.', fonte: DED('p. 65', 'condizioni per dL_int = 0 di p. 63–64 applicate al glifo (NF-103)') },
    { domanda: 'Dove si usa un meccanismo a rapido ritorno?', tipo: 'approfondimento', attesa: 'Nelle macchine utensili come la limatrice: la corsa di taglio è lenta, il ritorno a vuoto è rapido e fa risparmiare tempo.', fonte: EST('meccanica applicata, meccanismi a rapido ritorno (limatrice)', 'esempio d\'uso classico; la dispensa non lo cita') },
  ],
  simboli: [
    { simbolo: 'A,\\ C', significato: 'cerniera fissa della manovella e fulcro del glifo', altrove: 'O₁, O₂ in q01' },
    { simbolo: 'r = \\overline{AB},\\ d = \\overline{AC}', significato: 'manovella e distanza fra le cerniere fisse' },
    { simbolo: '\\delta', significato: 'angolo del triangolo rettangolo agli estremi, sin δ = r/d (semiampiezza del glifo)', altrove: 'γ in q01 (in D γ è l\'angolo di biella, NF-103)' },
    { simbolo: '\\psi,\\ \\omega_2', significato: 'angolo e velocità angolare del glifo' },
    { simbolo: '\\vec V_{rel,B}', significato: 'velocità del perno B lungo la cava' },
    { simbolo: '\\vec C_1', significato: 'coppia motrice sulla manovella (p. 65)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c1-glifo' }],
  previsioni: [
    {
      id: 'c1-glifo-rapporto',
      domanda: 'Glifo con r/d = 0,5 e ω₁ costante: il rapporto fra la durata della corsa lenta e quella rapida è…',
      opzioni: ['1', '1,5', '2', '3'],
      corretta: 2,
      spiega: 'sin δ = 0,5 ⇒ δ = 30°: (π + 2δ)/(π − 2δ) = 240°/120° = 2.',
      verify: () => {
        const n = estremiGlifoNumerici(0.5, 1);
        const k = n.lenta / n.rapida;
        return [1, 1.5, 2, 3].findIndex((x) => Math.abs(x - k) < 1e-6);
      },
      visual: { kind: 'meccanismo', id: 'c1-glifo' },
    },
    {
      id: 'c1-glifo-estremo',
      domanda: 'Nell\'istante in cui il glifo è in una posizione estrema, la velocità del perno B…',
      opzioni: ['è nulla', 'è tutta lungo la cava (relativa)', 'è tutta di trascinamento', 'è doppia di ω₁r'],
      corretta: 1,
      spiega: 'Il glifo è fermo (ω₂ = 0): la trascinamento è nulla e V_B = ω₁r è tutta scorrimento lungo la cava.',
      verify: () => {
        const e = estremiGlifo(0.4, 1);
        const G = glifo({ r: 0.4, d: 1, L: 1.8, l3: 1, yE: 0.75, theta: e.thSinistra, omega1: 2 });
        return Math.abs(G.omega2) < 1e-12 && Math.abs(Math.abs(G.Vrel) - 0.8) < 1e-12 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c1-glifo' },
    },
  ],
  nf: ['NF-07', 'NF-103'],
};
