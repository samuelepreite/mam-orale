# Capitolo 6 — Accoppiamento motore – carico

**Intervallo:** PDF pp. 193–206 (nessun numero di pagina stampato su queste pagine).

## Indice delle sezioni (titoli come nella fonte; la fonte non numera le sezioni)

| Sezione (titolo nella fonte) | Pagine PDF |
|---|---|
| ACCOPPIAMENTO MOTORE - CARICO (frontespizio) | 193 |
| ACCOPPIAMENTO MOTORE - CARICO · GENERALITÀ (motore asincrono, velocità di sincronismo, caratteristica meccanica) | 194–195 |
| MOTORE C.C. | 195 |
| Caratteristica meccanica dell'utilizzatore (esempio ascensore, esempio autoveicolo) | 195–196 |
| CALCOLO DELL'INERZIA EQUIVALENTE DELL'UTILIZZATORE (esempio ascensore) | 196 |
| ACCOPPIAMENTO MOTORE CARICO DIRETTO (equazione del moto, punto di regime, stabilità qualitativa) | 197 |
| ALTRO ESEMPIO (punti Q instabile e P stabile) · condizione analitica di stabilità | 198–199 |
| Tempo per raggiungere il regime (motore c.c. + utilizzatore a coppia costante), t₉₀% | 199–200 |
| ACCOPPIAMENTO MOTORE CARICO CON TRASMISSIONE (η = 1, η ≠ 1, regime) | 201 |
| ESEMPIO E4/2 (scansione libro) | 201 |
| ACCOPPIAMENTO MOTORE - CARICO CON FRIZIONE (lato motore in slittamento) | 202–203 |
| Lato utilizzatore (frizione come motore fittizio), sincronizzazione nel punto Q, fase di aderenza | 204–206 |

## Tipo delle pagine

| PDF p. | Tipo |
|---|---|
| 193 | frontespizio (testo bianco su fondo scuro) |
| 194 | appunti battuti + titoli e formule manoscritti + foto |
| 195 | appunti battuti + manoscritto + grafici |
| 196 | appunti battuti + manoscritto |
| 197 | appunti battuti + manoscritto |
| 198 | appunti battuti + manoscritto |
| 199 | appunti battuti + manoscritto |
| 200 | manoscritto |
| 201 | manoscritto + appunti battuti + scansione libro (figura argano, Esempio E4/2) |
| 202 | manoscritto + appunti battuti + foto |
| 203 | manoscritto + appunti battuti |
| 204 | LaTeX + figure manoscritte |
| 205 | LaTeX + figure manoscritte |
| 206 | LaTeX + figure manoscritte |

Convenzioni di questa trascrizione: le parti manoscritte sono in stampatello maiuscolo nella fonte; qui sono riportate in
minuscolo normale (il contenuto è invariato). Le parti evidenziate con un fondino grigio nella fonte sono indicate con
«(evidenziato)» solo quando si tratta di formule-risultato.

---

## PDF p. 193 · pag. stampata — · tipo: frontespizio
### ACCOPPIAMENTO MOTORE - CARICO

Pagina interamente scura con al centro, in bianco, il solo titolo «ACCOPPIAMENTO MOTORE - CARICO».

---

## PDF p. 194 · pag. stampata — · tipo: appunti battuti + manoscritto
### ACCOPPIAMENTO MOTORE - CARICO
### Generalità

Una macchina è costituita da un motore che fornisce potenza ad un utilizzatore attraverso degli organi di trasmissione :

> **Figura:** schema a blocchi su fondo grigio chiaro: tre riquadri in fila da sinistra a destra, «Motore» → «Organi di
> Trasmissione» → «Utilizzatore», collegati da due frecce orizzontali grigie verso destra. Sopra e sotto ciascun riquadro
> foto illustrative: sopra «Motore» un motore a combustione interna (spaccato), sotto un motore elettrico; sopra «Organi di
> Trasmissione» una vite a ricircolo/attuatore lineare, una coppia ruota dentata–vite senza fine e un variatore a cinghia
> (pulegge «Drive Pulley»/«Driven Pulley»), sotto una trasmissione a cinghia dentata e un cambio a ingranaggi; sopra
> «Utilizzatore» un robot industriale e un'automobile, sotto una motosega e una giostra.
> [foto: esempi di motori, organi di trasmissione e utilizzatori]

Esistono diversi tipi di motore, come quelli a combustione interna ed elettrici.
Fra questi, uno dei più utilizzati è il motore asincrono.
Il motore fisso è caratterizzato da una parte fissa detta statore e da una mobile detta rotore. Allo statore vengono fissate
delle bobine che quando vengono attraversate da corrente alternata, generano un campo magnetico rotante.
[NdT: «Il motore fisso» è con ogni probabilità un refuso per «Il motore (asincrono)»; si trascrive come stampato.]
Il rotore, situato all' interno dello statore, è composto da avvolgimenti chiusi in corto circuito, ed è messo in rotazione
dal campo magnetico dello statore.

> **Figura:** tre immagini affiancate. Sinistra: [foto: motore asincrono trifase esterno, carcassa alettata, albero
> sporgente a sinistra]. Centro: [foto: rotore a gabbia di scoiattolo]. Destra: spaccato di motore asincrono con
> didascalie: «Morsettiera» (in alto a sinistra, scatola sopra la carcassa), «Statore con avvolgimenti statorici» (in alto
> al centro), «Ventola di raffreddamento» (in alto a destra), «Flusso aria di raffreddamento» (freccia entrante da destra),
> «Albero motore» (a sinistra, albero sporgente), «Cuscinetto» (in basso a sinistra), «Rotore a gabbia di scoiattolo» (al
> centro), «Alette di raffreddamento» (in basso a destra), «Carcassa» (in basso).

La velocità di rotazione del campo magnetico dello statore è detta velocità di sincronismo. Questa velocità dipende dalla
frequenza di corrente elettrica con cui sono alimentate le bobine dello statore.

$$ m_s = \frac{60\cdot f}{P} \qquad\qquad \omega_s = \frac{2\pi\cdot f}{P} $$

[lettura incerta: il primo simbolo manoscritto sembra «m_s»; per il significato (giri/min) è quasi certamente «n_s».]

Dove f è la frequenza di corrente elettrica e P è il numero di coppie polari.
Di particolare interesse ai fini della progettazione meccanica funzionale di una ,acchita è la caratteristica meccanica del
motore, ossia il legame fra la coppia motrice e la velocità di rotazione.
[NdT: «,acchita» = refuso per «macchina».]
Per un motore asincrono, la coppia all' avviamento ( cioè quando la velocità di rotazione è nulla ) è detta coppia di spunto
Cs, ed è diversa da zero consentendo di avviare la macchina .

---

## PDF p. 195 · pag. stampata — · tipo: appunti battuti + manoscritto

Al crescere della velocità, la coppia cresce fino a raggiungere un valore massimo Cmax, oltre il quale la coppia diminuisce
rapidamente fino a zero in corrispondenza della velocità di sincronismo $\omega_s$ (manoscritto).

