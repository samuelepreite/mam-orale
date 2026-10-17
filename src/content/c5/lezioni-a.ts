/** Lezioni discorsive del capitolo C5, parte a (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

// ------------------------------------------------------------------ c5-ruote-dentate
const ruoteDentate: LezioneArgomento = {
  perche:
    "Pensa al cambio di una bicicletta o al riduttore di un trapano: un albero gira veloce con poca coppia, l'altro deve girare piano con tanta coppia. Per passare il moto da un albero all'altro la soluzione più semplice sono due ruote che si toccano. Ma se le ruote sono lisce, a un certo punto slittano. Se invece metti dei denti, la spinta passa da dente a dente e non slitta più. Resta però un problema sottile: i denti devono avere una forma tale che il rapporto fra le velocità resti **esattamente costante**, istante per istante. La domanda della lezione è: **che forma devono avere i denti perché il rapporto di trasmissione non cambi mai, e quanto vale?**",
  idea:
    "Comincia da due rulli premuti uno contro l'altro, come le ruote di una vecchia dinamo appoggiata allo pneumatico. Se non slittano, nel punto di contatto hanno la stessa velocità: il rullo piccolo deve fare più giri del grande. Il rapporto delle velocità angolari è quindi il rapporto dei raggi, con il segno meno perché girano in versi opposti. Il limite è l'aderenza: oltre una certa coppia i rulli slittano.\n\nCon i denti la coppia passa attraverso la spinta **normale** fra due superfici, che può essere grande quanto vuoi. Ma due denti, mentre si spingono, strisciano anche un po' uno sull'altro: le loro velocità nel contatto non sono uguali, solo le componenti lungo la normale lo sono. Da qui viene la regola chiave: il rapporto di trasmissione dipende solo da **dove la normale comune ai due denti taglia la retta dei centri**. Se quel punto, C, resta fermo, il rapporto è costante. Il profilo a evolvente fa di più: la normale comune è sempre la stessa retta. Il resto sono misure del dente: passo, modulo, numero di denti.",
  richiami: [
    { titolo: 'Velocità di un punto di un corpo che ruota', testo: "Se un corpo rigido ruota attorno a un centro fisso O con velocità angolare ω, ogni suo punto P si muove su una circonferenza attorno a O. La sua velocità è $\\omega \\wedge (P - O)$: perpendicolare al raggio OP e di modulo ω per la distanza OP. Più il punto è lontano dal centro, più va veloce, come il bordo di una giostra rispetto al suo centro." },
    { titolo: 'Prodotto vettoriale nel piano', testo: "Con $\\underline i$ a destra, $\\underline j$ in alto e $\\underline k$ uscente dal foglio vale $\\underline k \\wedge \\underline i = \\underline j$ e $\\underline k \\wedge \\underline j = -\\underline i$. Quindi $\\omega\\underline k \\wedge$ un vettore del piano lo ruota di 90° in senso antiorario e lo moltiplica per ω. Se il vettore cambia verso, cambia verso anche il risultato: da qui nascono molti segni meno." },
    { titolo: 'Centro di istantanea rotazione (C.I.R.)', testo: "In un moto piano rigido c'è sempre, istante per istante, un punto con velocità nulla: il C.I.R. Attorno a lui il corpo sembra soltanto ruotare, e le velocità degli altri punti sono perpendicolari alla congiungente con il C.I.R. e proporzionali alla distanza. Vale anche per il moto relativo di un corpo visto da un altro." },
    { titolo: 'Teorema delle forze vive (T.F.V.) in regime', testo: "La potenza di tutte le forze è uguale alla derivata dell'energia cinetica. In regime le velocità sono costanti, l'energia cinetica non cambia, quindi la somma delle potenze è zero. Se non ci sono perdite, la potenza che entra con la coppia motrice esce tutta con la coppia resistente: $C_1\\omega_1 + C_2\\omega_2 = 0$." },
    { titolo: 'Triangoli simili', testo: "Due triangoli con gli stessi angoli hanno la stessa forma, anche se sono di grandezza diversa. Allora i lati corrispondenti (omologhi) stanno tutti nello stesso rapporto. Per due triangoli rettangoli basta un angolo acuto uguale: per esempio due angoli opposti al vertice, che sono sempre uguali." },
  ],
  ipotesiPerche: [
    "Fissiamo i protagonisti: due ruote che girano attorno a centri fermi. Il verso positivo comune per le ω serve a dare un segno al rapporto di trasmissione, che così dice anche se le ruote girano in versi opposti.",
    "Per le ruote di frizione la coppia passa solo per attrito: finché la forza tangente non supera $f F_N$ le ruote non slittano, e solo allora le velocità in C sono uguali.",
    "Due denti non possono entrare uno nell'altro né staccarsi mentre si spingono: lungo la normale vanno alla stessa velocità. Lungo la tangente invece possono strisciare, ed è proprio questo che li distingue dai rulli.",
    "L'evolvente è il profilo che rende fissa la normale comune; lo stesso modulo è la condizione perché i denti di una ruota entrino nei vani dell'altra.",
    "Servono solo quando leghiamo il rapporto alle coppie: senza perdite la potenza entrante è uguale a quella uscente, e la forza fra i denti è tutta lungo la normale.",
  ],
  disegnoGuida:
    "Traccia una retta orizzontale, l'interasse, con i due centri: $O_1$ a sinistra e $O_2$ a destra. Disegna le due circonferenze primitive, tratteggiate, che si toccano nel punto C sull'interasse: C è il punto che comanda tutto. Dentro ciascuna disegna la circonferenza fondamentale, un po' più piccola. Poi traccia la retta di pressione: passa per C ed è tangente alle due fondamentali, in $H_1$ e $H_2$; segna gli angoli retti fra i raggi $O_1H_1$, $O_2H_2$ e la retta. L'angolo fra la retta e la verticale per C è θ, l'angolo di pressione: si ritrova anche in $O_1$ e in $O_2$. Segna su questa retta un punto di contatto P, diverso da C. Infine i versi: $\\omega_1$ e $\\omega_2$ opposti. I triangoli $O_1H_1C$ e $O_2H_2C$ sono quelli dei triangoli simili.",
  mappa: [
    'Ruote di frizione: stessa velocità in C, rapporto uguale a meno il rapporto dei raggi, ma coppia limitata dall\'aderenza.',
    'Due denti qualsiasi: solo le velocità lungo la normale sono uguali, e il rapporto dipende da dove la normale taglia l\'interasse.',
    'Legge dell\'ingranamento: rapporto costante se e solo se quel punto C è fisso; fuori da C i denti strisciano.',
    'Evolvente: la normale comune è sempre la stessa retta, quindi C è fisso.',
    'Le misure del dente: passo, modulo, raggi, interasse.',
    'Il rapporto scritto con i numeri di denti.',
  ],
  dims: {
    d072: {
      introduzione:
        "Partiamo dal caso più semplice: due rulli lisci che rotolano senza slittare. La strategia è scrivere la velocità del punto di contatto C due volte, come punto della prima ruota e come punto della seconda, e uguagliarle. Poi ritroviamo lo stesso rapporto con le potenze e chiudiamo con il limite che l'aderenza impone alla coppia.",
      riepilogo:
        "Abbiamo scritto la velocità di C come punto di ciascuna ruota e, siccome le ruote non slittano, le abbiamo uguagliate: il rapporto di trasmissione è meno il rapporto dei raggi, negativo perché le ruote girano in versi opposti. Il bilancio delle potenze dà lo stesso numero con le coppie, che stanno come i raggi. Ma la coppia passa solo per aderenza, e non può superare $f F_N R$: è il motivo per cui si passa alle ruote dentate.",
    },
    d073: {
      introduzione:
        "Ora i denti hanno una forma qualsiasi e nel contatto possono strisciare. Non possiamo più uguagliare le velocità intere: uguagliamo solo le componenti lungo la normale comune. La strategia è tradurre questa uguaglianza in lunghezze del disegno e poi usare due triangoli simili per arrivare a un rapporto di segmenti sull'interasse.",
      riepilogo:
        "Le velocità dei due punti a contatto sono perpendicolari ai rispettivi raggi e proporzionali alla distanza dal centro. Imponendo che le componenti lungo la normale siano uguali, il rapporto delle ω è diventato il rapporto delle distanze dei centri dalla normale, $O_1H_1$ e $O_2H_2$. I triangoli simili con vertice in C lo hanno trasformato nel rapporto $O_1C/O_2C$: tutto dipende da dove la normale taglia l'interasse.",
    },
    d074: {
      introduzione:
        "Abbiamo appena visto che il rapporto dipende dal punto C. Adesso tiriamo la conseguenza: quando è costante? E che cosa succede nel contatto quando P non coincide con C? La strategia è leggere la formula dei triangoli simili, classificare i tipi di contatto e scrivere la velocità relativa dei denti spezzando ogni raggio in due pezzi che passano per C.",
      riepilogo:
        "Il rapporto di trasmissione è costante se e solo se la normale comune passa sempre per lo stesso punto C dell'interasse: è la legge fondamentale dell'ingranamento. In C le due ruote rotolano; altrove i denti strisciano. La velocità di strisciamento è una rotazione relativa attorno a C, $(\\omega_2 - \\omega_1)$ per la distanza PC: è nulla in C e cresce allontanandosi, quindi conviene che il contatto resti vicino a C.",
    },
    d075: {
      introduzione:
        "Serve un profilo che rispetti la legge dell'ingranamento. La strategia è costruire l'evolvente con una retta che rotola su una circonferenza, scoprire che quella retta è sempre normale al profilo, e poi mettere due ruote in presa: la normale comune diventa la tangente comune alle due fondamentali, una retta che non si muove mai.",
      riepilogo:
        "L'evolvente è tracciata da un punto di una retta che rotola sulla fondamentale, e la retta stessa è la normale al profilo. Con due ruote, la normale comune deve essere tangente a tutte e due le fondamentali: è la retta di pressione, fissa, che taglia l'interasse sempre in C. Il rapporto vale meno il rapporto dei raggi fondamentali, sia con le coppie sia con i triangoli simili, e non cambia nemmeno se l'interasse è un po' sbagliato.",
    },
    d076: {
      introduzione:
        "Ora diamo le misure ai denti. La strategia è partire dalla definizione di passo, l'arco fra due denti consecutivi sulla primitiva, contare quanti passi stanno in un giro, e poi introdurre il modulo per togliere il π dai conti. Con il modulo si fissano anche altezza del dente e raggi di testa e di fondo.",
      riepilogo:
        "Z passi riempiono la circonferenza primitiva, e due ruote ingranano solo se hanno lo stesso passo. Dividendo il passo per π si ottiene il modulo, un numero comodo, e il diametro primitivo diventa modulo per numero di denti. Il proporzionamento modulare fissa addendum e dedendum in funzione del modulo, da cui i raggi di testa e di fondo; con pochi denti il fondo scende sotto la fondamentale.",
    },
    d077: {
      introduzione:
        "Quanto devono distare i centri di due ruote dentate? La strategia è ragionare sulle primitive, che si toccano in C, e poi sostituire i raggi con modulo e numeri di denti. Alla fine vediamo il caso inverso, utile negli esercizi, e la variante con la corona a dentatura interna.",
      riepilogo:
        "Le primitive sono tangenti in C, quindi l'interasse è la somma dei raggi primitivi. Con lo stesso modulo ogni raggio vale $mz/2$, e l'interasse diventa metà modulo per la somma dei denti: non è libero. Al contrario, dati interasse e rapporto, i raggi sono fissati. Con una corona interna le primitive si toccano dall'interno e l'interasse è la differenza dei raggi.",
    },
    d078: {
      introduzione:
        "Chiudiamo il cerchio: scriviamo il rapporto di trasmissione con le grandezze che si contano davvero, i denti. La strategia è partire dall'equivalenza con le ruote di frizione, passare per le fondamentali e sostituire i raggi con $mz/2$. Poi guardiamo i due casi speciali: la corona interna e la dentiera.",
      riepilogo:
        "Due ruote dentate si comportano come rulli con i raggi primitivi, quindi il rapporto è meno il rapporto dei raggi, uguale a quello dei raggi fondamentali. Con lo stesso modulo i raggi stanno come i denti: $\\tau = -z_1/z_2$, un rapporto di interi, esattamente costante. Con la corona interna il segno diventa positivo; con la dentiera il raggio va all'infinito e il rapporto va a zero.",
    },
  },
  passi: {
    'd072.1': {
      tappa: 0,
      prima: "Guarda il punto C dove i rulli si toccano. Pensalo prima come un punto del rullo 1. Il centro $O_1$ è fermo, quindi la velocità di C viene solo dalla rotazione attorno a $O_1$. Chiediti: che vettore va da $O_1$ a C? Nel disegno C è a destra di $O_1$, alla distanza $R_1$. Moltiplica vettorialmente $\\omega_1\\underline k$ per quel vettore.",
      dopo: "La riga dice che C, come punto del rullo 1, va verso l'alto con velocità $\\omega_1 R_1$. Controllo: con $\\omega_1$ positiva (antioraria) il punto più a destra di una ruota sale davvero. Il modulo è la classica velocità periferica, raggio per velocità angolare.",
    },
    'd072.2': {
      tappa: 0,
      prima: "Ripeti lo stesso conto pensando C come punto del rullo 2. Anche $O_2$ è fermo. La differenza è la posizione: C sta a **sinistra** di $O_2$. Che vettore è $C - O_2$? E che cosa succede al prodotto vettoriale quando il vettore punta nel verso opposto?",
      dopo: "C, come punto del rullo 2, ha velocità $-\\omega_2 R_2$ lungo $\\underline j$. Il segno meno viene solo dal fatto che C sta dall'altra parte del centro. Controllo: con $\\omega_2$ positiva il punto più a sinistra di una ruota scende, ed è proprio quello che dice la riga.",
    },
    'd072.3': {
      tappa: 0,
      prima: "Ora usiamo l'ipotesi fisica: finché la forza tangente non supera $f F_N$ i rulli non slittano. Che cosa vuol dire, in termini di velocità, «non slittare» nel punto C? Vuol dire che i due punti a contatto si muovono insieme, cioè la velocità relativa è nulla. Uguaglia le due velocità appena scritte.",
      dopo: "La riga dice che le velocità periferiche sono uguali, con un segno meno davanti a $\\omega_2$. Il meno significa che le due ω hanno segno opposto: le ruote girano in versi contrari, come sai dagli ingranaggi. C, dove la velocità relativa è nulla, è il C.I.R. del moto relativo fra i due rulli.",
    },
    'd072.4': {
      tappa: 0,
      prima: "Il rapporto di trasmissione, nella dispensa, è la velocità angolare d'uscita diviso quella d'entrata: $\\tau = \\omega_2/\\omega_1$. Ricavalo dalla riga precedente dividendo entrambi i membri per $\\omega_1 R_2$. Attento a portare dietro il segno.",
      dopo: "Il rapporto è meno il raggio della motrice diviso il raggio della condotta. È negativo perché i versi sono opposti. È costante perché i raggi non cambiano: non dipende dalla posizione né dalla potenza. Controllo: se il rullo 2 è il doppio dell'1, gira a metà velocità, $|\\tau| = 1/2$.",
    },
    'd072.5': {
      tappa: 0,
      prima: "Guardiamo lo stesso moto da un osservatore seduto sul rullo 1. Per lui il rullo 2 ruota con velocità angolare relativa $\\omega_2 - \\omega_1$, e il punto C ha velocità relativa nulla. Usa la formula dei moti rigidi partendo da C per trovare la velocità relativa del centro $O_2$, poi sostituisci $\\omega_2 R_2 = -\\omega_1 R_1$.",
      dopo: "Visto dal rullo 1, il centro $O_2$ gira attorno a C con velocità $\\omega_1(R_1 + R_2)$. Controllo: i raggi si **sommano** perché $O_2$ dista da $O_1$ proprio $R_1 + R_2$; per l'osservatore solidale a 1, il rullo 2 gli rotola attorno, come una moneta che rotola attorno a un'altra.",
    },
    'd072.6': {
      tappa: 0,
      prima: "Ritroviamo il rapporto in un altro modo, con le potenze. In regime le velocità non cambiano, quindi l'energia cinetica è costante. Senza perdite, che cosa dice il teorema delle forze vive sulla somma delle potenze delle due coppie? Poi dividi per $C_{2z}\\omega_{1z}$ per far comparire il rapporto delle ω.",
      dopo: "La potenza che entra con $C_1$ esce tutta con $C_2$: una è positiva, l'altra negativa. Il rapporto delle velocità è meno il rapporto delle coppie, ma **rovesciato**: la coppia della motrice sta al numeratore. È il motivo per cui un riduttore di giri è un moltiplicatore di coppia.",
    },
    'd072.7': {
      tappa: 0,
      prima: "Abbiamo due espressioni dello stesso τ: una con i raggi, una con le coppie. Mettile uguali. Chiediti anche: c'è un modo più diretto per vedere il risultato? Sì: la stessa forza tangente $F_t$ agisce su tutte e due le ruote, con braccio $R_1$ su una e $R_2$ sull'altra.",
      dopo: "Le coppie stanno come i raggi e hanno lo stesso segno lungo $\\underline k$. Controllo con le mani: sulla ruota grande la stessa spinta ha un braccio più lungo, quindi fa più coppia. Il segno positivo torna perché la motrice ha la coppia nel suo verso di moto, la condotta contro il suo, e i versi di moto sono opposti.",
    },
    'd072.8': {
      tappa: 0,
      prima: "Quanta coppia possono passarsi i rulli? Guarda l'equilibrio alla rotazione della ruota 1: la coppia motrice è bilanciata solo dalla forza tangente nel contatto, con braccio $R_1$. Ma quella forza è d'aderenza: secondo Coulomb non può superare f volte la forza che preme le ruote.",
      dopo: "La coppia massima è $f F_N R$: oltre, i rulli slittano e il rapporto non è più garantito. Per trasmettere tanta coppia servirebbe premere fortissimo, caricando alberi e cuscinetti. Per questo si passa ai denti: la coppia la porta la forza normale fra i denti, che non ha questo limite.",
    },
    'd073.1': {
      tappa: 1,
      prima: "Ora i due corpi hanno forma qualsiasi e si toccano in P. Distinguiamo $P_1$, il punto del corpo 1, e $P_2$, quello del corpo 2: occupano lo stesso posto ma appartengono a corpi diversi. Per ciascuno, il centro è fisso: che direzione e che modulo ha la velocità di un punto che ruota attorno a un centro fermo?",
      dopo: "Ciascuna velocità è perpendicolare al proprio raggio e vale ω per la distanza dal centro. Attenzione: le due velocità in generale non sono uguali né parallele, perché $O_1P$ e $O_2P$ hanno direzioni diverse. È la differenza fondamentale rispetto ai rulli.",
    },
    'd073.2': {
      tappa: 1,
      prima: "Che cosa possiamo imporre fra le due velocità? Pensa a due dita che si spingono: lungo la direzione in cui si premono devono andare insieme, altrimenti una entrerebbe nell'altra o si staccherebbe. Lungo la superficie, invece, possono scivolare. Quindi uguagliamo solo le proiezioni sulla normale comune n. Chiama $\\alpha_i$ l'angolo fra ciascuna velocità e la normale.",
      dopo: "Le componenti normali sono uguali, ognuna è modulo per coseno del suo angolo. Le componenti tangenti possono essere diverse: la loro differenza è lo strisciamento. Controllo: se le velocità fossero uguali per intero saremmo nel caso dei rulli, il rotolamento puro.",
    },
    'd073.3': {
      tappa: 1,
      prima: "Abbiamo due relazioni: i moduli delle velocità in funzione delle ω e l'uguaglianza delle componenti normali. Vogliamo un rapporto di velocità angolari. Sostituisci $|V_i| = |\\omega_i|\\,\\overline{O_iP_i}$ nella seconda e porta le ω da una parte e le lunghezze dall'altra.",
      dopo: "Il rapporto delle ω è un rapporto di lunghezze moltiplicate per coseni. È ancora poco leggibile: compaiono distanze dal punto di contatto e angoli che cambiano con P. Il prossimo passo trova un significato geometrico per ciascun prodotto.",
    },
    'd073.4': {
      tappa: 1,
      prima: "Che cos'è geometricamente $\\overline{O_1P_1}\\cos\\alpha_1$? Abbassa da $O_1$ la perpendicolare alla normale comune: il piede è $H_1$. Nel triangolo rettangolo $O_1H_1P_1$ l'angolo in $P_1$ è proprio $\\alpha_1$, perché ha i lati perpendicolari a quelli dell'angolo fra $V_1$ e n. Il cateto vicino a quell'angolo è…",
      dopo: "Il rapporto delle ω è il rapporto delle distanze dei centri dalla normale comune. Controllo: la ruota il cui centro è più vicino alla normale ha il braccio più corto e deve girare più veloce, per dare la stessa componente normale. Nella formula $|\\omega_2|$ cresce se $O_2H_2$ cala: torna.",
    },
    'd073.5': {
      tappa: 1,
      prima: "Ora prolunga la normale fino a tagliare l'interasse: chiama C quel punto. Guarda i due triangoli $O_1H_1C$ e $O_2H_2C$. Sono rettangoli in $H_1$ e $H_2$. Gli angoli in C sono opposti al vertice, quindi uguali. Che cosa sai dire allora dei loro lati?",
      dopo: "I due triangoli sono simili, quindi i cateti $O_1H_1$ e $O_2H_2$ stanno come le ipotenuse $O_1C$ e $O_2C$. Abbiamo tolto dal rapporto il punto P e gli angoli: resta solo la posizione di C sull'interasse.",
    },
    'd073.6': {
      tappa: 1,
      prima: "Unisci le due ultime righe: il rapporto delle ω, in modulo, è $O_1C/O_2C$. Resta il segno. Un rapporto di lunghezze è sempre positivo, quindi dà solo il modulo. Chiediti: se C cade fra i due centri, come girano le ruote, nello stesso verso o in versi opposti?",
      dopo: "Con C fra i centri, come nelle ruote esterne, le ruote girano in versi opposti e τ è negativo. Se la normale passa sempre per il punto di tangenza delle primitive, $O_1C = R_1$ e $O_2C = R_2$: ritroviamo $-R_1/R_2$, come per i rulli. La dispensa scrive qui il rapporto dei segmenti uguale a τ senza segno: il segno va aggiunto.",
    },
    'd074.1': {
      tappa: 2,
      prima: "Riprendiamo il risultato appena ottenuto, perché è il punto di partenza della legge. Ricorda cosa dice: per due profili qualsiasi, in un certo istante, il rapporto di trasmissione dipende solo da come la normale comune divide l'interasse.",
      dopo: "La riga è il risultato dei triangoli simili, con il segno delle ruote esterne. Nota che non compaiono né il punto di contatto né la forma dei denti: tutto passa attraverso il punto C.",
    },
    'd074.2': {
      tappa: 2,
      prima: "Mentre le ruote girano, il punto di contatto P si sposta e la normale comune può cambiare. I centri $O_1$ e $O_2$ invece sono fermi, quindi l'interasse è fisso. Chiediti: il rapporto $O_1C/O_2C$ può restare costante se C si muove lungo l'interasse?",
      dopo: "No: se C si sposta verso $O_1$, $O_1C$ cala e $O_2C$ cresce. Quindi τ è costante se e solo se C è fermo: la normale comune deve passare sempre per lo stesso punto dell'interasse. È la legge fondamentale dell'ingranamento. C è il punto in cui le primitive rotolano, cioè il C.I.R. del moto relativo.",
    },
    'd074.3': {
      tappa: 2,
      prima: "Prima di calcolare la velocità relativa, facciamo ordine sui modi in cui due corpi possono toccarsi. Scomponi la velocità relativa in una parte lungo la normale e una lungo la tangente. Quali combinazioni sono possibili, e quale si ha in C e quale negli altri punti?",
      dopo: "In C sono nulle entrambe le componenti: rotolamento puro. Negli altri punti la normale è nulla (i denti non entrano uno nell'altro) ma la tangente no: strisciamento. Se fosse diversa da zero anche la normale avremmo un urto, che in un buon ingranaggio non deve esserci.",
    },
    'd074.4': {
      tappa: 2,
      prima: "Calcoliamo la velocità del dente 2 rispetto al dente 1 nel contatto: differenza delle due velocità assolute. Ciascuna è $\\omega_i \\wedge (P - O_i)$. Il trucco è far comparire C: aggiungi e togli C dentro ogni parentesi, così $P - O_i$ diventa $(P - C) + (C - O_i)$, e distribuisci il prodotto vettoriale.",
      dopo: "Abbiamo quattro termini: due con $P - C$ e due con $C - O_i$. Non è cambiato nulla, abbiamo solo spezzato ogni raggio in due tratti che passano per C. Il vantaggio si vede subito: i termini con $C - O_i$ hanno un significato fisico preciso.",
    },
    'd074.5': {
      tappa: 2,
      prima: "Guarda i termini $\\omega_2 \\wedge (C - O_2)$ e $\\omega_1 \\wedge (C - O_1)$. Sono le velocità del punto C pensato come punto della ruota 2 e della ruota 1. Che cosa sappiamo di C? È il punto di rotolamento puro, dove le due ruote vanno alla stessa velocità. Allora questi due termini…",
      dopo: "Si elidono, e resta una rotazione relativa con velocità angolare $\\omega_2 - \\omega_1$ attorno a C. È esattamente quello che ti aspetti dal C.I.R. del moto relativo: visto dalla ruota 1, il dente 2 ruota attorno a C. Controllo: se P coincide con C la velocità relativa è nulla.",
    },
    'd074.6': {
      tappa: 2,
      prima: "Vogliamo il modulo della velocità di strisciamento. $\\omega_2 - \\omega_1$ è un vettore lungo $\\underline k$, perpendicolare al piano, e $P - C$ sta nel piano. Quanto vale il modulo del prodotto vettoriale fra due vettori perpendicolari?",
      dopo: "Lo strisciamento è proporzionale alla distanza del contatto da C. Lo strisciamento genera attrito e quindi perdite e usura: conviene che il contatto avvenga sempre vicino a C. Con ruote esterne le ω hanno versi opposti e $|\\omega_2 - \\omega_1|$ è la somma dei moduli.",
    },
    'd075.1': {
      tappa: 3,
      prima: "Costruiamo l'evolvente. Immagina un filo avvolto su un rocchetto, la circonferenza fondamentale di raggio $R_f$: tieni teso il filo e srotolalo. La punta del filo traccia l'evolvente. Detto meglio: una retta rotola senza strisciare sulla fondamentale e un pennino attaccato alla retta, partito da H, disegna la curva. Che relazione c'è fra il tratto di retta svolto e l'arco percorso?",
      dopo: "Il segmento PQ, dal pennino al punto di tangenza, è lungo quanto l'arco HQ, cioè $R_f\\gamma$. È la proprietà del rotolamento senza strisciare: quanto filo si srotola, tanto arco si scopre. Controllo: all'inizio γ = 0, PQ = 0 e il pennino sta in H, sulla fondamentale.",
    },
    'd075.2': {
      tappa: 3,
      prima: "Qual è la normale all'evolvente in P? Pensa alla retta generatrice mentre rotola: in quell'istante tocca la fondamentale in Q, e il punto Q della retta è fermo. Quindi Q è il C.I.R. della retta. Come è diretta la velocità di un punto, rispetto alla congiungente con il C.I.R.?",
      dopo: "La velocità del pennino è perpendicolare a QP, e la velocità è tangente alla curva che il pennino traccia. Quindi la normale all'evolvente in P è proprio la retta generatrice, tangente alla fondamentale in Q. Attenzione: ogni punto dell'evolvente ha la sua Q, quindi le normali di una sola evolvente non passano tutte per un punto.",
    },
    'd075.3': {
      tappa: 3,
      prima: "Ora mettiamo in presa due ruote a evolvente. Nel contatto P i due profili hanno la stessa normale. Per la proprietà appena trovata, la normale al profilo 1 è tangente alla fondamentale 1, e la normale al profilo 2 è tangente alla fondamentale 2. Quante rette sono tangenti a tutte e due le circonferenze e passano fra i centri?",
      dopo: "Una sola: la tangente comune $H_1H_2$. Quindi la normale comune è sempre la stessa retta, qualunque sia la posizione delle ruote, e P scorre lungo di essa. Il suo incrocio con l'interasse, C, è fermo: la legge dell'ingranamento è rispettata. Questa retta è la retta di pressione, la direzione della forza fra i denti.",
    },
    'd075.4': {
      tappa: 3,
      prima: "Leghiamo il raggio fondamentale a quello primitivo. Guarda il triangolo $O_1H_1C$: è rettangolo in $H_1$, l'ipotenusa $O_1C$ è il raggio primitivo $R_1$. L'angolo in $O_1$ è θ, perché ha i lati perpendicolari a quelli dell'angolo fra la retta di pressione e la verticale per C. Il raggio fondamentale è il cateto adiacente a θ.",
      dopo: "Il raggio fondamentale è il primitivo per cos θ, con lo stesso θ per le due ruote. Controllo: cos θ è minore di 1, quindi la fondamentale sta dentro la primitiva, come nel disegno. Con θ = 20° la fondamentale è circa il 94% della primitiva.",
    },
    'd075.5': {
      tappa: 3,
      prima: "Ricaviamo il rapporto con le forze. Se il contatto è liscio la forza fra i denti sta sulla retta di pressione. Scrivi l'equilibrio alla rotazione di ciascuna ruota attorno al suo centro: qual è il braccio di una forza diretta lungo la retta di pressione rispetto a $O_1$? Poi usa il bilancio delle potenze in regime.",
      dopo: "Ogni coppia è la stessa forza per il raggio fondamentale della sua ruota, e il bilancio delle potenze dà $\\tau = -R_{f1}/R_{f2}$. È un rapporto di grandezze della ruota tagliata, che non cambiano mai. Il cos θ non compare: si semplificherebbe comunque, perché è uguale per le due ruote.",
    },
    'd075.6': {
      tappa: 3,
      prima: "Controlliamo con la cinematica, cioè con i triangoli simili. Il rapporto è $-O_1C/O_2C$. Nei triangoli rettangoli $O_iH_iC$ le ipotenuse $O_iC$ si ottengono dividendo il cateto $R_{fi}$ per cos θ. Sostituisci e semplifica.",
      dopo: "Si ottiene lo stesso risultato della dinamica: $-R_{f1}/R_{f2}$, che è anche $-R_1/R_2$. Due strade diverse, una con le forze e una con le velocità, danno lo stesso numero: è un buon segno che il ragionamento è coerente.",
    },
    'd075.7': {
      tappa: 3,
      prima: "Cosa succede se monti le ruote con i centri un po' più lontani, per un errore o per usura? Chiediti che cosa appartiene davvero alla ruota: le fondamentali, perché sono quelle su cui è stata generata l'evolvente. La tangente comune però si inclina diversamente. Scrivi il nuovo angolo di pressione con l'interasse $i'$ e i nuovi raggi primitivi.",
      dopo: "Cambiano l'angolo di pressione e i primitivi, ma i primitivi crescono nella stessa proporzione: il loro rapporto resta $R_{f1}/R_{f2}$. Il rapporto di trasmissione non cambia. È un grande pregio dell'evolvente: gli errori d'interasse non disturbano il moto.",
    },
    'd076.1': {
      tappa: 4,
      prima: "Definiamo il passo p: l'arco della primitiva fra un dente e quello successivo, misurato fra due fianchi corrispondenti. Una ruota ha z denti tutti uguali. Quanti passi servono per fare un giro intero della primitiva?",
      dopo: "Z passi fanno tutta la circonferenza primitiva: $p z = 2\\pi R$. È una semplice divisione della circonferenza in parti uguali, come le fette di una torta misurate sul bordo.",
    },
    'd076.2': {
      tappa: 4,
      prima: "Quale condizione serve perché due ruote possano ingranare? Pensa a una cerniera lampo: i dentini di un lato entrano nei vuoti dell'altro solo se sono distanziati allo stesso modo. Le primitive rotolano senza strisciare: mentre la ruota 1 avanza di un passo sulla primitiva, anche la 2 deve avanzare di un suo passo.",
      dopo: "I passi devono essere uguali. Il numero di denti invece può essere diverso, anzi deve esserlo se vogliamo un rapporto diverso da $-1$. La riga sembra banale, ma è la condizione che lega tutte le misure delle due ruote.",
    },
    'd076.3': {
      tappa: 4,
      prima: "Il passo ha un difetto pratico: è un arco, e quindi contiene sempre π. Un numero con π non si può scegliere «tondo». Come lo togliamo? Definiamo una nuova grandezza dividendo il passo per π.",
      dopo: "Il modulo m è il passo diviso π. Si sceglie fra valori unificati e razionali (1, 1,25, 1,5, 2…). Uguale passo vuol dire uguale modulo: due ruote ingranano se hanno lo stesso modulo.",
    },
    'd076.4': {
      tappa: 4,
      prima: "Mettiamo insieme le due definizioni: $pz = 2\\pi R$ dice quanti passi stanno in un giro, $p = \\pi m$ dice che cos'è il modulo. Vogliamo il raggio primitivo scritto con m e z. Sostituisci la seconda nella prima e guarda che cosa succede al π.",
      dopo: "Il π si semplifica: il diametro primitivo è modulo per numero di denti. Controllo con un esempio: modulo 2 e 30 denti danno un diametro di 60 mm, raggio 30 mm. Ruote con lo stesso modulo hanno raggi proporzionali ai denti.",
    },
    'd076.5': {
      tappa: 4,
      prima: "Quanto deve essere alto il dente? La dispensa usa il proporzionamento modulare, che misura tutto in moduli. La parte sopra la primitiva, l'addendum a, vale un modulo. La parte sotto, il dedendum d, deve essere un po' più grande. Perché? Perché la testa del dente dell'altra ruota non deve toccare il fondo del vano.",
      dopo: "L'altezza totale è nove quarti di modulo. Il quarto in più del dedendum è il gioco di fondo. Il dente non può essere molto più alto: la testa arriverebbe a lavorare dove l'altro profilo non è più un'evolvente, e nascerebbe l'interferenza.",
    },
    'd076.6': {
      tappa: 4,
      prima: "Ricaviamo i due raggi che si misurano davvero sul pezzo: quello di testa, fino alla punta dei denti, e quello di fondo, alla base dei vani. Parti dal raggio primitivo $mz/2$: aggiungi l'addendum per la testa, togli il dedendum per il fondo, e raccogli $m/2$.",
      dopo: "Il raggio di testa è $m(z+2)/2$ e quello di fondo $m(z-2{,}5)/2$. Controllo: il diametro di testa supera il primitivo di 2 moduli, quello di fondo è più piccolo di 2,5 moduli. Questo passo non è scritto nella dispensa: è una conseguenza diretta delle sue definizioni.",
    },
    'd076.7': {
      tappa: 4,
      prima: "La dispensa nota che il fondo può stare sotto la fondamentale. Quando succede? Confronta il raggio di fondo $R - \\frac54 m$ con il raggio fondamentale $R\\cos\\theta$, sostituisci $R = mz/2$ e cerca il numero di denti per cui i due raggi sono uguali.",
      dopo: "Sotto circa 41 denti, con θ = 20°, il fondo è dentro la fondamentale. Lì il fianco non può essere un'evolvente, perché l'evolvente nasce sulla fondamentale: quel tratto non trasmette forza. È il primo segnale del problema dell'interferenza, che vedrai nel prossimo argomento.",
    },
    'd077.1': {
      tappa: 4,
      prima: "Le due primitive si toccano esternamente nel punto C, che sta sull'interasse, perché è lì che rotolano una sull'altra. Chiediti: se appoggi due monete sul tavolo in modo che si tocchino sul bordo, quanto distano i loro centri?",
      dopo: "La distanza dei centri è la somma dei raggi primitivi. È il montaggio nominale: le primitive sono tangenti e rotolano una sull'altra, come i rulli delle ruote di frizione.",
    },
    'd077.2': {
      tappa: 4,
      prima: "Per sostituire i raggi ci serve la formula del raggio primitivo. Ricorda la condizione per ingranare: stesso passo, cioè stesso modulo. Allora che modulo usiamo per la ruota 1 e per la ruota 2?",
      dopo: "Ogni raggio primitivo è $mz/2$ con lo **stesso** m. Se i moduli fossero diversi, i denti non entrerebbero nei vani dell'altra ruota. Controllo: la ruota con più denti ha il raggio più grande, in proporzione.",
    },
    'd077.3': {
      tappa: 4,
      prima: "Abbiamo tutto: l'interasse come somma dei raggi e ciascun raggio scritto con modulo e denti. Vogliamo un interasse che dipenda solo da grandezze che si scelgono a progetto. Sostituisci le due espressioni dei raggi nella somma $R_1 + R_2$ e raccogli il fattore comune $m/2$.",
      dopo: "L'interasse è metà modulo per la somma dei denti. Conseguenza pratica: scelto il modulo e i denti, l'interasse è obbligato. Esempio: modulo 2, 20 e 40 denti danno un interasse di 60 mm. Questa forma esplicita non è nella dispensa, ma segue subito dalle sue formule.",
    },
    'd077.4': {
      tappa: 4,
      prima: "Negli esercizi capita il problema inverso: ti danno interasse e rapporto e devi trovare i raggi. Hai due incognite e due equazioni: la somma dei raggi è i, e il rapporto fra i raggi è $|\\tau|$. Scrivi $R_1 = |\\tau| R_2$, sostituisci nella somma e ricava $R_2$.",
      dopo: "Il raggio della condotta è l'interasse diviso $(1 + |\\tau|)$, quello della motrice è $|\\tau|$ volte tanto. Controllo: con $|\\tau| = 1$ le ruote sono uguali e ciascuna ha raggio metà interasse.",
    },
    'd077.5': {
      tappa: 4,
      prima: "Se la ruota 1 è una corona con i denti all'interno, la ruota piccola le sta dentro. Le primitive si toccano ancora in C, ma dall'interno. Dove stanno i due centri rispetto a C? Dalla stessa parte. Allora la distanza fra i centri è somma o differenza dei raggi?",
      dopo: "È la differenza: $m(z_1 - z_2)/2$. Controllo: una pallina dentro un anello, che tocca il bordo, ha il centro a una distanza pari alla differenza dei raggi dal centro dell'anello. Le corone permettono trasmissioni molto compatte.",
    },
    'd078.1': {
      tappa: 5,
      prima: "Il punto di partenza è che, per la cinematica, due ruote dentate a evolvente si comportano come due rulli con i raggi primitivi. Perché? Perché in C le primitive rotolano senza strisciare, esattamente come i rulli di frizione.",
      dopo: "Il rapporto è meno il rapporto dei raggi primitivi, con $R_i = O_iC$. I denti servono a trasmettere coppia senza slittare; il rapporto di velocità resta quello dei rulli equivalenti.",
    },
    'd078.2': {
      tappa: 5,
      prima: "Possiamo scrivere lo stesso rapporto con i raggi fondamentali. Ricorda che ogni raggio fondamentale è il primitivo per cos θ, e che l'angolo di pressione è lo stesso per le due ruote in presa. Che cosa succede al rapporto?",
      dopo: "Il cos θ compare sopra e sotto e si semplifica: il rapporto dei primitivi è uguale a quello dei fondamentali. È coerente con quanto trovato con le forze per l'evolvente.",
    },
    'd078.3': {
      tappa: 5,
      prima: "I raggi non si contano, i denti sì. Le due ruote hanno lo stesso modulo, quindi ogni raggio primitivo è $mz/2$. Sostituisci nel rapporto e guarda che cosa si semplifica.",
      dopo: "Si semplificano m e 1/2: il rapporto è meno il numero di denti della motrice diviso quello della condotta. È un rapporto di numeri interi, quindi esattamente costante. A p. 163 la dispensa perde il segno meno: per ruote esterne il segno c'è, perché girano in versi opposti.",
    },
    'd078.4': {
      tappa: 5,
      prima: "Con una corona a dentatura interna la ruota piccola gira dentro la grande. Nel punto C le due velocità periferiche sono uguali, ma ora i due centri stanno dalla stessa parte di C. Ripensa al conto dei rulli: il segno meno nasceva dal fatto che C stava a destra di un centro e a sinistra dell'altro.",
      dopo: "Senza quell'inversione le velocità periferiche concordi danno ω concordi: τ è positivo, $+z_1/z_2$. Controllo pratico: in una corona dentata la ruota interna gira nello stesso verso della corona.",
    },
    'd078.5': {
      tappa: 5,
      prima: "Qual è l'ingranaggio con τ = 0? Fai crescere il raggio della ruota 2 senza limite. La sua primitiva si appiattisce sempre di più, fino a diventare una retta: è una dentiera. Che cosa succede al rapporto $-R_1/R_2$ quando $R_2$ va all'infinito?",
      dopo: "Il rapporto va a zero: la dentiera non ruota, trasla. Il pignone gira e la dentiera scorre con la velocità periferica $\\omega_1 R_1$. È lo sterzo a cremagliera delle automobili.",
    },
  },
  racconto:
    "All'orale parti dalle ruote di frizione: stessa velocità in C, quindi $\\tau = -R_1/R_2$, ma la coppia è limitata da $f F_N R$. Per questo si usano i denti, che passano la coppia con la forza normale. Poi dici la legge dell'ingranamento: nel contatto sono uguali solo le componenti normali delle velocità, e con i triangoli simili il rapporto diventa $-O_1C/O_2C$; quindi è costante solo se la normale comune passa sempre per lo stesso punto C. L'evolvente lo garantisce: la sua normale è la retta generatrice, e con due ruote è la tangente comune alle fondamentali, fissa. Chiudi con il modulo, $2R = mz$, e con $\\tau = -z_1/z_2$, che non cambia nemmeno se l'interasse è un po' diverso.",
};

// ------------------------------------------------------------------ c5-denti-presa
const dentiPresa: LezioneArgomento = {
  perche:
    "Un dente di un ingranaggio non resta in presa per sempre: entra in contatto, spinge per un po', poi esce. Se il dente successivo non fosse già in presa quando il primo esce, la ruota condotta resterebbe per un attimo libera e poi verrebbe ripresa con un colpo: rumore, vibrazioni, denti che si rompono. Pensa a una scala: devi appoggiare il piede sul gradino successivo prima di staccare l'altro. La domanda della lezione è: **per quanto tempo una coppia di denti resta in presa, e quante coppie lavorano insieme in media? Quando si può dire che il moto è continuo?**",
  idea:
    "Con l'evolvente sappiamo dove sta il punto di contatto: sempre sulla retta di pressione. Ma non su tutta: un dente tocca l'altro solo finché la sua punta arriva alla retta. Quindi il contatto comincia dove la circonferenza di testa della ruota condotta taglia la retta, e finisce dove la taglia la circonferenza di testa della motrice. Quel tratto è il **segmento dei contatti** AB, e la sua lunghezza si trova con il teorema di Pitagora.\n\nResta da confrontare AB con la distanza fra un dente e il successivo. Sulla primitiva i denti distano un passo p. Mentre il contatto percorre AB, la ruota gira di un arco di primitiva, l'arco d'azione, che è AB diviso cos θ. Quanti passi ci stanno dentro, tante coppie sono in presa in media: il numero deve essere almeno 1. C'è un modo ancora più diretto di vederlo: sulla retta di pressione due contatti successivi distano sempre il passo di base $p\\cos\\theta$.",
  richiami: [
    { titolo: 'Teorema di Pitagora', testo: "In un triangolo rettangolo il quadrato dell'ipotenusa, il lato opposto all'angolo retto, è la somma dei quadrati dei due cateti. Quindi un cateto è la radice dell'ipotenusa al quadrato meno l'altro cateto al quadrato. Qui il triangolo rettangolo nasce perché una tangente a una circonferenza è perpendicolare al raggio nel punto di tangenza." },
    { titolo: 'Seno e coseno in un triangolo rettangolo', testo: "Con un angolo acuto θ e l'ipotenusa R, il cateto vicino a θ vale $R\\cos\\theta$ e quello opposto vale $R\\sin\\theta$. Se θ è piccolo, il cateto vicino è quasi lungo quanto l'ipotenusa e quello opposto è corto." },
    { titolo: 'Archi e angoli al centro', testo: "Su una circonferenza di raggio R, un angolo al centro φ (in radianti) sottende un arco lungo $R\\varphi$. Quindi lo stesso angolo sottende archi diversi su circonferenze concentriche diverse, proporzionali ai raggi: arco diviso raggio è sempre lo stesso angolo." },
    { titolo: 'Evolvente e retta generatrice', testo: "L'evolvente si traccia srotolando un filo teso dalla fondamentale. Il tratto di filo srotolato è lungo quanto l'arco di fondamentale scoperto, e la retta del filo è sempre normale al profilo. Nell'ingranamento la retta di pressione fa proprio da filo: è la generatrice delle evolventi di entrambe le ruote." },
  ],
  ipotesiPerche: [
    "È il caso più comune e quello trattato dalla dispensa: con l'evolvente il contatto sta sulla retta di pressione, e all'interasse nominale le primitive si toccano in C.",
    "Servono per scrivere tutti i raggi con m e z: alla fine vedremo che il modulo si semplifica, e il numero di denti in presa dipende solo da z₁, z₂ e θ.",
    "Danno un nome agli estremi del segmento dei contatti: ciascuno è dove la testa di una ruota taglia la retta di pressione, dalla parte della ruota opposta.",
    "Fissano il verso di percorrenza: il contatto entra in B (accesso) e esce in A (recesso). Il verso serve per distinguere le due fasi.",
  ],
  disegnoGuida:
    "Parti dall'interasse con $O_1$ a sinistra e $O_2$ a destra. Per ogni ruota disegna tre circonferenze concentriche, dall'esterno all'interno: testa, primitiva, fondamentale. Le primitive si toccano in C; segna fra primitiva e testa la quota a = m. Traccia la retta di pressione per C, tangente alle fondamentali in $H_1$ e $H_2$, con gli angoli retti. Ora cerca gli incroci con le teste: A è dove la testa della ruota 1 taglia la retta, dalla parte di $H_2$; B è dove la taglia la testa della ruota 2, dalla parte di $H_1$. Evidenzia il segmento AB. Infine disegna i triangoli rettangoli $O_1H_1A$ e $O_2H_2B$: sono quelli in cui userai Pitagora.",
  mappa: [
    'Dove si toccano i denti: sulla retta di pressione, solo fra le due teste, nel segmento AB.',
    'Misuro AB con Pitagora e con i triangoli di C.',
    'Passo dal segmento sulla retta all\'arco d\'azione sulla primitiva.',
    'Divido l\'arco d\'azione per il passo: numero di denti in presa, almeno 1.',
    'Lo rileggo con il passo di base, la distanza fra due contatti sulla retta.',
  ],
  dims: {
    d080: {
      introduzione:
        "Vogliamo la lunghezza del tratto di retta di pressione su cui i denti si toccano davvero. La strategia è spezzare AB nei due pezzi AC e CB, e calcolare ciascuno come differenza fra un tratto misurato dal punto di tangenza, trovato con Pitagora, e il tratto fino a C, trovato con il seno. Alla fine scriviamo tutto con m, z e θ.",
      riepilogo:
        "Il contatto avviene fra le due circonferenze di testa, nel segmento AB. Abbiamo spezzato AB in AC e CB; ciascun pezzo è il tratto dal punto di tangenza, ottenuto con Pitagora, meno il tratto fino a C, ottenuto con il seno. Con il proporzionamento modulare tutto si scrive con θ, i numeri di denti e il modulo, che compare solo come fattore davanti.",
    },
    d079: {
      introduzione:
        "AB è un segmento sulla retta di pressione, ma i denti sono distribuiti sulla primitiva, a un passo l'uno dall'altro. Dobbiamo portare le due misure sulla stessa circonferenza. La strategia è seguire la rotazione della ruota 1 mentre il contatto va da B ad A: guardiamo l'arco percorso sulla primitiva e quello sulla fondamentale, e li leghiamo al tratto percorso sulla retta.",
      riepilogo:
        "Mentre il contatto percorre la retta, la ruota gira dello stesso angolo sulla primitiva e sulla fondamentale, e gli archi stanno come i raggi. Il tratto sulla retta è uguale all'arco svolto sulla fondamentale, perché la retta la srotola. Mettendo insieme, l'arco d'azione sulla primitiva è AB diviso cos θ. Dividendo per il passo si ottiene il numero medio di coppie in presa, che deve essere almeno 1 e non dipende dal modulo.",
    },
    d138: {
      introduzione:
        "La dispensa non nomina il passo di base, ma il suo fattore $p\\cos\\theta$ compare nella formula dei denti in presa. Qui gli diamo un significato: è il passo misurato sulla fondamentale, ed è anche la distanza fra due contatti successivi sulla retta di pressione. La strategia è ripetere il ragionamento del passo sulla fondamentale e poi usare la generazione dell'evolvente.",
      riepilogo:
        "Il passo di base è il passo misurato sulla fondamentale, $p\\cos\\theta$. Siccome la retta di pressione srotola le evolventi, due fianchi successivi la tagliano a distanza esattamente $p_b$, ovunque. Allora il numero di coppie in presa è semplicemente AB diviso $p_b$: con $1 \\le z_p < 2$ lavorano a volte una, a volte due coppie, e la frazione di tempo con due coppie è $z_p - 1$.",
    },
  },
  passi: {
    'd080.1': {
      tappa: 0,
      prima: "Dove può stare il punto di contatto? Sappiamo che con l'evolvente sta sempre sulla retta di pressione. Ma un dente ha una lunghezza finita: la sua punta è sulla circonferenza di testa. Chiediti: quando comincia a toccare l'altra ruota un dente della 1? E quando smette?",
      dopo: "Il contatto comincia in B, dove la punta del dente della ruota 2 arriva sulla retta, e finisce in A, dove ci arriva la punta del dente della ruota 1. Il punto di contatto P sta sempre fra A e B. Controllo: se allungassi i denti, le teste taglierebbero la retta più lontano e AB crescerebbe.",
    },
    'd080.2': {
      tappa: 1,
      prima: "AB è difficile da misurare tutto insieme. C lo divide in due tratti, AC e CB. Per ognuno c'è un trucco: misurarlo partendo dal punto di tangenza della ruota opposta, dove c'è un angolo retto e quindi un triangolo rettangolo comodo, e poi togliere il pezzo fino a C.",
      dopo: "AC è il tratto da $H_1$ ad A meno il tratto da $H_1$ a C; CB allo stesso modo partendo da $H_2$. Nel disegno A sta fra C e $H_2$: quindi $AH_1$ è più lungo di $CH_1$ e la differenza è positiva, come deve essere una lunghezza.",
    },
    'd080.3': {
      tappa: 1,
      prima: "Calcoliamo $AH_1$. Guarda il triangolo $O_1H_1A$: è rettangolo in $H_1$, perché la retta di pressione è tangente alla fondamentale e la tangente è perpendicolare al raggio. Quali sono i lati che conosci? L'ipotenusa va da $O_1$ ad A, che sta sulla testa; il cateto $O_1H_1$ è il raggio fondamentale.",
      dopo: "Il tratto $AH_1$ è la radice del raggio di testa al quadrato meno il raggio fondamentale al quadrato. Controllo: il raggio di testa è maggiore del fondamentale, quindi sotto radice c'è un numero positivo. Se la testa coincidesse con la fondamentale, A cadrebbe in $H_1$.",
    },
    'd080.4': {
      tappa: 1,
      prima: "Ora il pezzo fino a C. Guarda il triangolo $O_1H_1C$: rettangolo in $H_1$, ipotenusa $O_1C = R_1$, angolo θ in $O_1$. Il tratto $CH_1$ sta lungo la retta di pressione, di fronte all'angolo θ. È il cateto opposto o adiacente?",
      dopo: "È il cateto opposto, quindi $CH_1 = R_1\\sin\\theta$; allo stesso modo $CH_2 = R_2\\sin\\theta$. Controllo: se θ fosse zero la retta di pressione sarebbe verticale, tangente in C a entrambe, e $H_1$, $H_2$ coinciderebbero con C.",
    },
    'd080.5': {
      tappa: 1,
      prima: "Scriviamo AC come differenza: $\\sqrt{R_{t1}^2 - R_{f1}^2} - R_1\\sin\\theta$. Conviene esprimere tutto con il raggio primitivo: il raggio di testa è $R_1 + a$, il fondamentale è $R_1\\cos\\theta$. Sostituisci e porta fuori $R_1$ sia dalla radice sia dal termine con il seno.",
      dopo: "AC è il raggio primitivo per una parentesi che dipende solo dal rapporto $a/R_1$ e da θ. Il vantaggio di questa forma è che ora basta sapere quanto vale $a/R_1$ in termini di denti, e il prossimo passo lo fa.",
    },
    'd080.6': {
      tappa: 1,
      prima: "Usiamo il proporzionamento modulare: l'addendum è un modulo e il raggio primitivo è $mz_1/2$. Quanto vale allora il rapporto $a/R_1$? Sostituiscilo nella parentesi e scrivi $R_1$ davanti. Poi ripeti tutto, identico, per BC sulla ruota 2.",
      dopo: "Il rapporto $a/R_1$ vale $2/z_1$: meno denti, testa più sporgente in proporzione. AC e BC hanno la stessa forma, ciascuno con i denti della propria ruota. Controllo: con tanti denti $2/z$ è piccolo, la radice tende a $\\sin\\theta$ e il tratto, diviso per il raggio, si accorcia.",
    },
    'd080.7': {
      tappa: 1,
      prima: "Manca solo la somma: AB è AC più BC. Le due espressioni hanno entrambe il fattore $m/2$ davanti; raccoglilo e metti insieme i due termini con il seno, che hanno lo stesso $\\sin\\theta$.",
      dopo: "AB dipende da θ, dai numeri di denti e dal modulo, che sta tutto fuori come fattore: raddoppiando il modulo raddoppia AB. Questo fatto sarà importante fra poco, perché anche il passo è proporzionale al modulo.",
    },
    'd080.8': {
      tappa: 1,
      prima: "La stessa formula si può scrivere con i raggi, come nelle fonti derivate. Torna alla scomposizione iniziale: i due tratti dai punti di tangenza, $AH_1$ e $BH_2$, meno i due tratti fino a C. Quanto fanno insieme $CH_1 + CH_2$?",
      dopo: "Fanno $H_1H_2 = (R_1 + R_2)\\sin\\theta = i\\sin\\theta$. È una forma comoda quando conosci i raggi e non i denti. Attento: nelle fonti derivate la lettera «a» indica l'interasse, mentre qui a è l'addendum.",
    },
    'd079.1': {
      tappa: 2,
      prima: "Definiamo l'arco d'azione: mentre una coppia di denti resta in presa, di quanto avanza la ruota 1, misurando sulla primitiva? Dividiamolo in due fasi: prima il contatto va da B fino a C (accesso), poi da C fino ad A (recesso). M e M' sono i punti dove il profilo taglia la primitiva all'inizio e alla fine.",
      dopo: "L'arco d'azione è la somma dell'arco di accesso MC e dell'arco di recesso M'C. È l'arco che i denti percorrono «insieme» sulla primitiva, ed è questo arco che confronteremo con il passo.",
    },
    'd079.2': {
      tappa: 2,
      prima: "Mentre il contatto va da B a C la ruota 1 gira di un certo angolo. Il profilo del dente gira con lei: il punto dove taglia la primitiva va da M a C, e il punto dove nasce sulla fondamentale va da R a S. Chiediti: gli archi MC e RS corrispondono allo stesso angolo al centro?",
      dopo: "Sì: è lo stesso profilo rigido che ruota, quindi lo stesso angolo. Archi dello stesso angolo stanno come i raggi: arco diviso raggio è uguale sulla primitiva e sulla fondamentale. Controllo: la primitiva è più grande, quindi MC è più lungo di RS.",
    },
    'd079.3': {
      tappa: 2,
      prima: "Ora leghiamo RS al segmento sulla retta di pressione. Ricorda chi è la retta di pressione per la ruota 1: è la retta generatrice delle sue evolventi, il «filo» che si srotola dalla fondamentale. Che cosa dice il rotolamento senza strisciamento fra il tratto di filo e l'arco scoperto?",
      dopo: "Il tratto percorso dal contatto sulla retta, da B a C, è uguale all'arco svolto sulla fondamentale, RS. È la stessa proprietà $\\overline{PQ} = \\overset{\\frown}{HQ}$ della costruzione dell'evolvente: quanto filo si srotola, tanto arco si scopre.",
    },
    'd079.4': {
      tappa: 2,
      prima: "Unisci le due relazioni appena trovate. Dalla prima, MC è RS moltiplicato per il rapporto dei raggi $R_1/R_{f1}$. Dalla seconda, RS è uguale a BC. E il rapporto dei raggi quanto vale, se il fondamentale è il primitivo per cos θ?",
      dopo: "L'arco di accesso sulla primitiva è il tratto BC diviso cos θ. Controllo: cos θ è minore di 1, quindi l'arco è un po' più lungo del segmento, perché la primitiva è più grande della fondamentale su cui la retta srotola.",
    },
    'd079.5': {
      tappa: 2,
      prima: "Per il recesso il ragionamento è identico: il contatto va da C ad A, la ruota gira di un angolo, il profilo taglia la primitiva da C a M'. Il tratto sulla retta questa volta è AC. Applica gli stessi due passi.",
      dopo: "L'arco di recesso è AC diviso cos θ. Accesso e recesso si trattano allo stesso modo: cambia solo quale pezzo del segmento dei contatti stai guardando.",
    },
    'd079.6': {
      tappa: 2,
      prima: "Somma l'arco di accesso e quello di recesso. I due hanno lo stesso denominatore cos θ, e i due tratti BC e AC, messi insieme, formano un segmento che conosci già.",
      dopo: "L'arco d'azione è l'intero segmento dei contatti diviso cos θ. Abbiamo trasformato una lunghezza sulla retta di pressione in una lunghezza sulla primitiva, dove sono misurati i passi.",
    },
    'd079.7': {
      tappa: 3,
      prima: "Sulla primitiva c'è un dente ogni passo p. Mentre una coppia percorre l'arco d'azione, quanti denti passano? Quanti passi ci stanno nell'arco. Ora la condizione di continuità: una nuova coppia deve entrare in presa prima che la precedente esca. Che cosa vuol dire per quel numero?",
      dopo: "Il numero medio di coppie in presa è l'arco d'azione diviso il passo, e deve essere almeno 1. Se fosse minore di 1 ci sarebbero istanti senza nessuna coppia in presa: la condotta si fermerebbe e verrebbe ripresa con un urto. Nella pratica si sta fra 1,2 e 2.",
    },
    'd079.8': {
      tappa: 3,
      prima: "Il numero di denti in presa dipende dal modulo? Ricorda che AB ha il modulo come fattore davanti, e che il passo vale $\\pi m$. Che cosa succede facendo il rapporto?",
      dopo: "Il modulo si semplifica: il numero di denti in presa dipende solo da θ, $z_1$ e $z_2$. Quindi per avere più coppie in presa non serve un dente più grande: servono più denti, o un angolo di pressione più piccolo.",
    },
    'd138.1': {
      tappa: 4,
      prima: "Il passo è stato misurato sulla primitiva. Facciamo la stessa cosa sulla fondamentale: il passo di base $p_b$ è l'arco di fondamentale fra due fianchi corrispondenti successivi. Come prima, quanti passi di base servono per fare un giro intero della fondamentale?",
      dopo: "Z passi di base fanno tutta la fondamentale. È la stessa riga $pz = 2\\pi R$ del passo, scritta sulla circonferenza più piccola.",
    },
    'd138.2': {
      tappa: 4,
      prima: "Sostituisci $R_f = R\\cos\\theta$ nella riga precedente e ricava $p_b$. Poi confronta con il passo sulla primitiva, $2\\pi R/z$. Ragiona con gli angoli: fra due denti c'è sempre lo stesso angolo al centro $2\\pi/z$, su qualsiasi circonferenza.",
      dopo: "Il passo di base è il passo per cos θ, cioè $\\pi m\\cos\\theta$. Controllo: la fondamentale è più piccola, quindi lo stesso angolo sottende un arco più corto. È proprio il fattore che compariva nella formula dei denti in presa.",
    },
    'd138.3': {
      tappa: 4,
      prima: "Che significato ha $p_b$ sulla retta di pressione? Due fianchi successivi sono due evolventi uguali, nate sulla fondamentale in punti sfasati di $2\\pi/z$. Tutte e due sono srotolate dalla stessa retta. Scrivi il tratto di retta fra i due fianchi come differenza dei due archi svolti.",
      dopo: "La differenza è esattamente $p_b$, e non dipende da dove sei sulla retta. Quindi lungo la retta di pressione due contatti successivi distano sempre il passo di base. Immagina due fili srotolati insieme dallo stesso rocchetto, partiti a distanza $p_b$: restano a distanza $p_b$.",
    },
    'd138.4': {
      tappa: 4,
      prima: "Rileggi la formula dei denti in presa, $\\overline{AB}/(p\\cos\\theta)$, alla luce di quanto appena visto. Il denominatore $p\\cos\\theta$ ha ora un nome e un significato sulla retta: quale?",
      dopo: "Il numero di coppie in presa è la lunghezza del segmento dei contatti divisa la distanza fra due contatti successivi su quel segmento. È la lettura più intuitiva: su AB ci sono tanti contatti quanti passi di base ci stanno.",
    },
    'd138.5': {
      tappa: 4,
      prima: "Che cosa significa un numero non intero, per esempio 1,6? Il contatto avanza sulla retta a velocità costante. Mentre una coppia percorre AB, la successiva entra quando la prima ha fatto $p_b$. Per quanto tratto lavorano due coppie insieme, e per quanto una sola?",
      dopo: "Due coppie per un tratto $\\overline{AB} - p_b$ su $p_b$, cioè per una frazione $z_p - 1$ del tempo; nel resto una sola. Con 1,6: due coppie per il 60% del tempo. Controllo: con $z_p = 1$ c'è sempre una sola coppia, appena sufficiente.",
    },
  },
  racconto:
    "All'orale dici che con l'evolvente il contatto corre sulla retta di pressione, ma solo fra le due circonferenze di testa: è il segmento dei contatti AB, con B inizio (accesso) e A fine (recesso). Lo calcoli spezzandolo in AC e CB: Pitagora nei triangoli $O_1H_1A$ e $O_2H_2B$, meno $R\\sin\\theta$. Poi passi all'arco d'azione sulla primitiva: la retta srotola la fondamentale, quindi $\\ell = \\overline{AB}/\\cos\\theta$. Dividendo per il passo hai $z_p = \\overline{AB}/(p\\cos\\theta) \\ge 1$, condizione di continuità del moto, indipendente dal modulo. Aggiungi che $p\\cos\\theta$ è il passo di base, la distanza fra due contatti successivi sulla retta.",
};

// ------------------------------------------------------------------ c5-interferenza
const interferenza: LezioneArgomento = {
  perche:
    "Vuoi un riduttore compatto, quindi un pignone piccolo, con pochi denti, che ingrana con una ruota grande. A un certo punto, però, se togli ancora denti al pignone, gli ingranaggi non girano più bene: la punta dei denti della ruota grande va a scavare nella base dei denti del pignone. In officina, per non farli bloccare, la dentatrice stessa asporta materiale alla base del dente e lo indebolisce. È l'interferenza. La domanda della lezione è: **quanti denti deve avere, come minimo, la ruota piccola perché questo non succeda?** La risposta è un numero famoso: circa 17 con θ = 20°.",
  idea:
    "Un fianco a evolvente esiste solo fuori dalla circonferenza fondamentale, perché l'evolvente nasce lì. Sulla retta di pressione questo vuol dire una cosa precisa: i contatti «buoni», fra due evolventi, sono possibili solo fra i punti di tangenza $H_1$ e $H_2$. Oltre $H_2$, per esempio, si è già dentro la fondamentale della ruota 2, dove il suo fianco non è più evolvente.\n\nIl contatto, d'altra parte, va da B ad A, dove le teste tagliano la retta. Allora la regola è semplice: **A e B devono restare dentro $H_1H_2$**. La testa della ruota grande è quella che arriva più lontano, quindi il caso critico è A che raggiunge $H_2$. Tradurre «A non oltre $H_2$» in numeri richiede la distanza di $H_2$ da $O_1$, che si trova con il teorema di Carnot. Poi si scrivono i raggi con m e z, il modulo sparisce e resta un numero minimo di denti della ruota piccola, che dipende dal rapporto e da θ. Con la dentiera il conto si fa a occhio e viene $2/\\sin^2\\theta$.",
  richiami: [
    { titolo: 'Teorema di Carnot (del coseno)', testo: "In un triangolo qualsiasi, il quadrato di un lato è la somma dei quadrati degli altri due meno il loro doppio prodotto per il coseno dell'angolo compreso: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$. Se l'angolo è retto il coseno è zero e torni a Pitagora. Si ricava scrivendo un lato come somma vettoriale degli altri due e facendone il quadrato scalare." },
    { titolo: 'Fondamentale, primitiva, testa', testo: "Ogni ruota ha tre circonferenze. La fondamentale $R_f = R\\cos\\theta$, su cui nasce l'evolvente; la primitiva $R = mz/2$, quella che rotola; la testa $R + a$, con a = m, dove finiscono i denti. Il fianco del dente è un'evolvente solo dalla fondamentale in su." },
    { titolo: 'Segmento dei contatti AB', testo: "Il contatto fra i denti corre sulla retta di pressione da B, dove la testa della ruota 2 taglia la retta, ad A, dove la taglia la testa della ruota 1. A sta dalla parte di $H_2$, B dalla parte di $H_1$. Più i denti sono alti, più AB è lungo." },
    { titolo: 'Disuguaglianze e radici', testo: "Se due numeri sono positivi, si possono elevare al quadrato o invertire mantenendo il confronto (invertendo, il verso si rovescia). Prima di farlo bisogna sempre controllare che i due membri siano positivi, altrimenti il verso può cambiare." },
  ],
  ipotesiPerche: [
    "Chiamare 1 la ruota grande e 2 la piccola fissa le idee: il numero minimo di denti riguarda la piccola, ed è la testa della grande quella pericolosa. Il rapporto in modulo è quindi almeno 1.",
    "Servono per scrivere tutti i raggi con m e z: il modulo si semplificherà e il risultato dipenderà solo dai numeri di denti.",
    "All'interasse nominale le primitive si toccano in C e la distanza dei centri è $R_1 + R_2$, il lato del triangolo di Carnot. θ è il dato che decide il numero finale.",
  ],
  disegnoGuida:
    "Disegna la ruota grande 1 a sinistra e la piccola 2 a destra, con le primitive che si toccano in C sull'interasse. Traccia la retta di pressione, tangente alle fondamentali in $H_1$ e $H_2$. Disegna le circonferenze di testa e segna gli incroci con la retta: A per la testa della ruota 1, vicino a $H_2$, e B per la testa della ruota 2, vicino a $H_1$. Nota che A arriva molto più vicino a $H_2$ di quanto B arrivi a $H_1$: è il caso critico. Ora evidenzia, magari in grigio, il triangolo $O_1O_2H_2$: ha l'angolo θ in $O_2$, fra $O_2H_2$ e l'interasse. Segna i due segmenti da confrontare, $O_1A = R_1 + a$ e $O_1H_2$. A parte, disegna il caso dentiera, con la primitiva retta per C e la testa parallela a distanza a.",
  mappa: [
    'Capisco che cos\'è l\'interferenza: la punta lavora dove l\'altro fianco non è evolvente.',
    'Scrivo la condizione: A e B dentro H₁H₂, e il caso critico è A che arriva in H₂.',
    'Traduco la condizione in raggi con il teorema di Carnot.',
    'Scrivo i raggi con i denti e ricavo il numero minimo di denti della ruota piccola.',
    'Guardo il caso dentiera e metto i numeri con θ = 20°.',
  ],
  dims: {
    d081: {
      introduzione:
        "Prima di fare conti dobbiamo capire esattamente quando c'è interferenza e trasformare la cosa in una condizione geometrica precisa. La strategia è: vedere dove i contatti a evolvente sono possibili sulla retta di pressione, capire quale estremo del segmento dei contatti rischia di uscire, e poi scrivere quella condizione con le distanze da $O_1$, usando Carnot.",
      riepilogo:
        "L'interferenza è la punta di un dente che lavora contro la parte di fianco dell'altra ruota che non è evolvente. Sulla retta di pressione questo si evita se A e B restano fra $H_1$ e $H_2$. Il caso critico è la testa della ruota grande: deve restare dentro la distanza $O_1H_2$. Con Carnot nel triangolo $O_1O_2H_2$ abbiamo scritto $O_1H_2$ con i raggi, e abbiamo visto che la condizione equivale a $CA \\le CH_2$.",
    },
    d082: {
      introduzione:
        "Abbiamo la condizione con i raggi. Ora vogliamo un numero di denti. La strategia è sostituire raggi e addendum con m e z, dividere per il modulo e poi per $z_2/2$ per far comparire il rapporto, semplificare con $\\cos^2 + \\sin^2 = 1$ e isolare $z_2$. Poi guardiamo il limite della dentiera, lo verifichiamo con un conto diretto e mettiamo i numeri.",
      riepilogo:
        "Scrivendo i raggi con i denti il modulo sparisce, e dividendo per $z_2/2$ compare il rapporto $|\\tau|$. Dopo la semplificazione trigonometrica si isola $z_2$: il minimo dipende da $|\\tau|$ e da θ. Al crescere del rapporto il minimo cresce, fino al limite della dentiera, $2/\\sin^2\\theta$, che ritroviamo anche con un conto diretto. Con θ = 20° servono almeno 15 denti con $|\\tau| = 2$ e 18 con la dentiera, che è la scelta prudente per tutte le ruote esterne.",
    },
  },
  passi: {
    'd081.1': {
      tappa: 0,
      prima: "Ricorda dove il fianco del dente è un'evolvente: solo dalla fondamentale in su. Se il fondo del vano sta sotto la fondamentale, cosa che succede con pochi denti, quel tratto di fianco ha un'altra forma e non è coniugato al profilo dell'altra ruota. Chiediti: che cosa succede se la punta di un dente dell'altra ruota arriva a lavorare proprio lì?",
      dopo: "I due profili non sono più coniugati: la punta di un dente entra nel fondo del vano dell'altro, cioè i denti si compenetrano. È l'interferenza. In pratica o le ruote si bloccano, o il dente viene scavato alla base e diventa più debole.",
    },
    'd081.2': {
      tappa: 1,
      prima: "Traduciamo sulla retta di pressione. Su di essa il contatto fra due evolventi è possibile solo dove entrambe esistono. Oltre $H_2$, verso l'esterno, saresti dentro la fondamentale della ruota 2; oltre $H_1$, dentro quella della ruota 1. E il contatto dove va? Da B ad A.",
      dopo: "Non c'è interferenza se A e B stanno tutti e due nel tratto $H_1H_2$. Basta che uno solo dei due esca per avere interferenza. Così un problema di forme dei denti è diventato un confronto fra punti su una retta.",
    },
    'd081.3': {
      tappa: 1,
      prima: "Quale dei due estremi rischia di più? Pensa alle teste: la ruota grande ha un raggio grande, e la sua testa taglia la retta lontano da C, molto vicino a $H_2$. La ruota piccola invece arriva sulla retta presto, lontano da $H_1$. Quindi basta controllare un estremo. Come lo scrivi con le distanze da $O_1$?",
      dopo: "Il caso critico è A che raggiunge $H_2$: se la circonferenza di testa della ruota 1 non arriva oltre $H_2$, cioè $O_1A \\le O_1H_2$, va tutto bene, e anche B è al sicuro. Controllo: con due ruote uguali il problema sarebbe simmetrico, e i due estremi rischierebbero allo stesso modo.",
    },
    'd081.4': {
      tappa: 1,
      prima: "Il membro di sinistra è facile. A sta sulla circonferenza di testa della ruota 1. Qual è il raggio di quella circonferenza, in funzione del raggio primitivo e dell'addendum?",
      dopo: "La distanza di A da $O_1$ è il raggio di testa, primitivo più addendum. Il lato difficile è l'altro, $O_1H_2$, perché $H_2$ è un punto della ruota 2 e va misurato dal centro della ruota 1.",
    },
    'd081.5': {
      tappa: 2,
      prima: "Come troviamo $O_1H_2$? Guarda il triangolo $O_1O_2H_2$. Conosci due lati, l'interasse $O_1O_2$ e il raggio fondamentale $O_2H_2$, e l'angolo fra loro in $O_2$, che è θ. Quale teorema dà il terzo lato quando conosci due lati e l'angolo compreso, in un triangolo che non è rettangolo?",
      dopo: "È il teorema di Carnot: il quadrato di $O_1H_2$ è la somma dei quadrati degli altri due lati meno il doppio prodotto per cos θ. Il meno nasce perché, sommando i vettori, l'angolo fra $H_2 - O_2$ e $O_2 - O_1$ è $\\pi - \\theta$, e il suo coseno è $-\\cos\\theta$.",
    },
    'd081.6': {
      tappa: 2,
      prima: "Sostituisci nella formula di Carnot i due lati noti: l'interasse nominale è la somma dei raggi primitivi, e $O_2H_2$ è il raggio fondamentale della ruota 2, cioè il primitivo per cos θ. Fai attenzione: nel doppio prodotto il cos θ compare due volte.",
      dopo: "Abbiamo $O_1H_2$ scritto solo con i raggi primitivi e θ. Il doppio prodotto ha $\\cos^2\\theta$: un cos θ viene dal raggio fondamentale, l'altro dall'angolo di Carnot.",
    },
    'd081.7': {
      tappa: 2,
      prima: "Ora mettiamo insieme i due lati della condizione $O_1A \\le O_1H_2$: a sinistra il raggio di testa della ruota 1, a destra la radice dell'espressione di Carnot appena trovata.",
      dopo: "È la condizione di non interferenza scritta con i raggi: la testa della ruota 1 deve restare dentro il cerchio di raggio $O_1H_2$. Da qui partirà il conto del numero minimo di denti.",
    },
    'd081.8': {
      tappa: 2,
      prima: "C'è un modo più intuitivo di vedere la stessa condizione, sulla retta stessa. A e $H_2$ stanno sulla retta di pressione, che è perpendicolare a $O_1H_1$. Per Pitagora, la distanza da $O_1$ di un punto della retta si trova con $R_{f1}$ e con la distanza da $H_1$. Allora, quale punto è più lontano da $O_1$?",
      dopo: "Quello più lontano da $H_1$. Quindi confrontare le distanze da $O_1$ equivale a confrontare le posizioni sulla retta: $CA \\le CH_2$. È la forma che la dispensa usa per la dentiera, dove i raggi della ruota 1 sono infiniti.",
    },
    'd082.1': {
      tappa: 3,
      prima: "Riprendiamo la condizione geometrica appena trovata. Ricorda cosa dice: il raggio di testa della ruota grande non deve superare la distanza fra $O_1$ e $H_2$. È tutta scritta con i raggi; ora la porteremo nei denti.",
      dopo: "Questa è la disuguaglianza da cui parte il conto. Nota che tutti i termini hanno le dimensioni di una lunghezza: sono raggi o addendum. Questo farà sparire il modulo al passo successivo.",
    },
    'd082.2': {
      tappa: 3,
      prima: "Proporzionamento modulare: l'addendum è un modulo, ogni raggio primitivo è $mz/2$. Sostituisci queste espressioni dappertutto. Poi guarda: ogni termine contiene m, anche sotto radice, dove c'è $m^2$. Dividi tutto per m.",
      dopo: "La condizione non dipende più dal modulo: a sinistra c'è $z_1/2 + 1$, sotto radice solo numeri di denti e θ. È un risultato importante: l'interferenza è una questione di numeri di denti, non di grandezza del dente.",
    },
    'd082.3': {
      tappa: 3,
      prima: "Vogliamo far comparire il rapporto $|\\tau| = z_1/z_2$. Dividi entrambi i membri per $z_2/2$. A sinistra viene $z_1/z_2 + 2/z_2$. Sotto radice, dividere la radice per $z_2/2$ vuol dire dividere ogni termine per $z_2^2/4$.",
      dopo: "Ora la disuguaglianza contiene solo $|\\tau|$, θ e, a sinistra, $2/z_2$: l'incognita compare una sola volta. È la forma giusta per isolare $z_2$.",
    },
    'd082.4': {
      tappa: 3,
      prima: "Semplifichiamo il sotto radice. Sviluppa $(|\\tau|+1)^2$ e moltiplica il termine $2(|\\tau|+1)\\cos^2\\theta$. Poi raggruppa: un pezzo $2|\\tau|$ con $-2|\\tau|\\cos^2\\theta$, un pezzo $1$ con $\\cos^2\\theta - 2\\cos^2\\theta$. Che cosa riconosci in $1 - \\cos^2\\theta$?",
      dopo: "È $\\sin^2\\theta$, e il sotto radice diventa $\\tau^2 + (2|\\tau|+1)\\sin^2\\theta$. Controllo: con θ = 0 la radice vale $|\\tau|$, e la condizione diventerebbe $2/z_2 \\le 0$, impossibile. Ha senso: con θ nullo $H_2$ coinciderebbe con C e non resterebbe spazio per il contatto.",
    },
    'd082.5': {
      tappa: 3,
      prima: "Isoliamo $z_2$. Porta $|\\tau|$ a destra: a sinistra resta $2/z_2$. Il membro di destra è positivo, perché la radice supera $|\\tau|$. Allora puoi invertire entrambi i membri, ricordando che invertendo il verso della disuguaglianza si rovescia.",
      dopo: "Il numero di denti della ruota piccola deve essere almeno $f(|\\tau|, \\theta)$: è il numero minimo per evitare l'interferenza. Dipende solo dal rapporto e dall'angolo di pressione.",
    },
    'd082.6': {
      tappa: 4,
      prima: "Che cosa succede se il rapporto cresce sempre di più? La forma con la differenza al denominatore è scomoda per fare il limite. Razionalizza: moltiplica sopra e sotto per la radice più $|\\tau|$. Poi chiediti che cosa vuol dire fisicamente $|\\tau| \\to \\infty$, cioè $R_1$ che va all'infinito.",
      dopo: "Il limite è $2/\\sin^2\\theta$, e corrisponde alla dentiera, una ruota di raggio infinito. Siccome f cresce con $|\\tau|$, la dentiera dà il valore più grande: usarla per tutte le ruote esterne è una scelta prudente, che garantisce l'assenza di interferenza.",
    },
    'd082.7': {
      tappa: 4,
      prima: "Rifacciamo il caso dentiera direttamente, è più semplice. La primitiva della dentiera è una retta per C, e la sua testa è una retta parallela, a distanza a. La retta di pressione la taglia in A. Che lunghezza ha CA, se la retta di pressione è inclinata di θ sulla primitiva? E $CH_2$, nel triangolo $O_2CH_2$?",
      dopo: "CA è a diviso sin θ, perché a è il cateto opposto all'angolo θ e CA l'ipotenusa. $CH_2$ è $R_2\\sin\\theta$. Controllo: un addendum più grande allontana A da C, ed è giusto, perché denti più alti arrivano più lontano.",
    },
    'd082.8': {
      tappa: 4,
      prima: "Imponi che A non vada oltre $H_2$, cioè $CA \\le CH_2$. Moltiplica per sin θ, poi sostituisci a = m e $R_2 = mz_2/2$ e semplifica il modulo.",
      dopo: "Si ottiene $z_2 \\ge 2/\\sin^2\\theta$, esattamente il limite della formula generale. Due strade diverse, il limite e il conto diretto, danno lo stesso numero: buon segno.",
    },
    'd082.9': {
      tappa: 4,
      prima: "Mettiamo i numeri in un caso tipico: rapporto 2 in modulo e θ = 20°. Calcola $\\sin^2 20^\\circ \\approx 0{,}117$, poi la radice di $4 + 5\\cdot 0{,}117$ e sottrai 2. Infine 2 diviso il risultato. Ricorda che i denti sono numeri interi.",
      dopo: "Viene 14,16, quindi servono almeno 15 denti: si arrotonda sempre per eccesso, perché 14 denti darebbero interferenza. È il minimo vero per questo rapporto, ottenuto con la formula esatta.",
    },
    'd082.10': {
      tappa: 4,
      prima: "Ora la formula della dentiera con θ = 20°: 2 diviso $\\sin^2 20^\\circ$. Ragiona su quando usarla: vale per la dentiera, ma siccome dà il valore più grande, va bene anche per ogni ruota esterna.",
      dopo: "Viene 17,10, quindi 18 denti. È il famoso «17» del grafico della dispensa. Usata per una ruota esterna è conservativa: garantisce l'assenza di interferenza al prezzo di qualche dente in più.",
    },
    'd082.11': {
      tappa: 4,
      prima: "Riassumiamo quando usare ciascuna formula, come nella tabella della dispensa. Ruote esterne: τ negativo e f cresce verso il limite della dentiera. Ruote interne: τ positivo, e la geometria cambia. Chiediti se il valore della dentiera è ancora un limite superiore in quel caso.",
      dopo: "Per le ruote esterne vanno bene sia la formula esatta sia la conservativa; per la dentiera solo la conservativa; per le ruote interne la conservativa non basta più e serve la formula con τ. È la tabella da ricordare all'orale.",
    },
  },
  racconto:
    "All'orale definisci l'interferenza: la punta del dente di una ruota lavora contro la parte di fianco dell'altra che sta sotto la fondamentale, che non è evolvente, e i denti si compenetrano. Sulla retta di pressione i contatti a evolvente sono possibili solo fra $H_1$ e $H_2$, quindi A e B devono restare lì dentro; il caso critico è la testa della ruota grande, che non deve superare $H_2$: $R_1 + a \\le O_1H_2$. Con Carnot nel triangolo $O_1O_2H_2$ e i raggi scritti con m e z, il modulo sparisce e arrivi a $z_2 \\ge 2/(\\sqrt{\\tau^2 + (2|\\tau|+1)\\sin^2\\theta} - |\\tau|)$. Chiudi con la dentiera, $2/\\sin^2\\theta \\approx 17$ con θ = 20°, valore prudente per tutte le ruote esterne.",
};

// ------------------------------------------------------------------ c5-forze-dritti
const forzeDritti: LezioneArgomento = {
  perche:
    "Per dimensionare un ingranaggio non basta sapere quanto girano le ruote: devi sapere con che forza si spingono i denti, perché da quella forza dipendono la resistenza del dente, il carico sui cuscinetti e la flessione degli alberi. E devi sapere quanta potenza si perde: un riduttore che scalda è un riduttore che spreca energia. La domanda della lezione è doppia: **quanto vale la forza fra due denti, e come si scompone? E che cosa cambia quando c'è attrito, cioè dove e quanto si perde?**",
  idea:
    "Se i denti fossero perfettamente lisci, si spingerebbero solo lungo la normale al contatto. Con l'evolvente la normale comune è sempre la retta di pressione: la forza ha quindi una direzione fissa, e il suo braccio rispetto al centro di ogni ruota è il raggio fondamentale. Scomponendola nel punto C ottieni due pezzi: uno tangente alle primitive, che fa la coppia, e uno radiale, che non fa coppia ma spinge le ruote a separarsi e carica i supporti.\n\nCon l'attrito c'è anche una forza tangente ai denti, cioè perpendicolare alla retta di pressione. Il suo verso dipende da come striscia un dente sull'altro: in C non striscia nessuno, prima e dopo C lo strisciamento ha versi opposti. Per questo i conti si dividono in due fasi, accesso e recesso. L'attrito cambia i bracci negli equilibri, e il rapporto fra potenza uscente ed entrante, il rendimento istantaneo, vale 1 in C e cala allontanandosi. La potenza persa, alla fine, è proporzionale alla distanza del contatto da C.",
  richiami: [
    { titolo: 'Equilibrio alla rotazione (II equazione cardinale)', testo: "Per una ruota che gira a velocità costante attorno a un centro fisso, la somma dei momenti attorno a quel centro è zero. Il momento di una forza è forza per braccio, e il braccio è la distanza del centro dalla retta della forza, non dal punto in cui la forza è applicata. Una forza la cui retta passa per il centro non dà momento." },
    { titolo: 'Attrito radente di Coulomb', testo: "Quando due superfici strisciano, nasce una forza tangente alle superfici, opposta alla velocità con cui una scivola sull'altra, di modulo f volte la forza normale: $F_T = f F_N$. Il verso è la cosa delicata: è opposto alla velocità **relativa** del corpo su cui agisce rispetto all'altro." },
    { titolo: 'Azione e reazione', testo: "La forza che la ruota 2 esercita sulla ruota 1 è uguale e opposta a quella che la 1 esercita sulla 2: $F^{1,2} = -F^{2,1}$. Stessa retta, stesso modulo, verso opposto. Così basta trovare la forza su una ruota per conoscerla anche sull'altra." },
    { titolo: 'Velocità relativa fra i denti', testo: "Nella legge dell'ingranamento abbiamo visto che C è il C.I.R. del moto relativo: la velocità del dente 2 rispetto al dente 1 è $(\\omega_2 - \\omega_1) \\wedge (P - C)$. È nulla in C, cresce con la distanza PC ed è perpendicolare a PC." },
    { titolo: 'Potenza e rendimento', testo: "La potenza di una coppia è coppia per velocità angolare; quella di una forza è forza scalare velocità. Il rendimento è potenza utile in uscita diviso potenza in entrata: vale 1 se non si perde nulla, è minore di 1 se una parte della potenza si perde per attrito." },
  ],
  ipotesiPerche: [
    "Fissiamo chi spinge e chi è spinto, e i versi di rotazione: servono per trovare il verso dell'attrito. In regime le accelerazioni sono nulle e possiamo usare gli equilibri alla rotazione.",
    "Con l'evolvente la normale comune non cambia mai: la forza normale ha direzione fissa e braccio uguale al raggio fondamentale, qualunque sia il punto di contatto.",
    "È il modello d'attrito più semplice: forza proporzionale alla normale, opposta allo strisciamento. Basta un numero, f.",
    "La distanza x da C dice quanto strisciano i denti; separare accesso e recesso serve perché in C lo strisciamento cambia verso, e con esso l'attrito.",
  ],
  disegnoGuida:
    "Metti sull'interasse $O_1$, C e $O_2$; disegna le fondamentali. Segna i versi: $\\omega_1$ antioraria per la motrice, $\\omega_2$ oraria per la condotta. Traccia la retta di pressione da $H_1$ a $H_2$, con gli angoli retti nei punti di tangenza e l'angolo θ. Scegli il contatto P fra C e $H_1$, a distanza x da C: è la fase di accesso. In P disegna la forza normale della ruota 2 sulla 1, $F_N^{2,1}$, lungo la retta, verso $H_1$. Poi la velocità relativa di 1 rispetto a 2, perpendicolare alla retta, e l'attrito $F_T^{2,1}$ opposto a essa. Quota i bracci rispetto a $O_1$: $R_{f1}$ per la normale e $PH_1 = R_1\\sin\\theta - x$ per l'attrito. Infine le coppie: $C_1$ motrice e $C_2$ resistente.",
  mappa: [
    'Senza attrito: la forza sta sulla retta di pressione, braccio uguale al raggio fondamentale.',
    'La scompongo in C: la tangenziale trasmette la coppia, la radiale carica i supporti.',
    'Con attrito: trovo la velocità relativa e il verso dell\'attrito.',
    'Scrivo gli equilibri con attrito e ricavo il rendimento istantaneo, in accesso e in recesso.',
    'Calcolo quanta potenza si perde e come varia lungo il segmento dei contatti.',
  ],
  dims: {
    d083: {
      introduzione:
        "Cominciamo dal caso ideale, denti lisci. La strategia è: capire la direzione della forza fra i denti, scrivere l'equilibrio alla rotazione della motrice con il braccio giusto, scomporre la forza in C in una parte tangenziale e una radiale, e infine ripetere l'equilibrio sulla condotta per legare le due coppie.",
      riepilogo:
        "Senza attrito la forza fra i denti è lungo la retta di pressione, sempre con la stessa direzione. Il suo braccio rispetto a $O_1$ è il raggio fondamentale, quindi $C_1 = F R_{f1}$. Scomposta in C, la componente tangenziale $Q = F\\cos\\theta$ fa la coppia con braccio $R_1$, la radiale $F\\sin\\theta$ non fa coppia ma carica i supporti. Le coppie stanno come i raggi, e la forza vale $C_1/(R_1\\cos\\theta)$.",
    },
    d084: {
      introduzione:
        "Ora aggiungiamo l'attrito. Il punto difficile è il verso della forza d'attrito, che dipende dallo strisciamento. La strategia è: trovare la velocità relativa nel contatto, dedurne il verso dell'attrito, scrivere l'equilibrio alla rotazione di ciascuna ruota con i bracci giusti, ricavare il rapporto delle coppie e da lì il rendimento istantaneo. Facciamo tutto in accesso, poi ripetiamo in recesso.",
      riepilogo:
        "La velocità relativa è una rotazione attorno a C, quindi l'attrito è perpendicolare alla retta di pressione e cambia verso quando il contatto passa per C. Negli equilibri l'attrito ha braccio $R\\sin\\theta \\mp x$, misurato lungo la retta dal punto di tangenza. Eliminando la forza normale si ottiene il rapporto delle coppie e quindi il rendimento istantaneo, con formule diverse in accesso e in recesso. In C entrambi valgono 1, e calano allontanandosi da C.",
    },
    d085: {
      introduzione:
        "Quanto velocemente striscia un dente sull'altro? Ci serve sia per capire il verso dell'attrito sia per calcolare la potenza persa. La strategia è partire dalla rotazione relativa attorno a C, già trovata nella legge dell'ingranamento, e leggerla per ruote esterne, dove le due ω hanno versi opposti.",
      riepilogo:
        "La velocità del dente 2 rispetto al dente 1 è una rotazione relativa attorno a C. Nelle ruote esterne la velocità angolare relativa ha modulo $|\\omega_1| + |\\omega_2|$, quindi lo strisciamento vale questa somma per x, ed è perpendicolare alla retta di pressione, cioè tangente ai denti. È nullo in C, cresce linearmente allontanandosi e cambia verso passando per C; a parità di motrice è più forte se la condotta è piccola.",
    },
    d086: {
      introduzione:
        "Chiudiamo con il bilancio energetico: quanta potenza si trasforma in calore nel contatto? La strategia è scrivere la potenza della forza d'attrito nel moto relativo, usare la velocità di strisciamento appena trovata e, con un'approssimazione per f piccolo, ottenere una potenza proporzionale a x. Poi seguiamo il contatto lungo AB nel tempo.",
      riepilogo:
        "La potenza persa è l'attrito per la velocità di strisciamento: $f F_N (|\\omega_1| + |\\omega_2|) x$. Prendendo la normale del caso liscio diventa $Kx$, proporzionale alla distanza da C. Siccome il contatto avanza sulla retta a velocità costante, nel tempo il diagramma è a V: nullo in C, massimo agli estremi. L'energia persa per ogni coppia di denti è l'area dei due triangoli: conviene un segmento dei contatti corto e centrato su C.",
    },
  },
  passi: {
    'd083.1': {
      tappa: 0,
      prima: "Che direzione ha la forza che un dente liscio esercita sull'altro? Senza attrito una superficie può solo spingere perpendicolarmente a sé stessa, come un tavolo liscio che regge un bicchiere. Quindi la forza è lungo la normale comune ai profili. E per l'evolvente, la normale comune che retta è?",
      dopo: "È la retta di pressione $H_1H_2$. Quindi la forza fra i denti ha sempre la stessa direzione durante tutto l'ingranamento, anche se il punto di contatto si sposta. È un grande pregio dell'evolvente: i supporti vedono un carico di direzione costante.",
    },
    'd083.2': {
      tappa: 0,
      prima: "Scrivi l'equilibrio alla rotazione della ruota 1 attorno a $O_1$. Agiscono la coppia motrice $C_1$ e la forza del dente. Qual è il braccio della forza? Ricorda: è la distanza di $O_1$ dalla retta della forza, non dal punto di contatto. La retta è la retta di pressione, e la perpendicolare da $O_1$ la incontra in $H_1$.",
      dopo: "La coppia motrice è la forza per il raggio fondamentale. Il punto di contatto non compare: dovunque sia P sulla retta, il braccio è sempre $R_{f1}$. Quindi con coppia costante anche la forza fra i denti è costante.",
    },
    'd083.3': {
      tappa: 1,
      prima: "Spostiamo la forza lungo la sua retta fino a C, il punto primitivo: il momento non cambia. Scomponila in due direzioni: tangente alle primitive in C e lungo l'interasse. L'angolo fra la retta di pressione e la tangente alle primitive è θ. Quanto vale la componente tangente, e che braccio ha rispetto a $O_1$?",
      dopo: "La componente tangente $Q = F\\cos\\theta$ ha braccio $R_1$, e dà lo stesso momento di prima perché $R_1\\cos\\theta = R_{f1}$. È la forza che trasmette davvero la coppia, la stessa che avremmo con due ruote di frizione di raggio $R_1$.",
    },
    'd083.4': {
      tappa: 1,
      prima: "E l'altra componente, quella lungo l'interasse? Chiediti dove passa la sua retta: passa per C ed è diretta come la congiungente dei centri, quindi passa anche per $O_1$. Che momento fa una forza che passa per il centro?",
      dopo: "La componente radiale vale $F\\sin\\theta = Q\\tan\\theta$, non fa momento e non trasmette potenza. Però spinge le ruote a separarsi e carica alberi e cuscinetti. Con θ = 20° vale circa il 36% della tangenziale; con un angolo più grande sarebbe ancora maggiore.",
    },
    'd083.5': {
      tappa: 1,
      prima: "Ora la ruota 2. La forza che riceve è la reazione, uguale e opposta, sempre sulla retta di pressione. Scrivi il suo equilibrio alla rotazione attorno a $O_2$: il braccio è il raggio fondamentale $R_{f2}$. Poi fai il rapporto fra le due coppie: la forza si semplifica.",
      dopo: "Le coppie stanno come i raggi fondamentali, cioè come i primitivi, e il loro rapporto è $-\\tau$. È lo stesso risultato del bilancio delle potenze: senza attrito la potenza passa intera. Controllo: la ruota grande riceve la coppia più grande.",
    },
    'd083.6': {
      tappa: 1,
      prima: "Per dimensionare il dente vogliamo la forza in funzione della coppia motrice, che è il dato. Parti da $C_1 = F R_{f1}$, sostituisci $R_{f1} = R_1\\cos\\theta$ e ricava F.",
      dopo: "La forza fra i denti è la coppia divisa $R_1\\cos\\theta$, cioè la tangenziale divisa cos θ. Controllo: a parità di coppia, aumentando θ cresce la forza totale e soprattutto la radiale. Per questo non si usano angoli di pressione grandi.",
    },
    'd084.1': {
      tappa: 2,
      prima: "Per sapere dove punta l'attrito ci serve la velocità con cui un dente striscia sull'altro. Scrivi la velocità del punto di contatto della ruota 2 meno quella della ruota 1. Ricorda dalla legge dell'ingranamento chi è il C.I.R. del moto relativo.",
      dopo: "La velocità relativa è una rotazione attorno a C, con velocità angolare $\\omega_2 - \\omega_1$. Quindi è perpendicolare a PC, cioè alla retta di pressione: è tangente ai denti, come deve essere uno strisciamento.",
    },
    'd084.2': {
      tappa: 2,
      prima: "Troviamo i versi. $\\omega_2$ è oraria, $\\omega_1$ antioraria: «orario meno antiorario» che verso dà? A noi serve la velocità di 1 rispetto a 2, che è opposta. Poi guarda il disegno: con P fra B e C, il vettore $P - C$ punta verso $H_1$. Ruota quel vettore di 90° nel verso di $\\omega_{1,2}$.",
      dopo: "La velocità di 1 rispetto a 2 va verso il basso a destra, perpendicolare alla retta; l'attrito della 2 sulla 1 è opposto, verso l'alto a sinistra, di modulo $f F_N$. Quando P supera C, $P - C$ cambia verso e con lui l'attrito: per questo accesso e recesso vanno trattati separatamente.",
    },
    'd084.3': {
      tappa: 3,
      prima: "Equilibrio alla rotazione della ruota 1 attorno a $O_1$, in accesso. La normale ha braccio $R_{f1}$, come prima. L'attrito invece è perpendicolare alla retta di pressione: il suo braccio è la distanza di $O_1$ dalla retta dell'attrito, che si misura **lungo** la retta di pressione, da P fino a $H_1$. Quanto è lungo $PH_1$, se $CH_1 = R_1\\sin\\theta$?",
      dopo: "Il braccio dell'attrito è $R_1\\sin\\theta - x$, e il suo momento ha lo stesso verso di $C_1$, quindi compare con lo stesso segno. Controllo: se P arrivasse in $H_1$ il braccio sarebbe nullo, perché la retta dell'attrito passerebbe per $O_1$.",
    },
    'd084.4': {
      tappa: 3,
      prima: "Vogliamo la forza normale. Nell'equazione ci sono due incognite, la normale e l'attrito, ma sono legate da Coulomb. Sostituisci $F_T = f F_N$ e $R_{f1} = R_1\\cos\\theta$, raccogli $F_N$ e dividi.",
      dopo: "La normale è la coppia diviso $R_1\\cos\\theta - f(R_1\\sin\\theta - x)$. Controllo: con f = 0 ritrovi la forza del caso liscio, $C_1/(R_1\\cos\\theta)$. Il denominatore deve restare positivo, e lo è per valori normali di f.",
    },
    'd084.5': {
      tappa: 3,
      prima: "Stesso equilibrio sulla ruota 2, con le reazioni. La normale ha braccio $R_{f2}$. Per l'attrito il braccio si misura lungo la retta fino a $H_2$: P sta dall'altra parte di C rispetto a $H_2$, quindi la distanza è $CH_2$ **più** x. Il momento dell'attrito si oppone alla rotazione della 2, come la coppia resistente.",
      dopo: "Si ottiene la normale in funzione di $C_2$, con un denominatore $R_2\\cos\\theta - f(R_2\\sin\\theta + x)$. Qui $C_2$ è il modulo della coppia resistente. Controllo: anche qui con f = 0 torni al caso liscio.",
    },
    'd084.6': {
      tappa: 3,
      prima: "Abbiamo due espressioni della stessa forza normale: per azione e reazione il modulo sulla ruota 1 e sulla ruota 2 è lo stesso. Uguagliale e ricava il rapporto fra la coppia resistente e quella motrice.",
      dopo: "Il rapporto delle coppie è il rapporto dei due denominatori. Controllo: con f = 0 vale $R_2/R_1$, come nel caso liscio. Con l'attrito, in proporzione, il numeratore cala più del denominatore, quindi la coppia d'uscita è un po' minore di quella ideale.",
    },
    'd084.7': {
      tappa: 3,
      prima: "Il rendimento istantaneo è potenza uscente diviso potenza entrante, cioè $|C_2||\\omega_2|$ su $|C_1||\\omega_1|$. Il rapporto delle velocità lo conosciamo: $R_1/R_2$. Moltiplicalo per il rapporto delle coppie, poi dividi numeratore per $R_2\\cos\\theta$ e denominatore per $R_1\\cos\\theta$.",
      dopo: "Si ottiene la formula della dispensa per l'accesso. Il numeratore è più piccolo del denominatore perché il termine con x è sottratto sopra e aggiunto sotto: il rendimento è minore di 1. Cala man mano che il contatto si allontana da C.",
    },
    'd084.8': {
      tappa: 3,
      prima: "In recesso P è oltre C, verso $H_2$. Due cose cambiano: lo strisciamento ha cambiato verso, quindi l'attrito sulla ruota 1 si oppone ora al moto, e il braccio dell'attrito rispetto a $O_1$ è la distanza da $H_1$, che adesso è $R_1\\sin\\theta + x$. Riscrivi l'equilibrio della ruota 1 con questi cambi.",
      dopo: "La normale in recesso ha un più nel denominatore: con lo stesso $C_1$ è un po' minore del caso liscio. La domanda 25 attribuisce questa formula alla dispensa senza dire che vale solo in recesso: è un dettaglio da ricordare.",
    },
    'd084.9': {
      tappa: 3,
      prima: "Ripeti gli stessi passi del caso di accesso con l'attrito invertito: equilibrio della ruota 2 con braccio $R_2\\sin\\theta - x$, uguaglianza delle normali, moltiplicazione per $R_1/R_2$ e raccoglimento dei termini con cos θ.",
      dopo: "È il rendimento di recesso, con i segni scambiati rispetto all'accesso. Anche qui il termine con x abbassa il numeratore e alza il denominatore, quindi il rendimento è minore di 1 e cala allontanandosi da C.",
    },
    'd084.10': {
      tappa: 3,
      prima: "Facciamo un controllo finale, il più importante: che cosa succede quando il contatto è proprio nel punto primitivo C, cioè x = 0? Sostituisci nelle due formule e guarda numeratore e denominatore.",
      dopo: "Diventano uguali e il rendimento vale 1, sia in accesso sia in recesso. Ha senso: in C i denti rotolano senza strisciare, e un attrito senza strisciamento non dissipa. Le perdite nascono solo allontanandosi da C.",
    },
    'd085.1': {
      tappa: 2,
      prima: "Partiamo da ciò che sappiamo dalla legge dell'ingranamento. Il moto del dente 2 visto dal dente 1 è, istante per istante, una rotazione attorno a un punto. Quale? Il punto dove le due ruote hanno la stessa velocità.",
      dopo: "È C, e la velocità relativa è $(\\omega_2 - \\omega_1) \\wedge (P - C)$. Tutto lo strisciamento è descritto da una rotazione relativa attorno al punto primitivo.",
    },
    'd085.2': {
      tappa: 2,
      prima: "Nelle ruote esterne $\\omega_1$ e $\\omega_2$ hanno versi opposti, quindi componenti lungo $\\underline k$ di segno opposto. Chiediti: quanto vale in modulo la differenza fra un numero positivo e uno negativo? Prova con 3 e −2.",
      dopo: "La differenza ha per modulo la somma dei moduli: 3 − (−2) = 5. Nelle ruote esterne lo strisciamento è quindi «sommato»: un dente gira in un verso, l'altro nell'altro, e uno scorre sull'altro più velocemente.",
    },
    'd085.3': {
      tappa: 2,
      prima: "Ora il prodotto vettoriale. $P - C$ sta sulla retta di pressione e ha lunghezza x; la velocità angolare relativa è perpendicolare al piano. Che direzione ha il prodotto, e che modulo, se i due vettori sono perpendicolari fra loro?",
      dopo: "La velocità di strisciamento vale $(|\\omega_1| + |\\omega_2|)x$ ed è perpendicolare alla retta di pressione, quindi tangente ai profili. Non ha componente normale: i denti non si staccano né si compenetrano, scivolano soltanto.",
    },
    'd085.4': {
      tappa: 2,
      prima: "Leggiamo la formula al variare di P. Che cosa succede quando il contatto passa proprio per C? E che cosa succede al vettore $P - C$ quando P passa da una parte all'altra di C?",
      dopo: "In C lo strisciamento è nullo: rotolamento puro. Prima e dopo C ha versi opposti, perché $P - C$ cambia verso. Cresce linearmente con la distanza: per avere poche perdite, il contatto deve restare vicino a C.",
    },
    'd085.5': {
      tappa: 2,
      prima: "Spesso conosci solo la velocità della motrice: scriviamo lo strisciamento in funzione di quella. Ricorda che in modulo $|\\omega_2| = |\\omega_1| R_1/R_2$. Sostituisci nella somma e raccogli $|\\omega_1|$.",
      dopo: "Lo strisciamento è $|\\omega_1|(1 + |\\tau|)x$. A parità di motrice, una condotta piccola, che gira veloce, fa strisciare di più. Con la dentiera, τ = 0, resta $|\\omega_1|x$.",
    },
    'd086.1': {
      tappa: 4,
      prima: "Quanta potenza si trasforma in calore? La forza normale non lavora nel moto relativo, perché i denti non si avvicinano né si allontanano lungo la normale. Resta l'attrito: la sua potenza è la forza d'attrito sulla ruota 1 per la velocità di 1 rispetto a 2. Scrivi la velocità relativa come rotazione attorno a C e permuta il prodotto misto.",
      dopo: "La potenza dell'attrito è negativa, perché la forza è opposta alla velocità relativa: è potenza tolta al sistema e trasformata in calore. La permutazione ciclica del prodotto misto è un trucco algebrico che non cambia il valore.",
    },
    'd086.2': {
      tappa: 4,
      prima: "Calcoliamo il modulo. Forza d'attrito e velocità relativa sono sulla stessa retta, in versi opposti: il prodotto scalare in modulo è il prodotto dei moduli. Sostituisci $|F_T| = f|F_N|$ e la velocità di strisciamento trovata prima.",
      dopo: "La potenza persa è $f F_N (|\\omega_1| + |\\omega_2|) x$: cresce con il coefficiente d'attrito, con il carico, con la velocità e con la distanza da C. Controllo: in C è nulla.",
    },
    'd086.3': {
      tappa: 4,
      prima: "La normale, con l'attrito, varia un poco con x, e questo complica i conti. Ma se f è piccolo la normale è quasi quella del caso liscio. La dispensa fa questa approssimazione: sostituisci $F_N \\simeq C_1/(R_1\\cos\\theta)$ e raccogli tutto ciò che non dipende da x in una costante K.",
      dopo: "La potenza persa è $Kx$: proporzionale alla distanza del contatto da C. K contiene f, la coppia e le velocità, che in regime sono costanti. È una legge semplice da ricordare e da disegnare.",
    },
    'd086.4': {
      tappa: 4,
      prima: "Come varia x nel tempo? Il punto di contatto è il punto della retta generatrice che srotola l'evolvente della ruota 1. Con che velocità avanza un filo che si srotola da un rocchetto che gira a $\\omega_1$? Con la velocità periferica del rocchetto, cioè della fondamentale.",
      dopo: "Il contatto avanza sulla retta a velocità costante $R_{f1}\\omega_1$, quindi x varia linearmente nel tempo. La potenza persa scende in linea retta da B a C, si annulla in C e risale fino ad A: un diagramma a V.",
    },
    'd086.5': {
      tappa: 4,
      prima: "L'energia persa mentre una coppia di denti percorre AB è l'integrale della potenza nel tempo, cioè l'area sotto il diagramma a V. Cambia variabile: il tempo dt è lo spazio percorso diviso la velocità costante $R_{f1}\\omega_1$. Ti restano due triangoli, uno di base BC e uno di base CA.",
      dopo: "L'energia è K per la somma dei quadrati di BC e CA, divisa per $2R_{f1}|\\omega_1|$. I quadrati dicono che i tratti lunghi pesano molto: conviene un segmento dei contatti corto e ben centrato su C.",
    },
  },
  racconto:
    "All'orale parti dal caso liscio: la forza fra i denti è lungo la retta di pressione, con braccio $R_{f1}$, quindi $C_1 = F R_{f1} = Q R_1$, con la tangenziale $Q = F\\cos\\theta$ che trasmette la coppia e la radiale $F\\sin\\theta$ che carica i supporti. Poi l'attrito: la velocità relativa è una rotazione attorno a C, di modulo $(|\\omega_1| + |\\omega_2|)x$, perpendicolare alla retta; l'attrito è opposto e cambia verso in C. Negli equilibri ha braccio $R\\sin\\theta \\mp x$, e il rendimento istantaneo vale 1 in C e cala in accesso e in recesso. Chiudi con la potenza dissipata, $Kx$, con il diagramma a V lungo AB.",
};

// ------------------------------------------------------------------ c5-rotismi-ordinari
const rotismiOrdinari: LezioneArgomento = {
  perche:
    "Con una sola coppia di ruote non si può ridurre la velocità di molto: per avere un rapporto 1/50 servirebbe una ruota cinquanta volte più grande del pignone, enorme. La soluzione, che trovi nel cambio di un'auto o nel riduttore di un tergicristallo, è mettere più ingranaggi in fila: ogni coppia riduce un po', e le riduzioni si accumulano. La domanda della lezione è: **quanto vale il rapporto di trasmissione di una catena di ingranaggi, con che segno, e quanta coppia arriva all'albero d'uscita?** E una curiosità: a che cosa serve una ruota messa in mezzo che non cambia il rapporto?",
  idea:
    "Un rotismo è ordinario quando tutte le ruote girano attorno ad assi fissi, montati sul telaio. L'idea chiave è semplicissima: due ruote calettate sullo stesso albero girano insieme, con la stessa velocità angolare. Così l'uscita del primo ingranaggio diventa l'ingresso del secondo, e i rapporti si **moltiplicano**, come quando fai uno sconto del 50% e poi un altro del 50%: alla fine paghi un quarto.\n\nIl segno conta: se scegli un verso positivo comune per tutte le ω, ogni ingranaggio esterno inverte il verso (rapporto negativo) e ogni ingranaggio interno lo conserva (positivo). Il segno del prodotto ti dice subito come gira l'uscita rispetto all'ingresso. Per le coppie basta il bilancio delle potenze: senza perdite la potenza che entra esce tutta, quindi se la velocità cala la coppia cresce nella stessa proporzione. Una ruota «oziosa», che ingrana con due ruote insieme, si semplifica nel prodotto: non cambia il valore del rapporto, cambia solo il verso.",
  richiami: [
    { titolo: 'Rapporto di trasmissione di un ingranaggio', testo: "Per due ruote in presa il rapporto è velocità d'uscita su velocità d'entrata, $\\tau = \\omega_2/\\omega_1 = -z_1/z_2$ per ruote esterne, che girano in versi opposti, e $+z_1/z_2$ per una ruota che ingrana con una corona interna, che gira nello stesso verso." },
    { titolo: 'Teorema delle forze vive in regime', testo: "In regime l'energia cinetica è costante, quindi la somma delle potenze di tutte le forze e coppie è zero. Le forze fra i denti sono interne al rotismo e, senza perdite, non dissipano. Restano solo la coppia motrice e quella d'uscita: $C_1\\omega_1 + C_u\\omega_u = 0$." },
    { titolo: 'Equilibrio alla rotazione di un albero', testo: "Un albero che gira a velocità costante ha somma dei momenti nulla attorno al suo asse. Le forze dei denti si scompongono in tangenziale e radiale: la radiale passa per l'asse e non fa momento; la tangenziale ha braccio uguale al raggio primitivo." },
    { titolo: 'Schema unifilare', testo: "È il modo di disegnare i rotismi «di profilo»: ogni albero è una linea, ogni ruota un segmento perpendicolare all'albero, lungo quanto il suo diametro, e i supporti sono piccoli simboli sul telaio. Si vede a colpo d'occhio quali ruote stanno sullo stesso albero e quali ingranano." },
  ],
  ipotesiPerche: [
    "Assi fissi è la definizione di rotismo ordinario: se un asse si muovesse saremmo in un rotismo epicicloidale. Il verso positivo comune permette di dare un segno a ogni rapporto e quindi al prodotto.",
    "È la struttura che permette di concatenare i rapporti: le ruote sullo stesso albero hanno la stessa ω, e l'uscita di un ingranaggio diventa l'ingresso del successivo.",
    "Senza accelerazioni e senza perdite la potenza entra ed esce intera, e la coppia d'uscita si ricava subito dal rapporto di trasmissione.",
  ],
  disegnoGuida:
    "Disegna quattro ruote con gli assi fissi: la ruota 1 sull'albero d'ingresso, che ingrana con la 2; la 3 sullo stesso albero della 2, e ingrana con la 4, sull'albero d'uscita. Segna che 2 e 3 sono solidali, per esempio con un unico albero che le attraversa, e scrivi $\\omega_2 = \\omega_3$. Metti le frecce dei versi: a ogni ingranaggio esterno il verso si inverte, quindi 1 e 4 girano nello stesso verso. Disegna la coppia motrice $C_1$ sull'albero d'ingresso e la coppia $C_4$ sull'albero d'uscita, con verso opposto a $C_1$. Sotto, rifai lo stesso rotismo come schema unifilare: alberi orizzontali, ruote come segmenti verticali, supporti. Nei contatti segna le forze tangenziali Q, uguali e opposte sulle due ruote.",
  mappa: [
    'Scelgo un verso positivo comune e do un segno a ogni rapporto.',
    'Le ruote sullo stesso albero hanno la stessa ω: i rapporti si moltiplicano.',
    'Trovo la coppia d\'uscita con il bilancio delle potenze.',
    'Lo verifico con l\'equilibrio di ogni albero.',
    'Casi speciali: la corona interna e la ruota oziosa.',
  ],
  dims: {
    d087: {
      introduzione:
        "Abbiamo due ingranaggi in serie con un albero intermedio che porta le ruote 2 e 3. La strategia è: dare un segno a ogni rapporto, scrivere i due rapporti, usare il fatto che 2 e 3 hanno la stessa ω per concatenarli, e poi trovare la coppia d'uscita in due modi, con il bilancio delle potenze e con l'equilibrio dei singoli alberi. Alla fine vediamo cosa cambia con una corona interna.",
      riepilogo:
        "Ogni ingranaggio ha il suo rapporto con segno: negativo se esterno, positivo se interno. Siccome 2 e 3 girano insieme, moltiplicando i due rapporti la velocità intermedia si semplifica: il rapporto globale è il prodotto. Due ingranaggi esterni danno un segno positivo. Il bilancio delle potenze dà la coppia d'uscita $-C_1/\\tau$, e l'equilibrio dei tre alberi conferma lo stesso risultato. Con una corona interna il segno globale cambia, ma $C_4 = -C_1/\\tau$ resta vera.",
    },
    d088: {
      introduzione:
        "Una ruota b ingrana contemporaneamente con a e con c, ma non porta nessuna coppia esterna: è una ruota oziosa. La strategia è applicare la regola del prodotto ai due ingranaggi in serie, vedere che i denti di b si semplificano, e poi trovare la coppia su c con il bilancio delle potenze. Infine confrontiamo con il caso senza ruota oziosa.",
      riepilogo:
        "La ruota oziosa forma due ingranaggi esterni in serie. Nel prodotto dei rapporti i suoi denti compaiono una volta sopra e una volta sotto e si semplificano: il rapporto dipende solo da a e c, ed è positivo. Senza oziosa sarebbe negativo, con lo stesso modulo: la ruota oziosa serve a invertire il verso dell'uscita e, scegliendo il suo raggio, a collegare alberi distanti. La coppia su c segue la solita regola $-C_1/\\tau$.",
    },
  },
  passi: {
    'd087.1': {
      tappa: 0,
      prima: "In un rotismo con tante ruote è facile perdersi con i versi. Il modo sicuro è scegliere una volta per tutte un verso positivo comune per tutte le velocità angolari, per esempio antiorario visto da un lato. Allora ogni rapporto ha un segno. Chiediti: quando è negativo e quando positivo?",
      dopo: "Negativo per un ingranaggio esterno, dove le ruote girano in versi opposti; positivo per un ingranaggio interno, con la corona, dove girano nello stesso verso. Il segno è un'informazione in più: dice il verso, non solo quanto si riduce.",
    },
    'd087.2': {
      tappa: 0,
      prima: "Scrivi il rapporto del primo ingranaggio, fra la ruota 1 e la ruota 2. Sono ruote esterne, quindi ricorda il segno. Usa sia i raggi sia i denti: hanno lo stesso modulo, quindi stanno nello stesso rapporto.",
      dopo: "Il primo rapporto è $-z_1/z_2$: la ruota 2 gira al contrario della 1, più piano se ha più denti. È la formula dell'ingranaggio singolo, niente di nuovo.",
    },
    'd087.3': {
      tappa: 1,
      prima: "Ora guarda le ruote 2 e 3 nel disegno. Sono calettate sullo stesso albero, cioè fissate rigidamente a esso. Se l'albero fa un giro, quanti giri fanno la 2 e la 3? E nello stesso verso o in versi opposti?",
      dopo: "Girano insieme: stessa velocità angolare, in modulo e in verso. È la riga che «aggancia» i due ingranaggi: l'uscita del primo è l'ingresso del secondo.",
    },
    'd087.4': {
      tappa: 1,
      prima: "Scrivi il rapporto del secondo ingranaggio, fra la 3 e la 4, anche questo esterno. Poi sfrutta la riga precedente: al posto di $\\omega_3$ puoi scrivere $\\omega_2$.",
      dopo: "Il secondo rapporto è $-z_3/z_4$, e si può leggere come $\\omega_4/\\omega_2$. Ora abbiamo due rapporti che condividono la velocità intermedia: il passo successivo li unisce.",
    },
    'd087.5': {
      tappa: 1,
      prima: "Vogliamo il rapporto globale, $\\omega_4/\\omega_1$. Il trucco è moltiplicare e dividere per la velocità intermedia $\\omega_2 = \\omega_3$: così la frazione si spezza in due frazioni che conosci. Poi moltiplica i due rapporti, segni compresi.",
      dopo: "Il rapporto globale è il prodotto dei rapporti dei singoli ingranaggi: $z_1z_3/(z_2z_4)$, positivo. Controllo: due inversioni di verso si annullano, quindi la 4 gira come la 1. Le ruote motrici (1 e 3) stanno al numeratore, le condotte (2 e 4) al denominatore.",
    },
    'd087.6': {
      tappa: 2,
      prima: "Ora la coppia d'uscita. In regime, senza perdite, che cosa dice il bilancio delle potenze? La potenza entra dall'albero 1 ed esce dall'albero 4. Le forze fra i denti e l'albero intermedio sono interni al rotismo e non compaiono. Scrivi la somma delle due potenze e ricava $C_4$.",
      dopo: "La coppia d'uscita è $-C_1/\\tau$. Con τ positivo ha verso opposto a $C_1$, perché è resistente su un albero che gira come l'1. In modulo, se il rotismo riduce la velocità di 10 volte, moltiplica la coppia di 10 volte.",
    },
    'd087.7': {
      tappa: 3,
      prima: "Verifichiamo con le forze, albero per albero, nello schema unifilare. Per ogni albero scrivi l'equilibrio alla rotazione: quali forze fanno momento? Solo le componenti tangenziali Q, con braccio uguale al raggio primitivo; le radiali passano per l'asse. Sull'albero intermedio non c'è coppia esterna. E le Q di due ruote in presa come sono legate?",
      dopo: "Abbiamo tre equazioni di equilibrio, una per albero, più due relazioni di azione e reazione. Sull'albero intermedio le due forze tangenziali si bilanciano da sole. Sono cinque equazioni lineari, facili da risolvere in catena.",
    },
    'd087.8': {
      tappa: 3,
      prima: "Risolvi in catena partendo dall'ingresso: dalla prima equazione ricavi $Q^{2,1}$; con azione e reazione passi alla ruota 2; l'albero intermedio ti dà la forza sulla 3; di nuovo azione e reazione, e l'ultima equazione ti dà $C_4$.",
      dopo: "Si ritrova $C_4 = -C_1/\\tau$, lo stesso risultato del bilancio delle potenze. Attenzione a un errore comune: il fattore $R_2R_4/(R_1R_3)$ è $1/\\tau$, non τ. Controllo: se il rotismo riduce, la coppia d'uscita deve essere più grande.",
    },
    'd087.9': {
      tappa: 4,
      prima: "Che cosa cambia se la ruota 4 è una corona con dentatura interna? Il secondo ingranaggio è ora interno: che segno ha il suo rapporto? Rifai il prodotto dei due rapporti e poi applica la stessa formula per la coppia.",
      dopo: "Il secondo rapporto diventa positivo e il globale negativo: la 4 gira al contrario della 1. La coppia d'uscita ha ora lo stesso verso di $C_1$. Ma la regola $C_4 = -C_1/\\tau$ resta vera: basta usare τ con il suo segno.",
    },
    'd088.1': {
      tappa: 4,
      prima: "La ruota b ingrana con a da una parte e con c dall'altra. Pensala come due ingranaggi esterni in serie che condividono la ruota b, la quale fa da condotta nel primo e da motrice nel secondo. Scrivi i due rapporti con il loro segno.",
      dopo: "I due rapporti sono $-z_a/z_b$ e $-z_b/z_c$. Nota che $z_b$ compare al denominatore del primo e al numeratore del secondo: è il segnale che sta per semplificarsi.",
    },
    'd088.2': {
      tappa: 4,
      prima: "Applica la regola del prodotto: il rapporto fra c e a è il prodotto dei due rapporti. Moltiplica, facendo attenzione ai due segni meno, e guarda che cosa succede a $z_b$.",
      dopo: "Il rapporto globale è $z_a/z_c$, positivo: c gira come a. I denti della ruota oziosa sono spariti. Controllo: è come se a e c ingranassero direttamente, ma con il verso invertito.",
    },
    'd088.3': {
      tappa: 4,
      prima: "Prova a cambiare la ruota oziosa con una più grande o più piccola, cioè con un altro numero di denti. Che cosa succede al rapporto fra a e c, visto che $z_b$ si è semplificato?",
      dopo: "Il rapporto non cambia: la ruota oziosa non altera il valore del rapporto, solo il suo segno. Per questo si chiama «oziosa»: non lavora sul rapporto.",
    },
    'd088.4': {
      tappa: 4,
      prima: "Troviamo la coppia sulla ruota c. La ruota oziosa gira folle sul suo albero, senza coppie esterne: non prende né dà potenza. Scrivi il bilancio delle potenze in regime con le sole coppie su a e su c, e ricava il loro rapporto.",
      dopo: "La coppia su c è $-C_1/\\tau$: con τ positivo ha verso opposto a $C_1$, e in modulo vale $|C_1| z_c/z_a$. Lo stesso risultato si ottiene con l'equilibrio delle tre ruote e le forze tangenziali.",
    },
    'd088.5': {
      tappa: 4,
      prima: "A che cosa serve, allora, la ruota oziosa? Confronta con il caso in cui a ingrana direttamente con c, senza b in mezzo. Che rapporto avresti, e con che segno?",
      dopo: "Senza oziosa il rapporto sarebbe $-z_a/z_c$: stesso modulo, segno opposto. Quindi la ruota oziosa serve a invertire il verso dell'uscita. È il principio della retromarcia in molti cambi.",
    },
    'd088.6': {
      tappa: 4,
      prima: "C'è anche un uso geometrico. Con le tre ruote in fila, quanto distano i centri di a e c? Somma i tratti: dal centro di a al contatto con b, poi tutto il diametro di b, poi dal contatto al centro di c.",
      dopo: "L'interasse fra a e c è $R_a + 2R_b + R_c$: dipende da $R_b$. Scegliendo i denti della ruota oziosa puoi collegare due alberi lontani senza cambiare il modulo del rapporto. Questo lo dicono le fonti derivate; la dispensa parla solo del verso.",
    },
  },
  racconto:
    "All'orale definisci il rotismo ordinario: tutti gli assi fissi. Scegli un verso positivo comune e dai un segno a ogni rapporto, negativo per gli ingranaggi esterni e positivo per quelli interni. Poi l'idea chiave: le ruote sullo stesso albero hanno la stessa ω, quindi moltiplicando e dividendo per la velocità intermedia il rapporto globale è il prodotto, $\\tau = \\omega_u/\\omega_1 = \\prod \\tau_J$. Con la T.F.V. in regime ricavi $C_u = -C_1/\\tau$ e lo confermi con l'equilibrio degli alberi, usando solo le forze tangenziali. Chiudi con la ruota oziosa: i suoi denti si semplificano, il rapporto resta $z_a/z_c$ ma cambia segno, quindi serve a invertire il verso.",
};

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c5-ruote-dentate': ruoteDentate,
  'c5-denti-presa': dentiPresa,
  'c5-interferenza': interferenza,
  'c5-forze-dritti': forzeDritti,
  'c5-rotismi-ordinari': rotismiOrdinari,
};
