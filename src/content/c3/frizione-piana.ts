/**
 * C3 · Frizione piana (domanda q13). Dispensa: scansione del libro §5.7.1–5.7.2, pp. 117–121 ((5.82)–(5.86), Fig. 5-71…5-74),
 * e p. 116 (freno a disco). Pressione uniforme: fonte esterna (NF-07). Innesto con trasmissione: c6-frizione (NF-38).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { frizionePiana, innesto, simpson } from '../../engine/c3';
import { arrow, circle, dot, line, rect, rot, svg, text } from '../svg';
import { D } from './comune';
import { EST_UNIF } from './disco';

// ------------------------------------------------------------------ disegno (Fig. 5-73: frizione assiale monodisco)
function disegno() {
  const ay = 128;
  return svg(420, 270, [
    line(10, ay, 300, ay, 'd'),
    rect(20, ay - 9, 130, 18, 'soft'), rect(20, ay - 9, 130, 18, 'l'),
    rect(180, ay - 9, 115, 18, 'soft'), rect(180, ay - 9, 115, 18, 'l'),
    rect(150, ay - 88, 12, 176, 'l'), rect(168, ay - 88, 12, 176, 'l'),
    rect(162, ay - 80, 6, 50, 'fill'), rect(162, ay + 30, 6, 50, 'fill'),
    arrow(100, ay - 60, 146, ay - 60, 'f', 'N', -26, -12), arrow(100, ay + 60, 146, ay + 60, 'f'),
    arrow(232, ay - 60, 184, ay - 60, 'f', 'N', 26, -12), arrow(232, ay + 60, 184, ay + 60, 'f'),
    text(156, ay - 102, '1', { size: 14 }), text(174, ay - 102, '2', { size: 14 }),
    rot(60, ay, 22, 60, 120, 'v', 'ω₁'), rot(250, ay, 22, 60, 120, 'v', 'ω₂'),
    text(60, ay + 46, 'I₁, C_m', { c: 'm', size: 12 }), text(255, ay + 46, 'I₂, C_r', { c: 'm', size: 12 }),
    text(165, ay + 104, 'materiale d\'attrito fra r_i e r_e', { c: 'm', size: 12 }),
    // vista frontale della corona di contatto
    circle(355, ay, 52, 'a'), circle(355, ay, 26, 'a'), dot(355, ay),
    arrow(355, ay, 355 + 52, ay, 'm'), text(385, ay - 10, 'r_e', { c: 'm', size: 12 }), arrow(355, ay, 355 - 18.4, ay + 18.4, 'm'), text(338, ay + 32, 'r_i', { c: 'm', size: 12 }),
    text(210, 258, 'C_f = i f N (r_e + r_i)/2', { c: 'a', size: 13 }),
  ], 'Frizione assiale monodisco: dischi 1 e 2 premuti dalla forza assiale N, corona d\'attrito fra r_i e r_e');
}

// ------------------------------------------------------------------ d052
export const d052: Dimostrazione = {
  id: 'd052',
  titolo: 'Frizione piana: coppia trasmissibile e lavoro perso all\'innesto',
  enunciato: 'Ricavare la coppia trasmessa per attrito da una frizione a dischi piani (anche multidisco) e il lavoro dissipato in un innesto rapido.',
  ipotesi: [
    'corona d\'attrito fra r_i e r_e, forza assiale N; i superfici d\'attrito premute dalla stessa N',
    'ipotesi di Reye con accostamento assiale traslatorio (come il freno a disco): p = K/r; attrito coulombiano f',
    'innesto assimilabile a un urto: durata brevissima, coppie esterne C_m, C_r trascurabili rispetto a C_f',
  ],
  sample: (rnd) => {
    const ri = U(rnd, 0.05, 0.1), re = ri + U(rnd, 0.03, 0.1), f = U(rnd, 0.2, 0.5), N = U(rnd, 1000, 10000);
    const i = 2 * (1 + Math.floor(rnd() * 4)), r = U(rnd, ri, re);
    const I1 = U(rnd, 0.05, 1), I2 = U(rnd, 0.05, 1), w10 = U(rnd, 100, 300), w20 = U(rnd, 0, 90);
    const K = N / (2 * Math.PI * (re - ri)), rm = (re + ri) / 2, Ru = ((2 / 3) * (re ** 3 - ri ** 3)) / (re ** 2 - ri ** 2);
    const inn = innesto({ I1, I2, w10, w20 });
    return { ri, re, r, f, N, i, I1, I2, w10, w20, K, rm, Ru, Cf: f * N * rm, wf: inn.wf, Lf: inn.Lf };
  },
  passi: [
    {
      id: 'd052.1',
      latex: '\\text{frizione assiale semplice} \\equiv \\text{freno a disco ad accostamento rigido con } \\alpha = 2\\pi',
      perche: 'Due dischi solidali ai due alberi, serrati da una forza assiale $N$. «L\'unica differenza consiste nel fatto che, nel caso della frizione, entrambi i dischi sono contemporaneamente in rotazione durante la fase di innesto» (p. 119): la velocità di strisciamento è $(\\omega_1 - \\omega_2)\\,r$, sempre proporzionale a $r$.',
      fonte: D(119),
      distrattori: [],
    },
    {
      id: 'd052.2',
      latex: 'N = \\int_{r_i}^{r_e} \\dfrac{K}{r}\\,2\\pi r\\,dr = 2\\pi K(r_e - r_i) \\;\\Rightarrow\\; p = \\dfrac{N}{2\\pi r\\,(r_e - r_i)}',
      perche: 'Con Reye e accostamento traslatorio il consumo è uniforme e la pressione iperbolica, $p = K/r$; la costante si fissa con la forza assiale (5.85).',
      fonte: D(120, { eq: '(5.85)' }),
      chiave: true,
      distrattori: [
        { latex: 'p = \\dfrac{N}{\\pi\\,(r_e^2 - r_i^2)}', errore: 'ipotesi', spiega: 'È la pressione uniforme del disco nuovo; il libro usa l\'ipotesi di Reye.', num: (v) => [v.K / v.r, v.N / (Math.PI * (v.re ** 2 - v.ri ** 2))] },
        { latex: 'p = \\dfrac{N}{2\\pi\\,(r_e - r_i)}', errore: 'termine-perso', spiega: 'Questa è la costante K, non la pressione: manca la r al denominatore.', num: (v) => [v.K / v.r, v.N / (2 * Math.PI * (v.re - v.ri))] },
      ],
      num: (v) => [simpson((r) => (v.K / r) * 2 * Math.PI * r, v.ri, v.re), v.N],
    },
    {
      id: 'd052.3',
      latex: 'C_f = \\int_{r_i}^{r_e} f\\,\\dfrac{K}{r}\\,r\\;2\\pi r\\,dr = 2\\pi f K\\,\\dfrac{r_e^2 - r_i^2}{2}',
      perche: 'Ogni anello di raggio $r$ trasmette la forza d\'attrito $f\\,p\\,2\\pi r\\,dr$ con braccio $r$.',
      fonte: D([116, 120]),
      distrattori: [],
      num: (v) => [simpson((r) => v.f * (v.K / r) * r * 2 * Math.PI * r, v.ri, v.re), Math.PI * v.f * v.K * (v.re ** 2 - v.ri ** 2)],
    },
    {
      id: 'd052.4',
      latex: 'C_f = f\\,N\\,\\dfrac{r_e + r_i}{2}',
      perche: 'Si sostituisce $2\\pi K = N/(r_e - r_i)$: è la (5.84), lo stesso $M_f = f F_N r_m$ del freno a disco (p. 116).',
      fonte: D(120, { eq: '(5.84)' }),
      chiave: true,
      distrattori: [
        { latex: 'C_f = f\\,N\\,\\dfrac{2}{3}\\dfrac{r_e^3 - r_i^3}{r_e^2 - r_i^2}', errore: 'ipotesi', spiega: 'È la coppia con pressione uniforme (frizione nuova), non con Reye.', num: (v) => [v.Cf, v.f * v.N * v.Ru] },
        { latex: 'C_f = f\\,N\\,r_e', errore: 'concetto', spiega: 'Il braccio equivalente è il raggio medio della corona.', num: (v) => [v.Cf, v.f * v.N * v.re] },
      ],
      num: (v) => [Math.PI * v.f * v.K * (v.re ** 2 - v.ri ** 2), v.f * v.N * v.rm],
    },
    {
      id: 'd052.5',
      latex: 'C_f = i\\,f\\,N\\,\\dfrac{r_e + r_i}{2}',
      perche: 'Frizione a dischi multipli (Fig. 5-74): dischi alternativamente collegati al motore e al condotto, tutti premuti dalla **stessa** forza assiale $N$; ognuna delle $i$ superfici d\'attrito trasmette $f N r_m$ (5.86). Così si trasmettono coppie elevate (fino a 60 dischi).',
      fonte: D(120, { eq: '(5.86)' }),
      chiave: true,
      distrattori: [
        { latex: 'C_f = f\\,\\dfrac{N}{i}\\,\\dfrac{r_e + r_i}{2}', errore: 'concetto', spiega: 'La forza assiale non si divide fra i dischi: è la stessa su ogni superficie (dischi «in serie» lungo l\'asse).', num: (v) => [v.i * v.Cf, (v.f * v.N * v.rm) / v.i] },
        { latex: 'i = \\text{numero dei dischi}', errore: 'indice', spiega: 'i conta le superfici d\'attrito a contatto, non i dischi: con due dischi c\'è una superficie, con una pinza a due facce ce ne sono due.' },
      ],
      num: (v) => [v.i * v.Cf, frizionePiana({ ri: v.ri, re: v.re, f: v.f, N: v.N, i: v.i, legge: 'usura' }).Cf],
    },
    {
      id: 'd052.6',
      latex: '\\omega_1 = \\omega_2:\\quad |C| \\le C_{f,max}\\ \\text{(aderenza)}',
      perche: 'A velocità uguali si passa dallo strisciamento all\'**aderenza**: la frizione si comporta come un unico corpo e la coppia trasmessa è quella imposta dall\'equilibrio dinamico del sistema, purché non superi il limite di aderenza (p. 117).',
      fonte: D(117),
      distrattori: [],
    },
    {
      id: 'd052.7',
      latex: 'C_m - C_f - I_1\\dot\\omega_1 = 0,\\qquad C_f - C_r - I_2\\dot\\omega_2 = 0',
      perche: 'Equilibrio dinamico dei due alberi durante l\'innesto (p. 118, Fig. 5-71): la coppia d\'attrito frena l\'albero motore e accelera il condotto.',
      fonte: D(118),
      distrattori: [],
    },
    {
      id: 'd052.8',
      latex: 'I_1\\omega_{10} + I_2\\omega_{20} = (I_1 + I_2)\\,\\omega_f \\;\\Rightarrow\\; \\omega_f = \\dfrac{I_1\\omega_{10} + I_2\\omega_{20}}{I_1 + I_2}',
      perche: 'Se l\'innesto dura pochissimo è «assimilabile a un urto»: sommando le due equazioni e integrando sulla durata, gli integrali di $C_m$ e $C_r$ sono trascurabili e $C_f$ si elide. Si conserva il momento della quantità di moto (5.83).',
      fonte: D(118, { eq: '(5.83)' }),
      distrattori: [],
      num: (v) => [v.I1 * v.w10 + v.I2 * v.w20, (v.I1 + v.I2) * v.wf],
    },
    {
      id: 'd052.9',
      latex: 'L_f = \\tfrac12\\big[I_1\\omega_{10}^2 + I_2\\omega_{20}^2 - (I_1 + I_2)\\omega_f^2\\big] = \\dfrac{I_1 I_2}{2(I_1 + I_2)}\\,(\\omega_{10} - \\omega_{20})^2',
      perche: 'Il lavoro perso nello slittamento è la perdita di energia cinetica (dalla (5.82) senza gli integrali delle coppie esterne). Diventa calore nel materiale d\'attrito: è il secondo criterio di dimensionamento di freni e frizioni (p. 105).',
      fonte: D([117, 118], { eq: '(5.82)' }),
      chiave: true,
      distrattori: [
        { latex: 'L_f = 0\\ \\text{(si conserva l\'energia come la quantità di moto)}', errore: 'concetto', spiega: 'Nell\'urto anelastico si conserva il momento della quantità di moto, non l\'energia: lo strisciamento dissipa.', num: (v) => [v.Lf, 0] },
        { latex: 'L_f = \\tfrac12\\,I_1(\\omega_{10} - \\omega_{20})^2', errore: 'termine-perso', spiega: 'Conta anche l\'inerzia del lato condotto: compare la «massa ridotta» I₁I₂/(I₁ + I₂).', num: (v) => [v.Lf, 0.5 * v.I1 * (v.w10 - v.w20) ** 2] },
      ],
      num: (v) => [0.5 * (v.I1 * v.w10 ** 2 + v.I2 * v.w20 ** 2 - (v.I1 + v.I2) * v.wf ** 2), ((v.I1 * v.I2) / (2 * (v.I1 + v.I2))) * (v.w10 - v.w20) ** 2],
    },
  ],
  risultato: { latex: 'C_f = i\\,f\\,N\\,\\dfrac{r_e + r_i}{2};\\qquad \\text{innesto rapido: } L_f = \\dfrac{I_1I_2}{2(I_1 + I_2)}(\\omega_{10} - \\omega_{20})^2', fonte: D([118, 120], { eq: '(5.83), (5.86)' }) },
  gancio: 'Frizione = freno a disco con due dischi che girano: i f N r_m; l\'innesto rapido è un urto anelastico.',
};

// ------------------------------------------------------------------ argomento
export const frizionePianaArg: ArgomentoContenuto = {
  id: 'c3-frizione-piana',
  cosaDireSubito:
    'La frizione è un innesto ad attrito fra due alberi coassiali: due dischi serrati da una forza assiale N trasmettono per attrito una coppia. Una frizione assiale semplice è un freno a disco ad accostamento rigido con la corona completa, solo che girano entrambi i dischi: con Reye p = N/[2πr(r_e − r_i)] e C_f = f N (r_e + r_i)/2, che diventa i f N r_m con i superfici d\'attrito.',
  sistemaIpotesi: [
    'Sistema: albero motore (I₁, C_m) e condotto (I₂, C_r) con i due dischi; corona d\'attrito fra r_i e r_e; forza assiale N.',
    'Usura stabilizzata: ipotesi di Reye, consumo uniforme, p = K/r.',
    'Attrito coulombiano f; i superfici d\'attrito premute dalla stessa N.',
    'Fase di slittamento (coppia f N r_m) e fase di aderenza (coppia imposta dal sistema).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Frizione assiale semplice monodisco (Fig. 5-73 del libro, dispensa p. 120) con le grandezze della Fig. 5-71.',
    fonte: D(120, { fig: '5-73' }),
    elementi: [
      { id: 'alberi', testo: 'due alberi coassiali: motore 1 (I₁, ω₁, C_m) e condotto 2 (I₂, ω₂, C_r)', obbligatorio: true },
      { id: 'dischi', testo: 'due dischi affacciati con il materiale d\'attrito fra loro', obbligatorio: true },
      { id: 'N', testo: 'forze assiali N opposte che serrano i dischi', obbligatorio: true },
      { id: 'corona', testo: 'vista frontale della corona fra r_i e r_e', obbligatorio: true },
      { id: 'p', testo: 'pressione iperbolica (più alta al raggio interno)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'p = \\dfrac{K}{r},\\qquad N = \\int_{r_i}^{r_e} p\\,2\\pi r\\,dr,\\qquad C_f = \\int_{r_i}^{r_e} f\\,p\\,r\\,2\\pi r\\,dr',
    spiegazione: 'Pressione da Reye (come nel freno a disco), equilibrio assiale, coppia d\'attrito come somma dei momenti degli anelli.',
    fonte: D([116, 120]),
  },
  dimostrazioni: ['d052'],
  significato:
    'La coppia trasmissibile è proporzionale alla forza di serraggio, al coefficiente d\'attrito e al raggio medio; per coppie grandi si moltiplicano le superfici invece di ingrandire il diametro. Durante lo slittamento la coppia d\'attrito compie lavoro negativo: un innesto rapido dissipa I₁I₂(ω₁₀ − ω₂₀)²/[2(I₁ + I₂)], che diventa calore.',
  fraseDaRicordare: 'Frizione piana: un freno a disco con due dischi che girano; C_f = i f N (r_e + r_i)/2.',
  daNonDire: [
    { frase: 'Con n dischi la forza si divide e la coppia non cambia.', perche: 'Tutte le superfici sono premute dalla stessa N: la coppia cresce come i, il numero di superfici d\'attrito (5.86).', fonte: D(120) },
    { frase: 'La formula del corso è quella a pressione uniforme.', perche: 'Il libro della dispensa usa Reye (usura uniforme): r_m = (r_e + r_i)/2. La pressione uniforme non c\'è nella dispensa (NF-07).', fonte: D(119) },
    { frase: 'Nell\'innesto si conserva l\'energia.', perche: 'Si conserva il momento della quantità di moto (urto); l\'energia L_f si dissipa in calore.', fonte: D(118) },
    { frase: 'In aderenza la frizione trasmette sempre f N r_m.', perche: 'In aderenza la coppia è quella imposta dall\'equilibrio dinamico del sistema; f N r_m è il limite (in slittamento, o massimo d\'aderenza).', fonte: D(117) },
  ],
  approfondimenti: [
    { domanda: 'Che differenza c\'è con il freno a disco?', tipo: 'collegamento', argomento: 'c3-disco', attesa: 'Geometria e ipotesi uguali (α = 2π, accostamento rigido, Reye): l\'unica differenza è che entrambi i dischi ruotano; per α = 2π la risultante tangenziale è nulla e resta una coppia pura.', fonte: D([119, 128]) },
    { domanda: 'E la frizione conica che vantaggio ha?', tipo: 'collegamento', argomento: 'c3-frizione-conica', attesa: 'A parità di forza assiale e ingombro trasmette molto di più: la coppia della piana si divide per (sin α + f cos α) (5.88).', fonte: D([121, 122]) },
    { domanda: 'Come evolvono le velocità durante l\'innesto?', tipo: 'collegamento', argomento: 'c6-frizione', attesa: 'Con |C_f| maggiore di |C_m| e |C_r|, ω₁ cala e ω₂ cresce (Fig. 5-72) fino a ω₁ = ω₂ = ω*; poi il sistema è un corpo unico (curva 3). Con la trasmissione e il motore linearizzato è il conto delle pp. 202–206.', fonte: D([118, 119]) },
    { domanda: 'Quanto lavoro si perde in un innesto qualsiasi?', tipo: 'approfondimento', attesa: 'Dall\'equazione dell\'energia C_m dϑ₁ − C_r dϑ₂ − dL_f = dE: L_f = ½[I₁ω₁₀² + I₂ω₂₀² − (I₁+I₂)ω_f²] + ∫C_mω₁dt − ∫C_rω₂dt (5.82); dipende anche dalla durata dell\'innesto.', fonte: D(117, { eq: '(5.82)' }) },
    { domanda: 'E se la frizione è nuova?', tipo: 'approfondimento', attesa: 'Con pressione uniforme R_m = (2/3)(r_e³ − r_i³)/(r_e² − r_i²), poco più di r_m; poi si consuma di più all\'esterno. Non è nella dispensa.', fonte: EST_UNIF },
    { domanda: 'Com\'è fatta una frizione multidisco?', tipo: 'approfondimento', attesa: 'Dischi con dentatura esterna impegnati nel condotto alternati a dischi solidali all\'albero cavo motore, tutti mobili assialmente e premuti dalla stessa N (Fig. 5-74).', fonte: D([120, 121], { fig: '5-74' }) },
  ],
  simboli: [
    { simbolo: 'N', significato: 'forza assiale che serra i dischi', altrove: 'F nelle domande (q13)' },
    { simbolo: 'i', significato: 'numero totale di superfici d\'attrito a contatto', altrove: 'n nelle fonti derivate' },
    { simbolo: 'f', significato: 'coefficiente d\'attrito', altrove: 'μ' },
    { simbolo: 'C_f', significato: 'coppia trasmessa per attrito', altrove: 'C_fr in q13' },
    { simbolo: 'I_1,\\ I_2,\\ \\omega_{10},\\ \\omega_{20},\\ \\omega_f', significato: 'inerzie, velocità iniziali e finale dei due alberi (Fig. 5-71)', altrove: 'J_m, J_u nelle domande' },
    { simbolo: 'L_f', significato: 'lavoro dissipato durante l\'innesto' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c3-disco', params: { alpha: 360 } }],
  previsioni: [
    {
      id: 'c3-fp-superfici',
      domanda: 'A parità di N, f e raggi, passi da 2 a 6 superfici d\'attrito. La coppia trasmissibile…',
      opzioni: ['resta uguale', 'triplica', 'diventa un terzo'],
      corretta: 1,
      spiega: 'C_f = i f N r_m: la stessa N preme tutte le superfici.',
      verify: () => {
        const p = { ri: 0.05, re: 0.1, f: 0.3, N: 2000, legge: 'usura' as const };
        const r = frizionePiana({ ...p, i: 6 }).Cf / frizionePiana({ ...p, i: 2 }).Cf;
        return Math.abs(r - 3) < 1e-9 ? 1 : Math.abs(r - 1) < 1e-9 ? 0 : 2;
      },
    },
    {
      id: 'c3-fp-urto',
      domanda: 'Innesto rapido con I₁ = I₂ e albero condotto fermo. Che frazione dell\'energia cinetica iniziale si perde?',
      opzioni: ['nulla', 'un quarto', 'la metà', 'tutta'],
      corretta: 2,
      spiega: 'ω_f = ω₁₀/2; L_f = I₁I₂ω₁₀²/[2(I₁+I₂)] = ½ · ½I₁ω₁₀².',
      verify: () => {
        const r = innesto({ I1: 0.3, I2: 0.3, w10: 200, w20: 0 }).frazione;
        return Math.abs(r - 0.5) < 1e-9 ? 2 : Math.abs(r - 0.25) < 1e-9 ? 1 : 0;
      },
    },
  ],
  nf: ['NF-07', 'NF-38', 'NF-144'],
};

