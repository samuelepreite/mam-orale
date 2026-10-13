/**
 * Capitolo C6 (accoppiamento motore–carico): funzioni pure usate da animazioni, previsioni, campioni e test.
 * Fonte: dispensa pp. 193–206 (tools/testi/cap6.md) e, per l'energia dell'innesto, libro pp. 117–119 (cap3.md).
 *
 * Convenzioni (come nella dispensa): C_m coppia motrice, C_u modulo della coppia resistente, I inerzie,
 * τ = ω_u/ω_m, η rendimento in moto diretto. Nelle pp. 199–206 K_m è il MODULO della pendenza della
 * caratteristica del motore (NF-28): C_m = C_{m,0} − K_m ω con K_m > 0. Nella stabilità (p. 198) le pendenze
 * dC/dω hanno invece il loro segno: qui si chiamano dCm, dCu per non confonderle.
 */

export type Car = (w: number) => number;

// ------------------------------------------------------------------ caratteristiche (animazione «regime»)
/**
 * Motore asincrono: forma di Kloss C = 2 C_max / (s/s_k + s_k/s), s = (ω_s − ω)/ω_s (scorrimento). Riproduce la
 * figura di p. 195/197: coppia di spunto C_A a ω = 0, massimo C_max a s = s_k, zero alla velocità di sincronismo ω_s.
 * (La forma analitica è un modello di comodo per l'animazione: la dispensa dà solo il grafico.)
 */
export interface Asincrono { Cmax: number; omegaS: number; sk: number }
export function cmAsincrono(w: number, p: Asincrono): number {
  const s = (p.omegaS - w) / p.omegaS;
  if (s === 0) return 0;
  return (2 * p.Cmax) / (s / p.sk + p.sk / s);
}
/** dC_m/dω (con segno) della caratteristica di Kloss */
export function dcmAsincrono(w: number, p: Asincrono): number {
  const s = (p.omegaS - w) / p.omegaS;
  if (s === 0) return -(2 * p.Cmax) / p.sk / p.omegaS; // limite per s → 0: dC/ds = 2C_max/s_k
  const D = s / p.sk + p.sk / s;
  const dCds = (-(2 * p.Cmax) * (1 / p.sk - p.sk / (s * s))) / (D * D);
  return -dCds / p.omegaS;
}
/** Utilizzatore con caratteristica parabolica C_u = C_{u0} + k₂ω² (come il veicolo di p. 196 o la curva di p. 197) */
export interface Parabolico { Cu0: number; k2: number }
export const cuParabolico = (w: number, p: Parabolico) => p.Cu0 + p.k2 * w * w;
export const dcuParabolico = (w: number, p: Parabolico) => 2 * p.k2 * w;

export interface PuntoRegime {
  omega: number;
  C: number;
  /** pendenze con segno nel punto (p. 198): K_m = dC_m/dω, K_u = dC_u/dω */
  Km: number;
  Ku: number;
  stabile: boolean;
}

/** bisezione su [a, b] con g(a)·g(b) ≤ 0 */
export function bisezione(g: (x: number) => number, a: number, b: number, it = 200): number {
  let ga = g(a);
  for (let k = 0; k < it; k++) {
    const m = 0.5 * (a + b);
    const gm = g(m);
    if (gm === 0) return m;
    if ((gm < 0) === (ga < 0)) { a = m; ga = gm; } else b = m;
    if (Math.abs(b - a) <= 1e-15 * Math.max(1, Math.abs(m))) break;
  }
  return 0.5 * (a + b);
}

/**
 * Punti di regime (p. 197: C_m = C_u ⇒ ω̇ = 0) in (0, ωMax) e loro stabilità (p. 198: stabile se K_m − K_u < 0).
 * Pendenze dalle derivate date (dCm, dCu) o, se mancano, per differenze centrali.
 */
export function puntiDiRegime(Cm: Car, Cu: Car, wMax: number, dCm?: Car, dCu?: Car, n = 4000): PuntoRegime[] {
  const g = (w: number) => Cm(w) - Cu(w);
  const der = (f: Car, w: number) => { const h = 1e-6 * Math.max(1, wMax); return (f(w + h) - f(w - h)) / (2 * h); };
  const out: PuntoRegime[] = [];
  let w0 = 0, g0 = g(0);
  for (let k = 1; k <= n; k++) {
    const w1 = (wMax * k) / n, g1 = g(w1);
    if (g0 !== 0 && (g0 < 0) !== (g1 < 0)) {
      const w = bisezione(g, w0, w1);
      const Km = dCm ? dCm(w) : der(Cm, w), Ku = dCu ? dCu(w) : der(Cu, w);
      out.push({ omega: w, C: Cm(w), Km, Ku, stabile: Km - Ku < 0 });
    }
    w0 = w1; g0 = g1;
  }
  return out;
}

