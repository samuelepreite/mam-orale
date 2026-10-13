# Riscontro — Capitolo 1, parte a (PDF pp. 1–35)

Confronto tra la trascrizione `cap1a.md` (fonte di verità: dispensa, PDF pp. 1–35) e le fonti derivate assegnate:
dimostrazioni d001–d015 (`/home/claude/work/dd/`) e domande q01, q02, q03, q31 (`/home/claude/work/dq/`).
Tutte le pagine citate sono **pagine PDF** (pag. stampata = PDF + 1 in tutto il Capitolo 1).
I conti sono stati verificati con SymPy/NumPy (script usa e getta, non conservato). L'esito è indicato come «verificato».

**Nota sui file sorgente:** `d001.txt` è troncato. Contiene solo il paragrafo «Prima capiamola intuitivamente» della voce 1,
senza titolo, «Pagine fonte» ed enunciato. I passaggi tecnici della voce 1 stanno in testa a `d002.txt`, che poi riporta
la voce 2 completa. Titolo, pagine (5–7) ed enunciato della voce 1 si trovano in `/home/claude/work/dim.txt` (riga 327).

---

## 1. Tabella delle dimostrazioni

| n. | titolo | pagine dichiarate | pagine reali nella dispensa | presente | il risultato coincide? | note |
|---|---|---|---|---|---|---|
| d001 | Velocità in coordinate polari | 5–7 | — (a p. 6 c'è solo $(P-O)=r\cos\theta\,\hat i + r\sin\theta\,\hat j$) | **no** | — (formula $v=\dot r e_r + r\dot\varepsilon e_\theta$ corretta, verificata, ma assente dalla dispensa) | La dispensa scrive la posizione in coordinate polari e poi passa subito a $\vec V_P = V_P\hat\tau$ (versore tangente, p. 6). Non usa mai i versori $e_r, e_\theta$ né l'angolo ε (la fonte usa θ). La voce va segnalata come «non nella dispensa». |
| d002 | Accelerazione tangenziale e normale | 7–9 | 7–8 | sì | sì: $a_t=\dot V$, $a_n=V^2/R$ | La dispensa usa $\hat\tau$ (non $\hat t$), θ (non ε) e $\omega=d\theta/dt$. La derivazione di $d\hat\tau$ è geometrica: punta-coda tra $\hat\tau(t)$ e $\hat\tau(t+dt)$, poi $|d\vec\tau|=d\theta$ (p. 8). Scrive anche $a_n = V_p\omega = R\omega^2$. Qui ω è la velocità di rotazione della tangente, non di un corpo (conflitto di notazione, §4). La p. 9 contiene solo l'applicazione (svincolo, forza centrifuga). |
| d003 | Accelerazione in coordinate polari | 9–10 | — | **no** | — (formula $(\ddot r - r\dot\varepsilon^2)e_r + (r\ddot\varepsilon + 2\dot r\dot\varepsilon)e_\theta$ corretta, verificata, ma assente) | Alle pp. 9–10 ci sono l'esempio dello svincolo autostradale e l'inizio di §1.2. Nessuna coordinata polare per l'accelerazione in tutto il range 1–35. |
| d004 | Teorema di Poisson sui versori | 10–11 | 10 | **parziale** (solo enunciato) | sì: $d\hat e/dt = \vec\omega\wedge\hat e$ | La dispensa **enuncia** il teorema senza dimostrarlo («La derivata nel tempo di un versore è un vettore perpendicolare al versore stesso»). La dimostrazione con la rotazione infinitesima $d\vec\theta\times\hat e$ non c'è. Simbolo ∧, non ×. |
| d005 | Formula fondamentale delle velocità del corpo rigido | 11–13 | 10–11 (figura p. 12) | sì | sì: $\vec V_B = \vec V_A + \vec\omega\wedge(B-A)$ | La dispensa scrive $(B-A)=\overline{AB}\,\hat e$ con $\overline{AB}$ costante e applica Poisson al **versore** ê. d005 applica Poisson direttamente al vettore AB: risultato equivalente. La dispensa aggiunge che nel piano un corpo rigido ha 3 GDL (2 componenti di $\vec V_A$ + 1 di $\vec\omega$, p. 12). |
| d006 | Formula fondamentale delle accelerazioni | 14–16 | 12 (figura p. 13; casi particolari pp. 13–16) | sì | sì nel piano. La dispensa scrive $\vec a_B=\vec a_A+\vec{\dot\omega}\wedge(B-A)-\omega^2(B-A)$; d006 scrive $\alpha\times AB + \omega\times(\omega\times AB)$ | La dispensa usa $\vec{\dot\omega}$ e **non α** (nella dispensa α è un angolo, pp. 15 e 21). Il passaggio a $-\omega^2(B-A)$ vale solo per $\vec\omega\perp(B-A)$ (moto piano). Verificato: in 3D resta il termine $\vec\omega(\vec\omega\cdot\vec r)$. La dispensa non dichiara l'ipotesi e chiama la formula «equazione di Rivals» (p. 12). Le pp. 14–16 dichiarate sono il moto rotatorio attorno a un polo (pp. 13–15) e il moto generico piano (p. 16). |
| d007 | Centro di istantanea rotazione | 16–18 | 17–18 (ripreso alle pp. 21–23, 25–26, 29) | sì | sì: $\vec V_P = \vec\omega\wedge(P-K)$, quindi $V_P=\omega\,\overline{KP}$ | La dispensa lavora con i vettori: $\vec V_A = \vec\omega\wedge(A-K)$. Il modulo compare come $\omega_1 = V_A/\overline{AK}$ (p. 22) e come $V_O=\omega R$, $V_B=\sqrt2\,\omega R$ (p. 18). Definisce il C.I.R. come «traccia dell'asse del moto sul piano». Aggiunge proprietà che d007 non ha: K non dipende dalla geometria e può stare fuori dal corpo (p. 17); in generale $a_K\neq0$ (pp. 18, 23). Non dice che le due direzioni di velocità devono essere non parallele (vedi NdT a p. 17). |
| d008 | Glifo oscillante: rapporto delle velocità | 21–24 | — | **no** | — | Le pp. 21–24 trattano l'**asta vincolata in due punti** (due corsoi su guide ortogonali), non il glifo. In tutto il range 1–35, e nell'indice del Cap. 1, non c'è una sezione «glifo». Va cercato altrove, forse in §1.9.3 «Applicazioni», pag. stampata 65 (PDF ≈ 64), fuori dal mio range. Il risultato $t_1/t_2=\Delta\theta_1/\Delta\theta_2$ resta corretto. |
| d009 | Velocità nel glifo con triangolo cinematico | 22–24 | — | **no** | — | Come d008. Il triangolo delle velocità alle pp. 22–23 è quello dell'asta vincolata: $\vec V_B = \vec V_A + \vec\omega_1\wedge(B-A)$, $V_B=V_A\tan\alpha$. La composizione con velocità relativa ($\vec V_t + \vec V_{rel}$) compare solo in §1.5 (pp. 33–35). |
| d010 | Manovellismo: posizione | 23–25 | 31 (§1.4) | sì | sì: $x_C = r\cos\theta + l\cos\gamma$, $\cos^2\gamma = 1-\lambda^2\sin^2\theta$, equivalente a $x = r\cos\theta+\sqrt{l^2-r^2\sin^2\theta}$ | La dispensa chiama **γ** l'angolo di biella (non φ) e definisce $\lambda=r/l$, $\theta=\omega_1 t$. La forma chiusa con la radice non è scritta esplicitamente. Le pp. 23–25 dichiarate sono l'asta vincolata e l'introduzione grafica del manovellismo. |
| d011 | Manovellismo: velocità del cursore | 24–25 | 32 | sì (solo forma approssimata) | sì: $V_C = -r\omega_1[\sin\omega_1t + \frac\lambda2\sin2\omega_1t]$ (verificato) | La dispensa deriva **solo la legge approssimata** di $x_C$; la derivata esatta $dx/d\theta\cdot\omega$ non c'è. Alle pp. 25–26 la velocità è trattata **graficamente**, col CIR della biella K: $\vec V_B=\vec\omega_2\wedge(B-K)$, $\vec V_C=\vec\omega_2\wedge(C-K)$, ω₂ oraria. d011 non lo dice. |
| d012 | Manovellismo: accelerazione del cursore | 24–25 | 32 (accelerazioni grafiche pp. 26–27) | sì | sì: $a_C=-r\omega_1^2[\cos\omega_1t+\lambda\cos2\omega_1t]$ (verificato) | La dispensa scrive «=», ma vale solo al primo ordine in λ². In più dà i grafici di $x_C, V_C, a_C$ con $r=0.03$ m, λ = 1/3, $\omega_1=1000$ RPM (p. 32), e il poligono grafico delle accelerazioni (p. 27). |
| d013 | Manovellismo: legge approssimata della corsa | 31–32 | 31–32 | sì | sì: $l(1-\frac{\lambda^2}{2}\sin^2\theta) = l-\frac{r^2}{4l}+\frac{r^2}{4l}\cos2\theta$ (verificato) | **Metodo diverso.** La dispensa completa il quadrato: aggiunge e toglie $\frac{\lambda^4}{4}\sin^4\theta$ e trascura $\frac{\lambda^4}{4}\sin^4\theta$ perché λ ≪ 1. d013 usa invece lo sviluppo $\sqrt{1-u}\approx1-u/2$. La dispensa **non** sostituisce $\sin^2\theta = (1-\cos2\theta)/2$ nella posizione: la seconda armonica $2\omega_1$ compare solo in $V_C$ e $a_C$. |
| d014 | Moto relativo: velocità | 33–35 | 33–34 | sì | sì: $\vec V_P = \vec V_{O'} + \vec\omega\wedge(P-O') + \dot x'_P\hat i' + \dot y'_P\hat j'$, cioè $\vec V_t + \vec V_{rel}$ | La dispensa deriva le componenti $x'_P\hat i' + y'_P\hat j'$ e applica Poisson ai versori mobili. Non usa la regola «derivata assoluta = relativa + ω×». Nomi: velocità di trascinamento $\vec V_t$, relativa $\vec V_{rel}$. A p. 34 una riga intermedia ha refusi ($V'_{O'}$, $\hat k'$, $\hat i$): vedi NdT. |
| d015 | Moto relativo: accelerazioni e Coriolis | 35–38 | 34–35 | sì | sì: $\vec a_P = \vec a_{O'} + \vec{\dot\omega}\wedge(P-O') - \omega^2(P-O') + \ddot x'_P\hat i'+\ddot y'_P\hat j' + 2\vec\omega\wedge\vec V_{rel}$ | La dispensa scrive $-\omega^2(P-O')$ (solo nel piano) e usa $\vec{\dot\omega}$, non α. Nomi: $\vec a_t$ (trascinamento; stesso simbolo dell'accelerazione tangenziale di p. 7), $\vec a_{rel}$, $\vec a_{cc}$ (Coriolis). Si vede bene da dove vengono i due $\vec\omega\wedge\vec V_{rel}$, come in d015. Le pp. 36–38 sono il pistone oleodinamico (§1.5.1), che inizia a p. 35. |

---

## 2. Domande

### q01 — Glifo oscillante: perché una corsa è più veloce dell'altra
- **Assente nelle pp. 1–35.** Nessuna pagina del range e nessuna voce dell'indice del Cap. 1 (§1.1–1.9.3, PDF pp. 2) tratta il
  glifo. q01 afferma che «nelle dispense ufficiali il glifo compare anche come applicazione del teorema delle forze vive». Va
  controllato in §1.9.3 «Applicazioni» (pag. stampata 65 → PDF ≈ 64), fuori dal mio incarico.
- La dimostrazione di q01 è corretta. Verificato numericamente con r/d = 0.5: arco tra le posizioni estreme = 2.0944 rad =
  π − 2γ e 4.1888 = π + 2γ, con γ = arcsin(r/d). Il rapporto (π+2γ)/(π−2γ) > 1 è giusto.
- **Conflitto di notazione:** in q01 γ è l'angolo del triangolo del glifo, mentre nella dispensa (pp. 25, 31–32) γ è l'angolo
  di biella del manovellismo.
- d008/d009 indicano per il glifo le pp. 21–24. Lì c'è invece l'asta vincolata in due punti.

### q02 — Meccanismi: analisi delle velocità
Coincidono con la dispensa: $\vec v_B=\vec v_A+\vec\omega\times(B-A)$ (p. 11, ma con ∧ e V maiuscola); termine relativo ⊥ AB
(p. 11); CIR come intersezione delle normali alle velocità (p. 17); $v_A/KA=|\omega|$ (p. 22: $\omega_1=V_A/\overline{AK}$); CIR
con accelerazione in generale non nulla (pp. 18, 23).
Differenze:
- **Dimostrazione.** q02 scrive «la distanza fra due punti è costante: $r_B = r_A + r_{B/A}$». Quell'equazione è solo una somma
  di vettori e non esprime la rigidità. La dispensa la esprime con $(B-A)=\overline{AB}\,\hat e$, $\overline{AB}=\text{cost}$, e
  applica Poisson al versore ê (p. 11). Conviene dirla così.
- **CIR all'infinito per la traslazione:** non c'è nelle pp. 1–35. La dispensa dice solo che l'atto di moto può essere
  istantaneamente traslatorio, con ω = 0 e $\dot\omega\neq0$ (p. 13).
- **Notazione:** q02 usa × e $r_{B/A}$; la dispensa usa ∧ e $(B-A)$.
- **Contenuti della dispensa che q02 omette** (domande possibili):
  - 3 GDL del corpo rigido nel piano (p. 12);
  - proprietà del CIR: non dipende dalla geometria, può stare fuori dal corpo (p. 17);
  - disco che rotola: $V_O=\omega R$, $V_B=\sqrt2\,\omega R$, tutti i punti del bordo (anche K) con accelerazione $\omega^2R$
    verso il centro, esempio numerico 138.9 rad/s e 5787 m/s² (p. 18);
  - asta vincolata: $V_B=V_A\tan\alpha$ (p. 23);
  - quadrilatero: CIR della biella all'intersezione dei prolungamenti di AB e DC, ω₂ oraria, ω₃ antioraria (p. 29);
  - metodo grafico punta-coda e regola della mano destra per il verso di ω (pp. 22–23).

### q03 — Manovellismo di spinta: attrito e punti morti
Coincidono: struttura manovella AB – biella BC – pistone C, 1 GDL (p. 25: 9 − 8); punti morti θ = 0 e θ = π con $V_C=0$ e
CIR della biella ≡ C (p. 26); $x = r\cos\theta + l\cos\varphi$, $r\sin\theta=l\sin\varphi$ (p. 31, con γ al posto di φ).
Differenze:
- **Notazione:** q03 chiama φ l'angolo di biella, la dispensa γ (pp. 25, 31). La dispensa introduce $\lambda=r/l$; q03 no.
- **Derivata esatta:** q03 scrive $\dot\varphi = r\omega_1\cos\theta/(l\cos\varphi)$ e $\dot x=-r\omega_1\sin\theta - l\dot\varphi\sin\varphi$.
  Entrambe sono corrette (verificate con SymPy), ma **la dispensa non le fa**: deriva solo la legge approssimata e ottiene
  $V_C = -r\omega_1[\sin\omega_1t+\frac\lambda2\sin2\omega_1t]$ (p. 32), che si annulla anch'essa a θ = 0, π.
- **Nomi dei punti morti:** la dispensa dice θ = 0 → **punto morto superiore**, θ = π → **punto morto inferiore** (p. 26).
  q03 non li nomina.
- **Assenti nelle pp. 1–35:** l'attrito nella coppia prismatica ($|F_{att}|=\mu N$, $\phi=\arctan\mu$) e la lettura statica del
  punto morto ($C_A = F b$, b → 0, volano). Vanno cercati in §1.8 (statica dei meccanismi, PDF ≈ 45–) o nel Cap. 2.
  La notazione μ/f dell'attrito non è verificabile qui.
- **Contenuti della dispensa che q03 omette:**
  - verso orario di ω₂ con ω₁ antioraria (p. 26);
  - in θ = 0 e θ = π i versi di $V_B$ e $a_B$ (figure p. 26);
  - poligono delle accelerazioni $\vec a_C=\vec a_B+\vec{\dot\omega}_2\wedge(C-B)-\omega_2^2(C-B)$ (p. 27);
  - $a_C=-r\omega_1^2[\cos\omega_1t+\lambda\cos2\omega_1t]$ e i grafici numerici (p. 32).

### q31 — Manovellismo di spinta: nomi delle aste e CIR
Coincidono: 1 manovella, 2 biella, 3 pistone/corsoio (figura p. 25); coppie rotoidali in A, B, C e prismatica col telaio
(p. 25); 1 GDL; CIR della manovella = A (p. 25: «il centro di rotazione della manovella è individuato proprio dal centro
dell'albero A»); CIR della biella all'intersezione della retta per B ∥ AB (prolungamento della manovella) con la normale
alla guida in C (p. 26); ai punti morti $K_{20}\equiv C$ (p. 26). $v_C/v_B = K_{20}C/K_{20}B$ verificato numericamente
(0.8124 = 0.8124 per r = 0.03, l = 0.09, θ = 0.7).
Differenze:
- **Notazione:** la dispensa non numera il telaio («0») e non usa $K_{10}, K_{20}, K_{30}$: chiama K il solo CIR della biella.
- **$K_{30}=\infty$ (traslazione come rotazione attorno a un punto all'infinito):** non c'è nelle pp. 1–35.
- **Refuso nel file q31:** la formula del rapporto è resa male («= 𝑟𝑎𝑐𝐾20 𝐶𝐾20 𝐵», un `\frac` rotto). Va scritta
  $\frac{v_C}{v_B}=\frac{\overline{K_{20}C}}{\overline{K_{20}B}}$.
- **Contenuti della dispensa che q31 omette:**
  - verso di ω₂ (orario) e di $\vec V_C$ (verso sinistra) per ω₁ antioraria (p. 26);
  - conteggio dei GDL 9 − 2·4 = 1 (p. 25);
  - figura dei punti morti con $V_B$ verticale (p. 26).

---

## 3. Derivazioni della dispensa (pp. 1–35) che non compaiono tra d001–d015

| titolo | pagine PDF |
|---|---|
| Modulo della velocità $V_P = ds/dt = R\,d\theta/dt = R\omega$ e $|d\vec\tau| = d\theta$ (parte geometrica di d002) | 8 |
| Forza d'inerzia $\vec F_{in}=-m\vec a$ e forza centrifuga come inerzia dell'accelerazione normale; progetto della curva | 9 |
| 3 GDL del corpo rigido nel piano (2 componenti di $\vec V_A$ + 1 di $\vec\omega$) | 12 |
| Moto traslatorio e atto di moto istantaneamente traslatorio (ω = 0, ω̇ ≠ 0) | 13 |
| Moto rotatorio attorno a un polo fisso: $\vec V_A=\vec\omega\wedge(A-O)$, distribuzione lineare; con ω̇ = 0 accelerazione centripeta | 13–14 |
| Polo fisso con ω̇ ≠ 0: $|\vec a_A| = \overline{OA}\sqrt{\omega^4+\dot\omega^2}$, $\tan\alpha = \dot\omega/\omega^2$ uguale per tutti i punti | 15 |
| Moto generico piano = traslazione + rotazione attorno ad A (velocità e accelerazioni) | 16 |
| Disco che rotola senza strisciare: $V_O=\omega R$, $V_B=\sqrt2\omega R$, $a=\omega^2R$ per tutti i punti del bordo (anche K); esempio pneumatico R = 30 cm, V = 150 km/h → 138.9 rad/s, 5787 m/s² | 17–18 |
| Gradi di vincolo delle coppie (rotoidale, prismatica: 2 ciascuna) e conteggio GDL dell'asta vincolata: 9 − 2·2 − 2·2 = 1 | 19, 21 |
| Asta vincolata in due punti: $\omega_1 = V_A/\overline{AK}$ (antiorario), $V_B = V_A\tan\alpha$, $\vec V_P=\vec\omega_1\wedge(P-K)$, K ≡ B se α = 0 | 21–23 |
| Asta vincolata, accelerazioni: $a_B=\overline{AB}\omega^2/\cos\alpha$, $\dot\omega=\omega^2\tan\alpha$ (orario). Verificato | 23–24 |
| Manovellismo, metodo grafico: CIR della biella, ω₂ oraria, K ≡ C ai punti morti (PMS θ = 0, PMI θ = π) | 25–26 |
| Manovellismo, poligono delle accelerazioni ($\vec a_B=-\omega_1^2(B-A)$; $\vec a_C$) | 26–27 |
| Quadrilatero articolato: 1 GDL; CIR della biella (intersezione dei prolungamenti di AB e DC); ω₂ oraria, ω₃ antioraria | 28–29 |
| Quadrilatero articolato, accelerazioni: uguaglianza delle due espressioni di $\vec a_C$ (da B e da D), poligono a due rami | 29–30 |
| Manovellismo, grafici numerici di $x_C, V_C, a_C$ (r = 0.03 m, λ = 1/3, 1000 RPM). Verificato: $x\in[0.06, 0.12]$ m, $a_C(0)=-438.6$, $a_C(\pi)=+219.3$ m/s² | 32 |
| Pistone oleodinamico: $q = dV/dt = (dx/dt)\,S$, $V_{rel}=q/S$ (continua a p. 36) | 35 |

---

## 4. Simboli del capitolo (pp. 5–35) e conflitti di notazione

| simbolo | significato | pagina PDF |
|---|---|---|
| $\{O,x,y\}$, $\hat i,\hat j$ | riferimento cartesiano fisso e versori | 5 |
| $P(t)$, $\vec r(t)$, $P(t)-O$ | posizione del punto, vettore posizione | 5 |
| $r$ | modulo del vettore posizione | 6 |
| θ (nelle figure ϑ) | angolo del vettore posizione col semiasse x | 5–6 |
| $dP$, $dt$ | spostamento e intervallo infinitesimi | 6 |
| $\vec V_P$, $V_P$ (anche $V_p$) | velocità e suo modulo | 6–8 |
| $\hat\tau$ (anche $\vec\tau$) | versore tangente alla traiettoria | 6–8 |
| $\vec a_P$ ($\vec a_p$), $\vec a_t$, $\vec a_n$ | accelerazione, componente tangenziale e normale | 7–8 |
| $R$, $C$, $ds$, $d\theta$ | raggio di curvatura, centro di curvatura, arco, angolo al centro | 8 |
| ω (= dθ/dt) | velocità di rotazione della tangente | 8 |
| $\hat n$ | versore normale | 8 |
| $\vec F_{in}$, $m$ | forza d'inerzia, massa | 9 |
| $\hat e$ | versore solidale al corpo | 10–11 |
| $\vec\omega$ | velocità angolare del corpo | 10 → |
| ∧ | prodotto vettoriale | 10 → |
| $(B-A)$, $\overline{AB}$ | vettore posizione relativa, distanza | 11 |
| $\vec{\dot\omega}$ | accelerazione angolare (mai α) | 12 → |
| «equazione di Rivals» | equazione fondamentale delle accelerazioni | 12, 18 |
| O | polo fisso (cerniera) | 13–15 |
| α | angolo tra $\vec a_A$ e $-\omega^2(A-O)$ | 15 |
| $k$ | costante $\sqrt{\omega^4+\dot\omega^2}$ (non definita esplicitamente) | 15 |
| K, C.I.R. | centro di istantanea rotazione | 17 → |
| $r_1, r_2$ | rette perpendicolari alle velocità | 17 |
| $R$, $V$ | raggio del disco/pneumatico, velocità di avanzamento | 18 |
| GDL | gradi di libertà | 21 |
| α | angolo tra asta e guida orizzontale (asta vincolata) | 21–24 |
| ω₁, ω₂, ω₃, ω̇₂, ω̇₃ | velocità/accelerazioni angolari dei corpi 1, 2, 3 | 22, 25–30 |
| 1, 2, 3 | asta/manovella, biella, corsoio/pistone (manovellismo); aste 1, 2, 3 (quadrilatero) | 21, 25, 28 |
| A, B, C, H | cerniera fissa, bottone di manovella, spinotto, piede di B sull'asse x | 25, 31 |
| θ, γ | angolo di manovella, angolo di biella | 25, 31 |
| θ₁ | angolo dell'asta 1 del quadrilatero | 28–29 |
| D | seconda cerniera fissa del quadrilatero | 28–30 |
| $r$, $l$, λ = r/l | lunghezza manovella, lunghezza biella, rapporto | 31 |
| $x_C$, $y_B$, θ = ω₁t | coordinate, legge del moto della manovella | 31–32 |
| $\{O';x';y'\}$, $\hat i',\hat j'$, $x'_P, y'_P$ | riferimento mobile, versori e coordinate relative | 33–34 |
| $\vec V_{O'}$, $\vec V_t$, $\vec V_{rel}$ | velocità dell'origine mobile, di trascinamento, relativa | 34 |
| $\vec a_{O'}$, $\vec a_t$, $\vec a_{rel}$, $\vec a_{cc}$ | accelerazione dell'origine mobile, di trascinamento, relativa, di Coriolis | 34–35 |
| $q$, $q'$, $dV$, $dx$, $S$ | portata, volume, spostamento del pistone, sezione | 35 |

**Conflitti di notazione:**
1. **ω**: a p. 8 è la velocità di rotazione della tangente (dθ/dt del punto); da p. 10 è la velocità angolare del corpo.
2. **$\vec a_t$**: a p. 7 è l'accelerazione tangenziale, a p. 35 quella di trascinamento.
3. **α**: nella dispensa è sempre un **angolo** (p. 15 tra accelerazione e centripeta; p. 21 asta/guida). Le fonti derivate
   (d006, d015) usano α per l'accelerazione angolare, che la dispensa chiama sempre $\vec{\dot\omega}$.
4. **θ**: angolo polare (p. 5), angolo di manovella (p. 25), inclinazione dell'asse x′ (p. 33), e dθ angolo al centro (p. 8).
   d001–d003 usano invece ε ed $e_r, e_\theta$, assenti nella dispensa.
5. **γ**: angolo di biella nella dispensa; in q01 angolo del triangolo del glifo. q03 e d010 chiamano φ l'angolo di biella.
6. **V**: velocità ovunque, ma volume del fluido a p. 35 ($dV$).
7. **r**: modulo del vettore posizione (p. 6), lunghezza della manovella (p. 31), rette $r_1, r_2$ (p. 17).
8. **R**: raggio di curvatura (p. 8) e raggio del disco (p. 18), coerenti nel significato.
9. **K** (CIR) e **k** (costante di p. 15). Un $\hat k'$ compare solo come refuso a p. 34.
10. **C**: centro di curvatura (p. 8) e punto spinotto/cerniera C (pp. 12, 25 →).
11. **×** (fonti derivate) contro **∧** (dispensa); $r_{B/A}$ e AB (derivate) contro $(B-A)$ (dispensa).

**Errori o refusi della dispensa annotati con NdT nella trascrizione:**
- p. 15: $|a_P| = \vec{OP}\cdot k$, a destra serve la distanza.
- p. 17: «apparteniti».
- p. 29: $\vec V_C=\vec\omega_3\wedge(B-K)$ invece di $\vec\omega_2\wedge(C-K)$.
- p. 34: $V'_{O'}$, $\hat k'$, $\hat i$ senza apice, «velcità».
- p. 35: «quantià», $dx/ds$ invece di $dx/dt$, «uncio».
- pp. 12, 34: $\vec\omega\wedge(\vec\omega\wedge\vec r)=-\omega^2\vec r$ usata senza dichiarare l'ipotesi di moto piano.
- pp. 31–32: uguaglianze che sono in realtà approssimazioni.
