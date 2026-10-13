/**
 * Capitolo C5, parte a (ruote dentate a denti dritti e rotismi ordinari): funzioni pure usate da animazioni,
 * previsioni e test. Fonte: dispensa pp. 156–173 (tools/testi/cap5a.md).
 *
 * Geometria comune (convenzione delle pp. 166–169): coordinate matematiche (y in alto), O₁ nell'origine, O₂ in
 * (R₁ + R₂, 0), punto primitivo C = (R₁, 0). Ruota 1 motrice e antioraria (ω₁ > 0), ruota 2 condotta e oraria.
 * La retta di pressione passa per C con versore u = (sin θ, cos θ) (θ misurato dalla verticale per C): H₁ (tangenza
 * con la fondamentale 1) sta in basso a sinistra di C, H₂ in alto a destra. Un punto della retta è C + s·u:
 * s < 0 accesso (tra B e C), s > 0 recesso (tra C e A).
 */

type V2 = [number, number];
const { sin, cos, tan, sqrt, atan, hypot, PI } = Math;
/** ω k ∧ r (moto piano) */
const wk = (w: number, r: V2): V2 => [-w * r[1], w * r[0]];
const crossZ = (a: V2, b: V2) => a[0] * b[1] - a[1] * b[0];
const dot = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];

/** funzione evolvente inv(α) = tg α − α */
export const inv = (a: number) => tan(a) - a;

/**
 * Evolvente di circonferenza (pp. 158, 161, Fig. 5-23): una retta rotola senza strisciare sulla fondamentale di
 * raggio R_f partendo dal contatto in H = (R_f, 0); il «pennino» solidale alla retta traccia P.
 * γ = angolo di rotolamento (Q = punto di tangenza, centro di istantanea rotazione della retta).
 */
export function evolvente(Rf: number, gamma: number) {
  const Q: V2 = [Rf * cos(gamma), Rf * sin(gamma)];
  const P: V2 = [Q[0] + Rf * gamma * sin(gamma), Q[1] - Rf * gamma * cos(gamma)];
  const dP: V2 = [Rf * gamma * cos(gamma), Rf * gamma * sin(gamma)]; // dP/dγ (tangente all'evolvente)
  const PQ = hypot(P[0] - Q[0], P[1] - Q[1]);
  const nPQ = PQ > 0 ? dot(dP, [P[0] - Q[0], P[1] - Q[1]]) / (hypot(dP[0], dP[1]) * PQ) : 0;
  return {
    P, Q, dP, PQ,
    arcoHQ: Rf * gamma,
    r: hypot(P[0], P[1]),
    /** angolo al centro fra OH e OP (ϑ della Fig. 5-23) */
    vartheta: gamma - atan(gamma),
    /** coseno dell'angolo fra la tangente all'evolvente e PQ: 0 ⇒ PQ è la normale */
    cosTgPQ: nPQ,
  };
}

/** Geometria di due ruote esterne a denti dritti con proporzionamento modulare (pp. 165–167): a = m. */
export function ingranaggio(p: { z1: number; z2: number; m: number; theta: number }) {
  const { z1, z2, m, theta: th } = p;
  const R1 = (m * z1) / 2, R2 = (m * z2) / 2, a = m;
  const Rf1 = R1 * cos(th), Rf2 = R2 * cos(th), Rt1 = R1 + a, Rt2 = R2 + a;
  const Rr1 = R1 - 1.25 * m, Rr2 = R2 - 1.25 * m; // fondo: dedendum 5/4 m
  const i = R1 + R2;
  const CH1 = R1 * sin(th), CH2 = R2 * sin(th);
  const AH1 = sqrt(Rt1 * Rt1 - Rf1 * Rf1), BH2 = sqrt(Rt2 * Rt2 - Rf2 * Rf2);
  const AC = AH1 - CH1, BC = BH2 - CH2, AB = AC + BC;
  const passo = PI * m, pb = passo * cos(th);
  return {
    R1, R2, Rf1, Rf2, Rt1, Rt2, Rr1, Rr2, a, i, CH1, CH2, AC, BC, AB, passo, pb,
    tau: -z1 / z2,
    /** arco d'azione ℓ = AB / cos θ (p. 166) */
    ell: AB / cos(th),
    /** denti contemporaneamente in presa z_p = AB/(p cos θ) (p. 166) */
    zp: AB / pb,
    /** A oltre H₂ (testa della 1 nel fondo della 2) o B oltre H₁: interferenza (p. 167) */
    interfA: AC > CH2 + 1e-12,
    interfB: BC > CH1 + 1e-12,
  };
}