/** accoppiamento diretto (p. 197): ω̇ = (C_m − C_u)/(I_m + I_u); a ω = 0 con C_m < C_u il sistema resta fermo */
export function omegaDotDiretto(w: number, Cm: Car, Cu: Car, I: number): number {
  const a = (Cm(w) - Cu(w)) / I;
  return w <= 0 && a < 0 ? 0 : a;
}
/** un passo di Runge–Kutta 4 dell'accoppiamento diretto (velocità mai negativa: il carico è resistente) */
export function passoDiretto(w: number, dt: number, Cm: Car, Cu: Car, I: number): number {
  const f = (x: number) => omegaDotDiretto(Math.max(0, x), Cm, Cu, I);
  const k1 = f(w), k2 = f(w + 0.5 * dt * k1), k3 = f(w + 0.5 * dt * k2), k4 = f(w + dt * k3);
  return Math.max(0, w + (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4));
}
/** integra per T secondi (passo dt) e restituisce la velocità finale */
export function simulaDiretto(w0: number, T: number, Cm: Car, Cu: Car, I: number, dt = 1e-3): number {
  let w = w0;
  const n = Math.ceil(T / dt), h = T / n;
  for (let k = 0; k < n; k++) w = passoDiretto(w, h, Cm, Cu, I);
  return w;
}

/** i due esempi della dispensa (p. 197: un solo punto P stabile; p. 198: Q instabile e P stabile) */
export const MOTORE_ASINCRONO: Asincrono = { Cmax: 100, omegaS: 100, sk: 0.3 };
export const CARICO_P197: Parabolico = { Cu0: 20, k2: 0.006 };
export const CARICO_P198: Parabolico = { Cu0: 62, k2: 0.002 };

// ------------------------------------------------------------------ transitorio motore c.c. + carico costante (pp. 199–200)
export interface Transitorio { Cm0: number; Km: number; Cu0: number; Ieq: number }
/**
 * I_eq ω̇ = C_{m,0} − K_m ω − C_{u,0}, ω(0) = 0 (K_m modulo della pendenza, NF-28).
 * ω(t) = ω_P (1 − e^{−K_m t/I_eq}), ω_P = (C_{m,0} − C_{u,0})/K_m, t_% = −(I_eq/K_m) ln(1 − %).
 */
export function transitorioCC(p: Transitorio) {
  const wP = (p.Cm0 - p.Cu0) / p.Km;
  const T = p.Ieq / p.Km; // costante di tempo
  return {
    wP,
    T,
    omega: (t: number) => wP * (1 - Math.exp(-t / T)),
    tPerc: (perc: number) => -T * Math.log(1 - perc),
    /** riga di p. 200 senza logaritmo (NF-28): serve solo a mostrare l'errore */
    tPercDispensa: (perc: number) => -T * (1 - perc),
  };
}

// ------------------------------------------------------------------ trasmissione (p. 201)
/** grandezze ridotte all'albero motore in moto diretto: C_u* = τC_u/η, I_eq = I_m + τ²I_u/η */
export function ridotte(p: { Im: number; Iu: number; tau: number; eta?: number; Cu: number }) {
  const eta = p.eta ?? 1;
  return { CuRid: (p.tau * p.Cu) / eta, IuRid: (p.tau * p.tau * p.Iu) / eta, Ieq: p.Im + (p.tau * p.tau * p.Iu) / eta };
}
/** ω̇_m = (C_m − τC_u/η)/(I_m + τ²I_u/η) */
export function omegaDotMotore(tau: number, p: { Cm: number; Cu: number; Im: number; Iu: number; eta?: number }) {
  const r = ridotte({ ...p, tau });
  return (p.Cm - r.CuRid) / r.Ieq;
}
/** ω̇_u = τ ω̇_m: è questa che conta per il carico (NF-29) */
export const omegaDotCarico = (tau: number, p: { Cm: number; Cu: number; Im: number; Iu: number; eta?: number }) => tau * omegaDotMotore(tau, p);
/** rapporto che massimizza ω̇_u (η = 1): C_m I_u τ² + 2 C_u I_m τ − C_m I_m = 0, radice positiva */
export function tauOttimo(p: { Cm: number; Cu: number; Im: number; Iu: number }) {
  return (-p.Cu * p.Im + Math.sqrt(p.Im * (p.Cm * p.Cm * p.Iu + p.Cu * p.Cu * p.Im))) / (p.Cm * p.Iu);
}
/** Esempio E4/2 (p. 201): C_m = C_mo − k_m ω_m, C_u = k_u ω_u, regime C_m = τ C_u (η = 1) */
export function regimeE42(p: { Cmo: number; km: number; ku: number; tau: number }) {
  const wm = p.Cmo / (p.km + p.tau * p.tau * p.ku);
  const wu = p.tau * wm;
  const Cm = p.Cmo - p.km * wm;
  return { wm, wu, Cm, Cu: p.ku * wu, W: Cm * wm, rpm: (w: number) => (w * 60) / (2 * Math.PI) };
}
export const DATI_E42 = { Cmo: 45, km: 0.06, ku: 0.8, tau: 0.5 };

