# Riscontro — Ingranaggi e rotismi, prima parte (PDF pp. 155–173)

Confronto della trascrizione `cap5a.md` con le dimostrazioni d072–d088 e d138 (`/home/claude/work/dd/`) e con le domande d'orale q14, q22, q24, q25, q48 (`/home/claude/work/dq/`). Le verifiche sono state fatte a mano e con SymPy (script nel scratchpad: algebra dell'interferenza, limite, valori numerici, segmento dei contatti, rendimenti in accesso e in recesso con il calcolo vettoriale dei momenti).

Notazione della dispensa da tenere presente: τ = ω₂/ω₁ (uscita/ingresso, con segno); C è il punto primitivo (di passo) e P il punto di contatto; R, R_f, R_t sono i raggi primitivo, fondamentale e di testa; a è l'addendum, d il dedendum, i l'interasse; θ è l'angolo di pressione; f è il coefficiente d'attrito. Le fonti derivate usano spesso i = ω₁/ω₂ (il reciproco), P per il punto primitivo, a per l'interasse, d per il diametro, α per l'angolo di pressione e μ per l'attrito.

## 1. Tabella delle dimostrazioni

| n. | Titolo | Pagine dichiarate | Pagine reali nella dispensa | Presente | Il risultato coincide? | Note |
|---|---|---|---|---|---|---|
| 72 | Ruote di frizione: rapporto di trasmissione | 157–160 | 156–157 | sì | sì, a meno della definizione: d072 dà i = ω₁/ω₂ = ±R₂/R₁, la dispensa τ = ω₂/ω₁ = −R₁/R₂ (contatto esterno, p. 156; τ = −C₁z/C₂z = −R₁/R₂ con la T.F.V. a p. 157) | La dispensa ricava il risultato vettorialmente (V_C = ω∧(C−O) per le due ruote, con versori i, j, k) e tratta solo il contatto esterno; il segno «+» per il contatto interno non c'è a p. 156–157 (compare a p. 164 e 172 per le ruote dentate). d072 omette: il limite di aderenza F_t ≤ f F_N e la coppia max \|C₁^max\| = f\|F_N\|R₁ (pp. 156–157), l'analisi del moto relativo con V^R_{O₂} = −ω₁z(R₁+R₂)j (p. 157) e il rapporto della cinghia τ = τ_id(1+T₂/EA)/(1+T₁/EA) (p. 157). |
| 73 | Triangoli simili nella cinematica delle ruote | 158–160 | 158–159 | sì | sì in modulo (ω₁/ω₂ = R₂/R₁ ⇔ \|τ\| = O₁C/O₂C) | La dispensa non usa «velocità ⊥ ai raggi istantanei» ma la proiezione sulla normale comune: \|V₂\|/\|V₁\| = cos α₁/cos α₂, poi \|ω₂\|/\|ω₁\| = O₁P₁cos α₁/(O₂P₂cos α₂) = O₁H₁/O₂H₂ e infine i triangoli simili O₁H₁C ~ O₂H₂C (p. 158–159). Il passaggio da proiezione sulla normale ai segmenti O_iH_i è quello che d073 chiama vagamente «costruisci i triangoli cinematici». Attenzione: a p. 159 la fonte scrive O₁H₁/O₂H₂ = τ = −R₁/R₂ (rapporto positivo uguale a un numero negativo, va letto \|τ\|). |
| 74 | Legge fondamentale dell'ingranamento | 160–163 | 158–160 | sì | sì: la normale comune deve tagliare l'interasse sempre nello stesso punto | **Notazione in conflitto**: d074 chiama P il punto fisso sull'interasse; nella dispensa P è il punto di contatto e il punto fisso è C (C.I.R. del moto relativo). La dispensa aggiunge la classificazione dei punti di contatto (urto, rotolamento, strisciamento: V_N^rel, V_tg^rel, p. 159) e V^R_{2,1} = (ω₂−ω₁)∧(P−C), che cresce con la distanza PC (p. 160). |
| 75 | Evolvente: proprietà della normale | 161–163 | 158, 159, 161, 162 | sì | sì | La dispensa genera l'evolvente con una retta che rotola senza strisciare sulla fondamentale (un «pennino» solidale alla retta), d075 con un filo svolto: stesso concetto. d075 omette due risultati di p. 162: τ = −R_{f1}/R_{f2} (sia dall'equilibrio alla rotazione sia dai triangoli simili) e il fatto che **cambiando l'interasse cambiano solo i raggi primitivi, non quelli fondamentali** (quindi τ resta costante). Attenzione: a p. 161 la fonte scrive che la normale a *una* evolvente «passa sempre per un punto fisso»: è falso (le normali sono tangenti alla fondamentale), vale solo per la normale comune di due ruote che ingranano (NdT nella trascrizione). |
| 76 | Passo, modulo e diametro primitivo | 163–165 | 163, 165 | sì | sì (pz = 2πR, m = p/π ⇒ mz = 2R) | **d** in d076 è il diametro; nella dispensa d è il dedendum (d = 5/4 m, p. 165). La dispensa aggiunge il proporzionamento modulare a = m, d = 5/4 m, h = 9/4 m (p. 165), che d076 non riporta. |
| 77 | Interasse di due ruote dentate | 163–165 | 167 (solo O₁O₂ = i = R₁ + R₂) | parziale | sì: m(z₁+z₂)/2 segue da R = mz/2, ma questa forma esplicita non compare nella dispensa | **a** in d077 è l'interasse; nella dispensa a è l'addendum e l'interasse è i (p. 167). Il caso interno (interasse = R₂ − R₁) non è trattato. |
| 78 | Rapporto di trasmissione tramite numero di denti | 163–165 | 163, 166, 171 | sì | sì in modulo (\|i\| = z₂/z₁ ⇔ \|τ\| = z₁/z₂) | A p. 163 la fonte scrive τ = −R₁/R₂ = z₁/z₂ (manca il segno nell'ultimo membro); a p. 166 e 171 il risultato è corretto: τ = −z₁/z₂. |
| 79 | Numero medio di denti in presa / rapporto di ricoprimento | 166–168 | 166 | sì | sì nella sostanza: z_p = ℓ/p = AB/(p cos θ) ≥ 1 ⇔ ε_α = L_c/p_b con p_b = p cos θ | La dispensa non definisce «passo di base» né ε_α o L_c: passa per l'**arco d'azione** ℓ = MC + M'C = AB/cos θ sulla primitiva (con MC = BC/cos θ dimostrato tramite l'arco RS sulla fondamentale), poi divide per il passo p. Simbolo della dispensa: z_p. Angolo α (fonte derivata) contro θ (dispensa). |
| 80 | Lunghezza del segmento di condotta | 166–168 | 166 | sì | sì (SymPy: √(R_{t1}²−R_{f1}²) + √(R_{t2}²−R_{f2}²) − (R₁+R₂)sin θ coincide con la formula della dispensa per R_i = mz_i/2, a = m) | La dispensa scrive AB = (AH₁ − CH₁) + (BH₂ − CH₂) e arriva alla forma in z, m, θ: AB = (m/2)[z₁√((1+2/z₁)² − cos²θ) + z₂√((1+2/z₂)² − cos²θ) − (z₁+z₂)sin θ]. d080 si ferma ai raggi; «a sin α» con a = interasse è (R₁+R₂)sin θ nella dispensa (dove a è l'addendum). Attenzione alla convenzione della dispensa: A è sulla testa della ruota 1 dalla parte di H₂ e B sulla testa della ruota 2 dalla parte di H₁. |
| 81 | Interferenza: condizione geometrica | 167–169 | 165, 167 | parziale | sì nella sostanza | La dispensa dà la condizione in modo preciso: interferenza quando almeno uno tra A e B cade fuori dal segmento H₁H₂; il caso critico è A ≡ H₂ (perché la ruota 1 è la più grande), cioè O₁A ≤ O₁H₂ (p. 167). d081 resta generica («restare entro i limiti») e parla di punta sotto la circonferenza di base della coniugata. A p. 165 c'è il complemento: se il fondo è sotto la fondamentale, quel tratto di fianco non è evolvente e non può trasmettere forza. |
| 82 | Numero minimo di denti senza interferenza | 167–169 | 167–168 | sì | sì nella forma generale (la dispensa a p. 167 ricava \|τ\| + 2/z₂ ≤ √(τ² + (2\|τ\|+1)sin²θ), verificato con SymPy) | **Errori della dispensa a p. 168** (verificati con SymPy): (a) la formula riquadrata è scritta con sin θ al posto di sin²θ; (b) il limite per \|τ\| → ∞ è scritto 2/sin θ, il valore giusto è 2/sin²θ; (c) i valori numerici (\|τ\| = 2, θ = 20°) 5,13 e 5,84 sono calcolati con sin θ: i valori corretti sono 14,16 (⇒ 15 denti) e 17,10 (⇒ 18 denti); (d) nel caso dentiera si legge a ≤ R₂ sin³θ invece di sin²θ (il risultato finale z₂ ≥ 2/sin²θ è corretto). In d082 la ruota piccola non è specificata; nella dispensa è la **ruota 2** (z₂ ≥ f(τ, θ)). La dispensa ricava anche il caso dentiera direttamente (CA = a/sin θ ≤ CH₂ = R₂ sin θ) e spiega quando usare la formula esatta o quella conservativa (tabella di p. 168: per ruote interne serve quella con τ). |
| 83 | Forze scambiate tra denti senza attrito | 169–170 | 162 (e 172) | parziale | in parte | Nella dispensa: forza lungo la retta di pressione (p. 162); C₁ = F_{2,1}R_{f1} = F_{2,1}cos θ R₁ = Q R₁ (Q è la componente tangenziale, p. 162); a p. 172 «R_{2,1} sarà sempre radiale quindi darà momento nullo». **Non compaiono** in forma esplicita F_r = F_n sin θ né F_r = F_t tan α. Simbolo della dispensa per la componente tangenziale: Q, non F_t. A pp. 169–170 non c'è il caso senza attrito. |
| 84 | Forze scambiate con attrito | 169–170 | 169 | parziale | sì per \|F_f\| = f N opposta a V^rel | La dispensa fa molto di più: l'equilibrio alla rotazione delle due ruote (C₁ − F_N^{2,1}R_{f1} + F_T^{2,1}(R₁sin θ − x) = 0 e C₂ − F_N^{1,2}R_{f2} + F_T^{1,2}(R₂sin θ + x) = 0), le F_N in funzione delle coppie e il **rendimento istantaneo** η, η_A (accesso), η_R (recesso). Tutto verificato con SymPy. d084 non ricava nulla di tutto ciò (ricade tra le derivazioni non assegnate, vedi § 3). Simbolo: f, non μ. |
| 85 | Velocità di strisciamento nel contatto dentato | 169–170 | 160, 169, 170 | sì | sì | La dispensa la scrive come velocità relativa vettoriale V^R_{2,1} = (ω₂ − ω₁)∧(P − C) (p. 160, 169) e in modulo \|V^rel_{1,2}\| = (\|ω₁\| + \|ω₂\|)x con x = CP (p. 170; verificato). d085 scrive v_s = v_{1,t} − v_{2,t} senza la forma esplicita in x; usa P per il punto primitivo (nella dispensa C). |
| 86 | Potenza dissipata per attrito negli ingranaggi | 170 | 170 | sì | sì: W^DISS = F_T^{2,1}·V^rel_{1,2} < 0, \|W\| = f\|F_N\|(\|ω₁\|+\|ω₂\|)x | d086 omette l'ipotesi semplificativa della dispensa (F_N ≈ C₁/(R₁cos θ), cioè quella del contatto liscio), la legge lineare \|W\| = Kx e il diagramma a «V» (massimo in B, zero in C, massimo in A; area = energia dissipata durante il contatto di una coppia di denti). |
| 87 | Rotismo ordinario: rapporto globale | 171–174 | 171–173 | sì | sì (prodotto dei rapporti, con definizione reciproca) | La dispensa lo dimostra su 4 ruote con b e c solidali (ω_c = ω_b): τ = ω_d/ω_a = τ_{a,b}·τ_{c,d} (p. 173). d087 non dice che le ruote intermedie solidali allo stesso albero hanno la stessa ω, che è il passaggio chiave. La dispensa aggiunge l'esempio a 4 ruote con analisi delle forze (Q^{2,1}, Q^{4,3}, R_{2,1} radiale) e la doppia risoluzione equilibrio/T.F.V. (p. 172). |
| 88 | Ruota oziosa: effetto sul rapporto | 171–174 | 173 | sì | sì: τ = τ_{a,b}τ_{b,c} = ω_c/ω_a = z_a/z_c > 0 | d088 dice che la ruota oziosa può cambiare «verso/interasse»: la dispensa parla solo del cambio di verso (segno di τ). La dispensa aggiunge la T.F.V. C₃/C₁ = ωa/ωc = 1/τ (manca il segno: va −1/τ, verificato) e il caso «ruota oziosa con ingranaggio interno» (τ_{4,1} = −z₁z₃/(z₂z₄), C₄ = C₁R₂R₄/(R₁R₃)), dove però 2 e 3 sono solidali e non c'è una vera ruota oziosa. |
| 138 | Passo di base | 166–168 | 166 (solo implicito) | no (implicito) | — | La dispensa non definisce mai il passo di base p_b = p cos θ: il fattore cos θ compare solo in z_p = AB/(p cos θ) e in R_f = R cos θ. La dimostrazione d138 (p_b/p = r_b/r) non è nella dispensa. |

## 2. Domande d'orale — differenze con la dispensa

### q14 — Rotismi ordinari
- **Coerente**: definizione di rotismo ordinario/epicicloidale, segno del rapporto (esterno negativo, interno positivo), τ₁₂ = ω₂/ω₁ = −r₁/r₂ = −z₁/z₂ (p. 171), ruote solidali ω₂ = ω₃ (p. 172), rapporto globale come prodotto (p. 173), ruota oziosa che cambia solo il segno (p. 173).
- **Coppie**: q14 dà \|C_u\|/\|C_i\| = 1/\|τ_g\|. La dispensa lavora con il segno: C_{4z} = −C_{1z}/τ_{1,4} (p. 172) e C₄ = C₁(−1/τ_{1,4}) (p. 173). Nella dispensa ci sono anche due scritture sbagliate: C₃/C₁ = ω_a/ω_c = 1/τ (p. 173, manca il «−») e C₄ = −C₁τ^{1,4} (p. 172, dovrebbe essere −C₁/τ^{1,4}). Se il professore chiede il segno della coppia d'uscita, va detto C_u = −C_i/τ_g (verificato).
- **Contenuto assente nella dispensa** (pp. 155–173): il paragrafo «condizioni non stazionarie», con J_eq = J₁ + J₂τ₂₁² + … e J_eq ω̇_i = C_i + C_u τ_g. Il conto è corretto (da C_iω_i + C_uω_u = J_eq ω_i ω̇_i), ma in queste pagine la dispensa tratta solo il regime (ω̇_i = 0, η_J = 1, p. 172). L'esempio con tre ingranamenti (−z₁/z₂)(−z₃/z₄)(−z₅/z₆) non è nella dispensa.
- **Omissioni che il professore potrebbe chiedere**: la scelta di un verso positivo comune per tutte le ω (p. 171); lo schema unifilare (pp. 171–173); l'analisi delle forze sulle ruote (Q^{2,1} tangenziale che equilibra C₁, R_{2,1} radiale a momento nullo, azione e reazione Q^{1,2} = −Q^{2,1}) e la doppia risoluzione equilibrio/T.F.V. (p. 172); il caso con ingranaggio interno (p. 173); i versi delle velocità periferiche (⊙/⊗) nel metodo grafico (p. 172).

### q22 — Ruote dentate: principio, evolvente, rapporto
- **Coerente**: τ = ω₂/ω₁ = −r₁/r₂ per le ruote di frizione (p. 156); legge dell'ingranamento con il punto fisso C (pp. 158–159); evolvente generata da una retta che rotola sulla fondamentale (p. 161); retta di pressione tangente comune alle fondamentali (p. 162); r_f = r_p cos θ (p. 166); p = 2πr_p/z, m = p/π, d_p = mz (pp. 163, 165); τ = −z₁/z₂ (p. 166).
- **Notazione**: q22 usa μ per l'attrito delle ruote di frizione, la dispensa f (F_t ≤ f F_N, p. 156). q22 chiama C «punto di passo»; la dispensa lo chiama C.I.R. del moto relativo e punto di rotolamento puro (p. 159).
- **Ricavo diverso**: q22 scrive ω₁O₁C = −ω₂O₂C «dalla compatibilità delle componenti normali». La dispensa passa per \|V₂\|/\|V₁\| = cos α₁/cos α₂ e i triangoli simili O₁H₁C ~ O₂H₂C (pp. 158–159): se il professore chiede la dimostrazione, i passaggi con H₁ e H₂ sono quelli della dispensa.
- **Omissioni che il professore potrebbe chiedere**: la coppia massima trasmissibile \|C^max\| = f\|F_N\|R (p. 157); la classificazione dei punti di contatto (urto, rotolamento, strisciamento, p. 159); le conseguenze di una normale che oscilla (rumore, sollecitazioni dinamiche, usura, fatica, p. 159); i profili cicloidali e l'evolvente proposta da De La Hire nel 1695 (p. 159); V^R_{2,1} = (ω₂ − ω₁)∧(P − C), da cui il contatto deve avvenire vicino a C (p. 160); la proprietà per cui **cambiando l'interasse cambiano i raggi primitivi ma non i fondamentali**, quindi τ = −R_{f1}/R_{f2} resta lo stesso (p. 162); il fatto che la retta di pressione cambia inclinazione se si inverte il verso di rotazione (p. 162); il caso pignone–dentiera con τ = 0 (p. 164).

### q24 — Numero di denti in presa
- **Coerente**: AB = AC + CB, AC = AH₁ − H₁C, AH₁ = √(r_{a1}² − r_{b1}²), H₁C = r_{p1} sin θ, arco d'azione = AB/cos θ, n = AB/(p cos θ) ≥ 1 (p. 166; formula del segmento verificata con SymPy).
- **Notazione**: q24 usa n, r_a, r_b, r_p; la dispensa usa z_p, R_t, R_f, R. Il «passo di base» p_b = p cos θ non è nominato nella dispensa.
- **Omissioni che il professore potrebbe chiedere**: la forma finale in funzione di θ, z, m, cioè AB = (m/2)[z₁√((1+2/z₁)² − cos²θ) + z₂√((1+2/z₂)² − cos²θ) − (z₁+z₂)sin θ], ottenuta con a = m e R = mz/2 (p. 166); la dimostrazione del fattore 1/cos θ attraverso l'arco RS sulla fondamentale (MC/R₁ = RS/R_{f1}, BC = RS ⇒ MC = BC/cos θ, p. 166); la definizione di arco di accesso (MC) e di recesso (M'C, p. 166).

