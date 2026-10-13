/** I numeri delle animazioni C6 coincidono con le formule della dispensa (pp. 197–206; libro pp. 117–118). */
import { describe, expect, it } from 'vitest';
import {
  CARICO_P197, CARICO_P198, DATI_E42, DATI_FRIZIONE, MOTORE_ASINCRONO as M, cmAsincrono, cuParabolico, dcmAsincrono,
  dcuParabolico, frizione, innestoCostante, omegaDotCarico, omegaDotMotore, puntiDiRegime, regimeE42, ridotte, rk4,
  simpson, simulaDiretto, tauOttimo, transitorioCC,
} from '../src/engine/c6';
import { close } from '../src/engine/num';

const cm = (w: number) => cmAsincrono(w, M);
const punti = (C: typeof CARICO_P197) => puntiDiRegime(cm, (w) => cuParabolico(w, C), M.omegaS, (w) => dcmAsincrono(w, M), (w) => dcuParabolico(w, C));

describe('caratteristica del motore asincrono (figura pp. 195, 197)', () => {
  it('coppia nulla al sincronismo, massimo C_max a s = s_k, derivata analitica = numerica', () => {
    expect(cm(M.omegaS)).toBe(0);
    expect(close(cm(M.omegaS * (1 - M.sk)), M.Cmax)).toBe(true);
    for (const w of [5, 30, 60, 85, 99]) {
      const h = 1e-5;
      expect(close(dcmAsincrono(w, M), (cm(w + h) - cm(w - h)) / (2 * h), 1e-6, 1e-6)).toBe(true);
    }
  });
});

describe('regime e stabilità (pp. 197–199)', () => {
  it('p. 197: un solo punto P, C_m = C_u, stabile (K_m − K_u < 0), raggiunto da fermo', () => {
    const p = punti(CARICO_P197);
    expect(p.length).toBe(1);
    expect(close(cm(p[0].omega), cuParabolico(p[0].omega, CARICO_P197), 1e-9)).toBe(true);
    expect(p[0].stabile && p[0].Km < 0).toBe(true);
    expect(cm(0) > CARICO_P197.Cu0).toBe(true); // si avvia
    expect(close(simulaDiretto(0, 60, cm, (w) => cuParabolico(w, CARICO_P197), 2), p[0].omega, 1e-6)).toBe(true);
  });
  it('p. 198: Q instabile sul tratto crescente, P stabile; sotto Q si ferma, sopra Q va in P', () => {
    const [Q, P] = punti(CARICO_P198);
    expect(Q.stabile).toBe(false);
    expect(Q.Km > Q.Ku && Q.Km > 0).toBe(true);
    expect(P.stabile).toBe(true);
    expect(cm(0) < CARICO_P198.Cu0).toBe(true); // da fermo non parte
    const cu = (w: number) => cuParabolico(w, CARICO_P198);
    expect(simulaDiretto(Q.omega - 1, 60, cm, cu, 2)).toBe(0);
    expect(close(simulaDiretto(Q.omega + 1, 60, cm, cu, 2), P.omega, 1e-6)).toBe(true);
  });
  it('perturbazione piccola: Ω(t) ≃ Ω₀ e^{(K_m − K_u)t/I} (p. 198)', () => {
    const [P] = punti(CARICO_P197);
    const I = 2, Om0 = 0.01, t = 0.3;
    const w = simulaDiretto(P.omega + Om0, t, cm, (x) => cuParabolico(x, CARICO_P197), I, 1e-4);
    expect(close(w - P.omega, Om0 * Math.exp(((P.Km - P.Ku) * t) / I), 2e-2)).toBe(true);
  });
});

