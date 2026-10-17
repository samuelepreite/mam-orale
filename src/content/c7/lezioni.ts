/** Lezioni discorsive del capitolo C7 (due parti). */
import type { LezioneArgomento } from '../types';
import { LEZIONI as A } from './lezioni-a';
import { LEZIONI as B } from './lezioni-b';

export const LEZIONI: Record<string, LezioneArgomento> = { ...A, ...B };
