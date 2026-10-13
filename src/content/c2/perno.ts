/**
 * C2 · Attrito perno–boccola e cerchio d'attrito (domanda q18). Dispensa pp. 81–83 (§2.2.5, LaTeX).
 * Dimostrazione d025.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { perno as pernoEng } from '../../engine/c2';
import { angle, arrow, circle, dot, line, rot, svg, text } from '../svg';

// ------------------------------------------------------------------ disegno (figura di p. 83)
function disegno() {
  const cx = 190, cy = 135, R = 82;
  const phi = 28, rad = (phi * Math.PI) / 180;
  const Px = cx + R * Math.sin(rad), Py = cy + R * Math.cos(rad); // contatto in basso a destra (y verso il basso)
  const rs = R * Math.sin(rad);
  const tx = Math.cos(rad), ty = -Math.sin(rad); // tangente verso l'alto-destra
  return svg(400, 280, [
    circle(cx, cy, R + 7, 'g'),
    circle(cx, cy, R, 'l'),
    circle(cx, cy, rs, 'd'),
    text(cx - rs - 6, cy - 14, 'r*', { c: 'm', anchor: 'end', size: 13 }),
    line(cx, cy + 44, cx, cy + R + 20, 'm', 1),
    line(cx, cy, Px, Py, 'm', 1),
    angle(cx, cy, 30, -90, -90 + phi, 'φ'),
    dot(cx, cy, 'O', -12, -10),
    arrow(cx, cy, cx, cy + 40, 'f', 'F', -16, -6),
    rot(cx, cy, 44, 160, 115, 'v', 'ω'),
    // retta d'azione della risultante: verticale per P, tangente al cerchio d'attrito
    line(Px, Py + 16, Px, cy - R - 20, 'd'),
    dot(Px, Py, 'P', -12, -8),
    arrow(Px, Py, Px, Py - 70, 'a', 'R_P', 18, 4),
    arrow(Px + (Px - cx) * 0.55, Py + (Py - cy) * 0.55, Px, Py, 'f'),
    text(Px + (Px - cx) * 0.55 + 16, Py + (Py - cy) * 0.55 + 4, 'R_N', { c: 'f', anchor: 'start' }),
    arrow(Px, Py, Px + 44 * tx, Py + 44 * ty, 'f', 'R_T', 20, 4),
    arrow(Px - 14, Py + 12, Px - 14 - 44 * tx, Py + 12 - 44 * ty, 'v', 'v_P', -18, 10),
    text(320, 40, 'r* = R sin φ_att', { c: 'a', size: 13 }),
  ], 'Perno nella boccola con ω oraria: contatto P salito a destra, risultante R_P verticale tangente al cerchio d\'attrito di raggio r*');
}

// ------------------------------------------------------------------ dimostrazione d025
const P = (pag: number | [number, number]) => ({ tipo: 'dispensa', pag }) as const;

export const d025: Dimostrazione = {
  id: 'd025',
  titolo: 'Perno–boccola: cerchio d\'attrito e momento resistente',
  enunciato: 'Per un perno di raggio R caricato da F e ruotante in una boccola con gioco, trovare dove si porta il contatto, la retta d\'azione della reazione e il momento resistente dovuto all\'attrito.',
  ipotesi: [
    'gioco tra perno e boccola: contatto in un solo punto P',
    'perno in rotazione: strisciamento in P, R_T = f_att R_N (angolo di attrito φ_att = atan f_att)',
    'regime: forze d\'inerzia trascurabili, il perno è in equilibrio sotto F e la reazione di contatto',
  ],
  sample: (rnd) => {
    const F = U(rnd, 100, 5000), R = U(rnd, 0.01, 0.1), f = U(rnd, 0.05, 0.4);
    const phi = Math.atan(f), RN = F * Math.cos(phi), RT = f * RN;
    return { F, R, f, phi, RN, RT, rStar: R * Math.sin(phi), xP: R * Math.sin(phi), yP: -R * Math.cos(phi) };
  },
  passi: [
    {
      id: 'd025.1',
      latex: '\\omega = 0:\\quad \\vec R_N = -\\vec F \\ \\text{(passa per } O\\text{)}',
      perche: 'Perno fermo: il carico lo spinge sul fondo della boccola e la reazione normale nel contatto più basso è uguale e contraria a $F$, sulla stessa retta: nessun momento.',
      fonte: P(81),
      distrattori: [],
      num: (v) => [v.F, v.F],
    },
    {
      id: 'd025.2',
      latex: '\\omega\\ \\text{oraria:}\\ \\vec v_P \\leftarrow \\;\\Rightarrow\\; \\vec R_T \\rightarrow, \\qquad R_T = f_{att}\\,R_N',
      perche: 'Con il perno che ruota, il suo punto di contatto ha velocità $v_P$ (verso sinistra nel punto più basso, con $\\omega$ oraria): nasce una forza di attrito di strisciamento opposta, verso destra, di modulo $f_{att}R_N$.',
      fonte: P(82),
      distrattori: [
        { latex: 'R_T \\le f_{ad}\\,R_N', errore: 'concetto', spiega: 'Il perno striscia sulla boccola: è attrito, non aderenza, quindi uguaglianza con f_att.' },
      ],
    },
    {
      id: 'd025.3',
      latex: '\\vec R_P = \\vec R_N + \\vec R_T = -\\vec F, \\qquad |\\vec R_P| = \\sqrt{R_N^2 + R_T^2} = F',
      perche: 'L\'attrito spinge il perno verso destra: il perno «sale» sulla parete e il contatto $P$ si sposta in basso a destra. Si ferma dove l\'equilibrio alla traslazione è soddisfatto: la risultante delle forze di contatto deve essere verticale e uguale al carico.',
      fonte: P(82),
      chiave: true,
      distrattori: [
        { latex: '\\vec R_N = -\\vec F', errore: 'termine-perso', spiega: 'Con l\'attrito è la risultante R_N + R_T a bilanciare F, non la sola normale (che ora è inclinata).', num: (v) => [v.RN, v.F] },
        { latex: '\\text{il contatto si sposta a sinistra, verso } \\vec v_P', errore: 'segno', spiega: 'L\'attrito sul perno è opposto a v_P, quindi lo spinge a destra: il contatto sale dal lato destro (ω oraria).' },
      ],
      num: (v) => [Math.hypot(v.RN, v.RT), v.F],
    },
    {
      id: 'd025.4',
      latex: '\\tan\\widehat{(\\vec R_P, \\vec R_N)} = \\dfrac{R_T}{R_N} = f_{att} \\;\\Rightarrow\\; \\widehat{OP,\\ \\text{verticale}} = \\varphi_{att}',
      perche: 'In $P$ la normale è diretta lungo $PO$ e la tangenziale le è perpendicolare: la risultante forma con la normale l\'angolo di attrito. Siccome la risultante è verticale, il raggio $OP$ è inclinato di $\\varphi_{att}$ rispetto alla verticale.',
      fonte: P(82),
      chiave: true,
      distrattori: [
        { latex: '\\widehat{OP,\\ \\text{verticale}} = \\varphi_{ad}', errore: 'indice', spiega: 'Il perno ruota: c\'è strisciamento, conta f_att.' },
        { latex: '\\widehat{OP,\\ \\text{verticale}} = 90^\\circ - \\varphi_{att}', errore: 'convenzione', spiega: 'φ_att si misura tra la risultante (verticale) e la normale (lungo OP).', num: (v) => [v.RT / v.RN, Math.tan(Math.PI / 2 - v.phi)] },
      ],
      num: (v) => [v.RT / v.RN, Math.tan(v.phi)],
    },
    {
      id: 'd025.5',
      latex: 'R_N = F\\cos\\varphi_{att}, \\qquad R_T = F\\sin\\varphi_{att}',
      perche: 'Proiezioni della risultante $F$ sulla normale e sulla tangente in $P$, che formano con essa gli angoli $\\varphi_{att}$ e $90° - \\varphi_{att}$.',
      fonte: { tipo: 'deduzione', da: 'p. 82 (NdT di cap2.md)', spiegazione: 'scomposizione di R_P = F lungo PO e lungo la tangente, usata per verificare il momento' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.RT, v.F * Math.sin(v.phi)],
    },
    {
      id: 'd025.6',
      latex: 'r^* = \\overline{OP}\\,\\sin\\varphi_{att} = R\\sin\\varphi_{att}',
      perche: 'Il braccio della risultante rispetto a $O$ è la distanza di $O$ dalla retta verticale per $P$: nel triangolo rettangolo con ipotenusa $OP = R$ è il cateto opposto a $\\varphi_{att}$. La circonferenza di centro $O$ e raggio $r^*$ è il **cerchio d\'attrito**: la retta d\'azione della risultante gli è tangente.',
      fonte: P([82, 83]),
      chiave: true,
      correzione: { nf: 'NF-121', dispensaScrive: '\\text{«circonferenza di centro } O\\text{, tangente alla risultante della forza di attrito»}' },
      distrattori: [
        { latex: 'r^* = R\\tan\\varphi_{att}', errore: 'concetto', spiega: 'Nel triangolo OP è l\'ipotenusa: il cateto opposto è R sin φ (R tan φ sarebbe la tangente da P, più lunga).', num: (v) => [Math.abs(v.xP), v.R * Math.tan(v.phi)] },
        { latex: 'r^* = R\\cos\\varphi_{att}', errore: 'indice', spiega: 'R cos φ è la quota di P sotto O, non la distanza orizzontale dalla retta verticale.', num: (v) => [Math.abs(v.xP), v.R * Math.cos(v.phi)] },
      ],
      num: (v) => [Math.abs(v.xP * 1 - v.yP * 0), v.R * Math.sin(v.phi)],
    },
    {
      id: 'd025.7',
      latex: 'M_r = R_P\\,r^* = F\\,R\\sin\\varphi_{att}',
      perche: 'Momento della reazione rispetto al centro: modulo $F$ per il braccio $r^*$. La retta è tangente al cerchio dal lato che dà un momento **opposto a $\\omega$** (con $\\omega$ oraria, $R_P$ verso l\'alto a destra di $O$ dà momento antiorario): è il momento resistente da vincere con la coppia motrice.',
      fonte: P(82),
      chiave: true,
      distrattori: [
        { latex: 'M_r = F\\,R', errore: 'concetto', spiega: 'Il braccio non è il raggio del perno ma il raggio del cerchio d\'attrito, r* = R sin φ.', num: (v) => [v.F * v.rStar, v.F * v.R] },
        { latex: 'M_r = F\\,R\\cos\\varphi_{att}', errore: 'indice', spiega: 'Il braccio è R sin φ: con φ → 0 il momento deve annullarsi.', num: (v) => [v.F * v.rStar, v.F * v.R * Math.cos(v.phi)] },
      ],
      num: (v) => [v.F * v.rStar, v.F * v.R * Math.sin(v.phi)],
    },
    {
      id: 'd025.8',
      latex: 'M_r = R_T\\,R = f_{att}R_N R = f_{att}F\\cos\\varphi_{att}\\,R = F\\,R\\sin\\varphi_{att}',
      perche: 'Controllo: la normale passa per $O$ e non dà momento, la tangenziale ha braccio $R$. Con $R_N = F\\cos\\varphi$ e $f = \\tan\\varphi$ si ritrova lo stesso momento.',
      fonte: { tipo: 'deduzione', da: 'p. 82 (verifica nella trascrizione)', spiegazione: 'momento calcolato con le componenti invece che con la risultante' },
      aggiunto: true,
      distrattori: [
        { latex: 'M_r = f_{att}\\,F\\,R \\ \\text{(esatto)}', errore: 'ipotesi', spiega: 'La normale non vale F ma F cos φ: f F R è solo l\'approssimazione per f piccolo.', num: (v) => [v.RT * v.R, v.f * v.F * v.R] },
      ],
      num: (v) => [v.RT * v.R, v.F * v.R * Math.sin(v.phi)],
    },
    {
      id: 'd025.9',
      latex: 'f_{att} \\ll 1:\\ \\sin\\varphi_{att} \\simeq \\tan\\varphi_{att} = f_{att} \\;\\Rightarrow\\; r^* \\simeq f_{att}R, \\quad M_r \\simeq f_{att}\\,F R',
      perche: 'Per coefficienti piccoli seno e tangente coincidono al primo ordine. È l\'approssimazione usata dalle domande ($\\rho = \\mu R$): utile per i conti, ma la dispensa scrive solo la forma esatta $R\\sin\\varphi$.',
      fonte: { tipo: 'deduzione', da: 'p. 82 e NF-42', spiegazione: 'sviluppo al primo ordine di sin(atan f) = f − f³/2 + …' },
      aggiunto: true,
      distrattori: [],
    },
  ],
  risultato: { latex: 'r^* = R\\sin\\varphi_{att}, \\qquad M_r = F\\,R\\sin\\varphi_{att} \\ (\\simeq f_{att}FR)', fonte: P([82, 83]) },
  gancio: 'Il perno sale dal lato dove lo spinge l\'attrito finché la risultante torna verticale: la sua retta sfiora il cerchio di raggio R sin φ.',
};

// ------------------------------------------------------------------ argomento
export const perno: ArgomentoContenuto = {
  id: 'c2-perno',
  cosaDireSubito:
    'In una coppia rotoidale con gioco il perno, ruotando, striscia sulla boccola: l\'attrito lo fa salire di lato finché la risultante delle forze di contatto torna a bilanciare il carico. Questa risultante non passa più per il centro ma è inclinata di φ_att rispetto alla normale: la sua retta è tangente al cerchio d\'attrito di raggio r* = R sin φ_att, e il momento resistente è F r*.',
  sistemaIpotesi: [
    'Sistema: perno (albero) di raggio R caricato in O da F, boccola fissa, gioco tra i due.',
    'Contatto in un solo punto P; perno in rotazione con ω: strisciamento in P, R_T = f_att R_N.',
    'Equilibrio del perno (inerzie trascurate): R_N + R_T = −F.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Perno nella boccola con ω oraria (dispensa p. 83): il contatto P è salito a destra di φ_att, la risultante R_P è verticale e tangente al cerchio d\'attrito.',
    fonte: { tipo: 'dispensa', pag: 83, fig: 'cerchio d\'attrito' },
    elementi: [
      { id: 'boccola', testo: 'boccola e perno di raggio R con gioco, centro O', obbligatorio: true },
      { id: 'F', testo: 'carico F verticale in O', obbligatorio: true },
      { id: 'omega', testo: 'verso di rotazione ω (orario come nella dispensa)', obbligatorio: true },
      { id: 'P', testo: 'contatto P spostato dal lato verso cui l\'attrito spinge, OP inclinato di φ_att dalla verticale', obbligatorio: true },
      { id: 'forze', testo: 'R_N lungo PO, R_T tangente opposta a v_P', obbligatorio: true },
      { id: 'RP', testo: 'risultante R_P verticale, uguale e opposta a F', obbligatorio: true },
      { id: 'cerchio', testo: 'cerchio d\'attrito di raggio r* = R sin φ_att tangente alla retta di R_P', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\vec R_N + \\vec R_T + \\vec F = 0, \\qquad R_T = f_{att}R_N',
    spiegazione: 'Equilibrio alla traslazione del perno e legge dell\'attrito di strisciamento nel contatto: da qui l\'inclinazione di OP e il braccio della reazione.',
    fonte: { tipo: 'dispensa', pag: 82 },
  },
  dimostrazioni: ['d025'],
  significato:
    'Con l\'attrito una coppia rotoidale non trasmette più forze passanti per il centro: la reazione è tangente al cerchio d\'attrito, dal lato che si oppone alla rotazione relativa, e richiede una coppia motrice F R sin φ solo per far girare il perno. Inoltre il contatto è concentrato in un punto: pressioni elevate, potenza dissipata su un\'area piccola, temperatura e usura.',
  fraseDaRicordare: 'Reazione nel perno con attrito: tangente al cerchio di raggio R sin φ_att, momento resistente F R sin φ_att.',
  daNonDire: [
    { frase: 'Il momento resistente è f N R con N = F.', perche: 'La normale vale F cos φ: il momento esatto è F R sin φ; f F R è un\'approssimazione.', fonte: { tipo: 'dispensa', pag: 82 } },
    { frase: 'Il raggio del cerchio d\'attrito è μR.', perche: 'La dispensa scrive R sin φ_att; μR è solo l\'approssimazione per f piccolo (NF-42).', fonte: { tipo: 'dispensa', pag: 82 } },
    { frase: 'Il contatto si sposta dal lato verso cui si muove il punto di contatto.', perche: 'L\'attrito sul perno è opposto a v_P: il perno sale dal lato opposto a v_P (a destra per ω oraria).', fonte: { tipo: 'dispensa', pag: 82 } },
    { frase: 'Il cerchio è tangente alla forza d\'attrito.', perche: 'È tangente alla retta della risultante delle forze di contatto R_N + R_T (NF-121): la sola R_T ha braccio R.', fonte: { tipo: 'dispensa', pag: 82 } },
    { frase: 'In P c\'è aderenza al limite, R_T = f_ad R_N.', perche: 'Il perno ruota e striscia: si usa f_att e φ_att.', fonte: { tipo: 'dispensa', pag: 82 } },
  ],
  approfondimenti: [
    {
      domanda: 'Perché il contatto si sposta proprio da quel lato?',
      tipo: 'approfondimento',
      attesa: 'Con ω oraria il punto più basso del perno va verso sinistra; l\'attrito su di esso è verso destra e spinge il perno a «salire» sulla parete destra, finché la risultante di normale e attrito non è verticale.',
      fonte: { tipo: 'dispensa', pag: 82 },
    },
    {
      domanda: 'Qual è il problema principale di questo accoppiamento?',
      tipo: 'approfondimento',
      attesa: 'Il contatto si riduce a un punto: forze e pressioni molto elevate, potenza dissipata concentrata su un\'area piccola, quindi riscaldamento e usura. Da qui l\'interesse per i cuscinetti volventi.',
      fonte: { tipo: 'dispensa', pag: 83 },
    },
    {
      domanda: 'Quanta potenza si dissipa nel perno?',
      tipo: 'approfondimento',
      attesa: 'Il momento resistente per la velocità angolare relativa: W_d = M_r ω = F R sin φ_att ω, circa f F R ω.',
      fonte: { tipo: 'deduzione', da: 'p. 82', spiegazione: 'potenza di una coppia: momento resistente per velocità angolare relativa' },
    },
    {
      domanda: 'Come lo usi nella statica di un meccanismo con attrito nelle cerniere?',
      tipo: 'approfondimento',
      attesa: 'La reazione in una coppia rotoidale si disegna tangente al cerchio d\'attrito, dal lato che dà un momento opposto alla rotazione relativa dei due membri; poi si risolve il poligono delle forze come senza attrito.',
      fonte: { tipo: 'deduzione', da: 'pp. 82–83', spiegazione: 'regola del verso: il momento della reazione rispetto a O si oppone a ω relativa' },
    },
    {
      domanda: 'Dove rivedi il cerchio d\'attrito nel corso?',
      tipo: 'collegamento',
      argomento: 'c3-ceppi',
      attesa: 'Nel freno a ceppi: la forza sul tamburo nel punto medio del ceppo è inclinata di φ dalla normale ed è tangente al cerchio di raggio ρ = R sin φ; il suo momento è la coppia frenante e la scelta della tangente giusta decide avvolgente o svolgente.',
      fonte: { tipo: 'dispensa', pag: [106, 107] },
    },
    {
      domanda: 'Che legame c\'è con il cono d\'aderenza?',
      tipo: 'collegamento',
      argomento: 'c2-attrito',
      attesa: 'È lo stesso fatto: la risultante di contatto è inclinata rispetto alla normale dell\'angolo atan f. Nel perno la normale passa per il centro, quindi l\'inclinazione si traduce in un braccio R sin φ.',
      fonte: { tipo: 'dispensa', pag: [73, 82] },
    },
  ],
  simboli: [
    { simbolo: 'R', significato: 'raggio del perno (albero)' },
    { simbolo: '\\vec R_N,\\ \\vec R_T', significato: 'reazione normale e forza di attrito nel contatto', altrove: 'N, T in q18' },
    { simbolo: '\\vec R_P', significato: 'risultante delle forze di contatto (R_Q nel testo di p. 82)', altrove: 'Q in q18 (in D, Q è la forza sul corsoio)' },
    { simbolo: '\\varphi_{att}', significato: 'angolo di attrito, tan φ_att = f_att', altrove: 'φ con tan φ = μ in q18' },
    { simbolo: 'r^*', significato: 'raggio del cerchio d\'attrito', altrove: 'ρ in d025 e nel cap. 3' },
    { simbolo: 'M_r', significato: 'momento resistente (la dispensa scrive R_P r*)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c2-perno' }],
  previsioni: [
    {
      id: 'c2-perno-verso',
      domanda: 'Inverti il verso di rotazione del perno (ω antioraria). Il contatto P…',
      opzioni: ['resta nel punto più basso', 'sale a sinistra, sempre di φ_att', 'sale a destra, di 2φ_att', 'sale a sinistra di 90° − φ_att'],
      corretta: 1,
      spiega: 'L\'attrito si inverte con v_P: il perno sale dal lato opposto, sempre di φ_att; il cerchio d\'attrito è lo stesso, la retta gli è tangente dall\'altra parte.',
      verify: () => {
        const o = pernoEng({ F: 1000, R: 0.03, f: 0.2, verso: 'orario' }), a = pernoEng({ F: 1000, R: 0.03, f: 0.2, verso: 'antiorario' });
        return a.P[0] < 0 && Math.abs(a.thetaP + o.thetaP) < 1e-12 && Math.abs(a.rStar - o.rStar) < 1e-12 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c2-perno' },
    },
    {
      id: 'c2-perno-approx',
      domanda: 'Con f_att = 0,4 l\'approssimazione M_r ≃ f F R rispetto al valore esatto F R sin φ è…',
      opzioni: ['esatta', 'più grande di circa l\'8 %', 'più piccola di circa l\'8 %', 'più grande del 40 %'],
      corretta: 1,
      spiega: 'sin(atan 0,4) = 0,371: f F R = 0,4 F R supera il valore esatto di 0,4/0,371 ≈ 1,077.',
      verify: () => {
        const r = pernoEng({ F: 1, R: 1, f: 0.4, verso: 'orario' });
        const e = r.Mapprox / r.M - 1;
        return Math.abs(e) < 1e-9 ? 0 : e > 0.06 && e < 0.1 ? 1 : e < 0 ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c2-perno' },
    },
  ],
  nf: ['NF-42', 'NF-121'],
};
