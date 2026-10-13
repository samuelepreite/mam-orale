/**
 * Controllo numerico di ogni catena (ARCHITETTURA §7): ogni riga con `num` deve tornare su 25 campioni casuali;
 * ogni distrattore con `num` deve essere FALSO su almeno un campione (altrimenti non è un errore).
 */
import { describe, expect, it } from 'vitest';
import { DIMOSTRAZIONI } from '../src/content';
import { close, seeded } from '../src/engine/num';
import { inCapDim } from './cap';

const N = 25;
for (const d of Object.values(DIMOSTRAZIONI).filter((x) => inCapDim(x.id))) {
  describe(`${d.id} ${d.titolo}`, () => {
    const conNum = d.passi.filter((p) => p.num);
    it('ha un campione se ci sono controlli numerici', () => {
      if (conNum.length || d.passi.some((p) => p.distrattori.some((x) => x.num))) expect(d.sample, 'manca sample').toBeTypeOf('function');
    });
    const samples = d.sample ? Array.from({ length: N }, (_, i) => d.sample!(seeded(1000 + i))) : [];
    for (const p of d.passi) {
      if (p.num)
        it(`${p.id} torna sui campioni`, () => {
          for (const v of samples) {
            const [l, r] = p.num!(v);
            expect(Number.isFinite(l) && Number.isFinite(r), `${p.id}: valori non finiti ${l} ${r}`).toBe(true);
            expect(close(l, r, 1e-7, 1e-9), `${p.id}: ${l} ≠ ${r} con ${JSON.stringify(v)}`).toBe(true);
          }
        });
      p.distrattori.forEach((x, k) => {
        if (x.num)
          it(`${p.id} distrattore ${k + 1} è davvero sbagliato`, () => {
            expect(samples.some((v) => { const [l, r] = x.num!(v); return !close(l, r, 1e-4, 1e-9); }), `${p.id}: il distrattore «${x.latex}» coincide col passo giusto`).toBe(true);
          });
      });
    }
  });
}
