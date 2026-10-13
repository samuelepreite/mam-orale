/**
 * C4 · Cinghia: rapporto ideale ed effettivo, scorrimento elastico, rendimento (domanda q44).
 * Dispensa pp. 131–139 (appunti battuti e manoscritto). d137 (geometria dell'avvolgimento) non è nella dispensa:
 * fonte esterna dichiarata (NF-07).
 */
import type { ArgomentoContenuto, Dimostrazione, Fonte } from '../types';
import { U } from '../../engine/num';
import { angle, arc, arrow, circle, dot, line, pt, rot, svg, text } from '../svg';
import { avvolgimento, trasmissioneReale } from '../../engine/c4';

const L = String.raw;
const D = (pag: number | [number, number]): Fonte => ({ tipo: 'dispensa', pag });
const ESTERNA_GEOM: Fonte = {
  tipo: 'esterna',
  ref: 'geometria classica delle trasmissioni a cinghia aperta e incrociata (tangenti comuni a due circonferenze)',
  nota: 'La dispensa scrive solo β₁ + β₂ = 2π e β₁ < β₂ (pp. 132–134): il calcolo degli angoli non c\'è (NF-07, NF-161).',
};

// ------------------------------------------------------------------ disegno (figura di p. 132: trasmissione aperta)
function disegno() {
  const x1 = 112, x2 = 300, y = 128, R1 = 46, R2 = 78;
  const g = avvolgimento({ R1, R2, a: x2 - x1, tipo: 'aperta' });
  const ph = (g.phi1 * 180) / Math.PI; // angolo (gradi) dei punti di tangenza superiori
  const [p1x, p1y] = pt(x1, y, R1, ph), [q1x, q1y] = pt(x1, y, R1, -ph);
  const [p2x, p2y] = pt(x2, y, R2, ph), [q2x, q2y] = pt(x2, y, R2, -ph);
  const mid = (a: number, b: number, s: number) => a + (b - a) * s;
  return svg(420, 262, [
    circle(x1, y, R1, 'l'), circle(x2, y, R2, 'l'),
    line(x1, y - R1 - 12, x1, y + R1 + 12, 'd'), line(x2, y - R2 - 12, x2, y + R2 + 12, 'd'),
    // cinghia: archi avvolti e rami
    arc(x1, y, R1 + 3, ph, 360 - ph, 'a'), arc(x2, y, R2 + 3, -ph, ph, 'a'),
    line(p1x, p1y - 3, p2x, p2y - 3, 'a', 3), line(q1x, q1y + 3, q2x, q2y + 3, 'a', 3),
    dot(x1, y, 'O₁', -14, 14), dot(x2, y, 'O₂', 14, 14),
    dot(p1x, p1y, 'P₁', -4, -14), dot(q1x, q1y, 'Q₁', -4, 15), dot(p2x, p2y, 'P₂', 6, -14), dot(q2x, q2y, 'Q₂', 6, 15),
    // velocità dei rami: sopra verso sinistra (entra in P₁), sotto verso destra
    arrow(mid(p1x, p2x, 0.62), mid(p1y, p2y, 0.62) - 14, mid(p1x, p2x, 0.38), mid(p1y, p2y, 0.38) - 14, 'v', 'V', 0, -10),
    arrow(mid(q1x, q2x, 0.38), mid(q1y, q2y, 0.38) + 14, mid(q1x, q2x, 0.62), mid(q1y, q2y, 0.62) + 14, 'v', 'V', 0, 12),
    text(mid(p1x, p2x, 0.5) + 30, mid(p1y, p2y, 0.5) + 12, 'T₁ (teso)', { c: 'f', size: 12 }),
    text(mid(q1x, q2x, 0.5) + 30, mid(q1y, q2y, 0.5) - 12, 'T₂ (lasco)', { c: 'f', size: 12 }),
    // velocità angolari antiorarie, coppia motrice concorde, resistente opposta
    rot(x1, y, R1 + 16, 196, 236, 'v', 'ω₁'), rot(x2, y, R2 + 14, -22, 18, 'v', 'ω₂'),
    rot(x1, y, 20, 40, 140, 'f', 'C₁'), rot(x2, y, 26, 140, 40, 'f', 'C₂'),
    angle(x1, y, 30, 180 - 40, 180 + 40, 'β₁', 'a'), angle(x2, y, 40, -40, 40, 'β₂', 'a'),
    text(x1, y + R1 + 34, 'motrice R₁', { c: 'm', size: 12 }), text(x2, y + R2 + 26, 'condotta R₂', { c: 'm', size: 12 }),
  ], 'Trasmissione a cinghia aperta: motrice piccola a sinistra, condotta grande a destra, ramo teso sopra');
}

