/**
 * C1 · Corpo rigido: formula fondamentale delle velocità, accelerazioni (Rivals), CIR (domanda q02).
 * Dispensa pp. 10–18, 21–24, 39–40. Poisson è solo enunciato a p. 10: dimostrazione per deduzione (NF-106).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import {
  astaPattini, cross, dot, jc, jcos, jmul, jpolar, jsin, jt, jvadd, norm, pos, quadrilateroJ, sub, vel, acc, wedge, type J, type JV, type V2,
} from '../../engine/c1';
import { arrow, dot as pt, line, poly, rot, svg, text } from '../svg';
import { D, DED, L, get, pj, put, pv } from './comune';

// ------------------------------------------------------------------ disegno (figura di p. 17: CIR dalle direzioni di due velocità)
function disegno() {
  const H = 290;
  const S = (p: V2): V2 => [p[0], H - p[1]]; // coordinate matematiche → schermo
  const K: V2 = [170, 100], A: V2 = [110, 200], B: V2 = [300, 150], P: V2 = [236, 64];
  const vOf = (Q: V2) => wedge(-0.42, sub(Q, K)); // ω oraria
  const ar = (Q: V2, c: 'v' | 'f', lab: string, dx = 8, dy = -8) => { const q = S(Q), w = vOf(Q); return arrow(q[0], q[1], q[0] + w[0], q[1] - w[1], c, lab, dx, dy); };
  const ext = (Q: V2, k: number): V2 => [K[0] + (Q[0] - K[0]) * k, K[1] + (Q[1] - K[1]) * k];
  const body: V2[] = [[80, 180], [118, 236], [200, 244], [282, 214], [338, 160], [322, 92], [252, 44], [150, 36], [92, 86]];
  return svg(400, H, [
    poly(body.map(S), 'soft', true), poly(body.map(S), 'l', true),
    line(...S(ext(A, 1.25)), ...S(ext(A, -0.35)), 'd'), line(...S(ext(B, 1.2)), ...S(ext(B, -0.3)), 'd'),
    text(...S([ext(A, 1.3)[0] - 4, ext(A, 1.3)[1] + 6]), 'r₁', { c: 'm' }), text(...S([ext(B, 1.25)[0] + 6, ext(B, 1.25)[1] + 6]), 'r₂', { c: 'm' }),
    line(...S(K), ...S(P), 'm'),
    ar(A, 'v', 'V_A', 6, -10), ar(B, 'v', 'V_B', 12, 4), ar(P, 'v', 'V_P', -18, 10),
    pt(...S(A), 'A', -12, -10), pt(...S(B), 'B', 12, -8), pt(...S(P), 'P', 10, -10),
    pt(...S(K), 'K', -14, 12, 'a'),
    rot(...S(K), 26, 150, 60, 'v', 'ω'),
  ], 'Corpo rigido: velocità di due punti, rette normali, centro di istantanea rotazione K');
}

// ------------------------------------------------------------------ campione comune: moto rigido piano generico
/** A(t) con velocità e accelerazione, angolo φ(t) del segmento AB con φ̇ = ω e φ̈ = ω̇; B = A + AB ê(φ) */
function moto(rnd: () => number) {
  const AB = U(rnd, 0.3, 2);
  const Aj: JV = [jt(U(rnd, -1, 1), U(rnd, -2, 2), U(rnd, -3, 3)), jt(U(rnd, -1, 1), U(rnd, -2, 2), U(rnd, -3, 3))];
  const ph: J = jt(U(rnd, -Math.PI, Math.PI), U(rnd, 0.4, 3) * (rnd() < 0.5 ? -1 : 1), U(rnd, -4, 4));
  const e = jpolar(jc(1), ph);
  const Bj = jvadd(Aj, [jmul(jc(AB), e[0]), jmul(jc(AB), e[1])]);
  return { AB, Aj, Bj, ph, e };
}

// ------------------------------------------------------------------ d004 teorema di Poisson (enunciato a p. 10)
const POI = DED('p. 10 (enunciato: «la derivata di un versore è perpendicolare al versore stesso»)', 'la dispensa enuncia il teorema senza dimostrarlo; si dimostra dal fatto che un versore ha modulo costante e, nel piano, scrivendolo con l\'angolo φ del corpo');

const sampleD004 = (rnd: () => number): Vars => {
  const ph: J = jt(U(rnd, -Math.PI, Math.PI), U(rnd, -3, 3)), be = U(rnd, 0.3, 2.5);
  const e = jpolar(jc(1), ph), e2 = jpolar(jc(1), [ph[0] + be, ph[1], ph[2]]);
  const o: Vars = { w: ph[1], ph: ph[0] };
  put(o, 'e', pos(e)); put(o, 'de', vel(e)); put(o, 'e2', pos(e2)); put(o, 'de2', vel(e2));
  return o;
};