### q25 — Forze tra ruote dentate senza e con attrito
- **Senza attrito**: F_r = F_N sin θ e F_r = F_t tan θ non compaiono nella dispensa. C'è solo C₁ = F_{2,1}R_f = F_{2,1}cos θ R₁ = Q R₁ (p. 162), e a p. 172 la radiale R_{2,1} con momento nullo. Il simbolo della dispensa per la tangenziale è Q.
- **Velocità relativa**: v_rel = (ω₁ + ω₂)\|x\| coincide con p. 170 (verificato). q25 scrive v_{rel,12} = v_{P1} − v_{P2}; la dispensa usa V^rel_{2,1} = V₂ − V₁ = ω_{2,1}∧(P − C) e V^rel_{1,2} (pp. 158, 169).
- **Equilibrio con attrito — differenza di segno**: q25 attribuisce alla dispensa C₁ − F_N r_{b1} − F_att(r_{p1}sin θ + x) = 0, cioè F_N = C₁/(r_{p1}cos θ + μ(r_{p1}sin θ + x)). La dispensa (p. 169) scrive invece C₁ − F_N^{2,1}R_{f1} + F_T^{2,1}(R₁sin θ − x) = 0, cioè F_N^{2,1} = C₁/(R₁cos θ − f(R₁sin θ − x)), con P tra C e H₁ (**fase di accesso**). Verifica SymPy: la formula di q25 è quella della **fase di recesso** (C₁ = N(R₁cos θ + f(R₁sin θ + x)), con x = CP verso H₂); quella della dispensa è quella di accesso. Entrambe sono corrette nella loro fase, ma q25 non dice di quale fase si tratta e presenta come «delle dispense» la formula che la dispensa non scrive.
- **Contenuto non presente nella dispensa**: «la risultante viene inclinata dell'angolo d'attrito rispetto alla normale».
- **Omissioni importanti**: il **rendimento istantaneo** η = \|C₂\|\|ω₂\|/(\|C₁\|\|ω₁\|) ≤ 1, con η_A = [1 − f(tan θ + x/(R₂cos θ))]/[1 − f(tan θ − x/(R₁cos θ))] in accesso (B → C) e η_R = [1 + f(tan θ − x/(R₂cos θ))]/[1 + f(tan θ + x/(R₁cos θ))] in recesso (C → A) (p. 169, verificati con SymPy; η = 1 per x = 0); il metodo per trovare il verso della forza d'attrito (ω_{2,1} = ω₂ − ω₁ oraria ed entrante ⇒ verso di V^rel ⇒ attrito opposto, p. 169); l'ipotesi semplificativa F_N ≈ C₁/(R₁cos θ), la legge \|W^DISS\| = Kx e il diagramma a «V» dell'energia dissipata (p. 170).

