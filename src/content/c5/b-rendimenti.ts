/**
 * C5 parte b · Rendimenti (domande q16, q51, q52).
 *  - c5-rendimento-ordinario: rendimento dell'ingranaggio (pp. 181–182), irreversibilità (pp. 182–183), cascata (p. 184),
 *    riduttore di coppia (p. 180 e cap. 6 p. 201). Dimostrazioni d092, d140.
 *  - c5-rendimento-epi: NON nella dispensa (NF-07, NF-201): fonte esterna dichiarata, verificata. Dimostrazione d093.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { arrow, circle, line, rect, rot, svg, text } from '../svg';
import { avviamento, coppiaUscita, rendimentoCascata, rendimentoEpi } from '../../engine/c5b';

// ------------------------------------------------------------------ disegni
/** p. 184: cascata di ingranaggi in serie, sottosistemi S₁, S₂, S₃ con motore e utilizzatore equivalenti */
function disegnoCascata() {
  const y = 90, w = 56, h = 44;
  const xs = [20, 100, 180, 260, 340];
  const lab = ['M', 'I₁', 'I₂', 'I₃', 'U'];
  const parts: string[] = [];
  xs.forEach((x, i) => {
    parts.push(rect(x, y - h / 2, i === 0 || i === 4 ? 40 : w, h, i === 0 || i === 4 ? 'l' : 'a'));
    parts.push(text(x + (i === 0 || i === 4 ? 20 : w / 2), y, lab[i], { size: 15, c: i === 0 || i === 4 ? 'l' : 'a' }));
  });
  // alberi con le potenze che passano
  parts.push(
    arrow(60, y, 100, y, 'v'), arrow(156, y, 180, y, 'v'), arrow(236, y, 260, y, 'v'), arrow(316, y, 340, y, 'v'),
    text(80, y - 34, 'C_mω_m', { c: 'v', size: 12 }), text(168, y - 34, "C′ω′", { c: 'v', size: 12 }), text(248, y - 34, "C″ω″", { c: 'v', size: 12 }), text(330, y - 34, 'C_uω_u', { c: 'v', size: 12 }),
    // perdite
    arrow(128, y + h / 2, 128, y + h / 2 + 30, 'f', 'W_diss1', 0, 12), arrow(208, y + h / 2, 208, y + h / 2 + 30, 'f', 'W_diss2', 0, 12), arrow(288, y + h / 2, 288, y + h / 2 + 30, 'f', 'W_diss3', 0, 12),
    text(128, y - 50, 'η^I', { c: 'a', size: 13 }), text(208, y - 50, 'η^II', { c: 'a', size: 13 }), text(288, y - 50, 'η^III', { c: 'a', size: 13 }),
    // sottosistemi
    line(20, 196, 156, 196, 'm', 1), text(88, 208, 'S₁: M → U_eq①', { c: 'm', size: 12 }),
    line(160, 222, 236, 222, 'm', 1), text(198, 234, 'S₂: M_eq① → U_eq②', { c: 'm', size: 12 }),
    line(240, 248, 380, 248, 'm', 1), text(310, 260, 'S₃: M_eq② → U', { c: 'm', size: 12 }),
    text(200, 284, 'η_TOT = η^I · η^II · η^III', { c: 'a', size: 14 }),
  );
  return svg(400, 300, parts, 'Rotismo ordinario come cascata di tre ingranaggi in serie fra motore e utilizzatore');
}

/** due osservatori: fisso (F) e solidale al portatreno (M), riduttore di p. 175 */
function disegnoEpi() {
  const panel = (ox: number, mobile: boolean) => {
    const cx = ox + 90, cy = 120, r1 = 22, r2 = 22, r3 = r1 + 2 * r2;
    const p: string[] = [circle(cx, cy, r3, 'l'), circle(cx, cy, r1, 'l'), circle(cx, cy - r1 - r2, r2, 'l'), line(cx, cy, cx, cy - r1 - r2, 'l', 4)];
    if (mobile) {
      p.push(rot(cx, cy, r3 + 14, 60, 30, 'v', '−Ω'), text(cx, cy + r3 + 30, 'M: portatreno fermo', { size: 12 }), text(cx, cy + r3 + 46, 'ω₁ − Ω,  0 − Ω', { size: 12, c: 'v' }));
    } else {
      for (let a = -40; a <= 40; a += 10) {
        const t = (a * Math.PI) / 180, x1 = cx + r3 * Math.cos(t), y1 = cy - r3 * Math.sin(t);
        p.push(line(x1, y1, x1 + 8 * Math.cos(t) + 4, y1 - 8 * Math.sin(t) + 4, 'g', 1));
      }
      p.push(rot(cx, cy, 14, -30, -150, 'v', 'ω₁'), rot(cx, cy, r3 + 14, 130, 100, 'v', 'Ω'), text(cx, cy + r3 + 30, 'F: osservatore fisso', { size: 12 }), text(cx, cy + r3 + 46, 'ω₁,  ω₃ = 0,  Ω', { size: 12, c: 'v' }));
    }
    return p.join('');
  };
  return svg(380, 240, [panel(0, false), panel(190, true), text(190, 18, 'W_P^F = W_P^M', { c: 'a', size: 14 })], 'Lo stesso riduttore visto dall\'osservatore fisso e da quello solidale al portatreno');
}

// ------------------------------------------------------------------ d092 rendimento del rotismo ordinario
const P181 = { tipo: 'dispensa', pag: 181 } as const;
const P184 = { tipo: 'dispensa', pag: 184 } as const;

