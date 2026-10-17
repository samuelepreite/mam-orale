/** Lezioni discorsive del capitolo C1, parte a (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

/** testo grezzo: le barre rovesciate di KaTeX restano come sono, gli apostrofi non vanno protetti */
const R = String.raw;

// ------------------------------------------------------------------ c1-cinematica-punto
const cinematicaPunto: LezioneArgomento = {
  perche: R`Pensa a quando imbocchi l'uscita dell'autostrada. Il tachimetro segna sempre 90 km/h, eppure ti senti spinto verso l'esterno della curva. Se la velocità non cambia, perché senti qualcosa? Perché la velocità è un vettore: ha un modulo (il numero del tachimetro) e una direzione (dove punta il muso dell'auto). In curva il modulo resta uguale, ma la direzione cambia, e cambiare direzione vuol dire accelerare. La domanda di questa lezione è: **come si scrive l'accelerazione di un punto che percorre una traiettoria curva, separando la parte che cambia il modulo della velocità da quella che ne cambia la direzione?** È la base di tutta la cinematica dei meccanismi.`,
  idea: R`Immagina un punto P che corre su una strada curva. In ogni istante la sua velocità punta lungo la strada, cioè è tangente alla traiettoria. Puoi scriverla come un numero (quanto va veloce) per una freccetta lunga 1 che indica la direzione della strada: il versore tangente.

Ora chiediti come può cambiare questo prodotto. In due modi indipendenti. Può cambiare il numero: premi l'acceleratore o il freno. Oppure può girare la freccetta: giri il volante. Il primo modo dà l'accelerazione tangenziale, lungo la strada. Il secondo dà l'accelerazione normale, perpendicolare alla strada e diretta verso l'interno della curva.

Quanto vale la seconda? Dipende da quanto in fretta gira la freccetta. Per capirlo si approssima un piccolo tratto di curva con un arco di cerchio, il cerchio che «abbraccia» meglio la strada in quel punto. Più il cerchio è piccolo (curva stretta), più la freccetta gira in fretta. Il risultato, $V^2/R$, dice proprio questo: conta il quadrato della velocità e conta il raggio della curva.`,
  richiami: [
    { titolo: 'Derivata di un prodotto', testo: R`Se una grandezza è il prodotto di due fattori che cambiano entrambi nel tempo, la sua derivata ha due pezzi: derivata del primo per il secondo, più il primo per la derivata del secondo, $(fg)' = f'g + fg'$. Vale anche quando uno dei fattori è un vettore. Il senso fisico: il prodotto cambia sia perché cambia un fattore, sia perché cambia l'altro.` },
    { titolo: 'Versore', testo: R`Un versore è un vettore lungo 1: serve solo a indicare una direzione. Moltiplicandolo per un numero ottieni un vettore lungo quel numero, nella stessa direzione. Un versore non può cambiare lunghezza, ma può ruotare: quindi la sua derivata nel tempo, in generale, non è zero.` },
    { titolo: 'Arco, raggio e angolo', testo: R`Su una circonferenza di raggio R, un arco che sottende al centro un angolo θ (in radianti) è lungo $s = R\theta$. Per angoli piccoli vale lo stesso: $ds = R\,d\theta$. Dividendo per il tempo ottieni il legame fra la velocità lungo l'arco e la velocità di rotazione: $V = R\omega$.` },
    { titolo: 'Derivate di seno e coseno', testo: R`Se l'angolo dipende dal tempo, con la regola della catena $\frac{d}{dt}\cos\theta = -\sin\theta\,\dot\theta$ e $\frac{d}{dt}\sin\theta = \cos\theta\,\dot\theta$. Il punto sopra, $\dot\theta$, indica la derivata nel tempo: quanto in fretta cresce l'angolo. Esce sempre fuori come fattore.` },
  ],
  ipotesiPerche: [
    R`Il punto si muove nel piano e ne descriviamo la posizione con il vettore (P − O) da un'origine fissa: senza un riferimento fisso non ha senso parlare di velocità. Le coordinate polari servono per le due dimostrazioni aggiunte.`,
    R`È l'approssimazione che rende calcolabile la curvatura: in un tratto piccolissimo qualunque curva assomiglia a un arco di cerchio, e sul cerchio sappiamo che arco = raggio × angolo.`,
    R`Qui non c'è nessun corpo che ruota: ω misura solo quanto in fretta gira la direzione della tangente. Dirlo evita di confonderla con la velocità angolare di un corpo rigido.`,
  ],
  disegnoGuida: R`Comincia dagli assi x e y con l'origine O, poi traccia una curva qualsiasi e mettici una freccia per dire in che verso la percorre il punto. Scegli un punto P sulla curva e disegna il vettore posizione da O a P, con l'angolo θ rispetto all'asse x. In P disegna la freccetta tangente $\hat\tau$ e, più lunga nella stessa direzione, la velocità $V_P$: è tangente perché il punto si muove lungo la strada. Poi trova il centro di curvatura C: sta dalla parte della concavità, sulla normale in P. Disegna un pezzo del cerchio di raggio R che abbraccia la curva vicino a P. Infine le due accelerazioni: $a_t$ lungo la tangente e $a_n$ verso C. Il verso di $a_n$ è il dettaglio da non sbagliare: punta sempre verso l'interno della curva.`,
  mappa: [
    'La velocità è tangente: la scrivo come modulo per versore.',
    'Derivo il prodotto: un pezzo perché cambia il modulo, uno perché gira il versore.',
    'Quanto gira il versore: cerchio di curvatura e triangolo dei versori.',
    'Metto insieme: tangenziale più normale, e la forza centrifuga.',
    'Stessa idea in coordinate polari: versori che ruotano con θ.',
  ],
  dims: {
    d002: {
      introduzione: R`Questa è la dimostrazione principale, quella che la dispensa fa per intero. Partiamo dalla velocità scritta come modulo per versore tangente e la deriviamo. Escono due termini: il primo è già pronto, il secondo contiene la derivata del versore tangente, che dobbiamo calcolare. Per farlo usiamo il cerchio che approssima la traiettoria e un piccolo triangolo di versori. Alla fine applichiamo il risultato alla curva dell'autostrada.`,
      riepilogo: R`La velocità è tangente alla traiettoria: modulo per versore. Derivando il prodotto abbiamo trovato due contributi: uno lungo la tangente, che misura quanto cambia il modulo, e uno che nasce dalla rotazione del versore. Con l'arco di cerchio abbiamo visto che il versore ruota con $\omega = V/R$ e che la sua derivata punta verso il centro di curvatura. Così la parte normale vale $V^2/R$ verso il centro; cambiata di segno e moltiplicata per la massa dà la forza centrifuga.`,
    },
    d001: {
      introduzione: R`La dispensa scrive la posizione in coordinate polari ma non la deriva: questa dimostrazione è aggiunta. L'idea è descrivere P con due numeri, la distanza r da O e l'angolo θ, e usare due versori che ruotano insieme a P: uno radiale, da O verso P, e uno trasversale, perpendicolare al primo. La strategia è la stessa di prima, derivare un prodotto; la novità è che a ruotare è il versore radiale.`,
      riepilogo: R`Abbiamo scritto la posizione come distanza per versore radiale. Derivando il prodotto sono usciti due pezzi: uno perché cambia la distanza, l'altro perché il versore radiale ruota con $\dot\theta$ e la sua derivata è il versore trasversale. La velocità ha quindi una parte radiale $\dot r$ e una trasversale $r\dot\theta$. Se la distanza è costante resta solo la seconda e ritroviamo $V = R\omega$ della dispensa.`,
    },
    d003: {
      introduzione: R`Ora deriviamo ancora la velocità polare per avere l'accelerazione. Anche questa non è nella dispensa. Il lavoro è solo più lungo: ogni termine della velocità è un prodotto, e in ognuno c'è un versore che ruota. Ci serve quindi anche la derivata del versore trasversale. Alla fine raccogliamo i termini sui due versori e controlliamo il risultato con il moto circolare.`,
      riepilogo: R`Derivando la velocità polare sono comparsi, oltre ai termini «ovvi» $\ddot r$ e $r\ddot\theta$, due termini nati dalla rotazione dei versori: $-r\dot\theta^2$, che punta verso O ed è la centripeta, e $2\dot r\dot\theta$, che nasce due volte. Raccogliendo sui due versori si ottiene la formula polare dell'accelerazione. Nel moto circolare si ritrovano esattamente le componenti normale e tangenziale della prima dimostrazione.`,
    },
  },
  passi: {
    'd002.1': {
      tappa: 0,
      prima: R`Primo passo: che direzione ha la velocità? Pensa a uno spostamento piccolissimo dP del punto in un tempo dt. Il punto non può uscire dalla strada, quindi dP è un pezzettino di traiettoria, e un pezzettino piccolo di curva è praticamente un segmento lungo la tangente. Dividendo per dt la direzione non cambia. Come scriveresti allora la velocità usando un numero e una direzione?`,
      dopo: R`La velocità è il suo modulo $V_P$, il numero del tachimetro, per il versore tangente $\hat\tau$, che indica dove punta la strada. Questa scrittura separa le due cose che possono cambiare: quanto vai veloce e dove vai. Controllo: in rettilineo $\hat\tau$ è sempre lo stesso; in curva gira anche se $V_P$ resta fisso.`,
    },
    'd002.2': {
      tappa: 1,
      prima: R`L'accelerazione è la derivata della velocità. Ma la velocità è un prodotto: un numero che cambia nel tempo per un versore che anch'esso cambia nel tempo. Che regola usi per derivare un prodotto di due fattori che cambiano entrambi? Ricorda il richiamo: il prodotto cambia sia perché cambia il primo fattore, sia perché cambia il secondo. Scrivi i due pezzi senza ancora calcolarli.`,
      dopo: R`Il primo pezzo, $\dot V_P\,\hat\tau$, è lungo la tangente e misura quanto cambia il modulo: è l'accelerazione tangenziale, quella di acceleratore e freno. Il secondo, $V_P\,d\hat\tau/dt$, esiste solo se il versore gira: è quello del volante. Controllo: in rettilineo a velocità costante sono zero entrambi, e infatti non c'è accelerazione. Resta da calcolare $d\hat\tau/dt$.`,
    },
    'd002.3': {
      tappa: 2,
      prima: R`Per sapere quanto in fretta gira $\hat\tau$ guardiamo la curva da vicino. In un tratto piccolissimo la traiettoria si confonde con un arco di cerchio, il cerchio di curvatura, di centro C e raggio R. Mentre il punto percorre un arco ds, il raggio CP ruota di un angolo dθ. Che legame c'è fra arco, raggio e angolo? E che cosa ottieni dividendo tutto per dt?`,
      dopo: R`La riga dice che il modulo della velocità è il raggio di curvatura per ω, dove $\omega = d\theta/dt$ è la velocità con cui ruota la tangente (che gira insieme al raggio CP, perché gli è sempre perpendicolare). Attenzione: qui θ è l'angolo al centro di curvatura, non l'angolo polare del disegno. Controllo: a pari velocità, una curva stretta (R piccolo) fa girare la tangente più in fretta.`,
    },
    'd002.4': {
      tappa: 2,
      prima: R`Ora calcoliamo davvero la variazione del versore. Disegna $\hat\tau$ all'istante t e all'istante t + dt con le code nello stesso punto. Sono lunghi entrambi 1 e formano fra loro l'angolo dθ. La loro differenza $d\hat\tau$ è il terzo lato del triangolo. Chiediti: quanto è lungo il lato opposto a un angolo piccolo dθ, fra due lati lunghi 1? E in che direzione punta, quando dθ tende a zero?`,
      dopo: R`Il triangolo è isoscele con un angolo al vertice piccolissimo: il terzo lato è lungo circa dθ (un arco di raggio 1) ed è quasi perpendicolare ai lati uguali, quindi perpendicolare alla tangente. Punta dalla parte in cui la curva gira, cioè verso il centro di curvatura: è il versore normale $\hat n$. Dividendo per dt esce ω. Controllo: se la strada è dritta, dθ = 0 e il versore non cambia.`,
    },
    'd002.5': {
      tappa: 3,
      prima: R`Abbiamo tutto per il secondo pezzo dell'accelerazione, $V_P\,d\hat\tau/dt$. Sostituisci $d\hat\tau/dt = \omega\,\hat n$: ottieni un'espressione con V e ω. Poi usa il legame del passo 3, $V_P = R\omega$, per eliminare una delle due grandezze. Puoi scrivere tutto con ω e R, oppure con V e R: le tre forme dicono la stessa cosa.`,
      dopo: R`L'accelerazione normale vale $V^2/R$ e punta verso il centro di curvatura: per questo si chiama centripeta. Si legge così: raddoppiando la velocità in curva l'accelerazione diventa quattro volte più grande; dimezzando il raggio raddoppia. Controllo sulle unità: m²/s² diviso m dà m/s². In rettilineo R è infinito e $a_n$ è zero.`,
    },
    'd002.6': {
      tappa: 3,
      prima: R`Ora rimetti insieme i due pezzi del passo 2: quello tangenziale era già pronto, quello normale l'abbiamo appena calcolato. Non serve nessun conto nuovo. Si tratta solo di scrivere la somma e di dare un nome a ciascuna componente, ricordando che cosa cambia ognuna delle due.`,
      dopo: R`È il risultato della lezione: accelerazione = tangenziale + normale. La tangenziale $\dot V_P\,\hat\tau$ cambia il modulo della velocità, la normale $\frac{V_P^2}{R}\,\hat n$ ne cambia la direzione, e le due sono perpendicolari. Controllo: a velocità costante in curva resta solo la normale, quindi l'accelerazione non è zero, proprio come avevi sentito in auto.`,
    },
    'd002.7': {
      tappa: 3,
      prima: R`Torniamo all'auto che esce dall'autostrada. Chi sta dentro l'auto, se vuole ragionare come se fosse fermo, deve aggiungere una forza d'inerzia: massa per accelerazione, cambiata di segno (principio di d'Alembert). Applicala alla sola accelerazione normale. Chiediti che verso avrà, sapendo che l'accelerazione normale punta verso il centro della curva.`,
      dopo: R`La forza centrifuga ha la direzione dell'accelerazione normale ma verso opposto: spinge verso l'esterno della curva. Ecco la spinta che senti. Controllo: nel tratto dritto R è infinito e la centrifuga è zero; quando la curva si stringe la centrifuga cresce. Per questo le curve si progettano sul raggio: a pari velocità, raggio più piccolo vuol dire forza più grande.`,
    },
    'd001.1': {
      tappa: 4,
      prima: R`In coordinate polari P si descrive con la distanza r da O e con l'angolo θ che il vettore posizione forma con l'asse x. La dispensa scrive le componenti: $r\cos\theta$ lungo x e $r\sin\theta$ lungo y. Nota che r compare in entrambe: puoi raccoglierlo. Che cosa resta fra parentesi? È un vettore lungo quanto, e in che direzione punta?`,
      dopo: R`Fra parentesi resta il versore radiale $\hat e_r$: lungo 1, perché $\cos^2\theta + \sin^2\theta = 1$, e diretto da O verso P. Così la posizione diventa distanza per direzione, come la velocità era modulo per versore tangente. La differenza importante: $\hat e_r$ gira quando θ cambia, quindi non è costante.`,
    },
    'd001.2': {
      tappa: 4,
      prima: R`Ci serve un secondo versore, perpendicolare al primo, per avere una coppia di direzioni comode che ruotano con P. Prendi $\hat e_r$ e ruotalo di 90° in verso antiorario, cioè nel verso in cui cresce θ. Ruotare di 90° nel piano vuol dire scambiare le componenti e cambiare segno alla prima. Come si scrive il risultato?`,
      dopo: R`Il versore trasversale $\hat e_\theta$ ha componenti $-\sin\theta$ e $\cos\theta$: è perpendicolare a $\hat e_r$ e punta nel verso in cui il punto girerebbe se θ crescesse. Il prodotto vettoriale con $\hat k$, l'asse uscente dal foglio, è solo un modo compatto di dire «ruota di 90° in antiorario». Controllo: con θ = 0 vale ĵ, perpendicolare a î.`,
    },
    'd001.3': {
      tappa: 4,
      prima: R`Prima di derivare la posizione ci serve la derivata di $\hat e_r$, perché comparirà di sicuro. Il versore ha componenti $\cos\theta$ e $\sin\theta$, con θ che dipende dal tempo. Deriva ciascuna componente con la regola della catena: da ognuna uscirà un fattore $\dot\theta$. Guarda poi il vettore che resta: l'hai già incontrato al passo precedente?`,
      dopo: R`La derivata di $\hat e_r$ è $\dot\theta$ per $\hat e_\theta$: il versore radiale, girando, si sposta nella direzione trasversale, tanto più in fretta quanto più rapidamente cresce θ. È lo stesso fatto visto per $\hat\tau$: la derivata di un versore è perpendicolare al versore. Controllo: se θ è fermo, $\hat e_r$ non cambia.`,
    },
    'd001.4': {
      tappa: 4,
      prima: R`Adesso la velocità: è la derivata del vettore posizione $r\,\hat e_r$. Di nuovo un prodotto, fra un numero che cambia (la distanza) e un versore che cambia (perché ruota). Applica la regola del prodotto e scrivi i due pezzi, lasciando per ora indicata la derivata del versore.`,
      dopo: R`Il primo pezzo, $\dot r\,\hat e_r$, dice che il punto si allontana o si avvicina a O. Il secondo, $r\,d\hat e_r/dt$, dice che il punto gira attorno a O. Controllo: se dimenticassi il secondo pezzo, un punto che gira in cerchio con r costante avrebbe velocità nulla, cosa evidentemente assurda.`,
    },
    'd001.5': {
      tappa: 4,
      prima: R`Resta solo da sostituire, nel secondo pezzo, la derivata del versore radiale trovata al passo 3. Non serve altro: è una sostituzione diretta, e il risultato avrà un termine su ciascuno dei due versori, uno radiale e uno trasversale.`,
      dopo: R`La velocità ha una componente radiale $\dot r$, quanto in fretta cambia la distanza, e una trasversale $r\dot\theta$, distanza per velocità di rotazione. Pensa a una giostra: a parità di giri al minuto, chi sta più lontano dal centro va più veloce. Controllo sulle unità: metri per radianti al secondo dà m/s.`,
    },
    'd001.6': {
      tappa: 4,
      prima: R`Per il modulo nota che i due versori sono perpendicolari: le due componenti sono come i cateti di un triangolo rettangolo. Che teorema usi per la lunghezza dell'ipotenusa? Poi prova il caso più semplice, il moto circolare: la distanza da O non cambia, quindi quanto vale $\dot r$?`,
      dopo: R`Il modulo è la radice della somma dei quadrati (Pitagora). Nel moto circolare $\dot r = 0$ e resta $V = R\dot\theta$: è la formula $V = R\omega$ della dispensa, ritrovata per un'altra strada. Le coordinate polari non danno niente di nuovo: danno lo stesso risultato visto da un altro punto di vista, e questo è il controllo di coerenza.`,
    },
    'd003.1': {
      tappa: 4,
      prima: R`Per l'accelerazione si deriva la velocità, quindi il punto di partenza è la velocità polare appena ottenuta. Prima di derivare guardala bene: ogni termine è un prodotto, e in ognuno c'è un versore che ruota. Questo ti dice già che usciranno più termini di quanti ne vedi adesso.`,
      dopo: R`È la velocità in coordinate polari: parte radiale $\dot r\,\hat e_r$ e parte trasversale $r\dot\theta\,\hat e_\theta$. Il primo termine ha due fattori che cambiano, il secondo ne ha tre: $r$, $\dot\theta$ e il versore. Derivando, ogni fattore che cambia produrrà un pezzo.`,
    },
    'd003.2': {
      tappa: 4,
      prima: R`Ci servono le derivate di entrambi i versori. Quella di $\hat e_r$ la conosci. Per $\hat e_\theta$ deriva le sue componenti, $-\sin\theta$ e $\cos\theta$, con la regola della catena. Oppure ragiona in modo geometrico: un versore che ruota si sposta verso il versore girato di 90° in avanti. Dove va a finire $\hat e_\theta$ girato di 90°?`,
      dopo: R`$\hat e_\theta$, ruotando, si sposta verso $-\hat e_r$, cioè verso O. Il segno meno è essenziale: da lì nascerà la centripeta. Controllo sulle componenti: derivando $-\sin\theta$ esce $-\cos\theta\,\dot\theta$, derivando $\cos\theta$ esce $-\sin\theta\,\dot\theta$, e insieme fanno $-\dot\theta\,\hat e_r$.`,
    },
    'd003.3': {
      tappa: 4,
      prima: R`Ora deriva termine per termine, con calma. Primo termine, $\dot r\,\hat e_r$: due fattori, due pezzi (derivi $\dot r$, poi il versore). Secondo termine, $r\dot\theta\,\hat e_\theta$: tre fattori, tre pezzi (derivi r, poi $\dot\theta$, poi il versore). In totale cinque pezzi. In ciascuno sostituisci la derivata del versore trovata al passo precedente.`,
      dopo: R`I cinque termini sono, nell'ordine: $\ddot r$ radiale; $\dot r\dot\theta$ trasversale (dal versore radiale che gira); di nuovo $\dot r\dot\theta$ trasversale (dalla derivata di r); $r\ddot\theta$ trasversale; $-r\dot\theta^2$ radiale (dal versore trasversale che gira). Controllo: se dimenticassi i versori resterebbero solo $\ddot r$ e $r\ddot\theta$, e un moto circolare uniforme non avrebbe accelerazione.`,
    },
    'd003.4': {
      tappa: 4,
      prima: R`Metti ordine: raccogli tutti i termini che moltiplicano $\hat e_r$ e tutti quelli che moltiplicano $\hat e_\theta$. Guarda in particolare i due termini uguali $\dot r\dot\theta\,\hat e_\theta$: che cosa succede quando li sommi? Non c'è nessuna approssimazione, solo un raccoglimento.`,
      dopo: R`La componente radiale è $\ddot r - r\dot\theta^2$: l'accelerazione «di allontanamento» meno una parte che punta verso O, la centripeta. La trasversale è $r\ddot\theta + 2\dot r\dot\theta$: il 2 c'è perché lo stesso termine è nato due volte. È lo stesso meccanismo che produce il termine di Coriolis nel moto relativo. Controllo: tutti i termini sono in m/s².`,
    },
    'd003.5': {
      tappa: 4,
      prima: R`Facciamo il controllo con quello che già sappiamo. Nel moto circolare la distanza è costante, r = R. Quanto valgono allora $\dot r$ e $\ddot r$? Cancella questi termini nelle due componenti e guarda che cosa resta. Poi ricorda che nel moto circolare $V = R\dot\theta$.`,
      dopo: R`Resta $-R\dot\theta^2 = -V^2/R$ lungo il raggio, cioè $V^2/R$ verso il centro, e $R\ddot\theta = \dot V$ lungo la tangente. Sono esattamente l'accelerazione normale e quella tangenziale della prima dimostrazione. Due strade diverse portano allo stesso risultato: è il segno che i conti sono giusti.`,
    },
  },
  racconto: R`All'orale parti dalla frase chiave: la velocità è la derivata della posizione ed è tangente alla traiettoria, quindi si scrive modulo per versore tangente. Poi derivi il prodotto e mostri i due termini: $\dot V\,\hat\tau$, che cambia il modulo, e $V\,d\hat\tau/dt$, che nasce dalla rotazione del versore. Fai il disegno con il cerchio di curvatura e il triangolo dei versori: $d\hat\tau$ è lungo dθ e punta verso il centro, quindi $d\hat\tau/dt = \omega\,\hat n$ con $\omega = V/R$. Arrivi a $\vec a = \dot V\,\hat\tau + \frac{V^2}{R}\,\hat n$ e chiudi con l'uscita dell'autostrada: in curva a velocità costante c'è accelerazione, e la centrifuga spinge verso l'esterno. Se ti chiedono le coordinate polari, di' subito che non sono nella dispensa.`,
};

