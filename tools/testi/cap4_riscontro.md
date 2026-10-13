# Riscontro — Trasmissioni a cinghia (PDF pp. 129–154)

Confronto tra la trascrizione `cap4.md` (unica fonte di verità) e le fonti derivate: dimostrazioni d055–d071, d137 (`/home/claude/work/dd/`) e domande q11, q15, q19, q44, q45, q46 (`/home/claude/work/dq/`).
Verifiche: conti a mano e SymPy (risoluzione dell'ODE di Eulero, $C_{max}$, velocità ottime nei due modelli, freno a nastro, rapporto lasco/teso, tre pulegge, rendimento da creep).

**Pagine fonte dichiarate.** Le «Pagine fonte» delle dimostrazioni di questo capitolo sono sbagliate quasi tutte, e non per uno scarto costante: vanno da 130 a 176, mentre il capitolo occupa le pp. 129–154 (la p. 155 apre «INGRANAGGI E ROTISMI»). Per esempio d062 dichiara 151–154 (reale 140–141) e d071 dichiara 171–176 (reale 153). Qui sotto ci sono le pagine reali.

---

## 1. Tabella delle dimostrazioni

| n. | titolo | pagine dichiarate | pagine reali | presente | il risultato coincide? | note |
|---|---|---|---|---|---|---|
| 55 | Rapporto di trasmissione ideale a cinghia | 131–133 | **132** (e 134 righe m), c); 135) | sì | sì: $\omega_1/\omega_2=R_2/R_1$ equivale a $\tau^{ID}=\omega_2/\omega_1=r_1/r_2$ | La dispensa definisce $\tau=\omega_2/\omega_1$ (condotta/motrice), cioè l'inverso del rapporto scritto in d055; scrive anche $\tau_{ID}=\omega_C/\omega_M=R_M/R_C$ e la classificazione moltiplicatore ($R_M>R_C$) / riduttore. A p. 134–135 ricava inoltre $C_1/C_2=\omega_2/\omega_1=\tau^{ID}$ (equilibrio + T.F.V.), che d055 non riporta. |
| 56 | Curvatura della cinghia ideale e accelerazione centripeta | 133–134 | **133–134** | parziale | sì ($F=mv^2/r$) | La dispensa non ricava $a_n=v^2/R$: discute la curvatura che passa «a gradino» da 0 a $k=1/r_1$ nei 4 punti di tangenza, la forza centrifuga che compare di colpo $F=mv^2/r$ e i raccordi parabolici. d056 omette il discorso sulla discontinuità di curvatura. |
| 57 | Forza centrifuga nella cinghia ($T_c=\rho_l v^2$) | 133–135 | **141** (termine $dm\,V^2/R$ nell'equilibrio normale), 140 (qualitativo) | parziale | sì nel valore ($\rho V^2$) | La dispensa non introduce mai una «tensione centrifuga $T_c$» e non isola un elemento di cinghia libero: $\rho V^2$ compare solo come termine nell'equilibrio normale del concio sulla puleggia ($dF_N/d\theta=T-\rho V^2$). La massa lineare si chiama $\rho$ (mai definita esplicitamente), non $\rho_l$. |
| 58 | Teorema delle forze vive applicato alla cinghia | 135–136 | **135** (anche 139, 150) | parziale | in parte | La dispensa applica la T.F.V. all'**intero sistema** (pulegge): $C_1\omega_1-C_2\omega_2=0$ nel caso ideale, quindi $C_1/C_2=\omega_2/\omega_1$; nel caso reale $C_1\omega_1+C_2\omega_2+\mathcal P_d=0$, poi $W^{ATTR}_{DISS}=-(1-\eta)C_1\omega_1$ (p. 139). Non fa un bilancio energetico di un tratto di cinghia ($\Delta E_c=L_{est}+L_{int}$) e non ricava $P=(T_1-T_2)v$ in questo punto. Attenzione: a p. 135 il bilancio reale ha segni incoerenti (vedi NdT). |
| 59 | Allungamento elastico e differenza di velocità dei rami | 136–145 | **135–138** (cuore a p. 138) | sì | sì: $V=V_0(1+T/EA)$, $V_{max}/V_{min}=(1+T_1/EA)/(1+T_2/EA)$ | La dispensa usa la congruenza $\varepsilon=dw/dz=w'(z)$, il legame costitutivo $T=EA\varepsilon$, $d\ell=dz(1+T/EA)$ e la conservazione della massa ($dt=d\ell/v$, portata $d\ell_0/dt=V_0$). Non usa la parola «creep» (dice «micro slittamenti», «decadimento ipotesi d'aderenza»). |
| 60 | Rapporto di trasmissione reale e creep | 143–146 | **138** (anche 139) | sì | sì ma d060 è solo qualitativa | La dispensa dà la formula esatta $\tau=\dfrac{\omega_2}{\omega_1}=\dfrac{R_1}{R_2}\dfrac{1+T_2/EA}{1+T_1/EA}$, con $\tau=\tau^{ID}$ a coppia nulla, $\tau<\tau^{ID}$ con coppia e $\lim_{EA\to\infty}\tau=\tau^{ID}$ («cinghia rigida»). d060 dovrebbe riportarla. |
| 61 | Rendimento della trasmissione a cinghia | 145–146 | **135, 139** | sì | sì ($\eta=P_u/P_m<1$; $\eta=1+P_d/P_m$ equivale a $W_{diss}=-(1-\eta)C_1\omega_1$) | La dispensa va oltre: $\eta=\tau\,C_2/C_1=\tau R_2/R_1=V_2/V_1=\dfrac{1+T_2/EA}{1+T_1/EA}$ (p. 135, 139; verificato con SymPy). Questo è il rendimento del solo scorrimento elastico, e d061 non lo riporta. |
| 62 | Equilibrio infinitesimo del flessibile su puleggia | 151–154 | **140–141** | sì | sì: $dT=dF_T^{ATTR}$, $dF_N/d\theta=T-\rho V^2$, poi $dT/d\theta=f(T-\rho V^2)$ | Notazione della fonte: $f$, $\rho$, $V$, $dF_N$, $dF_T^{ATTR}$. La fonte scrive l'equilibrio alla D'Alembert (forza centrifuga come forza d'inerzia), mette la normale al centro del concio e motiva perché, e distingue concio in aderenza ($dT/dz=0$, $V^{rel}=0$) e in strisciamento ($dF_T=-f|dF_N|\,V^{rel}/|V^{rel}|$, p. 140). Refusi della fonte: $\sin(\theta/2)$ al posto di $\sin(d\theta/2)$ e $/2$ al posto di $/R$ (p. 141). |
| 63 | Equazione di Euler-Eytelwein | 154–156 | **141–142** (uso con $\theta^*=\beta$: 143) | sì | sì: $\dfrac{T-\rho V^2}{T_2-\rho V^2}=e^{f\theta}$ | La dispensa la chiama «equazione di Eulero» (mai «Eytelwein»). Ipotesi esplicite che d063 omette: $V=$ cost, $V_1\simeq V_2\simeq V$ perché $EA$ è molto grande; valore assoluto tolto imponendo $T>\rho V^2$; condizione $T(0)=T_2$ nella sezione di uscita. La forma senza centrifuga $T_1/T_2=e^{f\beta}$ compare solo nel freno a nastro (p. 153). |
| 64 | Legge di variazione della tensione lungo l'arco | 155–157 | **142** | sì | sì (SymPy: $T(\theta)=\rho V^2+(T_2-\rho V^2)e^{f\theta}$) | La dispensa lascia la legge in forma di rapporto, senza esplicitare $T(\theta)$. L'origine degli angoli è la sezione di **uscita** della cinghia dal contatto (p. 141). |
| 65 | Angolo minimo di scorrimento $\theta^*$ | 155–157 | **142** (definizione), 143, **151** (formula inversa) | parziale | sì | La formula $\theta^*=\frac1f\ln\frac{T_1-\rho V^2}{T_2-\rho V^2}$ in forma generica non c'è: compare solo per $\theta_2^*$ e $\theta_3^*$ nella verifica a tre pulegge (p. 151). La dispensa aggiunge $\theta^*+\alpha_1=\beta_1$ ($\alpha$ = arco di aderenza). A p. 142 l'elenco dei casi è sbagliato ($\theta^*=0$ chiamato «incipiente scorrimento globale»; vedi NdT). |
| 66 | Coppia massima trasmissibile | 157–160 | **143** (anche 152, 154) | sì | in parte | La dispensa scrive $C_{MAX}=(T_1-T_2)R=(T_2-\rho V^2)(e^{f\beta_{min}}-1)R$, con centrifuga e con $\beta_{min}$ (verificato con SymPy). d066 dà solo la «forma classica» $T_1/T_2\le e^{\mu\beta}$, senza $\rho V^2$ né $\beta_{min}$. |
| 67 | Puleggia limitante | 157–160 | **143** (estensione a 3 pulegge: 150–151) | sì | sì | La dispensa: $\theta^*=\min\{\beta_1,\beta_2\}$, «si sceglie l'angolo più piccolo». Né la dispensa né d067 dichiarano l'ipotesi che $f$ sia uguale sulle due pulegge: il criterio generale è il minimo di $f_i\beta_i$. |
| 68 | Tensione massima e condizione di resistenza della cinghia | 160–165 | — (la sezione «TENSIONE MASSIMA» di p. 143 tratta un'altra cosa) | **no** | — | A p. 143 la «tensione massima» è la $T_1$ necessaria per trasmettere la coppia ($C_1=(T_1-T_2)R$) e serve a introdurre le zone di aderenza e scorrimento. Nel capitolo non ci sono una verifica $T_{max}\le T_{amm}$, una tensione ammissibile né contributi di flessione. Il contenuto di d068 non è nella dispensa. |
| 69 | Potenza trasmessa dalla cinghia | 165–170 | **143** ($C_{MAX}\omega_1=\dots R\omega_1$, $R\omega_1=V_1\simeq V$), **152** ($W^{MAX}=C_{MAX}\omega=\dots V$) | sì | sì | La dispensa chiama la potenza $W$ e non scrive mai $P=(T_1-T_2)v$ come tale: la ottiene moltiplicando $C_{MAX}$ per $\omega$. |
| 70 | Velocità ottima per massima potenza | 165–170 | **152** | sì, con **ipotesi diversa** | **no** | La dispensa fissa **$T_2$** (forzamento con tenditore sul ramo lasco): $W=(e^{f\theta^*}-1)(T_2V-\rho V^3)$, da cui $V=\sqrt{T_2/(3\rho)}$, cioè $\rho V^2=T_2/3$, con potenza nulla a $V=\sqrt{T_2/\rho}$ e il grafico $W(V)$. d070 fissa $T_1=T_{max}$ e ottiene $T_c=T_{max}/3$, che **non compare nella dispensa**. SymPy: all'ottimo della dispensa $T_1=T_2(1+2e^{f\beta})/3$, quindi $\rho V^2\neq T_1/3$. |
| 71 | Freno a nastro | 171–176 | **153** | sì | sì (rotazione oraria): $C_f=(T_1-T_2)R$, $T_1/T_2=e^{f\beta}$, $T_2=Fa/c$, $C_f=\frac{aR}{c}F(e^{f\beta}-1)$ | Nella dispensa $c$ è il braccio di $T_2$ e $a$ quello di $F$. La dispensa tratta anche il verso antiorario e il rapporto tra le coppie frenanti nei due versi («6,54 volte»), che d071 omette. Nel calcolo antiorario c'è un errore algebrico ($T_2=T_1e^{f\beta}$ invece di $T_1e^{-f\beta}$): il rapporto corretto è $e^{f\beta}$ (SymPy). |
| 137 | Geometria dell'angolo di avvolgimento | 130–131 | — | **no** | — | La dispensa dice solo $\beta_1+\beta_2=2\pi$ e $\beta_1<\beta_2$ (p. 132–134), più gli angoli di 120° dell'esempio a tre pulegge (p. 151). Non ci sono $\sin\gamma=(R_2-R_1)/a$, $\beta=\pi\mp2\gamma$ né la cinghia incrociata. Il contenuto di d137 è corretto (verificato a mano: aperta $\beta_{1,2}=\pi\mp2\gamma$, $\sin\gamma=(R_2-R_1)/a$; incrociata $\beta_1=\beta_2=\pi+2\gamma'$, $\sin\gamma'=(R_1+R_2)/a$) ma non viene dalla dispensa. |

---

## 2. Domande: differenze rispetto alla dispensa

### q11 — Freno a nastro (dispensa p. 153)
- **Notazione:** la domanda scrive $M_f$, $\mu$ e chiama $b$ il braccio del ramo collegato alla leva; la dispensa scrive $C_f$, $f$ e chiama $c$ quel braccio. Le formule coincidono: $M_f=\frac{Fa}{b}R(e^{\mu\beta}-1)$ equivale a $C_f=\frac{aR}{c}F(e^{f\beta}-1)$, per la rotazione oraria della figura, con il ramo lasco alla leva.
- **«$v=0$ per il nastro»:** la dispensa non lo dice esplicitamente. Usa $T_1/T_2=e^{f\beta}$ «dove theta* = beta», cioè con tutto l'arco in strisciamento. Le due cose sono coerenti.
- **Contenuto della dispensa che la risposta omette:** il calcolo per **entrambi i versi**. Con $\omega$ antioraria il ramo teso è quello sulla leva ($T_1=Fa/c$) e il rapporto tra le coppie frenanti vale $C_{f,or}/C_{f,antior}=e^{f\beta}$; la dispensa scrive «6,54 più grande». La domanda resta qualitativa. **Attenzione:** nella dispensa il conto antiorario contiene un errore ($T_2=T_1e^{f\beta}$, da cui $C_f=F\frac acR(1-e^{f\beta})<0$ e un rapporto che vale $-1$). Il risultato corretto è $C_f=F\frac acR(1-e^{-f\beta})$, con rapporto $e^{f\beta}$ (SymPy). Il 6,54 corrisponde a $e^{f\beta}=6{,}54$.
- **Contenuto assente dalla dispensa:** l'«effetto servo» («la tensione maggiore può aiutare il comando»). Nello schema della dispensa (un capo sul fulcro) la tensione del capo sulla leva si oppone sempre a $F$: cambia solo quale capo è teso. L'effetto servo vero richiede un freno differenziale, che la dispensa non tratta.

### q15 — Velocità ottima della cinghia (dispensa p. 152)
- **Ipotesi diversa (differenza sostanziale):** la domanda fissa $T_1=T_{max}$ e ottiene $P=(T_{max}-mv^2)(1-e^{-\mu\beta})v$, quindi $v_{opt}=\sqrt{T_{max}/(3m)}$ e $T_{c,opt}=T_{max}/3$. La dispensa fissa **$T_2=$ cost** (forzamento) e ottiene $W=(e^{f\theta^*}-1)(T_2-\rho V^2)V$, quindi $V=\sqrt{T_2/(3\rho)}$ e $\rho V^2=T_2/3$. Entrambi i conti sono giusti nelle rispettive ipotesi (SymPy), ma la «frase da ricordare» $T_c=T_{max}/3$ **non è nella dispensa**. Nel modello della dispensa la tensione massima all'ottimo vale $T_1=T_2(1+2e^{f\beta})/3$.
- **Fattore di Eulero:** la domanda usa $(1-e^{-\mu\beta})$ (perché fissa $T_1$), la dispensa $(e^{f\theta^*}-1)$ (perché fissa $T_2$).
- **Notazione:** la domanda usa $m$, $\mu$, $T_c$, $P$; la dispensa $\rho$, $f$, $\rho V^2$, $W$.
- **Omesso:** la velocità a potenza nulla $V=\sqrt{T_2/\rho}$ e il diagramma $W(V)$ (parte da zero, ha il massimo in $\sqrt{T_2/3\rho}$ e torna a zero in $\sqrt{T_2/\rho}$). Omessa anche la frase «massimo dei massimi»: $C_{MAX}$ è già massimizzata rispetto a $\theta^*=\beta_{min}$.
- **Impaginazione:** nella versione estratta il risultato appare come «$T_{max}/\sqrt{3m}$». Va controllato che la radice copra l'intera frazione: $\sqrt{T_{max}/(3m)}$.

### q19 — Equazione di Eulero per la cinghia (dispensa pp. 140–142)
- **Formula finale:** coincide con la dispensa, $dT/d\theta=f(T-\rho V^2)$ e $\frac{T-\rho V^2}{T_2-\rho V^2}=e^{f\theta}$ (SymPy). La notazione è diversa: $m$ e $\mu$ al posto di $\rho$ e $f$, $dF_T$ al posto di $dF_T^{ATTR}$.
- **Ipotesi che la risposta omette:** la dispensa integra supponendo $V=$ cost, $V(\theta)\simeq V_1\simeq V_2\simeq V$, «posso farlo per $EA>>>$ quindi $\varepsilon<<$» (p. 142). Senza questa ipotesi la separazione delle variabili non è lecita, perché $V$ dipende da $T$.
- **Condizione iniziale:** la dispensa prende l'origine «in corrispondenza della sezione di uscita della cinghia dal contatto», con $T(0)=T_2$ «che è quella in uscita». Questo vale per la motrice. Sulla condotta la cinghia esce con $T_1$, quindi la formulazione della domanda («all'inizio della zona di scorrimento») è più generale e corretta.
- **Contenuti della dispensa che il professore può chiedere:** perché la normale si applica al centro del concio (l'errore di un'altra posizione è di ordine superiore); l'impostazione alla D'Alembert con la forza centrifuga come unica componente della forza d'inerzia ($\dot\omega=0$); il concio in aderenza ($dT/dz=0$, $V^{rel}=0$, $dF_T=0$) contro quello in strisciamento ($dF_T=-f|dF_N|V^{rel}/|V^{rel}|$); il valore assoluto tolto imponendo $T>\rho V^2$; la necessità del pretensionamento ($T_2$ sopra il valore limite, p. 140).
- La risposta è corretta dove la dispensa ha refusi ($\sin(\theta/2)$, $dmV^2/2$, p. 141). In più la risposta sottintende, come la dispensa, che $dF_T=\mu\,dF_N$ vale solo nell'arco di scorrimento.

### q44 — Cinghie: $\tau_{id}$ e $\tau_{eff}$ (dispensa pp. 132, 135, 138–139)
- **Formule:** coincidono. $\tau_{id}=\omega_c/\omega_m=R_m/R_c$ (p. 132), $V(T)=V_0(1+T/EA)$ e $\tau_{eff}=\frac{R_m}{R_c}\frac{1+T_2/EA}{1+T_1/EA}$ (p. 138), $\eta=\frac{1+T_2/EA}{1+T_1/EA}$ (p. 139). Tutto verificato con SymPy.
- **Lessico:** la dispensa non usa il termine «creep» né la notazione $\tau_{eff}$. Scrive $\tau$, «micro slittamenti», «Tao», «strisciamento».
- **Derivazione di $\eta$:** la domanda dice «dalle dispense» senza ricavarlo. La dispensa lo ricava in due modi: (a) $\eta=\tau C_2/C_1$ con $C_2/C_1=R_2/R_1$, da cui $\eta=V_2/V_1$ (p. 135); (b) $\tau_{id}=\tau/\eta$ dalla T.F.V. con $W_{diss}=-(1-\eta)C_1\omega_1$ (p. 139). Il professore può chiederlo.
- **Omesso:** $\lim_{EA\to\infty}\tau=\tau^{ID}$ anche con coppia ($C_1,C_2\neq0$, «cinghia rigida»); $\tau=\tau_{ID}$ a coppia nulla, con tutto l'arco in aderenza e potenza dissipata nulla; la conseguenza pratica (τ non costante, quindi ruote dentate, cinghie dentate, catene, p. 139 e 146); il fatto che un riduttore di giri sia un moltiplicatore di coppia (p. 135 e 139).

### q45 — Legge di variazione della tensione (dispensa pp. 142–147)
- **Formule:** coincidono, $T(\theta)$ e $\theta^*$. Nella dispensa però $\theta^*=\frac1f\ln(\dots)$ è scritta esplicitamente solo per la verifica a tre pulegge (p. 151).
- **Notazione:** la dispensa chiama $\alpha$ l'arco di aderenza e scrive $\theta^*+\alpha_1=\beta_1$ (p. 142). La domanda non usa $\alpha$.
- **Errori della dispensa da non ripetere:** a p. 142 si legge «se $\alpha=0$ … la coppia non potrà essere trasmessa» e «se $\theta^*=0$ si ha incipiente di scorrimento globale»; a p. 146 «$\theta^*=\alpha$». Corretto: $\theta^*=0$ significa coppia nulla, $\theta^*=\beta$ (ovvero $\alpha=0$) è l'incipiente scorrimento globale con coppia massima ancora trasmessa. Qui la domanda è corretta ed è coerente con p. 143–144 della dispensa.
- **Contenuti della dispensa che la risposta omette:** l'ordine «prima aderenza, poi scorrimento» nel verso del moto, con lo scorrimento sempre dal lato dell'uscita, e la dimostrazione per assurdo di p. 146 (se ci fosse prima scorrimento la cinghia «scapperebbe» avanti e l'attrito sarebbe concorde alla coppia); la velocità della cinghia nella zona di scorrimento (minore della periferica sulla motrice, p. 144); l'analogia con l'impronta del pneumatico (p. 145–146); il metodo di ipotesi e verifica con tre pulegge (p. 150–151).
- **Puleggia limitante:** la domanda dice «a parità delle altre condizioni». Va precisato che serve lo stesso $f$, quindi il criterio è $\min f\beta$.

### q46 — Potenza e velocità ottima (dispensa pp. 143, 152)
- Valgono tutte le differenze di q15: ipotesi $T_1=T_{max}$ nella domanda, $T_2=$ cost nella dispensa.
- **$P_{max}$:** il valore $P_{max}=\frac23T_{max}(1-e^{-\mu\beta})\sqrt{T_{max}/(3m)}$ è giusto nel suo modello (SymPy), ma la dispensa non calcola la potenza massima. L'analogo nel modello della dispensa è $W^{MAX}=\frac23T_2(e^{f\beta}-1)\sqrt{T_2/(3\rho)}$ (SymPy), che la dispensa non scrive.
- **Interpretazione:** la dispensa indica esplicitamente la velocità di potenza nulla $T_2-\rho V^2=0$, cioè $V=\sqrt{T_2/\rho}$, e osserva che la potenza è funzione di $\omega$ perché $V=\omega R$ con $R$ costante. La domanda non ne parla.
- **Contenuto collegato che la risposta omette:** p. 154, dove il tenditore sul ramo lasco dà una $C^{max}$ $e^{f\beta_{min}}$ volte maggiore che sul ramo teso (SymPy). È l'argomento che nella dispensa giustifica l'ipotesi $T_2=$ cost.

---

## 3. Derivazioni della dispensa che non compaiono tra le dimostrazioni assegnate
| Derivazione | PDF |
|---|---|
| Curvatura «a gradino» nei 4 punti di tangenza ($k=0\to1/r_1$) e raccordi parabolici | 133–134 |
| Equilibrio alla rotazione delle pulegge: $C_1=(T_1-T_2)R_1$, $C_2=(T_1-T_2)R_2$, $T_1\neq T_2$ se $C\neq0$, $C_1/C_2=\omega_2/\omega_1=\tau^{ID}$ | 134 |
| T.F.V. ideale e reale, «riduttore di giri = moltiplicatore di coppia», $\tau=\eta\,C_1/C_2$ | 135, 139 |
| Elementino deformato: congruenza $\varepsilon=w'(z)$, Hooke, $d\ell=dz(1+T/EA)$ | 138 |
| $\eta=(1+T_2/EA)/(1+T_1/EA)=V_2/V_1$ ricavato da $\tau_{id}=\tau/\eta$; $W_{diss}=-(1-\eta)C_1\omega_1$; $\lim_{EA\to\infty}\tau=\tau^{ID}$ | 138–139 |
| Concio in aderenza / in strisciamento, forza d'attrito $dF_T=-f\lvert dF_N\rvert V^{rel}/\lvert V^{rel}\rvert$ | 140 |
| $\theta^*+\alpha_1=\beta_1$; criterio della puleggia che va per prima in incipiente scorrimento globale | 142–143 |
| Ordine aderenza→scorrimento e dimostrazione per assurdo; distribuzione di velocità nell'arco | 144, 146 |
| Metodo per gli esercizi ($C_i=(T_1-T_2)R_i$ usata $N-1$ volte, Eulero, forzamento) | 147 |
| Forzamento: $\alpha T_1+\beta T_2=$ cost (base mobile) / $T_2=$ cost (rullo); $F_p=2T_2\sin\frac\alpha2$; $F_p=F_m$; $F_p=P\,b_1/b_2$; $Q=(T_1+T_2)\cos\alpha$; $(T_1+T_2)/2=T_0$ (solo enunciata) | 147–149 |
| Tre pulegge: $T''<T'''<T'$, $C_1=C_2+C_3$ (equilibri e T.F.V.), partitore/combinatore, ipotesi e verifica $\theta_2^*\le\beta_2$, $\theta_3^*\le\beta_3$, forzamento minimo $F_K=2T''\sin\alpha$ | 150–151 |
| Tenditore sul ramo lasco e non sul teso (argomento della centrifuga) | 151 |
| $C^{MAX}$ e $W^{MAX}$ a forzamento fissato, velocità a potenza nulla $\sqrt{T_2/\rho}$, grafico $W(V)$ | 152 |
| Freno a nastro: direzioni preferenziali, rapporto delle coppie frenanti nei due versi | 153 |
| $C^{max}\vert_{lasco}/C^{max}\vert_{teso}=e^{f\beta_{min}}$ | 154 |

Verifica aggiunta (non scritta nella dispensa): nel caso a tre pulegge con $\theta_1^*=\beta_1$ si ha esattamente $\theta_2^*+\theta_3^*=\beta_1$ (somma dei logaritmi). Quindi se $\beta_2,\beta_3\ge\beta_1$ la verifica di p. 151 è soddisfatta automaticamente.

---

## 4. Simboli del capitolo
| Simbolo | Significato | PDF |
|---|---|---|
| $EA$, $EJ_x$ | rigidezza assiale ($\neq0$) e flessionale ($\cong0$) della cinghia | 132–133 |
| $r_1,r_2$ / $R_1,R_2$ / $R_M,R_C$ | raggi delle pulegge (motrice 1, condotta 2) | 132 |
| $\omega_1,\omega_2$ / $\omega_M,\omega_C$ / $\omega_m,\omega_c$ | velocità angolari | 132, 135 |
| $C_1,C_2$ ($C_m$, $C_c$) | coppia motrice (concorde a $\omega_1$) e resistente (opposta a $\omega_2$) | 132, 134 |
| $\beta_1,\beta_2$ | angoli di avvolgimento ($\beta_1+\beta_2=2\pi$, $\beta_1<\beta_2$) | 132 |
| $\tau^{ID}$, $\tau_{ID}$, $\tau_{id}$, «Tao» | rapporto di trasmissione ideale $\omega_2/\omega_1=r_1/r_2$ | 132, 135, 138–139 |
| $\tau$ | rapporto di trasmissione effettivo $\omega_2/\omega_1$ | 135, 138–139 |
| $P_1,Q_1,P_2,Q_2$ | punti di tangenza dei rami | 132, 134, 144 |
| $T_1,T_2$ | tensioni nel ramo teso e nel ramo lasco (Tsup = Tmax, Tinf = Tmin) | 134, 136, 143 |
| $T^{(M)},T^{(V)}$ | tensioni sui rami a monte / a valle della puleggia (lettura incerta) | 134 |
| $\underline t_1,\underline t_2$ | versori tangenti alla periferia | 134 |
| $\eta$ | rendimento | 135, 139 |
| $\mathcal P_{DISSIPATA}$, $W^{ATTR}_{DISS}$ | potenza dissipata per attrito ($<0$) | 135, 139 |
| $V_1,V_2$ | velocità della cinghia sulla motrice e sulla condotta | 135–136, 138 |
| $V_0$ | velocità della cinghia a $T=0$ (portata $d\ell_0/dt$) | 138 |
| $\varepsilon$, $w(z)$, $d\ell_0$, $d\ell$, $dz$ | deformazione, spostamento, lunghezza indeformata e deformata | 138 |
| $F$, $F_E$, $F_{CO}$, $F_{IM}$ | forza premente, forze esterne, forze di contatto, forza d'inerzia | 140–141 |
| $dF_N$, $dF_T^{ATTR}$ | azione normale e d'attrito della puleggia sul concio | 140–141 |
| $V^{rel}$ | velocità relativa cinghia-puleggia | 140 |
| $f$ | coefficiente d'attrito | 140–154 |
| $\rho$ | massa per unità di lunghezza (non definita esplicitamente) | 141–154 |
| $\theta$, $s=R\theta$ | posizione angolare sull'arco (origine nella sezione d'uscita) | 141 |
| $\theta^*$ | angolo (arco) di scorrimento | 142–152 |
| $\alpha_1$ ($\alpha$) | arco di aderenza ($\theta^*+\alpha_1=\beta_1$) | 142, 146 |
| S.I.G., I.S.G. | (incipiente) scorrimento incipiente globale | 143, 154 |
| $\beta_{min}$ | angolo di avvolgimento minimo (limitante) | 143, 152, 154 |
| $C_{MAX}$, $C^{MAX}$ | coppia massima trasmissibile | 143, 152, 154 |
| $S_1,S_2$ | punti di separazione tra aderenza e scorrimento | 144 |
| $i$ | interasse (solo in figura) | 144 |
| $F_t$ | forza tangenziale nell'impronta del pneumatico | 145 |
| $\alpha,\beta$ (in $\alpha T_1+\beta T_2=$ cost) | coefficienti dell'equazione di forzamento | 147 |
| $F_p$, $F_m$, $P$, $b_1,b_2$, $d$ | forza sul rullo, forza della molla, peso, bracci, diametro | 148 |
| $\alpha$ (tenditore e base mobile) | angolo di deviazione/inclinazione dei rami | 148, 151 |
| $Q$ | forza del contrappeso sulla base mobile | 148 |
| $T_0$ | tensione iniziale di forzamento | 149 |
| $T',T'',T'''$ | tensioni massima, minima e intermedia (tre pulegge) | 150–151 |
| $T_{max}$, $T_{min}$, $T_{int}$ | stesse tensioni nella figura a tre pulegge | 150 |
| $F_K$, $\omega_4$ | forza della molla del tenditore e sua velocità angolare | 151 |
| $W$, $W^{MAX}$ | potenza, potenza massima | 152 |
| $A$ | valore costante imposto dal tenditore | 154 |
| $C_f$, $c$, $a$, $d$ | coppia frenante, braccio di $T_2$ (o $T_1$) rispetto al fulcro, braccio di $F$, diametro del tamburo | 153 |
| $dF_t$ | azioni d'attrito del nastro sul tamburo | 153 |

### Conflitti di notazione
1. **Attrito:** nella dispensa è sempre $f$; tutte le fonti derivate usano $\mu$.
2. **Massa lineare e centrifuga:** la dispensa scrive $\rho$ e $\rho V^2$; le domande scrivono $m$ e $mv^2$ e le dimostrazioni $\rho_l$ e $T_c$. La dispensa non usa mai il simbolo $T_c$ né l'espressione «tensione centrifuga».
3. **$\alpha$ ha quattro significati:** arco di aderenza (p. 142, 146); coefficiente in $\alpha T_1+\beta T_2=$ cost (p. 147); angolo totale di deviazione del ramo sul rullo, in $F_p=2T_2\sin\frac\alpha2$ (p. 148); inclinazione di ciascun ramo, in $Q=(T_1+T_2)\cos\alpha$ (p. 148) e $F_K=2T''\sin\alpha$ (p. 151). Anche **$\beta$** è sia angolo di avvolgimento sia coefficiente (p. 147).
4. **$T_1,T_2$:** nelle equazioni indicano il ramo teso e il ramo lasco. Nella figura di p. 134 il pedice indica invece la puleggia, con apici (M)/(V). Nel freno antiorario (p. 153) $T_1$ diventa il capo sulla leva. Nel caso a tre pulegge «$T_1=T_{max}$» significa $T'$ (p. 150).
5. **Coppie in modulo o algebriche:** a p. 134–135 la dispensa usa i moduli ($C_1/C_2=+\omega_2/\omega_1$); a p. 139 e 150 valori algebrici ($C_1/C_2=-\tau/\eta$) mescolati con i moduli ($C_1=C_2+C_3$).
6. **Verso del rapporto:** la dispensa usa $\tau=\omega_2/\omega_1$, d055 scrive $\omega_1/\omega_2=R_2/R_1$ (cioè $1/\tau$).
7. **Potenza:** la dispensa scrive $W$ (p. 152) e $\mathcal P$ (p. 135), con $W_{diss}$ per la potenza dissipata; le fonti derivate scrivono $P$.
8. **Coppia frenante e bracci:** la dispensa scrive $C_f$ con bracci $a$ (per $F$) e $c$ (per il capo sulla leva); q11 scrive $M_f$ con bracci $a$ e $b$.
9. **Velocità e raggi:** $V$ maiuscola nella dispensa e $v$ nelle fonti derivate; raggi $r_1$ e $R_1$ entrambi usati nella dispensa (p. 132).
