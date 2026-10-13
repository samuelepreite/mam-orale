/**
 * C5 parte a · Denti in presa nelle ruote a denti dritti: segmento dei contatti, arco d'azione, numero di denti in
 * presa, passo di base (domanda q24). Dispensa p. 166 (tools/testi/cap5a.md).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { ingranaggio } from '../../engine/c5a';
import { figIngranaggio } from './a-figure';

const DEG = Math.PI / 180;
const zInt = (rnd: () => number, lo: number, hi: number) => Math.round(U(rnd, lo, hi));
const P166 = { tipo: 'dispensa', pag: 166 } as const;

/** geometria dalle intersezioni retta–circonferenza (non dalla formula finale) */
function geometria(rnd: () => number): Vars {
  const z1 = zInt(rnd, 17, 70), z2 = zInt(rnd, 17, 70), m = U(rnd, 1, 6), th = U(rnd, 15, 25) * DEG;
  const R1 = (m * z1) / 2, R2 = (m * z2) / 2, a = m, Rt1 = R1 + a, Rt2 = R2 + a, Rf1 = R1 * Math.cos(th), Rf2 = R2 * Math.cos(th);
  const sn = Math.sin(th);
  // A: |C + s u − O₁| = R_t1, radice positiva; B: |C + s u − O₂| = R_t2, radice negativa
  const sA = -R1 * sn + Math.sqrt(R1 * R1 * sn * sn - R1 * R1 + Rt1 * Rt1);
  const sB = R2 * sn - Math.sqrt(R2 * R2 * sn * sn - R2 * R2 + Rt2 * Rt2);
  // H₁, H₂: piedi delle perpendicolari dai centri: s = (O − C)·u
  const sH1 = -R1 * sn, sH2 = R2 * sn;
  const AC = sA, BC = -sB, AB = sA - sB, p = Math.PI * m;
  // ruota 1 ruotata di Δφ mentre il contatto va da B a C: l'evolvente ha origine in λ = −θ + L/R_f1 (L da H₁)
  const LB = sB - sH1, LC = -sH1, dphiAcc = (LC - LB) / Rf1, dphiRec = (sA - 0) / Rf1;
  const MC = R1 * dphiAcc, RS = Rf1 * dphiAcc, MpC = R1 * dphiRec;
  return {
    z1, z2, m, th, R1, R2, a, Rt1, Rt2, Rf1, Rf2, sA, sB, sH1, sH2, AC, BC, AB, p, MC, RS, MpC,
    AH1: sA - sH1, BH2: sH2 - sB, CH1: -sH1, CH2: sH2, ell: MC + MpC,
    zpM1: ingranaggio({ z1, z2, m: 1, theta: th }).zp,
  };
}