// ------------------------------------------------------------------ frizione (pp. 202–206; libro pp. 117–118)
export interface Frizione {
  /** retta del motore linearizzato in P (p. 203): C_m = C_{m,0} − K_m ω_m */
  Cm0: number;
  Km: number;
  /** velocità del motore al contatto dei dischi (regime a vuoto, p. 202) */
  wI: number;
  /** coppia trasmessa in strisciamento f F_N r_m m (costante) */
  Cfr: number;
  Im: number;
  Iu: number;
  tau: number;
  /** utilizzatore a coppia costante (p. 204) */
  Cu0: number;
  /** limite d'aderenza in rapporto alla coppia di strisciamento: f_att/f (> 1) */
  fAttSuF?: number;
  /** velocità minima del motore a c.i. (p. 202): sotto si spegne */
  wMin?: number;
}

/**
 * Innesto della frizione (pp. 202–206).
 * Strisciamento: I_m ω̇_m = C_m − C_fr ⇒ ω_m(t) = (1/K_m)[(C_{m,0}−C_fr) − (C_{m,0}−C_fr−K_m ω_m^I) e^{−K_m t/I_m}];
 *   τ²I_u ω̇_c = C_fr − τC_u ⇒ ω_c(t) = a t, a = (C_fr − τC_{u,0})/(τ²I_u).
 * Sincronizzazione in Q: ω_m(t_Q) = ω_c(t_Q), equazione trascendente (NF-30) → bisezione.
 * Aderenza: (I_m + τ²I_u) ω̇_m = C_m − τC_u ⇒ esponenziale da (t_Q, ω_Q) verso ω_REG = (C_{m,0} − τC_{u,0})/K_m.
 */
