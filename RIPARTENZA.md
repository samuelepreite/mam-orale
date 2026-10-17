# Ripartenza — dove siamo e come continuare

## 0. Stato dell'ultima sessione
- **Stato:** FINITA alle 12:30 del 17/10/2026. **Progetto completo, nessun punto aperto.**
- **Ultima sessione (richiesta dello studente):** lezioni riscritte in forma discorsiva per tutti i 49 argomenti
  (`src/content/cX/lezioni*.ts`, tipo `LezioneArgomento`, brief `docs/BRIEF_LEZIONI.md`): perché, idea fisica,
  richiami, perché delle ipotesi, guida al disegno, mappa delle tappe, `prima`/`dopo` per ogni passo, riepilogo,
  racconto per l'orale. Tolti i pulsanti «poco chiaro/non ho capito». `tests/lezioni.test.ts` controlla completezza,
  lunghezze e KaTeX. Ritoccati i «perché» di d016.6, d016.7, d054.3, d081.3, d109.2. 2641 test verdi, 142/142 SymPy,
  app ripubblicata (db, user, downloads; mai `sample`).
- **Se lo studente chiede altro:** se un passo resta oscuro, riscrivere `prima`/`dopo` nel file lezioni del capitolo.

Protocollo (come SEIMAFI): all'inizio, se qui c'è «IN CORSO» da meno di 5 ore e su GitHub c'è un commit nell'ultima
ora, un'altra sessione sta lavorando: non toccare nulla. Altrimenti scrivere «IN CORSO dalle HH:MM», commit e push,
lavorare; alla fine «FINITA alle HH:MM», cosa è fatto, prossimo passo, commit e push. Confrontare con la copia nel
progetto (`claude/RIPARTENZA.md`): se è più recente, applicarla prima.

## 1. Dove sono le cose
- Codice: GitHub `samuelepreite/mam-orale` (ramo `main`); copia nel progetto `claude/codice-mam.tar.gz.b64`
  (`base64 -d | tar xz`).
- SEIMAFI (sola lettura): `samuelepreite/seimafi`.
- Infografica di stato: https://claude.ai/artifact/UUvve8npgioQTwu9isVTUN (aggiornarla a ogni avanzamento).
- Fonti: file del progetto. **Non** rasterizzare di nuovo la dispensa: usare `tools/testi/`. Se serve un dettaglio,
  `tools/pagina.sh N 150` (percorso dei PDF in `MAM_PDF_DIR`).

## 2. Link pubblicati
- Infografica: https://claude.ai/artifact/UUvve8npgioQTwu9isVTUN — sorgente `docs/stato-mam.html`, file `backup/codice-mam.txt` (codice in base64)
- App: https://claude.ai/artifact/6isjZaRnzG8Nks5vC8R5Xz — publish di `dist-artifact/mam-orale-pagina.html` (`npm run build:artifact`) passando `url` e **senza** `capabilities` (restano db, user, downloads; `sample` NON va mai rimesso: decisione dello studente)

## 3. Regole dello studente
Fonte di verità: la dispensa (NF-02 per gli errori verificati). Niente «corretto» senza verifica (SymPy in `tools/`,
Vitest numerico). Formula non nella dispensa → deduzione o fonte esterna dichiarata. Report brevi; conta
l'infografica. Italiano. Commit con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` e la riga
`Claude-Session:` della sessione corrente. Una sessione = un capitolo; pubblicazione una volta a fine sessione.
