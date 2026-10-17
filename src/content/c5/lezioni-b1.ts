/** Lezioni discorsive C5 parte b: rendimento dell'ingranaggio e rendimento dell'epicicloidale (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

export const rendimentoOrdinario: LezioneArgomento = {
  perche:
    "Un motore elettrico gira veloce ma ha poca coppia; un argano, una betoniera, la ruota di un'auto vogliono il contrario: lenti e con tanta coppia. In mezzo si mette un riduttore, cioè una o più coppie di ruote dentate. Ma i denti strisciano un po' fra loro e scaldano: una parte della potenza si perde. Le domande della lezione sono tre. **Con l'attrito, come cambiano le coppie fra entrata e uscita?** Perché una vite senza fine (pensa alle chiavette che tendono le corde della chitarra) muove la ruota, ma la ruota non riesce a muovere la vite? E se metto tre ingranaggi in fila, quanto rende il tutto?",
  idea:
    "Pensa alla potenza come a un flusso d'acqua in un tubo che perde. Il motore pompa dentro una certa portata, l'utilizzatore ne riceve una parte, il resto gocciola via dalle perdite (l'attrito fra i denti). Il rendimento η è semplicemente la frazione che arriva in fondo: 0,98 vuol dire che arriva il 98 %.\n\nDue conseguenze importanti. Primo: la frazione si applica sempre alla potenza di **chi spinge**, cioè della ruota movente. Se inverti il flusso, e la ruota che prima subiva ora spinge, il rendimento va ricalcolato su di lei: è un altro numero. Se le perdite sono così grandi che il rendimento in quel verso diventerebbe negativo, quel verso di moto semplicemente non può avvenire: è l'irreversibilità. Secondo: se metti più tubi che perdono in fila, ciascuno passa al successivo solo la sua frazione di ciò che riceve. Le frazioni si moltiplicano.",
  richiami: [
    { titolo: "Potenza di una coppia", testo: "Una coppia $C$ applicata a un albero che gira con velocità angolare $\\omega$ fa potenza $W = C\\omega$. Il segno conta: se coppia e velocità hanno lo stesso verso la coppia spinge e la potenza è positiva (motrice); se sono opposte la coppia frena e la potenza è negativa (resistente). È l'analogo di forza per velocità." },
    { titolo: "Rapporto di trasmissione", testo: "Per un ingranaggio $\\tau = \\omega_2/\\omega_1$, cioè velocità di uscita diviso velocità di entrata. Per due ruote cilindriche esterne le ruote girano in versi opposti, quindi $\\tau < 0$; il modulo vale $z_1/z_2$. Se $|\\tau| < 1$ l'uscita è più lenta: è un riduttore di giri." },
    { titolo: "Bilancio delle potenze senza perdite", testo: "A regime (velocità costanti, nessuna energia cinetica che cambia) e senza attrito, la somma delle potenze delle coppie esterne è zero: $C_1\\omega_1 + C_2\\omega_2 = 0$. Tutto quello che entra esce. Da qui il caso ideale $C_1/C_2 = -\\tau$." },
    { titolo: "Azione e reazione su un albero", testo: "Se due pezzi sono collegati dallo stesso albero rigido, la coppia che il primo esercita sull'albero è uguale e opposta a quella che riceve il secondo, e la velocità è la stessa. Quindi la potenza che esce dal primo è esattamente quella che entra nel secondo." },
  ],
  ipotesiPerche: [
    "Prima di scrivere un bilancio devo sapere chi c'è: un motore che dà potenza, un utilizzatore che la prende e in mezzo l'ingranaggio, oppure più stadi in fila.",
    "A regime l'energia cinetica non cambia, quindi nel bilancio non compaiono termini d'inerzia. Il segno di τ serve per le cilindriche; nelle coniche gli assi non sono paralleli e si lavora in modulo.",
    "Con i segni il bilancio si scrive come una somma che fa zero, senza dover ricordare chi va a destra e chi a sinistra: il motore dà (positivo), utilizzatore e attrito prendono (negativi).",
    "Le perdite sono una frazione della potenza che entra, e la potenza entra da chi muove: se cambia chi muove, cambia la base su cui si calcola la frazione, quindi cambia il rendimento.",
  ],
  disegnoGuida:
    "Per il singolo ingranaggio disegna due cerchi tangenti, la ruota 1 a sinistra e la 2 a destra. Su ciascuna segna la coppia e la velocità con frecce curve: $C_1$ e $\\omega_1$ concordi sulla 1 (la movente spinge), $C_2$ opposta a $\\omega_2$ sulla 2 (la cedente frena). Aggiungi una freccia dritta che va da 1 a 2: è il verso del flusso di potenza, quello che decide quale rendimento usare. Per la cascata disegna in fila dei blocchi: motore M, stadi I₁, I₂, I₃, utilizzatore U, collegati da alberi. Su ogni albero scrivi la potenza che passa ($C_m\\omega_m$, poi $C'\\omega'$, …) e sotto ogni stadio una freccia verso il basso con la potenza dissipata. Infine racchiudi ogni stadio in un riquadro: sono i sottosistemi S₁, S₂, S₃.",
  mappa: [
    "Scrivo il bilancio delle potenze con l'attrito e definisco il rendimento.",
    "Dal rendimento ricavo il rapporto fra le coppie e la potenza persa.",
    "Cascata: stadio per stadio, con azione e reazione sugli alberi, i rendimenti si moltiplicano.",
    "Leggo il risultato: un riduttore di giri moltiplica la coppia.",
    "Inverto il flusso: nuovo rendimento, fascia di quiete, irreversibilità.",
    "Applico tutto a un motore che muove un carico attraverso una trasmissione.",
  ],
  dims: {
    d092: {
      introduzione:
        "Vogliamo capire che cosa cambia rispetto all'ingranaggio ideale quando c'è attrito. La strategia è aggiungere al bilancio delle potenze un termine per le perdite, definire il rendimento come la frazione di potenza che arriva all'utilizzatore e trasformare questa definizione in una relazione fra le coppie. Poi applichiamo lo stesso bilancio a una fila di ingranaggi, uno alla volta, cucendoli con gli alberi che li collegano.",
      riepilogo:
        "Siamo partiti dal bilancio con le perdite e dalla definizione di rendimento con le potenze con segno. Riscrivendo la definizione come bilancio abbiamo visto che il rendimento finisce al denominatore del rapporto fra le coppie e che si perde la frazione $1-\\eta_1$ della potenza motrice. Per la cascata abbiamo isolato uno stadio alla volta: ciò che esce da uno stadio entra nel successivo per azione e reazione, e ogni stadio passa avanti la sua frazione. Così il rendimento totale è il prodotto, sempre peggiore dello stadio peggiore.",
    },
    d140: {
      introduzione:
        "Ora usiamo il bilancio con il rendimento per rispondere a domande pratiche. Quanta coppia esce da un riduttore? Che cosa succede se il flusso di potenza si inverte, cioè se è il carico a trascinare il motore? Un ingranaggio fermo con due coppie applicate parte o resta fermo? La strategia è scrivere il bilancio due volte, una per ciascun verso del flusso, e confrontare le due soglie.",
      riepilogo:
        "Con la ruota 1 movente la coppia d'uscita è quella d'entrata divisa per $|\\tau|$ e ridotta dal rendimento: dove la velocità cala, la coppia cresce. Con la ruota 2 movente il rendimento si applica alla sua potenza e compare $\\eta_2$, non $1/\\eta_1$. Le due soglie delimitano una fascia in cui l'attrito tiene fermo l'ingranaggio; se $\\eta_2 \\le 0$ il moto retrogrado è impossibile, come nella vite senza fine. Infine lo stesso bilancio dice quale coppia vede il motore attraverso la trasmissione.",
    },
  },
  passi: {
    "d092.1": {
      tappa: 0,
      prima: "Partiamo dal bilancio delle potenze che conosci per il caso ideale: a regime la somma delle potenze è zero. Con l'attrito c'è un terzo attore, la potenza che si trasforma in calore. Chiediti: che segno ha ciascun termine? Il motore dà potenza al sistema, l'utilizzatore e l'attrito la tolgono. Con la convenzione dei segni, chi dà è positivo e chi toglie è negativo.",
      dopo: "La riga dice: la potenza del motore si divide fra quella che arriva all'utilizzatore e quella che si perde. Controllo di buon senso: se non ci fosse attrito, $W_{diss} = 0$ e torneresti al caso ideale, in cui tutto ciò che entra esce. Il segno negativo di $W_{diss}$ ricorda che l'attrito toglie sempre, non dà mai.",
    },
    "d092.2": {
      tappa: 0,
      prima: "Il rendimento deve essere la frazione di potenza che arriva all'utilizzatore: utile diviso motrice. Ma $W_u$ è negativa e $W_m$ positiva, quindi il rapporto verrebbe negativo. Come rimediare? Con un segno meno davanti. Poi esprimi le potenze con coppie e velocità della ruota 1 (movente) e della ruota 2 (cedente), e riconosci nel rapporto delle velocità il τ.",
      dopo: "Il rendimento è un numero fra 0 e 1, grazie al meno. La seconda forma lo lega alle coppie: $\\eta_1 = -(C_2/C_1)\\tau$. Il pedice 1 ricorda che è la ruota 1 a muovere. Controllo: con η = 1 ritrovi il caso ideale $C_1/C_2 = -\\tau$.",
    },
    "d092.3": {
      tappa: 1,
      prima: "La definizione è comoda per misurare, ma per calcolare conviene scriverla come un bilancio. Moltiplica entrambi i membri per $C_1\\omega_1$ e porta tutto a sinistra: ottieni che la frazione $\\eta_1$ della potenza motrice, sommata alla potenza dell'utilizzatore, fa zero. Poi dividi per $C_2\\omega_1$ e risolvi per il rapporto delle coppie, usando ancora $\\omega_2/\\omega_1 = \\tau$.",
      dopo: "Rispetto al caso ideale il rendimento compare al denominatore: per avere la stessa coppia d'uscita serve un po' più di coppia d'entrata. Controllo dei segni: per le cilindriche esterne $\\tau < 0$, quindi $C_1/C_2 > 0$. Le due coppie hanno lo stesso segno mentre le velocità sono opposte: una spinge e l'altra frena, come deve essere.",
    },
    "d092.4": {
      tappa: 1,
      prima: "Quanta potenza si perde? Torna al bilancio della prima riga e sostituisci al posto di $C_2\\omega_2$ quello che hai appena ricavato, cioè $-\\eta_1 C_1\\omega_1$. Resta un'equazione con una sola incognita, $W_{diss}$: raccogli $C_1\\omega_1$ e isolala.",
      dopo: "Si perde la frazione $1 - \\eta_1$ della potenza motrice. Con $\\eta_1 = 0{,}98$ si perde il 2 %. Controllo dei segni: $C_1\\omega_1 > 0$ e $1-\\eta_1 > 0$, quindi $W_{diss} < 0$, come deve essere per una perdita. Con $\\eta_1 = 1$ la perdita è zero.",
    },
    "d092.5": {
      tappa: 1,
      prima: "Nelle ruote coniche gli assi si incontrano e non sono paralleli: dire che due velocità hanno lo stesso segno o segno opposto non ha più senso, perché non stanno sulla stessa retta. Che cosa fai allora? Ripeti la definizione di rendimento usando solo i moduli, potenza utile su potenza motrice, e il τ in modulo.",
      dopo: "Il risultato è identico nella forma, ma senza segni: il modulo del rapporto delle coppie è τ diviso il rendimento. Il contenuto fisico non cambia: serve un po' più di coppia in entrata di quella ideale, perché una parte della potenza si perde.",
    },
    "d092.6": {
      tappa: 2,
      prima: "Passiamo alla cascata: tre ingranaggi in fila fra motore e utilizzatore (figura di p. 184). Il trucco è non guardarli tutti insieme, ma uno alla volta. Isola il primo ingranaggio: da una parte ha il motore vero, dall'altra un albero intermedio che, per lui, si comporta come un utilizzatore. Che bilancio puoi scrivere per questo sottosistema S₁? Quello del singolo ingranaggio.",
      dopo: "La riga è il bilancio del primo stadio: la frazione $\\eta^I$ della potenza del motore arriva all'albero intermedio, che qui fa da utilizzatore equivalente. È esattamente la riga $\\eta_1 C_1\\omega_1 + C_2\\omega_2 = 0$, con nomi nuovi. Gli apici (′) indicano le grandezze del primo albero intermedio.",
    },
    "d092.7": {
      tappa: 2,
      prima: "Ora serve il collegamento fra il primo e il secondo stadio. Sull'albero intermedio il primo ingranaggio esercita una coppia, il secondo ne esercita una sul primo. Che legame c'è fra le due? Pensa al principio di azione e reazione, e al fatto che l'albero è rigido: le due estremità girano alla stessa velocità.",
      dopo: "La potenza che il secondo stadio riceve come motore è esattamente quella che il primo cede come utilizzatore, con il segno cambiato. Lo stesso albero è utilizzatore per S₁ e motore per S₂: l'albero non perde nulla, le perdite stanno solo nei denti.",
    },
    "d092.8": {
      tappa: 2,
      prima: "Mettiamo in fila. Dal bilancio di S₁ sai che $\\eta^I C_m\\omega_m$ è uguale a $-C_u'\\omega_u'$, che per azione e reazione è $C_m'\\omega_m'$. Ora scrivi il bilancio di S₂, che ha rendimento $\\eta^{II}$, e ricava $C_m'\\omega_m'$. Poi applica di nuovo azione e reazione al secondo albero intermedio.",
      dopo: "La riga dice che al secondo albero intermedio arriva la frazione $\\eta^I\\eta^{II}$ della potenza del motore. Ogni stadio prende ciò che riceve e lo moltiplica per il suo rendimento. Controllo: se il secondo stadio fosse perfetto ($\\eta^{II} = 1$), arriverebbe la stessa potenza di prima.",
    },
    "d092.9": {
      tappa: 2,
      prima: "Manca l'ultimo stadio, S₃, che porta la potenza all'utilizzatore vero. Scrivi il suo bilancio con rendimento $\\eta^{III}$ e sostituisci al posto della sua potenza motrice $C_m''\\omega_m''$ l'espressione appena trovata, $\\eta^I\\eta^{II}C_m\\omega_m$.",
      dopo: "Tutta la cascata si comporta come un unico ingranaggio fra motore e utilizzatore, con un rendimento che è il prodotto dei tre. Le grandezze intermedie sono sparite: è ciò che volevamo. La forma è identica al bilancio del singolo ingranaggio.",
    },
    "d092.10": {
      tappa: 2,
      prima: "Per chiudere basta leggere la riga precedente con la definizione di rendimento applicata all'intero rotismo: potenza dell'utilizzatore su potenza del motore, con il meno. Che cosa resta? Prova anche un numero: tre stadi buoni, ciascuno da 0,98.",
      dopo: "Il rendimento totale è il prodotto dei rendimenti. Con tre stadi da 0,98 si ha circa 0,941: si perde il 6 %, il triplo di uno stadio. Controllo di buon senso: un prodotto di numeri minori di 1 è più piccolo di ciascun fattore, quindi la cascata rende sempre meno dello stadio peggiore. Le perdite non si sommano, si accumulano in proporzione.",
    },
    "d140.1": {
      tappa: 1,
      prima: "Riprendiamo il punto di arrivo della dimostrazione sul rendimento: il bilancio con la ruota 1 movente. Ricorda come si legge: all'uscita arriva la frazione $\\eta_1$ della potenza del motore. Scrivilo insieme alla definizione di τ come velocità d'uscita su velocità d'entrata, perché sono le due cose che useremo.",
      dopo: "È il «RICORDA» della dispensa: una sola riga che contiene tutto il comportamento dell'ingranaggio in moto diretto. Il primo termine è positivo (la potenza utile del motore, già ridotta), il secondo negativo (quella dell'utilizzatore): la somma fa zero.",
    },
    "d140.2": {
      tappa: 3,
      prima: "Vogliamo sapere quanta coppia esce. Dal bilancio si ricava il rapporto delle coppie, come nella dimostrazione precedente. Poi passa ai moduli, perché ci interessa la grandezza della coppia d'uscita: isola $|C_2|$ portando $|\\tau|$ e $\\eta_1$ dalla parte giusta.",
      dopo: "La coppia d'uscita è la coppia d'entrata divisa per $|\\tau|$, poi ridotta dal rendimento. Esempio: riduttore con $|\\tau| = 1/5$ e η = 0,98: la coppia cresce di 5 × 0,98 = 4,9 volte. Controllo: la potenza d'uscita, coppia per velocità, è 4,9 × 1/5 = 0,98 di quella d'entrata.",
    },
    "d140.3": {
      tappa: 3,
      prima: "Leggiamo la riga precedente come un dispositivo. Il rapporto fra la coppia d'uscita e quella d'entrata è $\\eta_1/|\\tau|$. Chiediti: se l'uscita è più lenta dell'entrata, cioè $|\\tau| < 1$, la coppia d'uscita è più grande o più piccola? E se l'uscita è più veloce?",
      dopo: "Dove la velocità cala, la coppia cresce: un riduttore di giri è un moltiplicatore di coppia, e viceversa. Il «riduttore di coppia» di cui parlano alcune domande è quindi un moltiplicatore di giri. La dispensa aggiunge che si rende meglio con la ruota veloce che muove la lenta (moto diretto) che al contrario.",
    },
    "d140.4": {
      tappa: 4,
      prima: "Ora invertiamo il flusso: è la ruota 2 a spingere e la 1 a frenare. Pensa a un'auto in discesa che trascina il motore. Il rendimento si applica sempre alla potenza di chi muove: quindi la frazione $\\eta_2$ va messa davanti a $C_2\\omega_2$, non davanti a $C_1\\omega_1$. Scrivi il bilancio così e risolvi per $C_1/C_2$.",
      dopo: "Ora il rendimento moltiplica τ invece di dividerlo. Attenzione al tranello: non basta prendere la formula del moto diretto e mettere $1/\\eta_1$, perché $\\eta_2$ è un altro numero. Per τ vicino a 1 i due rendimenti sono quasi uguali, ma per riduzioni forti sono diversi.",
    },
    "d140.5": {
      tappa: 4,
      prima: "Un ingranaggio fermo, con due coppie applicate. Parte o no? Per farlo partire con la 1 che muove serve un rapporto delle coppie (in modulo) almeno pari a $\\tau/\\eta_1$. Per farlo partire nell'altro verso, con la 2 che muove, il rapporto deve scendere fino a $\\tau\\eta_2$. Chiediti: che cosa succede per valori in mezzo?",
      dopo: "Fra le due soglie l'attrito riesce a equilibrare le coppie e l'ingranaggio resta fermo, come un mobile pesante che non si sposta finché non spingi abbastanza. Controllo: senza attrito ($\\eta_1 = \\eta_2 = 1$) le due soglie coincidono con τ e la fascia sparisce: basta un niente per muoverlo.",
    },
    "d140.6": {
      tappa: 4,
      prima: "E se le perdite nel moto retrogrado sono enormi? Il rendimento $\\eta_2$ può scendere fino a zero o sotto. Chiediti che cosa vorrebbe dire un rendimento negativo: con le potenze con segno, significa che anche il lato che dovrebbe ricevere potenza dovrebbe darne per coprire le perdite.",
      dopo: "Se $\\eta_2 \\le 0$ il moto retrogrado non può avvenire: il moto è irreversibile. È la vite senza fine con la ruota elicoidale, con τ molto piccolo: la vite muove la ruota, la ruota non muove la vite. È utile per i paranchi e le chiavette della chitarra, che restano dove le lasci. Attenzione: a p. 183 la dispensa scrive «> 0» per sbaglio, ma il rendimento qui è negativo.",
    },
    "d140.7": {
      tappa: 5,
      prima: "Ultimo uso pratico: un motore che muove un carico attraverso una trasmissione (cap. 6). A regime e senza perdite, la potenza del motore è uguale a quella che il carico assorbe. Scrivi questo bilancio con $C_u$ come modulo della coppia resistente e dividi per $\\omega_m$, ricordando che $\\omega_u/\\omega_m = \\tau$.",
      dopo: "Il motore «vede» la coppia del carico moltiplicata per τ: è la coppia ridotta all'asse del motore. Con un riduttore ($\\tau < 1$) il motore deve vincere una coppia più piccola di quella del carico. È il motivo per cui si mette il riduttore: un motore piccolo e veloce muove un carico pesante e lento.",
    },
    "d140.8": {
      tappa: 5,
      prima: "Rimettiamo le perdite. In moto diretto il rendimento si applica alla potenza che entra nella trasmissione, cioè a quella del motore. Quindi la potenza che arriva al carico è $\\eta$ volte quella del motore. Scrivi l'uguaglianza fra queste due potenze e ricava $C_u$, dividendo per $\\omega_u$.",
      dopo: "La coppia disponibile sul carico è quella del motore divisa per τ e ridotta da η: la stessa legge di prima, scritta con i nomi motore e utilizzatore. Se trovi il rapporto scritto come $i = 1/\\tau$, la formula diventa $C_{out} = \\eta\\,i\\,C_{in}$: è la stessa cosa.",
    },
  },
  racconto:
    "All'orale partirei dal bilancio delle potenze con l'attrito, $W_m + W_u + W_{diss} = 0$, e dalla definizione $\\eta = -W_u/W_m$, spiegando che il meno serve perché $W_u$ è negativa. Con la ruota 1 movente il bilancio diventa $\\eta_1 C_1\\omega_1 + C_2\\omega_2 = 0$, da cui $C_1/C_2 = -\\tau/\\eta_1$: un riduttore di giri moltiplica la coppia. Poi sottolineo che il rendimento si applica alla potenza di chi muove, quindi nel moto retrogrado compare $\\eta_2$, si ha la fascia di quiete all'avviamento e, se $\\eta_2 \\le 0$, l'irreversibilità della vite senza fine. Chiudo con la cascata: azione e reazione sugli alberi, rendimenti che si moltiplicano.",
};

export const rendimentoEpi: LezioneArgomento = {
  perche:
    "Nei cambi automatici e nei riduttori compatti si usano rotismi epicicloidali. Ci si aspetterebbe che rendano come un normale ingranaggio, ma non è così: un riduttore a corona fissa rende **meglio** dei suoi ingranaggi, mentre certi epicicloidali con forti riduzioni rendono pochissimo o si bloccano. La domanda della lezione è: **come si calcola il rendimento di un epicicloidale, se i suoi ingranaggi hanno rendimento $\\eta_o$?** Premessa onesta: la dispensa non lo tratta. Lo vediamo con la trattazione classica, e all'orale va detto.",
  idea:
    "L'attrito fra due denti dipende da quanto premono e da quanto strisciano uno sull'altro. Lo strisciamento è un moto **relativo** fra i due denti: non cambia se lo guardi da terra o da una giostra che gira. Quindi la potenza persa è la stessa per chi sta fermo e per chi sta seduto sul portatreno.\n\nDal portatreno, però, il rotismo è un normale ingranaggio ad assi fissi, di cui conosciamo il rendimento $\\eta_o$: le perdite si calcolano facilmente. Allora il piano è questo: scrivo le perdite viste da terra (dove compare il rendimento incognito $\\eta_{EPI}$), le scrivo viste dal portatreno (dove compare $\\eta_o$), le uguaglio. La differenza fra i due rendimenti nasce dal fatto che le perdite sono uguali, ma la potenza su cui si confrontano no: da terra il solare gira a $\\omega_1$, dal portatreno a $\\omega_1 - \\Omega$.",
  richiami: [
    { titolo: "Rendimento dell'ingranaggio ordinario", testo: "Con le potenze con segno $\\eta = -W_u/W_m$. Con la ruota 1 movente il bilancio è $\\eta C_1\\omega_1 + C_2\\omega_2 = 0$ e la potenza persa è $W_{diss} = -(1-\\eta)C_1\\omega_1$: la frazione $1-\\eta$ della potenza di chi muove. Il rendimento va sempre applicato alla potenza della ruota movente." },
    { titolo: "Formula di Willis", testo: "Visto dal portatreno, che ruota a $\\Omega$, ogni ruota ha velocità relativa $\\omega_i - \\Omega$ e il rotismo diventa ordinario, con rapporto $\\tau_W = (\\omega_{uscita} - \\Omega)/(\\omega_{entrata} - \\Omega)$. Con un solare fermo e l'altro motore si ricava $\\Omega/\\omega_1 = \\tau_W/(\\tau_W - 1)$." },
    { titolo: "Moti relativi e attrito", testo: "La velocità di strisciamento fra due corpi a contatto è la differenza delle loro velocità nel punto di contatto. Aggiungere a entrambi la stessa rotazione (cambiare osservatore) non la modifica. Forza d'attrito per velocità di strisciamento dà la potenza persa, quindi anche questa non dipende dall'osservatore." },
  ],
  ipotesiPerche: [
    "È la configurazione dei riduttori epicicloidali: un membro bloccato, uno che entra e uno che esce. Con un solo grado di libertà il rendimento ha senso come rapporto fra potenza in uscita e in entrata.",
    "È l'ipotesi che regge tutto: se le perdite stanno solo nei contatti fra i denti, dipendono solo dagli strisciamenti, cioè da moti relativi, e possiamo calcolarle dall'osservatore più comodo.",
    "Dal portatreno il rotismo è ordinario e il suo rendimento è un dato noto. Ma il rendimento va applicato alla potenza di chi muove nel moto relativo, che non è detto sia il solare motore: per questo i casi sono due.",
    "La dispensa si ferma prima: q52 cita «le dispense», ma il calcolo non c'è. Dirlo all'orale evita di attribuire alla dispensa ciò che non contiene.",
  ],
  disegnoGuida:
    "Fai due disegni affiancati dello stesso rotismo (solare 1 al centro, satellite, corona 3 fissa tratteggiata, portatreno). Nel primo, «visto da terra», segna $\\omega_1$ sul solare, $\\Omega$ sul portatreno e scrivi che la corona è ferma. Nel secondo, «visto dal portatreno», il portatreno è fermo: segna le velocità relative $\\omega_1 - \\Omega$ sul solare e $\\omega_3 - \\Omega = -\\Omega$ sulla corona, che ora gira. Su questo secondo disegno aggiungi una freccia dritta per il flusso di potenza, dal solare alla corona oppure al contrario: è lei che decide quale formula vale. Fra i due disegni scrivi in grande $W_P^F = W_P^M$.",
  mappa: [
    "Le perdite non dipendono dall'osservatore: le scrivo da terra e dal portatreno.",
    "Da terra: le perdite in funzione del rendimento incognito.",
    "Dal portatreno: le perdite in funzione di $\\eta_o$, attento a chi muove.",
    "Uguaglio e uso Willis per eliminare le velocità.",
    "Leggo i numeri: quando rende bene, quando si blocca.",
  ],
  dims: {
    d093: {
      introduzione:
        "Il rendimento incognito compare nelle perdite viste da terra; quello noto, $\\eta_o$, nelle perdite viste dal portatreno. Le perdite sono la stessa cosa vista da due osservatori. La strategia è quindi scrivere la potenza dissipata in due modi, uguagliarla e usare Willis per trasformare il rapporto fra velocità in un rapporto fra numeri di denti. Alla fine ci sarà da distinguere due casi, secondo chi muove nel moto relativo.",
      riepilogo:
        "Abbiamo usato un solo fatto fisico: le perdite dipendono dagli strisciamenti, che sono moti relativi, quindi sono le stesse da terra e dal portatreno. Da terra le perdite contengono $\\eta_{EPI}$ e la potenza del solare; dal portatreno contengono $\\eta_o$ e la potenza relativa del solare. Uguagliando e usando Willis abbiamo trovato $\\eta_{EPI}$ in funzione di $\\tau_W$ e $\\eta_o$. Il risultato dipende da chi muove nel moto relativo, può superare $\\eta_o$ e può anche diventare negativo: allora quel moto è impossibile.",
    },
  },
  passi: {
    "d093.1": {
      tappa: 0,
      prima: "Guardiamo lo stesso rotismo con due occhi diversi: un osservatore F fermo a terra e un osservatore M seduto sul portatreno. Chiediti: da che cosa dipende la potenza persa per attrito fra due denti? Dalla forza che si scambiano e da quanto strisciano uno sull'altro. Lo strisciamento è la differenza fra le velocità dei due denti nel contatto: cambia se cambio osservatore?",
      dopo: "La riga afferma che i due osservatori misurano la stessa potenza dissipata. Non la stessa potenza di ciascuna ruota (quelle cambiano, perché cambiano le velocità), ma la stessa perdita. È come il calore prodotto da due mani che si strofinano su un treno: chi è sul treno e chi è a terra vede lo stesso riscaldamento.",
    },
    "d093.2": {
      tappa: 1,
      prima: "Cominciamo dall'osservatore a terra. Le coppie esterne sono tre: sul solare 1, sul portatreno, sulla corona. La corona è ferma, quindi la sua potenza è zero e sparisce dal bilancio. Scrivi il bilancio con le perdite, poi la definizione di rendimento con il portatreno come utilizzatore. Infine, come per l'ingranaggio ordinario, ricava la perdita in funzione della potenza del solare.",
      dopo: "Da terra si perde la frazione $1 - \\eta_{EPI}$ della potenza del solare motore, esattamente come nell'ingranaggio ordinario. Il segno è negativo, come per ogni perdita. Questa è l'espressione in cui compare l'incognita.",
    },
    "d093.3": {
      tappa: 2,
      prima: "Ora siediti sul portatreno. Le coppie sono le stesse di prima (la coppia non dipende dall'osservatore), ma le velocità sono quelle relative: $\\omega_1 - \\Omega$ per il solare, $\\omega_3 - \\Omega$ per la corona, zero per il portatreno. Il rotismo è un ordinario 1 → 3 con rendimento $\\eta_o$. Se il solare spinge anche in questo moto relativo, di quale potenza va presa la frazione $1-\\eta_o$?",
      dopo: "Dal portatreno si perde la frazione $1-\\eta_o$ della potenza **relativa** del solare, $C_1(\\omega_1 - \\Omega)$, non di quella assoluta. È l'errore tipico da evitare. La formula vale se $C_1(\\omega_1 - \\Omega) > 0$, cioè se il solare è movente anche nel moto relativo: l'altro caso lo vediamo dopo.",
    },
    "d093.4": {
      tappa: 3,
      prima: "Abbiamo due espressioni della stessa perdita. Uguagliale, come dice la prima riga. In entrambe compare $-C_1$: semplificalo. Poi dividi tutto per $\\omega_1$ per far comparire il rapporto $\\Omega/\\omega_1$, che sappiamo calcolare con Willis.",
      dopo: "La riga dice che la frazione persa da terra è quella persa dal portatreno, ridotta del fattore $1 - \\Omega/\\omega_1$. Controllo: se il portatreno fosse fermo ($\\Omega = 0$) il rotismo sarebbe ordinario e avresti $\\eta_{EPI} = \\eta_o$, come deve essere.",
    },
    "d093.5": {
      tappa: 3,
      prima: "Ci serve $\\Omega/\\omega_1$ in funzione dei denti. È il calcolo del riduttore a corona fissa: scrivi Willis con la corona ferma, $\\tau_W = (0 - \\Omega)/(\\omega_1 - \\Omega)$, e risolvi rispetto a $\\Omega$. Poi calcola $1 - \\Omega/\\omega_1$ mettendo tutto a denominatore comune.",
      dopo: "Il fattore che ci serve vale $-1/(\\tau_W - 1)$. Controllo con il riduttore di p. 175: $\\tau_W = -1/3$, quindi $1 - \\Omega/\\omega_1 = 3/4$, e infatti $\\Omega = \\omega_1/4$. Il fattore è positivo solo per $\\tau_W < 1$: lo useremo fra poco.",
    },
    "d093.6": {
      tappa: 3,
      prima: "Sostituisci il fattore appena trovato nella relazione fra le perdite: ottieni $1 - \\eta_{EPI}$ in funzione di $\\eta_o$ e $\\tau_W$. Porta 1 dall'altra parte e metti a denominatore comune. Chiediti anche per quali $\\tau_W$ vale: abbiamo supposto che il solare spinga anche nel moto relativo, cioè che $\\omega_1 - \\Omega$ abbia lo stesso segno di $\\omega_1$.",
      dopo: "È la prima formula del rendimento dell'epicicloidale. Vale per $\\tau_W < 1$, che comprende il riduttore a corona fissa ($\\tau_W < 0$). Controllo: con $\\eta_o = 1$ trovi $\\eta_{EPI} = 1$, niente perdite da nessuna parte.",
    },
    "d093.7": {
      tappa: 4,
      prima: "Mettiamo i numeri del riduttore di p. 175: $\\tau_W = -1/3$ e ingranaggi da 0,98. Calcola numeratore e denominatore separatamente, poi dividi. Prima di farlo, prova a prevedere: il rendimento verrà più alto o più basso di 0,98? Pensa a quanta potenza passa davvero attraverso i denti.",
      dopo: "Viene 0,985, meglio dei singoli ingranaggi. Perché? Nel moto relativo il solare gira solo a $3\\omega_1/4$: una parte della potenza viaggia «a cavallo» del portatreno per trascinamento, senza strisciare fra i denti. Le perdite pesano su una potenza più piccola di quella trasmessa.",
    },
    "d093.8": {
      tappa: 2,
      prima: "Che succede per $\\tau_W > 1$? Ora il fattore $1 - \\Omega/\\omega_1$ è negativo: $\\omega_1 - \\Omega$ ha segno opposto a $\\omega_1$. Nel moto relativo il solare 1 non spinge più, frena: il movente è la corona. Il rendimento va applicato alla potenza relativa della corona. Scrivi il bilancio relativo con $\\eta_o$ davanti al termine della corona, ricava la perdita e ripeti l'uguaglianza delle perdite.",
      dopo: "Esce una seconda formula, diversa dalla prima: $\\eta_o$ compare anche al denominatore. È il punto delicato della dimostrazione: la formula non è unica, dipende da chi spinge nel moto relativo. Controllo: con $\\eta_o = 1$ dà di nuovo $\\eta_{EPI} = 1$.",
    },
    "d093.9": {
      tappa: 4,
      prima: "Guardiamo le due formule quando $\\tau_W$ è vicino a 1. Nella prima, per $\\eta_o < \\tau_W < 1$ il numeratore è positivo e il denominatore negativo. Nella seconda, per $1 < \\tau_W < 1/\\eta_o$ il numeratore è negativo. Chiediti che segno ha il rendimento e che cosa significava un rendimento negativo per l'ingranaggio ordinario.",
      dopo: "Il rendimento diventa negativo: le potenze che circolano fra i denti sono molto più grandi di quella utile, e le perdite non si possono coprire. Il moto ipotizzato non può avvenire: irreversibilità, con lo stesso significato visto per la vite senza fine. Ecco perché epicicloidali con riduzioni enormi possono bloccarsi.",
    },
  },
  racconto:
    "All'orale dichiarerei subito che la dispensa non lo tratta e che uso la trattazione classica. Poi l'idea: le perdite dipendono dagli strisciamenti, che sono relativi, quindi la potenza dissipata è la stessa da terra e dal portatreno. Da terra è $-(1-\\eta_{EPI})C_1\\omega_1$, dal portatreno $-(1-\\eta_o)C_1(\\omega_1 - \\Omega)$ se il solare spinge anche nel moto relativo. Uguaglio, uso Willis con il solare fisso e trovo $\\eta_{EPI} = (\\tau_W - \\eta_o)/(\\tau_W - 1)$ per $\\tau_W < 1$, con l'esempio del riduttore che rende 0,985. Chiudo dicendo che per $\\tau_W > 1$ la formula cambia e che vicino a 1 il rendimento diventa negativo: irreversibilità.",
};
