# Capitolo 7 — MECCANICA DELLE VIBRAZIONI

Intervallo: **PDF pp. 207–223** (pagine non numerate nella fonte: nessun numero di pagina stampato).

## Indice delle sezioni (titoli come nella fonte → pagine PDF)

| Sezione (come nella fonte) | Pagine PDF |
|---|---|
| MECCANICA DELLE VIBRAZIONI (frontespizio) | 207 |
| MECCANICA DELLE VIBRAZIONI — introduzione (vibrazioni libere / forzate) | 208 |
| MODELLO MASSA – MOLLA – SMORZATORE (la massa, la molla, smorzatore viscoso) | 208 |
| DETERMINAZIONE EQUAZIONE DEL MOTO – VIBRAZIONI LIBERE (molle lineari / softening / hardening) | 209 |
| RISOLUZIONE EQ. DIFFERENZIALE OSCILLATORE ARMONICO | 209–210 |
| OSCILLATORE ARMONICO VERTICALE (cambio di variabile, equilibrio statico) | 210 |
| VIBRAZIONI LIBERE SMORZATE (equazione caratteristica, c_r, ξ) | 211 |
| 1) SISTEMA NON SMORZATO ξ = 0 | 212 |
| 2) SISTEMA SOTTOSMORZATO 0 < ξ < 1 (UNDERDAMPED) — DECREMENTO LOGARITMICO δ | 212 |
| 3) SISTEMA CRITICAMENTE SMORZATO | 213 |
| 4) SISTEMA SOVRASMORZATO ξ > 1 | 213 |
| VIBRAZIONI FORZATE — RISPOSTA A UNA FORZA ECCITATRICE SINUSOIDALE | 214 |
| COMPLEX REPLACEMENT (rigidezza dinamica p(λ), ampiezza e fase) | 214–215 |
| FATTORE DI AMPLIFICAZIONE (massimo, ξ > √½, diagramma della fase φ = α_DS) | 215–216 |
| FRF, COMPLEX GAIN, QUALITY FACTOR | 217 |
| QUALITY FACTOR | 217 |
| FRF : FREQUENCY RESPONSE FUNCTION (LABORATORIO) | 218 |
| ECCITAZIONE DI VINCOLO FORZATA (risoluzione senza / con il complex replacement) | 219 |
| TRASMISSIBILITÀ DI SPOSTAMENTO | 220 |
| FASE INIZIALE | 221 |
| MOTO RELATIVO | 221 |
| TRASMISSIBILITÀ DI FORZE (esempio della pressa) | 221–222 |
| VIBRAZIONI PER MASSA ECCENTRICA ROTANTE (autocentramento) | 223 |

Nessuna sezione è numerata nella fonte (solo i quattro casi «1)…4)» di pp. 212–213); nessun numero di equazione
stampato; nessun esempio numerico svolto (unico dato: la pressa da 120 colpi/min, p. 222).

## Tipo di ogni pagina

| PDF p. | Tipo |
|---|---|
| 207 | frontespizio (appunti battuti, solo titolo) |
| 208 | appunti battuti + manoscritto (annotazioni a mano in stampatello) + figura incollata |
| 209–211 | manoscritto (stampatello maiuscolo); p. 211 con figura incollata |
| 212 | manoscritto + appunti battuti, grafico incollato |
| 213 | manoscritto, due grafici incollati |
| 214–217 | manoscritto + appunti battuti, figure/grafici incollati |
| 218 | manoscritto + appunti battuti (metà inferiore vuota) |
| 219 | manoscritto |
| 220 | manoscritto + appunti battuti + grafico stampato da libro |
| 221 | manoscritto + appunti battuti |
| 222 | manoscritto + appunti battuti (quasi tutta vuota) |
| 223 | appunti battuti + manoscritto + nota a mano su carta a quadretti (altra grafia) |

Convenzioni della trascrizione: la grafia dell'autore scrive la M maiuscola in modo simile a una K/«ꓘ»
(«KOTO» = MOTO, «KASSA» = MASSA); qui si trascrive la lettera voluta. La pulsazione naturale è scritta
«ω_m» (il pedice è una «n» corsiva che somiglia a «m»): si trascrive **ω_m** come appare nelle pagine
manoscritte, ma il significato è ω_n. Il fattore di smorzamento è scritto con una lettera corsiva che
alterna l'aspetto di ξ / ζ / φ: si trascrive **ξ** (lettera intesa) salvo dove indicato.

---

## PDF p. 207 · pag. stampata — · tipo: appunti battuti (frontespizio)
### MECCANICA DELLE VIBRAZIONI

Pagina a fondo scuro con il solo titolo centrato, in bianco: **MECCANICA DELLE VIBRAZIONI**.

---

## PDF p. 208 · pag. stampata — · tipo: appunti battuti + manoscritto
### MECCANICA DELLE VIBRAZIONI (titolo manoscritto, evidenziato)

Le vibrazioni meccaniche consistono nell' oscillazione delle parti che compongono un dato sistema meccanico
attorno a una posizione media, esse nascono per effetto della deformabilità dei corpi, in quanti questi, nel
deformarsi, sono in grado di immagazzinare energia potenziale elastica che successivamente si trasforma in
energia cinetica ( associata alle singole masse del sistema stesso ) e viceversa.
Il continuo scambio interno di energia potenziale elastica ed energia cinetica si manifesta con il vibrare
delle strutture medesime attorno ad una configurazione iniziale di equilibrio del sistema.
Ove non esistessero azioni di tipo dissipativo, le vibrazioni , una volta insorte a causa dell' introduzione
iniziale nel sistema di una certa quantità di energia, si manifesterebbero con durata infinita nel tempo, con
frequenze che sono funzione unicamente delle caratteristiche di massa e di elasticità del sistema e con
ampiezze costanti che dipendono dalla quantità di energia introdotta.
Se invece esistono azioni di tipo dissipativo, al manifestarsi di ogni ciclo della vibrazione una quota parte
dell' energia meccanica inizialmente introdotta viene dissipata e le vibrazioni si manifestano con ampiezze
decrescenti nel tempo.

Le vibrazioni in assenza e in presenza di fonti esterne erogatrici in modo continuo di energia prendono
rispettivamente i nomi di
**—VIBRAZIONI LIBERE**
**—VIBRAZIONI FORZATE**
delle strutture e dei sistemi meccanici.

### → MODELLO MASSA – MOLLA – SMORZATORE (manoscritto, evidenziato)

È IL MODELLO ELEMENTARE UTILIZZATO NELLA MECCANICA DELLE VIBRAZIONI . ESSO RAPPRESENTA LE 2 CARATTERISTICHE
FONDAMENTALI CHE DETERMINANO L' ENTITÀ E LA NATURA DELLE VIBRAZIONI , OVVERO L' ELASTICITÀ e SMORZAMENTO.

> **Figura (incollata, a sinistra):** parete verticale tratteggiata a sinistra; da essa partono, in alto, una
> molla a zig-zag etichettata «K» (didascalia sopra: «Molla di rigidezza K») e, in basso, uno smorzatore a
> pistone etichettato «C» (didascalia sotto: «Smorzatore viscoso di costante C»); entrambi collegano la parete
> al lato sinistro di un blocco rettangolare «Massa / M», appoggiato su un piano orizzontale tratteggiato
> (pavimento) con un tratteggio anche sopra il blocco (guida).

→ LA MASSA: DEFINISCE LE $F_{in} = -M\ddot x$

→ LA MOLLA : Rappresenta l' elasticità del sistema e tende a farlo tornare alla condizione di riposo.
Considerati due sistemi S1 ed S2 collegati da una molla di costante elastica k :

> **Figura:** a sinistra un corpo «S1» (contorno curvo) con punto di attacco «A»; a destra un corpo «S2» con
> punto di attacco «B»; tra A e B una molla «K». Su A una freccia orizzontale verso destra «F̄_{E,A}» (sotto
> la molla, a sinistra); su B una freccia verso destra «F̄_{E,B}» (sopra, a destra). Asse «î» orizzontale
> verso destra.

NON SI CONOSCE IL VERSO DELLE FORZE ESSENDO OSCILLANTI, QUINDI
⇒ IPOTIZZO TUTTE POSITIVE AL SISTEMA DI RIFERIMENTO.

NEL S.R. 1 SI VEDE : $\bar F^{S_1}_{E,A} = F_{E,A}\cdot \hat i$ ⟶ $\bar F_{E,A} = -K\,(x_A - x_B)$

↳ ELONGAZIONE DELLA MOLLA A PARTIRE DALLE COND. DI EQ. STATICO, QUINDI LA F_el è
[lettura incerta: «∝» (proporzionale) oppure «d» (dovuta)] AD UNO SPOSTAMENTO, NON AD UNA COORDINATA, OVVERO DI
QUANTO SI È DEFORMATA LA MOLLA

→ SMORZATORE VISCOSO : Nei sistemi meccanici sono sempre presenti azioni dissipative che producono un lavoro
negativo e che, di conseguenza, determinano una diminuzione dell' ampiezza della vibrazione ad ogni ciclo.
Tutto ciò viene modellato mediante uno smorzatore viscoso, nella maggior parte dei casi sono funzioni per lo
più non lineari della velocità, ma nello studio della meccanica delle vibrazioni è possibile nella maggior
parte dei casi, rappresentare globalmente le azioni dissipative mediante uno **smorzatore lineare
equivalente.** Un componente fittizio che crea una forza funzione lineare della velocità relativa fra i suoi
due estremi che si oppone al moto relativo tra questi e vale in modulo :

> **Figura:** corpo «S1» con punto «A» a sinistra, corpo «S2» con punto «B» a destra, collegati da uno
> smorzatore a pistone. Su A freccia verso destra «F̄_{S,A}»; su B freccia verso destra «F̄_{S,B}».

IPOTIZZO F CONCORDI AL S.R. ⇒ $\bar F_{S,A} = \bar F_{S,B}$ ⇒
$$ F_{S,A} = -\tilde c\,(\dot x_A - \dot x_B) \qquad \text{ANALOG.: } F_{S,B} = -c\,(\dot x_B - \dot x_A) $$
(annotazione sopra c̃: «COSTANTE DI SMORZAMENTO — IN UN CICLO DI VIBRAZIONE DETERMINANO LA DISS. DEL SIST. EFF.»)

[NdT: la scritta «F̄_{S,A} = F̄_{S,B}» va intesa come «stessa convenzione di segno»: dalle due formule seguenti
risulta F_{S,B} = −F_{S,A} (azione e reazione), non F_{S,A} = F_{S,B}.]

---

## PDF p. 209 · pag. stampata — · tipo: manoscritto
### DETERMINAZIONE EQUAZIONE DEL MOTO – VIBRAZIONI LIBERE

- TRASCURO L' ATTRITO , VARIABILE CHE DESCRIVE LO STATO DEL SISTEMA È LO SPOSTAMENTO x(t) ORIZZONTALE.

> **Figura:** parete verticale tratteggiata a sinistra; molla «K» orizzontale che collega la parete al lato
> sinistro di un blocco quadrato «m» con baricentro «G»; il blocco scorre tra due guide tratteggiate (sopra e
> sotto). Forze: «F_el» freccia verso sinistra sul blocco; «F_in» freccia verso destra; «mg» verso il basso
> da G; «F_n» (reazione normale) verso l'alto. Asse «î» orizzontale verso destra.

