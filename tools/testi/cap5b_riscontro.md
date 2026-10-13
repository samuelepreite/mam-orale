# Riscontro — Capitolo «Ingranaggi e rotismi», seconda parte (PDF pp. 174–192)

Fonte di verità: trascrizione `cap5b.md`. Fonti derivate confrontate: dimostrazioni d089–d100, d139, d141
(`/home/claude/work/dd/`) e domande q16, q17, q23, q26, q27, q28, q29, q30, q47, q51, q52 (`/home/claude/work/dq/`).
Tutte le verifiche algebriche citate sono state fatte con SymPy (script nello scratchpad, non salvato nel progetto).

## 1. Tabella delle dimostrazioni

| n. | Titolo | Pagine dichiarate | Pagine reali | Presente | Risultato coincide? | Note |
|---|---|---|---|---|---|---|
| d089 | Formula di Willis | 174–179 | 174 (applicazioni 175, 176, 180) | sì | **sì, ma con convenzione invertita**: la dispensa scrive $\tau_{WILLIS} = \frac{\omega_2-\Omega}{\omega_1-\Omega}$ (uscita/entrata), d089 scrive $\frac{\omega_1-\omega_p}{\omega_2-\omega_p} = \tau_0$ | Dispensa: Ω (non ω_p), τ_W/τ_Willis (non τ₀); ricava le velocità relative come composizione $\omega_1 = \omega^{Rel}_{1,P} + \Omega$ (Ω = velocità di trascinamento) e nota $\Omega^{Rel}_{P,P}=0$. Esempio Fig. 5-47a con satellite doppio: $\tau_W = \frac{z_1}{z_3}\frac{z_4}{z_2}$, assente in d089. Con la convenzione di d089 il τ₀ di un riduttore a corona fissa vale −3, non −1/3. |
| d090 | Velocità propria del satellite | 174–179 | 174 (composizione), 175 (calcolo via CIR) | parziale | sì (concettualmente) | La dispensa **non** applica Willis al satellite: ricava ω₂ col CIR (C₂,₃ fermo) nel riduttore a corona fissa, $\omega_2 = \omega_1R_1/(2R_2) = \omega_1/2$ (in modulo; con segno −ω₁/2, verificato), e nel caso solare fisso $\omega_2 = \frac32\omega_3$. d090 non dà formula esplicita. |
| d091 | Relazione fra le coppie | 179–180 | 179 (e 177 per il differenziale) | sì | sì: $C_1/C_2 = -\tau_W$, $C_p/C_1 = (1-\tau_W)/\tau_W$ | La dispensa fa due vie: TFV assoluto + II ECD, e TFV relativo al portatreno ($C_p(\Omega-\Omega)=0$). Refuso della fonte p. 179: «$C_p = -C_1 + C_2$» (va $-C_1 - C_2$). Ipotesi dichiarate in fonte: regime, η = 1. d091 non esplicita il risultato («rapporti determinati da τ₀»). Conclusione della fonte: «partitore di coppia», rapporto indipendente dalla cinematica. |
| d092 | Rendimento rotismo ordinario (cascata) | 179–180 | **184** (singolo ingranaggio 181–182) | sì | sì: $\eta_{TOT} = \eta^I\eta^{II}\eta^{III}$ | Pagine dichiarate errate. La dispensa usa TFV con segno ($\eta^I C_m\omega_m + C_u'\omega_u' = 0$) e principio di azione e reazione fra stadi ($C_m'\omega_m' = -C_u'\omega_u'$), sottosistemi S₁, S₂, S₃ con «motore/utilizzatore equivalente». d092 usa solo rapporti di potenze in modulo. |
| d093 | Rendimento rotismo epicicloidale | 179–180 | **assente in pp. 174–192** | no | — | Nelle pagine 181–184 la dispensa tratta solo il rendimento di ingranaggio singolo (η₁, η₂), la condizione (*), l'irreversibilità e la cascata in serie. Nessuna derivazione con potenze relative al portatreno né formula η_EPI. Da cercare altrove (altre pagine o altro PDF). |
| d094 | Rotismo combinato | 180–185 | **180** | parziale | parziale | La dispensa: conteggio gdl $l = 2m^{RE} + m^{RO} - v = 2+2-1-1-1 = 1$; $\tau_0^{(1)} = -z_5/z_6$; $\Omega/\omega = \tau_W/(\tau_W-1)$ con «HYP: τ_W > 1»; $\tau_0^{(2)} = -z_8/z_7$; tre TFV + II ECD per il RE. **Non** scrive il rapporto globale: combinando (SymPy) $\omega_7/\omega_5 = \frac{z_5z_8}{z_6z_7}\frac{\tau_W}{\tau_W-1}$. d094 non menziona né conteggio gdl né l'ipotesi τ_W > 1. |
| d095 | Modulo normale e trasversale | 185–189 | **186** | sì | sì, con notazione diversa | Dispensa: $P_m = P\cos\alpha$, $m_m = m\cos\alpha$ (pedice «m» = normale; m senza pedice = frontale). **α = angolo d'elica primitivo** nella dispensa; d095 usa β. Attenzione: nella dispensa β è l'angolo d'elica sul cilindro **fondamentale** (p. 185, tg β = tg α cos θ), quindi «m_n = m_t cos β» letto con il β della dispensa sarebbe sbagliato. |
| d096 | Ruota equivalente, numero virtuale di denti | 185–189 | 187–188 | sì | sì: $z_{fitt} = z/\cos^3\alpha$ (d096: $z_v = z/\cos^3\beta$) | Stessa procedura (ellisse $a = r/\cos\alpha$, $b = r$; $R = a^2/b = r/\cos^2\alpha$; $z = 2R/m_m$). Dispensa: «circonferenza osculatrice», «ruota fittizia», contatto supposto all'estremo dell'asse minore. Solo differenza: simbolo dell'angolo (α vs β). |
| d097 | z_min ruote elicoidali | 188–189 | 188 | sì | sì: $z_{min} = z^*_{min}\cos^3\alpha$ | Notazione α (fonte) vs β (d097). La dispensa non parla di arrotondamento all'intero superiore. |
| d098 | Forze nelle ruote elicoidali | 189 | 189 (con 186 per θm) | sì | sì (equivalente) | Dispensa: $Q = F\cos\theta_m\cos\alpha$, $A = F\cos\theta_m\sin\alpha$, $R = F\sin\theta_m$; poi $Q = C/r$, $R = \frac{C}{r}\frac{\operatorname{tg}\theta_m}{\cos\alpha}$, $A = \frac{C}{r}\operatorname{tg}\alpha$. d098: $F_r = F_t\tan\alpha_t$ coincide perché $\operatorname{tg}\theta_m = \operatorname{tg}\theta\cos\alpha$ ⇒ $R = Q\operatorname{tg}\theta$ (verificato). d098 usa α_t per l'angolo di pressione frontale (la dispensa: θ) e β per l'elica (la dispensa: α): **conflitto α/β completo**. La dispensa passa per la componente H'' nel piano normale; d098 non lo fa. Refuso della fonte: $|C| = |Q|R_1 = |F|\cos\theta_m\cos\alpha$ (manca R₁). |
| d099 | Ruote coniche: rapporto | 190–191 | 190 | sì | sì in sostanza, **definizione invertita**: dispensa $\tau = \omega_2/\omega_1 = r_1/r_2 = \sin\varphi_1/\sin\varphi_2 = z_1/z_2$; d099 $\lvert i\rvert = \omega_1/\omega_2 = R_2/R_1 = z_2/z_1$ | La dispensa passa per $\overline{OP} = r_1/\sin\varphi_1 = r_2/\sin\varphi_2$ (d099 lo accenna); aggiunge $\psi = \varphi_1+\varphi_2$, $\operatorname{tg}\varphi_1 = \sin\psi/(1/\tau + \cos\psi)$, $\operatorname{tg}\varphi_2 = \sin\psi/(\tau+\cos\psi)$ (verificati) e la ruota piano-conica $\omega_2 = \omega_1\sin\varphi_1$: tutto assente in d099. |
| d100 | Forze nelle ruote coniche | 191 | 191 | sì | sì: $R = \frac{C_1}{r_1}\operatorname{tg}\theta\cos\varphi_1$, $A = \frac{C_1}{r_1}\operatorname{tg}\theta\sin\varphi_1$ | Notazione: dispensa θ (pressione) e φ₁ (semiapertura cono), d100 α e δ. d100 usa $r_m$ (raggio medio); la dispensa usa r₁ senza dire «medio». La dispensa non parla di «ruota equivalente»: usa il piano Π ⊥ alla generatrice, $F = C_1/(r_1\cos\vartheta)$ e la componente F'' = F sin θ (nella figura F'). |
| d139 | Ricoprimento totale ε_γ = ε_α + ε_β | 185–189 | 186–187 | parziale | sì nella sostanza, notazione assente | La dispensa non usa ε: scrive $z_{presa} = \frac{\delta_e}{P\cos\theta} = \frac{\delta}{P\cos\theta} + \frac{\overline{CK}}{P\cos\theta}$ con $\overline{CK} = b\operatorname{tg}\beta$ e $\delta_e = \delta + \overline{CK}$. Il secondo termine con β (elica di base) equivale a $b\operatorname{tg}\alpha/P$ = ε_β usuale (verificato). d139 non dice quale angolo usare. |
| d141 | Differenziale | 174–180 | 176–178 | sì | sì: $\Omega = (\omega_1+\omega_2)/2$ | Dispensa: solari 1, 2, τ_w = −1 «a portatreno fisso»; inoltre $C_2/C_1 = -1/\tau_w = 1$, $C_p = -(C_1+C_2)$, cinematica in curva $V_{1,2} = \omega_V(R\mp p/2)$, $\omega_{1,2} = \frac{2V_M}{d}(1\mp\frac{p}{2R})$, $\Omega = 2V_M/d$ (Fig. 5-53). d141: pedici L, R, c; nessuna delle relazioni di coppia o della cinematica di curva. |

## 2. Domande — solo le differenze

### q16 — Riduttore di coppia (dispensa p. 180, 181–182)
- **Segno/convenzione.** q16 scrive $C_i\omega_i = C_u\omega_u$ e $C_u = C_i/\tau$ (ideale), $C_u = \eta C_i/\tau$ (reale).
  La dispensa usa coppie algebriche con TFV $C_1\omega_1 + C_2\omega_2 = 0$ ⇒ $C_1/C_2 = -\tau$ (ideale) e
  $\eta_1 C_1\omega_1 + C_2\omega_2 = 0$ ⇒ $C_1/C_2 = -\tau/\eta_1$ (p. 180, 181). Con la convenzione della dispensa
  $C_2 = -\eta_1 C_1/\tau$: q16 omette il segno meno (vale solo in modulo).
- **Contenuto della dispensa omesso** (p. 180): «RIDUTTORE DI GIRI ⟹ MOLTIPLICATORE DI COPPIA ⟹ ω↓ η↑ MOTO DIRETTO;
  MOLTIPLICATORE DI GIRI ⟹ RIDUTTORE DI COPPIA ⟹ ω↑ η↓ MOTO RETROGRADO»; p. 182: rendimento migliore per τ < 1 con ruota
  veloce motrice, peggiore per τ > 1. q16 non lega il riduttore di coppia al rendimento peggiore.
- La frase «un riduttore di velocità è un moltiplicatore di coppia…» corrisponde alla p. 180. Ok.

### q17 — Differenziale (pp. 176–178)
- Formula di Willis e $\Omega = (\omega_L+\omega_R)/2$: coincidono (pedici diversi: dispensa 1, 2).
- **Omesso**: $C_2/C_1 = -1/\tau_w = 1$ e $C_p = -(C_1+C_2)$ (p. 177), richiamati come conseguenza della (5.59); la
  cinematica in curva della Fig. 5-53 ($V_1 = \omega_V(R-p/2)$, $V_M = \omega_V R$, $V_2 = \omega_V(R+p/2)$,
  $\omega_{1,2} = \frac{2V_M}{d}(1\mp\frac{p}{2R})$, $\Omega = 2V_M/d$), con d = diametro ruota, p = carreggiata.
  Verificato: la media di ω₁ e ω₂ dà 2V_M/d.
- **Assente nella dispensa**: la limitazione di trazione dell'«open differential» (ruota sul ghiaccio, LSD): non
  compare in queste pagine.
- q17 parla di «satelliti conici»; la dispensa (libro) chiama i satelliti «planetari» 3 e 4 e i solari 1 e 2.

### q23 e q47 — Numero di denti in presa, elicoidali (pp. 186–187)
- **Notazione δ_e in conflitto.** Nella dispensa $\delta_e = \delta + \overline{CK}$ è la **lunghezza effettiva**
  e $\overline{CK} = b\operatorname{tg}\beta$ è il termine aggiuntivo. q23/q47 chiamano $\delta_e = b\tan\beta$ il solo
  allungamento e $AE = AB + b\tan\beta$ il segmento efficace. Risultato identico, simboli scambiati.
- La dispensa a p. 187 usa δ (altezza del rettangolo) per il segmento dei contatti, AB solo a p. 186.
- **Angolo β**: le linee di contatto inclinate di β; nella dispensa β è l'angolo d'elica sul cilindro fondamentale
  (p. 185). q23/q47 non lo precisano; con l'angolo primitivo α il termine sarebbe sbagliato (corretto: $b\operatorname{tg}\beta/(P\cos\theta) = b\operatorname{tg}\alpha/P$, verificato).
- **Omesso**: la descrizione dei punti H, J, M, K del rettangolo (inizio contatto, contatto su tutta la lunghezza,
  inizio disimpegno, fine contatto) e la frase «se entro in presa avanti non sono ancora entrato dietro».
- q23 contiene una formula corrotta («n_el = rac AB + b tanβ p cosθ»), da leggere $\frac{AB + b\tan\beta}{p\cos\theta}$.
- Le considerazioni su rigidezza di ingranamento e cambi automobilistici (q47) non sono nella dispensa.

### q26 — Numero minimo di denti, elicoidali (pp. 187–188)
- Formule coincidenti (stessa notazione α della dispensa). Differenze minori: q26 scrive $m_n$, il manoscritto $m_m$
  (la parte battuta di p. 188 usa $m_n$); la dispensa usa l'asterisco $z^*_{min}$ per i denti dritti.
- «Arrotondato all'intero superiore»: assente nella dispensa.
- **Omesso**: la frase della dispensa che il contatto si suppone nel punto all'estremo dell'asse minore dell'ellisse e
  che due ruote elicoidali sono rappresentabili come due ellissi tangenti.

### q27 — Forze, elicoidali (p. 189, 186)
- **Costruzione diversa.** Dispensa: F nel piano normale → $R = F\sin\theta_m$, $H'' = F\cos\theta_m$ (H'' tangente al
  cilindro primitivo nel piano normale) → $Q = H''\cos\alpha$, $A = H''\sin\alpha$; risultato
  $A = \frac{C}{r}\operatorname{tg}\alpha$, $R = \frac{C}{r}\frac{\operatorname{tg}\theta_m}{\cos\alpha}$.
  q27: H = risultante **nel piano trasversale** $= Q/\cos\theta$, $A = H\tan\beta = Q\tan\beta/\cos\theta$,
  $F = Q/(\cos\theta\cos\beta)$.
- **Verifica**: le due formulazioni coincidono solo se il β di q27 soddisfa $\operatorname{tg}\beta = \operatorname{tg}\alpha\cos\theta$,
  cioè è l'angolo d'elica **di base** della dispensa (p. 185). Con questo β: $Q\tan\beta/\cos\theta = Q\operatorname{tg}\alpha$
  e $F^2 = Q^2+R^2+A^2$ (SymPy: differenze nulle). q27 lo descrive solo come «angolo che porta dalla risultante
  trasversale a quella totale», senza legarlo all'angolo d'elica: rischio di usare α al posto di β, che darebbe A errata
  di un fattore $1/\cos\theta$.
- **Omesso**: la formula finale della dispensa $A = (C/r)\operatorname{tg}\alpha$ (la più semplice da dire all'orale),
  l'angolo di pressione normale θm, il caso α = 0. Ingranaggi a freccia e Citroën: la dispensa aggiunge la nota «asse
  ruote in trazione per evitare instabilità elastica da carico di punta».
- La dispensa denota H'' la componente nel piano normale; q27 usa H per un'altra grandezza: conflitto di simbolo.

### q28 — Forze, coniche (p. 191)
- Risultati coincidenti: $R = \frac{C}{r}\operatorname{tg}\theta\cos\varphi$, $A = \frac{C}{r}\operatorname{tg}\theta\sin\varphi$.
- q28 chiama $F_a = Q\tan\theta$ la componente che interseca gli assi: la dispensa la chiama **F''** (F' in figura),
  $F'' = F\sin\theta$; il pedice «a» si confonde con la componente assiale A.
- q28 dice «ruota cilindrica fittizia equivalente»: la dispensa ragiona invece nel **piano Π perpendicolare alla
  generatrice di contatto** (nessuna ruota fittizia in queste pagine).
- **Omesso**: $F = C_1/(r_1\cos\vartheta) = C_2/(r_2\cos\vartheta)$ e $C_1 = Qr_1$, $C_2 = Qr_2$.

### q29 — Rotismi epicicloidali (pp. 174–175, 179)
- Willis $\tau_W = \frac{\omega_3-\Omega}{\omega_1-\Omega} = -\frac{z_1}{z_3}$ e $\Omega/\omega_1 = z_1/(z_1+z_3)$:
  coincidono con p. 175 (dove $-R_1/R_3 = -1/3$ ⇒ Ω = ω₁/4; verificato). q29 contiene un refuso tipografico
  («ω₃ − Ω = auW(ω₁ − Ω)» = τ_W).
- **Definizione**: q29 «almeno una ruota ha asse mobile»; la dispensa definisce solari, satelliti (o planetari) e
  portatreno con assi coincidenti dei solari; 2 g.d.l. coincidono (p. 174, p. 180).
- **Omesso** (potenzialmente chiesto): condizione geometrica $R_1+R_3 = R_2+R_4$ / $z_1+z_3 = z_2+z_4$ e $R_2 = R_1+2R_3$
  (p. 174); τ_W del satellite doppio $\frac{z_1z_4}{z_3z_2}$; secondo riduttore con solare fisso $\Omega = \frac34\omega_3$
  («più alto riduttore», p. 175); verifica cinematica col CIR; la classificazione riduttore/combinatore/differenziale
  (p. 175); TFV relativo al portatreno come seconda via per le coppie (p. 179).
- Relazione coppie $C_1/C_3 = -\tau_W$: coincide con $C_1/C_2 = -\tau_W$ di p. 179 (pedici diversi).

### q30 — Velocità del satellite (p. 175)
- $\omega_2 = \Omega - \frac{z_1}{z_2}(\omega_1-\Omega)$ (refuso «rac»); verificato: con R₁ = R₂, R₃ = 3R₁, ω₃ = 0 dà
  ω₂ = −ω₁/2, uguale (in modulo) al risultato della dispensa ω₂ = ω₁/2 ottenuto col CIR; la verifica 2–3 con
  $(\omega_3-\Omega)/(\omega_2-\Omega) = +z_2/z_3$ dà lo stesso valore.
- La dispensa **non** usa Willis per il satellite: usa solo il CIR (C₂,₃ fermo se la corona è fissa; C₁,₂ fermo se il
  solare è fisso). q30 presenta il CIR come «metodo alternativo»; per la dispensa è il metodo.
- $|\omega_2| = v_{O_2}/\overline{O_2K}$ (refuso «rac»): coincide con $V_{O_2} = \Omega\,2R_1 = \omega_2R_2$.
- **Omesso**: il caso solare fisso ($\omega_2 = \frac32\omega_3$).

### q51 — Rendimento rotismo ordinario (pp. 181–184)
- $\eta = -W_{out}/W_{in}$, $W_P = -(1-\eta)W_{in}$, $|C_u|/|C_i| = \eta/|\tau|$, $\eta_{tot} = \prod\eta_j$: coincidono
  con $\eta = -W_u/W_m$, $W_{diss} = -(1-\eta_1)C_1\omega_1$, $|C_1|/|C_2| = \tau/\eta_1$ (pp. 181, 184).
- Refuso in q51: «η_tot = 0.983» va letto $0{,}98^3 \approx 0{,}941$.
- **Omesso** (tutto nella dispensa, pp. 181–183): rendimento con ruota 2 movente $\eta_2$ e $C_1/C_2 = -\tau\eta_2$;
  il distinguo cilindriche (segni) / coniche (moduli); la **condizione (*) di avviamento**
  $\tau\eta_2 < |C_1|/|C_2| < \tau/\eta_1$ (gli ingranaggi restano in quiete); η₁ ≅ η₂ ≅ 0,98 per τ ≅ 1; rendimento
  migliore per τ < 1 / peggiore per τ > 1; significato del rendimento negativo; esempio vite senza fine–ruota elicoidale
  ($\tau = z_1/z_2 \ll 1$, moto retrogrado generalmente impossibile ⇒ irreversibile).
- **Assente nella dispensa**: elenco delle cause di perdita, $P_{loss} = F_{att}v_{rel}$ e strisciamento rispetto al
  punto di passo (non in queste pagine).

### q52 — Rendimento rotismo epicicloidale
- **Contenuto assente nelle pp. 174–192**: nessuna pagina del capitolo contiene i due osservatori F/M,
  $W_{PM} = W_{PF}$, né $\eta_{EPI} = \frac{\tau_W-\eta_{ORD}}{\tau_W-1}$ o $\eta_{EPI} = \frac{\eta_{ORD}\tau_W-1}{\eta_{ORD}(\tau_W-1)}$.
  Le formule di q52 sono internamente coerenti (SymPy: entrambi i casi seguono dalle uguaglianze di perdita dichiarate,
  con $\Omega/\omega_1 = \tau_W/(\tau_W-1)$), ma la loro fonte non è in queste pagine.
- Ciò che la dispensa contiene di collegato: η ≤ 0 ⇒ moto retrogrado impossibile, irreversibilità (pp. 182–183);
  $\Omega/\omega = \tau_W/(\tau_W-1)$ (p. 175 e p. 180, quest'ultima con «HYP: τ_W > 1»).

## 3. Derivazioni della dispensa non coperte dalle dimostrazioni assegnate

| Derivazione | Pagine PDF |
|---|---|
| Condizione geometrica di coassialità $R_1+R_3 = R_2+R_4$, $z_1+z_3 = z_2+z_4$, $R_2 = R_1+2R_3$ | 174 |
| τ_W del rotismo con satellite doppio (Fig. 5-47a): $\frac{z_1}{z_3}\frac{z_4}{z_2} > 0$ | 174 |
| Riduttore a corona fissa: Ω = ω₁/4 via Willis e via CIR | 175 |
| Riduttore a solare fisso: Ω = 3ω₃/4 via Willis e via CIR | 175 |
| Differenziale: coppie $C_2/C_1 = 1$, $C_p = -(C_1+C_2)$; cinematica in curva e $\Omega = 2V_M/d$ | 177–178 |
| Conteggio gdl del rotismo combinato $l = 2m^{RE}+m^{RO}-v$ | 180 |
| Rendimento di ingranaggio singolo: η₁ (1 movente), η₂ (2 movente), cilindriche e coniche, $W_{diss}$ | 181–182 |
| Condizione (*) di avviamento $\tau\eta_2 < |C_1|/|C_2| < \tau/\eta_1$ | 182 |
| Irreversibilità, rendimento negativo, vite senza fine | 182–183 |
| Angolo d'elica di base: $\operatorname{tg}\beta = \operatorname{tg}\alpha\cos\theta$ | 185 |
| Angolo di pressione normale: $\operatorname{tg}\theta_m = \operatorname{tg}\theta\cos\alpha$ | 186 |
| Denti in presa dritti $z_{presa} = AB/(P\cos\theta)$ ed elicoidali (coperta solo parzialmente da d139) | 186–187 |
| Coni: $\operatorname{tg}\varphi_1 = \sin\psi/(1/\tau+\cos\psi)$, $\operatorname{tg}\varphi_2 = \sin\psi/(\tau+\cos\psi)$ | 190 |
| Ruota piano-conica: $\omega_2 = \omega_1\sin\varphi_1$ | 190 |
| Forza totale nelle coniche $F = C_1/(r_1\cos\vartheta)$ | 191 |

## 4. Simboli del capitolo

| Simbolo | Significato | Pagina PDF |
|---|---|---|
| ω₁, ω₂ | velocità angolari dei solari (in generale) | 174, 176, 179 |
| ω₃ | corona (riduttore), oppure satellite (Fig. 5-47) | 175 / 174 |
| Ω | velocità angolare del portatreno | 174–180 |
| ω^Rel_{i,P} | velocità di i relativa al portatreno | 174 |
| τ_WILLIS, τ_W, τ^W, τ_w | rapporto del rotismo reso ordinario, $(\omega_2-\Omega)/(\omega_1-\Omega)$ (uscita/entrata) | 174–180 |
| τ_GLOB | rapporto globale Ω/ω | 175 |
| τ₀^(1), τ₀^(2) | rapporti degli ordinari in entrata/uscita del combinato | 180 |
| P (corsivo) / p | portatreno (Fig. 5-47, 5-52) / carreggiata del veicolo (p. 177) / passo elica p (p. 185) | 174, 176–178, 185 |
| C₁, C₂, C_p | coppie esterne su solari e portatreno | 177, 179 |
| ω_V, V₁, V_M, V₂, R, d | vel. di imbardata, velocità centri ruote e punto medio, raggio della traiettoria, diametro ruota | 177–178 |
| l, m, v | gradi di libertà, n. di sottosistemi (moltiplicati per i gdl), vincoli semplici | 180 |
| η, η₁, η₂, η^I… | rendimento; con 1 movente; con 2 movente; di stadio | 180–184 |
| W_m, W_u, W_diss | potenza motrice (>0), resistente (<0), dissipata (<0) | 181, 183 |
| z₁, z₂ (vite) | n. di principi della vite, n. di denti della ruota | 183 |
| M_eq, U_eq | motore/utilizzatore equivalente dei sottosistemi | 184 |
| P, P_e | passo (circonferenziale) / passo dell'elica | 185 |
| R, R_f (r, r_f) | raggio primitivo / del cilindro fondamentale | 185 |
| **α** | angolo d'elica sul cilindro **primitivo** (rispetto all'asse) | 185–189 |
| **β** | angolo d'elica sul cilindro **fondamentale** = inclinazione delle linee di contatto | 185, 187 |
| θ (ϑ nel libro) | angolo di pressione frontale (⊥ all'asse) | 185–191 |
| θm (ϑ_n nel libro) | angolo di pressione normale | 186, 189 |
| P_m, m_m (p_n; m_n nelle parti battute) | passo e modulo normali | 186, 188 |
| AB, δ, δ_e, CK, b | segmento dei contatti, sua lunghezza, lunghezza effettiva, termine aggiuntivo, larghezza di fascia | 186–187 |
| z*_min, z_FITTIZIO | n. minimo denti dritti, n. denti ruota fittizia | 188 |
| F, R, H'', Q, A | forza normale, radiale, componente nel piano normale tangente al primitivo, tangenziale, assiale | 189 |
| φ₁, φ₂, ψ | semiaperture dei coni primitivi, angolo fra gli assi | 190–191 |
| F'' (testo) = F' (figura) | componente F sin θ che interseca gli assi (coniche) | 191 |
| Π | piano generatore (p. 185–186) / piano ⊥ alla generatrice di contatto (p. 191); Π_n, Π_m piano normale | 185, 186, 188, 191 |

### Conflitti di notazione
1. **α/β per l'elica**: dispensa α = elica primitiva, β = elica di base; d095–d098 usano β come angolo d'elica primitivo;
   q26 usa α (come la dispensa); q27 usa β nel senso della dispensa ma senza dirlo; q23/q47 usano β per le linee di contatto
   (come la dispensa). d098 usa anche α_t per l'angolo di pressione (dispensa θ).
2. **Willis**: la dispensa mette al numeratore la ruota «di uscita» (ω₂ − Ω, o ω₃ − Ω); d089 inverte. d089 usa ω_p e τ₀.
3. **Coniche**: dispensa τ = ω₂/ω₁ = z₁/z₂, d099 |i| = ω₁/ω₂ = z₂/z₁; angoli dispensa θ, φ₁ — d100 α, δ.
4. **δ_e**: dispensa = lunghezza effettiva δ + CK; q23/q47 = solo b tg β.
5. **H**: dispensa H'' nel piano normale; q27 H nel piano trasversale.
6. **Modulo normale**: m_m (manoscritto) / m_n (battuto, q26, d095); libro p_n e ϑ_n vs manoscritto P_m e θm.
7. **R** indica, nella stessa sezione: raggio (R₁, R₂), raggio di curvatura della osculatrice (p. 188), raggio della
   traiettoria del veicolo (p. 177), componente radiale della forza (p. 189, 191).
8. Le coppie «C» (momenti) e il punto di contatto «C» (p. 189, 191; p. 187 punto C del rettangolo) usano la stessa lettera.

### Refusi della fonte (segnalati con NdT nella trascrizione)
- p. 179: $C_p = -C_1 + C_2$ → $-(C_1+C_2)$.
- p. 183: $\eta = -W_u/W_m > 0$ con W_m, W_u > 0 → deve essere < 0.
- p. 189: $|C| = |Q|R_1 = |F|\cos\theta_m\cos\alpha$ → manca il fattore R₁.
- p. 175: $R_3 = R_1 + 2R_2 = 3R_1$ presuppone R₂ = R₁ non dichiarato nel primo esempio.
