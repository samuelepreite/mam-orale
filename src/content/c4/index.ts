/** Capitolo C4 · Trasmissioni a cinghia: argomenti e dimostrazioni (registrati in src/content/index.ts). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { d071, frenoNastro } from './freno-nastro';
import { d055, d056, d058, d059, d060, d061, d137, rapporto } from './rapporto';
import { d057, d062, d063, d064, d065, d066, d067, eulero } from './eulero';
import { d068, d069, d070, velocitaOttima } from './velocita-ottima';

export const argomenti: ArgomentoContenuto[] = [rapporto, eulero, velocitaOttima, frenoNastro];
export const dimostrazioni: Dimostrazione[] = [
  d055, d056, d058, d059, d060, d061, d137,
  d057, d062, d063, d064, d065, d066, d067,
  d068, d069, d070,
  d071,
];