$$ \text{DAL T.E.V.:}\quad \frac{dE_K}{dt} = W^{EST} + W^{INT} = W^{CONS} + W^{N.C.}
\qquad\big(W^{CONS} = \tfrac{dE_P}{dt}\big) $$
[NdT: con la convenzione usata subito dopo (d(E_K+E_P)/dt = W^{N.C.}) deve essere W^{CONS} = −dE_P/dt; il segno
«+» è un refuso. «T.E.V.» = teorema dell'energia cinetica (scritto «T.F.V» [lettura incerta]).]

$$ \Rightarrow \frac{d}{dt}\underbrace{(E_K + E_P)}_{E_{MECCANICA}} = W^{N.C.} \qquad \text{PRINCIPIO DI CONS. DELL' ENERGIA MECCANICA} $$

$$ \Rightarrow \frac{d}{dt}\Big(\tfrac12 M v^2 + \tfrac12 K x_G^2\Big) = W^{N.C.} \;\Rightarrow\; (m\ddot x_G + K x_G)\,\dot x_G = W^{N.C.} $$

SE NON C'È ATTRITO : $(m\ddot x_G + Kx_G)\,\dot x_G = 0$

⇒ ALL' EQUILIBRIO : $m\ddot x_G + Kx_G = 0$

⇒ LA SEGUENTE EQUAZIONE : $\boxed{m\ddot x_G + Kx_G = 0}$ È EQ. OSCILLATORE ARMONICO SEMPLICE , VIBRAZIONI
LIBERE NON SMORZATE

⇒ $-Kx_G = m\ddot x_G$ È UN EQ. A COEFFICIENTI LINEARI A COEF. COST e TEMPOINVARIANTI

> **Figura (grafico 1):** assi «F_el» (verticale) – «x» (orizzontale). Retta per l'origine → «MOLLA LINEARE DI
> HOOKE»; curva che parte dall'origine con la stessa pendenza e poi si appiattisce (rimane sotto la retta) →
> «MOLLA CEDEVOLE, OVVERO MENO RIGIDA». Le curve proseguono anche nel 3° quadrante (x<0). Linee tratteggiate
> da un valore di x verso l'asse F_el, che mostrano due livelli di forza diversi (retta più alta, curva più
> bassa).

MOLLA REALE NON LINEARE " SOFTERING "
> **Figura (grafico 2):** assi F_el – x, origine «0». Curva concava che cresce dall'origine e si appiattisce
> (tratto finale tratteggiato). Accanto: «MOLLA CEDEVOLE, OVVERO MENO RIGIDA».

MOLLA REALE NON LINEARE " HARDERING "
> **Figura (grafico 3):** assi F_el – x. Curva convessa che parte dall'origine con poca pendenza e si impenna
> (tratto finale tratteggiato). Accanto: «MOLLA A BALESTRA».

[NdT: i termini corretti sono «softening» e «hardening».]

### → RISOLUZIONE EQ. DIFFERENZIALE OSCILLATORE ARMONICO

ANSATZ : $x(t) = e^{\lambda t}$

DETERMINO λ : $m\lambda^2 e^{\lambda t} + K e^{\lambda t} = 0 \Rightarrow (m\lambda^2 + K)e^{\lambda t} = 0 \Rightarrow m\lambda^2 + K = 0 \Rightarrow \lambda_{1,2} = \pm i\sqrt{\tfrac{K}{m}}$
(sotto la radice, «=» verso: «ω_m PULSAZIONE NATURALE (NUMERI REALI POSITIVI)»)

$$ \Rightarrow e^{\lambda t} = \begin{cases} e^{i\omega t} = \cos(\omega_m t) + i\sin(\omega_m t) \\ e^{-i\omega t} = \cos(\omega_m t) - i\sin(\omega_m t) \end{cases} $$
(freccia da ω_m: «PUL. ALLA QUALE OSCILLA LA SOLUZIONE LIBERA DEL NOSTRO SISTEMA»)

NECESSITO DI UNA SOLUZIONE REALE : $x(t) = C_1 e^{i\omega_m t} + C_2 e^{-i\omega_m t}$ SOLUZIONE COMPLESSA

→ PER AVERE SOLUZIONE REALE $C_2 = \breve C_1$ (complesso coniugato) ⇒ $Re\{C_1\} = Re\{C_2\}$ e $Im\{C_2\} = -Im\{C_1\}$

SE $C_1 = A e^{i\alpha} \Rightarrow C_2 = A e^{-i\alpha}$

$$ x(t) = A e^{i\alpha} e^{i\omega_m t} + A e^{-i\alpha} e^{-\omega_m t} = A\big(e^{i(\omega_m t+\alpha)} + e^{-i(\omega_m t+\alpha)}\big) = A\,(2\cos(\omega_m t + \alpha)) $$
[NdT: nel secondo addendo manca la «i» all'esponente: deve essere e^{−iω_m t}; il passaggio successivo la usa correttamente.]

$$ \Rightarrow x(t) = C\cos(\omega t + \alpha) $$

PER TROVARE C ed α RISOLVO IL PROBLEMA COUCHY : $\begin{cases} x(0) = x_0 \\ \dot x(0) = 0 \end{cases}$
[NdT: «Cauchy». Si noti che la fonte impone velocità iniziale nulla: il caso generale ẋ(0)=v₀ non è trattato.]

---

## PDF p. 210 · pag. stampata — · tipo: manoscritto
### (segue) RISOLUZIONE EQ. DIFFERENZIALE OSCILLATORE ARMONICO

$$ \Rightarrow \begin{cases} x(0) = x_0 \\ \dot x(0) = 0 \end{cases}\qquad
\begin{cases} C\cos(0+\alpha) = x_0 & \Rightarrow C = x_0 \\ \omega_m C\sin(\alpha) = 0 & \Rightarrow \alpha = 0 \end{cases}
\quad\Big\}\ \text{DIPENDONO DALLE PERTURBAZIONI INIZIALI} $$
[NdT: ẋ(0) = −ω_m C sin α; manca il segno «−», ininfluente perché uguagliato a zero.]

$$ \Rightarrow x(t) = x_0\cos(\omega_m t)\ \ \text{SOLUZIONE REALE} \;\longrightarrow\; x(t) = x_0\sin\big(\omega_m t + \underset{=\alpha}{\tfrac{\pi}{2}}\big) $$

$$ \longrightarrow \begin{cases} C = 2A\ \text{AMPIEZZA} = x_0 \\ \alpha = \text{FASE} \end{cases} $$

> **Figura:** grafico x(t): asse verticale con valore «x₀» segnato (graffa che indica l'ampiezza), asse
> orizzontale «t_m» (tempo). Cosinusoide che parte dal massimo x₀ a t=0, attraversa lo zero a «T_m/4», ha il
> minimo dopo, torna a zero a «T_m/3» e risale; sull'asse sono segnati anche «T_m/2» (tacca sopra l'asse) e
> «T_m» (fine periodo). Nota accanto: «SI USA cos COSÌ DA VEDERE SUBITO LA RISPOSTA ANCHE CON VELOCITÀ NULLA».
> [NdT: il secondo zero della cosinusoide è a 3T_m/4, non a T_m/3.]

DI SEGUITO : $T_m = \dfrac{2\pi}{\omega_m}$ PERIODO e $f_m = \dfrac{1}{T_m} = \dfrac{\omega_m}{2\pi}$

### OSCILLATORE ARMONICO VERTICALE

1 GRADO DI LIBERTÀ VERTICALE

> **Figura:** soffitto orizzontale tratteggiato con asse «y» orizzontale verso destra; da esso pende una molla
> «K» verticale che sorregge un blocco «m» (baricentro «G») tra due guide verticali tratteggiate. Asse «x»
> verticale verso il basso. Forze sul blocco: «F_el» freccia verso il basso (ipotizzata positiva), «F_in»
> freccia verso il basso, «mg» verso il basso da G.

- INSERISCO TUTTE LE FORZE POSITIVE ALL' S.R.

$$ \text{EQUILIBRIO:}\quad mg + F_{el} = \begin{cases} 0 & \text{STATICA} \\ m\ddot x & \text{DINAMICA} \end{cases} $$

→ SUPPONGO STATICA : $mg + Kx_G^{STATICO} = 0 \;\Rightarrow\; x_G^{STATICO} = \dfrac{mg}{K}$
(nota a destra: «QUANTITÀ DI CUI SI È SPOSTATO IL BARICENTRO RISPETTO ALLA POSIZIONE DI CUI LA MOLLA ERA A RIPOSO»)
[NdT: con F_el = −Kx_G (scritto nella riga seguente) l'equilibrio è mg − Kx_G = 0 ⇒ x_G = mg/K; il «+K» è un
refuso di segno (con «+» si otterrebbe −mg/K). Verificato.]

SI NOTA DALLO SCHEMA DI CORPO LIBERO , METTENDO LE FORZE CON I LORO VERSI CHE LA F_el IN CONDIZIONI STATICHE
È −Kx_G , QUINDI È RIVOLTA VERSO L' ALTO , QUINDI ANCHE A RIPOSO C'È STATO ALLUNGAMENTO, ESSENDO x_G POSITIVO

> **Figura (tre schemi affiancati):**
> (1) soffitto con asse y; molla K, blocco m con G, forza F_el verso il basso, mg; quota «l₀» (lunghezza a
> riposo della molla) indicata con una graffa a destra; asse x verso il basso.
> (2) stesso schema: il blocco è disegnato tratteggiato nella posizione di riposo e pieno più in basso
> (posizione di equilibrio statico); quote «l₀» e «l^{ST}» a destra, con la relazione «l^{ST} − l₀ = mg/K».
> (3) tre posizioni del blocco (riposo e equilibrio statico tratteggiati, posizione generica piena ancora più
> in basso); quote «l₀», «l^{ST}», «l» a destra.

CAMBIO DI VARIABILE (evidenziato) $\quad x = \text{ALLUNGAMENTO} = l - l_0 = l - l^{ST} + l^{ST} - l_0 = \underbrace{l - l^{ST}}_{x'} + \dfrac{mg}{K}$

> **Figura:** piccolo grafico con asse verticale su cui è segnato «x^{ST}» e asse orizzontale (tempo); una
> linea ondulata oscilla attorno al livello x^{ST}.

$$ \Rightarrow x(t) = x'(t) + x^{ST} \Rightarrow \dot x(t) = \dot x'(t)\ \ e\ \ \ddot x(t) = \ddot x'(t) $$

$$ \Rightarrow F_{el} = -Kx_G = -K\Big(x_G' + \frac{mg}{K}\Big) $$

PERÒ SCRIVIAMO L' EQUAZIONE : $-m\ddot x' - K(x' + x^{ST}) + Mg = 0$

$$ \Rightarrow m\ddot x + Kx' + Kx^{ST} = Mg $$
(x' sottolineato → «MISURA L' OSCILLAZIONE DEL SISTEMA RISPETTO ALLA CONF. DI EQUILIBRIO STATICO»;
x^{ST} sottolineato → «MISURA L' OSCILLAZIONE DEL SISTEMA RISPETTO ALLA CONF. DI RIPOSO DELLA MOLLA»)
[NdT: le due didascalie sono collocate così nella fonte; propriamente è x = x' + x^{ST} a misurare lo
spostamento dalla configurazione di riposo della molla, mentre x^{ST} è la freccia statica costante.]

→ SCRIVO L' EQUAZIONE DEL MOTO CON RIF ALLA CONDIZIONE DI EQ. STATICO

$$ m\ddot x' + Kx' + K\frac{mg}{K} = mg \;\Rightarrow\; \boxed{m\ddot x' + Kx' = 0}\ \ \text{EQ. OMOGENEA} $$

(riquadro a destra) LA PRESENZA DI FORZE COSTANTI STATICAMENTE APPLICATE SPOSTA IL CENTRO DI OSCILLAZIONE DEL
SISTEMA NON INFLUISCE SULLA FREQUENZA DI OSCILLAZIONE MA SOLO SULLA POSIZIONE ATTORNO A CUI AVVENGONO LE
OSCILLAZIONI

---

## PDF p. 211 · pag. stampata — · tipo: manoscritto (con figura incollata)
### VIBRAZIONI LIBERE SMORZATE

CONSIDERIAMO IL MODELLO MASSA – MOLLA – SMORZATORE

> **Figura (incollata):** la stessa di p. 208: parete a sinistra, molla «K» («Molla di rigidezza K») in alto e
> smorzatore «C» («Smorzatore viscoso di costante C») in basso collegati al blocco «Massa M» su pavimento.

SCHEMA DI CORPO LIBERO :
> **Figura:** blocco rettangolare «m»; asse «x» orizzontale verso destra (in alto a destra). Tre forze
> orizzontali disegnate come frecce che entrano da sinistra nel blocco e puntano verso destra (verso +x):
> «F_el», «F_s» e (più in alto) «F_in»; verticali: «N» verso l'alto e «mg» verso il basso dal centro.

EQUILIBRIO LUNGO x : $+M\ddot x + c\dot x + Kx = 0$

$$ \Rightarrow \text{EQ:}\quad m\ddot x + c\dot x + Kx = 0 $$

ANSATZ : $x = e^{\lambda t} \Rightarrow \dot x = \lambda x_0 e^{\lambda t} \Rightarrow \ddot x_0 = \lambda^2 x_0 e^{\lambda t}$
[NdT: incoerenza di notazione: l'ansatz è x = x₀e^{λt} (la x₀ manca nella prima scrittura) e «ẍ₀» sta per ẍ.]

$$ \Rightarrow m\lambda^2 x_0 e^{\lambda t} + c\lambda x_0 e^{\lambda t} + Kx_0 e^{\lambda t} = 0 $$
$$ x_0 e^{\lambda t}\,\underbrace{(m\lambda^2 + c\lambda + K)}_{p(\lambda)\ \text{POLINOMIO CARATTERISTICO}} = 0 $$

$$ \Rightarrow m\lambda^2 + c\lambda + K = 0 \Rightarrow \lambda_{1/2} = \frac{-c \pm i\sqrt{c^2 - 4mK}}{2m}
= -\frac{c}{2m} \pm i\sqrt{\Big(\frac{c}{2m}\Big)^2 - \frac{4mK}{(2m)^2}} = -\frac{c}{2m} \pm i\sqrt{\Big(\frac{c}{2m}\Big)^2 - \frac{K}{m}} $$

QUINDI : $\lambda_{1/2} = -\dfrac{c}{2m} \pm i\sqrt{\Big(\dfrac{c}{2m}\Big)^2 - \dfrac{K}{m}}$

[NdT: errore della fonte, ripetuto in tutta la pagina: la formula risolutiva dà
λ = (−c ± √(c² − 4mK))/(2m), **senza** «i». Con la «i» davanti a √(c²−4mK) le radici sarebbero complesse proprio
quando c² > 4mK, cioè il contrario del vero. Forma corretta: λ = −c/2m ± √((c/2m)² − K/m) = ω_n(−ξ ± √(ξ²−1)),
oppure, per ξ<1, λ = −ξω_n ± iω_n√(1−ξ²). Verificato con SymPy (radici di mλ²+cλ+K).]

c_r COEFFICIENTE DI SMORZAMENTO CRITICO , COLUI CHE FA ANNULLARE IL RADICALE

$$ \Big(\frac{c_r}{2m}\Big)^2 - \underset{\omega_m^2}{\frac{K}{m}} = 0 \;\Longrightarrow\; \frac{c_r^2}{4m^2} - \omega_m^2 = 0 \;\Longrightarrow\; c_r = 2\omega_m m $$

ξ FATTORE DI SMORZAMENTO $= \dfrac{c}{c_r} = \dfrac{c}{2\omega_m m}$ — DESCRIVE LA CAPACITÀ DI UN SISTEMA DI SMORZARE
LE VIBRAZIONI

SOSTITUIAMO NELL' EQUAZIONE : $\lambda_{1/2} = -\dfrac{c}{2m} \pm i\sqrt{\Big(\dfrac{c}{2m}\Big)^2 - \dfrac{K}{m}}$

$$ \lambda_{1/2} = -\xi\frac{2\omega_m m}{2m} \pm i\sqrt{(\xi\omega_m)^2 - \omega_m^2} $$
$$ \Rightarrow \lambda_{1,2} = -\xi\omega_m \pm i\sqrt{(\xi\omega_m)^2 - \omega_m^2} = -\xi\omega_m \pm i\,\omega_m\sqrt{\xi^2 - 1} = \boxed{\omega_m\big(-\xi \pm i\sqrt{\xi^2 - 1}\big)} $$
[NdT: stesso errore: corretto λ₁,₂ = ω_m(−ξ ± √(ξ²−1)).]

⇒ SOLUZIONE GENERALE DELL' EQUAZIONE DIFFERENZIALE
$$ x(t) = A_1 e^{\lambda_1 t} + A_2 e^{\lambda_2 t} $$
$$ x(t) = A_1 e^{\omega_m(-\xi + i\sqrt{\xi^2-1})t} + A_2 e^{\omega_m(-\xi - i\sqrt{\xi^2-1})t} $$
[NdT: idem, senza «i» negli esponenti.]

- LA SOLUZIONE GENERALE DEL MOTO DIPENDE DAL FATTORE DI SMORZAMENTO ξ
  1) ξ = 0 SISTEMA NON SMORZATO
  2) 0 < ξ < 1 SISTEMA SOTTOSMORZATO
  3) ξ = 1 SISTEMA CRITICAMENTE SMORZATO c = c_r
  4) ξ > 1 SISTEMA SOVRASMORZATO

---

## PDF p. 212 · pag. stampata — · tipo: manoscritto + appunti battuti (con grafico incollato)
### 1) SISTEMA NON SMORZATO ξ = 0

SE ξ = 0 ⇒ c = 0 E QUINDI CI SI RITROVA NEL CASO DI VIBRAZIONE NON SMORZATA :

⇒ $\lambda_{1/2} = \pm i\omega_m$

⇒ $x(t) = C_1 e^{i\omega_m t} + C_2 e^{-i\omega_m t}$ SOLUZIONE COMPLESSA

SE $C_1 = A_1 e^{i\alpha}$ → PER AVERE SOLUZIONE REALE $C_2 = \breve C_1$ ⇒ $C_2 = A_1 e^{-i\alpha}$

$$ \Rightarrow x(t) = A_1 e^{i\alpha}e^{i\omega_m t} + A_1 e^{-i\alpha}e^{-i\omega_m t}
= A_1\big(e^{i(\omega_m t+\alpha)} + e^{-i(\omega_m t+\alpha)}\big) = A\,2\cos(\omega_m + \alpha) = C\cos(\omega_m + \alpha) $$
[NdT: manca «t»: cos(ω_m t + α).]

C.I. $\begin{cases} x(0) = x_0 \\ \dot x(0) = 0 \end{cases} \Rightarrow \begin{cases} C = x_0 \\ \alpha = 0 \end{cases} \Longrightarrow x(t) = x_0\cos(\omega_m t) = \underline{\underline{x_0\sin(\omega_m t + \alpha)}}$ STESSA SOLUZIONE
[NdT: nella forma con il seno la fase è α = π/2 (come a p. 210), non lo stesso α = 0 appena trovato.]

### 2) SISTEMA SOTTOSMORZATO 0 < ξ < 1 — UNDERDAMPED

LA RADICE $\sqrt{\xi^2 - 1}$ RISULTA UN NUMERO COMPLESSO (2 RADICI COMPLESSE E CONIUGATE)

SE $\lambda_{1,2} = \omega_m\big(-\xi \pm i\sqrt{\xi^2 - 1}\big)$

$$ x(t) = A_1 e^{\lambda_1 t} + A_2 e^{\lambda_2 t} = A_1 e^{-\omega_m\xi t} e^{i\omega_m\sqrt{\xi^2-1}\,t} + A_2 e^{-\omega_m\xi t}\cdot e^{-i\omega_m\sqrt{\xi^2-1}\,t} $$

RACCOLGO IL " − " $\quad \sqrt{\xi^2 - 1} = -\sqrt{1 - \xi^2}$

TRASFORMO $\quad \omega_d = \omega_m\sqrt{1 - \xi^2}$ PULSAZIONE SMORZATA

$$ \Rightarrow x(t) = e^{-\omega_m\xi t}\big(A_1 e^{-i\omega_d t} + A_2 e^{+i\omega_d t}\big) $$
$$ \Rightarrow x(t) = \underbrace{e^{-\omega_m\xi t}}_{\text{ESPONENZIALE DECRESCENTE}}\ \underbrace{x_0\sin(\omega_d t + \alpha)}_{\text{ARMONICA CON PULSAZIONE SMORZATA}} $$

[NdT: per 0<ξ<1 vale √(ξ²−1) = i√(1−ξ²), non −√(1−ξ²). Il passaggio della fonte compensa l'errore di p. 211
(la «i» spuria): con le radici corrette λ = −ξω_m ± iω_m√(1−ξ²) si arriva direttamente a
x = e^{−ξω_m t}(A₁e^{iω_d t} + A₂e^{−iω_d t}) = X e^{−ξω_m t} sin(ω_d t + α). Il risultato finale della fonte è
corretto; la costante «x₀» davanti al seno è un'ampiezza generica (non x(0)).]

> **Figura (grafico incollato, a destra):** titolo «VIBRAZIONE LIBERA SOTTO-SMORZATA»; asse verticale «y [m]»
> da −2.0 a 2.0 (a mano «X»), asse orizzontale da 0.0 a 10 (a mano «t»). Sinusoide smorzata che parte da un
> minimo ≈ −1.5 e oscilla con ampiezza decrescente (picchi ≈ 1.5, 1.3, 1.1, 1.0, …, ≈ 0.6 verso t=10). Inviluppo
> esponenziale tratteggiato superiore e inferiore, etichettato a mano «x₀ e^{−ω_m ξ t}»; freccia orizzontale
> «T_d» tra due picchi consecutivi; scritto a mano «ξ = 0.04».

⇒ LA VELOCITÀ CON CUI LA RISPOSTA DEL MOTO TENDE a 0 DIPENDE DAL FATTORE DI SMORZAMENTO ξ

- PER VALUTARLA SI DEFINISCE IL DECREMENTO LOGARITMICO δ

δ = ln del RAPPORTO TRA DUE AMPIEZZE CONSECUTIVE
↳ MISURA LA RIDUZIONE DI AMPIEZZA DELLA VIBRAZIONE TRA DUE PICCHI CONSECUTIVI

$$ \delta = \ln\frac{x_0 e^{-\omega_m\xi t}}{x_0 e^{-\omega_m\xi(t+T_d)}} = \ln e^{-\omega_m\xi(t - t - T_d)} = \ln e^{\omega_m\xi T_d} = \omega_m\xi T_d $$

$$ \to T_d = \frac{2\pi}{\omega_d} \Longrightarrow \delta = \omega_m\xi\frac{2\pi}{\omega_d} = \omega_m\xi\frac{2\pi}{\omega_m\sqrt{1-\xi^2}} = \frac{\xi\,2\pi}{\sqrt{1-\xi^2}} $$

Il decremento logaritmico può essere misurato sperimentalmente e permette di ricavare la costante di
smorzamento di un sistema meccanica, nella seguente maniera:
Basta perturbare il sistema, attraverso dei trasduttori registro la mia risposta, dal grafico scelgo due
ampiezze consecutive ed effettuo il logaritmo del rapporto, e successivamente dalla formula inversa ricavo il
fattore di smorzamento.
All' aumentare del fattore di smorzamento, il decremento logaritmico aumenta, indicando una riduzione più
rapida delle oscillazioni.

[NdT: formula inversa (non scritta nella fonte): ξ = δ/√(4π² + δ²). Verificato con SymPy.]

---

## PDF p. 213 · pag. stampata — · tipo: manoscritto (con grafici incollati)
### 3) SISTEMA CRITICAMENTE SMORZATO

ξ = 1 ⇒ c = c_r — LA SOLUZIONE DELL' EQUAZIONE CARATTERISTICA SARÀ <u>1 RADICE DOPPIA REALE</u>

SE $\lambda_{1,2} = -\omega_m\big(\xi \pm i\sqrt{\xi^2 - 1}\big) \Rightarrow \underline{\lambda_{1/2} = -\omega_m}$

$$ \Rightarrow x(t) = A_1 e^{\lambda_1 t} + A_2 e^{\lambda_2 t} = e^{-\omega_m t}(A_1 + A_2) $$
$$ \Rightarrow \boxed{x(t) = e^{-\omega_m t}(A_1 + A_2)} $$
IL MOTO NON HA ANDAMENTO ARMONICO E LA PERTURBAZIONE INIZIALE SI SMORZA RAPIDAMENTE

[NdT: errore della fonte. Con radice doppia le due esponenziali coincidono e A₁+A₂ è un'unica costante: non si
possono soddisfare due condizioni iniziali. La seconda soluzione indipendente è t·e^{−ω_m t}, quindi
x(t) = (A₁ + A₂t)e^{−ω_m t}. Verificato con SymPy (dsolve di ẍ + 2ω_nẋ + ω_n²x = 0). Inoltre qui λ è scritto
−ω_m(ξ ± i√(ξ²−1)), forma diversa da quella di p. 211 (ω_m(−ξ ± i√…)); equivalente per via del ±, ma con la
stessa «i» spuria.]

> **Figura (grafico incollato):** titolo «VIBRAZIONE LIBERA CRITICAMENTE SMORZATA»; asse verticale «y [m]» da
> 0.0 a 2.0 (a mano «X»), asse orizzontale «t [s]» da 0.0 a 2.0 (a mano «t»). Curva che parte da ≈1.8 con
> tangente orizzontale, scende rapidamente (flesso attorno a t≈0.3, valore ≈1.0 a t≈0.45, ≈0.2 a t≈1.0) e tende
> a zero senza attraversarlo (≈0 per t≥1.6). Scritto a mano «ξ = 1».

### 4) SISTEMA SOVRASMORZATO ξ > 1

⇒ c > c_r — SOLUZIONE 2 RADICI REALI E DISTINTE

$$ \lambda_{1/2} = -\omega_m\big(\xi \pm \sqrt{\xi^2 - 1}\big) $$
$$ \Rightarrow x(t) = A_1 e^{-\omega_m(\xi + \sqrt{\xi^2-1})t} + A_2 e^{-\omega_m(\xi - \sqrt{\xi^2-1})t} $$
LA RISPOSTA DEL SISTEMA È APERIODICA E SI ATTENUA IN UN TEMPO MAGGIORE DI QUELLO DI UN SISTEMA CRITICAMENTE
SMORZATO, MA MINORE DI UN SISTEMA SOTTOSMORZATO
[NdT: qui (finalmente) le radici sono scritte senza «i», nella forma corretta. L'affermazione «minore di un
sistema sottosmorzato» non è generale: dipende da ξ e dal criterio di assestamento (un sottosmorzato con ξ
vicino a 1 si assesta più in fretta di un sovrasmorzato con ξ grande, uno con ξ piccolo più lentamente).]

> **Figura (grafico incollato):** titolo «VIBRAZIONE LIBERA SOVRA-SMORZATA»; asse verticale «y [m]» da 0.0 a
> 2.0 (a mano «X»), asse orizzontale «t [s]» da 0.0 a 2.0 (a mano «t»). Curva che parte da ≈1.8 e decresce
> lentamente, quasi esponenziale (≈1.0 a t≈0.6, ≈0.5 a t≈1.1, ≈0.22 a t=2.0), senza attraversare lo zero.
> Scritto a mano «ξ = 2».

---

## PDF p. 214 · pag. stampata — · tipo: manoscritto + appunti battuti (con figura incollata)
### VIBRAZIONI FORZATE

RISPOSTA A UNA FORZA ECCITATRICE SINUSOIDALE

Sì definiscono vibrazioni forzate tutti quei casi di vibrazioni in cui sulla massa oscillante agisce un' azione
eccitatrice esterna permanente. Lo sviluppo in serie di Fourier, permette di scomporre una funzione periodica in
una sommatoria di funzioni sinusoidali.
In questo modo , è possibile studiare il sistema sottoposto a ciascuna delle componenti armoniche dello sviluppo
in serie di Fourier individualmente e sommarne gli effetti.
Si consideri per tanto un sistema massa-molla-smorzatore su cui agisce una forza sinusoidale :

> **Figura (incollata):** parete tratteggiata a sinistra; molla «K» in alto e smorzatore «C» in basso collegano
> la parete al blocco «M» che scorre tra guida superiore tratteggiata e pavimento. Sopra il blocco freccia
> orizzontale «x» verso destra (asse). Dal lato destro del blocco esce una grossa freccia orizzontale verso
> destra, scritta a mano «F₀ sin(ω·t)».

→ SCHEMA DI CORPO LIBERO
> **Figura:** blocco quadrato «m»; asse «x» verso destra in alto. A sinistra due frecce orizzontali verso destra
> (entranti nel blocco): «F_el» (in alto) e «F_c» (in basso). Dal centro verso destra «F₀ sin(ωt)»; sul lato
> destro freccia verso destra «F_in». Verticali: «N» verso l'alto, «mg» verso il basso.

EQUAZIONE DEL MOTO : EQUILIBRIO SU x
$$ \bar F_{el} + \bar F_c - \bar F_{in} + \bar{\bar F}(t) = 0 $$
$$ -m\ddot x - c\dot x - kx + F_0\sin(\omega t) = 0 \;\Longrightarrow\; \boxed{m\ddot x + c\dot x + kx = F_0\sin(\omega t)} $$
[NdT: con F_in = −mẍ (p. 208) la somma corretta è F_el + F_c + F_in + F(t) = 0; il «−F_in» scritto è incoerente
con il termine «−mẍ» della riga sotto, che è comunque quello giusto.]

↳ L' EQUAZIONE DIFFERENZIALE OTTENUTA NON È OMOGENEA , QUINDI LA SOLUZIONE SARÀ LA SOMMA DI UN INTEGRALE
PARTICOLARE ED UNO GENERALE

$$ x(t) = x_G(t) + x_P(t) $$

→ x_G(t) È LA SOLUZIONE DELL' EQ. DIFF. OMOGENEA ASSOCIATA CHE COSTITUISCE L' EQUAZIONE DELLE VIBRAZIONI
LIBERE, TUTTAVIA LE VIBRAZIONI LIBERE SMORZATE SI SMORZATO DOPO POCHI SECONDI, CIOÈ x_G(t) TENDE A ZERO.

NELLO STUDIO DELLE VIBRAZIONI FORZATE È DI INTERESSE QUELLO CHE ACCADE DOPO IL BREVE TRANSITORIO
ALLORA TRASCURIAMO L' INTEGRALE GENERALE

→ x_P(t) È LA RISPOSTA DINAMICA DEL SISTEMA AL TERMINE DEL TRANSITORIO.

IL SISTEMA SOTTOPOSTO AD UNA FORZANTE ARMONICA CON PULSAZIONE ω , RISPONDE CON UN' OSCILLAZIONE DI PARI
PULSAZIONE , CON AMPIEZZA X₀ e IN RITARDO RISPETTO ALLA FORZANTE DI UN ANGOLO φ

QUINDI LA MIA RISPOSTA SARÀ : $x_p = X_0\sin(\omega t - \varphi)$
$$ \Rightarrow \dot x_p = \omega x_p\cos(\omega t - \varphi) \qquad\qquad \cos(\omega t) = Re\{e^{i\omega t}\} $$
$$ \Rightarrow \ddot x_p = -\omega^2 x_p\sin(\omega t - \varphi) \qquad\qquad \sin(\omega t) = Im\{e^{i\omega t}\} $$
[NdT: nelle derivate «x_p» davanti a cos/sin sta per l'ampiezza X₀: ẋ_p = ωX₀cos(ωt−φ), ẍ_p = −ω²X₀sin(ωt−φ).]

### COMPLEX REPLACEMENT

$$ \hat x_p = \hat X_0 e^{i\omega t} \in \mathbb C \qquad \text{(DOVE LA } \omega \text{ DELLA NOSTRA RISPOSTA PARTICOLARE SARÀ LA STESSA DELLA FORZANTE)} $$
$$ \dot{\hat x}_p = i\omega\hat X_0 e^{i\omega t} $$
$$ \ddot{\hat x}_p = (i\omega)^2\hat X_0 e^{i\omega t} = -\omega^2 X_0 e^{i\omega t} $$

SCRIVO L' EQUAZIONE ⇒ $m\ddot x_G + c\dot x_G + kx_G = F_0\sin(\omega t + \alpha)$
[NdT: qui il pedice «G» indica la risposta che si sta cercando (a regime), non l'integrale generale x_G appena
definito né il baricentro G di p. 209: conflitto di notazione. La fase α della forzante compare qui per la prima
volta.]

---

## PDF p. 215 · pag. stampata — · tipo: manoscritto + appunti battuti (con grafico incollato)
### (segue) COMPLEX REPLACEMENT

$$ m\ddot x_G + c\dot x_G + kx_G = F_0\sin(\omega t + \alpha) $$
$$ \text{C.R.:}\quad -\omega^2 m\hat X_G e^{i\omega t} + ci\omega\hat X_G e^{i\omega t} + k\hat X_G e^{i\omega t} = \hat F_0 e^{i\alpha} $$
[NdT: al secondo membro manca e^{iωt}: deve essere F₀e^{iα}e^{iωt}; nella riga dopo «F̂₀» ingloba e^{iα}.]

$$ \Rightarrow \hat X_G\,[-m\omega^2 + ic\omega + k] = \hat F_0 $$
$$ \Rightarrow \hat X_G = \frac{\hat F_0}{\underbrace{-m\omega^2 + ic\omega + k}_{p(\lambda)\ \text{RIGIDEZZA DINAMICA}}} = |X_G|\,e^{i\varphi} $$

RIGIDEZZA DINAMICA p(λ) : QUANTITÀ COMPLESSA CHE LEGA LA FORZA APPLICATA AL SISTEMA , ALLA SUA RISPOSTA IN
SPOSTAMENTO

$$ \Rightarrow |p(\lambda)| = \sqrt{Re^2 + Im^2} = \sqrt{(-m\omega^2 + k)^2 + (c\omega)^2} = \text{AMPIEZZA DELL' OPPOSIZIONE DEL SISTEMA AD UNA FORZA ARMONICA} $$

$$ \Rightarrow x_{part}(t) = \underset{\sim}{A}\sin(\omega t - \varphi) \qquad\qquad \varphi = \text{arctg}\frac{Im}{Re} = \text{arctg}\frac{c\omega}{-m\omega^2 + k} = \text{SFASAMENTO TRA FORZA E SPOSTAMENTO} $$
$$ \hookrightarrow A = |\hat X| = \frac{F_0}{|p(\lambda)|} $$
[NdT: se φ = arg p(λ) = arctg(cω/(k−mω²)), allora X̂_G = F̂₀/p = |X_G|e^{−iφ} (non e^{+iφ}): la risposta è in
ritardo, coerentemente con «sin(ωt − φ)» scritto subito dopo. Inoltre l'arcotangente va presa nel quadrante
giusto (φ ∈ [0, π]): per k − mω² < 0 la arctg «principale» darebbe un angolo negativo. Verificato con SymPy.]

SE DIVIDO PER K :
$$ \varphi = \text{arctg}\frac{Im}{Re} = \text{arctg}\frac{c\omega}{-m\omega^2 + k} = \text{arctg}\frac{\frac{c\omega}{K}}{1 - \frac{m}{K}\omega^2} \;\Longrightarrow\; \varphi = \text{arctg}\frac{2\xi\rho}{1 - \rho^2} $$
(dal numeratore cω/K, freccia:) $2\xi\omega_m m\cdot\dfrac{\omega}{K} = 2\xi\omega_m\cdot\dfrac{1}{\omega_m^2}\cdot\omega = 2\xi\rho$
(dal denominatore, freccia:) $\rho = \dfrac{\omega}{\omega_m}$ : $\dfrac{\omega^2}{\omega_m^2} = \rho^2$ RAPPORTO TRA LA PULSAZIONE DELLA FORZANTE CON QUELLA NATURALE DEL SISTEMA
(nota a destra, con freccia verso il denominatore 1−ρ²): SE F₀ AGISSE STATICAMENTE , ω = 0, quindi ρ = 0 , LO
SPOSTAMENTO DEL SISTEMA SAREBBE STATICO $x^{STA} = F_0/K$

$$ X_0 = \frac{F_0}{\sqrt{(-m\omega^2 + k)^2 + (c\omega)^2}} = \frac{F_0/K}{\sqrt{\big(1 - \frac{m\omega^2}{K}\big)^2 + \big(\frac{c\omega}{K}\big)^2}} $$
(sotto, dal primo termine:) $1 - \dfrac{1}{\omega_m^2}\omega^2 = 1 - \rho^2$
(dal secondo termine:) $\dfrac{c^2\omega^2}{K^2} = 4\xi^2\omega_m^2 m^2\cdot\dfrac{\omega^2}{K^2} = 4\xi^2\dfrac{\omega^2}{\omega_m^2} = 4\xi^2\rho^2$

$$ \Rightarrow X_0 = \frac{F_0/K}{\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}} \;\longrightarrow\; \text{SE } F_0 \text{ AGISSE STATICAMENTE QUINDI } \omega = 0 \Rightarrow \rho = 0 \Rightarrow x^{STA} = \frac{F_0}{K} $$

### FATTORE DI AMPLIFICAZIONE

Si definisce fattore di amplificazione il rapporto tra l' ampiezza della risposta dinamica del sistema e lo
spostamento che il sistema avrebbe subito nei casi di forza statica.
$$ A(\rho,\xi) = \frac{x_0}{x_0^{STA}} = \frac{1}{\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}} $$
All' aumentare del fattore di amplificazione , l' ampiezza di oscillazione a cui è soggetto il sistema meccanico
è maggiore, con conseguenze negative . Il fattore di amplificazione dipende da csi, che è funzione delle
caratteristiche del sistema e da gro che dipende anche dalla forzate . Diagrammando si ottiene :

> **Figura (grafico incollato «Fattore di Amplificazione»):** asse verticale «A» da 0 a 6 (tacche 1…6), asse
> orizzontale «ω/ω_m = ρ» da 0 a 3 (tacche 0,5 – 1 – 1,5 – 2 – 2,5 – 3). Curve a punti, tutte con A=1 a ρ=0 e
> tendenti a 0 per ρ→3:
> «ξ=0»: sale e diverge (asintoto verticale) a ρ=1, due rami;
> «ξ=0.1»: picco ≈5 a ρ≈1;
> «ξ=0.3»: picco ≈1.75 a ρ≈0.9;
> «ξ=0.5»: massimo ≈1.15 a ρ≈0.7, molto piatto;
> «ξ=0.8»: monotona decrescente da 1.
> (Valori coerenti con A_max = 1/(2ξ√(1−ξ²)) a ρ = √(1−2ξ²): 5.03; 1.75 a 0.906; 1.15 a 0.707.)

$$ A(\xi,\rho) = \frac{1}{\sqrt{(1 - \rho^2)^2 + (4\xi^2\rho^2)}} \quad\text{, IL GRAFICO VIENE OTTENUTO PARAMETRANDO } \xi $$

- PER ξ = 0 , QUINDI IN ASSENZA DI SMORZAMENTO , IL FATTORE DI AMPLIFICAZIONE $A = \dfrac{1}{|1 - \rho^2|}$
  → SE ρ = 0 IL SISTEMA SARÀ IN CONDIZIONI STATICHE A=1
  → SE ρ = 1 ω = ω_m A → ∞ RISONANZA ,

RISONANZA: SI IMPONE UNA FORZANTE CON LA STESSA FREQUENZA DEL SISTEMA QUESTO VIENE RECEPITO POSITIVAMENTE DAL
SISTEMA CHE AMPLIFICA LA RISPOSTA RAGGIUNGENDO AMPIEZZE DI OSCILLAZIONI INFINITE PORTANDO IL SISTEMA AL COLLASSO
[NdT: ampiezza infinita solo nel modello con ξ = 0; nel transitorio cresce linearmente nel tempo.]

---

## PDF p. 216 · pag. stampata — · tipo: manoscritto (con grafici incollati)
### (segue) FATTORE DI AMPLIFICAZIONE

> **Figura (a sinistra):** lo stesso grafico «Fattore di Amplificazione» di p. 215 (A da 0 a 6, ρ da 0 a 3;
> curve ξ = 0, 0.1, 0.3, 0.5, 0.8).

- PER ξ > 0
IL FATTORE D' AMPLIFICAZIONE PRESENTA UN MASSIMO
$$ \frac{dA}{d\rho} = 0 \Rightarrow \frac{dA^{-2}}{d\rho} = 0 \qquad A^{-2} = (1 - \rho^2)^2 + 4\rho^2\xi^2 $$
$$ \frac{dA^{-2}}{d\rho} = 2(1 - \rho^2)(-2\rho) + 8\rho\xi^2 = 0 $$
$$ = -4\rho(1 - \rho^2) + 8\rho\xi^2 = 0 \Rightarrow -4\rho + 4\rho^2 + 8\rho\xi^2 = 0 $$
$$ \Rightarrow 4\rho(\rho - 1 + 2\xi^2) = 0 \;\begin{cases} \rho = 0 \\ \rho_R = \sqrt{1 - 2\xi^2}\ \ \text{MASSIMO RELATIVO} \end{cases} $$
[NdT: −4ρ(1−ρ²) = −4ρ + 4ρ³ (non 4ρ²), quindi 4ρ(ρ² − 1 + 2ξ²) = 0. Il risultato ρ_R = √(1−2ξ²) è corretto
(coerente con ρ²); verificato con SymPy. Il valore del massimo, A(ρ_R) = 1/(2ξ√(1−ξ²)), non è scritto nella fonte.]

⇒ LA PRESENZA DELLO SMORZAMENTO FA SI CHE LE OSCILLAZIONI NON ARRIVINO AD INFINITO MA , PER VALORI BASSI DI ξ,
RESTANO COMUNQUE MOLTO ELEVATE CAUSANDO DANNI AL SISTEMA . PER EVITARE QUESTO FENOMENO BISOGNA ELIMINARE IL PUNTO
MAX ⇒ $1 - 2\xi^2 < 0$

⇒ $\xi > \sqrt{\tfrac12} \simeq 0.7$ ⇒ IL PICCO SCOMPARE , LA FUNZIONE DIVENTA MONOTONA DECRESCENTE , QUINDI NON
SI OTTERRÀ NESSUNA RISONANZA PERICOLOSA, LA RISPOSTA SARÀ SEMPRE MODERATA.
↳ QUINDI COSÌ FACENDO SI ELIMINA LA POSSIBILITÀ DI RISONANZA, OVVERO DI OTTENERE UNA RISPOSTA AMPLIFICATA A
FREQUENZA VICINA A QUELLA NATURALE.

PER CUI PER ξ > 0.7 SI ELIMINA IL FENOMENO DI RISONANZA , E LA FUNZIONE NON PRESENTERÀ PIÙ MASSIMO.

DIAGRAMMANDO $\varphi = \alpha_{DS}$ (DS = «dynamic stiffness», cfr. p. 219) $= \text{arctg}\dfrac{2\xi\rho}{1 - \rho^2}$

> **Figura (grafico incollato, fase):** asse verticale «φ [rad]» da 0 a 3,5 (tacche 0,5…3,5), asse orizzontale
> «ρ» da 0 a 3,5. Curva «ξ=0»: φ=0 per ρ<1, salto verticale a ρ=1, poi φ=π (≈3.14) costante. Curve «ξ=0.1»,
> «ξ=0.3», «ξ=0.5», «ξ=0.8»: tutte partono da (0,0), passano per (1, π/2 ≈ 1.57) e tendono a π per ρ grande;
> più ξ è piccolo più la transizione è ripida. Due frecce disegnate a mano etichettate «ξ»: per ρ<1 freccia
> verso l'alto a sinistra (al crescere di ξ la curva sale), per ρ>1 freccia verso il basso a destra (al
> crescere di ξ la curva scende).

- PER ξ = 0 , IN ASSENZA DI SMORZAMENTO SI HANNO DUE POSSIBILI VALORI
  1) SE ρ < 1 , RISULTA φ = 0 , E IL SISTEMA È IN FASE CON LA FORZANTE ESTERNA
  2) SE ρ > 1 , φ = π QUINDI SI AVRÀ UN RITARDO DI FASE
