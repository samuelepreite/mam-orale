/** I numeri delle animazioni C2 coincidono con le formule della dispensa (pp. 67–102) e con le correzioni NF. */
import { describe, expect, it } from 'vitest';
import {
  blocco, cuscinettoCarico, cuscinettoCinematica, curva, impuntamento, momentoCuscinetto, perno, pianoInclinato, ruotaSommita, veicolo, volvente,
} from '../src/engine/c2';
import { close } from '../src/engine/num';

const g = 9.81;

describe('piano inclinato e cono (pp. 70–74)', () => {
  it('fermo finché tan α ≤ f_ad', () => {
    const lim = Math.atan(0.5);
    expect(pianoInclinato({ M: 3, alpha: lim - 1e-6, fad: 0.5, fatt: 0.3 }).aderenza).toBe(true);
    expect(pianoInclinato({ M: 3, alpha: lim + 1e-6, fad: 0.5, fatt: 0.3 }).aderenza).toBe(false);
  });
  it('in aderenza la risultante è verticale (inclinazione = α); in strisciamento è φ_att e a_y = g(f_att cos α − sin α)', () => {
    const al = 0.3, fe = pianoInclinato({ M: 3, alpha: al, fad: 0.5, fatt: 0.3 });
    expect(close(fe.inclR, al)).toBe(true);
    const al2 = 0.6, sc = pianoInclinato({ M: 3, alpha: al2, fad: 0.5, fatt: 0.3 });
    expect(close(sc.inclR, Math.atan(0.3))).toBe(true);
    expect(close(sc.ay, g * (0.3 * Math.cos(al2) - Math.sin(al2)))).toBe(true);
  });
});

describe('ruota con forza in sommità (pp. 72–73)', () => {
  it('disco: F_ad = F/3, limite F = 3 f_ad Mg, a_G = −ω̇R', () => {
    const M = 4, R = 0.3, F = 10, r = ruotaSommita({ M, R, IG: (M * R * R) / 2, F, fad: 0.4 });
    expect(close(r.Fad, F / 3)).toBe(true);
    expect(close(r.Flim, 3 * 0.4 * M * g)).toBe(true);
    // seconda equazione cardinale: −FR + F_ad R = I_G ω̇
    expect(close(-F * R + r.Fad * R, ((M * R * R) / 2) * r.omegaDot)).toBe(true);
  });
});

describe('ribaltamento del blocco (deduzione da p. 68)', () => {
  it('F_rib = Mg s/(2h), normale sullo spigolo; confronto con f_ad', () => {
    const r = blocco({ M: 10, s: 0.4, h: 0.5, fad: 0.6, F: 0 });
    expect(close(r.Frib, (10 * g * 0.4) / 1)).toBe(true);
    expect(close(blocco({ M: 10, s: 0.4, h: 0.5, fad: 0.6, F: r.Frib }).b, 0.2)).toBe(true);
    expect(r.primo).toBe('ribalta');
    expect(blocco({ M: 10, s: 0.8, h: 0.5, fad: 0.6, F: 0 }).primo).toBe('slitta');
  });
});

describe('impuntamento (pp. 79–81)', () => {
  it('Q = F/(1 − 2ef/h) soddisfa le tre equazioni della statica', () => {
    const F = 100, e = 0.3, h = 0.5, f = 0.2, a = 0.12, r = impuntamento({ F, e, h, f });
    expect(close(r.Q, F / (1 - (2 * e * f) / h))).toBe(true);
    expect(close(r.Q - F - 2 * r.FT, 0, 1e-9, 1e-9)).toBe(true);
    const mom = -r.FN * (h / 2) * 2 + r.FT * (a / 2) - r.FT * (a / 2) + r.Q * e;
    expect(close(mom, 0, 1e-9, 1e-9)).toBe(true);
  });
  it('impuntamento per e/h ≥ 1/(2f)', () => {
    expect(impuntamento({ F: 1, e: 2, h: 1, f: 0.25 }).bloccato).toBe(true);
    expect(impuntamento({ F: 1, e: 1.99, h: 1, f: 0.25 }).bloccato).toBe(false);
  });
});

