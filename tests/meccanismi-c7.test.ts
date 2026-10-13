/** I numeri delle animazioni C7 coincidono con le formule della dispensa (pp. 209–223) e con i suoi grafici. */
import { describe, expect, it } from 'vitest';
import {
  amplificazione, aMax, caso, decrementoLog, eccentrica, eccentricaStato, fase, faseVincolo, fmMaxIsolamento, forzaTrasmessa,
  forzataTotale, inviluppo, libera, motoRelativo, omegaD, omegaM, qualityFactor, radici, regime, rhoPicco, rhoPiccoRelativo,
  rhoPiccoTrasm, trasmissibilita, xiDaDelta, xiDi, zonaTrasm,
} from '../src/engine/c7';
import { close } from '../src/engine/num';

/** residuo di ẍ + 2ξω_m ẋ + ω_m² x con differenze finite centrate */
function residuoLibero(xi: number, wm: number, x0: number, v0: number, t: number) {
  const h = 1e-4, f = (s: number) => libera(xi, wm, x0, v0, s);
  const xd = (f(t + h) - f(t - h)) / (2 * h), xdd = (f(t + h) - 2 * f(t) + f(t - h)) / (h * h);
  return xdd + 2 * xi * wm * xd + wm * wm * f(t);
}
const argmax = (f: (x: number) => number, a: number, b: number, n = 200000) => {
  let best = a, bv = -Infinity;
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n, v = f(x);
    if (v > bv) [best, bv] = [x, v];
  }
  return { x: best, v: bv };
};

describe('vibrazioni libere (pp. 209–213)', () => {
  const wm = 7;
  it('ω_m = √(K/m), ξ = c/(2mω_m)', () => {
    expect(close(omegaM(2, 98), 7)).toBe(true);
    expect(close(xiDi(2, 2.8, 98), 0.1)).toBe(true);
  });
  it('la risposta libera risolve l\'equazione in tutti i casi e rispetta le condizioni iniziali', () => {
    for (const xi of [0, 0.05, 0.4, 0.95, 1, 1.5, 3])
      for (const t of [0.05, 0.3, 1.1]) {
        expect(Math.abs(residuoLibero(xi, wm, 0.02, 0.3, t))).toBeLessThan(1e-3);
      }
    for (const xi of [0, 0.3, 1, 2]) {
      expect(close(libera(xi, wm, 0.02, 0.3, 0), 0.02)).toBe(true);
      const h = 1e-6;
      expect(Math.abs((libera(xi, wm, 0.02, 0.3, h) - libera(xi, wm, 0.02, 0.3, -h)) / (2 * h) - 0.3)).toBeLessThan(1e-6);
    }
  });
  it('ξ = 0 e ẋ(0) = 0: x = x₀ cos ω_m t (p. 210)', () => {
    expect(close(libera(0, wm, 0.02, 0, 0.37), 0.02 * Math.cos(wm * 0.37))).toBe(true);
  });
  it('caso critico continuo con i vicini: (A₁ + A₂t)e^{−ω_m t}, non (A₁ + A₂)e^{−ω_m t} (NF-32)', () => {
    const t = 0.4;
    expect(Math.abs(libera(1 - 1e-4, wm, 1, 0, t) - libera(1, wm, 1, 0, t))).toBeLessThan(1e-3);
    expect(Math.abs(libera(1 + 1e-4, wm, 1, 0, t) - libera(1, wm, 1, 0, t))).toBeLessThan(1e-3);
    expect(close(libera(1, wm, 1, 0, t), (1 + wm * t) * Math.exp(-wm * t))).toBe(true);
    expect(caso(1)).toBe('critico');
  });
  it('radici ω_m(−ξ ± √(ξ²−1)) annullano λ² + 2ξω_mλ + ω_m² (NF-31)', () => {
    for (const xi of [0.2, 0.8, 1.6]) {
      const r = radici(xi, wm), a = r.re1, b = r.im1;
      // parte reale e immaginaria di p(a + ib)
      expect(Math.abs(a * a - b * b + 2 * xi * wm * a + wm * wm)).toBeLessThan(1e-9);
      expect(Math.abs(2 * a * b + 2 * xi * wm * b)).toBeLessThan(1e-9);
    }
    expect(close(radici(0.3, wm).im1, omegaD(0.3, wm))).toBe(true);
  });
  it('decremento logaritmico: x(t)/x(t+T_d) = e^δ e formula inversa (p. 212)', () => {
    const xi = 0.04, Td = (2 * Math.PI) / omegaD(xi, wm), t = 0.13;
    expect(close(libera(xi, wm, 1, 0, t) / libera(xi, wm, 1, 0, t + Td), Math.exp(decrementoLog(xi)), 1e-8)).toBe(true);
    expect(close(xiDaDelta(decrementoLog(0.37)), 0.37)).toBe(true);
    expect(close(inviluppo(xi, wm, 1, 0, t) / inviluppo(xi, wm, 1, 0, t + Td), Math.exp(decrementoLog(xi)))).toBe(true);
  });
  it('sovrasmorzato: oltre il critico il ritorno rallenta (NF-244)', () => {
    expect(Math.abs(radici(3, wm).re1)).toBeLessThan(wm);
    expect(Math.abs(radici(3, wm).re1)).toBeLessThan(Math.abs(radici(1.5, wm).re1));
  });
});