// ------------------------------------------------------------------ c1-velocita
const velocita: LezioneArgomento = {
  perche: R`Guarda il motore di un'auto aperto: manovella, biella, pistone, tutti pezzi rigidi che si muovono insieme. Per progettarli serve sapere quanto va veloce ogni punto: il pistone, il perno, l'estremo di una leva. Ma un pezzo rigido ha infiniti punti: bisogna calcolarli uno per uno? No, ed è proprio questo il bello. **Basta conoscere la velocità di un solo punto e quanto in fretta ruota il pezzo per avere la velocità di tutti gli altri.** Questa lezione ti mostra perché, come si estende alle accelerazioni e come il centro di istantanea rotazione trasforma il calcolo in un disegno.`,
  idea: R`Prendi un righello e muovilo sul tavolo come vuoi. Qualunque movimento tu faccia, in ogni istante lo puoi vedere come la somma di due cose: tutti i punti si spostano come il punto A (una traslazione), e in più il righello gira attorno ad A (una rotazione). Il righello è rigido: la distanza fra due suoi punti A e B non cambia mai. Quindi B, visto da A, può solo girargli attorno, come la punta di un compasso. La velocità di un punto che gira attorno ad A è perpendicolare al raggio AB e proporzionale alla sua lunghezza.

C'è di più. In ogni istante, nel piano, c'è un punto speciale che sta fermo: il centro di istantanea rotazione K. Rispetto a lui il movimento è una rotazione pura, come una porta attorno ai cardini. Se lo trovi, le velocità le leggi a occhio: perpendicolari alla congiungente con K e tanto più grandi quanto più sei lontano. Attenzione però: K è fermo solo in quell'istante, quindi la sua accelerazione non è zero.`,
  richiami: [
    { titolo: 'Prodotto vettoriale', testo: R`Il prodotto vettoriale $\vec a\wedge\vec b$ è un vettore perpendicolare sia ad $\vec a$ sia a $\vec b$, lungo $ab\sin\alpha$ (α angolo fra i due), con verso dato dalla regola della mano destra. Nel piano, se $\vec\omega$ è perpendicolare al foglio, $\vec\omega\wedge\vec r$ è il vettore $\vec r$ ruotato di 90° e allungato di ω: proprio una velocità di rotazione.` },
    { titolo: 'Prodotto scalare', testo: R`Il prodotto scalare $\vec a\cdot\vec b$ è un numero: $ab\cos\alpha$, con α angolo fra i due vettori. Vale zero quando i vettori sono perpendicolari. Un vettore per se stesso dà il quadrato della sua lunghezza: per un versore, $\hat e\cdot\hat e = 1$.` },
    { titolo: 'Velocità angolare', testo: R`È quanto in fretta ruota un corpo: l'angolo φ di cui è girato, derivato nel tempo, $\omega = \dot\varphi$. Si rappresenta con un vettore perpendicolare al piano del moto, con verso dato dalla mano destra (uscente dal foglio se la rotazione è antioraria). Tutti i segmenti di un corpo rigido ruotano dello stesso angolo.` },
    { titolo: 'Velocità come derivata della posizione', testo: R`La velocità di un punto è la derivata nel tempo del suo vettore posizione rispetto a un'origine fissa O; l'accelerazione è la derivata della velocità. Derivare una differenza di vettori dà la differenza delle derivate, e una costante esce dalla derivata.` },
    { titolo: 'Doppio prodotto vettoriale', testo: R`Se $\vec\omega$ è perpendicolare a $\vec r$, fare due volte il prodotto vettoriale con $\vec\omega$ ruota $\vec r$ di 90° più 90°, cioè di 180°, e lo moltiplica per ω²: $\vec\omega\wedge(\vec\omega\wedge\vec r) = -\omega^2\,\vec r$. Il risultato punta all'indietro, verso l'inizio del braccio: è la centripeta.` },
  ],
  ipotesiPerche: [
    R`Mettiamo in scena gli attori: un corpo rigido, due suoi punti e un riferimento fisso da cui misurare le velocità. Tutto il resto si appoggia su questi oggetti.`,
    R`È l'unica proprietà fisica che usiamo: se AB non cambia lunghezza, B può solo girare attorno ad A. Senza rigidità la formula sarebbe falsa.`,
    R`Nel piano ω è sempre perpendicolare a ogni segmento del corpo, e questo riduce il doppio prodotto vettoriale a $-\omega^2(B-A)$. In tre dimensioni comparirebbe un termine in più.`,
    R`I vincoli dicono che cosa sappiamo delle velocità: una cerniera fissa è ferma, un corsoio si muove solo lungo la guida. Sono le informazioni che rendono risolvibile un meccanismo.`,
  ],
  disegnoGuida: R`Disegna un corpo di forma qualsiasi, una patata, e segna due punti A e B. In A disegna la velocità $V_A$ e in B la direzione della velocità $V_B$: in un meccanismo le direzioni te le danno i vincoli (lungo la guida per un corsoio, perpendicolare al raggio per un punto che gira attorno a una cerniera fissa). Ora traccia per A la retta $r_1$ perpendicolare a $V_A$ e per B la retta $r_2$ perpendicolare a $V_B$: sono le rette su cui deve stare il centro di rotazione. Dove si incrociano metti K, anche se cade fuori dal corpo. Segna il verso di ω coerente con $V_A$: girando attorno a K, A deve muoversi come dice la sua freccia. Se vuoi, aggiungi un terzo punto P con la velocità perpendicolare a KP e lunga in proporzione a KP.`,
  mappa: [
    'Un versore attaccato al corpo che gira: quanto vale la sua derivata (Poisson).',
    'Due punti dello stesso corpo: la formula delle velocità.',
    'Derivo ancora: la formula delle accelerazioni (Rivals).',
    'Il punto a velocità nulla: trovo il CIR e lo uso negli esempi.',
    'Attenzione: il CIR ha velocità nulla ma accelerazione no.',
  ],
  dims: {
    d004: {
      introduzione: R`Prima di parlare di punti ci serve un attrezzo: sapere come cambia nel tempo un versore attaccato a un corpo che ruota. La dispensa lo enuncia soltanto; qui lo dimostriamo. Strategia: dal fatto che il versore è lungo sempre 1 scopriamo che la sua derivata è perpendicolare a lui; poi, scrivendolo con un angolo, troviamo quanto è lunga; infine la riconosciamo come un prodotto vettoriale con ω.`,
      riepilogo: R`Un versore solidale non cambia lunghezza, quindi la sua derivata è perpendicolare a lui. Scrivendolo con l'angolo φ di cui ha ruotato il corpo, la derivata vale $\dot\varphi$ per il versore girato di 90°, cioè $\vec\omega\wedge\hat e$. Siccome tutti i versori solidali ruotano dello stesso angolo, ω è la stessa per tutti: è la velocità angolare del corpo. Questo è il teorema di Poisson, che usiamo subito dopo.`,
    },
    d005: {
      introduzione: R`Ora usiamo Poisson per il risultato più importante del capitolo. Scriviamo il segmento da A a B in due modi: come differenza di due posizioni, e come lunghezza costante per un versore solidale. Derivando le due scritture otteniamo due espressioni della stessa cosa: una con le velocità di A e B, l'altra con ω. Uguagliandole, la formula esce da sola.`,
      riepilogo: R`Il segmento AB è lungo sempre uguale, quindi può solo ruotare. Derivandolo come differenza di posizioni otteniamo $\vec V_B - \vec V_A$; derivandolo come lunghezza per versore, con Poisson, otteniamo $\vec\omega\wedge(B-A)$. Uguagliando: la velocità di B è quella di A più una rotazione attorno ad A, perpendicolare ad AB. Ne segue che tre numeri, due componenti di una velocità e ω, descrivono il moto piano di un corpo rigido: tre gradi di libertà.`,
    },
    d006: {
      introduzione: R`Per le accelerazioni basta derivare la formula delle velocità. L'unica attenzione è che il prodotto vettoriale va derivato come un prodotto: cambia ω e cambia il braccio (B − A). La derivata del braccio la conosciamo già. Alla fine semplifichiamo il doppio prodotto vettoriale grazie al moto piano e guardiamo il caso del polo fisso.`,
      riepilogo: R`Derivando la formula delle velocità sono comparsi tre termini: l'accelerazione di A, un termine dovuto a come cambia ω (tangenziale, perpendicolare ad AB) e uno dovuto a ω stessa (centripeta, da B verso A). È l'equazione di Rivals. Con il polo fisso le due componenti sono perpendicolari: il modulo cresce in proporzione alla distanza dal polo, e l'inclinazione rispetto al raggio è la stessa per tutti i punti.`,
    },
    d007: {
      introduzione: R`Ultimo strumento: il centro di istantanea rotazione, il punto che in un certo istante ha velocità nulla. Se lo usiamo come polo nella formula delle velocità, il termine di traslazione sparisce e resta una rotazione pura. Vedremo come trovarlo con due sole direzioni, lo useremo su un disco che rotola, su un'asta vincolata e su un quadrilatero, e scopriremo perché non va usato per le accelerazioni.`,
      riepilogo: R`Il CIR è il punto a velocità nulla: rispetto a lui il corpo, in quell'istante, ruota e basta. Ogni velocità è perpendicolare alla congiungente con K, quindi K sta all'incrocio delle normali alle velocità di due punti, e i moduli sono proporzionali alle distanze da K. Nel disco che rotola K è il contatto, nell'asta l'incrocio delle normali alle guide, nel quadrilatero l'incrocio di manovella e bilanciere. Però K si sposta e ha accelerazione non nulla: per le accelerazioni si usa Rivals.`,
    },
  },
  passi: {
    'd004.1': {
      tappa: 0,
      prima: R`Partiamo dalla cosa più semplice che sappiamo su un versore attaccato al corpo: la sua lunghezza. Il corpo è rigido, quindi il versore non può allungarsi né accorciarsi; può solo girare. Come esprimi «lunghezza uguale a 1» usando il prodotto scalare del versore con se stesso?`,
      dopo: R`Il prodotto scalare del versore con se stesso è il quadrato della sua lunghezza, e vale 1 in ogni istante. Sembra una banalità, ma è un'informazione preziosa: una quantità che resta costante nel tempo ha derivata zero. È proprio quello che sfruttiamo nel passo successivo.`,
    },
    'd004.2': {
      tappa: 0,
      prima: R`Visto che $\hat e\cdot\hat e$ vale sempre 1, deriviamolo nel tempo. A destra c'è una costante, quindi la derivata è zero. A sinistra c'è un prodotto, e la regola del prodotto vale anche per il prodotto scalare: derivi il primo fattore, poi il secondo. I due pezzi risultano uguali. Che cosa ti dice un prodotto scalare nullo?`,
      dopo: R`I due pezzi si sommano in $2\,\hat e\cdot d\hat e/dt$, che deve essere zero: il versore e la sua derivata sono perpendicolari. Fisicamente è chiaro: se un vettore cambiasse lungo se stesso cambierebbe lunghezza. Un versore può cambiare solo «di lato», ruotando. Ora sappiamo la direzione della derivata; ne manca la lunghezza.`,
    },
    'd004.3': {
      tappa: 0,
      prima: R`Per sapere quanto è lunga la derivata scriviamo il versore in componenti. Nel piano lo individua un solo numero: l'angolo φ che forma con l'asse x, che cresce mentre il corpo ruota. Le componenti sono quindi coseno e seno di φ. Deriva ciascuna con la regola della catena, sapendo che φ dipende dal tempo.`,
      dopo: R`Da ogni componente esce il fattore $\dot\varphi$, e quello che resta è il vettore $(-\sin\varphi, \cos\varphi)$: lungo 1 e perpendicolare a $\hat e$, come previsto al passo 2. La derivata è dunque lunga $\dot\varphi$. Controllo: se il corpo non ruota, $\dot\varphi = 0$ e il versore resta fermo.`,
    },
    'd004.4': {
      tappa: 0,
      prima: R`Il vettore $(-\sin\varphi, \cos\varphi)$ è $\hat e$ ruotato di 90° in verso antiorario. Ricorda il richiamo sul prodotto vettoriale: girare di 90° nel piano equivale a fare il prodotto vettoriale con $\hat k$, il versore perpendicolare al foglio. Come puoi riscrivere la derivata usando $\hat k$, e poi raccogliere in un unico vettore tutto ciò che sta davanti a $\hat e$?`,
      dopo: R`Raccogliendo $\dot\varphi\,\hat k$ in un unico vettore, la velocità angolare $\vec\omega$, la derivata del versore diventa $\vec\omega\wedge\hat e$: è il teorema di Poisson. Si legge così: la punta del versore si muove come un punto che gira attorno alla coda con velocità angolare ω. Il verso di $\vec\omega$ segue la mano destra.`,
    },
    'd004.5': {
      tappa: 0,
      prima: R`Resta un dubbio: ω dipende dal versore scelto? Prendi un altro versore attaccato allo stesso corpo. Siccome il corpo è rigido, forma con il primo un angolo fisso β, quindi il suo angolo con l'asse x è φ + β. Rifai mentalmente il passo 3: che cosa succede alla derivata di un angolo che differisce da φ per una costante?`,
      dopo: R`La costante β ha derivata zero, quindi anche il nuovo versore ruota con $\dot\varphi$ e vale per lui la stessa formula con la stessa $\vec\omega$. Conclusione: ω non appartiene a un versore ma all'intero corpo. Ecco perché ha senso parlare di «velocità angolare del corpo»: tutti i segmenti rigidi girano insieme.`,
    },
    'd005.1': {
      tappa: 1,
      prima: R`Vogliamo legare le velocità di due punti A e B dello stesso corpo. Le velocità sono derivate delle posizioni rispetto all'origine fissa O, quindi conviene scrivere il segmento da A a B proprio con quelle posizioni. Pensa al triangolo O, A, B: come ottieni il vettore da A a B partendo dai vettori che vanno da O ad A e da O a B?`,
      dopo: R`Il vettore da A a B è la posizione di B meno la posizione di A: per andare da A a B torni indietro fino a O e poi vai a B. È una relazione puramente geometrica, vera per due punti qualsiasi. Da sola non dice niente sulla rigidità: quella entra nel passo successivo.`,
    },
    'd005.2': {
      tappa: 1,
      prima: R`Adesso usiamo il fatto che A e B stanno sullo stesso corpo rigido. Che cosa resta costante del segmento AB mentre il corpo si muove? E che cosa invece può cambiare? Prova a scrivere il segmento come un numero per un versore, separando la parte costante da quella che varia.`,
      dopo: R`Il segmento è la sua lunghezza, costante, per un versore $\hat e$ attaccato al corpo, che può solo ruotare. È l'ipotesi di rigidità tradotta in formula ed è il cuore della dimostrazione. Controllo: per due punti di corpi diversi la distanza cambierebbe e questa scrittura non varrebbe più.`,
    },
    'd005.3': {
      tappa: 1,
      prima: R`Ora deriviamo nel tempo la prima scrittura, quella del passo 1. La derivata di una differenza è la differenza delle derivate. E che cos'è la derivata del vettore posizione di un punto rispetto all'origine fissa? Ricorda il richiamo: è la velocità del punto.`,
      dopo: R`La derivata del segmento AB è la velocità di B meno quella di A: misura quanto B si muove rispetto ad A. Controllo: se il corpo trasla senza ruotare, A e B hanno la stessa velocità, la differenza è zero e infatti il segmento non cambia, nemmeno di direzione.`,
    },
    'd005.4': {
      tappa: 1,
      prima: R`Deriviamo anche la seconda scrittura, quella del passo 2: lunghezza costante per versore. È un prodotto, ma uno dei fattori è costante. Che cosa succede alla derivata di un prodotto quando un fattore non cambia? Scrivi il risultato e uguaglialo a quanto trovato al passo precedente: è la derivata della stessa cosa.`,
      dopo: R`La lunghezza esce dalla derivata come una costante qualsiasi e resta solo la derivata del versore. Abbiamo così la stessa quantità, $\vec V_B - \vec V_A$, scritta in un secondo modo: lunghezza per derivata del versore. Il versore è solidale al corpo: è il momento di usare Poisson.`,
    },
    'd005.5': {
      tappa: 1,
      prima: R`La derivata di un versore solidale al corpo la conosci: è il teorema di Poisson. Sostituiscila. Poi nota che la lunghezza AB è un numero e può entrare dentro il prodotto vettoriale, a moltiplicare il versore. Lunghezza per versore: che vettore riconosci?`,
      dopo: R`Lunghezza per versore ridà il segmento $(B-A)$, quindi la derivata del segmento è $\vec\omega\wedge(B-A)$: B, visto da A, si muove come un punto che gli gira attorno. Controllo: è perpendicolare ad AB, come deve essere se la distanza non cambia, e cresce con la lunghezza AB.`,
    },
    'd005.6': {
      tappa: 1,
      prima: R`Abbiamo due espressioni della derivata del segmento AB: $\vec V_B - \vec V_A$ dal passo 3 e $\vec\omega\wedge(B-A)$ dal passo 5. Sono la stessa cosa. Uguagliale e porta la velocità di A dall'altra parte, così da avere la velocità di B da sola.`,
      dopo: R`È la formula fondamentale delle velocità del corpo rigido. Si legge: B si muove come A (traslazione, uguale per tutti i punti) più una rotazione attorno ad A. Controllo con una porta: se A è il cardine, fermo, ogni punto ha velocità perpendicolare alla porta e tanto più grande quanto più è lontano dai cardini.`,
    },
    'd005.7': {
      tappa: 1,
      prima: R`Chiediti ora: quanti numeri servono per conoscere le velocità di tutti i punti di un corpo rigido nel piano? Guarda la formula: per un B qualsiasi ti servono la velocità di A e ω. Conta le componenti: quante ne ha una velocità nel piano? E quante ne ha ω, che è sempre perpendicolare al piano?`,
      dopo: R`Due componenti per la velocità di A e una per ω: tre numeri bastano per tutto il corpo. Sono i tre gradi di libertà di un corpo rigido libero nel piano, due traslazioni e una rotazione. Ogni vincolo di un meccanismo toglie alcuni di questi numeri: per questo le velocità di un meccanismo si possono calcolare.`,
    },
    'd006.1': {
      tappa: 2,
      prima: R`L'accelerazione è la derivata della velocità, quindi deriviamo la formula fondamentale termine per termine. La derivata di $\vec V_A$ è l'accelerazione di A. Il termine $\vec\omega\wedge(B-A)$ è un prodotto, vettoriale ma pur sempre un prodotto: cambiano sia ω sia il braccio. Applica la regola del prodotto e scrivi i due pezzi.`,
      dopo: R`Ci sono tre termini: l'accelerazione di A, la variazione di ω per il braccio, e ω per la variazione del braccio. Il secondo c'è solo se la rotazione accelera o rallenta; il terzo c'è appena il corpo ruota. Attenzione all'ordine: nel prodotto vettoriale non puoi scambiare i fattori senza cambiare segno.`,
    },
    'd006.2': {
      tappa: 2,
      prima: R`Ci serve la derivata del braccio $(B-A)$. Non c'è bisogno di rifarla: l'abbiamo calcolata nella dimostrazione delle velocità, ai passi 4 e 5. Il braccio è lungo sempre uguale e ruota con il corpo. Che cosa avevi ottenuto?`,
      dopo: R`La derivata del braccio è $\vec\omega$ vettor il braccio: il segmento AB ruota rigidamente con il corpo. È Poisson applicato a un segmento invece che a un versore. Controllo: è perpendicolare ad AB, coerente con il fatto che la lunghezza non cambia.`,
    },
    'd006.3': {
      tappa: 2,
      prima: R`Sostituisci la derivata del braccio appena ritrovata nel terzo termine del passo 1. È una sostituzione diretta: al posto di $d(B-A)/dt$ metti $\vec\omega\wedge(B-A)$. Comparirà un prodotto vettoriale dentro un altro.`,
      dopo: R`Ora l'accelerazione di B è scritta tutta con grandezze note: accelerazione di A, $\dot{\vec\omega}$, ω e il braccio. Il terzo termine è un doppio prodotto vettoriale, ω applicata due volte al braccio. Va semplificato, e qui serve l'ipotesi di moto piano.`,
    },
    'd006.4': {
      tappa: 2,
      prima: R`Nel moto piano ω è perpendicolare al foglio, quindi perpendicolare al braccio. Ricorda il richiamo: fare il prodotto vettoriale con ω vuol dire ruotare di 90° e moltiplicare per ω. Che cosa succede se lo fai due volte di seguito? Di quanto ruota il braccio in totale, e per quanto viene moltiplicato?`,
      dopo: R`Due rotazioni di 90° fanno 180°: il braccio si gira all'indietro e si moltiplica per ω². Il termine vale $-\omega^2(B-A)$ e punta da B verso A: è la centripeta, la stessa $V^2/R$ della cinematica del punto, con $V = \omega\,\overline{AB}$. In tre dimensioni ω non sarebbe sempre perpendicolare al braccio e comparirebbe un termine in più.`,
    },
    'd006.5': {
      tappa: 2,
      prima: R`Rimetti tutto insieme: sostituisci il doppio prodotto semplificato nell'espressione del passo 3. Non serve altro conto. Guarda però le tre parti che restano e chiediti che direzione ha ciascuna rispetto al segmento AB.`,
      dopo: R`È l'equazione di Rivals. Tre pezzi: l'accelerazione di A, uguale per tutti i punti; una componente tangenziale perpendicolare ad AB, lunga $\dot\omega\,\overline{AB}$; una centripeta lungo AB verso A, lunga $\omega^2\overline{AB}$. Per usarla servono l'accelerazione di un punto, ω e $\dot\omega$. Controllo: con A fermo e ω costante resta solo la centripeta.`,
    },
    'd006.6': {
      tappa: 2,
      prima: R`Caso utile: il corpo ruota attorno a un punto fisso O, come una ruota sul suo asse. Scegli O come polo: quanto vale la sua accelerazione? Restano due termini: il primo è perpendicolare al raggio OA, il secondo è lungo il raggio. Come calcoli il modulo di due vettori perpendicolari?`,
      dopo: R`Le due componenti sono i cateti di un triangolo rettangolo, $\dot\omega\,\overline{OA}$ e $\omega^2\overline{OA}$. Il modulo è l'ipotenusa, e la distanza OA si raccoglie fuori dalla radice. Si legge così: l'accelerazione cresce in proporzione alla distanza dal polo, come la velocità. Controllo: con ω costante resta la sola centripeta $\omega^2\overline{OA}$.`,
    },
    'd006.7': {
      tappa: 2,
      prima: R`Ultima osservazione: che direzione ha l'accelerazione di un punto rispetto al raggio? Nel triangolo rettangolo del passo precedente, la tangente dell'angolo fra l'ipotenusa e il cateto lungo il raggio è il rapporto fra cateto opposto e cateto adiacente. Scrivilo e guarda se la distanza OA sopravvive.`,
      dopo: R`OA si semplifica: l'angolo α fra l'accelerazione e la direzione centripeta dipende solo da $\dot\omega$ e da $\omega^2$, non dal punto. Tutte le accelerazioni sono inclinate dello stesso angolo e i loro estremi stanno su una retta per O, come nella figura della dispensa. Attenzione: qui α è un angolo, non un'accelerazione angolare.`,
    },
    'd007.1': {
      tappa: 3,
      prima: R`Partiamo dalla definizione. Nel moto piano, se il corpo ruota, in ogni istante esiste un punto (anche fuori dal corpo) la cui velocità è zero. Lo chiamiamo K, centro di istantanea rotazione. Come scrivi in formula che K, in quell'istante, è fermo?`,
      dopo: R`La velocità di K è zero, ma solo in quell'istante: nell'istante successivo il punto fermo sarà un altro. Pensa a una ruota che rotola: il punto a contatto con la strada è fermo per un attimo, poi si solleva e il contatto passa al punto vicino. È l'unica proprietà di K che useremo per le velocità.`,
    },
    'd007.2': {
      tappa: 3,
      prima: R`Usiamo la formula fondamentale delle velocità scegliendo come polo proprio K. In generale la formula ha due termini: la traslazione del polo e la rotazione attorno al polo. Che cosa succede al primo termine se il polo ha velocità nulla? Scrivi la formula per A e per B.`,
      dopo: R`Il termine di traslazione sparisce: la velocità di ogni punto è soltanto ω vettor la sua distanza da K. Rispetto a K, in quell'istante, il corpo è una porta che gira sui cardini. Questa scrittura ci darà sia il modo di trovare K, sia il modo di calcolare le velocità.`,
    },
    'd007.3': {
      tappa: 3,
      prima: R`Come si trova K? Guarda la formula appena scritta: la velocità di A è un prodotto vettoriale con il braccio $(A-K)$. Che direzione ha un prodotto vettoriale rispetto ai suoi fattori? Allora, su quale retta passante per A deve stare K? Ripeti lo stesso ragionamento per B.`,
      dopo: R`Ogni velocità è perpendicolare alla congiungente con K, quindi K sta sulla retta per A perpendicolare a $\vec V_A$ e su quella per B perpendicolare a $\vec V_B$: è il loro incrocio. Bastano le direzioni delle velocità, non i moduli. Controllo: se le due normali fossero parallele e non si incontrassero, ω sarebbe zero e il moto una traslazione.`,
    },
    'd007.4': {
      tappa: 3,
      prima: R`Trovato K, passiamo ai moduli. Ogni velocità è ω vettor un braccio perpendicolare, quindi il suo modulo è semplicemente ω per la distanza da K. Se conosci K e il modulo della velocità di un punto, come ricavi ω? E poi come ottieni la velocità di qualunque altro punto?`,
      dopo: R`Le velocità sono proporzionali alle distanze da K: più sei lontano, più vai veloce, come i punti di una porta. Dividendo una velocità nota per la sua distanza da K ottieni ω; moltiplicando ω per un'altra distanza ottieni un'altra velocità. Il verso di ω lo leggi dalla velocità nota: girando attorno a K, il punto deve muoversi come dice la freccia.`,
    },
    'd007.5': {
      tappa: 3,
      prima: R`Primo esempio: un disco che rotola senza strisciare su un piano. Senza strisciare vuol dire che il punto del disco a contatto con il terreno non scivola: in quell'istante è fermo. Dove sta allora K? Quanto dista dal contatto il centro? E un punto sul bordo all'altezza del centro?`,
      dopo: R`K è il punto di contatto. Il centro dista R da K, quindi va a $\omega R$, la velocità con cui avanza la ruota. Il punto B sul bordo, all'altezza del centro, dista da K la diagonale di un quadrato di lato R, cioè $\sqrt2 R$, e va più veloce del centro. Controllo: il punto più alto dista 2R e va al doppio del centro.`,
    },
    'd007.6': {
      tappa: 3,
      prima: R`Secondo esempio: un'asta AB con l'estremo A che scorre su una guida verticale e B su una guida orizzontale, inclinata di α sull'orizzontale. Le direzioni delle velocità te le danno le guide. Traccia le normali: quale retta per A è perpendicolare alla guida verticale? Quale per B è perpendicolare a quella orizzontale? Poi guarda il triangolo A, B, K.`,
      dopo: R`K è all'incrocio fra l'orizzontale per A e la verticale per B. Nel triangolo rettangolo AK è il cateto orizzontale, $\overline{AB}\cos\alpha$, quindi $\omega = V_A/(\overline{AB}\cos\alpha)$; e siccome $\overline{BK} = \overline{AB}\sin\alpha$, $V_B = V_A\tan\alpha$. Controllo: con α = 0 l'asta è orizzontale, K coincide con B e B è fermo.`,
    },
    'd007.7': {
      tappa: 4,
      prima: R`Possiamo usare K anche per le accelerazioni? Attenzione: K non è un punto fisso del corpo, è il punto che in quell'istante è fermo, e subito dopo il ruolo passa a un altro punto. Chiama $K^*$ il punto geometrico che insegue il CIR: ha una sua velocità. Deriva la formula delle velocità scritta con $K^*$ e confrontala con Rivals scritta con polo nel punto materiale K: che cosa resta per l'accelerazione di K?`,
      dopo: R`L'accelerazione del punto materiale che sta in K vale $-\vec\omega\wedge\vec V_{K^*}$: non è zero, perché il CIR si sposta. Nella ruota il contatto avanza insieme al centro, e il punto a contatto ha accelerazione $\omega^2 R$ verso il centro: si sta sollevando dal terreno. Conclusione pratica: il CIR va bene per le velocità, non per le accelerazioni.`,
    },
    'd007.8': {
      tappa: 4,
      prima: R`Allora come si trovano le accelerazioni dell'asta? Con Rivals, scegliendo come polo un punto di cui sai l'accelerazione: A, che scende a velocità costante e quindi ha accelerazione nulla. Conta le incognite: di $\vec a_B$ conosci la direzione (la guida orizzontale) ma non il modulo; del termine con $\dot\omega$ conosci la direzione (perpendicolare ad AB) ma non il modulo. Due incognite scalari e un'equazione vettoriale nel piano: si chiude un poligono.`,
      dopo: R`Chiudendo il poligono si trova $a_B = \overline{AB}\,\omega^2/\cos\alpha$ e $\dot\omega = \omega^2\tan\alpha$. Il verso di $\dot\omega$ è opposto a quello di ω: l'asta rallenta la rotazione mentre scende. Controllo: la centripeta sta lungo AB e $\vec a_B$ è orizzontale; a chiudere il poligono serve un vettore perpendicolare ad AB, ed è proprio il termine tangenziale.`,
    },
    'd007.9': {
      tappa: 3,
      prima: R`Ultimo esempio: il quadrilatero articolato. La manovella AB gira attorno alla cerniera fissa A, il bilanciere DC attorno alla cerniera fissa D, e la biella BC li collega. Di B e C conosci le direzioni delle velocità: perpendicolari ai rispettivi raggi. Dove si incontrano le normali a queste due velocità? Pensa a quali rette sono.`,
      dopo: R`Le normali alle velocità di B e C sono i prolungamenti della manovella e del bilanciere: il CIR della biella è l'incrocio di AB con DC. Le velocità di B e C sono rotazioni attorno a K con la stessa $\omega_2$, quella della biella. Nota: la dispensa scrive $\vec\omega_3\wedge(B-K)$, ma con il CIR della biella servono $\vec\omega_2$ e il braccio $(C-K)$.`,
    },
  },
  racconto: R`All'orale parti dalla formula fondamentale, $\vec V_B = \vec V_A + \vec\omega\wedge(B-A)$: traslazione più rotazione attorno ad A. Spiega da dove viene: AB ha lunghezza costante, quindi è lunghezza per un versore solidale, e la derivata del versore è $\vec\omega\wedge\hat e$ per Poisson. Di' che bastano tre numeri: tre gradi di libertà. Poi derivi e arrivi a Rivals, sottolineando che il termine $-\omega^2(B-A)$ richiede il moto piano. Infine il CIR: velocità nulla, all'incrocio delle normali alle velocità di due punti; le velocità sono perpendicolari ai raggi da K e proporzionali alla distanza. Chiudi con l'avvertenza: K ha accelerazione non nulla, quindi per le accelerazioni si usa Rivals.`,
};

