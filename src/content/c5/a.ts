/** C5, parte a: indice dei contenuti di questa parte (ruote dentate a denti dritti e rotismi ordinari, pp. 155–173). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { d072, d073, d074, d075, d076, d077, d078, ruoteDentate } from './a-ruote-dentate';
import { d079, d080, d138, dentiPresa } from './a-denti-presa';
import { d081, d082, interferenza } from './a-interferenza';
import { d083, d084, d085, d086, forzeDritti } from './a-forze';
import { d087, d088, rotismiOrdinari } from './a-rotismi';

export const argomenti: ArgomentoContenuto[] = [ruoteDentate, dentiPresa, interferenza, forzeDritti, rotismiOrdinari];
export const dimostrazioni: Dimostrazione[] = [d072, d073, d074, d075, d076, d077, d078, d080, d079, d138, d081, d082, d083, d084, d085, d086, d087, d088];
