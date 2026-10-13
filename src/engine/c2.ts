/**
 * Capitolo C2 (attrito e aderenza): funzioni pure usate da animazioni, previsioni e test.
 * Fonte: dispensa pp. 67–102 (tools/testi/cap2.md). Notazione della dispensa: f_ad aderenza, f_att attrito,
 * φ_ad = atan f_ad, φ_att = atan f_att; veicolo: l₁ = A(anteriore)–G, l₂ = G–B(posteriore), h altezza di G.
 */

export const G_ACC = 9.81;

/**
 * Massa su piano inclinato (pp. 70–71). Assi della dispensa: x normale al piano, y lungo il piano verso l'alto.
 * In aderenza F_ad = Mg sin α (reazione), in strisciamento F_att = f_att F_N e a_y = g (f_att cos α − sin α) < 0.
 */
export function pianoInclinato(p: { M: number; alpha: number; fad: number; fatt: number; g?: number }) {
  const g = p.g ?? G_ACC;
  const FN = p.M * g * Math.cos(p.alpha);
  const aderenza = Math.tan(p.alpha) <= p.fad;
  const FT = aderenza ? p.M * g * Math.sin(p.alpha) : p.fatt * FN;
  const ay = aderenza ? 0 : g * (p.fatt * Math.cos(p.alpha) - Math.sin(p.alpha));
  return {
    FN,
    FT,
    aderenza,
    ay,
    phiAd: Math.atan(p.fad),
    phiAtt: Math.atan(p.fatt),
    /** inclinazione della risultante di contatto rispetto alla normale */
    inclR: Math.atan2(FT, FN),
  };
}

/**
 * Ruota su piano con forza orizzontale F nella sommità (pp. 72–73), rotolamento senza strisciamento.
 * F_ad (positiva se concorde con F), ω̇ (antiorario positivo), a_G, forza limite di aderenza.
 */
export function ruotaSommita(p: { M: number; R: number; IG: number; F: number; fad: number; g?: number }) {
  const g = p.g ?? G_ACC;
  const D = p.M * p.R ** 2 + p.IG;
  const Fad = (p.F * (p.M * p.R ** 2 - p.IG)) / D;
  const omegaDot = (-2 * p.F * p.R) / D;
  const aG = -omegaDot * p.R;
  const Flim = (p.fad * p.M * g * D) / (p.M * p.R ** 2 - p.IG);
  return { Fad, omegaDot, aG, Flim, rotola: p.F <= Flim };
}

/**
 * Blocco di base s spinto da F orizzontale ad altezza h (p. 68 + deduzione): spostamento della normale b = Fh/(Mg),
 * ribaltamento per b = s/2, slittamento per F = f_ad Mg.
 */
export function blocco(p: { M: number; s: number; h: number; fad: number; F: number; g?: number }) {
  const g = p.g ?? G_ACC;
  const b = (p.F * p.h) / (p.M * g);
  const Frib = (p.M * g * p.s) / (2 * p.h);
  const Fslip = p.fad * p.M * g;
  const primo: 'ribalta' | 'slitta' = Frib < Fslip ? 'ribalta' : 'slitta';
  const stato: 'fermo' | 'ribalta' | 'slitta' = p.F < Math.min(Frib, Fslip) ? 'fermo' : primo;
  return { b, Frib, Fslip, primo, stato };
}

/**
 * Impuntamento del corsoio (pp. 79–81): contatti A (spigolo superiore sinistro) e B (inferiore destro), corsoio che
 * sale, attrito f_att su entrambi. Q = F/(1 − 2 e f/h); per e/h ≥ 1/(2f) nessuna Q finita (impuntamento).
 */
export function impuntamento(p: { F: number; e: number; h: number; f: number }) {
  const den = 1 - (2 * p.e * p.f) / p.h;
  const bloccato = den <= 0;
  const Q = bloccato ? Infinity : p.F / den;
  const FN = bloccato ? Infinity : (Q * p.e) / p.h; // dai momenti: −F_N h + Q e = 0
  return { Q, FN, FT: p.f * FN, bloccato, limite: 1 / (2 * p.f), den };
}

/**
 * Perno nella boccola con attrito (pp. 81–83). Il contatto P sale dal lato verso cui l'attrito spinge il perno:
 * con ω oraria (figura della dispensa) a destra. φ = atan f_att, r* = R sin φ, momento resistente F r*.
 * thetaP: angolo di OP dalla verticale verso il basso, positivo verso destra.
 */
export function perno(p: { F: number; R: number; f: number; verso: 'orario' | 'antiorario' }) {
  const phi = Math.atan(p.f);
  const s = p.verso === 'orario' ? 1 : -1;
  const rStar = p.R * Math.sin(phi);
  return {
    phi,
    rStar,
    M: p.F * rStar,
    Mapprox: p.f * p.F * p.R,
    RN: p.F * Math.cos(phi),
    RT: p.F * Math.sin(phi),
    thetaP: s * phi,
    /** coordinate del contatto (x a destra, y in alto, origine O) */
    P: [s * p.R * Math.sin(phi), -p.R * Math.cos(phi)] as [number, number],
  };
}

/**
 * Attrito volvente della ruota folle (pp. 84–88): F_N spostata di u verso la zona di compressione; equilibrio alla
 * rotazione attorno a O con braccio h (altezza del centro) e risultato con R nell'ipotesi h ≃ R (NF-17).
 */
export function volvente(p: { FN: number; u: number; R: number; h: number }) {
  return {
    FTesatta: (p.FN * p.u) / p.h,
    FT: (p.FN * p.u) / p.R,
    fv: p.u / p.R,
    Mres: p.FN * p.u,
    thetaMax: Math.acos(p.h / p.R),
  };
}