// ------------------------------------------------------------------ c1-manovellismo
const manovellismo: LezioneArgomento = {
  perche: R`Nel motore di un'auto la benzina brucia e spinge un pistone avanti e indietro in un cilindro; le ruote però devono girare. Chi trasforma il moto alternativo in rotazione? Il manovellismo di spinta: pistone, biella e manovella. Lo stesso meccanismo, al contrario, fa funzionare un compressore. Per progettarlo bisogna sapere dove si trova il pistone, quanto va veloce e soprattutto quanto accelera, perché l'accelerazione per la massa dà le forze che scuotono il motore. **Come si muove il pistone quando la manovella gira a velocità costante? Ed è un moto regolare, o c'è qualcosa che lo rende asimmetrico?**`,
  idea: R`Pensa al pedale di una bicicletta: il pedale gira in cerchio, il ginocchio sale e scende. Nel manovellismo il perno B della manovella gira in cerchio attorno ad A, e la biella lo collega al pistone C, che può solo scorrere avanti e indietro nel cilindro.

Se la biella fosse lunghissima resterebbe quasi orizzontale e il pistone copierebbe esattamente l'ombra del perno sull'asse: un moto armonico perfetto, come un'altalena. Ma la biella ha lunghezza finita: quando il perno sale, la biella si inclina e la sua proiezione sull'asse si accorcia. Questo piccolo effetto aggiunge al moto una seconda oscillazione, a frequenza doppia, tanto più importante quanto più la biella è corta rispetto alla manovella.

Due posizioni sono speciali: i punti morti, quando manovella e biella sono allineate. Lì il pistone si ferma per invertire il moto, ma la sua accelerazione è massima.`,
  richiami: [
    { titolo: 'Proiezioni nel triangolo rettangolo', testo: R`In un triangolo rettangolo con ipotenusa l, il cateto adiacente a un angolo γ è $l\cos\gamma$ e quello opposto è $l\sin\gamma$. Proiettare un segmento su un asse vuol dire prendere il suo cateto lungo quell'asse. Vale sempre $\sin^2\gamma + \cos^2\gamma = 1$.` },
    { titolo: 'Radice di un numero vicino a 1', testo: R`Per u piccolo, $\sqrt{1-u}\simeq 1 - u/2$. Lo verifichi elevando al quadrato: $(1-u/2)^2 = 1 - u + u^2/4$, che differisce da $1-u$ solo per un termine piccolissimo. È il modo standard di semplificare una radice quando ciò che la complica è piccolo.` },
    { titolo: 'Formule di duplicazione', testo: R`Trasformano quadrati e prodotti di seni e coseni in funzioni dell'angolo doppio: $\sin^2\theta = \frac{1-\cos2\theta}{2}$ e $\sin\theta\cos\theta = \frac12\sin2\theta$. Servono a far vedere che un termine oscilla a frequenza doppia.` },
    { titolo: 'Velocità e accelerazioni del corpo rigido', testo: R`Per due punti dello stesso corpo $\vec V_B = \vec V_A + \vec\omega\wedge(B-A)$ e $\vec a_B = \vec a_A + \dot{\vec\omega}\wedge(B-A) - \omega^2(B-A)$ (Rivals). Il CIR è il punto a velocità nulla, all'incrocio delle normali alle velocità di due punti; le velocità sono proporzionali alle distanze da lui.` },
    { titolo: 'Derivare con θ = ω₁t', testo: R`Se l'angolo cresce come $\theta = \omega_1 t$, derivare nel tempo una funzione di θ porta fuori il fattore ω₁: $\frac{d}{dt}\cos\theta = -\omega_1\sin\theta$. Per l'angolo doppio esce $2\omega_1$: $\frac{d}{dt}\cos2\theta = -2\omega_1\sin2\theta$.` },
  ],
  ipotesiPerche: [
    R`Mettiamo in fila membri e cerniere. «Centrato» vuol dire che l'asse del cilindro passa per la cerniera A: è ciò che permette di mettere il pistone sull'asse x, con quota zero.`,
    R`Una manovella a velocità costante è il caso tipico di un motore a regime. L'angolo cresce linearmente e la manovella non ha accelerazione angolare, quindi B ha solo la centripeta.`,
    R`Con λ maggiore di 1 la manovella non potrebbe fare un giro completo. Essendo λ di solito piccolo (biella lunga), si possono trascurare i termini in λ⁴ e ottenere una legge semplice.`,
    R`Servono solo per la parte di statica: senza masse e senza attrito i conti di forze si riducono a geometria. Nella cinematica non entrano.`,
  ],
  disegnoGuida: R`Disegna gli assi con l'origine nella cerniera fissa A: l'asse x è anche l'asse del cilindro. Da A traccia la manovella fino al perno B, inclinata di θ sull'asse, e segna θ in A. Da B fai scendere la biella fino a C, sull'asse x, e segna l'angolo di biella γ in C. Disegna il pistone come un rettangolo in C dentro una guida orizzontale. Numera i membri: manovella 1, biella 2, pistone 3. Da B fai cadere la verticale fino al piede H: ti serve per le proiezioni. Metti ω₁ antioraria e la velocità di B perpendicolare ad AB. Infine il CIR della biella: prolunga AB oltre B e traccia la verticale per C; dove si incontrano metti K.`,
  mappa: [
    'Posizione esatta: proietto manovella e biella sull\'asse e lego γ a θ.',
    'Biella lunga: approssimo la radice e trovo due armoniche.',
    'Velocità del pistone: derivo e la leggo con il CIR della biella.',
    'Accelerazione: poligono di Rivals, derivata e valori ai punti morti.',
  ],
  dims: {
    d010: {
      introduzione: R`Cominciamo dalla geometria: vogliamo la posizione del pistone in funzione dell'angolo di manovella. Il pistone sta sull'asse, quindi basta sommare le proiezioni di manovella e biella. Il problema è che compare anche l'angolo di biella γ, che non conosciamo. Lo elimineremo usando la quota di B, che si può scrivere in due modi.`,
      riepilogo: R`La posizione del pistone è la somma delle proiezioni di manovella e biella sull'asse. L'angolo di biella si lega a quello di manovella perché B ha una sola quota, vista da A o da C: $\sin\gamma = \lambda\sin\theta$. Con $\sin^2\gamma + \cos^2\gamma = 1$ abbiamo eliminato γ e ottenuto la legge esatta della posizione. Ai punti morti manovella e biella sono allineate e la corsa vale 2r.`,
    },
    d013: {
      introduzione: R`La legge esatta contiene una radice, scomoda da derivare due volte. Siccome la biella è molto più lunga della manovella, λ è piccolo e possiamo semplificare. Il trucco è completare il quadrato sotto la radice, così che diventi evidente che cosa si può trascurare. Alla fine riscriviamo la posizione come somma di armoniche.`,
      riepilogo: R`Sotto la radice abbiamo aggiunto e tolto lo stesso termine per avere un quadrato perfetto più un resto di ordine λ⁴. Trascurando il resto, la radice si scioglie e $\cos\gamma \simeq 1 - \frac{\lambda^2}{2}\sin^2\theta$. Sostituendo, la posizione del pistone diventa una costante più un'armonica primaria di ampiezza r e una secondaria a frequenza doppia, piccola, dovuta alla lunghezza finita della biella.`,
    },
    d011: {
      introduzione: R`La velocità del pistone si ottiene derivando la sua posizione. Lo facciamo in tre modi: derivando la legge approssimata, come fa la dispensa; derivando la legge esatta, che richiede la velocità angolare della biella; e graficamente, con il CIR della biella. Infine guardiamo che cosa succede ai punti morti.`,
      riepilogo: R`Derivando la legge approssimata la velocità è somma di due armoniche, a $\omega_1$ e $2\omega_1$. La legge esatta, derivata con la velocità angolare della biella, dà la forma compatta $-r\omega_1\sin(\theta+\gamma)/\cos\gamma$. Con il CIR della biella le velocità di B e C stanno come le loro distanze da K. Ai punti morti K coincide con C e il pistone è fermo, mentre la biella continua a ruotare.`,
    },
    d012: {
      introduzione: R`Per l'accelerazione partiamo dal metodo grafico: Rivals sulla manovella, poi sulla biella, contando le incognite per chiudere il poligono. Poi la via analitica: si deriva la velocità approssimata. Scopriremo che anche l'accelerazione ha due armoniche e che ai punti morti si sommano o si sottraggono.`,
      riepilogo: R`Con ω₁ costante il perno B ha solo accelerazione centripeta; sulla biella Rivals lascia due incognite scalari e il poligono si chiude. Derivando la velocità approssimata, l'accelerazione è un'armonica primaria più una secondaria, λ volte più piccola, a frequenza doppia. Al punto morto superiore si sommano, al punto morto inferiore si sottraggono: il pistone è fermo, ma l'accelerazione è massima al PMS.`,
    },
  },
  passi: {
    'd010.1': {
      tappa: 0,
      prima: R`Il pistone si muove lungo l'asse x, quindi ci basta la sua ascissa. Nel disegno, per andare da A a C percorri prima la manovella fino a B e poi la biella fino a C. L'ascissa di C è la somma dei due «passi in orizzontale». Quanto vale la proiezione orizzontale di un segmento lungo r inclinato di θ? E di uno lungo l inclinato di γ?`,
      dopo: R`L'ascissa del pistone è la proiezione della manovella, $r\cos\theta$, che arriva fino al piede H, più quella della biella, $l\cos\gamma$, da H a C. Controllo: con manovella e biella entrambe orizzontali e distese, $x_C = r + l$, la distanza massima possibile. Il problema è che γ è un'incognita e va eliminata.`,
    },
    'd010.2': {
      tappa: 0,
      prima: R`Prima di eliminare γ, scriviamo come cambia θ nel tempo. La manovella gira con velocità angolare costante ω₁, in verso antiorario, partendo da θ = 0. Se un angolo cresce sempre alla stessa velocità, come si scrive in funzione del tempo?`,
      dopo: R`L'angolo di manovella cresce in proporzione al tempo, come lo spazio di un'auto a velocità costante. Questa riga servirà quando deriveremo: ogni derivata di una funzione di θ porterà fuori il fattore ω₁. Controllo: dopo un tempo $2\pi/\omega_1$ la manovella ha fatto esattamente un giro.`,
    },
    'd010.3': {
      tappa: 0,
      prima: R`Ecco il trucco per eliminare γ. Il perno B appartiene sia alla manovella sia alla biella, quindi ha una sola quota. Vista da A, la quota di B è la proiezione verticale della manovella. Vista da C, che sta sull'asse a quota zero, è la proiezione verticale della biella. Uguaglia le due espressioni e dividi per l.`,
      dopo: R`La quota di B è $r\sin\theta$ e anche $l\sin\gamma$, quindi il seno dell'angolo di biella è λ volte il seno dell'angolo di manovella, con λ = r/l. Siccome λ è minore di 1, la biella è sempre meno inclinata della manovella. Controllo: con θ = 0 la manovella è orizzontale e anche la biella lo è.`,
    },
    'd010.4': {
      tappa: 0,
      prima: R`A noi però serve $\cos\gamma$, non $\sin\gamma$, perché è il coseno che compare nell'ascissa del pistone. C'è una relazione che lega seno e coseno dello stesso angolo: quale? Eleva al quadrato la relazione del passo precedente e usala.`,
      dopo: R`Da $\sin^2\gamma + \cos^2\gamma = 1$ il quadrato del coseno è 1 meno il quadrato del seno, cioè $1 - \lambda^2\sin^2\theta$. Ora a destra γ non c'è più: tutto dipende da θ. Controllo: il risultato sta sempre fra $1-\lambda^2$ e 1, quindi è positivo e la radice esiste.`,
    },
    'd010.5': {
      tappa: 0,
      prima: R`Manca un passaggio: estrarre la radice e sostituire nell'ascissa del passo 1. La radice ha due segni: quale scegli? Guarda il disegno: la biella va sempre verso destra, verso il pistone, e non diventa mai verticale perché λ è minore di 1. Il coseno di γ è quindi positivo.`,
      dopo: R`È la legge esatta della posizione del pistone in funzione del solo θ; la seconda forma si ottiene portando l dentro la radice. Vale per qualunque λ minore di 1, ma la radice la rende scomoda da derivare due volte: per questo la dispensa passa subito a un'approssimazione. Controllo: con θ = 0 dà $r + l$.`,
    },
    'd010.6': {
      tappa: 0,
      prima: R`Guardiamo le posizioni estreme del pistone. Quando è più lontano da A? Quando manovella e biella sono allineate e distese verso destra. E quando è più vicino? Quando la manovella punta a sinistra e la biella le torna sopra. A quali valori di θ corrispondono? Sostituisci nella legge esatta, ricordando che lì $\sin\theta = 0$.`,
      dopo: R`Con θ = 0 il pistone è a $r + l$, punto morto superiore; con θ = π è a $l - r$, punto morto inferiore. La loro distanza, la corsa, è 2r: dipende solo dalla manovella, non dalla biella. Nell'esempio della dispensa la manovella è lunga 0,03 m e la corsa 0,06 m. Ai punti morti i tre membri sono allineati.`,
    },
    'd013.1': {
      tappa: 1,
      prima: R`Partiamo dalla relazione esatta fra gli angoli ottenuta nella dimostrazione precedente, quella con il quadrato del coseno. È lì che nasce la radice che vogliamo semplificare, quindi conviene lavorare su questa espressione prima ancora di estrarre la radice.`,
      dopo: R`Il quadrato del coseno dell'angolo di biella è 1 meno un termine piccolo, $\lambda^2\sin^2\theta$, che al massimo vale λ². Con una biella lunga tre volte la manovella, λ² = 1/9: piccolo, ma non trascurabile. L'obiettivo è scrivere la radice di questa espressione in modo semplice.`,
    },
    'd013.2': {
      tappa: 1,
      prima: R`L'idea è riconoscere un quadrato. Chiediti: quale espressione, elevata al quadrato, dà $1 - \lambda^2\sin^2\theta$ più un termine piccolissimo? Prova con $1 - \frac{\lambda^2}{2}\sin^2\theta$: sviluppando il quadrato ottieni 1, poi il doppio prodotto, poi un termine in λ⁴. Per non cambiare niente, aggiungi e togli quello stesso termine.`,
      dopo: R`Abbiamo aggiunto e tolto la stessa quantità, quindi l'uguaglianza è ancora esatta. Ora il quadrato del coseno è un quadrato perfetto meno un resto, $\frac{\lambda^4}{4}\sin^4\theta$. Controllo: sviluppando $(1 - \frac{\lambda^2}{2}\sin^2\theta)^2$ ritrovi proprio i primi tre termini della riga.`,
    },
    'd013.3': {
      tappa: 1,
      prima: R`Adesso entra l'approssimazione. Il resto contiene λ⁴: con λ = 1/3, $\lambda^4/4$ vale circa 0,003, mentre il quadrato perfetto è vicino a 1. Possiamo trascurarlo. Quello che resta è un quadrato perfetto: come ne prendi la radice? Scegli il segno positivo, come prima.`,
      dopo: R`Il coseno dell'angolo di biella è circa 1 meno $\frac{\lambda^2}{2}\sin^2\theta$. È un'approssimazione, anche se la dispensa scrive «uguale». Coincide con la regola $\sqrt{1-u}\simeq 1 - u/2$ del richiamo. Controllo: con θ = 0 o π il coseno vale esattamente 1, e la formula approssimata lo dà giusto.`,
    },
    'd013.4': {
      tappa: 1,
      prima: R`Sostituisci questa approssimazione nell'ascissa del pistone, $r\cos\theta + l\cos\gamma$, e scrivi θ come ω₁t. Non c'è niente da semplificare: è una sostituzione. Ma da qui in poi la posizione non ha più radici e si deriva facilmente.`,
      dopo: R`È la legge approssimata della posizione, quella che la dispensa deriva per velocità e accelerazione. Il primo termine è l'ombra del perno sull'asse; il secondo è la lunghezza della biella, un po' ridotta quando la biella si inclina. Controllo: con λ = 0 (biella infinita) resta $r\cos\theta + l$, un moto armonico.`,
    },
    'd013.5': {
      tappa: 1,
      prima: R`Per vedere il significato del termine con $\sin^2\theta$ usa la duplicazione del richiamo: trasforma $\sin^2\theta$ in una costante più un termine in $\cos2\theta$. Poi raggruppa: le costanti insieme, poi il termine in $\cos\theta$, poi quello in $\cos2\theta$. Ricorda che $l\lambda^2 = r^2/l$.`,
      dopo: R`La posizione è una costante più due armoniche: la primaria, di ampiezza r e pulsazione ω₁, e la secondaria, di ampiezza $r^2/4l$ e pulsazione doppia. La secondaria nasce solo perché la biella ha lunghezza finita. Questa forma non è nella dispensa, ma spiega perché velocità e accelerazione avranno due armoniche.`,
    },
    'd011.1': {
      tappa: 2,
      prima: R`Il pistone si muove solo lungo x, quindi la sua velocità è la derivata dell'ascissa. Deriviamo la legge approssimata. Nel primo termine la derivata di $\cos\theta$ porta fuori $-\sin\theta$ per ω₁. Nel secondo devi derivare $\sin^2\theta$: è un quadrato, quindi esce 2 sin θ per la derivata di sin θ, che a sua volta porta fuori ω₁.`,
      dopo: R`Il primo termine è la velocità che il pistone avrebbe con biella infinita; il secondo, con il prodotto $\sin\theta\cos\theta$, è la correzione dovuta alla biella. Il 2 del quadrato si è semplificato con l'1/2 della formula. Controllo: ai punti morti, θ = 0 o π, il seno è zero e la velocità si annulla.`,
    },
    'd011.2': {
      tappa: 2,
      prima: R`Mettiamo in ordine la riga. Nel secondo termine c'è $l\lambda^2$: sapendo che λ = r/l, a che cosa equivale? Poi trasforma $\sin\theta\cos\theta$ con la duplicazione. Infine raccogli $-r\omega_1$, che è comune ai due termini.`,
      dopo: R`La velocità è $-r\omega_1$ per una somma di due seni: uno a pulsazione ω₁, l'altro a pulsazione doppia con peso λ/2. Il segno meno dice che, appena dopo il PMS, il pistone torna verso A. Controllo: con biella infinita (λ → 0) resta solo la prima armonica, il moto armonico.`,
    },
    'd011.3': {
      tappa: 2,
      prima: R`Ora la via esatta. Derivando $l\cos\gamma$ esce $\dot\gamma$, la rapidità con cui cambia l'angolo di biella: va calcolata. Parti dal vincolo $\sin\gamma = \lambda\sin\theta$ e derivalo da entrambe le parti con la regola della catena: a sinistra esce $\dot\gamma$, a destra ω₁. Poi isola $\dot\gamma$.`,
      dopo: R`L'angolo di biella cambia con rapidità $\lambda\omega_1\cos\theta/\cos\gamma$; la velocità angolare della biella è $-\dot\gamma$, per come è misurato γ nel disegno. Controllo: ai punti morti $\cos\theta = \pm1$ e $\cos\gamma = 1$, quindi la biella ruota con λω₁: non è ferma, anche se il pistone lo è.`,
    },
    'd011.4': {
      tappa: 2,
      prima: R`Deriva la legge esatta $x_C = r\cos\theta + l\cos\gamma$: dal primo termine esce $-r\omega_1\sin\theta$, dal secondo $-l\dot\gamma\sin\gamma$. Sostituisci $\dot\gamma$ e ricorda che $l\lambda = r$. Raccogli $-r\omega_1$ e porta tutto a denominatore comune $\cos\gamma$: al numeratore riconoscerai la formula di addizione del seno.`,
      dopo: R`La velocità esatta è $-r\omega_1\sin(\theta+\gamma)/\cos\gamma$: compatta e valida per qualunque λ minore di 1. Il numeratore si annulla quando manovella e biella sono allineate. Controllo: con γ piccolo, cioè biella lunga, si ritrova $-r\omega_1\sin\theta$, la prima armonica.`,
    },
    'd011.5': {
      tappa: 2,
      prima: R`Infine il metodo grafico. Il CIR K della biella sta sulla normale alla velocità di B e sulla normale alla velocità di C. La velocità di B è perpendicolare alla manovella: la sua normale è il prolungamento di AB. Quella di C è lungo la guida: la sua normale è la verticale per C. Scrivi le due velocità come rotazioni attorno a K e fai il rapporto dei moduli.`,
      dopo: R`Le velocità di B e C stanno fra loro come le loro distanze da K. Siccome conosci $V_B = \omega_1 r$, misuri KC e KB sul disegno e hai subito la velocità del pistone, senza derivate. È il metodo veloce per una posizione qualsiasi. Controllo: se K si avvicina a C, la velocità del pistone diventa piccola.`,
    },
    'd011.6': {
      tappa: 2,
      prima: R`Che cosa succede ai punti morti? Con θ = 0 o π manovella e biella stanno sull'asse x. Guarda dove va il prolungamento di AB: coincide con l'asse. E la verticale per C incontra l'asse proprio in C. Dove sta allora il CIR della biella? E che cosa dicono le formule con $\sin\theta = \sin\gamma = 0$?`,
      dopo: R`Ai punti morti il CIR della biella coincide con C, quindi la velocità del pistone è nulla: si ferma per invertire il moto, e le formule lo confermano. Però la biella non è ferma: ruota attorno a C con velocità angolare $\mp\lambda\omega_1$. Fermo è il pistone, non la biella.`,
    },
    'd012.1': {
      tappa: 3,
      prima: R`Per il metodo grafico partiamo dalla manovella, scrivendo Rivals con polo nella cerniera fissa A. Quanto vale l'accelerazione di un punto fisso? E il termine con l'accelerazione angolare, se ω₁ è costante? Resta un solo termine: quale?`,
      dopo: R`Il perno B ha solo accelerazione centripeta, lunga $\omega_1^2 r$ e diretta da B verso A. È come un sasso legato a una corda che gira a velocità costante: nessuna accelerazione lungo il cerchio, solo verso il centro. Controllo: il modulo non dipende da θ, come deve essere per una rotazione uniforme.`,
    },
    'd012.2': {
      tappa: 3,
      prima: R`Ora la biella, da B a C: scrivi Rivals con polo in B. Poi fai l'inventario di cosa sai di ogni termine: $\vec a_B$ lo conosci tutto; la centripeta della biella la conosci, perché $\omega_2$ l'hai già dalle velocità; del termine con $\dot\omega_2$ conosci solo la direzione, perpendicolare alla biella; di $\vec a_C$ solo la direzione, quella della guida. Quante incognite scalari restano?`,
      dopo: R`Restano due incognite scalari, i moduli di $\vec a_C$ e del termine tangenziale, e un'equazione vettoriale nel piano ne risolve esattamente due. Si mettono in fila $\vec a_B$ e la centripeta, poi si tracciano le due direzioni note: il loro incrocio chiude il poligono. Controllo al PMS: $-\omega_1^2 r$ più la centripeta della biella, $-\lambda\,r\omega_1^2$, danno $-r\omega_1^2(1+\lambda)$.`,
    },
    'd012.3': {
      tappa: 3,
      prima: R`Per la via analitica basta derivare la velocità approssimata, $-r\omega_1[\sin\omega_1 t + \frac{\lambda}{2}\sin2\omega_1 t]$. La derivata di $\sin\omega_1 t$ porta fuori ω₁. La derivata di $\sin2\omega_1 t$ porta fuori $2\omega_1$: guarda che cosa succede con l'1/2 che c'è davanti.`,
      dopo: R`L'accelerazione è $-r\omega_1^2$ per $\cos\omega_1 t + \lambda\cos2\omega_1 t$. Il 2 della pulsazione doppia ha cancellato l'1/2: per questo la seconda armonica pesa λ e non λ/2. Controllo sulle unità: metri per (radianti al secondo)² dà m/s².`,
    },
    'd012.4': {
      tappa: 3,
      prima: R`Dai un nome ai due termini dell'accelerazione appena trovata. Il primo oscilla con la stessa frequenza della manovella, il secondo con frequenza doppia. Scrivili separati, con le loro ampiezze, e chiediti da dove nasce ciascuno dei due.`,
      dopo: R`La primaria $a_I$ è l'accelerazione di un moto armonico di ampiezza r: quella che avresti con biella infinita. La secondaria $a_{II}$, a frequenza doppia, è λ volte più piccola e nasce dalla lunghezza finita della biella. Nei motori questa seconda armonica produce vibrazioni a frequenza doppia, difficili da equilibrare.`,
    },
    'd012.5': {
      tappa: 3,
      prima: R`Valutiamo l'accelerazione ai punti morti. Al punto morto superiore θ = 0: quanto valgono $\cos\theta$ e $\cos2\theta$? Al punto morto inferiore θ = π: quanto valgono adesso? Guarda se le due armoniche si sommano o si sottraggono.`,
      dopo: R`Al PMS i coseni valgono entrambi 1 e le armoniche si sommano: $-r\omega_1^2(1+\lambda)$. Al PMI $\cos\pi = -1$ ma $\cos2\pi = 1$, e si sottraggono: $r\omega_1^2(1-\lambda)$. Il pistone è fermo ma la sua accelerazione è massima. Nell'esempio della dispensa, a 1000 giri/min: −438,6 e +219,3 m/s². Qui l'approssimazione è esatta, perché γ = 0.`,
    },
  },
  racconto: R`All'orale parti dalla descrizione: manovella, biella e pistone, tre coppie rotoidali e una prismatica, un grado di libertà. Scrivi la posizione come somma delle proiezioni, $x_C = r\cos\theta + l\cos\gamma$, e lega γ a θ con la quota di B: $\sin\gamma = \lambda\sin\theta$. Di' che per λ piccolo si approssima la radice e si ottengono due armoniche. Derivando trovi la velocità, $-r\omega_1[\sin\theta + \frac{\lambda}{2}\sin2\theta]$, e l'accelerazione, $-r\omega_1^2[\cos\theta + \lambda\cos2\theta]$. Fai vedere il CIR della biella e chiudi con i punti morti: K coincide con C, il pistone è fermo, ma l'accelerazione è massima, con il fattore $(1+\lambda)$ al PMS e $(1-\lambda)$ al PMI.`,
};

