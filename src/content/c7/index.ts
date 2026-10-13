/** Capitolo C7 · Meccanica delle vibrazioni: argomenti e dimostrazioni (registrati in src/content/index.ts). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { d111, d112, d113, d114, libere } from './libere';
import { d115, d116, d117, d118, d119, d120, d121, smorzate } from './smorzate';
import { complexRepl, d123 } from './complex';
import { d122, d124, d125, d126, d127, d128, forzate } from './forzate';
import { d129, d131, vincolo } from './vincolo';
import { d130, d132, d133, trasmissibilitaArg } from './trasmissibilita';
import { d134, d135, eccentricaArg } from './eccentrica';

export const argomenti: ArgomentoContenuto[] = [libere, smorzate, complexRepl, forzate, eccentricaArg, vincolo, trasmissibilitaArg];
export const dimostrazioni: Dimostrazione[] = [
  d111, d112, d113, d114,
  d115, d116, d117, d118, d119, d120, d121,
  d122, d123, d124, d125, d126, d127, d128,
  d129, d130, d131, d132, d133,
  d134, d135,
];
