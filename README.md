# MAM I — app per l'esame orale

Web app per preparare l'orale di **Meccanica Applicata alle Macchine I**: ricostruire una dimostrazione da zero e
spiegarla ad alta voce (partenza, ipotesi, disegno, equazione, passaggio chiave, significato fisico, domande a catena).
Stesso impianto di SEIMAFI (`samuelepreite/seimafi`), repository separato.

Stato (13/10/2026): **Passi 1 e 2 fatti** (analisi e architettura), in attesa di conferma; nessun codice dell'app ancora.

| File | Contenuto |
|---|---|
| `ANALISI.md` | fonti, indice della dispensa, 45 argomenti d'orale (+4 di complemento), mappa domande → dimostrazioni → pagine |
| `NOTE_FONTI.md` | incongruenze ed errori verificati (NF-01…NF-45), letture adottate, punti da chiedere al docente |
| `ARCHITETTURA.md` | riuso di SEIMAFI, modello dei dati, allenatore, lavagna, simulazione con Claude, verifiche, fasi |
| `RIPARTENZA.md` | stato della sessione e prossimo passo |
| `tools/testi/cap*.md` | **trascrizione integrale della dispensa** (223 pagine PDF, lette una volta come immagine) |
| `tools/testi/cap*_riscontro.md` | riscontro pagina per pagina con le 52 domande e le 142 dimostrazioni |
| `tools/analisi/argomenti.py` | mappa degli argomenti (→ `argomenti.json`, `mappa.md`), con controllo di copertura |
| `tools/pagina.sh` | rasterizza una pagina della dispensa (solo se serve rileggere un dettaglio) |