export const d092: Dimostrazione = {
  id: 'd092',
  titolo: 'Rendimento dell\'ingranaggio e del rotismo ordinario in cascata',
  enunciato: 'Definire il rendimento di un ingranaggio con le potenze con segno, ricavare il rapporto delle coppie e la potenza dissipata con la ruota 1 movente, e dimostrare che il rendimento di una cascata di ingranaggi in serie è il prodotto dei rendimenti.',
  ipotesi: [
    'regime: niente termini d\'inerzia; τ = ω₂/ω₁ con segno (ingranaggio cilindrico esterno: τ < 0)',
    'potenze con segno: motrice W_m > 0, resistente W_u < 0, dissipata W_diss < 0',
    'ruota 1 movente (moto diretto); stadi in serie collegati da alberi rigidi',
  ],
  sample: (rnd) => {
    const tau = -U(rnd, 0.2, 3), w1 = U(rnd, 50, 300), w2 = tau * w1;
    const C1 = U(rnd, 5, 50), eta1 = U(rnd, 0.85, 0.99);
    const C2 = (-eta1 * C1 * w1) / w2; // potenza resistente = −η₁ × motrice
    const Wm = C1 * w1, Wu = C2 * w2, Wd = -(Wm + Wu);
    // cascata: tre stadi con rapporti t1, t2, t3 e rendimenti eI, eII, eIII
    const eI = U(rnd, 0.9, 0.99), eII = U(rnd, 0.9, 0.99), eIII = U(rnd, 0.9, 0.99);
    const t1 = -U(rnd, 0.3, 2), t2 = -U(rnd, 0.3, 2), t3 = U(rnd, 0.3, 2);
    const Cm = U(rnd, 5, 50), wm = U(rnd, 50, 300);
    const wu1 = t1 * wm, Cu1 = (-eI * Cm * wm) / wu1; // S₁
    const wm1 = wu1, Cm1 = -Cu1; // azione e reazione sull'albero comune
    const wu2 = t2 * wm1, Cu2 = (-eII * Cm1 * wm1) / wu2; // S₂
    const wm2 = wu2, Cm2 = -Cu2;
    const wu = t3 * wm2, Cu = (-eIII * Cm2 * wm2) / wu; // S₃
    return { tau, w1, w2, C1, C2, eta1, Wm, Wu, Wd, eI, eII, eIII, Cm, wm, wu1, Cu1, wm1, Cm1, wu2, Cu2, wm2, Cm2, wu, Cu };
  },
  passi: [
    {
      id: 'd092.1',
      latex: 'W_m + W_u + W_{diss} = 0, \\qquad W_m > 0,\\ W_u < 0,\\ W_{diss} < 0',
      perche: 'Bilancio delle potenze a regime con gli attriti: la potenza motrice (positiva) si divide fra quella ceduta all\'utilizzatore (negativa) e quella dissipata (negativa).',
      fonte: P181,
      distrattori: [],
      num: (v) => [v.Wm + v.Wu + v.Wd, 0],
    },
    {
      id: 'd092.2',
      latex: '\\eta = -\\dfrac{W_u}{W_m} \\;\\Rightarrow\\; \\eta_1 = -\\dfrac{C_2\\omega_2}{C_1\\omega_1} = -\\dfrac{C_2}{C_1}\\,\\tau',
      perche: 'Definizione del rendimento con le potenze con segno: il meno lo rende positivo. Con la ruota 1 movente $W_m = C_1\\omega_1$ e $W_u = C_2\\omega_2$, e $\\omega_2/\\omega_1 = \\tau$.',
      fonte: P181,
      distrattori: [
        { latex: '\\eta_1 = -\\dfrac{C_1}{C_2}\\,\\tau', errore: 'indice', spiega: 'Al numeratore c\'è la potenza d\'uscita C₂ω₂: η₁ = −(C₂/C₁)τ.', num: (v) => [v.eta1, -(v.C1 / v.C2) * v.tau] },
      ],
      num: (v) => [v.eta1, -(v.C2 / v.C1) * v.tau],
    },
    {
      id: 'd092.3',
      latex: '\\eta_1 C_1\\omega_1 + C_2\\omega_2 = 0 \\;\\Rightarrow\\; \\dfrac{C_1}{C_2} = -\\dfrac{\\tau}{\\eta_1}',
      perche: 'Si riscrive la definizione come bilancio: la potenza che arriva all\'utilizzatore è la frazione $\\eta_1$ della motrice. Rispetto al caso ideale ($C_1/C_2 = -\\tau$) il rendimento sta al denominatore. Per le cilindriche esterne $\\tau < 0$ e $C_1/C_2 > 0$.',
      fonte: P181,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{C_1}{C_2} = -\\tau\\,\\eta_1', errore: 'indice', spiega: 'Questa è la relazione con la ruota 2 movente (C₁/C₂ = −τη₂, p. 182).', num: (v) => [v.C1 / v.C2, -v.tau * v.eta1] },
        { latex: '\\dfrac{C_1}{C_2} = -\\tau', errore: 'termine-perso', spiega: 'È il caso ideale η = 1: con le perdite la coppia d\'uscita è più piccola.', num: (v) => [v.C1 / v.C2, -v.tau] },
        { latex: '\\dfrac{C_1}{C_2} = \\dfrac{\\tau}{\\eta_1}', errore: 'segno', spiega: 'Con le coppie con segno il meno resta: per l\'ingranaggio esterno τ < 0 e le due coppie hanno lo stesso segno.', num: (v) => [v.C1 / v.C2, v.tau / v.eta1] },
      ],
      num: (v) => [v.C1 / v.C2, -v.tau / v.eta1],
    },
    {
      id: 'd092.4',
      latex: 'W_{diss} = -(1 - \\eta_1)\\,C_1\\omega_1',
      perche: 'Si sostituisce $C_2\\omega_2 = -\\eta_1 C_1\\omega_1$ nel bilancio: $C_1\\omega_1 - \\eta_1 C_1\\omega_1 + W_{diss} = 0$. Si perde la frazione $1 - \\eta_1$ della potenza motrice.',
      fonte: P181,
      chiave: true,
      distrattori: [
        { latex: 'W_{diss} = (1 - \\eta_1)\\,C_1\\omega_1', errore: 'segno', spiega: 'La potenza dissipata è negativa (esce dal sistema), come W_u.', num: (v) => [v.Wd, (1 - v.eta1) * v.C1 * v.w1] },
        { latex: 'W_{diss} = -(1 - \\eta_1)\\,C_2\\omega_2', errore: 'indice', spiega: 'La frazione persa si riferisce alla potenza motrice, cioè quella della ruota movente 1.', num: (v) => [v.Wd, -(1 - v.eta1) * v.C2 * v.w2] },
      ],
      num: (v) => [v.Wd, -(1 - v.eta1) * v.C1 * v.w1],
    },
    {
      id: 'd092.5',
      latex: '\\text{coniche: } \\eta_1 = \\dfrac{|C_2||\\omega_2|}{|C_1||\\omega_1|} \\;\\Rightarrow\\; \\dfrac{|C_1|}{|C_2|} = \\dfrac{\\tau}{\\eta_1},\\ \\ \\tau = \\dfrac{|\\omega_2|}{|\\omega_1|}',
      perche: 'Nelle coniche gli assi sono concorrenti e un segno comune non ha senso: si lavora in modulo.',
      fonte: P181,
      distrattori: [],
      num: (v) => [Math.abs(v.C1) / Math.abs(v.C2), Math.abs(v.tau) / v.eta1],
    },
    {
      id: 'd092.6',
      latex: '\\eta^{I} C_m\\omega_m + C_u\'\\omega_u\' = 0 \\qquad (S_1)',
      perche: 'Cascata di p. 184: si isola il primo ingranaggio fra il motore e l\'albero intermedio, che per $S_1$ è un utilizzatore equivalente $U_{eq①}$. Vale il bilancio del singolo ingranaggio.',
      fonte: P184,
      distrattori: [],
      num: (v) => [v.eI * v.Cm * v.wm + v.Cu1 * v.wu1, 0],
    },
    {
      id: 'd092.7',
      latex: 'C_m\'\\omega_m\' = -C_u\'\\omega_u\' \\qquad (M_{eq①} = -U_{eq①})',
      perche: 'Principio di azione e reazione sull\'albero intermedio: la coppia che il secondo ingranaggio riceve è opposta a quella che il primo gli applica, alla stessa velocità. Quello che per $S_1$ è utilizzatore, per $S_2$ è motore equivalente.',
      fonte: P184,
      chiave: true,
      distrattori: [
        { latex: 'C_m\'\\omega_m\' = C_u\'\\omega_u\'', errore: 'segno', spiega: 'La potenza ceduta da S₁ (negativa) è ricevuta da S₂ (positiva): segni opposti.', num: (v) => [v.Cm1 * v.wm1, v.Cu1 * v.wu1] },
        { latex: 'C_m\'\\omega_m\' = -\\eta^{I} C_u\'\\omega_u\'', errore: 'fattore', spiega: 'Fra un albero e lo stesso albero non c\'è perdita: il rendimento η^I è già nel bilancio di S₁.', num: (v) => [v.Cm1 * v.wm1, -v.eI * v.Cu1 * v.wu1] },
      ],
      num: (v) => [v.Cm1 * v.wm1, -v.Cu1 * v.wu1],
    },
    {
      id: 'd092.8',
      latex: '\\eta^{I} C_m\\omega_m = C_m\'\\omega_m\' = -\\dfrac{C_u\'\'\\omega_u\'\'}{\\eta^{II}} \\;\\Rightarrow\\; \\eta^{I}\\eta^{II} C_m\\omega_m = C_m\'\'\\omega_m\'\'',
      perche: 'Bilancio di $S_2$: $\\eta^{II} C_m\'\\omega_m\' + C_u\'\'\\omega_u\'\' = 0$, poi di nuovo azione e reazione sul secondo albero intermedio.',
      fonte: P184,
      distrattori: [],
      num: (v) => [v.eI * v.eII * v.Cm * v.wm, v.Cm2 * v.wm2],
    },
    {
      id: 'd092.9',
      latex: '\\eta^{I}\\eta^{II}\\eta^{III}\\,C_m\\omega_m + C_u\\omega_u = 0',
      perche: 'Bilancio di $S_3$, $\\eta^{III} C_m\'\'\\omega_m\'\' + C_u\\omega_u = 0$, con la riga precedente: tutta la cascata si comporta come un solo ingranaggio fra motore e utilizzatore.',
      fonte: P184,
      chiave: true,
      distrattori: [
        { latex: '(\\eta^{I} + \\eta^{II} + \\eta^{III} - 2)\\,C_m\\omega_m + C_u\\omega_u = 0', errore: 'concetto', spiega: 'Le perdite non si sommano sulla potenza motrice: ogni stadio perde una frazione di quello che gli arriva, quindi i rendimenti si moltiplicano.', num: (v) => [(v.eI + v.eII + v.eIII - 2) * v.Cm * v.wm + v.Cu * v.wu, 0] },
        { latex: '\\eta^{III} C_m\\omega_m + C_u\\omega_u = 0', errore: 'termine-perso', spiega: 'All\'ultimo stadio non arriva C_mω_m ma solo η^Iη^II C_mω_m.', num: (v) => [v.eIII * v.Cm * v.wm + v.Cu * v.wu, 0] },
      ],
      num: (v) => [v.eI * v.eII * v.eIII * v.Cm * v.wm + v.Cu * v.wu, 0],
    },
    {
      id: 'd092.10',
      latex: '\\eta_{TOT} = -\\dfrac{C_u\\omega_u}{C_m\\omega_m} = \\eta^{I}\\eta^{II}\\eta^{III} \\qquad (0{,}98^3 \\simeq 0{,}941)',
      perche: 'Per definizione di rendimento del rotismo intero. Il rendimento totale è sempre minore del peggiore degli stadi: con tre stadi da 0,98 si perde circa il 6 %.',
      fonte: P184,
      distrattori: [],
      num: (v) => [-(v.Cu * v.wu) / (v.Cm * v.wm), v.eI * v.eII * v.eIII],
    },
  ],
  risultato: { latex: '\\dfrac{C_1}{C_2} = -\\dfrac{\\tau}{\\eta_1},\\quad W_{diss} = -(1 - \\eta_1)C_1\\omega_1,\\quad \\eta_{TOT} = \\eta^{I}\\eta^{II}\\eta^{III}', fonte: { tipo: 'dispensa', pag: [181, 184] } },
  gancio: 'Ogni stadio passa al successivo la sua frazione η: azione e reazione sull\'albero, e i rendimenti si moltiplicano.',
};

