# Riscontro — Capitolo 7 «MECCANICA DELLE VIBRAZIONI» (PDF pp. 207–223)

Fonti derivate confrontate: dimostrazioni d111–d135 (`/home/claude/work/dd/`), domande q04, q05, q06, q07, q21,
q49, q50 (`/home/claude/work/dq/`). Riferimento: la trascrizione `cap7.md`. Tutte le differenze di formula sono
state verificate con SymPy (radici, dsolve, derivate, moduli complessi, limiti) o con conti numerici.

Avvertenza di notazione per tutto il confronto: la dispensa usa **ω_m** (= ω_n), **ξ** (= ζ), **ρ** (= r = ω/ω_n),
**c_r** (= c_cr), **A(ξ,ρ)** (= M, fattore di amplificazione), **p(λ)** / **p(iω)** (rigidezza dinamica),
**G(iω)** (complex gain), **T_R** (trasmissibilità), base **x_V / X_V**, massa **x_G**; forzante quasi sempre
**F₀ sin ωt** (non cos). Le fonti derivate usano ω_n, ζ, r, M, H(ω)/Z(ω), y/Y, x e quasi sempre cos ωt.

---

## 1. Tabella delle dimostrazioni

| n. | titolo | pagine dichiarate | pagine reali | presente | risultato coincide? | note |
|---|---|---|---|---|---|---|
| 111 | Oscillatore libero non smorzato: eq. del moto | 208–210 | 209 | sì | sì (m ẍ_G + K x_G = 0) | La dispensa la ricava dal teorema dell'energia cinetica, d(E_K+E_P)/dt = W^{N.C.} ⇒ (mẍ_G+Kx_G)ẋ_G = 0, non da Newton diretto; F_in = −Mẍ è a p. 208. Refuso della fonte W^{cons} = +dE_P/dt. |
| 112 | Pulsazione naturale | 209–210 | 209 | sì | sì (ω_m = √(K/m)) | La dispensa usa l'ansatz e^{λt}: mλ²+K=0 ⇒ λ = ±i√(K/m); d112 usa la prova A cos + B sin. Stesso risultato, metodo diverso. |
| 113 | Soluzione libera con condizioni iniziali | 209–210 | 209–210 | parziale | solo per v₀ = 0 | La dispensa risolve Cauchy con **x(0)=x₀, ẋ(0)=0** ⇒ C = x₀, α = 0, x = x₀cos ω_m t, nella forma C cos(ωt+α). Il caso generale x = x₀cos ω_nt + (v₀/ω_n)sin ω_nt di d113 non c'è. |
| 114 | Energia dell'oscillatore non smorzato | 209–210 | 209 | parziale | sì | Nella dispensa la conservazione dell'energia è il **punto di partenza** (TEV, W^{N.C.}=0) per ottenere l'equazione del moto; d114 fa il percorso inverso (moltiplica per ẋ e integra). |
| 115 | Oscillatore smorzato: eq. caratteristica | 211–213 | 211 | sì | sì per mλ²+cλ+K=0; **no per le radici** | La dispensa scrive λ = (−c ± **i**√(c²−4mK))/2m e λ = ω_m(−ξ ± **i**√(ξ²−1)): «i» spuria (errore della fonte). d115 dà le radici giuste s = [−c ± √(c²−4mk)]/2m (SymPy). |
| 116 | Smorzamento critico e ζ | 211–213 | 211 | sì | sì | Dispensa: c_r = 2ω_m m (annullando il radicale (c/2m)² − K/m); d116: 2√(mk). Equivalenti. ξ = c/c_r = c/(2ω_m m). |
| 117 | Pulsazione smorzata | 211–213 | 212 | sì | sì (ω_d = ω_m√(1−ξ²)) | Il passaggio della fonte «√(ξ²−1) = −√(1−ξ²)» è sbagliato (è i√(1−ξ²)) e compensa la «i» spuria di p. 211; d117 parte già dalle radici corrette. |
| 118 | Soluzione sottosmorzata | 211–213 | 212 | sì | sì | Dispensa: x = e^{−ω_mξt}(A₁e^{−iω_dt} + A₂e^{iω_dt}) ⇒ x = e^{−ω_mξt}x₀ sin(ω_dt + α) (forma ampiezza-fase); d118 la forma A cos + B sin. Equivalenti. |
| 119 | Decremento logaritmico | 211–213 | 212 | sì | sì (δ = 2πξ/√(1−ξ²)) | Dispensa: rapporto x(t)/x(t+T_d) dell'inviluppo, δ = ω_mξT_d; d119 parla di «massimi consecutivi». La formula inversa ξ = δ/√(4π²+δ²) non è in nessuna delle due (la dispensa dice solo «dalla formula inversa»). La dispensa aggiunge la misura sperimentale. |
| 120 | Caso criticamente smorzato | 211–213 | 213 | sì | **no** | Dispensa: x(t) = e^{−ω_mt}(A₁ + A₂) (**errore**: radice doppia, manca il termine t·e^{−ω_mt}); d120: (A+Bt)e^{−ω_nt}, che è quello corretto (SymPy dsolve). All'orale va detta la forma di d120, sapendo che la dispensa la sbaglia. |
| 121 | Caso sovrasmorzato | 211–213 | 213 | sì | sì | Dispensa: λ = −ω_m(ξ ± √(ξ²−1)) (qui senza «i», corretto), x = A₁e^{−ω_m(ξ+√)t} + A₂e^{−ω_m(ξ−√)t}. |
| 122 | Vibrazione forzata: risposta stazionaria | 214–216 | 214–215 | sì | sì | La dispensa **non** fa la sostituzione reale con raccolta dei coefficienti di sin/cos (metodo di d122): ricava ampiezza e fase con il complex replacement. Forzante F₀ sin(ωt) (poi sin(ωt+α)); x_p = X₀ sin(ωt−φ); X₀ = F₀/√((k−mω²)²+(cω)²), φ = arctg cω/(k−mω²). |
| 123 | Complex replacement | 215–218 | 214–215, 217 | sì | sì | Dispensa: X̂_G[−mω²+icω+k] = F̂₀; denominatore = «rigidezza dinamica p(λ)». A p. 217 z₀/F₀ = 1/p(λ) = G(iω) «complex gain» (d123 lo chiama H). Siccome la forzante è sin, a p. 217 si prende **Im**{z}, non Re. Refusi della fonte: e^{iωt} mancante a destra, X̂ = |X|e^{+iφ} (dovrebbe essere e^{−iφ}). |
| 124 | Fattore di amplificazione dinamica | 216 | **215** | sì | sì | A(ρ,ξ) = x₀/x₀^{STA} = 1/√((1−ρ²)²+4ξ²ρ²), con x^{STA} = F₀/K. Pagina dichiarata sbagliata (è 215; a 216 c'è il massimo). |
| 125 | Picco di risonanza smorzata | 216 | 216 | sì | sì (ρ_R = √(1−2ξ²); niente picco per ξ > √½ ≈ 0.7) | Algebra della fonte con refuso (4ρ² al posto di 4ρ³; «4ρ(ρ−1+2ξ²)»), risultato giusto. Il valore del picco A_max = 1/(2ξ√(1−ξ²)) non è né in dispensa né in d125. |
| 126 | Fase della risposta armonica | 216–218 | 215, 216, 218 | sì | sì | Dispensa: φ = arctg(cω/(k−mω²)) = arctg(2ξρ/(1−ρ²)), «sfasamento tra forza e spostamento»; diagramma a p. 216 con φ(ρ=1) = π/2 ∀ξ e, per ξ=0, φ=0 (ρ<1) e φ=π (ρ>1). Il quadrante («aggiungo π» per ρ>1) è detto esplicitamente solo a p. 221. d126 non cita i casi limite. |
| 127 | FRF, receptance, complex gain | 217–218 | 217–218 | sì | sì | Dispensa: |FRF| = 1/√((k−ω²m)²+(ωc)²), arg FRF = arctg ωc/(k−ω²m) (senza segno −). Il termine «receptance» **non** compare: la dispensa dice «spostamento / velocità / accelerazione × unità di forza». La dispensa aggiunge la misura in laboratorio (shaker, accelerometro, Fourier). |
| 128 | Quality factor | 217–218 | 217 | parziale | sì nel valore, diversa la giustificazione | Dispensa: Q = 1/(2ξ) **senza derivazione e senza condizione**, con definizione energetica qualitativa; d128 lo ricava da A(1) = 1/(2ξ) con ζ ≪ 1. Nella fonte manca anche il simbolo Q in «Un sistema con __ basso» (spazio vuoto). |
| 129 | Eccitazione di vincolo: eq. del moto | 219–221 | 219 | sì | sì | Dispensa: mẍ_G + cẋ_G + kx_G = cẋ_V + kx_V (dopo aver posto Δx^{ST}_{AA'} = 0); d129 nella forma mẍ + c(ẋ−ẏ) + k(x−y) = 0. Equivalenti. Base x_V = X_V sin ωt. |
| 130 | Trasmissibilità di spostamento | 219–221 | 219–220 | sì | sì | √(1+4ξ²ρ²)/√((1−ρ²)²+4ξ²ρ²). La fonte, alla riga successiva, ha il refuso (1+ρ²)² al denominatore. La dispensa fa anche la soluzione **senza** complex replacement (sovrapposizione di due forzanti in quadratura, p. 219). |
| 131 | Fase nell'eccitazione di vincolo | 221–222 | 221 | sì | sì | Dispensa: α_F = arctg 2ξρ, φ = arctg 2ξρ/(1−ρ²) (+π se ρ>1), α_x = α_F − φ < 0 ∀ρ («fase iniziale della risposta»). Coincide con d131 (φ = atan(2ζr) − atan2(2ζr,1−r²)), ma d131 non dice che è sempre negativa. |
| 132 | Trasmissibilità di forza | 222 | 221–222 | sì | sì | Dispensa: F_T = Kx_G + cẋ_G, |F| = x_G√(K²+(cω)²), T_R = √(K²+(cω)²)/√((k−ω²m)²+(cω)²); stesso refuso (1+ρ²)² nella forma adimensionale. Verificato con SymPy che coincide con la trasmissibilità di spostamento. |
| 133 | Condizione di isolamento | 220–222 | 220, 222 | parziale | sì (ρ > √2) | La dispensa **non** fa il conto T²<1 ⇒ 1<(1−r²)²: afferma (dal grafico) che tutte le curve passano per (√2, 1) e usa ρ>√2 nell'esempio della pressa (f_m < f/√2). In più la fonte etichetta male la zona ρ<√2 come «isolamento» (vedi §2, q50). |
| 134 | Massa eccentrica: forza eccitatrice | 223 | 223 | sì | sì (F₀ = M_R ω² R) | Dispensa: non «proietta la centrifuga» ma usa la cinematica x_P = x_O + R cos ωt e la forza d'inerzia del rotore −M_R ẍ_P; ne risulta Mẍ_O + cẋ_O + Kx_O = M_Rω²R cos ωt con M = M_S + M_R. Eccentricità chiamata R (non e), massa rotante M_R. |
| 135 | Risposta a massa eccentrica | 223 | 223 | sì | sì, con precisazione | Dispensa: M|X_O|/(M_R R) = ρ²/√((1−ρ²)²+4ξ²ρ²) con **M = massa totale** e ω_m² = K/M. d135 scrive (m_e/m) senza dire che m è la massa totale (statore + rotore). La dispensa aggiunge ρ→∞: φ = π, x_O = −(M_R R/M)cos ωt, baricentro globale fermo (autocentramento). |

---

## 2. Domande — solo le differenze rispetto alla dispensa

### q04 — Vibrazioni forzate (dispensa pp. 214–216)
- **Forzante**: q04 usa F₀ cos ωt e x_p = X cos(ωt−φ); la dispensa F₀ sin ωt e x_p = X₀ sin(ωt−φ) (p. 214), poi
  F₀ sin(ωt+α) (p. 215). Formule di X e φ identiche.
- **Metodo**: q04 uguaglia i coefficienti di cos/sin; la dispensa usa il complex replacement (p. 214–215). Il
  sistema di q04 è corretto (verificato).
- **Notazione**: q04 ζ, r, x_st; dispensa ξ, ρ, x^{STA}, A(ρ,ξ), «rigidezza dinamica p(λ)».
- **Fase**: q04 «vicino alla risonanza φ ≈ π/2»; la dispensa dice di più: a ρ=1 φ = π/2 **esattamente e per ogni
  ξ**, e per ξ=0 φ salta da 0 a π (p. 216).
- **Omesso da q04, presente in dispensa**: la condizione ξ > √½ ≈ 0.7 per cui il picco scompare e A è monotona
  decrescente (p. 216); il diagramma di A con le curve ξ = 0, 0.1, 0.3, 0.5, 0.8 (p. 215); la definizione di
  risonanza (p. 215); la scomposizione x = x_G + x_p con transitorio trascurabile (p. 214, presente in q04 ma con
  x_h). Né q04 né la dispensa danno A_max = 1/(2ξ√(1−ξ²)).

### q05 — Vibrazioni libere non smorzate (dispensa pp. 209–210)
- **Condizioni iniziali**: q05 tratta x(0)=x₀, ẋ(0)=v₀ e l'ampiezza X = √(x₀²+(v₀/ω_n)²); la dispensa solo
  ẋ(0)=0 ⇒ x = x₀cos ω_mt (p. 210). L'ampiezza generale **non è in dispensa**.
- **Formula guasta in q05**: «x(t) = x₀cos ω_nt + 𝑟𝑎𝑐 v₀ ω_n sin ω_nt» — è un \frac perso nella conversione: va
  letto (v₀/ω_n) sin ω_nt (verificato derivando).
- **Forma ampiezza-fase**: q05 X cos(ω_nt − φ); dispensa C cos(ωt + α) con C = 2A, e la soluzione reale costruita
  da C₂ = C̄₁ (coniugato) (p. 209): passaggio che q05 non fa.
- **Energia**: q05 deriva Ė = 0 da mẍ+kx = 0; la dispensa fa il contrario (dal TEV all'equazione, p. 209).
- **Molla verticale**: coincide (p. 210: x = x' + x^{ST}, x^{ST} = mg/K, mẍ'+Kx'=0, «le forze costanti spostano
  il centro di oscillazione ma non la frequenza»). Nella fonte c'è un refuso di segno «mg + Kx_G^{STATICO} = 0».
- **Omesso da q05**: molle non lineari softening/hardening con i tre grafici F_el–x (p. 209); il periodo T_m e f_m
  sono presenti in entrambe.

### q06 — Vibrazioni libere smorzate (dispensa pp. 211–213)
- **Radici**: q06 λ = −ζω_n ± ω_n√(ζ²−1) (corretto); la dispensa ha la «i» spuria: ω_m(−ξ ± i√(ξ²−1)) (p. 211) —
  errore della fonte, q06 ha ragione.
- **Criticamente smorzato**: q06 x = (A+Bt)e^{−ω_nt} (corretto); la dispensa x = e^{−ω_mt}(A₁+A₂) (p. 213, errata).
  Se il professore segue la dispensa, conviene saper spiegare perché serve il termine in t.
- **Sovrasmorzato**: q06 «ritorna lentamente»; la dispensa precisa «in un tempo maggiore del critico, ma minore
  del sottosmorzato» (p. 213; affermazione non generale, vedi NdT in cap7.md).
- **Energetica**: q06 P_c = −cẋ² ≤ 0 — **non presente in dispensa**.
- **Omesso da q06, presente in dispensa**: il **decremento logaritmico** δ = 2πξ/√(1−ξ²) e la sua misura
  sperimentale (p. 212); il caso ξ=0 ritrovato come caso particolare (p. 212); i tre grafici (ξ = 0.04, 1, 2).

### q07 — Massa eccentrica rotante (dispensa p. 223)
- **Notazione**: q07 m_e, e, M; dispensa M_R, R (eccentricità), M_S, M = M_S + M_R; nella nota a quadretti
  m_R E. Stessa equazione M ẍ + cẋ + kx = m_e e ω² cos ωt (verificata).
- **Formula guasta in q07**: «X = 𝑟𝑎𝑐 m_e e ω² √((k−Mω²)²+(cω)²)» è un \frac perso: X = m_e e ω²/√(...).
- **ζ**: q07 ζ = c/(2Mω_n) con M totale — coerente con la dispensa (ω_m² = K/M).
- **Derivazione**: la dispensa parte da V_P = V_O + ω∧(P−O) e dall'equilibrio F_K+F_C+F_inS+F_inR = 0; q07 dalla
  sola accelerazione ẍ_e. Equivalenti.
- **Autocentramento**: q07 lo descrive a parole; la dispensa lo **dimostra**: per ρ→∞ M|X_O|/(M_R R) → 1, φ = π,
  x_O = −(M_R R/M)cos ωt, x_GLO = [(M−M_R)x_O + M_R x_P]/M = 0 (p. 223). La fase φ=π e il conto del baricentro
  mancano in q07. Esempio «lavatrice/centrifuga» e «2 DOFS» in dispensa.
- q07 «r ≫ 1: il rapporto tende a m_e/M» si riferisce a X/e: coerente con M|X_O|/(M_R R) → 1.

### q21 — Complex replacement (dispensa pp. 214–215, 217)
- **Forzante**: q21 F₀ cos ωt e parte **reale**; la dispensa F₀ sin ωt e parte **immaginaria** (x = Im{z}, p. 217),
  oppure F₀ sin(ωt+α) con F̂₀e^{iα} (p. 215).
- **Nomi**: q21 Z(ω) «rigidezza dinamica complessa»; dispensa p(λ)/p(iω) «rigidezza dinamica» e G(iω) = 1/p
  «complex gain», |G| = «guadagno», α = −φ «fase associata al guadagno complesso» (p. 217). q21 non cita il
  complex gain né il legame guadagno adimensionale = fattore di amplificazione (p. 217).
- **Segno della fase**: q21 dice correttamente che la fase della risposta è −arg Z; la dispensa scrive
  X̂_G = |X_G|e^{+iφ} con φ = arg p (refuso, p. 215) e arg FRF = +arctg (p. 218). Differenza di segno da conoscere.
- **«ℜ{X̂e^{iωt}}»**: corretto per forzante cos; con la convenzione della dispensa (sin) sarebbe Im.

### q49 — Oscillazione di vincolo (dispensa pp. 219–221)
- **Titolo/notazione**: dispensa «ECCITAZIONE DI VINCOLO FORZATA», base x_V = X_V sin ωt, massa x_G, relativa
  x_G^R; q49 y = Y cos ωt, x, z.
- **Equazioni**: coincidono (mẍ_G+cẋ_G+kx_G = cẋ_V+kx_V; m z̈+cż+kz = mω²Y cos ωt ↔ dispensa
  mẍ^R+cẋ^R+Kx^R = mω²X_V sin ωt). Dispensa precisa «moto traslatorio ⇒ niente termini centripeti/Coriolis».
- **Risposta relativa**: Z/Y = r²/√(...) coincide con |x_G^R|/X_V = ρ²A (p. 221). Il massimo del moto relativo è a
  ρ = 1/√(1−2ξ²) > 1 (SymPy): né q49 né la dispensa lo dicono (il grafico a mano lo mette a ρ≈1).
- **Omesso da q49, presente in dispensa**: la soluzione **senza** complex replacement (sovrapposizione di
  cẋ_V e kx_V in quadratura, x_G = A x_V[(cω/K)cos(ωt−φ) + sin(ωt−φ)], p. 219); la **fase iniziale** α_x = α_F − φ
  < 0 ∀ρ (p. 221); il grafico della trasmissibilità con le curve per (√2,1) (p. 220).

### q50 — Trasmissibilità (dispensa pp. 220–222)
- **Formule**: coincidono (T_F = T_X = √(1+(2ζr)²)/√((1−r²)²+(2ζr)²)). La dispensa ha due volte il refuso
  (1+ρ²)² al denominatore (pp. 220 e 222): q50 è corretta.
- **Formula guasta in q50**: «X = 𝑟𝑎𝑐 F₀ √(...)» e «T_F = 𝑟𝑎𝑐 |F_T| F₀» sono \frac persi.
- **Zone**: q50 «isolamento per r>√2» corretto; la dispensa scrive «① ρ<√2 → T_R<1 = zona di isolamento»
  (errato: per 0<ρ<√2 T_R>1 per ogni ξ) e, per ρ>√2, «più ξ↑, minore sarà l'ampiezza» (errato: a ρ=2,
  T=0.356 per ξ=0.1 e 0.620 per ξ=0.5). q50 («un grande smorzamento aumenta la forza trasmessa ad alta
  frequenza») è giusta e coincide col testo battuto della stessa p. 220 («peggiora le prestazioni in isolamento»).
- **Derivazione**: q50 fa il conto T²<1 ⇒ r>√2; la dispensa lo deduce dal grafico (punto comune (√2,1)).
- **Omesso da q50, presente in dispensa**: limiti ξ=0 (T_R = 1/|1−ρ²|), ρ=0 (T_R=1, «la massa si sposta quanto il
  vincolo»), ξ→∞ (T_R→1, «asta rigida», blocco rigido) (p. 220); esempio della pressa da 120 colpi/min con
  f_m < f/√2 (= 1.41 Hz, conto non svolto in dispensa) (p. 222); motivazione sospensioni auto (p. 221).

---

## 3. Derivazioni della dispensa non coperte da d111–d135

| Derivazione / risultato | Pagine PDF |
|---|---|
| Leggi della molla F_{E,A} = −K(x_A−x_B) e dello smorzatore F_{S,A} = −c̃(ẋ_A−ẋ_B) tra due corpi, convenzione «forze tutte positive» | 208 |
| Equazione del moto dal teorema dell'energia cinetica (W^{cons}, W^{N.C.}) | 209 |
| Molle non lineari: softening («molla cedevole») e hardening («molla a balestra»), grafici F_el–x | 209 |
| Soluzione reale da C₂ = C̄₁: x = A(e^{i(ωt+α)} + e^{−i(ωt+α)}) = 2A cos(ωt+α) | 209, 212 |
| Oscillatore armonico verticale: x^{ST} = mg/K, cambio di variabile x = x' + x^{ST}, mẍ'+Kx' = 0 | 210 |
| Caso ξ=0 ritrovato come caso particolare del sistema smorzato | 212 |
| Misura sperimentale di ξ dal decremento logaritmico | 212 |
| Risposta completa x = x_G + x_p e transitorio trascurabile | 214 |
| Condizione ξ > √½ per l'assenza di picco (A monotona) | 216 |
| Diagramma della fase: ξ=0 ⇒ φ = 0 / π; φ(ρ=1) = π/2 ∀ξ | 216 |
| FRF misurata in laboratorio (shaker, accelerometro, trasformata di Fourier) | 218 |
| Eccitazione di vincolo risolta **senza** complex replacement (sovrapposizione di due forzanti in quadratura) | 219 |
| Limiti della trasmissibilità: ξ=0, ρ=0, ρ=1, ξ→∞ (T_R→1, asta rigida) | 220 |
| Fase iniziale α_x = α_F − φ < 0 per ogni ρ | 221 (d131 la ricava ma non ne mostra il segno) |
| Moto relativo base–massa: mẍ^R+cẋ^R+Kx^R = mω²X_V sin ωt, |x^R|/X_V = ρ²A(ξ,ρ) | 221 |
| Forza trasmessa al muro F = Kx_G + cẋ_G = x_G(K+iωc)e^{iωt} (base fissa) | 221 |
| Progetto d'isolamento (pressa 120 colpi/min): f_m < f/√2 | 222 |
| Massa eccentrica: limite ρ→∞ (φ = π, x_O = −(M_R R/M)cos ωt) e baricentro globale x_GLO = 0 (autocentramento) | 223 |

---

## 4. Simboli del capitolo

| Simbolo | Significato | Pagina PDF |
|---|---|---|
| M, m | massa del blocco (scritte entrambe, anche nella stessa riga) | 208–223 |
| K, k | rigidezza della molla | 208–223 |
| C, c, c̃ | costante dello smorzatore viscoso (c̃ a p. 208) | 208, 211–223 |
| F_in = −Mẍ | forza d'inerzia | 208, 209, 214 |
| F_el (F_E, F_K, F_k) | forza elastica | 208–223 |
| F_S, F_s, F_c, F_C | forza dello smorzatore | 208, 211, 214, 219, 221, 223 |
| S1, S2; A, B; A', B' | corpi e punti di attacco di molla/smorzatore | 208, 219, 221 |
| x(t), x_G | spostamento (x_G: del baricentro G della massa) | 209–221 |
| E_K, E_P, W^{EST}, W^{INT}, W^{CONS}, W^{N.C.} | energie e potenze (TEV) | 209 |
| λ, λ₁,₂ | radici dell'equazione caratteristica; ansatz e^{λt} | 209, 211–213 |
| ω_m (= ω_n) | pulsazione naturale √(K/m) | 209–223 |
| T_m, f_m | periodo e frequenza naturali | 210, 222 |
| C, α (= fase), A, A₁, A₂, C₁, C₂ | costanti della soluzione libera | 209–213 |
| x^{ST}, x_G^{STATICO}, l₀, l^{ST}, l | freccia statica, lunghezze della molla | 210 |
| x' | coordinata dalla configurazione di equilibrio statico | 210 |
| p(λ), p(iω) | polinomio caratteristico (p. 211) e rigidezza dinamica −mω²+icω+k (pp. 215–220) | 211, 215, 217, 220, 221 |
| c_r | coefficiente di smorzamento critico 2ω_m m | 211, 213 |
| ξ (= ζ; grafia simile a φ) | fattore di smorzamento c/c_r | 211–223 |
| ω_d, T_d | pulsazione e periodo smorzati | 212 |
| δ | decremento logaritmico | 212 |
| F₀, F̂₀, α_F | ampiezza (reale/complessa) e fase della forzante | 214–223 |
| x_G(t), x_P(t) / x_p | integrale generale e particolare | 214, 217 |
| X₀, X̂₀, X̂_G | ampiezza (reale/complessa) della risposta | 214–223 |
| φ (= α_DS) | sfasamento forza–spostamento («dynamic stiffness») | 214–221 |
| ρ | rapporto di frequenze ω/ω_m | 215–223 |
| x^{STA} | spostamento statico F₀/K | 215 |
| A(ξ,ρ) | fattore di amplificazione | 215–223 |
| ρ_R | ρ di massimo √(1−2ξ²) | 216 |
| z(t), z₀, z_G, z_p | grandezze complesse del C.R. (x = Im z) | 217 |
| G(iω) | complex gain 1/p(λ); |G| = guadagno | 217 |
| Q | quality factor 1/(2ξ) | 217 |
| FRF(iω) | frequency response function | 218 |
| x_V, X_V (anche X₀) / y_V | spostamento e ampiezza della base mobile (assi della base) | 219–221 |
| x^{ST}_{AA'} | deformazione statica della molla | 219, 221 |
| x_G^{(1)}, x_G^{(2)}, x_V^{(1)}, x_V^{(2)}, α_x | risposte e forzanti parziali; fase della risposta | 219, 221 |
| T_R | trasmissibilità (di spostamento e di forza) | 220, 222 |
| X₀/Y₀, ω_n, f_s | ampiezze massa/base, pulsazione, freccia statica (grafico stampato) | 220 |
| x_G^R | spostamento relativo massa–base | 221 |
| F_i, |F| | forza trasmessa al muro | 221–222 |
| M_S, M_R, M = M_S+M_R | massa statore, rotore, totale | 223 |
| R (anche E, e) | eccentricità del rotore | 223 |
| O, O', P, x_P, y_P, ê | centro dello statore, punto rotante, versore radiale | 223 |
| x_O, X_O | spostamento / ampiezza dello statore | 223 |
| x_GLO (nota: x_G) | baricentro del sistema statore+rotore | 223 |

### Conflitti di notazione
1. **x_G** ha tre significati: baricentro della massa (pp. 209–210, 219–221), integrale generale (pp. 214, 217) e,
   a p. 223, posizione dello statore e poi baricentro globale (nota a quadretti). Nelle pp. 214–215 «x_G» è anche
   la risposta a regime che si cerca.
2. **p(λ)** = polinomio caratteristico (p. 211) e rigidezza dinamica (p. 215); a p. 217 scritta una volta come
   1/(−mω²+k+iωc) (incoerente con le righe vicine).
3. **ω_m** per la pulsazione naturale (le fonti derivate e il grafico stampato di p. 220 usano ω_n).
4. **Forzante sin** (dispensa) vs **cos** (q04, q07, q21, q49, q50): cambia Re/Im e la fase iniziale; a p. 223 la
   dispensa stessa passa a cos ωt.
5. **Ampiezza della base**: X_V e X₀ nella stessa p. 219; Y₀ nel grafico e nel testo battuto di p. 220; Y nelle q49–q50.
6. **Eccentricità**: R (p. 223 manoscritto), E (nota a quadretti), e (q07, d134–d135); massa rotante M_R / m_R / m_e.
7. **Segno della fase**: la dispensa usa φ > 0 come ritardo ma scrive X̂ = |X|e^{+iφ} (p. 215) e arg FRF = +arctg
   (p. 218); q21 e d126 usano correttamente arg H = −φ.
8. **ξ**: la stessa lettera corsiva è a volte indistinguibile da φ (fase): attenzione in A(ξ,ρ) vs φ(ξ,ρ) (p. 219).
9. **F(t)** indica sia la forzante applicata sia la forza trasmessa al muro (p. 221).
