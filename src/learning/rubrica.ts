/**
 * Rubrica dell'orale (ARCHITETTURA §4). Se il contenuto non ne dà una (`contenuto.rubrica`), si costruisce quella
 * standard dai campi dell'argomento: partenza, ipotesi, disegno, equazione di partenza, passaggio chiave,
 * significato, nessun «da non dire». Pesi (scelta didattica): passaggio chiave 2, le altre voci 1.
 */
import type { Argomento, VoceRubrica } from '../content/types';
import { CATALOGO, dimsDi, type Catalogo } from './catalogo';

export const VOCI_STANDARD = ['partenza', 'ipotesi', 'disegno', 'equazione', 'chiave', 'significato', 'da-non-dire'] as const;

export function rubricaStandard(a: Argomento, cat: Catalogo = CATALOGO): VoceRubrica[] {
  const c = a.contenuto;
  if (!c) return [];
  const chiavi = dimsDi(cat, a).flatMap((d) => d.passi.filter((p) => p.chiave).map((p) => `${d.id}: $${p.latex}$`));
  return [
    { id: 'partenza', testo: 'Partenza: dice subito di che cosa si tratta e come lo studia', peso: 1, attese: [c.cosaDireSubito] },
    { id: 'ipotesi', testo: 'Sistema e ipotesi dichiarate', peso: 1, attese: c.sistemaIpotesi },
    { id: 'disegno', testo: 'Disegno con gli elementi obbligatori', peso: 1, attese: c.disegno.elementi.filter((e) => e.obbligatorio).map((e) => e.testo) },
    { id: 'equazione', testo: 'Equazione di partenza', peso: 1, attese: [`$${c.equazioneDiPartenza.latex}$`, c.equazioneDiPartenza.spiegazione] },
    { id: 'chiave', testo: 'Passaggio chiave della dimostrazione', peso: 2, attese: chiavi.length ? chiavi : dimsDi(cat, a).map((d) => `${d.id}: $${d.risultato.latex}$`) },
    { id: 'significato', testo: 'Significato fisico del risultato', peso: 1, attese: [c.significato, c.fraseDaRicordare] },
    { id: 'da-non-dire', testo: 'Nessuna delle frasi «da non dire»', peso: 1, attese: c.daNonDire.map((d) => `non dice: «${d.frase}»`) },
  ];
}

export const rubricaDi = (a: Argomento, cat: Catalogo = CATALOGO): VoceRubrica[] => (a.contenuto?.rubrica?.length ? a.contenuto.rubrica : rubricaStandard(a, cat));

/** Punteggio pesato 0–1 delle voci (voci non valutate = 0). */
export function punteggio(rubrica: VoceRubrica[], voci: Record<string, number>): number {
  const tot = rubrica.reduce((s, v) => s + v.peso, 0);
  if (tot <= 0) return 0;
  return rubrica.reduce((s, v) => s + v.peso * Math.max(0, Math.min(1, voci[v.id] ?? 0)), 0) / tot;
}

/** Voci mancate (punti < 1), nell'ordine della rubrica. */
export const vociMancate = (rubrica: VoceRubrica[], voci: Record<string, number>) => rubrica.filter((v) => (voci[v.id] ?? 0) < 1);
