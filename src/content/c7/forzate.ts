/**
 * C7 · Vibrazioni forzate: risposta a regime, fattore di amplificazione, risonanza, fase, FRF, quality factor (q04).
 * Dispensa pp. 214–218. Dimostrazioni d122, d124, d125, d126, d127, d128.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { amplificazione, fase, rhoPicco } from '../../engine/c7';
import { figForzate } from './disegni';

const P214 = { tipo: 'dispensa', pag: 214 } as const;
const P215 = { tipo: 'dispensa', pag: 215 } as const;
const P216 = { tipo: 'dispensa', pag: 216 } as const;
const P217 = { tipo: 'dispensa', pag: 217 } as const;
const P218 = { tipo: 'dispensa', pag: 218 } as const;

/** campione coerente: m, K, ξ indipendenti; c, ω_m, ρ, ω, ampiezza e fase derivati */
function base(rnd: () => number, xiMin = 0.05, xiMax = 0.8) {
  const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), xi = U(rnd, xiMin, xiMax), wm = Math.sqrt(K / m), c = 2 * xi * m * wm;
  let rho = U(rnd, 0.15, 3);
  if (Math.abs(rho - 1) < 0.04) rho += 0.08;
  const w = rho * wm, F0 = U(rnd, 10, 500), t = U(rnd, 0, 1);
  const pRe = K - m * w * w, pIm = c * w, modP = Math.hypot(pRe, pIm), X = F0 / modP, phi = Math.atan2(pIm, pRe);
  const Dn = (1 - rho * rho) ** 2 + 4 * xi * xi * rho * rho, A = 1 / Math.sqrt(Dn), xsta = F0 / K;
  return { m, K, xi, wm, c, rho, w, F0, t, pRe, pIm, modP, X, phi, Dn, A, xsta };
}

// ------------------------------------------------------------------ d122 risposta stazionaria
export const d122: Dimostrazione = {
  id: 'd122',
  titolo: 'Vibrazione forzata armonica: risposta stazionaria',
  enunciato: 'Scrivere l\'equazione del moto dell\'oscillatore smorzato forzato da F₀ sin ωt e ricavare ampiezza e ritardo di fase della risposta a regime.',
  ipotesi: ['sistema massa–molla–smorzatore lineare', 'forzante F₀ sin ωt applicata alla massa', 'ξ > 0: il transitorio si smorza e si studia il regime'],
  sample: (rnd) => {
    const b = base(rnd);
    const xs = U(rnd, -0.05, 0.05), xds = U(rnd, -0.5, 0.5), xdds = (b.F0 * Math.sin(b.w * b.t) - b.c * xds - b.K * xs) / b.m;
    return { ...b, xs, xds, xdds };
  },
  passi: [
    {
      id: 'd122.1',
      latex: 'F_{el} + F_c + F_{in} + F(t) = 0:\\ \\ -Kx - c\\dot x - m\\ddot x + F_0\\sin\\omega t = 0 \\;\\Rightarrow\\; m\\ddot x + c\\dot x + Kx = F_0\\sin\\omega t',
      perche: 'Equilibrio dinamico lungo $x$ con tutte le forze positive nel riferimento, come nel caso libero, più la forzante. La dispensa scrive $-\\bar F_{in}$ nella somma, incoerente con la sua stessa $F_{in} = -m\\ddot x$: la riga sotto, con $-m\\ddot x$, è quella giusta.',
      fonte: P214,
      correzione: { nf: 'NF-245', dispensaScrive: '\\bar F_{el} + \\bar F_c - \\bar F_{in} + \\bar{\\bar F}(t) = 0' },
      distrattori: [],
      num: (v) => [v.m * v.xdds + v.c * v.xds + v.K * v.xs, v.F0 * Math.sin(v.w * v.t)],
    },
    {
      id: 'd122.2',
      latex: 'x(t) = x_G(t) + x_p(t), \\qquad x_G(t) \\xrightarrow{\\ t\\to\\infty\\ } 0',
      perche: 'Equazione non omogenea: soluzione = integrale generale dell\'omogenea associata (le vibrazioni libere smorzate) + un integrale particolare. Con $\\xi > 0$ l\'integrale generale si smorza in pochi secondi: interessa ciò che accade dopo il transitorio, cioè $x_p$. (Qui $x_G$ è l\'integrale generale, non il baricentro.)',
      fonte: P214,
      distrattori: [],
    },
    {
      id: 'd122.3',
      latex: 'x_p = X_0\\sin(\\omega t - \\varphi):\\quad \\dot x_p = \\omega X_0\\cos(\\omega t - \\varphi), \\quad \\ddot x_p = -\\omega^2 X_0\\sin(\\omega t - \\varphi)',
      perche: 'Il sistema risponde con un\'oscillazione di pari pulsazione $\\omega$, ampiezza $X_0$ e in ritardo di $\\varphi$ (p. 214). Si derivano due volte.',
      fonte: P214,
      distrattori: [],
    },
    {
      id: 'd122.4',
      latex: '(K - m\\omega^2)\\,X_0\\sin(\\omega t - \\varphi) + c\\,\\omega X_0\\cos(\\omega t - \\varphi) = F_0\\sin\\omega t',
      perche: 'Si sostituisce nell\'equazione. Molla e inerzia sono in fase con lo spostamento (con segni opposti), lo smorzatore è in quadratura (coseno). Da qui la dispensa passa al complex replacement (d123); il metodo reale, chiesto da q04 e d122, va avanti per coefficienti.',
      fonte: { tipo: 'deduzione', da: 'p. 214', spiegazione: 'sostituzione delle derivate di p. 214 nell\'equazione di p. 214' },
      chiave: true,
      distrattori: [
        { latex: '(K + m\\omega^2)\\,X_0\\sin(\\omega t - \\varphi) + c\\,\\omega X_0\\cos(\\omega t - \\varphi) = F_0\\sin\\omega t', errore: 'segno', spiega: 'ẍ_p = −ω²x_p: l\'inerzia si sottrae alla molla.', num: (v) => [v.F0 * Math.sin(v.w * v.t), (v.K + v.m * v.w ** 2) * v.X * Math.sin(v.w * v.t - v.phi) + v.c * v.w * v.X * Math.cos(v.w * v.t - v.phi)] },
        { latex: '(K - m\\omega^2 + c\\,\\omega)\\,X_0\\sin(\\omega t - \\varphi) = F_0\\sin\\omega t', errore: 'concetto', spiega: 'La derivata del seno è il coseno: il termine dello smorzatore è sfasato di 90°, non si somma alla rigidezza.', num: (v) => [v.F0 * Math.sin(v.w * v.t), (v.K - v.m * v.w ** 2 + v.c * v.w) * v.X * Math.sin(v.w * v.t - v.phi)] },
      ],
      num: (v) => [(v.K - v.m * v.w ** 2) * v.X * Math.sin(v.w * v.t - v.phi) + v.c * v.w * v.X * Math.cos(v.w * v.t - v.phi), v.F0 * Math.sin(v.w * v.t)],
    },
    {
      id: 'd122.5',
      latex: '\\begin{cases} X_0\\big[(K - m\\omega^2)\\cos\\varphi + c\\omega\\sin\\varphi\\big] = F_0 & (\\sin\\omega t) \\\\ X_0\\big[-(K - m\\omega^2)\\sin\\varphi + c\\omega\\cos\\varphi\\big] = 0 & (\\cos\\omega t) \\end{cases}',
      perche: 'Si sviluppano $\\sin(\\omega t - \\varphi)$ e $\\cos(\\omega t - \\varphi)$ e si uguagliano i coefficienti di $\\sin\\omega t$ e di $\\cos\\omega t$ dei due membri (devono valere in ogni istante).',
      fonte: { tipo: 'deduzione', da: 'p. 214', spiegazione: 'principio di identità delle funzioni sin ωt e cos ωt' },
      chiave: true,
      distrattori: [
        { latex: 'X_0\\big[(K - m\\omega^2)\\sin\\varphi + c\\omega\\cos\\varphi\\big] = 0', errore: 'segno', spiega: 'sin(ωt − φ) = sin ωt cos φ − cos ωt sin φ: il termine della molla porta il meno.', num: (v) => [0, v.X * ((v.K - v.m * v.w ** 2) * Math.sin(v.phi) + v.c * v.w * Math.cos(v.phi))] },
        { latex: 'X_0\\,(K - m\\omega^2) = F_0', errore: 'termine-perso', spiega: 'Così si ignora lo smorzatore e la fase: vale solo per c = 0 e ρ < 1.', num: (v) => [v.F0, v.X * (v.K - v.m * v.w ** 2)] },
      ],
      num: (v) => [v.X * ((v.K - v.m * v.w ** 2) * Math.cos(v.phi) + v.c * v.w * Math.sin(v.phi)), v.F0],
    },
    {
      id: 'd122.6',
      latex: '\\operatorname{tg}\\varphi = \\dfrac{c\\,\\omega}{K - m\\omega^2}',
      perche: 'Dalla seconda equazione ($X_0 \\neq 0$). È lo **sfasamento tra forza e spostamento**: da prendere nel quadrante giusto, $\\varphi \\in [0, \\pi]$ perché $\\sin\\varphi$ e $c\\omega$ hanno lo stesso segno.',
      fonte: P215,
      distrattori: [],
      num: (v) => [(v.K - v.m * v.w ** 2) * Math.sin(v.phi), v.c * v.w * Math.cos(v.phi)],
    },
    {
      id: 'd122.7',
      latex: 'X_0 = \\dfrac{F_0}{\\sqrt{(K - m\\omega^2)^2 + (c\\,\\omega)^2}}',
      perche: 'Si quadrano e si sommano le due equazioni: $\\cos^2\\varphi + \\sin^2\\varphi = 1$ fa sparire la fase. Il denominatore è il modulo della rigidezza dinamica, «l\'opposizione del sistema a una forza armonica» (p. 215).',
      fonte: P215,
      chiave: true,
      distrattori: [
        { latex: 'X_0 = \\dfrac{F_0}{(K - m\\omega^2) + c\\,\\omega}', errore: 'concetto', spiega: 'I due contributi sono in quadratura: si sommano i quadrati, non i termini.', num: (v) => [v.X, v.F0 / (v.K - v.m * v.w ** 2 + v.c * v.w)] },
        { latex: 'X_0 = \\dfrac{F_0}{K}', errore: 'termine-perso', spiega: 'È lo spostamento statico: vale solo per ω → 0.', num: (v) => [v.X, v.F0 / v.K] },
      ],
      num: (v) => [v.X, v.F0 / Math.sqrt((v.K - v.m * v.w ** 2) ** 2 + (v.c * v.w) ** 2)],
    },
  ],
  risultato: { latex: 'x_p = X_0\\sin(\\omega t - \\varphi), \\quad X_0 = \\dfrac{F_0}{\\sqrt{(K - m\\omega^2)^2 + (c\\omega)^2}}, \\quad \\varphi = \\operatorname{arctg}\\dfrac{c\\omega}{K - m\\omega^2}', fonte: { tipo: 'dispensa', pag: [214, 215] } },
  gancio: 'Stessa ω della forza, ampiezza F₀/|p|, ritardo φ. Molla e inerzia si oppongono; lo smorzatore crea la quadratura.',
};