export const d004: Dimostrazione = {
  id: 'd004',
  titolo: 'Teorema di Poisson sui versori',
  enunciato: 'Mostrare che la derivata nel tempo di un versore ê solidale a un corpo rigido è ω⃗ ∧ ê, con ω⃗ velocità angolare del corpo.',
  ipotesi: ['ê solidale al corpo: ruota con il corpo, modulo 1', 'moto piano: il corpo ruota di un angolo φ(t) attorno all\'asse k̂ normale al piano', 'la dispensa enuncia il teorema (p. 10): la dimostrazione è una deduzione (NF-106)'],
  sample: sampleD004,
  passi: [
    {
      id: 'd004.1',
      latex: L`\hat e\cdot\hat e = 1`,
      perche: 'Un versore ha modulo 1 in ogni istante: il corpo è rigido, il versore può solo ruotare.',
      fonte: D(10),
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.ex * v.ex + v.ey * v.ey, 1],
    },
    {
      id: 'd004.2',
      latex: L`\dfrac{d}{dt}(\hat e\cdot\hat e) = 2\,\hat e\cdot\dfrac{d\hat e}{dt} = 0 \;\Rightarrow\; \dfrac{d\hat e}{dt}\perp\hat e`,
      perche: 'Si deriva l\'identità: la derivata di una costante è zero, quindi il prodotto scalare fra $\\hat e$ e la sua derivata è nullo. È la frase della dispensa: la derivata di un versore è perpendicolare al versore.',
      fonte: POI,
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{d\hat e}{dt} = 0`, errore: 'concetto', spiega: 'Il modulo è costante, non il vettore: ê cambia direzione quando il corpo ruota.', num: (v) => [pv(v, 'de'), 0] },
        { latex: L`\dfrac{d\hat e}{dt}\parallel\hat e`, errore: 'concetto', spiega: 'Una derivata parallela a ê cambierebbe il modulo del versore: è proprio quello che l\'identità ê·ê = 1 esclude.', num: (v) => [v.ex * v.dey - v.ey * v.dex, 0] },
      ],
      num: (v) => [v.ex * v.dex + v.ey * v.dey, 0],
    },
    {
      id: 'd004.3',
      latex: L`\hat e = \cos\varphi\,\hat\imath + \sin\varphi\,\hat\jmath \;\Rightarrow\; \dfrac{d\hat e}{dt} = \dot\varphi\,(-\sin\varphi\,\hat\imath + \cos\varphi\,\hat\jmath)`,
      perche: 'Nel piano un versore solidale è individuato dall\'angolo $\\varphi$ che il corpo ha ruotato: derivando, la regola della catena porta fuori $\\dot\\varphi$ e il versore girato di $90^\\circ$.',
      fonte: POI,
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{d\hat e}{dt} = \dot\varphi\,(\cos\varphi\,\hat\imath + \sin\varphi\,\hat\jmath)`, errore: 'concetto', spiega: 'Sarebbe parallela a ê: contraddice il passo precedente (derivata ⊥ versore).', num: (v) => [pv(v, 'de'), v.w * pv(v, 'e')] },
        { latex: L`\dfrac{d\hat e}{dt} = \dot\varphi\,(\sin\varphi\,\hat\imath - \cos\varphi\,\hat\jmath)`, errore: 'segno', spiega: 'd(cos φ)/dt = −φ̇ sin φ e d(sin φ)/dt = +φ̇ cos φ.', num: (v) => [pv(v, 'de'), v.w * pj([Math.sin(v.ph), -Math.cos(v.ph)])] },
      ],
      num: (v) => [pv(v, 'de'), v.w * pj([-Math.sin(v.ph), Math.cos(v.ph)])],
    },
    {
      id: 'd004.4',
      latex: L`\dfrac{d\hat e}{dt} = \dot\varphi\,\hat k\wedge\hat e = \vec\omega\wedge\hat e,\qquad \vec\omega = \dot\varphi\,\hat k`,
      perche: 'Il versore girato di $90^\\circ$ in verso antiorario è $\\hat k\\wedge\\hat e$. Chiamando $\\vec\\omega = \\dot\\varphi\\,\\hat k$ la velocità angolare si ottiene la formula di Poisson.',
      fonte: D(10),
      distrattori: [
        { latex: L`\dfrac{d\hat e}{dt} = \hat e\wedge\vec\omega`, errore: 'segno', spiega: 'Il prodotto vettoriale non è commutativo: ê ∧ ω⃗ = −ω⃗ ∧ ê.', num: (v) => [pv(v, 'de'), -pj(wedge(v.w, [v.ex, v.ey]))] },
      ],
      num: (v) => [pv(v, 'de'), pj(wedge(v.w, get(v, 'e')))],
    },
    {
      id: 'd004.5',
      latex: L`\hat e' \text{ solidale (angolo } \varphi+\beta,\ \beta\ \text{cost}): \quad \dfrac{d\hat e'}{dt} = \vec\omega\wedge\hat e'`,
      perche: 'Ogni versore solidale ruota dello stesso angolo del corpo, quindi ha lo stesso $\\dot\\varphi$: $\\vec\\omega$ è una proprietà del corpo, non del versore scelto.',
      fonte: POI,
      distrattori: [],
      num: (v) => [pv(v, 'de2'), pj(wedge(v.w, get(v, 'e2')))],
    },
  ],
  risultato: { latex: L`\dfrac{d\hat e}{dt} = \vec\omega\wedge\hat e`, fonte: D(10) },
  gancio: 'Un versore non può allungarsi: può solo girare, quindi la sua derivata è ω⃗ ∧ ê.',
};

// ------------------------------------------------------------------ d005 formula fondamentale delle velocità (pp. 10–12)
const sampleD005 = (rnd: () => number): Vars => {
  const { AB, Aj, Bj, ph, e } = moto(rnd);
  const o: Vars = { AB, w: ph[1] };
  put(o, 'A', pos(Aj)); put(o, 'B', pos(Bj)); put(o, 'VA', vel(Aj)); put(o, 'VB', vel(Bj));
  put(o, 'e', pos(e)); put(o, 'de', vel(e));
  put(o, 'dBA', vel([[Bj[0][0] - Aj[0][0], Bj[0][1] - Aj[0][1], 0], [Bj[1][0] - Aj[1][0], Bj[1][1] - Aj[1][1], 0]]));
  return o;
};
const BA = (v: Vars): V2 => sub(get(v, 'B'), get(v, 'A'));

