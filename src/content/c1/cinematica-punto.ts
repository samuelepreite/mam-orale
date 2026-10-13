/**
 * C1 · Cinematica del punto: velocità e accelerazione (argomento di complemento, pp. 5–9).
 * d001 e d003 (coordinate polari) non sono nella dispensa: deduzione dalla posizione polare di p. 6 (NF-07, NF-105).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { jatan2, jc, jcos, jdiv, jmul, jnorm, jsin, jt, wedge, type J, type V2 } from '../../engine/c1';
import { angle, arc, arrow, dot, line, poly, svg, text } from '../svg';
import { D, DED, L, get, pj, put, pv } from './comune';

// ------------------------------------------------------------------ disegno (figure di pp. 6–8)
function disegno() {
  const O: V2 = [40, 262];
  const k = 0.0107;
  const y = (x: number) => 250 - k * (x - 70) * (330 - x);
  const traj: V2[] = Array.from({ length: 53 }, (_, i) => { const x = 70 + i * 5; return [x, y(x)]; });
  const Px = 175, Py = y(Px);
  const s = -k * (400 - 2 * Px);
  const tn = Math.hypot(1, s);
  const t: V2 = [1 / tn, s / tn];
  const n: V2 = [-t[1], t[0]]; // verso la concavità (in basso sullo schermo)
  const R = Math.pow(1 + s * s, 1.5) / (2 * k);
  const C: V2 = [Px + R * n[0], Py + R * n[1]];
  const aP = (Math.atan2(O[1] - Py, Px - O[0]) * 180) / Math.PI;
  const aC = (Math.atan2(C[1] - Py, Px - C[0]) * 180) / Math.PI;
  return svg(400, 290, [
    arrow(O[0], O[1], 385, O[1], 'm'), arrow(O[0], O[1], O[0], 18, 'm'),
    text(388, O[1] + 14, 'x', { c: 'm' }), text(O[0] - 12, 20, 'y', { c: 'm' }), text(O[0] - 12, O[1] + 12, 'O'),
    poly(traj, 'l'),
    arrow(traj[48][0], traj[48][1], traj[51][0], traj[51][1], 'l'),
    arc(C[0], C[1], R, aC - 40, aC + 40, 'd'),
    line(Px, Py, C[0], C[1], 'd'), dot(C[0], C[1], 'C', 10, 8), text((Px + C[0]) / 2 + 12, (Py + C[1]) / 2, 'R', { c: 'm' }),
    arrow(O[0], O[1], Px, Py, 'm'), text((O[0] + Px) / 2 - 14, (O[1] + Py) / 2 - 4, 'P − O', { c: 'm', size: 13 }),
    angle(O[0], O[1], 34, 0, aP, 'θ'),
    arrow(Px, Py, Px + 78 * t[0], Py + 78 * t[1], 'v', 'V_P', 6, -12),
    arrow(Px, Py, Px + 34 * t[0], Py + 34 * t[1], 'a', 'τ̂', 8, 12),
    arrow(Px, Py, Px + 44 * n[0], Py + 44 * n[1], 'f', 'a_n', 16, 2),
    arrow(Px - 12 * n[0], Py - 12 * n[1], Px - 12 * n[0] + 40 * t[0], Py - 12 * n[1] + 40 * t[1], 'f', 'a_t', -2, -14),
    dot(Px, Py, 'P(t)', -22, -12, 'a'),
  ], 'Traiettoria del punto P: velocità tangente, accelerazione tangenziale e normale, centro di curvatura');
}

// ------------------------------------------------------------------ d001 velocità in coordinate polari (assente in D)
const POL = DED('p. 6: (P − O) = r cos θ î + r sin θ ĵ', 'la dispensa scrive la posizione in coordinate polari ma non la deriva; si deriva qui con la regola del prodotto e le derivate di seno e coseno');

const sampleD001 = (rnd: () => number): Vars => {
  const r = U(rnd, 0.5, 3), rd = U(rnd, -2, 2), th = U(rnd, -Math.PI, Math.PI), thd = U(rnd, -3, 3);
  const R: J = jt(r, rd), T: J = jt(th, thd);
  // derivate «vere» con i getti: P(t) = r(t)(cos θ(t), sin θ(t))
  const Px = jmul(R, jcos(T)), Py = jmul(R, jsin(T));
  const o: Vars = { r, rd, th, thd };
  put(o, 'P', [Px[0], Py[0]]);
  put(o, 'V', [Px[1], Py[1]]);
  put(o, 'er', [Math.cos(th), Math.sin(th)]);
  put(o, 'et', [-Math.sin(th), Math.cos(th)]);
  put(o, 'der', [jcos(T)[1], jsin(T)[1]]);
  return o;
};

export const d001: Dimostrazione = {
  id: 'd001',
  titolo: 'Velocità in coordinate polari',
  enunciato: 'Ricavare la velocità di un punto P descritto dalla distanza r(t) dall\'origine e dall\'angolo θ(t) del vettore posizione.',
  ipotesi: [
    'moto piano, riferimento fisso {O, x, y} con versori î, ĵ costanti',
    'posizione in coordinate polari come a p. 6: (P − O) = r cos θ î + r sin θ ĵ',
    'la dispensa non fa questa derivazione: è una deduzione (NF-07)',
  ],
  sample: sampleD001,
  passi: [
    {
      id: 'd001.1',
      latex: L`(P-O) = r\cos\theta\,\hat\imath + r\sin\theta\,\hat\jmath = r\,\hat e_r,\qquad \hat e_r = \cos\theta\,\hat\imath + \sin\theta\,\hat\jmath`,
      perche: 'Si parte dalla posizione in coordinate polari della dispensa e si raccoglie $r$: resta il versore radiale $\\hat e_r$, che punta da $O$ verso $P$ e ruota con $\\theta$.',
      fonte: D(6),
      aggiunto: true,
      distrattori: [],
      num: (v) => [pv(v, 'P'), v.r * pv(v, 'er')],
    },
    {
      id: 'd001.2',
      latex: L`\hat e_\theta = -\sin\theta\,\hat\imath + \cos\theta\,\hat\jmath = \hat k\wedge\hat e_r`,
      perche: 'Si definisce il versore trasversale: è $\\hat e_r$ ruotato di $90^\\circ$ in verso antiorario, cioè nel verso in cui cresce $\\theta$.',
      fonte: POL,
      aggiunto: true,
      distrattori: [],
      num: (v) => [pv(v, 'et'), pj(wedge(1, get(v, 'er')))],
    },
    {
      id: 'd001.3',
      latex: L`\dfrac{d\hat e_r}{dt} = \dot\theta\,(-\sin\theta\,\hat\imath + \cos\theta\,\hat\jmath) = \dot\theta\,\hat e_\theta`,
      perche: 'Il versore radiale ha modulo costante ma cambia direzione: derivando coseno e seno di $\\theta(t)$ esce $\\dot\\theta$ e un vettore perpendicolare a $\\hat e_r$. È lo stesso fatto del teorema di Poisson (p. 10) con $\\vec\\omega = \\dot\\theta\\,\\hat k$.',
      fonte: POL,
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{d\hat e_r}{dt} = 0`, errore: 'concetto', spiega: 'Un versore ha modulo costante, ma la sua direzione cambia con θ: la derivata non è nulla.', num: (v) => [pv(v, 'der'), 0] },
        { latex: L`\dfrac{d\hat e_r}{dt} = \dot\theta\,\hat e_r`, errore: 'concetto', spiega: 'La derivata di un versore è perpendicolare al versore stesso (p. 10), non parallela.', num: (v) => [pv(v, 'der'), v.thd * pv(v, 'er')] },
        { latex: L`\dfrac{d\hat e_r}{dt} = -\dot\theta\,\hat e_\theta`, errore: 'segno', spiega: 'Derivando cos θ si ottiene −sin θ θ̇ e derivando sin θ si ottiene +cos θ θ̇: è +θ̇ ê_θ.', num: (v) => [pv(v, 'der'), -v.thd * pv(v, 'et')] },
      ],
      num: (v) => [pv(v, 'der'), v.thd * pv(v, 'et')],
    },
    {
      id: 'd001.4',
      latex: L`\vec V_P = \dfrac{d(r\,\hat e_r)}{dt} = \dot r\,\hat e_r + r\,\dfrac{d\hat e_r}{dt}`,
      perche: 'Velocità come derivata del vettore posizione (p. 6), con la regola del prodotto: cambia la distanza $r$ e cambia la direzione di $\\hat e_r$.',
      fonte: POL,
      distrattori: [
        { latex: L`\vec V_P = \dot r\,\hat e_r`, errore: 'termine-perso', spiega: 'Si è derivato solo r: anche il versore ê_r varia nel tempo.', num: (v) => [pv(v, 'V'), v.rd * pv(v, 'er')] },
      ],
      num: (v) => [pv(v, 'V'), v.rd * pv(v, 'er') + v.r * pv(v, 'der')],
    },
    {
      id: 'd001.5',
      latex: L`\vec V_P = \dot r\,\hat e_r + r\,\dot\theta\,\hat e_\theta`,
      perche: 'Si sostituisce $d\\hat e_r/dt = \\dot\\theta\\,\\hat e_\\theta$: la velocità ha una parte radiale (cambia la distanza) e una trasversale (il punto gira attorno a $O$).',
      fonte: POL,
      chiave: true,
      distrattori: [
        { latex: L`\vec V_P = \dot r\,\hat e_r + \dot\theta\,\hat e_\theta`, errore: 'fattore', spiega: 'Manca r: la parte trasversale è (distanza) × (velocità angolare), come V = Rω a p. 8.', num: (v) => [pv(v, 'V'), v.rd * pv(v, 'er') + v.thd * pv(v, 'et')] },
        { latex: L`\vec V_P = \dot r\,\hat e_\theta + r\,\dot\theta\,\hat e_r`, errore: 'indice', spiega: 'Versori scambiati: ṙ è lungo il raggio, rθ̇ è perpendicolare al raggio.', num: (v) => [pv(v, 'V'), v.rd * pv(v, 'et') + v.r * v.thd * pv(v, 'er')] },
      ],
      num: (v) => [pv(v, 'V'), v.rd * pv(v, 'er') + v.r * v.thd * pv(v, 'et')],
    },
    {
      id: 'd001.6',
      latex: L`V_P = \sqrt{\dot r^2 + r^2\dot\theta^2}\;;\qquad r = R = \text{cost} \Rightarrow V_P = R\,\dot\theta`,
      perche: 'I due versori sono ortogonali: il modulo è la radice della somma dei quadrati. Se la distanza è costante (moto circolare) resta solo la parte trasversale e si ritrova $V_P = R\\omega$ della dispensa (p. 8).',
      fonte: DED('p. 8: V_P = R ω', 'modulo di due componenti ortogonali; caso r costante confrontato con la formula della dispensa'),
      distrattori: [],
      num: (v) => [Math.hypot(v.Vx, v.Vy), Math.hypot(v.rd, v.r * v.thd)],
    },
  ],
  risultato: { latex: L`\vec V_P = \dot r\,\hat e_r + r\,\dot\theta\,\hat e_\theta`, fonte: POL },
  gancio: 'Derivare un versore che ruota dà θ̇ per il versore girato di 90°.',
};

// ------------------------------------------------------------------ d002 accelerazione tangenziale e normale (pp. 6–8)
const sampleD002 = (rnd: () => number): Vars => {
  // moto del proiettile della figura di p. 5: x = v0x t, y = v0y t − g t²/2
  const v0x = U(rnd, 2, 8), v0y = U(rnd, 3, 12), g = 9.81, t = U(rnd, 0.05, 1.8 * v0y / g);
  const vx = v0x, vy = v0y - g * t;
  const Vx: J = [vx, 0, 0], Vy: J = [vy, -g, 0];
  const V = jnorm([Vx, Vy]); // modulo della velocità e sua derivata (esatte)
  const tau: V2 = [vx / V[0], vy / V[0]];
  const dtx = jdiv(Vx, V), dty = jdiv(Vy, V); // getti del versore tangente
  const phi = jatan2(Vy, Vx); // angolo della tangente: la sua derivata è la velocità con cui ruota
  const w = Math.abs(phi[1]);
  const nn: V2 = phi[1] >= 0 ? wedge(1, tau) : wedge(-1, tau); // verso il centro di curvatura
  // raggio di curvatura dalla curva y(x) (formula della geometria differenziale, strada indipendente)
  const yp = vy / vx, ypp = -g / (vx * vx);
  const R = Math.pow(1 + yp * yp, 1.5) / Math.abs(ypp);
  const m = U(rnd, 500, 2000);
  const o: Vars = { V: V[0], Vd: V[1], w, R, m, g };
  put(o, 'Vv', [vx, vy]);
  put(o, 'a', [0, -g]);
  put(o, 'tau', tau);
  put(o, 'dtau', [dtx[1], dty[1]]);
  put(o, 'n', nn);
  return o;
};

export const d002: Dimostrazione = {
  id: 'd002',
  titolo: 'Accelerazione tangenziale e normale',
  enunciato: 'Dimostrare che l\'accelerazione di un punto si scompone in una componente tangenziale V̇ τ̂ e in una normale V²/R n̂ diretta verso il centro di curvatura.',
  ipotesi: [
    'velocità tangente alla traiettoria: V⃗_P = V_P τ̂ (p. 6)',
    'in un intervallo dt la traiettoria è approssimata da un arco di circonferenza di raggio R (raggio di curvatura), ds = R dθ (p. 7–8)',
    'ω = dθ/dt è la velocità con cui ruota la tangente, non la velocità angolare di un corpo (NF-105)',
  ],
  sample: sampleD002,
  passi: [
    {
      id: 'd002.1',
      latex: L`\vec V_P = \dfrac{dP}{dt} = V_P\,\hat\tau`,
      perche: 'Lo spostamento infinitesimo $dP$ avviene lungo la traiettoria, quindi la velocità è tangente: modulo $V_P$ per il versore tangente $\\hat\\tau$.',
      fonte: D(6),
      distrattori: [],
      num: (v) => [pv(v, 'Vv'), v.V * pv(v, 'tau')],
    },
    {
      id: 'd002.2',
      latex: L`\vec a_P = \dfrac{d(V_P\hat\tau)}{dt} = \dfrac{dV_P}{dt}\,\hat\tau + V_P\,\dfrac{d\hat\tau}{dt}`,
      perche: 'Si deriva il prodotto: cambia il modulo $V_P$ e cambia la direzione di $\\hat\\tau$. Il primo termine è l\'accelerazione tangenziale $\\vec a_t = \\dot V_P\\,\\hat\\tau$, il secondo quella normale.',
      fonte: D(7),
      chiave: true,
      distrattori: [
        { latex: L`\vec a_P = \dfrac{dV_P}{dt}\,\hat\tau`, errore: 'termine-perso', spiega: 'Anche il versore tangente cambia nel tempo: in curva c\'è accelerazione anche a velocità costante in modulo.', num: (v) => [pv(v, 'a'), v.Vd * pv(v, 'tau')] },
        { latex: L`\vec a_P = V_P\,\dfrac{d\hat\tau}{dt}`, errore: 'termine-perso', spiega: 'Manca la parte tangenziale, che c\'è quando cambia il modulo della velocità.', num: (v) => [pv(v, 'a'), v.V * pv(v, 'dtau')] },
      ],
      num: (v) => [pv(v, 'a'), v.Vd * pv(v, 'tau') + v.V * pv(v, 'dtau')],
    },
    {
      id: 'd002.3',
      latex: L`ds = R\,d\theta \;\Rightarrow\; V_P = \dfrac{ds}{dt} = R\,\dfrac{d\theta}{dt} = R\,\omega`,
      perche: 'Sull\'arco di circonferenza che approssima la traiettoria, l\'arco percorso è raggio per angolo al centro. Qui $V_P$ è il **modulo** della velocità e $\\omega = d\\theta/dt$ dice quanto in fretta ruota la tangente.',
      fonte: D(8),
      distrattori: [
        { latex: L`V_P = \dfrac{\omega}{R}`, errore: 'fattore', spiega: 'Arco = raggio × angolo: V = Rω, non ω/R.', num: (v) => [v.V, v.w / v.R] },
      ],
      num: (v) => [v.V, v.R * v.w],
    },
    {
      id: 'd002.4',
      latex: L`|d\hat\tau| = |\hat\tau|\,d\theta = d\theta \;\Rightarrow\; \dfrac{d\hat\tau}{dt} = \dfrac{d\theta}{dt}\,\hat n = \omega\,\hat n`,
      perche: 'Metodo punta–coda fra $\\hat\\tau(t)$ e $\\hat\\tau(t+dt)$: il triangolo è isoscele con lati unitari e angolo $d\\theta$, quindi $d\\hat\\tau$ ha modulo $d\\theta$ ed è perpendicolare alla tangente, diretto verso il centro di curvatura ($\\hat n$).',
      fonte: D(8, 'triangolo dei versori τ(t), τ(t+dt), dτ'),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{d\hat\tau}{dt} = 0`, errore: 'concetto', spiega: 'τ̂ ha modulo costante ma ruota: la sua derivata non è nulla, è normale alla traiettoria.', num: (v) => [pv(v, 'dtau'), 0] },
        { latex: L`\dfrac{d\hat\tau}{dt} = \omega\,\hat\tau`, errore: 'concetto', spiega: 'La variazione di un versore è perpendicolare al versore stesso, non parallela.', num: (v) => [pv(v, 'dtau'), v.w * pv(v, 'tau')] },
        { latex: L`\dfrac{d\hat\tau}{dt} = -\omega\,\hat n`, errore: 'segno', spiega: 'dτ̂ punta verso il centro di curvatura, cioè verso la concavità della traiettoria (figura di p. 8).', num: (v) => [pv(v, 'dtau'), -v.w * pv(v, 'n')] },
      ],
      num: (v) => [pv(v, 'dtau'), v.w * pv(v, 'n')],
    },
    {
      id: 'd002.5',
      latex: L`\vec a_n = V_P\,\omega\,\hat n = R\,\omega^2\,\hat n = \dfrac{V_P^2}{R}\,\hat n`,
      perche: 'Si sostituisce $d\\hat\\tau/dt = \\omega\\,\\hat n$ nel termine normale e poi $\\omega = V_P/R$: l\'accelerazione normale (centripeta) è $V^2/R$ e punta verso il centro di curvatura.',
      fonte: D(8),
      chiave: true,
      distrattori: [
        { latex: L`\vec a_n = \dfrac{V_P}{R}\,\hat n`, errore: 'fattore', spiega: 'Dimensionalmente V/R è una velocità angolare, non un\'accelerazione: serve V²/R.', num: (v) => [v.ax * v.nx + v.ay * v.ny, v.V / v.R] },
        { latex: L`\vec a_n = -\dfrac{V_P^2}{R}\,\hat n`, errore: 'segno', spiega: 'L\'accelerazione normale è centripeta (verso il centro); verso l\'esterno è la forza d\'inerzia, la centrifuga.', num: (v) => [v.ax * v.nx + v.ay * v.ny, -(v.V * v.V) / v.R] },
      ],
      num: (v) => [v.ax * v.nx + v.ay * v.ny, (v.V * v.V) / v.R],
    },
    {
      id: 'd002.6',
      latex: L`\vec a_P = \vec a_t + \vec a_n = \dot V_P\,\hat\tau + \dfrac{V_P^2}{R}\,\hat n`,
      perche: 'Si sommano le due componenti: la tangenziale cambia il modulo della velocità, la normale ne cambia la direzione.',
      fonte: D(8),
      distrattori: [
        { latex: L`\vec a_P = \dot V_P\,\hat\tau + R\,\omega\,\hat n`, errore: 'fattore', spiega: 'Rω è la velocità V, non un\'accelerazione: la normale è Rω² = V²/R.', num: (v) => [pv(v, 'a'), v.Vd * pv(v, 'tau') + v.R * v.w * pv(v, 'n')] },
      ],
      num: (v) => [pv(v, 'a'), v.Vd * pv(v, 'tau') + ((v.V * v.V) / v.R) * pv(v, 'n')],
    },
    {
      id: 'd002.7',
      latex: L`\vec F_{in} = -m\,\vec a \;\Rightarrow\; \text{forza centrifuga} = -m\,\dfrac{V_P^2}{R}\,\hat n`,
      perche: 'Applicazione dell\'uscita autostradale: in rettilineo $R = \\infty$ e $a_n = 0$; in curva compare l\'accelerazione centripeta e la forza d\'inerzia corrispondente, la centrifuga, ha la stessa direzione ma verso opposto (verso l\'esterno). A pari velocità, raggio più piccolo vuol dire forza centrifuga più grande.',
      fonte: D(9),
      distrattori: [
        { latex: L`\text{forza centrifuga} = +m\,\dfrac{V_P^2}{R}\,\hat n`, errore: 'segno', spiega: 'La forza d\'inerzia è −m a: la centrifuga spinge verso l\'esterno della curva.', num: (v) => [-v.m * (v.ax * v.nx + v.ay * v.ny), (v.m * v.V * v.V) / v.R] },
      ],
      num: (v) => [-v.m * (v.ax * v.nx + v.ay * v.ny), -(v.m * v.V * v.V) / v.R],
    },
  ],
  risultato: { latex: L`\vec a_P = \dot V_P\,\hat\tau + \dfrac{V_P^2}{R}\,\hat n`, fonte: D(8) },
  gancio: 'Tangenziale: quanto accelero. Normale: quanto curvo, V²/R verso il centro.',
};

// ------------------------------------------------------------------ d003 accelerazione in coordinate polari (assente in D)
const sampleD003 = (rnd: () => number): Vars => {
  const r = U(rnd, 0.5, 3), rd = U(rnd, -2, 2), rdd = U(rnd, -3, 3), th = U(rnd, -Math.PI, Math.PI), thd = U(rnd, -3, 3), thdd = U(rnd, -4, 4);
  const R: J = jt(r, rd, rdd), T: J = jt(th, thd, thdd);
  const c = jcos(T), s = jsin(T);
  const X = jmul(R, c), Y = jmul(R, s);
  const o: Vars = { r, rd, rdd, th, thd, thdd };
  put(o, 'V', [X[1], Y[1]]);
  put(o, 'a', [X[2], Y[2]]);
  put(o, 'er', [c[0], s[0]]);
  put(o, 'et', [-s[0], c[0]]);
  put(o, 'det', [-s[1], c[1]]);
  put(o, 'der', [c[1], s[1]]);
  // moto circolare (r = R costante) per il confronto con p. 8
  const Rc = U(rnd, 0.5, 2);
  const Xc = jmul(jc(Rc), c), Yc = jmul(jc(Rc), s);
  o.Rc = Rc;
  o.acr = Xc[2] * c[0] + Yc[2] * s[0]; // componente radiale dell'accelerazione circolare
  o.Vc = Math.hypot(Xc[1], Yc[1]);
  return o;
};
const POLA = DED('d001 (velocità polare) e p. 8', 'si deriva ancora la velocità in coordinate polari, con le derivate dei versori ê_r ed ê_θ; il caso r costante si confronta con a_n = V²/R di p. 8');

export const d003: Dimostrazione = {
  id: 'd003',
  titolo: 'Accelerazione in coordinate polari',
  enunciato: 'Ricavare le componenti radiale e trasversale dell\'accelerazione di un punto in coordinate polari.',
  ipotesi: ['moto piano; r(t), θ(t) note', 'velocità polare di d001', 'non è nella dispensa: deduzione (NF-07)'],
  sample: sampleD003,
  passi: [
    {
      id: 'd003.1',
      latex: L`\vec V_P = \dot r\,\hat e_r + r\,\dot\theta\,\hat e_\theta`,
      perche: 'Si parte dalla velocità in coordinate polari (d001).',
      fonte: POLA,
      distrattori: [],
      num: (v) => [pv(v, 'V'), v.rd * pv(v, 'er') + v.r * v.thd * pv(v, 'et')],
    },
    {
      id: 'd003.2',
      latex: L`\dfrac{d\hat e_r}{dt} = \dot\theta\,\hat e_\theta,\qquad \dfrac{d\hat e_\theta}{dt} = -\dot\theta\,\hat e_r`,
      perche: 'Entrambi i versori ruotano con $\\dot\\theta$; la derivata di ciascuno è il versore stesso ruotato di $90^\\circ$ in avanti: $\\hat e_\\theta$ girato di $90^\\circ$ è $-\\hat e_r$.',
      fonte: POLA,
      distrattori: [
        { latex: L`\dfrac{d\hat e_\theta}{dt} = +\dot\theta\,\hat e_r`, errore: 'segno', spiega: 'ê_θ = (−sin θ, cos θ): derivando si ha −θ̇(cos θ, sin θ) = −θ̇ ê_r.', num: (v) => [pv(v, 'det'), v.thd * pv(v, 'er')] },
      ],
      num: (v) => [pv(v, 'det'), -v.thd * pv(v, 'er')],
    },
    {
      id: 'd003.3',
      latex: L`\vec a_P = \ddot r\,\hat e_r + \dot r\,\dot\theta\,\hat e_\theta + \dot r\,\dot\theta\,\hat e_\theta + r\,\ddot\theta\,\hat e_\theta - r\,\dot\theta^2\,\hat e_r`,
      perche: 'Si deriva termine per termine: $\\dot r\\,\\hat e_r$ dà $\\ddot r\\,\\hat e_r + \\dot r\\,\\dot\\theta\\,\\hat e_\\theta$; il prodotto di tre fattori $r\\,\\dot\\theta\\,\\hat e_\\theta$ dà $\\dot r\\dot\\theta\\,\\hat e_\\theta + r\\ddot\\theta\\,\\hat e_\\theta + r\\dot\\theta(-\\dot\\theta\\,\\hat e_r)$.',
      fonte: POLA,
      chiave: true,
      distrattori: [
        { latex: L`\vec a_P = \ddot r\,\hat e_r + r\,\ddot\theta\,\hat e_\theta`, errore: 'termine-perso', spiega: 'Si sono derivati solo r e θ̇: anche i versori cambiano, e da lì escono −rθ̇² e i due ṙθ̇.', num: (v) => [pv(v, 'a'), v.rdd * pv(v, 'er') + v.r * v.thdd * pv(v, 'et')] },
        { latex: L`\vec a_P = \ddot r\,\hat e_r + \dot r\,\dot\theta\,\hat e_\theta + r\,\ddot\theta\,\hat e_\theta - r\,\dot\theta^2\,\hat e_r`, errore: 'termine-perso', spiega: 'Nel prodotto r θ̇ ê_θ si deriva anche r: il termine ṙθ̇ ê_θ compare una seconda volta.', num: (v) => [pv(v, 'a'), v.rdd * pv(v, 'er') + v.rd * v.thd * pv(v, 'et') + v.r * v.thdd * pv(v, 'et') - v.r * v.thd ** 2 * pv(v, 'er')] },
      ],
      num: (v) => [pv(v, 'a'), v.rdd * pv(v, 'er') + 2 * v.rd * v.thd * pv(v, 'et') + v.r * v.thdd * pv(v, 'et') - v.r * v.thd ** 2 * pv(v, 'er')],
    },
    {
      id: 'd003.4',
      latex: L`\vec a_P = (\ddot r - r\,\dot\theta^2)\,\hat e_r + (r\,\ddot\theta + 2\,\dot r\,\dot\theta)\,\hat e_\theta`,
      perche: 'Si raccolgono i termini sui due versori: compaiono il termine centripeto $-r\\dot\\theta^2$ e il termine $2\\dot r\\dot\\theta$, che nasce due volte (dalla derivata di $\\hat e_r$ e da quella di $r$).',
      fonte: POLA,
      chiave: true,
      distrattori: [
        { latex: L`\vec a_P = (\ddot r - r\,\dot\theta^2)\,\hat e_r + (r\,\ddot\theta + \dot r\,\dot\theta)\,\hat e_\theta`, errore: 'fattore', spiega: 'Il termine ṙθ̇ compare due volte: il coefficiente è 2.', num: (v) => [pv(v, 'a'), (v.rdd - v.r * v.thd ** 2) * pv(v, 'er') + (v.r * v.thdd + v.rd * v.thd) * pv(v, 'et')] },
        { latex: L`\vec a_P = (\ddot r + r\,\dot\theta^2)\,\hat e_r + (r\,\ddot\theta + 2\,\dot r\,\dot\theta)\,\hat e_\theta`, errore: 'segno', spiega: 'Il termine rθ̇² è centripeto: punta verso O, cioè contro ê_r.', num: (v) => [pv(v, 'a'), (v.rdd + v.r * v.thd ** 2) * pv(v, 'er') + (v.r * v.thdd + 2 * v.rd * v.thd) * pv(v, 'et')] },
      ],
      num: (v) => [pv(v, 'a'), (v.rdd - v.r * v.thd ** 2) * pv(v, 'er') + (v.r * v.thdd + 2 * v.rd * v.thd) * pv(v, 'et')],
    },
    {
      id: 'd003.5',
      latex: L`r = R = \text{cost}:\quad a_r = -R\,\dot\theta^2 = -\dfrac{V_P^2}{R},\qquad a_\theta = R\,\ddot\theta = \dot V_P`,
      perche: 'Controllo con la dispensa: nel moto circolare restano la centripeta $V^2/R$ verso il centro (p. 8) e la tangenziale $\\dot V$.',
      fonte: DED('p. 8', 'caso particolare r costante della formula polare, confrontato con a_n = V²/R e a_t = V̇'),
      distrattori: [],
      num: (v) => [v.acr, -(v.Vc * v.Vc) / v.Rc],
    },
  ],
  risultato: { latex: L`\vec a_P = (\ddot r - r\dot\theta^2)\,\hat e_r + (r\ddot\theta + 2\dot r\dot\theta)\,\hat e_\theta`, fonte: POLA },
  gancio: 'I termini in più nascono dalla rotazione dei versori: −rθ̇² centripeto, 2ṙθ̇ «di Coriolis».',
};

// ------------------------------------------------------------------ argomento
export const cinematicaPunto: ArgomentoContenuto = {
  id: 'c1-cinematica-punto',
  cosaDireSubito:
    'La velocità di un punto è la derivata del vettore posizione ed è sempre tangente alla traiettoria: V⃗ = V τ̂. Derivando ancora, l\'accelerazione ha due componenti: una tangenziale V̇ τ̂, che cambia il modulo della velocità, e una normale V²/R n̂, diretta verso il centro di curvatura, che ne cambia la direzione.',
  sistemaIpotesi: [
    'Sistema: punto P che si muove su una traiettoria nel piano {O, x, y}; posizione (P − O), anche in coordinate polari r, θ (p. 6).',
    'Per uno spostamento infinitesimo la traiettoria è approssimata da un arco di circonferenza di raggio R (raggio di curvatura), centro all\'incrocio delle normali in P(t) e P(t+dt).',
    'ω = dθ/dt è la velocità di rotazione della tangente (non di un corpo).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Traiettoria di P con versore tangente, velocità, accelerazione tangenziale e normale, centro e raggio di curvatura (dispensa pp. 6–8).',
    fonte: D([6, 8], 'figure manoscritte della traiettoria e del triangolo dei versori'),
    elementi: [
      { id: 'assi', testo: 'riferimento {O, x, y} e traiettoria con il verso di percorrenza', obbligatorio: true },
      { id: 'posizione', testo: 'vettore posizione (P − O) e angolo θ', obbligatorio: false },
      { id: 'tangente', testo: 'versore tangente τ̂ e velocità V_P tangente in P', obbligatorio: true },
      { id: 'curvatura', testo: 'centro di curvatura C e raggio R (arco di circonferenza che approssima la traiettoria)', obbligatorio: true },
      { id: 'componenti', testo: 'a_t lungo la tangente, a_n verso il centro di curvatura', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: L`\vec V_P = \dfrac{dP}{dt} = V_P\,\hat\tau \;\Rightarrow\; \vec a_P = \dfrac{dV_P}{dt}\,\hat\tau + V_P\,\dfrac{d\hat\tau}{dt}`,
    spiegazione: 'Velocità tangente; l\'accelerazione si ottiene derivando il prodotto modulo × versore.',
    fonte: D([6, 7]),
  },
  dimostrazioni: ['d002', 'd001', 'd003'],
  significato:
    'Si può accelerare anche andando a velocità costante in modulo: basta curvare. La componente normale V²/R cresce quando il raggio di curvatura diminuisce, ed è quella che, cambiata di segno e moltiplicata per la massa, dà la forza centrifuga che si sente in curva: per questo una curva si progetta sul raggio.',
  fraseDaRicordare: 'Tangenziale: quanto accelero. Normale: quanto curvo, V²/R verso il centro di curvatura.',
  daNonDire: [
    { frase: 'Se il modulo della velocità è costante, l\'accelerazione è nulla.', perche: 'In curva resta a_n = V²/R ≠ 0: cambia la direzione della velocità.', fonte: D([8, 9]) },
    { frase: 'La forza centrifuga è diretta verso il centro della curva.', perche: 'Verso il centro è l\'accelerazione centripeta; la centrifuga è la forza d\'inerzia −m a_n, verso l\'esterno.', fonte: D(9) },
    { frase: 'dτ̂/dt è nullo perché τ̂ ha modulo 1.', perche: 'Un versore non cambia modulo ma cambia direzione: dτ̂ ha modulo dθ ed è normale alla traiettoria.', fonte: D(8) },
    { frase: 'Nella formula V = Rω, ω è la velocità angolare del corpo.', perche: 'A p. 8 ω = dθ/dt è la velocità con cui ruota la tangente alla traiettoria (NF-105).', fonte: D(8) },
    { frase: 'La dispensa ricava velocità e accelerazione in coordinate polari.', perche: 'Si ferma alla posizione polare (p. 6) e lavora con τ̂ e n̂; le formule polari sono una deduzione (NF-07).', fonte: D(6) },
  ],
  approfondimenti: [
    { domanda: 'Perché la variazione del versore tangente è diretta verso il centro di curvatura?', tipo: 'approfondimento', attesa: 'Con il metodo punta–coda fra τ̂(t) e τ̂(t+dt) si ottiene un triangolo isoscele con lati unitari e angolo dθ: dτ̂ è perpendicolare a τ̂, di modulo dθ, e punta verso la concavità.', fonte: D(8) },
    { domanda: 'Imbocchi la corsia di uscita dell\'autostrada: come cambia l\'accelerazione normale?', tipo: 'approfondimento', attesa: 'Nel tratto rettilineo R = ∞ e a_n = 0; quando inizia la curva a_n = V²/R verso il centro, e si sente la centrifuga −m a_n verso l\'esterno. A pari velocità, raggio minore vuol dire accelerazione (e forza) maggiore.', fonte: D(9) },
    { domanda: 'Che legame c\'è con il corpo rigido che ruota attorno a un polo fisso?', tipo: 'collegamento', argomento: 'c1-velocita', attesa: 'Con ω costante ogni punto ha a = −ω²(A − O): è la centripeta V²/R con R = OA e V = ω·OA; con ω̇ ≠ 0 si aggiunge la tangenziale ω̇ ∧ (A − O).', fonte: D([13, 15]) },
    { domanda: 'In coordinate polari da dove vengono −rθ̇² e 2ṙθ̇?', tipo: 'approfondimento', attesa: 'Dalla rotazione dei versori ê_r ed ê_θ: −rθ̇² è centripeto, 2ṙθ̇ compare due volte (derivando r e derivando ê_r). È lo stesso meccanismo che produce il termine di Coriolis nel moto relativo.', fonte: DED('d003 e p. 35', 'confronto fra la formula polare e l\'accelerazione di Coriolis 2ω∧V_rel della dispensa') },
    { domanda: 'Con r costante cosa resta delle formule polari?', tipo: 'approfondimento', attesa: 'V = rθ̇ (cioè V = Rω di p. 8), a_r = −V²/R e a_θ = V̇: si ritrovano componente normale e tangenziale.', fonte: DED('p. 8', 'caso particolare delle formule polari') },
  ],
  simboli: [
    { simbolo: '(P - O)', significato: 'vettore posizione del punto P' },
    { simbolo: '\\hat\\tau,\\ \\hat n', significato: 'versore tangente e versore normale (verso il centro di curvatura)', altrove: 't̂ in d002' },
    { simbolo: 'R', significato: 'raggio di curvatura della traiettoria' },
    { simbolo: '\\omega = d\\theta/dt', significato: 'velocità di rotazione della tangente (p. 8)', altrove: 'ε̇ in d001–d003' },
    { simbolo: '\\theta', significato: 'angolo polare del vettore posizione (p. 6)', altrove: 'ε in d001–d003' },
    { simbolo: '\\hat e_r,\\ \\hat e_\\theta', significato: 'versori radiale e trasversale (non nella dispensa)' },
    { simbolo: '\\vec a_t,\\ \\vec a_n', significato: 'accelerazione tangenziale e normale (a p. 35 a_t è quella di trascinamento)' },
  ],
  nf: ['NF-07', 'NF-105'],
};
