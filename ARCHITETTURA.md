# MAM I orale — Architettura e piano per fasi (Passo 2)

Data: 13/10/2026 · Stato: **proposta, in attesa di conferma**. Si basa su `ANALISI.md` (45 + 4 argomenti, mappa
domande → dimostrazioni → pagine) e `NOTE_FONTI.md` (NF-01…NF-45).

## 1. Cosa riuso di SEIMAFI e come
Repository nuovo `samuelepreite/mam-orale` (SEIMAFI non si tocca). Copio i moduli generici e li adatto; tolgo tutto
ciò che serve allo scritto.

| SEIMAFI | Nel nuovo progetto |
|---|---|
| React + Vite + TS, KaTeX, D3, Vitest, Playwright, `vite-plugin-singlefile`, `tools/artifact.mjs` | uguale (three.js solo se servirà un visual 3D: oggi no) |
| `src/storage/store.ts`, `sync.ts` (chiave versionata, export/import, sincronizzazione `db` su `data/users/<id>/…`, fusione per unione) | chiave `mam:v1`; storia = tentativi di passo, ripassi, simulazioni, riscontri delle lezioni. Schede FSRS ricalcolate dalla storia come in SEIMAFI |
| `src/learning/srs.ts` (ts-fsrs), `mastery.ts`, `session.ts`, `plan.ts`, `stats.ts`, `chunks.ts` | stesse interfacce; l'unità della ripetizione diventa il **passo di dimostrazione** e la **voce di rubrica** (§3) |
| Lezioni guidate (`Lesson`, `LessonStep` con `derivazione`, `aggiunto`, `sample`/`val`/`checks`, voce italiana `ui/speech.ts`, riscontro per passo) | invariate nel formato approvato; ogni argomento ha la sua lezione |
| `useCrank`, `useClock`, `Transport`, cinematica pura in `engine/` con test | invariati; nuovi meccanismi per capitolo (§6) |
| `DrawCanvas` + `engine/draw.ts` (punti col dito, tolleranze) | base della **lavagna** (§5) e dei disegni con controllo |
| pagina «Esame» (orale), `learning/exam.ts`, `tools/percorri_*.mjs` | diventa la **simulazione dell'orale** (§4) |
| grafica: un carattere, colori per capitolo, tema scuro, barra laterale / barra in basso, «riduci movimento» | 7 colori per i 7 capitoli della dispensa |
| **Non serve**: prove parametriche in N, matricola, simulatore dello scritto, preorale, diagnosi delle unità, tabelle vapore/aria, `ExerciseRunner` | rimossi |

## 2. Modello dei dati (`src/content/types.ts`)
```ts
type Fonte =
  | { tipo: 'dispensa'; pag: number | [number, number]; eq?: string; fig?: string }   // pagina PDF (NF-03)
  | { tipo: 'deduzione'; da: string; spiegazione: string }                              // non scritto in D
  | { tipo: 'esterna'; ref: string; nota: string };                                     // NF-07
interface Correzione { nf: `NF-${number}`; dispensaScrive: string }  // NF-02: riga di D mostrata accanto a quella giusta

interface Argomento {
  id: string; cap: 'C1'|…|'C7'; titolo: string;
  formulazioni: { q: number; testo: string }[];       // le domande d'orale che lo chiedono (peso = numero)
  cosaDireSubito: string;                               // 2–3 frasi, ~20 s
  sistemaIpotesi: string[];
  disegno: Disegno;
  equazioneDiPartenza: Formula;                         // con Fonte
  dimostrazioni: string[];                              // id di Dimostrazione (dNNN della mappa)
  significato: string; fraseDaRicordare: string;
  daNonDire: { frase: string; perche: string; fonte?: Fonte }[];
  approfondimenti: Approfondimento[];                   // domande a catena del professore
  collegamenti: string[]; prerequisiti: string[];       // id di Argomento (da tools/analisi/argomenti.json)
  rubrica: VoceRubrica[];
  simboli: { simbolo: string; significato: string; altrove?: string }[];   // riquadro «simboli» (NF-08…13)
  fonteStato: 'sì' | 'parziale' | 'no';                // badge «non nella dispensa»
}
interface Dimostrazione {
  id: string;                     // 'd063' (numerazione del fascicolo, per tracciabilità)
  titolo: string; enunciato: string; ipotesi: string[];
  passi: Passo[];                 // catena completa, in ordine
  risultato: Formula; gancio: string;
  verifica: { sympy: string };    // id del controllo in tools/verifica/
}
interface Passo {
  id: string; latex: string; perche: string;          // il «perché» del passaggio
  fonte: Fonte; aggiunto?: boolean; correzione?: Correzione;
  chiave?: boolean;                                    // il passaggio che non si può saltare
  distrattori: { latex: string; errore: 'segno' | 'ipotesi' | 'termine-perso' | 'fattore' | 'indice' | 'convenzione'; spiega: string }[];
  num?: { sample: (rnd: () => number) => Record<string, number>; lhs: Fn; rhs: Fn };  // controllo numerico (Vitest)
}
interface Disegno {
  svg: string;                                         // figura di riferimento ridisegnata dalla dispensa (pag.)
  fonte: Fonte;
  elementi: { id: string; testo: string; obbligatorio: boolean }[];  // checklist: assi, versi, forze, angoli, CIR…
  controllo?: DrawTask;                                // facoltativo: costruzione con tolleranza (engine/draw.ts)
}
interface VoceRubrica { id: 'partenza'|'ipotesi'|'disegno'|'equazione'|'chiave'|'significato'|'nessun-da-non-dire'|string; testo: string; peso: number; attese: string[] }
interface Approfondimento { domanda: string; tipo: 'approfondimento' | 'collegamento'; argomento?: string; attesa: string; fonte: Fonte }
```
I contenuti sono dati tipizzati, uno per argomento (`src/content/c4/eulero.ts` …), registrati in
`src/content/index.ts`; `tools/analisi/argomenti.json` è la mappa di partenza e un test verifica che ogni domanda e ogni
dimostrazione dichiarata nella mappa abbia il suo contenuto quando il capitolo è segnato «pronto».

