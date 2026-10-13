/**
 * C2 · Impuntamento del corsoio (domanda q34). Dispensa pp. 79–81 (§2.2.4, LaTeX). Dimostrazione d026.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { impuntamento as imp } from '../../engine/c2';
import { arrow, dim, dot, ground, line, rect, svg, text } from '../svg';

// ------------------------------------------------------------------ disegno (figura di p. 80, corsoio ruotato)
function disegno() {
  const cx = 190, cy = 150, hw = 66, hh = 90, th = (3 * Math.PI) / 180;
  const corner = (sx: number, sy: number): [number, number] => {
    const x = sx * hw, y = sy * hh; // coordinate matematiche (y in alto)
    return [cx + x * Math.cos(th) - y * Math.sin(th), cy - (x * Math.sin(th) + y * Math.cos(th))];
  };
  const [Ax, Ay] = corner(-1, 1);
  const [Bx, By] = corner(1, -1);
  const e = 40;
  return svg(400, 300, [
    ground(Ax, 14, Ax, 286),
    ground(Bx, 286, Bx, 14),
    rect(cx - hw, cy - hh, 2 * hw, 2 * hh, 'soft', 3),
    rect(cx - hw, cy - hh, 2 * hw, 2 * hh, 'l', 3),
    line(cx, 30, cx, 270, 'm', 1),
    dot(cx, cy, 'O', 12, 12),
    arrow(cx, cy, cx, cy + 50, 'f', 'F', 14, -4),
    arrow(cx + e, cy - hh + 2, cx + e, cy - hh - 46, 'f', 'Q', 14, 6),
    dim(cx, 22, cx + e, 22, 'e', -2),
    arrow(cx - 22, cy + 20, cx - 22, cy - 30, 'v', 'V', -14, 4),
    dot(Ax, Ay, 'A', -14, -10),
    dot(Bx, By, 'B', 14, 10),
    arrow(Ax - 2, Ay, Ax + 42, Ay, 'f', 'F_NA', 14, -12),
    arrow(Ax + 6, Ay, Ax + 6, Ay + 42, 'f', 'F_TA', 22, 4),
    arrow(Bx + 2, By, Bx - 42, By, 'f', 'F_NB', -18, 14),
    arrow(Bx - 6, By - 44, Bx - 6, By - 2, 'f'),
    text(Bx - 14, By - 50, 'F_TB', { c: 'f', anchor: 'end' }),
    dim(Bx + 26, Ay, Bx + 26, By, 'h', 6),
    dim(Ax, 262, Bx, 262, 'a', 6),
  ], 'Corsoio nelle guide ruotato dal gioco: contatti A in alto a sinistra e B in basso a destra, forze normali e d\'attrito, carico F, forza Q eccentrica di e');
}

// ------------------------------------------------------------------ dimostrazione d026
const P = (pag: number | [number, number]) => ({ tipo: 'dispensa', pag }) as const;

export const d026: Dimostrazione = {
  id: 'd026',
  titolo: 'Impuntamento: forza di comando e condizione limite',
  enunciato:
    'Un corsoio in una guida prismatica con gioco porta il carico F nel centro O ed è sollevato da una forza Q parallela alla guida, applicata a distanza e dall\'asse. Ricavare Q e la condizione di impuntamento.',
  ipotesi: [
    'gioco tra corsoio e guide: la coppia di Q e F ruota il corsoio (antiorario) e il contatto avviene in due soli punti, A (spigolo superiore sinistro) e B (inferiore destro)',
    'corsoio in moto verso l\'alto con accelerazione trascurabile: equilibrio statico',
    'strisciamento in A e B con lo stesso coefficiente: F_T = f_att F_N, attriti verso il basso',
  ],
  sample: (rnd) => {
    const F = U(rnd, 100, 2000), h = U(rnd, 0.05, 0.3), a = U(rnd, 0.03, 0.2), f = U(rnd, 0.1, 0.4);
    const e = (h / (2 * f)) * U(rnd, 0.05, 0.9);
    const Q = F / (1 - (2 * e * f) / h), FN = (Q * e) / h;
    return { F, h, a, f, e, Q, FN, FT: f * FN, eLim: h / (2 * f) };
  },
  passi: [
    {
      id: 'd026.1',
      latex: 'F_{T,A} = f_{att}F_{N,A}, \\quad F_{T,B} = f_{att}F_{N,B} \\quad (\\text{verso il basso})',
      perche: 'Il corsoio sale: in entrambi i contatti l\'attrito si oppone alla velocità, quindi è diretto verso il basso, e vale $f_{att}$ per la normale (strisciamento). Le normali spingono verso l\'interno: in A verso destra, in B verso sinistra.',
      fonte: P([80, 81]),
      distrattori: [],
    },
    {
      id: 'd026.2',
      latex: 'x:\\ F_{N,A} - F_{N,B} = 0 \\;\\Rightarrow\\; F_{N,A} = F_{N,B} = F_N',
      perche: 'Le sole forze orizzontali sono le due normali, opposte: sono uguali. Quindi anche gli attriti sono uguali, $F_{T,A} = F_{T,B} = f_{att}F_N$.',
      fonte: P(81),
      distrattori: [],
      num: (v) => [v.FN - v.FN, 0],
    },
    {
      id: 'd026.3',
      latex: 'y:\\ Q - F - F_{T,A} - F_{T,B} = 0 \\;\\Rightarrow\\; Q - F - 2f_{att}F_N = 0',
      perche: 'Equilibrio verticale: la forza di comando deve vincere il carico e i due attriti.',
      fonte: P(81),
      distrattori: [
        { latex: 'Q - F - f_{att}F_N = 0', errore: 'termine-perso', spiega: 'Gli attriti sono due, uno per contatto.', num: (v) => [v.Q - v.F - v.f * v.FN, 0] },
      ],
      num: (v) => [v.Q - v.F - 2 * v.f * v.FN, 0],
    },
    {
      id: 'd026.4',
      latex: 'O:\\ -F_{N,A}\\dfrac h2 - F_{N,B}\\dfrac h2 + F_{T,A}\\dfrac a2 - F_{T,B}\\dfrac a2 + Q\\,e = 0',
      perche: 'Momenti rispetto al centro O (antiorario positivo), con A in $(-a/2,\\ h/2)$ e B in $(a/2,\\ -h/2)$: le normali danno momento orario con braccio $h/2$, gli attriti bracci $\\pm a/2$, $Q$ braccio $e$; $F$ passa per O.',
      fonte: P(81),
      chiave: true,
      distrattori: [
        { latex: '-F_{N,A}\\dfrac h2 - F_{N,B}\\dfrac h2 + F_{T,A}\\dfrac a2 + F_{T,B}\\dfrac a2 + Q\\,e = 0', errore: 'segno', spiega: 'I due attriti sono paralleli e concordi ma stanno da parti opposte rispetto a O: i loro momenti hanno segno opposto.', num: (v) => [-v.FN * v.h + v.FT * v.a + v.Q * v.e, 0] },
        { latex: '-F_{N,A}\\,h - F_{N,B}\\,h + Q\\,e = 0', errore: 'fattore', spiega: 'Rispetto al centro ogni normale ha braccio h/2, non h (h è la distanza verticale tra A e B).', num: (v) => [-2 * v.FN * v.h + v.Q * v.e, 0] },
      ],
      num: (v) => [-v.FN * v.h / 2 - v.FN * v.h / 2 + v.FT * v.a / 2 - v.FT * v.a / 2 + v.Q * v.e, 0],
    },
    {
      id: 'd026.5',
      latex: 'F_{T,A} = F_{T,B} \\;\\Rightarrow\\; -F_N\\,h + Q\\,e = 0',
      perche: 'Gli attriti sono uguali e hanno bracci opposti $\\pm a/2$: i loro momenti si elidono e la larghezza $a$ sparisce. Resta: la coppia delle normali (braccio $h$) bilancia il momento di $Q$. Le normali **crescono con Q**: è qui che nasce l\'impuntamento.',
      fonte: P(81),
      chiave: true,
      distrattori: [
        { latex: '-F_N\\,h + f_{att}F_N\\,a + Q\\,e = 0', errore: 'segno', spiega: 'Gli attriti non si sommano nei momenti: si elidono perché stanno da parti opposte rispetto a O.', num: (v) => [-v.FN * v.h + v.f * v.FN * v.a + v.Q * v.e, 0] },
        { latex: '-F_N\\,\\dfrac h2 + Q\\,e = 0', errore: 'fattore', spiega: 'Le normali sono due, ciascuna con braccio h/2: insieme danno F_N h.', num: (v) => [-v.FN * v.h / 2 + v.Q * v.e, 0] },
      ],
      num: (v) => [-v.FN * v.h + v.Q * v.e, 0],
    },
    {
      id: 'd026.6',
      latex: 'F_{N,A} = F_{N,B} = \\dfrac{Q - F}{2f_{att}}',
      perche: 'Dall\'equilibrio verticale si ricava la normale in funzione di $Q$.',
      fonte: P(81),
      distrattori: [],
      num: (v) => [v.FN, (v.Q - v.F) / (2 * v.f)],
    },
    {
      id: 'd026.7',
      latex: '-\\dfrac{h}{2f_{att}}(Q - F) + Q\\,e = 0 \\;\\Rightarrow\\; Q = \\dfrac{F}{1 - \\dfrac{2e\\,f_{att}}{h}}',
      perche: 'Si sostituisce la normale nell\'equazione dei momenti e si risolve per $Q$: $Q(h - 2ef_{att}) = Fh$.',
      fonte: P(81),
      chiave: true,
      distrattori: [
        { latex: 'Q = \\dfrac{F}{1 + \\dfrac{2e\\,f_{att}}{h}}', errore: 'segno', spiega: 'Con l\'attrito Q deve essere maggiore di F, non minore.', num: (v) => [v.Q, v.F / (1 + (2 * v.e * v.f) / v.h)] },
        { latex: 'Q = \\dfrac{F}{1 - \\dfrac{e\\,f_{att}}{h}}', errore: 'fattore', spiega: 'Gli attriti sono due: compare 2 f_att.', num: (v) => [v.Q, v.F / (1 - (v.e * v.f) / v.h)] },
        { latex: 'Q = F\\left(1 + \\dfrac{2e\\,f_{att}}{h}\\right)', errore: 'concetto', spiega: 'È solo il primo ordine per e f/h piccolo: la forma esatta ha 1 − 2ef/h al denominatore e diverge.', num: (v) => [v.Q, v.F * (1 + (2 * v.e * v.f) / v.h)] },
      ],
      num: (v) => [v.Q, v.F / (1 - (2 * v.e * v.f) / v.h)],
    },
    {
      id: 'd026.8',
      latex: '\\dfrac eh \\to \\dfrac{1}{2f_{att}} \\;\\Rightarrow\\; Q \\to \\infty; \\qquad \\dfrac eh \\ge \\dfrac{1}{2f_{att}}:\\ \\text{impuntamento}',
      perche: 'A $f_{att}$ fissato $Q$ cresce con $e/h$ e diverge quando il denominatore si annulla. Oltre, nessuna forza finita muove il corsoio: è l\'**impuntamento**, il corsoio resta bloccato nella guida. Per evitarlo $e/h$ deve essere il più piccolo possibile.',
      fonte: P(81),
      chiave: true,
      distrattori: [
        { latex: '\\dfrac eh \\to \\dfrac{1}{f_{att}}', errore: 'fattore', spiega: 'Il denominatore è 1 − 2ef/h: si annulla per e/h = 1/(2f).', num: (v) => [1 - (2 * (v.h / v.f) * v.f) / v.h, 0] },
        { latex: '\\text{impuntamento per } \\dfrac eh \\to 0', errore: 'concetto', spiega: 'Con e = 0 la forza è centrata, non c\'è rotazione e Q = F: è il caso migliore.' },
      ],
      num: (v) => [1 - (2 * v.eLim * v.f) / v.h, 0],
    },
  ],
  risultato: { latex: 'Q = \\dfrac{F}{1 - 2e\\,f_{att}/h}, \\qquad \\text{impuntamento per } \\dfrac eh \\ge \\dfrac{1}{2f_{att}}', fonte: P(81) },
  gancio: 'Q eccentrica ⇒ coppia ⇒ normali proporzionali a Q ⇒ attriti proporzionali a Q: se 2 f e/h arriva a 1, l\'attrito cresce quanto la spinta.',
};

// ------------------------------------------------------------------ argomento
export const impuntamento: ArgomentoContenuto = {
  id: 'c2-impuntamento',
  cosaDireSubito:
    'L\'impuntamento è il bloccaggio di un corsoio in una guida prismatica quando la forza di comando è eccentrica. Il gioco fa ruotare il corsoio, che tocca le guide in due spigoli opposti: le normali, e quindi gli attriti, crescono con la forza stessa. Dall\'equilibrio si ottiene Q = F/(1 − 2e f_att/h): per e/h che tende a 1/(2f_att) la forza richiesta va all\'infinito.',
  sistemaIpotesi: [
    'Sistema: corsoio di larghezza a in una guida con gioco, carico F nel centro O, forza di comando Q verso l\'alto a distanza e dall\'asse.',
    'Contatti in A (spigolo superiore sinistro) e B (inferiore destro), a distanza verticale h.',
    'Moto verso l\'alto a velocità costante: attriti verso il basso, F_T = f_att F_N in entrambi.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Corpo libero del corsoio che sale (dispensa p. 80): il gioco lo ruota in senso antiorario, contatti in A e B.',
    fonte: { tipo: 'dispensa', pag: 80, fig: 'corsoio nella guida' },
    elementi: [
      { id: 'guide', testo: 'due guide fisse con gioco, corsoio leggermente ruotato (antiorario)', obbligatorio: true },
      { id: 'carichi', testo: 'carico F in O, forza Q verso l\'alto a distanza e dall\'asse', obbligatorio: true },
      { id: 'contatti', testo: 'contatti A (in alto a sinistra) e B (in basso a destra)', obbligatorio: true },
      { id: 'normali', testo: 'F_NA verso destra, F_NB verso sinistra', obbligatorio: true },
      { id: 'attriti', testo: 'F_TA e F_TB verso il basso (opposti a V)', obbligatorio: true },
      { id: 'quote', testo: 'quote h (A–B in verticale), a (larghezza), e', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\begin{cases} F_{N,A} = F_{N,B} \\\\ Q - F - F_{T,A} - F_{T,B} = 0 \\\\ -F_{N,A}\\frac h2 - F_{N,B}\\frac h2 + F_{T,A}\\frac a2 - F_{T,B}\\frac a2 + Qe = 0 \\end{cases}',
    spiegazione: 'Le tre equazioni della statica del corsoio (momenti rispetto al centro O), con F_T = f_att F_N nei due contatti.',
    fonte: { tipo: 'dispensa', pag: 81 },
  },
  dimostrazioni: ['d026'],
  significato:
    'Non basta spingere di più: con una forza eccentrica le reazioni delle guide sono proporzionali alla spinta, quindi lo sono anche gli attriti, ed esiste un rapporto e/h oltre il quale l\'attrito cresce quanto la spinta. Il progetto deve tenere e/h piccolo: forza vicina all\'asse e contatti lontani (guida lunga), oltre a f piccolo.',
  fraseDaRicordare: 'Q = F/(1 − 2e f_att/h): impuntamento per e/h ≥ 1/(2 f_att).',
  daNonDire: [
    { frase: 'Nell\'equazione dei momenti gli attriti non compaiono perché sono piccoli.', perche: 'Compaiono, ma si elidono: sono uguali e hanno bracci opposti ±a/2 rispetto a O.', fonte: { tipo: 'dispensa', pag: 81 } },
    { frase: 'Il corsoio si impunta quando l\'angolo della risultante supera φ.', perche: 'È la costruzione di d026, che la dispensa non fa: la dispensa ricava Q = F/(1 − 2ef/h) dall\'equilibrio (NF-42).', fonte: { tipo: 'dispensa', pag: 81 } },
    { frase: 'Basta aumentare Q per sbloccarlo.', perche: 'Oltre il limite le normali crescono con Q e l\'attrito cresce quanto la spinta: nessuna Q finita basta.', fonte: { tipo: 'dispensa', pag: 81 } },
    { frase: 'Q = F (1 + 2ef/h).', perche: 'È solo lo sviluppo al primo ordine: la forma esatta diverge, ed è proprio questo l\'impuntamento.', fonte: { tipo: 'dispensa', pag: 81 } },
    { frase: 'Conta la larghezza a del corsoio.', perche: 'Nel risultato a sparisce: contano e e la distanza h tra i contatti.', fonte: { tipo: 'dispensa', pag: 81 } },
  ],
  approfondimenti: [
    {
      domanda: 'Perché il corsoio tocca le guide solo in due punti, e proprio in quelli?',
      tipo: 'approfondimento',
      attesa: 'Q (verso l\'alto, a destra dell\'asse) e F (verso il basso, nell\'asse) formano una coppia antioraria; con il gioco il corsoio ruota e appoggia lo spigolo superiore sinistro sulla guida sinistra e quello inferiore destro sulla guida destra.',
      fonte: { tipo: 'dispensa', pag: 80 },
    },
    {
      domanda: 'Come lo eviti in progetto?',
      tipo: 'approfondimento',
      attesa: 'Tenendo e/h il più piccolo possibile: forza applicata vicino all\'asse della guida e contatti lontani, cioè corsoio (o guida) lungo; aiuta anche un coefficiente d\'attrito basso.',
      fonte: { tipo: 'dispensa', pag: 81 },
    },
    {
      domanda: 'Allo spunto, partendo da fermo, il limite cambia?',
      tipo: 'approfondimento',
      attesa: 'Da fermo vale l\'aderenza: al distacco gli attriti arrivano a f_ad F_N, quindi Q = F/(1 − 2e f_ad/h) e il limite e/h = 1/(2 f_ad) è più basso. Allo spunto l\'impuntamento è più facile che a corsoio in moto.',
      fonte: { tipo: 'deduzione', da: 'pp. 69, 81', spiegazione: 'stessa catena con f_ad al posto di f_att (f_ad > f_att), NF-132' },
    },
    {
      domanda: 'Cosa succede fisicamente quando ti avvicini al limite?',
      tipo: 'approfondimento',
      attesa: 'È una retroazione positiva: più Q, più momento, più normali, più attrito, più Q richiesta. Il fattore 1/(1 − 2ef/h) misura quanto la geometria amplifica l\'attrito.',
      fonte: { tipo: 'deduzione', da: 'p. 81', spiegazione: 'lettura di −F_N h + Q e = 0 insieme all\'equilibrio verticale' },
    },
    {
      domanda: 'E se Q fosse applicata dall\'altra parte dell\'asse?',
      tipo: 'approfondimento',
      attesa: 'La coppia cambia verso, il corsoio ruota al contrario e tocca negli altri due spigoli; per simmetria il risultato è lo stesso con |e|.',
      fonte: { tipo: 'deduzione', da: 'p. 80', spiegazione: 'figura speculare rispetto all\'asse della guida' },
    },
    {
      domanda: 'Dove trovi una coppia prismatica simile nei meccanismi?',
      tipo: 'collegamento',
      argomento: 'c1-manovellismo',
      attesa: 'Nel manovellismo di spinta il pistone nella guida riceve dalla biella una forza inclinata di γ, con una componente normale alla guida: con attrito nella coppia prismatica nasce una resistenza f·N, e un pistone corto rispetto all\'eccentricità dei carichi può impuntarsi.',
      fonte: { tipo: 'deduzione', da: 'pp. 47–49 e 80–81', spiegazione: 'la dispensa tratta la statica del manovellismo senza attrito: l\'estensione è un collegamento' },
    },
    {
      domanda: 'Che legge d\'attrito hai usato nei contatti?',
      tipo: 'collegamento',
      argomento: 'c2-attrito',
      attesa: 'Strisciamento: F_T = f_att F_N, opposta alla velocità relativa (il corsoio sale, quindi attriti verso il basso).',
      fonte: { tipo: 'dispensa', pag: 69 },
    },
  ],
  simboli: [
    { simbolo: 'F', significato: 'carico sul corsoio, applicato nel centro O' },
    { simbolo: 'Q', significato: 'forza di comando (sollevamento)', altrove: 'in q18 Q è la risultante nel perno; nei cuscinetti è il carico radiale' },
    { simbolo: 'e', significato: 'eccentricità di Q rispetto all\'asse' },
    { simbolo: 'h', significato: 'distanza verticale tra i contatti A e B' },
    { simbolo: 'a', significato: 'larghezza del corsoio (distanza tra le guide)', altrove: 'nella dinamica del veicolo a è l\'accelerazione' },
    { simbolo: 'f_{att}', significato: 'coefficiente di attrito nei contatti', altrove: 'μ in q34' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c2-impuntamento' }],
  previsioni: [
    {
      id: 'c2-imp-limite',
      domanda: 'Con f_att = 0,25 e Q applicata a e = 1,8 h dall\'asse, il corsoio…',
      opzioni: ['sale con Q ≈ 10 F', 'sale con Q ≈ 1,9 F', 'si impunta: nessuna Q finita basta', 'sale con Q = F'],
      corretta: 0,
      spiega: 'Il limite è e/h = 1/(2·0,25) = 2: a 1,8 non è ancora impuntato, ma Q = F/(1 − 0,9) = 10 F.',
      verify: () => {
        const r = imp({ F: 1, e: 1.8, h: 1, f: 0.25 });
        return r.bloccato ? 2 : Math.abs(r.Q - 10) < 1e-9 ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c2-impuntamento' },
    },
    {
      id: 'c2-imp-h',
      domanda: 'A parità di e e di f, si raddoppia la distanza h tra i contatti (guida più lunga). La forza Q…',
      opzioni: ['raddoppia', 'diminuisce e si avvicina a F', 'resta uguale', 'aumenta'],
      corretta: 1,
      spiega: 'Q = F/(1 − 2ef/h): con h più grande il denominatore si avvicina a 1.',
      verify: () => {
        const a = imp({ F: 1, e: 0.5, h: 1, f: 0.3 }).Q, b = imp({ F: 1, e: 0.5, h: 2, f: 0.3 }).Q;
        return b < a && b > 1 ? 1 : b > a ? 3 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c2-impuntamento' },
    },
  ],
  nf: ['NF-42', 'NF-132'],
};
