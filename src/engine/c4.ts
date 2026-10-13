/**
 * Capitolo C4 (trasmissioni a cinghia): funzioni pure usate da animazioni, previsioni e test.
 * Fonte: dispensa pp. 129–154 (tools/testi/cap4.md).
 */

/**
 * Freno a nastro semplice (p. 153): un capo al fulcro della leva, l'altro sulla leva a braccio c; forza F a braccio a.
 * Tutto l'arco β è in strisciamento e il nastro è fermo (niente termine centrifugo): T_teso/T_lasco = e^{fβ}.
 * verso 'orario' (figura della dispensa): il capo sulla leva è il lasco T₂ = F a/c.
 * verso 'antiorario': il capo sulla leva è il teso T₁ = F a/c, quindi T₂ = T₁ e^{−fβ} (NF-21).
 */
export function frenoNastro(p: { F: number; a: number; c: number; R: number; f: number; beta: number; verso: 'orario' | 'antiorario' }) {
  const E = Math.exp(p.f * p.beta);
  const Tleva = (p.F * p.a) / p.c;
  const [T1, T2] = p.verso === 'orario' ? [Tleva * E, Tleva] : [Tleva, Tleva / E];
  return { T1, T2, Cf: (T1 - T2) * p.R, tesoSullaLeva: p.verso === 'antiorario', E };
}

/** Tensione lungo l'arco di scorrimento (pp. 141–142): T(θ) = ρV² + (T₂ − ρV²) e^{fθ}, θ dalla sezione d'uscita. */
export const tensioneArco = (T2: number, rhoV2: number, f: number, theta: number) => rhoV2 + (T2 - rhoV2) * Math.exp(f * theta);

// ------------------------------------------------------------------ rapporto, scorrimento elastico, rendimento

/**
 * Trasmissione reale con scorrimento elastico (pp. 135–139). La cinghia nell'arco di aderenza si muove con la puleggia:
 * sulla motrice l'aderenza è all'ingresso, dove la tensione è T₁ (ω₁R₁ = V₀(1+T₁/EA)); sulla condotta l'aderenza è
 * all'ingresso, dove la tensione è T₂ (ω₂R₂ = V₀(1+T₂/EA)). Coppie in modulo: C_i = (T₁ − T₂)R_i (p. 134).
 */
export function trasmissioneReale(p: { R1: number; R2: number; EA: number; T2: number; C1: number; omega1: number }) {
  const T1 = p.T2 + p.C1 / p.R1;
  const V1 = p.omega1 * p.R1;
  const V0 = V1 / (1 + T1 / p.EA);
  const V2 = V0 * (1 + p.T2 / p.EA);
  const omega2 = V2 / p.R2;
  const tauId = p.R1 / p.R2;
  const tau = omega2 / p.omega1;
  const C2 = (T1 - p.T2) * p.R2;
  const W1 = p.C1 * p.omega1, W2 = C2 * omega2;
  return { T1, V0, V1, V2, omega2, tauId, tau, eta: W2 / W1, C2, W1, W2, Wdiss: -(W1 - W2) };
}

/**
 * Geometria dell'avvolgimento (fonte esterna, d137): angoli dalle tangenti comuni, costruite come rette a distanza
 * R₁ e R₂ dai centri (interasse a). Aperta: β₁ = π − 2γ, β₂ = π + 2γ, sin γ = (R₂ − R₁)/a.
 * Incrociata: β₁ = β₂ = π + 2γ', sin γ' = (R₁ + R₂)/a.
 */
export function avvolgimento(p: { R1: number; R2: number; a: number; tipo: 'aperta' | 'incrociata' }) {
  // normale unitaria n della tangente superiore: n·O₂ − n·O₁ = a·n_x = R₁ − R₂ (aperta) oppure R₁ + R₂ (incrociata)
  const nx = p.tipo === 'aperta' ? (p.R1 - p.R2) / p.a : (p.R1 + p.R2) / p.a;
  const ny = Math.sqrt(1 - nx * nx);
  const phi1 = Math.atan2(ny, nx); // angolo del punto di tangenza sulla puleggia 1
  const beta1 = 2 * Math.PI - 2 * phi1;
  const beta2 = p.tipo === 'aperta' ? 2 * phi1 : 2 * Math.PI - 2 * phi1;
  const gamma = p.tipo === 'aperta' ? phi1 - Math.PI / 2 : Math.PI / 2 - phi1;
  // punti di tangenza (tangente superiore) e lunghezza del ramo libero
  const P1: [number, number] = [p.R1 * nx, p.R1 * ny];
  const P2: [number, number] = p.tipo === 'aperta' ? [p.a + p.R2 * nx, p.R2 * ny] : [p.a - p.R2 * nx, -p.R2 * ny];
  const L = Math.hypot(P2[0] - P1[0], P2[1] - P1[1]);
  return { beta1, beta2, gamma, phi1, P1, P2, L };
}

// ------------------------------------------------------------------ arco di avvolgimento: aderenza e scorrimento

