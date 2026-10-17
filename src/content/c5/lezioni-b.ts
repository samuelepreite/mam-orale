/** Lezioni discorsive del capitolo C5, parte b (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';
import { rendimentoEpi, rendimentoOrdinario } from './lezioni-b1';

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c5-rendimento-ordinario': rendimentoOrdinario,
  'c5-rendimento-epi': rendimentoEpi,
};