### q48 — Interferenza, denti dritti
- **Indici scambiati**: q48 chiama z₁ la ruota piccola e z₂ la grande, con τ = z₂/z₁. Nella dispensa la ruota piccola è la **2** (z₂ ≥ z_{2 min}(τ, θ)) e \|τ\| = R₁/R₂ = z₁/z₂ (p. 167). Il valore di \|τ\| (grande/piccola) è lo stesso, ma i pedici sono invertiti: per l'orale conviene usare quelli della dispensa.
- **Condizione critica**: q48 presenta CA ≤ CH₂ e O₁A ≤ O₁H₂ come equivalenti. Lo sono (A e H₂ stanno dalla stessa parte di C sulla retta di pressione, e O₁A cresce allontanandosi da H₁), ma nella dispensa O₁A ≤ O₁H₂ è la condizione generale (p. 167) e CA ≤ CH₂ è usata solo nel caso dentiera (p. 168).
- **Formula**: q48 ha sin²θ, corretta. La dispensa ha sin²θ nella derivazione (p. 167) ma **sin θ** nella formula riquadrata, nel limite 2/sin θ e nei numeri 5,13 e 5,84 (p. 168): sono errori della dispensa (valori corretti 14,16 e 17,10, verificati). Il valore 17,1 di q48 per la dentiera è corretto e coincide con l'etichetta «17.--» del grafico di p. 168. All'orale non vanno citati i valori 5,13 e 5,84.
- **Contenuto non presente nella dispensa** (pp. 155–173): il sottotaglio in lavorazione, l'indebolimento del dente e i rimedi (aumentare θ, correzioni di profilo, ridurre l'addendum, dentatura elicoidale). La dispensa cita solo valori tipici θ = 20° o 14° (p. 167).
- **Omissioni che il professore potrebbe chiedere**: perché il punto critico è A ≡ H₂ (la circonferenza di testa della ruota grande arriva più vicino a H₂, p. 167); la derivazione con Carnot nel triangolo O₁O₂H₂ e cos(π − θ) = −cos θ (p. 167); il caso limite ricavato direttamente sul rocchetto–dentiera, CA = a/sin θ ≤ CH₂ = R₂ sin θ ⇒ z₂ ≥ 2/sin²θ (p. 168); la scelta tra formula esatta e conservativa e il caso delle **ruote interne**, dove la conservativa non basta (tabella e grafico z₂^min(τ), p. 168).

