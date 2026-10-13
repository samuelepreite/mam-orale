/** Capitolo C5 · Ingranaggi e rotismi: due parti (a: dentature dritte e rotismi ordinari; b: rendimenti, epicicloidali, elicoidali, coniche). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import * as a from './a';
import * as b from './b';

export const argomenti: ArgomentoContenuto[] = [...a.argomenti, ...b.argomenti];
export const dimostrazioni: Dimostrazione[] = [...a.dimostrazioni, ...b.dimostrazioni];
