/**
 * C1 · Statica e dinamica dei meccanismi: equazioni cardinali, forze d'inerzia, forze vive (argomento di complemento).
 * Dispensa pp. 45–66. D'Alembert non è nominato (p. 56); forze vive ed energia cinetica sono enunciate, non dimostrate:
 * dimostrazioni per deduzione (NF-106).
 */
import type { ArgomentoContenuto, Dimostrazione, Vars } from '../types';
import { U } from '../../engine/num';
import {
  add, astaPattini, cross, distRetta, dot, jatan2, jc, jcos, jmul, jpolar, jsc, jsin, jsqrt, jsub, jt, norm, pos, scale, sub, unit, acc, wedge,
  type J, type JV, type V2,
} from '../../engine/c1';
import { arrow, dot as pto, poly, rot, svg, text } from '../svg';
import { D, DED, EST, L, get, pj, put, pv } from './comune';

// ------------------------------------------------------------------ disegno (figure di pp. 55–56: corpo con forze, G, a_G, forza e coppia d'inerzia)
function disegno() {
  const body: V2[] = [[70, 120], [95, 60], [170, 38], [260, 48], [325, 92], [330, 170], [282, 232], [190, 250], [110, 224], [72, 178]];
  const G: V2 = [205, 140];
  return svg(400, 290, [
    poly(body, 'soft', true), poly(body, 'l', true),
    pto(110, 80, 'P₁', -14, -8), arrow(110, 80, 150, 108, 'f', 'F₁', 6, 12),
    pto(95, 170, 'P₂', -16, 0), arrow(95, 170, 102, 222, 'f', 'F₂', 12, 0),
    pto(300, 112, 'P_i', 14, -10), arrow(300, 112, 252, 112, 'f', 'F_i', -4, -12),
    pto(170, 232, 'P_m', -6, 14), arrow(170, 232, 150, 196, 'f', 'F_m', -14, 0),
    rot(118, 150, 14, 120, 30, 'f', 'C₁'), rot(292, 190, 16, 210, 330, 'f', 'C₂'),
    pto(G[0], G[1], 'G', -14, -10, 'a'),
    arrow(G[0], G[1], G[0] + 14, G[1] + 46, 'a', 'a_G', 16, -2),
    arrow(G[0], G[1], G[0] - 14, G[1] - 46, 'v', 'F_in', -26, 6),
    rot(G[0], G[1], 20, 190, 260, 'a', 'ω̇'), rot(G[0], G[1], 30, 40, -40, 'v', 'C_in'),
    text(200, 274, 'F_in = −M a_G,   C_in = −I_G ω̇', { c: 'm', size: 13 }),
  ], 'Corpo rigido con forze e coppie esterne, accelerazione del baricentro, forza e coppia d\'inerzia');
}

// ------------------------------------------------------------------ d017 equilibrio statico (pp. 45–49)
const sampleS = (rnd: () => number): Vars => {
  const r = U(rnd, 0.03, 0.15), l = r / U(rnd, 0.15, 0.45), th = U(rnd, 0.2, Math.PI - 0.2), F = U(rnd, 100, 2000), w = U(rnd, 10, 300);
  const B: V2 = [r * Math.cos(th), r * Math.sin(th)];
  const xC = B[0] + Math.sqrt(l * l - B[1] * B[1]);
  const C: V2 = [xC, 0];
  const u = scale(1 / l, sub(C, B)); // da B a C
  const g = Math.atan2(B[1], xC - B[0]);
  // pistone: −F x̂ + P û + N ŷ = 0
  const P = F / u[0], N = -P * u[1];
  const F21 = scale(-P, u);
  const C1 = -cross(B, F21);
  // velocità vera del pistone (getti) per il controllo con le potenze
  const T: J = jt(th, w), sg = jsc(r / l, jsin(T));
  const xCj = jsub(jsc(r, jcos(T)), jsc(-l, jsqrt(jsub(jc(1), jmul(sg, sg)))));
  // forza su un braccio della biella (pp. 49–52): F_v in P₂, F₃₂ verticale in C, F₁₂ in B
  const n = wedge(1, u);
  const P2 = add(B, scale(0.4 * l, u), scale(-0.25 * l, n));
  const be = U(rnd, -1.4, -0.3), Fm = U(rnd, 100, 2000);
  const Fv: V2 = [Fm * Math.cos(be), Fm * Math.sin(be)];
  const f32 = -cross(sub(P2, B), Fv) / (C[0] - B[0]);
  const F12b = sub(scale(-1, Fv), [0, f32]);
  const tt = (C[0] - P2[0]) / Fv[0];
  const H = add(P2, scale(tt, Fv));
  const o: Vars = { r, l, th, F, w, P, N, C1, g, VC: xCj[1], f32, b: distRetta([0, 0], B, u) };
  put(o, 'B', B); put(o, 'C', C); put(o, 'u', u); put(o, 'F21', F21); put(o, 'F32', scale(-P, u));
  put(o, 'F12b', F12b); put(o, 'H', H); put(o, 'P2', P2); put(o, 'Fv', Fv);
  return o;
};

export const d017: Dimostrazione = {
  id: 'd017',
  titolo: 'Equilibrio statico di un meccanismo: equazioni cardinali, corpi a due e a tre forze, manovellismo',
  enunciato: 'Impostare l\'equilibrio dei membri isolati di un meccanismo con le equazioni cardinali della statica, dedurne le regole dei corpi a due e a tre forze e applicarle al manovellismo con una forza sul pistone.',
  ipotesi: ['corpi rigidi in quiete (o a velocità costante con masse trascurate)', 'masse dei membri e attrito trascurati', 'reazioni vincolari: cerniera = forza per il perno, direzione qualsiasi; prismatica = forza normale alla guida'],
  sample: sampleS,
  passi: [
    {
      id: 'd017.1',
      latex: L`\begin{cases} \sum_i \vec F_i = 0 \\ \sum_i (P_i-O)\wedge\vec F_i + \sum_j \vec C_j = 0 \end{cases}`,
      perche: 'Un corpo è in equilibrio statico se sono nulle la risultante delle forze e il momento risultante (forze e coppie) rispetto a un polo $O$ qualsiasi. Per un sistema di corpi valgono con le sole forze **esterne**.',
      fonte: D([45, 46]),
      distrattori: [],
    },
    {
      id: 'd017.2',
      latex: L`\text{nel piano: } 2 + 1\ \text{equazioni scalari per corpo}`,
      perche: 'La prima equazione è vettoriale (due componenti), la seconda ha la sola componente normale al piano: tre equazioni per ogni membro isolato.',
      fonte: D(46),
      distrattori: [],
    },
    {
      id: 'd017.3',
      latex: L`\vec F_A + \vec F_B = 0,\quad (B-A)\wedge\vec F_B = 0 \;\Rightarrow\; \vec F_A,\ \vec F_B \text{ sulla retta } AB`,
      perche: 'Corpo con due sole forze: la traslazione le rende opposte, la rotazione attorno ad $A$ annulla il momento di $\\vec F_B$, quindi $\\vec F_B$ è parallela a $(B-A)$. È il caso della biella con le masse trascurate: la forza che trasmette passa per le due cerniere.',
      fonte: D([46, 48]),
      chiave: true,
      distrattori: [
        { latex: L`\vec F_A + \vec F_B = 0 \text{ basta: possono avere rette d'azione parallele qualsiasi}`, errore: 'termine-perso', spiega: 'Due forze opposte su rette diverse formano una coppia: serve anche l\'equilibrio alla rotazione, che le porta sulla stessa retta.' },
        { latex: L`\vec F_{3,2}\perp BC`, errore: 'concetto', spiega: 'Una biella scarica trasmette forza solo lungo la congiungente delle cerniere.', num: (v) => [cross(sub(get(v, 'C'), get(v, 'B')), get(v, 'F32')), norm(get(v, 'F32')) * v.l] },
      ],
      num: (v) => [cross(sub(get(v, 'C'), get(v, 'B')), get(v, 'F32')), 0],
    },
    {
      id: 'd017.4',
      latex: L`\text{tre forze: } \vec F_C \text{ passa per } H = r_A \cap r_B`,
      perche: 'Corpo con tre forze di cui si conoscono due direzioni: scritto l\'equilibrio alla rotazione attorno al punto $H$ d\'incontro delle due rette d\'azione, le prime due non danno momento; quindi anche la terza deve passare per $H$. Nel manovellismo con la forza sulla biella (pp. 49–52) $\\vec F_{1,2}$ passa per $B$ e per l\'incrocio di $\\vec F$ con la verticale per $C$.',
      fonte: D([46, 51]),
      chiave: true,
      distrattori: [
        { latex: L`\vec F_{1,2} \text{ diretta lungo la biella } BC`, errore: 'concetto', spiega: 'Con un carico applicato fra le cerniere la biella non è più un corpo a due forze: la direzione di F₁,₂ si trova con la regola delle tre forze.', num: (v) => [cross(get(v, 'F12b'), get(v, 'u')), 0] },
        { latex: L`\vec F_{1,2} \text{ parallela a } \vec F`, errore: 'concetto', spiega: 'Tre forze non parallele in equilibrio sono concorrenti, non parallele.', num: (v) => [cross(get(v, 'F12b'), get(v, 'Fv')), 0] },
      ],
      num: (v) => [cross(get(v, 'F12b'), sub(get(v, 'H'), get(v, 'B'))), 0],
    },
    {
      id: 'd017.5',
      latex: L`\vec F + \vec F_{2,3} + \vec R_3 = 0 \;\Rightarrow\; F_{2,3} = \dfrac{F}{\cos\gamma},\quad R_3 = F\tan\gamma`,
      perche: 'Manovellismo con $\\vec F$ sul pistone: la biella è a due forze, quindi $\\vec F_{2,3}$ è lungo $BC$; sul pistone tre forze per $C$, e la reazione della guida (normale all\'asse) passa per $C$. Dal triangolo delle forze: componente orizzontale della spinta uguale a $F$, componente verticale equilibrata dalla guida.',
      fonte: D([47, 48]),
      chiave: true,
      distrattori: [
        { latex: L`F_{2,3} = F\cos\gamma,\quad R_3 = F\sin\gamma`, errore: 'indice', spiega: 'È F la proiezione orizzontale della spinta, non il contrario: F₂,₃ cos γ = F.', num: (v) => [v.P, v.F * Math.cos(v.g)] },
        { latex: L`F_{2,3} = F,\quad R_3 = 0`, errore: 'concetto', spiega: 'Con la biella inclinata la spinta ha una componente verticale: la guida reagisce con F tan γ.', num: (v) => [v.P, v.F] },
      ],
      num: (v) => [v.P + 3 * v.N, v.F / Math.cos(v.g) + 3 * v.F * Math.tan(v.g)],
    },
    {
      id: 'd017.6',
      latex: L`\vec R_A = -\vec F_{2,1},\qquad \vec C_1 = -(B-A)\wedge\vec F_{2,1},\qquad C_1 = F_{2,1}\,b,\ \ b = r\sin(\theta+\gamma)`,
      perche: 'Sulla manovella agiscono $\\vec F_{2,1}$ in $B$, la reazione in $A$ e la coppia: con il polo in $A$ la reazione non dà momento e la coppia equilibrante è **opposta** al momento di $\\vec F_{2,1}$ (oraria nella figura). Il braccio $b$ è la distanza di $A$ dalla retta $BC$. La dispensa scrive $\\vec C_1 = (B-A)\\wedge\\vec F_{2,1}$, con il segno sbagliato (verso e modulo dichiarati sono giusti).',
      fonte: D(49),
      chiave: true,
      correzione: { nf: 'NF-15', dispensaScrive: L`\vec C_1 = (B-A)\wedge\vec F_{2,1}` },
      distrattori: [
        { latex: L`\vec C_1 = (B-A)\wedge\vec F_{2,1}`, errore: 'segno', spiega: 'È la riga della dispensa (NF-15): l\'equilibrio è (B − A) ∧ F₂,₁ + C₁ = 0, quindi C₁ = −(B − A) ∧ F₂,₁.', num: (v) => [v.C1, cross(get(v, 'B'), get(v, 'F21'))] },
        { latex: L`C_1 = F_{2,1}\,r`, errore: 'concetto', spiega: 'Il braccio è la distanza di A dalla retta d\'azione (la biella), non la lunghezza della manovella.', num: (v) => [Math.abs(v.C1), v.P * v.r] },
      ],
      num: (v) => [v.C1 + 2 * v.b, -v.P * v.r * Math.sin(v.th + v.g) + 2 * v.r * Math.sin(v.th + v.g)],
    },
    {
      id: 'd017.7',
      latex: L`C_1 = -\dfrac{F\,r\sin(\theta+\gamma)}{\cos\gamma};\qquad \theta = 0,\pi \Rightarrow b = 0,\ C_1 = 0;\qquad \vec C_1\cdot\vec\omega_1 + \vec F\cdot\vec V_C = 0`,
      perche: 'Mettendo insieme: ai punti morti manovella e biella sono allineate, il braccio è nullo e una forza sul pistone non dà coppia (per questo serve un volano). Controllo con le potenze: con masse nulle e senza attrito la potenza della coppia equilibra quella della forza, come nel teorema delle forze vive.',
      fonte: DED('p. 49 e p. 64', 'C₁ = F₂,₁ b con F₂,₁ = F/cos γ; ai punti morti b = 0 (NF-108); bilancio delle potenze con V_C esatta del manovellismo'),
      distrattori: [],
      num: (v) => [v.C1 * v.w, v.F * v.VC],
    },
  ],
  risultato: { latex: L`C_1 = F_{2,1}\,b = \dfrac{F}{\cos\gamma}\,r\sin(\theta+\gamma)\ \ (\text{oraria}),\qquad \vec C_1 = -(B-A)\wedge\vec F_{2,1}`, fonte: D(49), correzione: { nf: 'NF-15', dispensaScrive: L`\vec C_1 = (B-A)\wedge\vec F_{2,1}` } },
  gancio: 'Isola un corpo alla volta, partendo da quello con la forza nota; due forze ⇒ stessa retta, tre forze ⇒ concorrenti.',
};