> **Figura (caratteristica del motore asincrono, immagine stampata):** assi: ordinate «M [Nm]», ascisse «n [rpm]», origine
> «0». Sull'asse delle ordinate, dal basso: «M_n», «M_s», «M_max». La curva parte da M_s per n = 0, cresce dolcemente fino al
> massimo M_max (raggiunto a circa 2/3 dell'ascissa, segnato da una retta verticale tratteggiata), poi scende rapidamente
> quasi verticale, passa per il punto (n_n, M_n) e taglia l'asse n in «n_0», proseguendo leggermente sotto l'asse.
> Linee orizzontali sottili da M_max e da M_n fino alla curva. Zone: a sinistra della tratteggiata «zona di possibile
> funzionamento instabile»; tra la tratteggiata e n_n «zona transitori»; fascia verticale grigia tra n_n e n_0 «zona di
> normale funzionamento» (testo verticale).
> [NdT: in questa figura la coppia è indicata con M, il valore di spunto con M_s e la velocità di sincronismo con n_0,
> mentre il testo usa C_s, C_max, ω_s.]

### MOTORE C.C.

> **Figura:** [foto: motore in corrente continua chiuso] e [foto: spaccato con «Rotore» e batteria collegata]. Sotto,
> grafico: ordinate «C», ascisse «ω». Una retta quasi verticale, fortemente decrescente (tratto tratteggiato in alto,
> continuo in basso), che taglia l'asse ω poco a destra del valore «ω» segnato in ascissa; linea tratteggiata orizzontale da
> «C_nom» sull'asse C fino alla retta e linea tratteggiata verticale da lì fino a «ω» in ascissa (punto nominale).

Altrettanto importante è conoscere la caratteristica meccanica dell' utilizzatore, il cui funzionamento è l' obiettivo della
macchina.
La caratteristica meccanica dipende dalla specifica applicazione.
Ad esempio, si consideri una puleggia su cui è avvolta una fune che vincola da un lato la cabina di un ascensore e dall'
altro un contrappeso :

> **Figura (ascensore):** puleggia/tamburo circolare con centro «+ O₁»; freccia curva grigia in alto a sinistra, con verso
> orario (da sinistra verso l'alto-destra), etichettata «C_u». Fune che scende verticalmente dal lato sinistro fino alla
> «Cabina» (rettangolo, più in basso) e dal lato destro fino al «Contrappeso» (rettangolo stretto, più in alto della
> cabina). Forze verticali verso il basso: sotto la cabina «M_cab·g», nel contrappeso «M_contr·g».

Dall' equilibrio del sistema, la coppia da applicare al tamburo ( e quindi all' utilizzatore ) per sollevare la cabina vale :

$$ \text{II ECD }(\bar O_1):\quad -C_u + M_{cab}\,g\cdot R - M_{contr}\,g\cdot R = 0 $$
$$ \Longrightarrow\quad C_u = (M_{cab} - M_{contr})\,g\cdot R \quad\text{(evidenziato)} $$

(annotazione con freccia su R: «raggio tamburo»)

La massa del contrappeso è costante, mentre la massa della cabina può variare a seconda del carico al suo interno. Per
progettare il sistema si considerano le condizioni di carico massimo.
Una volta fissato il carico, la coppia richiesta non dipende dalla velocità di rotazione del tamburo , pertanto la
caratteristica meccanica dell' utilizzatore è una retta a coppia costante.

---

## PDF p. 196 · pag. stampata — · tipo: appunti battuti + manoscritto

Si consideri un autoveicolo, per il quale si vuole determinare la coppia richiesta per l' avanzamento.
La coppia da applicare alle ruote di raggio Rp per la movimentazione dipende da diversi fattori :
- resistenza al rotolamento ( funzione del coefficiente d' attrito e della massa del veicolo )
- Resistenza aerodinamica : 1/2pCxSV^2, Cx è il coefficiente di resistenza aerodinamica, S è la superficie frontale, V è la
  velocità del veicolo
- Pendenza della strada su cui viaggia l' auto ( funzione della massa e dell' angolo di pendenza )

[NdT: «1/2pCxSV^2» va letto $\tfrac12\rho C_x S V^2$ (p = ρ, densità dell'aria, non definita nel testo).]

> **Figura (autoveicolo in salita):** strada rettilinea inclinata che sale verso sinistra (scende verso destra); in basso a
> destra l'angolo «α» tra la strada e una retta orizzontale. Automobile sulla strada con il muso a sinistra (avanza in
> salita verso sinistra). Freccia grande grigia «R_AER» in alto a sinistra, diretta verso destra-basso contro il frontale
> (opposta al moto). Freccia nera «F_T» lungo il piano stradale, all'estremità sinistra, con punta verso sinistra-alto
> (lungo la strada) [NdT: disegnata nel verso del moto; come resistenza al rotolamento dovrebbe essere opposta al moto].
> Freccia curva «C_u» sulla fiancata anteriore (coppia alle ruote). Dal baricentro (scritta «M g» sulla fiancata) freccia
> verticale verso il basso; dal baricentro un segmento parallelo al piano verso destra con punta e un segmento normale al
> piano, con l'angolo «α» marcato tra la verticale e la normale al piano.

$$ \text{II ECD (polo c. ruota)}:\quad C_u - F_T\cdot R_p - M g \sin\alpha\cdot R_p - R_{aer}\cdot R_p = 0 $$
$$ \Longrightarrow\quad C_u = \Big(\underbrace{f M g + M g\sin\alpha}_{\text{costante }K_1} + \underbrace{\tfrac12\rho C_x S V^2}_{K_2\cdot V^2}\Big)\cdot R_p \quad\text{(evidenziato)} $$
$$ \Longrightarrow\quad C_u = K_1 + K_2 V^2 \quad\text{(evidenziato)}\qquad \text{avrà andamento parabolico} $$

[NdT: con il polo nel centro ruota e $F_T = f M g$, la componente normale del peso su strada inclinata è $M g\cos\alpha$,
quindi la resistenza al rotolamento corretta è $f M g\cos\alpha$; inoltre, poiché tutto è moltiplicato per $R_p$, a rigore
$K_1 = (fMg\cos\alpha + Mg\sin\alpha)R_p$ e $K_2 = \tfrac12\rho C_x S R_p$; la fonte chiama $K_1$, $K_2$ i soli termini in
parentesi. L'andamento qualitativo (parabolico in V) non cambia.]

> **Grafico:** ordinate «C_u», ascisse «V»; curva che parte da un valore positivo sull'asse C_u (intercetta K₁) e cresce
> con concavità verso l'alto (parabola).

### CALCOLO DELL' INERZIA EQUIVALENTE DELL' UTILIZZATORE

In condizione non stazionarie è necessario tenere conto dell' inerzia del motore e dell' utilizzatore.

> **Figura:** riquadro «Motore» a sinistra, albero nero orizzontale, disco verticale (rettangolo alto e stretto) etichettato
> sotto «Inerzia lato Motore», riquadro centrale «Organi di Trasmissione», albero, secondo disco «Inerzia lato
> Utilizzatore», riquadro «Utilizzatore» a destra.

Calcoliamo l' inerzia dell' utilizzatore mediante l' equivalenza energetica (evidenziato).

Esempio ascensore

> **Figura:** tamburo circolare (centro «+», dicitura «Momento d'inerzia Tamburo»), raggio «r_t» disegnato come freccia dal
> centro verso l'alto a destra; freccia curva «ω_u» in alto a sinistra, verso orario. Fune a sinistra fino a «Massa Cabina»
> (in basso), con freccia «V» verso l'alto; fune a destra fino a «Massa Contrappeso» con freccia «V» verso il basso.

$$ E_{K\,TOT} = E_{K\,cab} + E_{K\,contr} + E_{K\,tamburo} $$
$$ E_{K\,TOT} = \tfrac12 M_{cab} V^2 + \tfrac12 M_{contr} V^2 + \tfrac12 I_{tamb}\,\omega^2 $$

L' energia cinetica dell' utilizzatore è : $\;E_{K u} = \tfrac12 I_u\,\omega_u^2$

N.B.: V_tamb e V_contr le scrivo in funzione della velocità di rotazione del tamburo $\omega_u \Rightarrow V = \omega_u\cdot r_t$

[NdT: «V_tamb» è con ogni probabilità un refuso per «V_cab» (velocità della cabina); il tamburo ruota, non trasla.]

$$ \Longrightarrow\quad M_{cab}\cdot\omega_u^2\, r_t^2 + M_{contr}\cdot\omega_u^2 r_t^2 + I_t\,\omega_u^2 = I_u\,\omega_u^2 $$
$$ \Longrightarrow\quad I_u = I_t + (M_{cab} + M_{contr})\,r_t^2 \quad\text{(evidenziato)} $$

(Il fattore ½ è stato semplificato da entrambi i membri; verificato: $2E_{K\,TOT}/\omega_u^2 = I_t + (M_{cab}+M_{contr})r_t^2$.)

---

## PDF p. 197 · pag. stampata — · tipo: appunti battuti + manoscritto
### ACCOPPIAMENTO MOTORE CARICO DIRETTO

Un accoppiamento motore carico diretto è caratterizzato da un collegamento diretto fra motore ed utilizzatore, senza l'
ausilio di organi di trasmissione.

> **Figura:** «Motore» (riquadro a sinistra) – albero – disco «I_m» (sopra) con didascalia «Inerzia lato Motore» – albero –
> disco «I_u» con didascalia «Inerzia lato Utilizzatore» – «Utilizzatore» (riquadro a destra). Frecce curve grigie: sul
> disco motore «C_m» con verso verso il basso (davanti al disco, verso convenzionale di rotazione); sull'albero fra i dischi
> «ω» e «ω̇», entrambe verso il basso (stesso verso di C_m); sul disco utilizzatore «C_u» verso l'alto (verso opposto).

In condizioni non stazionarie

$$ \text{T.F.V.}:\quad C_m\,\omega - C_u\,\omega = I_m\,\dot\omega\,\omega + I_u\,\dot\omega\,\omega $$
$$ \Longrightarrow\quad \dot\omega = \frac{C_m - C_u}{I_m + I_u} \quad\text{(evidenziato)} $$
$$ \Longrightarrow\quad \dot\omega = \frac{C_m - C_u}{I_m + I_u} \qquad \text{il numeratore non è costante} $$

Analizziamo un accoppiamento diretto fra motore elettrico asincrono, di cui è nota la caratteristica meccanica $C_m(\omega)$
ed un utilizzatore con caratteristica meccanica $C_u(\omega)$

> **Grafico:** ordinate «C», ascisse «ω». Curva grigia chiara «C_m»: parte da «C_A» sull'asse C (valore più alto), cresce,
> ha un massimo arrotondato, poi scende quasi rettilinea e ripida fino a «ω_S» sull'asse ω. Curva scura «C_u»: parte da
> «C_u0» (sotto C_A), cresce con concavità verso l'alto. Le due si intersecano nel punto «P» sul tratto discendente di C_m;
> linea verticale sottile da P a «ω_R» in ascissa (ω_R < ω_S).

Per valutare le prestazioni della macchina, bisogna valutare le seguenti questioni :
**1) IL SISTEMA SI AVVIA ?**
**2) QUAL È LA CONDIZIONE DI REGIME ?**
**3) IL SISTEMA È STABILE ?**

**1)** Si, il sistema di avvia poiché allo spunto la coppia fornita dal motore è maggiore di quella necessaria a far
avviare l' utilizzatore.
**2)** Dopo l' avviamento la coppia motrice si mantiene maggiore di Cu, per cui il sistema accelera ( $\dot\omega > 0$ ).
Nel punto P, dove le due caratteristiche meccaniche si intersecano, risulta Cm = Cu e quindi $\dot\omega = 0$.
Tale punto prende il nome di punto di stazionarietà e la velocità corrispondente $\omega_R$ = VELOCITÀ DI REGIME
**3)** Per studiare qualitativamente la stabilità del sistema, si supponga di perturbare il sistema quando è a regime. In
caso di perturbazioni che fanno diminuire la velocità dell' utilizzatore , risulterebbe Cm > Cu e $\dot\omega > 0$.
Questa accelerazione positiva permette, una volta rimossa la perturbazione , di riportare a regime il sistema.
Invece se la perturbazione porta ad un aumento della velocità dell' utilizzatore risulterebbe Cm < Cu e $\dot\omega < 0$.
Per cui il sistema decelera fini a tornare a regime, per il sistema in esame il punto di stazionarietà si dice STABILE.

