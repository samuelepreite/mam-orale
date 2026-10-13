/** I numeri delle animazioni C4 coincidono con le formule della dispensa (pp. 132–153). */
import { describe, expect, it } from 'vitest';
import { arcoAvvolto, avvolgimento, coppiaDaAttrito, frenoNastro, integraEulero, massimoAureo, potenzaCinghia, tensioneArco, trasmissioneReale } from '../src/engine/c4';
import { close } from '../src/engine/num';

describe('freno a nastro', () => {
  const p = { F: 100, a: 0.5, c: 0.1, R: 0.15, f: 0.3, beta: 1.5 * Math.PI };
  it('verso orario: C_f = (aR/c) F (e^{fβ} − 1)', () => {
    expect(close(frenoNastro({ ...p, verso: 'orario' }).Cf, ((p.a * p.R) / p.c) * p.F * (Math.exp(p.f * p.beta) - 1))).toBe(true);
  });
  it('rapporto fra i due versi = e^{fβ} (NF-21)', () => {
    const o = frenoNastro({ ...p, verso: 'orario' }), a = frenoNastro({ ...p, verso: 'antiorario' });
    expect(close(o.Cf / a.Cf, Math.exp(p.f * p.beta))).toBe(true);
  });
});

// ------------------------------------------------------------------ arco avvolto, rapporto, potenza (pp. 132–152)
describe('tensione lungo l\'arco (pp. 141–144)', () => {
  const p = { T2: 100, rhoV2: 20, f: 0.3, beta: Math.PI, R: 0.1 };
  const s = arcoAvvolto({ ...p, C: 6 });
  it('T₁ = T₂ + C/R e θ* = (1/f) ln[(T₁ − ρV²)/(T₂ − ρV²)]', () => {
    expect(close(s.T1, 160)).toBe(true);
    expect(close(s.thetaS, Math.log((160 - 20) / (100 - 20)) / 0.3)).toBe(true);
    expect(close(s.alfa, Math.PI - s.thetaS)).toBe(true);
  });
  it('la legge a tratti: esponenziale fino a θ*, poi costante T₁', () => {
    expect(close(s.T(s.thetaS), s.T1)).toBe(true);
    expect(close(s.T(Math.PI), s.T1)).toBe(true);
    expect(close(s.T(0.5 * s.thetaS), tensioneArco(100, 20, 0.3, 0.5 * s.thetaS))).toBe(true);
  });
  it('integrazione numerica (RK4) di dT/dθ = f(T − ρV²) = equazione di Eulero', () => {
    expect(close(integraEulero(100, 20, 0.3, 2), 20 + 80 * Math.exp(0.6), 1e-10)).toBe(true);
  });
  it('R ∫ f dF_N sull\'arco di scorrimento = coppia trasmessa', () => {
    expect(close(coppiaDaAttrito(s, p.f, p.R), 6, 1e-9)).toBe(true);
  });
  it('C_MAX = (T₂ − ρV²)(e^{fβ} − 1)R; oltre: slittamento con θ* = β', () => {
    expect(close(s.Cmax, 80 * (Math.exp(0.3 * Math.PI) - 1) * 0.1)).toBe(true);
    const o = arcoAvvolto({ ...p, C: s.Cmax * 1.1 });
    expect(o.slitta).toBe(true);
    expect(close(o.thetaS, Math.PI)).toBe(true);
  });
  it('la centrifuga riduce C_MAX', () => {
    expect(arcoAvvolto({ ...p, rhoV2: 40, C: 0 }).Cmax).toBeLessThan(arcoAvvolto({ ...p, rhoV2: 0, C: 0 }).Cmax);
  });
});

