/**
 * Capitolo C7 (meccanica delle vibrazioni): funzioni pure per animazioni, previsioni, disegni e test.
 * Fonte: dispensa pp. 208–223 (tools/testi/cap7.md). Notazione della dispensa (NF-12): ω_m pulsazione naturale,
 * ξ fattore di smorzamento, ρ = ω/ω_m, A(ξ,ρ) fattore di amplificazione, forzante F₀ sin ωt.
 * Le fasi sono RITARDI positivi: φ = arg p(iω) ∈ [0, π] (NF-34).
 */

export const TAU = 2 * Math.PI;

/** pulsazione naturale ω_m = √(K/m) (p. 209) */
export const omegaM = (m: number, K: number) => Math.sqrt(K / m);
/** smorzamento critico c_r = 2 m ω_m (p. 211) */
export const cCritico = (m: number, K: number) => 2 * m * omegaM(m, K);
/** fattore di smorzamento ξ = c/c_r (p. 211) */
export const xiDi = (m: number, c: number, K: number) => c / cCritico(m, K);

export type Caso = 'non smorzato' | 'sottosmorzato' | 'critico' | 'sovrasmorzato';
const EPS_CRIT = 1e-6;
/** i quattro casi di p. 211 */
export function caso(xi: number): Caso {
  if (xi <= 0) return 'non smorzato';
  if (Math.abs(xi - 1) < EPS_CRIT) return 'critico';
  return xi < 1 ? 'sottosmorzato' : 'sovrasmorzato';
}

/**
 * Radici dell'equazione caratteristica mλ² + cλ + K = 0 scritte con ω_m e ξ: λ = ω_m(−ξ ± √(ξ²−1)) (NF-31: senza «i»).
 * Restituisce parte reale e immaginaria delle due radici (λ₁ con il «+»).
 */
export function radici(xi: number, wm: number) {
  const d = xi * xi - 1;
  if (d >= 0) {
    const s = Math.sqrt(d);
    return { re1: wm * (-xi + s), im1: 0, re2: wm * (-xi - s), im2: 0 };
  }
  const s = Math.sqrt(-d);
  return { re1: -xi * wm, im1: wm * s, re2: -xi * wm, im2: -wm * s };
}

/** pulsazione smorzata ω_d = ω_m √(1−ξ²) (p. 212) */
export const omegaD = (xi: number, wm: number) => wm * Math.sqrt(1 - xi * xi);
/** decremento logaritmico δ = 2πξ/√(1−ξ²) (p. 212) */
export const decrementoLog = (xi: number) => (TAU * xi) / Math.sqrt(1 - xi * xi);
/** formula inversa (non scritta in D, «dalla formula inversa»): ξ = δ/√(4π² + δ²) */
export const xiDaDelta = (delta: number) => delta / Math.sqrt(4 * Math.PI * Math.PI + delta * delta);

/**
 * Risposta libera x(t) con x(0) = x₀, ẋ(0) = v₀ in tutti i casi (pp. 210–213).
 * Caso critico: x = (A₁ + A₂ t) e^{−ω_m t} (NF-32: la dispensa perde il termine in t).
 */
export function libera(xi: number, wm: number, x0: number, v0: number, t: number): number {
  if (xi <= 0) return x0 * Math.cos(wm * t) + (v0 / wm) * Math.sin(wm * t);
  const c = caso(xi);
  if (c === 'critico') return (x0 + (v0 + wm * x0) * t) * Math.exp(-wm * t);
  if (c === 'sottosmorzato') {
    const wd = omegaD(xi, wm);
    return Math.exp(-xi * wm * t) * (x0 * Math.cos(wd * t) + ((v0 + xi * wm * x0) / wd) * Math.sin(wd * t));
  }
  const { re1: l1, re2: l2 } = radici(xi, wm);
  const A1 = (v0 - l2 * x0) / (l1 - l2);
  const A2 = (l1 * x0 - v0) / (l1 - l2);
  return A1 * Math.exp(l1 * t) + A2 * Math.exp(l2 * t);
}