/** RK4 su dT/dθ = f(T − ρV²) da T(0) = T₂ (serve ai test come integrazione indipendente da Eulero). */
export function integraEulero(T2: number, rhoV2: number, f: number, theta: number, n = 400) {
  const g = (T: number) => f * (T - rhoV2);
  let T = T2;
  const h = theta / n;
  for (let i = 0; i < n; i++) {
    const k1 = g(T), k2 = g(T + (h * k1) / 2), k3 = g(T + (h * k2) / 2), k4 = g(T + h * k3);
    T += (h * (k1 + 2 * k2 + 2 * k3 + k4)) / 6;
  }
  return T;
}

/**
 * Stato dell'arco avvolto sulla motrice (pp. 141–144): T₂ fissata (tenditore sul lasco), coppia C richiesta.
 * θ è misurato dalla sezione d'uscita Q₁ all'indietro (p. 141): scorrimento per 0 ≤ θ ≤ θ*, aderenza per θ* ≤ θ ≤ β
 * con T = T₁. Se C > C_MAX non c'è soluzione: slittamento globale (θ* = β e la coppia non è trasmessa).
 */
export function arcoAvvolto(p: { T2: number; rhoV2: number; f: number; beta: number; C: number; R: number }) {
  const E = Math.exp(p.f * p.beta);
  const Cmax = (p.T2 - p.rhoV2) * (E - 1) * p.R;
  const slitta = p.C > Cmax;
  const Ct = slitta ? Cmax : p.C;
  const T1 = p.T2 + Ct / p.R;
  const thetaS = Math.log((T1 - p.rhoV2) / (p.T2 - p.rhoV2)) / p.f;
  const alfa = p.beta - thetaS;
  const T = (theta: number) => (theta <= thetaS ? tensioneArco(p.T2, p.rhoV2, p.f, theta) : T1);
  /** pressione per unità d'angolo dF_N/dθ = T − ρV² (p. 141) */
  const pN = (theta: number) => T(theta) - p.rhoV2;
  return { E, Cmax, slitta, T1, thetaS, alfa, T, pN, C: Ct };
}

/** integrale di Simpson (n pari) */
export function simpson(g: (x: number) => number, a: number, b: number, n = 200) {
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * g(a + i * h);
  return (s * h) / 3;
}

/** coppia trasmessa calcolata come momento delle azioni d'attrito sull'arco: R ∫₀^{θ*} f dF_N (deve dare (T₁−T₂)R) */
export const coppiaDaAttrito = (s: ReturnType<typeof arcoAvvolto>, f: number, R: number) => R * simpson((th) => f * s.pN(th), 0, s.thetaS);

// ------------------------------------------------------------------ potenza e velocità ottima

/**
 * Potenza trasmissibile in incipiente scorrimento globale in funzione di V (θ* = β).
 * 'dispensa' (p. 152): T₂ fissata dal tenditore ⇒ W = (e^{fβ} − 1)(T₂ − ρV²)V, ottimo V* = √(T₂/3ρ).
 * 'variante' (domande 15, 46, fonte esterna): T₁ = T_max fissata ⇒ W = (1 − e^{−fβ})(T_max − ρV²)V, ottimo √(T_max/3ρ).
 * T è la tensione fissata (T₂ nel primo modello, T_max nel secondo).
 */
export function potenzaCinghia(p: { modello: 'dispensa' | 'variante'; T: number; rho: number; f: number; beta: number; V: number }) {
  const E = Math.exp(p.f * p.beta);
  const k = p.modello === 'dispensa' ? E - 1 : 1 - 1 / E;
  const rhoV2 = p.rho * p.V * p.V;
  const W = Math.max(0, k * (p.T - rhoV2) * p.V);
  const [T1, T2] = p.modello === 'dispensa' ? [rhoV2 + (p.T - rhoV2) * E, p.T] : [p.T, rhoV2 + (p.T - rhoV2) / E];
  const Vopt = Math.sqrt(p.T / (3 * p.rho));
  const Vzero = Math.sqrt(p.T / p.rho);
  const Wmax = (2 / 3) * k * p.T * Vopt;
  return { k, rhoV2, W, T1, T2, Vopt, Vzero, Wmax, contatto: rhoV2 < Math.min(T1, T2) };
}

/** massimo di una funzione unimodale in [a, b] (sezione aurea): ricerca indipendente dalla formula di V* */
export function massimoAureo(g: (x: number) => number, a: number, b: number, tol = 1e-12) {
  const r = (Math.sqrt(5) - 1) / 2;
  let x1 = b - r * (b - a), x2 = a + r * (b - a);
  let g1 = g(x1), g2 = g(x2);
  while (b - a > tol * Math.max(1, Math.abs(a) + Math.abs(b))) {
    if (g1 < g2) { a = x1; x1 = x2; g1 = g2; x2 = a + r * (b - a); g2 = g(x2); }
    else { b = x2; x2 = x1; g2 = g1; x1 = b - r * (b - a); g1 = g(x1); }
  }
  return (a + b) / 2;
}
