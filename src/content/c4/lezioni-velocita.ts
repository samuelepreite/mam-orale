/** Lezione discorsiva c4-velocita-ottima (docs/BRIEF_LEZIONI.md): tensione massima, potenza trasmessa, velocità ottima. */
import type { LezioneArgomento } from '../types';

const L = String.raw;

export const lezioneVelocitaOttima: LezioneArgomento = {
  perche: L`Hai una cinghia e una certa pretensione data dal tenditore. Vuoi trasmettere più potenza possibile. La potenza è forza per velocità: verrebbe da dire «faccio correre la cinghia più forte». Ma una cinghia veloce sente una forza centrifuga che la stacca dalla puleggia, e una cinghia staccata non trasmette niente. Esiste quindi una velocità «giusta», né troppo bassa né troppo alta. Le domande che guidano la lezione sono: **qual è la velocità della cinghia che dà la massima potenza, e quanto vale quella potenza?** E prima ancora: **dove conviene mettere il tenditore, e qual è la tensione più alta che la cinghia deve sopportare?**`,
  idea: L`La velocità ha due effetti opposti. Da una parte moltiplica la forza trasmessa: a parità di differenza di tensione fra i rami, una cinghia che va al doppio trasmette il doppio della potenza. Dall'altra, la centrifuga cresce con il quadrato della velocità e si mangia la tensione che preme la cinghia sulla puleggia: meno pressione, meno attrito, meno coppia massima.

Mettendo insieme, la potenza massima è fatta di un termine che cresce con $V$ e di uno che cala con $V^3$. All'inizio vince il primo, poi il secondo: la curva sale, raggiunge un massimo e torna a zero. Il massimo si trova come sempre, annullando la derivata. Il risultato è elegante: all'ottimo la centrifuga si mangia esattamente un terzo della tensione che si tiene fissa.

Attenzione però a quale tensione si tiene fissa. La dispensa fissa la tensione del lasco, con il tenditore; le domande d'esame fissano quella del teso, al massimo che la cinghia sopporta. I conti sono identici, ma il «terzo» si riferisce a due tensioni diverse.`,
  richiami: [
    { titolo: 'Potenza: forza per velocità', testo: L`Una forza $F$ che spinge un punto che si muove con velocità $V$ nella sua stessa direzione fa una potenza $F V$. Per una coppia $C$ su un albero che gira con velocità angolare $\omega$ la potenza è $C\omega$. Le due scritture sono la stessa cosa: una forza tangente al bordo di una ruota di raggio $R$ dà coppia $FR$, e il bordo corre a $\omega R$.` },
    { titolo: 'Massimo di una funzione', testo: L`Il massimo di una funzione liscia $W(V)$ si trova dove la derivata è nulla: lì la curva smette di salire e comincia a scendere. Per essere sicuri che sia un massimo e non un minimo si guarda la derivata seconda: se è negativa la curva è rivolta verso il basso, come la cima di una collina.` },
    { titolo: 'Coppia massima dalla formula di Eulero', testo: L`Nella lezione sull'equazione di Eulero hai visto che, quando lo scorrimento occupa tutto l'arco della puleggia limitante, la coppia è massima: $C_{MAX} = (T_2 - \rho V^2)(e^{f\beta_{min}} - 1)R$. Cresce con la tensione del lasco, cresce esponenzialmente con $f\beta$ e cala con la centrifuga $\rho V^2$.` },
    { titolo: 'Forza su una puleggia che devia una fune', testo: L`Se una fune tesa con tensione $T$ passa su una carrucola e viene deviata di un angolo $\alpha$, la carrucola riceve la somma delle due tensioni, che sono uguali in modulo ma inclinate. Ciascuna contribuisce con $T\sin(\alpha/2)$ nella direzione della bisettrice: in tutto $2T\sin(\alpha/2)$. Più la fune è deviata, più spinge.` },
  ],
  ipotesiPerche: [
    L`Cerchiamo la potenza più grande possibile, quindi lavoriamo già al limite d'aderenza: la coppia è la massima che la puleggia limitante sopporta. Restano da scegliere solo la velocità e la pretensione.`,
    L`Il tenditore sul ramo lasco tiene costante la sua tensione: è il modo più conveniente di mettere in tensione la cinghia, come mostreremo. Con $T_2$ fissata la potenza diventa una funzione della sola velocità.`,
    L`Le piccole differenze di velocità fra i rami (lo scorrimento elastico) sono trascurabili qui. Con il raggio fissato, scegliere la velocità della cinghia equivale a scegliere la velocità angolare della puleggia.`,
    L`Le domande d'esame partono da un vincolo diverso: la tensione del ramo teso non può superare quella che la cinghia regge. È un altro modello, e va esposto distinguendolo da quello della dispensa.`,
  ],
  disegnoGuida: L`Il disegno qui è un grafico. Traccia l'asse orizzontale della velocità V della cinghia e quello verticale della potenza W, con l'origine in basso a sinistra. Disegna una curva che parte da zero (cinghia ferma, nessuna potenza), sale, raggiunge un massimo e poi scende fino a tornare a zero. Segna il massimo W^MAX con due tratteggiate: quella verticale cade sull'asse in V* = √(T₂/3ρ), la velocità ottima. Segna poi il punto dove la curva torna a zero, V = √(T₂/ρ): lì la centrifuga eguaglia la tensione del lasco e la cinghia non preme più. Scrivi accanto la formula W = (e^{fβ} − 1)(T₂ − ρV²)V, precisando che T₂ è fissata dal tenditore. Il grafico mostra a colpo d'occhio il compromesso fra velocità e centrifuga.`,
  mappa: [
    'Trovo la tensione massima della cinghia e capisco perché il tenditore va sul ramo lasco.',
    'Scrivo la potenza come forza trasmessa per velocità della cinghia.',
    'Con la pretensione fissata, la potenza massima diventa una funzione della velocità.',
    'Derivo, annullo la derivata e trovo la velocità ottima.',
    'Rifaccio il conto nella variante delle domande, con la tensione del teso fissata.',
  ],
  dims: {
    d068: {
      introduzione: L`Prima di cercare la velocità ottima chiariamo due cose: qual è la tensione più alta nella cinghia e quale ramo conviene tenere fisso con il tenditore. La strategia è usare l'equilibrio della motrice per legare le tensioni alla coppia, l'andamento della tensione lungo l'arco e poi confrontare le due posizioni del tenditore con l'equazione di Eulero.`,
      riepilogo: L`La tensione massima della cinghia è quella del ramo teso, che vale il lasco più la coppia divisa il raggio. Se il tenditore fissa il lasco, la coppia cresce facendo salire il teso; se fissa il teso, la coppia deve far calare il lasco, che però non può scendere sotto la centrifuga. A parità di tensione imposta, il tenditore sul lasco permette una coppia massima $e^{f\beta_{min}}$ volte più grande: ecco perché si mette lì. Infine c'è un limite di resistenza: il teso non deve superare la tensione ammissibile.`,
    },
    d069: {
      introduzione: L`Ora scriviamo la potenza trasmessa. La strategia è partire dalla potenza di una coppia, sostituire la coppia con la differenza delle tensioni per il raggio e riconoscere la velocità della cinghia. Poi mettiamo la coppia massima per avere la potenza massima a pretensione fissata.`,
      riepilogo: L`La potenza è la forza trasmessa, cioè la differenza di tensione fra i rami, per la velocità della cinghia. Al limite d'aderenza la forza trasmessa è quella di Eulero, e la potenza massima diventa un termine che cresce con $V$ meno un termine che cresce con $V^3$. A $V = \sqrt{T_2/\rho}$ la potenza si annulla perché la cinghia non preme più sulla puleggia. Con il raggio fissato, la potenza è funzione della sola velocità angolare.`,
    },
    d070: {
      introduzione: L`Cerchiamo il massimo della potenza al variare della velocità. La strategia è la ricetta classica: scrivere la funzione, derivarla, annullare la derivata, controllare con la derivata seconda. Lo facciamo prima nel modello della dispensa, con la tensione del lasco fissata, e poi nella variante delle domande, con la tensione del teso fissata.`,
      riepilogo: L`Con la tensione del lasco fissata, la potenza è $k(T_2V - \rho V^3)$. La derivata si annulla quando la centrifuga vale un terzo di $T_2$: lì la potenza è massima, e torna a zero a una velocità $\sqrt3$ volte più grande. All'ottimo la tensione del teso non è fissata: la dà Eulero. Nella variante delle domande si fissa invece il teso al massimo ammissibile: lo stesso conto dà una centrifuga pari a un terzo di $T_{max}$. Il «terzo» si riferisce sempre alla tensione che si tiene fissa.`,
    },
  },
  passi: {
    'd068.1': {
      tappa: 0,
      prima: L`Partiamo dall'equilibrio della motrice: la coppia è la differenza fra le tensioni dei rami per il raggio. Vogliamo sapere quanto vale la tensione del ramo teso in funzione della coppia da trasmettere. Dividi per il raggio e porta $T_2$ dall'altra parte.`,
      dopo: L`Il ramo teso deve avere la tensione del lasco più un «salto» pari a coppia diviso raggio. Più coppia vuoi, più deve essere tirato il teso. Controllo: a coppia nulla i due rami hanno la stessa tensione.`,
    },
    'd068.2': {
      tappa: 0,
      prima: L`Dov'è la tensione più alta in tutta la cinghia? Ripensa al grafico della tensione lungo l'arco: nello scorrimento sale dal lasco al teso, nell'aderenza resta uguale al teso, e nei rami è costante. Qual è allora il valore massimo?`,
      dopo: L`La tensione massima è quella del ramo teso. È già la tensione totale del ramo, centrifuga compresa: non bisogna aggiungere $\rho V^2$ una seconda volta. È questo il valore da confrontare con la resistenza della cinghia.`,
    },
    'd068.3': {
      tappa: 0,
      prima: L`Come si mette in tensione la cinghia? Con un rullo tenditore, una piccola puleggia folle spinta da una molla o da un peso, che preme su un ramo e lo devia. Ricorda il richiamo: la forza sul rullo è legata alla tensione del ramo e all'angolo di deviazione. Se il rullo sta sul lasco, che cosa fissa? E che cosa resta libero di cambiare con la coppia?`,
      dopo: L`Il tenditore fissa la tensione del lasco a un valore costante, che chiamiamo $A$, deciso dalla molla o dal peso. Quando cresce la coppia, cresce soltanto la tensione del teso. È esattamente l'ipotesi della dispensa: $T_2$ costante.`,
    },
    'd068.4': {
      tappa: 0,
      prima: L`Calcoliamo la coppia massima con il tenditore sul lasco. Siamo in incipiente scorrimento globale e la tensione del lasco vale $A$. Scrivi Eulero risolto rispetto alla tensione del teso, poi fai la differenza delle tensioni e moltiplica per il raggio.`,
      dopo: L`Con il tenditore sul lasco la coppia massima è la tensione utile $A - \rho V^2$ per $(e^{f\beta_{min}} - 1)$ per il raggio. È la stessa formula della lezione su Eulero con $T_2 = A$. Il fattore esponenziale lavora «a favore»: amplifica la tensione imposta.`,
    },
    'd068.5': {
      tappa: 0,
      prima: L`E se mettessimo il tenditore sul teso? Ora è $T_1$ a valere $A$, e per trasmettere coppia deve scendere il lasco. Ricava il lasco da Eulero: questa volta dividi per l'esponenziale invece di moltiplicare. Poi fai la differenza delle tensioni e moltiplica per il raggio.`,
      dopo: L`Con il tenditore sul teso la coppia massima ha il fattore $(1 - 1/e^{f\beta_{min}})$, sempre minore di uno. Il lasco non può scendere più di tanto, perché deve restare sopra la centrifuga: il margine è piccolo. Controllo: il teso resta $A$, mai di più.`,
    },
    'd068.6': {
      tappa: 0,
      prima: L`Confrontiamo le due soluzioni, a parità di tensione imposta $A$ e di velocità. Fai il rapporto fra le due coppie massime: tensione utile e raggio si semplificano. Resta il rapporto fra i due fattori; scrivi il secondo come $(e^{f\beta_{min}} - 1)/e^{f\beta_{min}}$.`,
      dopo: L`Il tenditore sul lasco rende $e^{f\beta_{min}}$ volte più coppia: con valori tipici, da due a quattro volte. È la stessa «direzione preferenziale» del freno a nastro. Ecco perché il tenditore si mette sul lasco, e perché la dispensa considera $T_2$ fissata.`,
    },
    'd068.7': {
      tappa: 0,
      prima: L`Oltre a non slittare, la cinghia non deve rompersi. Il ramo più sollecitato è il teso. Se la cinghia sopporta al massimo una tensione ammissibile, che condizione deve rispettare $T_1$? Sostituisci $T_1 = T_2 + C_1/R$ e ricava un limite per la coppia.`,
      dopo: L`La coppia non può superare $(T_{amm} - T_2)R$. Ci sono quindi due limiti, aderenza e resistenza, e vale il più severo dei due. Questa verifica viene dal dimensionamento classico delle cinghie: la dispensa non la tratta.`,
    },
    'd068.8': {
      tappa: 0,
      prima: L`Nei manuali di progetto, alla tensione del teso si aggiunge spesso uno sforzo dovuto alla flessione della cinghia attorno alla puleggia. Chiediti se nel nostro modello esiste: quanto vale la rigidezza flessionale di un flessibile ideale?`,
      dopo: L`Nel modello della dispensa la rigidezza flessionale è nulla, quindi piegarsi sulla puleggia non genera sforzi e non c'è nessun termine di flessione. Se all'orale te lo chiedono, dici che nella realtà esiste e che le pulegge troppo piccole lo fanno crescere.`,
    },
    'd069.1': {
      tappa: 1,
      prima: L`Passiamo alla potenza, che è la grandezza da rendere massima. La motrice riceve dal motore una coppia $C_1$ e gira con velocità angolare $\omega_1$, concorde alla coppia. Ricorda il richiamo: come si scrive la potenza di una coppia che fa girare un albero?`,
      dopo: L`La potenza è coppia per velocità angolare, positiva perché coppia e rotazione sono concordi. La dispensa la indica con $W$. Controllo delle unità: newton metro per radianti al secondo danno watt.`,
    },
    'd069.2': {
      tappa: 1,
      prima: L`Sostituisci la coppia con l'equilibrio della motrice, differenza delle tensioni per il raggio. Nel prodotto compare $R_1\omega_1$: che cosa rappresenta? È la velocità del bordo della puleggia, cioè, trascurando lo scorrimento elastico, la velocità della cinghia.`,
      dopo: L`La potenza è la forza trasmessa, $T_1 - T_2$, per la velocità della cinghia. È la formula «forza per velocità» del richiamo: la cinghia è come una fune che tira un carico. Raddoppiando la velocità, a parità di tensioni, si raddoppia la potenza.`,
    },
    'd069.3': {
      tappa: 2,
      prima: L`Ora vogliamo la potenza massima con la pretensione fissata. La forza trasmessa più grande possibile è quella al limite d'aderenza, data dall'equazione di Eulero. Moltiplica la coppia massima per la velocità angolare e riconosci di nuovo $R\omega$.`,
      dopo: L`La potenza massima è il fattore di Eulero per la tensione utile del lasco per la velocità della cinghia. «Massima» significa che l'arco di scorrimento è uguale all'angolo limitante: abbiamo già sfruttato tutto l'attrito disponibile. Resta da scegliere la velocità.`,
    },
    'd069.4': {
      tappa: 2,
      prima: L`Per vedere come la potenza dipende dalla velocità conviene separare i contributi. Sviluppa il prodotto: moltiplica $V$ per ciascuno dei due termini della tensione utile, $T_2$ e $\rho V^2$. Che potenze di $V$ compaiono, e con quale segno?`,
      dopo: L`Compaiono $T_2 V$, che cresce in modo lineare, e $\rho V^3$, che cresce molto più in fretta e viene sottratto. A bassa velocità vince il primo, ad alta il secondo. È la funzione di cui cercheremo il massimo.`,
    },
    'd069.5': {
      tappa: 2,
      prima: L`Prima del massimo, troviamo dove la potenza si annulla, oltre che a velocità zero. Uno dei due fattori deve annullarsi: quale può diventare zero aumentando la velocità? Pensa alla condizione di contatto della lezione su Eulero.`,
      dopo: L`La potenza si annulla quando la centrifuga eguaglia la tensione del lasco, a $V = \sqrt{T_2/\rho}$. A quella velocità la cinghia non preme più sulla puleggia e non c'è attrito da sfruttare. È il secondo zero della curva: il massimo sta in mezzo.`,
    },
    'd069.6': {
      tappa: 2,
      prima: L`Di che cosa dipende, alla fine, la potenza massima? La coppia è già stata resa massima rispetto all'arco di scorrimento; restano la pretensione, fissata, e la velocità. Con il raggio della puleggia fissato, scegliere la velocità della cinghia equivale a scegliere che cosa?`,
      dopo: L`La potenza è funzione della sola velocità angolare, perché $V = \omega R$ con $R$ fissato. Per il progettista, scegliere la velocità ottima della cinghia vuol dire scegliere a quanti giri far lavorare la puleggia.`,
    },
    'd070.1': {
      tappa: 2,
      prima: L`Fissiamo le ipotesi del massimo. La coppia è già la massima rispetto all'arco di scorrimento, quindi l'arco di scorrimento è l'angolo limitante. Quale tensione è tenuta costante, e da che cosa? Ricorda il confronto fra le due posizioni del tenditore.`,
      dopo: L`Lavoriamo al limite d'aderenza con la tensione del lasco fissata dal tenditore, che è la scelta migliore. Stiamo cercando il «massimo dei massimi»: per ogni velocità prendiamo la coppia massima, poi scegliamo la velocità migliore.`,
    },
    'd070.2': {
      tappa: 2,
      prima: L`Scrivi la potenza massima con l'arco di scorrimento uguale all'angolo minimo. Il fattore $e^{f\beta_{min}} - 1$ dipende dalla velocità? Se no, dagli un nome breve per alleggerire i conti.`,
      dopo: L`La potenza è $k$ per $(T_2V - \rho V^3)$, con $k$ costante. Tutta la dipendenza dalla velocità è nella parentesi: $k$ scala la curva in altezza ma non sposta il massimo. Ora si può derivare.`,
    },
    'd070.3': {
      tappa: 3,
      prima: L`Deriva la potenza rispetto alla velocità. La costante $k$ resta fuori. Dentro la parentesi, la derivata di $T_2V$ è $T_2$, perché $T_2$ è fissata; quella di $\rho V^3$ si fa con la regola delle potenze: l'esponente scende davanti e cala di uno.`,
      dopo: L`La derivata è $k(T_2 - 3\rho V^2)$. Si legge così: a bassa velocità è positiva e la potenza sale; quando $3\rho V^2$ supera $T_2$ diventa negativa e la potenza scende. Il «3» viene proprio dal cubo.`,
    },
    'd070.4': {
      tappa: 3,
      prima: L`Il massimo sta dove la derivata è zero. $k$ non è nullo, quindi deve annullarsi la parentesi. Risolvi rispetto a $V^2$ e poi prendi la radice positiva, perché la velocità è positiva.`,
      dopo: L`La velocità ottima è $\sqrt{T_2/3\rho}$: dipende solo dalla pretensione e dalla massa per metro della cinghia, non dall'attrito né dagli angoli. Una cinghia più leggera può correre di più; una pretensione maggiore sposta l'ottimo verso velocità più alte.`,
    },
    'd070.5': {
      tappa: 3,
      prima: L`Una derivata nulla può indicare un massimo o un minimo: è davvero un massimo? Controlla la derivata seconda: deriva ancora $k(T_2 - 3\rho V^2)$ rispetto a $V$ e calcolala nella velocità ottima. Che segno ha?`,
      dopo: L`La derivata seconda è $-6k\rho V^*$, negativa: la curva è rivolta verso il basso e il punto è un massimo, come mostra il grafico della dispensa. Controllo: era prevedibile, perché la curva parte da zero e torna a zero.`,
    },
    'd070.6': {
      tappa: 3,
      prima: L`Leggiamo il risultato in un altro modo. Dalla condizione di derivata nulla, quanto vale il termine centrifugo all'ottimo, rispetto a $T_2$? E confronta la velocità a cui la potenza si annulla, $\sqrt{T_2/\rho}$, con quella ottima.`,
      dopo: L`All'ottimo la centrifuga si mangia un terzo della tensione del lasco. La velocità di potenza nulla è $\sqrt3$ volte quella ottima, circa 1,7 volte. Quindi la curva sale da zero, ha il massimo in $V^*$ e crolla a zero poco dopo: superare l'ottimo costa caro.`,
    },
    'd070.7': {
      tappa: 3,
      prima: L`Quanto vale la potenza massima? Sostituisci la velocità ottima nella formula. Conviene usare la riga precedente: se la centrifuga vale un terzo di $T_2$, quanto resta della tensione utile? Poi moltiplica per $k$ e per $V^*$.`,
      dopo: L`La tensione utile all'ottimo è due terzi di $T_2$, e la potenza massima è due terzi di $k T_2$ per la velocità ottima. La dispensa non scrive questo valore, ma segue direttamente dalla sua formula.`,
    },
    'd070.8': {
      tappa: 3,
      prima: L`Una domanda che inganna molti: all'ottimo, quanto vale la tensione del teso? Non è fissata da nessuno: la dà l'equazione di Eulero a partire dal lasco. Scrivila con la centrifuga uguale a $T_2/3$ e raccogli $T_2/3$.`,
      dopo: L`Il teso vale $T_2/3$ per $(1 + 2e^{f\beta_{min}})$: dipende dall'attrito e dall'angolo. Quindi in questo modello la centrifuga all'ottimo è un terzo del lasco, non un terzo del teso. Confondere le due cose è l'errore classico.`,
    },
    'd070.9': {
      tappa: 4,
      prima: L`Ora la variante delle domande d'esame. Il vincolo è diverso: la tensione del teso è fissata al massimo che la cinghia sopporta, $T_{max}$. Il lasco, allora, non è più fissato: lo dà Eulero. Scrivi Eulero ricavando la tensione utile del lasco da quella del teso.`,
      dopo: L`La tensione utile del lasco è quella del teso divisa per $e^{f\beta}$. Ora è il lasco a cambiare con la velocità, mentre il teso resta fermo al massimo. Questa variante non è nella dispensa: va presentata come un secondo modello.`,
    },
    'd070.10': {
      tappa: 4,
      prima: L`Scrivi la potenza come forza trasmessa per velocità. La differenza fra le tensioni è uguale alla differenza fra le tensioni utili, perché $\rho V^2$ si cancella. Sostituisci la tensione utile del lasco appena trovata e raccogli la tensione utile del teso.`,
      dopo: L`La potenza ha la stessa struttura di prima, con $T_{max}$ al posto di $T_2$ e il fattore $(1 - e^{-f\beta})$ al posto di $(e^{f\beta} - 1)$. Il fattore è costante, quindi il conto per il massimo sarà identico.`,
    },
    'd070.11': {
      tappa: 4,
      prima: L`Deriva rispetto alla velocità come prima: il fattore di Eulero resta fuori, e dentro la parentesi hai di nuovo un termine lineare e uno cubico in $V$. Annulla la derivata e ricava il termine centrifugo.`,
      dopo: L`Nella variante la centrifuga all'ottimo è un terzo della tensione massima. È la frase che le domande chiedono di ricordare, ma vale in questo modello, non in quello della dispensa. Regola semplice: il terzo si riferisce sempre alla tensione che tieni fissa.`,
    },
    'd070.12': {
      tappa: 4,
      prima: L`Calcola la potenza massima nella variante. All'ottimo la centrifuga vale $T_{max}/3$: quanto resta della tensione utile del teso? Moltiplica per il fattore di Eulero e per la velocità ottima.`,
      dopo: L`La potenza massima è due terzi di $T_{max}$ per $(1 - e^{-f\beta})$ per la velocità ottima. Attenzione a scrivere la radice su tutta la frazione $T_{max}/3\rho$, non solo sul numeratore: è un errore frequente nelle risposte scritte.`,
    },
  },
  racconto: L`All'orale parti dalla potenza: forza trasmessa per velocità della cinghia, $W = (T_1 - T_2)V$. Al limite d'aderenza, con la tensione del lasco fissata dal tenditore, diventa $W = (e^{f\beta} - 1)(T_2 - \rho V^2)V$: la velocità aiuta, ma la centrifuga toglie tensione utile. Spieghi che il tenditore va sul lasco perché così la coppia massima è $e^{f\beta}$ volte più grande. Derivando rispetto a $V$ trovi $T_2 = 3\rho V^2$, quindi $V^* = \sqrt{T_2/3\rho}$, e dici che la potenza si annulla a $\sqrt3\,V^*$. Chiudi distinguendo la variante delle domande: se si fissa il teso a $T_{max}$, lo stesso conto dà $\rho V^{*2} = T_{max}/3$. Il terzo è sempre della tensione che tieni fissa.`,
};
