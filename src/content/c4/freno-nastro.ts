/**
 * C4 · Freno a nastro (domanda q11). Dispensa p. 153 (appunti battuti, scansione del libro, manoscritto).
 * ESEMPIO DI RIFERIMENTO per tutti i capitoli: struttura, fonti, distrattori, controlli numerici.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { arc, arrow, circle, dim, dot, line, pin, rot, svg, text } from '../svg';
import { frenoNastro as fn } from '../../engine/c4';

// ------------------------------------------------------------------ disegno (figura di p. 153, verso orario)
function disegno() {
  const cx = 170, cy = 105, R = 58;
  const fx = 120, fy = 222; // fulcro della leva (cerniera fissa)
  const ax = 222; // attacco del capo lasco sulla leva (braccio c)
  const ex = 340; // estremo della leva (forza F)
  // punti di tangenza dei due capi (tangenti dai punti a terra verso la circonferenza)
  const tang = (px: number, py: number, side: 1 | -1): [number, number] => {
    const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy);
    const a = Math.atan2(dy, dx), b = Math.acos(R / d);
    const t = a + side * b;
    return [cx + R * Math.cos(t), cy + R * Math.sin(t)];
  };
  const [t1x, t1y] = tang(fx, fy, 1); // capo sinistro, verso il fulcro
  const [t2x, t2y] = tang(ax, fy, -1); // capo destro, verso la leva
  const a1 = (Math.atan2(cy - t1y, t1x - cx) * 180) / Math.PI;
  const a2 = (Math.atan2(cy - t2y, t2x - cx) * 180) / Math.PI;
  return svg(400, 290, [
    line(cx - R - 18, cy, cx + R + 18, cy, 'd'), line(cx, cy - R - 18, cx, cy + R + 18, 'd'),
    circle(cx, cy, R, 'l'),
    // nastro avvolto sull'arco superiore (da t2 a t1 passando sopra)
    arc(cx, cy, R + 4, a2, a1 < a2 ? a1 + 360 : a1, 'a'),
    line(t1x, t1y + 0, fx, fy, 'a', 3), line(t2x, t2y, ax, fy, 'a', 3),
    dot(cx, cy, 'O', 10, 12),
    rot(cx, cy, 30, 120, 30, 'v', 'ω'),
    arrow(cx, cy, cx + R * Math.cos(Math.PI / 4), cy - R * Math.sin(Math.PI / 4), 'm'),
    text(cx + 30, cy - 12, 'R', { c: 'm' }),
    // tensioni sui capi
    arrow(t1x + (fx - t1x) * 0.45, t1y + (fy - t1y) * 0.45, t1x + (fx - t1x) * 0.8, t1y + (fy - t1y) * 0.8, 'f', 'T₁', -18, -4),
    arrow(t2x + (ax - t2x) * 0.45, t2y + (fy - t2y) * 0.45, t2x + (ax - t2x) * 0.8, t2y + (fy - t2y) * 0.8, 'f', 'T₂', 16, -4),
    text(cx, cy - R - 26, 'β (arco avvolto)', { c: 'a', size: 13 }),
    // leva
    line(fx, fy, ex, fy, 'l', 4), pin(fx, fy), dot(ax, fy),
    arrow(ex, fy - 2, ex, fy + 48, 'f', 'F', 14, -6),
    dim(fx, fy + 30, ax, fy + 30, 'c', 12), dim(fx, fy + 52, ex, fy + 52, 'a', 12),
  ], 'Freno a nastro: tamburo, nastro avvolto per β, leva con fulcro, forza F');
}

// ------------------------------------------------------------------ dimostrazione d071
const P = { tipo: 'dispensa', pag: 153 } as const;

export const d071: Dimostrazione = {
  id: 'd071',
  titolo: 'Freno a nastro: coppia frenante e direzione preferenziale',
  enunciato: 'Ricavare la coppia frenante di un freno a nastro semplice in funzione della forza di comando F, e confrontare i due versi di rotazione.',
  ipotesi: [
    'il nastro è fermo: niente termine centrifugo (ρV² = 0)',
    'il tamburo striscia sotto il nastro su tutto l\'arco avvolto: θ* = β',
    'attrito coulombiano con coefficiente f costante; leva e nastro senza massa',
  ],
  sample: (rnd) => {
    const F = U(rnd, 50, 500), a = U(rnd, 0.3, 0.8), c = U(rnd, 0.03, 0.12), R = U(rnd, 0.08, 0.25);
    const f = U(rnd, 0.15, 0.45), beta = U(rnd, Math.PI, 1.6 * Math.PI);
    const T2 = (F * a) / c, T1 = T2 * Math.exp(f * beta), Cf = (T1 - T2) * R;
    const T1a = (F * a) / c, T2a = T1a * Math.exp(-f * beta), Cfa = (T1a - T2a) * R;
    return { F, a, c, R, f, beta, T1, T2, Cf, T1a, T2a, Cfa };
  },
  passi: [
    {
      id: 'd071.1',
      latex: 'C_f = (T_1 - T_2)\\,R',
      perche: 'Equilibrio alla rotazione del tamburo: le sole azioni del nastro che hanno momento rispetto a $O$ sono le tensioni dei due capi, con braccio $R$. La coppia frenante è la loro differenza.',
      fonte: P,
      distrattori: [
        { latex: 'C_f = (T_1 + T_2)\\,R', errore: 'segno', spiega: 'I due capi tirano in versi opposti rispetto a O: i momenti si sottraggono.', num: (v) => [v.Cf, (v.T1 + v.T2) * v.R] },
        { latex: 'C_f = f\\,(T_1 - T_2)\\,R', errore: 'fattore', spiega: 'f è già dentro il rapporto delle tensioni; la coppia è solo la differenza delle tensioni per il raggio.', num: (v) => [v.Cf, v.f * (v.T1 - v.T2) * v.R] },
      ],
      num: (v) => [v.Cf, (v.T1 - v.T2) * v.R],
    },
    {
      id: 'd071.2',
      latex: '\\dfrac{T_1}{T_2} = e^{f\\beta} \\;\\Rightarrow\\; T_1 = T_2\\,e^{f\\beta}',
      perche: 'Equazione di Eulero (pp. 141–142) con $\\rho V^2 = 0$ perché il nastro è fermo, e con $\\theta^* = \\beta$ perché tutto l\'arco è in strisciamento. Il capo teso $T_1$ è quello che trattiene il nastro contro il trascinamento del tamburo (l\'attrito trascina il nastro verso l\'altro capo, che è il lasco): con $\\omega$ oraria è il capo al fulcro.',
      fonte: P,
      chiave: true,
      distrattori: [
        { latex: 'T_1 = T_2\\,e^{-f\\beta}', errore: 'segno', spiega: 'Il capo teso è il più tirato: T₁ > T₂, quindi l\'esponenziale ha esponente positivo.', num: (v) => [v.T1, v.T2 * Math.exp(-v.f * v.beta)] },
        { latex: '\\dfrac{T_1 - \\rho V^2}{T_2 - \\rho V^2} = e^{f\\theta^*},\\ \\theta^* < \\beta', errore: 'ipotesi', spiega: 'Nel freno il tamburo striscia su tutto l\'arco (θ* = β) e il nastro è fermo: niente zona di aderenza, niente centrifuga.' },
        { latex: 'T_1 = T_2\\,(1 + f\\beta)', errore: 'concetto', spiega: 'Integrando dT/dθ = fT si ottiene un esponenziale, non una relazione lineare.', num: (v) => [v.T1, v.T2 * (1 + v.f * v.beta)] },
      ],
      num: (v) => [v.T1, v.T2 * Math.exp(v.f * v.beta)],
    },
    {
      id: 'd071.3',
      latex: 'C_f = (e^{f\\beta} - 1)\\,T_2\\,R',
      perche: 'Si sostituisce $T_1 = T_2 e^{f\\beta}$ nella coppia frenante.',
      fonte: P,
      distrattori: [
        { latex: 'C_f = (1 - e^{-f\\beta})\\,T_2\\,R', errore: 'indice', spiega: 'Questa forma vale se si raccoglie T₁, non T₂: (1 − e^{−fβ}) T₁ R.', num: (v) => [v.Cf, (1 - Math.exp(-v.f * v.beta)) * v.T2 * v.R] },
      ],
      num: (v) => [v.Cf, (Math.exp(v.f * v.beta) - 1) * v.T2 * v.R],
    },
    {
      id: 'd071.4',
      latex: 'T_2\\,c - F\\,a = 0 \\;\\Rightarrow\\; T_2 = F\\,\\dfrac{a}{c}',
      perche: 'Seconda equazione cardinale della leva rispetto al fulcro: il capo $T_1$ passa per il fulcro e non dà momento; restano $T_2$ con braccio $c$ e $F$ con braccio $a$.',
      fonte: P,
      chiave: true,
      distrattori: [
        { latex: 'T_2 = F\\,\\dfrac{c}{a}', errore: 'indice', spiega: 'I bracci sono scambiati: la leva moltiplica F per a/c (a > c).', num: (v) => [v.T2, (v.F * v.c) / v.a] },
        { latex: 'T_1\\,c - F\\,a = 0', errore: 'convenzione', spiega: 'Con ω oraria il capo collegato alla leva è il lasco T₂; T₁ va al fulcro.', num: (v) => [v.T1 * v.c, v.F * v.a] },
      ],
      num: (v) => [v.T2 * v.c, v.F * v.a],
    },
    {
      id: 'd071.5',
      latex: 'C_f = \\dfrac{a\\,R}{c}\\,F\\,(e^{f\\beta} - 1)',
      perche: 'Si sostituisce $T_2 = F a/c$: la coppia frenante cresce in modo esponenziale con $f\\beta$ e linearmente con la forza di comando.',
      fonte: P,
      distrattori: [],
      num: (v) => [v.Cf, ((v.a * v.R) / v.c) * v.F * (Math.exp(v.f * v.beta) - 1)],
    },
    {
      id: 'd071.6',
      latex: "\\omega\\ \\text{antioraria:}\\; T_1 = F\\,\\dfrac{a}{c},\\; T_2 = T_1\\,e^{-f\\beta} \\;\\Rightarrow\\; C_f' = F\\,\\dfrac{a}{c}\\,R\\,(1 - e^{-f\\beta})",
      perche: 'Invertendo il verso, l\'attrito trascina il nastro dall\'altra parte: il capo teso diventa quello sulla leva, e la leva fissa ora $T_1$. Dalla legge di Eulero $T_2 = T_1 e^{-f\\beta}$.',
      fonte: P,
      chiave: true,
      correzione: { nf: 'NF-21', dispensaScrive: 'T_2 = T_1 e^{f\\beta} \\Rightarrow C_f = F\\frac{a}{c}R(1 - e^{f\\beta})' },
      distrattori: [
        { latex: "C_f' = F\\,\\dfrac{a}{c}\\,R\\,(1 - e^{f\\beta})", errore: 'segno', spiega: 'È la riga della dispensa (NF-21): da T₁/T₂ = e^{fβ} segue T₂ = T₁e^{−fβ}; con e^{+fβ} la coppia verrebbe negativa.', num: (v) => [v.Cfa, ((v.F * v.a) / v.c) * v.R * (1 - Math.exp(v.f * v.beta))] },
        { latex: "C_f' = C_f", errore: 'concetto', spiega: 'Il verso conta: cambia quale capo è collegato alla leva.', num: (v) => [v.Cfa, v.Cf] },
      ],
      num: (v) => [v.Cfa, ((v.F * v.a) / v.c) * v.R * (1 - Math.exp(-v.f * v.beta))],
    },
    {
      id: 'd071.7',
      latex: "\\dfrac{C_f}{C_f'} = \\dfrac{e^{f\\beta} - 1}{1 - e^{-f\\beta}} = e^{f\\beta}",
      perche: 'Rapporto tra i due versi a parità di $F$: il freno è $e^{f\\beta}$ volte più efficace quando il capo collegato alla leva è il lasco. È la «direzione preferenziale» della dispensa (il suo 6,54 è $e^{f\\beta}$ per i dati dell\'esempio).',
      fonte: P,
      correzione: { nf: 'NF-21', dispensaScrive: '\\frac{e^{f\\beta}-1}{1-e^{f\\beta}} = 6{,}54' },
      distrattori: [
        { latex: "\\dfrac{C_f}{C_f'} = \\dfrac{e^{f\\beta} - 1}{1 - e^{f\\beta}}", errore: 'segno', spiega: 'Così il rapporto varrebbe −1, assurdo: è l\'errore di NF-21.', num: (v) => [v.Cf / v.Cfa, (Math.exp(v.f * v.beta) - 1) / (1 - Math.exp(v.f * v.beta))] },
      ],
      num: (v) => [v.Cf / v.Cfa, Math.exp(v.f * v.beta)],
    },
  ],
  risultato: { latex: 'C_f = \\dfrac{a R}{c}\\,F\\,(e^{f\\beta} - 1) \\quad (\\omega\\ \\text{oraria}),\\qquad \\dfrac{C_f}{C_f\'} = e^{f\\beta}', fonte: P },
  gancio: 'Nastro fermo, tutto striscia: Eulero senza centrifuga. Il capo sulla leva deve essere il lasco.',
};

// ------------------------------------------------------------------ argomento
export const frenoNastro: ArgomentoContenuto = {
  id: 'c4-freno-nastro',
  cosaDireSubito:
    'Il freno a nastro è un nastro con materiale d\'attrito avvolto su un tamburo per un angolo β: tirando il nastro con una leva lo si serra sul tamburo, e l\'attrito frena. Lo studio con l\'equazione di Eulero del flessibile, con due semplificazioni: il nastro è fermo, quindi niente forza centrifuga, e il tamburo striscia su tutto l\'arco, quindi θ* = β.',
  sistemaIpotesi: [
    'Sistema: tamburo di raggio R che ruota con velocità ω; nastro avvolto per β; leva con fulcro, capo al fulcro e capo sulla leva a braccio c, forza F a braccio a.',
    'Nastro fermo: ρV² = 0.',
    'Strisciamento su tutto l\'arco: θ* = β, rapporto delle tensioni e^{fβ}.',
    'Attrito coulombiano, f costante; masse della leva e del nastro trascurate.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Freno a nastro semplice con ω oraria (dispensa p. 153): T₁ teso al fulcro, T₂ lasco sulla leva.',
    fonte: { tipo: 'dispensa', pag: 153, fig: 'figura del libro e schizzo manoscritto' },
    elementi: [
      { id: 'tamburo', testo: 'tamburo con centro O e raggio R', obbligatorio: true },
      { id: 'omega', testo: 'verso di rotazione ω (orario come nella dispensa)', obbligatorio: true },
      { id: 'beta', testo: 'arco avvolto β', obbligatorio: true },
      { id: 'capi', testo: 'capo teso T₁ al fulcro, capo lasco T₂ sulla leva', obbligatorio: true },
      { id: 'leva', testo: 'leva con fulcro (cerniera fissa), bracci c (di T₂) e a (di F)', obbligatorio: true },
      { id: 'F', testo: 'forza di comando F all\'estremo della leva', obbligatorio: true },
      { id: 'attrito', testo: 'azioni d\'attrito sul tamburo opposte a ω', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\dfrac{T_1}{T_2} = e^{f\\beta}, \\qquad C_f = (T_1 - T_2)R, \\qquad T_2\\,c = F\\,a',
    spiegazione: 'Eulero senza centrifuga con θ* = β, equilibrio del tamburo, equilibrio della leva rispetto al fulcro.',
    fonte: { tipo: 'dispensa', pag: 153 },
  },
  dimostrazioni: ['d071'],
  significato:
    'La coppia frenante dipende esponenzialmente da fβ: basta una forza di comando piccola per frenare molto. Ma il freno non è simmetrico: se il verso di rotazione si inverte, il capo sulla leva diventa quello teso e la coppia, a parità di F, cala di e^{fβ} volte.',
  fraseDaRicordare: 'Nel freno a nastro il capo collegato alla leva deve essere il lasco: così la coppia è e^{fβ} volte più grande.',
  daNonDire: [
    { frase: 'Uso Eulero con il termine centrifugo ρV².', perche: 'Il nastro è fermo: il termine centrifugo è nullo.', fonte: { tipo: 'dispensa', pag: 153 } },
    { frase: 'Una parte dell\'arco è in aderenza.', perche: 'Il tamburo striscia sotto tutto il nastro: θ* = β.', fonte: { tipo: 'dispensa', pag: 153 } },
    { frase: 'Il verso di rotazione non conta.', perche: 'Conta: la coppia cambia di un fattore e^{fβ} (direzione preferenziale).', fonte: { tipo: 'dispensa', pag: 153 } },
    { frase: 'Nel verso antiorario T₂ = T₁ e^{fβ}.', perche: 'È l\'errore algebrico della dispensa (NF-21): T₂ = T₁ e^{−fβ}.', fonte: { tipo: 'dispensa', pag: 153 } },
  ],
  approfondimenti: [
    { domanda: 'Perché qui l\'angolo di scorrimento coincide con tutto l\'arco avvolto?', tipo: 'collegamento', argomento: 'c4-eulero', attesa: 'Nella trasmissione la cinghia si muove con la puleggia e la zona di scorrimento cresce con la coppia; nel freno il nastro è fermo e il tamburo gli striscia sotto ovunque: θ* = β, quindi il rapporto delle tensioni è il massimo possibile e^{fβ}.', fonte: { tipo: 'dispensa', pag: [142, 153] } },
    { domanda: 'Come ricavi l\'equazione di Eulero che hai usato?', tipo: 'collegamento', argomento: 'c4-eulero', attesa: 'Equilibrio del concio sulla puleggia: radiale dF_N = T dθ (senza centrifuga), tangenziale dT = f dF_N; quindi dT/T = f dθ e integrando su β si ha T₁/T₂ = e^{fβ}.', fonte: { tipo: 'dispensa', pag: [140, 142] } },
    { domanda: 'Quanto vale il rapporto tra i due versi con f = 0,3 e un giro completo di nastro?', tipo: 'approfondimento', attesa: 'e^{0,3·2π} = e^{1,885} ≈ 6,6: in un verso il freno è circa sei volte e mezzo più efficace.', fonte: { tipo: 'deduzione', da: 'p. 153', spiegazione: 'rapporto e^{fβ} con f = 0,3, β = 2π' } },
    { domanda: 'Che analogia c\'è con il ceppo avvolgente e svolgente?', tipo: 'collegamento', argomento: 'c3-ceppi', attesa: 'In entrambi i casi l\'attrito può aiutare o contrastare il comando a seconda del verso di rotazione: il freno ha una direzione in cui è più efficace.', fonte: { tipo: 'dispensa', pag: [109, 110] } },
  ],
  simboli: [
    { simbolo: 'f', significato: 'coefficiente d\'attrito nastro–tamburo', altrove: 'μ nelle risposte alle domande' },
    { simbolo: '\\beta', significato: 'angolo di avvolgimento del nastro' },
    { simbolo: 'T_1,\\ T_2', significato: 'tensione del capo teso e del capo lasco' },
    { simbolo: 'a,\\ c', significato: 'bracci di F e del capo sulla leva rispetto al fulcro', altrove: 'q11 chiama b il braccio c' },
    { simbolo: 'C_f', significato: 'coppia frenante', altrove: 'M_f in q11' },
    { simbolo: 'R', significato: 'raggio del tamburo (d = 2R nella figura)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c4-freno-nastro' }],
  previsioni: [
    {
      id: 'c4-fn-verso',
      domanda: 'A parità di forza F, se il tamburo gira al contrario (antiorario) la coppia frenante…',
      opzioni: ['resta uguale', 'diventa e^{fβ} volte più piccola', 'diventa e^{fβ} volte più grande', 'si annulla'],
      corretta: 1,
      spiega: 'Il capo sulla leva diventa il teso: la leva fissa T₁ e non più T₂, e la coppia cala di e^{fβ}.',
      verify: () => {
        const p = { F: 200, a: 0.5, c: 0.08, R: 0.15, f: 0.3, beta: 1.5 * Math.PI };
        const o = fn({ ...p, verso: 'orario' }), a = fn({ ...p, verso: 'antiorario' });
        return Math.abs(o.Cf / a.Cf - o.E) < 1e-9 ? 1 : a.Cf > o.Cf ? 2 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c4-freno-nastro' },
    },
  ],
  nf: ['NF-21'],
};