## 3. Derivazioni della dispensa che non compaiono tra le dimostrazioni assegnate

| Derivazione | Pagine PDF |
|---|---|
| Moto relativo delle ruote di frizione: ω^R_{2,1} = ω₂ − ω₁, V_C^R = 0, V^R_{O₂} = −ω₁z(R₁+R₂)j | 157 |
| Coppia massima trasmissibile per aderenza: \|C_i^max\| = f\|F_N\|R_i | 156–157 |
| Rapporto di una trasmissione a cinghia con allungamento elastico: τ = τ_id(1+T₂/EA)/(1+T₁/EA), C_m/C_u = −τ_id | 157 |
| Rapporto τ = −C_{1z}/C_{2z} dalla T.F.V. in regime (steady operation) | 157, 162 |
| Velocità relativa nel contatto V^R_{2,1} = (ω₂ − ω₁)∧(P − C) e sua crescita con PC | 160 |
| τ = −R_{f1}/R_{f2} dall'equilibrio alla rotazione e dai triangoli simili; invarianza rispetto all'interasse | 162 |
| Pignone–dentiera come limite τ → 0 (curvatura 1/R₂ → 0) | 164 |
| Proporzionamento modulare a = m, d = 5/4 m, h = 9/4 m | 165 |
| Arco d'azione: MC = BC/cos θ, M'C = AC/cos θ, ℓ = AB/cos θ | 166 |
| Caso limite dentiera: CA = a/sin θ ≤ CH₂ = R₂ sin θ ⇒ z₂ ≥ 2/sin²θ | 168 |
| Equilibrio alla rotazione con attrito e rendimento istantaneo η, η_A (accesso), η_R (recesso) | 169 |
| Verso della forza d'attrito da ω_{2,1} e V^rel | 169 |
| Potenza dissipata con ipotesi F_N ≈ C₁/(R₁cos θ): \|W\| = Kx, diagramma accesso/recesso | 170 |
| Rotismo a 4 ruote: rapporto τ^{1,4} > 0, coppia d'uscita, analisi delle forze Q e R e doppia risoluzione | 172 |
| Ruota oziosa: T.F.V. C₃/C₁ (con il segno sbagliato nella fonte) | 173 |
| Rotismo con ingranaggio interno: τ_{4,1} = −z₁z₃/(z₂z₄), C₄ = C₁R₂R₄/(R₁R₃), per equilibrio e per T.F.V. | 173 |