// ------------------------------------------------------------------ d018 azione e reazione: quadrilatero frantumatore (pp. 47–54)
const sampleQ = (rnd: () => number): Vars => {
  const t1 = U(rnd, 0.6, 1.2), r1 = U(rnd, 0.2, 0.4);
  const B: V2 = [r1 * Math.cos(t1), r1 * Math.sin(t1)];
  const Dp: V2 = [U(rnd, 1.1, 1.5), U(rnd, -0.6, -0.3)];
  const a3 = U(rnd, 1.7, 2.0); // asta 3 quasi verticale, estremo in alto un po' a sinistra
  const e3: V2 = [Math.cos(a3), Math.sin(a3)];
  const c3 = U(rnd, 0.5, 0.8), t3 = c3 + U(rnd, 0.2, 0.5), F = U(rnd, 100, 3000);
  const C = add(Dp, scale(c3, e3)), T = add(Dp, scale(t3, e3));
  const u = unit(sub(C, B)); // direzione della biella 2, da B a C
  const Fv = scale(-F, u); // forza resistente parallela a BC, verso sinistra-basso
  // momenti rispetto a D sul corpo 3: (T−D)∧F + (C−D)∧(P û) = 0
  const P = -cross(sub(T, Dp), Fv) / cross(sub(C, Dp), u);
  const F23 = scale(P, u);
  const RD = scale(-1, add(Fv, F23));
  const F21 = scale(-P, u);
  const C1 = -cross(B, F21);
  const o: Vars = { F, P, C1, bf: distRetta(Dp, T, u), b: distRetta(Dp, C, u), b21: distRetta([0, 0], B, u), r1 };
  put(o, 'u', u); put(o, 'RD', RD); put(o, 'F32', scale(-1, F23)); put(o, 'B', B); put(o, 'C', C); put(o, 'F21', F21);
  return o;
};

export const d018: Dimostrazione = {
  id: 'd018',
  titolo: 'Azioni scambiate fra i membri: azione e reazione (quadrilatero frantumatore)',
  enunciato: 'Ricavare le forze scambiate fra i membri di un meccanismo e la coppia motrice, passando da un corpo libero al successivo con il principio di azione e reazione (quadrilatero articolato con forza resistente sul corpo 3).',
  ipotesi: ['masse trascurate, niente attrito', 'forza resistente F⃗ sul corpo 3, parallela alla biella BC (p. 52)', 'convenzione degli indici: F⃗_{i,j} è la forza che il corpo i esercita sul corpo j'],
  sample: sampleQ,
  passi: [
    {
      id: 'd018.1',
      latex: L`\vec F_{i,j} = -\vec F_{j,i}`,
      perche: 'Principio di azione e reazione: la forza che $i$ esercita su $j$ è uguale e opposta a quella che $j$ esercita su $i$. La dispensa lo usa senza nominarlo, per passare da un corpo libero al successivo.',
      fonte: D([48, 51]),
      distrattori: [],
    },
    {
      id: 'd018.2',
      latex: L`\text{corpo 2 (due forze): } \vec F_{1,2} = -\vec F_{3,2} \text{ lungo } BC \;\Rightarrow\; \vec F_{2,3} \parallel BC`,
      perche: 'Si parte dal corpo di cui si può dedurre la direzione: la biella 2 scarica è a due forze, quindi trasmette lungo $BC$. Per azione e reazione anche $\\vec F_{2,3}$ (sul corpo 3) è parallela a $BC$.',
      fonte: D(53),
      distrattori: [],
      num: (v) => [cross(get(v, 'F32'), get(v, 'u')), 0],
    },
    {
      id: 'd018.3',
      latex: L`\vec F \parallel BC,\ \vec F_{2,3}\parallel BC \;\Rightarrow\; \vec R_D \parallel BC`,
      perche: 'Sul corpo 3 agiscono tre forze e due sono parallele: le rette «concorrono all\'infinito», quindi anche la reazione della cerniera $D$ è parallela alle altre due.',
      fonte: D(53),
      distrattori: [
        { latex: L`\vec R_D \perp BC`, errore: 'concetto', spiega: 'Con tre forze in equilibrio e due parallele, la risultante delle prime due è parallela a loro: la terza deve esserle opposta.', num: (v) => [cross(get(v, 'RD'), get(v, 'u')), norm(get(v, 'RD'))] },
      ],
      num: (v) => [cross(get(v, 'RD'), get(v, 'u')), 0],
    },
    {
      id: 'd018.4',
      latex: L`F\,b_f - F_{2,3}\,b = 0 \;\Rightarrow\; F_{2,3} = \dfrac{F\,b_f}{b}`,
      perche: 'Equilibrio alla rotazione del corpo 3 attorno a $D$: la reazione in $D$ non dà momento; $\\vec F$ e $\\vec F_{2,3}$ hanno versi opposti e bracci $b_f$ e $b$ (distanze di $D$ dalle loro rette d\'azione).',
      fonte: D(54),
      chiave: true,
      distrattori: [
        { latex: L`F_{2,3} = \dfrac{F\,b}{b_f}`, errore: 'indice', spiega: 'La forza più vicina a D (braccio b più piccolo) deve essere la più grande per bilanciare il momento.', num: (v) => [v.P, (v.F * v.b) / v.bf] },
        { latex: L`F_{2,3} = F`, errore: 'concetto', spiega: 'Uguali solo se i bracci sono uguali: il corpo 3 fa da leva.', num: (v) => [v.P, v.F] },
      ],
      num: (v) => [v.P, (v.F * v.bf) / v.b],
    },
    {
      id: 'd018.5',
      latex: L`\vec R_D = -(\vec F + \vec F_{2,3}),\qquad R_D = F_{2,3} - F \ \text{(nel verso di } \vec F)`,
      perche: 'Equilibrio alla traslazione del corpo 3: le tre forze sono parallele, quindi i moduli si sommano con il segno.',
      fonte: DED('p. 54', 'prima equazione cardinale sul corpo 3 con le tre forze parallele'),
      distrattori: [
        { latex: L`R_D = F_{2,3} + F`, errore: 'segno', spiega: 'F e F₂,₃ hanno versi opposti: la reazione è la loro differenza.', num: (v) => [norm(get(v, 'RD')), v.P + v.F] },
      ],
      num: (v) => [norm(get(v, 'RD')), v.P - v.F],
    },
    {
      id: 'd018.6',
      latex: L`\vec F_{2,1} = -\vec F_{1,2},\quad \vec R_1 = -\vec F_{2,1},\quad C_1 = F_{2,1}\,b_{2,1}\ \ (\text{oraria})`,
      perche: 'Si torna al corpo 1 con azione e reazione: in modulo $F_{1,2} = F_{3,2} = F_{2,3}$. Con il polo in $A$ la reazione non dà momento e la coppia motrice equilibra il momento di $\\vec F_{2,1}$, di braccio $b_{2,1}$ (distanza di $A$ dalla retta $BC$).',
      fonte: D(54),
      chiave: true,
      distrattori: [
        { latex: L`C_1 = F_{2,1}\,\overline{AB}`, errore: 'concetto', spiega: 'Il braccio è la distanza di A dalla retta d\'azione di F₂,₁ (la biella), non la lunghezza della manovella.', num: (v) => [Math.abs(v.C1), v.P * v.r1] },
        { latex: L`C_1 = F\,b_{2,1}`, errore: 'indice', spiega: 'Sulla manovella arriva F₂,₁ = F b_f/b, non la forza resistente: il corpo 3 fa da leva.', num: (v) => [Math.abs(v.C1), v.F * v.b21] },
      ],
      num: (v) => [v.C1, -v.P * v.b21],
    },
  ],
  risultato: { latex: L`F_{2,3} = \dfrac{F\,b_f}{b},\qquad C_1 = F_{2,1}\,b_{2,1} = \dfrac{F\,b_f}{b}\,b_{2,1}`, fonte: D(54) },
  gancio: 'La stessa interazione compare due volte, con verso opposto: isola, risolvi, passa al vicino cambiando segno.',
};

