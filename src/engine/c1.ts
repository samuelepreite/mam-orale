/**
 * Capitolo C1 (cinematica e dinamica dei meccanismi piani): funzioni pure usate da animazioni, previsioni, controlli
 * numerici delle dimostrazioni e test. Fonte: dispensa pp. 5–66 (tools/testi/cap1a.md, cap1b.md).
 *
 * Convenzioni (come la dispensa): piano {O, x, y}, angoli antiorari positivi, velocità angolari come componente z
 * (ω > 0 antioraria, «uscente dal piano»), ω̇ accelerazione angolare (mai α: α è un angolo), ∧ prodotto vettoriale.
 *
 * I «getti» (J = [valore, derivata prima, derivata seconda] nel tempo) servono a ricavare velocità e accelerazioni
 * ESATTE da una legge di posizione, per una strada indipendente dalle formule della dispensa: i controlli numerici
 * confrontano le formule con le derivate vere del moto.
 */

// ------------------------------------------------------------------ vettori piani
export type V2 = [number, number];
export const add = (...v: V2[]): V2 => v.reduce<V2>((s, a) => [s[0] + a[0], s[1] + a[1]], [0, 0]);
export const sub = (a: V2, b: V2): V2 => [a[0] - b[0], a[1] - b[1]];
export const scale = (k: number, a: V2): V2 => [k * a[0], k * a[1]];
export const dot = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];
/** componente z di a ∧ b */
export const cross = (a: V2, b: V2) => a[0] * b[1] - a[1] * b[0];
/** (ω k̂) ∧ r */
export const wedge = (w: number, r: V2): V2 => [-w * r[1], w * r[0]];
export const norm = (a: V2) => Math.hypot(a[0], a[1]);
export const unit = (a: V2): V2 => scale(1 / norm(a), a);
/** proiezione su una direzione generica (per confrontare due vettori con un solo numero nei controlli) */
export const proj = (a: V2) => a[0] + Math.SQRT2 * a[1];
/** distanza del punto P dalla retta per Q con direzione u */
export const distRetta = (P: V2, Q: V2, u: V2) => Math.abs(cross(unit(u), sub(P, Q)));

// ------------------------------------------------------------------ getti (derivate esatte nel tempo)
export type J = [number, number, number];
export type JV = [J, J];
export const jc = (c: number): J => [c, 0, 0];
export const jadd = (...a: J[]): J => a.reduce<J>((s, x) => [s[0] + x[0], s[1] + x[1], s[2] + x[2]], [0, 0, 0]);
export const jsub = (a: J, b: J): J => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const jsc = (k: number, a: J): J => [k * a[0], k * a[1], k * a[2]];
export const jmul = (a: J, b: J): J => [a[0] * b[0], a[1] * b[0] + a[0] * b[1], a[2] * b[0] + 2 * a[1] * b[1] + a[0] * b[2]];
/** g(a) con g, g', g'' valutate in a₀ */
const comp = (a: J, g0: number, g1: number, g2: number): J => [g0, g1 * a[1], g2 * a[1] * a[1] + g1 * a[2]];
export const jsin = (a: J) => comp(a, Math.sin(a[0]), Math.cos(a[0]), -Math.sin(a[0]));
export const jcos = (a: J) => comp(a, Math.cos(a[0]), -Math.sin(a[0]), -Math.cos(a[0]));
export const jsqrt = (a: J) => { const s = Math.sqrt(a[0]); return comp(a, s, 1 / (2 * s), -1 / (4 * s * s * s)); };
export const jinv = (a: J) => comp(a, 1 / a[0], -1 / (a[0] * a[0]), 2 / (a[0] * a[0] * a[0]));
export const jdiv = (a: J, b: J) => jmul(a, jinv(b));
export const jasin = (a: J) => { const q = 1 - a[0] * a[0]; return comp(a, Math.asin(a[0]), 1 / Math.sqrt(q), a[0] / Math.pow(q, 1.5)); };
/** angolo di (x, y) con le sue derivate */
export function jatan2(y: J, x: J): J {
  const D = x[0] * x[0] + y[0] * y[0];
  const N = x[0] * y[1] - y[0] * x[1];
  const N1 = x[0] * y[2] - y[0] * x[2];
  const D1 = 2 * (x[0] * x[1] + y[0] * y[1]);
  return [Math.atan2(y[0], x[0]), N / D, (N1 * D - N * D1) / (D * D)];
}
/** grandezza che varia con legge polinomiale: valore, derivata, derivata seconda all'istante considerato */
export const jt = (v: number, d: number, dd = 0): J => [v, d, dd];
export const jv = (x: J, y: J): JV => [x, y];
export const jvadd = (...a: JV[]): JV => [jadd(...a.map((v) => v[0])), jadd(...a.map((v) => v[1]))];
export const jvsub = (a: JV, b: JV): JV => [jsub(a[0], b[0]), jsub(a[1], b[1])];
export const jvsc = (k: J, a: JV): JV => [jmul(k, a[0]), jmul(k, a[1])];
export const jpolar = (r: J, ang: J): JV => [jmul(r, jcos(ang)), jmul(r, jsin(ang))];
export const jnorm = (a: JV) => jsqrt(jadd(jmul(a[0], a[0]), jmul(a[1], a[1])));
export const pos = (a: JV): V2 => [a[0][0], a[1][0]];
export const vel = (a: JV): V2 => [a[0][1], a[1][1]];
export const acc = (a: JV): V2 => [a[0][2], a[1][2]];

