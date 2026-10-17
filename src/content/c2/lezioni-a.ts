/** Lezioni discorsive C2 (parte A): attrito, ribaltamento, impuntamento, perno. Vedi docs/BRIEF_LEZIONI.md. */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ====================================================================== c2-attrito
export const attrito: LezioneArgomento = {
  perche: r`Pensa a quando provi a spostare un armadio pesante. Spingi un po' e non si muove; spingi di più e ancora niente; a un certo punto parte di colpo e, una volta in moto, spingerlo diventa un po' più facile. Il pavimento, insomma, «risponde» alla tua spinta con una forza che cambia: prima ti contrasta esattamente, poi cede. La domanda che guida la lezione è: **fino a che punto il pavimento riesce a trattenere un corpo, che cosa cambia quando il corpo comincia a strisciare, e c'è un modo grafico per capire al volo se un corpo resta fermo?**`,
  idea: r`Le due superfici, viste al microscopio, sono piene di piccole asperità che si incastrano tra loro. Quando spingi il corpo, queste asperità si oppongono: la forza tangenziale del pavimento non ha un valore fisso, ma vale **esattamente quanto serve** per tenere fermo il corpo. Se spingi con 10 N, risponde con 10 N; se spingi con 20 N, risponde con 20 N. È una reazione, come quella di un tavolo che regge un libro.

Questa reazione però ha un tetto: le asperità reggono al massimo una forza proporzionale a quanto il corpo è premuto contro il piano. Superato il tetto, si rompono o si deformano e il corpo striscia. Da quel momento la forza tangenziale non è più «quanto serve», ma ha un valore fissato, un po' più piccolo del tetto: ecco perché l'armadio, una volta partito, scorre più facilmente.

C'è poi un modo geometrico di vedere tutto questo. Somma la forza normale e quella tangenziale: ottieni una sola freccia, la risultante del contatto. Più la spinta è forte, più questa freccia si inclina. Il tetto dell'aderenza diventa un'inclinazione massima: un cono attorno alla normale dentro cui la freccia deve restare.`,
  richiami: [
    { titolo: 'Equilibrio di un corpo', testo: r`Un corpo fermo ha la somma delle forze nulla, separatamente in orizzontale e in verticale, e anche la somma dei momenti nulla. Ogni forza che agisce va quindi bilanciata da qualcos'altro: se spingi un corpo fermo verso destra, qualcuno lo sta spingendo verso sinistra con la stessa forza.` },
    { titolo: 'Reazione vincolare', testo: r`Una reazione vincolare è la forza con cui un vincolo (un piano, un muro, un perno) risponde al corpo. Non ha un valore scritto in anticipo: vale quanto serve per rispettare il vincolo. Il tavolo regge il libro con una forza uguale al peso del libro; se metti due libri, raddoppia. Si trova sempre dalle equazioni di equilibrio.` },
    { titolo: 'Tangente di un angolo', testo: r`In un triangolo rettangolo la tangente di un angolo è il rapporto fra il cateto opposto e il cateto adiacente. Se una freccia ha componente verticale $F_N$ e orizzontale $F_T$, l'angolo $\alpha$ che forma con la verticale ha $\tan\alpha = F_T/F_N$. La tangente cresce con l'angolo: angolo più grande, rapporto più grande, e viceversa.` },
    { titolo: 'Seconda legge della dinamica', testo: r`Se le forze lungo una direzione non si bilanciano, il corpo accelera in quella direzione: la somma delle forze è uguale a massa per accelerazione, $\sum F = Ma$. È l'equilibrio «con qualcosa in più»: se la somma è zero, l'accelerazione è zero e si torna alla statica.` },
  ],
  ipotesiPerche: [
    r`È il caso più semplice possibile: un blocco, un piano e una spinta. Mettiamo la forza in alto, a quota h, per scoprire che il contatto non deve solo resistere allo scivolamento ma anche alla rotazione.`,
    r`Non ci interessa sapere la pressione punto per punto: per l'equilibrio basta conoscere le due risultanti. Lo spostamento b della normale viene dall'equilibrio alla rotazione, perché la spinta in alto e la tangenziale in basso formano una coppia.`,
    r`Il modello di Coulomb è il più semplice che descrive bene la realtà: due numeri costanti che dipendono dai materiali. Il fatto che $f_{att} < f_{ad}$ spiega lo «strappo» iniziale quando un corpo parte.`,
  ],
  disegnoGuida: r`Traccia prima il piano orizzontale e appoggiaci sopra un rettangolo: è il corpo. Segna il baricentro G al centro e da lì la freccia del peso Mg verso il basso. Poi metti la spinta F orizzontale sullo spigolo in alto a sinistra, e quota la sua altezza h: servirà per i momenti. Ora passa al contatto: disegna la forza tangenziale $F_T$ sul piano, verso sinistra, cioè opposta a F. Disegna la normale $F_N$ verso l'alto, ma un po' spostata a destra della verticale di G, di una quantità b: è lei che bilancia la coppia di F e $F_T$. Somma $F_N$ e $F_T$ con la regola del parallelogramma e ottieni la risultante R, inclinata di α rispetto alla normale. Per ultimo, dal punto di contatto, traccia due rette simmetriche attorno alla normale, ciascuna inclinata di $\varphi_{ad}$: è il cono d'aderenza. Se R sta dentro, il corpo resta fermo.`,
  mappa: [
    'Scrivo l\'equilibrio del corpo fermo: chi bilancia la spinta?',
    'Metto il tetto: l\'aderenza regge al massimo f_ad volte la normale; oltre, il corpo striscia.',
    'Sommo normale e tangenziale: l\'inclinazione della risultante dà l\'angolo e il cono d\'aderenza.',
    'Applico tutto al piano inclinato: quando il corpo resta fermo e come scivola.',
  ],
  dims: {
    d024: {
      introduzione: r`Vogliamo capire quando un corpo spinto resta fermo e cosa succede quando parte. La strategia ha due metà. Nella prima ragioniamo con le forze: equilibrio, poi il tetto dell'aderenza, poi la forza durante lo strisciamento. Nella seconda traduciamo tutto in un angolo, l'inclinazione della risultante, e otteniamo il cono d'aderenza. Alla fine controlliamo il risultato sul piano inclinato, dove l'angolo del cono diventa l'angolo del piano.`,
      riepilogo: r`Siamo partiti dall'equilibrio: la forza tangenziale del piano è una reazione che vale quanto la spinta. Questa reazione ha un tetto, $f_{ad}$ volte la normale; superato il tetto il corpo striscia e la forza diventa $f_{att}$ volte la normale, opposta al moto. Sommando normale e tangenziale abbiamo visto che il tetto corrisponde a un'inclinazione massima della risultante, l'angolo d'aderenza: il corpo è fermo se la risultante sta nel cono. Sul piano inclinato il cono dice che il corpo resta fermo finché il piano è meno ripido di $\varphi_{ad}$.`,
    },
  },
  passi: {
    'd024.1': {
      tappa: 0,
      prima: r`Cominciamo dal corpo fermo e chiediamoci chi tiene in equilibrio le forze. In verticale c'è il peso, verso il basso: qualcosa deve spingere verso l'alto con la stessa forza. In orizzontale c'è la tua spinta F: se il corpo non si muove, qualcosa deve spingerlo nel verso opposto con la stessa intensità. L'unico candidato, in entrambi i casi, è il piano.`,
      dopo: r`La riga dice due cose: la normale è uguale e opposta al peso, la tangenziale è uguale e opposta alla spinta. Nota il punto chiave: $F_T$ non è un dato, è una reazione che vale quanto serve. Controllo: se non spingi ($F = 0$), anche $F_T$ è zero; il piano non spinge mai di lato da solo.`,
    },
    'd024.2': {
      tappa: 1,
      prima: r`Ma il piano non può rispondere con una forza grande quanto vuoi: prima o poi l'armadio parte. Chiediti da cosa dipende questo tetto. Più il corpo è premuto contro il piano, più le asperità sono incastrate e più forza reggono. Il tetto, quindi, sarà proporzionale alla normale, con un coefficiente che dipende dai materiali.`,
      dopo: r`Leggila così: la forza di aderenza è uguale alla tangenziale richiesta e non può superare $f_{ad}$ per la normale. Finché il corpo è fermo vale il «minore o uguale», non l'uguale: l'uguaglianza vale solo nell'istante in cui sta per partire. Controllo: raddoppiando il peso raddoppia anche il tetto, per questo un armadio pieno è più difficile da far partire.`,
    },
    'd024.3': {
      tappa: 1,
      prima: r`Cosa succede se la spinta supera il tetto? Le asperità cedono e il corpo comincia a strisciare. Da questo momento la tangenziale non può più «adattarsi» alla spinta: ha un valore deciso dal materiale e dalla normale. Ci serve sapere quanto vale, in che direzione agisce e come si confronta con il tetto dell'aderenza.`,
      dopo: r`La forza di attrito vale $f_{att}$ per la normale, è diretta come la velocità relativa ma in verso opposto, e $f_{att}$ è più piccolo di $f_{ad}$. È l'esperienza dell'armadio: partire costa più che continuare. Il segno meno sulla velocità ricorda che l'attrito frena sempre il moto relativo, non lo aiuta mai.`,
    },
    'd024.4': {
      tappa: 2,
      prima: r`Ora cambiamo punto di vista. Invece di tenere separate normale e tangenziale, sommiamole in un'unica freccia: la risultante di tutto il contatto. Questa freccia non è verticale: è inclinata, tanto più quanto è grande la tangenziale rispetto alla normale. Chiediti quale funzione trigonometrica lega l'angolo dalla verticale al rapporto fra le due componenti.`,
      dopo: r`La riga dice che la risultante è la somma delle due forze e che la tangente della sua inclinazione è il rapporto $F_T/F_N$. Siccome $F_N$ resta uguale al peso, spingendo di più cresce $F_T$ e la freccia si inclina sempre di più. Controllo: senza spinta $\alpha = 0$, la risultante è verticale.`,
    },
    'd024.5': {
      tappa: 2,
      prima: r`Se la freccia si inclina sempre di più spingendo, c'è un'inclinazione massima? Sì: quella che corrisponde al tetto dell'aderenza. Mettiamo nella tangente il valore limite della tangenziale, cioè $f_{ad}$ per la normale, e guardiamo cosa resta: la normale compare sopra e sotto e si semplifica.`,
      dopo: r`L'inclinazione massima è l'arcotangente di $f_{ad}$: si chiama angolo d'aderenza, $\varphi_{ad}$. Nota che dipende solo dal coefficiente, cioè dai materiali, e non dal peso né dalla spinta. Con $f_{ad} = 0{,}5$ vale circa 27°. Attenzione: è un'arcotangente, non un arcoseno, perché $f_{ad}$ è un rapporto fra cateti.`,
    },
    'd024.6': {
      tappa: 2,
      prima: r`Ora abbiamo due modi di dire la stessa cosa. Con le forze: la tangenziale non deve superare $f_{ad}F_N$. Con gli angoli: la risultante non deve inclinarsi più di $\varphi_{ad}$. Perché sono equivalenti? Perché la tangente è una funzione crescente: un rapporto più piccolo corrisponde a un angolo più piccolo. Pensa poi a cosa si ottiene facendo girare la retta inclinata di $\varphi_{ad}$ attorno alla normale.`,
      dopo: r`Il corpo è in aderenza se e solo se la risultante di contatto sta dentro un cono con asse la normale e semiapertura $\varphi_{ad}$: il cono d'aderenza. Se la risultante sta sulla superficie del cono, il corpo sta per partire. Se l'equilibrio richiede una risultante fuori dal cono, il corpo non può restare fermo. È un test che si fa con un'occhiata al disegno.`,
    },
    'd024.7': {
      tappa: 2,
      prima: r`E quando il corpo striscia? La tangenziale non è più libera: vale esattamente $f_{att}$ per la normale. Quindi anche l'inclinazione della risultante è fissata, non può variare. Ripeti lo stesso conto del passo di prima, ma con il coefficiente di attrito al posto di quello di aderenza, e confronta i due angoli.`,
      dopo: r`Durante lo strisciamento la risultante è inclinata esattamente dell'angolo di attrito $\varphi_{att}$, arcotangente di $f_{att}$. Siccome $f_{att} < f_{ad}$, questo angolo è più piccolo di quello d'aderenza: in moto la risultante sta dentro il cono d'aderenza, su un cono più stretto. Lo ritroverai nel perno.`,
    },
    'd024.8': {
      tappa: 3,
      prima: r`Proviamo il cono su un caso concreto: un corpo su un piano inclinato di un angolo α. Scegli gli assi furbi: uno perpendicolare al piano e uno lungo il piano. Scomponi il peso: la parte che preme sul piano va con il coseno di α, quella che tira il corpo giù lungo il piano va con il seno. Poi scrivi la condizione di aderenza e dividi per ciò che compare in entrambi i membri.`,
      dopo: r`La normale vale $Mg\cos\alpha$, l'aderenza richiesta $Mg\sin\alpha$; dividendo, peso e massa spariscono e resta $\tan\alpha \le f_{ad}$. Il corpo resta fermo finché il piano è meno ripido dell'angolo d'aderenza. Lettura col cono: la risultante è verticale e forma con la normale proprio l'angolo α del piano. Controllo: la massa non c'entra, un corpo pesante e uno leggero scivolano alla stessa inclinazione.`,
    },
    'd024.9': {
      tappa: 3,
      prima: r`Se il piano è più ripido dell'angolo d'aderenza il corpo scivola giù. Ora la somma delle forze lungo il piano non è più zero: vale massa per accelerazione. Chiediti che verso ha l'attrito: il corpo va verso il basso, quindi l'attrito punta verso l'alto lungo il piano. E quanto vale? Siamo in strisciamento, quindi $f_{att}$ per la normale, che è ancora $Mg\cos\alpha$.`,
      dopo: r`L'accelerazione vale $g$ per $(f_{att}\cos\alpha - \sin\alpha)$. È negativa, perché l'asse y punta verso l'alto e il corpo accelera verso il basso. Controllo: senza attrito ($f_{att} = 0$) resta $-g\sin\alpha$, la classica discesa libera sul piano; con piano verticale resta $-g$, caduta libera.`,
    },
  },
  racconto: r`All'orale partirei dalla differenza fra aderenza e attrito. In aderenza non c'è moto relativo e la forza tangenziale è una reazione: vale quanto serve all'equilibrio, fino al tetto $f_{ad}F_N$, perché le asperità reggono in proporzione a quanto sono premute. Superato il tetto le asperità cedono, il corpo striscia e la forza diventa $f_{att}F_N$, opposta alla velocità relativa, con $f_{att} < f_{ad}$. Poi farei il disegno: sommando normale e tangenziale la risultante si inclina di α, con $\tan\alpha = F_T/F_N$; al limite α vale $\varphi_{ad} = \arctan f_{ad}$, quindi il corpo è fermo se la risultante sta nel cono d'aderenza. Chiuderei con il piano inclinato: fermo finché $\tan\alpha \le f_{ad}$, indipendentemente dalla massa.`,
};