// ------------------------------------------------------------------ d019 forze d'inerzia (D'Alembert) e Applicazione 1 (pp. 55–60)
const sampleA = (rnd: () => number): Vars => {
  const Lr = U(rnd, 0.5, 2), al = U(rnd, 0.2, 1.3), VA = U(rnd, 0.2, 2), M = U(rnd, 1, 20), IG = ((M * Lr * Lr) / 12) * U(rnd, 0.8, 1.2), g = 9.81;
  const ad = -VA / (Lr * Math.cos(al)), add2 = (-VA * Math.sin(al) * ad) / (Lr * Math.cos(al) ** 2);
  const alj: J = jt(al, ad, add2);
  const xB = jmul(jc(Lr), jcos(alj)), yA = jmul(jc(Lr), jsin(alj));
  const xG = jsc(0.5, xB), yG = jsc(0.5, yA);
  const w = -alj[1], wd = -alj[2], aGx = xG[2], aGy = yG[2];
  const A: V2 = [0, yA[0]], B: V2 = [xB[0], 0], G: V2 = [xG[0], yG[0]];
  // Newton–Eulero (indipendente dalle formule di p. 60): incognite F₁₂ₓ, F₁₂ᵧ, F₃₂
  const F12x = M * aGx;
  const AG = sub(A, G), BG = sub(B, G);
  const F32 = (IG * wd - AG[0] * (M * g + M * aGy) + AG[1] * F12x) / (BG[0] - AG[0]);
  const F12y = M * g + M * aGy - F32;
  const o: Vars = { L: Lr, al, VA, M, IG, g, w, wd, aGx, aGy, aBx: xB[2], VB: xB[1], F12x, F12y, F32 };
  put(o, 'A', A); put(o, 'B', B); put(o, 'G', G);
  return o;
};

export const d019: Dimostrazione = {
  id: 'd019',
  titolo: 'Forza e coppia d\'inerzia: l\'equilibrio dinamico (D\'Alembert) e l\'asta con due pattini',
  enunciato: 'Trasformare le equazioni cardinali della dinamica in un equilibrio con la forza e la coppia d\'inerzia, e applicarle all\'asta con due pattini (Applicazione 1) per la forza da applicare al pattino a velocità costante.',
  ipotesi: ['corpo rigido piano: massa M, baricentro G, momento d\'inerzia baricentrico I_G', 'Applicazione 1: asta AB di massa M con A sulla guida verticale (V_A costante verso il basso) e B sulla orizzontale; pattini di massa trascurabile, niente attrito', 'il nome «D\'Alembert» non è nella dispensa (NF-106)'],
  sample: sampleA,
  passi: [
    {
      id: 'd019.1',
      latex: L`\begin{cases} \sum_i \vec F_i^{\,est} = M\,\vec a_G \\ \sum_i (P_i-G)\wedge\vec F_i^{\,est} + \sum_j \vec C_j = I_G\,\dot{\vec\omega} \end{cases}`,
      perche: 'Equazioni cardinali della dinamica (moto piano, polo nel baricentro): le forze esterne accelerano il baricentro, i loro momenti e le coppie fanno nascere l\'accelerazione angolare. Dinamica diretta: dalle forze alle accelerazioni; inversa: dalle accelerazioni volute alle forze.',
      fonte: D([55, 56]),
      distrattori: [],
    },
    {
      id: 'd019.2',
      latex: L`\vec F_{ine} = -M\vec a_G,\ \ \vec C_{ine} = -I_G\dot{\vec\omega} \;\Rightarrow\; \begin{cases} \sum_i \vec F_i^{\,est} + \vec F_{ine} = 0 \\ \sum_i (P_i-G)\wedge\vec F_i^{\,est} + \sum_j \vec C_j + \vec C_{ine} = 0 \end{cases}`,
      perche: 'Si portano i termini inerziali a sinistra cambiati di segno: forza e coppia d\'inerzia si trattano come forze e coppie esterne e la dinamica diventa un «equilibrio» (principio di D\'Alembert, fonte esterna per il nome). Nell\'asta: forza peso, forze dei pattini e forza d\'inerzia hanno risultante nulla.',
      fonte: D(56),
      chiave: true,
      distrattori: [
        { latex: L`\vec F_{ine} = +M\vec a_G`, errore: 'segno', spiega: 'La forza d\'inerzia è opposta all\'accelerazione: è il termine M a_G portato a sinistra.', num: (v) => [v.F12x, -v.M * v.aGx] },
        { latex: L`\sum_i \vec F_i^{\,est} + \vec F_{ine} = 0 \text{ e } \sum_i (P_i-G)\wedge\vec F_i^{\,est} = 0`, errore: 'termine-perso', spiega: 'Se il corpo ha accelerazione angolare serve anche la coppia d\'inerzia −I_G ω̇.' },
      ],
      num: (v) => [v.F12x + 2 * (v.F12y + v.F32 - v.M * v.g), v.M * v.aGx + 2 * v.M * v.aGy],
    },
    {
      id: 'd019.3',
      latex: L`\omega_2 = \dfrac{V_A}{\overline{K_2A}} = \dfrac{V_A}{\overline{AB}\cos\alpha},\qquad V_B = V_A\tan\alpha`,
      perche: 'Prima la cinematica: il CIR $K_2$ dell\'asta è l\'incrocio dell\'orizzontale per $A$ con la verticale per $B$; $\\omega_2$ è antioraria per avere $\\vec V_A$ verso il basso.',
      fonte: D(58),
      distrattori: [],
      num: (v) => [v.w + v.VB, v.VA / (v.L * Math.cos(v.al)) + v.VA * Math.tan(v.al)],
    },
    {
      id: 'd019.4',
      latex: L`\vec a_B = \dot{\vec\omega}_2\wedge(B-A) - \omega_2^2(B-A):\quad a_B = -\dfrac{V_A^2}{\overline{AB}\cos^3\alpha},\quad \dot\omega_2 = -\dfrac{V_A^2\sin\alpha}{\overline{AB}^2\cos^3\alpha}`,
      perche: 'Rivals con $a_A = 0$: poligono delle accelerazioni con $\\vec a_B$ orizzontale e $\\dot{\\vec\\omega}_2\\wedge(B-A)\\perp AB$. Risolto: $\\vec a_B$ verso sinistra e $\\dot{\\vec\\omega}_2$ oraria (l\'asta rallenta).',
      fonte: DED('pp. 58–59 (poligono delle accelerazioni)', 'risoluzione del poligono: la dispensa dà i versi, i moduli sono quelli dell\'asta vincolata di p. 24 (NF-104)'),
      distrattori: [],
      num: (v) => [v.aBx + v.wd, -(v.VA ** 2) / (v.L * Math.cos(v.al) ** 3) - (v.VA ** 2 * Math.sin(v.al)) / (v.L ** 2 * Math.cos(v.al) ** 3)],
    },
    {
      id: 'd019.5',
      latex: L`\vec a_G = \cancel{\vec a_A} + \dot{\vec\omega}_2\wedge(G-A) - \omega_2^2(G-A) = \tfrac12\,\vec a_B`,
      perche: '$G$ è a metà di $AB$ e $a_A = 0$: i due termini di Rivals sono la metà di quelli di $B$, quindi $\\vec a_G$ è metà di $\\vec a_B$, orizzontale verso sinistra.',
      fonte: D(59),
      chiave: true,
      distrattori: [
        { latex: L`\vec a_G = 0`, errore: 'concetto', spiega: 'A scende a velocità costante, ma l\'asta ruota con ω₂ variabile: il baricentro accelera.', num: (v) => [v.aGx, 0] },
        { latex: L`\vec a_G = \vec a_B`, errore: 'fattore', spiega: 'Con a_A = 0 l\'accelerazione cresce linearmente lungo l\'asta: a metà vale metà.', num: (v) => [v.aGx, v.aBx] },
      ],
      num: (v) => [v.aGx + 3 * v.aGy, v.aBx / 2],
    },
    {
      id: 'd019.6',
      latex: L`F_{in}\,\overline{AG}\sin\alpha - Mg\,\overline{AG}\cos\alpha + F_{3,2}\,\overline{AB}\cos\alpha + C_{in} = 0 \;\Rightarrow\; F_{3,2} = \dfrac{Mg\,\overline{AG}\cos\alpha - F_{in}\overline{AG}\sin\alpha - C_{in}}{\overline{AB}\cos\alpha}`,
      perche: 'Momenti rispetto ad $A$ (così $\\vec F_{1,2}$ non compare): $F_{in} = M|a_G|$ verso destra con braccio $AG\\sin\\alpha$, peso con braccio $AG\\cos\\alpha$, $F_{3,2}$ verticale (pattino 3 a due forze) con braccio $AB\\cos\\alpha$, coppia d\'inerzia antioraria $C_{in} = I_G|\\dot\\omega_2|$. Versi come nel disegno della dispensa (NF-107).',
      fonte: D(60),
      chiave: true,
      distrattori: [
        { latex: L`F_{3,2} = \dfrac{Mg\,\overline{AG}\cos\alpha - F_{in}\overline{AG}\sin\alpha}{\overline{AB}\cos\alpha}`, errore: 'termine-perso', spiega: 'Manca la coppia d\'inerzia: l\'asta ha accelerazione angolare, C_in = −I_G ω̇₂ entra nei momenti.', num: (v) => [v.F32, (v.M * v.g * (v.L / 2) * Math.cos(v.al) - -v.M * v.aGx * (v.L / 2) * Math.sin(v.al)) / (v.L * Math.cos(v.al))] },
        { latex: L`F_{3,2} = \dfrac{Mg\,\overline{AG}\cos\alpha + F_{in}\overline{AG}\sin\alpha - C_{in}}{\overline{AB}\cos\alpha}`, errore: 'segno', spiega: 'F_in è verso destra e applicata sotto A: il suo momento rispetto ad A ha il verso di quello di F₃,₂ (antiorario), opposto a quello del peso.', num: (v) => [v.F32, (v.M * v.g * (v.L / 2) * Math.cos(v.al) + -v.M * v.aGx * (v.L / 2) * Math.sin(v.al) - -v.IG * v.wd) / (v.L * Math.cos(v.al))] },
      ],
      num: (v) => [v.F32, (v.M * v.g * (v.L / 2) * Math.cos(v.al) - -v.M * v.aGx * (v.L / 2) * Math.sin(v.al) - -v.IG * v.wd) / (v.L * Math.cos(v.al))],
    },
    {
      id: 'd019.7',
      latex: L`F_{12,x} = -F_{in},\qquad F_{12,y} = Mg - F_{3,2},\qquad \vec F = -\vec F_{2,1y} = F_{12,y}\,\hat\jmath`,
      perche: 'Le due componenti della traslazione danno $\\vec F_{1,2}$; sul pattino 1 (massa trascurata) la forza da applicare per tenere $V_A$ costante equilibra la componente verticale di $\\vec F_{2,1} = -\\vec F_{1,2}$ (la reazione della guida è orizzontale).',
      fonte: D(60),
      distrattori: [
        { latex: L`F_{12,y} = Mg + F_{3,2}`, errore: 'segno', spiega: 'F₃,₂ è verso l\'alto come F₁₂,ᵧ: insieme equilibrano il peso.', num: (v) => [v.F12y, v.M * v.g + v.F32] },
      ],
      num: (v) => [v.F12x + 2 * v.F12y, v.M * v.aGx + 2 * (v.M * v.g - v.F32)],
    },
  ],
  risultato: { latex: L`\vec F_{ine} = -M\vec a_G,\ \ \vec C_{ine} = -I_G\dot{\vec\omega};\qquad F_{3,2} = \dfrac{Mg\,\overline{AG}\cos\alpha - F_{in}\overline{AG}\sin\alpha - C_{in}}{\overline{AB}\cos\alpha}`, fonte: D([56, 60]) },
  gancio: 'Porta M a_G e I_G ω̇ fra le forze, col segno meno: la dinamica diventa statica. Prima la cinematica, poi le forze.',
};