// ------------------------------------------------------------------ d124 fattore di amplificazione
export const d124: Dimostrazione = {
  id: 'd124',
  titolo: 'Fattore di amplificazione dinamica',
  enunciato: 'Ricavare il rapporto tra l\'ampiezza della risposta dinamica e lo spostamento statico in funzione di ξ e ρ.',
  ipotesi: ['X₀ = F₀/√((K − mω²)² + (cω)²) (d122)', 'ω_m² = K/m, ξ = c/(2mω_m), ρ = ω/ω_m'],
  sample: (rnd) => {
    const b = base(rnd, 0, 0.9);
    return { ...b, A0: 1 / Math.abs(1 - b.rho * b.rho) };
  },
  passi: [
    {
      id: 'd124.1',
      latex: '\\omega = 0:\\quad x^{STA} = \\dfrac{F_0}{K}',
      perche: 'Se $F_0$ agisse staticamente ($\\omega = 0$, quindi $\\rho = 0$) lo spostamento sarebbe quello statico della molla: è l\'unità di misura naturale dell\'ampiezza.',
      fonte: P215,
      distrattori: [],
      num: (v) => [v.K * v.xsta, v.F0],
    },
    {
      id: 'd124.2',
      latex: '\\dfrac{m\\,\\omega^2}{K} = \\dfrac{\\omega^2}{\\omega_m^2} = \\rho^2, \\qquad \\rho = \\dfrac{\\omega}{\\omega_m}',
      perche: 'Si divide numeratore e denominatore di $X_0$ per $K$. Con $K/m = \\omega_m^2$ il termine d\'inerzia diventa il quadrato del rapporto tra pulsazione della forzante e pulsazione naturale.',
      fonte: P215,
      distrattori: [],
      num: (v) => [(v.m * v.w ** 2) / v.K, v.rho ** 2],
    },
    {
      id: 'd124.3',
      latex: '\\dfrac{c\\,\\omega}{K} = \\dfrac{2\\xi\\omega_m m\\,\\omega}{K} = 2\\xi\\,\\dfrac{\\omega}{\\omega_m} = 2\\xi\\rho',
      perche: 'Con $c = 2\\xi m\\omega_m$ e $m/K = 1/\\omega_m^2$: il termine dello smorzatore diventa $2\\xi\\rho$ (annotazione a freccia di p. 215).',
      fonte: P215,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{c\\,\\omega}{K} = \\xi\\rho', errore: 'fattore', spiega: 'c = ξ c_r = 2ξmω_m: il 2 del coefficiente critico resta.', num: (v) => [(v.c * v.w) / v.K, v.xi * v.rho] },
        { latex: '\\dfrac{c\\,\\omega}{K} = 2\\xi\\rho^2', errore: 'indice', spiega: 'ω compare una volta sola (velocità): una sola potenza di ρ.', num: (v) => [(v.c * v.w) / v.K, 2 * v.xi * v.rho ** 2] },
      ],
      num: (v) => [(v.c * v.w) / v.K, 2 * v.xi * v.rho],
    },
    {
      id: 'd124.4',
      latex: 'X_0 = \\dfrac{F_0/K}{\\sqrt{\\big(1 - \\frac{m\\omega^2}{K}\\big)^2 + \\big(\\frac{c\\omega}{K}\\big)^2}} = \\dfrac{F_0/K}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}',
      perche: 'Si sostituiscono i due gruppi adimensionali.',
      fonte: P215,
      distrattori: [],
      num: (v) => [v.X, v.xsta / Math.sqrt((1 - v.rho ** 2) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)],
    },
    {
      id: 'd124.5',
      latex: 'A(\\xi, \\rho) = \\dfrac{X_0}{x^{STA}} = \\dfrac{1}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}',
      perche: 'Fattore di amplificazione: quante volte la risposta dinamica è più grande dello spostamento statico. Dipende da $\\xi$ (caratteristica del sistema) e da $\\rho$ (che dipende anche dalla forzante); il grafico si ottiene parametrando $\\xi$.',
      fonte: P215,
      chiave: true,
      distrattori: [
        { latex: 'A = \\dfrac{1}{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}', errore: 'termine-perso', spiega: 'Il denominatore è un modulo: serve la radice (la dispensa la perde a p. 217).', num: (v) => [v.A, 1 / v.Dn] },
        { latex: 'A = \\dfrac{1}{\\sqrt{(1 - \\rho)^2 + 4\\xi^2\\rho^2}}', errore: 'indice', spiega: 'Il termine d\'inerzia è ρ², non ρ (lettura incerta di p. 217).', num: (v) => [v.A, 1 / Math.sqrt((1 - v.rho) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)] },
        { latex: 'A = \\dfrac{1}{\\sqrt{(1 + \\rho^2)^2 + 4\\xi^2\\rho^2}}', errore: 'segno', spiega: 'Con 1 + ρ² il denominatore non si annullerebbe mai: niente risonanza.', num: (v) => [v.A, 1 / Math.sqrt((1 + v.rho ** 2) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)] },
      ],
      num: (v) => [v.X / v.xsta, 1 / Math.sqrt((1 - v.rho ** 2) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)],
    },
    {
      id: 'd124.6',
      latex: '\\xi = 0:\\ \\ A = \\dfrac{1}{|1 - \\rho^2|};\\quad \\rho = 0 \\Rightarrow A = 1;\\quad \\rho \\to 1 \\Rightarrow A \\to \\infty',
      perche: 'Senza smorzamento: a $\\rho = 0$ condizioni statiche; a $\\rho = 1$ ($\\omega = \\omega_m$) il denominatore si annulla, **risonanza**: la forzante ha la stessa frequenza del sistema e la risposta cresce senza limite (nel modello; nel transitorio cresce linearmente nel tempo).',
      fonte: P215,
      distrattori: [],
      num: (v) => [1 / Math.sqrt((1 - v.rho ** 2) ** 2), v.A0],
    },
    {
      id: 'd124.7',
      latex: '\\lim_{\\rho\\to\\infty} \\rho^2 A(\\xi, \\rho) = 1 \\;\\Rightarrow\\; A \\simeq \\dfrac{1}{\\rho^2} \\to 0',
      perche: 'Ad alta frequenza la massa non riesce a seguire la forza: domina l\'inerzia e l\'ampiezza tende a zero come $1/\\rho^2$ (le curve di p. 215 tendono a 0).',
      fonte: { tipo: 'deduzione', da: 'p. 215', spiegazione: 'limite di A(ξ,ρ) per ρ grande, coerente con il grafico' },
      aggiunto: true,
      distrattori: [],
    },
  ],
  risultato: { latex: 'A(\\xi, \\rho) = \\dfrac{X_0}{F_0/K} = \\dfrac{1}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}', fonte: P215 },
  gancio: 'È la risposta dinamica misurata in «spostamenti statici»: mω²/K = ρ², cω/K = 2ξρ.',
};

