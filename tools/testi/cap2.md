# Capitolo 2 — ATTRITO E ADERENZA
Trascrizione della dispensa «MAM TEORIA COMPLETO», **pagine PDF 67–102** (pagine stampate 68–89 e 96–103; da PDF p. 97 in poi le pagine non sono numerate).

## Indice delle sezioni (come nella fonte → pagine PDF)
| Sezione | Pagine PDF |
|---|---|
| Capitolo 2 — ATTRITO E ADERENZA (frontespizio) | 67 |
| 2.1 Introduzione al fenomeno dell'attrito | 67–68 |
| 2.2 Condizioni di aderenza e di attrito (tabella coefficienti $f_d$, $f_s$) | 68–70 |
| 2.2.1 Massa su piano inclinato | 70–71 |
| 2.2.2 Ruota su di un piano | 72–73 |
| 2.2.3 Angolo e cono di aderenza | 73–74 |
| — Applicazione 1 (scala appoggiata al muro) | 75–76 |
| — Applicazione 2 (cuneo) | 77–79 |
| 2.2.4 Impuntamento | 79–81 |
| 2.2.5 Attrito nei meccanismi rotoidali (cerchio di attrito) | 81–83 |
| 2.3 Attrito volvente (resistenza a rotolamento) | 83–84 |
| 2.3.1 Andamento della pressione di contatto in condizioni statiche | 84–86 |
| 2.3.2 Andamento della pressione in condizioni dinamiche (isteresi, parametro $u$, $f_v$, tabella $f_v$) | 86–88 |
| *(§ 2.4 assente: mancano le pagine stampate 90–95)* | — |
| 2.5 Dinamica longitudinale del veicolo | 89 |
| 2.5.1 Accelerazione massima di un autoveicolo — trazione anteriore | 89–90 |
| — trazione posteriore | 91 |
| — Decelerazione massima di un veicolo | 92 |
| 2.6 Dinamica trasversale | 93 |
| 2.6.1 Analisi dinamica di un autoveicolo che percorre una curva (slittamento, ribaltamento) | 93–95 |
| 2.6.2 Analisi dinamica di un motociclo che percorre una curva | 95–96 |
| CUSCINETTI VOLVENTI (senza numero) | 97 |
| CINEMATICA DEI CUSCINETTI | 98 |
| FORZE SCAMBIATE NEI CUSCINETTI | 98–99 |
| ATTRITO NEI CUSCINETTI VOLVENTI RADIALI | 99 |
| DINAMICA LONGITUDINALE DEL VEICOLO / ACCELERAZIONE MASSIMA / TRAZIONE ANTERIORE *(ripetizione di 89–90)* | 100 |
| VEICOLO A TRAZIONE POSTERIORE / CONDIZIONE DI DRUGSTER / DECELERAZIONE MASSIMA *(ripetizione di 91–92, dragster nuovo)* | 101 |
| ANALISI DINAMICA DI UN AUTOVEICOLO CHE PERCORRE UNA CURVA / MOTOCICLO *(ripetizione di 93–96)* | 102 |

## Tipo delle pagine
- PDF 67–96: **LaTeX** (con disegni a mano su foto/schemi, tabelle come immagine a p. 70 e 88, foto decorative a p. 67, 83, 89, 93).
- PDF 97: **appunti battuti** al computer + parti **manoscritte** + figure da **scansione libro** (Fig. 9.22, 9.23 INA-FAG).
- PDF 98–99: **manoscritto** (stampatello) con brevi parti battute e una figura da libro (p. 98).
- PDF 100–102: **manoscritto** con parti battute; sono **ripetizioni** degli argomenti di PDF 89–96 (dinamica longitudinale e trasversale), con notazione diversa ($c_f$, $c_r$, $\mu$, $m$). Unica parte nuova: «condizione di dragster» (p. 101) e la derivazione cinematica di $a=V^2/R$ (p. 102).
- Salto di numerazione stampata: dopo pag. 89 (PDF 88) segue pag. 96 (PDF 89). Il materiale sui cuscinetti volventi (PDF 97–99) sembra sostituire il § 2.4 mancante.

Convenzioni: [NdT: …] = nota del trascrittore (correzioni sospette verificate a mano o con SymPy); testo in MAIUSCOLO = stampatello manoscritto riportato come nella fonte.


## PDF p. 67 · pag. stampata 68 · tipo: LaTeX
# Capitolo 2
# ATTRITO E ADERENZA