⇒ PER ξ > 0 L' ANDAMENTO DI φ È CRESCENTE ,
IN PARTICOLARE PER ρ = 1 , IL RITARDO DI FASE È SEMPRE PARI A π/2 INDIPENDENTEMENTE DAL VALORE DI ξ

[NdT: con la sola arctg «principale» per ρ>1 si otterrebbe φ<0; il grafico usa correttamente il ramo φ ∈ (π/2, π).]

---

## PDF p. 217 · pag. stampata — · tipo: manoscritto + appunti battuti
### FRF, COMPLEX GAIN, QUALITY FACTOR

> **Figura:** parete verticale a sinistra; molla «K» in alto e smorzatore «C» in basso collegano la parete a un
> blocco quadrato tra due guide orizzontali (sopra e sotto). Dal blocco freccia verso destra «F(t) = F₀ sin(ωt)»,
> sottolineato con la scritta «GENERICA ARMONICA»; freccia da ω: «PULSAZIONE FORZANTE».

$$ \text{EQ:}\quad m\ddot x + c\dot x + kx = F_0\sin(\omega t) \;\longrightarrow\; x(t) = x_G(t) + x_p(t) $$
$$ \text{C.R.}\quad m\ddot z + c\dot z + kz = F_0 e^{i\omega t} \;\Longrightarrow\; x(t) = Im\{z(t)\} $$
$$ z(t) = z_G(t) + z_p(t) $$
TRASCURANDO LA SOLUZIONE GENERALE : 
$$ z_p(t) = z_0 e^{i\omega t}\ \ (\to \text{PULSAZIONE RISP. PART. = PULSAZIONE FORZANTE}) \qquad \dot z_p(t) = i\omega z_0 e^{i\omega t} \qquad \ddot z_p(t) = -\omega^2 z_0 e^{i\omega t} $$
$$ \Rightarrow \text{EQ:}\ (-m\omega^2 + i\omega c + k)\,z_0 e^{i\omega t} = F_0 e^{i\omega t} $$
$$ \Rightarrow z_0 = \frac{F_0}{-m\omega^2 + i\omega c + k} = \frac{F_0}{p(\lambda)} $$

