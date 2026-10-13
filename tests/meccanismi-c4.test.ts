/** I numeri delle animazioni C4 coincidono con le formule della dispensa (p. 153). */
import { describe, expect, it } from 'vitest';
import { frenoNastro } from '../src/engine/c4';
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
