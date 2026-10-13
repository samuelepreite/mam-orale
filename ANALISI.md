# MAM I — Analisi delle fonti (Passo 1)

Aggiornato: 13/10/2026. Base: trascrizione completa della dispensa (`tools/testi/cap*.md`, 223 pagine lette una
volta come immagine) e riscontro pagina per pagina con le 52 domande e le 142 dimostrazioni
(`tools/testi/cap*_riscontro.md`). Incongruenze: `NOTE_FONTI.md` (NF-01…NF-45). Dati della mappa:
`tools/analisi/argomenti.json` (generato da `tools/analisi/argomenti.py`, che controlla che ogni domanda e ogni
dimostrazione stia in un argomento).

## 0. In dieci righe
1. La «dispensa» è il quaderno di uno studente (2024/25): LaTeX nei cap. 1–2, poi manoscritto, scansioni di un libro e appunti delle lezioni (NF-01). Pagine citate come **pagine PDF**.
2. 7 capitoli: cinematica e dinamica (5–66), attrito (67–102), freni e frizioni (103–128), cinghie (129–154), ingranaggi e rotismi (155–192), accoppiamento motore–carico (193–206), vibrazioni (207–223).
3. Le 52 domande diventano **45 argomenti d'orale** (7 con due formulazioni: 3/31, 12/38, 15/46, 16/51, 19/45, 23/47, 29/30) più 4 argomenti di complemento del cap. 1 coperti solo da dimostrazioni.
4. Il capitolo più chiesto è ingranaggi e rotismi (16 domande, 13 argomenti); poi freni e frizioni (9), vibrazioni (7), attrito (7).
5. Delle 142 dimostrazioni: 97 presenti nella dispensa, 31 parziali, **14 assenti**; 36 dichiarano pagine sbagliate (NF-04).
6. **Chiesti ma assenti dalla dispensa**: partitore di frenata (q41), frizione centrifuga (q43), rendimento epicicloidale (q52), rapido ritorno del glifo (q01), ribaltamento del blocco (q33), pressione uniforme (q13) (NF-07).
7. La dispensa ha **errori verificati** importanti: interferenza con sin θ invece di sin²θ (p. 168), caso critico senza il termine in t (p. 213), trasmissibilità con zone invertite (p. 220), trazione posteriore (p. 91), freno a nastro antiorario (p. 153) (NF-14…NF-36).
8. Divergenze di modello tra fonti: velocità ottima della cinghia (dispensa: T₂ fissato; domande: T₁ fissato), frizione conica (le domande dimenticano f cos α), nomi avvolgente/svolgente invertiti nella dispensa (NF-18, NF-19, NF-22).
9. Notazione della dispensa da adottare: f, τ = ω_uscita/ω_entrata con segno, ω̇, I, θ pressione, α/β elica primitiva/fondamentale, ω_m–ξ–ρ con forzante in seno (NF-08…NF-13).
10. Da chiedere: elenco originale `Orale MAM.pdf` (frequenze), dispensa ufficiale del docente, e al docente i 4 punti dell'elenco in fondo a `NOTE_FONTI.md`.

## 1. Le fonti
| Fonte | Natura | Uso |
|---|---|---|
| `MAM TEORIA COMPLETO` (223 pp. PDF) | quaderno di F. Sansone 2024/25: indice (pp. 2–4) di un documento LaTeX di 256 pagine, del quale restano i cap. 1–2; dal cap. 3 pagine manoscritte, appunti battuti (lezioni del 28–29/04/2025), scansioni di un libro con eq. (5.xx) e figg. 5-xx | fonte di verità (NF-02 per gli errori) |
| `MAM_Orale_52_domande` (128 pp.) | risposte «da lavagna» alle 52 domande raccolte dagli studenti; dichiara come fonti anche `Orale MAM.pdf` e `dispense_MAM1_2025_01.pdf` (non disponibili) | definisce **cosa si chiede**; contenuto da verificare |
| `MAM_DIMOSTRAZIONI_COMPLETO_VERIFICATO` (77 pp.) | 142 voci con enunciato, idea, passi, risultato, gancio | indice di **cosa si può chiedere di dimostrare**; pagine e notazione da correggere |

