# Brief — l'applicazione (interfaccia, apprendimento, salvataggio)

Progetto: `/home/claude/mam-orale`, web app per l'**orale** di Meccanica Applicata alle Macchine I. Lo studente
(Samuele) ha già SEIMAFI (`/home/claude/seimafi`, sola lettura: **non modificarla**), che funziona molto bene: questa
app ne riprende l'impianto. Leggi `ARCHITETTURA.md` (tutto), `README.md` di SEIMAFI (principi didattici e dove sono nel
codice), poi i file SEIMAFI che riusi. Altri agenti stanno scrivendo i **contenuti** dei capitoli in parallelo nella
stessa cartella (`src/content/cX/`, `src/engine/cX.ts`, `src/diagrams/cX.tsx`, `tools/verifica/`): **non toccarli**.
Il modello dei contenuti è `src/content/types.ts` (puoi solo **aggiungere campi facoltativi**, mai cambiarne di
esistenti); il registro è `src/content/index.ts`; l'esempio completo di contenuto è `src/content/c4/freno-nastro.ts`
(argomento `c4-freno-nastro`, dimostrazione `d071`), con l'animazione `src/diagrams/c4.tsx`. Oggi solo quel contenuto
esiste: l'app deve funzionare con quello e accogliere gli altri senza modifiche (gli argomenti senza contenuto
compaiono nell'elenco come «in preparazione», con titolo, domande e pagine dalla mappa).

## Cosa costruire
### 1. Salvataggio (`src/storage/`)
Da SEIMAFI `store.ts` e `sync.ts` (stesso schema: localStorage con chiave `mam:v1`, export/import JSON, sincronizzazione
con la capability `db` su `data/users/<id>/…` a blocchi, fusione per unione, `resetAt`, schede FSRS ricalcolate dalla
storia). Stato:
- `settings`: `ripassiObiettivo` (default 3: ogni argomento ripassato almeno N volte), `dataOrale?` (facoltativa: se
  c'è, l'ultima settimana è dedicata alle simulazioni; se manca il piano funziona lo stesso), `minutiGiorno` (default 45),
  `voce` (lettura ad alta voce), `tema?`.
- `passi: PassoLog[]` — `{ id, passoId, dimId, argId, at, livello: 1|2|3, esito: 'giusto'|'esitante'|'sbagliato'|'fermato', errore?: Errore, sicurezza?: 1..5 }`.
- `richiami: RichiamoLog[]` (domande di richiamo a inizio sessione e previsioni), `lezioni` (come SEIMAFI: passo
  raggiunto, `feedback` per passo `chiaro|veloce|lento|confuso` + nota), `argomenti: Record<id, { vistoAt?, livello }>`,
  `simulazioni: SimLog[]` — `{ id, at, argId, q, durataS, testo?, conLavagna, correttore: 'claude'|'auto', voci: Record<voceId, 0|0.5|1>, daNonDire: string[], passoMancante?, catena: { domanda, risposta?, voto? }[], nota? }`, `meta`.
Test di fusione come `tests/sync.test.ts` di SEIMAFI.

### 2. Apprendimento (`src/learning/`, puro e testato)
- `srs.ts` (ts-fsrs dietro la nostra interfaccia, come SEIMAFI): schede `passo:<id>`, `rubrica:<arg>:<voce>`,
  `disegno:<arg>`. Esito → voto: sbagliato/fermato → Again (torna domani), esitante → Hard, giusto → Good, giusto con
  sicurezza ≥ 4 → Easy. Il livello 1 (lezione guidata) non programma. Ricostruzione dalla storia.
- `mastery.ts`: padronanza di un argomento = media pesata della ritenibilità dei suoi passi (chiave × 2) e delle voci di
  rubrica delle simulazioni; padronanza di capitolo; livello di fading per dimostrazione (sale a 2 dopo la lezione, a 3
  quando i passi chiave hanno ritenibilità ≥ 0,9; scende se si sbaglia un passo chiave).
- `session.ts` «Oggi»: 1) **recupero attivo** a inizio sessione: 3–6 passi scaduti o più deboli di argomenti già visti
  (interleaving tra capitoli); 2) un argomento nuovo nell'ordine dei prerequisiti (mappa) se c'è tempo; 3) ripasso di una
  dimostrazione **dal primo passo scaduto** (mostrando i precedenti già fatti); 4) una simulazione d'orale ogni tanto
  (sempre nell'ultima settimana se c'è `dataOrale`). Durata stimata da `minutiGiorno`.
