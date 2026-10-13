# Capitolo 1 — CINEMATICA E DINAMICA DEI MECCANISMI PIANI (parte a)

**Pagine PDF trascritte:** 1–35 (copertina, indice generale del quaderno alle pp. 2–4, Capitolo 1 dal §1.1 all'inizio del §1.5.1).
**Fonte:** quaderno LaTeX «Quaderno offerto da FRANCESCO SANSONE — ANNO 2024/2025 — VOTO : 30», con figure in gran parte disegnate a mano (tavoletta) e alcune foto/rendering.

**Relazione numero di pagina stampato ↔ PDF (verificata su tutte le pp. 2–35):** pag. stampata = pag. PDF + 1. La copertina (PDF 1) non ha numero. Tutti i numeri dell'indice per il Capitolo 1 sono stati controllati sulle pagine effettive e rispettano l'offset +1 (p. es. §1.3.2 «25» → PDF 24; §1.5.1 «36» → PDF 35). Per i capitoli 2–7 l'offset va verificato da chi li trascrive: l'indice arriva a pag. stampata 256, il PDF ha solo 223 pagine.

## Indice delle sezioni (numero e titolo come nella fonte → pagine PDF)

| Sezione | Titolo | pag. stampata (indice) | PDF |
|---|---|---|---|
| — | Copertina | — | 1 |
| — | Indice (generale, capp. 1–7) | 3–5 | 2–4 |
| Capitolo 1 | CINEMATICA E DINAMICA DEI MECCANISMI PIANI | 6 | 5 → |
| 1.1 | Cinematica del punto | 6 | 5–6 |
| 1.1.1 | Velocità | 7 | 6 |
| 1.1.2 | Accelerazione | 8 | 7–8 |
| 1.1.3 | Applicazione | 9 | 8–9 |
| 1.2 | Cinematica del corpo rigido | 11 | 10 |
| 1.2.1 | Equazione fondamentale del corpo rigido (Poisson; «Equazione delle velocità»; «Equazione delle accelerazioni» = eq. di Rivals) | 11 | 10–12 |
| 1.2.2 | Tipi di moto («Moto traslatorio»; «Moto rotatorio intorno ad un polo O») | 14 | 13–15 |
| 1.2.3 | Moto generico piano («Centro di istantanea rotazione»; «Esempio» disco che rotola; «Esempio» pneumatico) | 17 | 16–18 |
| 1.3 | Vincoli | 20 | 19–20 |
| 1.3.1 | Asta vincolata in due punti («Velocità», «Accelerazione») | 21 | 20–24 |
| 1.3.2 | Manovellismo di spinta («Velocità», «Accelerazioni») | 25 | 24–27 |
| 1.3.3 | Quadrilatero articolato («Velocità», «Accelerazione») | 29 | 28–30 |
| 1.4 | Studio analitico del manovellismo di spinta | 31 | 30–32 |
| 1.5 | Cinematica relativa | 34 | 33–35 |
| 1.5.1 | Pistone oleodinamico | 36 | 35 → continua a PDF 36 |

## Tipo di ogni pagina
- PDF 1: copertina grafica (immagine decorativa + didascalia battuta).
- PDF 2–4: LaTeX (indice); 3 e 4 con annotazioni manoscritte a margine («SORIA», «MANTRIOTA + SORIA»).
- PDF 5–35: LaTeX con figure manoscritte (tavoletta grafica) in quasi tutte le pagine; foto/rendering alle pp. 5 (fig. proiettile), 9, 10, 19, 20, 22 (rendering con valori), 24, 28, 33; grafici Matlab a p. 32; schemi tecnici da libro alle pp. 19, 21–23, 25, 31.

Convenzioni della trascrizione: le formule sono in LaTeX con la notazione della fonte (∧ per il prodotto vettoriale, $\vec{\dot\omega}$ per l'accelerazione angolare, $\overline{AB}$ per le lunghezze, $(B-A)$ per i vettori posizione relativi). Nel Capitolo 1 (pp. 5–35) **non ci sono numeri di equazione** stampati, né numeri di figura. I barrati della fonte (termini nulli) sono resi con `\cancel{}`.

---

## PDF p. 1 · pag. stampata — · tipo: appunti battuti (copertina grafica)
[foto: copertina decorativa — metà superiore grigio scuro con tre icone bianche (blocco note con penna, mela/frutto con fogliolina, barretta con rametto fiorito); metà inferiore motivo di rami con bacche/foglie tondeggianti grigie su fondo bianco]

Didascalia in basso a sinistra (testo stampato, in grassetto):
FRANCESCO SANSONE 24/25 —> ESITO 30

## PDF p. 2 · pag. stampata 3 · tipo: LaTeX (con intestazione battuta)
**Quaderno offerto da**
**FRANCESCO SANSONE**
**ANNO 2024/2025**
**VOTO : 30**

### Indice

| N. | Titolo | pag. |
|---|---|---|
| **1** | **CINEMATICA E DINAMICA DEI MECCANISMI PIANI** | **6** |
| 1.1 | Cinematica del punto | 6 |
| 1.1.1 | Velocità | 7 |
| 1.1.2 | Accelerazione | 8 |
| 1.1.3 | Applicazione | 9 |
| 1.2 | Cinematica del corpo rigido | 11 |
| 1.2.1 | Equazione fondamentale del corpo rigido | 11 |
| 1.2.2 | Tipi di moto | 14 |
| 1.2.3 | Moto generico piano | 17 |
| 1.3 | Vincoli | 20 |
| 1.3.1 | Asta vincolata in due punti | 21 |
| 1.3.2 | Manovellismo di spinta | 25 |
| 1.3.3 | Quadrilatero articolato | 29 |
| 1.4 | Studio analitico del manovellismo di spinta | 31 |
| 1.5 | Cinematica relativa | 34 |
| 1.5.1 | Pistone oleodinamico | 36 |
| 1.6 | Accelerazione del centro di istantanea rota-zione | 40 |
| 1.7 | Cinematica analitica | 41 |
| 1.7.1 | Cinematica analitica del quadrilatero articolato | 42 |
| 1.7.2 | Analisi cinematica del manovellismo di spinta | 44 |
| 1.8 | Statica e dinamica dei meccanismi | 46 |
| 1.8.1 | Equazioni cardinali della statica | 46 |
| 1.8.2 | Reazioni vincolari | 48 |
| 1.8.3 | Manovellismo di spinta: forza applicata sul cilindro | 48 |
| 1.8.4 | Manovellismo di spinta: forza applicata sul corpo 2 | 50 |
| 1.8.5 | Quadrilatero articolato: forza esterna applicata sul corpo 3 | 53 |
| 1.8.6 | Equazioni cardinali della dinamica | 56 |
| 1.8.7 | Dinamica dei meccanismi | 57 |
| 1.8.8 | Applicazione 1 | 57 |
| 1.8.9 | Forza e coppia di inerzia rispetto ad un polo fisso | 62 |
| 1.9 | Conservazione dell'energia | 62 |
| 1.9.1 | Lavoro e potenza | 62 |
| 1.9.2 | Teorema delle forze vive (conservazione dell'energia meccanica) | 63 |
| 1.9.3 | Applicazioni | 65 |

(«rota-zione» con il trattino di sillabazione è così nella fonte.)

Numero di pagina stampato in basso: 3

## PDF p. 3 · pag. stampata 4 · tipo: LaTeX (con annotazioni manoscritte)
(Indice, continua)

| N. | Titolo | pag. |
|---|---|---|
| **2** | **ATTRITO E ADERENZA** | **68** |
| 2.1 | Introduzione al fenomeno dell'attrito | 68 |
| 2.2 | Condizioni di aderenza e di attrito | 69 |
| 2.2.1 | Massa su piano inclinato | 71 |
| 2.2.2 | Ruota su di un piano | 73 |
| 2.2.3 | Angolo e cono di aderenza | 74 |
| 2.2.4 | Impuntamento | 80 |
| 2.2.5 | Attrito nei meccanismi rotoidali | 82 |
| 2.3 | Attrito volvente (resistenza a rotolamento) | 84 |
| 2.3.1 | Andamento della pressione di contatto in condizioni statiche | 85 |
| 2.3.2 | Andamento della pressione in condizioni dinamiche | 87 |
| 2.4 | Cuscinetti volventi (o a rotolamento) | 90 |
| 2.4.1 | Cinematica dei cuscinetti | 92 |
| 2.4.2 | Forze scambiate nei cuscinetti | 93 |
| 2.4.3 | Attrito in un cuscinetto | 95 |
| 2.5 | Dinamica longitudinale del veicolo | 96 |
| 2.5.1 | Accelerazione massima di un autoveicolo | 96 |
| 2.6 | Dinamica trasversale | 100 |
| 2.6.1 | Analisi dinamica di un autoveicolo che percorre una curva | 100 |
| 2.6.2 | Analisi dinamica di un motociclo che percorre una curva | 102 |
| **3** | **FRENI E FRIZIONI** | **104** |
| 3.1 | Freni | 104 |
| 3.1.1 | Introduzione | 104 |
| 3.1.2 | Freni a pattino | 105 |
| 3.1.3 | Freni a ceppi | 110 |
| 3.1.4 | Freni a disco | 114 |
| 3.2 | Frizioni | 120 |
| 3.2.1 | Introduzione | 120 |
| 3.2.2 | Frizioni piane | 121 |
| 3.2.3 | Frizione conica | 123 |
| 3.2.4 | Frizioni centrifughe | 123 |
| **4** | **TRASMISSIONE DEL MOTO MEDIANTE FLESSIBILI** | **127** |
| 4.1 | Generalità | 127 |
| 4.2 | Cinghie piane: principi di funzionamento | 129 |
| 4.3 | Equazione fondamentale della trasmissione con flessibile | 132 |
| 4.3.1 | Rapporto di trasmissione | 137 |
| 4.3.2 | Rendimento di trasmissione | 138 |
| 4.3.3 | Cinghia trapezoidale | 138 |
| 4.4 | Forzamento della cinghia | 139 |
| 4.4.1 | Sistema di forzamento a base scorrevole | 140 |
| 4.4.2 | Forzamento a gravità | 141 |
| 4.4.3 | Forzamento a rullo tenditore | 142 |
| 4.5 | Applicazioni | 143 |
| 4.5.1 | Freni a nastro | 143 |
| 4.5.2 | Nastro trasportatore | 145 |

Annotazioni manoscritte a margine sinistro: una parentesi graffa che abbraccia tutto il Capitolo 3 con la scritta verticale «S O R I A», e un'altra graffa che abbraccia tutto il Capitolo 4 con la stessa scritta verticale «S O R I A» (verosimilmente il docente titolare di quelle parti). I capitoli 1 e 2 non hanno annotazione.

Numero di pagina stampato in basso: 4

## PDF p. 4 · pag. stampata 5 · tipo: LaTeX (con annotazioni manoscritte)
(Indice, continua)

| N. | Titolo | pag. |
|---|---|---|
| **5** | **INGRANAGGI E ROTISMI** | **147** |
| 5.1 | Generalità | 147 |
| 5.2 | Tipologie di ruote dentate | 149 |
| 5.3 | Ruote dentate cilindriche a denti dritti | 150 |
| 5.3.1 | Profilo dei denti | 150 |
| 5.3.2 | Geometria delle ruote dentate | 154 |
| 5.3.3 | Ingranaggio rocchetto dentiera | 156 |
| 5.3.4 | Forze scambiate tra denti | 158 |
| 5.3.5 | Numero minimo di denti in presa | 160 |
| 5.3.6 | Forze scambiate tra denti: presenza di attrito | 162 |
| 5.3.7 | Interferenza e numero minimo di denti in presa | 164 |
| 5.4 | Ruote dentate cilindriche a denti elicoidali | 168 |
| 5.4.1 | Geometria dei denti elicoidali | 169 |
| 5.4.2 | Numero di denti in presa | 171 |
| 5.4.3 | Interferenza | 172 |
| 5.4.4 | Forze scambiate | 175 |
| 5.5 | Ruote coniche | 176 |
| 5.5.1 | Geometria delle ruote coniche | 177 |
| 5.5.2 | Numero minimo di denti | 178 |
| 5.5.3 | Forze scambiate | 179 |
| 5.6 | Rotismo ordinario | 181 |
| 5.6.1 | Rotismo ordinario in condizioni non stazionarie | 185 |
| 5.7 | Rotismo epicicloidale | 186 |
| 5.7.1 | Cinematica e dinamica del rotismo epicicloidale | 188 |
| 5.7.2 | Riduttore di velocità | 190 |
| 5.7.3 | Moltiplicatore di giri | 191 |
| 5.7.4 | Differenziale automobilistico | 193 |
| 5.7.5 | Forze scambiate nei rotismi epicicloidali | 197 |
| 5.7.6 | Rendimento di un rotismo epicicloidale | 200 |
| 5.8 | Rendimento nei meccanismi di trasmissione (dinamica delle macchine) | 203 |
| 5.8.1 | Accoppiamento vite-madrevite | 205 |
| **6** | **ACCOPPIAMENTO MOTORE-CARICO** | **215** |
| 6.1 | Generalità | 215 |
| 6.1.1 | Calcolo dell'inerzia equivalente dell'utilizzatore | 219 |
| 6.2 | Accoppiamento motore carico diretto | 220 |
| 6.3 | Accoppiamento motore carico con trasmissione | 226 |
| 6.4 | Accoppiamento motore-carico con frizione | 227 |
| **7** | **MECCANICA DELLE VIBRAZIONI** | **234** |
| 7.1 | Modello massa-molla-smorzatore | 234 |
| 7.2 | Vibrazioni libere | 236 |
| 7.2.1 | Vibrazioni libere non smorzate | 236 |
| 7.2.2 | Vibrazioni libere smorzate | 240 |
| 7.3 | Vibrazioni forzate | 246 |
| 7.3.1 | Vibrazioni forzate con forzante esterna periodica | 246 |
| 7.3.2 | Vibrazioni per oscillazione di vincolo | 250 |
| 7.3.3 | Vibrazioni per massa eccentrica rotante | 252 |
| 7.3.4 | Trasmissibilità | 256 |

(Le grafie «Accoppiamento motore carico diretto» / «motore carico con trasmissione» senza trattino e «motore-carico con frizione» con trattino sono così nella fonte.)

Annotazioni manoscritte a margine sinistro: graffa che abbraccia tutto il Capitolo 5 con scritta verticale «S O R I A»; graffa sul Capitolo 6 con scritta «MANTRIOTA + SORIA» [lettura incerta: «MANTRIOTA»]; graffa sul Capitolo 7 con scritta verticale «S O R I A».

Numero di pagina stampato in basso: 5

> **Nota sui numeri di pagina dell'indice:** sono i numeri **stampati** del quaderno originale. L'indice arriva a pag. 256 (§7.3.4), mentre il PDF ha 223 pagine: il PDF non contiene necessariamente tutto il quaderno nell'ordine originale (da verificare negli altri capitoli). Nel Capitolo 1 (verificato su PDF pp. 2–35): **pag. stampata = pag. PDF + 1**.

---

## PDF p. 5 · pag. stampata 6 · tipo: LaTeX
# Capitolo 1
# CINEMATICA E DINAMICA DEI MECCANISMI PIANI

### 1.1 Cinematica del punto

> **Figura:** piano cartesiano con asse x orizzontale (freccia a destra, etichetta «x») e asse y verticale (freccia in alto, etichetta «y»), origine «O». Dall'origine parte una traiettoria parabolica (moto di un proiettile) che sale, raggiunge un massimo e ridiscende sull'asse x a destra. Nell'origine, vettore velocità iniziale «V₀» obliquo (circa 45°) tangente alla traiettoria; componente «V₀y» indicata lungo l'asse y (etichetta a sinistra dell'asse, all'altezza di metà figura) e componente «V₀ₓ» indicata lungo l'asse x (freccia orizzontale sotto/sull'asse x). Un pallone (disegnato) sulla traiettoria poco prima del vertice; al vertice una freccia orizzontale verso destra (velocità tutta orizzontale). A sinistra dell'origine [foto: piccola figura di un calciatore che calcia il pallone].

Si consideri un piano cartesiano $\{O, x, y\}$, con versori $\{\hat{i}, \hat{j}\}$. Si consideri, inoltre, un punto che si muove lungo una traiettoria. All'istante $t$, il punto si trova in una determinata posizione $P(t)$ del piano sulla traiettoria. Per conoscere la posizione del punto, viene definito il vettore posizione $\vec{r}(t)$, che "collega" l'origine degli assi con la posizione del punto. Il vettore posizione all'istante $t$ può essere espresso come la differenza tra la posizione del punto nell'istante $t$ e l'origine, ed è quindi funzione del tempo, perché varia a seconda della posizione che assume il punto nel tempo :

$$ P(t) - O = \vec{r}(t) $$

Considerando l'angolo $\theta$ che il vettore posizione forma col semiasse positivo delle

## PDF p. 6 · pag. stampata 7 · tipo: LaTeX (figure manoscritte)
x, il vettore posizione può essere espresso in coordinate polari:

$$ (P(t) - O) = r\cos\theta\,\hat{i} + r\sin\theta\,\hat{j} $$

dove $r$ rappresenta il modulo del vettore posizione.

> **Figura (manoscritta):** assi «x» (orizzontale) e «Y» (verticale), origine «O»; versori disegnati come piccole frecce nell'origine: «i» (sottolineato) lungo x e «j» (sottolineato) lungo y. Una traiettoria curva (prima scende leggermente, poi risale e si incurva verso destra, freccia di percorrenza verso destra in alto). Sulla traiettoria il punto «P(t)» (pallino). Dall'origine un vettore grigio fino a P(t) etichettato «r(t)» (scritto a mano, sembra «ɀ(t)»); tra l'asse x e il vettore un arco con etichetta «ϑ(t)».

Il punto, dopo un certo intervallo di tempo infinitesimo $dt$, si sarà spostato lungo la traiettoria nella posizione $P(t + dt)$. Il vettore posizione che individua la posizione del punto all'istante $t + dt$, ha modulo:

$$ |P(t + dt) - O| = r(t + dt) $$

Lo spostamento del punto da $P(t)$ a $P(t + dt)$ è indicato con $dP$ ed è dato da:

$$ dP = (P(t + dt) - O) - (P(t) - O) $$

> **Figura (manoscritta):** stessi assi «x», «Y», origine «O», versori «i», «j» sottolineati. Stessa traiettoria con freccia verso destra. Due punti vicini sulla curva: «P(t)» e, poco più a destra, «P(t+dt)»; dall'origine partono due vettori grigi che terminano nei due punti.

### 1.1.1 Velocità
La velocità con cui il punto si sposta da $P(t)$ a $P(t + dt)$ è data da:

$$ \vec{V}_P = \frac{dP}{dt} = \frac{(P(t + dt) - O) - (P(t) - O)}{dt} $$

Il vettore velocità è tangente alla traiettoria, per cui può essere scritto come:

$$ \vec{V}_P = V_P\,\hat{\tau} $$

Dove $\hat{\tau}$ è il versore tangente alla traiettoria e $V_P$ rappresenta il modulo della velocità.

## PDF p. 7 · pag. stampata 8 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** traiettoria curva che scende da sinistra in alto, ha un minimo e risale verso destra (frecce di percorrenza verso destra; al lato sinistro in alto e destro in alto il simbolo «γ» della traiettoria, scritto «ɣ» [lettura incerta: γ]). Sul ramo discendente il punto «P(t)» con il versore tangente «τ(t)» e, più lungo, il vettore «V(t)» (sottolineato) entrambi tangenti, diretti in basso a destra. Poco più a destra il punto «P(t+dt)» con il versore «τ(t+dt)» e il vettore «V(t+dt)» (sottolineato), quasi orizzontali verso destra.

### 1.1.2 Accelerazione
Per definizione, l'accelerazione è la variazione di velocità nel tempo:

$$ \vec{a}_P = \frac{d(\vec{V}_P)}{dt} = \frac{d(V_P\hat{\tau})}{dt} = \frac{d(V_P)}{dt}\hat{\tau} + V_p\frac{d(\hat{\tau})}{dt} $$

Il vettore accelerazione è composto da due componenti:
- una componente tangenziale, avente la stessa direzione del versore $\hat{\tau}$ e verso dipendente dalla variazione del modulo della velocità:
$$ \vec{a}_t = \frac{d(V_p)}{dt}\hat{\tau} = \dot{V}_P\hat{\tau} $$
- una componente normale:
$$ \vec{a}_n = V_p\frac{d\hat{\tau}}{dt} $$

(Nella fonte compaiono sia $V_P$ sia $V_p$, con pedice maiuscolo e minuscolo, senza distinzione di significato.)

> **Figura (manoscritta):** stessa traiettoria (scende da sinistra, minimo, risale a destra, freccia verso destra). In «P(t)» (sul ramo discendente): «V(t)» sottolineato tangente verso il basso a destra; «a_t(t)» sottolineato, freccia corta lungo la tangente nello stesso verso di V; «a_n(t)» freccia obliqua verso l'alto a destra, perpendicolare alla traiettoria verso la concavità. In «P(t+dt)» (vicino al minimo): «V(t+dt)» sottolineato, quasi orizzontale verso destra; «a_t(t+dt)» sottolineato lungo la tangente; «a_n(t+dt)» quasi verticale verso l'alto (verso il centro di curvatura). (Le etichette «a_n» sono scritte «a_m».)

Per capire da cosa dipende l'accelerazione normale bisogna calcolare la derivata del versore tangente $\hat{\tau}$. Si consideri un intervallo di tempo infinitesmo $dt$ durante il quale il punto $P$ si è spostato da $P(t)$ a $P(t + dt)$. Poiché anche lo spostamento è infinitesimo, la traiettoria può essere approssimata ad un arco di circonferenza. Il centro di questa circonferenza è individuato dall'intersezione delle rette perpendicolari alla traiettoria in $P(t)$ e $P(t + dt)$:

## PDF p. 8 · pag. stampata 9 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** in alto il centro di curvatura «C» (intersezione di due rette sottili che si incrociano formando una V capovolta). Dal centro partono due raggi verso il basso, di lunghezza «R» (etichetta sul raggio sinistro), che formano tra loro l'angolo «dθ» (archetto vicino a C). Alle estremità dei raggi i due punti «P(t)» (sinistra) e «P(t+dt)» (destra), uniti da un arco di circonferenza in basso con l'etichetta «ds». In P(t) il versore tangente «τ(t)» (sottolineato) leggermente inclinato verso il basso a destra; in P(t+dt) il versore «τ(t+dt)» inclinato verso l'alto a destra.

Indicando con $R$ il raggio di curvatura della traiettoria, ovvero la distanza dal punto $P$ al centro della circonferenza, lo spostamento elementare è pari a $ds = Rd\theta$, dove $d\theta$ è l'angolo al centro che insiste su $ds$. Il vettore velocità è quindi dato da:

$$ V_P = \frac{ds}{dt} = R\cdot\frac{d\theta}{dt} = R\cdot\omega $$

dove $\omega$ è la velocità angolare, che tiene conto di quanto velocemente varia la direzione della traiettoria.

Utilizzando il metodo punta-coda per calcolare la differenza tra i versori $\vec{\tau}(t)$ e il vettore $\vec{\tau}(t + dt)$, si nota che il vettore differenza $d\vec{\tau}$ è diretto verso il centro della circonferenza e quindi normale alla traiettoria:

> **Figura (manoscritta):** triangolo dei versori con vertice comune a sinistra: «τ(t)» (sottolineato) diretto in basso a destra e «τ(t+dt)» (sottolineato) diretto in alto a destra, separati dall'angolo «dθ» (archetto al vertice); il vettore «dτ» (sottolineato) chiude il triangolo andando dalla punta di τ(t) verso la punta di τ(t+dt) (verso l'alto).

Il modulo del vettore $d\vec{\tau}$ è quindi pari a:

$$ |d\vec{\tau}| = |\tau|d\theta = d\theta $$

Pertanto, l'accelerazione normale alla traiettoria è data da:

$$ \vec{a}_n = V_p\frac{d\theta}{dt}\hat{n} = V_p\omega\hat{n} = R\omega^2\hat{n} = \frac{V_p^2}{R}\hat{n} $$

dove $\hat{n}$ è il versore normale alla traiettoria.

In definitiva l'accelerazione del punto $P$ è:

$$ \vec{a}_p = \vec{a}_t + \vec{a}_n = \dot{V}_P\hat{\tau} + \frac{V_p^2}{R}\hat{n} $$

[NdT: la frase «Il vettore velocità è quindi dato da: $V_P = ds/dt$…» si riferisce al modulo della velocità (scalare), non al vettore. Qui $\omega = d\theta/dt$ è la velocità angolare con cui ruota la tangente (= velocità angolare del raggio di curvatura), non di un corpo. Il risultato $a_n = V^2/R$ è corretto.]

### 1.1.3 Applicazione
Si supponga di viaggiare in un autoveicolo in autostrada, e di imboccare la corsia di uscita caratterizzata da un curva:

## PDF p. 9 · pag. stampata 10 · tipo: LaTeX (con foto)
[foto: vista aerea di uno svincolo autostradale: carreggiata rettilinea a più corsie sulla destra e una rampa di uscita ad anello (curva quasi circolare di raggio piccolo) che si stacca dall'autostrada e gira attorno a un'area verde]

Prima dell'inizio della curva, all'inizio della corsia di uscita, la componente normale dell'accelerazione è nulla perché la traiettoria è rettilinea e il raggio di curvatura è infinito ($R = \infty$). Una volta che l'autoveicolo inizia a curvare, l'accelerazione normale non è più nulla ed è diretta verso il centro della curva.

In presenza di accelerazione, dall'equazioni della dinamica risulta la comparsa di forze d'inerzia:

$$ \vec{F}_{in} = -m\cdot\vec{a} $$

La forza di inerzia corrispondente all'accelerazione normale (o centripeta) è detta forza centrifuga.Questa forza ha la stessa direzione dell'accelerazione (normale alla traiettoria) ma verso opposto, motivo per cui si nota una forza che spinge verso l'esterno quando si percorre una curva.

> **Figura (scansione di un'illustrazione):** tratto di strada curva (fascia grigia ad arco, concavità verso destra/in basso). Sulla strada un'auto vista dall'alto. Una freccia a doppia punta passa per l'auto lungo la direzione radiale: la punta verso l'esterno della curva (in alto a sinistra) è etichettata «forza centrifuga»; l'altra punta verso il centro (in basso a destra). Un segmento sottile parte dal bordo interno/esterno della strada (in alto) e arriva a un punto in basso a destra etichettato «centro di curvatura»; il segmento è etichettato «raggio di curvatura».

La definizione di accelerazione centripeta permette di progettare una curva: minore è il raggio di curvatura, maggiore è l'accelerazione centripeta necessaria per percorrerla ad una data velocità, maggiore è la forza centrifuga.

## PDF p. 10 · pag. stampata 11 · tipo: LaTeX (con illustrazione)
### 1.2 Cinematica del corpo rigido
[foto: illustrazione (grafica al computer, con effetto di sovrapposizione di più pose) di una persona che pedala su una bicicletta, vista di lato, su un piano grigio; ruota posteriore a raggi a sinistra, ruota anteriore a destra con un solo raggio disegnato]

Per definizione, un corpo rigido è indeformabile, cioè non cambia la sua forma nel tempo. In natura, tuttavia, tutti i corpi si deformano se sottoposti ad una determinata forza. Pertanto, quando si considera un corpo rigido, si assume che le deformazioni risultano trascurabili.

Studiare la cinematica di un corpo rigido, significa conoscerne la velocità e l'accelerazione con cui si sta spostando.

### 1.2.1 Equazione fondamentale del corpo rigido
Il teorema di Poisson, permette di calcolare la derivata di un versore $\hat{e}$ solidale al corpo rispetto al tempo. La derivata nel tempo di un versore è un vettore perpendicolare al versore stesso:

$$ \frac{d\hat{e}}{dt} = \vec{\omega}\wedge\hat{e} $$

dove $\omega$ è la velocità angolare del corpo.

#### Equazione delle velocità
Si consideri un corpo nel piano, e si indichi con $A$ e $B$ due punti appartenenti ad esso. Il vettore posizione di $B$ rispetto ad $A$, può essere scritto come:

$$ (B - A) = (B - O) - (A - O) $$

## PDF p. 11 · pag. stampata 12 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** assi «x» (orizzontale) e «Y» (verticale), origine «O», versori «i», «j» sottolineati nell'origine. Un corpo di forma irregolare (contorno chiuso) in alto al centro; al suo interno due punti «A» (in alto a sinistra) e «B» (più in basso a destra). Dall'origine due vettori: «(A−O)» fino ad A e «(B−O)» fino a B; tra A e B il vettore «(B−A)» con punta in B. Accanto al corpo, in basso a destra, la scritta «$\overline{AB}$ = cost».

Questo vettore risulta solidale al corpo rigido, e il suo modulo (che corrisponde alla distanza tra A e B) rimane costante nel tempo, mentre la sua direzione, individuata da un versore $\hat{e}$, varia nel tempo. Si può quindi riscrivere come:

$$ (B - A) = \overline{AB}\,\hat{e} $$

La sua derivata vale:

$$ \frac{d(B - A)}{dt} = \frac{d(B - O)}{dt} - \frac{d(A - O)}{dt} $$
$$ \frac{d(\overline{AB}\,\hat{e})}{dt} = \vec{V}_B - \vec{V}_A $$
$$ \overline{AB}\frac{d\hat{e}}{dt} = \vec{V}_B - \vec{V}_A $$

Applicando il teorema di Poisson al membro di sinistra:

$$ \overline{AB}\frac{d\hat{e}}{dt} = \overline{AB}(\vec{\omega}\wedge\hat{e}) = \vec{\omega}\wedge(\overline{AB}\,\hat{e}) = \vec{\omega}\wedge(B - A) $$

Pertanto risulta:

$$ \vec{V}_B - \vec{V}_A = \vec{\omega}\wedge(B - A) $$

che costituisce l'equazione fondamentale delle velocità del corpo rigido.

Da questa equazione si può osservare che conoscendo la velocità di un punto $A$ del corpo e la velocità angolare $\vec{\omega}$, è possibile ricavare la velocità di qualsiasi altro punto del corpo:

$$ \vec{V}_B = \vec{V}_A + \vec{\omega}\wedge(B - A) $$
$$ \vec{V}_C = \vec{V}_A + \vec{\omega}\wedge(C - A) $$
$$ \vec{V}_D = \vec{V}_A + \vec{\omega}\wedge(D - A) $$

## PDF p. 12 · pag. stampata 13 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** corpo rigido di contorno irregolare (tratto nero spesso). In alto a sinistra, fuori dal corpo, una freccia curva grigia «ω» (sottolineata) che gira in senso antiorario (scende verso il basso a sinistra). Dentro il corpo tre punti: «A» a sinistra, «B» in alto a destra, «C» in basso al centro. Vettori sottili grigi «(B−A)» da A a B e «(C−A)» da A a C. In A: vettore «V_A» (sottolineato) obliquo verso l'alto a destra. In B: riportata la stessa «V_A» (parallela, verso l'alto a destra) e la componente «ω∧(B−A)» (scritta «ω∧(B-A)») perpendicolare a (B−A), cioè quasi verticale verso l'alto; la somma «V_B» (freccia nera spessa) è la diagonale del parallelogramma (linee sottili di costruzione), diretta in alto a destra. In C: riportata «V_A» e la componente «ω∧(C−A)» perpendicolare a (C−A), diretta verso l'alto a destra; la risultante «V_C» (freccia nera spessa) è la diagonale, diretta in alto a destra.

Nel piano, un corpo rigido ha 3 gradi di libertà. Infatti per conoscere la cinematica delle velocità sono necessarie le 2 componenti della velocità di un punto (ad esempio $\vec{V}_A$) e 1 componente del vettore $\vec{\omega}$.

#### Equazione delle accelerazioni
Per ottenere l'equazione delle accelerazioni si deriva l'equazione delle velocità:

$$ \frac{d\vec{V}_B}{dt} = \frac{d\vec{V}_A}{dt} + \vec{\dot{\omega}}\wedge(B - A) + \vec{\omega}\wedge\frac{d(B - A)}{dt} $$

La derivata del vettore $(B - A)$ è stata calcolata nel paragrafo precedente. Sostituendo:

$$ \frac{d\vec{V}_B}{dt} = \frac{d\vec{V}_A}{dt} + \vec{\dot{\omega}}\wedge(B - A) + \vec{\omega}\wedge[\vec{\omega}\wedge(B - A)] $$

$$ \vec{a}_B = \vec{a}_A + \vec{\dot{\omega}}\wedge(B - A) - \omega^2(B - A) $$

[NdT: il passaggio $\vec{\omega}\wedge[\vec{\omega}\wedge(B-A)] = -\omega^2(B-A)$ vale solo se $\vec{\omega}\perp(B-A)$, cioè nel moto piano (ω normale al piano del moto); in generale $\vec{\omega}\wedge(\vec{\omega}\wedge\vec{r}) = \vec{\omega}(\vec{\omega}\cdot\vec{r}) - \omega^2\vec{r}$. La fonte non dichiara l'ipotesi, ma il contesto è il piano. Verificato con SymPy.]

Quest'ultima costituisce l'equazione fondamentale per le accelerazioni, anche detta equazione di Rivals.

Per calcolare l'accelerazione di qualsiasi punto del corpo rigido bisogna conoscere l'accelerazione di un punto (ad esempio $\vec{a}_A$), la velocita angolare $\vec{\omega}$ e l'accelerazione angolare $\vec{\dot{\omega}}$.

## PDF p. 13 · pag. stampata 14 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta), a sinistra:** corpo rigido di contorno irregolare. In alto a sinistra fuori dal corpo una freccia curva grigia «ω» (sottolineata) che scende verso sinistra (rotazione antioraria); sul lato sinistro una freccia curva nera «ω̇» (sottolineata) che sale (rotazione oraria: ω e ω̇ hanno versi opposti nel disegno). Nel corpo il punto «A» (in alto a sinistra) e il punto «B» (in basso a destra), con il vettore sottile «(B−A)» da A a B. In A: «a_A» (sottolineato) verticale verso il basso. In B: riportata «a_A» verticale verso il basso; «−ω²(B−A)» diretta da B verso A (lungo la congiungente); «ω̇∧(B−A)» perpendicolare a (B−A), diretta in basso a sinistra.
> **A destra, poligono delle accelerazioni:** dal punto in alto parte «a_A» verticale verso il basso; dalla sua punta «ω̇∧(B−A)» in basso a sinistra; dalla punta di questa «−ω²(B−A)» verso l'alto a sinistra; la risultante «a_B» (freccia nera spessa) va dal punto iniziale alla punta finale, diretta in basso a sinistra.

### 1.2.2 Tipi di moto
In questa sezione si analizzeranno velocità e accelerazione per i vari tipo di moto che un corpo rigido può compiere.

#### Moto traslatorio
Un corpo si muove di moto traslatorio quando $\vec{\omega} = 0$. Ciò significa che tutti i punti del corpo si spostano nello stesso modo con lo stesso vettore spostamento, stessa velocità e stessa accelerazione.

> **Figura (manoscritta):** quattro copie dello stesso corpo (contorno ondulato, orientamento invariato) disposte lungo una diagonale dall'alto a sinistra verso il basso a destra. In ciascuna copia cinque punti etichettati «A», «B», «C», «D», «E» nelle stesse posizioni relative. Frecce sottili rettilinee e parallele collegano ciascun punto alla sua posizione successiva nella copia seguente (stesso vettore spostamento per tutti i punti).

Occorre precisare che l'atto di moto può essere istantaneamente traslatorio, cioè in un dato istante un corpo può avere $\omega = 0$ ma $\dot{\omega} \neq 0$, il che vuol dire che tutti i punti del corpo avranno stessa velocità, ma diversa accelerazione.

#### Moto rotatorio intorno ad un polo O
Si consideri un corpo rigido che ruota attorno ad un punto fisso O appartenente al corpo ($\vec{V}_O = 0$).Dall'equazione delle velocità, la velocità di un generico punto $A$ appartenente al corpo è data da:

$$ \vec{V}_A = \cancel{\vec{V}_O} + \vec{\omega}\wedge(A - O) $$

(Nella fonte $\vec{V}_O$ è barrato perché nullo.)

## PDF p. 14 · pag. stampata 15 · tipo: LaTeX (figure manoscritte)
Il vettore velocità è quindi un vettore perpendicolare al vettore $(A - O)$ e la sua intensità varierà in modo direttamente proporzionale alla distanza che il punto ha con il polo $O$.

> **Figura (manoscritta):** corpo di contorno irregolare; in alto a sinistra il polo fisso «O» (simbolo di cerniera: cerchietto diviso in quadranti). Da O scende un segmento (vettore «(A−O)») fino al punto «A» in basso; a metà circa il punto «P». Lungo il segmento OA una serie di frecce grigie parallele, tutte perpendicolari a OA e dirette verso sinistra, di lunghezza crescente linearmente con la distanza da O (distribuzione triangolare); le punte delle frecce stanno su una retta passante per O. La freccia in P è etichettata «V_P», quella in A (la più lunga) «V_A» (entrambe sottolineate).

Per quanto riguarda le accelerazioni, poiché il polo $O$ è fisso, anche la sua accelerazione è nulla $\vec{a}_O = 0$. Supponendo che la velocità angolare si mantenga costante ($\vec{\dot{\omega}} = 0$), dall'equazione delle accelerazioni si ricava:

$$ \vec{a}_A = \cancel{\vec{a}_O} + \cancel{\vec{\dot{\omega}}\wedge(A - O)} - \vec{\omega}^2(A - O) $$

(Nella fonte i primi due termini sono barrati.)

In questo tipo di moto, pertanto, l'accelerazione del generico punto A è opposta al vettore posizione di A rispetto al polo O $(A - O)$ e rappresenta un'accelerazione centripeta:

> **Figura (manoscritta):** corpo di contorno irregolare con il polo «O» (simbolo di cerniera) al centro-alto. In alto a sinistra fuori dal corpo una freccia curva grigia «ω» che scende verso sinistra. Quattro punti periferici «A» (in basso), «B» (a destra), «C» (in alto), «D» (a sinistra); da ciascuno parte un vettore accelerazione diretto verso O: «a_A», «a_B», «a_C», «a_D» (sottolineati), di lunghezza proporzionale alla distanza da O (a_A il più lungo, a_C e a_D più corti).

Si supponga ora che la velocità angolare non sia costante ($\dot{\omega} \neq 0$). Inoltre, supponiamo che i versi di rotazione della velocità angolare e dell' accelerazione

## PDF p. 15 · pag. stampata 16 · tipo: LaTeX (figure manoscritte)
angolare siano discordi. Il vettore accelerazione di un generico punto $A$ è dato da:

$$ \vec{a}_A = \cancel{\vec{a}_O} + \vec{\dot{\omega}}\wedge(A - O) - \vec{\omega}^2(A - O) $$

> **Figura (manoscritta):** corpo di contorno irregolare con il polo fisso «O» (simbolo di cerniera) in alto al centro. Fuori dal corpo, in alto a sinistra, freccia curva grigia «ω» che scende verso sinistra (antioraria); a sinistra freccia «ω̇» (sottolineata) diretta verso l'alto (oraria): versi discordi. Punto «A» in basso (sotto O, un po' a destra): da A partono «−ω²(A−O)» verso O (verso l'alto), «ω̇∧(A−O)» perpendicolare ad AO verso sinistra (leggermente in basso), e la risultante «a_A» (freccia spessa) verso l'alto a sinistra, diagonale del rettangolo costruito con linee sottili; tra a_A e −ω²(A−O) l'angolo «α». Punto «B» a destra (all'altezza di O): «−ω²(B−O)» orizzontale verso sinistra (verso O), «ω̇∧(B−O)» verticale verso il basso, risultante «a_B» (spessa) in basso a sinistra; tra a_B e −ω²(B−O) l'angolo «α».

Il modulo del vettore accelerazione è pari a:

$$ |\vec{a}_A| = \sqrt{\left(\overline{OA}\omega^2\right)^2 + \overline{OA}^2\dot{\omega}^2} $$

Raccogliendo si ottiene:

$$ |\vec{a}_A| = \overline{OA}\sqrt{\omega^4 + \dot{\omega}^2} $$

L'accelerazione di un qualsiasi punto dipende dalla distanza dal polo fisso e da una quantità che è funzione di $\omega$ e $\dot{\omega}$ e che quindi non dipende dal punto preso in considerazione. Per cui potrò scrivere:

$$ |a_P| = \vec{OP}\cdot k $$

[NdT: a sinistra c'è un modulo (scalare), quindi a destra va la distanza $\overline{OP}$ e non il vettore $\vec{OP}$: $|a_P| = \overline{OP}\,k$ con $k = \sqrt{\omega^4+\dot\omega^2}$ (la fonte non esplicita k; si deduce dalla riga precedente).]

> **Figura (manoscritta):** corpo con polo «O» in alto; freccia «ω» grigia antioraria in alto a sinistra, freccia «ω̇» verso l'alto a sinistra (oraria). Da O scende il segmento «(A−O)» fino ad «A» in basso, con il punto intermedio «P». Lungo OA frecce grigie parallele tra loro, tutte inclinate dello stesso angolo (archetti grigi) rispetto al segmento OA, dirette verso l'alto a sinistra, di lunghezza crescente linearmente con la distanza da O; le punte stanno su una retta passante per O. Etichette «a_P» (sulla freccia in P) e «a_A» (sulla freccia in A), sottolineate.

Si osservi inoltre che l'angolo $\alpha$ compreso tra l'accelerazione $\vec{a}_A$ e l'accelerazione centripeta $-\omega^2(A - O)$ è lo stesso per tutti i punti del corpo. Infatti:

$$ \tan\alpha = \frac{\overline{OA}\cdot\dot{\omega}}{\overline{OA}\cdot\omega^2} = \frac{\dot{\omega}}{\omega^2} $$

## PDF p. 16 · pag. stampata 17 · tipo: LaTeX (figure manoscritte)
### 1.2.3 Moto generico piano
Si consideri un corpo rigido e di conoscere la velocità di un punto $A$ $\vec{V}_A$, la velocità angolare $\vec{\omega}$, l'accelerazione del punto $\vec{a}_A$ e l'accelerazione angolare $\vec{\dot{\omega}}$.

> **Figura (manoscritta):** corpo rigido di contorno irregolare; in alto a sinistra fuori dal corpo freccia curva grigia «ω» (sottolineata) che scende verso sinistra (antioraria). Quattro punti: «A» (a sinistra), «B» (in alto a destra), «C» (in basso a destra), «D» (in basso a sinistra). Vettori sottili grigi «(B−A)», «(C−A)», «(D−A)» da A agli altri punti. In A: «V_A» verso l'alto a destra. In B: «V_A» riportata (parallela), «ω∧(B−A)» verticale verso l'alto (perpendicolare a B−A), risultante «V_B» (nera spessa) in alto a destra, con linee sottili di costruzione del parallelogramma. In C: «V_A» riportata, «ω∧(C−A)» in alto a destra (perpendicolare a C−A), risultante «V_C» (nera) in alto a destra. In D: «V_A» riportata, «ω∧(D−A)» verso destra (perpendicolare a D−A), risultante «V_D» (nera) verso destra leggermente in alto.

Dall'equazione fondamentale delle velocità si ricavano le velocità di tutti i punti che appartengono al corpo:

$$ \vec{V}_B = \vec{V}_A + \vec{\omega}\wedge(B - A) $$
$$ \vec{V}_C = \vec{V}_A + \vec{\omega}\wedge(C - A) $$
$$ \vec{V}_D = \vec{V}_A + \vec{\omega}\wedge(D - A) $$
$$ \dots $$

Si evince che la velocità di ogni punto del corpo è data da una componente $\vec{V}_A$ che è uguale per tutti i punti, e un'altra componente che rappresenta un moto rotatorio attorno ad $A$ e che dipende dalla distanza del punto da A. Pertanto, il generico moto piano è la composizione di un moto traslatorio e di un moto rotatorio.

Analogamente per le accelerazioni:

$$ \vec{a}_B = \vec{a}_A + \vec{\dot{\omega}}\wedge(B - A) - \omega^2(B - A) $$
$$ \vec{a}_C = \vec{a}_A + \vec{\dot{\omega}}\wedge(C - A) - \omega^2(C - A) $$
$$ \vec{a}_D = \vec{a}_A + \vec{\dot{\omega}}\wedge(D - A) - \omega^2(D - A) $$
$$ \dots $$

La componente comune $\vec{a}_A$ corrisponde ad un moto traslatorio, le altre componenti corrispondono ad un moto rotatorio attorno ad A.

## PDF p. 17 · pag. stampata 18 · tipo: LaTeX (figure manoscritte)
#### Centro di istantanea rotazione
Il moto generico piano può essere studiato e visualizzato in modo più semplice utilizzando il concetto di Centro di Istantanea Rotazione (C. I. R.). Il C.I.R. è la traccia (punto intersezione) dell'asse del moto sul piano del moto e, trattandosi di atto di moto di pura rotazione istantanea, ha velocità nulla all'istante considerato.

Si consideri un corpo rigido e di conoscere la velocità di due punti appartenenti a questo corpo $\vec{V}_A e \vec{V}_B$. Indicando con $K$ il C.I.R. di questo corpo, allora risulta:

$$ \vec{V}_A = \cancel{\vec{V}_K} + \vec{\omega}\wedge(A - K) $$
$$ \vec{V}_B = \cancel{\vec{V}_K} + \vec{\omega}\wedge(B - K) $$

Le velocità $\vec{V}_A$ e $\vec{V}_B$ risultano perpendicolari rispettivamente a $(A - K)$ e $(B - K)$, per definizione di prodotto vettoriale. Pertanto il punto $K$ è individuato dall'intersezione delle rette $r_1$ e $r_2$ perpendicolari a $\vec{V}_A$ e $\vec{V}_B$, passanti rispettivamente per $A$ e $B$:

> **Figura (manoscritta):** corpo di contorno irregolare (tratto nero molto spesso). Punto «A» in alto a sinistra con «V_A» (sottolineato) diretta verso destra leggermente in alto; dalla A scende una retta grigia «r₁» perpendicolare a V_A (simbolo di angolo retto in A), che va in basso verso destra. Punto «B» a destra con «V_B» (sottolineato) verticale verso il basso; per B passa una retta grigia orizzontale «r₂» perpendicolare a V_B (simbolo di angolo retto in B). Le due rette si intersecano nel punto «K» (pallino), all'interno del corpo, a sinistra del centro.

Il punto $K$ è detto Centro di Istantanea Rotazione (C.I.R.), e possiede le seguenti proprietà:
- la posizione del centro di istantanea rotazione non dipende dalla geometria del corpo e può anche non appartenere al corpo, da cui si deduce che la cinematica del corpo rigido non dipende dalla sua geometria;
- per trovare il centro di istantanea rotazione è sufficiente conoscere le direzioni delle velocità di due punti appartenti al corpo.

[NdT: nella fonte è scritto «apparteniti» (refuso). Il secondo punto vale se le due direzioni non sono parallele; con velocità parallele K si trova sulla retta comune normale (con i moduli) o all'infinito (traslazione). La fonte non lo dice qui.]

#### Esempio
Si consideri un corpo di forma circolare che rotola su un piano senza strisciare, il che significa che il punto del corpo a contatto col piano ha velocità nulla. Per definizione, quindi, il punto di contatto è il centro di istantanea rotazione $K$:

## PDF p. 18 · pag. stampata 19 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** disco (circonferenza) di centro «. O» appoggiato su una retta orizzontale (il piano); il punto di contatto in basso è «K». In alto a sinistra una freccia curva grigia «ω» (sottolineata) diretta verso l'alto a destra (rotazione oraria: il disco rotola verso destra). Punti sulla circonferenza: «A» in cima con «V_A» orizzontale verso destra (la più lunga); «B» a sinistra (all'altezza di O) con «V_B» diretta in alto a destra (a 45°); «C» a destra con «V_C» in basso a destra; «D» in basso a sinistra (vicino a K) con «V_D» corta verso l'alto a destra; «E» in basso a destra con «V_E» corta in basso a destra. Ogni velocità è perpendicolare alla congiungente con K.

Noto $K$, è possibile calcolare la velocità di tutti gli altri punti:

$$ \vec{V}_O = \cancel{\vec{V}_K} + \vec{\omega}\wedge(O - K) \implies V_O = \omega R $$
$$ \vec{V}_B = \vec{\omega}\wedge(B - K) \implies V_B = \sqrt{2}\,\omega R $$

Si supponga inoltre che la velocità di avanzamento $\vec{V}_O$ (e quindi anche la velocità di rotazione) sia costante nel tempo ($\vec{a}_O = 0$, $\dot{\omega} = 0$). Dall'equazione di Rivals si ottiene:

$$ \vec{a}_A = \cancel{\vec{a}_O + \vec{\dot{\omega}}\wedge(A - O)} - \omega^2(A - O) $$
$$ \vec{a}_B = -\omega^2(B - O) $$
$$ \vec{a}_K = -\omega^2(K - O) $$

(Nella fonte $\vec{a}_O + \vec{\dot\omega}\wedge(A-O)$ è barrato con un unico tratto.)

> **Figura (manoscritta):** stesso disco di centro «. O» sul piano orizzontale, contatto «K»; freccia «ω» grigia verso l'alto a destra in alto a sinistra (oraria). Punti «A» (cima), «B» (sinistra), «C» (destra), «D» (in basso a sinistra), «E» (in basso a destra), «K» (contatto): da ciascuno parte un vettore di uguale lunghezza diretto verso O, etichettato rispettivamente «a_A», «a_B», «a_C», «a_D», «a_E», «a_K» (sottolineati).

Si osservi che tutti i punti appartenenti alla circonferenza esterna del corpo (incluso il punto che corrisponde al centro di istantanea rotazione) hanno accelerazioni centripete con lo stesso modulo: $a = \omega^2\cdot R$.

#### Esempio
Si calcoli il modulo dell'accelerazione del punto B considerando che il corpo sia uno pneumatico di raggio $R = 30$ cm che viaggia alla velocità costante di $V = 150$ km/h.

$$ |\omega| = \frac{V}{R} = \frac{150\cdot10^3}{3600\cdot30\cdot10^{-2}} = 138.9\,rad/s $$

$$ |a_B| = |\omega|^2\cdot R = 138.9^2\cdot30\cdot10^{-2} = 5787\,m/s^2 $$

[NdT: verificato: $\omega = 150000/(3600\cdot0.30) = 138.89$ rad/s; $a_B = 138.89^2\cdot0.30 = 5787$ m/s² (con 138.9 arrotondato si avrebbe 5788). Nota: il CIR K ha velocità nulla ma accelerazione non nulla, $a_K = \omega^2 R$ diretta verso O.]

## PDF p. 19 · pag. stampata 20 · tipo: LaTeX (con figure da libro/foto)
### 1.3 Vincoli
Nel piano, un corpo rigido libero di muoversi ha tre gradi di libertà. I vincoli vengono utilizzati per unire meccanicamente più corpi. L'utilizzo di vincoli rimuove uno o più gradi di libertà. Il numero di gradi di libertà rimossi da un vincolo è detto grado di vincolo.

I vincoli più comuni sono:
- accoppiamento rotoidale: permette solo un moto rotatorio del corpo rispetto ad un altro, e quindi sottrae 2 gradi di libertà. Alcuni esempi:

> **Figura (disegni tecnici):** tre schizzi di cerniera. (1) Estremità arrotondata di un'asta collegata con un perno a un supporto fisso (tratteggio del telaio in basso); freccia di rotazione «θ» sopra l'asta; reazione orizzontale «H» (freccia da sinistra verso il perno) e reazione verticale «V» (freccia dal basso verso il perno). (2) Estremità di un'asta con il simbolo di cerniera (cerchio a quadranti alternati bianco/nero). (3) Estremità di un'asta con perno (due cerchi concentrici) che la collega a un secondo membro.

[foto: rendering 3D di due aste incernierate (montate e in esploso con anelli/rondelle)]
[foto: braccio robotico industriale con sfondo sfocato in movimento; rendering di un albero a gomiti con due pistoni e bielle e volano]
[foto: tavola anatomica del gomito (omero, radio, ulna, con didascalie illeggibili in piccolo) e foto di un braccio piegato al gomito]

- accoppiamento prismatico: permette solo un moto traslatorio del corpo rispetto ad un altro, e quindi sottrae 2 gradi di libertà. Alcuni esempi:

> **Figura (disegni tecnici):** tre schizzi. (1) Pattino (blocchetto) che scorre in una guida rettilinea fissa (tratteggi sopra e sotto), con un'asta incernierata sul pattino; freccia «x» orizzontale (direzione di scorrimento), freccia di rotazione «θ» sull'asta, reazione «V» verticale dal basso. (2) Corsoio rettangolare entro una guida rettangolare (asola), con un'asta incernierata al corsoio. (3) Corsoio con perno che scorre in una guida curva (a forma di arco, con linea media tratteggiata), con un'asta incernierata.

## PDF p. 20 · pag. stampata 21 · tipo: LaTeX (con foto/rendering)
[foto: rendering 3D di un carrello con asta incernierata su una guida rettilinea (montato e in esploso)]
[foto: pattino a ricircolo su guida lineare; spaccato di un cilindro (attuatore) con stelo e pistone su fondo nero]

### 1.3.1 Asta vincolata in due punti
> **Figura (rendering, moto a pose sovrapposte):** sistema di assi: una guida verticale (asse a sinistra, con un'asta sottile verticale) e una guida orizzontale (linea orizzontale in basso). Molte posizioni successive di un'asta (barra scura) sovrapposte: l'estremo sinistro scorre lungo la guida verticale (posizioni da in alto fino a poco sopra l'orizzontale), l'estremo destro scorre lungo la guida orizzontale (posizioni da poco a destra dell'asse verticale fino all'estrema destra). L'inviluppo delle posizioni forma una curva concava (astroide).

Si consideri un'asta vincolata negli estremi a due corsoi tramite accoppiamento rotoidale. Un corsoio è un carrello vincolato con un accoppiamento prismatico ad una guida, in questo caso fissa. Le direzioni delle guide sono ortogonali fra loro:

## PDF p. 21 · pag. stampata 22 · tipo: LaTeX (figura tecnica con annotazioni manoscritte)
> **Figura:** guida verticale fissa a sinistra (due linee parallele tratteggiate esternamente, asse tratteggiato) in cui scorre un corsoio rettangolare etichettato «2: Corsoio», con perno (cerchietto) nel punto «A». Guida orizzontale fissa in basso a destra (tratteggi sopra e sotto, asse tratto-punto orizzontale) con corsoio rettangolare «3: Corsoio» e perno nel punto «B». L'asta «1 : Asta» collega A (in alto a sinistra) a B (in basso a destra), inclinata. In B l'angolo «α» tra l'asse orizzontale della guida (lato sinistro) e l'asta, indicato con un arco con freccia. In A, a mano, la velocità «V_A» (sottolineata) verticale verso il basso.

Il sistema è costituito da 3 corpi rigidi: l'asta e i due carrelli. Senza considerare i vincoli, il sistema avrebbe 3 gradi di libertà per ciascun corpo rigido, quindi 9 GDL (Gradi Di Libertà). Ciascun accoppiamento (rotoidale e prismatico) rimuove 2 gradi di libertà, pertanto il grado di vincolo del sistema è pari a 8. Pertanto:

$$ GDL = 9 - 2\cdot2 - 2\cdot2 = 1 $$

Un sistema meccanico ad 1 GDL è detto meccanismo.

[NdT: le coppie sono 4 (2 rotoidali in A e B, 2 prismatiche corsoio–guida), ciascuna di grado di vincolo 2: 9 − 4·2 = 1. La scrittura «2·2 − 2·2» va letta come (2 rotoidali)·2 + (2 prismatiche)·2. È il criterio di Grübler nel piano: GDL = 3(n) − 2c, qui con n = 3 corpi mobili e c = 4 coppie inferiori.]

#### Velocità
Si supponga di conoscere il vettore velocità $\vec{V}_A$ (costante e diretto verso il basso) del punto A dell'asta vincolato al corsoio a guida verticale, e di voler calcolare la velocità del punto B.

Un possibile metodo è individuare il centro di istantanea rotazione dell'asta AB. Pur non conoscendo a priori il modulo e il verso del vettore $\vec{V}_B$, ne è nota la direzione, che è fissata dalla direzione della guida del corsoio. Tracciando la perpendicolare a $\vec{V}_A$ passante per A, e la perpendicolare alla direzione di $\vec{V}_B$ passante per B, è possibile individuare il centro di istantanea rotazione $K$, come mostrato in figura:

## PDF p. 22 · pag. stampata 23 · tipo: LaTeX (figure tecniche con annotazioni manoscritte + rendering)
> **Figura:** stesso schema della pagina precedente (corsoio 2 in A su guida verticale, corsoio 3 in B su guida orizzontale, asta 1 da A a B, angolo α in B). Dalla A parte una retta orizzontale verso destra e da B una retta verticale verso l'alto: si incontrano nel punto «K» (in alto a destra, pallino). A mano: «V_A» verticale verso il basso in A; «V_B» orizzontale verso destra in B (freccia lunga); vicino a K una freccia curva «ω₁» (sottolineata) che, a sinistra di K, scende verso il basso. In alto a destra, a mano, il triangolo delle velocità: «V_A» (sottolineato) verticale verso il basso; dalla sua punta «ω₁∧(B−A)» (sottolineato) obliqua verso l'alto a destra; la risultante «V_B» (sottolineato) orizzontale verso destra dalla coda di V_A alla punta di ω₁∧(B−A); tra V_A e ω₁∧(B−A) è segnato l'angolo «α».

> **Figura (rendering software):** l'asta (barra scura) inclinata da in alto a sinistra (estremo sulla guida verticale) a in basso a destra (estremo sulla guida orizzontale). In 8 punti equispaziati lungo l'asta sono disegnati i vettori velocità con il loro valore: dall'alto «V=1.000m/s» (estremo A, verticale verso il basso), «V=0.922m/s», «V=0.817m/s», «V=0.730m/s» [lettura incerta: 0.730], «V=0.677m/s», «V=0.696m/s», «V=0.787m/s», «V=0.931m/s» (estremo B, orizzontale verso destra). Le direzioni ruotano gradualmente dalla verticale all'orizzontale; il modulo è minimo verso il quinto punto (0.677).

[NdT: controllo di coerenza: $V_B/V_A = \tan\alpha = 0.931 \Rightarrow \alpha \approx 43°$; la velocità minima lungo l'asta è $V_A\sin\alpha \approx 0.68$ m/s (punto piede della perpendicolare da K all'asta), coerente con 0.677 m/s.]

Dall'equazione fondamentale delle velocità è possibile ricavare il modulo della velocità di rotazione dell'asta:

$$ \vec{V}_A = \cancel{\vec{V}_K} + \vec{\omega}_1\wedge(A - K) $$

$$ \omega_1 = \frac{V_A}{\overline{AK}} $$

Per la regola della mano destra, il verso della velocità di rotazione è uscente dal piano, quindi antiorario.

Nota la velocità di rotazione dell'asta, è possibile ricavare $\vec{V}_B$ utilizzando l'equazione delle velocità riferita ad A (oppure a K):

$$ \vec{V}_B = \vec{V}_A + \vec{\omega}_1\wedge(B - A) $$

## PDF p. 23 · pag. stampata 24 · tipo: LaTeX (figura tecnica con annotazioni manoscritte)
Poichè entrambi i vettori del membro di destra sono noti (in modulo, direzione e verso), è possibile utilizzare il metodo punta-coda per ricavare $\vec{V}_B$, come mostrato nella figura precedente. Trigonometricamente si ottiene:

$$ V_B = V_A\cdot\tan\alpha $$

Nota la velocità angolare dell'asta e la posizione del centro di istantanea rotazione, è possibile calcolare la velocità di qualsiasi punto P dell'asta con:

$$ \vec{V}_P = \vec{\omega}_1\wedge(P - K) $$

> **Figura:** stesso schema (corsoio 2 in A su guida verticale, corsoio 3 in B su guida orizzontale, asta «1», angolo «α» in B, rette da A orizzontale e da B verticale che si incontrano in «K»). Un punto «P» sull'asta, circa a metà; il segmento sottile da K a P è perpendicolare alla velocità di P (simbolo di angolo retto in P). A mano: «V_A» verso il basso in A, «V_P» (sottolineato) in P diretta in basso a destra, perpendicolare a KP; «V_B» orizzontale verso destra in B; «ω₁» con freccia curva presso K.

La direzione della velocità del generico punto P dell'asta è perpendicolare alla direzione di $(K - P)$.

Si noti, infine, che se $\alpha = 0$, il centro di rotazione coinciderebbe con il punto $B$.

[NdT: verificato: con α = 0 l'asta è orizzontale, la retta orizzontale per A passa per B, quindi K ≡ B e $V_B = V_A\tan0 = 0$.]

#### Accelerazione
In generale, l'accelerazione del centro di istantanea rotazione è non nulla, pertanto non è conveniente riferire l'equazione delle accelerazioni a $K$. Avendo ipotizzato che $V_A = cost$ ($a_A = 0$), dall'equazione delle accelerazioni, si ricava:

$$ \vec{a}_B = \cancel{\vec{a}_A} + \vec{\dot{\omega}}\wedge(B - A) - \omega^2(B - A) $$

Le incognite sono il modulo e il verso di $\vec{a}_B$ (la direzione è data dal corsoio) e il modulo e il verso di $\vec{\dot{\omega}}\wedge(B - A)$, la cui direzione è anche nota perchè perpendicolare al vettore (B-A) per la definizione di prodotto vettoriale. In questa situazione è possibile costruire il poligono dei vettori con il metodo punta-coda e dedurre i versi dei vettori incogniti che soddisfano l'equazione:

## PDF p. 24 · pag. stampata 25 · tipo: LaTeX (figura manoscritta + foto)
> **Figura (manoscritta), poligono delle accelerazioni:** una retta orizzontale in alto etichettata a sinistra «DIR a_B» e una retta obliqua (da in alto a destra verso in basso a sinistra) etichettata in alto a destra «DIR ⊥(B−A)». Vettori: «a_B» (sottolineato) orizzontale verso sinistra lungo la retta superiore, dal punto di incontro con la retta obliqua (a destra) fino all'estremo sinistro; «ω̇₁∧(B−A)» (sottolineato) dallo stesso punto in alto a destra verso il basso a sinistra, lungo la retta obliqua, fino al vertice inferiore; «−ω₁²(B−A)» dal vertice inferiore verso l'alto a sinistra fino all'estremo sinistro di a_B (punta coincidente con quella di a_B). Il triangolo rappresenta $\vec a_B = \dot{\vec\omega}_1\wedge(B-A) - \omega_1^2(B-A)$ (nella figura i simboli hanno il pedice 1, nel testo no).

I moduli di $\vec{a}_B$ e di $\vec{\dot{\omega}}$ si possono ricavare Trigonometricamente:

$$ a_B = \frac{\overline{AB}\cdot\omega^2}{\cos\alpha} $$

$$ \tan\alpha = \frac{|\vec{\dot{\omega}}\wedge(B - A)|}{|-\omega^2(B - A)|} \implies \dot{\omega} = \frac{\tan\alpha\cdot\omega^2\cdot\overline{AB}}{\overline{AB}} = \tan\alpha\cdot\omega^2 $$

Per la regola della mano destra, il verso di $\vec{\dot{\omega}}$ è entrante nel piano, quindi l'asta accelera in senso orario.

[NdT: verificato con calcolo vettoriale (A in alto a sinistra, B in basso a destra, $B-A = \overline{AB}(\cos\alpha,-\sin\alpha)$, $a_A=0$, $\vec a_B$ orizzontale): $a_{B,x} = -\overline{AB}\,\omega^2/\cos\alpha$ (verso sinistra), $\dot\omega = -\omega^2\tan\alpha$ (cioè orario, entrante). Coincide con la fonte. «L'asta accelera in senso orario» va inteso come accelerazione angolare oraria con ω antioraria, cioè l'asta **rallenta** la sua rotazione antioraria.]

### 1.3.2 Manovellismo di spinta
[foto: rendering di un albero a gomiti con quattro pistoni e bielle (motore a 4 cilindri in linea)]

Questo meccanismo permette di trasformare un moto alternativo in un moto rotatorio (o viceversa). Viene utilizzato, ad esempio, nei motori a combustione interna e nelle macchine di pressa. Il meccanismo è costituito da 3 corpi vincolati:
- la manovella, un'asta vincolata rigidamente (solidale) ad un albero rotante, a sua volta vincolato ad un telaio da un accoppiamento rotoidale;
- la biella, vincolata sia alla manovella che al pistone attraverso due accoppiamenti rotoidali;

## PDF p. 25 · pag. stampata 26 · tipo: LaTeX (figure tecniche + manoscritte)
- il pistone, vincolato alla biella da un accoppiamento rotoidale e ad una guida fissa a telaio da un accoppiamento prismatico.

> **Figura (schematica, a campiture grigie):** a sinistra un disco/manovella a forma di settore circolare (con una tacca) con un mozzo circolare al centro e un perno circolare in alto a destra; dal perno parte una biella (barra grigia) verso destra fino a un pistone (grigio, con scanalature per le fasce) che scorre in un cilindro a forma di «C» rovesciata (pareti grigie scure sopra, sotto e a destra).

> **Figura (schema cinematico):** assi «x» (orizzontale, verso destra) e «y» (verticale) con origine nella cerniera fissa «A» (simbolo di cerniera a terra). Manovella «1» da A a «B» (cerniera, cerchietto), inclinata di circa 50° sopra l'asse x; l'angolo «θ» (scritto ϑ, a mano) è tra l'asse x e la manovella in A. Da B scende una verticale sottile fino al piede «H» sull'asse x. Biella «2» da B a «C» (cerniera nel corsoio), discendente verso destra; in C, tra l'asse x e la biella, l'angolo «γ» (a mano). Pistone/corsoio «3» rettangolare in C, in una guida orizzontale fissa (tratteggi sopra e sotto) centrata sull'asse x (manovellismo centrato).

L'angolo $\theta$ è chiamato angolo di manovella.

Il manovellismo di spinta è un meccanismo ad un grado di libertà: i 3 corpi rigidi svincolati avrebbero 9 gradi di libertà, ma i 3 accoppiamenti rotoidali e quello prismatico costituiscono 8 gradi di vincolo.

#### Velocità
Per studiare la cinematica del manovellismo di spinta, si supponga nota e costante la velocità angolare della manovella $\vec{\omega}_1$, con senso antiorario rispetto all'asse dell'albero. Il centro di rotazione della manovella è individuato proprio dal centro dell'albero $A$. Per cui:

$$ \vec{V}_B = \cancel{\vec{V}_A} + \vec{\omega}_1\wedge(B - A) $$

> **Figura (manoscritta):** manovella «1» da «A» (cerchietto in basso) a «B» (cerchietto in alto a destra); da B parte un tratto della biella verso il basso a destra. In A freccia curva «ω₁» antioraria. In B: «V_B» (freccia verso l'alto a sinistra, perpendicolare ad AB) e «a_B» (freccia da B verso A, lungo la manovella).

Per calcolare le velocità della biella, è utile individuarne il centro di istantanea rotazione. Essendo note la velocità di B (e in particolare la sua direzione) e la direzione della velocità di C (parallela alla direzione del corsoio) è possibile individuare la posizione del centro di rotazione $K$ della biella, tracciando le perpendicolari:

## PDF p. 26 · pag. stampata 27 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** manovella «1» da «A» (in basso a sinistra) a «B»; in A freccia curva «ω₁» antioraria. In B: «V_B» verso l'alto a sinistra, «a_B» da B verso A. Biella da B a «C» (perno nel corsoio «3», rettangolo in una guida orizzontale tratteggiata, con il segno «~3»). Il prolungamento della manovella oltre B (retta grigia verso l'alto a destra) incontra la retta verticale per C (grigia) nel punto «K» (in alto a destra). Sulla biella due frecce curve: «ω₂» (verso orario, arco che sale verso destra) e «ω̇₂» (arco che scende verso sinistra, antiorario). In C: «V_C» orizzontale verso sinistra.

Ne consegue:

$$ \vec{V}_B = \vec{\omega}_2\wedge(B - K) $$
$$ \vec{V}_C = \vec{\omega}_2\wedge(C - K) $$

Ne risulta che il verso della velocità angolare della biella $\vec{\omega}_2$ è orario.

[NdT: verificato con prodotti vettoriali: K in alto a destra, B−K diretto in basso a sinistra; $\vec V_B$ verso l'alto a sinistra richiede $\vec\omega_2 = -\omega_2\hat k$ (orario); allora $\vec V_C = \vec\omega_2\wedge(C-K)$ con C−K verso il basso dà $\vec V_C$ verso sinistra, come in figura. Il verso orario vale per $0<\theta<\pi$ con ω₁ antioraria.]

Si noti che la posizione del centro di istantanea rotazione della biella $K$ dipende dall'angolo di manovella $\theta$:
- $\theta = 0$: significa che il pistone si trova nel punto morto superiore e manovella, biella e pistone risultano allineati. Il centro di istantanea rotazione coincide con $C$:
$$ \vec{V}_C = 0 $$

> **Figura (manoscritta):** configurazione allineata orizzontale: cerniera fissa «A» a sinistra, manovella «1» orizzontale verso destra fino a «B», biella «2» orizzontale da B fino a «C» nel corsoio «3» (guida tratteggiata sopra e sotto). In A freccia curva «ω₁» antioraria; in B «V_B» verticale verso l'alto e «a_B» orizzontale verso sinistra (verso A).

- $\theta = \pi = 180°$: il pistone si trova nel punto morto inferiore e i 3 componenti sono nuovamente allineati. Anche in questo caso $K \equiv C$:
$$ \vec{V}_C = 0 $$

> **Figura (manoscritta):** configurazione allineata: «B» all'estrema sinistra, poi la cerniera fissa «A» (simbolo di cerniera), poi il corsoio «3» con il perno «C» a destra (guida tratteggiata sopra e sotto). La manovella «1» è il tratto B–A; la biella «2» va da B a C e quindi si sovrappone alla manovella nel tratto B–A (l'etichetta «2» è posta tra A e C). In B «V_B» verticale verso il basso. Frecce curve «ω₁» (sotto il tratto 1) e «ω₂» (sotto il tratto 2), entrambe archi che scendono (versi concordi, antiorari).

#### Accelerazioni
Per il calcolo delle accelerazioni, si consideri nuovamente il caso con un generico angolo di manovella $\theta$. Avendo ipotizzato che la manovella si muove con velocità angolare costante, risulta $\vec{\dot{\omega}}_1 = 0$.

Dall'equazione delle accelerazioni, risulta:

$$ \vec{a}_B = \cancel{\vec{a}_A} + \cancel{\vec{\dot{\omega}}_1\wedge(B - A)} - \omega_1^2(B - A) = -\omega_1^2(B - A) $$

## PDF p. 27 · pag. stampata 28 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** come a p. 25: manovella «1» da «A» a «B», «ω₁» antioraria in A, in B «V_B» verso l'alto a sinistra (⊥ AB) e «a_B» da B verso A; tratto di biella da B verso il basso a destra.

L'accelerazione del punto C, invece, è data da:

$$ \vec{a}_C = \vec{a}_B + \vec{\dot{\omega}}_2\wedge(C - B) - \omega_2^2(C - B) $$

dove:
- di $\vec{a}_B$ sono noti modulo, direzione e verso;
- di $\vec{\dot{\omega}}_2\wedge(C - B)$ è nota la direzione, perpendicolare a $(C - B)$ (la biella) per definizione di prodotto vettoriale;
- di -$\omega_2^2(C - B)$ sono noti modulo, direzione (parallela a $(C - B)$) e verso (verso opposto a $(C - B)$).

Dal poligono dei vettori è possibile ricavare il vettore $\vec{a}_C$:

> **Figura (manoscritta), poligono delle accelerazioni:** dal punto di partenza a destra (sulla retta tratteggiata orizzontale «DIR a_C») parte «a_B» verso il basso a sinistra; dalla sua punta parte «−ω₂²(C−B)» verso l'alto a sinistra (parallelo alla biella, verso B); dalla punta di questo parte «ω̇₂∧(C−B)» breve, verso l'alto a destra, lungo la retta tratteggiata «DIR ω̇₂∧(C−B)»; la chiusura «a_C» è orizzontale, dal punto di partenza a destra verso la punta finale a sinistra (a_C diretta verso sinistra).

## PDF p. 28 · pag. stampata 29 · tipo: LaTeX (foto + figure manoscritte)
### 1.3.3 Quadrilatero articolato
[foto: sospensione automobilistica a quadrilatero (doppio braccio oscillante): ammortizzatore con molla elicoidale, braccio superiore e braccio inferiore, montante con disco freno e pinza, cavi]

Il quadrilatero articolato è un sistema meccanico costituito da 3 componenti (aste) vincolati da 4 coppie rotoidali, di cui 2 fisse.

> **Figura (manoscritta):** cerniera fissa a terra a sinistra (simbolo di cerniera con tratteggio del telaio, non etichettata), da cui parte l'asta «1» verso l'alto a destra fino alla cerniera «B»; l'angolo «θ₁» (scritto ϑ₁, con freccia antioraria) è tra una retta tratteggiata orizzontale e l'asta 1. Asta «2» da B (in alto) a «C» (a destra, più in basso). Asta «3» da C a «D» (cerniera fissa a terra in basso a destra, con tratteggio del telaio).

Il quadrilatero articolato ha un grado di libertà.

[NdT: 3 aste mobili × 3 = 9 GDL, 4 coppie rotoidali × 2 = 8 gradi di vincolo → 1 GDL. La fonte qui non fa il conto. La cerniera fissa dell'asta 1 nella figura non è etichettata; nel testo è «A».]

#### Velocità
Si supponga nota la velocità angolare del corpo 1, con senso antiorario. A è un punto fisso, per cui:

$$ \vec{V}_B = \cancel{\vec{V}_A} + \vec{\omega}_1\wedge(B - A) $$

> **Figura (manoscritta):** come a p. 25: asta «1» da «A» a «B», «ω₁» antioraria, in B «V_B» verso l'alto a sinistra e «a_B» verso A; tratto dell'asta 2 da B verso il basso a destra.

## PDF p. 29 · pag. stampata 30 · tipo: LaTeX (figure manoscritte)
Per individuare il centro di istantanea rotazione del corpo 2 (asta BC), è necessario conoscere prima la direzione della velocità del punto C. Considerando il punto C come appartenente al corpo 3, ed essento il corpo 3 (asta CD) vincolato ad una cerniera fissa in D, ne consegue che:

$$ \vec{V}_C = \cancel{\vec{V}_D} + \vec{\omega}_3\wedge(C - D) $$

Pertanto $\vec{V}_C$ è perpendicolare al vettore (C-D), ed è possibile ora individuare il centro di istantanea rotazione $K$ del corpo 2 come il punto di intersezione delle rette perpendicolari alle direzioni delle velocità:

$$ \vec{V}_B = \vec{\omega}_2\wedge(B - K) $$
$$ \vec{V}_C = \vec{\omega}_3\wedge(B - K) $$

[NdT: errore della fonte. K è il CIR del corpo 2, quindi la seconda relazione è $\vec V_C = \vec\omega_2\wedge(C - K)$ (velocità angolare della biella 2 e braccio C−K). Con $\vec\omega_3$ la relazione corretta sarebbe quella già scritta sopra, $\vec V_C = \vec\omega_3\wedge(C-D)$. Inoltre «essento» è un refuso per «essendo».]

> **Figura (manoscritta):** quadrilatero: cerniera fissa «A» (in basso a sinistra, con tratteggio del telaio), asta «1» da A a «B» con angolo «θ₁» (ϑ₁, freccia antioraria rispetto alla tratteggiata orizzontale) e freccia «ω₁» antioraria; in B «V_B» verso l'alto a sinistra. Asta «2» da B a «C» (in basso a destra). Asta «3» da C a «D» (cerniera fissa in basso, con tratteggio), con freccia curva «ω₃» presso D. In C «V_C» verso sinistra (⊥ CD). Il prolungamento di AB oltre B e il prolungamento di DC oltre C (rette grigie sottili) si incontrano in «K» in alto a destra.

In base al verso di $\vec{V}_B$, la velocità angolare del corpo 2 $\vec{\omega}_2$ ha senso orario. Ne consegue che $\vec{V}_C$ è diretta verso sinistra (sempre lungo la direzione perpendicolare a CD) e che $\vec{\omega}_3$ ha senso antiorario:

> **Figura (manoscritta):** dettaglio del punto «C»: tratto dell'asta «2» che arriva da in alto a sinistra in C; asta «3» da C in basso fino a «D» (cerniera fissa con tratteggio). Per C una retta tratteggiata «DIR V_C» (perpendicolare a CD, inclinata in alto a destra/in basso a sinistra); «V_C» freccia verso il basso a sinistra lungo tale retta. Presso l'asta 3 freccia curva «ω₃» che scende verso sinistra (antioraria).

[NdT: verificato: con D sotto C, $\vec\omega_3 = +\omega_3\hat k$ (antiorario) dà $\vec V_C$ verso sinistra; $\vec\omega_2$ orario come per la biella del manovellismo.]

#### Accelerazione
Ipotizzando che la velocità angolare del corpo 1 sia costante, il punto B ha un'accelerazione puramente centripeta:

$$ \vec{a}_B = -\omega_1^2(B - A) $$

$\vec{\dot{\omega}}_1$ è nulla perché abbiamo supposto $\vec{\omega}_1 = cost$.

## PDF p. 30 · pag. stampata 31 · tipo: LaTeX (figure manoscritte)
> **Figura (manoscritta):** come a p. 25: asta «1» da «A» a «B», «ω₁» antioraria, in B «V_B» verso l'alto a sinistra e «a_B» verso A; tratto dell'asta 2 da B verso il basso a destra.

L'accelerazione del punto C può essere scritta, utilizzando l'equazione fondamentale delle accelerazioni, sia in relazione al punto B che a D:

$$ \vec{a}_C = \vec{a}_B + \vec{\dot{\omega}}_2\wedge(C - B) - \omega_2^2(C - B) $$
$$ \vec{a}_C = \cancel{\vec{a}_D} + \vec{\dot{\omega}}_3\wedge(C - D) - \omega_3^2(C - D) $$

Eguagliando:

$$ \vec{a}_B + \vec{\dot{\omega}}_2\wedge(C - B) - \omega_2^2(C - B) = $$
$$ = \vec{\dot{\omega}}_3\wedge(C - D) - \omega_3^2(C - D) $$

Infine, è possibile comporre e risolvere il poligono dei vettori:

> **Figura (manoscritta), poligono delle accelerazioni a due rami:** dal vertice comune in alto (al centro) partono due catene. Ramo sinistro: «a_B» dal vertice verso il basso a sinistra; dalla sua punta «−ω₂²(C−B)» verso sinistra (leggermente in alto); dalla punta di questo «ω̇₂∧(C−B)» lungo la retta tratteggiata quasi verticale «DIR ω̇₂∧(C−B)», verso il basso, fino al punto di chiusura in basso a sinistra. Ramo destro: «−ω₃²(C−D)» dal vertice verso il basso a destra; dalla sua punta «ω̇₃∧(C−D)» lungo la retta tratteggiata «DIR ω̇₃∧(C−D)» (poco inclinata, in salita verso destra), diretto verso il basso a sinistra fino allo stesso punto di chiusura. Il punto di chiusura è l'intersezione delle due rette tratteggiate; il vettore $\vec a_C$ (vertice → chiusura) non è disegnato.

### 1.4 Studio analitico del manovellismo di spinta
Si consideri un manovellismo di spinta e un sistema di riferimento $(x, y)$ centrato sulla cerniera fissa della manovella:

## PDF p. 31 · pag. stampata 32 · tipo: LaTeX
> **Figura:** stesso schema cinematico di p. 25: assi «x», «y» con origine nella cerniera fissa «A»; manovella «1» da A a «B» con angolo «θ» (a mano, ϑ) rispetto all'asse x; piede «H» della perpendicolare da B sull'asse x; biella «2» da B a «C»; angolo «γ» (a mano) in C tra asse x e biella; corsoio «3» in C nella guida orizzontale fissa, centrata sull'asse x.

In questo paragrafo, supponendo nota la velocità angolare della manovella $\vec{\omega}_1$, costante e con senso antiorario, vengono calcolate analiticamente la velocità e l'accelerazione nel punto C.

Si indichi con $r$ e $l$ le lunghezze, rispettivamente, della manovella e della biella. La coordinata x del punto C è data da:

$$ x_C = r\cos\theta + l\cos\gamma $$

L'angolo di manovella $\theta$ è dato da:

$$ \theta = \omega_1 t $$

Bisogna adesso ricavare il valore del coseno dell'angolo $\gamma$. La coordinata y del punto B può essere ottenuta in funzione di $\theta$ o $\gamma$:

$$ y_B = r\sin\theta $$
$$ y_B = l\sin\gamma $$

Da cui, uguagliando e indicando con $\lambda$ il rapporto $\frac{r}{l}$:

$$ \sin\gamma = \lambda\sin\theta $$

Elevando al quadrato e utilizzando l'identità fondamentale della trigonometria ($\sin^2\gamma + \cos^2\gamma = 1$):

$$ \cos^2\gamma = 1 - \lambda^2\sin^2\theta $$

Con la seguente approssimazione è possibile semplificare ulteriormente:

$$ \cos^2\gamma = 1 - \lambda^2\sin^2\theta $$
$$ \cos^2\gamma = 1 - \lambda^2\sin^2\theta + \frac{\lambda^4}{4}\sin^4\theta - \frac{\lambda^4}{4}\sin^4\theta $$
$$ \cos^2\gamma = \left(1 - \frac{\lambda^2}{2}\sin^2\theta\right)^2 - \frac{\lambda^4}{4}\sin^4\theta $$

Normalmente, per scelta progettuale, il rapporto $\lambda$ è molto più piccolo di 1, pertanto il termine $\frac{\lambda^4}{4}\sin^4\theta$ può essere trascurato, portando al seguente risultato:

$$ \cos\gamma = 1 - \frac{\lambda^2}{2}\sin^2\theta $$

[NdT: verificato con SymPy: $(1-\tfrac{\lambda^2}{2}\sin^2\theta)^2 - \tfrac{\lambda^4}{4}\sin^4\theta = 1-\lambda^2\sin^2\theta$ (identità esatta). Il risultato finale è approssimato: andrebbe scritto con «≈»; equivale allo sviluppo $\sqrt{1-u}\approx1-u/2$ con $u=\lambda^2\sin^2\theta$. La fonte prende la radice positiva (cos γ > 0, valido perché λ < 1).]

## PDF p. 32 · pag. stampata 33 · tipo: LaTeX (con grafici)
Pertanto, la coordinata x del punto C è data da:

$$ x_C = r\cos\theta + l\cos\gamma = r\cos\omega_1 t + l\left(1 - \frac{\lambda^2}{2}\sin^2\omega_1 t\right) $$

Poichè il pistone è vincolato a muoversi parallelamente all'asse x, derivando $x_C$ rispetto al tempo si ottiene la velocità di C:

$$ V_C = \frac{dx_C}{dt} = -r\omega_1\left[\sin(\omega_1 t) + \frac{\lambda}{2}\sin(2\omega_1 t)\right] $$

La velocità del pistone, quindi, ha due componenti armoniche con pulsazioni $\omega_1$ e $2\omega_1$.

Derivando la velocità rispetto al tempo, si ottiene l'accelerazione del punto C:

$$ a_C = \frac{dV_C}{dt} = -r\omega_1^2\left[\cos(\omega_1 t) + \lambda\cos(2\omega_1 t)\right] $$

[NdT: verificato con SymPy a partire da $x_C$ approssimata: $\dot x_C = -r\omega_1[\sin\omega_1t + \tfrac{\lambda}{2}\sin2\omega_1t]$ e $\ddot x_C = -r\omega_1^2[\cos\omega_1t + \lambda\cos2\omega_1t]$, usando $l\lambda^2 = r\lambda$. Sono espressioni approssimate (al primo ordine in λ²), anche se nella fonte compare «=».]

Anche l'accelerazione è somma di due armoniche. Ad esempio, i grafici in basso mostrano l'andamento di $x_C$, $V_C$ e $a_C$ per $r = 0.03\ m$, $\lambda = \frac{1}{3}$ e $\omega_1 = 1000\ RPM$:

> **Figura (grafici, tre riquadri impilati, asse comune «t [s]» da 0 a 0.12 con tacche ogni 0.02):**
> 1. «x_C [m]», scala 0.05–0.1 (tacche 0.05 e 0.1): curva periodica che parte dal massimo ≈ 0.12 a t = 0, scende al minimo ≈ 0.06 a t = 0.03, risale al massimo a t = 0.06, minimo a 0.09, massimo a 0.12. I minimi sono più «piatti» e larghi dei massimi.
> 2. «V_C [ms⁻¹]», scala −2…2 (tacche −2, 0, 2): parte da 0 a t = 0, scende al minimo ≈ −3.3 verso t ≈ 0.012, risale quasi linearmente passando per 0 a t = 0.03, massimo ≈ +3.3 verso t ≈ 0.048, ritorna a 0 a t = 0.06; poi si ripete (minimo verso 0.072, massimo verso 0.108, 0 a 0.12). Forma asimmetrica (fronte ripido vicino a t = 0.06k, rampa lenta in mezzo).
> 3. «a_C [ms⁻²]», scala −400…200 (tacche −400, −200, 0, 200): minimo ≈ −440 a t = 0, 0.06, 0.12; tra un minimo e l'altro la curva sale e forma un plateau ≈ +220 da t ≈ 0.02 a 0.04 (con due lievi gobbe e un leggerissimo avvallamento al centro, t = 0.03).

[NdT: verifica numerica: $l = r/\lambda = 0.09$ m; $x_{max} = r+l = 0.12$ m, $x_{min} = l-r = 0.06$ m; $\omega_1 = 1000\cdot2\pi/60 = 104.7$ rad/s, periodo 0.06 s; $a_C(0) = -r\omega_1^2(1+\lambda) = -438.6$ m/s², $a_C(\pi) = r\omega_1^2(1-\lambda) = +219.3$ m/s²; il doppio massimo del plateau compare perché $\lambda > 1/4$. Tutto coerente con i grafici. «$\omega_1 = 1000\ RPM$» è una velocità angolare espressa in giri/min.]

## PDF p. 33 · pag. stampata 34 · tipo: LaTeX (foto + figura manoscritta)
### 1.5 Cinematica relativa
[foto: escavatore idraulico cingolato con braccio, avambraccio e benna, cilindri idraulici visibili]

Si consideri un riferimento fisso nel piano $\{O; x; y\}$. Si consideri anche un corpo rigido bidimensionale che si muove nel piano, con un riferimento solidale ad esso $\{O'; y'; x'\}$. La posizione di un punto generico $P$ del piano, può essere scritta in entrambi i sistemi di riferimento e la relazione fra i vettori posizione nei due sistemi di riferimento è:

$$ (P - O) = (O' - O) + (P - O') $$

In particolare, il vettore posizione nel sistema di riferimento mobile può essere esplicitato come segue:

$$ (P - O') = x'_P\,\hat{i}' + y'_P\,\hat{j}' $$

> **Figura (manoscritta):** riferimento fisso con assi «X» (orizzontale) e «Y» (verticale), origine «O», versori «i», «j» sottolineati. Un corpo di contorno irregolare (grigio) in alto a destra con origine mobile «O'» al suo interno; assi mobili «x'» (inclinato verso l'alto a destra di un angolo «θ» rispetto a una retta orizzontale per O', con arco e frecce) e «y'» (perpendicolare, verso l'alto a sinistra); versori «i'» e «j'» in O'. Freccia curva «ω» (sottolineata, antioraria) in alto a destra del corpo. Vettori dall'origine: «(O'−O)» da O a O', «(P−O)» da O al punto «P» (fuori dal corpo, in alto); «(P−O')» da O' a P (verticale verso l'alto).

Derivando rispetto al tempo, si ottiene la velocità del punto P:

## PDF p. 34 · pag. stampata 35 · tipo: LaTeX
$$ \vec{V}_P = \frac{d(P - O)}{dt} = \frac{d(O' - O)}{dt} + \frac{d(P - O')}{dt} $$

Poichè il corpo si muove, il vettore $(O' - O)$, che rappresenta la posizione di $O'$ rispetto ad $O$, varia, e pertanto la sua derivata rispetto al tempo è in generale diversa da zero e rappresenta la velocità del punto $O'$. Pertanto:

$$ \vec{V}_P = \vec{V}_{O'} + \frac{d(x'_P\hat{i}' + y'_P\hat{j}')}{dt} $$

$$ \vec{V}_P = \vec{V}_{O'} + \dot{x}'_P\hat{i}' + x'_P\frac{d\hat{i}'}{dt} + \dot{y}'_P\hat{j}' + y'_P\frac{d\hat{j}'}{dt} $$

Indicando con $\omega$ la velcità angolare del corpo rigido, e applicando il teorema di Poisson:

$$ V_P = V'_{O'} + \vec{\omega}\wedge\left(x'_P\hat{i}' + y'_P\hat{k}'\right) + \dot{x}'_P\hat{i} + \dot{y}'_P\hat{j}' $$

[NdT: refusi nella riga precedente: va $\vec V_P = \vec V_{O'} + \vec\omega\wedge(x'_P\hat i' + y'_P\hat j') + \dot x'_P\hat i' + \dot y'_P\hat j'$ (non $V'_{O'}$, non $\hat k'$, non $\hat i$ senza apice). La riga successiva è scritta correttamente. «velcità» è refuso per «velocità».]

$$ V_P = V_{O'} + \vec{\omega}\wedge(P - O') + \dot{x}'_P\hat{i}' + \dot{y}'_P\hat{j}' $$

La quantità $V_{O'} + \vec{\omega}\wedge(P - O')$ rappresenta la velocità che il punto $P$ avrebbe se fosse solidale al corpo rigido, e viene definita velocità di trascinamento $\vec{V}_t$. Invece, la quantità $\dot{x}'_P\hat{i}' + \dot{y}'_P\hat{j}'$ rappresenta la velocità del punto P rispetto al sistema di riferimento mobile, ed è definita come velocità relativa $\vec{V}_{rel}$:

$$ \vec{V}_P = \vec{V}_t + \vec{V}_{rel} $$

Per calcolare l'accelerazione di $P$, bisogna derivare ulteriormente rispetto al tempo:

$$ \vec{a}_P = \frac{d(\vec{V}_{O'})}{dt} + \frac{d\left[\omega\wedge(P - O')\right]}{dt} + \frac{d\left(\dot{x}'_P\hat{i}' + \dot{y}'_P\hat{j}'\right)}{dt} $$

$$ \vec{a}_P = \vec{a}_{O'} + \vec{\dot{\omega}}\wedge(P - O') + \vec{\omega}\wedge\frac{d(P - O')}{dt} + \ddot{x}'_P\hat{i}' + \dot{x}'_P\frac{d\hat{i}'}{dt} + \ddot{y}'_P\hat{j}' + \dot{y}'_P\frac{d\hat{j}'}{dt} $$

In precedenza, dal calcolo della velocità, si è ricavato che:

$$ \frac{d(P - O')}{dt} = \vec{\omega}\wedge(P - O') + \vec{V}_{rel} $$

Sostituendo nell'equazione dell'accelerazione del punto P, e applicando il teorema di Poisson per la derivata dei versori:

$$ \vec{a}_P = \vec{a}_{O'} + \vec{\dot{\omega}}\wedge(P - O') + \vec{\omega}\wedge\left[\vec{\omega}\wedge(P - O') + \vec{V}_{rel}\right] + $$
$$ + \ddot{x}'_P\hat{i}' + \ddot{y}'_P\hat{j}' + \vec{\omega}\wedge\left(\dot{x}'_P\hat{i}' + \dot{y}'_P\hat{j}'\right) $$

$$ \vec{a}_P = \vec{a}_{O'} + \vec{\dot{\omega}}\wedge(P - O') - \omega^2(P - O') + \vec{\omega}\wedge\vec{V}_{rel} + \ddot{x}'_P\hat{i}' + \ddot{y}'_P\hat{j}' + \vec{\omega}\wedge\vec{V}_{rel} $$

[NdT: anche qui $\vec\omega\wedge[\vec\omega\wedge(P-O')] = -\omega^2(P-O')$ vale perché il moto è piano (ω ⊥ P−O'). Verificato con SymPy che i due termini $\vec\omega\wedge\vec V_{rel}$ provengono uno dalla derivata di $\vec\omega\wedge(P-O')$ e uno dalla derivata dei versori in $\vec V_{rel}$.]

## PDF p. 35 · pag. stampata 36 · tipo: LaTeX (figura manoscritta)
$$ \vec{a}_P = \vec{a}_{O'} + \vec{\dot{\omega}}\wedge(P - O') - \omega^2(P - O') + \ddot{x}'_P\hat{i}' + \ddot{y}'_P\hat{j}' + 2\vec{\omega}\wedge\vec{V}_{rel} $$

La quantità $\vec{a}_{O'} + \vec{\dot{\omega}}\wedge(P - O') - \omega^2(P - O')$ è l'accelerazione che il punto P avrebbe se fosse solidale al corpo rigido, ed è chiamata accelerazione di trascinamento $\vec{a}_t$. Il termine $\ddot{x}'_P\hat{i}' + \ddot{y}'_P\hat{j}'$ rappresenta l'accelerazione del punto P rispetto al sistema di riferimento mobile, ed è detta accelerazione relativa $\vec{a}_{rel}$. Infine, la quantià $2\vec{\omega}\wedge\vec{V}_{rel}$ costituisce l'accelerazione di Coriolis $\vec{a}_{cc}$. In conclusione:

$$ \vec{a}_P = \vec{a}_t + \vec{a}_{rel} + \vec{a}_{cc} $$

(«quantià» è refuso della fonte per «quantità».)

### 1.5.1 Pistone oleodinamico
Un sistema meccanico il cui studio richiede le equazioni della cinematica relativa è il pistone oleodinamico, costituito da un cilindro e un pistone mobile libero di scorrere al suo interno. Per il suo funzionamento, un fluido incomprimibile (olio) in pressione viene immesso attraverso una delle due valvole alle estremità del cilindro. A seconda di quale delle due valvole viene utilizzata per immettere il fluido, il pistone verrà spinto dal fluido stesso in un verso o nell'altro.

> **Figura (manoscritta):** cilindro verticale (rettangolo allungato) con un occhiello (cerchietto) in cima collegato al fondello superiore da un'asticina; all'interno un pistone (rettangolo orizzontale) a circa metà altezza, il cui stelo esce dal fondo del cilindro e termina con un occhiello in basso. Il fluido è rappresentato da pallini neri sopra e sotto il pistone. Sul fianco destro due luci (valvole): in alto una freccia orizzontale che entra nel cilindro (verso sinistra), etichettata «q»; in basso una freccia orizzontale che esce (verso destra), etichettata «q'».

La portata del fluido immesso nel cilindro può essere espressa come:

$$ q = \frac{dV}{dt} = \frac{dx}{dt}\cdot S $$

dove $dV$ è il volume di fluido che entra nel cilindro nell'intervallo di tempo infinitesimo $dt$, $dx$ è lo spostamento del pistone corrispondente, $S$ è la superficie della sezione del cilindro. La quantità $\frac{dx}{ds}$ rappresenta il modulo della velocità relativa del pistone rispetto al cilindro:

[NdT: refuso della fonte: la velocità relativa è $\frac{dx}{dt}$, non $\frac{dx}{ds}$.]

$$ V_{rel} = \frac{q}{S} $$

La direzione della velocità relativa è coincidente all'asse di simmetria del cilindro, poichè l'uncio moto permesso dall'accoppiamento prismatico fra pistone

*(continua a PDF p. 36; «uncio» è refuso per «unico».)*
