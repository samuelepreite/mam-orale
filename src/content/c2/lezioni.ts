/** Lezioni discorsive del capitolo C2 (docs/BRIEF_LEZIONI.md): argomento → testo della lezione. */
import type { LezioneArgomento } from '../types';
import { attrito, impuntamento, perno, ribaltamento } from './lezioni-a';

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c2-attrito': attrito,
  'c2-ribaltamento': ribaltamento,
  'c2-impuntamento': impuntamento,
  'c2-perno': perno,
};