// ------------------------------------------------------------------ d140 riduttore di coppia
export const d140: Dimostrazione = {
  id: 'd140',
  titolo: 'Riduttore di giri e di coppia: coppie, rendimento, avviamento',
  enunciato: 'Ricavare come un ingranaggio trasforma coppia e velocità con rendimento η, nei due versi del flusso di potenza, la condizione per cui un ingranaggio inizialmente fermo resta in quiete, e la relazione motore–utilizzatore a regime con trasmissione.',
  ipotesi: [
    'regime; τ = ω₂/ω₁ = ω_u/ω_m (in modulo dove indicato)',
    'moto diretto: ruota 1 movente con rendimento η₁; moto retrogrado: ruota 2 movente con rendimento η₂',
    'coppie applicate in modulo per la condizione di avviamento',
  ],
  sample: (rnd) => {
    const t = U(rnd, 0.1, 0.9), ts = -t; // riduttore esterno: τ con segno negativo
    const w1 = U(rnd, 50, 300), w2 = ts * w1;
    const C1 = U(rnd, 5, 60), eta1 = U(rnd, 0.85, 0.99), eta2 = U(rnd, 0.8, 0.98);
    const C2 = (-eta1 * C1 * w1) / w2; // moto diretto
    const C2r = U(rnd, 5, 60), C1r = (-eta2 * C2r * w2) / w1; // moto retrogrado: 2 movente
    // p. 201: motore–utilizzatore a regime, C_u in modulo
    const Cm = U(rnd, 5, 60), wm = U(rnd, 50, 300), wu = t * wm, eta = U(rnd, 0.85, 0.99);
    const Cu0 = (Cm * wm) / wu, Cu = (eta * Cm * wm) / wu;
    return { t, ts, w1, w2, C1, eta1, eta2, C2, C2r, C1r, Cm, wm, wu, eta, Cu0, Cu };
  },
  passi: [
    {
      id: 'd140.1',
      latex: '\\eta_1 C_1\\omega_1 + C_2\\omega_2 = 0, \\qquad \\tau = \\dfrac{\\omega_2}{\\omega_1}',
      perche: 'Bilancio delle potenze a regime con la ruota 1 movente («RICORDA» di p. 180): all\'uscita arriva la frazione $\\eta_1$ della potenza motrice.',
      fonte: { tipo: 'dispensa', pag: [180, 181] },
      distrattori: [],
      num: (v) => [v.eta1 * v.C1 * v.w1 + v.C2 * v.w2, 0],
    },
    {
      id: 'd140.2',
      latex: '\\dfrac{C_1}{C_2} = -\\dfrac{\\tau}{\\eta_1} \\;\\Rightarrow\\; |C_2| = \\eta_1\\,\\dfrac{|C_1|}{|\\tau|}',
      perche: 'In modulo la coppia d\'uscita è la coppia d\'entrata divisa per $|\\tau|$ e ridotta dal rendimento: dove la velocità si riduce, la coppia cresce.',
      fonte: { tipo: 'dispensa', pag: [180, 181] },
      chiave: true,
      distrattori: [
        { latex: 'C_2 = \\eta_1\\,\\dfrac{C_1}{\\tau}', errore: 'segno', spiega: 'È la forma di q16 senza il segno (NF-44): con le coppie con segno C₂ = −η₁C₁/τ; senza segno vale solo fra i moduli.', num: (v) => [v.C2, (v.eta1 * v.C1) / v.ts] },
        { latex: '|C_2| = \\eta_1\\,|\\tau|\\,|C_1|', errore: 'indice', spiega: 'La potenza (circa) si conserva: se ω scende di |τ|, C sale di 1/|τ|.', num: (v) => [Math.abs(v.C2), v.eta1 * v.t * v.C1] },
        { latex: '|C_2| = \\dfrac{|C_1|}{\\eta_1|\\tau|}', errore: 'fattore', spiega: 'Le perdite riducono la coppia d\'uscita: η₁ moltiplica, non divide.', num: (v) => [Math.abs(v.C2), v.C1 / (v.eta1 * v.t)] },
      ],
      num: (v) => [Math.abs(v.C2), (v.eta1 * v.C1) / v.t],
    },
    {
      id: 'd140.3',
      latex: '|\\tau| < 1:\\ \\text{riduttore di giri} = \\text{moltiplicatore di coppia};\\quad |\\tau| > 1:\\ \\text{moltiplicatore di giri} = \\text{riduttore di coppia}',
      perche: 'Dalla riga precedente: $|C_2|/|C_1| = \\eta_1/|\\tau|$. Il «riduttore di coppia» di q16 è quindi un moltiplicatore di giri. La dispensa aggiunge: il rendimento è migliore per $\\tau < 1$ con la ruota veloce motrice (moto diretto) e peggiore per $\\tau > 1$ con la ruota lenta motrice (moto retrogrado).',
      fonte: { tipo: 'dispensa', pag: [180, 182] },
      distrattori: [],
    },
    {
      id: 'd140.4',
      latex: '\\eta_2 C_2\\omega_2 + C_1\\omega_1 = 0 \\;\\Rightarrow\\; \\dfrac{C_1}{C_2} = -\\tau\\,\\eta_2',
      perche: 'Se il flusso di potenza si inverte (ruota 2 movente) il rendimento si applica alla potenza della ruota 2: $\\eta_2 = -C_1\\omega_1/(C_2\\omega_2)$. Non basta mettere $1/\\eta_1$: $\\eta_2$ è un altro numero ($\\eta_1 \\ne \\eta_2$ per τ lontani da 1).',
      fonte: { tipo: 'dispensa', pag: 182 },
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{C_1}{C_2} = -\\dfrac{\\tau}{\\eta_2}', errore: 'indice', spiega: 'Con 2 movente il rendimento sta sulla potenza di 2: η₂C₂ω₂ = −C₁ω₁, quindi C₁/C₂ = −τη₂.', num: (v) => [v.C1r / v.C2r, -v.ts / v.eta2] },
        { latex: '\\dfrac{C_1}{C_2} = -\\tau', errore: 'termine-perso', spiega: 'Anche nel moto retrogrado ci sono perdite.', num: (v) => [v.C1r / v.C2r, -v.ts] },
      ],
      num: (v) => [v.C1r / v.C2r, -v.ts * v.eta2],
    },
    {
      id: 'd140.5',
      latex: '\\tau\\,\\eta_2 < \\dfrac{|C_1|}{|C_2|} < \\dfrac{\\tau}{\\eta_1} \\;\\Rightarrow\\; \\text{l\'ingranaggio resta in quiete} \\quad (*)',
      perche: 'Nel passaggio dalla statica alla dinamica (avviamento): per far muovere l\'ingranaggio con 1 movente serve $|C_1|/|C_2| = \\tau/\\eta_1$, con 2 movente $\\tau\\eta_2$. Fra i due valori l\'attrito equilibra le coppie e l\'ingranaggio, inizialmente fermo, resta fermo.',
      fonte: { tipo: 'dispensa', pag: 182 },
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{\\tau}{\\eta_2} < \\dfrac{|C_1|}{|C_2|} < \\tau\\,\\eta_1', errore: 'indice', spiega: 'Con η < 1 questo intervallo è vuoto: gli estremi sono τη₂ (2 movente) e τ/η₁ (1 movente).' },
        { latex: '\\dfrac{|C_1|}{|C_2|} = \\tau \\text{ e basta}', errore: 'ipotesi', spiega: 'È il caso senza attrito: con gli attriti c\'è un intero intervallo di coppie che non mette in moto l\'ingranaggio.' },
      ],
    },
    {
      id: 'd140.6',
      latex: '\\eta_2 \\le 0 \\;\\Rightarrow\\; \\text{moto retrogrado impossibile: moto irreversibile}',
      perche: 'Rendimento negativo vuol dire che le perdite sono tali che anche il lato normalmente resistente dovrebbe fornire potenza per bilanciarle: il moto retrogrado non può avvenire. Esempio: vite senza fine e ruota elicoidale, $\\tau = z_1/z_2 \\ll 1$; la ruota non può muovere la vite.',
      fonte: { tipo: 'dispensa', pag: [182, 183] },
      correzione: { nf: 'NF-27', dispensaScrive: '\\eta = -\\dfrac{W_u}{W_m} > 0 \\quad (W_m > 0,\\ W_u > 0)' },
      distrattori: [],
    },
    {
      id: 'd140.7',
      latex: '\\text{regime, } \\eta = 1:\\ C_m\\omega_m - C_u\\omega_u = 0 \\;\\Rightarrow\\; C_m = C_u\\,\\tau',
      perche: 'Accoppiamento motore–carico con trasmissione (cap. 6, p. 201) a regime ($\\dot\\omega = 0$), con $C_u$ modulo della coppia resistente: la coppia resistente «ridotta all\'asse del motore» è $\\tau C_u$. Con un riduttore ($\\tau < 1$) il motore vede una coppia più piccola.',
      fonte: { tipo: 'dispensa', pag: 201 },
      distrattori: [],
      num: (v) => [v.Cm, v.Cu0 * v.t],
    },
    {
      id: 'd140.8',
      latex: '\\eta \\ne 1:\\ \\eta\\,C_m\\omega_m = C_u\\omega_u \\;\\Rightarrow\\; C_u = \\eta\\,\\dfrac{C_m}{\\tau}',
      perche: 'In moto diretto il rendimento si applica alla potenza che attraversa la trasmissione. È la «trasformazione potenza–coppia–velocità» di d140 scritta con il $\\tau$ della dispensa (d140 usa $i = 1/\\tau$: $C_{out} = \\eta\\,i\\,C_{in}$).',
      fonte: { tipo: 'deduzione', da: 'p. 201 (regime) e p. 180 (η C₁ω₁ + C₂ω₂ = 0)', spiegazione: 'la dispensa a p. 201 scrive l\'equazione con η in forma incoerente (NF-28); a regime, con η sulla potenza trasmessa, si ha C_u = ηC_m/τ' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: 'C_u = \\eta\\,\\tau\\,C_m', errore: 'indice', spiega: 'Con i = ω_in/ω_out (d140) C_out = ηiC_in: in termini di τ = 1/i la coppia si divide per τ.', num: (v) => [v.Cu, v.eta * v.t * v.Cm] },
        { latex: 'C_u = \\dfrac{C_m}{\\eta\\,\\tau}', errore: 'fattore', spiega: 'Il rendimento riduce la coppia disponibile all\'utilizzatore.', num: (v) => [v.Cu, v.Cm / (v.eta * v.t)] },
      ],
      num: (v) => [v.Cu, (v.eta * v.Cm) / v.t],
    },
  ],
  risultato: { latex: '|C_2| = \\eta_1\\dfrac{|C_1|}{|\\tau|}\\ (\\text{1 movente}),\\quad \\dfrac{C_1}{C_2} = -\\tau\\eta_2\\ (\\text{2 movente}),\\quad \\tau\\eta_2 < \\dfrac{|C_1|}{|C_2|} < \\dfrac{\\tau}{\\eta_1}\\ \\text{quiete}', fonte: { tipo: 'dispensa', pag: [180, 182] } },
  gancio: 'Riduttore di giri = moltiplicatore di coppia; il rendimento si applica sempre alla potenza di chi muove.',
};

