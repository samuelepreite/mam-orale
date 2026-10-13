# Capitolo 3 — Freni e frizioni: riscontro con dimostrazioni e domande derivate

Fonte di verità: trascrizione `cap3.md` (PDF pp. 103–128). Fonti derivate confrontate: `dd/d038…d054`, `dd/d142`,
`dq/q12, q13, q37–q43` (più q10 per la parte di frizione). Tutte le differenze di formula sono state verificate con
SymPy (script di controllo nello scratchpad; risultati riportati tra parentesi).

## 0. Le differenze più importanti (sintesi)

1. **Nomenclatura avvolgente/svolgente invertita nella dispensa (pp. 109–110, ceppi esterni).** La dispensa chiama
   «ceppo avvolgente (compresso) frena(−)» il ceppo in cui l'attrito si **oppone** al comando
   (Fh = F_N,A·OO' + F_T,A·R ⇒ F_T,A = Fh/(OO'/f + R)) e «ceppo svolgente (teso) frena(+)» quello autoenergizzante
   (F_T,S = Fh/(OO'/f − R), che si autoblocca per OO'/f = R, «freno d'emergenza»); il riquadro di p. 109 dice
   esplicitamente «il freno svolgente avrà una frenata più forte». q39, d042, d043 usano la convenzione usuale
   (avvolgente = autoenergizzante, autobloccaggio sull'avvolgente). La dispensa stessa a p. 110 («Vari casi», ceppo
   interno) dà la definizione usuale («se la forza frenante applicata dal tamburo sul ceppo aiuta la rotazione allora
   questo sarà avvolgente»), quindi è **internamente incoerente**. Conti verificati: N_dx = Fh/(d + fR),
   N_sx = Fh/(d − fR) con tamburo orario. All'orale conviene dire la definizione (momento dell'attrito concorde o no
   con quello del comando) e non affidarsi ai nomi «destro/sinistro», segnalando che le formule della dispensa danno
   più frenatura al ceppo «teso».
2. **Frizione conica (q42, d053) ≠ libro (5.88).** Il libro include l'attrito lungo la generatrice che si oppone
   all'accostamento: p_a = p(sin α + f cos α) e C_f = f N'(r_e + r_i)/[2(sin α + f cos α)]; q42/d053 danno
   C = μP R_m/sin α (manca f cos α al denominatore). Esempio: f = 0.3, α = 15° ⇒ sin α = 0.259 contro
   sin α + f cos α = 0.548: la formula di q42 dà una coppia 2.1 volte maggiore. Per α → 0 il libro dà C → N'R_m
   (finito), q42 → ∞. (Verificato: la (5.88) segue integrando f p r sull'area conica con p = K/r.) Nota: la (5.87)
   del libro per p manca di un fattore sin α se p è la pressione sulla superficie conica (la (5.88) è comunque giusta).
3. **Freno a pattino (d044, q12):** la dispensa frena un **nastro** (traslante): il risultato è la forza frenante
   F_T = C_az/(x₀/f ± h) con x₀ = (2/3)[(s+l)³ − s³]/[(s+l)² − s²] (Varignon su p(x) = k'x), e il segno «−» è il
   «freno di sicurezza» (impuntamento per x₀/f = h). d044 conclude con «C_f = μN R_eff» sul «tamburo/disco»: non è
   nella dispensa. q12 non riporta x₀, F_T in funzione di C_az né il caso «freno di sicurezza».
4. **Freno a disco: |F_T| ≠ f|F_N|.** La dispensa (p. 116, 127–128) insiste che per un pattino a settore α la
   risultante tangenziale è F_T = f F_N·sin(α/2)/(α/2), che il braccio di F_T è b_t = r_m(α/2)/sin(α/2) e che la
   risultante normale è a b_m = r_m·sin(α/2)/(α/2) (b_m·b_t = r_m²; per α = 2π: F_T = 0, coppia pura). d039
   generalizza T = μN «per le risultanti coerenti» e d049/d052 scrivono C = μN R_m: corretto come coppia, ma la
   dispensa sottolinea che C ≠ |F_T|·r_m se α è finito. q40 cita il fattore sin(α/2)/(α/2) ma non b_t, b_m né la
   coppia pura.
5. **Fuori intervallo:** partitore di frenata (q41, d051), frizione centrifuga (q43, d054) e freno a disco/frizione a
   **pressione uniforme** (d047, parte di d049, q13 «ipotesi alternativa») non compaiono nelle pp. 103–128 (la
   pressione costante del disco nuovo è citata solo qualitativamente a p. 108, Fig. 5-62a).

## 1. Tabella delle dimostrazioni

| n. | Titolo | Pagine dichiarate | Pagine reali | Presente | Risultato coincide? | Note |
|---|---|---|---|---|---|---|
| 38 | Freno a ceppo: risultante normale | 103–107 | 106 (anche 107 per il punto m) | sì | sì, in forma generale | Dispensa: F_N^(C,T) = ∫_{−α/2}^{α/2} p(θ) R dθ B n(θ), n = −cos θ i − sen θ j; con p = p₀: F_N = −2p₀RB sin(α/2) i (solo componente lungo la bisettrice, per simmetria). d038 non scrive questo risultato. Notazione: B profondità (non b), apice (C,T) = ceppo su tamburo. A p. 103 non c'è nulla sulla risultante normale. |
| 39 | Freno a ceppo: risultante tangenziale | 107 | 107 | sì | sì per il tamburo | Dispensa: F_T^(C,T) = −2f p₀RB sin(α/2) j = −|F_T| j, |F_T| = f|F_N|; |M_f| = |F_T|R = |F_f| R sin φ. Coefficiente f (non μ). La dispensa mostra (p. 116) che per il disco |F_T| = f|F_N| **non** vale: la frase di d039 «T = μN per le risultanti» non va generalizzata. Omessi: forza frenante F_f = F_N + F_T, cerchio d'attrito ρ = R sin φ, scelta della tangente. |
| 40 | Ipotesi di Reye-Archard | 108–109 | 108–109 (anche 114, 116) | sì | sì nella sostanza | Dispensa: «il volume di materiale asportato nell'unità di tempo è proporzionale alla potenza dissipata»: δ̇ dA = k|dF_T·V_P,rel| ⇒ δ̇ = k f ω R p = k'p. d040 parte da «volume ∝ carico × spazio strisciato» (forma di Archard) e conclude «p·v = costante»: la dispensa non scrive mai pv = cost, scrive δ̇ ∝ p·v e ricava δ̇ dalla **cinematica d'accostamento** δ̇ = V_acc·n (tamburo: δ̇ = δ̇(0)cos θ ≈ uniforme ⇒ p uniforme; pattino: δ̇ = kx ⇒ p = k'x; disco: δ̇ uniforme ⇒ p = K''/r). |
| 41 | Distribuzione di pressione da Reye | 109 | 116 (freno a disco), 120 (5.85) | sì | sì | Dispensa p. 116: p(R) = K''/R; libro (5.85): p = N/[2πr(r_e − r_i)] (verificato). A p. 109 c'è il tamburo (p uniforme), non p ∝ 1/r. La giustificazione nella dispensa: accostamento traslatorio (coppia prismatica) ⇒ consumo uniforme, v = ωr. |
| 42 | Ceppo avvolgente/svolgente | 110–113 | 103, 109–110 | sì | **no (nomi invertiti)** | Dispensa p. 110 (polo O'): avvolgente +Fh − F_N,A OO' − F_T,A R = 0; svolgente F_N,s OO' − F_T,s R − Fh = 0. Il ceppo con il termine d'attrito che **riduce** F (autoenergizzante) è chiamato «svolgente (teso)» a pp. 109–110; d042 lo chiama avvolgente. La dispensa a p. 110 in basso (ceppo interno) usa invece la definizione di d042. Bracci nella dispensa: b_N = OO', b_T = R (O' sulla verticale per O). La dispensa risolve anche graficamente (Z, poligono delle forze). |
| 43 | Autofrenatura del ceppo | 110–113 | 110 (anche 115, 125 per il pattino) | sì | formula sì (f_lim = OO'/R = b_N/b_T), attribuzione no | Dispensa: F_T,s = Fh/(OO'/f − R) → ∞ se OO'/f ≃ R, «condizione di **freno d'emergenza**», sul ceppo che la fonte chiama svolgente. Pattino: F_T = C_az/(x₀/f ± h), «"−" freno di sicurezza … che causa l'impuntamento» (pp. 115, 125). d043 ragiona con F = 0, la dispensa con F_T → ∞ a F finita (equivalenti). |
| 44 | Freno a pattino: accostamento rigido | 114–115 | 114–115, 124–125 | sì | **no** | Dispensa: pattino incernierato in O, premuto sul **nastro** da una coppia C_az; un grado iperstatico; δ̇ = −ω_acc x = kx; p(x) = k'x; F_N = −Bk'[x²/2]_s^{s+l} ĵ, F_T = −fBk'[x²/2]_s^{s+l} î, |F_T| = f|F_N|; x₀ da Varignon; F_T = C_az/(x₀/f ± h). Non c'è un «momento sul tamburo/disco» né C_f = μN R_eff. d044 omette Reye e p lineare (il punto centrale). Nella dispensa ci sono anche errori di segno su C_az e un esponente x⁴ dubbio (vedi NdT pp. 114–115). |
| 45 | Freno a pattino: accostamento libero | 113–115 | 103, 112–113, 125 | parziale | parziale | Dispensa: con coppia sull'asta il ceppo/pattino ha **due** forze (frenante + cerniera A) ⇒ uguali, opposte, collineari (pp. 103, 112, 125); tre forze concorrenti (punto Z) quando F è applicata al ceppo (p. 113). Nel pattino libero non c'è il cerchio d'attrito (R → ∞, R sin φ → ∞): la retta passa per A ed è inclinata di φ sulla normale (p. 125). d045 tratta solo il caso a tre forze. |
| 46 | Punto di applicazione: Varignon | 123–125 | 114–115 (pattino), 125, 128 (disco) | sì | sì (principio) | Dispensa: F_N x₀ = ∫x dF_N ⇒ x₀ = (2/3)[(s+l)³ − s³]/[(s+l)² − s²] (verificato); disco: risultante normale «più in basso» (più vicina al centro) — b_m = r_m sin(α/2)/(α/2) non è scritto nella fonte. Le pp. 123 non parlano di Varignon. |
| 47 | Disco: coppia a pressione uniforme | 116–128 | — (solo cenno qualitativo p. 108, Fig. 5-62a) | **no** | — | La formula C = (2πμp/3)(R_o³ − R_i³) è corretta per una corona completa (verificato) ma la dispensa non la ricava: il disco è trattato solo con Reye (p = K''/r) e su un settore α. |
| 48 | Disco: coppia a usura uniforme | 126–128 | 116 (formule), 126–127 (spiegazione), 120 (5.84) | sì | sì | Dispensa: M_f = f F_N r_m, r_m = (r_e + r_i)/2, su settore α: F_N = K''α(r_e − r_i). Notazione: f, r_e, r_i, K'', F_N (non μ, R_o, R_i). La dispensa ricava p ∝ 1/r dal consumo uniforme (accostamento traslatorio), non da pv = cost. |
| 49 | Raggio medio equivalente | 126–128 | 116, 127 | parziale | sì per usura uniforme | Dispensa: solo r_m = (r_e + r_i)/2. Il rapporto «cubico/quadratico» (pressione uniforme) non c'è. Attenzione: la dispensa definisce anche il braccio b_t della risultante tangenziale, b_t = M_f/|F_T| = r_m(α/2)/sin(α/2) ≠ r_m (p. 127, verificato): R_m = C/(μN) va letto con N risultante normale, non con |F_T|. |
| 50 | Pattino piano come limite del ceppo | 124–128 | 114 («R → +∞»), 124, 125 | sì | sì | Dispensa p. 124: «Un ceppo esteso all'infinito sarà un pattino piano…»; «caso limite, con raggio infinitamente esteso». Aggiunge ciò che d050 omette: il consumo non è più uniforme (lineare con la distanza da O*), e il cerchio d'attrito degenera (p. 125). |
| 51 | Partitore di frenata | 103–128 | — | **no** | — | Nessun cenno nelle pp. 103–128. |
| 52 | Frizione piana | 116–128 | 119–120 (libro 5.84–5.86), 116 | sì | sì (usura uniforme) | Libro: C_f = i f N (r_e + r_i)/2 (5.86), *i* = numero di superfici di attrito, f coefficiente; «frizione assiale semplice identica a un freno a disco ad accostamento rigido; differenza: entrambi i dischi ruotano». p = N/[2πr(r_e − r_i)] (5.85). Non c'è il caso a pressione uniforme. |
| 53 | Frizione conica | 116–128 | 121–122 (libro 5.87–5.88) | sì | **no** | Libro: C_f = f N'(r_e + r_i)/[2(sin α + f cos α)] (5.88); d053: C = nμF_a R_m/sin α (manca f cos α, dovuto all'attrito che si oppone all'accostamento; il libro non moltiplica per n). Verificato con SymPy. |
| 54 | Frizione centrifuga | 116–128 | — | **no** | — | Non presente nelle pp. 103–128. |
| 142 | Consumo massimo e scelta geometrica del ceppo | 108–128 | 108, 112, 123 | parziale | parziale | Dispensa p. 108: δ̇(θ) = δ̇(0) cos θ (O' sotto O, massimo al centro; per α = π/2 −30% agli estremi). P. 112 («Particolarità») e p. 123: nell'accostamento libero si alza la cerniera A in modo che la retta d'azione passi per il punto medio M dell'arco (sulla bisettrice) e sia tangente al cerchio d'attrito; «il centro di rotazione si troverà sulla normale rispetto alla bisettrice». La dispensa non fa la derivata né una dimostrazione generale (verificato: δ̇ = ω_acc∧(O−C)·n è massimo dove OP ⊥ OC, quindi C sulla retta per O perpendicolare alla bisettrice). |

## 2. Domande

### q10 — Accoppiamento M–U con trasmissione e frizione (solo parte frizione)
La dispensa nel mio intervallo **ne parla** nelle pp. 117–119 (libro, §5.7.1), senza trasmissione τ:
- equazioni: C_m − C_f − I₁ dω₁/dt = 0, C_f − C_r − I₂ dω₂/dt = 0 (p. 118) — coincidono con q10 a meno della notazione
  (libro I₁, I₂, ω₁, ω₂, C_f; q10 J_m, J_u, ω_m, ω_u, C_fr);
- ipotesi del libro per l'andamento di Fig. 5-72: |C_f| > |C_m|, |C_r|, ω₁₀ = ω₀, ω₂₀ = 0; dopo ω₁ = ω₂ = ω* «unico
  elemento rigido» (curva 3) — coerente con q10 (fasi di slittamento/sincronizzazione/aderenza);
- **omessi da q10**: (5.82) L_f = ½[I₁ω₁₀² + I₂ω₂₀² − (I₁+I₂)ω_f²] + ∫C_mω₁dt − ∫C_rω₂dt (dall'equazione dell'energia
  C_m dϑ₁ − C_r dϑ₂ − dL_f = dE); innesto breve «assimilabile a un urto»: (5.83) ω_f = (I₁ω₁₀ + I₂ω₂₀)/(I₁ + I₂) e
  L_f = I₁I₂(ω₁₀ − ω₂₀)²/[2(I₁ + I₂)] (verificato). q10 dà solo P_diss = C_fr|Δω|, E = ∫P dt (equivalente ma non
  integrata). La condizione di aderenza |C_rich| ≤ C_max è nel libro solo a parole (p. 117).

### q12 — Freno a pattino
- Struttura, iperstaticità, p(x) = Kx, F_T = μF_N, Varignon: coincidono con pp. 114–115, 124–125.
- Notazione: la dispensa chiama **O*** la proiezione della cerniera sul nastro (q12: O'); coefficiente f; costante k';
  pattino fra x = s e x = s + l; profondità B; coppia C_az; il consumo è ricavato come determinante
  ω_acc∧(P−O*)·m = −ω_acc x (q12: dδ = x dθ, equivalente).
- Reye: q12 «dL_att = k dV»; dispensa «portata ∝ potenza dissipata» δ̇ dA = k̄|dF_T·V_nastro| (stessa legge).
- **Omesso da q12**: x₀ = (2/3)[(s+l)³ − s³]/[(s+l)² − s²]; F_T = C_az/(x₀/f ± h) con «−» = freno di sicurezza /
  impuntamento; confronto col tamburo (consumo uniforme per α ≤ 90°, qui no); «la forza normale rimane l'unica a dover
  riequilibrare la forza tg e la coppia quindi sarà più grande» (p. 125); verso di F_T: −î «perché il nastro va verso
  sinistra» (p. 124).
- La dispensa ha nel passaggio di p. 114 un cambio di segno su C_az (NdT): q12 scrive «C + M_O(F_N) + M_O(F_T) = 0 con
  segni dal disegno», che è la forma corretta.

### q13 — Frizione piana
- Coppia in usura uniforme, F = 2πK(r_e − r_i), C = μ2πK(r_e² − r_i²)/2, R_m = (r_e + r_i)/2, C = nμF R_m: coincidono con
  (5.84)–(5.86) e p. 116 (verificato). Notazione del libro: f, N (forza assiale), *i* (numero superfici), r_e, r_i.
- **Assente nella dispensa** (pp. 103–128): «ipotesi alternativa: pressione uniforme, R_m = (2/3)(r_e³ − r_i³)/(r_e² − r_i²)»
  (formula corretta, verificata, ma non c'è nella fonte).
- **Omesso**: (5.85) p = N/[2πr(r_e − r_i)]; «frizione assiale semplice identica a freno a disco ad accostamento rigido,
  ma entrambi i dischi ruotano»; frizioni a dischi multipli (fino a 60 dischi, dischi a dentatura esterna sul condotto,
  altri sull'albero cavo motore, Fig. 5-74); calore dovuto al lavoro negativo della coppia d'attrito durante l'innesto.

### q37 — Ipotesi di Reye–Archard
- Legge e passaggi μpv = K δ̇ coincidono con p. 109 (dispensa: δ̇ = k f ω R p, costante k' = k f ω R).
- Disco: p = K/r, pressione maggiore all'interno: coincide (p. 116, Fig. 5-62).
- **Omesso (centrale nella dispensa)**: il consumo si ricava dalla cinematica di accostamento δ̇ = V_acc·n
  (p. 108): nel tamburo δ̇(θ) = δ̇(0) cos θ, quasi uniforme per α ≤ 90° (−30% agli estremi per α = π/2) ⇒ pressione
  uniforme nel tamburo (p. 109); nel disco l'accostamento è traslatorio (coppia prismatica) ⇒ consumo uniforme ⇒
  p ∝ 1/r; nel pattino δ̇ = kx ⇒ p ∝ x. Fig. 5-62 (disco nuovo: p costante; disco usurato più sottile al diametro
  esterno).
- q37 scrive che con δ̇ costante vale pv = cost e poi applica al pattino δ̇ = xθ̇ (non costante): coerente con la
  dispensa, ma la dispensa non usa mai la forma «pv = costante».

### q38 — Freno a pattino: accostamento rigido e libero
- Rigido iperstatico (dispensa: «per un grado iper statico», p. 114), Reye, p = Kx, Varignon: coincidono.
- Libero: due forze collineari, risultante inclinata di φ sulla normale: coincide con p. 125.
- **Omesso**: per il pattino non esiste cerchio d'attrito (R → ∞ ⇒ R sin φ → ∞, p. 125); «se applico una coppia
  maggiore la forza frenante aumenta in modulo ma non si inclina di più (Coulomb)»; nel libero «non posso determinare il
  profilo di pressione a priori ma devo risolvere la statica prima»; caso «con asta senza coppia» (reazione lungo l'asta,
  poligono delle forze; con coppia conviene A vicino al centro del pattino); conteggio gdl l = 1 rigido / l = 2 libero
  (pp. 106, 111–113).
- L'«impuntamento nel pattino libero» di q38 non è nella dispensa in quella forma: la dispensa lega il «freno di
  sicurezza / impuntamento» al segno «−» in F_T = C_az/(x₀/f ± h) (accostamento rigido, pp. 115, 125).

### q39 — Freno a ceppi: avvolgente e svolgente
- **Conflitto di nomi** (vedi §0.1): la dispensa (pp. 109–110, ceppi esterni con tamburo orario) dà
  F_T,A = Fh/(OO'/f + R) per il ceppo che chiama avvolgente e F_T,S = Fh/(OO'/f − R) per quello che chiama svolgente,
  con «il freno svolgente avrà una frenata più forte»; q39 attribuisce il denominatore (b_N − μb_T) all'avvolgente.
  Definizione della dispensa a p. 110 (ceppo interno) = quella di q39. Il criterio pratico di q39 («disegna il verso del
  tamburo… se aiuta il comando ⇒ avvolgente») è quello della p. 110.
- Notazione: dispensa f, OO' (braccio di N), R (braccio di T), h, F_T,A / F_T,S, M_f = F_T R; q39 μ, b_N, b_T, h_F, R_T.
  In q39 le formule N_sv e N_av sono corrotte («rac F h_F b_N + μb_T» = F h_F/(b_N + μ b_T)).
- Autobloccaggio: la dispensa lo chiama «freno d'emergenza» (OO'/f ≃ R).
- **Omesso da q39**: metodo grafico della dispensa (cerchio d'attrito ρ = R sin φ, scelta della tangente superiore o
  inferiore secondo verso di rotazione e geometria, punto Z, poligono delle forze), ganascia traslante (CIR improprio ⇒
  né avvolgente né svolgente, p. 111), quadrilatero articolato (O' ≡ C₂, gdl = 1, p. 111), «compresso/teso», schema
  di risoluzione (p. 113), momento con due ceppi |M_f| = (|F_f^dx| + |F_f^sx|)ρ (coincide con M_tot = M_av + M_sv).

### q40 — Freni a disco
- dA = r dr dθ, p = K/r, F = Kα(r_e − r_i), M_f = μF(r_e + r_i)/2, fattore sin(α/2)/(α/2): coincidono con p. 116
  (verificati).
- Differenze: la dispensa dice che i freni a disco hanno «maggiore costanza nell'azione frenante» ma «devono essere
  sottoposti ad una forza di comando più intensa» a parità di dimensioni (p. 116): q40 omette questo svantaggio; la
  «buona dissipazione termica» di q40 non è nella dispensa.
- **Omesso da q40**: consumo uniforme perché l'accostamento è traslatorio (coppia prismatica) — è la ragione di p ∝ 1/r;
  pinza flottante, due pattini simmetrici (altrimenti il disco si piegherebbe), coppia sul pattino riequilibrata dalla
  coppia prismatica (pp. 126–127); vari casi di α (α = 0 punto, α ≪ 1, α finito, α = 2π: F_T = 0 frizione piana,
  coppia pura); braccio b_t = r_m(α/2)/sin(α/2) e posizione della risultante normale più vicina al centro
  (b_m·b_t = r_m²); «F_N ed F_T applicate nello stesso punto solo se α = 0» (p. 128).

### q41 — Partitore di frenata
**Non presente** nelle pp. 103–128 (nessun cenno a partitore, trasferimento di carico in frenata o a_max = μg). La
domanda dichiara di collegarsi alla «decelerazione massima del veicolo trattata nelle dispense»: quella parte, se c'è,
è fuori dal mio intervallo (d136 la dichiara a pp. 100–102).

### q42 — Frizioni coniche
- Struttura e ruolo dell'angolo: coincidono (α = semiangolo, angolo fra generatrice e asse, Fig. 5-75).
- **Formula diversa** (vedi §0.2): libro p_a = p(sin α + f cos α), C_f = f N'(r_e + r_i)/[2(sin α + f cos α)];
  q42 C = μP R_m/sin α. La differenza nasce dalle forze tangenziali fp «che si oppongono al moto di accostamento dei
  due coni». Conseguenza: per α → 0 il libro dà una coppia limitata (→ N'R_m), q42 illimitata. Notazione: libro N'
  (forza assiale) e f; q42 P e μ.
- Omesso da q42: (5.87) p(r) ∝ 1/r anche sulla superficie conica (Reye); «a parità di forza assiale e di ingombro
  esterno coppia molto superiore a quella di una frizione assiale semplice».
- «Perché non si fa α piccolissimo» (serraggio/difficoltà di disinnesto): non è nella dispensa (contenuto aggiunto).

### q43 — Frizioni centrifughe
**Non presente** nelle pp. 103–128.

## 3. Derivazioni della dispensa non coperte dalle dimostrazioni assegnate

| Derivazione | Pagine PDF |
|---|---|
| Cerchio d'attrito: |M_f| = |F_T|R = |F_f| R sin φ, ρ = R sin φ; scelta della tangente corretta | 107, 109–113 |
| Forza frenante F_f = F_N + F_T con ω antioraria e dipendenza dal verso di ω | 107 |
| Consumo nel tamburo dalla cinematica d'accostamento: δ̇ = ω_acc∧(O−O')·n = δ̇(0) cos θ; −30% per α = π/2 | 108 |
| Reye nel tamburo ⇒ pressione uniforme (δ̇ = k f ω R p) | 109 |
| Costruzione grafica a tre forze (punto Z, poligono) per ceppi esterni/interni | 109–113 |
| Ganascia traslante: CIR improprio, né avvolgente né svolgente; reazione prismatica | 103, 111–112 |
| Quadrilatero articolato: gdl = 3×3 − 4×2 = 1, centro di rotazione O' ≡ C₂ | 103, 111 |
| Conteggio gdl per distinguere accostamento rigido/libero (l = 1 / l = 2) | 106, 112, 113 |
| Schema di risoluzione dei freni a tamburo (1)–(3.3) | 113 |
| Pattino: x₀ (Varignon) e F_T = C_az/(x₀/f ± h), «freno di sicurezza» | 114–115 |
| Disco: |F_T| = f|F_N| sin(α/2)/(α/2) e casi α = 0, ≪1, finito, 2π | 116 |
| Disco: braccio b_t, coppia pura per α = 2π, posizione della risultante normale (Varignon) | 127–128 |
| Frizione: lavoro dissipato all'innesto (5.82) dall'equazione dell'energia | 117 |
| Innesto impulsivo: (5.83) ω_f e L_f = I₁I₂(ω₁₀ − ω₂₀)²/[2(I₁+I₂)] | 118 |
| Equazioni dinamiche durante l'innesto e Fig. 5-72 (coperte in parte da d108–d110, dichiarate a pp. 202–203) | 118–119 |
| Pressione nella frizione piana (5.85) e frizione multidisco (5.86) | 120 |
| Pressione nella frizione conica (5.87) | 122 |

## 4. Simboli del capitolo

| Simbolo | Significato | Pagina PDF |
|---|---|---|
| f | coefficiente d'attrito (in tutto il capitolo, anche nel libro) | 106–122 |
| μ | coefficiente d'attrito: compare solo in «|F_T| = μ|F_N|?» | 116 |
| φ (phi) | angolo d'attrito, φ = arctg f | 107, 109, 113, 125 |
| ρ | raggio del cerchio d'attrito, ρ = R sin φ | 107, 109, 113 |
| R | raggio del tamburo (p. 106–113); nel disco (p. 116) usato anche per il raggio corrente r | 106–116 |
| B | profondità (larghezza) del tamburo / del pattino | 106, 114 |
| α | angolo di avvolgimento (apertura del ceppo); nel disco apertura del settore; nella frizione conica semiangolo del cono | 106, 116, 121–122 |
| θ | anomalia del punto P sul ceppo / sul settore | 106–108, 116 |
| p, p₀ | pressione di contatto; p₀ costante | 106–109 |
| n, m, m̂ | versore normale (n = −e_r sul tamburo; m nel pattino; m̂ = −k̂ nel disco) | 106, 108, 114, 116 |
| e_r, e_θ | versori radiale e trasversale | 106–107, 116 |
| dF_N, dF_T (dF_n, dF_t) | forze elementari normale e tangenziale | 106–116 |
| F_N, F_T, F_f | risultante normale, tangenziale, forza frenante (F_N + F_T) | 106–116 |
| apice (C,T) / (T,C) | forza del ceppo sul tamburo / del tamburo sul ceppo | 106–113 |
| apice (P,D) | azione del pattino sul disco | 116 |
| M_f | momento frenante | 107, 110, 113, 116 |
| m (minuscolo), M | punto medio dell'arco di contatto (m a p. 107; M nelle figure) | 103, 106–113 |
| O, O' | centro del tamburo; fulcro/cerniera del ceppo (O' = centro di rotazione) | 106–113 |
| O* | proiezione della cerniera O del pattino sul nastro | 114, 124 |
| Z | intersezione delle rette d'azione (costruzione grafica) | 103, 109–111 |
| Φ_O', Φ_A, Φ_B, Φ_c.p., Φ_a.p. | reazioni di cerniera / della coppia prismatica | 109–113 |
| h | braccio della forza di comando F (ceppo) / quota della cerniera sul nastro (pattino) | 110, 114–115 |
| OO' | distanza centro tamburo–cerniera (braccio di F_N) | 108, 110 |
| δ, δ̇ | spessore consumato; consumo (velocità di usura) | 108–109, 114, 116 |
| V_acc, ω_acc | velocità e velocità angolare di accostamento | 108, 114, 116 |
| k, k̄, k', K'' | costanti dell'ipotesi d'usura (significato cambia di pagina in pagina) | 109, 114, 116 |
| s, l, x, x₀ | inizio e lunghezza del pattino, ascissa da O*, ascissa della risultante | 114–115 |
| C, C_az | coppia di accostamento/azionamento | 112, 114–115 |
| r_i, r_e, r_m | raggi interno, esterno e medio | 116, 119–122 |
| b_t, b_m | bracci della risultante tangenziale / normale nel disco | 127–128 |
| C_m, C_r, C_f | coppia motrice, resistente, d'attrito della frizione (C̄ con la barra nel testo) | 117–118 |
| I₁, I₂, ω₁₀, ω₂₀, ω_f, ω*, ϑ₁, ϑ₂ | inerzie, velocità iniziali, finale, di sincronizzazione, angoli | 117–119 |
| L_f | lavoro dissipato nell'innesto | 117–118 |
| N, N', i | forza assiale (piana), forza assiale (conica), numero di superfici d'attrito | 119–122 |
| p_a | componente assiale della forza per unità di superficie (frizione conica) | 121–122 |

Conflitti di notazione:
- f nella dispensa e nel libro, μ in tutte le fonti derivate.
- O' indica la cerniera del ceppo (pp. 106–113) e, negli appunti battuti di pp. 124–125, la cerniera del pattino o la
  sua proiezione (che a p. 114 si chiamano O e O*); q12 chiama O' la proiezione.
- R/r nel disco usati indifferentemente per il raggio corrente; R_T, b_N, b_T, h_F di q39 non esistono nella dispensa
  (OO', R, h).
- Numero di superfici: *i* nel libro, n nelle fonti derivate.
- α: angolo di avvolgimento (tamburo), apertura del settore (disco), semiangolo (cono).
- Costanti di Reye k, k̄, k', K'' ridefinite su ogni pagina (anche k = −ω_acc a p. 114).
- «freno d'emergenza» (ceppo, p. 110) e «freno di sicurezza» (pattino, pp. 115, 125) per l'autobloccaggio; le fonti
  derivate dicono «autofrenatura / auto-serraggio / impuntamento».
