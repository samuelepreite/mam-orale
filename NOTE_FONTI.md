# MAM I — Note sulle fonti (incongruenze, errori, letture adottate)

Aggiornato: 13/10/2026. Fonti: **D** = dispensa `MAM TEORIA COMPLETO` (pagine **PDF** 1–223, trascritta in
`tools/testi/cap*.md`); **Q** = `MAM_Orale_52_domande` (qNN); **Dm** = `MAM_DIMOSTRAZIONI_COMPLETO_VERIFICATO` (dNNN).
Ogni errore di formula qui sotto è stato **verificato con SymPy o con un conto numerico** durante la trascrizione
(dettagli e righe originali nei `[NdT]` di `tools/testi/cap*.md` e nei file `cap*_riscontro.md`).
Colonna **Doc.**: ● = da chiedere al docente.

## Regole generali (valgono per tutta l'app)

| ID | Cosa | Lettura adottata | Doc. |
|---|---|---|---|
| NF-01 | La «dispensa ufficiale» è il **quaderno di uno studente** (F. Sansone, a.a. 2024/25, «voto 30»): cap. 1–2 in LaTeX, poi pagine manoscritte, **scansioni di un libro di testo** (eq. 5.59, 5.82–5.88, figg. 5-xx), appunti battuti delle lezioni del 28–29/04/2025. Q dichiara di basarsi anche su `dispense_MAM1_2025_01.pdf` («struttura ufficiale del corso»), che non abbiamo. | D resta la fonte di verità (decisione dello studente). Le scansioni del libro sono citate come «D, scansione libro, eq. (5.xx)». Chiedere a Samuele se ha la dispensa ufficiale del docente e il titolo del libro. | |
| NF-02 | D contiene **errori matematici verificati** (elenco sotto). | Regola di prevalenza: **convenzioni, notazione e scelta dei contenuti** = D; **errore di calcolo verificato** → l'app insegna la forma corretta, mostra la riga di D e la marca «la dispensa scrive…» (così lo studente non è spiazzato se il docente usa D). | |
| NF-03 | Pagine: in D la pagina stampata è PDF + 1 fino a PDF 96, poi le pagine non sono numerate. L'indice (PDF 2–4) arriva a pag. 256, il PDF ne ha 223: manca il §2.4 (stampate 90–95) e i cuscinetti sono sostituiti da pagine manoscritte (PDF 97–99); PDF 100–102 ripetono la dinamica del veicolo a mano. | L'app cita sempre la **pagina PDF** (p. es. «D p. 153»). | |
| NF-04 | Dm: **36 dimostrazioni su 142** dichiarano pagine che non contengono la dimostrazione (peggio nel cap. cinghie: dichiarate 131–176, reali 129–154; d071 «171–176» è a p. 153). | Pagine reali da `tools/analisi/dimostrazioni_riscontro.json`. | |
| NF-05 | Q cita `Orale MAM.pdf` (elenco originale delle 52 domande) che non abbiamo: niente frequenze reali. | Peso di un argomento = numero di formulazioni nelle 52 (7 argomenti ne hanno 2). Se Samuele ha l'elenco con le frequenze, si aggiornano i pesi. | |
| NF-06 | Estrazione rovinata nei file derivati: `\frac` persi («𝑟𝑎𝑐…») in q05, q07, q23, q29, q30, q31, q39, q50; «a_u» per τ in q09; «η_tot = 0.983» per 0,98³ in q51; d001 troncato. | Formule ricostruite e verificate; il testo derivato non entra nell'app senza verifica. | |
| NF-07 | **Chiesto ma assente da D**: q41 partitore di frenata; q43 frizione centrifuga; q52 rendimento epicicloidale (due osservatori); dimostrazione del rapido ritorno del glifo (q01, d008–d009); ribaltamento del blocco (q33, d027); frizione/disco a pressione uniforme (q13, d047); leggi di Coulomb e microgiunzioni (q32); J_eq in condizioni non stazionarie (q14); limiti dell'«open differential» (q17); sottotaglio (q48); coordinate polari (d001, d003); d068, d107, d110, d137, d138. | Nell'app come **deduzione** (con il ragionamento che la produce) o **fonte esterna** dichiarata, badge «non nella dispensa», verificate con SymPy. Peso ridotto nel piano finché il docente non conferma. | ● |

