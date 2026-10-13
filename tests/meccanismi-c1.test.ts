// @vitest-environment jsdom
/**
 * I numeri delle animazioni C1 coincidono con le formule della dispensa e con le derivate esatte del moto
 * (getti: posizione → velocità → accelerazione, strada indipendente dalle formule).
 */
import { describe, expect, it } from 'vitest';
import {
  astaPattini, cross, estremiGlifo, estremiGlifoNumerici, glifo, jadd, jasin, jatan2, jc, jcos, jmul, jnorm, jpolar, jsc, jsin, jsqrt, jsub, jt, jvsub,
  manovellismo, pistone, quadrilateroJ, staticaManovellismo, sub, wedge, type J, type JV,
} from '../src/engine/c1';
import { close } from '../src/engine/num';
import { createElement } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MECCANISMI_C1 } from '../src/diagrams/c1';

const c = (a: number, b: number) => close(a, b, 1e-9, 1e-9);

describe('manovellismo di spinta (pp. 25–27, 31–32)', () => {
  const r = 0.03, l = 0.09, w = (1000 * 2 * Math.PI) / 60;
  // x_C(t) esatta e approssimata con θ = ω₁t: getti in θ
  const xCj = (th: number): J => {
    const T = jt(th, w);
    const sg = jsc(r / l, jsin(T));
    return jadd(jsc(r, jcos(T)), jsc(l, jsqrt(jsub(jc(1), jmul(sg, sg)))));
  };
  const xAj = (th: number): J => {
    const T = jt(th, w);
    const s = jsin(T);
    return jadd(jsc(r, jcos(T)), jc(l), jsc((-l * (r / l) ** 2) / 2, jmul(s, s)));
  };
  for (const deg of [0, 20, 50, 89, 90, 120, 180, 233, 300]) {
    const th = (deg * Math.PI) / 180;
    const m = manovellismo({ r, l, theta: th, omega1: w });
    it(`θ = ${deg}°: V_C e a_C esatte = derivate di x_C(t)`, () => {
      const x = xCj(th);
      expect(c(m.xC, x[0])).toBe(true);
      expect(c(m.VC, x[1])).toBe(true);
      expect(c(m.aC, x[2])).toBe(true);
    });
    it(`θ = ${deg}°: forma approssimata (p. 32) = derivate della legge approssimata`, () => {
      const x = xAj(th);
      expect(c(m.xCapprox, x[0])).toBe(true);
      expect(c(m.VCapprox, x[1])).toBe(true);
      expect(c(m.aCapprox, x[2])).toBe(true);
    });
    it(`θ = ${deg}°: ω₂ = derivata dell'angolo della biella; V_C = ω₂ ∧ (C − K)`, () => {
      const T = jt(th, w);
      const Bj = jpolar(jc(r), T);
      const Cj: JV = [xCj(th), jc(0)];
      const ang = jatan2(jsub(Cj[1], Bj[1]), jsub(Cj[0], Bj[0]));
      expect(c(m.omega2, ang[1])).toBe(true);
      expect(c(m.omega2dot, ang[2])).toBe(true);
      if (m.K) expect(close(wedge(m.omega2, sub(m.C, m.K))[0], m.VC, 1e-8, 1e-9)).toBe(true);
      else expect(Math.abs(m.omega2)).toBeLessThan(1e-9);
      // il verso: orario per |θ| < 90°, antiorario fra 90° e 270° (NF-101)
      const cs = Math.cos(th);
      if (Math.abs(cs) > 1e-6) expect(Math.sign(m.omega2)).toBe(cs > 0 ? -1 : 1);
    });
  }
  it('punti morti: V_C = 0 e K ≡ C (p. 26)', () => {
    for (const th of [0, Math.PI]) {
      const m = manovellismo({ r, l, theta: th, omega1: w });
      expect(Math.abs(m.VC)).toBeLessThan(1e-9);
      expect(c(m.K![0], m.C[0]) && Math.abs(m.K![1]) < 1e-12).toBe(true);
    }
  });
  it('esempio di p. 32: corsa 0,06 m, a_C(0) ≈ −438,6 e a_C(π) ≈ +219,3 m/s²', () => {
    const m0 = manovellismo({ r, l, theta: 0, omega1: w }), m1 = manovellismo({ r, l, theta: Math.PI, omega1: w });
    expect(close(m0.xC - m1.xC, 0.06)).toBe(true);
    expect(Math.abs(m0.aCapprox + 438.6)).toBeLessThan(0.05);
    expect(Math.abs(m1.aCapprox - 219.3)).toBeLessThan(0.05);
  });
});

