/**
 * C3 · Frizioni coniche (domanda q42). Dispensa: scansione del libro §5.7.3, pp. 121–122, (5.87)–(5.88), Fig. 5-75.
 * La (5.88) è corretta; q42 e d053 (C = μ P R_m / sin α) trascurano l'attrito lungo la generatrice (NF-19, NF-146).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { frizioneConica, simpson } from '../../engine/c3';
import { angle, arrow, dim, line, poly, svg, text } from '../svg';
import { D, DED } from './comune';

// ------------------------------------------------------------------ disegno (Fig. 5-75, dettaglio della generatrice)
function disegno() {
  const a = (22 * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a);
  const ay = 262, Ax = 110, Ay = 170, L = 150;
  const Bx = Ax + L * ca, By = Ay - L * sa;
  const nx = sa, ny = ca; // normale verso il cono maschio (in basso a destra, coordinate SVG)
  const parts: string[] = [
    line(20, ay, 400, ay, 'd'), text(398, ay - 10, 'asse', { c: 'm', size: 11, anchor: 'end' }),
    poly([[Ax, Ay], [Bx, By], [Bx + 70, By], [Bx + 70, ay - 20], [Ax, ay - 20]], 'soft', true),
    poly([[Ax - 40, Ay - 30], [Bx - 40, By - 30], [Bx, By], [Ax, Ay]], 'soft', true),
    line(Ax, Ay, Bx, By, 'l', 3),
    line(Ax, Ay, Ax + 70, Ay, 'd'), angle(Ax, Ay, 40, 0, 22, 'α', 'a'),
    text(Ax + 50, ay - 34, 'cono maschio', { c: 'm', size: 12 }), text(Ax - 40, Ay - 44, 'cono femmina', { c: 'm', size: 12, anchor: 'start' }),
  ];
  for (const t of [0.2, 0.45, 0.7, 0.92]) {
    const px = Ax + t * L * ca, py = Ay - t * L * sa;
    parts.push(arrow(px - 26 * nx, py - 26 * ny, px, py, 'f'));
    parts.push(arrow(px + 3 * nx, py + 3 * ny, px + 3 * nx + 24 * ca, py + 3 * ny - 24 * sa, 'v'));
  }
  const mx = Ax + 0.5 * L * ca, my = Ay - 0.5 * L * sa;
  parts.push(
    text(Ax + 0.2 * L * ca - 34, Ay - 0.2 * L * sa - 30, 'p', { c: 'f', it: true }),
    text(Ax + 0.92 * L * ca + 30, Ay - 0.92 * L * sa - 6, 'f p', { c: 'v', size: 12 }),
    dim(Ax, Ay, Bx, By, 'b', 34),
    dim(mx + 70, ay, mx + 70, my + 20, 'r_m', 14),
    arrow(Bx + 120, ay - 60, Bx + 76, ay - 60, 'f', 'N′', 8, -12),
    text(205, 18, 'p_a = p (sin α + f cos α)', { c: 'a', size: 13 }),
    text(205, 38, 'C_f = f N′ (r_e + r_i) / [2 (sin α + f cos α)]', { c: 'a', size: 13 }),
  );
  return svg(410, 290, parts, 'Frizione conica: generatrice inclinata di α sull\'asse, pressione normale p e attrito f p lungo la generatrice, forza assiale N′');
}

// ------------------------------------------------------------------ d053
export const d053: Dimostrazione = {
  id: 'd053',
  titolo: 'Frizione conica: coppia trasmissibile (5.88)',
  enunciato: 'Ricavare la coppia trasmessa da una frizione conica in funzione della forza assiale di serraggio N′, tenendo conto dell\'attrito che si oppone all\'accostamento dei coni.',
  ipotesi: [
    'superficie di contatto tronco-conica fra r_i e r_e, semiangolo α (angolo fra generatrice e asse)',
    'fase di serraggio: le forze tangenziali f p lungo la generatrice si oppongono al moto di accostamento dei coni',
    'ipotesi di Reye con accostamento assiale traslatorio: p = K/r; attrito coulombiano f',
  ],
  sample: (rnd) => {
    const ri = U(rnd, 0.05, 0.1), re = ri + U(rnd, 0.02, 0.06), f = U(rnd, 0.2, 0.45), Np = U(rnd, 500, 5000), alpha = U(rnd, (8 * Math.PI) / 180, (30 * Math.PI) / 180);
    const sa = Math.sin(alpha), ca = Math.cos(alpha), r = U(rnd, ri, re), p = U(rnd, 1e5, 1e6);
    const K = (Np * sa) / (2 * Math.PI * (re - ri) * (sa + f * ca));
    const c = frizioneConica({ ri, re, f, Np, alpha });
    return { ri, re, f, Np, alpha, sa, ca, r, p, K, rm: c.rm, Cf: c.Cf };
  },
  passi: [
    {
      id: 'd053.1',
      latex: 'dA = 2\\pi r\\,\\dfrac{dr}{\\sin\\alpha},\\qquad A = \\int_{r_i}^{r_e} \\dfrac{2\\pi r}{\\sin\\alpha}\\,dr = \\pi(r_e + r_i)\\,b,\\quad b = \\dfrac{r_e - r_i}{\\sin\\alpha}',
      perche: 'Un anello di raggio $r$ e spessore radiale $dr$ sulla superficie conica è largo $dr/\\sin\\alpha$ lungo la generatrice: l\'area **effettiva** è più grande di quella proiettata $2\\pi r\\,dr$. $b$ è la larghezza della fascia di contatto della Fig. 5-75.',
      fonte: DED('p. 122, Fig. 5-75', 'geometria della fascia conica di larghezza b fra r_i e r_e'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [simpson((r) => (2 * Math.PI * r) / v.sa, v.ri, v.re), Math.PI * (v.re + v.ri) * ((v.re - v.ri) / v.sa)],
    },
    {
      id: 'd053.2',
      latex: 'd\\underline F = p\\,dA\\,\\underline n + f\\,p\\,dA\\,\\underline g,\\qquad \\underline g\\ \\text{lungo la generatrice, opposta all\'accostamento}',
      perche: 'Sull\'elemento agiscono la pressione normale e la forza tangenziale $f p$ che, durante il serraggio, «si oppone al moto di accostamento dei due coni» (p. 121). È il termine che le fonti derivate dimenticano.',
      fonte: D(121),
      chiave: true,
      distrattori: [
        { latex: 'd\\underline F = p\\,dA\\,\\underline n\\ \\ (dN\\sin\\alpha = dP)', errore: 'ipotesi', spiega: 'È l\'equilibrio di q42/d053 (NF-19): senza l\'attrito lungo la generatrice. Ma mentre i coni si accostano strisciano anche lungo la generatrice.' },
        { latex: 'f\\,p\\,dA\\ \\text{concorde con l\'accostamento}', errore: 'segno', spiega: 'L\'attrito si oppone sempre al moto relativo: nel serraggio frena l\'accostamento, quindi aggiunge forza assiale da vincere.' },
      ],
    },
    {
      id: 'd053.3',
      latex: 'p_a = p\\sin\\alpha + f\\,p\\cos\\alpha = p\\,(\\sin\\alpha + f\\cos\\alpha)',
      perche: 'Componente assiale della forza per unità di superficie: la normale è inclinata di $\\alpha$ sulla direzione radiale (componente assiale $\\sin\\alpha$), la generatrice di $\\alpha$ sull\'asse (componente assiale $\\cos\\alpha$). Le due componenti si sommano perché entrambe resistono al serraggio.',
      fonte: D(121),
      distrattori: [
        { latex: 'p_a = p\\,(\\sin\\alpha - f\\cos\\alpha)', errore: 'segno', spiega: 'Questo è il distacco (attrito invertito), non il serraggio.', num: (v) => [v.p * (v.sa + v.f * v.ca), v.p * (v.sa - v.f * v.ca)] },
      ],
      num: (v) => {
        // componenti [assiale, radiale] sul cono maschio che avanza lungo +z: normale (−sin α, cos α), attrito −f p (cos α, sin α)
        const nz = -v.sa, gz = v.ca;
        return [-(v.p * nz - v.f * v.p * gz), v.p * (v.sa + v.f * v.ca)];
      },
    },
    {
      id: 'd053.4',
      latex: 'p(r) = \\dfrac{K}{r}',
      perche: 'Come nella frizione piana: accostamento assiale traslatorio, consumo uniforme, velocità di strisciamento $\\propto r$; per Reye la pressione è iperbolica anche sulla superficie conica (la (5.87) ha $r$ al denominatore).',
      fonte: D(122, { eq: '(5.87)' }),
      distrattori: [],
    },
    {
      id: 'd053.5',
      latex: 'N\' = \\int_{r_i}^{r_e} \\dfrac{K}{r}(\\sin\\alpha + f\\cos\\alpha)\\,\\dfrac{2\\pi r\\,dr}{\\sin\\alpha} = 2\\pi K(r_e - r_i)\\,\\dfrac{\\sin\\alpha + f\\cos\\alpha}{\\sin\\alpha}',
      perche: 'Equilibrio assiale: la forza di serraggio $N\'$ è la somma delle componenti assiali $p_a\\,dA$ sull\'area effettiva.',
      fonte: DED('pp. 121–122', 'integrale di p_a sull\'area effettiva dA = 2πr dr/sin α (verifica della (5.88))'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [simpson((r) => (v.K / r) * (v.sa + v.f * v.ca) * ((2 * Math.PI * r) / v.sa), v.ri, v.re), v.Np],
    },
    {
      id: 'd053.6',
      latex: 'p = \\dfrac{N\'\\sin\\alpha}{2\\pi r\\,(r_e - r_i)(\\sin\\alpha + f\\cos\\alpha)}',
      perche: 'Si ricava $K$ e quindi la pressione sulla superficie conica. Il libro scrive la (5.87) senza il $\\sin\\alpha$ al numeratore: lì uguaglia $p_a$ (riferita all\'area effettiva) a $N\'/[2\\pi r(r_e - r_i)]$ (riferita all\'area proiettata) (NF-19). La (5.88) che segue è comunque giusta.',
      fonte: D(122, { eq: '(5.87)' }),
      correzione: { nf: 'NF-19', dispensaScrive: 'p = \\dfrac{N\'}{2\\pi r\\,(r_e - r_i)(\\sin\\alpha + f\\cos\\alpha)}\\quad (5.87)' },
      distrattori: [],
      num: (v) => [v.K / v.r, (v.Np * v.sa) / (2 * Math.PI * v.r * (v.re - v.ri) * (v.sa + v.f * v.ca))],
    },
    {
      id: 'd053.7',
      latex: 'C_f = \\int_{r_i}^{r_e} f\\,\\dfrac{K}{r}\\,r\\,\\dfrac{2\\pi r\\,dr}{\\sin\\alpha} = \\dfrac{2\\pi f K}{\\sin\\alpha}\\,\\dfrac{r_e^2 - r_i^2}{2}',
      perche: 'La coppia viene dall\'attrito **circonferenziale** (durante l\'innesto i coni strisciano in rotazione): $f p\\,dA$ con braccio $r$.',
      fonte: DED('pp. 121–122', 'integrale di f p r sull\'area effettiva'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [simpson((r) => v.f * (v.K / r) * r * ((2 * Math.PI * r) / v.sa), v.ri, v.re), ((2 * Math.PI * v.f * v.K) / v.sa) * ((v.re ** 2 - v.ri ** 2) / 2)],
    },
    {
      id: 'd053.8',
      latex: 'C_f = f\\,\\dfrac{N\'\\,(r_e + r_i)}{2\\,(\\sin\\alpha + f\\cos\\alpha)}',
      perche: 'Si sostituisce $K$: è la (5.84) della frizione piana con $N$ sostituito da $N\'/(\\sin\\alpha + f\\cos\\alpha)$ (5.88). A parità di forza assiale e di ingombro la coppia è «molto superiore» a quella della frizione piana.',
      fonte: D(122, { eq: '(5.88)' }),
      chiave: true,
      distrattori: [
        { latex: 'C_f = \\dfrac{f\\,N\'\\,r_m}{\\sin\\alpha}', errore: 'ipotesi', spiega: 'È la formula di q42 e d053 (NF-19): trascura l\'attrito lungo la generatrice. Con f = 0,3 e α = 15° dà una coppia 2,1 volte troppo grande.', num: (v) => [v.Cf, (v.f * v.Np * v.rm) / v.sa] },
        { latex: 'C_f = \\dfrac{f\\,N\'\\,r_m}{\\sin\\alpha - f\\cos\\alpha}', errore: 'segno', spiega: 'Nel serraggio l\'attrito si oppone all\'accostamento: si somma, non si sottrae.', num: (v) => [v.Cf, (v.f * v.Np * v.rm) / (v.sa - v.f * v.ca)] },
      ],
      num: (v) => [((2 * Math.PI * v.f * v.K) / v.sa) * ((v.re ** 2 - v.ri ** 2) / 2), (v.f * v.Np * (v.re + v.ri)) / (2 * (v.sa + v.f * v.ca))],
    },
    {
      id: 'd053.9',
      latex: '\\dfrac{C_{f,conica}}{C_{f,piana}} = \\dfrac{1}{\\sin\\alpha + f\\cos\\alpha} \\le \\dfrac{1}{f};\\qquad \\alpha \\to 0:\\ C_f \\to N\'\\,r_m',
      perche: 'L\'amplificazione è grande ma **limitata**: per $\\alpha \\to 0$ il denominatore tende a $f$ e la coppia a $N\' r_m$ (finita). Con la formula di q42 diverrebbe infinita (NF-146).',
      fonte: DED('p. 122 (5.88)', 'confronto con (5.84) e limite per α → 0'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [(v.f * v.Np * v.rm) / (Math.sin(0) + v.f * Math.cos(0)), v.Np * v.rm],
    },
    {
      id: 'd053.10',
      latex: '\\text{distacco: } N\'_{dis} = N\'\\,\\dfrac{\\sin\\alpha - f\\cos\\alpha}{\\sin\\alpha + f\\cos\\alpha} < 0 \\ \\text{ se } \\operatorname{tg}\\alpha < f',
      perche: 'Per staccare i coni l\'attrito lungo la generatrice cambia verso. Se $\\operatorname{tg}\\alpha < f$ servirebbe tirarli: restano incollati (impuntamento). Per questo $\\alpha$ non si fa piccolissimo: è un compromesso fra coppia e facilità di disinnesto.',
      fonte: DED('p. 121', 'stessa scomposizione di p_a con l\'attrito invertito, a pari pressione'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [simpson((r) => (v.K / r) * (v.sa - v.f * v.ca) * ((2 * Math.PI * r) / v.sa), v.ri, v.re), (v.Np * (v.sa - v.f * v.ca)) / (v.sa + v.f * v.ca)],
    },
  ],
  risultato: { latex: 'C_f = f\\,\\dfrac{N\'(r_e + r_i)}{2(\\sin\\alpha + f\\cos\\alpha)}', fonte: D(122, { eq: '(5.88)' }) },
  gancio: 'Cono: la forza assiale si divide per (sin α + f cos α), non per sin α: anche l\'attrito lungo la generatrice resiste al serraggio.',
};

// ------------------------------------------------------------------ argomento
export const frizioneConicaArg: ArgomentoContenuto = {
  id: 'c3-frizione-conica',
  cosaDireSubito:
    'Nella frizione conica le superfici d\'attrito sono due tronchi di cono di semiangolo α premuti da una forza assiale N′. Durante il serraggio sull\'elemento agiscono la pressione p, normale, e l\'attrito f p lungo la generatrice che si oppone all\'accostamento: la componente assiale è p(sin α + f cos α). Con la pressione di Reye la coppia è quella della frizione piana con N sostituita da N′/(sin α + f cos α): C_f = f N′(r_e + r_i)/[2(sin α + f cos α)].',
  sistemaIpotesi: [
    'Sistema: cono maschio e cono femmina coassiali, fascia di contatto fra r_i e r_e (larghezza b lungo la generatrice), semiangolo α.',
    'Fase di serraggio: attrito lungo la generatrice opposto all\'accostamento.',
    'Ipotesi di Reye: p = K/r; attrito coulombiano f.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Dettaglio della Fig. 5-75 (dispensa p. 122): generatrice inclinata di α sull\'asse, pressioni p normali e forze f p lungo la generatrice, forza assiale N′.',
    fonte: D(122, { fig: '5-75' }),
    elementi: [
      { id: 'asse', testo: 'asse di rotazione', obbligatorio: true },
      { id: 'generatrice', testo: 'generatrice inclinata del semiangolo α sull\'asse', obbligatorio: true },
      { id: 'p', testo: 'pressioni p normali alla generatrice', obbligatorio: true },
      { id: 'fp', testo: 'forze f p lungo la generatrice, opposte all\'accostamento', obbligatorio: true },
      { id: 'N', testo: 'forza assiale N′', obbligatorio: true },
      { id: 'quote', testo: 'larghezza b della fascia e raggio medio (r_e + r_i)/2', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'p_a = p\\,(\\sin\\alpha + f\\cos\\alpha),\\qquad N\' = \\int p_a\\,dA,\\qquad C_f = \\int f\\,p\\,r\\,dA',
    spiegazione: 'Componente assiale della forza per unità di superficie (con l\'attrito lungo la generatrice), equilibrio assiale e coppia d\'attrito circonferenziale.',
    fonte: D([121, 122]),
  },
  dimostrazioni: ['d053'],
  significato:
    'Il cono moltiplica la coppia a parità di forza assiale, perché per spingere assialmente serve una pressione maggiore: il fattore è 1/(sin α + f cos α), grande ma limitato da 1/f. Con α troppo piccolo però i coni si impuntano e non si staccano più (tg α < f): l\'angolo è un compromesso.',
  fraseDaRicordare: 'Nel cono la forza assiale si divide per sin α + f cos α: anche l\'attrito lungo la generatrice resiste al serraggio.',
  daNonDire: [
    { frase: 'La coppia è μ P R_m / sin α.', perche: 'È la formula di q42/d053: dimentica l\'attrito lungo la generatrice. Il libro della dispensa ha sin α + f cos α (5.88), verificata (NF-19).', fonte: D(122) },
    { frase: 'Più piccolo è α, più grande è la coppia, senza limite.', perche: 'Con la (5.88) per α → 0 la coppia tende a N′r_m: l\'amplificazione è al più 1/f. E con tg α < f i coni restano serrati (NF-146).', fonte: D(122) },
    { frase: 'Il cono aumenta il coefficiente d\'attrito.', perche: 'f dipende solo dai materiali: aumenta la pressione necessaria a equilibrare la forza assiale.', fonte: D(121) },
    { frase: 'p = N′/[2πr(r_e − r_i)(sin α + f cos α)] è la pressione sulla superficie conica.', perche: 'Con l\'area effettiva serve un sin α al numeratore: la (5.87) del libro mescola area effettiva e proiettata (NF-19). La (5.88) resta giusta.', fonte: D(122) },
  ],
  approfondimenti: [
    { domanda: 'Da dove viene il termine f cos α?', tipo: 'approfondimento', attesa: 'Dall\'attrito lungo la generatrice: mentre i coni si accostano strisciano anche assialmente, e l\'attrito si oppone all\'accostamento; la sua componente assiale è f p cos α.', fonte: D(121) },
    { domanda: 'Quanto sbaglia la formula senza f cos α?', tipo: 'approfondimento', attesa: 'Con f = 0,3 e α = 15°: sin α = 0,259 contro sin α + f cos α = 0,548, cioè una coppia 2,1 volte maggiore del vero.', fonte: DED('p. 122 (5.88)', 'confronto numerico fra (5.88) e la formula di q42') },
    { domanda: 'Che legame c\'è con la frizione piana?', tipo: 'collegamento', argomento: 'c3-frizione-piana', attesa: 'Stessa pressione di Reye p ∝ 1/r e stessa coppia (5.84), con N sostituita da N′/(sin α + f cos α); per α = 90° si ritrova la frizione piana.', fonte: D([120, 122]) },
    { domanda: 'Perché non si fa α piccolissimo?', tipo: 'collegamento', argomento: 'c2-impuntamento', attesa: 'Al distacco l\'attrito si inverte: la forza assiale è proporzionale a sin α − f cos α; se tg α < f è negativa, i coni si impuntano. Inoltre l\'amplificazione non supera 1/f. Non è scritto nella dispensa.', fonte: DED('p. 121', 'p_a con attrito invertito') },
    { domanda: 'Che cos\'è α nella frizione conica?', tipo: 'approfondimento', attesa: 'Il semiangolo del cono, cioè l\'angolo fra la generatrice e l\'asse (Fig. 5-75); non l\'apertura di un settore come nel disco.', fonte: D(122) },
  ],
  simboli: [
    { simbolo: '\\alpha', significato: 'semiangolo del cono (generatrice–asse)' },
    { simbolo: 'N\'', significato: 'forza assiale di serraggio', altrove: 'P o F_a nelle fonti derivate' },
    { simbolo: 'p_a', significato: 'componente assiale della forza per unità di superficie' },
    { simbolo: 'b', significato: 'larghezza della fascia di contatto lungo la generatrice' },
    { simbolo: 'f', significato: 'coefficiente d\'attrito', altrove: 'μ in q42' },
    { simbolo: 'r_m = (r_e + r_i)/2', significato: 'raggio medio', altrove: 'R_m in q42' },
  ],
  previsioni: [
    {
      id: 'c3-fc-q42',
      domanda: 'f = 0,3 e α = 15°. Quanto vale la coppia della formula «μ P R_m / sin α» rispetto alla (5.88)?',
      opzioni: ['è uguale', 'circa 1,2 volte', 'circa 2,1 volte', 'circa la metà'],
      corretta: 2,
      spiega: '(sin α + f cos α)/sin α = 0,548/0,259 ≈ 2,1: la formula senza l\'attrito lungo la generatrice sovrastima molto.',
      verify: () => {
        const r = frizioneConica({ ri: 0.08, re: 0.1, f: 0.3, Np: 1000, alpha: (15 * Math.PI) / 180 }).rapportoQ42;
        return Math.abs(r - 2.1) < 0.05 ? 2 : Math.abs(r - 1.2) < 0.05 ? 1 : r < 1 ? 3 : 0;
      },
    },
    {
      id: 'c3-fc-alpha0',
      domanda: 'Con la (5.88), se α → 0 la coppia trasmessa a pari N′…',
      opzioni: ['tende a zero', 'tende a N′ r_m', 'cresce senza limite'],
      corretta: 1,
      spiega: 'Il denominatore tende a f: C_f → f N′ r_m / f = N′ r_m.',
      verify: () => {
        const c = frizioneConica({ ri: 0.08, re: 0.1, f: 0.3, Np: 1000, alpha: 1e-9 });
        return Math.abs(c.Cf - 1000 * c.rm) < 1e-6 ? 1 : c.Cf > 1e6 ? 2 : 0;
      },
    },
  ],
  nf: ['NF-19', 'NF-146'],
};
