/** Mappa degli argomenti d'orale (generata da tools/analisi/argomenti.py: non modificare a mano il JSON). */
import data from '../../tools/analisi/argomenti.json';
import type { ArgomentoMappa, CapId } from './types';

export interface Capitolo {
  id: CapId;
  titolo: string;
  pagine: string;
}

export const CAPITOLI: Capitolo[] = data.capitoli.map((c) => ({ id: c.id as CapId, titolo: c.titolo, pagine: c.pagine }));
export const DOMANDE: Record<number, string> = Object.fromEntries(Object.entries(data.domande).map(([k, v]) => [Number(k), v as string]));
export const MAPPA: ArgomentoMappa[] = data.argomenti as ArgomentoMappa[];
export const mappaDi = (id: string) => MAPPA.find((a) => a.id === id);
export const dimId = (n: number) => `d${String(n).padStart(3, '0')}`;
