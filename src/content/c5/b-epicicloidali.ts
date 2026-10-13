/**
 * C5 parte b · Rotismi epicicloidali (domande q29, q30): Willis, velocità del satellite, coppie, rotismo combinato.
 * Dispensa pp. 174–175 (Willis, riduttori), 179 (coppie), 180 (rotismo combinato). Dimostrazioni d089, d090, d091, d094.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { arrow, circle, dim, dot, line, rot, svg, text } from '../svg';
import { epicicloidale } from '../../engine/c5b';

// ------------------------------------------------------------------ disegno (schizzo di p. 175, riduttore a corona fissa)
function disegno() {
  const cx = 160, cy = 200, r1 = 34, r2 = 34, r3 = r1 + 2 * r2;
  const o2y = cy - r1 - r2, c12y = cy - r1, c23y = cy - r3;
  const parts: string[] = [];
  parts.push(circle(cx, cy, r3, 'l'));
  // corona fissa: tratteggio di telaio sul bordo esterno destro
  for (let a = -50; a <= 50; a += 10) {
    const t = (a * Math.PI) / 180;
    const x1 = cx + r3 * Math.cos(t), y1 = cy - r3 * Math.sin(t);
    parts.push(line(x1, y1, x1 + 9 * Math.cos(t) + 5, y1 - 9 * Math.sin(t) + 5, 'g', 1));
  }
  parts.push(
    circle(cx, cy, r1, 'l'), circle(cx, o2y, r2, 'l'),
    line(cx, cy, cx, o2y, 'l', 4), // portatreno
    dot(cx, cy, 'O₁', -18, -2), dot(cx, o2y, 'O₂', -16, 0),
    dot(cx, c12y, '', 0, 0, 'a'), dot(cx, c23y, '', 0, 0, 'a'),
    text(cx - 30, c12y + 2, 'C₁,₂', { c: 'a', size: 13 }), text(cx + 40, c23y - 12, 'C₂,₃ (CIR)', { c: 'a', size: 13 }),
    text(cx + 18, cy + 18, '1', { size: 15 }), text(cx + 22, o2y - 10, '2', { size: 15 }), text(cx + r3 - 18, cy + 50, '3 corona fissa', { size: 13, anchor: 'end' }),
    text(cx - 14, o2y + 18, 'P', { size: 13, c: 'm' }),
    // profilo delle velocità sulla verticale (triangolo con vertice nel CIR)
    arrow(cx, c12y, cx + 72, c12y, 'v', 'ω₁R₁', 22, 12),
    arrow(cx, o2y, cx + 36, o2y, 'v', 'V_O₂', 26, -10),
    line(cx, c23y, cx + 72, c12y, 'd'),
    rot(cx, cy, 20, -20, -160, 'v', 'ω₁'),
    rot(cx, cy, r3 + 16, 150, 122, 'v', 'Ω'),
    dim(cx - r3, cy + r3 + 8, cx, cy + r3 + 8, 'R₃ = R₁ + 2R₂', 14),
  );
  return svg(330, 340, parts, 'Riduttore epicicloidale: solare 1, satellite 2 sul portatreno P, corona 3 fissa, profilo delle velocità');
}

// ------------------------------------------------------------------ d089 formula di Willis
const P174 = { tipo: 'dispensa', pag: 174 } as const;

export const d089: Dimostrazione = {
  id: 'd089',
  titolo: 'Formula di Willis',
  enunciato: 'Ricavare la relazione fra le velocità angolari dei solari e del portatreno di un rotismo epicicloidale, osservando il moto relativo al portatreno, e applicarla al rotismo con satellite doppio e al riduttore a corona fissa.',
  ipotesi: [
    'solari 1 e 2 e portatreno ruotano attorno allo stesso asse fisso; velocità angolari con segno nello stesso riferimento',
    'i satelliti hanno l\'asse portato dal portatreno; ingranamenti senza strisciamento sulle primitive',
    'ruote rigide; nel rotismo con satellite doppio le ruote 3 e 4 sono solidali (ω₃ = ω₄)',
  ],
  sample: (rnd) => {
    const m = U(rnd, 1, 4), z1 = U(rnd, 15, 40), z3 = U(rnd, 15, 40), z4 = U(rnd, 12, 25);
    const z2 = z1 + z3 - z4; // stesso modulo: z1 + z3 = z2 + z4
    const w1 = U(rnd, 60, 160), W = U(rnd, -40, 40);
    // moto relativo al portatreno: catena 1 → 3 (esterno), 3 = 4 solidali, 4 → 2 (esterno)
    const w1r = w1 - W, w3r = -(z1 / z3) * w1r, w4r = w3r, w2r = -(z4 / z2) * w4r;
    const w2 = w2r + W, w3 = w3r + W, w4 = w4r + W;
    const R1 = (m * z1) / 2, R2 = (m * z2) / 2, R3 = (m * z3) / 2, R4 = (m * z4) / 2;
    // riduttore di p. 175 (indici della dispensa: 1 solare, 2 satellite, 3 corona), R₂ = R₁
    const Rs = U(rnd, 0.02, 0.1), Rc = 3 * Rs, tc = -Rs / Rc;
    const Wc = (w1 * tc) / (tc - 1);
    return { m, z1, z2, z3, z4, w1, w2, w3, w4, W, w1r, w2r, w3r, w4r, R1, R2, R3, R4, Rs, Rc, tc, Wc, tauW: w2r / w1r };
  },
  passi: [
    {
      id: 'd089.1',
      latex: '\\underline{\\omega_1} = \\underline{\\omega^{Rel}_{1,P}} + \\underline{\\Omega} \\;\\Rightarrow\\; \\omega^{Rel}_{1,P} = \\omega_1 - \\Omega',
      perche: 'Composizione dei moti: la velocità angolare assoluta del solare è la sua velocità relativa al portatreno più quella di trascinamento, che è la velocità $\\Omega$ del portatreno. Tutti gli assi sono paralleli, quindi i vettori si sommano come scalari con segno.',
      fonte: P174,
      distrattori: [],
      num: (v) => [v.w1, v.w1r + v.W],
    },
    {
      id: 'd089.2',
      latex: '\\omega^{Rel}_{2,P} = \\omega_2 - \\Omega, \\qquad \\Omega^{Rel}_{P,P} = \\Omega - \\Omega = 0',
      perche: 'Lo stesso per l\'altro solare. Il portatreno, visto da sé stesso, è fermo: nel moto relativo gli assi dei satelliti sono fissi e il rotismo è diventato ordinario.',
      fonte: P174,
      distrattori: [],
      num: (v) => [v.w2r, v.w2 - v.W],
    },
    {
      id: 'd089.3',
      latex: '\\tau_W = \\dfrac{\\omega^{Rel}_{2,P}}{\\omega^{Rel}_{1,P}} = \\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega}',
      perche: 'Rapporto di trasmissione del rotismo **reso ordinario** (ad assi fissi), con la convenzione di sempre: uscita al numeratore, entrata al denominatore, con segno. Si calcola come per un rotismo ordinario, con i numeri di denti.',
      fonte: P174,
      chiave: true,
      distrattori: [
        { latex: '\\tau_W = \\dfrac{\\omega_1 - \\Omega}{\\omega_2 - \\Omega}', errore: 'convenzione', spiega: 'È la forma di d089 (entrata al numeratore): vale il reciproco. Con la convenzione della dispensa il numeratore è la ruota d\'uscita (NF-09).', num: (v) => [v.tauW, v.w1r / v.w2r] },
        { latex: '\\tau_W = \\dfrac{\\omega_2}{\\omega_1}', errore: 'concetto', spiega: 'Il rapporto delle velocità assolute non dipende solo dai denti: il rapporto «ordinario» vale solo per le velocità relative al portatreno.', num: (v) => [v.tauW, v.w2 / v.w1] },
        { latex: '\\tau_W = \\dfrac{\\omega_2 + \\Omega}{\\omega_1 + \\Omega}', errore: 'segno', spiega: 'Per passare al moto relativo la velocità di trascinamento si sottrae, non si somma.', num: (v) => [v.tauW, (v.w2 + v.W) / (v.w1 + v.W)] },
      ],
      num: (v) => [(v.w2 - v.W) / (v.w1 - v.W), v.w2r / v.w1r],
    },
    {
      id: 'd089.4',
      latex: '\\text{2 g.d.l.: } \\tau_W(\\omega_1 - \\Omega) = \\omega_2 - \\Omega \\text{ è una sola equazione in } \\omega_1,\\ \\omega_2,\\ \\Omega',
      perche: 'Tre alberi collegano il rotismo al resto della macchina: due motori e uno condotto, uno motore e due condotti, oppure uno fermo, uno motore e uno condotto. Servono due dati per conoscere la terza velocità.',
      fonte: { tipo: 'dispensa', pag: [174, 175] },
      distrattori: [],
    },
    {
      id: 'd089.5',
      latex: '\\tau_W = \\dfrac{\\omega_2 - \\Omega}{\\omega_4 - \\Omega}\\cdot\\dfrac{\\omega_3 - \\Omega}{\\omega_1 - \\Omega} = \\left(-\\dfrac{z_4}{z_2}\\right)\\left(-\\dfrac{z_1}{z_3}\\right) = \\dfrac{z_1}{z_3}\\,\\dfrac{z_4}{z_2}',
      perche: 'Rotismo di Fig. 5-47 a): a portatreno fermo è un ordinario 1 → 3, 3 solidale a 4 ($\\omega_3 = \\omega_4$), 4 → 2. Due ingranamenti esterni: due segni meno, $\\tau_W > 0$.',
      fonte: P174,
      chiave: true,
      distrattori: [
        { latex: '\\tau_W = -\\dfrac{z_1 z_4}{z_3 z_2}', errore: 'segno', spiega: 'Gli ingranamenti esterni sono due: i due segni meno si compensano.', num: (v) => [v.tauW, -(v.z1 * v.z4) / (v.z3 * v.z2)] },
        { latex: '\\tau_W = \\dfrac{z_3 z_2}{z_1 z_4}', errore: 'indice', spiega: 'In ogni ingranamento il rapporto uscita/entrata è z_entrata/z_uscita: qui i denti sono capovolti.', num: (v) => [v.tauW, (v.z3 * v.z2) / (v.z1 * v.z4)] },
        { latex: '\\tau_W = -\\dfrac{z_1}{z_2}', errore: 'termine-perso', spiega: 'I solari 1 e 2 non ingranano tra loro: in mezzo c\'è il satellite doppio 3–4, che conta.', num: (v) => [v.tauW, -v.z1 / v.z2] },
      ],
      num: (v) => [v.tauW, ((v.z1 / v.z3) * v.z4) / v.z2],
    },
    {
      id: 'd089.6',
      latex: 'R_1 + R_3 = R_2 + R_4 \\;\\Rightarrow\\; z_1 + z_3 = z_2 + z_4 \\ (\\text{stesso modulo})',
      perche: 'Condizione geometrica: i due ingranamenti hanno lo stesso interasse, perché i solari sono coassiali e i satelliti stanno sullo stesso perno. Con modulo unico $R = m z/2$. Nel rotismo b) con corona: $R_2 = R_1 + 2R_3$.',
      fonte: P174,
      distrattori: [],
      num: (v) => [v.R1 + v.R3, v.R2 + v.R4],
    },
    {
      id: 'd089.7',
      latex: '\\omega_3 = 0,\\ \\tau_W = -\\dfrac{R_1}{R_3} = -\\dfrac13 \\;\\Rightarrow\\; (\\omega_1 - \\Omega)\\tau_W = -\\Omega \\;\\Rightarrow\\; \\Omega = \\omega_1\\dfrac{\\tau_W}{\\tau_W - 1} = \\dfrac{\\omega_1}{4}',
      perche: 'Riduttore di p. 175 (qui 1 solare, 2 satellite, 3 corona): con $R_2 = R_1$ si ha $R_3 = R_1 + 2R_2 = 3R_1$. Reso ordinario, 1 → 2 → 3 ha un ingranamento esterno e uno interno: $\\tau_W = -R_1/R_3$. Con la corona ferma si risolve Willis rispetto a $\\Omega$: $\\tau_{GLOB} = \\Omega/\\omega_1 = 1/4 < 1$, riduttore.',
      fonte: { tipo: 'dispensa', pag: 175 },
      chiave: true,
      correzione: { nf: 'NF-27', dispensaScrive: 'R_3 = R_1 + 2R_2 = 3R_1 \\text{ (senza dichiarare } R_2 = R_1)' },
      distrattori: [
        { latex: '\\Omega = \\tau_W\\,\\omega_1 = -\\dfrac{\\omega_1}{3}', errore: 'concetto', spiega: 'τ_W vale per le velocità relative: il portatreno non è l\'uscita di un ordinario 1 → 3.', num: (v) => [v.Wc, v.tc * v.w1] },
        { latex: '\\Omega = \\dfrac{\\omega_1}{1 - \\tau_W} = \\dfrac34\\,\\omega_1', errore: 'indice', spiega: 'Questa forma vale per il secondo riduttore di p. 175 (solare fisso, entra la corona): Ω = ω₃/(1 − τ_W).', num: (v) => [v.Wc, v.w1 / (1 - v.tc)] },
        { latex: '\\tau_W = -\\dfrac{R_3}{R_1} = -3 \\Rightarrow \\Omega = \\dfrac34\\,\\omega_1', errore: 'convenzione', spiega: 'È il Willis capovolto di d089 (entrata al numeratore). Con la convenzione della dispensa τ_W = −1/3 e Ω = ω₁/4.', num: (v) => [v.Wc, (v.w1 * -3) / (-3 - 1)] },
      ],
      num: (v) => [v.Wc, v.w1 / 4],
    },
  ],
  risultato: { latex: '\\tau_W = \\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega}', fonte: P174 },
  gancio: 'Siediti sul portatreno: lo vedi fermo, il rotismo diventa ordinario, e τ_W è il suo rapporto (uscita su entrata).',
};

// ------------------------------------------------------------------ d090 velocità propria del satellite
const P175 = { tipo: 'dispensa', pag: 175 } as const;

export const d090: Dimostrazione = {
  id: 'd090',
  titolo: 'Velocità del satellite attorno al proprio asse',
  enunciato: 'Nel rotismo solare 1 – satellite 2 – corona 3, ricavare la velocità angolare del satellite e del portatreno con il centro di istantanea rotazione, prima a corona fissa e poi a solare fisso, e controllarla con Willis.',
  ipotesi: [
    'rotolamento senza strisciamento sulle primitive; R₃ = R₁ + 2R₂',
    'membro fisso: la corona (ω₃ = 0) oppure il solare (ω₁ = 0)',
    'velocità con segno nel riferimento comune; nel calcolo col CIR la dispensa usa i moduli',
  ],
  sample: (rnd) => {
    const R1 = U(rnd, 0.02, 0.08), R2 = U(rnd, 0.015, 0.06), R3 = R1 + 2 * R2;
    const w1 = U(rnd, 50, 300), w3 = U(rnd, 50, 300);
    // corona fissa: equazioni di rotolamento nei due contatti, risolte (v. tools/verifica/c5b.py)
    const a = epicicloidale({ z1: 2 * R1, z2: 2 * R2, fisso: 'corona', wIn: w1 });
    const s = epicicloidale({ z1: 2 * R1, z2: 2 * R2, fisso: 'solare', wIn: w3 });
    return { R1, R2, R3, w1, w3, W: a.W, w2: a.w2, w2a: Math.abs(a.w2), VO2: a.vO2, Ws: s.W, w2s: s.w2 };
  },
  passi: [
    {
      id: 'd090.1',
      latex: '\\omega_3 = 0 \\;\\Rightarrow\\; C_{2,3} \\text{ è il C.I.R. del satellite}',
      perche: 'Il punto di contatto con la corona ferma ha velocità nulla, e nel rotolamento senza strisciamento il punto del satellite che lo tocca ha la stessa velocità: è il centro di istantanea rotazione del satellite.',
      fonte: P175,
      distrattori: [],
    },
    {
      id: 'd090.2',
      latex: 'V_{C_{1,2}}\\big|_{\\in 1} = \\omega_1 R_1 = |\\omega_2|\\,2R_2 = V_{C_{1,2}}\\big|_{\\in 2}',
      perche: 'Nel contatto con il solare la velocità è la stessa sui due membri. Sul solare è $\\omega_1 R_1$; sul satellite il punto $C_{1,2}$ dista $2R_2$ dal CIR $C_{2,3}$.',
      fonte: P175,
      chiave: true,
      distrattori: [
        { latex: '\\omega_1 R_1 = |\\omega_2|\\,R_2', errore: 'indice', spiega: 'R₂ è la distanza dal centro O₂, non dal CIR: il satellite ruota attorno a C₂,₃, a distanza 2R₂.', num: (v) => [v.w1 * v.R1, v.w2a * v.R2] },
        { latex: '\\omega_1 R_1 = |\\omega_2|\\,2R_2 + \\Omega R_1', errore: 'concetto', spiega: 'Nel moto assoluto attorno al CIR la velocità del punto è già tutta |ω₂|·2R₂: il trascinamento è compreso, non va aggiunto.', num: (v) => [v.w1 * v.R1, v.w2a * 2 * v.R2 + v.W * v.R1] },
      ],
      num: (v) => [v.w1 * v.R1, v.w2a * 2 * v.R2],
    },
    {
      id: 'd090.3',
      latex: '|\\omega_2| = \\dfrac{\\omega_1 R_1}{2R_2} \\quad \\Big(= \\dfrac{\\omega_1}{2} \\text{ con } R_2 = R_1\\Big)',
      perche: 'Si ricava dalla riga precedente. La dispensa usa $R_2 = R_1$ e trova $\\omega_2 = \\omega_1/2$ (in modulo).',
      fonte: P175,
      distrattori: [],
      num: (v) => [v.w2a, (v.w1 * v.R1) / (2 * v.R2)],
    },
    {
      id: 'd090.4',
      latex: 'V_{O_2}\\big|_{\\in 2} = |\\omega_2|\\,R_2 = \\dfrac{\\omega_1 R_1}{2}',
      perche: 'Il centro $O_2$ dista $R_2$ dal CIR: la sua velocità è metà di quella di $C_{1,2}$ (profilo lineare con vertice nel CIR, figura di p. 175).',
      fonte: P175,
      distrattori: [],
      num: (v) => [Math.abs(v.VO2), v.w2a * v.R2],
    },
    {
      id: 'd090.5',
      latex: 'V_{O_2}\\big|_{\\in P} = \\Omega\\,(R_1 + R_2) \\;\\Rightarrow\\; \\Omega = \\dfrac{\\omega_1 R_1}{2(R_1 + R_2)} \\quad \\Big(= \\dfrac{\\omega_1}{4}\\Big)',
      perche: 'Il centro del satellite appartiene anche al portatreno, che ruota attorno a $O_1$ con braccio $R_1 + R_2$ ($= 2R_1$ nella dispensa). Uguagliando le due velocità di $O_2$ si trova $\\Omega$: lo stesso $\\omega_1/4$ di Willis.',
      fonte: P175,
      chiave: true,
      distrattori: [
        { latex: '\\Omega\\,R_2 = \\dfrac{\\omega_1 R_1}{2}', errore: 'indice', spiega: 'Il portatreno ruota attorno a O₁: il braccio di O₂ è l\'interasse R₁ + R₂, non R₂.', num: (v) => [v.W * v.R2, (v.w1 * v.R1) / 2] },
        { latex: '\\Omega = |\\omega_2|', errore: 'concetto', spiega: 'Ω descrive il trasporto dell\'asse del satellite; la rotazione propria del satellite è un\'altra cosa (q30).', num: (v) => [v.W, v.w2a] },
      ],
      num: (v) => [v.W, (v.w1 * v.R1) / (2 * (v.R1 + v.R2))],
    },
    {
      id: 'd090.6',
      latex: '\\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega} = -\\dfrac{R_1}{R_2} \\;\\Rightarrow\\; \\omega_2 = \\Omega - \\dfrac{z_1}{z_2}(\\omega_1 - \\Omega) = -\\dfrac{\\omega_1 R_1}{2R_2}',
      perche: 'Controllo con Willis fra solare e satellite (ingranamento esterno, a portatreno fermo). Dà lo stesso modulo e in più il **segno**: il satellite gira in verso opposto al solare. È la velocità assoluta del satellite: trascinamento $\\Omega$ più rotazione relativa $\\omega_2 - \\Omega$.',
      fonte: { tipo: 'deduzione', da: 'p. 174 (Willis) applicata al satellite del riduttore di p. 175', spiegazione: 'la dispensa calcola ω₂ solo col CIR e in modulo; Willis 1–2 dà ω₂ = −ω₁R₁/(2R₂), che coincide in modulo (verificato anche con Willis 2–3)' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: '\\omega_2 = -\\dfrac{z_1}{z_2}\\,\\omega_1', errore: 'concetto', spiega: 'È il rapporto di un ordinario applicato alle velocità assolute: dimentica il trascinamento del portatreno.', num: (v) => [v.w2, -(v.R1 / v.R2) * v.w1] },
        { latex: '\\omega_2 = \\Omega + \\dfrac{z_1}{z_2}(\\omega_1 - \\Omega)', errore: 'segno', spiega: 'Solare e satellite ingranano esternamente: nel moto relativo girano in versi opposti, il rapporto è −z₁/z₂.', num: (v) => [v.w2, v.W + (v.R1 / v.R2) * (v.w1 - v.W)] },
      ],
      num: (v) => [v.w2, v.W - (v.R1 / v.R2) * (v.w1 - v.W)],
    },
    {
      id: 'd090.7',
      latex: '\\omega_1 = 0:\\ \\omega_2\\,2R_2 = \\omega_3 R_3,\\ \\ \\omega_2 R_2 = \\Omega(R_1 + R_2) \\;\\Rightarrow\\; \\Omega = \\dfrac{\\omega_3 R_3}{2(R_1+R_2)} \\ \\Big(= \\dfrac34\\,\\omega_3\\Big)',
      perche: 'Riduttore «con τ maggiore» di p. 175: ora è fermo il solare, il CIR del satellite è $C_{1,2}$ e la velocità nota è quella della corona in $C_{2,3}$, a distanza $2R_2$ dal CIR. Con $R_2 = R_1$, $R_3 = 3R_1$: $\\omega_2 = \\frac32\\omega_3$ e $\\Omega = \\frac34\\omega_3$, ancora riduttore ma meno spinto.',
      fonte: P175,
      chiave: true,
      distrattori: [
        { latex: '\\Omega = \\dfrac{\\omega_3}{4}', errore: 'ipotesi', spiega: 'È il risultato con la corona ferma; qui è fermo il solare, il CIR cambia e Ω = 3ω₃/4.', num: (v) => [v.Ws, v.w3 / 4] },
        { latex: '\\Omega = \\dfrac{\\omega_3 R_3}{R_1 + R_2}', errore: 'fattore', spiega: 'O₂ sta a metà fra il CIR C₁,₂ e C₂,₃: la sua velocità è metà di ω₃R₃.', num: (v) => [v.Ws, (v.w3 * v.R3) / (v.R1 + v.R2)] },
      ],
      num: (v) => [v.Ws, (v.w3 * v.R3) / (2 * (v.R1 + v.R2))],
    },
  ],
  risultato: { latex: '\\omega_2 = \\Omega - \\dfrac{z_1}{z_2}(\\omega_1 - \\Omega);\\quad \\omega_3 = 0:\\ |\\omega_2| = \\dfrac{\\omega_1 R_1}{2R_2},\\ \\Omega = \\dfrac{\\omega_1 R_1}{2(R_1+R_2)}', fonte: P175 },
  gancio: 'Il satellite rotola sulla corona ferma: il contatto è il CIR, il centro va a metà velocità del contatto col solare.',
};

// ------------------------------------------------------------------ d091 relazione fra le coppie
const P179 = { tipo: 'dispensa', pag: 179 } as const;

export const d091: Dimostrazione = {
  id: 'd091',
  titolo: 'Relazione fra le coppie in un epicicloidale',
  enunciato: 'Ricavare i rapporti fra le coppie esterne C₁, C₂ sui solari e C_p sul portatreno di un rotismo epicicloidale qualunque, a regime e senza perdite.',
  ipotesi: [
    'condizioni di regime: niente termini d\'inerzia',
    'rendimento unitario (η = 1): nessuna potenza dissipata',
    'C₁, C₂, C_p coppie esterne con segno, proiettate sull\'asse del rotismo',
  ],
  sample: (rnd) => {
    const tauW = -U(rnd, 0.2, 3), w1 = U(rnd, 50, 200), W = U(rnd, -40, 40);
    const w2 = W + tauW * (w1 - W);
    const C1 = U(rnd, 5, 80), C2 = -C1 / tauW, Cp = -(C1 + C2);
    return { tauW, w1, w2, W, C1, C2, Cp };
  },
  passi: [
    {
      id: 'd091.1',
      latex: 'C_1 + C_2 + C_p = 0',
      perche: 'Seconda equazione cardinale per l\'intero rotismo, con polo sull\'asse principale e proiettata lungo l\'asse ($\\underline{M}^{EST}_O\\cdot\\underline{k} = 0$): le reazioni dei supporti non danno momento attorno all\'asse.',
      fonte: P179,
      distrattori: [],
      num: (v) => [v.C1 + v.C2 + v.Cp, 0],
    },
    {
      id: 'd091.2',
      latex: 'C_1\\omega_1 + C_2\\omega_2 + C_p\\Omega = 0',
      perche: 'Teorema delle potenze virtuali (bilancio delle potenze) a regime e con $\\eta = 1$: la somma delle potenze delle coppie esterne è nulla.',
      fonte: P179,
      distrattori: [],
      num: (v) => [v.C1 * v.w1 + v.C2 * v.w2 + v.Cp * v.W, 0],
    },
    {
      id: 'd091.3',
      latex: 'C_p = -(C_1 + C_2) \\;\\Rightarrow\\; C_1(\\omega_1 - \\Omega) + C_2(\\omega_2 - \\Omega) = 0',
      perche: 'Si elimina $C_p$ sostituendo l\'equilibrio nel bilancio delle potenze: compaiono le velocità relative al portatreno.',
      fonte: P179,
      chiave: true,
      correzione: { nf: 'NF-27', dispensaScrive: 'C_p = -C_1 + C_2 \\Rightarrow C_1\\omega_1 + C_2\\omega_2 - C_1\\Omega - C_2\\Omega = 0' },
      distrattori: [
        { latex: 'C_1(\\omega_1 - \\Omega) + C_2(\\omega_2 + \\Omega) = 0', errore: 'segno', spiega: 'Viene dal refuso della dispensa C_p = −C₁ + C₂ (NF-27): dall\'equilibrio C_p = −(C₁ + C₂), e la riga dopo della dispensa lo usa così.', num: (v) => [v.C1 * (v.w1 - v.W) + v.C2 * (v.w2 + v.W), 0] },
        { latex: 'C_1\\omega_1 + C_2\\omega_2 = 0', errore: 'termine-perso', spiega: 'Il portatreno è mobile e la sua coppia fa potenza: C_pΩ non si può trascurare.', num: (v) => [v.C1 * v.w1 + v.C2 * v.w2, 0] },
      ],
      num: (v) => [v.C1 * (v.w1 - v.W) + v.C2 * (v.w2 - v.W), 0],
    },
    {
      id: 'd091.4',
      latex: '\\dfrac{C_1}{C_2} = -\\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega} = -\\tau_W',
      perche: 'Si divide per $C_2(\\omega_1 - \\Omega)$ e si riconosce il rapporto di Willis. È la stessa relazione di un rotismo ordinario ($C_1/C_2 = -\\tau$), scritta con il rotismo reso ordinario.',
      fonte: P179,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{C_1}{C_2} = -\\dfrac{1}{\\tau_W}', errore: 'indice', spiega: 'La coppia sull\'albero d\'entrata sta a quella d\'uscita come −τ_W, non come il reciproco: ricontrolla chi sta al numeratore.', num: (v) => [v.C1 / v.C2, -1 / v.tauW] },
        { latex: '\\dfrac{C_1}{C_2} = -\\dfrac{\\omega_2}{\\omega_1}', errore: 'concetto', spiega: 'Con il portatreno mobile contano le velocità relative, non quelle assolute.', num: (v) => [v.C1 / v.C2, -v.w2 / v.w1] },
        { latex: '\\dfrac{C_1}{C_2} = \\tau_W', errore: 'segno', spiega: 'Dal bilancio C₁(ω₁ − Ω) = −C₂(ω₂ − Ω): il segno meno resta.', num: (v) => [v.C1 / v.C2, v.tauW] },
      ],
      num: (v) => [v.C1 / v.C2, -v.tauW],
    },
    {
      id: 'd091.5',
      latex: 'C_1(\\omega_1 - \\Omega) + C_2(\\omega_2 - \\Omega) + C_p\\,\\underbrace{(\\Omega - \\Omega)}_{=0} = 0',
      perche: 'Seconda via della dispensa: il bilancio delle potenze nel moto relativo al portatreno. Le coppie sono le stesse, le velocità sono quelle relative e il portatreno, fermo, non fa potenza: si arriva subito alla riga precedente.',
      fonte: P179,
      distrattori: [],
      num: (v) => [v.C1 * (v.w1 - v.W) + v.C2 * (v.w2 - v.W) + v.Cp * (v.W - v.W), 0],
    },
    {
      id: 'd091.6',
      latex: '\\dfrac{C_p}{C_1} = -1 - \\dfrac{C_2}{C_1} = -1 + \\dfrac{1}{\\tau_W} = \\dfrac{1 - \\tau_W}{\\tau_W}',
      perche: 'Dall\'equilibrio $C_1(1 + C_2/C_1) = -C_p$ e da $C_2/C_1 = -1/\\tau_W$.',
      fonte: P179,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{C_p}{C_1} = \\dfrac{1 + \\tau_W}{\\tau_W}', errore: 'segno', spiega: 'C₂/C₁ = −1/τ_W: sostituendo in −1 − C₂/C₁ si ottiene −1 + 1/τ_W.', num: (v) => [v.Cp / v.C1, (1 + v.tauW) / v.tauW] },
        { latex: '\\dfrac{C_p}{C_1} = \\tau_W - 1', errore: 'indice', spiega: 'Si è usato C₂/C₁ = −τ_W invece di −1/τ_W.', num: (v) => [v.Cp / v.C1, v.tauW - 1] },
      ],
      num: (v) => [v.Cp / v.C1, (1 - v.tauW) / v.tauW],
    },
    {
      id: 'd091.7',
      latex: '\\text{i rapporti } C_1 : C_2 : C_p \\text{ dipendono solo da } \\tau_W\\text{: partitore di coppia}',
      perche: 'Nessuna velocità compare nei risultati: il rapporto di partizione dipende solo dalla geometria (i denti, attraverso $\\tau_W$), non dalle condizioni cinematiche di funzionamento.',
      fonte: P179,
      distrattori: [],
    },
  ],
  risultato: { latex: '\\dfrac{C_1}{C_2} = -\\tau_W, \\qquad \\dfrac{C_p}{C_1} = \\dfrac{1 - \\tau_W}{\\tau_W}, \\qquad C_1 + C_2 + C_p = 0', fonte: P179 },
  gancio: 'Equilibrio più potenze: tolto C_p restano le velocità relative, cioè Willis. Le coppie si dividono come vuole la geometria.',
};

// ------------------------------------------------------------------ d094 rotismo combinato
const P180 = { tipo: 'dispensa', pag: 180 } as const;

export const d094: Dimostrazione = {
  id: 'd094',
  titolo: 'Rotismo combinato (ordinario + epicicloidale + ordinario)',
  enunciato: 'Per il rotismo di p. 180 (ordinario 5–6 in entrata, epicicloidale con solare 1 sull\'albero di 6, satellite doppio 2–3, solare 4 fisso, ordinario 8–7 in uscita dal portatreno) contare i gradi di libertà, ricavare il rapporto globale ω₇/ω₅ e le coppie.',
  ipotesi: [
    'ogni rotismo ordinario ha 1 g.d.l., ogni epicicloidale 2 g.d.l.',
    'vincoli: ω₄ = 0 (solare 4 bloccato), ω₆ = ω₁ (stesso albero), ω₈ = Ω (ruota 8 sul portatreno)',
    'per le coppie: regime, η = 1; stesso modulo nei due ingranamenti dell\'epicicloidale (z₁ + z₂ = z₃ + z₄)',
    'HYP della dispensa: τ_W > 1',
  ],
  sample: (rnd) => {
    const z1 = U(rnd, 35, 60), z2 = U(rnd, 15, 28), z4 = U(rnd, 15, 22), z3 = z1 + z2 - z4;
    const z5 = U(rnd, 15, 40), z6 = U(rnd, 30, 70), z7 = U(rnd, 15, 40), z8 = U(rnd, 20, 60);
    // epicicloidale reso ordinario: catena 1 → 2 (esterno), 2 = 3, 3 → 4 (esterno), velocità relative
    const r1 = 1, r2 = -(z1 / z2) * r1, r3 = r2, r4 = -(z3 / z4) * r3;
    const tauW = r4 / r1;
    const w5 = U(rnd, 100, 300), w6 = (-z5 / z6) * w5, w1 = w6;
    const W = (w1 * tauW) / (tauW - 1); // da τ_W = (0 − Ω)/(ω₁ − Ω)
    const w8 = W, w7 = (-z8 / z7) * w8;
    const C5 = U(rnd, 5, 50), C7 = (-C5 * w5) / w7;
    const C61 = (C5 * w5) / w6; // coppia che l'ordinario in entrata porta al solare 1 (azione e reazione)
    const C4 = -C61 / tauW, C8p = -(C61 + C4);
    return { z1, z2, z3, z4, z5, z6, z7, z8, tauW, w5, w6, w1, W, w8, w7, C5, C7, C61, C4, C8p };
  },
  passi: [
    {
      id: 'd094.1',
      latex: 'l = 2\\,m^{R.E.} + m^{R.O.} - v = 2\\cdot 1 + 2 - 3 = 1\\ \\text{g.d.l.}',
      perche: 'Un epicicloidale (2 g.d.l.) e due ordinari (1 ciascuno) danno 4 g.d.l.; tre vincoli semplici: solare 4 bloccato, $\\omega_1 = \\omega_6$, $\\omega_8 = \\Omega$. Resta 1 g.d.l.: basta un dato (di solito la velocità motrice) e c\'è un unico rapporto di trasmissione.',
      fonte: P180,
      chiave: true,
      distrattori: [],
      num: () => [1, 2 * 1 + 2 - 3],
    },
    {
      id: 'd094.2',
      latex: '\\omega_4 = 0, \\qquad \\omega_6 = \\omega_1, \\qquad \\Omega = \\omega_8',
      perche: 'I tre vincoli, scritti come uguaglianze fra velocità: si usano per ricucire i blocchi.',
      fonte: P180,
      distrattori: [],
    },
    {
      id: 'd094.3',
      latex: '\\tau_0^{(1)} = \\dfrac{\\omega_6}{\\omega_5} = -\\dfrac{R_5}{R_6} = -\\dfrac{z_5}{z_6}',
      perche: 'Ordinario in entrata: un ingranamento esterno, uscita 6 su entrata 5.',
      fonte: P180,
      distrattori: [],
      num: (v) => [v.w6 / v.w5, -v.z5 / v.z6],
    },
    {
      id: 'd094.4',
      latex: '\\tau_W = \\dfrac{\\omega_4 - \\Omega}{\\omega_1 - \\Omega} = \\dfrac{-\\Omega}{\\omega_1 - \\Omega} \\;\\Rightarrow\\; \\dfrac{\\Omega}{\\omega_1} = \\dfrac{\\tau_W}{\\tau_W - 1}',
      perche: 'Willis per l\'epicicloidale con il solare 4 fermo: $\\tau_W(\\omega_1 - \\Omega) = -\\Omega$, quindi $\\tau_W\\omega_1 = \\Omega(\\tau_W - 1)$. L\'ipotesi $\\tau_W > 1$ della dispensa rende $\\Omega/\\omega_1 > 0$: portatreno concorde con il solare.',
      fonte: P180,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{\\Omega}{\\omega_1} = \\dfrac{\\tau_W - 1}{\\tau_W}', errore: 'indice', spiega: 'È il reciproco: da τ_Wω₁ = Ω(τ_W − 1) si ricava Ω/ω₁ = τ_W/(τ_W − 1).', num: (v) => [v.W / v.w1, (v.tauW - 1) / v.tauW] },
        { latex: '\\dfrac{\\Omega}{\\omega_1} = \\dfrac{\\tau_W}{\\tau_W + 1}', errore: 'segno', spiega: 'ω₄ − Ω = −Ω: portando i termini in Ω da una parte si ottiene τ_W − 1.', num: (v) => [v.W / v.w1, v.tauW / (v.tauW + 1)] },
        { latex: '\\dfrac{\\Omega}{\\omega_1} = \\tau_W', errore: 'concetto', spiega: 'τ_W è il rapporto a portatreno fermo; qui il portatreno è proprio l\'uscita.', num: (v) => [v.W / v.w1, v.tauW] },
      ],
      num: (v) => [v.W / v.w1, v.tauW / (v.tauW - 1)],
    },
    {
      id: 'd094.5',
      latex: '\\tau_W = \\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega}\\cdot\\dfrac{\\omega_4 - \\Omega}{\\omega_3 - \\Omega} = \\left(-\\dfrac{z_1}{z_2}\\right)\\left(-\\dfrac{z_3}{z_4}\\right) = \\dfrac{z_1 z_3}{z_2 z_4}',
      perche: 'Il rotismo reso ordinario è 1 → 2, 2 solidale a 3, 3 → 4: due ingranamenti esterni, $\\tau_W > 0$. Con $z_1 z_3 > z_2 z_4$ si ha l\'ipotesi $\\tau_W > 1$.',
      fonte: { tipo: 'deduzione', da: 'p. 180 (schema) con il metodo di p. 174 (satellite doppio)', spiegazione: 'la dispensa scrive τ_W senza esprimerlo con i denti; lo si ricava come per la Fig. 5-47 a)' },
      aggiunto: true,
      distrattori: [
        { latex: '\\tau_W = \\dfrac{z_2 z_4}{z_1 z_3}', errore: 'indice', spiega: 'In ogni ingranamento il rapporto uscita/entrata è z_entrata/z_uscita.', num: (v) => [v.tauW, (v.z2 * v.z4) / (v.z1 * v.z3)] },
      ],
      num: (v) => [v.tauW, (v.z1 * v.z3) / (v.z2 * v.z4)],
    },
    {
      id: 'd094.6',
      latex: '\\tau_0^{(2)} = \\dfrac{\\omega_7}{\\omega_8} = -\\dfrac{z_8}{z_7}',
      perche: 'Ordinario in uscita: la ruota 8 è calettata sul portatreno e ingrana con la 7 dell\'utilizzatore.',
      fonte: P180,
      distrattori: [],
      num: (v) => [v.w7 / v.w8, -v.z8 / v.z7],
    },
    {
      id: 'd094.7',
      latex: '\\tau = \\dfrac{\\omega_7}{\\omega_5} = \\tau_0^{(1)}\\,\\dfrac{\\Omega}{\\omega_1}\\,\\tau_0^{(2)} = \\dfrac{z_5 z_8}{z_6 z_7}\\,\\dfrac{\\tau_W}{\\tau_W - 1}',
      perche: 'Si ricuciono i blocchi con i vincoli: $\\omega_7/\\omega_5 = (\\omega_6/\\omega_5)(\\Omega/\\omega_1)(\\omega_7/\\omega_8)$ perché $\\omega_6 = \\omega_1$ e $\\omega_8 = \\Omega$. I due segni meno degli ordinari si compensano. Con $\\tau < 1$ è un riduttore, con $\\tau > 1$ un moltiplicatore.',
      fonte: { tipo: 'deduzione', da: 'p. 180', spiegazione: 'la dispensa scrive i tre rapporti ma non il prodotto; combinandoli con i vincoli si ha il rapporto globale' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: '\\tau = \\tau_0^{(1)} + \\dfrac{\\tau_W}{\\tau_W - 1} + \\tau_0^{(2)}', errore: 'concetto', spiega: 'I rapporti di blocchi in serie si moltiplicano, non si sommano.', num: (v) => [v.w7 / v.w5, -v.z5 / v.z6 + v.tauW / (v.tauW - 1) - v.z8 / v.z7] },
        { latex: '\\tau = -\\dfrac{z_5 z_8}{z_6 z_7}\\,\\dfrac{\\tau_W}{\\tau_W - 1}', errore: 'segno', spiega: 'Gli ordinari sono due, ciascuno con un ingranamento esterno: (−)(−) = +.', num: (v) => [v.w7 / v.w5, -((v.z5 * v.z8) / (v.z6 * v.z7)) * (v.tauW / (v.tauW - 1))] },
        { latex: '\\tau = \\dfrac{z_5 z_8}{z_6 z_7}\\,\\tau_W', errore: 'concetto', spiega: 'Il portatreno non è l\'uscita di un ordinario di rapporto τ_W: serve Willis con ω₄ = 0.', num: (v) => [v.w7 / v.w5, ((v.z5 * v.z8) / (v.z6 * v.z7)) * v.tauW] },
      ],
      num: (v) => [v.w7 / v.w5, ((v.z5 * v.z8) / (v.z6 * v.z7)) * (v.tauW / (v.tauW - 1))],
    },
    {
      id: 'd094.8',
      latex: 'C_5\\omega_5 + C_7\\omega_7 = 0 \\;\\Rightarrow\\; \\dfrac{C_7}{C_5} = -\\dfrac{1}{\\tau}',
      perche: 'Bilancio delle potenze dell\'intero rotismo ($\\eta = 1$): le coppie interne non compaiono. «Il sistema può essere diviso $m$ volte»: per ogni blocco si può scrivere il suo bilancio, con le coppie scambiate fra i blocchi per azione e reazione.',
      fonte: P180,
      distrattori: [
        { latex: '\\dfrac{C_7}{C_5} = -\\tau', errore: 'indice', spiega: 'Dove la velocità si riduce la coppia cresce: C₇/C₅ = −ω₅/ω₇ = −1/τ.', num: (v) => [v.C7 / v.C5, -(v.w7 / v.w5)] },
      ],
      num: (v) => [v.C7 / v.C5, -v.w5 / v.w7],
    },
    {
      id: 'd094.9',
      latex: 'C_{6,1} + C_{8p} + C_4 = 0',
      perche: 'Per l\'epicicloidale «va usata anche la II ECD»: il bilancio delle potenze del blocco non vede la coppia $C_4$ sul solare fermo ($\\omega_4 = 0$, potenza nulla), ma questa coppia di reazione del telaio esiste e serve all\'equilibrio.',
      fonte: P180,
      chiave: true,
      distrattori: [
        { latex: 'C_{6,1} + C_{8p} = 0', errore: 'termine-perso', spiega: 'Il solare 4 è fermo ma non scarico: il telaio gli applica una coppia C₄ ≠ 0.', num: (v) => [v.C61 + v.C8p, 0] },
        { latex: 'C_{6,1}\\,\\omega_1 + C_{8p}\\,\\Omega + C_4\\,\\omega_4 = 0 \\Rightarrow C_4 = 0', errore: 'concetto', spiega: 'Il bilancio delle potenze dà zero per C₄ perché ω₄ = 0, non perché C₄ sia nulla: per trovarla serve l\'equilibrio.' },
      ],
      num: (v) => [v.C61 + v.C8p + v.C4, 0],
    },
    {
      id: 'd094.10',
      latex: 'C_4 = -\\dfrac{C_{6,1}}{\\tau_W}, \\qquad C_{8p} = -(C_{6,1} + C_4) = C_{6,1}\\,\\dfrac{1 - \\tau_W}{\\tau_W}',
      perche: 'Sono le relazioni di p. 179 con il solare 4 al posto del solare 2: valgono anche con $\\omega_4 = 0$, perché i rapporti fra le coppie non dipendono dalle velocità.',
      fonte: { tipo: 'deduzione', da: 'p. 179 applicata al blocco epicicloidale di p. 180', spiegazione: 'la dispensa scrive l\'equilibrio C₆,₁ + C₈p + C₄ = 0 ma non lo risolve; con C₁/C₂ = −τ_W (qui 2 → 4) si trovano C₄ e C₈p' },
      aggiunto: true,
      distrattori: [
        { latex: 'C_4 = -\\tau_W\\,C_{6,1}', errore: 'indice', spiega: 'Da C₁/C₄ = −τ_W segue C₄ = −C₁/τ_W.', num: (v) => [v.C4, -v.tauW * v.C61] },
      ],
      num: (v) => [v.C4, -v.C61 / v.tauW],
    },
  ],
  risultato: {
    latex: 'l = 1,\\qquad \\dfrac{\\omega_7}{\\omega_5} = \\dfrac{z_5 z_8}{z_6 z_7}\\,\\dfrac{\\tau_W}{\\tau_W - 1},\\quad \\tau_W = \\dfrac{z_1 z_3}{z_2 z_4}',
    fonte: { tipo: 'deduzione', da: 'p. 180', spiegazione: 'prodotto dei tre rapporti scritti nella dispensa, con i vincoli ω₆ = ω₁ e ω₈ = Ω' },
  },
  gancio: 'Conta i g.d.l., spezza in blocchi, ricuci con gli alberi comuni; per le coppie dell\'epicicloidale non basta il bilancio delle potenze.',
};

// ------------------------------------------------------------------ argomento
export const epicicloidali: ArgomentoContenuto = {
  id: 'c5-epicicloidali',
  cosaDireSubito:
    'Un rotismo epicicloidale ha alcuni alberi mobili: due solari coassiali, uno o più satelliti con l\'asse portato dal portatreno, che ruota attorno allo stesso asse dei solari. Ha due gradi di libertà. Lo studio osservandolo dal portatreno: lì il portatreno è fermo, il rotismo diventa ordinario e vale la formula di Willis τ_W = (ω₂ − Ω)/(ω₁ − Ω).',
  sistemaIpotesi: [
    'Sistema: solari 1 e 2 (assi fissi coincidenti), satelliti sul portatreno P (velocità Ω), tre alberi verso l\'esterno.',
    'Velocità angolari con segno nello stesso riferimento; ingranamenti senza strisciamento sulle primitive.',
    'Condizione geometrica di montaggio: R₁ + R₃ = R₂ + R₄ (z₁ + z₃ = z₂ + z₄ con lo stesso modulo); con la corona R_corona = R_solare + 2R_satellite.',
    'Per le coppie: regime e η = 1.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Riduttore epicicloidale a corona fissa (dispensa p. 175): il contatto C₂,₃ con la corona ferma è il CIR del satellite; il profilo delle velocità è lineare.',
    fonte: { tipo: 'dispensa', pag: 175, fig: 'schizzo su quadretti del riduttore' },
    elementi: [
      { id: 'asse', testo: 'asse comune dei solari e del portatreno (centro O₁)', obbligatorio: true },
      { id: 'membri', testo: 'solare 1, satellite 2, corona 3 (R₃ = R₁ + 2R₂)', obbligatorio: true },
      { id: 'portatreno', testo: 'portatreno P da O₁ a O₂ con la sua Ω', obbligatorio: true },
      { id: 'fisso', testo: 'membro fisso tratteggiato (qui la corona)', obbligatorio: true },
      { id: 'contatti', testo: 'punti di contatto C₁,₂ e C₂,₃', obbligatorio: true },
      { id: 'profilo', testo: 'profilo delle velocità: ω₁R₁ in C₁,₂, V_O₂ in O₂, zero nel CIR', obbligatorio: false },
      { id: 'versi', testo: 'versi di ω₁ e Ω (concordi), del satellite (opposto)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\omega_i = \\omega^{Rel}_{i,P} + \\Omega \\;\\Rightarrow\\; \\tau_W = \\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega}',
    spiegazione: 'Composizione dei moti con il portatreno come riferimento mobile: nel moto relativo il rotismo è ordinario e il suo rapporto è τ_W, uscita su entrata.',
    fonte: { tipo: 'dispensa', pag: 174 },
  },
  dimostrazioni: ['d089', 'd090', 'd091', 'd094'],
  significato:
    'Willis lega tre velocità con un\'equazione: bloccando un membro si ottiene un riduttore o moltiplicatore molto compatto (Ω = ω₁/4 con la corona ferma, 3ω₃/4 con il solare fermo), lasciandoli liberi si combinano due moti o se ne divide uno (differenziale). Le coppie invece si ripartiscono solo secondo τ_W: il rotismo è un partitore di coppia che non dipende dalle velocità.',
  fraseDaRicordare: 'Dal portatreno il rotismo è ordinario: τ_W = (ω₂ − Ω)/(ω₁ − Ω), e le coppie stanno come C₁/C₂ = −τ_W.',
  daNonDire: [
    { frase: 'Il satellite ruota a velocità Ω.', perche: 'Ω è la velocità con cui il portatreno trasporta l\'asse del satellite; la rotazione propria è ω₂ = Ω + (ω₂ − Ω), diversa da Ω.', fonte: { tipo: 'dispensa', pag: 175 } },
    { frase: 'τ_W = (ω₁ − Ω)/(ω₂ − Ω).', perche: 'È la convenzione capovolta di d089: con quella della dispensa l\'uscita sta al numeratore. Con la corona fissa daresti τ_W = −3 invece di −1/3.', fonte: { tipo: 'dispensa', pag: 174 } },
    { frase: 'Un epicicloidale ha un grado di libertà, come un ordinario.', perche: 'Ne ha due: Willis è una sola equazione in tre velocità. Diventa a 1 g.d.l. solo bloccando un membro o collegandolo.', fonte: { tipo: 'dispensa', pag: [174, 180] } },
    { frase: 'C_p = −C₁ + C₂.', perche: 'È un refuso della dispensa (NF-27): dall\'equilibrio C_p = −(C₁ + C₂).', fonte: { tipo: 'dispensa', pag: 179 } },
    { frase: 'Il rapporto fra le velocità assolute è quello dei denti, −z₁/z₂.', perche: 'Vale solo per le velocità relative al portatreno; per quelle assolute serve Willis.', fonte: { tipo: 'dispensa', pag: 174 } },
  ],
  approfondimenti: [
    { domanda: 'Verifica Ω = ω₁/4 del riduttore a corona fissa senza usare Willis.', tipo: 'collegamento', argomento: 'c1-velocita', attesa: 'Con la corona ferma C₂,₃ è il CIR del satellite: ω₁R₁ = |ω₂|·2R₂ dà |ω₂| = ω₁/2; il centro O₂ va a |ω₂|R₂ = ω₁R₁/2 ed è anche del portatreno, Ω·2R₁: Ω = ω₁/4.', fonte: { tipo: 'dispensa', pag: 175 } },
    { domanda: 'Che usi ha un rotismo epicicloidale?', tipo: 'approfondimento', attesa: 'Riduttore o moltiplicatore di giri (un solare bloccato), combinatore (due alberi motori e uno condotto), differenziale (una potenza in ingresso ripartita su due alberi condotti).', fonte: { tipo: 'dispensa', pag: 175 } },
    { domanda: 'Se blocchi il solare invece della corona, che riduttore ottieni?', tipo: 'approfondimento', attesa: 'Entra la corona: Ω = ω₃/(1 − τ_W) = 3ω₃/4 con R₃ = 3R₁; τ = 3/4 < 1, riduttore meno spinto («più alto»). Invertendo entrata e uscita si ha un moltiplicatore.', fonte: { tipo: 'dispensa', pag: 175 } },
    { domanda: 'Come diventa Willis nel differenziale dell\'automobile?', tipo: 'collegamento', argomento: 'c5-differenziale', attesa: 'I due solari conici sono uguali e a portatreno fermo girano in versi opposti: τ_w = −1, quindi Ω = (ω₁ + ω₂)/2 e coppie uguali sui due semiassi.', fonte: { tipo: 'dispensa', pag: [176, 177] } },
    { domanda: 'E il rendimento di un epicicloidale?', tipo: 'collegamento', argomento: 'c5-rendimento-epi', attesa: 'Le perdite si valutano nel moto relativo al portatreno con il rendimento del rotismo reso ordinario; per il riduttore a corona fissa η = (τ_W − η_o)/(τ_W − 1). Non è nella dispensa (fonte esterna).', fonte: { tipo: 'esterna', ref: 'trattazione classica del rendimento degli epicicloidali (perdite nel moto relativo al portatreno)', nota: 'assente dalla dispensa, v. NF-07 e NF-201' } },
    { domanda: 'Nel rotismo combinato perché per l\'epicicloidale serve anche la II ECD?', tipo: 'approfondimento', attesa: 'Il bilancio delle potenze non vede la coppia sul solare fermo (velocità nulla), ma il telaio la esercita: C₆,₁ + C₈p + C₄ = 0, con C₄ = −C₆,₁/τ_W.', fonte: { tipo: 'dispensa', pag: 180 } },
    { domanda: 'Che condizione geometrica devono rispettare le ruote?', tipo: 'approfondimento', attesa: 'Solari coassiali e satelliti sullo stesso perno: R₁ + R₃ = R₂ + R₄, cioè z₁ + z₃ = z₂ + z₄ a parità di modulo; con la corona R_corona = R_solare + 2R_satellite.', fonte: { tipo: 'dispensa', pag: 174 } },
  ],
  simboli: [
    { simbolo: '\\omega_1,\\ \\omega_2', significato: 'velocità angolari dei solari (con segno)', altrove: 'ω_L, ω_R in q17; nel riduttore di p. 175 la corona è 3 e il satellite 2' },
    { simbolo: '\\Omega', significato: 'velocità angolare del portatreno P', altrove: 'ω_p in d089, ω_c in d141' },
    { simbolo: '\\omega^{Rel}_{i,P}', significato: 'velocità di i relativa al portatreno, ω_i − Ω', altrove: 'ω_i′ in q29, q30' },
    { simbolo: '\\tau_W', significato: 'rapporto di Willis, (ω_uscita − Ω)/(ω_entrata − Ω)', altrove: 'τ₀ con l\'entrata al numeratore in d089 (reciproco, NF-09)' },
    { simbolo: '\\tau_{GLOB}', significato: 'rapporto globale (p. es. Ω/ω₁ nel riduttore)' },
    { simbolo: 'C_1,\\ C_2,\\ C_p', significato: 'coppie esterne su solari e portatreno', altrove: 'C₃ per la corona in q29' },
    { simbolo: 'l,\\ m,\\ v', significato: 'gradi di libertà, rotismi (per i loro g.d.l.), vincoli semplici (p. 180)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5b-epicicloidale' }],
  previsioni: [
    {
      id: 'c5b-epi-corona',
      domanda: 'Corona ferma, solare e satellite con lo stesso numero di denti. Il portatreno gira a…',
      opzioni: ['ω₁/2', 'ω₁/3', 'ω₁/4', '3ω₁/4'],
      corretta: 2,
      spiega: 'τ_W = −R₁/R₃ = −1/3 e Ω = ω₁τ_W/(τ_W − 1) = ω₁/4 (p. 175).',
      verify: () => {
        const r = epicicloidale({ z1: 20, z2: 20, fisso: 'corona', wIn: 1 });
        return [1 / 2, 1 / 3, 1 / 4, 3 / 4].findIndex((x) => Math.abs(x - r.tauGlob) < 1e-9);
      },
      visual: { kind: 'meccanismo', id: 'c5b-epicicloidale' },
    },
    {
      id: 'c5b-epi-satellite',
      domanda: 'Nello stesso riduttore, rispetto al solare il satellite gira…',
      opzioni: ['nello stesso verso, a ω₁/2', 'in verso opposto, a ω₁/2', 'in verso opposto, a ω₁', 'con velocità Ω'],
      corretta: 1,
      spiega: 'Il CIR è il contatto con la corona: |ω₂| = ω₁R₁/(2R₂) = ω₁/2, e Willis 1–2 dà il segno meno.',
      verify: () => {
        const r = epicicloidale({ z1: 20, z2: 20, fisso: 'corona', wIn: 1 });
        if (Math.abs(r.w2 - r.W) < 1e-12) return 3;
        return Math.abs(Math.abs(r.w2) - 0.5) < 1e-9 ? (r.w2 > 0 ? 0 : 1) : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5b-epicicloidale' },
    },
    {
      id: 'c5b-epi-solare',
      domanda: 'Ora blocchi il solare e fai entrare il moto dalla corona. Il riduttore diventa…',
      opzioni: ['più spinto (Ω più piccola)', 'meno spinto: Ω = 3ω₃/4', 'un moltiplicatore', 'un differenziale'],
      corretta: 1,
      spiega: 'Ω = ω₃/(1 − τ_W) = 3ω₃/4: ancora riduttore, ma con τ più vicino a 1 (p. 175).',
      verify: () => {
        const r = epicicloidale({ z1: 20, z2: 20, fisso: 'solare', wIn: 1 });
        return r.tauGlob > 1 ? 2 : Math.abs(r.tauGlob - 0.75) < 1e-9 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c5b-epicicloidale' },
    },
  ],
  nf: ['NF-09', 'NF-27', 'NF-202', 'NF-203'],
};
