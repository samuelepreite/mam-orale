/**
 * C2 · Attrito radente e aderenza, cono d'aderenza (domanda q32). Dispensa pp. 67–79 (LaTeX).
 * Dimostrazione d024 (aderenza, attrito, angolo e cono d'aderenza, piano inclinato).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { pianoInclinato } from '../../engine/c2';
import { angle, arrow, dim, dot, ground, line, poly, svg, text } from '../svg';

// ------------------------------------------------------------------ disegno (figura di p. 74)
function disegno() {
  const y0 = 200; // piano
  const bx = 80, bw = 170, bh = 90; // blocco
  const cx = bx + bw / 2 + 32; // contatto (normale spostata di b verso destra)
  const phi = 32; // semiapertura del cono (gradi)
  const al = 22; // inclinazione della risultante
  const L = 92;
  const rad = (d: number) => (d * Math.PI) / 180;
  return svg(420, 300, [
    ground(20, y0, 400, y0),
    poly([[bx, y0], [bx + bw, y0], [bx + bw, y0 - bh], [bx, y0 - bh]], 'soft', true),
    poly([[bx, y0], [bx + bw, y0], [bx + bw, y0 - bh], [bx, y0 - bh]], 'l', true),
    dot(bx + bw / 2, y0 - bh / 2, 'G', 10, -8),
    arrow(bx + bw / 2, y0 - bh / 2, bx + bw / 2, y0 - bh / 2 + 32, 'f', 'Mg', 18, -4),
    arrow(bx - 70, y0 - bh, bx, y0 - bh, 'f', 'F', -36, -12),
    dim(bx - 14, y0, bx - 14, y0 - bh, 'h', 10),
    // cono d'aderenza sotto il contatto
    line(cx, y0, cx - L * 1.15 * Math.sin(rad(phi)), y0 + L * 1.15 * Math.cos(rad(phi)) * 0.9, 'd'),
    line(cx, y0, cx + L * 1.15 * Math.sin(rad(phi)), y0 + L * 1.15 * Math.cos(rad(phi)) * 0.9, 'd'),
    angle(cx, y0, 62, -90 - phi, -90, 'φ_ad'),
    // reazioni
    arrow(cx, y0 + L, cx, y0, 'f'),
    text(cx - 14, y0 + L - 4, 'F_N', { c: 'f', anchor: 'end' }),
    arrow(cx + 60, y0 - 4, cx - 4, y0 - 4, 'f'),
    text(cx + 72, y0 - 14, 'F_T', { c: 'f' }),
    arrow(cx + L * Math.sin(rad(al)), y0 + L * Math.cos(rad(al)), cx, y0, 'a'),
    text(cx + L * Math.sin(rad(al)) + 10, y0 + L * Math.cos(rad(al)) - 6, 'R', { c: 'a' }),
    angle(cx, y0, 40, -90, -90 + al, 'α', 'a'),
    line(bx + bw / 2, y0 + 8, bx + bw / 2, y0 + 24, 'm', 1),
    dim(bx + bw / 2, y0 + 18, cx, y0 + 18, 'b', 2),
    text(330, 250, 'aderenza: α ≤ φ_ad', { c: 'a', size: 13 }),
  ], 'Corpo appoggiato con forza F: reazioni F_N e F_T, risultante R inclinata di α, cono d\'aderenza di semiapertura φ_ad');
}

// ------------------------------------------------------------------ dimostrazione d024
const g = 9.81;

export const d024: Dimostrazione = {
  id: 'd024',
  titolo: 'Aderenza e attrito: angolo e cono d\'aderenza',
  enunciato:
    'Per un corpo appoggiato su un piano e spinto da una forza tangenziale, ricavare la condizione di aderenza in termini di forze e di inclinazione della risultante di contatto (cono d\'aderenza), distinguere il caso di strisciamento e applicarla al piano inclinato.',
  ipotesi: [
    'corpo rigido su piano rigido; le pressioni di contatto sono rappresentate dalle risultanti F_N (normale) e F_T (tangenziale)',
    'modello di Coulomb: F_ad ≤ f_ad F_N in aderenza, F_att = f_att F_N in strisciamento, con f_att < f_ad',
    'piano inclinato: corpo fermo o in moto con F_N costante (niente distacco)',
  ],
  sample: (rnd) => {
    const M = U(rnd, 1, 50), fad = U(rnd, 0.3, 0.9), fatt = fad * U(rnd, 0.5, 0.9);
    const FN = M * g, F = fad * FN * U(rnd, 0.1, 0.9), FT = F;
    const alphaP = U(rnd, 0.05, 1.2);
    return {
      M, g, fad, fatt, FN, F, FT, alphaR: Math.atan2(FT, FN), phiAd: Math.atan(fad), phiAtt: Math.atan(fatt),
      FTlim: fad * FN, FTatt: fatt * FN, alphaP, FNp: M * g * Math.cos(alphaP), FTp: M * g * Math.sin(alphaP),
    };
  },
  passi: [
    {
      id: 'd024.1',
      latex: '\\vec F_N = -M\\vec g, \\qquad \\vec F_T = -\\vec F',
      perche: 'Equilibrio statico del corpo fermo: in verticale la reazione normale bilancia il peso; in orizzontale deve esistere una forza di contatto uguale e contraria a $\\vec F$, la **forza di aderenza**. Non è data a priori: è una reazione vincolare che vale quanto serve all\'equilibrio.',
      fonte: { tipo: 'dispensa', pag: [67, 68] },
      distrattori: [],
      num: (v) => [v.FN, v.M * v.g],
    },
    {
      id: 'd024.2',
      latex: 'F_T = F_{ad} \\le F_{ad,max} = f_{ad}\\,F_N',
      perche: 'Le asperità delle due superfici si compenetrano e reggono la forza tangenziale finché non si rompono o deformano: il massimo che possono reggere è proporzionale alla normale, con il **coefficiente di aderenza** $f_{ad}$ (dipende dalla rugosità). Finché il corpo non si muove vale solo la disuguaglianza.',
      fonte: { tipo: 'dispensa', pag: 69 },
      chiave: true,
      distrattori: [
        { latex: 'F_{ad} = f_{ad}\\,F_N \\ \\text{sempre}', errore: 'concetto', spiega: 'In aderenza F_ad è una reazione: vale f_ad F_N solo al limite (incipiente scorrimento). Prima è minore.', num: (v) => [v.FT, v.fad * v.FN] },
        { latex: 'F_{ad,max} = f_{att}\\,F_N', errore: 'indice', spiega: 'f_att è il coefficiente di attrito (strisciamento), più piccolo: il limite dell\'aderenza usa f_ad.', num: (v) => [v.FTlim, v.fatt * v.FN] },
      ],
    },
    {
      id: 'd024.3',
      latex: 'F > f_{ad}F_N \\;\\Rightarrow\\; F_{att} = f_{att}\\,F_N, \\quad \\vec F_{att} \\parallel -\\vec v_{rel}, \\quad f_{att} < f_{ad}',
      perche: 'Superato il limite le asperità cedono e nasce il moto relativo, con micro usura: è la condizione di **attrito**. Il modulo è fissato dal coefficiente di attrito $f_{att}$ (materiali, usura, stato delle superfici), minore di $f_{ad}$; la direzione è quella della velocità relativa, il verso opposto.',
      fonte: { tipo: 'dispensa', pag: 69 },
      distrattori: [
        { latex: 'F_{att} = f_{att}\\,F_N \\ \\text{concorde con } \\vec v_{rel}', errore: 'segno', spiega: 'La forza di attrito si oppone sempre al moto relativo.' },
      ],
    },
    {
      id: 'd024.4',
      latex: '\\vec R = \\vec F_N + \\vec F_T, \\qquad \\tan\\alpha = \\dfrac{F_T}{F_N}',
      perche: 'Metodo alternativo: si somma la normale con la tangenziale. La risultante di contatto è inclinata rispetto alla normale di un angolo $\\alpha$; poiché $F_N = Mg$ resta costante, al crescere di $F$ cresce $F_T$ e quindi $\\alpha$.',
      fonte: { tipo: 'dispensa', pag: 73 },
      distrattori: [
        { latex: '\\tan\\alpha = \\dfrac{F_N}{F_T}', errore: 'indice', spiega: 'α si misura dalla normale: il cateto opposto è F_T.', num: (v) => [Math.tan(v.alphaR), v.FN / v.FT] },
      ],
      num: (v) => [Math.tan(v.alphaR), v.FT / v.FN],
    },
    {
      id: 'd024.5',
      latex: 'F_T = f_{ad}F_N \\;\\Rightarrow\\; \\alpha = \\tan^{-1}\\dfrac{F_{ad,max}}{F_N} = \\tan^{-1} f_{ad} = \\varphi_{ad}',
      perche: 'Al limite di aderenza la risultante raggiunge l\'inclinazione massima: è l\'**angolo di aderenza** $\\varphi_{ad}$, che dipende solo dal coefficiente, non dai carichi.',
      fonte: { tipo: 'dispensa', pag: 73 },
      chiave: true,
      distrattori: [
        { latex: '\\varphi_{ad} = \\sin^{-1} f_{ad}', errore: 'concetto', spiega: 'f_ad è il rapporto F_T/F_N, cioè la tangente dell\'angolo, non il seno (che sarebbe F_T/R).', num: (v) => [Math.atan(v.FTlim / v.FN), Math.asin(v.fad)] },
        { latex: '\\varphi_{ad} = \\tan^{-1}\\dfrac{1}{f_{ad}}', errore: 'indice', spiega: 'Questo è l\'angolo della risultante misurato dal piano, non dalla normale.', num: (v) => [Math.atan(v.FTlim / v.FN), Math.atan(1 / v.fad)] },
      ],
      num: (v) => [Math.atan(v.FTlim / v.FN), v.phiAd],
    },
    {
      id: 'd024.6',
      latex: '\\text{aderenza} \\iff \\alpha \\le \\varphi_{ad} = \\tan^{-1} f_{ad}',
      perche: 'La tangente è crescente, quindi $F_T \\le f_{ad}F_N$ equivale a $\\alpha \\le \\varphi_{ad}$: la risultante di contatto deve stare **dentro il cono d\'aderenza**, il cono con asse la normale e semiapertura $\\varphi_{ad}$. Sulla superficie del cono si è in incipiente scorrimento; una risultante richiesta fuori dal cono è impossibile in aderenza.',
      fonte: { tipo: 'dispensa', pag: 74 },
      chiave: true,
      distrattori: [
        { latex: '\\text{aderenza} \\iff \\alpha \\ge \\varphi_{ad}', errore: 'segno', spiega: 'Più la risultante è inclinata, più tangenziale si chiede: l\'aderenza tiene per angoli piccoli.' },
        { latex: '\\text{aderenza} \\iff \\alpha \\le \\varphi_{att}', errore: 'indice', spiega: 'In statica conta il cono d\'aderenza (f_ad); φ_att è l\'inclinazione della risultante durante lo strisciamento.' },
      ],
    },
    {
      id: 'd024.7',
      latex: '\\text{strisciamento:}\\ \\alpha = \\tan^{-1}\\dfrac{F_{att}}{F_N} = \\tan^{-1} f_{att} = \\varphi_{att} < \\varphi_{ad}',
      perche: 'In condizioni di attrito la tangenziale non è più una reazione libera: vale $f_{att}F_N$, quindi la risultante ha un\'inclinazione fissa, l\'**angolo di attrito**, più piccola di $\\varphi_{ad}$ perché $f_{att} < f_{ad}$.',
      fonte: { tipo: 'dispensa', pag: 74 },
      distrattori: [
        { latex: '\\text{strisciamento:}\\ \\alpha = \\varphi_{ad}', errore: 'indice', spiega: 'φ_ad è l\'inclinazione limite in aderenza; quando il corpo striscia la risultante si inclina di φ_att.', num: (v) => [Math.atan(v.FTatt / v.FN), v.phiAd] },
      ],
      num: (v) => [Math.atan(v.FTatt / v.FN), v.phiAtt],
    },
    {
      id: 'd024.8',
      latex: 'F_N = Mg\\cos\\alpha,\\ \\ F_{ad} = Mg\\sin\\alpha \\;\\Rightarrow\\; Mg\\sin\\alpha \\le f_{ad}Mg\\cos\\alpha \\iff \\tan\\alpha \\le f_{ad}',
      perche: 'Piano inclinato di $\\alpha$, assi normale ($x$) e lungo il piano ($y$): l\'equilibrio dà normale e aderenza, e la condizione di aderenza diventa $\\alpha \\le \\tan^{-1} f_{ad}$. Lettura col cono: la risultante di contatto è verticale (bilancia il peso) e forma con la normale proprio l\'angolo $\\alpha$ del piano, quindi il corpo resta fermo finché $\\alpha \\le \\varphi_{ad}$.',
      fonte: { tipo: 'dispensa', pag: [70, 71] },
      chiave: true,
      distrattori: [
        { latex: '\\tan\\alpha \\le f_{att}', errore: 'indice', spiega: 'Per restare fermo conta l\'aderenza: f_ad.', num: (v) => [v.FTp / v.FNp, v.fatt] },
        { latex: '\\sin\\alpha \\le f_{ad}', errore: 'termine-perso', spiega: 'La normale non è Mg ma Mg cos α: dividendo resta la tangente.', num: (v) => [v.FTp / v.FNp, Math.sin(v.alphaP)] },
      ],
      num: (v) => [v.FTp / v.FNp, Math.tan(v.alphaP)],
    },
    {
      id: 'd024.9',
      latex: '\\tan\\alpha > f_{ad}:\\quad F_{att} - Mg\\sin\\alpha = Ma_y \\;\\Rightarrow\\; a_y = g\\,(f_{att}\\cos\\alpha - \\sin\\alpha)',
      perche: 'Se il piano è più ripido il corpo scivola verso il basso: l\'attrito, opposto alla velocità, è diretto verso l\'alto lungo il piano e vale $f_{att}F_N = f_{att}Mg\\cos\\alpha$. L\'accelerazione lungo $y$ (verso l\'alto) è negativa: il corpo accelera verso il basso.',
      fonte: { tipo: 'dispensa', pag: 71 },
      distrattori: [
        { latex: 'a_y = g\\,(f_{ad}\\cos\\alpha - \\sin\\alpha)', errore: 'indice', spiega: 'In moto si usa f_att.', num: (v) => [(v.fatt * v.FNp - v.FTp) / v.M, v.g * (v.fad * Math.cos(v.alphaP) - Math.sin(v.alphaP))] },
        { latex: 'a_y = g\\,(f_{att}\\sin\\alpha - \\cos\\alpha)', errore: 'indice', spiega: 'La normale (e quindi l\'attrito) va con cos α, la componente del peso lungo il piano con sin α.', num: (v) => [(v.fatt * v.FNp - v.FTp) / v.M, v.g * (v.fatt * Math.sin(v.alphaP) - Math.cos(v.alphaP))] },
      ],
      num: (v) => [(v.fatt * v.FNp - v.FTp) / v.M, v.g * (v.fatt * Math.cos(v.alphaP) - Math.sin(v.alphaP))],
    },
  ],
  risultato: { latex: 'F_T \\le f_{ad}F_N \\iff \\alpha \\le \\varphi_{ad} = \\tan^{-1} f_{ad}; \\qquad \\text{strisciamento: } \\alpha = \\varphi_{att} = \\tan^{-1} f_{att}', fonte: { tipo: 'dispensa', pag: [69, 74] } },
  gancio: 'In aderenza la tangenziale è una reazione che vale «quanto serve», fino a f_ad F_N: la risultante sta nel cono di semiapertura atan f_ad.',
};

// ------------------------------------------------------------------ argomento
export const attrito: ArgomentoContenuto = {
  id: 'c2-attrito',
  cosaDireSubito:
    'Quando due corpi a contatto non hanno moto relativo, la forza tangenziale è una reazione di aderenza: vale quanto serve all\'equilibrio, fino al massimo f_ad F_N. Superato il limite le asperità cedono, nasce lo strisciamento e la forza diventa di attrito, f_att F_N, opposta alla velocità relativa, con f_att < f_ad. Graficamente: aderenza se la risultante di contatto sta dentro il cono d\'aderenza di semiapertura φ_ad = atan f_ad.',
  sistemaIpotesi: [
    'Sistema: corpo di massa M appoggiato su un piano, forza F applicata allo spigolo superiore a quota h.',
    'Contatto rappresentato dalle risultanti F_N e F_T; la normale si sposta di b = Fh/(Mg) per l\'equilibrio alla rotazione.',
    'Modello di Coulomb: f_ad (aderenza) e f_att (attrito) costanti, f_att < f_ad.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Corpo appoggiato spinto da F (dispensa p. 74): F_N spostata di b, F_T opposta a F, risultante R inclinata di α; il cono d\'aderenza ha semiapertura φ_ad.',
    fonte: { tipo: 'dispensa', pag: 74, fig: 'cono d\'aderenza' },
    elementi: [
      { id: 'corpo', testo: 'corpo sul piano, baricentro G, peso Mg', obbligatorio: true },
      { id: 'F', testo: 'forza F allo spigolo superiore, quota h', obbligatorio: true },
      { id: 'FN', testo: 'normale F_N spostata di b dalla verticale di G (verso il lato opposto a F)', obbligatorio: true },
      { id: 'FT', testo: 'forza tangenziale di aderenza F_T opposta a F', obbligatorio: true },
      { id: 'R', testo: 'risultante R = F_N + F_T inclinata di α dalla normale', obbligatorio: true },
      { id: 'cono', testo: 'cono d\'aderenza con asse la normale e semiapertura φ_ad', obbligatorio: true },
      { id: 'pressioni', testo: 'distribuzione di pressione non uniforme, più alta verso il lato di F_N', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'F_{ad} \\le F_{ad,max} = f_{ad}F_N, \\qquad F_{att} = f_{att}F_N',
    spiegazione: 'Le due leggi della dispensa: in aderenza una disuguaglianza (reazione libera fino al limite), in attrito un\'uguaglianza (modulo fissato, verso opposto alla velocità relativa).',
    fonte: { tipo: 'dispensa', pag: 69 },
  },
  dimostrazioni: ['d024'],
  significato:
    'Il coefficiente d\'aderenza non dice quanto vale la forza tangenziale, ma fin dove può arrivare: per sapere se un corpo resta fermo si calcola la tangenziale che serve all\'equilibrio e la si confronta con f_ad F_N, oppure si guarda se la risultante cade nel cono. Il cono rende grafici problemi come la scala appoggiata al muro.',
  fraseDaRicordare: 'In aderenza F_T ≤ f_ad F_N e la risultante sta nel cono di semiapertura atan f_ad; in strisciamento F_T = f_att F_N.',
  daNonDire: [
    { frase: 'La forza di aderenza vale f_ad F_N.', perche: 'Solo al limite. Prima è una reazione che vale quanto serve all\'equilibrio (F_T = F).', fonte: { tipo: 'dispensa', pag: 69 } },
    { frase: 'Il coefficiente d\'attrito e quello d\'aderenza sono lo stesso.', perche: 'La dispensa li distingue: f_att < f_ad (tabella: acciaio/acciaio 0,1–0,5 contro 0,6–0,8).', fonte: { tipo: 'dispensa', pag: [69, 70] } },
    { frase: 'L\'angolo d\'aderenza è arcsin f.', perche: 'È l\'arcotangente: tan φ_ad = F_ad,max/F_N = f_ad.', fonte: { tipo: 'dispensa', pag: 73 } },
    { frase: 'Il corpo sul piano inclinato scivola quando tan α supera f_att.', perche: 'Il distacco dall\'aderenza si ha per tan α > f_ad; f_att serve per l\'accelerazione una volta in moto.', fonte: { tipo: 'dispensa', pag: 71 } },
    { frase: 'Le leggi di Coulomb e le microgiunzioni sono nella dispensa.', perche: 'Non ci sono (NF-07): la dispensa parla di asperità che si compenetrano e si rompono. Se le citi, dillo come completamento.', fonte: { tipo: 'dispensa', pag: [68, 69] } },
  ],
  approfondimenti: [
    {
      domanda: 'Che succede alla normale quando spingi il corpo con F applicata in alto?',
      tipo: 'approfondimento',
      attesa: 'F e F_T formano una coppia di braccio h: per l\'equilibrio alla rotazione F_N si sposta di b = Fh/(Mg) verso il lato opposto e la pressione non è più uniforme, più alta da quella parte.',
      fonte: { tipo: 'dispensa', pag: 68 },
    },
    {
      domanda: 'Ruota su un piano con F orizzontale nella sommità: che verso ha l\'aderenza e quando striscia?',
      tipo: 'approfondimento',
      attesa: 'Dalle due equazioni della dinamica con a_G = −ω̇R: F_ad = F (MR² − I_G)/(MR² + I_G), concorde con F perché I_G < MR²; rotola senza strisciare se F ≤ f_ad Mg (MR² + I_G)/(MR² − I_G). Per un disco F_ad = F/3.',
      fonte: { tipo: 'dispensa', pag: [72, 73] },
    },
    {
      domanda: 'Scala appoggiata al muro: quando può stare in equilibrio?',
      tipo: 'approfondimento',
      attesa: 'Tre forze: devono concorrere. Muro con aderenza e pavimento liscio: F_A verticale e il peso sono paralleli, F_B inclinata al più di φ_ad: impossibile. Pavimento con aderenza e muro liscio: F_B orizzontale e il peso si incontrano in P, F_A va lungo AP ed è possibile se AP cade nel cono in A. Aderenza in entrambi: iperstatico, infiniti equilibri sul segmento CD.',
      fonte: { tipo: 'dispensa', pag: [75, 76] },
    },
    {
      domanda: 'Nel cuneo, come scegli il verso delle forze d\'attrito?',
      tipo: 'approfondimento',
      attesa: 'Opposte al moto relativo: il cuneo scende rispetto al corpo 2, quindi su 1 l\'attrito è verso l\'alto e su 2 verso il basso. Con l\'equilibrio dei due corpi si ottiene F₁ = (f\'Mg + F₂)[cos α(f″ + f‴) + sin α(1 − f″f‴)]/[(1 − f\'f″)cos α − (f\' + f″)sin α].',
      fonte: { tipo: 'dispensa', pag: [77, 79] },
    },
    {
      domanda: 'Che cosa sono le leggi di Coulomb dell\'attrito?',
      tipo: 'approfondimento',
      attesa: 'Nel modello ideale di attrito secco il coefficiente è indipendente dalla pressione normale, dall\'area apparente di contatto e (in prima approssimazione) dalla velocità di strisciamento; il contatto reale avviene su un\'area molto minore dell\'apparente. La dispensa non le enuncia.',
      fonte: { tipo: 'esterna', ref: 'trattazione classica dell\'attrito secco (leggi di Amontons–Coulomb)', nota: 'chiesto da q32, assente nella dispensa (NF-07)' },
    },
    {
      domanda: 'Dove ritrovi il cono quando il contatto è un perno che ruota?',
      tipo: 'collegamento',
      argomento: 'c2-perno',
      attesa: 'Nel perno la risultante di contatto è inclinata di φ_att rispetto alla normale (che passa per il centro): la sua retta d\'azione è tangente al cerchio d\'attrito di raggio R sin φ_att.',
      fonte: { tipo: 'dispensa', pag: [82, 83] },
    },
    {
      domanda: 'E nell\'impuntamento, che ruolo ha l\'attrito?',
      tipo: 'collegamento',
      argomento: 'c2-impuntamento',
      attesa: 'La forza eccentrica fa ruotare il corsoio nel gioco: due contatti con normali che crescono con Q, quindi attriti che crescono con Q; per e/h ≥ 1/(2f_att) non c\'è forza finita che lo muova.',
      fonte: { tipo: 'dispensa', pag: [80, 81] },
    },
    {
      domanda: 'Quale legge d\'attrito usi per la cinghia sulla puleggia?',
      tipo: 'collegamento',
      argomento: 'c4-eulero',
      attesa: 'La stessa, sul concio di cinghia: dove la cinghia striscia dT = f dF_N, da cui l\'esponenziale di Eulero; nell\'arco di aderenza la tensione resta costante.',
      fonte: { tipo: 'dispensa', pag: [140, 142] },
    },
  ],
  simboli: [
    { simbolo: 'f_{ad}', significato: 'coefficiente di aderenza', altrove: 'f_s nella tabella di p. 70; μ nelle pagine manoscritte; μ_s nelle domande' },
    { simbolo: 'f_{att}', significato: 'coefficiente di attrito (strisciamento)', altrove: 'f_d nella tabella; μ_d nelle domande' },
    { simbolo: 'F_N,\\ F_T', significato: 'reazione normale e tangenziale; F_ad in aderenza, F_att in strisciamento', altrove: 'N, T nelle domande' },
    { simbolo: '\\varphi_{ad},\\ \\varphi_{att}', significato: 'angolo di aderenza atan f_ad e angolo di attrito atan f_att', altrove: 'φ (unico) nelle domande' },
    { simbolo: '\\alpha', significato: 'inclinazione della risultante dalla normale; nel piano inclinato è anche l\'angolo del piano' },
    { simbolo: 'b', significato: 'spostamento della normale per la forza F (p. 68)', altrove: 'q33 chiama b la larghezza della base' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c2-cono' }],
  previsioni: [
    {
      id: 'c2-cono-piano',
      domanda: 'Un corpo è fermo su un piano inclinato di 25° con f_ad = 0,5 e f_att = 0,4. Si porta il piano a 28°: che succede?',
      opzioni: ['resta fermo', 'scivola con accelerazione costante', 'scivola solo se si aumenta il peso', 'resta fermo perché f_att < f_ad'],
      corretta: 1,
      spiega: 'φ_ad = atan 0,5 = 26,6°: a 25° la risultante è nel cono, a 28° ne esce e il corpo scivola. In moto vale f_att: a_y = g(0,4 cos 28° − sin 28°) ≈ −1,14 m/s², costante.',
      verify: () => {
        const r = pianoInclinato({ M: 10, alpha: (28 * Math.PI) / 180, fad: 0.5, fatt: 0.4 });
        return r.aderenza ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c2-cono' },
    },
    {
      id: 'c2-cono-massa',
      domanda: 'Sullo stesso piano (fermo, in aderenza) raddoppi la massa del corpo. L\'angolo limite oltre il quale scivola…',
      opzioni: ['raddoppia', 'resta uguale', 'si dimezza', 'diventa atan(2 f_ad)'],
      corretta: 1,
      spiega: 'La condizione è tan α ≤ f_ad: la massa si semplifica (peso e normale crescono insieme).',
      verify: () => {
        const lim = (M: number) => {
          let lo = 0, hi = Math.PI / 2 - 1e-6;
          for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (pianoInclinato({ M, alpha: m, fad: 0.5, fatt: 0.4 }).aderenza) lo = m; else hi = m; }
          return lo;
        };
        return Math.abs(lim(10) - lim(20)) < 1e-9 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c2-cono' },
    },
  ],
  nf: ['NF-07', 'NF-08', 'NF-129', 'NF-130', 'NF-131'],
};