// ------------------------------------------------------------------ d020 forza e coppia d'inerzia rispetto a un polo fisso (p. 61)
const sampleO = (rnd: () => number): Vars => {
  const ph: J = jt(U(rnd, -3, 3), U(rnd, -4, 4), U(rnd, -6, 6));
  const ms = Array.from({ length: 5 }, () => U(rnd, 0.2, 2));
  const sb: V2[] = Array.from({ length: 5 }, () => [U(rnd, 0.1, 1.2), U(rnd, -0.6, 0.6)]);
  const M = ms.reduce((a, b) => a + b, 0);
  const pts: JV[] = sb.map((s) => {
    const r = Math.hypot(s[0], s[1]), a0 = Math.atan2(s[1], s[0]);
    return jpolar(jc(r), [ph[0] + a0, ph[1], ph[2]]);
  });
  const G = scale(1 / M, pts.reduce<V2>((acc2, p, k) => add(acc2, scale(ms[k], pos(p))), [0, 0]));
  const aG = scale(1 / M, pts.reduce<V2>((acc2, p, k) => add(acc2, scale(ms[k], acc(p))), [0, 0]));
  const IG = pts.reduce((s, p, k) => s + ms[k] * dot(sub(pos(p), G), sub(pos(p), G)), 0);
  const IO = pts.reduce((s, p, k) => s + ms[k] * dot(pos(p), pos(p)), 0);
  const Cvero = pts.reduce((s, p, k) => s + cross(pos(p), scale(-ms[k], acc(p))), 0); // momento delle inerzie rispetto a O
  const o: Vars = { w: ph[1], wd: ph[2], M, IG, IO, Cvero, OG: norm(G) };
  put(o, 'G', G); put(o, 'aG', aG);
  return o;
};
const FinG = (v: Vars) => scale(-v.M, get(v, 'aG'));

