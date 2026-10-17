/** Lezioni discorsive del capitolo C5, parte b (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';
import { rendimentoEpi, rendimentoOrdinario } from './lezioni-b1';
import { differenziale, epicicloidali } from './lezioni-b2';
import { coniche, elicoidaliForze, elicoidaliPresa, elicoidaliZmin } from './lezioni-b3';

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c5-rendimento-ordinario': rendimentoOrdinario,
  'c5-epicicloidali': epicicloidali,
  'c5-differenziale': differenziale,
  'c5-rendimento-epi': rendimentoEpi,
  'c5-elicoidali-presa': elicoidaliPresa,
  'c5-elicoidali-zmin': elicoidaliZmin,
  'c5-elicoidali-forze': elicoidaliForze,
  'c5-coniche': coniche,
};
