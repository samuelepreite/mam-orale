/** Lezioni discorsive del capitolo C6 (docs/BRIEF_LEZIONI.md): argomento → testo della lezione. */
import type { LezioneArgomento } from '../types';

// ====================================================================================== c6-diretto
const diretto: LezioneArgomento = {
  perche:
    "Pensa a una pompa o a un ventilatore montato direttamente sull'albero di un motore elettrico. Premi l'interruttore: l'albero parte, accelera sempre meno e dopo qualche secondo si assesta a una velocità che poi non cambia più. Dietro questo gesto banale ci sono quattro domande da progettista, le stesse che si pone la dispensa: **il sistema riesce a partire? A quale velocità si ferma la crescita? Se un disturbo lo rallenta un attimo, torna dov'era? E quanto tempo ci mette ad arrivare a regime?** Questa lezione risponde a tutte e quattro partendo da una sola equazione.",
  idea:
    "Sull'albero ci sono due «contendenti». Il motore spinge con la sua coppia $C_m$; l'utilizzatore (la pompa, il ventilatore) si oppone con la sua coppia resistente $C_u$. È come pedalare in bicicletta contro il vento: se spingi più di quanto il vento frena, acceleri; se le due cose si equivalgono, vai a velocità costante.\n\nLa differenza fra le due coppie non sparisce: serve ad accelerare le masse che girano, cioè le inerzie del motore e dell'utilizzatore. Più inerzia c'è, più lentamente cresce la velocità.\n\nIl punto delicato è che entrambe le coppie cambiano con la velocità: ciascuna ha la sua **caratteristica meccanica**, una curva coppia–velocità. Il regime è dove le due curve si incrociano. Ma un incrocio può essere come una pallina sul fondo di una valle (se la sposti, torna) oppure in cima a una collina (se la sposti, scappa). Capire quale dei due casi hai è il problema della stabilità.",
  richiami: [
    { titolo: 'Energia cinetica di un corpo che ruota', testo: "Un disco che gira con velocità angolare $\\omega$ attorno al suo asse ha energia cinetica $\\tfrac12 I\\omega^2$, dove $I$ è il momento d'inerzia: dice quanto il corpo «resiste» a cambiare velocità di rotazione. È l'analogo rotazionale di $\\tfrac12 m v^2$: la massa diventa inerzia, la velocità diventa velocità angolare." },
    { titolo: 'Teorema delle forze vive (T.F.V.)', testo: "La somma delle potenze di tutte le forze e coppie che agiscono su un sistema è uguale alla rapidità con cui cambia la sua energia cinetica: $W = dE_K/dt$. La potenza di una coppia è coppia per velocità angolare: positiva se la coppia spinge nel verso del moto (motore), negativa se si oppone (carico)." },
    { titolo: 'Derivata di una funzione composta', testo: "Se $\\omega$ dipende dal tempo, anche $\\omega^2$ ne dipende. La sua derivata è $2\\omega\\dot\\omega$: prima derivi il quadrato (viene $2\\omega$), poi moltiplichi per la derivata di ciò che sta dentro ($\\dot\\omega$). Quindi $\\frac{d}{dt}\\big(\\tfrac12 I\\omega^2\\big) = I\\omega\\dot\\omega$: il ½ si mangia il 2." },
    { titolo: 'Retta tangente (Taylor al primo ordine)', testo: "Vicino a un punto, una curva liscia si confonde con la sua retta tangente: $C(\\omega) \\simeq C(\\omega_P) + C'(\\omega_P)(\\omega - \\omega_P)$. La pendenza $C'(\\omega_P)$ dice di quanto cambia la coppia per ogni rad/s in più. Funziona finché ci si allontana poco dal punto: per questo si parla di «piccole perturbazioni»." },
    { titolo: 'Equazione differenziale a variabili separabili', testo: "Un'equazione come $\\dot x = k\\,x$ si risolve portando tutte le $x$ da una parte e il tempo dall'altra: $dx/x = k\\,dt$. Integrando si ottiene $\\ln(x/x_0) = k t$, cioè $x = x_0 e^{kt}$. Se $k < 0$ la grandezza si smorza verso zero; se $k > 0$ cresce senza limite." },
  ],
  ipotesiPerche: [
    "Motore e utilizzatore sullo stesso albero significa una sola velocità angolare: tutto il sistema si descrive con una sola incognita, ω. È il caso più semplice possibile, da cui poi partiranno trasmissione e frizione.",
    "Le caratteristiche meccaniche sono i «dati» del problema: senza sapere come la coppia di ciascuna macchina dipende da ω non si può dire né dove sta il regime né se è stabile.",
    "Fissiamo i versi una volta per tutte: la coppia motrice spinge, quella dell'utilizzatore frena. Le inerzie contano perché ci interessa anche il transitorio, non solo il regime.",
    "Per decidere la stabilità basta guardare che cosa succede appena fuori dal regime: lì le curve si possono sostituire con le loro tangenti e l'equazione diventa facile da risolvere.",
  ],
  disegnoGuida:
    "Parti dallo schema in alto: a sinistra un rettangolo «Motore», a destra un rettangolo «Utilizzatore», in mezzo un solo albero. Sull'albero disegna due dischi: vicino al motore $I_m$, vicino all'utilizzatore $I_u$. Rappresentano tutta la massa che gira da ciascuna parte. Poi le frecce curve: $C_m$ nello stesso verso di ω (il motore spinge), $C_u$ nel verso opposto (il carico frena). Sotto, disegna il grafico con la coppia C in verticale e ω in orizzontale. Traccia la curva del motore: parte da $C_A$ (coppia di spunto), sale a un massimo, poi scende ripida fino a zero in $\\omega_S$. Traccia la curva dell'utilizzatore che parte da $C_{u0}$ e sale. Segna il punto P dove si incrociano e scendi in verticale fino a $\\omega_R$: è la velocità di regime.",
  mappa: [
    "Bilancio di potenze sull'albero comune: ottengo l'equazione del moto.",
    "Regime: dove le due coppie si equivalgono; avvio: chi vince a velocità zero.",
    "Stabilità: sposto di poco il sistema dal regime e guardo se torna indietro.",
    "Transitorio: risolvo l'equazione per sapere quanto tempo serve ad arrivare a regime.",
  ],
  dims: {
    d101: {
      introduzione:
        "Vogliamo un'equazione che dica come cambia la velocità dell'albero nel tempo. La strategia della dispensa è un bilancio di energia: la potenza che entra dal motore, meno quella che se ne va nel carico, finisce in energia cinetica delle masse che girano. Poiché c'è una sola velocità, alla fine potremo semplificarla.",
      riepilogo:
        "Abbiamo osservato che c'è una sola velocità, poi abbiamo scritto il teorema delle forze vive: potenza del motore meno potenza del carico uguale alla variazione di energia cinetica. Derivando l'energia e dividendo per la velocità, è rimasta un'equazione semplice: la differenza fra le coppie, divisa per la somma delle inerzie, dà l'accelerazione. Poiché le coppie dipendono dalla velocità, l'equazione va letta insieme alle caratteristiche meccaniche.",
    },
    d102: {
      introduzione:
        "Ora usiamo l'equazione del moto per rispondere alle prime due domande: dove si stabilizza la velocità e se il sistema parte da fermo. L'idea è leggere il segno della differenza fra le coppie: positivo vuol dire accelerare, nullo vuol dire velocità costante. Chiudiamo con un esempio numerico semplice, motore in corrente continua e carico costante.",
      riepilogo:
        "Il regime è dove l'accelerazione si annulla, cioè dove le due caratteristiche si incrociano. Il sistema parte solo se a velocità zero il motore dà più coppia di quella che il carico richiede. Con un motore a retta e un carico costante l'incrocio si trova risolvendo un'equazione di primo grado. Infine abbiamo visto che gli incroci possono essere più di uno: quale vale davvero lo deciderà la stabilità.",
    },
    d103: {
      introduzione:
        "Un punto di regime serve solo se il sistema ci resta anche quando qualcosa lo disturba. Strategia: diamo una piccola spinta alla velocità, sostituiamo le curve con le loro tangenti nel punto e scriviamo come evolve lo scostamento dal regime. Se lo scostamento si spegne, il punto è stabile.",
      riepilogo:
        "Vicino al regime abbiamo sostituito le caratteristiche con le loro tangenti. Le coppie nel punto si cancellano, perché lì sono uguali, e resta un'equazione in cui lo scostamento cresce in proporzione a se stesso. La soluzione è un esponenziale: si spegne se la pendenza del motore è minore di quella del carico, esplode altrimenti. È la versione con le formule del ragionamento qualitativo della dispensa sui punti P e Q.",
    },
    d104: {
      introduzione:
        "Sappiamo dove arriva il sistema; ora vogliamo sapere come e in quanto tempo. Prendiamo il caso più semplice che si risolve a mano: motore in corrente continua, con caratteristica a retta, e carico a coppia costante. L'equazione del moto diventa lineare e si integra separando le variabili, come già fatto per la stabilità.",
      riepilogo:
        "Con caratteristiche rettilinee l'equazione del moto si integra esattamente: la velocità sale da zero verso il regime con una legge esponenziale, rapida all'inizio e sempre più lenta. Il regime non si raggiunge mai davvero, per questo si misura il tempo al 90 %. Il risultato dice che quel tempo è circa 2,3 costanti di tempo, cioè proporzionale all'inerzia e inversamente proporzionale alla pendenza del motore.",
    },
  },
  passi: {
    'd101.1': {
      tappa: 0,
      prima: "Prima di scrivere qualunque equazione chiediti: quante velocità diverse ci sono nel sistema? Motore e utilizzatore sono calettati sullo stesso albero, senza ingranaggi né cinghie in mezzo. Un albero rigido gira tutto insieme, quindi la risposta riguarda sia le velocità sia le accelerazioni.",
      dopo: "La riga dice che c'è una sola velocità angolare, ω, e quindi una sola accelerazione, ω̇. In linguaggio tecnico: il sistema ha un solo grado di libertà. Basterà quindi una sola equazione per descriverne il moto. Con la trasmissione, nella prossima lezione, questo non sarà più vero.",
    },
    'd101.2': {
      tappa: 0,
      prima: "Per legare coppie e accelerazione usiamo il bilancio di energia, cioè il teorema delle forze vive. Servono tre ingredienti: la potenza del motore, quella del carico e l'energia cinetica totale. Chiediti per ciascuna potenza se la coppia spinge nel verso del moto o contro, e ricorda che ogni disco contribuisce con il suo mezzo I per omega al quadrato.",
      dopo: "La potenza del motore è positiva perché la sua coppia è concorde con ω; quella dell'utilizzatore è negativa perché $C_u$ frena. L'energia cinetica è la somma di quella dei due dischi, che girano con la stessa ω. Controllo: se il motore fosse spento e il carico ancora presente, il primo membro sarebbe negativo e l'energia calerebbe, cioè l'albero rallenterebbe. Sensato.",
    },
    'd101.3': {
      tappa: 0,
      prima: "A sinistra abbiamo già le potenze; a destra c'è la derivata nel tempo dell'energia cinetica. Devi derivare ciascun termine $\\tfrac12 I\\omega^2$. L'inerzia è costante, quindi resta fuori; il quadrato di ω si deriva con la regola della funzione composta. Pensa a che fine fa il fattore ½.",
      dopo: "Ogni disco contribuisce con $I\\omega\\dot\\omega$: il ½ si è semplificato con il 2 che viene dalla derivata del quadrato. Ora tutti i termini, a sinistra e a destra, contengono ω come fattore. Controllo delle unità: coppia per velocità angolare è una potenza (watt), e inerzia per accelerazione per velocità è ancora una potenza.",
    },
    'd101.4': {
      tappa: 0,
      prima: "Hai notato che ω compare in ogni termine? Se l'albero gira, cioè ω non è zero, puoi dividere tutto per ω. Poi raccogli ω̇ a destra, dato che moltiplica entrambe le inerzie, e porta la somma delle inerzie al denominatore per isolare l'accelerazione.",
      dopo: "L'accelerazione è la coppia «in eccesso», $C_m - C_u$, divisa per l'inerzia totale. Si legge come la seconda legge di Newton per le rotazioni. Controlli: se le coppie sono uguali, ω̇ = 0 e la velocità resta costante; se le inerzie raddoppiano, a parità di coppie l'accelerazione si dimezza.",
    },
    'd101.5': {
      tappa: 0,
      prima: "Il risultato sembra semplice, ma attenzione: le due coppie non sono numeri fissi. Ciascuna dipende dalla velocità secondo la sua caratteristica meccanica. Riscriviamo l'equazione mettendo in evidenza questa dipendenza e dando un nome breve alla somma delle inerzie, che useremo spesso.",
      dopo: "Il secondo membro cambia mentre ω cambia: è quello che la dispensa intende con «il numeratore non è costante». In generale l'equazione non si risolve con una formula, ma si legge sul grafico delle caratteristiche: dove la curva del motore sta sopra quella del carico il sistema accelera, dove sta sotto rallenta.",
    },
    'd102.1': {
      tappa: 1,
      prima: "Per capire dove va il sistema ripartiamo dall'equazione del moto appena ricavata. Concentrati sul secondo membro: a sinistra c'è l'inerzia, sempre positiva, per l'accelerazione. Quindi è il segno della differenza fra le due coppie a decidere se la velocità sale o scende.",
      dopo: "Se la coppia motrice supera quella resistente, ω̇ è positiva e il sistema accelera; se è minore, rallenta. Sul grafico: dove la curva del motore sta sopra quella del carico, la velocità cresce. Questa semplice lettura dei segni basta per le prossime due righe.",
    },
    'd102.2': {
      tappa: 1,
      prima: "Che cosa vuol dire «essere a regime»? Che la velocità non cambia più, cioè che l'accelerazione è nulla. Guardando l'equazione del moto, quale condizione sulle coppie rende nullo il secondo membro? Pensa anche a dove si trova quel punto sul grafico coppia–velocità.",
      dopo: "A regime le due coppie si equivalgono. Graficamente è il punto P dove le caratteristiche si incrociano, e la sua ascissa $\\omega_R$ è la velocità di regime. Controllo: a sinistra di P il motore sta sopra e il sistema accelera verso P; a destra sta sotto e il sistema rallenta verso P. Il punto «attira» il moto.",
    },
    'd102.3': {
      tappa: 1,
      prima: "Prima del regime c'è l'avvio. Il sistema è fermo, ω = 0: perché si metta in moto serve un'accelerazione positiva proprio in quell'istante. Calcola l'equazione del moto a velocità zero. Quali valori assumono lì le due coppie? Per il motore è la coppia di spunto, per il carico la coppia a velocità nulla.",
      dopo: "Il sistema parte solo se la coppia di spunto del motore $C_A$ supera la coppia che il carico richiede da fermo, $C_{u0}$. Nell'esempio di p. 197 è così; in quello di p. 198 no, e il sistema da fermo non parte. Non conta il massimo della coppia motrice: all'avvio conta il valore a ω = 0.",
    },
    'd102.4': {
      tappa: 1,
      prima: "Passiamo a un esempio che si fa con i numeri. Il motore in corrente continua ha una caratteristica a retta: massima coppia da fermo, coppia nulla alla velocità a vuoto. Una retta si descrive con l'intercetta e la pendenza. Prova a scriverla tu, scegliendo di chiamare $K_m$ la pendenza presa senza il segno.",
      dopo: "La coppia parte da $C_{m,0}$ e cala di $K_m$ per ogni rad/s in più, fino a zero in $\\omega_S$. Qui $K_m$ è un numero positivo, il modulo della pendenza, e il segno meno davanti fa scendere la retta. La dispensa mescola le due convenzioni: dichiarare quale usi evita errori di segno dopo.",
    },
    'd102.5': {
      tappa: 1,
      prima: "Ora applica la condizione di regime a questo esempio. Il carico è a coppia costante, $C_{u,0}$, quindi la sua caratteristica è una retta orizzontale. Eguaglia la retta del motore a quel valore costante: ottieni un'equazione di primo grado nella velocità. Isola $\\omega_P$.",
      dopo: "La velocità di regime è la coppia «in avanzo» allo spunto, $C_{m,0} - C_{u,0}$, divisa per la pendenza del motore. Controlli: senza carico ($C_{u,0} = 0$) si ritrova la velocità a vuoto $\\omega_S$; più carico, più bassa la velocità. Le unità tornano: coppia divisa per coppia per secondo dà rad/s.",
    },
    'd102.6': {
      tappa: 1,
      prima: "Le caratteristiche non sono sempre semplici rette. Guarda l'esempio di p. 198: la curva del motore asincrono sale, fa un massimo e poi crolla, mentre quella del carico cresce. Quante volte possono incrociarsi due curve fatte così? Ogni incrocio soddisfa la condizione di regime.",
      dopo: "Ci sono due incroci: Q sul tratto in salita della curva del motore, P sul tratto in discesa. Entrambi annullano l'accelerazione, ma non è detto che il sistema ci resti. Per scegliere serve un criterio in più, la stabilità, che è il tema della prossima dimostrazione.",
    },
    'd103.1': {
      tappa: 2,
      prima: "Vogliamo studiare che cosa succede appena fuori da P. Le curve vere sono complicate, ma se ci allontaniamo poco ognuna si confonde con la sua retta tangente in P. Scrivi la retta tangente di ciascuna caratteristica: valore in P più pendenza per lo spostamento da $\\omega_P$.",
      dopo: "Ogni coppia è approssimata dal suo valore in P più la pendenza per lo scostamento. Qui $K_m$ e $K_u$ sono le pendenze **con il loro segno**: per il motore asincrono, sul tratto in discesa, $K_m$ è negativa. L'approssimazione è buona solo per piccole perturbazioni, ed è proprio quello che ci serve.",
    },
    'd103.2': {
      tappa: 2,
      prima: "Nelle tangenti compare sempre la differenza $\\omega - \\omega_P$. Conviene darle un nome, così ragioniamo direttamente su «quanto siamo lontani dal regime». Poi chiediti: la velocità di regime cambia nel tempo? Se no, che relazione c'è fra la derivata dello scostamento e quella di ω?",
      dopo: "Ω è lo scostamento dal regime: positivo se il sistema va più veloce di P, negativo se va più piano. Siccome $\\omega_P$ è una costante, la derivata di Ω coincide con l'accelerazione dell'albero. Il punto è stabile se Ω, dopo una spinta, torna a zero.",
    },
    'd103.3': {
      tappa: 2,
      prima: "Ora sostituisci le due rette tangenti nell'equazione del moto, scritta per la derivata di Ω. Al numeratore compaiono le due coppie in P e i due termini con le pendenze. Ricorda che P è un punto di regime: che relazione c'è fra la coppia del motore e quella del carico proprio lì?",
      dopo: "Le coppie in P si cancellano perché sono uguali, e resta solo la differenza delle pendenze per lo scostamento. È un'equazione lineare: la rapidità con cui Ω cambia è proporzionale a Ω stesso. Controllo: se Ω = 0, cioè siamo esattamente in P, la derivata è zero e il sistema resta lì.",
    },
    'd103.4': {
      tappa: 2,
      prima: "Abbiamo un'equazione del tipo «derivata uguale a costante per la grandezza». Si risolve separando le variabili: porta Ω e dΩ da una parte, il tempo e la costante dall'altra. Poi integra dall'istante della perturbazione, quando lo scostamento vale $\\Omega_0$, fino al generico istante t.",
      dopo: "L'integrale di $d\\Omega/\\Omega$ è il logaritmo, quello di una costante in dt è la costante per t. Il logaritmo del rapporto fra scostamento attuale e iniziale cresce o cala linearmente nel tempo, a seconda del segno di $K_m - K_u$. Manca solo l'ultimo passo: togliere il logaritmo.",
    },
    'd103.5': {
      tappa: 2,
      prima: "Per liberare Ω dal logaritmo prendi l'esponenziale di entrambi i membri. Il rapporto $\\Omega/\\Omega_0$ diventa e elevato al secondo membro; poi moltiplica per $\\Omega_0$. Prima di guardare il risultato, prova a immaginare come si comporta al variare del segno dell'esponente.",
      dopo: "Lo scostamento evolve come un esponenziale. Con esponente negativo si smorza e il sistema torna in P; con esponente positivo cresce e il sistema si allontana. L'inerzia sta al denominatore: decide solo quanto è rapida l'evoluzione, non la direzione. È il grafico di p. 199 con le due curve.",
    },
    'd103.6': {
      tappa: 2,
      prima: "Traduciamo il risultato in un criterio da dire all'orale. L'inerzia è sempre positiva, quindi il segno dell'esponente è il segno di $K_m - K_u$. Chiediti: quando quel numero è negativo? E come lo diresti a parole, guardando le pendenze delle due curve nel punto d'incrocio?",
      dopo: "P è stabile se la pendenza della curva del motore è minore di quella del carico. Senso fisico: se la velocità sale un po', la coppia del carico cresce più di quella motrice e il sistema viene frenato indietro. Attenzione: non basta che la curva del motore scenda, conta la differenza delle pendenze.",
    },
    'd103.7': {
      tappa: 2,
      prima: "Verifichiamo il criterio sull'esempio di p. 198, quello con due incroci. In Q la curva del motore è nel tratto in salita e sale più ripida di quella del carico. Prova a ragionare senza formule: se la velocità scende un po' sotto Q, chi vince fra le due coppie? E se sale un po' sopra?",
      dopo: "Sotto Q il carico vince e il sistema rallenta fino a fermarsi; sopra Q vince il motore e il sistema accelera fino a P. Q quindi non trattiene il sistema: è instabile. P invece è stabile. Il criterio analitico e il ragionamento qualitativo della dispensa danno lo stesso verdetto.",
    },
    'd104.1': {
      tappa: 3,
      prima: "Partiamo dall'equazione del moto e sostituiamo le due caratteristiche dell'esempio: la retta decrescente del motore e la costante del carico. Ricorda che $K_m$ qui è il modulo della pendenza, quindi la coppia motrice si scrive con un segno meno davanti al termine in ω. Chiamiamo $I_{eq}$ la somma delle inerzie.",
      dopo: "A destra c'è una funzione lineare di ω: la coppia in eccesso cala man mano che la velocità sale. Controllo: a ω = 0 l'accelerazione vale $(C_{m,0} - C_{u,0})/I_{eq}$, positiva, quindi il sistema parte. A $\\omega = \\omega_P$ il secondo membro si annulla, come deve succedere a regime.",
    },
    'd104.2': {
      tappa: 3,
      prima: "Separiamo le variabili: tutto ciò che contiene ω a sinistra, il tempo a destra. Poi integriamo da fermo (ω = 0 a t = 0) fino al generico istante. Per la primitiva di uno fratto «costante meno $K_m\\omega$» serve attenzione al segno: chiediti qual è la derivata del denominatore.",
      dopo: "Il logaritmo viene dall'integrale di uno fratto qualcosa, e il fattore $-1/K_m$ compensa la derivata del denominatore, che vale $-K_m$. Controllo: a t = 0 il rapporto dentro il logaritmo vale 1 e il logaritmo è zero, come il secondo membro. Al crescere di ω il rapporto cala sotto 1, il logaritmo è negativo e il tempo esce positivo.",
    },
    'd104.3': {
      tappa: 3,
      prima: "Ora esplicitiamo ω. Moltiplica entrambi i membri per $-K_m$, poi prendi l'esponenziale per togliere il logaritmo. Ottieni il rapporto uguale a un esponenziale decrescente; moltiplica per il denominatore e isola ω. Alla fine riconosci dentro la parentesi la velocità di regime calcolata prima.",
      dopo: "La velocità sale come «velocità di regime per uno meno un esponenziale che si spegne». La costante di tempo è $I_{eq}/K_m$: più inerzia, più lento; motore con pendenza più ripida, più rapido. È la stessa forma della carica di un condensatore o del riscaldamento di un forno.",
    },
    'd104.4': {
      tappa: 3,
      prima: "Prima di usare la legge, facciamo il controllo di buon senso sugli estremi. Sostituisci t = 0: quanto vale l'esponenziale? E per t molto grande, dove va l'esponenziale con esponente negativo? Confronta i due risultati con quello che ti aspetti fisicamente.",
      dopo: "A t = 0 la velocità è zero, come imposto; per t che cresce tende alla velocità di regime trovata nella d102. Ma ci arriva solo asintoticamente: l'esponenziale non è mai esattamente zero. Per questo in pratica si chiede quando la velocità arriva a una frazione fissata del regime.",
    },
    'd104.5': {
      tappa: 3,
      prima: "Chiediamoci quando la velocità vale il 90 % di quella di regime. Scrivi la legge oraria e imponi che sia uguale a $0{,}9\\,\\omega_P$. La velocità di regime compare in entrambi i membri: dividi per lei. Isola l'esponenziale e poi prendi il logaritmo.",
      dopo: "Dopo la semplificazione resta che l'esponenziale deve valere 0,1, cioè la frazione di strada che manca. Prendendo il logaritmo si ottiene il tempo cercato. Controllo: ln 0,1 è negativo, e con il segno meno davanti il tempo esce positivo.",
    },
    'd104.6': {
      tappa: 3,
      prima: "Lo stesso ragionamento vale per qualunque frazione, non solo per il 90 %. Rifallo scrivendo «%» al posto di 0,9: l'esponenziale deve valere $1 - \\%$, la parte che manca. Prendi il logaritmo e moltiplica per $-I_{eq}/K_m$.",
      dopo: "Il tempo è la costante di tempo per il logaritmo della frazione mancante, cambiato di segno. La dispensa nella formula generale dimentica il logaritmo: ce ne accorgiamo perché darebbe un tempo negativo. Controllo: più ci si avvicina al 100 %, più il logaritmo va a meno infinito e il tempo cresce senza limite.",
    },
    'd104.7': {
      tappa: 3,
      prima: "Facciamo il conto per il caso del 90 %, quello che si chiede di solito all'orale. Con % = 0,9 la frazione mancante è 0,1. Ricorda che il logaritmo di 0,1 è l'opposto del logaritmo di 10, e che il logaritmo naturale di 10 vale circa 2,3.",
      dopo: "Servono circa 2,3 costanti di tempo per arrivare al 90 % del regime. Il tempo è proporzionale all'inerzia: raddoppiare l'inerzia raddoppia il tempo di avviamento, mentre la velocità di regime non cambia. È il «N.B. tempo ∝ inerzia» che la dispensa annota a p. 200.",
    },
  },
  racconto:
    "All'orale comincio dalla situazione: motore e utilizzatore sullo stesso albero, una sola ω. Con il teorema delle forze vive scrivo potenza motrice meno potenza resistente uguale alla derivata dell'energia cinetica, divido per ω e ottengo $(I_m + I_u)\\dot\\omega = C_m(\\omega) - C_u(\\omega)$. Poi disegno le caratteristiche: il regime è l'incrocio P, e il sistema parte se la coppia di spunto supera quella del carico da fermo. Per la stabilità linearizzo in P: lo scostamento evolve con $e^{(K_m - K_u)t/I_{eq}}$, quindi P è stabile se la pendenza del motore è minore di quella del carico. Chiudo con il transitorio: la velocità sale esponenzialmente e al 90 % ci vogliono circa 2,3 costanti di tempo $I_{eq}/K_m$.",
};