export const d020: Dimostrazione = {
  id: 'd020',
  titolo: 'Forza e coppia d\'inerzia rispetto a un polo fisso',
  enunciato: 'Per un corpo che ruota attorno a un polo fisso O, ridurre forza e coppia d\'inerzia al polo O e mostrare che la coppia d\'inerzia è −I_O ω̇ con I_O = I_G + M·OG².',
  ipotesi: ['corpo rigido piano incernierato nel polo fisso O, con ω e ω̇', 'moto piano: ω̇⃗ ⊥ (G − O)'],
  sample: sampleO,
  passi: [
    {
      id: 'd020.1',
      latex: L`\vec a_G = \vec a_{G,n} + \vec a_{G,t} = -\omega^2(G-O) + \dot{\vec\omega}\wedge(G-O)`,
      perche: 'Rivals con il polo fisso $O$: componente normale verso $O$ e componente tangenziale perpendicolare a $OG$.',
      fonte: D(61),
      distrattori: [],
      num: (v) => [pv(v, 'aG'), -v.w * v.w * pv(v, 'G') + pj(wedge(v.wd, get(v, 'G')))],
    },
    {
      id: 'd020.2',
      latex: L`\vec F_{ine,G} = -M\vec a_G = M\omega^2(G-O) - M\dot{\vec\omega}\wedge(G-O),\qquad \vec C_{ine,G} = -I_G\dot{\vec\omega}`,
      perche: 'Forza d\'inerzia applicata in $G$: una parte centrifuga (verso l\'esterno, lungo $OG$) e una tangenziale opposta a $\\vec a_{G,t}$; coppia d\'inerzia baricentrica opposta a $\\dot{\\vec\\omega}$.',
      fonte: D(61),
      distrattori: [],
      num: (v) => [pj(FinG(v)), v.M * v.w * v.w * pv(v, 'G') - v.M * pj(wedge(v.wd, get(v, 'G')))],
    },
    {
      id: 'd020.3',
      latex: L`\vec F_{ine,O} = \vec F_{ine,G},\qquad \vec C_{ine,O} = \vec C_{ine,G} + (G-O)\wedge\vec F_{ine,G}`,
      perche: 'Trasporto al polo $O$: la forza resta la stessa, la coppia cambia del momento della forza rispetto al nuovo polo (teorema del trasporto dei momenti). È quello che conviene quando le reazioni incognite sono in $O$.',
      fonte: D(61),
      chiave: true,
      distrattori: [
        { latex: L`\vec C_{ine,O} = \vec C_{ine,G}`, errore: 'termine-perso', spiega: 'Spostando una forza cambia il suo momento: va aggiunto (G − O) ∧ F_ine,G.', num: (v) => [v.Cvero, -v.IG * v.wd] },
        { latex: L`\vec C_{ine,O} = \vec C_{ine,G} - (G-O)\wedge\vec F_{ine,G}`, errore: 'segno', spiega: 'Il momento rispetto a O di una forza applicata in G è (G − O) ∧ F, con il segno più.', num: (v) => [v.Cvero, -v.IG * v.wd - cross(get(v, 'G'), FinG(v))] },
      ],
      num: (v) => [v.Cvero, -v.IG * v.wd + cross(get(v, 'G'), FinG(v))],
    },
    {
      id: 'd020.4',
      latex: L`(G-O)\wedge\vec F_{ine,n} = 0,\qquad (G-O)\wedge\big[-M\dot{\vec\omega}\wedge(G-O)\big] = -M\,\overline{OG}^2\,\dot{\vec\omega}`,
      perche: 'La parte normale è parallela a $(G-O)$: momento nullo. Quella tangenziale è perpendicolare a $(G-O)$: il momento vale braccio $\\overline{OG}$ per modulo $M\\,\\overline{OG}\\,\\dot\\omega$, opposto a $\\dot{\\vec\\omega}$.',
      fonte: D(61),
      chiave: true,
      distrattori: [
        { latex: L`(G-O)\wedge\vec F_{ine,n} = M\omega^2\,\overline{OG}^2`, errore: 'concetto', spiega: 'La parte centrifuga è diretta lungo OG: passa per O e non ha momento.', num: (v) => [cross(get(v, 'G'), scale(v.M * v.w * v.w, get(v, 'G'))), v.M * v.w * v.w * v.OG ** 2] },
        { latex: L`(G-O)\wedge\big[-M\dot{\vec\omega}\wedge(G-O)\big] = -M\,\overline{OG}\,\dot{\vec\omega}`, errore: 'fattore', spiega: 'Braccio OG per forza M·OG·ω̇: OG compare al quadrato.', num: (v) => [cross(get(v, 'G'), scale(-v.M, wedge(v.wd, get(v, 'G')))), -v.M * v.OG * v.wd] },
      ],
      num: (v) => [cross(get(v, 'G'), scale(-v.M, wedge(v.wd, get(v, 'G')))) + 5 * cross(get(v, 'G'), scale(v.M * v.w * v.w, get(v, 'G'))), -v.M * v.OG ** 2 * v.wd],
    },
    {
      id: 'd020.5',
      latex: L`\vec C_{ine,O} = -I_G\dot{\vec\omega} - M\,\overline{OG}^2\dot{\vec\omega} = -(I_G + M\,\overline{OG}^2)\,\dot{\vec\omega} = -I_O\,\dot{\vec\omega}`,
      perche: 'Si riconosce il momento d\'inerzia rispetto a $O$ (Huygens–Steiner). Per un corpo incernierato: forza d\'inerzia in $O$ e coppia d\'inerzia $-I_O\\dot{\\vec\\omega}$.',
      fonte: D(61),
      distrattori: [
        { latex: L`\vec C_{ine,O} = -(I_G - M\,\overline{OG}^2)\,\dot{\vec\omega}`, errore: 'segno', spiega: 'Allontanando il polo dal baricentro il momento d\'inerzia cresce: I_O = I_G + M OG².', num: (v) => [v.Cvero, -(v.IG - v.M * v.OG ** 2) * v.wd] },
      ],
      num: (v) => [v.Cvero + v.IO, -(v.IG + v.M * v.OG ** 2) * v.wd + v.IG + v.M * v.OG ** 2],
    },
  ],
  risultato: { latex: L`\vec F_{ine,O} = M\omega^2(G-O) - M\dot{\vec\omega}\wedge(G-O),\qquad \vec C_{ine,O} = -I_O\,\dot{\vec\omega},\quad I_O = I_G + M\,\overline{OG}^2`, fonte: D(61) },
  gancio: 'Una forza per traslare, una coppia per ruotare; portate in O la coppia diventa −I_O ω̇ (Steiner).',
};

// ------------------------------------------------------------------ d021 lavoro e potenza (pp. 61–62, 64)
const sampleL = (rnd: () => number): Vars => {
  const F: V2 = [U(rnd, -100, 100), U(rnd, -100, 100)], V: V2 = [U(rnd, -3, 3), U(rnd, -3, 3)], dt = U(rnd, 1e-3, 1e-2);
  const th = Math.atan2(cross(F, V), dot(F, V));
  // corpo rigido con due forze opposte (coppia) in P e Q
  const VG: V2 = [U(rnd, -2, 2), U(rnd, -2, 2)], w = U(rnd, -5, 5), Gp: V2 = [U(rnd, -1, 1), U(rnd, -1, 1)];
  const Pp: V2 = [U(rnd, -1, 1), U(rnd, -1, 1)], Qp: V2 = [U(rnd, -1, 1), U(rnd, -1, 1)];
  const VP = add(VG, wedge(w, sub(Pp, Gp))), VQ = add(VG, wedge(w, sub(Qp, Gp)));
  const o: Vars = { th, dt, w, Cc: cross(sub(Pp, Qp), F), PotC: dot(F, VP) + dot(scale(-1, F), VQ) };
  put(o, 'F', F); put(o, 'V', V);
  return o;
};

export const d021: Dimostrazione = {
  id: 'd021',
  titolo: 'Lavoro elementare e potenza di una forza e di una coppia',
  enunciato: 'Ricavare il lavoro elementare e la potenza di una forza applicata a un punto, e la potenza di una coppia su un corpo rigido.',
  ipotesi: ['forza F⃗ applicata in un punto P che si sposta di dP⃗ = V⃗ dt', 'coppia = due forze opposte su un corpo rigido'],
  sample: sampleL,
  passi: [
    {
      id: 'd021.1',
      latex: L`dL = \vec F\cdot d\vec P`,
      perche: 'Il lavoro elementare è il prodotto scalare fra la forza e lo spostamento del suo punto di applicazione.',
      fonte: D(62),
      distrattori: [],
    },
    {
      id: 'd021.2',
      latex: L`dL = F\,dP_{\parallel} = F\,dP\cos\theta`,
      perche: 'Conta solo la componente dello spostamento lungo la forza; $\\theta$ è l\'angolo fra forza e spostamento. Il lavoro è negativo se la componente parallela è opposta alla forza.',
      fonte: D(62),
      distrattori: [
        { latex: L`dL = F\,dP\sin\theta`, errore: 'concetto', spiega: 'Il seno dà la componente perpendicolare, che non compie lavoro.', num: (v) => [(v.Fx * v.Vx + v.Fy * v.Vy) * v.dt, Math.hypot(v.Fx, v.Fy) * Math.hypot(v.Vx, v.Vy) * v.dt * Math.sin(v.th)] },
      ],
      num: (v) => [(v.Fx * v.Vx + v.Fy * v.Vy) * v.dt, Math.hypot(v.Fx, v.Fy) * Math.hypot(v.Vx, v.Vy) * v.dt * Math.cos(v.th)],
    },
    {
      id: 'd021.3',
      latex: L`Pot = \dfrac{dL}{dt} = \dfrac{\vec F\cdot d\vec P}{dt} = \vec F\cdot\vec V = F\,V_{\parallel} = F\,V\cos\theta`,
      perche: 'La potenza è il lavoro nell\'unità di tempo: dividendo per $dt$ lo spostamento diventa la velocità del punto di applicazione.',
      fonte: D(62),
      chiave: true,
      distrattori: [
        { latex: L`Pot = F\,V`, errore: 'concetto', spiega: 'Vale solo con forza e velocità parallele: in generale conta F V cos θ.', num: (v) => [v.Fx * v.Vx + v.Fy * v.Vy, Math.hypot(v.Fx, v.Fy) * Math.hypot(v.Vx, v.Vy)] },
        { latex: L`Pot = |\vec F\wedge\vec V|`, errore: 'concetto', spiega: 'Il prodotto vettoriale prende la componente perpendicolare: la potenza è un prodotto scalare.', num: (v) => [v.Fx * v.Vx + v.Fy * v.Vy, Math.abs(cross(get(v, 'F'), get(v, 'V')))] },
      ],
      num: (v) => [v.Fx * v.Vx + v.Fy * v.Vy, Math.hypot(v.Fx, v.Fy) * Math.hypot(v.Vx, v.Vy) * Math.cos(v.th)],
    },
    {
      id: 'd021.4',
      latex: L`\vec F \text{ in } P,\ -\vec F \text{ in } Q:\quad Pot = \vec F\cdot(\vec V_P - \vec V_Q) = \vec F\cdot\vec\omega\wedge(P-Q) = \vec\omega\cdot[(P-Q)\wedge\vec F] = \vec C\cdot\vec\omega`,
      perche: 'Una coppia è una coppia di forze opposte: la differenza delle velocità dei due punti è la rotazione (formula fondamentale) e, permutando il prodotto misto, resta momento della coppia per velocità angolare. È la $\\vec C_i\\cdot\\vec\\omega_i$ del teorema delle forze vive (p. 64).',
      fonte: DED('pp. 11 e 64', 'formula fondamentale delle velocità e proprietà del prodotto misto; la dispensa usa C·ω a p. 64 senza ricavarla'),
      chiave: true,
      distrattori: [
        { latex: L`Pot_{coppia} = 0 \text{ perché la risultante è nulla}`, errore: 'concetto', spiega: 'Risultante nulla vuol dire niente traslazione, ma la coppia fa ruotare il corpo e compie lavoro: C ω.', num: (v) => [v.PotC, 0] },
        { latex: L`Pot = -\vec C\cdot\vec\omega`, errore: 'segno', spiega: 'Una coppia concorde con ω compie lavoro positivo (motrice).', num: (v) => [v.PotC, -v.Cc * v.w] },
      ],
      num: (v) => [v.PotC, v.Cc * v.w],
    },
  ],
  risultato: { latex: L`dL = \vec F\cdot d\vec P,\qquad Pot = \vec F\cdot\vec V,\qquad Pot_{coppia} = \vec C\cdot\vec\omega`, fonte: D([62, 64]) },
  gancio: 'Lavoro = forza per spostamento utile; potenza = forza per velocità del punto; coppia per ω.',
};