describe('transitorio motore c.c. + carico costante (pp. 199–200)', () => {
  const p = { Cm0: 120, Km: 1.5, Cu0: 45, Ieq: 3 };
  const r = transitorioCC(p);
  it('ω(t) risolve I_eq ω̇ = C_m0 − K_m ω − C_u0 da fermo; ω_P = (C_m0 − C_u0)/K_m', () => {
    expect(close(r.wP, (p.Cm0 - p.Cu0) / p.Km)).toBe(true);
    const t = 1.7;
    expect(close(r.omega(t), rk4((_s, y) => (p.Cm0 - p.Km * y - p.Cu0) / p.Ieq, 0, 0, t), 1e-9)).toBe(true);
  });
  it('t_% = −(I_eq/K_m) ln(1 − %), t_90% = 2,30 I_eq/K_m; la riga di D senza ln no (NF-28)', () => {
    for (const q of [0.5, 0.9, 0.95]) expect(close(r.omega(r.tPerc(q)), q * r.wP)).toBe(true);
    expect(close(r.tPerc(0.9), (p.Ieq / p.Km) * Math.log(10))).toBe(true);
    expect(close(r.omega(-r.tPercDispensa(0.9)), 0.9 * r.wP)).toBe(false);
  });
});

describe('trasmissione (p. 201)', () => {
  it('grandezze ridotte τC_u/η e I_m + τ²I_u/η; ω̇_m coerente col bilancio η(C_m − I_m ω̇_m)ω_m = (C_u + I_u ω̇_u)ω_u', () => {
    const q = { Cm: 80, Cu: 150, Im: 0.4, Iu: 12, eta: 0.85 };
    const tau = 0.3, wm = 100;
    const r = ridotte({ ...q, tau });
    expect(close(r.CuRid, (tau * q.Cu) / q.eta) && close(r.Ieq, q.Im + (tau * tau * q.Iu) / q.eta)).toBe(true);
    const wd = omegaDotMotore(tau, q);
    expect(close(q.eta * (q.Cm - q.Im * wd) * wm, (q.Cu + q.Iu * tau * wd) * tau * wm)).toBe(true);
  });
  it('esempio E4/2: ω_m = 173,1 rad/s = 1652,8 giri/min, ω_u = 86,54, C_m = 34,62 N m, W = 5,99 kW', () => {
    const e = regimeE42(DATI_E42);
    expect(Math.abs(e.wm - 173.077) < 1e-3 && Math.abs(e.rpm(e.wm) - 1652.8) < 0.1).toBe(true);
    expect(Math.abs(e.wu - 86.54) < 0.01 && Math.abs(e.Cm - 34.615) < 1e-3 && Math.abs(e.W - 5991.1) < 0.1).toBe(true);
    expect(close(e.Cm, DATI_E42.tau * e.Cu)).toBe(true); // regime C_m = τ C_u
  });
  it('τ ottimo massimizza ω̇_u (non ω̇_m, NF-29); con C_u = 0 vale √(I_m/I_u)', () => {
    for (const q of [{ Cm: 50, Cu: 30, Im: 0.05, Iu: 4 }, { Cm: 10, Cu: 0, Im: 0.02, Iu: 2 }]) {
      const t = tauOttimo(q);
      let best = 0, arg = 0;
      for (let k = 1; k <= 200000; k++) {
        const x = (k / 200000) * 2, v = omegaDotCarico(x, q);
        if (v > best) { best = v; arg = x; }
      }
      expect(Math.abs(arg - t) < 2e-5).toBe(true);
      expect(omegaDotMotore(t / 2, q) > omegaDotMotore(t, q)).toBe(true); // ω̇_m continua a crescere al calare di τ
    }
    expect(close(tauOttimo({ Cm: 10, Cu: 0, Im: 0.02, Iu: 2 }), 0.1)).toBe(true);
  });
});