## Notazione (riquadro «simboli» nelle schede)

| ID | D | Fonti derivate | Lettura adottata |
|---|---|---|---|
| NF-08 | attrito **f** (f_ad aderenza, f_att strisciamento; f_s, f_d in tabella; μ solo nelle pagine manoscritte 100–102) | μ, μ_s, μ_d | f, con f_ad/f_att dove D li distingue |
| NF-09 | **τ = ω_uscita/ω_entrata con segno** (τ = −z₁/z₂); Willis τ_W = (ω₂−Ω)/(ω₁−Ω) con l'uscita al numeratore; coniche τ = z₁/z₂ | i = ω₁/ω₂ (reciproco), τ₀ con entrata al numeratore (d089), |i| (d099) | quella di D; nelle schede l'avviso «con i = 1/τ il risultato si capovolge» |
| NF-10 | accelerazione angolare **ω̇** (α in D è sempre un angolo); inerzie **I**; prodotto vettoriale ∧; (B−A) | α, J, ×, r_B/A | quella di D |
| NF-11 | ingranaggi: θ angolo di pressione, **C** punto primitivo, P contatto, a addendum, d dedendum, i interasse; elicoidali: **α elica sul primitivo, β elica sul fondamentale** (tg β = tg α cos θ) | α pressione, P primitivo, a interasse, d diametro; d095–d098 β = elica primitiva; q27 usa β nel senso di D senza dirlo (con l'angolo primitivo A sarebbe sbagliata di 1/cos θ) | quella di D, con il riquadro simboli obbligatorio nelle schede C5 |
| NF-12 | vibrazioni: ω_m, ξ, ρ = ω/ω_m, c_r, A(ξ,ρ), forzante **F₀ sin ωt** e **parte immaginaria** nel complex replacement; base x_V, massa x_G | ω_n, ζ, r, M, cos ωt e parte reale, y/x | simboli di D; nella scheda complex replacement entrambe le convenzioni (sin → Im, cos → Re) |
| NF-13 | manovellismo: γ angolo di biella, λ = r/l; cinghia: ρ massa lineare, ρV² (mai «T_c»); I/τ in accoppiamento | φ, m, T_c, J, i | quella di D |

## Errori della dispensa (verificati) — l'app insegna la forma corretta e mostra quella di D

| ID | Dove | D scrive | Corretto | Doc. |
|---|---|---|---|---|
| NF-14 | p. 29 quadrilatero | V_C = ω₃∧(B−K) | ω₂∧(C−K) | |
| NF-15 | p. 49 statica manovellismo | C₁ = (B−A)∧F₂,₁ | −(B−A)∧F₂,₁ (verso e modulo dichiarati giusti) | |
| NF-16 | p. 91 trazione posteriore | a_max = f g l₂/(l₁+l₂−h f) | l₁ al numeratore; p. 101 (manoscritto) è corretta. «La posteriore dà sempre di più» vale solo a pari ripartizione del peso | |
| NF-17 | p. 88 attrito volvente | momenti con braccio h, risultato con R | h ≃ R: ipotesi da dichiarare | |
| NF-18 | pp. 109–110 ceppi esterni | chiama **svolgente** il ceppo autoenergizzante (F_T = Fh/(OO'/f − R), «freno d'emergenza» per OO'/f = R) e avvolgente l'altro; a p. 110 (ceppo interno) usa invece la definizione usuale | definizione usuale (q39, d042): avvolgente = l'attrito aiuta il comando. Nell'app: si insegna il **criterio** (momento dell'attrito concorde o no con quello del comando) e si segnala la nomenclatura di D | ● |
| NF-19 | p. 121–122 frizione conica (libro) | (5.88) C_f = f N'(r_e+r_i)/[2(sin α + f cos α)]; la (5.87) sembra mancare di un sin α | D (5.88) è corretta (integrazione verificata); **q42 e d053 (μP R_m/sin α) sono sbagliate**: trascurano l'attrito che si oppone all'accostamento (×2,1 con f = 0,3, α = 15°) | ● |
| NF-20 | pp. 142, 146 cinghia | «θ* = 0 = incipiente scorrimento globale», «θ* = α» | θ* = 0 ⇔ coppia nulla; θ* = β (α = 0) ⇔ incipiente scorrimento globale | |
| NF-21 | p. 153 freno a nastro, verso antiorario | T₂ = T₁ e^{fβ} (rapporto delle coppie = −1) | T₂ = T₁ e^{−fβ}; rapporto e^{fβ} (il «6,54» di D è e^{fβ}) | |
| NF-22 | p. 152 velocità ottima | **T₂ fissato** (tenditore): W = (e^{fθ*}−1)(T₂−ρV²)V ⇒ V = √(T₂/3ρ) | q15, q46, d070 fissano **T₁ = T_max** ⇒ T_c = T_max/3: risultato corretto in quel modello ma **non in D**. App: modello di D come principale, l'altro come variante «fonte esterna» | ● |
| NF-23 | p. 168 interferenza | formula riquadrata con sin θ, limite 2/sin θ, valori 5,13 e 5,84; dentiera a ≤ R₂ sin³θ; R = R_f cos θ | sin²θ (come ricavato a p. 167): 14,16 → 15 denti, 17,10 → 18 denti; a ≤ R₂ sin²θ; R_f = R cos θ | |
| NF-24 | pp. 172–173 rotismi | C₃/C₁ = 1/τ; C₄ = −C₁ τ^{1,4}; ordine degli indici di τ variabile | C₃/C₁ = −1/τ; C₄ = −C₁/τ^{1,4}; nell'app τ_{a→b} = ω_b/ω_a sempre | |
| NF-25 | p. 161, 163 evolvente | «la normale a un'evolvente passa per un punto fisso»; τ = z₁/z₂ senza segno | vale per la normale **comune** di due ruote in presa; τ = −z₁/z₂ | |
| NF-26 | p. 169 forze con attrito | D scrive la fase di **accesso**: F_N = C₁/(R₁cos θ − f(R₁sin θ − x)) | q25 presenta come «delle dispense» la formula di **recesso**: entrambe vere, l'app le distingue | |
| NF-27 | pp. 179, 183, 189, 175 rotismi | C_p = −C₁ + C₂; η = −W_u/W_m > 0; \|C\| = \|Q\|R₁ = \|F\|cos θ_m cos α; R₃ = 3R₁ senza R₂ = R₁ | C_p = −(C₁+C₂); η = −W_u/W_m con W_u < 0; manca R₁; ipotesi R₂ = R₁ | |
| NF-28 | cap. 6, pp. 196–202 | p. 196 rotolamento fMg (senza cos α); p. 199 K_m definita negativa e usata come modulo (anche 203, 206); p. 200 t_% senza logaritmo; p. 201 equazione di partenza con η incoerente col risultato; p. 202 f_att in strisciamento | fMg cos α; K_m = \|dC_m/dω\| dichiarato; t_% = −(I_eq/K_m) ln(1−%); partenza η(C_m − I_mω̇_m)ω_m = (C_u + I_uω̇_u)ω_u ⇒ C_m − C_uτ/η = (I_m + I_uτ²/η)ω̇_m (risultato di D); f radente | |
| NF-29 | d107 (rapporto ottimo) | non in D; massimizza ω̇_m (sbagliato) | si massimizza ω̇_u = τω̇_m: τ_opt = [−C_uI_m + √(I_m(C_m²I_u + C_u²I_m))]/(C_mI_u), con C_u = 0 → √(I_m/I_u). Deduzione | |
| NF-30 | d108–d110, q10 frizione | lato utilizzatore senza τ; t_Q in forma chiusa con accelerazioni costanti | D p. 204: ω̇_c = (C_fr − τC_u)/(τ²I_u); ω_m(t) esponenziale (motore linearizzato) ⇒ t_Q solo grafico/numerico | |
| NF-31 | pp. 211–212 smorzate | λ = ω_m(−ξ ± i√(ξ²−1)); poi «√(ξ²−1) = −√(1−ξ²)» che compensa | λ = ω_m(−ξ ± √(ξ²−1)); il sottosmorzato torna giusto | |
| NF-32 | p. 213 caso critico | x = e^{−ω_m t}(A₁+A₂) | x = (A₁ + A₂t)e^{−ω_m t} (radice doppia) | |
| NF-33 | pp. 220, 222 trasmissibilità | denominatore (1+ρ²)²; «ρ < √2 zona di isolamento»; «per ρ > √2 più ξ, meno ampiezza» | (1−ρ²)²; isolamento per ρ > √2; lì più smorzamento **aumenta** T (ρ = 2: 0,356 con ξ = 0,1, 0,620 con ξ = 0,5), come dice il testo battuto della stessa p. 220 | |
| NF-34 | pp. 215, 218 fase | X̂ = \|X\|e^{+iφ}; arg FRF = +arctg | ritardo: e^{−iφ}, arg = −φ | |
| NF-35 | p. 98 cuscinetti; p. 141 cinghia; p. 134–135 | fattore 2 perso in un passaggio; sin(θ/2) per sin(dθ/2), /2 per /R; T₂R₂ per T₂R₁; segni del bilancio T.F.V. reale | risultati finali di D corretti; righe intermedie corrette nelle lezioni | |
| NF-36 | refusi minori cap. 1 | p. 15, 34, 35, 38, 42, 44, 64; uguaglianze che sono approssimazioni (pp. 31–32); ω∧(ω∧r) = −ω²r senza dire «moto piano» (pp. 12, 34) | annotati in `cap1a.md`/`cap1b.md`; l'ipotesi di moto piano va detta all'orale | |

## Divergenze delle fonti derivate (D ha ragione o è più completa)

| ID | Argomento | Divergenza | Lettura adottata |
|---|---|---|---|
| NF-37 | freno a disco | d039/d049 generalizzano \|F_T\| = μ\|F_N\|; D: su un settore α \|F_T\| = f\|F_N\| sin(α/2)/(α/2), braccio b_t = r_m(α/2)/sin(α/2), per α = 2π coppia pura | D |
| NF-38 | frizione all'innesto | D la tratta due volte: libro pp. 117–119 (senza τ, lavoro dissipato (5.82), innesto impulsivo (5.83)) e appunti pp. 202–206 (con τ, motore linearizzato). q10 omette (5.82)–(5.83) | entrambe, collegate (c3-frizione-piana ↔ c6-frizione) |
| NF-39 | veicolo | d033 tratta la ruota D come esterna (in D è l'interna, curva a destra); d136 aggiunge N_ant(a), N_post(a) in frenata non scritti in D; q20 usa «a» per distanza e accelerazione | convenzione di D; d136 come deduzione |
| NF-40 | cuscinetti | d037 inverte Q (carico esterno in D) e P_i; non arriva a P₀ = 4Q/z (rulli), ≃ 5Q/z (sfere); «fatica di contatto» (q36) non in D | D |
| NF-41 | pattino | d044 conclude «C_f = μN R_eff» su un tamburo: in D il pattino frena un **nastro**, F_T = C_az/(x₀/f ± h), «−» = freno di sicurezza | D |
| NF-42 | perno, impuntamento | d025: ρ = μR (approssimazione di r* = R sin φ, non in D); d026: condizione geometrica col cono non in D (D: Q = F/(1−2e f_att/h)) | D, con l'approssimazione dichiarata |
| NF-43 | complex replacement | d016 chiama «complex replacement» la cinematica analitica con i numeri complessi (pp. 40–44): lì parte reale e immaginaria vanno **entrambe** annullate; nel complex replacement se ne tiene una sola | due schede distinte, con una domanda «qual è la differenza?» |
| NF-44 | riduttore di coppia | q16 senza segno (C_u = ηC_i/τ); D: C₁/C₂ = −τ/η₁ e «riduttore di giri ⇒ moltiplicatore di coppia ⇒ moto diretto» (p. 180) | D, in modulo solo dove dichiarato |
| NF-45 | elicoidali, denti in presa | q23/q47 chiamano δ_e il solo b tg β; in D δ_e = δ + CK è la lunghezza effettiva | D |

## Da chiedere al docente (elenco per l'infografica)
NF-07 (argomenti chiesti ma assenti dalla dispensa), NF-18 (avvolgente/svolgente), NF-19 (frizione conica: quale
formula vuole), NF-22 (velocità ottima: T₂ fissato o T₁ fissato).