/** Punto della retta di pressione a distanza s da C (coordinate con O₁ nell'origine). */
export const puntoRetta = (R1: number, theta: number, s: number): V2 => [R1 + s * sin(theta), s * cos(theta)];

/**
 * Semiampiezza angolare del dente al raggio r (profilo a evolvente simmetrico, spessore p/2 sulla primitiva):
 * β(r) = π/(2z) + inv θ − inv α_r con cos α_r = R_f / r. Vale per r ≥ R_f.
 */
export function semiDente(z: number, theta: number, Rf: number, r: number) {
  const ar = Math.acos(Math.min(1, Rf / r));
  return PI / (2 * z) + inv(theta) - inv(ar);
}

/**
 * Contorno della ruota (punti in coordinate matematiche relative al centro): z denti con fianchi a evolvente fra la
 * fondamentale (o il fondo, se più grande) e la testa; sotto la fondamentale il fianco è radiale (p. 165: lì non è
 * evolvente). `rot` = angolo del centro del dente 0.
 */
export function contornoRuota(z: number, m: number, theta: number, rot: number, n = 6): V2[] {
  const R = (m * z) / 2, Rf = R * cos(theta), Rt = R + m, Rr = R - 1.25 * m;
  const r0 = Math.max(Rf, Rr);
  const pts: V2[] = [];
  const P = (r: number, ang: number): V2 => [r * cos(ang), r * sin(ang)];
  for (let k = 0; k < z; k++) {
    const c = rot + (2 * PI * k) / z;
    const b0 = semiDente(z, theta, Rf, r0);
    pts.push(P(Rr, c - b0));
    for (let j = 0; j <= n; j++) {
      const r = r0 + ((Rt - r0) * j) / n;
      pts.push(P(r, c - Math.max(0, semiDente(z, theta, Rf, r))));
    }
    for (let j = n; j >= 0; j--) {
      const r = r0 + ((Rt - r0) * j) / n;
      pts.push(P(r, c + Math.max(0, semiDente(z, theta, Rf, r))));
    }
    pts.push(P(Rr, c + b0));
  }
  return pts;
}

/** Fase della ruota 2 coniugata alla 1 (dente 0 della 1 centrato su C per φ₁ = 0, vano della 2 centrato su C). */
export const rotRuota2 = (z1: number, z2: number, phi1: number) => PI + PI / z2 - (z1 / z2) * phi1;

/**
 * Posizioni s dei punti di contatto sulla retta di pressione quando la ruota 1 è ruotata di φ₁ (antiorario).
 * Il fianco anteriore del dente k della 1 tocca la retta in s = R_f1 φ₁ + p_b/4 + k p_b: i contatti distano il
 * passo di base p_b e avanzano con velocità R_f1 ω₁ (da B verso A). Si tengono quelli tra B e A.
 */
export function contatti(g: ReturnType<typeof ingranaggio>, phi1: number) {
  const s0 = g.Rf1 * phi1 + g.pb / 4;
  const kmin = Math.ceil((-g.BC - s0) / g.pb), kmax = Math.floor((g.AC - s0) / g.pb);
  const out: number[] = [];
  for (let k = kmin; k <= kmax; k++) out.push(s0 + k * g.pb);
  return out;
}