// ------------------------------------------------------------------ d080 segmento dei contatti
export const d080: Dimostrazione = {
  id: 'd080',
  titolo: 'Lunghezza del segmento dei contatti AB',
  enunciato: 'Ricavare la lunghezza del segmento dei contatti AB in funzione di θ, z₁, z₂ e m per due ruote esterne a denti dritti con proporzionamento modulare.',
  ipotesi: [
    'profili a evolvente; contatto lungo la retta di pressione H₁H₂',
    'A = intersezione della retta con la testa della ruota 1 (dalla parte di H₂), B con la testa della ruota 2 (dalla parte di H₁)',
    'addendum a = m, raggi primitivi R_i = m z_i/2, fondamentali R_fi = R_i cos θ',
  ],
  sample: geometria,
  passi: [
    {
      id: 'd080.1',
      latex: 'A, B = \\text{retta di pressione} \\cap \\text{troncature di testa} \\;\\Rightarrow\\; P \\in \\overline{AB}',
      perche: 'Un dente della 1 può toccare la 2 solo finché la sua testa arriva alla retta di pressione: il contatto comincia in B (testa della 2) e finisce in A (testa della 1). AB è il segmento dei contatti.',
      fonte: P166,
      distrattori: [],
    },
    {
      id: 'd080.2',
      latex: '\\overline{AB} = \\overline{AC} + \\overline{CB} = \\big(\\overline{AH_1} - \\overline{CH_1}\\big) + \\big(\\overline{BH_2} - \\overline{CH_2}\\big)',
      perche: 'C divide AB in due tratti; ciascuno si ottiene dal tratto misurato dal punto di tangenza della ruota opposta ($H_1$ per A, $H_2$ per B) meno il tratto fino a C.',
      fonte: P166,
      distrattori: [],
      num: (v) => [v.AB, v.AH1 - v.CH1 + (v.BH2 - v.CH2)],
    },
    {
      id: 'd080.3',
      latex: '\\overline{AH_1} = \\sqrt{\\overline{AO_1}^2 - \\overline{O_1H_1}^2} = \\sqrt{R_{t1}^2 - R_{f1}^2}',
      perche: 'Pitagora nel triangolo $O_1H_1A$, rettangolo in $H_1$ perché la retta di pressione è tangente alla fondamentale: ipotenusa $\\overline{O_1A} = R_{t1} = R_1 + a$, cateto $\\overline{O_1H_1} = R_{f1} = R_1\\cos\\theta$.',
      fonte: P166,
      chiave: true,
      distrattori: [
        { latex: '\\overline{AH_1} = \\sqrt{R_{t1}^2 - R_1^2}', errore: 'indice', spiega: 'Il cateto perpendicolare alla retta è il raggio fondamentale O₁H₁, non il primitivo O₁C (che non è perpendicolare alla retta).', num: (v) => [v.AH1, Math.sqrt(v.Rt1 ** 2 - v.R1 ** 2)] },
        { latex: '\\overline{AH_1} = \\sqrt{R_{t1}^2 + R_{f1}^2}', errore: 'segno', spiega: 'AH₁ è un cateto: si sottrae il quadrato dell\'altro cateto dall\'ipotenusa.', num: (v) => [v.AH1, Math.sqrt(v.Rt1 ** 2 + v.Rf1 ** 2)] },
      ],
      num: (v) => [v.AH1, Math.sqrt(v.Rt1 ** 2 - v.Rf1 ** 2)],
    },
    {
      id: 'd080.4',
      latex: '\\overline{CH_1} = R_1\\sin\\theta,\\qquad \\overline{CH_2} = R_2\\sin\\theta',
      perche: 'Triangolo $O_1H_1C$: ipotenusa $R_1$, angolo θ in $O_1$; il cateto opposto, lungo la retta, è $R_1\\sin\\theta$.',
      fonte: P166,
      distrattori: [
        { latex: '\\overline{CH_1} = R_1\\cos\\theta', errore: 'concetto', spiega: 'R₁ cos θ è il raggio fondamentale O₁H₁, il cateto adiacente a θ.', num: (v) => [v.CH1, v.R1 * Math.cos(v.th)] },
      ],
      num: (v) => [v.CH1, v.R1 * Math.sin(v.th)],
    },
    {
      id: 'd080.5',
      latex: '\\overline{AC} = R_1\\left(\\sqrt{\\Big(1 + \\dfrac{a}{R_1}\\Big)^2 - \\cos^2\\theta} - \\sin\\theta\\right)',
      perche: 'Si raccoglie $R_1$: $R_{t1} = R_1 + a$ e $R_{f1} = R_1\\cos\\theta$.',
      fonte: P166,
      distrattori: [],
      num: (v) => [v.AC, v.R1 * (Math.sqrt((1 + v.a / v.R1) ** 2 - Math.cos(v.th) ** 2) - Math.sin(v.th))],
    },
    {
      id: 'd080.6',
      latex: '\\overline{AC} = \\dfrac{m z_1}{2}\\left(\\sqrt{\\Big(1 + \\dfrac{2}{z_1}\\Big)^2 - \\cos^2\\theta} - \\sin\\theta\\right),\\quad \\overline{BC} = \\dfrac{m z_2}{2}\\left(\\sqrt{\\Big(1 + \\dfrac{2}{z_2}\\Big)^2 - \\cos^2\\theta} - \\sin\\theta\\right)',
      perche: 'Proporzionamento modulare: $a = m$, $R_1 = m z_1/2$, quindi $a/R_1 = 2/z_1$. Per BC si ripete lo stesso conto sulla ruota 2.',
      fonte: P166,
      chiave: true,
      distrattori: [
        { latex: '\\overline{AC} = \\dfrac{m z_1}{2}\\left(\\sqrt{\\Big(1 + \\dfrac{1}{z_1}\\Big)^2 - \\cos^2\\theta} - \\sin\\theta\\right)', errore: 'fattore', spiega: 'a/R₁ = m/(m z₁/2) = 2/z₁: il 2 del raggio va al numeratore.', num: (v) => [v.AC, ((v.m * v.z1) / 2) * (Math.sqrt((1 + 1 / v.z1) ** 2 - Math.cos(v.th) ** 2) - Math.sin(v.th))] },
        { latex: '\\overline{AC} = \\dfrac{m z_1}{2}\\left(\\sqrt{\\Big(1 + \\dfrac{2}{z_1}\\Big)^2 - \\sin^2\\theta} - \\cos\\theta\\right)', errore: 'convenzione', spiega: 'θ è misurato fra la retta di pressione e la tangente alle primitive in C: R_f = R cos θ, CH₁ = R sin θ. Scambiare seno e coseno vuol dire misurarlo dall\'interasse.', num: (v) => [v.AC, ((v.m * v.z1) / 2) * (Math.sqrt((1 + 2 / v.z1) ** 2 - Math.sin(v.th) ** 2) - Math.cos(v.th))] },
      ],
      num: (v) => [v.AC, ((v.m * v.z1) / 2) * (Math.sqrt((1 + 2 / v.z1) ** 2 - Math.cos(v.th) ** 2) - Math.sin(v.th))],
    },
    {
      id: 'd080.7',
      latex: '\\overline{AB} = \\dfrac{m}{2}\\left[z_1\\sqrt{\\Big(1 + \\dfrac{2}{z_1}\\Big)^2 - \\cos^2\\theta} + z_2\\sqrt{\\Big(1 + \\dfrac{2}{z_2}\\Big)^2 - \\cos^2\\theta} - (z_1 + z_2)\\sin\\theta\\right]',
      perche: 'Si sommano AC e BC: AB dipende solo da θ, dai numeri di denti e linearmente dal modulo.',
      fonte: P166,
      distrattori: [],
      num: (v) => [v.AB, (v.m / 2) * (v.z1 * Math.sqrt((1 + 2 / v.z1) ** 2 - Math.cos(v.th) ** 2) + v.z2 * Math.sqrt((1 + 2 / v.z2) ** 2 - Math.cos(v.th) ** 2) - (v.z1 + v.z2) * Math.sin(v.th))],
    },
    {
      id: 'd080.8',
      latex: '\\overline{AB} = \\sqrt{R_{t1}^2 - R_{f1}^2} + \\sqrt{R_{t2}^2 - R_{f2}^2} - i\\sin\\theta,\\qquad i = R_1 + R_2',
      perche: 'Stessa formula scritta con i raggi, come nelle fonti derivate (dove però «a» è l\'interasse): i due tratti dai punti di tangenza meno la proiezione $\\overline{H_1H_2} = i\\sin\\theta$.',
      fonte: { tipo: 'deduzione', da: 'p. 166 (AB = AH₁ − CH₁ + BH₂ − CH₂) e p. 167 (i = R₁ + R₂)', spiegazione: 'CH₁ + CH₂ = (R₁ + R₂) sin θ' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.AB, Math.sqrt(v.Rt1 ** 2 - v.Rf1 ** 2) + Math.sqrt(v.Rt2 ** 2 - v.Rf2 ** 2) - (v.R1 + v.R2) * Math.sin(v.th)],
    },
  ],
  risultato: { latex: '\\overline{AB} = \\dfrac{m}{2}\\left[z_1\\sqrt{\\Big(1 + \\dfrac{2}{z_1}\\Big)^2 - \\cos^2\\theta} + z_2\\sqrt{\\Big(1 + \\dfrac{2}{z_2}\\Big)^2 - \\cos^2\\theta} - (z_1 + z_2)\\sin\\theta\\right]', fonte: P166 },
  gancio: 'Due Pitagora dalle teste ai punti di tangenza, meno i due tratti R sin θ fino a C.',
};