// ------------------------------------------------------------------ d125 picco di risonanza
export const d125: Dimostrazione = {
  id: 'd125',
  titolo: 'Frequenza del picco di risonanza smorzata',
  enunciato: 'Trovare il valore di ρ al quale il fattore di amplificazione è massimo e la condizione su ξ perché il picco esista.',
  ipotesi: ['A(ξ,ρ) = 1/√((1−ρ²)² + 4ξ²ρ²) (d124)', 'ξ > 0'],
  sample: (rnd) => {
    const xi = U(rnd, 0.03, 0.68), rho = U(rnd, 0.1, 2.5), Dn = (1 - rho * rho) ** 2 + 4 * xi * xi * rho * rho;
    const rR = Math.sqrt(1 - 2 * xi * xi), Dp = (r: number) => 4 * r * (r * r - 1 + 2 * xi * xi);
    return { xi, rho, Dn, A: 1 / Math.sqrt(Dn), rR, DpR: Dp(rR), Dpw: Dp(Math.sqrt(1 - xi * xi)), Dp1: Dp(1), AR: 1 / Math.sqrt((1 - rR * rR) ** 2 + 4 * xi * xi * rR * rR) };
  },
  passi: [
    {
      id: 'd125.1',
      latex: '\\dfrac{dA}{d\\rho} = 0 \\;\\Leftrightarrow\\; \\dfrac{d\\,A^{-2}}{d\\rho} = 0, \\qquad A^{-2} = (1 - \\rho^2)^2 + 4\\xi^2\\rho^2',
      perche: '$A$ è positiva: è massima dove $A^{-2}$, il radicando, è minimo. Conviene derivare il radicando invece della radice.',
      fonte: P216,
      distrattori: [],
      num: (v) => [1 / v.A ** 2, v.Dn],
    },
    {
      id: 'd125.2',
      latex: '\\dfrac{d\\,A^{-2}}{d\\rho} = 2(1 - \\rho^2)(-2\\rho) + 8\\xi^2\\rho = -4\\rho + 4\\rho^3 + 8\\xi^2\\rho',
      perche: 'Derivata del quadrato con la regola della catena: la derivata interna di $1 - \\rho^2$ è $-2\\rho$. Sviluppando, $-4\\rho(1 - \\rho^2) = -4\\rho + 4\\rho^3$: la dispensa scrive $4\\rho^2$, ma poi arriva al risultato giusto.',
      fonte: P216,
      chiave: true,
      correzione: { nf: 'NF-246', dispensaScrive: '-4\\rho(1 - \\rho^2) + 8\\rho\\xi^2 = 0 \\Rightarrow -4\\rho + 4\\rho^2 + 8\\rho\\xi^2 = 0' },
      distrattori: [
        { latex: '= -4\\rho + 4\\rho^2 + 8\\xi^2\\rho', errore: 'indice', spiega: 'È la riga della dispensa (NF-246): −4ρ·(−ρ²) = +4ρ³.', num: (v) => [-4 * v.rho + 4 * v.rho ** 3 + 8 * v.xi ** 2 * v.rho, -4 * v.rho + 4 * v.rho ** 2 + 8 * v.xi ** 2 * v.rho] },
        { latex: '= 2(1 - \\rho^2) + 8\\xi^2\\rho', errore: 'termine-perso', spiega: 'Manca la derivata interna −2ρ di (1 − ρ²).', num: (v) => [2 * (1 - v.rho ** 2) * (-2 * v.rho) + 8 * v.xi ** 2 * v.rho, 2 * (1 - v.rho ** 2) + 8 * v.xi ** 2 * v.rho] },
      ],
      num: (v) => [2 * (1 - v.rho ** 2) * (-2 * v.rho) + 8 * v.xi ** 2 * v.rho, -4 * v.rho + 4 * v.rho ** 3 + 8 * v.xi ** 2 * v.rho],
    },
    {
      id: 'd125.3',
      latex: '4\\rho\\,\\big(\\rho^2 - 1 + 2\\xi^2\\big) = 0 \\;\\Rightarrow\\; \\rho = 0 \\ \\ \\text{oppure}\\ \\ \\rho_R = \\sqrt{1 - 2\\xi^2}',
      perche: 'Si raccoglie $4\\rho$. $\\rho = 0$ è il punto di partenza ($A = 1$); l\'altra radice è il **massimo relativo**, la frequenza di risonanza smorzata, un po\' sotto $\\omega_m$.',
      fonte: P216,
      chiave: true,
      correzione: { nf: 'NF-246', dispensaScrive: '4\\rho(\\rho - 1 + 2\\xi^2) = 0' },
      distrattori: [
        { latex: '\\rho_R = \\sqrt{1 - \\xi^2}', errore: 'concetto', spiega: 'Questo è ω_d/ω_m, la pulsazione smorzata della risposta libera: il picco della forzata è più basso, √(1 − 2ξ²).', num: (v) => [v.DpR, v.Dpw] },
        { latex: '\\rho_R = 1', errore: 'concetto', spiega: 'In ρ = 1 la derivata vale 8ξ² ≠ 0: con smorzamento il picco non è esattamente a ω_m.', num: (v) => [v.DpR, v.Dp1] },
      ],
      num: (v) => [v.DpR, 0],
    },
    {
      id: 'd125.4',
      latex: 'A_{max} = A(\\xi, \\rho_R) = \\dfrac{1}{2\\xi\\sqrt{1 - \\xi^2}}',
      perche: 'Sostituendo $\\rho_R^2 = 1 - 2\\xi^2$: $(1 - \\rho_R^2)^2 + 4\\xi^2\\rho_R^2 = 4\\xi^4 + 4\\xi^2 - 8\\xi^4 = 4\\xi^2(1 - \\xi^2)$. Non è scritto nella dispensa ma torna con il suo grafico: circa 5 per $\\xi = 0{,}1$, 1,75 per $\\xi = 0{,}3$, 1,15 per $\\xi = 0{,}5$.',
      fonte: { tipo: 'deduzione', da: 'p. 216', spiegazione: 'A valutata in ρ_R; confronto con le curve di p. 215' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.AR, 1 / (2 * v.xi * Math.sqrt(1 - v.xi ** 2))],
    },
    {
      id: 'd125.5',
      latex: '\\rho_R \\in \\mathbb R \\;\\Leftrightarrow\\; 1 - 2\\xi^2 > 0 \\;\\Leftrightarrow\\; \\xi < \\sqrt{\\tfrac12} \\simeq 0{,}707',
      perche: 'Con smorzamento le oscillazioni non vanno all\'infinito, ma per $\\xi$ basso restano molto grandi. Per eliminare il picco si deve avere $1 - 2\\xi^2 < 0$: oltre $\\xi = \\sqrt{1/2}$ la radice non è reale e il massimo sparisce.',
      fonte: P216,
      chiave: true,
      distrattori: [
        { latex: '\\xi < 1', errore: 'concetto', spiega: 'ξ = 1 è il confine tra oscillazione libera e ritorno aperiodico, non tra risposta forzata con e senza picco.', num: () => [1 - 2 * Math.SQRT1_2 ** 2, 1 - 2 * 1 ** 2] },
        { latex: '\\xi < \\tfrac12', errore: 'fattore', spiega: '1 − 2ξ² = 0 dà ξ = 1/√2 ≈ 0,707, non 1/2.', num: () => [1 - 2 * Math.SQRT1_2 ** 2, 1 - 2 * 0.25] },
      ],
      num: () => [1 - 2 * Math.SQRT1_2 ** 2, 0],
    },
    {
      id: 'd125.6',
      latex: '\\xi > \\sqrt{\\tfrac12}:\\quad A(\\rho) \\ \\text{monotona decrescente},\\ \\ A \\le A(0) = 1',
      perche: 'Il picco scompare: nessuna risonanza pericolosa, la risposta è sempre moderata (curva $\\xi = 0{,}8$ del grafico).',
      fonte: P216,
      distrattori: [],
    },
  ],
  risultato: { latex: '\\rho_R = \\sqrt{1 - 2\\xi^2} \\ \\ (\\xi < \\sqrt{1/2}); \\qquad \\xi > \\sqrt{1/2} \\Rightarrow \\text{nessun picco}', fonte: P216 },
  gancio: 'Deriva il radicando: 4ρ(ρ² − 1 + 2ξ²) = 0. Con smorzamento il picco scende sotto ω_m e sparisce oltre ξ ≈ 0,7.',
};