/** Variazione dell'interasse a ruote date (p. 162): le fondamentali restano, cambiano primitive e angolo di pressione. */
export function interasseVariato(p: { Rf1: number; Rf2: number; i: number }) {
  const c = (p.Rf1 + p.Rf2) / p.i;
  const theta = Math.acos(Math.min(1, c));
  const R1 = p.Rf1 / c, R2 = p.Rf2 / c;
  return { theta, R1, R2, tau: -R1 / R2, tauFond: -p.Rf1 / p.Rf2 };
}

/** Numero minimo di denti della ruota piccola (2) senza interferenza, |τ| = z₁/z₂ ≥ 1 (pp. 167–168, NF-23). */
export const zMin = (tauAbs: number, theta: number) => 2 / (sqrt(tauAbs * tauAbs + (2 * tauAbs + 1) * sin(theta) ** 2) - tauAbs);
/** limite dentiera (|τ| → ∞): 2/sin²θ (p. 168) */
export const zMinDentiera = (theta: number) => 2 / sin(theta) ** 2;
/** come la scrive la dispensa a p. 168 (sin θ al posto di sin²θ, NF-23): solo per mostrare l'errore */
export const zMinComeDispensa = (tauAbs: number, theta: number) => 2 / (sqrt(tauAbs * tauAbs + (2 * tauAbs + 1) * sin(theta)) - tauAbs);
/** il primo intero che soddisfa z ≥ x */
export const interoMinimo = (x: number) => Math.ceil(x - 1e-9);

/**
 * Contatto con attrito (p. 169) ricavato dalla statica vettoriale, non dalle formule finali:
 * F^{2,1} = −F_N u + attrito f F_N opposto a V^rel_{1,2}; equilibrio alla rotazione della 1 (C₁ motrice) e della 2.
 * s < 0 accesso, s > 0 recesso. Restituisce F_N, coppia resistente C₂ (componente z), rendimento istantaneo,
 * velocità di strisciamento e potenza dissipata (p. 170).
 */
export function contattoConAttrito(p: { R1: number; R2: number; theta: number; f: number; s: number; C1: number; w1: number }) {
  const { R1, R2, theta: th, f, s, C1, w1 } = p;
  const i = R1 + R2;
  const u: V2 = [sin(th), cos(th)];
  const P = puntoRetta(R1, th, s);
  const P2: V2 = [P[0] - i, P[1]];
  const w2 = (-w1 * R1) / R2;
  const V1 = wk(w1, P), V2v = wk(w2, P2);
  const Vrel12: V2 = [V1[0] - V2v[0], V1[1] - V2v[1]];
  const vr = hypot(Vrel12[0], Vrel12[1]);
  const e: V2 = vr > 1e-12 ? [Vrel12[0] / vr, Vrel12[1] / vr] : [0, 0];
  const F21perN: V2 = [-u[0] - f * e[0], -u[1] - f * e[1]];
  const N = -C1 / crossZ(P, F21perN);
  const F12: V2 = [-N * F21perN[0], -N * F21perN[1]];
  const C2 = -crossZ(P2, F12);
  const eta = -(C2 * w2) / (C1 * w1);
  const Wdiss = -f * N * vr; // F_T^{2,1}·V^rel_{1,2} (p. 170)
  const K = ((f * C1) / (R1 * cos(th))) * (Math.abs(w1) + Math.abs(w2));
  return { N, C2, eta, w2, vrel: vr, Wdiss, Kx: K * Math.abs(s), K };
}

/** Rotismo ordinario (pp. 171–173): ingranamenti in serie, τ_J = ∓ z_motrice/z_condotta (esterno −, interno +). */
export interface Ingranamento { zMotrice: number; zCondotta: number; interno?: boolean }
export function rotismoOrdinario(ing: Ingranamento[], Cin = 1, win = 1) {
  const taus = ing.map((g) => ((g.interno ? 1 : -1) * g.zMotrice) / g.zCondotta);
  const tau = taus.reduce((x, y) => x * y, 1);
  // velocità angolari degli alberi (con verso positivo comune) e coppia d'uscita dalla T.F.V. in regime, η = 1
  const omegas = [win];
  for (const t of taus) omegas.push(omegas[omegas.length - 1] * t);
  return { taus, tau, omegas, Cout: -Cin / tau };
}