## 3. Allenatore di dimostrazioni (il cuore)
- **Livello 1 — guidata**: la lezione (formato SEIMAFI): ogni riga con il perché, passi «aggiunto», voce italiana,
  correzioni NF accanto alla riga di D.
- **Livello 2 — prossimo passaggio**: si nasconde una parte dei passi (prima i non-chiave, poi i chiave); per ogni passo
  nascosto: «qual è il prossimo passaggio?» con il passo giusto e 2–3 distrattori plausibili tipizzati (segno, ipotesi
  dimenticata, termine perso…), oppure scrittura libera con autocontrollo. L'errore scelto dice *quale* sbaglio è.
- **Livello 3 — foglio bianco**: lavagna vuota; lo studente scrive tutto, poi confronta passo per passo con la catena
  corretta e tocca **il passo dove si è fermato** (e quelli sbagliati).
- **Ripetizione distanziata per passo**: scheda FSRS `passo:<dim>:<passo>`; esito del passo → voto (sbagliato/fermato
  → Again, esitante → Hard, giusto → Good, giusto con sicurezza ≥ 4 → Easy). Il ripasso riparte **dal primo passo
  scaduto** della catena (mostrando i precedenti già fatti), non da capo. Il livello di fading per dimostrazione sale
  quando tutti i passi chiave sono a ritenibilità ≥ 0,9 (soglia didattica, configurabile).
- Sicurezza 1–5 prima di vedere la soluzione e calibrazione nella dashboard, come in SEIMAFI.

