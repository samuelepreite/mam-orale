/** Lezioni discorsive del capitolo C2 (docs/BRIEF_LEZIONI.md): argomento → testo della lezione. */
import type { LezioneArgomento } from '../types';
import { attrito, impuntamento, perno, ribaltamento } from './lezioni-a';
import { cuscinetti, volvente } from './lezioni-b';
import { veicolo } from './lezioni-c';

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c2-attrito': attrito,
  'c2-ribaltamento': ribaltamento,
  'c2-impuntamento': impuntamento,
  'c2-perno': perno,
  'c2-volvente': volvente,
  'c2-cuscinetti': cuscinetti,
  'c2-veicolo': veicolo,
};
