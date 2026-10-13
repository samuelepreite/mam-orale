# Brief — contenuti di un capitolo (un agente per capitolo)

Progetto: web app per l'**orale** di Meccanica Applicata alle Macchine I (`/home/claude/mam-orale`). Lo studente deve
saper partire bene, fare il disegno giusto, scrivere l'equazione di partenza, **dimostrare** senza saltare il passaggio
chiave, chiudere con il significato fisico e reggere le domande a catena. Tu scrivi i **contenuti di un capitolo**:
argomenti d'orale, dimostrazioni a passi verificate, disegni di riferimento, animazioni. Un altro agente costruisce
l'interfaccia in parallelo; altri agenti scrivono gli altri capitoli. Lavorate nella **stessa cartella**: tocca solo i
tuoi file.

## Da leggere (in quest'ordine, una volta)
1. `ARCHITETTURA.md` §2–§7 e `src/content/types.ts` (modello dei dati: è vincolante).
2. **L'esempio di riferimento completo**: `src/content/c4/freno-nastro.ts` (argomento + dimostrazione), `src/content/svg.ts`
   (linguaggio dei disegni), `src/engine/c4.ts` (funzioni pure), `src/diagrams/c4.tsx` + `src/diagrams/anim.tsx`
   (animazione), `tools/verifica/comune.py` + `tools/verifica/c4.py` (verifica SymPy), `tests/meccanismi-c4.test.ts`.
   Copia quella struttura e quel livello di cura.
3. La mappa: `tools/analisi/argomenti.json` (i tuoi argomenti: titolo, domande, dimostrazioni, pagine, prerequisiti,
   collegamenti). **Ogni argomento deve contenere esattamente le dimostrazioni che la mappa gli assegna.**
4. La **trascrizione** della dispensa del tuo capitolo `tools/testi/capX.md` e il riscontro `tools/testi/capX_riscontro.md`.
   La dispensa è l'unica fonte di verità: **non aprire i PDF** (solo se un dettaglio è davvero illeggibile nella
   trascrizione: `tools/pagina.sh N 150`, poi Read del PNG).
5. `NOTE_FONTI.md` (regole NF-02, notazione NF-08…NF-13, errori già trovati nel tuo capitolo).
6. Le fonti derivate dei tuoi argomenti: domande `/home/claude/work/dq/qNN.txt`, dimostrazioni `/home/claude/work/dd/dNNN.txt`.
   Sono materiale **secondario**: dicono cosa si chiede, ma vanno controllate contro la dispensa.

## Cosa scrivere (solo questi file)
- `src/content/<cap>/<argomento>.ts`: un file per argomento (o per gruppo stretto), che esporta l'`ArgomentoContenuto`
  e le sue `Dimostrazione`. Registra tutto in `src/content/<cap>/index.ts` (per C5: `src/content/c5/a.ts` o `b.ts`).
- `src/engine/<cap>.ts` (per C5: `c5a.ts` / `c5b.ts`): funzioni pure per animazioni e previsioni.
- `src/diagrams/<cap>.tsx` (per C5: `c5a.tsx` / `c5b.tsx`): animazioni, esportate in `MECCANISMI_<CAP>`; CSS extra
  solo se indispensabile in `src/diagrams/<cap>.css` importato dal tuo tsx (usa prima le classi `dw-*`, `mech-*`, `slider`,
  `seg`, `readout` già previste).
- `tools/verifica/<cap>.py` (per C5: `c5a.py` / `c5b.py`, `Registro('C5A')`…): verifica SymPy indipendente.
- `tests/meccanismi-<cap>.test.ts`: i numeri delle animazioni coincidono con le formule della dispensa.
- `docs/nf/<cap>.md`: **note nuove sulle fonti** che trovi, in tabella `| NF-nnn | dove | cosa | lettura adottata | docente? |`,
  con i numeri del tuo intervallo: C1 NF-101…119, C2 NF-121…139, C3 NF-141…159, C4 NF-161…179, C5a NF-181…199,
  C5b NF-201…219, C6 NF-221…239, C7 NF-241…259. Non modificare `NOTE_FONTI.md` (lo unisce il coordinatore).

**Non toccare**: `src/content/types.ts`, `svg.ts`, `index.ts`, `mappa.ts`, `src/diagrams/anim.tsx`, `registry.tsx`, i file
degli altri capitoli, `src/ui/**`, `src/learning/**`, `src/storage/**`, `NOTE_FONTI.md`, i test generici. Se ti serve
qualcosa che lì manca, scrivilo nel messaggio finale.

## Regole sui contenuti (vincolanti)
- **Notazione della dispensa** (f, τ = ω_uscita/ω_entrata con segno, ω̇, I, θ pressione, α/β elica, ω_m/ξ/ρ…): riquadro
  `simboli` con `altrove` quando le domande usano altri simboli.
- Ogni passo ha `fonte` con la **pagina PDF** (o intervallo); i passaggi sottintesi hanno `aggiunto: true`; dove la
  dispensa sbaglia (già in NOTE_FONTI o scoperto da te) il passo è **corretto** e ha `correzione: { nf, dispensaScrive }`.