// ------------------------------------------------------------------ d079 arco d'azione e denti in presa
export const d079: Dimostrazione = {
  id: 'd079',
  titolo: 'Arco d\'azione e numero di denti in presa',
  enunciato: 'Passare dal segmento dei contatti AB all\'arco d\'azione sulla primitiva e ricavare il numero di denti contemporaneamente in presa z_p con la condizione di continuità del moto.',
  ipotesi: [
    'profili a evolvente; segmento dei contatti AB noto (d080)',
    'M, M\': intersezioni del profilo della ruota 1 con la primitiva quando il contatto è in B e in A; R, S: estremi corrispondenti sulla fondamentale',
    'passo p sulla primitiva',
  ],
  sample: geometria,
  passi: [
    {
      id: 'd079.1',
      latex: '\\ell = \\overset{\\frown}{MC} + \\overset{\\frown}{M\'C}\\quad (\\text{accesso} + \\text{recesso})',
      perche: 'Arco d\'azione: l\'arco di primitiva percorso mentre una coppia di denti è in presa. In accesso va dall\'inizio del contatto (B) al punto C, in recesso da C alla fine del contatto (A).',
      fonte: P166,
      distrattori: [],
    },
    {
      id: 'd079.2',
      latex: '\\dfrac{\\overset{\\frown}{MC}}{R_1} = \\dfrac{\\overset{\\frown}{RS}}{R_{f1}}',
      perche: 'Mentre il contatto va da B a C la ruota 1 ruota di un certo angolo: il profilo sposta il suo taglio sulla primitiva da M a C e la sua origine sulla fondamentale da R a S. Lo stesso angolo al centro sottende archi proporzionali ai raggi.',
      fonte: P166,
      chiave: true,
      distrattori: [
        { latex: '\\overset{\\frown}{MC} = \\overset{\\frown}{RS}', errore: 'concetto', spiega: 'I due archi sottendono lo stesso angolo ma su circonferenze diverse: stanno come R₁ e R_f1.', num: (v) => [v.MC, v.RS] },
        { latex: '\\dfrac{\\overset{\\frown}{MC}}{R_{f1}} = \\dfrac{\\overset{\\frown}{RS}}{R_1}', errore: 'indice', spiega: 'L\'arco di primitiva va diviso per il raggio primitivo, quello di fondamentale per il raggio fondamentale.', num: (v) => [v.MC / v.Rf1, v.RS / v.R1] },
      ],
      num: (v) => [v.MC / v.R1, v.RS / v.Rf1],
    },
    {
      id: 'd079.3',
      latex: '\\overline{BC} = \\overset{\\frown}{RS}',
      perche: 'La retta di pressione è la retta generatrice delle evolventi della ruota 1: rotola senza strisciare sulla fondamentale, quindi il tratto percorso dal contatto sulla retta è uguale all\'arco svolto sulla fondamentale (stessa proprietà di $\\overline{PQ} = \\overset{\\frown}{HQ}$).',
      fonte: { tipo: 'dispensa', pag: [161, 166] },
      chiave: true,
      distrattori: [
        { latex: '\\overline{BC} = \\overset{\\frown}{MC}', errore: 'concetto', spiega: 'Il segmento sulla retta è uguale all\'arco sulla fondamentale, non a quello sulla primitiva (che è più lungo di 1/cos θ).', num: (v) => [v.BC, v.MC] },
        { latex: '\\overline{BC} = \\overset{\\frown}{RS}\\cos\\theta', errore: 'fattore', spiega: 'Rotolamento senza strisciamento: segmento svolto e arco sono uguali, senza fattori.', num: (v) => [v.BC, v.RS * Math.cos(v.th)] },
      ],
      num: (v) => [v.BC, v.RS],
    },
    {
      id: 'd079.4',
      latex: '\\overset{\\frown}{MC} = \\overset{\\frown}{RS}\\,\\dfrac{R_1}{R_{f1}} = \\dfrac{\\overline{BC}}{\\cos\\theta}',
      perche: 'Si uniscono le due relazioni con $R_{f1} = R_1\\cos\\theta$: l\'arco d\'accesso sulla primitiva è più lungo del tratto BC di un fattore $1/\\cos\\theta$.',
      fonte: P166,
      distrattori: [],
      num: (v) => [v.MC, v.BC / Math.cos(v.th)],
    },
    {
      id: 'd079.5',
      latex: "\\overset{\\frown}{M'C} = \\dfrac{\\overline{AC}}{\\cos\\theta}",
      perche: 'Stesso ragionamento per il recesso, con il tratto AC.',
      fonte: P166,
      distrattori: [],
      num: (v) => [v.MpC, v.AC / Math.cos(v.th)],
    },
    {
      id: 'd079.6',
      latex: "\\ell = \\overset{\\frown}{MC} + \\overset{\\frown}{M'C} = \\dfrac{\\overline{AB}}{\\cos\\theta}",
      perche: 'Lunghezza complessiva dell\'arco d\'azione.',
      fonte: P166,
      distrattori: [],
      num: (v) => [v.ell, v.AB / Math.cos(v.th)],
    },
    {
      id: 'd079.7',
      latex: 'z_p = \\dfrac{\\ell}{p} = \\dfrac{\\overline{AB}}{p\\cos\\theta} \\ge 1',
      perche: 'Su ogni passo di primitiva c\'è un dente: quanti passi stanno nell\'arco d\'azione, tante coppie sono in presa (in media). Per la continuità del moto una nuova coppia deve entrare in presa prima che la precedente esca: $z_p \\ge 1$.',
      fonte: P166,
      chiave: true,
      distrattori: [
        { latex: 'z_p = \\dfrac{\\overline{AB}}{p}', errore: 'fattore', spiega: 'Il passo p è misurato sulla primitiva: va confrontato con l\'arco ℓ = AB/cos θ, non con il segmento AB.', num: (v) => [v.ell / v.p, v.AB / v.p] },
        { latex: 'z_p = \\dfrac{\\overline{AB}\\cos\\theta}{p}', errore: 'fattore', spiega: 'L\'arco è più lungo del segmento: si divide per cos θ, non si moltiplica.', num: (v) => [v.ell / v.p, (v.AB * Math.cos(v.th)) / v.p] },
      ],
      num: (v) => [v.ell / v.p, v.AB / (v.p * Math.cos(v.th))],
    },
    {
      id: 'd079.8',
      latex: 'z_p(m) = z_p(1):\\quad \\overline{AB} \\propto m,\\ p = \\pi m',
      perche: 'AB e p sono entrambi proporzionali al modulo: il numero di denti in presa dipende solo da θ, z₁ e z₂. Per aumentarlo servono più denti (o un θ più piccolo), non un modulo più grande.',
      fonte: { tipo: 'deduzione', da: 'p. 166 (AB funzione di θ, z, m; z_p = AB/(p cos θ))', spiegazione: 'm si semplifica nel rapporto' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.AB / (v.p * Math.cos(v.th)), v.zpM1],
    },
  ],
  risultato: { latex: '\\ell = \\dfrac{\\overline{AB}}{\\cos\\theta},\\qquad z_p = \\dfrac{\\overline{AB}}{p\\cos\\theta} \\ge 1', fonte: P166 },
  gancio: 'Segmento sulla retta = arco sulla fondamentale; sulla primitiva diventa AB/cos θ; diviso il passo dà z_p.',
};

