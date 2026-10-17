/**
 * C5 parte a · Interferenza e numero minimo di denti nelle ruote a denti dritti (domanda q48).
 * Dispensa pp. 165, 167–168 (tools/testi/cap5a.md). Errori di p. 168: NF-23, NF-182, NF-183.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { interoMinimo, zMin, zMinDentiera } from '../../engine/c5a';
import { figIngranaggio } from './a-figure';

const DEG = Math.PI / 180;
const zInt = (rnd: () => number, lo: number, hi: number) => Math.round(U(rnd, lo, hi));

/** bisezione su una funzione decrescente con uno zero in [lo, hi] */
function zero(fn: (x: number) => number, lo: number, hi: number) {
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    if (fn(mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// ------------------------------------------------------------------ d081 condizione geometrica
export const d081: Dimostrazione = {
  id: 'd081',
  titolo: 'Interferenza: condizione geometrica',
  enunciato: 'Dire quando due ruote a evolvente interferiscono e tradurre la condizione di non interferenza della ruota grande in una relazione fra i raggi: R₁ + a ≤ O₁H₂.',
  ipotesi: [
    'ruote esterne a evolvente, ruota 1 la più grande (z₁ ≥ z₂), ruota 2 la più piccola',
    'H₁, H₂ punti di tangenza della retta di pressione con le fondamentali; A, B estremi del segmento dei contatti',
    'interasse i = R₁ + R₂, fondamentali R_f = R cos θ',
  ],
  sample: (rnd) => {
    const z2 = zInt(rnd, 8, 40), z1 = z2 + zInt(rnd, 0, 60), m = U(rnd, 1, 6), th = U(rnd, 14, 25) * DEG, a = m;
    const R1 = (m * z1) / 2, R2 = (m * z2) / 2, Rf1 = R1 * Math.cos(th), Rf2 = R2 * Math.cos(th), i = R1 + R2;
    const sn = Math.sin(th), cs = Math.cos(th);
    const sA = -R1 * sn + Math.sqrt(R1 * R1 * sn * sn - R1 * R1 + (R1 + a) ** 2); // A sulla testa della 1
    const sH2 = R2 * sn; // H₂: piede della perpendicolare da O₂ (s = (O₂ − C)·u)
    const A: [number, number] = [R1 + sA * sn, sA * cs], H2: [number, number] = [R1 + sH2 * sn, sH2 * cs];
    return { z1, z2, m, th, a, R1, R2, Rf1, Rf2, i, O1A: Math.hypot(A[0], A[1]), O1H2q: H2[0] ** 2 + H2[1] ** 2 };
  },
  passi: [
    {
      id: 'd081.1',
      latex: '\\text{punta del dente di una ruota} \\leftrightarrow \\text{fondo del vano dell\'altra} \\;\\Rightarrow\\; \\text{compenetrazione}',
      perche: 'Il fianco è a evolvente solo fuori dalla fondamentale: la parte di fianco interna (se il fondo è sotto la fondamentale) non è evolvente e non può trasmettere forza. Se la testa di un dente arriva a lavorare lì, i profili non sono più coniugati e i denti si compenetrano: è l\'interferenza.',
      fonte: { tipo: 'dispensa', pag: [165, 167] },
      distrattori: [],
    },
    {
      id: 'd081.2',
      latex: 'A,\\ B \\in \\overline{H_1H_2}',
      perche: 'Sulla retta di pressione i contatti a evolvente sono possibili solo fra i punti di tangenza $H_1$ e $H_2$: oltre $H_2$ la ruota 2 non ha più evolvente (si è dentro la sua fondamentale), oltre $H_1$ la ruota 1. Si ha interferenza se almeno uno fra A e B cade fuori da $H_1H_2$.',
      fonte: { tipo: 'dispensa', pag: 167 },
      chiave: true,
      distrattori: [
        { latex: 'A,\\ B \\in \\overline{O_1O_2}', errore: 'concetto', spiega: 'A e B stanno sulla retta di pressione, non sull\'interasse: i limiti sono i punti di tangenza H₁ e H₂ con le fondamentali.' },
        { latex: '\\overline{AB} \\ge p\\cos\\theta', errore: 'concetto', spiega: 'È la condizione di continuità del moto (z_p ≥ 1), non quella di non interferenza.' },
      ],
    },
    {
      id: 'd081.3',
      latex: 'z_1 > z_2 \\;\\Rightarrow\\; \\text{caso critico } A \\equiv H_2 \\;\\Rightarrow\\; \\overline{O_1A} \\le \\overline{O_1H_2}',
      perche: 'Qui la ruota 1 è la grande ($z_1 > z_2$). La testa della ruota grande arriva sulla retta molto più vicino a $H_2$ di quanto la testa della piccola arrivi a $H_1$: se A resta prima di $H_2$, anche B resta prima di $H_1$. Si impone allora che la circonferenza di testa della 1 non superi $H_2$, cioè $\\overline{O_1A} \\le \\overline{O_1H_2}$.',
      fonte: { tipo: 'dispensa', pag: 167 },
      chiave: true,
      distrattori: [
        { latex: '\\text{caso critico } B \\equiv H_1', errore: 'indice', spiega: 'È la testa della ruota grande (1) che rischia di entrare sotto la fondamentale della piccola (2): il punto critico è A ≡ H₂.' },
        { latex: '\\overline{O_1A} \\le \\overline{O_1C}', errore: 'concetto', spiega: 'O₁A = R₁ + a è sempre maggiore di O₁C = R₁: il limite è il punto di tangenza H₂, non il punto primitivo.' },
      ],
    },
    {
      id: 'd081.4',
      latex: '\\overline{O_1A} = R_{t1} = R_1 + a',
      perche: 'A sta sulla circonferenza di troncatura di testa della ruota 1: raggio primitivo più addendum.',
      fonte: { tipo: 'dispensa', pag: 167 },
      distrattori: [],
      num: (v) => [v.O1A, v.R1 + v.a],
    },
    {
      id: 'd081.5',
      latex: '\\overline{O_1H_2}^2 = \\overline{O_1O_2}^2 + \\overline{O_2H_2}^2 - 2\\,\\overline{O_1O_2}\\,\\overline{O_2H_2}\\cos\\theta',
      perche: 'Teorema di Carnot nel triangolo $O_1O_2H_2$, con l\'angolo θ in $O_2$ fra $O_2H_2$ e l\'interasse. Si ottiene da $(H_2 - O_1) = (H_2 - O_2) + (O_2 - O_1)$ moltiplicato scalarmente per sé stesso: il doppio prodotto ha $\\cos(\\pi - \\theta) = -\\cos\\theta$.',
      fonte: { tipo: 'dispensa', pag: 167 },
      chiave: true,
      distrattori: [
        { latex: '\\overline{O_1H_2}^2 = \\overline{O_1O_2}^2 + \\overline{O_2H_2}^2 + 2\\,\\overline{O_1O_2}\\,\\overline{O_2H_2}\\cos\\theta', errore: 'segno', spiega: 'L\'angolo fra i vettori (H₂ − O₂) e (O₂ − O₁) è π − θ: il coseno cambia segno e il doppio prodotto si sottrae.', num: (v) => [v.O1H2q, v.i ** 2 + v.Rf2 ** 2 + 2 * v.i * v.Rf2 * Math.cos(v.th)] },
        { latex: '\\overline{O_1H_2}^2 = \\overline{O_1O_2}^2 + \\overline{O_2H_2}^2', errore: 'termine-perso', spiega: 'Il triangolo O₁O₂H₂ non è rettangolo: l\'angolo retto in H₂ è fra O₂H₂ e la retta di pressione, non fra O₂H₂ e O₁H₂. Serve il termine di Carnot.', num: (v) => [v.O1H2q, v.i ** 2 + v.Rf2 ** 2] },
      ],
      num: (v) => [v.O1H2q, v.i ** 2 + v.Rf2 ** 2 - 2 * v.i * v.Rf2 * Math.cos(v.th)],
    },
    {
      id: 'd081.6',
      latex: '\\overline{O_1O_2} = R_1 + R_2,\\ \\overline{O_2H_2} = R_2\\cos\\theta \\;\\Rightarrow\\; \\overline{O_1H_2}^2 = (R_1 + R_2)^2 + R_2^2\\cos^2\\theta - 2(R_1 + R_2)R_2\\cos^2\\theta',
      perche: 'L\'interasse è la somma dei raggi primitivi, $O_2H_2$ è il raggio fondamentale della ruota 2.',
      fonte: { tipo: 'dispensa', pag: 167 },
      distrattori: [],
      num: (v) => [v.O1H2q, (v.R1 + v.R2) ** 2 + v.R2 ** 2 * Math.cos(v.th) ** 2 - 2 * (v.R1 + v.R2) * v.R2 * Math.cos(v.th) ** 2],
    },
    {
      id: 'd081.7',
      latex: 'R_1 + a \\le \\sqrt{(R_1 + R_2)^2 + R_2^2\\cos^2\\theta - 2(R_1 + R_2)R_2\\cos^2\\theta}',
      perche: 'Condizione di non interferenza della ruota 1 scritta con i raggi: è il punto di partenza del numero minimo di denti (d082).',
      fonte: { tipo: 'dispensa', pag: 167 },
      distrattori: [],
    },
    {
      id: 'd081.8',
      latex: '\\overline{O_1H_2}^2 = R_{f1}^2 + \\overline{H_1H_2}^2,\\ \\ \\overline{O_1A}^2 = R_{f1}^2 + \\overline{AH_1}^2 \\;\\Rightarrow\\; \\overline{O_1A} \\le \\overline{O_1H_2} \\iff \\overline{CA} \\le \\overline{CH_2}',
      perche: 'A e $H_2$ stanno sulla stessa retta, perpendicolare a $O_1H_1$: le distanze da $O_1$ crescono con la distanza da $H_1$. Quindi la condizione sui raggi equivale a quella sulla retta, $\\overline{CA} \\le \\overline{CH_2}$, che la dispensa usa nel caso dentiera.',
      fonte: { tipo: 'deduzione', da: 'p. 167 (O₁A ≤ O₁H₂) e p. 168 (CA ≤ CH₂)', spiegazione: 'Pitagora nei triangoli rettangoli in H₁, con H₁H₂ = (R₁ + R₂) sin θ' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.O1H2q, v.Rf1 ** 2 + ((v.R1 + v.R2) * Math.sin(v.th)) ** 2],
    },
  ],
  risultato: { latex: 'R_1 + a \\le \\overline{O_1H_2} = \\sqrt{(R_1 + R_2)^2 + R_2^2\\cos^2\\theta - 2(R_1 + R_2)R_2\\cos^2\\theta}', fonte: { tipo: 'dispensa', pag: 167 } },
  gancio: 'Testa della grande al massimo fino a H₂: Carnot nel triangolo O₁O₂H₂ con cos(π − θ) = −cos θ.',
};

// ------------------------------------------------------------------ d082 numero minimo di denti
export const d082: Dimostrazione = {
  id: 'd082',
  titolo: 'Numero minimo di denti senza interferenza',
  enunciato: 'Dalla condizione R₁ + a ≤ O₁H₂ ricavare il numero minimo di denti della ruota piccola (2) in funzione di |τ| = z₁/z₂ e di θ, il limite della dentiera e i valori numerici con θ = 20°.',
  ipotesi: [
    'proporzionamento modulare a = m, R = mz/2; ruota 2 la più piccola, |τ| = R₁/R₂ = z₁/z₂ ≥ 1',
    'i controlli numerici sono fatti al limite di interferenza (A ≡ H₂), dove ogni disuguaglianza diventa uguaglianza',
  ],
  sample: (rnd) => {
    const tau = U(rnd, 1, 6), th = U(rnd, 14, 25) * DEG, m = U(rnd, 1, 6), a = m, s = Math.sin(th), c = Math.cos(th);
    // limite di interferenza cercato sulla GEOMETRIA (A ≡ H₂: AC = CH₂), non sulla formula finale
    const marg = (z2: number) => { const R1 = (m * tau * z2) / 2, R2 = (m * z2) / 2; return Math.sqrt((R1 + a) ** 2 - (R1 * c) ** 2) - R1 * s - R2 * s; };
    const z2 = zero(marg, 1, 1000), z1 = tau * z2, R1 = (m * z1) / 2, R2 = (m * z2) / 2;
    // dentiera: testa della dentiera a distanza a dalla sua primitiva; la retta per C la taglia in s = a/sin θ
    const sArack = a / s, z2r = zero((z) => a / s - ((m * z) / 2) * s, 0.1, 1000);
    const Q = Math.sqrt(tau * tau + (2 * tau + 1) * s * s);
    return { tau, th, m, a, s, c, z1, z2, R1, R2, Q, sArack, z2r, f: 2 / (Q - tau) };
  },
  passi: [
    {
      id: 'd082.1',
      latex: 'R_1 + a \\le \\sqrt{(R_1 + R_2)^2 + R_2^2\\cos^2\\theta - 2(R_1 + R_2)R_2\\cos^2\\theta}',
      perche: 'Condizione geometrica di d081: la testa della ruota 1 non deve superare $H_2$.',
      fonte: { tipo: 'dispensa', pag: 167 },
      distrattori: [],
      num: (v) => [v.R1 + v.a, Math.sqrt((v.R1 + v.R2) ** 2 + v.R2 ** 2 * v.c ** 2 - 2 * (v.R1 + v.R2) * v.R2 * v.c ** 2)],
    },
    {
      id: 'd082.2',
      latex: '\\dfrac{z_1}{2} + 1 \\le \\sqrt{\\dfrac{(z_1 + z_2)^2}{4} + \\dfrac{z_2^2}{4}\\cos^2\\theta - 2\\,\\dfrac{(z_1 + z_2)z_2}{4}\\cos^2\\theta}',
      perche: 'Si sostituiscono $a = m$ e $R_i = m z_i/2$ e si divide tutto per m: la condizione non dipende dal modulo.',
      fonte: { tipo: 'dispensa', pag: 167 },
      distrattori: [],
      num: (v) => [v.z1 / 2 + 1, Math.sqrt((v.z1 + v.z2) ** 2 / 4 + (v.z2 ** 2 / 4) * v.c ** 2 - (2 * (v.z1 + v.z2) * v.z2 * v.c ** 2) / 4)],
    },
    {
      id: 'd082.3',
      latex: '|\\tau| + \\dfrac{2}{z_2} \\le \\sqrt{(|\\tau| + 1)^2 + \\cos^2\\theta - 2(|\\tau| + 1)\\cos^2\\theta}',
      perche: 'Con $|\\tau| = R_1/R_2 = z_1/z_2$ (la ruota 2 è la piccola) si divide membro a membro per $z_2/2$: a sinistra $z_1/z_2 + 2/z_2$, sotto radice ogni termine diviso per $z_2^2/4$.',
      fonte: { tipo: 'dispensa', pag: 167 },
      chiave: true,
      distrattori: [
        { latex: '|\\tau| + \\dfrac{1}{z_2} \\le \\sqrt{(|\\tau| + 1)^2 + \\cos^2\\theta - 2(|\\tau| + 1)\\cos^2\\theta}', errore: 'fattore', spiega: 'Il termine 1 diviso per z₂/2 diventa 2/z₂.', num: (v) => [v.tau + 1 / v.z2, Math.sqrt((v.tau + 1) ** 2 + v.c ** 2 - 2 * (v.tau + 1) * v.c ** 2)] },
        { latex: '\\dfrac{z_2}{z_1} + \\dfrac{2}{z_2} \\le \\sqrt{\\Big(\\dfrac{z_2}{z_1} + 1\\Big)^2 + \\cos^2\\theta - 2\\Big(\\dfrac{z_2}{z_1} + 1\\Big)\\cos^2\\theta}', errore: 'indice', spiega: 'Qui |τ| = z₁/z₂ (grande su piccola), come a p. 167; q48 chiama z₁ la piccola e inverte i pedici (NF-189).', num: (v) => [1 / v.tau + 2 / v.z2, Math.sqrt((1 / v.tau + 1) ** 2 + v.c ** 2 - 2 * (1 / v.tau + 1) * v.c ** 2)] },
      ],
      num: (v) => [v.tau + 2 / v.z2, Math.sqrt((v.tau + 1) ** 2 + v.c ** 2 - 2 * (v.tau + 1) * v.c ** 2)],
    },
    {
      id: 'd082.4',
      latex: '|\\tau| + \\dfrac{2}{z_2} \\le \\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin^2\\theta}',
      perche: 'Si sviluppa il quadrato: $\\tau^2 + 2|\\tau| + 1 + \\cos^2\\theta - 2|\\tau|\\cos^2\\theta - 2\\cos^2\\theta = \\tau^2 + 2|\\tau|(1 - \\cos^2\\theta) + (1 - \\cos^2\\theta)$, e $1 - \\cos^2\\theta = \\sin^2\\theta$.',
      fonte: { tipo: 'dispensa', pag: 167 },
      chiave: true,
      distrattori: [
        { latex: '|\\tau| + \\dfrac{2}{z_2} \\le \\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin\\theta}', errore: 'fattore', spiega: 'È la svista di p. 168 (NF-23): da 1 − cos²θ viene sin²θ, non sin θ.', num: (v) => [v.tau + 2 / v.z2, Math.sqrt(v.tau ** 2 + (2 * v.tau + 1) * v.s)] },
        { latex: '|\\tau| + \\dfrac{2}{z_2} \\le \\sqrt{\\tau^2 + 2|\\tau|\\sin^2\\theta}', errore: 'termine-perso', spiega: 'Anche 1 − cos²θ (senza |τ|) dà un sin²θ: il coefficiente è 2|τ| + 1.', num: (v) => [v.tau + 2 / v.z2, Math.sqrt(v.tau ** 2 + 2 * v.tau * v.s ** 2)] },
      ],
      num: (v) => [v.tau + 2 / v.z2, v.Q],
    },
    {
      id: 'd082.5',
      latex: 'z_2 \\ge \\dfrac{2}{\\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin^2\\theta} - |\\tau|} = f(|\\tau|, \\theta)',
      perche: 'Si isola $2/z_2$ e si inverte (entrambi i membri positivi): è il numero minimo di denti della ruota più piccola per evitare l\'interferenza.',
      fonte: { tipo: 'dispensa', pag: 168 },
      chiave: true,
      correzione: { nf: 'NF-23', dispensaScrive: 'z_2 \\ge \\frac{2}{\\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin\\theta} - |\\tau|}' },
      distrattori: [
        { latex: 'z_2 \\ge \\dfrac{2}{\\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin\\theta} - |\\tau|}', errore: 'fattore', spiega: 'È la formula riquadrata di p. 168 (NF-23): con sin θ invece di sin²θ i numeri vengono circa tre volte più piccoli.', num: (v) => [v.z2, 2 / (Math.sqrt(v.tau ** 2 + (2 * v.tau + 1) * v.s) - v.tau)] },
        { latex: 'z_2 \\ge \\dfrac{2}{\\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin^2\\theta}}', errore: 'termine-perso', spiega: 'Il |τ| a sinistra va portato a destra prima di invertire: al denominatore c\'è la differenza.', num: (v) => [v.z2, 2 / v.Q] },
      ],
      num: (v) => [v.z2, 2 / (v.Q - v.tau)],
    },
    {
      id: 'd082.6',
      latex: 'f = \\dfrac{2\\big(\\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin^2\\theta} + |\\tau|\\big)}{(2|\\tau| + 1)\\sin^2\\theta} \\;\\xrightarrow{|\\tau| \\to \\infty}\\; \\dfrac{2}{\\sin^2\\theta}',
      perche: 'Razionalizzando si vede il limite: per $|\\tau| \\to \\infty$ la radice vale circa $|\\tau|$ e $f \\to 4|\\tau|/(2|\\tau|\\sin^2\\theta)$. $|\\tau| \\to \\infty$ vuol dire $R_1 \\to \\infty$: la ruota 1 diventa una dentiera. f cresce con $|\\tau|$, quindi $2/\\sin^2\\theta$ è il valore più grande: la formula della dentiera è conservativa.',
      fonte: { tipo: 'dispensa', pag: 168 },
      correzione: { nf: 'NF-183', dispensaScrive: 'z_2^{min} = f(|\\tau|, \\theta) \\ge \\lim_{|\\tau|\\to\\infty} f = \\frac{2}{\\sin\\theta}' },
      distrattori: [
        { latex: 'f \\xrightarrow{|\\tau| \\to \\infty} \\dfrac{2}{\\sin\\theta}', errore: 'fattore', spiega: 'È il limite scritto a p. 168 (NF-23): con il sin²θ della formula corretta il limite è 2/sin²θ, come la stessa pagina ricava poi per la dentiera.' },
      ],
      num: (v) => [v.f, (2 * (v.Q + v.tau)) / ((2 * v.tau + 1) * v.s ** 2)],
    },
    {
      id: 'd082.7',
      latex: '\\overline{CA} = \\dfrac{a}{\\sin\\theta},\\qquad \\overline{CH_2} = \\overline{O_2C}\\sin\\theta = R_2\\sin\\theta',
      perche: 'Caso dentiera ricavato direttamente: la primitiva della dentiera è una retta per C e la sua testa è parallela, a distanza a. La retta di pressione, inclinata di θ rispetto alla primitiva, taglia la testa a distanza $a/\\sin\\theta$ da C; $CH_2$ è il cateto del triangolo $O_2CH_2$.',
      fonte: { tipo: 'dispensa', pag: 168 },
      distrattori: [
        { latex: '\\overline{CA} = \\dfrac{a}{\\cos\\theta}', errore: 'concetto', spiega: 'La retta di pressione forma l\'angolo θ con la primitiva della dentiera: la distanza a fra le due rette parallele è il cateto opposto, CA sin θ.', num: (v) => [v.sArack, v.a / v.c] },
      ],
      num: (v) => [v.sArack, v.a / v.s],
    },
    {
      id: 'd082.8',
      latex: '\\dfrac{a}{\\sin\\theta} \\le R_2\\sin\\theta \\;\\Rightarrow\\; a \\le R_2\\sin^2\\theta \\;\\Rightarrow\\; m \\le \\dfrac{m z_2}{2}\\sin^2\\theta \\;\\Rightarrow\\; z_2 \\ge \\dfrac{2}{\\sin^2\\theta}',
      perche: 'Si impone $\\overline{CA} \\le \\overline{CH_2}$ (A non oltre $H_2$) e si sostituiscono $a = m$, $R_2 = m z_2/2$: si ritrova il limite della formula generale.',
      fonte: { tipo: 'dispensa', pag: 168 },
      chiave: true,
      correzione: { nf: 'NF-23', dispensaScrive: '\\frac{a}{\\sin\\theta} \\le R_2\\sin\\theta \\Rightarrow a \\le R_2\\sin^3\\theta' },
      distrattori: [
        { latex: 'a \\le R_2\\sin^3\\theta \\;\\Rightarrow\\; z_2 \\ge \\dfrac{2}{\\sin^3\\theta}', errore: 'fattore', spiega: 'Moltiplicando a/sin θ ≤ R₂ sin θ per sin θ si ottiene sin²θ (la riga di p. 168 scrive sin³θ, NF-23).', num: (v) => [v.z2r, 2 / v.s ** 3] },
        { latex: 'z_2 \\ge \\dfrac{2}{\\sin\\theta}', errore: 'fattore', spiega: 'È il valore «conservativo» di p. 168 calcolato con sin θ (5,84 con 20°): il corretto è 2/sin²θ ≈ 17,1.', num: (v) => [v.z2r, 2 / v.s] },
      ],
      num: (v) => [v.z2r, 2 / v.s ** 2],
    },
    {
      id: 'd082.9',
      latex: '|\\tau| = 2,\\ \\theta = 20^\\circ:\\quad z_2 \\ge 14{,}16 \\;\\Rightarrow\\; z_{2,min} = 15',
      perche: 'Formula esatta: $2/(\\sqrt{4 + 5\\sin^2 20^\\circ} - 2) = 14{,}16$; i denti sono interi, quindi almeno 15. Va usata per le ruote esterne quando si vuole il minimo vero.',
      fonte: { tipo: 'dispensa', pag: 168 },
      correzione: { nf: 'NF-23', dispensaScrive: 'z_2 \\ge 5{,}13' },
      distrattori: [
        { latex: 'z_{2,min} = 6\\ (z_2 \\ge 5{,}13)', errore: 'fattore', spiega: 'È il numero di p. 168, calcolato con sin θ (NF-23): all\'orale non va citato.', num: () => [interoMinimo(zMin(2, 20 * DEG)), 6] },
      ],
      num: () => [interoMinimo(zMin(2, 20 * DEG)), 15],
    },
    {
      id: 'd082.10',
      latex: '\\text{dentiera},\\ \\theta = 20^\\circ:\\quad z_2 \\ge \\dfrac{2}{\\sin^2 20^\\circ} = 17{,}10 \\;\\Rightarrow\\; z_{2,min} = 18',
      perche: 'Formula conservativa: vale per qualsiasi ruota esterna (garantisce l\'assenza di interferenza, al costo di qualche dente in più) ed è l\'unica per la dentiera. È il «17» del grafico di p. 168.',
      fonte: { tipo: 'dispensa', pag: 168 },
      correzione: { nf: 'NF-23', dispensaScrive: 'z_2 \\ge \\frac{2}{\\sin\\theta} = 5{,}84' },
      distrattori: [],
      num: () => [interoMinimo(zMinDentiera(20 * DEG)), 18],
    },
    {
      id: 'd082.11',
      latex: '\\tau < 0\\ (\\text{esterne}):\\ f(|\\tau|) \\le \\dfrac{2}{\\sin^2\\theta};\\qquad \\tau > 0\\ (\\text{interne}):\\ \\text{serve la formula con } \\tau',
      perche: 'Tabella di p. 168: per le ruote esterne si può usare la formula esatta o quella conservativa; per la dentiera solo la conservativa; per le ruote interne la conservativa non basta più e si deve usare quella con τ.',
      fonte: { tipo: 'dispensa', pag: 168 },
      distrattori: [],
    },
  ],
  risultato: {
    latex: 'z_2 \\ge \\dfrac{2}{\\sqrt{\\tau^2 + (2|\\tau| + 1)\\sin^2\\theta} - |\\tau|} \\le \\dfrac{2}{\\sin^2\\theta}\\qquad (\\theta = 20^\\circ:\\ 15 \\text{ con } |\\tau| = 2,\\ 18 \\text{ dentiera})',
    fonte: { tipo: 'dispensa', pag: [167, 168] },
    correzione: { nf: 'NF-23', dispensaScrive: 'z_2 \\ge \\frac{2}{\\sqrt{\\tau^2 + (2|\\tau|+1)\\sin\\theta} - |\\tau|},\\ \\frac{2}{\\sin\\theta}' },
  },
  gancio: 'Dividi per z₂/2, 1 − cos²θ = sin²θ, isola 2/z₂: il limite della dentiera è 2/sin²θ ≈ 17.',
};

// ------------------------------------------------------------------ argomento
export const interferenza: ArgomentoContenuto = {
  id: 'c5-interferenza',
  cosaDireSubito:
    'L\'interferenza è il contatto fra la punta del dente di una ruota e il fondo del vano dell\'altra, dove il fianco non è più evolvente: i denti si compenetrano. Si evita se gli estremi A e B del segmento dei contatti restano dentro H₁H₂; il caso critico è la testa della ruota grande che arriva in H₂. Imponendo O₁A ≤ O₁H₂ con Carnot nel triangolo O₁O₂H₂ ricavo il numero minimo di denti della ruota piccola, che per la dentiera diventa 2/sin²θ, circa 17 con θ = 20°.',
  sistemaIpotesi: [
    'Ruote esterne a evolvente, ruota 1 grande e ruota 2 piccola: |τ| = R₁/R₂ = z₁/z₂ ≥ 1.',
    'Proporzionamento modulare: a = m, R = mz/2, R_f = R cos θ.',
    'Interasse nominale i = R₁ + R₂; angolo di pressione θ (20° o 14° i valori usati).',
  ],
  disegno: {
    svg: figIngranaggio({ teste: true, triangolo: true, titolo: 'Interferenza: triangolo O₁O₂H₂ e testa della ruota 1 che non deve superare H₂' }),
    didascalia: 'Triangolo O₁O₂H₂ (in grigio) per il teorema di Carnot; A, intersezione della testa della ruota 1 con la retta di pressione, deve restare fra C e H₂ (p. 167).',
    fonte: { tipo: 'dispensa', pag: 167, fig: 'schizzo manoscritto con il triangolo evidenziato' },
    elementi: [
      { id: 'ruote', testo: 'ruota 1 grande a sinistra, ruota 2 piccola a destra; primitive tangenti in C', obbligatorio: true },
      { id: 'retta', testo: 'retta di pressione tangente alle fondamentali in H₁ e H₂', obbligatorio: true },
      { id: 'teste', testo: 'circonferenze di testa e punti A (testa della 1) e B (testa della 2)', obbligatorio: true },
      { id: 'triangolo', testo: 'triangolo O₁O₂H₂ con angolo θ in O₂ (fra O₂H₂ e l\'interasse)', obbligatorio: true },
      { id: 'O1A', testo: 'segmenti O₁A = R₁ + a e O₁H₂ da confrontare', obbligatorio: true },
      { id: 'dentiera', testo: 'a parte: caso dentiera con CA = a/sin θ e CH₂ = R₂ sin θ', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\overline{O_1A} = R_1 + a \\le \\overline{O_1H_2},\\qquad \\overline{O_1H_2}^2 = i^2 + R_{f2}^2 - 2\\,i\\,R_{f2}\\cos\\theta',
    spiegazione: 'La testa della ruota grande non deve oltrepassare il punto di tangenza H₂ della piccola; O₁H₂ con Carnot nel triangolo O₁O₂H₂.',
    fonte: { tipo: 'dispensa', pag: 167 },
  },
  dimostrazioni: ['d081', 'd082'],
  significato:
    'Il numero minimo di denti dipende solo dall\'angolo di pressione e dal rapporto di trasmissione: con θ = 20° la ruota piccola di un ingranaggio esterno può scendere a una quindicina di denti, con la dentiera servono 18 denti. Un θ più grande riduce il minimo ma aumenta la componente radiale della forza sui supporti; il valore conservativo 2/sin²θ va bene per tutte le ruote esterne, non per le interne.',
  fraseDaRicordare: 'A non oltre H₂: z₂ ≥ 2/(√(τ² + (2|τ|+1) sin²θ) − |τ|), al massimo 2/sin²θ ≈ 17 con 20°.',
  daNonDire: [
    { frase: 'z₂ ≥ 2/(√(τ² + (2|τ|+1) sin θ) − |τ|), cioè 5,13 con |τ| = 2.', perche: 'È la formula riquadrata di p. 168 con sin θ al posto di sin²θ (NF-23): i valori corretti sono 14,16 → 15 denti e 17,10 → 18.', fonte: { tipo: 'dispensa', pag: 168 } },
    { frase: 'Il limite per la dentiera è 2/sin θ.', perche: 'È 2/sin²θ (NF-23), come la stessa p. 168 ricava con CA ≤ CH₂.', fonte: { tipo: 'dispensa', pag: 168 } },
    { frase: 'Il caso critico è B ≡ H₁.', perche: 'È la testa della ruota grande che arriva più vicina al punto di tangenza della piccola: A ≡ H₂.', fonte: { tipo: 'dispensa', pag: 167 } },
    { frase: 'La formula conservativa va bene anche per le ruote interne.', perche: 'Per τ > 0 (interne) la conservativa non basta: serve la formula con τ (tabella di p. 168).', fonte: { tipo: 'dispensa', pag: 168 } },
    { frase: 'Nella formula z₁ è la ruota piccola.', perche: 'Nella dispensa la piccola è la ruota 2 (z₂ ≥ f(τ, θ)) e |τ| = z₁/z₂ ≥ 1; q48 inverte i pedici (NF-189).', fonte: { tipo: 'dispensa', pag: 167 } },
  ],
  approfondimenti: [
    { domanda: 'Perché il punto critico è A e non B?', tipo: 'approfondimento', attesa: 'La ruota 1 è più grande: la sua circonferenza di testa taglia la retta di pressione molto più vicino a H₂ di quanto la testa della 2 arrivi a H₁. Se A non supera H₂, B resta dentro H₁.', fonte: { tipo: 'dispensa', pag: 167 } },
    { domanda: 'Come fai Carnot con i vettori?', tipo: 'approfondimento', attesa: '(H₂ − O₁) = (H₂ − O₂) + (O₂ − O₁); moltiplicando scalarmente per sé stesso si ha O₁H₂² = O₂H₂² + O₁O₂² + 2 O₂H₂·O₁O₂ cos(π − θ), con cos(π − θ) = −cos θ.', fonte: { tipo: 'dispensa', pag: 167 } },
    { domanda: 'Puoi ricavare il caso dentiera senza fare il limite?', tipo: 'approfondimento', attesa: 'Sì: CA = a/sin θ (la testa della dentiera è una retta a distanza a dalla primitiva), CH₂ = R₂ sin θ; CA ≤ CH₂ dà a ≤ R₂ sin²θ e con a = m, R₂ = mz₂/2 si ha z₂ ≥ 2/sin²θ.', fonte: { tipo: 'dispensa', pag: 168 } },
    { domanda: 'Quale formula usi per le ruote interne?', tipo: 'approfondimento', attesa: 'Quella con τ: la conservativa (dentiera) non basta più. Per le esterne si può usare l\'una o l\'altra; la conservativa sovrastima.', fonte: { tipo: 'dispensa', pag: 168 } },
    { domanda: 'Come cambia il numero minimo con le ruote elicoidali?', tipo: 'collegamento', argomento: 'c5-elicoidali-zmin', attesa: 'Si ragiona sulla ruota a denti dritti fittizia (circonferenza osculatrice dell\'ellisse, z_fitt = z/cos³α): z_min = z*_min cos³α, quindi servono meno denti.', fonte: { tipo: 'dispensa', pag: [187, 188] } },
    { domanda: 'Che cosa si fa in pratica per evitare l\'interferenza con pochi denti?', tipo: 'approfondimento', attesa: 'Aumentare l\'angolo di pressione, ridurre l\'addendum o correggere il profilo (spostamento), oppure usare denti elicoidali; in lavorazione l\'interferenza produce il sottotaglio del piede. La dispensa cita solo i valori di θ (20°, 14°).', fonte: { tipo: 'esterna', ref: 'trattazione classica delle dentature corrette e del sottotaglio', nota: 'non nella dispensa (NF-07): q48 lo cita; da dire come complemento' } },
  ],
  simboli: [
    { simbolo: '|\\tau| = z_1/z_2', significato: 'rapporto ruota grande / ruota piccola (≥ 1) nella formula di p. 167', altrove: 'p. 168 scrive τ = z₂/z₁ e mette la dentiera in τ = 0 (NF-182); q48 usa z₁ per la piccola' },
    { simbolo: 'z_2', significato: 'denti della ruota piccola (quella che rischia l\'interferenza)', altrove: 'z₁ in q48' },
    { simbolo: 'a', significato: 'addendum (= m)' },
    { simbolo: 'i = \\overline{O_1O_2}', significato: 'interasse' },
    { simbolo: 'H_1,\\ H_2', significato: 'punti di tangenza della retta di pressione con le fondamentali' },
    { simbolo: '\\theta', significato: 'angolo di pressione (20° o 14°)', altrove: 'α nelle fonti derivate' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5a-zmin' }, { kind: 'meccanismo', id: 'c5a-ingranamento', params: { vista: 'interferenza' } }],
  previsioni: [
    {
      id: 'c5a-zmin-2',
      domanda: 'Ruote esterne con |τ| = 2 e θ = 20°: quanti denti deve avere almeno la ruota piccola?',
      opzioni: ['6', '15', '17', '18'],
      corretta: 1,
      spiega: '2/(√(4 + 5 sin²20°) − 2) = 14,16, quindi 15. Il 6 viene dalla formula di p. 168 con sin θ (NF-23); 18 è il valore conservativo della dentiera.',
      verify: () => [6, 15, 17, 18].indexOf(interoMinimo(zMin(2, 20 * DEG))),
      visual: { kind: 'meccanismo', id: 'c5a-zmin' },
    },
    {
      id: 'c5a-zmin-theta',
      domanda: 'Passo da θ = 20° a θ = 25° (stesso |τ|). Il numero minimo di denti…',
      opzioni: ['aumenta', 'resta uguale', 'diminuisce'],
      corretta: 2,
      spiega: 'Con θ più grande la retta di pressione è più inclinata, H₂ si allontana da C (CH₂ = R₂ sin θ) e c\'è più spazio per la testa: z_min cala (dentiera: da 17,1 a 11,2).',
      verify: () => { const a = zMin(3, 20 * DEG), b = zMin(3, 25 * DEG); return b > a ? 0 : Math.abs(a - b) < 1e-12 ? 1 : 2; },
      visual: { kind: 'meccanismo', id: 'c5a-zmin' },
    },
  ],
  nf: ['NF-07', 'NF-23', 'NF-182', 'NF-183', 'NF-189'],
};