[foto: a sinistra una mano che tiene ferma una palla da basket appoggiata; a destra un pick-up che sgomma lasciando tracce curve di pneumatici e fumo sull'asfalto]

### 2.1 Introduzione al fenomeno dell'attrito
Si consideri un corpo di massa $M$ appoggiato su di un piano orizzontale. Su questo corpo, pertanto, agiscono la forza peso $M\vec g$ e la reazione vincolare del piano $\vec F_N$, entrambe dirette verticalmente.

> **Figura:** rettangolo (corpo) appoggiato su una retta orizzontale (piano). Dal punto G al centro del rettangolo parte una freccia verticale verso il basso etichettata «Mg» (sottolineato, vettore). Lungo tutta la base, sotto la linea del piano, una fila di frecce corte uguali dirette verso l'alto (pressioni), con a sinistra l'etichetta «p». Al centro della base una freccia lunga verso l'alto etichettata «F_N» (sottolineato).

Per l'equilibrio statico del corpo in direzione verticale le due forze risultano uguali e opposte:
$$ \vec F_N = -M\vec g $$
La forza $\vec F_N$ è la risultante di tutte le forze infinitesime (pressioni) di contatto, applicate dal piano di appoggio sul corpo attraverso tutta la superficie di

## PDF p. 68 · pag. stampata 69 · tipo: LaTeX
### 2.1 Introduzione al fenomeno dell'attrito (segue)
contatto. Il corpo applica sul piano una distribuzione di forze infinitesime uguali e contrarie.

Si supponga di applicare al vertice sinistro in alto del corpo una forza piccola $\vec F$. Se questa forza è sufficientemente piccola e il corpo non si muove, vuol dire che il corpo rimane in equilibrio statico anche lungo la direzione orizzontale. Pertanto deve esiste una forza orizzontale di contatto uguale e contraria alla forza $\vec F$, definita **forza di aderenza** $\vec F_T$.
$$ \vec F_T = -\vec F $$
L'equilibrio lungo la direzione verticale rimane invariato, tuttavia la forza $\vec F$ genera un momento orario sul corpo. Per garantire l'equilibrio alla rotazione, il punto di applicazione della forza $\vec F_N$ deve necessariamente spostarsi verso destra di una quantità $b$ che può essere calcolata, ad esempio, scrivendo i momenti attorno al punto centrale della superficie di contatto:
$$ F_N b - F h = 0 $$
$$ b = \frac{Fh}{Mg} $$
Questa traslazione della forza $\vec F_N$ verso un estremo della superficie di contatto implica che la distribuzione di pressione presenta valori più alti in quello stesso estremo:

> **Figura:** stesso rettangolo sul piano. In alto a sinistra una freccia orizzontale verso destra, etichettata «F» (sottolineato), applicata allo spigolo superiore sinistro; a sinistra del corpo una quota verticale «h» dalla base allo spigolo superiore. Peso «Mg» verticale verso il basso in G al centro. Sulla base: piccole frecce orizzontali verso sinistra (etichetta «p_T», pressioni tangenziali) e una freccia nera più lunga verso sinistra etichettata «F_Tad» (forza di aderenza) lungo la base; sotto la base frecce verticali verso l'alto di lunghezza crescente da sinistra a destra (distribuzione di pressione trapezia), con etichetta «p_N» a sinistra; la freccia risultante «F_N» verso l'alto è spostata a destra del centro di una quota «b» (quotata orizzontalmente sotto la base, tra la verticale di G e la retta di F_N).

Aumentando sufficientemente la forza $\vec F$, il corpo inizia a muoversi, generando **condizioni di attrito** e non più di aderenza.

### 2.2 Condizioni di aderenza e di attrito
Per studiare i fenomeni fisici di aderenza e attrito, si suppone di effettuare un ingrandimento sulla superficie di contatto fra i due corpi. La superficie di un qualsiasi corpo non è mai perfettamente liscia ed è caratterizzata da un certo grado di rugosità e asperità. Quando due corpi sono a contatto, le asperità che caratterizzano la rugosità delle superfici a contatto si compenetrano fra loro.

## PDF p. 69 · pag. stampata 70 · tipo: LaTeX
### 2.2 Condizioni di aderenza e di attrito (segue)
> **Figura:** rettangolo appoggiato su una retta; un cerchietto evidenzia un punto della superficie di contatto sotto il lato inferiore, collegato con una linea a un ingrandimento sottostante: due profili frastagliati (uno grigio chiaro, la superficie del corpo superiore; uno nero, la superficie del piano) le cui asperità si compenetrano, delimitati lateralmente da linee tratteggiate verticali.

Ricordando l'esempio del paragrafo precedente, quando viene applicata la forza $\vec F$ orizzontale, tra le asperità incastrate tra loro, si generano delle piccole forze di contatto agenti in direzione tangenziale alla superficie di contatto, aventi come risultante la **forza di aderenza** $\vec F_{ad}$. Al crescere della forza $\vec F$, prima o poi si arriva alla rottura o deformazione delle asperità dei due corpi, consentendo un moto relativo con micro usura dei pezzi. Tale fenomeno è definito attrito. La forza di rottura che genera il moto relativo e segna il passaggio da aderenza ad attrito prende il nome di $\vec F_{ad,max}$ ed è pari al prodotto tra forza normale scambiata dai corpi e il coefficiente di aderenza $f_{ad}$, che dipende dalla rugosità dei corpi.
$$ F_{ad,max} = f_{ad} F_N $$
Ricapitolando:
- **condizione di aderenza:** la forza esercitata $\vec F$ non è sufficiente a generare un moto relativo.
$$ F = F_{ad} \le F_{ad,max} = f_{ad} F_N $$
- **condizione di attrito**: la forza esercitata è in grado di generare un moto relativo.
$$ F > f_{ad} F_N $$
La forza di attrito che si genera al contatto è data, in modulo, da
$$ F_{att} = f_{att} F_N $$
dove $f_{att}$ è il coefficiente di attrito che dipende dai materiali a contatto, usura e condizioni delle superfici, ed è minore del coefficiente di aderenza. La forza di attrito ha la stessa direzione ma verso opposto della velocità relativa tra i corpi.

## PDF p. 70 · pag. stampata 71 · tipo: LaTeX (con tabella-immagine)
### 2.2 Condizioni di aderenza e di attrito (segue)
Tabella (immagine), intestazione «Coefficienti di: Attrito — Aderenza»:

| Materiali della coppia | $f_d$ (Attrito) | $f_s$ (Aderenza) |
|---|---|---|
| acciaio / acciaio | 0,1-0,5 | 0,6-0,8 |
| acciaio / bronzo | 0,3 | 0,35 |
| acciaio / alluminio | 0,45 | 0,6 |
| alluminio / alluminio | n.d. | 1,1-1,7 |
| acciaio / ottone | 0,45 | 0,5 |
| acciaio / ghisa | 0,2-0,3 | 0,4 |
| acciaio / rame | 0,3 | 1,0 |
| acciaio / PTFE (teflon) | 0,04-0,07 | 0,15 |
| acciaio / nylon | 0,25-0,40 | 0,4 |
| acciaio / guarnizioni freni | 0,3-0,4 | 0,5 |
| pneumatico / strada | 0,6-0,9 | 0,8-1,1 |

[NdT: nella tabella i coefficienti si chiamano $f_d$ e $f_s$, nel testo $f_{att}$ e $f_{ad}$.]

### 2.2.1 Massa su piano inclinato
Si consideri un corpo di massa $M$, posto su di un piano inclinato di un angolo $\alpha$:

> **Figura:** piano inclinato: retta orizzontale di base e retta inclinata che sale verso sinistra formando l'angolo «α» (arco a sinistra) con l'orizzontale; vertice dell'angolo a destra. Sul piano un rettangolo grigio (corpo) con baricentro G. In alto a sinistra il sistema di riferimento: asse «Y» lungo il piano verso l'alto-sinistra (freccia), asse «X» perpendicolare al piano verso l'alto-destra; freccia curva antioraria con «+» (verso positivo delle rotazioni). Peso «Mg» verticale verso il basso in G; linea tratteggiata verticale da G al punto di contatto. Al punto di contatto: «F_N» perpendicolare al piano (verso l'alto-destra), «F_T» lungo il piano (verso l'alto-sinistra, lato destro del contatto), e risultante «R» verticale verso l'alto; tra F_N e R è indicato l'angolo «α».

Si definisce un sistema di riferimento tangenziale-normale al piano inclinato. Non essendo noto a priori se il corpo scivoli o meno lungo il piano, si consideri prima il sistema in condizioni di aderenza e poi di attrito.

**Condizione di aderenza**
C'è assenza di moto relativo, le forze agenti sul corpo sono: forza peso, forza tangenziale di aderenza e forza normale al piano inclinato. Non essendo noto a priori il verso della forza di aderenza, viene fissato concorde con l'asse $y$ del sistema di riferimento.
Si studia l'equilibrio statico alla traslazione del sistema.
$$ \begin{cases} x: F_N - Mg\cos\alpha = 0 \\ y: F_{ad} - Mg\sin\alpha = 0 \end{cases} $$

## PDF p. 71 · pag. stampata 72 · tipo: LaTeX
### 2.2.1 Massa su piano inclinato (segue)
$$ \begin{cases} x: F_N = Mg\cos\alpha \\ y: F_{ad} = Mg\sin\alpha \end{cases} $$
Applicando la condizione di aderenza:
$$ F_{ad} \le f_{ad} F_N $$
$$ Mg\sin\alpha \le f_{ad} Mg\cos\alpha $$
$$ \tan\alpha \le f_{ad} $$
$$ \alpha \le tan^{-1}(f_{ad}) $$
Si conclude che il corpo non si muove solo e soltanto se l'angolo di inclinazione del piano $\alpha$ non supera il valore dell'arcotangente del coefficiente di aderenza.

**Condizione di attrito** ($\tan\alpha > f_{ad}$)
Il corpo si muove lungo il piano con una certa velocità $\vec v$ verso il basso. Per cui sono noti la direzione (parallela a $\vec v$) e il verso (opposto a $\vec v$) della $\vec F_{att}$.

> **Figura:** stesso piano inclinato e stessi assi X, Y e verso «+» antiorario della figura precedente. Peso «Mg» in G verso il basso; da G una freccia «a» parallela al piano verso il basso-destra (accelerazione); fuori dal corpo, a destra, una freccia grigia chiara «V» parallela al piano verso il basso-destra. Al contatto: «F_N» normale, «F_att» lungo il piano verso l'alto-sinistra, risultante «R» verticale; angolo «α» tra F_N e R.

Poichè il modulo della forza di attrito è necessariamente minore della componente orizzontale della forza peso (per la condizione di attrito) si ha un'accelerazione lungo l'asse $y$:
[NdT: si intende la componente della forza peso parallela al piano ($Mg\sin\alpha$), non «orizzontale»; inoltre $F_{att}=f_{att}Mg\cos\alpha < Mg\sin\alpha$ segue da $f_{att}<f_{ad}<\tan\alpha$.]
$$ \begin{cases} x: F_N - Mg\cos\alpha = 0 \\ y: F_{att} - Mg\sin\alpha = Ma_y \end{cases} $$
$$ \begin{cases} x: F_N = Mg\cos\alpha \\ y: a_y = \frac{F_{att} - Mg\sin\alpha}{M} \end{cases} $$
Sostituendo la condizione di attrito $F_{att} = f_{att}F_N$ nell'espressione dell'accelerazione, si ottiene:
$$ a_y = \frac{(f_{att}Mg\cos\alpha - Mg\sin\alpha)}{M} = g(f_{att}\cos\alpha - \sin\alpha) $$

## PDF p. 72 · pag. stampata 73 · tipo: LaTeX
### 2.2.2 Ruota su di un piano
Si consideri una ruota di massa $M$ e raggio $R$, posizionata su di un piano orizzontale. Se a questa ruota viene applicata una forza $\vec F$ come in figura, la ruota inizia a rotolare con una certa velocità angolare $\omega$.

> **Figura:** cerchio (ruota) appoggiato su una retta orizzontale; centro «G +». Nel punto più alto «P» (punto nero) è applicata una forza orizzontale «F» (sottolineato) diretta verso destra, la cui retta arriva da sinistra tangente alla sommità. In alto a destra freccia curva oraria «ω».

In caso di aderenza nel punto di contatto tra ruota e piano, il moto è detto **rotolamento senza strisciamento**, in caso di attrito il moto è detto **rotolamento con strisciamento.**
Si analizza per primo il caso di rotolamento senza strisciamento, cioè la condizione di aderenza. Sulla ruota agiscono la forza applicata $\vec F$, la forza normale al piano $\vec F_N$ che bilancia la forza peso $M\vec g$, e la forza di aderenza $\vec F_{ad}$ tangente alla ruota e incognita, il cui verso viene ipotizzato concorde con il sistema di riferimento:

> **Figura:** stessa ruota con F orizzontale verso destra in P (sommità) e «ω» oraria. Peso «Mg» verticale verso il basso da G. Al punto di contatto in basso: «F_N» verticale verso l'alto (freccia lunga dal basso) e «F_Tad» orizzontale verso destra lungo il piano. In basso a sinistra sistema di riferimento con origine «O», asse «X» verso destra, asse «Y» verso l'alto e freccia curva antioraria con «+».

Indicando l'accelerazione del centro di massa $a_G$ e l'accelerazione angolare $\ddot\omega$ concordi al sistema di riferimento, e scrivendo le equazioni di equilibrio dinamico alla traslazione orizzontale e alla rotazione intorno al baricentro si ottiene:
[NdT: nel testo è scritto $\ddot\omega$, ma nelle equazioni l'accelerazione angolare è $\dot\omega$ (corretto).]
$$ \begin{cases} F + F_{ad} = Ma_G \\ -FR + F_{ad}R = I_G\dot\omega \end{cases} $$
Si necessita una terza equazione perchè le incognite sono 3. Dal moto di rotolamento senza strisciamento è nota la relazione fra i moduli di $a_g$ e $\dot\omega$:
$$ a_G = -\dot\omega R $$

## PDF p. 73 · pag. stampata 74 · tipo: LaTeX
### 2.2.2 Ruota su di un piano (segue)
Dove il segno meno sta a significare che un' accelerazione lineare positiva ($a_G > 0$) implica un'accelerazione angolare oraria ($\dot\omega < 0$).
Sostituendo si ottiene:
$$ \begin{cases} F_{ad} = -MR\dot\omega - F \\ -FR - MR^2\dot\omega - FR = I_G\dot\omega \end{cases} $$
$$ \begin{cases} F_{ad} = -MR\dot\omega - F \\ -2FR - MR^2\dot\omega = I_G\dot\omega \end{cases} $$
$$ \begin{cases} F_{ad} = -MR\dot\omega - F \\ -2FR = (I_G + MR^2)\dot\omega \end{cases} $$
$$ \begin{cases} F_{ad} = -MR\dot\omega - F \\ \dot\omega = -2F\frac{R}{MR^2 + I_G} \end{cases} $$
Si ottiene:
$$ F_{ad} = F\frac{2MR^2 - MR^2 - I_G}{(MR^2 + I_G)} = F\frac{MR^2 - I_G}{MR^2 + I_G} $$
Applicando la condizione di aderenza:
$$ F_{ad} \le f_{ad}F_N = f_{ad}Mg $$
$$ F \le f_{ad}Mg\frac{MR^2 + I_G}{MR^2 - I_G} $$
Se tale condizione è verificata si il moto è di rotolamento senza strisciamento, in caso contrario si ha strisciamento.
[NdT: verificato con SymPy: il sistema dà $F_{ad}=F(MR^2-I_G)/(MR^2+I_G)$, $\dot\omega=-2FR/(MR^2+I_G)$, $a_G=2FR^2/(MR^2+I_G)$. $F_{ad}>0$ (concorde con $F$) perché $I_G<MR^2$; per un disco omogeneo ($I_G=MR^2/2$) $F_{ad}=F/3$ e la condizione diventa $F\le 3f_{ad}Mg$.]

### 2.2.3 Angolo e cono di aderenza
Si consideri nuovamente il caso del parallelepipedo di massa M appoggiato sul piuano orizzontale. Un metodo alternativo per studiare le condizioni di aderenza e attrito consiste nel calcolare la risultante vettoriale $\vec R$ delle forze $\vec F_N$ ed $\vec F_T$. Tale forza sarà inclinata di un angolo $\alpha$ pari a:
$$ \alpha = \tan^{-1}\left(\frac{F_T}{F_N}\right) $$
Applicando una forza $\vec F$ di intensità crescente, anche $\vec F_T$ aumenta e di conseguenza anche l'angolo $\alpha$, perchè $\vec F_N = -M\vec g$ rimane costante. La condizione limite di aderenza ($F_T = F_{ad,max} = f_{ad}F_N$) si raggiunge quando l'angolo di inclinazione della risultante risulta pari a:
$$ \alpha = \tan^{-1}\left(\frac{F_{ad,max}}{F_N}\right) = \tan^{-1} f_{ad} = \varphi_{ad} $$
Il valore di $\varphi_{ad}$ prende il nome di **angolo di aderenza** e permette di rappresentare graficamente la condizione di aderenza attraverso **il cono di aderenza**:

## PDF p. 74 · pag. stampata 75 · tipo: LaTeX
### 2.2.3 Angolo e cono di aderenza (segue)
> **Figura:** parallelepipedo sul piano orizzontale; forza «F» orizzontale verso destra applicata allo spigolo superiore sinistro, quota «h» (altezza del corpo) a sinistra; peso «Mg» verticale verso il basso in «G». Al punto di contatto (sotto il corpo, un po' a destra del centro) concorrono: «F_Tad» orizzontale verso sinistra lungo la base, «F_N» verticale verso l'alto e la risultante «R» inclinata (proviene dal basso a destra, punta in alto a sinistra) che forma l'angolo «α» con F_N. Dal punto di contatto, verso il basso, due rette grigie simmetriche rispetto alla verticale delimitano il cono di semiapertura «φ_ad» (angolo segnato tra la verticale e la generatrice sinistra). A destra la scritta «CONDIZIONE DI ADERENZA» e, a mano, «α ≤ φ_ad».

Infatti, la condizione di aderenza può essere espressa in funzione dell'angolo di inclinazione della forza risultante di contatto:
$$ \alpha \le \varphi_{ad} = \tan^{-1} f_{ad} $$
In altre parole, la risultante deve essere interna al cono di aderenza per soddisfare la condizione di aderenza.
In condizioni di attrito, l'angolo di inclinazione della risultante $\vec R$ è dato da
$$ \alpha = \tan^{-1}\left(\frac{F_{att}}{F_N}\right) = \tan^{-1} f_{att} = \varphi_{att} $$
Dove l'angolo $\varphi_{att}$ è detto angolo di attrito.

## PDF p. 75 · pag. stampata 76 · tipo: LaTeX
### 2.2.3 Angolo e cono di aderenza — Applicazione 1
**Applicazione 1**
Si consideri un uomo di massa $M$ che si trova su una scala poggiata su di un muro, che forma un angolo $\alpha$ con il pavimento:

> **Figura:** muro verticale a destra e pavimento orizzontale in basso (angolo retto in basso a destra). Una scala (segmento nero spesso con pioli trasversali) va dal pavimento, in basso a sinistra, al muro, in alto a destra. Un uomo (disegno) sta in piedi sulla scala a metà altezza circa; dai suoi piedi una freccia verticale verso il basso «Mg».

Le forze agenti sulla scala sono:
- $\vec F_B$: reazione vincolare del muro
- $\vec F_A$: reazione vincolare del pavimento
- $M\vec g$: forza peso dell'uomo

Ci si interroga sull'equilibrio statico del sistema. Si studiano diversi scenari.
1. Si suppone di avere un coefficiente di aderenza nullo per il punto A $f_{ad,A} = 0$ (cioè sul pavimento non c'è la forza tangenziale, ma solo la reazione normale al piano) e diverso da zero in B $f_{ad,B} \ne 0$.
In queste condizioni, due forze ($\vec F_A$ e $M\vec g$) risultano parallele, mentre $\vec F_B$ può avere solo un'inclinazione massima rispetto all'orizzontale pari a $\varphi_{ad}$, e pertanto l'equilibrio statico non può essere soddisfatto e la scala cade.

> **Figura:** stessa scala; estremo inferiore «A» sul pavimento con scritta «f_ad,A = 0» e retta verticale per A etichettata «DIR F_A»; estremo superiore «B» contro il muro con scritta «f_ad,B ≠ 0». Per B passa una retta orizzontale (normale al muro) e due rette sottili inclinate di «φ_ad» sopra e sotto di essa (cono di aderenza in B, che si apre verso sinistra). Una retta verticale passa per il punto di applicazione di «Mg» (piedi dell'uomo). A destra la scritta «EQUILIBRIO STATICO IMPOSSIBILE».

## PDF p. 76 · pag. stampata 77 · tipo: LaTeX
### 2.2.3 Angolo e cono di aderenza — Applicazione 1 (segue)
2. Si consideri il caso inverso, cioè coefficiente di aderenza (e quindi angolo di aderenza) diverso da zero nel punto A $f_{ad,A} \ne 0$ e nullo in B $f_{ad} = 0$.
In queste condizioni l'equilibrio statico è possibile. Infatti, le direzioni di $\vec F_b$ e $M\vec g$ si intersecano nel punto $P$ e la direzione di $\vec F_A$ è individuata dai punti $A$ e $P$. Se tale direzione giace all'interno del cono di aderenza, allora l'equilibrio statico è garantito e la scala non cade. La direzione $AP$ definisce l'angolo di aderenza minimo richiesto per soddisfare l'equilibrio.
[NdT: «$f_{ad}=0$» sta per $f_{ad,B}=0$; $\vec F_b$ è la $\vec F_B$ dell'elenco precedente.]

> **Figura:** scala da A (pavimento, in basso a sinistra, «f_ad,A ≠ 0») a B (muro, in alto a destra, «f_ad,B = 0»). Per B una retta orizzontale «DIR F_B» (normale al muro, liscio). La verticale per il peso «Mg» dell'uomo incontra la retta di F_B nel punto «P» (in alto, sopra la testa dell'uomo). La retta da A a P, quasi verticale e leggermente inclinata verso destra, è etichettata «DIR F_A». Da A partono due rette sottili simmetriche rispetto alla verticale per A: il cono di aderenza in A di semiapertura «φ_ad» (angolo segnato a sinistra della verticale); la retta AP cade all'interno del cono. Scritta «EQUILIBRIO STATICO POSSIBILE».

3. Nel caso, invece, in cui si ha un coefficiente di aderenza diverso da zero per entrambi i punti di contatto ($f_{ad,A} \ne 0, f_{ad,B} \ne 0$), il sistema risulta iperstatico, cioè risultano infinte possibili condizioni di equilibrio statico. Nel caso in figura, ad esempio, il punto di incontro delle direzioni delle tre forze può essere un punto qualsiasi del segmento CD. Tale segmento individua la zona in cui la direzione della forza peso interseca contemporaneamente i due coni di attrito. Ciascun punto del segmento CD, quindi, costituisce una possibile condizione di equilibrio.
[NdT: qui «coni di attrito» indica i coni di aderenza in A e B (si parla di equilibrio statico).]

> **Figura:** stessa scala con «f_ad,A ≠ 0» in A e «f_ad,B ≠ 0» in B. In A cono di semiapertura «φ_ad,A» attorno alla verticale; in B cono di semiapertura «φ_ad,B» attorno all'orizzontale «DIR F_B» (le due generatrici di B si estendono verso sinistra). La verticale per il peso «Mg» attraversa la regione comune ai due coni lungo il segmento da «C» (in alto, sopra la testa dell'uomo) a «D» (all'altezza del busto). Scritta «Sistema iperstatico: INFINITE POSSIBILI CONDIZIONI DI EQUILIBRIO STATICO».

## PDF p. 77 · pag. stampata 78 · tipo: LaTeX
### 2.2.3 Angolo e cono di aderenza — Applicazione 2
**Applicazione 2**
Si consideri un cuneo (corpo 1) di massa trascurabile a contatto con un corpo 2 di massa $M$. La superficie di contatto tra i due corpi è inclinata di un angolo $\alpha$, come in figura.

> **Figura:** a sinistra una parete verticale fissa (tratteggio a sinistra); in basso un pavimento orizzontale fisso (tratteggio sotto). Il corpo «1» (cuneo, trapezio a contorno nero) è appoggiato alla parete: lato sinistro verticale contro la parete, lato destro inclinato (più largo in alto, più stretto in basso), con freccia «V_1» verticale verso il basso. Il corpo «2» (contorno grigio) poggia sul pavimento; il suo lato sinistro è inclinato e combacia con il lato inclinato del cuneo; l'inclinazione della superficie di contatto rispetto alla verticale è l'angolo «α» (segnato in alto tra una retta verticale e il prolungamento del lato inclinato). Sul lato destro del corpo 2 agisce «F_2» orizzontale verso sinistra.

Si vuole conoscere la forza $\vec F_1$ verticale da applicare al cuneo per mettere in movimento il corpo 2, su cui agisce un carico $\vec F_2$. Si considerano i corpi in movimento (condizioni di attrito) con accelerazioni trascurabili.
Le forze agenti sul corpo 2 sono le seguenti:
- $F_2$: forza resistente sul corpo
- $F_{att,2}$: la forza di attrito fra corpo 2 e piano di appoggio
- $F_{N,2}$: la forza di reazione normale del piano
- $F_{12,N}$: forza perpendicolare alla superficie di contatto, che il cuneo esercita sul corpo 2
- $F_{12,T}$: forza di attrito che si genera tra le due superfici di contatto. Per capire il segno, basta pensare al corpo 1 che si muove verso il basso rispetto al corpo 2, per cui la forza di attrito esercitata sul corpo 1 dal corpo 2 è diretta verso l'alto (opposta al moto relativo di 1 rispetto a 2). Per cui si avrà che $F_{12,T}$ è diretta verso il basso.

## PDF p. 78 · pag. stampata 79 · tipo: LaTeX
### 2.2.3 Angolo e cono di aderenza — Applicazione 2 (segue)
> **Figura:** diagramma di corpo libero del corpo «2» (lato sinistro inclinato come nella figura precedente). Sul lato inclinato, a metà altezza: «F_12,N» freccia perpendicolare alla faccia, proveniente dall'alto a sinistra e diretta verso destra-basso dentro il corpo; «F_12,T» freccia lungo la faccia inclinata diretta verso il basso. A destra «F_2» orizzontale verso sinistra. Al centro «Mg» verticale verso il basso. Sulla base: «F_N2» verticale verso l'alto e «F_TATT2» (attrito col piano) orizzontale verso sinistra.

Dall'equilibrio del corpo 2:
$$ \begin{cases} x: F_{12,N}\cos\alpha - F_{12,T}\sin\alpha - F_{att,2} - F_2 = 0 \\ y: F_{N,2} - Mg - F_{12,N}\sin\alpha - F_{12,T}\cos\alpha = 0 \end{cases} $$
Per le condizioni di attrito sulle due superfici valgono le seguenti relazioni:
$$ F_{att,2} = f'_{att}F_{N,2} $$
$$ F_{12,T} = f''_{att}F_{N,12} $$
dove $f'_{att}$ è il coefficiente d'attrito fra corpo 2 e piano d'appoggio, $f''_{att}$ è il coefficiente d'attrito fra corpo 2 e 1.
[NdT: $F_{N,12}$ è la stessa forza indicata altrove con $F_{12,N}$.]
Sostituendo si ottiene:
$$ \begin{cases} F_{12,N}\cos\alpha - f''_{att}\cdot F_{12,N}\sin\alpha - f'_{att}\cdot F_{N,2} - F_2 = 0 \\ F_{N,2} - Mg - F_{12,N}\sin\alpha - f''_{att}\cdot F_{12,N}\cos\alpha = 0 \end{cases} $$
$$ \begin{cases} F_{N,2} = \frac{F_{12,N}(\cos\alpha - f''_{att}\cdot\sin\alpha) - F_2}{f'_{att}} \\ F_{N,2} = Mg + F_{12,N}(\sin\alpha + f''_{att}\cdot\cos\alpha) \end{cases} $$
Uguagliando e risolvendo per ottenere $F_{12,N}$:
$$ F_{12,N} = \frac{f'_{att}Mg + F_2}{(1 - f'_{att}\cdot f''_{att})\cos\alpha - (f'_{att} + f''_{att})\sin\alpha} $$
[NdT: verificato con SymPy.]
Le forze agenti sul cuneo sono:
- $R_{1,N}$: la reazione vincolare della parete
- $R_{1,T}$: la forza di attrito generata dalla parete
- $F_1$: la forza di azionamento
- $F_{21,N}$: forza normale di contatto che il corpo 2 esercita sul cuneo
- $F_{21,att}$: forza di attrito che si genera con il contatto tra le due superfici. E' opposta a $F_{12,T}$, per cui diretta verso l'alto.

## PDF p. 79 · pag. stampata 80 · tipo: LaTeX
### 2.2.3 Angolo e cono di aderenza — Applicazione 2 (segue)
> **Figura:** diagramma di corpo libero del cuneo «1» (lato sinistro verticale, lato destro inclinato dell'angolo «α» rispetto alla verticale, segnato in alto a destra). «F_1» verticale verso il basso sulla faccia superiore; «R_1N» orizzontale verso destra sulla faccia sinistra; «R_1T» verticale verso l'alto lungo la faccia sinistra; sulla faccia inclinata «F_21,ATT» lungo la faccia verso l'alto e «F_21,N» perpendicolare alla faccia, proveniente dal basso a destra e diretta verso l'alto-sinistra; «V_1» verticale verso il basso (freccia scura sotto il cuneo).

Applicando le equazioni della statica:
$$ \begin{cases} x: R_{1,N} - F_{21,N}\cos\alpha + F_{21,att}\sin\alpha = 0 \\ y: R_{1,T} - F_1 + F_{21,att}\cos\alpha + F_{21,N}\sin\alpha = 0 \end{cases} $$
La condizione di attrito è:
$$ R_{1,T} = f'''_{att}R_{1,N} $$
dove $f'''_{att}$ è il coefficiente di attrito fra il cuneo e la parete verticale.
Sostituendo anche $F_{21,N} = F_{12,N}$ e $F_{21,att} = F_{12,T} = f''_{att}F_{12,N}$ si ottiene che la forza $F$ da applicare per vincere tutte le resistenze al moto è data da:
$$ F_1 = (f'_{att}Mg + F_2)\frac{\cos\alpha\,(f''_{att} + f'''_{att}) + \sin\alpha\,(1 - f''_{att}f'''_{att})}{(1 - f'_{att}\cdot f''_{att})\cos\alpha - (f'_{att} + f''_{att})\sin\alpha} $$
[NdT: verificato con SymPy a partire dai due sistemi. Nel testo «la forza $F$» è la $F_1$.]

### 2.2.4 Impuntamento
Si studia un accoppiamento prismatico. Sul corsoio è applicato un carico $\vec F$ nel centro geometrico del corpo $O$. Si applicare una forza eccentrica $\vec Q$ applicata ad una distanza $e$ dal baricentro, per spostare il corsoio verso l'alto.

## PDF p. 80 · pag. stampata 81 · tipo: LaTeX
### 2.2.4 Impuntamento (segue)
> **Figura:** corsoio rettangolare (grigio) tra due guide verticali fisse (rette nere con tratteggio esterno a sinistra e a destra), con piccolo gioco. Al centro del corsoio, retta d'asse verticale sottile; carico «F» verticale verso il basso applicato al centro. Sulla faccia superiore, spostata a destra dell'asse di una distanza «e» (quotata in alto), la forza «Q» verticale verso l'alto.

Si osserva come le due forze generino una coppia che fa ruotare il corsoio in senso antiorario, vista la presenza di un minimo gioco tra le guide e il corsoio. La rotazione del corsoio genera il contatto in soli 2 punti della guida.
Si studia lo schema di corpo libero del corsoio che si muove verso l'alto con accelerazione trascurabile.

> **Figura:** il corsoio, ruotato leggermente in senso antiorario, tocca la guida sinistra nello spigolo superiore sinistro «A» e la guida destra nello spigolo inferiore destro «B». In A: «F_NA» orizzontale verso destra e «F_TA» verticale verso il basso. In B: «F_NB» orizzontale verso sinistra e «F_TB» verticale verso il basso. «F» verso il basso al centro; «Q» verso l'alto sulla faccia superiore a distanza «e» a destra dell'asse; freccia «V» verso l'alto lungo l'asse (velocità del corsoio). Quote: «h» distanza verticale tra A e B (a destra), «a» distanza orizzontale tra le guide (larghezza, in basso).

In tali condizioni, sul corsoio agiscono le seguenti forze:
- $\vec F$: carico dato
- $\vec Q$: forza necessaria al sollevamento del corsoio

## PDF p. 81 · pag. stampata 82 · tipo: LaTeX
### 2.2.4 Impuntamento (segue)
- $\vec F_{N,B}$: forza normale in B
- $\vec F_{T,B}$: forza di attrito generata dal contatto tra il corsoio e le guide nel punto B. Diretta verso il basso perché il corpo si muove verso l'alto
- $\vec F_{N,A}$: forza normale in A
- $\vec F_{T,A}$: forza di attrito generata dal contatto tra il corsoio e le guide nel punto A, con medesimo verso di $F_{T,B}$

Si studia l'equilibrio del corpo.
$$ \begin{cases} x: F_{N,A} = F_{N,B} \\ y: Q - F - F_{T,A} - F_{T,B} = 0 \\ O: -F_{N,A}\frac h2 - F_{N,B}\frac h2 + F_{T,A}\frac a2 - F_{T,B}\frac a2 + Qe = 0 \end{cases} $$
Combinando le condizioni di attrito e l'equilibrio lungo x si ottiene:
$$ F_{T,A} = f_{att}F_{N,A} = f_{att}F_{N,B} = F_{T,B} $$
e sostituendo:
$$ \begin{cases} F_{N,A} = F_{N,B} = \frac{Q - F}{2f_{att}} \\ -\frac{h}{2f_{att}}(Q - F) + Qe = 0 \end{cases} $$
Risolvendo per ottenere $Q$ si ottiene:
$$ Q = \frac{F}{1 - \frac{2ef_{att}}{h}} $$
Fissato il coefficiente di attrito $f_{att}$, il valore di $Q$ cresce al crescere del rapporto $\frac eh$, fino a tendere ad infinito per $\frac eh \longmapsto \frac{1}{2f_{att}}$. Se il valore della forza $Q$ richiesta è troppo grande il moto non è possibile e questo fenomeno viene detto **impuntamento**, cioè una condizione in cui il corsoio rimane bloccato nella guida. Per evitare l'impuntamento, il valore del rapporto $\frac eh$ deve essere il più piccolo possibile.
[NdT: verificato (momenti rispetto a O, antiorario positivo, A in $(-a/2,h/2)$, B in $(a/2,-h/2)$): i termini d'attrito si elidono e resta $-F_N h + Qe=0$; quindi $Q=F/(1-2ef_{att}/h)$. Per $e/h\ge 1/(2f_{att})$ non esiste $Q>0$ finita.]

### 2.2.5 Attrito nei meccanismi rotoidali
Si consideri un accoppiamento albero-foro (o perno-boccola), con la presenza di gioco tra i due corpi. L'albero, di raggio $R$, risulta caricato con una forza $\vec F$ nel centro geometrico $O$, che lo spinge verso il basso sulle pareti interne del foro. In condizioni statiche, il foro reagisce con una forza normale $\vec R_N$ nel punto di contatto.

> **Figura:** due circonferenze quasi coincidenti: la boccola (circonferenza esterna, con tratteggio di vincolo fisso sul bordo superiore sinistro) e il perno (circonferenza interna, leggermente più piccola, tangente internamente nel punto più basso). Al centro «O» del perno la forza «F» verticale verso il basso; dal punto di contatto in basso la reazione «R_N» verticale verso l'alto.

## PDF p. 82 · pag. stampata 83 · tipo: LaTeX
### 2.2.5 Attrito nei meccanismi rotoidali (segue)
Quando l'albero viene messo in rotazione con una certa velocità angolare $\omega$, il punto $P$ di contatto tra l'albero e il foro è soggetto ad una velocità $\vec{v_P}$. Pertanto si sviluppa una forza di attrito tangenziale $\vec R_T$ di verso opposto alla velocità.

> **Figura:** perno nella boccola (come prima), contatto «P» nel punto più basso. «F» verso il basso in «O»; «ω» freccia curva oraria a destra di O. In P: «V_P» orizzontale verso sinistra (grigio chiaro), «R_Tattr» orizzontale verso destra, «R_N» verticale verso l'alto.

La forza di attrito spinge l'albero verso la parte destra del foro. Per cui il punto $P$ di contatto si sposta verso destra:

> **Figura:** il perno è risalito verso destra: il contatto «P» è ora in basso a destra. «F» verticale verso il basso in «O»; «ω» oraria. Il segmento OP forma con la verticale per O l'angolo «α = φ_att». In P: «V_P» tangente verso il basso-sinistra; «R_Tattr» tangente verso l'alto-destra; «R_N» lungo PO, proveniente dal basso a destra e diretta verso l'alto-sinistra (verso O).

Per l'equilibrio lungo la direzione verticale, la risultante delle due forze di contatto $\vec R_Q$ deve essere verticale e pari al carico $\vec F$. Per questo motivo l'angolo di attrito $\varphi_{att}$ sarà uguale alla pendenza del segmento $\overline{OP}$ rispetto alla direzione verticale.
E' possibile definire il **cerchio di attrito** di raggio $r^* = R\cdot\sin\varphi_{att}$, come la circonferenza di centro $O$, tangente alla risultante della forza di attrito. In questo modo il momento risultante della forza di contatto rispetto ad $O$ è facilmente calcolabile come $R_P\ r^*$.
[NdT: la risultante delle forze di contatto è chiamata $\vec R_Q$ nel testo e $R_P$ (qui e in figura a p. 83); la circonferenza è tangente alla retta d'azione della risultante delle forze di contatto ($\vec R_N+\vec R_T$), non «della forza di attrito». Verifica: $|R_P|=F$, braccio $=R\sin\varphi_{att}$, quindi $M=F R\sin\varphi_{att}$; coincide con $R_T\cdot R = f_{att}R_N R$ perché $R_N=F\cos\varphi_{att}$ e $f_{att}=\tan\varphi_{att}$.]

## PDF p. 83 · pag. stampata 84 · tipo: LaTeX
### 2.2.5 Attrito nei meccanismi rotoidali (segue)
> **Figura:** perno (circonferenza nera, raggio «R») nella boccola (circonferenza grigia esterna, tratteggio di vincolo in alto a sinistra), contatto «P» in basso a destra. Circonferenza grigia concentrica più piccola di raggio «r*» (cerchio d'attrito). «F» verticale verso il basso in «O»; «ω» oraria (freccia sul lato sinistro diretta verso l'alto). Angolo «φ_att» tra la verticale per O e il raggio OP. In P: «R_Tattr» tangente (dal basso-sinistra verso l'alto-destra), «R_N» diretta verso O (dal basso-destra), e la risultante «R_P» verticale verso l'alto (freccia nera spessa), la cui retta d'azione verticale è tangente al cerchio d'attrito (a destra di O).

La principale problematica di questo tipo di accoppiamento è che la superficie di contatto si riduce ad un solo punto. Le forze di contatto e, per aree di contatto minime, le pressioni che si sviluppano possono essere molto elevate. La potenza dissipata per attrito sarà concentrata su un'area molto piccola, con conseguente aumento della temperatura, usura, ecc.

### 2.3 Attrito volvente (resistenza a rotolamento)
Quando una ruota viene poggiata su di un piano, nella realtà, il contatto fra i due corpi non può essere limitato ad un solo punto, perchè altrimenti si svilupperebbero pressioni infinitamente grandi. A causa della deformabilità dei corpi, il contatto si distribuisce su di una superficie o orma di contatto.

[foto: quattro riquadri — pneumatico di auto sgonfio/schiacciato sull'asfalto; ruote gemellate di un mezzo agricolo su terreno; impronta del battistrada di un pneumatico sulla neve/fango; bobina-ruota in plastica nera appoggiata su una rete]

## PDF p. 84 · pag. stampata 85 · tipo: LaTeX
### 2.3 Attrito volvente (resistenza a rotolamento) (segue)
> **Figura:** foto di una ruota con pneumatico e cerchio in acciaio appoggiata su una linea orizzontale (suolo); disegnata sopra, una freccia verticale «N» verso il basso che arriva al mozzo (centro).

### 2.3.1 Andamento della pressione di contatto in condizioni statiche
Si consideri uno pneumatico di raggio $R$ poggiato su strada. Si vuole studiare l'andamento della pressione nell'orma di contatto in condizioni statiche in seguito all'applicazione del carico $\vec N$. La ruota è un corpo deformabile e, supposta omogenea, può essere divisa in settori infinitesimi, ognuno rappresentabile con una molla:

> **Figura:** circonferenza (ruota) appoggiata su una retta orizzontale (suolo); la parte inferiore è appiattita lungo il segmento di contatto da «A» (sinistra) a «B» (destra) con mezzeria «C». Carico «N» verticale verso il basso applicato al centro «O». Dal centro partono molle a zig-zag: tre verso il basso (verso A, C, B) e una verso l'alto a destra, compresa tra due raggi sottili (settore infinitesimo).

Per settori infinitesimi al di fuori dell'orma di contatto, la molla sarà in posizione di riposo, mentre all'interno dell'orma le molle sono deformate, con spostamento massimo nella mezzeria della superficie di contatto. Di conseguenza, il centro $O$ della ruota presenta un'altezza rispetto al suolo pari a $h < R$.

## PDF p. 85 · pag. stampata 86 · tipo: LaTeX
### 2.3.1 Andamento della pressione di contatto in condizioni statiche (segue)
> **Figura:** circonferenza di raggio «R» (raggio disegnato da O verso l'alto a destra) e centro «O»; carico «N» verticale verso il basso in O. Corda orizzontale «A»–«B» (suolo) a distanza «h» sotto O (quota verticale a destra da O al livello di C); «C» è il punto medio della corda, sulla verticale per O. Un raggio da O forma l'angolo «θ» con la verticale e interseca la corda in «E» e la circonferenza indeformata in «D» (sotto la corda); il tratto ED è la deformazione «Δl» della molla in quella posizione. L'arco indeformato A–D–B passa sotto la corda.

L'orma di contatto è definita da un angolo di apertura pari a $2\theta max$, e ogni molla è identificata dalla posizione angolare $\theta$ che varia da $-\theta_{max}$ a $\theta_{max}$, dove $\theta_{max}$ è dato da:
$$ \theta_{max} = \arccos\frac hR $$
In generale l'orma di contatto è piccola e di conseguenza anche $\theta$. Pertanto la deformazione di ogni molla può essere approssimata ai corrispondenti spostamenti verticali:

> **Figura:** come la precedente, ma il segmento circolare tra la corda AB e l'arco indeformato è riempito di tratti verticali (deformazioni approssimate con spostamenti verticali), con l'annotazione «≈ Δl».

Di conseguenza l'andamento della deformazione delle molle segue un arco di circonferenza, simmetrico rispetto alla mezzeria dell'orma di contatto (cioè della verticale passante per il centro). In condizioni statiche, la relazione fra deformazione e pressioni di contatto segue la legge di Hooke: $F_{el} = k\cdot x$, dove $k$ è la costante elastica della molla, espressa in $N/m$ e $x$ è l'allungamento della molla in $m$. La legge di Hooke ha un andamento lineare, cioè all'aumentare di F aumenta l'allungamento. Rimosso il carico, la molla ritorna alle sue condizioni iniziali.

## PDF p. 86 · pag. stampata 87 · tipo: LaTeX
### 2.3.1 Andamento della pressione di contatto in condizioni statiche (segue)
> **Figura:** diagramma F (ordinate) – Δl (ascisse): retta uscente dall'origine con pendenza costante, etichetta «Legge di Hooke».

Per questo motivo le pressioni lungo l'orma di contatto seguono, qualitativamente, lo stesso andamento delle deformazioni, e la direzione della loro risultante, ovvero la reazione normale del suolo, passerà per il centro della ruota.

### 2.3.2 Andamento della pressione in condizioni dinamiche
In condizioni dinamiche, cioè quando la ruota viene messa in rotazione, il discorso è differente per effetto del ciclo di isteresi. Dal punto di vista energetico, nel caso ideale senza ciclo di isteresi il lavoro svolto sulla molla per comprimerla verrebbe interamente restituito nella fase di rilascio. Questo nella realtà non accade, perché a causa di attrito interno del materiale, l'energia necessaria a comprimere la molla è maggiore di quella restituita. Per cui la molla reale segue il cosiddetto **ciclo di isteresi**.

> **Figura (1):** diagramma F – Δl: curva di carico concava verso il basso che parte dall'origine e sale (freccia verso l'alto-destra lungo la curva) fino a una retta verticale che indica la deformazione massima; l'area sotto la curva, tra l'origine e la verticale, è tratteggiata ed etichettata «Energia spesa».
> **Figura (2):** diagramma F – Δl: curva di scarico che dal punto finale della curva di carico (sulla verticale di deformazione massima) scende all'origine restando sotto la retta congiungente (concava verso l'alto), con freccia verso il basso-sinistra; area sottesa tratteggiata «Energia recuperata». È disegnata anche la retta sottile dall'origine al punto finale.

## PDF p. 87 · pag. stampata 88 · tipo: LaTeX
### 2.3.2 Andamento della pressione in condizioni dinamiche (segue)
> **Figura:** diagramma F – Δl con le due curve insieme: carico (sopra, freccia verso destra) e scarico (sotto, freccia verso sinistra) che formano un ciclo chiuso tra l'origine e la verticale di deformazione massima; l'area compresa tra le due curve è tratteggiata, etichetta «Energia dissipata».

La differenza fra energia spesa ed energia restituita è l'energia dissipata per **isteresi.**
Per comprendere come il ciclo di isteresi modifica la distribuzione di pressione, si supponga che la ruota si muova in senso antiorario con velocità $\omega$.

> **Figura (sinistra):** ruota di centro «O» e raggio «R», carico «N» verticale verso il basso in O, «ω» freccia curva antioraria (a sinistra di O). Orma piatta A–B con mezzeria «C»; due punti simmetrici «P_1» (a sinistra di C) e «P_2» (a destra di C), entrambi a distanza «a» da C; in corrispondenza le deformazioni «Δl_1» e «Δl_2» (segmenti verticali dalla corda all'arco indeformato grigio).
> **Figura (destra):** diagramma p (ordinate) – Δl (ascisse) con ciclo di isteresi: ramo «I» superiore (carico/compressione, freccia verso destra) e ramo «II» inferiore (rilascio, freccia verso sinistra), tra l'origine e la verticale di deformazione massima. Una verticale in «Δl_1 = Δl_2» interseca il ramo I alla quota «p_1» e il ramo II alla quota «p_2» < p_1 (segnate sull'asse delle ordinate con linee orizzontali).

Si prendono in esame due punti simmetrici dell'orma di contatto $P_1$ e $P_2$. Per tali punti la deformazione della molla è la medesima ma, a causa del ciclo di isteresi, al medesimo allungamento corrispondono carichi diversi a seconda che il punto si trovi in fase di compressione o rilascio. In particolare la forza elastica del punto $P_1$ sarà maggiore di quella del punto $P_2$. Tale considerazione può essere ripetuta per ogni coppia di punti simmetrici nell'orma di contatto, per cui l'andamento delle pressioni di contatto non sarà simmetrico, ma spostato verso la zona di compressione.
Il risultato di tale fenomeno è che, rispetto al caso statico, la direzione della risultante delle pressioni di contatto $\vec F_N$ si sposta di una quantità $u$ verso la zona di compressione dell'orma di contatto. Tale distanza $u$ prende il nome di **parametro di attrito volvente**.
[NdT: con rotazione antioraria la ruota avanza verso sinistra; la zona di compressione (bordo d'attacco) è quella di sinistra, dove sta $P_1$: coerente con $p_1>p_2$.]

## PDF p. 88 · pag. stampata 89 · tipo: LaTeX (con tabella-immagine)
### 2.3.2 Andamento della pressione in condizioni dinamiche (segue)
> **Figura:** ruota di centro «O» e raggio «R», «ω» antioraria, carico «N» verticale verso il basso in O; orma piatta «A» (sinistra) – «B» (destra). La reazione «F_N» (freccia verticale verso l'alto, spessa) è applicata nell'orma a sinistra della verticale per O, a distanza «u» (quotata) da essa, cioè verso A (zona di compressione).

A causa dell'attrito volvente si genera un momento resistente $F_n\ u$, e affinchè sia soddisfatto l'equilibrio alla rotazione intorno ad $O$, nel caso di ruota folle, è richiesta la presenza di una forza di aderenza al suolo in verso opposto al moto, tale che:
$$ -F_N u + F_{T,ad} h = 0 $$
$$ F_{T,ad} = \frac uR F_N $$
[NdT: dall'equazione dei momenti scritta risulta $F_{T,ad}=\frac{u}{h}F_N$ ($h<R$ è l'altezza del centro dal suolo, p. 84); il risultato $\frac uR F_N$ vale nell'approssimazione $h\simeq R$, che la fonte non dichiara. $F_n$ è la stessa $F_N$.]
La quantità $\frac uR$ rappresenta il **coefficiente di attrito volvente** $f_v$, che dipende dalle caratteristiche elastiche dei materiali a contatto.

Tabella (immagine) «Coeff. di attrito volvente»:

| Elementi della coppia | $f_v$ |
|---|---|
| cuscinetti radiali a sfere | 0,0010 |
| cuscinetti assiali a sfere | 0,0013 |
| cuscinetti a rulli cilindrici | 0,0010-0,0020 |
| Ruota su rotaia (d è il diametro ruota espresso in mm) | $0{,}026/\sqrt d$ |
| Pneumatico autovettura su asfalto | 0,013-0,015 |
| Pneumatico autovettura in fuoristrada | 0,15-0,35 |

## PDF p. 89 · pag. stampata 96 · tipo: LaTeX
[NdT: salto di numerazione stampata da 89 a 96: nella dispensa mancano le pagine stampate 90–95 (verosimilmente il § 2.4, che non compare: si passa da 2.3.2 a 2.5).]
### 2.5 Dinamica longitudinale del veicolo
[foto: muscle car nera (anni '60) in impennata durante una partenza da dragster, ruote anteriori sollevate da terra]

La dinamica longitudinale del veicolo consente di valutare le prestazioni del veicolo in termini di accelerazione, frenata, pendenza massima superabile, consumi, ecc.
Le resistenze al moto di un veicolo presentano componenti differenti:
- **resistenza al rotolamento**
- **resistenza aerodinamica**
- **pendenza della strada**
- **variazione di energia cinetica**

### 2.5.1 Accelerazione massima di un autoveicolo
L'accelerazione di un veicolo, in generale, è massima quando parte da velocità molto bassa, pertanto la resistenza aerodinamica è trascurabile. Anche la resistenza al rotolamento è trascurabile perchè $f_v << f_{ade}$.

**Veicolo a trazione anteriore**
Si consideri un autoveicolo a trazione anteriore, in cui la coppia motrice è applicata alle ruote anteriori. Sull'auto agiscono:
- $M\vec g$: forza peso
- $\vec F_{N,A}$: forza normale che il suolo esercita sulla ruota anteriore
- $\vec F_{N,B}$: forza normale che il suolo esercita sulla ruota posteriore
- $\vec F_{T,A}$: forza di aderenza che si crea tra suolo e pneumatico anteriore, per effetto della coppia motrice applicata sulla ruota. Infatti, tale forza nasce per l'equilibrio alla rotazione della ruota intorno al proprio asse.
- $\vec F_{in} = -M\vec a$: forza di inerzia

## PDF p. 90 · pag. stampata 97 · tipo: LaTeX
### 2.5.1 Accelerazione massima di un autoveicolo — Veicolo a trazione anteriore (segue)
> **Figura:** foto di un'auto (monovolume) vista di fianco, muso a sinistra, su una retta orizzontale (suolo). In alto a sinistra frecce «V» e «a» orizzontali verso sinistra (verso del moto). Baricentro «G» (punto nero) ad altezza «h» dal suolo (quota verticale a destra dell'auto); da G: «Mg» verticale verso il basso e «Ma» orizzontale verso destra (forza d'inerzia). «C_m» (coppia motrice) scritto sulla ruota anteriore. Ruota anteriore con contatto «A»: «F_NA» verticale verso l'alto e «F_TA» orizzontale verso sinistra (verso del moto). Ruota posteriore con contatto «B»: «F_NB» verticale verso l'alto. Quote orizzontali: «l_1» da A alla verticale di G, «l_2» dalla verticale di G a B.

Si scrivono le equazioni della dinamica:
$$ \begin{cases} x: F_{T,A} - Ma = 0 \\ y: F_{N,A} + F_{N,B} - Mg = 0 \\ B: -F_{N,A}\cdot(l_1 + l_2) + Mg\cdot l_2 - Ma\cdot h = 0 \end{cases} $$
Dalla prima e terza equazione si ricava:
$$ \begin{cases} F_{T,A} = Ma \\ F_{N,A} = M\frac{gl_2 - ah}{l_1 + l_2} \end{cases} $$
La condizione di aderenza è:
$$ F_{T,A} \le f_{ad}F_{N,A} $$
L'accelerazione massima del veicolo corrisponde alla condizione di $F_{T,A}$ massima, detta condizione di incipiente slittamento. Per cui:
$$ F_{T,A,max} = f_{ad}F_{N,A} $$
Sostituendo:
$$ Ma_{max} = f_{ad}M\frac{gl_2 - a_{max}h}{l_1 + l_2} $$
$$ a_{max} = f_{ad}\ g\frac{l_2}{l_1 + l_2 + f_{ad}\cdot h} $$
[NdT: verificato con SymPy.]
La coppia che il motore deve applicare alla ruota anteriore per ottenere tale accelerazione è:
$$ C_m = F_{T,A}R = Ma_{max}R $$
dove $R$ è il raggio della ruota.

## PDF p. 91 · pag. stampata 98 · tipo: LaTeX
### 2.5.1 Accelerazione massima di un autoveicolo — Veicolo a trazione posteriore
**Veicolo a trazione posteriore**
Si consideri ora un veicolo a trazione posteriore. Per cui la forza tangenziale di aderenza, che equilibra la forza di inerzia, è posizionata in corrispondenza della ruota posteriore.

> **Figura:** stessa auto e stesse quote della figura precedente («V», «a» verso sinistra; «G» ad altezza «h»; «Mg» verso il basso, «Ma» verso destra in G; «l_1» da A a G, «l_2» da G a B). Ora «C_m» è scritto sulla ruota posteriore e la forza «F_TB» orizzontale verso sinistra è applicata al contatto posteriore «B»; «F_NA» e «F_NB» verticali verso l'alto in A e B.

Svolgendo i medesimi passaggi del caso precedente, con la differenza di scrivere l'equilibrio alla rotazione attorno al punto A, si ottiene:
$$ a_{max} = f_{ad}\ g\frac{l_2}{l_1 + l_2 - hf_{ad}} $$
[NdT: errore nella fonte. Momenti rispetto ad A: $F_{N,B}(l_1+l_2) - Mg\,l_1 - Ma\,h = 0 \Rightarrow F_{N,B}=M\frac{gl_1+ah}{l_1+l_2}$; con $Ma=f_{ad}F_{N,B}$ si ottiene $a_{max}=f_{ad}\,g\,\frac{l_1}{l_1+l_2-hf_{ad}}$ (numeratore $l_1$, distanza del baricentro dall'asse **anteriore**, non $l_2$). Verificato con SymPy. Il confronto «posteriore > anteriore» che segue vale a parità di ripartizione statica ($l_1=l_2$) o, in generale, solo se $l_1(L+f h) > l_2(L-f h)$.]
L'accelerazione massima ottenibile per un veicolo a trazione posteriore è maggiore rispetto a quella ottenibile con un veicolo a trazione anteriore, per effetto del segno del termine $hf_{ad}$. In realtà, tale termine deriva dal momento generato dalla forza di inerzia che carica l'assale posteriore e scarica quello anteriore, con la conseguenza che $F_{N,B} > F_{N,A}$. In questo modo, a parità di condizioni di incipiente slittamento, la forza tangenziale generabile sul posteriore è maggiore rispetto a quella generabile sull'anteriore, risultando in una maggiore accelerazione massima $a_{max}$.
[NdT: «$F_{N,B} > F_{N,A}$» è vero solo se la ripartizione statica non è già fortemente sbilanciata sull'anteriore; in generale l'accelerazione aumenta $F_{N,B}$ e riduce $F_{N,A}$ della stessa quantità $Mah/(l_1+l_2)$.]

## PDF p. 92 · pag. stampata 99 · tipo: LaTeX
### 2.5.1 — Decelerazione massima di un veicolo
**Decelerazione massima di un veicolo**
Si vuole calcolare la decelerazione massima di un veicolo che si muove in avanti con una certa velocità $v$.

> **Figura:** stessa auto (muso a sinistra), «V» orizzontale verso sinistra, «a» orizzontale verso destra (decelerazione). In «G» (altezza «h»): «Mg» verso il basso e «Ma» orizzontale verso sinistra (inerzia, in avanti). Coppie frenanti «C_fa» sulla ruota anteriore e «C_fp» sulla posteriore (frecce curve). Contatto anteriore «A»: «F_NA» verso l'alto, «F_TA» orizzontale verso destra. Contatto posteriore «B»: «F_NB» verso l'alto, «F_TB» orizzontale verso destra. Quote «l_1» (A–G) e «l_2» (G–B).

Poiché i freni sono posizionati su tutte e 4 le ruote del veicolo, la coppia frenante è ripartita su entrambi gli assali, risultando in due forze tangenziali $F_{T,A}$ e $F_{T,B}$, che bilanicano le rispettive coppie frenanti alla rotazione delle ruote anteriori e posteriori rispettivamente.
Dalla prima equazione della dinamica:
$$ \begin{cases} x: -F_{T,A} - F_{T,B} + Ma = 0 \\ y: F_{N,A} + F_{N,B} - M\cdot g = 0 \end{cases} $$
La decelerazione massima si ottiene in condizioni di incipiente slittamento su entrambi gli assali:
$$ F_{T,A} = f_{ad}\cdot F_{N,A} $$
$$ F_{T,B} = f_{ad}\cdot F_{N,B} $$
Sommando membro a membro:
$$ F_{T,A} + F_{T,B} = f_{ad}\cdot(F_{N,A} + F_{N,B}) $$
Quindi:
$$ a_{max} = f_{ad}g $$
Pertanto, se la frenata è ripartita correttamente fra anteriore e posteriore, la decelerazione massima è funzione solo di $f_{ad}$.
[NdT: qui la fonte non scrive l'equazione dei momenti né le singole $F_{N,A}$, $F_{N,B}$: il risultato non dipende dal trasferimento di carico perché si usa solo la somma. La ripartizione «corretta» richiesta è $F_{T,A}/F_{T,B}=F_{N,A}/F_{N,B}=(gl_2+ah)/(gl_1-ah)$ con $a=f_{ad}g$ (calcolo SymPy, momenti rispetto ai contatti).]

## PDF p. 93 · pag. stampata 100 · tipo: LaTeX
### 2.6 Dinamica trasversale
[foto: monoposto di Formula 1 in curva, vista dall'alto di tre quarti, su cordolo bianco e rosso]

Per **dinamica trasversale** si intende lo studio delle forze laterali del veicolo. Le forze laterali a cui può essere soggetto un veicolo sono legate soprattutto alla forza centrifuga in tratti non rettilinei.

### 2.6.1 Analisi dinamica di un autoveicolo che percorre una curva
Si studia il comportamento di un veicolo mentre percorre velocità $v$ costante una traiettoria curvilinea con raggio di curvatura $R$:

> **Figura:** foto aerea di una rotatoria con auto e un autobus. Disegnati sopra: una circonferenza bianca (traiettoria) con centro «C» (punto) e raggio «R» (segmento dal centro verso il basso a destra); su un veicolo a sinistra della rotatoria una freccia «v» verticale verso l'alto (tangente alla traiettoria) e una freccia «a» orizzontale verso destra (verso il centro, accelerazione centripeta).

Il veicolo è soggetto ad una accelerazione centripeta e di conseguenza la corrispondente forza di inerzia, detta forza centrifuga, spinge il veicolo verso l'esterno della curva. Studiando l'equilibrio del sistema, è semplice comprendere

## PDF p. 94 · pag. stampata 101 · tipo: LaTeX
### 2.6.1 Analisi dinamica di un autoveicolo che percorre una curva (segue)
come tale forza deve essere bilanciata dalle forze che il suolo applica sulle ruote del veicolo:

> **Figura:** auto vista da dietro (disegno). Baricentro «G» ad altezza «h» dal suolo (quota a sinistra). In G: «Mv²/R» orizzontale verso sinistra (forza centrifuga; la curva è a destra) e «Mg» verticale verso il basso. Contatto ruota sinistra «A»: «F_NS» verticale verso l'alto e «F_TS» orizzontale verso destra. Contatto ruota destra «B»: «F_ND» verticale verso l'alto e «F_TD» orizzontale verso destra. Quota «c» (carreggiata) tra A e B, in basso.

Dalla prima equazione della dinamica:
$$ \begin{cases} y: F_{TD} + F_{TS} = \frac{Mv^2}{R} \\ z: F_{ND} + F_{NS} = Mg \end{cases} $$
Tali equazioni presentano 4 incognite $F_{TD}, F_{TS}, F_{ND}, F_{NS}$, quindi non è possibile ricavare la soluzione attraverso le equazioni cardinali della dinamica. Tuttavia, imponendo le condizioni laterali di incipiente slittamento, è possibile calcolare la condizione limite di velocità massima:
$$ \begin{cases} F_{TD} = f_{ad}F_{ND} \\ F_{TS} = f_{ad}F_{NS} \end{cases} $$
Sommando membro a membro:
$$ F_{TS} + F_{TD} = f_{ad}(F_{NS} + F_{ND}) $$
$$ \frac{Mv_{max}^2}{R} = f_{ad}Mg $$
La velocità massima al di sopra della quale si ottiene slittamento laterale é:
$$ v_{max} = \sqrt{f_{ad}\ g\ R} $$
Un'altra condizione limite, oltre quella di slittamento, è quella di ribaltamento. La condizione di incipiente ribaltamento, nel caso di una curva a destra come nel caso in esame, è $F_{ND} = 0$.
Si ottiene l'espressione di $F_{ND}$ dall'equilibrio alla rotazione del veicolo intorno ad A:
$$ F_{ND}\ c + \frac{Mv^2}{R_v}h - Mg\frac c2 = 0 $$
[NdT: $R_v$ è lo stesso raggio di curvatura $R$. Il baricentro è supposto a metà carreggiata (braccio $c/2$ del peso), ipotesi implicita nella figura. Equazione verificata (momenti rispetto ad A, antiorario positivo).]

## PDF p. 95 · pag. stampata 102 · tipo: LaTeX
### 2.6.1 Analisi dinamica di un autoveicolo che percorre una curva (segue)
$$ F_{ND} = \frac{Mg}{2} - \frac{Mv^2h}{Rc} $$
Imponendo la condizione di incipiente ribaltamento, si ottiene:
$$ \frac{Mg}{2} - \frac{Mv_{max}^2h}{Rc} = 0 $$
$$ v_{max} = \sqrt{\frac{R\ c\ g}{2h}} $$
All'aumentare del rapporto geometrico $\frac ch$ è possibile ottenere delle velocità massime più alte. Infatti le macchine da Formula 1 hanno il baricentro basso e quindi una velocità massima di ribaltamento più alta, mentre i camion, avendo un baricentro più alto, hanno una velocità di ribaltamento più bassa.
[NdT: la fonte ricava solo $F_{ND}$; per l'equilibrio verticale $F_{NS}=\frac{Mg}{2}+\frac{Mv^2h}{Rc}$. Il ribaltamento precede lo slittamento se $\frac{c}{2h}<f_{ad}$, confronto che la fonte non scrive.]

### 2.6.2 Analisi dinamica di un motociclo che percorre una curva
Si consideri un motociclo che percorre una curva di raggio $R$ a velocità costante $v$ formando un angolo rispetto alla verticale pari ad $\alpha$.

> **Figura:** foto frontale di un motociclista in piega (inclinato verso destra rispetto all'osservatore). Disegnati sopra: una retta verticale e una retta inclinata passanti per il punto di contatto «P» (in basso a sinistra) e per il baricentro; l'angolo «α» tra verticale e retta inclinata è segnato in alto. Al baricentro: «Mv²/R» orizzontale verso sinistra e «Mg» verticale verso il basso. In P: «F_Tad» orizzontale verso destra e «F_N» verticale verso l'alto.

Sul veicolo agiscono forze solo in due punti: il baricentro G e il punto di contatto col suolo P. Pertanto, le risultanti delle forze devono essere dirette lungo la retta passante per i due punti per soddisfare l'equilibrio alla rotazione.
Quindi:

## PDF p. 96 · pag. stampata 103 · tipo: LaTeX
### 2.6.2 Analisi dinamica di un motociclo che percorre una curva (segue)
> **Figura (sinistra):** triangolo delle forze: «Mg» verticale verso il basso (lato sinistro), «Mv²/R» orizzontale verso sinistra (lato superiore, dall'estremo superiore destro verso sinistra), «F_P» ipotenusa inclinata (dal basso-sinistra verso l'alto-destra); angolo «α» tra Mg e F_P (al vertice inferiore).
> **Figura (destra):** triangolo delle reazioni: «F_N» verticale verso l'alto (lato sinistro), «F_Tad» orizzontale verso destra (lato superiore), «F_P» ipotenusa dal vertice inferiore verso l'alto-destra; angolo «α» tra F_N e F_P.

$$ \tan\alpha = \frac{\frac{Mv^2}{R}}{Mg} $$
$$ \tan\alpha = \frac{v^2}{g\cdot R} $$
L'angolo di piega $\alpha$, come visto, è anche l'angolo di inclinazione della risultante delle forza di contatto. Ne consegue che, affinché la ruota non slitti, l'angolo $\alpha$ deve essere minore dell'angolo di aderenza $\varphi_{ad}$. La condizione di incipiente slittamento è:
$$ \alpha = \varphi_{ad} $$
La condizione limite di velocità massima affinchè non si abbia slittamento è:
$$ \tan\alpha = \frac{v_{max}^2}{R\ g} = \tan\varphi_{ad} = f_{ad} $$
$$ v_{max} = \sqrt{f_{ad}\ g\ R_v} $$
Si osserva come la velocità massima con cui la moto deve viaggiare per non ottenere slittamento sia la medesima dell'autoveicolo.

## PDF p. 97 · pag. stampata — · tipo: appunti battuti + manoscritto (con figure da libro)
[NdT: da qui il formato della pagina cambia (pagine più piccole, testo battuto al computer e parti scritte a mano in stampatello). Il titolo è manoscritto. Questo materiale non ha numero di sezione; per collocazione corrisponde al § 2.4 mancante (pag. stampate 90–95).]
### CUSCINETTI VOLVENTI
Per rimediare all' attrito tra le coppie cinematiche si è arrivati allo sviluppo di una vasta famiglia di componenti meccanici, detti **cuscinetti volventi**.
In genere vengono utilizzati per ridurre l' attrito in un accoppiamento albero-foro e, di conseguenza, le perdite energetiche e l' usura relativa tra le due componenti.
Un cuscinetto è costituitit0 da un anello interni solidale all' albero e da un anello esterno solidale al foro, generalmente vincolato al telaio .
Tra i due anelli sono posti gli elementi volventi, ovvero sfere, rulli, rulli conici, il rotolamento degli elementi volventi permette una rotazione relativa tra i membri solidali all' anello interno e quelli solidali all' anello esterno.
Gli elementi volventi sono equidistanziati attraverso una gabbia distanziatrice, che permette una migliore distribuzione del carico.
Oltre ad un attrito molto basso, i cuscinetti volventi presentano il vantaggio di un' elevata regolarità , infatti il coefficiente di attrito volvente può essere considerato indipendente da fattori quali il carico e la velocità, al contrario di quando accade nei cuscinetti radenti.

> **Figura (scansione libro):** a sinistra vista frontale di un cuscinetto radiale a sfere: anello esterno (corona circolare tratteggiata esterna), anello interno (corona tratteggiata interna), 12 sfere («elemento volvente») equispaziate tra i due anelli, tenute dalla «gabbia distanziatrice» (anello sottile che passa per i centri delle sfere); assi tratto-punto orizzontale e verticale. A destra la sezione assiale dello stesso cuscinetto: due sezioni (sopra e sotto l'asse) con anello esterno e interno tratteggiati e una sfera in ciascuna, con asse orizzontale tratto-punto.

*(manoscritto)* I cuscinetti volventi si dividono in base alla direzione preferenziale del carico:
- RADIALI: sopportano forze dirette in modo ortogonale all' asse di rotazione dell' albero
- ASSIALI: sopportano forze dirette lungo l' asse di rotazione
- OBLIQUI: sopportano forze con entrambe le componenti

> **Figura (scansione libro, sinistra):** foto di cuscinetti. «Figura 9.22 Esempi di cuscinetti a sfere: (a) radiale; (b) assiale; (c) obliquo; (d) radiale orientabile a due corone (da "INA-FAG catalogue 2012-02")». «Figura 9.23 Esempi di cuscinetti a rulli: (a) radiale; (b) obliquo a rulli conici; (c) radiale orientabile a due corone; (d) gabbia a rullini radiale (da "INA-FAG catalogue 2012-02")».
> **Figura (scansione libro, destra):** tre sezioni assiali schematiche con albero, supporto tratteggiato e sfere: «Cuscinetti radiali (portanti)» con forza «F_r» radiale (verticale) sull'albero; «Cuscinetti assiali (reggispinta)» con due forze «F_a» assiali (orizzontali) e sfere tra due ralle; «Cuscinetti obliqui» con forza «F» inclinata scomposta in «F_a» (assiale) e «F_r» (radiale), retta di contatto inclinata attraverso le sfere.

*(manoscritto)* → In generale quelli assiali sono montati insieme a quelli obliqui, per contrastare i carichi assiali in un solo verso, e quindi montati con orientazione opposta per garantire un' azione simmetrica.
[NdT: frase così com'è scritta; il senso tecnico usuale è che i cuscinetti obliqui (e assiali) reggono il carico assiale in un solo verso e perciò si montano a coppie contrapposte.]

## PDF p. 98 · pag. stampata — · tipo: manoscritto (con testo battuto e figura da libro)
### CINEMATICA DEI CUSCINETTI
> **Figura (manoscritta):** cuscinetto in vista frontale: centro «Ω», anello interno (corona grigia interna) e anello esterno (corona grigia esterna). Raggi tracciati da Ω: «R_i» (fino alla pista interna), «R_G» (fino al centro di un elemento volvente), «R_e» (orizzontale, fino alla pista esterna). In alto un elemento volvente di centro «G» e raggio «r» (tratteggio verticale da G a E), con punto di contatto «E» sulla pista esterna (sopra) e «I» sulla pista interna (sotto); freccia curva «ω_v» a sinistra della sfera (rotazione propria); altre sfere collegate dalla gabbia lungo la circonferenza dei centri, con freccia curva «ω_g» (rotazione della gabbia) e una piccola freccia «Ω» [lettura incerta] lungo la gabbia.

ANELLO INTERNO RUOTA A VELOCITÀ $\omega_i$, QUELLO ESTERNO $\omega_e$
$$ \Rightarrow \begin{cases} V_E = \omega_e R_e \\ V_I = \omega_i R_i \end{cases} $$
CONSIDERO I PUNTI E ed I ∈ C.R.
[NdT: «C.R.» = verosimilmente «corpo rigido» (E e I come punti dell'elemento volvente, a cui si applica la formula delle velocità del corpo rigido).]
$$ V_E = V_G + \omega_v \wedge \overbrace{(E - G)}^{r\hat j} $$
$$ V_I = V_G + \omega_v \wedge \overbrace{(I - G)}^{-r\hat j} $$
$$ \Rightarrow V_E + V_I = 2V_G + \omega_v \wedge \big(\underbrace{(E-G) + (I-G)}_{r\hat j\ +\ (-r\hat j)\ =\ 0}\big) \Rightarrow \boxed{V_G = \frac{V_E + V_I}{2}} $$
CALCOLO LA $\omega_G$ [lettura incerta: pedice G o v] : $\quad V_E - V_I = \omega_v \wedge \big(\overbrace{(E-G) - (I-G)}^{2r\hat j}\big)$
$$ \Rightarrow \boxed{\omega_v = \frac{V_E - V_I}{(E - I)} = \frac{\omega_e R_e - \omega_i R_i}{R_e - R_i}} \quad \text{VELOCITÀ DI ROTAZIONE DELL' ELEMENTO VOLVENTE} $$
[NdT: la «divisione per $(E-I)$» è da intendere tra moduli ($|E-I|=2r=R_e-R_i$); con $\omega_v$ lungo $\hat k$ si ha $\omega_v\hat k\wedge 2r\hat j=-2r\omega_v\hat i$, quindi il verso di $\omega_v$ dipende dalla convenzione sui segni di $V_E,V_I$. La quantità calcolata è $\omega_v$ (non $\omega_G$).]

CALCOLO VELOCITÀ ANGOLARE GABBIA
$$ V_E = \cancel{V_\Omega}^{\,0} + \omega_e \wedge (E - \Omega) $$
$$ V_I = \cancel{V_\Omega}^{\,0} + \omega_i \wedge (I - \Omega) $$
$$ \Rightarrow V_E + V_I = 2V_G $$
$$ \omega_e \wedge R_e\hat j + \omega_i \wedge R_i\hat j = \omega_g \wedge R_g\hat j $$
$$ \Rightarrow \boxed{\omega_g = \frac{\omega_e R_e + \omega_i R_i}{2R_g}} \Rightarrow R_g = \frac{R_e + R_i}{2} \Rightarrow \boxed{\omega_g = \frac{\omega_e R_e + \omega_i R_i}{R_e + R_i}} \quad \text{VELOCITÀ DI ROTAZIONE DELLA GABBIA} $$
[NdT: nella riga intermedia manca il fattore 2 a secondo membro: da $V_E+V_I=2V_G$ e $V_G=\omega_g\wedge R_g\hat j$ si ha $\omega_e\wedge R_e\hat j+\omega_i\wedge R_i\hat j=2\,\omega_g\wedge R_g\hat j$; il risultato $\omega_g=(\omega_eR_e+\omega_iR_i)/(2R_g)$ è comunque corretto. Con anello esterno fermo: $\omega_g/\omega_i=R_i/(R_e+R_i)<1/2$.]

### FORZE SCAMBIATE NEI CUSCINETTI
Sotto l' effetto del carico Q, l' anello interno comprime gli elementi volventi che a loro volta trasferiscono il carico all' anello esterno. Si ipotizza che la deformazione degli anelli sia trascurabile, mentre si considera **influente lo schiacciamento hertziano degli elementi volventi nella metà inferiore della corona**.

> **Figura (scansione libro):** cuscinetto con carico «Q» verticale verso il basso sull'anello interno. Elementi volventi nella metà inferiore (sotto il diametro orizzontale tratto-punto): quello centrale (in basso, sulla verticale) con schiacciamento «δ_0» e reazione «P_0» verticale verso l'alto; gli altri a passi angolari «γ», «iγ» dalla verticale, con schiacciamento «δ_i» e reazioni «P_i» radiali (frecce dirette verso il centro). Inviluppo tratteggiato delle reazioni (andamento a «lobo» massimo in basso). A destra un dettaglio: elemento volvente con lo spostamento verticale «δ_0» e la sua componente radiale «δ_i» all'angolo «iγ».

*(manoscritto)* → AVERÀ UNO SPOSTAMENTO DELL' ANELLO INTERNO $\delta_0$ PARI ALLO SCHIACCIAMENTO AL QUALE SARÀ SOTTOPOSTO L' ELEMENTO VOLVENTE CENTRALE.
⇒ LA DEFORMAZIONE DELL' ELEMENTO i-ESIMO È DATA DALLA TRIGONOMETRIA
$$ \delta_i = \delta_0\cos i\gamma $$
↳ $\gamma$ = PASSO ANGOLARE TRA GLI ELEMENTI VOLVENTI

→ CON RIFERIMENTO AL CASO DEI CUSCINETTI A RULLI :
LO SCHIACCIAMENTO $\delta$ SI VALUTA CON LA FORMULA DI DORR [lettura incerta: «DORR»], OVVERO SI ASSUME CHE LO SCHIACCIAMENTO SIA PROP. AL CARICO APPLICATO ⇒ $\delta_0 = kP_0$ e $\delta_i = kP_i$
$$ \Rightarrow \delta_i = \delta_0\cos(i\gamma) \Rightarrow P_i = P_0\cos(i\gamma) $$
$z$ = NUMERO RULLI
DALL' EQUILIBRIO NELLA DIREZIONE VERTICALE :
$$ Q = \sum_{-z/4}^{z/4} P_i\cos(i\gamma) = P_0\sum_{-z/4}^{z/4}\cos^2(i\gamma) $$
[NdT: la somma è estesa agli indici $i$ da $-z/4$ a $z/4$, cioè ai rulli della metà inferiore ($|i\gamma|\le 90°$ con $\gamma=2\pi/z$).]

## PDF p. 99 · pag. stampata — · tipo: manoscritto (con una riga di testo battuto)
### FORZE SCAMBIATE NEI CUSCINETTI (segue)
⇒ LA SOMMATORIA, LIMITATA AGLI ELEMENTI ROTOLANTI DELLA SEMI CORONA INFERIORE, È STATA SOSTITUITA CON IL PRODOTTO DEL VALOR MEDIO DEL $\cos^2(i\gamma)$ CON $\frac z2$ PER VALORI SUFFICIENTEMENTE ELEVATI DI $z$.
↳ MEDIA DISCRETA $\overline{\cos^2(i\gamma)}$ PUÒ ESSERE SOSTITUITA CON LA MEDIA INTEGRALE :
$$ f(x) = \frac{1}{a-b}\int_b^a \cos^2\theta\, d\theta \qquad \overline{\cos^2(i\gamma)} \simeq \frac1\pi\int_{-\pi/2}^{\pi/2}\cos^2\theta\, d\theta = \frac1\pi\int_{-\pi/2}^{\pi/2}\frac{1-\cos(2x)}{2} = \frac{1}{2\pi}\Big[\int_{-\pi/2}^{\pi/2}1\,dx - \cancel{\int_{-\pi/2}^{\pi/2}\cos(2x)}^{\,0}\Big] = $$
$$ \overline{\cos^2(i\gamma)} \simeq \frac{1}{2\pi}\cdot\pi \simeq \frac12 $$
$$ \Rightarrow Q = P_0\sum_{-z/4}^{z/4}\cos^2(i\gamma) = P_0\frac z2\overline{\cos^2(i\gamma)} = P_0\frac z2\cdot\frac12 = P_0\cdot\frac z4 \Rightarrow \boxed{Q = P_0\frac z4} $$
QUINDI IL CARICO MASSIMO, RELATIVO AL RULLO CENTRALE $\quad \boxed{P_0 = Q\cdot\frac 4z}$
⇒ NEL CASO DELLA SFERA : $P_0 = Q\frac{4.37}{z} \simeq Q\frac 5z$ — APPROCCIO CONSERVATIVO CHE FORNISCE IL CARICO MASSIMO $P_0$ PER ENTRAMBE LE TIPOLOGIE DI CUSCINETTI
[NdT: verificato: $\frac1\pi\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta=\frac12$; il numero di termini della somma è $z/2+1\simeq z/2$. Il valore 4,37 per le sfere è dato senza derivazione (relazione carico–schiacciamento hertziana non lineare).]

### ATTRITO NEI CUSCINETTI VOLVENTI RADIALI
> **Figura (manoscritta):** porzione di cuscinetto: anello esterno e anello interno (archi grigi spessi), tre elementi volventi tra di essi, gabbia con «ω_g»; un elemento con «ω_v». Sull'elemento in basso agisce il carico «F» inclinato di «α» rispetto alla direzione radiale (dal centro del cuscinetto), con retta d'azione spostata di «u» (quotata) dal centro dell'elemento, di raggio «R» [lettura incerta: R o r]. In basso a sinistra, attorno al centro del cuscinetto (raggio tratteggiato «r» [lettura incerta]), una piccola circonferenza di raggio «ρ» a cui è tangente la retta d'azione di F. A parte, un triangolo: ipotenusa «F_i», cateto «P_i», angolo «α» tra loro, angolo retto all'estremo di P_i.

A SEGUITO DELLA DEFORMAZIONE ELASTICA DEL CORPO VOLVENTE, LA F, OVVERO IL CARICO APPLICATO AI SINGOLI ELEMENTI VOLVENTI, SI INCLINA DI UN ANGOLO $\alpha$ E RISULTA SPOSTATA DAL CENTRO DI ROTAZIONE DI $u$ = PARAMETRO VOLVENTE
$$ \Rightarrow R\sin\alpha = u \Rightarrow \sin\alpha = \frac uR = f_v \quad \text{COEFFICIENTE DI ATTRITO VOLVENTE} $$
SE SI ESTENDE L' ANALISI A TUTTI GLI ELEMENTI VOLVENTI, SI VERIFICA CHE L' INSIEME DELLE RETTE LUNGO LE QUALI GLI ELEMENTI SI SCAMBIANO LE FORZE, INVILUPPA IN UNA CIRCONFERENZA IL CUI RAGGIO VALE : $\rho = R_g\sin\alpha = R_g f_v$
↳ CIRCONFERENZA DI ATTRITO VOLVENTE

⇒ MOMENTO RESISTENTE GENERATO DALL' ATTRITO VOLVENTE
$$ M_f = F_i\cdot\rho = \sum_i\frac{P_i}{\cos\alpha}\cdot R_g\sin\alpha = \sum_i\frac{P_i}{\cos\alpha}\cdot R_g f_v $$
DA PRIMA $\quad \sum P_i = \sum_{-z/4}^{z/4}P_0\cos(i\gamma) = P_0\frac z2\overline{\cos i\gamma} = P_0\frac z2\,\overbrace{\frac1\pi\int_{-\pi/2}^{\pi/2}\cos\theta\,d\theta}^{2} = P_0\frac z2\cdot\frac2\pi = P_0\frac z\pi$
[NdT: a sinistra è scritto «$P_i =$», si intende la somma $\sum P_i$.]
$$ \Rightarrow M_f \simeq \underbrace{P_0\frac z\pi}_{\hookrightarrow\ Q\cdot\frac 5z\ (\text{per }P_0)}\frac{1}{\cos\alpha}\cdot R_g\cdot f_v = Q\cdot\frac5\pi R_g\cdot f_v $$
[NdT: verificato: con $P_0=5Q/z$ e $\cos\alpha\simeq1$ si ottiene $M_f\simeq\frac{5}{\pi}QR_gf_v\approx1{,}6\,QR_gf_v$; usando invece $P_0=4Q/z$ (rulli) si avrebbe $\frac4\pi QR_gf_v$.]
⇒ PER CUSCINETTO RADENTE SI HA : $\quad M_p = Q\,R_e\,f_d$ [lettura incerta: «$R_e$»]

*(testo battuto)* ⇒ In condizioni di equivalenza di carico Q si nota, che poiché il coefficiente di attrito volvente è uno o due ordini di grandezza inferiore del coeff di attrito radente, anche la **resistenza alla rotazione del cuscinetto volvente è molto minore rispetto a quella del cuscinetto radente**

## PDF p. 100 · pag. stampata — · tipo: manoscritto (con testo battuto)
[NdT: **ripetizione** — questa pagina e le due seguenti ritrattano argomenti già svolti nelle pagine LaTeX §2.5 e §2.5.1 (PDF p. 89–92), con notazione diversa: veicolo che avanza verso **destra**, asse anteriore «A» a destra e posteriore «B» a sinistra, semipassi $c_f$ (G–asse anteriore) e $c_r$ (G–asse posteriore), coefficiente $\mu$ al posto di $f_{ad}$, massa $m$ minuscola.]
### DINAMICA LONGITUDINALE DEL VEICOLO
La dinamica longitudinale del veicolo consente di valutare le prestazioni del veicolo in termini di accelerazione, frenata, pendenza massima superabile, consumi, ecc.
Le resistenze al moto di un veicolo presentano componenti differenti:
- **resistenza al rotolamento**
- **resistenza aerodinamica**
- **pendenza della strada**
- **variazione di energia cinetica**

### ACCELERAZIONE MASSIMA DI UN AUTOVEICOLO
L' accelerazione di un veicolo, in generale è massima quando parte a velocità molto basse, quindi con resistenza aerodinamica trascurabile, anche la resistenza al rotolamento risulta minima perché fv << fad

### VEICOLO A TRAZIONE ANTERIORE
> **Figura (manoscritta):** sagoma di auto con muso a destra; freccia «a» orizzontale verso destra. Baricentro «G» ad altezza «h» dal suolo (quota verticale a sinistra); in G «mg» verso il basso e «ma» orizzontale verso sinistra (inerzia). Ruota posteriore a sinistra con contatto «B» e «F_NB» verso l'alto; ruota anteriore a destra con contatto «A», coppia motrice «C_m» (freccia curva) sulla ruota, «F_NA» verso l'alto e «F_TA» orizzontale lungo il suolo in A. Quote orizzontali: «c_r» da B alla verticale di G, «c_f» dalla verticale di G ad A.

$F_{TA}$ = FORZA DI ADERENZA TRA PNEUMATICO E SUOLO PER EFFETTO DELLA COPPIA MOTRICE $C_m = F_{TA}\cdot R$

> **Figura (manoscritta):** trave orizzontale A–B in appoggio semplice (cerniera in A a sinistra, carrello in B a destra), carico «P» verticale verso il basso a distanza «a» da A e «b» da B; reazioni «F_A» e «F_B» verso l'alto.

$$ \curvearrowleft A:\ F_B(a+b) = Pa \Rightarrow F_B = \frac{Pa}{a+b} \qquad F_A = \frac{Pb}{a+b} $$
[NdT: analogia della trave appoggiata per la ripartizione statica del peso sugli assi; qui $a$, $b$ sono distanze, da non confondere con l'accelerazione $a$.]

x) $F_{TA} - ma = 0 \Rightarrow F_{TA} = ma$
$$ \curvearrowleft B)\ -mg\cdot c_r + ma\cdot h + F_{NA}\cdot(c_r + c_f) = 0 $$
$$ \Rightarrow F_{NA} = \frac{m(g\cdot c_r - a\cdot h)}{c_r + c_f} $$
CONDIZIONI DI ADERENZA : $F_{TA} \le \mu F_{NA}$, QUINDI L' ACCELERAZIONE MASSIMA DEL VEICOLO CORRISPONDE ALLA CONDIZIONE DI INCIPIENTE DI SLITTAMENTO
$$ \Rightarrow F_T = \mu F_{NA} $$
$$ ma = \mu\frac{m(g\cdot c_r - a\cdot h)}{c_r + c_f} $$
$$ \Rightarrow a(c_r + c_f) = \mu(g\cdot c_r - a\cdot h) $$
$$ a(c_r + c_f) + \mu a h = \mu g\cdot c_r $$
$$ \Rightarrow a_{max} = \frac{\mu g\cdot c_r}{c_r + c_f + \mu h} \qquad \Rightarrow \qquad C_m = F_{TA}\cdot R = m a_{max}\cdot R $$
[NdT: coincide con la formula LaTeX di p. 90 ($c_r\leftrightarrow l_2$, $c_f\leftrightarrow l_1$, $\mu\leftrightarrow f_{ad}$). Momenti verificati.]

## PDF p. 101 · pag. stampata — · tipo: manoscritto (con testo battuto)
[NdT: ripetizione di PDF p. 91–92 (trazione posteriore, decelerazione massima) con la notazione di p. 100; contiene in più la «condizione di dragster», assente nelle pagine LaTeX.]
### VEICOLO A TRAZIONE POSTERIORE
> **Figura (manoscritta):** stessa sagoma (muso a destra), «a» verso destra, «G» ad altezza «h», «mg» verso il basso e «ma» verso sinistra in G. Ruota posteriore a sinistra (contatto «B») con coppia motrice «C_m» e forza «F_TB» orizzontale al suolo, «F_NB» verso l'alto; ruota anteriore a destra (contatto «A») con «F_NA» verso l'alto. Quote «c_r» (B–G) e «c_f» (G–A).

x) $F_{TB} - ma = 0 \Rightarrow F_{TB} = ma$
$$ \curvearrowleft A:\ ma\cdot h + mg\cdot c_f - F_{NB}(c_r + c_f) = 0 $$
$$ \Rightarrow F_{NB} = \frac{m(ah + gc_f)}{c_r + c_f} $$
CONDIZIONE DI INCIPIENTE DI SLITTAMENTO : $F_{TB} = \mu F_{NB}$
$$ ma = \mu\frac{m(ah + gc_f)}{c_r + c_f} $$
$$ \Rightarrow a(c_r + c_f) = \mu ah + \mu gc_f $$
$$ \Rightarrow a_{max} = \frac{\mu g\cdot c_f}{c_r + c_f - \mu h} $$
[NdT: questa versione manoscritta è **corretta** (numeratore $c_f$, distanza G–asse anteriore) e contraddice la formula LaTeX di p. 91, che ha $l_2$ (distanza G–asse posteriore) al numeratore. Verificato con SymPy.]
*(testo battuto, collegato con una freccia al termine «$-\mu h$»)* Il meno indica che il denominatore sarà più piccolo, quindi l' accelerazione massima a trazione posteriore ottenibile è maggiore rispetto a quella massima ottenibile a trazione anteriore.

*(testo battuto)* In realtà ciò deriva anche dal termine generato dalla forza d'inerzia, essendo che quando si accelera avviene un trasferimento longitudinale del carico verso dietro, quindi la reazione normale al piano agente sulla ruota posteriore risulterà maggiore di quella agente sulla ruota anteriore, perciò a parità di superficie di contatto, la forza tangenziale in condizioni di incipiente di slittamento risulterà maggiore sulla ruota posteriore e quindi anche la coppia massima trasmissibile a parità di raggio.
[NdT: il confronto con la trazione anteriore è rigoroso solo a parità di numeratore ($c_f=c_r$); vedi NdT a p. 91.]

### CONDIZIONE DI DRUGSTER
[NdT: «DRUGSTER» sta per «dragster».]
È UNA CONDIZIONE LIMITE IN CUI SI SFRUTTA TUTTA L' ADERENZA POSSIBILE SULLA RUOTA MOTRICE E SI SCARICA LA CONDOTTA : $F_{NA} = 0$
$$ \curvearrowleft B:\ mg\cdot c_r - ma\cdot h = 0 \Rightarrow a = g\frac{c_r}{h} = g f_a $$
[lettura incerta: «$g f_a$»] [NdT: con $F_{NA}=0$ e trazione posteriore al limite si ha $F_{NB}=mg$ e $a=\mu g$; insieme a $a=gc_r/h$ ciò accade quando $\mu=c_r/h$, quindi $f_a$ va letto come il coefficiente di aderenza per cui si raggiunge la condizione, $f_a=c_r/h$. Per l'equilibrio dei momenti rispetto a B si usa il baricentro a distanza $c_r$ da B.]

### DECELERAZIONE MASSIMA DI UN VEICOLO
> **Figura (manoscritta):** sagoma con muso a destra; «V» verso destra (moto) e «a» verso sinistra (decelerazione). In «G» (altezza «h»): «mg» verso il basso e «ma» orizzontale verso destra (inerzia). Coppie frenanti «C_f» (frecce curve) su entrambe le ruote. Contatto posteriore «B» (sinistra): «F_NB» verso l'alto e «F_TB» orizzontale verso sinistra; contatto anteriore «A» (destra): «F_NA» verso l'alto e «F_TA» orizzontale verso sinistra. Quote «c_r», «c_f».

x) $-F_{TB} - F_{TA} + ma = 0 \Rightarrow ma = \mu(F_{NA} + F_{NB}) \Rightarrow a = \mu g$ DEC. MAX
y) $+F_{NB} + F_{NA} - mg = 0 \Rightarrow mg = F_{NA} + F_{NB}$
[NdT: come a p. 92, non sono scritte le singole reazioni $F_{NA}$, $F_{NB}$ in frenata né la ripartizione della frenata.]

## PDF p. 102 · pag. stampata — · tipo: manoscritto (con testo battuto e foto)
[NdT: **ripetizione** di §2.6.1 e §2.6.2 (PDF p. 93–96) con notazione diversa: ruote «A» (sinistra, esterna) e «B» (destra, interna), massa $m$, velocità $V$, $\mu$ / $f_{ad}$. In più c'è la derivazione cinematica dell'accelerazione centripeta.]
### ANALISI DINAMICA DI UN AUTOVEICOLO CHE PERCORRE UNA CURVA
SE UN VEICOLO VIAGGIA A VELOCITÀ COSTANTE, $V$ = cost, LUNGO UNA CURVA DI RAGGIO R

> **Figura (manoscritta):** circonferenza di centro «O»; sul lato sinistro un rettangolo (veicolo visto dall'alto, con due ruote) nel punto «A», con «V» verticale verso l'alto (tangente) e «a» diretta da A verso O (tratteggio fino a O).

$$ \Rightarrow\ \omega\ \text{ENTRANTE} = \text{cost} $$
$$ a_A = \cancel{a_O}^{\,0} + \cancel{\dot\omega}^{\,0}\wedge(A - O) - \omega^2(A - O) = a_{CENTRIPETA} $$
$$ \Rightarrow a_A = \omega^2R = \frac{V^2}{R} $$
⇒ DI CONSEGUENZA LA $F_{in}$ SARÀ RIVOLTA VERSO L' ESTERNO DELLA CURVA E TENDERÀ A PORTARCI FUORI

> **Figura (manoscritta):** veicolo visto da dietro (sagoma a cupola) su due ruote «A» (sinistra) e «B» (destra), carreggiata «c», baricentro «G» ad altezza «h». In G: «mV²/R» orizzontale verso sinistra e «mg» verso il basso. In A: «F_NA» verso l'alto e «F_TA» orizzontale verso destra; in B: «F_NB» verso l'alto e «F_TB» orizzontale verso destra.

x) $F_{TB} + F_{TA} = M\frac{V^2}{R}$
y) $F_{NB} + F_{NA} = Mg$

—→ CONDIZIONI DI INCIPIENTE DI SLITTAMENTO : $F_T = \mu F_N$
$$ \Rightarrow \begin{cases} \mu(F_{NA} + F_{NB}) = M\frac{V^2}{R} \\ (F_{NA} + F_{NB}) = Mg \end{cases} \Rightarrow \mu g = \frac{V^2}{R} \Rightarrow \boxed{V_{max} = \sqrt{\mu gR}} $$

CONDIZIONE DI EMERGENZA $\quad F_{NB} = 0 \quad$ RIBALTAMENTO !!!
$$ \curvearrowleft A:\ m\frac{V^2}{R}\cdot h + F_N\cdot c - mg\cdot\frac c2 = 0 $$
$$ \Rightarrow F_N = \frac mc\Big(g\cdot\frac c2 - \frac{V^2}{R}\cdot h\Big) \Rightarrow \text{SE}\ F_N = 0 \Rightarrow g\cdot\frac c2 = \frac{V^2}{R}\cdot h \Rightarrow \boxed{V_{max} = \sqrt{\frac{g\cdot c\cdot R}{2h}}} $$
V. DI RIBALTAMENTO — SE $\frac ch\uparrow$ $V_{max}\uparrow$
[NdT: $F_N$ indica $F_{NB}$ (ruota interna). Coincide con p. 94–95.]

*(testo battuto)* ⇒ All' aumentare del rapporto geometrico c/h è possibile ottenere velocità di ribaltamento più elevate
Infatti in formula 1, le auto hanno il baricentro basso ed una velocità di ribaltamento molto elevata, mentre nei camion che hanno il baricentro più elevato la velocità di ribaltamento è molto bassa.

### MOTOCICLO CHE PERCORRE UNA CURVA
> **Figura:** la stessa foto del motociclista in piega di p. 95, con le stesse annotazioni («α» tra verticale e retta P–G, «Mv²/R», «Mg», in P «F_Tad» e «F_N»).

POLIGONO :
> **Figura (manoscritta):** triangolo: «mV²/R» orizzontale in alto (verso sinistra), «mg» verticale a sinistra, «F_t» ipotenusa; angolo «α» al vertice inferiore tra mg e F_t.

$$ \Rightarrow mg\tan\alpha = m\frac{V^2}{R} \Rightarrow \tan\alpha = \frac{V^2}{R\cdot g} $$
$\alpha$ = ANGOLO DI PIEGA O ANGOLO D' INCLINAZIONE DELLA RISULTANTE DELLE FORZE DI CONT.
COND. MAX : $\alpha = \varphi_{ad}$, ALTRIMENTI SE NON È ALL' INTERNO DEL CONO D'ATTRITO AVVIENE [lettura incerta: «AMBUE»] LO SLITTAMENTO
$$ \Rightarrow \tan\alpha = \tan\varphi_{ad} = \frac{V^2}{R\cdot g} = f_{ad} \Rightarrow \boxed{V_{max} = \sqrt{g\cdot R\cdot f_{ad}}} $$
