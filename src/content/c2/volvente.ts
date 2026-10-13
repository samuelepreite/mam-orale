/**
 * C2 · Attrito volvente (domanda q35). Dispensa pp. 83–88 (§2.3, LaTeX). Dimostrazione d028.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { volvente as volEng } from '../../engine/c2';
import { arc, arrow, dim, dot, ground, line, rot, svg, text } from '../svg';

// ------------------------------------------------------------------ disegno (figura di p. 88)
function disegno() {
  const cx = 200, cy = 112, R = 92, thDeg = 24;
  const th = (thDeg * Math.PI) / 180;
  const hy = R * Math.cos(th);
  const yg = cy + hy;
  const xa = cx - R * Math.sin(th), xb = cx + R * Math.sin(th);
  const u = 16;
  return svg(400, 290, [
    arc(cx, cy, R, -90 + thDeg, 270 - thDeg, 'l'),
    line(xa, yg, xb, yg, 'l', 2.5),
    arc(cx, cy, R, -90 - thDeg, -90 + thDeg, 'd'),
    ground(20, yg, 380, yg),
    dot(cx, cy, 'O', 12, -10),
    arrow(cx, cy, cx, cy + 46, 'f', 'N', 14, -6),
    rot(cx, cy, 42, 40, 140, 'v', 'ω'),
    arrow(cx - 6, cy - 4, cx - 66, cy - 4, 'v', 'v_O', -10, -12),
    line(cx, cy + 50, cx, yg + 34, 'm', 1),
    arrow(cx - u, yg + 52, cx - u, yg, 'a', 'F_N', -24, 36),
    arrow(cx - u - 2, yg - 3, cx - u + 50, yg - 3, 'f', 'F_T,ad', 30, -12),
    dim(cx - u, yg + 30, cx, yg + 30, 'u', 14),
    dim(cx + R + 16, cy, cx + R + 16, yg, 'h', -10),
    dot(xa, yg, 'A', -12, 14), dot(xb, yg, 'B', 12, 14),
    text(xa - 30, yg - 28, 'compressione', { c: 'm', size: 12 }),
    text(xb + 34, yg - 28, 'rilascio', { c: 'm', size: 12 }),
  ], 'Ruota folle che rotola verso sinistra: orma A–B, reazione F_N spostata di u verso la zona di compressione, forza di aderenza F_T,ad opposta al moto');
}

// ------------------------------------------------------------------ dimostrazione d028
const P = (pag: number | [number, number]) => ({ tipo: 'dispensa', pag }) as const;

export const d028: Dimostrazione = {
  id: 'd028',
  titolo: 'Attrito volvente: parametro u e coefficiente f_v',
  enunciato: 'Spiegare perché una ruota deformabile che rotola senza strisciare incontra una resistenza, e ricavare la forza di aderenza al suolo necessaria per una ruota folle.',
  ipotesi: [
    'ruota omogenea deformabile, modellata come settori a molla; orma di contatto piccola (θ piccolo)',
    'in condizioni dinamiche il materiale segue un ciclo di isteresi',
    'ruota folle a velocità costante (rotolamento senza strisciamento); altezza del centro h ≃ R (NF-17)',
  ],
  sample: (rnd) => {
    const R = U(rnd, 0.2, 0.5), thetaMax = U(rnd, 0.05, 0.25), h = R * Math.cos(thetaMax);
    const FN = U(rnd, 1000, 8000), u = R * U(rnd, 0.005, 0.03);
    return { R, thetaMax, h, FN, u, FT: (FN * u) / h, fv: u / R };
  },
  passi: [
    {
      id: 'd028.1',
      latex: '\\theta_{max} = \\arccos\\dfrac hR',
      perche: 'Con il carico $N$ la ruota si schiaccia: il centro scende a quota $h < R$ e l\'orma è la corda vista da O sotto l\'angolo $2\\theta_{max}$. Le molle fuori dall\'orma sono a riposo, quelle dentro sono compresse, di più in mezzeria.',
      fonte: P([84, 85]),
      distrattori: [],
      num: (v) => [Math.cos(v.thetaMax), v.h / v.R],
    },
    {
      id: 'd028.2',
      latex: '\\text{statico: } F_{el} = k\\,\\Delta l \\;\\Rightarrow\\; p \\ \\text{simmetrica} \\;\\Rightarrow\\; F_N \\ \\text{passa per } O',
      perche: 'Per orma piccola le deformazioni si approssimano con spostamenti verticali, simmetrici rispetto alla mezzeria. Con la legge di Hooke le pressioni seguono le deformazioni: la reazione del suolo passa per il centro, nessun momento.',
      fonte: P([85, 86]),
      distrattori: [],
    },
    {
      id: 'd028.3',
      latex: '\\Delta l_1 = \\Delta l_2 \\;\\Rightarrow\\; p_1 > p_2 \\quad (P_1 \\text{ in compressione},\\ P_2 \\text{ in rilascio})',
      perche: 'In rotazione ogni settore viene compresso entrando nell\'orma e rilasciato uscendone. Per l\'attrito interno del materiale l\'energia spesa per comprimere supera quella restituita (ciclo di isteresi): a pari deformazione la pressione in compressione è maggiore che in rilascio.',
      fonte: P([86, 87]),
      chiave: true,
      distrattori: [
        { latex: 'p_1 = p_2', errore: 'ipotesi', spiega: 'Vale solo per molla ideale senza isteresi, cioè in statica: in rotazione il ciclo di isteresi rompe la simmetria.' },
        { latex: 'p_1 < p_2', errore: 'segno', spiega: 'Il ramo di carico (compressione) sta sopra quello di scarico: a pari Δl la forza in compressione è maggiore.' },
      ],
    },
    {
      id: 'd028.4',
      latex: 'F_N \\ \\text{spostata di } u \\ \\text{verso la zona di compressione}',
      perche: 'Ripetendo il ragionamento per ogni coppia di punti simmetrici, la distribuzione è sbilanciata verso il bordo d\'attacco (lato verso cui la ruota avanza): la risultante si sposta di $u$, il **parametro di attrito volvente**, e ha momento $F_N u$ opposto alla rotazione.',
      fonte: P([87, 88]),
      chiave: true,
      distrattori: [
        { latex: 'F_N \\ \\text{spostata verso la zona di rilascio}', errore: 'segno', spiega: 'Le pressioni maggiori sono nella zona di compressione, davanti: lì si sposta la risultante.' },
        { latex: 'u = \\text{strisciamento della ruota sul suolo}', errore: 'concetto', spiega: 'u è una distanza (spostamento della reazione), dovuta all\'isteresi; la ruota non striscia.' },
      ],
    },
    {
      id: 'd028.5',
      latex: 'O:\\ -F_N\\,u + F_{T,ad}\\,h = 0',
      perche: 'Ruota folle: nessuna coppia applicata. Per l\'equilibrio alla rotazione attorno al centro serve una forza di aderenza al suolo opposta al moto, il cui braccio è l\'altezza $h$ del centro.',
      fonte: P(88),
      chiave: true,
      distrattori: [
        { latex: 'F_N\\,u + F_{T,ad}\\,h = 0', errore: 'segno', spiega: 'Il momento di F_N si oppone alla rotazione: la forza al suolo deve dare momento opposto, cioè essere diretta contro il moto.', num: (v) => [v.FN * v.u + v.FT * v.h, 0] },
        { latex: 'F_{T,ad} = f_{att}\\,F_N', errore: 'concetto', spiega: 'Non c\'è strisciamento: la forza al suolo è una reazione di aderenza che vale quanto serve a bilanciare F_N u.' },
      ],
      num: (v) => [-v.FN * v.u + v.FT * v.h, 0],
    },
    {
      id: 'd028.6',
      latex: 'F_{T,ad} = \\dfrac uh\\,F_N \\simeq \\dfrac uR\\,F_N \\quad (h \\simeq R)',
      perche: 'Dall\'equazione dei momenti si ha $u/h$; poiché la deformazione è piccola il centro è quasi a quota $R$, e la dispensa scrive direttamente $u/R$. L\'approssimazione va dichiarata.',
      fonte: P(88),
      correzione: { nf: 'NF-17', dispensaScrive: '-F_N u + F_{T,ad}\\,h = 0 \\;\\Rightarrow\\; F_{T,ad} = \\frac uR F_N' },
      distrattori: [
        { latex: 'F_{T,ad} = \\dfrac hu\\,F_N', errore: 'indice', spiega: 'La forza al suolo è piccola: u (millimetri) sta al numeratore.', num: (v) => [v.FT, (v.h / v.u) * v.FN] },
        { latex: 'F_{T,ad} = u\\,F_N', errore: 'fattore', spiega: 'Non è omogenea: u è una lunghezza, va divisa per il braccio.', num: (v) => [v.FT, v.u * v.FN] },
      ],
      num: (v) => [v.FT, (v.u / v.h) * v.FN],
    },
    {
      id: 'd028.7',
      latex: 'f_v = \\dfrac uR \\;\\Rightarrow\\; F_{T,ad} \\simeq f_v\\,F_N',
      perche: 'Il rapporto $u/R$ è il **coefficiente di attrito volvente**: dipende dalle caratteristiche elastiche dei materiali a contatto. La resistenza al rotolamento si scrive come un attrito, con $f_v$ al posto di $f$.',
      fonte: P(88),
      distrattori: [],
      num: (v) => [v.fv * v.FN, (v.u / v.R) * v.FN],
    },
    {
      id: 'd028.8',
      latex: 'f_v \\ll f_{ad}: \\quad \\text{pneumatico su asfalto } f_v = 0{,}013\\text{–}0{,}015,\\ f_{ad} = 0{,}8\\text{–}1{,}1',
      perche: 'I valori della tabella mostrano uno o due ordini di grandezza di differenza: per questo nella dinamica del veicolo la resistenza al rotolamento si trascura e si usano ruote e cuscinetti volventi.',
      fonte: P([70, 88]),
      distrattori: [],
    },
  ],
  risultato: { latex: 'F_{T,ad} = \\dfrac uh F_N \\simeq f_v F_N, \\qquad f_v = \\dfrac uR', fonte: P(88), correzione: { nf: 'NF-17', dispensaScrive: 'F_{T,ad} = \\frac uR F_N \\ \\text{(senza dichiarare } h \\simeq R)' } },
  gancio: 'Isteresi ⇒ pressioni più alte davanti ⇒ F_N avanti di u ⇒ momento F_N u da bilanciare con una forza al suolo f_v F_N.',
};

// ------------------------------------------------------------------ argomento
export const volvente: ArgomentoContenuto = {
  id: 'c2-volvente',
  cosaDireSubito:
    'Una ruota reale non tocca il suolo in un punto: si deforma su un\'orma. In statica le pressioni sono simmetriche e la normale passa per il centro; quando rotola, per l\'isteresi del materiale le pressioni nella zona di compressione superano quelle nella zona di rilascio e la normale si sposta in avanti di u. Il momento F_N u va bilanciato, in una ruota folle, da una forza di aderenza al suolo F_T = (u/R) F_N = f_v F_N, opposta al moto.',
  sistemaIpotesi: [
    'Sistema: ruota di raggio R caricata da N, deformabile (settori a molla), su suolo rigido.',
    'Orma piccola: deformazioni ≈ spostamenti verticali; centro a quota h < R, con h ≃ R.',
    'Materiale con ciclo di isteresi; ruota folle a velocità costante, nessuno strisciamento.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Ruota folle con ω antioraria (avanza verso sinistra), dispensa p. 88: la reazione F_N è spostata di u verso A, zona di compressione.',
    fonte: { tipo: 'dispensa', pag: 88, fig: 'ruota con F_N spostata di u' },
    elementi: [
      { id: 'ruota', testo: 'ruota di centro O e raggio R con orma piatta A–B', obbligatorio: true },
      { id: 'N', testo: 'carico N in O, verso di rotazione ω e di avanzamento', obbligatorio: true },
      { id: 'FN', testo: 'reazione F_N spostata di u verso la zona di compressione (davanti)', obbligatorio: true },
      { id: 'FT', testo: 'forza di aderenza F_T,ad al suolo, opposta al moto', obbligatorio: true },
      { id: 'h', testo: 'quota h del centro (h ≃ R)', obbligatorio: false },
      { id: 'isteresi', testo: 'a parte: ciclo di isteresi p–Δl con p₁ > p₂ a pari Δl', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '-F_N\\,u + F_{T,ad}\\,h = 0',
    spiegazione: 'Equilibrio alla rotazione della ruota folle attorno al centro: il momento della normale spostata di u è bilanciato dalla forza di aderenza al suolo (braccio h ≃ R).',
    fonte: { tipo: 'dispensa', pag: 88 },
  },
  dimostrazioni: ['d028'],
  significato:
    'L\'attrito volvente non nasce da uno strisciamento ma dall\'energia persa nel ciclo di deformazione: c\'è anche con aderenza perfetta. Si scrive come un attrito con un coefficiente f_v = u/R molto più piccolo di f_ad, ed è per questo che il rotolamento conviene rispetto allo strisciamento (ruote, cuscinetti volventi).',
  fraseDaRicordare: 'F_N si sposta di u verso la zona di compressione: F_T = (u/R) F_N = f_v F_N, con f_v ≪ f_ad.',
  daNonDire: [
    { frase: 'L\'attrito volvente è dovuto allo strisciamento della ruota.', perche: 'La ruota rotola senza strisciare: la causa è l\'isteresi del materiale che si deforma ciclicamente.', fonte: { tipo: 'dispensa', pag: [86, 87] } },
    { frase: 'La normale si sposta indietro.', perche: 'Si sposta verso la zona di compressione, cioè verso il lato dove la ruota avanza.', fonte: { tipo: 'dispensa', pag: 87 } },
    { frase: 'Già in statica la normale è spostata di u.', perche: 'In statica le pressioni sono simmetriche e la normale passa per il centro: lo spostamento nasce con la rotazione.', fonte: { tipo: 'dispensa', pag: 86 } },
    { frase: 'Dai momenti si ottiene esattamente F_T = (u/R) F_N.', perche: 'Il braccio della forza al suolo è h < R: si ottiene u/h, e u/R vale con h ≃ R (NF-17).', fonte: { tipo: 'dispensa', pag: 88 } },
  ],
  approfondimenti: [
    {
      domanda: 'Perché il contatto non può essere puntiforme?',
      tipo: 'approfondimento',
      attesa: 'Con un carico finito su un punto le pressioni sarebbero infinite: per la deformabilità dei corpi il contatto si distribuisce su un\'orma.',
      fonte: { tipo: 'dispensa', pag: 83 },
    },
    {
      domanda: 'Disegna il ciclo di isteresi e dimmi dove sta l\'energia dissipata.',
      tipo: 'approfondimento',
      attesa: 'Nel piano F–Δl la curva di carico sta sopra quella di scarico: l\'area sotto il carico è l\'energia spesa, quella sotto lo scarico l\'energia recuperata, l\'area racchiusa dal ciclo è l\'energia dissipata per isteresi.',
      fonte: { tipo: 'dispensa', pag: [86, 87] },
    },
    {
      domanda: 'Quanto vale f_v? Dammi qualche ordine di grandezza.',
      tipo: 'approfondimento',
      attesa: 'Cuscinetti radiali a sfere 0,0010, a rulli cilindrici 0,0010–0,0020, ruota su rotaia 0,026/√d (d in mm), pneumatico su asfalto 0,013–0,015, in fuoristrada 0,15–0,35.',
      fonte: { tipo: 'dispensa', pag: 88 },
    },
    {
      domanda: 'Quanta potenza dissipa una ruota che rotola a velocità v?',
      tipo: 'approfondimento',
      attesa: 'La forza resistente per la velocità del centro: W = F_T v ≃ f_v F_N v, oppure il momento F_N u per ω = v/R.',
      fonte: { tipo: 'deduzione', da: 'p. 88', spiegazione: 'potenza della forza resistente equivalente f_v F_N alla velocità v = ωR' },
    },
    {
      domanda: 'Perché nella dinamica del veicolo la trascuri?',
      tipo: 'approfondimento',
      attesa: 'Perché f_v ≪ f_ad: in accelerazione massima conta il limite d\'aderenza, la resistenza al rotolamento è di uno o due ordini di grandezza più piccola.',
      fonte: { tipo: 'dispensa', pag: 89 },
    },
    {
      domanda: 'Come entra l\'attrito volvente nel cuscinetto?',
      tipo: 'collegamento',
      argomento: 'c2-cuscinetti',
      attesa: 'Il carico su ogni elemento volvente si inclina di α con sin α = u/R = f_v; le rette d\'azione inviluppano la circonferenza di attrito volvente ρ = R_g f_v e il momento resistente è circa (5/π) Q R_g f_v.',
      fonte: { tipo: 'dispensa', pag: 99 },
    },
  ],
  simboli: [
    { simbolo: 'u', significato: 'parametro di attrito volvente (spostamento della reazione normale)' },
    { simbolo: 'f_v = u/R', significato: 'coefficiente di attrito volvente' },
    { simbolo: 'h', significato: 'quota del centro della ruota deformata (h < R)' },
    { simbolo: '\\theta_{max}', significato: 'semiapertura dell\'orma, arccos(h/R)' },
    { simbolo: 'F_N,\\ F_{T,ad}', significato: 'reazione normale del suolo e forza di aderenza al suolo', altrove: 'F_n a p. 88; F_v «forza equivalente al centro» in q35 e d028' },
  ],
  previsioni: [
    {
      id: 'c2-vol-raggio',
      domanda: 'A parità di carico e di parametro u, una ruota di raggio doppio richiede una forza di traino…',
      opzioni: ['doppia', 'uguale', 'metà', 'quadrupla'],
      corretta: 2,
      spiega: 'F_T = (u/R) F_N: con R doppio il momento F_N u è lo stesso ma il braccio raddoppia. Per questo i carri hanno ruote grandi.',
      verify: () => {
        const a = volEng({ FN: 1000, u: 0.005, R: 0.3, h: 0.3 }).FT, b = volEng({ FN: 1000, u: 0.005, R: 0.6, h: 0.6 }).FT;
        return Math.abs(b / a - 0.5) < 1e-12 ? 2 : b > a ? 0 : 1;
      },
    },
  ],
  nf: ['NF-17'],
};