$$ p(\lambda) = \frac{1}{-m\omega^2 + k + i\omega c} \;\Longrightarrow\; \frac{z_0}{F_0} = \frac{1}{p(\lambda)} = G(i\omega)\ \ \underline{\text{COMPLEX GAIN}} \;\Longrightarrow\; z_0 = F_0\cdot G(i\omega) $$
[NdT: incoerenza: a p. 215 e due righe sopra p(λ) = −mω² + iωc + k (rigidezza dinamica); qui è scritto
p(λ) = 1/(…). Con p(λ) = −mω²+k+iωc vale G(iω) = 1/p(λ), che è la relazione usata subito dopo.]
↳ RAPPORTO TRA LA RISPOSTA E L' INGRESSO ARMONICO , INDICA QUANTO UN SISTEMA AMPLIFICA O ATTENUA LA RISPOSTA A
UNA DATA FREQUENZA E CON QUALE SFASAMENTO

COMPLEX GAIN , IN FUNZIONE DI ξ e ρ
$$ z_0 = \frac{F_0}{-m\omega^2 + i\omega c + k} = |z_0|\,e^{i\alpha} $$
$$ |z_0| = \frac{F_0}{\sqrt{(k - \omega^2 m)^2 + (\omega c)^2}} = F_0\cdot\frac{1}{\sqrt{(k - \omega^2 m)^2 + (\omega c)^2}} $$
(dal secondo fattore, freccia:)
$$ \Big|\frac{1}{p(\lambda)}\Big| = \frac{1/k}{\sqrt{\big(1 - \frac{\omega^2 m}{k}\big)^2 + \big(\frac{\omega c}{k}\big)^2}} = \frac{1/k}{(1 - \rho^2)^2 + \big(\omega\,2\xi\omega_m\frac{m}{k}\big)^2} = \frac{1/k}{\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}} = |G(i\omega)| = \text{GUADAGNO} $$
[NdT: nel termine centrale manca la radice quadrata al denominatore.]

