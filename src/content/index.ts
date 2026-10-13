/** Registro dei contenuti: unisce la mappa (titoli, domande, pagine, prerequisiti) e i contenuti dei capitoli. */
import { CAPITOLI, DOMANDE, MAPPA } from './mappa';
import type { Argomento, ArgomentoContenuto, CapId, Dimostrazione } from './types';
import * as c1 from './c1';
import * as c2 from './c2';
import * as c3 from './c3';
import * as c4 from './c4';
import * as c5 from './c5';
import * as c6 from './c6';
import * as c7 from './c7';

const CAPS = [c1, c2, c3, c4, c5, c6, c7];

export const CONTENUTI: Record<string, ArgomentoContenuto> = Object.fromEntries(CAPS.flatMap((c) => c.argomenti).map((a) => [a.id, a]));
export const DIMOSTRAZIONI: Record<string, Dimostrazione> = Object.fromEntries(CAPS.flatMap((c) => c.dimostrazioni).map((d) => [d.id, d]));

export const ARGOMENTI: Argomento[] = MAPPA.map((m) => ({
  ...m,
  formulazioni: m.domande.map((q) => ({ q, testo: DOMANDE[q] })),
  contenuto: CONTENUTI[m.id],
}));
export const argomento = (id: string) => ARGOMENTI.find((a) => a.id === id);
export const argomentiDel = (cap: CapId) => ARGOMENTI.filter((a) => a.cap === cap);
export const pronti = () => ARGOMENTI.filter((a) => a.contenuto);
/** dimostrazioni di un argomento con contenuto (nell'ordine del contenuto) */
export const dimostrazioniDi = (a: Argomento): Dimostrazione[] => (a.contenuto?.dimostrazioni ?? []).map((id) => DIMOSTRAZIONI[id]).filter(Boolean);
export const argomentoDiPasso = (passoId: string) => ARGOMENTI.find((a) => a.contenuto?.dimostrazioni.includes(passoId.split('.')[0]));
export { CAPITOLI, DOMANDE };
