/**
 * Capitolo C5, parte b (rotismi epicicloidali, rendimenti, ruote elicoidali e coniche): funzioni pure usate da
 * animazioni, previsioni e test. Fonte: dispensa pp. 174–191 (tools/testi/cap5b.md).
 *
 * Convenzioni della dispensa (NF-09, NF-11):
 *  - velocità angolari con segno, tutte riferite allo stesso asse (riferimento comune);
 *  - Willis τ_W = (ω_uscita − Ω)/(ω_entrata − Ω) (p. 174), Ω = velocità del portatreno;
 *  - elicoidali: α = angolo d'elica sul cilindro PRIMITIVO, β = sul cilindro FONDAMENTALE (tg β = tg α cos θ, p. 185),
 *    θ = angolo di pressione frontale, θ_m = normale.
 */

// ------------------------------------------------------------------ rotismi epicicloidali (pp. 174–175)

/** rapporto di Willis (p. 174): τ_W = (ω₂ − Ω)/(ω₁ − Ω) */
export const willis = (w1: number, w2: number, W: number) => (w2 - W) / (w1 - W);

/** velocità del portatreno note τ_W e le velocità dei due solari: τ_W(ω₁ − Ω) = ω₂ − Ω ⇒ Ω = (ω₂ − τ_W ω₁)/(1 − τ_W) */
export const portatreno = (tauW: number, w1: number, w2: number) => (w2 - tauW * w1) / (1 - tauW);

/**
 * Rotismo semplice di p. 175: solare 1, satellite 2, corona interna 3 (R₃ = R₁ + 2R₂), modulo unitario (R = z/2).
 * fisso = 'corona': riduttore con ω₃ = 0, entra il solare (ω₁ = wIn), esce il portatreno.
 * fisso = 'solare': ω₁ = 0, entra la corona (ω₃ = wIn), esce il portatreno («τ maggiore», p. 175).
 * Velocità del satellite dal Willis 1–2 nel moto relativo al portatreno: (ω₂ − Ω)/(ω₁ − Ω) = −z₁/z₂.
 */
export function epicicloidale(p: { z1: number; z2: number; fisso: 'corona' | 'solare'; wIn: number }) {
  const z3 = p.z1 + 2 * p.z2;
  const R1 = p.z1 / 2, R2 = p.z2 / 2, R3 = z3 / 2;
  const tauW = -p.z1 / z3;
  const w1 = p.fisso === 'corona' ? p.wIn : 0;
  const w3 = p.fisso === 'corona' ? 0 : p.wIn;
  const W = portatreno(tauW, w1, w3);
  const w2 = W - (p.z1 / p.z2) * (w1 - W);
  // velocità (tangenziali, con segno) dei punti sulla verticale del satellite: C₁,₂, O₂, C₂,₃
  const vC12 = w1 * R1, vO2 = W * (R1 + R2), vC23 = w3 * R3;
  // CIR del satellite: distanza con segno da O₂ verso l'esterno (v = vO2 + ω₂·s = 0)
  const cir = Math.abs(w2) > 1e-12 ? -vO2 / w2 : Infinity;
  return { z3, R1, R2, R3, tauW, w1, w2, w3, W, rel2: w2 - W, tauGlob: W / p.wIn, vC12, vO2, vC23, cir };
}

/** rapporto globale del rotismo combinato di p. 180: ω₇/ω₅ = (−z₅/z₆)·τ_W/(τ_W − 1)·(−z₈/z₇), τ_W = z₁z₃/(z₂z₄) */
export function rotismoCombinato(z: { z1: number; z2: number; z3: number; z4: number; z5: number; z6: number; z7: number; z8: number }) {
  const t01 = -z.z5 / z.z6, t02 = -z.z8 / z.z7;
  const tauW = (z.z1 * z.z3) / (z.z2 * z.z4);
  const tEpi = tauW / (tauW - 1);
  return { t01, t02, tauW, tEpi, tGlob: t01 * tEpi * t02 };
}

