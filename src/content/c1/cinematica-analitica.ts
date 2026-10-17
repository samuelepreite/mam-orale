/**
 * C1 · Cinematica analitica con i numeri complessi (argomento di complemento). Dispensa pp. 40–44.
 * Da non confondere con il complex replacement delle vibrazioni (NF-43).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { jt, manovellismo, quadrilateroJ, type V2 } from '../../engine/c1';
import { arc, arrow, dot, line, svg, text } from '../svg';
import { D, DED, L } from './comune';

// ------------------------------------------------------------------ disegno (quadrilatero nel piano complesso, p. 42)
function disegno() {
  const P: V2[] = [[78, 168], [140, 88], [300, 104], [262, 212]];
  const nomi = ['A', 'B', 'C', 'D'];
  const parts: string[] = [arrow(30, 260, 380, 260, 'm'), arrow(40, 270, 40, 20, 'm'), text(384, 248, 'Re', { c: 'm' }), text(56, 22, 'Im', { c: 'm' }), text(28, 272, 'O', { c: 'm' })];
  const cg: V2 = [P.reduce((s, p) => s + p[0], 0) / 4, P.reduce((s, p) => s + p[1], 0) / 4];
  for (let k = 0; k < 4; k++) {
    const a = P[k], b = P[(k + 1) % 4];
    const mid: V2 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], md = Math.hypot(mid[0] - cg[0], mid[1] - cg[1]);
    let ang = (Math.atan2(a[1] - b[1], b[0] - a[0]) * 180) / Math.PI;
    if (ang < 0) ang += 360;
    parts.push(line(a[0], a[1], a[0] + 34, a[1], 'd'), arc(a[0], a[1], 15 + 3 * k, 0, ang, 'm'));
    parts.push(arrow(a[0], a[1], b[0] - (b[0] - a[0]) * 0.06, b[1] - (b[1] - a[1]) * 0.06, 'a'));
    parts.push(text(mid[0] + (18 * (mid[0] - cg[0])) / md, mid[1] + (18 * (mid[1] - cg[1])) / md, `V${'₁₂₃₄'[k]}`, { c: 'a' }));
    parts.push(text(a[0] + 26 + 4 * k, a[1] - 12 - 2 * k, `φ${'₁₂₃₄'[k]}`, { c: 'm', size: 12 }));
  }
  P.forEach((p, k) => parts.push(dot(p[0], p[1], nomi[k], k === 0 ? -14 : k === 3 ? 12 : 8, k === 1 ? -12 : 14)));
  return svg(400, 280, parts, 'Quadrilatero articolato nel piano complesso: aste come vettori V_j e^{iφ_j} che formano un poligono chiuso');
}

// ------------------------------------------------------------------ campione: quadrilatero risolto con i getti (posizione esatta, derivate esatte)
const sampleQ = (rnd: () => number): Vars => {
  for (;;) {
    const V1 = U(rnd, 0.25, 0.45), V2 = U(rnd, 0.9, 1.3), V3 = U(rnd, 0.7, 1.1), V4 = U(rnd, 1, 1.4), phi4 = Math.PI - U(rnd, 0, 0.3);
    const p1 = jt(U(rnd, -Math.PI, Math.PI), U(rnd, -3, 3), U(rnd, -3, 3));
    const Bx = V1 * Math.cos(p1[0]) + V4 * Math.cos(phi4), By = V1 * Math.sin(p1[0]) + V4 * Math.sin(phi4);
    const dist = Math.hypot(Bx, By);
    if (dist <= Math.abs(V2 - V3) * 1.05 || dist >= (V2 + V3) * 0.95) continue;
    const { phi2: p2, phi3: p3 } = quadrilateroJ([V1, V2, V3, V4], phi4, p1);
    // manovellismo nel piano complesso (p. 44): V₁ = r, V₂ = l, φ₂ = −γ, V₃ = x_C, φ₃ = π
    const r = U(rnd, 0.03, 0.1), l = r / U(rnd, 0.15, 0.4), th = U(rnd, -3, 3), w = U(rnd, 5, 50);
    const m = manovellismo({ r, l, theta: th, omega1: w });
    return {
      V1, V2, V3, V4, phi4, p1: p1[0], p1d: p1[1], p1dd: p1[2], p2: p2[0], p2d: p2[1], p2dd: p2[2], p3: p3[0], p3d: p3[1], p3dd: p3[2],
      r, l, th, w, mg: -m.gamma, mgd: m.omega2, xC: m.xC, VC: m.VC, aC: m.aC, mgdd: m.omega2dot,
    };
  }
};
const re3 = (v: Vars) => v.V1 * Math.cos(v.p1) + v.V2 * Math.cos(v.p2) + v.V3 * Math.cos(v.p3);
const im3 = (v: Vars) => v.V1 * Math.sin(v.p1) + v.V2 * Math.sin(v.p2) + v.V3 * Math.sin(v.p3);

export const d016: Dimostrazione = {
  id: 'd016',
  titolo: 'Cinematica analitica: chiusura complessa del quadrilatero e del manovellismo',
  enunciato: 'Scrivere la chiusura di un meccanismo con i vettori nel piano complesso, ricavare le due equazioni scalari di posizione e, derivando, i sistemi delle velocità e delle accelerazioni.',
  ipotesi: ['ogni asta è un vettore V_j e^{iφ_j}, φ_j antiorario dall\'asse reale', 'quadrilatero: V₁…V₄ costanti (lunghezze), φ₄ costante (telaio); manovellismo: V₁, V₂ costanti, φ₃ costante (guida), V₃ variabile', 'non è il complex replacement delle vibrazioni (NF-43)'],
  sample: sampleQ,
  passi: [
    {
      id: 'd016.1',
      latex: L`\vec V = V e^{i\varphi} = V\cos\varphi + i\,V\sin\varphi`,
      perche: 'Un vettore del piano è un numero complesso: modulo per esponenziale dell\'angolo (formula di Eulero). Parte reale = componente $x$, parte immaginaria = componente $y$.',
      fonte: D(40),
      distrattori: [],
    },
    {
      id: 'd016.2',
      latex: L`V_1 e^{i\varphi_1} + V_2 e^{i\varphi_2} + V_3 e^{i\varphi_3} + V_4 e^{i\varphi_4} = 0`,
      perche: 'Le distanze fra le cerniere $A\\to B\\to C\\to D\\to A$ formano un poligono chiuso: la somma dei quattro vettori è nulla. La dispensa ripete per refuso $V_1e^{i\\varphi_1}$ al posto di $V_2e^{i\\varphi_2}$.',
      fonte: D(42),
      correzione: { nf: 'NF-36', dispensaScrive: L`V_1e^{i\varphi_1} + V_1e^{i\varphi_1} + V_3e^{i\varphi_3} + V_4e^{i\varphi_4} = 0` },
      distrattori: [],
      num: (v) => [re3(v) + Math.SQRT2 * im3(v), -v.V4 * (Math.cos(v.phi4) + Math.SQRT2 * Math.sin(v.phi4))],
    },
    {
      id: 'd016.3',
      latex: L`\begin{cases} V_1\cos\varphi_1 + V_2\cos\varphi_2 + V_3\cos\varphi_3 + V_4\cos\varphi_4 = 0 \\ V_1\sin\varphi_1 + V_2\sin\varphi_2 + V_3\sin\varphi_3 + V_4\sin\varphi_4 = 0 \end{cases}`,
      perche: 'Un numero complesso è nullo se e solo se sono nulle **entrambe** parte reale e parte immaginaria: l\'equazione complessa vale due equazioni reali (le proiezioni su $x$ e $y$, come si otterrebbe geometricamente).',
      fonte: D([41, 42]),
      chiave: true,
      distrattori: [
        { latex: L`\textstyle\sum_j V_j\cos\varphi_j = 0\ \text{(basta la parte reale)}`, errore: 'concetto', spiega: 'Così si confonde con il complex replacement, dove si tiene una sola parte: qui servono tutte e due (NF-43).' },
        { latex: L`\textstyle\sum_j V_j\cos\varphi_j = \sum_j V_j\sin\varphi_j`, errore: 'concetto', spiega: 'Parte reale e immaginaria sono nulle separatamente, non uguali fra loro.' },
      ],
      num: (v) => [re3(v) + 3 * im3(v), -v.V4 * Math.cos(v.phi4) - 3 * v.V4 * Math.sin(v.phi4)],
    },
    {
      id: 'd016.4',
      latex: L`\varphi_1\ \text{noto} \;\Rightarrow\; \{\varphi_2, \varphi_3\}\ \text{da un sistema non lineare}`,
      perche: 'Lunghezze e angolo del telaio sono costanti; noto l\'angolo del membro motore restano due incognite angolari. Seni e coseni rendono il sistema non lineare (in generale due soluzioni: i due modi di montaggio).',
      fonte: D([42, 43]),
      distrattori: [],
    },
    {
      id: 'd016.5',
      latex: L`\begin{cases} -V_1\sin\varphi_1\,\dot\varphi_1 - V_2\sin\varphi_2\,\dot\varphi_2 - V_3\sin\varphi_3\,\dot\varphi_3 = 0 \\ V_1\cos\varphi_1\,\dot\varphi_1 + V_2\cos\varphi_2\,\dot\varphi_2 + V_3\cos\varphi_3\,\dot\varphi_3 = 0 \end{cases}`,
      perche: 'Si deriva nel tempo ricordando che $V_1\\dots V_4$ e $\\varphi_4$ sono costanti: $d(\\cos\\varphi)/dt = -\\sin\\varphi\\,\\dot\\varphi$. Note $\\dot\\varphi_1$, le incognite $\\dot\\varphi_2, \\dot\\varphi_3$ (velocità angolari di biella e bilanciere) compaiono **linearmente**.',
      fonte: D(43),
      chiave: true,
      distrattori: [
        { latex: L`-V_1\sin\varphi_1 - V_2\sin\varphi_2 - V_3\sin\varphi_3 = 0`, errore: 'termine-perso', spiega: 'Derivando rispetto al tempo esce la derivata dell\'angolo (regola della catena): ogni termine ha il suo φ̇_j.', num: (v) => [-v.V1 * Math.sin(v.p1) - v.V2 * Math.sin(v.p2), v.V3 * Math.sin(v.p3)] },
        { latex: L`V_1\sin\varphi_1\,\dot\varphi_1 + V_2\sin\varphi_2\,\dot\varphi_2 + V_3\sin\varphi_3\,\dot\varphi_3 + V_4\sin\varphi_4\,\dot\varphi_4 = 0,\ \dot\varphi_4\ne0`, errore: 'ipotesi', spiega: 'φ₄ è l\'angolo del telaio: è costante, il suo termine sparisce.' },
      ],
      num: (v) => [-v.V1 * Math.sin(v.p1) * v.p1d - v.V2 * Math.sin(v.p2) * v.p2d, v.V3 * Math.sin(v.p3) * v.p3d],
    },
    {
      id: 'd016.6',
      latex: L`\dot\varphi_2 = -\dfrac{V_1\,\dot\varphi_1\sin(\varphi_1-\varphi_3)}{V_2\sin(\varphi_2-\varphi_3)},\qquad \dot\varphi_3 = -\dfrac{V_1\,\dot\varphi_1\sin(\varphi_1-\varphi_2)}{V_3\sin(\varphi_3-\varphi_2)}`,
      perche: 'Il sistema è lineare in $\\dot\\varphi_2, \\dot\\varphi_3$. Il modo più rapido è dalla forma complessa $i\\sum_{j=1}^{3} V_j\\dot\\varphi_j e^{i\\varphi_j} = 0$: si divide per $i$, si moltiplica per $e^{-i\\varphi_3}$ e si prende la parte immaginaria; il termine di $\\varphi_3$ diventa reale ($e^{0}=1$) e sparisce, resta $V_1\\dot\\varphi_1\\sin(\\varphi_1-\\varphi_3) + V_2\\dot\\varphi_2\\sin(\\varphi_2-\\varphi_3) = 0$. Con $e^{-i\\varphi_2}$ si trova $\\dot\\varphi_3$ allo stesso modo (va bene anche Cramer). Il denominatore si annulla quando biella e bilanciere sono allineati.',
      fonte: DED('p. 43 (sistema delle velocità)', 'soluzione esplicita del sistema lineare, che la dispensa non scrive'),
      distrattori: [],
      num: (v) => [v.p2d + v.p3d, (-v.V1 * v.p1d * Math.sin(v.p1 - v.p3)) / (v.V2 * Math.sin(v.p2 - v.p3)) - (v.V1 * v.p1d * Math.sin(v.p1 - v.p2)) / (v.V3 * Math.sin(v.p3 - v.p2))],
    },
    {
      id: 'd016.7',
      latex: L`-V_1\cos\varphi_1\dot\varphi_1^2 - V_1\sin\varphi_1\ddot\varphi_1 - V_2\cos\varphi_2\dot\varphi_2^2 - V_2\sin\varphi_2\ddot\varphi_2 - V_3\cos\varphi_3\dot\varphi_3^2 - V_3\sin\varphi_3\ddot\varphi_3 = 0\ \ (\text{e l'analoga in } \sin)`,
      perche: 'Si deriva una seconda volta la prima equazione delle velocità. Ogni termine $-V_j\\sin\\varphi_j\\dot\\varphi_j$ è un prodotto di due funzioni del tempo: derivando il seno esce $-V_j\\cos\\varphi_j\\dot\\varphi_j^2$ (termine centripeto, già noto dalle velocità), derivando $\\dot\\varphi_j$ esce $-V_j\\sin\\varphi_j\\ddot\\varphi_j$. La seconda equazione si deriva allo stesso modo (con $\\cos\\to\\sin$ e segni conseguenti). Noto $\\ddot\\varphi_1$, il sistema è di nuovo lineare in $\\ddot\\varphi_2, \\ddot\\varphi_3$.',
      fonte: D(43),
      distrattori: [
        { latex: L`-V_1\sin\varphi_1\ddot\varphi_1 - V_2\sin\varphi_2\ddot\varphi_2 - V_3\sin\varphi_3\ddot\varphi_3 = 0`, errore: 'termine-perso', spiega: 'Derivando −sin φ φ̇ anche il seno va derivato: compare −cos φ φ̇², il termine centripeto.', num: (v) => [-v.V1 * Math.sin(v.p1) * v.p1dd - v.V2 * Math.sin(v.p2) * v.p2dd, v.V3 * Math.sin(v.p3) * v.p3dd] },
      ],
      num: (v) => [
        -v.V1 * Math.cos(v.p1) * v.p1d ** 2 - v.V1 * Math.sin(v.p1) * v.p1dd - v.V2 * Math.cos(v.p2) * v.p2d ** 2 - v.V2 * Math.sin(v.p2) * v.p2dd,
        v.V3 * Math.cos(v.p3) * v.p3d ** 2 + v.V3 * Math.sin(v.p3) * v.p3dd,
      ],
    },
    {
      id: 'd016.8',
      latex: L`\text{manovellismo: } \begin{cases} -V_1\sin\varphi_1\dot\varphi_1 - V_2\sin\varphi_2\dot\varphi_2 + \dot V_3\cos\varphi_3 = 0 \\ V_1\cos\varphi_1\dot\varphi_1 + V_2\cos\varphi_2\dot\varphi_2 + \dot V_3\sin\varphi_3 = 0 \end{cases}`,
      perche: 'Nel manovellismo i moduli costanti sono manovella e biella, mentre il terzo vettore (dal pistone ad $A$) ha **direzione** costante ($\\varphi_3 = \\pi$) e modulo variabile: derivando compare $\\dot V_3$ al posto di $\\dot\\varphi_3$. Incognite lineari $\\dot\\varphi_2, \\dot V_3$ (velocità angolare della biella e velocità del pistone).',
      fonte: D(44),
      chiave: true,
      distrattori: [
        { latex: L`\cdots - V_3\sin\varphi_3\,\dot\varphi_3 = 0`, errore: 'ipotesi', spiega: 'Nel manovellismo φ₃ è fisso (la guida non ruota): varia il modulo V₃, quindi compare V̇₃.' },
        { latex: L`\cdots + \dot V_3\sin\varphi_3 = 0\ \text{nella prima},\ \dot V_3\cos\varphi_3\ \text{nella seconda}`, errore: 'indice', spiega: 'La derivata di V₃cos φ₃ (parte reale) è V̇₃cos φ₃; quella di V₃ sin φ₃ è V̇₃ sin φ₃.', num: (v) => [-v.r * Math.sin(v.th) * v.w - v.l * Math.sin(v.mg) * v.mgd, 0] },
      ],
      num: (v) => [-v.r * Math.sin(v.th) * v.w - v.l * Math.sin(v.mg) * v.mgd, v.VC],
    },
  ],
  risultato: { latex: L`\textstyle\sum_j V_j e^{i\varphi_j} = 0 \;\Rightarrow\; \sum_j V_j\cos\varphi_j = 0,\ \sum_j V_j\sin\varphi_j = 0\ \ (\text{posizione non lineare; velocità e accelerazioni lineari})`, fonte: D([41, 44]) },
  gancio: 'Una equazione complessa = due equazioni reali: posizione non lineare, derivate lineari.',
};

// ------------------------------------------------------------------ argomento
export const cinematicaAnalitica: ArgomentoContenuto = {
  id: 'c1-cinematica-analitica',
  cosaDireSubito:
    'Nella cinematica analitica ogni asta è un vettore nel piano complesso, V e^{iφ}. La chiusura del meccanismo è un\'equazione complessa, che vale due equazioni reali: parte reale e parte immaginaria nulle. Note le dimensioni e l\'angolo del membro motore, la posizione si trova da un sistema non lineare; derivando si ottengono velocità e accelerazioni da sistemi lineari.',
  sistemaIpotesi: [
    'Sistema: quadrilatero articolato (A, B, C, D, telaio AD fisso) o manovellismo di spinta, nel piano complesso {Re, Im}.',
    'Aste rigide: moduli costanti; telaio fisso: φ₄ costante (quadrilatero), guida fissa: φ₃ costante (manovellismo).',
    'Membro motore noto: φ₁(t), φ̇₁, φ̈₁.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Quadrilatero articolato nel piano complesso (dispensa p. 42): i vettori V₁…V₄ formano un poligono chiuso, gli angoli φ_j sono misurati in verso antiorario dall\'asse reale.',
    fonte: D([41, 42], 'piano complesso e quadrilatero con i vettori'),
    elementi: [
      { id: 'assi', testo: 'piano complesso con asse reale e immaginario', obbligatorio: true },
      { id: 'poligono', testo: 'vettori V₁ (AB), V₂ (BC), V₃ (CD), V₄ (DA) in successione testa–coda, poligono chiuso', obbligatorio: true },
      { id: 'angoli', testo: 'angoli φ_j antiorari dall\'orizzontale alla coda di ogni vettore', obbligatorio: true },
      { id: 'noti', testo: 'dire cosa è noto (V_j, φ₄, φ₁) e cosa è incognito (φ₂, φ₃)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`V_1 e^{i\varphi_1} + V_2 e^{i\varphi_2} + V_3 e^{i\varphi_3} + V_4 e^{i\varphi_4} = 0`,
    spiegazione: 'Chiusura del poligono delle aste scritta con i numeri complessi.',
    fonte: D(42),
    correzione: { nf: 'NF-36', dispensaScrive: L`V_1e^{i\varphi_1} + V_1e^{i\varphi_1} + \dots` },
  },
  dimostrazioni: ['d016'],
  significato:
    'È il metodo sistematico, adatto al calcolo: lo stesso schema (chiusura, derivata, derivata seconda) vale per ogni meccanismo. La difficoltà è tutta nella posizione, non lineare e con più soluzioni (i modi di montaggio); velocità e accelerazioni sono sistemi lineari, che si risolvono sempre tranne nelle configurazioni singolari.',
  fraseDaRicordare: 'Una equazione complessa = due equazioni reali; posizione non lineare, velocità e accelerazioni lineari.',
  daNonDire: [
    { frase: 'È il complex replacement.', perche: 'Nel complex replacement delle vibrazioni si tiene una sola parte (reale o immaginaria); qui parte reale e immaginaria vanno annullate entrambe (NF-43).', fonte: D(41) },
    { frase: 'Basta imporre nulla la parte reale.', perche: 'Un numero complesso è nullo solo se lo sono entrambe le parti: servono due equazioni per due incognite.', fonte: D(41) },
    { frase: 'Anche il sistema delle velocità è non lineare.', perche: 'Derivando, le incognite φ̇₂, φ̇₃ compaiono al primo grado: è lineare.', fonte: D(43) },
    { frase: 'Nel manovellismo derivo anche φ₃.', perche: 'φ₃ è la direzione della guida, costante: varia il modulo V₃ (posizione del pistone), quindi compare V̇₃.', fonte: D(44) },
  ],
  approfondimenti: [
    { domanda: 'Quali sono le incognite nel quadrilatero e nel manovellismo?', tipo: 'approfondimento', attesa: 'Quadrilatero: φ₂ e φ₃ (noto φ₁; lunghezze e φ₄ costanti). Manovellismo: φ₂ e V₃ (manovella e biella di lunghezza costante, guida di direzione fissa).', fonte: D([42, 44]) },
    { domanda: 'Perché la posizione può avere più soluzioni?', tipo: 'approfondimento', attesa: 'Il sistema è non lineare: per un dato φ₁ il punto C è all\'incrocio di due circonferenze (centro B raggio V₂, centro D raggio V₃), che in generale si tagliano in due punti: due modi di montaggio.', fonte: DED('pp. 42–43', 'interpretazione geometrica del sistema non lineare di posizione') },
    { domanda: 'Che differenza c\'è con il complex replacement delle vibrazioni?', tipo: 'collegamento', argomento: 'c7-complex', attesa: 'Qui V e^{iφ} è un vettore posizione e si annullano entrambe le parti; nel complex replacement si sostituisce una grandezza armonica con X̂e^{iωt} e alla fine si tiene una sola parte (con la forzante in seno, la parte immaginaria). E derivare non è «moltiplicare per iω»: qui φ(t) è una funzione qualsiasi.', fonte: DED('p. 41 e NF-43', 'confronto fra i due usi dei numeri complessi') },
    { domanda: 'Come si scrive la derivata di un vettore complesso?', tipo: 'approfondimento', attesa: 'd(V e^{iφ})/dt = (V̇ + iVφ̇) e^{iφ}: il termine iVφ̇ è perpendicolare al vettore (rotazione), V̇ è lungo il vettore (allungamento, come nel pistone). Parte reale e immaginaria danno le righe della dispensa.', fonte: DED('pp. 43–44', 'derivata della forma esponenziale; la dispensa deriva direttamente seni e coseni') },
    { domanda: 'Che legame c\'è con il metodo grafico?', tipo: 'collegamento', argomento: 'c1-velocita', attesa: 'Le φ̇_j sono le velocità angolari delle aste; il sistema delle velocità è la proiezione su x e y del poligono delle velocità della formula fondamentale. Le due equazioni scalari si ottengono anche geometricamente.', fonte: D([29, 41]) },
  ],
  simboli: [
    { simbolo: 'V_j', significato: 'modulo del vettore j (lunghezza dell\'asta; nel manovellismo V₃ è la posizione del pistone)', altrove: 'L_j in d016' },
    { simbolo: '\\varphi_j', significato: 'angolo del vettore j, antiorario dall\'asse reale', altrove: 'θ_j in d016; in q21 φ è la fase' },
    { simbolo: '\\dot\\varphi_j,\\ \\ddot\\varphi_j', significato: 'velocità e accelerazione angolare dell\'asta j' },
    { simbolo: 'i', significato: 'unità immaginaria' },
  ],
  nf: ['NF-36', 'NF-43'],
};
