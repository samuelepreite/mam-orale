/** Lezioni discorsive C2 (parte B): attrito volvente e cuscinetti volventi. Vedi docs/BRIEF_LEZIONI.md. */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ====================================================================== c2-volvente
export const volvente: LezioneArgomento = {
  perche: r`Lancia una bicicletta in pianura e smetti di pedalare: anche senza vento e senza toccare i freni, prima o poi si ferma. Se le gomme sono sgonfie si ferma ancora prima, e pedalare costa più fatica. Eppure la ruota non striscia sull'asfalto: rotola. Una ruota perfettamente rigida su un suolo perfettamente rigido rotolerebbe per sempre. La domanda della lezione è: **da dove viene la resistenza al rotolamento se non c'è strisciamento, e quanto vale la forza che serve a vincerla?**`,
  idea: r`Una ruota vera non tocca il suolo in un punto: sotto il carico si schiaccia un po' e appoggia su una piccola zona piatta, l'orma. Se la ruota è ferma, l'orma è schiacciata in modo simmetrico: le pressioni davanti e dietro sono uguali e la reazione del suolo passa esattamente sotto il centro.

Quando la ruota rotola, ogni pezzo di gomma entra nell'orma davanti, viene compresso, e poi esce dietro, dove si rilascia. Qui entra l'isteresi: la gomma non restituisce tutta l'energia che ha ricevuto, come una palla di gomma che non rimbalza mai fino all'altezza da cui è caduta. Questo vuol dire che, a parità di schiacciamento, la gomma spinge più forte mentre la si comprime che mentre si rilascia.

Risultato: davanti, nella zona di compressione, le pressioni sono più forti che dietro. La reazione del suolo si sposta un po' in avanti, di un tratto u. Spostata in avanti, non passa più per il centro: ha un momento che frena la rotazione. Per una ruota che nessuno spinge con una coppia, questo momento va bilanciato da una piccola forza al suolo, opposta al moto: è la resistenza al rotolamento.`,
  richiami: [
    { titolo: 'Legge di Hooke', testo: r`Una molla compressa di un tratto $\Delta l$ spinge con una forza $k\,\Delta l$, proporzionale alla compressione. Se immagini la ruota fatta di tante piccole molle radiali, ognuna spinge sul suolo in proporzione a quanto è schiacciata: dove la ruota è schiacciata di più, la pressione è più alta.` },
    { titolo: 'Ciclo di isteresi', testo: r`In un materiale reale la curva forza–deformazione in carico sta sopra quella in scarico: comprimendo spendi più energia di quella che ti viene restituita rilasciando. L'area fra le due curve è energia dissipata in calore. Così, a parità di deformazione, la forza in compressione è maggiore che in rilascio.` },
    { titolo: 'Arcocoseno in un triangolo', testo: r`Se un raggio di lunghezza R forma un angolo θ con la verticale, la sua proiezione verticale vale $R\cos\theta$. Viceversa, se sai che la proiezione vale h, l'angolo è $\theta = \arccos(h/R)$. Più h è vicino a R, più l'angolo è piccolo.` },
    { titolo: 'Equilibrio alla rotazione', testo: r`Un corpo che ruota a velocità costante ha somma dei momenti nulla, come un corpo fermo. Il momento di una forza è forza per braccio; una forza che passa per il polo non ha momento. Una ruota folle è una ruota su cui non agisce nessuna coppia motrice o frenante.` },
  ],
  ipotesiPerche: [
    r`Immaginare la ruota fatta di tanti settori a molla rende visibile la deformazione: ogni molla si schiaccia e spinge in proporzione. Il suolo rigido mette tutta la deformazione sulla ruota.`,
    r`Con un'orma piccola possiamo pensare che le molle si accorcino solo in verticale, il che rende semplice il ragionamento sulle pressioni. Il centro scende un poco, quindi h è appena minore di R.`,
    r`L'isteresi è l'ingrediente che crea la resistenza: senza, le pressioni resterebbero simmetriche anche rotolando. La ruota folle a velocità costante ci permette di scrivere un semplice equilibrio senza coppie motrici.`,
  ],
  disegnoGuida: r`Disegna una ruota di centro O e raggio R, ma con il fondo tagliato da una corda orizzontale: è l'orma, con estremi A davanti e B dietro. Segna il carico N verticale in O. Scegli il verso: rotazione ω antioraria, quindi la ruota avanza verso sinistra; A, a sinistra, è il bordo che entra nell'orma (zona di compressione). Quota l'altezza h del centro rispetto al suolo, appena minore di R. Ora la reazione del suolo: disegna $F_N$ verso l'alto, ma non sotto O: spostala di u verso A, cioè in avanti. Al suolo disegna la forza di aderenza $F_{T,ad}$ orizzontale, opposta all'avanzamento, cioè verso destra. A parte, disegna un piccolo grafico pressione–schiacciamento con due curve: quella di compressione sopra, quella di rilascio sotto, e a pari schiacciamento segna $p_1 > p_2$.`,
  mappa: [
    'Geometria dell\'orma: quanto si schiaccia la ruota.',
    'Ruota ferma: pressioni simmetriche, normale per il centro.',
    'Ruota che rotola: l\'isteresi sposta la normale in avanti di u.',
    'Equilibrio della ruota folle: serve una forza al suolo.',
    'Coefficiente di attrito volvente e confronto con l\'aderenza.',
  ],
  dims: {
    d028: {
      introduzione: r`Vogliamo spiegare la resistenza al rotolamento e misurarla con una forza. La strategia: prima guardiamo la ruota ferma e vediamo che le pressioni sono simmetriche. Poi la facciamo rotolare e usiamo l'isteresi per capire perché le pressioni si sbilanciano in avanti. Infine scriviamo l'equilibrio alla rotazione di una ruota folle: ci dirà quanto vale la forza al suolo che bilancia lo spostamento della normale.`,
      riepilogo: r`Sotto il carico la ruota si schiaccia su un'orma. Da ferma le pressioni sono simmetriche e la normale passa per il centro. Rotolando, per l'isteresi la gomma spinge di più mentre viene compressa che mentre si rilascia: le pressioni sono più forti davanti e la normale si sposta in avanti di u, frenando la rotazione. In una ruota folle questo momento è bilanciato da una forza al suolo pari a $u/R$ volte il carico. Il rapporto $u/R$ è il coefficiente di attrito volvente, molto più piccolo di quello d'aderenza.`,
    },
  },
  passi: {
    'd028.1': {
      tappa: 0,
      prima: r`Cominciamo dalla geometria. Con il carico la ruota si schiaccia: il centro scende e si trova a un'altezza h dal suolo, un po' meno di R. L'orma è la corda in cui la ruota taglia il suolo. Chiediti che angolo forma, visto dal centro, il raggio che arriva all'estremo dell'orma: conosci l'ipotenusa (R) e il cateto verticale (h).`,
      dopo: r`L'angolo massimo è l'arcocoseno di $h/R$: l'orma si vede dal centro sotto l'angolo $2\theta_{max}$. Le molle fuori dall'orma non sono compresse; quelle dentro sì, e di più al centro, dove il suolo «entra» di più nella ruota. Controllo: senza schiacciamento, $h = R$ e l'angolo è zero.`,
    },
    'd028.2': {
      tappa: 1,
      prima: r`Ora guardiamo le pressioni a ruota ferma. Se l'orma è piccola, possiamo pensare che ogni molla si accorci solo in verticale. Gli accorciamenti sono simmetrici rispetto al centro dell'orma. Con la legge di Hooke, chiediti come sono le pressioni e dove passa la loro risultante.`,
      dopo: r`Le pressioni seguono le deformazioni, quindi sono simmetriche: la reazione del suolo passa esattamente sotto il centro. Nessun momento, nessuna resistenza. È il caso statico, ed è il punto di partenza: per avere resistenza ci serve qualcosa che rompa la simmetria.`,
    },
    'd028.3': {
      tappa: 2,
      prima: r`Ora la ruota rotola. Prendi due punti dell'orma simmetrici rispetto al centro: uno davanti, che sta entrando e viene compresso, e uno dietro, che sta uscendo e si rilascia. Hanno lo stesso schiacciamento. Ma ricorda il ciclo di isteresi: a parità di deformazione, la curva di compressione e quella di rilascio danno la stessa forza?`,
      dopo: r`No: a pari schiacciamento, la pressione nel punto che si comprime è maggiore di quella nel punto che si rilascia. È il segno dell'energia dissipata nella gomma. Controllo: un materiale perfettamente elastico, senza isteresi, avrebbe $p_1 = p_2$ e nessuna resistenza al rotolamento.`,
    },
    'd028.4': {
      tappa: 2,
      prima: r`Ripeti il confronto del passo precedente per ogni coppia di punti simmetrici dell'orma: ogni volta il punto davanti spinge più di quello dietro. Chiediti come cambia la posizione della risultante di tutte queste pressioni, e che momento ha rispetto al centro della ruota.`,
      dopo: r`La risultante si sposta in avanti, verso il bordo d'attacco, di un tratto u: il parametro di attrito volvente. Siccome non passa più per il centro, ha un momento $F_N u$ che si oppone alla rotazione. È la «salita» invisibile che la ruota deve continuamente superare.`,
    },
    'd028.5': {
      tappa: 3,
      prima: r`Consideriamo una ruota folle, cioè senza coppia motrice: per esempio la ruota anteriore di una bicicletta. Gira a velocità costante, quindi la somma dei momenti rispetto al centro è zero. La normale spostata ha un momento frenante: chi lo bilancia? Pensa a una forza al suolo, orizzontale, con braccio pari all'altezza del centro.`,
      dopo: r`La riga dice che il momento della normale spostata è bilanciato dal momento della forza di aderenza al suolo, con braccio h. Questa forza è opposta al moto: è la resistenza al rotolamento che il telaio deve vincere spingendo la ruota. Nota che è una forza di aderenza, non di strisciamento.`,
    },
    'd028.6': {
      tappa: 3,
      prima: r`Ricava la forza al suolo dall'equazione dei momenti: dividi per h. Poi usa il fatto che lo schiacciamento è piccolo, quindi il centro è quasi alla quota del raggio. Che cosa puoi scrivere al posto di h?`,
      dopo: r`La forza di aderenza vale $u/h$ volte la normale, e siccome h è quasi uguale a R la dispensa scrive $u/R$. È un'approssimazione da dichiarare all'orale. Controllo: con u = 0 (niente isteresi) la forza è zero; con gomme sgonfie u cresce e la resistenza aumenta.`,
    },
    'd028.7': {
      tappa: 4,
      prima: r`Guarda la forma della formula: una forza tangenziale uguale a un numero per la normale. Ti ricorda qualcosa? È la stessa forma dell'attrito di Coulomb. Diamo un nome al numero $u/R$, che dipende solo dai materiali e dalla geometria della ruota.`,
      dopo: r`Il rapporto $u/R$ è il coefficiente di attrito volvente $f_v$: la resistenza al rotolamento si scrive proprio come un attrito, $f_v$ per la normale. Dipende dall'elasticità dei materiali a contatto. È adimensionale, perché è il rapporto fra due lunghezze.`,
    },
    'd028.8': {
      tappa: 4,
      prima: r`Quanto è grande questa resistenza rispetto all'aderenza? Prendiamo i valori della tabella della dispensa per un caso concreto: pneumatico su asfalto. Confronta l'ordine di grandezza del coefficiente volvente con quello d'aderenza.`,
      dopo: r`Il coefficiente volvente vale circa 0,014, quello d'aderenza circa 1: quasi due ordini di grandezza di differenza. Rotolare costa molto meno che strisciare. È il motivo per cui si usano ruote e cuscinetti volventi, e perché nella dinamica del veicolo in partenza la resistenza al rotolamento si trascura.`,
    },
  },
  racconto: r`All'orale direi che una ruota reale si deforma su un'orma. In statica le pressioni sono simmetriche e la normale passa per il centro. Quando la ruota rotola, ogni settore viene compresso entrando nell'orma e rilasciato uscendone; per l'isteresi, a pari schiacciamento, la pressione in compressione supera quella in rilascio, quindi la normale si sposta in avanti di u e ha un momento $F_N u$ opposto alla rotazione. In una ruota folle lo bilancia una forza di aderenza al suolo, opposta al moto: dall'equilibrio $F_{T,ad} = (u/h)F_N \simeq (u/R)F_N = f_v F_N$. Chiuderei confrontando $f_v \approx 0{,}014$ con $f_{ad} \approx 1$.`,
};

