/** I numeri delle animazioni C3 coincidono con le formule della dispensa (pp. 106–122) e con le deduzioni dichiarate. */
import { describe, expect, it } from 'vitest';
import {
  ceppiEsterni, consumoCeppo, consumoEstremi, discoSettore, frizioneCentrifuga, frizioneConica, frizionePiana, innesto,
  partitore, pattino, risultantiCeppo, simpson, simpson2,
} from '../src/engine/c3';
import { close } from '../src/engine/num';

describe('tamburo a ceppo (pp. 106–108)', () => {
  const p = { p0: 5e5, R: 0.15, B: 0.05, alpha: Math.PI / 2, f: 0.35 };
  const r = risultantiCeppo(p);
  it('|F_N| = 2 p₀ R B sin(α/2) = integrale delle normali lungo la bisettrice', () => {
    expect(close(r.FN, simpson((t) => p.p0 * p.R * p.B * Math.cos(t), -p.alpha / 2, p.alpha / 2), 1e-9)).toBe(true);
  });
  it('|F_T| = f|F_N| e |F_T|R = |F_f| ρ (cerchio d\'attrito)', () => {
    expect(close(r.FT, p.f * r.FN)).toBe(true);
    expect(close(r.FT * p.R, r.Ff * r.rho)).toBe(true);
  });
  it('momento esatto / |F_T|R = (α/2)/sin(α/2) ≈ 1,11 per α = 90° (NF-141)', () => {
    expect(close(r.Mf / r.MfD, r.fattore)).toBe(true);
    expect(Math.abs(r.fattore - 1.1107) < 1e-3).toBe(true);
  });
  it('consumo con C sotto O: δ̇ = δ̇(0) cos θ, estremi a cos(α/2) (p. 108)', () => {
    const c = consumoCeppo({ OC: 0.2, gamma: -Math.PI / 2, omegaAcc: 0.05 });
    for (const t of [-0.6, -0.2, 0, 0.3, 0.7]) expect(close(c.d(t), c.d(0) * Math.cos(t))).toBe(true);
    expect(close(consumoEstremi(Math.PI / 2), Math.SQRT1_2)).toBe(true);
    expect(close(c.thetaMax, 0, 1e-12, 1e-12)).toBe(true);
  });
  it('il massimo del consumo è dove OP ⊥ OC (d142)', () => {
    const c = consumoCeppo({ OC: 0.2, gamma: 0.4, omegaAcc: 0.05 });
    const eps = 1e-4;
    expect(c.d(c.thetaMax) >= c.d(c.thetaMax + eps) && c.d(c.thetaMax) >= c.d(c.thetaMax - eps)).toBe(true);
    expect(close(c.d(c.thetaMax), c.dMax)).toBe(true);
  });
});

describe('due ceppi esterni (p. 110)', () => {
  const g = { F: 300, h: 0.3, d: 0.12, R: 0.15, f: 0.35 };
  it('tamburo orario: destro Fh/(OO′/f + R), sinistro Fh/(OO′/f − R) (nomi: NF-18)', () => {
    const r = ceppiEsterni({ ...g, verso: 'orario' });
    expect(close(r.FTdx, (g.F * g.h) / (g.d / g.f + g.R))).toBe(true);
    expect(close(r.FTsx, (g.F * g.h) / (g.d / g.f - g.R))).toBe(true);
    expect(r.avvolgente).toBe('sx');
  });
  it('equilibrio alla rotazione attorno a O′ di ciascun ceppo', () => {
    const r = ceppiEsterni({ ...g, verso: 'orario' });
    expect(close(g.F * g.h - r.FNdx * g.d - r.FTdx * g.R, 0, 1e-9, 1e-9)).toBe(true);
    expect(close(r.FNsx * g.d - r.FTsx * g.R - g.F * g.h, 0, 1e-9, 1e-9)).toBe(true);
  });
  it('invertendo ω i ruoli si scambiano; autobloccaggio per f ≥ OO′/R', () => {
    const o = ceppiEsterni({ ...g, verso: 'orario' }), a = ceppiEsterni({ ...g, verso: 'antiorario' });
    expect(close(o.FTdx, a.FTsx) && close(o.FTsx, a.FTdx)).toBe(true);
    expect(ceppiEsterni({ ...g, f: g.d / g.R + 0.01, verso: 'orario' }).bloccato).toBe(true);
    expect(ceppiEsterni({ ...g, f: g.d / g.R - 0.01, verso: 'orario' }).bloccato).toBe(false);
  });
});

describe('freno a pattino (pp. 114–115)', () => {
  const p = { s: 0.03, l: 0.15, B: 0.05, f: 0.35, h: 0.12, Caz: 100 };
  it('x₀ = Varignon con p = k′x', () => {
    const r = pattino({ ...p, verso: 'contro' });
    const num = simpson((x) => x * x, p.s, p.s + p.l) / simpson((x) => x, p.s, p.s + p.l);
    expect(close(r.x0, num, 1e-9)).toBe(true);
    expect(r.x0 > r.centro).toBe(true);
  });
  it('equilibrio in O: C_az = F_N x₀ ± F_T h; F_N = B k′ [(s+l)² − s²]/2', () => {
    const c = pattino({ ...p, verso: 'contro' }), a = pattino({ ...p, verso: 'aiuta' });
    expect(close(c.FN * c.x0 + c.FT * p.h, p.Caz)).toBe(true);
    expect(close(a.FN * a.x0 - a.FT * p.h, p.Caz)).toBe(true);
    expect(close(c.FN, (p.B * c.k1 * ((p.s + p.l) ** 2 - p.s ** 2)) / 2)).toBe(true);
    expect(a.FT > c.FT).toBe(true);
  });
  it('freno di sicurezza: si impunta per x₀/f ≤ h', () => {
    const x0 = pattino({ ...p, verso: 'aiuta' }).x0;
    expect(pattino({ ...p, f: x0 / p.h + 0.01, verso: 'aiuta' }).bloccato).toBe(true);
    expect(pattino({ ...p, f: x0 / p.h + 0.01, verso: 'contro' }).bloccato).toBe(false);
  });
});