/**
 * Dinamica longitudinale (pp. 89–92, 100–101). a > 0 accelerazione in avanti, a < 0 frenata.
 * Normali dai momenti rispetto ai contatti: N_A = M(g l₂ − a h)/L, N_B = M(g l₁ + a h)/L.
 */
export function veicolo(p: { M: number; l1: number; l2: number; h: number; f: number; g?: number }) {
  const g = p.g ?? G_ACC;
  const L = p.l1 + p.l2;
  const normali = (a: number) => ({ NA: (p.M * (g * p.l2 - a * p.h)) / L, NB: (p.M * (g * p.l1 + a * p.h)) / L });
  const aMaxAnt = (p.f * g * p.l2) / (L + p.f * p.h);
  const aDragster = (g * p.l2) / p.h;
  const impennata = p.f * p.h >= p.l2; // oltre, l'anteriore si solleva prima dello slittamento (NF-124)
  const aMaxPostFormula = (p.f * g * p.l1) / (L - p.f * p.h);
  const aMaxPost = impennata ? aDragster : aMaxPostFormula;
  /** riga di p. 91 (NF-16): l₂ al numeratore */
  const aMaxPostDispensa = (p.f * g * p.l2) / (L - p.f * p.h);
  const stoppie = p.f * p.h >= p.l1; // in frenata si solleverebbe il posteriore
  const decMax = stoppie ? (g * p.l1) / p.h : p.f * g;
  const ripartizioneIdeale = stoppie ? Infinity : (p.l2 + p.f * p.h) / (p.l1 - p.f * p.h); // F_TA / F_TB
  const decSoloAnt = (p.f * g * p.l2) / (L - p.f * p.h);
  const decSoloPost = (p.f * g * p.l1) / (L + p.f * p.h);
  return { L, normali, aMaxAnt, aMaxPost, aMaxPostFormula, aMaxPostDispensa, aDragster, impennata, decMax, stoppie, ripartizioneIdeale, decSoloAnt, decSoloPost };
}

/**
 * Autoveicolo in curva a destra (pp. 93–95, 102): S = sinistra = esterna, D = destra = interna; G a metà carreggiata.
 * Motociclo (pp. 95–96): angolo di piega tan α = v²/(gR).
 */
export function curva(p: { M: number; R: number; c: number; h: number; f: number; v: number; g?: number }) {
  const g = p.g ?? G_ACC;
  const Fc = (p.M * p.v ** 2) / p.R;
  const dN = (Fc * p.h) / p.c;
  const FND = (p.M * g) / 2 - dN;
  const FNS = (p.M * g) / 2 + dN;
  const vSlip = Math.sqrt(p.f * g * p.R);
  const vRib = Math.sqrt((p.R * p.c * g) / (2 * p.h));
  const primo: 'ribaltamento' | 'slittamento' = vRib < vSlip ? 'ribaltamento' : 'slittamento';
  const vLim = Math.min(vSlip, vRib);
  const stato: 'ok' | 'ribaltamento' | 'slittamento' = p.v < vLim ? 'ok' : primo;
  return { Fc, FND, FNS, vSlip, vRib, primo, stato, alphaMoto: Math.atan(p.v ** 2 / (g * p.R)), phiAd: Math.atan(p.f) };
}

/**
 * Cinematica del cuscinetto (p. 98). Velocità tangenziali come componenti lungo t̂ = k̂ ∧ ĵ (verso antiorario):
 * V_E = ω_e R_e, V_I = ω_i R_i, V_G = (V_E + V_I)/2, ω_v = (V_E − V_I)/(2r), ω_g = V_G/R_g.
 */
export function cuscinettoCinematica(p: { omegaI: number; omegaE: number; Ri: number; Re: number }) {
  const r = (p.Re - p.Ri) / 2;
  const Rg = (p.Re + p.Ri) / 2;
  const VE = p.omegaE * p.Re;
  const VI = p.omegaI * p.Ri;
  const VG = (VE + VI) / 2;
  return { r, Rg, VE, VI, VG, omegaV: (VE - VI) / (2 * r), omegaG: VG / Rg };
}

/**
 * Distribuzione del carico radiale Q sui rulli (pp. 98–99): P_i = P₀ cos(iγ) per |iγ| < 90°, γ = 2π/z.
 * Restituisce il valore esatto della somma e l'approssimazione della dispensa P₀ ≃ 4Q/z.
 */
export function cuscinettoCarico(p: { Q: number; z: number }) {
  const gamma = (2 * Math.PI) / p.z;
  const idx: number[] = [];
  for (let i = -Math.floor(p.z / 4); i <= Math.floor(p.z / 4); i++) if (Math.abs(i * gamma) < Math.PI / 2 - 1e-12) idx.push(i);
  const S2 = idx.reduce((s, i) => s + Math.cos(i * gamma) ** 2, 0);
  const S1 = idx.reduce((s, i) => s + Math.cos(i * gamma), 0);
  const P0 = p.Q / S2;
  return { gamma, idx, S2, S1, P0, P0approx: (4 * p.Q) / p.z, P: idx.map((i) => P0 * Math.cos(i * gamma)), sommaP: P0 * S1 };
}

/** Momento d'attrito del cuscinetto volvente radiale (p. 99): M_f ≃ (5/π) Q R_g f_v (P₀ ≃ 5Q/z, cos α ≃ 1). */
export const momentoCuscinetto = (Q: number, Rg: number, fv: number) => (5 / Math.PI) * Q * Rg * fv;