// ------------------------------------------------------------------ d138 passo di base (assente nella dispensa)
export const d138: Dimostrazione = {
  id: 'd138',
  titolo: 'Passo di base',
  enunciato: 'Definire il passo di base p_b, mostrare che p_b = p cos θ e che è la distanza fra due contatti successivi sulla retta di pressione, così che z_p = AB/p_b.',
  ipotesi: ['profili a evolvente, z denti; fondamentale R_f = R cos θ', 'la dispensa non nomina il passo di base: il fattore cos θ compare solo in z_p = AB/(p cos θ)'],
  sample: (rnd) => {
    const g = geometria(rnd);
    const z = g.z1, Rf = g.Rf1, R = g.R1;
    const pb = (2 * Math.PI * Rf) / z;
    // due evolventi omologhe successive: origini a λ e λ + 2π/z; tagliano la retta (da H₁) in L = R_f(λ + θ)
    const lam = U(rnd, 0, 1), L0 = Rf * (lam + g.th), L1 = Rf * (lam + (2 * Math.PI) / z + g.th);
    return { ...g, z, Rf, R, pb, dL: L1 - L0 };
  },
  passi: [
    {
      id: 'd138.1',
      latex: 'p_b\\,z = 2\\pi R_f',
      perche: 'Passo di base: arco della circonferenza fondamentale compreso fra due profili omologhi successivi. Come per il passo sulla primitiva, z passi fanno tutta la circonferenza.',
      fonte: { tipo: 'deduzione', da: 'p. 163 (p z = 2πR) applicata alla fondamentale', spiegazione: 'la definizione di passo ripetuta sulla circonferenza di raggio R_f' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.pb * v.z, 2 * Math.PI * v.Rf],
    },
    {
      id: 'd138.2',
      latex: 'p_b = \\dfrac{2\\pi R\\cos\\theta}{z} = p\\cos\\theta = \\pi m\\cos\\theta',
      perche: 'Con $R_f = R\\cos\\theta$: lo stesso angolo al centro $2\\pi/z$ sottende sulla fondamentale un arco ridotto di $\\cos\\theta$ rispetto alla primitiva.',
      fonte: { tipo: 'deduzione', da: 'p. 166 (R_f = R cos θ) e p. 165 (p = πm)', spiegazione: 'sostituzione di R_f nel passo di base' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: 'p_b = \\dfrac{p}{\\cos\\theta}', errore: 'fattore', spiega: 'La fondamentale è più piccola della primitiva: il passo di base è più corto, p cos θ.', num: (v) => [v.pb, v.p / Math.cos(v.th)] },
        { latex: 'p_b = p\\sin\\theta', errore: 'concetto', spiega: 'Il rapporto fra i raggi è cos θ (R_f = R cos θ); sin θ compare nei tratti CH lungo la retta.', num: (v) => [v.pb, v.p * Math.sin(v.th)] },
      ],
      num: (v) => [v.pb, v.p * Math.cos(v.th)],
    },
    {
      id: 'd138.3',
      latex: '\\Delta s = R_f\\Big(\\lambda + \\dfrac{2\\pi}{z} + \\theta\\Big) - R_f(\\lambda + \\theta) = p_b',
      perche: 'Due evolventi omologhe successive sono svolte dalla stessa retta di pressione, con origini sfasate di $2\\pi/z$ sulla fondamentale. Il segmento di retta svolto è uguale all\'arco: lungo la retta di pressione due contatti successivi distano esattamente $p_b$, ovunque.',
      fonte: { tipo: 'deduzione', da: 'p. 161 (retta che rotola senza strisciare) e p. 166 (BC = arco RS)', spiegazione: 'la proprietà dell\'evolvente applicata a due profili successivi' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: '\\Delta s = p', errore: 'concetto', spiega: 'p è misurato sulla primitiva; sulla retta di pressione i contatti distano l\'arco di fondamentale, p cos θ.', num: (v) => [v.dL, v.p] },
        { latex: '\\Delta s\\ \\text{varia lungo la retta}', errore: 'concetto', spiega: 'È costante: le evolventi omologhe sono «parallele», la loro distanza normale è sempre l\'arco di fondamentale fra le origini.' },
      ],
      num: (v) => [v.dL, v.pb],
    },
    {
      id: 'd138.4',
      latex: 'z_p = \\dfrac{\\overline{AB}}{p\\cos\\theta} = \\dfrac{\\overline{AB}}{p_b}',
      perche: 'La formula della dispensa letta con il passo di base: il numero medio di coppie in presa è la lunghezza del segmento dei contatti diviso la distanza fra due contatti successivi sulla stessa retta.',
      fonte: { tipo: 'deduzione', da: 'p. 166 (z_p = AB/(p cos θ))', spiegazione: 'p cos θ = p_b' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.AB / (v.p * Math.cos(v.th)), v.AB / v.pb],
    },
    {
      id: 'd138.5',
      latex: '1 \\le z_p < 2:\\ \\text{due coppie in presa per una frazione } (z_p - 1) \\text{ del tempo}',
      perche: 'Il contatto avanza sulla retta a velocità costante $R_{f1}\\omega_1$; mentre una coppia percorre AB, la successiva entra dopo $p_b$: per un tratto $\\overline{AB} - p_b$ su $p_b$ lavorano due coppie, nel resto una sola.',
      fonte: { tipo: 'deduzione', da: 'p. 166 e contatti distanziati di p_b (d138.3)', spiegazione: 'conteggio dei contatti dentro AB lungo un passo di base' },
      aggiunto: true,
      distrattori: [],
    },
  ],
  risultato: { latex: 'p_b = p\\cos\\theta = \\pi m\\cos\\theta,\\qquad z_p = \\dfrac{\\overline{AB}}{p_b}', fonte: { tipo: 'deduzione', da: 'p. 166 (z_p = AB/(p cos θ), R_f = R cos θ)', spiegazione: 'la dispensa non nomina il passo di base (NF-07): è il fattore p cos θ della sua formula' } },
  gancio: 'Stesso angolo 2π/z, raggio ridotto di cos θ: p_b = p cos θ, ed è anche la distanza fra contatti successivi.',
};

