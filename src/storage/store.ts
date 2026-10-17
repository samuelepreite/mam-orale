/**
 * Persistenza locale (nessun backend): localStorage con chiave versionata `mam:v1` + export/import JSON.
 * Si salva solo la STORIA (passi, richiami, lezioni, argomenti, simulazioni, impostazioni): le schede FSRS (`srs`)
 * si ricalcolano dalla storia (learning/srs.ts `rebuildSrs`), come in SEIMAFI.
 */
import type { Errore } from '../content/types';

export const STORAGE_KEY = 'mam:v1';
export const SCHEMA_VERSION = 1;

export interface Settings {
  /** obiettivo del piano: ogni argomento ripassato con successo almeno N volte */
  ripassiObiettivo: number;
  /** data dell'orale (yyyy-mm-dd), facoltativa: se c'è, l'ultima settimana è per le simulazioni */
  dataOrale?: string;
  /** minuti di studio al giorno (durata stimata della sessione «Oggi») */
  minutiGiorno: number;
  /** lettura ad alta voce delle lezioni */
  voce: boolean;
  /** tema: assente = automatico (segue il sistema) */
  tema?: 'chiaro' | 'scuro';
  /** argomenti disattivati temporaneamente: spariscono da Oggi, Progressi, piano e orale (restano consultabili) */
  disattivati?: string[];
}

export type Esito = 'giusto' | 'esitante' | 'sbagliato' | 'fermato';

/** Un passo di dimostrazione ricostruito (lezione, allenatore, recupero attivo). */
export interface PassoLog {
  id: string;
  passoId: string;
  dimId: string;
  argId: string;
  at: string;
  /** 1 lezione guidata (non programma), 2 prossimo passaggio, 3 foglio bianco */
  livello: 1 | 2 | 3;
  esito: Esito;
  /** tipo di errore del distrattore scelto */
  errore?: Errore;
  /** sicurezza dichiarata prima della soluzione (1–5) */
  sicurezza?: number;
  /** giro di allenamento a cui appartiene (stesso id per i passi di una stessa prova) */
  giro?: string;
  /** contesto: allenatore, recupero attivo della sessione, ripasso della sessione, lezione */
  dove?: 'allena' | 'recupero' | 'ripasso' | 'lezione';
}

/**
 * Richiamo: previsioni («prevedi, poi verifica»: registrate, non programmate) e disegni alla lavagna
 * (`disegno:<arg>`: checklist degli elementi obbligatori, programmata).
 */
export interface RichiamoLog {
  id: string;
  qid: string; // 'previsione:<id>' | 'disegno:<arg>'
  argId: string;
  at: string;
  corretto: boolean;
}

/** Giudizio dello studente su un passo di una lezione guidata (serve a tarare le lezioni). */
export type Riscontro = 'chiaro' | 'veloce' | 'lento' | 'confuso';
export interface LezioneState {
  /** indice del passo più avanzato raggiunto */
  passo: number;
  startedAt: string;
  doneAt?: string;
  /** stepId → giudizio (l'ultimo dato vince) */
  feedback: Record<string, { v: Riscontro; note?: string; at: string }>;
}

export interface ArgomentoState {
  /** lezione finita (o primo allenamento): da qui l'argomento entra nei ripassi */
  vistoAt?: string;
  /** livello di allenamento più alto raggiunto */
  livello: 1 | 2 | 3;
}

export interface SimLog {
  id: string;
  at: string;
  argId: string;
  /** numero della domanda d'orale (0 = argomento senza formulazione propria) */
  q: number;
  durataS: number;
  testo?: string;
  conLavagna: boolean;
  correttore: 'claude' | 'auto';
  /** voce di rubrica → punti */
  voci: Record<string, 0 | 0.5 | 1>;
  daNonDire: string[];
  passoMancante?: string;
  catena: { domanda: string; risposta?: string; voto?: 0 | 0.5 | 1 }[];
  nota?: string;
  /** ultima modifica (le domande a catena si valutano dopo): vince nella fusione */
  aggiornatoAt?: string;
}