/** coppie di un epicicloidale a regime con η = 1 (p. 179): C₂ = −C₁/τ_W, C_p = −(C₁ + C₂) */
export const coppieEpi = (tauW: number, C1: number) => {
  const C2 = -C1 / tauW;
  return { C1, C2, Cp: -(C1 + C2) };
};

// ------------------------------------------------------------------ differenziale (pp. 176–178)

/**
 * Differenziale in moto rettilineo (R = ∞) o in curva (Fig. 5-53): V_M velocità del punto medio dell'asse, R raggio
 * della traiettoria del punto medio, p carreggiata, d diametro delle ruote; 1 = ruota interna, 2 = esterna.
 * zs, zp: denti dei solari e dei planetari (per la rotazione propria dei planetari, in modulo).
 */
export function differenziale(q: { VM: number; R: number; p: number; d: number; zs?: number; zp?: number }) {
  const curva = Number.isFinite(q.R);
  const wV = curva ? q.VM / q.R : 0;
  const V1 = curva ? wV * (q.R - q.p / 2) : q.VM;
  const V2 = curva ? wV * (q.R + q.p / 2) : q.VM;
  const w1 = (2 * V1) / q.d, w2 = (2 * V2) / q.d;
  const W = (w1 + w2) / 2;
  const spin = ((q.zs ?? 1) / (q.zp ?? 1)) * Math.abs(w1 - W);
  return { wV, V1, V2, w1, w2, W, rel1: w1 - W, rel2: w2 - W, spin, tauW: willis(w1, w2, W) };
}

// ------------------------------------------------------------------ rendimenti (pp. 181–184, 201)

/** rendimento di una cascata di stadi in serie (p. 184): η_TOT = Π η */
export const rendimentoCascata = (etas: number[]) => etas.reduce((a, b) => a * b, 1);

/** potenza che arriva a valle di ogni stadio, con W_m = 1 (p. 184) */
export const flussoCascata = (etas: number[]) => {
  const out: number[] = [1];
  for (const e of etas) out.push(out[out.length - 1] * e);
  return out;
};

/**
 * Ingranaggio inizialmente in quiete (p. 182, condizione (*)): con coppie applicate in modulo,
 * |C₁|/|C₂| > τ/η₁ → si muove con 1 movente; |C₁|/|C₂| < τη₂ → si muove con 2 movente; in mezzo resta in quiete.
 */
export function avviamento(q: { tau: number; eta1: number; eta2: number; rC: number }) {
  const lo = q.tau * q.eta2, hi = q.tau / q.eta1;
  const stato: '1-movente' | '2-movente' | 'quiete' = q.rC > hi ? '1-movente' : q.rC < lo ? '2-movente' : 'quiete';
  return { lo, hi, stato };
}

/** coppia d'uscita in modulo a regime (pp. 180–181, 201): ruota 1 movente |C₂| = η₁|C₁|/τ */
export const coppiaUscita = (C1: number, tau: number, eta1: number) => (eta1 * C1) / tau;

/**
 * Rendimento di un epicicloidale con un solare fisso, solare 1 motore e portatreno condotto (fonte esterna, NF-201):
 * le perdite si valutano nel moto relativo al portatreno con il rendimento η_o del rotismo reso ordinario.
 * Ω/ω₁ = τ_W/(τ_W − 1); k = (ω₁ − Ω)/ω₁ = 1 − Ω/ω₁.
 *  k > 0 (τ_W < 1): nel moto relativo 1 è movente, W_diss = −(1 − η_o)C₁(ω₁ − Ω) ⇒ η = 1 − (1 − η_o)k = (τ_W − η_o)/(τ_W − 1)
 *  k < 0 (τ_W > 1): nel moto relativo 1 è cedente, W_diss = (1 − η_o)/η_o·C₁(ω₁ − Ω) ⇒ η = (η_oτ_W − 1)/(η_o(τ_W − 1))
 */
export function rendimentoEpi(tauW: number, etaO: number) {
  const r = tauW / (tauW - 1);
  const k = 1 - r;
  const caso: 'relativo-diretto' | 'relativo-retrogrado' = k > 0 ? 'relativo-diretto' : 'relativo-retrogrado';
  const eta = k > 0 ? 1 - (1 - etaO) * k : 1 + ((1 - etaO) / etaO) * k;
  return { r, k, caso, eta };
}