describe('statica del manovellismo (pp. 47–49, NF-15, NF-108)', () => {
  const r = 0.05, l = 0.2, F = 1000;
  for (const deg of [30, 75, 140, 210, 320]) {
    const th = (deg * Math.PI) / 180;
    it(`θ = ${deg}°: senza attrito C₁ = −F r sin(θ+γ)/cos γ e potenze in equilibrio`, () => {
      const s = staticaManovellismo({ r, l, theta: th, F, f: 0 });
      const m = manovellismo({ r, l, theta: th, omega1: 1 });
      expect(c(s.C1, (-F * r * Math.sin(th + m.gamma)) / Math.cos(m.gamma))).toBe(true);
      expect(close(s.C1 * 1 + -F * m.VC, 0, 1e-9, 1e-9)).toBe(true); // forze vive: C₁ω₁ + (−F)·V_C = 0
    });
    it(`θ = ${deg}°: con attrito f = 0,2 la potenza persa è T·V_C < 0`, () => {
      const s = staticaManovellismo({ r, l, theta: th, F, f: 0.2 });
      const m = manovellismo({ r, l, theta: th, omega1: 1 });
      expect(close(s.C1 - F * m.VC + s.T * m.VC, 0, 1e-9, 1e-9)).toBe(true);
      expect(s.T * m.VC).toBeLessThan(0);
      expect(Math.abs(s.T)).toBeLessThanOrEqual(0.2 * Math.abs(s.N) + 1e-9);
    });
  }
  it('ai punti morti il braccio si annulla: C₁ = 0 per qualsiasi F', () => {
    for (const th of [0, Math.PI]) expect(Math.abs(staticaManovellismo({ r, l, theta: th, F, f: 0 }).C1)).toBeLessThan(1e-9);
  });
});

describe('glifo oscillante (pp. 64–65; rapido ritorno: deduzione)', () => {
  const g0 = { r: 0.5, d: 1, L: 2.2, l3: 1.2, yE: -1 + 2.2 * 0.97, omega1: 1.3 };
  it('estremi analitici (tangenza) = estremi cercati numericamente', () => {
    for (const [r, d] of [[0.5, 1], [0.3, 1.2], [0.8, 1]]) {
      const a = estremiGlifo(r, d), n = estremiGlifoNumerici(r, d);
      expect(close(a.thDestra, n.thDestra, 1e-6)).toBe(true);
      expect(close(a.lenta, n.lenta, 1e-6)).toBe(true);
      expect(close(n.ampiezzaGlifo, 2 * a.delta, 1e-6)).toBe(true);
    }
    expect(close(estremiGlifo(0.5, 1).rapporto, 2)).toBe(true);
  });
  for (const deg of [-30, 10, 70, 150, 200, 260]) {
    const th = (deg * Math.PI) / 180;
    it(`θ = ${deg}°: ω₂, V_rel e V_E = derivate esatte`, () => {
      const G = glifo({ ...g0, theta: th });
      const T = jt(th, g0.omega1);
      const Bj = jpolar(jc(g0.r), T);
      const CB: JV = [Bj[0], [Bj[1][0] + g0.d, Bj[1][1], Bj[1][2]]];
      const psi = jatan2(CB[1], CB[0]);
      const rho = jnorm(CB);
      expect(c(G.omega2, psi[1])).toBe(true);
      expect(c(G.Vrel, rho[1])).toBe(true);
      const Dj = jpolar(jc(g0.L), psi);
      const dy = jsub([Dj[1][0] - g0.d, Dj[1][1], Dj[1][2]], jc(g0.yE));
      const xE = jsub(Dj[0], jsqrt(jsub(jc(g0.l3 ** 2), jmul(dy, dy))));
      expect(c(G.VE, xE[1])).toBe(true);
      // triangolo delle velocità in B: V_B = ω₂∧(B−C) + V_rel û
      const u = [Math.cos(G.psi), Math.sin(G.psi)];
      const t = wedge(G.omega2, sub(G.B, G.C));
      expect(c(G.VB[0], t[0] + G.Vrel * u[0]) && c(G.VB[1], t[1] + G.Vrel * u[1])).toBe(true);
    });
  }
  it('agli estremi il glifo si ferma: ω₂ = 0 e tutta V_B è relativa', () => {
    const e = estremiGlifo(g0.r, g0.d);
    for (const th of [e.thDestra, e.thSinistra]) {
      const G = glifo({ ...g0, theta: th });
      expect(Math.abs(G.omega2)).toBeLessThan(1e-12);
      expect(close(Math.abs(G.Vrel), g0.omega1 * g0.r)).toBe(true);
    }
  });
});