$$ |z_0| = X_0 \to x_p(t) = X_0\sin(\omega t + \alpha) \;\Longrightarrow\; X_0 = F_0\times|G(i\omega)| \qquad \to \alpha = -\varphi = \text{FASE ASSOCIATA AL GUADAGNO COMPLESSO.} $$

GUADAGNO IN FORMA ADIMENSIONALE = FATTORE DI AMPLIFICAZIONE
$$ \frac{X_0}{F_0/k} = \frac{1}{\sqrt{(1 - \rho)^2 + 4\xi^2\rho^2}} = A(\xi,\rho) $$
[NdT: [lettura incerta: «(1−ρ)²»]; deve essere (1−ρ²)², come a p. 215.]

### QUALITY FACTOR

Indica quanto un sistema è risonante, cioè : quanto bene il sistema riesca ad accumulare e restituire energia in
modo oscillatorio, rispetto all' energia che dissipa ad ogni ciclo.

$$ \boxed{Q = \frac{1}{2\xi}} $$

- Q >> 1 , IL SISTEMA SARÀ POCO SMORZATO , QUINDI AVRÀ ALTA RISONANZA , OSCILLAZIONI PERSISTENTI.

**Un sistema con** Q **elevato** è molto "risonante": **oscilla a lungo** dopo una sollecitazione, **con poca
dissipazione di energia.**

**Un sistema con** [spazio vuoto nella fonte: manca il simbolo Q] **basso** è molto smorzato: **dissipa subito
l'energia**, e smette rapidamente di oscillare.

[NdT: la fonte dà Q = 1/(2ξ) senza derivazione e senza condizione; è il valore di A a ρ = 1 (A(1) = 1/(2ξ)) e
coincide con il picco A_max = 1/(2ξ√(1−ξ²)) solo per ξ ≪ 1.]