export const d005: Dimostrazione = {
  id: 'd005',
  titolo: 'Formula fondamentale delle velocità del corpo rigido',
  enunciato: 'Dimostrare la relazione fra le velocità di due punti A e B dello stesso corpo rigido.',
  ipotesi: ['corpo rigido: la distanza AB è costante nel tempo', 'moto piano, ω⃗ normale al piano', 'teorema di Poisson per il versore ê di (B − A) (p. 10)'],
  sample: sampleD005,
  passi: [
    {
      id: 'd005.1',
      latex: L`(B-A) = (B-O) - (A-O)`,
      perche: 'Il vettore che va da $A$ a $B$ è la differenza dei due vettori posizione rispetto all\'origine fissa $O$.',
      fonte: D(10),
      distrattori: [],
      num: (v) => [pj(BA(v)), pv(v, 'B') - pv(v, 'A')],
    },
    {
      id: 'd005.2',
      latex: L`(B-A) = \overline{AB}\,\hat e,\qquad \overline{AB} = \text{cost}`,
      perche: 'Qui entra la rigidità: $(B-A)$ è solidale al corpo, il suo modulo $\\overline{AB}$ non cambia, cambia solo la direzione $\\hat e$. Scrivere soltanto $(B-O) = (A-O) + (B-A)$ non basta: vale per due punti qualsiasi, anche non dello stesso corpo.',
      fonte: D(11),
      chiave: true,
      distrattori: [
        { latex: L`(B-O) = (A-O) + (B-A)`, errore: 'concetto', spiega: 'È solo una somma di vettori, vera per due punti qualsiasi: non dice che AB è costante, quindi non esprime la rigidità (errore di q02).' },
        { latex: L`(B-A) = \overline{AB}(t)\,\hat e \;\text{ con } \overline{AB}\ \text{variabile}`, errore: 'ipotesi', spiega: 'Nel corpo rigido la distanza è costante: d(AB)/dt = 0. Con AB variabile comparirebbe un termine di velocità relativa (moto relativo).' },
      ],
      num: (v) => [pj(BA(v)), v.AB * pv(v, 'e')],
    },
    {
      id: 'd005.3',
      latex: L`\dfrac{d(B-A)}{dt} = \dfrac{d(B-O)}{dt} - \dfrac{d(A-O)}{dt} = \vec V_B - \vec V_A`,
      perche: 'Si deriva il passo 1: le derivate dei vettori posizione sono le velocità assolute dei due punti.',
      fonte: D(11),
      distrattori: [],
      num: (v) => [pv(v, 'dBA'), pv(v, 'VB') - pv(v, 'VA')],
    },
    {
      id: 'd005.4',
      latex: L`\dfrac{d(\overline{AB}\,\hat e)}{dt} = \overline{AB}\,\dfrac{d\hat e}{dt} = \vec V_B - \vec V_A`,
      perche: 'Si deriva il passo 2: $\\overline{AB}$ è costante ed esce dalla derivata; resta la derivata del versore.',
      fonte: D(11),
      distrattori: [
        { latex: L`\dfrac{d(\overline{AB}\,\hat e)}{dt} = 0`, errore: 'concetto', spiega: 'Il modulo è costante, ma il versore ruota con il corpo: la derivata non è nulla.', num: (v) => [v.AB * pv(v, 'de'), 0] },
      ],
      num: (v) => [v.AB * pv(v, 'de'), pv(v, 'VB') - pv(v, 'VA')],
    },
    {
      id: 'd005.5',
      latex: L`\overline{AB}\,\dfrac{d\hat e}{dt} = \overline{AB}\,(\vec\omega\wedge\hat e) = \vec\omega\wedge(\overline{AB}\,\hat e) = \vec\omega\wedge(B-A)`,
      perche: 'Teorema di Poisson sul versore $\\hat e$, poi si riporta lo scalare $\\overline{AB}$ dentro il prodotto vettoriale e si riconosce $(B-A)$.',
      fonte: D(11),
      chiave: true,
      distrattori: [
        { latex: L`\overline{AB}\,\dfrac{d\hat e}{dt} = (B-A)\wedge\vec\omega`, errore: 'segno', spiega: 'Poisson è dê/dt = ω⃗ ∧ ê, con ω⃗ a sinistra; invertendo l\'ordine cambia il segno.', num: (v) => [v.AB * pv(v, 'de'), -pj(wedge(v.w, BA(v)))] },
        { latex: L`\overline{AB}\,\dfrac{d\hat e}{dt} = \omega\,(B-A)`, errore: 'concetto', spiega: 'La derivata di un vettore solidale è perpendicolare al vettore: serve il prodotto vettoriale, non un multiplo di (B − A).', num: (v) => [v.AB * pv(v, 'de'), v.w * pj(BA(v))] },
      ],
      num: (v) => [v.AB * pv(v, 'de'), pj(wedge(v.w, BA(v)))],
    },
    {
      id: 'd005.6',
      latex: L`\vec V_B = \vec V_A + \vec\omega\wedge(B-A)`,
      perche: 'Uguagliando i due membri: la velocità di $B$ è quella di $A$ (traslazione, uguale per tutti i punti) più la velocità di una rotazione attorno ad $A$, perpendicolare ad $AB$ e proporzionale alla distanza.',
      fonte: D(11),
      distrattori: [
        { latex: L`\vec V_B = \vec V_A + \vec\omega\wedge(A-B)`, errore: 'indice', spiega: 'Il braccio va dal punto noto A al punto cercato B: (B − A).', num: (v) => [pv(v, 'VB'), pv(v, 'VA') - pj(wedge(v.w, BA(v)))] },
        { latex: L`\vec V_B = \vec\omega\wedge(B-A)`, errore: 'termine-perso', spiega: 'Vale solo se A è fermo (cerniera fissa o CIR): in generale c\'è anche la velocità di A.', num: (v) => [pv(v, 'VB'), pj(wedge(v.w, BA(v)))] },
      ],
      num: (v) => [pv(v, 'VB'), pv(v, 'VA') + pj(wedge(v.w, BA(v)))],
    },
    {
      id: 'd005.7',
      latex: L`\text{nel piano: } \vec V_A\ (2\ \text{componenti}) + \vec\omega\ (1) \;\Rightarrow\; 3\ \text{GDL}`,
      perche: 'Conseguenza: per conoscere le velocità di tutti i punti bastano le due componenti della velocità di un punto e la velocità angolare. Un corpo rigido libero nel piano ha 3 gradi di libertà.',
      fonte: D(12),
      distrattori: [],
    },
  ],
  risultato: { latex: L`\vec V_B = \vec V_A + \vec\omega\wedge(B-A)`, fonte: D(11) },
  gancio: 'Traslazione di A più rotazione attorno ad A: il termine ω⃗∧(B−A) è sempre perpendicolare ad AB.',
};

// ------------------------------------------------------------------ d006 formula fondamentale delle accelerazioni (Rivals, pp. 12–15)
const sampleD006 = (rnd: () => number): Vars => {
  const { AB, Aj, Bj, ph } = moto(rnd);
  const o: Vars = { AB, w: ph[1], wd: ph[2] };
  put(o, 'A', pos(Aj)); put(o, 'B', pos(Bj)); put(o, 'aA', acc(Aj)); put(o, 'aB', acc(Bj));
  put(o, 'dBA', sub(vel(Bj), vel(Aj)));
  // polo fisso O nell'origine: punto Q a distanza OQ, angolo φ(t)
  const OQ = U(rnd, 0.2, 2);
  const Qj = jpolar(jc(OQ), ph);
  put(o, 'Q', pos(Qj)); put(o, 'aQ', acc(Qj));
  o.OQ = OQ;
  return o;
};

