/** I numeri delle animazioni C5 parte b coincidono con le formule della dispensa (pp. 174–191) e con d093 (fonte esterna). */
import { describe, expect, it } from 'vitest';
import {
  avviamento, coniPrimitivi, contornoRuota, coppieEpi, curvaRendimentoEpi, dentiInPresa, differenziale, epicicloidale,
  faseDente, forzeConiche, forzeElicoidali, frac, lineeContatto, numeroSatelliti, portatreno, rendimentoCascata, rendimentoEpi,
  rotismoCombinato, sfasamentiEpi, willis, zFittizio, zMinElicoidale,
} from '../src/engine/c5b';
import { close, radOf, seeded, U } from '../src/engine/num';

describe('epicicloidale (p. 175)', () => {
  it('corona ferma, R₂ = R₁: Ω = ω₁/4, satellite −ω₁/2', () => {
    const r = epicicloidale({ z1: 20, z2: 20, fisso: 'corona', wIn: 8 });
    expect(close(r.tauW, -1 / 3)).toBe(true);
    expect(close(r.W, 2)).toBe(true);
    expect(close(r.w2, -4)).toBe(true);
  });
  it('solare fermo: Ω = 3ω₃/4, satellite 3ω₃/2', () => {
    const r = epicicloidale({ z1: 20, z2: 20, fisso: 'solare', wIn: 4 });
    expect(close(r.W, 3)).toBe(true);
    expect(close(r.w2, 6)).toBe(true);
  });
  it('Willis vale per ogni dentatura, profilo delle velocità lineare e CIR sul contatto fermo', () => {
    const rnd = seeded(7);
    for (let i = 0; i < 30; i++) {
      const z1 = Math.round(U(rnd, 12, 40)), z2 = Math.round(U(rnd, 10, 40));
      for (const fisso of ['corona', 'solare'] as const) {
        const r = epicicloidale({ z1, z2, fisso, wIn: U(rnd, 0.5, 3) });
        expect(close(willis(r.w1, r.w3, r.W), r.tauW)).toBe(true);
        expect(close(willis(r.w1, r.w2, r.W), -z1 / z2)).toBe(true);
        expect(close(r.vO2, (r.vC12 + r.vC23) / 2)).toBe(true);
        expect(close(r.cir, fisso === 'corona' ? r.R2 : -r.R2)).toBe(true);
        expect(close(portatreno(r.tauW, r.w1, r.w3), r.W)).toBe(true);
      }
    }
  });
  it('i denti restano in presa durante il moto (fasi costanti) per tutti i satelliti', () => {
    for (const [z1, z2] of [[18, 18], [15, 24], [21, 12], [13, 17]]) {
      const N = numeroSatelliti(z1, z2);
      expect((2 * (z1 + z2)) % N).toBe(0);
      const { z3, offP, offR, psi } = sfasamentiEpi(z1, z2, N);
      for (const fisso of ['corona', 'solare'] as const) {
        const r = epicicloidale({ z1, z2, fisso, wIn: 1 });
        for (const th of [0, 0.37, 1.9, 5.3, 11.7]) {
          const f1 = r.w1 * th, f2 = r.w2 * th, f3 = r.w3 * th, fc = r.W * th;
          for (let n = 0; n < N; n++) {
            const dir = psi(n) + fc;
            const est = frac(faseDente(dir, f1, 0, z1) + faseDente(dir + Math.PI, f2, offP[n], z2));
            const int = frac(faseDente(dir, f3, offR, z3) - faseDente(dir, f2, offP[n], z2));
            expect(Math.abs(est - 0.5) < 1e-6).toBe(true);
            expect(Math.abs(int - 0.5) < 1e-6).toBe(true);
          }
        }
      }
    }
  });
  it('contorno della ruota: 5 punti per dente', () => {
    expect(contornoRuota(17, 10, 1, 0).length).toBe(85);
  });
});

describe('coppie e rotismo combinato (pp. 179–180)', () => {
  it('C₁/C₂ = −τ_W, C₁ + C₂ + C_p = 0', () => {
    const c = coppieEpi(-1 / 3, 10);
    expect(close(c.C1 / c.C2, 1 / 3)).toBe(true);
    expect(close(c.C1 + c.C2 + c.Cp, 0)).toBe(true);
  });
  it('rapporto globale = prodotto dei blocchi, τ_W = z₁z₃/(z₂z₄)', () => {
    const z = { z1: 40, z2: 20, z3: 38, z4: 22, z5: 20, z6: 50, z7: 30, z8: 45 };
    const r = rotismoCombinato(z);
    expect(close(r.tauW, (40 * 38) / (20 * 22))).toBe(true);
    expect(close(r.tGlob, ((20 * 45) / (50 * 30)) * (r.tauW / (r.tauW - 1)))).toBe(true);
    expect(r.tauW > 1 && r.tEpi > 1).toBe(true);
  });
});

