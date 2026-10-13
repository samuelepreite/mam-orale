/**
 * C7 · Massa eccentrica rotante (domanda q07). Dispensa p. 223 (appunti battuti, manoscritto, nota a quadretti).
 * Dimostrazioni d134 (forza eccitatrice) e d135 (risposta e autocentramento). Notazione della dispensa:
 * M_S statore, M_R rotore, M = M_S + M_R, eccentricità R (E nella nota), x_O statore, x_GLO baricentro globale.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { eccentrica, eccentricaStato, fase } from '../../engine/c7';
import { figEccentrica } from './disegni';

const P223 = { tipo: 'dispensa', pag: 223 } as const;

// ------------------------------------------------------------------ d134 forza eccitatrice
export const d134: Dimostrazione = {
  id: 'd134',
  titolo: 'Massa eccentrica rotante: forza eccitatrice',
  enunciato: 'Ricavare l\'equazione del moto dello statore che porta un rotore con massa eccentrica, e la forza armonica che lo eccita.',
  ipotesi: [
    'statore di massa M_S su guida prismatica lungo x, con molla K e smorzatore c verso il telaio',
    'rotore schematizzato come punto P di massa M_R a distanza R dal centro O dello statore, con ω costante',
    'si misura x_O dalla configurazione di equilibrio statico (la deformazione statica si elide)',
  ],
  sample: (rnd) => {
    const MS = U(rnd, 5, 50), MR = U(rnd, 0.2, 5), R = U(rnd, 0.01, 0.1), K = U(rnd, 1000, 50000), c = U(rnd, 10, 500);
    const w = U(rnd, 5, 100), t = U(rnd, 0, 1), th = w * t, M = MS + MR;
    const xO = U(rnd, -0.01, 0.01), xdO = U(rnd, -0.2, 0.2), xddO = (-c * xdO - K * xO + MR * w * w * R * Math.cos(th)) / M;
    const yrel = R * Math.sin(th), xdP = xdO + (0 * 0 - w * yrel), xddP = xddO - w * w * R * Math.cos(th);
    return { MS, MR, R, K, c, w, t, th, M, xO, xdO, xddO, xdP, xddP };
  },
  passi: [
    {
      id: 'd134.1',
      latex: '\\vec V_P = \\vec V_O + \\vec\\omega \\wedge (P - O) \\;\\Rightarrow\\; \\begin{cases} x_P = x_O + R\\cos\\omega t \\\\ y_P = R\\sin\\omega t \\end{cases}',
      perche: 'Formula fondamentale della cinematica del rigido (rotore): la velocità di $P$ è quella di $O$ più la rotazione attorno a $O$. Con $\\omega$ costante l\'angolo è $\\omega t$ e si integra: lungo $x$, $\\dot x_P = \\dot x_O - \\omega R\\sin\\omega t$.',
      fonte: P223,
      distrattori: [],
      num: (v) => [v.xdP, v.xdO - v.w * v.R * Math.sin(v.th)],
    },
    {
      id: 'd134.2',
      latex: '\\ddot x_P = \\ddot x_O - \\omega^2 R\\cos\\omega t',
      perche: 'Si deriva ancora: l\'accelerazione del rotore è quella dello statore più l\'accelerazione centripeta, la cui componente $x$ è $-\\omega^2R\\cos\\omega t$.',
      fonte: P223,
      distrattori: [],
      num: (v) => [v.xddP, v.xddO - v.w ** 2 * v.R * Math.cos(v.th)],
    },
    {
      id: 'd134.3',
      latex: 'F_K = -K\\big(x_O + x^{ST}_{OO\'}\\big), \\quad F_C = -c\\,\\dot x_O, \\quad F_{inS} = -M_S\\,\\ddot x_O, \\quad F_{inR} = -M_R\\,\\ddot x_P',
      perche: 'Forze lungo $x$ sul sistema statore + rotore, tutte positive nel riferimento: molla e smorzatore verso il telaio fermo ($\\dot x_{O\'} = 0$), forza d\'inerzia dello statore e forza d\'inerzia del rotore, che ha la **sua** accelerazione $\\ddot x_P$.',
      fonte: P223,
      distrattori: [],
    },
    {
      id: 'd134.4',
      latex: 'F_K + F_C + F_{inS} + F_{inR} = 0:\\ \\ -Kx_O - c\\dot x_O - M_S\\ddot x_O - M_R\\big(\\ddot x_O - \\omega^2R\\cos\\omega t\\big) = 0',
      perche: 'Equilibrio lungo $x$; il termine statico $Kx^{ST}$ si elide perché si misura dall\'equilibrio statico.',
      fonte: P223,
      chiave: true,
      distrattori: [
        { latex: '\\dots - M_R\\big(\\ddot x_O + \\omega^2R\\cos\\omega t\\big) = 0', errore: 'segno', spiega: 'L\'accelerazione centripeta punta verso O: la sua componente x è −ω²R cos ωt.', num: (v) => [0, -v.K * v.xO - v.c * v.xdO - v.MS * v.xddO - v.MR * (v.xddO + v.w ** 2 * v.R * Math.cos(v.th))] },
        { latex: '\\dots - M_R\\,\\ddot x_O = 0', errore: 'termine-perso', spiega: 'Il rotore non trasla soltanto con lo statore: ruota, e la sua accelerazione ha la parte centripeta che genera la forzante.', num: (v) => [0, -v.K * v.xO - v.c * v.xdO - v.MS * v.xddO - v.MR * v.xddO] },
      ],
      num: (v) => [-v.K * v.xO - v.c * v.xdO - v.MS * v.xddO - v.MR * (v.xddO - v.w ** 2 * v.R * Math.cos(v.th)), 0],
    },
    {
      id: 'd134.5',
      latex: 'M\\,\\ddot x_O + c\\,\\dot x_O + K\\,x_O = M_R\\,\\omega^2 R\\cos\\omega t, \\qquad M = M_S + M_R',
      perche: 'Si raccolgono i termini in $\\ddot x_O$: in inerzia entra la **massa totale**, perché anche il rotore trasla con lo statore. Il termine noto è una forzante armonica di ampiezza $F_0 = M_R\\omega^2R$, che cresce con il quadrato della velocità.',
      fonte: P223,
      chiave: true,
      distrattori: [
        { latex: 'M_S\\,\\ddot x_O + c\\,\\dot x_O + K\\,x_O = M_R\\,\\omega^2 R\\cos\\omega t', errore: 'termine-perso', spiega: 'Il rotore si sposta con lo statore: la sua massa entra nell\'inerzia, M = M_S + M_R.', num: (v) => [v.MR * v.w ** 2 * v.R * Math.cos(v.th), v.MS * v.xddO + v.c * v.xdO + v.K * v.xO] },
        { latex: 'M\\,\\ddot x_O + c\\,\\dot x_O + K\\,x_O = M_R\\,\\omega R\\cos\\omega t', errore: 'fattore', spiega: 'L\'accelerazione centripeta è ω²R: la forza va con ω².', num: (v) => [v.M * v.xddO + v.c * v.xdO + v.K * v.xO, v.MR * v.w * v.R * Math.cos(v.th)] },
      ],
      num: (v) => [v.M * v.xddO + v.c * v.xdO + v.K * v.xO, v.MR * v.w ** 2 * v.R * Math.cos(v.th)],
    },
    {
      id: 'd134.6',
      latex: 'F_0 = M_R\\,\\omega^2 R = \\big|M_R\\,\\omega^2 R\\,(\\cos\\omega t,\\ \\sin\\omega t)\\big|',
      perche: 'È la forza centrifuga del rotore: la sua componente $x$ fa oscillare lo statore, quella $y$ è presa dalle guide. Si arriva allo stesso risultato «proiettando la centrifuga» (d134, q07).',
      fonte: { tipo: 'dispensa', pag: 223 },
      distrattori: [],
      num: (v) => [v.MR * v.w ** 2 * v.R, Math.hypot(v.MR * v.w ** 2 * v.R * Math.cos(v.th), v.MR * v.w ** 2 * v.R * Math.sin(v.th))],
    },
  ],
  risultato: { latex: 'M\\,\\ddot x_O + c\\,\\dot x_O + K\\,x_O = M_R\\,\\omega^2 R\\cos\\omega t, \\qquad F_0 = M_R\\,\\omega^2 R', fonte: P223 },
  gancio: 'x_P = x_O + R cos ωt: l\'inerzia del rotore dà la forzante M_R ω² R cos ωt; in inerzia la massa totale. Cresce con ω².',
};

// ------------------------------------------------------------------ d135 risposta e autocentramento
export const d135: Dimostrazione = {
  id: 'd135',
  titolo: 'Risposta a massa eccentrica rotante',
  enunciato: 'Ricavare l\'ampiezza adimensionale dello statore, il suo comportamento al crescere della velocità e mostrare l\'autocentramento del baricentro globale.',
  ipotesi: ['M ẍ_O + c ẋ_O + K x_O = M_R ω² R cos ωt (d134)', 'ω_m² = K/M e ξ = c/(2Mω_m) con M massa totale', 'regime armonico'],
  sample: (rnd) => {
    const M = U(rnd, 5, 50), mr = U(rnd, 0.02, 0.3), MR = mr * M, R = U(rnd, 0.01, 0.1), K = U(rnd, 1000, 50000), xi = U(rnd, 0.05, 0.68);
    const wm = Math.sqrt(K / M), c = 2 * xi * M * wm;
    let rho = U(rnd, 0.15, 4);
    if (Math.abs(rho - 1) < 0.04) rho += 0.08;
    const w = rho * wm, t = U(rnd, 0, 1), th = w * t;
    const pRe = K - M * w * w, pIm = c * w, modP = Math.hypot(pRe, pIm), XO = (MR * w * w * R) / modP, phi = Math.atan2(pIm, pRe);
    const x = XO * Math.cos(th - phi), xd = -XO * w * Math.sin(th - phi), xdd = -w * w * x;
    const A = 1 / Math.sqrt((1 - rho * rho) ** 2 + 4 * xi * xi * rho * rho);
    const rs = 1 / Math.sqrt(1 - 2 * xi * xi), As = rs * rs / Math.sqrt((1 - rs * rs) ** 2 + 4 * xi * xi * rs * rs);
    const xOg = U(rnd, -0.01, 0.01);
    return { M, mr, MR, MS: M - MR, R, K, xi, wm, c, rho, w, t, th, modP, XO, phi, x, xd, xdd, A, rs, As, xOg };
  },
  passi: [
    {
      id: 'd135.1',
      latex: 'x_O = |X_O|\\cos(\\omega t - \\varphi), \\qquad |X_O| = \\dfrac{M_R\\,\\omega^2 R}{\\sqrt{(K - M\\omega^2)^2 + (c\\omega)^2}}',
      perche: 'È una vibrazione forzata (stessa rigidezza dinamica, con la massa totale $M$) con forzante in coseno e ampiezza $F_0 = M_R\\omega^2 R$: la risposta è in ritardo di $\\varphi$.',
      fonte: P223,
      chiave: true,
      distrattori: [
        { latex: '|X_O| = \\dfrac{M_R\\,\\omega^2 R}{\\sqrt{(K - M_S\\omega^2)^2 + (c\\omega)^2}}', errore: 'termine-perso', spiega: 'Nella rigidezza dinamica entra la massa che trasla, cioè quella totale M.', num: (v) => [v.XO, (v.MR * v.w ** 2 * v.R) / Math.hypot(v.K - v.MS * v.w ** 2, v.c * v.w)] },
        { latex: '|X_O| = \\dfrac{M_R\\,\\omega R}{\\sqrt{(K - M\\omega^2)^2 + (c\\omega)^2}}', errore: 'fattore', spiega: 'La forzante è M_R ω² R.', num: (v) => [v.XO, (v.MR * v.w * v.R) / v.modP] },
      ],
      num: (v) => [v.M * v.xdd + v.c * v.xd + v.K * v.x, v.MR * v.w ** 2 * v.R * Math.cos(v.th)],
    },
    {
      id: 'd135.2',
      latex: '\\dfrac{F_0}{K} = \\dfrac{M_R R\\,\\omega^2}{K}\\cdot\\dfrac{M}{M} = \\dfrac{M_R R}{M}\\,\\rho^2, \\qquad \\omega_m^2 = \\dfrac{K}{M}',
      perche: 'Si moltiplica e divide per $M$ per far comparire $\\omega_m^2 = K/M$ e quindi $\\rho^2$: lo spostamento statico equivalente cresce con il quadrato della velocità.',
      fonte: P223,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{F_0}{K} = \\dfrac{M_R R}{M_S}\\,\\rho^2', errore: 'indice', spiega: 'ω_m² = K/M con la massa totale: è M che compare.', num: (v) => [(v.MR * v.R * v.w ** 2) / v.K, ((v.MR * v.R) / v.MS) * v.rho ** 2] },
        { latex: '\\dfrac{F_0}{K} = M_R R\\,\\rho^2', errore: 'termine-perso', spiega: 'Dimensionalmente non torna: serve il rapporto di masse M_R/M.', num: (v) => [(v.MR * v.R * v.w ** 2) / v.K, v.MR * v.R * v.rho ** 2] },
      ],
      num: (v) => [(v.MR * v.R * v.w ** 2) / v.K, ((v.MR * v.R) / v.M) * v.rho ** 2],
    },
    {
      id: 'd135.3',
      latex: '\\dfrac{|X_O|}{F_0/K} = A(\\xi,\\rho) \\;\\Rightarrow\\; \\dfrac{M\\,|X_O|}{M_R\\,R} = \\rho^2 A(\\xi,\\rho) = \\dfrac{\\rho^2}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}}',
      perche: 'Rapporto tra l\'ampiezza di oscillazione del sistema e l\'eccentricità che l\'ha causata, pesata con le masse. È la stessa funzione del moto relativo nell\'eccitazione di vincolo.',
      fonte: P223,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{|X_O|}{R} = \\rho^2 A(\\xi,\\rho)', errore: 'fattore', spiega: 'Manca il rapporto di masse: il gruppo adimensionale è M|X_O|/(M_R R) (d135 e q07 lo scrivono in modo ambiguo).', num: (v) => [(v.M * v.XO) / (v.MR * v.R), v.XO / v.R] },
        { latex: '\\dfrac{M\\,|X_O|}{M_R\\,R} = A(\\xi,\\rho)', errore: 'termine-perso', spiega: 'La forzante cresce con ω²: il fattore ρ² resta.', num: (v) => [(v.M * v.XO) / (v.MR * v.R), v.A] },
      ],
      num: (v) => [(v.M * v.XO) / (v.MR * v.R), v.rho ** 2 * v.A],
    },
    {
      id: 'd135.4',
      latex: '\\rho \\to 0:\\ 0; \\qquad \\rho = 1:\\ \\dfrac{1}{2\\xi}; \\qquad \\rho \\to \\infty:\\ \\dfrac{M|X_O|}{M_R R} \\to 1,\\ \\ \\varphi \\to \\pi',
      perche: 'A bassa velocità la forza centrifuga è piccola; in risonanza l\'ampiezza è limitata solo dallo smorzamento; ad alta velocità tutte le curve tendono a 1 qualunque sia $\\xi$, con lo statore in opposizione di fase.',
      fonte: P223,
      distrattori: [],
      num: (v) => [1 / Math.sqrt(4 * v.xi ** 2), 1 / (2 * v.xi)],
    },
    {
      id: 'd135.5',
      latex: '\\rho^* = \\dfrac{1}{\\sqrt{1 - 2\\xi^2}} > 1:\\quad \\rho^{*2}A(\\xi,\\rho^*) = \\dfrac{1}{2\\xi\\sqrt{1 - \\xi^2}}',
      perche: 'Il massimo di $\\rho^2A$ è sopra la pulsazione naturale (al contrario di $A$), ma ha lo stesso valore del picco di $A$. La dispensa non lo ricava (NF-248).',
      fonte: { tipo: 'deduzione', da: 'p. 223', spiegazione: 'derivata di ρ²A(ξ,ρ) rispetto a ρ, verificata con SymPy' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.As, 1 / (2 * v.xi * Math.sqrt(1 - v.xi ** 2))],
    },
    {
      id: 'd135.6',
      latex: '\\rho \\to \\infty:\\quad x_O = \\dfrac{M_R R}{M}\\cos(\\omega t - \\pi) = -\\dfrac{M_R R}{M}\\cos\\omega t',
      perche: 'Con ampiezza $M_R R/M$ e fase $\\pi$ lo statore si muove sempre dalla parte opposta del rotore. La dispensa scrive $-\\tfrac{M_R R}{M}\\operatorname{Re}\\{\\hat X_O\\}$, moltiplicando due volte il fattore: è $x_O = \\operatorname{Re}\\{\\hat X_O\\}$.',
      fonte: P223,
      correzione: { nf: 'NF-249', dispensaScrive: 'x_O = -\\dfrac{M_R R}{M}\\,Re\\{\\hat X_O\\} = -\\dfrac{M_R R}{M}\\cos(\\omega t)' },
      distrattori: [],
      num: (v) => [((v.MR * v.R) / v.M) * Math.cos(v.th - Math.PI), (-(v.MR * v.R) / v.M) * Math.cos(v.th)],
    },
    {
      id: 'd135.7',
      latex: 'x_{GLO} = \\dfrac{(M - M_R)\\,x_O + M_R\\,x_P}{M} = x_O + \\dfrac{M_R}{M}\\,R\\cos\\omega t',
      perche: 'Baricentro del sistema statore + rotore (conservazione del momento statico), con $x_P = x_O + R\\cos\\omega t$. Nella dispensa manca la divisione per $M$ nella prima scrittura e nel passaggio intermedio lo statore è scritto $x_O\\cos\\omega t$ invece di $x_O(t)$; il risultato finale è giusto.',
      fonte: P223,
      chiave: true,
      correzione: { nf: 'NF-249', dispensaScrive: 'x_{GLO} = x_P M_R + x_G M_S;\\ \\ x_{GLO} = \\dfrac{(M - M_R)x_O\\cos(\\omega t - \\varphi) + M_R(x_O\\cos\\omega t + R\\cos\\omega t)}{M}' },
      distrattori: [
        { latex: 'x_{GLO} = M_R\\,x_P + M_S\\,x_O', errore: 'fattore', spiega: 'È un momento statico, non una posizione: va diviso per la massa totale M (NF-249).', num: (v) => [v.xOg + (v.MR / v.M) * v.R * Math.cos(v.th), v.MR * (v.xOg + v.R * Math.cos(v.th)) + v.MS * v.xOg] },
        { latex: 'x_{GLO} = x_O + R\\cos\\omega t', errore: 'termine-perso', spiega: 'Questa è la posizione del rotore x_P: il baricentro sta tra O e P, a distanza (M_R/M)R da O.', num: (v) => [v.xOg + (v.MR / v.M) * v.R * Math.cos(v.th), v.xOg + v.R * Math.cos(v.th)] },
      ],
      num: (v) => [((v.M - v.MR) * v.xOg + v.MR * (v.xOg + v.R * Math.cos(v.th))) / v.M, v.xOg + (v.MR / v.M) * v.R * Math.cos(v.th)],
    },
    {
      id: 'd135.8',
      latex: 'x_O = -\\dfrac{M_R R}{M}\\cos\\omega t \\;\\Rightarrow\\; x_{GLO} = 0',
      perche: '**Autocentramento**: ad alta velocità statore e rotore si muovono in modo da tenere fermo il baricentro globale, che si colloca sull\'asse di rotazione e diventa il centro di rotazione: il sistema «non vibra» nel senso che il baricentro non si sposta. Esempio: la lavatrice in centrifuga.',
      fonte: P223,
      chiave: true,
      distrattori: [
        { latex: 'x_O = 0 \\Rightarrow x_{GLO} = 0', errore: 'concetto', spiega: 'Se lo statore stesse fermo il baricentro girerebbe con il rotore: x_GLO = (M_R/M)R cos ωt. È lo statore a muoversi per compensare.' },
        { latex: 'x_{GLO} = \\dfrac{M_R}{M}R\\cos\\omega t', errore: 'segno', spiega: 'Così lo statore sarebbe in fase con il rotore (φ = 0): vale a bassa velocità, non per ρ → ∞.', num: (v) => [(-(v.MR * v.R) / v.M) * Math.cos(v.th) + ((v.MR * v.R) / v.M) * Math.cos(v.th), ((v.MR * v.R) / v.M) * Math.cos(v.th)] },
      ],
      num: (v) => [(-(v.MR * v.R) / v.M) * Math.cos(v.th) + ((v.MR * v.R) / v.M) * Math.cos(v.th), 0],
    },
  ],
  risultato: { latex: '\\dfrac{M\\,|X_O|}{M_R\\,R} = \\dfrac{\\rho^2}{\\sqrt{(1 - \\rho^2)^2 + 4\\xi^2\\rho^2}} \\xrightarrow{\\ \\rho\\to\\infty\\ } 1, \\qquad x_{GLO} \\to 0', fonte: P223 },
  gancio: 'Stessa FRF, ma ingresso ∝ ω²: M|X_O|/(M_R R) = ρ²A → 1, statore in opposizione, baricentro fermo (autocentramento).',
};

// ------------------------------------------------------------------ argomento
export const eccentricaArg: ArgomentoContenuto = {
  id: 'c7-eccentrica',
  cosaDireSubito:
    'Uno statore che può oscillare su una guida, collegato al telaio con molla e smorzatore, porta un rotore con una massa M_R a distanza R dall\'asse, che gira a ω costante. Dalla cinematica x_P = x_O + R cos ωt e dall\'equilibrio con le forze d\'inerzia ottengo M ẍ_O + c ẋ_O + K x_O = M_R ω² R cos ωt, con M massa totale: una vibrazione forzata con forza che cresce come ω². L\'ampiezza adimensionale M|X_O|/(M_R R) = ρ²A(ξ,ρ) tende a 1 ad alta velocità: è l\'autocentramento.',
  sistemaIpotesi: [
    'Statore M_S su guida prismatica lungo x, con molla K e smorzatore c verso il telaio fisso.',
    'Rotore come punto materiale M_R a distanza R (eccentricità) dal centro O dello statore; ω costante.',
    'x_O misurato dall\'equilibrio statico; M = M_S + M_R, ω_m² = K/M, ξ = c/(2Mω_m).',
  ],
  disegno: {
    svg: figEccentrica(),
    didascalia: 'Massa eccentrica rotante (p. 223): statore tra guide con smorzatore e molla, rotore con massa puntiforme P a distanza R, angolo ωt.',
    fonte: { tipo: 'dispensa', pag: 223, fig: 'figura incollata' },
    elementi: [
      { id: 'telaio', testo: 'telaio con molla K e smorzatore c collegati allo statore', obbligatorio: true },
      { id: 'statore', testo: 'statore su guide prismatiche, asse x_O', obbligatorio: true },
      { id: 'rotore', testo: 'centro O, punto P di massa M_R a distanza R, angolo ωt', obbligatorio: true },
      { id: 'omega', testo: 'velocità angolare ω costante', obbligatorio: true },
      { id: 'centrifuga', testo: 'forza centrifuga M_R ω² R radiale (componente x = forzante)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'x_P = x_O + R\\cos\\omega t, \\qquad F_K + F_C + F_{inS} + F_{inR} = 0',
    spiegazione: 'Cinematica del rotore (formula fondamentale del rigido integrata con ω costante) ed equilibrio lungo x con le forze d\'inerzia di statore e rotore.',
    fonte: P223,
  },
  dimostrazioni: ['d134', 'd135'],
  significato:
    'Uno sbilanciamento è una forzante armonica la cui ampiezza cresce con ω²: a bassa velocità quasi non fa nulla, in risonanza è pericoloso, ad alta velocità lo statore oscilla con ampiezza costante M_R R/M in opposizione al rotore, e il baricentro globale resta fermo sull\'asse. È ciò che sfrutta la lavatrice in centrifuga: superata la risonanza il sistema si «autocentra».',
  fraseDaRicordare: 'M ẍ_O + c ẋ_O + K x_O = M_R ω² R cos ωt; M|X_O|/(M_R R) = ρ²A → 1: autocentramento, baricentro fermo.',
  daNonDire: [
    { frase: 'In inerzia metto solo la massa dello statore.', perche: 'Il rotore trasla con lo statore: M = M_S + M_R, e anche ω_m e ξ si calcolano con M.', fonte: P223 },
    { frase: 'L\'ampiezza della forzante è costante.', perche: 'F₀ = M_R ω² R cresce con il quadrato della velocità: per questo compare ρ² davanti ad A.', fonte: P223 },
    { frase: 'Ad alta velocità lo statore si ferma.', perche: 'Oscilla con ampiezza M_R R/M in opposizione al rotore; è il baricentro globale a fermarsi.', fonte: P223 },
    { frase: '|X_O|/R tende a 1.', perche: 'Tende a 1 il gruppo M|X_O|/(M_R R): |X_O| → M_R R/M, molto meno dell\'eccentricità.', fonte: P223 },
    { frase: 'x_GLO = x_P M_R + x_O M_S.', perche: 'Manca la divisione per la massa totale (NF-249): x_GLO = (M_R x_P + M_S x_O)/M.', fonte: P223 },
  ],
  approfondimenti: [
    { domanda: 'Quanta forza arriva al telaio da una macchina sbilanciata?', tipo: 'collegamento', argomento: 'c7-trasmissibilita', attesa: 'F_T = T_R·M_R ω² R con la stessa trasmissibilità di forza: per isolare serve ρ > √2, ma la forza eccitatrice cresce con ω².', fonte: { tipo: 'deduzione', da: 'pp. 222–223', spiegazione: 'trasmissibilità di forza con F₀ = M_R ω² R' } },
    { domanda: 'Che legame c\'è con le vibrazioni forzate?', tipo: 'collegamento', argomento: 'c7-forzate', attesa: 'È la stessa equazione con F₀ = M_R ω² R (forzante in coseno): stessa rigidezza dinamica, stesso φ; cambia solo il fattore ρ² davanti ad A.', fonte: P223 },
    { domanda: 'Perché il rapporto è identico a quello del moto relativo nell\'eccitazione di vincolo?', tipo: 'collegamento', argomento: 'c7-vincolo', attesa: 'In entrambi i casi la forzante è un\'inerzia proporzionale a ω² (mω²X_V e M_R ω² R): il rapporto adimensionale è ρ²A in tutti e due.', fonte: { tipo: 'dispensa', pag: [221, 223] } },
    { domanda: 'Dove sta il massimo dell\'ampiezza dello statore?', tipo: 'approfondimento', attesa: 'A ρ = 1/√(1 − 2ξ²), sopra la pulsazione naturale; il valore massimo è 1/(2ξ√(1 − ξ²)), come il picco di A.', fonte: { tipo: 'deduzione', da: 'p. 223', spiegazione: 'massimo di ρ²A (NF-248)' } },
    { domanda: 'Cos\'è l\'autocentramento?', tipo: 'approfondimento', attesa: 'Ad alta velocità (ρ → ∞, φ = π) x_O = −(M_R R/M) cos ωt e x_GLO = x_O + (M_R/M) R cos ωt = 0: il baricentro globale resta sull\'asse di rotazione e diventa il centro di rotazione. Esempio: lavatrice in centrifuga.', fonte: P223 },
    { domanda: 'Perché la dispensa scrive x_P = x_O + R cos ωt?', tipo: 'approfondimento', attesa: 'Viene dalla formula fondamentale V_P = V_O + ω∧(P − O) integrata con ω costante: P si muove con lo statore più la rotazione attorno a O.', fonte: P223 },
  ],
  simboli: [
    { simbolo: 'M_S,\\ M_R,\\ M', significato: 'massa dello statore, del rotore e totale M_S + M_R', altrove: 'M (totale) e m_e (eccentrica) in q07; m_R nella nota a quadretti' },
    { simbolo: 'R', significato: 'eccentricità del rotore (distanza O–P)', altrove: 'e in q07, d134–d135; E nella nota a quadretti' },
    { simbolo: 'x_O,\\ X_O', significato: 'spostamento e ampiezza dello statore', altrove: 'x, X' },
    { simbolo: 'x_P,\\ y_P', significato: 'posizione del punto rotante P' },
    { simbolo: 'x_{GLO}', significato: 'baricentro globale statore + rotore', altrove: 'x_G nella nota a quadretti (attenzione: altrove x_G è la massa)' },
    { simbolo: '\\rho,\\ \\xi', significato: 'con ω_m² = K/M e ξ = c/(2Mω_m), M totale', altrove: 'r, ζ' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c7-eccentrica' }],
  previsioni: [
    {
      id: 'c7-ec-alta',
      domanda: 'A velocità molto alta (ρ ≫ 1), lo statore…',
      opzioni: ['sta fermo', 'oscilla con ampiezza M_R R/M in opposizione al rotore', 'oscilla con ampiezza R in fase con il rotore'],
      corretta: 1,
      spiega: 'M|X_O|/(M_R R) → 1 e φ → π: lo statore compensa il rotore e il baricentro globale resta fermo.',
      verify: () => {
        const s = eccentricaStato({ rho: 60, xi: 0.1, mr: 0.1, R: 0.05, wm: 10, t: 0.3 });
        return Math.abs(eccentrica(60, 0.1) - 1) < 0.01 && Math.abs(fase(60, 0.1) - Math.PI) < 0.01 && s.ampGLO < 0.01 * 0.1 * 0.05 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c7-eccentrica' },
    },
    {
      id: 'c7-ec-doppia',
      domanda: 'Lontano dalla risonanza (ρ da 0,3 a 0,6, ξ = 0,1) raddoppi la velocità del rotore. L\'ampiezza dello statore…',
      opzioni: ['raddoppia', 'diventa più di 4 volte tanto', 'resta uguale'],
      corretta: 1,
      spiega: 'La forzante va con ω² (×4) e in più ci si avvicina alla risonanza (A cresce): ρ²A passa da circa 0,10 a 0,55.',
      verify: () => {
        const r = eccentrica(0.6, 0.1) / eccentrica(0.3, 0.1);
        return r > 4 ? 1 : r > 1.5 ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c7-eccentrica' },
    },
  ],
  nf: ['NF-12', 'NF-248', 'NF-249', 'NF-250'],
};
