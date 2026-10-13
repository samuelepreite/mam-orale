/** Utilità comuni ai contenuti di C3 (fonti abbreviate, piccoli conti vettoriali per i controlli numerici). */
import type { Fonte } from '../types';

/** pagina PDF della dispensa */
export const D = (pag: number | [number, number], extra: { eq?: string; fig?: string } = {}): Fonte => ({ tipo: 'dispensa', pag, ...extra });
/** non scritto nella dispensa: si ricava da ciò che c'è */
export const DED = (da: string, spiegazione: string): Fonte => ({ tipo: 'deduzione', da, spiegazione });
/** fonte esterna dichiarata (NF-07) */
export const EST = (ref: string, nota: string): Fonte => ({ tipo: 'esterna', ref, nota });

/** componente z del prodotto vettoriale piano a ∧ b */
export const cz = (ax: number, ay: number, bx: number, by: number) => ax * by - ay * bx;
/** ω k ∧ (vx, vy) = ω(−vy, vx) */
export const wk = (w: number, vx: number, vy: number): [number, number] => [-w * vy, w * vx];
export const dot = (a: [number, number], b: [number, number]) => a[0] * b[0] + a[1] * b[1];