describe('vibrazioni forzate (pp. 214–218)', () => {
  it('la risposta a regime risolve m ẍ + c ẋ + K x = F₀ sin ωt', () => {
    const m = 3, K = 1200, c = 15, F0 = 40, w = 17, t = 0.29, r = regime({ m, c, K, F0, omega: w });
    const x = r.X0 * Math.sin(w * t - r.phi), xd = r.X0 * w * Math.cos(w * t - r.phi), xdd = -w * w * x;
    expect(close(m * xdd + c * xd + K * x, F0 * Math.sin(w * t))).toBe(true);
    const wm = omegaM(m, K), xi = xiDi(m, c, K);
    expect(close(r.X0 / (F0 / K), amplificazione(w / wm, xi))).toBe(true);
    expect(close(r.phi, fase(w / wm, xi))).toBe(true);
  });
  it('picco a ρ_R = √(1−2ξ²) con A_max = 1/(2ξ√(1−ξ²)); valori del grafico di p. 215', () => {
    for (const xi of [0.1, 0.3, 0.5]) {
      const s = argmax((r) => amplificazione(r, xi), 0.01, 3);
      expect(Math.abs(s.x - rhoPicco(xi)!)).toBeLessThan(1e-4);
      expect(close(s.v, aMax(xi), 1e-8)).toBe(true);
    }
    expect(aMax(0.1)).toBeCloseTo(5.03, 2);
    expect(aMax(0.3)).toBeCloseTo(1.75, 2);
    expect(aMax(0.5)).toBeCloseTo(1.15, 2);
    expect(rhoPicco(0.8)).toBeNull();
    expect(amplificazione(0, 0.3)).toBe(1);
  });
  it('fase: π/2 a ρ = 1 per ogni ξ, in [0, π], 0 / π per ξ = 0 (p. 216)', () => {
    for (const xi of [0.01, 0.3, 0.9]) expect(close(fase(1, xi), Math.PI / 2)).toBe(true);
    for (let r = 0.05; r < 4; r += 0.05) {
      const p = fase(r, 0.2);
      expect(p >= 0 && p <= Math.PI).toBe(true);
    }
    expect(fase(0.5, 0)).toBe(0);
    expect(close(fase(2, 0), Math.PI)).toBe(true);
  });
  it('Q = 1/(2ξ) = A(1)', () => {
    expect(close(qualityFactor(0.05), amplificazione(1, 0.05))).toBe(true);
  });
  it('risposta completa da fermo: x(0) = 0, ẋ(0) = 0, poi il regime', () => {
    const rho = 0.7, xi = 0.2, wm = 2.5, h = 1e-6;
    expect(Math.abs(forzataTotale(rho, xi, wm, 0))).toBeLessThan(1e-12);
    expect(Math.abs((forzataTotale(rho, xi, wm, h) - forzataTotale(rho, xi, wm, -h)) / (2 * h))).toBeLessThan(1e-6);
    const t = 40;
    expect(Math.abs(forzataTotale(rho, xi, wm, t) - forzataTotale(rho, xi, wm, t, false))).toBeLessThan(1e-4);
  });
});

