# Capitolo 2 — ATTRITO E ADERENZA · riscontro con dimostrazioni e domande
Fonte di verità: `cap2.md` (dispensa PDF p. 67–102). Fonti derivate confrontate: dimostrazioni d024–d037, d136 (`/home/claude/work/dd/`); domande q18, q20, q32–q36 (`/home/claude/work/dq/`).
Tutti i conti citati come «verificato» sono stati rifatti con SymPy (momenti con verso antiorario positivo).

## 1. Tabella delle dimostrazioni

| n. | Titolo | Pagine dichiarate | Pagine reali (PDF) | Presente | Risultato coincide? | Note |
|---|---|---|---|---|---|---|
| 24 | Legge di Coulomb e cono d'attrito | 67–71 | 69 (aderenza/attrito), 73–74 (angolo e cono) | sì | sì | Fonte: $F_{ad}\le F_{ad,max}=f_{ad}F_N$, $\varphi_{ad}=\tan^{-1}f_{ad}$ (p. 73), «cono di **aderenza**» (p. 74); d024 usa $\mu$, $F_T$ e lo chiama «cono d'attrito». La fonte distingue anche $\varphi_{att}=\tan^{-1}f_{att}$ (angolo di attrito, in strisciamento) e $f_{att}<f_{ad}$: d024 non lo dice. Le pagine dichiarate 70–71 sono il piano inclinato, non il cono. |
| 25 | Attrito perno-boccola e cerchio d'attrito | 72–74 | 81–83 (§2.2.5) | sì | parziale | Fonte: $r^*=R\sin\varphi_{att}$, momento $=R_P\,r^*$ con $R_P=F$ (risultante verticale). d025 scrive $M_f=\mu NR$ e $N\rho=M_f\Rightarrow\rho=\mu R$: usa la **normale** $N$ come forza eccentrica, mentre nella fonte la forza eccentrica è la **risultante** $R_P=F$; con la risultante il raggio esatto è $R\sin\varphi$. Verificato: $f\,N\,R=F R\sin\varphi$ (perché $N=F\cos\varphi$, $f=\tan\varphi$), quindi i due momenti coincidono, ma $\rho=\mu R$ è un'approssimazione di $r^*$ che la fonte **non scrive**. d025 dice «al limite $F_T=\mu N$»: nella fonte è attrito di strisciamento ($f_{att}$), non limite di aderenza. Pagine dichiarate errate. |
| 26 | Impuntamento: condizione limite | 75–79 | 79–81 (§2.2.4) | parziale | no | La fonte non usa la costruzione geometrica col cono: scrive l'equilibrio del corsoio (contatti A in alto a sinistra e B in basso a destra) e ottiene $Q=\dfrac{F}{1-2ef_{att}/h}$, impuntamento per $e/h\to 1/(2f_{att})$. d026 dà solo «angolo richiesto ≤ φ», che nella fonte non c'è, e omette la formula. Pagine dichiarate 75–79 = scala e cuneo. |
| 27 | Ribaltamento: condizione limite | 75–79 | — (solo spunto a p. 68; ribaltamento del veicolo a p. 94–95, 102) | no | — | La fonte non tratta il ribaltamento di un corpo appoggiato. A p. 68 ricava lo spostamento della normale $b=Fh/(Mg)$; il limite «$b$ = metà base» non è scritto. Il ribaltamento è svolto solo per l'auto in curva (ruota interna scarica, momenti rispetto alla ruota esterna). |
| 28 | Attrito volvente | 82–89 | 83–88 (§2.3) | sì | sì (con riserva) | Fonte p. 88: $-F_Nu+F_{T,ad}h=0\Rightarrow F_{T,ad}=\frac uR F_N$, $f_v=u/R$. Nell'equazione dei momenti il braccio è $h$ (altezza del centro, $h<R$), nel risultato $R$: approssimazione $h\simeq R$ non dichiarata. d028 parla di «forza $F_v$ al raggio $R$»; nella fonte è la forza di aderenza al suolo della ruota folle. Il modello a molle e l'isteresi (p. 84–87) non sono in d028. |
| 29 | Coppia massima trasmissibile per aderenza | 84–85 | 90 (e 100) | parziale | sì | La fonte scrive solo $C_m=F_{T,A}R=Ma_{max}R$ (trazione anteriore) e, a p. 101, «coppia massima trasmissibile a parità di raggio». $C_{max}=\mu NR$ non è scritta così. Pagine dichiarate errate (84–85 = orma di contatto). |
| 30 | Accelerazione massima: schema generale | 90–92 | 89–91 (LaTeX), 100–101 (manoscritto) | sì | sì | Ipotesi della fonte: partenza a bassa velocità, resistenza aerodinamica trascurabile e resistenza al rotolamento trascurabile ($f_v\ll f_{ade}$). |
| 31 | Accelerazione massima: trazione anteriore | 91–92 | 89–90, 100 | sì | sì (ma incompleto) | Fonte: $a_{max}=f_{ad}g\dfrac{l_2}{l_1+l_2+f_{ad}h}$ (p. 90) = $\dfrac{\mu g c_r}{c_r+c_f+\mu h}$ (p. 100). d031 non scrive la formula, dà solo il confronto qualitativo (verificato: $f g l_2/L > f g l_2/(L+fh)$). |
| 32 | Accelerazione massima: trazione posteriore | 91–92 | 91, 101 | sì | **la fonte è incoerente** | LaTeX p. 91: $a_{max}=f_{ad}g\dfrac{l_2}{l_1+l_2-hf_{ad}}$ (**errato**); manoscritto p. 101: $a_{max}=\dfrac{\mu g c_f}{c_r+c_f-\mu h}$ (**corretto**). Verificato: dai momenti rispetto all'asse anteriore $F_{N,B}=M(gl_1+ah)/L$, quindi a numeratore va $l_1$ (= $c_f$, distanza G–asse anteriore). d032 resta implicito ($Ma=\mu N_{post}(a)$) e non segnala l'errore. |
| 33 | Dinamica laterale in curva: reazioni normali | 92–96 | 93–95, 102 | parziale | sì nei valori, **convenzione diversa** | Fonte: curva a destra, D = ruota **interna**: $F_{ND}=\frac{Mg}{2}-\frac{Mv^2h}{Rc}$ (momenti rispetto ad A, ruota esterna). d033 scrive $N_{D,S}=Mg/2\pm Mv^2h/(cR_c)$ con il segno + su D, cioè con D **esterna**: è l'opposto della fonte. La fonte non scrive $F_{NS}$ (si ricava: $Mg/2+Mv^2h/(Rc)$) né usa il polo «centro della carreggiata». Ipotesi implicita (non dichiarata in nessuna delle due): baricentro a metà carreggiata. |
| 34 | Velocità limite di ribaltamento in curva | 94–96 | 94–95, 102 | sì | sì | $v_{max}=\sqrt{Rcg/(2h)}$ in entrambe; la fonte aggiunge il commento su F1 e camion ($c/h$). |
| 35 | Velocità limite di aderenza in curva | 96 | 94 (auto), 96 (moto), 102 | sì | sì | $v_{max}=\sqrt{f_{ad}gR}$. La fonte lo ricava anche per la moto con l'angolo di piega: $\tan\alpha=v^2/(gR)$, limite $\alpha=\varphi_{ad}$ (p. 96, 102): d035 non lo cita. |
| 36 | Cuscinetto volvente: cinematica del corpo volvente | 97–99 | 98 | sì | parziale | Fonte: $V_G=\frac{V_E+V_I}{2}$, $\omega_v=\frac{\omega_eR_e-\omega_iR_i}{R_e-R_i}$, $\omega_g=\frac{\omega_eR_e+\omega_iR_i}{R_e+R_i}$ (formula del corpo rigido sui punti E, I dell'elemento). d036 si ferma alle «due equazioni» e non dà i risultati espliciti né la velocità della gabbia. Nella fonte manca un fattore 2 in un passaggio intermedio (risultato giusto; v. cap2.md p. 98). |
| 37 | Cuscinetto volvente: distribuzione del carico | 99 | 98–99 | sì | parziale + **notazione invertita** | Fonte: $\delta_i=\delta_0\cos(i\gamma)$, $\delta=kP$ (rulli) ⇒ $P_i=P_0\cos(i\gamma)$, $Q=P_0\sum_{-z/4}^{z/4}\cos^2(i\gamma)\simeq P_0z/4$ ⇒ $P_0=4Q/z$; sfere $P_0=4{,}37Q/z\simeq5Q/z$. d037: $\sum Q_i\cos\theta_i=P$, cioè $Q$ per i carichi sui corpi volventi e $P$ per il carico esterno: **l'opposto della fonte** ($Q$ esterno, $P_i$ sui corpi). d037 non arriva a $P_0=4Q/z$. Verificato: $\frac1\pi\int_{-\pi/2}^{\pi/2}\cos^2=\frac12$. |
| 136 | Decelerazione massima del veicolo | 100–102 | 92 (LaTeX), 101 (manoscritto) | parziale | sì sul risultato | Fonte: solo traslazione e verticale, somma delle aderenze ⇒ $a_{max}=f_{ad}g$ «se la frenata è ripartita correttamente». La fonte **non** scrive l'equazione dei momenti né $N_{ant}(a)$, $N_{post}(a)$ (passi 1–3 di d136 non sono nella dispensa). Verificato: ripartizione ideale $F_{T,A}/F_{T,B}=(l_2+f h)/(l_1-f h)$. |

## 2. Domande

### q18 — Attrito perno-boccola (fonte PDF p. 81–83)
- **Notazione**: q18 usa $T$, $N$, $Q$ (risultante), $\mu$, $\phi$; la fonte usa $\vec R_T$, $\vec R_N$, risultante $\vec R_Q$ (testo) / $R_P$ (figura), $f_{att}$, $\varphi_{att}$. In q18 $Q$ è la risultante di contatto; nella fonte $Q$ è la forza sul corsoio (p. 79) e il carico sul cuscinetto (p. 98).
- $r^*=R\sin\phi$: coincide (p. 82). $M_r=Fr^*=FR\sin\phi$: coincide con «$R_P\,r^*$». L'approssimazione $r^*\simeq\mu R$, $M_r\simeq\mu FR$ **non è nella fonte** (corretta, verificata).
- Omesso dalla risposta ma presente nella fonte: perché il contatto si sposta (con $\omega$ oraria la velocità di $P$ è verso sinistra, l'attrito spinge il perno a «salire» sul lato destro, p. 82); la pendenza di $OP$ rispetto alla verticale è proprio $\varphi_{att}$; il contatto in un solo punto produce pressioni elevate, potenza dissipata concentrata, aumento di temperatura e usura (p. 83).
- Formulazione della fonte da conoscere: il cerchio è «tangente alla risultante della forza di attrito» (p. 82; in realtà alla risultante delle forze di contatto).

### q20 — Accelerazione massima (fonte PDF p. 89–91, 100–101)
- **Conflitto di notazione interno a q20**: $a$ indica sia la distanza G–asse anteriore sia l'accelerazione (es. «$N_R=M\frac{ga+ah}{L}$», con le due $a$ diverse). La fonte usa $l_1$ (A–G), $l_2$ (G–B) nel LaTeX e $c_f$, $c_r$ nel manoscritto; $a$ è sempre l'accelerazione (a p. 100 $a,b$ sono distanze solo nella trave d'esempio).
- Trazione anteriore: coincide ($b\leftrightarrow l_2\leftrightarrow c_r$).
- Trazione posteriore: q20 dà $\mu g a/(L-\mu h)$, corretto (verificato). La «nota sulle dispense» di q20 è giusta per il LaTeX di p. 91 ($l_2$ al numeratore, errato), ma **il manoscritto di p. 101 ha la formula corretta** ($c_f$ al numeratore): q20 non lo dice.
- «Fisicamente è maggiore»: vero solo a pari ripartizione statica; in generale serve $l_1(L+\mu h)>l_2(L-\mu h)$ (verificato; es. 60 % del peso sull'anteriore, $h=0{,}2L$, $\mu=1$: le due accelerazioni sono uguali, $0{,}5g$). La fonte fa la stessa affermazione senza condizione.
- Dragster: q20 $a=gb/h$ coincide con p. 101 ($a=g c_r/h$, «si scarica la condotta»). La fonte aggiunge $=g f_a$ (lettura incerta): significa che si raggiunge quando $\mu=c_r/h$; q20 non collega la condizione all'aderenza.
- Omesso: $C_m=F_{T,A}R=Ma_{max}R$ (p. 90, 100); elenco delle resistenze al moto (rotolamento, aerodinamica, pendenza, variazione di energia cinetica, p. 89); decelerazione massima $a_{max}=f_{ad}g$ (p. 92) che il professore può chiedere insieme.

### q32 — Attrito, attrito radente e aderenza (fonte PDF p. 67–74)
- **Notazione**: q32 $\mu_s$, $\mu_d$, $F_T$; fonte $f_{ad}$, $f_{att}$ nel testo, $f_s$, $f_d$ nella tabella (p. 70), $\vec F_T$/$\vec F_{ad}$/$\vec F_{att}$.
- «Leggi di Coulomb» (indipendenza da pressione, area apparente, velocità) e «area reale ≪ area apparente, microgiunzioni»: **assenti nella fonte**. La fonte parla solo di asperità che si compenetrano, rottura o deformazione delle asperità con micro usura; $f_{ad}$ dipende dalla rugosità, $f_{att}$ da materiali, usura e condizioni delle superfici, e $f_{att}<f_{ad}$.
- Forma vettoriale $\vec F_T=-\mu_dN\,\vec v_{rel}/|\vec v_{rel}|$: nella fonte c'è solo a parole (stessa direzione, verso opposto alla velocità relativa).
- Piano inclinato: $\tan\alpha\le\mu_s$ coincide (p. 71). Omesso il caso di attrito $a_y=g(f_{att}\cos\alpha-\sin\alpha)$ (p. 71).
- Omesso dalla risposta ma nella fonte: spostamento della normale $b=Fh/(Mg)$ e pressione non uniforme (p. 68); ruota su piano, $F_{ad}=F\frac{MR^2-I_G}{MR^2+I_G}$ e $F\le f_{ad}Mg\frac{MR^2+I_G}{MR^2-I_G}$ (p. 73); angolo di attrito $\varphi_{att}$ distinto da $\varphi_{ad}$ (p. 74); applicazioni scala (con i tre casi: $f_A=0$ impossibile, $f_B=0$ possibile, entrambi ≠0 iperstatico, p. 75–76) e cuneo (p. 77–79); valori della tabella (p. es. pneumatico/strada 0,6–0,9 e 0,8–1,1).

### q33 — Ribaltamento (fonte PDF p. 68, 94–95, 102)
- Blocco spinto orizzontalmente ($F_{rib}=Mg\,b/(2h)$, confronto $b/(2h)<\mu$): **non c'è nella fonte**. Il conto è corretto (verificato) ed è coerente con p. 68 ($b_{fonte}=Fh/(Mg)$ = metà base al limite). **Conflitto di notazione**: in q33 $b$ è la larghezza della base, nella fonte (p. 68) $b$ è lo spostamento della normale.
- Veicolo: $N_{int}=0$, $v_{rib}=\sqrt{Rcg/(2h)}$ coincide (p. 95, 102); la fonte chiama $R_v$ il raggio in un passaggio.
- Confronto $v_{rib}$ vs $v_{slip}$: la fonte non lo scrive; il ribaltamento precede se $c/(2h)<f_{ad}$ (verificato).
- Omesso: l'espressione di $F_{ND}$ al variare di $v$ (p. 95), il caso del motociclo (p. 95–96), la derivazione $a=\omega^2R=V^2/R$ (p. 102), il commento F1/camion.

### q34 — Impuntamento (fonte PDF p. 79–81)
- Formula finale $Q=F/(1-2\mu e/h)$ e limite $e/h=1/(2\mu)$: coincidono (fonte con $f_{att}$).
- q34 scrive l'equilibrio dei momenti come «$Nh=Qe$» senza i termini d'attrito. La fonte scrive $-F_{N,A}\frac h2-F_{N,B}\frac h2+F_{T,A}\frac a2-F_{T,B}\frac a2+Qe=0$: gli attriti compaiono e si elidono perché $F_{T,A}=F_{T,B}$ con bracci opposti $\pm a/2$ (verificato). All'orale va detto perché spariscono.
- Omesso: la rotazione antioraria del corsoio dovuta al gioco, i contatti in soli due punti (A spigolo superiore sinistro, B inferiore destro), $a$ = larghezza del corsoio, $h$ = distanza verticale tra A e B.
- «Retroazione positiva» e «ridurre $\mu$»: non nella fonte (che dice solo «$e/h$ il più piccolo possibile»), ma corretti.

### q35 — Attrito volvente (fonte PDF p. 83–88)
- $M_v=Nu$, $f_v=u/R$, $F_v=f_vN$: coincidono. Nella fonte l'equazione dei momenti della ruota folle ha braccio $h$ (altezza del centro, $h<R$): $F_{T,ad}=\frac uh F_N\simeq\frac uR F_N$; q35 scrive direttamente $F_TR=Nu$.
- q35: «forza equivalente applicata al centro»; nella fonte la forza è la forza di **aderenza al suolo** (ruota folle), in verso opposto al moto.
- Omesso: modello a molle dell'orma, $\theta_{max}=\arccos(h/R)$, deformazioni ≈ spostamenti verticali, legge di Hooke (p. 84–86); diagrammi energia spesa / recuperata / dissipata e punti simmetrici $P_1$, $P_2$ con $p_1>p_2$ (p. 86–87); tabella di $f_v$ (cuscinetti 0,0010–0,0020, ruota su rotaia $0{,}026/\sqrt d$, pneumatico su asfalto 0,013–0,015, fuoristrada 0,15–0,35, p. 88).
- «In avanti» di q35 = «verso la zona di compressione» della fonte: coincide.

### q36 — Cuscinetti volventi (fonte PDF p. 97–99, tabella p. 88)
- **Notazione**: q36 $r_i$, $r_s$, $\omega_1$, $v_P$, $v_C$, $R_s$; fonte $R_i$, $R_e$, $R_g$ ($R_G$), $r$, $\omega_i$, $\omega_e$, $\omega_v$, $\omega_g$, $V_E$, $V_I$, $V_G$, centro $\Omega$.
- Gabbia: q36 $\omega_g/\omega_1=r_i/(2(r_i+r_s))$; la fonte dà il caso generale $\omega_g=\frac{\omega_eR_e+\omega_iR_i}{R_e+R_i}$, che per $\omega_e=0$ e $R_e=R_i+2r_s$ dà lo stesso valore (verificato). Il «$\simeq1/2$» di q36 non è nella fonte; in realtà $\omega_g/\omega_i<1/2$ sempre.
- Omesso: velocità di rotazione propria $\omega_v=\frac{\omega_eR_e-\omega_iR_i}{R_e-R_i}$ (p. 98).
- Distribuzione del carico: q36 solo qualitativa; la fonte è quantitativa ($\delta_i=\delta_0\cos i\gamma$, $P_i=P_0\cos i\gamma$, $Q\simeq P_0z/4$, $P_0=4Q/z$ rulli, $\simeq5Q/z$ sfere, p. 98–99). La «fatica di contatto» di q36 **non è nella fonte**.
- Attrito: q36 $\alpha\simeq u/R_s\simeq f_v$; fonte $\sin\alpha=u/R=f_v$ (esatto), circonferenza di attrito volvente $\rho=R_g f_v$, $M_f=\sum\frac{P_i}{\cos\alpha}R_gf_v\simeq\frac5\pi QR_gf_v$, confronto col radente $M_p=QR_ef_d$ (p. 99). q36 omette $\rho$ e $M_f$.
- Omesso: $f_v$ indipendente da carico e velocità (vantaggio di regolarità, p. 97); classificazione radiali / assiali / obliqui con le figure INA-FAG e montaggio a coppie contrapposte (p. 97).

## 3. Derivazioni della dispensa non coperte dalle dimostrazioni assegnate
| Derivazione | Pagine PDF |
|---|---|
| Spostamento della normale per una forza orizzontale: $b=Fh/(Mg)$ | 68 |
| Piano inclinato: aderenza $\alpha\le\tan^{-1}f_{ad}$; attrito $a_y=g(f_{att}\cos\alpha-\sin\alpha)$ | 70–71 |
| Ruota su piano con forza in sommità: $F_{ad}=F\frac{MR^2-I_G}{MR^2+I_G}$, $\dot\omega=-\frac{2FR}{MR^2+I_G}$, condizione $F\le f_{ad}Mg\frac{MR^2+I_G}{MR^2-I_G}$ | 72–73 |
| Applicazione 1: scala appoggiata al muro, tre casi (costruzione grafica coi coni) | 75–76 |
| Applicazione 2: cuneo, $F_{12,N}$ e $F_1=(f'Mg+F_2)\frac{\cos\alpha(f''+f''')+\sin\alpha(1-f''f''')}{(1-f'f'')\cos\alpha-(f'+f'')\sin\alpha}$ | 77–79 |
| Impuntamento in forma analitica $Q=F/(1-2ef_{att}/h)$ (d026 non la riporta) | 80–81 |
| Orma statica: $\theta_{max}=\arccos(h/R)$, deformazione delle molle, Hooke | 84–86 |
| Isteresi ⇒ pressioni asimmetriche ⇒ spostamento $u$ | 86–87 |
| Ripartizione statica del peso come trave appoggiata: $F_B=Pa/(a+b)$, $F_A=Pb/(a+b)$ | 100 |
| Condizione di dragster: $F_{NA}=0\Rightarrow a=gc_r/h$ | 101 |
| Accelerazione centripeta $a_A=\omega^2R=V^2/R$ dalla formula del corpo rigido | 102 |
| Motociclo in curva: $\tan\alpha=v^2/(gR)$, $v_{max}=\sqrt{f_{ad}gR}$ | 95–96, 102 |
| Cuscinetto: velocità della gabbia $\omega_g$ e di rotazione propria $\omega_v$ (d036 le lascia implicite) | 98 |
| Media integrale $\overline{\cos^2}=1/2$, $Q=P_0z/4$, $P_0=4Q/z$ (rulli), $\simeq5Q/z$ (sfere) | 99 |
| Circonferenza di attrito volvente $\rho=R_gf_v$; $M_f\simeq\frac5\pi QR_gf_v$; radente $M_p=QR_ef_d$ | 99 |

## 4. Simboli del capitolo
| Simbolo | Significato | Pagina PDF |
|---|---|---|
| $M$, $m$ | massa (maiuscola nel LaTeX, minuscola nel manoscritto) | 67, 100 |
| $\vec F_N$, $F_N$ ($F_n$) | reazione normale | 67, 88 |
| $\vec F_T$, $\vec F_{ad}$, $F_{ad,max}$ | forza tangenziale di aderenza, suo massimo | 68–69 |
| $F_{att}$ | forza di attrito (strisciamento) | 69 |
| $f_{ad}$ ($f_{ade}$, $f_s$) | coefficiente di aderenza | 69, 70, 89 |
| $f_{att}$ ($f_d$) | coefficiente di attrito | 69, 70 |
| $\mu$ | coefficiente di aderenza nelle pagine manoscritte | 100–102 |
| $f'_{att},f''_{att},f'''_{att}$ | attrito corpo 2–piano, 2–1, cuneo–parete | 78–79 |
| $\varphi_{ad}$ | angolo di aderenza $=\tan^{-1}f_{ad}$ | 73 |
| $\varphi_{att}$ | angolo di attrito $=\tan^{-1}f_{att}$ | 74, 82 |
| $\alpha$ | inclinazione del piano (70); inclinazione della risultante (73); angolo del cuneo dalla verticale (77); angolo di piega della moto (95); inclinazione del carico sul corpo volvente (99) | vari |
| $b$ | spostamento della normale (68); distanza nella trave d'esempio (100) | 68, 100 |
| $h$ | altezza di applicazione di $F$ (68, 74); distanza verticale A–B del corsoio (80); altezza del centro ruota deformata (84, 88); altezza del baricentro del veicolo (90 ss.) | vari |
| $e$ | eccentricità di $\vec Q$ | 79–80 |
| $a$ | larghezza del corsoio (80); accelerazione (71, 90 ss.); distanza nella trave (100) | vari |
| $Q$ | forza di comando del corsoio (79); carico radiale sul cuscinetto (98) | 79, 98 |
| $R$ | raggio ruota (72, 84), raggio albero (81), raggio di curvatura (93; anche $R_v$, 94, 96), raggio del corpo volvente (99) | vari |
| $\vec R_N,\vec R_T,\vec R_Q/R_P$ | normale, attrito, risultante nel perno | 81–83 |
| $r^*$ | raggio del cerchio di attrito $=R\sin\varphi_{att}$ | 82 |
| $u$ | parametro di attrito volvente | 87 |
| $f_v$ | coefficiente di attrito volvente $=u/R$ | 88 |
| $\theta,\theta_{max}$ | posizione angolare della molla, semiapertura dell'orma | 85 |
| $P_1,P_2$; $p_1,p_2$ | punti simmetrici dell'orma; pressioni corrispondenti | 87 |
| $l_1,l_2$ | distanze asse anteriore–G, G–asse posteriore | 90 |
| $c_f,c_r$ | come $l_1$, $l_2$ (manoscritto) | 100 |
| $F_{N,A},F_{N,B},F_{T,A},F_{T,B}$ | reazioni sugli assi (A anteriore, B posteriore) | 89–92, 100–101 |
| $C_m$, $C_{fa}$, $C_{fp}$, $C_f$ | coppia motrice, coppie frenanti | 90, 92, 101 |
| $c$ | carreggiata | 94, 102 |
| $F_{ND},F_{NS},F_{TD},F_{TS}$ | reazioni ruota destra/sinistra in curva | 94 |
| $\omega_i,\omega_e,\omega_v,\omega_g$ | velocità angolari anello interno, esterno, elemento volvente, gabbia | 98 |
| $R_i,R_e,R_g(R_G)$; $\Omega$; $E,I,G$ | raggi piste e circonferenza dei centri; centro del cuscinetto; contatti e centro dell'elemento | 98 |
| $\delta_0,\delta_i$; $\gamma$; $z$; $k$ | schiacciamenti; passo angolare; numero di rulli; costante carico–schiacciamento | 98 |
| $P_0,P_i$ | carico sull'elemento centrale e sull'i-esimo | 98–99 |
| $\rho$, $M_f$, $M_p$ | raggio della circonferenza di attrito volvente; momento resistente volvente; momento del radente | 99 |

**Conflitti di notazione**
- $f_{ad}/f_{att}$ (LaTeX) vs $f_s/f_d$ (tabella p. 70) vs $\mu$ (manoscritto); le fonti derivate usano $\mu$, $\mu_s$, $\mu_d$.
- Cono di **aderenza** ($\varphi_{ad}$) nella fonte; d024 e la fonte stessa a p. 76 e 102 dicono «cono d'attrito».
- Nella dinamica longitudinale il veicolo va a **sinistra** nel LaTeX (A anteriore a sinistra) e a **destra** nel manoscritto (A anteriore a destra): stesse lettere, figure speculari.
- Curva: D = destra = interna (curva a destra) nella fonte; d033 tratta D come esterna.
- $Q$/$P$: nella fonte $Q$ è il carico esterno del cuscinetto e $P_i$ i carichi sui corpi; d037 inverte ($Q_i$ sui corpi, $P$ esterno); in q18 $Q$ è la risultante nel perno.
- $a$: accelerazione vs distanza (q20 usa $a$ per entrambe nella stessa formula; la fonte a p. 80 e 100 usa $a$ anche come distanza).
- $b$: spostamento della normale (fonte p. 68) vs larghezza della base (q33) vs distanza G–asse posteriore (q20).
- Risultante nel perno: $\vec R_Q$ (testo p. 82) e $R_P$ (testo p. 82 e figura p. 83).
- $F_{N,12}$ e $F_{12,N}$ indicano la stessa forza (p. 78).
