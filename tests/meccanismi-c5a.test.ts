/** I numeri delle animazioni C5a coincidono con le formule della dispensa (pp. 158–173). */
import { describe, expect, it } from 'vitest';
import {
  contattoConAttrito, contatti, evolvente, ingranaggio, interasseVariato, interoMinimo, puntoRetta, rotRuota2, rotismoOrdinario,
  semiDente, zMin, zMinComeDispensa, zMinDentiera,
} from '../src/engine/c5a';
import { close } from '../src/engine/num';

const DEG = Math.PI / 180;
const th20 = 20 * DEG;

describe('evolvente (pp. 158, 161)', () => {
  for (const g of [0.2, 0.7, 1.5, 2.3]) {
    const e = evolvente(0.05, g);
    it(`γ = ${g}: PQ = arco HQ, PQ normale alla curva, angolo polare ϑ = γ − atg γ`, () => {
      expect(close(e.PQ, e.arcoHQ)).toBe(true);
      expect(Math.abs(e.cosTgPQ)).toBeLessThan(1e-12);
      expect(close(Math.atan2(e.P[1], e.P[0]), e.vartheta)).toBe(true);
      expect(close(e.r, 0.05 * Math.sqrt(1 + g * g))).toBe(true);
    });
  }
});

describe('ingranaggio a denti dritti (pp. 166–168)', () => {
  it('AB coincide con la formula di p. 166 e z_p = AB/(p cos θ)', () => {
    for (const [z1, z2, m, td] of [[30, 18, 2, 20], [60, 17, 3, 14.5], [20, 20, 1, 25]]) {
      const th = td * DEG, g = ingranaggio({ z1, z2, m, theta: th });
      const AB = (m / 2) * (z1 * Math.sqrt((1 + 2 / z1) ** 2 - Math.cos(th) ** 2) + z2 * Math.sqrt((1 + 2 / z2) ** 2 - Math.cos(th) ** 2) - (z1 + z2) * Math.sin(th));
      expect(close(g.AB, AB)).toBe(true);
      expect(close(g.zp, AB / (Math.PI * m * Math.cos(th)))).toBe(true);
      expect(close(g.ell, AB / Math.cos(th))).toBe(true);
      expect(close(g.tau, -z1 / z2)).toBe(true);
    }
  });
  it('A e B sono davvero sulle teste (intersezione retta–circonferenza)', () => {
    const g = ingranaggio({ z1: 41, z2: 23, m: 2.5, theta: th20 });
    const A = puntoRetta(g.R1, th20, g.AC), B = puntoRetta(g.R1, th20, -g.BC);
    expect(close(Math.hypot(A[0], A[1]), g.Rt1)).toBe(true);
    expect(close(Math.hypot(B[0] - g.i, B[1]), g.Rt2)).toBe(true);
  });
  it('l\'interferenza compare esattamente sotto il numero minimo di denti (|τ| = 2, θ = 20°)', () => {
    const zm = zMin(2, th20);
    expect(ingranaggio({ z1: 2 * zm * 0.999, z2: zm * 0.999, m: 1, theta: th20 }).interfA).toBe(true);
    expect(ingranaggio({ z1: 2 * zm * 1.001, z2: zm * 1.001, m: 1, theta: th20 }).interfA).toBe(false);
    expect(ingranaggio({ z1: 28, z2: 14, m: 1, theta: th20 }).interfA).toBe(true);
    expect(ingranaggio({ z1: 30, z2: 15, m: 1, theta: th20 }).interfA).toBe(false);
  });
});