/** inviluppo X e^{−ξω_m t} della risposta sottosmorzata (ampiezza X dalle condizioni iniziali) */
export function inviluppo(xi: number, wm: number, x0: number, v0: number, t: number): number {
  if (xi >= 1) return NaN;
  const wd = omegaD(xi, wm);
  const b = (v0 + xi * wm * x0) / wd;
  return Math.hypot(x0, b) * Math.exp(-xi * wm * t);
}

// ------------------------------------------------------------------ vibrazioni forzate (pp. 214–218)

/** fattore di amplificazione A(ξ,ρ) = 1/√((1−ρ²)² + 4ξ²ρ²) (p. 215) */
export const amplificazione = (rho: number, xi: number) => 1 / Math.sqrt((1 - rho * rho) ** 2 + 4 * xi * xi * rho * rho);
/** ritardo di fase φ = arctg(2ξρ/(1−ρ²)) nel quadrante giusto, φ ∈ [0, π] (pp. 215–216, 221) */
export const fase = (rho: number, xi: number) => Math.atan2(2 * xi * rho, 1 - rho * rho);
/** ρ del massimo di A: √(1−2ξ²) se ξ < √½, altrimenti nessun picco (p. 216) */
export const rhoPicco = (xi: number): number | null => (xi > 0 && 1 - 2 * xi * xi > 0 ? Math.sqrt(1 - 2 * xi * xi) : null);
/** valore del picco A_max = 1/(2ξ√(1−ξ²)) (non scritto in D); 1 se non c'è picco (massimo in ρ = 0) */
export const aMax = (xi: number) => (rhoPicco(xi) === null ? 1 : 1 / (2 * xi * Math.sqrt(1 - xi * xi)));
/** quality factor Q = 1/(2ξ) = A(ρ = 1) (p. 217) */
export const qualityFactor = (xi: number) => 1 / (2 * xi);

/** risposta a regime a F₀ sin ωt (pp. 214–215): x_p = X₀ sin(ωt − φ) */
export function regime(p: { m: number; c: number; K: number; F0: number; omega: number }) {
  const re = p.K - p.m * p.omega * p.omega, im = p.c * p.omega;
  const modP = Math.hypot(re, im);
  return { X0: p.F0 / modP, phi: Math.atan2(im, re), pRe: re, pIm: im, modP };
}

/**
 * Risposta completa (transitorio + regime) a F₀ sin ωt partendo da fermo, in forma adimensionale:
 * x/(F₀/K) con ω_m e ρ assegnati. x = A sin(ωt − φ) + libera(con condizioni iniziali che annullano x e ẋ).
 */
export function forzataTotale(rho: number, xi: number, wm: number, t: number, transitorio = true) {
  const A = amplificazione(rho, xi), phi = fase(rho, xi), w = rho * wm;
  const xp = A * Math.sin(w * t - phi);
  if (!transitorio) return xp;
  // x_p(0) = −A sin φ, ẋ_p(0) = A ω cos φ: il libero parte da −x_p(0), −ẋ_p(0)
  return xp + libera(xi, wm, A * Math.sin(phi), -A * w * Math.cos(phi), t);
}

/** zona di funzionamento dominata da molla, smorzatore o massa (p. 216, fase 0, π/2, π) */
export function zonaForzata(rho: number): 'molla' | 'smorzatore' | 'massa' {
  if (rho < 0.7) return 'molla';
  return rho <= 1.4 ? 'smorzatore' : 'massa';
}

// ------------------------------------------------------------------ eccitazione di vincolo e trasmissibilità (pp. 219–222)