// ------------------------------------------------------------------ c1-glifo
const glifo: LezioneArgomento = {
  perche: R`Pensa a una limatrice o a una piallatrice: l'utensile va avanti lentamente mentre taglia il metallo, poi torna indietro a vuoto. Il ritorno non produce niente, quindi conviene farlo il più in fretta possibile. Il motore però gira a velocità costante: come si ottiene un'andata lenta e un ritorno veloce senza cambiare la velocità del motore? Il glifo oscillante fa esattamente questo. **Perché, con la manovella che gira sempre alla stessa velocità, una corsa dura più dell'altra? E di quanto?** Nella dispensa il glifo compare poi come esempio delle forze vive, per calcolare la coppia del motore.`,
  idea: R`Immagina un'asta incernierata in basso, nel punto C, che può oscillare come un tergicristallo. Lungo l'asta c'è una scanalatura, la cava, in cui scorre il perno B di una manovella che gira attorno a un'altra cerniera, A, più in alto. Mentre la manovella gira, il perno trascina l'asta a destra e a sinistra.

L'asta si ferma e torna indietro quando la sua retta è tangente al cerchio descritto dal perno: in quel momento il perno si muove lungo la cava e non spinge più l'asta di lato. Le due posizioni tangenti dividono il cerchio in due archi diversi: uno grande, lontano da C, e uno piccolo, vicino a C. Siccome la manovella gira a velocità costante, l'arco grande richiede più tempo. L'asta però fa la stessa escursione in entrambi i casi: stessa strada in meno tempo, quindi un ritorno più veloce. Non è il motore a cambiare velocità: è la geometria.`,
  richiami: [
    { titolo: 'Composizione delle velocità', testo: R`Se un punto si muove su un corpo che a sua volta si muove, la sua velocità assoluta è la somma di due pezzi: la velocità di trascinamento, quella che avrebbe se fosse incollato al corpo, e la velocità relativa, il suo scorrere rispetto al corpo. Pensa a una persona che cammina su un treno: velocità del treno più velocità del passo.` },
    { titolo: 'Tangente a una circonferenza', testo: R`La retta tangente a una circonferenza in un punto è perpendicolare al raggio in quel punto. Se da un punto esterno C tracci le due tangenti, ottieni due triangoli rettangoli uguali, con l'angolo retto nel punto di tangenza. Il seno dell'angolo in C è raggio diviso distanza di C dal centro.` },
    { titolo: 'Moto uniforme della manovella', testo: R`Se la manovella gira con velocità angolare costante ω₁, l'angolo percorso cresce in proporzione al tempo: $\Delta\theta = \omega_1 t$. Il tempo per percorrere un arco è quindi l'angolo diviso ω₁: arco doppio, tempo doppio.` },
    { titolo: 'Teorema delle forze vive', testo: R`La potenza di tutte le forze e coppie che agiscono su un sistema è uguale alla derivata della sua energia cinetica. La potenza di una forza è forza scalare velocità del punto di applicazione; quella di una coppia è coppia scalare velocità angolare. Se le masse sono trascurabili l'energia cinetica è zero e la somma delle potenze è nulla.` },
    { titolo: 'Velocità in un corpo rigido', testo: R`Un punto di un corpo che ruota attorno a una cerniera fissa ha velocità $\vec\omega\wedge$(braccio): perpendicolare al raggio e lunga ω per la distanza. Per due punti dello stesso corpo vale $\vec V_B = \vec V_A + \vec\omega\wedge(B-A)$.` },
  ],
  ipotesiPerche: [
    R`Mettiamo in fila i membri del glifo a sei membri della dispensa: due cerniere fisse, manovella, glifo, biella e corsoio. La condizione d > r serve perché il glifo oscilli invece di fare giri completi.`,
    R`Il perno scorre nella cava: è un accoppiamento prismatico fra due membri che si muovono entrambi. Per questo la velocità del perno va scomposta in trascinamento più relativa.`,
    R`Con ω₁ costante il tempo è proporzionale all'angolo di manovella: è l'ipotesi che trasforma un rapporto fra angoli in un rapporto fra tempi.`,
    R`Servono per usare le forze vive nella forma più semplice: senza masse l'energia cinetica è zero, senza attrito la cava e la guida non assorbono potenza.`,
  ],
  disegnoGuida: R`Parti dalle due cerniere fisse: A in alto e C sotto, sulla stessa verticale, a distanza d. Attorno ad A disegna la circonferenza percorsa dal perno, di raggio r più piccolo di d, e la manovella AB con ω₁. Da C traccia il glifo, un'asta lunga che passa per B e arriva in D, con la cava disegnata come due linee parallele. Ora le due posizioni estreme: da C traccia le due tangenti alla circonferenza e segna l'angolo δ fra ciascuna e la verticale AC. Evidenzia i due archi di manovella: quello grande in alto, π + 2δ, e quello piccolo in basso, π − 2δ. Infine, se ti chiedono la parte dinamica, aggiungi la biella DE, il corsoio 4 sulla guida e la forza F.`,
  mappa: [
    'Posizioni estreme: il glifo si ferma, quindi CB è tangente al cerchio del perno.',
    'Il triangolo rettangolo dà δ e gli archi di manovella delle due corse.',
    'Dagli angoli ai tempi e alle velocità medie.',
    'Velocità nel perno: trascinamento più relativa, poi la catena fino al corsoio.',
    'Coppia motrice con le forze vive.',
  ],
  dims: {
    d008: {
      introduzione: R`Il rapido ritorno non è dimostrato nella dispensa: è una deduzione, ma usa solo strumenti che conosci. La strategia: trovare le due posizioni in cui il glifo si ferma per invertire il moto, ricavare gli angoli di manovella corrispondenti e misurare gli archi fra l'una e l'altra. Poi, con ω₁ costante, trasformare gli archi in tempi e i tempi in velocità medie.`,
      riepilogo: R`Il glifo inverte il moto quando la sua velocità angolare è zero: allora la velocità del perno è tutta lungo la cava, ma è anche perpendicolare alla manovella, quindi la cava è tangente al cerchio del perno. Il triangolo rettangolo ABC dà $\sin\delta = r/d$ e le posizioni estreme a −δ e π + δ. Gli archi fra queste sono π + 2δ e π − 2δ; con ω₁ costante i tempi stanno nello stesso rapporto, e a parità di corsa il ritorno è più veloce.`,
    },
    d009: {
      introduzione: R`Questa è la parte che la dispensa usa come esempio delle forze vive. Prima serve la cinematica: la velocità del perno vista in due modi, come punto della manovella e come punto che scorre sul glifo, dà la velocità angolare del glifo. Poi si passa all'estremo D, alla biella e al corsoio. Infine, con le velocità in mano, le forze vive danno la coppia motrice in una riga.`,
      riepilogo: R`Il perno B ha la velocità della manovella; la stessa velocità, vista dal glifo, è trascinamento più scorrimento lungo la cava. Proiettando sulla normale alla cava si trova $\omega_2$, proiettando lungo la cava la velocità relativa. Da $\omega_2$ si passa a D, e con la formula fondamentale sulla biella al corsoio. Le forze vive, con masse e attriti trascurati, eliminano tutte le reazioni: la coppia motrice è la potenza della forza sul corsoio divisa per ω₁, cambiata di segno.`,
    },
  },
  passi: {
    'd008.1': {
      tappa: 0,
      prima: R`Partiamo da una domanda: come riconosci la posizione in cui il glifo smette di andare in un verso e comincia ad andare nell'altro? Pensa a un'altalena che arriva in cima alla sua corsa: per un attimo è ferma. Che cosa vale, in quell'istante, la velocità angolare del glifo?`,
      dopo: R`Nelle posizioni estreme la velocità angolare del glifo è zero: l'angolo ψ, che dice quanto è inclinato il glifo, raggiunge un massimo o un minimo, e la sua derivata si annulla. È la condizione da imporre per trovare le posizioni estreme, proprio come si cerca il massimo di una funzione.`,
    },
    'd008.2': {
      tappa: 0,
      prima: R`Che cosa implica $\omega_2 = 0$ per il perno B? Scomponi la sua velocità come nel richiamo: trascinamento, cioè la velocità che avrebbe se fosse incollato al glifo, più relativa, lungo la cava. Se il glifo è fermo, il trascinamento sparisce. D'altra parte B è anche un punto della manovella, quindi la sua velocità ha una direzione precisa. Quali due direzioni devono coincidere?`,
      dopo: R`La velocità del perno deve essere sia lungo la cava sia perpendicolare alla manovella: quindi la cava è perpendicolare ad AB. In altre parole, la retta CB è tangente alla circonferenza descritta da B. Si capisce anche a occhio: quando la cava è tangente, il perno ci scorre dentro senza spingerla di lato.`,
    },
    'd008.3': {
      tappa: 1,
      prima: R`Guarda il triangolo A, B, C nella posizione estrema. L'angolo in B è retto, perché CB è perpendicolare ad AB. L'ipotenusa è AC, lunga d, e AB è il raggio r. Chiama δ l'angolo in C, fra il glifo e la verticale AC. Quale funzione trigonometrica di δ lega il cateto opposto all'ipotenusa?`,
      dopo: R`Il seno dell'angolo in C è r/d: dipende solo dal rapporto fra manovella e distanza delle cerniere. δ è anche metà dell'oscillazione del glifo, che va da −δ a +δ attorno alla verticale. Controllo: se r si avvicina a d, δ tende a 90° e il glifo oscilla moltissimo; se r è piccolo, anche δ è piccolo.`,
    },
    'd008.4': {
      tappa: 1,
      prima: R`Ci servono gli angoli di manovella delle due posizioni estreme. Nel triangolo rettangolo gli angoli in A e in C sommano 90°: quanto vale l'angolo in A fra la manovella e la verticale? Le due posizioni estreme sono simmetriche rispetto alla verticale AC, una a destra e una a sinistra. Ora misura θ dall'orizzontale, come al solito, sapendo che C sta sotto A.`,
      dopo: R`La manovella forma con la verticale verso C un angolo di 90° − δ, quindi sta δ sotto l'orizzontale: a destra θ = −δ, a sinistra θ = π + δ. Il punto cruciale è che i due raggi non sono opposti: sono entrambi un po' piegati verso il basso, verso C. È questa asimmetria a produrre il rapido ritorno.`,
    },
    'd008.5': {
      tappa: 1,
      prima: R`Fra le due posizioni estreme la manovella percorre due archi: uno passando dall'alto, lontano da C, e uno passando dal basso, vicino a C. Calcola il primo come differenza fra i due angoli estremi, π + δ e −δ. Il secondo è quello che manca per completare il giro.`,
      dopo: R`L'arco lontano da C misura π + 2δ, più di mezzo giro; quello vicino misura π − 2δ, meno di mezzo giro. La somma è 2π, un giro intero. Controllo: se δ fosse zero, cioè con C infinitamente lontano, i due archi sarebbero uguali e non ci sarebbe rapido ritorno.`,
    },
    'd008.6': {
      tappa: 2,
      prima: R`Ora trasformiamo gli angoli in tempi. La manovella gira con velocità angolare costante: quanto tempo impiega a percorrere un arco Δθ? Scrivilo per le due corse e fai il rapporto. Nota che ω₁ compare in entrambi i tempi.`,
      dopo: R`Il tempo è l'angolo diviso ω₁, quindi ω₁ si semplifica e il rapporto dei tempi è il rapporto degli archi, $(\pi+2\delta)/(\pi-2\delta)$, sempre maggiore di 1. Una corsa dura più dell'altra solo per ragioni geometriche. Esempio: con r/d = 1/2 si ha δ = 30° e il rapporto vale 2, la corsa lenta dura il doppio.`,
    },
    'd008.7': {
      tappa: 2,
      prima: R`Che cosa significa per la velocità dell'utensile? Nelle due corse il glifo fa la stessa escursione, da un estremo all'altro, quindi anche il corsoio percorre la stessa distanza s. La velocità media è spazio diviso tempo. Fai il rapporto fra la velocità media della corsa rapida e quella della corsa lenta.`,
      dopo: R`A parità di spazio la velocità media è inversamente proporzionale al tempo: il ritorno è più veloce dell'andata esattamente nel rapporto $(\pi+2\delta)/(\pi-2\delta)$. Ecco il risultato completo: non basta dire «c'è il rapido ritorno», bisogna dire perché (archi diversi a ω₁ costante) e di quanto.`,
    },
    'd009.1': {
      tappa: 3,
      prima: R`Partiamo dal perno B visto come punto della manovella. La manovella ruota attorno alla cerniera fissa A con velocità angolare ω₁. Ricorda il richiamo: che velocità ha un punto di un corpo che ruota attorno a un punto fisso? Pensa a direzione e modulo.`,
      dopo: R`La velocità del perno è perpendicolare alla manovella e vale ω₁r, costante in modulo perché ω₁ è costante. È la velocità nota del problema: tutto il resto si ricava da questa. Controllo: è tangente alla circonferenza percorsa da B.`,
    },
    'd009.2': {
      tappa: 3,
      prima: R`Ora guarda lo stesso perno dal punto di vista del glifo. B non è saldato al glifo: scorre nella cava. Quindi la sua velocità si scompone in trascinamento (come se fosse incollato al glifo, che ruota attorno a C) più relativa (lo scorrimento lungo la cava). Scrivi i due termini: che direzione ha ciascuno?`,
      dopo: R`La velocità di trascinamento è $\vec\omega_2\wedge(B-C)$, perpendicolare alla cava; la relativa è lungo la cava. Sono due direzioni perpendicolari fra loro, e la loro somma deve dare la velocità del passo 1. È un triangolo rettangolo di velocità, lo stesso schema del pistone oleodinamico della dispensa.`,
    },
    'd009.3': {
      tappa: 3,
      prima: R`Due incognite, $\omega_2$ e la velocità relativa, in un triangolo rettangolo: basta proiettare. Proietta la velocità del perno sulla normale alla cava: la relativa sparisce e resta il trascinamento, $\omega_2$ per CB. Poi proietta lungo la cava: resta la relativa. L'angolo fra la velocità del perno e la normale alla cava è θ − ψ, dove ψ è l'angolo del glifo.`,
      dopo: R`La velocità angolare del glifo è la componente della velocità del perno perpendicolare alla cava, divisa per la distanza CB, che cambia nel tempo. La relativa è l'altra componente. Controllo: nelle posizioni estreme la manovella è perpendicolare alla cava, θ − ψ = ±90°, il coseno è zero e $\omega_2 = 0$, come trovato prima.`,
    },
    'd009.4': {
      tappa: 3,
      prima: R`Passiamo all'estremo superiore D del glifo. D è saldato al glifo, che ruota attorno al fulcro fisso C con la velocità angolare $\omega_2$ appena trovata. Che velocità ha un punto di un corpo che ruota attorno a un punto fisso? È lo stesso ragionamento del passo 1, applicato a un altro corpo.`,
      dopo: R`La velocità di D è perpendicolare a CD e vale $\omega_2$ per CD. Siccome CD è più lungo di CB, D va più veloce del punto del glifo che sta sotto il perno: il glifo fa anche da leva che amplifica il moto. Controllo: quando $\omega_2 = 0$, anche D è fermo.`,
    },
    'd009.5': {
      tappa: 3,
      prima: R`Ora la biella DE, che porta il moto al corsoio. Scrivi la formula fondamentale delle velocità con polo in D. Poi fai l'inventario: di $\vec V_D$ sai tutto; del termine di rotazione della biella sai solo la direzione, perpendicolare a DE; di $\vec V_E$ sai solo la direzione, quella della guida orizzontale. Quante incognite scalari restano?`,
      dopo: R`Restano due incognite scalari, il modulo della velocità del corsoio e la velocità angolare della biella, e l'equazione vettoriale nel piano le risolve: è un triangolo delle velocità, come per il pistone del manovellismo. In alternativa puoi usare il CIR della biella. Ora conosciamo la velocità del corsoio, che serve per le forze vive.`,
    },
    'd009.6': {
      tappa: 4,
      prima: R`Ultimo obiettivo: la coppia motrice sulla manovella che vince la forza F sul corsoio. Usa il teorema delle forze vive: con masse trascurabili l'energia cinetica è zero, quindi la somma delle potenze è nulla. Per ogni forza esterna chiediti se fa potenza: le reazioni nelle cerniere fisse A e C? La reazione della guida sul corsoio, perpendicolare alla sua velocità? Che cosa resta?`,
      dopo: R`Restano solo la potenza della forza sul corsoio e quella della coppia motrice, e la loro somma è zero: la coppia vale $-F V_E/\omega_1$. Quando il corsoio va contro F, la coppia è concorde con ω₁: il motore spinge. Il vantaggio è enorme: nessuna reazione interna, nessun diagramma di corpo libero, bastano le velocità.`,
    },
  },
  racconto: R`All'orale parti dalla descrizione: manovella che gira con ω₁ costante, perno che scorre nella cava del glifo, glifo che oscilla attorno al fulcro C. Poi spiega le posizioni estreme: il glifo si ferma, $\omega_2 = 0$, la velocità del perno è tutta relativa, quindi la cava è perpendicolare alla manovella e CB è tangente al cerchio. Dal triangolo rettangolo $\sin\delta = r/d$; gli archi sono π + 2δ e π − 2δ e, con ω₁ costante, i tempi stanno nello stesso rapporto: stessa corsa, ritorno più veloce. Sottolinea che non accelera il motore, è la geometria. Se chiedono la dinamica, scomponi la velocità del perno in trascinamento più relativa e chiudi con le forze vive: $C_1 = -F V_E/\omega_1$.`,
};

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c1-cinematica-punto': cinematicaPunto,
  'c1-velocita': velocita,
  'c1-manovellismo': manovellismo,
  'c1-glifo': glifo,
};
