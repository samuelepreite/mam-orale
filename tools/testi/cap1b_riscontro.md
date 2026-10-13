# Riscontro — Capitolo 1, seconda parte (PDF pp. 36–66)

Fonti derivate confrontate: dimostrazioni `d014`–`d023` (`/home/claude/work/dd/`), domande `q01` (solo la parte sul glifo con le forze vive), `q02`, `q21` (solo il confronto con la cinematica analitica complessa) (`/home/claude/work/dq/`). Trascrizione di riferimento: `cap1b.md`. Le verifiche dei conti sono state fatte a mano e con SymPy (indicato dove serve).

Nota generale sulle pagine: le «Pagine fonte» delle dimostrazioni sono pagine PDF; in questo tratto la pagina stampata è PDF + 1. Diversi intervalli dichiarati sono **spostati di 1–2 pagine in avanti** rispetto al contenuto reale (vedi tabella).

---

## 1. Tabella delle dimostrazioni

| n. | Titolo | Pagine dichiarate | Pagine reali nella dispensa | Presente | Il risultato coincide? | Note |
|---|---|---|---|---|---|---|
| d014 | Moto relativo: formula delle velocità | 33–35 | 33–35 (§1.5, fuori dal mio intervallo; vedi `cap1a`) | — (non verificabile qui) | — | Nel mio intervallo c'è solo l'**applicazione** (p. 37): $\vec V_B=\vec V_{rel,B}+\vec V_{t,B}$, con $\vec V_{t,B}=\vec\omega_1\wedge(B-A)$ e $|\vec V_{rel,B}|=q/S$; coerente con il risultato di d014 ($\vec v_{O'}=0$ perché A è fisso). |
| d015 | Moto relativo: accelerazioni e Coriolis | 35–38 | derivazione a p. 35 (fuori intervallo); applicazione pp. 38–39 | parziale (nel mio intervallo solo l'applicazione) | sì | Dispensa (p. 38): $\vec a_B=\vec a_{rel,B}+\vec a_{t,B}+\vec a_{cc,B}$, $\vec a_{t,B}=\dot{\vec\omega}_1\wedge(B-A)-\omega_1^2(B-A)$, Coriolis $2\vec\omega_1\wedge\vec V_{rel}$. Notazione diversa: la dispensa scrive $\dot{\vec\omega}$ (non $\alpha$), $-\omega^2 r$ al posto di $\omega\times(\omega\times r)$ (equivalenti solo nel moto piano), $\wedge$, $\vec a_{cc}$ per Coriolis. A p. 38 c'è un refuso della dispensa: $(B-D)$ al posto di $(B-O)$. La dispensa usa anche l'ipotesi $q$ = cost ⇒ $\vec a_{rel}=0$. |
| d016 | Complex replacement / chiusura complessa | 39–44 | **40–44** (§1.7, 1.7.1, 1.7.2); p. 39 è §1.6 (accelerazione del CIR) | sì | sì: $\sum V_j\cos\varphi_j=0$, $\sum V_j\sin\varphi_j=0$ (p. 41) | **Titolo fuorviante**: la dispensa chiama questo argomento «Cinematica analitica» nel piano complesso; il nome «complex replacement» non compare in queste pagine (è il metodo delle vibrazioni, cfr. q21). Notazione: dispensa $V_j,\varphi_j$ (non $L_j,\theta_j$). La dispensa **deriva le equazioni scalari** (in seno e coseno), non l'equazione complessa; aggiunge cose che d016 omette: quali sono le incognite (quadrilatero: $\varphi_2,\varphi_3$; manovellismo: $\varphi_2, V_3$), sistema di posizione **non lineare**, sistemi di velocità e accelerazione **lineari**, e i sistemi espliciti di velocità e accelerazione (verificati con SymPy: corretti). Refusi della dispensa: p. 42 $V_1e^{i\varphi_1}$ ripetuto al posto di $V_2e^{i\varphi_2}$; p. 44 «$\vec V_1$ e $\vec V_1$» al posto di «$\vec V_1$ e $\vec V_2$». |
| d017 | Equilibrio statico di un meccanismo | 45–47 | 45–47 (§1.8.1); corpi isolati: 47–54 | sì | sì, ma la dispensa ha anche le coppie: $\sum(P_i-O)\wedge\vec F_i+\sum\vec C_i=0$ | d017 scrive solo $\Sigma M=0$; la dispensa scrive esplicitamente le coppie $\vec C_i$ e precisa che per un sistema di corpi si considerano solo le forze **esterne**; nel piano 2 + 1 equazioni scalari. d017 omette i due corollari che la dispensa usa in tutti gli esempi: **corpo con due forze** (direzione = retta per i due punti di applicazione, p. 46) e **corpo con tre forze** (le rette d'azione concorrono, p. 46–47), e le reazioni vincolari di coppia rotoidale e prismatica (§1.8.2, p. 47). |
| d018 | Azioni interne e principio di azione-reazione | 47–54 | 47–54 (§1.8.3–1.8.5) | parziale (usato, non dimostrato né nominato) | sì: $\vec F_{3,2}=-\vec F_{2,3}$ (p. 48), $\vec F_{2,1}=-\vec F_{1,2}$ (p. 51) | La dispensa non nomina il «principio di azione e reazione»: lo applica. Convenzione degli indici della dispensa: $\vec F_{i,j}$ = forza che il corpo $i$ esercita sul corpo $j$ (con la virgola). Ordine di risoluzione della dispensa: si parte dal corpo con la forza nota (pistone, p. 47) o dal corpo da cui si deduce la direzione (corpo 2 a due forze). |
| d019 | Principio di D'Alembert | 55–61 | **55–56** (§1.8.6); applicazione 56–60 (§1.8.8) | parziale (contenuto sì, nome no) | sì: $\vec F_{ine}=-M\vec a_G$, $\vec C_{ine}=-I_G\dot{\vec\omega}$ (p. 56) | Il nome «D'Alembert» **non compare** nella dispensa in queste pagine: forza e coppia d'inerzia «possono essere considerate come forze e coppie esterne» (p. 56). Notazione: $\dot{\vec\omega}$ (non $\alpha$), pedice $ine$ (nell'applicazione $in$). La dispensa introduce anche la distinzione **dinamica diretta / inversa** (p. 56), che d019 omette. Nelle equazioni con inerzia la dispensa usa $\sum_{i=1}^m\vec C_i$ e polo G. |
| d020 | Forza e coppia d'inerzia del corpo rigido | 57–61 | 56 (definizioni) e **61** (§1.8.9, polo fisso); 57–60 sono l'Applicazione 1 | sì | sì | d020 omette la parte che la dispensa sviluppa in §1.8.9: scomposizione $\vec F_{ine}=M\omega^2(G-O)-M\dot{\vec\omega}\wedge(G-O)$ (normale + tangenziale) e **riduzione a un polo fisso O**: $\vec F_{ine,O}=\vec F_{ine,G}$, $\vec C_{ine,O}=-I_O\dot{\vec\omega}$ con $I_O=I_G+M\overline{OG}^2$ (verificato: il termine normale ha momento nullo rispetto a O, quello tangenziale dà $-M\overline{OG}^2\dot{\vec\omega}$). |
| d021 | Lavoro elementare e potenza | 62–64 | **61–62** (§1.9.1) | sì | sì: $dL=\vec F\cdot d\vec P$, $Pot=\vec F\cdot\vec V$ | Notazione: la dispensa scrive $d\vec P$ (non $d\vec r$), angolo $\theta$ (non $\gamma$), potenza «$Pot$» (non $P$); $dL=F\,dP_{//}$, $Pot=FV_{//}=FV\cos\theta$; lavoro/potenza negativi se la componente parallela è opposta alla forza. La potenza di una **coppia** $\vec C\cdot\vec\omega$ compare solo a p. 64 (assente in d021). |
| d022 | Teorema delle forze vive | 63–66 | **62–64** (§1.9.2); applicazioni 64–66 (§1.9.3) | parziale (enunciato sì, dimostrazione no) | sì nella sostanza, forma diversa | La dispensa **non dimostra** il teorema (non fa il passaggio $m\vec a\cdot\vec v\,dt=d(\tfrac12mv^2)$ di d022): lo enuncia come $dL_{est}+dL_{int}=dE_{cine}$, poi elenca le condizioni per $dL_{int}=0$ (solo corpi rigidi, nessun attuatore, forze dissipative trascurate), e lo scrive in **forma di potenza**: $\sum\vec F_i\cdot\vec V_{P_i}+\sum\vec C_i\cdot\vec\omega_i=\sum(M_i\vec V_{G_i}\cdot\vec a_{G_i}+I_{G_i}\vec\omega_i\cdot\dot{\vec\omega}_i)$. d022 dà $L_{tot}=\Delta E_c$ in forma integrale e per un punto materiale; omette le forze interne (esempio del muscolo come attuatore, p. 63) e la potenza delle coppie. Refuso della dispensa: limite «$i_1$» per $i=1$ (p. 64). |
| d023 | Energia cinetica di un corpo rigido piano | 65–66 | **64** (una riga) | parziale (formula sì, dimostrazione no) | sì: $E_{cine}=\tfrac12MV_G^2+\tfrac12I_G\omega^2$ | La dispensa **enuncia** la formula senza dimostrarla (nessun $\int GP\,dm=0$); pp. 65–66 sono gli esempi del glifo e del parallelogramma. Il risultato di d023 è corretto (verificato con SymPy su un insieme di masse puntiformi: differenza nulla). La dispensa usa subito la derivata $M\vec V_G\cdot\vec a_G+I_G\vec\omega\cdot\dot{\vec\omega}$. |

---

## 2. Domande

### q01 — Glifo oscillante (solo la parte sul glifo come applicazione delle forze vive)

Riferimento: dispensa §1.9.3, Esempio 1, PDF pp. 64–65.

Differenze:
1. **Il risultato della dispensa manca dalla risposta.** q01 dice soltanto che «il glifo compare anche come applicazione del teorema delle forze vive», senza l'equazione. La dispensa (p. 65) scrive $\vec F\cdot\vec V_E+\vec C_1\cdot\vec\omega_1=0$ con l'ipotesi di massa trascurabile ($E_{cine}=0$, p. 64), da cui $C_1=-\vec F\cdot\vec V_E/\omega_1$. Il professore può chiederla.
2. **Ragionamento sulle reazioni che non compiono lavoro**, assente in q01: $\vec R_A$ e $\vec R_C$ hanno potenza nulla perché A e C sono fissi; $R_4$ ha potenza nulla perché $\vec V_E\perp\vec R_4$ (p. 65). Ipotesi implicite in entrambe le fonti: niente attrito nel perno B nella cava e nella guida di 4.
3. **Meccanismo diverso.** Il glifo della dispensa a p. 64 ha **sei membri**: manovella 1 (A–B), glifo 2 (cerniera fissa in C, estremo D), biella 3 (D–E), corsoio 4 in E su guida orizzontale, forza $\vec F$ sul corsoio. Il disegno di q01 è il glifo semplice (manovella e bilanciere), con $O_1$, $O_2$, $r$, $d$. Notazione in conflitto: per la dispensa $O_1\to A$, $O_2\to C$, perno $B$ uguale.
4. La dimostrazione del rapido ritorno ($\gamma=\arcsin(r/d)$, angoli $\pi\mp2\gamma$) **non è nelle pp. 36–66**: è in d008, pp. 21–24 dichiarate, fuori dal mio intervallo. Ho verificato il conto: con le due posizioni estreme tangenti alla circonferenza della manovella, l'angolo in $O_1$ è $\pi/2-\gamma$ e gli intervalli di manovella sono $\pi-2\gamma$ e $\pi+2\gamma$. È corretto. Il glifo di p. 64 aggiunge la biella DE e il corsoio, quindi la corsa del corsoio non è lineare nell'angolo del glifo. La proprietà vale comunque: corse uguali, tempi diversi.

### q02 — Meccanismi, analisi delle velocità

Riferimenti nelle pp. 36–66: velocità con la cinematica relativa (pistone, pp. 37–38), CIR e $\vec V_P=\vec\omega\wedge(P-K^*)$ (p. 40), CIR dell'asta con due pattini (pp. 56–58), metodo analitico (pp. 43–44). La formula fondamentale e la sua dimostrazione sono prima di p. 36 (`cap1a`).

Differenze:
1. **Coppia prismatica fra due membri mobili: assente in q02.** q02 tratta solo il corsoio su guida fissa (direzione nota). La dispensa (pp. 37–38) tratta il pistone oleodinamico, cioè una prismatica fra due corpi entrambi in moto. Usa la cinematica relativa: $\vec V_B=\vec V_{rel,B}+\vec\omega_1\wedge(B-A)=\vec\omega_3\wedge(B-O)$, con $|\vec V_{rel,B}|=q/S$ ricavato dalla portata, più il **poligono delle velocità** (p. 38). Per le accelerazioni compare Coriolis $2\vec\omega_1\wedge\vec V_{rel}$. Il professore può chiederlo.
2. **Metodo analitico: assente in q02.** Derivando le equazioni di chiusura si ottiene un sistema **lineare** nelle velocità incognite (quadrilatero: $\dot\varphi_2,\dot\varphi_3$; manovellismo: $\dot\varphi_2,\dot V_3$; pp. 43–44). Il sistema delle posizioni invece è **non lineare**.
3. CIR: la formula di q02, $v_A/KA=v_B/KB=|\omega|$, coincide con la dispensa ($\omega_2=V_A/\overline{K_2A}$, p. 58). La dispensa ricava il **verso** di $\omega$ dalla coerenza del prodotto vettoriale ($\vec V_A=\vec\omega_2\wedge(A-K_2)$ ⇒ antiorario, p. 58): corrisponde al punto 6 della strategia di q02. Ho verificato che è antiorario, con $V_B=V_A\tan\alpha$.
4. «Il CIR non ha accelerazione nulla» (q02): la dispensa lo **dimostra** a pp. 39–40: $\vec a_K=-\vec\omega\wedge\vec V_{K^*}$, dove $K^*$ è il punto geometrico che insegue il CIR. Per la ruota che rotola si ha $|\vec a_K|=\omega^2R$, diretta verso il centro (verificato). q02 lo afferma senza formula, che si può aggiungere.
5. Notazione: q02 usa $\times$ e $\mathbf r_{B/A}$; la dispensa usa $\wedge$ e $(B-A)$, e scrive il CIR $K_2$ nel testo ma $k_2$ nelle formule (p. 58).
6. Nessuna differenza di formula o di segno nelle parti in comune.

### q21 — Complex replacement (solo il confronto con la cinematica analitica complessa)

Riferimento: dispensa §1.7, pp. 40–44. La parte sulle vibrazioni è in altri capitoli e non è verificata qui.

Differenze:
1. **Due usi diversi dei numeri complessi.**
   - Nella dispensa (§1.7) $Ve^{i\varphi}$ rappresenta un **vettore posizione** (un'asta) nel piano. L'equazione di chiusura complessa vale come due equazioni reali, e **parte reale e parte immaginaria vanno entrambe imposte nulle** (p. 41).
   - Nel complex replacement di q21 si sostituisce una grandezza armonica con $\hat Xe^{i\omega t}$ e alla fine **si tiene solo la parte reale**. La parte immaginaria corrisponde alla risposta alla forzante in seno e non va imposta nulla.
   - Il titolo di d016 («Complex replacement / chiusura complessa») mescola i due usi.
2. **Derivazione.**
   - In q21 «derivare = moltiplicare per $i\omega$» vale solo per la dipendenza $e^{i\omega t}$ con $\omega$ costante.
   - Nella cinematica analitica gli angoli $\varphi_j(t)$ sono funzioni qualsiasi: $\frac{d}{dt}(Ve^{i\varphi})=i\dot\varphi Ve^{i\varphi}$, e per le aste di lunghezza variabile (corsoio) c'è anche $\dot Ve^{i\varphi}$. La derivata seconda contiene $-\dot\varphi^2$ e $i\ddot\varphi$.
   - La dispensa non usa questa forma: deriva direttamente le equazioni in seno e coseno. Ho verificato con SymPy che parte reale e immaginaria di $i\dot\varphi Ve^{i\varphi}$ danno $-V\dot\varphi\sin\varphi$ e $V\dot\varphi\cos\varphi$, come nella dispensa.
3. **Conflitto di simboli.** In q21 $\omega$ è la pulsazione della forzante e $\varphi$ la fase della risposta. In §1.7 $\varphi_j$ sono gli angoli delle aste e le velocità angolari sono $\dot\varphi_j$.

---

## 3. Derivazioni della dispensa (pp. 36–66) che non compaiono tra le dimostrazioni assegnate

| Derivazione | Pagine PDF |
|---|---|
| Pistone oleodinamico (cassone ribaltabile): conteggio dei g.d.l. (9 − 8 = 1); velocità con la cinematica relativa, $|\vec V_{rel}|=q/S$, poligono delle velocità | 36–38 |
| Pistone oleodinamico: accelerazioni, $q$ = cost ⇒ $\vec a_{rel}=0$, Coriolis $2\vec\omega_1\wedge\vec V_{rel,B}$, poligono delle accelerazioni con incognite $\dot\omega_1$, $\dot\omega_3$ | 38–39 |
| **Accelerazione del centro di istantanea rotazione**: $\vec a_K=-\vec\omega\wedge\vec V_{K^*}$ (ruota che rotola: $\vec V_{K^*}=\vec V_C$) | 39–40 |
| Cinematica analitica del quadrilatero articolato: sistemi di posizione (non lineare), velocità e accelerazioni (lineari) | 41–43 |
| Cinematica analitica del manovellismo di spinta (incognite $\varphi_2$, $V_3$) | 43–44 |
| Corollari delle equazioni cardinali: corpo con due forze; corpo con tre forze (rette concorrenti) | 46–47 |
| Reazioni vincolari della coppia rotoidale e della coppia prismatica | 47 |
| Statica del manovellismo con forza sul pistone: $\vec F_{2,3}$ lungo BC, $\vec R$ della guida per C, $C_1=F_{2,1}b$ (oraria) | 47–49 |
| Statica del manovellismo con forza sul corpo 2: costruzione delle tre forze concorrenti, $C_1=F_{2,1}b_{2,1}$ (antioraria) | 49–52 |
| Statica del quadrilatero frantumatore: tre forze parallele sul corpo 3, $F_{2,3}=F\,b_f/b$, $C_1=F_{2,1}b_{2,1}$ (oraria) | 52–54 |
| Dinamica diretta e inversa | 56 |
| Applicazione 1 (asta di massa M con due pattini): CIR $K_2$, $\omega_2=V_A/\overline{K_2A}$, poligono di $\vec a_B$, $\vec a_G=\vec a_B/2$, $F_{32}=\dfrac{mg\,AG\cos\alpha-F_{in}AG\sin\alpha-C_{in}}{AB\cos\alpha}$, $F_{12,x}=-Ma_G$, $F_{12,y}=-F_{32,y}+Mg$, $\vec F=-\vec F_{2,1y}$ | 56–60 |
| Forza e coppia d'inerzia rispetto ad un polo fisso: $\vec C_{ine,O}=-I_O\dot{\vec\omega}$ (trasporto + Huygens–Steiner) | 61 |
| Forze interne nel teorema dell'energia (esempio del muscolo come attuatore) e condizioni per $dL_{int}=0$ | 63–64 |
| Forze vive, esempio del glifo: $\vec F\cdot\vec V_E+\vec C_1\cdot\vec\omega_1=0$ | 64–65 |
| Forze vive, esempio del parallelogramma con pistone: $\vec F\cdot\vec V_C+M\vec g\cdot\vec V_G=M_1\vec V_{G,1}\cdot\vec a_{G,1}$ (con $\omega_1=0$ perché il membro HE trasla) | 65–66 |

Fra le dimostrazioni non assegnate a me, d007 (CIR, pp. 16–18) non copre l'accelerazione del CIR di p. 39–40.

---

## 4. Simboli del capitolo (pp. 36–66)

| Simbolo | Significato | Pagina PDF |
|---|---|---|
| $q$ | portata volumetrica di fluido immessa nel cilindro | 37 |
| $S$ | area (sezione) del pistone (non definita esplicitamente) | 37 |
| $\vec V_{rel,B}$, $\vec V_{t,B}$ | velocità relativa e di trascinamento di B | 37 |
| $\vec a_{rel,B}$, $\vec a_{t,B}$, $\vec a_{cc,B}$ | accelerazione relativa, di trascinamento, di Coriolis | 38 |
| $\vec\omega_j$, $\dot{\vec\omega}_j$ | velocità e accelerazione angolare del corpo $j$ | 37–40, 58 |
| $\wedge$ | prodotto vettoriale | ovunque |
| $K$, $K_1,K_2,K_3$ | centro di istantanea rotazione (ruota: punti di contatto successivi, solidali alla ruota) | 39 |
| $K^*$ | punto geometrico (non solidale) che occupa istante per istante la posizione del CIR | 39–40 |
| $C$ | centro della ruota (p. 39); cerniera/corsoio nei meccanismi (pp. 43, 47); cerniera fissa del glifo (p. 64); pistone (p. 65) | — |
| $V_j$, $\varphi_j$ | modulo e angolo (antiorario dall'asse reale) del vettore $j$ nel piano complesso | 40–44 |
| $i$ | unità immaginaria | 40 |
| $\vec F_{i,j}$ (anche $\vec F_{ij}$) | forza che il corpo $i$ esercita sul corpo $j$ | 47–60 |
| $\vec R_3$, $\vec R_C$, $\vec R_A$, $\vec R_1$, $\vec R_D$, $R_B$, $R_4$ | reazioni vincolari (indicate ora col corpo, ora col punto) | 47–65 |
| $\vec C_1$ | coppia (motrice/resistente) sulla manovella | 47–54, 65 |
| $b$, $b_{2,1}$, $b_f$ (in figura $b_F$, $b_{F_{2,3}}$) | bracci delle forze | 49–54 |
| $\vartheta$, $\gamma$ | angolo di manovella e angolo della biella sull'asse x (manovellismo, figura) | 47 |
| $\alpha$ | angolo dell'asta con la guida orizzontale (Applicazione 1) | 57–60 |
| $M$, $m$ | massa del corpo (usate entrambe per la stessa massa) | 55–60 |
| $G$, $\vec a_G$, $I_G$ | baricentro, sua accelerazione, momento d'inerzia baricentrico | 55–61 |
| $\vec F_{ine}$, $\vec C_{ine}$ (anche $F_{in}$, $C_{in}$) | forza e coppia d'inerzia | 56–61 |
| $\vec a_{G,n}$, $\vec a_{G,t}$, $\vec F_{ine,n}$, $\vec F_{ine,t}$ | componenti normale e tangenziale | 61 |
| $I_O$ | momento d'inerzia rispetto al polo fisso O ($I_G+M\overline{OG}^2$) | 61 |
| $dL$, $d\vec P$, $dP_{//}$, $\theta$ | lavoro elementare, spostamento del punto di applicazione, sua componente lungo F, angolo fra F e spostamento | 61–62 |
| $Pot$, $V_{//}$ | potenza, componente della velocità lungo F | 62 |
| $dL_{est}$, $dL_{int}$, $E_{cine}$ | lavoro delle forze esterne / interne, energia cinetica | 63–64 |
| $M_i$, $I_{G,i}$ (anche $I_{G_i}$), $\vec V_{G_i}$, $\vec a_{G_i}$ | grandezze del corpo $i$ | 62–64 |

### Conflitti di notazione
1. **$C$ ha quattro significati** in poche pagine: centro della ruota (p. 39), cerniera del corsoio o del quadrilatero (pp. 43–54), cerniera fissa del glifo (p. 64), pistone (p. 65). Anche **$C$ / $\vec C_i$ come coppia** coesiste con il punto C nella stessa figura (p. 65: $\vec C_1$ e il punto $C$).
2. **$K_2$ / $k_2$** per lo stesso CIR (p. 58).
3. **$M$ / $m$** per la stessa massa nella stessa equazione (p. 60). **$M$ / $M_1$** e **$\vec V_G$ / $\vec V_{G,1}$** nella stessa equazione (p. 66).
4. **Reazioni**: $\vec R_3$ nel testo e $R_C$ in figura (p. 47–48); $\vec R_1$ nel testo e $R_A$ in figura (pp. 51–54).
5. **Pedici d'inerzia**: $ine$ (pp. 56, 61) e $in$ (pp. 59–60).
6. **Indici delle somme**: coppie sommate fino a $m$ (statica, p. 45; p. 56) o fino a $n$ (p. 55). Nel teorema delle forze vive $i$ indicizza sia le forze sia i corpi (p. 64).
7. **Bracci**: in figura $b_F$, $b_{F_{2,3}}$; in formula $b_f$, $b$ (pp. 53–54).
8. **Accelerazione angolare**: la dispensa usa sempre $\dot{\vec\omega}$. Le dimostrazioni derivate (d015, d019, d020) usano $\alpha$, che nella dispensa (p. 57) è un **angolo**.
9. **$\varphi$**: angoli delle aste nella cinematica analitica (pp. 40–44); in q21 è la fase della risposta vibratoria.

### Refusi della dispensa segnalati nella trascrizione (con [NdT])
- p. 37: il simbolo vettoriale è usato per un modulo: $\vec V_{rel,B}=q/S$.
- p. 38: $(B-D)$ al posto di $(B-O)$.
- p. 42: $V_1e^{i\varphi_1}$ ripetuto al posto di $V_2e^{i\varphi_2}$.
- p. 44: «$\vec V_1$ e $\vec V_1$» al posto di «$\vec V_1$ e $\vec V_2$».
- p. 49: **errore di segno**: $\vec C_1=(B-A)\wedge\vec F_{2,1}$ dovrebbe essere $-(B-A)\wedge\vec F_{2,1}$. Il verso dichiarato (orario) e il modulo $F_{2,1}b$ sono invece corretti (verificato con le componenti).
- p. 53: $F_R$ indica la forza resistente $\vec F$.
- p. 64: limite inferiore della somma stampato $i_1$ al posto di $i=1$.