- `plan.ts` **parametrico, senza data obbligatoria**: obiettivo = ogni argomento con almeno `ripassiObiettivo` ripassi
  riusciti; stima i giorni che servono al ritmo attuale (ripassi al giorno degli ultimi 14 giorni) e, se c'è la data,
  dice se si è in tempo e quali argomenti sono a rischio; ordina gli argomenti da fare per prerequisiti × peso (numero di
  formulazioni) × (1 − padronanza). Gli argomenti «non nella dispensa» (`fonte: 'no'`) hanno peso dimezzato.
- `rubrica.ts`: rubrica standard costruita dal contenuto quando `contenuto.rubrica` manca: partenza (cosaDireSubito),
  ipotesi, disegno (elementi obbligatori), equazione di partenza, passaggio chiave (passi chiave), significato,
  nessun «da non dire».
- `oral.ts`: estrazione pesata della domanda (formulazioni × (1 − padronanza) × scadenze; niente ripetizioni ravvicinate);
  costruzione della richiesta a Claude e lettura della risposta (vedi §4); aggiornamento di FSRS dalle voci.
- `stats.ts`: dashboard (padronanza per capitolo e argomento, **passi dove mi blocco** (più Again), argomenti a rischio,
  calibrazione sicurezza/esito, simulazioni fatte, previsione dei ripassi dei prossimi 14 giorni).

### 3. Interfaccia (`src/ui/`)
Grafica come SEIMAFI (rileggi l'inizio di `/home/claude/seimafi/src/ui/styles.css`: token, tema scuro automatico e con
`data-theme`, Archivo, «riduci movimento»), ma un foglio di stile **nuovo e snello**; 7 colori di capitolo (dal freddo
al caldo C1→C7). Computer: barra laterale; telefono: barra in basso (Oggi · Argomenti · Orale · Progressi · Altro).
Definisci le classi dei disegni usate dai contenuti: `dw` (svg responsive), `dw-l` inchiostro, `dw-a` accento, `dw-f`
forze, `dw-v` velocità, `dw-d` tratteggio, `dw-m` attenuato, `dw-g` telaio, `dw-fill`, `dw-soft`, `dw-h` (punte: solo
riempimento), `dw-t` testo con varianti `dw-tl/ta/tf/tv/tm`, `dw-dot`; e le classi delle animazioni `mech`, `mech-body`,
`mech-svg`, `mech-side`, `mech-controls`, `mech-btn`, `mech-note`, `slider` (`.small`), `seg` (con `.on`), `readout`
(vedi `src/diagrams/anim.tsx`). Tutto deve leggersi in chiaro e in scuro (niente colori letterali).
Pagine:
- **Oggi**: la sessione di `session.ts` (recupero attivo → nuovo → ripasso → simulazione), con avanzamento.
- **Argomenti**: per capitolo (pagine PDF, padronanza), ogni argomento con stato (in preparazione / da fare / in corso /
  padroneggiato), formulazioni d'orale, badge «non nella dispensa» se `fonte` è 'no' o 'parziale'.