export function frizione(p: Frizione) {
  const A = p.Cm0 - p.Cfr;
  const B = A - p.Km * p.wI;
  const Tm = p.Im / p.Km;
  const wPfr = A / p.Km; // regime «se i dischi fossero sempre in slittamento» (p. 203)
  const a = (p.Cfr - p.tau * p.Cu0) / (p.tau * p.tau * p.Iu);
  const Ieq = p.Im + p.tau * p.tau * p.Iu;
  const wReg = (p.Cm0 - p.tau * p.Cu0) / p.Km;
  const Teq = Ieq / p.Km;
  const wMin = p.wMin ?? 0;
  const omegaMs = (t: number) => (A - B * Math.exp(-t / Tm)) / p.Km;
  const omegaCs = (t: number) => (a > 0 ? a * t : 0);
  // istante in cui il motore scenderebbe sotto ω_MIN (spegnimento), se accade
  let tStallo = Infinity;
  if (wMin > 0 && wPfr < wMin && p.wI > wMin) tStallo = -Tm * Math.log((A - p.Km * wMin) / B);
  // sincronizzazione: g(t) = ω_m − ω_c, g(0) = ω_m^I > 0, g → −∞ se a > 0 (radice unica)
  let tQ = Infinity;
  if (a > 0) {
    const g = (t: number) => omegaMs(t) - omegaCs(t);
    let hi = Math.max(Tm, p.wI / a);
    while (g(hi) > 0) hi *= 2;
    tQ = bisezione(g, 0, hi);
  }
  const stallo = tStallo < tQ;
  const wQ = isFinite(tQ) ? omegaCs(tQ) : NaN;
  const omegaAd = (t: number) => (p.Cm0 - p.tau * p.Cu0 - (p.Cm0 - p.Km * wQ - p.tau * p.Cu0) * Math.exp(-(t - tQ) / Teq)) / p.Km;
  /** integrale di ω_m in strisciamento da 0 a t */
  const intWm = (t: number) => (A * t + B * Tm * (Math.exp(-t / Tm) - 1)) / p.Km;
  /** lavoro dissipato fino a t (t ≤ t_Q): C_fr ∫(ω_m − ω_c) dt */
  const energia = (t: number) => {
    const s = Math.min(t, isFinite(tQ) ? tQ : t);
    return p.Cfr * (intWm(s) - (a > 0 ? 0.5 * a * s * s : 0));
  };
  /** coppia in aderenza (dopo Q): C_fr^(a) = C_m − I_m ω̇_m = τC_u + τ²I_u ω̇_m */
  const CfrAder = (t: number) => {
    const w = omegaAd(t);
    const wd = (p.Cm0 - p.Km * w - p.tau * p.Cu0) / Ieq;
    return p.Cm0 - p.Km * w - p.Im * wd;
  };
  const limite = p.Cfr * (p.fAttSuF ?? 1.25);
  // innesto impulsivo del libro (5.83) con I₂ = τ²I_u (inerzia del lato condotto vista dal disco)
  const I2 = p.tau * p.tau * p.Iu;
  const wfImp = (p.Im * p.wI) / (p.Im + I2);
  const Eimp = (p.Im * I2 * p.wI * p.wI) / (2 * (p.Im + I2));
  /** angoli percorsi dai due dischi (integrali delle velocità, per l'animazione) */
  const intAd = (t: number) => {
    const A2 = p.Cm0 - p.tau * p.Cu0, B2 = A2 - p.Km * wQ, s = t - tQ;
    return (A2 * s + B2 * Teq * (Math.exp(-s / Teq) - 1)) / p.Km;
  };
  const angoli = (t: number) => {
    if (t <= tQ) return { m: intWm(t), c: a > 0 ? 0.5 * a * t * t : 0 };
    return { m: intWm(tQ) + intAd(t), c: 0.5 * a * tQ * tQ + intAd(t) };
  };
  const fase = (t: number): 'strisciamento' | 'aderenza' | 'stallo' => (stallo && t >= tStallo ? 'stallo' : t < tQ ? 'strisciamento' : 'aderenza');
  return {
    A, B, Tm, wPfr, a, Ieq, Teq, wReg, tQ, wQ, tStallo, stallo, limite, wfImp, Eimp,
    omegaM: (t: number) => (t < tQ ? omegaMs(t) : omegaAd(t)),
    omegaC: (t: number) => (t < tQ ? omegaCs(t) : omegaAd(t)),
    omegaMs, omegaCs, omegaAd, intWm, angoli, energia, CfrAder, fase,
    /** il carico parte solo se la frizione vince la coppia resistente ridotta */
    caricoParte: a > 0,
    aderenzaTiene: isFinite(tQ) ? CfrAder(tQ) <= limite : true,
  };
}
export const DATI_FRIZIONE: Frizione = { Cm0: 300, Km: 2, wI: 150, Cfr: 120, Im: 1, Iu: 6, tau: 0.5, Cu0: 40, fAttSuF: 1.25, wMin: 25 };

/** Innesto a coppie costanti (libro pp. 117–118, Fig. 5-72): due rette fino a t* (C_f > C_m, C_f > C_r) */
export function innestoCostante(p: { I1: number; I2: number; w10: number; w20: number; Cm: number; Cr: number; Cf: number }) {
  const a1 = (p.Cm - p.Cf) / p.I1, a2 = (p.Cf - p.Cr) / p.I2;
  const tStar = (p.w10 - p.w20) / (a2 - a1);
  const w1 = (t: number) => p.w10 + a1 * t;
  const w2 = (t: number) => p.w20 + a2 * t;
  const wf = w1(tStar);
  const int1 = p.w10 * tStar + 0.5 * a1 * tStar * tStar;
  const int2 = p.w20 * tStar + 0.5 * a2 * tStar * tStar;
  return { a1, a2, tStar, w1, w2, wf, int1, int2, Lf: p.Cf * (int1 - int2) };
}

/** integrazione numerica (Runge–Kutta 4) di y' = f(t, y) da t0 a t1 in n passi: serve ai campioni e ai test */
export function rk4(f: (t: number, y: number) => number, y0: number, t0: number, t1: number, n = 2000): number {
  let y = y0;
  const h = (t1 - t0) / n;
  for (let k = 0; k < n; k++) {
    const t = t0 + k * h;
    const k1 = f(t, y), k2 = f(t + h / 2, y + (h / 2) * k1), k3 = f(t + h / 2, y + (h / 2) * k2), k4 = f(t + h, y + h * k3);
    y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
  }
  return y;
}
/** integrale numerico (Simpson composto, n pari) */
export function simpson(g: (t: number) => number, a: number, b: number, n = 2000): number {
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * g(a + k * h);
  return (s * h) / 3;
}