describe('contatti sulla retta di pressione', () => {
  const z1 = 31, z2 = 19, m = 2, g = ingranaggio({ z1, z2, m, theta: th20 });
  it('distano il passo di base p cos θ', () => {
    const s = contatti(g, 0.37);
    for (let j = 1; j < s.length; j++) expect(close(s[j] - s[j - 1], g.pb)).toBe(true);
  });
  it('in media le coppie in presa sono z_p (p. 166)', () => {
    const N = 20000, T = (2 * Math.PI) / z1;
    let somma = 0;
    for (let j = 0; j < N; j++) somma += contatti(g, ((j + 0.5) / N) * T).length;
    expect(Math.abs(somma / N - g.zp)).toBeLessThan(1e-3);
  });
  it('ogni contatto sta sul fianco a evolvente di entrambe le ruote', () => {
    for (const phi1 of [0, 0.11, 0.53]) {
      for (const s of contatti(g, phi1)) {
        const P = puntoRetta(g.R1, th20, s);
        const r1 = Math.hypot(P[0], P[1]);
        // dente della 1 il cui fianco anteriore passa per P: angolo polare = centro + β(r)
        const k1 = Math.round((Math.atan2(P[1], P[0]) - semiDente(z1, th20, g.Rf1, r1) - phi1) / ((2 * Math.PI) / z1));
        const c1 = phi1 + (2 * Math.PI * k1) / z1;
        expect(Math.abs(Math.atan2(P[1], P[0]) - (c1 + semiDente(z1, th20, g.Rf1, r1)))).toBeLessThan(1e-9);
        const P2: [number, number] = [P[0] - g.i, P[1]], r2 = Math.hypot(P2[0], P2[1]);
        let a2 = Math.atan2(P2[1], P2[0]);
        const base2 = rotRuota2(z1, z2, phi1);
        const k2 = Math.round((a2 - semiDente(z2, th20, g.Rf2, r2) - base2) / ((2 * Math.PI) / z2));
        a2 -= base2 + (2 * Math.PI * k2) / z2 + semiDente(z2, th20, g.Rf2, r2);
        expect(Math.abs(Math.atan2(Math.sin(a2), Math.cos(a2)))).toBeLessThan(1e-9);
      }
    }
  });
  it('spessore del dente sulla primitiva = p/2', () => {
    expect(close(2 * semiDente(z1, th20, g.Rf1, g.R1) * g.R1, g.passo / 2)).toBe(true);
  });
});

describe('interasse variato (p. 162)', () => {
  it('τ = −R_f1/R_f2 non cambia; cos θ\' = (R_f1 + R_f2)/i\'', () => {
    const a = interasseVariato({ Rf1: 0.06, Rf2: 0.025, i: 0.0905 }), b = interasseVariato({ Rf1: 0.06, Rf2: 0.025, i: 0.095 });
    expect(close(a.tau, b.tau)).toBe(true);
    expect(close(b.tau, -0.06 / 0.025)).toBe(true);
    expect(close(Math.cos(b.theta), 0.085 / 0.095)).toBe(true);
    expect(b.theta).toBeGreaterThan(a.theta);
  });
});

describe('numero minimo di denti (pp. 167–168, NF-23)', () => {
  it('|τ| = 2, θ = 20°: 14,16 → 15; dentiera 17,10 → 18', () => {
    expect(Math.abs(zMin(2, th20) - 14.1608)).toBeLessThan(1e-4);
    expect(interoMinimo(zMin(2, th20))).toBe(15);
    expect(Math.abs(zMinDentiera(th20) - 17.097)).toBeLessThan(1e-3);
    expect(interoMinimo(zMinDentiera(th20))).toBe(18);
  });
  it('i numeri di p. 168 (5,13 e 5,84) vengono da sin θ al posto di sin²θ', () => {
    expect(Math.abs(zMinComeDispensa(2, th20) - 5.13)).toBeLessThan(0.01);
    expect(Math.abs(2 / Math.sin(th20) - 5.84)).toBeLessThan(0.01);
  });
  it('f cresce con |τ| e tende a 2/sin²θ (NF-183)', () => {
    let prec = 0;
    for (const t of [1, 2, 5, 20, 100]) { const z = zMin(t, th20); expect(z).toBeGreaterThan(prec); expect(z).toBeLessThan(zMinDentiera(th20)); prec = z; }
    expect(Math.abs(zMin(1e6, th20) - zMinDentiera(th20))).toBeLessThan(1e-3);
  });
});