/** soluzione di un sistema lineare 2×2 [a b; c d][x; y] = [e; f] */
export function solve2(a: number, b: number, c: number, d: number, e: number, f: number): [number, number] {
  const det = a * d - b * c;
  return [(e * d - b * f) / det, (a * f - e * c) / det];
}

// ------------------------------------------------------------------ manovellismo di spinta centrato (pp. 25–27, 30–32, 47–49)
/**
 * Manovella AB = r (A cerniera fissa nell'origine), biella BC = l, pistone C sull'asse x. θ angolo di manovella,
 * γ angolo di biella (sin γ = λ sin θ, λ = r/l), ω₁ costante e antioraria (θ = ω₁ t).
 * Velocità e accelerazione del pistone: forma esatta (dalla chiusura) e forma approssimata della dispensa (p. 32).
 * ω₂ è la velocità angolare della biella (componente z): orario (< 0) per |θ| < 90°, nullo a θ = ±90° (biella
 * istantaneamente traslante, CIR all'infinito), antiorario per 90° < θ < 270° (NF-101).
 */
export function manovellismo(p: { r: number; l: number; theta: number; omega1: number }) {
  const { r, l, theta: th, omega1: w } = p;
  const lam = r / l;
  const sg = lam * Math.sin(th);
  const cg = Math.sqrt(1 - sg * sg);
  const gamma = Math.asin(sg);
  const B: V2 = [r * Math.cos(th), r * Math.sin(th)];
  const xC = r * Math.cos(th) + l * cg;
  const C: V2 = [xC, 0];
  const gd = (lam * w * Math.cos(th)) / cg; // γ̇
  const gdd = (lam * w * (-Math.sin(th) * w * cg + Math.cos(th) * sg * gd)) / (cg * cg); // γ̈
  const S = Math.sin(th + gamma), Cs = Math.cos(th + gamma);
  const VC = (-r * w * S) / cg;
  const aC = -r * w * ((Cs * (w + gd) * cg + S * sg * gd) / (cg * cg));
  const xCapprox = r * Math.cos(th) + l * (1 - (lam * lam * Math.sin(th) ** 2) / 2);
  const VCapprox = -r * w * (Math.sin(th) + (lam / 2) * Math.sin(2 * th));
  const aCapprox = -r * w * w * (Math.cos(th) + lam * Math.cos(2 * th));
  // CIR della biella: retta AB (prolungata) ∩ normale alla guida per C. All'infinito se cos θ = 0.
  const cirAllInfinito = Math.abs(Math.cos(th)) < 1e-9;
  const K: V2 | null = cirAllInfinito ? null : [xC, xC * Math.tan(th)];
  return { lam, gamma, B, C, xC, VC, aC, xCapprox, VCapprox, aCapprox, omega2: -gd, omega2dot: -gdd, K, cirAllInfinito, VB: wedge(w, B), aB: scale(-w * w, B) };
}