/** trasmissibilità T_R = √(1+4ξ²ρ²)/√((1−ρ²)²+4ξ²ρ²) (pp. 220, 222; NF-33) */
export const trasmissibilita = (rho: number, xi: number) => Math.sqrt(1 + 4 * xi * xi * rho * rho) * amplificazione(rho, xi);
/** fase della forzante equivalente della base α_F = arctg 2ξρ (p. 221) */
export const faseForzanteVincolo = (rho: number, xi: number) => Math.atan(2 * xi * rho);
/** fase iniziale della risposta α_x = α_F − φ < 0 (p. 221) */
export const faseVincolo = (rho: number, xi: number) => faseForzanteVincolo(rho, xi) - fase(rho, xi);
/** moto relativo massa–base |x_G^R|/X_V = ρ² A(ξ,ρ) (p. 221) */
export const motoRelativo = (rho: number, xi: number) => rho * rho * amplificazione(rho, xi);
/** ρ del massimo del moto relativo (e della massa eccentrica): 1/√(1−2ξ²) (deduzione, NF-248) */
export const rhoPiccoRelativo = (xi: number): number | null => (xi > 0 && 1 - 2 * xi * xi > 0 ? 1 / Math.sqrt(1 - 2 * xi * xi) : null);
/** ρ del massimo della trasmissibilità: √(√(1+8ξ²)−1)/(2ξ) (deduzione, NF-248) */
export const rhoPiccoTrasm = (xi: number) => Math.sqrt(Math.sqrt(1 + 8 * xi * xi) - 1) / (2 * xi);
/** frequenza naturale massima per isolare una sorgente a frequenza f: f_m < f/√2 (p. 222) */
export const fmMaxIsolamento = (f: number) => f / Math.SQRT2;
/** zona della curva di trasmissibilità (pp. 220–222, NF-33) */
export const zonaTrasm = (rho: number): 'amplificazione' | 'isolamento' => (rho > Math.SQRT2 ? 'isolamento' : 'amplificazione');

/** forza trasmessa al muro F_T = K x + c ẋ con x = X₀ sin(ωt − φ) (p. 221), in unità di F₀ */
export function forzaTrasmessa(rho: number, xi: number, wm: number, t: number) {
  const A = amplificazione(rho, xi), phi = fase(rho, xi), w = rho * wm;
  // K x/F₀ = A sin(ωt−φ), c ẋ/F₀ = (cω/K) A cos(ωt−φ) = 2ξρ A cos(ωt−φ)
  return A * Math.sin(w * t - phi) + 2 * xi * rho * A * Math.cos(w * t - phi);
}

// ------------------------------------------------------------------ massa eccentrica rotante (p. 223)

/** M|X_O|/(M_R R) = ρ²A(ξ,ρ), con M = M_S + M_R massa totale, ω_m² = K/M, ξ = c/(2Mω_m) */
export const eccentrica = (rho: number, xi: number) => motoRelativo(rho, xi);

/**
 * Stato del sistema statore + rotore all'istante t (p. 223): forzante M_R ω² R cos ωt, quindi x_O = X_O cos(ωt − φ).
 * mr = M_R/M, R eccentricità. x_GLO = x_O + (M_R/M) R cos ωt (baricentro globale).
 */
export function eccentricaStato(p: { rho: number; xi: number; mr: number; R: number; wm: number; t: number }) {
  const w = p.rho * p.wm, th = w * p.t;
  const XO = p.mr * p.R * eccentrica(p.rho, p.xi), phi = fase(p.rho, p.xi);
  const xO = XO * Math.cos(th - phi);
  const xP = xO + p.R * Math.cos(th), yP = p.R * Math.sin(th);
  const xGLO = (1 - p.mr) * xO + p.mr * xP;
  // ampiezza di x_GLO: |X_O e^{−iφ} + (M_R/M) R|
  const ampGLO = Math.hypot(XO * Math.cos(phi) + p.mr * p.R, -XO * Math.sin(phi));
  return { XO, phi, xO, xP, yP, xGLO, ampGLO, theta: th };
}