describe('freno a disco e frizione (pp. 116, 120–122)', () => {
  const p = { ri: 0.06, re: 0.12, alpha: 1.2, f: 0.35, FN: 3000 };
  it('usura uniforme: M_f = f F_N r_m e |F_T| = f F_N sin(α/2)/(α/2) (p. 116)', () => {
    const r = discoSettore({ ...p, legge: 'usura' });
    const rm = (p.re + p.ri) / 2;
    expect(close(r.Mf, p.f * p.FN * rm)).toBe(true);
    expect(close(r.FT, (p.f * p.FN * Math.sin(p.alpha / 2)) / (p.alpha / 2))).toBe(true);
    expect(close(r.Mf, simpson2((rr) => p.f * r.pr(rr) * rr * rr, p.ri, p.re, -p.alpha / 2, p.alpha / 2, 60), 1e-9)).toBe(true);
    expect(close(r.bm * r.bt, rm * rm)).toBe(true);
  });
  it('pressione uniforme: R_m = (2/3)(r_e³ − r_i³)/(r_e² − r_i²) > r_m', () => {
    const q = discoSettore({ ...p, legge: 'uniforme' });
    expect(close(q.Rm, ((2 / 3) * (p.re ** 3 - p.ri ** 3)) / (p.re ** 2 - p.ri ** 2))).toBe(true);
    expect(close(q.Rm - (p.re + p.ri) / 2, (p.re - p.ri) ** 2 / (6 * (p.re + p.ri)))).toBe(true);
  });
  it('α = 2π: risultante tangenziale nulla, coppia pura', () => {
    const r = discoSettore({ ...p, alpha: 2 * Math.PI, legge: 'usura' });
    expect(Math.abs(r.FT) < 1e-9 && r.bt === Infinity && r.Mf > 0).toBe(true);
  });
  it('frizione piana (5.86) e innesto (5.83)', () => {
    expect(close(frizionePiana({ ri: p.ri, re: p.re, f: p.f, N: 2000, i: 4, legge: 'usura' }).Cf, 4 * p.f * 2000 * ((p.re + p.ri) / 2))).toBe(true);
    const u = innesto({ I1: 0.4, I2: 0.1, w10: 200, w20: 50 });
    expect(close(u.Lf, ((0.4 * 0.1) / (2 * 0.5)) * 150 ** 2)).toBe(true);
    expect(close(0.4 * 200 + 0.1 * 50, 0.5 * u.wf)).toBe(true);
  });
  it('frizione conica (5.88) e confronto con q42 (NF-19)', () => {
    const c = frizioneConica({ ri: 0.08, re: 0.1, f: 0.3, Np: 1000, alpha: (15 * Math.PI) / 180 });
    const a = (15 * Math.PI) / 180;
    expect(close(c.Cf, (0.3 * 1000 * 0.18) / (2 * (Math.sin(a) + 0.3 * Math.cos(a))))).toBe(true);
    expect(Math.abs(c.rapportoQ42 - 2.12) < 0.01).toBe(true);
  });
  it('frizione centrifuga: ω* e coppia parabolica', () => {
    const q = { m: 0.2, rG: 0.06, Fm: 80, R: 0.08, f: 0.3, n: 3 };
    const ws = Math.sqrt(q.Fm / (q.m * q.rG));
    expect(close(frizioneCentrifuga({ ...q, omega: 0 }).omegaStar, ws)).toBe(true);
    expect(frizioneCentrifuga({ ...q, omega: 0.9 * ws }).Cf).toBe(0);
    expect(close(frizioneCentrifuga({ ...q, omega: 2 * ws }).Cf, 3 * q.n * q.f * q.m * q.rG * q.R * ws * ws)).toBe(true);
  });
});

describe('partitore (deduzione da p. 92)', () => {
  const g = { M: 1200, g: 9.81, l1: 1.2, l2: 1.5, h: 0.55, f: 0.8 };
  it('reazioni in frenata e trasferimento di carico', () => {
    const r = partitore({ ...g, a: 4, beta: 0.6 });
    expect(close(r.NA + r.NB, g.M * g.g)).toBe(true);
    expect(close(r.NA * (g.l1 + g.l2), g.M * g.g * g.l2 + g.M * 4 * g.h)).toBe(true);
  });
  it('con β* entrambi gli assi bloccano a f g; altrimenti prima', () => {
    const bs = partitore({ ...g, a: 0, beta: 0.6 }).betaStar;
    const r = partitore({ ...g, a: 0, beta: bs });
    expect(close(r.aA, g.f * g.g) && close(r.aB, g.f * g.g)).toBe(true);
    const meno = partitore({ ...g, a: 0, beta: bs - 0.1 });
    expect(meno.primo).toBe('posteriore');
    expect(meno.aLim < g.f * g.g).toBe(true);
  });
  it('alla decelerazione di bloccaggio l\'aderenza usata vale f', () => {
    const r0 = partitore({ ...g, a: 0, beta: 0.55 });
    const rB = partitore({ ...g, a: r0.aB, beta: 0.55 });
    expect(close(rB.uB, g.f)).toBe(true);
  });
});
