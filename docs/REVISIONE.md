# Revisione indipendente delle dimostrazioni (13/10/2026)

Campione: 31 dimostrazioni, scelte fra quelle con passi chiave, `correzione` NF o fonte deduzione/esterna (4–5 per capitolo).
Per ognuna ho confrontato pagine, righe, perché, `dispensaScrive` e distrattori con `tools/testi/cap*.md`. Ho ricontrollato con SymPy
i conti meno ovvi: limite e valori di d082, integrali di d053 e d037, τ_opt di d107, le due formule di d093, T_R di d130, la variante di d070
e la ω(t) di d104 (script in scratchpad, tutti verificati).
Dopo le correzioni sono verdi sia `vitest` (dimostrazioni + contenuti, 2199 test) sia `tools/verifica/run_all.py` (0 errori).

| Dimostrazione | Esito | Difetto | Correzione fatta |
|---|---|---|---|
| d007 CIR | **corretto** | d007.9 `perche` scritto fra apici semplici: `\v` diventava un carattere di controllo e `\p`, `\o` perdevano la barra; a schermo «$ec V_Bperp AB$ … $omega_1$» (LaTeX rotto) | stringa passata al tag `L` (`src/content/c1/velocita.ts`). Pagine 17–40 e NF-14 a posto |
| d010 posizione manovellismo | ok | — | — |
| d011 velocità pistone | ok | — | — |
| d012 accelerazione pistone | ok | — | — |
| d013 legge approssimata | ok | — | — |
| d015 Coriolis | **corretto (fonte)** | d015.8: «raddoppiando la portata Coriolis quadruplica» sta sotto fonte D p. 39, ma la dispensa non lo dice (la fisica è giusta) | aggiunto «(osservazione aggiunta: la dispensa non la scrive)». Refuso (B−D) di p. 38 riportato bene |
| d017 statica manovellismo | ok | NF-15 confermato: p. 49 ha `C₁ = (B−A)∧F₂,₁`; ho verificato b = r sin(θ+γ) | — |
| d028 attrito volvente | ok | NF-17 (u/h → u/R) riportato bene | — |
| d030 equazioni veicolo | ok | — | — |
| d032 trazione posteriore | **corretto** | d032.6: «con molto peso sull'anteriore le due possono anche coincidere» è riduttivo. Con l₁ piccolo la disuguaglianza si inverte e la trazione anteriore dà di più (NF-16) | testo corretto, con un esempio (l₁ = 1, l₂ = 2, h = 0,5, f = 1: rapporto 0,7). NF-16 e NF-124 confermati su pp. 91 e 101 |
| d037 cuscinetti | ok | NF-135 (1−cos 2x) e NF-127 confermati su p. 99 | — |
| d042 ceppi avvolgente/svolgente | ok | NF-18 confermato (pp. 109–110: nomi invertiti, conti giusti) | — |
| d044 pattino rigido | ok | ho rifatto il verso dei momenti: C_az = F_N x₀ + F_T h nel verso della figura. NF-142 confermato | — |
| d053 frizione conica | ok | (5.87) senza sin α e (5.88) corretta: confermato. Il fattore 2,12 di NF-19 è verificato | — |
| d065 angolo θ* | ok | NF-20 confermato (pp. 142 e 146) | — |
| d070 velocità ottima | ok | modello di D (T₂ fissata, p. 152) e variante esterna ben separati | — |
| d071 freno a nastro | **corretto** | d071.2: «il capo teso T₁ è quello verso cui l'attrito trascina il nastro» è sbagliato. Il tamburo trascina il nastro verso il capo **lasco**; il teso è quello che lo trattiene (con ω oraria, il capo al fulcro) | perché riscritto (`src/content/c4/freno-nastro.ts`). NF-21 e il 6,54 = e^{fβ} confermati |
| d082 numero minimo di denti | ok | NF-23 e NF-183 confermati: 14,16 → 15, 17,10 → 18 (e 5,13 e 5,84 di D) | — |
| d087 rotismo ordinario | ok | NF-24 confermato su p. 172 (entrambe le righe con τ invece di 1/τ) | — |
| d091 coppie epicicloidale | ok | refuso C_p = −C₁ + C₂ di p. 179 riportato bene | — |
| d093 rendimento epicicloidale (esterna) | ok | due formule e il caso 0,985 verificati; badge «fonte esterna» corretto | — |
| d104 avviamento, t_% | ok | NF-28 (logaritmo perso, K_m con segno) confermato su pp. 199–200 | — |
| d106 trasmissione con η | ok | riga di partenza di p. 201 incoerente (NF-28): confermato. Numeri E4/2 ricontrollati | — |
| d107 τ ottimo (deduzione) | ok | derivata, radice e caso C_u = 0 verificati con SymPy | — |
| d108 frizione in strisciamento | ok | f_att → f (p. 202) e equazioni di pp. 203–204 corrette | — |
| d115 equazione caratteristica | ok | NF-31 (i spuria, p. 211) confermato | — |
| d120 smorzamento critico | ok | NF-32 confermato su p. 213 | — |
| d123 complex replacement | ok | NF-34 e NF-243 (pp. 215, 217) confermati | — |
| d126 fase | ok | ramo +π (p. 221) e andamento con ξ (p. 216) corretti | — |
| d130 trasmissibilità | ok | NF-33 confermato su p. 220 (1+ρ², zone invertite, effetto di ξ oltre √2) | — |

Osservazioni (nessuna modifica):
- In d120.1 e d126/d123 alcune righe a fonte «D» riportano la forma già corretta (senza la i spuria). La correzione è dichiarata nei passi vicini (NF-31, NF-34).
- In d037.14 il perché parla di «QR sin φ» mentre la riga usa r per il raggio del perno: incoerenza di lettere, non un errore.
- Ho cercato in tutto il contenuto, oltre al campione, caratteri di controllo e sequenze `\t…`, `\n…`, `\r…` nate da LaTeX fra apici semplici: dopo la correzione di d007.9 non ce ne sono.