export const d006: Dimostrazione = {
  id: 'd006',
  titolo: 'Formula fondamentale delle accelerazioni (equazione di Rivals)',
  enunciato: 'Ricavare l\'accelerazione di un punto B del corpo rigido nota quella di A, la velocità angolare ω⃗ e l\'accelerazione angolare ω̇⃗; caso del polo fisso.',
  ipotesi: ['corpo rigido, formula delle velocità V⃗_B = V⃗_A + ω⃗∧(B−A)', 'moto piano: ω⃗ e ω̇⃗ normali al piano, quindi perpendicolari a (B − A) (la dispensa lo sottintende, NF-36)'],
  sample: sampleD006,
  passi: [
    {
      id: 'd006.1',
      latex: L`\dfrac{d\vec V_B}{dt} = \dfrac{d\vec V_A}{dt} + \dot{\vec\omega}\wedge(B-A) + \vec\omega\wedge\dfrac{d(B-A)}{dt}`,
      perche: 'Si deriva la formula delle velocità; il prodotto vettoriale si deriva come un prodotto: prima $\\vec\\omega$, poi il braccio.',
      fonte: D(12),
      chiave: true,
      distrattori: [],
      num: (v) => [pv(v, 'aB'), pv(v, 'aA') + pj(wedge(v.wd, BA(v))) + pj(wedge(v.w, get(v, 'dBA')))],
    },
    {
      id: 'd006.2',
      latex: L`\dfrac{d(B-A)}{dt} = \vec\omega\wedge(B-A)`,
      perche: 'È la derivata già calcolata nella formula delle velocità (Poisson su $(B-A)$ di modulo costante).',
      fonte: D(12),
      distrattori: [
        { latex: L`\dfrac{d(B-A)}{dt} = 0`, errore: 'concetto', spiega: 'La distanza è costante, il vettore no: ruota con il corpo.', num: (v) => [pv(v, 'dBA'), 0] },
      ],
      num: (v) => [pv(v, 'dBA'), pj(wedge(v.w, BA(v)))],
    },
    {
      id: 'd006.3',
      latex: L`\vec a_B = \vec a_A + \dot{\vec\omega}\wedge(B-A) + \vec\omega\wedge[\vec\omega\wedge(B-A)]`,
      perche: 'Si sostituisce la derivata del braccio.',
      fonte: D(12),
      distrattori: [],
      num: (v) => [pv(v, 'aB'), pv(v, 'aA') + pj(wedge(v.wd, BA(v))) + pj(wedge(v.w, wedge(v.w, BA(v))))],
    },
    {
      id: 'd006.4',
      latex: L`\vec\omega\perp(B-A) \;\Rightarrow\; \vec\omega\wedge[\vec\omega\wedge(B-A)] = -\omega^2\,(B-A)`,
      perche: 'Nel moto piano $\\vec\\omega$ è normale al piano e quindi perpendicolare a $(B-A)$: il doppio prodotto vettoriale dà $-\\omega^2(B-A)$, diretto da $B$ verso $A$ (centripeto). In tre dimensioni resterebbe anche $\\vec\\omega(\\vec\\omega\\cdot(B-A))$: l\'ipotesi di moto piano va detta.',
      fonte: D(12),
      chiave: true,
      distrattori: [
        { latex: L`\vec\omega\wedge[\vec\omega\wedge(B-A)] = +\omega^2\,(B-A)`, errore: 'segno', spiega: 'Il termine è centripeto: punta da B verso A, cioè contro (B − A).', num: (v) => [pj(wedge(v.w, wedge(v.w, BA(v)))), v.w * v.w * pj(BA(v))] },
        { latex: L`\vec\omega\wedge[\vec\omega\wedge\vec r] = -\omega^2\vec r\ \text{sempre, anche in 3D}`, errore: 'ipotesi', spiega: 'In generale ω⃗∧(ω⃗∧r⃗) = ω⃗(ω⃗·r⃗) − ω²r⃗: la forma −ω²r⃗ richiede ω⃗ ⊥ r⃗, cioè il moto piano.' },
      ],
      num: (v) => [pj(wedge(v.w, wedge(v.w, BA(v)))), -v.w * v.w * pj(BA(v))],
    },
    {
      id: 'd006.5',
      latex: L`\vec a_B = \vec a_A + \dot{\vec\omega}\wedge(B-A) - \omega^2\,(B-A)`,
      perche: 'Equazione di Rivals: accelerazione di $A$ (traslazione), più una componente tangenziale $\\perp AB$ dovuta a $\\dot{\\vec\\omega}$, più una centripeta lungo $AB$ verso $A$ dovuta a $\\omega$. Servono $\\vec a_A$, $\\vec\\omega$ e $\\dot{\\vec\\omega}$.',
      fonte: D(12),
      distrattori: [
        { latex: L`\vec a_B = \vec a_A - \omega^2\,(B-A)`, errore: 'termine-perso', spiega: 'Manca la tangenziale ω̇⃗ ∧ (B − A): c\'è ogni volta che la velocità angolare cambia.', num: (v) => [pv(v, 'aB'), pv(v, 'aA') - v.w * v.w * pj(BA(v))] },
        { latex: L`\vec a_B = \vec a_A + \dot{\vec\omega}\wedge(B-A) - \omega\,(B-A)`, errore: 'fattore', spiega: 'La centripeta è ω²·AB (dimensionalmente un\'accelerazione), non ω·AB.', num: (v) => [pv(v, 'aB'), pv(v, 'aA') + pj(wedge(v.wd, BA(v))) - v.w * pj(BA(v))] },
      ],
      num: (v) => [pv(v, 'aB'), pv(v, 'aA') + pj(wedge(v.wd, BA(v))) - v.w * v.w * pj(BA(v))],
    },
    {
      id: 'd006.6',
      latex: L`\vec a_O = 0:\ \vec a_A = \dot{\vec\omega}\wedge(A-O) - \omega^2(A-O) \;\Rightarrow\; |\vec a_A| = \overline{OA}\sqrt{\omega^4 + \dot\omega^2}`,
      perche: 'Polo fisso: le due componenti sono perpendicolari fra loro (una lungo $OA$, una normale), quindi il modulo è la radice della somma dei quadrati. L\'accelerazione cresce linearmente con la distanza dal polo.',
      fonte: D(15),
      distrattori: [
        { latex: L`|\vec a_A| = \overline{OA}\,(\omega^2 + \dot\omega)`, errore: 'concetto', spiega: 'Le due componenti sono ortogonali: si sommano in quadratura, non in modulo.', num: (v) => [Math.hypot(v.aQx, v.aQy), v.OQ * (v.w * v.w + Math.abs(v.wd))] },
      ],
      num: (v) => [Math.hypot(v.aQx, v.aQy), v.OQ * Math.sqrt(v.w ** 4 + v.wd ** 2)],
    },
    {
      id: 'd006.7',
      latex: L`\tan\alpha = \dfrac{\overline{OA}\,\dot\omega}{\overline{OA}\,\omega^2} = \dfrac{\dot\omega}{\omega^2}`,
      perche: 'L\'angolo $\\alpha$ fra l\'accelerazione e la centripeta $-\\omega^2(A-O)$ non dipende dal punto: tutte le accelerazioni sono inclinate dello stesso angolo e i loro estremi stanno su una retta per $O$ (figura di p. 15). Qui $\\alpha$ è un angolo, non l\'accelerazione angolare.',
      fonte: D(15),
      distrattori: [
        { latex: L`\tan\alpha = \dfrac{\omega^2}{\dot\omega}`, errore: 'indice', spiega: 'α è misurato dalla centripeta: tangente = componente tangenziale / componente centripeta.', num: (v) => [Math.abs(cross(get(v, 'aQ'), get(v, 'Q'))) / Math.abs(dot(get(v, 'aQ'), get(v, 'Q'))), (v.w * v.w) / Math.abs(v.wd)] },
      ],
      num: (v) => [Math.abs(cross(get(v, 'aQ'), get(v, 'Q'))) / Math.abs(dot(get(v, 'aQ'), get(v, 'Q'))), Math.abs(v.wd) / (v.w * v.w)],
    },
  ],
  risultato: { latex: L`\vec a_B = \vec a_A + \dot{\vec\omega}\wedge(B-A) - \omega^2\,(B-A)`, fonte: D(12) },
  gancio: 'ω̇ dà la tangenziale, ω² la centripeta verso A — nel piano.',
};