// ------------------------------------------------------------------ ruote elicoidali (pp. 185–189)

/** angolo d'elica sul cilindro fondamentale (p. 185): tg β = tg α cos θ */
export const betaFondamentale = (alpha: number, theta: number) => Math.atan(Math.tan(alpha) * Math.cos(theta));
/** angolo di pressione normale (p. 186): tg θ_m = tg θ cos α */
export const thetaNormale = (theta: number, alpha: number) => Math.atan(Math.tan(theta) * Math.cos(alpha));

/**
 * Linee di contatto nel rettangolo dei contatti (p. 187): x ∈ [0, b] lungo l'asse, y ∈ [0, δ] lungo il segmento dei
 * contatti (y verso l'alto, ingresso in H in alto a sinistra). Le linee y = y₀ + x tg β scendono con lo spostamento s;
 * due linee successive distano pb = P cos θ (passo sulla retta d'azione). Restituisce i tratti dentro il rettangolo.
 */
export function lineeContatto(q: { delta: number; b: number; beta: number; pb: number; s: number }) {
  const t = Math.tan(q.beta);
  const span = q.delta + q.b * t; // δ_e: escursione di y₀ in cui la linea tocca il rettangolo
  const segs: { x1: number; y1: number; x2: number; y2: number; L: number }[] = [];
  const s = ((q.s % q.pb) + q.pb) % q.pb;
  for (let k = 0; ; k++) {
    const y0 = q.delta - s - k * q.pb; // quota della linea sul lato x = 0 (sopra δ non c'è: ingresso in H)
    if (y0 < -q.b * t) break;
    // tratto della retta y = y0 + x t dentro [0,b]×[0,δ]
    let xa = 0, xb = q.b;
    if (t > 1e-12) {
      xa = Math.max(0, -y0 / t);
      xb = Math.min(q.b, (q.delta - y0) / t);
    } else if (y0 < 0 || y0 > q.delta) continue;
    if (xb < xa) continue;
    const L = (xb - xa) / Math.cos(q.beta);
    segs.push({ x1: xa, y1: y0 + xa * t, x2: xb, y2: y0 + xb * t, L });
  }
  return { segs, n: segs.length, Ltot: segs.reduce((a, g) => a + g.L, 0), deltaE: span, zPresa: span / q.pb, zDritti: q.delta / q.pb };
}

/** numero di denti in presa (p. 187): z = δ_e/(P cos θ) con δ_e = δ + b tg β */
export const dentiInPresa = (delta: number, b: number, beta: number, P: number, theta: number) => (delta + b * Math.tan(beta)) / (P * Math.cos(theta));

/** ruota fittizia (p. 188): z_fitt = z/cos³α */
export const zFittizio = (z: number, alpha: number) => z / Math.cos(alpha) ** 3;
/** numero minimo di denti dell'elicoidale (p. 188): z_min = z*_min cos³α (z*_min dei denti dritti) */
export const zMinElicoidale = (zStar: number, alpha: number) => zStar * Math.cos(alpha) ** 3;

/** forze scambiate dalle elicoidali (p. 189), nota la coppia C sulla ruota di raggio primitivo r */
export function forzeElicoidali(q: { C: number; r: number; theta: number; alpha: number }) {
  const thetaM = thetaNormale(q.theta, q.alpha);
  const Q = q.C / q.r;
  const F = Q / (Math.cos(thetaM) * Math.cos(q.alpha));
  return { thetaM, Q, R: F * Math.sin(thetaM), A: Q * Math.tan(q.alpha), H: F * Math.cos(thetaM), F };
}

// ------------------------------------------------------------------ ruote coniche (pp. 190–191)

/** semiaperture dei coni primitivi noti τ = ω₂/ω₁ e l'angolo ψ fra gli assi (p. 190) */
export function coniPrimitivi(tau: number, psi: number) {
  const phi1 = Math.atan2(Math.sin(psi), 1 / tau + Math.cos(psi));
  const phi2 = Math.atan2(Math.sin(psi), tau + Math.cos(psi));
  return { phi1, phi2 };
}