describe('rapporto reale e rendimento (pp. 135–139)', () => {
  const p = { R1: 0.08, R2: 0.16, EA: 5000, T2: 150, C1: 15, omega1: 150 };
  const r = trasmissioneReale(p);
  it('τ = (R₁/R₂)(1 + T₂/EA)/(1 + T₁/EA) e η = τ/τ^ID = V₂/V₁', () => {
    expect(close(r.tau, (0.5 * (1 + 150 / 5000)) / (1 + r.T1 / 5000))).toBe(true);
    expect(close(r.eta, r.tau / r.tauId)).toBe(true);
    expect(close(r.eta, r.V2 / r.V1)).toBe(true);
  });
  it('potenza persa = (T₁ − T₂)(V₁ − V₂) = (1 − η)C₁ω₁', () => {
    expect(close(-r.Wdiss, (r.T1 - p.T2) * (r.V1 - r.V2))).toBe(true);
    expect(close(-r.Wdiss, (1 - r.eta) * p.C1 * p.omega1)).toBe(true);
  });
  it('coppia nulla: τ = τ^ID', () => {
    const o = trasmissioneReale({ ...p, C1: 0 });
    expect(close(o.tau, o.tauId)).toBe(true);
  });
});

describe('geometria dell\'avvolgimento (d137)', () => {
  it('aperta: β = π ∓ 2γ, sin γ = (R₂ − R₁)/a; incrociata: π + 2γ\'', () => {
    const o = avvolgimento({ R1: 0.1, R2: 0.25, a: 0.8, tipo: 'aperta' });
    expect(close(o.beta1, Math.PI - 2 * Math.asin(0.15 / 0.8))).toBe(true);
    expect(close(o.beta1 + o.beta2, 2 * Math.PI)).toBe(true);
    expect(close(o.L, Math.sqrt(0.64 - 0.0225))).toBe(true);
    const x = avvolgimento({ R1: 0.1, R2: 0.25, a: 0.8, tipo: 'incrociata' });
    expect(close(x.beta1, Math.PI + 2 * Math.asin(0.35 / 0.8))).toBe(true);
    expect(close(x.beta2, x.beta1)).toBe(true);
  });
});

describe('potenza e velocità ottima (p. 152; variante NF-22)', () => {
  const p = { T: 300, rho: 0.3, f: 0.3, beta: Math.PI };
  it('W = (e^{fβ} − 1)(T₂ − ρV²)V', () => {
    const o = potenzaCinghia({ ...p, modello: 'dispensa', V: 12 });
    expect(close(o.W, (Math.exp(0.3 * Math.PI) - 1) * (300 - 0.3 * 144) * 12)).toBe(true);
  });
  it('il massimo numerico è in V* = √(T₂/3ρ), con W^MAX = ⅔ k T₂ V*', () => {
    const W = (V: number) => potenzaCinghia({ ...p, modello: 'dispensa', V }).W;
    const o = potenzaCinghia({ ...p, modello: 'dispensa', V: 1 });
    const vs = massimoAureo(W, 0, o.Vzero);
    expect(close(vs, o.Vopt, 1e-6)).toBe(true);
    expect(close(W(vs), o.Wmax, 1e-9)).toBe(true);
    expect(close(W(o.Vzero), 0, 1e-9, 1e-6)).toBe(true);
  });
  it('all\'ottimo della dispensa T₁ = T₂(1 + 2e^{fβ})/3, quindi ρV*² ≠ T₁/3', () => {
    const o = potenzaCinghia({ ...p, modello: 'dispensa', V: Math.sqrt(300 / 0.9) });
    expect(close(o.T1, (300 / 3) * (1 + 2 * Math.exp(0.3 * Math.PI)))).toBe(true);
    expect(close(o.rhoV2, 100)).toBe(true);
  });
  it('variante T₁ = T_max: ρV*² = T_max/3', () => {
    const W = (V: number) => potenzaCinghia({ ...p, modello: 'variante', V }).W;
    const vs = massimoAureo(W, 0, Math.sqrt(300 / 0.3));
    expect(close(0.3 * vs * vs, 100, 1e-6)).toBe(true);
  });
});
