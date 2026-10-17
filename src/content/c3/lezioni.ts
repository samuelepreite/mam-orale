/** Lezioni discorsive del capitolo C3 (docs/BRIEF_LEZIONI.md): argomento → testo della lezione. */
import type { LezioneArgomento } from '../types';
import { ceppiLezione, reyeLezione } from './lezioni-tamburo';
import { discoLezione, pattinoLezione } from './lezioni-pattino-disco';
import { frizioneCentrifugaLezione, frizioneConicaLezione, frizionePianaLezione, partitoreLezione } from './lezioni-frizioni';

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c3-reye': reyeLezione,
  'c3-ceppi': ceppiLezione,
  'c3-pattino': pattinoLezione,
  'c3-disco': discoLezione,
  'c3-frizione-piana': frizionePianaLezione,
  'c3-frizione-conica': frizioneConicaLezione,
  'c3-frizione-centrifuga': frizioneCentrifugaLezione,
  'c3-partitore': partitoreLezione,
};