// ====================================================================== c2-ribaltamento
export const ribaltamento: LezioneArgomento = {
  perche: r`Prova a spingere uno scatolone alto e stretto. Se lo spingi in basso, scivola sul pavimento; se lo spingi in alto, si inclina e cade. Lo stesso succede ai veicoli in curva: una macchina sportiva, bassa e larga, al limite slitta verso l'esterno; un camion alto, invece, può ribaltarsi. Un corpo appoggiato, quindi, può perdere l'equilibrio in due modi diversi. La domanda della lezione è: **quando un corpo si ribalta, invece di slittare, e da quali misure dipende quale dei due succede prima?**`,
  idea: r`Pensa allo scatolone spinto in alto. La spinta e la forza d'attrito sul pavimento sono uguali e opposte, ma non stanno sulla stessa retta: una è in alto, l'altra in basso. Insieme formano una coppia che tende a far ruotare lo scatolone. Per non ruotare, il pavimento sposta il suo appoggio: la normale si sposta verso lo spigolo dalla parte opposta alla spinta, e la pressione si concentra lì.

Ma il pavimento può solo spingere, non tirare. La normale, quindi, può spostarsi solo finché resta dentro la base. Quando arriva sullo spigolo il pavimento ha dato tutto quello che poteva: se spingi ancora un po', lo scatolone ruota attorno allo spigolo e si ribalta.

Nell'auto in curva la storia è identica. La forza centrifuga agisce nel baricentro, in alto, mentre le forze laterali delle ruote agiscono a terra: di nuovo una coppia. Il carico passa dalla ruota interna a quella esterna. Quando la ruota interna non porta più niente, l'auto sta per ribaltarsi. In entrambi i casi confronteremo questa soglia con quella dello slittamento: vince quella che si raggiunge per prima.`,
  richiami: [
    { titolo: 'Momento di una forza e scelta del polo', testo: r`Il momento di una forza rispetto a un punto è la forza per il braccio, cioè la distanza fra il punto e la retta della forza. In equilibrio la somma dei momenti è zero rispetto a qualunque punto: conviene scegliere un punto per cui passano le forze che non conosci, così spariscono dall'equazione.` },
    { titolo: 'Contatto unilaterale', testo: r`Un pavimento può spingere un corpo, ma non può tirarlo verso il basso. Le pressioni di contatto sono quindi solo di compressione, e la loro risultante deve cadere dentro la superficie d'appoggio. Se l'equilibrio richiede una normale fuori dalla base, il corpo non può restare appoggiato: ruota.` },
    { titolo: 'Forza d\'inerzia', testo: r`Un corpo che accelera si può trattare come se fosse in equilibrio aggiungendo una forza fittizia, la forza d'inerzia, uguale a massa per accelerazione e opposta all'accelerazione, applicata nel baricentro. È quello che senti in auto: in curva vieni «spinto» verso l'esterno.` },
    { titolo: 'Accelerazione centripeta', testo: r`Un corpo che percorre una circonferenza di raggio R a velocità costante v non accelera lungo la traiettoria, ma cambia continuamente direzione: ha un'accelerazione verso il centro pari a $v^2/R$. La forza d'inerzia corrispondente, la centrifuga $Mv^2/R$, punta verso l'esterno.` },
  ],
  ipotesiPerche: [
    r`Sono i dati minimi del blocco. Le due lunghezze che contano sono la base s e la quota h della spinta: alla fine il risultato dipenderà proprio dal loro rapporto.`,
    r`La curva a destra fissa quale ruota è esterna (la sinistra). Velocità costante vuol dire che c'è solo l'accelerazione centripeta. Il baricentro a metà carreggiata dà al peso un braccio c/2 rispetto a ogni ruota.`,
    r`Con la forza d'inerzia anche l'auto in curva diventa un problema di equilibrio. La condizione «solo compressione» è proprio quella che definisce il ribaltamento: la normale non può diventare negativa.`,
  ],
  disegnoGuida: r`Fai due disegni affiancati. Nel primo: un rettangolo di base s appoggiato al piano, il baricentro G al centro con il peso Mg, e la spinta F orizzontale in alto, a quota h. Al suolo disegna la tangenziale $F_T$ opposta a F e la normale $F_N$ spostata di b verso lo spigolo lontano da F; per il caso limite mettila proprio sullo spigolo. Nel secondo: l'auto vista da dietro, un rettangolo con due ruote. La curva va a destra, quindi la ruota esterna è a sinistra: chiama A il suo contatto e B quello della ruota interna. Segna G a quota h, il peso verso il basso e la centrifuga $Mv^2/R$ verso l'esterno, cioè a sinistra. Ai contatti disegna le normali verso l'alto e le forze laterali verso l'interno della curva. Quota la carreggiata c. Infine evidenzia A: sarà il polo dei momenti, perché lì passano le forze che non conosciamo.`,
  mappa: [
    'Blocco: equilibrio alla traslazione e alla rotazione, la normale si sposta di b.',
    'Limite: la normale non può uscire dalla base, da qui la forza che ribalta.',
    'Confronto con lo slittamento: succede prima il fenomeno con la soglia più bassa.',
    'Auto in curva: la centrifuga scarica la ruota interna.',
    'Velocità di ribaltamento e confronto con quella di slittamento.',
  ],
  dims: {
    d027: {
      introduzione: r`Vogliamo la forza che ribalta il blocco e capire se arriva prima di quella che lo fa slittare. La strategia: scriviamo l'equilibrio del blocco fermo, prima alla traslazione e poi alla rotazione, per scoprire dove si sposta la normale. Poi imponiamo che non possa uscire dalla base: da qui la forza di ribaltamento. Infine la confrontiamo con la forza di slittamento, che conosciamo già dall'aderenza.`,
      riepilogo: r`L'equilibrio alla traslazione ci ha detto che il pavimento risponde con una tangenziale uguale alla spinta e una normale uguale al peso. L'equilibrio alla rotazione ci ha detto che la normale si sposta verso lo spigolo opposto, tanto più quanto più spingi in alto. Siccome non può uscire dalla base, il ribaltamento comincia quando arriva sullo spigolo. Confrontando con lo slittamento, il blocco si ribalta prima se è alto e stretto rispetto all'aderenza disponibile.`,
    },
    d034: {
      introduzione: r`Ora la stessa idea per un'auto in curva. La strategia è identica a quella del blocco: aggiungiamo la forza centrifuga nel baricentro per poter scrivere un equilibrio, poi scriviamo i momenti rispetto alla ruota esterna e ricaviamo quanto carico resta sulla ruota interna. Il ribaltamento comincia quando quel carico arriva a zero. Infine confrontiamo questa velocità con quella a cui l'auto slitta.`,
      riepilogo: r`Abbiamo trattato l'auto in curva come un corpo in equilibrio sotto peso e centrifuga. I momenti rispetto alla ruota esterna ci hanno dato il carico sulla ruota interna: parte da metà peso e cala con il quadrato della velocità. Quando si annulla l'auto si ribalta, e questo succede a una velocità che cresce con la carreggiata e cala con l'altezza del baricentro. Il confronto con lo slittamento dà la stessa regola del blocco, con la carreggiata al posto della base.`,
    },
  },
  passi: {
    'd027.1': {
      tappa: 0,
      prima: r`Cominciamo dalle forze, come per qualunque corpo fermo. In orizzontale c'è la spinta F e, al suolo, la tangenziale del pavimento; in verticale il peso e la normale. Il blocco non si muove: chiediti quanto devono valere le due forze del pavimento perché la somma in ciascuna direzione sia zero.`,
      dopo: r`La tangenziale è uguale alla spinta e la normale è uguale al peso: è la stessa conclusione della lezione sull'attrito. Fin qui la posizione della normale non conta. Ma le due forze orizzontali stanno a quote diverse, e quindi questo non basta: manca l'equilibrio alla rotazione.`,
    },
    'd027.2': {
      tappa: 0,
      prima: r`Guarda le due forze orizzontali: F in alto, a quota h, e $F_T$ sul pavimento. Sono uguali e opposte ma su rette diverse, distanti h: formano una coppia che fa ruotare il blocco. Chi la bilancia? Il peso passa per il centro della base, quindi non può farlo. Resta la normale: se si sposta di un tratto b, il suo momento può compensare quello della coppia. Scrivi i momenti rispetto al centro della base.`,
      dopo: r`La normale si sposta di $b = Fh/(Mg)$ verso lo spigolo opposto alla spinta. Leggila: spinta più forte o più alta, spostamento maggiore; blocco più pesante, spostamento minore. Fisicamente la pressione sul pavimento non è più uniforme: cresce verso quello spigolo. Controllo: se spingi rasoterra ($h = 0$), $b = 0$ e la normale resta al centro.`,
    },
    'd027.3': {
      tappa: 1,
      prima: r`Fin dove può spostarsi la normale? Ricorda che il pavimento può solo spingere: le pressioni sono tutte di compressione e la loro risultante non può cadere fuori dalla base. La base è larga s ed è centrata sotto G, quindi chiediti qual è lo spostamento massimo dal centro.`,
      dopo: r`Lo spostamento non può superare metà base. Finché $b < s/2$ il blocco è appoggiato con tutta la base, con pressioni più forti da un lato. Quando $b = s/2$ tutta la pressione è concentrata sullo spigolo e il resto della base è scarico: il blocco sta per sollevarsi.`,
    },
    'd027.4': {
      tappa: 1,
      prima: r`Ora mettiamo insieme le due righe precedenti. Nella formula di b, imponi che lo spostamento sia esattamente metà base e ricava la forza. Puoi anche vederlo in un altro modo: al limite la normale passa per lo spigolo, quindi è come scrivere i momenti attorno allo spigolo. Quali forze hanno momento rispetto a quel punto?`,
      dopo: r`La forza che ribalta il blocco è $Mg\,s/(2h)$. Leggila come una gara fra due momenti attorno allo spigolo: la spinta, con braccio h, tende a ribaltare; il peso, con braccio s/2, tende a riportare giù. Controllo: un blocco largo e basso richiede una forza grande; uno stretto e alto si ribalta con poco.`,
    },
    'd027.5': {
      tappa: 2,
      prima: r`Il blocco, però, può anche slittare. Quando? Quando la tangenziale richiesta raggiunge il tetto dell'aderenza. Dal primo passo sappiamo che la tangenziale è uguale a F e la normale è uguale al peso: basta mettere insieme queste informazioni con la legge dell'aderenza.`,
      dopo: r`Il blocco slitta quando la spinta raggiunge $f_{ad}Mg$. Nota che questa soglia non dipende né dalla base né dall'altezza della spinta: dipende solo dal peso e dai materiali. È un'informazione diversa da quella del ribaltamento, che invece dipende dalla geometria.`,
    },
    'd027.6': {
      tappa: 2,
      prima: r`Ora abbiamo due soglie per la stessa forza F, che cresce piano piano. Chiediti: quale si raggiunge per prima? Quella più bassa. Per confrontarle facciamo il loro rapporto: il peso si semplifica e resta un numero che dipende solo dalla forma del blocco e dal coefficiente.`,
      dopo: r`Il blocco si ribalta prima se $s/(2h) < f_{ad}$, cioè se è alto e stretto su un pavimento che fa molta aderenza. Se invece è basso e largo, o il pavimento è scivoloso, slitta prima. Controllo: su ghiaccio ($f_{ad}$ quasi zero) qualunque blocco slitta, come ci aspettiamo.`,
    },
    'd034.1': {
      tappa: 3,
      prima: r`Passiamo all'auto. Per poter scrivere un equilibrio ci serve la forza d'inerzia, e quindi l'accelerazione. L'auto va a velocità costante su una circonferenza: la velocità non cambia in modulo ma cambia in direzione. Che accelerazione rimane, e verso dove punta? E la forza d'inerzia, opposta, dove va applicata?`,
      dopo: r`L'accelerazione è quella centripeta, $v^2/R$, verso il centro della curva; la forza d'inerzia è la centrifuga $Mv^2/R$, applicata in G e diretta verso l'esterno. Da ora l'auto si tratta come un corpo fermo sotto peso, centrifuga e forze delle ruote. Controllo: velocità doppia, centrifuga quattro volte più grande.`,
    },
    'd034.2': {
      tappa: 3,
      prima: r`Ci interessa il carico sulla ruota interna. Scegli il polo in modo che spariscano più incognite possibile: il contatto della ruota esterna, A. Lì passano la normale esterna e la forza laterale esterna; anche la forza laterale interna è a terra, sulla retta per A, e non dà momento. Restano tre forze: la normale interna, la centrifuga e il peso. Individua il braccio di ciascuna.`,
      dopo: r`La normale interna ha braccio c, la centrifuga braccio h, il peso braccio c/2. I primi due momenti hanno lo stesso verso, il peso verso opposto. Fisicamente: la centrifuga tende a far ruotare l'auto attorno alla ruota esterna, sollevando l'interna; il peso la tiene giù. Bello, perché le forze laterali, che non conosciamo, sono sparite.`,
    },
    'd034.3': {
      tappa: 3,
      prima: r`L'equazione dei momenti contiene una sola incognita, la normale interna. Isolala: porta gli altri due termini dall'altra parte e dividi per la carreggiata c. Prima di guardare il risultato, prevedi: a velocità zero quanto dovrebbe valere?`,
      dopo: r`La normale interna parte da metà peso, come prevedevi, e cala con $v^2$. Il termine che si sottrae cresce con h e cala con c e con R: baricentro alto, carreggiata stretta e curva stretta scaricano di più la ruota interna. È esattamente quello che senti in curva.`,
    },
    'd034.4': {
      tappa: 4,
      prima: r`Quando inizia il ribaltamento? Quando la ruota interna non porta più niente: il suolo non può tirarla giù, quindi la sua normale non può diventare negativa. Imponi che la normale interna sia zero e risolvi per la velocità: guarda che fine fa la massa.`,
      dopo: r`La velocità di ribaltamento è $\sqrt{Rcg/(2h)}$. La massa si semplifica: un'auto carica e una vuota si ribaltano alla stessa velocità, se il baricentro resta allo stesso posto. Oltre questa velocità l'auto ruota attorno alla ruota esterna.`,
    },
    'd034.5': {
      tappa: 4,
      prima: r`Fermiamoci a leggere la formula appena trovata. A parità di curva e di gravità, da quali misure dell'auto dipende la velocità di ribaltamento? Guarda sotto la radice: cosa sta al numeratore e cosa al denominatore?`,
      dopo: r`La velocità di ribaltamento cresce con la radice del rapporto fra carreggiata e altezza del baricentro. Le auto da corsa, larghe e bassissime, ce l'hanno altissima; un camion o un furgone carico in alto ce l'hanno bassa. Per questo i veicoli alti hanno limiti di velocità più severi in curva.`,
    },
    'd034.6': {
      tappa: 4,
      prima: r`Anche l'auto, come il blocco, può perdere l'equilibrio in un altro modo: slittando verso l'esterno. La velocità di slittamento è $\sqrt{f_{ad}gR}$, che ricaverai nella lezione sul veicolo. Per sapere cosa succede prima, fai il rapporto dei quadrati delle due velocità e semplifica.`,
      dopo: r`L'auto si ribalta prima se $c/(2h) < f_{ad}$: è la stessa condizione del blocco, con la carreggiata al posto della base. Le auto normali hanno $c/(2h)$ sopra 1 (circa 1,4) e quindi slittano prima di ribaltarsi; un veicolo alto e stretto su un asfalto molto aderente rischia invece il ribaltamento.`,
    },
  },
  racconto: r`All'orale direi subito che un corpo appoggiato perde l'equilibrio in due modi: slitta quando la tangenziale richiesta supera $f_{ad}F_N$, ribalta quando la risultante delle pressioni normali arriva al bordo dell'appoggio, perché il suolo può solo spingere. Per il blocco spinto a quota h la normale si sposta di $b = Fh/(Mg)$; con $b = s/2$ trovo $F_{rib} = Mg\,s/(2h)$ e, confrontando con $f_{ad}Mg$, ribalta prima se $s/(2h) < f_{ad}$. Per l'auto in curva aggiungo la centrifuga in G, scrivo i momenti rispetto alla ruota esterna e ottengo il carico sulla ruota interna; annullandolo trovo $v = \sqrt{Rcg/(2h)}$. Chiudo con il confronto con lo slittamento.`,
};

