/** Filtro per capitolo dei test generici: `CAP=C4 npx vitest run` controlla solo i contenuti di C4. */
import { MAPPA, dimId } from '../src/content/mappa';
const CAP = process.env.CAP;
const capDiDim: Record<string, string> = Object.fromEntries(MAPPA.flatMap((a) => a.dimostrazioni.map((n) => [dimId(n), a.cap])));
const capDiArg: Record<string, string> = Object.fromEntries(MAPPA.map((a) => [a.id, a.cap]));
export const inCapDim = (id: string) => !CAP || capDiDim[id] === CAP;
export const inCapArg = (id: string) => !CAP || capDiArg[id] === CAP;