describe('pistone oleodinamico (pp. 36–39)', () => {
  const g = { xA: 1.6, yA: -0.3, b: 2.2, Vrel: 0.12 };
  for (const deg of [8, 20, 35, 50]) {
    const ph = (deg * Math.PI) / 180;
    it(`φ₃ = ${deg}°: ω₁, ω₃, ω̇₁, ω̇₃ coerenti con il moto vero (ℓ̇ = V_rel, ℓ̈ = 0)`, () => {
      const P = pistone({ ...g, phi3: ph });
      const Bj = jpolar(jc(g.b), jt(ph, P.omega3, P.omega3dot));
      const BA: JV = jvsub(Bj, [jc(g.xA), jc(g.yA)]);
      const ell = jnorm(BA), ang = jatan2(BA[1], BA[0]);
      expect(c(ell[1], g.Vrel)).toBe(true);
      expect(Math.abs(ell[2])).toBeLessThan(1e-9);
      expect(c(ang[1], P.omega1)).toBe(true);
      expect(c(ang[2], P.omega1dot)).toBe(true);
      expect(c(P.aCor[0] ** 2 + P.aCor[1] ** 2, (2 * P.omega1 * g.Vrel) ** 2)).toBe(true);
    });
  }
  it('Coriolis ∝ q²: raddoppiando la portata quadruplica', () => {
    const a = pistone({ ...g, phi3: 0.4 }), b = pistone({ ...g, Vrel: 2 * g.Vrel, phi3: 0.4 });
    expect(close(Math.hypot(...b.aCor) / Math.hypot(...a.aCor), 4)).toBe(true);
  });
});

describe('asta con due pattini (pp. 21–24, 56–60)', () => {
  const L = 1.2, VA = 0.8, M = 5, IG = 0.7, gg = 9.81;
  for (const deg of [15, 43, 70]) {
    const a = (deg * Math.PI) / 180;
    const s = astaPattini({ L, alpha: a, VA, M, IG, g: gg });
    it(`α = ${deg}°: cinematica = derivate esatte (ẏ_A = −V_A, ÿ_A = 0)`, () => {
      const ad = -VA / (L * Math.cos(a));
      const add = (-VA * Math.sin(a) * ad) / (L * Math.cos(a) ** 2);
      const al = jt(a, ad, add);
      const yA = jmul(jc(L), jsin(al)), xB = jmul(jc(L), jcos(al));
      expect(c(yA[1], -VA) && Math.abs(yA[2]) < 1e-12).toBe(true);
      expect(c(xB[1], s.VB) && c(xB[2], s.aB)).toBe(true);
      expect(c(-al[1], s.omega) && c(-al[2], s.omegaDot)).toBe(true);
      expect(c(s.VB, VA * Math.tan(a))).toBe(true);
      // velocità minima lungo l'asta nel piede della perpendicolare da K: V_A sin α
      const vs = Array.from({ length: 2001 }, (_, k) => Math.hypot(...s.vel(k / 2000)));
      const kmin = vs.indexOf(Math.min(...vs));
      expect(Math.abs(kmin / 2000 - s.sMin)).toBeLessThan(1e-3);
      expect(close(Math.min(...vs), s.Vmin, 1e-6)).toBe(true);
    });
    it(`α = ${deg}°: F₃,₂ di p. 60 = soluzione di Newton–Eulero`, () => {
      // incognite F12x, F12y, F32: traslazione e rotazione attorno a G
      const G = [s.A[0] / 2 + s.B[0] / 2, s.A[1] / 2 + s.B[1] / 2] as [number, number];
      const AG = sub(s.A, G), BG = sub(s.B, G);
      // x: F12x = M aG ; y: F12y + F32 − Mg = 0 ; z: AG∧F12 + BG∧(0,F32) = IG ω̇
      const F12x = M * s.aG;
      // AG∧(F12x, F12y) = AGx F12y − AGy F12x ; BG∧(0,F32) = BGx F32 ; F12y = Mg − F32
      const F32 = (IG * s.omegaDot + AG[1] * F12x - AG[0] * M * gg) / (BG[0] - AG[0]);
      expect(close(F32, s.F32, 1e-9)).toBe(true);
      expect(close(s.F12x, F12x) && close(s.F, M * gg - F32)).toBe(true);
      expect(close(cross(AG, [F12x, M * gg - F32]) + BG[0] * F32, IG * s.omegaDot, 1e-9, 1e-9)).toBe(true);
    });
  }
});

