/**
 * Capitolo C3 (freni e frizioni): funzioni pure usate da animazioni, previsioni, controlli numerici e test.
 * Fonte: dispensa pp. 103–128 (tools/testi/cap3.md); partitore da pp. 90–92, 100–101 (cap2.md); frizione centrifuga e
 * pressione uniforme: modelli classici dichiarati come fonte esterna (NF-07).
 */

/** integrale di Simpson composito (n pari) */
export function simpson(fn: (x: number) => number, a: number, b: number, n = 400): number {
  const m = n % 2 ? n + 1 : n;
  const h = (b - a) / m;
  let s = fn(a) + fn(b);
  for (let k = 1; k < m; k++) s += (k % 2 ? 4 : 2) * fn(a + k * h);
  return (s * h) / 3;
}

/** integrale doppio di Simpson sul rettangolo [a,b]×[c,d] */
export const simpson2 = (fn: (x: number, y: number) => number, a: number, b: number, c: number, d: number, n = 120) =>
  simpson((x) => simpson((y) => fn(x, y), c, d, n), a, b, n);

// ------------------------------------------------------------------ tamburo a ceppo (pp. 106–110)

/**
 * Risultanti sul ceppo con pressione uniforme p₀ (pp. 106–107), arco simmetrico −α/2…α/2 sulla bisettrice x.
 * Mf è il momento esatto delle tangenziali rispetto a O (ogni dF_T ha braccio R); MfD è la forma della dispensa
 * |F_T|·R, valida «in prima approssimazione» (NF-141).
 */
export function risultantiCeppo(p: { p0: number; R: number; B: number; alpha: number; f: number }) {
  const FN = 2 * p.p0 * p.R * p.B * Math.sin(p.alpha / 2);
  const FT = p.f * FN;
  const phi = Math.atan(p.f);
  const Ff = Math.hypot(FN, FT);
  const rho = p.R * Math.sin(phi);
  const Mf = p.f * p.p0 * p.R * p.R * p.B * p.alpha;
  return { FN, FT, Ff, phi, rho, Mf, MfD: FT * p.R, fattore: p.alpha / 2 / Math.sin(p.alpha / 2) };
}

/**
 * Consumo del ceppo (p. 108, generalizzato in d142): centro di rotazione C a distanza OC da O, nella direzione γ
 * (angolo matematico da x, in radianti); ω_acc > 0 nel verso che porta il ceppo contro il tamburo.
 * δ̇(θ) = ω_acc ∧ (O − C) · n = ω_acc·OC·sin(θ − γ); massimo dove OP ⊥ OC (θ = γ + π/2).
 * Con γ = −π/2 (C sotto O, come O' a p. 108) si ritrova δ̇ = δ̇(0) cos θ.
 */
export function consumoCeppo(p: { OC: number; gamma: number; omegaAcc: number }) {
  const d = (theta: number) => p.omegaAcc * p.OC * Math.sin(theta - p.gamma);
  return { d, thetaMax: p.gamma + Math.PI / 2, dMax: p.omegaAcc * p.OC };
}

/** rapporto fra il consumo agli estremi e al centro dell'arco (C sotto O): cos(α/2); α = 90° → 0,707 (−30 %) */
export const consumoEstremi = (alpha: number) => Math.cos(alpha / 2);

/**
 * Freno a due ceppi esterni con cerniere sulla verticale per O a distanza d = OO' sotto il centro (pp. 109–110):
 * F orizzontale a braccio h dalla cerniera; contatto nel punto medio M, braccio di F_N = d, di F_T = R.
 * Tamburo orario (figura di p. 109): nel ceppo destro l'attrito si oppone al comando, nel sinistro lo aiuta.
 * Con ω antioraria i ruoli si scambiano. «avvolgente» qui ha il senso usuale: l'attrito aiuta il comando (NF-18).
 */
export function ceppiEsterni(p: { F: number; h: number; d: number; R: number; f: number; verso: 'orario' | 'antiorario' }) {
  const contro = (p.F * p.h) / (p.d / p.f + p.R); // F_T del ceppo in cui l'attrito si oppone al comando
  const den = p.d / p.f - p.R;
  const aiuta = den > 0 ? (p.F * p.h) / den : Infinity; // F_T del ceppo autoenergizzante
  const [dx, sx] = p.verso === 'orario' ? [contro, aiuta] : [aiuta, contro];
  const avvolgente: 'dx' | 'sx' = p.verso === 'orario' ? 'sx' : 'dx';
  return {
    FTdx: dx, FTsx: sx, FNdx: dx / p.f, FNsx: sx / p.f,
    avvolgente,
    Mf: (dx + sx) * p.R,
    fLim: p.d / p.R,
    bloccato: den <= 0,
    rapporto: den > 0 ? (p.d / p.f + p.R) / den : Infinity,
  };
}