---

## PDF p. 198 · pag. stampata — · tipo: appunti battuti + manoscritto
### Altro esempio :

> **Grafico:** ordinate «C», ascisse «ω». Curva scura «C_u»: parte da «C_u0» e cresce monotona con concavità verso l'alto
> fino in alto a destra. Curva grigia «C_m»: parte da «C_A» (sotto C_u0), cresce lentamente, poi più rapidamente (tratto
> a S), interseca C_u nel punto «Q» (ascissa «ω_Q»), sale fino a un massimo arrotondato sopra C_u, interseca di nuovo C_u
> nel punto «P» sul tratto discendente e scende ripida fino a «ω_S». Due verticali sottili: in «ω₁» (< ω_Q) con i punti
> «C_u1» (su C_u, più alto) e «C_m1» (su C_m, più basso); in «ω₂» (> ω_Q) con i punti «C_m2» (su C_m, più alto) e «C_u2»
> (su C_u, più basso).

Si osservi come esistono due punti di stazionarietà Q e P. Tuttavia il punto Q risulta essere instabile.
Infatti in caso di una perturbazione che faccia diminuire la velocità dell' utilizzatore , risulterebbe Cu > Cm e quindi il
sistema decelererebbe fino a fermarsi, anche rimuovendo la perturbazione non avrei più coppia motrice sufficiente ad arrivare
a regime.
Nel caso di un aumento di velocità dell' utilizzatore risulterebbe Cm > Cu e quindi il sistema accelererebbe fino ad
arrivare al punto P che, come nel caso precedente, è un punto di stazionarietà stabile.