/**
 * Statica del manovellismo con forza F sul pistone diretta verso A (p. 47–49), con attrito f nella guida (deduzione:
 * angolo d'attrito di p. 74, NF-108). Biella a due forze: spinta P lungo BC. Equilibrio del pistone:
 * −F + P cos γ + T = 0, N = P sin γ, T = −sgn(V_C) f |N|  ⇒  P = F/(cos γ + f sin γ) (con ω₁ antioraria).
 * Coppia equilibrante sulla manovella (componente z): C₁ = −P r sin(θ+γ) (NF-15: C₁ = −(B−A)∧F₂,₁).
 */
export function staticaManovellismo(p: { r: number; l: number; theta: number; F: number; f: number }) {
  const m = manovellismo({ r: p.r, l: p.l, theta: p.theta, omega1: 1 });
  const sg = Math.sin(m.gamma), cg = Math.cos(m.gamma);
  const P = p.F / (cg + p.f * sg);
  const N = P * sg;
  const T = p.F - P * cg; // = f P sin γ
  const braccio = p.r * Math.sin(p.theta + m.gamma); // b = distanza di A dalla retta BC
  const C1 = -P * braccio;
  return { P, N, T, braccio, C1, R3: p.F * Math.tan(m.gamma) };
}

// ------------------------------------------------------------------ glifo oscillante (pp. 64–65; rapido ritorno NF-07)
/**
 * Glifo a sei membri della dispensa (p. 64): manovella AB = r (A origine), glifo 2 con fulcro fisso C = (0, −d) e
 * estremo D (CD = L), biella DE = l₃, corsoio E su guida orizzontale y = y_E, a sinistra di D.
 * Il perno B scorre nella cava del glifo: velocità con la cinematica relativa (riferimento solidale al glifo).
 */
export function glifo(p: { r: number; d: number; L: number; l3: number; yE: number; theta: number; omega1: number; F?: number }) {
  const { r, d, L, l3, yE, theta: th, omega1: w } = p;
  const A: V2 = [0, 0], C: V2 = [0, -d];
  const B: V2 = [r * Math.cos(th), r * Math.sin(th)];
  const CB = sub(B, C);
  const rho = norm(CB);
  const psi = Math.atan2(CB[1], CB[0]);
  const omega2 = (w * r * Math.cos(th - psi)) / rho;
  const Vrel = -w * r * Math.sin(th - psi);
  const D: V2 = [L * Math.cos(psi), -d + L * Math.sin(psi)];
  const VD = wedge(omega2, sub(D, C));
  const xE = D[0] - Math.sqrt(l3 * l3 - (D[1] - yE) ** 2);
  const E: V2 = [xE, yE];
  const omega3 = -VD[1] / (xE - D[0]);
  const VE = VD[0] - omega3 * (yE - D[1]);
  const C1 = p.F == null ? NaN : (-p.F * VE) / w; // forze vive con masse trascurabili (p. 65)
  return { A, B, C, D, E, rho, psi, omega2, Vrel, VB: wedge(w, B), VD, omega3, VE, C1 };
}

/** posizioni estreme del glifo (retta CB tangente alla circonferenza di B): θ = −δ e θ = π + δ, sin δ = r/d */
export function estremiGlifo(r: number, d: number) {
  const delta = Math.asin(r / d);
  return { delta, thDestra: -delta, thSinistra: Math.PI + delta, lenta: Math.PI + 2 * delta, rapida: Math.PI - 2 * delta, rapporto: (Math.PI + 2 * delta) / (Math.PI - 2 * delta) };
}