// ------------------------------------------------------------------ freno a pattino (pp. 114–115, 124–125)

/**
 * Pattino incernierato in O a quota h sul nastro, fra x = s e x = s + l dalla proiezione O*; p(x) = k'x (Reye).
 * verso 'contro' = verso del nastro della figura di p. 114 (attrito che si oppone alla coppia di accostamento):
 * C_az = F_N x₀ + F_T h ⇒ F_T = C_az/(x₀/f + h). verso 'aiuta': F_T = C_az/(x₀/f − h), «freno di sicurezza».
 */
export function pattino(p: { s: number; l: number; B: number; f: number; h: number; Caz: number; verso: 'contro' | 'aiuta' }) {
  const S2 = (p.s + p.l) ** 2 - p.s ** 2, S3 = (p.s + p.l) ** 3 - p.s ** 3;
  const x0 = ((2 / 3) * S3) / S2;
  const den = x0 / p.f + (p.verso === 'contro' ? p.h : -p.h);
  const FT = den > 0 ? p.Caz / den : Infinity;
  const FN = FT / p.f;
  const k1 = (2 * FN) / (p.B * S2); // k' tale che F_N = B k' S2 / 2
  return { x0, FT, FN, k1, bloccato: den <= 0, fLim: x0 / p.h, centro: p.s + p.l / 2 };
}

// ------------------------------------------------------------------ freno a disco e frizioni (pp. 116, 119–122)

export type Legge = 'usura' | 'uniforme';

/**
 * Pattino a settore α fra r_i e r_e premuto con forza normale F_N.
 * 'usura' (Reye, consumo uniforme, p. 116): p = K''/r, K'' = F_N/(α(r_e − r_i)).
 * 'uniforme' (disco nuovo, fonte esterna): p = p₀ = 2F_N/(α(r_e² − r_i²)).
 * Mf momento frenante, Rm = Mf/(f F_N), FT modulo della risultante tangenziale, bt = Mf/FT, bm braccio della normale.
 */
export function discoSettore(p: { ri: number; re: number; alpha: number; f: number; FN: number; legge: Legge }) {
  const { ri, re, alpha, f, FN } = p;
  const s = Math.sin(alpha / 2);
  if (p.legge === 'usura') {
    const K = FN / (alpha * (re - ri));
    const Mf = (f * K * alpha * (re * re - ri * ri)) / 2;
    const FT = f * K * (re - ri) * 2 * s;
    const Mn = (K * 2 * s * (re * re - ri * ri)) / 2; // ∫ r cosθ dF_N
    return { pr: (r: number) => K / r, K, Mf, Rm: Mf / (f * FN), FT, bt: FT > 1e-12 * FN ? Mf / FT : Infinity, bm: Mn / FN };
  }
  const p0 = (2 * FN) / (alpha * (re * re - ri * ri));
  const Mf = (f * p0 * alpha * (re ** 3 - ri ** 3)) / 3;
  const FT = (f * p0 * 2 * s * (re * re - ri * ri)) / 2;
  const Mn = (p0 * 2 * s * (re ** 3 - ri ** 3)) / 3;
  return { pr: () => p0, K: p0, Mf, Rm: Mf / (f * FN), FT, bt: FT > 1e-12 * FN ? Mf / FT : Infinity, bm: Mn / FN };
}

/** frizione piana a i superfici d'attrito (5.84)–(5.86); 'uniforme' = variante a pressione uniforme (esterna) */
export function frizionePiana(p: { ri: number; re: number; f: number; N: number; i: number; legge: Legge }) {
  const Rm = p.legge === 'usura' ? (p.re + p.ri) / 2 : ((2 / 3) * (p.re ** 3 - p.ri ** 3)) / (p.re ** 2 - p.ri ** 2);
  return { Rm, Cf: p.i * p.f * p.N * Rm };
}