- **Argomento** con quattro schede:
  1. **Lezione** — formato SEIMAFI approvato (`/home/claude/seimafi/src/ui/components/Lesson.tsx`): generata dal
     contenuto, un passo per volta: cosa dire subito → sistema e ipotesi → disegno (SVG + checklist) → equazione di
     partenza → dimostrazione riga per riga (riga in KaTeX, il **perché**, etichetta «aggiunto», riquadro «la dispensa
     scrive…» con il numero NF quando c'è `correzione`; sui passi chiave prima la domanda «qual è il prossimo
     passaggio?» con passo giusto e distrattori mescolati, poi la spiegazione dell'errore scelto) → prova sul modello
     (animazione + previsione «prevedi, poi verifica»: i comandi si sbloccano dopo la previsione) → significato e frase
     da ricordare → da non dire → riassunto con le domande a catena. Voce italiana (`src/ui/speech.ts`) e **riscontro per
     passo** (chiaro / veloce / lento / non ho capito + nota) salvato e sincronizzato. Pensata per computer (lezione a
     sinistra, visual fisso a destra) e ottima da telefono.
  2. **Scheda** — tutto il contenuto in una pagina da ripasso (con simboli, fonti cliccabili «D p. 153», NF).
  3. **Allena** — l'allenatore a tre livelli (ARCHITETTURA §3): livello 2 nasconde prima i passi non chiave e poi i chiave
     (scelta tra passo giusto e distrattori, oppure «lo scrivo io» con autocontrollo); livello 3 foglio bianco con la
     **lavagna**, poi confronto passo per passo e tocco sul passo «dove mi sono fermato» e su quelli sbagliati; sicurezza
     1–5 prima della soluzione; ogni passo va in FSRS.
  4. **Orale** — simulazione su questo argomento (stessa pagina della simulazione generale).
- **Lavagna** (`components/Lavagna.tsx`, da `DrawCanvas` di SEIMAFI): tratto a mano libera con pointer events (dito,
  penna con pressione, mouse), tre colori (inchiostro, accento, rosso), gomma, annulla/ripeti, cancella, più fogli,
  orizzontale su telefono, esporta PNG (Blob) per Claude. Accanto o sotto: disegno di riferimento e checklist da
  spuntare.
- **Orale** (simulazione): il professore virtuale estrae una domanda (`oral.ts`), mostra la formulazione, avvia il tempo;
  lo studente risponde **ad alta voce**: se c'è `webkitSpeechRecognition`/`SpeechRecognition` (it-IT) si prova la
  dettatura (try/catch: nell'iframe di claude.ai il microfono può essere negato), altrimenti campo di testo con l'invito
  a usare la **dettatura della tastiera** del telefono, oppure «ho risposto a voce» senza testo. Facoltativa la lavagna.
  Poi **«Correggi con Claude»** (vedi §4) o autovalutazione guidata sulla rubrica; poi 1–2 **domande a catena**; poi
  esito, voci mancate, passo mancante, link alla lezione. Registro delle simulazioni.
- **Progressi** (dashboard di `stats.ts`) e **Altro** (impostazioni: ripassi obiettivo, data facoltativa, minuti al
  giorno, voce, tema, export/import, azzera con conferma nella pagina, stato della sincronizzazione, come funziona).
La UI non calcola nulla: ogni numero viene da `learning/` o `engine/`. Animazioni dei contenuti con
`VisualHost` di `src/diagrams/registry.tsx`.

### 4. Correzione con Claude (capability `sample`)
La pagina pubblicata dichiarerà `capabilities: { db: {}, user: {}, downloads: true, sample: { images: true } }`.
Leggi `/tmp/claude-0/bundled-skills/2.1.296/e931505fbe557ada4d5403cc8a364b1c/artifact-capabilities/0.2.76/sample.d.ts`
e `claude.d.ts` (autoritativi). Regole: `const sample = await window.claude?.use?.('sample')` (può essere `null`: allora
solo autovalutazione); chiamata **solo su gesto esplicito**; `sample.json(...)` con `modelTier: 'default'`; immagine della
lavagna in `images` solo se `sample.limits()` riporta `images`; errori `not_granted`/`rate_limited`/altro → messaggio
chiaro e autovalutazione. `oral.ts` costruisce un'unica richiesta autosufficiente (il modello non ha memoria):
istruzioni (sei il professore di MAM I; valuti solo contro la rubrica e la catena data; italiano; niente voto in
trentesimi), formulazione, rubrica con voci e attese, catena corretta (righe LaTeX con pagina), «da non dire», errori
NF della dispensa da non penalizzare se lo studente segue la dispensa, approfondimenti curati con id, trascrizione; chiede
JSON `{ voci: [{ id, punti: 0|0.5|1, motivo }], daNonDireDetti: string[], passoMancante: string|null, commento: string, domandeACatena: [{ id|null, domanda }] }`
(1–2 domande, preferibilmente tra gli approfondimenti curati). Una seconda chiamata facoltativa valuta le risposte alle
domande a catena. Validazione robusta della risposta (test con risposte malformate). Fuori da claude.ai: autovalutazione.

### 5. Build, test, controllo
- `npm run build:artifact` → `dist-artifact/mam-orale.html` (adatta `tools/artifact.mjs`); il file unico deve aprirsi
  anche fuori da claude.ai (senza sincronizzazione né Claude).
- Test Vitest: `learning` (mappatura esiti → voti, sessione, piano con e senza data, rubrica standard, oral: estrazione,
  prompt e parsing), `sync`, UI smoke con @testing-library su ogni pagina con il contenuto C4 (lezione fino in fondo,
  allenatore livello 2 e 3, simulazione con autovalutazione). Tutti i test esistenti devono restare verdi.
- `tools/percorri.mjs` (Playwright, Chromium `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`,
  vedi `/home/claude/seimafi/tools/percorri_lezioni.mjs`): percorre ogni argomento con contenuto (lezione fino alla fine,
  allenatore, simulazione senza Claude) in chiaro e scuro, telefono e computer; segnala NaN/undefined, scroll
  orizzontale, errori della console. Due o tre screenshot in `/home/claude/work/screen/` per il coordinatore.
- Controlli filtrati: `npx vitest run tests/<file>` durante il lavoro; `npx tsc --noEmit -p .` filtrato sui tuoi file.

## Messaggio finale (≤ 15 righe)
Cosa funziona, test e risultati, limiti (dettatura, Claude), cose che ti servono nei file condivisi. Non incollare codice.