/** stessi estremi cercati numericamente (massimo e minimo dell'angolo ψ del glifo): controllo indipendente */
export function estremiGlifoNumerici(r: number, d: number) {
  const psi = (th: number) => Math.atan2(r * Math.sin(th) + d, r * Math.cos(th));
  // dψ/dθ esatta dai getti dell'angolo del glifo; gli estremi sono i suoi zeri (bisezione)
  const dpsi = (th: number) => jatan2(jadd(jsc(r, jsin([th, 1, 0])), jc(d)), jsc(r, jcos([th, 1, 0])))[1];
  const zero = (a: number, b: number) => {
    let fa = dpsi(a);
    for (let k = 0; k < 200 && b - a > 1e-15; k++) {
      const m = (a + b) / 2, fm = dpsi(m);
      if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m;
    }
    return (a + b) / 2;
  };
  // ψ è minimo (glifo tutto a destra) vicino a θ = 0⁻ e massimo (tutto a sinistra) vicino a θ = π⁺
  const thDestra = zero(-Math.PI / 2, Math.PI / 2);
  const thSinistra = zero(Math.PI / 2, (3 * Math.PI) / 2);
  const lenta = thSinistra - thDestra; // arco percorso passando per θ = 90° (lontano da C)
  return { thDestra, thSinistra, lenta, rapida: 2 * Math.PI - lenta, ampiezzaGlifo: psi(thSinistra) - psi(thDestra) };
}

// ------------------------------------------------------------------ pistone oleodinamico del ribaltabile (pp. 36–39)
/**
 * Cassone 3 incernierato in O (origine), cilindro 1 incernierato in A, stelo 2 incernierato al cassone in B (OB = b,
 * angolo φ₃). Portata q costante ⇒ V_rel = q/S costante e a_rel = 0. Riferimento mobile solidale al cilindro 1.
 * Velocità: V_rel û + ω₁ k̂∧(B−A) = ω₃ k̂∧(B−O). Accelerazioni:
 * ω̇₁∧(B−A) − ω₁²(B−A) + 2ω₁∧V_rel = ω̇₃∧(B−O) − ω₃²(B−O).
 */
export function pistone(p: { xA: number; yA: number; b: number; phi3: number; Vrel: number }) {
  const O: V2 = [0, 0], A: V2 = [p.xA, p.yA];
  const B: V2 = [p.b * Math.cos(p.phi3), p.b * Math.sin(p.phi3)];
  const BA = sub(B, A), BO = sub(B, O);
  const ell = norm(BA);
  const u = unit(BA), n = wedge(1, u);
  const t3 = wedge(1, BO); // k ∧ (B−O)
  // proiezioni su û e n̂: V_rel = ω₃ (t₃·û);  ω₁ ℓ = ω₃ (t₃·n̂)
  const omega3 = p.Vrel / dot(t3, u);
  const omega1 = (omega3 * dot(t3, n)) / ell;
  const Vt = wedge(omega1, BA);
  const VB = wedge(omega3, BO);
  const aCor = scale(2 * omega1 * p.Vrel, n); // 2 ω₁ ∧ V_rel
  // incognite ω̇₁, ω̇₃: ω̇₁ ℓ n̂ − ω̇₃ t₃ = −ω₃²(B−O) + ω₁²(B−A) − a_cor
  const rhs = sub(add(scale(-omega3 * omega3, BO), scale(omega1 * omega1, BA)), aCor);
  const [omega1dot, omega3dot] = solve2(ell * n[0], -t3[0], ell * n[1], -t3[1], rhs[0], rhs[1]);
  return { O, A, B, ell, u, n, omega1, omega3, Vt, VB, aCor, omega1dot, omega3dot, aB: add(wedge(omega3dot, BO), scale(-omega3 * omega3, BO)) };
}

