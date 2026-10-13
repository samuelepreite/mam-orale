/**
 * C2 · Dinamica del veicolo: accelerazione e decelerazione massima, curva (domanda q20).
 * Dispensa pp. 89–96 (LaTeX) e 100–102 (manoscritto, ripetizione con c_f = l₁, c_r = l₂, μ = f_ad).
 * Dimostrazioni d029, d030, d031, d032 (NF-16), d033, d035, d136 (deduzione, NF-39).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { veicolo as vEng } from '../../engine/c2';
import { arrow, circle, dim, dot, ground, line, poly, svg, text } from '../svg';

// ------------------------------------------------------------------ disegno (figura di p. 90, muso a sinistra)
function disegno() {
  const y0 = 230, ax = 90, bx = 330, gx = 190, gy = 140, rw = 26;
  return svg(420, 300, [
    ground(20, y0, 400, y0),
    poly([[ax - 50, y0 - 30], [ax - 46, y0 - 64], [ax + 30, y0 - 80], [ax + 80, y0 - 132], [bx - 10, y0 - 136], [bx + 50, y0 - 96], [bx + 54, y0 - 30]], 'l', true),
    circle(ax, y0 - rw, rw, 'l'), circle(bx, y0 - rw, rw, 'l'),
    text(ax, y0 - rw, 'C_m', { c: 'a', size: 12 }),
    dot(gx, gy, 'G', 10, -10),
    arrow(gx, gy, gx, gy + 50, 'f', 'Mg', 16, -4),
    arrow(gx, gy, gx + 64, gy, 'f', 'Ma', 14, -12),
    arrow(70, 40, 20, 40, 'v', 'V', -2, -12),
    arrow(70, 62, 20, 62, 'a', 'a', -2, -10),
    dot(ax, y0, 'A', -14, 12), dot(bx, y0, 'B', 14, 12),
    arrow(ax, y0 + 50, ax, y0, 'f', 'F_NA', -30, 36),
    arrow(ax + 2, y0 - 3, ax - 46, y0 - 3, 'f', 'F_TA', -16, -12),
    arrow(bx, y0 + 50, bx, y0, 'f', 'F_NB', 30, 36),
    line(gx, gy + 54, gx, y0 + 30, 'm', 1),
    dim(ax, y0 + 58, gx, y0 + 58, 'l₁', -10),
    dim(gx, y0 + 58, bx, y0 + 58, 'l₂', -10),
    dim(bx + 66, y0, bx + 66, gy, 'h', -10),
  ], 'Autoveicolo a trazione anteriore in accelerazione: forze d\'inerzia e peso in G, reazioni sui contatti anteriore A e posteriore B');
}

// ------------------------------------------------------------------ campione comune (dinamica longitudinale)
const g = 9.81;
function campione(rnd: () => number): Vars {
  const M = U(rnd, 800, 2500), l1 = U(rnd, 1, 1.6), l2 = U(rnd, 1, 1.6), h = U(rnd, 0.4, 0.7), f = U(rnd, 0.3, 1), R = U(rnd, 0.25, 0.35);
  const L = l1 + l2;
  const aAnt = (f * g * l2) / (L + f * h), aPost = (f * g * l1) / (L - f * h);
  const a = U(rnd, 0.5, 4); // accelerazione generica
  const NA = (x: number) => (M * (g * l2 - x * h)) / L;
  return {
    M, g, l1, l2, h, f, R, L, a, aAnt, aPost,
    NAa: NA(a), NBa: M * g - NA(a), NAant: NA(aAnt), NBpost: (M * (g * l1 + aPost * h)) / L,
    FTa: M * a, Cm: M * aAnt * R, aDrag: (g * l2) / h, fLim: l2 / h,
  };
}
const P = (pag: number | [number, number]) => ({ tipo: 'dispensa', pag }) as const;

// ------------------------------------------------------------------ d029 coppia massima trasmissibile
export const d029: Dimostrazione = {
  id: 'd029',
  titolo: 'Coppia massima trasmissibile per aderenza',
  enunciato: 'Ricavare la coppia motrice massima che una ruota motrice può trasmettere senza slittare e, per la trazione anteriore, la coppia che corrisponde all\'accelerazione massima.',
  ipotesi: [
    'ruota motrice di raggio R, massa e inerzia della ruota trascurate',
    'aderenza al suolo con coefficiente f_ad; F_N è la normale sull\'asse motore (che dipende dall\'accelerazione)',
  ],
  sample: campione,
  passi: [
    {
      id: 'd029.1',
      latex: 'C_m - F_T\\,R = 0 \\;\\Rightarrow\\; C_m = F_T\\,R',
      perche: 'Equilibrio alla rotazione della ruota motrice attorno al proprio asse: la coppia del motore è bilanciata dal momento della forza tangenziale al suolo. È così che nasce la forza di trazione: è una reazione di aderenza.',
      fonte: P([89, 90]),
      distrattori: [],
      num: (v) => [v.Cm - v.M * v.aAnt * v.R, 0],
    },
    {
      id: 'd029.2',
      latex: 'F_T \\le f_{ad}\\,F_N',
      perche: 'Il pneumatico non deve slittare: la forza tangenziale è limitata dall\'aderenza sulla normale **dell\'asse motore**.',
      fonte: P(90),
      distrattori: [
        { latex: 'F_T \\le f_{att}\\,F_N', errore: 'indice', spiega: 'Finché la ruota non slitta il contatto è in aderenza: f_ad.' },
      ],
    },
    {
      id: 'd029.3',
      latex: 'C_{max} = F_{T,max}\\,R = f_{ad}\\,F_N\\,R',
      perche: 'La coppia massima è l\'aderenza massima per il raggio: una coppia più grande non si trasmette al suolo.',
      fonte: { tipo: 'deduzione', da: 'pp. 90, 101 («coppia massima trasmissibile a parità di raggio»)', spiegazione: 'equilibrio della ruota al limite di aderenza; la dispensa non la scrive in questa forma' },
      chiave: true,
      distrattori: [
        { latex: 'C_{max} = f_{ad}\\,Mg\\,R', errore: 'ipotesi', spiega: 'Sull\'asse motore grava solo una parte del peso, e varia con l\'accelerazione (trasferimento di carico).', num: (v) => [v.f * v.NAant * v.R, v.f * v.M * v.g * v.R] },
        { latex: 'C_{max} = f_{ad}\\,F_N', errore: 'fattore', spiega: 'Questa è una forza: per avere la coppia va moltiplicata per il raggio della ruota.', num: (v) => [v.f * v.NAant * v.R, v.f * v.NAant] },
      ],
      num: (v) => [v.Cm, v.f * v.NAant * v.R],
    },
    {
      id: 'd029.4',
      latex: 'C_m = F_{T,A}\\,R = f_{ad}F_{N,A}(a_{max})\\,R = M\\,a_{max}\\,R',
      perche: 'Trazione anteriore all\'accelerazione massima: la forza al suolo è al limite sulla normale anteriore, che a sua volta è ridotta dal trasferimento di carico; e vale $Ma_{max}$ per la dinamica del veicolo. È la coppia totale sull\'asse.',
      fonte: P([90, 100]),
      chiave: true,
      distrattori: [
        { latex: 'C_m = f_{ad}\\,Mg\\,\\dfrac{l_2}{L}\\,R', errore: 'termine-perso', spiega: 'Usa la normale statica: in accelerazione l\'anteriore si scarica di Mah/L.', num: (v) => [v.f * v.NAant * v.R, v.f * v.M * v.g * (v.l2 / v.L) * v.R] },
        { latex: 'C_m = M\\,g\\,R', errore: 'concetto', spiega: 'La coppia è legata alla forza tangenziale Ma, non al peso.', num: (v) => [v.f * v.NAant * v.R, v.M * v.g * v.R] },
      ],
      num: (v) => [v.f * v.NAant * v.R, v.M * v.aAnt * v.R],
    },
    {
      id: 'd029.5',
      latex: 'C_m > C_{max} \\;\\Rightarrow\\; \\text{slittamento: } F_T = f_{att}F_N < f_{ad}F_N',
      perche: 'Se il motore dà più coppia, la ruota pattina: la forza al suolo scende al valore di attrito e la coppia in più accelera solo la ruota. Per questo il limite dell\'accelerazione in partenza è l\'aderenza, non la potenza.',
      fonte: { tipo: 'deduzione', da: 'pp. 69, 90', spiegazione: 'passaggio da aderenza ad attrito (f_att < f_ad) applicato alla ruota motrice' },
      aggiunto: true,
      distrattori: [],
    },
  ],
  risultato: { latex: 'C_{max} = f_{ad}\\,F_N\\,R; \\qquad \\text{trazione anteriore: } C_m = M\\,a_{max}\\,R', fonte: P(90) },
  gancio: 'La coppia arriva a terra solo come aderenza: C_max = f_ad F_N R, con la F_N dell\'asse motore.',
};

// ------------------------------------------------------------------ d030 schema generale
export const d030: Dimostrazione = {
  id: 'd030',
  titolo: 'Accelerazione massima: equazioni del veicolo e trasferimento di carico',
  enunciato: 'Scrivere le equazioni della dinamica di un autoveicolo che accelera e ricavare le reazioni normali sui due assi in funzione dell\'accelerazione; impostare la condizione di accelerazione massima.',
  ipotesi: [
    'partenza a bassa velocità: resistenza aerodinamica trascurabile; resistenza al rotolamento trascurabile (f_v ≪ f_ad)',
    'veicolo rigido, moto rettilineo su strada piana; forza d\'inerzia −Ma applicata in G (quota h)',
    'A contatto anteriore, B posteriore; l₁ = distanza A–G, l₂ = G–B, L = l₁ + l₂',
  ],
  sample: campione,
  passi: [
    {
      id: 'd030.1',
      latex: 'v \\simeq 0,\\ f_v \\ll f_{ad} \\;\\Rightarrow\\; \\text{resistenze al moto trascurabili}',
      perche: 'Delle resistenze al moto (rotolamento, aerodinamica, pendenza, variazione di energia cinetica) in partenza restano solo l\'inerzia: la velocità è bassa e la resistenza al rotolamento è piccola rispetto all\'aderenza.',
      fonte: P(89),
      distrattori: [],
    },
    {
      id: 'd030.2',
      latex: 'x:\\ F_T - M\\,a = 0',
      perche: 'Equilibrio dinamico orizzontale: la sola forza esterna orizzontale è la forza di aderenza sulle ruote motrici, che bilancia la forza d\'inerzia.',
      fonte: P(90),
      distrattori: [],
      num: (v) => [v.FTa - v.M * v.a, 0],
    },
    {
      id: 'd030.3',
      latex: 'y:\\ F_{N,A} + F_{N,B} - Mg = 0',
      perche: 'Equilibrio verticale: le due normali sostengono il peso, per qualunque accelerazione.',
      fonte: P(90),
      distrattori: [],
      num: (v) => [v.NAa + v.NBa - v.M * v.g, 0],
    },
    {
      id: 'd030.4',
      latex: 'B:\\ -F_{N,A}(l_1 + l_2) + Mg\\,l_2 - Ma\\,h = 0 \\;\\Rightarrow\\; F_{N,A} = M\\,\\dfrac{g\\,l_2 - a\\,h}{l_1 + l_2}',
      perche: 'Momenti rispetto al contatto posteriore B: la forza di aderenza è a terra e non dà momento; la normale anteriore ha braccio $L$, il peso $l_2$, la forza d\'inerzia (verso il retro) braccio $h$ e tende a sollevare l\'anteriore.',
      fonte: P(90),
      chiave: true,
      distrattori: [
        { latex: 'F_{N,A} = M\\,\\dfrac{g\\,l_2 + a\\,h}{L}', errore: 'segno', spiega: 'In accelerazione l\'inerzia è verso il retro: scarica l\'anteriore (in frenata invece lo carica).', num: (v) => [v.NAa, (v.M * (v.g * v.l2 + v.a * v.h)) / v.L] },
        { latex: 'F_{N,A} = M\\,\\dfrac{g\\,l_1 - a\\,h}{L}', errore: 'indice', spiega: 'Rispetto a B il peso ha braccio l₂ (distanza G–B), non l₁.', num: (v) => [v.NAa, (v.M * (v.g * v.l1 - v.a * v.h)) / v.L] },
      ],
      num: (v) => [-v.NAa * v.L + v.M * v.g * v.l2 - v.M * v.a * v.h, 0],
    },
    {
      id: 'd030.5',
      latex: 'F_{N,B} = Mg - F_{N,A} = M\\,\\dfrac{g\\,l_1 + a\\,h}{L}, \\qquad \\Delta F_N = \\dfrac{Ma\\,h}{L}',
      perche: 'Dall\'equilibrio verticale: il posteriore si carica di quanto l\'anteriore si scarica. È il **trasferimento longitudinale di carico**, proporzionale ad $a$ e ad $h/L$.',
      fonte: { tipo: 'deduzione', da: 'pp. 90, 101', spiegazione: 'la dispensa scrive F_NB solo per la trazione posteriore (momenti rispetto ad A); qui dalla verticale' },
      chiave: true,
      distrattori: [
        { latex: 'F_{N,B} = M\\,\\dfrac{g\\,l_2 + a\\,h}{L}', errore: 'indice', spiega: 'La quota statica del posteriore è Mg l₁/L: il peso «va» sull\'asse più vicino a G.', num: (v) => [v.NBa, (v.M * (v.g * v.l2 + v.a * v.h)) / v.L] },
        { latex: 'F_{N,B} = Mg\\,\\dfrac{l_1}{L}', errore: 'termine-perso', spiega: 'Manca il trasferimento di carico Mah/L.', num: (v) => [v.NBa, (v.M * v.g * v.l1) / v.L] },
      ],
      num: (v) => [v.NBa, (v.M * (v.g * v.l1 + v.a * v.h)) / v.L],
    },
    {
      id: 'd030.6',
      latex: 'a = a_{max} \\iff F_T = M\\,a_{max} = f_{ad}\\,F_{N,mot}(a_{max})',
      perche: 'L\'accelerazione è massima in **incipiente slittamento** delle ruote motrici. La normale dell\'asse motore dipende da $a$: l\'incognita compare in entrambi i membri e si risolve per $a_{max}$.',
      fonte: P(90),
      chiave: true,
      distrattori: [
        { latex: 'M\\,a_{max} = f_{ad}\\,Mg', errore: 'ipotesi', spiega: 'Con un solo asse motore l\'aderenza disponibile è sulla sua normale, non su tutto il peso (f_ad g vale per la frenata su 4 ruote).' },
        { latex: 'M\\,a_{max} = f_{att}\\,F_{N,mot}', errore: 'indice', spiega: 'Al limite le ruote non slittano ancora: aderenza.' },
      ],
    },
  ],
  risultato: { latex: 'F_{N,A} = M\\dfrac{gl_2 - ah}{L}, \\quad F_{N,B} = M\\dfrac{gl_1 + ah}{L}, \\quad M a_{max} = f_{ad}F_{N,mot}(a_{max})', fonte: P([90, 101]) },
  gancio: 'Tre equazioni (x, y, momenti a terra) e una condizione: aderenza al limite sull\'asse che tira.',
};

// ------------------------------------------------------------------ d031 trazione anteriore
export const d031: Dimostrazione = {
  id: 'd031',
  titolo: 'Accelerazione massima: trazione anteriore',
  enunciato: 'Ricavare l\'accelerazione massima di un autoveicolo a trazione anteriore e confrontarla con il caso senza trasferimento di carico.',
  ipotesi: ['come d030; coppia motrice sulle ruote anteriori (contatto A)'],
  sample: campione,
  passi: [
    {
      id: 'd031.1',
      latex: 'F_{T,A} = M\\,a, \\qquad F_{N,A} = M\\,\\dfrac{g\\,l_2 - a\\,h}{l_1 + l_2}',
      perche: 'Prima e terza equazione della dinamica (momenti rispetto al contatto posteriore B).',
      fonte: P(90),
      distrattori: [],
      num: (v) => [v.NAa, (v.M * (v.g * v.l2 - v.a * v.h)) / v.L],
    },
    {
      id: 'd031.2',
      latex: 'M\\,a_{max} = f_{ad}\\,M\\,\\dfrac{g\\,l_2 - a_{max}h}{l_1 + l_2}',
      perche: 'Incipiente slittamento delle ruote anteriori: $F_{T,A,max} = f_{ad}F_{N,A}$.',
      fonte: P(90),
      chiave: true,
      distrattori: [
        { latex: 'M\\,a_{max} = f_{ad}\\,M\\,\\dfrac{g\\,l_2}{L}', errore: 'termine-perso', spiega: 'La normale anteriore cala con a: va scritta all\'accelerazione massima.', num: (v) => [v.M * v.aAnt, (v.f * v.M * v.g * v.l2) / v.L] },
        { latex: 'M\\,a_{max} = f_{ad}\\,M\\,\\dfrac{g\\,l_2 + a_{max}h}{L}', errore: 'segno', spiega: 'In accelerazione l\'anteriore si scarica.', num: (v) => [v.M * v.aAnt, (v.f * v.M * (v.g * v.l2 + v.aAnt * v.h)) / v.L] },
      ],
      num: (v) => [v.M * v.aAnt, (v.f * v.M * (v.g * v.l2 - v.aAnt * v.h)) / v.L],
    },
    {
      id: 'd031.3',
      latex: 'a_{max}(l_1 + l_2 + f_{ad}h) = f_{ad}\\,g\\,l_2 \\;\\Rightarrow\\; a_{max} = f_{ad}\\,g\\,\\dfrac{l_2}{l_1 + l_2 + f_{ad}\\,h}',
      perche: 'Si porta a sinistra il termine con $a_{max}$ e si raccoglie: il trasferimento di carico compare come $+f_{ad}h$ al denominatore.',
      fonte: P([90, 100]),
      chiave: true,
      distrattori: [
        { latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_2}{L - f_{ad}h}', errore: 'segno', spiega: 'È la struttura della trazione posteriore: davanti il trasferimento toglie carico, quindi + al denominatore.', num: (v) => [v.aAnt, (v.f * v.g * v.l2) / (v.L - v.f * v.h)] },
        { latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_1}{L + f_{ad}h}', errore: 'indice', spiega: 'Al numeratore va la quota statica dell\'anteriore, che è proporzionale a l₂ (distanza G–asse posteriore).', num: (v) => [v.aAnt, (v.f * v.g * v.l1) / (v.L + v.f * v.h)] },
      ],
      num: (v) => [v.aAnt, (v.f * v.g * v.l2) / (v.l1 + v.l2 + v.f * v.h)],
    },
    {
      id: 'd031.4',
      latex: '\\dfrac{a_{max}}{f_{ad}\\,g\\,l_2/L} = \\dfrac{L}{L + f_{ad}h} < 1',
      perche: 'Senza trasferimento di carico si avrebbe $f_{ad}g\\,l_2/L$: accelerando si scarica proprio l\'asse che deve tirare, e l\'accelerazione massima cala.',
      fonte: { tipo: 'deduzione', da: 'p. 90', spiegazione: 'confronto tra a_max e il valore con la normale statica (d031)' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.aAnt / ((v.f * v.g * v.l2) / v.L), v.L / (v.L + v.f * v.h)],
    },
  ],
  risultato: { latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_2}{l_1 + l_2 + f_{ad}\\,h} \\quad \\Big(= \\dfrac{\\mu g\\,c_r}{c_r + c_f + \\mu h}\\Big)', fonte: P([90, 100]) },
  gancio: 'Anteriore: l₂ sopra, + f h sotto — accelerare scarica l\'asse che tira.',
};

// ------------------------------------------------------------------ d032 trazione posteriore (NF-16)
export const d032: Dimostrazione = {
  id: 'd032',
  titolo: 'Accelerazione massima: trazione posteriore e condizione di dragster',
  enunciato: 'Ricavare l\'accelerazione massima di un autoveicolo a trazione posteriore, la condizione di dragster e il confronto con la trazione anteriore.',
  ipotesi: ['come d030; coppia motrice sulle ruote posteriori (contatto B)', 'tutte e quattro le ruote a terra (F_N,A ≥ 0)'],
  sample: campione,
  passi: [
    {
      id: 'd032.1',
      latex: 'A:\\ F_{N,B}(l_1 + l_2) - Mg\\,l_1 - Ma\\,h = 0 \\;\\Rightarrow\\; F_{N,B} = M\\,\\dfrac{g\\,l_1 + a\\,h}{L}',
      perche: 'Ora la forza di aderenza è sul posteriore e si scrivono i momenti rispetto al contatto **anteriore** A: il peso ha braccio $l_1$ (distanza A–G), l\'inerzia braccio $h$ e carica il posteriore.',
      fonte: P([91, 101]),
      chiave: true,
      distrattori: [
        { latex: 'F_{N,B} = M\\,\\dfrac{g\\,l_2 + a\\,h}{L}', errore: 'indice', spiega: 'Rispetto ad A il peso ha braccio l₁: con l₂ si arriva alla formula sbagliata di p. 91 (NF-16).', num: (v) => [v.NBpost, (v.M * (v.g * v.l2 + v.aPost * v.h)) / v.L] },
        { latex: 'F_{N,B} = M\\,\\dfrac{g\\,l_1 - a\\,h}{L}', errore: 'segno', spiega: 'L\'inerzia è verso il retro: carica il posteriore.', num: (v) => [v.NBpost, (v.M * (v.g * v.l1 - v.aPost * v.h)) / v.L] },
      ],
      num: (v) => [v.NBpost * v.L - v.M * v.g * v.l1 - v.M * v.aPost * v.h, 0],
    },
    {
      id: 'd032.2',
      latex: 'M\\,a_{max} = f_{ad}\\,M\\,\\dfrac{g\\,l_1 + a_{max}h}{L}',
      perche: 'Incipiente slittamento delle ruote posteriori: $F_{T,B} = Ma = f_{ad}F_{N,B}$.',
      fonte: P(101),
      distrattori: [],
      num: (v) => [v.M * v.aPost, (v.f * v.M * (v.g * v.l1 + v.aPost * v.h)) / v.L],
    },
    {
      id: 'd032.3',
      latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_1}{l_1 + l_2 - f_{ad}\\,h}',
      perche: 'Si raccoglie $a_{max}$: il trasferimento di carico ora aiuta, $-f_{ad}h$ al denominatore. Al numeratore c\'è $l_1$, distanza del baricentro dall\'asse **anteriore** (= $c_f$ del manoscritto di p. 101, che è corretto).',
      fonte: P([91, 101]),
      chiave: true,
      correzione: { nf: 'NF-16', dispensaScrive: 'a_{max} = f_{ad}\\,g\\,\\frac{l_2}{l_1 + l_2 - hf_{ad}} \\ \\text{(p. 91)}' },
      distrattori: [
        { latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_2}{l_1 + l_2 - f_{ad}\\,h}', errore: 'indice', spiega: 'È la formula di p. 91 (NF-16): la quota statica del posteriore è Mg l₁/L, quindi l₁ al numeratore.', num: (v) => [v.aPost, (v.f * v.g * v.l2) / (v.L - v.f * v.h)] },
        { latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_1}{L + f_{ad}\\,h}', errore: 'segno', spiega: 'Dietro il trasferimento aggiunge carico: − f h al denominatore.', num: (v) => [v.aPost, (v.f * v.g * v.l1) / (v.L + v.f * v.h)] },
      ],
      num: (v) => [v.aPost, (v.f * v.g * v.l1) / (v.l1 + v.l2 - v.f * v.h)],
    },
    {
      id: 'd032.4',
      latex: 'F_{N,A} \\ge 0 \\iff a \\le \\dfrac{g\\,l_2}{h}; \\qquad f_{ad} = \\dfrac{l_2}{h} \\;\\Rightarrow\\; a_{max} = \\dfrac{g\\,l_2}{h}',
      perche: 'La formula vale finché l\'anteriore resta a terra. Sostituendo $f_{ad} = l_2/h$ si ottiene proprio $g l_2/h$: oltre quel coefficiente l\'auto si impenna prima di slittare.',
      fonte: { tipo: 'deduzione', da: 'pp. 90, 101', spiegazione: 'F_NA(a) ≥ 0 con a = a_max della trazione posteriore (NF-124)' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [(v.fLim * v.g * v.l1) / (v.L - v.fLim * v.h), v.aDrag],
    },
    {
      id: 'd032.5',
      latex: '\\text{dragster: } F_{N,A} = 0,\\quad B:\\ Mg\\,l_2 - Ma\\,h = 0 \\;\\Rightarrow\\; a = g\\,\\dfrac{l_2}{h}\\ \\Big(= g\\,\\dfrac{c_r}{h}\\Big)',
      perche: 'Condizione limite in cui si sfrutta tutta l\'aderenza della ruota motrice e si scarica del tutto l\'anteriore («si scarica la condotta»): con $F_{N,B} = Mg$ e $a = f_{ad}g$ si raggiunge per $f_{ad} = l_2/h$.',
      fonte: P(101),
      chiave: true,
      correzione: { nf: 'NF-124', dispensaScrive: 'a = g\\frac{c_r}{h} = g\\,f_a' },
      distrattori: [
        { latex: 'a = g\\,\\dfrac{l_1}{h}', errore: 'indice', spiega: 'Con l\'anteriore scarico si fanno i momenti rispetto al posteriore B: il peso ha braccio l₂.', num: (v) => [v.aDrag, (v.g * v.l1) / v.h] },
        { latex: 'a = g\\,\\dfrac{h}{l_2}', errore: 'indice', spiega: 'Rapporto capovolto: il peso stabilizza con braccio l₂, l\'inerzia ribalta con braccio h.', num: (v) => [v.aDrag, (v.g * v.h) / v.l2] },
      ],
      num: (v) => [v.M * v.g * v.l2 - v.M * v.aDrag * v.h, 0],
    },
    {
      id: 'd032.6',
      latex: '\\dfrac{a_{max,post}}{a_{max,ant}} = \\dfrac{l_1\\,(L + f_{ad}h)}{l_2\\,(L - f_{ad}h)} \\;\\Rightarrow\\; l_1 = l_2:\\ a_{max,post} > a_{max,ant}',
      perche: 'A pari ripartizione statica la posteriore vince sempre, per il segno di $f_{ad}h$: accelerando il carico va dietro. In generale serve $l_1(L + fh) > l_2(L - fh)$: con molto peso sull\'anteriore ($l_1$ piccolo) la disuguaglianza si inverte e la trazione anteriore dà di più (p. es. $l_1 = 1$, $l_2 = 2$, $h = 0{,}5$ m, $f_{ad} = 1$: rapporto 0,7).',
      fonte: { tipo: 'deduzione', da: 'pp. 91, 101', spiegazione: 'rapporto delle due formule corrette; la dispensa afferma il confronto senza condizione (NF-16)' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.aPost / v.aAnt, (v.l1 * (v.L + v.f * v.h)) / (v.l2 * (v.L - v.f * v.h))],
    },
  ],
  risultato: { latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_1}{l_1 + l_2 - f_{ad}h} \\quad \\Big(= \\dfrac{\\mu g\\,c_f}{c_r + c_f - \\mu h}\\Big), \\qquad a_{dragster} = g\\,\\dfrac{l_2}{h}', fonte: P(101), correzione: { nf: 'NF-16', dispensaScrive: 'a_{max} = f_{ad}\\,g\\,\\frac{l_2}{l_1 + l_2 - hf_{ad}}' } },
  gancio: 'Posteriore: l₁ sopra, − f h sotto. Momenti sempre rispetto alla ruota che non tira.',
};

// ------------------------------------------------------------------ campione curva
function campioneCurva(rnd: () => number): Vars {
  const M = U(rnd, 500, 3000), R = U(rnd, 20, 200), c = U(rnd, 1.2, 2), h = U(rnd, 0.3, 1.5), f = U(rnd, 0.3, 1.1);
  const vrib = Math.sqrt((R * c * g) / (2 * h)), vslip = Math.sqrt(f * g * R);
  const v = Math.min(vrib, vslip) * U(rnd, 0.2, 0.95);
  const dN = (M * v * v * h) / (R * c);
  const share = U(rnd, 0.2, 0.8); // ripartizione arbitraria delle forze laterali (iperstatica)
  const Fc = (M * v * v) / R;
  return { M, g, R, c, h, f, v, vrib, vslip, FND: (M * g) / 2 - dN, FNS: (M * g) / 2 + dN, Fc, FTD: share * Fc, FTS: (1 - share) * Fc, alpha: Math.atan((v * v) / (g * R)), vmax: vslip };
}

// ------------------------------------------------------------------ d033 reazioni normali in curva
export const d033: Dimostrazione = {
  id: 'd033',
  titolo: 'Veicolo in curva: equazioni e reazioni normali sulle ruote',
  enunciato: 'Un autoveicolo percorre a velocità costante una curva a destra di raggio R. Scrivere le equazioni della dinamica trasversale e ricavare le reazioni normali sulla ruota interna e su quella esterna.',
  ipotesi: [
    'v costante su una circonferenza: solo accelerazione centripeta v²/R, forza centrifuga in G',
    'G a quota h e a metà carreggiata c (ipotesi implicita nella figura, NF-123)',
    'S sinistra = esterna (contatto A), D destra = interna (contatto B)',
  ],
  sample: campioneCurva,
  passi: [
    {
      id: 'd033.1',
      latex: 'y:\\ F_{TD} + F_{TS} = \\dfrac{Mv^2}{R}, \\qquad z:\\ F_{ND} + F_{NS} = Mg',
      perche: 'Equilibrio dinamico (con la forza centrifuga): le forze laterali al suolo, verso il centro della curva, bilanciano la centrifuga; le normali il peso.',
      fonte: P([94, 102]),
      distrattori: [],
      num: (v) => [v.FTD + v.FTS, (v.M * v.v ** 2) / v.R],
    },
    {
      id: 'd033.2',
      latex: '\\text{4 incognite: } F_{TD}, F_{TS}\\ \\text{iperstatiche; le normali dai momenti}',
      perche: 'Con traslazione e rotazione si determinano le due normali; la ripartizione delle forze laterali tra le ruote resta indeterminata, ma non serve: per lo slittamento conta la loro somma.',
      fonte: P(94),
      correzione: { nf: 'NF-122', dispensaScrive: '\\text{«4 incognite, quindi non è possibile ricavare la soluzione attraverso le equazioni cardinali»}' },
      distrattori: [],
    },
    {
      id: 'd033.3',
      latex: 'A:\\ F_{ND}\\,c + \\dfrac{Mv^2}{R}\\,h - Mg\\,\\dfrac c2 = 0 \\;\\Rightarrow\\; F_{ND} = \\dfrac{Mg}{2} - \\dfrac{Mv^2 h}{R\\,c}',
      perche: 'Momenti rispetto al contatto della ruota esterna: le forze al suolo non danno momento, la centrifuga (braccio $h$) e la normale interna (braccio $c$) ruotano nello stesso verso, il peso (braccio $c/2$) in verso opposto.',
      fonte: P([94, 95]),
      chiave: true,
      distrattori: [
        { latex: 'F_{ND} = \\dfrac{Mg}{2} + \\dfrac{Mv^2 h}{R\\,c}', errore: 'convenzione', spiega: 'È la convenzione di d033 con D esterna (NF-39): nella dispensa la curva è a destra e D è l\'interna, che si scarica.', num: (v) => [v.FND, (v.M * v.g) / 2 + (v.M * v.v ** 2 * v.h) / (v.R * v.c)] },
        { latex: 'F_{ND} = \\dfrac{Mg}{2} - \\dfrac{2Mv^2 h}{R\\,c}', errore: 'fattore', spiega: 'Il 2 viene solo dal braccio del peso: la centrifuga ha braccio h e la normale c.', num: (v) => [v.FND, (v.M * v.g) / 2 - (2 * v.M * v.v ** 2 * v.h) / (v.R * v.c)] },
      ],
      num: (v) => [v.FND * v.c + ((v.M * v.v ** 2) / v.R) * v.h - (v.M * v.g * v.c) / 2, 0],
    },
    {
      id: 'd033.4',
      latex: 'F_{NS} = Mg - F_{ND} = \\dfrac{Mg}{2} + \\dfrac{Mv^2 h}{R\\,c}',
      perche: 'Dall\'equilibrio verticale: la ruota esterna si carica di quanto l\'interna si scarica.',
      fonte: { tipo: 'deduzione', da: 'pp. 94–95', spiegazione: 'equazione z con F_ND: la dispensa ricava solo F_ND' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: 'F_{NS} = \\dfrac{Mg}{2}', errore: 'termine-perso', spiega: 'Manca il trasferimento laterale: la somma delle due normali deve restare Mg.', num: (v) => [v.FNS, (v.M * v.g) / 2] },
        { latex: 'F_{NS} = Mg + \\dfrac{Mv^2 h}{R\\,c}', errore: 'fattore', spiega: 'Parte da metà peso (G a metà carreggiata).', num: (v) => [v.FNS, v.M * v.g + (v.M * v.v ** 2 * v.h) / (v.R * v.c)] },
      ],
      num: (v) => [v.FNS, (v.M * v.g) / 2 + (v.M * v.v ** 2 * v.h) / (v.R * v.c)],
    },
    {
      id: 'd033.5',
      latex: 'F_{NS} - F_{ND} = \\dfrac{2Mv^2 h}{R\\,c}',
      perche: 'Il trasferimento laterale di carico cresce con $v^2$ e con $h/c$: quando la ruota interna arriva a zero il veicolo si ribalta.',
      fonte: { tipo: 'deduzione', da: 'p. 95', spiegazione: 'differenza delle due normali' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.FNS - v.FND, (2 * v.M * v.v ** 2 * v.h) / (v.R * v.c)],
    },
  ],
  risultato: { latex: 'F_{ND,\\,int} = \\dfrac{Mg}{2} - \\dfrac{Mv^2h}{Rc}, \\qquad F_{NS,\\,est} = \\dfrac{Mg}{2} + \\dfrac{Mv^2h}{Rc}', fonte: P(95) },
  gancio: 'Curva a destra: la centrifuga in alto spinge fuori, carica la ruota esterna e scarica la D interna di Mv²h/(Rc).',
};

// ------------------------------------------------------------------ d035 velocità limite di aderenza (auto e moto)
export const d035: Dimostrazione = {
  id: 'd035',
  titolo: 'Velocità limite di aderenza in curva (auto e motociclo)',
  enunciato: 'Ricavare la velocità massima oltre la quale un autoveicolo slitta lateralmente in curva, e lo stesso limite per un motociclo attraverso l\'angolo di piega.',
  ipotesi: ['curva di raggio R a v costante; aderenza f_ad uguale su tutte le ruote', 'motociclo: forze solo in G e nel contatto P, angolo di piega α dalla verticale'],
  sample: campioneCurva,
  passi: [
    {
      id: 'd035.1',
      latex: 'F_{TD} = f_{ad}F_{ND}, \\qquad F_{TS} = f_{ad}F_{NS}',
      perche: 'Condizione laterale di incipiente slittamento su entrambe le ruote: è il limite che si cerca.',
      fonte: P(94),
      distrattori: [],
    },
    {
      id: 'd035.2',
      latex: 'F_{TS} + F_{TD} = f_{ad}(F_{NS} + F_{ND}) \\;\\Rightarrow\\; \\dfrac{Mv_{max}^2}{R} = f_{ad}\\,Mg',
      perche: 'Sommando membro a membro le singole normali (e la ripartizione iperstatica) spariscono: restano la centrifuga e il peso.',
      fonte: P([94, 102]),
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{Mv_{max}^2}{R} = f_{ad}\\,F_{NS}', errore: 'ipotesi', spiega: 'Aderiscono entrambe le ruote: la somma delle normali è Mg.', num: (v) => [(v.M * v.vmax ** 2) / v.R, v.f * ((v.M * v.g) / 2 + (v.M * v.vmax ** 2 * v.h) / (v.R * v.c))] },
        { latex: '\\dfrac{Mv_{max}^2}{R} = \\dfrac{f_{ad}\\,Mg}{2}', errore: 'fattore', spiega: 'Non si divide per due ruote: la somma delle aderenze è f_ad Mg.', num: (v) => [(v.M * v.vmax ** 2) / v.R, (v.f * v.M * v.g) / 2] },
      ],
      num: (v) => [(v.M * v.vmax ** 2) / v.R, v.f * v.M * v.g],
    },
    {
      id: 'd035.3',
      latex: 'v_{max} = \\sqrt{f_{ad}\\,g\\,R}',
      perche: 'La massa si semplifica: il limite di slittamento non dipende né da massa, né da carreggiata, né da altezza del baricentro.',
      fonte: P([94, 102]),
      distrattori: [],
      num: (v) => [v.vmax ** 2, v.f * v.g * v.R],
    },
    {
      id: 'd035.4',
      latex: '\\text{moto: } \\tan\\alpha = \\dfrac{Mv^2/R}{Mg} = \\dfrac{v^2}{g\\,R}',
      perche: 'Sul motociclo le forze agiscono solo in G (peso e centrifuga) e nel contatto P (reazione): per l\'equilibrio alla rotazione la risultante deve stare sulla retta PG, quindi la moto si inclina finché la retta PG è parallela alla risultante di peso e centrifuga. Triangolo delle forze.',
      fonte: P([95, 96]),
      chiave: true,
      distrattori: [
        { latex: '\\sin\\alpha = \\dfrac{v^2}{g\\,R}', errore: 'concetto', spiega: 'Nel triangolo delle forze i cateti sono Mg e Mv²/R: il loro rapporto è la tangente.', num: (v) => [Math.sin(v.alpha), v.v ** 2 / (v.g * v.R)] },
        { latex: '\\tan\\alpha = \\dfrac{g\\,R}{v^2}', errore: 'indice', spiega: 'α si misura dalla verticale: il cateto opposto è la centrifuga.', num: (v) => [Math.tan(v.alpha), (v.g * v.R) / v.v ** 2] },
      ],
      num: (v) => [Math.tan(v.alpha), v.v ** 2 / (v.g * v.R)],
    },
    {
      id: 'd035.5',
      latex: '\\alpha \\le \\varphi_{ad}: \\quad \\tan\\alpha = \\dfrac{v_{max}^2}{R\\,g} = \\tan\\varphi_{ad} = f_{ad} \\;\\Rightarrow\\; v_{max} = \\sqrt{f_{ad}\\,g\\,R}',
      perche: 'L\'angolo di piega è anche l\'inclinazione della risultante di contatto rispetto alla normale: per non slittare deve stare nel cono d\'aderenza. Al limite si ritrova la stessa velocità dell\'autoveicolo.',
      fonte: P([96, 102]),
      chiave: true,
      distrattori: [
        { latex: '\\alpha \\le \\varphi_{att}', errore: 'indice', spiega: 'La ruota non striscia lateralmente: conta l\'aderenza.' },
        { latex: 'v_{max} = \\sqrt{\\dfrac{g\\,R}{f_{ad}}}', errore: 'indice', spiega: 'Da tan α = v²/(gR) = f_ad si ricava v² = f_ad g R.', num: (v) => [v.vmax ** 2, (v.g * v.R) / v.f] },
      ],
      num: (v) => [v.vmax ** 2 / (v.R * v.g), v.f],
    },
  ],
  risultato: { latex: 'v_{max} = \\sqrt{f_{ad}\\,g\\,R} \\quad \\text{(auto e moto)}, \\qquad \\tan\\alpha = \\dfrac{v^2}{gR}', fonte: P([94, 96]) },
  gancio: 'Centripeta richiesta Mv²/R contro aderenza disponibile f_ad Mg; per la moto la piega è l\'angolo nel cono.',
};

// ------------------------------------------------------------------ d136 decelerazione massima (deduzione per i momenti)
export const d136: Dimostrazione = {
  id: 'd136',
  titolo: 'Decelerazione massima del veicolo e ripartizione della frenata',
  enunciato: 'Ricavare la decelerazione massima di un veicolo frenato su tutte e quattro le ruote, le reazioni normali in frenata e la ripartizione della forza frenante che la consente.',
  ipotesi: [
    'freni su tutte le ruote; a = decelerazione (positiva), forza d\'inerzia Ma in avanti applicata in G',
    'incipiente slittamento su entrambi gli assi; tutte le ruote a terra (f_ad h < l₁)',
  ],
  sample: (rnd) => {
    const b = campione(rnd);
    const amax = b.f * b.g;
    const NA = (b.M * (b.g * b.l2 + amax * b.h)) / b.L, NB = (b.M * (b.g * b.l1 - amax * b.h)) / b.L;
    return { ...b, amax, NAf: NA, NBf: NB, FTA: b.f * NA, FTB: b.f * NB, decAnt: (b.f * b.g * b.l2) / (b.L - b.f * b.h) };
  },
  passi: [
    {
      id: 'd136.1',
      latex: 'x:\\ -F_{T,A} - F_{T,B} + M\\,a = 0',
      perche: 'Le coppie frenanti su entrambi gli assi sono bilanciate, per l\'equilibrio di ciascuna ruota, da forze tangenziali al suolo opposte al moto; la forza d\'inerzia è in avanti.',
      fonte: P([92, 101]),
      distrattori: [],
      num: (v) => [-v.FTA - v.FTB + v.M * v.amax, 0],
    },
    {
      id: 'd136.2',
      latex: 'y:\\ F_{N,A} + F_{N,B} - Mg = 0',
      perche: 'Equilibrio verticale, come in accelerazione.',
      fonte: P([92, 101]),
      distrattori: [],
      num: (v) => [v.NAf + v.NBf - v.M * v.g, 0],
    },
    {
      id: 'd136.3',
      latex: 'F_{T,A} = f_{ad}F_{N,A},\\ F_{T,B} = f_{ad}F_{N,B} \\;\\Rightarrow\\; M\\,a_{max} = f_{ad}(F_{N,A} + F_{N,B}) = f_{ad}\\,Mg \\;\\Rightarrow\\; a_{max} = f_{ad}\\,g',
      perche: 'Al limite su entrambi gli assi si sommano le aderenze: serve solo la somma delle normali, che è il peso. Per questo il trasferimento di carico non compare.',
      fonte: P([92, 101]),
      chiave: true,
      distrattori: [
        { latex: 'a_{max} = f_{ad}\\,g\\,\\dfrac{l_2}{L - f_{ad}h}', errore: 'ipotesi', spiega: 'Questo è il limite frenando solo con l\'anteriore: con quattro ruote frenate al limite si sfrutta tutto il peso.', num: (v) => [v.amax, v.decAnt] },
        { latex: 'a_{max} = f_{att}\\,g', errore: 'indice', spiega: 'Con ruote bloccate si striscia e si ottiene meno: il massimo è all\'incipiente slittamento, con f_ad.' },
      ],
      num: (v) => [v.amax, v.f * v.g],
    },
    {
      id: 'd136.4',
      latex: 'B:\\ F_{N,A}\\,L - Mg\\,l_2 - Ma\\,h = 0 \\;\\Rightarrow\\; F_{N,A} = M\\,\\dfrac{g\\,l_2 + a\\,h}{L}, \\quad F_{N,B} = M\\,\\dfrac{g\\,l_1 - a\\,h}{L}',
      perche: 'La dispensa non scrive i momenti; servono per sapere come ripartire la frenata. Rispetto al contatto posteriore: l\'inerzia ora è in avanti e **carica l\'anteriore**, il posteriore si scarica della stessa quantità $Mah/L$.',
      fonte: { tipo: 'deduzione', da: 'pp. 90, 92', spiegazione: 'stessa equazione dei momenti dell\'accelerazione con la forza d\'inerzia di verso opposto (NF-39, NF-125)' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: 'F_{N,A} = M\\,\\dfrac{g\\,l_2 - a\\,h}{L}', errore: 'segno', spiega: 'È l\'accelerazione: in frenata l\'inerzia è in avanti e carica l\'anteriore.', num: (v) => [v.NAf, (v.M * (v.g * v.l2 - v.amax * v.h)) / v.L] },
        { latex: 'F_{N,A} = M\\,\\dfrac{g\\,l_1 + a\\,h}{L}', errore: 'indice', spiega: 'Rispetto a B il peso ha braccio l₂.', num: (v) => [v.NAf, (v.M * (v.g * v.l1 + v.amax * v.h)) / v.L] },
      ],
      num: (v) => [v.NAf * v.L - v.M * v.g * v.l2 - v.M * v.amax * v.h, 0],
    },
    {
      id: 'd136.5',
      latex: '\\dfrac{F_{T,A}}{F_{T,B}} = \\dfrac{F_{N,A}}{F_{N,B}} = \\dfrac{l_2 + f_{ad}h}{l_1 - f_{ad}h}',
      perche: '«Frenata ripartita correttamente»: ogni asse deve frenare in proporzione alla sua normale dinamica, quindi l\'anteriore molto più del posteriore. Con un\'altra ripartizione un asse slitta prima e $a_{max} < f_{ad}g$ (es. solo anteriore: $f_{ad}g\\,l_2/(L - f_{ad}h)$).',
      fonte: { tipo: 'deduzione', da: 'p. 92 («se la frenata è ripartita correttamente»)', spiegazione: 'rapporto delle normali con a = f_ad g; la dispensa non lo scrive (NF-125)' },
      aggiunto: true,
      distrattori: [
        { latex: '\\dfrac{F_{T,A}}{F_{T,B}} = \\dfrac{l_2}{l_1}', errore: 'termine-perso', spiega: 'È la ripartizione statica: in frenata il carico si sposta in avanti.', num: (v) => [v.FTA / v.FTB, v.l2 / v.l1] },
      ],
      num: (v) => [v.FTA / v.FTB, (v.l2 + v.f * v.h) / (v.l1 - v.f * v.h)],
    },
  ],
  risultato: { latex: 'a_{max} = f_{ad}\\,g \\quad \\text{con} \\quad \\dfrac{F_{T,A}}{F_{T,B}} = \\dfrac{l_2 + f_{ad}h}{l_1 - f_{ad}h}', fonte: P([92, 101]) },
  gancio: 'Quattro ruote al limite: si somma l\'aderenza su tutto il peso, a = f_ad g; ma davanti si frena di più perché la frenata carica l\'anteriore.',
};

// ------------------------------------------------------------------ argomento
export const veicolo: ArgomentoContenuto = {
  id: 'c2-veicolo',
  cosaDireSubito:
    'L\'accelerazione massima di un veicolo in partenza non dipende dal motore ma dall\'aderenza delle ruote motrici. Con le equazioni della dinamica e la forza d\'inerzia in G si trova che accelerando il carico si trasferisce dall\'anteriore al posteriore di Mah/L; imponendo l\'incipiente slittamento sull\'asse motore si ottiene a_max = f_ad g l₂/(L + f_ad h) per la trazione anteriore e f_ad g l₁/(L − f_ad h) per la posteriore. In frenata su quattro ruote a_max = f_ad g; in curva v_max = √(f_ad g R).',
  sistemaIpotesi: [
    'Sistema: autoveicolo rigido di massa M, baricentro G a quota h, l₁ = A(anteriore)–G, l₂ = G–B(posteriore), L = l₁ + l₂.',
    'Partenza a bassa velocità: resistenza aerodinamica e al rotolamento trascurate (f_v ≪ f_ad).',
    'Forza d\'inerzia −Ma applicata in G (equilibrio dinamico); limite = incipiente slittamento delle ruote motrici.',
    'Curva: v costante, raggio R, carreggiata c, G a metà carreggiata.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Trazione anteriore in accelerazione (dispensa p. 90): muso a sinistra, inerzia Ma verso il retro, F_TA nel verso del moto.',
    fonte: { tipo: 'dispensa', pag: 90, fig: 'auto vista di fianco' },
    elementi: [
      { id: 'versi', testo: 'versi di V e a (verso il muso)', obbligatorio: true },
      { id: 'G', testo: 'baricentro G a quota h, peso Mg e forza d\'inerzia Ma opposta ad a', obbligatorio: true },
      { id: 'normali', testo: 'normali F_NA (anteriore) e F_NB (posteriore)', obbligatorio: true },
      { id: 'FT', testo: 'forza di aderenza F_T sull\'asse motore, nel verso del moto', obbligatorio: true },
      { id: 'quote', testo: 'quote l₁ (A–G), l₂ (G–B), h', obbligatorio: true },
      { id: 'Cm', testo: 'coppia motrice C_m sulla ruota motrice', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\begin{cases} F_{T,A} - Ma = 0 \\\\ F_{N,A} + F_{N,B} - Mg = 0 \\\\ -F_{N,A}(l_1 + l_2) + Mg\\,l_2 - Ma\\,h = 0 \\end{cases} \\qquad F_{T,A} = f_{ad}F_{N,A}',
    spiegazione: 'Equazioni della dinamica della trazione anteriore (momenti rispetto al contatto posteriore B) e condizione di incipiente slittamento.',
    fonte: { tipo: 'dispensa', pag: 90 },
  },
  dimostrazioni: ['d030', 'd031', 'd032', 'd029', 'd136', 'd033', 'd035'],
  significato:
    'Il trasferimento di carico decide le prestazioni: accelerando si carica il posteriore (vantaggio della trazione posteriore a pari ripartizione statica), frenando l\'anteriore (per questo si frena di più davanti). Il limite di frenata f_ad g e quello in curva √(f_ad g R) non dipendono dalla massa: dipendono solo dall\'aderenza.',
  fraseDaRicordare: 'Anteriore: f g l₂/(L + f h); posteriore: f g l₁/(L − f h); frenata: f g; curva: √(f g R).',
  daNonDire: [
    { frase: 'Trazione posteriore: a_max = f g l₂/(L − f h).', perche: 'È l\'errore di p. 91 (NF-16): al numeratore va l₁, come nel manoscritto di p. 101.', fonte: { tipo: 'dispensa', pag: [91, 101] } },
    { frase: 'La trazione posteriore accelera sempre di più dell\'anteriore.', perche: 'Solo a pari ripartizione statica: in generale serve l₁(L + fh) > l₂(L − fh) (con 60 % del peso davanti, h = 0,2 L, f = 1 sono uguali, 0,5 g).', fonte: { tipo: 'dispensa', pag: 91 } },
    { frase: 'L\'accelerazione massima dipende dalla potenza del motore.', perche: 'In partenza il limite è l\'aderenza delle ruote motrici: la coppia in più fa solo pattinare.', fonte: { tipo: 'dispensa', pag: 90 } },
    { frase: 'In frenata il carico si sposta dietro.', perche: 'L\'inerzia è in avanti: carica l\'anteriore e scarica il posteriore di Mah/L.', fonte: { tipo: 'deduzione', da: 'pp. 90, 92', spiegazione: 'momenti rispetto al contatto posteriore in frenata (d136)' } },
    { frase: 'Uso a per la distanza del baricentro dall\'asse.', perche: 'Nella dispensa a è l\'accelerazione; le distanze sono l₁, l₂ (c_f, c_r nel manoscritto). q20 mescola i due significati.', fonte: { tipo: 'dispensa', pag: [90, 100] } },
  ],
  approfondimenti: [
    {
      domanda: 'Quali sono le resistenze al moto di un veicolo e perché in partenza le trascuri?',
      tipo: 'approfondimento',
      attesa: 'Rotolamento, aerodinamica, pendenza, variazione di energia cinetica. In partenza la velocità è bassa (aerodinamica trascurabile) e f_v ≪ f_ad: resta l\'inerzia.',
      fonte: { tipo: 'dispensa', pag: 89 },
    },
    {
      domanda: 'Che cos\'è la condizione di dragster?',
      tipo: 'approfondimento',
      attesa: 'Il limite in cui si sfrutta tutta l\'aderenza della ruota motrice posteriore e l\'anteriore si scarica del tutto: F_NA = 0, momenti rispetto a B, a = g l₂/h (= g c_r/h). Si raggiunge quando f_ad = l₂/h; oltre, l\'auto si impenna prima di slittare.',
      fonte: { tipo: 'dispensa', pag: 101 },
    },
    {
      domanda: 'Che coppia deve dare il motore alle ruote per l\'accelerazione massima?',
      tipo: 'approfondimento',
      attesa: 'C_m = F_T R = M a_max R (R raggio della ruota); oltre quel valore le ruote slittano.',
      fonte: { tipo: 'dispensa', pag: [90, 100] },
    },
    {
      domanda: 'Come ripartiresti la frenata tra anteriore e posteriore?',
      tipo: 'collegamento',
      argomento: 'c3-partitore',
      attesa: 'In proporzione alle normali dinamiche: F_TA/F_TB = (l₂ + f h)/(l₁ − f h), cioè molto davanti. È il compito del partitore di frenata; con un\'altra ripartizione un asse slitta prima e a_max < f g.',
      fonte: { tipo: 'deduzione', da: 'p. 92', spiegazione: 'ripartizione ideale dalle normali in frenata (d136, NF-125)' },
    },
    {
      domanda: 'In curva, chi arriva prima, lo slittamento o il ribaltamento?',
      tipo: 'collegamento',
      argomento: 'c2-ribaltamento',
      attesa: 'v_slip = √(f_ad g R), v_rib = √(R c g/2h): ribalta prima se c/(2h) < f_ad (veicoli alti e stretti), altrimenti slitta.',
      fonte: { tipo: 'dispensa', pag: [94, 95] },
    },
    {
      domanda: 'Da dove viene l\'accelerazione v²/R?',
      tipo: 'approfondimento',
      attesa: 'Dalla formula del corpo rigido rispetto al centro della curva fisso: con ω costante resta solo −ω²(A − O), di modulo ω²R = v²/R, diretta verso il centro; la forza d\'inerzia è verso l\'esterno.',
      fonte: { tipo: 'dispensa', pag: 102 },
    },
    {
      domanda: 'Il motociclo in curva come si comporta rispetto all\'auto?',
      tipo: 'approfondimento',
      attesa: 'Si inclina dell\'angolo di piega tan α = v²/(gR), che è l\'inclinazione della risultante di contatto: non slitta finché α ≤ φ_ad, quindi la stessa v_max = √(f_ad g R).',
      fonte: { tipo: 'dispensa', pag: [95, 96] },
    },
  ],
  simboli: [
    { simbolo: 'l_1,\\ l_2', significato: 'distanze del baricentro dal contatto anteriore A e posteriore B', altrove: 'c_f, c_r nel manoscritto (pp. 100–101); a, b in q20' },
    { simbolo: 'h', significato: 'altezza del baricentro' },
    { simbolo: 'a', significato: 'accelerazione (o decelerazione) del veicolo', altrove: 'q20 usa a anche per la distanza G–asse anteriore' },
    { simbolo: 'f_{ad}', significato: 'coefficiente di aderenza pneumatico–strada', altrove: 'μ nel manoscritto e in q20; f_ade a p. 89' },
    { simbolo: 'F_{N,A},\\ F_{N,B},\\ F_{T,A},\\ F_{T,B}', significato: 'normali e forze tangenziali sull\'asse anteriore (A) e posteriore (B)', altrove: 'N_F, N_R in q20' },
    { simbolo: 'C_m,\\ R', significato: 'coppia motrice alla ruota, raggio della ruota' },
    { simbolo: 'c,\\ R', significato: 'in curva: carreggiata e raggio della curva', altrove: 'R_v a p. 94, 96' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c2-veicolo' }, { kind: 'meccanismo', id: 'c2-curva' }],
  previsioni: [
    {
      id: 'c2-veic-pari',
      domanda: 'Con il peso ripartito al 50 % sui due assi, quale trazione dà l\'accelerazione massima più alta?',
      opzioni: ['anteriore', 'posteriore', 'sono uguali', 'dipende dalla massa'],
      corretta: 1,
      spiega: 'Con l₁ = l₂ i numeratori coincidono e la posteriore ha L − f h al denominatore: il trasferimento di carico la favorisce.',
      verify: () => {
        const r = vEng({ M: 1200, l1: 1.3, l2: 1.3, h: 0.55, f: 0.9 });
        return r.aMaxPost > r.aMaxAnt ? 1 : Math.abs(r.aMaxPost - r.aMaxAnt) < 1e-9 ? 2 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c2-veicolo' },
    },
    {
      id: 'c2-veic-60',
      domanda: 'Auto con il 60 % del peso sull\'anteriore, h = 0,2 L e f_ad = 1. Chi accelera di più?',
      opzioni: ['la trazione anteriore', 'la trazione posteriore', 'sono uguali (0,5 g)', 'nessuna supera 0,3 g'],
      corretta: 2,
      spiega: 'l₂ = 0,6 L, l₁ = 0,4 L: anteriore 0,6/(1 + 0,2) = 0,5 g, posteriore 0,4/(1 − 0,2) = 0,5 g. «La posteriore vince sempre» vale solo a pari ripartizione.',
      verify: () => {
        const r = vEng({ M: 1000, l1: 1.0, l2: 1.5, h: 0.5, f: 1 });
        return Math.abs(r.aMaxPost - r.aMaxAnt) < 1e-9 ? 2 : r.aMaxPost > r.aMaxAnt ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c2-veicolo' },
    },
    {
      id: 'c2-veic-frenata',
      domanda: 'In frenata ideale su quattro ruote con f_ad = 0,8, alzando il baricentro la decelerazione massima…',
      opzioni: ['aumenta', 'diminuisce', 'resta 0,8 g', 'si annulla'],
      corretta: 2,
      spiega: 'a_max = f_ad g dipende solo dalla somma delle normali (il peso): cambia invece la ripartizione ideale, più sbilanciata in avanti.',
      verify: () => {
        const a = vEng({ M: 1000, l1: 1.2, l2: 1.4, h: 0.4, f: 0.8 }), b = vEng({ M: 1000, l1: 1.2, l2: 1.4, h: 0.7, f: 0.8 });
        return Math.abs(a.decMax - b.decMax) < 1e-12 && Math.abs(a.decMax - 0.8 * 9.81) < 1e-9 ? 2 : b.decMax > a.decMax ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c2-veicolo' },
    },
  ],
  nf: ['NF-16', 'NF-39', 'NF-122', 'NF-123', 'NF-124', 'NF-125'],
};
