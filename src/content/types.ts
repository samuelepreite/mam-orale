/**
 * Modello dei contenuti (ARCHITETTURA.md §2). Tutto è dato tipizzato: la UI non calcola nulla.
 *
 * Regole di tracciabilità (tests/provenance.test.ts):
 *  - ogni passo, formula e disegno ha una `fonte`;
 *  - `deduzione` ed `esterna` hanno una spiegazione non vuota;
 *  - `correzione.nf` esiste in NOTE_FONTI.md;
 *  - pagine PDF tra 1 e 223 (NF-03).
 */

export type CapId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7';

export type Fonte =
  /** pagina PDF della dispensa (o intervallo); eq./fig. solo se stampati (scansioni del libro) */
  | { tipo: 'dispensa'; pag: number | [number, number]; eq?: string; fig?: string }
  /** non scritto nella dispensa: si ricava da ciò che c'è (dire da cosa e come) */
  | { tipo: 'deduzione'; da: string; spiegazione: string }
  /** fonte esterna dichiarata (NF-07) */
  | { tipo: 'esterna'; ref: string; nota: string };

/** La dispensa sbaglia qui (verificato): si mostra la sua riga accanto a quella corretta (NF-02). */
export interface Correzione {
  nf: string; // 'NF-23'
  dispensaScrive: string; // LaTeX o testo della riga originale
}

export interface Formula {
  latex: string;
  fonte: Fonte;
  correzione?: Correzione;
}

/** Tipi di errore dei distrattori (dice allo studente quale sbaglio ha scelto). */
export type Errore = 'segno' | 'ipotesi' | 'termine-perso' | 'fattore' | 'indice' | 'convenzione' | 'concetto';

export type Vars = Record<string, number>;

export interface Distrattore {
  latex: string;
  errore: Errore;
  /** perché è sbagliato (mostrato dopo la scelta) */
  spiega: string;
  /** facoltativo: i due membri valutati su un campione; il test verifica che NON coincidano */
  num?: (v: Vars) => [number, number];
}

export interface Passo {
  /** univoco in tutta l'app: '<dimostrazione>.<n>', p. es. 'd071.3' */
  id: string;
  /** la riga come si scrive alla lavagna (LaTeX, una o più uguaglianze) */
  latex: string;
  /** il perché del passaggio, testo con $…$ in linea */
  perche: string;
  fonte: Fonte;
  /** passaggio sottinteso nella dispensa, aggiunto per chiarezza */
  aggiunto?: boolean;
  /** il passaggio che non si può saltare all'orale */
  chiave?: boolean;
  correzione?: Correzione;
  /** 2–3 passaggi sbagliati plausibili (livello 2 dell'allenatore); il primo passo può non averne */
  distrattori: Distrattore[];
  /**
   * controllo numerico della riga (Vitest): i due membri dell'uguaglianza valutati sul campione `sample` della
   * dimostrazione. Omesso per le righe che non sono uguaglianze (ipotesi, definizioni a parole).
   */
  num?: (v: Vars) => [number, number];
  /** visual da mostrare con questo passo nella lezione */
  visual?: Visual;
}

export interface Dimostrazione {
  /** numerazione del fascicolo delle 142 dimostrazioni: 'd071' (la mappa lo lega all'argomento) */
  id: string;
  titolo: string;
  enunciato: string;
  ipotesi: string[];
  /** campione casuale di valori fisicamente sensati per i controlli numerici dei passi */
  sample?: (rnd: () => number) => Vars;
  passi: Passo[];
  risultato: Formula;
  /** gancio di memoria (una frase) */
  gancio: string;
}

/** Elementi grafici animati o interattivi (registro in src/diagrams/registry.tsx). */
export type Visual = { kind: 'meccanismo'; id: string; params?: Record<string, number | string> };

export interface ElementoDisegno {
  id: string;
  testo: string; // «asse x orizzontale verso destra», «forza T₁ sul ramo teso»…
  obbligatorio: boolean;
}

export interface Disegno {
  /** SVG di riferimento (costruito con src/content/svg.ts), ridisegnato dalla figura della dispensa */
  svg: string;
  didascalia: string;
  fonte: Fonte;
  /** checklist alla lavagna, in ordine di disegno */
  elementi: ElementoDisegno[];
}

