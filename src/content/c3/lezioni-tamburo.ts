/** Lezioni discorsive C3: ipotesi di Reye e freno a ceppi (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ====================================================================================================== c3-reye
export const reyeLezione: LezioneArgomento = {
  perche: r`Pensa al freno a tamburo di una vecchia auto: un ceppo ricoperto di ferodo viene premuto contro un tamburo che gira. Per calcolare quanto frena ti servono le forze che il ceppo scambia con il tamburo, e per avere le forze devi sapere come è distribuita la pressione sull'arco di contatto. Qui la statica si ferma: le equazioni di equilibrio ti danno solo le risultanti, non come la pressione si spalma punto per punto. Serve un'informazione in più, e la dà il modo in cui il ferodo si consuma. La domanda della lezione è: **come faccio a sapere dove il ceppo preme di più, se la statica non me lo dice?**`,
  idea:
    r`L'idea è guardare l'usura. Il ferodo si consuma perché striscia: dove la pressione è alta e lo strisciamento è veloce, si scalda di più e se ne va più materiale. Reye trasforma questa osservazione in una legge: il materiale asportato ogni secondo è proporzionale alla potenza dissipata dall'attrito, cioè (pressione) per (velocità di strisciamento). Quindi, se conosco il consumo e la velocità, conosco la pressione.` +
    '\n\n' +
    r`E il consumo da dove lo prendo? Dalla geometria del moto. Quando il ferodo si consuma, il ceppo si avvicina un pochino alla superficie, ruotando attorno alla sua cerniera o traslando nella sua guida. Lo spessore che sparisce in un punto è esattamente quanto quel punto del ceppo si è avvicinato. Così il consumo lo leggi dalla cinematica di accostamento, Reye lo traduce in pressione. Due ingredienti, uno cinematico e uno «di materiale», e il problema iperstatico si chiude. Lo vediamo nel tamburo (pressione quasi uniforme) e nel disco (pressione che cala come 1/r).`,
  richiami: [
    { titolo: 'Attrito radente (Coulomb)', testo: r`Quando due superfici strisciano, nasce una forza tangenziale opposta alla velocità relativa. Il suo modulo è f volte la forza normale: $dF_T = f\,dF_N$. Su un'areola dA premuta con pressione p la normale vale $p\,dA$, quindi l'attrito vale $f\,p\,dA$. Il coefficiente f dipende solo dai materiali.` },
    { titolo: 'Potenza di una forza', testo: r`La potenza di una forza è il prodotto scalare fra la forza e la velocità del punto su cui agisce: $W = \underline F\cdot\underline V$. Se forza e velocità sono parallele, il prodotto scalare è semplicemente il prodotto dei moduli (con segno meno se sono opposte). La potenza dell'attrito è sempre negativa: è energia che diventa calore.` },
    { titolo: 'Velocità di un corpo che ruota', testo: r`Se un corpo ruota con velocità angolare $\underline\omega$ attorno a un punto C, ogni suo punto P ha velocità $\underline\omega\wedge(P-C)$: perpendicolare al segmento CP, lunga ω per la distanza CP. Se il vettore (P − C) lo spezzi in due pezzi, la velocità si spezza nella somma dei due prodotti vettoriali.` },
    { titolo: 'Prodotto scalare con un versore', testo: r`Il prodotto scalare di un vettore con un versore $\underline n$ dà la componente del vettore lungo quella direzione. Se il vettore è perpendicolare a $\underline n$, la componente è zero. È lo strumento per dire «quanto di questa velocità va verso la superficie».` },
  ],
  ipotesiPerche: [
    r`Reye parla di materiale che si consuma strisciando: vale ovunque ci sia ferodo che striscia su qualcosa, tamburo, nastro o disco. Per questo una sola legge serve per tutti i freni del capitolo.`,
    r`All'inizio un ceppo nuovo tocca dove capita; dopo un po' di rodaggio la superficie si adatta e il consumo diventa quello imposto dal moto di avvicinamento. È a regime che ha senso leggere il consumo dalla cinematica.`,
    r`Con Coulomb l'attrito locale è $f\,p\,dA$, quindi la potenza dissipata contiene la pressione: è questo che lega consumo e pressione. La costante k riassume il materiale.`,
    r`I tre casi differiscono solo per come l'elemento frenante si avvicina: ruotando attorno a O′, ruotando attorno a O sopra il nastro, traslando. Cambia il moto, cambia il consumo, cambia la pressione.`,
  ],
  disegnoGuida: r`Disegna il tamburo, un cerchio di centro O e raggio R, e segna con una freccia curva il verso di ω: serve per la velocità di strisciamento. Traccia l'asse x orizzontale per O: sarà la bisettrice dell'arco di contatto. A destra disegna il ceppo come un arco di ampiezza α, simmetrico rispetto a x, e prolunga la sua leva fino alla cerniera O′ sulla verticale sotto O; quota la distanza OO′, che finirà nel risultato. Scegli un punto P sull'arco all'angolo θ dalla bisettrice e disegna la normale n che punta verso O. In P disegna la velocità di accostamento, cioè come P si avvicina al tamburo mentre il ceppo ruota attorno a O′: è orizzontale, verso il tamburo. Segna infine il punto medio m dell'arco: lì il consumo sarà massimo.`,
  mappa: [
    'Definisco il consumo: lo spessore di ferodo che se ne va ogni secondo.',
    'Scrivo Reye: il consumo è proporzionale a pressione per velocità di strisciamento.',
    'Ricavo il consumo dalla cinematica: come il ceppo (o il pattino) si avvicina alla superficie.',
    'Metto insieme le due cose e leggo la pressione.',
    'Uso la pressione trovata per calcolare la forza normale risultante.',
  ],
  dims: {
    d040: {
      introduzione: r`Vogliamo capire perché nel freno a tamburo si può prendere la pressione uniforme. La strategia ha due binari che poi si incontrano. Sul primo scriviamo Reye e scopriamo che, nel tamburo, consumo e pressione sono proporzionali. Sul secondo calcoliamo il consumo dal moto del ceppo attorno alla cerniera. Se il consumo è quasi costante lungo l'arco, lo sarà anche la pressione.`,
      riepilogo: r`Abbiamo definito il consumo come spessore asportato al secondo. Reye ci ha detto che è proporzionale alla potenza dissipata, e siccome nel tamburo tutti i punti strisciano alla stessa velocità ωR, consumo e pressione risultano proporzionali. La cinematica del ceppo che ruota attorno a O′ ci ha dato il consumo, che va come cos θ: massimo al centro, al più il 30 % in meno agli estremi. Trascurando questa variazione il consumo è uniforme, e quindi anche la pressione: ecco giustificato $p = p_0$.`,
    },
    d041: {
      introduzione: r`Ora la stessa ricetta su un disco. Cambiano due cose rispetto al tamburo: la velocità di strisciamento non è più la stessa ovunque, perché cresce con il raggio, e il pattino non ruota attorno a una cerniera ma trasla in una guida. Calcoliamo velocità e consumo, li mettiamo in Reye e otteniamo la pressione; poi la usiamo per trovare la forza normale.`,
      riepilogo: r`Nel disco un punto a raggio r striscia con velocità ωr. Il pattino trasla, quindi si consuma in modo uniforme. Reye dice che il consumo è proporzionale a r per p: se il consumo è costante, il prodotto r·p è costante e la pressione va come 1/r, alta al raggio interno e bassa all'esterno. Integrando, il raggio della pressione si semplifica con quello dell'area e la forza normale viene semplicissima; per la corona completa si ritrova la (5.85) della frizione.`,
    },
  },
  passi: {
    'd040.1': {
      tappa: 0,
      prima: r`Prima di tutto ci serve una grandezza che misuri l'usura. Immagina un'areola dA di ferodo: col tempo diventa più sottile. Se in un tempo dt il suo spessore cala di dδ, il volume che se n'è andato è uno spessore per un'area. Dividendo per dt ottieni un volume al secondo, come la portata di un rubinetto. E lo spessore perso al secondo, da solo, è la «rapidità di usura».`,
      dopo: r`La riga definisce due cose: la portata, volume asportato al secondo da dA, e il consumo $\dot\delta$, cioè quanti metri di spessore se ne vanno al secondo. Controllo delle unità: $\dot\delta$ è in m/s, moltiplicato per dA in m² dà m³/s, proprio una portata. Lo spessore è misurato lungo la normale alla superficie.`,
    },
    'd040.2': {
      tappa: 1,
      prima: r`Ora la legge fisica. Che cosa consuma il ferodo? Lo strisciamento sotto carico: più forte premi e più veloce strisci, più calore produci e più materiale perdi. La grandezza che mette insieme forza d'attrito e velocità di strisciamento è la potenza dissipata. L'ipotesi di Reye dice proprio che la portata di materiale è proporzionale a questa potenza, con una costante k che dipende dal materiale.`,
      dopo: r`A parole: volume asportato al secondo uguale a k per la potenza dell'attrito elementare. Il modulo serve perché la potenza dell'attrito è negativa, mentre il volume asportato è positivo. Attenzione alla velocità: è quella di **strisciamento** del tamburo rispetto al ceppo, non quella lentissima con cui il ceppo si avvicina. Controllo: se non c'è strisciamento (velocità zero) non c'è usura, ed è giusto.`,
    },
    'd040.3': {
      tappa: 1,
      prima: r`Rendiamo concreta la legge nel tamburo. Ci servono due vettori. La forza d'attrito sull'areola: modulo $f\,p\,dA$, diretta lungo la tangente $\underline e_\theta$ ma opposta al moto del tamburo, quindi con il segno meno. La velocità di strisciamento: il tamburo ruota, il punto P ha velocità ωR lungo $\underline e_\theta$. Sono due vettori sulla stessa retta: il loro prodotto scalare è semplicemente il prodotto dei moduli, con un segno meno che il modulo cancella.`,
      dopo: r`Il risultato è $k f p\,\omega R\,dA$: dA compare a entrambi i membri e si semplifica. Resta il consumo uguale a $k f \omega R$ per la pressione. Controllo di buon senso: raddoppiando la pressione o la velocità raddoppia l'usura, come ci si aspetta da un'energia dissipata.`,
    },
    'd040.4': {
      tappa: 1,
      prima: r`Guarda i fattori davanti alla pressione: k, f, ω, R. Chiediti quali di questi cambiano da un punto all'altro dell'arco. k e f sono del materiale, ω è la stessa per tutto il tamburo, R è il raggio, uguale per tutti i punti di contatto. Allora possiamo raccoglierli in un'unica costante e chiamarla k′.`,
      dopo: r`Nel tamburo consumo e pressione sono **proporzionali**: dove so il consumo, so la pressione, basta dividere per k′. Questo succede perché nel tamburo tutti i punti strisciano alla stessa velocità ωR. Nel disco non sarà così, e lì la proporzionalità includerà anche il raggio.`,
    },
    'd040.5': {
      tappa: 2,
      prima: r`Adesso il secondo binario: quanto vale il consumo nel punto P? Pensa a cosa succede mentre il ferodo si consuma: il ceppo, ruotando lentamente attorno a O′, si avvicina al tamburo, e lo spessore perso in P è proprio quanto P si è avvicinato lungo la normale. Quindi il consumo è la componente normale della velocità di accostamento di P. Per calcolarla, spezza il vettore $(P-O')$ passando per O: un pezzo da O a P, uno da O′ a O. Chiediti quale dei due dà velocità perpendicolare alla normale.`,
      dopo: r`Il pezzo $\underline\omega_{acc}\wedge(P-O)$ è tangente all'arco, quindi non ha componente lungo la normale e sparisce. Resta il pezzo con $(O-O')$, un vettore verticale lungo OO′, che ruotato da $\underline\omega_{acc}$ diventa orizzontale: la sua proiezione sulla normale in P dà il fattore cos θ. Controllo: in θ = 0 (punto m) la normale è orizzontale e il consumo è massimo, $\omega_{acc}\overline{OO'}$.`,
    },
    'd040.6': {
      tappa: 2,
      prima: r`Quanto varia il consumo lungo l'arco? Il massimo è al centro, θ = 0, dove il coseno vale 1. Il minimo è agli estremi, θ = ±α/2. Facciamo il rapporto fra estremo e centro: il fattore $\omega_{acc}\overline{OO'}$ si semplifica e resta un solo coseno. Poi mettiamo un numero: gli archi dei ceppi reali arrivano al più a 90°.`,
      dopo: r`Con α = 90° l'estremo è a 45° dal centro e cos 45° ≈ 0,7: agli estremi il ferodo si consuma circa il 30 % in meno che al centro. Non è zero, ma nemmeno una differenza enorme. Controllo: se α fosse piccolissimo il rapporto tenderebbe a 1, consumo perfettamente uniforme.`,
    },
    'd040.7': {
      tappa: 3,
      prima: r`Ora uniamo i due binari. Dalla cinematica sappiamo che il consumo varia poco lungo l'arco: decidiamo di trascurare quel 30 % e prenderlo costante, uguale al valore al centro. Da Reye sappiamo che la pressione è il consumo diviso k′. Che cosa succede alla pressione se il consumo è costante?`,
      dopo: r`Anche la pressione è costante, $p_0$. Questa è la giustificazione dell'ipotesi $p = p_0$ usata per calcolare le risultanti del freno a ceppi. È un'approssimazione, e sai di quanto: con archi fino a 90° l'errore è dell'ordine del 30 % agli estremi. Non è un'ipotesi sul ceppo nuovo: viene da Reye più la cinematica.`,
    },
    'd041.1': {
      tappa: 1,
      prima: r`Passiamo al disco: un pattino a forma di settore di corona circolare è premuto su un disco che gira. Primo ingrediente di Reye: la velocità di strisciamento. Il disco ruota con ω attorno al suo centro O; il punto P a distanza r ha velocità ω per la distanza, perpendicolare al raggio. Pensa a una giostra: chi sta sul bordo va più veloce di chi sta vicino al centro.`,
      dopo: r`La velocità è $\omega r$ lungo la tangente $\underline e_\theta$ e **cresce con il raggio**: questa è la grande differenza rispetto al tamburo, dove era ωR per tutti. Controllo: al centro (r = 0) non si striscerebbe affatto. La dispensa scrive R per il raggio corrente; qui usiamo r per non confonderlo con un raggio fisso.`,
    },
    'd041.2': {
      tappa: 2,
      prima: r`Secondo ingrediente: il consumo, dalla cinematica di accostamento. Come si avvicina il pattino al disco? Nella pinza il pattino scorre in una guida, una coppia prismatica: non ruota, trasla perpendicolarmente al disco. Chiediti che velocità hanno i punti di un corpo che trasla. E il consumo è la componente di quella velocità lungo la normale al disco.`,
      dopo: r`In una traslazione tutti i punti hanno la stessa velocità: quindi il consumo è **uguale in ogni punto** del pattino. Nota la differenza con il tamburo: lì il ceppo ruotava attorno a O′ e il consumo variava come cos θ. Qui il consumo non dipende dal fatto che fuori si strisci di più: è imposto dalla guida.`,
    },
    'd041.3': {
      tappa: 1,
      prima: r`Scriviamo Reye esattamente come nel tamburo, ma con la nuova velocità. La forza d'attrito sull'areola è ancora $f\,p\,dA$ lungo la tangente, opposta al moto; la velocità di strisciamento ora è $\omega r$ invece di ωR. Fai il prodotto scalare di due vettori paralleli, semplifica dA e raccogli in una costante ciò che non dipende dal punto: k, f, ω. Il raggio r invece resta fuori, perché cambia da punto a punto.`,
      dopo: r`Il consumo è $k'$ per r per p. A parole: a parità di pressione, i punti più esterni si consumerebbero di più, perché strisciano più veloci. Controllo: se r fosse costante (un anello sottilissimo) si ritornerebbe al caso del tamburo, consumo proporzionale alla pressione.`,
    },
    'd041.4': {
      tappa: 3,
      prima: r`Mettiamo insieme le due informazioni. Dalla cinematica il consumo è costante su tutto il pattino. Da Reye il consumo vale $k'$ per r per p. Se il prodotto $r\,p$ deve dare sempre lo stesso numero, che cosa deve fare la pressione quando r cresce? Ricava p dividendo il consumo per $k'r$ e chiama la costante che resta K″.`,
      dopo: r`La pressione va come 1/r: è un'iperbole, alta al raggio interno e bassa all'esterno. Il senso fisico: fuori si striscia più veloce, quindi per consumare la stessa quantità basta meno pressione. Controllo: è il contrario dell'intuizione «fuori si striscia di più, quindi si preme di più», ed è un tipico errore all'orale.`,
    },
    'd041.5': {
      tappa: 4,
      prima: r`Con la pressione nota possiamo calcolare la forza normale totale, sommando $p\,dA$ su tutto il settore. In coordinate polari l'areola è un rettangolino curvo di lati dr e $r\,d\theta$, quindi $dA = r\,dr\,d\theta$. Gli estremi: θ da −α/2 a α/2, r da $r_i$ a $r_e$. Guarda cosa succede quando moltiplichi $K''/r$ per l'area che contiene r.`,
      dopo: r`Le due r si semplificano e l'integrando è la costante K″: l'integrale doppio è solo K″ per l'ampiezza angolare α per la larghezza radiale $r_e - r_i$. Le forze normali sono tutte parallele (perpendicolari al disco), quindi la risultante è davvero la somma dei moduli. Controllo: con un settore più largo o più alto la forza cresce, come deve.`,
    },
    'd041.6': {
      tappa: 4,
      prima: r`Nella frizione il contatto non è un settore ma una corona completa, cioè α = 2π. In più di solito si conosce la forza assiale N che serra i dischi, non la costante della pressione. Allora rifacciamo l'integrale sull'anello intero (area di un anello sottile: $2\pi r\,dr$) e usiamolo al contrario: da N ricaviamo la costante, e da questa la pressione in ogni punto.`,
      dopo: r`La costante vale $N/[2\pi(r_e - r_i)]$ e la pressione è la (5.85) del libro. Qui la costante si chiama K invece di K″: è la stessa cosa. Controllo: la pressione cresce con N e cala con r, e moltiplicata per l'area della corona torna esattamente N.`,
    },
    'd041.7': {
      tappa: 3,
      prima: r`Quanto è disuniforme questa pressione? Confrontiamo il valore al raggio interno con quello al raggio esterno. Nel rapporto la costante si semplifica e restano solo i raggi. Pensa anche alla storia del disco: da nuovo tocca dappertutto con pressione circa uniforme, come nella figura 5-62 a.`,
      dopo: r`Il rapporto è $r_e/r_i$, maggiore di 1: la pressione massima è all'interno. Racconto della figura 5-62: con pressione uniforme Reye dice che fuori si consuma di più; il disco si assottiglia all'esterno, lì preme di meno, e alla fine si arriva all'iperbole. Con $r_e = 2r_i$ la pressione interna è il doppio di quella esterna.`,
    },
  },
  racconto: r`All'orale parti dal problema: il contatto esteso è iperstatico, la statica dà le risultanti ma non la distribuzione di pressione. Poi enunci Reye: il volume asportato al secondo è proporzionale alla potenza dissipata, $\dot\delta\,dA = k\,|d\underline F_T\cdot\underline V|$, quindi il consumo va come pressione per velocità di strisciamento. Il consumo lo leggi dalla cinematica di accostamento, $\dot\delta = \underline V_{acc}\cdot\underline n$. Tamburo: velocità ωR uguale ovunque, consumo $\dot\delta(0)\cos\theta$ quasi uniforme, quindi $p \simeq p_0$. Disco: pattino che trasla, consumo uniforme, velocità ωr, quindi $p = K''/r$. Accenni al pattino: consumo lineare, $p = k'x$.`,
};

// ====================================================================================================== c3-ceppi
export const ceppiLezione: LezioneArgomento = {
  perche: r`Nel freno a tamburo di un'auto o di un montacarichi un ceppo, spinto da una leva, preme sulla superficie di un tamburo che gira e lo frena per attrito. Due ceppi uguali, montati simmetrici e spinti con la stessa forza, frenano però in modo diverso: uno molto più dell'altro. E con certe geometrie un ceppo si serra da solo, senza che nessuno lo spinga. Le domande che guidano la lezione sono: **quanto vale la forza frenante di un ceppo, dove agisce, e perché il verso di rotazione del tamburo cambia tutto?**`,
  idea:
    r`Il ceppo tocca il tamburo lungo un arco. In ogni punto dell'arco il ceppo spinge il tamburo verso il centro (forza normale) e lo «gratta» in verso opposto al moto (forza d'attrito, f volte la normale). Sommando tutte queste forzine si ottiene una forza unica, la forza frenante, inclinata rispetto alla normale di un angolo fisso, l'angolo d'attrito φ. Una forza che passa vicino al centro ma non per il centro: la sua distanza da O è sempre R sin φ, quindi è tangente a un cerchietto, il cerchio d'attrito.` +
    '\n\n' +
    r`Poi si guarda il ceppo come un corpo in equilibrio attorno alla sua cerniera. Su di lui agiscono il comando, la normale e l'attrito del tamburo. La normale si oppone sempre al comando. L'attrito invece dipende dal verso del tamburo: se il tamburo trascina il ceppo nello stesso verso in cui lo spinge il comando, l'attrito dà una mano e il ceppo preme di più (ceppo avvolgente); se lo trascina al contrario, lo frena (svolgente). Nel caso estremo l'attrito fa tutto da solo: autobloccaggio. È come una porta che si apre verso il vento o contro il vento.`,
  richiami: [
    { titolo: 'Integrale di una forza distribuita', testo: r`Se tante forze piccole agiscono su un arco, la loro risultante è l'integrale vettoriale. Quando le forze cambiano direzione, si scompone ciascuna lungo due assi fissi $\underline i$ e $\underline j$ e si integra ogni componente separatamente, come numeri. Sommare i soli moduli darebbe un valore troppo grande se le forze si aprono a ventaglio.` },
    { titolo: 'Funzioni pari e dispari su intervalli simmetrici', testo: r`Su un intervallo simmetrico, da −a ad a, l'integrale di una funzione dispari (come sin θ) è zero: i contributi a destra e a sinistra si cancellano. Quello di una funzione pari (come cos θ) è il doppio dell'integrale da 0 ad a. La primitiva di cos θ è sin θ, quindi $\int_{-a}^{a}\cos\theta\,d\theta = 2\sin a$.` },
    { titolo: 'Equilibrio alla rotazione', testo: r`Un corpo fermo ha somma dei momenti nulla rispetto a qualsiasi polo. Il momento è forza per braccio, il braccio è la distanza del polo dalla retta d'azione. Conviene scegliere il polo dove passa una forza incognita, ad esempio la cerniera: la sua reazione ha braccio zero e sparisce dall'equazione.` },
    { titolo: 'Angolo d\'attrito', testo: r`Se l'attrito vale f volte la normale, la forza totale (normale più attrito) è inclinata sulla normale di un angolo φ con $\operatorname{tg}\varphi = f$. Questo angolo non dipende da quanto premi: premendo di più la forza cresce ma non si inclina di più. È la stessa idea del cono d'attrito.` },
  ],
  ipotesiPerche: [
    r`Diamo un nome a ogni oggetto: senza raggio R, arco α, profondità B e cerniera non possiamo scrivere né gli integrali né l'equilibrio. I gradi di libertà ci dicono se possiamo sapere in anticipo dove agisce la forza (rigido) o no (libero).`,
    r`La pressione uniforme viene da Reye: per archi fino a 90° il consumo varia al più del 30 %. Con p costante gli integrali si fanno a mano e le risultanti si possono pensare applicate nel punto medio M.`,
    r`Coulomb ci dà l'attrito come f volte la normale e quindi l'angolo φ fisso. L'equilibrio statico va bene perché il ceppo si muove pochissimo: le sue forze d'inerzia sono trascurabili.`,
    r`L'attrito si oppone al moto del tamburo: invertendo ω si inverte la componente tangenziale, cambia la tangente al cerchio d'attrito e si scambiano i ruoli dei ceppi. Senza il verso il problema non è definito.`,
  ],
  disegnoGuida: r`Disegna il tamburo, cerchio di centro O e raggio R, e segna subito il verso di ω (in dispensa orario): deciderà tutto. Ai lati disegna i due ceppi esterni, ciascuno un arco di ampiezza α simmetrico rispetto all'orizzontale per O, con le loro leve che scendono fino alla cerniera comune O′ sotto O; quota OO′ (braccio della normale) e h (braccio del comando). In cima alle leve metti le forze F, che spingono i ceppi verso il tamburo. Segna il punto medio M di ciascun arco. Disegna il cerchio d'attrito, concentrico al tamburo, di raggio ρ = R sin φ, piccolo. Per M traccia la retta della forza frenante, tangente al cerchio d'attrito dalla parte giusta. Dove incontra la retta di F trovi Z; la retta da Z a O′ è la reazione della cerniera. Chiudi con il poligono F, F_f, Φ_O′.`,
  mappa: [
    'Sommo le forze normali del ceppo sul tamburo: la risultante normale.',
    'Sommo le forze d\'attrito: risultante tangenziale, forza frenante e cerchio d\'attrito.',
    'Scrivo l\'equilibrio del ceppo attorno alla cerniera: avvolgente o svolgente.',
    'Spingo al limite: autobloccaggio.',
    'Guardo dove il ceppo si consuma e dove mettere il centro di rotazione.',
  ],
  dims: {
    d038: {
      introduzione: r`Cerchiamo la forza totale con cui il ceppo spinge il tamburo verso il centro. Le forze normali elementari puntano tutte verso O ma ognuna in una direzione diversa: non possiamo sommare i moduli. La strategia è scrivere la forza elementare come vettore, scomporla lungo $\underline i$ e $\underline j$, e integrare ogni componente usando la simmetria dell'arco.`,
      riepilogo: r`Abbiamo scritto la forza normale elementare come pressione per area per la normale che punta verso O. Con la pressione uniforme l'integrale lungo $\underline i$ dà $2p_0RB\sin(\alpha/2)$, quello lungo $\underline j$ si annulla per simmetria. La risultante normale sta quindi sulla bisettrice, verso il centro, e la pensiamo applicata nel punto medio. È un po' più piccola della somma dei moduli, perché le forzine si aprono a ventaglio.`,
    },
    d039: {
      introduzione: r`Stessa operazione per le forze d'attrito, poi le componiamo con la normale. Avremo la forza frenante totale e il momento frenante sul tamburo. La sorpresa è geometrica: la forza frenante ha sempre la stessa distanza da O, quindi è tangente a un cerchio fisso. Chiuderemo controllando quanto è buona l'approssimazione di applicare tutto in M.`,
      riepilogo: r`La forza d'attrito elementare è f volte la normale, lungo la tangente e contro il moto del tamburo. Integrando con p uniforme resta solo la componente perpendicolare alla bisettrice, e vale f volte la risultante normale. La forza frenante è inclinata di φ = arctg f sulla normale; applicata in M ha braccio R sin φ rispetto a O: è tangente al cerchio d'attrito. Il momento frenante esatto supera $F_T R$ di poco (11 % a 90°), e ha sempre verso opposto a ω.`,
    },
    d042: {
      introduzione: r`Ora sappiamo dove passa la forza frenante, ma non quanto vale: dipende dalla forza di comando F. Per legarle guardiamo un ceppo alla volta come corpo in equilibrio e scriviamo i momenti attorno alla cerniera O′. Lo facciamo per il ceppo destro e per il sinistro: le equazioni sembrano gemelle, ma un segno cambia, ed è lì che nasce la differenza fra avvolgente e svolgente.`,
      riepilogo: r`Sul ceppo agiscono comando, normale e attrito del tamburo, più la reazione di O′ che con il polo in O′ sparisce. Nel ceppo destro (tamburo orario) l'attrito si oppone al comando e la forza tangenziale ha denominatore $\overline{OO'}/f + R$; nel sinistro lo aiuta e il denominatore è $\overline{OO'}/f - R$. Quindi il sinistro, avvolgente, frena di più. Il criterio è il verso del momento dell'attrito rispetto alla cerniera, non destro o sinistro: invertendo ω i ruoli si scambiano. Il momento totale è la somma dei due.`,
    },
    d043: {
      introduzione: r`Nel ceppo avvolgente il denominatore contiene una sottrazione. Che cosa succede se si annulla? Partiamo dalla formula di d042, la leggiamo al contrario (quanta forza di comando serve) e cerchiamo la condizione per cui ne serve zero. Poi la interpretiamo con il disegno: la retta della forza frenante che passa per la cerniera.`,
      riepilogo: r`Leggendo l'equilibrio al contrario, la forza di comando necessaria è proporzionale a $\overline{OO'}/f - R$. Quando questo termine si annulla, cioè $f = \overline{OO'}/R$, serve forza zero: il momento dell'attrito equilibra da solo quello della normale e la forza frenante passa per la cerniera. Con f più grande il ceppo si serra da solo: autobloccaggio, il «freno d'emergenza» della dispensa. In progetto si tiene $\overline{OO'}$ con margine sopra $f_{max}R$. Il pattino ha la stessa struttura.`,
    },
    d142: {
      introduzione: r`Fin qui il centro di rotazione del ceppo era sotto O e il consumo massimo cadeva al centro dell'arco. Ma se la cerniera è messa altrove? Generalizziamo il calcolo del consumo di Reye a un centro C qualsiasi, troviamo dove cade il massimo, e ricaviamo la regola di progetto: dove mettere C perché il ceppo si consumi in modo simmetrico.`,
      riepilogo: r`Nel tamburo pressione e consumo sono proporzionali. Il consumo è la componente normale della velocità di accostamento attorno al centro C; il pezzo con (P − O) è tangente e sparisce, resta un vettore costante proiettato su una normale che ruota, e viene un seno. Il massimo cade dove OP è perpendicolare a OC. Perché cada nel punto medio, C deve stare sulla retta per O perpendicolare alla bisettrice. Nell'accostamento libero la cerniera A si mette sulla retta per M tangente al cerchio d'attrito.`,
    },
  },
  passi: {
    'd038.1': {
      tappa: 0,
      prima: r`Cominciamo da un pezzettino di ceppo nel punto P, all'angolo θ dalla bisettrice. Ci servono tre cose: la direzione della forza, l'area su cui agisce, il modulo. Il ceppo spinge il tamburo verso il centro: la direzione è quella che va da P a O, cioè opposta al raggio. L'area: una striscia lunga un arco $R\,d\theta$ e profonda quanto il tamburo, B. Il modulo: pressione per area.`,
      dopo: r`Il versore $\underline n$ punta verso O e vale $-\cos\theta\,\underline i - \sin\theta\,\underline j$: controlla che in θ = 0 punti esattamente a sinistra, verso il centro. La forza elementare è $p\,dA$ lungo $\underline n$. L'apice (C,T) ricorda che è la forza del ceppo sul tamburo: per il ceppo basterà cambiare segno.`,
    },
    'd038.2': {
      tappa: 0,
      prima: r`Per avere la forza totale bisogna sommare tutti i pezzettini da un estremo all'altro dell'arco, da −α/2 a α/2. Le forze stanno tutte nello stesso piano, quindi la somma si può fare. Ma attenzione: ogni forza ha la sua direzione, perché $\underline n$ cambia con θ. Che tipo di somma serve allora?`,
      dopo: r`Serve un integrale **vettoriale**: dentro c'è $\underline n(\theta)$, che cambia da punto a punto. Non si può portare fuori. Il modo pratico è usare la scomposizione di $\underline n$ in $\underline i$ e $\underline j$, che sono fissi, e fare due integrali di numeri. È quello che facciamo nei due passi successivi.`,
    },
    'd038.3': {
      tappa: 0,
      prima: r`Componente lungo $\underline i$, cioè lungo la bisettrice. Prendi dalla forza elementare solo il pezzo con $\underline i$: il coefficiente è $-\cos\theta$. Con la pressione costante $p_0$, anche $p_0$, R e B sono costanti e si portano fuori dall'integrale. Resta l'integrale di cos θ fra −α/2 e α/2: la primitiva di cos θ è sin θ, e la differenza fra gli estremi raddoppia, perché il seno è dispari.`,
      dopo: r`La componente lungo la bisettrice vale $-2p_0RB\sin(\alpha/2)$: negativa, cioè verso il centro, come deve essere. Controllo con un arco piccolo: sin(α/2) ≈ α/2 e si ottiene $p_0 R\alpha B$, pressione per area dell'arco, come se le forze fossero tutte parallele.`,
    },
    'd038.4': {
      tappa: 0,
      prima: r`Componente lungo $\underline j$, cioè perpendicolare alla bisettrice. Il coefficiente è $-\sin\theta$. Prima di fare conti, guarda il disegno: prendi il punto P sopra la bisettrice e il suo simmetrico sotto. Le loro forze verso O hanno componente orizzontale uguale e componente verticale opposta. Che cosa ti aspetti dalla somma delle componenti verticali?`,
      dopo: r`Zero: le componenti lungo $\underline j$ si cancellano a coppie. In termini di integrale, sin θ è dispari e l'intervallo è simmetrico. Controllo: se l'arco non fosse simmetrico rispetto all'asse x, questa componente non si annullerebbe e la risultante non starebbe sulla bisettrice.`,
    },
    'd038.5': {
      tappa: 0,
      prima: r`Rimettiamo insieme le due componenti: una vale $-2p_0RB\sin(\alpha/2)$ lungo $\underline i$, l'altra è zero. Scriviamo il vettore e diamo un nome al suo modulo. Poi chiediamoci dove applicarlo: se la pressione è la stessa dappertutto e l'arco è simmetrico, quale punto dell'arco è il candidato naturale?`,
      dopo: r`La risultante normale è diretta lungo la bisettrice, verso il centro, e vale in modulo $2p_0RB\sin(\alpha/2)$. Con pressione uniforme la pensiamo applicata nel punto medio m dell'arco, θ = 0: la dispensa dice «in prima approssimazione», e in d039 vedremo di quanto si sbaglia.`,
    },
    'd038.6': {
      tappa: 0,
      prima: r`Confrontiamo la risultante con la somma dei soli moduli delle forze elementari, cioè pressione per area totale $p_0 R\alpha B$. Ci aspettiamo che la risultante sia più piccola: le forze puntano tutte verso O ma non sono parallele, come le stecche di un ventaglio. Fai il rapporto e semplifica $p_0RB$.`,
      dopo: r`Il rapporto è $\sin(\alpha/2)/(\alpha/2)$, sempre minore di 1. Con α = 90° vale circa 0,90: si perde il 10 % per l'apertura a ventaglio. Per α che tende a zero il rapporto tende a 1: le forze diventano parallele, ed è il caso del pattino piano.`,
    },
    'd039.1': {
      tappa: 1,
      prima: r`Passiamo all'attrito sul pezzettino in P. Due domande: quanto vale e dove punta. Quanto: per Coulomb f volte la normale, cioè $f\,p\,dA$. Dove: si oppone alla velocità del punto del tamburo, che ruota e ha velocità ωR lungo la tangente $\underline e_\theta$. Ci serve anche $\underline e_\theta$ scritto con $\underline i$ e $\underline j$, per poter integrare.`,
      dopo: r`La forza d'attrito elementare è $-f\,p\,dA\,\underline e_\theta$: il segno meno dice che è contro il moto del tamburo, quindi lo frena. Il versore tangente è $-\sin\theta\,\underline i + \cos\theta\,\underline j$: in θ = 0 punta in su, che con tamburo antiorario è proprio il verso del moto in quel punto.`,
    },
    'd039.2': {
      tappa: 1,
      prima: r`Integriamo come per le normali. Lungo $\underline j$ il coefficiente di $\underline e_\theta$ è cos θ, pari; lungo $\underline i$ è −sin θ, dispari. Prima di calcolare, prevedi: quale componente si salva per simmetria e quale si cancella? Poi porta fuori $f p_0 R B$ e usa lo stesso integrale del coseno di prima.`,
      dopo: r`Si salva la componente lungo $\underline j$, perpendicolare alla bisettrice, e vale $-2fp_0RB\sin(\alpha/2)$; quella lungo $\underline i$ è zero. Senso fisico: le forze d'attrito sono tangenti, quindi al centro sono verticali, e i loro pezzi orizzontali sopra e sotto si compensano.`,
    },
    'd039.3': {
      tappa: 1,
      prima: r`Confronta il modulo appena trovato con quello della risultante normale. Sono due espressioni quasi identiche: guarda che fattori hanno in comune e che cosa cambia. Il fattore geometrico $2\sin(\alpha/2)$ è lo stesso perché normali e tangenziali si aprono a ventaglio allo stesso modo.`,
      dopo: r`Le risultanti stanno esattamente nel rapporto f: $|F_T| = f|F_N|$. Sembra ovvio, ma non è una regola generale: vale qui perché la pressione è uniforme e normali e tangenti ruotano insieme. Nel freno a disco vedremo che la risultante tangenziale è più piccola di f volte la normale.`,
    },
    'd039.4': {
      tappa: 1,
      prima: r`Ora sommiamo normale e attrito in una sola forza, l'azione totale del ceppo sul tamburo: la forza frenante. Una componente lungo −$\underline i$ di modulo $|F_N|$, una lungo −$\underline j$ di modulo $f|F_N|$. È un vettore obliquo. Che angolo fa con la normale? Pensa al triangolo rettangolo formato dalle due componenti.`,
      dopo: r`L'angolo φ ha tangente uguale al rapporto fra le componenti, cioè f: è l'angolo d'attrito. Non dipende da quanto premi né dall'arco. Se ω cambia verso, cambia il verso della componente tangenziale e la forza si inclina dall'altra parte della normale.`,
    },
    'd039.5': {
      tappa: 1,
      prima: r`Che momento frenante dà il ceppo sul tamburo, rispetto al centro O? Ragiona pezzettino per pezzettino. Le forze normali passano tutte per O: braccio zero. Le forze d'attrito sono tangenti al tamburo: il braccio di ciascuna rispetto a O è esattamente R. Allora il momento totale è R per la somma dei moduli delle forze d'attrito, cioè R per $f p_0$ per l'area dell'arco.`,
      dopo: r`Il momento esatto vale $f p_0 R^2 B\alpha$. Qui non serve nessuna approssimazione: tutti i bracci sono R e si sommano i moduli, non i vettori. Tieni a mente questo numero: nel passo successivo lo confronteremo con quello che si ottiene applicando la risultante in M.`,
    },
    'd039.6': {
      tappa: 1,
      prima: r`Ora l'approssimazione della dispensa: applichiamo le risultanti nel punto medio M. La normale passa per O e non dà momento; la tangenziale in M ha braccio R. Poi rileggiamo lo stesso momento usando la forza frenante intera: la sua componente tangenziale è $|F_f|\sin\varphi$. A che distanza da O deve passare la forza frenante per dare quel momento?`,
      dopo: r`A distanza $\rho = R\sin\varphi$: la forza frenante è tangente a un cerchio di raggio ρ concentrico al tamburo, il **cerchio d'attrito**. Le tangenti sono due, sopra e sotto il centro: si sceglie quella per cui la forza del ceppo sul tamburo dà momento opposto a ω. Con f = 0,4, ρ ≈ 0,37 R.`,
    },
    'd039.7': {
      tappa: 1,
      prima: r`Quanto è buona l'approssimazione? Abbiamo due momenti: quello esatto, $f p_0 R^2 B\alpha$, e quello approssimato, $|F_T|R$ con $|F_T| = 2fp_0RB\sin(\alpha/2)$. Fai il rapporto: f, $p_0$, R² e B si semplificano e resta un rapporto fra l'angolo e il suo seno.`,
      dopo: r`Il rapporto è $(\alpha/2)/\sin(\alpha/2)$, maggiore di 1: il momento vero è un po' più grande. A 90° vale 1,11, cioè l'11 % in più. Vuol dire che la retta della risultante passa un po' più lontano da O di quanto dica M. Lo stesso fattore ricomparirà nel freno a disco come braccio $b_t$.`,
    },
    'd039.8': {
      tappa: 1,
      prima: r`Ultima cosa: il verso del momento frenante. Chiediti che cosa fa un freno: si oppone alla rotazione. Se il tamburo ruota in verso antiorario ($\underline\omega$ lungo +$\underline k$), il momento del ceppo deve essere orario, e viceversa. Scriviamolo con il segno della componente lungo $\underline k$.`,
      dopo: r`Il momento frenante ha sempre segno opposto a ω. È questa regola che, nel metodo grafico, decide quale tangente al cerchio d'attrito è quella giusta: dipende dal verso di rotazione e dalla geometria (ceppo esterno o interno, a destra o a sinistra).`,
    },
    'd042.1': {
      tappa: 2,
      prima: r`Isoliamo un ceppo e chiediamoci quali forze lo tengono in equilibrio. C'è il comando F all'estremo della leva; c'è l'azione del tamburo sul ceppo (opposta a quella del ceppo sul tamburo), che scomponiamo in normale e attrito applicati in M; c'è la reazione della cerniera O′, che non conosciamo. Quale polo conviene per i momenti, se vogliamo liberarci dell'incognita più scomoda?`,
      dopo: r`Il polo è O′: la reazione della cerniera passa di lì e sparisce. Restano tre momenti con bracci noti: F con braccio h, la normale con braccio $\overline{OO'}$ (è orizzontale e passa per M, alla quota di O), l'attrito con braccio R (è verticale e passa per M, a distanza R dalla verticale per O′).`,
    },
    'd042.2': {
      tappa: 2,
      prima: r`Ceppo destro, tamburo orario. Nel punto M, a destra, il tamburo si muove verso il basso e trascina con sé il ceppo: l'attrito sul ceppo punta in basso. La normale spinge il ceppo verso destra, via dal tamburo. Ora guarda i versi rispetto a O′: F spinge la leva verso il tamburo, in un verso; la normale la spinge via, nel verso opposto. E l'attrito verso il basso, applicato a destra di O′, da che parte fa girare la leva?`,
      dopo: r`Normale e attrito girano il ceppo nello stesso verso, opposto a F: l'attrito **si oppone al comando**. Con la definizione usuale questo è il ceppo svolgente. Attenzione: la dispensa qui lo chiama «avvolgente (compresso)», con i nomi invertiti rispetto all'uso comune; la fisica però è la stessa (NF-18).`,
    },
    'd042.3': {
      tappa: 2,
      prima: r`Nell'equazione ci sono due incognite, $F_N$ e $F_T$, ma Coulomb le lega: $F_N = F_T/f$. Sostituisci, raccogli $F_T$ fra i due termini che lo contengono, e dividi per quello che resta in parentesi. Vogliamo $F_T$ in funzione del solo comando, perché è $F_T$ che dà il momento frenante.`,
      dopo: r`La forza tangenziale del ceppo destro è $Fh$ diviso $\overline{OO'}/f + R$. A parole: il comando deve vincere due momenti che si sommano, quello della normale e quello dell'attrito, quindi il denominatore è una somma. Controllo: con f che tende a zero, $F_T$ tende a zero, giusto. Il momento frenante è $F_T R$.`,
    },
    'd042.4': {
      tappa: 2,
      prima: r`Ceppo sinistro, stesso tamburo orario. In M, a sinistra, il tamburo si muove verso l'alto e trascina il ceppo verso l'alto. Rifai il ragionamento sui versi rispetto a O′: la normale spinge il ceppo via dal tamburo, contro F. E l'attrito verso l'alto, applicato a sinistra di O′, gira la leva nello stesso verso di F o nel verso opposto? Scrivi l'equazione e ripeti la sostituzione di Coulomb.`,
      dopo: r`Qui l'attrito gira il ceppo nello stesso verso di F: **aiuta il comando**. Nel denominatore compare una differenza, $\overline{OO'}/f - R$, quindi a parità di F la forza frenante è più grande. Con la definizione usuale (e con quella che la dispensa dà a p. 110) è il ceppo avvolgente; qui la dispensa lo chiama «svolgente (teso)».`,
    },
    'd042.5': {
      tappa: 2,
      prima: r`Confrontiamo i due ceppi, spinti dalla stessa F: facciamo il rapporto fra le due forze tangenziali. $Fh$ si semplifica e restano i due denominatori. Chiediti quale dei due è più piccolo, e quindi quale forza è più grande.`,
      dopo: r`Il rapporto è maggiore di 1: il ceppo avvolgente frena di più. Con $\overline{OO'}/f = 2R$ il rapporto vale 3. Il criterio da dire all'orale: si guarda il **momento dell'attrito del tamburo sul ceppo rispetto alla cerniera**. Concorde con il comando, avvolgente; discorde, svolgente. Fra i due ceppi non c'è simmetria.`,
    },
    'd042.6': {
      tappa: 2,
      prima: r`Il tamburo sente entrambi i ceppi. Ogni ceppo dà un momento frenante uguale alla sua forza tangenziale per R, oppure, che è lo stesso, alla sua forza frenante totale per il braccio ρ rispetto a O. Che cosa fa il tamburo con due momenti dello stesso verso, entrambi contro ω?`,
      dopo: r`Li somma: il momento frenante totale è la somma delle due forze tangenziali per R. È la regola dello schema di p. 113. Nota che il contributo maggiore viene dal ceppo avvolgente: se si guastasse quello, la frenata calerebbe molto più che perdendo lo svolgente.`,
    },
    'd042.7': {
      tappa: 2,
      prima: r`Che cosa succede se il tamburo gira al contrario, ad esempio un'auto in retromarcia? L'attrito si oppone sempre al moto del tamburo, quindi su ogni ceppo l'attrito cambia verso. Rifai mentalmente il ragionamento sui momenti: chi era aiutato dall'attrito adesso ne è ostacolato.`,
      dopo: r`I ruoli si scambiano: il ceppo destro diventa avvolgente e il sinistro svolgente. Per questo non bisogna memorizzare «il sinistro frena di più»: va sempre fatto il ragionamento sul momento dell'attrito rispetto alla cerniera, partendo dal verso di ω.`,
    },
    'd043.1': {
      tappa: 3,
      prima: r`Riprendiamo la formula del ceppo avvolgente, quella con la differenza al denominatore. Invece di chiederci quanto frena con una certa F, chiediamoci il contrario: quanta F serve per ottenere una certa forza frenante? Basta moltiplicare in croce e dividere per h.`,
      dopo: r`Il comando necessario è la forza frenante per $(\overline{OO'}/f - R)/h$. Leggila così: il comando deve fornire solo la parte del momento della normale che l'attrito non copre. Più l'attrito aiuta, meno comando serve. Controllo: con f piccolo il termine $\overline{OO'}/f$ è grande e serve molto comando.`,
    },
    'd043.2': {
      tappa: 3,
      prima: r`Guarda il denominatore della formula originale: $\overline{OO'}/f - R$. È una differenza fra due numeri positivi. Immagina che f cresca, ad esempio perché il ferodo si scalda: $\overline{OO'}/f$ cala e si avvicina a R. Che cosa succede alla frazione quando il denominatore si avvicina a zero?`,
      dopo: r`La forza frenante cresce senza limite anche con F finita: una spintarella basta per una frenata enorme. Fisicamente il ceppo «si aggrappa» al tamburo. La dispensa la chiama condizione di **freno d'emergenza**; è l'autobloccaggio.`,
    },
    'd043.3': {
      tappa: 3,
      prima: r`Diciamolo in un altro modo: per quale valore di f il comando necessario diventa esattamente zero, pur avendo forza frenante? Dalla formula al contrario, F è zero quando la parentesi si annulla. Risolvi per f. Pensa anche al significato: chi deve equilibrare il momento della normale se il comando non c'è?`,
      dopo: r`Il valore limite è $f_{lim} = \overline{OO'}/R$: il momento dell'attrito $F_T R$ equilibra da solo quello della normale $F_N\overline{OO'}$. È la forma delle fonti derivate, $\mu_{lim} = b_N/b_T$: braccio della normale diviso braccio dell'attrito. Con OO′ = 0,3 R, il limite è f = 0,3.`,
    },
    'd043.4': {
      tappa: 3,
      prima: r`Ora l'interpretazione grafica. La forza frenante del tamburo sul ceppo passa per M ed è inclinata di φ sulla normale. Se il comando è zero, sul ceppo restano solo due forze: la forza frenante e la reazione della cerniera. Due forze in equilibrio devono essere collineari. Allora per dove deve passare la retta della forza frenante?`,
      dopo: r`Deve passare per la cerniera O′: la distanza di O′ dalla retta è zero esattamente quando $Rf = \overline{OO'}$. A quel punto la forza frenante non ha momento rispetto a O′ e il ceppo sta in equilibrio da solo. Con f maggiore la retta passa dall'altra parte di O′ e il momento cambia verso: il ceppo viene tirato dentro.`,
    },
    'd043.5': {
      tappa: 3,
      prima: r`Oltre il limite, cioè con f maggiore di $\overline{OO'}/R$, la formula darebbe un comando negativo. Che cosa significa una F negativa? Che per tenere il ceppo in equilibrio bisognerebbe tirarlo via dal tamburo. E un progettista come si difende, sapendo che f cambia con temperatura e usura?`,
      dopo: r`F negativa vuol dire che il ceppo si serra da solo: il freno si blocca. In progetto si sceglie la geometria in modo che $\overline{OO'}$ sia più grande di $f_{max}R$, con margine, dove $f_{max}$ è il massimo coefficiente prevedibile. L'avvolgente è utile perché amplifica il comando, ma va tenuto lontano dal limite.`,
    },
    'd043.6': {
      tappa: 3,
      prima: r`La stessa struttura compare nel freno a pattino che frena un nastro. Lì il braccio della normale rispetto alla cerniera è $x_0$ e quello dell'attrito è la quota h. Prova a scrivere la forza frenante per analogia: braccio della normale diviso f, meno braccio dell'attrito, al denominatore.`,
      dopo: r`Il pattino dà $F_T = C_{az}/(x_0/f - h)$ quando l'attrito aiuta la coppia, e diverge per $x_0/f = h$. La dispensa lo chiama «freno di sicurezza» e dice che «causa l'impuntamento». Cambia il nome, non la fisica: un denominatore che si annulla.`,
    },
    'd142.1': {
      tappa: 4,
      prima: r`Ricordiamo che cosa ci ha dato Reye nel tamburo. Il consumo è proporzionale a pressione per velocità di strisciamento, e nel tamburo la velocità di strisciamento è ωR in ogni punto dell'arco. Quindi quale relazione resta fra consumo e pressione?`,
      dopo: r`Consumo e pressione sono proporzionali, con la costante k′. Quindi la domanda «dove il ceppo preme di più?» equivale a «dove il ceppo si consuma di più?». E il consumo lo sappiamo calcolare dalla cinematica: è il prossimo passo.`,
    },
    'd142.2': {
      tappa: 4,
      prima: r`Il consumo in P è quanto P si avvicina al tamburo lungo la normale, al secondo. Il ceppo, mentre si consuma, ruota lentamente attorno al suo centro di rotazione, che chiamiamo C: nell'accostamento rigido è la cerniera O′, ma ora lo lasciamo libero di stare dove vogliamo. Scrivi la velocità di P per un corpo che ruota attorno a C.`,
      dopo: r`La velocità di accostamento di P è $\underline\omega_{acc}\wedge(P-C)$ e il consumo è la sua componente normale. Rispetto a p. 108 abbiamo solo sostituito O′ con un C generico: il conto di prima diventa il caso particolare con C sotto O.`,
    },
    'd142.3': {
      tappa: 4,
      prima: r`Stesso trucco di p. 108: spezza $(P-C)$ passando per il centro del tamburo, cioè $(P-O) + (O-C)$. Il primo pezzo, ruotato da $\underline\omega_{acc}$, dà una velocità perpendicolare al raggio OP, cioè tangente all'arco. Che componente normale ha un vettore tangente?`,
      dopo: r`Nessuna: il primo pezzo sparisce. Resta $\underline\omega_{acc}\wedge(O-C)\cdot\underline n$. Leggilo bene: $\underline\omega_{acc}\wedge(O-C)$ è un vettore **fisso**, lo stesso per tutti i punti; quello che cambia da punto a punto è solo la normale, che ruota con θ. Il consumo è la proiezione di un vettore fisso su una direzione che gira.`,
    },
    'd142.4': {
      tappa: 4,
      prima: r`Facciamo il conto esplicito. Mettiamo C a distanza $\overline{OC}$ da O, nella direzione dell'angolo γ. Calcola $(O-C)$, ruotalo di 90° con il prodotto vettoriale per $\omega_{acc}\underline k$, e moltiplica scalarmente per $\underline n = -\cos\theta\,\underline i - \sin\theta\,\underline j$. Alla fine riconosci la formula di sottrazione del seno.`,
      dopo: r`Il consumo vale $\omega_{acc}\overline{OC}\sin(\theta - \gamma)$. Controllo: con la cerniera sotto O, γ = −90°, si ha $\sin(\theta + 90°) = \cos\theta$, proprio la legge di p. 108. Il consumo è massimo dove il seno vale 1.`,
    },
    'd142.5': {
      tappa: 4,
      prima: r`Dove cade il massimo del consumo lungo l'arco? Deriva rispetto a θ e uguaglia a zero, oppure ragiona direttamente: il seno è massimo quando il suo argomento vale 90°. Traduci poi la condizione in geometria: che angolo fanno OP e OC nel punto di massimo?`,
      dopo: r`Il massimo è a $\theta = \gamma + 90°$, cioè nel punto P per cui OP è perpendicolare a OC. Lì la velocità di accostamento è tutta lungo la normale e il consumo vale $\omega_{acc}\overline{OC}$. Più ci si allontana da quel punto, più la velocità diventa tangente e il consumo cala.`,
    },
    'd142.6': {
      tappa: 4,
      prima: r`Vogliamo un ceppo che si consumi in modo simmetrico, con il massimo nel punto medio dell'arco, sulla bisettrice (θ = 0). Usa la condizione appena trovata: quanto deve valere γ perché il massimo cada in θ = 0? E dove sta allora C rispetto a O e alla bisettrice?`,
      dopo: r`Serve γ = −90°: C sulla retta per O **perpendicolare alla bisettrice**. È la frase della dispensa «il centro di rotazione si troverà sulla normale rispetto alla bisettrice». Con la bisettrice orizzontale vuol dire C sulla verticale per O, come O′ a p. 108: consumo simmetrico, massimo al centro, legge cos θ.`,
    },
    'd142.7': {
      tappa: 4,
      prima: r`Nell'accostamento libero il ceppo è collegato a un'asta e ha due gradi di libertà: non c'è un centro di rotazione fisso. Sul ceppo agiscono solo due forze, la forza frenante del tamburo e la reazione della cerniera A. Che cosa sai di due forze in equilibrio? E se vuoi che la forza frenante passi per il punto medio M, dove devi mettere A?`,
      dopo: r`Le due forze sono collineari, quindi la forza frenante passa per A. Per averla in M (consumo simmetrico e massimo al centro) si traccia la retta per M tangente al cerchio d'attrito e si mette A su quella retta. In pratica la cerniera va «più in alto» di dove la si metterebbe d'istinto.`,
    },
  },
  racconto: r`All'orale parti dal disegno con il verso di ω. Con pressione uniforme, giustificata da Reye per α fino a 90°, integri: $|F_N| = 2p_0RB\sin(\alpha/2)$ sulla bisettrice, $|F_T| = f|F_N|$ perpendicolare. La forza frenante è inclinata di φ = arctg f, applicata in M ha braccio $\rho = R\sin\varphi$: è tangente al cerchio d'attrito, dalla parte che dà momento opposto a ω. Poi l'equilibrio del ceppo attorno alla cerniera: se il momento dell'attrito è concorde con il comando il ceppo è avvolgente, $F_T = Fh/(\overline{OO'}/f - R)$, e frena di più; se discorde è svolgente, con il segno più. Chiudi con l'autobloccaggio per $f = \overline{OO'}/R$ e avverti che la dispensa scambia i nomi.`,
};
