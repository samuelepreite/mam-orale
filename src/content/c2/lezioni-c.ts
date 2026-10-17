/** Lezioni discorsive C2 (parte C): dinamica longitudinale e trasversale del veicolo. Vedi docs/BRIEF_LEZIONI.md. */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ====================================================================== c2-veicolo
export const veicolo: LezioneArgomento = {
  perche: r`Al semaforo verde, un'auto molto potente che parte a tutto gas fa fischiare le gomme: le ruote pattinano e l'auto non accelera di più, anzi accelera peggio. Allora il limite non è il motore. Lo stesso in frenata, se blocchi le ruote, e in curva, se vai troppo forte. C'è un limite imposto dal contatto fra gomma e asfalto. La domanda della lezione è: **qual è l'accelerazione massima che un'auto può avere in partenza, perché dipende da quali ruote sono motrici, e quali sono i limiti in frenata e in curva?**`,
  idea: r`L'auto si spinge in avanti grazie al suolo: il motore fa girare le ruote motrici e il suolo, per aderenza, risponde con una forza in avanti. Questa forza ha un tetto, $f_{ad}$ per il carico che grava sulle ruote motrici. Quindi più carico c'è sulle ruote motrici, più forte puoi accelerare.

Ma il carico sulle ruote non è fisso. Quando acceleri ti senti schiacciato contro il sedile: è la forza d'inerzia, che agisce nel baricentro, in alto, e punta all'indietro. Insieme alla spinta del suolo, che sta in basso, forma una coppia che fa «impennare» un po' l'auto: il muso si alleggerisce e il retro si carica. È il trasferimento di carico.

Ecco perché conta quali ruote sono motrici. Con la trazione anteriore, accelerando si scarica proprio l'asse che deve spingere: male. Con la trazione posteriore, si carica: bene. In frenata, se freni con tutte e quattro le ruote, il trasferimento non conta più: conta solo il carico totale, cioè il peso. In curva la stessa idea, di lato: la somma delle forze laterali delle ruote non può superare $f_{ad}$ per il peso.`,
  richiami: [
    { titolo: 'Forza d\'inerzia (principio di d\'Alembert)', testo: r`Un corpo che accelera con accelerazione a si può trattare come in equilibrio aggiungendo nel baricentro una forza fittizia $-Ma$, opposta all'accelerazione. In partenza punta all'indietro, in frenata in avanti, in curva verso l'esterno. Così la dinamica diventa un problema di statica, con le sue tre equazioni.` },
    { titolo: 'Tetto dell\'aderenza', testo: r`Finché la gomma non slitta, la forza tangenziale del suolo è una reazione che vale quanto serve, ma non può superare $f_{ad}$ per la normale. Il limite di accelerazione, di frenata o di curva si trova imponendo l'uguaglianza: è l'incipiente slittamento.` },
    { titolo: 'Polo dei momenti a terra', testo: r`Nei problemi di veicoli le forze che non conosciamo stanno ai contatti delle ruote con il suolo. Scegliendo come polo un contatto, la sua normale e tutte le forze tangenziali (che stanno sulla linea del suolo) hanno braccio zero e spariscono dall'equazione dei momenti.` },
    { titolo: 'Equazione con l\'incognita da entrambe le parti', testo: r`Se scrivi $a = k(b - a\,c)$, l'incognita a compare a sinistra e a destra. Si sviluppa: $a = kb - kca$; si portano i termini con a da una parte: $a + kca = kb$; si raccoglie: $a(1 + kc) = kb$; si divide. È il conto che faremo per l'accelerazione massima.` },
    { titolo: 'Cono d\'aderenza', testo: r`La risultante della forza di contatto, somma di normale e tangenziale, è inclinata rispetto alla normale di un angolo α con $\tan\alpha = F_T/F_N$. In aderenza deve restare entro l'angolo $\varphi_{ad}$, con $\tan\varphi_{ad} = f_{ad}$. Ci servirà per il motociclo in curva.` },
  ],
  ipotesiPerche: [
    r`Sono gli oggetti del problema e le misure che contano: l'altezza del baricentro h e le sue distanze dai due assi. Saranno i bracci delle forze nelle equazioni dei momenti.`,
    r`In partenza la velocità è bassa, quindi la resistenza dell'aria è nulla; la resistenza al rotolamento è piccola perché $f_v$ è molto minore di $f_{ad}$. Restano solo inerzia e aderenza, e i conti si semplificano.`,
    r`Con la forza d'inerzia nel baricentro scriviamo semplici equazioni di equilibrio. Il limite è l'incipiente slittamento perché la forza al suolo non può superare il tetto dell'aderenza.`,
    r`In curva a velocità costante c'è solo l'accelerazione centripeta, quindi la sola forza d'inerzia è la centrifuga. Il baricentro a metà carreggiata dà al peso lo stesso braccio rispetto alle due ruote.`,
  ],
  disegnoGuida: r`Disegna l'auto di fianco, con il muso a sinistra: due ruote, A davanti e B dietro, appoggiate sul suolo. Segna il verso della velocità e dell'accelerazione, entrambi verso il muso. Metti il baricentro G a quota h dal suolo, con il peso Mg verso il basso e la forza d'inerzia Ma orizzontale verso il retro, cioè opposta all'accelerazione. Ai contatti disegna le normali verso l'alto, $F_{N,A}$ davanti e $F_{N,B}$ dietro. Per la trazione anteriore metti la forza di aderenza $F_T$ sul contatto A, nel verso del moto: è lei che spinge l'auto. Sulla ruota motrice disegna la coppia del motore $C_m$. Infine le quote: $l_1$ dal contatto anteriore alla verticale di G, $l_2$ da G al contatto posteriore, e h. Per la curva farai un secondo disegno, l'auto vista da dietro, con la centrifuga verso l'esterno.`,
  mappa: [
    'Equazioni del veicolo con la forza d\'inerzia nel baricentro.',
    'Reazioni normali e trasferimento di carico.',
    'Limite di aderenza sull\'asse motore: trazione anteriore e posteriore.',
    'Coppia motrice massima: dal motore al suolo.',
    'Frenata su quattro ruote e ripartizione della frenata.',
    'Curva: carichi sulle ruote e velocità limite di aderenza, per auto e moto.',
  ],
  dims: {
    d030: {
      introduzione: r`Prima di trovare l'accelerazione massima ci servono le equazioni del veicolo che accelera. La strategia: semplifichiamo le resistenze, aggiungiamo la forza d'inerzia nel baricentro e scriviamo le tre equazioni di equilibrio: orizzontale, verticale e dei momenti. Dai momenti otteniamo come cambiano i carichi sui due assi con l'accelerazione. Alla fine scriviamo la condizione di accelerazione massima, che userete nelle prossime due dimostrazioni.`,
      riepilogo: r`Trascurando le resistenze al moto, la sola forza orizzontale è l'aderenza delle ruote motrici, che bilancia l'inerzia. Le normali reggono il peso in totale, ma i momenti dicono che accelerando l'anteriore si scarica e il posteriore si carica della stessa quantità, $Mah/L$: è il trasferimento di carico. L'accelerazione massima si ha quando la forza al suolo raggiunge il tetto dell'aderenza sull'asse motore, il cui carico però dipende a sua volta dall'accelerazione.`,
    },
    d031: {
      introduzione: r`Ora applichiamo il metodo alla trazione anteriore. La strategia è breve: prendiamo la forza al suolo e il carico sull'asse anteriore dalla dimostrazione precedente, imponiamo l'incipiente slittamento delle ruote anteriori e risolviamo per l'accelerazione, che compare da entrambe le parti. Infine confrontiamo con il caso ideale senza trasferimento di carico.`,
      riepilogo: r`Abbiamo imposto che la forza al suolo delle ruote anteriori fosse al tetto dell'aderenza, $f_{ad}$ per il loro carico. Ma quel carico cala accelerando, e quindi l'accelerazione compare in entrambi i membri. Risolvendo, il trasferimento di carico finisce come $+f_{ad}h$ al denominatore: abbassa l'accelerazione massima. La trazione anteriore è penalizzata perché scarica proprio l'asse che deve spingere.`,
    },
    d032: {
      introduzione: r`Ora la trazione posteriore. La strategia è la stessa, con una differenza: la forza al suolo è sul posteriore, quindi scriviamo i momenti rispetto al contatto anteriore per trovare il carico posteriore. Poi imponiamo l'incipiente slittamento e risolviamo. Infine vediamo fin dove vale la formula, cioè la condizione di dragster in cui l'anteriore si solleva, e confrontiamo con la trazione anteriore.`,
      riepilogo: r`Per la trazione posteriore il trasferimento di carico aiuta: carica proprio l'asse che spinge, e nella formula compare $-f_{ad}h$ al denominatore. La formula vale finché le ruote anteriori restano a terra; al limite, la condizione di dragster, l'anteriore è scarico e l'accelerazione vale $gl_2/h$. A parità di ripartizione statica del peso la trazione posteriore accelera di più; con molto peso sull'anteriore il confronto si può invertire.`,
    },
    d029: {
      introduzione: r`Fin qui abbiamo parlato di forze al suolo. Ma il motore dà una coppia alla ruota: come diventa una forza? La strategia: scriviamo l'equilibrio della ruota motrice, che lega coppia e forza al suolo. Poi usiamo il tetto dell'aderenza per trovare la coppia massima trasmissibile, la applichiamo alla trazione anteriore e vediamo che cosa succede se il motore dà di più.`,
      riepilogo: r`L'equilibrio della ruota dice che la coppia motrice è bilanciata dalla forza al suolo per il raggio: la forza di trazione è una reazione di aderenza. Siccome quella forza ha un tetto, anche la coppia trasmissibile ce l'ha: $f_{ad}F_NR$, con la normale dell'asse motore. Per la trazione anteriore, all'accelerazione massima, la coppia vale $Ma_{max}R$. Una coppia maggiore fa solo pattinare la ruota: il limite è l'aderenza, non la potenza.`,
    },
    d136: {
      introduzione: r`Ora la frenata con freni su tutte e quattro le ruote. La strategia: scriviamo le equazioni orizzontale e verticale, con la forza d'inerzia ora in avanti; imponiamo l'incipiente slittamento su entrambi gli assi e scopriamo che i carichi singoli non servono. Poi, con i momenti, vediamo come si ripartiscono i carichi in frenata, e da qui come va ripartita la forza frenante fra anteriore e posteriore.`,
      riepilogo: r`In frenata le forze al suolo sono all'indietro e la forza d'inerzia in avanti. Se entrambi gli assi sono al limite, le due aderenze si sommano e serve solo la somma delle normali, cioè il peso: la decelerazione massima è $f_{ad}g$, senza trasferimento di carico. I momenti mostrano però che in frenata l'anteriore si carica e il posteriore si scarica: per raggiungere davvero $f_{ad}g$ ogni asse deve frenare in proporzione al suo carico, quindi l'anteriore molto di più.`,
    },
    d033: {
      introduzione: r`Passiamo alla curva. Vogliamo i carichi sulle ruote interna ed esterna. La strategia: aggiungiamo la centrifuga nel baricentro, scriviamo l'equilibrio laterale e verticale, contiamo le incognite e scopriamo che le forze laterali singole non si possono trovare, ma non servono. Le normali invece si trovano con i momenti rispetto alla ruota esterna e con l'equilibrio verticale.`,
      riepilogo: r`Con la centrifuga nel baricentro abbiamo scritto l'equilibrio: le forze laterali delle ruote bilanciano la centrifuga, le normali il peso. Le forze laterali singole restano indeterminate, ma conta solo la loro somma. Dai momenti rispetto alla ruota esterna abbiamo visto che la ruota interna si scarica e quella esterna si carica della stessa quantità, che cresce con $v^2$ e con $h/c$: è il trasferimento laterale di carico, quello che porta al ribaltamento.`,
    },
    d035: {
      introduzione: r`Ora la velocità oltre la quale l'auto slitta di lato. La strategia: imponiamo l'incipiente slittamento laterale su entrambe le ruote e sommiamo; le normali singole spariscono, come in frenata. Poi rifacciamo il conto per una moto, che in curva si inclina: lì ragioniamo con il cono d'aderenza e troviamo la stessa velocità limite.`,
      riepilogo: r`Per l'auto, sommando gli attriti laterali al limite, restano solo la centrifuga e il peso: la velocità massima è $\sqrt{f_{ad}gR}$, indipendente da massa, carreggiata e baricentro. Per la moto, le forze sono solo nel baricentro e nel contatto, quindi la moto si inclina finché la risultante di peso e centrifuga passa per il contatto: $\tan\alpha = v^2/(gR)$. Imponendo che la piega non superi l'angolo d'aderenza si ritrova la stessa velocità limite.`,
    },
  },
  passi: {
    'd030.1': {
      tappa: 0,
      prima: r`Un'auto in moto incontra diverse resistenze: l'aria, il rotolamento delle gomme, l'eventuale salita, e l'inerzia, cioè la «fatica» per cambiare velocità. Chiediti quali di queste contano davvero in partenza, quando la velocità è quasi zero e la strada è in piano. Ricorda il confronto fra $f_v$ e $f_{ad}$ della lezione sull'attrito volvente.`,
      dopo: r`In partenza la resistenza dell'aria è nulla, perché la velocità è bassa, e quella al rotolamento è trascurabile, perché $f_v$ è circa cento volte più piccolo di $f_{ad}$. Resta solo l'inerzia. Questa semplificazione rende il problema pulito: le uniche forze in gioco sono peso, inerzia e reazioni del suolo.`,
    },
    'd030.2': {
      tappa: 0,
      prima: r`Scriviamo l'equilibrio in orizzontale, con la forza d'inerzia. Quali forze orizzontali agiscono sull'auto? La forza d'inerzia nel baricentro, verso il retro; e al suolo la forza di aderenza delle ruote motrici, in avanti. Le altre ruote, non motrici, non spingono (abbiamo trascurato il rotolamento).`,
      dopo: r`La forza di aderenza al suolo è uguale a massa per accelerazione. Leggila al contrario: per accelerare di più serve più forza dal suolo. Ma quella forza ha un tetto, e da lì nascerà il limite. Nota che il motore non compare: agisce sulla ruota, non sull'auto dall'esterno.`,
    },
    'd030.3': {
      tappa: 0,
      prima: r`Ora in verticale. Quali forze verticali ci sono? Il peso verso il basso e le due normali, anteriore e posteriore, verso l'alto. La forza d'inerzia è orizzontale e non c'entra. Scrivi la somma uguale a zero.`,
      dopo: r`Le due normali insieme reggono sempre il peso, qualunque sia l'accelerazione. Ma attenzione: l'equazione dice solo quanto vale la somma, non come si divide fra i due assi. Per sapere quanto porta ciascun asse serve la terza equazione, quella dei momenti.`,
    },
    'd030.4': {
      tappa: 1,
      prima: r`Ci interessa il carico anteriore. Scegli il polo nel contatto posteriore B: lì passa la normale posteriore, e la forza di aderenza è sul suolo, quindi entrambe spariscono. Restano la normale anteriore, con braccio L, il peso, con braccio $l_2$, e la forza d'inerzia, con braccio h. Chiediti in che verso fa ruotare ciascuna, e poi isola la normale anteriore.`,
      dopo: r`La normale anteriore vale il carico statico $Mgl_2/L$ meno un termine $Mah/L$ che cresce con l'accelerazione. La forza d'inerzia, alta e rivolta all'indietro, tende a far impennare l'auto: alleggerisce il muso. Controllo: ad auto ferma ($a = 0$) ritrovi la ripartizione statica del peso, che dipende solo da dove sta il baricentro.`,
    },
    'd030.5': {
      tappa: 1,
      prima: r`Il carico posteriore lo troviamo senza altri momenti: l'equazione verticale dice che le due normali sommano al peso. Quindi basta sottrarre dal peso la normale anteriore appena trovata. Ricorda che $l_1 + l_2 = L$, e guarda di quanto cambiano i due carichi rispetto alla situazione da ferma.`,
      dopo: r`Il posteriore si carica esattamente di quanto l'anteriore si scarica: $Mah/L$. È il trasferimento longitudinale di carico. Cresce con l'accelerazione e con il rapporto fra altezza del baricentro e passo: un'auto alta e corta trasferisce molto. Controllo: con baricentro a terra ($h = 0$) non ci sarebbe trasferimento.`,
    },
    'd030.6': {
      tappa: 2,
      prima: r`Ora la domanda vera: quanto può accelerare al massimo? La forza al suolo è Ma, e non può superare $f_{ad}$ per la normale dell'asse motore. Al limite vale l'uguaglianza. Ma attenzione a una sottigliezza: la normale dell'asse motore dipende dall'accelerazione, come abbiamo appena visto.`,
      dopo: r`L'accelerazione massima si ha all'incipiente slittamento delle ruote motrici, e l'incognita compare da entrambe le parti: a sinistra in Ma, a destra dentro la normale. Si risolve come un'equazione di primo grado. Questa è la condizione generale; nelle prossime dimostrazioni la applichiamo a trazione anteriore e posteriore.`,
    },
    'd031.1': {
      tappa: 2,
      prima: r`Per la trazione anteriore la forza al suolo è sulle ruote anteriori, nel contatto A. Ci servono due ingredienti dalla dimostrazione precedente: l'equazione orizzontale, che dà la forza al suolo, e quella dei momenti rispetto a B, che dà il carico sull'asse anteriore. Riprendili.`,
      dopo: r`La forza al suolo anteriore vale Ma, e il carico anteriore cala con l'accelerazione. Sono proprio le due cose che servono per imporre il limite: la forza richiesta e il carico che determina il tetto. Nota il problema: più acceleri, più chiedi forza all'asse anteriore, e meno carico gli resta.`,
    },
    'd031.2': {
      tappa: 2,
      prima: r`Ora imponi l'incipiente slittamento delle ruote anteriori: la forza al suolo è uguale al tetto, $f_{ad}$ per il carico anteriore. A sinistra metti la forza richiesta, a destra il tetto, entrambi calcolati all'accelerazione massima.`,
      dopo: r`L'equazione dice: la forza che serve per accelerare deve essere uguale al massimo che il suolo può dare sulle ruote anteriori. Nota che l'accelerazione massima compare a sinistra e anche a destra, dentro il carico, con il segno meno: più acceleri, più si abbassa il tetto.`,
    },
    'd031.3': {
      tappa: 2,
      prima: r`Risolviamo l'equazione. Semplifica la massa, che compare da entrambe le parti. Moltiplica per L per togliere il denominatore. Poi porta a sinistra il termine con l'accelerazione che sta a destra, raccogli l'accelerazione e dividi. Fai attenzione al segno del termine che sposti.`,
      dopo: r`L'accelerazione massima è $f_{ad}g$ per $l_2$ diviso $(L + f_{ad}h)$. Il trasferimento di carico è il $+f_{ad}h$ al denominatore: abbassa il risultato. Controllo: con baricentro a terra ritrovi $f_{ad}gl_2/L$, cioè l'aderenza per la frazione di peso statica sull'anteriore. La massa non c'è: non conta quanto è pesante l'auto.`,
    },
    'd031.4': {
      tappa: 2,
      prima: r`Quanto ci costa il trasferimento di carico? Confrontiamo con il caso ideale in cui il carico anteriore restasse quello statico: allora l'accelerazione massima sarebbe $f_{ad}gl_2/L$. Fai il rapporto fra la formula vera e questa e semplifica.`,
      dopo: r`Il rapporto è $L/(L + f_{ad}h)$, sempre minore di 1: con la trazione anteriore il trasferimento di carico riduce sempre l'accelerazione massima, perché scarica l'asse che deve spingere. Con valori tipici, $L = 2{,}6$ m, $h = 0{,}5$ m e $f_{ad} = 1$, si perde circa il 16%.`,
    },
    'd032.1': {
      tappa: 2,
      prima: r`Ora le ruote motrici sono le posteriori: ci serve il carico posteriore. Scegli il polo nel contatto anteriore A, così spariscono la normale anteriore e la forza al suolo. Restano la normale posteriore, con braccio L, il peso, con braccio $l_1$, e la forza d'inerzia, con braccio h. Guarda il verso di ciascun momento e isola la normale posteriore.`,
      dopo: r`Il carico posteriore è il valore statico $Mgl_1/L$ più il trasferimento $Mah/L$: cresce con l'accelerazione. È la stessa espressione trovata nella prima dimostrazione per differenza, qui ricavata direttamente. La differenza decisiva con prima: ora il trasferimento carica l'asse che spinge.`,
    },
    'd032.2': {
      tappa: 2,
      prima: r`Ora imponi l'incipiente slittamento delle ruote posteriori, esattamente come prima: la forza che serve per accelerare deve essere uguale al tetto dell'aderenza sull'asse posteriore. Usa il carico posteriore appena trovato, valutato all'accelerazione massima.`,
      dopo: r`L'accelerazione massima compare di nuovo da entrambe le parti, ma ora a destra con il segno più: più acceleri, più si alza il tetto. È un circolo virtuoso, l'opposto di quello della trazione anteriore. Resta da risolvere l'equazione.`,
    },
    'd032.3': {
      tappa: 2,
      prima: r`Risolvi come prima: semplifica la massa, moltiplica per L, porta a sinistra il termine con l'accelerazione e raccogli. Prima di farlo, prevedi: il termine con h, al denominatore, avrà il segno più o il segno meno? E quale distanza comparirà al numeratore?`,
      dopo: r`L'accelerazione massima è $f_{ad}g$ per $l_1$ diviso $(L - f_{ad}h)$. Al denominatore c'è il meno: il trasferimento aiuta. Al numeratore c'è $l_1$, la distanza del baricentro dall'asse anteriore, perché è lei a decidere il carico statico sul posteriore. Il manoscritto di p. 101 lo scrive correttamente come $c_f$.`,
    },
    'd032.4': {
      tappa: 2,
      prima: r`La formula ha un limite di validità: abbiamo supposto che tutte e quattro le ruote restino a terra. Ma accelerando l'anteriore si scarica: chiediti quando il suo carico diventa zero. Poi prova a mettere nella formula dell'accelerazione massima il coefficiente che porta proprio a quel valore.`,
      dopo: r`L'anteriore resta a terra finché l'accelerazione non supera $gl_2/h$. E se il coefficiente d'aderenza vale proprio $l_2/h$, la formula dà esattamente quel valore. Oltre, con aderenza ancora maggiore, l'auto si impenna prima di slittare: la formula non vale più.`,
    },
    'd032.5': {
      tappa: 2,
      prima: r`È la condizione dei dragster, le auto da accelerazione: si sfrutta tutta l'aderenza e il muso è al limite del sollevamento. Imponi che la normale anteriore sia zero e scrivi i momenti rispetto al contatto posteriore. Quali forze restano con un momento?`,
      dopo: r`Restano solo il peso, con braccio $l_2$, e l'inerzia, con braccio h: l'accelerazione vale $gl_2/h$. Tutto il peso sta sul posteriore e la forza al suolo è $f_{ad}Mg$, quindi $a = f_{ad}g$: è il massimo possibile con un solo asse motore. Ecco perché i dragster hanno il baricentro basso e molto arretrato rispetto al muso lunghissimo.`,
    },
    'd032.6': {
      tappa: 2,
      prima: r`Confrontiamo le due trazioni. Fai il rapporto fra l'accelerazione massima della posteriore e quella dell'anteriore. Poi guarda il caso semplice in cui il baricentro sta a metà passo, $l_1 = l_2$: quale dei due fattori con h è più grande?`,
      dopo: r`A parità di ripartizione la posteriore vince sempre, perché $L + f_{ad}h$ è maggiore di $L - f_{ad}h$. Ma se c'è molto peso sull'anteriore ($l_1$ piccolo), come nelle auto con il motore davanti, il rapporto può scendere sotto 1: con $l_1 = 1$, $l_2 = 2$, $h = 0{,}5$ m e $f_{ad} = 1$ vale 0,7.`,
    },
    'd029.1': {
      tappa: 3,
      prima: r`Il motore applica una coppia alla ruota motrice. Guarda la ruota da sola, trascurandone massa e inerzia: le forze che la fanno ruotare sono la coppia motrice e la forza tangenziale del suolo nel punto di contatto. Scrivi l'equilibrio alla rotazione attorno al suo asse. Che braccio ha la forza al suolo?`,
      dopo: r`La coppia motrice è uguale alla forza al suolo per il raggio della ruota. Leggila al contrario: la ruota «spinge indietro» sull'asfalto e l'asfalto, per aderenza, spinge l'auto in avanti. La forza di trazione è dunque una reazione di aderenza, ed è soggetta al suo tetto.`,
    },
    'd029.2': {
      tappa: 3,
      prima: r`Perché la ruota non pattini, la forza al suolo non può superare il tetto dell'aderenza. Chiediti: il tetto dipende dalla normale di quale asse? Non dal peso totale, ma da quello che grava sulle ruote che spingono.`,
      dopo: r`La forza al suolo non può superare $f_{ad}$ per la normale dell'asse motore. E quella normale, l'abbiamo visto, cambia con l'accelerazione per il trasferimento di carico. Per questo non basta conoscere il peso dell'auto: serve sapere quanto carico c'è sulle motrici in quel momento.`,
    },
    'd029.3': {
      tappa: 3,
      prima: r`Metti insieme le due righe precedenti: la coppia è la forza al suolo per il raggio, e la forza ha un tetto. Allora anche la coppia ha un tetto. Scrivilo.`,
      dopo: r`La coppia massima trasmissibile al suolo è $f_{ad}F_NR$. È un limite che non dipende dal motore: anche il motore più potente non può trasmettere di più. Controllo: su ghiaccio, $f_{ad}$ piccolissimo, basta una coppia minima per far pattinare le ruote, come succede davvero.`,
    },
    'd029.4': {
      tappa: 3,
      prima: r`Applichiamo alla trazione anteriore, nel momento dell'accelerazione massima. La forza al suolo anteriore è al tetto, cioè $f_{ad}$ per il carico anteriore valutato all'accelerazione massima. Ma dall'equazione orizzontale del veicolo sappiamo anche che vale Ma. Scrivi la coppia in tutti e due i modi.`,
      dopo: r`La coppia che serve all'accelerazione massima è $Ma_{max}R$: è la coppia totale sull'asse anteriore. Nota che il carico anteriore è ridotto dal trasferimento, quindi questa coppia è minore di quella che si avrebbe a carico statico. È la coppia «utile» massima: oltre, si spreca.`,
    },
    'd029.5': {
      tappa: 3,
      prima: r`E se il motore dà più coppia di così? La forza al suolo non può crescere oltre il tetto, quindi la ruota non è più in equilibrio: comincia a pattinare. Chiediti che cosa succede alla forza al suolo quando la gomma passa dall'aderenza allo strisciamento.`,
      dopo: r`Quando la ruota pattina la forza al suolo scende al valore di attrito, $f_{att}F_N$, più basso del tetto d'aderenza: l'auto accelera peggio, e la coppia in più fa solo girare la ruota più veloce. È il fischio delle gomme al semaforo. Per questo il limite in partenza è l'aderenza, e i controlli di trazione tagliano la coppia.`,
    },
    'd136.1': {
      tappa: 4,
      prima: r`In frenata le cose si invertono. I freni applicano coppie alle ruote, che per il loro equilibrio richiedono al suolo forze tangenziali opposte al moto, su entrambi gli assi. La forza d'inerzia, opposta alla decelerazione, ora punta in avanti. Scrivi l'equilibrio orizzontale con a positiva come decelerazione.`,
      dopo: r`Le due forze frenanti al suolo, anteriore e posteriore, bilanciano insieme la forza d'inerzia. È come in partenza, ma con due assi che lavorano invece di uno. Ti senti spinto in avanti verso il volante: è quella forza d'inerzia.`,
    },
    'd136.2': {
      tappa: 4,
      prima: r`L'equilibrio verticale non cambia rispetto alla partenza: le forze verticali sono sempre il peso e le due normali. La forza d'inerzia è orizzontale e non entra. Scrivi la somma uguale a zero.`,
      dopo: r`Le due normali reggono il peso, come sempre. Anche qui l'equazione non dice come si divide il carico fra i due assi; ma, sorpresa, per la decelerazione massima non ci servirà saperlo. Ci servirà invece per ripartire la frenata.`,
    },
    'd136.3': {
      tappa: 4,
      prima: r`Imponi il limite su entrambi gli assi: ciascuna forza frenante è al tetto, $f_{ad}$ per la propria normale. Sostituisci nell'equazione orizzontale. Guarda che cosa compare: le due normali separatamente o la loro somma? E quanto vale la somma, dall'equazione verticale?`,
      dopo: r`Compare solo la somma delle normali, cioè il peso: la decelerazione massima è $f_{ad}g$. Il trasferimento di carico non conta, perché quello che toglie a un asse lo dà all'altro, e tutti e due frenano. Con $f_{ad} = 1$ si decelera di circa 1 g. Controllo: è il massimo assoluto, perché tutto il peso lavora per l'aderenza.`,
    },
    'd136.4': {
      tappa: 4,
      prima: r`Ma come va divisa la frenata fra i due assi per arrivare davvero a quel limite? Ci servono i carichi su ciascun asse. La dispensa non li scrive: li ricaviamo come in partenza, con i momenti rispetto al contatto posteriore B. Differenza: ora l'inerzia punta in avanti. Chiediti se carica o scarica l'anteriore.`,
      dopo: r`In frenata l'anteriore si carica di $Mah/L$ e il posteriore si scarica della stessa quantità: l'inerzia in avanti fa «affondare» il muso. È esattamente ciò che vedi quando un'auto frena forte. Controllo: con $a = 0$ si ritrova la ripartizione statica.`,
    },
    'd136.5': {
      tappa: 4,
      prima: r`Perché entrambi gli assi arrivino al limite insieme, ogni forza frenante deve essere $f_{ad}$ per la sua normale. Fai il rapporto fra le due forze frenanti: $f_{ad}$ si semplifica e resta il rapporto fra le normali. Sostituisci i carichi in frenata, con la decelerazione uguale a $f_{ad}g$.`,
      dopo: r`La frenata è ripartita correttamente se l'anteriore frena in proporzione al suo carico dinamico, cioè molto più del posteriore. Per questo i freni anteriori sono più grandi. Se la ripartizione è diversa, un asse slitta prima e la decelerazione massima scende sotto $f_{ad}g$.`,
    },
    'd033.1': {
      tappa: 5,
      prima: r`Ora l'auto in curva, vista da dietro. Con la centrifuga nel baricentro, verso l'esterno, scriviamo l'equilibrio laterale e verticale. Lateralmente, chi trattiene l'auto verso il centro della curva? Le forze laterali delle gomme al suolo. Verticalmente, le due normali e il peso.`,
      dopo: r`La somma delle forze laterali delle due ruote è uguale alla centrifuga, e la somma delle normali è uguale al peso. Leggila: in curva le gomme spingono l'auto verso il centro, ed è quella spinta che la fa curvare. Controllo: in rettilineo ($R$ infinito) la centrifuga è zero e non servono forze laterali.`,
    },
    'd033.2': {
      tappa: 5,
      prima: r`Contiamo le incognite: due forze laterali e due normali, quattro in tutto. Le equazioni del piano sono tre: due di traslazione e una di rotazione. Chiediti che cosa si riesce a trovare e che cosa no. Le forze laterali compaiono anche nei momenti?`,
      dopo: r`Il problema è iperstatico: le normali si trovano, ma come si dividono le forze laterali fra le due ruote no. Non è un guaio, perché per lo slittamento conta solo la loro somma, che conosciamo. Nei momenti rispetto a un contatto le forze laterali, che stanno sul suolo, spariscono.`,
    },
    'd033.3': {
      tappa: 5,
      prima: r`Troviamo il carico sulla ruota interna con i momenti rispetto al contatto della ruota esterna. Lì spariscono la normale esterna e tutte le forze laterali. Restano la normale interna, con braccio c, la centrifuga, con braccio h, e il peso, con braccio c/2. È lo stesso conto della lezione sul ribaltamento.`,
      dopo: r`La ruota interna parte da metà peso e si scarica al crescere di $v^2$. La centrifuga, alta, tende a far ruotare l'auto attorno alla ruota esterna; il peso la tiene giù. Controllo: a velocità zero ogni ruota porta metà peso, come ci aspettiamo con il baricentro al centro.`,
    },
    'd033.4': {
      tappa: 5,
      prima: r`Il carico sulla ruota esterna lo troviamo senza altri momenti: le due normali sommano al peso. Sottrai dal peso il carico interno appena trovato.`,
      dopo: r`La ruota esterna si carica esattamente di quanto l'interna si scarica. È il motivo per cui in curva le gomme esterne si consumano di più e si schiacciano visibilmente. La somma resta il peso, come deve essere.`,
    },
    'd033.5': {
      tappa: 5,
      prima: r`Misuriamo lo sbilanciamento: fai la differenza fra il carico esterno e quello interno. Prima di farla, prevedi da che cosa dipenderà: velocità, raggio, altezza del baricentro, carreggiata.`,
      dopo: r`Il trasferimento laterale di carico cresce con $v^2$ e con $h/c$, e cala con R. Quando diventa così grande che la ruota interna arriva a zero, l'auto si ribalta: è il collegamento con la lezione sul ribaltamento. Baricentri bassi e carreggiate larghe lo riducono.`,
    },
    'd035.1': {
      tappa: 5,
      prima: r`Ora cerchiamo la velocità oltre la quale l'auto slitta di lato. Al limite, ogni ruota ha la forza laterale al tetto dell'aderenza: $f_{ad}$ per la propria normale. Scrivilo per la ruota interna e per quella esterna.`,
      dopo: r`Queste due righe dicono che entrambe le ruote sono sul punto di scivolare verso l'esterno. È la stessa condizione che abbiamo imposto in frenata sui due assi, ora in direzione laterale. Nota che i carichi delle due ruote sono diversi, quindi anche le forze laterali lo sono.`,
    },
    'd035.2': {
      tappa: 5,
      prima: r`Come in frenata, conviene sommare le due righe membro a membro. A sinistra compare la somma delle forze laterali: quanto vale, dall'equilibrio laterale? A destra la somma delle normali: quanto vale, dall'equilibrio verticale?`,
      dopo: r`A sinistra resta la centrifuga, a destra $f_{ad}$ per il peso. Le normali singole sono sparite, e con loro il problema dell'iperstaticità: non serve sapere come si dividono le forze. La condizione è semplice: la centrifuga non può superare il tetto dell'aderenza totale.`,
    },
    'd035.3': {
      tappa: 5,
      prima: r`Risolvi l'equazione per la velocità massima: semplifica la massa, che compare da entrambe le parti, moltiplica per R ed estrai la radice. Chiediti poi da quali grandezze dipende il risultato, e da quali no.`,
      dopo: r`La velocità limite di aderenza è $\sqrt{f_{ad}gR}$. Non dipende dalla massa, dalla carreggiata, né dall'altezza del baricentro: conta solo l'aderenza e il raggio della curva. Con $f_{ad} = 1$ e una curva di 50 m si arriva a circa 22 m/s, cioè 80 km/h. Sul bagnato, con $f_{ad}$ più basso, molto meno.`,
    },
    'd035.4': {
      tappa: 5,
      prima: r`Ora una moto. Ha un solo contatto con il suolo, il punto P sotto le ruote, e per stare in equilibrio in curva si inclina. Le forze sono solo nel baricentro, peso e centrifuga, e nel contatto, la reazione del suolo. Se la moto non deve ruotare su sé stessa, dove deve passare la risultante di peso e centrifuga? Pensa al triangolo delle forze.`,
      dopo: r`La risultante di peso e centrifuga deve passare per il contatto, quindi la moto si inclina finché la retta PG è parallela a quella risultante: $\tan\alpha = v^2/(gR)$. La massa sparisce. Controllo: da ferma la moto sta dritta; più veloce o più stretta è la curva, più si piega.`,
    },
    'd035.5': {
      tappa: 5,
      prima: r`La reazione del suolo sta lungo la retta PG, quindi è inclinata dell'angolo di piega rispetto alla verticale, che è la normale al suolo. Ricorda il cono d'aderenza: per non scivolare, quanto può essere inclinata al massimo la risultante del contatto? Imponi il limite e ricava la velocità.`,
      dopo: r`L'angolo di piega non può superare l'angolo d'aderenza; al limite $\tan\alpha = f_{ad}$, e si ritrova la stessa velocità dell'auto, $\sqrt{f_{ad}gR}$. Due ragionamenti diversi, lo stesso risultato. Con $f_{ad} = 1$ la piega massima è 45°, che è proprio quello che si vede nelle gare.`,
    },
  },
  racconto: r`All'orale direi che l'accelerazione massima in partenza non dipende dal motore ma dall'aderenza delle ruote motrici. Trascuro aria e rotolamento, metto la forza d'inerzia in G e scrivo le tre equazioni: con i momenti rispetto a un contatto trovo che accelerando il carico passa dall'anteriore al posteriore di $Mah/L$. Imponendo l'incipiente slittamento sull'asse motore ottengo $a_{max} = f_{ad}gl_2/(L + f_{ad}h)$ per la trazione anteriore e $f_{ad}gl_1/(L - f_{ad}h)$ per la posteriore, valida fino al dragster $a = gl_2/h$. La coppia massima trasmissibile è $f_{ad}F_NR$. In frenata su quattro ruote si sommano le aderenze e $a_{max} = f_{ad}g$; in curva, sommando le forze laterali, $v_{max} = \sqrt{f_{ad}gR}$, la stessa per la moto con il cono d'aderenza.`,
};