// ------------------------------------------------------------------ d126 fase
export const d126: Dimostrazione = {
  id: 'd126',
  titolo: 'Fase della risposta armonica',
  enunciato: 'Ricavare il ritardo di fase tra forza e spostamento, scriverlo con ξ e ρ e discuterne l\'andamento.',
  ipotesi: ['X̂ = F̂₀/p(iω), p(iω) = K − mω² + icω (d123)', 'ritardo φ ≥ 0'],
  sample: (rnd) => base(rnd, 0.05, 0.9),
  passi: [
    {
      id: 'd126.1',
      latex: '\\hat X = \\dfrac{\\hat F_0}{p(i\\omega)} \\;\\Rightarrow\\; \\arg\\hat X - \\arg\\hat F_0 = -\\arg p(i\\omega) = -\\varphi \\;\\Rightarrow\\; x_p = X_0\\sin(\\omega t - \\varphi)',
      perche: 'L\'argomento di un quoziente è la differenza degli argomenti: la risposta è in **ritardo** sulla forza dell\'angolo della rigidezza dinamica. La dispensa scrive $X = |X|e^{+i\\varphi}$ (NF-34) ma intende il ritardo, come mostra $\\sin(\\omega t - \\varphi)$.',
      fonte: P215,
      chiave: true,
      correzione: { nf: 'NF-34', dispensaScrive: '\\hat X_G = |X_G|\\,e^{i\\varphi}' },
      distrattori: [
        { latex: '\\arg\\hat X - \\arg\\hat F_0 = +\\varphi', errore: 'segno', spiega: 'Dividere per p sottrae il suo argomento: la massa risponde dopo la forza, non prima.', num: (v) => [Math.atan2(-v.pIm, v.pRe), v.phi] },
        { latex: '\\varphi = \\operatorname{arctg}\\dfrac{K - m\\omega^2}{c\\,\\omega}', errore: 'indice', spiega: 'tg φ = parte immaginaria / parte reale di p: cω sopra, K − mω² sotto.', num: (v) => [v.phi, Math.atan2(v.pRe, v.pIm)] },
      ],
      num: (v) => [Math.atan2(-v.pIm, v.pRe), -v.phi],
    },
    {
      id: 'd126.2',
      latex: '\\varphi = \\operatorname{arctg}\\dfrac{c\\,\\omega}{K - m\\omega^2} = \\operatorname{arctg}\\dfrac{c\\omega/K}{1 - m\\omega^2/K} = \\operatorname{arctg}\\dfrac{2\\xi\\rho}{1 - \\rho^2}',
      perche: 'Si dividono numeratore e denominatore per $K$, con $c\\omega/K = 2\\xi\\rho$ e $m\\omega^2/K = \\rho^2$ (come per $A$).',
      fonte: P215,
      distrattori: [],
      num: (v) => [Math.atan2(v.c * v.w, v.K - v.m * v.w ** 2), Math.atan2(2 * v.xi * v.rho, 1 - v.rho ** 2)],
    },
    {
      id: 'd126.3',
      latex: '\\varphi \\in [0, \\pi]:\\quad \\varphi = \\operatorname{arctg}\\dfrac{2\\xi\\rho}{1 - \\rho^2} + \\pi \\ \\ \\text{se } \\rho > 1',
      perche: 'Il numeratore $2\\xi\\rho$ è sempre positivo; per $\\rho > 1$ il denominatore è negativo e l\'arcotangente principale darebbe un angolo negativo: si aggiunge $\\pi$ (la dispensa lo dice a p. 221; il grafico di p. 216 usa già il ramo giusto).',
      fonte: { tipo: 'dispensa', pag: [216, 221] },
      chiave: true,
      distrattori: [
        { latex: '\\varphi = \\operatorname{arctg}\\dfrac{2\\xi\\rho}{1 - \\rho^2} \\in \\big(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\big)', errore: 'convenzione', spiega: 'Con l\'arcotangente principale, sopra la risonanza il ritardo verrebbe negativo (anticipo): assurdo con il grafico che tende a π.', num: (v) => [v.phi, Math.atan((2 * v.xi * v.rho) / (1 - v.rho ** 2))] },
        { latex: '\\varphi = \\operatorname{arctg}\\dfrac{2\\xi\\rho}{1 - \\rho^2} - \\pi \\ \\ \\text{se } \\rho > 1', errore: 'segno', spiega: 'Il ritardo è tra 0 e π: si aggiunge π, non si toglie.', num: (v) => [v.phi, Math.atan((2 * v.xi * v.rho) / (1 - v.rho ** 2)) + (v.rho > 1 ? -Math.PI : 0)] },
      ],
      num: (v) => [Math.atan2(2 * v.xi * v.rho, 1 - v.rho ** 2), Math.atan((2 * v.xi * v.rho) / (1 - v.rho ** 2)) + (v.rho > 1 ? Math.PI : 0)],
    },
    {
      id: 'd126.4',
      latex: '\\rho = 1:\\quad \\varphi = \\operatorname{arctg}\\dfrac{2\\xi}{0^{+}} = \\dfrac{\\pi}{2} \\quad \\forall\\,\\xi',
      perche: 'In risonanza il denominatore si annulla: il ritardo è sempre un quarto di periodo, **indipendentemente da $\\xi$**. Tutte le curve del grafico di fase passano per $(1, \\pi/2)$.',
      fonte: P216,
      chiave: true,
      distrattori: [
        { latex: '\\varphi(1) = \\dfrac{\\pi}{4}', errore: 'concetto', spiega: 'arctg di un numero che tende all\'infinito: π/2, non π/4.', num: (v) => [Math.atan2(2 * v.xi, 0), Math.PI / 4] },
        { latex: '\\varphi(1) = \\operatorname{arctg}(2\\xi)', errore: 'termine-perso', spiega: 'Si è dimenticato il denominatore 1 − ρ² = 0: il rapporto diverge.', num: (v) => [Math.atan2(2 * v.xi, 0), Math.atan(2 * v.xi)] },
      ],
      num: (v) => [Math.atan2(2 * v.xi, 0), Math.PI / 2],
    },
    {
      id: 'd126.5',
      latex: '\\xi = 0:\\quad \\varphi = 0 \\ \\ (\\rho < 1), \\qquad \\varphi = \\pi \\ \\ (\\rho > 1)',
      perche: 'Senza smorzamento la fase ha solo due valori: sotto la risonanza la massa è in fase con la forza, sopra è in opposizione; a $\\rho = 1$ salta.',
      fonte: P216,
      distrattori: [],
      num: (v) => [Math.atan2(0, 1 - v.rho ** 2), v.rho < 1 ? 0 : Math.PI],
    },
    {
      id: 'd126.6',
      latex: '\\rho \\to 0:\\ \\varphi \\to 0\\ (\\text{molla}); \\quad \\rho = 1:\\ \\varphi = \\tfrac{\\pi}{2}\\ (\\text{smorzatore}); \\quad \\rho \\to \\infty:\\ \\varphi \\to \\pi\\ (\\text{massa})',
      perche: 'Con $\\xi > 0$ la fase cresce con continuità da 0 a $\\pi$. Lettura fisica: chi domina la rigidezza dinamica. Al crescere di $\\xi$ la transizione è meno ripida (sotto $\\rho = 1$ la curva sale, sopra scende: le frecce del grafico di p. 216).',
      fonte: P216,
      distrattori: [],
    },
  ],
  risultato: { latex: '\\varphi = \\operatorname{arctg}\\dfrac{2\\xi\\rho}{1 - \\rho^2} \\in [0, \\pi], \\qquad \\varphi(\\rho = 1) = \\dfrac{\\pi}{2}\\ \\ \\forall\\xi', fonte: { tipo: 'dispensa', pag: [215, 216] } },
  gancio: 'La fase racconta chi domina: molla (0), smorzatore (π/2, sempre a ρ = 1), massa (π).',
};

