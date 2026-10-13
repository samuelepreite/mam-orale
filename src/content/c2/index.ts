/** Capitolo C2 · Attrito e aderenza: argomenti e dimostrazioni (registrati in src/content/index.ts). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { attrito, d024 } from './attrito';
import { d025, perno } from './perno';
import { d026, impuntamento } from './impuntamento';
import { d027, d034, ribaltamento } from './ribaltamento';
import { d028, volvente } from './volvente';
import { cuscinetti, d036, d037 } from './cuscinetti';
import { d029, d030, d031, d032, d033, d035, d136, veicolo } from './veicolo';

export const argomenti: ArgomentoContenuto[] = [attrito, ribaltamento, impuntamento, perno, volvente, cuscinetti, veicolo];
export const dimostrazioni: Dimostrazione[] = [d024, d025, d026, d027, d028, d029, d030, d031, d032, d033, d034, d035, d036, d037, d136];