// ------------------------------------------------------------------ d055 rapporto di trasmissione ideale
export const d055: Dimostrazione = {
  id: 'd055',
  titolo: 'Rapporto di trasmissione ideale',
  enunciato: 'Ricavare il rapporto di trasmissione di una cinghia ideale (senza slittamenti) e il rapporto tra le coppie.',
  ipotesi: [
    'flessibile ideale: rigidezza flessionale nulla (EJ ≅ 0), cinghia rigida longitudinalmente (nessun allungamento)',
    'nessuno slittamento tra cinghia e pulegge; pulegge cilindriche di raggi costanti',
    'regime: ω̇ = 0; coppie in modulo, C₁ concorde a ω₁ (motrice), C₂ opposta a ω₂ (condotta)',
  ],
  sample: (rnd) => {
    const R1 = U(rnd, 0.05, 0.2), R2 = U(rnd, 0.1, 0.45), w1 = U(rnd, 50, 300), T2 = U(rnd, 50, 300), C1 = U(rnd, 5, 60);
    const V = w1 * R1, w2 = V / R2, T1 = T2 + C1 / R1, C2 = (T1 - T2) * R2;
    return { R1, R2, w1, T2, C1, V, w2, T1, C2 };
  },
  passi: [
    {
      id: 'd055.1',
      latex: L`\underline V_{P_1} = \underline V_{Q_1} = \omega_1 R_1\,\underline t_1 = V_1\,\underline t_1`,
      perche: L`Ogni punto della periferia della motrice ha velocità $\omega_1 R_1$ lungo la tangente. Dove la cinghia aderisce, ha la stessa velocità della periferia.`,
      fonte: D(134),
      distrattori: [],
      num: (v) => [v.V, v.w1 * v.R1],
    },
    {
      id: 'd055.2',
      latex: L`\underline V_{P_2} = \underline V_{Q_2} = \omega_2 R_2\,\underline t_2 = V_2\,\underline t_2`,
      perche: L`Lo stesso sulla condotta: la velocità periferica è $\omega_2 R_2$.`,
      fonte: D(134),
      distrattori: [],
      num: (v) => [v.V, v.w2 * v.R2],
    },
    {
      id: 'd055.3',
      latex: L`V = \omega_1 R_1 = \omega_2 R_2`,
      perche: L`La cinghia è unica e continua, non si allunga e non slitta: ha la stessa velocità $V$ in ogni punto, quindi le due velocità periferiche coincidono.`,
      fonte: D(132),
      chiave: true,
      distrattori: [
        { latex: L`\omega_1 R_2 = \omega_2 R_1`, errore: 'indice', spiega: 'Ogni velocità angolare va con il raggio della sua puleggia: V = ω₁R₁ = ω₂R₂.', num: (v) => [v.w1 * v.R2, v.w2 * v.R1] },
        { latex: L`\omega_1 = \omega_2`, errore: 'concetto', spiega: 'È uguale la velocità lineare della cinghia, non quella angolare: con raggi diversi le pulegge girano a velocità diverse.', num: (v) => [v.w1, v.w2] },
      ],
      num: (v) => [v.w1 * v.R1, v.w2 * v.R2],
    },
    {
      id: 'd055.4',
      latex: L`\tau^{ID} = \dfrac{\omega_2}{\omega_1} = \dfrac{R_1}{R_2}`,
      perche: L`Rapporto di trasmissione della dispensa: uscita su entrata, $\tau = \omega_{condotta}/\omega_{motrice}$. Da $\omega_1R_1 = \omega_2R_2$ segue il rapporto inverso dei raggi.`,
      fonte: D(132),
      chiave: true,
      distrattori: [
        { latex: L`\tau^{ID} = \dfrac{\omega_2}{\omega_1} = \dfrac{R_2}{R_1}`, errore: 'indice', spiega: 'La puleggia più piccola gira più in fretta: ω₂/ω₁ = R₁/R₂.', num: (v) => [v.w2 / v.w1, v.R2 / v.R1] },
        { latex: L`\tau^{ID} = \dfrac{\omega_1}{\omega_2} = \dfrac{R_1}{R_2}`, errore: 'convenzione', spiega: 'Nella dispensa τ = ω₂/ω₁ (uscita/entrata). Il rapporto ω₁/ω₂ di d055 è 1/τ e vale R₂/R₁ (NF-175).', num: (v) => [v.w1 / v.w2, v.R1 / v.R2] },
      ],
      num: (v) => [v.w2 / v.w1, v.R1 / v.R2],
    },
    {
      id: 'd055.5',
      latex: L`R_M > R_C \Rightarrow \tau^{ID} > 1\ \text{(moltiplicatore di giri)},\qquad R_M < R_C \Rightarrow \tau^{ID} < 1\ \text{(riduttore)}`,
      perche: L`Lettura del risultato: se la motrice è più grande, l'albero condotto fa più giri di quello motore.`,
      fonte: D(132),
      distrattori: [],
    },
    {
      id: 'd055.6',
      latex: L`-T_1 R_1 + C_1 + T_2 R_1 = 0 \;\Rightarrow\; C_1 = (T_1 - T_2)\,R_1`,
      perche: L`Seconda cardinale della motrice rispetto a $O_1$, con i rami tagliati: entrambe le tensioni hanno braccio $R_1$. Se $C_1 \neq 0$ allora $T_1 \neq T_2$: per trasmettere coppia i rami devono avere tensioni diverse.`,
      fonte: D(134),
      chiave: true,
      correzione: { nf: 'NF-35', dispensaScrive: L`-T_1 R_1 + C_1 + T_2 R_2 = 0` },
      distrattori: [
        { latex: L`C_1 = (T_1 + T_2)\,R_1`, errore: 'segno', spiega: 'I due rami tirano in versi opposti rispetto a O₁: i momenti si sottraggono.', num: (v) => [v.C1, (v.T1 + v.T2) * v.R1] },
        { latex: L`-T_1 R_1 + C_1 + T_2 R_2 = 0`, errore: 'indice', spiega: 'È la riga della dispensa (NF-35): il braccio di T₂ rispetto a O₁ è R₁, non R₂.', num: (v) => [-v.T1 * v.R1 + v.C1 + v.T2 * v.R2, 0] },
      ],
      num: (v) => [v.C1, (v.T1 - v.T2) * v.R1],
    },
    {
      id: 'd055.7',
      latex: L`T_1 R_2 - C_2 - T_2 R_2 = 0 \;\Rightarrow\; C_2 = (T_1 - T_2)\,R_2`,
      perche: L`Stessa equazione sulla condotta: le tensioni dei rami sono le stesse (la cinghia è una sola), i bracci sono $R_2$.`,
      fonte: D(134),
      distrattori: [],
      num: (v) => [v.C2, (v.T1 - v.T2) * v.R2],
    },
    {
      id: 'd055.8',
      latex: L`\dfrac{C_1}{C_2} = \dfrac{(T_1 - T_2)R_1}{(T_1 - T_2)R_2} = \dfrac{R_1}{R_2} = \dfrac{\omega_2}{\omega_1} = \tau^{ID}`,
      perche: L`Rapporto delle due equazioni di equilibrio: la differenza di tensione si semplifica. Nel caso ideale il rapporto delle coppie è uguale al rapporto di trasmissione.`,
      fonte: D(134),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{C_1}{C_2} = \dfrac{R_2}{R_1}`, errore: 'indice', spiega: 'La coppia è proporzionale al raggio: la puleggia grande ha la coppia grande.', num: (v) => [v.C1 / v.C2, v.R2 / v.R1] },
        { latex: L`C_1 = C_2`, errore: 'concetto', spiega: 'Uguale è la differenza di tensione, non la coppia: i bracci sono diversi.', num: (v) => [v.C1, v.C2] },
      ],
      num: (v) => [v.C1 / v.C2, v.w2 / v.w1],
    },
  ],
  risultato: { latex: L`\tau^{ID} = \dfrac{\omega_2}{\omega_1} = \dfrac{R_1}{R_2} = \dfrac{C_1}{C_2}`, fonte: D([132, 134]) },
  gancio: 'Una sola cinghia, una sola velocità: ω₁R₁ = ω₂R₂. Una sola differenza di tensione: C₁/R₁ = C₂/R₂.',
};

// ------------------------------------------------------------------ d056 curvatura della cinghia ideale
export const d056: Dimostrazione = {
  id: 'd056',
  titolo: 'Curvatura della cinghia ideale e accelerazione centripeta',
  enunciato: 'Descrivere come cambia la curvatura lungo la cinghia ideale e ricavare l\'accelerazione e la forza centrifuga di un elemento avvolto.',
  ipotesi: [
    'flessibile ideale (EJ ≅ 0): la cinghia cambia curvatura senza resistenza e senza lavoro',
    'velocità V della cinghia costante; nel tratto avvolto l\'elemento si muove con la puleggia',
  ],
  sample: (rnd) => {
    const R1 = U(rnd, 0.04, 0.25), R2 = U(rnd, 0.26, 0.5), V = U(rnd, 5, 35), rho = U(rnd, 0.1, 0.6), m = U(rnd, 0.001, 0.05), dth = U(rnd, 0.001, 0.02);
    const w1 = V / R1, an = w1 * w1 * R1, dm = rho * R1 * dth, Fc = m * an;
    return { R1, R2, V, rho, m, dth, w1, an, dm, Fc };
  },
  passi: [
    {
      id: 'd056.1',
      latex: L`k_{ramo} = 0,\qquad k_{avv} = \dfrac{1}{R_1}`,
      perche: L`Nel ramo libero la cinghia è rettilinea (curvatura nulla); appena tocca la puleggia in $P_1$ prende la curvatura della puleggia, e la tiene fino a $Q_1$.`,
      fonte: D(133),
      distrattori: [],
    },
    {
      id: 'd056.2',
      latex: L`\Delta k = \dfrac{1}{R_1} - 0 \ \text{a gradino in}\ P_1, Q_1, P_2, Q_2`,
      perche: L`Nel modello ideale la curvatura salta istantaneamente nei quattro punti di tangenza: è una variazione discontinua, «a gradino».`,
      fonte: D(133),
      distrattori: [],
    },
    {
      id: 'd056.3',
      latex: L`\omega_1 = \dfrac{V}{R_1} \;\Rightarrow\; a_n = \omega_1^2 R_1 = \dfrac{V^2}{R_1}\ \text{(verso } O_1)`,
      perche: L`L'elemento avvolto percorre una circonferenza di raggio $R_1$ a velocità costante $V$: l'accelerazione tangenziale è nulla ma quella normale no, ed è diretta verso il centro.`,
      fonte: { tipo: 'deduzione', da: 'p. 134 (F = mv²/r) e cinematica del moto circolare uniforme', spiegazione: 'La dispensa scrive direttamente la forza centrifuga mv²/r; l\'accelerazione normale V²/R è quella del punto in moto circolare uniforme.' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`a_n = 0\ \text{perché } V = \text{cost}`, errore: 'concetto', spiega: 'È costante il modulo della velocità, non la sua direzione: su una traiettoria curva l\'accelerazione normale c\'è.', num: (v) => [v.an, 0] },
        { latex: L`a_n = V^2 R_1`, errore: 'fattore', spiega: 'Dimensionalmente sbagliata: l\'accelerazione normale è V²/R (o ω²R).', num: (v) => [v.an, v.V * v.V * v.R1] },
      ],
      num: (v) => [v.an, (v.V * v.V) / v.R1],
    },
    {
      id: 'd056.4',
      latex: L`F = \dfrac{m\,V^2}{R_1}`,
      perche: L`Visto dalla cinghia (D'Alembert) l'elemento sente una forza centrifuga che nel ramo era nulla e che sulla puleggia vale di colpo $mV^2/R_1$: è l'analogia della dispensa.`,
      fonte: D(134),
      chiave: true,
      distrattori: [
        { latex: L`F = \dfrac{m\,V^2}{2R_1}`, errore: 'fattore', spiega: 'Niente 1/2: la forza è massa per accelerazione normale V²/R. (Un «/2» compare per refuso a p. 141, NF-35.)', num: (v) => [v.Fc, (v.m * v.V * v.V) / (2 * v.R1)] },
        { latex: L`F = 0 \ \text{perché } V \text{ è costante}`, errore: 'concetto', spiega: 'Velocità costante in modulo non vuol dire accelerazione nulla: su una curva c\'è l\'accelerazione normale.', num: (v) => [v.Fc, 0] },
        { latex: L`F = \dfrac{m\,V^2}{R_2}`, errore: 'indice', spiega: 'Sulla motrice il raggio di curvatura è R₁; sulla condotta la forza è più piccola perché R₂ > R₁.', num: (v) => [v.Fc, (v.m * v.V * v.V) / v.R2] },
      ],
      num: (v) => [v.Fc, (v.m * v.V * v.V) / v.R1],
    },
    {
      id: 'd056.5',
      latex: L`\Delta F = \dfrac{mV^2}{R_1} \ \text{in un istante} \;\Rightarrow\; \text{raccordi parabolici}`,
      perche: L`Un salto istantaneo di forza (e di curvatura) non è realizzabile: nella realtà, con la piccola rigidezza flessionale, darebbe forze interne molto elevate. Si introducono curve di raccordo che rendono graduale la variazione del raggio di curvatura.`,
      fonte: D([133, 134]),
      distrattori: [],
    },
    {
      id: 'd056.6',
      latex: L`dm = \rho R_1\,d\theta \;\Rightarrow\; dF_c = dm\,\dfrac{V^2}{R_1} = \rho V^2\,d\theta`,
      perche: L`Per un concio di apertura $d\theta$ la massa è $\rho R_1 d\theta$ ($\rho$ massa per unità di lunghezza): la forza centrifuga per unità d'angolo è $\rho V^2$, indipendente dal raggio. È il termine che entra nell'equazione di Eulero.`,
      fonte: D(141),
      aggiunto: true,
      distrattori: [],
      num: (v) => [(v.dm * v.V * v.V) / v.R1, v.rho * v.V * v.V * v.dth],
    },
  ],
  risultato: { latex: L`a_n = \dfrac{V^2}{R},\qquad dF_c = \rho V^2\,d\theta`, fonte: D([133, 134]) },
  gancio: 'Dritto: k = 0, niente centrifuga. Sulla puleggia: k = 1/R e mV²/R di colpo. Per questo servono i raccordi.',
};

// ------------------------------------------------------------------ d058 teorema delle forze vive
export const d058: Dimostrazione = {
  id: 'd058',
  titolo: 'Teorema delle forze vive applicato alla trasmissione',
  enunciato: 'Applicare il bilancio di potenza alla trasmissione, nel caso ideale e nel caso reale con potenza dissipata, e ricavare il legame tra coppie, rapporto e rendimento.',
  ipotesi: [
    'regime (ω̇ = 0): l\'energia cinetica non cambia, la somma delle potenze è nulla',
    'forze d\'inerzia nulle; caso ideale: rendimento unitario, potenza dissipata nulla',
    'caso reale: potenza dissipata per attrito W_diss < 0; coppie algebriche (C₂ opposta a ω₂, C₂ω₂ < 0)',
  ],
  sample: (rnd) => {
    const R1 = U(rnd, 0.05, 0.2), R2 = U(rnd, 0.1, 0.45), w1 = U(rnd, 50, 300), T2 = U(rnd, 50, 300), C1 = U(rnd, 5, 60), eta = U(rnd, 0.9, 0.995);
    const tauId = R1 / R2, w2id = w1 * tauId, T1 = T2 + C1 / R1, C2 = (T1 - T2) * R2, tau = eta * tauId, w2 = tau * w1;
    const Wd = -(C1 * w1 - C2 * w2);
    return { R1, R2, w1, T2, C1, eta, tauId, w2id, T1, C2, tau, w2, Wd };
  },
  passi: [
    {
      id: 'd058.1',
      latex: L`\dfrac{dE_c}{dt} = \sum W = 0 \qquad (\dot\omega = 0)`,
      perche: L`Teorema delle forze vive per l'intera trasmissione (pulegge e cinghia) in condizioni stazionarie: l'energia cinetica è costante, quindi la somma delle potenze è zero.`,
      fonte: D([135, 150]),
      distrattori: [],
    },
    {
      id: 'd058.2',
      latex: L`C_1\omega_1 - C_2\,\omega_2 = 0 \;\Rightarrow\; \dfrac{C_1}{C_2} = \dfrac{\omega_2}{\omega_1} = \tau_{ID}`,
      perche: L`Caso ideale: forze d'inerzia nulle e rendimento unitario, nessuna potenza dissipata. La coppia motrice fa potenza positiva, quella resistente (in modulo, opposta a $\omega_2$) negativa.`,
      fonte: D(135),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{C_1}{C_2} = \dfrac{\omega_1}{\omega_2}`, errore: 'indice', spiega: 'La potenza si conserva: dove la velocità è più alta la coppia è più bassa, quindi C₁/C₂ = ω₂/ω₁.', num: (v) => [v.C1 / v.C2, v.w1 / v.w2id] },
        { latex: L`C_1\omega_1 + C_2\omega_2 = 0\ \text{(moduli)}`, errore: 'segno', spiega: 'Con i moduli la potenza della coppia resistente va col meno; col più servono coppie algebriche.', num: (v) => [v.C1 * v.w1 + v.C2 * v.w2id, 0] },
      ],
      num: (v) => [v.C1 / v.C2, v.w2id / v.w1],
    },
    {
      id: 'd058.3',
      latex: L`\dfrac{C_2}{C_1} = \dfrac{1}{\tau_{ID}} \;\Rightarrow\; \tau < 1:\ \omega_1 > \omega_2,\ C_2 > C_1`,
      perche: L`Un riduttore di velocità è un moltiplicatore di coppia; un moltiplicatore di giri è un riduttore di coppia.`,
      fonte: D(135),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{C_2}{C_1} = \tau_{ID}`, errore: 'indice', spiega: 'Così un riduttore di giri ridurrebbe anche la coppia, e la potenza non si conserverebbe.', num: (v) => [v.C2 / v.C1, v.tauId] },
        { latex: L`\tau < 1 \Rightarrow C_2 < C_1`, errore: 'concetto', spiega: 'Se l\'uscita gira più piano, a parità di potenza deve avere più coppia.' },
      ],
      num: (v) => [v.C2 / v.C1, 1 / v.tauId],
    },
    {
      id: 'd058.4',
      latex: L`\underset{>0}{C_1\omega_1} + \underset{<0}{C_2\omega_2} + \underset{<0}{W^{ATTR}_{DISS}} = 0`,
      perche: L`Caso reale, coppie algebriche: la potenza motrice entra, quella resistente esce, la potenza dissipata dall'attrito è negativa. Con la convenzione di p. 134 ($C_2$ opposta a $\omega_2$) il prodotto $C_2\omega_2$ è negativo.`,
      fonte: D(139),
      chiave: true,
      correzione: { nf: 'NF-35', dispensaScrive: L`\underset{>0}{C_1\omega_1} + \underset{>0}{C_2\omega_2} + \underset{<0}{\mathcal P_{DISSIPATA}} = 0\ \ \text{(p. 135)}` },
      distrattori: [
        { latex: L`\underset{>0}{C_1\omega_1} + \underset{>0}{C_2\omega_2} + \underset{<0}{\mathcal P_d} = 0`, errore: 'segno', spiega: 'È la riga di p. 135 (NF-35): due potenze positive e una negativa piccola non danno zero; la potenza resistente è negativa.', num: (v) => [v.C1 * v.w1 + v.C2 * v.w2 + v.Wd, 0] },
        { latex: L`C_1\omega_1 - C_2\omega_2 = 0`, errore: 'termine-perso', spiega: 'Nel caso reale manca la potenza dissipata: senza di essa η = 1.', num: (v) => [v.C1 * v.w1 - v.C2 * v.w2, 0] },
      ],
      num: (v) => [v.C1 * v.w1 + -v.C2 * v.w2 + v.Wd, 0],
    },
    {
      id: 'd058.5',
      latex: L`W^{ATTR}_{DISS} = -(1-\eta)\,C_1\omega_1 < 0`,
      perche: L`Per definizione di rendimento la potenza che arriva all'utilizzatore è $\eta C_1\omega_1$: il complemento a uno, $(1-\eta)C_1\omega_1$, è dissipato. È negativo, perciò il meno.`,
      fonte: D(139),
      distrattori: [],
      num: (v) => [v.Wd, -(1 - v.eta) * v.C1 * v.w1],
    },
    {
      id: 'd058.6',
      latex: L`\eta\,C_1\omega_1 + C_2\omega_2 = 0 \;\Rightarrow\; \dfrac{C_1}{C_2} = -\dfrac{\omega_2}{\omega_1}\,\dfrac{1}{\eta} = -\dfrac{\tau}{\eta}`,
      perche: L`Si sostituisce la potenza dissipata nel bilancio; con coppie algebriche il rapporto è negativo. Se $\eta = 1$ si ritrova $C_1/C_2 = -\tau^{ID}$.`,
      fonte: D(139),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{C_1}{C_2} = -\tau\,\eta`, errore: 'fattore', spiega: 'Dal bilancio ηC₁ω₁ = −C₂ω₂ il rendimento va al denominatore.', num: (v) => [v.C1 / -v.C2, -v.tau * v.eta] },
        { latex: L`\dfrac{C_1}{C_2} = +\dfrac{\tau}{\eta}`, errore: 'segno', spiega: 'A p. 139 le coppie sono algebriche e hanno segni opposti: il rapporto è negativo (il più vale tra i moduli).', num: (v) => [v.C1 / -v.C2, v.tau / v.eta] },
      ],
      num: (v) => [v.C1 / -v.C2, -v.tau / v.eta],
    },
    {
      id: 'd058.7',
      latex: L`\tau = \eta\,\dfrac{C_1}{C_2}\quad\text{(moduli)}`,
      perche: L`In modulo: $\eta = |C_2\omega_2|/|C_1\omega_1| = (C_2/C_1)\,\tau$, con $\tau$ il rapporto effettivo $\omega_2/\omega_1$. Il rapporto di trasmissione dipende dal rendimento.`,
      fonte: D(135),
      correzione: { nf: 'NF-162', dispensaScrive: L`\eta = \frac{C_2}{C_1}\,\tau^{ID}` },
      distrattori: [],
      num: (v) => [v.tau, (v.eta * v.C1) / v.C2],
    },
  ],
  risultato: { latex: L`\text{ideale: } \dfrac{C_1}{C_2} = \tau_{ID};\qquad \text{reale: } \tau = \eta\,\dfrac{C_1}{C_2},\ \ W_{diss} = -(1-\eta)C_1\omega_1`, fonte: D([135, 139]) },
  gancio: 'La potenza entra, una parte si perde, il resto esce: ηC₁ω₁ = |C₂ω₂|.',
};

// ------------------------------------------------------------------ d059 allungamento elastico e velocità dei rami
export const d059: Dimostrazione = {
  id: 'd059',
  titolo: 'Allungamento elastico e velocità dei rami',
  enunciato: 'Mostrare che un tratto di cinghia con tensione T si muove con velocità V = V₀(1 + T/EA), quindi il ramo teso è più veloce del lasco.',
  ipotesi: [
    'cinghia elastica lineare a trazione: T = EAε (legame costitutivo di Hooke)',
    'regime stazionario: in ogni sezione transita sempre la stessa massa di cinghia nell\'unità di tempo',
    'V₀ = dℓ₀/dt: velocità con cui scorre la lunghezza indeformata (cinghia scarica)',
  ],
  sample: (rnd) => {
    const EA = U(rnd, 2e4, 2e5), T2 = U(rnd, 50, 300), T1 = T2 + U(rnd, 100, 1500), V0 = U(rnd, 5, 30);
    const z = U(rnd, 0, 1), dz = U(rnd, 1e-3, 1e-2), w0 = U(rnd, 0, 1e-3);
    const eps = T1 / EA, wz = w0 + eps * z, wzd = w0 + eps * (z + dz);
    const dl = wzd + z + dz - (wz + z), dw = wzd - wz;
    const dt = dz / V0, V = dl / dt, V1 = V0 * (1 + T1 / EA), V2 = V0 * (1 + T2 / EA);
    return { EA, T1, T2, V0, z, dz, w0, eps, wz, wzd, dl, dw, dt, V, V1, V2 };
  },
  passi: [
    {
      id: 'd059.1',
      latex: L`d\ell = \big[w(z+dz) + z + dz\big] - \big[w(z) + z\big] = dz + dw`,
      perche: L`Elementino di lunghezza indeformata $dz$: i suoi estremi si spostano di $w(z)$ e $w(z+dz)$. La lunghezza deformata è la differenza delle posizioni finali.`,
      fonte: D(138),
      distrattori: [],
      num: (v) => [v.dl, v.dz + v.dw],
    },
    {
      id: 'd059.2',
      latex: L`\varepsilon = \dfrac{w(z+dz) - w(z)}{dz} = \dfrac{dw}{dz} = w'(z)`,
      perche: L`Legame di congruenza: la deformazione è l'allungamento relativo dell'elementino.`,
      fonte: D(138),
      distrattori: [],
      num: (v) => [(v.wzd - v.wz) / v.dz, v.eps],
    },
    {
      id: 'd059.3',
      latex: L`T = EA\,\varepsilon`,
      perche: L`Legame costitutivo (Hooke) nella direzione della trazione. La cinghia lavora solo a trazione.`,
      fonte: D([131, 138]),
      distrattori: [],
    },
    {
      id: 'd059.4',
      latex: L`d\ell = dz\,(1+\varepsilon) = dz\left(1 + \dfrac{T}{EA}\right)`,
      perche: L`Si mettono insieme congruenza e Hooke: più tensione, elemento più lungo.`,
      fonte: D(138),
      chiave: true,
      distrattori: [
        { latex: L`d\ell = dz\left(1 - \dfrac{T}{EA}\right)`, errore: 'segno', spiega: 'La trazione allunga l\'elemento, non lo accorcia.', num: (v) => [v.dl, v.dz * (1 - v.T1 / v.EA)] },
        { latex: L`d\ell = dz\,\dfrac{T}{EA}`, errore: 'termine-perso', spiega: 'Questo è solo l\'allungamento dw; la lunghezza deformata è dz + dw.', num: (v) => [v.dl, (v.dz * v.T1) / v.EA] },
      ],
      num: (v) => [v.dl, v.dz * (1 + v.T1 / v.EA)],
    },
    {
      id: 'd059.5',
      latex: L`dt = \dfrac{d\ell_0}{V_0} \;\Rightarrow\; V = \dfrac{d\ell}{dt} = \dfrac{d\ell_0}{dt}\left(1 + \dfrac{T}{EA}\right) = V_0\left(1 + \dfrac{T}{EA}\right)`,
      perche: L`Conservazione della massa: nello stesso $dt$ passa per ogni sezione la stessa massa, cioè la stessa lunghezza indeformata $d\ell_0 = dz$. Dove la cinghia è più allungata quella massa occupa più lunghezza, quindi corre più veloce.`,
      fonte: D(138),
      chiave: true,
      distrattori: [
        { latex: L`V = \dfrac{V_0}{1 + T/EA}`, errore: 'concetto', spiega: 'Più tensione vuol dire più lunghezza per la stessa massa: la velocità cresce, non cala.', num: (v) => [v.V, v.V0 / (1 + v.T1 / v.EA)] },
        { latex: L`V = V_0`, errore: 'ipotesi', spiega: 'Vale solo per una cinghia inestensibile (EA → ∞), cioè nel caso ideale.', num: (v) => [v.V, v.V0] },
      ],
      num: (v) => [v.V, v.V0 * (1 + v.T1 / v.EA)],
    },
    {
      id: 'd059.6',
      latex: L`\dfrac{V_1}{V_2} = \dfrac{1 + T_1/EA}{1 + T_2/EA} > 1`,
      perche: L`La tensione lungo la cinghia varia fra $T_1$ e $T_2$: il ramo teso ha la velocità massima, il lasco la minima. Poiché i due rami devono percorrere lo stesso spazio nello stesso tempo, il ramo allungato va più veloce.`,
      fonte: D([136, 138]),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{V_1}{V_2} = \dfrac{1 + T_2/EA}{1 + T_1/EA}`, errore: 'indice', spiega: 'Il ramo teso è il più veloce: T₁ va al numeratore.', num: (v) => [v.V1 / v.V2, (1 + v.T2 / v.EA) / (1 + v.T1 / v.EA)] },
        { latex: L`\dfrac{V_1}{V_2} = \dfrac{T_1}{T_2}`, errore: 'termine-perso', spiega: 'Manca l\'1 della lunghezza indeformata: la differenza di velocità è piccola, dell\'ordine di T/EA.', num: (v) => [v.V1 / v.V2, v.T1 / v.T2] },
      ],
      num: (v) => [v.V1 / v.V2, (1 + v.T1 / v.EA) / (1 + v.T2 / v.EA)],
    },
    {
      id: 'd059.7',
      latex: L`V_0 = \dfrac{V_1}{1 + T_1/EA} = \dfrac{V_2}{1 + T_2/EA}`,
      perche: L`$V_0$ è la stessa per tutti i tratti: è la velocità della cinghia scarica (portata $d\ell_0/dt$). Non è la velocità a coppia nulla: con $C = 0$ la cinghia è comunque tesa da $T_0$ (NF-164).`,
      fonte: D(138),
      distrattori: [],
      num: (v) => [v.V1 / (1 + v.T1 / v.EA), v.V2 / (1 + v.T2 / v.EA)],
    },
  ],
  risultato: { latex: L`V = V_0\left(1 + \dfrac{T}{EA}\right),\qquad V_1 > V_2`, fonte: D(138) },
  gancio: 'Stessa massa al secondo: dove la cinghia è più lunga, corre di più.',
};

// ------------------------------------------------------------------ d060 rapporto di trasmissione reale
const sampleReale = (rnd: () => number) => {
  const R1 = U(rnd, 0.05, 0.2), R2 = U(rnd, 0.1, 0.45), EA = U(rnd, 5e3, 5e4), T2 = U(rnd, 50, 300), C1 = U(rnd, 5, 60), w1 = U(rnd, 50, 300);
  const r = trasmissioneReale({ R1, R2, EA, T2, C1, omega1: w1 });
  return { R1, R2, EA, T2, C1, w1, T1: r.T1, V0: r.V0, V1: r.V1, V2: r.V2, w2: r.omega2, tau: r.tau, tauId: r.tauId, C2: r.C2, eta: r.eta };
};

export const d060: Dimostrazione = {
  id: 'd060',
  titolo: 'Rapporto di trasmissione reale (scorrimento elastico)',
  enunciato: 'Ricavare il rapporto di trasmissione effettivo di una cinghia elastica e confrontarlo con quello ideale.',
  ipotesi: [
    'V = V₀(1 + T/EA) in ogni tratto (d059)',
    'nell\'arco di aderenza la cinghia si muove con la puleggia; l\'aderenza è all\'ingresso di ogni puleggia (pp. 144, 146)',
    'tensioni dei rami: T₁ teso, T₂ lasco, con C₁ = (T₁ − T₂)R₁',
  ],
  sample: sampleReale,
  passi: [
    {
      id: 'd060.1',
      latex: L`\omega_1 R_1 = V_1 = V_0\left(1 + \dfrac{T_1}{EA}\right)`,
      perche: L`Sulla motrice la cinghia entra in $P_1$ dal ramo teso e vi resta aderente: in quel tratto ha tensione $T_1$ e la stessa velocità della periferia.`,
      fonte: D(138),
      distrattori: [],
      num: (v) => [v.w1 * v.R1, v.V0 * (1 + v.T1 / v.EA)],
    },
    {
      id: 'd060.2',
      latex: L`\omega_2 R_2 = V_2 = V_0\left(1 + \dfrac{T_2}{EA}\right)`,
      perche: L`Sulla condotta la cinghia entra dal ramo lasco e vi aderisce con tensione $T_2$: la periferia della condotta va alla velocità del ramo lasco. Il passaggio da $T_1$ a $T_2$ (e viceversa) avviene negli archi di scorrimento.`,
      fonte: D(138),
      chiave: true,
      distrattori: [
        { latex: L`\omega_2 R_2 = V_0\left(1 + \dfrac{T_1}{EA}\right)`, errore: 'indice', spiega: 'La condotta è trascinata dal tratto aderente, che è quello d\'ingresso: il ramo lasco, con T₂.', num: (v) => [v.w2 * v.R2, v.V0 * (1 + v.T1 / v.EA)] },
        { latex: L`\omega_2 R_2 = \omega_1 R_1`, errore: 'ipotesi', spiega: 'Vale solo per la cinghia inestensibile (caso ideale): con EA finito le due velocità periferiche differiscono.', num: (v) => [v.w2 * v.R2, v.w1 * v.R1] },
      ],
      num: (v) => [v.w2 * v.R2, v.V0 * (1 + v.T2 / v.EA)],
    },
    {
      id: 'd060.3',
      latex: L`\tau = \dfrac{\omega_2}{\omega_1} = \dfrac{R_1}{R_2}\,\dfrac{1 + T_2/EA}{1 + T_1/EA}`,
      perche: L`Si dividono membro a membro le due relazioni: $V_0$ si semplifica. Il primo fattore è $\tau^{ID}$.`,
      fonte: D(138),
      chiave: true,
      distrattori: [
        { latex: L`\tau = \dfrac{R_1}{R_2}\,\dfrac{1 + T_1/EA}{1 + T_2/EA}`, errore: 'indice', spiega: 'Così τ verrebbe maggiore dell\'ideale: la condotta va con il lasco, quindi T₂ sta al numeratore.', num: (v) => [v.tau, ((v.R1 / v.R2) * (1 + v.T1 / v.EA)) / (1 + v.T2 / v.EA)] },
        { latex: L`\tau = \dfrac{R_2}{R_1}\,\dfrac{1 + T_2/EA}{1 + T_1/EA}`, errore: 'convenzione', spiega: 'τ = ω₂/ω₁: il rapporto dei raggi è R₁/R₂ (NF-09).', num: (v) => [v.tau, ((v.R2 / v.R1) * (1 + v.T2 / v.EA)) / (1 + v.T1 / v.EA)] },
      ],
      num: (v) => [v.tau, ((v.R1 / v.R2) * (1 + v.T2 / v.EA)) / (1 + v.T1 / v.EA)],
    },
    {
      id: 'd060.4',
      latex: L`C_1 = 0 \;\Rightarrow\; T_1 = T_2 \;\Rightarrow\; \tau = \dfrac{R_1}{R_2} = \tau^{ID}`,
      perche: L`Senza coppia le tensioni sono uguali, tutto l'arco è in aderenza, lo strisciamento è nullo e la potenza dissipata è zero.`,
      fonte: D(138),
      distrattori: [],
      num: (v) => [((v.R1 / v.R2) * (1 + v.T2 / v.EA)) / (1 + v.T2 / v.EA), v.tauId],
    },
    {
      id: 'd060.5',
      latex: L`\dfrac{\tau}{\tau^{ID}} = 1 - \dfrac{T_1 - T_2}{EA + T_1} = 1 - \dfrac{C_1}{R_1\,(EA + T_1)} < 1`,
      perche: L`Con coppia le tensioni si dividono e $\tau$ scende sotto l'ideale; scende tanto più quanto più coppia si trasmette. Il rapporto non è costante: dipende dal carico.`,
      fonte: { tipo: 'deduzione', da: 'p. 138 (τ reale) e p. 143 (C₁ = (T₁ − T₂)R₁)', spiegazione: 'La dispensa dice «se la coppia è diversa le tensioni si dividono, quindi τ sarà minore del suo ideale»: qui lo si scrive in funzione della coppia.' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{\tau}{\tau^{ID}} = 1 + \dfrac{C_1}{R_1\,(EA + T_1)}`, errore: 'segno', spiega: 'Lo scorrimento elastico fa perdere giri alla condotta: τ < τ^ID.', num: (v) => [v.tau / v.tauId, 1 + v.C1 / (v.R1 * (v.EA + v.T1))] },
        { latex: L`\dfrac{\tau}{\tau^{ID}} = 1 - \dfrac{C_1}{R_1\,EA}`, errore: 'termine-perso', spiega: 'È solo l\'approssimazione al primo ordine in T/EA: il denominatore esatto è EA + T₁.', num: (v) => [v.tau / v.tauId, 1 - v.C1 / (v.R1 * v.EA)] },
      ],
      num: (v) => [v.tau / v.tauId, 1 - v.C1 / (v.R1 * (v.EA + v.T1))],
    },
    {
      id: 'd060.6',
      latex: L`\lim_{EA\to+\infty}\tau = \tau^{ID}\quad\text{anche con } C_1 \neq 0`,
      perche: L`Cinghia rigida: le velocità dei rami tornano uguali qualunque sia la coppia.`,
      fonte: D(138),
      distrattori: [],
      num: (v) => [((v.R1 / v.R2) * (1 + v.T2 / 1e15)) / (1 + v.T1 / 1e15), v.tauId],
    },
    {
      id: 'd060.7',
      latex: L`\tau \neq \text{cost} \;\Rightarrow\; \text{ruote dentate, cinghie dentate, catene}`,
      perche: L`Il rapporto non è costante e non c'è sincronismo tra gli alberi: è un difetto della cinghia piana. Dove serve un rapporto costante si usano organi senza scorrimento.`,
      fonte: D([139, 146]),
      distrattori: [],
    },
  ],
  risultato: { latex: L`\tau = \dfrac{\omega_2}{\omega_1} = \dfrac{R_1}{R_2}\,\dfrac{1 + T_2/EA}{1 + T_1/EA} < \tau^{ID}`, fonte: D(138) },
  gancio: 'La motrice va col teso, la condotta col lasco: τ = τ^ID (1+T₂/EA)/(1+T₁/EA).',
};