// ------------------------------------------------------------------ d022 teorema delle forze vive (pp. 62–64; dimostrazione per deduzione)
const sampleV = (rnd: () => number): Vars => {
  const corpo = () => {
    const M = U(rnd, 1, 10), IG = U(rnd, 0.1, 2), G: V2 = [U(rnd, -1, 1), U(rnd, -1, 1)], VG: V2 = [U(rnd, -2, 2), U(rnd, -2, 2)], w = U(rnd, -3, 3);
    const P: V2[] = Array.from({ length: 3 }, () => [U(rnd, -1, 1), U(rnd, -1, 1)]);
    const F: V2[] = Array.from({ length: 3 }, () => [U(rnd, -50, 50), U(rnd, -50, 50)]);
    const C = U(rnd, -20, 20);
    // cardinali: a_G e ω̇ dalle forze (dinamica diretta)
    const Ftot = F.reduce((a, b) => add(a, b), [0, 0] as V2);
    const aG = scale(1 / M, Ftot);
    const Mg = P.reduce((s, p, k) => s + cross(sub(p, G), F[k]), 0) + C;
    const wd = Mg / IG;
    const pot = P.reduce((s, p, k) => s + dot(F[k], add(VG, wedge(w, sub(p, G)))), 0) + C * w;
    return { pot, cin: M * dot(VG, aG) + IG * w * wd, trasl: M * dot(VG, aG) };
  };
  const c1 = corpo(), c2 = corpo();
  // energia cinetica come getto: E = ½ M V_G² + ½ I_G ω², con V_G e ω che variano nel tempo
  const M = U(rnd, 1, 10), IG = U(rnd, 0.1, 2);
  const Vx: J = jt(U(rnd, -2, 2), U(rnd, -3, 3)), Vy: J = jt(U(rnd, -2, 2), U(rnd, -3, 3)), w: J = jt(U(rnd, -3, 3), U(rnd, -3, 3));
  const E = [0, 1].map((i) => 0.5 * M * (jmul(Vx, Vx)[i] + jmul(Vy, Vy)[i]) + 0.5 * IG * jmul(w, w)[i]);
  // forza interna in un corpo rigido (lungo PQ) e in un attuatore (PQ variabile)
  const Pp: V2 = [U(rnd, -1, 1), U(rnd, -1, 1)], Qp: V2 = [U(rnd, -1, 1), U(rnd, -1, 1)], wr = U(rnd, -3, 3), k = U(rnd, 10, 100), ld = U(rnd, 0.1, 1);
  const Fint = scale(k, sub(Pp, Qp));
  const VGr: V2 = [U(rnd, -2, 2), U(rnd, -2, 2)];
  const PotUna = dot(Fint, add(VGr, wedge(wr, Pp)));
  const dVrig = wedge(wr, sub(Pp, Qp));
  const dVatt = add(dVrig, scale(ld, unit(sub(Pp, Qp))));
  // parallelogramma di p. 66: membro HE con AH = DE, AD = HE
  const h = U(rnd, 0.3, 1), ll = U(rnd, 0.5, 1.5), ph: J = jt(U(rnd, -1.2, -0.2), U(rnd, -2, 2), U(rnd, -2, 2));
  const Hj = jpolar(jc(ll), ph), Ej: JV = [Hj[0], jsub(Hj[1], jc(h))];
  const angHE = jatan2(jsub(Hj[1], Ej[1]), jsub(Hj[0], Ej[0]));
  return { pot1: c1.pot, cin1: c1.cin, trasl1: c1.trasl, pot2: c2.pot, cin2: c2.cin, M, IG, Vx: Vx[0], Vy: Vy[0], ax: Vx[1], ay: Vy[1], w: w[0], wd: w[1], E: E[0], dE: E[1], PotInt: dot(Fint, dVrig), PotUna, PotAtt: dot(Fint, dVatt), wHE: angHE[1] };
};

const VIVE = DED('p. 55 (equazioni cardinali) e p. 11 (formula fondamentale)', 'la dispensa enuncia il teorema in forma di potenza senza dimostrarlo (NF-106): lo si ricava moltiplicando le cardinali per V_G e per ω');

export const d022: Dimostrazione = {
  id: 'd022',
  titolo: 'Teorema delle forze vive (conservazione dell\'energia meccanica)',
  enunciato: 'Mostrare che, per un sistema di corpi rigidi senza attuatori né dissipazioni, la potenza delle forze e coppie esterne è uguale alla derivata dell\'energia cinetica.',
  ipotesi: ['n corpi rigidi piani (M_i, I_G,i)', 'lavoro delle forze interne nullo: solo corpi rigidi, nessun attuatore, forze dissipative trascurate (p. 63–64)', 'la dispensa lo enuncia, non lo dimostra (NF-106)'],
  sample: (rnd) => sampleV(rnd) as unknown as Vars,
  passi: [
    {
      id: 'd022.1',
      latex: L`dL_{est} + dL_{int} = dE_{cine}`,
      perche: 'La variazione di energia cinetica è il lavoro di **tutte** le forze, anche interne: a differenza delle cardinali, qui le interne contano perché possono lavorare (un muscolo, un attuatore lineare).',
      fonte: D(63),
      distrattori: [],
    },
    {
      id: 'd022.2',
      latex: L`\text{forza interna fra } P \text{ e } Q:\ Pot_{int} = \vec F\cdot(\vec V_P - \vec V_Q) = \vec F\cdot\vec\omega\wedge(P-Q) = 0\ \ (\vec F\parallel P-Q)`,
      perche: 'Nel corpo rigido le forze interne sono a coppie opposte lungo la congiungente, e la velocità relativa dei due punti è perpendicolare alla congiungente: potenza nulla. Lo stesso in una cerniera fra due corpi (stesso punto, stessa velocità). Con un attuatore la distanza $PQ$ cambia e la potenza non è nulla.',
      fonte: DED('pp. 63–64 (condizioni per dL_int = 0)', 'potenza di una coppia di forze interne opposte con la formula fondamentale delle velocità'),
      chiave: true,
      distrattori: [
        { latex: L`Pot_{int} = \vec F\cdot\vec V_P`, errore: 'termine-perso', spiega: 'Le forze interne sono due, opposte: si conta anche −F⃗ applicata in Q, e le potenze si compensano.', num: (v) => [v.PotInt, v.PotUna] },
        { latex: L`Pot_{int} = 0 \text{ sempre (sono a coppie opposte)}`, errore: 'ipotesi', spiega: 'Forze opposte su punti che si avvicinano o allontanano lavorano: è il caso dell\'attuatore (o del muscolo).', num: (v) => [v.PotAtt, 0] },
      ],
      num: (v) => [v.PotInt, 0],
    },
    {
      id: 'd022.3',
      latex: L`E_{cine} = \tfrac12 M V_G^2 + \tfrac12 I_G\omega^2 \;\Rightarrow\; \dfrac{dE_{cine}}{dt} = M\,\vec V_G\cdot\vec a_G + I_G\,\vec\omega\cdot\dot{\vec\omega}`,
      perche: 'Energia cinetica del corpo rigido piano (d023) derivata nel tempo con $I_G$ costante: $d(V_G^2)/dt = 2\\vec V_G\\cdot\\vec a_G$.',
      fonte: D(64),
      chiave: true,
      distrattori: [
        { latex: L`\dfrac{dE_{cine}}{dt} = M\,V_G\,a_G + I_G\,\omega\,\dot\omega \ (\text{moduli})`, errore: 'concetto', spiega: 'Serve il prodotto scalare V_G·a_G: se a_G è perpendicolare a V_G (curva a velocità costante) l\'energia non cambia.' },
        { latex: L`\dfrac{dE_{cine}}{dt} = \tfrac12 M\,\vec V_G\cdot\vec a_G + \tfrac12 I_G\,\omega\dot\omega`, errore: 'fattore', spiega: 'Derivando il quadrato esce un 2 che semplifica l\'½.', num: (v) => [v.dE, 0.5 * v.M * (v.Vx * v.ax + v.Vy * v.ay) + 0.5 * v.IG * v.w * v.wd] },
      ],
      num: (v) => [v.dE, v.M * (v.Vx * v.ax + v.Vy * v.ay) + v.IG * v.w * v.wd],
    },
    {
      id: 'd022.4',
      latex: L`\sum_i \vec F_i\cdot\vec V_{P_i} + \sum_j \vec C_j\cdot\vec\omega = \Big(\sum_i\vec F_i\Big)\cdot\vec V_G + \vec\omega\cdot\Big[\sum_i (P_i-G)\wedge\vec F_i + \sum_j\vec C_j\Big] = M\vec a_G\cdot\vec V_G + I_G\dot{\vec\omega}\cdot\vec\omega`,
      perche: 'Dimostrazione per un corpo: si scrive $\\vec V_{P_i} = \\vec V_G + \\vec\\omega\\wedge(P_i-G)$ e si usa il prodotto misto; le parentesi sono i primi membri delle due cardinali della dinamica, quindi $M\\vec a_G$ e $I_G\\dot{\\vec\\omega}$. La potenza delle forze esterne è la derivata dell\'energia cinetica.',
      fonte: VIVE,
      chiave: true,
      distrattori: [
        { latex: L`\sum_i \vec F_i\cdot\vec V_{P_i} = \Big(\sum_i\vec F_i\Big)\cdot\vec V_G`, errore: 'termine-perso', spiega: 'I punti di applicazione non hanno tutti la velocità di G: la parte rotatoria dà ω per il momento delle forze.' },
        { latex: L`\sum_i \vec F_i\cdot\vec V_{P_i} + \sum_j \vec C_j\cdot\vec\omega = M\vec a_G\cdot\vec V_G`, errore: 'termine-perso', spiega: 'La seconda cardinale, moltiplicata per ω, porta il termine di rotazione I_G ω̇ ω.', num: (v) => [v.pot1, v.trasl1] },
      ],
      num: (v) => [v.pot1, v.cin1],
    },
    {
      id: 'd022.5',
      latex: L`\sum_{i=1}^{n} \vec F_i\cdot\vec V_{P_i} + \sum_{i=1}^{m} \vec C_i\cdot\vec\omega_i = \sum_{k}\left(M_k\,\vec V_{G_k}\cdot\vec a_{G_k} + I_{G_k}\,\vec\omega_k\cdot\dot{\vec\omega}_k\right)`,
      perche: 'Sommando su tutti i corpi le interne non lavorano (passo 2): resta il teorema delle forze vive in forma di potenza, come lo scrive la dispensa. Con masse nulle il secondo membro è zero: è l\'equilibrio delle potenze usato nel glifo. La dispensa stampa il limite «$i_1$» al posto di $i = 1$.',
      fonte: D(64),
      correzione: { nf: 'NF-36', dispensaScrive: L`\sum_{i_1}^{m} \vec C_i\cdot\vec\omega_i` },
      distrattori: [
        { latex: L`\cdots = \sum_k \tfrac12\left(M_k V_{G_k}^2 + I_{G_k}\omega_k^2\right)`, errore: 'concetto', spiega: 'A sinistra c\'è una potenza: a destra serve la derivata dell\'energia cinetica, non l\'energia.' },
      ],
      num: (v) => [v.pot1 + v.pot2, v.cin1 + v.cin2],
    },
    {
      id: 'd022.6',
      latex: L`\text{parallelogramma: } \omega_{HE} = 0 \;\Rightarrow\; \vec F\cdot\vec V_C + M\vec g\cdot\vec V_G = M_1\,\vec V_{G,1}\cdot\vec a_{G,1}`,
      perche: 'Esempio 2 della dispensa: $A$–$H$–$E$–$D$ è un parallelogramma, quindi il membro $HE$ trasla ($\\omega_1 = 0$ in ogni istante) e il termine $I_G\\omega\\dot\\omega$ sparisce. Lavorano solo la forza sul pistone e il peso; le altre masse sono trascurate.',
      fonte: D([65, 66]),
      distrattori: [],
      num: (v) => [v.wHE, 0],
    },
  ],
  risultato: { latex: L`\sum \vec F_i\cdot\vec V_{P_i} + \sum \vec C_i\cdot\vec\omega_i = \sum_k\left(M_k\vec V_{G_k}\cdot\vec a_{G_k} + I_{G_k}\vec\omega_k\cdot\dot{\vec\omega}_k\right)`, fonte: D(64) },
  gancio: 'Moltiplica le cardinali per V_G e per ω: potenza delle forze = derivata dell\'energia cinetica.',
};

