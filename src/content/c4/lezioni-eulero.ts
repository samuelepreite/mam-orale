/** Lezione discorsiva c4-eulero (docs/BRIEF_LEZIONI.md): equazione di Eulero, aderenza e scorrimento, coppia massima. */
import type { LezioneArgomento } from '../types';

const L = String.raw;

export const lezioneEulero: LezioneArgomento = {
  perche: L`Una cinghia trasmette coppia solo grazie all'attrito: non ci sono denti, non ci sono incastri. Eppure con una cinghia si muovono compressori, alternatori, macchine utensili. Come fa l'attrito, che di solito immaginiamo come una forza modesta, a trasmettere coppie così grandi? E fino a quanto si può spingere prima che la cinghia slitti e si bruci? La domanda che guida la lezione è: **come cambia la tensione della cinghia lungo l'arco in cui abbraccia la puleggia, e qual è la coppia massima che può trasmettere?**`,
  idea: L`Pensa a una corda avvolta attorno a un palo: tirando un capo con poca forza reggi un carico grande dall'altro. Ogni pezzetto di corda a contatto preme sul palo con una forza proporzionale a quanto è tirato, e quindi genera un attrito proporzionale alla tensione. La tensione cresce allora in proporzione a se stessa: è la definizione di crescita esponenziale, come un capitale con l'interesse composto.

Nella cinghia c'è una complicazione: la cinghia corre, e ogni pezzetto sulla puleggia sente una forza centrifuga che lo stacca un po', togliendo pressione e quindi attrito. Per questo nelle formule compare sempre $T - \rho V^2$: la tensione «utile», al netto della centrifuga.

L'altra idea importante è che la cinghia non striscia su tutto l'arco. Entra sulla puleggia e per un tratto aderisce, con tensione costante; poi, verso l'uscita, striscia e la tensione cambia. Più coppia chiedi, più si allarga la zona che striscia. Quando striscia tutto l'arco, sei al limite: quella è la coppia massima.`,
  richiami: [
    { titolo: 'Attrito: aderenza e strisciamento', testo: L`Fra due superfici premute con forza normale $F_N$ può nascere una forza tangenziale $F_T$. Se le superfici non scivolano (aderenza) $F_T$ è quella che serve per l'equilibrio, ma non può superare $f F_N$. Se scivolano (strisciamento), oppure stanno per scivolare, vale esattamente $F_T = f F_N$, con verso opposto alla velocità relativa.` },
    { titolo: 'Equilibrio proiettato su due direzioni', testo: L`Un corpo in equilibrio ha risultante nulla. Conviene proiettare le forze su due direzioni perpendicolari scelte bene: per un pezzetto di cinghia curvo, la tangente (lungo la cinghia) e la normale (verso il centro della puleggia). Si ottengono due equazioni scalari, una per direzione.` },
    { titolo: 'Angoli piccoli e infinitesimi', testo: L`Per un angolo $x$ molto piccolo, misurato in radianti, $\sin x \simeq x$ e $\cos x \simeq 1$. Quando si scrive l'equilibrio di un pezzetto infinitesimo si tengono solo i termini del primo ordine: un prodotto di due infinitesimi, come $dT\,d\theta$, è trascurabile rispetto a $T\,d\theta$.` },
    { titolo: 'Equazioni a variabili separabili', testo: L`Un'equazione come $dy/dx = k\,y$ si risolve portando tutta la $y$ da una parte e la $x$ dall'altra: $dy/y = k\,dx$. Integrando, $\ln|y| = kx + K$, cioè $y = c\,e^{kx}$. La costante $c$ si trova da una condizione nota, per esempio il valore di $y$ in $x = 0$. La crescita è esponenziale perché la variazione è proporzionale al valore stesso.` },
    { titolo: 'Forza centrifuga (D\'Alembert)', testo: L`Un corpo che percorre una circonferenza di raggio $R$ a velocità $V$ ha un'accelerazione $V^2/R$ verso il centro. Con il principio di D'Alembert si aggiunge una forza fittizia pari a massa per accelerazione, con verso opposto: la forza centrifuga, verso l'esterno. Così il problema dinamico si scrive come un equilibrio.` },
  ],
  ipotesiPerche: [
    L`Isoliamo un pezzetto di cinghia avvolto, tanto piccolo da poterlo considerare un tratto di circonferenza. Misurare l'angolo dalla sezione d'uscita è comodo perché lì conosciamo la tensione: è quella del ramo lasco.`,
    L`A regime la puleggia gira a velocità costante: il pezzetto non accelera lungo la cinghia, e l'unica forza d'inerzia è la centrifuga. Prendere $V$ costante lungo l'arco permette di separare le variabili quando integreremo.`,
    L`Sono i due modi in cui la cinghia può stare sulla puleggia. Dove aderisce non c'è strisciamento, quindi niente attrito «al limite» e tensione costante; dove striscia l'attrito vale esattamente $f$ per la normale, ed è questo che fa crescere la tensione.`,
    L`Se la tensione non superasse la centrifuga, la cinghia non premerebbe più sulla puleggia e si staccherebbe. Per questo la cinghia viene messa in tensione prima di partire.`,
  ],
  disegnoGuida: L`A sinistra disegna la puleggia motrice, con centro O₁, la rotazione ω₁ e la coppia C₁ nello stesso verso. Fai arrivare il ramo teso, T₁, che entra sulla puleggia nel punto P₁, e fai uscire il ramo lasco, T₂, dal punto Q₁. Sull'arco avvolto segna un punto intermedio S₁: da P₁ a S₁ c'è l'arco di aderenza α₁, da S₁ a Q₁ l'arco di scorrimento θ*, verso l'uscita. Metti l'origine dell'angolo θ in Q₁: è da lì che conteremo. A destra, ingrandito, disegna il pezzetto di cinghia di apertura dθ: le due tensioni T(θ) e T(θ+dθ) perpendicolari alle facce, la forza normale dF_N e la centrifuga verso l'esterno, l'attrito dF_T lungo la tangente, opposto al verso in cui la tensione cresce.`,
  mappa: [
    'Guardo un pezzetto di cinghia avvolto e calcolo la sua forza centrifuga.',
    'Scrivo l\'equilibrio del pezzetto lungo la tangente e verso il centro, con l\'attrito al limite.',
    'Integro: la tensione al netto della centrifuga cresce in modo esponenziale.',
    'Disegno la tensione su tutto l\'arco: prima aderenza, poi scorrimento.',
    'Calcolo quanto arco di scorrimento serve per una certa coppia.',
    'Arrivo al limite: coppia massima e puleggia che slitta per prima.',
  ],
  dims: {
    d057: {
      introduzione: L`Prima di scrivere l'equilibrio completo, isoliamo l'effetto nuovo rispetto alla corda sul palo: la forza centrifuga. La strategia è calcolare la massa di un pezzetto avvolto, moltiplicarla per l'accelerazione centripeta e vedere come la centrifuga cambia la forza con cui la cinghia preme sulla puleggia.`,
      riepilogo: L`Un pezzetto di cinghia avvolto per $d\theta$ ha massa $\rho R\,d\theta$ e sente una centrifuga $\rho V^2\,d\theta$, che non dipende dal raggio. Le tensioni spingono il pezzetto verso il centro con $T\,d\theta$, la centrifuga lo tira verso l'esterno: la cinghia preme sulla puleggia solo con la differenza. Se la tensione più bassa, quella del lasco, scende fino a $\rho V^2$, la cinghia smette di premere e non trasmette più nulla: per questo serve la pretensione.`,
    },
    d062: {
      introduzione: L`Ora scriviamo l'equilibrio completo del pezzetto di cinghia, distinguendo i due casi: aderenza e strisciamento. La strategia è proiettare tutte le forze lungo la tangente e verso il centro, semplificare con le approssimazioni per angoli piccoli e poi unire le due equazioni con la legge di Coulomb.`,
      riepilogo: L`Dove la cinghia aderisce la tensione è costante e l'attrito non lavora. Dove striscia, l'equilibrio lungo la tangente dice che la variazione di tensione è uguale all'attrito; quello verso il centro dice che la forza normale per unità d'angolo è $T - \rho V^2$. La legge di Coulomb lega attrito e normale con il fattore $f$. Mettendo tutto insieme: la tensione cresce, per unità d'angolo, di $f$ volte la tensione utile. È l'equazione differenziale di Eulero.`,
    },
    d063: {
      introduzione: L`Abbiamo un'equazione differenziale: dice come cambia la tensione da un punto al vicino. Per avere la tensione vera dobbiamo integrarla. La strategia è quella del richiamo: separare le variabili, integrare, togliere il valore assoluto con un argomento fisico e fissare la costante con la tensione nota all'uscita.`,
      riepilogo: L`Con $V$ costante l'equazione si separa: tensione utile da una parte, angolo dall'altra. Integrando compare un logaritmo, che si inverte in un esponenziale. La costante si fissa all'uscita, dove la tensione è quella del lasco. Il risultato è che la tensione utile cresce come $e^{f\theta}$; all'estremo dell'arco di scorrimento vale quella del teso. Senza centrifuga e con tutto l'arco che striscia, ritrovi la formula del freno a nastro.`,
    },
    d064: {
      introduzione: L`L'equazione di Eulero vale solo dove la cinghia striscia. Qui ricostruiamo la tensione su tutto l'arco avvolto, capiamo perché l'aderenza viene prima e lo scorrimento dopo, e verifichiamo che l'attrito restituisce proprio la coppia trasmessa. La strategia è percorrere l'arco dall'uscita all'indietro.`,
      riepilogo: L`Partendo dall'uscita con la tensione del lasco, la tensione cresce in modo esponenziale lungo l'arco di scorrimento fino a raggiungere quella del teso; da lì all'ingresso resta costante, perché la cinghia aderisce. Sulla condotta succede lo stesso con le parti invertite. Nell'arco di scorrimento la cinghia, meno tesa, è più corta e più lenta della puleggia: l'attrito la spinge in avanti. Integrando il momento dell'attrito si ottiene esattamente la coppia: tutta la coppia passa per l'arco che striscia.`,
    },
    d065: {
      introduzione: L`Ora ci chiediamo quanto deve essere lungo l'arco di scorrimento per trasmettere una certa coppia, e che cosa succede ai due estremi: coppia nulla e coppia massima. La strategia è invertire l'equazione di Eulero ricavando l'angolo, e poi esprimerlo in funzione della coppia.`,
      riepilogo: L`L'arco avvolto si divide in scorrimento e aderenza. Invertendo Eulero, l'arco di scorrimento è un logaritmo del rapporto delle tensioni utili diviso $f$. Con il tenditore che fissa il lasco, più coppia vuol dire più arco di scorrimento e meno aderenza. A coppia nulla non striscia nulla; quando lo scorrimento occupa tutto l'arco siamo alla coppia massima; oltre, non c'è più arco disponibile e la cinghia slitta tutta.`,
    },
    d066: {
      introduzione: L`Arriviamo al limite: la coppia più grande che la cinghia può trasmettere senza slittare. La strategia è mettere nell'equazione di Eulero l'arco di scorrimento più grande possibile, cioè tutto l'arco della puleggia limitante, ricavare la differenza delle tensioni e moltiplicarla per il raggio.`,
      riepilogo: L`Al limite l'arco di scorrimento coincide con l'angolo avvolto più piccolo. Eulero dà la tensione del teso, la differenza col lasco dà la forza trasmessa, il raggio dà la coppia. La coppia massima cresce con la pretensione e in modo esponenziale con $f\beta$, ma cala con la velocità, perché la centrifuga si mangia una parte della tensione del lasco.`,
    },
    d067: {
      introduzione: L`Resta da capire quale puleggia decide il limite. La strategia è notare che tutte le pulegge vedono gli stessi rami, quindi lo stesso rapporto di tensioni: ne segue che hanno lo stesso arco di scorrimento, e il limite lo dà quella con meno arco a disposizione. Poi estendiamo il ragionamento ad attriti diversi e a tre pulegge.`,
      riepilogo: L`Con due pulegge lo stesso salto di tensione richiede lo stesso arco di scorrimento su entrambe: slitta per prima quella con l'angolo avvolto minore, cioè la piccola nella cinghia aperta. Se gli attriti sono diversi conta il prodotto $f\beta$. Con tre pulegge le coppie si ripartiscono e gli archi di scorrimento si sommano, perché i rapporti di Eulero si moltiplicano: la motrice è la più sollecitata. Il metodo pratico è ipotizzare la puleggia limitante e verificare le altre.`,
    },
  },
  passi: {
    'd057.1': {
      tappa: 0,
      prima: L`Isoliamo un pezzetto di cinghia avvolto sulla puleggia, fra l'angolo $\theta$ e l'angolo $\theta + d\theta$. Prima ci servono la sua lunghezza e la sua massa. Un arco di circonferenza è lungo raggio per angolo; e $\rho$ è la massa di un metro di cinghia. Come si scrivono lunghezza e massa del pezzetto?`,
      dopo: L`Il pezzetto è lungo $R\,d\theta$ e pesa $\rho R\,d\theta$. Controllo delle unità: chilogrammi al metro per metri danno chilogrammi. La dispensa usa $\rho$ come massa per unità di lunghezza senza dirlo: attenzione a non confonderla con una densità.`,
    },
    'd057.2': {
      tappa: 0,
      prima: L`Il pezzetto gira con la puleggia, su una circonferenza di raggio $R$ a velocità $V$. Con D'Alembert aggiungiamo la forza d'inerzia: massa per accelerazione centripeta, diretta verso l'esterno. Moltiplica la massa appena trovata per $V^2/R$ e semplifica.`,
      dopo: L`La centrifuga sul pezzetto vale $\rho V^2\,d\theta$: per ogni radiante di arco, $\rho V^2$, indipendente dal raggio. Raddoppiando la velocità diventa quattro volte più grande. La dispensa scrive per errore $V^2/2$ al posto di $V^2/R$: l'accelerazione centripeta è $V^2/R$.`,
    },
    'd057.3': {
      tappa: 0,
      prima: L`Ora le tensioni sulle due facce del pezzetto. Ciascuna è perpendicolare alla sua faccia, quindi è inclinata di $d\theta/2$ rispetto alla tangente nel punto medio. Questa piccola inclinazione dà a ciascuna una componente verso il centro, pari alla tensione per il seno di $d\theta/2$. Somma le due componenti e usa $\sin x \simeq x$.`,
      dopo: L`Le due tensioni insieme spingono il pezzetto verso il centro con $T\,d\theta$. È l'effetto della corda tesa su una superficie curva: la tensione la schiaccia contro il palo. Più è tesa la cinghia, più preme. La dispensa scrive $\theta/2$ invece di $d\theta/2$: l'angolo giusto è quello infinitesimo.`,
    },
    'd057.4': {
      tappa: 0,
      prima: L`Scriviamo l'equilibrio in direzione radiale. Verso il centro ci sono le tensioni, $T\,d\theta$. Verso l'esterno ci sono due forze: la normale con cui la puleggia sostiene la cinghia e la centrifuga. La somma deve essere zero: ricava la forza normale.`,
      dopo: L`La cinghia preme sulla puleggia solo con $T - \rho V^2$ per unità d'angolo. La centrifuga «toglie» tensione utile, perché tende a staccare la cinghia. Siccome l'attrito è proporzionale alla normale, una cinghia veloce aderisce meno. Controllo: da ferma ($V = 0$) ritrovi la corda sul palo.`,
    },
    'd057.5': {
      tappa: 0,
      prima: L`Chiediti quando la cinghia resta attaccata alla puleggia. La forza normale deve essere positiva, e questo deve valere in ogni punto dell'arco, anche dove la tensione è minima, cioè con il ramo lasco. Che condizione ottieni? E a quale velocità la condizione diventa un'uguaglianza?`,
      dopo: L`Serve che anche la tensione del lasco superi $\rho V^2$: per questo la cinghia si pretensiona. A $V = \sqrt{T_2/\rho}$ la normale sul lasco si annulla e la cinghia non trasmette più nulla. Le domande d'esame chiamano $\rho V^2$ «tensione centrifuga» $T_c$: è lo stesso termine.`,
    },
    'd062.1': {
      tappa: 1,
      prima: L`Ora l'equilibrio completo, cominciando dal caso più semplice: l'aderenza. Se il pezzetto ha la stessa tensione sui due lati, non tende ad allungarsi rispetto alla puleggia. C'è allora velocità relativa fra cinghia e puleggia? E se non c'è, che attrito «al limite» serve? Che cosa ne segue per la tensione?`,
      dopo: L`In aderenza non c'è velocità relativa, non c'è attrito che lavori e la tensione resta costante. È il tratto «tranquillo» dell'arco: la cinghia gira solidale con la puleggia come se fosse incollata. Tutto l'interesse è nell'altro tratto.`,
    },
    'd062.2': {
      tappa: 1,
      prima: L`Nel tratto in cui la tensione cambia, il pezzetto si allunga o si accorcia e striscia sulla puleggia. Che forza nasce quando due superfici strisciano? Ricorda il richiamo sull'attrito: quanto vale e con quale verso, rispetto alla velocità relativa?`,
      dopo: L`Nasce l'attrito di Coulomb: modulo $f$ per la normale, verso opposto alla velocità relativa (il rapporto $\underline V^{rel}/|\underline V^{rel}|$ è solo il versore della velocità relativa). È la forza che farà cambiare la tensione da un punto all'altro.`,
    },
    'd062.3': {
      tappa: 1,
      prima: L`Riprendiamo la forza d'inerzia del pezzetto. A regime la puleggia non accelera, quindi il pezzetto non ha accelerazione lungo la tangente: resta solo quella verso il centro. Scrivila con la massa del pezzetto, come nella dimostrazione precedente.`,
      dopo: L`La forza d'inerzia è solo la centrifuga, $\rho V^2\,d\theta$. La applichiamo al centro del pezzetto, come la forza normale: spostarla di poco cambierebbe le equazioni solo di termini di ordine superiore, che trascuriamo.`,
    },
    'd062.4': {
      tappa: 1,
      prima: L`Proiettiamo lungo la tangente. Le due tensioni sono inclinate di $d\theta/2$ sulla tangente, quindi la loro componente tangente è la tensione per $\cos(d\theta/2)$, che è circa uno. Sono opposte: una tira avanti, l'altra indietro. C'è poi l'attrito. Normale e centrifuga sono radiali e non entrano. Che cosa equilibra la differenza di tensione?`,
      dopo: L`La differenza di tensione fra le due facce è equilibrata dall'attrito: la tensione cambia esattamente quanto l'attrito le permette. L'attrito ha verso opposto a quello in cui la tensione cresce. La dispensa scrive $\cos(\theta/2)$ invece di $\cos(d\theta/2)$: è un refuso.`,
    },
    'd062.5': {
      tappa: 1,
      prima: L`Ora la direzione radiale, come nella dimostrazione sulla centrifuga, ma senza ancora porre le tensioni uguali. Verso il centro: le componenti delle due tensioni, ciascuna con $\sin(d\theta/2) \simeq d\theta/2$. Verso l'esterno: normale e centrifuga. Scrivi $T(\theta + d\theta) = T + dT$ e guarda quale prodotto è un infinitesimo di ordine superiore.`,
      dopo: L`Viene $T\,d\theta$, più un termine $dT\,d\theta/2$ che è il prodotto di due infinitesimi e si trascura. Restano tensioni, normale e centrifuga. Controllo: è la stessa equazione radiale di prima, ora ricavata senza scorciatoie.`,
    },
    'd062.6': {
      tappa: 1,
      prima: L`Dall'equilibrio radiale ricava la forza normale e dividi per $d\theta$, così ottieni la normale per unità d'angolo, cioè quanto la cinghia preme su ogni radiante di puleggia.`,
      dopo: L`La pressione della cinghia per unità d'angolo è la tensione meno la centrifuga. È positiva solo se la tensione vince la centrifuga: la condizione di contatto che conosci già. Ora abbiamo due equazioni, una per la tangente e una per la normale.`,
    },
    'd062.7': {
      tappa: 1,
      prima: L`Unisci le due equazioni. Dove la cinghia striscia, l'attrito è esattamente $f$ per la normale. Allora nell'equilibrio tangenziale sostituisci l'attrito con $f\,dF_N$, e la normale con l'espressione appena trovata. Che legge ottieni per la variazione di tensione per unità d'angolo?`,
      dopo: L`È l'equazione differenziale di Eulero: la tensione cresce, per radiante, di $f$ volte la tensione utile. Più la cinghia è tesa, più preme, più attrito c'è e più la tensione cresce. Vale solo dove striscia: dove aderisce l'attrito è minore del limite e la tensione resta costante.`,
    },
    'd063.1': {
      tappa: 2,
      prima: L`Prima di integrare chiediti: che cosa può cambiare lungo l'arco, oltre alla tensione? La velocità della cinghia, perché sai che un tratto più teso corre di più. Se $V$ cambiasse con $T$, l'equazione si complicherebbe. Quanto è grande davvero questa variazione per una cinghia molto rigida?`,
      dopo: L`Con $EA$ molto grande la deformazione è minima e la velocità è praticamente la stessa ovunque: la consideriamo costante. È un'approssimazione: le piccole differenze di velocità contano per il rapporto di trasmissione, ma sono trascurabili nel termine centrifugo.`,
    },
    'd063.2': {
      tappa: 2,
      prima: L`Ora che $\rho V^2$ è una costante, guarda l'equazione: a sinistra la derivata della tensione, a destra $f$ per la tensione utile. Porta tutto ciò che contiene $T$ a sinistra e tutto ciò che contiene $\theta$ a destra, come nel richiamo sulle equazioni separabili.`,
      dopo: L`Le variabili sono separate: a sinistra solo tensione, a destra solo angolo. È la stessa struttura di $dy/y = k\,dx$, con la tensione utile al posto di $y$. Adesso si può integrare membro a membro.`,
    },
    'd063.3': {
      tappa: 2,
      prima: L`Integra i due membri. A destra $f$ è costante, quindi l'integrale è $f\theta$. A sinistra c'è uno diviso una quantità lineare in $T$: quale funzione ha per derivata uno diviso il suo argomento? Non dimenticare la costante d'integrazione.`,
      dopo: L`A sinistra compare il logaritmo della tensione utile, a destra $f\theta$ più una costante $K$. È un problema «di Cauchy» nello spazio: la variabile non è il tempo ma l'angolo, e per fissare $K$ basta una condizione in un punto dell'arco.`,
    },
    'd063.4': {
      tappa: 2,
      prima: L`Per togliere il logaritmo si prende l'esponenziale di entrambi i membri. Rimane però un valore assoluto. Che segno ha la tensione utile? Ricorda la condizione di contatto: la cinghia deve premere sulla puleggia.`,
      dopo: L`Siccome la tensione supera la centrifuga, il valore assoluto si toglie senza cambiare segno, e la tensione utile è una costante positiva per $e^{f\theta}$. La costante $c$ è solo $e^K$ con un nome più comodo.`,
    },
    'd063.5': {
      tappa: 2,
      prima: L`Ci manca la costante $c$. Ci serve un punto dove conosciamo la tensione. L'angolo si misura dall'uscita, dove la cinghia lascia la motrice. Con quale tensione la lascia? Metti $\theta = 0$ nella soluzione e ricorda che $e^0 = 1$.`,
      dopo: L`All'uscita la cinghia ha la tensione del ramo lasco, quindi la costante è la tensione utile del lasco. Controllo: è positiva, come doveva essere per la condizione di contatto.`,
    },
    'd063.6': {
      tappa: 2,
      prima: L`Metti insieme la soluzione e la costante appena trovata. Poi dividi per la tensione utile del lasco, così il risultato diventa un rapporto puro.`,
      dopo: L`È l'equazione di Eulero: la tensione utile cresce esponenzialmente con l'angolo di scorrimento. Con $f = 0{,}3$, mezzo giro ($\theta = \pi$) moltiplica la tensione utile per circa 2,6, un giro intero per circa 6,6. Controllo: con $f = 0$ il rapporto è uno, cioè senza attrito la tensione non cambia.`,
    },
    'd063.7': {
      tappa: 2,
      prima: L`Fin dove vale questa crescita? Solo nell'arco di scorrimento, lungo $\theta^*$. All'estremo di quell'arco la tensione ha raggiunto il valore del ramo teso, e da lì all'ingresso resta costante perché la cinghia aderisce. Scrivi la formula proprio in $\theta = \theta^*$.`,
      dopo: L`Il rapporto fra le tensioni utili dei due rami è $e^{f\theta^*}$. L'esponente contiene l'arco che striscia, non tutto l'arco avvolto: finché la coppia è sotto il massimo, $\theta^*$ è minore dell'angolo avvolto.`,
    },
    'd063.8': {
      tappa: 2,
      prima: L`Proviamo un caso particolare che conosci: il freno a nastro. Il nastro è fermo, quindi non c'è centrifuga; e il tamburo gli striscia sotto lungo tutto l'arco avvolto. Che cosa diventano $\rho V^2$ e $\theta^*$ nella formula?`,
      dopo: L`Con centrifuga nulla e scorrimento su tutto l'arco ritrovi la formula della corda sul palo, il rapporto fra le tensioni uguale a $e^{f\beta}$. È il caso più semplice e quello in cui l'attrito rende al massimo.`,
    },
    'd064.1': {
      tappa: 3,
      prima: L`Ora vogliamo la tensione su tutto l'arco della motrice. Prima fissiamo da dove si conta l'angolo. Dove conosciamo la tensione con certezza? Nei punti dove la cinghia entra ed esce. Conviene partire dall'uscita, perché la soluzione di Eulero è scritta a partire da lì.`,
      dopo: L`L'angolo parte da zero in $Q_1$, il punto d'uscita, dove la tensione è quella del lasco. Contiamo all'indietro, cioè contro il verso del moto della cinghia, verso l'ingresso $P_1$.`,
    },
    'd064.2': {
      tappa: 3,
      prima: L`Nell'arco di scorrimento vale Eulero, che hai in forma di rapporto. Ma per disegnare il grafico conviene avere la tensione da sola. Moltiplica il rapporto per la tensione utile del lasco e porta $\rho V^2$ dall'altra parte.`,
      dopo: L`La tensione è $\rho V^2$ più la tensione utile del lasco che cresce come $e^{f\theta}$. Andando dall'uscita verso l'interno dell'arco la tensione sale esponenzialmente. Controllo: in $\theta = 0$ ritrovi $T_2$.`,
    },
    'd064.3': {
      tappa: 3,
      prima: L`La crescita si ferma quando la tensione arriva al valore del ramo teso, in corrispondenza di $\theta^*$, nel punto $S_1$. E da $S_1$ fino all'ingresso $P_1$? Lì la cinghia aderisce: che cosa fa la tensione in un tratto di aderenza?`,
      dopo: L`Da $S_1$ a $P_1$ la tensione resta uguale a $T_1$: è l'arco di aderenza $\alpha_1$. Il grafico è quindi esponenziale vicino all'uscita e piatto vicino all'ingresso. L'arco avvolto non è tutto in scorrimento.`,
    },
    'd064.4': {
      tappa: 3,
      prima: L`Perché proprio quest'ordine, aderenza all'ingresso e scorrimento all'uscita? Pensa alla cinghia che arriva sulla motrice dal ramo teso: è allungata e corre alla velocità del ramo teso, che è proprio la velocità del bordo. Può quindi agganciarsi senza strisciare. Poi deve perdere tensione per uscire come ramo lasco, e per cambiare tensione deve strisciare.`,
      dopo: L`Nel verso del moto: prima aderenza a tensione costante, poi scorrimento con tensione che cala, fino all'uscita. La dispensa lo conferma per assurdo: se ci fosse prima scorrimento, la cinghia dovrebbe andare più veloce della puleggia e l'attrito risulterebbe concorde alla coppia motrice, cosa impossibile.`,
    },
    'd064.5': {
      tappa: 3,
      prima: L`Ripeti sulla condotta. La cinghia entra dal ramo lasco, con tensione $T_2$, ed esce dal ramo teso. Applica la stessa regola, prima aderenza poi scorrimento verso l'uscita. Questa volta la tensione, nello scorrimento, sale o scende?`,
      dopo: L`Sulla condotta la cinghia aderisce con $T_2$ e poi striscia con tensione crescente fino a $T_1$ all'uscita. È la stessa legge esponenziale, con l'angolo contato dall'inizio dello scorrimento $S_2$. La motrice dà energia alla cinghia, la condotta la riceve.`,
    },
    'd064.6': {
      tappa: 3,
      prima: L`Ora guardiamo le velocità nell'arco di scorrimento della motrice. Lì la tensione cala, quindi la cinghia si accorcia un poco. Ricorda la formula della velocità di un tratto di cinghia. Confrontala con la velocità del bordo, che è quella del ramo teso.`,
      dopo: L`Nello scorrimento la cinghia è più lenta del bordo della puleggia: rispetto alla puleggia scivola all'indietro. L'attrito, opposto alla velocità relativa, sulla cinghia punta in avanti: è la puleggia che la tira. Tutto coerente con la tensione che cala verso l'uscita.`,
    },
    'd064.7': {
      tappa: 3,
      prima: L`Guarda anche la pressione della cinghia sulla puleggia. La normale per unità d'angolo è tensione meno centrifuga. Sostituisci la tensione dell'arco di scorrimento appena trovata.`,
      dopo: L`Anche la pressione cresce esponenzialmente nello scorrimento ed è costante nell'aderenza. La centrifuga la abbassa di una quantità uguale in tutti i punti. Questa pressione ci serve per calcolare l'attrito totale.`,
    },
    'd064.8': {
      tappa: 3,
      prima: L`Verifichiamo il quadro: l'attrito sull'arco deve dare proprio la coppia trasmessa. Nell'arco di scorrimento l'attrito per unità d'angolo è $f$ per la pressione, e ha braccio $R$. Nell'aderenza è nullo. Integra da zero a $\theta^*$, ricordando che $f\,dF_N = dT$.`,
      dopo: L`Il momento totale dell'attrito è $(T_1 - T_2)R$, cioè la coppia motrice. Tutta la coppia passa attraverso l'arco di scorrimento; l'arco di aderenza è una riserva. Controllo: senza attrito l'integrale sarebbe zero, e la cinghia non trasmetterebbe niente.`,
    },
    'd065.1': {
      tappa: 4,
      prima: L`Diamo un nome alle parti dell'arco avvolto: $\theta^*$ è quella che striscia, $\alpha_1$ quella che aderisce, $\beta_1$ è tutto l'arco a contatto. Che relazione c'è fra i tre angoli?`,
      dopo: L`Le due parti, scorrimento e aderenza, insieme fanno tutto l'arco avvolto. Se una cresce, l'altra cala: la coppia «sposta» il confine $S_1$ fra le due zone.`,
    },
    'd065.2': {
      tappa: 4,
      prima: L`Vogliamo l'arco di scorrimento in funzione delle tensioni. Parti dall'equazione di Eulero all'estremo dell'arco: il rapporto delle tensioni utili è $e^{f\theta^*}$. Per liberare l'esponente prendi il logaritmo di entrambi i membri, poi dividi per $f$.`,
      dopo: L`L'arco di scorrimento è il logaritmo del rapporto delle tensioni utili diviso $f$. È l'arco minimo che serve per passare da $T_2$ a $T_1$ sfruttando al massimo l'attrito in ogni punto. Controllo: più attrito, meno arco serve.`,
    },
    'd065.3': {
      tappa: 4,
      prima: L`Ora esprimiamolo con la coppia. Dall'equilibrio della motrice, $T_1$ è $T_2$ più la coppia divisa il raggio. Sostituisci nella formula: al numeratore compare la tensione utile del lasco più $C_1/R_1$. Dividi per la tensione utile del lasco.`,
      dopo: L`Con il lasco fissato dal tenditore, l'arco di scorrimento cresce con la coppia, anche se lentamente, come un logaritmo. La zona di scorrimento si allarga a spese di quella di aderenza: è come lo pneumatico, che con più coppia slitta su una parte più ampia dell'impronta.`,
    },
    'd065.4': {
      tappa: 4,
      prima: L`Primo caso limite: coppia nulla. Che cosa dice l'equilibrio della motrice sulle tensioni? E quanto vale il logaritmo di uno? Deduci quanto arco striscia e quanto aderisce.`,
      dopo: L`Senza coppia le tensioni sono uguali, l'arco di scorrimento è zero e tutto l'arco aderisce. Nessuno strisciamento, nessuna perdita. La dispensa a p. 142 associa $\theta^* = 0$ all'incipiente scorrimento globale: è il contrario, è il caso di aderenza totale.`,
    },
    'd065.5': {
      tappa: 4,
      prima: L`Secondo caso limite: aumenta la coppia finché lo scorrimento occupa tutto l'arco. Quanto vale allora l'aderenza? E in che situazione siamo: la coppia passa ancora, o no?`,
      dopo: L`Quando lo scorrimento occupa tutto l'arco l'aderenza è zero: siamo in incipiente scorrimento globale. La coppia è ancora trasmessa, ed è la massima possibile; basta un piccolo aumento per far slittare tutto. La dispensa qui si confonde: con aderenza nulla la coppia massima è ancora trasmessa.`,
    },
    'd065.6': {
      tappa: 4,
      prima: L`E se chiedessimo una coppia ancora più grande? La formula darebbe un arco di scorrimento più lungo dell'arco a contatto. Può succedere? Che cosa fa allora la cinghia?`,
      dopo: L`Non c'è arco sufficiente: la cinghia slitta su tutta la puleggia, non trasmette la coppia richiesta, si scalda e si consuma. È lo stridio della cinghia dell'auto quando si accende il condizionatore a motore freddo.`,
    },
    'd066.1': {
      tappa: 5,
      prima: L`La coppia è massima quando lo scorrimento occupa tutto l'arco disponibile. Ma le pulegge sono due, con angoli avvolti diversi. Lo stesso arco di scorrimento deve stare dentro entrambe: quale delle due mette il limite?`,
      dopo: L`Il limite lo dà la puleggia con l'angolo avvolto più piccolo: al massimo, l'arco di scorrimento è uguale a quell'angolo. La giustificazione completa è nella dimostrazione sulla puleggia limitante.`,
    },
    'd066.2': {
      tappa: 5,
      prima: L`Scrivi l'equazione di Eulero con l'arco di scorrimento uguale all'angolo minimo. Poi, invece di lasciarla come rapporto, moltiplica per la tensione utile del lasco per avere la tensione utile del teso.`,
      dopo: L`La tensione utile del teso è quella del lasco moltiplicata per $e^{f\beta_{min}}$: il fattore più grande che l'attrito può dare su quella puleggia. Ora ci serve la differenza delle tensioni, che è la forza trasmessa.`,
    },
    'd066.3': {
      tappa: 5,
      prima: L`Vogliamo $T_1 - T_2$. Porta $\rho V^2$ a destra per avere $T_1$ da sola, poi sottrai $T_2$ a entrambi i membri. A destra guarda bene: $\rho V^2 - T_2$ è meno la tensione utile del lasco. Raccoglila.`,
      dopo: L`La forza trasmessa è la tensione utile del lasco per $(e^{f\beta_{min}} - 1)$. Il «meno uno» ricorda che conta la differenza fra i rami. Controllo: con $f = 0$ la differenza è zero, senza attrito non si trasmette niente.`,
    },
    'd066.4': {
      tappa: 5,
      prima: L`Dalla forza alla coppia. L'equilibrio della puleggia dice che la coppia è la differenza delle tensioni per il raggio. Attenzione a quale raggio: quello della puleggia su cui vuoi la coppia, che non è per forza quella limitante.`,
      dopo: L`È la coppia massima: cresce con la pretensione del lasco, cresce esponenzialmente con $f\beta_{min}$ e cala con la centrifuga. Il raggio è quello della puleggia considerata: sulla grande, a parità di tensioni, la coppia è più grande.`,
    },
    'd066.5': {
      tappa: 5,
      prima: L`Guardiamo il caso a bassa velocità. Se la cinghia va piano, la centrifuga è trascurabile rispetto alla tensione. Che cosa diventa la formula se poni $\rho V^2 = 0$?`,
      dopo: L`Senza centrifuga la coppia massima è $T_2(e^{f\beta_{min}} - 1)R$: la forma classica, uguale a quella del freno a nastro. Va bene per cinghie lente; a velocità alte il termine centrifugo non si può trascurare.`,
    },
    'd066.6': {
      tappa: 5,
      prima: L`Quanto pesa la velocità? Tieni fissa la pretensione e chiediti come cambia la coppia massima se cresce il termine centrifugo. Basta derivare la formula rispetto a $\rho V^2$: è lineare, quindi la derivata è il coefficiente che la moltiplica.`,
      dopo: L`La derivata è negativa: più la cinghia corre, meno coppia può trasmettere, a parità di pretensione. La centrifuga solleva la cinghia e le toglie pressione. Questo prepara la velocità ottima: la potenza cresce con la velocità, ma la coppia massima cala.`,
    },
    'd067.1': {
      tappa: 5,
      prima: L`Perché il limite lo dà l'angolo minimo? Le due pulegge sono attraversate dagli stessi rami: hanno le stesse $T_1$ e $T_2$ e la stessa velocità. Scrivi Eulero per ciascuna: che cosa puoi concludere sugli archi di scorrimento, se l'attrito è lo stesso?`,
      dopo: L`Lo stesso rapporto di tensioni, con lo stesso $f$, richiede lo stesso arco di scorrimento su tutte e due le pulegge. La cinghia «striscia per lo stesso angolo» sulla piccola e sulla grande.`,
    },
    'd067.2': {
      tappa: 5,
      prima: L`Ora aumenta la coppia: l'arco di scorrimento, uguale sulle due pulegge, cresce. Deve però stare dentro l'arco avvolto di ciascuna. Quale delle due finisce prima l'arco disponibile?`,
      dopo: L`Il limite è il più piccolo dei due angoli avvolti: quando lo scorrimento lo raggiunge, quella puleggia è in incipiente scorrimento globale e la coppia è la massima. «Si sceglie l'angolo più piccolo».`,
    },
    'd067.3': {
      tappa: 5,
      prima: L`Nella cinghia aperta, quale puleggia ha l'angolo avvolto minore? Ricordati della geometria: la piccola perde arco, la grande ne guadagna.`,
      dopo: L`È la puleggia piccola a slittare per prima, anche se è la grande a ricevere la coppia maggiore. Negli esercizi la prima cosa da fare è confrontare gli angoli avvolti. Per questo si cerca di avere angoli avvolti ampi sulla puleggia piccola, per esempio con un tenditore.`,
    },
    'd067.4': {
      tappa: 5,
      prima: L`E se le due pulegge hanno coefficienti d'attrito diversi, per esempio una gommata e una di acciaio? Riscrivi Eulero per ciascuna con il suo $f$: il logaritmo del rapporto delle tensioni è lo stesso, ma ora è uguale a $f_i\theta_i^*$. Gli archi di scorrimento sono ancora uguali?`,
      dopo: L`Ora sono uguali i prodotti $f\theta^*$, non gli archi. Va per prima in scorrimento globale la puleggia con il prodotto $f\beta$ più piccolo. Il confronto diretto degli angoli vale solo a parità di attrito.`,
    },
    'd067.5': {
      tappa: 5,
      prima: L`Passiamo a tre pulegge di ugual raggio: una motrice e due condotte, con tre rami e tre tensioni, $T'$ la più alta, $T''$ la più bassa, $T'''$ in mezzo. Per ogni puleggia scrivi la coppia come differenza fra le tensioni dei suoi due rami, divisa per il raggio comune.`,
      dopo: L`Ogni puleggia ha la sua differenza di tensione. Sommando quelle delle due condotte la tensione intermedia si cancella e ritrovi quella della motrice: la coppia motrice si ripartisce fra le due condotte.`,
    },
    'd067.6': {
      tappa: 5,
      prima: L`Ora gli archi di scorrimento. Per ogni puleggia, $f\theta^*$ è il logaritmo del rapporto delle tensioni utili dei suoi rami. Il rapporto della motrice si può scrivere come prodotto dei rapporti delle due condotte, moltiplicando e dividendo per la tensione utile intermedia. Il logaritmo di un prodotto è la somma dei logaritmi.`,
      dopo: L`L'arco di scorrimento della motrice è la somma di quelli delle due condotte: vede il salto di tensione più grande, quindi striscia di più. A parità di angoli e di attrito, la motrice va per prima in scorrimento globale, comunque si ripartiscano le coppie.`,
    },
    'd067.7': {
      tappa: 5,
      prima: L`Con angoli diversi non sappiamo a priori chi va per prima. La dispensa propone un metodo per tentativi: ipotizza una puleggia in incipiente scorrimento globale, calcola le tensioni e verifica le altre. Se la motrice è in scorrimento globale, che condizione devono rispettare gli archi delle condotte?`,
      dopo: L`Ciascun arco di scorrimento calcolato deve stare dentro il proprio angolo avvolto. Se la verifica non torna, l'ipotesi era sbagliata: si cambia puleggia e si rifà il conto. È un metodo semplice e sicuro da raccontare all'orale.`,
    },
  },
  racconto: L`All'orale dici subito che l'equazione di Eulero descrive la tensione nell'arco dove la cinghia striscia. Isoli un pezzetto avvolto per $d\theta$ e scrivi due equilibri: lungo la tangente la variazione di tensione è l'attrito; verso il centro la normale è $(T - \rho V^2)\,d\theta$, perché la centrifuga si sottrae. Con Coulomb al limite ottieni $dT/d\theta = f(T - \rho V^2)$; separi, integri e con $T(0) = T_2$ all'uscita trovi che la tensione utile cresce come $e^{f\theta}$. Poi spieghi che l'arco avvolto si divide in aderenza, a tensione costante, e scorrimento verso l'uscita, che si allarga con la coppia. Quando lo scorrimento occupa l'arco minimo hai la coppia massima, $C_{MAX} = (T_2 - \rho V^2)(e^{f\beta_{min}} - 1)R$, e la puleggia piccola è la prima a slittare.`,
};