// ------------------------------------------------------------------ d127 FRF e complex gain
export const d127: Dimostrazione = {
  id: 'd127',
  titolo: 'FRF, receptance e complex gain',
  enunciato: 'Definire il complex gain e la funzione di risposta in frequenza come rapporto uscita/ingresso, con modulo e fase in forma adimensionale.',
  ipotesi: ['sistema lineare forzato armonicamente, a regime', 'z₀ = F₀/p(iω) (d123)'],
  sample: (rnd) => {
    const b = base(rnd, 0.05, 0.9);
    const pm = Math.hypot(b.K - b.m * b.wm ** 2, b.c * b.wm);
    return { ...b, G: b.X / b.F0, Gm: 1 / pm };
  },
  passi: [
    {
      id: 'd127.1',
      latex: 'G(i\\omega) = \\dfrac{z_0}{F_0} = \\dfrac{1}{p(i\\omega)} = \\dfrac{1}{K - m\\omega^2 + i\\,c\\,\\omega}',
      perche: '**Complex gain**: rapporto tra la risposta e l\'ingresso armonico. Indica quanto il sistema amplifica o attenua a una data frequenza e con quale sfasamento. A p. 217 la dispensa scrive per una riga $p(\\lambda) = 1/(\\dots)$: $p$ resta la rigidezza dinamica e $G$ è il suo reciproco.',
      fonte: P217,
      correzione: { nf: 'NF-243', dispensaScrive: 'p(\\lambda) = \\dfrac{1}{-m\\omega^2 + k + i\\omega c}' },
      distrattori: [],
      num: (v) => [v.G, 1 / Math.hypot(v.K - v.m * v.w ** 2, v.c * v.w)],
    },
    {
      id: 'd127.2',
      latex: '|G(i\\omega)| = \\dfrac{1}{\\sqrt{(K - \\omega^2 m)^2 + (\\omega c)^2}} = \\dfrac{1/K}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}',
      perche: '**Guadagno**: ampiezza della risposta per unità di forza. Si divide per $K$ come per il fattore di amplificazione. La dispensa perde la radice in un passaggio intermedio.',
      fonte: P217,
      chiave: true,
      correzione: { nf: 'NF-243', dispensaScrive: '\\dfrac{1/k}{(1 - \\rho^2)^2 + (\\omega\\,2\\xi\\omega_m\\frac{m}{k})^2}' },
      distrattori: [
        { latex: '|G| = \\dfrac{1/K}{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}', errore: 'termine-perso', spiega: 'È un modulo: radice della somma dei quadrati (riga intermedia della dispensa).', num: (v) => [v.G, 1 / v.K / v.Dn] },
        { latex: '|G| = \\dfrac{1}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}', errore: 'fattore', spiega: 'Questo è il guadagno adimensionale A; il guadagno ha le dimensioni di 1/K (m/N).', num: (v) => [v.G, v.A] },
      ],
      num: (v) => [v.G, 1 / v.K / Math.sqrt(v.Dn)],
    },
    {
      id: 'd127.3',
      latex: 'X_0 = F_0\\,|G(i\\omega)| \\;\\Rightarrow\\; K\\,|G(i\\omega)| = \\dfrac{X_0}{F_0/K} = A(\\xi, \\rho)',
      perche: 'Il guadagno in forma adimensionale è il fattore di amplificazione (p. 217): sono la stessa informazione.',
      fonte: P217,
      distrattori: [],
      num: (v) => [v.K * v.G, v.A],
    },
    {
      id: 'd127.4',
      latex: '\\arg G(i\\omega) = -\\varphi = -\\operatorname{arctg}\\dfrac{\\omega c}{K - \\omega^2 m}',
      perche: 'L\'argomento del reciproco è l\'opposto: la «fase associata al guadagno complesso» è $\\alpha = -\\varphi$ (p. 217), un ritardo. A p. 218 la dispensa scrive l\'argomento della FRF con il segno più: è il valore del ritardo, non l\'argomento (NF-34).',
      fonte: { tipo: 'dispensa', pag: [217, 218] },
      chiave: true,
      correzione: { nf: 'NF-34', dispensaScrive: '\\arg(FRF(i\\omega)) = \\operatorname{arctg}\\dfrac{\\omega c}{k - \\omega^2 m}' },
      distrattori: [
        { latex: '\\arg G(i\\omega) = +\\operatorname{arctg}\\dfrac{\\omega c}{K - \\omega^2 m}', errore: 'segno', spiega: 'È la scrittura di p. 218: l\'argomento di 1/p è −arg p.', num: (v) => [Math.atan2(-v.c * v.w, v.K - v.m * v.w ** 2), v.phi] },
        { latex: '\\arg G(i\\omega) = -\\operatorname{arctg}\\dfrac{K - \\omega^2 m}{\\omega c}', errore: 'indice', spiega: 'Parte immaginaria sopra, reale sotto.', num: (v) => [Math.atan2(-v.c * v.w, v.K - v.m * v.w ** 2), -Math.atan2(v.K - v.m * v.w ** 2, v.c * v.w)] },
      ],
      num: (v) => [Math.atan2(-v.c * v.w, v.K - v.m * v.w ** 2), -v.phi],
    },
    {
      id: 'd127.5',
      latex: 'FRF(i\\omega) = \\dfrac{\\text{OUTPUT}(i\\omega)}{\\text{INPUT}(i\\omega)}:\\quad \\dfrac{\\hat X}{\\hat F} = G, \\quad \\dfrac{\\hat V}{\\hat F} = i\\omega\\,G, \\quad \\dfrac{\\hat A}{\\hat F} = -\\omega^2 G',
      perche: 'La FRF dipende dall\'uscita che si osserva: spostamento, velocità o accelerazione per unità di forza (nei testi: recettanza, mobilità, inertanza; la dispensa non usa questi nomi). Il modulo della mobilità è $\\omega|G|$, quello dell\'inertanza $\\omega^2|G|$.',
      fonte: P218,
      distrattori: [],
      num: (v) => [v.w * v.G, v.w / Math.hypot(v.K - v.m * v.w ** 2, v.c * v.w)],
    },
    {
      id: 'd127.6',
      latex: '\\rho = 1:\\quad |G(i\\omega_m)| = \\dfrac{1}{c\\,\\omega_m} = \\dfrac{1}{2\\xi K}, \\quad \\arg G = -\\dfrac{\\pi}{2}',
      perche: 'In laboratorio (shaker con forza armonica nota, accelerometro sulla massa, trasformata di Fourier dei due segnali) si misura la FRF: la frequenza alla quale la fase vale $-\\pi/2$ è $\\omega_m$, e il modulo lì dà $\\xi$. Con la FRF misurata si sa come il sistema reagisce a qualunque frequenza, senza ricavarne per forza $m$, $c$, $K$.',
      fonte: { tipo: 'deduzione', da: 'p. 218', spiegazione: 'FRF di p. 218 valutata a ω = ω_m, dove K − mω_m² = 0' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Gm, 1 / (2 * v.xi * v.K)],
    },
  ],
  risultato: { latex: 'G(i\\omega) = \\dfrac{1}{K - m\\omega^2 + ic\\omega}, \\qquad |G| = \\dfrac{A(\\xi,\\rho)}{K}, \\qquad \\arg G = -\\varphi', fonte: { tipo: 'dispensa', pag: [217, 218] } },
  gancio: 'FRF = «quanto esce» per unità di ingresso a ogni frequenza: modulo = guadagno, argomento = ritardo (col meno).',
};