// ====================================================================== c2-cuscinetti
export const cuscinetti: LezioneArgomento = {
  perche: r`Fai girare la ruota di uno skateboard o di una bicicletta sollevata: gira a lungo, quasi senza resistenza. Il merito è dei cuscinetti a sfere: invece di far strisciare l'albero dentro il foro, si mettono in mezzo delle sferette che rotolano. Due domande nascono subito. Come si muovono le sfere e la gabbia che le tiene distanziate, quando gli anelli girano? E quanto carico porta la sfera più caricata, e quanta coppia serve per far girare il tutto? La lezione risponde a entrambe: **cinematica, carichi e attrito di un cuscinetto volvente.**`,
  idea: r`Un cuscinetto ha un anello interno, attaccato all'albero, un anello esterno, attaccato al foro, e in mezzo delle sfere o dei rulli che rotolano su entrambi senza strisciare. Pensa a un mattarello fra due tavole: se tieni ferma quella sotto e muovi quella sopra a una certa velocità, il centro del mattarello avanza a metà di quella velocità. Ogni sfera fa lo stesso fra le due piste: il suo centro va alla media delle loro velocità, e la gabbia, che collega i centri, gira con loro.

Per i carichi: il peso sull'albero spinge in basso l'anello interno, che schiaccia le sfere della metà inferiore contro l'anello esterno. La sfera proprio sotto è la più schiacciata; quelle di lato lo sono meno, sempre di meno man mano che ci si avvicina all'orizzontale. Siccome il carico segue lo schiacciamento, la sfera centrale porta molto di più della media.

Per l'attrito, ogni sfera rotola con un po' di attrito volvente: la forza che riceve è leggermente inclinata e non passa più per il suo centro. È la stessa storia del perno e del suo cerchio d'attrito, ma con il coefficiente volvente, molto più piccolo. Per questo la coppia resistente è piccolissima.`,
  richiami: [
    { titolo: 'Formula delle velocità del corpo rigido', testo: r`Se conosci la velocità di un punto G di un corpo rigido e la sua velocità angolare ω, la velocità di un altro punto E è $V_E = V_G + \omega \wedge (E - G)$: quella di G più il contributo della rotazione attorno a G. Per un disco che ruota attorno a un centro fermo resta solo $\omega \wedge (E - G)$, di modulo ω per la distanza.` },
    { titolo: 'Rotolamento senza strisciamento', testo: r`Se due corpi rotolano uno sull'altro senza strisciare, i due punti a contatto hanno la stessa velocità. È come un ingranaggio senza denti: nessuno scivola sull'altro. È la condizione che lega il moto della sfera a quello delle piste.` },
    { titolo: 'Valor medio di una funzione', testo: r`Il valor medio di una funzione su un intervallo è l'integrale diviso per la lunghezza dell'intervallo. Se hai tanti punti equispaziati, la media dei valori della funzione in quei punti è quasi uguale al valor medio integrale. Per esempio, la media di $\cos^2$ su mezzo giro vale 1/2, quella di $\cos$ vale $2/\pi$.` },
    { titolo: 'Attrito volvente e cerchio d\'attrito', testo: r`Un corpo che rotola su un altro deformandosi riceve una reazione spostata di u rispetto al centro: il rapporto fra u e il raggio è il coefficiente volvente $f_v$. Nel perno abbiamo visto che una reazione inclinata rispetto al raggio ha un braccio rispetto al centro: tutte le rette possibili sono tangenti a un piccolo cerchio.` },
  ],
  ipotesiPerche: [
    r`Sono gli oggetti del problema e i loro nomi. Il raggio della sfera è metà della distanza fra le piste, perché la sfera le tocca entrambe; la gabbia passa per i centri delle sfere.`,
    r`Il rotolamento puro è il vincolo che lega le velocità: i punti a contatto hanno la stessa velocità della pista. Anelli indeformabili vuol dire che lo spostamento dell'anello interno è lo stesso per tutte le sfere.`,
    r`Il carico radiale schiaccia solo le sfere che stanno sotto. Per i rulli lo schiacciamento è proporzionale al carico, e questo rende lineare il legame fra deformazioni e forze.`,
    r`L'attrito volvente inclina leggermente la forza su ciascun elemento. L'angolo è piccolissimo e il suo seno coincide con il coefficiente volvente: da qui il braccio che crea la coppia resistente.`,
  ],
  disegnoGuida: r`Fai due disegni. Nel primo: il centro Ω del cuscinetto, la pista interna di raggio $R_i$ e quella esterna di raggio $R_e$, con le loro velocità angolari $\omega_i$ e $\omega_e$. In alto, fra le due piste, una sfera di centro G e raggio r: segna il contatto E con la pista esterna, sopra, e I con quella interna, sotto. Disegna la sua rotazione propria $\omega_v$ e la circonferenza dei centri, di raggio $R_g$, con la gabbia che ruota a $\omega_g$. Nel secondo: il cuscinetto con il carico Q verso il basso sull'anello interno. Disegna le sfere della metà inferiore con le reazioni radiali $P_i$ verso il centro: la più lunga, $P_0$, proprio in basso, e le altre sempre più corte man mano che ci si avvicina all'orizzontale, dove si annullano. Segna il passo angolare γ fra due sfere vicine e l'angolo iγ della sfera i-esima.`,
  mappa: [
    'Velocità delle piste e rotolamento puro sui due contatti.',
    'Somma e differenza: velocità del centro e rotazione propria.',
    'Gabbia: segue i centri degli elementi.',
    'Carico: schiacciamenti a coseno ed equilibrio dell\'anello interno.',
    'Somme come medie: carico massimo P₀.',
    'Attrito volvente: circonferenza di raggio ρ e momento resistente.',
  ],
  dims: {
    d036: {
      introduzione: r`Vogliamo tre velocità: quella del centro della sfera, la sua rotazione propria e la rotazione della gabbia. La strategia: scriviamo le velocità delle due piste nei punti di contatto. Poi usiamo la formula del corpo rigido sulla sfera per legare quelle velocità al moto della sfera. Otteniamo due equazioni: sommandole sparisce la rotazione, sottraendole sparisce la traslazione. Infine la gabbia segue i centri delle sfere.`,
      riepilogo: r`Le piste hanno velocità $\omega R$ nei punti di contatto, e per il rotolamento puro la sfera ha lì la stessa velocità. Con la formula del corpo rigido abbiamo scritto due equazioni per la sfera. Sommando, il centro va alla media delle velocità delle piste; sottraendo, la rotazione propria è la differenza divisa per il diametro. La gabbia segue i centri, quindi gira con la media pesata delle velocità angolari degli anelli. Con l'anello esterno fermo, la gabbia gira a meno di metà della velocità dell'albero.`,
    },
    d037: {
      introduzione: r`Vogliamo il carico sulla sfera più caricata e la coppia resistente. La strategia per il carico: lo spostamento dell'anello interno schiaccia ogni sfera in proporzione al coseno del suo angolo, e il carico segue lo schiacciamento; l'equilibrio dell'anello dà il carico massimo, dopo aver sostituito una somma con una media. Per la coppia: ogni sfera riceve una forza leggermente inclinata, con un braccio piccolo rispetto al centro; sommiamo i momenti di tutte le sfere.`,
      riepilogo: r`L'anello interno trasla in basso e schiaccia ogni rullo in proporzione al coseno del suo angolo dalla verticale; siccome il carico segue lo schiacciamento, anche i carichi vanno a coseno. L'equilibrio dell'anello, con la somma sostituita da una media, dà $P_0 = 4Q/z$: il rullo centrale porta quattro volte la media. Per l'attrito, ogni forza è inclinata di un angolo con seno $f_v$ e tangente a un piccolo cerchio di raggio $R_g f_v$. Sommando i momenti si trova circa $1{,}6\,QR_gf_v$, molto meno di un cuscinetto radente.`,
    },
  },
  passi: {
    'd036.1': {
      tappa: 0,
      prima: r`Partiamo da ciò che conosciamo: gli anelli, che ruotano attorno al centro fisso Ω. Ci servono le velocità dei punti delle piste che toccano la sfera. Un punto che ruota attorno a un centro fermo ha velocità perpendicolare al raggio, pari a velocità angolare per distanza. Applicalo alla pista esterna e a quella interna.`,
      dopo: r`La pista esterna, nel punto di contatto, va a $\omega_e R_e$; quella interna a $\omega_i R_i$. Sono velocità tangenziali, prese positive in verso antiorario. Controllo: se un anello è fermo, la sua velocità è zero. Ora dobbiamo legare queste velocità al moto della sfera.`,
    },
    'd036.2': {
      tappa: 0,
      prima: r`La sfera rotola sulla pista esterna senza strisciare: il suo punto E ha la stessa velocità della pista. Ma E è anche un punto della sfera, che è un corpo rigido: la sua velocità è quella del centro G più il contributo della rotazione propria attorno a G. Il vettore da G a E è il raggio r della sfera, diretto verso l'esterno.`,
      dopo: r`La velocità della pista esterna è uguale alla velocità del centro più ω_v per r. Leggila: il punto in cima alla sfera va più veloce del centro se la sfera gira in un certo verso, più lento se gira nell'altro. È la prima delle due equazioni che ci servono.`,
    },
    'd036.3': {
      tappa: 0,
      prima: r`Facciamo lo stesso per il contatto con la pista interna. Il punto I della sfera ha la velocità della pista interna. Ma ora il vettore da G a I punta verso il centro del cuscinetto, cioè ha verso opposto a quello di prima. Come cambia il contributo della rotazione?`,
      dopo: r`La velocità della pista interna è uguale alla velocità del centro meno ω_v per r: stesso termine di rotazione, con segno opposto, perché I sta dall'altra parte di G. Ora abbiamo due equazioni con due incognite, la velocità del centro e la rotazione propria.`,
    },
    'd036.4': {
      tappa: 1,
      prima: r`Le due equazioni hanno il termine di rotazione uguale ma con segno opposto. Che operazione fa sparire quel termine e lascia solo la velocità del centro? Prova a sommarle membro a membro.`,
      dopo: r`Sommando, la rotazione sparisce e resta che il centro della sfera va alla media delle velocità delle due piste. È l'effetto del mattarello fra due tavole. Controllo: se le due piste vanno alla stessa velocità, il centro va alla stessa velocità e la sfera non ruota su sé stessa: tutto gira insieme come un blocco.`,
    },
    'd036.5': {
      tappa: 1,
      prima: r`Ora vogliamo la rotazione propria. Questa volta conviene far sparire la velocità del centro: sottrai la seconda equazione dalla prima. Resta la differenza delle velocità delle piste, uguale alla rotazione per una lunghezza: quale? Ricorda che la distanza fra E e I è il diametro della sfera, uguale alla distanza fra le due piste.`,
      dopo: r`La rotazione propria è la differenza delle velocità delle piste divisa per il diametro $R_e - R_i$. Leggila: più le piste vanno a velocità diverse, più la sfera gira su sé stessa. Controllo: con piste alla stessa velocità lineare, la differenza è zero e la sfera non ruota.`,
    },
    'd036.6': {
      tappa: 2,
      prima: r`E la gabbia? Collega i centri di tutte le sfere, quindi il centro G è anche un suo punto. La gabbia ruota attorno a Ω, quindi la velocità di G si scrive anche come velocità angolare della gabbia per la distanza di G da Ω. Mettila insieme alla somma del passo 4 e alle velocità delle piste del passo 1.`,
      dopo: r`La velocità angolare della gabbia è la somma delle velocità lineari delle piste divisa per $2R_g$. Attenzione al fattore 2: viene dalla somma $V_E + V_I = 2V_G$; nel manoscritto in una riga intermedia manca, ma il risultato finale è giusto. Controllo: con anelli fermi, la gabbia è ferma.`,
    },
    'd036.7': {
      tappa: 2,
      prima: r`Possiamo togliere $R_g$ dalla formula. Il centro della sfera sta esattamente a metà fra la pista interna e quella esterna: quanto vale quindi il raggio della circonferenza dei centri, in funzione di $R_i$ e $R_e$? Sostituiscilo.`,
      dopo: r`Il raggio dei centri è la media dei raggi delle piste, e la velocità della gabbia diventa una media delle velocità angolari degli anelli, pesata con i raggi. Controllo: se i due anelli girano insieme alla stessa velocità angolare, la gabbia gira con loro.`,
    },
    'd036.8': {
      tappa: 2,
      prima: r`Nel caso più comune l'anello esterno è fermo, attaccato al telaio, e gira solo quello interno con l'albero. Metti $\omega_e = 0$ nelle formule della gabbia e della rotazione propria e guarda che cosa resta. Chi è il centro di istantanea rotazione della sfera?`,
      dopo: r`La gabbia gira a meno di metà della velocità dell'albero, perché $R_i$ è minore di $R_e + R_i$ diviso due. La sfera ruota su sé stessa in verso opposto all'albero, e il suo punto E, fermo sulla pista ferma, è il centro di istantanea rotazione. Proprio come il mattarello sulla tavola ferma.`,
    },
    'd037.1': {
      tappa: 3,
      prima: r`Passiamo ai carichi. Il carico Q spinge verso il basso l'anello interno, che schiaccia le sfere della metà inferiore contro quello esterno. Gli anelli non si deformano, quindi l'anello interno si sposta in blocco verso il basso. Chiediti: di quanto si schiaccia la sfera che sta proprio sotto, sulla verticale?`,
      dopo: r`Lo spostamento dell'anello interno è esattamente lo schiacciamento della sfera centrale, $\delta_0$, perché quella sfera sta proprio lungo la direzione dello spostamento. È il dato da cui ricavare lo schiacciamento di tutte le altre. Ci interessa solo la deformazione delle sfere, non quella degli anelli.`,
    },
    'd037.2': {
      tappa: 3,
      prima: r`Ora una sfera di lato, a un angolo $i\gamma$ dalla verticale, dove γ è l'angolo fra due sfere vicine. L'anello interno si sposta in verticale di $\delta_0$, ma la sfera si schiaccia solo lungo il suo raggio. Di quanto, allora? Pensa alla componente dello spostamento lungo quella direzione inclinata.`,
      dopo: r`Lo schiacciamento della sfera i-esima è $\delta_0$ per il coseno del suo angolo: massimo in basso, zero all'orizzontale. Controllo: a 90° il coseno è zero e la sfera non è schiacciata, giusto, perché l'anello scorre di fianco a lei senza premerla.`,
    },
    'd037.3': {
      tappa: 3,
      prima: r`Dagli schiacciamenti vogliamo passare ai carichi. Per i rulli si assume che lo schiacciamento sia proporzionale al carico, come una molla: doppio carico, doppio schiacciamento. Allora i carichi seguono gli schiacciamenti: applica questa proporzionalità alla riga di prima.`,
      dopo: r`Il carico sul rullo i-esimo è $P_0$ per il coseno del suo angolo: massimo sul rullo centrale, nullo a 90°. Il carico, quindi, non si distribuisce in parti uguali: è concentrato in basso. Questa è un'ipotesi dei rulli; per le sfere vedremo che la legge è diversa.`,
    },
    'd037.4': {
      tappa: 3,
      prima: r`Ora l'equilibrio dell'anello interno. Verso il basso c'è il carico Q; verso l'alto le reazioni dei rulli caricati, quelli della metà inferiore. Ogni reazione è radiale, inclinata di $i\gamma$: chiediti qual è la sua componente verticale, e somma su tutti i rulli fra $-90°$ e $+90°$.`,
      dopo: r`Il carico Q è la somma delle componenti verticali delle reazioni, e sostituendo $P_i = P_0\cos(i\gamma)$ compare un coseno al quadrato. Gli indici vanno da $-z/4$ a $z/4$ perché un quarto dei rulli copre 90°. Ora resta da calcolare quella somma.`,
    },
    'd037.5': {
      tappa: 4,
      prima: r`Sommare i coseni al quadrato rullo per rullo è scomodo. Ma una somma di tanti termini si può scrivere come numero di termini per la loro media. Quanti sono i rulli caricati? Più o meno metà del totale.`,
      dopo: r`La somma diventa $z/2$ per il valor medio di $\cos^2$. In realtà i rulli caricati sono $z/2 + 1$, ma se z è grande la differenza è trascurabile. Ora ci serve solo la media di $\cos^2$ sui rulli caricati.`,
    },
    'd037.6': {
      tappa: 4,
      prima: r`I rulli sono tanti ed equispaziati fra $-90°$ e $90°$, quindi la media discreta è quasi uguale alla media integrale: integrale diviso per la lunghezza dell'intervallo, che è π. Per integrare $\cos^2$ usa la formula di bisezione, che lo trasforma in $(1 + \cos 2\theta)/2$.`,
      dopo: r`La media vale 1/2: l'integrale di 1 dà π, quello di $\cos 2\theta$ su quell'intervallo dà zero perché è un periodo intero. Controllo intuitivo: $\cos^2$ e $\sin^2$ hanno la stessa media e sommano a 1, quindi ciascuna media vale 1/2.`,
    },
    'd037.7': {
      tappa: 4,
      prima: r`Ora metti insieme i pezzi: Q è $P_0$ per la somma, la somma è $z/2$ per la media, la media è 1/2. Moltiplica e risolvi per il carico massimo $P_0$.`,
      dopo: r`Il rullo più caricato porta $4Q/z$, quattro volte il carico medio $Q/z$. È questo il numero che serve per dimensionare il cuscinetto: se lo calcolassi dividendo il carico in parti uguali sbaglieresti di un fattore quattro, dalla parte del pericolo.`,
    },
    'd037.8': {
      tappa: 4,
      prima: r`Per le sfere il contatto è diverso: una sfera tocca la pista in un punto e si schiaccia in modo non proporzionale al carico. La legge di proporzionalità che abbiamo usato non vale più. La dispensa non rifà il conto, ma dà il risultato: guarda come cambia il coefficiente.`,
      dopo: r`Per le sfere il coefficiente sale a 4,37, e la dispensa arrotonda a 5 per stare dalla parte della sicurezza, usando $5Q/z$ per entrambi i tipi. Ricorda all'orale che questo valore è dato, non ricavato: la relazione carico–schiacciamento hertziana non è lineare.`,
    },
    'd037.9': {
      tappa: 5,
      prima: r`Passiamo all'attrito. Ogni elemento rotola deformandosi, come la ruota della lezione sull'attrito volvente: la forza che riceve non passa più per il suo centro, ma è spostata di u. Se la forza è inclinata di un angolo α rispetto alla direzione radiale, la sua distanza dal centro dell'elemento è il raggio per il seno di α.`,
      dopo: r`Il seno dell'angolo di inclinazione è u diviso il raggio dell'elemento, cioè il coefficiente volvente $f_v$. Attenzione: qui R è il raggio dell'elemento (nella cinematica lo chiamavamo r). L'angolo è piccolissimo, perché $f_v$ vale circa 0,001–0,01.`,
    },
    'd037.10': {
      tappa: 5,
      prima: r`Ora guardiamo la stessa forza dal centro Ω del cuscinetto. La sua retta passa praticamente per il centro dell'elemento, che dista $R_g$ da Ω, ed è inclinata di α rispetto alla direzione radiale. Qual è la distanza della retta da Ω? È lo stesso triangolo del cerchio d'attrito del perno.`,
      dopo: r`La distanza è $R_g\sin\alpha$, cioè $R_g f_v$. Tutte le rette delle forze sugli elementi sono tangenti a una piccola circonferenza di raggio ρ: la circonferenza di attrito volvente. È l'analogo del cerchio d'attrito del perno, con $f_v$ al posto di $f_{att}$ e $R_g$ al posto di R.`,
    },
    'd037.11': {
      tappa: 5,
      prima: r`Il momento resistente totale è la somma dei momenti delle forze su tutti gli elementi, ciascuna per il suo braccio ρ rispetto a Ω. Chiediti quanto vale la forza totale su un elemento, sapendo che la sua componente radiale è $P_i$ e che è inclinata di α.`,
      dopo: r`Ogni elemento trasmette una forza $P_i/\cos\alpha$, con braccio $R_g f_v$; i momenti hanno tutti lo stesso verso, opposto alla rotazione, quindi si sommano. Ora resta da calcolare la somma dei carichi $P_i$ su tutti gli elementi caricati.`,
    },
    'd037.12': {
      tappa: 5,
      prima: r`Ci serve la somma dei $P_i$, cioè $P_0$ per la somma dei coseni. È lo stesso trucco di prima: numero di elementi per la media, e media discreta come media integrale. Attenzione però: ora c'è il coseno, non il coseno al quadrato, perché nel momento entrano i moduli dei carichi, non le loro componenti verticali.`,
      dopo: r`La media del coseno su mezzo giro vale $2/\pi$, quindi la somma dei carichi è $P_0 z/\pi$. Controllo: $2/\pi \approx 0{,}64$ è più grande di 1/2, la media di $\cos^2$, come deve essere perché il coseno, fra 0 e 1, è sempre maggiore o uguale al suo quadrato.`,
    },
    'd037.13': {
      tappa: 5,
      prima: r`Ora assembla il momento: somma dei carichi per $R_g f_v$, diviso per $\cos\alpha$. Siccome α è piccolissimo, il coseno è praticamente 1. Poi sostituisci il carico massimo con la stima conservativa $5Q/z$. Guarda che cosa succede al numero di elementi z.`,
      dopo: r`Il numero di elementi si semplifica e resta circa $(5/\pi)\,QR_gf_v$, cioè circa $1{,}6\,QR_gf_v$. Con il valore dei rulli $4Q/z$ verrebbe $(4/\pi)\,QR_gf_v$. Il momento resistente dipende solo dal carico, dal raggio dei centri e dal coefficiente volvente.`,
    },
    'd037.14': {
      tappa: 5,
      prima: r`Per apprezzare il risultato confrontiamolo con un cuscinetto radente, cioè un perno che striscia nella boccola. Dal cerchio d'attrito sai che il momento è circa carico per raggio per coefficiente di attrito radente. Confronta i due coefficienti.`,
      dopo: r`A parità di carico e dimensioni il rapporto fra i due momenti è circa il rapporto fra $f_v$ e $f_d$, uno o due ordini di grandezza. Ecco perché i cuscinetti volventi fanno girare gli alberi quasi senza resistenza, e la ruota dello skateboard continua a girare a lungo.`,
    },
  },
  racconto: r`All'orale direi che un cuscinetto volvente sostituisce lo strisciamento fra albero e foro con il rotolamento di sfere o rulli fra due anelli, tenuti a passo da una gabbia. Per la cinematica applico la formula del corpo rigido all'elemento nei due contatti: sommando ottengo $V_G = (V_E + V_I)/2$, sottraendo $\omega_v = (\omega_e R_e - \omega_i R_i)/(R_e - R_i)$, e la gabbia gira a $\omega_g = (\omega_e R_e + \omega_i R_i)/(R_e + R_i)$. Per i carichi lo spostamento dell'anello interno schiaccia i rulli a coseno, quindi $P_i = P_0\cos(i\gamma)$; con l'equilibrio e la media di $\cos^2$ trovo $P_0 = 4Q/z$ (circa $5Q/z$ per le sfere). Infine il momento d'attrito è circa $(5/\pi)QR_gf_v$, molto minore di un radente.`,
};