// ------------------------------------------------------------------ d007 centro di istantanea rotazione (pp. 17–18, 21–24, 39–40)
function intersez(P1: V2, d1: V2, P2: V2, d2: V2): V2 {
  const s = cross(sub(P2, P1), d2) / cross(d1, d2);
  return [P1[0] + s * d1[0], P1[1] + s * d1[1]];
}
const sampleD007 = (rnd: () => number): Vars => {
  const { Aj, Bj, ph } = moto(rnd);
  const A = pos(Aj), B = pos(Bj), VA = vel(Aj), VB = vel(Bj), w = ph[1];
  const K = intersez(A, wedge(1, VA), B, wedge(1, VB)); // rette per A e B normali alle velocità
  const Kv = intersez(A, VA, B, VB); // (distrattore) rette parallele alle velocità
  const o: Vars = { w };
  put(o, 'A', A); put(o, 'B', B); put(o, 'VA', VA); put(o, 'VB', VB); put(o, 'K', K); put(o, 'Kv', Kv);
  put(o, 'Kf', [A[0] + wedge(1, VA)[0] / w, A[1] + wedge(1, VA)[1] / w]);
  // disco che rotola senza strisciare verso destra (ω oraria): O = (R s, R), punto materiale all'angolo β − s
  const Rd = U(rnd, 0.2, 0.6), wd = U(rnd, 2, 30);
  const s: J = jt(U(rnd, 0, 3), wd); // angolo di rotolamento (orario)
  const punto = (beta: number): JV => jvadd([jmul(jc(Rd), s), jc(Rd)], jpolar(jc(Rd), [beta - s[0], -s[1], -s[2]]));
  const Oj: JV = [jmul(jc(Rd), s), jc(Rd)];
  const Kj = punto(-Math.PI / 2 + s[0]); // il punto che in questo istante è a contatto
  const Bd = punto(Math.PI + s[0]); // il punto all'altezza del centro, a sinistra
  o.Rd = Rd; o.wd = wd;
  put(o, 'VK', vel(Kj)); put(o, 'VO', vel(Oj)); put(o, 'VBd', vel(Bd)); put(o, 'aK', acc(Kj));
  // asta vincolata (pp. 21–24): A sulla guida verticale con V_A verso il basso costante, B sulla guida orizzontale
  const La = U(rnd, 0.5, 2), al = U(rnd, 0.2, 1.3), VAa = U(rnd, 0.2, 2);
  const ad = -VAa / (La * Math.cos(al)), add = (-VAa * Math.sin(al) * ad) / (La * Math.cos(al) ** 2);
  const alj: J = jt(al, ad, add);
  const xB = jmul(jc(La), jcos(alj)), yA = jmul(jc(La), jsin(alj));
  Object.assign(o, { La, al, VAa, yAd: yA[1], VBa: xB[1], aBa: xB[2], wa: -alj[1], wda: -alj[2] });
  // quadrilatero articolato (pp. 28–29): A origine, φ₄ fisso; velocità angolari dai getti della chiusura
  for (;;) {
    const Vq: [number, number, number, number] = [U(rnd, 0.25, 0.45), U(rnd, 0.9, 1.3), U(rnd, 0.7, 1.1), U(rnd, 1, 1.4)];
    const phi4 = Math.PI - U(rnd, 0, 0.3), p1 = jt(U(rnd, 0.3, 1.5), U(rnd, 0.5, 3));
    const Bq: V2 = [Vq[0] * Math.cos(p1[0]), Vq[0] * Math.sin(p1[0])], Dq: V2 = [-Vq[3] * Math.cos(phi4), -Vq[3] * Math.sin(phi4)];
    const dd = norm(sub(Dq, Bq));
    if (dd <= Math.abs(Vq[1] - Vq[2]) * 1.05 || dd >= (Vq[1] + Vq[2]) * 0.95) continue;
    const q = quadrilateroJ(Vq, phi4, p1);
    const Kq = intersez([0, 0], Bq, q.D, sub(q.C, q.D)); // prolungamenti di AB e di DC
    o.w1q = p1[1]; o.w2q = q.phi2[1]; o.w3q = q.phi3[1];
    put(o, 'Bq', q.B); put(o, 'Cq', q.C); put(o, 'Dq', q.D); put(o, 'Kq', Kq);
    break;
  }
  return o;
};