export interface VoceRubrica {
  id: string; // 'partenza' | 'ipotesi' | 'disegno' | 'equazione' | 'chiave' | 'significato' | 'da-non-dire' | altro
  testo: string;
  peso: number;
  /** cosa deve comparire nella risposta per avere la voce */
  attese: string[];
}

export interface Approfondimento {
  domanda: string;
  tipo: 'approfondimento' | 'collegamento';
  /** argomento collegato (id della mappa), se è un collegamento */
  argomento?: string;
  /** risposta attesa in 1–3 frasi */
  attesa: string;
  fonte: Fonte;
}

export interface Previsione {
  id: string;
  domanda: string;
  opzioni: string[];
  corretta: number;
  spiega: string;
  /** ricalcola l'indice corretto con le funzioni del motore (tests/previsioni) */
  verify?: () => number;
  visual?: Visual;
}

export interface Simbolo {
  simbolo: string; // LaTeX
  significato: string;
  /** come lo chiamano le altre fonti, se diverso (NF-08…NF-13) */
  altrove?: string;
}

/** Contenuto di un argomento d'orale. Titolo, capitolo, domande, pagine, prerequisiti e peso vengono dalla mappa. */
export interface ArgomentoContenuto {
  id: string;
  cosaDireSubito: string;
  sistemaIpotesi: string[];
  disegno: Disegno;
  equazioneDiPartenza: Formula & { spiegazione: string };
  /** id delle dimostrazioni (stesse della mappa, in ordine di esposizione) */
  dimostrazioni: string[];
  significato: string;
  fraseDaRicordare: string;
  daNonDire: { frase: string; perche: string; fonte?: Fonte }[];
  approfondimenti: Approfondimento[];
  simboli: Simbolo[];
  /** rubrica dell'orale: se assente si usa quella standard costruita dai campi (learning/rubrica.ts) */
  rubrica?: VoceRubrica[];
  visuali?: Visual[];
  previsioni?: Previsione[];
  /** note sulle fonti pertinenti */
  nf?: string[];
  /** testo discorsivo della lezione (agganciato dal registro) */
  lezione?: LezioneArgomento;
}

/**
 * Testo discorsivo della lezione guidata (docs/BRIEF_LEZIONI.md): scritto per chi parte da zero, una idea alla volta.
 * Sta in un file separato per capitolo (src/content/cX/lezioni.ts) e viene agganciato al contenuto nel registro.
 */
export interface LezioneArgomento {
  /** perché ci interessa: la situazione concreta, il problema da risolvere, la domanda che guida la lezione */
  perche: string;
  /** l'idea fisica a parole, senza formule (o quasi): cosa succede e perché; un'analogia se aiuta */
  idea: string;
  /** cosa devi già sapere: ogni prerequisito rispiegato da zero in poche righe */
  richiami: { titolo: string; testo: string }[];
  /** il perché di ogni ipotesi, nello stesso ordine di `sistemaIpotesi` */
  ipotesiPerche: string[];
  /** come costruire il disegno alla lavagna, nell'ordine, dicendo perché ogni elemento serve */
  disegnoGuida: string;
  /** le tappe del ragionamento (3–6), da mostrare prima della dimostrazione */
  mappa: string[];
  /** per ogni dimostrazione: dove andiamo e con quale strategia; cosa abbiamo ottenuto, a parole */
  dims: Record<string, { introduzione: string; riepilogo: string }>;
  /** per ogni passo: `prima` = cosa vogliamo ottenere e il ragionamento che porta alla riga (senza svelarla);
   *  `dopo` = come si legge la riga ottenuta, che cosa dice, perché è sensata; `tappa` = indice in `mappa` */
  passi: Record<string, { prima: string; dopo: string; tappa?: number }>;
  /** come raccontarlo all'orale, dopo aver capito (collega cosaDireSubito a quello che si è visto) */
  racconto: string;
}

/** Voce della mappa (tools/analisi/argomenti.json). */
export interface ArgomentoMappa {
  id: string;
  cap: CapId;
  titolo: string;
  domande: number[];
  dimostrazioni: number[];
  pagine: string;
  fonte: 'sì' | 'parziale' | 'no';
  nota: string;
  prerequisiti: string[];
  collegamenti: string[];
  complemento: boolean;
  peso: number;
}

export interface Argomento extends ArgomentoMappa {
  formulazioni: { q: number; testo: string }[];
  contenuto?: ArgomentoContenuto;
}