describe('forze con attrito e rendimento istantaneo (pp. 169–170)', () => {
  const R1 = 0.12, R2 = 0.05, f = 0.08, C1 = 80, w1 = 30, t = Math.tan(th20), c = Math.cos(th20), sn = Math.sin(th20);
  const base = { R1, R2, theta: th20, f, C1, w1 };
  for (const x of [0.002, 0.008, 0.015]) {
    it(`x = ${x}: F_N, C₂, η_A ed η_R della dispensa; |W| = f F_N (|ω₁| + |ω₂|) x`, () => {
      const A = contattoConAttrito({ ...base, s: -x }), R = contattoConAttrito({ ...base, s: x });
      expect(close(A.N, C1 / (R1 * c - f * (R1 * sn - x)))).toBe(true);
      expect(close(A.C2, A.N * (R2 * c - f * (R2 * sn + x)))).toBe(true);
      expect(close(A.eta, (1 - f * (t + x / (R2 * c))) / (1 - f * (t - x / (R1 * c))))).toBe(true);
      expect(close(R.eta, (1 + f * (t - x / (R2 * c))) / (1 + f * (t + x / (R1 * c))))).toBe(true);
      expect(close(R.N, C1 / (R1 * c + f * (R1 * sn + x)))).toBe(true);
      expect(close(A.vrel, (w1 + (w1 * R1) / R2) * x)).toBe(true);
      expect(close(-A.Wdiss, f * A.N * (w1 + (w1 * R1) / R2) * x)).toBe(true);
    });
  }
  it('in C il rendimento vale 1 e senza attrito vale 1 ovunque', () => {
    expect(close(contattoConAttrito({ ...base, s: 0 }).eta, 1)).toBe(true);
    expect(close(contattoConAttrito({ ...base, f: 0, s: 0.01 }).eta, 1)).toBe(true);
    expect(close(contattoConAttrito({ ...base, f: 0, s: 0.01 }).N, C1 / (R1 * c))).toBe(true);
  });
});

describe('rotismi ordinari (pp. 171–173)', () => {
  it('τ = prodotto dei rapporti, C_u = −C₁/τ coincide con l\'equilibrio delle singole ruote', () => {
    const [z1, z2, z3, z4] = [17, 51, 13, 47], m = 2, Ri = [z1, z2, z3, z4].map((z) => (m * z) / 2);
    const r = rotismoOrdinario([{ zMotrice: z1, zCondotta: z2 }, { zMotrice: z3, zCondotta: z4 }], 12);
    expect(close(r.tau, (z1 * z3) / (z2 * z4))).toBe(true);
    // equilibrio (p. 172): C₁ − Q²¹R₁ = 0, Q¹²R₂ + Q⁴³R₃ = 0, C₄ − Q³⁴R₄ = 0
    const Q21 = 12 / Ri[0], Q12 = -Q21, Q43 = (-Q12 * Ri[1]) / Ri[2], Q34 = -Q43, C4 = Q34 * Ri[3];
    expect(close(r.Cout, C4)).toBe(true);
    expect(close(r.omegas[2], r.tau)).toBe(true);
    // T.F.V.: C₁ω₁ + C₄ω₄ = 0
    expect(Math.abs(12 * r.omegas[0] + r.Cout * r.omegas[2])).toBeLessThan(1e-12);
  });
  it('ruota oziosa: τ indipendente da z_b, segno positivo; ingranaggio interno positivo', () => {
    const a = rotismoOrdinario([{ zMotrice: 20, zCondotta: 33 }, { zMotrice: 33, zCondotta: 50 }]);
    const b = rotismoOrdinario([{ zMotrice: 20, zCondotta: 71 }, { zMotrice: 71, zCondotta: 50 }]);
    expect(close(a.tau, 0.4)).toBe(true);
    expect(close(a.tau, b.tau)).toBe(true);
    const i = rotismoOrdinario([{ zMotrice: 15, zCondotta: 30 }, { zMotrice: 20, zCondotta: 60, interno: true }], 5);
    expect(close(i.tau, -(15 * 20) / (30 * 60))).toBe(true);
    expect(close(i.Cout, 5 * ((30 / 15) * (60 / 20)))).toBe(true); // C₄ = C₁R₂R₄/(R₁R₃) (p. 173)
  });
});