// ====================================================================================== c6-trasmissione
const trasmissione: LezioneArgomento = {
  perche:
    "Un motore elettrico piccolo gira veloce ma dà poca coppia; un argano che solleva un carico deve girare piano con tanta coppia. Fra i due si mette un riduttore, cioè ingranaggi o cinghie che cambiano la velocità. Ora però motore e carico non girano più insieme, e l'equazione dell'accoppiamento diretto non vale più così com'è. La domanda della lezione è: **come «vede» il motore un carico che sta dietro a un riduttore? Quanta coppia gli chiede, quanta inerzia deve accelerare, e quale rapporto conviene scegliere?**",
  idea:
    "Il riduttore è come il cambio della bicicletta. Con il rapporto corto pedali veloce e la ruota gira piano, ma la salita sembra leggera: la coppia che senti sulle gambe è ridotta.\n\nIl trucco della lezione è **riportare tutto all'albero del motore**: sostituire il carico vero con un carico finto che sta direttamente sull'albero motore e si comporta allo stesso modo dal punto di vista energetico. Così torniamo all'accoppiamento diretto, che sappiamo già risolvere.\n\nPer la coppia l'equivalenza si fa sulla **potenza**, che è coppia per velocità: per questo la coppia si riporta con il rapporto τ. Per l'inerzia si fa sull'**energia cinetica**, che dipende dal quadrato della velocità: per questo l'inerzia si riporta con τ². Un riduttore che dimezza la velocità fa sembrare il carico due volte meno «pesante» in coppia e quattro volte in inerzia. Se poi la trasmissione perde un po' di potenza (rendimento η), il motore deve dare di più: il carico sembra più pesante di un fattore 1/η.",
  richiami: [
    { titolo: 'Rapporto di trasmissione', testo: "Nella dispensa il rapporto è velocità d'uscita diviso velocità d'entrata: $\\tau = \\omega_u/\\omega_m$. Un riduttore ha τ minore di 1 (l'utilizzatore gira più piano del motore), un moltiplicatore maggiore di 1. Attenzione: altri testi usano il rapporto inverso $i = \\omega_m/\\omega_u$, e le formule cambiano di conseguenza." },
    { titolo: "Potenza ed energia nelle rotazioni", testo: "La potenza di una coppia è coppia per velocità angolare, $C\\omega$: dipende linearmente dalla velocità. L'energia cinetica di un disco è $\\tfrac12 I\\omega^2$: dipende dal quadrato. Questa differenza (velocità alla prima contro velocità al quadrato) è il motivo per cui coppia e inerzia si riportano con potenze diverse di τ." },
    { titolo: 'Rendimento', testo: "Una trasmissione reale scalda: per attrito fra i denti, nei cuscinetti, nella cinghia. Il rendimento η è il rapporto fra la potenza che esce e quella che entra, un numero fra 0 e 1. In moto diretto la potenza va dal motore al carico: esce dal riduttore solo η volte quella che il motore gli manda." },
    { titolo: "Accoppiamento diretto", testo: "Con motore e carico sullo stesso albero vale $(I_m + I_u)\\dot\\omega = C_m - C_u$: la coppia in eccesso accelera la somma delle inerzie. Il regime è dove le coppie si equivalgono. Tutta questa lezione serve a ricondursi a questa forma." },
    { titolo: 'Massimo di una funzione', testo: "Per trovare il valore di una variabile che rende massima una funzione si deriva rispetto a quella variabile e si pone la derivata uguale a zero. Per una frazione serve la regola del quoziente: (derivata del numeratore per il denominatore, meno numeratore per derivata del denominatore) fratto denominatore al quadrato." },
  ],
  ipotesiPerche: [
    "Mettiamo in fila i tre blocchi e i loro simboli: lato motore con indice m, lato utilizzatore con indice u, e in mezzo la trasmissione descritta da due soli numeri, τ ed η.",
    "Se τ è costante (ingranaggi, cinghia dentata) le velocità restano sempre proporzionali e anche le accelerazioni: il sistema ha ancora un solo grado di libertà. Usiamo la convenzione della dispensa per non confonderci con $i = 1/\\tau$.",
    "Il verso del flusso di potenza decide dove va il rendimento: in moto diretto le perdite si pagano sulla potenza che attraversa la trasmissione andando verso il carico.",
    "Se la trasmissione avesse una sua inerzia bisognerebbe aggiungerla; la si trascura o la si attribuisce ai due lati. La coppia del carico è presa in modulo, con il verso già deciso dal disegno.",
  ],
  disegnoGuida:
    "Disegna in alto lo schema vero: rettangolo «Motore», un albero con il disco $I_m$, un rettangolo «Trasmissione» con scritto τ, η, un secondo albero con il disco $I_u$ e il rettangolo «Utilizzatore». Le frecce curve: $C_m$ e $\\omega_m$ sul primo albero, nello stesso verso; $\\omega_u$ sul secondo, e $C_u$ opposta. Scrivi accanto $\\omega_u = \\tau\\omega_m$: è il legame che userai in ogni riga. Sotto, ridisegna lo stesso sistema **ridotto all'albero motore**: un solo albero con il disco $I_m$ e un secondo disco con scritto $\\tau^2 I_u/\\eta$, e il carico con coppia $\\tau C_u/\\eta$. Questo secondo disegno è il punto d'arrivo: un accoppiamento diretto con grandezze «riportate».",
  mappa: [
    "Lego le due velocità con il rapporto τ.",
    "Riporto l'inerzia del carico all'albero motore con l'energia cinetica.",
    "Scrivo il bilancio di potenze e divido per ω_m: equazione del moto ridotta.",
    "Aggiungo il rendimento e trovo il regime, con l'esempio numerico.",
    "Scelgo il τ che dà al carico la massima accelerazione.",
  ],
  dims: {
    d105: {
      introduzione:
        "Vogliamo l'equazione del moto quando fra motore e carico c'è una trasmissione ideale, senza perdite. Strategia: prima leghiamo le velocità con τ; poi troviamo l'inerzia «equivalente» del carico vista dal motore con un'uguaglianza di energie; infine scriviamo il teorema delle forze vive e lo dividiamo per la velocità del motore.",
      riepilogo:
        "Il rapporto costante τ lega velocità e accelerazioni dei due alberi. Imponendo che l'energia cinetica non cambi, l'inerzia del carico vista dal motore diventa $\\tau^2 I_u$. Scrivendo il teorema delle forze vive con le due velocità e dividendo per $\\omega_m$, ritroviamo l'equazione dell'accoppiamento diretto con la coppia del carico moltiplicata per τ e la sua inerzia per τ².",
    },
    d106: {
      introduzione:
        "Ora la trasmissione perde un po' di potenza. Vogliamo sapere come cambiano la coppia e l'inerzia viste dal motore, e dove si trova il regime. Strategia: riportiamo la coppia con un'uguaglianza di potenze, poi scriviamo con cura il bilancio di potenza attraverso la trasmissione, e chiudiamo con l'esempio numerico E4/2.",
      riepilogo:
        "La coppia del carico si riporta al motore con τ, perché conta la potenza. Con il rendimento, solo la potenza che attraversa la trasmissione viene ridotta di η: scritto così il bilancio, sia la coppia sia l'inerzia del carico viste dal motore risultano divise per η. A regime l'accelerazione è nulla e il motore deve dare τ C_u/η. L'esempio E4/2 mostra il conto e che, senza perdite, la potenza è la stessa ai due alberi.",
    },
    d107: {
      introduzione:
        "Ultima domanda da progettista: fissati motore e carico, quale τ fa accelerare il carico più in fretta? La dispensa non lo tratta, lo deduciamo dall'equazione ridotta. Strategia: scriviamo l'accelerazione del carico in funzione di τ, la deriviamo e poniamo la derivata uguale a zero.",
      riepilogo:
        "Abbiamo capito che va massimizzata l'accelerazione del carico, non quella del motore, che sarebbe massima con il carico scollegato. L'accelerazione del carico è una frazione in τ: derivandola si ottiene un'equazione di secondo grado, la cui radice positiva è il rapporto ottimo. Senza coppia resistente il risultato è elegante: l'inerzia del carico riportata al motore deve essere uguale a quella del motore.",
    },
  },
  passi: {
    'd105.1': {
      tappa: 0,
      prima: "Il primo passo è scrivere il legame fra le due velocità, perché ogni riga successiva lo userà. Parti dalla definizione della dispensa: τ è l'uscita fratto l'entrata. Poi chiediti: se τ non cambia nel tempo, che cosa succede quando derivi entrambi i membri della relazione fra le velocità?",
      dopo: "La velocità del carico è τ volte quella del motore, e lo stesso vale per le accelerazioni, perché τ è una costante e si porta fuori dalla derivata. Controllo: con un riduttore (τ minore di 1) il carico gira più piano del motore. Con τ = 1 torniamo all'accoppiamento diretto.",
    },
    'd105.2': {
      tappa: 1,
      prima: "Vogliamo un disco finto, montato sull'albero motore, che «valga» quanto il carico vero dal punto di vista delle masse in moto. Che cosa deve avere in comune con il carico vero? Pensa all'energia cinetica: il disco finto gira con $\\omega_m$, il carico vero con $\\omega_u$.",
      dopo: "La riga dice: l'inerzia ridotta $I_u^*$, girando alla velocità del motore, ha la stessa energia cinetica che il carico ha girando alla sua velocità. È l'«equivalenza energetica» della dispensa, la stessa usata per l'ascensore a p. 196. Il sistema finto e quello vero accumulano la stessa energia.",
    },
    'd105.3': {
      tappa: 1,
      prima: "Dall'uguaglianza delle energie ricava $I_u^*$: semplifica il ½ e dividi per $\\omega_m^2$. Ti resta il rapporto delle velocità al quadrato. Ora sostituisci quel rapporto con τ, usando la riga di partenza. Fai attenzione all'esponente.",
      dopo: "L'inerzia si riporta con il **quadrato** del rapporto. Perché il quadrato? Perché l'energia cinetica dipende dal quadrato della velocità. Controllo: con un riduttore τ = 1/2 il motore «sente» solo un quarto dell'inerzia del carico. Ecco perché i riduttori aiutano tanto ad avviare carichi pesanti.",
    },
    'd105.4': {
      tappa: 1,
      prima: "Prima di andare avanti, un esempio di come si trova $I_u$ quando il carico non è un semplice disco: l'ascensore di p. 196. Ci sono il tamburo che ruota, la cabina e il contrappeso che traslano. Scrivi le tre energie cinetiche e collega la velocità delle masse a quella del tamburo con il raggio.",
      dopo: "Ogni massa che trasla con velocità $\\omega_u r_t$ conta come un'inerzia $M r_t^2$ sull'albero del tamburo. Sommando al momento d'inerzia del tamburo si ha l'inerzia dell'utilizzatore. Controllo delle unità: massa per metro quadro è proprio un momento d'inerzia (kg m²).",
    },
    'd105.5': {
      tappa: 2,
      prima: "Ora l'equazione del moto. Usiamo di nuovo il teorema delle forze vive, come nell'accoppiamento diretto, ma con una differenza: ora ogni coppia e ogni inerzia ha la sua velocità. Chiediti con quale velocità moltiplicare la coppia del carico e con quali termini scrivere la derivata dell'energia di ciascun disco.",
      dopo: "A sinistra la potenza del motore meno quella del carico, ciascuna con la propria velocità; a destra la derivata delle due energie cinetiche, ciascuna con la propria velocità e accelerazione. Con η = 1 nessuna potenza si perde nella trasmissione. Controllo: se τ = 1 le velocità coincidono e torna la riga della d101.",
    },
    'd105.6': {
      tappa: 2,
      prima: "Vogliamo tutto riferito all'albero motore. Dividi ogni termine per $\\omega_m$. Dove compare $\\omega_u/\\omega_m$ sostituisci τ; dove compare $\\dot\\omega_u$ sostituisci $\\tau\\dot\\omega_m$. Conta quante volte compare τ nel termine dell'inerzia del carico: una volta da ciascuna sostituzione.",
      dopo: "La coppia del carico arriva moltiplicata per τ, la sua inerzia per τ²: esattamente le grandezze ridotte. È l'annotazione «τ·τ ω̇_m» della dispensa. Controllo: è l'equazione dell'accoppiamento diretto con $C_u \\to \\tau C_u$ e $I_u \\to \\tau^2 I_u$, coerente con quanto trovato con l'energia.",
    },
    'd105.7': {
      tappa: 2,
      prima: "Per avere l'equazione differenziale nella forma «accelerazione uguale a qualcosa», dividi entrambi i membri per la somma delle inerzie ridotte. È lo stesso passaggio che nella d101 portava a ω̇ = (C_m − C_u)/(I_m + I_u).",
      dopo: "L'accelerazione del motore è la coppia in eccesso ridotta divisa per l'inerzia totale ridotta. Tutto ciò che sapevamo per l'accoppiamento diretto (regime, stabilità, transitorio) vale ancora, basta usare le grandezze riportate. Controllo: con τ = 1 si ritrova esattamente la formula dell'accoppiamento diretto.",
    },
    'd106.1': {
      tappa: 2,
      prima: "Vogliamo la coppia «finta» che, applicata all'albero motore, equivalga al carico vero. Questa volta l'equivalenza giusta è sulla potenza, non sull'energia: la coppia finta, alla velocità del motore, deve assorbire la stessa potenza della coppia vera alla velocità del carico. Scrivi l'uguaglianza e risolvi.",
      dopo: "La coppia si riporta con τ alla prima potenza, perché la potenza è lineare nella velocità. Controllo: con un riduttore τ = 1/2 il motore deve dare solo metà della coppia del carico, ma girando al doppio della velocità; la potenza è la stessa. È la $C_u^*$ dell'esempio E4/2.",
    },
    'd106.2': {
      tappa: 3,
      prima: "Ora la trasmissione ha rendimento η. Dove va messo η? Ragiona sul flusso di potenza: una parte della potenza del motore serve ad accelerare il suo stesso disco e non entra mai nella trasmissione. Solo la parte restante attraversa la trasmissione, e ne esce η volte tanto per vincere il carico e accelerare il suo disco.",
      dopo: "A sinistra la potenza che entra nella trasmissione (motore meno inerzia del motore), moltiplicata per η; a destra quella che serve al carico (coppia più inerzia del carico). La dispensa mette η solo su $C_m$, ma così non si arriva al suo stesso risultato. Controllo: con η = 1 torna la riga della d105.",
    },
    'd106.3': {
      tappa: 3,
      prima: "Riportiamo tutto all'albero motore. Dividi entrambi i membri per $\\eta\\,\\omega_m$, poi sostituisci $\\omega_u = \\tau\\omega_m$ e $\\dot\\omega_u = \\tau\\dot\\omega_m$. Infine porta il termine con $I_m\\dot\\omega_m$ a destra, insieme all'altro termine inerziale, e raccogli $\\dot\\omega_m$.",
      dopo: "Coppia e inerzia del carico sono entrambe divise per η: il rendimento «si paga due volte». Siccome η è minore di 1, il motore vede un carico più pesante. Controlli: con η = 1 torna l'equazione della d105; se η diminuisce, a parità di coppia motrice l'accelerazione cala, come ci si aspetta.",
    },
    'd106.4': {
      tappa: 3,
      prima: "Dove si stabilizza il sistema? Come sempre, a regime l'accelerazione è nulla. Poni $\\dot\\omega_m = 0$ nell'equazione appena ottenuta: il termine con le inerzie sparisce. Prova poi a moltiplicare per $\\omega_m$ per leggere la condizione in termini di potenze.",
      dopo: "A regime il motore dà τ C_u/η. Letta come potenza: η volte la potenza del motore è uguale a quella assorbita dal carico. Con η = 1 è la riga della dispensa, $C_m = C_u\\tau$. Graficamente, il regime è l'incrocio fra la caratteristica del motore e quella del carico riportata all'albero motore.",
    },
    'd106.5': {
      tappa: 3,
      prima: "Applichiamo all'esempio E4/2: motore con coppia che cala linearmente, $C_{mo} - k_m\\omega_m$, carico con coppia proporzionale alla sua velocità, $k_u\\omega_u$, τ = 1/2 ed η = 1. Riporta la coppia del carico all'albero motore e scrivi la velocità del carico in funzione di quella del motore.",
      dopo: "La coppia riportata contiene τ due volte: una per riportare la coppia, una perché la velocità del carico è τ volte quella del motore. Così tutto dipende solo da $\\omega_m$. A sinistra la coppia del motore che cala, a destra quella riportata che cresce: si incontrano nel regime.",
    },
    'd106.6': {
      tappa: 3,
      prima: "Ora risolvi: porta i due termini in $\\omega_m$ dalla stessa parte, raccogli $\\omega_m$ e dividi. Poi metti i numeri: $C_{mo}$ = 45 N m, $k_m$ = 0,06, $k_u$ = 0,8, τ al quadrato fa 0,25. Infine ricava la velocità del carico moltiplicando per τ.",
      dopo: "Il motore gira a circa 173 rad/s, il carico alla metà, circa 86,5 rad/s. Controllo: senza riduttore (τ = 1) il denominatore sarebbe 0,86 e il motore girerebbe molto più piano, frenato dal carico intero. Il riduttore «alleggerisce» il carico e lascia il motore più veloce.",
    },
    'd106.7': {
      tappa: 3,
      prima: "Ultimo conto: la potenza trasmessa. Calcola la coppia del motore sostituendo la velocità trovata nella sua caratteristica, poi moltiplica per $\\omega_m$. Con η = 1 la stessa potenza deve arrivare al carico: verificalo con coppia e velocità del carico.",
      dopo: "Circa 6 kW, uguale ai due alberi. Il riduttore scambia velocità con coppia: il carico gira a metà velocità ma riceve il doppio della coppia (circa 69 N m contro 34,6). Controllo di coerenza: coppia doppia per velocità metà dà la stessa potenza.",
    },
    'd107.1': {
      tappa: 4,
      prima: "Quale accelerazione vogliamo rendere massima? Al progettista interessa che si muova il carico, non il motore. Parti quindi dall'accelerazione del carico, che è τ volte quella del motore, e sostituisci l'espressione dell'equazione ridotta della d105.",
      dopo: "C'è un compromesso. Un τ piccolo riduce coppia e inerzia viste dal motore, che quindi accelera molto; ma il carico riceve solo τ volte quell'accelerazione. Un τ grande fa il contrario. Controlli: con τ = 0 il carico è scollegato e non accelera; con τ molto grande il denominatore cresce come τ² e l'accelerazione torna a zero. In mezzo c'è un massimo.",
    },
    'd107.2': {
      tappa: 4,
      prima: "Prima di procedere, verifichiamo perché non si massimizza l'accelerazione del motore, come fanno alcune fonti. Deriva $\\dot\\omega_m$ rispetto a τ con la regola del quoziente e studia il segno del numeratore nel campo in cui il motore accelera, cioè finché $\\tau C_u$ è minore di $C_m$.",
      dopo: "La derivata è sempre negativa: l'accelerazione del motore cresce sempre al diminuire di τ, e il suo «massimo» sarebbe τ = 0. Ma lì il carico non si muove affatto: il motore gira libero. Ecco perché la cosa giusta da massimizzare è l'accelerazione del carico.",
    },
    'd107.3': {
      tappa: 4,
      prima: "Ora deriviamo l'accelerazione del carico rispetto a τ. È una frazione: il numeratore $\\tau C_m - \\tau^2 C_u$ ha derivata $C_m - 2\\tau C_u$, il denominatore $I_m + \\tau^2 I_u$ ha derivata $2\\tau I_u$. Applica la regola del quoziente e sviluppa i prodotti al numeratore, cercando i termini che si cancellano.",
      dopo: "I termini in τ³ si cancellano e il numeratore diventa un polinomio di secondo grado. Il denominatore è un quadrato, sempre positivo, quindi il segno della derivata è il segno del numeratore. Controllo: a τ = 0 il numeratore vale $C_m I_m$, positivo: partendo da zero, aumentare τ fa crescere l'accelerazione del carico.",
    },
    'd107.4': {
      tappa: 4,
      prima: "Il massimo si trova dove la derivata si annulla. Il denominatore non è mai zero, quindi basta annullare il numeratore. Cambia segno a tutto per avere il termine in τ² positivo: ottieni un'equazione di secondo grado in τ. Pensa anche a come verificare che sia davvero un massimo.",
      dopo: "È una parabola rivolta verso l'alto che in τ = 0 vale $-C_m I_m$, negativa: ha quindi una radice positiva e una negativa. Prima della radice positiva la derivata dell'accelerazione è positiva, dopo è negativa: l'accelerazione sale e poi scende, quindi è un massimo.",
    },
    'd107.5': {
      tappa: 4,
      prima: "Risolvi l'equazione di secondo grado con la formula risolutiva. I coefficienti sono $a = C_m I_u$, $b = 2 C_u I_m$, $c = -C_m I_m$. Usa la formula con b/2 per semplificare il 2, e scegli il segno della radice che dà un τ positivo.",
      dopo: "È il rapporto ottimo. L'altra radice è negativa e non ha senso fisico per un riduttore. Controllo: se la coppia resistente cresce, il termine $-C_u I_m$ abbassa il risultato: con un carico che frena di più conviene un rapporto un po' più corto.",
    },
    'd107.6': {
      tappa: 4,
      prima: "Guardiamo il caso particolare più famoso: carico senza coppia resistente, per esempio un volano da portare in velocità. Poni $C_u = 0$ nella formula: sparisce il primo termine e sotto radice resta solo un prodotto. Semplifica e guarda che significato ha il risultato in termini di inerzie riportate.",
      dopo: "Il rapporto ottimo è la radice di $I_m/I_u$, cioè $\\tau^2 I_u = I_m$: l'inerzia del carico riportata al motore deve essere uguale a quella del motore. È l'«adattamento delle inerzie». Controllo: con le fonti che usano $i = 1/\\tau$ si scrive radice di $I_u/I_m$, ed è la stessa cosa.",
    },
    'd107.7': {
      tappa: 4,
      prima: "Quanto vale l'accelerazione massima in questo caso? Sostituisci $\\tau_{opt}$ nell'accelerazione del carico con $C_u = 0$. Ricorda che con il τ ottimo il denominatore diventa $I_m + I_m = 2 I_m$; poi semplifica la radice.",
      dopo: "L'accelerazione massima è la coppia del motore divisa per due volte la media geometrica delle inerzie. Il 2 al denominatore ha un senso semplice: le due inerzie riportate sono uguali e la coppia del motore si divide a metà fra le due.",
    },
  },
  racconto:
    "All'orale parto dallo schema con la trasmissione e dal legame $\\omega_u = \\tau\\omega_m$. Poi dico l'idea chiave: riporto tutto all'albero motore. Scrivo il teorema delle forze vive con le due velocità, divido per $\\omega_m$ e ottengo $(I_m + \\tau^2 I_u)\\dot\\omega_m = C_m - \\tau C_u$: la coppia si riporta con τ perché conta la potenza, l'inerzia con τ² perché conta l'energia. Con il rendimento in moto diretto scrivo il bilancio sulla potenza che attraversa la trasmissione e trovo che coppia e inerzia del carico si dividono per η. A regime $C_m = \\tau C_u/\\eta$. Se c'è tempo, aggiungo che il rapporto migliore per accelerare il carico rende $\\tau^2 I_u = I_m$.",
};