- Contenuto che la dispensa non ha (dimostrazioni «assenti» della mappa, parti chieste dalle domande e non trattate):
  `fonte: { tipo: 'deduzione', da, spiegazione }` (se si ricava da ciò che c'è) o `{ tipo: 'esterna', ref, nota }`
  (letteratura standard di meccanica applicata, citata in modo generico e onesto, p. es. «trattazione classica
  dei freni a disco a pressione uniforme»). Mai spacciarlo per dispensa.
- Ogni dimostrazione: enunciato, ipotesi esplicite, passi riga per riga **come alla lavagna** con il perché di ogni
  passaggio (italiano chiaro, frasi brevi), almeno un passo `chiave`, risultato, gancio di memoria.
- **Verifica**: ogni riga che è un'uguaglianza ha `num` (due membri valutati sul `sample` della dimostrazione, che
  costruisce valori coerenti dai dati indipendenti) e una voce `'ok'` in `tools/verifica/<cap>.py`, dove il modello è
  ricostruito **dai principi** (solve, dsolve, integrate, diff…), non copiando le formule del TS. Righe che sono
  ipotesi o leggi assunte: `R.enunciato(id)` e niente `num`. Il risultato finale: `R.risultato`.
- **Distrattori**: per ogni passo chiave (tranne il primo) almeno 2, plausibili e tipizzati (segno, ipotesi dimenticata,
  termine perso, fattore, indice, convenzione, concetto), con `spiega`; dove possibile con `num` (il test controlla che
  siano davvero sbagliati). Gli errori tipici delle domande derivate (vedi riscontro) sono ottimi distrattori.
- **Argomento**: `cosaDireSubito` (2–3 frasi, ~20 secondi a voce), `sistemaIpotesi`, `disegno` (SVG con `svg.ts`
  ridisegnato dalla figura della dispensa, didascalia, fonte, checklist `elementi` in ordine di disegno),
  `equazioneDiPartenza` + spiegazione, `significato`, `fraseDaRicordare`, `daNonDire` (≥ 3, inclusi gli errori delle
  fonti derivate e gli errori della dispensa da non ripetere), `approfondimenti` (≥ 4: domande a catena del professore,
  con almeno i collegamenti della mappa; risposta attesa breve; fonte), `simboli`, `nf`.
- **Animazioni** (`visuali` + `previsioni`): dove fanno capire la dimostrazione (lista dei candidati nel prompt del
  progetto per il tuo capitolo, vedi sotto). Cinematica/statica **pure** in `src/engine/<cap>.ts`, disegno in
  `src/diagrams/<cap>.tsx` con le classi `dw-*` (tema chiaro e scuro), comandi `Slider`/`Toggle`/`Transport`, valori in
  `Readout`; test che i numeri coincidano con le formule. Ogni argomento con un'animazione ha almeno una previsione
  «prevedi, poi verifica» con `verify()` che ricalcola la risposta dal motore.
- Usa **tutto** ciò che la dispensa ha sull'argomento (esempi numerici, casi particolari, osservazioni): il professore
  chiede anche quello. Il riscontro elenca cosa le domande derivate omettono.

Candidati animazione per capitolo: C1 glifo oscillante (corsa lenta e rapido ritorno), manovellismo con CIR, punti morti
e velocità del pistone, moto relativo con Coriolis (pistone oleodinamico) · C2 piano inclinato/cono d'aderenza,
impuntamento, cerchio d'attrito del perno, veicolo con trasferimento di carico e accelerazione massima, curva ·
C3 distribuzione di pressione nel ceppo, nel pattino e nel disco/frizione (Reye contro pressione uniforme), ceppo
avvolgente/svolgente · C4 tensione lungo l'arco con zone di aderenza e scorrimento (centrifuga), potenza in funzione di V
e velocità ottima · C5 evolvente, retta d'azione, segmento dei contatti e denti in presa, interferenza; rotismi
ordinari ed epicicloidali (Willis), differenziale in rettilineo e in curva · C6 punto di regime e sua stabilità,
transitorio, frizione (slittamento → sincronizzazione) · C7 libere (non smorzate, sotto/critico/sovra), forzate con
ampiezza e fase, massa eccentrica, eccitazione di vincolo e trasmissibilità.

## Come controllare (mentre lavori, output filtrato)
```
CAP=C4 npx vitest run tests/dimostrazioni.test.ts tests/contenuti.test.ts tests/meccanismi-c4.test.ts 2>&1 | grep -E "Tests|FAIL|✗|×" | head -30
python3 tools/verifica/c4.py
npx tsc --noEmit -p . 2>&1 | grep -E "src/(content|engine|diagrams)/c4|tests/meccanismi-c4" | head
```
(sostituisci il tuo capitolo; per C5 `CAP=C5` mostra anche l'altra metà: guarda solo i tuoi id). Gli errori degli altri
capitoli non sono tuoi. Alla fine tutto il tuo capitolo deve essere verde.

## Messaggio finale (≤ 15 righe)
Argomenti e dimostrazioni scritti, passi totali e passi verificati in SymPy, animazioni e previsioni, note NF nuove,
cose che ti servono nei file condivisi, dubbi da chiedere al docente. Non incollare il codice.
