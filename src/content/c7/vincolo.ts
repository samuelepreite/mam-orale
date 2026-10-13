/**
 * C7 · Oscillazione (eccitazione) di vincolo (domanda q49). Dispensa pp. 219–221.
 * Dimostrazioni d129 (equazione del moto, soluzione senza complex replacement, moto relativo) e d131 (fase iniziale).
 * Notazione della dispensa: base x_V = X_V sin ωt, massa x_G, moto relativo x_G^R (NF-12).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { faseVincolo, motoRelativo, trasmissibilita } from '../../engine/c7';
import { figVincolo } from './disegni';

const P219 = { tipo: 'dispensa', pag: 219 } as const;
const P221 = { tipo: 'dispensa', pag: 221 } as const;

function campione(rnd: () => number) {
  const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), xi = U(rnd, 0.05, 0.8), wm = Math.sqrt(K / m), c = 2 * xi * m * wm;
  let rho = U(rnd, 0.15, 3);
  if (Math.abs(rho - 1) < 0.05) rho += 0.1;
  const w = rho * wm, XV = U(rnd, 0.002, 0.02), t = U(rnd, 0, 1), th = w * t;
  const A = 1 / Math.sqrt((1 - rho * rho) ** 2 + 4 * xi * xi * rho * rho), phi = Math.atan2(2 * xi * rho, 1 - rho * rho);
  const pRe = K - m * w * w, pIm = c * w, modP = Math.hypot(pRe, pIm);
  const xV = XV * Math.sin(th), xdV = XV * w * Math.cos(th), xddV = -w * w * xV;
  const k1 = (c * w) / K;
  const xG = A * XV * (k1 * Math.cos(th - phi) + Math.sin(th - phi));
  const xdG = A * XV * w * (-k1 * Math.sin(th - phi) + Math.cos(th - phi));
  const xddG = -w * w * xG;
  return { m, K, xi, wm, c, rho, w, XV, t, th, A, phi, pRe, pIm, modP, xV, xdV, xddV, k1, xG, xdG, xddG };
}

// ------------------------------------------------------------------ d129
export const d129: Dimostrazione = {
  id: 'd129',
  titolo: 'Eccitazione di vincolo: equazione del moto',
  enunciato: 'Ricavare l\'equazione del moto di una massa collegata con molla e smorzatore a una base che si muove con legge assegnata x_V(t) = X_V sin ωt; risolverla per sovrapposizione e riscriverla nel moto relativo.',
  ipotesi: [
    'base con moto assegnato (vincolo mobile): resta un solo grado di libertà, x_G della massa su guida prismatica',
    'x_G letto nel riferimento solidale alla massa a riposo, x_V in quello della base: entrambi da zero a molla scarica',
    'molla e smorzatore lineari; moto orizzontale (in quiete la molla è a riposo)',
  ],
  sample: (rnd) => {
    const s = campione(rnd);
    const xs = U(rnd, -0.02, 0.02), xds = U(rnd, -0.2, 0.2), xst = U(rnd, -0.01, 0.01);
    const xdds = (-s.c * (xds - s.xdV) - s.K * (xs - s.xV)) / s.m;
    const xdds2 = (-s.c * (xds - s.xdV) - s.K * (xs - s.xV) - s.K * xst) / s.m;
    // risposta alla sola prima forzante c ẋ_V = cωX_V sin(ωt + π/2)
    const x1 = (s.A * s.c * s.w * s.XV) / s.K * Math.sin(s.th + Math.PI / 2 - s.phi);
    const xd1 = (s.A * s.c * s.w * s.XV) / s.K * s.w * Math.cos(s.th + Math.PI / 2 - s.phi);
    const xR = s.xG - s.xV, xdR = s.xdG - s.xdV, xddR = s.xddG - s.xddV;
    return { ...s, xs, xds, xst, xdds, xdds2, x1, xd1, xdd1: -s.w * s.w * x1, xR, xdR, xddR };
  },
  passi: [
    {
      id: 'd129.1',
      latex: 'F_{el} = -K\\big(x_G - x_V + x^{ST}_{AA\'}\\big), \\qquad F_c = -c\\,\\big(\\dot x_G - \\dot x_V\\big)',
      perche: 'Legge della molla e dello smorzatore tra due corpi (p. 208) con gli estremi $A$ sulla massa e $A\'$ sulla base: entrambi **sentono solo il moto relativo** massa–base. $x^{ST}_{AA\'}$ è l\'eventuale deformazione statica della molla.',
      fonte: P219,
      chiave: true,
      distrattori: [
        { latex: 'F_{el} = -K\\,x_G', errore: 'termine-perso', spiega: 'Così la base sarebbe ferma: la molla si allunga di x_G − x_V.' },
        { latex: 'F_{el} = -K\\,(x_G + x_V)', errore: 'segno', spiega: 'Se base e massa si spostano insieme della stessa quantità la molla non si deforma: conta la differenza.' },
      ],
    },
    {
      id: 'd129.2',
      latex: 'F_{in} + F_c + F_{el} = 0:\\ \\ -m\\ddot x_G - c\\dot x_G + c\\dot x_V - Kx_G + Kx_V - Kx^{ST}_{AA\'} = 0',
      perche: 'Il sistema avrebbe due gradi di libertà, ma la base ha moto assegnato: basta l\'equilibrio della massa, con le forze tutte positive nel riferimento.',
      fonte: P219,
      distrattori: [],
      num: (v) => [-v.m * v.xdds2 - v.c * v.xds + v.c * v.xdV - v.K * v.xs + v.K * v.xV - v.K * v.xst, 0],
    },
    {
      id: 'd129.3',
      latex: 'x^{ST}_{AA\'} = 0 \\;\\Rightarrow\\; m\\ddot x_G + c\\dot x_G + Kx_G = c\\dot x_V + Kx_V',
      perche: 'In quiete (base e massa ferme, moto orizzontale) la molla è a riposo: la deformazione statica è nulla. Il moto della base equivale a due forzanti, una viscosa e una elastica.',
      fonte: P219,
      chiave: true,
      distrattori: [
        { latex: 'm\\ddot x_G + c\\dot x_G + Kx_G = -c\\dot x_V - Kx_V', errore: 'segno', spiega: 'I termini della base passano a destra cambiando segno: −(−cẋ_V − Kx_V) = cẋ_V + Kx_V.', num: (v) => [v.m * v.xdds + v.c * v.xds + v.K * v.xs, -v.c * v.xdV - v.K * v.xV] },
        { latex: 'm\\ddot x_G + c\\dot x_G + Kx_G = Kx_V', errore: 'termine-perso', spiega: 'Anche lo smorzatore è attaccato alla base: la sua velocità entra nella forzante.', num: (v) => [v.m * v.xdds + v.c * v.xds + v.K * v.xs, v.K * v.xV] },
        { latex: 'm\\ddot x_G + c\\dot x_G + Kx_G = -m\\ddot x_V', errore: 'concetto', spiega: 'Questa è la forma del moto relativo, con x_G^R al posto di x_G (passo 8).', num: (v) => [v.m * v.xdds + v.c * v.xds + v.K * v.xs, -v.m * v.xddV] },
      ],
      num: (v) => [v.m * v.xdds + v.c * v.xds + v.K * v.xs, v.c * v.xdV + v.K * v.xV],
    },
    {
      id: 'd129.4',
      latex: 'x_V = X_V\\sin\\omega t:\\quad c\\dot x_V + Kx_V = c\\,\\omega X_V\\sin\\big(\\omega t + \\tfrac{\\pi}{2}\\big) + K X_V\\sin\\omega t',
      perche: 'La derivata del seno è un seno anticipato di $\\pi/2$: la forzante è la somma di due sinusoidi **in quadratura di fase**, di ampiezze $c\\omega X_V$ e $KX_V$. (A p. 219 la dispensa chiama $X_0$ per una riga l\'ampiezza della base.)',
      fonte: P219,
      distrattori: [],
      num: (v) => [v.c * v.xdV + v.K * v.xV, v.c * v.w * v.XV * Math.sin(v.th + Math.PI / 2) + v.K * v.XV * Math.sin(v.th)],
    },
    {
      id: 'd129.5',
      latex: 'F_0\\sin(\\omega t + \\alpha_F) \\to A\\,\\tfrac{F_0}{K}\\sin(\\omega t + \\alpha_F - \\varphi):\\quad x_G^{(1)} = A\\,\\dfrac{c\\omega X_V}{K}\\sin\\big(\\omega t + \\tfrac{\\pi}{2} - \\varphi\\big), \\quad x_G^{(2)} = A\\,X_V\\sin(\\omega t - \\varphi)',
      perche: 'Senza complex replacement: a ciascuna forzante $F_0\\sin(\\omega t + \\alpha_F)$ il sistema risponde con ampiezza $A\\,F_0/K$ e fase $\\alpha_x = \\alpha_F - \\varphi$, con $A(\\xi,\\rho)$ e $\\varphi(\\xi,\\rho)$ già noti. Prima forzante: $F_0 = c\\omega X_V$, $\\alpha_F = \\pi/2$; seconda: $F_0 = KX_V$, $\\alpha_F = 0$.',
      fonte: P219,
      chiave: true,
      distrattori: [
        { latex: 'x_G^{(1)} = A\\,\\dfrac{c\\omega X_V}{K}\\sin(\\omega t - \\varphi)', errore: 'termine-perso', spiega: 'La prima forzante è già anticipata di π/2: la sua fase α_F si somma al ritardo.', num: (v) => [v.x1, ((v.A * v.c * v.w * v.XV) / v.K) * Math.sin(v.th - v.phi)] },
        { latex: 'x_G^{(1)} = A\\,c\\,\\omega X_V\\sin\\big(\\omega t + \\tfrac{\\pi}{2} - \\varphi\\big)', errore: 'fattore', spiega: 'A moltiplica lo spostamento statico F₀/K, non la forza.', num: (v) => [v.x1, v.A * v.c * v.w * v.XV * Math.sin(v.th + Math.PI / 2 - v.phi)] },
      ],
      num: (v) => [v.m * v.xdd1 + v.c * v.xd1 + v.K * v.x1, v.c * v.w * v.XV * Math.sin(v.th + Math.PI / 2)],
    },
    {
      id: 'd129.6',
      latex: 'x_G = x_G^{(1)} + x_G^{(2)} = A\\,X_V\\Big(\\dfrac{c\\omega}{K}\\cos(\\omega t - \\varphi) + \\sin(\\omega t - \\varphi)\\Big)',
      perche: 'Sovrapposizione degli effetti (sistema lineare), con $\\sin(\\omega t + \\pi/2 - \\varphi) = \\cos(\\omega t - \\varphi)$. Si controlla che la somma risolva l\'equazione completa.',
      fonte: P219,
      distrattori: [],
      num: (v) => [v.m * v.xddG + v.c * v.xdG + v.K * v.xG, v.c * v.xdV + v.K * v.xV],
    },
    {
      id: 'd129.7',
      latex: '|x_G| = A\\,X_V\\sqrt{1 + \\Big(\\dfrac{c\\omega}{K}\\Big)^2} = A\\,X_V\\sqrt{1 + 4\\xi^2\\rho^2}',
      perche: 'Due armoniche in quadratura si compongono come i cateti: ampiezza $\\sqrt{a^2 + b^2}$. Con $c\\omega/K = 2\\xi\\rho$ è la trasmissibilità di spostamento di p. 220.',
      fonte: { tipo: 'dispensa', pag: [219, 220] },
      chiave: true,
      distrattori: [
        { latex: '|x_G| = A\\,X_V', errore: 'termine-perso', spiega: 'Si è considerata solo la forzante elastica Kx_V: anche lo smorzatore trascina la massa.', num: (v) => [v.A * v.XV * Math.hypot(1, v.k1), v.A * v.XV] },
        { latex: '|x_G| = A\\,X_V\\,(1 + 2\\xi\\rho)', errore: 'concetto', spiega: 'Le due componenti sono sfasate di 90°: non si sommano le ampiezze.', num: (v) => [v.A * v.XV * Math.hypot(1, v.k1), v.A * v.XV * (1 + 2 * v.xi * v.rho)] },
      ],
      num: (v) => [v.A * v.XV * Math.hypot(1, v.k1), v.A * v.XV * Math.sqrt(1 + 4 * v.xi ** 2 * v.rho ** 2)],
    },
    {
      id: 'd129.8',
      latex: 'x_G = x_G^R + x_V \\;\\Rightarrow\\; m\\ddot x_G^R + c\\dot x_G^R + Kx_G^R = -m\\ddot x_V = m\\,\\omega^2 X_V\\sin\\omega t',
      perche: 'Moto relativo massa–base: il moto di trascinamento è traslatorio, quindi niente termini centripeti o di Coriolis, $\\ddot x_G = \\ddot x_G^R + \\ddot x_V$. Sostituendo, $c\\dot x_V$ e $Kx_V$ si cancellano dai due membri e resta una forzata classica con forza $m\\omega^2X_V\\sin\\omega t$ (l\'inerzia di trascinamento).',
      fonte: P221,
      chiave: true,
      distrattori: [
        { latex: 'm\\ddot x_G^R + c\\dot x_G^R + Kx_G^R = m\\omega^2 X_V\\sin\\omega t + c\\dot x_V + Kx_V', errore: 'termine-perso', spiega: 'Riscrivendo molla e smorzatore con x_G^R i termini della base compaiono a sinistra e a destra: si cancellano.', num: (v) => [v.m * v.xddR + v.c * v.xdR + v.K * v.xR, v.m * v.w ** 2 * v.XV * Math.sin(v.th) + v.c * v.xdV + v.K * v.xV] },
        { latex: 'm\\ddot x_G^R + c\\dot x_G^R + Kx_G^R = -m\\omega^2 X_V\\sin\\omega t', errore: 'segno', spiega: 'ẍ_V = −ω²X_V sin ωt, quindi −mẍ_V = +mω²X_V sin ωt.', num: (v) => [v.m * v.xddR + v.c * v.xdR + v.K * v.xR, -v.m * v.w ** 2 * v.XV * Math.sin(v.th)] },
      ],
      num: (v) => [v.m * v.xddR + v.c * v.xdR + v.K * v.xR, v.m * v.w ** 2 * v.XV * Math.sin(v.th)],
    },
    {
      id: 'd129.9',
      latex: 'F_0 = m\\omega^2 X_V \\;\\Rightarrow\\; \\dfrac{F_0}{K} = \\rho^2 X_V \\;\\Rightarrow\\; \\dfrac{|x_G^R|}{X_V} = \\rho^2\\,A(\\xi, \\rho)',
      perche: 'Si applica il fattore di amplificazione alla forzata relativa: $m\\omega^2/K = \\rho^2$. Rispetto alla forza diretta c\'è il fattore $\\rho^2$: più alta è la frequenza, più grande l\'accelerazione della base e la risposta. Per $\\rho \\to \\infty$ il rapporto tende a 1: la massa resta ferma e la base le scorre sotto.',
      fonte: P221,
      distrattori: [],
      num: (v) => [(v.m * v.w ** 2 * v.XV) / v.modP, v.rho ** 2 * v.A * v.XV],
    },
  ],
  risultato: { latex: 'm\\ddot x_G + c\\dot x_G + Kx_G = c\\dot x_V + Kx_V; \\qquad m\\ddot x_G^R + c\\dot x_G^R + Kx_G^R = m\\omega^2 X_V\\sin\\omega t', fonte: { tipo: 'dispensa', pag: [219, 221] } },
  gancio: 'Molla e smorzatore sentono solo il moto relativo: la base diventa due forzanti in quadratura (cẋ_V + Kx_V), o una sola inerziale mω²X_V nel moto relativo.',
};

// ------------------------------------------------------------------ d131 fase
export const d131: Dimostrazione = {
  id: 'd131',
  titolo: 'Fase nell\'eccitazione di vincolo',
  enunciato: 'Ricavare la fase iniziale della risposta della massa rispetto al moto della base e mostrare che è sempre negativa (ritardo).',
  ipotesi: ['complex replacement: x̂_V = X_V e^{iωt}, forzante X_V(K + icω)e^{iωt} (p. 219)', 'ρ > 0, ξ > 0'],
  sample: (rnd) => {
    const s = campione(rnd);
    const alF = Math.atan(2 * s.xi * s.rho), ax = alF - s.phi;
    const d2 = s.modP ** 2;
    const re = (s.K * s.pRe + s.c * s.w * s.pIm) / d2, im = (s.c * s.w * s.pRe - s.K * s.pIm) / d2;
    const T = Math.sqrt(1 + 4 * s.xi ** 2 * s.rho ** 2) * s.A;
    return { ...s, alF, ax, re, im, T };
  },
  passi: [
    {
      id: 'd131.1',
      latex: '\\hat F = X_V\\,(K + ic\\omega)\\,e^{i\\omega t} \\;\\Rightarrow\\; \\alpha_F = \\operatorname{arctg}\\dfrac{X_V c\\omega}{X_V K} = \\operatorname{arctg}(2\\xi\\rho)',
      perche: 'La forzante equivalente (molla + smorzatore trascinati dalla base) è in anticipo sulla base di $\\alpha_F \\in (0, \\pi/2)$, perché la parte viscosa è in quadratura. $c\\omega/K = 2\\xi\\omega_m\\omega\\,m/K = 2\\xi\\rho$: a margine la dispensa dimentica la $\\omega$.',
      fonte: P221,
      correzione: { nf: 'NF-243', dispensaScrive: '2\\xi\\omega_m\\dfrac{m}{K} = 2\\xi\\rho' },
      distrattori: [],
      num: (v) => [Math.atan2(v.c * v.w, v.K), Math.atan(2 * v.xi * v.rho)],
    },
    {
      id: 'd131.2',
      latex: '\\varphi = \\arg p(i\\omega) = \\operatorname{arctg}\\dfrac{\\omega c}{K - \\omega^2 m} = \\operatorname{arctg}\\dfrac{2\\xi\\rho}{1 - \\rho^2} \\in [0, \\pi]',
      perche: 'Ritardo introdotto dalla rigidezza dinamica, come nella forzata (d126); per $\\rho > 1$ l\'argomento è negativo e si aggiunge $\\pi$.',
      fonte: P221,
      distrattori: [],
      num: (v) => [Math.atan2(v.pIm, v.pRe), Math.atan2(2 * v.xi * v.rho, 1 - v.rho ** 2)],
    },
    {
      id: 'd131.3',
      latex: '\\alpha_x = \\arg\\dfrac{K + ic\\omega}{p(i\\omega)} = \\alpha_F - \\varphi',
      perche: 'L\'argomento del quoziente è la differenza degli argomenti: fase della forzante meno ritardo del sistema. È la «fase iniziale della risposta» rispetto alla base.',
      fonte: P221,
      chiave: true,
      distrattori: [
        { latex: '\\alpha_x = \\varphi - \\alpha_F', errore: 'segno', spiega: 'Il sistema ritarda: φ si sottrae alla fase della forzante.', num: (v) => [Math.atan2(v.im, v.re), v.phi - v.alF] },
        { latex: '\\alpha_x = -\\varphi', errore: 'termine-perso', spiega: 'Vale per la forza diretta sulla massa; qui la forzante equivalente è già anticipata di α_F.', num: (v) => [Math.atan2(v.im, v.re), -v.phi] },
      ],
      num: (v) => [Math.atan2(v.im, v.re), v.alF - v.phi],
    },
    {
      id: 'd131.4',
      latex: '\\operatorname{tg}\\varphi - \\operatorname{tg}\\alpha_F = \\dfrac{2\\xi\\rho}{1 - \\rho^2} - 2\\xi\\rho = \\dfrac{2\\xi\\rho^3}{1 - \\rho^2}',
      perche: 'Per $\\rho < 1$ entrambi gli angoli stanno in $(0, \\pi/2)$ e la differenza delle tangenti è positiva: $\\varphi > \\alpha_F$. Per $\\rho \\ge 1$ si ha $\\varphi \\ge \\pi/2 > \\alpha_F$. Quindi $\\alpha_F < \\varphi$ per ogni $\\rho$ (p. 221).',
      fonte: { tipo: 'deduzione', da: 'p. 221', spiegazione: 'confronto delle tangenti, che la dispensa afferma senza conto («∀ρ α_F < φ»)' },
      chiave: true,
      distrattori: [
        { latex: '\\operatorname{tg}\\varphi - \\operatorname{tg}\\alpha_F = \\dfrac{2\\xi\\rho}{1 - \\rho^2}', errore: 'termine-perso', spiega: 'Si è dimenticato di sottrarre tg α_F = 2ξρ.', num: (v) => [(2 * v.xi * v.rho ** 3) / (1 - v.rho ** 2), (2 * v.xi * v.rho) / (1 - v.rho ** 2)] },
        { latex: '\\alpha_x > 0 \\ \\text{per } \\rho > 1', errore: 'concetto', spiega: 'Sopra la risonanza φ supera π/2 mentre α_F < π/2: il ritardo cresce, non diventa anticipo.' },
      ],
      num: (v) => [Math.tan(v.phi) - Math.tan(v.alF), (2 * v.xi * v.rho ** 3) / (1 - v.rho ** 2)],
    },
    {
      id: 'd131.5',
      latex: '\\alpha_x < 0 \\ \\ \\forall\\rho; \\qquad \\rho = 1:\\ \\alpha_x = \\operatorname{arctg}(2\\xi) - \\tfrac{\\pi}{2}; \\qquad \\rho \\to \\infty:\\ \\alpha_x \\to -\\tfrac{\\pi}{2}',
      perche: 'Il moto della massa è sempre in ritardo su quello della base. A bassa frequenza il ritardo è quasi nullo (la massa segue la base); ad alta frequenza tende a un quarto di periodo.',
      fonte: P221,
      distrattori: [],
      num: (v) => [Math.atan(2 * v.xi) - Math.atan2(2 * v.xi, 0), Math.atan(2 * v.xi) - Math.PI / 2],
    },
    {
      id: 'd131.6',
      latex: 'x_G(t) = T_R\\,X_V\\sin(\\omega t + \\alpha_x), \\qquad T_R = A\\sqrt{1 + 4\\xi^2\\rho^2}',
      perche: 'Risposta completa a regime: ampiezza dalla trasmissibilità, fase $\\alpha_x$. Coincide con la somma delle due risposte trovata senza complex replacement (d129).',
      fonte: { tipo: 'dispensa', pag: [219, 221] },
      distrattori: [],
      num: (v) => [v.A * v.XV * (v.k1 * Math.cos(v.th - v.phi) + Math.sin(v.th - v.phi)), v.T * v.XV * Math.sin(v.th + v.ax)],
    },
  ],
  risultato: { latex: '\\alpha_x = \\operatorname{arctg}(2\\xi\\rho) - \\operatorname{arctg}\\dfrac{2\\xi\\rho}{1 - \\rho^2} < 0 \\quad \\forall\\rho', fonte: P221 },
  gancio: 'Fase = fase della forzante (arctg 2ξρ) meno ritardo del sistema (φ): sempre negativa, la massa insegue la base.',
};

// ------------------------------------------------------------------ argomento
export const vincolo: ArgomentoContenuto = {
  id: 'c7-vincolo',
  cosaDireSubito:
    'Qui nessuna forza agisce sulla massa: è la base a cui sono attaccati molla e smorzatore a muoversi con legge assegnata x_V = X_V sin ωt. Molla e smorzatore sentono solo il moto relativo, quindi m ẍ_G + c ẋ_G + K x_G = c ẋ_V + K x_V: due forzanti in quadratura. La massa risponde con ampiezza A√(1+4ξ²ρ²)·X_V, sempre in ritardo sulla base; in coordinata relativa è una forzata con forza mω²X_V sin ωt.',
  sistemaIpotesi: [
    'Sistema: base mobile con moto assegnato x_V(t); massa m su guida prismatica collegata alla base da molla K e smorzatore c.',
    'Un solo grado di libertà (x_G): la base è un vincolo mobile.',
    'Moto orizzontale: in quiete la molla è a riposo (x^{ST}_{AA′} = 0).',
    'Moto di trascinamento traslatorio: nel moto relativo niente termini centripeti né di Coriolis.',
  ],
  disegno: {
    svg: figVincolo(),
    didascalia: 'Eccitazione di vincolo (p. 219): base mobile con i punti A′ e B′, molla tra A′ e A, smorzatore tra B′ e B, massa con baricentro G su guida.',
    fonte: { tipo: 'dispensa', pag: 219, fig: 'schema manoscritto' },
    elementi: [
      { id: 'base', testo: 'base mobile con asse x_V e legge x_V = X_V sin ωt', obbligatorio: true },
      { id: 'molla', testo: 'molla K tra A′ (base) e A (massa)', obbligatorio: true },
      { id: 'smorz', testo: 'smorzatore c tra B′ (base) e B (massa)', obbligatorio: true },
      { id: 'massa', testo: 'massa m con G e asse x_G, tra guide prismatiche', obbligatorio: true },
      { id: 'forze', testo: 'F_el e F_c ipotizzate positive verso +x', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'F_{in} + F_c + F_{el} = 0, \\qquad F_{el} = -K(x_G - x_V),\\ \\ F_c = -c(\\dot x_G - \\dot x_V)',
    spiegazione: 'Equilibrio della sola massa (la base ha moto assegnato); molla e smorzatore dipendono dal moto relativo.',
    fonte: P219,
  },
  dimostrazioni: ['d129', 'd131'],
  significato:
    'Muovere la base equivale a forzare la massa con la molla e con lo smorzatore: per questo la risposta dipende da due forzanti sfasate di 90° e l\'ampiezza ha il fattore √(1+4ξ²ρ²) in più rispetto alla forza diretta. A bassa frequenza la massa segue la base; in risonanza amplifica; ad alta frequenza resta quasi ferma, e il moto relativo diventa pari a quello della base.',
  fraseDaRicordare: 'La base forza la massa attraverso molla e smorzatore: m ẍ_G + c ẋ_G + K x_G = c ẋ_V + K x_V; nel relativo la forza è mω²X_V.',
  daNonDire: [
    { frase: 'La forza della molla è −K x_G.', perche: 'La base si muove: la molla si allunga di x_G − x_V (e lo smorzatore sente ẋ_G − ẋ_V).', fonte: P219 },
    { frase: 'L\'ampiezza della massa è A·X_V.', perche: 'Si è dimenticata la forzante viscosa cẋ_V: l\'ampiezza è A√(1+4ξ²ρ²)·X_V.', fonte: P219 },
    { frase: 'Sopra la risonanza la massa anticipa la base.', perche: 'α_x = arctg 2ξρ − φ < 0 per ogni ρ: è sempre in ritardo (p. 221).', fonte: P221 },
    { frase: 'Nel moto relativo devo aggiungere la forza di Coriolis.', perche: 'Il trascinamento è una traslazione: non ci sono termini centripeti né di Coriolis.', fonte: P221 },
    { frase: 'Il massimo del moto relativo è a ρ = √(1 − 2ξ²), come per A.', perche: 'ρ²A ha il massimo a ρ = 1/√(1 − 2ξ²), sopra 1 (NF-248).', fonte: { tipo: 'deduzione', da: 'p. 221', spiegazione: 'derivata di ρ²A(ξ,ρ)' } },
  ],
  approfondimenti: [
    { domanda: 'Quanto vale il rapporto tra l\'ampiezza della massa e quella della base?', tipo: 'collegamento', argomento: 'c7-trasmissibilita', attesa: 'La trasmissibilità di spostamento T_R = √(1+4ξ²ρ²)/√((1−ρ²)²+4ξ²ρ²): vale 1 a ρ = 0, ha il picco vicino alla risonanza, scende sotto 1 per ρ > √2.', fonte: { tipo: 'dispensa', pag: 220 } },
    { domanda: 'Come la risolvi con il complex replacement?', tipo: 'collegamento', argomento: 'c7-complex', attesa: 'x̂_V = X_V e^{iωt}: m x̂̈_G + c x̂̇_G + K x̂_G = X_V(K + icω)e^{iωt}, quindi X̂_G = X_V(K + icω)/p(iω): modulo T_R X_V, fase α_F − φ.', fonte: { tipo: 'dispensa', pag: [219, 220] } },
    { domanda: 'Che differenza c\'è con la forza applicata direttamente alla massa?', tipo: 'collegamento', argomento: 'c7-forzate', attesa: 'Stessa rigidezza dinamica p(iω) al denominatore; cambia il numeratore: (K + icω)X_V invece di F₀. Nel moto relativo cambia solo il fattore ρ² davanti ad A.', fonte: P221 },
    { domanda: 'Cosa succede al moto relativo ad alta frequenza, e a cosa serve?', tipo: 'approfondimento', attesa: 'ρ²A → 1: |x_G^R| → X_V, la massa resta ferma nello spazio e la base le scorre sotto. È il principio dei vibrometri (sismografi): una massa sospesa morbida misura lo spostamento della base.', fonte: { tipo: 'esterna', ref: 'trattazione classica degli strumenti sismici (vibrometro)', nota: 'il limite ρ²A → 1 è nella dispensa (grafico di p. 221); l\'applicazione allo strumento no' } },
    { domanda: 'Dove sta il massimo del moto relativo?', tipo: 'approfondimento', attesa: 'A ρ = 1/√(1−2ξ²) > 1, con lo stesso valore massimo 1/(2ξ√(1−ξ²)) del fattore di amplificazione; il grafico a mano della dispensa lo mette circa a 1.', fonte: { tipo: 'deduzione', da: 'p. 221', spiegazione: 'massimo di ρ²A(ξ,ρ), verificato con SymPy (NF-248)' } },
    { domanda: 'Perché la dispensa usa due sistemi di riferimento?', tipo: 'approfondimento', attesa: 'x_G è letto nel riferimento della massa a riposo e x_V in quello della base: così entrambi gli spostamenti coincidono con delle coordinate che partono da zero a molla scarica.', fonte: P219 },
  ],
  simboli: [
    { simbolo: 'x_V,\\ X_V', significato: 'spostamento e ampiezza della base (vincolo mobile)', altrove: 'y, Y nelle domande; X₀ per una riga a p. 219; Y₀ nel grafico di p. 220' },
    { simbolo: 'x_G', significato: 'spostamento assoluto della massa', altrove: 'x' },
    { simbolo: 'x_G^R', significato: 'spostamento relativo massa–base x_G − x_V', altrove: 'z' },
    { simbolo: '\\alpha_F,\\ \\alpha_x', significato: 'fase della forzante equivalente (arctg 2ξρ) e fase iniziale della risposta (α_F − φ)' },
    { simbolo: 'x^{ST}_{AA\'}', significato: 'deformazione statica della molla (nulla in orizzontale)' },
    { simbolo: '\\rho,\\ \\xi,\\ A', significato: 'come nelle vibrazioni forzate', altrove: 'r, ζ, M' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c7-vincolo' }],
  previsioni: [
    {
      id: 'c7-vi-bassa',
      domanda: 'ρ = 0,5 e ξ = 0,1: la massa vibra più o meno della base?',
      opzioni: ['di più', 'di meno', 'esattamente quanto la base'],
      corretta: 0,
      spiega: 'Sotto ρ = √2 la trasmissibilità supera 1 per qualunque ξ: T_R(0,5; 0,1) ≈ 1,34.',
      verify: () => {
        const T = trasmissibilita(0.5, 0.1);
        return T > 1 ? 0 : T < 1 ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c7-vincolo' },
    },
    {
      id: 'c7-vi-fase',
      domanda: 'Rispetto alla base, la massa è…',
      opzioni: ['in anticipo sopra la risonanza', 'sempre in ritardo', 'sempre in fase'],
      corretta: 1,
      spiega: 'α_x = arctg 2ξρ − φ < 0 per ogni ρ: φ supera sempre la fase della forzante equivalente.',
      verify: () => {
        for (const xi of [0.05, 0.2, 0.5, 0.9]) for (let r = 0.05; r < 6; r += 0.05) if (faseVincolo(r, xi) >= 0) return 0;
        return 1;
      },
      visual: { kind: 'meccanismo', id: 'c7-vincolo' },
    },
    {
      id: 'c7-vi-alta',
      domanda: 'A frequenza molto alta (ρ = 20), l\'ampiezza del moto relativo massa–base è circa…',
      opzioni: ['zero', 'X_V: la massa resta ferma e la base le scorre sotto', '20 volte X_V'],
      corretta: 1,
      spiega: 'ρ²A → 1: la massa non riesce a seguire, sta quasi ferma, e lo spostamento relativo è quello della base.',
      verify: () => (Math.abs(motoRelativo(20, 0.2) - 1) < 0.01 ? 1 : 0),
      visual: { kind: 'meccanismo', id: 'c7-vincolo' },
    },
  ],
  nf: ['NF-12', 'NF-243', 'NF-248', 'NF-252', 'NF-256'],
};
