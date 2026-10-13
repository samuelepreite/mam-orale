/**
 * Catalogo fisso per i test dell'app: solo il contenuto d'esempio C4 (freno a nastro, d071) più una sua copia su un
 * argomento di C2 (dimostrazione finta d900), così i capitoli che arrivano non cambiano i risultati dei test.
 */
import { ARGOMENTI, DIMOSTRAZIONI } from './app-content-mock';
import type { Argomento, Dimostrazione } from '../src/content/types';
import type { Catalogo } from '../src/learning/catalogo';

export const FN = ARGOMENTI.find((a) => a.id === 'c4-freno-nastro')!;
export const D071 = DIMOSTRAZIONI.d071;

export const D900: Dimostrazione = { ...D071, id: 'd900', titolo: 'Copia di prova', passi: D071.passi.map((p, i) => ({ ...p, id: `d900.${i + 1}` })) };

export function catalogo(conCopia = false): Catalogo {
  const argomenti: Argomento[] = ARGOMENTI.map((a) => {
    if (a.id === FN.id) return FN;
    if (conCopia && a.id === 'c2-attrito') return { ...a, contenuto: { ...FN.contenuto!, id: a.id, dimostrazioni: ['d900'] } };
    return { ...a, contenuto: undefined };
  });
  return { argomenti, dimostrazioni: conCopia ? { d071: D071, d900: D900 } : { d071: D071 } };
}

export const T = (giorni: number, ore = 10) => new Date(2026, 9, 13 + giorni, ore, 0, 0);
export const iso = (giorni: number, ore = 10) => T(giorni, ore).toISOString();