// ====================================================================== c2-impuntamento
export const impuntamento: LezioneArgomento = {
  perche: r`Ti sarà capitato di aprire un cassetto tirandolo da una maniglia laterale, o tirandolo da un solo lato: invece di scorrere si storce e si blocca, e più tiri più si incastra. Oppure una finestra scorrevole che, spinta da un'estremità, si inceppa. Sembra assurdo: aumentare la forza dovrebbe aiutare, e invece peggiora. La domanda della lezione è: **perché un corsoio tirato fuori asse si blocca nella sua guida, e quanto lontano dall'asse si può tirare prima che nessuna forza riesca più a muoverlo?**`,
  idea: r`Il corsoio non è incastrato perfettamente nella guida: c'è sempre un po' di gioco. Se lo tiri esattamente sull'asse, scorre dritto. Se lo tiri di lato, la tua forza e il carico che porta non stanno sulla stessa retta e formano una coppia: il corsoio ruota leggermente nel gioco, finché tocca le guide in due spigoli opposti, uno in alto e uno in basso.

In quei due punti le guide spingono sul corsoio per impedirgli di ruotare ancora. Queste due spinte devono bilanciare la coppia, e la coppia è tanto più grande quanto più forte tiri. Quindi le normali crescono con la tua forza. Ma dove c'è una normale e c'è strisciamento c'è attrito, proporzionale alla normale: anche l'attrito cresce con la tua forza.

È un circolo vizioso: tiri di più, il corsoio preme di più sulle guide, l'attrito aumenta. Finché l'attrito cresce più lentamente della tua forza, alla fine vinci tu. Ma se il braccio della forza è troppo grande rispetto alla lunghezza del corsoio, l'attrito cresce quanto o più della forza, e non c'è modo di muoverlo: è l'impuntamento.`,
  richiami: [
    { titolo: 'Attrito di strisciamento', testo: r`Quando due superfici strisciano, la forza tangenziale vale $f_{att}$ per la normale ed è diretta in verso opposto alla velocità relativa. Se un corpo sale lungo una guida, l'attrito sul corpo è diretto verso il basso. Più forte è la normale, più grande è l'attrito.` },
    { titolo: 'Momento con le coordinate', testo: r`Se una forza ha componenti $F_x, F_y$ ed è applicata nel punto di coordinate $(x, y)$ rispetto al polo, il suo momento (antiorario positivo) vale $x F_y - y F_x$. Così una forza verticale ha braccio pari alla coordinata x e una orizzontale braccio pari alla coordinata y; il segno esce da solo.` },
    { titolo: 'Coppia di forze', testo: r`Due forze uguali, opposte e su rette parallele distanti d formano una coppia: la loro somma è zero, quindi non spostano il corpo, ma lo fanno ruotare con un momento pari alla forza per d. Il momento di una coppia è lo stesso rispetto a qualunque polo.` },
    { titolo: 'Moto uniforme come equilibrio', testo: r`Un corpo che si muove a velocità costante non accelera, quindi la somma delle forze e dei momenti è zero: si scrivono le stesse equazioni della statica. L'unica differenza è che, essendoci moto, nei contatti vale l'attrito di strisciamento.` },
  ],
  ipotesiPerche: [
    r`Sono gli oggetti del problema. La distanza e della forza dall'asse è il dato chiave: con $e = 0$ non c'è nessuna coppia e nessun impuntamento.`,
    r`Il gioco permette al corsoio di ruotare finché tocca in due spigoli opposti. La distanza verticale h fra i due contatti sarà il braccio della coppia delle normali.`,
    r`Il corsoio sale, quindi gli attriti sono diretti verso il basso e valgono $f_{att}$ per la normale. La velocità costante ci permette di usare le equazioni della statica.`,
  ],
  disegnoGuida: r`Disegna due guide verticali parallele, una a sinistra e una a destra, e fra loro un rettangolo un po' più stretto, ruotato leggermente in senso antiorario: il gioco gli permette di toccare la guida sinistra con lo spigolo in alto (chiamalo A) e la guida destra con lo spigolo in basso (B). Segna il centro O del corsoio e il carico F verso il basso, applicato in O. Poi la forza di comando Q verso l'alto, a distanza e dall'asse, sul lato destro. Ai contatti: in A la guida sinistra spinge verso destra ($F_{N,A}$), in B la guida destra spinge verso sinistra ($F_{N,B}$). Siccome il corsoio sale, gli attriti $F_{T,A}$ e $F_{T,B}$ vanno verso il basso. Infine le quote: h è la distanza verticale fra A e B, a la larghezza del corsoio, e la distanza di Q dall'asse.`,
  mappa: [
    'Scrivo le forze nei due contatti: normali verso l\'interno, attriti verso il basso.',
    'Equilibrio orizzontale e verticale del corsoio.',
    'Equilibrio alla rotazione: le normali crescono con Q.',
    'Metto insieme, ricavo Q e trovo quando diverge.',
  ],
  dims: {
    d026: {
      introduzione: r`Le incognite sono tre: la forza di comando Q e le due normali nei contatti (gli attriti si scrivono subito in funzione delle normali). Ci servono tre equazioni, e il corsoio ce le dà: equilibrio orizzontale, verticale e alla rotazione. La strategia è scriverle una per una, notare una semplificazione nei momenti, e poi sostituire fino ad avere Q in funzione del carico F e della geometria.`,
      riepilogo: r`Abbiamo scritto attriti proporzionali alle normali e diretti verso il basso. L'equilibrio orizzontale ci ha detto che le due normali sono uguali. Quello verticale che Q deve vincere il carico più i due attriti. Quello alla rotazione che la coppia delle normali bilancia il momento di Q: le normali crescono con Q, e con loro gli attriti. Mettendo insieme abbiamo trovato Q, che cresce con e/h e diventa infinita quando $e/h$ arriva a $1/(2f_{att})$: oltre, il corsoio si impunta.`,
    },
  },
  passi: {
    'd026.1': {
      tappa: 0,
      prima: r`Partiamo dai due contatti, perché lì nascono gli attriti. In ciascuno c'è una normale, perpendicolare alla guida, e una forza tangenziale lungo la guida. Il corsoio si sta muovendo verso l'alto: chiediti che tipo di forza tangenziale c'è, quanto vale e in che verso punta.`,
      dopo: r`In entrambi i contatti c'è attrito di strisciamento, pari a $f_{att}$ per la rispettiva normale, diretto verso il basso perché si oppone alla salita. Così le incognite si riducono: conoscendo le normali conosciamo anche gli attriti. Controllo: se il corsoio scendesse, gli attriti punterebbero verso l'alto.`,
    },
    'd026.2': {
      tappa: 1,
      prima: r`Ora l'equilibrio in orizzontale. Guarda il disegno: quali forze hanno componente orizzontale? Il carico, la forza Q e gli attriti sono tutti verticali. Restano solo le due normali, una che spinge verso destra in A e l'altra verso sinistra in B.`,
      dopo: r`Le due normali sono uguali: chiamiamole entrambe $F_N$. Di conseguenza anche i due attriti sono uguali, $f_{att}F_N$ ciascuno. Questa semplificazione sarà decisiva nei momenti. Fisicamente: le due guide stringono il corsoio come una pinza, con la stessa forza da entrambi i lati.`,
    },
    'd026.3': {
      tappa: 1,
      prima: r`Ora l'equilibrio verticale. Verso l'alto c'è solo la forza di comando Q. Verso il basso c'è il carico F e i due attriti. Somma tutto e usa il passo precedente per scrivere gli attriti con la sola normale $F_N$.`,
      dopo: r`La forza di comando deve vincere il carico più due volte l'attrito. Se l'attrito fosse zero basterebbe $Q = F$. Il guaio, che scopriremo tra poco, è che $F_N$ non è fissa: dipende da Q stessa. Per scoprire come, ci serve la terza equazione.`,
    },
    'd026.4': {
      tappa: 2,
      prima: r`Ora l'equilibrio alla rotazione. Scegli come polo il centro O: il carico F passa di lì e sparisce. Per ogni altra forza ti serve il braccio, cioè la coordinata giusta del suo punto di applicazione. A sta in alto a sinistra, a $(-a/2,\ h/2)$; B in basso a destra, a $(a/2,\ -h/2)$; Q sta a distanza e dall'asse. Usa «coordinata per componente» e stai attento ai segni.`,
      dopo: r`Le due normali danno momento orario, ciascuna con braccio $h/2$: insieme tendono a raddrizzare il corsoio. Gli attriti hanno bracci $\pm a/2$, uno a sinistra e uno a destra. Q dà momento antiorario con braccio e: è lei che fa ruotare il corsoio nel gioco. Controllo: se e = 0 il corsoio non ha motivo di ruotare.`,
    },
    'd026.5': {
      tappa: 2,
      prima: r`Guarda i due termini con gli attriti. Dal passo 2 sappiamo che i due attriti sono uguali; i loro bracci sono uguali ma con segni opposti, perché uno è a sinistra del centro e l'altro a destra. Che cosa succede quando li sommi? Poi raccogli le due normali, che sono anch'esse uguali.`,
      dopo: r`I momenti degli attriti si cancellano e la larghezza a sparisce dal problema. Resta una frase semplice: la coppia delle normali, con braccio h, bilancia il momento di Q. Quindi $F_N = Qe/h$: le normali crescono con Q. Questo è il cuore dell'impuntamento: tirare di più vuol dire stringere di più il corsoio.`,
    },
    'd026.6': {
      tappa: 3,
      prima: r`Abbiamo due equazioni in $F_N$ e Q: quella verticale e quella dei momenti. Per eliminare $F_N$ ricavala da una delle due. Prendi quella verticale: isola il termine con l'attrito e dividi per $2f_{att}$.`,
      dopo: r`La normale è la parte di Q che avanza dopo aver vinto il carico, divisa per $2f_{att}$. Controllo di segno: Q deve essere più grande di F, altrimenti la normale verrebbe negativa, il che non ha senso. Ora possiamo sostituire nell'equazione dei momenti.`,
    },
    'd026.7': {
      tappa: 3,
      prima: r`Sostituisci la normale appena trovata nell'equazione dei momenti, quella in cui la coppia delle normali bilancia $Qe$. Ottieni un'equazione con la sola incognita Q. Moltiplica per $2f_{att}$, porta i termini con Q dalla stessa parte, raccogli Q e dividi.`,
      dopo: r`La forza di comando è il carico diviso per $(1 - 2ef_{att}/h)$. Il denominatore è sempre minore di 1, quindi Q è sempre più grande di F: l'eccentricità costa sempre fatica. Controllo: con $e = 0$ il denominatore vale 1 e $Q = F$, come se l'attrito non ci fosse, perché senza coppia le normali sono nulle.`,
    },
    'd026.8': {
      tappa: 3,
      prima: r`Ora leggiamo il denominatore. Al crescere di e, oppure al calare di h, il termine sottratto cresce e il denominatore si avvicina a zero. Chiediti: cosa succede a una frazione quando il denominatore va a zero? E cosa vuol dire, fisicamente, se il denominatore diventa zero o negativo?`,
      dopo: r`Quando $e/h$ si avvicina a $1/(2f_{att})$, Q va all'infinito; oltre, nessuna forza finita muove il corsoio: è l'impuntamento. Per evitarlo bisogna tenere e piccola e h grande, cioè corsoi lunghi e comandati vicino all'asse. È la regola pratica dei cassetti: tirali dal centro, e i cassetti profondi si bloccano meno.`,
    },
  },
  racconto: r`All'orale definirei l'impuntamento come il bloccaggio di un corsoio in una guida quando la forza di comando è eccentrica. Spiegherei il meccanismo: per il gioco, la coppia fra Q e il carico fa ruotare il corsoio, che tocca le guide in due spigoli opposti; le normali devono bilanciare quella coppia e quindi crescono con Q, e con loro crescono gli attriti. Poi scriverei le tre equazioni: normali uguali, $Q = F + 2f_{att}F_N$ e, dai momenti rispetto al centro, $F_N h = Qe$, notando che gli attriti si elidono. Sostituendo arrivo a $Q = F/(1 - 2ef_{att}/h)$, che diverge per $e/h = 1/(2f_{att})$: oltre quel valore il corsoio non si muove più.`,
};