describe('eccitazione di vincolo e trasmissibilità (pp. 219–222)', () => {
  it('T_R(√2) = 1 per ogni ξ; T_R(1) del grafico di p. 220', () => {
    for (const xi of [0, 0.1, 0.5, 1, 3]) expect(close(trasmissibilita(Math.SQRT2, xi), 1, 1e-12)).toBe(true);
    expect(trasmissibilita(1, 0.1)).toBeCloseTo(5.1, 1);
    expect(trasmissibilita(1, 0.2)).toBeCloseTo(2.69, 2);
    expect(trasmissibilita(1, 0.3)).toBeCloseTo(1.94, 2);
    expect(trasmissibilita(1, 1)).toBeCloseTo(1.12, 2);
  });
  it('zone corrette (NF-33): amplificazione sotto √2, isolamento sopra, dove ξ maggiore peggiora', () => {
    for (const xi of [0.05, 0.3, 1]) {
      expect(trasmissibilita(1.2, xi)).toBeGreaterThan(1);
      expect(trasmissibilita(1.6, xi)).toBeLessThan(1);
    }
    expect(trasmissibilita(2, 0.1)).toBeCloseTo(0.356, 3);
    expect(trasmissibilita(2, 0.5)).toBeCloseTo(0.62, 2);
    expect(zonaTrasm(1.3)).toBe('amplificazione');
    expect(zonaTrasm(1.5)).toBe('isolamento');
  });
  it('picco della trasmissibilità a √(√(1+8ξ²)−1)/(2ξ) e del moto relativo a 1/√(1−2ξ²) (NF-248)', () => {
    const xi = 0.2;
    expect(Math.abs(argmax((r) => trasmissibilita(r, xi), 0.01, 3).x - rhoPiccoTrasm(xi))).toBeLessThan(1e-4);
    const mr = argmax((r) => motoRelativo(r, xi), 0.01, 5);
    expect(Math.abs(mr.x - rhoPiccoRelativo(xi)!)).toBeLessThan(1e-4);
    expect(close(mr.v, aMax(xi), 1e-8)).toBe(true);
  });
  it('fase iniziale α_x = arctg 2ξρ − φ < 0 per ogni ρ (p. 221)', () => {
    for (const xi of [0.05, 0.4, 1]) for (let r = 0.02; r < 8; r += 0.02) expect(faseVincolo(r, xi)).toBeLessThan(0);
  });
  it('forza trasmessa: ampiezza = T_R · F₀ (p. 222)', () => {
    const rho = 1.7, xi = 0.25, wm = 3;
    let mx = 0;
    for (let i = 0; i < 20000; i++) mx = Math.max(mx, Math.abs(forzaTrasmessa(rho, xi, wm, (i / 20000) * ((2 * Math.PI) / (rho * wm)))));
    expect(Math.abs(mx - trasmissibilita(rho, xi))).toBeLessThan(1e-6);
  });
  it('pressa da 120 colpi/min: f_m < 1,41 Hz (p. 222)', () => {
    expect(fmMaxIsolamento(2)).toBeCloseTo(1.414, 3);
  });
});

describe('massa eccentrica rotante (p. 223)', () => {
  it('M|X_O|/(M_R R) = ρ²A, → 1 per ρ → ∞', () => {
    expect(close(eccentrica(0.8, 0.2), 0.64 * amplificazione(0.8, 0.2))).toBe(true);
    expect(eccentrica(100, 0.2)).toBeCloseTo(1, 3);
  });
  it('baricentro globale: x_GLO = x_O + (M_R/M) R cos ωt e autocentramento', () => {
    const p = { rho: 0.6, xi: 0.1, mr: 0.2, R: 0.05, wm: 4, t: 0.7 };
    const s = eccentricaStato(p);
    expect(close(s.xGLO, s.xO + p.mr * p.R * Math.cos(s.theta))).toBe(true);
    expect(close(s.xP, s.xO + p.R * Math.cos(s.theta))).toBe(true);
    const alta = eccentricaStato({ ...p, rho: 2000 }); // |x_GLO| ≈ (M_R R/M)·2ξ/ρ
    expect(alta.ampGLO).toBeLessThan(1e-3 * p.mr * p.R);
    expect(eccentricaStato({ ...p, rho: 0.05 }).ampGLO).toBeCloseTo(p.mr * p.R, 4);
  });
  it('la risposta dello statore risolve M ẍ + c ẋ + K x = M_R ω² R cos ωt', () => {
    const M = 20, MR = 2, R = 0.04, K = 8000, xi = 0.15, wm = Math.sqrt(K / M), c = 2 * xi * M * wm, rho = 1.3, w = rho * wm, t = 0.21;
    const s = eccentricaStato({ rho, xi, mr: MR / M, R, wm, t });
    const xd = -s.XO * w * Math.sin(w * t - s.phi), xdd = -w * w * s.xO;
    expect(close(M * xdd + c * xd + K * s.xO, MR * w * w * R * Math.cos(w * t))).toBe(true);
  });
});