// ------------------------------------------------------------------ d061 rendimento
export const d061: Dimostrazione = {
  id: 'd061',
  titolo: 'Rendimento della trasmissione a cinghia (scorrimento elastico)',
  enunciato: 'Ricavare il rendimento della trasmissione dovuto allo scorrimento elastico e la potenza dissipata.',
  ipotesi: [
    'coppie in modulo con la stessa differenza di tensione: C₁ = (T₁ − T₂)R₁, C₂ = (T₁ − T₂)R₂ (p. 134)',
    'velocità periferiche dal modello elastico (d060): V₁ = ω₁R₁ col teso, V₂ = ω₂R₂ col lasco',
    'si conta solo lo scorrimento elastico: isteresi, attriti dei supporti e perdite di flessione trascurati',
  ],
  sample: sampleReale,
  passi: [
    {
      id: 'd061.1',
      latex: L`\eta = \dfrac{|C_2\omega_2|}{|C_1\omega_1|} = \dfrac{\mathcal P_{USCITA}}{\mathcal P_{ENTRATA}}`,
      perche: L`Definizione: frazione della potenza motrice che arriva all'utilizzatore.`,
      fonte: D(135),
      distrattori: [],
    },
    {
      id: 'd061.2',
      latex: L`\tau = \eta\,\dfrac{C_1}{C_2}`,
      perche: L`Dalla definizione, con $\tau = \omega_2/\omega_1$ effettivo: $\eta = (C_2/C_1)\,\tau$ (d058).`,
      fonte: D(135),
      distrattori: [],
      num: (v) => [v.tau, (v.eta * v.C1) / v.C2],
    },
    {
      id: 'd061.3',
      latex: L`\dfrac{C_1}{C_2} = \dfrac{(T_1 - T_2)R_1}{(T_1 - T_2)R_2} = \dfrac{R_1}{R_2}`,
      perche: L`L'equilibrio delle pulegge (p. 134) vale anche nel caso reale: le due coppie stanno come i raggi. Non vale invece $C_1/C_2 = \omega_2/\omega_1$, che viene dalla T.F.V. senza perdite: va «sacrificata».`,
      fonte: D([135, 139]),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{C_1}{C_2} = \dfrac{\omega_2}{\omega_1} = \tau`, errore: 'ipotesi', spiega: 'Questa è la T.F.V. senza potenza dissipata: nel caso reale è proprio la relazione da sacrificare (p. 135).', num: (v) => [v.C1 / v.C2, v.tau] },
        { latex: L`\dfrac{C_1}{C_2} = \dfrac{R_2}{R_1}`, errore: 'indice', spiega: 'Stessa differenza di tensione: la coppia cresce col raggio.', num: (v) => [v.C1 / v.C2, v.R2 / v.R1] },
      ],
      num: (v) => [v.C1 / v.C2, v.R1 / v.R2],
    },
    {
      id: 'd061.4',
      latex: L`\eta = \tau\,\dfrac{C_2}{C_1} = \tau\,\dfrac{R_2}{R_1} = \dfrac{\omega_2 R_2}{\omega_1 R_1} = \dfrac{V_2}{V_1}`,
      perche: L`Si sostituisce il rapporto delle coppie: il rendimento è il rapporto tra la velocità periferica della condotta e quella della motrice. Se fosse 1 le due velocità sarebbero uguali.`,
      fonte: D(135),
      chiave: true,
      distrattori: [
        { latex: L`\eta = \dfrac{V_1}{V_2}`, errore: 'indice', spiega: 'La condotta perde velocità: V₂ < V₁ e η < 1.', num: (v) => [v.eta, v.V1 / v.V2] },
        { latex: L`\eta = \tau`, errore: 'concetto', spiega: 'Il rendimento è τ diviso τ^ID, non τ: una trasmissione riduttrice senza perdite ha τ < 1 ma η = 1.', num: (v) => [v.eta, v.tau] },
      ],
      num: (v) => [v.eta, v.V2 / v.V1],
    },
    {
      id: 'd061.5',
      latex: L`\eta = \dfrac{\tau}{\tau_{id}} = \dfrac{1 + T_2/EA}{1 + T_1/EA} < 1`,
      perche: L`Con le velocità del modello elastico (d060): lo stesso fattore che abbassa $\tau$ sotto l'ideale è il rendimento. Cresce la coppia, scende il rendimento.`,
      fonte: D(139),
      distrattori: [],
      num: (v) => [v.eta, (1 + v.T2 / v.EA) / (1 + v.T1 / v.EA)],
    },
    {
      id: 'd061.6',
      latex: L`C_1\omega_1 - C_2\omega_2 = (T_1 - T_2)\,(V_1 - V_2)`,
      perche: L`La potenza persa è la forza trasmessa $T_1 - T_2$ per la differenza di velocità tra i due tratti aderenti: è l'attrito che lavora negli archi di scorrimento.`,
      fonte: { tipo: 'deduzione', da: 'p. 134 (C_i = (T₁ − T₂)R_i) e p. 138 (V_i = ω_iR_i)', spiegazione: 'Si moltiplica ciascuna coppia per la sua ω e si usa ω_iR_i = V_i.' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.C1 * v.w1 - v.C2 * v.w2, (v.T1 - v.T2) * (v.V1 - v.V2)],
    },
    {
      id: 'd061.7',
      latex: L`W^{ATTR}_{DISS} = -(C_1\omega_1 - C_2\omega_2) = -(1-\eta)\,C_1\omega_1`,
      perche: L`La potenza dissipata, negativa, è il complemento a uno del rendimento per la potenza motrice.`,
      fonte: D(139),
      distrattori: [],
      num: (v) => [-(v.C1 * v.w1 - v.C2 * v.w2), -(1 - v.eta) * v.C1 * v.w1],
    },
  ],
  risultato: { latex: L`\eta = \dfrac{V_2}{V_1} = \dfrac{1 + T_2/EA}{1 + T_1/EA}`, fonte: D([135, 139]) },
  gancio: 'Rendimento = velocità della condotta su velocità della motrice: si perde ciò che la cinghia scivola.',
};