export const d007: Dimostrazione = {
  id: 'd007',
  titolo: 'Centro di istantanea rotazione (CIR)',
  enunciato: 'Mostrare che nel moto piano esiste un punto K a velocità nulla, trovarlo dalle direzioni di due velocità e usarlo per le velocità di tutti i punti; mostrare che in generale la sua accelerazione non è nulla.',
  ipotesi: ['moto piano di un corpo rigido con ω ≠ 0 (se ω = 0 l\'atto di moto è traslatorio, NF-102)', 'direzioni di V⃗_A e V⃗_B note e non parallele'],
  sample: sampleD007,
  passi: [
    {
      id: 'd007.1',
      latex: L`\vec V_K = 0`,
      perche: 'Il CIR è la traccia sul piano dell\'asse del moto: nell\'istante considerato l\'atto di moto è una rotazione pura attorno a $K$, che ha velocità nulla.',
      fonte: D(17),
      distrattori: [],
    },
    {
      id: 'd007.2',
      latex: L`\vec V_A = \cancel{\vec V_K} + \vec\omega\wedge(A-K),\qquad \vec V_B = \vec\omega\wedge(B-K)`,
      perche: 'Formula fondamentale delle velocità scritta con il polo in $K$: il termine di traslazione sparisce.',
      fonte: D(17),
      distrattori: [],
      num: (v) => [pv(v, 'VA') + pv(v, 'VB'), pj(wedge(v.w, sub(get(v, 'A'), get(v, 'K')))) + pj(wedge(v.w, sub(get(v, 'B'), get(v, 'K'))))],
    },
    {
      id: 'd007.3',
      latex: L`\vec V_A\perp(A-K),\ \vec V_B\perp(B-K) \;\Rightarrow\; K = r_1\cap r_2`,
      perche: 'Per definizione di prodotto vettoriale ogni velocità è perpendicolare al braccio: $K$ sta sulla retta $r_1$ per $A$ normale a $\\vec V_A$ e sulla retta $r_2$ per $B$ normale a $\\vec V_B$. Bastano le **direzioni** delle due velocità; $K$ non dipende dalla forma del corpo e può stare fuori dal corpo.',
      fonte: D(17),
      chiave: true,
      distrattori: [
        { latex: L`K = \text{incrocio delle rette per } A \text{ e } B \text{ parallele alle velocità}`, errore: 'concetto', spiega: 'Le velocità sono perpendicolari ai bracci (A − K), (B − K): si tracciano le normali alle velocità, non le parallele.', num: (v) => [pv(v, 'K'), pv(v, 'Kv')] },
        { latex: L`K = \text{punto medio di } AB`, errore: 'concetto', spiega: 'Il CIR dipende dalle direzioni delle velocità, non dalla posizione dei punti sul corpo.', num: (v) => [pv(v, 'K'), (pv(v, 'A') + pv(v, 'B')) / 2] },
      ],
      num: (v) => [pv(v, 'K'), pv(v, 'Kf')],
    },
    {
      id: 'd007.4',
      latex: L`V_P = \omega\,\overline{KP} \;\Rightarrow\; \omega = \dfrac{V_A}{\overline{AK}} = \dfrac{V_B}{\overline{BK}}`,
      perche: 'In modulo la velocità di ogni punto è proporzionale alla distanza da $K$: noto $K$ e una velocità si ricava $\\omega$, e il verso si legge dalla coerenza del prodotto vettoriale (regola della mano destra).',
      fonte: D(22),
      distrattori: [
        { latex: L`\omega = V_A\,\overline{AK}`, errore: 'fattore', spiega: 'V = ω·distanza, quindi ω = V/distanza.', num: (v) => [Math.abs(v.w), Math.hypot(v.VAx, v.VAy) * Math.hypot(v.Ax - v.Kx, v.Ay - v.Ky)] },
      ],
      num: (v) => [Math.abs(v.w), Math.hypot(v.VAx, v.VAy) / Math.hypot(v.Ax - v.Kx, v.Ay - v.Ky)],
    },
    {
      id: 'd007.5',
      latex: L`\text{disco che rotola: } K = \text{contatto};\quad V_O = \omega R,\quad V_B = \omega\,\overline{BK} = \sqrt2\,\omega R`,
      perche: 'Senza strisciamento il punto a contatto ha velocità nulla: è il CIR. Il centro dista $R$ da $K$, il punto $B$ all\'altezza del centro dista $\\sqrt2 R$.',
      fonte: D(18),
      distrattori: [
        { latex: L`V_B = \omega R`, errore: 'concetto', spiega: 'ωR è la velocità del centro: B dista √2 R da K, non R.', num: (v) => [Math.hypot(v.VBdx, v.VBdy), v.wd * v.Rd] },
      ],
      num: (v) => [Math.hypot(v.VOx, v.VOy) + Math.hypot(v.VBdx, v.VBdy) + Math.hypot(v.VKx, v.VKy), v.wd * v.Rd + Math.SQRT2 * v.wd * v.Rd],
    },
    {
      id: 'd007.6',
      latex: L`\text{asta vincolata: } \overline{AK} = \overline{AB}\cos\alpha,\quad \omega = \dfrac{V_A}{\overline{AB}\cos\alpha},\quad V_B = V_A\tan\alpha`,
      perche: 'Le normali alle guide sono l\'orizzontale per $A$ e la verticale per $B$: si incontrano in $K$. $\\omega$ è antioraria (con $V_A$ verso il basso) e dal triangolo delle velocità $V_B = V_A\\tan\\alpha$. Se $\\alpha = 0$, $K\\equiv B$ e $V_B = 0$.',
      fonte: D([21, 23]),
      chiave: true,
      distrattori: [
        { latex: L`V_B = V_A\,\cot\alpha`, errore: 'indice', spiega: 'Con α = 0 (asta orizzontale) B deve essere fermo: tan 0 = 0.', num: (v) => [v.VBa, v.VAa / Math.tan(v.al)] },
        { latex: L`V_B = V_A`, errore: 'concetto', spiega: 'Le velocità sono uguali solo nella traslazione: qui l\'asta ruota attorno a K.', num: (v) => [v.VBa, v.VAa] },
      ],
      num: (v) => [v.VBa + v.wa, v.VAa * Math.tan(v.al) + v.VAa / (v.La * Math.cos(v.al))],
    },
    {
      id: 'd007.7',
      latex: L`\vec a_K = -\vec\omega\wedge\vec V_{K^*}\quad(\text{ruota: } \vec V_{K^*} = \vec V_O \Rightarrow a_K = \omega^2 R \text{ verso } O)`,
      perche: '$K^*$ è il punto geometrico che insegue il CIR (non solidale al corpo): derivando $\\vec V_P = \\vec\\omega\\wedge(P-K^*)$ e confrontando con Rivals scritta con polo nel punto materiale $K$ resta $\\vec a_K = -\\vec\\omega\\wedge\\vec V_{K^*}$. Il CIR ha velocità nulla ma accelerazione no: per questo le accelerazioni non si riferiscono a $K$.',
      fonte: D([39, 40]),
      chiave: true,
      distrattori: [
        { latex: L`\vec a_K = 0`, errore: 'concetto', spiega: 'Velocità nulla in un istante non vuol dire accelerazione nulla: il punto di contatto della ruota ha a = ω²R verso il centro.', num: (v) => [pv(v, 'aK'), 0] },
        { latex: L`\vec a_K = +\vec\omega\wedge\vec V_{K^*}`, errore: 'segno', spiega: 'Per la ruota darebbe un\'accelerazione verso il basso, fuori dalla ruota: è diretta verso il centro.', num: (v) => [pv(v, 'aK'), pj(wedge(-v.wd, get(v, 'VO')))] },
      ],
      num: (v) => [pv(v, 'aK'), -pj(wedge(-v.wd, get(v, 'VO')))],
    },
    {
      id: 'd007.8',
      latex: L`\text{asta: } \vec a_B = \cancel{\vec a_A} + \dot{\vec\omega}\wedge(B-A) - \omega^2(B-A) \;\Rightarrow\; a_B = \dfrac{\overline{AB}\,\omega^2}{\cos\alpha},\quad \dot\omega = \omega^2\tan\alpha`,
      perche: 'Per le accelerazioni si usa Rivals con polo in $A$ ($V_A$ costante, $a_A = 0$). Incognite: modulo di $\\vec a_B$ (direzione della guida) e modulo di $\\dot{\\vec\\omega}\\wedge(B-A)$ (direzione $\\perp AB$): poligono dei vettori. $\\dot{\\vec\\omega}$ è oraria, opposta a $\\vec\\omega$: l\'asta rallenta (NF-104).',
      fonte: D([23, 24]),
      distrattori: [
        { latex: L`a_B = \overline{AB}\,\omega^2\cos\alpha`, errore: 'indice', spiega: 'Nel poligono la centripeta AB ω² è il cateto: a_B è l\'ipotenusa, AB ω²/cos α.', num: (v) => [Math.abs(v.aBa), v.La * v.wa ** 2 * Math.cos(v.al)] },
      ],
      num: (v) => [Math.abs(v.aBa) + Math.abs(v.wda), (v.La * v.wa ** 2) / Math.cos(v.al) + v.wa ** 2 * Math.tan(v.al)],
    },
    {
      id: 'd007.9',
      latex: L`\text{quadrilatero: } K = AB\cap DC:\quad \vec V_B = \vec\omega_2\wedge(B-K),\quad \vec V_C = \vec\omega_2\wedge(C-K) = \vec\omega_3\wedge(C-D)`,
      perche: L`$\vec V_B\perp AB$ (manovella attorno ad $A$) e $\vec V_C\perp CD$ (bilanciere attorno a $D$): il CIR della biella 2 è l'incrocio dei prolungamenti di $AB$ e $DC$. Con $\omega_1$ antioraria, nella figura $\omega_2$ è oraria e $\omega_3$ antioraria. La dispensa scrive per errore $\vec V_C = \vec\omega_3\wedge(B-K)$: con il CIR della biella serve la velocità angolare della biella e il braccio $(C-K)$.`,
      fonte: D([28, 29]),
      chiave: true,
      correzione: { nf: 'NF-14', dispensaScrive: L`\vec V_C = \vec\omega_3\wedge(B-K)` },
      distrattori: [
        { latex: L`\vec V_C = \vec\omega_3\wedge(B-K)`, errore: 'indice', spiega: 'È la riga della dispensa (NF-14): K è il CIR del corpo 2, quindi velocità angolare ω₂ e braccio (C − K).', num: (v) => [pj(wedge(v.w3q, sub(get(v, 'Cq'), get(v, 'Dq')))), pj(wedge(v.w3q, sub(get(v, 'Bq'), get(v, 'Kq'))))] },
        { latex: L`K = AD\cap BC`, errore: 'concetto', spiega: 'Le normali alle velocità di B e C sono le rette AB e DC (le aste che ruotano attorno alle cerniere fisse), non il telaio e la biella.' },
      ],
      num: (v) => [pj(wedge(v.w3q, sub(get(v, 'Cq'), get(v, 'Dq')))) + pj(wedge(v.w1q, get(v, 'Bq'))), pj(wedge(v.w2q, sub(get(v, 'Cq'), get(v, 'Kq')))) + pj(wedge(v.w2q, sub(get(v, 'Bq'), get(v, 'Kq'))))],
    },
  ],
  risultato: { latex: L`\vec V_P = \vec\omega\wedge(P-K),\quad V_P = \omega\,\overline{KP},\quad \vec a_K = -\vec\omega\wedge\vec V_{K^*}`, fonte: D([17, 40]) },
  gancio: 'Trova K con due normali, poi è tutta una rotazione: V = ω·distanza. Ma K accelera.',
};