// ------------------------------------------------------------------ argomento
export const dentiPresa: ArgomentoContenuto = {
  id: 'c5-denti-presa',
  cosaDireSubito:
    'Nelle ruote a evolvente il contatto corre sulla retta di pressione, ma solo fra le due circonferenze di testa: è il segmento dei contatti AB. Lo ricavo con Pitagora nei triangoli O₁H₁A e O₂H₂B, poi passo all\'arco d\'azione sulla primitiva, ℓ = AB/cos θ, e lo divido per il passo: z_p = AB/(p cos θ) deve essere almeno 1, perché una coppia entri in presa prima che la precedente esca.',
  sistemaIpotesi: [
    'Due ruote esterne a denti dritti, profili a evolvente, all\'interasse nominale.',
    'Proporzionamento modulare: a = m, R = mz/2, R_f = R cos θ, R_t = R + m.',
    'A sulla testa della ruota 1 (dalla parte di H₂), B sulla testa della ruota 2 (dalla parte di H₁).',
    'Ruota 1 motrice: il contatto va da B (inizio, accesso) verso A (fine, recesso).',
  ],
  disegno: {
    svg: figIngranaggio({ teste: true, AB: true, titolo: 'Segmento dei contatti AB fra le teste, sulla retta di pressione' }),
    didascalia: 'Ruote esterne con troncature di testa, primitive e fondamentali; retta di pressione da H₁ a H₂; A e B intersezioni con le teste; AB segmento dei contatti (p. 166).',
    fonte: { tipo: 'dispensa', pag: 166, fig: 'schizzo manoscritto' },
    elementi: [
      { id: 'cerchi', testo: 'per ogni ruota: testa R_t, primitiva R, fondamentale R_f (dall\'esterno all\'interno)', obbligatorio: true },
      { id: 'C', testo: 'primitive tangenti in C sull\'interasse', obbligatorio: true },
      { id: 'retta', testo: 'retta di pressione per C tangente alle fondamentali in H₁ e H₂, angolo θ', obbligatorio: true },
      { id: 'AB', testo: 'A (testa della 1, verso H₂) e B (testa della 2, verso H₁): segmento AB', obbligatorio: true },
      { id: 'triangoli', testo: 'triangoli rettangoli O₁H₁A e O₂H₂B per Pitagora', obbligatorio: true },
      { id: 'addendum', testo: 'quota a = m fra primitiva e testa', obbligatorio: false },
      { id: 'arco', testo: 'archi MC e M\'C sulla primitiva (accesso e recesso)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\overline{AB} = \\big(\\overline{AH_1} - \\overline{CH_1}\\big) + \\big(\\overline{BH_2} - \\overline{CH_2}\\big),\\qquad \\overline{AH_1} = \\sqrt{R_{t1}^2 - R_{f1}^2}',
    spiegazione: 'Il segmento dei contatti come differenza di tratti sulla retta di pressione, ciascuno da Pitagora sul triangolo rettangolo in H.',
    fonte: P166,
  },
  dimostrazioni: ['d080', 'd079', 'd138'],
  significato:
    'z_p dice quante coppie di denti si dividono in media il carico. Con z_p fra 1 e 2, per una parte dell\'ingranamento lavorano due coppie e per il resto una: la continuità del moto è garantita se z_p ≥ 1, e un valore più alto riduce i picchi di carico sul singolo dente. Dipende da θ e dai numeri di denti, non dal modulo.',
  fraseDaRicordare: 'Segmento AB sulla retta, arco AB/cos θ sulla primitiva, z_p = AB/(p cos θ) ≥ 1.',
  daNonDire: [
    { frase: 'z_p è il numero di denti della ruota.', perche: 'È il numero (medio) di coppie di denti contemporaneamente in presa: un numero fra 1 e 2 tipicamente.', fonte: P166 },
    { frase: 'z_p = AB/p.', perche: 'p è un arco di primitiva: va confrontato con l\'arco d\'azione AB/cos θ (o AB con il passo di base p cos θ).', fonte: P166 },
    { frase: 'AH₁ = √(R_t1² − R₁²).', perche: 'Il cateto perpendicolare alla retta è il raggio fondamentale R_f1 = R₁ cos θ, non quello primitivo.', fonte: P166 },
    { frase: 'Il passo di base è definito nella dispensa.', perche: 'La dispensa non lo nomina: il fattore p cos θ compare solo nella formula di z_p (NF-07, d138 come deduzione).', fonte: { tipo: 'deduzione', da: 'p. 166', spiegazione: 'p_b = p cos θ è implicito in z_p = AB/(p cos θ)' } },
  ],
  approfondimenti: [
    { domanda: 'Perché l\'arco d\'azione è AB/cos θ e non AB?', tipo: 'approfondimento', attesa: 'Il tratto BC sulla retta è uguale all\'arco RS svolto sulla fondamentale (la retta rotola senza strisciare); sulla primitiva lo stesso angolo sottende un arco più lungo di R₁/R_f1 = 1/cos θ: MC = BC/cos θ.', fonte: P166 },
    { domanda: 'Quanto vale z_p per due ruote da 20 denti con θ = 20°?', tipo: 'approfondimento', attesa: 'AC = BC = 10m(√(1,21 − cos²20°) − sin 20°) ≈ 2,30m, AB ≈ 4,60m; p cos θ = πm cos 20° ≈ 2,95m: z_p ≈ 1,56. Per circa metà del tempo lavorano due coppie.', fonte: { tipo: 'deduzione', da: 'p. 166', spiegazione: 'formula di AB con z₁ = z₂ = 20, θ = 20°' } },
    { domanda: 'Se raddoppio il modulo, quanti denti sono in presa?', tipo: 'approfondimento', attesa: 'Gli stessi: AB e p sono proporzionali a m, z_p dipende solo da θ, z₁, z₂.', fonte: { tipo: 'deduzione', da: 'p. 166', spiegazione: 'm si semplifica in AB/(p cos θ)' } },
    { domanda: 'Che cosa succede se A cade oltre H₂?', tipo: 'collegamento', argomento: 'c5-interferenza', attesa: 'La testa della ruota 1 lavora sotto la fondamentale della 2, dove il fianco non è evolvente: c\'è interferenza. Per evitarla A e B devono restare dentro H₁H₂, e questo dà il numero minimo di denti.', fonte: { tipo: 'dispensa', pag: 167 } },
    { domanda: 'Come aumentano i denti in presa nelle ruote elicoidali?', tipo: 'collegamento', argomento: 'c5-elicoidali-presa', attesa: 'Le linee di contatto sono inclinate di β: il contatto entra gradualmente lungo la larghezza b e la lunghezza effettiva diventa δ_e = δ + b tg β, quindi z_presa = δ/(p cos θ) + b tg β/(p cos θ): al valore dei denti dritti si aggiunge un termine.', fonte: { tipo: 'dispensa', pag: [186, 187] } },
  ],
  simboli: [
    { simbolo: 'A,\\ B', significato: 'estremi del segmento dei contatti (intersezioni della retta di pressione con le teste)' },
    { simbolo: 'R_t,\\ R,\\ R_f', significato: 'raggi di testa, primitivo, fondamentale', altrove: 'r_a, r_p, r_b in q24' },
    { simbolo: '\\ell', significato: 'arco d\'azione sulla primitiva (accesso MC + recesso M\'C)' },
    { simbolo: 'z_p', significato: 'numero di denti contemporaneamente in presa', altrove: 'n o ε_α (rapporto di ricoprimento) in q24, d079' },
    { simbolo: 'p,\\ p_b', significato: 'passo sulla primitiva e passo di base p cos θ (quest\'ultimo non nominato nella dispensa)' },
    { simbolo: '\\theta', significato: 'angolo di pressione', altrove: 'α in d079, d080, d138' },
    { simbolo: 'a', significato: 'addendum (a = m)', altrove: 'a = interasse in d080' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5a-ingranamento', params: { vista: 'presa' } }],
  previsioni: [
    {
      id: 'c5a-zp-20',
      domanda: 'Due ruote da 20 denti, θ = 20°. Quante coppie di denti sono in presa, in media?',
      opzioni: ['meno di 1', 'fra 1 e 2 (circa 1,6)', 'esattamente 2', 'più di 2'],
      corretta: 1,
      spiega: 'AB ≈ 4,60m e p_b = πm cos 20° ≈ 2,95m: z_p ≈ 1,56. Per circa metà del tempo lavorano due coppie.',
      verify: () => {
        const zp = ingranaggio({ z1: 20, z2: 20, m: 1, theta: 20 * DEG }).zp;
        return zp < 1 ? 0 : zp < 2 - 1e-9 ? 1 : Math.abs(zp - 2) < 1e-9 ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c5a-ingranamento', params: { vista: 'presa' } },
    },
    {
      id: 'c5a-zp-modulo',
      domanda: 'Raddoppio il modulo lasciando uguali z₁, z₂ e θ. Il numero di denti in presa…',
      opzioni: ['raddoppia', 'resta uguale', 'si dimezza'],
      corretta: 1,
      spiega: 'AB e il passo crescono entrambi con m: il rapporto non cambia.',
      verify: () => {
        const a = ingranaggio({ z1: 30, z2: 18, m: 2, theta: 20 * DEG }).zp, b = ingranaggio({ z1: 30, z2: 18, m: 4, theta: 20 * DEG }).zp;
        return Math.abs(a - b) < 1e-12 ? 1 : b > a ? 0 : 2;
      },
    },
  ],
  nf: ['NF-07', 'NF-11', 'NF-45'],
};
