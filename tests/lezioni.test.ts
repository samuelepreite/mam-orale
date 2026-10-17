/**
 * Lezioni discorsive (docs/BRIEF_LEZIONI.md): ogni argomento con contenuto ha il suo testo, con tutti i passi e tutte
 * le dimostrazioni, lunghezze minime (niente spiegazioni telegrafiche) e formule KaTeX valide.
 */
import katex from 'katex';
import { describe, expect, it } from 'vitest';
import { CONTENUTI, DIMOSTRAZIONI } from '../src/content';
import { inCapArg } from './cap';

const parole = (s: string) => s.split(/\s+/).filter(Boolean).length;
function formuleOk(s: string, dove: string) {
  for (const m of s.matchAll(/\$\$([^$]+)\$\$|\$([^$]+)\$/g)) {
    const tex = m[1] ?? m[2];
    expect(() => katex.renderToString(tex, { throwOnError: true, strict: 'ignore' }), `${dove}: formula non valida «${tex}»`).not.toThrow();
  }
}

for (const [id, c] of Object.entries(CONTENUTI).filter(([k]) => inCapArg(k))) {
  describe(`lezione ${id}`, () => {
    const L = c.lezione;
    it('esiste', () => expect(L, `${id}: manca la lezione discorsiva`).toBeTruthy());
    if (!L) return;
    it('parti iniziali complete', () => {
      expect(parole(L.perche), 'perche').toBeGreaterThanOrEqual(60);
      expect(parole(L.idea), 'idea').toBeGreaterThanOrEqual(90);
      expect(L.richiami.length, 'richiami').toBeGreaterThan(0);
      for (const r of L.richiami) expect(parole(r.testo), `richiamo ${r.titolo}`).toBeGreaterThanOrEqual(25);
      expect(L.ipotesiPerche.length, 'ipotesiPerche: stessa lunghezza di sistemaIpotesi').toBe(c.sistemaIpotesi.length);
      expect(parole(L.disegnoGuida), 'disegnoGuida').toBeGreaterThanOrEqual(50);
      expect(L.mappa.length >= 2 && L.mappa.length <= 7, 'mappa: 2–7 tappe').toBe(true);
      expect(parole(L.racconto), 'racconto').toBeGreaterThanOrEqual(50);
    });
    it('tutte le dimostrazioni e tutti i passi spiegati', () => {
      for (const did of c.dimostrazioni) {
        const d = DIMOSTRAZIONI[did];
        const dd = L.dims[did];
        expect(dd, `${did}: manca introduzione/riepilogo`).toBeTruthy();
        expect(parole(dd.introduzione), `${did} introduzione`).toBeGreaterThanOrEqual(30);
        expect(parole(dd.riepilogo), `${did} riepilogo`).toBeGreaterThanOrEqual(30);
        for (const p of d.passi) {
          const x = L.passi[p.id];
          expect(x, `${p.id}: manca la spiegazione`).toBeTruthy();
          expect(parole(x.prima), `${p.id} prima`).toBeGreaterThanOrEqual(25);
          expect(parole(x.dopo), `${p.id} dopo`).toBeGreaterThanOrEqual(18);
          if (x.tappa !== undefined) expect(x.tappa >= 0 && x.tappa < L.mappa.length, `${p.id}: tappa fuori dalla mappa`).toBe(true);
        }
      }
      const tutti = new Set(c.dimostrazioni.flatMap((d) => DIMOSTRAZIONI[d].passi.map((p) => p.id)));
      for (const k of Object.keys(L.passi)) expect(tutti.has(k), `${k}: passo inesistente`).toBe(true);
    });
    it('formule valide', () => {
      const testi: [string, string][] = [['perche', L.perche], ['idea', L.idea], ['disegnoGuida', L.disegnoGuida], ['racconto', L.racconto], ...L.richiami.map((r) => [r.titolo, r.testo] as [string, string]), ...L.ipotesiPerche.map((t, i) => [`ipotesi ${i}`, t] as [string, string]), ...L.mappa.map((t, i) => [`mappa ${i}`, t] as [string, string]), ...Object.entries(L.dims).flatMap(([k, v]) => [[`${k} intro`, v.introduzione], [`${k} riep`, v.riepilogo]] as [string, string][]), ...Object.entries(L.passi).flatMap(([k, v]) => [[`${k} prima`, v.prima], [`${k} dopo`, v.dopo]] as [string, string][])];
      for (const [k, t] of testi) formuleOk(t, `${id} ${k}`);
    });
  });
}