## 2. Indice della dispensa (pagine PDF; dettaglio sezione per sezione in testa a ogni `tools/testi/cap*.md`)
| Cap. | Sezioni principali | Tipo di pagine |
|---|---|---|
| C1 Cinematica e dinamica dei meccanismi piani (5–66) | 1.1 cinematica del punto 5–9 · 1.2 corpo rigido, Rivals, moti, CIR, disco che rotola 10–18 · 1.3 vincoli: asta vincolata 20–24, manovellismo 24–27, quadrilatero 28–30 · 1.4 manovellismo analitico 30–32 · 1.5 cinematica relativa, pistone oleodinamico 33–39 · 1.6 accelerazione del CIR 39–40 · 1.7 cinematica analitica (numeri complessi) 40–44 · 1.8 statica: equazioni cardinali, reazioni, manovellismo, quadrilatero 45–54; dinamica, forze d'inerzia, applicazione 1 55–61 · 1.9 lavoro, potenza, forze vive, glifo e parallelogramma 61–66 | LaTeX (pag. stampata = PDF + 1) |
| C2 Attrito e aderenza (67–102) | 2.1–2.2 attrito e aderenza, piano inclinato, ruota su piano, cono, scala, cuneo 67–79 · 2.2.4 impuntamento 79–81 · 2.2.5 perno (cerchio d'attrito) 81–83 · 2.3 attrito volvente 83–88 · (§2.4 mancante) · 2.5 veicolo: accelerazione e decelerazione massima 89–92 · 2.6 curva auto e moto 93–96 · cuscinetti volventi 97–99 · ripetizione a mano della dinamica del veicolo 100–102 | LaTeX 67–96, manoscritto 97–102 |
| C3 Freni e frizioni (103–128) | appunti di teoria 103 · freni a tamburo/ceppi: risultanti, cerchio d'attrito 105–107 · consumo e Reye 108–109 · ceppi avvolgente/svolgente, casi, accostamento rigido/libero, schema di risoluzione 109–113 · pattino 114–115 · disco 116 · frizioni (libro §5.7: innesto (5.82)–(5.83), a disco (5.84)–(5.86), coniche (5.87)–(5.88)) 117–122 · appunti su cerniera del ceppo, pattino, disco 123–128 | manoscritto, scansioni, appunti battuti |
| C4 Trasmissioni a cinghia (129–154) | flessibili, principio, cinghia ideale, curvatura 129–134 · rapporto e T.F.V., scorrimento elastico, τ reale, rendimento 135–139 · equazione fondamentale (Eulero), θ*, coppia e tensione massima, zone di aderenza e scorrimento 140–146 · esercizi, forzamento, tenditore 147–149 · tre pulegge 150–151 · velocità ottima 152 · freno a nastro 153 · tenditore sul ramo lasco 154 | appunti battuti + manoscritto |
| C5 Ingranaggi e rotismi (155–192) | ruote di frizione 156–157 · ruote dentate, legge dell'ingranamento, evolvente 158–162 · geometria, modulo 163–165 · denti in presa 166 · interferenza e z_min 167–168 · forze con attrito, rendimento istantaneo, potenza dissipata 169–170 · rotismi ordinari 171–173 · epicicloidali, Willis, riduttori 174–175 · differenziale (libro) 176–178 · coppie, rotismo combinato 179–180 · rendimenti, avviamento, irreversibilità, cascata 181–184 · elicoidali 185–189 · coniche 190–191 | manoscritto, appunti, scansioni |
| C6 Accoppiamento motore–carico (193–206) | caratteristiche di motori e utilizzatori, inerzia equivalente 194–196 · accoppiamento diretto, stabilità, transitorio, t₉₀% 197–200 · con trasmissione ed esempio E4/2 201 · con frizione: slittamento, motore fittizio, sincronizzazione 202–206 | appunti + manoscritto, LaTeX 204–206 |
| C7 Meccanica delle vibrazioni (207–223) | modello massa–molla–smorzatore 208 · libere non smorzate e oscillatore verticale 209–210 · smorzate, quattro casi, decremento logaritmico 211–213 · forzate, complex replacement, amplificazione, fase 214–216 · FRF, complex gain, quality factor 217–218 · eccitazione di vincolo, trasmissibilità, fase iniziale, moto relativo, trasmissibilità di forze 219–222 · massa eccentrica rotante 223 | manoscritto + grafici incollati |

## 3. Argomenti d'orale: domande → dimostrazioni → pagine
Peso iniziale di un argomento = numero di domande che lo chiedono (in mancanza delle frequenze reali, NF-05).
«Nella dispensa»: sì / parziale (una parte chiesta manca) / no.

Argomenti d'orale: **45** (dalle 52 domande) + **4** di complemento (solo dimostrazioni). Argomenti chiesti con due formulazioni: 7.


### C1 · Cinematica e dinamica dei meccanismi piani (PDF pp. 5–66)

| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |
|---|---|---|---|---|---|
| `c1-cinematica-punto` Cinematica del punto: velocità e accelerazione | — (complemento) | d001, d002, d003 | 5–9 | parziale — Coordinate polari (d001, d003) assenti: la dispensa usa il versore tangente. | — |
| `c1-velocita` Corpo rigido: formula fondamentale, accelerazioni e CIR | q02 | d004, d005, d006, d007 | 10–18, 21–23, 39–40 | sì — CIR all'infinito per la traslazione non scritto; accelerazione del CIR a pp. 39–40. | — |
| `c1-manovellismo` Manovellismo di spinta: cinematica, CIR, punti morti | q03, q31 | d010, d011, d012, d013 | 25–27, 30–32, 47–49 | parziale — Attrito nella coppia prismatica assente; derivata esatta di x(θ) non fatta (solo legge approssimata). | c1-velocita |
| `c1-glifo` Glifo oscillante: rapido ritorno e forze vive | q01 | d008, d009 | 64–65 | parziale — Nella dispensa il glifo (6 membri) è solo l'esempio delle forze vive; il rapido ritorno non è dimostrato. | c1-velocita, c1-statica-dinamica |
| `c1-moto-relativo` Moto relativo e accelerazione di Coriolis (pistone oleodinamico) | — (complemento) | d014, d015 | 33–39 | sì | c1-velocita |
| `c1-cinematica-analitica` Cinematica analitica con i numeri complessi | — (complemento) | d016 | 40–44 | sì — Da non confondere con il complex replacement delle vibrazioni (NF-43). | c1-velocita |
| `c1-statica-dinamica` Statica e dinamica dei meccanismi: equazioni cardinali, forze d'inerzia, forze vive | — (complemento) | d017, d018, d019, d020, d021, d022, d023 | 45–66 | sì — D'Alembert usato ma non nominato; forze vive enunciate in forma di potenza, non dimostrate. | c1-velocita |

### C2 · Attrito e aderenza (PDF pp. 67–102)

| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |
|---|---|---|---|---|---|
| `c2-attrito` Attrito radente e aderenza, cono d'aderenza | q32 | d024 | 67–79 | sì — Leggi di Coulomb e microgiunzioni (q32) assenti. | — |
| `c2-ribaltamento` Ribaltamento (blocco e veicolo in curva) | q33 | d027, d034 | 68, 94–95, 102 | parziale — Ribaltamento del blocco assente; presente quello del veicolo in curva. | c2-attrito |
| `c2-impuntamento` Impuntamento del corsoio | q34 | d026 | 79–81 | sì — Solo trattazione analitica (Q = F/(1−2e f/h)). | c2-attrito |
| `c2-perno` Attrito perno–boccola e cerchio d'attrito | q18 | d025 | 81–83 | sì — r* = R sin φ; ρ ≈ μR non è nella dispensa. | c2-attrito |
| `c2-volvente` Attrito volvente | q35 | d028 | 83–88 | sì | c2-attrito |
| `c2-cuscinetti` Cuscinetti volventi: cinematica, carico, attrito | q36 | d036, d037 | 88, 97–99 | sì — §2.4 della dispensa mancante: pagine manoscritte. | c2-volvente, c1-velocita |
| `c2-veicolo` Dinamica del veicolo: accelerazione e decelerazione massima, curva | q20 | d029, d030, d031, d032, d033, d035, d136 | 89–96, 100–102 | sì — Errore a p. 91 (trazione posteriore), corretto a p. 101 (NF-16). | c2-attrito, c1-statica-dinamica |

### C3 · Freni e frizioni (PDF pp. 103–128)

| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |
|---|---|---|---|---|---|
| `c3-reye` Ipotesi di Reye–Archard e distribuzione di pressione | q37 | d040, d041 | 108–109, 114, 116 | sì | c2-attrito |
| `c3-ceppi` Freno a ceppi: risultanti, ceppo avvolgente e svolgente | q39 | d038, d039, d042, d043, d142 | 103, 106–113, 123 | sì — Nomi avvolgente/svolgente invertiti nella dispensa per i ceppi esterni (NF-18). | c3-reye, c2-perno |
| `c3-pattino` Freno a pattino: accostamento rigido e libero | q12, q38 | d044, d045, d046, d050 | 114–115, 124–125 | sì — Il pattino frena un nastro traslante. | c3-reye |
| `c3-disco` Freni a disco | q40 | d047, d048, d049 | 116, 126–128 | sì — Pressione uniforme (d047) assente. | c3-reye |
| `c3-frizione-piana` Frizione piana (usura uniforme e pressione uniforme) | q13 | d052 | 116, 117–120 | parziale — Ipotesi di pressione uniforme assente. | c3-reye, c3-disco |
| `c3-frizione-conica` Frizioni coniche | q42 | d053 | 121–122 | sì — Formula (5.88) diversa da q42/d053 (NF-19). | c3-frizione-piana |
| `c3-frizione-centrifuga` Frizioni centrifughe | q43 | d054 | — | no — Assente dalla dispensa. | c3-frizione-piana |
| `c3-partitore` Partitore di frenata | q41 | d051 | (92, 101 per a_max) | no — Assente; collegato alla decelerazione massima del cap. 2. | c2-veicolo |

### C4 · Trasmissioni a cinghia (flessibili) (PDF pp. 129–154)

| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |
|---|---|---|---|---|---|
| `c4-rapporto` Cinghia: rapporto ideale ed effettivo, scorrimento elastico, rendimento | q44 | d055, d056, d058, d059, d060, d061, d137 | 131–139 | sì — d137 (geometria dell'avvolgimento) assente. | — |
| `c4-eulero` Equazione di Eulero, legge della tensione, arco di scorrimento, coppia massima | q19, q45 | d057, d062, d063, d064, d065, d066, d067 | 140–147, 150–151 | sì — Casi di θ* sbagliati a pp. 142, 146 (NF-20). | c2-attrito, c4-rapporto |
| `c4-velocita-ottima` Potenza trasmessa e velocità ottima | q15, q46 | d068, d069, d070 | 143, 152, 154 | sì — Dispensa: T2 fissato (V = √(T2/3ρ)); domande: T1 fissato (Tc = Tmax/3) (NF-22). | c4-eulero |
| `c4-freno-nastro` Freno a nastro | q11 | d071 | 153 | sì — Errore nel verso antiorario (NF-21). | c4-eulero |

### C5 · Ingranaggi e rotismi (PDF pp. 155–192)

| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |
|---|---|---|---|---|---|
| `c5-ruote-dentate` Ruote dentate: legge dell'ingranamento, evolvente, rapporto | q22 | d072, d073, d074, d075, d076, d077, d078 | 156–166 | sì | c1-velocita |
| `c5-denti-presa` Denti in presa: ruote a denti dritti | q24 | d079, d080, d138 | 166 | sì — Passo di base mai definito. | c5-ruote-dentate |
| `c5-interferenza` Interferenza e numero minimo di denti (denti dritti) | q48 | d081, d082 | 165, 167–168 | sì — Errori a p. 168 (sin θ per sin²θ) (NF-23). | c5-denti-presa |
| `c5-forze-dritti` Forze tra denti dritti con e senza attrito, rendimento istantaneo | q25 | d083, d084, d085, d086 | 162, 169–170 | sì | c5-ruote-dentate, c2-attrito |
| `c5-rotismi-ordinari` Rotismi ordinari: rapporto globale, ruota oziosa, coppie | q14 | d087, d088 | 171–173 | sì — Segni delle coppie sbagliati a pp. 172–173 (NF-24). | c5-ruote-dentate |
| `c5-rendimento-ordinario` Rendimento dell'ingranaggio e del rotismo ordinario; riduttore di coppia | q16, q51 | d092, d140 | 180–184, 201 | sì | c5-rotismi-ordinari |
| `c5-epicicloidali` Rotismi epicicloidali: Willis, velocità del satellite, coppie, rotismo combinato | q29, q30 | d089, d090, d091, d094 | 174–175, 179–180 | sì | c5-rotismi-ordinari, c1-velocita |
| `c5-differenziale` Differenziale automobilistico | q17 | d141 | 176–178 | sì | c5-epicicloidali |
| `c5-rendimento-epi` Rendimento di un rotismo epicicloidale | q52 | d093 | — | no — Assente dalla dispensa. | c5-rendimento-ordinario, c5-epicicloidali |
| `c5-elicoidali-presa` Ruote elicoidali: geometria e denti in presa | q23, q47 | d095, d139 | 185–187 | sì — Conflitto α/β per l'angolo d'elica (NF-11). | c5-denti-presa |
| `c5-elicoidali-zmin` Ruote elicoidali: ruota fittizia e numero minimo di denti | q26 | d096, d097 | 187–188 | sì | c5-interferenza, c5-elicoidali-presa |
| `c5-elicoidali-forze` Ruote elicoidali: forze scambiate | q27 | d098 | 186, 189 | sì | c5-forze-dritti, c5-elicoidali-presa |
| `c5-coniche` Ruote coniche: rapporto e forze | q28 | d099, d100 | 190–191 | sì | c5-forze-dritti |

### C6 · Accoppiamento motore–carico (PDF pp. 193–206)

| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |
|---|---|---|---|---|---|
| `c6-diretto` Accoppiamento diretto: equazione, regime, stabilità, transitorio | q08 | d101, d102, d103, d104 | 193–200 | sì | c1-statica-dinamica |
| `c6-trasmissione` Accoppiamento con trasmissione: grandezze ridotte, rendimento | q09 | d105, d106, d107 | 196, 201 | sì — d107 assente e impostata male (NF-29). | c6-diretto, c5-rendimento-ordinario |
| `c6-frizione` Accoppiamento con frizione: slittamento, sincronizzazione, energia | q10 | d108, d109, d110 | 117–119, 202–206 | parziale — Energia dissipata solo nel libro (5.82–5.83); t_Q non in forma chiusa (NF-30, NF-38). | c6-trasmissione, c3-frizione-piana |

### C7 · Meccanica delle vibrazioni (PDF pp. 207–223)

| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |
|---|---|---|---|---|---|
| `c7-libere` Vibrazioni libere non smorzate | q05 | d111, d112, d113, d114 | 208–210 | sì — Solo condizioni iniziali con velocità nulla. | — |
| `c7-smorzate` Vibrazioni libere smorzate | q06 | d115, d116, d117, d118, d119, d120, d121 | 211–213 | sì — Errori su radici e caso critico (NF-31, NF-32). | c7-libere |
| `c7-complex` Complex replacement | q21 | d123 | 214–215, 217 | sì — Dispensa: forzante in seno, parte immaginaria (NF-12). | c7-libere |
| `c7-forzate` Vibrazioni forzate: amplificazione, risonanza, fase, FRF | q04 | d122, d124, d125, d126, d127, d128 | 214–218 | sì | c7-smorzate, c7-complex |
| `c7-eccentrica` Massa eccentrica rotante | q07 | d134, d135 | 223 | sì | c7-forzate |
| `c7-vincolo` Oscillazione (eccitazione) di vincolo | q49 | d129, d131 | 219–221 | sì | c7-forzate |
| `c7-trasmissibilita` Trasmissibilità e isolamento | q50 | d130, d132, d133 | 220–222 | sì — Refusi e zone etichettate male (NF-33). | c7-vincolo |

### Le 142 dimostrazioni contro la dispensa

- presenti: **97**, parziali: **31**, assenti: **14** (d001, d003, d008, d009, d027, d047, d051, d054, d068, d093, d107, d110, d137, d138);
- pagine dichiarate che non contengono la dimostrazione: **36** su 142 (la tabella vera è in `tools/testi/cap*_riscontro.md`, colonna «pagine reali»);
- risultato diverso dalla dispensa (convenzione, ipotesi o formula): d026, d032, d042, d044, d053, d070, d109, d120.

## 4. Domande doppie o sovrapposte (nessuna formulazione persa: ognuna resta come «modo di chiederlo»)
| Argomento | Formulazioni | Differenza tra le due |
|---|---|---|
| c1-manovellismo | q03 attrito e punti morti · q31 nomi delle aste e CIR | q03 parte dai punti morti e dalla statica, q31 dai CIR |
| c3-pattino | q12 freno a pattino · q38 accostamento rigido e libero | q38 chiede il confronto fra i due accostamenti |
| c4-eulero | q19 equazione di Eulero · q45 legge della tensione | q45 chiede T(θ), θ* e la puleggia limitante |
| c4-velocita-ottima | q15 velocità ottima · q46 potenza e velocità ottima | q46 chiede anche P_max |
| c5-rendimento-ordinario | q16 riduttore di coppia · q51 rendimento del rotismo ordinario | q16 è la relazione coppia–velocità, q51 il rendimento |
| c5-epicicloidali | q29 rotismi epicicloidali · q30 velocità del satellite | q30 chiede ω propria del satellite (D: col CIR) |
| c5-elicoidali-presa | q23 · q47 denti in presa elicoidali | q47 aggiunge rigidezza e silenziosità |

Gruppi **collegati ma distinti** (domande a catena, NON fusi): Reye → frizione piana → freni a disco → frizioni coniche
(q37, q13, q40, q42); Eulero → freno a nastro → velocità ottima (q19/45, q11, q15/46); frizione nel cap. 3 ↔ accoppiamento
con frizione nel cap. 6 (q13 ↔ q10, NF-38); ruote dritte → elicoidali (q24 → q23/47, q48 → q26, q25 → q27); attrito →
perno → cerchio d'attrito nei ceppi (q32 → q18 → q39); veicolo → partitore di frenata → differenziale (q20 → q41, q17).

## 5. Prerequisiti
Il grafo completo (campo `prerequisiti` e `collegamenti` di ogni argomento) è in `tools/analisi/argomenti.json`.
Catene principali: corpo rigido e CIR → manovellismo, moto relativo, ruote dentate, epicicloidali, cuscinetti ·
attrito → perno, impuntamento, volvente, Reye, Eulero, forze con attrito negli ingranaggi · Reye → ceppi, pattino, disco
→ frizione piana → conica → accoppiamento con frizione · rotismi ordinari → rendimento → accoppiamento con
trasmissione · libere → smorzate → complex replacement → forzate → massa eccentrica, vincolo → trasmissibilità.

## 6. Buchi tra fonti
**Chiesto ma non nella dispensa** (NF-07): q41, q43, q52 interi; parti di q01 (rapido ritorno), q13 (pressione
uniforme), q14 (J_eq non stazionario), q17 (open differential), q32 (leggi di Coulomb), q33 (blocco), q48 (sottotaglio);
dimostrazioni d001, d003, d008, d009, d027, d047, d051, d054, d068, d093, d107, d110, d137, d138.

**Nella dispensa ma non nelle dimostrazioni** (probabili domande di approfondimento; elenco completo nel §3 di ogni
riscontro): accelerazione del CIR (39–40); corpo a due e a tre forze (46–47); riduzione dell'inerzia a un polo fisso
(61); ruota su piano con forza in sommità (72–73); scala e cuneo (75–79); isteresi e orma del pneumatico (84–87);
condizione di dragster (101); circonferenza d'attrito volvente nei cuscinetti (99); costruzione grafica dei ceppi col
punto Z (109–113); ganascia traslante e quadrilatero (111); innesto impulsivo (5.83) (118); pressione sulla frizione
conica (5.87) (122); forzamento, tenditore, tre pulegge (147–151, 154); rendimenti in accesso e recesso (169);
diagramma a «V» della potenza dissipata (170); condizione di avviamento (*), irreversibilità, vite senza fine
(182–183); coassialità degli epicicloidali e riduttori a corona/solare fissi (174–175); cinematica del differenziale in
curva (177–178); angolo di pressione normale e elica di base (185–186); transitorio da fermo e t₉₀% (199–200);
esempio E4/2 (201); molle non lineari (209); misura di ξ dal decremento (212); FRF in laboratorio (218); fase iniziale
e moto relativo nell'eccitazione di vincolo (221); autocentramento (223).

## 7. Prime incongruenze
Tutte in `NOTE_FONTI.md`. Le più pesanti per l'orale: NF-18 (avvolgente/svolgente), NF-19 (frizione conica),
NF-22 (velocità ottima), NF-23 (interferenza), NF-32 (caso critico), NF-33 (trasmissibilità), NF-16 (trazione
posteriore), NF-21 (freno a nastro), NF-11 (α/β nelle elicoidali), NF-43 (due usi dei numeri complessi).

## 8. Conseguenze per l'app (decise, dettagli in `ARCHITETTURA.md`)
- Unità di studio = i 45 argomenti (+4 di complemento); ogni argomento elenca le sue formulazioni d'orale.
- Ogni passo di dimostrazione cita la pagina PDF; i contenuti non presenti nella dispensa hanno il badge «non nella
  dispensa» (deduzione o fonte esterna) e un peso ridotto finché il docente non li conferma.
- Dove la dispensa sbaglia, la scheda mostra la riga originale e la forma corretta («la dispensa scrive…»).
- Capitolo pilota proposto: **C4 trasmissioni a cinghia** (26 pagine, 4 argomenti, 6 formulazioni d'orale, 18
  dimostrazioni): l'equazione di Eulero è la dimostrazione d'orale per eccellenza (concio, equilibrio, integrazione),
  ha un disegno da lavagna preciso, tre animazioni naturali (tensione lungo l'arco, potenza in funzione di V, freno a
  nastro) e due divergenze tra fonti da gestire (NF-20, NF-22). Alternativa: C6 (più corto, ma dipende da rotismi e
  frizioni).