// ------------------------------------------------------------------ d137 geometria dell'avvolgimento (fonte esterna)
export const d137: Dimostrazione = {
  id: 'd137',
  titolo: 'Geometria dell\'angolo di avvolgimento',
  enunciato: 'Ricavare gli angoli di avvolgimento di una trasmissione aperta e di una incrociata da raggi e interasse.',
  ipotesi: [
    'pulegge di raggi R₁ < R₂, interasse a (distanza dei centri); rami rettilinei tangenti alle due pulegge',
    'aperta: i rami sono le tangenti comuni esterne; incrociata: le tangenti comuni interne (a > R₁ + R₂)',
  ],
  sample: (rnd) => {
    const R1 = U(rnd, 0.04, 0.12), R2 = U(rnd, 0.14, 0.3), a = U(rnd, 0.5, 1.2);
    const o = avvolgimento({ R1, R2, a, tipo: 'aperta' }), x = avvolgimento({ R1, R2, a, tipo: 'incrociata' });
    return { R1, R2, a, b1: o.beta1, b2: o.beta2, gamma: o.gamma, Lr: o.L, b1c: x.beta1, b2c: x.beta2 };
  },
  passi: [
    {
      id: 'd137.1',
      latex: L`\beta_1 + \beta_2 = 2\pi\quad\text{(trasmissione aperta)},\qquad \beta_1 < \beta_2`,
      perche: L`È ciò che scrive la dispensa: con due pulegge e cinghia aperta gli archi avvolti si completano a un giro, e la puleggia piccola ha l'arco minore.`,
      fonte: D(132),
      distrattori: [],
      num: (v) => [v.b1 + v.b2, 2 * Math.PI],
    },
    {
      id: 'd137.2',
      latex: L`O_1P_1 \parallel O_2P_2 \perp P_1P_2`,
      perche: L`I raggi ai punti di tangenza sono perpendicolari al ramo, quindi paralleli tra loro. Tracciando da $O_1$ la parallela al ramo si forma un triangolo rettangolo con ipotenusa $a$ e cateto $R_2 - R_1$.`,
      fonte: ESTERNA_GEOM,
      distrattori: [],
    },
    {
      id: 'd137.3',
      latex: L`\sin\gamma = \dfrac{R_2 - R_1}{a}`,
      perche: L`$\gamma$ è l'inclinazione del ramo sulla congiungente dei centri: nel triangolo rettangolo è opposto al cateto $R_2 - R_1$.`,
      fonte: ESTERNA_GEOM,
      chiave: true,
      distrattori: [
        { latex: L`\sin\gamma = \dfrac{R_1 + R_2}{a}`, errore: 'concetto', spiega: 'La somma dei raggi compare per la cinghia incrociata, dove i rami passano tra le pulegge.', num: (v) => [Math.sin(v.gamma), (v.R1 + v.R2) / v.a] },
        { latex: L`\tan\gamma = \dfrac{R_2 - R_1}{a}`, errore: 'concetto', spiega: 'L\'interasse è l\'ipotenusa del triangolo (il cateto è la lunghezza del ramo): serve il seno.', num: (v) => [Math.tan(v.gamma), (v.R2 - v.R1) / v.a] },
      ],
      num: (v) => [Math.sin(v.gamma), (v.R2 - v.R1) / v.a],
    },
    {
      id: 'd137.4',
      latex: L`\beta_1 = \pi - 2\gamma,\qquad \beta_2 = \pi + 2\gamma`,
      perche: L`Ciascun ramo sposta di $\gamma$ il punto di tangenza rispetto alla verticale per il centro: la piccola perde $2\gamma$ rispetto a mezzo giro, la grande li guadagna. La somma torna $2\pi$.`,
      fonte: ESTERNA_GEOM,
      chiave: true,
      distrattori: [
        { latex: L`\beta_1 = \pi - \gamma`, errore: 'fattore', spiega: 'I rami sono due, ciascuno inclinato di γ: la differenza da π è 2γ.', num: (v) => [v.b1, Math.PI - Math.asin((v.R2 - v.R1) / v.a)] },
        { latex: L`\beta_1 = \pi + 2\gamma`, errore: 'segno', spiega: 'La puleggia piccola ha l\'arco minore: β₁ < π.', num: (v) => [v.b1, Math.PI + 2 * Math.asin((v.R2 - v.R1) / v.a)] },
      ],
      num: (v) => [v.b1, Math.PI - 2 * Math.asin((v.R2 - v.R1) / v.a)],
    },
    {
      id: 'd137.5',
      latex: L`L_{ramo} = \sqrt{a^2 - (R_2 - R_1)^2}`,
      perche: L`Il ramo è l'altro cateto del triangolo rettangolo (Pitagora).`,
      fonte: ESTERNA_GEOM,
      distrattori: [],
      num: (v) => [v.Lr, Math.sqrt(v.a * v.a - (v.R2 - v.R1) ** 2)],
    },
    {
      id: 'd137.6',
      latex: L`\text{incrociata: } \sin\gamma' = \dfrac{R_1 + R_2}{a},\quad \beta_1 = \beta_2 = \pi + 2\gamma' \;\Rightarrow\; \beta_1 + \beta_2 > 2\pi`,
      perche: L`Con i rami incrociati il triangolo ha cateto $R_1 + R_2$ e tutte e due le pulegge guadagnano $2\gamma'$: la somma supera $2\pi$, quindi la relazione della dispensa vale solo per la cinghia aperta.`,
      fonte: ESTERNA_GEOM,
      distrattori: [],
      num: (v) => [v.b1c, Math.PI + 2 * Math.asin((v.R1 + v.R2) / v.a)],
    },
  ],
  risultato: { latex: L`\beta_{1,2} = \pi \mp 2\gamma,\qquad \sin\gamma = \dfrac{R_2 - R_1}{a}`, fonte: ESTERNA_GEOM },
  gancio: 'Triangolo tra i centri: ipotenusa l\'interasse, cateto la differenza dei raggi; la piccola perde 2γ, la grande li guadagna.',
};

