# Ripartenza — dove siamo e come continuare

## 0. Stato dell'ultima sessione
- **Stato:** FINITA alle 21:10 del 13/10/2026 (iniziata alle 19:45).
- **Fatto:** Passo 1 (analisi) e Passo 2 (architettura). Dispensa trascritta per intero da 9 agenti in parallelo
  (`tools/testi/cap1a…cap7.md`, controlli a campione sulle pp. 110 e 213), riscontri con le 52 domande e le 142
  dimostrazioni, `ANALISI.md`, `NOTE_FONTI.md` (NF-01…45), `ARCHITETTURA.md`, mappa `tools/analisi/argomenti.json`.
- **Prossimo:** attendere la conferma dello studente su `ARCHITETTURA.md` (stack, modello dati, fasi, capitolo pilota,
  data dell'orale). Poi fase (a): copiare l'impianto da SEIMAFI (§1 di ARCHITETTURA) e costruire il pilota C4 leggendo
  **solo** `tools/testi/cap4.md` e `cap4_riscontro.md` (non i PDF).

Protocollo (come SEIMAFI): all'inizio, se qui c'è «IN CORSO» da meno di 5 ore e su GitHub c'è un commit nell'ultima
ora, un'altra sessione sta lavorando: non toccare nulla. Altrimenti scrivere «IN CORSO dalle HH:MM», commit e push,
lavorare; alla fine «FINITA alle HH:MM», cosa è fatto, prossimo passo, commit e push. Confrontare con la copia nel
progetto (`claude/RIPARTENZA.md`): se è più recente, applicarla prima.

## 1. Dove sono le cose
- Codice: GitHub `samuelepreite/mam-orale` (ramo `main`); copia nel progetto `claude/codice-mam.tar.gz.b64`
  (`base64 -d | tar xz`).
- SEIMAFI (sola lettura): `samuelepreite/seimafi`.
- Infografica di stato: vedi link nella sezione 2 (aggiornarla a ogni avanzamento).
- Fonti: file del progetto. **Non** rasterizzare di nuovo la dispensa: usare `tools/testi/`. Se serve un dettaglio,
  `tools/pagina.sh N 150` (percorso dei PDF in `MAM_PDF_DIR`).

## 2. Link pubblicati
- Infografica: (al primo publish)
- App: (dalla fase a)

## 3. Regole dello studente
Fonte di verità: la dispensa (NF-02 per gli errori verificati). Niente «corretto» senza verifica (SymPy in `tools/`,
Vitest numerico). Formula non nella dispensa → deduzione o fonte esterna dichiarata. Report brevi; conta
l'infografica. Italiano. Commit con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` e la riga
`Claude-Session:` della sessione corrente. Una sessione = un capitolo; pubblicazione una volta a fine sessione.
