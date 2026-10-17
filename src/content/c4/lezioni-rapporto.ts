/** Lezione discorsiva c4-rapporto (docs/BRIEF_LEZIONI.md): rapporto ideale ed effettivo, scorrimento elastico, rendimento. */
import type { LezioneArgomento } from '../types';

const L = String.raw;

export const lezioneRapporto: LezioneArgomento = {
  perche: L`Pensa alla lavatrice: il motore elettrico ha una puleggia piccola, il cestello una puleggia grande, e in mezzo c'è una cinghia. Il motore gira velocissimo, il cestello molto più piano ma con più forza. Lo stesso succede sotto il cofano dell'auto, dove una cinghia porta il moto dal motore all'alternatore. Le domande che guidano la lezione sono due: **quanto gira veloce l'albero condotto rispetto a quello motore, e con quale coppia?** E poi: **perché nella realtà la condotta fa un po' meno giri di quanto direbbe il semplice rapporto dei raggi, e quanta potenza si perde per questo?**`,
  idea: L`Comincia dal caso ideale. La cinghia è un nastro unico, che non si allunga e non slitta: allora ogni suo punto va alla stessa velocità, come i vagoni di un treno. Il bordo della puleggia piccola e quello della grande devono quindi correre alla stessa velocità. Ma la piccola, per far correre il suo bordo alla stessa velocità, deve fare più giri: ecco il rapporto dei raggi.

Per trasmettere coppia, però, i due rami non possono essere tirati allo stesso modo: uno è teso, l'altro lasco, e la differenza delle tensioni per il raggio è la coppia. Qui entra la realtà: la cinghia è un po' elastica. Il ramo teso è più allungato, e siccome in ogni sezione deve passare la stessa quantità di cinghia al secondo, il tratto più allungato corre un po' più veloce. La motrice si trova a lavorare con il ramo teso, la condotta con quello lasco: la condotta va un po' più piano del previsto. Quel po' di velocità persa è proprio la potenza persa, cioè il rendimento.`,
  richiami: [
    { titolo: 'Velocità di un punto di una ruota', testo: L`Un corpo che ruota attorno a un asse fisso con velocità angolare $\omega$ porta ogni suo punto su una circonferenza. Un punto a distanza $R$ dall'asse ha velocità di modulo $\omega R$, diretta lungo la tangente alla circonferenza. Per questo il bordo di una ruota grande corre più di quello di una piccola che fa gli stessi giri.` },
    { titolo: 'Equilibrio alla rotazione', testo: L`Se un corpo gira a velocità costante, la somma dei momenti delle forze che agiscono su di lui è nulla. Il momento di una forza rispetto a un punto è la forza per il braccio, cioè la distanza fra il punto e la retta su cui la forza agisce. Una forza tangente a un cerchio ha braccio pari al raggio rispetto al centro.` },
    { titolo: 'Potenza di una coppia e teorema delle forze vive', testo: L`Una coppia $C$ applicata a un albero che gira con velocità angolare $\omega$ fa una potenza $C\omega$: positiva se coppia e rotazione sono concordi (la coppia «spinge»), negativa se sono opposte (la coppia «frena»). Il teorema delle forze vive dice che la somma di tutte le potenze è uguale alla variazione nel tempo dell'energia cinetica. A regime l'energia cinetica non cambia, quindi le potenze si bilanciano.` },
    { titolo: 'Deformazione e legge di Hooke', testo: L`Se un tratto di materiale lungo $dz$ si allunga di $dw$, la sua deformazione è l'allungamento relativo $\varepsilon = dw/dz$, un numero puro. Per un materiale elastico la forza di trazione è proporzionale alla deformazione: $T = EA\,\varepsilon$, dove $E$ è il modulo elastico e $A$ l'area della sezione. Più $EA$ è grande, meno il materiale si allunga a parità di forza.` },
    { titolo: 'Accelerazione centripeta', testo: L`Un punto che percorre una circonferenza di raggio $R$ a velocità costante $V$ non ha accelerazione lungo la traiettoria, ma ne ha una diretta verso il centro, di modulo $V^2/R$: serve per curvare la traiettoria. Visto da chi si muove con il punto, compare una forza apparente verso l'esterno, la forza centrifuga, pari alla massa per $V^2/R$.` },
  ],
  ipotesiPerche: [
    L`Diamo un nome a ogni oggetto e fissiamo i versi: la motrice riceve una coppia concorde alla rotazione (fornisce potenza), la condotta una coppia opposta (assorbe potenza). La relazione fra gli angoli avvolti vale per la cinghia aperta, quella del disegno.`,
    L`Rigidezza flessionale nulla vuol dire che piegare la cinghia attorno alla puleggia non costa lavoro. La rigidezza assiale invece non è nulla, perché l'allungamento sarà la chiave del caso reale. Come una corda, la cinghia sa solo tirare: se la spingi si affloscia.`,
    L`A regime le velocità sono costanti, l'energia cinetica non cambia e le potenze si bilanciano. La convenzione dei segni va dichiarata perché nel bilancio di potenza un segno sbagliato rovina tutto.`,
    L`Sono due modelli diversi. Quello ideale dà il rapporto dei raggi; quello reale, con l'allungamento elastico e la conservazione della massa, spiega perché la condotta perde qualche giro e dove va a finire la potenza persa.`,
  ],
  disegnoGuida: L`Disegna due cerchi affiancati: a sinistra la puleggia piccola, motrice, con centro O₁ e raggio R₁; a destra quella grande, condotta, con centro O₂ e raggio R₂. Traccia i due rami della cinghia tangenti a entrambe, sopra e sotto: è la cinghia aperta. Segna i punti di tangenza P₁, Q₁ sulla motrice e P₂, Q₂ sulla condotta. Poi le rotazioni: ω₁ e ω₂ nello stesso verso, per esempio antiorario, perché la cinghia aperta non inverte il moto. Aggiungi le coppie: C₁ concorde a ω₁, C₂ opposta a ω₂. Scrivi T₁ sul ramo che entra nella motrice: è quello che la motrice «tira a sé», quindi il teso. Sull'altro ramo T₂, il lasco. Infine, se hai tempo, gli angoli avvolti β₁ (minore) e β₂.`,
  mappa: [
    'Cinghia ideale: una sola velocità per tutta la cinghia, quindi il rapporto dei raggi.',
    'Equilibrio delle pulegge: la coppia nasce dalla differenza delle tensioni dei rami.',
    'Curvatura e forza centrifuga di un pezzetto di cinghia avvolto.',
    'Bilancio di potenza: caso ideale e caso con perdite.',
    'Cinghia elastica: il ramo teso è più lungo e corre più del lasco.',
    'Rapporto effettivo e rendimento: la condotta va con il lasco.',
    'Geometria degli angoli avvolti, da raggi e interasse.',
  ],
  dims: {
    d055: {
      introduzione: L`Vogliamo due cose: quanto gira la condotta rispetto alla motrice e quanto vale la sua coppia. La strategia è guardare prima le velocità, sfruttando il fatto che la cinghia ideale ha una sola velocità, e poi le forze, scrivendo l'equilibrio alla rotazione di ciascuna puleggia. Alla fine confrontiamo i due risultati.`,
      riepilogo: L`Siamo partiti dalle velocità dei bordi delle pulegge e, siccome la cinghia ideale non si allunga e non slitta, le abbiamo eguagliate: da qui il rapporto di trasmissione, uguale al rapporto inverso dei raggi. Poi l'equilibrio di ogni puleggia ci ha detto che la coppia è la differenza delle tensioni per il raggio. Facendo il rapporto delle coppie la differenza di tensione si semplifica e ritroviamo lo stesso rapporto: chi guadagna giri perde coppia, nella stessa misura.`,
    },
    d056: {
      introduzione: L`Qui seguiamo un pezzetto di cinghia nel suo giro: dritto nel ramo, curvo sulla puleggia. Ci chiediamo come cambia la curvatura e quale forza sente il pezzetto quando comincia a girare. La strategia è usare l'accelerazione centripeta di un moto circolare uniforme e poi scriverla per un pezzetto di massa infinitesima.`,
      riepilogo: L`Nel ramo la cinghia è dritta, sulla puleggia ha la curvatura della puleggia: nel modello ideale passa dall'una all'altra di colpo. Un pezzetto che entra sulla puleggia acquista all'improvviso un'accelerazione verso il centro, cioè sente di colpo una forza centrifuga. Nella realtà un salto così non si può fare, e si usano raccordi. Per un pezzetto di apertura $d\theta$ la centrifuga vale $\rho V^2\,d\theta$: è il termine che ritroverai nell'equazione di Eulero.`,
    },
    d058: {
      introduzione: L`Ora guardiamo la trasmissione dal punto di vista dell'energia: la potenza entra dalla motrice, esce dalla condotta e, nella realtà, una parte si perde. La strategia è applicare il teorema delle forze vive a regime, prima senza perdite e poi con una potenza dissipata scritta tramite il rendimento.`,
      riepilogo: L`A regime le potenze si bilanciano. Senza perdite la potenza che entra è uguale a quella che esce, e il rapporto delle coppie è il rapporto di trasmissione: chi riduce i giri moltiplica la coppia. Con le perdite abbiamo scritto la potenza dissipata come la quota $(1-\eta)$ della potenza motrice e ne è uscito che il rapporto di trasmissione dipende anche dal rendimento.`,
    },
    d059: {
      introduzione: L`Questa dimostrazione spiega il fenomeno chiave del caso reale: un tratto di cinghia più tirato si muove più veloce. La strategia ha tre ingredienti: la geometria dell'allungamento di un pezzetto, la legge di Hooke e la conservazione della massa, cioè il fatto che in ogni sezione passa la stessa quantità di cinghia al secondo.`,
      riepilogo: L`Un pezzetto di cinghia tirato con tensione $T$ si allunga di un fattore $(1+T/EA)$. In ogni sezione passa sempre la stessa quantità di materiale nello stesso tempo; se quel materiale è più allungato occupa più spazio, quindi deve correre di più. Ecco perché il ramo teso è più veloce del lasco. La velocità di riferimento $V_0$ è quella che avrebbe la cinghia scarica, ed è la stessa per tutti i tratti.`,
    },
    d060: {
      introduzione: L`Adesso usiamo il risultato precedente per trovare il rapporto di trasmissione vero. La strategia è chiedersi, per ciascuna puleggia, con quale ramo la cinghia ha la stessa velocità del bordo: lì possiamo eguagliare la velocità periferica a quella della cinghia. Poi facciamo il rapporto e lo confrontiamo con quello ideale.`,
      riepilogo: L`La motrice va alla velocità del ramo teso, la condotta a quella del ramo lasco. Dividendo, la velocità di riferimento si semplifica e il rapporto effettivo è quello ideale moltiplicato per un fattore minore di uno. Il fattore dipende dalla coppia: più coppia, più differenza fra i rami, meno giri alla condotta. Senza coppia o con una cinghia rigidissima si torna al caso ideale. Il rapporto non è costante, e per questo dove serve sincronismo si usano catene o ingranaggi.`,
    },
    d061: {
      introduzione: L`Vogliamo sapere quanta potenza si perde per lo scorrimento elastico. La strategia è partire dalla definizione di rendimento, usare il rapporto delle coppie che viene dall'equilibrio delle pulegge (che vale anche nel caso reale) e poi le velocità del modello elastico trovate prima.`,
      riepilogo: L`Il rendimento è la potenza in uscita sulla potenza in entrata. Siccome le coppie stanno come i raggi, il rendimento si riduce al rapporto fra la velocità del bordo della condotta e quella della motrice. Con il modello elastico è lo stesso fattore che abbassa il rapporto di trasmissione. La potenza persa è la forza trasmessa per la differenza di velocità fra i rami: è il lavoro dell'attrito negli archi dove la cinghia striscia.`,
    },
    d137: {
      introduzione: L`La dispensa dice solo che gli angoli avvolti si completano a un giro e che la puleggia piccola ha l'arco minore. Qui li calcoliamo davvero, da raggi e interasse. La strategia è puramente geometrica: un triangolo rettangolo nascosto fra i due centri e il ramo della cinghia.`,
      riepilogo: L`I raggi ai punti di tangenza sono perpendicolari al ramo, quindi paralleli fra loro. Spostando il ramo parallelamente fino al centro della piccola si forma un triangolo rettangolo con ipotenusa l'interasse e cateto la differenza dei raggi: da lì l'angolo $\gamma$. La puleggia piccola perde $2\gamma$ rispetto a mezzo giro, la grande li guadagna. Con la cinghia incrociata il cateto diventa la somma dei raggi ed entrambe guadagnano.`,
    },
  },
  passi: {
    'd055.1': {
      tappa: 0,
      prima: L`Partiamo dalla motrice, che gira con velocità angolare $\omega_1$. Chiediti: che velocità ha un punto del suo bordo, quanto vale e in che direzione punta? Poi guarda la cinghia nei punti in cui arriva e lascia la puleggia: se non slitta, si muove insieme al bordo. Basta quindi scrivere la velocità del bordo nei punti $P_1$ e $Q_1$.`,
      dopo: L`La riga dice che in $P_1$ e $Q_1$ la velocità vale $\omega_1 R_1$ ed è diretta lungo la tangente $\underline t_1$, cioè proprio lungo il ramo della cinghia. La chiamiamo $V_1$ per comodità. Controllo delle unità: radianti al secondo per metri danno metri al secondo, una velocità.`,
    },
    'd055.2': {
      tappa: 0,
      prima: L`Ripeti lo stesso ragionamento sulla condotta. È una ruota di raggio $R_2$ che gira con velocità angolare $\omega_2$; nei punti $P_2$ e $Q_2$ la cinghia la tocca senza slittare. Che velocità ha il suo bordo? Non c'è niente di nuovo: è la stessa riga di prima con l'indice 2.`,
      dopo: L`Anche la condotta ha una velocità periferica, $\omega_2 R_2$, diretta lungo il ramo. Adesso hai due velocità periferiche, una per puleggia. La domanda naturale è: che legame c'è fra le due? La risposta viene dalla cinghia, che le collega.`,
    },
    'd055.3': {
      tappa: 0,
      prima: L`Qui sta tutto il caso ideale. La cinghia è un pezzo unico e continuo, non si allunga e non slitta. Pensa ai vagoni di un treno agganciati: se uno va a una certa velocità, ci vanno tutti. Allora che cosa devono fare le due velocità periferiche, visto che entrambe sono uguali alla velocità della stessa cinghia?`,
      dopo: L`Le due velocità periferiche coincidono con l'unica velocità $V$ della cinghia. La riga si legge così: la piccola, avendo raggio minore, deve girare più in fretta per far correre il suo bordo come quello della grande. Controllo: se i raggi fossero uguali, le due pulegge girerebbero alla stessa velocità angolare, come ci si aspetta.`,
    },
    'd055.4': {
      tappa: 0,
      prima: L`Ora definiamo il rapporto di trasmissione. Nella dispensa è «uscita su entrata»: velocità angolare della condotta divisa per quella della motrice. Prendi l'uguaglianza appena scritta, $\omega_1 R_1 = \omega_2 R_2$, e dividi i due membri per $\omega_1 R_2$: a sinistra resta un rapporto di raggi, a destra un rapporto di velocità angolari.`,
      dopo: L`Il rapporto di trasmissione ideale è il rapporto inverso dei raggi: la condotta gira tante volte più piano quante volte è più grande. Attenzione al verso della frazione: è $\omega_2/\omega_1$, non il contrario. Con una motrice di raggio 5 cm e una condotta di 20 cm il rapporto vale 1/4: la condotta fa un giro ogni quattro della motrice.`,
    },
    'd055.5': {
      tappa: 0,
      prima: L`Leggiamo il risultato. Il rapporto è il raggio della motrice diviso quello della condotta. Chiediti: che cosa succede se la motrice è la puleggia più grande? E se è la più piccola? Basta confrontare numeratore e denominatore della frazione dei raggi.`,
      dopo: L`Se la motrice è più grande il rapporto supera uno e la condotta gira più veloce: è un moltiplicatore di giri. Se è più piccola, come nella lavatrice, il rapporto è minore di uno e la condotta gira più piano: è un riduttore. Qui $R_M$ e $R_C$ sono solo altri nomi per i raggi di motrice e condotta.`,
    },
    'd055.6': {
      tappa: 1,
      prima: L`Passiamo alle forze. Taglia idealmente i due rami vicino alla motrice e guarda la puleggia da sola: su di lei agiscono la coppia motrice $C_1$ e le due tensioni dei rami. Scrivi l'equilibrio alla rotazione rispetto al centro $O_1$. Che braccio hanno le tensioni? Sono tangenti alla puleggia, quindi il braccio è il raggio $R_1$ per entrambe. I due rami tirano in versi opposti rispetto a $O_1$.`,
      dopo: L`La coppia motrice è la differenza fra le tensioni dei rami, moltiplicata per il raggio. Conseguenza importante: se si vuole trasmettere coppia, le tensioni non possono essere uguali. Controllo: con $T_1 = T_2$ la coppia è nulla. La dispensa qui scrive per errore $R_2$ come braccio di $T_2$: sulla motrice entrambe le tensioni hanno braccio $R_1$.`,
    },
    'd055.7': {
      tappa: 1,
      prima: L`Fai lo stesso con la condotta, tagliando i rami vicino a lei. Le tensioni sono le stesse $T_1$ e $T_2$, perché la cinghia è una sola e i rami sono gli stessi; cambiano il braccio, che ora è $R_2$, e il verso della coppia, che sulla condotta è resistente, cioè opposta alla rotazione.`,
      dopo: L`Anche la coppia della condotta è la differenza delle tensioni per il raggio, ma con il raggio $R_2$. È la stessa differenza di tensione di prima: la cinghia «porta» da una puleggia all'altra sempre la stessa forza netta $T_1 - T_2$, e ogni puleggia la trasforma in coppia con il proprio braccio.`,
    },
    'd055.8': {
      tappa: 1,
      prima: L`Abbiamo la coppia su ciascuna puleggia, tutte e due con lo stesso fattore $T_1 - T_2$. Che cosa succede se le dividi membro a membro? Il fattore comune si semplifica e resta un rapporto di raggi, che hai già incontrato poco fa nel rapporto di trasmissione.`,
      dopo: L`Il rapporto delle coppie è uguale al rapporto dei raggi e quindi al rapporto di trasmissione. Detto a parole: se la condotta gira quattro volte più piano, riceve una coppia quattro volte più grande. È la stessa idea della marcia bassa della bicicletta: meno velocità, più forza. Nel caso ideale niente si perde.`,
    },
    'd056.1': {
      tappa: 2,
      prima: L`Segui un pezzetto di cinghia lungo il giro. Nel ramo libero la cinghia è tesa e dritta; sulla puleggia la abbraccia. La curvatura misura quanto una linea si piega: zero per una retta, uno diviso il raggio per una circonferenza. Quanto vale nei due tratti?`,
      dopo: L`Nel ramo la curvatura è nulla, sull'arco avvolto è $1/R_1$, la stessa della puleggia. Controllo di buon senso: una puleggia più piccola piega di più la cinghia, e infatti $1/R_1$ cresce se $R_1$ diminuisce. Per questo le pulegge troppo piccole affaticano le cinghie vere.`,
    },
    'd056.2': {
      tappa: 2,
      prima: L`Ora chiediti come avviene il passaggio da un valore all'altro. Nel modello ideale la cinghia non ha rigidezza flessionale e segue esattamente la geometria: dritta fino al punto di tangenza, poi subito curva come la puleggia. Che forma ha quindi il grafico della curvatura in funzione della posizione lungo la cinghia?`,
      dopo: L`La curvatura salta di colpo, «a gradino», nei quattro punti di tangenza: da zero a $1/R_1$ in $P_1$, di nuovo a zero in $Q_1$, e così via sulla condotta. È un modello comodo, ma un salto istantaneo nella realtà è sospetto: tra poco vediamo perché.`,
    },
    'd056.3': {
      tappa: 2,
      prima: L`Sull'arco avvolto il pezzetto di cinghia si muove con la puleggia: percorre una circonferenza di raggio $R_1$ a velocità costante $V$. Ricorda il richiamo sul moto circolare uniforme: non c'è accelerazione lungo la traiettoria, ma c'è quella verso il centro. Scrivila prima con $\omega_1$ e poi sostituisci $\omega_1 = V/R_1$.`,
      dopo: L`L'accelerazione è diretta verso il centro $O_1$ e vale $V^2/R_1$. Nel ramo dritto invece è zero. Quindi anche l'accelerazione, come la curvatura, salta di colpo all'ingresso sulla puleggia. Controllo delle unità: metri quadri al secondo quadro diviso metri danno metri al secondo quadro.`,
    },
    'd056.4': {
      tappa: 2,
      prima: L`Mettiti nei panni del pezzetto di cinghia, come se ci fossi seduto sopra. In curva senti una spinta verso l'esterno, come in auto in una rotonda: è la forza d'inerzia, che per il principio di D'Alembert vale massa per accelerazione, con verso opposto. Quanto vale per un pezzetto di massa $m$?`,
      dopo: L`Il pezzetto sente una forza centrifuga $mV^2/R_1$ verso l'esterno. Nel ramo era zero; appena tocca la puleggia diventa di colpo questo valore. È come entrare in una curva stretta senza alcun tratto di raccordo: un colpo secco.`,
    },
    'd056.5': {
      tappa: 2,
      prima: L`Chiediti se un salto istantaneo di forza è accettabile. Una cinghia vera ha una piccola rigidezza flessionale: per cambiare curvatura di colpo servirebbero sforzi interni enormi concentrati in un punto. Come si risolve lo stesso problema nelle strade e nelle ferrovie, quando si passa da un rettilineo a una curva?`,
      dopo: L`Si introducono curve di raccordo, per esempio paraboliche, che fanno variare il raggio di curvatura gradualmente. Così la forza centrifuga cresce poco alla volta invece di saltare. È la stessa ragione per cui le autostrade non passano mai direttamente da un rettilineo a una curva circolare.`,
    },
    'd056.6': {
      tappa: 2,
      prima: L`Per l'equazione di Eulero servirà la centrifuga su un pezzetto infinitesimo. Prendi un pezzetto di cinghia avvolto che sottende un angolo $d\theta$: è lungo $R_1\,d\theta$. Se $\rho$ è la massa per metro di cinghia, quanto pesa il pezzetto? Poi moltiplica la sua massa per $V^2/R_1$.`,
      dopo: L`La massa è $\rho R_1\,d\theta$ e la centrifuga $\rho V^2\,d\theta$: il raggio si semplifica. Sorpresa utile: la forza centrifuga per unità di angolo non dipende dalla puleggia, ma solo da quanto pesa la cinghia e da quanto corre. Raddoppiando la velocità, la centrifuga quadruplica.`,
    },
    'd058.1': {
      tappa: 3,
      prima: L`Cambiamo punto di vista: dalle forze all'energia. Considera tutta la trasmissione, pulegge e cinghia insieme. Il teorema delle forze vive lega la somma delle potenze alla variazione dell'energia cinetica. A regime le velocità sono costanti: che cosa fa, allora, l'energia cinetica, e quanto vale la somma delle potenze?`,
      dopo: L`A regime l'energia cinetica è costante, quindi la sua derivata è zero e la somma di tutte le potenze è nulla. In parole: tutta la potenza che entra deve uscire o essere persa da qualche parte, perché il sistema non ne accumula.`,
    },
    'd058.2': {
      tappa: 3,
      prima: L`Caso ideale: nessuna perdita. Le potenze in gioco sono solo due: quella della coppia motrice, positiva perché concorde alla rotazione, e quella della coppia della condotta, negativa perché opposta alla rotazione. Scrivi che la loro somma è zero, poi porta le velocità angolari da una parte e le coppie dall'altra.`,
      dopo: L`La potenza entra e esce intera, quindi il rapporto delle coppie è il rapporto di trasmissione. È lo stesso risultato trovato con l'equilibrio delle pulegge, ma per un'altra strada: un buon segno di coerenza. Qui le coppie sono prese in modulo, e il segno è messo a mano.`,
    },
    'd058.3': {
      tappa: 3,
      prima: L`Rovescia la relazione appena trovata per leggere la coppia d'uscita in funzione di quella d'entrata. Poi immagina un riduttore, cioè un rapporto minore di uno: la condotta gira più piano della motrice. La sua coppia sarà più grande o più piccola di quella della motrice?`,
      dopo: L`Un riduttore di giri è un moltiplicatore di coppia, e viceversa. È esattamente ciò che fa la lavatrice: il cestello gira piano ma con una coppia molto maggiore di quella del motore. Controllo: la potenza, prodotto di coppia e velocità, resta la stessa.`,
    },
    'd058.4': {
      tappa: 3,
      prima: L`Ora il caso reale: una parte della potenza si perde per attrito. Usiamo le coppie con il loro segno, «algebriche». Elenca le potenze: quella motrice entra ed è positiva; quella della condotta esce, e siccome la coppia è opposta alla rotazione il prodotto è negativo; infine c'è la potenza dissipata dall'attrito, che è sempre una perdita. Che segno ha?`,
      dopo: L`La somma delle tre potenze è zero: una positiva, due negative. Si legge come un bilancio: ciò che entra dalla motrice va in parte all'utilizzatore e in parte in calore. La dispensa qui segna la potenza della condotta come positiva, ma con la sua stessa convenzione deve essere negativa, altrimenti il bilancio non torna.`,
    },
    'd058.5': {
      tappa: 3,
      prima: L`Ci serve un'espressione per la potenza dissipata. Il rendimento $\eta$ è la frazione della potenza motrice che arriva all'utilizzatore. Se ne arriva la frazione $\eta$, quale frazione si perde? Moltiplicala per la potenza motrice e ricorda il segno di una perdita.`,
      dopo: L`Si perde la frazione $(1-\eta)$ della potenza motrice, e il meno davanti dice che è una potenza uscente dal sistema. Controllo: con $\eta = 1$ la perdita è zero, con $\eta = 0{,}9$ si perde un decimo della potenza che entra.`,
    },
    'd058.6': {
      tappa: 3,
      prima: L`Sostituisci la potenza dissipata nel bilancio. Il termine $C_1\omega_1$ compare due volte: una volta intero e una volta con il fattore $-(1-\eta)$. Raccoglilo: che cosa resta davanti? Poi, come nel caso ideale, separa coppie e velocità angolari.`,
      dopo: L`Resta $\eta C_1\omega_1$, e il rapporto delle coppie è meno il rapporto di trasmissione diviso il rendimento. Il segno meno viene dalle coppie algebriche: una spinge, l'altra frena. Controllo: con $\eta = 1$ ritrovi il caso ideale, con il segno.`,
    },
    'd058.7': {
      tappa: 3,
      prima: L`Ripassiamo ai moduli per leggere il risultato senza segni. Il rendimento è la potenza in uscita sulla potenza in entrata, cioè $|C_2\omega_2|/|C_1\omega_1|$. Riconosci dentro questa frazione il rapporto delle coppie e il rapporto di trasmissione effettivo $\omega_2/\omega_1$, poi isola quest'ultimo.`,
      dopo: L`Il rapporto di trasmissione effettivo è il rendimento per il rapporto delle coppie. Quindi, a coppie fissate, un rendimento più alto dà un rapporto più alto. La dispensa scrive qui il rapporto ideale, ma con le perdite il rapporto che compare è quello effettivo.`,
    },
    'd059.1': {
      tappa: 4,
      prima: L`Ora la cinghia è elastica. Prendi un pezzetto lungo $dz$ quando è scarico. Quando la tiri, ogni suo punto si sposta: l'estremo in $z$ di $w(z)$, l'estremo in $z+dz$ di $w(z+dz)$. Per trovare la nuova lunghezza, scrivi la posizione finale di ciascun estremo e fai la differenza.`,
      dopo: L`La nuova lunghezza è quella vecchia più l'allungamento $dw$, cioè la differenza fra gli spostamenti dei due estremi. Controllo: se tutti i punti si spostano della stessa quantità, $dw = 0$, il pezzetto trasla senza allungarsi.`,
    },
    'd059.2': {
      tappa: 4,
      prima: L`La deformazione è l'allungamento diviso la lunghezza iniziale. Hai appena trovato l'allungamento del pezzetto e conosci la sua lunghezza iniziale $dz$: dividili. Il rapporto fra una differenza infinitesima e $dz$ ti dovrebbe ricordare una derivata.`,
      dopo: L`La deformazione è la derivata dello spostamento: dice di quanto, in proporzione, si allunga ogni pezzetto. È un numero puro, piccolissimo per una cinghia vera (qualche millesimo). Si chiama legame di congruenza perché viene solo dalla geometria.`,
    },
    'd059.3': {
      tappa: 4,
      prima: L`Adesso colleghiamo la deformazione alla forza. La cinghia si comporta come una molla: più la tiri, più si allunga, in proporzione. Quale legge del richiamo lega la tensione alla deformazione?`,
      dopo: L`È la legge di Hooke: la tensione è la rigidezza assiale per la deformazione. Una cinghia con $EA$ grande si allunga pochissimo. Ricorda che la cinghia lavora solo a trazione: $T$ è sempre positiva.`,
    },
    'd059.4': {
      tappa: 4,
      prima: L`Metti insieme le tre righe precedenti. La nuova lunghezza è $dz + dw$; $dw$ è $\varepsilon\,dz$; e $\varepsilon$ è $T/EA$. Raccogli $dz$ e sostituisci la deformazione con la tensione.`,
      dopo: L`Un pezzetto teso con tensione $T$ è lungo $(1+T/EA)$ volte la sua lunghezza a riposo. Controllo: con $T = 0$ non si allunga, con $EA$ infinito nemmeno. Più tensione, pezzetto più lungo.`,
    },
    'd059.5': {
      tappa: 4,
      prima: L`Ecco il passaggio chiave: la conservazione della massa. A regime, in ogni sezione della cinghia passa sempre la stessa quantità di materiale nello stesso tempo $dt$, cioè la stessa lunghezza a riposo $d\ell_0$. Quel materiale però, dove è più tirato, occupa più spazio. La velocità è lo spazio occupato diviso il tempo: scrivila e usa la riga precedente.`,
      dopo: L`La velocità di un tratto è $V_0$ per $(1+T/EA)$: un tratto più teso corre di più. Pensa a una fila di persone che passa da una porta, una al secondo: dove si tengono più distanziate, la fila deve camminare più svelta. $V_0$ è la velocità che avrebbe la cinghia completamente scarica.`,
    },
    'd059.6': {
      tappa: 4,
      prima: L`Applica il risultato ai due rami. Il ramo teso ha tensione $T_1$, il lasco $T_2$, e $T_1$ è più grande. Scrivi la velocità di ciascuno con la formula appena trovata e fai il rapporto: la stessa $V_0$ compare sopra e sotto.`,
      dopo: L`Il ramo teso corre più del lasco, perché il numeratore è più grande del denominatore. La differenza è piccola, dell'ordine di $(T_1 - T_2)/EA$, ma non nulla: è da qui che nasce lo scorrimento elastico. Controllo: con tensioni uguali i rami vanno alla stessa velocità.`,
    },
    'd059.7': {
      tappa: 4,
      prima: L`Chiediti che cosa rappresenti davvero $V_0$. Dalla formula, puoi ricavarla da qualsiasi tratto dividendo la sua velocità per il suo fattore di allungamento. Prova con il ramo teso e con il lasco.`,
      dopo: L`Viene lo stesso valore da entrambi i rami: $V_0$ è unica ed è la «portata» di cinghia scarica. Attenzione: non è la velocità a coppia nulla. Anche senza coppia la cinghia è pretensionata, con una tensione $T_0$ positiva, quindi corre un po' più di $V_0$.`,
    },
    'd060.1': {
      tappa: 5,
      prima: L`Ora la domanda giusta è: con quale tensione la cinghia aderisce alla motrice? Nella lezione su Eulero vedrai che, su ogni puleggia, la cinghia prima aderisce e poi striscia verso l'uscita. Sulla motrice entra dal ramo teso: nel tratto aderente ha quindi tensione $T_1$ e la stessa velocità del bordo. Eguaglia le due velocità.`,
      dopo: L`Il bordo della motrice va alla velocità del ramo teso. La puleggia «trascina» la cinghia con sé nel tratto d'ingresso, dove la cinghia è più allungata. Questa uguaglianza vale perché nel tratto aderente non c'è velocità relativa fra cinghia e puleggia.`,
    },
    'd060.2': {
      tappa: 5,
      prima: L`Ripeti sulla condotta. Da quale ramo entra la cinghia sulla condotta? Segui il giro: il ramo teso esce dalla condotta per andare verso la motrice, quindi sulla condotta entra il ramo lasco. Nel tratto aderente la tensione è $T_2$. Scrivi l'uguaglianza fra la velocità del bordo e quella della cinghia.`,
      dopo: L`Il bordo della condotta va alla velocità del ramo lasco, che è la più bassa. Il passaggio da $T_1$ a $T_2$ e viceversa avviene negli archi dove la cinghia striscia sulla puleggia. Ecco l'asimmetria che fa perdere giri alla condotta.`,
    },
    'd060.3': {
      tappa: 5,
      prima: L`Abbiamo due uguaglianze, una per puleggia, tutte e due con $V_0$. Per ottenere il rapporto di trasmissione $\omega_2/\omega_1$ dividi la seconda per la prima: $V_0$ si semplifica. Poi porta i raggi dall'altra parte e riconosci il rapporto ideale.`,
      dopo: L`Il rapporto effettivo è quello ideale moltiplicato per un fattore: l'allungamento del lasco diviso quello del teso. Siccome il teso è più allungato, il fattore è minore di uno e la condotta gira un po' meno del previsto. È questa la formula da ricordare.`,
    },
    'd060.4': {
      tappa: 5,
      prima: L`Proviamo un caso limite per controllare la formula. Se la coppia trasmessa è nulla, che cosa ti dice l'equilibrio della motrice, $C_1 = (T_1 - T_2)R_1$, sulle due tensioni? Mettilo nella formula del rapporto effettivo e guarda che cosa resta del fattore correttivo.`,
      dopo: L`Senza coppia le tensioni sono uguali, il fattore vale uno e si torna al rapporto ideale. Fisicamente: tutto l'arco è in aderenza, la cinghia non striscia e non si perde potenza. Il caso ideale è quindi il limite «senza carico» del caso reale.`,
    },
    'd060.5': {
      tappa: 5,
      prima: L`Ora vediamo quanto si scende sotto l'ideale con la coppia. Scrivi il fattore correttivo come $(EA + T_2)/(EA + T_1)$, moltiplicando sopra e sotto per $EA$. Poi scrivilo come «uno meno qualcosa»: aggiungi e togli $T_1$ al numeratore. Infine usa $T_1 - T_2 = C_1/R_1$.`,
      dopo: L`Il rapporto relativo è uno meno un termine proporzionale alla coppia: più coppia trasmetti, più la condotta perde giri. Il rapporto quindi non è un numero fisso della macchina: dipende dal carico. Il termine è piccolo perché $EA$ è grande, ma non si annulla mai finché c'è coppia.`,
    },
    'd060.6': {
      tappa: 5,
      prima: L`Secondo caso limite: una cinghia rigidissima. Che cosa succede ai fattori di allungamento se $EA$ diventa enorme? Guarda i due termini $T/EA$ nel fattore correttivo, qualunque sia la coppia.`,
      dopo: L`Con $EA$ infinito i due termini $T/EA$ vanno a zero, il fattore torna a uno e il rapporto torna ideale anche con la coppia. Coerente: la cinghia rigida è proprio l'ipotesi del caso ideale. Il difetto nasce tutto dall'elasticità.`,
    },
    'd060.7': {
      tappa: 5,
      prima: L`Traiamo la conseguenza pratica. Il rapporto cambia con il carico, quindi i due alberi non sono sincroni: in un'ora la condotta fa un numero di giri che dipende da quanto si è lavorato. Ci sono applicazioni dove questo non va bene? Quali organi trasmettono il moto senza strisciare?`,
      dopo: L`Dove serve un rapporto costante, per esempio per la distribuzione di un motore, si usano cinghie dentate, catene o ruote dentate, che ingranano invece di affidarsi all'attrito. La cinghia piana è semplice, silenziosa e protegge dai sovraccarichi, ma non garantisce il sincronismo.`,
    },
    'd061.1': {
      tappa: 5,
      prima: L`Ora la potenza persa. Comincia dalla definizione di rendimento: una frazione che dice quanta della potenza che entra arriva davvero all'utilizzatore. Che potenza entra dalla motrice e che potenza esce dalla condotta, in termini di coppie e velocità angolari?`,
      dopo: L`Il rendimento è la potenza in uscita diviso quella in entrata, in modulo. È un numero fra zero e uno: uno vuol dire nessuna perdita. Per calcolarlo ci servono il rapporto delle coppie e quello delle velocità angolari.`,
    },
    'd061.2': {
      tappa: 5,
      prima: L`Riscrivi la definizione separando le coppie dalle velocità angolari: $\eta = (C_2/C_1)(\omega_2/\omega_1)$. Il secondo fattore è il rapporto di trasmissione effettivo. Isola quest'ultimo: è la stessa relazione trovata con il bilancio di potenza.`,
      dopo: L`Il rapporto effettivo è il rendimento per il rapporto delle coppie. Per andare avanti ci serve sapere quanto vale il rapporto delle coppie nel caso reale: è la prossima domanda.`,
    },
    'd061.3': {
      tappa: 5,
      prima: L`Quale relazione fra le coppie resta valida anche con le perdite? Ce ne sono due candidate. Una viene dal bilancio di potenza senza perdite, e quindi qui non vale più. L'altra viene dall'equilibrio di ciascuna puleggia, che vale sempre, perché la differenza di tensione dei rami è la stessa per tutte e due. Usa quella.`,
      dopo: L`Le coppie stanno come i raggi anche nel caso reale. Invece l'uguaglianza fra rapporto delle coppie e rapporto delle velocità angolari va «sacrificata»: valeva solo senza perdite. È il punto delicato della dimostrazione.`,
    },
    'd061.4': {
      tappa: 5,
      prima: L`Sostituisci nella definizione di rendimento il rapporto delle coppie appena trovato. Ti resta un rapporto di velocità angolari per un rapporto di raggi. Raggruppa ogni velocità angolare con il suo raggio: che cosa riconosci?`,
      dopo: L`Il rendimento è la velocità del bordo della condotta divisa quella della motrice. Si legge benissimo: se i bordi corressero uguali, come nel caso ideale, non si perderebbe niente. La perdita è tutta nella velocità che la condotta «perde» rispetto alla motrice.`,
    },
    'd061.5': {
      tappa: 5,
      prima: L`Ora usa le velocità del modello elastico: il bordo della motrice va con il ramo teso, quello della condotta con il lasco. Sostituisci le due espressioni con $V_0$ e semplifica. Confronta poi con il fattore correttivo del rapporto di trasmissione effettivo.`,
      dopo: L`Il rendimento coincide con il fattore che abbassa il rapporto sotto l'ideale: è minore di uno e scende quando la coppia cresce. Ecco perché la formula si può scrivere anche come rapporto effettivo uguale al rendimento per quello ideale.`,
    },
    'd061.6': {
      tappa: 5,
      prima: L`Calcoliamo direttamente la potenza persa: potenza in entrata meno potenza in uscita. Scrivi ogni coppia come differenza di tensioni per il raggio. Poi raccogli $T_1 - T_2$ e raggruppa ogni raggio con la sua velocità angolare.`,
      dopo: L`La potenza persa è la forza trasmessa per la differenza di velocità fra il tratto aderente della motrice e quello della condotta. È l'attrito che lavora negli archi di scorrimento, dove la cinghia striscia. Controllo: con una cinghia rigida le velocità coincidono e la perdita è zero.`,
    },
    'd061.7': {
      tappa: 5,
      prima: L`Infine colleghiamo la potenza persa al rendimento. La potenza in uscita è $\eta$ volte quella in entrata. Quanto resta, allora, sottraendo l'uscita dall'entrata? Ricorda il segno della potenza dissipata, che è una perdita.`,
      dopo: L`La potenza dissipata è meno la frazione $(1-\eta)$ della potenza motrice: la stessa espressione usata nel bilancio di potenza. Così le due strade, bilancio energetico e modello elastico, si chiudono in modo coerente.`,
    },
    'd137.1': {
      tappa: 6,
      prima: L`Partiamo da ciò che dice la dispensa. Nella cinghia aperta i due archi avvolti, uno sulla piccola e uno sulla grande, insieme fanno un giro completo. Guarda il disegno: quale puleggia è abbracciata di più dalla cinghia?`,
      dopo: L`La somma degli angoli avvolti è un giro e la puleggia piccola ha l'arco minore. Questo conterà moltissimo: la puleggia con meno arco è quella che slitta per prima. Resta da calcolare quanto valgono i due archi.`,
    },
    'd137.2': {
      tappa: 6,
      prima: L`Cerchiamo un triangolo. In ogni punto di tangenza il raggio è perpendicolare alla retta tangente, cioè al ramo. Se due raggi sono perpendicolari alla stessa retta, che relazione hanno fra loro? Poi traccia da $O_1$ una retta parallela al ramo e guarda la figura che si forma con $O_2$.`,
      dopo: L`I due raggi sono paralleli fra loro e perpendicolari al ramo. La parallela al ramo tracciata da $O_1$ forma con $O_2$ un triangolo rettangolo: l'ipotenusa è l'interasse $a$, un cateto è la differenza dei raggi $R_2 - R_1$, l'altro è lungo quanto il ramo.`,
    },
    'd137.3': {
      tappa: 6,
      prima: L`Chiamiamo $\gamma$ l'inclinazione del ramo rispetto alla congiungente dei centri. Nel triangolo rettangolo appena trovato, $\gamma$ è l'angolo opposto al cateto $R_2 - R_1$. Quale funzione trigonometrica lega l'angolo al cateto opposto e all'ipotenusa?`,
      dopo: L`Il seno di $\gamma$ è la differenza dei raggi diviso l'interasse. Controllo: con pulegge uguali $\gamma = 0$ e i rami sono paralleli alla congiungente; con interasse molto grande $\gamma$ diventa piccolo.`,
    },
    'd137.4': {
      tappa: 6,
      prima: L`Con pulegge uguali ogni puleggia sarebbe avvolta esattamente per mezzo giro. Con raggi diversi ogni ramo si inclina di $\gamma$ e sposta i punti di tangenza: sulla piccola si avvicinano, sulla grande si allontanano. I rami sono due: di quanto cambia ciascun arco rispetto a mezzo giro?`,
      dopo: L`La piccola perde $2\gamma$ rispetto a mezzo giro, la grande li guadagna. La somma torna un giro, come diceva la dispensa. Controllo: con $\gamma = 0$ entrambi gli archi valgono $\pi$.`,
    },
    'd137.5': {
      tappa: 6,
      prima: L`Già che abbiamo il triangolo rettangolo, ricaviamo anche la lunghezza del ramo libero, cioè del tratto dritto fra i due punti di tangenza. Nel triangolo è proprio l'altro cateto, quello parallelo al ramo. Quale teorema lega i cateti all'ipotenusa?`,
      dopo: L`Per Pitagora il ramo è la radice di interasse al quadrato meno la differenza dei raggi al quadrato. Serve per calcolare la lunghezza totale della cinghia, sommando i due rami e i due archi avvolti.`,
    },
    'd137.6': {
      tappa: 6,
      prima: L`E se la cinghia è incrociata, cioè disegnata a forma di otto per invertire il verso di rotazione? Ora i raggi ai punti di tangenza stanno da parti opposte del ramo. Rifai il triangolo: il cateto non è più la differenza dei raggi. E ciascuna puleggia guadagna o perde arco?`,
      dopo: L`Il cateto diventa la somma dei raggi e tutte e due le pulegge guadagnano $2\gamma'$: la somma degli archi supera un giro. Quindi la relazione della dispensa vale solo per la cinghia aperta. Controllo: la condizione richiede $a > R_1 + R_2$, altrimenti le pulegge si toccherebbero.`,
    },
  },
  racconto: L`All'orale parti dalla cinghia ideale: inestensibile e senza slittamenti, ha una sola velocità, quindi $\omega_1 R_1 = \omega_2 R_2$ e il rapporto di trasmissione, uscita su entrata, è $R_1/R_2$. Con l'equilibrio delle pulegge mostri che la coppia è la differenza delle tensioni per il raggio, e che le coppie stanno come i raggi. Poi passi alla realtà: la cinghia è elastica, e per la conservazione della massa un tratto teso corre di più, $V = V_0(1 + T/EA)$. La motrice va con il teso, la condotta con il lasco: il rapporto effettivo è quello ideale per $(1 + T_2/EA)/(1 + T_1/EA)$, minore di uno e decrescente con la coppia. Chiudi dicendo che lo stesso fattore è il rendimento, $V_2/V_1$, e che per avere sincronismo servono catene o cinghie dentate.`,
};
