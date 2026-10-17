/** Lezioni discorsive del capitolo C7, parte a (docs/BRIEF_LEZIONI.md): c7-libere, c7-smorzate, c7-complex. */
import type { LezioneArgomento } from '../types';

// ------------------------------------------------------------------ c7-libere
const libere: LezioneArgomento = {
  perche:
    "Prendi un'auto e spingi giù con forza su un angolo, poi lascia andare: la carrozzeria sale e scende qualche volta prima di fermarsi. Oppure pizzica la corda di una chitarra: vibra sempre con la stessa nota, che tu la pizzichi forte o piano. Dentro c'è sempre lo stesso schema: una massa e qualcosa di elastico che la riporta indietro. La domanda che guida la lezione è: **una massa attaccata a una molla, spostata e lasciata andare, come si muove? E da che cosa dipende la frequenza con cui oscilla: dalla massa, dalla molla o da quanto forte l'ho spostata?**",
  idea:
    "Immagina la massa tirata un po' verso destra, con la molla allungata. La molla la richiama verso sinistra. La massa accelera, prende velocità e, quando passa per la posizione di riposo, non si ferma: ha inerzia, quindi va oltre e comprime la molla. Ora la molla la spinge indietro, e così via.\n\nSe guardi l'energia, tutto diventa chiaro. Agli estremi la massa è ferma e tutta l'energia sta nella molla deformata (energia elastica). Al centro la molla è scarica e tutta l'energia è nel movimento (energia cinetica). L'energia passa avanti e indietro fra due «serbatoi». Senza attriti non se ne perde niente, quindi l'oscillazione dura per sempre con la stessa ampiezza.\n\nE la frequenza? Una molla più rigida richiama più forte, quindi l'oscillazione è più rapida. Una massa più grande è più pigra da mettere in moto, quindi è più lenta. Vedremo che la frequenza dipende solo da questi due ingredienti, $\\omega_m = \\sqrt{K/m}$, e non da quanto forte hai spostato la massa.",
  richiami: [
    { titolo: 'Legge di Hooke', testo: "Una molla deformata reagisce con una forza proporzionale alla deformazione e opposta ad essa: se la allunghi di $x$, tira indietro con $F = -Kx$. $K$ è la rigidezza, in N/m: dice quanti newton servono per allungarla di un metro. Il segno meno dice che la forza punta sempre verso la posizione di riposo." },
    { titolo: "Teorema dell'energia cinetica", testo: "La rapidità con cui cambia l'energia cinetica di un corpo è uguale alla potenza di tutte le forze che agiscono su di esso. Le forze conservative (come la molla) si possono «spostare a sinistra» come energia potenziale: allora la derivata dell'energia meccanica totale $E_K + E_P$ è uguale solo alla potenza delle forze non conservative, cioè quelle che dissipano (attrito, smorzatori)." },
    { titolo: 'Derivata di un quadrato (regola della catena)', testo: "Se una grandezza dipende dal tempo, la derivata del suo quadrato è due volte la grandezza per la sua derivata: $\\frac{d}{dt}x^2 = 2x\\dot x$. Il «2» che esce si semplifica con l'½ che sta davanti alle energie. Allo stesso modo $\\frac{d}{dt}\\dot x^2 = 2\\dot x\\ddot x$." },
    { titolo: "Formula di Eulero e numeri complessi", testo: "Un esponenziale con esponente immaginario è un punto che gira su una circonferenza di raggio 1: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$. Sommando $e^{i\\theta}$ e il suo coniugato $e^{-i\\theta}$, le parti immaginarie si cancellano e resta $2\\cos\\theta$. Per questo esponenziali immaginari e oscillazioni sono la stessa cosa scritta in due modi." },
    { titolo: 'Equazioni differenziali lineari', testo: "Un'equazione come $m\\ddot x + Kx = 0$ è lineare: se due funzioni la risolvono, anche ogni loro combinazione la risolve. Per questo basta trovare due soluzioni «base» e combinarle con due costanti, che poi si fissano con la posizione e la velocità iniziali." },
  ],
  ipotesiPerche: [
    "Il modello più semplice possibile: un solo numero, la posizione $x_G$ della massa, descrive tutto il sistema. Per questo si dice «un grado di libertà».",
    "Con la molla lineare l'equazione resta lineare e risolvibile esattamente. Togliendo attrito e smorzamento nessuna energia si perde, quindi isoliamo il puro scambio molla–massa.",
    "Misurare da dove la molla è scarica (o da dove la massa sta ferma in verticale) rende l'equazione più semplice: la forza della molla è subito $-Kx$, senza costanti in più.",
    "Le forze oscillano e non sappiamo in anticipo da che parte puntano: le disegniamo tutte nel verso positivo e lasciamo che siano i segni nelle formule a dire la verità.",
  ],
  disegnoGuida:
    "Parti dalla parete fissa a sinistra, tratteggiata: è il telaio, il punto che non si muove. Da lì disegna la molla a zig-zag con la sua K, poi il blocco m con il baricentro G, appoggiato fra due guide orizzontali: le guide dicono che la massa si muove solo in orizzontale. Disegna l'asse x verso destra e segna l'origine dove la molla è scarica: è da lì che misuri lo spostamento. Ora le forze: lungo x metti $F_{el}$ e $F_{in}$, entrambe nel verso positivo (convenzione della dispensa); in verticale il peso mg verso il basso e la reazione $F_n$ verso l'alto, che si bilanciano. Se ti chiedono il caso verticale, disegna accanto la molla appesa al soffitto con la lunghezza a riposo $l_0$, la freccia statica $x^{ST}$ e la coordinata $x'$ misurata dall'equilibrio.",
  mappa: [
    "Scrivo le forze e uso il bilancio dell'energia per arrivare all'equazione del moto.",
    "Controllo il caso verticale: il peso sposta solo il centro dell'oscillazione.",
    "Risolvo l'equazione cercando esponenziali: trovo la pulsazione naturale.",
    "Costruisco la soluzione reale e la adatto a come parte la massa.",
    "Guardo l'energia: cambia forma ma non quantità, finché non c'è uno smorzatore.",
  ],
  dims: {
    d111: {
      introduzione:
        "Vogliamo l'equazione che governa il moto della massa. La strada della dispensa passa per l'energia: scriviamo energia cinetica ed elastica, ne facciamo la derivata e imponiamo che, senza dissipazione, l'energia totale non cambi. Poi controlliamo con il semplice equilibrio delle forze, e infine vediamo che succede se la massa è appesa in verticale e il peso entra in gioco.",
      riepilogo:
        "Abbiamo scritto la forza della molla e quella d'inerzia, poi il bilancio dell'energia: senza dissipazione l'energia meccanica non cambia. Derivandola è uscito il prodotto fra la velocità e $(m\\ddot x_G + Kx_G)$; siccome la massa si muove, è la parentesi a dover essere nulla. Il controllo con l'equilibrio delle forze dà la stessa equazione. In verticale la molla è già allungata della freccia statica, che compensa il peso: misurando da lì l'equazione è identica.",
    },
    d112: {
      introduzione:
        "Ora che abbiamo l'equazione dobbiamo risolverla. La strategia è classica per le equazioni lineari a coefficienti costanti: proviamo una funzione esponenziale, perché le sue derivate sono proporzionali a lei stessa. Così l'equazione differenziale si trasforma in un'equazione algebrica in λ, e dalle sue radici leggiamo la pulsazione naturale.",
      riepilogo:
        "Abbiamo provato $e^{\\lambda t}$ e l'equazione è diventata $m\\lambda^2 + K = 0$. Siccome $\\lambda^2$ deve essere negativo, le radici sono immaginarie, $\\pm i\\omega_m$. Per Eulero un esponenziale immaginario è un'oscillazione, quindi la massa oscilla con pulsazione $\\omega_m = \\sqrt{K/m}$. Da lì periodo e frequenza, e un modo pratico per stimare $\\omega_m$ dalla sola freccia statica.",
    },
    d113: {
      introduzione:
        "Abbiamo due soluzioni complesse, ma la posizione della massa è un numero reale. Dobbiamo quindi combinarle in modo che la parte immaginaria sparisca, e poi decidere ampiezza e fase guardando come è partita la massa: dove si trovava e con che velocità. È il problema di Cauchy.",
      riepilogo:
        "Abbiamo combinato le due soluzioni con costanti coniugate, così la somma è reale ed è un coseno di ampiezza $C$ e fase $\\alpha$. Le condizioni iniziali fissano queste due costanti: con la massa lasciata ferma in $x_0$ si trova $x_0\\cos(\\omega_m t)$. Con una velocità iniziale l'ampiezza cresce e compare una fase. La frequenza però non cambia mai: la decide il sistema, non come lo perturbi.",
    },
    d114: {
      introduzione:
        "Qui facciamo il percorso al contrario rispetto alla dispensa: partiamo dall'equazione del moto e mostriamo che contiene la conservazione dell'energia. Il trucco è moltiplicare per la velocità, così ogni forza diventa una potenza. Poi calcoliamo quanto vale l'energia e vediamo cosa cambia quando aggiungiamo uno smorzatore.",
      riepilogo:
        "Moltiplicando l'equazione per la velocità abbiamo riconosciuto la derivata dell'energia cinetica più quella elastica: la loro somma ha derivata nulla, quindi è costante e vale $\\tfrac12 KC^2$. Agli estremi è tutta nella molla, al centro tutta nel movimento. Con uno smorzatore la potenza dissipata $-c\\dot x^2$ è sempre negativa, e l'energia cala a ogni ciclo: è il ponte verso le vibrazioni smorzate.",
    },
  },
  passi: {
    'd111.1': {
      tappa: 0,
      prima: "Prima di tutto ci servono le forze che agiscono lungo x. La molla tira in proporzione a quanto è allungata: l'allungamento è la differenza fra gli spostamenti dei suoi due estremi. Un estremo è sulla parete, che non si muove; l'altro si muove con la massa. Poi c'è la massa stessa, che per d'Alembert entra con una forza d'inerzia, opposta all'accelerazione.",
      dopo: "La molla dà $-Kx_G$: se la massa va a destra ($x_G > 0$), la molla tira a sinistra. La forza d'inerzia è $-m\\ddot x_G$. Entrambe sono scritte come se puntassero nel verso positivo: sono i segni a dire il verso vero. Controllo: con $x_G = 0$ la molla è scarica e non tira.",
    },
    'd111.2': {
      tappa: 0,
      prima: "Invece di scrivere subito l'equilibrio delle forze, la dispensa usa l'energia. Parti dal teorema dell'energia cinetica: la variazione di energia cinetica è la potenza di tutte le forze. Separale in conservative e non conservative. La potenza delle conservative si può esprimere come variazione di un'energia potenziale: con quale segno, se la molla che si scarica restituisce energia?",
      dopo: "La riga dice che l'energia meccanica totale, cinetica più potenziale, cambia solo per colpa delle forze non conservative. Il segno giusto è $W^{CONS} = -dE_P/dt$: quando la molla si scarica la sua energia cala e la massa accelera. La dispensa scrive il più, ma è un refuso: la riga dopo usa la somma, che è corretta.",
    },
    'd111.3': {
      tappa: 0,
      prima: "Ora scriviamo esplicitamente le due energie: cinetica della massa, $\\tfrac12 m\\dot x_G^2$, ed elastica della molla, $\\tfrac12 Kx_G^2$. Dobbiamo derivarle nel tempo. Attenzione: sono quadrati di funzioni del tempo, quindi serve la regola della catena. Chiediti che cosa esce derivando e che fattore hanno in comune i due termini.",
      dopo: "Derivando ogni quadrato esce un 2 che si mangia l'½, più la derivata interna. Il primo termine dà $m\\dot x_G\\ddot x_G$, il secondo $Kx_G\\dot x_G$. Entrambi contengono la velocità, che si raccoglie. Controllo dimensionale: forza per velocità, cioè una potenza, come deve essere la derivata di un'energia.",
    },
    'd111.4': {
      tappa: 0,
      prima: "Senza attrito né smorzatore, quali forze non conservative restano? Il peso e la reazione del piano sono verticali, perpendicolari al moto: non fanno lavoro. Quindi il secondo membro è zero. Ci resta un prodotto nullo in ogni istante: velocità per parentesi. Quale dei due fattori può essere zero sempre, anche mentre la massa si muove?",
      dopo: "La velocità non è sempre nulla, altrimenti la massa starebbe ferma. Quindi è la parentesi a essere zero in ogni istante: $m\\ddot x_G + Kx_G = 0$. È l'equazione dell'oscillatore armonico semplice. Controllo di buon senso: se $x_G > 0$, l'accelerazione è negativa, cioè la molla riporta la massa verso il centro.",
    },
    'd111.5': {
      tappa: 0,
      prima: "Verifichiamo lo stesso risultato per un'altra strada, più diretta: l'equilibrio dinamico di d'Alembert. Lungo x la somma della forza della molla e della forza d'inerzia deve essere zero. Hai già scritto entrambe nel primo passo: basta sommarle e uguagliare a zero.",
      dopo: "Esce la stessa equazione con tutti i segni cambiati, quindi è identica. Due strade diverse, stesso risultato: buon segno. La dispensa nota anche che è lineare, a coefficienti costanti e non dipende dal tempo: queste proprietà ci permettono di risolverla con un esponenziale.",
    },
    'd111.6': {
      tappa: 1,
      prima: "Ora mettiamo la molla in verticale, con la massa appesa e l'asse x verso il basso. Il peso tira giù sempre, con forza costante. Prima di guardare il moto chiediti: dove sta ferma la massa? In quiete l'unica forza che può bilanciare il peso è la molla, che quindi deve essere già un po' allungata. Scrivi l'equilibrio statico.",
      dopo: "La molla, in quiete, è allungata della freccia statica $x^{ST} = mg/K$. Controllo: massa più grande, freccia più grande; molla più rigida, freccia più piccola. Il segno è positivo, cioè la molla si allunga verso il basso, come si vede. La dispensa scrive $mg + Kx^{ST} = 0$, ma il risultato giusto che riporta conferma che è un refuso.",
    },
    'd111.7': {
      tappa: 1,
      prima: "Conviene misurare l'oscillazione non dalla molla scarica ma dalla posizione di equilibrio statico. Introduci una nuova coordinata $x'$, la distanza dall'equilibrio: lo spostamento totale è $x'$ più la freccia statica. Poiché la freccia è costante, che succede a velocità e accelerazione? Poi riscrivi l'equilibrio dinamico con l'allungamento totale della molla.",
      dopo: "Velocità e accelerazione sono le stesse nelle due coordinate, perché la derivata di una costante è zero. Nell'equilibrio compaiono inerzia, molla con l'allungamento totale $x' + x^{ST}$ e peso. Per ora sembra che il peso resti dentro l'equazione: il passo successivo mostra che non è così.",
    },
    'd111.8': {
      tappa: 1,
      prima: "Guarda la riga precedente: compaiono due termini costanti, $-Kx^{ST}$ e $+mg$. Ricordi quanto vale $Kx^{ST}$ dal passo dell'equilibrio statico? Sostituiscilo e guarda che cosa resta.",
      dopo: "I due termini costanti si cancellano esattamente e resta $m\\ddot x' + Kx' = 0$, identica al caso orizzontale. Il peso sposta il centro dell'oscillazione più in basso, ma non cambia la frequenza. Vale per qualunque forza costante: è il riquadro della dispensa a p. 210.",
    },
    'd112.1': {
      tappa: 2,
      prima: "Abbiamo un'equazione che lega la funzione $x$ alla sua derivata seconda. Che funzione conosci che, derivata, resta uguale a se stessa a meno di un fattore? Se la troviamo, tutte le derivate saranno multipli della funzione e potremo raccogliere.",
      dopo: "Proviamo $x = e^{\\lambda t}$, con λ ancora da trovare. Si chiama ansatz, cioè «tentativo». Derivare l'esponenziale significa solo moltiplicarlo per λ: questa proprietà trasforma derivate in potenze di λ. Se il tentativo funziona, l'equazione ci dirà quali λ vanno bene.",
    },
    'd112.2': {
      tappa: 2,
      prima: "Sostituisci il tentativo nell'equazione $m\\ddot x + Kx = 0$. Ti serve la derivata seconda: derivare due volte un esponenziale vuol dire moltiplicarlo due volte per λ. Poi nota che entrambi i termini contengono lo stesso esponenziale e raccoglilo.",
      dopo: "Ora l'equazione è un prodotto: un polinomio in λ per l'esponenziale. Abbiamo trasformato un'equazione differenziale in una moltiplicazione. Controllo: se λ fosse zero resterebbe $K e^{0} = K \\neq 0$, quindi una costante non risolve l'equazione, com'è giusto: la molla non lascia la massa ferma fuori dall'equilibrio.",
    },
    'd112.3': {
      tappa: 2,
      prima: "Un prodotto è zero se lo è uno dei fattori. L'esponenziale, però, non vale mai zero. Quindi deve annullarsi il polinomio. Risolvi $m\\lambda^2 + K = 0$ e guarda il segno di $\\lambda^2$: con massa e rigidezza positive, che tipo di numero può essere λ?",
      dopo: "$\\lambda^2 = -K/m$ è negativo, quindi λ è immaginario puro: $\\pm i\\omega_m$, con $\\omega_m = \\sqrt{K/m}$. È la pulsazione naturale, in rad/s. Controllo: più K, più veloce; più m, più lenta. Se avessimo radici reali avremmo esponenziali che crescono o calano, non oscillazioni.",
    },
    'd112.4': {
      tappa: 2,
      prima: "Che cosa vuol dire, fisicamente, un esponenziale con esponente immaginario? Ricorda la formula di Eulero: un esponenziale immaginario è un punto che gira sulla circonferenza unitaria. Applicala alle due soluzioni che abbiamo trovato.",
      dopo: "Le due soluzioni sono coseno più o meno i seno di $\\omega_m t$: cioè oscillazioni con pulsazione $\\omega_m$. Ecco perché $\\omega_m$ è la pulsazione a cui il sistema oscilla da solo, qualunque sia il modo in cui lo abbiamo fatto partire. Resta da ottenere una soluzione reale, nella prossima dimostrazione.",
    },
    'd112.5': {
      tappa: 2,
      prima: "Dalla pulsazione passiamo a grandezze più intuitive. Il coseno si ripete quando il suo argomento cresce di un giro intero, $2\\pi$. Dopo quanto tempo $\\omega_m t$ aumenta di $2\\pi$? E quante oscillazioni ci stanno in un secondo?",
      dopo: "Il periodo $T_m$ è il tempo di un'oscillazione completa, in secondi; la frequenza $f_m$ è il numero di oscillazioni al secondo, in hertz. Pulsazione e frequenza differiscono di $2\\pi$: attenzione a non confonderle. Controllo: una molla molto rigida dà $\\omega_m$ grande, quindi periodo breve.",
    },
    'd112.6': {
      tappa: 2,
      prima: "Un'osservazione pratica: nel caso verticale abbiamo trovato $Kx^{ST} = mg$. Ricava da lì il rapporto $K/m$ in funzione della freccia statica e di g, e sostituiscilo nella pulsazione naturale.",
      dopo: "Basta misurare di quanto si abbassa la massa appesa per sapere a che frequenza oscillerà, senza conoscere né m né K. È la forma usata nel grafico di p. 220. Controllo: una sospensione molto morbida (freccia grande) oscilla lentamente, come i vecchi materassi o le auto con sospensioni morbide.",
    },
    'd113.1': {
      tappa: 3,
      prima: "Abbiamo due soluzioni, $e^{i\\omega_m t}$ ed $e^{-i\\omega_m t}$. L'equazione è lineare: che cosa puoi dire di una loro combinazione con due costanti qualsiasi? Quante costanti servono per un'equazione del secondo ordine?",
      dopo: "La soluzione generale è la combinazione delle due, con due costanti $C_1$ e $C_2$. Sono due perché dovremo rispettare due condizioni: posizione e velocità iniziali. Per ora però le costanti possono essere complesse e la somma è complessa: non può essere ancora la posizione di una massa vera.",
    },
    'd113.2': {
      tappa: 3,
      prima: "Lo spostamento è un numero reale. Come devono essere le due costanti perché la somma non abbia parte immaginaria? Pensa a due numeri complessi che, sommati, danno un reale: le loro parti immaginarie devono essere opposte e quelle reali uguali. Come si chiama questa coppia?",
      dopo: "$C_2$ deve essere il coniugato di $C_1$. Scrivendo $C_1$ in forma polare, modulo $A$ e argomento $\\alpha$, il coniugato ha lo stesso modulo e argomento opposto. Così le due costanti complesse sono diventate due numeri reali, $A$ e $\\alpha$: sono questi che fisseremo con le condizioni iniziali.",
    },
    'd113.3': {
      tappa: 3,
      prima: "Sostituisci le costanti nella soluzione e metti insieme gli esponenti: in ciascun termine $\\alpha$ e $\\omega_m t$ si sommano. Ti ritrovi la somma di un esponenziale immaginario e del suo coniugato. Che cosa dà questa somma per la formula di Eulero?",
      dopo: "La somma vale due volte il coseno: la soluzione è un coseno di ampiezza $C = 2A$ e fase $\\alpha$. È reale, come volevamo. Nel secondo addendo la dispensa dimentica una $i$ all'esponente, ma il risultato che scrive è corretto.",
    },
    'd113.4': {
      tappa: 3,
      prima: "Ora decidiamo $C$ e $\\alpha$ guardando come parte la massa. La dispensa sceglie il caso più semplice: massa spostata di $x_0$ e lasciata ferma. Scrivi la posizione in $t = 0$ e la velocità in $t = 0$, derivando il coseno. Comincia dall'equazione della velocità: che cosa ti dice su $\\alpha$?",
      dopo: "La velocità nulla impone $\\sin\\alpha = 0$, quindi $\\alpha = 0$. Allora la posizione dà $C = x_0$. Ampiezza e fase dipendono da come perturbiamo il sistema, non dal sistema. La dispensa perde il meno davanti alla velocità, ma conta poco perché l'equazione è uguagliata a zero.",
    },
    'd113.5': {
      tappa: 3,
      prima: "Mettiamo insieme: con $C = x_0$ e $\\alpha = 0$ scrivi la soluzione. Poi chiediti: se volessi scriverla con il seno invece del coseno, quale fase serve? Ricorda che seno e coseno sono la stessa curva spostata di un quarto di giro.",
      dopo: "La massa parte dal massimo e oscilla: $x_0\\cos(\\omega_m t)$. Con il seno la fase è $\\pi/2$, non zero: la dispensa a p. 212 lascia intendere lo stesso α, ma è sbagliato. Il coseno si usa perché si vede subito la partenza da ferma: tangente orizzontale in $t = 0$.",
    },
    'd113.6': {
      tappa: 3,
      prima: "La domanda d'esame chiede anche il caso generale: massa spostata di $x_0$ e lanciata con velocità $v_0$. Le due condizioni diventano $C\\cos\\alpha = x_0$ e $-\\omega_m C\\sin\\alpha = v_0$. Per trovare $C$, eleva al quadrato e somma (seno quadro più coseno quadro fa uno); per trovare $\\alpha$, dividi.",
      dopo: "La soluzione è un coseno con ampiezza $x_0$ più un seno con ampiezza $v_0/\\omega_m$. Si sommano «come i cateti di un triangolo» perché sono sfasati di un quarto di periodo. Controllo: con $v_0 = 0$ ritrovi $C = x_0$ e $\\alpha = 0$. E $v_0/\\omega_m$ è una lunghezza, come deve essere.",
    },
    'd114.1': {
      tappa: 4,
      prima: "Ora vogliamo vedere l'energia. Partiamo dal risultato già ottenuto, l'equazione del moto senza smorzamento. La dispensa aveva fatto il cammino energia → equazione; qui facciamo il cammino inverso, per capire che le due cose sono equivalenti.",
      dopo: "È l'equazione dell'oscillatore armonico: inerzia più molla uguale a zero. Contiene tutta la fisica del problema. Il passo successivo mostra che dentro c'è anche la conservazione dell'energia, basta guardarla nel modo giusto.",
    },
    'd114.2': {
      tappa: 4,
      prima: "Come si passa da una forza a una potenza? Moltiplicando per la velocità. Allora moltiplica entrambi i membri dell'equazione per $\\dot x$: a destra resta zero, a sinistra distribuisci il prodotto su ciascun termine.",
      dopo: "Ogni termine è ora una potenza: quella spesa per accelerare la massa e quella spesa per deformare la molla. La loro somma è zero in ogni istante: quello che la molla dà, la massa prende, e viceversa. Controllo: le unità sono watt.",
    },
    'd114.3': {
      tappa: 4,
      prima: "Guarda i due termini: $m\\dot x\\ddot x$ e $Kx\\dot x$. Li hai già visti, al contrario, quando hai derivato le energie con la regola della catena. Di quali funzioni sono le derivate? Ricorda che serve un ½ davanti per compensare il 2 della derivata del quadrato.",
      dopo: "Il primo termine è la derivata dell'energia cinetica, il secondo la derivata dell'energia elastica. La somma delle due derivate è zero, quindi la derivata dell'energia totale è zero. Entrambe entrano con il più: la molla immagazzina energia, non la toglie.",
    },
    'd114.4': {
      tappa: 4,
      prima: "Se una grandezza ha derivata zero in ogni istante, che cosa vuol dire per il suo valore nel tempo? Per sapere quanto vale, sostituisci la soluzione $x = C\\cos(\\omega_m t + \\alpha)$ e la sua velocità, e usa $m\\omega_m^2 = K$ per mettere insieme i termini.",
      dopo: "L'energia è costante e vale $\\tfrac12 KC^2$: dipende solo dalla rigidezza e dall'ampiezza. Seno quadro più coseno quadro fa uno, ed è per questo che il tempo sparisce. Controllo: raddoppiando l'ampiezza l'energia diventa quattro volte tanto.",
    },
    'd114.5': {
      tappa: 4,
      prima: "Leggiamo l'energia nei due punti speciali del moto. Agli estremi, $x = \\pm C$, la massa è ferma: dove sta l'energia? Al centro, $x = 0$, la molla è scarica e la velocità è massima, $\\omega_m C$: scrivi l'energia cinetica in quel punto e confrontala con quella elastica agli estremi.",
      dopo: "Le due energie sono uguali: tutta elastica agli estremi, tutta cinetica al centro. È lo scambio continuo descritto a p. 208. Siccome non si perde nulla, a ogni oscillazione la massa torna allo stesso estremo: l'ampiezza non cala.",
    },
    'd114.6': {
      tappa: 4,
      prima: "Che cosa cambia se aggiungiamo uno smorzatore viscoso, che fa una forza $-c\\dot x$ opposta alla velocità? Ora c'è una forza non conservativa. La derivata dell'energia è la sua potenza: forza per velocità. Che segno ha questo prodotto?",
      dopo: "La potenza è $-c\\dot x^2$: mai positiva, perché un quadrato non è mai negativo. L'energia può solo calare, quindi a ogni ciclo l'ampiezza si riduce. È esattamente l'introduzione alle vibrazioni smorzate: lo smorzatore toglie un po' di energia a ogni oscillazione.",
    },
  },
  racconto:
    "All'orale parto dall'idea fisica: una massa su una molla, spostata e lasciata, oscilla perché l'energia passa da elastica a cinetica e viceversa; senza dissipazione non si perde niente. Faccio il disegno con parete, molla, massa, asse x e forze tutte positive. Dal teorema dell'energia cinetica, senza forze non conservative, ottengo $(m\\ddot x_G + Kx_G)\\dot x_G = 0$, quindi $m\\ddot x_G + Kx_G = 0$. Con l'ansatz esponenziale trovo $\\lambda = \\pm i\\omega_m$, con $\\omega_m = \\sqrt{K/m}$. Con costanti coniugate ottengo $x = C\\cos(\\omega_m t + \\alpha)$, e con massa lasciata ferma in $x_0$ ho $x_0\\cos(\\omega_m t)$. Chiudo dicendo che la frequenza dipende solo da massa e rigidezza, e che il peso in verticale sposta il centro, non la frequenza.",
};