// ====================================================================================== c6-frizione
const frizione: LezioneArgomento = {
  perche:
    "In un'auto con il cambio manuale, quando parti da fermo il motore è già acceso e gira al minimo, mentre le ruote sono ferme. Non puoi collegarli di colpo: o il motore si spegne o l'auto fa un balzo. La frizione serve proprio a questo: unisce due alberi che girano a velocità diverse facendoli strisciare per un po', finché girano insieme. La domanda della lezione è: **come si muovono i due lati mentre la frizione striscia, quando smettono di strisciare, che cosa succede dopo, e quanta energia si trasforma in calore nel frattempo?**",
  idea:
    "Immagina due dischi affacciati: uno attaccato al motore, l'altro alla trasmissione verso le ruote. Una molla li preme l'uno contro l'altro. Finché girano a velocità diverse, strisciano, e l'attrito fra loro genera una coppia, $C_{fr}$, che dipende solo da quanto sono premuti: non dalla velocità.\n\nQuella coppia agisce in versi opposti sui due dischi. Sul disco del motore, che è più veloce, frena: per il motore la frizione è un **carico finto**. Sul disco condotto, che è più lento, trascina: per il lato ruote la frizione è un **motore finto**. Così il problema si spezza in due accoppiamenti separati, che sappiamo già risolvere.\n\nIl motore rallenta, il lato ruote accelera; prima o poi le due velocità si incontrano (punto Q). Da lì i dischi restano attaccati e il sistema diventa un normale accoppiamento con trasmissione. Durante lo strisciamento, invece, l'attrito ha trasformato energia in calore: per questo la frizione si scalda se «la tieni» troppo.",
  richiami: [
    { titolo: 'Attrito radente e attrito di aderenza', testo: "Se due superfici strisciano, la forza d'attrito vale $f$ volte la forza normale, con $f$ coefficiente radente, ed è opposta alla velocità relativa. Se invece non strisciano, la forza d'attrito è quella che serve all'equilibrio, e può arrivare al più a $f_{att}$ volte la normale, con $f_{att}$ un po' più grande di $f$." },
    { titolo: "Accoppiamento diretto e con trasmissione", testo: "Con motore e carico sullo stesso albero vale $I\\dot\\omega = C_m - C_u$. Con una trasmissione di rapporto τ, riportando tutto all'albero motore, vale $(I_m + \\tau^2 I_u)\\dot\\omega_m = C_m - \\tau C_u$. Nella frizione useremo entrambe le forme, una per lato." },
    { titolo: 'Transitorio con caratteristica a retta', testo: "Se la coppia netta su un albero è una retta decrescente nella velocità, l'equazione $I\\dot\\omega = A - K\\omega$ si integra separando le variabili e dà un esponenziale: la velocità si avvicina ad $A/K$ con costante di tempo $I/K$. È lo stesso conto fatto per l'avviamento del motore in corrente continua." },
    { titolo: 'Potenza dissipata per attrito', testo: "Quando due superfici strisciano, la potenza che si trasforma in calore è la forza d'attrito per la velocità relativa (o, per i dischi, la coppia d'attrito per la velocità angolare relativa). Se la velocità relativa è zero non si dissipa nulla, anche se la coppia c'è." },
    { titolo: 'Conservazione del momento della quantità di moto', testo: "Se su un sistema di corpi agiscono solo forze interne (o le esterne hanno effetto trascurabile in un tempo brevissimo), la somma dei momenti della quantità di moto, $\\sum I\\omega$, resta costante. È quello che succede in un urto: l'energia può perdersi, il momento angolare no." },
  ],
  ipotesiPerche: [
    "Mettiamo in fila gli oggetti: motore, i due dischi della frizione, riduttore, utilizzatore. La frizione è l'unico collegamento fra il lato motore e il lato utilizzatore.",
    "È la situazione della partenza da fermo: motore al minimo, senza carico, alla sua velocità a vuoto; ruote ferme. Il rilascio istantaneo fa passare la coppia della frizione da zero al suo valore di colpo, e semplifica i conti.",
    "Distinguere strisciamento e aderenza è il cuore del problema: nel primo caso la coppia è nota e costante, nel secondo è un'incognita che si ricava dall'equilibrio e deve stare sotto un limite.",
    "Linearizzare il motore attorno al punto in cui lavora permette di integrare a mano come a p. 199; il carico a coppia costante rende lineare la legge del lato condotto.",
  ],
  disegnoGuida:
    "In alto lo schema: rettangolo «Motore», albero con il disco $I_m$, poi due dischi sottili affacciati (la frizione) con le frecce F che li premono, poi il riduttore «Rid/Molt» con τ, il disco $I_u$ e l'«Utilizzatore». Segna $\\omega_m$ sul disco motore e $\\omega_c$ sul disco condotto: sono le due velocità che confronteremo. Sotto disegna il grafico velocità–tempo. Dall'asse verticale, all'altezza $\\omega_m^I$, fai partire una curva che scende dolcemente: è il motore che rallenta. Dall'origine fai partire una retta che sale: è il disco condotto che accelera. Segna il punto Q dove si incontrano e l'istante $t_Q$ sotto. Da Q in poi disegna una sola curva che sale lentamente verso la retta orizzontale tratteggiata $\\omega_{m,REG}$. Scrivi sotto l'asse «strisciamento» prima di $t_Q$ e «aderenza» dopo.",
  mappa: [
    "Capisco che coppia passa nella frizione: costante se striscia, incognita se aderisce.",
    "Lato motore: la frizione è un carico finto; trovo come rallenta il motore.",
    "Lato condotto: la frizione è un motore finto; trovo come accelera il condotto.",
    "Le due velocità si incontrano in Q; da lì il sistema è un accoppiamento con riduttore.",
    "Calcolo quanta energia è diventata calore durante lo strisciamento.",
  ],
  dims: {
    d108: {
      introduzione:
        "Vogliamo sapere come si muovono il motore e il lato condotto mentre la frizione striscia. Strategia: prima capiamo quanto vale la coppia d'attrito fra i dischi; poi guardiamo i due lati separatamente, perché l'unico legame fra loro è quella coppia. Ogni lato è un accoppiamento che sappiamo già risolvere.",
      riepilogo:
        "Mentre i dischi strisciano, la frizione trasmette una coppia costante fissata da attrito radente, forza di chiusura, raggio medio e numero di dischi. Per il motore è un carico costante: con la caratteristica linearizzata la sua velocità segue un esponenziale con costante di tempo $I_m/K_m$. Per il lato condotto è una coppia motrice costante: con il carico costante la sua velocità cresce in modo lineare dal riposo.",
    },
    d109: {
      introduzione:
        "Le due leggi trovate valgono solo finché i dischi strisciano. Vogliamo sapere quando smettono, cioè quando le velocità dei due dischi diventano uguali, e che cosa succede dopo. Strategia: eguagliare le due leggi orarie, poi riscrivere l'equazione del moto per il sistema ormai unito e controllare che resti unito.",
      riepilogo:
        "La sincronizzazione avviene nel punto Q, dove la curva del motore incontra la retta del condotto. L'equazione per $t_Q$ mescola un esponenziale e una retta: si risolve sul grafico o numericamente, tranne nel caso di coppia motrice costante. Dopo Q il sistema è un accoppiamento con riduttore, la velocità tende al regime con l'inerzia equivalente $I_m + \\tau^2 I_u$, e i dischi restano uniti finché la coppia richiesta sta sotto il limite di aderenza.",
    },
    d110: {
      introduzione:
        "Durante lo strisciamento la frizione si scalda: vogliamo calcolare quanta energia si perde. Strategia: un bilancio di energia su tutta la frizione, poi la sua forma istantanea, che mostra che la potenza persa è coppia d'attrito per velocità relativa. Infine il caso limite dell'innesto brusco, che si tratta come un urto.",
      riepilogo:
        "Il bilancio di energia dice che il lavoro perso è l'energia cinetica persa più il lavoro del motore meno quello del carico. Istante per istante, la potenza persa è la coppia d'attrito per la velocità relativa: l'energia dissipata è quindi coppia per l'area fra le due curve delle velocità. Nell'innesto impulsivo si conserva il momento angolare e la perdita dipende solo dalle inerzie e dalla differenza di velocità iniziale, come in un urto anelastico.",
    },
  },
  passi: {
    'd108.1': {
      tappa: 0,
      prima: "Quanto vale la coppia che passa fra i dischi mentre strisciano? Ragiona come per un blocco che striscia: la forza d'attrito è il coefficiente per la forza normale. Qui la forza normale è la forza di chiusura della molla; per avere una coppia moltiplichi per un raggio rappresentativo della corona. E se le superfici a contatto sono più d'una?",
      dopo: "La coppia è coefficiente radente per forza di chiusura per raggio medio per numero di superfici. Si usa f radente perché i dischi strisciano; la dispensa scrive $f_{att}$, ma poco dopo precisa lei stessa che in strisciamento vale f. Non dipende dalla velocità: finché la molla preme uguale, la coppia è costante.",
    },
    'd108.2': {
      tappa: 0,
      prima: "E quando i dischi girano insieme, senza strisciare? Pensa a un libro appoggiato su un tavolo inclinato che non scivola: l'attrito non vale «coefficiente per normale», vale quello che serve a tenerlo fermo. Che cosa succede allora alla coppia nella frizione? Quale limite non può superare?",
      dopo: "In aderenza la coppia non è più fissata dall'attrito ma da ciò che chiede il resto del sistema; può arrivare al massimo al limite di aderenza. Se il sistema chiedesse di più, i dischi ricomincerebbero a strisciare. Questa riga servirà alla fine della d109 per verificare l'aderenza.",
    },
    'd108.3': {
      tappa: 1,
      prima: "Guardiamo solo il lato motore. Il disco motore gira più veloce del condotto: in che verso agisce su di lui l'attrito? Chiediti poi che ruolo ha la frizione per il motore: spinge con lui o contro di lui? Scrivi l'equazione di un accoppiamento diretto in cui l'unica inerzia è quella del motore.",
      dopo: "L'attrito frena il disco motore, quindi la frizione è per il motore un **carico fittizio** a coppia costante $C_{fr}$. L'equazione è quella dell'accoppiamento diretto con la sola inerzia del motore, perché il resto del sistema non gira con lui. Controllo: se $C_{fr}$ supera la coppia del motore, ω̇ è negativa e il motore rallenta, come si sente in auto.",
    },
    'd108.4': {
      tappa: 1,
      prima: "La caratteristica di un motore a combustione è una curva complicata. Per integrare a mano la sostituiamo con una retta, come abbiamo fatto per la stabilità. Attorno a quale punto conviene linearizzare? Scegli il punto P dove la curva del motore incontra la retta orizzontale della coppia della frizione.",
      dopo: "Vicino a P la coppia del motore è una retta che scende con pendenza $K_m$, preso in modulo. Attenzione: $C_{m,0}$ qui è l'intercetta della retta tangente sull'asse delle coppie, non la coppia vera del motore a velocità zero. È solo un modo comodo per scrivere la retta.",
    },
    'd108.5': {
      tappa: 1,
      prima: "Ora sostituisci la retta nell'equazione del lato motore: hai $I_m\\dot\\omega_m$ uguale a una costante meno $K_m\\omega_m$. È lo stesso tipo di equazione dell'avviamento di p. 199. Separa le variabili e integra, ma con un estremo diverso: a t = 0 il motore non è fermo, gira a $\\omega_m^I$.",
      dopo: "La velocità del motore è un esponenziale che parte da $\\omega_m^I$ e va verso un valore asintotico, con costante di tempo $I_m/K_m$. Controllo: a t = 0 l'esponenziale vale 1 e la parentesi si riduce a $K_m\\omega_m^I$, quindi si ritrova $\\omega_m^I$. Compare solo $I_m$, perché il motore accelera soltanto se stesso.",
    },
    'd108.6': {
      tappa: 1,
      prima: "Dove andrebbe il motore se aspettassimo moltissimo? Manda t all'infinito nella legge appena scritta: che fine fa l'esponenziale con esponente negativo? Poi chiediti se quel valore verrà mai raggiunto davvero, sapendo che intanto il disco condotto sta accelerando.",
      dopo: "Il motore tenderebbe alla velocità dove la sua coppia linearizzata eguaglia $C_{fr}$, cioè l'ascissa del punto P. Ma è solo un valore «se i dischi strisciassero per sempre». In realtà prima arriva la sincronizzazione con il condotto e questa legge smette di valere.",
    },
    'd108.7': {
      tappa: 2,
      prima: "Passiamo al lato condotto. Qui l'attrito agisce in verso opposto: il disco condotto è più lento e viene trascinato. Per questo lato la frizione è quindi un motore finto con coppia $C_{fr}$. Dietro c'è un riduttore: usa l'equazione dell'accoppiamento con trasmissione, con inerzia «del motore» nulla, perché il disco condotto ha inerzia trascurabile.",
      dopo: "La coppia della frizione, meno la coppia del carico riportata (τ C_u), accelera l'inerzia del carico riportata (τ² I_u). È l'equazione della trasmissione con $C_m \\to C_{fr}$ e $I_m \\to 0$. Controllo: senza riduttore (τ = 1) diventa $I_u\\dot\\omega_u = C_{fr} - C_u$, la forma più semplice che si trova in altre fonti.",
    },
    'd108.8': {
      tappa: 2,
      prima: "Con il carico a coppia costante, tutto il secondo membro dell'equazione del lato condotto è costante. Che legge segue una velocità con accelerazione costante? Integra partendo dal riposo, perché all'istante del contatto le ruote sono ferme.",
      dopo: "La velocità del disco condotto cresce in linea retta dall'origine: accelerazione costante. Controllo: il carico parte solo se $C_{fr}$ supera la coppia del carico riportata, $\\tau C_{u,0}$; altrimenti la pendenza sarebbe negativa, cosa impossibile da fermo. Sul grafico è la retta che sale dall'origine.",
    },
    'd109.1': {
      tappa: 3,
      prima: "Sul grafico abbiamo una curva che scende (motore) e una retta che sale (condotto). Lo strisciamento finisce quando non c'è più velocità relativa fra i dischi. Dai un nome alla differenza fra le due velocità e scrivi la condizione che definisce l'istante della sincronizzazione.",
      dopo: "Q è il punto dove le due curve si incontrano: la velocità relativa è zero e i dischi sono «finalmente in aderenza». Prima di Q la velocità relativa è positiva, il disco motore è più veloce. Attenzione: si confrontano le velocità dei due dischi della frizione, non quella del carico a valle del riduttore.",
    },
    'd109.2': {
      tappa: 3,
      prima: "Per trovare $t_Q$ basta eguagliare le due leggi orarie della d108: l'esponenziale del motore e la retta del condotto, entrambe calcolate in $t_Q$. Prima di provare a risolverla, chiediti: si riesce a isolare $t_Q$ quando compare sia dentro un esponenziale sia moltiplicato per una costante?",
      dopo: "Non si riesce: è un'equazione trascendente, esponenziale contro retta, senza formula chiusa. Si risolve sul grafico, come fa la dispensa, o con un metodo numerico. La soluzione esiste ed è unica: la differenza fra le velocità parte positiva e cala sempre, perché la retta del condotto cresce senza limite.",
    },
    'd109.3': {
      tappa: 3,
      prima: "C'è un caso in cui si trova una formula: se anche la coppia del motore è costante ($K_m = 0$). Allora anche il motore ha accelerazione costante e la sua velocità cala in linea retta. Scrivi le due rette, eguagliale e risolvi in $t_Q$: viene un'equazione di primo grado.",
      dopo: "$t_Q$ è la velocità relativa iniziale divisa per la rapidità con cui si riduce, cioè la somma della decelerazione del motore e dell'accelerazione del condotto. Controllo: se si stringe di più la frizione ($C_{fr}$ più grande) entrambi i termini al denominatore crescono e lo strisciamento dura meno.",
    },
    'd109.4': {
      tappa: 3,
      prima: "Dopo Q i dischi girano insieme. Le equazioni dei due lati separati non valgono più: che sistema abbiamo ora? Un motore che, attraverso un riduttore, trascina il carico. Scrivi l'equazione del moto dell'accoppiamento con trasmissione e sostituisci la caratteristica linearizzata del motore.",
      dopo: "È la stessa equazione della d105: coppia del motore meno coppia del carico riportata, divisa per l'inerzia equivalente. La frizione non compare più, perché ora è un collegamento rigido. Il motore deve accelerare la propria inerzia e quella del carico riportata.",
    },
    'd109.5': {
      tappa: 3,
      prima: "Integriamo questa equazione come quella di p. 199. L'unica differenza è il punto di partenza: il tempo parte da $t_Q$, non da zero, e la velocità iniziale è $\\omega_Q$. Separa le variabili, integra da $(t_Q, \\omega_Q)$ al generico $(t, \\omega_m)$ ed esplicita la velocità.",
      dopo: "La velocità segue un nuovo esponenziale, che parte da $\\omega_Q$ in $t_Q$, con costante di tempo $I_{eq}/K_m$ e $I_{eq} = I_m + \\tau^2 I_u$. Controllo: per $t = t_Q$ l'esponenziale vale 1 e si ritrova $\\omega_Q$. Nell'esponente c'è $t - t_Q$, perché l'orologio di questa fase parte da Q.",
    },
    'd109.6': {
      tappa: 3,
      prima: "Dove arriva il sistema unito? Come sempre, manda il tempo all'infinito: l'esponenziale si spegne. Quello che resta è la velocità dove la coppia del motore eguaglia la coppia del carico riportata. Confronta con la condizione di regime della trasmissione.",
      dopo: "È la velocità di regime del sistema accoppiato, quella della linea tratteggiata in alto nel grafico di p. 206. Non dipende più dalla frizione: conta solo il carico riportato. Controllo: è più alta di $\\omega_Q$ se, dopo l'innesto, il motore ha coppia in eccesso.",
    },
    'd109.7': {
      tappa: 3,
      prima: "Abbiamo supposto che dopo Q i dischi restino attaccati. Va verificato. In aderenza la coppia nella frizione è un'incognita: ricavala dall'equazione del solo lato motore (coppia del motore meno quella che serve ad accelerare il suo disco). Poi confrontala con il limite di aderenza della d108.",
      dopo: "La coppia in aderenza è quella che serve all'equilibrio: si ricava dal lato motore oppure, con lo stesso valore, dal lato carico. Di solito è minore della coppia di strisciamento. Se superasse il limite di aderenza, i dischi tornerebbero a slittare e l'ipotesi andrebbe rivista.",
    },
    'd110.1': {
      tappa: 4,
      prima: "Per contare l'energia persa facciamo un bilancio su tutta la frizione, con la notazione del libro: elemento 1 sul lato motore, elemento 2 sul lato condotto. In un piccolo intervallo, che lavori entrano ed escono? Il motore fa lavoro, il carico ne assorbe, l'attrito ne trasforma una parte in calore: il resto cambia l'energia cinetica.",
      dopo: "Lavoro del motore meno lavoro del carico meno lavoro perso per attrito uguale alla variazione di energia cinetica dei due elementi. È il teorema dell'energia cinetica con in più la voce «perdite». Il segno meno davanti a $dL_f$ dice che l'attrito toglie energia al sistema.",
    },
    'd110.2': {
      tappa: 4,
      prima: "Vogliamo l'energia persa su tutto l'innesto. Isola $dL_f$ e integra dall'inizio (velocità $\\omega_{10}$ e $\\omega_{20}$) alla fine, quando entrambi girano a $\\omega_f$. Gli angoli piccoli si scrivono come velocità per dt. Attenzione: qui τ indica la durata dell'innesto, non il rapporto di trasmissione.",
      dopo: "L'energia persa ha tre pezzi: l'energia cinetica persa fra inizio e fine, più il lavoro fatto dal motore, meno quello assorbito dal carico durante l'innesto. È la (5.82) del libro. Controllo: se non ci fossero motore né carico, resterebbe solo l'energia cinetica persa.",
    },
    'd110.3': {
      tappa: 4,
      prima: "Cerchiamo una forma più intuitiva, istante per istante. Scrivi le due equazioni del moto dei dischi: per il primo la coppia motrice meno quella d'attrito, per il secondo quella d'attrito meno la resistente. Moltiplica ciascuna per la sua velocità e sommale: a destra compare la derivata dell'energia cinetica.",
      dopo: "La potenza persa è coppia d'attrito per **velocità relativa** dei dischi. Il motore cede alla frizione $C_f\\omega_1$; il condotto ne riceve $C_f\\omega_2$; la differenza diventa calore. Controllo: quando le velocità coincidono la potenza persa è zero, anche se la coppia c'è.",
    },
    'd110.4': {
      tappa: 4,
      prima: "Integriamo la potenza persa nel tempo, dall'inizio all'istante $t^*$ in cui le velocità si eguagliano. Con coppie costanti entrambe le velocità cambiano in linea retta, quindi la loro differenza cala in linea retta fino a zero. Che figura è, sul grafico, l'area sotto una retta che va da un valore a zero?",
      dopo: "È un triangolo: base $t^*$, altezza la velocità relativa iniziale, area metà del prodotto. L'energia persa è la coppia d'attrito per quell'area. In generale, con curve qualsiasi, vale lo stesso principio: energia persa uguale a coppia per l'area fra le due curve delle velocità.",
    },
    'd110.5': {
      tappa: 4,
      prima: "Ora il caso limite: un innesto brusco, così breve che motore e carico non fanno in tempo a fare lavoro. È come un urto fra i due dischi. La coppia d'attrito è interna al sistema dei due dischi: che grandezza si conserva allora? Scrivila prima e dopo l'innesto.",
      dopo: "Si conserva il momento della quantità di moto totale: prima ciascun disco ha il suo, dopo girano insieme con la somma delle inerzie. È la stessa legge degli urti, scritta per le rotazioni. L'energia invece non si conserva, perché l'attrito ne trasforma una parte in calore.",
    },
    'd110.6': {
      tappa: 4,
      prima: "Dalla conservazione del momento angolare ricava la velocità comune finale: dividi entrambi i membri per la somma delle inerzie. Prima di guardare la riga, chiediti: la velocità finale sarà più vicina a quella del disco con più inerzia o di quello con meno?",
      dopo: "La velocità finale è la media delle velocità iniziali, pesata con le inerzie: vince il disco più «pesante». Controlli: con inerzie uguali è la media semplice; con il condotto fermo diventa $I_1\\omega_{10}/(I_1 + I_2)$. Non dipende da quanto si stringe la frizione.",
    },
    'd110.7': {
      tappa: 4,
      prima: "Nel caso impulsivo nella (5.82) restano solo i termini di energia cinetica. Sostituisci la velocità finale appena trovata e semplifica: porta tutto allo stesso denominatore $I_1 + I_2$ e cerca di riconoscere il quadrato di una differenza.",
      dopo: "L'energia persa è il prodotto delle inerzie diviso due volte la loro somma, per il quadrato della differenza di velocità iniziale. È l'energia persa in un urto anelastico. Controlli: se le velocità iniziali sono uguali non si perde nulla; la perdita non dipende dalla coppia d'attrito, solo da inerzie e velocità.",
    },
    'd110.8': {
      tappa: 4,
      prima: "Torniamo al modello della dispensa, con motore linearizzato e riduttore. Applica la regola trovata: potenza persa uguale a coppia della frizione per velocità relativa dei dischi, integrata fino alla sincronizzazione. Chiediti quale velocità usare per il lato condotto: quella del disco o quella del carico dopo il riduttore?",
      dopo: "Si usa la velocità del disco condotto, $\\omega_c$, perché la velocità relativa è fra i due dischi della frizione; la velocità del carico va divisa per τ. L'energia è $C_{fr}$ per l'area fra la curva del motore e la retta del condotto fino a Q, e ha forma chiusa perché sono un esponenziale e una retta.",
    },
  },
  racconto:
    "All'orale parto dall'auto che parte da ferma: motore al minimo, ruote ferme, la frizione li unisce strisciando. In strisciamento la coppia è $C_{fr} = f F_N r_m m$, costante; per il motore è un carico finto, per il lato condotto un motore finto, e il problema si spezza in due. Il motore rallenta con un esponenziale di costante di tempo $I_m/K_m$; il condotto accelera in modo lineare. Le due curve si incontrano in Q, che si trova sul grafico perché l'equazione è trascendente. Dopo Q c'è aderenza: accoppiamento con riduttore, velocità che tende a $(C_{m,0} - \\tau C_u)/K_m$, con coppia nella frizione sotto il limite di aderenza. Chiudo con il calore: potenza persa uguale a coppia per velocità relativa, energia uguale a coppia per area fra le curve.",
};

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c6-diretto': diretto,
  'c6-trasmissione': trasmissione,
  'c6-frizione': frizione,
};