// ------------------------------------------------------------------ d128 quality factor
export const d128: Dimostrazione = {
  id: 'd128',
  titolo: 'Quality factor',
  enunciato: 'Collegare il quality factor Q = 1/(2ξ) della dispensa al fattore di amplificazione in risonanza e al picco, e darne il significato energetico.',
  ipotesi: ['A(ξ,ρ) (d124) e A_max (d125)', 'per il confronto: smorzamento piccolo, ξ ≪ 1'],
  sample: (rnd) => {
    const xi = U(rnd, 0.01, 0.3), wm = U(rnd, 5, 50), wd = wm * Math.sqrt(1 - xi * xi), Td = (2 * Math.PI) / wd;
    const delta = (2 * Math.PI * xi) / Math.sqrt(1 - xi * xi);
    return { xi, wm, Td, delta, A1: 1 / Math.sqrt(4 * xi * xi), Q: 1 / (2 * xi), Amax: 1 / (2 * xi * Math.sqrt(1 - xi * xi)) };
  },
  passi: [
    {
      id: 'd128.1',
      latex: 'A(\\xi, 1) = \\dfrac{1}{\\sqrt{0 + 4\\xi^2}} = \\dfrac{1}{2\\xi}',
      perche: 'In $\\rho = 1$ il termine $(1 - \\rho^2)^2$ si annulla: l\'amplificazione in risonanza dipende solo dallo smorzamento.',
      fonte: { tipo: 'deduzione', da: 'p. 215', spiegazione: 'A(ξ,ρ) di p. 215 valutata in ρ = 1' },
      distrattori: [],
      num: (v) => [v.A1, 1 / (2 * v.xi)],
    },
    {
      id: 'd128.2',
      latex: 'Q = \\dfrac{1}{2\\xi} = A(\\xi, 1)',
      perche: 'La dispensa riquadra $Q = 1/(2\\xi)$ senza ricavarlo: è il fattore di amplificazione alla pulsazione naturale. Indica quanto il sistema è risonante, cioè quanto bene accumula e restituisce energia in modo oscillatorio rispetto a quella che dissipa a ogni ciclo.',
      fonte: P217,
      chiave: true,
      distrattori: [
        { latex: 'Q = 2\\xi', errore: 'indice', spiega: 'Q cresce quando lo smorzamento cala: è l\'inverso, 1/(2ξ).', num: (v) => [v.Q, 2 * v.xi] },
        { latex: 'Q = \\dfrac{1}{\\delta}', errore: 'concetto', spiega: 'Il decremento logaritmico misura la caduta per ciclo: 1/δ ≈ 1/(2πξ), non 1/(2ξ).', num: (v) => [v.Q, 1 / v.delta] },
      ],
      num: (v) => [v.Q, v.A1],
    },
    {
      id: 'd128.3',
      latex: '\\dfrac{A_{max}}{Q} = \\dfrac{1}{\\sqrt{1 - \\xi^2}} \\simeq 1 + \\dfrac{\\xi^2}{2} \\quad (\\xi \\ll 1)',
      perche: 'Il picco vero (d125) è un po\' più alto e un po\' più a sinistra: $Q$ coincide con il picco solo per smorzamento piccolo (per $\\xi = 0{,}1$ la differenza è lo 0,5 %).',
      fonte: { tipo: 'deduzione', da: 'pp. 216–217', spiegazione: 'rapporto tra A_max = 1/(2ξ√(1−ξ²)) e Q = 1/(2ξ)' },
      chiave: true,
      distrattori: [
        { latex: 'A_{max} = Q \\ \\ \\text{esattamente}', errore: 'ipotesi', spiega: 'Vale solo per ξ ≪ 1: in generale A_max = Q/√(1−ξ²).', num: (v) => [v.Amax, v.Q] },
        { latex: 'Q = \\dfrac{1}{\\xi}', errore: 'fattore', spiega: 'A(1) = 1/√(4ξ²) = 1/(2ξ).', num: (v) => [v.Q, 1 / v.xi] },
      ],
      num: (v) => [v.Amax / v.Q, 1 / Math.sqrt(1 - v.xi ** 2)],
    },
    {
      id: 'd128.4',
      latex: '\\dfrac{\\Delta E}{E} = 1 - e^{-2\\delta} \\simeq 2\\delta \\simeq 4\\pi\\xi \\;\\Rightarrow\\; 2\\pi\\,\\dfrac{E}{\\Delta E} \\simeq \\dfrac{1}{2\\xi} = Q',
      perche: 'Lettura energetica: l\'energia va come il quadrato dell\'ampiezza, che a ogni ciclo si riduce di $e^{-\\delta}$; la frazione persa per ciclo è $1 - e^{-2\\delta}$. Per $\\xi$ piccolo $2\\pi$ volte energia immagazzinata su energia dissipata per ciclo dà proprio $Q$.',
      fonte: { tipo: 'esterna', ref: 'definizione energetica classica del fattore di qualità, Q = 2π E/ΔE per ciclo', nota: 'la dispensa dà solo la definizione a parole (p. 217); il conto usa il decremento logaritmico di p. 212' },
      distrattori: [],
      num: (v) => [1 - Math.exp(-v.xi * v.wm * v.Td) ** 2, 1 - Math.exp(-2 * v.delta)],
    },
    {
      id: 'd128.5',
      latex: 'Q \\gg 1:\\ \\text{poco smorzato, risonanza alta, oscillazioni persistenti}; \\quad Q \\ \\text{basso}:\\ \\text{molto smorzato}',
      perche: 'Un sistema con $Q$ elevato oscilla a lungo dopo una sollecitazione con poca dissipazione; uno con $Q$ basso dissipa subito l\'energia e smette rapidamente di oscillare (p. 217, dove il simbolo $Q$ nella seconda frase manca).',
      fonte: P217,
      distrattori: [],
    },
  ],
  risultato: { latex: 'Q = \\dfrac{1}{2\\xi} = A(\\xi, \\rho = 1) \\simeq A_{max} \\ \\ (\\xi \\ll 1)', fonte: P217 },
  gancio: 'Q = A in risonanza = 1/(2ξ): poco smorzamento, Q grande, risonanza pronunciata.',
};