// ------------------------------------------------------------------ d093 rendimento di un epicicloidale (fonte esterna)
const EST = {
  tipo: 'esterna',
  ref: 'trattazione classica del rendimento dei rotismi epicicloidali (metodo delle potenze nel moto relativo al portatreno)',
  nota: 'assente dalla dispensa (pp. 174–192): q52 lo attribuisce «alle dispense» ma non c\'è; ricostruito e verificato con SymPy (NF-07, NF-201)',
} as const;

export const d093: Dimostrazione = {
  id: 'd093',
  titolo: 'Rendimento di un rotismo epicicloidale',
  enunciato: 'Per un epicicloidale con un solare fisso, solare 1 motore e portatreno condotto, ricavare il rendimento η_EPI in funzione del rapporto di Willis τ_W e del rendimento η_o del rotismo reso ordinario.',
  ipotesi: [
    'regime; le perdite sono dovute agli strisciamenti nei contatti e dipendono solo dai moti relativi: la potenza dissipata è la stessa per l\'osservatore fisso e per quello solidale al portatreno',
    'nel moto relativo al portatreno il rotismo è ordinario e ha rendimento η_o (stesse forze, stesse velocità di strisciamento)',
    'solare fisso: ω₃ = 0 (3 è la corona nel riduttore di p. 175, il solare 4 nel combinato di p. 180)',
  ],
  sample: (rnd) => {
    const eo = U(rnd, 0.9, 0.99), w1 = U(rnd, 50, 300), C1 = U(rnd, 5, 50);
    // caso τ_W < 1 (riduttore a corona fissa: τ_W < 0)
    const tauW = -U(rnd, 0.2, 3), W = (w1 * tauW) / (tauW - 1);
    const Wd = -(1 - eo) * C1 * (w1 - W); // nel moto relativo 1 è movente
    const C3 = (C1 * (w1 - W) + Wd) / W; // bilancio relativo: C₁(ω₁ − Ω) + C₃(0 − Ω) + W_diss = 0
    const Cp = -(C1 + C3); // equilibrio
    const etaE = (-Cp * W) / (C1 * w1);
    // caso τ_W > 1 (satellite doppio): nel moto relativo 1 è cedente
    const tauW2 = U(rnd, 1.3, 4), W2 = (w1 * tauW2) / (tauW2 - 1);
    const Wd2 = ((1 - eo) / eo) * C1 * (w1 - W2);
    const etaE2 = 1 + Wd2 / (C1 * w1);
    return { eo, w1, C1, tauW, W, Wd, C3, Cp, etaE, tauW2, W2, Wd2, etaE2 };
  },
  passi: [
    {
      id: 'd093.1',
      latex: 'W_P^{F} = W_P^{M}',
      perche: 'Si osserva lo stesso rotismo da un osservatore fisso F e da uno M solidale al portatreno. La potenza dissipata dipende dalle forze d\'attrito e dalle velocità di **strisciamento** fra i denti, che sono velocità relative: è la stessa per i due osservatori.',
      fonte: EST,
      distrattori: [],
    },
    {
      id: 'd093.2',
      latex: 'C_1\\omega_1 + C_p\\Omega + W_P^{F} = 0,\\ \\ \\eta_{EPI} = -\\dfrac{C_p\\Omega}{C_1\\omega_1} \\;\\Rightarrow\\; W_P^{F} = -(1 - \\eta_{EPI})\\,C_1\\omega_1',
      perche: 'Osservatore fisso: bilancio delle potenze con $\\omega_3 = 0$ (il solare fisso non fa potenza) e definizione del rendimento come per l\'ordinario (p. 181), con il portatreno come utilizzatore.',
      fonte: { tipo: 'deduzione', da: 'p. 181 (η = −W_u/W_m, W_diss = −(1 − η)W_m) applicata all\'epicicloidale', spiegazione: 'stessa definizione del rendimento dell\'ingranaggio, con W_m = C₁ω₁ e W_u = C_pΩ' },
      distrattori: [],
      num: (v) => [v.Wd, -(1 - v.etaE) * v.C1 * v.w1],
    },
    {
      id: 'd093.3',
      latex: 'C_1(\\omega_1 - \\Omega) + C_3(\\omega_3 - \\Omega) + W_P^{M} = 0, \\qquad W_P^{M} = -(1 - \\eta_o)\\,C_1(\\omega_1 - \\Omega)',
      perche: 'Osservatore sul portatreno: le coppie sono le stesse, le velocità quelle relative; il portatreno è fermo e non fa potenza. È un ordinario 1 → 3 con rendimento $\\eta_o$. Se $C_1(\\omega_1 - \\Omega) > 0$ il solare 1 è movente anche nel moto relativo, e la perdita è la frazione $1 - \\eta_o$ della sua potenza **relativa**.',
      fonte: EST,
      chiave: true,
      distrattori: [
        { latex: 'W_P^{M} = -(1 - \\eta_o)\\,C_1\\omega_1', errore: 'concetto', spiega: 'Per l\'osservatore M la velocità del solare è ω₁ − Ω: la potenza che passa nell\'ordinario equivalente è C₁(ω₁ − Ω).', num: (v) => [v.Wd, -(1 - v.eo) * v.C1 * v.w1] },
        { latex: 'W_P^{M} = -(1 - \\eta_o)\\,C_p\\Omega', errore: 'concetto', spiega: 'Nel moto relativo il portatreno è fermo: la sua coppia non fa potenza.', num: (v) => [v.Wd, -(1 - v.eo) * v.Cp * v.W] },
      ],
      num: (v) => [v.C1 * (v.w1 - v.W) + v.C3 * (0 - v.W) + v.Wd, 0],
    },
    {
      id: 'd093.4',
      latex: '(1 - \\eta_{EPI})\\,\\omega_1 = (1 - \\eta_o)(\\omega_1 - \\Omega) \\;\\Rightarrow\\; 1 - \\eta_{EPI} = (1 - \\eta_o)\\Big(1 - \\dfrac{\\Omega}{\\omega_1}\\Big)',
      perche: 'Si uguagliano le due potenze dissipate e si semplifica $-C_1$, poi si divide per $\\omega_1$.',
      fonte: EST,
      chiave: true,
      distrattori: [
        { latex: '1 - \\eta_{EPI} = (1 - \\eta_o)\\,\\dfrac{\\Omega}{\\omega_1}', errore: 'termine-perso', spiega: 'La velocità relativa del solare è ω₁ − Ω: diviso ω₁ dà 1 − Ω/ω₁.', num: (v) => [1 - v.etaE, (1 - v.eo) * (v.W / v.w1)] },
        { latex: '\\eta_{EPI} = \\eta_o', errore: 'concetto', spiega: 'Le perdite sono le stesse, ma la potenza che attraversa il rotismo cambia con l\'osservatore: i rendimenti sono diversi.', num: (v) => [v.etaE, v.eo] },
      ],
      num: (v) => [(1 - v.etaE) * v.w1, (1 - v.eo) * (v.w1 - v.W)],
    },
    {
      id: 'd093.5',
      latex: '\\dfrac{\\Omega}{\\omega_1} = \\dfrac{\\tau_W}{\\tau_W - 1} \\;\\Rightarrow\\; 1 - \\dfrac{\\Omega}{\\omega_1} = -\\dfrac{1}{\\tau_W - 1}',
      perche: 'Willis con il solare 3 fisso, come nel riduttore di p. 175 e nel combinato di p. 180.',
      fonte: { tipo: 'dispensa', pag: [175, 180] },
      distrattori: [],
      num: (v) => [1 - v.W / v.w1, -1 / (v.tauW - 1)],
    },
    {
      id: 'd093.6',
      latex: '\\eta_{EPI} = 1 + \\dfrac{1 - \\eta_o}{\\tau_W - 1} = \\dfrac{\\tau_W - \\eta_o}{\\tau_W - 1} \\qquad (\\tau_W < 1)',
      perche: 'Si sostituisce. Il caso vale quando $1 - \\Omega/\\omega_1 > 0$, cioè (con $\\Omega/\\omega_1 = \\tau_W/(\\tau_W - 1)$) per $\\tau_W < 1$: per esempio il riduttore a corona fissa, $\\tau_W < 0$.',
      fonte: EST,
      chiave: true,
      distrattori: [
        { latex: '\\eta_{EPI} = \\dfrac{\\eta_o\\tau_W - 1}{\\eta_o(\\tau_W - 1)}', errore: 'ipotesi', spiega: 'È la formula dell\'altro caso (τ_W > 1), in cui nel moto relativo il solare 1 è cedente.', num: (v) => [v.etaE, (v.eo * v.tauW - 1) / (v.eo * (v.tauW - 1))] },
        { latex: '\\eta_{EPI} = \\dfrac{\\tau_W + \\eta_o}{\\tau_W + 1}', errore: 'segno', spiega: '1 − Ω/ω₁ = −1/(τ_W − 1): il denominatore è τ_W − 1.', num: (v) => [v.etaE, (v.tauW + v.eo) / (v.tauW + 1)] },
      ],
      num: (v) => [v.etaE, (v.tauW - v.eo) / (v.tauW - 1)],
    },
    {
      id: 'd093.7',
      latex: '\\tau_W = -\\tfrac13,\\ \\eta_o = 0{,}98:\\quad \\eta_{EPI} = \\dfrac{-\\frac13 - 0{,}98}{-\\frac43} = 0{,}985 > \\eta_o',
      perche: 'Nel riduttore di p. 175 solo una parte della potenza passa attraverso gli ingranamenti (il resto è trasmessa dal trascinamento): le perdite pesano meno e il rendimento è migliore di quello dell\'ordinario.',
      fonte: { tipo: 'deduzione', da: 'riga precedente con i dati del riduttore di p. 175', spiegazione: 'τ_W = −1/3 e un rendimento d\'ingranaggio tipico η_o = 0,98 (p. 182)' },
      distrattori: [],
      num: () => [rendimentoEpi(-1 / 3, 0.98).eta, 0.985],
    },
    {
      id: 'd093.8',
      latex: '\\tau_W > 1:\\ W_P^{M} = \\dfrac{1 - \\eta_o}{\\eta_o}\\,C_1(\\omega_1 - \\Omega) \\;\\Rightarrow\\; \\eta_{EPI} = \\dfrac{\\eta_o\\tau_W - 1}{\\eta_o(\\tau_W - 1)}',
      perche: 'Ora $\\omega_1 - \\Omega$ ha segno opposto a $\\omega_1$: nel moto relativo il solare 1 è **cedente** e il movente è il solare fisso. Il rendimento si applica alla potenza del movente: $\\eta_o C_3(\\omega_3 - \\Omega) + C_1(\\omega_1 - \\Omega) = 0$, quindi $W_P^M = -(1 - \\eta_o)C_3(\\omega_3 - \\Omega)$. Uguagliando ancora le perdite si trova la seconda formula.',
      fonte: EST,
      chiave: true,
      distrattori: [
        { latex: '\\eta_{EPI} = \\dfrac{\\tau_W - \\eta_o}{\\tau_W - 1}', errore: 'ipotesi', spiega: 'Questa vale se nel moto relativo il solare 1 è movente (τ_W < 1). Con τ_W > 1 il flusso relativo è invertito.', num: (v) => [v.etaE2, (v.tauW2 - v.eo) / (v.tauW2 - 1)] },
        { latex: 'W_P^{M} = -(1 - \\eta_o)\\,C_1(\\omega_1 - \\Omega)', errore: 'concetto', spiega: 'Il rendimento si applica alla potenza di chi muove: nel moto relativo ora muove l\'altro solare.', num: (v) => [v.Wd2, -(1 - v.eo) * v.C1 * (v.w1 - v.W2)] },
      ],
      num: (v) => [v.etaE2, (v.eo * v.tauW2 - 1) / (v.eo * (v.tauW2 - 1))],
    },
    {
      id: 'd093.9',
      latex: '\\eta_{EPI} \\le 0 \\;\\Rightarrow\\; \\text{il moto ipotizzato non può avvenire (irreversibilità)}',
      perche: 'Per alcuni rapporti (p. es. $\\eta_o < \\tau_W < 1$, o $1 < \\tau_W < 1/\\eta_o$) la formula dà un rendimento negativo: le potenze che circolano negli ingranamenti sono molto più grandi di quella utile e le perdite non possono essere coperte. È lo stesso significato del rendimento negativo di pp. 182–183.',
      fonte: { tipo: 'deduzione', da: 'pp. 182–183 (rendimento negativo, irreversibilità) applicata alle due formule', spiegazione: 'segno delle formule di η_EPI al variare di τ_W' },
      distrattori: [],
    },
  ],
  risultato: { latex: '\\eta_{EPI} = \\dfrac{\\tau_W - \\eta_o}{\\tau_W - 1}\\ (\\tau_W < 1), \\qquad \\eta_{EPI} = \\dfrac{\\eta_o\\tau_W - 1}{\\eta_o(\\tau_W - 1)}\\ (\\tau_W > 1)', fonte: EST },
  gancio: 'Le perdite non dipendono dall\'osservatore: calcolale dal portatreno, dove il rotismo è ordinario, e uguagliale.',
};

