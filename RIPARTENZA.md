# Ripartenza — dove siamo e come continuare

## 0. Stato dell'ultima sessione
- **Stato:** FINITA alle 02:00 del 14/10/2026. **Progetto completo, nessun punto aperto.**
- **Ultima sessione (richiesta dello studente):** tolta la correzione con Claude (capability `sample`): la simulazione
  usa l'autovalutazione guidata con suggerimento locale per parole chiave; l'app non consuma il piano. Decisi tutti i
  dubbi «da chiedere al docente» (NOTE_FONTI, § Decisioni finali) e applicati nei contenuti; argomenti integrati oltre la
  dispensa con peso pieno. 2444 test verdi, 142/142 dimostrazioni verificate in SymPy, app ripubblicata con `db`,
  `user`, `downloads`.
- **Se lo studente chiede altro:** riscontri sui passi (lezioni con «confuso») esportati da «Altro»; correggere quei passi.

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
