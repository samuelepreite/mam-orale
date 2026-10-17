# Brief — riscrittura discorsiva delle lezioni

Lo studente (Samuele) ha provato le lezioni e dice: **«è difficile capire, mi perdo nei passaggi»**. Le lezioni attuali
mostrano le righe della dimostrazione con un «perché» telegrafico: sono scritte per chi sa già. Il tuo compito è
scrivere, per ogni argomento del tuo capitolo, il **testo discorsivo** che accompagna lo studente da zero: un buon
professore seduto accanto a lui, che non dà niente per scontato.

## Cosa sappiamo su come si impara (e come lo applichi)
1. **Memoria di lavoro limitata (carico cognitivo).** Si tengono a mente 3–4 cose nuove alla volta. → Una idea per
   paragrafo; frasi brevi; un simbolo nuovo per volta, sempre detto a parole la prima volta che compare («T₁, cioè la
   tensione del capo più tirato»). Mai due passaggi algebrici in una frase.
2. **Prima il perché, poi il come (motivazione e attivazione).** Il cervello trattiene ciò che risponde a una domanda
   che si è posto. → Ogni lezione parte da un problema concreto e da una domanda («come fa una forza piccola sulla leva
   a fermare un tamburo che gira?»).
3. **Dal concreto all'astratto.** → Prima l'immagine fisica (cosa si vede, cosa si sente con le mani, un oggetto vero:
   bicicletta, auto, lavatrice, porta, corda attorno a un palo), poi il modello, poi la formula.
4. **Collegare al già noto (prerequisiti attivati).** Ciò che non si aggancia a qualcosa di noto si perde. → I
   `richiami` rispiegano da zero ciò che serve (equilibrio di un corpo, attrito di Coulomb, prodotto vettoriale,
   derivata di un esponenziale…): 3–6 righe ciascuno, con il senso fisico, non solo la formula.
5. **Organizzatore anticipato (mappa).** Sapere dove si va riduce lo smarrimento. → `mappa`: 3–6 tappe dette con
   parole semplici («1. guardo un pezzettino di cinghia; 2. scrivo le forze; 3. …»). Ogni passo dichiara la sua tappa.
6. **Esempio svolto con auto-spiegazione.** Si impara di più da un passaggio se prima ci si chiede che cosa serve e
   dopo si controlla che abbia senso. → Per ogni passo: `prima` = che cosa vogliamo ottenere adesso e qual è il
   ragionamento che ci porta lì (senza scrivere la formula: lo studente deve poterla prevedere); `dopo` = come si legge
   la riga appena scritta, a parole, e un **controllo di buon senso** (segno, casi limite, unità, «se f = 0…»).
7. **Doppia codifica.** Parole + figura insieme. → Nei testi rimanda alla figura («nel disegno, il capo a sinistra»),
   alla posizione, ai versi.
8. **Recupero e interrogazione elaborativa.** → Domande retoriche brevi dentro il testo («Perché proprio β? Perché…»).
   Le domande «qual è il prossimo passaggio?» ci sono già sui passi chiave: il tuo `prima` deve preparare la risposta.
9. **Niente salti.** Se una riga richiede un passaggio algebrico (sostituire, raccogliere, dividere, integrare,
   approssimare sin dθ ≈ dθ…), il `prima` o il `dopo` lo dice esplicitamente. Ogni approssimazione si giustifica.
10. **Riepilogo a fine dimostrazione.** → `dims[id].riepilogo`: 3–5 frasi che raccontano il filo dall'inizio alla fine,
    senza formule nuove.

## Stile
- Italiano parlato e chiaro, seconda persona («guarda», «chiediti»), tono calmo; niente gergo non spiegato.
- Discorsivo ma **denso di significato**, non prolisso: niente frasi vuote («è molto importante notare che…»).
- Formule in linea con `$…$` (KaTeX) solo quando servono; prima a parole, poi il simbolo.
- Usa la **notazione della dispensa** (quella dei contenuti esistenti: f, τ, ω̇, θ…).
- Nessun contenuto nuovo che contraddica la dimostrazione: il testo spiega le righe che ci sono. Se ti accorgi che una
  riga è sbagliata o oscura, scrivilo nel messaggio finale (non modificare i file di contenuto).
- Lunghezze indicative: `perche` 80–150 parole; `idea` 120–250; ogni richiamo 40–100; ogni `ipotesiPerche` 1–3 frasi;
  `disegnoGuida` 80–180; ogni `prima` 40–120 parole; ogni `dopo` 30–100; `introduzione` 50–120; `riepilogo` 50–120;
  `racconto` 80–160 (come lo diresti all'orale ora che l'hai capito).

## Dove scrivere
`src/content/<cap>/lezioni.ts` (per C5: `lezioni-a.ts` o `lezioni-b.ts`): oggetto `LEZIONI: Record<argomentoId,
LezioneArgomento>` (tipo in `src/content/types.ts`). Puoi dividere in più file importati da lì. **Non toccare** altri
file. Le chiavi di `passi` sono gli id dei passi (`d071.3`), quelle di `dims` gli id delle dimostrazioni
dell'argomento: **tutti** i passi e **tutte** le dimostrazioni dell'argomento devono esserci; `ipotesiPerche` ha la
stessa lunghezza di `sistemaIpotesi`. Esempio completo da imitare: `src/content/c4/lezioni.ts` → `c4-freno-nastro`.

Prima di scrivere, leggi per ogni argomento il contenuto (`src/content/<cap>/*.ts`) e la trascrizione della dispensa
(`tools/testi/capX.md`) per capire davvero il ragionamento.

## Controllo
`CAP=C4 npx vitest run tests/lezioni.test.ts 2>&1 | grep -E "Tests|FAIL|×" | head -30` (sostituisci il capitolo): controlla
completezza, lunghezze minime e che tutte le formule `$…$` si compilino in KaTeX. Alla fine deve essere verde.

## Messaggio finale (≤ 10 righe)
Argomenti scritti, numero di passi spiegati, eventuali righe dei contenuti che ti sono sembrate sbagliate o oscure.
