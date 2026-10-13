/** Capitolo C1 · Cinematica e dinamica dei meccanismi piani: argomenti e dimostrazioni (registrati in src/content/index.ts). */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { cinematicaPunto, d001, d002, d003 } from './cinematica-punto';
import { d004, d005, d006, d007, velocita } from './velocita';
import { d010, d011, d012, d013, manovellismoArg } from './manovellismo';
import { d008, d009, glifoArg } from './glifo';
import { d014, d015, motoRelativo } from './moto-relativo';
import { cinematicaAnalitica, d016 } from './cinematica-analitica';
import { d017, d018, d019, d020, d021, d022, d023, staticaDinamica } from './statica-dinamica';

export const argomenti: ArgomentoContenuto[] = [cinematicaPunto, velocita, manovellismoArg, glifoArg, motoRelativo, cinematicaAnalitica, staticaDinamica];
export const dimostrazioni: Dimostrazione[] = [d001, d002, d003, d004, d005, d006, d007, d008, d009, d010, d011, d012, d013, d014, d015, d016, d017, d018, d019, d020, d021, d022, d023];
