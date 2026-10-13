# Capitolo 6 — Accoppiamento motore – carico · riscontro con le fonti derivate

Fonte di verità: dispensa, PDF pp. 193–206 (trascrizione in `cap6.md`).
Fonti derivate confrontate: dimostrazioni d101–d110, d140 (`/home/claude/work/dd/`); domande q08, q09, q10, q16
(`/home/claude/work/dq/`). Tutti i conti citati sono stati rifatti con SymPy (script di verifica nello scratchpad) o a mano.

Notazione della dispensa in questo capitolo: inerzie **I** (non J), rapporto **τ = ω_u/ω_m** (non i = ω_m/ω_u),
pendenze **K_m, K_u** (spesso scritte k_m, k_u), equazioni ricavate con il **T.F.V.** (bilancio di potenze), non con la
somma dei momenti.

---

## 1. Tabella delle dimostrazioni

| n. | Titolo | Pagine dichiarate | Pagine reali | Presente | Risultato coincide? | Note |
|---|---|---|---|---|---|---|
| d101 | Equazione dinamica dell'accoppiamento diretto | 193–199 | 197 | sì | sì: $J_{eq}\dot\omega = C_m - C_u$ ≡ $\dot\omega = (C_m - C_u)/(I_m + I_u)$ | La dispensa la ricava col T.F.V. ($C_m\omega - C_u\omega = I_m\dot\omega\omega + I_u\dot\omega\omega$), non «sommando i momenti». J → I. Intervallo dichiarato troppo largo (193–196 sono generalità/caratteristiche). |
| d102 | Punto di funzionamento stazionario | 197–199 | 197 (ripreso 198, 199) | sì | sì: $C_m(\omega_R) = C_u(\omega_R)$ | La dispensa chiama la velocità $\omega_R$ «velocità di regime» e il punto P «punto di stazionarietà»; d102 usa $\omega_0$. A p. 199 il regime del motore c.c. è $\omega_P = (C_{m,0}-C_{u,0})/K_m$. |
| d103 | Stabilità del punto di funzionamento | 198–200 | 197 (qualitativa), 198–199 (analitica) | sì | sì: stabile se $K_m - K_u < 0$ | Dispensa: sviluppo di Taylor al 1° ordine di **entrambe** le caratteristiche in P, scostamento $\Omega = \omega - \omega_P$. d103 omette la discussione qualitativa (p. 197) e l'esempio con due punti di regime Q (instabile) e P (stabile) di p. 198. |
| d104 | Risposta temporale linearizzata | 199–201 | 198 (soluzione), 199 (grafico Ω(t)) | sì | sì: $\Delta\omega(t) = \Delta\omega(0)e^{Kt/J}$ ≡ $\Omega(t) = \Omega_0 e^{\frac{k_m - K_u}{I_m+I_u}t}$ | Pagine dichiarate sfasate di una. La dispensa a pp. 199–200 risolve anche il transitorio **completo** da fermo (motore c.c. + carico costante) e il tempo $t_{90\%}$: d104 non ne parla. |
| d105 | Trasmissione: inerzia riportata | 201 | 196 (metodo energetico, esempio ascensore); 201 (risultato $I_u\tau^2$ via T.F.V.) | parziale | sì: $J_{u,rif} = J_u/i^2$ ≡ $I_u\tau^2$ con $i = 1/\tau$ | A p. 201 la dispensa **non** usa l'equivalenza dell'energia cinetica: $I_u\tau^2$ compare dividendo il T.F.V. per $\omega_m$. L'equivalenza energetica è usata solo a p. 196 (ascensore, $I_u = I_t + (M_{cab}+M_{contr})r_t^2$). Notazione $i$ assente dalla dispensa. |
| d106 | Trasmissione: coppia resistente riportata | 201 | 201 | sì | sì: $C_u/(\eta i)$ ≡ $C_u\tau/\eta$ | La dispensa scrive l'equazione completa con η: $C_m - C_u\tau/\eta = (I_m + I_u\tau^2/\eta)\dot\omega_m$: anche l'**inerzia** riportata è divisa per η; d106 non lo dice. L'equazione di partenza scritta nella dispensa ($\eta C_m\omega_m - C_u\omega_u = \dots$) non porta a quel risultato (vedi §2, q09). |
| d107 | Rapporto di trasmissione ottimo per accelerazione | 201 | — | no | — | Non c'è nella dispensa (pp. 193–206). Inoltre lo Step 1 massimizza $\dot\omega_m$, che nel campo utile $0 \le \tau < C_m/C_u$ è massima per τ → 0 (verificato: $\partial\dot\omega_m/\partial\tau < 0$ lì; l'unico stazionario positivo è oltre $C_m/C_u$, dove $\dot\omega_m < 0$): la grandezza da massimizzare è l'accelerazione del **carico** $\dot\omega_u = \tau\dot\omega_m$. Verificato: $\tau_{opt} = \frac{-C_uI_m + \sqrt{I_m(C_m^2 I_u + C_u^2 I_m)}}{C_m I_u}$, che per $C_u = 0$ dà $\tau_{opt} = \sqrt{I_m/I_u}$ (cioè $i_{opt} = \sqrt{I_u/I_m}$). Il «risultato» di d107 non è una formula. |
| d108 | Frizione: equazioni prima della sincronizzazione | 202–203 | 203 (lato motore), 204 (lato utilizzatore) | parziale | sì per il lato motore ($I_m\dot\omega_m = C_m - C_{fr}$); **no** per il lato carico | Dispensa lato utilizzatore: $\dot\omega_c = (C_{fr} - \tau C_u)/(\tau^2 I_u)$, con la trasmissione τ fra disco condotto e utilizzatore; d108 scrive $J_u\dot\omega_u = C_f - C_u$ (senza τ, cioè con τ = 1). Ipotesi della dispensa che d108 non dichiara: rilascio istantaneo, $C_{fr}$ costante, $\omega_u(0)=0$, motore inizialmente a $\omega_m^{I}$ (regime a vuoto, $C_m=0$), caratteristica motore linearizzata. |
| d109 | Tempo di sincronizzazione della frizione | 202–203 | 205 (punto Q, istante $t_Q$ solo grafico) | parziale | no | La dispensa **non** dà $t_Q$ in forma chiusa: $\omega_c(t)$ è lineare ma $\omega_m(t)$ è esponenziale (motore linearizzato, p. 203), quindi $\omega_m(t_Q) = \omega_c(t_Q)$ è un'equazione trascendente. L'ipotesi di d109 (entrambe le accelerazioni costanti) vale solo se $C_m$ è costante, cosa che la dispensa non assume. Pagine reali 204–205. |
| d110 | Energia dissipata nella frizione | 202–203 | — | no | — | Assente nella dispensa (nessun bilancio energetico dell'innesto). La formula $E = \int C_f|\omega_m - \omega_u|dt$ è fisicamente corretta solo se $\omega_u$ è la velocità del disco condotto ($\omega_c$ nella dispensa), non dell'utilizzatore a valle del riduttore. |
| d140 | Riduttore di coppia: potenza-coppia-velocità | 201 | 201 (regime: $C_m = C_u\tau$; con η dall'equazione dinamica) | parziale | sì: $C_{out} = \eta i C_{in}$ ≡ $C_u = \eta C_m/\tau$ | La dispensa scrive il regime solo per η = 1 ($C_m\omega_m - C_u\omega_u = 0 \Rightarrow C_m = C_u\tau$); il caso η ≠ 1 si ottiene ponendo $\dot\omega_m = 0$ nell'equazione $C_m - C_u\tau/\eta = \dots$ (verificato). La frase «riduttore di giri = moltiplicatore di coppia» non è in questo capitolo (vedi q16). |

---

## 2. Domande

### q08 — Accoppiamento motore–utilizzatore diretto (dispensa pp. 197–200)

Coincidono: equazione $(J_m+J_u)\dot\omega = C_m - C_u$ (p. 197), regime come intersezione (p. 197), condizione di avvio
$C_m(0) > C_u(0)$ (p. 197, «allo spunto la coppia fornita dal motore è maggiore…»), criterio $dC_m/d\omega - dC_u/d\omega < 0$
(pp. 198–199), soluzione esponenziale della perturbazione (p. 198). Differenze:

- **Notazione**: J invece di I; $\omega_r$ invece di $\omega_R$/$\omega_P$; $\delta\omega$ invece di $\Omega$; $f(\omega)$ non
  esiste nella dispensa, che linearizza separatamente $C_m$ e $C_u$ con $K_m$, $K_u$.
- **Metodo**: la dispensa ricava l'equazione dal T.F.V., non da un equilibrio di momenti.
- **Omesso dalla risposta, presente nella dispensa** (domandabile):
  - discussione qualitativa della stabilità (p. 197) e il **secondo esempio con due punti di regime**: Q instabile (sul
    tratto crescente della $C_m$) e P stabile, con l'osservazione che, se la velocità scende sotto $\omega_Q$, il sistema
    «decelererebbe fino a fermarsi» (p. 198);
  - **transitorio da fermo** motore c.c. + carico costante: $\omega(t) = \frac{1}{K_m}[C_{m0}-C_{u,0} - (C_{m,0}-C_{u,0})e^{-K_m t/I_{eq}}]$
    e **tempo al 90%** $t_{90\%} = -\frac{I_{eq}}{K_m}\ln(1-0{,}9)$ (pp. 199–200; verificati con SymPy); osservazione
    «tempo ∝ inerzia del sistema»;
  - caratteristica del motore asincrono con le zone «possibile funzionamento instabile / transitori / normale
    funzionamento», coppia di spunto, $C_{max}$, $\omega_s = 2\pi f/P$ (pp. 194–195); caratteristiche tipiche degli
    utilizzatori (ascensore a coppia costante, veicolo $C_u = K_1 + K_2V^2$, p. 196).
- Attenzione per l'orale: nella dispensa a p. 199 $K_m$ è definita come pendenza con segno ($-C_{m0}/\omega_S$) ma poi usata
  come modulo (vedi §4); la risposta q08 usa le derivate con segno, che è la scelta coerente.

### q09 — Accoppiamento con trasmissione (dispensa p. 201; p. 196 per l'equivalenza energetica)

Coincidono: $\tau = \omega_u/\omega_m$, $\omega_u = \tau\omega_m$, $\dot\omega_u = \tau\dot\omega_m$, inerzia riportata
$I_u\tau^2$, coppia riportata $\tau C_u$, equazione $(I_m + I_u\tau^2)\dot\omega_m = C_m - \tau C_u$, regime $C_m = C_u\tau$.
Differenze:

- **Refuso nella risposta**: «$C_m(\omega_{m,r}) = a_u C_u(\tau\omega_{m,r})$» — «$a_u$» va letto τ (dispensa p. 201:
  $C_m = C_u\tau$).
- **Metodo**: la risposta ricava l'inerzia con l'energia cinetica; la dispensa a p. 201 la ricava dal T.F.V. diviso per
  $\omega_m$ (l'equivalenza energetica è a p. 196, esempio ascensore).
- **Rendimento**: la risposta dice solo che la coppia riflessa è maggiore dell'ideale. La dispensa dà l'equazione esplicita
  $C_m - C_u\frac{\tau}{\eta} = \big(I_m + I_u\frac{\tau^2}{\eta}\big)\dot\omega_m$: con η < 1 anche l'**inerzia** riportata
  aumenta (÷η). Nota: l'equazione di partenza scritta nella dispensa, $\eta C_m\omega_m - C_u\omega_u = I_m\dot\omega_m\omega_m + I_u\dot\omega_u\omega_u$,
  dà invece $\dot\omega_m = (\eta C_m - \tau C_u)/(I_m + \tau^2 I_u)$, diverso (SymPy); il risultato finale della dispensa è
  corretto se si scrive $\eta(C_m - I_m\dot\omega_m)\omega_m = (C_u + I_u\dot\omega_u)\omega_u$.
- **Assente nella dispensa**: «|τ| < 1 per un riduttore» non è scritto esplicitamente (la dispensa dice solo «aumentare o
  ridurre la velocità», e l'esempio ha τ = 1/2); il paragrafo «perché il riduttore aiuta l'avviamento» non c'è.
- **Omesso dalla risposta**: l'**Esempio E4/2** (τ = 1/2, $C_{mo}$ = 45 Nm, $k_m$ = 0,06 Nms/rad, $k_u$ = 0,8 Nms/rad →
  $\omega_m$ = 173,1 rad/s = 1652,8 giri/min, $\omega_u$ = 86,55 rad/s, $C_m$ = 34,62 Nm, W = 5,992 kW; ricalcolato:
  173,08 rad/s, 86,54 rad/s, 34,615 Nm, 5991 W); la figura dell'argano (motore–cinghia–ingranaggi–tamburo–massa).

### q10 — Trasmissione e frizione (dispensa pp. 202–206)

Coincidono: fasi strisciamento/aderenza, coppia di frizione resistente per il motore e motrice per il lato utilizzatore
(pp. 202–204), in aderenza $C_{fr} \le$ valore limite (p. 202), dopo la sincronizzazione «accoppiamento con riduttore»
(p. 205). Differenze:

- **Formula della coppia**: risposta $C_{fr,max} = n\mu F R_m$; dispensa $C_{fr} = f_{att}|F_N|\bar r\, m$ con
  $\bar r = (r_i + r_e)/2$ «raggio medio corona circolare», m = n. dischi; in strisciamento $C_{fr}^{(s)} = f F_N r_m m$
  (f radente), in aderenza $C_{fr}^{(a)} \le f_{att}F_N r_m m$ (p. 202). Notazione diversa (μ/f, F/F_N, n/m, R_m/r̄).
  La dispensa non distingue usura uniforme / pressione uniforme in queste pagine.
- **Equazione lato utilizzatore**: risposta $J_u\dot\omega_u = C_{fr} - C_u^{(u)}$; dispensa (p. 204)
  $\dot\omega_c = \dfrac{C_{fr} - \tau C_u}{\tau^2 I_u}$, scritta per il **disco condotto** ($\omega_c$) con τ incluso; con
  $C_u = C_{u,0}$ costante: $\omega_c(t) = \frac{C_{fr} - \tau C_{u,0}}{\tau^2 I_u}t$ (verificato).
- **Ipotesi della dispensa non dette nella risposta**: rilascio **istantaneo** della frizione (gradino di $C_{fr}$ a
  $t_{inn.fr.}$); all'istante del contatto $\omega_m = \omega_m^{I}$ (regime a vuoto, $C_m = 0$) e $\omega_u = 0$;
  caratteristica del motore a c.i. linearizzata nel punto P di intersezione con $C_{fr}$.
- **Omesso dalla risposta** (domandabile): $\omega_m(t) = \frac{1}{K_m}[(C_{m,0}-C_{fr}) - (C_{m,0}-C_{fr}-K_m\omega_m^{I})e^{-K_mt/I_m}]$
  (p. 203) e il commento «$\omega_m \to (C_{m,0}-C_{fr})/K_m$ se i dischi fossero sempre in slittamento (che non è vero)»;
  punto **Q** e istante $t_Q$ (p. 205); legge dopo l'innesto
  $\omega_m(t) = \frac{1}{k_m}[(C_{m,0}-\tau C_{u,0}) - (C_{m,0}-k_m\omega_Q-\tau C_{u,0})e^{-\frac{k_m}{I_{eq}}(t-t_Q)}]$ con
  regime $(C_{m,0}-\tau C_u)/k_m$ (p. 206, verificata); diagramma finale strisciamento/aderenza.
- **Assente nella dispensa**: energia dissipata $E_{diss} = \int C_{fr}|\Delta\omega|dt$ e la capacità termica; la
  condizione di ritorno allo slittamento se la coppia richiesta supera il limite.
- Coerenza dei segni: «$\dot\omega_m < 0$ se $C_{fr} > C_m$» è coerente con $I_m\dot\omega = C_m - C_{fr}$ (p. 203).

### q16 — Riduttore di coppia (dispensa p. 201 per le relazioni coppia–velocità)

- La frase citata dalla risposta («un riduttore di velocità è un moltiplicatore di coppia; un moltiplicatore di giri è un
  riduttore di coppia») **non è in pp. 193–206**. Da ricerca nel progetto risulta nel capitolo dei rotismi (parte
  pp. 180–190, pagina «Rotismo combinato»: «RIDUTTORE DI GIRI ⇒ MOLTIPLICATORE DI COPPIA … MOTO DIRETTO; MOLTIPLICATORE DI
  GIRI ⇒ RIDUTTORE DI COPPIA … MOTO RETROGRADO»): pagina non letta in questa trascrizione, da verificare in quel capitolo.
- Relazioni: risposta $C_u = C_i/\tau$ (ideale), $C_u = \eta C_i/\tau$ (reale) ↔ dispensa p. 201, a regime
  $C_m = C_u\tau$ (η = 1) e, ponendo $\dot\omega_m = 0$ in $C_m - C_u\tau/\eta = \dots$, $C_u = \eta C_m/\tau$: coincidono
  (in modulo; nella dispensa $C_u$ è la coppia resistente dell'utilizzatore, nella risposta la coppia d'uscita).
- Omesso dalla risposta: che con η ≠ 1 nel transitorio anche l'inerzia riportata è $I_u\tau^2/\eta$ (p. 201).

---

## 3. Derivazioni della dispensa non coperte dalle dimostrazioni assegnate

| Derivazione | Pagine PDF |
|---|---|
| Velocità di sincronismo $n_s = 60f/P$, $\omega_s = 2\pi f/P$ (solo formula) | 194 |
| Coppia dell'argano/ascensore dalla II ECD: $C_u = (M_{cab} - M_{contr})gR$ | 195 |
| Coppia richiesta da un autoveicolo: $C_u = (fMg + Mg\sin\alpha + \frac12\rho C_xSV^2)R_p = K_1 + K_2V^2$ | 196 |
| Inerzia equivalente dell'ascensore per equivalenza energetica: $I_u = I_t + (M_{cab}+M_{contr})r_t^2$ | 196 |
| Analisi qualitativa della stabilità ed esempio con due punti di regime (Q instabile, P stabile) | 197–198 |
| Transitorio da fermo motore c.c. + carico costante: $\omega_P$, $\omega(t)$ | 199–200 |
| Tempo al 90% e tempo generico $t_{\%}$ | 200 |
| Equazione del moto con trasmissione e rendimento η ≠ 1 (completa, con inerzia ÷ η) | 201 |
| Esempio numerico E4/2 | 201 |
| Coppia trasmessa dalla frizione (strisciamento / aderenza) | 202 |
| Lato motore in slittamento: $\omega_m(t)$ esponenziale da $\omega_m^{I}$ | 203 |
| Lato utilizzatore: $\omega_c(t)$ lineare | 204 |
| Sincronizzazione nel punto Q e moto dopo l'innesto $\omega_m(t)$ per $t > t_Q$ | 205–206 |

---

## 4. Simboli del capitolo

| Simbolo (come nella fonte) | Significato | Pagina PDF |
|---|---|---|
| $m_s$ [lettura incerta, prob. $n_s$] | velocità di sincronismo in giri/min, $60f/P$ | 194 |
| $\omega_s$, $\omega_S$ | velocità di sincronismo (rad/s); nei grafici velocità a coppia nulla | 194, 195, 197–199 |
| f | frequenza della corrente (p. 194); coefficiente d'attrito volvente (p. 196); coefficiente d'attrito radente (p. 202) | 194, 196, 202 |
| P | numero di coppie polari (p. 194); punto di stazionarietà (pp. 197–203) | 194, 197 ss. |
| $C_s$ / $M_s$ | coppia di spunto (testo / figura) | 194 / 195 |
| $C_{max}$ / $M_{max}$ | coppia massima (testo / figura) | 195 |
| $M_n$, $n_n$, $n_0$ | coppia e velocità nominali, velocità a coppia nulla (figura motore asincrono, n in rpm) | 195 |
| $C_{nom}$ | coppia nominale motore c.c. | 195 |
| $C_m$, $C_u$ | coppia motrice, coppia (resistente) dell'utilizzatore | 195 ss. |
| $C_A$ | coppia del motore a ω = 0 (avviamento) nei grafici | 197–198 |
| $C_{u0}$ | coppia dell'utilizzatore a ω = 0 | 197–198 |
| $M_{cab}$, $M_{contr}$, R | massa cabina, massa contrappeso, raggio tamburo | 195 |
| $R_p$, $F_T$, $R_{aer}$, $C_x$, S, V, α | raggio ruota, resistenza al rotolamento, resistenza aerodinamica, coeff. aerodinamico, superficie frontale, velocità, pendenza | 196 |
| $K_1$, $K_2$ | coefficienti di $C_u = K_1 + K_2V^2$ | 196 |
| $I_m$, $I_u$ | inerzia lato motore, lato utilizzatore | 196–206 |
| $I_t$, $I_{tamb}$, $r_t$ | inerzia e raggio del tamburo | 196 |
| $E_K$ | energia cinetica | 196 |
| ω, $\dot\omega$ | velocità e accelerazione angolare comune (accoppiamento diretto) | 197–200 |
| $\omega_R$ | velocità di regime | 197–198 |
| $\omega_P$ | velocità del punto P (= regime) | 198–200, 203 |
| $\omega_Q$, $\omega_1$, $\omega_2$, $C_{m1}$, $C_{u1}$, $C_{m2}$, $C_{u2}$ | punto di regime instabile Q e valori di prova | 198 |
| $K_m$, $K_u$ (anche $k_m$, $k_u$) | pendenze delle caratteristiche nel punto di lavoro | 198–206 |
| $C^P_{m_{LIN}}$, $C^P_{u_{LIN}}$ | rette tangenti in P | 198 |
| $C_{m,P}$, $C_{u,P}$ | coppie nel punto P | 198 |
| Ω, $\Omega_0$ | scostamento $\omega - \omega_P$ e suo valore iniziale | 198–199 |
| $C_{m,0}$ (anche $C_{m0}$, $C_o$), $C_{u,0}$ | intercette a ω = 0 delle caratteristiche (lineari o linearizzate) | 199–206 |
| $I_{eq}$ | inerzia equivalente: $I_m + I_u$ (p. 199), $I_m + \tau^2 I_u$ (p. 206) | 199, 206 |
| $t_{90\%}$, $t_{\%}$ | tempo per raggiungere 90% / % della velocità di regime | 200 |
| τ | rapporto di trasmissione $\omega_u/\omega_m$ | 201, 204–206 |
| η | rendimento della trasmissione | 201 |
| $\omega_m$, $\omega_u$ | velocità lato motore, lato utilizzatore | 201–206 |
| $C_u^*$ | coppia resistente ridotta all'asse motore, $\tau C_u$ | 201 (E4/2) |
| $C_{mo}$, $k_m$, $k_u$, W | dati dell'esempio E4/2, potenza trasmessa | 201 |
| $C_{fr}$ (anche $C_{fr}^{(s)}$, $C_{fr}^{(a)}$) | coppia trasmessa dalla frizione (strisciamento / aderenza) | 202–206 |
| $f_{att}$ | coefficiente d'aderenza | 202 |
| $F_N$ (F nelle figure) | forza normale di chiusura della frizione | 202 |
| $\bar r$, $r_m$, $r_i$, $r_e$ | raggio medio $(r_i+r_e)/2$, raggi interno ed esterno della corona | 202 |
| m | numero di dischi della frizione | 202 |
| $t_{inn.fr.}$ [lettura incerta] | istante d'innesto | 202 |
| $\omega_{MIN}$ | velocità minima del motore a c.i. | 202–203 |
| $\omega_m^{I}$ | regime a vuoto del motore a c.i. ($C_m = 0$), velocità all'inizio dell'innesto | 202–206 |
| $dF_{ATTR}$, $V_P$, $V_{rel}$ | forze d'attrito elementari, velocità di un punto del disco, velocità relativa | 203–204 |
| $C_{m\,fitt}$ | coppia del «motore fittizio» (frizione) sul lato utilizzatore | 204 |
| $\omega_c$ | velocità del disco condotto (motore fittizio) | 204–206 |
| Q, $t_Q$, $\omega_Q$ | punto e istante di sincronizzazione (pp. 205–206; diverso dal Q di p. 198) | 205–206 |
| $\omega_{m\,REG}$ | velocità di regime dopo l'innesto | 206 |

### Conflitti di notazione

1. **Coppia C vs M**: la figura del motore asincrono (p. 195) usa M, $M_s$, $M_{max}$, n [rpm], $n_0$; il testo usa C,
   $C_s$, $C_{max}$, ω, $\omega_s$.
2. **$K_m$ con segno o in modulo**: p. 198 $K_m = dC_m/d\omega$ (con segno, criterio $K_m < K_u$). P. 199 la stessa lettera è
   prima definita $= -C_{m0}/\omega_S$ (negativa, «ma $K_m < 0$») e poi usata in $C_m = C_{m,0} - K_m\omega$,
   $\omega_P = (C_{m,0}-C_{u,0})/K_m$, $e^{-K_mt/I_{eq}}$, dove deve essere il **modulo** $C_{m0}/\omega_S > 0$ (SymPy:
   le soluzioni stampate valgono con $K_m > 0$). Stesso uso in modulo a pp. 203 e 206. Le derivate (q08, d103) usano il
   segno: coerente con p. 198, non con pp. 199–206.
3. **$I_{eq}$** = $I_m + I_u$ (p. 199) e $I_m + \tau^2 I_u$ (p. 206), mai definito esplicitamente.
4. **P** = numero di coppie polari (p. 194) e punto di regime (da p. 197). **Q** = punto di regime instabile (p. 198) e
   punto di sincronizzazione della frizione (pp. 205–206).
5. **$\omega_P$** = regime dell'accoppiamento (pp. 198–200) ma a p. 203 = regime fittizio «se i dischi fossero sempre in
   slittamento»; il regime vero dopo l'innesto è $\omega_{m\,REG}$ (p. 206). Nel grafico di p. 197 il regime è $\omega_R$.
6. **f**: frequenza (p. 194), coefficiente di rotolamento (p. 196), coefficiente radente (p. 202); $f_{att}$ aderenza
   (p. 202). Le derivate usano μ.
7. **m** = numero di dischi (p. 202) vs M = massa (pp. 195–196).
8. **$C_u$** con segno nel T.F.V. di p. 201 («$C_u\omega_u < 0$») e in modulo nella riga successiva e altrove.
9. **Rapporto**: dispensa τ = $\omega_u/\omega_m$; d105, d106, d107, d140 usano $i = \omega_m/\omega_u = 1/\tau$
   (inerzia $/i^2$ ↔ $\tau^2$, coppia $/i$ ↔ τ). q09, q10, q16 usano τ come la dispensa.
10. **I vs J**: la dispensa usa sempre I; tutte le fonti derivate usano J.
11. Lato utilizzatore della frizione: la dispensa chiama $\omega_c$ la velocità del disco «solidale al lato motore» (p. 204),
    ma dal modello è il disco solidale al lato **utilizzatore**; le derivate usano $\omega_u$ o $\omega_{fr,u}$.

### Errori/refusi della dispensa rilevati (dettagli come [NdT] in `cap6.md`)

- p. 196: resistenza al rotolamento $fMg$ invece di $fMg\cos\alpha$; «V_tamb» per «V_cab».
- p. 199: $C_m = C_o - K_m\omega_p$ (dovrebbe essere $-|K_m|\omega$) e segno di $K_m$ (vedi conflitto 2).
- p. 200: $t_{\%} = -\frac{I_{eq}}{K_m}(1-\%)$ senza ln; corretto $-\frac{I_{eq}}{K_m}\ln(1-\%)$.
- p. 201: equazione di partenza con η incoerente con il risultato (risultato corretto).
- p. 202: $f_{att}$ nella formula della coppia trasmessa durante lo strisciamento (dovrebbe essere f radente, come la fonte
  stessa dice subito dopo).
- p. 203: «ω/dt» per «dω/dt».
- p. 204: «Anche il lato motore» per «lato utilizzatore»; $\omega_c$ «solidale al lato motore».
