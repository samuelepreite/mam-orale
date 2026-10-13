# Capitolo 1 — Cinematica, statica e dinamica dei meccanismi (seconda parte)

Intervallo: **PDF pp. 36–66** (pagine stampate 37–67: nella dispensa, in questo tratto, pag. stampata = PDF + 1).

Tipo di pagina: tutte le pagine 36–66 sono **LaTeX** (testo battuto in LaTeX) con figure **manoscritte** (disegni a mano digitali, in grigio/nero) e alcune **foto**; nessuna scansione di libro, nessuna pagina interamente manoscritta. Nessun numero di equazione stampato in questo tratto.

### Indice delle sezioni (come nella fonte → pagine PDF)

| Sezione | Titolo nella fonte | PDF |
|---|---|---|
| 1.5 (segue da p. 33) | Cinematica relativa | 36–39 |
| 1.5.1 (segue da p. 35) | Pistone oleodinamico — esempio del cassone ribaltabile | 36–39 |
| — | Velocità | 37–38 |
| — | Accelerazione | 38–39 |
| 1.6 | Accelerazione del centro di istantanea rotazione | 39–40 |
| 1.7 | Cinematica analitica | 40–41 |
| 1.7.1 | Cinematica analitica del quadrilatero articolato (Analisi posizione / delle velocità / delle accelerazioni) | 41–43 |
| 1.7.2 | Analisi cinematica del manovellismo di spinta (Analisi della posizione / delle velocità / delle accelerazioni) | 43–44 |
| 1.8 | Statica e dinamica dei meccanismi | 45 |
| 1.8.1 | Equazioni cardinali della statica | 45–47 |
| 1.8.2 | Reazioni vincolari | 47 |
| 1.8.3 | Manovellismo di spinta: forza applicata sul cilindro (Corpo 3, Corpo 2, Corpo 1) | 47–49 |
| 1.8.4 | Manovellismo di spinta: forza applicata sul corpo 2 (Corpo 2, Corpo 1) | 49–52 |
| 1.8.5 | Quadrilatero articolato: forza esterna applicata sul corpo 3 (Corpo 3, Corpo 2, Corpo 1) | 52–54 |
| 1.8.6 | Equazioni cardinali della dinamica (forza e coppia di inerzia) | 55–56 |
| 1.8.7 | Dinamica dei meccanismi (solo titolo) | 56 |
| 1.8.8 | Applicazione 1 (asta con due pattini, guida verticale e orizzontale) | 56–60 |
| 1.8.9 | Forza e coppia di inerzia rispetto ad un polo fisso | 61 |
| 1.9 | Conservazione dell'energia | 61 |
| 1.9.1 | Lavoro e potenza (Lavoro di una forza; Potenza) | 61–62 |
| 1.9.2 | Teorema delle forze vive (conservazione dell'energia meccanica) | 62–64 |
| 1.9.3 | Applicazioni — Esempio 1 (glifo oscillante), Esempio 2 (parallelogramma con pistone) | 64–66 |

### Tipo di ogni pagina

| PDF | stampata | tipo |
|---|---|---|
| 36 | 37 | LaTeX + foto + figura manoscritta |
| 37–44 | 38–45 | LaTeX + figure manoscritte |
| 45 | 46 | LaTeX + foto (3) + figura manoscritta |
| 46–54 | 47–55 | LaTeX + figure manoscritte (p. 47: figura del manovellismo disegnata al computer) |
| 55 | 56 | LaTeX + foto + figura manoscritta |
| 56–62 | 57–63 | LaTeX + figure manoscritte |
| 63 | 64 | LaTeX + figura manoscritta + foto con schema sovrapposto |
| 64–65 | 65–66 | LaTeX + figure su griglia (glifo) e manoscritte |
| 66 | 67 | LaTeX (solo testo e formula) |

Convenzioni di trascrizione: le grandezze sottolineate nei disegni a mano (vettori) sono rese con $\underline{\ }$; le cancellature a barra della fonte (termini nulli barrati) sono rese con $\cancel{\ }$ perché fanno parte del ragionamento (termine che si annulla).

---

## PDF p. 36 · pag. stampata 37 · tipo: LaTeX (con foto e figura manoscritta)
### 1.5 Cinematica relativa — 1.5.1 Pistone oleodinamico (segue da p. 35)

e cilindro è una traslazione relativa lungo questa direzione. Il verso della velocità relativa, come detto, dipende da quale valvola viene utilizzata come ingresso.

Un esempio di applicazione di pistone oleodinamico è il meccanismo di solleveamento del cassone di un autocarro.

[foto: autocarro ribaltabile con il cassone sollevato da un pistone oleodinamico]

Il suddetto meccanismo può essere schematizzato come segue:

> **Figura:** schema del ribaltabile. Un rettangolo grigio inclinato (cassone, corpo **3**) con il vertice in basso a sinistra incernierato a terra in **O** (simbolo di cerniera fissa, cerchio a quadranti). Il lato lungo inferiore sale verso destra (circa 25–30° sull'orizzontale). Sotto il lato inferiore, circa a 2/3 della lunghezza da O, il punto **B**: cerniera (cerchietto) da cui scende un pistone oleodinamico quasi verticale; attorno a B è disegnato un piccolo arco (cerniera). Il pistone è composto da: stelo superiore (corpo **2**) che entra in un cilindro (rettangolo) ; la parte inferiore (corpo **1**, etichetta "1" in basso) termina nella cerniera fissa **A** a terra (sotto B, leggermente a destra di O). Una freccia orizzontale con etichetta **q** punta verso il cilindro da destra (immissione del fluido). Etichette "3" sul cassone vicino al lato inferiore, "2" a sinistra del cilindro, "1" vicino ad A.

Il sistema è costituito da 3 corpi rigidi (9 gradi di libertà se svincolati), vincolati da tre accoppiamenti rotoidali ed uno prismatico (8 gradi di vincolo totali), risultando in un grado di libertà.

Per applciare le equazioni della cinematica relativa è necessario stabilire:

1. il sistema di riferimento mobile solidale ad uno dei corpi del sistema;
2. il punto P (non appartenente al corpo rigido scelto come riferimento).

[NdT: conteggio verificato: 3·3 = 9 g.d.l.; 3 rotoidali × 2 + 1 prismatico × 2 = 8 g.d.v.; 9 − 8 = 1 g.d.l.]

## PDF p. 37 · pag. stampata 38 · tipo: LaTeX (con figura manoscritta)
### Velocità

In questo esempio, si ipotizzi di conoscere la portata volumetrica $q$ di fluido immessa nel cilindro. Questo dato permette di calcolare il modulo della velocità relativa fra pistone e cilindro. Per questo motivo, il sistema di riferimento mobile può essere fissato al corpo 1, mentre il punto P può essere scelto in B perché appartiene al corpo 2.
Applicando le equazioni della cinematica relativa, la velocità nel punto B può essere espressa come:

$$ \vec V_B = \vec V_{rel,B} + \vec V_{t,B} $$

Come visto, il modulo della velocità relativa è dato da:

$$ \vec V_{rel,B} = \frac{q}{S} $$

[NdT: a sinistra c'è il simbolo vettoriale ma si sta scrivendo il modulo: andrebbe $|\vec V_{rel,B}| = q/S$, con $S$ area del pistone.]

Anche la direzione della velocità relativa è nota, poiché il pistone può muoversi solo lungo la direzione dell'accoppiamento prismatico. Supponendo che il fluido venga immesso nell'ingresso inferiore del cilindro, anche il verso della velocità relativa è noto (verso l'alto). La velocità di trascinamento $\vec V_{t,B}$ è la velocità che il punto B avrebbe se fosse solidale al corpo 1. Poichè il corpo 1 ruota attorno ad una cerniera fissa (A), la velocità di trascinamento di B è data da:

$$ \vec V_{t,B} = \cancel{\vec V_A} + \vec\omega_1 \wedge (B-A) $$

> **Figura:** asta nera quasi verticale (leggermente inclinata, con l'estremo superiore un po' a destra) da **A** (in basso, cerniera fissa a quadranti) a **B** (in alto, cerchietto). Presso A una freccia curva verso sinistra (antioraria) con etichetta $\underline{\omega_1}$.

Si osservi che il punto B appartiene anche al corpo 3 che è vincolato da una cerniera fissa in O. Per cui:

$$ \vec V_B = \cancel{\vec V_O} + \vec\omega_3 \wedge (B-O) $$

Uguagliando le due espressioni di $\vec V_B$:

$$ \vec V_{rel,B} + \vec\omega_1 \wedge (B-A) = \vec\omega_3 \wedge (B-O) $$

## PDF p. 38 · pag. stampata 39 · tipo: LaTeX (con figura manoscritta)

Componendo il poligono dei vettori è possibile ricavare risolvere tutte le velocità del sistema:

> **Figura:** poligono delle velocità (triangolo). Dal vertice in basso (punto d'incontro di due rette) parte verso l'alto, quasi verticale, il vettore $\underline{V_{rel\,B}}$ (etichetta a sinistra, "VrelB"), che termina con la punta in alto. Dalla stessa punta in alto un secondo vettore lungo scende obliquamente verso destra-basso: è $\underline{\omega_3}\wedge(B-O)$ — disegnato come freccia con la punta nel vertice in alto (cioè il vettore risultante $\omega_3\wedge(B-O)$ va dall'origine del poligono al vertice in alto). Un terzo vettore corto, quasi orizzontale, $\underline{\omega_1}\wedge(B-A)$, con la punta verso sinistra, chiude il triangolo in basso. Due rette di costruzione con etichette: «DIR ⊥(B−A)» (quasi orizzontale, passa per il vertice in basso a destra) e «DIR ⊥(O−B)» (obliqua, prolungamento del lato $\omega_3\wedge(B-O)$ verso il basso). Lettura: $\omega_1\wedge(B-A)$ (direzione ⊥(B−A)) + $V_{rel,B}$ (lungo il pistone) = $\omega_3\wedge(B-O)$ (direzione ⊥(O−B)).

### Accelerazione

Supponendo che la portata $q$ si mantenga costante, l'accelerazione relativa fra pistone e cilindro è nulla. Applicando le equazioni della cinematica relativa per l'accelerazione del punto B:

$$ \vec a_B = \cancel{\vec a_{rel,B}} + \vec a_{t,B} + \vec a_{cc,B} $$

Come fatto per la velocità, l'accelerazione di trascinamento si ottiene considerando il punto B come appartenente al corpo 1, cioè come se stesse ruotando attorno ad A:

$$ \vec a_{t,B} = \cancel{\vec a_A} + \dot{\vec\omega}_1 \wedge (B-A) - \omega_1^2 (B-A) $$

Dalla cinematica relativa, pertanto, risulta che:

$$ \vec a_B = \dot{\vec\omega}_1 \wedge (B-A) - \omega_1^2 (B-A) + 2\vec\omega_1 \wedge \vec V_{rel} $$

Inoltre, poiche B appartiene anche al corpo 3:

$$ \vec a_B = \cancel{\vec a_O} + \dot{\vec\omega}_3 \wedge (B-O) - \omega_3^2 (B-O) $$

Uguagliando:

$$ \dot{\vec\omega}_1 \wedge (B-A) - \omega_1^2 (B-A) + 2\vec\omega_1 \wedge \vec V_{rel,B} = \dot{\vec\omega}_3 \wedge (B-D) - \omega_3^2 (B-D) $$

[NdT: a destra è stampato $(B-D)$: refuso per $(B-O)$, come nella riga precedente; nel meccanismo non esiste un punto D.]

Il poligono dei vettori risultante è il seguente:

## PDF p. 39 · pag. stampata 40 · tipo: LaTeX (con figure manoscritte)

> **Figura:** poligono delle accelerazioni (quadrilatero). Partendo dal vertice in alto a destra: il vettore $-\omega_1^2(B-A)$ scende quasi verticale verso il basso (etichetta a destra); dal suo estremo inferiore il vettore $2\underline{\omega_1}\wedge \underline{V_{rel\,B}}$ è orizzontale con la punta verso sinistra (etichetta sotto); segue il vettore $\dot{\underline{\omega}}_1\wedge(B-A)$, orizzontale verso sinistra, fino al punto nero di chiusura (etichetta sopra). Dall'altro ramo, dallo stesso vertice in alto a destra parte il vettore $-\omega_3^2(B-O)$, lungo, obliquo verso sinistra-basso (etichetta in alto a sinistra); dal suo estremo il vettore $\dot{\underline{\omega}}_3\wedge(B-O)$ scende verso destra fino al punto nero di chiusura. Rette di costruzione: «DIR ⊥(B−A)» quasi orizzontale per il punto di chiusura (a sinistra) e «DIR ⊥(B−O)» obliqua verso il basso a destra per il punto di chiusura. Le incognite sono i moduli di $\dot\omega_1$ e $\dot\omega_3$ (direzioni note).

## 1.6 Accelerazione del centro di istantanea rotazione

Si consideri una ruota che rotola su un piano senza strisciare. Ad ogni instante di tempo, il centro di istantanea rotazione della ruota $K$ coincide con il punto di contatto con il piano.

La velocità del centro di rotazione $K$, per definizione, è nulla. Tuttavia, la sua accelerazione non lo è.

> **Figura:** assi Y (verticale) e X (orizzontale) con origine O; sul piano orizzontale tre posizioni successive di una ruota (cerchio con centro **C**) agli istanti $t_1$, $t_2$, $t_3$ (etichette in alto), ognuna con freccia curva $\omega$ (oraria, in alto a sinistra di ciascun cerchio). Prima ruota: punto di contatto $K_1$ in basso. Seconda ruota: contatto in $K_2$, e il punto $K_1$ della ruota si è spostato in alto a sinistra sul bordo. Terza ruota: contatto in $K_3$; $K_2$ è in alto a sinistra sul bordo e $K_1$ sul bordo a destra, a metà altezza circa.

Durante il rotolamento senza strisciamento della ruota, il centro di rotazione cambia. Come mostrato nell'im-magine precedente, se nell'istante $t_1$ il centro di rotazione è il punto $K_1$, nel-l'istante $t_2$ questo punto si sarà spostato, e il centro di rotazione è il punto $K_2$, sempre appartenente alla ruota.

Nell'istante $t_1$, la velocità e l'accelerazione di un generico punto $P$ della ruota possono essere espresse come:

$$ \vec V_P = \cancel{\vec V_{K_1}} + \vec\omega \wedge (P-K_1) $$

$$ \vec a_P = \vec a_{K_1} + \dot{\vec\omega} \wedge (P-K_1) - \omega^2 (P-K_1) $$

Si definisca $K^*$ come un punto che occupa istante per istante la posizione del centro di rotazione del corpo. Si può intuire che questo punto non è solidale alla ruota, e segue la stessa traiettoria rettilinea del centro della ruota $C$. Pertanto, ad ogni istante risulta:

## PDF p. 40 · pag. stampata 41 · tipo: LaTeX (con figura manoscritta)

$$ \vec V_{K^*} = \vec V_C $$

Poichè il punto $K^*$ occupa sempre la posizione del centro di istantanea rotazione, allora la seguente relazione è sempre valida:

$$ \vec V_P = \vec\omega \wedge (P-K^*) $$

Derivando, è possibile ricavare un'altra espressione dell'accelerazione del punto P:

$$ \begin{aligned}
\vec a_P = \frac{d\vec V_P}{dt} &= \frac{d(\vec\omega\wedge(P-K^*))}{dt} = \\
&= \dot{\vec\omega}\wedge(P-K^*) + \vec\omega\wedge\frac{d(P-K^*)}{dt} = \\
&= \dot{\vec\omega}\wedge(P-K^*) + \vec\omega\wedge\left[\frac{d(P-O)}{dt} + \frac{d(O-K^*)}{dt}\right] = \\
&= \dot{\vec\omega}\wedge(P-K^*) + \vec\omega\wedge\left[\vec V_P - \vec V_{K^*}\right] = \\
&= \dot{\vec\omega}\wedge(P-K^*) + \vec\omega\wedge[\vec\omega\wedge(P-K^*)] - \vec\omega\wedge\vec V_{K^*} = \\
&= \dot{\vec\omega}\wedge(P-K^*) - \omega^2(P-K^*) - \vec\omega\wedge\vec V_{K^*}
\end{aligned} $$

Confrontando le due espressioni ottenute per l'accelerazione del punto P e considerando che all'istante $t_1$ $K_1 \equiv K^*$, è possibile dedurre che:

$$ \vec a_K = -\vec\omega \wedge \vec V_{K^*} $$

[NdT: verificato. Per la ruota di raggio R che rotola verso destra ($\vec\omega=-\omega\hat k$, $\vec V_{K^*}=\vec V_C=\omega R\,\hat\imath$) si ottiene $\vec a_K=\omega^2R\,\hat\jmath$: modulo $\omega^2R$, diretta da K verso il centro C. Il passaggio $\vec\omega\wedge(\vec\omega\wedge\vec r)=-\omega^2\vec r$ vale nel moto piano ($\vec\omega\perp\vec r$).]

## 1.7 Cinematica analitica

Si consideri un piano complesso, cioè un piano cartesiano caratterizzato da un asse reale e uno immaginario. Un vettore generico $\vec V$ che forma un angolo $\varphi$ con l'asse reale, può essere espresso nel piano complesso come:

$$ \vec V = V e^{i\varphi} = V\cos\varphi + i\cdot V\sin\varphi $$

> **Figura:** piano complesso con asse verticale **Im** e asse orizzontale **Re**, origine **O**. Un vettore $\underline V$ (freccia spessa) parte da un punto interno e sale verso destra; dalla sua coda una retta orizzontale di riferimento; l'angolo $\varphi$ è misurato in senso antiorario dalla orizzontale al vettore (archetto con freccia).

## PDF p. 41 · pag. stampata 42 · tipo: LaTeX (con figura manoscritta)

Si considerino quattro vettori la cui somma sia zero:

> **Figura:** piano complesso (assi Im verticale, Re orizzontale, origine O). Quadrilatero chiuso di quattro vettori in successione testa-coda: $\underline{V_1}$ da un vertice a sinistra sale verso destra fino al vertice in alto; $\underline{V_2}$ da lì va quasi orizzontale verso destra (leggermente in discesa) al vertice destro; $\underline{V_3}$ scende verso sinistra-basso al vertice inferiore; $\underline{V_4}$ torna verso sinistra (salendo leggermente) al vertice di partenza. Ad ogni coda una retta orizzontale di riferimento verso destra e l'angolo $\varphi_j$ misurato in verso antiorario dall'orizzontale al vettore: $\varphi_1$ piccolo (~35°); $\varphi_2$ quasi un giro (~350°, archetto quasi completo); $\varphi_3$ circa 230° (archetto grande); $\varphi_4$ circa 160° (archetto).

In forma esponenziale, la loro somma è espressa come:

$$ V_1e^{i\varphi_1} + V_2e^{i\varphi_2} + V_3e^{i\varphi_3} + V_4e^{i\varphi_4} = 0 $$

In forma trigonometrica:

$$ V_1\cos\varphi_1 + iV_1\sin\varphi_1 + V_2\cos\varphi_2 + iV_2\sin\varphi_2 + V_3\cos\varphi_3 + iV_3\sin\varphi_3 + V_4\cos\varphi_4 + iV_4\sin\varphi_4 = 0 $$

$$ (V_1\cos\varphi_1 + V_2\cos\varphi_2 + V_3\cos\varphi_3 + V_4\cos\varphi_4) + i\,(V_1\sin\varphi_1 + V_2\sin\varphi_2 + V_3\sin\varphi_3 + V_4\sin\varphi_4) = 0 $$

Poichè la somma tra un numero reale ed uno immaginario da come risultato un numero complesso, e che un numero complesso è 0 quando la parte reale e quella immaginaria sono emtrambe uguali a zero, si può scrivere:

$$ \begin{cases} V_1\cos\varphi_1 + V_2\cos\varphi_2 + V_3\cos\varphi_3 + V_4\cos\varphi_4 = 0 \\ V_1\sin\varphi_1 + V_2\sin\varphi_2 + V_3\sin\varphi_3 + V_4\sin\varphi_4 = 0 \end{cases} $$

Lo stesso risultato può essere ottenuto geometricamente.

### 1.7.1 Cinematica analitica del quadrilatero articolato

Si consideri un quadrilatero articolato in un piano complesso:

## PDF p. 42 · pag. stampata 43 · tipo: LaTeX (con figure manoscritte)

> **Figura 1:** piano complesso (Im verticale, Re orizzontale, origine O). Quadrilatero articolato: cerniera fissa **A** (simbolo a quadranti) a sinistra, a media altezza; asta **1** sale verso destra fino alla cerniera **B** (cerchietto, punto più alto); asta **2** quasi orizzontale, leggermente in discesa, fino alla cerniera **C** (cerchietto) a destra; asta **3** scende ripida verso destra-basso fino alla cerniera fissa **D** (simbolo a quadranti), più bassa di A. Il telaio A–D non è disegnato.
>
> **Figura 2:** stesso quadrilatero con i vettori: $\underline{V_1}$ da A a B (angolo $\varphi_1$ antiorario dalla orizzontale per A, ~35°); $\underline{V_2}$ da B a C ($\varphi_2$ quasi un giro, archetto attorno a B); $\underline{V_3}$ da C a D ($\varphi_3$ archetto grande attorno a C, ~290°); $\underline{V_4}$ da D ad A, lungo, verso sinistra e leggermente verso l'alto ($\varphi_4$ ~170°, archetto attorno a D). I vettori sono disegnati come frecce doppie lungo le aste; la poligonale A→B→C→D→A è chiusa.

Le distanze tra le cerniere possono essere rappresentate attraverso vettori che compongono un poligono chiuso, pertanto:

$$ V_1e^{i\varphi_1} + V_1e^{i\varphi_1} + V_3e^{i\varphi_3} + V_4e^{i\varphi_4} = 0 $$

[NdT: il secondo termine è stampato $V_1e^{i\varphi_1}$: refuso per $V_2e^{i\varphi_2}$ (lo conferma il sistema scalare che segue, con $V_2\cos\varphi_2$, $V_2\sin\varphi_2$).]

### Analisi posizione

Come visto in precedenza, entrambe le componenti (reale e immaginaria) sono pari a zero:

$$ \begin{cases} V_1\cos\varphi_1 + V_2\cos\varphi_2 + V_3\cos\varphi_3 + V_4\cos\varphi_4 = 0 \\ V_1\sin\varphi_1 + V_2\sin\varphi_2 + V_3\sin\varphi_3 + V_4\sin\varphi_4 = 0 \end{cases} $$

I moduli dei vettori $\{V_1; V_2; V_3; V_4\}$ rappresentano le lunghezze delle aste del quadrilatero, pertanto sono dimensioni note e costanti. Inoltre, anche l'angolo $\varphi_4$ è noto e costante.

Per conoscere la configurazione del meccanismo è quindi necessario conoscere, in ogni istante, il valore degli angoli $\{\varphi_1; \varphi_2; \varphi_3\}$. Ipotizzando noto il valore

## PDF p. 43 · pag. stampata 44 · tipo: LaTeX (con figura manoscritta)

di $\varphi_1$, risolvendo il sistema precedente è possibile ricavare il valore delle due incognite $\{\varphi_2; \varphi_3\}$. Il sistema risulta non lineare per la presenza delle funzioni trigonometriche seno e coseno.

### Analisi delle velocità

Per l'analisi delle velocità è necessario derivare il sistema ottenuto in precedenza dall'analisi delle posizioni.

Ricordando della presenza delle costanti $\{V_1; V_2; V_3; V_4; \varphi_4\}$, derivando si ottiene:

$$ \begin{cases} -V_1\sin\varphi_1\dot\varphi_1 - V_2\sin\varphi_2\dot\varphi_2 - V_3\sin\varphi_3\dot\varphi_3 = 0 \\ V_1\cos\varphi_1\dot\varphi_1 + V_2\cos\varphi_2\dot\varphi_2 + V_3\cos\varphi_3\dot\varphi_3 = 0 \end{cases} $$

Ipotizzando noto anche il valore di $\dot\varphi_1$, questo sistema può essere risolto per ricavare le incognite $\{\dot\varphi_2; \dot\varphi_3\}$.

A differenza dell'analisi delle posizioni, questo è sistema è lineare.

### Analisi delle accelerazioni

Derivando ulteriormente è possibile analizzare le accelerazioni del meccanismo:

$$ \begin{cases} -V_1\cos\varphi_1\dot\varphi_1^2 - V_1\sin\varphi_1\ddot\varphi_1 - V_2\cos\varphi_2\dot\varphi_2^2 - V_2\sin\varphi_2\ddot\varphi_2 - V_3\cos\varphi_3\dot\varphi_3^2 - V_3\sin\varphi_3\ddot\varphi_3 = 0 \\ -V_1\sin\varphi_1\dot\varphi_1^2 + V_1\cos\varphi_1\ddot\varphi_1 - V_2\sin\varphi_2\dot\varphi_2^2 + V_2\cos\varphi_2\ddot\varphi_2 - V_3\sin\varphi_3\dot\varphi_3^2 + V_3\cos\varphi_3\ddot\varphi_3 = 0 \end{cases} $$

[NdT: sistemi di velocità e accelerazione verificati con SymPy derivando il sistema di posizione: corretti.]

Anche in questo caso, supposto noto il valore di $\ddot\varphi_1$, è possibile risolvere il sistema lineare nelle due incognite $\{\ddot\varphi_2; \ddot\varphi_3\}$.

### 1.7.2 Analisi cinematica del manovellismo di spinta

Analogamente al quadrilatero articolato, anche il manovellismo di spinta può essere studiato mediante la cinematica analitica nel piano complesso:

> **Figura:** piano complesso (Im, Re, origine O). Cerniera fissa **A** (a quadranti) a sinistra; manovella **1** sale verso destra fino alla cerniera **B** (cerchietto, punto più alto); biella **2** scende verso destra fino alla cerniera **C** (cerchietto) sul corsoio **3** (rettangolino) che scorre in una guida orizzontale (due tratti tratteggiati sopra e sotto, simbolo di guida). C è poco più in basso di B e circa alla stessa quota di A.

## PDF p. 44 · pag. stampata 45 · tipo: LaTeX (con figura manoscritta)

> **Figura:** stesso manovellismo con i vettori: $\underline{V_1}$ da A a B (angolo $\varphi_1$ antiorario dall'orizzontale per A); $\underline{V_2}$ da B a C ($\varphi_2$, archetto attorno a B, angolo poco meno di 360°, misurato dall'orizzontale per B); $\underline{V_3}$ da C ad A lungo l'orizzontale, verso sinistra ($\varphi_3$ archetto attorno a C, ≈180°). La guida del corsoio 3 è orizzontale e passa per A.

In questo caso i vettori $\vec V_1$ e $\vec V_1$ hanno modulo costante ($V_1$ =cost, $V_2$ =cost), mentre il vettore $\vec V_3$ ha direzione costante ($\varphi_3$ =cost).

[NdT: «$\vec V_1$ e $\vec V_1$»: refuso per «$\vec V_1$ e $\vec V_2$», come indica la parentesi.]

### Analisi della posizione

Scomponendo la somma vettoriale nelle due direzioni:

$$ \begin{cases} V_1\cos\varphi_1 + V_2\cos\varphi_2 + V_3\cos\varphi_3 = 0 \\ V_1\sin\varphi_1 + V_2\sin\varphi_2 + V_3\sin\varphi_3 = 0 \end{cases} $$

Noto $\varphi_1$, le incognite $\{\varphi_2; V_3\}$ si ottengono dalla risoluzione di questo sistema non lineare.

### Analisi delle velocità

Derivando il sistema delle posizioni tenendo conto delle costanti del sistema, si ottiene:

$$ \begin{cases} -V_1\sin\varphi_1\dot\varphi_1 - V_2\sin\varphi_2\dot\varphi_2 + \dot V_3\cos\varphi_3 = 0 \\ V_1\cos\varphi_1\dot\varphi_1 + V_2\cos\varphi_2\dot\varphi_2 + \dot V_3\sin\varphi_3 = 0 \end{cases} $$

Il sistema ottenuto è lineare nelle incognite $\{\dot\varphi_2; \dot V_3\}$.

### Analisi delle accelerazioni

Derivando ulteriormente si ottiene:

$$ \begin{cases} -V_1\cos\varphi_1\dot\varphi_1^2 - V_1\sin\varphi_1\ddot\varphi_1 - V_2\cos\varphi_2\dot\varphi_2^2 - V_2\sin\varphi_2\ddot\varphi_2 + \ddot V_3\cos\varphi_3 = 0 \\ -V_1\sin\varphi_1\dot\varphi_1^2 + V_1\cos\varphi_1\ddot\varphi_1 - V_2\sin\varphi_2\dot\varphi_2^2 + V_2\cos\varphi_2\ddot\varphi_2 + \ddot V_3\sin\varphi_3 = 0 \end{cases} $$

[NdT: verificati con SymPy (con $V_1,V_2,\varphi_3$ costanti): corretti. Con $\varphi_3=\pi$ (figura) si ha $\cos\varphi_3=-1$, $\sin\varphi_3=0$.]

Anche questo sistema è lineare nelle due incognite $\{\ddot\varphi_2; \ddot V_3\}$.

## PDF p. 45 · pag. stampata 46 · tipo: LaTeX (con foto e figura manoscritta)
## 1.8 Statica e dinamica dei meccanismi

[foto: tre immagini affiancate — una pinza/gripper meccanico a leveraggi; una piattaforma elevatrice a pantografo (forbice) con attuatore; un esoscheletro per gli arti inferiori]

### 1.8.1 Equazioni cardinali della statica

Si consideri un corpo rigido su cui agiscono delle forze e coppie esterne.

> **Figura:** contorno chiuso irregolare (corpo rigido). Al suo interno: punto $P_1$ in alto a sinistra con forza $\underline{F_1}$ diretta verso destra-basso; punto $P_2$ a sinistra con forza $\underline{F_2}$ diretta verso il basso (leggermente a destra); punto $P_i$ a destra con forza $\underline{F_i}$ orizzontale verso sinistra; punto $P_m$ in basso al centro con forza $\underline{F_m}$ diretta verso l'alto (leggermente a destra). Coppie (frecce curve): $\underline{C_1}$ accanto al centro a sinistra (oraria), $\underline{C_i}$ in alto a destra (oraria), $\underline{C_2}$ a destra (antioraria), $\underline{C_m}$ in basso (antioraria).

Si dice che il corpo è in equilibrio statico quando la somma di tutte le forze e di tutti i momenti è nulla:

$$ \begin{cases} \sum_{i=1}^{n} \vec F_i = 0 \\ \sum_{i=1}^{n} (P_i - O)\wedge\vec F_i + \sum_{i=1}^{m} \vec C_i = 0 \end{cases} $$

Queste due equazioni rappresentano le equazioni cardinali della statica, e possono essere applicate anche a sistemi di corpi, considerando solo le forze esterne:

## PDF p. 46 · pag. stampata 47 · tipo: LaTeX (con figure manoscritte)

> **Figura 1:** quattro contorni irregolari parzialmente sovrapposti (sistema di corpi): grande in alto a sinistra, uno in alto a destra, uno in basso al centro, uno in basso a destra. Sul corpo in alto a sinistra: punto $P_2$ con forza $\underline{F_2^{est}}$ verso il basso (leggermente a destra), coppia $\underline{C_1^{est}}$ (oraria) a sinistra e coppia $\underline{C_i^{est}}$ (oraria) in alto. Sul corpo in alto a destra: punto $P_1$ con $\underline{F_1^{est}}$ verso destra-basso e coppia $\underline{C_2^{est}}$ (antioraria). Nella zona di sovrapposizione al centro: punto $P_i$ con $\underline{F_i^{est}}$ orizzontale verso sinistra. Corpo in basso al centro: coppia $\underline{C_m^{est}}$ (antioraria). Corpo in basso a destra: punto $P_m$ con $\underline{F_m^{est}}$ verso l'alto.

$$ \begin{cases} \sum_{i=1}^{n} \vec F_i^{est} = 0 \\ \sum_{i=1}^{n} (P_i - O)\wedge\vec F_i^{est} + \sum_{i=1}^{m} \vec C_i^{est} = 0 \end{cases} $$

Per sistemi piani, la prima equazione, che rappresenta l'equilibrio alla traslazione, è un'equazione vettoriale che corrisponde a due equazioni scalari. La seconda equazione ha una sola componente scalare e rappresenta l'equilibrio alla rotazione.

Sulla base delle equazioni cardinali della statica, è possibile dedurre che:

1. Se su di un corpo vengono applicate solo due forze in due punti diversi, queste forze devono necessariamente avere la stessa direzione coincidente con la retta passante per i due punti di applicazione:

   > **Figura:** contorno irregolare con due punti **A** (in alto) e **B** (in basso a destra) e una retta sottile che li attraversa entrambi (obliqua, dall'alto a sinistra al basso a destra), prolungata fuori dal corpo.

2. Se su di un corpo agiscono tre forze e si conosce la direzione di due di queste, allora la direzione della terza forza deve necessariamente passare per il punto di applicazione della forza stessa e per il punto di intersezione delle direzioni delle altre due forze:

## PDF p. 47 · pag. stampata 48 · tipo: LaTeX (con figure manoscritte)

> **Figura:** contorno irregolare. Punto **A** in alto a sinistra con forza $\underline{F_A}$ (freccia grigia spessa) diretta verso destra-basso; punto **B** in basso a sinistra con forza $\underline{F_B}$ diretta verso destra-alto; le due rette d'azione («DIR $F_A$», «DIR $F_B$», tracciate sottili e prolungate) si incontrano in un punto al centro. Punto **C** a destra: la retta «DIR $F_C$» passa per C e per il punto d'intersezione delle altre due (quasi orizzontale).

### 1.8.2 Reazioni vincolari

Ogni vincolo esercita delle forze sul corpo a cui è accoppiato. Queste forze vengono dette reazioni vincolari. In particolare:

1. la reazione vincolare di una coppia rotoidale è una forza avente una qualsiasi direzione passante per il punto indicato dalla cerniera;
2. la reazione vincolare di una coppia prismatica è una forza avente una qualsiasi direzione perpendicolare all'asse di scorrimento.

### 1.8.3 Manovellismo di spinta: forza applicata sul cilindro

Si consideri un manovellismo di spinta, dove sul pistone agisce una forza nota $\vec F$ e di voler calcolare la coppia resistente da applicare al corpo 1 per equilibrare staticamente il sistema:

> **Figura:** assi $y$ (verticale) e $x$ (orizzontale) con origine in **A** (cerniera fissa a quadranti). Manovella **1** (grigio chiaro) da A a **B** (cerchietto), inclinata di $\vartheta$ sull'asse $x$ (angolo segnato in A tra l'asse x e la manovella). Da B una linea verticale sottile scende al piede **H** sull'asse x. Biella **2** (grigio scuro) da B a **C** (cerchietto) sull'asse x; in C l'angolo $\gamma$ tra l'asse x (lato sinistro) e la biella. Il corsoio **3** (rettangolo) con centro C scorre in una guida orizzontale (tratteggi sopra e sotto). Sul corsoio, da destra, una freccia spessa orizzontale verso sinistra: forza **F**.

### Corpo 3

Poichè la forza agente sul pistone è nota, è utile partire dallo schema di corpo libero del corpo 3 (pistone). Trascurando la massa del pistone, su di esso agiscono 3 forze esterne:

- $\vec F$: forza esercitata sul corpo 3, nota in modulo, direzione e verso;
- $\vec F_{2,3}$: è la forza che il corpo 2 esercita sul corpo 3;
- $R_3$: è la reazione vincolare che la guida esercita sul pistone. Essendo una coppia prismatica, di questa forza conosco solo la direzione, cioè una qualsiasi retta perpendicolare all'asse del vincolo.

## PDF p. 48 · pag. stampata 49 · tipo: LaTeX (con figure manoscritte)

Nonostante la forza $\vec F_{2,3}$ sia totalmente incognita, è possibile dedurne la direzione considerando che sul corpo 2 agiscono solo due forze, cioè la forza che il corpo 3 esercita sul corpo 2 ($\vec F_{3,2} = -\vec F_{2,3}$) e la forza che il corpo 1 esercita sul corpo 2 ($\vec F_{1,2}$). Di conseguenza queste due forze hanno necessariamente direzione coincidente con la retta BC:

> **Figura:** biella **2** da **B** (cerchietto, in alto a sinistra) a **C** (cerchietto, in basso a destra). In B la freccia $F_{1,2}$ arriva da sinistra-alto, diretta lungo la retta BC verso destra-basso (punta in B). In C la freccia $F_{3,2}$ arriva da destra-basso, diretta lungo BC verso sinistra-alto (punta in C). Biella compressa.

Poichè sul corpo 3 agiscono solo 3 forze, note le direzioni di $\vec F$ e $\vec F_{2,3}$ incidenti nel punto C, è possibile dedurre che anche la direzione della reazione vincolare deve necessariamente passare per il punto C. Pertanto in questo caso la direzione della reazione vincolare della coppia prismatica è una retta perpendicolare all'asse di scorrimento passante per il punto C:

> **Figura:** rettangolo (corsoio) con il punto **C** (cerchietto) al centro. $F_{2,3}$ arriva da sinistra-alto con punta in C (verso destra-basso); prolungamento tratteggiato oltre C etichettato «DIR $F_{2,3}$». $F$ arriva da destra, orizzontale, punta in C (verso sinistra). $R_C$ verticale dal basso, punta in C (verso l'alto).

Applicando la prima equazione cardinale della statica:

$$ \vec F + \vec F_{2,3} + \vec R_3 = 0 $$

Dal poligono dei vettori è possibile calcolare le forze incognite:

> **Figura:** triangolo delle forze. $F$ orizzontale verso sinistra (lato superiore, dal vertice in alto a destra al vertice in alto a sinistra); dal vertice in alto a sinistra $F_{2,3}$ scende verso destra fino al vertice in basso a destra (direzione tratteggiata «DIR $F_{2,3}$» prolungata ai due estremi); dal vertice in basso a destra $R_C$ verticale verso l'alto chiude sul vertice in alto a destra.

[NdT: nel testo la reazione è $\vec R_3$, nelle figure $R_C$: stessa forza. Dal triangolo: $|F_{2,3}|=F/\cos\gamma$, $R_C=F\tan\gamma$ (verso l'alto), con $\gamma$ angolo della biella sull'asse x; verificato con le componenti.]

### Corpo 2

Applicando la prima equazione della statica al corpo 2 si ottiene:

$$ \vec F_{1,2} + \vec F_{3,2} = 0 $$
$$ \vec F_{1,2} = -\vec F_{3,2} $$

## PDF p. 49 · pag. stampata 50 · tipo: LaTeX (con figure manoscritte)

> **Figura:** (ripetuta) biella **2** da **B** a **C** con $F_{1,2}$ in B (verso destra-basso) e $F_{3,2}$ in C (verso sinistra-alto), lungo BC.

### Corpo 1

Sul corpo 1 agiscono:

- $\vec F_{2,1}$: la forza che il corpo 2 esercita sul corpo 1, nota in modulo, direzione e verso;
- $\vec R_A$: reazione vincolare della cerniera in A;
- $\vec C_1$: la coppia esterna da applicare per equilibrare il sistema.

Dalla prima equazione della statica:

$$ \vec F_{2,1} + \vec R_A = 0 $$
$$ \vec R_A = -\vec F_{2,1} $$

Applicando anche la seconda equazione della statica, utilizzando A come polo dei momenti, si ricava:

$$ \vec C_1 = (B-A)\wedge\vec F_{2,1} $$

[NdT: segno. L'equilibrio alla rotazione attorno ad A è $(B-A)\wedge\vec F_{2,1} + \vec C_1 = 0$, quindi $\vec C_1 = -(B-A)\wedge\vec F_{2,1} = (A-B)\wedge\vec F_{2,1}$. Verifica: con $B-A=a(\cos\vartheta,\sin\vartheta)$ e $\vec F_{2,1}=F_{21}(-\cos\gamma,\sin\gamma)$ (verso B, lungo CB, come in figura) si ha $(B-A)\wedge\vec F_{2,1}=aF_{21}\sin(\vartheta+\gamma)\,\hat k$ (antiorario); la coppia equilibrante è quindi oraria, come dice il testo, ed è $-(B-A)\wedge\vec F_{2,1}$. Il modulo $C_1=F_{2,1}\,b$ con $b=a\sin(\vartheta+\gamma)$ è corretto.]

Il modulo della coppia è quindi dato da:

$$ C_1 = F_{2,1}\cdot b $$

dove $b$ è il braccio della forza $\vec F_{2,1}$. Il verso della coppia è orario:

> **Figura:** manovella **1** da **A** (cerniera, in basso a sinistra) a **B** (cerchietto, in alto); biella **2** da B scende a destra fino a un cerchietto (C) sulla linea tratteggiata orizzontale che parte da A. In B la freccia $F_{2,1}$ lungo la biella con punta in B (verso sinistra-alto). In A la freccia $R_A$ arriva da sinistra-alto con punta in A (verso destra-basso, parallela e opposta a $F_{2,1}$). Sopra A la freccia curva $C_1$ in verso orario.

### 1.8.4 Manovellismo di spinta: forza applicata sul corpo 2

Si consideri un secondo caso in cui la forza viene applicata al corpo 2 invece che al pistone, come mostrato in figura:

## PDF p. 50 · pag. stampata 51 · tipo: LaTeX (con figura manoscritta)

> **Figura:** manovellismo di spinta. Cerniera fissa **A** (a quadranti) in basso a sinistra; manovella **1** sale verso destra fino a **B** (cerchietto); biella **2** scende verso destra fino a **C** (cerchietto) sul corsoio **3** (rettangolino) in guida orizzontale (tratteggi sopra e sotto). Dalla biella, circa a metà, sporge un braccio rigido solidale (fa parte del corpo 2) che sale verso destra fino al punto **P** (pallino nero); su P agisce la forza $\underline F$ (freccia grigia spessa) diretta verso destra-basso. Presso A una freccia curva grigia con etichetta «$\underline{C_1}$ ?» (verso incognito).

### Corpo 2

In questo caso è necessario iniziare dallo schema di corpo libero del corpo 2.

Le forze agenti sul corpo 2 sono:

- $\vec F$, con modulo, direzione e verso noti;
- $\vec F_{1,2}$: la forza che il corpo 1 esercita sul corpo 2.
- $\vec F_{3,2}$: la forza che il corpo 3 esercita sul corpo 2.

In questo caso è possibile dedurre la direzone della $\vec F_{3,2}$ osservando che il corpo 3 è soggetto a 2 forze:

- $\vec F_{2,3}$: la forza che il corpo 2 esercita sul corpo 3 ($\vec F_{2,3} = -\vec F_{3,2}$) di cui conosco il punto di applicazione (C);
- $\vec R_C$: forza di reazione della guida, di cui conosco la direzione, cioè una retta qualsiasi perpendicolare all'asse del corsoio.

Per la statica del corpo 3 si deduce che anche $\vec F_{2,3}$ deve essere perpendicolare all'asse del corsoio, e che anche $\vec R_C$ deve passare per C. Ne consegue che anche $\vec F_{3,2}$ ha la stessa direzione.

Tornando al corpo 2, poichè su di esso agiscono solo 3 forze e conoscendo la direzione di due forze di esse, è possibile ricavare la direzione di $\vec F_{1,2}$, cioè passante per il punto di applicazione della forza (B) e per il punto di intersezione delle direzioni di $\vec F$ e $\vec F_{3,2}$:

## PDF p. 51 · pag. stampata 52 · tipo: LaTeX (con figure manoscritte)

> **Figura:** corpo 2 isolato: biella da **B** (cerchietto, a sinistra in alto) a **C** (cerchietto, in basso a destra, dentro un rettangolo tratteggiato = corsoio rimosso); braccio solidale fino a **P** (pallino) con la forza $\underline F$ verso destra-basso. Rette di costruzione sottili: «DIR $\underline{F_{3,2}}$» verticale passante per C; «DIR $\underline F$» prolungamento della retta d'azione di F oltre P verso destra-basso; le due si incontrano in un punto (pallino grigio) a destra, sopra C. «DIR $\underline{F_{1,2}}$»: retta da B a quel punto d'intersezione (quasi orizzontale, leggermente in salita verso destra).

Dal poligono dei vettori è possibile ricavare le forze incognite:

> **Figura:** triangolo delle forze: $\underline F$ dal vertice in alto a sinistra al vertice a destra (verso destra-basso); $\underline{F_{1,2}}$ dal vertice a destra al vertice in basso a sinistra (verso sinistra, quasi orizzontale); $\underline{F_{3,2}}$ dal vertice in basso a sinistra verticale verso l'alto fino al vertice di partenza. Quindi $\vec F + \vec F_{1,2} + \vec F_{3,2} = 0$, con $F_{3,2}$ verso l'alto e $F_{1,2}$ verso sinistra.

### Corpo 1

Sul corpo 1 agiscono:

- $\vec F_{2,1}$: forza esercitata dal corpo 2 sul corpo 1, con modulo, direzione e verso noti ($\vec F_{2,1} = -\vec F_{1,2}$);
- $\vec R_1$: reazione vincolare della cerniera A, di cui si conosce il punto di applicazione (A);
- $\vec C_1$: la coppia da esercitare per equilibrare il sistema.

Applicando la prima equazione della statica:

$$ \vec F_{2,1} + \vec R_1 = 0 $$
$$ \vec R_1 = -\vec F_{2,1} $$

Dalla seconda equazione della statica si ottiene:

$$ C_1 = F_{2,1}\cdot b_{2,1} $$

con senso antiorario:

## PDF p. 52 · pag. stampata 53 · tipo: LaTeX (con figure manoscritte)

> **Figura:** manovella **1** da **A** (cerchietto, in basso) a **B** (cerchietto, in alto a destra). In B la forza $\underline{F_{2,1}}$ orizzontale verso destra. In A la reazione $\underline{R_A}$ orizzontale verso sinistra. Una retta orizzontale sottile per A; la quota verticale $\underline{b_{2,1}}$ (freccia doppia) tra la retta d'azione di $F_{2,1}$ e la retta orizzontale per A. Presso A la freccia curva $\underline{C_1}$ in verso antiorario.

[NdT: verso verificato: $\vec F_{2,1}$ verso destra applicata in B, sopra A, dà momento orario rispetto ad A; la coppia equilibrante è dunque antioraria, come stampato. Si noti che la reazione è chiamata $\vec R_1$ nel testo e $R_A$ in figura.]

### 1.8.5 Quadrilatero articolato: forza esterna applicata sul corpo 3

Si consideri un quadrilatero articolato utilizzato per frantumare rocce. Il corpo da schiacciare eserciterà una forza resistenze sull'asta. Nota la forza resistente $\vec F$, è possibile calcolare la coppia motrice agente sulla prima asta necessaria per garantire l'equilibrio del sistema. Si ipotizzi che la forza resistente agisca parallelamente all'asta BC.

> **Figura:** quadrilatero articolato. Cerniera fissa **A** (a quadranti) in basso a sinistra; asta **1** sale verso destra fino a **B** (cerchietto); asta **2** lunga, quasi orizzontale e leggermente in salita, da B a **C** (cerchietto con piccolo arco di cerniera); asta **3** lunga, quasi verticale (inclinata: estremo superiore più a sinistra), passa per C e va dalla cerniera fissa **D** (a quadranti, in basso a destra) fino oltre C verso l'alto. Tra l'estremità superiore dell'asta 3 e una parete fissa verticale a destra (tratteggio di telaio) è stretto un sasso (contorno irregolare).

## PDF p. 53 · pag. stampata 54 · tipo: LaTeX (con figure manoscritte)

> **Figura 1:** stesso quadrilatero; sul tratto superiore dell'asta 3, contro il sasso, una freccia nera spessa (forza resistente $\vec F$) proveniente da destra-alto, diretta verso sinistra-basso (parallela a BC). Presso A la freccia curva $\underline{C_1}$ in verso orario.

### Corpo 3

Il corpo 3 è soggetto a 3 forze:

- $\vec F$, con modulo, direzione e verso noti;
- $\vec R_D$: reazione vincolare che esercita la cerniera D sul corpo 3;
- $\vec F_{2,3}$: forza esercitata dal corpo 2 sul corpo 3, di cui è noto il punto di applicazione (C).

Poichè sul corpo 2 agiscono solo due forze ($\vec F_{1,2}$ e $\vec F_{3,2}$), le loro direzioni coincidono con la retta BC. Di conseguenza anche $\vec F_{2,3}$ ha la stessa direzione.

Sul corpo 3 agiscono solo 3 forze, e si conosce la direzione di due di queste ($F_R$ e $F_{2,3}$). In questo caso le due direzioni sono parallele, ne consegue che anche la terza forza ha la stessa direzione. Pertanto, lo schema di corpo libero del corpo 3 è il seguente:

[NdT: $F_R$ indica la forza resistente, chiamata $\vec F$ nel resto della pagina.]

> **Figura 2 (corpo libero del corpo 3):** asta **3** quasi verticale da **D** (in basso) verso l'alto, con la cerniera **C** (cerchietto) a circa metà. In alto la forza $\underline F$ (nera, spessa) verso sinistra-basso, applicata all'estremo superiore. In C la forza $\underline{F_{2,3}}$ da sinistra, verso destra (leggermente in salita), punta in C. In D la reazione $\underline{R_D}$ (grigia) diretta verso sinistra-basso, parallela a F. Quote (frecce doppie perpendicolari alle forze, con linee tratteggiate di riferimento): $b_{F_{2,3}}$ distanza tra la retta d'azione di $F_{2,3}$ e la parallela per D; $b_F$ (più grande) distanza tra la retta d'azione di $F$ e la parallela per D.

Dall'equilibrio alla rotazione attorno a D (seconda equazione della statica) si ottiene:

## PDF p. 54 · pag. stampata 55 · tipo: LaTeX (con figure manoscritte)

$$ F\cdot b_f - F_{2,3}\cdot b = 0 $$
$$ F_{2,3} = \frac{F\cdot b_f}{b} $$

[NdT: notazione: in figura i bracci sono $b_F$ e $b_{F_{2,3}}$, nella formula $b_f$ e $b$. Segni verificati: F (verso sinistra, sopra D) e $F_{2,3}$ (verso destra, sopra D) danno momenti opposti rispetto a D. Dalla traslazione $\vec R_D = -(\vec F + \vec F_{2,3})$, parallela alle altre due e con modulo $F_{2,3}-F = F(b_f-b)/b$, nel verso di $\vec F$ (come in figura).]

### Corpo 2

Come già visto, sul corpo 2 agiscono solo due forze:

> **Figura:** asta **2** da **B** (cerchietto, a sinistra, più in basso) a C (cerchietto, a destra, più in alto). In B la forza $\underline{F_{1,2}}$ arriva da sinistra-basso con punta in B (verso destra lungo l'asta); in C la forza $\underline{F_{3,2}}$ arriva da destra-alto con punta in C (verso sinistra lungo l'asta). Asta compressa.

In modulo:

$$ F_{1,2} = F_{3,2} = F_{2,3} $$

### Corpo 1

Sul corpo 1 agiscono:

- $\vec F_{2,1}$: forza che il corpo 2 esercita sul corpo 1, completamente nota;
- $\vec R_1$: reazione vincolare esercitata dalla cerniera in A sul corpo 1;
- $\vec C_1$: coppia motrice generata dal motore elettrico per mantenere l'equilibrio del sistema

Applicando la prima equazione della statica (equilibrio alla traslazione):

$$ \vec F_{2,1} + \vec R_1 = 0 $$
$$ \vec R_1 = -\vec F_{2,1} $$

Applicando la seconda equazione, con polo in A, si ottiene:

$$ C_1 = F_{2,1}\cdot b_{2,1} $$

Il verso di rotazione di $\vec C_1$ è orario:

> **Figura:** asta **1** da **A** (in basso) a **B** (in alto a destra). In B la forza $\underline{F_{2,1}}$ arriva da destra (leggermente dall'alto) con punta in B: verso sinistra, parallela a BC. In A la reazione $\underline{R_A}$ arriva da sinistra-basso con punta in A: verso destra, parallela e opposta. Linea tratteggiata da B verso sinistra (prolungamento della retta d'azione di $F_{2,1}$) e quota $\underline{b_{2,1}}$ (freccia doppia) dalla retta d'azione a A. Freccia curva $\underline{C_1}$ presso A, verso orario.

[NdT: verso verificato: $\vec F_{2,1}$ verso sinistra in B (sopra A) dà momento antiorario rispetto ad A; la coppia motrice equilibrante è oraria, come stampato.]

## PDF p. 55 · pag. stampata 56 · tipo: LaTeX (con foto e figura manoscritta)
### 1.8.6 Equazioni cardinali della dinamica

[foto: figura umana (modello anatomico) in corsa/partenza di uno sprint, con effetto di movimento]

Si consideri un corpo di massa $M$ e si indichi con $G$ il suo baricentro. Su questo corpo sono applicate forze esterne e coppie:

> **Figura:** contorno irregolare con: $P_1$ (in alto a sinistra) e forza $\underline{F_1}$ verso destra-basso; $P_2$ con $\underline{F_2}$ verso il basso (leggermente a destra); $P_i$ in basso con $\underline{F_i}$ orizzontale verso sinistra; $P_m$ sul bordo destro con $\underline{F_m}$ verso l'alto. Il baricentro **G** (pallino grigio) al centro, con il vettore $\underline{a_G}$ diretto verso il basso (leggermente a destra). In alto la freccia curva $\dot{\underline\omega}$ (antioraria, verso sinistra). Coppie: $\underline{C_1}$ (oraria) a sinistra, $\underline{C_2}$ (antioraria) in basso a sinistra, $\underline{C_i}$ (oraria) in alto a destra, $\underline{C_m}$ (antioraria) a destra.

Considerando anche gli effetti inerziali, il seguente equilibrio dinamico deve essere verificato:

$$ \begin{cases} \sum_{i=1}^{n} \vec F_i^{\,est} = M\vec{a_G} \\ \sum_{i=1}^{n} (P_i - G)\wedge\vec F_i^{\,est} + \sum_{i=1}^{n} \vec C_i = I_G\dot{\vec\omega} \end{cases} $$

[NdT: la somma delle coppie qui va fino a $n$ (in statica, p. 45, fino a $m$). La seconda equazione nella forma $I_G\dot{\vec\omega}$ vale per il moto piano con polo nel baricentro G.]

dove $a_G$ è l'accelerazione del baricentro del corpo, $\dot\omega$ è l'accelerazione angolare del corpo e $I_G$ è il momento di inerzia del corpo rispetto al baricentro. Queste equazioni si definiscono equazioni cardinali della dinamica. Come nel caso della statica, nel piano, la prima è un'equazione vettoriale che conduce a due equazioni scalari, mentre la seconda genera una sola equazione.

Queste equazioni possono essere intepretate come una relazione di causa-effetto: dalla prima equazione si deduce che applicando una forza ad un corpo, il suo baricentro accelera. Per la seconda equazione, la somma dei momenti generati da forze esterne e coppie agenti su un corpo generano un'accelerazione angolare.

## PDF p. 56 · pag. stampata 57 · tipo: LaTeX (con figura manoscritta)

Le equazioni cardinali sopra definite possono essere applicate in due modi. In dinamica diretta, note le forze e coppie applicate ad un corpo, si determinano gli effetti in termini di accelerazione del baricentro ed accelerazione angolare. In dinamica inversa, si calcolano le forze da applicare per ottenere una determinata accelerazione.

A differenza delle equazioni della statica, nelle equazioni della dinamica compaiono gli effetti inerziali:

- Forza di inerzia: $\vec F_{ine} = -M\vec a_G$
- Coppia di inerzia: $\vec C_{ine} = -I_G\dot{\vec\omega}$

Sostituendo nelle equazioni cardinali:

$$ \begin{cases} \sum_{i=1}^{n} \vec F_i^{est} + \vec F_{ine} = 0 \\ \sum_{i=1}^{n} (P_i - G)\wedge\vec F_i^{est} + \sum_{i=1}^{m} \vec C_i + \vec C_{ine} = 0 \end{cases} $$

Forza e coppia di inerzia possono essere considerate come "forze e coppie esterne".

[NdT: in questo tratto la dispensa non usa il nome «principio di D'Alembert»: introduce forza e coppia d'inerzia e le somma alle forze esterne.]

> **Figura:** lo stesso corpo di p. 55 (forze $F_1,F_2,F_i,F_m$ nei punti $P_1,P_2,P_i,P_m$; coppie $C_1,C_2,C_i,C_m$; $\dot{\underline\omega}$ antioraria in alto; $\underline{a_G}$ in G verso il basso, leggermente a destra), con in più: in G la forza d'inerzia $\underline{F_{in}}$ (freccia grigia spessa) diretta in verso opposto ad $a_G$ (verso l'alto, leggermente a sinistra) e la coppia d'inerzia $\underline{C_{in}}$ (freccia curva grigia spessa, oraria, opposta a $\dot\omega$).

### 1.8.7 Dinamica dei meccanismi

### 1.8.8 Applicazione 1

Si consideri un meccanismo costituito da un'asta di massa $M$ vincolata da 2 coppie prismati-che: una con guida verticale e l'altra orizzontale.

## PDF p. 57 · pag. stampata 58 · tipo: LaTeX (con figura manoscritta)

> **Figura:** pattino **1** (rettangolo) in una guida verticale a sinistra (tratteggio di telaio su entrambi i lati, asse verticale a tratto-punto), con cerniera **A** (cerchietto) al centro del pattino; freccia grigia spessa verso il basso $\underline{V_A}$. Asta **2** (sottile) da A scende verso destra fino a **B**; a metà il baricentro **G** (pallino). Pattino **3** (rettangolo) in una guida orizzontale in basso (tratteggi sopra e sotto, asse orizzontale a tratto-punto), con cerniera B al centro. In B l'angolo $\alpha$ tra l'asse orizzontale (semiretta verso sinistra) e l'asta (freccia d'arco tra asta e orizzontale).

Si supponga $V_A$ costante e nota e di volere calcolare la forza da applicare al corpo 1 per la velocità costante.

Per risolvere la dinamica del sistema, è necessario conoscerne prima la cinematica. Le velocità dei punti A e B hanno direzione nota perchè i pattini sono vincolati a scorrere lungo le guide. Tracciando le rette perpendicolari alle direzioni delle velocità dei punti A e B è possibile individuare il centro di istantanea rotazione del corpo 2:

## PDF p. 58 · pag. stampata 59 · tipo: LaTeX (con figure manoscritte)

> **Figura:** stesso meccanismo; retta orizzontale per A e retta verticale per B che si intersecano nel punto $K_2$ (pallino, in alto a destra, alla quota di A e sulla verticale di B). Presso $K_2$ la freccia curva $\underline{\omega_2}$ (a sinistra di $K_2$, dall'alto verso il basso: verso antiorario). In A $\underline{V_A}$ verso il basso; in B $\underline{V_B}$ orizzontale verso destra.

Pertanto:

$$ \vec V_A = \cancel{\vec V_{K_2}} + \vec\omega_2\wedge(A-k_2) $$

Il modulo della velocità angolare del corpo 2 è quindi dato da:

$$ \omega_2 = \frac{V_A}{\overline{K_2A}} $$

Nota $\omega_2$, che ha senso antiorario per rispettare i versi del prodotto vettoriale con $V_A$, è possibile calcolare la velocità del punto B:

$$ \vec V_B = \cancel{\vec V_{K_2}} + \vec\omega_2\wedge(B-k_2) $$

[NdT: nelle formule il CIR è scritto $k_2$ minuscolo, nel testo e in figura $K_2$. Verso verificato: con $A-K_2$ verso sinistra e $\vec V_A$ verso il basso, $\vec\omega_2$ è uscente dal piano (antiorario); allora $\vec V_B$ risulta verso destra, come in figura. Con $AB=L$: $\overline{K_2A}=L\cos\alpha$, $\omega_2=V_A/(L\cos\alpha)$, $V_B=V_A\tan\alpha$.]

Passando alle accelerazioni e ricordando che $a_A = 0$ (poichè $V_A$ = cost):

$$ \vec a_B = \cancel{\vec a_A} + \dot{\vec\omega}_2\wedge(B-A) - \omega_2^2(B-A) $$

Di questi vettori:

- $\vec a_B$ ha direzione nota (orizzontale) perché il pattino si può muovere solo lungo una direzione;
- $\dot{\vec\omega}_2\wedge(B-A)$ ha direzione nota (perpendicolare all'asta AB);
- $\omega_2^2(B-A)$ ha modulo, direzione e verso noti.

Pertanto è possibile comporre il poligono dei vettori:

> **Figura:** triangolo delle accelerazioni: dal vertice a destra (su una retta orizzontale) $-\underline{\omega_2^2}(B-A)$ sale verso sinistra (diretto come A−B); dal suo estremo $\dot{\underline\omega}_2\wedge(B-A)$ scende verso sinistra lungo una retta obliqua (perpendicolare ad AB) fino al vertice a sinistra; $\underline{a_B}$ orizzontale dal vertice destro al vertice sinistro (verso sinistra). Nel vertice destro l'angolo $\alpha$ tra $a_B$ e $-\omega_2^2(B-A)$.

[NdT: verificato analiticamente: con $y_A=L\sin\alpha$, $x_B=L\cos\alpha$, $\dot y_A=-V_A$ costante, si ottiene $\ddot x_B=-V_A^2/(L\cos^3\alpha)$: $\vec a_B$ verso sinistra, come nel poligono; $\omega_2$ decresce (al diminuire di $\alpha$), quindi $\dot{\vec\omega}_2$ è orario, come a p. 59.]

## PDF p. 59 · pag. stampata 60 · tipo: LaTeX (con figura manoscritta)

Per applicare le equazioni cardinali della dinamica, è necessario calcolare l'accelerazione del baricentro $G$ dell'asta:

$$ \vec a_G = \cancel{\vec a_A} + \dot{\vec\omega}_2\wedge(G-A) - \omega_2^2(G-A) $$

Poichè $a_A = 0$ e la distanza AG è la metà di AB, anche l'accelerazione del baricentro è la metà di quella di $B$ e ha la stessa direzione (orizzontale):

> **Figura:** come p. 58 ($K_2$, $\underline{\omega_2}$ antioraria, $\underline{V_A}$ verso il basso, $\underline{V_B}$ verso destra), con in più: a destra di $K_2$ la freccia curva $\dot{\underline\omega}_2$ in verso orario; in G il vettore $\underline{a_G}$ orizzontale verso sinistra (freccia nera).

Passando alla dinamica, sul corpo due agiscono:

- $\vec F_{3,2}$, che ha direzione nota, perché sul corpo 3 (trascurando la massa del carrello) agiscono solo 2 forze ($\vec F_{2,3}$ e $R_B$) e una di esse ha direzione nota ($R_B$ perpendicolare all'asse della guida, cioè verticale);
- $\vec F_{1,2}$, incognita;
- $M\vec g$, forza peso, nota in modulo, direzione e verso;
- $\vec F_{ine} = -M\vec a_G$, nota in modulo, direzione e verso;
- $\vec C_{ine} = -I_G\dot{\vec\omega}_2$, nota.

Quando ci sono più di tre forze e coppie agenti su di un corpo, può essere conveniente risolvere le equazioni della dinamica analiticamente. Per farlo, bisogna fissare un sistema di riferimento e scomporre le forze incognite nelle componenti lungo i due assi. I versi di queste componenti vengono inizialmente ipotizzati concordi al sistema di riferimento:

## PDF p. 60 · pag. stampata 61 · tipo: LaTeX (con figura manoscritta)

> **Figura:** corpo libero dell'asta 2, da A (cerchietto in alto a sinistra) a B (cerchietto in basso a destra), con terna $X$ (destra), $Y$ (alto), origine O, disegnata a sinistra. In A: $\underline{F_{1,2x}}$ orizzontale verso destra e $\underline{F_{1,2y}}$ verticale verso l'alto. In G: $\underline{Mg}$ verso il basso e $\underline{F_{in}}$ orizzontale verso destra. Sopra G la freccia curva $\underline{C_{in}}$ in verso antiorario. In B: $\underline{F_{3,2}}$ verticale verso l'alto.

Le due equazioni della dinamica, in forma vettoriale, per questo sistema sono:

$$ \begin{cases} \vec F_{12} + \vec F_{in} + \vec F_{32} + M\vec g = 0 \\ (G-A)\wedge\vec F_{in} + (G-A)\wedge m\vec g + (B-A)\wedge\vec F_{32} + \vec C_{in} = 0 \end{cases} $$

Proiettando le componenti scalari:

$$ \begin{cases} F_{12,x} + F_{in} = 0 \\ F_{12,y} + F_{32} - Mg = 0 \\ F_{in}\cdot AG\sin\alpha - mg\cdot AG\cos\alpha + F_{32}AB\cos\alpha + C_{in} = 0 \end{cases} $$

Dalla terza equazione si ricava $F_{3,2}$:

$$ F_{32} = \frac{mg\cdot AG\cos\alpha - F_{in}\cdot AG\sin\alpha - C_{in}}{AB\cos\alpha} $$

Nota $F_{3,2}$, le due componenti di $F_{1,2}$ sono date da:

$$ \begin{cases} F_{12,x} = -Ma_G \\ F_{12,y} = -F_{32,y} + Mg \end{cases} $$

[NdT: la massa è scritta ora $M$ ora $m$ (stessa grandezza). Equazione dei momenti verificata (polo A, antiorario positivo, $B-A=AB(\cos\alpha,-\sin\alpha)$, $G-A=AG(\cos\alpha,-\sin\alpha)$, $F_{in}$ verso destra, $C_{in}$ antiorario): i tre bracci e i segni sono corretti. In $F_{12,y}$ compare $F_{32,y}$, che coincide con $F_{32}$ (forza verticale). Con $AG=AB/2$ e $\vec a_G=\vec a_B/2$: $F_{in}=Ma_G>0$ verso destra e $F_{12,x}=-Ma_G$ (verso sinistra).]

Sul corpo 1 agiscono:

- $\vec R_A$, reazione vincolare della guida, con una qualsiasi direzione perpendicolare all'asse di scorrimento;
- $\vec F_{2,1}$, nota;
- $\vec F$, forza da applicare per mantenere $\vec V_A = cost$, di cui è nota la direzione coincidente con l'asse del pattino.

Dalla componente y della prima equazione della dinamica applicata al corpo 1 si ottiene:

$$ \vec F = -\vec F_{2,1y} $$

[NdT: implicito che la massa del pattino 1 sia trascurata (o che, a $V_A$ costante, non dia forza d'inerzia; il suo peso non è considerato). Con $\vec F_{2,1}=-\vec F_{1,2}$ si ha $F = F_{12,y}$.]

## PDF p. 61 · pag. stampata 62 · tipo: LaTeX (con figure manoscritte)
### 1.8.9 Forza e coppia di inerzia rispetto ad un polo fisso

Si consideri un corpo rigido di massa $M$ che ruota intorno ad un polo fisso $O$, con velocità angolare $\vec\omega$ e accelerazione angolare $\dot{\vec\omega}$. L'accelerazione del baricentro $G$ calcolata rispetto al polo O vale:

$$ \vec a_G = \vec a_{G,n} + \vec a_{G,t} = -\omega^2(G-O) + \dot{\vec\omega}\wedge(G-O) $$

La forza e la coppia d'inerzia rispetto al baricentro G sono pari a:

$$ \vec F_{ine,G} = -M\vec a_G = \vec F_{ine,n} + \vec F_{ine,t} = M\omega^2(G-O) - M\dot{\vec\omega}\wedge(G-O) $$

$$ \vec C_{ine,G} = -I_G\dot{\vec\omega} $$

> **Figura (tre corpi affiancati):** (1) corpo con cerniera fissa **O** (a quadranti) in basso a sinistra e baricentro **G** in alto a destra; presso O la freccia curva $\dot{\underline\omega}$ (oraria); in G i vettori $\underline{a_{G_n}}$ (diretto da G verso O) e $\underline{a_{G_t}}$ (perpendicolare a GO, verso destra-basso). (2) corpo con reazioni in O: $\underline{R_{Ox}}$ orizzontale verso destra e $\underline{R_{Oy}}$ verticale verso l'alto; in G $\underline{F_{in_n}}$ (diretta da O verso G, oltre G) e $\underline{F_{in_t}}$ (verso sinistra-alto, opposta ad $a_{G_t}$); freccia curva $\underline{C_{in_G}}$ (antioraria) a sinistra; scritta «$\underline{C_{in_G}} = -I_G\dot{\underline\omega}$». (3) corpo con $F_{in_n}$ e $F_{in_t}$ applicate in O (stesse direzioni e versi del caso 2), $R_{Ox}$, $R_{Oy}$ in O, G a parte; freccia curva $\underline{C_{in_O}}$ (antioraria) e scritta «$\underline{C_{in_O}} = -I_O\dot{\underline\omega}$».

In alcuni casi, è utile ridurre forza e coppia d'inerzia rispetto ad un polo diverso dal baricentro. Per esempio, in questo caso è possibile esprimerli rispetto al polo O applicando il teorema del trasporto dei momenti:

$$ \vec F_{ine,O} = \vec F_{ine,G} $$

$$ \begin{aligned}
\vec C_{ine,O} &= \vec C_{ine,G} + (G-O)\wedge\vec F_{ine,G} = \\
&= -I_G\dot{\vec\omega} + \cancel{(G-O)\wedge\vec F_{ine,n}} + (G-O)\wedge\vec F_{ine,t} = \\
&= -I_G\dot{\vec\omega} - M\cdot\overline{OG}^2\dot{\vec\omega} = -\left(I_G + M\cdot\overline{OG}^2\right)\dot{\vec\omega}
\end{aligned} $$

La quantità $I_G + M\cdot\overline{OG}^2$ rappresenta il momento d'inerzia rispetto ad O:

$$ \vec C_{ine,O} = -I_O\cdot\dot{\vec\omega} $$

[NdT: verificato: $(G-O)\wedge[-M\dot{\vec\omega}\wedge(G-O)] = -M\overline{OG}^2\dot{\vec\omega}$ (moto piano, $\dot{\vec\omega}\perp(G-O)$); il termine normale si annulla perché parallelo a $G-O$. È il teorema di Huygens–Steiner.]

## 1.9 Conservazione dell'energia

### 1.9.1 Lavoro e potenza

#### Lavoro di una forza

Si consideri un corpo rigido su cui agisce una forza esterna $F$ applicata in un suo punto $P$. Nell'intervallo di tempo $dt$, il punto $P$ compie uno spostamento $d\vec P$. Il lavoro compiuto dalla forza è dato dal prodotto scalare tra la forza stessa e lo spostamento del punto di applicazione:

## PDF p. 62 · pag. stampata 63 · tipo: LaTeX (con figure manoscritte)

$$ dL = \vec F\cdot d\vec P $$

Pertanto la forza compie lavoro solo lungo la componente dello spostamento parallela alla forza:

> **Figura (due schemi):** (sinistra) punto **P** da cui partono lo spostamento $\underline{dP}$ (grigio, quasi orizzontale verso destra, leggermente in salita) e la forza $\underline F$ (scura, più lunga, verso destra-basso); tra i due l'angolo $\theta$. (destra) stesso schema con $d\vec P$ scomposto in $\underline{dP_{//}}$ (lungo la retta di F, verso destra-basso) e $\underline{dP_\perp}$ (perpendicolare a F, verso l'alto-destra).

$$ dL = F\,dP_{//} = F\,dP\cos\theta $$

Una forza può compiere un lavoro negativo se la componente parallela dello spostamento ha verso opposto ad essa.

#### Potenza

Per definizione, la potenza è il lavoro compiuto in un intervallo di tempo $dt$ diviso l'intervallo di tempo stesso:

$$ Pot = \frac{dL}{dt} = \frac{\vec F\cdot d\vec P}{dt} = \vec F\cdot\vec V = F\,V_{//} = F\,V\cos\theta $$

> **Figura (due schemi):** identici ai precedenti con la velocità $\underline{V_P}$ al posto di $dP$: (sinistra) $V_P$ e $F$ con l'angolo $\theta$; (destra) $V_P$ scomposta in $\underline{V_{P//}}$ (lungo F) e $\underline{V_{P\perp}}$ (perpendicolare a F).

Una forza può avere potenza negativa se la componente parallela della velocità ha verso opposto ad essa.

### 1.9.2 Teorema delle forze vive (conservazione dell'energia meccanica)

Si consideri un insieme di $n$ corpi di massa $M_i$ e momento d'inerzia rispetto al baricentro $I_{G,i}$ (con $i = 1,\dots,n$), su cui agiscono forze e coppie:

## PDF p. 63 · pag. stampata 64 · tipo: LaTeX (con foto e figura manoscritta)

> **Figura:** quattro contorni irregolari parzialmente sovrapposti, etichettati «1» (in alto a sinistra), «2» (in alto a destra), «i» (a destra, in basso), «m» (in basso al centro). Ciascuno ha il baricentro ($G_1$, $G_2$, $G_i$, $G_m$) con la sua accelerazione ($\underline{a_{G_1}}$ verso il basso; $\underline{a_{G_2}}$ verso sinistra-alto; $\underline{a_{G_i}}$ verso sinistra; $\underline{a_{G_m}}$ verso il basso), l'accelerazione angolare ($\dot{\underline\omega}_1$ antioraria, $\dot{\underline\omega}_2$ oraria, $\dot{\underline\omega}_i$ oraria, $\dot{\underline\omega}_m$ antioraria), forze ($\underline{F_2}$ in $P_2$ sul corpo 1, verso il basso; $\underline{F_1}$ in $P_1$ sul corpo 2, verso destra-basso; $\underline{F_i}$ in $P$ sul corpo i, verso sinistra; $\underline{F_m}$ in $P_m$ sul corpo m, verso l'alto) e coppie ($\underline{C_i}$ sul corpo 1, $\underline{C_m}$ sul corpo 2, $\underline{C_2}$ sul corpo i, $\underline{C_1}$ sul corpo m).

Il teorema della conservazione dell'energia meccanica afferma che la variazione di energia cinetica di un sistema di corpi rigidi è data dalla somma dei lavori di tutte le forze (esterne ed interne):

$$ dL_{est} + dL_{int} = dE_{cine} $$

A differenza delle equazioni cardinali della dinamica, per il teorema dell'energia meccanica si considerano anche le forze interne, perchè possono compiere un lavoro che causa variazione di energia cinetica. Per esempio, si consideri il movimento di un braccio e si modellizzi il muscolo tramite un attuatore lineare:

> **Figura:** [foto: spalla e braccio umano sollevato, con la muscolatura in evidenza] sovrapposto uno schema di attuatore lineare (cilindro rettangolare con stelo) tra il punto **A** (sulla spalla/scapola, pallino nero, in alto a destra) e il punto **B** (sull'omero, pallino nero, a sinistra).

La forza muscolare in B è una forza interna, tuttavia, se il braccio si muove, questa forza genera un lavoro (a differenza di quella di reazione in A). Questo lavoro causa un movimento del braccio, cioè ne fa variare l'energia cinetica.

In un generico sistema di corpi, il lavoro delle forze interne è nullo se si verificano le seguenti condizioni:

- il sistema è costituito solo da corpi rigidi;
- il sistema non contiene attuatori;

## PDF p. 64 · pag. stampata 65 · tipo: LaTeX (con figura)

- si trascurano le forze dissipative (ad esempio l'attrito).

In questi casi, derivando l'equazione del teorema dell'energia meccanica nell'intervallo di tempo infinitesimo $dt$ si ottiene:

$$ \frac{dL_{est}}{dt} = \frac{dE_{cine}}{dt} $$

Il primo membro rappresenta la potenza delle forze esterne:

$$ \frac{dL_{est}}{dt} = \sum_{i=1}^{n} \vec F_i\cdot\vec V_i + \sum_{i=1}^{m} \vec C_i\cdot\vec\omega_i $$

Per esplicitare il secondo membro, si consideri che l'energia cinetica di un corpo rigido è data da:

$$ E_{cine} = \frac{1}{2}MV_G^2 + \frac{1}{2}I_G\omega^2 $$

Derivando questa relazione si ottiene:

$$ \frac{dE_{cine}}{dt} = M\vec V_G\cdot\vec a_G + I_G\vec\omega\cdot\dot{\vec\omega} $$

In conclusione, per questo tipo di sistemi di corpi rigidi, l'equazione della conservazione dell'energia meccanica diventa:

$$ \sum_{i=1}^{n} \vec F_i\cdot\vec V_{P_i} + \sum_{i_1}^{m} \vec C_i\cdot\vec\omega_i = \sum_{i=1}^{n}\left(M_i\vec V_{G_i}\cdot\vec a_{G_i} + I_{G_i}\vec\omega_i\cdot\dot{\vec\omega}_i\right) $$

[NdT: il limite inferiore della seconda somma è stampato $i_1$: refuso per $i=1$. Nella stessa formula l'indice $i$ è usato sia per le forze/coppie sia per i corpi ($n$ corpi a p. 62, $n$ forze qui). L'energia cinetica del corpo rigido (König) è enunciata, non dimostrata. Derivata verificata: $\frac{d}{dt}\left(\tfrac12MV_G^2+\tfrac12I_G\omega^2\right)=M\vec V_G\cdot\vec a_G+I_G\vec\omega\cdot\dot{\vec\omega}$, con $I_G$ costante (corpo rigido piano).]

e prende il nome di teorema delle forze vive.

### 1.9.3 Applicazioni

#### Esempio 1

Si considerari un glifo oscillante e si ipotizzi di poter trascurare la massa del meccanismo ($E_{cine} = 0$).

> **Figura (su griglia tratteggiata):** cerniera fissa **A** (in basso al centro-destra); manovella **1** corta da A sale verso destra fino a **B**. Asta **2** lunga (glifo), quasi verticale (inclinata: estremo superiore a destra), con la cerniera fissa **C** all'estremo inferiore e l'estremo superiore **D** in alto a destra; B è il perno della manovella che si accoppia con l'asta 2 a circa metà della sua lunghezza. Biella **3** da D va verso sinistra (quasi orizzontale, leggermente in discesa) fino a **E**, cerniera sul corsoio **4** (rettangolo scuro) che scorre in una guida orizzontale (doppia linea orizzontale, tratteggi di telaio sopra e sotto il corsoio). A sinistra del corsoio, un blocchetto grigio chiaro (corpo su cui agisce/da cui viene la forza) e la forza $\underline F$ orizzontale verso destra applicata al corsoio 4.

## PDF p. 65 · pag. stampata 66 · tipo: LaTeX (con figure)

Per applicare il teorema delle forze vive è necessario conoscere le forze esterne applicate al sistema:

> **Figura:** stesso glifo con le azioni esterne: in A le reazioni $\underline{R_{Ax}}$ (verso destra) e $\underline{R_{Ay}}$ (verso l'alto) e la coppia motrice $\underline{C_1}$ (freccia curva scura, antioraria) sulla manovella 1; in C le reazioni $\underline{R_{Cx}}$ (verso destra) e $\underline{R_{Cy}}$ (verso l'alto); sul corsoio 4 la reazione della guida $\underline{R_4}$ verticale verso l'alto e la forza $\underline F$ orizzontale verso destra.

I punti $A$ e $C$ sono fissi, pertanto le reazioni vincolari $\vec R_A$ e $\vec R_C$ non compiono lavoro e quindi non compaiono nell'equazione delle forze vive. Anche $R_4$ ha potenza nulla perchè la velocità del corpo 4 ha direzione perpendicolare alla reazione vincolare. Le uniche forze esterne che compiono lavoro sono la forza $\vec F$ applicata al corpo 4 e la coppia motrice applicata al corpo 1. Per cui, l'equazione dell'energia meccanica per questo sistema è:

$$ \vec F\cdot\vec V_E + \vec C_1\cdot\vec\omega_1 = 0 $$

[NdT: implicite l'assenza di attrito (in particolare nell'accoppiamento perno–glifo in B e nella guida di 4) e l'assenza di peso (masse trascurate). Da qui $C_1 = -\vec F\cdot\vec V_E/\omega_1$ (coppia motrice concorde con $\omega_1$ se $\vec F$ si oppone a $\vec V_E$).]

#### Esempio 2

Si consideri il seguente meccanismo:

> **Figura:** cerniere fisse **A** (in alto a sinistra) e **D** (più in basso, sulla stessa verticale di A). Asta da A scende verso destra fino alla cerniera **H**; asta parallela da D scende verso destra fino alla cerniera **E**; **H** ed **E** sono sullo stesso membro verticale (rettangolo spesso, corpo 1, «in rosso» nel testo): quadrilatero a parallelogramma A–H–E–D. Sul membro HE il baricentro **G** (pallino) a metà circa, con: $\underline{Mg}$ verso il basso (freccia nera), $\underline{V_G}$ verso destra-alto (perpendicolare alle aste AH, DE), $\underline{a_G}$ verso sinistra (leggermente in alto). A sinistra, tra A e D, un pistone **C** (rettangolo) in guida verticale (tratteggi ai lati) con velocità $\underline{V_C}$ verso l'alto e forza $\underline F$ verso l'alto applicata dal basso; dal pistone un'asta corta va verso destra fino alla cerniera **B** sull'asta AH (B tra A e H, vicino ad A).

## PDF p. 66 · pag. stampata 67 · tipo: LaTeX

Si supponga di conoscere la massa e il momento di inerzia del corpo 1 (in rosso) $M_1$ e $I_{G,1}$. Si supponga anche di aver risolto la cinematica del meccanis-mo, e in particolare di conoscere $\vec V_{G,1}$ e $\vec a_{G,1}$. Per calcolare la forza da applicare al pistone per garantire questa accelerazione, è possibile applicare il teorema delle forze vive. Le uniche forze che compiono lavoro sono la forza applicata al pistone e la forza peso del corpo 1:

$$ \vec F\cdot\vec V_C + M\vec g\cdot\vec V_G = M_1\vec V_{G,1}\cdot\vec a_{G,1} + \cancel{I_{G,1}\vec\omega_1\cdot\dot{\vec\omega}_1} $$

dove l'ultima quantità è nulla perché il corpo 1 ha velocità angolare nulla (si risolvi la cinematica del meccanismo per verificarlo).

[NdT: a sinistra $M$ e $\vec V_G$ indicano $M_1$ e $\vec V_{G,1}$. Implicito che tutti gli altri membri (aste, pistone) abbiano massa trascurabile e che non vi sia attrito. Verifica di $\omega_1=0$: A–H–E–D è un parallelogramma ($AH\parallel DE$, $AH=DE$, $AD=HE$), quindi il membro HE trasla (moto curvilineo traslatorio) e $\vec\omega_1=0$ in ogni istante; in figura infatti $\vec V_G\perp AH$ e $\vec a_G$ non nulla.]
