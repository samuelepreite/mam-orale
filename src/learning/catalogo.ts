/**
 * Il catalogo che usa l'apprendimento: argomenti (mappa + contenuti) e dimostrazioni.
 * Le funzioni di `learning/` lo ricevono come parametro (default: il registro di src/content), così i test possono
 * usare un catalogo fisso e i capitoli che arrivano non cambiano i loro risultati.
 */
import { ARGOMENTI, DIMOSTRAZIONI } from '../content';
import type { Argomento, Dimostrazione, Passo } from '../content/types';

export interface Catalogo {
  argomenti: Argomento[];
  dimostrazioni: Record<string, Dimostrazione>;
}

export const CATALOGO: Catalogo = { argomenti: ARGOMENTI, dimostrazioni: DIMOSTRAZIONI };

export const argDi = (cat: Catalogo, id: string) => cat.argomenti.find((a) => a.id === id);
export const dimsDi = (cat: Catalogo, a: Argomento): Dimostrazione[] => (a.contenuto?.dimostrazioni ?? []).map((d) => cat.dimostrazioni[d]).filter(Boolean);
export const passiDi = (cat: Catalogo, a: Argomento): { dim: Dimostrazione; passo: Passo; i: number }[] => dimsDi(cat, a).flatMap((dim) => dim.passi.map((passo, i) => ({ dim, passo, i })));
/** indice passo → (argomento, dimostrazione) */
export function indicePassi(cat: Catalogo) {
  const m = new Map<string, { argId: string; dim: Dimostrazione; passo: Passo; i: number }>();
  for (const a of cat.argomenti) for (const x of passiDi(cat, a)) m.set(x.passo.id, { argId: a.id, ...x });
  return m;
}
/** peso d'orale di un argomento: numero di formulazioni (almeno 0,5), dimezzato se non è nella dispensa */
/** peso d'orale = numero di formulazioni (gli argomenti integrati fuori dispensa pesano come gli altri: sono chiesti, decisione del 14/10) */
export const pesoOrale = (a: Argomento) => Math.max(0.5, a.formulazioni.length);
