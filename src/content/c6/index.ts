/** Capitolo C6 · Accoppiamento motore–carico: argomenti e dimostrazioni (registrati in src/content/index.ts). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { d101, d102, d103, d104, diretto } from './diretto';
import { d105, d106, d107, trasmissione } from './trasmissione';
import { d108, d109, d110, frizione } from './frizione';

export const argomenti: ArgomentoContenuto[] = [diretto, trasmissione, frizione];
export const dimostrazioni: Dimostrazione[] = [d101, d102, d103, d104, d105, d106, d107, d108, d109, d110];
