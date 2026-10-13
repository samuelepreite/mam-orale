/**
 * C7 · Vibrazioni libere non smorzate (domanda q05). Dispensa pp. 208–210 (manoscritto).
 * Dimostrazioni d111 (equazione del moto), d112 (pulsazione naturale), d113 (soluzione con condizioni iniziali),
 * d114 (energia). Notazione della dispensa: ω_m (= ω_n), x_G, K (NF-12).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { libera, omegaM } from '../../engine/c7';
import { figLibere } from './disegni';

const P208 = { tipo: 'dispensa', pag: 208 } as const;
const P209 = { tipo: 'dispensa', pag: 209 } as const;
const P210 = { tipo: 'dispensa', pag: 210 } as const;
const g = 9.81;

// ------------------------------------------------------------------ d111 equazione del moto
export const d111: Dimostrazione = {
  id: 'd111',
  titolo: 'Oscillatore libero non smorzato: equazione del moto',
  enunciato: 'Ricavare l\'equazione del moto della massa collegata a una molla, senza smorzamento e senza forze esterne, dal teorema dell\'energia cinetica; poi mostrare che in verticale il peso sposta solo il centro di oscillazione.',
  ipotesi: [
    'un grado di libertà: lo spostamento orizzontale x_G(t) del baricentro, misurato dalla posizione di molla a riposo',
    'molla lineare di Hooke di rigidezza K; attrito trascurato; nessuna forza esterna',
    'forze tutte ipotizzate positive nel sistema di riferimento (convenzione della dispensa)',
  ],
  sample: (rnd) => {
    const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000);
    const x = U(rnd, -0.05, 0.05), xd = U(rnd, -0.5, 0.5), a = U(rnd, -5, 5);
    const xdd = (-K * x) / m;
    const xst = (m * g) / K, xp = U(rnd, -0.02, 0.02), xddp = (-K * xp) / m;
    return { m, K, x, xd, a, xdd, xst, xp, xddp, g };
  },
  passi: [
    {
      id: 'd111.1',
      latex: 'F_{el} = -K\\,(x_A - x_B) = -K\\,x_G, \\qquad F_{in} = -m\\,\\ddot x_G',
      perche: 'Legge della molla tra due corpi (p. 208): la forza dipende dall\'allungamento $x_A - x_B$ a partire dalla molla scarica. Qui l\'estremo $B$ è sulla parete ferma ($x_B = 0$) e l\'estremo $A$ si muove con la massa. La massa entra con la forza d\'inerzia $-m\\ddot x$.',
      fonte: { tipo: 'dispensa', pag: [208, 209] },
      distrattori: [],
    },
    {
      id: 'd111.2',
      latex: '\\dfrac{dE_K}{dt} = W^{CONS} + W^{N.C.}, \\quad W^{CONS} = -\\dfrac{dE_P}{dt} \\;\\Rightarrow\\; \\dfrac{d}{dt}\\big(E_K + E_P\\big) = W^{N.C.}',
      perche: 'Teorema dell\'energia cinetica: la potenza delle forze conservative è meno la derivata dell\'energia potenziale. Portandola a sinistra si ha la conservazione dell\'energia meccanica, a meno della potenza delle forze non conservative. La dispensa scrive $W^{CONS} = +dE_P/dt$: è un refuso di segno, la riga dopo usa il segno giusto.',
      fonte: P209,
      correzione: { nf: 'NF-241', dispensaScrive: 'W^{CONS} = \\dfrac{dE_P}{dt}' },
      distrattori: [
        { latex: '\\dfrac{d}{dt}\\big(E_K - E_P\\big) = W^{N.C.}', errore: 'segno', spiega: 'Con W^{CONS} = +dE_P/dt si otterrebbe la differenza: l\'energia meccanica è la somma.', num: (v) => [v.m * v.xd * v.xdd + v.K * v.x * v.xd, v.m * v.xd * v.xdd - v.K * v.x * v.xd] },
      ],
    },
    {
      id: 'd111.3',
      latex: '\\dfrac{d}{dt}\\Big(\\tfrac12 m\\,\\dot x_G^2 + \\tfrac12 K\\,x_G^2\\Big) = \\big(m\\,\\ddot x_G + K\\,x_G\\big)\\,\\dot x_G',
      perche: 'Energia cinetica della massa ed energia elastica della molla; si deriva con la regola della catena: $\\frac{d}{dt}\\dot x^2 = 2\\dot x\\ddot x$, $\\frac{d}{dt}x^2 = 2x\\dot x$. Si raccoglie $\\dot x_G$.',
      fonte: P209,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{d}{dt}\\Big(\\tfrac12 m\\dot x_G^2 + \\tfrac12 Kx_G^2\\Big) = m\\ddot x_G + Kx_G', errore: 'termine-perso', spiega: 'Derivando un quadrato esce la derivata interna: il fattore ẋ_G non può sparire.', num: (v) => [(v.m * v.a + v.K * v.x) * v.xd, v.m * v.a + v.K * v.x] },
        { latex: '\\dfrac{d}{dt}\\Big(\\tfrac12 m\\dot x_G^2 + \\tfrac12 Kx_G^2\\Big) = \\tfrac12\\big(m\\ddot x_G + Kx_G\\big)\\dot x_G', errore: 'fattore', spiega: 'Il 2 della derivata del quadrato semplifica l\'½: non resta nessun ½.', num: (v) => [(v.m * v.a + v.K * v.x) * v.xd, 0.5 * (v.m * v.a + v.K * v.x) * v.xd] },
      ],
      num: (v) => [v.m * v.xd * v.a + v.K * v.x * v.xd, (v.m * v.a + v.K * v.x) * v.xd],
    },
    {
      id: 'd111.4',
      latex: 'W^{N.C.} = 0 \\;\\Rightarrow\\; \\big(m\\,\\ddot x_G + K\\,x_G\\big)\\,\\dot x_G = 0\\ \\ \\forall t \\;\\Rightarrow\\; m\\,\\ddot x_G + K\\,x_G = 0',
      perche: 'Senza attrito né smorzatore non ci sono forze non conservative che lavorano ($mg$ e $F_n$ sono perpendicolari al moto). Il prodotto è nullo in ogni istante, anche quando la massa si muove ($\\dot x_G \\neq 0$): quindi è nulla la parentesi. È l\'equazione dell\'oscillatore armonico semplice.',
      fonte: P209,
      chiave: true,
      distrattori: [
        { latex: 'm\\,\\ddot x_G - K\\,x_G = 0', errore: 'segno', spiega: 'La molla richiama verso l\'equilibrio: con il segno meno la soluzione sarebbe esponenziale, non oscillante.', num: (v) => [v.m * v.xdd + v.K * v.x, v.m * v.xdd - v.K * v.x] },
        { latex: 'm\\,\\ddot x_G + K\\,x_G = m g', errore: 'ipotesi', spiega: 'Il moto è orizzontale: il peso è equilibrato dalla reazione F_n e non compare nell\'equazione lungo x.', num: (v) => [v.m * v.xdd + v.K * v.x, v.m * v.g] },
        { latex: '\\dot x_G = 0', errore: 'concetto', spiega: 'ẋ_G = 0 vorrebbe dire massa ferma: l\'uguaglianza deve valere durante il moto, quindi è la parentesi a essere nulla.' },
      ],
      num: (v) => [v.m * v.xdd + v.K * v.x, 0],
    },
    {
      id: 'd111.5',
      latex: 'F_{el} + F_{in} = 0:\\quad -K\\,x_G - m\\,\\ddot x_G = 0',
      perche: 'Controllo con l\'equilibrio dinamico (d\'Alembert) lungo $x$: la dispensa scrive $-Kx_G = m\\ddot x_G$. È un\'equazione lineare, a coefficienti costanti e tempo-invariante, finché la molla è lineare.',
      fonte: P209,
      distrattori: [],
      num: (v) => [-v.K * v.x - v.m * v.xdd, 0],
    },
    {
      id: 'd111.6',
      latex: 'mg + F_{el} = 0,\\ \\ F_{el} = -K\\,x^{ST} \\;\\Rightarrow\\; x^{ST} = \\dfrac{mg}{K}',
      perche: 'Oscillatore verticale con $x$ verso il basso: in quiete il peso è equilibrato dalla molla, che per questo è già allungata della freccia statica $x^{ST}$. Con $F_{el} = -Kx$ l\'equilibrio è $mg - Kx^{ST} = 0$; la dispensa scrive $mg + Kx^{ST} = 0$ ma poi dà il risultato giusto $mg/K$.',
      fonte: P210,
      chiave: true,
      correzione: { nf: 'NF-242', dispensaScrive: 'mg + Kx_G^{STATICO} = 0 \\;\\Rightarrow\\; x_G^{STATICO} = \\dfrac{mg}{K}' },
      distrattori: [
        { latex: 'x^{ST} = -\\dfrac{mg}{K}', errore: 'segno', spiega: 'È ciò che darebbe la riga della dispensa presa alla lettera: con x verso il basso la molla si allunga, x^{ST} > 0.', num: (v) => [v.xst, (-v.m * v.g) / v.K] },
        { latex: 'x^{ST} = \\dfrac{K}{mg}', errore: 'indice', spiega: 'Dimensionalmente sbagliato: una lunghezza è forza diviso rigidezza.', num: (v) => [v.xst, v.K / (v.m * v.g)] },
      ],
      num: (v) => [v.K * v.xst, v.m * v.g],
    },
    {
      id: 'd111.7',
      latex: 'x = x\' + x^{ST} \\;\\Rightarrow\\; \\ddot x = \\ddot x\', \\qquad -m\\,\\ddot x\' - K\\,(x\' + x^{ST}) + mg = 0',
      perche: 'Cambio di variabile: $x\'$ misura l\'oscillazione rispetto all\'equilibrio statico. Poiché $x^{ST}$ è costante, velocità e accelerazione non cambiano. Si riscrive l\'equilibrio dinamico con l\'allungamento totale della molla $x\' + x^{ST}$.',
      fonte: P210,
      distrattori: [],
      num: (v) => [-v.m * v.xddp - v.K * (v.xp + v.xst) + v.m * v.g, 0],
    },
    {
      id: 'd111.8',
      latex: 'K\\,x^{ST} = mg \\;\\Rightarrow\\; m\\,\\ddot x\' + K\\,x\' = 0',
      perche: 'Il termine $Kx^{ST}$ cancella esattamente il peso: resta l\'equazione omogenea con la stessa $\\omega_m$. Le forze costanti applicate staticamente spostano il centro di oscillazione, non la frequenza (riquadro di p. 210).',
      fonte: P210,
      chiave: true,
      distrattori: [
        { latex: 'm\\,\\ddot x\' + K\\,x\' = mg', errore: 'termine-perso', spiega: 'Il peso è già equilibrato da K x^{ST}: misurando da equilibrio statico non resta.', num: (v) => [v.m * v.xddp + v.K * v.xp, v.m * v.g] },
        { latex: 'm\\,\\ddot x\' + (K + mg)\\,x\' = 0', errore: 'concetto', spiega: 'Il peso non è una rigidezza: non cambia la frequenza.', num: (v) => [v.m * v.xddp + v.K * v.xp, v.m * v.xddp + (v.K + v.m * v.g) * v.xp] },
      ],
      num: (v) => [v.m * v.xddp + v.K * v.xp, 0],
    },
  ],
  risultato: { latex: 'm\\,\\ddot x_G + K\\,x_G = 0 \\qquad (\\text{in verticale: } m\\,\\ddot x\' + K\\,x\' = 0,\\ x = x\' + mg/K)', fonte: { tipo: 'dispensa', pag: [209, 210] } },
  gancio: 'Energia che si conserva: (mẍ + Kx)ẋ = 0 in ogni istante, quindi mẍ + Kx = 0. Il peso sposta il centro, non la frequenza.',
};

// ------------------------------------------------------------------ d112 pulsazione naturale
export const d112: Dimostrazione = {
  id: 'd112',
  titolo: 'Pulsazione naturale',
  enunciato: 'Risolvere m ẍ + K x = 0 con l\'ansatz esponenziale e ricavare la pulsazione naturale ω_m, il periodo e la frequenza.',
  ipotesi: ['equazione lineare omogenea a coefficienti costanti m ẍ + K x = 0 (d111)', 'm > 0, K > 0'],
  sample: (rnd) => {
    const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), lam = U(rnd, -2, 2), t = U(rnd, 0, 2);
    const wm = Math.sqrt(K / m), T = (2 * Math.PI) / wm, fm = 1 / T, xst = (m * g) / K;
    return { m, K, lam, t, wm, T, fm, xst, g };
  },
  passi: [
    {
      id: 'd112.1',
      latex: 'x(t) = e^{\\lambda t}',
      perche: 'Ansatz: per un\'equazione lineare a coefficienti costanti si cerca una soluzione esponenziale, perché le sue derivate sono proporzionali a lei stessa.',
      fonte: P209,
      distrattori: [],
    },
    {
      id: 'd112.2',
      latex: 'm\\lambda^2 e^{\\lambda t} + K e^{\\lambda t} = \\big(m\\lambda^2 + K\\big)\\,e^{\\lambda t} = 0',
      perche: 'Si sostituisce: $\\ddot x = \\lambda^2 e^{\\lambda t}$. L\'esponenziale si raccoglie.',
      fonte: P209,
      distrattori: [],
      num: (v) => [v.m * v.lam ** 2 * Math.exp(v.lam * v.t) + v.K * Math.exp(v.lam * v.t), (v.m * v.lam ** 2 + v.K) * Math.exp(v.lam * v.t)],
    },
    {
      id: 'd112.3',
      latex: 'e^{\\lambda t} \\neq 0 \\;\\Rightarrow\\; m\\lambda^2 + K = 0 \\;\\Rightarrow\\; \\lambda_{1,2} = \\pm i\\sqrt{\\dfrac{K}{m}} = \\pm i\\,\\omega_m',
      perche: 'L\'esponenziale non si annulla mai: deve annullarsi il polinomio. $\\lambda^2 = -K/m$ è negativo, quindi le radici sono immaginarie pure. $\\omega_m = \\sqrt{K/m}$, reale positiva, è la pulsazione naturale.',
      fonte: P209,
      chiave: true,
      distrattori: [
        { latex: '\\lambda_{1,2} = \\pm\\sqrt{K/m}', errore: 'segno', spiega: 'λ² = −K/m è negativo: le radici sono immaginarie. Radici reali darebbero esponenziali, non oscillazioni.', num: (v) => [v.m * -(v.wm ** 2) + v.K, v.m * (v.K / v.m) + v.K] },
        { latex: '\\omega_m = \\sqrt{m/K}', errore: 'indice', spiega: 'Più rigidezza vuol dire oscillazione più veloce: K sta al numeratore.', num: (v) => [v.wm, Math.sqrt(v.m / v.K)] },
        { latex: '\\lambda_{1,2} = \\pm i\\,K/m', errore: 'fattore', spiega: 'Si estrae la radice di λ² = −K/m: manca la radice quadrata.', num: (v) => [v.wm, v.K / v.m] },
      ],
      num: (v) => [v.m * -(v.wm ** 2) + v.K, 0],
    },
    {
      id: 'd112.4',
      latex: 'e^{\\pm i\\omega_m t} = \\cos(\\omega_m t) \\pm i\\,\\sin(\\omega_m t)',
      perche: 'Formula di Eulero: le due soluzioni sono armoniche di pulsazione $\\omega_m$. È la pulsazione alla quale oscilla la soluzione libera del sistema, qualunque siano le condizioni iniziali.',
      fonte: P209,
      distrattori: [],
    },
    {
      id: 'd112.5',
      latex: 'T_m = \\dfrac{2\\pi}{\\omega_m}, \\qquad f_m = \\dfrac{1}{T_m} = \\dfrac{\\omega_m}{2\\pi}',
      perche: 'Il coseno si ripete quando $\\omega_m t$ cresce di $2\\pi$: periodo $T_m$ in secondi, frequenza $f_m$ in hertz, pulsazione $\\omega_m$ in rad/s.',
      fonte: P210,
      distrattori: [
        { latex: 'f_m = \\omega_m', errore: 'convenzione', spiega: 'ω_m è in rad/s, f_m in Hz: differiscono di 2π.', num: (v) => [v.fm, v.wm] },
        { latex: 'T_m = \\dfrac{\\omega_m}{2\\pi}', errore: 'indice', spiega: 'Questa è la frequenza, non il periodo.', num: (v) => [v.T, v.wm / (2 * Math.PI)] },
      ],
      num: (v) => [v.fm, v.wm / (2 * Math.PI)],
    },
    {
      id: 'd112.6',
      latex: '\\omega_m = \\sqrt{\\dfrac{K}{m}} = \\sqrt{\\dfrac{g}{x^{ST}}}',
      perche: 'Con $x^{ST} = mg/K$ (d111): basta misurare la freccia statica per conoscere la pulsazione naturale. È la forma del riquadro del grafico di p. 220 ($\\omega_n = \\sqrt{g/f_s}$). Più rigidezza aumenta $\\omega_m$, più massa la diminuisce.',
      fonte: { tipo: 'dispensa', pag: [210, 220] },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.wm, Math.sqrt(v.g / v.xst)],
    },
  ],
  risultato: { latex: '\\omega_m = \\sqrt{K/m}, \\qquad T_m = 2\\pi/\\omega_m, \\qquad f_m = \\omega_m/2\\pi', fonte: { tipo: 'dispensa', pag: [209, 210] } },
  gancio: 'λ² = −K/m: radici immaginarie ±iω_m, quindi oscillazione. Rigidezza su, frequenza su; massa su, frequenza giù.',
};

// ------------------------------------------------------------------ d113 soluzione con condizioni iniziali
export const d113: Dimostrazione = {
  id: 'd113',
  titolo: 'Soluzione libera non smorzata con condizioni iniziali',
  enunciato: 'Costruire la soluzione reale dell\'oscillatore armonico dalle due soluzioni complesse e fissarne ampiezza e fase con le condizioni iniziali (problema di Cauchy).',
  ipotesi: ['λ₁,₂ = ±iω_m (d112)', 'condizioni iniziali della dispensa: x(0) = x₀, ẋ(0) = 0; caso generale ẋ(0) = v₀ come estensione'],
  sample: (rnd) => {
    const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), wm = Math.sqrt(K / m);
    const A = U(rnd, 0.005, 0.05), al = U(rnd, -3, 3), t = U(rnd, 0, 2), th = wm * t + al, C = 2 * A;
    const x0 = U(rnd, 0.005, 0.05), v0 = U(rnd, -1, 1), C0 = x0, al0 = 0;
    const Cg = Math.hypot(x0, v0 / wm), ag = Math.atan2(-v0 / wm, x0);
    return { m, K, wm, A, al, t, th, C, x0, v0, C0, al0, Cg, ag };
  },
  passi: [
    {
      id: 'd113.1',
      latex: 'x(t) = C_1\\,e^{i\\omega_m t} + C_2\\,e^{-i\\omega_m t}',
      perche: 'L\'equazione è lineare: la combinazione delle due soluzioni $e^{\\pm i\\omega_m t}$ è la soluzione generale, con due costanti complesse. Così com\'è è una soluzione complessa.',
      fonte: P209,
      distrattori: [],
    },
    {
      id: 'd113.2',
      latex: 'x \\in \\mathbb R \\;\\Rightarrow\\; C_2 = \\bar C_1:\\quad C_1 = A\\,e^{i\\alpha},\\ \\ C_2 = A\\,e^{-i\\alpha}',
      perche: 'Lo spostamento fisico è reale: i due addendi devono essere uno il coniugato dell\'altro, così le parti immaginarie si cancellano. Si scrive $C_1$ in forma polare con modulo $A$ e argomento $\\alpha$.',
      fonte: P209,
      chiave: true,
      distrattori: [
        { latex: 'C_2 = C_1', errore: 'concetto', spiega: 'Con costanti uguali (e complesse) la somma resta complessa: per cancellare le parti immaginarie servono coniugate.' },
        { latex: 'C_2 = -\\bar C_1', errore: 'segno', spiega: 'Con il meno la somma diventa 2i·Im{…}: puramente immaginaria, non reale.' },
      ],
    },
    {
      id: 'd113.3',
      latex: 'x(t) = A\\big(e^{i(\\omega_m t+\\alpha)} + e^{-i(\\omega_m t+\\alpha)}\\big) = 2A\\cos(\\omega_m t + \\alpha) = C\\cos(\\omega_m t + \\alpha)',
      perche: 'Per Eulero $e^{i\\theta} + e^{-i\\theta} = 2\\cos\\theta$. L\'ampiezza è $C = 2A$, la fase $\\alpha$. Nel secondo addendo la dispensa dimentica la $i$ all\'esponente ($e^{-\\omega_m t}$), ma la riga dopo è giusta.',
      fonte: P209,
      chiave: true,
      correzione: { nf: 'NF-243', dispensaScrive: 'x(t) = A e^{i\\alpha}e^{i\\omega_m t} + A e^{-i\\alpha}e^{-\\omega_m t}' },
      distrattori: [
        { latex: '= 2A\\sin(\\omega_m t + \\alpha)', errore: 'concetto', spiega: 'La somma di due esponenziali coniugati dà il coseno; la differenza darebbe 2i sin.', num: (v) => [v.C * Math.cos(v.th), v.C * Math.sin(v.th)] },
        { latex: '= A\\cos(\\omega_m t + \\alpha)', errore: 'fattore', spiega: 'e^{iθ} + e^{−iθ} = 2 cos θ: l\'ampiezza è 2A.', num: (v) => [v.C * Math.cos(v.th), v.A * Math.cos(v.th)] },
      ],
      num: (v) => [v.A * (Math.cos(v.th) + Math.cos(-v.th)), v.C * Math.cos(v.th)],
    },
    {
      id: 'd113.4',
      latex: '\\begin{cases} x(0) = C\\cos\\alpha = x_0 \\\\ \\dot x(0) = -\\omega_m C\\sin\\alpha = 0 \\end{cases} \\;\\Rightarrow\\; \\alpha = 0,\\ \\ C = x_0',
      perche: 'Problema di Cauchy della dispensa: massa spostata di $x_0$ e lasciata ferma. Dalla seconda $\\sin\\alpha = 0$, quindi $\\alpha = 0$; dalla prima $C = x_0$. Ampiezza e fase dipendono dalle perturbazioni iniziali (la dispensa perde il segno meno di $\\dot x(0)$, ininfluente perché uguagliato a zero).',
      fonte: P210,
      chiave: true,
      distrattori: [
        { latex: '\\alpha = \\dfrac{\\pi}{2},\\ \\ C = x_0', errore: 'convenzione', spiega: 'π/2 è la fase se si scrive la soluzione con il seno; con il coseno, a velocità nulla, α = 0.', num: (v) => [v.C0 * Math.cos(v.al0), v.C0 * Math.cos(Math.PI / 2)] },
        { latex: 'C = \\dfrac{x_0}{\\omega_m}', errore: 'fattore', spiega: 'x(0) = C cos α non contiene ω_m: ω_m compare solo derivando.', num: (v) => [v.C0, v.x0 / v.wm] },
      ],
      num: (v) => [v.C0 * Math.cos(v.al0), v.x0],
    },
    {
      id: 'd113.5',
      latex: 'x(t) = x_0\\cos(\\omega_m t) = x_0\\sin\\big(\\omega_m t + \\tfrac{\\pi}{2}\\big)',
      perche: 'Soluzione reale: si usa il coseno perché si vede subito la risposta con velocità iniziale nulla (nota di p. 210). Con il seno la fase è $\\pi/2$; a p. 212 la dispensa scrive «$x_0\\sin(\\omega_m t + \\alpha)$, stessa soluzione» lasciando intendere lo stesso $\\alpha = 0$: è $\\alpha = \\pi/2$.',
      fonte: { tipo: 'dispensa', pag: [210, 212] },
      correzione: { nf: 'NF-243', dispensaScrive: 'x_0\\cos(\\omega_m t) = x_0\\sin(\\omega_m t + \\alpha)\\ \\ \\text{«stessa soluzione», con } \\alpha = 0' },
      distrattori: [
        { latex: 'x(t) = x_0\\sin(\\omega_m t)', errore: 'convenzione', spiega: 'Il seno vale 0 in t = 0: la massa partirebbe dall\'equilibrio, non da x₀.', num: (v) => [v.x0 * Math.cos(v.wm * v.t), v.x0 * Math.sin(v.wm * v.t)] },
      ],
      num: (v) => [v.x0 * Math.cos(v.wm * v.t), v.x0 * Math.sin(v.wm * v.t + Math.PI / 2)],
    },
    {
      id: 'd113.6',
      latex: '\\dot x(0) = v_0:\\quad x(t) = x_0\\cos\\omega_m t + \\dfrac{v_0}{\\omega_m}\\sin\\omega_m t = C\\cos(\\omega_m t + \\alpha),\\ \\ C = \\sqrt{x_0^2 + \\Big(\\dfrac{v_0}{\\omega_m}\\Big)^2},\\ \\ \\operatorname{tg}\\alpha = -\\dfrac{v_0}{\\omega_m x_0}',
      perche: 'Caso generale (chiesto da q05, non svolto nella dispensa): le stesse due condizioni con $\\dot x(0) = v_0$ danno $C\\cos\\alpha = x_0$ e $-\\omega_m C\\sin\\alpha = v_0$. Quadrando e sommando si ha $C$, dividendo si ha $\\alpha$.',
      fonte: { tipo: 'deduzione', da: 'pp. 209–210', spiegazione: 'stesso problema di Cauchy di p. 210 con ẋ(0) = v₀ invece di 0' },
      distrattori: [
        { latex: 'C = x_0 + \\dfrac{v_0}{\\omega_m}', errore: 'concetto', spiega: 'Le due componenti sono in quadratura (cos e sin): si sommano come i cateti, non linearmente.', num: (v) => [v.Cg, v.x0 + v.v0 / v.wm] },
        { latex: 'C = \\sqrt{x_0^2 + v_0^2}', errore: 'fattore', spiega: 'Dimensionalmente sbagliato: v₀ va diviso per ω_m per diventare una lunghezza.', num: (v) => [v.Cg, Math.hypot(v.x0, v.v0)] },
      ],
      num: (v) => [v.x0 * Math.cos(v.wm * v.t) + (v.v0 / v.wm) * Math.sin(v.wm * v.t), v.Cg * Math.cos(v.wm * v.t + v.ag)],
    },
  ],
  risultato: { latex: 'x(t) = C\\cos(\\omega_m t + \\alpha);\\quad x(0) = x_0,\\ \\dot x(0) = 0 \\Rightarrow x(t) = x_0\\cos(\\omega_m t)', fonte: { tipo: 'dispensa', pag: [209, 210] } },
  gancio: 'Due esponenziali coniugati fanno un coseno; due condizioni iniziali fissano ampiezza e fase. Velocità nulla: x₀ cos ω_m t.',
};

// ------------------------------------------------------------------ d114 energia
export const d114: Dimostrazione = {
  id: 'd114',
  titolo: 'Energia dell\'oscillatore non smorzato',
  enunciato: 'Mostrare che nell\'oscillatore non smorzato l\'energia meccanica è costante e vale ½ K C²; con uno smorzatore diminuisce.',
  ipotesi: ['m ẍ + K x = 0 (d111)', 'soluzione x = C cos(ω_m t + α) (d113)', 'per l\'ultimo passo: smorzatore viscoso F_s = −c ẋ (p. 208)'],
  sample: (rnd) => {
    const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), wm = Math.sqrt(K / m);
    const C = U(rnd, 0.005, 0.05), al = U(rnd, -3, 3), t = U(rnd, 0, 2), a = U(rnd, -5, 5), c = U(rnd, 1, 50);
    const x = C * Math.cos(wm * t + al), xd = -C * wm * Math.sin(wm * t + al), xdd = -wm * wm * x;
    const xdd2 = -(c * xd + K * x) / m;
    return { m, K, wm, C, al, t, a, c, x, xd, xdd, xdd2 };
  },
  passi: [
    {
      id: 'd114.1',
      latex: 'm\\,\\ddot x + K\\,x = 0',
      perche: 'Si parte dall\'equazione del moto (d111). Nella dispensa il percorso è inverso: dalla conservazione dell\'energia si arriva all\'equazione; qui si mostra che l\'equazione implica la conservazione.',
      fonte: P209,
      distrattori: [],
      num: (v) => [v.m * v.xdd + v.K * v.x, 0],
    },
    {
      id: 'd114.2',
      latex: '\\dot x\\,\\big(m\\,\\ddot x + K\\,x\\big) = m\\,\\dot x\\,\\ddot x + K\\,x\\,\\dot x = 0',
      perche: 'Si moltiplica per la velocità: ogni termine diventa una potenza (forza per velocità).',
      fonte: { tipo: 'deduzione', da: 'p. 209', spiegazione: 'è il passaggio (mẍ + Kx)ẋ = W^{N.C.} di p. 209 letto da destra a sinistra' },
      distrattori: [],
      num: (v) => [v.m * v.xd * v.xdd + v.K * v.x * v.xd, 0],
    },
    {
      id: 'd114.3',
      latex: 'm\\,\\dot x\\,\\ddot x + K\\,x\\,\\dot x = \\dfrac{d}{dt}\\Big(\\tfrac12 m\\,\\dot x^2\\Big) + \\dfrac{d}{dt}\\Big(\\tfrac12 K\\,x^2\\Big)',
      perche: 'Si riconoscono le derivate dell\'energia cinetica e dell\'energia elastica (regola della catena).',
      fonte: P209,
      chiave: true,
      distrattori: [
        { latex: '= \\dfrac{d}{dt}\\big(m\\,\\dot x^2 + K\\,x^2\\big)', errore: 'fattore', spiega: 'La derivata di ẋ² è 2ẋẍ: servono gli ½ davanti.', num: (v) => [v.m * v.xd * v.a + v.K * v.x * v.xd, 2 * (v.m * v.xd * v.a + v.K * v.x * v.xd)] },
        { latex: '= \\dfrac{d}{dt}\\Big(\\tfrac12 m\\,\\dot x^2 - \\tfrac12 K\\,x^2\\Big)', errore: 'segno', spiega: 'Entrambe le energie entrano con il più: la molla immagazzina energia, non la sottrae.', num: (v) => [v.m * v.xd * v.a + v.K * v.x * v.xd, v.m * v.xd * v.a - v.K * v.x * v.xd] },
      ],
      num: (v) => [v.m * v.xd * v.a + v.K * v.x * v.xd, v.m * v.xd * v.a + v.K * v.x * v.xd],
    },
    {
      id: 'd114.4',
      latex: 'E = \\tfrac12 m\\,\\dot x^2 + \\tfrac12 K\\,x^2 = \\text{cost} = \\tfrac12 K\\,C^2',
      perche: 'La derivata dell\'energia meccanica è nulla: integrando nel tempo è costante. Con $x = C\\cos(\\omega_m t + \\alpha)$ e $m\\omega_m^2 = K$ si trova il valore: $\\tfrac12 KC^2(\\sin^2 + \\cos^2)$.',
      fonte: P209,
      chiave: true,
      distrattori: [
        { latex: 'E = \\tfrac12 m\\,\\omega_m\\,C^2', errore: 'indice', spiega: 'La velocità massima è ω_m C: nell\'energia cinetica entra ω_m², non ω_m.', num: (v) => [0.5 * v.m * v.xd ** 2 + 0.5 * v.K * v.x ** 2, 0.5 * v.m * v.wm * v.C ** 2] },
        { latex: 'E = K\\,C^2', errore: 'fattore', spiega: 'L\'energia elastica di una molla allungata di C è ½KC².', num: (v) => [0.5 * v.m * v.xd ** 2 + 0.5 * v.K * v.x ** 2, v.K * v.C ** 2] },
      ],
      num: (v) => [0.5 * v.m * v.xd ** 2 + 0.5 * v.K * v.x ** 2, 0.5 * v.K * v.C ** 2],
    },
    {
      id: 'd114.5',
      latex: '\\tfrac12 m\\,(\\omega_m C)^2 = \\tfrac12 K\\,C^2',
      perche: 'Scambio continuo: agli estremi ($x = \\pm C$) la massa è ferma e tutta l\'energia è elastica; al passaggio per l\'equilibrio la velocità è massima, $\\omega_m C$, e tutta l\'energia è cinetica. Per questo l\'ampiezza non cala.',
      fonte: P208,
      distrattori: [],
      num: (v) => [0.5 * v.m * (v.wm * v.C) ** 2, 0.5 * v.K * v.C ** 2],
    },
    {
      id: 'd114.6',
      latex: '\\dfrac{dE}{dt} = W^{N.C.} = F_s\\,\\dot x = -c\\,\\dot x^2 \\le 0',
      perche: 'Con uno smorzatore viscoso la potenza non conservativa è quella della forza $-c\\dot x$: sempre negativa o nulla. L\'energia diminuisce a ogni ciclo e l\'ampiezza decresce (introduzione di p. 208).',
      fonte: { tipo: 'deduzione', da: 'pp. 208–209', spiegazione: 'legge dello smorzatore di p. 208 nel teorema dell\'energia cinetica di p. 209 (q06 la scrive come P_c)' },
      aggiunto: true,
      distrattori: [
        { latex: '\\dfrac{dE}{dt} = +c\\,\\dot x^2', errore: 'segno', spiega: 'Lo smorzatore si oppone alla velocità: la sua potenza è negativa, dissipa.', num: (v) => [v.m * v.xd * v.xdd2 + v.K * v.x * v.xd, v.c * v.xd ** 2] },
      ],
      num: (v) => [v.m * v.xd * v.xdd2 + v.K * v.x * v.xd, -v.c * v.xd ** 2],
    },
  ],
  risultato: { latex: 'E = \\tfrac12 m\\,\\dot x^2 + \\tfrac12 K\\,x^2 = \\tfrac12 K\\,C^2 = \\text{cost}', fonte: P209 },
  gancio: 'Senza smorzamento l\'energia cambia forma, non quantità: ½KC² tutta elastica agli estremi, tutta cinetica al centro.',
};

// ------------------------------------------------------------------ argomento
export const libere: ArgomentoContenuto = {
  id: 'c7-libere',
  cosaDireSubito:
    'Una massa collegata a una molla, spostata dall\'equilibrio e lasciata andare, oscilla per sempre se non c\'è dissipazione: l\'energia passa da elastica a cinetica e viceversa. Dal teorema dell\'energia cinetica ricavo m ẍ + K x = 0; la soluzione è un\'armonica alla pulsazione naturale ω_m = √(K/m), che dipende solo da massa e rigidezza, mentre ampiezza e fase dipendono dalle condizioni iniziali.',
  sistemaIpotesi: [
    'Sistema: massa m su guida orizzontale, collegata alla parete da una molla di rigidezza K; un grado di libertà x_G(t).',
    'Molla lineare (Hooke), attrito e smorzamento trascurati, nessuna forza esterna.',
    'x misurato dalla posizione di molla a riposo (orizzontale) o dall\'equilibrio statico (verticale).',
    'Forze tutte ipotizzate positive nel sistema di riferimento, come nella dispensa.',
  ],
  disegno: {
    svg: figLibere(),
    didascalia: 'Oscillatore armonico orizzontale con le forze (p. 209) e oscillatore verticale con lunghezza a riposo l₀ e freccia statica (p. 210).',
    fonte: { tipo: 'dispensa', pag: [209, 210], fig: 'schemi manoscritti' },
    elementi: [
      { id: 'telaio', testo: 'parete fissa e guide della massa', obbligatorio: true },
      { id: 'molla', testo: 'molla di rigidezza K tra parete e massa', obbligatorio: true },
      { id: 'massa', testo: 'massa m con baricentro G', obbligatorio: true },
      { id: 'asse', testo: 'asse x (versore î) con l\'origine a molla scarica', obbligatorio: true },
      { id: 'forze', testo: 'F_el, F_in lungo x; mg e F_n verticali', obbligatorio: true },
      { id: 'verticale', testo: 'in verticale: l₀, freccia statica x^ST = mg/K, coordinata x′ dall\'equilibrio', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\dfrac{d}{dt}\\big(E_K + E_P\\big) = W^{N.C.}, \\qquad E_K = \\tfrac12 m\\,\\dot x_G^2,\\ \\ E_P = \\tfrac12 K\\,x_G^2',
    spiegazione: 'Teorema dell\'energia cinetica con le forze conservative portate a sinistra; senza attrito W^{N.C.} = 0. In alternativa, equilibrio dinamico F_el + F_in = 0.',
    fonte: P209,
  },
  dimostrazioni: ['d111', 'd112', 'd113', 'd114'],
  significato:
    'La frequenza con cui un sistema vibra da solo è una sua proprietà: dipende solo da rigidezza e massa (ω_m = √(K/m)) e non da quanto lo si perturba. Le condizioni iniziali fissano solo ampiezza e fase. Il peso, o qualunque forza costante, sposta il centro dell\'oscillazione ma non la frequenza.',
  fraseDaRicordare: 'ω_m = √(K/m): la rigidezza la alza, la massa la abbassa; l\'ampiezza la decidono le condizioni iniziali.',
  daNonDire: [
    { frase: 'La pulsazione naturale dipende dall\'ampiezza con cui faccio partire la massa.', perche: 'Nel modello lineare ω_m = √(K/m): l\'ampiezza è fissata dalle condizioni iniziali, la frequenza no.', fonte: P210 },
    { frase: 'Nell\'oscillatore verticale il peso abbassa la frequenza.', perche: 'Il peso è compensato dalla freccia statica: m ẍ′ + K x′ = 0, stessa ω_m.', fonte: P210 },
    { frase: 'Le radici sono λ = ±√(K/m).', perche: 'λ² = −K/m: sono immaginarie, ±iω_m; radici reali non darebbero oscillazioni.', fonte: P209 },
    { frase: 'La freccia statica è x^ST = −mg/K.', perche: 'È la riga della dispensa presa alla lettera (NF-242): con x verso il basso la molla si allunga di +mg/K.', fonte: P210 },
    { frase: 'L\'ampiezza è sempre x₀.', perche: 'Solo con velocità iniziale nulla (il caso della dispensa); in generale C = √(x₀² + (v₀/ω_m)²).', fonte: { tipo: 'deduzione', da: 'p. 210', spiegazione: 'problema di Cauchy con ẋ(0) = v₀' } },
  ],
  approfondimenti: [
    { domanda: 'Cosa cambia se aggiungi uno smorzatore viscoso?', tipo: 'collegamento', argomento: 'c7-smorzate', attesa: 'L\'equazione diventa m ẍ + c ẋ + K x = 0; le radici diventano λ = ω_m(−ξ ± √(ξ²−1)) e il moto dipende da ξ = c/c_r: sotto, critico o sovrasmorzato. L\'energia cala con potenza −c ẋ².', fonte: { tipo: 'dispensa', pag: 211 } },
    { domanda: 'Le molle reali sono lineari?', tipo: 'approfondimento', attesa: 'No: ci sono molle cedevoli («softening», la forza cresce meno che linearmente) e irrigidenti («hardening», come la balestra). Il modello lineare vale per piccoli spostamenti attorno all\'equilibrio.', fonte: P209 },
    { domanda: 'Perché la dispensa impone C₂ uguale al coniugato di C₁?', tipo: 'approfondimento', attesa: 'Perché lo spostamento è reale: i due addendi coniugati hanno parti immaginarie opposte che si cancellano, e la somma è 2A cos(ω_m t + α).', fonte: P209 },
    { domanda: 'Con velocità iniziale v₀ quanto vale l\'ampiezza?', tipo: 'approfondimento', attesa: 'x = x₀ cos ω_m t + (v₀/ω_m) sin ω_m t, quindi C = √(x₀² + (v₀/ω_m)²): la dispensa tratta solo v₀ = 0.', fonte: { tipo: 'deduzione', da: 'p. 210', spiegazione: 'stesse condizioni di Cauchy con ẋ(0) = v₀' } },
    { domanda: 'Come misuri ω_m senza conoscere m e K?', tipo: 'approfondimento', attesa: 'Dalla freccia statica: K x^ST = mg, quindi ω_m = √(g/x^ST). Oppure dal periodo misurato, ω_m = 2π/T_m.', fonte: { tipo: 'dispensa', pag: [210, 220] } },
    { domanda: 'Perché nel grafico di p. 210 la dispensa usa il coseno?', tipo: 'approfondimento', attesa: 'Con velocità iniziale nulla la soluzione parte dal massimo x₀ con tangente orizzontale: x₀ cos ω_m t si legge subito; con il seno serve la fase π/2.', fonte: P210 },
  ],
  simboli: [
    { simbolo: '\\omega_m', significato: 'pulsazione naturale √(K/m) (pedice «n» corsivo nella grafia della dispensa)', altrove: 'ω_n nelle domande e nel grafico di p. 220' },
    { simbolo: 'K', significato: 'rigidezza della molla', altrove: 'k' },
    { simbolo: 'x_G', significato: 'spostamento del baricentro della massa', altrove: 'x' },
    { simbolo: 'T_m,\\ f_m', significato: 'periodo e frequenza naturali', altrove: 'T_n, f_n' },
    { simbolo: 'C,\\ \\alpha', significato: 'ampiezza e fase in x = C cos(ω_m t + α)', altrove: 'X e φ con x = X cos(ω_n t − φ) in q05 (fase col segno opposto)' },
    { simbolo: 'x^{ST},\\ x\'', significato: 'freccia statica mg/K e coordinata dall\'equilibrio statico', altrove: 'x_s, f_s' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c7-libere', params: { xi: 0 } }],
  previsioni: [
    {
      id: 'c7-lib-massa',
      domanda: 'Raddoppi la massa e lasci la stessa molla. La pulsazione naturale…',
      opzioni: ['raddoppia', 'cresce di √2', 'cala di √2', 'si dimezza'],
      corretta: 2,
      spiega: 'ω_m = √(K/m): con 2m diventa ω_m/√2. Il periodo si allunga di √2.',
      verify: () => {
        const r = omegaM(2, 1000) / omegaM(1, 1000);
        return Math.abs(r - 1 / Math.SQRT2) < 1e-12 ? 2 : r > 1 ? 1 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c7-libere', params: { xi: 0 } },
    },
    {
      id: 'c7-lib-vert',
      domanda: 'Metti lo stesso oscillatore in verticale, sotto il peso. Il periodo, rispetto all\'orizzontale…',
      opzioni: ['si allunga, perché il peso tira la massa', 'resta uguale', 'si accorcia, perché la molla è più tesa'],
      corretta: 1,
      spiega: 'La molla è già allungata di mg/K e il peso è compensato: m ẍ′ + K x′ = 0, stessa ω_m. Cambia solo il centro di oscillazione.',
      verify: () => {
        const m = 2, K = 800;
        // oscillazione attorno all'equilibrio statico: x(t) − x^ST è la risposta libera con la stessa ω_m
        const w = omegaM(m, K), xst = (m * g) / K, x0 = 0.01;
        const periodoUguale = Math.abs(libera(0, w, x0, 0, (2 * Math.PI) / w) - x0) < 1e-12 && Math.abs(Math.sqrt(g / xst) - w) < 1e-12;
        return periodoUguale ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c7-libere', params: { xi: 0 } },
    },
  ],
  nf: ['NF-12', 'NF-241', 'NF-242', 'NF-243', 'NF-251'],
};