(d083, d084 e d086 coprono solo in parte le righe di pp. 162, 169 e 170.)

## 4. Simboli del capitolo

| Simbolo | Significato | Pagina PDF |
|---|---|---|
| O₁, O₂ | centri delle ruote (centri assoluti fissi) | 156 e seguenti |
| C | punto di contatto delle ruote di frizione; poi punto primitivo = intersezione retta normale/interasse = C.I.R. del moto relativo | 156, 159, 162 |
| P (P₁ ≡ P₂), P* | punto di contatto fra i profili; posizione successiva | 158, 162 |
| F_N (Fn), F_t / F_T (Ft) | forza normale e tangenziale al contatto | 156, 169 |
| f | coefficiente di aderenza / d'attrito | 156, 169 |
| R₁, R₂ (r₁, r₂; R_1, R_2; r_{p1}, r_{p2}; R_{p1}, R_{p2}) | raggi delle ruote di frizione / raggi primitivi | 156, 160, 162, 166 |
| R_f, R_{f1}, R_{f2} (r_f, r_{f1}, r_{f2}; Rf) | raggi delle circonferenze fondamentali | 158, 161, 162, 166 |
| R_{t1}, R_{t2} | raggi di troncatura di testa | 166 |
| 𝒞_{f1}, 𝒞_{f2}, c_{f1}, c_{f2}, c_{p1}, c_{p2}, 𝒞_{p1}, 𝒞_{p2} | circonferenze fondamentali / primitive | 162, 169, 172 |
| τ | rapporto di trasmissione ω₂/ω₁ (ω_u/ω_m), con segno | 156 e seguenti |
| τ_id | rapporto ideale di una trasmissione a cinghia | 157 |
| T₁, T₂, EA | tiri della cinghia, rigidezza assiale | 157 |
| C₁, C₂, C_m, C_u, C₃, C₄ | coppie sugli assi (motrice, utilizzatrice) | 156, 157, 172, 173 |
| ω₁, ω₂, ω_{2,1}^R, ω_{1,2} | velocità angolari assolute e relative | 157, 160, 169 |
| V_C, V^R, V^{rel}, V_N^{rel}, V_{tg}^{rel}, V₁^T | velocità del punto di contatto, relativa, sue componenti normale e tangente, di trascinamento | 156–160, 169 |
| H₁, H₂ (I₁, I₂ nella Fig. 5-24) | piedi delle perpendicolari da O₁, O₂ sulla retta normale = punti di tangenza della retta di pressione con le fondamentali | 158, 159, 162 |
| α₁, α₂ | angoli tra velocità periferiche e normale comune | 158 |
| θ (ϑ nelle scansioni) | angolo di pressione | 159, 162, 166 |
| γ, ϑ (Fig. 5-23) | angoli al centro della costruzione dell'evolvente | 158, 161 |
| e₁, e₂, e₁*, e₂*, e_i, e_i' | profili ad evolvente | 158, 162 |
| Q | componente tangenziale (alla primitiva) della forza di contatto; nell'esempio dei rotismi, forze tangenziali Q^{2,1}, Q^{1,2}, Q^{4,3}, Q^{3,4} | 162, 172, 173 |
| R_{2,1}, R^{2,1} | componente radiale della forza di contatto | 172 |
| p | passo (arco di primitiva tra due profili omologhi) | 163, 165 |
| z, z₁, z₂, z_a … | numero di denti | 163 e seguenti |
| m | modulo m = p/π | 163, 165 |
| a | addendum (a = m) | 165–168 |
| d | dedendum (d = 5/4 m) | 165 |
| h | altezza del dente (h = 9/4 m) | 165 |
| i | interasse O₁O₂ = R₁ + R₂ | 167 |
| A, B | estremi del segmento dei contatti (intersezioni della retta di pressione con le teste) | 166–170 |
| M, M', R, S | punti per l'arco d'azione sulla primitiva (M, M') e sulla fondamentale (R, S) | 166 |
| ℓ | lunghezza dell'arco d'azione | 166 |
| z_p | numero di denti contemporaneamente in presa | 166 |
| ρ | curvatura 1/R | 164, 168 |
| x | distanza CP del punto di contatto da C lungo la retta di pressione | 169, 170 |
| η, η_A, η_R, η_J | rendimento (istantaneo; in accesso; in recesso; del J-esimo ingranaggio) | 162, 169, 172 |
| W^{DISS}_{ATTR}, K | potenza dissipata per attrito, costante della legge Kx | 170 |
| τ_{a,b}, τ_{c,d}, τ^{1,4}, τ_{1,4}, τ_{4,1}, τ^{4,3}, τ^{2,1} | rapporti parziali e globali dei rotismi | 172, 173 |