// ------------------------------------------------------------------ c7-smorzate
const smorzate: LezioneArgomento = {
  perche:
    "Nella lezione precedente la massa oscillava per sempre. Nella realtà no: una porta con il chiudiporta, l'ammortizzatore di un'auto, una corda pizzicata, tutto prima o poi si ferma. C'è sempre qualcosa che dissipa energia. E non sempre si ferma allo stesso modo: l'auto con ammortizzatori buoni torna giù senza rimbalzare, quella con ammortizzatori scarichi rimbalza a lungo. La domanda della lezione è: **aggiungendo uno smorzatore, come cambia il moto? Quando la massa continua a oscillare e quando torna semplicemente a posto? E come si misura quanto smorza un sistema?**",
  idea:
    "Lo smorzatore viscoso è come un pistone che si muove nell'olio: più lo spingi veloce, più resiste. Fa una forza opposta alla velocità e proporzionale a essa. A ogni oscillazione mangia un po' di energia, quindi l'ampiezza cala.\n\nIl punto chiave è la gara fra due effetti: la molla che vuole far oscillare la massa e lo smorzatore che la frena. Se lo smorzatore è debole, la massa oscilla ancora, con oscillazioni che si spengono pian piano dentro una «busta» esponenziale. Se è forte, la massa non riesce nemmeno a superare il centro: torna lentamente a posto, come un cucchiaino che affonda nel miele. Fra i due casi c'è un valore di confine, lo **smorzamento critico**: è il ritorno più rapido possibile senza oscillare, quello che si vuole in un ammortizzatore.\n\nPer questo misuriamo lo smorzamento in «unità critiche», con il fattore ξ: sotto 1 oscilla, sopra 1 no. Tutto il resto della lezione è leggere i tre casi dalle radici di un'equazione di secondo grado.",
  richiami: [
    { titolo: 'Oscillatore non smorzato', testo: "Senza smorzatore abbiamo trovato $m\\ddot x + Kx = 0$, con soluzione armonica alla pulsazione naturale $\\omega_m = \\sqrt{K/m}$. L'energia si scambia fra molla e massa senza perdite, e ampiezza e fase dipendono solo dalle condizioni iniziali. Qui aggiungiamo un termine e vediamo come cambia tutto." },
    { titolo: 'Smorzatore viscoso', testo: "È un componente ideale che fa una forza proporzionale alla velocità relativa fra i suoi estremi e opposta a essa: $F_s = -c\\dot x$. La costante $c$ si misura in N·s/m. Nella realtà le dissipazioni sono più complicate, ma la dispensa le riassume con uno smorzatore lineare equivalente." },
    { titolo: 'Equazione di secondo grado', testo: "Le radici di $a\\lambda^2 + b\\lambda + c = 0$ sono $(-b \\pm \\sqrt{b^2 - 4ac})/2a$. Tutto dipende dal segno di ciò che sta sotto radice: positivo, due radici reali diverse; zero, una radice doppia; negativo, due radici complesse coniugate. Inoltre la somma delle radici vale $-b/a$ e il prodotto $c/a$." },
    { titolo: 'Esponenziale con parte reale e immaginaria', testo: "Un esponenziale $e^{(a + ib)t}$ si spezza in $e^{at}$ per $e^{ibt}$. Il primo fattore cresce o cala a seconda del segno di $a$; il secondo, per Eulero, è un'oscillazione di pulsazione $b$. Quindi la parte reale di λ dice quanto in fretta si spegne il moto, la parte immaginaria quanto in fretta oscilla." },
    { titolo: 'Logaritmo di un rapporto', testo: "Il logaritmo naturale «disfa» l'esponenziale: $\\ln e^{y} = y$. Se due grandezze stanno in rapporto $e^{y}$, il logaritmo del rapporto è semplicemente $y$. Per questo si usa il logaritmo per misurare quanto cala un segnale esponenziale." },
  ],
  ipotesiPerche: [
    "È il modello elementare delle vibrazioni: la massa porta l'inerzia, la molla l'elasticità, lo smorzatore la dissipazione. Un solo numero, $x(t)$, descrive il moto.",
    "Una forza proporzionale alla velocità mantiene l'equazione lineare, e quindi risolvibile con l'esponenziale. Le dissipazioni reali sono più complicate, ma si riassumono con un $c$ equivalente.",
    "Senza forze esterne l'energia entra solo all'inizio, spostando o lanciando la massa: vogliamo vedere come il sistema la restituisce e la dissipa da solo.",
  ],
  disegnoGuida:
    "Disegna la parete tratteggiata a sinistra e il blocco M a destra, appoggiato sul piano. Fra parete e blocco metti in alto la molla K e in basso lo smorzatore c, disegnato come un pistone in un cilindro: sono in parallelo, cioè subiscono lo stesso spostamento. Segna l'asse x verso destra. Accanto fai lo schema di corpo libero del blocco: tre frecce orizzontali tutte verso +x, $F_{el}$, $F_s$ e $F_{in}$, più peso e reazione verticali che si bilanciano. Sotto, se hai tempo, disegna la risposta sottosmorzata: una sinusoide racchiusa fra due curve esponenziali tratteggiate, con la distanza $T_d$ fra due picchi. Infine, sullo stesso grafico, le curve del caso critico e sovrasmorzato, che scendono a zero senza attraversarlo.",
  mappa: [
    "Scrivo l'equazione del moto con lo smorzatore e la trasformo in un polinomio caratteristico.",
    "Misuro lo smorzamento in unità critiche: definisco $c_r$ e ξ e riscrivo le radici.",
    "Caso sottosmorzato: trovo la pulsazione smorzata e la soluzione che oscilla spegnendosi.",
    "Misuro ξ da un tracciato: il decremento logaritmico.",
    "Casi critico e sovrasmorzato: ritorno a posto senza oscillare.",
  ],
  dims: {
    d115: {
      introduzione:
        "Prima cosa: l'equazione del moto con il nuovo termine dello smorzatore. Poi facciamo lo stesso trucco della lezione precedente: proviamo un esponenziale, così l'equazione diventa un polinomio di secondo grado in λ. Le sue radici decideranno tutto, e la cosa importante sarà il segno di ciò che sta sotto radice.",
      riepilogo:
        "Dall'equilibrio delle tre forze lungo x abbiamo $m\\ddot x + c\\dot x + Kx = 0$. Con l'esponenziale l'equazione è diventata il polinomio caratteristico $m\\lambda^2 + c\\lambda + K = 0$. Le radici si trovano con la formula del secondo grado e possono essere reali o complesse a seconda del radicando. In ogni caso hanno parte reale negativa: il moto libero si spegne sempre.",
    },
    d116: {
      introduzione:
        "Il radicando è positivo o negativo a seconda di quanto è grande $c$. Allora chiediamoci: qual è il valore di $c$ che lo rende esattamente zero? Lo chiamiamo smorzamento critico. Poi misuriamo lo smorzamento vero come frazione di quello critico, e riscriviamo le radici in modo che dipendano solo da $\\omega_m$ e da questa frazione.",
      riepilogo:
        "Lo smorzamento critico $c_r = 2m\\omega_m$ è quello che annulla il radicale. Il fattore di smorzamento $\\xi = c/c_r$ dice quanto smorza il sistema rispetto al confine. Con questo le radici diventano $\\omega_m(-\\xi \\pm \\sqrt{\\xi^2 - 1})$ e il segno di $\\xi^2 - 1$ classifica il moto: non smorzato, sottosmorzato, critico, sovrasmorzato.",
    },
    d117: {
      introduzione:
        "Concentriamoci sul caso più comune nelle macchine: smorzamento piccolo, $0 < \\xi < 1$. Qui il radicando è negativo, le radici sono complesse e il moto resta oscillante. Vogliamo sapere a che pulsazione oscilla adesso e con che periodo: è la stessa di prima o lo smorzamento la cambia?",
      riepilogo:
        "Con $\\xi < 1$ la radice di un numero negativo è immaginaria, e le radici diventano $-\\xi\\omega_m \\pm i\\omega_d$. La parte reale fa spegnere il moto, quella immaginaria è la pulsazione smorzata $\\omega_d = \\omega_m\\sqrt{1 - \\xi^2}$. È un po' più bassa di quella naturale, quindi il periodo è un po' più lungo; per smorzamenti piccoli la differenza è minima.",
    },
    d118: {
      introduzione:
        "Ora scriviamo il moto vero, in forma reale. La strategia è la stessa del caso non smorzato: separiamo la parte che decade da quella che oscilla, imponiamo che la soluzione sia reale con costanti coniugate, e otteniamo un'armonica moltiplicata per un esponenziale. Infine fissiamo le costanti con posizione e velocità iniziali.",
      riepilogo:
        "Raccogliendo il fattore $e^{-\\xi\\omega_m t}$ e usando costanti coniugate, la soluzione è un'oscillazione alla pulsazione smorzata dentro un inviluppo esponenziale decrescente. Si può scrivere con seno e fase, oppure con seno e coseno e due costanti reali. Le condizioni iniziali fissano le costanti, e l'inviluppo garantisce che l'ampiezza tenda a zero, più in fretta per ξ più grande.",
    },
    d119: {
      introduzione:
        "Come si misura lo smorzamento di una macchina vera? Non si può smontare per misurare $c$. Si può però dare un colpo, registrare la vibrazione e guardare di quanto calano i picchi. L'idea è che, siccome l'inviluppo è esponenziale, il rapporto fra due picchi successivi è sempre lo stesso: il suo logaritmo, il decremento logaritmico, dipende solo da ξ.",
      riepilogo:
        "Abbiamo definito il decremento logaritmico come logaritmo del rapporto fra due ampiezze a distanza di un periodo smorzato: vale $\\xi\\omega_m T_d$ ed è lo stesso in ogni punto del segnale. Sostituendo il periodo smorzato diventa una funzione di ξ soltanto. Invertendo, dal rapporto letto su un tracciato ricaviamo ξ; misurando su più periodi l'errore pesa meno.",
    },
    d120: {
      introduzione:
        "Ora il caso di confine, $\\xi = 1$. Le due radici coincidono in una sola, reale. Sembra semplice, ma c'è una trappola: con una sola radice abbiamo un solo esponenziale e una sola costante, troppo poco per rispettare posizione e velocità iniziali. Dobbiamo trovare la seconda soluzione mancante. Attenzione: qui la dispensa sbaglia.",
      riepilogo:
        "Con $\\xi = 1$ la radice è doppia, $-\\omega_m$. Sommare i due esponenziali dà un solo termine con una sola costante, e non basta: la dispensa si ferma qui ed è un errore. La seconda soluzione è $t\\,e^{-\\omega_m t}$, che abbiamo verificato sostituendo. Con $(A_1 + A_2 t)e^{-\\omega_m t}$ fissiamo le due costanti, e partendo da fermo la massa torna a zero rapidamente senza attraversarlo.",
    },
    d121: {
      introduzione:
        "Ultimo caso: smorzamento più forte del critico, $\\xi > 1$. Le radici sono reali e distinte, quindi la soluzione è somma di due esponenziali. Vogliamo capire due cose: perché non c'è oscillazione, e perché, contro l'intuito, smorzare di più rende il ritorno più lento invece che più rapido.",
      riepilogo:
        "Con $\\xi > 1$ le radici sono reali, entrambe negative perché la somma è negativa e il prodotto positivo: due esponenziali decrescenti, nessuna oscillazione. Le costanti si trovano con un sistema 2×2. A lungo andare comanda l'esponenziale lento, il cui tasso è minore di $\\omega_m$ e cala al crescere di ξ: oltre il critico, più smorzamento vuol dire ritorno più lento.",
    },
  },
  passi: {
    'd115.1': {
      tappa: 0,
      prima: "Guarda lo schema di corpo libero: lungo x agiscono tre forze, tutte disegnate verso +x. L'inerzia della massa, la molla che tira in proporzione allo spostamento e il nuovo arrivato, lo smorzatore, che tira in proporzione alla velocità e si oppone a essa. Scrivi ciascuna con il suo segno e imponi che la somma sia zero.",
      dopo: "Le tre forze sono $-m\\ddot x$, $-c\\dot x$ e $-Kx$. Cambiando segno a tutto si ottiene $m\\ddot x + c\\dot x + Kx = 0$. Rispetto all'oscillatore libero c'è solo il termine con la velocità. Controllo: con $c = 0$ ritrovi l'equazione della lezione precedente. Il peso non compare perché è bilanciato dal piano.",
    },
    'd115.2': {
      tappa: 0,
      prima: "Proviamo lo stesso tentativo di prima: un esponenziale $x_0 e^{\\lambda t}$. Derivarlo una volta vuol dire moltiplicarlo per λ, due volte per $\\lambda^2$. Sostituisci nei tre termini, raccogli il fattore comune e chiediti: quale fattore può annullarsi?",
      dopo: "L'esponenziale non è mai zero, quindi deve annullarsi il polinomio $m\\lambda^2 + c\\lambda + K$, detto polinomio caratteristico. Ogni termine dell'equazione ha il suo corrispondente: massa ↔ $\\lambda^2$, smorzatore ↔ λ, molla ↔ costante. L'equazione differenziale è diventata algebrica.",
    },
    'd115.3': {
      tappa: 0,
      prima: "È un'equazione di secondo grado in λ: usa la formula risolutiva. Poi, per rendere più leggibile il risultato, porta il $2m$ del denominatore dentro la radice: sotto radice si divide per $(2m)^2$. Pensa già a che cosa decide il segno del radicando.",
      dopo: "Le radici sono $-c/2m$ più o meno una radice quadrata. Se $c^2 > 4mK$ sono reali; se $c^2 < 4mK$ complesse coniugate. Attenzione: la dispensa mette una $i$ davanti alla radice, e così otterrebbe radici complesse proprio quando sono reali. È un errore che si trascina per due pagine.",
    },
    'd115.4': {
      tappa: 0,
      prima: "Prima di andare avanti, un controllo utile. Per un polinomio di secondo grado, somma e prodotto delle radici si leggono direttamente dai coefficienti. Scrivili e chiediti: con massa, smorzamento e rigidezza tutti positivi, che segni hanno somma e prodotto?",
      dopo: "La somma è negativa e il prodotto positivo. Se le radici sono reali, sono entrambe negative; se sono complesse, la loro parte reale comune è negativa. In ogni caso gli esponenziali decrescono: un sistema con uno smorzatore vero, lasciato a sé, si ferma sempre. È un controllo di buon senso fisico.",
    },
    'd115.5': {
      tappa: 0,
      prima: "Abbiamo due valori di λ e l'equazione è lineare. Come si ottiene allora la soluzione più generale? Ricorda che servono due costanti da fissare con le condizioni iniziali.",
      dopo: "La soluzione generale è la combinazione dei due esponenziali, con costanti $A_1$ e $A_2$. Che aspetto ha il moto dipende da come sono fatte le radici, cioè dallo smorzamento: lo vediamo nella prossima dimostrazione. Nella dispensa anche qui gli esponenti hanno la $i$ di troppo.",
    },
    'd116.1': {
      tappa: 1,
      prima: "Il confine fra radici reali e complesse è il caso in cui il radicando vale esattamente zero. Chiamiamo $c_r$ il valore di smorzamento che produce questo confine. Imponi che il radicando sia zero e risolvi per $c_r$, ricordando che $K/m$ è il quadrato della pulsazione naturale.",
      dopo: "Lo smorzamento critico vale $c_r = 2m\\omega_m = 2\\sqrt{mK}$. Dipende solo da massa e molla: è una proprietà del sistema. Controllo: una massa più grande o una molla più rigida richiedono più smorzamento per non oscillare, ed è intuitivo.",
    },
    'd116.2': {
      tappa: 1,
      prima: "Dire «c vale 50 N·s/m» non dice molto: è tanto o poco? Dipende dal sistema. Conviene allora confrontare lo smorzamento vero con quello critico, facendone il rapporto. Questo numero puro misura lo smorzamento «in unità critiche».",
      dopo: "Il fattore di smorzamento è $\\xi = c/c_r$: senza unità. Se vale 0,05 il sistema ha il 5% dello smorzamento critico; se vale 1 è esattamente al confine. Per le strutture metalliche è tipicamente qualche percento, quindi quasi sempre sottosmorzato.",
    },
    'd116.3': {
      tappa: 1,
      prima: "Dentro le radici compaiono due grandezze: $c/2m$ e $K/m$. Vogliamo riscriverle con $\\omega_m$ e ξ. Dalla definizione di ξ ricava $c$, poi dividi per $2m$. Per l'altra grandezza ricorda la definizione di pulsazione naturale.",
      dopo: "La prima diventa $\\xi\\omega_m$, la seconda $\\omega_m^2$. Ora le due grandezze sono espresse con due soli parametri, uno che dice quanto è veloce il sistema e uno che dice quanto smorza. Controllo: con $\\xi = 0$ il termine dello smorzatore sparisce.",
    },
    'd116.4': {
      tappa: 1,
      prima: "Sostituisci le due grandezze appena trovate nella formula delle radici. Sotto radice compaiono $\\xi^2\\omega_m^2$ e $\\omega_m^2$: raccogli $\\omega_m^2$ e portalo fuori dalla radice come $\\omega_m$. Poi raccogli $\\omega_m$ anche dal primo termine.",
      dopo: "Le radici sono $\\omega_m$ per un numero che dipende solo da ξ. La pulsazione naturale fa da «scala dei tempi», ξ decide la forma del moto. Controllo: con $\\xi = 0$ ritrovi $\\pm i\\omega_m$, perché $\\sqrt{-1} = i$. Nella dispensa c'è ancora la $i$ di troppo.",
    },
    'd116.5': {
      tappa: 1,
      prima: "Torniamo al polinomio caratteristico e dividiamolo per la massa. Che cosa diventano $c/m$ e $K/m$ con le sostituzioni del passo precedente? Questa forma è comoda da ricordare a memoria.",
      dopo: "La forma normalizzata è $\\lambda^2 + 2\\xi\\omega_m\\lambda + \\omega_m^2 = 0$: è quella che usano le domande d'esame. Applicando la formula risolutiva a questa forma ritrovi subito le radici del passo precedente. È un buon modo per ricostruirle all'orale.",
    },
    'd116.6': {
      tappa: 1,
      prima: "Ora tutto dipende dal segno di $\\xi^2 - 1$ sotto radice. Prova i quattro casi: ξ zero, ξ fra zero e uno, ξ uguale a uno, ξ maggiore di uno. Per ciascuno chiediti che tipo di radici ottieni.",
      dopo: "Con $\\xi = 0$ radici immaginarie pure: oscillazione eterna. Con $0 < \\xi < 1$ complesse coniugate: oscillazione che si spegne. Con $\\xi = 1$ reale doppia: smorzamento critico. Con $\\xi > 1$ reali distinte: ritorno lento senza oscillare. Sono i quattro casi della dispensa.",
    },
    'd117.1': {
      tappa: 2,
      prima: "Con $\\xi < 1$ il numero $\\xi^2 - 1$ è negativo. Come si scrive la radice di un numero negativo? Portalo fuori come $-1$ per un numero positivo, e ricorda che la radice di $-1$ è $i$.",
      dopo: "La radice diventa $i\\sqrt{1 - \\xi^2}$, con un numero positivo sotto radice. Controllo: elevando al quadrato ritrovi $\\xi^2 - 1$. La dispensa scrive $-\\sqrt{1 - \\xi^2}$ senza $i$: è sbagliato, ma compensa la $i$ di troppo di p. 211, e alla fine i due errori si annullano.",
    },
    'd117.2': {
      tappa: 2,
      prima: "Sostituisci questa radice nelle radici del polinomio. Ottieni due numeri complessi con una parte reale e una parte immaginaria. Chiediti che significato fisico ha ciascuna parte, ricordando che $e^{(a + ib)t}$ si spezza in un esponenziale reale per un'oscillazione.",
      dopo: "Le radici sono $-\\xi\\omega_m \\pm i\\omega_m\\sqrt{1 - \\xi^2}$. La parte reale, negativa, fa decadere il moto; la parte immaginaria è la pulsazione con cui oscilla. Si può controllare sostituendo nel polinomio normalizzato: parte reale e immaginaria del risultato si annullano.",
    },
    'd117.3': {
      tappa: 2,
      prima: "Diamo un nome alla parte immaginaria delle radici: è la pulsazione a cui oscilla il sistema smorzato. Confrontala con la pulsazione naturale: il fattore $\\sqrt{1 - \\xi^2}$ è maggiore o minore di uno?",
      dopo: "La pulsazione smorzata $\\omega_d = \\omega_m\\sqrt{1 - \\xi^2}$ è un po' più bassa di quella naturale: lo smorzatore frena la massa e la fa oscillare un po' più lentamente. Controllo: con $\\xi = 0$ coincide con $\\omega_m$; con $\\xi \\to 1$ tende a zero, cioè l'oscillazione scompare.",
    },
    'd117.4': {
      tappa: 2,
      prima: "Il periodo smorzato si ottiene come sempre: un giro intero, $2\\pi$, diviso la pulsazione. Esprimilo in funzione del periodo naturale $T_m$: siccome $\\omega_d$ è più piccola, il periodo sarà più lungo o più corto?",
      dopo: "$T_d = T_m/\\sqrt{1 - \\xi^2}$, quindi più lungo. Sul grafico è la distanza fra due picchi consecutivi. Per smorzamenti piccoli la differenza è trascurabile: con $\\xi = 0{,}1$ il fattore è circa 0,995, mezzo percento. Per questo spesso si confonde $\\omega_d$ con $\\omega_m$.",
    },
    'd118.1': {
      tappa: 2,
      prima: "Scrivi la soluzione generale con le radici $-\\xi\\omega_m \\pm i\\omega_d$. Ogni esponenziale si spezza nel prodotto di due esponenziali: uno con la parte reale, uguale per entrambi, e uno con la parte immaginaria. Che cosa puoi raccogliere?",
      dopo: "Raccogliendo il fattore comune $e^{-\\xi\\omega_m t}$ resta fra parentesi una combinazione di $e^{\\pm i\\omega_d t}$, esattamente come nel caso non smorzato ma con $\\omega_d$. Fuori, l'esponenziale che decresce. La dispensa ci arriva con gli esponenziali scambiati, per via dei due errori che si compensano.",
    },
    'd118.2': {
      tappa: 2,
      prima: "La parentesi è identica a quella dell'oscillatore libero. Come avevamo fatto lì, chiediamo che la soluzione sia reale: le costanti devono essere coniugate. Scrivile in forma polare e usa la formula di Eulero per la somma di un esponenziale e del suo coniugato.",
      dopo: "La parentesi diventa $X\\cos(\\omega_d t + \\beta)$, e la soluzione è un'oscillazione alla pulsazione smorzata moltiplicata per un esponenziale che si spegne. Con il seno la fase cresce di $\\pi/2$, ed è la scrittura della dispensa. Attenzione: il suo «$x_0$» è un'ampiezza generica, non la posizione iniziale.",
    },
    'd118.3': {
      tappa: 2,
      prima: "Spesso è più comodo avere due costanti reali «separate» invece di ampiezza e fase. Sviluppa il seno della somma, $\\sin(\\omega_d t + \\alpha)$, con la formula di addizione: ottieni un seno e un coseno, ciascuno con un coefficiente.",
      dopo: "La soluzione si scrive come esponenziale per $(a\\cos\\omega_d t + b\\sin\\omega_d t)$. È la stessa soluzione di prima, scritta diversamente: $a$ e $b$ sono legati ad ampiezza e fase. Questa forma è comoda per imporre le condizioni iniziali, perché in $t = 0$ il seno sparisce.",
    },
    'd118.4': {
      tappa: 2,
      prima: "Imponiamo posizione $x_0$ e velocità $v_0$ all'istante zero. In $t = 0$ l'esponenziale vale uno e il seno zero: che cosa resta della posizione? Per la velocità devi derivare un prodotto: la derivata dell'esponenziale per la parentesi, più l'esponenziale per la derivata della parentesi.",
      dopo: "La posizione dà subito $a = x_0$. La velocità dà $-\\xi\\omega_m a + \\omega_d b = v_0$, da cui $b$. Curiosità: anche partendo da fermo, $b$ non è zero, perché l'esponenziale che decresce dà già una velocità negativa da compensare. La dispensa non svolge questo passo.",
    },
    'd118.5': {
      tappa: 2,
      prima: "Il seno oscilla sempre fra $-1$ e $+1$. Che cosa ti dice questo sul valore assoluto della soluzione, che è un seno moltiplicato per un esponenziale? E che cosa fa l'esponenziale quando il tempo cresce?",
      dopo: "La massa oscilla dentro due curve esponenziali, $\\pm X e^{-\\xi\\omega_m t}$, che si stringono verso zero: è l'inviluppo tratteggiato del grafico di p. 212. Più è grande ξ, più in fretta si chiude. Controllo: con $\\xi = 0$ l'inviluppo è piatto e l'ampiezza resta costante.",
    },
    'd119.1': {
      tappa: 3,
      prima: "Il decremento logaritmico si definisce come logaritmo del rapporto fra due ampiezze a distanza di un periodo smorzato. Scrivi l'inviluppo all'istante $t$ e all'istante $t + T_d$, fai il rapporto e guarda che cosa si semplifica. Poi il logaritmo disfa l'esponenziale.",
      dopo: "Nel rapporto $X$ e $t$ spariscono e resta $e^{\\xi\\omega_m T_d}$, il cui logaritmo è $\\xi\\omega_m T_d$. Il decremento è sempre positivo, perché il picco precedente è più alto. Controllo: con $\\xi = 0$ vale zero, cioè le ampiezze non calano.",
    },
    'd119.2': {
      tappa: 3,
      prima: "Abbiamo usato l'inviluppo, ma in laboratorio leggiamo il segnale vero, cioè l'esponenziale per il seno. Vale lo stesso rapporto? Chiediti che cosa fa il seno dopo un periodo smorzato.",
      dopo: "Dopo un periodo smorzato il seno ritorna identico, quindi nel rapporto si cancella e resta solo il rapporto fra gli esponenziali. Vale per qualunque coppia di punti a distanza $T_d$, in particolare due picchi successivi. Ecco perché il decremento si legge direttamente sul tracciato.",
    },
    'd119.3': {
      tappa: 3,
      prima: "Il decremento contiene ancora $\\omega_m$ e $T_d$. Sostituisci il periodo smorzato, $2\\pi$ diviso la pulsazione smorzata, e scrivi la pulsazione smorzata come $\\omega_m\\sqrt{1 - \\xi^2}$. Guarda che cosa si semplifica.",
      dopo: "La pulsazione naturale si cancella e il decremento dipende solo da ξ: $2\\pi\\xi/\\sqrt{1 - \\xi^2}$. È una notizia ottima: misurando un rapporto di ampiezze ricaviamo ξ, senza conoscere massa, molla o smorzatore. Il decremento cresce con ξ.",
    },
    'd119.4': {
      tappa: 3,
      prima: "In pratica si misura il decremento e si vuole ξ: serve la formula inversa. Eleva al quadrato la relazione precedente, porta il denominatore a sinistra e raccogli tutti i termini in $\\xi^2$ da una parte.",
      dopo: "Si ottiene $\\xi = \\delta/\\sqrt{4\\pi^2 + \\delta^2}$. È la procedura della dispensa: perturbare il sistema, registrare con un trasduttore, leggere due picchi successivi, fare il logaritmo del rapporto e ricavare ξ. Controllo: per δ piccolo, $\\xi \\approx \\delta/2\\pi$.",
    },
    'd119.5': {
      tappa: 3,
      prima: "Se lo smorzamento è piccolo, due picchi successivi sono quasi uguali e l'errore di lettura pesa molto. Come puoi aumentare la differenza? Pensa a confrontare un picco con quello di $n$ periodi dopo: quante volte si ripete il fattore di riduzione?",
      dopo: "Dopo $n$ periodi il rapporto è $e^{n\\delta}$, quindi basta dividere il logaritmo per $n$. Il calo accumulato è grande e si legge bene, e l'errore si divide per $n$. È il modo in cui si misura davvero in laboratorio.",
    },
    'd120.1': {
      tappa: 4,
      prima: "Mettiamo $\\xi = 1$ nelle radici. Che cosa succede al termine sotto radice? Quante radici distinte restano? Per esserne sicuro, puoi controllare che quel valore annulli sia il polinomio sia la sua derivata: è il segno di una radice doppia.",
      dopo: "Il radicale si annulla e le due radici coincidono: $\\lambda = -\\omega_m$, reale e doppia. È negativa, quindi la soluzione decade. Il controllo con il polinomio e la sua derivata conferma che è proprio doppia, cioè conta due volte.",
    },
    'd120.2': {
      tappa: 4,
      prima: "Proviamo a usare la solita soluzione generale con due esponenziali. Ma ora i due esponenziali sono lo stesso, perché le radici coincidono. Che cosa succede alle due costanti quando raccogli? Quante costanti indipendenti ti restano davvero?",
      dopo: "La somma è $(A_1 + A_2)e^{-\\omega_m t}$: una sola costante. Con una costante non puoi imporre insieme posizione e velocità iniziali. Manca una seconda soluzione. La dispensa riquadra questa riga come soluzione finale: è un errore da riconoscere all'orale.",
    },
    'd120.3': {
      tappa: 4,
      prima: "Per una radice doppia, la teoria delle equazioni lineari dice che la seconda soluzione è l'esponenziale moltiplicato per $t$. Non fidarti: verificalo. Calcola la derivata prima e seconda di $t\\,e^{-\\omega_m t}$ con la regola del prodotto, sostituisci e usa $c = 2m\\omega_m$ e $K = m\\omega_m^2$.",
      dopo: "Nella parentesi i termini che contengono $t$ e quelli costanti si annullano separatamente, quindi la funzione risolve davvero l'equazione. Abbiamo trovato la seconda soluzione indipendente. Funziona solo perché la radice è doppia: con altri valori di $c$ non si cancellerebbero.",
    },
    'd120.4': {
      tappa: 4,
      prima: "Ora la soluzione generale è la combinazione delle due soluzioni: esponenziale e $t$ per esponenziale. Imponi le condizioni iniziali. In $t = 0$ il termine con $t$ sparisce. Per la velocità deriva il prodotto e valuta in zero.",
      dopo: "La posizione dà $A_1 = x_0$; la velocità dà $A_2 = v_0 + \\omega_m x_0$. Due costanti indipendenti, due condizioni rispettate: adesso il problema è ben posto. Controllo: con $x_0 = v_0 = 0$ entrambe sono zero e la massa resta ferma.",
    },
    'd120.5': {
      tappa: 4,
      prima: "Prendiamo il caso del grafico della dispensa: massa spostata e lasciata ferma. Metti $v_0 = 0$ nelle costanti appena trovate e scrivi la soluzione. Poi chiediti: può diventare negativa? Ricorda che l'esponenziale è sempre positivo.",
      dopo: "La soluzione è $x_0(1 + \\omega_m t)e^{-\\omega_m t}$: parte con tangente orizzontale, scende in fretta e tende a zero senza mai attraversarlo, perché entrambi i fattori sono positivi. Non è un moto armonico: è il ritorno più rapido possibile senza oscillare.",
    },
    'd121.1': {
      tappa: 4,
      prima: "Con $\\xi > 1$, guarda il segno del radicando $\\xi^2 - 1$. Che tipo di radici ottieni? Qui la dispensa le scrive finalmente senza la $i$ di troppo.",
      dopo: "Il radicando è positivo, quindi le radici sono reali e distinte: $-\\omega_m(\\xi \\pm \\sqrt{\\xi^2 - 1})$. Si possono verificare sostituendo nel polinomio normalizzato. Nessuna parte immaginaria, quindi nessuna oscillazione.",
    },
    'd121.2': {
      tappa: 4,
      prima: "Sono reali, ma che segno hanno? Calcolarle è laborioso; è più rapido usare somma e prodotto dal polinomio normalizzato. Se il prodotto è positivo, le radici hanno lo stesso segno; il segno della somma ti dice quale.",
      dopo: "Il prodotto vale $\\omega_m^2 > 0$, la somma $-2\\xi\\omega_m < 0$: entrambe le radici sono negative. Quindi la soluzione è fatta di due esponenziali che decrescono. La risposta si chiama aperiodica: la massa torna a posto senza oscillare.",
    },
    'd121.3': {
      tappa: 4,
      prima: "Scrivi la soluzione generale come combinazione dei due esponenziali con le radici appena trovate. Guarda le due velocità di decadimento: quale delle due è più grande in valore assoluto?",
      dopo: "La soluzione è la somma di due esponenziali: uno rapido, con $\\xi + \\sqrt{\\xi^2 - 1}$, che si spegne presto, e uno lento, con $\\xi - \\sqrt{\\xi^2 - 1}$, che domina a lungo. È il grafico di p. 213 con $\\xi = 2$: una discesa lenta e regolare.",
    },
    'd121.4': {
      tappa: 4,
      prima: "Imponi posizione e velocità iniziali. In $t = 0$ entrambi gli esponenziali valgono uno: la posizione dà la somma delle costanti. La velocità dà la somma delle costanti moltiplicate per le rispettive radici. È un sistema lineare di due equazioni in due incognite.",
      dopo: "Risolvendo il sistema (per esempio con Cramer) si trovano le due costanti. Il denominatore è la differenza delle radici, che non è mai zero perché sono distinte. Controllo: sommando $A_1$ e $A_2$ si ritrova $x_0$.",
    },
    'd121.5': {
      tappa: 4,
      prima: "Dopo un po' l'esponenziale rapido si è spento e resta quello lento. Confronta il suo tasso di decadimento con quello del caso critico, $\\omega_m$. Per vederlo bene, moltiplica e dividi per $\\xi + \\sqrt{\\xi^2 - 1}$: al numeratore compare una differenza di quadrati.",
      dopo: "Il tasso lento vale $\\omega_m/(\\xi + \\sqrt{\\xi^2 - 1})$: è minore di $\\omega_m$ e diminuisce al crescere di ξ. Quindi smorzare troppo rallenta il ritorno, come il cucchiaino nel miele. Per questo negli ammortizzatori si cerca uno smorzamento vicino al critico.",
    },
    'd121.6': {
      tappa: 4,
      prima: "La dispensa conclude che il sovrasmorzato si ferma dopo il critico ma prima di un sottosmorzato. La prima parte l'abbiamo appena dimostrata. Chiediti se la seconda vale sempre: un sottosmorzato con ξ quasi uno e uno con ξ piccolissimo si assestano nello stesso tempo?",
      dopo: "No: un sottosmorzato con ξ vicino a 1 si assesta prima di un sovrasmorzato molto smorzato; uno con ξ piccolo oscilla a lungo e si assesta dopo. Quindi l'affermazione della dispensa non è generale. All'orale di' solo la parte sicura: più lento del critico.",
    },
  },
  racconto:
    "All'orale dico che aggiungo uno smorzatore viscoso, una forza $-c\\dot x$, e dal corpo libero ottengo $m\\ddot x + c\\dot x + Kx = 0$. Con l'esponenziale arrivo al polinomio caratteristico e alle radici. Definisco lo smorzamento critico $c_r = 2m\\omega_m$, quello che annulla il radicale, e il fattore $\\xi = c/c_r$; le radici diventano $\\omega_m(-\\xi \\pm \\sqrt{\\xi^2 - 1})$. Poi i casi: sotto 1 la massa oscilla a $\\omega_d = \\omega_m\\sqrt{1 - \\xi^2}$ dentro un inviluppo $e^{-\\xi\\omega_m t}$, e da due picchi ricavo ξ con il decremento logaritmico. Con ξ = 1 la radice è doppia e serve $(A_1 + A_2 t)e^{-\\omega_m t}$: lo dico, perché la dispensa sbaglia. Sopra 1 il ritorno è aperiodico e più lento del critico.",
};