Determiniamo analiticamente la condizione di stabilità :
Consideriamo il seguente accoppiamento

> **Grafico:** come quello di p. 197 (C_m grigia da «C_A», C_u scura da «C_u0», intersezione «P» sul tratto discendente di
> C_m, ascisse «ω_R» e «ω_S»), con in più le due rette tangenti in P: una ripida decrescente etichettata «$C^{P}_{m_{LIN}}$»
> (tangente a C_m) e una crescente meno inclinata etichettata «$C^{P}_{u_{LIN}}$» (tangente a C_u).

Sviluppo in serie della caratteristica del motore nell' intorno P troncato al 1° ordine

$$ C_m = C_{m,P} + \frac{dC_m}{d\omega}(\omega - \omega_P) $$

$\dfrac{dC_m}{d\omega}$ = coef. angolare $K_m$ della retta tg alla curva in P

$$ \Longrightarrow\quad C_m = C_{m,P} + K_m(\omega - \omega_P) $$
$$ \Longrightarrow\ \text{analog.}:\quad C_u = C_{u,P} + K_u(\omega - \omega_P) $$

DEF: $\Omega = \omega - \omega_P$ = scostamento dalla velocità del punto P
(con freccia sotto $\omega_P$:) $\omega_P = \text{cost} \Rightarrow \dot\Omega = \dfrac{d\Omega}{dt} = \dot\omega$

⟹ **Eq. differenziale del moto** :

$$ \dot\omega = \frac{d\Omega}{dt} = \frac{C_m - C_u}{I_m + I_u} = \frac{C_{m,P} + k_m\Omega - \big(C_{u,P} + K_u(\Omega)\big)}{I_m + I_u}
\;\overset{C_{m,P}=C_{u,P}}{\Longrightarrow}\; \frac{d\Omega}{dt} = \frac{(K_m - k_u)\,\Omega}{I_m + I_u} $$

[NdT: «$K_u(\Omega)$» va letto come prodotto $K_u\cdot\Omega$.]

$$ \Longrightarrow\ \frac{d\Omega}{dt} = \frac{(K_m - k_u)\Omega}{I_m + I_u}\ \Longrightarrow\ \frac{d\Omega}{\Omega} = \frac{(K_m - k_u)\,dt}{I_m + I_u}
\ \Longrightarrow\ \int_{\Omega_0}^{\Omega}\frac{d\Omega}{\Omega} = \int_0^t \frac{(K_m - k_u)}{I_m + I_u}\,dt $$
$$ \Longrightarrow\quad \ln\frac{\Omega}{\Omega_0} = \frac{k_m - K_u}{I_m + I_u}\,t $$
$$ \Longrightarrow\quad \Omega(t) = \Omega_0\cdot e^{\frac{k_m - K_u}{I_m + I_u}t} \quad\text{(evidenziato)} $$

Si osserva che se km>ku l' andamento dello scostamento è esponenziale crescente, per cui il sistema si allontana dal punto
di stazionarietà P che risulterebbe essere quindi instabile. Invece se Km<Ku l' andamento è decrescente, cioè dopo la
perturbazione lo scostamento diminuisce e il sistema torna al punto di stazionarietà, che risulta stabile

(Nella fonte k/K maiuscole e minuscole si alternano senza differenza di significato.)

---

## PDF p. 199 · pag. stampata — · tipo: appunti battuti + manoscritto

> **Grafico:** ordinate «Ω», ascisse «t», su sfondo a griglia. Entrambe le curve partono da «Ω₀» sull'asse Ω. Curva
> superiore crescente (esponenziale) etichettata «Instabile» e «(K_m − K_u) > 0»; curva inferiore lievemente decrescente
> etichettata «Stabile» e «(K_m − K_u) < 0». Punti marcatori lungo le curve.

In altre parole se :
- se Km > Ku, cioè se la pendenza della caratteristica del motore nel punto di intersezione è maggiore di quella
  dell'utilizzatore, il punto di stazionarietà sarà INSTABILE
- se Km < Ku, cioè se la pendenza della caratteristica dell' utilizzatore nel punto di intersezione è maggiore di quella del
  motore, il punto di stazionarietà è STABILE

(linea orizzontale di separazione)

É possibile calcolare, in maniere simile, quanto tempo impiega il sistema a raggiungere un punto di stazionarietà stabile.
Si consideri un sistema composto da un motore a corrente continua, quindi con una caratteristica meccanica rappresentata da
una retta decrescente, è un utilizzatore avente caratteristica meccanica costante :

> **Grafico:** ordinate «C», ascisse «ω». Retta scura «C_m» decrescente da «C_m0» sull'asse C fino a «ω_S» sull'asse ω.
> Retta orizzontale grigia «C_u» a quota intermedia; le due si intersecano a circa metà di ω_S.

$$ \text{coeff. angolare negativo} = \frac{C_{m0} - \overset{0}{C}}{\overset{0}{\omega_0} - \omega_S} = -\frac{C_{m0}}{\omega_S} = K_m $$
$$ C_m = C_o + \frac{dC}{d\omega}(\overset{0}{\omega} - \omega_p) = C_o - K_m\,\omega_p $$

[lettura incerta: nella seconda riga il termine in parentesi è scritto «ω° − ω_p» con un piccolo «0» sopra ω, come per
indicare ω = 0.]
[NdT: (i) la caratteristica corretta è la retta $C_m = C_{m,0} - |K_m|\,\omega$ (variabile ω, non la costante $\omega_p$);
(ii) la fonte prima definisce $K_m = -C_{m0}/\omega_S < 0$ (con segno) e poi scrive $C_m = C_o - K_m\omega$, che con quel
segno darebbe una retta crescente: da qui in poi $K_m$ va inteso come **modulo** $C_{m0}/\omega_S > 0$, coerentemente con
$\omega_p = (C_{m,0}-C_{u,0})/K_m > 0$ e con l'esponenziale $e^{-K_m t/I_{eq}}$ che segue. Verificato con SymPy: la soluzione
riportata sotto è quella di $I_{eq}\dot\omega = C_{m,0} - K_m\omega - C_{u,0}$ con $K_m>0$.]

$K_u = 0$ perché l' utilizzatore ha pendenza nulla
ma $K_m < 0 \Longrightarrow K_m < K_u \Longrightarrow$ punto P di stazionareità stabile

⟶ per ottenere la velocità di regime, eguaglio le due caratteristiche :

$$ C_m = C_u \quad\text{(evidenziato)}\qquad\qquad C_u = C_{u,0} + \cancel{\frac{dC_u}{d\omega}}^{\,0}(\omega - \omega_P) = C_{u,0} $$
$$ \Longrightarrow\quad C_{m,0} - K_m\,\omega_P = C_{u,0} $$
$$ \Longrightarrow\quad \omega_P = \frac{C_{m,0} - C_{u,0}}{K_m} \quad\text{(evidenziato)} $$

