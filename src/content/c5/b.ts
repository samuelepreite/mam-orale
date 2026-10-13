/** C5, parte b: rendimenti, rotismi epicicloidali, differenziale, ruote elicoidali e coniche (dispensa pp. 174–191). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { d089, d090, d091, d094, epicicloidali } from './b-epicicloidali';
import { d141, differenzialeArg } from './b-differenziale';
import { d092, d093, d140, rendimentoEpiArg, rendimentoOrdinario } from './b-rendimenti';
import { d095, d096, d097, d098, d139, elicoidaliForze, elicoidaliPresa, elicoidaliZmin } from './b-elicoidali';
import { coniche, d099, d100 } from './b-coniche';

export const argomenti: ArgomentoContenuto[] = [
  rendimentoOrdinario, epicicloidali, differenzialeArg, rendimentoEpiArg, elicoidaliPresa, elicoidaliZmin, elicoidaliForze, coniche,
];
export const dimostrazioni: Dimostrazione[] = [d089, d090, d091, d092, d093, d094, d095, d096, d097, d098, d099, d100, d139, d140, d141];
