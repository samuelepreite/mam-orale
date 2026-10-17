/** Lezioni discorsive del capitolo C1, parte b (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ------------------------------------------------------------------ moto relativo e Coriolis (d014, d015)
const motoRelativo: LezioneArgomento = {
  perche: r`Guarda un autocarro ribaltabile mentre alza il cassone. Sotto il cassone c'è un pistone oleodinamico: un cilindro incernierato al telaio, dentro cui scorre uno stelo spinto dall'olio. Il cilindro ruota attorno alla sua cerniera e, nello stesso tempo, lo stelo esce dal cilindro. Il punto in cima allo stelo, quindi, fa due movimenti insieme: viene portato in giro dal cilindro che ruota e scorre rispetto al cilindro. La formula fondamentale delle velocità vale per due punti dello **stesso** corpo rigido, e qui non basta. La domanda della lezione è: **come si combinano i due movimenti per dare la velocità e l'accelerazione vere di quel punto, e da dove salta fuori il misterioso termine di Coriolis?**`,
  idea: r`Pensa a una persona che cammina sul pavimento di una giostra che gira. Chi sta sulla giostra vede la persona camminare in linea retta: quella è la velocità **relativa**. Chi sta a terra vede anche il movimento della giostra: se la persona si fermasse, verrebbe comunque portata in giro. Quella è la velocità di **trascinamento**, la velocità che il punto avrebbe se fosse saldato alla giostra. Per le velocità la regola è semplice: quella vera (assoluta) è la somma delle due.

Per le accelerazioni c'è una sorpresa. Mentre la persona cammina verso il bordo, la giostra le fa girare la direzione della velocità relativa e, allo stesso tempo, la porta in zone dove il trascinamento è più veloce. Questi due effetti si sommano in un termine nuovo, che non è né trascinamento né relativa: l'accelerazione di Coriolis, $2\vec\omega\wedge\vec V_{rel}$. Il «2» viene proprio dal fatto che gli effetti sono due. Il metodo per dimostrarlo è sempre lo stesso: scrivo la posizione del punto con un riferimento attaccato al corpo che si muove e derivo, ricordando che anche le frecce del riferimento ruotano.`,
  richiami: [
    { titolo: 'Formula fondamentale e Rivals', testo: r`Per due punti dello stesso corpo rigido che ruota con velocità angolare $\vec\omega$: $\vec V_B = \vec V_A + \vec\omega\wedge(B-A)$. Il secondo termine è la velocità dovuta alla rotazione, perpendicolare al segmento $AB$. Derivando si ottiene Rivals: $\vec a_B = \vec a_A + \dot{\vec\omega}\wedge(B-A) - \omega^2(B-A)$, cioè una parte tangenziale e una centripeta che punta verso $A$.` },
    { titolo: 'Derivata di un versore che ruota (Poisson)', testo: r`Un versore ha lunghezza fissa 1: se cambia, può solo girare. Quando ruota con velocità angolare $\vec\omega$, la sua punta si muove perpendicolarmente a lui, con velocità $\vec\omega\wedge\hat\imath'$. Per questo $d\hat\imath'/dt = \vec\omega\wedge\hat\imath'$: la derivata non è mai lungo il versore, ma ruotata di 90° nel verso della rotazione.` },
    { titolo: 'Derivata di un prodotto', testo: r`Se una grandezza è il prodotto di due cose che cambiano entrambe, la sua derivata ha due pezzi: la derivata della prima per la seconda, più la prima per la derivata della seconda. In $x'_P\,\hat\imath'$ cambiano sia il numero $x'_P$ (il punto si sposta) sia la freccia $\hat\imath'$ (il riferimento ruota): perciò compaiono due termini.` },
    { titolo: 'Doppio prodotto vettoriale nel piano', testo: r`Nel moto piano $\vec\omega$ è perpendicolare al piano. Fare $\vec\omega\wedge$ su un vettore del piano lo ruota di 90° e lo moltiplica per $\omega$; farlo due volte lo ruota di 180°, cioè lo capovolge. Ecco perché $\vec\omega\wedge[\vec\omega\wedge\vec r] = -\omega^2\vec r$: un vettore lungo $\vec r$ ma rivolto all'indietro, la centripeta.` },
    { titolo: 'Portata di un fluido incomprimibile', testo: r`La portata $q$ è il volume di olio che entra nel cilindro ogni secondo (m³/s). Se l'olio non si comprime, quel volume deve trovare posto spingendo il pistone: in un tempo $dt$ il pistone avanza di $dx$ e libera il volume $S\,dx$, con $S$ l'area del pistone. Quindi velocità del pistone uguale a portata diviso sezione.` },
  ],
  ipotesiPerche: [
    r`Dobbiamo distinguere chi guarda: il riferimento fisso (il telaio, la strada) e quello mobile attaccato al corpo che si muove. Il punto P non è attaccato al corpo, altrimenti basterebbe la formula fondamentale.`,
    r`Nel piano $\vec\omega$ è perpendicolare a ogni vettore del piano: è questo che permette di scrivere il doppio prodotto vettoriale come semplice $-\omega^2(P-O')$.`,
    r`Il ribaltabile è l'esempio della dispensa: contare i gradi di libertà ci dice che basta un dato, la portata, per conoscere il moto di tutto. L'olio incomprimibile serve per legare la portata alla velocità dello stelo.`,
    r`Se la portata non cambia, lo stelo esce dal cilindro sempre alla stessa velocità: l'accelerazione relativa è nulla e il poligono delle accelerazioni ha un termine in meno.`,
  ],
  disegnoGuida: r`Disegna prima il terreno e la cerniera fissa O in basso a sinistra; da lì il cassone 3, un rettangolo inclinato che sale verso destra. Poi, sotto il cassone, la seconda cerniera fissa A, un po' più a destra di O: da A parte il cilindro 1, quasi verticale, dentro cui entra lo stelo 2. Lo stelo finisce nella cerniera B, attaccata al cassone. Segna la portata q che entra nel cilindro. Ora la parte che conta: in B disegna $\vec V_{rel}$ lungo l'asse del cilindro (è lo stelo che esce), poi $\vec\omega_1\wedge(B-A)$ perpendicolare al cilindro, e infine $\vec V_B = \vec\omega_3\wedge(B-O)$, perpendicolare a OB, che chiude il triangolo. Dici a voce: riferimento mobile sul cilindro, punto P uguale a B.`,
  mappa: [
    'Scrivo la posizione di P: origine del riferimento mobile più le coordinate di P sulle frecce del riferimento mobile.',
    'Derivo una volta: la velocità vera è trascinamento più relativa.',
    'Derivo ancora: l\'accelerazione è trascinamento più relativa più un termine nuovo, Coriolis.',
    'Nel ribaltabile scelgo riferimento (il cilindro) e punto (B) e trovo la velocità relativa dalla portata.',
    'Uso che B è anche un punto del cassone, uguaglio le due espressioni e chiudo il poligono.',
  ],
  dims: {
    d014: {
      introduzione: r`Vogliamo la velocità vera di un punto che si muove rispetto a un corpo che a sua volta si muove. La strategia è scrivere la posizione del punto «passando» per il corpo: prima arrivo all'origine del riferimento mobile, poi mi sposto lungo le sue frecce. Poi derivo nel tempo, stando attento che cambiano sia le coordinate sia le frecce. Alla fine applichiamo tutto al pistone del ribaltabile.`,
      riepilogo: r`Abbiamo scritto la posizione di P come origine mobile più coordinate relative sui versori mobili. Derivando, ogni prodotto coordinata per versore ha dato due pezzi: uno con la derivata della coordinata (il punto si sposta nel riferimento) e uno con la derivata del versore (il riferimento ruota). Raggruppando, la velocità vera è risultata la somma del trascinamento, cioè la velocità che il punto avrebbe se fosse saldato al corpo, e della velocità relativa. Nel ribaltabile la portata dà la relativa e l'uguaglianza con il moto del cassone chiude il triangolo delle velocità.`,
    },
    d015: {
      introduzione: r`Ora deriviamo una seconda volta, partendo dalla velocità appena trovata. Ci aspetteremmo «trascinamento più relativa» anche per le accelerazioni, ma non è così: alcuni termini con $\vec\omega\wedge\vec V_{rel}$ non appartengono a nessuno dei due. La strategia è derivare con calma ogni pezzo, riconoscere ciò che già conosciamo (Rivals, Poisson) e contare quante volte compare $\vec\omega\wedge\vec V_{rel}$.`,
      riepilogo: r`Derivando la velocità abbiamo trovato i termini di Rivals, che formano il trascinamento, i termini con le derivate seconde delle coordinate, che formano la relativa, e due termini uguali $\vec\omega\wedge\vec V_{rel}$. Il primo nasce perché il braccio $(P-O')$ cambia anche per lo scorrimento del punto; il secondo perché i versori su cui è scritta la velocità relativa ruotano. Sommati danno Coriolis. Nel ribaltabile, con portata costante, resta un poligono con le due accelerazioni angolari come incognite.`,
    },
  },
  passi: {
    'd014.1': {
      tappa: 0,
      prima: r`Partiamo dalla posizione, che è la cosa più semplice. Per andare da O (l'origine fissa) fino al punto P posso fare una tappa intermedia: prima vado all'origine O' del riferimento mobile, quella attaccata al corpo, e poi da O' arrivo a P. Come si scrive con i vettori «andare da O a P passando per O'»? È la regola della somma testa-coda.`,
      dopo: r`La riga dice: la posizione vera di P è la posizione dell'origine mobile più la posizione di P vista da chi sta sul corpo. È solo una somma di frecce, vale sempre. Controllo: se P coincidesse con O', il secondo vettore sarebbe nullo e resterebbe la posizione di O', come deve essere.`,
    },
    'd014.2': {
      tappa: 0,
      prima: r`Il vettore $(P-O')$ è quello che vede chi sta sul corpo. Chi sta sul corpo usa i suoi assi, $x'$ e $y'$, con i loro versori $\hat\imath'$ e $\hat\jmath'$: frecce lunghe 1 che girano insieme al corpo. Come scrive questo osservatore la posizione di P? Con le sue coordinate, moltiplicate per i suoi versori.`,
      dopo: r`Qui ci sono due tipi di oggetti che cambiano nel tempo: i numeri $x'_P$ e $y'_P$, che cambiano se P scorre sul corpo, e le frecce $\hat\imath'$, $\hat\jmath'$, che cambiano direzione se il corpo ruota. Tienilo a mente: al momento di derivare, ognuno dei due darà il suo contributo.`,
    },
    'd014.3': {
      tappa: 1,
      prima: r`Ora deriviamo nel tempo la posizione, per avere la velocità. La derivata di $(O'-O)$ è facile: è la velocità dell'origine mobile. Per gli altri due termini chiediti: in $x'_P\,\hat\imath'$ cosa cambia? Cambiano entrambi i fattori, quindi serve la regola del prodotto, che dà due pezzi per ciascun termine.`,
      dopo: r`Abbiamo cinque termini: la velocità di O', due termini con le derivate delle coordinate ($\dot x'_P$, $\dot y'_P$) e due con le derivate dei versori. Chi dimentica gli ultimi due fa l'errore classico: pensa che i versori siano fissi. Lo sarebbero solo se il corpo traslasse senza ruotare.`,
    },
    'd014.4': {
      tappa: 1,
      prima: r`Restano da capire le derivate dei versori mobili. Un versore ha lunghezza fissa, quindi può solo girare, e gira con il corpo, cioè con $\vec\omega$. È il teorema di Poisson del richiamo. Sostituiscilo nei due termini e poi guarda cosa hanno in comune: $\vec\omega\wedge$ si può raccogliere davanti, e dentro resta una combinazione che hai già visto alla riga 2.`,
      dopo: r`Dentro la parentesi è ricomparso proprio $(P-O')$: i due termini insieme valgono $\vec\omega\wedge(P-O')$, la velocità dovuta alla rotazione del corpo. Controllo: se il corpo non ruota ($\omega = 0$) questo pezzo sparisce. Nella dispensa la riga intermedia ha dei refusi negli apici e nei versori: la versione giusta è questa.`,
    },
    'd014.5': {
      tappa: 1,
      prima: r`Ora rimettiamo insieme i cinque termini, raggruppandoli in modo furbo. Da una parte metti la velocità di O' e il termine $\vec\omega\wedge(P-O')$: ti ricordano qualcosa? Sono la formula fondamentale per un punto del corpo. Dall'altra parte restano i due termini con le derivate delle coordinate relative.`,
      dopo: r`Il primo gruppo è il **trascinamento**: la velocità che P avrebbe se fosse saldato al corpo. Il secondo è la **relativa**: la velocità che vede chi sta sul corpo. Due controlli: se P è fermo sul corpo, $\vec V_{rel} = 0$ e ritrovi la formula fondamentale; se il corpo è fermo, il trascinamento è nullo e la velocità vera è quella relativa.`,
    },
    'd014.6': {
      tappa: 3,
      prima: r`Passiamo al pistone. Ci serve la velocità dello stelo rispetto al cilindro, e il dato che abbiamo è la portata, cioè quanti metri cubi di olio entrano al secondo. L'olio non si comprime: il volume che entra in un tempo $dt$ deve essere uguale al volume liberato dal pistone che avanza. Quanto vale il volume liberato se il pistone avanza di $dx$?`,
      dopo: r`La velocità relativa è portata divisa sezione. Controllo delle unità: m³/s diviso m² dà m/s, una velocità. La direzione è quella dell'asse del cilindro, perché la coppia prismatica permette solo quel moto. Nella dispensa compare per refuso $dx/ds$: ovviamente è una derivata nel tempo.`,
    },
    'd014.7': {
      tappa: 3,
      prima: r`Ora scegliamo chi è il riferimento mobile e chi è il punto P. Conviene il riferimento sul cilindro 1, perché la portata ci dà proprio la velocità dello stelo rispetto al cilindro. Il punto P sarà B, che sta sullo stelo 2. Allora chiediti: il trascinamento è la velocità di B pensato attaccato al cilindro. Il cilindro come si muove?`,
      dopo: r`Il cilindro ruota attorno alla cerniera fissa A, e A ha velocità nulla: per questo $\vec V_A$ è barrato. Il trascinamento è quindi solo $\vec\omega_1\wedge(B-A)$, perpendicolare all'asse del cilindro. Nota che è perpendicolare a $\vec V_{rel}$: le due velocità formano un angolo retto.`,
    },
    'd014.8': {
      tappa: 4,
      prima: r`Abbiamo una sola equazione ma due incognite, $\omega_1$ e la velocità di B. Serve un'altra informazione. Guarda il disegno: B è anche una cerniera del cassone 3, che ruota attorno a O fisso. Che cosa dice la formula fondamentale per B visto come punto del cassone? Scritta, si può uguagliare alla riga precedente.`,
      dopo: r`Ora conosciamo tutto di $\vec V_{rel}$ (modulo q/S e direzione) e solo le direzioni degli altri due vettori: perpendicolare ad AB e perpendicolare a OB. Due moduli incogniti in un'equazione vettoriale piana, cioè due equazioni: il triangolo delle velocità si chiude e dà $\omega_1$ e $\omega_3$.`,
    },
    'd015.1': {
      tappa: 2,
      prima: r`Per l'accelerazione deriviamo la velocità della riga d014.5. Fai un termine alla volta. La derivata di $\vec V_{O'}$ è l'accelerazione dell'origine. $\vec\omega\wedge(P-O')$ è un prodotto: deriva prima $\vec\omega$, poi il braccio. La parte relativa è di nuovo coordinata per versore: regola del prodotto, due pezzi ciascuno.`,
      dopo: r`Sono sette termini. Per ora lasciamo in sospeso la derivata del braccio $d(P-O')/dt$ e le derivate dei versori: sono loro che nasconderanno Coriolis. Gli altri sono già leggibili: accelerazione dell'origine, termine con $\dot{\vec\omega}$, e le derivate seconde delle coordinate, cioè l'accelerazione vista dal corpo.`,
    },
    'd015.2': {
      tappa: 2,
      prima: r`Quanto vale la derivata del braccio $(P-O')$? In un corpo rigido diremmo $\vec\omega\wedge(P-O')$, perché la distanza fra due punti del corpo non cambia e il braccio può solo ruotare. Ma qui P scorre sul corpo. Chiediti: questo vettore cambia per quante ragioni? L'abbiamo già calcolato nelle velocità.`,
      dopo: r`Il braccio cambia per due motivi: ruota con il corpo e si allunga o si accorcia perché P vi scorre sopra. Il secondo motivo è proprio $\vec V_{rel}$. Questo pezzo in più, moltiplicato per $\vec\omega\wedge$ nella riga di prima, darà il **primo** $\vec\omega\wedge\vec V_{rel}$.`,
    },
    'd015.3': {
      tappa: 2,
      prima: r`Ora gli altri due termini rimasti in sospeso: le derivate dei versori moltiplicate per le velocità relative $\dot x'_P$ e $\dot y'_P$. È lo stesso trucco del passo d014.4: Poisson su ciascun versore, poi raccogli $\vec\omega\wedge$ davanti. Che combinazione resta dentro la parentesi questa volta?`,
      dopo: r`Dentro la parentesi c'è proprio la velocità relativa: questo è il **secondo** $\vec\omega\wedge\vec V_{rel}$. Il senso fisico: la velocità relativa è una freccia scritta sui versori del corpo, e quando il corpo ruota la freccia gira anche se P scorre sempre alla stessa velocità.`,
    },
    'd015.4': {
      tappa: 2,
      prima: r`Sostituendo la derivata del braccio, compare anche $\vec\omega\wedge[\vec\omega\wedge(P-O')]$, un doppio prodotto vettoriale. Nel piano $\vec\omega$ è perpendicolare a $(P-O')$. Ricorda il richiamo: fare due volte $\vec\omega\wedge$ ruota il vettore di 180° e lo moltiplica per $\omega^2$. Che vettore ottieni?`,
      dopo: r`È la centripeta: un vettore che punta da P verso O', di modulo $\omega^2$ per la distanza. È lo stesso termine che compare in Rivals. Il passaggio richiede il moto piano: nello spazio il doppio prodotto ha anche un'altra parte, e la dispensa lo dà per sottinteso.`,
    },
    'd015.5': {
      tappa: 2,
      prima: r`Ora mettiamo tutto insieme. Nella riga d015.1 sostituisci la derivata del braccio (passo 2), apri il prodotto e usa il passo 4 per il doppio prodotto; poi sostituisci le derivate dei versori (passo 3). Conta quante volte compare $\vec\omega\wedge\vec V_{rel}$: una volta dal braccio, una volta dai versori. Che cosa succede quando le sommi?`,
      dopo: r`I due $\vec\omega\wedge\vec V_{rel}$ sono uguali e si sommano: ecco il fattore 2. È il cuore della dimostrazione e la domanda tipica dell'orale. Controllo: se P non scorre ($\vec V_{rel}=0$) i due termini spariscono e torni a Rivals; se il corpo non ruota ($\omega=0$) spariscono anche loro.`,
    },
    'd015.6': {
      tappa: 2,
      prima: r`La riga d015.5 è giusta ma disordinata. Raggruppiamo come per le velocità. I primi tre termini (accelerazione di O', termine con $\dot{\vec\omega}$, centripeta) sono Rivals: che accelerazione avrebbe P se fosse saldato al corpo? Le derivate seconde delle coordinate sono ciò che vede chi sta sul corpo. Resta il termine con il 2.`,
      dopo: r`Accelerazione vera = trascinamento + relativa + Coriolis. Attenzione al pedice: qui $\vec a_t$ vuol dire trascinamento, non tangenziale come nella cinematica del punto. Coriolis è nullo in due casi di buon senso: se il riferimento non ruota o se il punto è fermo nel riferimento.`,
    },
    'd015.7': {
      tappa: 4,
      prima: r`Torniamo al ribaltabile, con la stessa scelta di prima: riferimento sul cilindro, punto B. Con la portata costante l'accelerazione relativa è nulla. Il trascinamento è Rivals per B attaccato al cilindro, che ruota attorno ad A fisso. Coriolis usa la velocità angolare del **riferimento**, cioè del cilindro. Dall'altra parte, B come punto del cassone attorno a O.`,
      dopo: r`Le incognite sono i moduli di $\dot\omega_1$ e $\dot\omega_3$: le centripete e Coriolis sono già noti dalle velocità. Di nuovo due moduli incogniti con direzioni note, quindi il poligono delle accelerazioni si chiude. Nota che Coriolis resta anche se $a_{rel}=0$: lo stelo scorre in un cilindro che ruota. La dispensa scrive per refuso $(B-D)$: è $(B-O)$.`,
    },
    'd015.8': {
      tappa: 4,
      prima: r`Ultimo controllo: quanto è grande Coriolis e dove punta? Nel piano $\vec\omega_1$ è perpendicolare alla velocità relativa, quindi il prodotto vettoriale ha modulo uguale al prodotto dei moduli, e ruota $\vec V_{rel}$ di 90° nel verso di $\omega_1$. Ricorda il fattore 2.`,
      dopo: r`Coriolis è perpendicolare all'asse del cilindro e vale $2\omega_1 V_{rel}$. Un'osservazione che fa bella figura: se raddoppi la portata, raddoppiano sia $V_{rel}$ sia $\omega_1$ (le velocità sono proporzionali a q), quindi Coriolis quadruplica. La dispensa non lo dice: è un ragionamento in più.`,
    },
  },
  racconto: r`Parto dall'esempio: lo stelo di un pistone oleodinamico scorre in un cilindro che ruota, quindi la formula fondamentale non basta. Scrivo la posizione di P come origine mobile più coordinate relative sui versori mobili e derivo: ogni prodotto dà due pezzi e, con Poisson, la velocità vera risulta trascinamento più relativa. Derivando ancora compare due volte $\vec\omega\wedge\vec V_{rel}$, una dal braccio $(P-O')$ che si allunga e una dai versori che ruotano: insieme fanno Coriolis, $2\vec\omega\wedge\vec V_{rel}$. Poi il ribaltabile: riferimento sul cilindro, punto B, $V_{rel}=q/S$; B è anche punto del cassone, uguaglio e chiudo il poligono. Con q costante $a_{rel}=0$, ma Coriolis resta e usa $\omega_1$, quella del cilindro.`,
};

// ------------------------------------------------------------------ cinematica analitica (d016)
const cinematicaAnalitica: LezioneArgomento = {
  perche: r`Con il metodo grafico risolvi un meccanismo disegnando poligoni di velocità e accelerazioni con riga e squadra. Funziona, ma va rifatto da capo per ogni posizione, e un computer non sa disegnare triangoli. Se vuoi sapere come si muove la biella di un motore per tutto un giro della manovella, ti serve un metodo che diventi un conto ripetibile. La cinematica analitica fa proprio questo: trasforma il meccanismo in equazioni. La domanda della lezione è: **come scrivo in equazioni che le aste di un meccanismo restano attaccate fra loro, e come ne ricavo posizioni, velocità e accelerazioni?**`,
  idea: r`Prendi un quadrilatero articolato: quattro aste unite da cerniere, una delle quali è il telaio fermo. Se parti da una cerniera e percorri le aste una dopo l'altra, torni al punto di partenza. Pensato con le frecce, è un poligono chiuso: la somma delle quattro frecce è zero. Questa frase, «il poligono si chiude», è tutto il vincolo del meccanismo.

Per scriverla in modo comodo si usano i numeri complessi. Una freccia nel piano ha una lunghezza e un angolo, e un numero complesso scritto come $V e^{i\varphi}$ contiene esattamente queste due informazioni. Il vantaggio è che una sola equazione complessa equivale a due equazioni reali: una per la parte reale (le componenti orizzontali) e una per la parte immaginaria (le verticali). Con due equazioni si trovano due incognite. La posizione richiede di risolvere seni e coseni, quindi è difficile; ma derivando nel tempo le incognite nuove, le velocità angolari, compaiono in modo semplice, lineare. Lo stesso per le accelerazioni.`,
  richiami: [
    { titolo: 'Numeri complessi e formula di Eulero', testo: r`Un numero complesso ha una parte reale e una immaginaria e si può disegnare come una freccia nel piano: la parte reale è la coordinata orizzontale, l'immaginaria quella verticale. La formula di Eulero dice che $e^{i\varphi} = \cos\varphi + i\sin\varphi$: è una freccia lunga 1 inclinata di $\varphi$. Moltiplicandola per $V$ ottieni una freccia lunga $V$ con la stessa inclinazione.` },
    { titolo: 'Quando un numero complesso è zero', testo: r`Un numero complesso è nullo solo se la sua freccia ha lunghezza zero, cioè se sono nulle **tutte e due** le coordinate. Quindi «numero complesso uguale a zero» vale due equazioni reali: parte reale nulla e parte immaginaria nulla. È come dire che una somma di forze è zero sia in orizzontale sia in verticale.` },
    { titolo: 'Derivare seno e coseno di un angolo che cambia', testo: r`Se l'angolo $\varphi$ cambia nel tempo, la derivata di $\cos\varphi$ è $-\sin\varphi\,\dot\varphi$ e quella di $\sin\varphi$ è $\cos\varphi\,\dot\varphi$: si deriva la funzione esterna e si moltiplica per la derivata dell'angolo (regola della catena). Se invece l'angolo è costante, la sua derivata è zero e il termine sparisce.` },
    { titolo: 'Sistema lineare e non lineare', testo: r`Un sistema è lineare quando le incognite compaiono solo al primo grado, moltiplicate per numeri noti: si risolve sempre con un procedimento fisso (sostituzione o Cramer) e ha una sola soluzione, salvo casi particolari. Se le incognite compaiono dentro seni e coseni il sistema è non lineare: può avere più soluzioni e serve un metodo numerico o geometrico.` },
  ],
  ipotesiPerche: [
    r`Servono i due meccanismi della dispensa e un piano complesso in cui disegnarli: l'asse reale fa da asse orizzontale, quello immaginario da verticale.`,
    r`Ci dice cosa è costante e quindi sparirà quando deriviamo: le lunghezze delle aste, l'angolo del telaio (quadrilatero) e la direzione della guida (manovellismo).`,
    r`Il moto della manovella è il dato che facciamo variare noi: noti angolo, velocità e accelerazione del membro motore, il resto del meccanismo deve seguirlo.`,
  ],
  disegnoGuida: r`Disegna gli assi: orizzontale l'asse reale, verticale l'asse immaginario. Poi le quattro cerniere A, B, C, D del quadrilatero. Ora trasforma ogni asta in una freccia, testa-coda: $V_1$ da A a B, $V_2$ da B a C, $V_3$ da C a D, $V_4$ da D ad A (il telaio). Le frecce devono girare tutte nello stesso senso lungo il contorno, così il poligono si chiude. In ogni coda disegna una piccola orizzontale e l'angolo $\varphi_j$, misurato in verso antiorario fino alla freccia. Infine dici a voce cosa è noto (le lunghezze, $\varphi_4$, $\varphi_1$) e cosa è incognito ($\varphi_2$, $\varphi_3$).`,
  mappa: [
    'Trasformo ogni asta in un numero complesso: lunghezza per esponenziale dell\'angolo.',
    'Scrivo che il poligono delle aste si chiude: somma uguale a zero.',
    'Spezzo l\'equazione in parte reale e immaginaria e trovo la posizione.',
    'Derivo una volta: il sistema delle velocità è lineare.',
    'Derivo ancora: anche le accelerazioni si trovano da un sistema lineare.',
    'Adatto lo schema al manovellismo, dove cambia una lunghezza invece di un angolo.',
  ],
  dims: {
    d016: {
      introduzione: r`Vogliamo un metodo che valga per qualsiasi meccanismo piano. La strategia ha sempre tre tempi: scrivo la chiusura del poligono delle aste (posizione), la derivo una volta (velocità), la derivo ancora (accelerazioni). Ogni volta l'equazione complessa vale due equazioni reali. Lo facciamo sul quadrilatero articolato e poi vediamo cosa cambia nel manovellismo.`,
      riepilogo: r`Abbiamo trattato ogni asta come una freccia complessa e imposto che il poligono delle aste si chiuda. Un'equazione complessa nulla vale due equazioni reali, quindi con due incognite il problema è determinato. La posizione si trova da un sistema non lineare, con più soluzioni possibili. Derivando, le velocità angolari incognite compaiono al primo grado: sistema lineare, che si risolve sempre tranne quando biella e bilanciere sono allineati. Derivando ancora, lo stesso per le accelerazioni. Nel manovellismo cambia solo che varia una lunghezza invece di un angolo.`,
    },
  },
  passi: {
    'd016.1': {
      tappa: 0,
      prima: r`Il primo passo è tradurre un'asta in matematica. Un'asta, nel piano, è una freccia: ha una lunghezza e un'inclinazione. Quale numero complesso contiene esattamente queste due informazioni? Ricorda la formula di Eulero: $e^{i\varphi}$ è una freccia lunga 1 inclinata di $\varphi$. Cosa devi fare per renderla lunga quanto l'asta?`,
      dopo: r`Il vettore è il modulo per l'esponenziale dell'angolo; sviluppando con Eulero, la parte reale $V\cos\varphi$ è la componente orizzontale e quella immaginaria $V\sin\varphi$ la verticale. Controllo: con $\varphi = 0$ la freccia è tutta orizzontale, con $\varphi = 90°$ tutta verticale, come ti aspetti.`,
    },
    'd016.2': {
      tappa: 1,
      prima: r`Ora scriviamo il vincolo. Guarda il disegno: parti da A, vai a B lungo la manovella, poi a C lungo la biella, a D lungo il bilanciere, e torni ad A lungo il telaio. Sei tornato al punto di partenza. Cosa significa, per la somma di quattro frecce messe testa-coda, ritornare al punto di partenza?`,
      dopo: r`La somma delle quattro frecce è zero: è l'equazione di chiusura. Contiene tutto ciò che il meccanismo impone, cioè che le aste restino attaccate nelle cerniere. Nella dispensa il secondo termine è stampato per refuso come $V_1e^{i\varphi_1}$: deve essere quello della biella, $V_2e^{i\varphi_2}$.`,
    },
    'd016.3': {
      tappa: 2,
      prima: r`Abbiamo un'equazione complessa, ma noi sappiamo risolvere equazioni con numeri reali. Ricorda il richiamo: quando un numero complesso è zero? Sviluppa ogni termine con Eulero, poi raccogli da una parte tutti i pezzi reali e dall'altra tutti i pezzi con $i$. Cosa devi imporre a ciascun gruppo?`,
      dopo: r`Due equazioni reali: la somma delle componenti orizzontali è zero, e anche quella delle verticali. È la stessa cosa che otterresti proiettando il poligono su x e su y. Attenzione: non basta la parte reale. Chi tiene una sola parte confonde questo metodo con il complex replacement delle vibrazioni, che è un'altra cosa.`,
    },
    'd016.4': {
      tappa: 2,
      prima: r`Contiamo le incognite. Le lunghezze delle aste sono fisse. Il telaio è fermo, quindi anche $\varphi_4$ è noto. L'angolo della manovella $\varphi_1$ è il dato che scegliamo noi. Quanti angoli restano da trovare? E guardando le due equazioni, in che forma compaiono: al primo grado o dentro seni e coseni?`,
      dopo: r`Restano due incognite, $\varphi_2$ e $\varphi_3$, e abbiamo due equazioni: il problema è determinato. Ma le incognite stanno dentro seni e coseni, quindi il sistema è non lineare. In generale ha due soluzioni: geometricamente, il punto C sta all'incrocio di due circonferenze, e ci sono due modi di montare il meccanismo.`,
    },
    'd016.5': {
      tappa: 3,
      prima: r`Ora le velocità: deriviamo nel tempo le due equazioni di posizione. Chiediti prima cosa è costante: le lunghezze e l'angolo del telaio, quindi il termine con $V_4$ sparisce. Per gli altri usa la regola della catena: la derivata di $V\cos\varphi$ è $-V\sin\varphi\,\dot\varphi$, quella di $V\sin\varphi$ è $V\cos\varphi\,\dot\varphi$.`,
      dopo: r`Ecco la buona notizia: le incognite nuove, $\dot\varphi_2$ e $\dot\varphi_3$, cioè le velocità angolari di biella e bilanciere, compaiono al primo grado, moltiplicate per numeri già noti (gli angoli li conosciamo dalla posizione). Il sistema è lineare. Controllo: se la manovella è ferma ($\dot\varphi_1=0$) l'unica soluzione è tutto fermo.`,
    },
    'd016.6': {
      tappa: 3,
      prima: r`Risolviamo il sistema lineare. Un modo elegante: torna alla forma complessa della velocità, dividi per $i$ e moltiplica per $e^{-i\varphi_3}$. Così il termine del bilanciere diventa reale; prendendo la parte immaginaria sparisce, e resta un'equazione nella sola $\dot\varphi_2$. Per $\dot\varphi_3$ fai lo stesso con $e^{-i\varphi_2}$.`,
      dopo: r`Le velocità angolari sono proporzionali alla velocità della manovella, come in ogni meccanismo a un grado di libertà. Il controllo più interessante è il denominatore: si annulla quando $\varphi_2 = \varphi_3$ (o differisce di 180°), cioè biella e bilanciere allineati. Lì il sistema non si risolve: è una configurazione singolare. La dispensa non scrive questa soluzione esplicita.`,
    },
    'd016.7': {
      tappa: 4,
      prima: r`Per le accelerazioni deriviamo ancora il sistema delle velocità. Ogni termine come $-V\sin\varphi\,\dot\varphi$ è il prodotto di due cose che cambiano: $\sin\varphi$ e $\dot\varphi$. Con la regola del prodotto ottieni due pezzi: uno con $\dot\varphi^2$ (derivando il seno) e uno con $\ddot\varphi$ (derivando la velocità angolare).`,
      dopo: r`I pezzi con $\dot\varphi^2$ sono noti, perché le velocità le abbiamo appena trovate: sono i termini centripeti. Le incognite $\ddot\varphi_2$ e $\ddot\varphi_3$ compaiono di nuovo al primo grado, con gli stessi coefficienti del sistema delle velocità. Quindi stessa matrice, stesso metodo, stessa configurazione singolare.`,
    },
    'd016.8': {
      tappa: 5,
      prima: r`Nel manovellismo i vettori sono tre: manovella, biella e il segmento dal pistone ad A, lungo la guida. Chiediti cosa cambia rispetto al quadrilatero: manovella e biella hanno lunghezza fissa, ma il terzo vettore ha **direzione** fissa (la guida, $\varphi_3=\pi$) e lunghezza che cambia, perché il pistone si sposta. Derivando, cosa compare al posto di $\dot\varphi_3$?`,
      dopo: r`Compare $\dot V_3$, la velocità del pistone, al posto della velocità angolare. Le incognite sono $\dot\varphi_2$ (la biella) e $\dot V_3$, e il sistema è ancora lineare. Controllo: con $\varphi_3=\pi$ si ha $\cos\varphi_3=-1$ e $\sin\varphi_3=0$, quindi il pistone compare solo nell'equazione orizzontale, come deve per un moto orizzontale.`,
    },
  },
  racconto: r`Nella cinematica analitica ogni asta diventa un vettore complesso $V e^{i\varphi}$. Il vincolo è che il poligono delle aste si chiude: la somma è zero. Un numero complesso è nullo solo se lo sono parte reale e immaginaria, quindi ho due equazioni reali per due incognite. Nel quadrilatero, note le lunghezze, l'angolo del telaio e quello della manovella, trovo $\varphi_2$ e $\varphi_3$ da un sistema non lineare, che ha in generale due soluzioni (i modi di montaggio). Derivando, le velocità angolari compaiono linearmente; derivando ancora, anche le accelerazioni. Nel manovellismo la guida ha direzione fissa e varia il modulo $V_3$, quindi compare $\dot V_3$. Chiudo dicendo che non è il complex replacement.`,
};

// ------------------------------------------------------------------ statica e dinamica dei meccanismi (d017–d023)
const staticaDinamica: LezioneArgomento = {
  perche: r`Un motore deve far girare una macchina che oppone resistenza: una pressa che schiaccia, un frantoio che rompe sassi, un pistone che comprime gas. Per scegliere il motore devi sapere **quanta coppia** serve, e per dimensionare perni e aste devi sapere **quanta forza** passa da un pezzo all'altro. Se poi i pezzi accelerano, servono forze in più solo per muovere le loro masse. La domanda della lezione è: **data la forza resistente, come trovo la coppia motrice e le forze in ogni cerniera, prima da fermo e poi in movimento?** E c'è una scorciatoia, il teorema delle forze vive, che lega coppia e forza senza passare dalle cerniere.`,
  idea: r`L'idea di fondo è smontare il meccanismo. Prendi un pezzo alla volta, lo isoli dagli altri e al posto dei collegamenti metti le forze che gli altri pezzi gli fanno. Se il pezzo è fermo, quelle forze devono bilanciarsi: niente spinta netta e niente rotazione netta. Due regole rendono il lavoro velocissimo: un pezzo tirato da due sole forze le ha sulla retta che unisce i due punti (pensa a una corda o a un'asta con due cerniere), e un pezzo con tre forze le ha che si incontrano in un punto. Quando passi dal pezzo al vicino, la forza fra loro cambia solo verso: azione e reazione.

Se i pezzi accelerano, il trucco è aggiungere delle forze «finte», la forza d'inerzia e la coppia d'inerzia, opposte all'accelerazione: è quello che senti in auto quando freni e vieni spinto in avanti. Con queste la dinamica torna a essere un equilibrio. Infine, guardando l'energia invece delle forze, il teorema delle forze vive dice che la potenza di tutte le forze esterne va a cambiare l'energia cinetica: le reazioni dei vincoli, che non lavorano, spariscono dal conto.`,
  richiami: [
    { titolo: 'Momento di una forza', testo: r`Il momento di una forza rispetto a un punto O misura quanto la forza fa ruotare attorno a O. Si scrive $(P-O)\wedge\vec F$ e il suo modulo è forza per braccio, dove il braccio è la distanza di O dalla retta su cui agisce la forza. Una forza la cui retta passa per O non fa ruotare: momento nullo. Per questo si sceglie come polo il punto dove passa una forza incognita.` },
    { titolo: 'Azione e reazione', testo: r`Se il corpo 1 spinge il corpo 2 con una forza, il corpo 2 spinge il corpo 1 con la forza uguale e opposta. Quando spingi un muro, il muro spinge te. Nella notazione della dispensa $\vec F_{1,2}$ è la forza che 1 fa su 2, e $\vec F_{2,1} = -\vec F_{1,2}$.` },
    { titolo: 'Reazioni dei vincoli', testo: r`Una cerniera impedisce al perno di spostarsi in qualsiasi direzione, quindi può spingere in qualsiasi direzione, ma sempre con una forza che passa per il perno: due incognite. Una guida prismatica impedisce solo lo spostamento di traverso, quindi spinge perpendicolarmente all'asse di scorrimento (senza attrito non può frenare lungo l'asse).` },
    { titolo: 'Seconda legge di Newton per un corpo rigido', testo: r`Per un corpo esteso, la somma delle forze esterne fa accelerare il baricentro: $\sum\vec F = M\vec a_G$. La somma dei momenti rispetto al baricentro fa cambiare la rotazione: $\sum \vec M_G = I_G\dot{\vec\omega}$. $I_G$, il momento d'inerzia, misura quanto è difficile far girare il corpo: cresce con la massa e soprattutto con la sua distanza dal baricentro.` },
    { titolo: 'Prodotto scalare e potenza', testo: r`Il prodotto scalare $\vec F\cdot\vec V$ vale $F V\cos\theta$: conta solo la parte della forza diretta come il movimento. Una forza perpendicolare al moto, come la reazione di una guida senza attrito, non dà potenza. Spingere un carrello di lato non lo fa andare avanti.` },
    { titolo: 'Energia cinetica', testo: r`L'energia cinetica è l'energia di movimento: per una massa puntiforme vale $\tfrac12 m V^2$. Per un corpo esteso si sommano i contributi di tutti i pezzettini. Il teorema dell'energia dice che il lavoro fatto dalle forze diventa variazione di energia cinetica: spingi una bici, il lavoro che fai la fa andare più veloce.` },
  ],
  ipotesiPerche: [
    r`Dobbiamo sapere che tipo di pezzi e di vincoli ci sono: dalla natura del vincolo (cerniera o guida) dipende che reazione può dare, cioè quante incognite introduce.`,
    r`In statica, trascurare masse e attrito rende le bielle «a due forze» e le guide capaci solo di spinte perpendicolari: sono queste semplificazioni che permettono le regole rapide. Partire dal corpo con la forza nota evita di inseguire incognite.`,
    r`In dinamica le forze d'inerzia dipendono da $\vec a_G$ e $\dot{\vec\omega}$: finché non li conosci non puoi scriverle. Per questo si risolve prima la cinematica.`,
    r`Il teorema delle forze vive nella forma della dispensa conta solo le forze esterne: vale se le forze interne non lavorano, cioè con corpi rigidi, senza motori interni né attrito.`,
  ],
  disegnoGuida: r`Disegna un corpo qualsiasi, una patata, e segna alcuni punti $P_1, P_2, \dots$ con le loro forze, poi un paio di coppie con frecce curve: sono le azioni esterne. Poi segna il baricentro G, la sua accelerazione $\vec a_G$ e una freccia curva per l'accelerazione angolare $\dot{\vec\omega}$. Ora la parte importante: sempre in G, disegna la forza d'inerzia **opposta** ad $\vec a_G$ e la coppia d'inerzia opposta a $\dot{\vec\omega}$, magari con un altro colore, per dire che sono termini aggiunti. Infine scegli il polo dei momenti in una cerniera dove c'è una reazione incognita, così quella non compare.`,
  mappa: [
    'Statica: per ogni pezzo isolato, forze e momenti a somma nulla; regole delle due e tre forze.',
    'Passo da un pezzo al vicino con azione e reazione, fino alla coppia motrice.',
    'Dinamica: aggiungo forza e coppia d\'inerzia e risolvo come in statica.',
    'Corpo incernierato: sposto forza e coppia d\'inerzia nella cerniera.',
    'Lavoro e potenza di una forza e di una coppia.',
    'Energia cinetica e teorema delle forze vive: potenza delle forze esterne uguale alla derivata dell\'energia.',
  ],
  dims: {
    d017: {
      introduzione: r`Partiamo dalla statica: il meccanismo è fermo (o va a velocità costante con masse trascurabili). La strategia è scrivere le equazioni cardinali per un pezzo isolato, contarle, ricavarne le due regole rapide (corpo a due forze, corpo a tre forze) e poi usarle sul manovellismo, per trovare la coppia che equilibra una forza sul pistone.`,
      riepilogo: r`Abbiamo visto che un corpo è in equilibrio se forze e momenti hanno somma nulla, e che nel piano questo dà tre equazioni per pezzo. Da lì sono uscite le regole: due forze stanno sulla stessa retta, tre forze sono concorrenti. Nel manovellismo siamo partiti dal pistone, dove la forza è nota; la biella a due forze ci ha dato la direzione della spinta e il triangolo delle forze i moduli. Sulla manovella il momento di quella spinta, con il braccio $b$, dà la coppia, nulla ai punti morti.`,
    },
    d018: {
      introduzione: r`Ora un meccanismo più ricco: il quadrilatero di un frantoio, con la forza del sasso sull'asta 3. Vogliamo la coppia motrice sulla manovella 1. La strategia è passare da un corpo libero al successivo: si parte da quello di cui sappiamo dire la direzione delle forze, si risolve e si porta la forza al vicino cambiando verso.`,
      riepilogo: r`Il principio di azione e reazione ci ha permesso di passare da un corpo all'altro. La biella a due forze ha fissato la direzione della spinta; sull'asta 3, con tre forze di cui due parallele, anche la reazione in D è parallela. Il momento attorno a D ha dato la spinta della biella, più grande della forza del sasso perché l'asta fa da leva. Infine, sulla manovella, quella spinta per il suo braccio dà la coppia motrice.`,
    },
    d019: {
      introduzione: r`Passiamo alla dinamica. Le equazioni di Newton per un corpo rigido hanno a destra massa per accelerazione e momento d'inerzia per accelerazione angolare. Il trucco è portare questi termini a sinistra, cambiati di segno, e trattarli come forze: così la dinamica diventa un equilibrio. Poi lo usiamo sull'asta con due pattini, risolvendo prima la cinematica.`,
      riepilogo: r`Abbiamo trasformato le equazioni della dinamica in un equilibrio aggiungendo la forza d'inerzia $-M\vec a_G$ e la coppia d'inerzia $-I_G\dot{\vec\omega}$. Nell'asta con due pattini abbiamo prima trovato la cinematica: con il CIR la velocità angolare, con Rivals le accelerazioni, scoprendo che il baricentro accelera anche se A va a velocità costante. Poi i momenti attorno ad A hanno dato la forza del pattino in B e la traslazione la forza da applicare al pattino A.`,
    },
    d020: {
      introduzione: r`Quando un corpo ruota attorno a una cerniera fissa O, le reazioni incognite stanno in O ed è comodo scrivere tutto rispetto a O. Ci chiediamo: se sposto forza e coppia d'inerzia da G a O, cosa cambia? La strategia: Rivals per $\vec a_G$, forza d'inerzia, trasporto dei momenti, e riconoscere alla fine il momento d'inerzia rispetto a O.`,
      riepilogo: r`L'accelerazione di G attorno al polo fisso ha una parte centripeta e una tangenziale; la forza d'inerzia ha quindi una parte centrifuga e una tangenziale. Spostandola in O la forza resta uguale, ma la coppia guadagna il momento della forza. La parte centrifuga passa per O e non conta; quella tangenziale aggiunge $M\,\overline{OG}^2$ al momento d'inerzia. La coppia d'inerzia in O è quindi $-I_O\dot{\vec\omega}$, con Steiner.`,
    },
    d021: {
      introduzione: r`Prima di arrivare al teorema delle forze vive servono due strumenti: il lavoro e la potenza. Partiamo dal lavoro di una forza su un piccolo spostamento, poi lo dividiamo per il tempo per avere la potenza, e infine vediamo quanto vale la potenza di una coppia applicata a un corpo che ruota.`,
      riepilogo: r`Il lavoro elementare è forza scalare spostamento: conta solo lo spostamento lungo la forza. Dividendo per il tempo, la potenza è forza scalare velocità del punto di applicazione. Per una coppia, cioè due forze opposte, la differenza delle velocità dei due punti è dovuta solo alla rotazione: con il prodotto misto la potenza diventa coppia per velocità angolare. Sono i due mattoni del teorema delle forze vive.`,
    },
    d022: {
      introduzione: r`Il teorema delle forze vive lega la potenza delle forze alla variazione dell'energia cinetica. La dispensa lo enuncia senza dimostrarlo, quindi lo deduciamo: capiamo quando le forze interne non lavorano, deriviamo l'energia cinetica e mostriamo che, moltiplicando le equazioni della dinamica per $\vec V_G$ e per $\vec\omega$, si ottiene proprio la potenza.`,
      riepilogo: r`Siamo partiti dal bilancio del lavoro di tutte le forze, interne comprese, e abbiamo visto che in un corpo rigido, senza attuatori né attrito, le interne non lavorano. Poi abbiamo derivato l'energia cinetica e, scrivendo la velocità di ogni punto con la formula fondamentale, abbiamo riconosciuto nella potenza delle forze esterne i primi membri delle cardinali. Sommando sui corpi si ha il teorema; nell'esempio del parallelogramma il membro trasla e il termine di rotazione sparisce.`,
    },
    d023: {
      introduzione: r`L'energia cinetica di un corpo rigido è la somma di quelle di tutti i suoi pezzettini. Vogliamo scriverla con poche grandezze: velocità del baricentro e velocità angolare. La strategia è esprimere la velocità di ogni pezzettino con la formula fondamentale, fare il quadrato, e vedere che il termine misto si cancella grazie alla definizione di baricentro.`,
      riepilogo: r`Abbiamo scritto la velocità di ogni pezzettino come velocità del baricentro più quella di rotazione attorno a G. Facendo il quadrato sono comparsi tre termini: il primo, sommato, dà tutta la massa con la velocità di G; il misto si cancella perché la somma delle masse per le distanze da G è nulla; l'ultimo dà il momento d'inerzia baricentrico per $\omega^2$. Energia cinetica = traslazione del baricentro + rotazione attorno al baricentro.`,
    },
  },
  passi: {
    'd017.1': {
      tappa: 0,
      prima: r`Che cosa vuol dire che un corpo sta fermo? Non deve partire in nessuna direzione e non deve mettersi a girare. Ciascuna delle due cose corrisponde a una condizione: una sulla somma delle forze e una sulla somma dei momenti, che misurano la tendenza a ruotare. Ricorda che anche le coppie fanno ruotare, quindi vanno nella seconda.`,
      dopo: r`Sono le equazioni cardinali della statica: risultante nulla e momento risultante nullo rispetto a un polo O che possiamo scegliere noi. Se valgono per un polo, valgono per tutti: scegliamo quello più comodo. Per un insieme di corpi valgono con le sole forze esterne, perché le interne si annullano a coppie.`,
    },
    'd017.2': {
      tappa: 0,
      prima: r`Contiamo quante equazioni scalari ci danno le cardinali nel piano. La somma delle forze è un vettore del piano: quante componenti ha? Il momento di forze che stanno nel piano, invece, è sempre perpendicolare al piano: quante componenti non nulle restano? Questo conteggio ci dice quante incognite possiamo trovare per ogni pezzo.`,
      dopo: r`Tre equazioni per ogni pezzo isolato: due per la traslazione (orizzontale e verticale) e una per la rotazione. Quindi, isolando un pezzo, possiamo trovare al massimo tre incognite. Se ne abbiamo di più, dobbiamo prima ricavare qualcosa da un pezzo vicino.`,
    },
    'd017.3': {
      tappa: 0,
      prima: r`Prima regola rapida: un corpo su cui agiscono solo due forze, in A e in B. Pensa a una corda tirata ai capi. La somma delle forze nulla dice che sono opposte. Basta? Due forze opposte su rette diverse farebbero girare il corpo. Scrivi allora i momenti attorno ad A: la forza in A non conta, e quella in B deve avere momento nullo. Che cosa vuol dire per la sua direzione?`,
      dopo: r`La forza in B deve essere diretta lungo AB, e quindi anche quella in A: entrambe sulla congiungente delle due cerniere. È il caso della biella con massa trascurabile e senza carichi in mezzo: trasmette forza solo lungo la sua lunghezza, come un puntone o un tirante. Un'informazione gratis: sappiamo la direzione senza fare conti.`,
    },
    'd017.4': {
      tappa: 0,
      prima: r`Seconda regola: un corpo con tre forze, di cui conosciamo due direzioni. Prolunga queste due rette finché si incontrano in un punto H. Ora scrivi i momenti proprio attorno a H. Le prime due forze passano per H, quindi momento nullo. Che cosa deve fare la terza forza perché anche il suo momento attorno a H sia zero?`,
      dopo: r`Anche la terza forza deve passare per H: le tre rette si incontrano in un punto. Così di una forza di cui non sapevamo nulla ricaviamo la direzione. Esempio: se carichi la biella fra le cerniere, non è più a due forze, e la forza in B si trova con questa regola, non lungo la biella. Se due forze sono parallele, il punto H va «all'infinito» e la terza è parallela.`,
    },
    'd017.5': {
      tappa: 0,
      prima: r`Applichiamo al manovellismo con una forza F nota sul pistone. Partiamo proprio dal pistone, perché lì conosciamo una forza. Le altre due: la spinta della biella, che è a due forze e quindi spinge lungo BC, e la reazione della guida, perpendicolare all'asse. Le prime due passano per C, quindi anche la reazione. Ora scrivi che la somma è nulla e guarda il triangolo.`,
      dopo: r`Nel triangolo la componente orizzontale della spinta della biella bilancia F, e quella verticale è equilibrata dalla guida. Quindi la spinta è $F/\cos\gamma$, più grande di F, e la guida reagisce con $F\tan\gamma$. Controllo: se la biella è orizzontale ($\gamma = 0$) la spinta è F e la guida non lavora.`,
    },
    'd017.6': {
      tappa: 0,
      prima: r`Passiamo alla manovella. La biella le fa una forza $\vec F_{2,1}$ in B, opposta a quella che la manovella fa sulla biella; in A c'è la reazione della cerniera; poi la coppia che cerchiamo. Con la traslazione trovi subito la reazione. Per la coppia scegli il polo in A, così la reazione sparisce: la coppia deve bilanciare il momento di $\vec F_{2,1}$.`,
      dopo: r`La coppia è **opposta** al momento della forza della biella: per questo c'è il segno meno. La dispensa scrive il segno più, ed è sbagliato, anche se poi dice correttamente che la coppia è oraria. Il modulo è forza per braccio, dove il braccio $b$ è la distanza di A dalla retta della biella, non la lunghezza della manovella.`,
    },
    'd017.7': {
      tappa: 0,
      prima: r`Mettiamo insieme: la spinta della biella è $F/\cos\gamma$ e il braccio è $b = r\sin(\theta+\gamma)$. Sostituisci nella coppia. Poi due controlli. Primo: cosa succede quando manovella e biella sono allineate, cioè ai punti morti? Secondo: senza masse e senza attrito, che relazione dovrebbe esserci fra la potenza della coppia e quella della forza sul pistone?`,
      dopo: r`Ai punti morti il braccio è zero: una forza sul pistone, anche grandissima, non dà coppia alla manovella. Per superarli serve un volano. Il secondo controllo dice che la potenza della coppia più quella della forza fa zero: quello che entra da una parte esce dall'altra, ed è un anticipo del teorema delle forze vive.`,
    },
    'd018.1': {
      tappa: 1,
      prima: r`Per passare da un corpo libero al successivo ci serve una regola sulle forze che due pezzi si scambiano. Ricorda il richiamo: se il corpo $i$ spinge il corpo $j$, che cosa fa $j$ su $i$? Scritto con la notazione a due indici della dispensa, il primo indice è chi spinge e il secondo chi riceve.`,
      dopo: r`La stessa interazione compare due volte, sui due corpi, con verso opposto. È questo che ci fa «camminare» lungo il meccanismo: risolto un corpo, conosciamo la forza che riceve dal vicino, e cambiando segno sappiamo quella che il vicino riceve da lui. La dispensa lo usa senza nominarlo.`,
    },
    'd018.2': {
      tappa: 1,
      prima: r`Da quale corpo conviene partire? Sull'asta 3 c'è la forza del sasso, nota, ma anche due forze sconosciute. Guarda invece la biella 2: niente carichi in mezzo, massa trascurata, solo le due cerniere B e C. Che regola vale per un corpo con due sole forze? E che cosa ci dice, per azione e reazione, sulla forza che la biella fa sull'asta 3?`,
      dopo: r`La biella trasmette forza solo lungo BC, e quindi anche la forza che spinge l'asta 3 in C è parallela a BC. Non ne conosciamo ancora il modulo, ma la direzione sì: è proprio ciò che serve per risolvere l'asta 3.`,
    },
    'd018.3': {
      tappa: 1,
      prima: r`Sull'asta 3 agiscono tre forze: quella del sasso, parallela a BC per ipotesi; quella della biella, anche lei parallela a BC; e la reazione della cerniera D, sconosciuta. Due direzioni note e parallele: dove si incontrano le loro rette? Applica la regola delle tre forze a questo caso particolare.`,
      dopo: r`Due rette parallele si incontrano «all'infinito», quindi anche la terza forza deve essere parallela: la reazione in D è parallela a BC. Ragiona anche così: la somma di due forze parallele è parallela a loro, e la terza deve annullarla. Ora le tre forze hanno tutte la stessa direzione.`,
    },
    'd018.4': {
      tappa: 1,
      prima: r`Ci servono i moduli. Scegli il polo in D, così la reazione in D sparisce. Restano la forza del sasso, con braccio $b_f$ (la distanza di D dalla sua retta), e quella della biella, con braccio $b$. Nel disegno hanno versi opposti, quindi fanno ruotare l'asta in versi opposti. Scrivi che i due momenti si bilanciano e ricava la forza della biella.`,
      dopo: r`La forza nella biella è quella del sasso moltiplicata per $b_f/b$. Siccome il sasso è più in alto, $b_f$ è più grande di $b$, e la biella deve spingere più forte del sasso: l'asta 3 è una leva. Controllo: se i bracci fossero uguali, le due forze sarebbero uguali.`,
    },
    'd018.5': {
      tappa: 1,
      prima: r`Ora la reazione in D. Usa la traslazione: la somma delle tre forze sull'asta 3 è nulla. Sono tutte parallele, quindi puoi lavorare con i moduli, ma stai attento ai versi: la forza della biella e quella del sasso sono opposte. La reazione deve compensare quello che resta.`,
      dopo: r`La reazione in D vale la differenza fra la forza della biella e quella del sasso, ed è nel verso della forza del sasso, perché la biella spinge più forte. Controllo: con bracci uguali le due forze sarebbero uguali e la cerniera D non lavorerebbe.`,
    },
    'd018.6': {
      tappa: 1,
      prima: r`Torniamo alla manovella 1. Per azione e reazione, la forza che la biella le fa in B è opposta a quella che riceve, e in modulo uguale alla spinta trovata. Sulla manovella ci sono questa forza, la reazione in A e la coppia motrice. Polo in A: la reazione sparisce e la coppia deve bilanciare il momento della forza della biella. Qual è il suo braccio?`,
      dopo: r`La coppia motrice è la forza nella biella per il braccio $b_{2,1}$, la distanza di A dalla retta BC; è oraria per bilanciare il momento antiorario della forza in B. Attenzione a due errori: il braccio non è la lunghezza della manovella, e la forza non è quella del sasso, ma quella amplificata dalla leva.`,
    },
    'd019.1': {
      tappa: 2,
      prima: r`Ora il corpo accelera. Scriviamo la seconda legge di Newton per un corpo rigido, dal richiamo. Le forze esterne che cosa fanno accelerare? E i momenti, presi rispetto al baricentro, che cosa fanno cambiare? Ricorda che le coppie entrano solo nella seconda equazione, perché fanno ruotare senza spingere.`,
      dopo: r`Sono le equazioni cardinali della dinamica: forze esterne uguale massa per accelerazione del baricentro, momenti uguale momento d'inerzia per accelerazione angolare. Si usano in due modi: dinamica diretta, dalle forze alle accelerazioni; o inversa, come faremo, dal moto voluto alle forze che servono. Controllo: con accelerazioni nulle ritrovi la statica.`,
    },
    'd019.2': {
      tappa: 2,
      prima: r`Il trucco: porta i termini $M\vec a_G$ e $I_G\dot{\vec\omega}$ a sinistra. Passando dall'altra parte cambiano segno. Ora dai un nome a questi termini col segno meno: forza d'inerzia e coppia d'inerzia. Se li tratti come forze e coppie esterne qualsiasi, che forma assumono le due equazioni?`,
      dopo: r`Le equazioni sono diventate un equilibrio: forze più forza d'inerzia uguale zero, momenti più coppia d'inerzia uguale zero. Quindi possiamo usare tutti gli strumenti della statica. La forza d'inerzia è opposta all'accelerazione: quando l'auto frena, ti senti spinto in avanti. Il nome «D'Alembert» è nostro: la dispensa non lo usa.`,
    },
    'd019.3': {
      tappa: 2,
      prima: r`Applicazione: asta AB con il pattino A che scende lungo una guida verticale a velocità costante e il pattino B su una guida orizzontale. Prima la cinematica. Le velocità di A e B hanno direzione nota, lungo le guide. Dove sta il centro di istantanea rotazione? Traccia le perpendicolari alle due velocità: l'orizzontale per A e la verticale per B.`,
      dopo: r`La velocità angolare è la velocità di A divisa per la sua distanza dal CIR, che vale $\overline{AB}\cos\alpha$. Il verso è antiorario, perché A deve scendere. Poi la velocità di B si trova moltiplicando $\omega_2$ per la distanza di B dal CIR: $V_A\tan\alpha$, verso destra. Controllo: con l'asta quasi verticale ($\alpha$ vicino a 90°) B scappa velocissimo.`,
    },
    'd019.4': {
      tappa: 2,
      prima: r`Ora le accelerazioni. A va a velocità costante, quindi $\vec a_A = 0$. Scrivi Rivals fra A e B: tre vettori. L'accelerazione di B è orizzontale (B sta sulla guida); il termine tangenziale è perpendicolare ad AB, modulo incognito; la centripeta è tutta nota. Due moduli incogniti e direzioni note: il poligono si chiude.`,
      dopo: r`L'accelerazione di B è verso sinistra e l'accelerazione angolare è oraria: l'asta rallenta la sua rotazione. Sembra strano, perché A va a velocità costante, ma la velocità angolare $V_A/(\overline{AB}\cos\alpha)$ cambia con l'angolo. Nota anche che entrambe crescono con $V_A^2$.`,
    },
    'd019.5': {
      tappa: 2,
      prima: r`Per scrivere la forza d'inerzia ci serve l'accelerazione del baricentro G, che sta a metà dell'asta. Scrivi Rivals fra A e G, con $\vec a_A = 0$. Confronta con Rivals fra A e B: i due termini contengono $(G-A)$ invece di $(B-A)$. Quanto è lungo $(G-A)$ rispetto a $(B-A)$?`,
      dopo: r`$(G-A)$ è la metà di $(B-A)$, quindi entrambi i termini sono la metà: $\vec a_G$ è metà di $\vec a_B$, orizzontale verso sinistra. Il baricentro accelera anche se A va a velocità costante, perché l'asta ruota in modo non uniforme. La forza d'inerzia $M|a_G|$ sarà quindi orizzontale verso destra.`,
    },
    'd019.6': {
      tappa: 2,
      prima: r`Ora le forze sull'asta: peso in G, forza d'inerzia in G (verso destra), coppia d'inerzia (antioraria, opposta a $\dot\omega_2$), la forza del pattino A e quella del pattino B, verticale perché il pattino è a due forze. Polo in A, così la forza in A sparisce. Per ogni forza trova braccio e verso di rotazione, poi scrivi la somma dei momenti uguale a zero.`,
      dopo: r`Peso e forza d'inerzia fanno ruotare in versi opposti, e la coppia d'inerzia si aggiunge dalla parte della forza in B. Risolvendo si trova la forza verticale del pattino B. Controllo: da fermo (forza e coppia d'inerzia nulle) resta $Mg\,\overline{AG}/\overline{AB}$, metà del peso, come per un'asta appoggiata. I versi sono quelli del disegno della dispensa.`,
    },
    'd019.7': {
      tappa: 2,
      prima: r`Resta la traslazione dell'asta, che dà le due componenti della forza in A. In orizzontale agiscono solo la forza d'inerzia e la componente orizzontale della forza in A; in verticale il peso, la forza in B e la componente verticale in A. Poi guarda il pattino A, senza massa: chi deve bilanciare la spinta verticale dell'asta su di lui?`,
      dopo: r`La componente orizzontale della forza in A bilancia la forza d'inerzia; quella verticale, sommata alla forza in B, regge il peso. Sul pattino A la guida spinge solo in orizzontale, quindi la componente verticale va bilanciata dalla forza che applichiamo noi: è la forza cercata per tenere $V_A$ costante.`,
    },
    'd020.1': {
      tappa: 3,
      prima: r`Corpo incernierato in un punto fisso O che ruota con $\omega$ e $\dot\omega$. Ci serve l'accelerazione del baricentro. Quale formula lega l'accelerazione di due punti dello stesso corpo? Usala fra O e G, ricordando che O è fermo.`,
      dopo: r`È Rivals con $\vec a_O = 0$. La parte normale punta da G verso O ed è grande $\omega^2\,\overline{OG}$; la tangenziale è perpendicolare a OG ed è grande $\dot\omega\,\overline{OG}$. Controllo: se il corpo gira a velocità costante resta solo la centripeta.`,
    },
    'd020.2': {
      tappa: 3,
      prima: r`Ora la forza d'inerzia: per definizione è meno massa per accelerazione del baricentro. Cambia il segno ai due pezzi della riga precedente. La coppia d'inerzia baricentrica è meno momento d'inerzia per accelerazione angolare. Chiediti: la parte normale, cambiata di segno, dove punta?`,
      dopo: r`La parte normale cambiata di segno punta verso l'esterno: è la forza centrifuga che senti in curva. La parte tangenziale è opposta all'accelerazione tangenziale. La coppia d'inerzia si oppone all'accelerazione angolare. Tutte e tre sono «applicate» in G.`,
    },
    'd020.3': {
      tappa: 3,
      prima: r`Vogliamo spostare forza e coppia d'inerzia da G a O, dove sono le reazioni incognite. Se sposti una forza parallelamente a se stessa, la spinta non cambia, ma l'effetto di rotazione sì. Che cosa devi aggiungere alla coppia perché il sistema spostato faccia ruotare il corpo come prima? È il momento della forza rispetto al nuovo polo.`,
      dopo: r`La forza resta la stessa; la coppia diventa quella baricentrica più il momento della forza d'inerzia rispetto a O. È il trasporto dei momenti. Il segno è più, perché il momento rispetto a O di una forza applicata in G è $(G-O)\wedge\vec F$.`,
    },
    'd020.4': {
      tappa: 3,
      prima: r`Calcoliamo il momento aggiunto, un pezzo alla volta. La parte centrifuga è diretta lungo OG: qual è il suo braccio rispetto a O? La parte tangenziale invece è perpendicolare a OG: il braccio è tutta la distanza $\overline{OG}$. Per il verso, ricorda che la forza tangenziale è opposta a $\dot{\vec\omega}$.`,
      dopo: r`La parte centrifuga passa per O e non dà momento. Quella tangenziale vale $M\,\overline{OG}\,\dot\omega$ e ha braccio $\overline{OG}$: il momento è $M\,\overline{OG}^2\dot\omega$, opposto a $\dot{\vec\omega}$. Nota che $\overline{OG}$ compare al quadrato: una volta nella forza e una nel braccio.`,
    },
    'd020.5': {
      tappa: 3,
      prima: r`Sommiamo la coppia baricentrica $-I_G\dot{\vec\omega}$ e il momento appena trovato $-M\,\overline{OG}^2\dot{\vec\omega}$. Entrambi sono proporzionali a $\dot{\vec\omega}$ con il segno meno: raccogli. La parentesi che resta ti ricorda qualcosa? È il teorema di Huygens–Steiner.`,
      dopo: r`La parentesi è il momento d'inerzia rispetto a O, quindi la coppia d'inerzia in O è $-I_O\dot{\vec\omega}$. Controllo: allontanando la cerniera dal baricentro $I_O$ cresce, e il corpo è più difficile da accelerare, come quando apri una porta pesante. Se O coincide con G si torna a $I_G$.`,
    },
    'd021.1': {
      tappa: 4,
      prima: r`Che cosa intendiamo per lavoro di una forza? Una forza «lavora» quando il suo punto di applicazione si sposta e lei lo accompagna o lo ostacola. Su un piccolo spostamento $d\vec P$ del punto, quale operazione fra due vettori misura quanto forza e spostamento vanno nella stessa direzione?`,
      dopo: r`Il lavoro elementare è il prodotto scalare fra forza e spostamento del punto di applicazione. Attenzione: conta lo spostamento del punto dove la forza è applicata, non quello di un punto qualsiasi del corpo. Se quel punto è fermo, come una cerniera fissa, la forza non lavora.`,
    },
    'd021.2': {
      tappa: 4,
      prima: r`Scriviamo il prodotto scalare con i moduli. Chiama $\theta$ l'angolo fra la forza e lo spostamento. Quale pezzo dello spostamento conta davvero? Pensa a portare una valigia camminando in piano: la forza è verso l'alto, lo spostamento orizzontale.`,
      dopo: r`Conta solo la componente dello spostamento lungo la forza: per questo c'è il coseno. Con la valigia $\theta = 90°$ e il lavoro è zero. Se lo spostamento ha verso opposto alla forza, il coseno è negativo e anche il lavoro: la forza frena, come l'attrito.`,
    },
    'd021.3': {
      tappa: 4,
      prima: r`La potenza misura quanto in fretta si fa lavoro: è il lavoro diviso per il tempo in cui viene fatto. Dividi il lavoro elementare per $dt$. La forza resta com'è; lo spostamento diviso per il tempo diventa che cosa?`,
      dopo: r`La potenza è forza scalare velocità del punto di applicazione, cioè $F V\cos\theta$. Unità: newton per metri al secondo, cioè watt. Controllo: la reazione di una guida senza attrito è perpendicolare alla velocità del pattino, quindi non dà potenza; per questo sparirà nel teorema delle forze vive.`,
    },
    'd021.4': {
      tappa: 4,
      prima: r`Una coppia è fatta di due forze uguali e opposte, $\vec F$ in P e $-\vec F$ in Q. Somma le loro potenze e raccogli $\vec F$. La differenza delle velocità di due punti dello stesso corpo è data dalla formula fondamentale. Poi c'è un passaggio da prodotto misto: in $\vec a\cdot(\vec b\wedge\vec c)$ puoi permutare i tre vettori in ordine circolare.`,
      dopo: r`La potenza della coppia è il vettore coppia scalare la velocità angolare. Quindi una coppia, pur con risultante nulla, lavora se il corpo ruota. Controllo: se la coppia gira nello stesso verso del corpo la potenza è positiva (motrice), se gira contro è negativa (resistente). La dispensa la usa senza ricavarla.`,
    },
    'd022.1': {
      tappa: 5,
      prima: r`Il teorema dell'energia dice che il lavoro di tutte le forze diventa variazione di energia cinetica. «Tutte» vuol dire esterne e anche interne, cioè quelle che i pezzi del sistema si scambiano. Perché le interne non si possono buttare via subito, come nelle cardinali? Pensa a un muscolo che si contrae.`,
      dopo: r`La riga somma lavoro esterno e interno. Nelle cardinali le forze interne spariscono perché sono a coppie opposte; nel lavoro no, perché due forze opposte su punti che si avvicinano lavorano entrambe: il muscolo, o un attuatore, porta energia nel sistema.`,
    },
    'd022.2': {
      tappa: 5,
      prima: r`Quando allora le forze interne non lavorano? Prendi due punti P e Q dello stesso corpo rigido, che si fanno forze opposte lungo la congiungente. Somma le due potenze e raccogli la forza: resta la differenza delle velocità. Nel corpo rigido quanto vale, e in che direzione è rispetto a $(P-Q)$?`,
      dopo: r`La differenza di velocità è $\vec\omega\wedge(P-Q)$, perpendicolare alla congiungente, mentre la forza è lungo la congiungente: potenza nulla. Lo stesso vale in una cerniera, dove i due corpi hanno lo stesso punto e la stessa velocità. Con un attuatore invece la distanza cambia e la potenza non è più nulla.`,
    },
    'd022.3': {
      tappa: 5,
      prima: r`Ci serve la derivata dell'energia cinetica di un corpo rigido piano, che vale $\tfrac12 M V_G^2 + \tfrac12 I_G\omega^2$ (lo vediamo nella prossima dimostrazione). Derivane ogni termine nel tempo, con $M$ e $I_G$ costanti. Ricorda che $V_G^2$ è $\vec V_G\cdot\vec V_G$: derivando il prodotto scalare escono due termini uguali.`,
      dopo: r`Il 2 della derivata del quadrato si semplifica con l'½. Il risultato contiene il prodotto scalare fra velocità e accelerazione: se l'accelerazione è perpendicolare alla velocità, come in una curva a velocità costante, l'energia non cambia, e infatti non stai accelerando nel senso della velocità.`,
    },
    'd022.4': {
      tappa: 5,
      prima: r`Ora la dimostrazione vera, per un corpo. Scrivi la potenza di tutte le forze e coppie esterne. Per ogni punto di applicazione usa la formula fondamentale con il polo in G. Separa i termini: quelli con $\vec V_G$ e quelli con la rotazione; per questi ultimi usa il prodotto misto. Le parentesi che ottieni sono i primi membri di quali equazioni?`,
      dopo: r`Le parentesi sono la somma delle forze e la somma dei momenti più le coppie: le due cardinali della dinamica. Sostituendo, la potenza delle forze esterne diventa $M\vec a_G\cdot\vec V_G + I_G\dot{\vec\omega}\cdot\vec\omega$, che è proprio la derivata dell'energia cinetica del passo precedente. Il teorema è dimostrato per un corpo.`,
    },
    'd022.5': {
      tappa: 5,
      prima: r`Ora un meccanismo con tanti corpi. Scrivi la riga di prima per ciascun corpo e somma tutto. Nelle forze compariranno anche quelle che i corpi si scambiano nelle cerniere: per il passo 2, che potenza danno complessivamente? Resta la forma che scrive la dispensa.`,
      dopo: r`Potenza delle forze esterne più potenza delle coppie esterne uguale derivata dell'energia cinetica totale. Le reazioni dei vincoli fissi e delle cerniere interne non compaiono: per questo il teorema è una scorciatoia. Con masse nulle il secondo membro è zero, ed è il bilancio delle potenze usato nel glifo. Nella dispensa c'è un refuso nel limite della somma.`,
    },
    'd022.6': {
      tappa: 5,
      prima: r`Esempio della dispensa: le cerniere A, H, E, D formano un parallelogramma e il membro HE ha massa; le altre masse si trascurano. Primo: in un parallelogramma articolato il lato opposto al telaio resta sempre parallelo a se stesso. Che velocità angolare ha? Secondo: quali forze lavorano? La forza sul pistone e il peso del membro.`,
      dopo: r`Il membro HE trasla senza ruotare, quindi il termine di rotazione $I_G\omega\dot\omega$ sparisce. Resta: potenza della forza sul pistone più potenza del peso uguale $M_1\vec V_{G,1}\cdot\vec a_{G,1}$. Nota la scorciatoia: con una sola equazione trovi la forza sul pistone senza calcolare nessuna reazione.`,
    },
    'd023.1': {
      tappa: 5,
      prima: r`Partiamo dalla definizione. Un corpo esteso è fatto di tanti pezzettini, ciascuno con la sua massa e la sua velocità. Ogni pezzettino ha l'energia cinetica di una massa puntiforme. Come scrivi l'energia cinetica totale?`,
      dopo: r`È la somma delle energie di tutti i pezzettini, oppure l'integrale sulla massa. Corretto ma inutilizzabile così: le velocità dei pezzettini sono infinite. Ci serve un modo per scriverle con poche grandezze del corpo intero.`,
    },
    'd023.2': {
      tappa: 5,
      prima: r`Il corpo è rigido, quindi le velocità dei suoi punti non sono indipendenti. Quale formula dà la velocità di un punto qualsiasi conoscendo quella di un altro punto e la velocità angolare? Usala scegliendo come punto di riferimento il baricentro G. Tra poco capiremo perché proprio G.`,
      dopo: r`Ogni pezzettino ha la velocità del baricentro più quella dovuta alla rotazione attorno a G. Ora le velocità di tutti i punti sono scritte con due sole grandezze: $\vec V_G$ e $\vec\omega$.`,
    },
    'd023.3': {
      tappa: 5,
      prima: r`Nell'energia serve il quadrato della velocità. Il quadrato di una somma di due vettori si fa come per i numeri: quadrato del primo, quadrato del secondo, più il doppio prodotto, che qui è un prodotto scalare. Applicalo alla velocità della riga precedente.`,
      dopo: r`Tre termini: il quadrato della velocità del baricentro, uguale per tutti i pezzettini; un termine misto, che dipende dalla posizione del pezzettino; e il quadrato della velocità di rotazione. Ora moltiplichiamo per la massa e sommiamo, un termine alla volta.`,
    },
    'd023.4': {
      tappa: 5,
      prima: r`Il termine misto, sommato su tutti i pezzettini. $\vec V_G$ e $\vec\omega$ sono uguali per tutti, quindi escono dalla somma. Che cosa resta dentro? La somma delle masse per la loro posizione rispetto a G. Ricorda la definizione di baricentro: è il punto rispetto a cui le masse «si bilanciano».`,
      dopo: r`Per definizione di baricentro quella somma è zero, quindi il termine misto sparisce. Punto per punto non è zero: si annulla solo la somma. Ecco perché si sceglie G come punto di riferimento: con un altro punto il termine misto resterebbe.`,
    },
    'd023.5': {
      tappa: 5,
      prima: r`Ultimo termine: il quadrato della velocità di rotazione. Nel piano $\vec\omega$ è perpendicolare a $(P_k-G)$, quindi il modulo del prodotto vettoriale è il prodotto dei moduli. Moltiplica per la massa e somma: $\omega^2$ esce, e dentro resta la somma delle masse per le distanze da G al quadrato. Come si chiama?`,
      dopo: r`Quella somma è il momento d'inerzia baricentrico $I_G$: misura come la massa è distribuita attorno a G. Più la massa è lontana dal baricentro, più grande è $I_G$, e più energia serve per far girare il corpo alla stessa velocità angolare.`,
    },
    'd023.6': {
      tappa: 5,
      prima: r`Ora rimetti insieme i pezzi, ricordando l'½ davanti alla somma. Il primo termine, sommato, dà la massa totale per $V_G^2$; il misto è zero; l'ultimo dà $I_G\omega^2$. Come si scrive allora l'energia cinetica del corpo?`,
      dopo: r`Energia di traslazione del baricentro, con tutta la massa, più energia di rotazione attorno al baricentro. Controlli: un disco che gira su se stesso ha $V_G = 0$ ma energia cinetica; un corpo che trasla ha $\omega = 0$ e torna $\tfrac12 M V_G^2$. Non mischiare $V_G$ con $I_O$: con $V_G$ va $I_G$.`,
    },
  },
  racconto: r`Per trovare le forze in un meccanismo isolo un membro alla volta e scrivo le equazioni cardinali: risultante nulla e momento nullo, tre equazioni scalari nel piano. Due regole accelerano: un corpo a due forze le ha sulla congiungente delle cerniere, uno a tre forze le ha concorrenti. Parto dal corpo con la forza nota e passo ai vicini con azione e reazione: nel manovellismo arrivo a $C_1 = F_{2,1} b$, nulla ai punti morti. In dinamica aggiungo $-M\vec a_G$ e $-I_G\dot{\vec\omega}$, dopo aver risolto la cinematica, e risolvo come in statica; per un corpo incernierato la coppia d'inerzia in O è $-I_O\dot{\vec\omega}$. Infine le forze vive: con corpi rigidi senza attuatori la potenza delle forze esterne è la derivata di $\tfrac12 M V_G^2 + \tfrac12 I_G\omega^2$, e le reazioni spariscono.`,
};

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c1-moto-relativo': motoRelativo,
  'c1-cinematica-analitica': cinematicaAnalitica,
  'c1-statica-dinamica': staticaDinamica,
};
