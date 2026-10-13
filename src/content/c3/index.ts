/** Capitolo C3 · Freni e frizioni: argomenti e dimostrazioni (registrati in src/content/index.ts). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { d040, d041, reye } from './reye';
import { ceppi, d038, d039, d042, d043, d142 } from './ceppi';
import { d044, d045, d046, d050, pattino } from './pattino';
import { d047, d048, d049, disco } from './disco';
import { d052, frizionePianaArg } from './frizione-piana';
import { d053, frizioneConicaArg } from './frizione-conica';
import { d054, frizioneCentrifuga_ } from './frizione-centrifuga';
import { d051, partitoreArg } from './partitore';

export const argomenti: ArgomentoContenuto[] = [reye, ceppi, pattino, disco, frizionePianaArg, frizioneConicaArg, frizioneCentrifuga_, partitoreArg];
export const dimostrazioni: Dimostrazione[] = [
  d038, d039, d040, d041, d042, d043, d044, d045, d046, d047, d048, d049, d050, d051, d052, d053, d054, d142,
];
