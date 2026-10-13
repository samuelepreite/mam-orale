/**
 * C7 · Trasmissibilità e isolamento (domanda q50). Dispensa pp. 219–222.
 * Dimostrazioni d130 (trasmissibilità di spostamento), d132 (trasmissibilità di forza), d133 (condizione di isolamento).
 * Errori della dispensa corretti: NF-33 (denominatore (1+ρ²)², zone e ruolo di ξ etichettati male).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { fmMaxIsolamento, trasmissibilita } from '../../engine/c7';
import { figTrasmissibilita } from './disegni';

const P220 = { tipo: 'dispensa', pag: 220 } as const;
const P221 = { tipo: 'dispensa', pag: 221 } as const;
const P222 = { tipo: 'dispensa', pag: 222 } as const;
const NF33_DEN = '\\dfrac{\\sqrt{1 + 4\\xi^2\\rho^2}}{\\sqrt{(1 + \\rho^2)^2 + 4\\xi^2\\rho^2}}';
const T = (r: number, x: number) => Math.sqrt(1 + 4 * x * x * r * r) / Math.sqrt((1 - r * r) ** 2 + 4 * x * x * r * r);

function campione(rnd: () => number) {
  const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), xi = U(rnd, 0.05, 0.9), wm = Math.sqrt(K / m), c = 2 * xi * m * wm;
  let rho = U(rnd, 0.15, 3);
  if (Math.abs(rho - 1) < 0.04) rho += 0.08;
  const w = rho * wm, pRe = K - m * w * w, pIm = c * w, modP = Math.hypot(pRe, pIm);
  return { m, K, xi, wm, c, rho, w, pRe, pIm, modP, T: T(rho, xi), A: 1 / Math.sqrt((1 - rho * rho) ** 2 + 4 * xi * xi * rho * rho) };
}

// ------------------------------------------------------------------ d130 trasmissibilità di spostamento
export const d130: Dimostrazione = {
  id: 'd130',
  titolo: 'Trasmissibilità di spostamento',
  enunciato: 'Per l\'eccitazione di vincolo x_V = X_V sin ωt, ricavare con il complex replacement il rapporto tra l\'ampiezza della massa e quella della base e discuterne l\'andamento.',
  ipotesi: ['m ẍ_G + c ẋ_G + K x_G = c ẋ_V + K x_V (d129)', 'regime armonico; complex replacement con parte immaginaria (forzante in seno)'],
  sample: (rnd) => {
    const s = campione(rnd), XV = U(rnd, 0.002, 0.02);
    const F0m = XV * Math.hypot(s.K, s.c * s.w), XG = F0m / s.modP;
    return { ...s, XV, F0m, XG, A0: 1 / Math.abs(1 - s.rho ** 2), T1: T(1, s.xi), Ts2: T(Math.SQRT2, s.xi), T2: T(2, s.xi) };
  },
  passi: [
    {
      id: 'd130.1',
      latex: '\\hat x_V = X_V e^{i\\omega t}:\\quad m\\ddot{\\hat x}_G + c\\dot{\\hat x}_G + K\\hat x_G = X_V\\,(K + i\\omega c)\\,e^{i\\omega t}',
      perche: 'Con $\\dot{\\hat x}_V = i\\omega X_Ve^{i\\omega t}$ la somma dei due contributi della base è un\'unica forzante complessa (p. 219), poi si risolve con l\'ansatz $\\hat x_G = \\hat X_G e^{i\\omega t}$.',
      fonte: { tipo: 'dispensa', pag: 219 },
      distrattori: [],
    },
    {
      id: 'd130.2',
      latex: '\\hat X_G = \\dfrac{\\hat F_0}{p(i\\omega)}, \\qquad \\hat F_0 = X_V\\,(K + i\\omega c), \\qquad p(i\\omega) = K - \\omega^2 m + i\\omega c',
      perche: 'Come nella forzata: ampiezza complessa = forzante complessa diviso rigidezza dinamica. Il fattore di amplificazione si ricava dal rapporto dei moduli.',
      fonte: P220,
      chiave: true,
      distrattori: [
        { latex: '\\hat F_0 = X_V\\,K', errore: 'termine-perso', spiega: 'Anche lo smorzatore trascina la massa: la forzante ha la parte viscosa iωcX_V.', num: (v) => [v.XG, (v.XV * v.K) / v.modP] },
        { latex: 'p(i\\omega) = K + \\omega^2 m + i\\omega c', errore: 'segno', spiega: 'La massa entra con −ω²m: senza il meno non ci sarebbe risonanza.', num: (v) => [v.XG, v.F0m / Math.hypot(v.K + v.m * v.w ** 2, v.c * v.w)] },
      ],
      num: (v) => [v.XG * v.modP, v.F0m],
    },
    {
      id: 'd130.3',
      latex: '|\\hat F_0| = \\sqrt{X_V^2(\\omega c)^2 + X_V^2K^2} = X_V\\sqrt{(c\\omega)^2 + K^2}, \\qquad |p(i\\omega)| = \\sqrt{(K - \\omega^2 m)^2 + (c\\omega)^2}',
      perche: 'Modulo di un numero complesso: radice della somma dei quadrati di parte reale e immaginaria.',
      fonte: P220,
      distrattori: [],
      num: (v) => [v.F0m, v.XV * Math.sqrt((v.c * v.w) ** 2 + v.K ** 2)],
    },
    {
      id: 'd130.4',
      latex: '\\dfrac{|\\hat x_G|}{X_V} = \\dfrac{\\sqrt{(c\\omega)^2 + K^2}}{\\sqrt{(K - \\omega^2 m)^2 + (c\\omega)^2}}',
      perche: 'Il modulo del quoziente è il quoziente dei moduli; $X_V$ si semplifica.',
      fonte: P220,
      distrattori: [],
      num: (v) => [v.XG / v.XV, Math.sqrt((v.c * v.w) ** 2 + v.K ** 2) / v.modP],
    },
    {
      id: 'd130.5',
      latex: 'T_R = \\dfrac{|\\hat x_G|}{X_V} = \\dfrac{\\sqrt{1 + 4\\xi^2\\rho^2}}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}',
      perche: 'Si divide tutto per $K$ (passaggi a margine di p. 220: $c\\omega/K = 2\\xi\\rho$, $\\omega^2m/K = \\rho^2$). **Trasmissibilità**: rapporto tra l\'ampiezza della risposta e l\'ampiezza del moto del vincolo; dice se il moto viene amplificato o attenuato. Alla riga dopo la dispensa scrive $(1 + \\rho^2)^2$: refuso.',
      fonte: P220,
      chiave: true,
      correzione: { nf: 'NF-33', dispensaScrive: `\\dfrac{|\\hat x_G|}{x_V} = ${NF33_DEN}` },
      distrattori: [
        { latex: `T_R = ${NF33_DEN}`, errore: 'segno', spiega: 'È il refuso della dispensa (NF-33): con 1 + ρ² il denominatore non si annulla mai e la risonanza sparisce.', num: (v) => [v.T, Math.sqrt(1 + 4 * v.xi ** 2 * v.rho ** 2) / Math.sqrt((1 + v.rho ** 2) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)] },
        { latex: 'T_R = A(\\xi,\\rho) = \\dfrac{1}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}', errore: 'termine-perso', spiega: 'Il numeratore √(1 + 4ξ²ρ²) viene dalla forzante viscosa: coincide con A solo per ξ = 0.', num: (v) => [v.T, v.A] },
        { latex: 'T_R = \\rho^2 A(\\xi, \\rho)', errore: 'concetto', spiega: 'Questo è il moto relativo massa–base, non quello assoluto della massa.', num: (v) => [v.T, v.rho ** 2 * v.A] },
      ],
      num: (v) => [v.XG / v.XV, Math.sqrt(1 + 4 * v.xi ** 2 * v.rho ** 2) / Math.sqrt((1 - v.rho ** 2) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)],
    },
    {
      id: 'd130.6',
      latex: '\\xi = 0:\\ T_R = \\dfrac{1}{|1 - \\rho^2|}; \\qquad \\rho = 0:\\ T_R = 1; \\qquad \\rho = 1:\\ T_R = \\dfrac{\\sqrt{1 + 4\\xi^2}}{2\\xi}',
      perche: 'Senza smorzamento $T_R$ coincide con $A$; a frequenza nulla la massa si sposta quanto il vincolo (condizioni statiche); in risonanza il picco è finito se $\\xi > 0$ (5,1 per $\\xi = 0{,}1$, come nel grafico di p. 220).',
      fonte: P220,
      distrattori: [],
      num: (v) => [v.T1, Math.sqrt(1 + 4 * v.xi ** 2) / (2 * v.xi)],
    },
    {
      id: 'd130.7',
      latex: '\\xi \\to \\infty:\\quad T_R \\to 1',
      perche: 'Uno smorzatore infinitamente rigido equivale a un\'asta rigida: la massa segue perfettamente il vincolo, non amplifica né isola (blocco rigido, testo battuto di p. 220).',
      fonte: P220,
      distrattori: [],
    },
    {
      id: 'd130.8',
      latex: 'T_R(\\sqrt2, \\xi) = \\dfrac{\\sqrt{1 + 8\\xi^2}}{\\sqrt{(1 - 2)^2 + 8\\xi^2}} = 1 \\quad \\forall\\xi',
      perche: 'A $\\rho = \\sqrt2$ numeratore e denominatore coincidono: **tutte le curve passano per il punto $(\\sqrt2, 1)$**, qualunque sia lo smorzamento (grafico stampato di p. 220).',
      fonte: P220,
      chiave: true,
      distrattori: [
        { latex: 'T_R(1, \\xi) = 1 \\quad \\forall\\xi', errore: 'concetto', spiega: 'ρ = 1 è la risonanza, dove T_R è massimo: le curve si incrociano a ρ = √2.', num: (v) => [v.Ts2, v.T1] },
        { latex: 'T_R(2, \\xi) = 1 \\quad \\forall\\xi', errore: 'fattore', spiega: 'Serve (1 − ρ²)² = 1, cioè ρ² = 2: ρ = √2, non 2.', num: (v) => [v.Ts2, v.T2] },
      ],
      num: (v) => [v.Ts2, 1],
    },
    {
      id: 'd130.9',
      latex: '0 < \\rho < \\sqrt2:\\ T_R > 1 \\ (\\text{amplificazione}); \\qquad \\rho > \\sqrt2:\\ T_R < 1 \\ (\\text{isolamento})',
      perche: 'Il manoscritto scrive il contrario per la prima zona («$\\rho < \\sqrt2 \\to T_R < 1$ = zona di isolamento») e, per $\\rho > \\sqrt2$, «più $\\xi$, minore l\'ampiezza»: entrambe sbagliate (NF-33). Il grafico e il testo battuto della stessa pagina sono giusti: lo smorzamento attenua il picco ma peggiora l\'isolamento. Dimostrazione in d133.',
      fonte: P220,
      correzione: { nf: 'NF-33', dispensaScrive: '\\rho < \\sqrt2 \\to T_R < 1 = \\text{ZONA DI ISOLAMENTO};\\ \\ \\rho > \\sqrt2:\\ \\xi\\uparrow \\Rightarrow \\text{ampiezza minore}' },
      distrattori: [],
    },
  ],
  risultato: { latex: 'T_R = \\dfrac{|x_G|}{X_V} = \\dfrac{\\sqrt{1 + 4\\xi^2\\rho^2}}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}', fonte: P220, correzione: { nf: 'NF-33', dispensaScrive: NF33_DEN } },
  gancio: 'Numeratore = collegamento base–massa (K + icω), denominatore = dinamica del sistema (p). Tutte le curve per (√2, 1).',
};

// ------------------------------------------------------------------ d132 trasmissibilità di forza
export const d132: Dimostrazione = {
  id: 'd132',
  titolo: 'Trasmissibilità di forza',
  enunciato: 'Per la massa forzata da F₀ sin ωt con la base ferma, ricavare il rapporto tra l\'ampiezza della forza trasmessa al muro e quella della forza applicata.',
  ipotesi: ['base (muro) ferma; forzante F₀ sin ωt sulla massa', 'regime: x_G = X₀ sin(ωt − φ) (d122)'],
  sample: (rnd) => {
    const s = campione(rnd), F0 = U(rnd, 10, 500), t = U(rnd, 0, 1), th = s.w * t;
    const X = F0 / s.modP, phi = Math.atan2(s.pIm, s.pRe), x = X * Math.sin(th - phi), xd = X * s.w * Math.cos(th - phi);
    const Fk = -s.K * x, Fc = -s.c * xd, FTm = X * Math.hypot(s.K, s.c * s.w), alF = Math.atan2(s.c * s.w, s.K);
    return { ...s, F0, t, th, X, phi, x, xd, Fk, Fc, FTm, alF };
  },
  passi: [
    {
      id: 'd132.1',
      latex: 'F_K = -K\\big(x_A - \\cancel{x_{A\'}}\\big) = -K\\,x_G, \\qquad F_c = -c\\big(\\dot x_A - \\cancel{\\dot x_{A\'}}\\big) = -c\\,\\dot x_G',
      perche: 'Il muro è fermo: gli estremi $A\'$ e $B\'$ non si muovono e (in orizzontale) la molla non ha deformazione statica.',
      fonte: P221,
      distrattori: [],
    },
    {
      id: 'd132.2',
      latex: 'F_T = -(F_K + F_c) = K\\,x_G + c\\,\\dot x_G',
      perche: 'Molla e smorzatore scaricano sul muro una forza uguale e opposta a quella che esercitano sulla massa (azione e reazione): è la forza trasmessa. Interessa per non rompere i supporti (duomi delle sospensioni, pressa vicino agli uffici).',
      fonte: P221,
      chiave: true,
      distrattori: [
        { latex: 'F_T = F_0\\sin\\omega t', errore: 'concetto', spiega: 'La forzante agisce sulla massa; al muro arriva solo ciò che passa per molla e smorzatore.', num: (v) => [v.K * v.x + v.c * v.xd, v.F0 * Math.sin(v.th)] },
        { latex: 'F_T = K\\,x_G', errore: 'termine-perso', spiega: 'Anche lo smorzatore è attaccato al muro: trasmette cẋ_G.', num: (v) => [v.K * v.x + v.c * v.xd, v.K * v.x] },
      ],
      num: (v) => [-(v.Fk + v.Fc), v.K * v.x + v.c * v.xd],
    },
    {
      id: 'd132.3',
      latex: 'F_T = X_0\\big[K\\sin(\\omega t - \\varphi) + c\\omega\\cos(\\omega t - \\varphi)\\big] = X_0\\sqrt{K^2 + (c\\omega)^2}\\,\\sin(\\omega t - \\varphi + \\alpha_F)',
      perche: 'Con la risposta a regime, molla e smorzatore danno due componenti in quadratura; in complesso è $F_T = \\hat X(K + i\\omega c)e^{i\\omega t}$, «come fatto precedentemente» (p. 221).',
      fonte: P221,
      distrattori: [],
      num: (v) => [v.K * v.x + v.c * v.xd, v.FTm * Math.sin(v.th - v.phi + v.alF)],
    },
    {
      id: 'd132.4',
      latex: '|F_T| = X_0\\sqrt{K^2 + (c\\omega)^2}, \\qquad X_0 = \\dfrac{F_0}{\\sqrt{(K - \\omega^2 m)^2 + (c\\omega)^2}}',
      perche: 'Ampiezza della forza trasmessa con l\'ampiezza della risposta della forzata (d122).',
      fonte: { tipo: 'dispensa', pag: [221, 222] },
      distrattori: [],
      num: (v) => [v.FTm, (v.F0 * Math.hypot(v.K, v.c * v.w)) / v.modP],
    },
    {
      id: 'd132.5',
      latex: 'T_R = \\dfrac{|F_T|}{F_0} = \\dfrac{\\sqrt{K^2 + (c\\omega)^2}}{\\sqrt{(K - \\omega^2 m)^2 + (c\\omega)^2}} = \\dfrac{\\sqrt{1 + 4\\xi^2\\rho^2}}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}',
      perche: 'Si divide l\'ampiezza della forza trasmessa per quella applicata e poi tutto per $K$. Stesso refuso della dispensa al denominatore ($(1 + \\rho^2)^2$, NF-33).',
      fonte: P222,
      chiave: true,
      correzione: { nf: 'NF-33', dispensaScrive: `T_R = \\dfrac{|F_i|}{F_0} = ${NF33_DEN}` },
      distrattori: [
        { latex: `T_R = ${NF33_DEN}`, errore: 'segno', spiega: 'Refuso della dispensa (NF-33): il termine d\'inerzia è 1 − ρ².', num: (v) => [v.FTm / v.F0, Math.sqrt(1 + 4 * v.xi ** 2 * v.rho ** 2) / Math.sqrt((1 + v.rho ** 2) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)] },
        { latex: 'T_R = \\dfrac{K}{\\sqrt{(K - \\omega^2 m)^2 + (c\\omega)^2}}', errore: 'termine-perso', spiega: 'Così si conta solo la molla: è il fattore di amplificazione A.', num: (v) => [v.FTm / v.F0, v.K / v.modP] },
      ],
      num: (v) => [v.FTm / v.F0, Math.sqrt(1 + 4 * v.xi ** 2 * v.rho ** 2) / Math.sqrt((1 - v.rho ** 2) ** 2 + 4 * v.xi ** 2 * v.rho ** 2)],
    },
    {
      id: 'd132.6',
      latex: 'T_R^{\\,forze}(\\xi, \\rho) = T_R^{\\,spost}(\\xi, \\rho)',
      perche: '«La trasmissibilità di forze è la stessa» funzione di quella di spostamento, ma con un altro significato fisico: forza al muro su forza applicata, invece di spostamento della massa su spostamento della base. Valgono le stesse zone e lo stesso punto $(\\sqrt2, 1)$.',
      fonte: P222,
      distrattori: [],
      num: (v) => [v.FTm / v.F0, Math.hypot(v.K, v.c * v.w) / v.modP],
    },
  ],
  risultato: { latex: 'T_R = \\dfrac{|F_T|}{F_0} = \\dfrac{\\sqrt{1 + 4\\xi^2\\rho^2}}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}', fonte: P222, correzione: { nf: 'NF-33', dispensaScrive: NF33_DEN } },
  gancio: 'Al muro arriva Kx + cẋ: stessa funzione della trasmissibilità di spostamento, significato diverso.',
};

// ------------------------------------------------------------------ d133 condizione di isolamento
export const d133: Dimostrazione = {
  id: 'd133',
  titolo: 'Condizione di isolamento vibrazionale',
  enunciato: 'Ricavare per quali ρ la trasmissibilità è minore di 1, l\'effetto dello smorzamento in quella zona e la regola di progetto della dispensa (pressa).',
  ipotesi: ['T_R = √(1+4ξ²ρ²)/√((1−ρ²)²+4ξ²ρ²) (d130, d132)', 'ρ > 0, ξ ≥ 0'],
  sample: (rnd) => {
    const xi = U(rnd, 0.02, 1), rho = U(rnd, 0.1, 3), N = 1 + 4 * xi * xi * rho * rho, Dn = (1 - rho * rho) ** 2 + 4 * xi * xi * rho * rho;
    const f = U(rnd, 0.5, 10), g = 9.81, fmMax = f / Math.SQRT2;
    return { xi, rho, N, Dn, T2: N / Dn, Ts2: T(Math.SQRT2, xi) ** 2, T1: T(1, xi) ** 2, f, g, fmMax };
  },
  passi: [
    {
      id: 'd133.1',
      latex: 'T_R < 1 \\;\\Leftrightarrow\\; T_R^2 < 1',
      perche: 'Isolamento: la massa vibra meno della base (o il muro riceve meno forza di quella applicata). $T_R$ è positivo, si può lavorare sul quadrato e togliere le radici.',
      fonte: P220,
      distrattori: [],
    },
    {
      id: 'd133.2',
      latex: 'T_R^2 - 1 = \\dfrac{1 + 4\\xi^2\\rho^2 - (1 - \\rho^2)^2 - 4\\xi^2\\rho^2}{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2} = \\dfrac{\\rho^2\\,(2 - \\rho^2)}{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}',
      perche: 'Al numeratore i termini di smorzamento si eliminano: resta $1 - (1 - \\rho^2)^2 = 2\\rho^2 - \\rho^4$. Il denominatore è positivo, quindi il segno di $T_R - 1$ dipende solo da $2 - \\rho^2$. La dispensa lo legge dal grafico; il conto è quello di q50.',
      fonte: { tipo: 'deduzione', da: 'pp. 220, 222', spiegazione: 'la dispensa afferma il punto comune (√2, 1) dal grafico; qui lo si dimostra' },
      chiave: true,
      distrattori: [
        { latex: 'T_R^2 - 1 = \\dfrac{\\rho^2(1 - \\rho^2)}{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}', errore: 'fattore', spiega: '1 − (1 − ρ²)² = 2ρ² − ρ⁴: il 2 viene dal doppio prodotto.', num: (v) => [v.T2 - 1, (v.rho ** 2 * (1 - v.rho ** 2)) / v.Dn] },
        { latex: 'T_R^2 - 1 = \\dfrac{4\\xi^2\\rho^2 - \\rho^4}{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}', errore: 'termine-perso', spiega: 'I termini 4ξ²ρ² sono uguali sopra e sotto e si cancellano; manca 2ρ².', num: (v) => [v.T2 - 1, (4 * v.xi ** 2 * v.rho ** 2 - v.rho ** 4) / v.Dn] },
      ],
      num: (v) => [v.T2 - 1, (v.rho ** 2 * (2 - v.rho ** 2)) / v.Dn],
    },
    {
      id: 'd133.3',
      latex: 'T_R < 1 \\;\\Leftrightarrow\\; \\rho > \\sqrt2 \\ \\ \\forall\\xi; \\qquad T_R(\\sqrt2) = 1; \\qquad 0 < \\rho < \\sqrt2 \\Rightarrow T_R > 1',
      perche: 'L\'isolamento comincia a $\\rho = \\sqrt2$ **per ogni smorzamento**: sotto c\'è sempre amplificazione. La dispensa (manoscritto di p. 220) chiama «zona di isolamento» la zona $\\rho < \\sqrt2$: è sbagliato (NF-33).',
      fonte: P220,
      chiave: true,
      correzione: { nf: 'NF-33', dispensaScrive: '\\rho < \\sqrt2 \\to T_R < 1 = \\text{ZONA DI ISOLAMENTO}' },
      distrattori: [
        { latex: 'T_R < 1 \\Leftrightarrow \\rho > 1', errore: 'concetto', spiega: 'ρ = 1 è la risonanza: lì T_R è al massimo, molto sopra 1.', num: (v) => [v.Ts2 - 1, v.T1 - 1] },
        { latex: '\\rho < \\sqrt2 \\Rightarrow T_R < 1 \\ (\\text{isolamento})', errore: 'convenzione', spiega: 'È la scritta del manoscritto (NF-33): sotto √2, T_R² − 1 = ρ²(2 − ρ²)/D > 0, si amplifica.' },
      ],
      num: (v) => [v.Ts2, 1],
    },
    {
      id: 'd133.4',
      latex: '\\dfrac{\\partial T_R^2}{\\partial(\\xi^2)} = \\dfrac{4\\rho^2\\big[(1 - \\rho^2)^2 - 1\\big]}{\\big[(1 - \\rho^2)^2 + 4\\xi^2\\rho^2\\big]^2} = \\dfrac{4\\rho^4\\,(\\rho^2 - 2)}{\\big[(1 - \\rho^2)^2 + 4\\xi^2\\rho^2\\big]^2}',
      perche: 'Derivata del quoziente rispetto a $\\xi^2$: per $\\rho > \\sqrt2$ è positiva, quindi **più smorzamento aumenta la trasmissibilità** e peggiora l\'isolamento; per $\\rho < \\sqrt2$ è negativa e lo smorzamento abbassa il picco. Il manoscritto dice il contrario per $\\rho > \\sqrt2$ (NF-33); il testo battuto della stessa pagina ha ragione (a $\\rho = 2$: 0,356 con $\\xi = 0{,}1$, 0,620 con $\\xi = 0{,}5$).',
      fonte: { tipo: 'deduzione', da: 'p. 220', spiegazione: 'derivata di T_R² rispetto a ξ²; conferma il testo battuto «peggiora le prestazioni in isolamento»' },
      chiave: true,
      correzione: { nf: 'NF-33', dispensaScrive: '\\rho > \\sqrt2:\\ \\text{più } \\xi\\uparrow,\\ \\text{minore sarà l\'ampiezza}' },
      distrattori: [
        { latex: '\\dfrac{\\partial T_R^2}{\\partial(\\xi^2)} = \\dfrac{4\\rho^4\\,(2 - \\rho^2)}{\\big[(1 - \\rho^2)^2 + 4\\xi^2\\rho^2\\big]^2}', errore: 'segno', spiega: 'Con questo segno lo smorzamento aiuterebbe l\'isolamento: è la lettura sbagliata del manoscritto.', num: (v) => [(4 * v.rho ** 2 * (v.Dn - v.N)) / v.Dn ** 2, (4 * v.rho ** 4 * (2 - v.rho ** 2)) / v.Dn ** 2] },
        { latex: '\\dfrac{\\partial T_R^2}{\\partial(\\xi^2)} = 0', errore: 'concetto', spiega: 'Lo smorzamento si elimina solo nella differenza T² − 1 al numeratore, non in T² stesso: conta eccome.', num: (v) => [(4 * v.rho ** 2 * (v.Dn - v.N)) / v.Dn ** 2, 0] },
      ],
      num: (v) => [(4 * v.rho ** 2 * (v.Dn - v.N)) / v.Dn ** 2, (4 * v.rho ** 4 * (v.rho ** 2 - 2)) / v.Dn ** 2],
    },
    {
      id: 'd133.5',
      latex: '\\rho = \\dfrac{\\omega}{\\omega_m} = \\dfrac{f}{f_m} > \\sqrt2 \\;\\Rightarrow\\; f_m < \\dfrac{f}{\\sqrt2}',
      perche: 'Regola di progetto della dispensa (pressa vicino agli uffici): per trasmettere al pavimento meno della forza della pressa si **abbassa la frequenza naturale** del supporto rispetto a quella della sorgente (sospensione morbida).',
      fonte: P222,
      chiave: true,
      distrattori: [
        { latex: 'f_m > \\sqrt2\\,f', errore: 'concetto', spiega: 'Un supporto più rigido della sorgente lavora a ρ < 1: niente isolamento, anzi amplificazione vicino alla risonanza.', num: (v) => [v.fmMax, Math.SQRT2 * v.f] },
        { latex: 'f_m < \\dfrac{f}{2}', errore: 'fattore', spiega: 'La soglia è ρ = √2, non 2 (con f/2 si è più conservativi, ma non è la condizione).', num: (v) => [v.fmMax, v.f / 2] },
      ],
      num: (v) => [v.f / v.fmMax, Math.SQRT2],
    },
    {
      id: 'd133.6',
      latex: 'x^{ST} = \\dfrac{g}{\\omega_m^2} > \\dfrac{2g}{\\omega^2}; \\qquad 120\\ \\text{colpi/min}:\\ f = 2\\ \\text{Hz} \\Rightarrow f_m < 1{,}41\\ \\text{Hz},\\ \\ x^{ST} > 12{,}4\\ \\text{cm}',
      perche: 'Il conto che la dispensa non svolge: con $\\omega_m^2 = g/x^{ST}$ (d112) la condizione diventa una freccia statica minima del supporto. Per la pressa, $\\omega = 4\\pi$ rad/s e $x^{ST} > 2\\cdot 9{,}81/(16\\pi^2) \\approx 0{,}124$ m. In zona di isolamento conviene poco smorzamento, ma un po\' serve per attraversare la risonanza all\'avviamento.',
      fonte: { tipo: 'deduzione', da: 'pp. 220, 222', spiegazione: 'condizione ρ > √2 con ω_m = √(g/x^{ST}) del riquadro di p. 220 e i dati della pressa di p. 222' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.g / (2 * Math.PI * v.fmMax) ** 2, (2 * v.g) / (2 * Math.PI * v.f) ** 2],
    },
  ],
  risultato: { latex: 'T_R < 1 \\;\\Leftrightarrow\\; \\rho > \\sqrt2 \\;\\Leftrightarrow\\; f_m < \\dfrac{f}{\\sqrt2}; \\qquad \\rho > \\sqrt2:\\ \\xi\\uparrow \\Rightarrow T_R\\uparrow', fonte: P222, correzione: { nf: 'NF-33', dispensaScrive: '\\rho<\\sqrt2 \\to \\text{isolamento};\\ \\rho>\\sqrt2:\\ \\xi\\uparrow \\Rightarrow \\text{ampiezza}\\downarrow' } },
  gancio: 'T² − 1 = ρ²(2 − ρ²)/D: lo smorzamento sparisce dal segno. Per isolare si sta sopra √2 volte la frequenza naturale, con poco smorzamento.',
};

// ------------------------------------------------------------------ argomento
export const trasmissibilitaArg: ArgomentoContenuto = {
  id: 'c7-trasmissibilita',
  cosaDireSubito:
    'La trasmissibilità dice quanto di una vibrazione passa attraverso la sospensione. In due problemi diversi esce la stessa funzione: spostamento della massa su spostamento della base, e forza trasmessa al muro su forza applicata. Vale T_R = √(1+4ξ²ρ²)/√((1−ρ²)²+4ξ²ρ²); tutte le curve passano per (√2, 1), quindi si isola solo per ρ > √2, cioè con una frequenza naturale del supporto minore di f/√2, e lì lo smorzamento peggiora l\'isolamento.',
  sistemaIpotesi: [
    'Sistema massa–molla–smorzatore lineare a un grado di libertà, a regime armonico.',
    'Spostamento: base con moto x_V = X_V sin ωt. Forza: base ferma, forzante F₀ sin ωt sulla massa.',
    'Forza trasmessa = forza di molla più smorzatore sul muro, F_T = Kx_G + cẋ_G.',
  ],
  disegno: {
    svg: figTrasmissibilita(),
    didascalia: 'Forza trasmessa al muro (p. 221) e curve di trasmissibilità (grafico stampato di p. 220): tutte per (√2, 1), isolamento a destra di √2.',
    fonte: { tipo: 'dispensa', pag: [220, 221], fig: 'schema manoscritto e grafico stampato da libro' },
    elementi: [
      { id: 'muro', testo: 'muro fisso con molla e smorzatore collegati alla massa', obbligatorio: true },
      { id: 'FT', testo: 'forze F_el e F_c trasmesse al muro (verso il muro)', obbligatorio: true },
      { id: 'curve', testo: 'curve T_R–ρ: T_R = 1 a ρ = 0, picco vicino a ρ = 1', obbligatorio: true },
      { id: 'radice2', testo: 'punto comune (√2, 1) e retta T_R = 1', obbligatorio: true },
      { id: 'zone', testo: 'zona di amplificazione (ρ < √2) e di isolamento (ρ > √2); a destra le curve con ξ maggiore stanno più in alto', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: 'T_R = \\dfrac{|x_G|}{X_V} = \\dfrac{|F_T|}{F_0} = \\dfrac{|K + i\\omega c|}{|K - \\omega^2 m + i\\omega c|}',
    spiegazione: 'Rapporto dei moduli: al numeratore il collegamento elastico-viscoso (K + iωc), al denominatore la rigidezza dinamica p(iω).',
    fonte: { tipo: 'dispensa', pag: [220, 222] },
  },
  dimostrazioni: ['d130', 'd132', 'd133'],
  significato:
    'Per isolare una macchina (o uno strumento) da una vibrazione bisogna che la sospensione sia morbida: frequenza naturale almeno √2 volte sotto quella di eccitazione. Sotto √2 la sospensione amplifica, e in risonanza in modo pericoloso. Lo smorzamento è un compromesso: abbassa il picco quando si attraversa la risonanza, ma nella zona di isolamento fa passare più forza attraverso lo smorzatore.',
  fraseDaRicordare: 'Tutte le curve per (√2, 1): si isola solo con ρ > √2, cioè f_m < f/√2, e lì meno smorzamento isola meglio.',
  daNonDire: [
    { frase: 'Il denominatore della trasmissibilità è (1 + ρ²)² + 4ξ²ρ².', perche: 'Refuso della dispensa (NF-33, pp. 220 e 222): è (1 − ρ²)², altrimenti non ci sarebbe risonanza.', fonte: P220 },
    { frase: 'Per ρ < √2 c\'è isolamento.', perche: 'Errore del manoscritto (NF-33): per 0 < ρ < √2 T_R > 1 per ogni ξ, si amplifica.', fonte: P220 },
    { frase: 'Nella zona di isolamento più smorzamento riduce la trasmissione.', perche: 'È il contrario (NF-33): per ρ > √2 la derivata di T² rispetto a ξ² è positiva; lo dice anche il testo battuto di p. 220.', fonte: P220 },
    { frase: 'La trasmissibilità coincide con il fattore di amplificazione.', perche: 'Solo per ξ = 0; in generale c\'è il fattore √(1 + 4ξ²ρ²) dello smorzatore.', fonte: P220 },
    { frase: 'Per isolare devo irrigidire il supporto.', perche: 'Va ammorbidito: la frequenza naturale deve scendere sotto f/√2 (p. 222).', fonte: P222 },
  ],
  approfondimenti: [
    { domanda: 'Da dove nasce la trasmissibilità di spostamento?', tipo: 'collegamento', argomento: 'c7-vincolo', attesa: 'Dall\'eccitazione di vincolo: m ẍ_G + c ẋ_G + K x_G = c ẋ_V + K x_V; con il complex replacement X̂_G = X_V(K + icω)/p(iω), e il rapporto dei moduli è T_R.', fonte: { tipo: 'dispensa', pag: [219, 220] } },
    { domanda: 'Pressa da 120 colpi al minuto: che sospensione serve?', tipo: 'approfondimento', attesa: 'f = 2 Hz, quindi f_m < 2/√2 ≈ 1,41 Hz; con ω_m² = g/x^{ST} serve una freccia statica di almeno circa 12 cm.', fonte: { tipo: 'deduzione', da: 'p. 222', spiegazione: 'f_m < f/√2 con f = 120/60 Hz' } },
    { domanda: 'Cosa succede se lo smorzamento tende all\'infinito?', tipo: 'approfondimento', attesa: 'T_R → 1: lo smorzatore diventa un\'asta rigida, la massa segue esattamente il vincolo, non amplifica né isola.', fonte: P220 },
    { domanda: 'Il picco della trasmissibilità è a ρ = 1?', tipo: 'approfondimento', attesa: 'Quasi: è a ρ = √(√(1+8ξ²) − 1)/(2ξ), poco sotto 1 (≈ 0,99 per ξ = 0,1); a ρ = 1 vale √(1+4ξ²)/(2ξ).', fonte: { tipo: 'deduzione', da: 'p. 220', spiegazione: 'derivata di T_R² rispetto a ρ² (NF-248)' } },
    { domanda: 'E per una macchina con una massa sbilanciata?', tipo: 'collegamento', argomento: 'c7-eccentrica', attesa: 'La forza eccitatrice è M_R ω² R cos ωt: la forza trasmessa al telaio è T_R·M_R ω² R, quindi anche qui si isola sopra ρ = √2, ma la forza cresce con ω².', fonte: { tipo: 'deduzione', da: 'pp. 222–223', spiegazione: 'trasmissibilità di forza con F₀ = M_R ω² R' } },
    { domanda: 'Perché lo smorzamento serve comunque?', tipo: 'approfondimento', attesa: 'All\'avviamento e all\'arresto la macchina attraversa la risonanza: senza smorzamento il picco sarebbe enorme. Lo smorzamento attenua il picco e riduce le vibrazioni trasmesse lì (testo battuto di p. 220).', fonte: P220 },
  ],
  simboli: [
    { simbolo: 'T_R', significato: 'trasmissibilità (di spostamento o di forza)', altrove: 'T_x, T_F in q50 e d130/d132' },
    { simbolo: 'x_V,\\ X_V', significato: 'spostamento e ampiezza della base', altrove: 'y, Y; Y₀ nel grafico di p. 220' },
    { simbolo: '|F_T|\\ (|F_i|)', significato: 'ampiezza della forza trasmessa al muro', altrove: 'F_T' },
    { simbolo: '\\rho = f/f_m', significato: 'rapporto tra frequenza di eccitazione e frequenza naturale', altrove: 'r = ω/ω_n' },
    { simbolo: 'f_m', significato: 'frequenza naturale del supporto', altrove: 'f_n' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c7-trasmissibilita' }],
  previsioni: [
    {
      id: 'c7-tr-pressa',
      domanda: 'Pressa a 120 colpi/min: la frequenza naturale del supporto deve essere al massimo circa…',
      opzioni: ['2,83 Hz', '2 Hz', '1,41 Hz', '1 Hz'],
      corretta: 2,
      spiega: 'f = 2 Hz e ρ > √2 ⇒ f_m < 2/√2 ≈ 1,41 Hz.',
      verify: () => {
        const v = fmMaxIsolamento(120 / 60), opz = [2.83, 2, 1.41, 1];
        return opz.reduce((b, o, i) => (Math.abs(o - v) < Math.abs(opz[b] - v) ? i : b), 0);
      },
      visual: { kind: 'meccanismo', id: 'c7-trasmissibilita' },
    },
    {
      id: 'c7-tr-smorz',
      domanda: 'Lavori a ρ = 2 (zona di isolamento). Passi da ξ = 0,1 a ξ = 0,5. La trasmissibilità…',
      opzioni: ['cala', 'resta uguale', 'cresce'],
      corretta: 2,
      spiega: 'T(2; 0,1) ≈ 0,36, T(2; 0,5) ≈ 0,62: sopra √2 lo smorzamento fa passare più forza (NF-33).',
      verify: () => {
        const a = trasmissibilita(2, 0.1), b = trasmissibilita(2, 0.5);
        return b > a ? 2 : b < a ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c7-trasmissibilita' },
    },
  ],
  nf: ['NF-12', 'NF-33', 'NF-248', 'NF-257'],
};
