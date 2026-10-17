/** Lezioni discorsive C5 parte b: ruote elicoidali (presa, z minimo, forze) e ruote coniche (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

export const elicoidaliPresa: LezioneArgomento = {
  perche:
    "Con i denti dritti, ogni volta che una coppia di denti entra o esce dal contatto il carico si ridistribuisce di colpo, su tutta la larghezza del dente. Succede centinaia di volte al secondo: ne nascono urti, vibrazioni e quel fischio tipico della retromarcia delle auto, che spesso ha ancora denti dritti. Le marce avanti, silenziose, usano denti elicoidali. La domanda della lezione è: **che cosa cambia nella geometria quando il dente diventa un'elica, e perché i denti in presa aumentano?**",
  idea:
    "Immagina di tagliare una ruota a denti dritti in tante fette sottili e di ruotare ogni fetta un pochino rispetto alla precedente: ottieni una ruota a scalini. Ogni fetta entra in presa un attimo dopo l'altra, e il carico passa in modo più graduale. Se le fette diventano infinitamente sottili, gli scalini spariscono e il dente diventa un'elica, come la filettatura di una vite molto allungata.\n\nIn ogni fetta, cioè nel piano perpendicolare all'asse, la ruota è una normale ruota a evolvente: rapporto, primitive, retta d'azione restano quelli che conosci. Ciò che cambia è la terza dimensione. Le linee lungo cui i denti si toccano non sono più parallele all'asse ma inclinate: un dente comincia a toccare da un'estremità e solo dopo su tutta la larghezza. Il contatto dura di più, e quindi più denti lavorano insieme.",
  richiami: [
    { titolo: "Cilindro primitivo e fondamentale", testo: "Ogni ruota a evolvente ha un cilindro primitivo di raggio $R$ (quello che rotola senza strisciare sulla compagna) e un cilindro fondamentale di raggio $R_f = R\\cos\\theta$, da cui si svolge l'evolvente; $\\theta$ è l'angolo di pressione, l'inclinazione della retta d'azione." },
    { titolo: "Elica e suo sviluppo", testo: "Un'elica sul cilindro è la curva di una filettatura. Se tagli il cilindro lungo una generatrice e lo srotoli sul piano, un giro d'elica diventa un segmento dritto: l'ipotenusa di un triangolo rettangolo con un cateto uguale alla circonferenza $2\\pi R$ e l'altro uguale al passo dell'elica $P_e$, lo spostamento lungo l'asse in un giro." },
    { titolo: "Denti in presa per i denti dritti", testo: "Lungo la retta d'azione i contatti fra coppie di denti successive distano $P\\cos\\theta$ (il passo misurato sulla fondamentale). Il segmento dei contatti, lungo $\\delta$, ne contiene in media $\\delta/(P\\cos\\theta)$: è il numero medio di coppie di denti in presa." },
    { titolo: "Proiezione di un segmento", testo: "Se un segmento lungo $L$ forma un angolo $\\alpha$ con una direzione, la sua proiezione su quella direzione è $L\\cos\\alpha$ e sulla perpendicolare è $L\\sin\\alpha$. Il rapporto fra cateto opposto e cateto adiacente è $\\operatorname{tg}\\alpha$." },
  ],
  ipotesiPerche: [
    "Con assi paralleli le due ruote si toccano lungo una generatrice comune; perché le eliche combacino nell'ingranamento esterno, una deve avvolgersi a destra e l'altra a sinistra, come due viti che si incastrano.",
    "È il modo di generare il dente: una retta inclinata, solidale a un piano che rotola sul cilindro fondamentale, descrive la superficie elicoidale. Da qui viene che ogni sezione frontale è un'evolvente.",
    "La dispensa usa α per l'elica sul primitivo e β per quella sul fondamentale, al contrario di molti libri: fissarlo subito evita di confondere le formule.",
    "Il rettangolo dei contatti è il disegno su cui contiamo i denti: in orizzontale la larghezza della ruota, in verticale il tratto di retta d'azione in cui i denti si toccano.",
  ],
  disegnoGuida:
    "Comincia dal triangolo dello sviluppo: un cateto verticale $P_e$ (il passo dell'elica, lungo l'asse) e un cateto orizzontale $2\\pi R$; l'ipotenusa è l'elica sul primitivo e l'angolo con il cateto verticale è α. Sullo stesso cateto verticale disegna un secondo triangolo più stretto, con base $2\\pi R_f$: l'angolo è β, più piccolo. Poi, a parte, il rettangolo dei contatti: base b (la fascia) in orizzontale, altezza δ (il segmento dei contatti) in verticale. Dentro traccia alcune linee di contatto parallele, inclinate di β. Segna i punti H (il dente comincia a toccare in un angolo), J (tocca su tutta la fascia), M (comincia a staccarsi), K (finisce). Sul lato destro, sopra il rettangolo, segna il tratto CK = b tg β.",
  mappa: [
    "Nel piano frontale nulla cambia: rapporto e primitive come i denti dritti.",
    "Srotolo i cilindri: angolo d'elica sul primitivo α e sul fondamentale β.",
    "Ricavo le grandezze normali: passo, modulo, angolo di pressione.",
    "Guardo il rettangolo dei contatti: le linee inclinate allungano il contatto.",
    "Conto i denti in presa con la lunghezza effettiva.",
  ],
  dims: {
    d095: {
      introduzione:
        "Vogliamo i legami fra le grandezze che descrivono un dente elicoidale: gli angoli d'elica sui due cilindri, il passo e il modulo misurati perpendicolarmente al dente, l'angolo di pressione in quella direzione. La strategia è sempre la stessa: srotolare i cilindri sul piano, così le eliche diventano rette, e poi proiettare segmenti con seni e coseni.",
      riepilogo:
        "Nel piano frontale la ruota elicoidale è una ruota a evolvente, quindi il rapporto è quello dei denti. Srotolando i due cilindri, con lo stesso passo d'elica ma circonferenze diverse, abbiamo trovato $\\operatorname{tg}\\beta = \\operatorname{tg}\\alpha\\cos\\theta$: sul fondamentale l'elica è più dritta. Proiettando perpendicolarmente al dente abbiamo trovato passo, modulo e angolo di pressione normali: tutto ciò che è normale si ottiene dal frontale con un $\\cos\\alpha$.",
    },
    d139: {
      introduzione:
        "Vogliamo contare quanti denti sono in presa contemporaneamente. La strategia è partire dalla formula dei denti dritti, segmento dei contatti diviso distanza fra due contatti, e capire quale segmento usare quando le linee di contatto sono inclinate. Lo faremo sul rettangolo dei contatti, seguendo una linea dal momento in cui tocca il rettangolo a quando lo lascia.",
      riepilogo:
        "Nei denti dritti i denti in presa sono il segmento dei contatti diviso $P\\cos\\theta$. Nell'elicoidale le linee di contatto sono inclinate di β, quindi una linea resta dentro il rettangolo per un tratto più lungo: $\\delta + b\\operatorname{tg}\\beta$. Dividendo per $P\\cos\\theta$ otteniamo i denti dritti più un termine aggiuntivo, che con la relazione fra gli angoli diventa $b\\operatorname{tg}\\alpha/P$. Più denti in presa vuol dire carico che cambia gradualmente.",
    },
  },
  passi: {
    "d095.1": {
      tappa: 0,
      prima: "Taglia la ruota elicoidale con un piano perpendicolare all'asse: che cosa vedi? Un profilo a evolvente, come in una ruota a denti dritti. Quindi nel piano frontale valgono le regole che conosci: il passo per il numero di denti dà la circonferenza primitiva, e le primitive rotolano senza strisciare. Ricava il rapporto delle velocità.",
      dopo: "Il rapporto è quello dei raggi e dei denti, esattamente come per i denti dritti: l'elica non cambia la cinematica. Il segno, che la dispensa omette, è negativo per l'ingranamento esterno, perché le ruote girano in versi opposti.",
    },
    "d095.2": {
      tappa: 1,
      prima: "Per misurare quanto è inclinato il dente, srotola il cilindro primitivo sul piano. Un giro d'elica diventa un segmento dritto: in orizzontale avanza di una circonferenza, $2\\pi R$, in verticale (lungo l'asse) di un passo d'elica, $P_e$. L'angolo α si misura rispetto all'asse. Qual è il rapporto fra cateto opposto e cateto adiacente?",
      dopo: "La tangente dell'angolo d'elica è circonferenza diviso passo d'elica. Controllo: con un passo d'elica infinito (l'elica non si avvolge mai) α = 0 e ritrovi i denti dritti.",
    },
    "d095.3": {
      tappa: 1,
      prima: "Fai lo stesso con il cilindro fondamentale. Il dente è una superficie elicoidale: tutte le eliche che la compongono, su cilindri di raggio diverso, avanzano dello stesso passo in un giro. Che cosa cambia allora nel triangolo? Solo la circonferenza, che diventa più piccola.",
      dopo: "La formula ha la stessa forma, con $R_f$ al posto di $R$. Poiché $R_f < R$ e il passo è lo stesso, l'angolo β sul fondamentale è più piccolo di α: lì l'elica è più dritta.",
    },
    "d095.4": {
      tappa: 1,
      prima: "Vogliamo un legame diretto fra i due angoli. Dividi la riga del primitivo per quella del fondamentale: il passo d'elica e il $2\\pi$ si semplificano, e resta il rapporto fra i raggi. Poi ricorda quanto vale il raggio fondamentale rispetto al primitivo.",
      dopo: "La tangente dell'angolo sul fondamentale è quella sul primitivo per $\\cos\\theta$. Controllo: $\\cos\\theta < 1$, quindi β < α, come avevamo previsto. Attenzione ai nomi: in molti libri l'angolo sul primitivo si chiama β; nella dispensa è α.",
    },
    "d095.5": {
      tappa: 2,
      prima: "Il passo P si misura lungo la primitiva nel piano frontale. Ma il dente è inclinato di α: la distanza vera fra due denti, misurata perpendicolarmente a loro, è più corta. Guarda la dentiera di p. 186 con i denti inclinati: il passo frontale è l'ipotenusa, quello normale è il cateto perpendicolare ai denti. Quale funzione dell'angolo ti dà la proiezione?",
      dopo: "Il passo normale è il frontale per $\\cos\\alpha$, quindi più corto. Controllo: con α = 0 i due passi coincidono. Pensa a delle strisce oblique su un foglio: la distanza fra due strisce misurata in orizzontale è più grande di quella misurata perpendicolarmente alle strisce.",
    },
    "d095.6": {
      tappa: 2,
      prima: "Il modulo è il passo diviso π, per definizione. Quello frontale è $m = P/\\pi$. Applica la stessa definizione al passo normale e usa la riga precedente.",
      dopo: "Anche il modulo normale è il frontale per $\\cos\\alpha$. Il modulo normale è importante perché è quello dell'utensile che taglia il dente, e lo useremo per la ruota fittizia.",
    },
    "d095.7": {
      tappa: 2,
      prima: "Ultimo legame: l'angolo di pressione misurato nel piano normale al dente. Guarda il prisma della figura di p. 186: ha un'altezza comune XY. Nel piano frontale il cateto YZ vale XY per $\\operatorname{tg}\\theta$; nel piano normale il cateto YT vale XY per $\\operatorname{tg}\\theta_m$. Ma YT è la proiezione di YZ perpendicolarmente al dente. Metti insieme le tre relazioni ed elimina XY.",
      dopo: "La tangente dell'angolo di pressione normale è quella frontale per $\\cos\\alpha$: l'angolo normale è più piccolo. Ancora una volta il passaggio dal frontale al normale porta un $\\cos\\alpha$. È la regola da ricordare per tutta la lezione.",
    },
    "d139.1": {
      tappa: 4,
      prima: "Ripartiamo dai denti dritti. Lungo la retta d'azione due coppie di denti successive si toccano a distanza $P\\cos\\theta$ una dall'altra. Il segmento dei contatti AB è il tratto in cui il contatto è possibile. Quante coppie ci stanno, in media, in quel tratto?",
      dopo: "I denti in presa sono il segmento dei contatti diviso la distanza fra due contatti. In tre dimensioni, con i denti dritti, le linee di contatto sono parallele all'asse: un dente tocca subito su tutta la sua larghezza e si stacca su tutta la larghezza nello stesso istante.",
    },
    "d139.2": {
      tappa: 3,
      prima: "Nell'elicoidale le linee di contatto sono inclinate di β rispetto all'asse. Guarda il rettangolo dei contatti e segui una linea mentre sale. Chiediti: tocca il rettangolo tutta insieme, o comincia da un angolo? E quando esce, esce tutta insieme?",
      dopo: "Il dente entra in presa da un'estremità (H) e solo dopo tocca su tutta la fascia (J); comincia a staccarsi in M e finisce in K. È la frase della dispensa: se sono entrato in presa davanti, dietro non sono ancora entrato. Il contatto è graduale.",
    },
    "d139.3": {
      tappa: 3,
      prima: "Quanto dura in più il contatto? Quando la parte anteriore della linea ha finito il segmento δ, la parte posteriore deve ancora percorrere un tratto. Questo tratto, CK, è il cateto opposto all'angolo β in un triangolo che ha per altro cateto la fascia b. Qual è la relazione trigonometrica?",
      dopo: "L'allungamento è $b\\operatorname{tg}\\beta$: cresce con la larghezza della ruota e con l'inclinazione. Controllo: con i denti dritti β = 0 e l'allungamento è zero.",
    },
    "d139.4": {
      tappa: 3,
      prima: "La linea di contatto resta in presa finché tocca il rettangolo. Somma allora i due tratti: il segmento dei contatti dei denti dritti e l'allungamento appena trovato. Questa è la lunghezza effettiva del segmento dei contatti.",
      dopo: "La lunghezza effettiva è δ più $b\\operatorname{tg}\\beta$. Attenzione: alcune domande chiamano «lunghezza effettiva» solo il secondo termine; ma è la somma ad avere quel significato.",
    },
    "d139.5": {
      tappa: 4,
      prima: "Ora rifai il conteggio dei denti dritti, ma con la lunghezza effettiva al posto di δ: lunghezza divisa distanza fra due contatti, che è ancora $P\\cos\\theta$. Poi spezza la frazione in due, un termine per ciascun addendo del numeratore.",
      dopo: "Il primo termine è il numero di denti in presa che avresti con i denti dritti, il secondo è il guadagno dovuto all'elica. Più denti lavorano insieme, quindi ciascuno è meno caricato e il carico passa da un dente all'altro gradualmente.",
    },
    "d139.6": {
      tappa: 4,
      prima: "Il termine aggiuntivo si può scrivere in modo più pulito. Contiene $\\operatorname{tg}\\beta$ diviso $\\cos\\theta$. Ricordi il legame fra i due angoli d'elica, $\\operatorname{tg}\\beta = \\operatorname{tg}\\alpha\\cos\\theta$? Sostituiscilo e guarda che cosa si semplifica.",
      dopo: "Il $\\cos\\theta$ si semplifica e il termine aggiuntivo diventa $b\\operatorname{tg}\\alpha/P$: la fascia «vista» lungo la primitiva, diviso il passo. Errore tipico: scrivere α e lasciare anche il $\\cos\\theta$, che sbaglia di un fattore $1/\\cos\\theta$.",
    },
    "d139.7": {
      tappa: 4,
      prima: "Nei libri e nelle norme questi due termini hanno un nome. Il primo dipende dal profilo del dente, il secondo dalla larghezza di fascia. Dai a ciascuno il suo nome: ricoprimento di profilo e ricoprimento di fascia.",
      dopo: "La loro somma si chiama ricoprimento totale ed è il numero di denti in presa della dispensa. I nomi non sono della dispensa, ma possono comparire nelle domande: conviene riconoscerli.",
    },
  },
  racconto:
    "All'orale partirei dal problema dei denti dritti: il carico cambia di colpo, quindi rumore e vibrazioni. Poi la ruota a scalini, che al limite diventa elicoidale. Dico che nel piano frontale nulla cambia, quindi il rapporto è $z_1/z_2$. Srotolo i cilindri: $\\operatorname{tg}\\alpha = 2\\pi R/P_e$ e $\\operatorname{tg}\\beta = 2\\pi R_f/P_e$, quindi $\\operatorname{tg}\\beta = \\operatorname{tg}\\alpha\\cos\\theta$; le grandezze normali si ottengono con $\\cos\\alpha$. Infine il rettangolo dei contatti: le linee inclinate di β allungano il segmento di $b\\operatorname{tg}\\beta$ e i denti in presa diventano $\\delta/(P\\cos\\theta) + b\\operatorname{tg}\\alpha/P$.",
};

export const elicoidaliZmin: LezioneArgomento = {
  perche:
    "Per le ruote a denti dritti sai già che sotto un certo numero di denti, circa 17 con θ = 20°, i denti interferiscono: la punta di un dente scava nel fianco dell'altro. Questo limita quanto può essere piccolo un pignone. Le ruote elicoidali permettono pignoni più piccoli. La domanda della lezione è: **come si trasferisce il risultato dei denti dritti a una ruota elicoidale, e quanti denti servono al minimo?**",
  idea:
    "Il dente elicoidale «lavora» nel piano perpendicolare al dente, non in quello perpendicolare all'asse. Allora tagliamo la ruota con quel piano. Siccome il piano è obliquo rispetto al cilindro, la sezione non è un cerchio ma un'ellisse, come quando tagli di sbieco un salame.\n\nVicino al punto di contatto l'ellisse è molto piatta, e si confonde con un cerchio grande, più grande della ruota vera. Quel cerchio è la primitiva di una ruota a denti dritti immaginaria, la ruota fittizia, che ha lo stesso dente della ruota vera visto nel piano normale. La ruota fittizia ha molti più denti della vera. L'interferenza si decide su di lei: basta che lei abbia almeno 17 denti, e la ruota vera può averne meno.",
  richiami: [
    { titolo: "Ellisse e suoi semiassi", testo: "Un cilindro di raggio $r$ tagliato da un piano inclinato di $\\alpha$ rispetto al piano perpendicolare all'asse dà un'ellisse. Il semiasse minore resta $b = r$ (la direzione che non viene inclinata), il maggiore si allunga: $a = r/\\cos\\alpha$." },
    { titolo: "Circonferenza osculatrice", testo: "In ogni punto di una curva c'è un cerchio che la approssima meglio di tutti, perché ha la stessa tangente e la stessa curvatura: è la circonferenza osculatrice, e il suo raggio è il raggio di curvatura. Per un'ellisse, all'estremo dell'asse minore, dove la curva è più piatta, vale $a^2/b$, più grande di $a$." },
    { titolo: "Modulo e numero di denti", testo: "Per una ruota a denti dritti il diametro primitivo è il modulo per il numero di denti: $mz = 2r$. Per un'elicoidale il modulo frontale vale $m$ e quello normale, perpendicolare al dente, $m_m = m\\cos\\alpha$." },
    { titolo: "Interferenza dei denti dritti", testo: "Con la dentiera come utensile, una ruota a denti dritti non ha interferenza se ha almeno $z^*_{min} = 2/\\sin^2\\theta$ denti: circa 17 con θ = 20°. Sotto questo numero la testa dell'utensile intaglia la base del dente." },
  ],
  ipotesiPerche: [
    "Sono i dati della ruota reale: da questi vogliamo arrivare al numero di denti della ruota fittizia.",
    "È nel piano normale all'elica che i denti si vedono con la loro forma vera. Il contatto all'estremo dell'asse minore è il caso della dispensa: lì l'ellisse è più piatta e la curvatura è facile da scrivere.",
    "Nel piano normale la distanza fra due denti è il passo normale: la ruota fittizia deve avere quel passo, quindi il modulo normale.",
    "Il risultato dei denti dritti è il punto d'appoggio: lo trasferiamo, non lo ricaviamo di nuovo.",
  ],
  disegnoGuida:
    "Se vuoi uno schizzo 3D, disegna il cilindro primitivo e un piano obliquo che lo taglia perpendicolarmente all'elica. Poi passa alla sezione: un'ellisse con l'asse minore verticale, semiasse b = r, e l'asse maggiore orizzontale, semiasse a = r/cos α. Segna il punto di contatto all'estremo inferiore dell'asse minore, dove la curva è più piatta. Lì disegna un cerchio grande, tangente all'ellisse dall'interno, con il centro sulla verticale sopra il contatto: è la circonferenza osculatrice di raggio $R = a^2/b$. Scrivi accanto: «primitiva della ruota fittizia, modulo $m_m$».",
  mappa: [
    "Taglio il cilindro primitivo con il piano normale all'elica: ottengo un'ellisse.",
    "Vicino al contatto sostituisco l'ellisse con la circonferenza osculatrice.",
    "Conto i denti della ruota fittizia con il modulo normale.",
    "Impongo che la ruota fittizia non interferisca e torno alla ruota vera.",
  ],
  dims: {
    d096: {
      introduzione:
        "Vogliamo sostituire la ruota elicoidale con una ruota a denti dritti equivalente, per poter usare tutto ciò che sappiamo dei denti dritti. La strategia è geometrica: tagliamo con il piano normale all'elica, approssimiamo la sezione con un cerchio vicino al punto di contatto e contiamo quanti denti, con il passo normale, stanno su quel cerchio.",
      riepilogo:
        "La sezione normale del cilindro primitivo è un'ellisse con semiassi $r$ e $r/\\cos\\alpha$. Vicino al contatto l'abbiamo sostituita con la circonferenza osculatrice, di raggio $a^2/b = r/\\cos^2\\alpha$: è la primitiva della ruota fittizia. Contando i denti con il modulo normale $m\\cos\\alpha$ abbiamo trovato $z/\\cos^3\\alpha$: due coseni dalla curvatura e uno dal modulo. La fittizia ha più denti della vera.",
    },
    d097: {
      introduzione:
        "Ora che sappiamo quanti denti ha la ruota fittizia, il numero minimo è quasi immediato. La strategia è imporre che sia la ruota fittizia a rispettare il limite dei denti dritti, perché è lei a descrivere il dente nel piano in cui lavora, e poi tornare alla ruota vera con la formula appena trovata.",
      riepilogo:
        "L'interferenza si studia sulla ruota fittizia, che deve avere almeno $z^*_{min}$ denti. Al limite $z_{min}/\\cos^3\\alpha = z^*_{min}$, quindi la ruota vera può avere $\\cos^3\\alpha$ volte meno denti di una a denti dritti. Con θ = 20° e α = 20° si passa da 17 a 15 denti: pignoni più piccoli a parità di modulo.",
    },
  },
  passi: {
    "d096.1": {
      tappa: 0,
      prima: "Taglia il cilindro primitivo con il piano perpendicolare all'elica. Questo piano è inclinato di α rispetto al piano frontale. Chiediti: nella direzione in cui il piano non è inclinato, quanto è largo il taglio? E nella direzione in cui è inclinato, il taglio si allunga o si accorcia?",
      dopo: "Il semiasse minore resta il raggio del cilindro, quello maggiore si allunga di $1/\\cos\\alpha$. Controllo: con α = 0 il piano è quello frontale e l'ellisse torna un cerchio di raggio r. Due ruote elicoidali in presa, viste così, sono due ellissi tangenti.",
    },
    "d096.2": {
      tappa: 1,
      prima: "Vicino al punto di contatto, all'estremo dell'asse minore, l'ellisse è piatta. Quale cerchio la approssima meglio lì? Quello con la stessa tangente e la stessa curvatura, la circonferenza osculatrice. Il suo raggio è il raggio di curvatura dell'ellisse in quel punto: ricorda la formula dei richiami.",
      dopo: "Il raggio è $a^2/b$. È più grande del semiasse maggiore, perché lì l'ellisse è più piatta di un cerchio di raggio a. Questo è il cerchio che fa da primitiva alla ruota fittizia.",
    },
    "d096.3": {
      tappa: 1,
      prima: "Sostituisci i semiassi trovati prima nella formula del raggio di curvatura: $a = r/\\cos\\alpha$ al numeratore, al quadrato, e $b = r$ al denominatore. Semplifica una r.",
      dopo: "Il raggio della primitiva fittizia è $r/\\cos^2\\alpha$, più grande del raggio vero. Errore da evitare: dire che è $r/\\cos\\alpha$, che è solo il semiasse maggiore. Controllo: con α = 0 torna r.",
    },
    "d096.4": {
      tappa: 2,
      prima: "La circonferenza osculatrice è la primitiva di una ruota a denti dritti: quanti denti ha? Per una ruota a denti dritti, diametro primitivo uguale a modulo per denti. Ma quale modulo? La ruota fittizia sta nel piano normale, e lì la distanza fra due denti è il passo normale.",
      dopo: "Il numero di denti della fittizia è il diametro della osculatrice diviso il modulo normale. Usare il modulo frontale sarebbe un errore: quello si misura nel piano perpendicolare all'asse, non nel piano del dente.",
    },
    "d096.5": {
      tappa: 2,
      prima: "Per arrivare ai denti veri ci servono due legami già noti. Il primo: il modulo normale in funzione di quello frontale (lo abbiamo visto con il passo normale). Il secondo: la definizione del modulo frontale della ruota vera, che ha z denti sulla primitiva di raggio r.",
      dopo: "Il modulo normale è il frontale per $\\cos\\alpha$, e il frontale è il diametro primitivo diviso i denti. Sono i due mattoni che servono per sostituire nella riga precedente.",
    },
    "d096.6": {
      tappa: 2,
      prima: "Ora sostituisci tutto nella formula dei denti della fittizia: al numeratore il diametro $2r/\\cos^2\\alpha$, al denominatore il modulo normale $m\\cos\\alpha$. Raccogli i coseni e riconosci in $2r/m$ il numero di denti della ruota vera.",
      dopo: "La fittizia ha $z/\\cos^3\\alpha$ denti: due coseni vengono dalla curvatura dell'ellisse, uno dal modulo normale. Siccome $\\cos^3\\alpha < 1$, la fittizia ha più denti della vera. Con α = 20° sono circa il 20 % in più.",
    },
    "d097.1": {
      tappa: 3,
      prima: "L'interferenza dipende dalla forma del dente nel piano in cui lavora, cioè nel piano normale, dove la ruota si comporta come la fittizia a denti dritti. Che condizione deve rispettare la fittizia per non interferire? Quella che conosci dai denti dritti.",
      dopo: "La fittizia deve avere almeno $z^*_{min}$ denti. È il trucco di tutta la lezione: non rifacciamo il conto dell'interferenza, lo prendiamo dai denti dritti.",
    },
    "d097.2": {
      tappa: 3,
      prima: "Il numero minimo di denti della ruota vera è quello per cui la fittizia è esattamente al limite. Scrivi il numero di denti della fittizia in funzione di quello vero, con la formula appena ricavata, e uguaglialo a $z^*_{min}$.",
      dopo: "La riga dice: la ruota vera con $z_{min}$ denti ha una fittizia con $z^*_{min}$ denti, proprio sul limite. Resta da isolare $z_{min}$.",
    },
    "d097.3": {
      tappa: 3,
      prima: "Moltiplica entrambi i membri per $\\cos^3\\alpha$. Prima di farlo, prova a prevedere: il minimo dell'elicoidale verrà più grande o più piccolo di quello dei denti dritti?",
      dopo: "Più piccolo: $\\cos^3\\alpha < 1$. Una ruota elicoidale può avere meno denti senza interferire, quindi pignoni più piccoli a parità di modulo. Errore tipico: dividere invece di moltiplicare. È la fittizia ad avere più denti, non la vera.",
    },
    "d097.4": {
      tappa: 3,
      prima: "Mettiamo i numeri. Con θ = 20° il minimo dei denti dritti è $2/\\sin^2\\theta$. Calcolalo, poi calcola $\\cos^3 20°$ e moltiplica. Il risultato non sarà intero: in che verso arrotondi, se vuoi essere sicuro di non interferire?",
      dopo: "Si passa da 17,1 a 14,2, e si arrotonda per eccesso a 15: arrotondando per difetto la fittizia avrebbe meno del minimo. Attenzione: la dispensa a p. 168 scrive la formula del minimo con il seno non al quadrato; quella giusta ha $\\sin^2\\theta$.",
    },
  },
  racconto:
    "All'orale direi che sfrutto il risultato dei denti dritti attraverso una ruota fittizia. Taglio il cilindro primitivo con il piano normale all'elica e ottengo un'ellisse di semiassi $r$ e $r/\\cos\\alpha$. Vicino al contatto, all'estremo dell'asse minore, la sostituisco con la circonferenza osculatrice di raggio $a^2/b = r/\\cos^2\\alpha$: è la primitiva della ruota fittizia, con il modulo normale $m\\cos\\alpha$. Ne viene $z_{fitt} = z/\\cos^3\\alpha$. Imponendo che la fittizia non interferisca trovo $z_{min} = z^*_{min}\\cos^3\\alpha$, e chiudo con l'esempio: da 17 a 15 denti.",
};

export const elicoidaliForze: LezioneArgomento = {
  perche:
    "Se apri un cambio con ruote elicoidali, vedi che gli alberi sono montati su cuscinetti capaci di reggere anche spinte lungo l'asse, non solo carichi radiali. Con i denti dritti non serviva. Da dove viene questa spinta? E quanto vale? La domanda della lezione è: **in quali componenti si scompone la forza fra due denti elicoidali, e come dipendono dalla coppia trasmessa?**",
  idea:
    "Senza attrito, due superfici che si toccano si spingono perpendicolarmente alla superficie. Il dente elicoidale è inclinato di α rispetto all'asse, quindi la forza, che è perpendicolare al dente, è inclinata anche lei. Pensa a spingere con la mano una superficie obliqua, come un piano inclinato: una parte della spinta va in avanti, una di lato.\n\nLa forza si scompone in due tempi. Prima, nel piano normale al dente, con l'angolo di pressione: una parte punta verso l'asse (radiale), una è tangente al cilindro. Poi, sul cilindro, la parte tangente si divide ancora, perché il dente è inclinato: una componente gira la ruota (tangenziale) e una spinge lungo l'asse (assiale). Solo la tangenziale fa coppia, quindi dalla coppia si risale a tutte le altre.",
  richiami: [
    { titolo: "Forza fra due superfici senza attrito", testo: "Se si trascura l'attrito, due corpi a contatto si scambiano una forza perpendicolare alla superficie di contatto. Nei denti a evolvente dritti questa forza sta sulla retta d'azione, inclinata dell'angolo di pressione θ rispetto alla tangente alle primitive." },
    { titolo: "Scomposizione di una forza", testo: "Una forza $F$ che forma un angolo $\\theta$ con una direzione ha componente $F\\cos\\theta$ lungo quella direzione e $F\\sin\\theta$ lungo la perpendicolare. In tre dimensioni si può scomporre in due tempi, prima in un piano e poi nell'altro." },
    { titolo: "Momento rispetto a un asse", testo: "Una forza dà momento rispetto a un asse solo con la componente perpendicolare all'asse e che non lo incontra. Una forza che passa per l'asse ha braccio nullo; una parallela all'asse non lo fa girare. Per un corpo in equilibrio la coppia applicata è bilanciata dai momenti delle forze." },
    { titolo: "Grandezze normali dell'elicoidale", testo: "Passando dal piano frontale (perpendicolare all'asse) al piano normale al dente compare un $\\cos\\alpha$: per l'angolo di pressione $\\operatorname{tg}\\theta_m = \\operatorname{tg}\\theta\\cos\\alpha$." },
  ],
  ipotesiPerche: [
    "Il dente sta sul cilindro primitivo di raggio r, ed è lì che applichiamo la forza: r sarà il braccio per la coppia.",
    "Senza attrito la forza è perpendicolare al dente: è questo che fissa la sua direzione e permette di scomporla con soli angoli geometrici.",
    "Nel piano normale l'angolo di pressione è $\\theta_m$, e l'inclinazione del dente sull'asse è α: sono i due angoli delle due scomposizioni.",
  ],
  disegnoGuida:
    "Disegna un tratto del cilindro primitivo e un dente inclinato di α rispetto all'asse. Nel punto di contatto C traccia la forza F perpendicolare al dente. Costruisci intorno a F un parallelepipedo con tre spigoli lungo le tre direzioni naturali: radiale (verso l'asse), tangenziale (lungo la circonferenza), assiale (parallela all'asse). Prima scomposizione: F in R, radiale, e H″, che sta nel piano tangente al cilindro; fra F e H″ segna l'angolo $\\theta_m$. Seconda scomposizione, sulla faccia tangente: H″ in Q, tangenziale, e A, assiale; fra H″ e Q segna l'angolo α. Usa colori diversi per le due scomposizioni.",
  mappa: [
    "Scompongo F nel piano normale: radiale R e componente H″ tangente al cilindro.",
    "Scompongo H″ sul cilindro: tangenziale Q e assiale A.",
    "Solo Q fa momento: dalla coppia trovo Q.",
    "Scrivo tutto in funzione della coppia e controllo i casi limite.",
  ],
  dims: {
    d098: {
      introduzione:
        "Vogliamo le tre componenti della forza fra i denti, radiale, tangenziale e assiale, espresse con la coppia. La strategia è scomporre la forza normale in due tempi, ciascuno con un angolo solo, e poi usare l'equilibrio alla rotazione della ruota: siccome soltanto una componente fa momento, la coppia la determina, e le altre seguono.",
      riepilogo:
        "La forza normale al dente, nel piano normale, si divide con $\\theta_m$ in radiale e in una componente tangente al cilindro. Questa, con l'inclinazione α del dente, si divide in tangenziale e assiale. Solo la tangenziale ha momento rispetto all'asse, quindi vale $C/r$. Da lì vengono la radiale, uguale a quella dei denti dritti con l'angolo frontale, e la spinta assiale $Q\\operatorname{tg}\\alpha$, la novità delle elicoidali.",
    },
  },
  passi: {
    "d098.1": {
      tappa: 0,
      prima: "La forza F è perpendicolare al dente e sta nel piano normale al dente. In quel piano il dente ha il suo angolo di pressione, $\\theta_m$, misurato fra la forza e la direzione tangente al cilindro. Scomponi F in una componente che punta verso l'asse (radiale) e in una tangente al cilindro: quale prende il seno e quale il coseno?",
      dopo: "La radiale è $F\\sin\\theta_m$, quella tangente al cilindro, H″, è $F\\cos\\theta_m$. È la stessa scomposizione dei denti dritti, fatta nel piano normale. H″ però non è ancora la forza che gira la ruota: è inclinata come il dente.",
    },
    "d098.2": {
      tappa: 1,
      prima: "H″ sta nel piano tangente al cilindro ed è perpendicolare al dente. Il dente è inclinato di α rispetto all'asse; quindi la sua perpendicolare è inclinata di α rispetto alla direzione tangenziale. Scomponi H″ in una componente tangenziale, che fa girare la ruota, e in una lungo l'asse.",
      dopo: "La tangenziale è $H''\\cos\\alpha$, l'assiale $H''\\sin\\alpha$. È qui che nasce la spinta assiale: dall'inclinazione del dente. Controllo: con α = 0 il dente è dritto, H″ è tutta tangenziale e la spinta assiale sparisce.",
    },
    "d098.3": {
      tappa: 1,
      prima: "Metti insieme le due scomposizioni: sostituisci al posto di H″ la sua espressione in funzione di F nella riga precedente, e accanto riscrivi la radiale.",
      dopo: "Le tre componenti in funzione della forza normale: la tangenziale ha due coseni, l'assiale un coseno e un seno, la radiale un solo seno. Sono le tre proiezioni di F sugli spigoli del parallelepipedo della figura.",
    },
    "d098.4": {
      tappa: 2,
      prima: "La forza non la conosciamo, la coppia sì. Scrivi l'equilibrio alla rotazione della ruota attorno al suo asse. Chiediti quali componenti hanno momento: la radiale passa per l'asse, l'assiale è parallela all'asse. Resta solo la tangenziale, con braccio uguale al raggio primitivo.",
      dopo: "La coppia è la tangenziale per il raggio. A p. 189 la dispensa dimentica il braccio e scrive la coppia uguale a una forza: le unità di misura non tornano, ed è un refuso. Il controllo delle unità è il modo più rapido per accorgersene.",
    },
    "d098.5": {
      tappa: 3,
      prima: "Dalla riga precedente ricavi subito la tangenziale. Poi ricava F dividendo la tangenziale per i due coseni, e sostituiscila nelle espressioni della radiale e dell'assiale. Per l'assiale guarda bene: $\\cos\\theta_m$ si semplifica e resta un rapporto fra seno e coseno di α.",
      dopo: "La tangenziale è $C/r$, come nei denti dritti. La radiale ha un $1/\\cos\\alpha$ in più. La spinta assiale è semplicemente la tangenziale per $\\operatorname{tg}\\alpha$: più è inclinata l'elica, più spinta. Con α = 20° la spinta è circa un terzo della tangenziale.",
    },
    "d098.6": {
      tappa: 3,
      prima: "La radiale contiene $\\operatorname{tg}\\theta_m/\\cos\\alpha$. Ricorda il legame fra l'angolo di pressione normale e quello frontale: $\\operatorname{tg}\\theta_m = \\operatorname{tg}\\theta\\cos\\alpha$. Sostituiscilo e semplifica.",
      dopo: "Il $\\cos\\alpha$ si semplifica e la radiale diventa $(C/r)\\operatorname{tg}\\theta$: la stessa dei denti dritti, con l'angolo di pressione frontale. Nel piano frontale la ruota elicoidale si comporta come una a denti dritti anche per le forze; la novità è solo l'assiale.",
    },
    "d098.7": {
      tappa: 3,
      prima: "Controllo di buon senso: che cosa succede se l'elica non c'è, cioè α = 0? Metti α = 0 nelle formule della spinta assiale e della radiale. Ricorda che con α = 0 l'angolo normale e quello frontale coincidono.",
      dopo: "La spinta assiale è zero e la radiale è la tangenziale per $\\operatorname{tg}\\theta$: ritrovi esattamente le forze dei denti dritti. Un risultato generale deve contenere il caso particolare già noto, e qui succede.",
    },
    "d098.8": {
      tappa: 3,
      prima: "Ultimo controllo: le tre componenti sono lungo tre direzioni perpendicolari fra loro, come gli spigoli del parallelepipedo. Che legame deve esserci fra i loro quadrati e il quadrato della forza intera? Pensa al teorema di Pitagora in tre dimensioni.",
      dopo: "La somma dei quadrati delle tre componenti ridà il quadrato di F: con le formule trovate, $\\cos^2\\theta_m(\\cos^2\\alpha + \\sin^2\\alpha) + \\sin^2\\theta_m = 1$. La scomposizione è coerente: non abbiamo perso né aggiunto niente.",
    },
  },
  racconto:
    "All'orale direi che senza attrito la forza è normale al dente e sta nel piano normale. La scompongo con l'angolo di pressione normale: $R = F\\sin\\theta_m$ e $H'' = F\\cos\\theta_m$. Poi, poiché il dente è inclinato di α, divido H″ in $Q = H''\\cos\\alpha$ e $A = H''\\sin\\alpha$. Solo Q fa momento, quindi $Q = C/r$, e ne seguono $A = (C/r)\\operatorname{tg}\\alpha$ e $R = (C/r)\\operatorname{tg}\\theta_m/\\cos\\alpha = (C/r)\\operatorname{tg}\\theta$. Chiudo dicendo che con α = 0 torno ai denti dritti e che la spinta assiale si regge con i cuscinetti o si annulla con le ruote a freccia.",
};

export const coniche: LezioneArgomento = {
  perche:
    "Nel differenziale di un'auto il moto arriva dall'albero di trasmissione, che va avanti e indietro lungo l'auto, e deve passare ai semiassi delle ruote, che sono di traverso: gli assi si incontrano ad angolo retto. Le ruote cilindriche non bastano più. Servono le ruote coniche, come nel trapano a mano a manovella. Le domande della lezione sono due: **da che cosa dipende il rapporto di trasmissione fra due ruote coniche, e quali forze si scambiano?**",
  idea:
    "Le ruote cilindriche si possono pensare come due cilindri che rotolano uno sull'altro senza strisciare. Per assi che si incontrano, al posto dei cilindri ci sono due coni con il vertice comune nel punto in cui si incontrano gli assi. Si toccano lungo una retta, la generatrice comune, e rotolano uno sull'altro come due coni gelato appoggiati punta contro punta.\n\nLungo la generatrice la velocità dei due coni è la stessa in ogni punto. Prendi il punto all'estremo: la sua distanza da ciascun asse è il raggio della base di ciascun cono, e da qui viene il rapporto. Per le forze si ragiona in un piano perpendicolare alla generatrice, dove il dente si comporta come un dente cilindrico: la componente tangenziale fa la coppia, e la componente che punta verso gli assi si divide fra radiale e assiale. Anche qui, come nelle elicoidali, nasce una spinta lungo l'asse.",
  richiami: [
    { titolo: "Rotolamento senza strisciamento", testo: "Due corpi che rotolano uno sull'altro senza strisciare hanno, nei punti di contatto, la stessa velocità. Per due ruote che girano attorno ai loro assi, la velocità di un punto è $\\omega$ per la distanza dall'asse: da qui $\\omega_1 r_1 = \\omega_2 r_2$." },
    { titolo: "Cono e sua semiapertura", testo: "Un cono con vertice O ha un asse e una semiapertura φ, l'angolo fra l'asse e una generatrice. Un punto P della generatrice a distanza $\\overline{OP}$ dal vertice dista dall'asse $\\overline{OP}\\sin\\varphi$: è il raggio della base del cono in quel punto." },
    { titolo: "Formule di sottrazione", testo: "Il seno della differenza di due angoli si sviluppa così: $\\sin(\\psi - \\varphi) = \\sin\\psi\\cos\\varphi - \\cos\\psi\\sin\\varphi$. Dividendo un'equazione con seni e coseni dello stesso angolo per il coseno si fa comparire la tangente." },
    { titolo: "Forze sui denti senza attrito", testo: "Senza attrito la forza fra due denti è perpendicolare al profilo e forma con la direzione tangenziale l'angolo di pressione θ: la componente tangenziale $F\\cos\\theta$ fa la coppia, quella $F\\sin\\theta$ punta verso l'asse." },
  ],
  ipotesiPerche: [
    "Sono i dati geometrici: due coni con lo stesso vertice O, dove si incontrano gli assi; le loro semiaperture e l'angolo fra gli assi descrivono tutta la geometria.",
    "È la condizione cinematica delle superfici primitive: i coni si toccano lungo una generatrice e rotolano senza strisciare, quindi lungo di essa le velocità coincidono.",
    "Gli assi non sono paralleli, quindi un segno comune per le velocità non ha senso: si lavora in modulo, come per il rendimento delle coniche.",
    "Il piano perpendicolare alla generatrice è quello in cui il dente conico si vede come un dente cilindrico: lì la forza ha la sua direzione semplice, inclinata di θ.",
  ],
  disegnoGuida:
    "Segna il vertice O. Da O traccia la generatrice comune OP, inclinata. Poi traccia i due assi da O, da parti opposte della generatrice: l'asse 1 forma con OP l'angolo φ₁, l'asse 2 l'angolo φ₂; l'angolo fra gli assi è ψ = φ₁ + φ₂. Completa i due coni con la base in P. Da P abbassa le perpendicolari ai due assi: sono i raggi r₁ e r₂. Se vuoi, indica la velocità V di P, perpendicolare al foglio. Per le forze, in P disegna F″ perpendicolare alla generatrice, nel piano degli assi, e scomponila in R₁ radiale (verso l'asse 1) e A₁ assiale (lungo l'asse 1): fra F″ e R₁ c'è ancora l'angolo φ₁.",
  mappa: [
    "Il punto P della generatrice ha la stessa velocità sui due coni.",
    "Con la generatrice comune scrivo i raggi con i seni: il rapporto.",
    "Noti il rapporto e l'angolo fra gli assi, progetto i coni.",
    "Denti e casi particolari: rapporto dei denti, ruota piano-conica.",
    "Forze: nel piano perpendicolare alla generatrice la tangenziale fa la coppia.",
    "La componente verso gli assi si divide in radiale e assiale.",
  ],
  dims: {
    d099: {
      introduzione:
        "Vogliamo il rapporto di trasmissione di due ruote coniche e, al contrario, come scegliere i coni per avere un rapporto dato. La strategia è la stessa delle ruote cilindriche: stessa velocità nel punto di contatto. In più usiamo la geometria dei coni, che hanno in comune la generatrice, per esprimere i raggi con gli angoli di semiapertura.",
      riepilogo:
        "Il punto P all'estremo della generatrice ha la stessa velocità sui due coni, quindi le velocità angolari stanno al contrario dei raggi. I raggi sono la generatrice comune per i seni delle semiaperture, quindi il rapporto è il rapporto dei seni. Con ψ = φ₁ + φ₂ abbiamo ricavato le semiaperture dai dati di progetto; con assi perpendicolari $\\operatorname{tg}\\varphi_1 = \\tau$. Il rapporto è anche quello dei denti, e la ruota piano-conica ne è il caso limite.",
    },
    d100: {
      introduzione:
        "Vogliamo le tre componenti della forza fra i denti conici, tangenziale, radiale e assiale, in funzione della coppia. La strategia ricorda quella delle elicoidali: due scomposizioni successive, ciascuna con un angolo solo. La prima, nel piano perpendicolare alla generatrice, con l'angolo di pressione; la seconda, nel piano degli assi, con la semiapertura del cono.",
      riepilogo:
        "Nel piano perpendicolare alla generatrice la forza si divide in tangenziale, che fa la coppia, e in una componente che punta verso gli assi, $Q\\operatorname{tg}\\theta$. Il cono inclina questa seconda componente rispetto all'asse della ruota: si divide in radiale con $\\cos\\varphi_1$ e assiale con $\\sin\\varphi_1$. Con assi perpendicolari la spinta assiale su una ruota è la radiale sull'altra. Le coniche hanno sempre una spinta assiale da reggere con i cuscinetti.",
    },
  },
  passi: {
    "d099.1": {
      tappa: 0,
      prima: "I due coni rotolano uno sull'altro senza strisciare lungo la generatrice comune. Prendi il punto P all'estremo della generatrice: appartiene a entrambi i coni. Che velocità ha come punto del cono 1? E come punto del cono 2? Ricorda che ciascun cono ruota attorno al proprio asse.",
      dopo: "La velocità di P è la stessa sui due coni: velocità angolare per distanza dall'asse, da una parte e dall'altra. È la stessa condizione delle ruote cilindriche: senza strisciamento, nel contatto le velocità coincidono.",
    },
    "d099.2": {
      tappa: 1,
      prima: "I due raggi $r_1$ e $r_2$ sono le distanze di P dai due assi. Guarda il triangolo rettangolo formato da O, P e il piede della perpendicolare da P all'asse 1: l'ipotenusa è la generatrice OP, l'angolo in O è φ₁, il raggio è il cateto opposto. Che relazione c'è? Fai lo stesso per il cono 2.",
      dopo: "La generatrice OP si può scrivere da tutti e due i coni: è la stessa, perché i coni la hanno in comune. È questo il legame geometrico fra i due raggi: ciascuno è OP per il seno della sua semiapertura.",
    },
    "d099.3": {
      tappa: 1,
      prima: "Dalla prima riga il rapporto delle velocità angolari è il rapporto inverso dei raggi. Dalla seconda il rapporto dei raggi è il rapporto dei seni, perché OP si semplifica. Metti insieme le due cose.",
      dopo: "Il rapporto di trasmissione dipende solo dalle aperture dei coni, non dalla loro lunghezza. Controllo: due coni uguali danno τ = 1. Errore da evitare: usare le tangenti, che varrebbero solo se i coni avessero la stessa altezza, non la stessa generatrice.",
    },
    "d099.4": {
      tappa: 2,
      prima: "Per il progetto conviene usare l'angolo fra gli assi, che è un dato della macchina. Guarda il disegno: i due assi stanno da parti opposte della generatrice, uno a φ₁ e l'altro a φ₂. Che angolo formano fra loro?",
      dopo: "L'angolo fra gli assi è la somma delle due semiaperture. Con assi perpendicolari, come nel differenziale, le due semiaperture sono complementari.",
    },
    "d099.5": {
      tappa: 2,
      prima: "Noti τ e ψ, vogliamo φ₁. Dal rapporto dei seni, $\\sin\\varphi_1 = \\tau\\sin\\varphi_2$, e $\\varphi_2 = \\psi - \\varphi_1$. Sviluppa il seno della differenza con la formula di sottrazione. Poi dividi tutto per $\\tau\\cos\\varphi_1$ per far comparire $\\operatorname{tg}\\varphi_1$, e raccoglilo.",
      dopo: "La tangente della semiapertura del cono 1 si ricava dai soli dati di progetto, τ e ψ. Controllo: con τ = 1 e ψ = 90° viene $\\operatorname{tg}\\varphi_1 = 1$, cioè 45°: due coni uguali, come ci si aspetta.",
    },
    "d099.6": {
      tappa: 2,
      prima: "Per il cono 2 il ragionamento è simmetrico. Questa volta scrivi $\\sin\\varphi_2 = \\sin\\varphi_1/\\tau$ e sostituisci $\\varphi_1 = \\psi - \\varphi_2$. Sviluppa, dividi per $\\cos\\varphi_2$ e raccogli $\\operatorname{tg}\\varphi_2$.",
      dopo: "La formula è la stessa con τ al posto di $1/\\tau$: il cono 2 è il cono 1 visto dall'altra parte. Controllo: se τ è piccolo (ruota 2 lenta e grande) $\\operatorname{tg}\\varphi_2$ è grande, cioè il cono 2 è molto aperto.",
    },
    "d099.7": {
      tappa: 2,
      prima: "Il caso più comune è quello degli assi perpendicolari, come nel differenziale. Metti ψ = 90° nella formula di φ₁: quanto valgono seno e coseno di un angolo retto?",
      dopo: "La tangente della semiapertura del cono 1 è proprio il rapporto di trasmissione. È una formula da ricordare: con un rapporto di 1/3, per esempio, il cono 1 ha una semiapertura di circa 18°.",
    },
    "d099.8": {
      tappa: 3,
      prima: "Il rapporto si può scrivere anche con i denti? Nelle coniche il dente si rimpicciolisce avvicinandosi al vertice: passo, modulo e altezza sono proporzionali alla distanza da O. Allora a una data distanza dal vertice le due ruote hanno lo stesso modulo, e lì vale la relazione delle cilindriche fra modulo, denti e raggio.",
      dopo: "Il rapporto è anche quello dei denti, come per le cilindriche. Il numero di denti è lo stesso a qualunque distanza dal vertice, quindi il rapporto non dipende da dove si misura. Attenzione: qui τ è uscita su entrata; altrove trovi il rapporto capovolto.",
    },
    "d099.9": {
      tappa: 3,
      prima: "Caso limite: se la semiapertura del cono 2 è 90°, il cono si apre fino a diventare un piano. È la ruota piano-conica, l'analogo della dentiera per le cilindriche. Metti φ₂ = 90° nel rapporto dei seni e ricava la velocità della ruota 2.",
      dopo: "La ruota piano-conica gira con velocità $\\omega_1\\sin\\varphi_1$. A differenza della dentiera non trasla: ruota attorno al suo asse. È utile perché i denti di una piano-conica sono semplici da tagliare, come quelli della dentiera.",
    },
    "d100.1": {
      tappa: 4,
      prima: "Ragioniamo nel piano perpendicolare alla generatrice di contatto: lì il dente conico si vede come un dente cilindrico. La forza F, senza attrito, è inclinata dell'angolo di pressione θ rispetto alla direzione tangenziale. Scomponila in una componente tangenziale e in una perpendicolare a questa, che punta verso gli assi.",
      dopo: "La tangenziale è $F\\cos\\theta$, l'altra $F\\sin\\theta$. La seconda sta nel piano degli assi e li incontra: la chiamiamo F″ (nella figura del libro F′). Attenzione a non confonderla con la spinta assiale: è solo un passaggio intermedio.",
    },
    "d100.2": {
      tappa: 4,
      prima: "Ora la coppia. Scrivi l'equilibrio alla rotazione di ciascuna ruota attorno al proprio asse. Chiediti quale componente ha momento: F″ incontra gli assi e non ne ha. Resta solo Q, con braccio uguale alla distanza del punto di contatto da ciascun asse. Poi ricava F.",
      dopo: "La coppia su ciascuna ruota è Q per il suo raggio: la stessa Q con due bracci diversi. Il rapporto fra le coppie è quindi il rapporto dei raggi. In questa riga la dispensa scrive $\\vartheta$ invece di θ: è lo stesso angolo di pressione.",
    },
    "d100.3": {
      tappa: 5,
      prima: "Ora dividiamo F″ rispetto all'asse della ruota 1: una parte verso l'asse (radiale), una lungo l'asse (assiale). F″ è perpendicolare alla generatrice e sta nel piano degli assi. L'asse 1 forma con la generatrice l'angolo φ₁. Che angolo forma allora F″ con la direzione radiale? Due rette perpendicolari a due rette che formano φ₁ formano anche loro φ₁.",
      dopo: "La radiale prende il coseno di φ₁, l'assiale il seno. Controllo: con un cono molto stretto (φ₁ piccolo, ruota quasi cilindrica) la spinta assiale è piccola e F″ è quasi tutta radiale, come in una ruota cilindrica a denti dritti.",
    },
    "d100.4": {
      tappa: 5,
      prima: "Scriviamo tutto con la coppia. Dalla riga di prima $F = C_1/(r_1\\cos\\theta)$. Sostituiscila in F″: il prodotto $F\\sin\\theta$ diventa Q per $\\operatorname{tg}\\theta$. Poi metti questo nelle espressioni di radiale e assiale.",
      dopo: "La tangenziale è $C_1/r_1$; la componente che punta agli assi è $Q\\operatorname{tg}\\theta$, che il cono divide in radiale con $\\cos\\varphi_1$ e assiale con $\\sin\\varphi_1$. Errore tipico: scrivere $Q\\sin\\theta$ al posto di $Q\\operatorname{tg}\\theta$.",
    },
    "d100.5": {
      tappa: 5,
      prima: "Con assi perpendicolari c'è una simmetria curiosa. La stessa F″ agisce, uguale e opposta, anche sulla ruota 2, per azione e reazione. Per la ruota 2 la semiapertura è φ₂ = 90° − φ₁. Scrivi la spinta assiale sulla ruota 2 con $\\sin\\varphi_2$ e trasforma il seno di un angolo complementare.",
      dopo: "La spinta assiale sulla ruota 2 è uguale alla forza radiale sulla ruota 1, e viceversa. Con assi perpendicolari l'asse della ruota 2 è la direzione radiale della ruota 1: è la stessa forza vista da due ruote.",
    },
    "d100.6": {
      tappa: 5,
      prima: "Rileggi la formula della spinta assiale: si annulla mai, se il cono ha un'apertura vera? Pensa a che cosa comporta per gli alberi che portano le ruote, e confronta con quanto visto per le elicoidali.",
      dopo: "La spinta assiale è sempre diversa da zero: gli alberi devono avere cuscinetti capaci di reggere carichi sia radiali sia assiali, come per le elicoidali. È un dato importante quando si progetta il supporto di una coppia conica.",
    },
  },
  racconto:
    "All'orale partirei dall'idea: per assi concorrenti le primitive sono due coni con il vertice comune che rotolano lungo una generatrice. Uguaglio la velocità di P, $\\omega_1 r_1 = \\omega_2 r_2$, scrivo i raggi come $\\overline{OP}\\sin\\varphi$ e ottengo $\\tau = \\sin\\varphi_1/\\sin\\varphi_2 = z_1/z_2$. Poi, con $\\psi = \\varphi_1 + \\varphi_2$, le formule di progetto, e con assi perpendicolari $\\operatorname{tg}\\varphi_1 = \\tau$. Per le forze ragiono nel piano perpendicolare alla generatrice: $Q = C_1/r_1$, la componente verso gli assi è $Q\\operatorname{tg}\\theta$, che si divide in $R = Q\\operatorname{tg}\\theta\\cos\\varphi_1$ e $A = Q\\operatorname{tg}\\theta\\sin\\varphi_1$. Chiudo con la spinta assiale e i cuscinetti.",
};