describe('differenziale (pp. 176–178)', () => {
  it('Ω = (ω₁ + ω₂)/2 = 2V_M/d e τ_w = −1 in curva', () => {
    const r = differenziale({ VM: 12, R: 9, p: 1.5, d: 0.6, zs: 16, zp: 10 });
    expect(close(r.W, (r.w1 + r.w2) / 2)).toBe(true);
    expect(close(r.W, (2 * 12) / 0.6)).toBe(true);
    expect(close(r.tauW, -1)).toBe(true);
    expect(close(r.w1, ((2 * 12) / 0.6) * (1 - 1.5 / 18))).toBe(true);
    expect(close(r.spin, (16 / 10) * ((2 * 12) / 0.6) * (1.5 / 18))).toBe(true);
  });
  it('in rettilineo i planetari non ruotano sul proprio asse', () => {
    const r = differenziale({ VM: 12, R: Infinity, p: 1.5, d: 0.6 });
    expect(r.w1).toBe(r.w2);
    expect(r.spin).toBe(0);
  });
});

describe('rendimenti (pp. 181–184; d093 fonte esterna)', () => {
  it('cascata: η_TOT = Π η (0,98³ = 0,941192)', () => {
    expect(close(rendimentoCascata([0.98, 0.98, 0.98]), 0.941192)).toBe(true);
  });
  it('condizione (*): quiete fra τη₂ e τ/η₁', () => {
    const p = { tau: 0.5, eta1: 0.9, eta2: 0.9 };
    expect(avviamento({ ...p, rC: 0.5 }).stato).toBe('quiete');
    expect(avviamento({ ...p, rC: 0.6 }).stato).toBe('1-movente');
    expect(avviamento({ ...p, rC: 0.4 }).stato).toBe('2-movente');
  });
  it('η_EPI coincide con le due formule e con il bilancio delle potenze', () => {
    const rnd = seeded(3);
    for (let i = 0; i < 40; i++) {
      const eo = U(rnd, 0.85, 0.99), tw = U(rnd, -3, 4);
      if (Math.abs(tw - 1) < 0.05) continue;
      const r = rendimentoEpi(tw, eo);
      const atteso = tw < 1 ? (tw - eo) / (tw - 1) : (eo * tw - 1) / (eo * (tw - 1));
      expect(close(r.eta, atteso)).toBe(true);
      // bilancio: perdita nel moto relativo = perdita vista da fermo (C₁ = ω₁ = 1)
      const W = r.r, Wd = tw < 1 ? -(1 - eo) * (1 - W) : ((1 - eo) / eo) * (1 - W);
      expect(close(-(1 - r.eta), Wd)).toBe(true);
    }
    expect(close(rendimentoEpi(-1 / 3, 0.98).eta, 0.985)).toBe(true);
    expect(curvaRendimentoEpi(0.98).every((p) => Number.isFinite(p.eta))).toBe(true);
  });
});

describe('elicoidali (pp. 185–189)', () => {
  it('numero medio di linee di contatto = δ_e/(P cos θ)', () => {
    const P = 8, th = radOf(20), be = radOf(14), delta = 1.6 * P * Math.cos(th), b = 25, pb = P * Math.cos(th);
    let somma = 0;
    const n = 4000;
    for (let i = 0; i < n; i++) somma += lineeContatto({ delta, b, beta: be, pb, s: ((i + 0.5) / n) * pb }).n;
    expect(Math.abs(somma / n - dentiInPresa(delta, b, be, P, th))).toBeLessThan(2e-3);
    expect(close(lineeContatto({ delta, b, beta: be, pb, s: 0 }).zPresa, dentiInPresa(delta, b, be, P, th))).toBe(true);
  });
  it('ruota fittizia e z_min', () => {
    expect(close(zFittizio(20, radOf(25)), 20 / Math.cos(radOf(25)) ** 3)).toBe(true);
    expect(Math.ceil(zMinElicoidale(17, radOf(30)))).toBe(12);
  });
  it('forze: A = Q tg α, R = Q tg θ, F² = Q² + R² + A²', () => {
    const f = forzeElicoidali({ C: 120, r: 0.08, theta: radOf(20), alpha: radOf(22) });
    expect(close(f.A, f.Q * Math.tan(radOf(22)))).toBe(true);
    expect(close(f.R, f.Q * Math.tan(radOf(20)))).toBe(true);
    expect(close(f.F ** 2, f.Q ** 2 + f.R ** 2 + f.A ** 2)).toBe(true);
  });
});

describe('coniche (pp. 190–191)', () => {
  it('sin φ₁/sin φ₂ = τ e φ₁ + φ₂ = ψ', () => {
    for (const [tau, psi] of [[0.5, 90], [2, 60], [1.3, 120]]) {
      const c = coniPrimitivi(tau, radOf(psi));
      expect(close(Math.sin(c.phi1) / Math.sin(c.phi2), tau)).toBe(true);
      expect(close(c.phi1 + c.phi2, radOf(psi))).toBe(true);
    }
  });
  it('forze: A = (C₁/r₁) tg θ sin φ₁, R = (C₁/r₁) tg θ cos φ₁', () => {
    const f = forzeConiche({ C1: 50, r1: 0.05, theta: radOf(20), phi1: radOf(30) });
    expect(close(f.A, 1000 * Math.tan(radOf(20)) * Math.sin(radOf(30)))).toBe(true);
    expect(close(f.R, 1000 * Math.tan(radOf(20)) * Math.cos(radOf(30)))).toBe(true);
  });
});
