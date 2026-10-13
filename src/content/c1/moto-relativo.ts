/**
 * C1 · Moto relativo e accelerazione di Coriolis (argomento di complemento). Dispensa pp. 33–39: formule a pp. 33–35,
 * pistone oleodinamico del cassone ribaltabile a pp. 35–39.
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import { add, jadd, jatan2, jc, jcos, jmul, jnorm, jpolar, jsin, jsub, jt, jvadd, norm, pistone, pos, scale, sub, vel, acc, wedge, type J, type JV, type V2 } from '../../engine/c1';
import { arrow, ground, hinge, line, pin, rect, rot, svg, text } from '../svg';
import { D, DED, EST, L, get, pj, put, pv } from './comune';

// ------------------------------------------------------------------ disegno (schema del ribaltabile, p. 36, con il triangolo delle velocità in B)
function disegno() {
  const S = (p: V2): V2 => [55 + p[0], 235 - p[1]];
  const ph = (25 * Math.PI) / 180, b = 200, Lc = 300, Hc = 46;
  const P = pistone({ xA: 125, yA: -12, b, phi3: ph, Vrel: 1 });
  const e: V2 = [Math.cos(ph), Math.sin(ph)], n: V2 = [-Math.sin(ph), Math.cos(ph)];
  const cen = add(scale(Lc / 2, e), scale(Hc / 2, n));
  const cS = S(cen);
  const O = S([0, 0]), A = S(P.A), B = S(P.B);
  const ab = sub(P.B, P.A);
  const cylEnd = add(P.A, scale(0.62, ab));
  const cylC = S(add(P.A, scale(0.31, ab)));
  const angCyl = (Math.atan2(ab[1], ab[0]) * 180) / Math.PI;
  const k = 92 / norm(P.VB);
  const vr = scale(k * 1, P.u), vt = scale(k, P.Vt), vb = scale(k, P.VB);
  const sv = (v: V2): V2 => [v[0], -v[1]];
  return svg(400, 290, [
    ground(10, 252, 390, 252),
    rect(cS[0] - Lc / 2, cS[1] - Hc / 2, Lc, Hc, 'soft', 25), rect(cS[0] - Lc / 2, cS[1] - Hc / 2, Lc, Hc, 'l', 25),
    text(...S(add(scale(Lc * 0.75, e), scale(Hc * 0.5, n))), '3', { c: 'm' }),
    rect(cylC[0] - 0.31 * norm(ab), cylC[1] - 11, 0.62 * norm(ab), 22, 'soft', angCyl), rect(cylC[0] - 0.31 * norm(ab), cylC[1] - 11, 0.62 * norm(ab), 22, 'l', angCyl),
    line(...S(cylEnd), ...B, 'l', 4),
    text(A[0] - 18, A[1] - 26, '1', { c: 'm' }), text(B[0] - 16, B[1] + 30, '2', { c: 'm' }),
    arrow(A[0] + 60, A[1] - 34, A[0] + 26, A[1] - 34, 'f', 'q', 14, -8),
    pin(...O), pin(...A), hinge(...B),
    text(O[0] - 4, O[1] - 16, 'O'), text(A[0] + 16, A[1] + 4, 'A'), text(B[0] - 16, B[1] - 4, 'B'),
    arrow(...B, B[0] + sv(vr)[0], B[1] + sv(vr)[1], 'a', 'V_rel', 30, 6),
    arrow(B[0] + sv(vr)[0], B[1] + sv(vr)[1], B[0] + sv(vr)[0] + sv(vt)[0], B[1] + sv(vr)[1] + sv(vt)[1], 'v', 'ω₁∧(B−A)', -10, -16),
    arrow(...B, B[0] + sv(vb)[0], B[1] + sv(vb)[1], 'f'),
    text(B[0] + sv(vb)[0] - 30, B[1] + sv(vb)[1] - 14, 'V_B = ω₃∧(B−O)', { c: 'f', size: 13 }),
    rot(...O, 30, 10, 60, 'v', 'ω₃'),
  ], 'Pistone oleodinamico del cassone ribaltabile: velocità relativa, di trascinamento e assoluta del punto B');
}

// ------------------------------------------------------------------ campione: riferimento mobile generico (getti esatti)
const sampleR = (rnd: () => number): Vars => {
  const Oj: JV = [jt(U(rnd, -1, 1), U(rnd, -2, 2), U(rnd, -2, 2)), jt(U(rnd, -1, 1), U(rnd, -2, 2), U(rnd, -2, 2))];
  const th: J = jt(U(rnd, -3, 3), U(rnd, 0.3, 3) * (rnd() < 0.5 ? -1 : 1), U(rnd, -3, 3));
  const xr: J = jt(U(rnd, -1, 1), U(rnd, -2, 2), U(rnd, -2, 2)), yr: J = jt(U(rnd, -1, 1), U(rnd, -2, 2), U(rnd, -2, 2));
  const i1 = jpolar(jc(1), th), j1: JV = [jmul(jc(-1), jsin(th)), jcos(th)];
  const PO: JV = [jadd(jmul(xr, i1[0]), jmul(yr, j1[0])), jadd(jmul(xr, i1[1]), jmul(yr, j1[1]))];
  const Pj = jvadd(Oj, PO);
  const o: Vars = { w: th[1], wd: th[2], xr: xr[0], xrd: xr[1], xrdd: xr[2], yr: yr[0], yrd: yr[1], yrdd: yr[2] };
  put(o, 'P', pos(Pj)); put(o, 'VP', vel(Pj)); put(o, 'aP', acc(Pj));
  put(o, 'O1', pos(Oj)); put(o, 'VO1', vel(Oj)); put(o, 'aO1', acc(Oj));
  put(o, 'PO', pos(PO)); put(o, 'dPO', vel(PO));
  put(o, 'i1', pos(i1)); put(o, 'j1', pos(j1)); put(o, 'di1', vel(i1)); put(o, 'dj1', vel(j1));
  put(o, 'Vrel', add(scale(xr[1], pos(i1)), scale(yr[1], pos(j1))));
  put(o, 'arel', add(scale(xr[2], pos(i1)), scale(yr[2], pos(j1))));
  // pistone del ribaltabile: cassone (O, angolo φ₃) e cilindro (A); ω̇₃ scelta in modo che q sia costante (ℓ̈ = 0)
  const xA = U(rnd, 1.2, 2), yA = U(rnd, -0.5, -0.1), b = U(rnd, 1.6, 2.6), ph = U(rnd, 0.1, 0.9), w3 = U(rnd, 0.05, 0.5);
  const geo = (w3d: number) => {
    const Bj = jpolar(jc(b), jt(ph, w3, w3d));
    const BA: JV = [jsub(Bj[0], jc(xA)), jsub(Bj[1], jc(yA))];
    return { Bj, ell: jnorm(BA), ang: jatan2(BA[1], BA[0]) };
  };
  const g0 = geo(0), g1 = geo(1);
  const w3d = -g0.ell[2] / (g1.ell[2] - g0.ell[2]);
  const g = geo(w3d);
  Object.assign(o, { b, xA, yA, w3, w3d, w1: g.ang[1], w1d: g.ang[2], ell: g.ell[0], VrelB: g.ell[1], arelB: g.ell[2], S: U(rnd, 2e-3, 2e-2) });
  put(o, 'B', pos(g.Bj)); put(o, 'VB', vel(g.Bj)); put(o, 'aB', acc(g.Bj)); put(o, 'A', [xA, yA]);
  put(o, 'u', scale(1 / g.ell[0], sub(pos(g.Bj), [xA, yA])));
  return o;
};
const BmA = (v: Vars) => sub(get(v, 'B'), get(v, 'A'));

// ------------------------------------------------------------------ d014 velocità (pp. 33–34, 35, 37)
export const d014: Dimostrazione = {
  id: 'd014',
  titolo: 'Moto relativo: composizione delle velocità',
  enunciato: 'Dimostrare che la velocità assoluta di un punto P è la somma della velocità di trascinamento e della velocità relativa a un riferimento mobile; applicarla al pistone oleodinamico.',
  ipotesi: ['riferimento fisso {O; x, y} e riferimento mobile {O\'; x\', y\'} solidale a un corpo con velocità angolare ω⃗ (moto piano)', 'P non solidale al corpo: coordinate relative x\'_P(t), y\'_P(t)', 'pistone: olio incomprimibile, portata q, sezione S'],
  sample: sampleR,
  passi: [
    {
      id: 'd014.1',
      latex: L`(P-O) = (O'-O) + (P-O')`,
      perche: 'La posizione assoluta di $P$ è quella dell\'origine mobile più la posizione di $P$ vista dal riferimento mobile.',
      fonte: D(33),
      distrattori: [],
      num: (v) => [pv(v, 'P'), pv(v, 'O1') + pv(v, 'PO')],
    },
    {
      id: 'd014.2',
      latex: L`(P-O') = x'_P\,\hat\imath' + y'_P\,\hat\jmath'`,
      perche: 'Nel riferimento mobile si scrivono le coordinate relative di $P$ sui versori mobili $\\hat\\imath\', \\hat\\jmath\'$, che ruotano con il corpo.',
      fonte: D(33),
      distrattori: [],
      num: (v) => [pv(v, 'PO'), v.xr * pv(v, 'i1') + v.yr * pv(v, 'j1')],
    },
    {
      id: 'd014.3',
      latex: L`\vec V_P = \vec V_{O'} + \dot x'_P\,\hat\imath' + x'_P\,\dfrac{d\hat\imath'}{dt} + \dot y'_P\,\hat\jmath' + y'_P\,\dfrac{d\hat\jmath'}{dt}`,
      perche: 'Si deriva: la derivata di $(O\'-O)$ è la velocità dell\'origine mobile; ogni prodotto coordinata × versore si deriva come prodotto, perché cambiano sia le coordinate sia i versori.',
      fonte: D(34),
      distrattori: [
        { latex: L`\vec V_P = \vec V_{O'} + \dot x'_P\,\hat\imath' + \dot y'_P\,\hat\jmath'`, errore: 'termine-perso', spiega: 'I versori del riferimento mobile ruotano: le loro derivate non sono nulle.', num: (v) => [pv(v, 'VP'), pv(v, 'VO1') + v.xrd * pv(v, 'i1') + v.yrd * pv(v, 'j1')] },
      ],
      num: (v) => [pv(v, 'VP'), pv(v, 'VO1') + v.xrd * pv(v, 'i1') + v.xr * pv(v, 'di1') + v.yrd * pv(v, 'j1') + v.yr * pv(v, 'dj1')],
    },
    {
      id: 'd014.4',
      latex: L`\dfrac{d\hat\imath'}{dt} = \vec\omega\wedge\hat\imath',\ \dfrac{d\hat\jmath'}{dt} = \vec\omega\wedge\hat\jmath' \;\Rightarrow\; x'_P\dfrac{d\hat\imath'}{dt} + y'_P\dfrac{d\hat\jmath'}{dt} = \vec\omega\wedge(P-O')`,
      perche: 'Teorema di Poisson sui versori mobili; raccogliendo $\\vec\\omega\\wedge$ si ritrova il vettore $(P-O\')$. La riga intermedia della dispensa ha dei refusi ($V\'_{O\'}$, $\\hat k\'$, $\\hat\\imath$ senza apice).',
      fonte: D(34),
      chiave: true,
      correzione: { nf: 'NF-36', dispensaScrive: L`V_P = V'_{O'} + \vec\omega\wedge(x'_P\hat\imath' + y'_P\hat k') + \dot x'_P\hat\imath + \dot y'_P\hat\jmath'` },
      distrattori: [
        { latex: L`x'_P\dfrac{d\hat\imath'}{dt} + y'_P\dfrac{d\hat\jmath'}{dt} = 0`, errore: 'concetto', spiega: 'Sarebbe vero solo se il riferimento mobile traslasse (ω = 0).', num: (v) => [v.xr * pv(v, 'di1') + v.yr * pv(v, 'dj1'), 0] },
        { latex: L`x'_P\dfrac{d\hat\imath'}{dt} + y'_P\dfrac{d\hat\jmath'}{dt} = \omega\,(P-O')`, errore: 'concetto', spiega: 'La derivata di un versore è perpendicolare al versore: serve ω⃗ ∧, non un multiplo.', num: (v) => [v.xr * pv(v, 'di1') + v.yr * pv(v, 'dj1'), v.w * pv(v, 'PO')] },
      ],
      num: (v) => [v.xr * pv(v, 'di1') + v.yr * pv(v, 'dj1'), pj(wedge(v.w, get(v, 'PO')))],
    },
    {
      id: 'd014.5',
      latex: L`\vec V_P = \underbrace{\vec V_{O'} + \vec\omega\wedge(P-O')}_{\vec V_t} + \underbrace{\dot x'_P\,\hat\imath' + \dot y'_P\,\hat\jmath'}_{\vec V_{rel}}`,
      perche: '$\\vec V_t$ è la velocità che $P$ avrebbe se fosse solidale al corpo (trascinamento, formula fondamentale); $\\vec V_{rel}$ è la velocità di $P$ vista da chi sta sul corpo.',
      fonte: D(34),
      chiave: true,
      distrattori: [
        { latex: L`\vec V_P = \vec V_{O'} + \vec V_{rel}`, errore: 'termine-perso', spiega: 'Manca la rotazione del riferimento: il trascinamento è V_O\' + ω⃗ ∧ (P − O\').', num: (v) => [pv(v, 'VP'), pv(v, 'VO1') + pv(v, 'Vrel')] },
        { latex: L`\vec V_P = \vec V_{O'} + \vec\omega\wedge(P-O') - \vec V_{rel}`, errore: 'segno', spiega: 'Le due velocità si sommano: la relativa è quella di P rispetto al corpo, non del corpo rispetto a P.', num: (v) => [pv(v, 'VP'), pv(v, 'VO1') + pj(wedge(v.w, get(v, 'PO'))) - pv(v, 'Vrel')] },
      ],
      num: (v) => [pv(v, 'VP'), pv(v, 'VO1') + pj(wedge(v.w, get(v, 'PO'))) + pv(v, 'Vrel')],
    },
    {
      id: 'd014.6',
      latex: L`q = \dfrac{dV}{dt} = \dfrac{dx}{dt}\,S \;\Rightarrow\; V_{rel} = \dfrac{q}{S}`,
      perche: 'Pistone oleodinamico: l\'olio è incomprimibile, il volume che entra nel tempo $dt$ è la sezione per lo spostamento del pistone. La velocità relativa pistone–cilindro è la portata divisa per la sezione, diretta lungo l\'asse del cilindro (unico moto permesso dalla coppia prismatica). La dispensa scrive per refuso $dx/ds$.',
      fonte: D([35, 36]),
      correzione: { nf: 'NF-36', dispensaScrive: L`V_{rel} = \frac{dx}{ds}` },
      distrattori: [
        { latex: L`V_{rel} = q\,S`, errore: 'fattore', spiega: 'Portata = sezione × velocità: V = q/S (m³/s diviso m² dà m/s).', num: (v) => [v.VrelB, v.VrelB * v.S * v.S] },
      ],
    },
    {
      id: 'd014.7',
      latex: L`\vec V_B = \vec V_{rel,B} + \vec V_{t,B},\qquad \vec V_{t,B} = \cancel{\vec V_A} + \vec\omega_1\wedge(B-A)`,
      perche: 'Ribaltabile: riferimento mobile sul cilindro 1 (di cui la portata dà la velocità relativa), punto $P = B$ dello stelo 2. Il trascinamento è la velocità di $B$ pensato solidale al cilindro, che ruota attorno alla cerniera fissa $A$.',
      fonte: D(37),
      distrattori: [],
      num: (v) => [pv(v, 'VB'), v.VrelB * pv(v, 'u') + pj(wedge(v.w1, BmA(v)))],
    },
    {
      id: 'd014.8',
      latex: L`\vec V_B = \vec\omega_3\wedge(B-O) \;\Rightarrow\; \vec V_{rel,B} + \vec\omega_1\wedge(B-A) = \vec\omega_3\wedge(B-O)`,
      perche: '$B$ appartiene anche al cassone 3, incernierato in $O$. Uguagliando le due espressioni: noto tutto di $\\vec V_{rel}$, le direzioni degli altri due vettori ($\\perp AB$ e $\\perp OB$): il poligono delle velocità dà $\\omega_1$ e $\\omega_3$.',
      fonte: D([37, 38]),
      chiave: true,
      distrattori: [
        { latex: L`\vec V_{rel,B} = \vec\omega_3\wedge(B-O)`, errore: 'termine-perso', spiega: 'Il cilindro ruota attorno ad A mentre il cassone si alza: c\'è anche il trascinamento ω⃗₁ ∧ (B − A).', num: (v) => [v.VrelB * pv(v, 'u'), pj(wedge(v.w3, get(v, 'B')))] },
        { latex: L`\vec\omega_1\wedge(B-A) = \vec\omega_3\wedge(B-O)`, errore: 'concetto', spiega: 'Così stelo e cilindro sarebbero un corpo solo (formula fondamentale): c\'è la coppia prismatica, serve V_rel.', num: (v) => [pj(wedge(v.w1, BmA(v))), pj(wedge(v.w3, get(v, 'B')))] },
      ],
      num: (v) => [v.VrelB * pv(v, 'u') + pj(wedge(v.w1, BmA(v))), pj(wedge(v.w3, get(v, 'B')))],
    },
  ],
  risultato: { latex: L`\vec V_P = \vec V_t + \vec V_{rel} = \vec V_{O'} + \vec\omega\wedge(P-O') + \dot x'_P\,\hat\imath' + \dot y'_P\,\hat\jmath'`, fonte: D(34) },
  gancio: 'Assoluta = trascinamento (come se fosse saldato al corpo) + relativa (come la vede chi sta sul corpo).',
};

// ------------------------------------------------------------------ d015 accelerazioni e Coriolis (pp. 34–35, 38–39)
const omPO = (v: Vars) => wedge(v.w, get(v, 'PO'));
export const d015: Dimostrazione = {
  id: 'd015',
  titolo: 'Moto relativo: accelerazioni e accelerazione di Coriolis',
  enunciato: 'Dimostrare che l\'accelerazione assoluta è la somma delle accelerazioni di trascinamento, relativa e di Coriolis 2ω⃗∧V⃗_rel; applicarla al pistone oleodinamico.',
  ipotesi: ['come per le velocità (d014); moto piano: ω⃗ ⊥ (P − O\')', 'pistone: portata q costante ⇒ a_rel = 0'],
  sample: sampleR,
  passi: [
    {
      id: 'd015.1',
      latex: L`\vec a_P = \vec a_{O'} + \dot{\vec\omega}\wedge(P-O') + \vec\omega\wedge\dfrac{d(P-O')}{dt} + \ddot x'_P\hat\imath' + \dot x'_P\dfrac{d\hat\imath'}{dt} + \ddot y'_P\hat\jmath' + \dot y'_P\dfrac{d\hat\jmath'}{dt}`,
      perche: 'Si deriva la velocità termine per termine: il trascinamento come prodotto vettoriale, la relativa come somma di prodotti coordinata × versore.',
      fonte: D(34),
      distrattori: [],
      num: (v) => [pv(v, 'aP'), pv(v, 'aO1') + pj(wedge(v.wd, get(v, 'PO'))) + pj(wedge(v.w, get(v, 'dPO'))) + v.xrdd * pv(v, 'i1') + v.xrd * pv(v, 'di1') + v.yrdd * pv(v, 'j1') + v.yrd * pv(v, 'dj1')],
    },
    {
      id: 'd015.2',
      latex: L`\dfrac{d(P-O')}{dt} = \vec\omega\wedge(P-O') + \vec V_{rel}`,
      perche: 'Dal calcolo delle velocità: $(P-O\')$ cambia perché il riferimento ruota **e** perché $P$ si muove in esso. Non è solo $\\vec\\omega\\wedge(P-O\')$ come in un corpo rigido.',
      fonte: D(34),
      distrattori: [
        { latex: L`\dfrac{d(P-O')}{dt} = \vec\omega\wedge(P-O')`, errore: 'ipotesi', spiega: 'Vale se P è solidale al corpo; qui P si muove nel riferimento: si aggiunge V_rel (ed è da qui che nasce uno dei due Coriolis).', num: (v) => [pv(v, 'dPO'), pj(omPO(v))] },
      ],
      num: (v) => [pv(v, 'dPO'), pj(omPO(v)) + pv(v, 'Vrel')],
    },
    {
      id: 'd015.3',
      latex: L`\dot x'_P\dfrac{d\hat\imath'}{dt} + \dot y'_P\dfrac{d\hat\jmath'}{dt} = \vec\omega\wedge(\dot x'_P\hat\imath' + \dot y'_P\hat\jmath') = \vec\omega\wedge\vec V_{rel}`,
      perche: 'Poisson sui versori mobili, questa volta moltiplicati per le velocità relative: è il **secondo** $\\vec\\omega\\wedge\\vec V_{rel}$. Il primo esce da $\\vec\\omega\\wedge d(P-O\')/dt$.',
      fonte: D(34),
      chiave: true,
      distrattori: [
        { latex: L`\dot x'_P\dfrac{d\hat\imath'}{dt} + \dot y'_P\dfrac{d\hat\jmath'}{dt} = 0`, errore: 'concetto', spiega: 'I versori mobili ruotano anche mentre P vi scorre: questo termine c\'è e vale ω⃗ ∧ V_rel.', num: (v) => [v.xrd * pv(v, 'di1') + v.yrd * pv(v, 'dj1'), 0] },
        { latex: L`\dot x'_P\dfrac{d\hat\imath'}{dt} + \dot y'_P\dfrac{d\hat\jmath'}{dt} = \vec a_{rel}`, errore: 'concetto', spiega: 'L\'accelerazione relativa è ẍ\'î\' + ÿ\'ĵ\': qui si derivano i versori, non le coordinate.', num: (v) => [v.xrd * pv(v, 'di1') + v.yrd * pv(v, 'dj1'), pv(v, 'arel')] },
      ],
      num: (v) => [v.xrd * pv(v, 'di1') + v.yrd * pv(v, 'dj1'), pj(wedge(v.w, get(v, 'Vrel')))],
    },
    {
      id: 'd015.4',
      latex: L`\vec\omega\wedge[\vec\omega\wedge(P-O')] = -\omega^2(P-O')`,
      perche: 'Moto piano: $\\vec\\omega$ è perpendicolare a $(P-O\')$ e il doppio prodotto vettoriale dà la centripeta (ipotesi sottintesa in D, NF-36).',
      fonte: D(34),
      distrattori: [],
      num: (v) => [pj(wedge(v.w, omPO(v))), -v.w * v.w * pv(v, 'PO')],
    },
    {
      id: 'd015.5',
      latex: L`\vec a_P = \vec a_{O'} + \dot{\vec\omega}\wedge(P-O') - \omega^2(P-O') + \ddot x'_P\hat\imath' + \ddot y'_P\hat\jmath' + 2\,\vec\omega\wedge\vec V_{rel}`,
      perche: 'Si sostituisce e si raccoglie: i due $\\vec\\omega\\wedge\\vec V_{rel}$ si sommano. Il fattore 2 è il cuore della dimostrazione.',
      fonte: D(35),
      chiave: true,
      distrattori: [
        { latex: L`\cdots + \vec\omega\wedge\vec V_{rel}`, errore: 'fattore', spiega: 'ω⃗ ∧ V_rel compare due volte: dalla derivata del braccio (P − O\') e da quella dei versori della velocità relativa.', num: (v) => [pv(v, 'aP'), pv(v, 'aO1') + pj(wedge(v.wd, get(v, 'PO'))) - v.w * v.w * pv(v, 'PO') + pv(v, 'arel') + pj(wedge(v.w, get(v, 'Vrel')))] },
        { latex: L`\vec a_P = \vec a_{O'} + \dot{\vec\omega}\wedge(P-O') - \omega^2(P-O') + \vec a_{rel}`, errore: 'termine-perso', spiega: 'Manca Coriolis: la somma «trascinamento + relativa» vale per le velocità, non per le accelerazioni.', num: (v) => [pv(v, 'aP'), pv(v, 'aO1') + pj(wedge(v.wd, get(v, 'PO'))) - v.w * v.w * pv(v, 'PO') + pv(v, 'arel')] },
        { latex: L`\cdots - 2\,\vec\omega\wedge\vec V_{rel}`, errore: 'segno', spiega: 'Il segno meno è della forza d\'inerzia di Coriolis (−m a_cc); l\'accelerazione ha +2 ω⃗ ∧ V_rel.', num: (v) => [pv(v, 'aP'), pv(v, 'aO1') + pj(wedge(v.wd, get(v, 'PO'))) - v.w * v.w * pv(v, 'PO') + pv(v, 'arel') - 2 * pj(wedge(v.w, get(v, 'Vrel')))] },
      ],
      num: (v) => [pv(v, 'aP'), pv(v, 'aO1') + pj(wedge(v.wd, get(v, 'PO'))) - v.w * v.w * pv(v, 'PO') + pv(v, 'arel') + 2 * pj(wedge(v.w, get(v, 'Vrel')))],
    },
    {
      id: 'd015.6',
      latex: L`\vec a_P = \vec a_t + \vec a_{rel} + \vec a_{cc},\quad \vec a_t = \vec a_{O'} + \dot{\vec\omega}\wedge(P-O') - \omega^2(P-O'),\ \ \vec a_{cc} = 2\,\vec\omega\wedge\vec V_{rel}`,
      perche: 'Trascinamento: l\'accelerazione che $P$ avrebbe se fosse solidale al corpo (Rivals). Relativa: quella vista dal corpo. Coriolis: il termine in più, nullo se il riferimento non ruota o se $P$ è fermo nel riferimento. Attenzione: qui $\\vec a_t$ è di trascinamento, non tangenziale (NF-105).',
      fonte: D(35),
      distrattori: [],
      num: (v) => [pv(v, 'aP'), pv(v, 'aO1') + pj(wedge(v.wd, get(v, 'PO'))) - v.w * v.w * pv(v, 'PO') + pv(v, 'arel') + 2 * pj(wedge(v.w, get(v, 'Vrel')))],
    },
    {
      id: 'd015.7',
      latex: L`q = \text{cost} \Rightarrow \vec a_{rel} = 0:\quad \dot{\vec\omega}_1\wedge(B-A) - \omega_1^2(B-A) + 2\,\vec\omega_1\wedge\vec V_{rel,B} = \dot{\vec\omega}_3\wedge(B-O) - \omega_3^2(B-O)`,
      perche: 'Pistone: trascinamento sul cilindro (Rivals con polo $A$ fisso), Coriolis con la velocità angolare del cilindro; dall\'altra parte $B$ come punto del cassone. Incognite i moduli di $\\dot\\omega_1$ e $\\dot\\omega_3$: poligono delle accelerazioni. La dispensa scrive per refuso $(B-D)$ al posto di $(B-O)$.',
      fonte: D([38, 39]),
      chiave: true,
      correzione: { nf: 'NF-36', dispensaScrive: L`\cdots = \dot{\vec\omega}_3\wedge(B-D) - \omega_3^2(B-D)` },
      distrattori: [
        { latex: L`\dot{\vec\omega}_1\wedge(B-A) - \omega_1^2(B-A) = \dot{\vec\omega}_3\wedge(B-O) - \omega_3^2(B-O)`, errore: 'termine-perso', spiega: 'Anche con a_rel = 0 resta Coriolis: lo stelo scorre in un cilindro che ruota.', num: (v) => [pj(wedge(v.w1d, BmA(v))) - v.w1 ** 2 * pj(BmA(v)), pj(wedge(v.w3d, get(v, 'B'))) - v.w3 ** 2 * pv(v, 'B')] },
        { latex: L`\cdots + 2\,\vec\omega_3\wedge\vec V_{rel,B} = \cdots`, errore: 'indice', spiega: 'Coriolis usa la velocità angolare del riferimento mobile, cioè del cilindro 1: ω⃗₁.', num: (v) => [pj(wedge(v.w1d, BmA(v))) - v.w1 ** 2 * pj(BmA(v)) + 2 * v.VrelB * pj(wedge(v.w3, get(v, 'u'))), pj(wedge(v.w3d, get(v, 'B'))) - v.w3 ** 2 * pv(v, 'B')] },
      ],
      num: (v) => [pj(wedge(v.w1d, BmA(v))) - v.w1 ** 2 * pj(BmA(v)) + 2 * v.VrelB * pj(wedge(v.w1, get(v, 'u'))) + 1e3 * v.arelB, pj(wedge(v.w3d, get(v, 'B'))) - v.w3 ** 2 * pv(v, 'B')],
    },
    {
      id: 'd015.8',
      latex: L`|\vec a_{cc}| = 2\,\omega_1 V_{rel},\qquad \vec a_{cc}\perp \text{asse del cilindro}`,
      perche: 'Nel piano $\\vec\\omega_1$ è normale a $\\vec V_{rel}$: Coriolis ha modulo $2\\omega_1 V_{rel}$ ed è $\\vec V_{rel}$ ruotata di $90^\\circ$ nel verso di $\\omega_1$. Raddoppiando la portata raddoppiano sia $V_{rel}$ sia $\\omega_1$: Coriolis quadruplica (osservazione aggiunta: la dispensa non la scrive).',
      fonte: D(39),
      distrattori: [
        { latex: L`|\vec a_{cc}| = \omega_1 V_{rel}`, errore: 'fattore', spiega: 'Il fattore 2 resta anche nel modulo.', num: (v) => [2 * Math.abs(v.w1) * v.VrelB, Math.abs(v.w1) * v.VrelB] },
      ],
      num: (v) => [2 * Math.abs(v.w1) * v.VrelB, 2 * norm(wedge(v.w1, get(v, 'u'))) * Math.abs(v.VrelB)],
    },
  ],
  risultato: { latex: L`\vec a_P = \vec a_t + \vec a_{rel} + 2\,\vec\omega\wedge\vec V_{rel}`, fonte: D(35) },
  gancio: 'Coriolis = 2ω⃗∧V_rel: la rotazione del riferimento entra due volte, nel braccio e nei versori.',
};

// ------------------------------------------------------------------ argomento
const G0 = { xA: 1.6, yA: -0.3, b: 2.2, phi3: 0.4 };
export const motoRelativo: ArgomentoContenuto = {
  id: 'c1-moto-relativo',
  cosaDireSubito:
    'Quando un punto si muove rispetto a un corpo che a sua volta si muove — come lo stelo che scorre nel cilindro di un pistone oleodinamico — si scrive la sua posizione in un riferimento mobile solidale al corpo e si deriva. La velocità assoluta è trascinamento più relativa; l\'accelerazione è trascinamento più relativa più Coriolis, 2ω⃗∧V⃗_rel, che nasce perché il riferimento ruota mentre il punto vi scorre.',
  sistemaIpotesi: [
    'Sistema: riferimento fisso {O; x, y} e riferimento mobile {O\'; x\', y\'} solidale a un corpo con ω⃗; punto P non solidale.',
    'Moto piano: ω⃗ normale al piano (serve per −ω²(P − O\')).',
    'Pistone del ribaltabile (p. 36): cilindro 1 (cerniera A), stelo 2, cassone 3 (cerniera O); 9 − 8 = 1 GDL; olio incomprimibile, portata q, sezione S.',
    'Portata costante ⇒ V_rel costante, a_rel = 0.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Cassone ribaltabile (dispensa p. 36): in B la velocità relativa lungo il cilindro più il trascinamento ω₁∧(B−A) danno la velocità assoluta ω₃∧(B−O).',
    fonte: D([36, 38], 'schema del ribaltabile e poligono delle velocità'),
    elementi: [
      { id: 'corpi', testo: 'cassone 3 incernierato in O, cilindro 1 incernierato in A, stelo 2 incernierato al cassone in B', obbligatorio: true },
      { id: 'scelta', testo: 'riferimento mobile sul cilindro 1, punto P = B dello stelo', obbligatorio: true },
      { id: 'vrel', testo: 'V_rel lungo l\'asse del cilindro (modulo q/S)', obbligatorio: true },
      { id: 'vt', testo: 'trascinamento ω₁ ∧ (B − A), perpendicolare al cilindro', obbligatorio: true },
      { id: 'vb', testo: 'V_B = ω₃ ∧ (B − O), perpendicolare a OB, che chiude il triangolo', obbligatorio: true },
      { id: 'coriolis', testo: 'per le accelerazioni: Coriolis 2ω₁ ∧ V_rel perpendicolare al cilindro', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`(P-O) = (O'-O) + x'_P\,\hat\imath' + y'_P\,\hat\jmath'`,
    spiegazione: 'Posizione assoluta come origine mobile più coordinate relative sui versori mobili; poi si deriva due volte con Poisson.',
    fonte: D(33),
  },
  dimostrazioni: ['d014', 'd015'],
  significato:
    'La cinematica relativa serve quando due membri mobili sono collegati da una coppia prismatica (stelo e cilindro, perno e glifo): la formula fondamentale da sola non basta. Coriolis è un\'accelerazione vera del punto: nasce perché il punto scorre in un riferimento che ruota, e cambia sia la direzione della velocità relativa sia la distanza dal centro di rotazione.',
  fraseDaRicordare: 'Velocità: trascinamento + relativa. Accelerazione: trascinamento + relativa + Coriolis 2ω⃗∧V⃗_rel.',
  daNonDire: [
    { frase: 'L\'accelerazione di Coriolis è ω⃗ ∧ V⃗_rel.', perche: 'Il termine compare due volte: 2ω⃗ ∧ V⃗_rel.', fonte: D(35) },
    { frase: 'Anche le accelerazioni sono trascinamento più relativa.', perche: 'Vale per le velocità; per le accelerazioni si aggiunge Coriolis.', fonte: D(35) },
    { frase: 'Nel pistone uso Coriolis con la velocità angolare del cassone.', perche: 'Coriolis usa la ω del riferimento mobile, cioè del cilindro 1: 2ω⃗₁ ∧ V⃗_rel.', fonte: D(38) },
    { frase: 'Stelo e cilindro li tratto come un corpo solo con la formula fondamentale.', perche: 'Fra i due c\'è una coppia prismatica: la loro distanza cambia, serve la velocità relativa q/S.', fonte: D(37) },
    { frase: 'In V_t + V_rel il pedice t vuol dire tangenziale.', perche: 'Qui t è trascinamento; a p. 7 a_t era la tangenziale (NF-105).', fonte: D([7, 35]) },
  ],
  approfondimenti: [
    { domanda: 'Da dove viene il 2 di Coriolis?', tipo: 'approfondimento', attesa: 'Un ω⃗∧V⃗_rel viene dalla derivata del braccio (P − O\'), che cambia anche perché P scorre; l\'altro dalla derivata dei versori mobili nella velocità relativa.', fonte: D([34, 35]) },
    { domanda: 'Nel ribaltabile come scegli riferimento mobile e punto?', tipo: 'approfondimento', attesa: 'Riferimento sul cilindro 1, perché la portata dà proprio la velocità relativa stelo–cilindro; punto P = B, che appartiene allo stelo 2 (e al cassone 3).', fonte: D(37) },
    { domanda: 'Quanti gradi di libertà ha il ribaltabile?', tipo: 'approfondimento', attesa: 'Tre corpi mobili (9 GDL), tre rotoidali e una prismatica (8 gradi di vincolo): 1 GDL, comandato dalla portata.', fonte: D(36) },
    { domanda: 'Se la velocità relativa è nulla cosa resta?', tipo: 'collegamento', argomento: 'c1-velocita', attesa: 'Solo il trascinamento: la formula fondamentale delle velocità e Rivals per le accelerazioni, come per un punto del corpo rigido.', fonte: D([11, 12]) },
    { domanda: 'Nel manovellismo il pistone scorre in una guida: serve la cinematica relativa?', tipo: 'collegamento', argomento: 'c1-manovellismo', attesa: 'No: la guida è fissa (il riferimento non ruota), la velocità relativa è la velocità assoluta del pistone e Coriolis è nullo. Serve quando la guida si muove, come nel pistone oleodinamico o nel glifo.', fonte: DED('pp. 25 e 35', 'con ω del riferimento nulla il termine di Coriolis si annulla') },
    { domanda: 'Raddoppi la portata a parità di posizione: cosa succede a Coriolis?', tipo: 'approfondimento', attesa: 'Le velocità sono lineari in q: raddoppiano V_rel e ω₁. Coriolis 2ω₁V_rel quadruplica.', fonte: DED('pp. 37–39', 'il poligono delle velocità è lineare in V_rel = q/S') },
    { domanda: 'V_rel = q/S vale da tutti e due i lati del pistone?', tipo: 'approfondimento', attesa: 'Dal lato senza stelo S è l\'area del pistone; dal lato dello stelo l\'area utile è la corona S − S_stelo, quindi a pari portata il pistone va più veloce.', fonte: EST('oleodinamica di base, cilindri a doppio effetto', 'precisazione non presente nella dispensa (NF-110)') },
    { domanda: 'Che legame c\'è con il 2ṙθ̇ delle coordinate polari?', tipo: 'collegamento', argomento: 'c1-cinematica-punto', attesa: 'È lo stesso termine: in coordinate polari il riferimento (ê_r, ê_θ) ruota con θ̇ e il punto vi scorre con ṙ: 2ṙθ̇ è Coriolis del riferimento polare.', fonte: DED('d003 e p. 35', 'confronto fra le due formule') },
  ],
  simboli: [
    { simbolo: "\\{O'; x', y'\\},\\ \\hat\\imath',\\ \\hat\\jmath'", significato: 'riferimento mobile solidale al corpo e suoi versori' },
    { simbolo: '\\vec V_t,\\ \\vec V_{rel}', significato: 'velocità di trascinamento e relativa', altrove: 'v_O\' + ω×r_rel e v_rel in d014' },
    { simbolo: '\\vec a_t,\\ \\vec a_{rel},\\ \\vec a_{cc}', significato: 'accelerazione di trascinamento, relativa, di Coriolis (a p. 7 a_t è la tangenziale)', altrove: 'α×r + ω×(ω×r) in d015 (α = ω̇)' },
    { simbolo: 'q,\\ S', significato: 'portata volumetrica e sezione del cilindro' },
    { simbolo: '\\omega_1,\\ \\omega_3', significato: 'velocità angolari del cilindro e del cassone' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c1-pistone' }],
  previsioni: [
    {
      id: 'c1-rel-coriolis',
      domanda: 'Nel ribaltabile raddoppi la portata q, a parità di posizione del cassone. L\'accelerazione di Coriolis…',
      opzioni: ['resta uguale', 'raddoppia', 'quadruplica', 'si annulla'],
      corretta: 2,
      spiega: 'Raddoppiano V_rel = q/S e anche ω₁ (il poligono delle velocità è lineare): 2ω₁V_rel diventa quattro volte più grande.',
      verify: () => {
        const a = pistone({ ...G0, Vrel: 0.1 }), b = pistone({ ...G0, Vrel: 0.2 });
        const k = norm(b.aCor) / norm(a.aCor);
        return [1, 2, 4, 0].findIndex((x) => Math.abs(x - k) < 1e-9);
      },
      visual: { kind: 'meccanismo', id: 'c1-pistone' },
    },
  ],
  nf: ['NF-36', 'NF-105', 'NF-110'],
};