// ------------------------------------------------------------------ asta con due pattini (pp. 20–24 e 56–60)
/**
 * Asta AB = L: A sulla guida verticale (in alto), B sulla guida orizzontale; α angolo in B fra asta e orizzontale.
 * V_A costante verso il basso. CIR K all'incrocio dell'orizzontale per A con la verticale per B.
 * Dinamica (p. 60): massa M, I_G, peso; forza d'inerzia e coppia d'inerzia; F₃,₂ verticale in B; F sul pattino 1.
 */
export function astaPattini(p: { L: number; alpha: number; VA: number; M?: number; IG?: number; g?: number }) {
  const { L, alpha: a, VA } = p;
  const A: V2 = [0, L * Math.sin(a)], B: V2 = [L * Math.cos(a), 0], K: V2 = [L * Math.cos(a), L * Math.sin(a)];
  const omega = VA / (L * Math.cos(a)); // antioraria
  const VB = VA * Math.tan(a);
  const omegaDot = -(VA * VA * Math.sin(a)) / (L * L * Math.cos(a) ** 3); // oraria: l'asta rallenta
  const aB = -(VA * VA) / (L * Math.cos(a) ** 3); // verso sinistra
  const aG = aB / 2;
  const vel = (s: number) => wedge(omega, sub(add(A, scale(s, sub(B, A))), K));
  const sMin = Math.cos(a) ** 2; // piede della perpendicolare da K all'asta
  const out = { A, B, K, omega, VB, omegaDot, aB, aG, vel, sMin, Vmin: VA * Math.sin(a) };
  if (p.M == null) return { ...out, Fin: NaN, Cin: NaN, F32: NaN, F12x: NaN, F12y: NaN, F: NaN };
  const M = p.M, IG = p.IG ?? (M * L * L) / 12, g = p.g ?? 9.81;
  const Fin = -M * aG; // componente x (verso destra)
  const Cin = -IG * omegaDot; // componente z (antioraria)
  const AG = L / 2, AB = L;
  const F32 = (M * g * AG * Math.cos(a) - Fin * AG * Math.sin(a) - Cin) / (AB * Math.cos(a));
  const F12x = -Fin, F12y = M * g - F32;
  return { ...out, Fin, Cin, F32, F12x, F12y, F: F12y };
}

// ------------------------------------------------------------------ quadrilatero articolato nel piano complesso (pp. 41–43)
/**
 * Chiusura V₁e^{iφ₁} + V₂e^{iφ₂} + V₃e^{iφ₃} + V₄e^{iφ₄} = 0 (A→B→C→D→A), A nell'origine, φ₄ fisso.
 * Dato il getto di φ₁ restituisce i getti di φ₂ e φ₃ (ramo con C «sopra» la congiungente BD).
 */
export function quadrilateroJ(V: [number, number, number, number], phi4: number, phi1: J) {
  const [V1, V2, V3, V4] = V;
  const Bj = jpolar(jc(V1), phi1);
  const Dj: JV = [jc(-V4 * Math.cos(phi4)), jc(-V4 * Math.sin(phi4))];
  const dv = jvsub(Dj, Bj);
  const dist = jnorm(dv);
  const aa = jdiv(jadd(jc(V2 * V2 - V3 * V3), jmul(dist, dist)), jsc(2, dist));
  const hh = jsqrt(jsub(jc(V2 * V2), jmul(aa, aa)));
  const ux: J = jdiv(dv[0], dist), uy: J = jdiv(dv[1], dist);
  // C = B + a û + h (k̂∧û)
  const Cj: JV = [jadd(Bj[0], jmul(aa, ux), jmul(hh, jsc(-1, uy))), jadd(Bj[1], jmul(aa, uy), jmul(hh, ux))];
  const phi2 = jatan2(jsub(Cj[1], Bj[1]), jsub(Cj[0], Bj[0]));
  const phi3 = jatan2(jsub(Dj[1], Cj[1]), jsub(Dj[0], Cj[0]));
  return { phi2, phi3, B: pos(Bj), C: pos(Cj), D: pos(Dj) };
}