describe('perno e cerchio d\'attrito (pp. 81–83)', () => {
  it('r* = R sin φ_att, M = F r* = R_T R, |OP| = R, retta verticale per P tangente al cerchio', () => {
    const F = 500, R = 0.04, f = 0.25, r = perno({ F, R, f, verso: 'orario' });
    expect(close(r.rStar, R * Math.sin(Math.atan(f)))).toBe(true);
    expect(close(r.M, r.RT * R)).toBe(true);
    expect(close(Math.hypot(r.P[0], r.P[1]), R)).toBe(true);
    expect(close(Math.abs(r.P[0]), r.rStar)).toBe(true);
    expect(close(Math.hypot(r.RN, r.RT), F)).toBe(true);
    expect(r.P[0] > 0).toBe(true); // ω oraria: contatto a destra
    expect(perno({ F, R, f, verso: 'antiorario' }).P[0] < 0).toBe(true);
  });
});

describe('attrito volvente (pp. 84–88)', () => {
  it('−F_N u + F_T h = 0 e F_T ≃ (u/R) F_N', () => {
    const r = volvente({ FN: 4000, u: 0.004, R: 0.3, h: 0.29 });
    expect(close(-4000 * 0.004 + r.FTesatta * 0.29, 0, 1e-9, 1e-9)).toBe(true);
    expect(close(r.FT, 4000 * (0.004 / 0.3))).toBe(true);
    expect(close(Math.cos(r.thetaMax), 0.29 / 0.3)).toBe(true);
  });
});

describe('dinamica longitudinale (pp. 89–92, 100–101)', () => {
  const p = { M: 1200, l1: 1.1, l2: 1.5, h: 0.55, f: 0.9 };
  const v = veicolo(p), L = p.l1 + p.l2;
  it('normali: somma Mg e momenti rispetto a B nulli', () => {
    for (const a of [-5, 0, 2.5]) {
      const N = v.normali(a);
      expect(close(N.NA + N.NB, p.M * g)).toBe(true);
      expect(close(-N.NA * L + p.M * g * p.l2 - p.M * a * p.h, 0, 1e-9, 1e-6)).toBe(true);
    }
  });
  it('trazione anteriore: M a = f N_A(a) con a = f g l₂/(L + f h) (p. 90)', () => {
    expect(close(p.M * v.aMaxAnt, p.f * v.normali(v.aMaxAnt).NA)).toBe(true);
    expect(close(v.aMaxAnt, (p.f * g * p.l2) / (L + p.f * p.h))).toBe(true);
  });
  it('trazione posteriore: M a = f N_B(a) con l₁ al numeratore; la riga di p. 91 non torna (NF-16)', () => {
    expect(close(p.M * v.aMaxPost, p.f * v.normali(v.aMaxPost).NB)).toBe(true);
    expect(close(p.M * v.aMaxPostDispensa, p.f * v.normali(v.aMaxPostDispensa).NB)).toBe(false);
  });
  it('dragster: N_A = 0 per a = g l₂/h; oltre f = l₂/h si impenna', () => {
    expect(close(v.normali(v.aDragster).NA, 0, 1e-9, 1e-6)).toBe(true);
    const w = veicolo({ ...p, f: (p.l2 / p.h) * 1.1 });
    expect(w.impennata).toBe(true);
    expect(close(w.aMaxPost, w.aDragster)).toBe(true);
    const lim = veicolo({ ...p, f: p.l2 / p.h });
    expect(close(lim.aMaxPostFormula, lim.aDragster)).toBe(true);
  });
  it('frenata: a = f g su quattro ruote, ripartizione ideale = N_A/N_B; solo anteriore = f g l₂/(L − f h)', () => {
    expect(close(v.decMax, p.f * g)).toBe(true);
    const N = v.normali(-v.decMax);
    expect(close(v.ripartizioneIdeale, N.NA / N.NB)).toBe(true);
    expect(close(p.M * v.decSoloAnt, p.f * v.normali(-v.decSoloAnt).NA)).toBe(true);
    expect(close(p.M * v.decSoloPost, p.f * v.normali(-v.decSoloPost).NB)).toBe(true);
  });
  it('a pari ripartizione la posteriore accelera di più; con 60 % davanti, h = 0,2 L, f = 1 sono uguali', () => {
    const s = veicolo({ M: 1000, l1: 1.3, l2: 1.3, h: 0.5, f: 0.9 });
    expect(s.aMaxPost > s.aMaxAnt).toBe(true);
    const q = veicolo({ M: 1000, l1: 1, l2: 1.5, h: 0.5, f: 1 });
    expect(close(q.aMaxPost, q.aMaxAnt)).toBe(true);
    expect(close(q.aMaxAnt, 0.5 * g)).toBe(true);
  });
});

