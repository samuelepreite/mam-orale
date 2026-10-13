# Ripartenza — dove siamo e come continuare

## 0. Stato dell'ultima sessione
- **Stato:** FINITA alle 23:30 del 13/10/2026 (iniziata alle 19:45).
- **Fatto:** Passi 1–7 di `WORKFLOW.md`. Dispensa trascritta; app completa (`src/ui`, `src/learning`, `src/storage`);
  49 argomenti e 142 dimostrazioni (978 passi) scritti da 8 agenti, tutte verificate in SymPy (`npm run verifica`);
  2450 test verdi; NF-101…257 unite in NOTE_FONTI; revisione indipendente su 31 dimostrazioni (`docs/REVISIONE.md`,
  4 difetti corretti); app pubblicata con `db`, `user`, `downloads`, `sample` (immagini).
- **Non ancora provato dal vivo:** correzione con Claude (`sample`), dettatura nell'iframe, sincronizzazione reale.
- **Prossimo:** passo 8. Leggere i riscontri dello studente (`ArtifactData` sull'app, `data/users/me/…`: lezioni con
  «confuso», simulazioni) e correggere prima quei passi; poi i punti «docente» quando arrivano le risposte.

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
- App: https://claude.ai/artifact/6isjZaRnzG8Nks5vC8R5Xz — publish di `dist-artifact/mam-orale-pagina.html` (`npm run build:artifact`) passando `url` e **senza** `capabilities` (restano db, user, downloads, sample)

## 3. Regole dello studente
Fonte di verità: la dispensa (NF-02 per gli errori verificati). Niente «corretto» senza verifica (SymPy in `tools/`,
Vitest numerico). Formula non nella dispensa → deduzione o fonte esterna dichiarata. Report brevi; conta
l'infografica. Italiano. Commit con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` e la riga
`Claude-Session:` della sessione corrente. Una sessione = un capitolo; pubblicazione una volta a fine sessione.