// ====================================================================== c2-perno
export const perno: LezioneArgomento = {
  perche: r`Pensa al cardine di un cancello o al mozzo di una vecchia carriola: un albero che gira dentro un foro. Per farlo girare devi vincere una resistenza, e se il carico è pesante la resistenza aumenta. Questa resistenza viene dall'attrito fra l'albero (il perno) e il foro (la boccola). Ma l'attrito agisce lungo la superficie, in un punto che non conosciamo nemmeno. La domanda della lezione è: **dove si porta il contatto fra perno e boccola quando il perno gira, e quanto vale la coppia che serve per farlo ruotare?**`,
  idea: r`Il perno è un po' più piccolo del foro: c'è gioco, e il contatto avviene in un solo punto. A perno fermo il carico lo spinge sul fondo, e la boccola risponde dritta verso l'alto, passando per il centro: nessuna coppia.

Quando il perno gira, nel punto di contatto striscia sulla boccola e nasce un attrito. Questo attrito spinge il perno di lato, e il perno «si arrampica» sulla parete del foro, come una ruota che prova a salire su una salita. Sale finché la forza totale del contatto, normale più attrito, torna a essere esattamente verticale, uguale e contraria al carico.

Qui c'è il punto chiave. La normale passa sempre per il centro del perno. La risultante del contatto, invece, è inclinata rispetto alla normale dell'angolo di attrito, come nel cono della lezione sull'attrito. Quindi la risultante non passa più per il centro: passa un po' di lato, a una distanza fissa. Il carico per questa distanza è la coppia resistente. Tutte le rette possibili della risultante sono tangenti a un piccolo cerchio attorno al centro: il cerchio d'attrito.`,
  richiami: [
    { titolo: 'Angolo di attrito', testo: r`Quando due superfici strisciano, la tangenziale vale $f_{att}$ per la normale. Sommandole, la risultante del contatto è inclinata rispetto alla normale di un angolo $\varphi_{att}$ con $\tan\varphi_{att} = f_{att}$. Lo hai visto nella lezione sull'attrito: è il cono di attrito, più stretto di quello di aderenza.` },
    { titolo: 'Velocità di un punto che ruota', testo: r`In un corpo che ruota attorno a un centro fisso, ogni punto si muove perpendicolarmente al raggio che lo unisce al centro, con velocità pari a ω per la distanza. In una ruota che gira in senso orario il punto più in alto va verso destra e il punto più in basso va verso sinistra.` },
    { titolo: 'Seno e coseno in un triangolo rettangolo', testo: r`In un triangolo rettangolo con ipotenusa L e un angolo φ, il cateto opposto a φ vale $L\sin\varphi$ e quello adiacente $L\cos\varphi$. Per proiettare una forza su due direzioni perpendicolari si usano proprio seno e coseno dell'angolo che forma con esse.` },
    { titolo: 'Angoli piccoli', testo: r`Per angoli piccoli, misurati in radianti, il seno e la tangente sono quasi uguali all'angolo stesso. Per esempio con $\varphi = 0{,}1$ rad il seno vale 0,0998 e la tangente 0,1003. Quindi se $f_{att}$ è piccolo, $\sin\varphi_{att} \simeq \tan\varphi_{att} = f_{att}$.` },
  ],
  ipotesiPerche: [
    r`Sono gli oggetti del problema. Il gioco è essenziale: senza gioco il perno toccherebbe tutto il foro e il contatto non sarebbe in un punto.`,
    r`Il contatto in un solo punto ci permette di parlare di una normale e di una tangenziale ben definite. Siccome il perno gira, nel punto c'è strisciamento: vale la legge dell'attrito con $f_{att}$.`,
    r`Trascurando le inerzie il perno è in equilibrio: il contatto deve bilanciare esattamente il carico. È questa condizione che decide dove si ferma il punto di contatto.`,
  ],
  disegnoGuida: r`Disegna un cerchio grande (la boccola) e dentro un cerchio un po' più piccolo (il perno), di raggio R e centro O: il gioco deve vedersi. Metti il carico F verticale verso il basso, applicato in O, e il verso di rotazione ω, orario. Ora il contatto: non disegnarlo sul fondo, ma spostato in basso a destra, nel punto P, perché il perno si è arrampicato da quella parte. Unisci O e P: questo raggio è inclinato di $\varphi_{att}$ rispetto alla verticale. In P disegna la normale $R_N$ lungo PO, verso il centro, e la tangenziale $R_T$ perpendicolare. La loro somma $R_P$ deve venire verticale, verso l'alto, uguale e opposta a F. Infine traccia attorno a O un cerchietto tangente alla retta verticale di $R_P$: è il cerchio d'attrito, di raggio $r^* = R\sin\varphi_{att}$.`,
  mappa: [
    'Perno fermo: la reazione passa per il centro.',
    'Perno che gira: nasce l\'attrito e il contatto si sposta.',
    'La risultante è verticale e inclinata di φ_att dalla normale: dove sta P.',
    'Braccio della risultante: cerchio d\'attrito e momento resistente.',
    'Controllo con un altro conto e approssimazione per f piccolo.',
  ],
  dims: {
    d025: {
      introduzione: r`Vogliamo sapere dove si porta il contatto e quanto vale la coppia resistente. La strategia: partiamo dal perno fermo, poi facciamolo girare e guardiamo che cosa aggiunge l'attrito. L'equilibrio ci dirà che la risultante del contatto deve essere verticale; l'attrito ci dirà che è inclinata dell'angolo di attrito rispetto alla normale. Mettendo insieme le due cose troviamo il punto di contatto e il braccio della risultante, cioè la coppia resistente.`,
      riepilogo: r`A perno fermo la reazione passa per il centro e non c'è coppia. Quando il perno gira nasce un attrito che lo fa arrampicare sulla boccola, finché la risultante del contatto torna verticale e uguale al carico. Siccome questa risultante è inclinata dell'angolo di attrito rispetto alla normale, il punto di contatto sale di $\varphi_{att}$ e la retta della risultante passa a distanza $R\sin\varphi_{att}$ dal centro: è tangente al cerchio d'attrito. Il carico per questo braccio è la coppia resistente, che si ritrova anche con un conto diretto.`,
    },
  },
  passi: {
    'd025.1': {
      tappa: 0,
      prima: r`Partiamo dal caso più semplice: il perno non gira. Il carico lo spinge verso il basso e il perno si appoggia sul fondo della boccola. Senza moto non c'è strisciamento, e con il carico verticale non c'è niente che spinga di lato. Chiediti che direzione ha la reazione e dove passa la sua retta.`,
      dopo: r`La reazione è solo normale, uguale e opposta al carico, e passa per il centro O. Due forze uguali e opposte sulla stessa retta: nessuna coppia. Quindi a perno fermo non serve nessuna coppia per tenerlo in equilibrio. Questo è il punto di partenza da confrontare con il caso in rotazione.`,
    },
    'd025.2': {
      tappa: 1,
      prima: r`Ora facciamo girare il perno in senso orario. Il punto del perno che tocca la boccola, in basso, si muove: chiediti verso dove. Poi ricorda che l'attrito si oppone alla velocità relativa. La boccola è ferma, quindi la velocità relativa è proprio quella del punto del perno.`,
      dopo: r`Con rotazione oraria il punto più basso del perno va verso sinistra, quindi l'attrito sul perno è verso destra, e vale $f_{att}$ per la normale. Questa forza spinge il perno di lato: il contatto non può restare sul fondo. Controllo: invertendo il verso di rotazione, l'attrito e lo spostamento cambiano lato.`,
    },
    'd025.3': {
      tappa: 1,
      prima: r`L'attrito spinge il perno verso destra, e il perno sale sulla parete come una ruota su una salita. Dove si ferma? Dove torna l'equilibrio. Il perno è soggetto solo al carico e alla forza del contatto: chiediti come deve essere la somma di normale e tangenziale perché la risultante su tutto il perno sia zero.`,
      dopo: r`La risultante del contatto deve essere uguale e opposta al carico: verticale, verso l'alto, di modulo F. Normale e tangenziale si sono «ruotate» insieme, ma la loro somma è sempre la stessa freccia verticale. Questa è la condizione che fissa dove sta P: lo troviamo nel prossimo passo.`,
    },
    'd025.4': {
      tappa: 2,
      prima: r`In P la normale punta verso il centro, lungo il raggio PO, e la tangenziale è perpendicolare. Siccome c'è strisciamento, il loro rapporto è $f_{att}$: la risultante forma con la normale l'angolo di attrito. Ma la risultante è verticale. Quindi chiediti: che angolo forma il raggio OP con la verticale?`,
      dopo: r`Il raggio OP è inclinato dell'angolo di attrito $\varphi_{att}$ rispetto alla verticale. Il perno, quindi, si arrampica proprio di $\varphi_{att}$ e lì si ferma. È il cono di attrito della prima lezione, «ruotato» finché il suo bordo diventa verticale. Controllo: con attrito nullo l'angolo è zero e il contatto resta sul fondo.`,
    },
    'd025.5': {
      tappa: 2,
      prima: r`Ora che conosciamo l'angolo, possiamo trovare quanto valgono separatamente normale e tangenziale. Pensa alla risultante, di modulo F, come all'ipotenusa di un triangolo rettangolo: la normale è il cateto adiacente all'angolo $\varphi_{att}$, la tangenziale quello opposto.`,
      dopo: r`La normale vale $F\cos\varphi_{att}$ e la tangenziale $F\sin\varphi_{att}$. Controllo: il loro rapporto è la tangente di $\varphi_{att}$, cioè $f_{att}$, come deve essere in strisciamento. E la somma dei quadrati dà $F^2$. Ci serviranno per il controllo finale.`,
    },
    'd025.6': {
      tappa: 3,
      prima: r`La risultante è verticale e passa per P, che non sta sotto il centro ma spostato di lato. Quanto dista la sua retta da O? Guarda il triangolo rettangolo che ha come ipotenusa il raggio OP, lungo R, e come cateto la distanza orizzontale fra O e la verticale per P. Quale cateto è, rispetto all'angolo $\varphi_{att}$?`,
      dopo: r`La distanza è $R\sin\varphi_{att}$: la chiamiamo $r^*$. Il cerchio di centro O e raggio $r^*$ è il cerchio d'attrito, e la retta della risultante gli è tangente. Non dipende dal carico ma solo da R e dal coefficiente: qualunque sia la direzione del carico, la reazione sarà tangente a quel cerchio.`,
    },
    'd025.7': {
      tappa: 3,
      prima: r`Ora che conosciamo il braccio, il momento della reazione rispetto al centro è immediato: modulo per braccio. Ma pensa anche al verso: la risultante sta a destra del centro e punta verso l'alto. Che verso di rotazione produce? E il perno gira in senso orario.`,
      dopo: r`Il momento resistente vale $FR\sin\varphi_{att}$ ed è antiorario, opposto alla rotazione: frena il perno. Per farlo girare a velocità costante il motore deve fornire proprio questa coppia. Controllo: cresce con il carico, con il raggio del perno e con l'attrito, come ti aspetti.`,
    },
    'd025.8': {
      tappa: 4,
      prima: r`Facciamo un controllo con un ragionamento diverso. Invece di usare la risultante, prendi le due componenti separatamente. La normale passa per il centro: che momento dà? La tangenziale è tangente al perno: qual è il suo braccio rispetto a O? Poi sostituisci i valori del passo 5 e ricorda che $f_{att} = \tan\varphi_{att}$.`,
      dopo: r`La normale non dà momento, la tangenziale ha braccio R; sostituendo, $f_{att}F\cos\varphi_{att}R$ diventa $FR\sin\varphi_{att}$, perché tangente per coseno dà seno. Lo stesso risultato: il conto torna. Due strade diverse che arrivano allo stesso punto sono il miglior controllo.`,
    },
    'd025.9': {
      tappa: 4,
      prima: r`Il coefficiente di attrito in un perno lubrificato è piccolo, e allora anche l'angolo di attrito è piccolo. Per angoli piccoli, seno e tangente sono quasi uguali. Usa questa approssimazione per semplificare il raggio del cerchio d'attrito e il momento resistente.`,
      dopo: r`Per $f_{att}$ piccolo il raggio del cerchio d'attrito è circa $f_{att}R$ e il momento circa $f_{att}FR$. È la forma che usano spesso gli esercizi. Ricorda però che è un'approssimazione: la dispensa scrive la forma esatta con il seno. Con $f = 0{,}1$ l'errore è dello 0,5%.`,
    },
  },
  racconto: r`All'orale direi che in una coppia rotoidale con gioco il contatto avviene in un punto. A perno fermo la reazione passa per il centro; quando il perno gira, l'attrito lo fa arrampicare sulla boccola finché la risultante di contatto torna verticale e uguale al carico. Siccome la risultante è inclinata di $\varphi_{att}$ rispetto alla normale, che passa per il centro, il raggio OP è inclinato di $\varphi_{att}$ sulla verticale e la retta della reazione dista $r^* = R\sin\varphi_{att}$ dal centro: è tangente al cerchio d'attrito. Il momento resistente vale $M_r = FR\sin\varphi_{att}$, opposto a ω; lo ritrovo con $R_T R$, e per f piccolo vale circa $f_{att}FR$.`,
};