describe('quadrilatero nel piano complesso (pp. 41–43)', () => {
  const V: [number, number, number, number] = [0.4, 1.0, 0.8, 1.1], phi4 = Math.PI - 0.15;
  it('chiusura, sistema delle velocità e delle accelerazioni', () => {
    const p1 = jt(0.7, 1.4, 0.3);
    const { phi2, phi3 } = quadrilateroJ(V, phi4, p1);
    const ph = [p1, phi2, phi3];
    const re = V[0] * Math.cos(p1[0]) + V[1] * Math.cos(phi2[0]) + V[2] * Math.cos(phi3[0]) + V[3] * Math.cos(phi4);
    expect(Math.abs(re)).toBeLessThan(1e-12);
    const v1 = ph.reduce((s, p, k) => s - V[k] * Math.sin(p[0]) * p[1], 0);
    const v2 = ph.reduce((s, p, k) => s + V[k] * Math.cos(p[0]) * p[1], 0);
    expect(Math.abs(v1) < 1e-12 && Math.abs(v2) < 1e-12).toBe(true);
    const a1 = ph.reduce((s, p, k) => s - V[k] * Math.cos(p[0]) * p[1] ** 2 - V[k] * Math.sin(p[0]) * p[2], 0);
    expect(Math.abs(a1)).toBeLessThan(1e-12);
  });
  it('jasin è coerente con la derivata analitica', () => {
    const x = jasin(jt(0.3, 0.5, 0.2));
    expect(c(x[1], 0.5 / Math.sqrt(1 - 0.09))).toBe(true);
  });
});

describe('animazioni C1: si disegnano senza NaN in ogni configurazione', () => {
  globalThis.requestAnimationFrame ??= (() => 0) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame ??= (() => undefined) as unknown as typeof cancelAnimationFrame;
  const casi: [string, Record<string, number> | undefined][] = [['c1-manovellismo', undefined], ['c1-glifo', undefined], ['c1-pistone', undefined], ['c1-asta', undefined], ['c1-asta', { dinamica: 1 }]];
  for (const [id, params] of casi) {
    it(`${id}${params ? ' (dinamica)' : ''}`, () => {
      const { container } = render(createElement(MECCANISMI_C1[id], { params }));
      const bottoni = Array.from(container.querySelectorAll('.seg button'));
      for (const deg of ['0', '45', '90', '180', '233', '270', '359']) {
        const range = container.querySelector('.mech-controls input[type=range]') as HTMLInputElement;
        fireEvent.change(range, { target: { value: deg } });
        for (const b of [null, ...bottoni]) {
          if (b) fireEvent.click(b);
          const html = container.innerHTML;
          expect(html.includes('NaN'), `${id} θ=${deg}: NaN nel disegno`).toBe(false);
          expect(html.includes('undefined'), `${id} θ=${deg}: undefined nel disegno`).toBe(false);
          for (const dd of Array.from(container.querySelectorAll('.readout dd'))) expect(dd.textContent?.includes('—'), `${id} θ=${deg}: valore non finito`).toBe(false);
        }
      }
      cleanup();
    });
  }
});