// ------------------------------------------------------------------ c7-complex
const complex: LezioneArgomento = {
  perche:
    "Una lavatrice in centrifuga fa vibrare il pavimento; un motore montato su un telaio lo scuote a ogni giro. Qui la massa non è lasciata a se stessa: una forza la spinge avanti e indietro in modo periodico, sempre allo stesso ritmo. Dopo un breve transitorio, il sistema vibra allo stesso ritmo della forza. Ma con quale ampiezza, e con quale ritardo? Trovarlo con seni e coseni è un calcolo lungo e pieno di formule trigonometriche. La domanda della lezione è: **c'è un modo più furbo per trovare la risposta a regime a una forza sinusoidale? Il complex replacement è proprio questo trucco.**",
  idea:
    "Il trucco nasce da un'osservazione: derivare seni e coseni è scomodo, perché si scambiano fra loro e cambiano segno. Gli esponenziali, invece, si derivano moltiplicando per una costante. La formula di Eulero dice che un seno è la parte immaginaria di un esponenziale complesso: $\\sin\\omega t = \\operatorname{Im}\\{e^{i\\omega t}\\}$.\n\nImmagina una lancetta che gira nel piano complesso con velocità angolare ω. La sua ombra sull'asse verticale sale e scende come un seno: è la nostra forza. Invece di lavorare con l'ombra, lavoriamo con la lancetta intera, che è molto più semplice da trattare. Siccome l'equazione è lineare e i coefficienti sono reali, alla fine prendiamo di nuovo l'ombra e abbiamo la risposta vera.\n\nCon la lancetta, derivare significa moltiplicare per iω: l'equazione differenziale diventa una semplice divisione. Il modulo del risultato ci dà l'ampiezza della vibrazione, l'argomento ci dà di quanto la risposta è in ritardo rispetto alla forza.",
  richiami: [
    { titolo: 'Numeri complessi in forma polare', testo: "Un numero complesso si può scrivere come modulo per $e^{i\\theta}$, dove il modulo è la sua lunghezza e θ l'angolo con l'asse reale. Moltiplicare due numeri complessi significa moltiplicare i moduli e sommare gli angoli; dividere significa dividere i moduli e sottrarre gli angoli. Quindi $1/p$ ha angolo $-\\arg p$." },
    { titolo: 'Formula di Eulero', testo: "$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$: la parte reale è il coseno, quella immaginaria il seno. Se θ cresce nel tempo come $\\omega t$, il punto gira sulla circonferenza unitaria, e le sue proiezioni sui due assi sono un coseno e un seno." },
    { titolo: 'Equazione del moto forzato', testo: "Per una massa con molla e smorzatore spinta da una forza $F_0\\sin\\omega t$, l'equilibrio lungo x dà $m\\ddot x + c\\dot x + Kx = F_0\\sin\\omega t$. La soluzione è la somma della risposta libera, che si spegne in pochi secondi, e della risposta a regime, che è quella che ci interessa." },
    { titolo: 'Linearità', testo: "Se un'equazione è lineare con coefficienti reali, la parte reale e la parte immaginaria di una soluzione complessa sono, separatamente, soluzioni reali: derivate e moltiplicazioni per numeri reali non mescolano le due parti. È la ragione per cui il trucco complesso funziona." },
  ],
  ipotesiPerche: [
    "La linearità con coefficienti reali è ciò che permette di «prendere la parte immaginaria» alla fine: se l'equazione non fosse lineare, il trucco non funzionerebbe.",
    "Ci interessa ciò che succede dopo il transitorio: la risposta libera, con lo smorzamento, si spegne in fretta, e resta solo la risposta alla stessa frequenza della forza.",
    "Con una forza in seno si prende la parte immaginaria, con una in coseno la parte reale: basta essere coerenti dall'inizio alla fine.",
  ],
  disegnoGuida:
    "Disegna due assi: quello reale orizzontale, quello immaginario verticale. Traccia una freccia dall'origine, il fasore della forza $\\hat F e^{i\\omega t}$, e segna con una freccia curva che gira con velocità ω. Poi disegna la freccia della risposta, più corta o più lunga a seconda della frequenza, ruotata all'indietro di un angolo φ: è il ritardo. Se hai tempo, costruisci la catena che chiude sulla forza: $K\\hat X$ nella direzione della risposta, $ic\\omega\\hat X$ ruotato di 90° in avanti, $-m\\omega^2\\hat X$ nel verso opposto a $K\\hat X$; la loro somma deve arrivare sulla punta della forza. Infine tratteggia la proiezione delle frecce sull'asse immaginario: quella è la grandezza fisica, perché la forza è in seno.",
  mappa: [
    "Vedo la forza in seno come la parte immaginaria di un esponenziale complesso.",
    "Risolvo il problema complesso: derivare diventa moltiplicare per iω.",
    "Leggo modulo e argomento della soluzione: ampiezza e ritardo.",
    "Torno alla grandezza reale con la parte immaginaria e generalizzo.",
  ],
  dims: {
    d123: {
      introduzione:
        "Vogliamo la risposta a regime della massa con molla e smorzatore spinta da $F_0\\sin\\omega t$. La strategia è sostituire il problema reale con uno complesso, più facile: la forza diventa un esponenziale, la risposta si cerca come esponenziale alla stessa pulsazione, e l'equazione diventa algebrica. Risolta quella, torniamo alla realtà prendendo la parte immaginaria.",
      riepilogo:
        "Abbiamo visto la forza come parte immaginaria di $F_0 e^{i\\omega t}$ e risolto il problema complesso cercando $z_0 e^{i\\omega t}$. Le derivate sono diventate moltiplicazioni per iω, e l'ampiezza complessa è risultata la forza divisa per la rigidezza dinamica $p(i\\omega)$. Il modulo ci ha dato l'ampiezza, l'argomento il ritardo φ. Prendendo la parte immaginaria abbiamo la risposta reale; lo stesso schema vale con una fase iniziale e definisce il complex gain.",
    },
  },
  passi: {
    'd123.1': {
      tappa: 0,
      prima: "Partiamo dalla forza. Vogliamo scriverla come parte di un esponenziale complesso, perché gli esponenziali si derivano facilmente. Ricorda la formula di Eulero: $e^{i\\omega t}$ ha per parte reale il coseno e per parte immaginaria il seno. Quale parte corrisponde alla nostra forza?",
      dopo: "La forza è la parte immaginaria di $F_0 e^{i\\omega t}$, cioè l'ombra sull'asse verticale di una lancetta lunga $F_0$ che gira con velocità ω. Se la forza fosse in coseno, sarebbe la parte reale: è la convenzione da tenere fino in fondo.",
    },
    'd123.2': {
      tappa: 0,
      prima: "Ora l'idea: invece di risolvere l'equazione con il seno, risolviamo quella con l'esponenziale complesso al secondo membro. Chiamiamo $z$ la soluzione complessa. Perché la parte immaginaria di $z$ dovrebbe risolvere l'equazione vera? Pensa a cosa succede alla parte immaginaria quando derivi o moltiplichi per numeri reali come $m$, $c$, $K$.",
      dopo: "Derivate e moltiplicazioni per numeri reali non mescolano parte reale e immaginaria. Quindi la parte immaginaria di $z$ risolve l'equazione con $F_0\\sin\\omega t$. È solo un artificio di calcolo: la fisica non cambia, cambia il modo di fare i conti.",
    },
    'd123.3': {
      tappa: 1,
      prima: "Come cerchiamo la soluzione? A regime il sistema vibra alla stessa pulsazione della forza. Allora proviamo un esponenziale con la stessa pulsazione e un'ampiezza complessa $z_0$ da trovare. Calcola le sue derivate: ogni derivata moltiplica per che cosa?",
      dopo: "Ogni derivata moltiplica per iω: la velocità è iω volte la posizione, l'accelerazione è $(i\\omega)^2 = -\\omega^2$ volte la posizione. Il segno meno dice che l'accelerazione è opposta allo spostamento, come in ogni oscillazione. Ora le derivate sono semplici prodotti.",
    },
    'd123.4': {
      tappa: 1,
      prima: "Sostituisci posizione, velocità e accelerazione nell'equazione complessa. Ogni termine contiene lo stesso esponenziale $e^{i\\omega t}$: raccoglilo a sinistra. Anche a destra c'è lo stesso esponenziale. Che cosa puoi fare con due membri che hanno lo stesso fattore mai nullo?",
      dopo: "L'esponenziale si semplifica e resta un'equazione algebrica: $z_0$ è la forza divisa per $p(i\\omega) = K - m\\omega^2 + ic\\omega$, la rigidezza dinamica. Molla e massa stanno sull'asse reale con segni opposti, lo smorzatore sull'asse immaginario. A p. 215 la dispensa dimentica l'esponenziale a destra.",
    },
    'd123.5': {
      tappa: 2,
      prima: "$z_0$ è un numero complesso: per leggerlo fisicamente conviene la forma polare, modulo e angolo. Il modulo di un quoziente è il quoziente dei moduli. E l'angolo di $1/p$? Ricorda che dividere sottrae gli angoli. Calcola il modulo di $p$ con Pitagora sulle sue parti reale e immaginaria.",
      dopo: "Il modulo è $F_0$ diviso $\\sqrt{(K - m\\omega^2)^2 + (c\\omega)^2}$: l'ampiezza della vibrazione. L'angolo è $-\\varphi$, cioè la risposta è in ritardo sulla forza. La dispensa scrive $e^{+i\\varphi}$, ma poi usa il ritardo giusto. Attenzione al quadrante: oltre la risonanza il ritardo supera 90°.",
    },
    'd123.6': {
      tappa: 3,
      prima: "Abbiamo la soluzione complessa: modulo, angolo, e la lancetta che gira con $e^{i\\omega t}$. Ora torniamo al mondo reale. La forza era la parte immaginaria della lancetta: che parte dobbiamo prendere della risposta? Metti insieme gli esponenti e applica Eulero.",
      dopo: "La risposta reale è $|z_0|\\sin(\\omega t - \\varphi)$: stessa pulsazione della forza, ampiezza $F_0/|p|$, ritardo φ. Controllo: a frequenza zero, $\\varphi = 0$ e l'ampiezza è $F_0/K$, lo spostamento statico. La molla da sola risponde subito.",
    },
    'd123.7': {
      tappa: 3,
      prima: "E se la forza non parte da zero ma ha una fase iniziale α? Pensa alla lancetta della forza: è solo ruotata in avanti di α all'istante zero. Puoi inglobare questa rotazione nell'ampiezza complessa della forza. Come cambia allora la risposta?",
      dopo: "L'ampiezza complessa diventa $F_0 e^{i\\alpha}$, e la risposta è anch'essa ruotata di α, sempre con lo stesso ritardo φ. Il sistema non sa da quando abbiamo cominciato a contare il tempo. Servirà nell'eccitazione di vincolo, dove agiscono due forze sfasate.",
    },
    'd123.8': {
      tappa: 3,
      prima: "Abbiamo visto che la risposta è la forza divisa per la rigidezza dinamica. Allora possiamo definire una grandezza che dipende solo dal sistema e dalla frequenza, non dalla forza: il rapporto fra risposta e forza. Come si scrive in funzione di $p$?",
      dopo: "Il complex gain è $G(i\\omega) = 1/p(i\\omega)$: dice di quanto il sistema amplifica o attenua una forza a quella frequenza, e con quale ritardo. Attenzione: a p. 217 la dispensa per una riga chiama $p$ il reciproco; $p$ resta la rigidezza dinamica, $G$ il suo inverso.",
    },
  },
  racconto:
    "All'orale dico che il complex replacement è un artificio di calcolo. Scrivo l'equazione $m\\ddot x + c\\dot x + Kx = F_0\\sin\\omega t$ e osservo che il seno è la parte immaginaria di $e^{i\\omega t}$. Siccome l'equazione è lineare a coefficienti reali, risolvo quella complessa e alla fine prendo la parte immaginaria. Cerco $z_0 e^{i\\omega t}$: derivare vuol dire moltiplicare per iω, quindi ottengo $z_0 = F_0/p(i\\omega)$ con $p = K - m\\omega^2 + ic\\omega$, la rigidezza dinamica. Il modulo dà l'ampiezza $F_0/|p|$, l'argomento il ritardo φ, e la risposta è $|z_0|\\sin(\\omega t - \\varphi)$. Chiudo con il disegno dei fasori e con il complex gain $G = 1/p$.",
};

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c7-libere': libere,
  'c7-smorzate': smorzate,
  'c7-complex': complex,
};