/** innesto assimilabile a un urto (p. 118): ω_f (5.83) e lavoro perso L_f = I₁I₂(ω₁₀ − ω₂₀)²/(2(I₁ + I₂)) */
export function innesto(p: { I1: number; I2: number; w10: number; w20: number }) {
  const wf = (p.I1 * p.w10 + p.I2 * p.w20) / (p.I1 + p.I2);
  const E0 = 0.5 * (p.I1 * p.w10 ** 2 + p.I2 * p.w20 ** 2);
  const Lf = E0 - 0.5 * (p.I1 + p.I2) * wf ** 2;
  return { wf, E0, Lf, frazione: Lf / E0 };
}

/**
 * Frizione conica (5.87)–(5.88), α semiangolo del cono, N' forza assiale. Cf della dispensa (attrito lungo la
 * generatrice che si oppone all'accostamento) e CfQ42 = f N' r_m / sin α delle fonti derivate (NF-19).
 * Ndis = forza assiale per staccare i coni a pari pressione (attrito invertito): negativa se tg α < f.
 */
export function frizioneConica(p: { ri: number; re: number; f: number; Np: number; alpha: number }) {
  const rm = (p.re + p.ri) / 2;
  const sa = Math.sin(p.alpha), ca = Math.cos(p.alpha);
  const Cf = (p.f * p.Np * rm) / (sa + p.f * ca);
  const CfQ42 = (p.f * p.Np * rm) / sa;
  return { rm, Cf, CfQ42, rapportoQ42: CfQ42 / Cf, amplificazione: 1 / (sa + p.f * ca), Ndis: (p.Np * (sa - p.f * ca)) / (sa + p.f * ca) };
}

/**
 * Frizione centrifuga a n ceppi guidati radialmente (modello classico, fonte esterna): massa m, baricentro a r_G,
 * molla di richiamo F_m (gioco trascurabile), tamburo di raggio R. ω* = √(F_m/(m r_G)); C_f = n f R m r_G (ω² − ω*²).
 */
export function frizioneCentrifuga(p: { m: number; rG: number; Fm: number; R: number; f: number; n: number; omega: number }) {
  const omegaStar = Math.sqrt(p.Fm / (p.m * p.rG));
  const N = Math.max(0, p.m * p.rG * p.omega ** 2 - p.Fm);
  return { omegaStar, N, Cf: p.n * p.f * N * p.R, K: p.n * p.f * p.m * p.rG * p.R };
}

// ------------------------------------------------------------------ partitore di frenata (deduzione da pp. 90–92)

/**
 * Veicolo in frenata (notazione di p. 92): l₁ = A–G (A anteriore), l₂ = G–B (B posteriore), h quota del baricentro,
 * a decelerazione (modulo). β = F_T,A/(F_T,A + F_T,B) ripartizione fissa della frenata.
 */
export function partitore(p: { M: number; g: number; l1: number; l2: number; h: number; f: number; a: number; beta: number }) {
  const L = p.l1 + p.l2;
  const NA = (p.M * (p.g * p.l2 + p.a * p.h)) / L;
  const NB = (p.M * (p.g * p.l1 - p.a * p.h)) / L;
  const rapportoIdeale = NA / NB;
  const betaIdeale = NA / (p.M * p.g); // = (l₂ + (a/g) h)/L
  const betaStar = (p.l2 + p.f * p.h) / L; // ideale alla decelerazione massima a = f g
  const aA = (p.f * p.g * p.l2) / (p.beta * L - p.f * p.h); // bloccaggio anteriore con β fisso
  const aB = (p.f * p.g * p.l1) / ((1 - p.beta) * L + p.f * p.h); // bloccaggio posteriore
  const aAok = p.beta * L - p.f * p.h > 0 ? aA : Infinity;
  const aLim = Math.min(aAok, aB);
  const primo: 'anteriore' | 'posteriore' | 'insieme' = Math.abs(aAok - aB) <= 1e-9 * aB ? 'insieme' : aAok < aB ? 'anteriore' : 'posteriore';
  // aderenza utilizzata da ciascun asse (F_T/F_N) con la ripartizione fissa β alla decelerazione a: blocca quando = f
  const uA = (p.beta * p.M * p.a) / NA, uB = ((1 - p.beta) * p.M * p.a) / NB;
  return { NA, NB, rapportoIdeale, betaIdeale, betaStar, aA: aAok, aB, aLim, primo, dN: (p.M * p.a * p.h) / L, uA, uB };
}