⟶ l' eq. differenziale del moto diventa :

$$ \dot\omega = \frac{d\omega}{dt} = \frac{C_m - C_u}{I_m + I_u} = \frac{C_{m,0} - K_m\omega - C_{u,0}}{I_m + I_u} $$
$$ \Longrightarrow\quad \frac{d\omega}{dt} = \frac{C_{m,0} - K_m\omega - C_{u,0}}{I_{eq}} $$
$$ \Longrightarrow\quad \frac{d\omega}{(C_{m,0} - C_{u,0}) - K_m\omega} = \frac{dt}{I_{eq}}
\quad\Longrightarrow\quad \int_0^{\omega}\frac{d\omega}{C_{m,0} - C_{u,0} - K_m\omega} = \int_0^{t}\frac{dt}{I_{eq}} $$
$$ \Longrightarrow\quad -\frac{1}{K_m}\ln\frac{C_{m,0} - C_{u,0} - K_m\omega}{C_{m,0} - C_{u,0}} = \frac{t}{I_{eq}} $$
$$ \Longrightarrow\quad \omega(t) = \frac{1}{K_m}\Big[C_{m0} - C_{u,0} - (C_{m,0} - C_{u,0})\cdot e^{-\frac{K_m\cdot t}{I_{eq}}}\Big] \quad\text{(evidenziato)} $$

[NdT: $I_{eq}$ non è definito esplicitamente; dal passaggio precedente $I_{eq} = I_m + I_u$.]

---

## PDF p. 200 · pag. stampata — · tipo: manoscritto

$$ \omega(t) = \frac{1}{K_m}\Big[C_{m0} - C_{u,0} - (C_{m,0} - C_{u,0})\cdot e^{-\frac{K_m\cdot t}{I_{eq}}}\Big] \quad\text{(evidenziato)} $$

- $t = 0 \longrightarrow \omega = 0$
- $t \longrightarrow \infty \qquad \omega(t) \longrightarrow \dfrac{C_{m,0} - C_{u,0}}{K_m}$

> **Grafico:** ordinate «ω», ascisse «t», origine «0». Curva crescente concava che parte dall'origine e tende
> asintoticamente alla retta orizzontale «ω_P» (in alto); sotto, un'altra orizzontale «0.9·ω_P». Verticale dal punto in cui
> la curva raggiunge 0.9·ω_P fino all'asse t, con etichetta «t_{90%ω_P}». Freccia curva verso il commento: «la ω(t) del
> sistema tende asintoticamente alla ω_P stazionarea».

⟶ Tuttavia è possibile calcolare il tempo necessario per raggiungere una velocità pari al 90% di quella di stazionareità

$$ \omega(t_{90\%}) = \frac{1}{K_m}\Big[C_{m,0} - C_{u,0} - (C_{m,0} - C_{u,0})\cdot e^{-\frac{K_m\cdot t_{90\%}}{I_{eq}}}\Big] $$

ma

$$ \omega(t_{90\%}) = 90\%\,\omega_P \ \Longrightarrow\ 0.9\Big(\frac{C_{m,0} - C_{u,0}}{K_m}\Big) = \frac{1}{K_m}\Big[C_{m,0} - C_{u,0} - (C_{m,0} - C_{u,0})\cdot e^{-\frac{K_m t_{90\%}}{I_{eq}}}\Big] $$
$$ \hookrightarrow\quad \ln(1 - 0{,}9) = -\frac{K_m\,t_{90\%}}{I_{eq}} \quad\Longrightarrow\quad t_{90\%} = -\frac{I_{eq}}{K_m}\ln(1 - 0.9) $$

Generalizzando :

$$ t_{\%} = -\frac{I_{eq}}{K_m}(1 - \%) \quad\text{(evidenziato)}\qquad \text{tempo necessario per raggiungere una velocità pari al \% di quella di stazionareità} $$

[NdT: nella formula generalizzata manca il logaritmo: corretto $t_{\%} = -\dfrac{I_{eq}}{K_m}\ln(1 - \%)$ (coerente con la
riga sopra per % = 0,9; verificato con SymPy: $t_p = \frac{I_{eq}}{K_m}\ln\frac{1}{1-p}$). Numericamente
$t_{90\%} = \frac{I_{eq}}{K_m}\ln 10 \approx 2{,}30\,I_{eq}/K_m$.]

N.B. tempo ∝ inerzia del sistema [lettura incerta: il simbolo tra «tempo» e «inerzia» sembra «∝» (proporzionale)]

(resto della pagina vuoto)

---

## PDF p. 201 · pag. stampata — · tipo: manoscritto + appunti battuti + scansione libro
### ACCOPPIAMENTO MOTORE CARICO CON TRASMISSIONE

> **Figura (scansione libro, argano):** a sinistra un motore elettrico orizzontale su basamento; il suo albero porta una
> puleggia (cinghia verticale) che scende a un albero inferiore parallelo, sostenuto da due cuscinetti; sull'albero inferiore
> una ruota dentata grande che ingrana con un pignone/ruota sull'albero superiore; l'albero superiore, sostenuto da
> cuscinetti, porta un tamburo con la fune avvolta (spire), raggio «r» indicato a destra. Dalla fune pende una massa «m»;
> sotto, la stessa massa in posizione abbassata (tratteggiata), quota «h» tra le due posizioni; forza peso «G» verso il
> basso.

Si consideri adesso un accoppiamento motore - carico attraverso organi di trasmissione che permettono di aumentare o ridurre
la velocità angolare.

> **Figura:** «Motore» – albero – disco «I_m» («Inerzia lato Motore») – «Organi di Trasmissione» – disco «I_u» («Inerzia
> lato Utilizzatore») – «Utilizzatore». Frecce curve grigie: «C_m» e «ω_m» verso il basso sul lato motore; «ω_u» verso il
> basso e «C_u» verso l'alto sul lato utilizzatore.

Rapporto di trasmissione $\tau = \dfrac{\omega_u}{\omega_m}$

$$ \Longrightarrow\ \tau = \frac{\omega_u}{\omega_m} \ \Longrightarrow\ \omega_u = \tau\,\omega_m \ \Longrightarrow\ \dot\omega_u = \tau\,\dot\omega_m $$
$$ \Longrightarrow\quad \tau = \frac{\omega_u}{\omega_m} = \frac{\dot\omega_u}{\dot\omega_m} = \text{cost} $$

Dal T.F.V. ($\eta = 1$) :

$$ C_m\omega_m + \underbrace{C_u\omega_u}_{<0} = I_m\dot\omega_m\omega_m + I_u\dot\omega_u\omega_u $$

Divido per $\omega_m$ $\Longrightarrow$

$$ C_m - C_u\,\overset{\tau}{\frac{\omega_u}{\omega_m}} = I_m\dot\omega_m + I_u\,\dot\omega_u\,\overset{\tau}{\frac{\omega_u}{\omega_m}}
\ \Longrightarrow\ C_m - C_u\,\tau = I_m\dot\omega_m + I_u\,\tau^2\dot\omega_m \quad\text{(evidenziato)} $$

