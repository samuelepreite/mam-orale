/** Utilità numeriche condivise (nessuna dipendenza dalla UI). */
export const TAU = 2 * Math.PI;
export const deg = (r: number) => (r * 180) / Math.PI;
export const radOf = (d: number) => (d * Math.PI) / 180;
/** generatore pseudo-casuale riproducibile (mulberry32) */
export function seeded(seed = 1): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** valore uniforme in [lo, hi] */
export const U = (rnd: () => number, lo: number, hi: number) => lo + (hi - lo) * rnd();
/** uguaglianza relativa (o assoluta vicino a zero) */
export const close = (a: number, b: number, rel = 1e-9, abs = 1e-12) => Math.abs(a - b) <= Math.max(abs, rel * Math.max(Math.abs(a), Math.abs(b)));
/** formattazione italiana con n cifre significative */
export function fmt(x: number, sig = 3): string {
  if (!isFinite(x)) return '—';
  if (x === 0) return '0';
  const s = Number(x.toPrecision(sig));
  return s.toLocaleString('it-IT', { maximumSignificantDigits: sig });
}