// ------------------------------------------------------------------ argomento
export const forzate: ArgomentoContenuto = {
  id: 'c7-forzate',
  cosaDireSubito:
    'Applico alla massa una forza F₀ sin ωt: m ẍ + c ẋ + K x = F₀ sin ωt. Esaurito il transitorio, la massa oscilla alla pulsazione della forzante con ampiezza X₀ = F₀/√((K − mω²)² + (cω)²) e in ritardo di φ. Divido per lo spostamento statico F₀/K e ottengo il fattore di amplificazione A(ξ,ρ) = 1/√((1−ρ²)² + 4ξ²ρ²), che ha il picco di risonanza a ρ_R = √(1−2ξ²); il ritardo vale π/2 a ρ = 1 per ogni ξ.',
  sistemaIpotesi: [
    'Sistema massa–molla–smorzatore lineare a un grado di libertà.',
    'Forzante armonica F₀ sin ωt applicata alla massa (una componente di Fourier di una forzante periodica).',
    'ξ > 0: si studia la risposta a regime; il transitorio (vibrazione libera smorzata) si esaurisce.',
  ],
  disegno: {
    svg: figForzate(),
    didascalia: 'Oscillatore forzato (p. 214) e diagrammi di A(ξ,ρ) (p. 215) e della fase φ(ξ,ρ) (p. 216) per ξ = 0,1; 0,3; 0,5; 0,8 (tratteggio: ξ = 0).',
    fonte: { tipo: 'dispensa', pag: [214, 216], fig: 'figura incollata e grafici «Fattore di Amplificazione» e fase' },
    elementi: [
      { id: 'modello', testo: 'parete, K e c, massa m, forzante F₀ sin ωt verso +x', obbligatorio: true },
      { id: 'A', testo: 'grafico A–ρ: A = 1 in ρ = 0, picco vicino a ρ = 1 che cala con ξ, A → 0 per ρ grande', obbligatorio: true },
      { id: 'xi0', testo: 'curva ξ = 0 con asintoto verticale in ρ = 1', obbligatorio: true },
      { id: 'fase', testo: 'grafico φ–ρ da 0 a π, tutte le curve per (1, π/2)', obbligatorio: true },
      { id: 'picco', testo: 'picco a ρ_R = √(1−2ξ²) < 1; nessun picco per ξ > 0,7', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'm\\ddot x + c\\dot x + Kx = F_0\\sin\\omega t, \\qquad x = x_G + x_p,\\ \\ x_p = X_0\\sin(\\omega t - \\varphi)',
    spiegazione: 'Equilibrio dinamico con la forzante; la soluzione è il transitorio libero più la risposta a regime alla stessa pulsazione ω.',
    fonte: P214,
  },
  dimostrazioni: ['d122', 'd124', 'd125', 'd126', 'd127', 'd128'],
  significato:
    'Un sistema forzato risponde sempre alla frequenza della forza: la sua frequenza naturale decide solo quanto amplifica e quanto ritarda. Sotto la risonanza la molla governa e la massa segue la forza (A ≈ 1, in fase); in risonanza molla e inerzia si cancellano e solo lo smorzatore limita l\'ampiezza (A = 1/2ξ, ritardo π/2); sopra la risonanza domina l\'inerzia e la massa quasi non si muove (A → 1/ρ², in opposizione).',
  fraseDaRicordare: 'A = 1/√((1−ρ²)² + 4ξ²ρ²): picco a √(1−2ξ²), sparisce per ξ > 0,7; φ = π/2 a ρ = 1 per ogni ξ.',
  daNonDire: [
    { frase: 'In risonanza l\'ampiezza è infinita.', perche: 'Solo nel modello senza smorzamento; con ξ > 0 vale A = 1/(2ξ) in ρ = 1 (al massimo 1/(2ξ√(1−ξ²))).', fonte: P216 },
    { frase: 'Il picco di risonanza è esattamente a ω = ω_m.', perche: 'Con smorzamento è a ρ_R = √(1−2ξ²) < 1; a ρ = 1 la fase vale π/2.', fonte: P216 },
    { frase: 'Il picco sparisce quando lo smorzamento è critico, ξ > 1.', perche: 'Sparisce già per ξ > √½ ≈ 0,707: la soglia del critico riguarda le vibrazioni libere.', fonte: P216 },
    { frase: 'A regime la massa oscilla alla sua pulsazione naturale.', perche: 'Oscilla alla pulsazione della forzante ω; ω_m entra solo in ρ, quindi in ampiezza e fase.', fonte: P214 },
    { frase: 'La fase della FRF è +arctg(cω/(K−mω²)).', perche: 'Quello è il ritardo φ; l\'argomento di G = 1/p è −φ (NF-34).', fonte: P218 },
    { frase: 'Q = 1/(2ξ) è il valore massimo del fattore di amplificazione.', perche: 'È A in ρ = 1; il picco è Q/√(1−ξ²), coincidono solo per ξ ≪ 1 (NF-247).', fonte: { tipo: 'deduzione', da: 'pp. 216–217', spiegazione: 'confronto A(1) e A_max' } },
  ],
  approfondimenti: [
    { domanda: 'Come ricavi ampiezza e fase con il complex replacement?', tipo: 'collegamento', argomento: 'c7-complex', attesa: 'm z̈ + c ż + K z = F₀e^{iωt}, z = z₀e^{iωt}: (K − mω² + icω) z₀ = F₀, quindi ampiezza F₀/|p| e ritardo arg p; si prende la parte immaginaria.', fonte: P215 },
    { domanda: 'E se la forza nasce da una massa eccentrica che ruota?', tipo: 'collegamento', argomento: 'c7-eccentrica', attesa: 'La forzante è M_R ω² R cos ωt: l\'ampiezza della forza cresce con ω², e il rapporto adimensionale diventa ρ²A(ξ,ρ), che per ρ → ∞ tende a 1 (autocentramento).', fonte: { tipo: 'dispensa', pag: 223 } },
    { domanda: 'E se a muoversi è la base invece di una forza sulla massa?', tipo: 'collegamento', argomento: 'c7-vincolo', attesa: 'L\'equazione diventa m ẍ_G + c ẋ_G + K x_G = c ẋ_V + K x_V: due forzanti in quadratura, la risposta assoluta è A√(1+4ξ²ρ²) volte l\'ampiezza della base.', fonte: { tipo: 'dispensa', pag: 219 } },
    { domanda: 'Perché la dispensa parla della serie di Fourier?', tipo: 'approfondimento', attesa: 'Una forzante periodica qualsiasi si scompone in armoniche; il sistema è lineare, quindi si studia la risposta a ciascuna e si sommano gli effetti.', fonte: P214 },
    { domanda: 'Cos\'è il quality factor?', tipo: 'approfondimento', attesa: 'Q = 1/(2ξ) = A in ρ = 1: misura quanto il sistema è risonante. Q alto: poco smorzato, picco alto e stretto, oscillazioni persistenti.', fonte: P217 },
    { domanda: 'Come misureresti la FRF in laboratorio?', tipo: 'approfondimento', attesa: 'Shaker con forza armonica nota a frequenza variabile, accelerometro sulla massa, trasformata di Fourier dei due segnali e rapporto uscita/ingresso: il modulo è l\'ampiezza per unità di forza, la fase lo sfasamento.', fonte: P218 },
    { domanda: 'Quanto vale A con ξ = 0,1 a ρ = 3?', tipo: 'approfondimento', attesa: '1/√(64 + 0,36) ≈ 0,125: ad alta frequenza la massa si muove un ottavo dello spostamento statico.', fonte: { tipo: 'deduzione', da: 'p. 215', spiegazione: 'A(0,1; 3)' } },
  ],
  simboli: [
    { simbolo: '\\rho', significato: 'rapporto ω/ω_m tra pulsazione della forzante e pulsazione naturale', altrove: 'r' },
    { simbolo: 'A(\\xi,\\rho)', significato: 'fattore di amplificazione X₀/x^{STA}', altrove: 'M, X/x_st' },
    { simbolo: 'x^{STA}', significato: 'spostamento statico F₀/K', altrove: 'x_st' },
    { simbolo: '\\varphi\\ (= \\alpha_{DS})', significato: 'ritardo della risposta (argomento della rigidezza dinamica)', altrove: 'φ' },
    { simbolo: 'p(i\\omega),\\ G(i\\omega)', significato: 'rigidezza dinamica e complex gain 1/p', altrove: 'Z(ω), H(ω)' },
    { simbolo: 'X_0', significato: 'ampiezza della risposta a regime', altrove: 'X' },
    { simbolo: 'F_0\\sin\\omega t', significato: 'forzante della dispensa', altrove: 'F₀ cos ωt nelle domande (cambia solo la fase iniziale)' },
    { simbolo: 'Q', significato: 'quality factor 1/(2ξ)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c7-forzate' }],
  previsioni: [
    {
      id: 'c7-fz-picco',
      domanda: 'Con ξ = 0,8, dove sta il massimo del fattore di amplificazione?',
      opzioni: ['esattamente a ρ = 1', 'poco sotto ρ = 1', 'non c\'è picco: A cala da 1 in poi', 'a ρ = √2'],
      corretta: 2,
      spiega: '0,8 > √½ ≈ 0,707: 1 − 2ξ² < 0, la radice ρ_R non è reale e A è monotona decrescente.',
      verify: () => (rhoPicco(0.8) === null ? 2 : rhoPicco(0.8)! < 1 ? 1 : 0),
      visual: { kind: 'meccanismo', id: 'c7-forzate' },
    },
    {
      id: 'c7-fz-fase',
      domanda: 'A ρ = 1 confronti ξ = 0,05 e ξ = 0,5. Il ritardo di fase…',
      opzioni: ['è π/2 in tutti e due i casi', 'è più grande con ξ = 0,5', 'è più grande con ξ = 0,05'],
      corretta: 0,
      spiega: 'In ρ = 1 il denominatore 1 − ρ² si annulla: φ = π/2 indipendentemente da ξ.',
      verify: () => (Math.abs(fase(1, 0.05) - Math.PI / 2) < 1e-12 && Math.abs(fase(1, 0.5) - Math.PI / 2) < 1e-12 ? 0 : fase(1, 0.5) > fase(1, 0.05) ? 1 : 2),
      visual: { kind: 'meccanismo', id: 'c7-forzate' },
    },
    {
      id: 'c7-fz-alta',
      domanda: 'ξ = 0,1 e ρ = 3: l\'ampiezza della massa rispetto allo spostamento statico F₀/K è circa…',
      opzioni: ['1', '0,5', '0,125', '9'],
      corretta: 2,
      spiega: 'A = 1/√((1−9)² + 4·0,01·9) = 1/√64,36 ≈ 0,125: sopra la risonanza domina l\'inerzia, A ≈ 1/ρ².',
      verify: () => {
        const a = amplificazione(3, 0.1), opz = [1, 0.5, 0.125, 9];
        return opz.reduce((b, o, i) => (Math.abs(o - a) < Math.abs(opz[b] - a) ? i : b), 0);
      },
      visual: { kind: 'meccanismo', id: 'c7-forzate' },
    },
  ],
  nf: ['NF-12', 'NF-34', 'NF-243', 'NF-245', 'NF-246', 'NF-247', 'NF-252', 'NF-253', 'NF-254'],
};