---

## PDF p. 218 · pag. stampata — · tipo: manoscritto + appunti battuti
### FRF : FREQUENCY RESPONSE FUNCTION

È la funzione che descrive il comportamento dinamico di un sistema lineare soggetto a una forza armonica. Essa
lega l' ingresso (forzante) all' uscita (risposta), nel dominio della frequenza.

$$ FRF(i\omega) = \frac{OUTPUT(i\omega)}{INPUT(i\omega)} $$
→ DIPENDE DAL TIPO DI USCITA CHE OSSERVO : { SPOSTAMENTO × UNITÀ DI FORZA ; VELOCITÀ × UNITÀ DI FORZA ;
ACCELERAZIONE × UNITÀ DI FORZA }
[NdT: «×» va letto «per unità di forza» (rapporto), cioè receptance/mobilità/inertanza.]
↳ SERVE A PREDIRRE LA RISPOSTA DI UN SISTEMA A QUALSIASI ECCITAZIONE ARMONICA E PERMETTE DI CALCOLARE FREQUENZE
NATURALI, FATTORI DI SMORZAMENTO

$$ |FRF(i\omega)| = \frac{1}{\sqrt{(k - \omega^2 m)^2 + (\omega c)^2}} = \text{QUANTO IL SISTEMA ANTICIPA O ATTENUA L' ECCITAZIONE AD UNA DATA FREQUENZA} $$
[NdT: «ANTICIPA» sta presumibilmente per «AMPLIFICA»: il modulo non dà informazioni di anticipo/ritardo.]

$$ \arg(FRF(i\omega)) = \text{arctg}\frac{\omega c}{k - \omega^2 m} = \text{MOSTRA IL RITARDO O L' ANTICIPO CON CUI IL SISTEMA RISPONDE} $$
[NdT: per FRF = 1/(k − ω²m + iωc) l'argomento è −arctg(ωc/(k−ω²m)) (ritardo); la fonte scrive l'angolo di
ritardo φ con segno positivo.]

LABORATORIO : Dato un sistema massa molla smorzatore, soggetto ad una forzante, ad esempio uno shaker che
applichi una nota forza armonica a frequenza controllabile. Collegando un trasduttore ( accelerometro ) sul punto
in cui si vuole misurare la risposta, in questo caso sulla massa, otterremo due segnali nel tempo, ovvero la
forzante e la risposta. Attraverso la trasformata di Fourier converto i segnali dal dominio del tempo a quello
della frequenza ed effettuando il rapporto tra risposta ed ingresso, otterrò l' FRF, il quale modulo rispecchierà
l' ampiezza della risposta per unità di forza e la fase, lo sfasamento tra forza e risposta.
Dall' FRF sarà possibile ricavare le caratteristiche del sistema,e SOPRATTUTO, una volta misurato sarà possibile
sapere come il SISTEMA POSSA REAGIRE A QUALSIASI FREQUENZA, ottenendo un vero e proprio modello dinamico del
sistema, pur non dovendo ricavare per forza le caratteristiche del sistema.

(resto della pagina vuoto)

---

## PDF p. 219 · pag. stampata — · tipo: manoscritto
### ECCITAZIONE DI VINCOLO FORZATA

> **Figura:** a sinistra la base mobile: piastra verticale (con piccoli tratteggi alle estremità superiore e
> inferiore) e assi «y_V» (verticale, verso l'alto) e «x_V» (orizzontale, verso destra) su di essa; sulla
> piastra i punti «A'» (in alto) e «B'» (in basso). Tra A' e il punto «A» del lato sinistro della massa c'è la
> molla «K»; tra B' e il punto «B» lo smorzatore «C». La massa è un blocco rettangolare con baricentro «G» e
> assi «y_G» (verticale) e «x_G» (orizzontale, verso destra), compreso tra due guide prismatiche tratteggiate
> (sopra e sotto). Sopra la molla freccia «F_el» verso destra; sotto lo smorzatore freccia «F_c» verso destra.

SE CONSIDERO UNA BASE MOBILE CHE FA OSCILLARE LA MASSA , CON UNA LEGGE QUALSIASI ASSEGNATA , DUNQUE SE SI MUOVE
LUNGO x , IL PARAMETRO SARÀ $x_V(t) = X_V\sin(\omega t)$ OVVERO LO SPOSTAMENTO DELLA PIATTAFORMA. ALLA BASE È
COLLEGATA UNA SOSPENSIONE ELASTICA MOLLA – SMORZATORE COLLEGATA ALL' ALTRO ESTREMO CON UNA MASSA , VINCOLATA SU
GUIDA PRISMATICA.

IL SISTEMA RISULTA A 2 gdl , 1 DELLA MASSA e 1 DELLA BASE, MA LA BASE È VINCOLATA DA UN VINCOLO MOBILE , PERTANTO
POSSO EFFETTUARE L' EQUILIBRIO ALLA MASSA ⇒ EQ: $F_{in} + F_c + F_{el} = 0$

- $F_{el} = -K\big(\Delta x_A - \Delta x_{A'} + \Delta x^{ST}_{AA'}\big)$ (sopra Δx_A: «= x_G»; sopra Δx_{A'}: «= x_V»)
  FACENDO ATTENZIONE AL FATTO CHE x_G È LETTO NEL SIST. RIF. SOLIDALE AD m e x_V IN QUELLO SOLIDALE ALLA BASE ,
  QUINDI CON DUE SISTEMI DI RIFERIMENTO POSSO FAR COINCIDERE ENTRAMBI GLI SPOSTAMENTI CON DELLE COORDINATE.
- $F_c = -c(\dot x_G - \dot x_V)$

AVENDO POSTO TUTTE LE FORZE POSITIVE AL S.R. AVRÒ : $-m\ddot x_G - c\dot x_G + c\dot x_V - Kx_G + Kx_V - Kx^{ST}_{AA'} = 0$

$$ \Rightarrow m\ddot x_G + c\dot x_G + kx_G = c\dot x_V + kx_V - Kx^{ST}_{AA'} $$
\* IN QUIETE RISULTANO TUTTI NULLI , QUINDI $\Delta x^{ST}_{AA'} = 0$ , IL CHE HA SENSO, PERCHÈ SE NON CI SONO FORZE
LA MOLLA È A RIPOSO

$$ \text{EQ:}\quad \boxed{m\ddot x_G + c\dot x_G + kx_G = c\dot x_V + kx_V} $$

DOVE x_V(t) È ASSEGNATA , AD ESEMPIO $x_V(t) = X_0\sin(\omega t) \Rightarrow \dot x_V(t) = \omega X_0\cos(\omega t) = \omega X_0\sin\big(\omega t + \tfrac{\pi}{2}\big)$
[NdT: qui l'ampiezza della base è chiamata X₀, poco sopra X_V; nel seguito si usa X_V (scritta «xv»).]

QUINDI :

⇒ <u>RISOLUZIONE SENZA IL COMPLEX REPLACEMENT</u> : LA FORZANTE SARÀ COMPOSTA DA 2 SINUSOIDI IN QUADRATURA DI FASE ,
PER CUI SI TROVA UNA SOLUZIONE PER LA PRIMA , UNA PER LA SECONDA E POI SI SOVRAPPONGONO.

1) UNA FORZANTE HA EQUAZIONE DEL TIPO $F(t) = F_0\sin(\omega t + \alpha_F)$ , DUNQUE
$x_V^{(1)}(t) = \underbrace{c\omega X_V}_{F_0}\sin\big(\omega t + \underbrace{\tfrac{\pi}{2}}_{=\alpha_F}\big)$
MENTRE LA SOLUZIONE PARTICOLARE SARÀ DEL TIPO $x^{(1)}_{Gp}(t) = x_G^{(1)}\sin(\omega t + \alpha_F - \varphi)$ ,
DOVE φ SI PUÒ ANCHE CHIAMARE $\varphi = \alpha_{DS}$ (DYNAMIC STYFNESS) , PER TANTO SUPPONENDO DI CONOSCERE
φ(ξ,ρ) e A(ξ,ρ) RISULTERÀ CHE POICHÈ :
$$ \frac{x_G^{(1)}}{F_0/k} = A(\xi,\rho) \Rightarrow x_G^{(1)} = \frac{A(\xi,\rho)\cdot F_0}{K} = \frac{A(\xi,\rho)\cdot c\omega X_V}{K} = \text{MODULO DI } x_G^{(1)} $$
$$ \Rightarrow \text{FASE}\quad \alpha_x = \alpha_F - \alpha_{DS} = \frac{\pi}{2} - \varphi \;\Rightarrow\; x_G^{(1)}(t) = \frac{A(\xi,\rho)\cdot c\omega X_V}{K}\sin\big(\omega t + \tfrac{\pi}{2} - \varphi\big)\ * $$
[NdT: «x_V^{(1)}» indica il primo termine forzante cẋ_V, non uno spostamento della base; analogamente «x_V^{(2)}»
sotto indica kx_V. «STYFNESS» = stiffness.]

2) $x_V^{(2)}(t) = Kx_V\sin(\omega t)$ , QUINDI SE LA FORZANTE SARÀ DEL TIPO $F(t) = F_0\sin(\omega t + \alpha_F) \Rightarrow F_0 = Kx_V;\ \alpha_F = 0$
QUINDI CONOSCENDO A(ξ,ρ) e φ(ξ,ρ) , SAPENDO CHE : $\dfrac{x_G^{(2)}}{F_0/k} = A(\xi,\rho) \Rightarrow x_G^{(2)} = \dfrac{A(\xi,\rho)K\cdot x_V}{K}$
PER IL CALCOLO DELLA FASE : $\alpha_x = \alpha_F - \varphi = -\varphi$ (α_F barrato)
⇒ LA SOLUZIONE PARTICOLARE SARÀ DEL TIPO : $x_G^{(2)}(t) = A(\xi,\rho)\,x_V\sin(\omega t - \varphi)\ *$

⇒ <u>SOVRAPPOSIZIONE DEGLI EFFETTI</u> :
$$ x_G(t) = x_G^{(1)}(t) + x_G^{(2)}(t) = A(\xi,\rho)\,x_V\Big(\frac{c\omega}{K}\cos(\omega t - \varphi) + \sin(\omega t - \varphi)\Big) $$
[Verificato: sin(ωt + π/2 − φ) = cos(ωt − φ); con cω/K = 2ξρ l'ampiezza è A·X_V·√(1+4ξ²ρ²), coerente con p. 220.]

<u>RISOLUZIONE CON IL COMPLEX REPLACEMENT</u> :

$x_V(t) = X_V\sin(\omega t) \to \hat x_V = X_V e^{i\omega t} \Rightarrow \dot{\hat x}_V = i\omega X_V e^{i\omega t}$ , DUNQUE LA FORZANTE ,
CONSIDERANDO LA SOMMA DEI CONTRIBUTI AVRÀ FORMA : $F(t) = X_V e^{i\omega t}(i\omega c + K)$ , e L' EQ. DIFF. DIVIENE :
$m\ddot{\hat x}_G + c\dot{\hat x}_G + K\hat x_G = X_V e^{i\omega t}(i\omega c + K)$ , RISOLVO CON ANSATZ

---

## PDF p. 220 · pag. stampata — · tipo: manoscritto + appunti battuti + grafico da libro (stampato)
### TRASMISSIBILITÀ DI SPOSTAMENTO

POICHÈ $\hat F_0 = x_V(i\omega c + K)$ e $p(i\omega) = -\omega^2 m + i\omega c + K$ , RICAVIAMO IL FATTORE DI AMPLIFICAZIONE
DAL RAPPORTO DEI MODULI DEI NUMERI COMPLESSI

$$ |\hat F_0| = \sqrt{x_V^2\cdot(\omega c)^2 + x_V^2 K^2} = x_V\cdot\sqrt{(c\omega)^2 + K^2} $$
$$ |p(i\omega)| = \sqrt{(K - \omega^2 m)^2 + (c\omega)^2} $$
$$ \Rightarrow |\hat x_G| = \frac{|\hat F_0|}{|p(i\omega)|} = \frac{x_V\sqrt{(c\omega)^2 + K^2}}{\sqrt{(K - \omega^2 m)^2 + (c\omega)^2}}
\;\Rightarrow\; \text{DA CUI RICAVO}\quad \frac{|\hat x_G|}{x_V} = \frac{\sqrt{(c\omega)^2 + K^2}}{\sqrt{(K - \omega^2 m)^2 + (c\omega)^2}} = \frac{\sqrt{1 + 4\xi^2\rho^2}}{\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}} $$
(passaggi a margine, numeratore:) $\Big(\dfrac{c\omega}{K}\Big)^2 + \Big(\dfrac{K}{K}\Big)^2 = \dfrac{(2\xi\omega_m m)^2\omega^2}{K^2} + 1 = \omega^2 4\xi^2\omega_m^2\dfrac{m^2}{K^2} + 1 = 4\xi^2\rho^2 + 1$
(denominatore:) $\Big(1 - \dfrac{\omega^2 m}{K}\Big)^2 + \Big(\dfrac{c\omega}{K}\Big)^2 = (1 - \rho^2)^2 + 4\xi^2\rho^2$

DEF : RAPPORTO TRA L' AMPIEZZA DELLA RISPOSTA DINAMICA DEL SISTEMA e L' AMPIEZZA DEL MOTO DEL VINCOLO . ESSA
QUANTIFICA IL GUADAGNO MECCANICO DEL SISTEMA E CONSENTE DI DISTINGUERE SITUAZIONI IN CUI IL MOTO VIENE AMPLIFICATO
O ATTENUATO , IN FUNZIONE DELLA FREQUENZA DI ECCITAZIONE.

> **Figura (grafico stampato, da libro):** asse verticale «X₀/Y₀» da 0 a 6, asse orizzontale «ρ» da 0 a 3 (tacche
> 0.5, 1, 1.5, 2, 2.5, 3). Legenda: ξ=0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1. Tutte le curve partono
> da 1 a ρ=0, salgono fino a un picco vicino a ρ=1 (ξ=0: asintoto verticale a ρ=1; ξ=0.1: picco ≈5.1; ξ=0.2:
> ≈2.7; ξ=0.3: ≈2.0; …; ξ=1: ≈1.2) e si incrociano tutte nel punto (√2, 1), segnato sull'asse con «√2» e una
> retta verticale; per ρ>√2 sono tutte sotto 1 e decrescono, con le curve a ξ maggiore più alte (ξ=0 la più
> bassa). Retta orizzontale a quota 1. Zone tratteggiate (escluse): sotto la retta 1 per ρ<√2 e sopra la retta
> 1 per ρ>√2. Cerchiati a mano: «①» nella zona ρ<√2 (in alto a sinistra), «②» nella zona ρ>√2 (a destra).
> Riquadro: $\omega_n = \sqrt{k/M} = \sqrt{g/f_s}$, $\rho = \omega/\omega_n$, $\xi = c/(2\sqrt{kM})$.
> (Verifica: T(1) = √(1+4ξ²)/(2ξ) = 5.10 per ξ=0.1; 2.69 per ξ=0.2; 1.94 per ξ=0.3; 1.12 per ξ=1.)

$$ \frac{|\hat x_G|}{x_V} = \frac{\sqrt{1 + 4\xi^2\rho^2}}{\sqrt{(1 + \rho^2)^2 + 4\xi^2\rho^2}} $$
[NdT: refuso: al denominatore (1 − ρ²)², come nella riga sopra; con (1+ρ²)² non ci sarebbe risonanza.]

- ξ = 0 ⟶ IN ASSENZA DI SMORZAMENTO ⇒ $T_R = A = \dfrac{1}{|1 - \rho^2|}$ :
  ρ = 0 → T_R = 1 = CONDIZIONI STATICHE , LA MASSA SI SPOSTA QUANTO IL VINCOLO
  ρ = 1 → T_R → ∞ = CONDIZIONE DI RISONANZA

- ξ > 0 ⟶ RISULTA CHE TUTTE LE CURVE PASSERANNO PER IL PUNTO (√2, 1)
  ① ρ < √2 ⟶ T_R < 1 = ZONA DI ISOLAMENTO
     ↘ T_R > 1 = ZONA DI AMPLIFICAZIONE , DEL MOTO DEL VINCOLO
  ② ρ > √2 ⟶ T_R < 1 = ZONA DI ISOLAMENTO EFFICACE , LA MASSA VIBRA MENO DEL VINCOLO , ESSENDO CHE LO SMORZAMENTO
     LAVORA CONTRO , PIÙ ξ↑ , MINORE SARÀ L' AMPIEZZA CHE TROVO.

[NdT: (a) per 0<ρ<√2 si ha sempre T_R > 1 (per qualunque ξ): la riga «ρ<√2 → T_R<1 = zona di isolamento» è
errata; corretto: ρ<√2 ⇒ amplificazione, ρ>√2 ⇒ isolamento. (b) Nella zona ② è il contrario: a ξ maggiore
corrisponde T_R **maggiore** (le curve a ξ alto stanno sopra, come nel grafico e come nel testo battuto a sinistra
«peggiora le prestazioni in isolamento»). Verificato numericamente: ρ=2, ξ=0.1 → T=0.356; ξ=0.5 → T=0.620. (c) A
ξ=0 la formula vale T_R = 1/|1−ρ²|, e coincide con A solo in quel caso.]

⇒ SE ξ → ∞ ⇒ T_R → 1 (SOSTITUISCO LO SMORZATORE CON UN ASTA RIGIDA)

(testo battuto, colonna sinistra)
- A **bassa frequenza** (ρ ≪ 1) ⇒ la massa segue il supporto ⇒ X₀ ≈ Y₀.
- A **risonanza** (ρ = 1) ⇒ picco massimo ⇒ pericoloso ⇒ da **evitare**!
- A **alta frequenza** (ρ ≫ 1) ⇒ la massa **rimane quasi ferma** ⇒ buon isolamento.
- **Lo smorzamento**:
  - **attenua** il picco in risonanza,
  - **riduce** le vibrazioni trasmesse,
  - ma **peggiora** le prestazioni in isolamento (quando ρ > √2).

(testo battuto, colonna destra, riferito a ξ → ∞)
Vuol dire che **la massa segue perfettamente il movimento del vincolo**. In altre parole:
- Se il supporto (vincolo) si muove con ampiezza Y₀, anche la massa si muove con X₀ ≈ Y₀.
- Il sistema **non amplifica né isola** le vibrazioni ⇒ si comporta come un **blocco rigido**.

[NdT: nel grafico e nel testo battuto l'ampiezza della base è Y₀ e quella della massa X₀; nel manoscritto la base
è x_V (X_V) e la massa x_G: conflitto di notazione. Il picco della trasmissibilità non è a ρ=1 esatto ma a
ρ = √(√(1+8ξ²)−1)/(2ξ) < 1 (≈0.99 per ξ=0.1): la fonte non lo ricava.]

---

## PDF p. 221 · pag. stampata — · tipo: manoscritto + appunti battuti
### FASE INIZIALE :

$$ F(t) = F_0 e^{i\omega t} = x_V(K + ic\omega)e^{i\omega t} \;\Longrightarrow\; \alpha_F = \text{arctg}\frac{x_V c\omega}{x_V K} = \text{arctg}\,2\xi\rho $$
(a margine: $2\xi\omega_m\dfrac{m}{K} = 2\xi\rho$) [NdT: manca il fattore ω: cω/K = 2ξω_m m ω/K = 2ξρ.]
$$ p(i\omega) = -\omega^2 m + i\omega c + K \;\Longrightarrow\; \varphi = \text{arctg}\frac{\omega c}{-\omega^2 m + K} = \text{arctg}\frac{\omega\,2\xi\omega_m\frac{m}{K}}{-\omega^2\frac{m}{K} + 1} = \text{arctg}\frac{2\xi\rho}{1 - \rho^2} $$

⇒ RISULTA CHE ∀ρ α_F < φ (SE ρ<1 L' ARGOMENTO RISULTA POSITIVO , SE ρ>1 L' ARGOMENTO RISULTA NEGATIVO , QUINDI
AGGIUNGO π)
QUINDI ESSENDO α_F < φ ED α_x = α_F − φ ⇒ $\boxed{\alpha_x < 0}$ (∀ρ , QUESTA SARÀ LA FASE INIZIALE DELLA RISPOSTA)
[Verificato: per ρ>0, ξ>0, arctg(2ξρ) < atan2(2ξρ, 1−ρ²) (per ρ<1 perché 1−ρ²<1; per ρ≥1 perché φ ≥ π/2 >
arctg(2ξρ)). Quindi il moto della massa è sempre in ritardo rispetto alla base; per ρ→∞ α_x → −π/2.]

### MOTO RELATIVO :

POSSO SCRIVERE LA VELOCITÀ DELLA MASSA , IN FORMA RELATIVA A QUELLA DELLA BASE MOBILE :
$$ \dot x_G = \dot x_G^R + \dot x_V \;\Longrightarrow\; \ddot x_G = \ddot x_G^R + \ddot x_V \quad \text{(IL MOTO RISULTANDO TRASLATORIO NON HO TERMINI CENTRIPETI o DI CORIOLIS)} $$
DUNQUE SOSTITUENDO NELL' EQUAZIONE DIFFERENZIALE , OTTENGO :
$$ m\ddot x_G^R + m\ddot x_V + c\dot x_G^R + \cancel{c\dot x_V} + Kx_G^R + \cancel{Kx_V} = \cancel{c\dot x_V} + \cancel{Kx_V} \;\Longrightarrow\; m\ddot x_G^R + c\dot x_G^R + Kx_G^R = -m\ddot x_V $$
MA POICHÈ $x_V(t) = X_V\sin(\omega t) \Rightarrow \dot x_V(t) = \omega X_V\cos(\omega t) \Rightarrow \ddot x_V(t) = -\omega^2 X_V\sin(\omega t)$
$$ \Rightarrow \boxed{m\ddot x_G^R + c\dot x_G^R + Kx_G^R = m\omega^2 X_V\sin(\omega t)} $$
(nella fonte i puntini di ẋ_G^R sono scritti sopra la «c»: «ċ x_G^R»)

→ CALCOLO IL FATTORE DI AMPLIFICAZIONE : $A(\xi,\rho) = \dfrac{|x_G^R|}{F_0/K}$ , $F_0 = m\omega^2 X_V \Rightarrow A(\xi,\rho) = \dfrac{|x_G^R|}{\frac{m}{K}\omega^2 X_V} = \dfrac{|x_G^R|}{\rho^2 X_V}$
$$ \Rightarrow \frac{|x_G^R|}{X_V} = A(\xi,\rho)\,\rho^2 = \rho^2\cdot\frac{1}{\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}} $$

> **Figura (grafico a mano):** assi «|x_G^R|/X_V» (verticale) – «ρ» (orizzontale); tacca «1» su entrambi gli
> assi, linea tratteggiata orizzontale a quota 1 e verticale a ρ=1. Curva per ξ=0 = «ρ²/|1−ρ²|»: parte da 0,
> diverge a ρ=1 e, oltre, scende verso 1 dall'alto. Curve smorzate: partono dall'origine, hanno un massimo
> arrotondato vicino a ρ≈1 (più basso al crescere di ξ) e poi tendono a 1 per ρ grande; la più smorzata (a
> tratti) cresce lentamente verso 1 senza picco. Freccia «ξ» verso il basso (al crescere di ξ le curve si
> abbassano). Annotazione: «: ρ = 0 ⇒ |x_G^R|/X_V = 0».
> [NdT: il massimo del moto relativo è a ρ = 1/√(1−2ξ²) ≥ 1 (non ≤1 come per A); verificato con SymPy.]

(testo battuto) Rispetto al caso di forza esterna diretta, l'unica differenza è il **fattore** ρ² davanti. Questo
ha senso fisico: **maggiore è la frequenza**, maggiore è l'accelerazione della base → quindi maggiore è la
risposta.

### TRASMISSIBILITÀ DI FORZE

Ci si chiede quanta forza viene trasmessa a parete, ovvero alla base fissa, nel caso analizzato finora.
É necessario studiare la trasmissione di forze specialmente quando si lavora con carichi smorzati molto elevati,
basta pensare ad un sistema di sospensioni che regge un elevato carico di auto, che in caso di forti
sollecitazioni, come buche o dossi, le sollecitazioni potrebbero essere talmente elevate da rompere i duomi delle
sospensioni o provocare l'uscita del pistone dell' ammortizzatore dall' accoppiamento prismatico.
Quindi l' obiettivo risulta, studiare il sistema ed il modo in cui le forze vengono trasmesse in modo tale da
smorzare nel miglior modo possibile il sistema.
Nel seguente caso, le forze vengono trasmesse a parete, definiamo le grandezze in gioco:

> **Figura:** parete fissa tratteggiata a sinistra con i punti «A'» (in alto) e «B'» (in basso). Da A' parte la
> molla, da B' lo smorzatore; i loro estremi destri sono collegati da un'asta verticale, unita con un'asta
> orizzontale al punto «A» della massa (blocco rettangolare con baricentro «G», tra guide tratteggiate sopra e
> sotto). Forze disegnate: sulla parete «F_el» e «F_c» verso sinistra (forze trasmesse); su A' «F_el» verso
> destra; all'estremo destro della molla «F_el» verso sinistra; su B' «F_c» verso destra; all'estremo destro
> dello smorzatore «F_c» verso sinistra; nel blocco «F_el» e «F_c» verso destra, «F_in» verso destra; dal blocco
> freccia verso destra «F(t) = F₀ sin(ωt)».

$$ F_c = -c(\dot x_A - \underset{\text{FERMO}}{\cancel{\dot x_{A'}}}) = -c\dot x_A = -c\dot x_G \;\Longrightarrow\; \text{QUINDI LA FORZA TRASMESSA AL MURO SARÀ } F(t) = Kx_G + c\dot x_G $$
$$ F_K = -K(x_A - \cancel{x_{A'}} + \cancel{x^{ST}_{AA'}}) = -K\Delta x_A = -Kx_G \qquad \text{e COME FATTO PRECEDENTEMENTE : } F(t) = x_G(K + i\omega c)e^{i\omega t} $$
$$ \Rightarrow F(t) = x_G(K + i\omega c)e^{i\omega t} \;\Longrightarrow\; \text{CON MODULO } |F| = x_G\sqrt{K^2 + (c\omega)^2} $$

PER IL CALCOLO DELLA TRASMISSIBILITÀ DIVIDO L' AMPIEZZA DELLA FORZA TRASMESSA CON L' AMPIEZZA DI QUELLA APPLICATA
[NdT: la stessa lettera F indica sia la forzante F(t) = F₀ sin ωt sia la forza trasmessa al muro F(t) = Kx_G + cẋ_G;
qui x_G = X₀ (ampiezza) nel modulo.]

---

## PDF p. 222 · pag. stampata — · tipo: manoscritto + appunti battuti
### (segue) TRASMISSIBILITÀ DI FORZE

$$ T_R = \frac{|F_i|}{F_0} = \frac{\sqrt{K^2 + (c\omega)^2}}{\sqrt{(-\omega^2 m + K)^2 + (c\omega)^2}} = \frac{\sqrt{1 + 4\xi^2\rho^2}}{\sqrt{(1 + \rho^2)^2 + 4\xi^2\rho^2}} $$
LA TRASMISSIBILITÀ DI FORZE È LA STESSA , MA NON È DI SPOSTAMENTO
[NdT: stesso refuso di p. 220: al denominatore (1 − ρ²)². Verificato con SymPy: |F_T/F₀| = √(1+4ξ²ρ²)/√((1−ρ²)²+4ξ²ρ²),
identica alla trasmissibilità di spostamento. «|F_i|» = ampiezza della forza trasmessa.]

Supponiamo di lavorare in ufficio, con accanto una pressa che batte 120 volte al minuto, che trasmette al
pavimento una forza talmente grande da far spostare ogni oggetto.
Per evitare questo e permettere che la forza trasmessa abbia ampiezza minore della forzante dalla pressa, bisogna
assicurarsi che dal grafico della trasmissibilità, ci si trovi a
$$ \rho > \sqrt2 \;\Longrightarrow\; \rho = \frac{\omega}{\omega_m} = \frac{f}{f_m} \;\Longrightarrow\; \boxed{f_m < \frac{f}{\sqrt2}} $$
COSÌ DA DIMINUIRE LA FREQUENZA NATURALE DEL SISTEMA, RISPETTO ALLA PRESSA
[NdT: la fonte non svolge il conto: 120 colpi/min ⇒ f = 2 Hz ⇒ f_m < 2/√2 ≈ 1.41 Hz.]

(resto della pagina vuoto)

---

## PDF p. 223 · pag. stampata — · tipo: appunti battuti + manoscritto + nota su carta a quadretti (altra grafia)
### VIBRAZIONI PER MASSA ECCENTRICA ROTANTE

> **Figura (incollata):** parete tratteggiata a sinistra; smorzatore «C» in alto e molla «K» in basso collegano
> la parete a uno «Statore» (piastra verticale con alloggiamento circolare a destra), che scorre tra guide
> tratteggiate sopra e sotto. Dentro il cerchio il rotore: dal centro O un raggio verso il punto «P» (massa
> puntiforme) a un angolo «ωt» rispetto all'orizzontale; versore «ê» lungo il raggio; freccia curva «ω» in verso
> antiorario.

Si consideri un elemento statore (massa), che oscilla nella guida prismatica, all' interno del quale è montato un
rotore, in questo caso la massa puntiforme, il quale ruota attorno al centro di massa dello statore.
Il rotore ha un baricentro che risulta eccentrico rispetto al centro di rotazione ( ruota con velocità angolare
costante ) .
Questa eccentricità porta alla nascita di una forza centrifuga, la cui componente lungo x fa oscillare lo statore.

Si assume il rotore, come un punto materiale dotato di massa e distante R dal baricentro dello statore.
La configurazione rappresentata è quella di equilibrio statico, con la massa che è traslata di un certo Xo
rispetto all' origine.

DALLA FORMULA FONDAMENTALE DELLA CINEMATICA :
$$ V_P = V_O + \underline\omega\wedge(P - O) $$
$$ \Rightarrow \text{INTEGRATE:}\quad \begin{cases} x_P = x_O + R\cos\omega t \\ y_P = R\sin\omega t \end{cases} $$

EFFETTUANDO L' EQUILIBRIO LUNGO x : $F_K + F_C + F_{inS} + F_{inR} = 0$
$$ F_K = -K(\Delta x_O + \Delta x^{ST}_{OO'}) = -Kx_O - Kx_O^{ST} $$
$$ F_C = -c(\dot x_O - \underset{=0}{\cancel{\dot x_{O'}}}) = -c\dot x_O $$
$$ F_{inS} = -M_S\cdot\ddot x_O $$
$$ F_{inR} = -M_R\cdot\ddot x_P \;\Longrightarrow\; \text{ESPLICITO } x_P = x_O + R\cos\omega t \Rightarrow \ddot x_P = \ddot x_O - \omega^2 R\cos(\omega t) $$
$$ \Rightarrow \text{EQ:}\quad -Kx_O - Kx_O^{ST} - c\dot x_O - M_S\ddot x_O - M_R(\ddot x_O - \omega^2 R\cos(\omega t)) = 0 $$
$$ \Rightarrow -Kx_O - \underset{=0}{\cancel{Kx_O^{ST}}} - c\dot x_O - \underbrace{(M_S + M_R)}_{M}\ddot x_O + M_R\omega^2 R\cos(\omega t) = 0 $$
$$ \Rightarrow \boxed{M\ddot x_O + c\dot x_O + Kx_O = M_R\omega^2 R\cos(\omega t)} $$

RICAVO IL FATTORE DI AMPLIFICAZIONE
$$ = \frac{|X_O|}{F_0/K} = \frac{|X_O|}{\frac{M_R\omega^2 R}{K}\cdot\frac{M}{M}} = \frac{M|X_O|}{M_R\cdot R\,\rho^2} \;\Longrightarrow\; \frac{M|X_O|}{M_R\cdot R} = \frac{\rho^2}{\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}} $$
$$ \frac{M|X_O|}{M_R\cdot R} = \frac{\rho^2}{\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}} = \text{RAPPORTO TRA L' AMPIEZZA DI OSCILLAZIONE DEL SISTEMA E L' ECCENTRICITÀ CHE L'HA CAUSATA} $$
[Verificato con SymPy, con ω_m² = K/M e ξ = c/(2Mω_m) (M = massa totale). Il rapporto adimensionale è M|X_O|/(M_R R),
non |X_O|/R.]

É la stessa equazione ricavata nel moto relativo dell' eccitazione di vincolo, ed il fatto che tutte le curve, per
ro—>infinito, al variare del fattore di smorzamento csi, tendono ad 1, si chiama AUTOCENTRAMENTO.
L' autocentramento consiste nel fatto che il centro di massa complessivo di rotore e statore , vada a collocare gli
spostamenti sull' asse di rotazione, eliminando le vibrazioni, la lavatrice è un esempio, le vibrazioni sono
appositamente fatte per centrare la massa puntiforme lungo x, nel nostro caso invece c'è un grado di libertà lungo
x che permette al sistema di oscillare.

PER ρ → ∞ : $\dfrac{M|X_O|}{M_R R} = 1$ e $\varphi = \pi$
$$ \text{ALLORA:}\quad \hat X_O = \frac{M_R\cdot R}{M}e^{i(\omega t - \pi)} = -\frac{M_R\cdot R}{M}e^{i\omega t} \;\Longrightarrow\; x_O = -\frac{M_R\cdot R}{M}Re\{\hat X_O\} = -\frac{M_R\cdot R}{M}\cos(\omega t) $$
[NdT: scrittura impropria: è x_O = Re{X̂_O} = −(M_R R/M) cos(ωt); il fattore −M_R R/M non va moltiplicato per Re{X̂_O}.]

CONSIDERANDO IL BARICENTRO DEL SISTEMA COMPLESSIVO , DALLA CONS. DEL MOMENTO STATICO : $x_{GLO} = x_P M_R + x_G M_S$
[NdT: manca la divisione per M: x_GLO = (x_P M_R + x_G M_S)/M, come nella riga seguente; x_G qui è la posizione
dello statore, cioè x_O.]
$$ x_{GLO} = \frac{(M - M_R)\cdot x_O + M_R\cdot x_P}{M} = \frac{(M - M_R)\,x_O\cos(\omega t - \varphi) + M_R(x_O\cos\omega t + R\cos\omega t)}{M} = \frac{(-Mx_O + M_R\cdot R)\cos(\omega t)}{M} $$
[lettura incerta: nel secondo membro «M_R» del primo termine sembra barrato.]
[NdT: in x_P = x_O(t) + R cos ωt lo spostamento dello statore è X_O cos(ωt − φ), non X_O cos ωt. Con φ = π:
x_GLO = [M·X_O cos(ωt−π) + M_R R cos ωt]/M = (−M X_O + M_R R) cos(ωt)/M, che è il risultato finale scritto
(corretto); il passaggio intermedio, preso alla lettera, darebbe un termine spurio 2M_R X_O cos ωt. Verificato.]

MA SE ρ → ∞ ⇒ $\dfrac{M|X_O|}{M_R\cdot R} = 1$ ⇒ $\boxed{x_{GLO} = 0}$ DUNQUE STATORE E ROTORE SI MUOVONO IN MODO TALE
DA TENERE IL BARICENTRO GLOBALE FISSO , COLLOCANDOLO SULL' ASSE DI ROTAZIONE, COSÌ FACENDO IL SISTEMA NON VIBRA.

(nota su carta a quadretti, altra grafia)
Consid. il baricentro G del sistema:
> **Figura:** rettangolo (statore) con il centro «O»; dal centro un segmento inclinato verso un pallino (massa
> rotante); sul segmento, vicino a O, il punto «G» (asterisco) a distanza «m_R E / M» da O; sotto, una quota
> orizzontale «x_G − x_O».

$$ x_G = x_O + \frac{m_R E}{M}\cos(\omega t) = 0 $$
(sotto x_O, con «//» e freccia:) $-\dfrac{m_R E}{M}\cos(\omega t)$

A 2 DOFS → LAVATRICE (CENTRIFUGA)

AUTOCENTRAMENTO: LO STATORE E IL ROTORE SI MUOVONO IN MODO TALE DA MANTENERE L' ASCISSA DI G FISSA → IL BARICENTRO
SI COLLOCA SULL' ASSE DI ROTAZIONE → G DIVENTA CENTRO DI ROTAZIONE

[NdT: nella nota l'eccentricità è «E» e la massa rotante «m_R»; nel resto della pagina l'eccentricità è «R»; qui
«x_G» è il baricentro globale (sopra x_GLO), mentre poco sopra x_G indicava lo statore: conflitto di notazione.]