// ------------------------------------------------------------------ d023 energia cinetica del corpo rigido piano (p. 64; dimostrazione per deduzione)
const sampleE = (rnd: () => number): Vars => {
  const n = 6;
  const m = Array.from({ length: n }, () => U(rnd, 0.1, 2));
  const P: V2[] = Array.from({ length: n }, () => [U(rnd, -1, 1), U(rnd, -1, 1)]);
  const VO: V2 = [U(rnd, -3, 3), U(rnd, -3, 3)], w = U(rnd, -4, 4);
  const Vi = P.map((p) => add(VO, wedge(w, p))); // moto rigido con il punto O (origine) di velocità V_O
  const M = m.reduce((a, b) => a + b, 0);
  const G = scale(1 / M, P.reduce<V2>((s, p, k) => add(s, scale(m[k], p)), [0, 0]));
  const VG = scale(1 / M, Vi.reduce<V2>((s, v2, k) => add(s, scale(m[k], v2)), [0, 0]));
  const E = 0.5 * Vi.reduce((s, v2, k) => s + m[k] * dot(v2, v2), 0);
  const IG = P.reduce((s, p, k) => s + m[k] * dot(sub(p, G), sub(p, G)), 0);
  const IO = P.reduce((s, p, k) => s + m[k] * dot(p, p), 0);
  const mista = P.reduce((s, p, k) => s + m[k] * dot(VG, wedge(w, sub(p, G))), 0);
  const quad = P.reduce((s, p, k) => s + m[k] * dot(wedge(w, sub(p, G)), wedge(w, sub(p, G))), 0);
  const sumMR = P.reduce<V2>((s, p, k) => add(s, scale(m[k], sub(p, G))), [0, 0]);
  const VfromG = P.reduce((s, p, k) => s + m[k] * pj(sub(Vi[k], add(VG, wedge(w, sub(p, G))))), 0);
  return { M, E, IG, IO, w, VG2: dot(VG, VG), mista, quad, sMx: sumMR[0], sMy: sumMR[1], VfromG, VO2: dot(VO, VO) };
};

export const d023: Dimostrazione = {
  id: 'd023',
  titolo: 'Energia cinetica del corpo rigido piano',
  enunciato: 'Mostrare che l\'energia cinetica di un corpo rigido piano è la somma di quella del baricentro con tutta la massa e di quella di rotazione attorno al baricentro.',
  ipotesi: ['corpo rigido piano, massa M, baricentro G, momento d\'inerzia baricentrico I_G', 'formula fondamentale delle velocità (p. 11)', 'la dispensa enuncia la formula senza dimostrarla (NF-106)'],
  sample: sampleE,
  passi: [
    {
      id: 'd023.1',
      latex: L`E_{cine} = \tfrac12\sum_k m_k\,V_k^2 \quad\Big(= \tfrac12\int V_P^2\,dm\Big)`,
      perche: 'Definizione: somma delle energie cinetiche delle masse elementari del corpo.',
      fonte: EST('meccanica razionale, energia cinetica di un sistema di punti materiali', 'definizione; la dispensa scrive direttamente il risultato a p. 64'),
      distrattori: [],
    },
    {
      id: 'd023.2',
      latex: L`\vec V_k = \vec V_G + \vec\omega\wedge(P_k - G)`,
      perche: 'Formula fondamentale delle velocità con il polo nel baricentro: ogni punto ha la velocità di $G$ più quella della rotazione attorno a $G$.',
      fonte: D(11),
      distrattori: [],
      num: (v) => [v.VfromG, 0],
    },
    {
      id: 'd023.3',
      latex: L`V_k^2 = V_G^2 + 2\,\vec V_G\cdot\vec\omega\wedge(P_k-G) + |\vec\omega\wedge(P_k-G)|^2`,
      perche: 'Quadrato di una somma: due quadrati più il doppio prodotto (termine misto).',
      fonte: VIVE,
      distrattori: [],
      num: (v) => [2 * v.E, v.M * v.VG2 + 2 * v.mista + v.quad],
    },
    {
      id: 'd023.4',
      latex: L`\sum_k m_k\,(P_k - G) = 0 \;\Rightarrow\; \sum_k m_k\,\vec V_G\cdot\vec\omega\wedge(P_k-G) = \vec V_G\cdot\vec\omega\wedge\sum_k m_k(P_k-G) = 0`,
      perche: 'Per definizione di baricentro il momento statico rispetto a $G$ è nullo: il termine misto sparisce. È per questo che la decomposizione si fa con il polo nel baricentro.',
      fonte: DED('definizione di baricentro', 'il momento statico delle masse rispetto al baricentro è nullo'),
      chiave: true,
      distrattori: [
        { latex: L`\vec V_G\perp\vec\omega\wedge(P_k-G) \text{ per ogni punto}`, errore: 'concetto', spiega: 'Punto per punto il termine misto non è nullo: si annulla solo la somma, grazie alla definizione di baricentro.' },
        { latex: L`\text{il termine misto si annulla per qualsiasi polo}`, errore: 'concetto', spiega: 'Solo rispetto al baricentro Σ m (P − G) = 0: con un altro polo O il termine misto resta (salvo O fisso).', num: (v) => [v.E, 0.5 * v.M * v.VO2 + 0.5 * v.IO * v.w * v.w] },
      ],
      num: (v) => [v.mista + v.sMx + 3 * v.sMy, 0],
    },
    {
      id: 'd023.5',
      latex: L`|\vec\omega\wedge(P_k-G)|^2 = \omega^2\,|P_k-G|^2,\qquad \sum_k m_k|P_k-G|^2 = I_G`,
      perche: 'Nel piano $\\vec\\omega$ è perpendicolare a $(P_k-G)$: il modulo del prodotto vettoriale è il prodotto dei moduli. La somma delle masse per le distanze al quadrato è il momento d\'inerzia baricentrico.',
      fonte: VIVE,
      distrattori: [],
      num: (v) => [v.quad, v.w * v.w * v.IG],
    },
    {
      id: 'd023.6',
      latex: L`E_{cine} = \tfrac12\,M\,V_G^2 + \tfrac12\,I_G\,\omega^2`,
      perche: 'Restano il termine di traslazione (tutta la massa con la velocità del baricentro) e quello di rotazione attorno al baricentro.',
      fonte: D(64),
      chiave: true,
      distrattori: [
        { latex: L`E_{cine} = \tfrac12\,M\,V_G^2`, errore: 'termine-perso', spiega: 'Manca la rotazione: un disco che gira su sé stesso ha V_G = 0 ma energia cinetica.', num: (v) => [v.E, 0.5 * v.M * v.VG2] },
        { latex: L`E_{cine} = \tfrac12\,M\,V_G^2 + \tfrac12\,I_O\,\omega^2`, errore: 'indice', spiega: 'Con la velocità del baricentro va il momento d\'inerzia baricentrico; ½ I_O ω² da solo vale per la rotazione attorno a un punto fisso O.', num: (v) => [v.E, 0.5 * v.M * v.VG2 + 0.5 * v.IO * v.w * v.w] },
      ],
      num: (v) => [v.E, 0.5 * v.M * v.VG2 + 0.5 * v.IG * v.w * v.w],
    },
  ],
  risultato: { latex: L`E_{cine} = \tfrac12 M V_G^2 + \tfrac12 I_G\omega^2`, fonte: D(64) },
  gancio: 'Traslazione del baricentro più rotazione attorno al baricentro: il termine misto muore perché Σ m (P − G) = 0.',
};