describe('frizione (pp. 202–206; libro pp. 117–118)', () => {
  const F = frizione(DATI_FRIZIONE);
  const p = DATI_FRIZIONE;
  it('strisciamento: ω_m(0) = ω_m^I, ω_m e ω_c risolvono le equazioni di pp. 203–204', () => {
    expect(close(F.omegaM(0), p.wI)).toBe(true);
    const t = 0.8;
    expect(close(F.omegaMs(t), rk4((_s, y) => (p.Cm0 - p.Km * y - p.Cfr) / p.Im, p.wI, 0, t), 1e-9)).toBe(true);
    expect(close(F.omegaCs(t), ((p.Cfr - p.tau * p.Cu0) / (p.tau * p.tau * p.Iu)) * t)).toBe(true);
  });
  it('punto Q: ω_m(t_Q) = ω_c(t_Q); dopo Q legge di p. 206 verso (C_m0 − τC_u)/K_m', () => {
    expect(close(F.omegaMs(F.tQ), F.omegaCs(F.tQ), 1e-10)).toBe(true);
    const t2 = F.tQ + 1.3;
    expect(close(F.omegaAd(t2), rk4((_s, y) => (p.Cm0 - p.Km * y - p.tau * p.Cu0) / (p.Im + p.tau * p.tau * p.Iu), F.wQ, F.tQ, t2), 1e-9)).toBe(true);
    expect(close(F.wReg, (p.Cm0 - p.tau * p.Cu0) / p.Km)).toBe(true);
    expect(F.aderenzaTiene).toBe(true);
  });
  it('coppia in aderenza: lato motore = lato utilizzatore', () => {
    const t = F.tQ + 0.5, w = F.omegaAd(t), wd = (p.Cm0 - p.Km * w - p.tau * p.Cu0) / F.Ieq;
    expect(close(F.CfrAder(t), p.tau * p.Cu0 + p.tau * p.tau * p.Iu * wd)).toBe(true);
  });
  it('energia dissipata = C_fr ∫(ω_m − ω_c) dt (forma chiusa = Simpson) e maggiore dell\'innesto impulsivo', () => {
    expect(close(F.energia(F.tQ), p.Cfr * simpson((s) => F.omegaMs(s) - F.omegaCs(s), 0, F.tQ, 4000), 1e-10)).toBe(true);
    const I2 = p.tau * p.tau * p.Iu;
    expect(close(F.Eimp, ((p.Im * I2) / (2 * (p.Im + I2))) * p.wI * p.wI)).toBe(true);
    expect(F.energia(F.tQ) > F.Eimp).toBe(true);
  });
  it('carico troppo pesante per la coppia di frizione: il condotto non parte; frizione troppo serrata e motore debole: stallo', () => {
    expect(frizione({ ...p, Cu0: 300 }).caricoParte).toBe(false);
    const s = frizione({ ...p, Cfr: 270, Iu: 200 });
    expect(s.stallo && s.tStallo < s.tQ).toBe(true);
    expect(close(s.omegaMs(s.tStallo), p.wMin!, 1e-9)).toBe(true);
  });
  it('innesto a coppie costanti (libro): (5.82) e, senza coppie esterne, (5.83) e L_f = I₁I₂Δω²/(2(I₁+I₂))', () => {
    const q = { I1: 0.8, I2: 2.5, w10: 200, w20: 20, Cm: 60, Cr: 40, Cf: 150 };
    const G = innestoCostante(q);
    const rhs = 0.5 * (q.I1 * q.w10 ** 2 + q.I2 * q.w20 ** 2 - (q.I1 + q.I2) * G.wf ** 2) + q.Cm * G.int1 - q.Cr * G.int2;
    expect(close(G.Lf, rhs)).toBe(true);
    const G0 = innestoCostante({ ...q, Cm: 0, Cr: 0 });
    expect(close(G0.wf, (q.I1 * q.w10 + q.I2 * q.w20) / (q.I1 + q.I2))).toBe(true);
    expect(close(G0.Lf, ((q.I1 * q.I2) / (2 * (q.I1 + q.I2))) * (q.w10 - q.w20) ** 2)).toBe(true);
  });
});

describe('angoli dei dischi dell\'animazione', () => {
  it('θ(t) = ∫ω dt prima e dopo Q', () => {
    const F = frizione(DATI_FRIZIONE);
    for (const t of [0.6, F.tQ + 0.9]) {
      const th = F.angoli(t);
      expect(close(th.m, simpson(F.omegaM, 0, t, 4000), 1e-6)).toBe(true);
      expect(close(th.c, simpson(F.omegaC, 0, t, 4000), 1e-6)).toBe(true);
    }
  });
});
