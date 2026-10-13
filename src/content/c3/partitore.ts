/**
 * C3 · Partitore di frenata (domanda q41). ASSENTE nella dispensa (NF-07): dedotto dalla dinamica longitudinale del
 * veicolo di pp. 90–92 e 100–101 (cap2.md), con la notazione di p. 92. Il dispositivo reale è descritto da fonte esterna.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { partitore as part } from '../../engine/c3';
import { arrow, circle, dim, dot, ground, line, poly, rot, svg, text } from '../svg';
import { D, DED, EST } from './comune';

const DED92 = (spiegazione: string) => DED('pp. 90–92 e 100–101 (dinamica longitudinale del veicolo)', spiegazione);

// ------------------------------------------------------------------ disegno (p. 92: veicolo in frenata, muso a sinistra)
function disegno() {
  const yg = 236, xA = 92, xB = 302, xG = 172, yG = 146, rw = 26;
  return svg(400, 312, [
    ground(20, yg, 380, yg),
    poly([[48, 205], [52, 170], [110, 160], [150, 118], [270, 116], [318, 158], [352, 166], [356, 205]], 'l', true),
    circle(xA, yg - rw, rw, 'l'), circle(xB, yg - rw, rw, 'l'), dot(xA, yg - rw), dot(xB, yg - rw),
    rot(xA, yg - rw, 15, 210, 150, 'f'), rot(xB, yg - rw, 15, 210, 150, 'f'),
    text(xA - rw - 4, yg - rw - 16, 'C_fa', { c: 'f', size: 12, anchor: 'end' }), text(xB - rw - 4, yg - rw - 16, 'C_fp', { c: 'f', size: 12, anchor: 'end' }),
    arrow(110, 40, 50, 40, 'v', 'V', -8, -10), arrow(300, 40, 360, 40, 'a', 'a', 8, -10),
    dot(xG, yG, 'G', 10, -10, 'a'),
    arrow(xG, yG, xG, yG + 52, 'f', 'Mg', 16, -4), arrow(xG, yG, xG - 54, yG, 'f', 'Ma', -8, -12),
    arrow(xA, yg, xA, yg - 78, 'f', 'F_NA', -22, 6), arrow(xB, yg, xB, yg - 46, 'f', 'F_NB', 24, 10),
    arrow(xA, yg, xA + 40, yg, 'f', 'F_TA', 8, 14), arrow(xB, yg, xB + 40, yg, 'f', 'F_TB', 8, 14),
    text(xA - 12, yg + 14, 'A', {}), text(xB - 12, yg + 14, 'B', {}),
    dim(xA, yg + 26, xG, yg + 26, 'l₁', 12), dim(xG, yg + 26, xB, yg + 26, 'l₂', 12),
    line(xG, yG, xG, yg, 'd'), dim(xG + 44, yG, xG + 44, yg, 'h', -12),
    text(200, 304, 'F_TA / F_TB = N_A / N_B = (g l₂ + a h) / (g l₁ − a h)', { c: 'a', size: 13 }),
  ], 'Veicolo in frenata (notazione di p. 92): forza d\'inerzia Ma in avanti, trasferimento di carico sull\'asse anteriore');
}

// ------------------------------------------------------------------ d051
export const d051: Dimostrazione = {
  id: 'd051',
  titolo: 'Partitore di frenata: ripartizione ideale della forza frenante fra gli assi',
  enunciato: 'Ricavare le reazioni normali in frenata, la ripartizione della forza frenante che porta entrambi gli assi insieme al limite d\'aderenza e che cosa succede con una ripartizione fissa.',
  ipotesi: [
    'strada piana; frenata su tutte le ruote; resistenze al rotolamento e aerodinamica trascurate (come a p. 89)',
    'veicolo rigido di massa M, baricentro a quota h, a distanza l₁ dall\'asse anteriore A e l₂ dal posteriore B; a = modulo della decelerazione',
    'stesso coefficiente d\'aderenza f_ad sui due assi; forze tangenziali applicate ai contatti',
  ],
  sample: (rnd) => {
    const M = U(rnd, 800, 2000), g = 9.81, l1 = U(rnd, 1, 1.5), l2 = U(rnd, 1.2, 1.8), h = U(rnd, 0.4, 0.7), f = U(rnd, 0.6, 1);
    const a = U(rnd, 0.2, 1) * f * g, beta = U(rnd, 0.45, 0.8);
    const r = part({ M, g, l1, l2, h, f, a, beta });
    const rs = part({ M, g, l1, l2, h, f, a: f * g, beta });
    return { M, g, l1, l2, h, f, a, beta, L: l1 + l2, NA: r.NA, NB: r.NB, aB: r.aB, betaStar: rs.betaIdeale };
  },
  passi: [
    {
      id: 'd051.1',
      latex: 'x:\\ -F_{T,A} - F_{T,B} + Ma = 0,\\qquad y:\\ F_{N,A} + F_{N,B} - Mg = 0',
      perche: 'Prima equazione cardinale della dinamica con la forza d\'inerzia $Ma$ applicata in G, diretta in avanti (p. 92). Le due forze frenanti ai contatti equilibrano le coppie frenanti sulle ruote.',
      fonte: D(92),
      distrattori: [],
      num: (v) => [v.NA + v.NB - v.M * v.g, 0],
    },
    {
      id: 'd051.2',
      latex: '\\sum M_B = 0:\\ -F_{N,A}(l_1 + l_2) + Mg\\,l_2 + Ma\\,h = 0 \\;\\Rightarrow\\; F_{N,A} = M\\,\\dfrac{g\\,l_2 + a\\,h}{l_1 + l_2}',
      perche: 'Seconda equazione cardinale con polo nel contatto posteriore (le forze tangenziali sono al suolo e non hanno braccio). La forza d\'inerzia, a quota $h$, ha momento che **carica l\'anteriore**: è il contrario dell\'accelerazione di p. 90.',
      fonte: DED92('stesso equilibrio dei momenti di p. 90 con la forza d\'inerzia rivolta in avanti (frenata), non scritto a p. 92'),
      chiave: true,
      distrattori: [
        { latex: 'F_{N,A} = M\\,\\dfrac{g\\,l_2 - a\\,h}{l_1 + l_2}', errore: 'segno', spiega: 'Questa è l\'accelerazione (p. 90): in frenata l\'inerzia spinge in avanti e il carico va sull\'anteriore.', num: (v) => [v.NA, (v.M * (v.g * v.l2 - v.a * v.h)) / v.L] },
        { latex: 'F_{N,A} = M\\,\\dfrac{g\\,l_1 + a\\,h}{l_1 + l_2}', errore: 'indice', spiega: 'Il peso si ripartisce come su una trave appoggiata: all\'asse anteriore va la quota con il braccio l₂ (distanza di G dall\'altro asse).', num: (v) => [v.NA, (v.M * (v.g * v.l1 + v.a * v.h)) / v.L] },
      ],
      num: (v) => [-v.NA * v.L + v.M * v.g * v.l2 + v.M * v.a * v.h, 0],
    },
    {
      id: 'd051.3',
      latex: 'F_{N,B} = Mg - F_{N,A} = M\\,\\dfrac{g\\,l_1 - a\\,h}{l_1 + l_2},\\qquad \\Delta N = \\dfrac{M a h}{l_1 + l_2}',
      perche: 'Dall\'equilibrio verticale. La frenata trasferisce sull\'anteriore il carico $\\Delta N$, proporzionale alla decelerazione e al rapporto $h/(l_1 + l_2)$: la somma resta $Mg$.',
      fonte: DED92('equilibrio verticale di p. 92 con F_N,A del passo precedente'),
      distrattori: [],
      num: (v) => [v.M * v.g - v.NA, (v.M * (v.g * v.l1 - v.a * v.h)) / v.L],
    },
    {
      id: 'd051.4',
      latex: 'F_{T,A} = f_{ad}F_{N,A},\\ F_{T,B} = f_{ad}F_{N,B} \\;\\Rightarrow\\; Ma = f_{ad}(F_{N,A} + F_{N,B}) = f_{ad}Mg \\;\\Rightarrow\\; a_{max} = f_{ad}\\,g',
      perche: 'Il risultato della dispensa (p. 92): se **entrambi** gli assi sono all\'incipiente slittamento si sfrutta tutta l\'aderenza disponibile. Ma la dispensa avverte: vale «se la frenata è ripartita correttamente fra anteriore e posteriore».',
      fonte: D([92, 101]),
      distrattori: [],
      num: (v) => [(v.f * (v.NA + v.NB)) / v.M, v.f * v.g],
    },
    {
      id: 'd051.5',
      latex: '\\dfrac{F_{T,A}}{F_{T,B}} = \\dfrac{F_{N,A}}{F_{N,B}} = \\dfrac{g\\,l_2 + a\\,h}{g\\,l_1 - a\\,h}',
      perche: 'La ripartizione «corretta» è quella che dà a ogni asse la stessa utilizzazione dell\'aderenza $F_T/F_N = a/g$: le forze frenanti devono stare nel rapporto dei carichi. **Dipende dalla decelerazione**: più si frena forte, più deve frenare l\'anteriore.',
      fonte: DED92('rapporto delle forze tangenziali quando i due assi lavorano alla stessa F_T/F_N; vedi anche NdT di cap2.md a p. 92'),
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{F_{T,A}}{F_{T,B}} = \\dfrac{l_2}{l_1}', errore: 'termine-perso', spiega: 'È la ripartizione statica del peso: dimentica il trasferimento di carico dovuto alla forza d\'inerzia.', num: (v) => [v.NA / v.NB, v.l2 / v.l1] },
        { latex: '\\dfrac{F_{T,A}}{F_{T,B}} = \\dfrac{l_1}{l_2}', errore: 'indice', spiega: 'Bracci scambiati: l\'asse più vicino al baricentro porta più carico.', num: (v) => [v.NA / v.NB, v.l1 / v.l2] },
      ],
      num: (v) => [v.NA / v.NB, (v.g * v.l2 + v.a * v.h) / (v.g * v.l1 - v.a * v.h)],
    },
    {
      id: 'd051.6',
      latex: '\\beta = \\dfrac{F_{T,A}}{F_{T,A} + F_{T,B}};\\qquad a = f_{ad}g:\\ \\beta^* = \\dfrac{l_2 + f_{ad}\\,h}{l_1 + l_2}',
      perche: 'Con la frazione $\\beta$ di forza frenante sull\'anteriore, la ripartizione ideale alla decelerazione massima è $\\beta^* = F_{N,A}/(Mg)$ con $a = f_{ad}g$.',
      fonte: DED92('frazione anteriore della forza frenante ideale alla decelerazione massima'),
      chiave: true,
      distrattori: [
        { latex: '\\beta^* = \\dfrac{l_2}{l_1 + l_2}', errore: 'termine-perso', spiega: 'Ripartizione statica: manca f_ad h, il trasferimento di carico alla decelerazione massima.', num: (v) => [v.betaStar, v.l2 / v.L] },
        { latex: '\\beta^* = \\dfrac{l_2 - f_{ad}\\,h}{l_1 + l_2}', errore: 'segno', spiega: 'In frenata il carico va verso l\'anteriore: la frazione anteriore cresce.', num: (v) => [v.betaStar, (v.l2 - v.f * v.h) / v.L] },
      ],
      num: (v) => [v.betaStar, (v.l2 + v.f * v.h) / v.L],
    },
    {
      id: 'd051.7',
      latex: '\\beta\\ \\text{fisso}:\\quad a_A = \\dfrac{f_{ad}\\,g\\,l_2}{\\beta L - f_{ad}h},\\qquad a_B = \\dfrac{f_{ad}\\,g\\,l_1}{(1-\\beta)L + f_{ad}h},\\qquad a_{lim} = \\min(a_A, a_B) \\le f_{ad}g',
      perche: 'Con una ripartizione fissa ogni asse arriva al limite a una decelerazione diversa ($F_{T,A} = \\beta Ma = f_{ad}F_{N,A}(a)$, idem per B): si blocca prima l\'asse che arriva prima al limite e la decelerazione massima è minore di $f_{ad}g$, uguale solo per $\\beta = \\beta^*$.',
      fonte: DED92('condizione d\'incipiente slittamento su ciascun asse con F_T,A = βMa, F_T,B = (1 − β)Ma'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [(1 - v.beta) * v.M * v.aB, (v.f * v.M * (v.g * v.l1 - v.aB * v.h)) / v.L],
    },
    {
      id: 'd051.8',
      latex: '\\beta < \\beta^* \\;\\Rightarrow\\; a_B < a_A:\\ \\text{bloccano prima le posteriori}',
      perche: 'Il posteriore si scarica in frenata: se riceve troppa forza frenante le sue ruote bloccano per prime e il veicolo perde stabilità direzionale (il retrotreno tende a sbandare). Il **partitore** (limitatore/ripartitore di pressione) riduce la pressione ai freni posteriori oltre una soglia, per seguire la curva ideale; oggi lo fa l\'elettronica (EBD).',
      fonte: EST('descrizione tecnica usuale del ripartitore di frenata (limitatore di pressione posteriore, EBD)', 'il dispositivo e il problema della stabilità non sono nella dispensa; la condizione di bloccaggio viene dal passo precedente'),
      distrattori: [],
    },
  ],
  risultato: { latex: '\\dfrac{F_{T,A}}{F_{T,B}} = \\dfrac{g\\,l_2 + a\\,h}{g\\,l_1 - a\\,h},\\qquad \\beta^* = \\dfrac{l_2 + f_{ad}h}{l_1 + l_2}\\ \\Rightarrow\\ a_{max} = f_{ad}\\,g', fonte: DED92('ripartizione che rende vera la «frenata ripartita correttamente» di p. 92') },
  gancio: 'In frenata il carico va avanti: la forza frenante deve seguirlo, e il partitore toglie pressione dietro.',
};

// ------------------------------------------------------------------ argomento
export const partitoreArg: ArgomentoContenuto = {
  id: 'c3-partitore',
  cosaDireSubito:
    'Il partitore di frenata ripartisce la forza frenante fra asse anteriore e posteriore. In frenata la forza d\'inerzia, applicata al baricentro a quota h, trasferisce carico sull\'anteriore: N_A = M(g l₂ + a h)/L, N_B = M(g l₁ − a h)/L. La dispensa ricava a_max = f_ad g supponendo entrambi gli assi al limite d\'aderenza: serve F_T,A/F_T,B = N_A/N_B, che cambia con la decelerazione, e il partitore la insegue togliendo pressione al posteriore. Nella dispensa il partitore non c\'è: è una deduzione dalla dinamica del veicolo.',
  sistemaIpotesi: [
    'Sistema: veicolo rigido di massa M su strada piana, baricentro G a quota h, l₁ = A–G, l₂ = G–B (A anteriore).',
    'Frenata su quattro ruote, resistenze al moto trascurate.',
    'Stesso coefficiente d\'aderenza f_ad sui due assi; incipiente slittamento F_T = f_ad F_N.',
    'Argomento assente nella dispensa: deduzione dalle pp. 90–92 (NF-07).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Veicolo in frenata con la notazione di p. 92: Ma in avanti al baricentro, F_NA cresce e F_NB cala.',
    fonte: D(92, { fig: 'auto in frenata, muso a sinistra' }),
    elementi: [
      { id: 'veicolo', testo: 'veicolo con V verso il moto e decelerazione a opposta', obbligatorio: true },
      { id: 'G', testo: 'baricentro G a quota h con Mg e forza d\'inerzia Ma in avanti', obbligatorio: true },
      { id: 'reazioni', testo: 'reazioni normali F_NA > F_NB (trasferimento di carico)', obbligatorio: true },
      { id: 'tangenziali', testo: 'forze frenanti F_TA, F_TB ai contatti, opposte al moto', obbligatorio: true },
      { id: 'quote', testo: 'quote l₁, l₂, h', obbligatorio: true },
      { id: 'coppie', testo: 'coppie frenanti C_fa, C_fp sulle ruote', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'Ma = F_{T,A} + F_{T,B},\\quad F_{N,A} + F_{N,B} = Mg,\\quad \\sum M_B:\\ F_{N,A}(l_1 + l_2) = Mg\\,l_2 + Ma\\,h',
    spiegazione: 'Equazioni cardinali della dinamica del veicolo in frenata (p. 92) con l\'equilibrio dei momenti rispetto al contatto posteriore.',
    fonte: DED92('equazioni di p. 92 completate con i momenti come a p. 90'),
  },
  dimostrazioni: ['d051'],
  significato:
    'La decelerazione massima f_ad g si ottiene solo se gli assi frenano in proporzione ai loro carichi istantanei, che dipendono dalla decelerazione. Con una ripartizione fissa uno dei due assi blocca prima: se è il posteriore il veicolo diventa instabile. Il partitore limita la pressione ai freni posteriori per avvicinarsi alla curva ideale.',
  fraseDaRicordare: 'In frenata il carico va avanti: la forza frenante deve seguirlo, F_TA/F_TB = N_A/N_B.',
  daNonDire: [
    { frase: 'La dispensa tratta il partitore di frenata.', perche: 'Non c\'è: la dispensa scrive solo a_max = f_ad g «se la frenata è ripartita correttamente» (p. 92). Il resto è deduzione (NF-148).', fonte: D(92) },
    { frase: 'La ripartizione ideale è quella del peso statico, l₂/l₁.', perche: 'Ignora il trasferimento di carico M a h/L: la ripartizione ideale cresce verso l\'anteriore con la decelerazione.', fonte: DED92('d051.5') },
    { frase: 'In frenata si carica l\'asse posteriore.', perche: 'La forza d\'inerzia è in avanti, a quota h: carica l\'anteriore e scarica il posteriore (al contrario dell\'accelerazione di p. 90–91).', fonte: D([90, 92]) },
    { frase: 'Con qualsiasi ripartizione si arriva a f_ad g.', perche: 'Solo con β = β*; altrimenti un asse blocca prima e a_lim < f_ad g.', fonte: DED92('d051.7') },
  ],
  approfondimenti: [
    { domanda: 'Come si scrive la decelerazione massima nella dispensa?', tipo: 'collegamento', argomento: 'c2-veicolo', attesa: 'x: Ma = F_TA + F_TB; y: F_NA + F_NB = Mg; con entrambi gli assi al limite F_T = f_ad F_N e sommando: a_max = f_ad g, indipendente dal trasferimento di carico perché si usa solo la somma.', fonte: D(92) },
    { domanda: 'Quanto vale la frazione ideale sull\'anteriore con l₁ = l₂, h/L = 0,2 e f_ad = 0,8?', tipo: 'approfondimento', attesa: 'β* = (l₂ + f h)/L = 0,5 + 0,8·0,2 = 0,66: due terzi della frenata davanti.', fonte: DED92('β* = (l₂ + f_ad h)/L') },
    { domanda: 'Perché il bloccaggio posteriore è più pericoloso?', tipo: 'approfondimento', attesa: 'Con le ruote posteriori bloccate il retrotreno non regge forze laterali e il veicolo tende a girarsi; con le anteriori bloccate si perde la sterzata ma il veicolo resta stabile. Non è nella dispensa.', fonte: EST('dinamica del veicolo, stabilità in frenata', 'considerazione qualitativa standard, non presente nella dispensa') },
    { domanda: 'Che cosa cambia rispetto all\'accelerazione massima?', tipo: 'collegamento', argomento: 'c2-veicolo', attesa: 'In accelerazione l\'inerzia è all\'indietro e carica il posteriore (a_max con −h f al denominatore per la trazione posteriore, p. 101); in frenata carica l\'anteriore.', fonte: D([90, 101]) },
    { domanda: 'Con β fisso, quale asse blocca prima?', tipo: 'approfondimento', attesa: 'Si confrontano a_A = f g l₂/(βL − f h) e a_B = f g l₁/((1 − β)L + f h): blocca prima quello con la decelerazione limite minore; per β < β* il posteriore.', fonte: DED92('d051.7') },
  ],
  simboli: [
    { simbolo: 'l_1,\\ l_2', significato: 'distanze del baricentro dall\'asse anteriore (A) e posteriore (B)', altrove: 'l_F, l_R in q41; c_f, c_r a p. 100–101' },
    { simbolo: 'h', significato: 'quota del baricentro' },
    { simbolo: 'a', significato: 'modulo della decelerazione' },
    { simbolo: 'f_{ad}', significato: 'coefficiente d\'aderenza pneumatico–strada', altrove: 'μ in q41 e a pp. 100–102' },
    { simbolo: 'F_{N,A},\\ F_{N,B}', significato: 'reazioni normali anteriore e posteriore', altrove: 'N_F, N_R in q41' },
    { simbolo: '\\beta', significato: 'frazione della forza frenante sull\'asse anteriore (non nella dispensa)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c3-partitore' }],
  previsioni: [
    {
      id: 'c3-part-chi',
      domanda: 'Ripartizione fissa con β minore di quella ideale β*. Frenando sempre più forte, quali ruote bloccano per prime?',
      opzioni: ['le anteriori', 'le posteriori', 'tutte insieme'],
      corretta: 1,
      spiega: 'Con troppa forza dietro il posteriore, che si sta scaricando, arriva prima al limite: a_B < a_A.',
      verify: () => {
        const p = { M: 1200, g: 9.81, l1: 1.2, l2: 1.5, h: 0.55, f: 0.8, a: 3 };
        const bs = part({ ...p, beta: 0.6 }).betaStar;
        return ({ anteriore: 0, posteriore: 1, insieme: 2 } as const)[part({ ...p, beta: bs - 0.1 }).primo];
      },
      visual: { kind: 'meccanismo', id: 'c3-partitore' },
    },
    {
      id: 'c3-part-ideale',
      domanda: 'Al crescere della decelerazione, la frazione ideale di frenata sull\'anteriore…',
      opzioni: ['cala', 'resta costante', 'cresce'],
      corretta: 2,
      spiega: 'β_ideale = (l₂ + (a/g)h)/L cresce con a: il carico si sposta in avanti.',
      verify: () => {
        const p = { M: 1200, g: 9.81, l1: 1.2, l2: 1.5, h: 0.55, f: 0.8, beta: 0.6 };
        const b1 = part({ ...p, a: 2 }).betaIdeale, b2 = part({ ...p, a: 6 }).betaIdeale;
        return b2 > b1 ? 2 : b2 < b1 ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c3-partitore' },
    },
  ],
  nf: ['NF-07', 'NF-39', 'NF-148'],
};