// ------------------------------------------------------------------ argomento
export const staticaDinamica: ArgomentoContenuto = {
  id: 'c1-statica-dinamica',
  cosaDireSubito:
    'Per le forze in un meccanismo si isola un membro alla volta e si scrivono le equazioni cardinali: risultante nulla e momento nullo, tre equazioni scalari per corpo nel piano. Due regole accelerano tutto: un corpo con due forze le ha sulla congiungente dei punti di applicazione, uno con tre forze le ha concorrenti. In dinamica si aggiungono forza d\'inerzia −M a_G e coppia d\'inerzia −I_G ω̇ e si risolve come in statica; il teorema delle forze vive dà invece direttamente il legame fra le potenze delle forze esterne e l\'energia cinetica.',
  sistemaIpotesi: [
    'Sistema: membri rigidi piani collegati da coppie rotoidali (reazione per il perno, direzione qualsiasi) e prismatiche (reazione normale alla guida).',
    'Statica: masse e attrito trascurati; si parte dal corpo con la forza nota o da quello a due forze.',
    'Dinamica: M, G, I_G noti; prima si risolve la cinematica (a_G, ω̇), poi le forze.',
    'Forze vive: corpi rigidi, nessun attuatore, forze dissipative trascurate.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Corpo rigido con forze e coppie esterne e, nel baricentro, la forza d\'inerzia −M a_G e la coppia d\'inerzia −I_G ω̇ (dispensa pp. 55–56).',
    fonte: D([55, 56], 'figure manoscritte delle equazioni cardinali della dinamica'),
    elementi: [
      { id: 'forze', testo: 'forze esterne F_i nei loro punti di applicazione e coppie C_i', obbligatorio: true },
      { id: 'G', testo: 'baricentro G con l\'accelerazione a_G e l\'accelerazione angolare ω̇', obbligatorio: true },
      { id: 'inerzia', testo: 'forza d\'inerzia −M a_G in G e coppia d\'inerzia −I_G ω̇, opposte', obbligatorio: true },
      { id: 'polo', testo: 'polo dei momenti scelto per eliminare le incognite (cerniera)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: L`\begin{cases} \sum \vec F_i^{\,est} + \vec F_{ine} = 0 \\ \sum (P_i - G)\wedge\vec F_i^{\,est} + \sum\vec C_i + \vec C_{ine} = 0 \end{cases}\quad \vec F_{ine} = -M\vec a_G,\ \ \vec C_{ine} = -I_G\dot{\vec\omega}`,
    spiegazione: 'Le cardinali della dinamica con i termini d\'inerzia portati fra le forze: in statica F_ine = C_ine = 0.',
    fonte: D(56),
  },
  dimostrazioni: ['d017', 'd018', 'd019', 'd020', 'd021', 'd022', 'd023'],
  significato:
    'Le cardinali danno tutte le forze, anche quelle interne fra i membri, e richiedono di isolare ogni corpo; le forze vive saltano le reazioni (che non lavorano) e legano subito le grandezze che interessano, per esempio la coppia motrice alla forza resistente. Forza e coppia d\'inerzia trasformano la dinamica in un problema di statica: sono le azioni che il corpo «oppone» all\'accelerazione.',
  fraseDaRicordare: 'Isola un corpo alla volta: due forze ⇒ stessa retta, tre forze ⇒ concorrenti; in dinamica aggiungi −M a_G e −I_G ω̇.',
  daNonDire: [
    { frase: 'C₁ = (B − A) ∧ F₂,₁.', perche: 'È il segno sbagliato della dispensa (NF-15): l\'equilibrio della manovella dà C₁ = −(B − A) ∧ F₂,₁.', fonte: D(49) },
    { frase: 'La forza d\'inerzia è M a_G.', perche: 'È −M a_G, opposta all\'accelerazione del baricentro (e la coppia d\'inerzia è −I_G ω̇).', fonte: D(56) },
    { frase: 'Nel teorema delle forze vive le forze interne non contano mai.', perche: 'Contano se lavorano: attuatori, muscoli, attrito. Si annullano solo per corpi rigidi senza attuatori e senza dissipazioni.', fonte: D([63, 64]) },
    { frase: 'L\'energia cinetica è ½ M V_G² + ½ I_O ω².', perche: 'Con V_G va I_G (baricentrico); ½ I_O ω² vale da solo per la rotazione attorno al punto fisso O.', fonte: D(64) },
    { frase: 'La biella trasmette sempre forza lungo BC.', perche: 'Solo se è un corpo a due forze (scarica, masse trascurate); con un carico fra le cerniere si usa la regola delle tre forze.', fonte: D([48, 51]) },
    { frase: 'La dispensa dimostra il principio di D\'Alembert e il teorema delle forze vive.', perche: 'Usa forza e coppia d\'inerzia senza nominare D\'Alembert ed enuncia le forze vive in forma di potenza; le dimostrazioni sono deduzioni (NF-106).', fonte: D([56, 64]) },
  ],
  approfondimenti: [
    { domanda: 'Che reazione dà una cerniera e che reazione dà una guida prismatica?', tipo: 'approfondimento', attesa: 'Cerniera: una forza passante per il perno, di direzione qualsiasi (due incognite). Prismatica: una forza di direzione qualsiasi perpendicolare all\'asse di scorrimento (nella statica del pistone passa per C).', fonte: D(47) },
    { domanda: 'Che differenza c\'è fra dinamica diretta e inversa?', tipo: 'approfondimento', attesa: 'Diretta: note forze e coppie si trovano a_G e ω̇. Inversa: note le accelerazioni (dalla cinematica) si trovano le forze da applicare, come nell\'asta con due pattini.', fonte: D(56) },
    { domanda: 'Come usi le forze vive nel glifo della dispensa?', tipo: 'collegamento', argomento: 'c1-glifo', attesa: 'Con masse nulle E_cine = 0: le reazioni in A e C non lavorano, R₄ ⊥ V_E, quindi F⃗·V⃗_E + C⃗₁·ω⃗₁ = 0 e C₁ = −F V_E/ω₁.', fonte: D(65) },
    { domanda: 'Come diventa il teorema delle forze vive in un accoppiamento motore–utilizzatore?', tipo: 'collegamento', argomento: 'c6-diretto', attesa: 'Con motore e utilizzatore sullo stesso albero: C_m ω − C_u ω = I_m ω̇ ω + I_u ω̇ ω, quindi ω̇ = (C_m − C_u)/(I_m + I_u). È l\'equazione del moto dell\'accoppiamento diretto, scritta proprio con il T.F.V.', fonte: D(197) },
    { domanda: 'Perché nell\'asta con due pattini conviene il polo in A?', tipo: 'approfondimento', attesa: 'Perché lì passa la forza incognita F₁,₂: l\'equazione dei momenti contiene solo F₃,₂ e si risolve subito; poi la traslazione dà F₁,₂.', fonte: D(60) },
    { domanda: 'Corpo incernierato in O: dove metti forza e coppia d\'inerzia?', tipo: 'approfondimento', attesa: 'Si possono ridurre a O: stessa forza d\'inerzia M ω²(G − O) − M ω̇∧(G − O) e coppia −I_O ω̇ con I_O = I_G + M·OG² (trasporto, Huygens–Steiner).', fonte: D(61) },
    { domanda: 'Nel manovellismo con forza sul pistone come si risolve la statica?', tipo: 'collegamento', argomento: 'c1-manovellismo', attesa: 'Pistone (forza nota) → biella a due forze lungo BC → reazione della guida per C; F₂,₃ = F/cos γ, R₃ = F tan γ; manovella: C₁ = F₂,₁ b con b = r sin(θ + γ), oraria; ai punti morti b = 0.', fonte: D([47, 49]) },
  ],
  simboli: [
    { simbolo: '\\vec F_{i,j}', significato: 'forza che il corpo i esercita sul corpo j', altrove: 'F_ij senza virgola nella stessa dispensa (p. 60)' },
    { simbolo: '\\vec F_{ine},\\ \\vec C_{ine}', significato: 'forza e coppia d\'inerzia', altrove: 'F_in, C_in (p. 59–60); F_in = −m a_G, M_in = −I_G α in d019–d020' },
    { simbolo: 'I_G,\\ I_O', significato: 'momento d\'inerzia baricentrico e rispetto al polo O', altrove: 'J nelle fonti derivate (NF-10)' },
    { simbolo: 'Pot', significato: 'potenza (p. 62)', altrove: 'P in d021' },
    { simbolo: 'E_{cine}', significato: 'energia cinetica', altrove: 'E_c in d022–d023' },
    { simbolo: 'b,\\ b_{2,1},\\ b_f', significato: 'bracci delle forze (distanza del polo dalla retta d\'azione)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c1-asta', params: { dinamica: 1 } }],
  previsioni: [
    {
      id: 'c1-din-va2',
      domanda: 'Asta con due pattini: raddoppi la velocità V_A (costante) del pattino. La forza d\'inerzia dell\'asta, nella stessa posizione…',
      opzioni: ['resta uguale', 'raddoppia', 'quadruplica', 'si dimezza'],
      corretta: 2,
      spiega: 'a_G = a_B/2 = −V_A²/(2 AB cos³α): l\'accelerazione, e quindi −M a_G, cresce con il quadrato della velocità.',
      verify: () => {
        const a = astaPattini({ L: 1, alpha: 0.6, VA: 0.5, M: 3 }), b = astaPattini({ L: 1, alpha: 0.6, VA: 1, M: 3 });
        return [1, 2, 4, 0.5].findIndex((x) => Math.abs(x - b.Fin / a.Fin) < 1e-9);
      },
      visual: { kind: 'meccanismo', id: 'c1-asta', params: { dinamica: 1 } },
    },
  ],
  nf: ['NF-15', 'NF-36', 'NF-106', 'NF-107', 'NF-108'],
};