## 4. Simulazione dell'orale
- **Estrazione**: peso = formulazioni × (1 − padronanza) × urgenza (giorni all'orale, scadenze FSRS); argomenti «non
  nella dispensa» con peso ridotto (NF-07). Il professore virtuale legge la domanda (una delle formulazioni), avvia il tempo.
- **Risposta ad alta voce**: dettatura con Web Speech API (`it-IT`) se il browser la offre **e** la pagina pubblicata
  la consente (da verificare nell'iframe di claude.ai: il microfono non è tra le capability dichiarabili); in
  alternativa la **dettatura della tastiera** del telefono nel campo di testo (funziona sempre), oppure solo voce senza
  registrazione + autovalutazione. Più la **foto/immagine della lavagna**.
- **Correzione con Claude** — verificato nella skill `artifact-capabilities`: la pagina pubblicata può chiedere a
  Claude con la capability **`sample`** (anche con immagini: `sample: {images: true}`). Richiesta strutturata
  (`sample.json`): rubrica dell'argomento + catena corretta con pagine + «da non dire» + trascrizione (e immagine della
  lavagna) → `{voci: {id, punti, motivo}[], daNonDireDetti[], passoMancante?, domandeACatena: string[]}`. Le domande a
  catena sono scelte da Claude **tra gli approfondimenti curati** dell'argomento (o adattate alla risposta), così
  restano dentro la dispensa. Limiti dichiarati: una chiamata per risposta, solo su gesto esplicito («Correggi»), usa
  il piano Claude dello studente, consenso alla prima chiamata, `rate_limited` → autovalutazione guidata; la correzione
  è un aiuto, non un voto. Fuori da claude.ai (sviluppo, file singolo): solo autovalutazione guidata sulla rubrica.
- **Registro** delle simulazioni nella storia sincronizzata; ogni voce di rubrica mancata alimenta FSRS
  (`rubrica:<arg>:<voce>`) e il passo mancante segnalato alimenta la sua scheda.

## 5. Lavagna
- Componente `Lavagna` (da `DrawCanvas`): tratto a mano libera con pointer events (dito, penna con pressione, mouse),
  colori, gomma, annulla, fogli multipli, esporta PNG; funziona anche in orizzontale sul telefono.
- **Confronto**: affiancata al disegno di riferimento (SVG ridisegnato dalla dispensa) + checklist degli elementi che
  lo studente spunta (o che Claude valuta dall'immagine, se `sample` con immagini è disponibile).
- **Costruzione controllata** (dove si presta: triangolo delle velocità del manovellismo, poligono delle forze del
  ceppo, cerchio d'attrito, CIR, retta d'azione degli ingranaggi): modalità punti/rette con tolleranza riusando
  `engine/draw.ts` di SEIMAFI.

## 6. Meccanismi animati e diagrammi
Cinematica pura in `src/engine/` (nessuna UI), componenti in `src/diagrams/`, test che i numeri dell'animazione
coincidano con le formule della dispensa (p. es. ∫ della tensione sull'arco = Eulero; potenza animata = W(V) di p. 152;
punto di regime animato = intersezione C_m = C_u). Una previsione «prevedi, poi verifica» per ogni scheda con diagramma.
Ordine: quelli dei capitoli in lavorazione (C4: tensione lungo l'arco con centrifuga e zone aderenza/scorrimento,
W(V) con la velocità ottima, freno a nastro nei due versi; poi la lista del prompt capitolo per capitolo).

## 7. Verifica (vincolante)
| Livello | Cosa | Dove |
|---|---|---|
| Simbolica | ogni catena: ogni passo segue dal precedente (uguaglianza, sostituzione o operazione dichiarata) sotto le ipotesi; risultato finale = dispensa (o correzione NF) | `tools/verifica/cX.py` (SymPy, indipendente dal codice TS), esito in `tests/data/verifica_cX.json` |
| Numerica | ogni riga con `num` valutata su 25 campioni casuali (come `tests/lezioni.test.ts`) | `tests/dimostrazioni.test.ts` |
| Distrattori | ogni distrattore **diverso** dal passo giusto su almeno un campione | stesso test |
| Animazioni | numeri dei meccanismi = formule | `tests/meccanismi-cX.test.ts` |
| Tracciabilità | ogni passo ha `fonte`; `deduzione`/`esterna` con spiegazione; ogni `correzione.nf` esiste in NOTE_FONTI; ogni argomento della mappa coperto | `tests/provenance.test.ts` |
| UI | percorso automatico di lezioni, allenatore, simulazione (tema chiaro/scuro, telefono/computer, niente NaN, niente scroll orizzontale) | `tools/percorri_*.mjs` (Playwright, misure dal DOM) |

## 8. Piano per fasi (ognuna chiusa con test verdi, app e infografica pubblicate, copie nel progetto)
| Fase | Contenuto | Fatto quando |
|---|---|---|
| **a** | Impianto da SEIMAFI (storage, sync, FSRS, sessione, dashboard, piano, grafica), modello dati, allenatore 3 livelli, lavagna, prototipo della correzione con `sample`; **capitolo pilota C4** completo: 4 argomenti, 6 formulazioni, 18 dimostrazioni, 3 animazioni, disegni | test verdi; le 18 catene verificate in SymPy; percorso Playwright pulito; Samuele prova il formato |
| **b** | Gli altri capitoli, uno per sessione (C5 in due): C5, C3, C7, C2, C6, C1 (ordine per peso d'orale) | stesso criterio per capitolo; la mappa segna il capitolo «pronto» |
| **c** | Simulazione completa: estrazione pesata, domande a catena, registro, risultati nella ripetizione | una simulazione intera da telefono, con e senza Claude |
| **d** | Rifinitura sui riscontri (passi «non ho capito», simulazioni) | riscontri chiusi |

Continuità come in SEIMAFI: `RIPARTENZA.md` («IN CORSO/FINITA»), copie dei documenti e del codice
(`claude/codice-mam.tar.gz.b64`) nel progetto, app e infografica sempre allo stesso URL.

## 9. Rischi
| Rischio | Mitigazione |
|---|---|
| Dettatura vocale bloccata nell'iframe | dettatura della tastiera del telefono; registrazione non necessaria |
| `sample` non disponibile o esaurito | autovalutazione guidata sulla rubrica (sempre presente) |
| Contenuti chiesti ma assenti dalla dispensa | badge, peso ridotto, voce «da chiedere al docente» (NF-07) |
| Errori della dispensa | correzione con riga originale accanto (NF-02); il docente decide nei 4 punti aperti |
| Volume (49 argomenti, 142 catene) | contenuti come dati, test generati dai dati, una sessione per capitolo |