### Conflitti di notazione
1. **Ordine degli indici di τ**: a p. 172 τ^{1,4} = ω₄/ω₁ (partenza, arrivo); a p. 173 τ^{4,3} = ω₄/ω₃ e τ^{2,1} = ω₂/ω₁ (arrivo, partenza), e nella stessa pagina ω₄/ω₁ è chiamato sia τ_{4,1} sia τ_{1,4}. Le fonti derivate usano i = ω₁/ω₂ (reciproco).
2. **Convenzione di τ nell'interferenza**: a p. 167 \|τ\| = z₁/z₂ (grande/piccola), e la dentiera corrisponde a \|τ\| → ∞; a p. 168 il testo scrive τ = z₂/z₁, e il grafico mette la dentiera in τ = 0 (rapporto piccola/grande).
3. **Raggio fondamentale**: R_f = R cos θ (pp. 166–167, corretta), R = R_f/cos θ (pp. 163, 165, equivalente), ma a p. 168 si legge R = R_f cos θ (sbagliata).
4. **C e P**: nella dispensa C è il punto primitivo e P il contatto; in d074, d085 e d138 P è il punto primitivo.
5. **a e d**: nella dispensa sono addendum e dedendum; in d077 e d080 a è l'interasse, in d076 d è il diametro.
6. **Angolo di pressione**: θ (manoscritto) e ϑ (scansioni del libro) nella dispensa; α nelle dimostrazioni derivate.
7. **Attrito**: f nella dispensa, μ in q22, q25, d084, d086.
8. **Punti di tangenza**: H₁, H₂ negli appunti, I₁, I₂ nella Fig. 5-24 del libro (p. 162).
9. **Raggi primitivi**: R_1 (p. 160 battuto), R₁, r₁, r_{p1}, R_{p1} (pp. 156, 162) per la stessa grandezza.
10. **Segmenti O₁C, O₂C**: a p. 159 scritti anche «O₁C₁», «O₂C₂».
