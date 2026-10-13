/** Utilità condivise dai contenuti C1: fonti, LaTeX grezzo, vettori piatti nei campioni dei controlli numerici. */
import type { Fonte, Vars } from '../types';
import type { V2 } from '../../engine/c1';

/** LaTeX senza raddoppiare le barre: L`\dfrac{a}{b}` */
export const L = String.raw;
export const D = (pag: number | [number, number], fig?: string): Fonte => (fig ? { tipo: 'dispensa', pag, fig } : { tipo: 'dispensa', pag });
export const DED = (da: string, spiegazione: string): Fonte => ({ tipo: 'deduzione', da, spiegazione });
export const EST = (ref: string, nota: string): Fonte => ({ tipo: 'esterna', ref, nota });

/** scrive le due componenti di un vettore nel campione: put(o, 'VB', [x, y]) → o.VBx, o.VBy */
export function put(o: Vars, nome: string, v: V2) {
  o[nome + 'x'] = v[0];
  o[nome + 'y'] = v[1];
}
/** legge un vettore dal campione */
export const get = (v: Vars, nome: string): V2 => [v[nome + 'x'], v[nome + 'y']];
/** proiezione su una direzione generica (x + √2 y): due vettori uguali hanno la stessa, due diversi quasi mai */
export const pj = (a: V2) => a[0] + Math.SQRT2 * a[1];
export const pv = (v: Vars, nome: string) => pj(get(v, nome));