describe('curva (pp. 93–96, 102)', () => {
  const p = { M: 1000, R: 60, c: 1.5, h: 0.6, f: 0.9 };
  it('F_ND + F_NS = Mg; F_ND(v_rib) = 0; v_rib = √(Rcg/2h); v_slip = √(f g R)', () => {
    const r = curva({ ...p, v: 15 });
    expect(close(r.FND + r.FNS, p.M * g)).toBe(true);
    expect(close(r.FND * p.c + r.Fc * p.h - (p.M * g * p.c) / 2, 0, 1e-9, 1e-6)).toBe(true);
    expect(close(curva({ ...p, v: r.vRib }).FND, 0, 1e-9, 1e-6)).toBe(true);
    expect(close(r.vSlip, Math.sqrt(p.f * g * p.R))).toBe(true);
  });
  it('moto: alla velocità limite la piega è φ_ad', () => {
    const r = curva({ ...p, v: Math.sqrt(p.f * g * p.R) });
    expect(close(r.alphaMoto, Math.atan(p.f))).toBe(true);
  });
  it('ribalta prima se c/(2h) < f_ad', () => {
    expect(curva({ ...p, h: 1.5, v: 1 }).primo).toBe('ribaltamento');
    expect(curva({ ...p, h: 0.5, v: 1 }).primo).toBe('slittamento');
  });
});

describe('cuscinetto (pp. 98–99)', () => {
  it('V_G = (V_E + V_I)/2, V_E = V_G + ω_v r, V_I = V_G − ω_v r, ω_g = (ω_eR_e + ω_iR_i)/(R_e + R_i)', () => {
    const k = cuscinettoCinematica({ omegaI: 30, omegaE: -7, Ri: 0.02, Re: 0.032 });
    expect(close(k.VE, k.VG + k.omegaV * k.r)).toBe(true);
    expect(close(k.VI, k.VG - k.omegaV * k.r)).toBe(true);
    expect(close(k.omegaG, (-7 * 0.032 + 30 * 0.02) / (0.032 + 0.02))).toBe(true);
    expect(close(k.omegaV, (-7 * 0.032 - 30 * 0.02) / (0.032 - 0.02))).toBe(true);
  });
  it('anello esterno fermo: ω_g/ω_i = R_i/(R_e + R_i) < 1/2, elemento in verso opposto', () => {
    const k = cuscinettoCinematica({ omegaI: 10, omegaE: 0, Ri: 0.02, Re: 0.03 });
    expect(close(k.omegaG / 10, 0.4)).toBe(true);
    expect(k.omegaV < 0).toBe(true);
  });
  it('carico: Σ P_i cos iγ = Q; z = 16 → P₀ = Q/4; per z grande P₀ → 4Q/z', () => {
    const c16 = cuscinettoCarico({ Q: 1, z: 16 });
    expect(close(c16.P.reduce((s, P, j) => s + P * Math.cos(c16.idx[j] * c16.gamma), 0), 1)).toBe(true);
    expect(close(c16.P0, 0.25)).toBe(true);
    const c = cuscinettoCarico({ Q: 1, z: 400 });
    expect(Math.abs(c.P0 / c.P0approx - 1) < 0.01).toBe(true);
    expect(Math.abs(c.sommaP / (c.P0 * (400 / Math.PI)) - 1) < 0.01).toBe(true);
  });
  it('momento d\'attrito M_f ≃ (5/π) Q R_g f_v', () => {
    expect(close(momentoCuscinetto(1000, 0.03, 0.001), (5 / Math.PI) * 1000 * 0.03 * 0.001)).toBe(true);
  });
});
