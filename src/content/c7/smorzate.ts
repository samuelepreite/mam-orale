/**
 * C7 · Vibrazioni libere smorzate (domanda q06). Dispensa pp. 211–213 (manoscritto con grafici incollati).
 * Dimostrazioni d115–d121. Errori della dispensa corretti: NF-31 (la «i» spuria nelle radici), NF-32 (caso critico),
 * NF-244 (confronto dei tempi di assestamento).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { decrementoLog, libera, radici } from '../../engine/c7';
import { figSmorzate } from './disegni';

const P211 = { tipo: 'dispensa', pag: 211 } as const;
const P212 = { tipo: 'dispensa', pag: 212 } as const;
const P213 = { tipo: 'dispensa', pag: 213 } as const;
const NF31_RADICI = '\\lambda_{1/2} = \\dfrac{-c \\pm i\\sqrt{c^2 - 4mK}}{2m}';
const NF31_XI = '\\lambda_{1,2} = \\omega_m\\big(-\\xi \\pm i\\sqrt{\\xi^2 - 1}\\big)';

// ------------------------------------------------------------------ d115 equazione caratteristica
export const d115: Dimostrazione = {
  id: 'd115',
  titolo: 'Oscillatore libero smorzato: equazione caratteristica',
  enunciato: 'Scrivere l\'equazione del moto del sistema massa–molla–smorzatore libero e ricavarne le radici dell\'equazione caratteristica.',
  ipotesi: ['un grado di libertà x(t); molla lineare K; smorzatore viscoso lineare equivalente di costante c', 'nessuna forza esterna; forze tutte positive nel sistema di riferimento'],
  sample: (rnd) => {
    const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), xi = U(rnd, 1.2, 3);
    const c = 2 * xi * Math.sqrt(m * K), D = c * c - 4 * m * K;
    const l1 = (-c + Math.sqrt(D)) / (2 * m), l2 = (-c - Math.sqrt(D)) / (2 * m);
    const a = -c / (2 * m), b = Math.sqrt(D) / (2 * m); // radici «con la i» della dispensa: a ± i b
    const x = U(rnd, -0.05, 0.05), xd = U(rnd, -0.5, 0.5), xdd = -(c * xd + K * x) / m;
    const lam = U(rnd, -3, 1), t = U(rnd, 0, 1), x0 = U(rnd, 0.005, 0.05);
    const A1 = U(rnd, -0.05, 0.05), A2 = U(rnd, -0.05, 0.05);
    const X = A1 * Math.exp(l1 * t) + A2 * Math.exp(l2 * t), Xd = A1 * l1 * Math.exp(l1 * t) + A2 * l2 * Math.exp(l2 * t);
    const Xdd = A1 * l1 * l1 * Math.exp(l1 * t) + A2 * l2 * l2 * Math.exp(l2 * t);
    return { m, K, xi, c, D, l1, l2, a, b, x, xd, xdd, lam, t, x0, A1, A2, X, Xd, Xdd };
  },
  passi: [
    {
      id: 'd115.1',
      latex: 'F_{in} + F_s + F_{el} = 0:\\ \\ -m\\,\\ddot x - c\\,\\dot x - K\\,x = 0 \\;\\Rightarrow\\; m\\,\\ddot x + c\\,\\dot x + K\\,x = 0',
      perche: 'Schema di corpo libero con le tre forze lungo $x$ ipotizzate positive: inerzia $-m\\ddot x$, smorzatore $-c\\dot x$ (si oppone alla velocità, p. 208), molla $-Kx$. Il peso è equilibrato dalla reazione del piano.',
      fonte: P211,
      distrattori: [
        { latex: 'm\\,\\ddot x - c\\,\\dot x + K\\,x = 0', errore: 'segno', spiega: 'Lo smorzatore si oppone alla velocità come la molla allo spostamento: entrambi con il più a sinistra.', num: (v) => [v.m * v.xdd + v.c * v.xd + v.K * v.x, v.m * v.xdd - v.c * v.xd + v.K * v.x] },
      ],
      num: (v) => [v.m * v.xdd + v.c * v.xd + v.K * v.x, 0],
    },
    {
      id: 'd115.2',
      latex: 'x = x_0 e^{\\lambda t}:\\ \\ x_0 e^{\\lambda t}\\big(m\\lambda^2 + c\\lambda + K\\big) = 0 \\;\\Rightarrow\\; p(\\lambda) = m\\lambda^2 + c\\lambda + K = 0',
      perche: 'Ansatz esponenziale: $\\dot x = \\lambda x$, $\\ddot x = \\lambda^2 x$. Si raccoglie $x_0e^{\\lambda t} \\neq 0$ e resta il polinomio caratteristico $p(\\lambda)$.',
      fonte: P211,
      distrattori: [],
      num: (v) => [v.m * v.lam ** 2 * v.x0 * Math.exp(v.lam * v.t) + v.c * v.lam * v.x0 * Math.exp(v.lam * v.t) + v.K * v.x0 * Math.exp(v.lam * v.t), v.x0 * Math.exp(v.lam * v.t) * (v.m * v.lam ** 2 + v.c * v.lam + v.K)],
    },
    {
      id: 'd115.3',
      latex: '\\lambda_{1,2} = \\dfrac{-c \\pm \\sqrt{c^2 - 4mK}}{2m} = -\\dfrac{c}{2m} \\pm \\sqrt{\\Big(\\dfrac{c}{2m}\\Big)^2 - \\dfrac{K}{m}}',
      perche: 'Formula risolutiva dell\'equazione di secondo grado, poi si porta $2m$ dentro la radice. Il segno del radicando decide tutto: radici reali se $c^2 > 4mK$, complesse coniugate se $c^2 < 4mK$. La dispensa mette una $i$ davanti alla radice: così le radici sarebbero complesse proprio quando sono reali.',
      fonte: P211,
      chiave: true,
      correzione: { nf: 'NF-31', dispensaScrive: NF31_RADICI },
      distrattori: [
        { latex: NF31_RADICI, errore: 'concetto', spiega: 'È la riga della dispensa (NF-31): la i spuria. Con c² > 4mK queste radici non annullano p(λ).', num: (v) => [v.m * v.l1 ** 2 + v.c * v.l1 + v.K, v.m * (v.a * v.a - v.b * v.b) + v.c * v.a + v.K] },
        { latex: '\\lambda_{1,2} = \\dfrac{-c \\pm \\sqrt{c^2 - 4mK}}{m}', errore: 'fattore', spiega: 'Il denominatore della formula risolutiva è 2a = 2m.', num: (v) => [0, v.m * ((-v.c + Math.sqrt(v.D)) / v.m) ** 2 + v.c * ((-v.c + Math.sqrt(v.D)) / v.m) + v.K] },
        { latex: '\\lambda_{1,2} = \\dfrac{c \\pm \\sqrt{c^2 - 4mK}}{2m}', errore: 'segno', spiega: 'Radici a parte reale positiva darebbero un moto che cresce senza limite: lo smorzatore dissipa, la parte reale è −c/2m.', num: (v) => [0, v.m * ((v.c + Math.sqrt(v.D)) / (2 * v.m)) ** 2 + v.c * ((v.c + Math.sqrt(v.D)) / (2 * v.m)) + v.K] },
      ],
      num: (v) => [v.m * v.l1 ** 2 + v.c * v.l1 + v.K, 0],
    },
    {
      id: 'd115.4',
      latex: '\\lambda_1 + \\lambda_2 = -\\dfrac{c}{m}, \\qquad \\lambda_1\\,\\lambda_2 = \\dfrac{K}{m}',
      perche: 'Controllo con le relazioni tra radici e coefficienti: con $m, c, K > 0$ la somma è negativa e il prodotto positivo, quindi le radici (reali o complesse) hanno sempre parte reale negativa. Il moto libero si smorza sempre.',
      fonte: { tipo: 'deduzione', da: 'p. 211', spiegazione: 'somma e prodotto delle radici di mλ² + cλ + K = 0' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.l1 * v.l2, v.K / v.m],
    },
    {
      id: 'd115.5',
      latex: 'x(t) = A_1\\,e^{\\lambda_1 t} + A_2\\,e^{\\lambda_2 t}',
      perche: 'Soluzione generale: combinazione delle due soluzioni esponenziali, con due costanti da fissare con le condizioni iniziali. La sua forma dipende dal fattore di smorzamento (d116). Nella dispensa gli esponenti hanno ancora la $i$ spuria.',
      fonte: P211,
      correzione: { nf: 'NF-31', dispensaScrive: 'x(t) = A_1 e^{\\omega_m(-\\xi + i\\sqrt{\\xi^2-1})t} + A_2 e^{\\omega_m(-\\xi - i\\sqrt{\\xi^2-1})t}' },
      distrattori: [],
      num: (v) => [v.m * v.Xdd + v.c * v.Xd + v.K * v.X, 0],
    },
  ],
  risultato: { latex: 'm\\lambda^2 + c\\lambda + K = 0, \\qquad \\lambda_{1,2} = -\\dfrac{c}{2m} \\pm \\sqrt{\\Big(\\dfrac{c}{2m}\\Big)^2 - \\dfrac{K}{m}}', fonte: P211, correzione: { nf: 'NF-31', dispensaScrive: NF31_RADICI } },
  gancio: 'Il radicando (c/2m)² − K/m decide se il sistema oscilla. Nessuna «i» davanti alla radice: la i nasce da sola quando il radicando è negativo.',
};

// ------------------------------------------------------------------ d116 smorzamento critico e ξ
export const d116: Dimostrazione = {
  id: 'd116',
  titolo: 'Smorzamento critico e fattore di smorzamento',
  enunciato: 'Ricavare il coefficiente di smorzamento critico c_r e il fattore di smorzamento ξ, e riscrivere le radici in funzione di ω_m e ξ.',
  ipotesi: ['radici λ₁,₂ = −c/2m ± √((c/2m)² − K/m) (d115)', 'ω_m² = K/m (d112)'],
  sample: (rnd) => {
    const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), xi = U(rnd, 1.05, 3);
    const wm = Math.sqrt(K / m), cr = 2 * m * wm, c = xi * cr, sq = Math.sqrt(xi * xi - 1);
    const l1 = wm * (-xi + sq), l2 = wm * (-xi - sq);
    return { m, K, xi, wm, cr, c, sq, l1, l2 };
  },
  passi: [
    {
      id: 'd116.1',
      latex: '\\Big(\\dfrac{c_r}{2m}\\Big)^2 - \\dfrac{K}{m} = 0 \\;\\Rightarrow\\; \\dfrac{c_r^2}{4m^2} = \\omega_m^2 \\;\\Rightarrow\\; c_r = 2\\,m\\,\\omega_m = 2\\sqrt{mK}',
      perche: 'Il coefficiente di smorzamento critico è quello che annulla il radicale: è il confine tra radici complesse (oscillazione) e reali (ritorno aperiodico).',
      fonte: P211,
      chiave: true,
      distrattori: [
        { latex: 'c_r = m\\,\\omega_m', errore: 'fattore', spiega: 'Dalla radice di c_r²/4m² = ω_m² esce c_r = 2mω_m: il 2 non si perde.', num: (v) => [v.cr, v.m * v.wm] },
        { latex: 'c_r = 2\\sqrt{K/m}', errore: 'indice', spiega: 'Questa è 2ω_m, una pulsazione: c_r ha le dimensioni di N·s/m, massa per pulsazione.', num: (v) => [v.cr, 2 * Math.sqrt(v.K / v.m)] },
      ],
      num: (v) => [v.cr, 2 * Math.sqrt(v.m * v.K)],
    },
    {
      id: 'd116.2',
      latex: '\\xi = \\dfrac{c}{c_r} = \\dfrac{c}{2\\,m\\,\\omega_m}',
      perche: 'Fattore di smorzamento: lo smorzamento del sistema misurato in unità di quello critico. Descrive la capacità del sistema di smorzare le vibrazioni.',
      fonte: P211,
      distrattori: [],
      num: (v) => [v.xi, v.c / (2 * v.m * v.wm)],
    },
    {
      id: 'd116.3',
      latex: '\\dfrac{c}{2m} = \\xi\\,\\omega_m, \\qquad \\dfrac{K}{m} = \\omega_m^2',
      perche: 'Dalla definizione $c = \\xi\\,2m\\omega_m$: le due grandezze dentro le radici diventano funzioni di $\\omega_m$ e $\\xi$.',
      fonte: P211,
      distrattori: [],
      num: (v) => [v.c / (2 * v.m), v.xi * v.wm],
    },
    {
      id: 'd116.4',
      latex: '\\lambda_{1,2} = -\\xi\\omega_m \\pm \\sqrt{(\\xi\\omega_m)^2 - \\omega_m^2} = \\omega_m\\big(-\\xi \\pm \\sqrt{\\xi^2 - 1}\\big)',
      perche: 'Si sostituisce nelle radici e si raccoglie $\\omega_m$ anche sotto radice. La dispensa conserva la $i$ spuria di d115 (NF-31).',
      fonte: P211,
      chiave: true,
      correzione: { nf: 'NF-31', dispensaScrive: NF31_XI },
      distrattori: [
        { latex: NF31_XI, errore: 'concetto', spiega: 'È la riga della dispensa: con la i in più le radici non annullano p(λ) (salvo ξ = 1).', num: (v) => [v.m * v.l1 ** 2 + v.c * v.l1 + v.K, v.m * v.wm ** 2 + v.c * (-v.xi * v.wm) + v.K] },
        { latex: '\\lambda_{1,2} = \\omega_m\\big(-1 \\pm \\sqrt{\\xi^2 - 1}\\big)', errore: 'termine-perso', spiega: 'La parte reale è −c/2m = −ξω_m: il ξ fuori dalla radice resta.', num: (v) => [0, v.m * (v.wm * (-1 + v.sq)) ** 2 + v.c * (v.wm * (-1 + v.sq)) + v.K] },
      ],
      num: (v) => [v.m * v.l1 ** 2 + v.c * v.l1 + v.K, 0],
    },
    {
      id: 'd116.5',
      latex: '\\lambda^2 + 2\\xi\\omega_m\\,\\lambda + \\omega_m^2 = 0',
      perche: 'Forma normalizzata dell\'equazione caratteristica (divisa per $m$), comoda da ricordare: è quella delle domande (q06).',
      fonte: { tipo: 'deduzione', da: 'p. 211', spiegazione: 'p(λ)/m con c/m = 2ξω_m e K/m = ω_m²' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.l1 ** 2 + 2 * v.xi * v.wm * v.l1 + v.wm ** 2, 0],
    },
    {
      id: 'd116.6',
      latex: '\\xi = 0\\ \\text{non smorzato};\\ \\ 0 < \\xi < 1\\ \\text{sottosmorzato};\\ \\ \\xi = 1\\ \\text{critico } (c = c_r);\\ \\ \\xi > 1\\ \\text{sovrasmorzato}',
      perche: 'Il segno di $\\xi^2 - 1$ sotto radice classifica il moto: radici immaginarie pure, complesse coniugate, reale doppia, reali distinte.',
      fonte: P211,
      distrattori: [],
    },
  ],
  risultato: { latex: 'c_r = 2\\,m\\,\\omega_m, \\qquad \\xi = \\dfrac{c}{c_r}, \\qquad \\lambda_{1,2} = \\omega_m\\big(-\\xi \\pm \\sqrt{\\xi^2 - 1}\\big)', fonte: P211, correzione: { nf: 'NF-31', dispensaScrive: NF31_XI } },
  gancio: 'c_r annulla il radicale: c_r = 2mω_m. ξ = c/c_r misura lo smorzamento in «unità critiche».',
};

// ------------------------------------------------------------------ d117 pulsazione smorzata
export const d117: Dimostrazione = {
  id: 'd117',
  titolo: 'Pulsazione naturale smorzata',
  enunciato: 'Per 0 < ξ < 1 ricavare la pulsazione smorzata ω_d e il periodo smorzato T_d.',
  ipotesi: ['0 < ξ < 1', 'λ₁,₂ = ω_m(−ξ ± √(ξ²−1)) (d116)'],
  sample: (rnd) => {
    const xi = U(rnd, 0.02, 0.9), wm = U(rnd, 5, 80);
    const a = -xi * wm, b = wm * Math.sqrt(1 - xi * xi), wd = b, Td = (2 * Math.PI) / wd, Tm = (2 * Math.PI) / wm;
    return { xi, wm, a, b, wd, Td, Tm };
  },
  passi: [
    {
      id: 'd117.1',
      latex: '0 < \\xi < 1:\\ \\ \\xi^2 - 1 < 0 \\;\\Rightarrow\\; \\sqrt{\\xi^2 - 1} = i\\sqrt{1 - \\xi^2}',
      perche: 'Il radicando è negativo: la radice è immaginaria. Controllo: $(i\\sqrt{1-\\xi^2})^2 = -(1-\\xi^2) = \\xi^2 - 1$. La dispensa scrive $-\\sqrt{1-\\xi^2}$, che compensa la $i$ spuria di p. 211: due errori che si annullano.',
      fonte: P212,
      chiave: true,
      correzione: { nf: 'NF-31', dispensaScrive: '\\sqrt{\\xi^2 - 1} = -\\sqrt{1 - \\xi^2}' },
      distrattori: [
        { latex: '\\sqrt{\\xi^2 - 1} = -\\sqrt{1 - \\xi^2}', errore: 'concetto', spiega: 'È la riga della dispensa (NF-31): elevando al quadrato dà 1 − ξ², non ξ² − 1.', num: (v) => [v.xi ** 2 - 1, 1 - v.xi ** 2] },
        { latex: '\\sqrt{\\xi^2 - 1} = i\\,(1 - \\xi^2)', errore: 'termine-perso', spiega: 'Si porta fuori la i, ma la radice di 1 − ξ² resta.', num: (v) => [v.xi ** 2 - 1, -((1 - v.xi ** 2) ** 2)] },
      ],
      num: (v) => [-(1 - v.xi ** 2), v.xi ** 2 - 1],
    },
    {
      id: 'd117.2',
      latex: '\\lambda_{1,2} = -\\xi\\omega_m \\pm i\\,\\omega_m\\sqrt{1 - \\xi^2}',
      perche: 'Radici complesse coniugate: la parte reale $-\\xi\\omega_m$ dà il decadimento, la parte immaginaria la pulsazione dell\'oscillazione. Controllo sulla parte reale di $p(\\lambda)/m$: $a^2 - b^2 + 2\\xi\\omega_m a + \\omega_m^2 = 0$ con $a = -\\xi\\omega_m$, $b = \\omega_m\\sqrt{1-\\xi^2}$ (la parte immaginaria $2ab + 2\\xi\\omega_m b$ è nulla).',
      fonte: P212,
      distrattori: [],
      num: (v) => [v.a * v.a - v.b * v.b + 2 * v.xi * v.wm * v.a + v.wm ** 2, 0],
    },
    {
      id: 'd117.3',
      latex: '\\omega_d = \\omega_m\\sqrt{1 - \\xi^2} \\;\\Rightarrow\\; \\lambda_{1,2} = -\\xi\\omega_m \\pm i\\,\\omega_d',
      perche: 'La parte immaginaria delle radici è la pulsazione smorzata: lo smorzamento rallenta un po\' l\'oscillazione, $\\omega_d < \\omega_m$.',
      fonte: P212,
      chiave: true,
      distrattori: [
        { latex: '\\omega_d = \\omega_m\\sqrt{1 + \\xi^2}', errore: 'segno', spiega: 'Lo smorzamento rallenta: ω_d è minore di ω_m, il segno sotto radice è meno.', num: (v) => [v.wd, v.wm * Math.sqrt(1 + v.xi ** 2)] },
        { latex: '\\omega_d = \\omega_m\\,(1 - \\xi^2)', errore: 'termine-perso', spiega: 'Viene dalla radice di (1 − ξ²): non si può togliere.', num: (v) => [v.wd, v.wm * (1 - v.xi ** 2)] },
        { latex: '\\omega_d = \\xi\\,\\omega_m', errore: 'concetto', spiega: 'ξω_m è la parte reale, il tasso di decadimento dell\'inviluppo, non la pulsazione.', num: (v) => [v.wd, v.xi * v.wm] },
      ],
      num: (v) => [v.wd, v.wm * Math.sqrt(1 - v.xi ** 2)],
    },
    {
      id: 'd117.4',
      latex: 'T_d = \\dfrac{2\\pi}{\\omega_d} = \\dfrac{T_m}{\\sqrt{1 - \\xi^2}} > T_m',
      perche: 'Periodo smorzato: è la distanza tra due picchi consecutivi nel grafico di p. 212. Per $\\xi$ piccolo è quasi uguale a $T_m$ (con $\\xi = 0{,}1$: $\\sqrt{0{,}99} \\approx 0{,}995$).',
      fonte: P212,
      distrattori: [],
      num: (v) => [v.Td, v.Tm / Math.sqrt(1 - v.xi ** 2)],
    },
  ],
  risultato: { latex: '\\omega_d = \\omega_m\\sqrt{1 - \\xi^2}, \\qquad T_d = 2\\pi/\\omega_d', fonte: P212 },
  gancio: 'Parte reale = decadimento ξω_m, parte immaginaria = pulsazione ω_d = ω_m√(1−ξ²), un po\' più lenta.',
};

// ------------------------------------------------------------------ d118 soluzione sottosmorzata
export const d118: Dimostrazione = {
  id: 'd118',
  titolo: 'Soluzione sottosmorzata',
  enunciato: 'Per 0 < ξ < 1 scrivere la risposta libera in forma reale: un\'armonica a pulsazione ω_d moltiplicata per un esponenziale decrescente.',
  ipotesi: ['0 < ξ < 1', 'λ₁,₂ = −ξω_m ± iω_d (d117)', 'x reale: A₂ coniugato di A₁ (come a p. 209)'],
  sample: (rnd) => {
    const xi = U(rnd, 0.02, 0.9), wm = U(rnd, 5, 50), wd = wm * Math.sqrt(1 - xi * xi);
    const X = U(rnd, 0.005, 0.05), be = U(rnd, -3, 3), t = U(rnd, 0, 0.5), al = be + Math.PI / 2, e = Math.exp(-xi * wm * t);
    const x0 = U(rnd, -0.05, 0.05), v0 = U(rnd, -1, 1), b = (v0 + xi * wm * x0) / wd;
    return { xi, wm, wd, X, be, t, al, e, x0, v0, b };
  },
  passi: [
    {
      id: 'd118.1',
      latex: 'x(t) = A_1 e^{\\lambda_1 t} + A_2 e^{\\lambda_2 t} = e^{-\\xi\\omega_m t}\\big(A_1 e^{i\\omega_d t} + A_2 e^{-i\\omega_d t}\\big)',
      perche: 'Si separano parte reale e immaginaria degli esponenti e si raccoglie il fattore comune $e^{-\\xi\\omega_m t}$. La dispensa arriva alla stessa forma con i due esponenziali scambiati, passando per due errori che si compensano (NF-31): con le radici corrette ci si arriva direttamente.',
      fonte: P212,
      chiave: true,
      distrattori: [
        { latex: 'x(t) = e^{+\\xi\\omega_m t}\\big(A_1 e^{i\\omega_d t} + A_2 e^{-i\\omega_d t}\\big)', errore: 'segno', spiega: 'La parte reale delle radici è −ξω_m: l\'esponenziale decresce.' },
        { latex: 'x(t) = e^{-\\xi\\omega_m t}\\big(A_1 e^{i\\omega_m t} + A_2 e^{-i\\omega_m t}\\big)', errore: 'indice', spiega: 'La parte immaginaria delle radici è ω_d, non ω_m.' },
      ],
    },
    {
      id: 'd118.2',
      latex: 'A_2 = \\bar A_1 = \\tfrac{X}{2}e^{-i\\beta} \\;\\Rightarrow\\; x(t) = X\\,e^{-\\xi\\omega_m t}\\cos(\\omega_d t + \\beta) = X\\,e^{-\\xi\\omega_m t}\\sin(\\omega_d t + \\alpha),\\ \\ \\alpha = \\beta + \\tfrac{\\pi}{2}',
      perche: 'Come nel caso non smorzato, per avere $x$ reale le costanti sono coniugate: la parentesi diventa $X\\cos(\\omega_d t + \\beta)$. In forma col seno è la scrittura della dispensa: esponenziale decrescente per armonica a pulsazione smorzata (la sua costante «$x_0$» è un\'ampiezza generica, non $x(0)$).',
      fonte: P212,
      chiave: true,
      distrattori: [
        { latex: 'x(t) = X\\,e^{-\\xi\\omega_m t}\\sin(\\omega_m t + \\alpha)', errore: 'indice', spiega: 'La pulsazione dell\'armonica è ω_d = ω_m√(1−ξ²).', num: (v) => [v.X * v.e * Math.sin(v.wd * v.t + v.al), v.X * v.e * Math.sin(v.wm * v.t + v.al)] },
        { latex: 'x(t) = X\\sin(\\omega_d t + \\alpha)', errore: 'termine-perso', spiega: 'Senza inviluppo esponenziale l\'ampiezza resterebbe costante: è proprio l\'effetto dello smorzamento a mancare.', num: (v) => [v.X * v.e * Math.sin(v.wd * v.t + v.al), v.X * Math.sin(v.wd * v.t + v.al)] },
        { latex: 'x(t) = X\\,e^{-\\omega_d t}\\sin(\\omega_d t + \\alpha)', errore: 'concetto', spiega: 'Il tasso di decadimento è la parte reale ξω_m, non ω_d.', num: (v) => [v.X * v.e * Math.sin(v.wd * v.t + v.al), v.X * Math.exp(-v.wd * v.t) * Math.sin(v.wd * v.t + v.al)] },
      ],
      num: (v) => [v.X * v.e * Math.cos(v.wd * v.t + v.be), v.X * v.e * Math.sin(v.wd * v.t + v.al)],
    },
    {
      id: 'd118.3',
      latex: 'x(t) = e^{-\\xi\\omega_m t}\\big(a\\cos\\omega_d t + b\\sin\\omega_d t\\big), \\qquad a = X\\sin\\alpha,\\ \\ b = X\\cos\\alpha',
      perche: 'Sviluppando il seno della somma si ha la forma con due costanti reali, quella delle domande (q06, d118): è la stessa soluzione.',
      fonte: { tipo: 'deduzione', da: 'p. 212', spiegazione: 'sin(ω_d t + α) = sin α cos ω_d t + cos α sin ω_d t' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.X * v.e * Math.sin(v.wd * v.t + v.al), v.e * (v.X * Math.sin(v.al) * Math.cos(v.wd * v.t) + v.X * Math.cos(v.al) * Math.sin(v.wd * v.t))],
    },
    {
      id: 'd118.4',
      latex: 'x(0) = x_0,\\ \\dot x(0) = v_0 \\;\\Rightarrow\\; a = x_0, \\quad b = \\dfrac{v_0 + \\xi\\omega_m x_0}{\\omega_d}',
      perche: 'Condizioni iniziali (la dispensa non le impone nel caso smorzato): in $t = 0$ la parentesi vale $a$; derivando, $\\dot x(0) = -\\xi\\omega_m a + \\omega_d b$. Anche con $v_0 = 0$ il seno non sparisce: $b = \\xi\\omega_m x_0/\\omega_d$.',
      fonte: { tipo: 'deduzione', da: 'pp. 210, 212', spiegazione: 'problema di Cauchy di p. 210 applicato alla forma di p. 212' },
      distrattori: [
        { latex: 'b = \\dfrac{v_0}{\\omega_d}', errore: 'termine-perso', spiega: 'Derivando si deriva anche l\'esponenziale: compare −ξω_m x₀, che va compensato.', num: (v) => [-v.xi * v.wm * v.x0 + v.wd * v.b, -v.xi * v.wm * v.x0 + v.v0] },
      ],
      num: (v) => [-v.xi * v.wm * v.x0 + v.wd * v.b, v.v0],
    },
    {
      id: 'd118.5',
      latex: '|x(t)| \\le X\\,e^{-\\xi\\omega_m t} \\;\\xrightarrow{\\ t\\to\\infty\\ }\\; 0',
      perche: 'L\'armonica è racchiusa tra i due inviluppi $\\pm X e^{-\\xi\\omega_m t}$ (grafico di p. 212 con $\\xi = 0{,}04$): la massa oscilla attorno all\'equilibrio con ampiezza decrescente, tanto più in fretta quanto maggiore è $\\xi$.',
      fonte: P212,
      distrattori: [],
    },
  ],
  risultato: { latex: 'x(t) = X\\,e^{-\\xi\\omega_m t}\\sin(\\omega_d t + \\alpha), \\qquad \\omega_d = \\omega_m\\sqrt{1 - \\xi^2}', fonte: P212 },
  gancio: 'Sinusoide (a ω_d) per esponenziale che decade (con ξω_m): costanti coniugate come nel caso non smorzato.',
};

// ------------------------------------------------------------------ d119 decremento logaritmico
export const d119: Dimostrazione = {
  id: 'd119',
  titolo: 'Decremento logaritmico',
  enunciato: 'Definire il decremento logaritmico δ, ricavarne l\'espressione in funzione di ξ e la formula inversa per misurare ξ.',
  ipotesi: ['0 < ξ < 1', 'x(t) = X e^{−ξω_m t} sin(ω_d t + α) (d118)'],
  sample: (rnd) => {
    const xi = U(rnd, 0.02, 0.6), wm = U(rnd, 5, 50), wd = wm * Math.sqrt(1 - xi * xi), Td = (2 * Math.PI) / wd;
    const X = U(rnd, 0.005, 0.05), al = U(rnd, 0.2, 1.2), t = U(rnd, 0, 0.3), n = 1 + Math.floor(rnd() * 5);
    const env = (s: number) => X * Math.exp(-xi * wm * s);
    const x = (s: number) => env(s) * Math.sin(wd * s + al);
    const delta = (2 * Math.PI * xi) / Math.sqrt(1 - xi * xi);
    return { xi, wm, wd, Td, X, al, t, n, delta, e0: env(t), e1: env(t + Td), x0t: x(t), x1t: x(t + Td), xn: x(t + n * Td) };
  },
  passi: [
    {
      id: 'd119.1',
      latex: '\\delta = \\ln\\dfrac{X e^{-\\xi\\omega_m t}}{X e^{-\\xi\\omega_m (t + T_d)}} = \\ln e^{\\xi\\omega_m T_d} = \\xi\\,\\omega_m\\,T_d',
      perche: 'Definizione: logaritmo del rapporto tra due ampiezze consecutive, cioè a distanza di un periodo smorzato. Misura la riduzione di ampiezza tra due picchi: nel rapporto $X$ e $t$ si semplificano.',
      fonte: P212,
      chiave: true,
      distrattori: [],
      num: (v) => [Math.log(v.e0 / v.e1), v.xi * v.wm * v.Td],
    },
    {
      id: 'd119.2',
      latex: '\\dfrac{x(t)}{x(t + T_d)} = e^{\\xi\\omega_m T_d}\\quad \\forall t',
      perche: 'Vale per il segnale vero, non solo per l\'inviluppo: il seno si ripete dopo $T_d$, quindi due punti qualsiasi a distanza di un periodo smorzato (in particolare due picchi consecutivi) hanno lo stesso rapporto.',
      fonte: { tipo: 'deduzione', da: 'p. 212', spiegazione: 'sin(ω_d(t + T_d) + α) = sin(ω_d t + α)' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.x0t / v.x1t, Math.exp(v.xi * v.wm * v.Td)],
    },
    {
      id: 'd119.3',
      latex: 'T_d = \\dfrac{2\\pi}{\\omega_d} \\;\\Rightarrow\\; \\delta = \\dfrac{2\\pi\\,\\xi\\,\\omega_m}{\\omega_m\\sqrt{1 - \\xi^2}} = \\dfrac{2\\pi\\xi}{\\sqrt{1 - \\xi^2}}',
      perche: 'Si sostituisce il periodo smorzato: $\\omega_m$ si semplifica e $\\delta$ dipende solo da $\\xi$. Cresce con $\\xi$: più smorzamento, oscillazioni che si spengono prima.',
      fonte: P212,
      chiave: true,
      distrattori: [
        { latex: '\\delta = \\dfrac{2\\pi\\xi}{\\sqrt{1 + \\xi^2}}', errore: 'segno', spiega: 'Viene da ω_d = ω_m√(1−ξ²): il segno è meno.', num: (v) => [v.delta, (2 * Math.PI * v.xi) / Math.sqrt(1 + v.xi ** 2)] },
        { latex: '\\delta = 2\\pi\\xi', errore: 'termine-perso', spiega: 'È solo l\'approssimazione per ξ ≪ 1: si è usato T_m al posto di T_d.', num: (v) => [v.delta, 2 * Math.PI * v.xi] },
        { latex: '\\delta = \\dfrac{\\xi\\,\\omega_m}{T_d}', errore: 'concetto', spiega: 'Dal rapporto degli esponenziali esce il prodotto ξω_m T_d, adimensionale.', num: (v) => [v.delta, (v.xi * v.wm) / v.Td] },
      ],
      num: (v) => [v.xi * v.wm * v.Td, (2 * Math.PI * v.xi) / Math.sqrt(1 - v.xi ** 2)],
    },
    {
      id: 'd119.4',
      latex: '\\xi = \\dfrac{\\delta}{\\sqrt{4\\pi^2 + \\delta^2}}',
      perche: 'Formula inversa (la dispensa la nomina senza scriverla): da $\\delta^2(1 - \\xi^2) = 4\\pi^2\\xi^2$. È la misura sperimentale: si perturba il sistema, si registra la risposta con un trasduttore, si legge il rapporto tra due ampiezze consecutive e si ricava $\\xi$.',
      fonte: { tipo: 'deduzione', da: 'p. 212', spiegazione: 'si risolve δ = 2πξ/√(1−ξ²) rispetto a ξ («dalla formula inversa ricavo il fattore di smorzamento»)' },
      chiave: true,
      distrattori: [
        { latex: '\\xi = \\dfrac{\\delta}{2\\pi}', errore: 'termine-perso', spiega: 'Vale solo per smorzamento piccolo; la formula esatta ha δ² sotto radice.', num: (v) => [v.xi, v.delta / (2 * Math.PI)] },
        { latex: '\\xi = \\dfrac{\\delta}{\\sqrt{4\\pi^2 - \\delta^2}}', errore: 'segno', spiega: 'Da δ²(1 − ξ²) = 4π²ξ² si ha ξ²(4π² + δ²) = δ²: il segno è più.', num: (v) => [v.xi, v.delta / Math.sqrt(4 * Math.PI ** 2 - v.delta ** 2)] },
      ],
      num: (v) => [v.xi, v.delta / Math.sqrt(4 * Math.PI ** 2 + v.delta ** 2)],
    },
    {
      id: 'd119.5',
      latex: '\\delta = \\dfrac{1}{n}\\,\\ln\\dfrac{x(t)}{x(t + n\\,T_d)}',
      perche: 'In laboratorio conviene misurare il rapporto dopo $n$ periodi: il decadimento si accumula ($e^{n\\delta}$) e l\'errore di lettura pesa meno.',
      fonte: { tipo: 'esterna', ref: 'trattazione classica del decremento logaritmico su più periodi', nota: 'non scritto nella dispensa; segue dal passo 2 applicato n volte' },
      distrattori: [],
      num: (v) => [v.delta, Math.log(v.x0t / v.xn) / v.n],
    },
  ],
  risultato: { latex: '\\delta = \\ln\\dfrac{x(t)}{x(t + T_d)} = \\xi\\,\\omega_m T_d = \\dfrac{2\\pi\\xi}{\\sqrt{1 - \\xi^2}}', fonte: P212 },
  gancio: 'Il logaritmo trasforma il decadimento esponenziale in un numero costante per ciclo: δ = ξω_m T_d.',
};

// ------------------------------------------------------------------ d120 caso critico
export const d120: Dimostrazione = {
  id: 'd120',
  titolo: 'Caso criticamente smorzato',
  enunciato: 'Per ξ = 1 ricavare la soluzione generale con la radice doppia e fissarne le costanti con le condizioni iniziali.',
  ipotesi: ['ξ = 1, cioè c = c_r = 2mω_m', 'equazione m ẍ + c ẋ + K x = 0'],
  sample: (rnd) => {
    const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), wm = Math.sqrt(K / m), c = 2 * m * wm;
    const t = U(rnd, 0, 0.5), x0 = U(rnd, 0.005, 0.05), v0 = U(rnd, -1, 1), E = Math.exp(-wm * t);
    const A1 = x0, A2 = v0 + wm * x0;
    const y = t * E, yd = (1 - wm * t) * E, ydd = (wm * wm * t - 2 * wm) * E;
    const y2 = t * t * E, y2d = (2 * t - wm * t * t) * E, y2dd = (2 - 4 * wm * t + wm * wm * t * t) * E;
    const z = Math.exp(-2 * wm * t);
    return { m, K, wm, c, t, x0, v0, E, A1, A2, y, yd, ydd, y2, y2d, y2dd, z };
  },
  passi: [
    {
      id: 'd120.1',
      latex: '\\xi = 1:\\ \\ \\lambda_{1,2} = -\\omega_m\\big(\\xi \\pm \\sqrt{\\xi^2 - 1}\\big) = -\\omega_m \\quad (\\text{radice doppia reale})',
      perche: 'Con $c = c_r$ il radicale si annulla: le due radici coincidono. Controllo: $p(-\\omega_m) = m\\omega_m^2 - c\\,\\omega_m + K = 0$ e anche $p\'(-\\omega_m) = -2m\\omega_m + c = 0$, quindi la radice è doppia.',
      fonte: P213,
      distrattori: [],
      num: (v) => [v.m * v.wm ** 2 - v.c * v.wm + v.K, 0],
    },
    {
      id: 'd120.2',
      latex: 'A_1 e^{\\lambda_1 t} + A_2 e^{\\lambda_2 t} = (A_1 + A_2)\\,e^{-\\omega_m t}',
      perche: 'Con la radice doppia i due esponenziali sono lo stesso: $A_1 + A_2$ è una sola costante e non si possono soddisfare due condizioni iniziali (posizione e velocità). Serve una seconda soluzione indipendente. La dispensa si ferma qui e la riquadra come soluzione: è l\'errore NF-32.',
      fonte: P213,
      chiave: true,
      correzione: { nf: 'NF-32', dispensaScrive: 'x(t) = e^{-\\omega_m t}(A_1 + A_2)' },
      distrattori: [
        { latex: 'x(t) = (A_1 + A_2)\\,e^{-\\omega_m t}\\ \\text{è la soluzione generale}', errore: 'concetto', spiega: 'È la riga riquadrata della dispensa (NF-32): con una sola costante non si impongono x(0) e ẋ(0).' },
        { latex: 'x(t) = A_1 e^{-\\omega_m t} + A_2 e^{+\\omega_m t}', errore: 'segno', spiega: 'Entrambe le radici valgono −ω_m: non c\'è nessun esponenziale crescente.', num: (v) => [v.A1 * v.E + v.A2 * v.E, v.A1 * v.E + v.A2 / v.E] },
      ],
      num: (v) => [v.A1 * v.E + v.A2 * v.E, (v.A1 + v.A2) * v.E],
    },
    {
      id: 'd120.3',
      latex: 'x = t\\,e^{-\\omega_m t}:\\ \\ m\\ddot x + c\\dot x + Kx = \\big[m(\\omega_m^2 t - 2\\omega_m) + c\\,(1 - \\omega_m t) + K t\\big]e^{-\\omega_m t} = 0',
      perche: 'Con radice doppia la seconda soluzione è $t\\,e^{\\lambda t}$. Si verifica sostituendo: con $c = 2m\\omega_m$ e $K = m\\omega_m^2$ i termini in $t$ e quelli costanti si annullano separatamente.',
      fonte: { tipo: 'esterna', ref: 'teoria delle equazioni differenziali lineari a coefficienti costanti (radice doppia)', nota: 'la dispensa non la scrive (NF-32); verificata per sostituzione e con dsolve' },
      chiave: true,
      distrattori: [
        { latex: 'x = t^2\\,e^{-\\omega_m t}', errore: 'indice', spiega: 'Sostituendo resta 2m e^{−ω_m t} ≠ 0: la potenza di t è una sola (radice doppia, non tripla).', num: (v) => [v.m * v.ydd + v.c * v.yd + v.K * v.y, v.m * v.y2dd + v.c * v.y2d + v.K * v.y2] },
        { latex: 'x = e^{-2\\omega_m t}', errore: 'concetto', spiega: '−2ω_m non è radice: sostituendo resta mω_m² e^{−2ω_m t}.', num: (v) => [0, v.m * 4 * v.wm ** 2 * v.z - v.c * 2 * v.wm * v.z + v.K * v.z] },
      ],
      num: (v) => [v.m * v.ydd + v.c * v.yd + v.K * v.y, 0],
    },
    {
      id: 'd120.4',
      latex: 'x(t) = (A_1 + A_2\\,t)\\,e^{-\\omega_m t};\\quad x(0) = x_0,\\ \\dot x(0) = v_0 \\;\\Rightarrow\\; A_1 = x_0,\\ \\ A_2 = v_0 + \\omega_m x_0',
      perche: 'Ora le costanti sono due e indipendenti: $x(0) = A_1$, $\\dot x(0) = -\\omega_m A_1 + A_2$.',
      fonte: { tipo: 'deduzione', da: 'p. 213 corretta (NF-32)', spiegazione: 'soluzione generale con t e^{−ω_m t}; costanti dal problema di Cauchy' },
      chiave: true,
      correzione: { nf: 'NF-32', dispensaScrive: 'x(t) = e^{-\\omega_m t}(A_1 + A_2)' },
      distrattori: [
        { latex: 'A_2 = v_0', errore: 'termine-perso', spiega: 'Derivando (A₁ + A₂t)e^{−ω_m t} compare anche −ω_m A₁.', num: (v) => [-v.wm * v.A1 + v.A2, -v.wm * v.A1 + v.v0] },
        { latex: 'A_1 = x_0,\\ \\ A_2 = v_0 - \\omega_m x_0', errore: 'segno', spiega: 'ẋ(0) = A₂ − ω_m A₁ = v₀, quindi A₂ = v₀ + ω_m x₀.', num: (v) => [-v.wm * v.A1 + v.A2, -v.wm * v.A1 + v.v0 - v.wm * v.x0] },
      ],
      num: (v) => [-v.wm * v.A1 + v.A2, v.v0],
    },
    {
      id: 'd120.5',
      latex: '\\dot x(0) = 0:\\ \\ x(t) = x_0\\,(1 + \\omega_m t)\\,e^{-\\omega_m t}',
      perche: 'Partendo da fermo (come nel grafico di p. 213, $\\xi = 1$): tangente orizzontale in $t = 0$, poi discesa rapida verso zero senza mai attraversarlo. Il moto non è armonico: è il ritorno più rapido senza oscillazioni.',
      fonte: P213,
      distrattori: [],
      num: (v) => [libera(1, v.wm, v.x0, 0, v.t), v.x0 * (1 + v.wm * v.t) * v.E],
    },
  ],
  risultato: { latex: 'x(t) = (A_1 + A_2\\,t)\\,e^{-\\omega_m t}', fonte: P213, correzione: { nf: 'NF-32', dispensaScrive: 'x(t) = e^{-\\omega_m t}(A_1 + A_2)' } },
  gancio: 'Radice doppia ⇒ compare il fattore t: (A₁ + A₂t)e^{−ω_m t}. Con A₁ + A₂ e basta, le costanti sono una.',
};

// ------------------------------------------------------------------ d121 caso sovrasmorzato
export const d121: Dimostrazione = {
  id: 'd121',
  titolo: 'Caso sovrasmorzato',
  enunciato: 'Per ξ > 1 ricavare la soluzione come somma di due esponenziali reali decrescenti e capire perché il ritorno rallenta quando ξ cresce.',
  ipotesi: ['ξ > 1, cioè c > c_r', 'λ₁,₂ = −ω_m(ξ ± √(ξ²−1)) (d116)'],
  sample: (rnd) => {
    const xi = U(rnd, 1.1, 4), wm = U(rnd, 5, 50), sq = Math.sqrt(xi * xi - 1);
    const l1 = -wm * (xi + sq), l2 = -wm * (xi - sq);
    const x0 = U(rnd, 0.005, 0.05), v0 = U(rnd, -1, 1), t = U(rnd, 0, 0.3);
    const A1 = (l2 * x0 - v0) / (l2 - l1), A2 = (v0 - l1 * x0) / (l2 - l1);
    const e1 = Math.exp(l1 * t), e2 = Math.exp(l2 * t);
    const x = A1 * e1 + A2 * e2, xd = A1 * l1 * e1 + A2 * l2 * e2, xdd = A1 * l1 * l1 * e1 + A2 * l2 * l2 * e2;
    return { xi, wm, sq, l1, l2, x0, v0, t, A1, A2, x, xd, xdd };
  },
  passi: [
    {
      id: 'd121.1',
      latex: '\\lambda_{1,2} = -\\omega_m\\big(\\xi \\pm \\sqrt{\\xi^2 - 1}\\big) \\in \\mathbb R',
      perche: 'Con $\\xi > 1$ il radicando è positivo: due radici reali e distinte. Qui la dispensa le scrive finalmente senza la $i$. Controllo: $\\lambda_1^2 + 2\\xi\\omega_m\\lambda_1 + \\omega_m^2 = 0$.',
      fonte: P213,
      distrattori: [],
      num: (v) => [v.l1 ** 2 + 2 * v.xi * v.wm * v.l1 + v.wm ** 2, 0],
    },
    {
      id: 'd121.2',
      latex: '\\lambda_1\\,\\lambda_2 = \\omega_m^2 > 0, \\qquad \\lambda_1 + \\lambda_2 = -2\\xi\\omega_m < 0 \\;\\Rightarrow\\; \\lambda_1, \\lambda_2 < 0',
      perche: 'Prodotto positivo: stesso segno; somma negativa: entrambe negative. Quindi sono due esponenziali decrescenti, nessuna oscillazione (risposta aperiodica).',
      fonte: { tipo: 'deduzione', da: 'p. 213', spiegazione: 'relazioni tra radici e coefficienti di λ² + 2ξω_mλ + ω_m² = 0' },
      chiave: true,
      distrattori: [
        { latex: '\\lambda_2 = -\\omega_m\\big(\\xi - \\sqrt{\\xi^2-1}\\big) > 0', errore: 'concetto', spiega: '√(ξ²−1) < ξ: anche la radice «col meno» è negativa. Una radice positiva vorrebbe dire un sistema instabile.' },
        { latex: '\\lambda_1\\,\\lambda_2 = -\\omega_m^2', errore: 'segno', spiega: '(ξ + √(ξ²−1))(ξ − √(ξ²−1)) = ξ² − (ξ² − 1) = 1: il prodotto è +ω_m².', num: (v) => [v.l1 * v.l2, -(v.wm ** 2)] },
      ],
      num: (v) => [v.l1 * v.l2, v.wm ** 2],
    },
    {
      id: 'd121.3',
      latex: 'x(t) = A_1\\,e^{-\\omega_m(\\xi + \\sqrt{\\xi^2 - 1})\\,t} + A_2\\,e^{-\\omega_m(\\xi - \\sqrt{\\xi^2 - 1})\\,t}',
      perche: 'Soluzione generale con le due radici reali (p. 213, grafico con $\\xi = 2$): somma di due esponenziali, uno rapido e uno lento.',
      fonte: P213,
      distrattori: [],
      num: (v) => [v.xdd + 2 * v.xi * v.wm * v.xd + v.wm ** 2 * v.x, 0],
    },
    {
      id: 'd121.4',
      latex: 'A_1 + A_2 = x_0,\\ \\ \\lambda_1 A_1 + \\lambda_2 A_2 = v_0 \\;\\Rightarrow\\; A_1 = \\dfrac{\\lambda_2 x_0 - v_0}{\\lambda_2 - \\lambda_1},\\ \\ A_2 = \\dfrac{v_0 - \\lambda_1 x_0}{\\lambda_2 - \\lambda_1}',
      perche: 'Condizioni iniziali: sistema lineare $2\\times 2$ nelle costanti, risolto con Cramer.',
      fonte: { tipo: 'deduzione', da: 'p. 213', spiegazione: 'problema di Cauchy sulla soluzione di p. 213' },
      distrattori: [],
      num: (v) => [v.l1 * v.A1 + v.l2 * v.A2, v.v0],
    },
    {
      id: 'd121.5',
      latex: '|\\lambda_2| = \\omega_m\\big(\\xi - \\sqrt{\\xi^2 - 1}\\big) = \\dfrac{\\omega_m}{\\xi + \\sqrt{\\xi^2 - 1}} < \\omega_m',
      perche: 'A lungo andare comanda l\'esponenziale lento, quello di $\\lambda_2$. Razionalizzando si vede che $|\\lambda_2| < \\omega_m$ (il tasso del caso critico) e che cala quando $\\xi$ cresce: più smorzamento oltre il critico rende il ritorno **più lento**.',
      fonte: { tipo: 'deduzione', da: 'p. 213', spiegazione: '(ξ − √(ξ²−1))(ξ + √(ξ²−1)) = 1' },
      chiave: true,
      distrattori: [
        { latex: '|\\lambda_2| = \\omega_m\\big(\\xi + \\sqrt{\\xi^2 - 1}\\big)', errore: 'indice', spiega: 'Questa è la radice rapida, che si spegne subito: il ritorno è dettato da quella lenta.', num: (v) => [-v.l2, v.wm * (v.xi + v.sq)] },
        { latex: '|\\lambda_2| = \\xi\\,\\omega_m', errore: 'termine-perso', spiega: 'Si è persa la radice: ξω_m è solo la media delle due.', num: (v) => [-v.l2, v.xi * v.wm] },
      ],
      num: (v) => [v.wm * (v.xi - v.sq), v.wm / (v.xi + v.sq)],
    },
    {
      id: 'd121.6',
      latex: '\\text{risposta aperiodica, più lenta del caso critico; il confronto con il sottosmorzato dipende da } \\xi',
      perche: 'La dispensa dice che il sovrasmorzato si attenua in un tempo maggiore del critico «ma minore di un sistema sottosmorzato»: la seconda parte non è generale. Un sottosmorzato con $\\xi$ vicino a 1 si assesta prima di un sovrasmorzato con $\\xi$ grande; uno con $\\xi$ piccolo dopo.',
      fonte: P213,
      correzione: { nf: 'NF-244', dispensaScrive: '\\text{«si attenua in un tempo maggiore di quello critico, ma minore di un sistema sottosmorzato»}' },
      distrattori: [],
    },
  ],
  risultato: { latex: 'x(t) = A_1 e^{\\lambda_1 t} + A_2 e^{\\lambda_2 t}, \\qquad \\lambda_{1,2} = -\\omega_m\\big(\\xi \\pm \\sqrt{\\xi^2 - 1}\\big) < 0', fonte: P213 },
  gancio: 'Due decadimenti, nessuna sinusoide; comanda quello lento ω_m/(ξ + √(ξ²−1)): oltre il critico, più smorzamento = ritorno più lento.',
};

// ------------------------------------------------------------------ argomento
export const smorzate: ArgomentoContenuto = {
  id: 'c7-smorzate',
  cosaDireSubito:
    'Aggiungo uno smorzatore viscoso: m ẍ + c ẋ + K x = 0. Con l\'ansatz esponenziale ottengo l\'equazione caratteristica, con radici λ = ω_m(−ξ ± √(ξ²−1)) che dipendono dal fattore di smorzamento ξ = c/c_r, con c_r = 2mω_m. Se ξ < 1 la massa oscilla a ω_d = ω_m√(1−ξ²) dentro un inviluppo esponenziale; se ξ ≥ 1 torna all\'equilibrio senza oscillare, nel modo più rapido per ξ = 1.',
  sistemaIpotesi: [
    'Sistema: massa m, molla K, smorzatore viscoso c tra parete e massa; un grado di libertà x(t).',
    'Smorzatore lineare equivalente: forza −c ẋ proporzionale alla velocità relativa e opposta (p. 208).',
    'Nessuna forza esterna: vibrazioni libere, con energia introdotta solo dalle condizioni iniziali.',
  ],
  disegno: {
    svg: figSmorzate(),
    didascalia: 'Modello massa–molla–smorzatore e schema di corpo libero (p. 211); risposte libere con ξ = 0,1, 1 e 2 (grafici di pp. 212–213).',
    fonte: { tipo: 'dispensa', pag: [211, 213], fig: 'figura incollata e grafici delle risposte libere' },
    elementi: [
      { id: 'modello', testo: 'parete, molla K e smorzatore c in parallelo, massa M su guida', obbligatorio: true },
      { id: 'asse', testo: 'asse x verso destra', obbligatorio: true },
      { id: 'cdl', testo: 'corpo libero: F_el, F_s, F_in lungo x (ipotizzate positive)', obbligatorio: true },
      { id: 'sotto', testo: 'risposta sottosmorzata con inviluppo ±X e^{−ξω_m t} e periodo T_d', obbligatorio: true },
      { id: 'critico', testo: 'risposte critica e sovrasmorzata che tendono a zero senza attraversarlo', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'm\\,\\ddot x + c\\,\\dot x + K\\,x = 0 \\;\\Rightarrow\\; m\\lambda^2 + c\\lambda + K = 0',
    spiegazione: 'Equilibrio lungo x di inerzia, smorzatore e molla; con l\'ansatz x = x₀e^{λt} diventa l\'equazione caratteristica p(λ) = 0.',
    fonte: P211,
  },
  dimostrazioni: ['d115', 'd116', 'd117', 'd118', 'd119', 'd120', 'd121'],
  significato:
    'Lo smorzamento si misura in unità critiche: ξ. Sotto il critico il sistema oscilla un po\' più lentamente (ω_d < ω_m) con ampiezza che decresce di un fattore costante a ogni ciclo (e^δ); il critico è il ritorno più rapido senza oscillazioni; oltre il critico il ritorno è aperiodico e sempre più lento. Il decremento logaritmico permette di misurare ξ da un semplice tracciato.',
  fraseDaRicordare: 'λ = ω_m(−ξ ± √(ξ²−1)): sotto il critico oscilla a ω_d = ω_m√(1−ξ²), al critico (A₁ + A₂t)e^{−ω_m t}, oltre il critico due esponenziali.',
  daNonDire: [
    { frase: 'Le radici sono λ = ω_m(−ξ ± i√(ξ²−1)).', perche: 'È l\'errore della dispensa (NF-31): la i nasce da sola quando ξ < 1; con la i in più le radici sarebbero complesse proprio quando sono reali.', fonte: P211 },
    { frase: 'Nel caso critico x(t) = (A₁ + A₂)e^{−ω_m t}.', perche: 'Errore della dispensa (NF-32): con radice doppia serve il termine t e^{−ω_m t}, x = (A₁ + A₂t)e^{−ω_m t}.', fonte: P213 },
    { frase: 'Più smorzamento metto, più in fretta la massa torna all\'equilibrio.', perche: 'Vero solo fino al critico: oltre, la radice lenta ω_m/(ξ + √(ξ²−1)) cala e il ritorno rallenta.', fonte: { tipo: 'deduzione', da: 'p. 213', spiegazione: 'radice dominante del sovrasmorzato' } },
    { frase: 'Il sovrasmorzato si assesta sempre prima del sottosmorzato.', perche: 'La dispensa lo afferma (NF-244) ma non è generale: dipende da ξ e dal criterio di assestamento.', fonte: P213 },
    { frase: 'Lo smorzamento fa oscillare più veloce: ω_d > ω_m.', perche: 'ω_d = ω_m√(1−ξ²) < ω_m: lo smorzamento rallenta, anche se di poco.', fonte: P212 },
  ],
  approfondimenti: [
    { domanda: 'Perché nelle vibrazioni forzate trascuri l\'integrale generale?', tipo: 'collegamento', argomento: 'c7-forzate', attesa: 'Perché è la risposta libera smorzata: con ξ > 0 decade come e^{−ξω_m t} e dopo un breve transitorio resta solo la risposta particolare a regime.', fonte: { tipo: 'dispensa', pag: 214 } },
    { domanda: 'Come misuri lo smorzamento di una struttura?', tipo: 'approfondimento', attesa: 'La si perturba, si registra la risposta con un trasduttore, si legge il rapporto tra due ampiezze consecutive: δ = ln(x₁/x₂), poi ξ = δ/√(4π² + δ²) (≈ δ/2π per smorzamento piccolo).', fonte: P212 },
    { domanda: 'Perché il caso critico è il ritorno più rapido senza oscillazioni?', tipo: 'approfondimento', attesa: 'Sotto il critico il sistema oscilla; sopra, la radice dominante ω_m/(ξ + √(ξ²−1)) è minore di ω_m e il ritorno rallenta: il tasso massimo senza oscillare è ω_m, raggiunto a ξ = 1.', fonte: { tipo: 'deduzione', da: 'p. 213', spiegazione: 'confronto dei tassi di decadimento' } },
    { domanda: 'Dove va l\'energia?', tipo: 'collegamento', argomento: 'c7-libere', attesa: 'Lo smorzatore ha potenza −c ẋ² ≤ 0: sottrae energia meccanica a ogni ciclo, ed è per questo che l\'ampiezza cala.', fonte: { tipo: 'deduzione', da: 'pp. 208–209', spiegazione: 'teorema dell\'energia cinetica con W^{N.C.} = −cẋ²' } },
    { domanda: 'Quanto vale ξ per il grafico sottosmorzato della dispensa e cosa si vede?', tipo: 'approfondimento', attesa: 'ξ = 0,04: δ ≈ 0,25, ogni picco è circa il 78 % del precedente; ω_d ≈ ω_m.', fonte: { tipo: 'deduzione', da: 'p. 212', spiegazione: 'δ = 2π·0,04/√(1−0,0016) ≈ 0,252, e^{−δ} ≈ 0,78' } },
    { domanda: 'Cosa succede alle radici per ξ = 0?', tipo: 'collegamento', argomento: 'c7-libere', attesa: 'λ = ±iω_m: si ritrova il caso non smorzato, x = C cos(ω_m t + α) (la dispensa lo ricava come caso 1 a p. 212).', fonte: P212 },
  ],
  simboli: [
    { simbolo: '\\xi', significato: 'fattore di smorzamento c/c_r (grafia corsiva simile a ζ e φ)', altrove: 'ζ nelle domande' },
    { simbolo: 'c_r', significato: 'coefficiente di smorzamento critico 2mω_m', altrove: 'c_cr' },
    { simbolo: '\\omega_m,\\ \\omega_d', significato: 'pulsazione naturale e pulsazione smorzata', altrove: 'ω_n, ω_d' },
    { simbolo: 'T_d,\\ \\delta', significato: 'periodo smorzato e decremento logaritmico' },
    { simbolo: '\\lambda,\\ p(\\lambda)', significato: 'radici e polinomio caratteristico mλ² + cλ + K', altrove: 's in d115' },
    { simbolo: 'c', significato: 'costante dello smorzatore viscoso (c̃ a p. 208)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c7-libere', params: { xi: 0.1 } }],
  previsioni: [
    {
      id: 'c7-sm-oltre',
      domanda: 'Il sistema è già critico (ξ = 1). Porti ξ a 3. Il ritorno all\'equilibrio diventa…',
      opzioni: ['più rapido', 'uguale', 'più lento', 'oscillante'],
      corretta: 2,
      spiega: 'Comanda la radice lenta ω_m(ξ − √(ξ²−1)) = ω_m/(ξ + √(ξ²−1)): con ξ = 3 vale 0,17 ω_m contro ω_m del critico.',
      verify: () => {
        const lenta = Math.abs(radici(3, 1).re1);
        return lenta < 1 ? 2 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c7-libere', params: { xi: 1 } },
    },
    {
      id: 'c7-sm-delta',
      domanda: 'Con ξ = 0,1, dopo un periodo smorzato l\'ampiezza è circa…',
      opzioni: ['il 90 % di prima', 'il 53 % di prima', 'il 10 % di prima', 'zero'],
      corretta: 1,
      spiega: 'δ = 2π·0,1/√0,99 ≈ 0,63, quindi il rapporto è e^{−δ} ≈ 0,53.',
      verify: () => {
        const r = Math.exp(-decrementoLog(0.1));
        const opz = [0.9, 0.53, 0.1, 0];
        return opz.reduce((best, o, i) => (Math.abs(o - r) < Math.abs(opz[best] - r) ? i : best), 0);
      },
      visual: { kind: 'meccanismo', id: 'c7-libere', params: { xi: 0.1 } },
    },
  ],
  nf: ['NF-12', 'NF-31', 'NF-32', 'NF-244', 'NF-255'],
};
