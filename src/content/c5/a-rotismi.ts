/**
 * C5 parte a · Rotismi ordinari: rapporto globale, ruote solidali, ruota oziosa, coppie (domanda q14).
 * Dispensa pp. 171–173 (tools/testi/cap5a.md). Errori di segno delle coppie: NF-24.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { rotismoOrdinario } from '../../engine/c5a';
import { figRotismo } from './a-figure';

const zInt = (rnd: () => number, lo: number, hi: number) => Math.round(U(rnd, lo, hi));

// ------------------------------------------------------------------ d087 rapporto globale
export const d087: Dimostrazione = {
  id: 'd087',
  titolo: 'Rotismo ordinario: rapporto globale e coppia d\'uscita',
  enunciato: 'Per il rotismo ordinario 1–2, 3–4 con le ruote 2 e 3 solidali allo stesso albero, dimostrare che il rapporto globale è il prodotto dei rapporti dei singoli ingranaggi e ricavare la coppia d\'uscita, con la T.F.V. e con l\'equilibrio delle singole ruote.',
  ipotesi: [
    'assi di tutte le ruote fissi; verso positivo comune per tutte le ω (asse dei rotismi)',
    'regime (ω̇ᵢ = 0) e rendimento unitario per ogni ingranaggio (η_J = 1)',
    'stesso modulo per le ruote di ciascun ingranaggio (R = mz/2)',
  ],
  sample: (rnd) => {
    const z1 = zInt(rnd, 12, 80), z2 = zInt(rnd, 12, 80), z3 = zInt(rnd, 12, 80), z4 = zInt(rnd, 12, 80);
    const m = U(rnd, 1, 5), R1 = (m * z1) / 2, R2 = (m * z2) / 2, R3 = (m * z3) / 2, R4 = (m * z4) / 2;
    const w1 = U(rnd, 10, 300) * (rnd() < 0.5 ? -1 : 1), C1 = U(rnd, 5, 500) * Math.sign(w1);
    // cinematica dal contatto senza strisciamento delle primitive
    const w2 = (-w1 * R1) / R2, w3 = w2, w4 = (-w3 * R3) / R4;
    // equilibrio delle ruote (schema unifilare di p. 172, forze tangenziali Q lungo y)
    const Q21 = C1 / R1, Q12 = -Q21, Q43 = (-Q12 * R2) / R3, Q34 = -Q43, C4 = Q34 * R4;
    // variante di p. 173: 3–4 ingranaggio interno (corona 4)
    const w4i = (w3 * R3) / R4;
    const q21 = -C1 / R1, q12 = -q21, q43 = (q12 * R2) / R3, q34 = -q43, C4i = -q34 * R4;
    return { z1, z2, z3, z4, R1, R2, R3, R4, w1, w2, w3, w4, C1, C4, Q12, Q43, w4i, C4i, tau: w4 / w1, taui: w4i / w1 };
  },
  passi: [
    {
      id: 'd087.1',
      latex: '\\tau_J < 0\\ (\\text{ingranaggio esterno}),\\qquad \\tau_J > 0\\ (\\text{interno})',
      perche: 'Si sceglie un verso positivo comune per le velocità angolari di tutte le ruote e si dà un segno a ogni rapporto: negativo se le due ruote girano in versi opposti (esterne), positivo se nello stesso verso (interne). Lo schema unifilare mostra le ruote di profilo, con gli alberi e i supporti.',
      fonte: { tipo: 'dispensa', pag: 171 },
      distrattori: [],
    },
    {
      id: 'd087.2',
      latex: '\\tau_{1,2} = \\dfrac{\\omega_2}{\\omega_1} = -\\dfrac{R_1}{R_2} = -\\dfrac{z_1}{z_2}',
      perche: 'Primo ingranaggio esterno: le primitive rotolano senza strisciare.',
      fonte: { tipo: 'dispensa', pag: [171, 173] },
      distrattori: [],
      num: (v) => [v.w2 / v.w1, -v.z1 / v.z2],
    },
    {
      id: 'd087.3',
      latex: '\\omega_3 = \\omega_2',
      perche: 'Le ruote 2 e 3 sono calettate sullo stesso albero: ruotano insieme, con la stessa velocità angolare in modulo e verso. È il passaggio che fa «concatenare» i rapporti.',
      fonte: { tipo: 'dispensa', pag: [172, 173] },
      chiave: true,
      distrattori: [
        { latex: '\\omega_3 = -\\omega_2', errore: 'segno', spiega: 'Il cambio di verso c\'è solo fra due ruote che ingranano; due ruote solidali girano insieme.', num: (v) => [v.w3, -v.w2] },
        { latex: '\\omega_3 = \\omega_2\\,\\dfrac{z_2}{z_3}', errore: 'concetto', spiega: 'Fra 2 e 3 non c\'è un ingranamento: hanno denti diversi ma la stessa ω.', num: (v) => [v.w3, (v.w2 * v.z2) / v.z3] },
      ],
      num: (v) => [v.w3, v.w2],
    },
    {
      id: 'd087.4',
      latex: '\\tau_{3,4} = \\dfrac{\\omega_4}{\\omega_3} = -\\dfrac{z_3}{z_4} = \\dfrac{\\omega_4}{\\omega_2}',
      perche: 'Secondo ingranaggio esterno; con $\\omega_3 = \\omega_2$ lo si può scrivere con $\\omega_2$.',
      fonte: { tipo: 'dispensa', pag: 173 },
      distrattori: [],
      num: (v) => [v.w4 / v.w3, -v.z3 / v.z4],
    },
    {
      id: 'd087.5',
      latex: '\\tau = \\dfrac{\\omega_4}{\\omega_1} = \\dfrac{\\omega_4}{\\omega_3}\\,\\dfrac{\\omega_2}{\\omega_1} = \\tau_{1,2}\\,\\tau_{3,4} = \\dfrac{z_1 z_3}{z_2 z_4} > 0',
      perche: 'Si moltiplica e divide per $\\omega_2 = \\omega_3$: il rapporto globale è il prodotto dei rapporti dei singoli ingranaggi. Due ingranaggi esterni danno un segno positivo: la ruota 4 gira come la 1.',
      fonte: { tipo: 'dispensa', pag: [172, 173] },
      chiave: true,
      distrattori: [
        { latex: '\\tau = \\tau_{1,2} + \\tau_{3,4}', errore: 'concetto', spiega: 'Le riduzioni si concatenano: ogni ingranaggio moltiplica la velocità per il suo rapporto.', num: (v) => [v.tau, -v.z1 / v.z2 - v.z3 / v.z4] },
        { latex: '\\tau = -\\dfrac{z_1 z_3}{z_2 z_4}', errore: 'segno', spiega: 'Il prodotto di due rapporti negativi è positivo: con due ingranaggi esterni uscita e ingresso girano nello stesso verso.', num: (v) => [v.tau, (-v.z1 * v.z3) / (v.z2 * v.z4)] },
        { latex: '\\tau = \\dfrac{z_2 z_4}{z_1 z_3}', errore: 'convenzione', spiega: 'È i = ω₁/ω₄ delle fonti derivate (NF-09): nella dispensa le motrici stanno al numeratore.', num: (v) => [v.tau, (v.z2 * v.z4) / (v.z1 * v.z3)] },
      ],
      num: (v) => [v.tau, (v.z1 * v.z3) / (v.z2 * v.z4)],
    },
    {
      id: 'd087.6',
      latex: '\\underline{C_1}\\cdot\\underline{\\omega_1} + \\underline{C_4}\\cdot\\underline{\\omega_4} = 0 \\;\\Rightarrow\\; C_{4z} = -C_{1z}\\,\\dfrac{\\omega_1}{\\omega_4} = -\\dfrac{C_{1z}}{\\tau}',
      perche: 'T.F.V. in regime e senza perdite: la potenza entra dall\'albero 1 ed esce tutta dall\'albero 4 (le coppie sull\'albero intermedio sono interne). Con τ > 0, $C_4$ ha verso opposto a $C_1$; in modulo un riduttore di giri è un moltiplicatore di coppia.',
      fonte: { tipo: 'dispensa', pag: 172 },
      chiave: true,
      correzione: { nf: 'NF-24', dispensaScrive: 'C_4 = -C_1\\frac{\\omega_1}{\\omega_4} = -C_1\\,\\tau^{1,4}' },
      distrattori: [
        { latex: 'C_{4z} = -C_{1z}\\,\\tau', errore: 'fattore', spiega: 'È la riga di p. 172 (NF-24): ω₁/ω₄ = 1/τ, quindi la coppia si divide per τ.', num: (v) => [v.C4, -v.C1 * v.tau] },
        { latex: 'C_{4z} = \\dfrac{C_{1z}}{\\tau}', errore: 'segno', spiega: 'Una potenza entra e una esce: C₁ω₁ e C₄ω₄ hanno segno opposto.', num: (v) => [v.C4, v.C1 / v.tau] },
      ],
      num: (v) => [v.C4, -v.C1 / v.tau],
    },
    {
      id: 'd087.7',
      latex: 'C_{1z} - Q^{2,1}R_1 = 0,\\quad Q^{1,2}R_2 + Q^{4,3}R_3 = 0,\\quad C_{4z} - Q^{3,4}R_4 = 0,\\quad Q^{1,2} = -Q^{2,1},\\ Q^{3,4} = -Q^{4,3}',
      perche: 'Secondo metodo: equilibrio alla rotazione di ogni albero nello schema unifilare, «ponendo tutto positivo» lungo y. Solo le componenti tangenziali Q danno momento: la radiale $R_{2,1}$ passa per l\'asse. Sull\'albero intermedio non c\'è coppia esterna. Azione e reazione legano le Q delle coppie di ruote.',
      fonte: { tipo: 'dispensa', pag: 172 },
      distrattori: [],
      num: (v) => [v.Q12 * v.R2 + v.Q43 * v.R3, 0],
    },
    {
      id: 'd087.8',
      latex: 'Q^{2,1} = \\dfrac{C_{1z}}{R_1} = -\\dfrac{C_{4z}}{R_4}\\dfrac{R_3}{R_2} \\;\\Rightarrow\\; C_{4z} = -C_{1z}\\,\\dfrac{R_2R_4}{R_1R_3} = -\\dfrac{C_{1z}}{\\tau}',
      perche: 'Si risolvono le equazioni in catena: lo stesso risultato della T.F.V. Il fattore $R_2R_4/(R_1R_3)$ è $1/\\tau$, non τ.',
      fonte: { tipo: 'dispensa', pag: 172 },
      correzione: { nf: 'NF-24', dispensaScrive: 'C_4 = -C_1\\underbrace{\\frac{R_2}{R_3}\\frac{R_4}{R_1}}_{\\tau_{1,4}}' },
      distrattori: [],
      num: (v) => [v.C4, (-v.C1 * v.R2 * v.R4) / (v.R1 * v.R3)],
    },
    {
      id: 'd087.9',
      latex: '3\\text{–}4\\ \\text{interno:}\\ \\tau = \\Big(\\dfrac{R_3}{R_4}\\Big)\\Big(-\\dfrac{R_1}{R_2}\\Big) = -\\dfrac{z_1 z_3}{z_2 z_4},\\qquad C_4 = C_1\\dfrac{R_2R_4}{R_1R_3} = -\\dfrac{C_1}{\\tau}',
      perche: 'Se l\'ultima ruota è una corona a dentatura interna, il suo rapporto è positivo e il globale cambia segno: ora la 4 gira al contrario della 1, e la coppia d\'uscita ha lo stesso verso di $C_1$. La relazione $C_4 = -C_1/\\tau$ resta vera.',
      fonte: { tipo: 'dispensa', pag: 173 },
      distrattori: [],
      num: (v) => [v.C4i, -v.C1 / v.taui],
    },
  ],
  risultato: { latex: '\\tau = \\dfrac{\\omega_u}{\\omega_1} = \\prod_J \\tau_J = \\dfrac{z_1 z_3}{z_2 z_4},\\qquad C_u = -\\dfrac{C_1}{\\tau}', fonte: { tipo: 'dispensa', pag: [172, 173] }, correzione: { nf: 'NF-24', dispensaScrive: 'C_4 = -C_1\\,\\tau^{1,4}' } },
  gancio: 'Ruote solidali, stessa ω: i rapporti si moltiplicano; la coppia d\'uscita è −C₁/τ.',
};

// ------------------------------------------------------------------ d088 ruota oziosa
export const d088: Dimostrazione = {
  id: 'd088',
  titolo: 'Ruota oziosa: effetto sul rapporto e sulle coppie',
  enunciato: 'Una ruota b ingrana contemporaneamente con a e con c. Mostrare che il rapporto fra a e c non dipende da z_b ma cambia segno, e ricavare la coppia sulla ruota c.',
  ipotesi: ['tre ruote esterne in fila, b folle sul suo albero (nessuna coppia esterna)', 'regime, η = 1'],
  sample: (rnd) => {
    const za = zInt(rnd, 12, 80), zb = zInt(rnd, 12, 80), zc = zInt(rnd, 12, 80), zb2 = zb + zInt(rnd, 3, 40), m = U(rnd, 1, 5);
    const Ra = (m * za) / 2, Rb = (m * zb) / 2, Rc = (m * zc) / 2, Rb2 = (m * zb2) / 2;
    const wa = U(rnd, 10, 300), C1 = U(rnd, 5, 500);
    const wb = (-wa * Ra) / Rb, wc = (-wb * Rb) / Rc;
    const wc2 = (-((-wa * Ra) / Rb2) * Rb2) / Rc; // con un\'altra oziosa
    const wcDiretta = (-wa * Ra) / Rc; // a ingrana direttamente con c
    // equilibrio: a) C₁ + R_a Q^{b,a} = 0; b) −R_b Q^{a,b} + R_b Q^{c,b} = 0; c) C₃ − R_c Q^{b,c} = 0
    const Qba = -C1 / Ra, Qab = -Qba, Qcb = Qab, Qbc = -Qcb, C3 = Rc * Qbc;
    return { za, zb, zc, Ra, Rb, Rc, wa, wb, wc, wc2, wcDiretta, C1, C3, tau: wc / wa, xac: Ra + 2 * Rb + Rc };
  },
  passi: [
    {
      id: 'd088.1',
      latex: '\\tau_{a,b} = \\dfrac{\\omega_b}{\\omega_a} = -\\dfrac{z_a}{z_b},\\qquad \\tau_{b,c} = \\dfrac{\\omega_c}{\\omega_b} = -\\dfrac{z_b}{z_c}',
      perche: 'Due ingranaggi esterni in serie, con la ruota b in comune.',
      fonte: { tipo: 'dispensa', pag: 173 },
      distrattori: [],
      num: (v) => [v.wb / v.wa, -v.za / v.zb],
    },
    {
      id: 'd088.2',
      latex: '\\tau = \\tau_{a,b}\\,\\tau_{b,c} = \\Big(-\\dfrac{z_a}{z_b}\\Big)\\Big(-\\dfrac{z_b}{z_c}\\Big) = \\dfrac{\\omega_c}{\\omega_a} = \\dfrac{z_a}{z_c} > 0',
      perche: 'Il rapporto globale è il prodotto: $z_b$ compare al denominatore del primo e al numeratore del secondo, e si semplifica. Restano i denti della prima e dell\'ultima ruota, con segno positivo: c gira come a.',
      fonte: { tipo: 'dispensa', pag: 173 },
      chiave: true,
      distrattori: [
        { latex: '\\tau = -\\dfrac{z_a}{z_c}', errore: 'segno', spiega: 'Due ingranaggi esterni: due segni meno, prodotto positivo. Senza oziosa sarebbe −z_a/z_c.', num: (v) => [v.tau, -v.za / v.zc] },
        { latex: '\\tau = \\dfrac{z_b}{z_c}', errore: 'indice', spiega: 'Il rapporto è fra prima e ultima ruota: z_b si semplifica, resta z_a.', num: (v) => [v.tau, v.zb / v.zc] },
      ],
      num: (v) => [v.tau, v.za / v.zc],
    },
    {
      id: 'd088.3',
      latex: '\\tau(z_b) = \\tau(z_b\') = \\dfrac{z_a}{z_c}',
      perche: 'Cambiando i denti della ruota oziosa il rapporto non cambia: la ruota intermedia non altera il valore del rapporto, solo il suo segno.',
      fonte: { tipo: 'dispensa', pag: 173 },
      distrattori: [],
      num: (v) => [v.wc / v.wa, v.wc2 / v.wa],
    },
    {
      id: 'd088.4',
      latex: 'C_1\\omega_a + C_3\\omega_c = 0 \\;\\Rightarrow\\; \\dfrac{C_3}{C_1} = -\\dfrac{\\omega_a}{\\omega_c} = -\\dfrac{1}{\\tau}',
      perche: 'T.F.V. in regime: la ruota oziosa non riceve coppie esterne, la potenza passa da a a c. La coppia su c ha verso opposto a $C_1$ (τ > 0) e modulo $|C_1|z_c/z_a$. Lo conferma l\'equilibrio delle tre ruote con le forze tangenziali.',
      fonte: { tipo: 'dispensa', pag: 173 },
      chiave: true,
      correzione: { nf: 'NF-24', dispensaScrive: '\\frac{C_3}{C_1} = \\frac{\\omega_a}{\\omega_c} = \\frac{1}{\\tau}' },
      distrattori: [
        { latex: '\\dfrac{C_3}{C_1} = \\dfrac{1}{\\tau}', errore: 'segno', spiega: 'È la riga di p. 173 (NF-24): da C₁ω_a + C₃ω_c = 0 il segno meno resta.', num: (v) => [v.C3 / v.C1, 1 / v.tau] },
        { latex: '\\dfrac{C_3}{C_1} = -\\tau', errore: 'indice', spiega: 'Le coppie stanno come l\'inverso delle velocità: C₃/C₁ = −ω_a/ω_c.', num: (v) => [v.C3 / v.C1, -v.tau] },
      ],
      num: (v) => [v.C3 / v.C1, -1 / v.tau],
    },
    {
      id: 'd088.5',
      latex: '\\text{senza oziosa:}\\ \\tau\' = -\\dfrac{z_a}{z_c} \\;\\Rightarrow\\; |\\tau\'| = |\\tau|',
      perche: 'Se a ingranasse direttamente con c il rapporto avrebbe lo stesso modulo e segno opposto: la ruota oziosa serve a invertire il verso dell\'uscita.',
      fonte: { tipo: 'deduzione', da: 'p. 173 (la ruota intermedia cambia solo il segno)', spiegazione: 'confronto con l\'ingranaggio diretto a–c' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [Math.abs(v.wcDiretta / v.wa), Math.abs(v.tau)],
    },
    {
      id: 'd088.6',
      latex: 'i_{a,c} = R_a + 2R_b + R_c',
      perche: 'Con le tre ruote in fila l\'interasse fra a e c dipende da $R_b$: scegliendo $z_b$ si può collegare due alberi lontani senza cambiare il modulo del rapporto (lo dicono le fonti derivate; la dispensa parla solo del verso).',
      fonte: { tipo: 'deduzione', da: 'p. 173 e i = R₁ + R₂ (p. 167) applicato ai due ingranaggi', spiegazione: 'somma dei due interassi a–b e b–c con i centri allineati (NF-190)' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.xac, v.Ra + 2 * v.Rb + v.Rc],
    },
  ],
  risultato: { latex: '\\tau = \\dfrac{\\omega_c}{\\omega_a} = \\dfrac{z_a}{z_c}\\ (\\text{indipendente da } z_b),\\qquad C_3 = -\\dfrac{C_1}{\\tau}', fonte: { tipo: 'dispensa', pag: 173 }, correzione: { nf: 'NF-24', dispensaScrive: '\\frac{C_3}{C_1} = \\frac{1}{\\tau}' } },
  gancio: 'La oziosa sta sopra e sotto la frazione: si semplifica, resta solo il segno cambiato.',
};

// ------------------------------------------------------------------ argomento
export const rotismiOrdinari: ArgomentoContenuto = {
  id: 'c5-rotismi-ordinari',
  cosaDireSubito:
    'Un rotismo è ordinario se tutti gli assi delle ruote sono fissi. Scelgo un verso positivo comune per le ω e do un segno a ogni rapporto: negativo per gli ingranaggi esterni, positivo per quelli interni. Le ruote calettate sullo stesso albero hanno la stessa ω, quindi il rapporto globale è il prodotto dei rapporti: τ = ω_u/ω₁ = Π τ_J; dalla T.F.V. in regime la coppia d\'uscita è C_u = −C₁/τ. Una ruota oziosa cambia solo il segno.',
  sistemaIpotesi: [
    'Assi fissi; verso positivo comune per tutte le velocità angolari.',
    'Ingranaggi in serie; ruote intermedie solidali allo stesso albero (stessa ω).',
    'Regime (ω̇ = 0) e rendimento unitario per le coppie: T.F.V. C₁ω₁ + C_uω_u = 0.',
  ],
  disegno: {
    svg: figRotismo(),
    didascalia: 'Rotismo ordinario a quattro ruote (p. 173): 1 ingrana con 2, 3 è solidale a 2 e ingrana con 4; sotto, lo schema unifilare (pp. 171–172).',
    fonte: { tipo: 'dispensa', pag: [171, 173], fig: 'schizzi manoscritti e schema unifilare' },
    elementi: [
      { id: 'ruote', testo: 'ruote 1, 2, 3, 4 con i loro assi fissi; 2 e 3 sullo stesso albero', obbligatorio: true },
      { id: 'versi', testo: 'versi di rotazione alternati a ogni ingranaggio esterno; ω₂ = ω₃', obbligatorio: true },
      { id: 'coppie', testo: 'coppia motrice C₁ e coppia d\'uscita C₄ (verso opposto se τ > 0)', obbligatorio: true },
      { id: 'unifilare', testo: 'schema unifilare: alberi, ruote come segmenti, supporti', obbligatorio: true },
      { id: 'forze', testo: 'forze tangenziali Q nei contatti (azione e reazione), radiali a momento nullo', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\tau = \\dfrac{\\omega_4}{\\omega_1} = \\dfrac{\\omega_4}{\\omega_3}\\,\\dfrac{\\omega_2}{\\omega_1}\\ \\ (\\omega_3 = \\omega_2),\\qquad C_1\\omega_1 + C_4\\omega_4 = 0',
    spiegazione: 'Catena dei rapporti attraverso l\'albero comune; T.F.V. in regime senza perdite per le coppie.',
    fonte: { tipo: 'dispensa', pag: [172, 173] },
  },
  dimostrazioni: ['d087', 'd088'],
  significato:
    'Il rotismo ordinario permette rapporti grandi con ruote di dimensioni ragionevoli: ogni ingranaggio moltiplica la riduzione. Il segno del rapporto dice se l\'uscita gira come l\'ingresso. Senza perdite la potenza si conserva: dove la velocità si riduce la coppia cresce dello stesso fattore, e il suo verso segue dal segno di τ.',
  fraseDaRicordare: 'τ = Π τ_J con il segno (− per ogni esterno), ruote solidali con la stessa ω, C_u = −C₁/τ; la oziosa cambia solo il segno.',
  daNonDire: [
    { frase: 'C₄ = −C₁ τ.', perche: 'Da C₁ω₁ + C₄ω₄ = 0 viene C₄ = −C₁ω₁/ω₄ = −C₁/τ (NF-24: la dispensa scrive −C₁τ^{1,4} a p. 172).', fonte: { tipo: 'dispensa', pag: 172 } },
    { frase: 'Con la ruota oziosa C₃/C₁ = 1/τ.', perche: 'Manca il segno: C₃/C₁ = −1/τ (NF-24).', fonte: { tipo: 'dispensa', pag: 173 } },
    { frase: 'Le ruote 2 e 3 hanno velocità opposte.', perche: 'Sono solidali allo stesso albero: ω₃ = ω₂. Il verso cambia solo dove due ruote ingranano.', fonte: { tipo: 'dispensa', pag: 172 } },
    { frase: 'Il rapporto globale è la somma dei rapporti.', perche: 'È il prodotto: le velocità si trasformano in cascata.', fonte: { tipo: 'dispensa', pag: 173 } },
    { frase: 'i = ω₁/ω_u.', perche: 'Nella dispensa τ = ω_uscita/ω_entrata con segno (NF-09); con il reciproco tutte le formule si capovolgono.', fonte: { tipo: 'dispensa', pag: 171 } },
  ],
  approfondimenti: [
    { domanda: 'Perché due ruote solidali allo stesso albero non cambiano il verso?', tipo: 'approfondimento', attesa: 'Sono un unico corpo rigido: stessa velocità angolare. Il segno cambia solo in un ingranamento esterno, dove le velocità periferiche nel punto primitivo sono uguali e i centri stanno da parti opposte.', fonte: { tipo: 'dispensa', pag: 172 } },
    { domanda: 'Ricava la coppia d\'uscita senza la T.F.V.', tipo: 'approfondimento', attesa: 'Equilibrio di ogni albero: C₁ − Q^{2,1}R₁ = 0, Q^{1,2}R₂ + Q^{4,3}R₃ = 0, C₄ − Q^{3,4}R₄ = 0, con Q^{1,2} = −Q^{2,1}, Q^{3,4} = −Q^{4,3}; risolvendo C₄ = −C₁R₂R₄/(R₁R₃) = −C₁/τ. Le radiali non danno momento.', fonte: { tipo: 'dispensa', pag: 172 } },
    { domanda: 'Che cosa cambia se l\'ultima ruota è una corona interna?', tipo: 'approfondimento', attesa: 'Il suo rapporto è positivo: τ = (R₃/R₄)(−R₁/R₂) = −z₁z₃/(z₂z₄), la 4 gira al contrario della 1; resta C₄ = −C₁/τ, quindi C₄ ha il verso di C₁.', fonte: { tipo: 'dispensa', pag: 173 } },
    { domanda: 'E se il rotismo accelera?', tipo: 'collegamento', argomento: 'c6-trasmissione', attesa: 'Nella T.F.V. entra la variazione d\'energia cinetica: riportando le inerzie all\'albero d\'ingresso I_eq = I₁ + I₂τ₂₁² + … e C₁ + C_uτ = I_eq ω̇₁. La dispensa lo fa nel capitolo 6, non qui (NF-07).', fonte: { tipo: 'deduzione', da: 'p. 172 (T.F.V. in regime) estesa con dE_c/dt', spiegazione: 'q14 lo chiede; nelle pp. 171–173 c\'è solo il regime' } },
    { domanda: 'Che differenza c\'è con un rotismo epicicloidale?', tipo: 'collegamento', argomento: 'c5-epicicloidali', attesa: 'Nell\'epicicloidale alcuni assi (dei satelliti) sono mobili, portati dal portatreno: il rapporto si ottiene con la formula di Willis, osservando il rotismo dal portatreno, dove diventa ordinario.', fonte: { tipo: 'dispensa', pag: [171, 174] } },
    { domanda: 'Come entrano le perdite?', tipo: 'collegamento', argomento: 'c5-rendimento-ordinario', attesa: 'Con un rendimento per ingranaggio: η C₁ω₁ + C₂ω₂ = 0, quindi C₁/C₂ = −τ/η; per una cascata in serie η_tot = η_I η_II η_III.', fonte: { tipo: 'dispensa', pag: [181, 184] } },
  ],
  simboli: [
    { simbolo: '\\tau = \\omega_u/\\omega_1', significato: 'rapporto globale (uscita/entrata) con segno', altrove: 'i = ω₁/ω₂ in d087, d088; τ_g in q14' },
    { simbolo: '\\tau_{a,b},\\ \\tau_{1,4}', significato: 'rapporto dalla ruota a alla b: ω_b/ω_a', altrove: 'la dispensa scrive anche τ^{4,3} = ω₄/ω₃ (indici invertiti, NF-24)' },
    { simbolo: 'C_1,\\ C_4', significato: 'coppia motrice e coppia d\'uscita (componenti lungo l\'asse)', altrove: 'C_i, C_u in q14' },
    { simbolo: 'Q^{2,1},\\ R_{2,1}', significato: 'forza tangenziale e radiale della ruota 2 sulla 1' },
    { simbolo: '1,2,3,4 \\ \\text{e}\\ a,b,c,d', significato: 'numerazione delle ruote a p. 172 e a p. 173' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5a-rotismo' }],
  previsioni: [
    {
      id: 'c5a-oziosa',
      domanda: 'Fra una ruota a da 20 denti e una c da 40 inserisco una ruota oziosa da 55 denti. Il rapporto ω_c/ω_a vale…',
      opzioni: ['−1/2', '+1/2', '+20/55', '−55/40'],
      corretta: 1,
      spiega: '(−20/55)(−55/40) = +1/2: i denti dell\'oziosa si semplificano, resta il segno positivo.',
      verify: () => {
        const t = rotismoOrdinario([{ zMotrice: 20, zCondotta: 55 }, { zMotrice: 55, zCondotta: 40 }]).tau;
        return [-0.5, 0.5, 20 / 55, -55 / 40].findIndex((x) => Math.abs(x - t) < 1e-12);
      },
      visual: { kind: 'meccanismo', id: 'c5a-rotismo' },
    },
    {
      id: 'c5a-coppia-uscita',
      domanda: 'Rotismo con τ = 1/6 (due ingranaggi esterni), coppia motrice C₁ = 10 N·m. La coppia d\'uscita C₄ vale…',
      opzioni: ['−60 N·m', '+60 N·m', '−10/6 N·m', '+10/6 N·m'],
      corretta: 0,
      spiega: 'C₄ = −C₁/τ = −60 N·m: riduttore di giri, moltiplicatore di coppia; il segno meno dice che la coppia d\'uscita è opposta a C₁ (resistente sull\'albero che gira come l\'ingresso).',
      verify: () => {
        const r = rotismoOrdinario([{ zMotrice: 15, zCondotta: 30 }, { zMotrice: 12, zCondotta: 36 }], 10);
        return [-60, 60, -10 / 6, 10 / 6].findIndex((x) => Math.abs(x - r.Cout) < 1e-9);
      },
      visual: { kind: 'meccanismo', id: 'c5a-rotismo' },
    },
  ],
  nf: ['NF-07', 'NF-09', 'NF-24', 'NF-184', 'NF-190'],
};
