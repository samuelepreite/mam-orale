# Flusso di lavoro (deciso il 13/10/2026, da seguire senza ulteriori approvazioni)

Decisione dello studente: niente capitolo pilota; tutti i capitoli subito; piano di studio **parametrico** (si adatta a
quanto già studiato; la data dell'orale è facoltativa). Ogni passo si chiude con test verdi; l'infografica si aggiorna a
ogni passo; commit e push su `main` a ogni passo.

| # | Passo | Chi | Fatto quando |
|---|---|---|---|
| 1 | Analisi, trascrizione, note sulle fonti | coordinatore | ✓ 13/10 |
| 2 | Architettura | coordinatore | ✓ 13/10 |
| 3 | Impianto dei contenuti: tipi, mappa, `svg.ts`, verifica SymPy (`tools/verifica/comune.py`), test generici, esempio C4 freno a nastro, infrastruttura animazioni | coordinatore | ✓ 13/10 |
| 4 | **In parallelo**: app (UI, apprendimento, salvataggio, lavagna, simulazione con Claude) e contenuti di C1, C2, C3, C4, C5a, C5b, C6, C7 | 9 agenti (`docs/BRIEF_APP.md`, `docs/BRIEF_CAPITOLO.md`) | ogni agente: i suoi test verdi |
| 5 | Integrazione: NF nuove in NOTE_FONTI, suite completa, `tsc`, verifica SymPy completa, controllo a campione dei contenuti (un passo per dimostrazione contro la trascrizione), Playwright | coordinatore | tutto verde, 49/49 argomenti, 142/142 dimostrazioni verificate |
| 6 | Pubblicazione dell'app (capability `db`, `user`, `downloads`, `sample` con immagini), prova della correzione con Claude, infografica, copie nel progetto | coordinatore | app raggiungibile, sincronizzazione letta una volta |
| 7 | Revisione indipendente: un agente che non ha scritto i contenuti ricontrolla un campione di dimostrazioni contro la dispensa | agente revisore | difetti corretti |
| 8 | Chiusura (14/10): tolta la correzione con IA, decisi tutti i dubbi, peso pieno agli argomenti integrati, app ripubblicata | coordinatore | ✓ 14/10, nessun punto aperto |

Regole di sessione: `RIPARTENZA.md` («IN CORSO/FINITA»), una sessione non rilegge i PDF (usa `tools/testi/`), test
filtrati, pubblicazione a fine passo.