// ------------------------------------------------------------------ argomento
export const rapporto: ArgomentoContenuto = {
  id: 'c4-rapporto',
  cosaDireSubito:
    'Nella cinghia ideale, flessibile e inestensibile, senza slittamenti, la velocità V è la stessa su tutte e due le pulegge: ω₁R₁ = ω₂R₂, quindi τ^ID = ω₂/ω₁ = R₁/R₂. Nella realtà la cinghia è elastica: il ramo teso è più allungato e corre più veloce del lasco. La motrice va alla velocità del teso, la condotta a quella del lasco, così τ = τ^ID (1 + T₂/EA)/(1 + T₁/EA) è minore dell\'ideale e cala con la coppia. Lo stesso fattore è il rendimento η = V₂/V₁.',
  sistemaIpotesi: [
    'Sistema: puleggia motrice 1 (raggio R₁, ω₁, coppia C₁ concorde) e condotta 2 (R₂, ω₂, C₂ opposta), cinghia aperta con β₁ + β₂ = 2π.',
    'Flessibile ideale: EJ ≅ 0 (cambia curvatura senza lavoro), EA ≠ 0; lavora solo a trazione.',
    'Regime: ω̇ = 0. Coppie in modulo a p. 134–135, algebriche a p. 139.',
    'Caso ideale: cinghia inestensibile e niente slittamenti. Caso reale: Hooke T = EAε e conservazione della massa, V = V₀(1 + T/EA).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Trasmissione aperta (dispensa p. 132): motrice piccola, condotta grande, rotazione antioraria, ramo superiore teso.',
    fonte: { tipo: 'dispensa', pag: [132, 134], fig: 'schema manoscritto su carta a quadretti' },
    elementi: [
      { id: 'pulegge', testo: 'due pulegge con centri O₁, O₂ e raggi R₁ < R₂', obbligatorio: true },
      { id: 'rami', testo: 'rami tangenti, punti P₁, Q₁, P₂, Q₂', obbligatorio: true },
      { id: 'omega', testo: 'ω₁ e ω₂ nello stesso verso (cinghia aperta)', obbligatorio: true },
      { id: 'coppie', testo: 'C₁ concorde a ω₁ (motrice), C₂ opposta a ω₂ (condotta)', obbligatorio: true },
      { id: 'tensioni', testo: 'T₁ sul ramo che entra nella motrice (teso), T₂ sull\'altro (lasco)', obbligatorio: true },
      { id: 'beta', testo: 'angoli di avvolgimento β₁ < β₂, con β₁ + β₂ = 2π', obbligatorio: false },
      { id: 'V', testo: 'velocità V dei rami', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`V = \omega_1 R_1 = \omega_2 R_2 \ \text{(ideale)},\qquad V = V_0\left(1 + \dfrac{T}{EA}\right) \ \text{(reale)}`,
    spiegazione: 'Una sola velocità per la cinghia ideale; per quella elastica la velocità dipende dalla tensione del tratto.',
    fonte: { tipo: 'dispensa', pag: [132, 138] },
  },
  dimostrazioni: ['d055', 'd056', 'd058', 'd059', 'd060', 'd061', 'd137'],
  significato:
    'Il rapporto di trasmissione della cinghia piana non è costante: dipende dal carico, perché la coppia separa le tensioni dei rami e il ramo più teso è più lungo e più veloce. Non c\'è sincronismo tra gli alberi. La potenza persa è la forza trasmessa per la velocità di scorrimento, (T₁ − T₂)(V₁ − V₂). Dove serve un rapporto costante si usano cinghie dentate, catene o ruote dentate.',
  fraseDaRicordare: 'La motrice va col teso, la condotta col lasco: τ = τ^ID (1 + T₂/EA)/(1 + T₁/EA) = η τ^ID.',
  daNonDire: [
    { frase: 'Il rapporto di trasmissione è ω₁/ω₂ = R₂/R₁.', perche: 'Nella dispensa τ = ω₂/ω₁ (uscita su entrata) = R₁/R₂; ω₁/ω₂ è il reciproco (NF-09, NF-175).', fonte: { tipo: 'dispensa', pag: 132 } },
    { frase: 'Il ramo teso e il lasco vanno alla stessa velocità.', perche: 'Solo se la cinghia è inestensibile: con EA finito il teso è più lungo e più veloce, V₁/V₂ = (1 + T₁/EA)/(1 + T₂/EA).', fonte: { tipo: 'dispensa', pag: 138 } },
    { frase: 'V₀ è la velocità della cinghia quando la coppia è nulla.', perche: 'Con C = 0 i rami hanno la tensione di forzamento T₀ > 0; V₀ è la velocità della cinghia scarica (NF-164).', fonte: { tipo: 'dispensa', pag: 138 } },
    { frase: 'β₁ + β₂ = 2π vale sempre.', perche: 'Solo per la trasmissione aperta; con la cinghia incrociata la somma supera 2π (NF-161).', fonte: ESTERNA_GEOM },
    { frase: 'Se il rendimento aumenta, τ diminuisce.', perche: 'È una frase contraddittoria di p. 135 (NF-162): a coppie fissate τ = η C₁/C₂ cresce con η.', fonte: { tipo: 'dispensa', pag: 135 } },
    { frase: 'Un riduttore di giri riduce anche la coppia.', perche: 'È il contrario: un riduttore di velocità è un moltiplicatore di coppia (a meno delle perdite).', fonte: { tipo: 'dispensa', pag: [135, 139] } },
    { frase: 'η = V₂/V₁ comprende tutte le perdite della trasmissione.', perche: 'È il rendimento del solo scorrimento elastico: isteresi, supporti e flessione sono esclusi.', fonte: { tipo: 'dispensa', pag: 139 } },
  ],
  approfondimenti: [
    { domanda: 'Perché la motrice va alla velocità del ramo teso e la condotta a quella del lasco?', tipo: 'collegamento', argomento: 'c4-eulero', attesa: 'Su ogni puleggia la cinghia prima aderisce, poi striscia verso l\'uscita. L\'arco d\'aderenza è all\'ingresso: sulla motrice entra il teso (T₁), sulla condotta il lasco (T₂). Lì la cinghia ha la velocità della periferia.', fonte: { tipo: 'dispensa', pag: [144, 146] } },
    { domanda: 'Che cosa succede a τ quando aumenta la coppia? E se la cinghia fosse rigidissima?', tipo: 'approfondimento', attesa: 'Le tensioni si separano e τ scende sotto τ^ID: τ/τ^ID = 1 − C₁/[R₁(EA + T₁)]. Per EA → ∞ si torna a τ^ID anche con coppia.', fonte: { tipo: 'dispensa', pag: 138 } },
    { domanda: 'Quanta potenza si perde per lo scorrimento elastico?', tipo: 'approfondimento', attesa: 'C₁ω₁ − C₂ω₂ = (T₁ − T₂)(V₁ − V₂) = (1 − η)C₁ω₁: forza trasmessa per differenza di velocità dei tratti aderenti.', fonte: { tipo: 'deduzione', da: 'pp. 134, 138, 139', spiegazione: 'C_i = (T₁ − T₂)R_i e V_i = ω_iR_i' } },
    { domanda: 'Come ricavi il rendimento in due modi?', tipo: 'approfondimento', attesa: 'Dalla definizione con C₂/C₁ = R₂/R₁: η = τR₂/R₁ = V₂/V₁ (p. 135). Oppure dalla T.F.V. con W_diss = −(1 − η)C₁ω₁: C₁/C₂ = −τ/η e, con |C₁/C₂| = R₁/R₂, η = τ/τ_id (p. 139).', fonte: { tipo: 'dispensa', pag: [135, 139] } },
    { domanda: 'Un riduttore di giri moltiplica sempre la coppia?', tipo: 'approfondimento', attesa: 'C₂/C₁ = η/τ: è un moltiplicatore di coppia solo se τ < η. Con le perdite, se η < τ < 1 la coppia in uscita è minore di quella in ingresso.', fonte: { tipo: 'dispensa', pag: 139 } },
    { domanda: 'Perché si usano cinghie dentate o catene?', tipo: 'approfondimento', attesa: 'Non hanno scorrimento: il rapporto resta costante con il carico e gli alberi sono sincroni. La cinghia piana si basa solo sull\'attrito.', fonte: { tipo: 'dispensa', pag: [130, 139] } },
    { domanda: 'Come calcoli gli angoli di avvolgimento?', tipo: 'approfondimento', attesa: 'Aperta: sin γ = (R₂ − R₁)/a, β₁ = π − 2γ, β₂ = π + 2γ. Incrociata: sin γ\' = (R₁ + R₂)/a, β₁ = β₂ = π + 2γ\'. La dispensa scrive solo β₁ + β₂ = 2π.', fonte: ESTERNA_GEOM },
    { domanda: 'Perché la cinghia va pretensionata e non deve andare in compressione?', tipo: 'approfondimento', attesa: 'Lavora solo a trazione: con rigidezza flessionale trascurabile un tratto compresso non trasmette forza. E la coppia passa per attrito, che richiede una forza normale: serve una tensione minima, data dai tenditori, anche a coppia nulla.', fonte: { tipo: 'dispensa', pag: [131, 140] } },
    { domanda: 'Perché la curvatura «a gradino» è un problema?', tipo: 'approfondimento', attesa: 'Nei punti di tangenza la curvatura salta da 0 a 1/R e la forza centrifuga da 0 a mV²/R in un istante: con una rigidezza flessionale anche piccola darebbe forze interne elevate. Si usano raccordi parabolici.', fonte: { tipo: 'dispensa', pag: [133, 134] } },
  ],
  simboli: [
    { simbolo: L`\tau^{ID},\ \tau`, significato: 'rapporto di trasmissione ideale e effettivo, ω₂/ω₁ (uscita su entrata)', altrove: 'τ_id, τ_eff in q44; d055 scrive ω₁/ω₂ = 1/τ' },
    { simbolo: L`R_1,\ R_2`, significato: 'raggi di motrice e condotta', altrove: 'r₁, r₂ e R_M, R_C nella dispensa stessa' },
    { simbolo: L`C_1,\ C_2`, significato: 'coppia motrice (concorde a ω₁) e resistente (opposta a ω₂)', altrove: 'C_m, C_c' },
    { simbolo: L`T_1,\ T_2`, significato: 'tensione del ramo teso e del ramo lasco' },
    { simbolo: L`EA,\ EJ_x`, significato: 'rigidezza assiale (≠ 0) e flessionale (≅ 0) della cinghia' },
    { simbolo: L`V_0`, significato: 'velocità della cinghia scarica (portata dℓ₀/dt)' },
    { simbolo: L`V_1,\ V_2`, significato: 'velocità della cinghia sulla motrice e sulla condotta' },
    { simbolo: L`\eta`, significato: 'rendimento', altrove: 'P_u/P_m in d061' },
    { simbolo: L`W^{ATTR}_{DISS}`, significato: 'potenza dissipata per attrito (< 0)', altrove: '𝒫_dissipata a p. 135, P_diss in d061' },
    { simbolo: L`\beta_1,\ \beta_2`, significato: 'angoli di avvolgimento' },
    { simbolo: L`a,\ \gamma`, significato: 'interasse e inclinazione dei rami (solo d137, fonte esterna)', altrove: 'la dispensa indica l\'interasse con i, solo in figura a p. 144' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c4-creep' }],
  previsioni: [
    {
      id: 'c4-rap-coppia',
      domanda: 'A parità di T₂ e di velocità della motrice, raddoppio la coppia trasmessa. Il rapporto di trasmissione τ…',
      opzioni: ['aumenta', 'resta uguale a τ^ID', 'diminuisce', 'si annulla'],
      corretta: 2,
      spiega: 'Più coppia, più differenza tra T₁ e T₂: il ramo teso si allunga di più e la condotta perde giri. τ/τ^ID = 1 − C₁/[R₁(EA + T₁)].',
      verify: () => {
        const p = { R1: 0.1, R2: 0.25, EA: 2e4, T2: 150, omega1: 150 };
        const a = trasmissioneReale({ ...p, C1: 20 }).tau, b = trasmissioneReale({ ...p, C1: 40 }).tau;
        return b < a ? 2 : b > a ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c4-creep' },
    },
    {
      id: 'c4-rap-rigida',
      domanda: 'Con la stessa coppia uso una cinghia con EA dieci volte più grande. La potenza persa per scorrimento elastico…',
      opzioni: ['circa si divide per 10', 'resta uguale', 'cresce', 'si annulla esattamente'],
      corretta: 0,
      spiega: 'La perdita è (T₁ − T₂)(V₁ − V₂) e V₁ − V₂ ≃ V₀(T₁ − T₂)/EA: a parità di tensioni è circa inversamente proporzionale a EA. Si annulla solo per EA → ∞.',
      verify: () => {
        const p = { R1: 0.1, R2: 0.25, T2: 150, C1: 30, omega1: 150 };
        const a = -trasmissioneReale({ ...p, EA: 2e4 }).Wdiss, b = -trasmissioneReale({ ...p, EA: 2e5 }).Wdiss;
        const r = a / b;
        return r > 8 && r < 12 ? 0 : b === 0 ? 3 : b > a ? 2 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c4-creep' },
    },
  ],
  nf: ['NF-09', 'NF-35', 'NF-07', 'NF-161', 'NF-162', 'NF-163', 'NF-164', 'NF-165', 'NF-166', 'NF-175'],
};