// ------------------------------------------------------------------ argomenti
export const rendimentoOrdinario: ArgomentoContenuto = {
  id: 'c5-rendimento-ordinario',
  cosaDireSubito:
    'Con gli attriti il bilancio delle potenze ha anche la potenza dissipata: W_m + W_u + W_diss = 0, e il rendimento è η = −W_u/W_m. Per un ingranaggio con la ruota 1 movente η₁C₁ω₁ + C₂ω₂ = 0, quindi C₁/C₂ = −τ/η₁: un riduttore di giri è un moltiplicatore di coppia. In una cascata di ingranaggi in serie i rendimenti si moltiplicano.',
  sistemaIpotesi: [
    'Sistema: ingranaggio 1–2 (o cascata di stadi I, II, III) fra motore M e utilizzatore U.',
    'Regime: niente inerzie; τ = ω₂/ω₁ con segno per le cilindriche, in modulo per le coniche.',
    'Potenze con segno: W_m > 0, W_u < 0, W_diss < 0.',
    'Il rendimento dipende dal verso del flusso di potenza: η₁ con 1 movente, η₂ con 2 movente.',
  ],
  disegno: {
    svg: disegnoCascata(),
    didascalia: 'Rotismo come cascata di ingranaggi in serie (p. 184): ogni sottosistema ha un motore e un utilizzatore equivalenti; a ogni stadio si perde W_diss.',
    fonte: { tipo: 'dispensa', pag: 184, fig: 'schema a blocchi e sottosistemi S₁, S₂, S₃' },
    elementi: [
      { id: 'blocchi', testo: 'motore M, stadi I₁, I₂, I₃, utilizzatore U in serie', obbligatorio: true },
      { id: 'potenze', testo: 'potenze che passano sugli alberi (C_mω_m … C_uω_u)', obbligatorio: true },
      { id: 'perdite', testo: 'potenza dissipata a ogni stadio', obbligatorio: true },
      { id: 'sottosistemi', testo: 'sottosistemi S₁, S₂, S₃ con M_eq e U_eq', obbligatorio: false },
      { id: 'ingranaggio', testo: 'per il singolo ingranaggio: ruote 1 e 2 con C₁, ω₁, C₂, ω₂ e il verso del flusso', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'W_m + W_u + W_{diss} = 0, \\qquad \\eta = -\\dfrac{W_u}{W_m}',
    spiegazione: 'Bilancio delle potenze con gli attriti e definizione del rendimento con le potenze con segno.',
    fonte: { tipo: 'dispensa', pag: 181 },
  },
  dimostrazioni: ['d092', 'd140'],
  significato:
    'Il rendimento si applica sempre alla potenza di chi muove: per questo η₁ ≠ η₂ e le relazioni fra le coppie cambiano col verso del moto. Ne seguono la fascia di quiete all\'avviamento (τη₂ < |C₁|/|C₂| < τ/η₁) e, se η del moto retrogrado è ≤ 0, l\'irreversibilità (vite senza fine). In serie le perdite si accumulano: η_TOT è il prodotto ed è sempre minore dello stadio peggiore.',
  fraseDaRicordare: 'η = −W_u/W_m; con 1 movente C₁/C₂ = −τ/η₁, con 2 movente −τη₂; in serie η_TOT = Π η.',
  daNonDire: [
    { frase: 'C_u = η C_i/τ (con le coppie con segno).', perche: 'Con la convenzione della dispensa C₂ = −η₁C₁/τ: senza segno vale solo fra i moduli (q16, NF-44).', fonte: { tipo: 'dispensa', pag: [180, 181] } },
    { frase: 'Nel moto retrogrado basta usare 1/η₁.', perche: 'Il rendimento si ridefinisce sulla nuova potenza motrice: C₁/C₂ = −τη₂ con un η₂ diverso da η₁.', fonte: { tipo: 'dispensa', pag: 182 } },
    { frase: 'Il rendimento totale è la somma dei rendimenti degli stadi meno qualcosa.', perche: 'Ogni stadio perde una frazione di ciò che riceve: η_TOT = η^Iη^IIη^III.', fonte: { tipo: 'dispensa', pag: 184 } },
    { frase: 'Rendimento negativo: η = −W_u/W_m > 0 con W_u > 0.', perche: 'È il refuso di p. 183 (NF-27): con W_m > 0 e W_u > 0 il rendimento è negativo, ed è proprio questo che vuol dire.', fonte: { tipo: 'dispensa', pag: 183 } },
    { frase: 'Un riduttore di coppia riduce i giri.', perche: 'È il contrario: riduttore di giri ⇒ moltiplicatore di coppia; il riduttore di coppia è un moltiplicatore di giri.', fonte: { tipo: 'dispensa', pag: 180 } },
  ],
  approfondimenti: [
    { domanda: 'Quando un ingranaggio fermo resta fermo?', tipo: 'approfondimento', attesa: 'Se τη₂ < |C₁|/|C₂| < τ/η₁ (condizione (*), p. 182): per muoverlo con 1 movente serve |C₁|/|C₂| = τ/η₁, con 2 movente τη₂; in mezzo l\'attrito tiene.', fonte: { tipo: 'dispensa', pag: 182 } },
    { domanda: 'Che cosa significa un rendimento negativo?', tipo: 'approfondimento', attesa: 'Che le perdite sono così grandi che anche il lato normalmente resistente dovrebbe diventare motore per bilanciarle: il moto in quel verso non può avvenire. Il moto è irreversibile, come nella vite senza fine con ruota elicoidale (τ = z₁/z₂ ≪ 1).', fonte: { tipo: 'dispensa', pag: [182, 183] } },
    { domanda: 'Quando il rendimento di un ingranaggio è migliore?', tipo: 'approfondimento', attesa: 'Per τ ≅ 1 η₁ ≅ η₂ ≅ 0,98; per τ piccoli o grandi calano. Migliore con τ < 1 e ruota veloce motrice (riduttore, moto diretto), peggiore con τ > 1 e ruota lenta motrice (moltiplicatore, moto retrogrado).', fonte: { tipo: 'dispensa', pag: 182 } },
    { domanda: 'Come entra il rendimento nell\'accoppiamento motore–utilizzatore con trasmissione?', tipo: 'collegamento', argomento: 'c6-trasmissione', attesa: 'A regime C_m = C_uτ/η (moto diretto): la coppia resistente ridotta all\'asse motore è τC_u/η, e nell\'equazione del moto anche l\'inerzia dell\'utilizzatore si riduce come I_uτ²/η.', fonte: { tipo: 'dispensa', pag: 201 } },
    { domanda: 'E il rendimento di un epicicloidale si calcola allo stesso modo?', tipo: 'collegamento', argomento: 'c5-rendimento-epi', attesa: 'No: il portatreno è mobile e scambia potenza. Si calcolano le perdite nel moto relativo al portatreno con il rendimento dell\'ordinario equivalente e si uguagliano a quelle viste da fermo (fonte esterna).', fonte: EST },
    { domanda: 'Con le coniche come scrivi la relazione fra le coppie?', tipo: 'approfondimento', attesa: 'In modulo: τ = |ω₂|/|ω₁|, |C₁|/|C₂| = τ/η₁ con 1 movente, τη₂ con 2 movente: con assi concorrenti un segno comune non ha senso.', fonte: { tipo: 'dispensa', pag: [181, 182] } },
  ],
  simboli: [
    { simbolo: '\\tau', significato: 'rapporto di trasmissione ω₂/ω₁ = ω_u/ω_m (con segno per le cilindriche)', altrove: 'i = ω_in/ω_out in d140 (reciproco, NF-09)' },
    { simbolo: '\\eta_1,\\ \\eta_2', significato: 'rendimento con la ruota 1 movente, con la ruota 2 movente' },
    { simbolo: '\\eta^{I},\\ \\eta^{II},\\ \\eta^{III}', significato: 'rendimenti degli stadi della cascata', altrove: 'η_j in q51' },
    { simbolo: 'W_m,\\ W_u,\\ W_{diss}', significato: 'potenza motrice (> 0), resistente (< 0), dissipata (< 0)', altrove: 'W_in, W_out, W_P in q51; P_in, P_out in q16' },
    { simbolo: 'C_1,\\ C_2', significato: 'coppie (con segno) sulle ruote 1 e 2', altrove: 'C_i, C_u in q16' },
    { simbolo: 'M_{eq},\\ U_{eq}', significato: 'motore e utilizzatore equivalenti dei sottosistemi (p. 184)' },
  ],
  visuali: [
    { kind: 'meccanismo', id: 'c5b-avviamento' },
    { kind: 'meccanismo', id: 'c5b-cascata' },
  ],
  previsioni: [
    {
      id: 'c5b-rend-cascata',
      domanda: 'Tre ingranaggi in serie, ciascuno con η = 0,98. Il rendimento del rotismo è circa…',
      opzioni: ['0,94', '0,98', '0,96', '2,94'],
      corretta: 0,
      spiega: 'η_TOT = 0,98³ ≈ 0,941: i rendimenti in serie si moltiplicano (p. 184).',
      verify: () => [0.94, 0.98, 0.96, 2.94].reduce((best, x, i, a) => (Math.abs(x - rendimentoCascata([0.98, 0.98, 0.98])) < Math.abs(a[best] - rendimentoCascata([0.98, 0.98, 0.98])) ? i : best), 0),
      visual: { kind: 'meccanismo', id: 'c5b-cascata' },
    },
    {
      id: 'c5b-rend-quiete',
      domanda: 'Ingranaggio fermo con τ = 0,5 e η₁ = η₂ = 0,9. Applichi coppie con |C₁|/|C₂| = 0,5. Che succede?',
      opzioni: ['parte con 1 movente', 'parte con 2 movente', 'resta in quiete', 'non si può dire'],
      corretta: 2,
      spiega: 'La fascia di quiete è τη₂ = 0,45 < |C₁|/|C₂| < τ/η₁ = 0,556: 0,5 ci sta dentro.',
      verify: () => ({ '1-movente': 0, '2-movente': 1, quiete: 2 })[avviamento({ tau: 0.5, eta1: 0.9, eta2: 0.9, rC: 0.5 }).stato],
      visual: { kind: 'meccanismo', id: 'c5b-avviamento' },
    },
    {
      id: 'c5b-rend-riduttore',
      domanda: 'Riduttore con |τ| = 1/4 e η₁ = 0,95; il motore dà 10 N·m. La coppia all\'uscita è circa…',
      opzioni: ['2,4 N·m', '9,5 N·m', '38 N·m', '42 N·m'],
      corretta: 2,
      spiega: '|C₂| = η₁|C₁|/|τ| = 0,95 · 10 · 4 = 38 N·m: riduttore di giri, moltiplicatore di coppia.',
      verify: () => [2.4, 9.5, 38, 42].findIndex((x) => Math.abs(x - coppiaUscita(10, 0.25, 0.95)) < 0.05),
    },
  ],
  nf: ['NF-09', 'NF-27', 'NF-28', 'NF-44', 'NF-205'],
};

export const rendimentoEpiArg: ArgomentoContenuto = {
  id: 'c5-rendimento-epi',
  cosaDireSubito:
    'La dispensa non tratta il rendimento degli epicicloidali: lo espongo con la trattazione classica, dichiarandolo. L\'idea è che la potenza persa per attrito dipende solo dagli strisciamenti relativi, quindi è la stessa per un osservatore fisso e per uno solidale al portatreno. Dal portatreno il rotismo è ordinario con rendimento η_o; uguagliando le perdite e usando Willis si ricava η_EPI.',
  sistemaIpotesi: [
    'Sistema: epicicloidale con un solare fisso, solare 1 motore, portatreno condotto (riduttore di p. 175 o blocco epicicloidale di p. 180).',
    'Regime; perdite solo negli ingranamenti, indipendenti dall\'osservatore.',
    'Rotismo reso ordinario con rendimento η_o; il caso dipende dal segno della potenza relativa del solare 1.',
    'Non nella dispensa: fonte esterna dichiarata (NF-07, NF-201).',
  ],
  disegno: {
    svg: disegnoEpi(),
    didascalia: 'Lo stesso riduttore visto dall\'osservatore fisso F e da quello M solidale al portatreno: la potenza dissipata è la stessa.',
    fonte: { tipo: 'deduzione', da: 'schema del riduttore di p. 175', spiegazione: 'la dispensa non ha una figura per il rendimento degli epicicloidali: si ridisegna il riduttore di p. 175 nei due riferimenti' },
    elementi: [
      { id: 'F', testo: 'rotismo visto da fermo: ω₁, Ω, solare fisso', obbligatorio: true },
      { id: 'M', testo: 'rotismo visto dal portatreno: velocità relative ω₁ − Ω, ω₃ − Ω, portatreno fermo', obbligatorio: true },
      { id: 'flusso', testo: 'verso del flusso di potenza (chi è movente nel moto relativo)', obbligatorio: true },
      { id: 'uguale', testo: 'W_P^F = W_P^M', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'W_P^{F} = W_P^{M}:\\quad -(1 - \\eta_{EPI})\\,C_1\\omega_1 = -(1 - \\eta_o)\\,C_1(\\omega_1 - \\Omega)',
    spiegazione: 'Potenza dissipata scritta dai due osservatori e uguagliata (caso τ_W < 1, solare 1 movente anche nel moto relativo).',
    fonte: EST,
  },
  dimostrazioni: ['d093'],
  significato:
    'Il rendimento di un epicicloidale può essere molto diverso da quello dei suoi ingranaggi: migliore nel riduttore a corona fissa (0,985 con η_o = 0,98, τ_W = −1/3) perché solo una parte della potenza passa per i denti, molto peggiore e perfino negativo quando τ_W è vicino a 1, perché allora negli ingranamenti circola una potenza molto più grande di quella utile. Con η ≤ 0 il moto in quel verso è impossibile: irreversibilità.',
  fraseDaRicordare: 'Le perdite si calcolano dal portatreno: η_EPI = (τ_W − η_o)/(τ_W − 1) se il solare motore è movente anche nel moto relativo.',
  daNonDire: [
    { frase: 'Questa dimostrazione è nella dispensa.', perche: 'Non c\'è (NF-07, NF-201): q52 la attribuisce alle dispense, ma nelle pp. 174–192 manca. Va presentata come trattazione classica.', fonte: EST },
    { frase: 'Il rendimento dell\'epicicloidale è uguale a quello dell\'ordinario equivalente.', perche: 'Le perdite sono uguali, le potenze trasmesse no: η_EPI ≠ η_o.', fonte: EST },
    { frase: 'Nel moto relativo la perdita è (1 − η_o)C₁ω₁.', perche: 'Dal portatreno la velocità del solare è ω₁ − Ω: la potenza relativa è C₁(ω₁ − Ω).', fonte: EST },
    { frase: 'La formula vale in tutti i casi.', perche: 'Dipende da chi è movente nel moto relativo: per τ_W > 1 vale η_EPI = (η_oτ_W − 1)/(η_o(τ_W − 1)).', fonte: EST },
  ],
  approfondimenti: [
    { domanda: 'Perché la potenza dissipata è la stessa per i due osservatori?', tipo: 'approfondimento', attesa: 'Dipende dalle forze d\'attrito e dalle velocità di strisciamento fra i denti, che sono velocità relative fra i membri: non cambiano con l\'osservatore.', fonte: EST },
    { domanda: 'Come si sceglie la formula giusta?', tipo: 'approfondimento', attesa: 'Dal segno della potenza relativa del solare motore C₁(ω₁ − Ω): positiva (τ_W < 1, p. es. corona fissa) → η = (τ_W − η_o)/(τ_W − 1); negativa (τ_W > 1) → η = (η_oτ_W − 1)/(η_o(τ_W − 1)).', fonte: EST },
    { domanda: 'Da dove viene Ω/ω₁ = τ_W/(τ_W − 1)?', tipo: 'collegamento', argomento: 'c5-epicicloidali', attesa: 'Da Willis con il solare fisso: τ_W(ω₁ − Ω) = −Ω, quindi τ_Wω₁ = Ω(τ_W − 1). È a p. 175 e p. 180 della dispensa.', fonte: { tipo: 'dispensa', pag: [175, 180] } },
    { domanda: 'Che cosa vuol dire se η_EPI viene negativo?', tipo: 'collegamento', argomento: 'c5-rendimento-ordinario', attesa: 'Che il moto ipotizzato non può avvenire spontaneamente: le perdite non si possono coprire. È l\'irreversibilità di pp. 182–183, come per la vite senza fine.', fonte: { tipo: 'dispensa', pag: [182, 183] } },
    { domanda: 'Perché il riduttore a corona fissa ha un rendimento più alto dell\'ordinario?', tipo: 'approfondimento', attesa: 'Nel moto relativo la potenza che passa per i denti è C₁(ω₁ − Ω) = (3/4)C₁ω₁: si perde (1 − η_o) solo su questa parte. Con τ_W = −1/3, η_o = 0,98 si ha η = 0,985.', fonte: { tipo: 'deduzione', da: 'd093 con τ_W = −1/3', spiegazione: '1 − Ω/ω₁ = 3/4 per il riduttore di p. 175' } },
  ],
  simboli: [
    { simbolo: '\\eta_{EPI}', significato: 'rendimento dell\'epicicloidale visto dall\'osservatore fisso' },
    { simbolo: '\\eta_o', significato: 'rendimento del rotismo reso ordinario (visto dal portatreno)', altrove: 'η_ORD in q52' },
    { simbolo: 'W_P^{F},\\ W_P^{M}', significato: 'potenza dissipata vista dall\'osservatore fisso e da quello solidale al portatreno', altrove: 'W_PF, W_PM in q52' },
    { simbolo: '\\tau_W', significato: 'rapporto di Willis (ω_fisso − Ω)/(ω₁ − Ω) con il solare motore al denominatore' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5b-rendimento-epi' }],
  previsioni: [
    {
      id: 'c5b-repi-corona',
      domanda: 'Riduttore a corona fissa (τ_W = −1/3) con ingranaggi da η_o = 0,98. Il suo rendimento è…',
      opzioni: ['minore di 0,98', 'uguale a 0,98', 'maggiore di 0,98', 'negativo'],
      corretta: 2,
      spiega: 'η = (τ_W − η_o)/(τ_W − 1) = 0,985: per i denti passa solo 3/4 della potenza.',
      verify: () => {
        const e = rendimentoEpi(-1 / 3, 0.98).eta;
        return e < 0 ? 3 : Math.abs(e - 0.98) < 1e-9 ? 1 : e > 0.98 ? 2 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c5b-rendimento-epi' },
    },
    {
      id: 'c5b-repi-vicino1',
      domanda: 'Con τ_W = 0,99 (satelliti doppi quasi uguali) e η_o = 0,98, il rendimento η_EPI…',
      opzioni: ['è circa 0,98', 'è circa 0,5', 'è negativo: il moto non può avvenire', 'vale 1'],
      corretta: 2,
      spiega: 'η = (0,99 − 0,98)/(0,99 − 1) = −1: negli ingranamenti circola una potenza enorme rispetto a quella utile.',
      verify: () => {
        const e = rendimentoEpi(0.99, 0.98).eta;
        return e <= 0 ? 2 : Math.abs(e - 0.98) < 0.05 ? 0 : Math.abs(e - 1) < 1e-9 ? 3 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c5b-rendimento-epi' },
    },
  ],
  nf: ['NF-07', 'NF-201', 'NF-202'],
};