(sopra $\tau^2\dot\omega_m$ l'annotazione «$\tau\cdot\tau\dot\omega_m$»)

[NdT: nel T.F.V. il termine $C_u\omega_u$ è annotato «< 0» (C_u con segno, potenza resistente); nella riga successiva C_u è
invece usato come modulo («$C_m - C_u\tau$»). Il risultato è corretto con C_u = modulo della coppia resistente.]

⟹ Eq. differenziale del moto di accop. motore-carico con riduttore/moltiplicatore di giri con $\eta = 1$

$$ C_m - C_u\tau = I_m\dot\omega_m + I_u\tau^2\dot\omega_m \ \Longrightarrow\ \dot\omega_m = \frac{C_m - C_u\tau}{I_m + I_u\tau^2} $$

Se $\eta \neq 1$

$$ \eta\,C_m\omega_m - C_u\omega_u = I_m\dot\omega_m\omega_m + I_u\dot\omega_u\omega_u $$
$$ C_m - C_u\frac{\tau}{\eta} = I_m\dot\omega_m + I_u\frac{\tau^2}{\eta}\dot\omega_m \ \Longrightarrow\ C_m - C_u\frac{\tau}{\eta} = \Big(I_m + I_u\frac{\tau^2}{\eta}\Big)\dot\omega_m $$

[NdT: la seconda riga non segue dalla prima: dividendo la prima per $\eta\omega_m$ si otterrebbe anche $I_m\dot\omega_m/\eta$.
L'equazione di partenza corretta (moto diretto) applica η alla potenza che attraversa la trasmissione:
$\eta\,(C_m - I_m\dot\omega_m)\,\omega_m = (C_u + I_u\dot\omega_u)\,\omega_u$, da cui si ottiene esattamente il risultato
finale della fonte $C_m - C_u\tau/\eta = (I_m + I_u\tau^2/\eta)\dot\omega_m$. Verificato con SymPy: il risultato finale è
corretto, l'equazione di partenza scritta no ($\dot\omega_m = (\eta C_m - \tau C_u)/(I_m + \tau^2 I_u)$ ≠ quello finale).]

⟶ A regime : $\dot\omega = 0 \Longrightarrow C_m\omega_m - C_u\omega_u = 0 \Longrightarrow \dfrac{C_m}{C_u} = \dfrac{\omega_u}{\omega_m} = \tau
\Longrightarrow C_m = C_u\,\tau$ (evidenziato) con trasmissione

### ESEMPIO E4/2 (scansione libro)

Un motore è collegato a un utilizzatore tramite un riduttore avente rapporto di trasmissione pari a τ = 1/2. Il motore
fornisce una coppia motrice $C_m = C_{mo} - k_m\,\omega_m$ in cui $C_{mo}$ = 45 Nm, $k_m$ = 0,06 Nms/rad e $\omega_m$ è la
velocità angolare del motore. L'utilizzatore crea una coppia resistente $C_u = k_u\,\omega_u$ dove $k_u$ = 0,8 Nms/rad ed
$\omega_u$ è la velocità angolare dell'utilizzatore.
Calcolare le velocità angolari del motore e dell'utilizzatore a regime e la potenza trasmessa.

Riducendo la coppia resistente all'asse del motore, e ricordando che $\omega_u = \tau\,\omega_m$ si ha la seguente condizione
di equilibrio a regime:

$$ C_m = C_{mo} - k_m\,\omega_m = C_u^{*} = \tau\,C_u = \tau\,k_u\,\omega_u = \tau^2 k_u\,\omega_m $$

Pertanto:

$$ C_{mo} = \omega_m\,(k_m + \tau^2 k_u) $$
$$ \omega_m = \frac{C_{mo}}{k_m + \tau^2 k_u} = 173{,}1\ \text{rad/s} = 1652{,}8\ \text{giri/min} $$
$$ \omega_u = \tau\,\omega_m = 86{,}55\ \text{rad/s} = 826{,}4\ \text{giri/min} $$

La coppia fornita dal motore è:

$$ C_m = C_{mo} - k_m\,\omega_m = 34{,}62\ \text{Nm} $$

La potenza trasmessa è:

$$ W = C_m\,\omega_m = 5992\ \text{W} = 5{,}992\ \text{kW} $$

(Verifica: $\omega_m = 45/(0{,}06 + 0{,}25\cdot0{,}8) = 45/0{,}26 = 173{,}08$ rad/s = 1652,8 giri/min; $\omega_u = 86{,}54$
rad/s = 826,4 giri/min; $C_m = 34{,}615$ Nm; $W = 5991$ W. I valori stampati coincidono a meno dell'arrotondamento
— 86,55 e 5992 sono arrotondati per eccesso.)

---

## PDF p. 202 · pag. stampata — · tipo: manoscritto + appunti battuti + foto
### ACCOPPIAMENTO MOTORE - CARICO CON FRIZIONE

> **Figura:** [foto/rendering: gruppo motopropulsore di un'auto a trazione posteriore] con didascalie: «Pistone» (in alto
> a sinistra, sui cilindri), «Frizione» (dietro al motore), «Albero di trasmissione» (lungo, verso destra), «Semiassi» (a
> destra, tra le ruote posteriori), «Differenziale» (sull'assale posteriore), «Albero motore» (in basso a sinistra),
> «Scatola cambio» (in basso al centro).

L' accoppiamento motore-carico con innesto di frizione è tipico dei veicoli con motore a combustione interna.
La frizione permette di scollegare il motore dalla trasmissione ( e dalle ruote ) per consentirne l' avviamento.

> **Figura:** «Motore» – disco «I_m» («Inerzia lato Motore») con frecce «C_m» e «ω_m» verso il basso – due dischi sottili
> affacciati etichettati sotto «Frizione», con due frecce orizzontali «F» che premono il disco di destra verso sinistra
> (forza di chiusura) – riquadro «Rid/Molt» – freccia «ω_u» verso il basso – disco «I_u» («Inerzia lato Utilizzatore») con
> freccia «C_u» verso l'alto – «Utilizzatore».

In fase di avviamento $\omega_u = 0$, quindi possiamo considerare il lato motore isolandolo dal lato utilizzatore :

> **Figura:** «Motore» – disco «I_m» («Inerzia lato Motore») con «C_m» e «ω_m» verso il basso – albero che termina con un
> solo disco di frizione (libero).

⟶ La caratteristica meccanica $C_m(\omega)$ di un motore a combustione interna ha un andamento del genere :

> **Grafico:** ordinate «C», ascisse «ω». La curva «C_m» inizia (verticale sottile) in «ω_MIN» a un valore positivo,
> cresce, ha un ampio massimo piatto, poi scende ripida e quasi rettilinea fino all'asse ω in «$\omega_m^{I}$».

⟶ Poiché non viene applicata nessuna coppia resistente, dopo l' avviamento il motore raggiunge il punto di stazionareità
caratterizzato da $C_m = 0$ e $\omega_m = \omega_m^{I}$.

Si supponga che il rilascio della frizione avvenga istantaneamente.
Per cui la coppia trasmessa dalla frizione passa istantaneamente da zero a :

$$ C_{fr} = f_{att}\,|F_N|\,\bar r\cdot m \quad\text{(evidenziato)} $$

con le annotazioni: sopra $\bar r$: «raggio medio corona circolare $\bar r = \dfrac{r_i + r_e}{2}$»
[lettura incerta: il simbolo del raggio medio è scritto come una «F»/«r» con tilde sopra; nell'annotazione si legge
«F = (ri+re)/2», ma il significato è il raggio medio]; sotto $F_N$: «F. di chiusura normale»; sotto m: «n. dischi
frizione».

> **Grafico:** ordinate «C_fr», ascisse «t», origine «0». La coppia vale 0 fino all'istante «t_inn.fr.» [lettura incerta:
> «t_{inn. fr.}» = istante di innesto della frizione], poi salta (gradino verticale) al valore costante «C_fr» (tratteggio
> orizzontale verso l'asse delle ordinate).

$$ C_{fr}^{(s)} = \underset{\text{coef. radente}}{f}\;F_N\,r_m\cdot m \qquad\text{caso di strisciamento } \big(\omega^{rel}_{\text{tra motore-condotto}} \neq 0\big) $$
$$ C_{fr}^{(a)} \le f_{att}\,F_N\,r_m\cdot m \qquad\text{caso di aderenza } \big(\omega^{rel}_{\text{tra motore-condotto}} = 0\big) $$

[NdT: la formula evidenziata sopra usa $f_{att}$ (coefficiente d'aderenza) per la coppia trasmessa durante l'innesto, ma
subito dopo la fonte stessa precisa che in strisciamento (che è la situazione durante l'innesto) si usa il coefficiente
radente f. Inoltre $\bar r = (r_i + r_e)/2$ è il raggio medio dell'ipotesi di usura uniforme; con pressione uniforme il
raggio equivalente è $\tfrac23\frac{r_e^3 - r_i^3}{r_e^2 - r_i^2}$ (qui non trattato).]

La frizione è composta da due dischi, uno solidale al lato motore ed uno solidale al lato utilizzatore. Al rilascio della
frizione la velocità angolare dell' utilizzatore sarà diversa di quella del motore , con conseguente strisciamento fra due
dischi.
L' unica grandezza che fa interagire il lato motore con il lato utilizzatore è la coppia trasmessa dalla frizione Cfr.
Supponendo che la velocità di rotazione del motore sia oraria, la frizione applica al motore una coppia opposta alla coppia
motrice, e pertanto antioraria :

---

## PDF p. 203 · pag. stampata — · tipo: manoscritto + appunti battuti

> **Figura (lato motore):** titolo «Lato Motore»; [foto: volano/disco frizione lato motore con corona dentata]. Freccia
> curva «ω_m» in alto a sinistra, verso orario. Un punto «P» sul disco con vettore «V_P» tangente (verso orario).
> Frecce nere tangenziali disposte lungo la circonferenza, in verso antiorario, etichettate «dF_ATTR». A destra, freccia
> curva grande «C_fr» verso antiorario (dal basso verso l'alto).

È possibile assimilare la frizione ad un utilizzatore fittizio che si oppone alla coppia del motore.
Cioè il lato motore può essere modellato come un accoppiamento motore-carico diretto

> **Figura:** «Motore» – albero – disco «I_m» («Inerzia lato Motore») con «C_m» verso il basso e «ω_m» verso il basso –
> freccia «C_fr» verso l'alto – riquadro «Utilizzatore Fittizio: Frizione lato motore».

$$ \Longrightarrow\ \text{Equazione diff. M-C diretto}:\qquad C_m - C_{fr} = I_m\,\dot\omega $$
$$ \Longrightarrow\quad \dot\omega = \frac{C_m - C_{fr}}{I_m} $$

La caratteristica dell' utilizzatore fittizio è costante e la coppia resistente è sempre pari alla coppia di Friz.

> **Grafico:** ordinate «C», ascisse «ω_m». Curva «C_m» come a p. 202 (inizia in «ω_MIN», massimo piatto, discesa ripida);
> retta orizzontale «C_fr»; intersezione «P» sul tratto discendente, con verticale fino a «ω_P».

Linearizzando la caratteristica del motore nel punto P, l' equazione dell' accoppiamento sarà :

$$ C_m(\omega_m) = C_{m,0} + \frac{dC}{d\omega}(\overset{0}{\omega} - \omega_m) = C_{m,0} - K_m\,\omega_m $$
$$ \Longrightarrow\quad \dot\omega_m = \frac{C_{m,0} - K_m\omega_m - C_{fr}}{I_m} $$

[NdT: stessa scrittura impropria di p. 199 ($\frac{dC}{d\omega}(0 - \omega_m)$, con $K_m$ inteso come modulo della pendenza);
qui $C_{m,0}$ è l'intercetta sull'asse C della retta tangente in P, non la coppia reale a ω = 0.]

$$ \frac{\omega}{dt} = \frac{C_{m,0} - K_m\omega_m - C_{fr}}{I_m} \ \Longrightarrow\ \int_{\omega_m^{I}}^{\omega_m}\frac{\omega}{C_{m,0} - K_m\omega_m - C_{fr}} = \int_0^t\frac{dt}{I_m}
\ \Longrightarrow\ -\frac{1}{K_m}\ln\Big(\frac{C_{m,0} - C_{fr} - K_m\omega_m}{C_{m,0} - C_{fr} - K_m\omega_m^{I}}\Big) = \frac{t}{I_m} $$

[NdT: a primo membro e nell'integrando manca la «d»: va letto $\frac{d\omega}{dt}$ e $\int \frac{d\omega}{\dots}$.]

$$ \Longrightarrow\ \frac{C_{m,0} - C_{fr} - K_m\omega_m}{C_{m,0} - C_{fr} - K_m\omega_m^{I}} = e^{-\frac{K_m t}{I_m}}
\ \Longrightarrow\ \omega_m(t) = \frac{1}{K_m}\Big[(C_{m,0} - C_{fr}) - (C_{m,0} - C_{fr} - K_m\omega_m^{I})\,e^{-\frac{K_m t}{I_m}}\Big] \quad\text{(evidenziato)} $$

(Verificato con SymPy: è la soluzione di $I_m\dot\omega_m = C_{m,0} - K_m\omega_m - C_{fr}$, $\omega_m(0) = \omega_m^{I}$.)

- se $t = 0 \Longrightarrow$ istante in cui i dischi di frizione vanno in contatto $\omega_m = \omega_m^{I}$
- se $t \longrightarrow \infty$ : $\omega_m \longrightarrow \dfrac{C_{m,0} - C_{fr}}{K_m}$ = velocità di regime se i dischi della frizione
  fossero sempre in slittamento (che non è vero)

> **Grafico:** ordinate «ω_m», ascisse «t». Curva che parte da «$\omega_m^{I}$» sull'asse e decresce dolcemente
> (esponenziale) tendendo all'orizzontale grigia «$\omega_P = \omega_{m\,t\to\infty}$», posta più in basso.

(resto della pagina vuoto)

---

## PDF p. 204 · pag. stampata — · tipo: LaTeX + figure manoscritte

Analogamente, la frizione esercita sul lato utilizzatore una coppia opposta a quella esercitata sul sul lato motore e fungerà
da coppia motrice per il lato utilizzatore. Anche il lato motore può essere modellato come un accoppiamento motore-carico
con trasmissione equivalente in cui la frizione funge da motore fittizio:

[NdT: «Anche il lato motore» va letto «Anche il lato utilizzatore» (è il lato utilizzatore a essere modellato con la
frizione come motore fittizio); «sul sul» è una ripetizione.]

> **Figura (lato utilizzatore):** titolo «Lato Utilizzatore»; [foto: disco frizione condotto con molle parastrappi e mozzo
> scanalato]. Un punto nero sul bordo in alto a sinistra con vettore «V_rel» (verso il basso-sinistra, tangente). Frecce
> grigie tangenziali lungo la circonferenza, verso orario, etichettate «dF_ATTR». A destra freccia curva grande «C_m fitt»
> verso orario (dall'alto verso il basso).

> **Figura:** riquadro «Motore Fittizio: Frizione lato Utilizzatore» – albero con frecce «C_fr» e «ω_c» verso il basso –
> riquadro «Rid/Molt» – freccia «ω_u» verso il basso – disco «I_u» («Inerzia lato Utilizzatore») con «C_u» verso l'alto –
> «Utilizzatore».

L'equazione differenziale che caratterizza l'accoppiamento è:

$$ \dot\omega_c = \frac{C_{fr} - \tau C_u}{\tau^2 I_u} $$

dove $\omega_c$ è la velocità angolare del motore fittizio, cioè la velocità del disco di frizione solidale al lato motore.

[NdT: il disco che ruota a $\omega_c$ è quello solidale al lato **utilizzatore** (disco condotto, a monte del riduttore);
il disco solidale al lato motore ruota a $\omega_m$. L'equazione è corretta: è quella di p. 201 con $C_m \to C_{fr}$,
$I_m \to 0$ (verificato).]

Ipotizzando la caratteristica dell'utilizzatore costante ($C_u = C_{u,0}$), tutti i termini a destra sono costanti e pertanto
la legge del moto è lineare:

$$ \omega_c(t) = \frac{C_{fr} - \tau C_{u,0}}{\tau^2 I_u}\,t $$

(Condizione iniziale implicita $\omega_c(0) = 0$, cioè $\omega_u = 0$ all'innesto, come detto a p. 202.)

---

## PDF p. 205 · pag. stampata — · tipo: LaTeX + figure manoscritte

> **Grafico:** ordinate «ω_c», ascisse «t», origine «O». Retta uscente dall'origine con pendenza costante.

Diagrammando le leggi orarie dei due dischi di frizione è possibile osservare che le due curve si incontrano nel punto Q,
all'istante $t_Q$:

> **Grafico:** ordinate «ω_m», ascisse «t». Sull'asse, dall'alto: «$\omega_m^{I}$», «ω_Q», «ω_P». Curva «ω_m» decrescente
> che parte da ω_m^I; retta «ω_c» crescente dall'origine; si incontrano nel punto «Q» (pallino) di ordinata ω_Q (tratteggio
> orizzontale verso l'asse) e ascissa «t_Q» (tratteggio verticale). Oltre Q: prolungamento tratteggiato della retta ω_c
> verso l'alto e prolungamento tratteggiato di ω_m che tende all'orizzontale ω_P (entrambi non più validi); una freccia
> indica da Q la dicitura «ADERENZA».

Nel punto Q risulta $\omega_m = \omega_c$, cioè i dischi della frizione sono finalmente in aderenza. Da questo punto in poi,
allora, le equazioni fin ora utilizzate non sono più valide. Tuttavia, il sistema può essere modellato come un accoppiamento
motore-carico con riduttore:

> **Figura:** «Motore» – disco «I_m» («Inerzia lato Motore») con «C_m» e «ω_m» verso il basso – «Organi di Trasmissione» –
> «ω_u» verso il basso – disco «I_u» («Inerzia lato Utilizzatore») con «C_u» verso l'alto – «Utilizzatore».

In questo sistema, l'equazione differenziale del moto è:

---

## PDF p. 206 · pag. stampata — · tipo: LaTeX + figure manoscritte

$$ \dot\omega_m = \frac{C_m - \tau C_u}{I_m + \tau^2 I_u} $$
$$ \frac{d\omega_m}{dt} = \frac{C_{m,0} - k_m\omega_m - \tau C_u}{I_{eq}} $$

Integrando fra l'istante $t_Q$ e il generico istante $t$:

$$ \int_{\omega_Q}^{\omega_m}\frac{d\omega}{C_{m,0} - k_m\omega_m - \tau C_u} = \int_{t_Q}^{t}\frac{dt}{I_{eq}} $$
$$ -\frac{1}{k_m}\ln\Big(\frac{C_{m,0} - k_m\omega_m - \tau C_u}{C_{m,0} - k_m\omega_Q - \tau C_u}\Big) = \frac{t - t_Q}{I_{eq}} $$

Da cui si ricava:

$$ \omega_m(t) = \frac{1}{k_m}\Big[(C_{m,0} - \tau C_{u,0}) - (C_{m,0} - k_m\omega_Q - \tau C_{u,0})\,e^{-\frac{k_m}{I_{eq}}(t - t_Q)}\Big] $$

Diagrammando si osserva che per $t \longmapsto \infty$ risulta $\omega_m \longmapsto \frac{C_{m,0} - \tau C_u}{k_m}$, che rappresenta
la velocità di regime del sistema:

[NdT: qui $I_{eq} = I_m + \tau^2 I_u$ (dalla prima riga), diverso dall'$I_{eq} = I_m + I_u$ di p. 199; non è dichiarato.
Verificato con SymPy: $\omega_m(t)$ è la soluzione con $\omega_m(t_Q) = \omega_Q$.]

> **Grafico:** ordinate «ω_m», ascisse «t». Sull'asse, dall'alto: «$\omega_m^{I}$», «$\omega_{m\,REG}$» (orizzontale grigia
> sottile), «ω_Q». Curva «ω_m» decrescente da ω_m^I fino al punto «Q»; retta «ω_c» crescente dall'origine fino a Q; da Q
> (ascissa «t_Q», tratteggio verticale) una curva unica «ω_m = ω_c» che cresce e tende asintoticamente a ω_m REG (posta
> sopra ω_Q). Sotto l'asse t due quote: da 0 a t_Q «Strisciamento frizione», da t_Q in poi «Aderenza frizione».

(resto della pagina vuoto)
