/**
 * Registro dei contenuti ridotto per i test dell'app: la mappa completa più il solo contenuto d'esempio C4
 * (freno a nastro, d071). Stessa interfaccia di src/content/index.ts: i test dell'app non dipendono dai capitoli
 * che gli altri agenti stanno scrivendo.
 */
import { CAPITOLI, DOMANDE, MAPPA } from '../src/content/mappa';
import type { Argomento, ArgomentoContenuto, CapId, Dimostrazione } from '../src/content/types';
import { d071, frenoNastro } from '../src/content/c4/freno-nastro';

export const CONTENUTI: Record<string, ArgomentoContenuto> = { [frenoNastro.id]: frenoNastro };
export const DIMOSTRAZIONI: Record<string, Dimostrazione> = { d071 };
export const ARGOMENTI: Argomento[] = MAPPA.map((m) => ({ ...m, formulazioni: m.domande.map((q) => ({ q, testo: DOMANDE[q] })), contenuto: CONTENUTI[m.id] }));
export const argomento = (id: string) => ARGOMENTI.find((a) => a.id === id);
export const argomentiDel = (cap: CapId) => ARGOMENTI.filter((a) => a.cap === cap);
export const pronti = () => ARGOMENTI.filter((a) => a.contenuto);
export const dimostrazioniDi = (a: Argomento): Dimostrazione[] => (a.contenuto?.dimostrazioni ?? []).map((id) => DIMOSTRAZIONI[id]).filter(Boolean);
export const argomentoDiPasso = (passoId: string) => ARGOMENTI.find((a) => a.contenuto?.dimostrazioni.includes(passoId.split('.')[0]));
export { CAPITOLI, DOMANDE };