// ------------------------------------------------------------------ argomento
export const velocita: ArgomentoContenuto = {
  id: 'c1-velocita',
  cosaDireSubito:
    'Per le velocità di un meccanismo si parte dalla formula fondamentale del corpo rigido, V⃗_B = V⃗_A + ω⃗ ∧ (B − A): la velocità di B è quella di A più una rotazione attorno ad A, sempre perpendicolare ad AB. Insieme ai vincoli — cerniere fisse, guide dei corsoi — permette di trovare tutte le velocità, e il modo più rapido è il centro di istantanea rotazione: il punto a velocità nulla, all\'incrocio delle normali alle velocità di due punti.',
  sistemaIpotesi: [
    'Sistema: corpo rigido nel piano (o membro di un meccanismo) con due punti A e B; riferimento fisso {O, x, y}.',
    'Rigidità: la distanza AB è costante, (B − A) = AB ê con ê solidale.',
    'Moto piano: ω⃗ e ω̇⃗ normali al piano (serve per −ω²(B − A) nelle accelerazioni).',
    'Vincoli: cerniera fissa ⇒ velocità nulla; corsoio ⇒ velocità lungo la guida (direzione nota, modulo incognito).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'CIR di un corpo rigido: normali r₁ e r₂ alle velocità di A e B; ogni velocità è perpendicolare alla congiungente con K e proporzionale alla distanza (dispensa p. 17).',
    fonte: D(17, 'figura manoscritta del CIR con le rette r₁ e r₂'),
    elementi: [
      { id: 'corpo', testo: 'corpo rigido con due punti A e B', obbligatorio: true },
      { id: 'velocita', testo: 'direzioni di V_A e V_B (per i vincoli: guida del corsoio, normale al raggio della cerniera)', obbligatorio: true },
      { id: 'normali', testo: 'retta r₁ per A normale a V_A e retta r₂ per B normale a V_B', obbligatorio: true },
      { id: 'cir', testo: 'K all\'incrocio delle due normali', obbligatorio: true },
      { id: 'omega', testo: 'verso di ω coerente con i versi delle velocità', obbligatorio: true },
      { id: 'altro', testo: 'velocità di un altro punto P, perpendicolare a KP e proporzionale a KP', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`(B-A) = \overline{AB}\,\hat e,\ \overline{AB} = \text{cost} \;\Rightarrow\; \vec V_B = \vec V_A + \vec\omega\wedge(B-A)`,
    spiegazione: 'La rigidità (distanza costante) più il teorema di Poisson sul versore ê.',
    fonte: D([10, 11]),
  },
  dimostrazioni: ['d004', 'd005', 'd006', 'd007'],
  significato:
    'Il moto piano di un corpo rigido è, in ogni istante, una traslazione più una rotazione: tre numeri (due componenti di una velocità e ω) bastano per tutti i punti. Il CIR rende la cosa visiva: le velocità sono quelle di una rotazione attorno a K, perpendicolari ai raggi e proporzionali alla distanza. È solo un fatto istantaneo: K cambia posizione e ha accelerazione non nulla.',
  fraseDaRicordare: 'V⃗_B = V⃗_A + ω⃗ ∧ (B − A): il termine di rotazione è sempre perpendicolare ad AB; il CIR sta all\'incrocio delle normali alle velocità.',
  daNonDire: [
    { frase: 'La rigidità è r_B = r_A + r_B/A.', perche: 'È una somma di vettori vera per qualsiasi coppia di punti: la rigidità è che il modulo di (B − A) è costante, (B − A) = AB ê (errore di q02).', fonte: D(11) },
    { frase: 'Il CIR ha accelerazione nulla, come una cerniera fissa.', perche: 'Ha velocità nulla in quell\'istante, ma a_K = −ω⃗∧V⃗_K* ≠ 0: per la ruota a_K = ω²R verso il centro.', fonte: D([18, 40]) },
    { frase: 'ω⃗∧[ω⃗∧(B − A)] = −ω²(B − A) sempre.', perche: 'Solo se ω⃗ ⊥ (B − A), cioè nel moto piano: l\'ipotesi va detta (la dispensa la sottintende, NF-36).', fonte: D(12) },
    { frase: 'Il CIR si trova incrociando le rette delle velocità.', perche: 'Si incrociano le normali alle velocità, perché ogni velocità è perpendicolare al braccio (P − K).', fonte: D(17) },
    { frase: 'Uso α per l\'accelerazione angolare.', perche: 'Nella dispensa l\'accelerazione angolare è ω̇⃗; α è sempre un angolo (pp. 15, 21).', fonte: D([12, 15]) },
  ],
  approfondimenti: [
    { domanda: 'Quanti gradi di libertà ha un corpo rigido nel piano, e perché?', tipo: 'approfondimento', attesa: 'Tre: le due componenti della velocità di un punto e la velocità angolare bastano per le velocità di tutti i punti (formula fondamentale).', fonte: D(12) },
    { domanda: 'Se le normali alle velocità sono parallele dov\'è il CIR?', tipo: 'approfondimento', attesa: 'All\'infinito: ω = 0 e l\'atto di moto è istantaneamente traslatorio (tutte le velocità uguali, le accelerazioni no se ω̇ ≠ 0). Succede alla biella del manovellismo a θ = 90°.', fonte: DED('p. 13 (atto di moto istantaneamente traslatorio)', 'con ω = 0 la formula fondamentale dà V_B = V_A per tutti i punti: nessun punto a velocità nulla al finito (NF-102)') },
    { domanda: 'Come trovi il CIR della biella del manovellismo, e dove sta ai punti morti?', tipo: 'collegamento', argomento: 'c1-manovellismo', attesa: 'Incrocio del prolungamento della manovella (normale a V_B) con la normale alla guida per C; ai punti morti K ≡ C e V_C = 0.', fonte: D(26) },
    { domanda: 'Nel pistone oleodinamico B appartiene a due corpi che scorrono uno nell\'altro: basta la formula fondamentale?', tipo: 'collegamento', argomento: 'c1-moto-relativo', attesa: 'No: fra stelo e cilindro c\'è una coppia prismatica fra membri mobili, serve la cinematica relativa V⃗_B = V⃗_t + V⃗_rel con V_rel = q/S.', fonte: D(37) },
    { domanda: 'Ruota che rotola: quanto vale l\'accelerazione del punto di contatto? Fammi l\'esempio dello pneumatico.', tipo: 'approfondimento', attesa: 'ω²R verso il centro, come tutti i punti del bordo se V_O è costante. R = 30 cm, V = 150 km/h: ω = 138,9 rad/s, a = ω²R ≈ 5787 m/s².', fonte: D(18) },
    { domanda: 'Nelle ruote dentate dove ritrovi il CIR?', tipo: 'collegamento', argomento: 'c5-ruote-dentate', attesa: 'Nel punto di contatto C delle primitive: osservando il moto solidali alla ruota 1, la ruota 2 rotola senza strisciare in C, che è il CIR del moto relativo ed è fermo rispetto a entrambe le ruote.', fonte: D(157) },
    { domanda: 'Nell\'asta vincolata in due punti dove ha la velocità minima?', tipo: 'approfondimento', attesa: 'Nel piede della perpendicolare da K all\'asta: V_min = ω·d(K, asta) = V_A sin α (nel rendering di p. 22 circa 0,68 m/s con V_A = 1 m/s).', fonte: DED('p. 22 (rendering con le velocità lungo l\'asta)', 'V_P = ω·KP è minima dove KP è minima, cioè nel piede della perpendicolare da K') },
  ],
  simboli: [
    { simbolo: '\\wedge', significato: 'prodotto vettoriale', altrove: '× in q02 e nelle dimostrazioni derivate' },
    { simbolo: '(B - A),\\ \\overline{AB}', significato: 'vettore da A a B e sua lunghezza', altrove: 'r_B/A in q02' },
    { simbolo: '\\vec\\omega,\\ \\dot{\\vec\\omega}', significato: 'velocità e accelerazione angolare del corpo', altrove: 'α per ω̇ nelle derivate (NF-10)' },
    { simbolo: 'K', significato: 'centro di istantanea rotazione (C.I.R.)', altrove: 'K₁₀, K₂₀, K₃₀ in q31 (NF-102)' },
    { simbolo: 'K^*', significato: 'punto geometrico che insegue il CIR (non solidale)' },
    { simbolo: '\\alpha', significato: 'angolo (p. 15: fra accelerazione e centripeta; p. 21: fra asta e guida)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c1-asta' }],
  previsioni: [
    {
      id: 'c1-vel-min',
      domanda: 'Asta vincolata con A che scende a velocità costante: in quale punto dell\'asta la velocità è minima?',
      opzioni: ['in A', 'in B', 'nel punto medio', 'nel piede della perpendicolare da K all\'asta'],
      corretta: 3,
      spiega: 'V_P = ω·KP: è minima dove la distanza da K è minima, cioè nel piede della perpendicolare da K (vale V_A sin α).',
      verify: () => {
        const s = astaPattini({ L: 1, alpha: 0.75, VA: 1 });
        const vs = Array.from({ length: 1001 }, (_, k) => norm(s.vel(k / 1000)));
        const kmin = vs.indexOf(Math.min(...vs)) / 1000;
        return Math.abs(kmin - s.sMin) < 2e-3 && Math.abs(kmin - 0.5) > 0.01 ? 3 : kmin < 0.01 ? 0 : kmin > 0.99 ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c1-asta' },
    },
    {
      id: 'c1-vel-acc-cir',
      domanda: 'La ruota rotola a velocità costante. Il punto a contatto con il suolo ha velocità nulla. La sua accelerazione è…',
      opzioni: ['nulla', 'ω²R verso il centro', 'ω²R verso il basso', '2ω²R'],
      corretta: 1,
      spiega: 'a_K = −ω⃗∧V⃗_O: modulo ω²R, diretta verso il centro, come per tutti i punti del bordo (p. 18, p. 40).',
      verify: () => {
        const R = 0.3, w = 10;
        const s: J = jt(0.4, w);
        const K = jvadd([jmul(jc(R), s), jc(R)], jpolar(jc(R), [-Math.PI / 2, -s[1], -s[2]]));
        const a = acc(K);
        return Math.abs(a[0]) < 1e-9 && Math.abs(a[1] - w * w * R) < 1e-9 ? 1 : 0;
      },
    },
  ],
  nf: ['NF-14', 'NF-36', 'NF-102', 'NF-104', 'NF-106'],
};