export interface AppState {
  version: number;
  settings: Settings;
  passi: PassoLog[];
  richiami: RichiamoLog[];
  lezioni: Record<string, LezioneState>;
  argomenti: Record<string, ArgomentoState>;
  simulazioni: SimLog[];
  /** schede FSRS (non sincronizzate: si ricalcolano dalla storia) */
  srs: Record<string, unknown>;
  meta: { settingsAt?: string; resetAt?: string };
}

export const DEFAULT_SETTINGS: Settings = { ripassiObiettivo: 3, minutiGiorno: 45, voce: true };

export const defaultState = (): AppState => ({
  version: SCHEMA_VERSION,
  settings: { ...DEFAULT_SETTINGS },
  passi: [],
  richiami: [],
  lezioni: {},
  argomenti: {},
  simulazioni: [],
  srs: {},
  meta: {},
});

const arr = <T>(x: unknown): T[] => (Array.isArray(x) ? (x as T[]) : []);
const obj = <T>(x: unknown): T => (x && typeof x === 'object' && !Array.isArray(x) ? (x as T) : ({} as T));

/** Porta dati (anche parziali o vecchi) alla versione corrente; rifiuta file di versioni più recenti. */
export function migrate(raw: unknown): AppState {
  const base = defaultState();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<AppState>;
  if (typeof r.version !== 'number' || r.version > SCHEMA_VERSION) throw new Error('File non riconosciuto o creato da una versione più recente dell\'app.');
  const settings = { ...base.settings, ...obj<Partial<Settings>>(r.settings) };
  settings.ripassiObiettivo = clampInt(settings.ripassiObiettivo, 1, 10, 3);
  settings.minutiGiorno = clampInt(settings.minutiGiorno, 10, 240, 45);
  if (settings.dataOrale && !/^\d{4}-\d{2}-\d{2}$/.test(settings.dataOrale)) delete settings.dataOrale;
  return {
    version: SCHEMA_VERSION,
    settings,
    passi: arr<PassoLog>(r.passi).filter((p) => p && typeof p.passoId === 'string' && typeof p.at === 'string'),
    richiami: arr<RichiamoLog>(r.richiami).filter((p) => p && typeof p.qid === 'string' && typeof p.at === 'string'),
    lezioni: obj(r.lezioni),
    argomenti: obj(r.argomenti),
    simulazioni: arr<SimLog>(r.simulazioni).filter((s) => s && typeof s.argId === 'string' && typeof s.at === 'string'),
    srs: obj(r.srs),
    meta: obj(r.meta),
  };
}

function clampInt(v: unknown, lo: number, hi: number, d: number) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d;
}

export function load(storage: Pick<Storage, 'getItem'> | undefined = safeStorage()): AppState {
  try {
    const txt = storage?.getItem(STORAGE_KEY);
    return txt ? migrate(JSON.parse(txt)) : defaultState();
  } catch {
    return defaultState();
  }
}

export function save(state: AppState, storage: Pick<Storage, 'setItem'> | undefined = safeStorage()): boolean {
  try {
    // le schede si ricalcolano: non serve salvarle (e così il file resta piccolo)
    storage?.setItem(STORAGE_KEY, JSON.stringify({ ...state, srs: {} }));
    return true;
  } catch {
    return false;
  }
}

export function exportJSON(state: AppState): string {
  return JSON.stringify({ app: 'mam-orale', exportedAt: new Date().toISOString(), ...state, srs: {} }, null, 1);
}

export function importJSON(text: string): AppState {
  const raw = JSON.parse(text);
  if (raw?.app !== undefined && raw.app !== 'mam-orale') throw new Error('Il file non è un export di MAM I orale.');
  return migrate(raw);
}

function safeStorage(): Storage | undefined {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : undefined;
  } catch {
    return undefined;
  }
}

export const newId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