/** forze scambiate dalle coniche (p. 191) sulla ruota 1 (raggio r₁ del punto di contatto, semiapertura φ₁) */
export function forzeConiche(q: { C1: number; r1: number; theta: number; phi1: number }) {
  const Q = q.C1 / q.r1;
  const F = Q / Math.cos(q.theta);
  const Fs = F * Math.sin(q.theta); // F'' (componente che interseca gli assi)
  return { Q, F, Fs, A: Fs * Math.sin(q.phi1), R: Fs * Math.cos(q.phi1) };
}

// ------------------------------------------------------------------ geometria per le animazioni (ingranamento)

/** parte frazionaria in [0, 1) */
export const frac = (x: number) => x - Math.floor(x);

/**
 * Fase del dentatura nella direzione `dir` (angolo matematico): 0 = centro di un dente, 0,5 = centro di un vano.
 * Ruota con z denti ruotata di `phi` e sfasata di `off` (i denti stanno a phi + off + 2πk/z).
 */
export const faseDente = (dir: number, phi: number, off: number, z: number) => frac(((dir - phi - off) * z) / (2 * Math.PI));

/**
 * Sfasamenti iniziali (θ = 0, portatreno con il primo satellite in alto) perché i denti ingranino:
 * esterno solare–satellite: fase del solare + fase del satellite (nella direzione opposta) = ½;
 * interno satellite–corona: fase della corona − fase del satellite (stessa direzione) = ½.
 * Rotolando senza strisciare le due somme restano costanti (tests/meccanismi-c5b.test.ts).
 */
export function sfasamentiEpi(z1: number, z2: number, N: number) {
  const z3 = z1 + 2 * z2;
  const psi = (n: number) => Math.PI / 2 + (2 * Math.PI * n) / N;
  const offP = Array.from({ length: N }, (_, n) => {
    const sA = faseDente(psi(n), 0, 0, z1);
    return psi(n) + Math.PI - ((0.5 - sA) * 2 * Math.PI) / z2;
  });
  const sB = faseDente(psi(0), 0, offP[0], z2);
  const offR = psi(0) - ((0.5 + sB) * 2 * Math.PI) / z3;
  return { z3, offP, offR, psi };
}

/** numero di satelliti montabili a passo uguale: N divide z₁ + z₃ (z₁ + z₃ = 2(z₁ + z₂) è sempre pari) */
export const numeroSatelliti = (z1: number, z2: number) => ((2 * (z1 + z2)) % 3 === 0 ? 3 : 2);

/**
 * Contorno di una ruota dentata (coordinate matematiche relative al centro): z denti trapezoidali, raggio primitivo Rp,
 * modulo m; interna = true per la corona (denti verso il centro). phase = angolo del primo dente.
 */
export function contornoRuota(z: number, Rp: number, m: number, phase: number, interna = false): [number, number][] {
  const pa = (2 * Math.PI) / z;
  const rt = interna ? Rp - m : Rp + m; // testa
  const rr = interna ? Rp + 1.25 * m : Rp - 1.25 * m; // piede
  const pts: [number, number][] = [];
  const P = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)];
  for (let k = 0; k < z; k++) {
    const c = phase + k * pa;
    pts.push(P(rr, c - 0.5 * pa), P(rr, c - 0.27 * pa), P(rt, c - 0.13 * pa), P(rt, c + 0.13 * pa), P(rr, c + 0.27 * pa));
  }
  return pts;
}

/** η_EPI per un intervallo di τ_W (per il grafico): salta i punti vicino a τ_W = 1 */
export function curvaRendimentoEpi(etaO: number, t0 = -3, t1 = 4, n = 400) {
  const out: { tauW: number; eta: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const tw = t0 + ((t1 - t0) * i) / n;
    if (Math.abs(tw - 1) < 0.02) continue;
    out.push({ tauW: tw, eta: rendimentoEpi(tw, etaO).eta });
  }
  return out;
}
