/** Lezioni discorsive C3: frizioni (piana, conica, centrifuga) e partitore di frenata (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ====================================================================================================== c3-frizione-piana
export const frizionePianaLezione: LezioneArgomento = {
  perche: r`Quando in auto lasci il pedale della frizione, il motore che gira veloce si collega alle ruote ferme, e per un attimo la frizione slitta finché tutto gira insieme. Dentro ci sono due dischi, uno attaccato al motore e uno al cambio, premuti l'uno contro l'altro da una molla. Per progettarla bisogna sapere quanta coppia può trasmettere senza slittare e quanto calore produce ogni volta che si innesta. Le domande sono: **quanta coppia trasmette una frizione a dischi con una forza assiale N, e quanta energia si perde durante l'innesto?**`,
  idea:
    r`Una frizione a disco è un freno a disco in cui la pastiglia è diventata una corona completa e in cui girano entrambi i dischi. Durante lo slittamento ogni pezzettino di corona trasmette una forza d'attrito f p dA con braccio r; la somma dei momenti è la coppia. La pressione si trova con Reye come nel freno a disco: il disco trasla lungo l'asse, quindi il consumo è uniforme, la velocità relativa cresce con r, e la pressione cala come 1/r. Il risultato è la stessa formula del freno: f per N per il raggio medio. Con più dischi in pacco, ogni superficie aggiunge la sua parte.` +
    '\n\n' +
    r`Durante l'innesto la coppia d'attrito rallenta il lato motore e accelera il lato condotto, finché le velocità si uguagliano; da lì in poi i dischi sono incollati (aderenza). Nel frattempo l'attrito ha lavorato strisciando: quell'energia è diventata calore. Se l'innesto è rapidissimo, come un urto, si conserva il momento della quantità di moto, e il lavoro perso è la differenza di energia cinetica, come in un urto anelastico fra due volani.`,
  richiami: [
    { titolo: 'Freno a disco con Reye', testo: r`Pastiglia che trasla, consumo uniforme, velocità di strisciamento proporzionale a r: per Reye $p = K/r$. Integrando su un settore si ottiene $M_f = fF_N r_m$, con $r_m = (r_e + r_i)/2$. La frizione è lo stesso conto con una corona completa.` },
    { titolo: 'Area di un anello sottile', testo: r`Un anello di raggio r e spessore dr, srotolato, è una striscia lunga $2\pi r$ e larga dr: area $2\pi r\,dr$. Su una corona completa la pressione dipende solo da r, quindi conviene integrare per anelli invece che in r e θ.` },
    { titolo: 'Equazione di moto di un albero', testo: r`Per un albero con momento d'inerzia I vale coppie motrici meno coppie resistenti uguale a $I\dot\omega$. Se la somma delle coppie è positiva l'albero accelera. Scritta con le forze d'inerzia (D'Alembert) diventa $\sum C - I\dot\omega = 0$.` },
    { titolo: 'Urto anelastico fra volani', testo: r`Se due corpi si agganciano in un tempo brevissimo, le forze esterne non fanno in tempo a lavorare: si conserva la quantità di moto (qui il momento della quantità di moto $I\omega$). L'energia cinetica invece cala: la differenza si dissipa in calore.` },
  ],
  ipotesiPerche: [
    r`Servono le due inerzie e le due coppie per scrivere il moto dei due alberi durante l'innesto; servono i raggi e la forza assiale per integrare la coppia d'attrito.`,
    r`A regime la superficie d'attrito si è consumata fino alla condizione stabile: è lì che vale Reye con consumo uniforme e pressione $K/r$. Da nuova la pressione sarebbe più uniforme e la coppia un po' maggiore: il calcolo a usura è prudente.`,
    r`Coulomb dà l'attrito $f\,p\,dA$ durante lo slittamento. Che la stessa N prema tutte le superfici è vero perché i dischi del pacco sono liberi di scorrere assialmente: la forza passa da un disco all'altro.`,
    r`Finché i dischi slittano la coppia è quella d'attrito, fissata da f, N e geometria. Quando le velocità si uguagliano non c'è più strisciamento e la coppia la decide il resto del sistema, purché resti sotto il limite.`,
  ],
  disegnoGuida: r`Disegna un asse orizzontale tratto-punto: è l'asse comune dei due alberi. A sinistra l'albero motore 1, con la freccia della velocità ω₁, l'inerzia I₁ e la coppia motrice C_m; a destra l'albero condotto 2 con ω₂, I₂ e la coppia resistente C_r, di verso opposto. Al centro disegna i due dischi affacciati, con in mezzo lo strato di materiale d'attrito. Aggiungi le due forze N, una per lato, che spingono i dischi l'uno contro l'altro: senza N non c'è attrito. Accanto fai la vista frontale della corona di contatto fra r_i e r_e, con un punto P a raggio r e un anello sottile dr. Infine disegna la pressione sulla corona: più alta al raggio interno, più bassa all'esterno, come un'iperbole.`,
  mappa: [
    'Riconosco la frizione come un freno a disco con corona completa, in cui girano entrambi i dischi.',
    'Con Reye trovo la pressione in funzione della forza assiale N.',
    'Integro la coppia: f N r_m, moltiplicata per il numero di superfici.',
    'Guardo l\'innesto: slittamento, aderenza e lavoro perso.',
  ],
  dims: {
    d052: {
      introduzione: r`Due parti. Nella prima calcoliamo la coppia che la frizione trasmette mentre slitta: ricaviamo la pressione con Reye, la leghiamo alla forza assiale, integriamo forza per braccio su tutta la corona e generalizziamo a più dischi. Nella seconda guardiamo l'innesto nel tempo: le equazioni dei due alberi, la velocità comune finale e l'energia dissipata quando l'innesto è rapido.`,
      riepilogo: r`La frizione assiale è un freno a disco a corona completa. Con Reye la pressione è $K/r$ e la costante si fissa con la forza assiale: $p = N/[2\pi r(r_e - r_i)]$. Integrando forza d'attrito per braccio si ottiene $C_f = fNr_m$, e con i superfici d'attrito premute dalla stessa N si moltiplica per i. Durante l'innesto la coppia frena il motore e accelera il condotto; quando le velocità si uguagliano si passa all'aderenza. Se l'innesto è un urto si conserva $I\omega$ e si perde $I_1I_2(\omega_{10} - \omega_{20})^2/[2(I_1 + I_2)]$, che diventa calore.`,
    },
  },
  passi: {
    'd052.1': {
      tappa: 0,
      prima: r`Confrontiamo la frizione con qualcosa che conosciamo già. Due dischi serrati da una forza perpendicolare, uno dei quali porta materiale d'attrito, che strisciano uno sull'altro. Ti ricorda un freno? Chiediti che cosa cambia: nel freno il disco gira e la pastiglia è ferma; qui girano entrambi. Che effetto ha questo sulla velocità relativa di un punto a raggio r?`,
      dopo: r`La frizione assiale è un freno a disco ad accostamento rigido con la corona completa, α = 2π. L'unica differenza è che entrambi i dischi ruotano: la velocità di strisciamento è $(\omega_1 - \omega_2)r$, ma resta proporzionale a r. Per Reye conta solo questo: il conto del freno vale tale e quale.`,
    },
    'd052.2': {
      tappa: 1,
      prima: r`La pressione. Il disco mobile si avvicina traslando lungo l'asse, quindi il consumo è uniforme; la velocità relativa è proporzionale a r; Reye dà allora $p = K/r$. Ma K non lo conosciamo, conosciamo la forza N della molla. Sommiamo la pressione su tutta la corona, per anelli di area $2\pi r\,dr$, e imponiamo che il totale sia N.`,
      dopo: r`L'integrale dà $2\pi K(r_e - r_i)$: uguagliandolo a N si trova K e quindi la pressione in ogni punto, la (5.85). Controllo: la pressione è massima al raggio interno, come nel freno a disco, e cresce in proporzione a N.`,
    },
    'd052.3': {
      tappa: 2,
      prima: r`Ora la coppia. Ogni anello di raggio r ha area $2\pi r\,dr$, la pressione vale $K/r$, quindi la forza d'attrito sull'anello è $f$ per $K/r$ per $2\pi r\,dr$. Il braccio rispetto all'asse è r. Conta le r nell'integrando prima di integrare.`,
      dopo: r`Dopo le semplificazioni resta una sola r, che integrata dà $(r_e^2 - r_i^2)/2$. La coppia è $2\pi fK(r_e^2 - r_i^2)/2$. Manca solo da esprimere K tramite N.`,
    },
    'd052.4': {
      tappa: 2,
      prima: r`Dal passo della pressione sappiamo che $2\pi K = N/(r_e - r_i)$. Sostituiscilo nella coppia e usa la differenza di quadrati $r_e^2 - r_i^2 = (r_e - r_i)(r_e + r_i)$: un fattore si semplifica.`,
      dopo: r`$C_f = fN(r_e + r_i)/2$: la (5.84), identica al momento del freno a disco $fF_Nr_m$. La coppia dipende dalla forza della molla, dal coefficiente d'attrito e dal raggio medio. Con N = 3000 N, f = 0,3 e $r_m$ = 0,1 m si trasmettono 90 N·m per superficie.`,
    },
    'd052.5': {
      tappa: 2,
      prima: r`Se serve più coppia, si potrebbe allargare il disco, ma l'ingombro cresce. L'alternativa è un pacco di dischi alternati, uno collegato al motore e uno al condotto. Tutti scorrono assialmente, quindi la stessa N li attraversa e preme ogni superficie di contatto. Se le superfici d'attrito sono i, quanta coppia trasmette il pacco?`,
      dopo: r`Ogni superficie trasmette $fNr_m$, e le coppie si sommano: $C_f = i\,fNr_m$, la (5.86). È il modo di ottenere coppie elevate senza ingrandire il diametro: il libro cita realizzazioni fino a 60 dischi. Attenzione: i conta le superfici, non i dischi.`,
    },
    'd052.6': {
      tappa: 3,
      prima: r`Che cosa succede quando le velocità dei due dischi diventano uguali? Non c'è più strisciamento, quindi l'attrito dinamico smette di agire. I due dischi si comportano come un pezzo solo. Chiediti chi decide allora la coppia che passa attraverso la frizione.`,
      dopo: r`Si passa all'**aderenza**: la coppia trasmessa è quella richiesta dall'equilibrio dinamico del sistema, purché non superi il limite di aderenza. Se il carico chiede di più, la frizione torna a slittare: fa anche da limitatore di coppia.`,
    },
    'd052.7': {
      tappa: 3,
      prima: r`Torniamo alla fase di slittamento e scriviamo il moto dei due alberi. Sull'albero motore agiscono la coppia motrice, in avanti, e la coppia d'attrito della frizione, che lo frena. Sull'albero condotto la coppia d'attrito lo tira avanti e la coppia resistente lo frena. Scrivi per ciascuno coppie meno inerzia per accelerazione uguale a zero.`,
      dopo: r`La stessa $C_f$ compare con segni opposti: frena il motore, accelera il condotto. È azione e reazione fra i due dischi. Se $C_f$ è più grande delle coppie esterne, il motore rallenta e il condotto accelera finché si incontrano, come nelle curve della figura 5-72.`,
    },
    'd052.8': {
      tappa: 3,
      prima: r`Caso particolare: innesto brevissimo, quasi un urto. Somma le due equazioni del passo precedente: $C_f$ si elide. Integra sulla durata dell'innesto: le coppie esterne, agendo per un tempo quasi nullo, danno contributi trascurabili. Che cosa resta, e che grandezza si conserva?`,
      dopo: r`Si conserva il momento della quantità di moto totale: $I_1\omega_{10} + I_2\omega_{20} = (I_1 + I_2)\omega_f$. La velocità finale è la media delle velocità pesata con le inerzie, la (5.83). Controllo: se il condotto è fermo e ha inerzia piccola, $\omega_f$ resta vicina a quella del motore.`,
    },
    'd052.9': {
      tappa: 3,
      prima: r`Quanta energia si perde? Il lavoro dell'attrito durante lo slittamento è la differenza fra l'energia cinetica iniziale dei due volani e quella finale, quando girano insieme a $\omega_f$. Scrivi la differenza e sostituisci $\omega_f$: con un po' di algebra tutto si raccoglie in un quadrato.`,
      dopo: r`Il lavoro perso è $I_1I_2(\omega_{10} - \omega_{20})^2/[2(I_1 + I_2)]$: cresce con il quadrato della differenza di velocità. Diventa calore nel materiale d'attrito, ed è per questo che il calore è il secondo criterio di dimensionamento di freni e frizioni. Controllo: se le velocità iniziali sono uguali non si perde nulla.`,
    },
  },
  racconto: r`All'orale dici che la frizione è un innesto ad attrito fra due alberi coassiali, e che una frizione assiale semplice è un freno a disco a corona completa con entrambi i dischi in rotazione. Con Reye (accostamento assiale traslatorio, consumo uniforme) la pressione è $p = N/[2\pi r(r_e - r_i)]$; integrando forza d'attrito per braccio ottieni $C_f = fN(r_e + r_i)/2$, e con i superfici $C_f = i\,fNr_m$. Poi l'innesto: in slittamento la coppia vale $C_f$, a velocità uguali si passa all'aderenza. Se l'innesto è rapido si conserva $I\omega$ e si perde $I_1I_2(\omega_{10} - \omega_{20})^2/[2(I_1 + I_2)]$, che diventa calore.`,
};

// ====================================================================================================== c3-frizione-conica
export const frizioneConicaLezione: LezioneArgomento = {
  perche: r`Pensa a un tappo di sughero spinto in una bottiglia: con una spinta modesta resta incastrato e per girarlo ci vuole forza. La frizione conica sfrutta lo stesso effetto: invece di due dischi piani usa due tronchi di cono, uno maschio e uno femmina, che si incastrano. A parità di forza assiale e di ingombro trasmette molta più coppia di una frizione piana. Le domande sono: **di quanto il cono moltiplica la coppia, da dove viene questa amplificazione, e perché non conviene fare il cono troppo appuntito?**`,
  idea:
    r`Quando spingi il cono maschio nel femmina, le superfici sono inclinate: la pressione, che è perpendicolare alla superficie, ha solo una piccola componente lungo l'asse. Quindi per equilibrare una certa forza assiale serve una pressione grande. Ma la coppia dipende dalla pressione, non dalla forza assiale: pressione grande vuol dire attrito grande e coppia grande. È lo stesso principio del cuneo.` +
    '\n\n' +
    r`C'è però un dettaglio: mentre i coni si avvicinano scivolano anche lungo la generatrice, e l'attrito si oppone a questo scivolamento. Anche questo attrito ha una componente assiale che si somma a quella della pressione e aiuta a reggere la forza assiale. Per questo il fattore di amplificazione non è 1/sin α, che diventerebbe infinito per coni sottili, ma $1/(\sin\alpha + f\cos\alpha)$, che resta al più 1/f. E al momento di staccare i coni lo stesso attrito cambia verso: se il cono è troppo stretto restano incollati.`,
  richiami: [
    { titolo: 'Frizione piana', testo: r`Con Reye la pressione su una corona piana è $K/r$; legandola alla forza assiale si ottiene $p = N/[2\pi r(r_e - r_i)]$ e la coppia $C_f = fNr_m$. Il ragionamento conico è lo stesso, con la superficie inclinata.` },
    { titolo: 'Scomporre una forza su un piano inclinato', testo: r`Su un piano inclinato di α la forza normale ha componenti $\cos\alpha$ e $\sin\alpha$ lungo le due direzioni di riferimento, e la forza lungo il piano le ha scambiate. Per non sbagliare, prova un caso limite: con α = 90° il cono diventa un disco piano e la normale deve essere tutta assiale.` },
    { titolo: 'Area di una striscia inclinata', testo: r`Una striscia di cono compresa fra i raggi r e r + dr non è larga dr: è inclinata, e la sua larghezza lungo la generatrice è $dr/\sin\alpha$ se α è l'angolo fra generatrice e asse. L'area effettiva è $2\pi r\,dr/\sin\alpha$, maggiore di quella proiettata $2\pi r\,dr$.` },
  ],
  ipotesiPerche: [
    r`La geometria (raggi, semiangolo, larghezza b) fissa gli estremi degli integrali e il fattore $1/\sin\alpha$ fra area proiettata e area effettiva. Il semiangolo α è misurato fra generatrice e asse.`,
    r`Il verso dell'attrito lungo la generatrice dipende da che cosa sta succedendo: durante il serraggio si oppone all'avvicinamento, durante il distacco all'allontanamento. Fissare la fase serve a scrivere il segno giusto, il più di $\sin\alpha + f\cos\alpha$.`,
    r`Il cono maschio trasla lungo l'asse, quindi il consumo è uniforme; la velocità di strisciamento in rotazione è proporzionale a r: per Reye la pressione è $K/r$, come nella frizione piana. Coulomb dà l'attrito $f\,p\,dA$.`,
  ],
  disegnoGuida: r`Disegna l'asse di rotazione orizzontale, tratto-punto. Sopra, disegna un tratto obliquo: è la generatrice della superficie di contatto, inclinata del semiangolo α rispetto all'asse; segna l'angolo fra la generatrice e una parallela all'asse. Lungo la generatrice disegna alcune frecce perpendicolari: sono le pressioni p. Poi disegna le forze f p lungo la generatrice, nel verso opposto a quello in cui il cono maschio scivola mentre entra. Aggiungi la forza assiale N′ orizzontale, quella che spinge i coni insieme. Quota la larghezza b della fascia lungo la generatrice e la distanza del suo punto medio dall'asse, $(r_e + r_i)/2$. Accanto, se vuoi, schizza la sezione con cono maschio e femmina sugli alberi.`,
  mappa: [
    'Descrivo la superficie conica: area effettiva più grande di quella proiettata.',
    'Scrivo le forze sull\'elemento e la loro componente assiale.',
    'Con Reye e l\'equilibrio assiale lego la pressione a N′.',
    'Integro la coppia e la confronto con la frizione piana.',
    'Guardo i limiti: cono molto stretto e distacco.',
  ],
  dims: {
    d053: {
      introduzione: r`La strada è quella della frizione piana, con due cure in più: l'area va presa sulla superficie inclinata, e la forza assiale riceve contributo sia dalla pressione sia dall'attrito lungo la generatrice. Scriviamo la componente assiale delle forze, la integriamo per legare la pressione a N′, poi integriamo la coppia e confrontiamo.`,
      riepilogo: r`La fascia conica ha area effettiva maggiore di quella proiettata, del fattore $1/\sin\alpha$. Sull'elemento agiscono la pressione e l'attrito lungo la generatrice contro l'accostamento: la loro componente assiale è $p(\sin\alpha + f\cos\alpha)$. Con $p = K/r$ l'equilibrio assiale lega K a N′, e la coppia, dovuta all'attrito circonferenziale, risulta quella della frizione piana con N sostituito da $N'/(\sin\alpha + f\cos\alpha)$. L'amplificazione è grande ma limitata da 1/f, e se $\operatorname{tg}\alpha < f$ i coni non si staccano.`,
    },
  },
  passi: {
    'd053.1': {
      tappa: 0,
      prima: r`Prima la geometria. Taglia il cono con due piani perpendicolari all'asse, ai raggi r e r + dr: ottieni una striscia sottile. Quanto è larga, misurata sulla superficie? Non dr: la superficie è inclinata, e la striscia è l'ipotenusa di un triangolino con cateto radiale dr. Se α è l'angolo fra generatrice e asse, il cateto dr è opposto ad α.`,
      dopo: r`La striscia è larga $dr/\sin\alpha$, quindi l'area effettiva è $2\pi r\,dr/\sin\alpha$, più grande di quella proiettata. Integrando si ottiene l'area della fascia, $\pi(r_e + r_i)b$, con b larghezza lungo la generatrice. Controllo: con α = 90° il cono diventa un disco e si torna all'area della corona.`,
    },
    'd053.2': {
      tappa: 1,
      prima: r`Quali forze agiscono su un elemento di superficie mentre stringi i coni? La pressione, perpendicolare alla superficie. E l'attrito: mentre il cono maschio entra, scivola lungo la generatrice; l'attrito si oppone a questo scivolamento. Che modulo ha, e in che direzione punta?`,
      dopo: r`La forza è $p\,dA$ lungo la normale più $f\,p\,dA$ lungo la generatrice, contro l'accostamento. Questo secondo termine è quello che le fonti derivate dimenticano, e fa la differenza nei casi limite. Nota: c'è anche un attrito circonferenziale, dovuto alla rotazione, che darà la coppia.`,
    },
    'd053.3': {
      tappa: 1,
      prima: r`Ci interessa la componente lungo l'asse, perché è quella che deve equilibrare la forza di serraggio. La normale alla superficie è inclinata di α rispetto alla direzione radiale; la generatrice è inclinata di α rispetto all'asse. Proietta ciascuna sull'asse e somma. Prova il caso limite α = 90° per controllare quale delle due prende il seno.`,
      dopo: r`La componente assiale per unità di area è $p(\sin\alpha + f\cos\alpha)$. Entrambi i termini resistono al serraggio, quindi si sommano. Controllo: con α = 90° (disco piano) resta p, tutta la pressione è assiale; con α piccolo il termine dell'attrito diventa importante.`,
    },
    'd053.4': {
      tappa: 2,
      prima: r`Che pressione c'è sulla superficie conica? Ragiona come nella frizione piana: il cono maschio si avvicina traslando lungo l'asse, quindi il consumo è uniforme; mentre i coni strisciano in rotazione, la velocità relativa di un punto è proporzionale al suo raggio. Che cosa dice Reye?`,
      dopo: r`Anche qui $p = K/r$: pressione iperbolica, massima al raggio minore. È coerente con la (5.87) del libro, che ha r al denominatore. Il cono non cambia la legge della pressione, cambia il legame fra K e la forza assiale.`,
    },
    'd053.5': {
      tappa: 2,
      prima: r`Equilibrio assiale: la forza di serraggio N′ è la somma delle componenti assiali su tutta la fascia. Moltiplica la componente assiale per unità di area, $\tfrac{K}{r}(\sin\alpha + f\cos\alpha)$, per l'area effettiva della striscia, $2\pi r\,dr/\sin\alpha$, e integra fra i raggi. Le r si semplificano.`,
      dopo: r`N′ vale $2\pi K(r_e - r_i)$ per $(\sin\alpha + f\cos\alpha)/\sin\alpha$. Confronta con la frizione piana, dove era solo $2\pi K(r_e - r_i)$: a parità di K il cono richiede una forza assiale diversa, e in genere più piccola, perché il fattore è minore di 1 quando α è piccolo.`,
    },
    'd053.6': {
      tappa: 2,
      prima: r`Dalla relazione appena trovata ricava K in funzione di N′ e sostituiscilo in $p = K/r$. Così hai la pressione sulla superficie conica in funzione della forza di serraggio.`,
      dopo: r`La pressione ha un $\sin\alpha$ al numeratore. Il libro scrive la (5.87) senza: lì uguaglia una grandezza riferita all'area effettiva con una riferita all'area proiettata (NF-19). Per la coppia questo non conta: la (5.88) del libro è giusta comunque.`,
    },
    'd053.7': {
      tappa: 3,
      prima: r`Ora la coppia. Durante l'innesto i coni strisciano anche in rotazione: c'è un attrito circonferenziale $f\,p\,dA$, tangente alla circonferenza, con braccio r rispetto all'asse. Integra $f\cdot\tfrac{K}{r}\cdot r$ sull'area effettiva $2\pi r\,dr/\sin\alpha$.`,
      dopo: r`Resta una r da integrare e la coppia è $2\pi fK(r_e^2 - r_i^2)/(2\sin\alpha)$. Il $\sin\alpha$ al denominatore viene dall'area effettiva più grande. Manca solo di sostituire K.`,
    },
    'd053.8': {
      tappa: 3,
      prima: r`Sostituisci $2\pi K$ ricavato dall'equilibrio assiale. Guarda che cosa succede al $\sin\alpha$: compare al numeratore in K e al denominatore nella coppia. Usa poi la differenza di quadrati come nella frizione piana.`,
      dopo: r`I $\sin\alpha$ si semplificano e resta $C_f = fN'(r_e + r_i)/[2(\sin\alpha + f\cos\alpha)]$, la (5.88). È la coppia della frizione piana con N sostituito da $N'/(\sin\alpha + f\cos\alpha)$: come se la forza assiale fosse amplificata.`,
    },
    'd053.9': {
      tappa: 4,
      prima: r`Di quanto il cono amplifica rispetto alla frizione piana, a parità di N′ e di raggi? Fai il rapporto delle coppie. Poi chiediti che cosa succede per α che tende a zero: il seno va a zero, e il coseno?`,
      dopo: r`Il rapporto è $1/(\sin\alpha + f\cos\alpha)$. Con α = 15° e f = 0,3 vale circa 1,8. Per α che tende a zero il denominatore tende a f e la coppia a $N'r_m$: grande ma finita. Senza il termine $f\cos\alpha$ (formula di q42) verrebbe infinita, un risultato assurdo (NF-146).`,
    },
    'd053.10': {
      tappa: 4,
      prima: r`Per staccare i coni bisogna tirarli indietro, e lo scivolamento lungo la generatrice cambia verso: anche l'attrito cambia verso, e la sua componente assiale ora si oppone al distacco. Riscrivi la componente assiale con il segno meno davanti a $f\cos\alpha$ e chiediti quando diventa negativa.`,
      dopo: r`Se $\operatorname{tg}\alpha < f$, cioè $\sin\alpha < f\cos\alpha$, la forza di distacco è negativa: bisognerebbe tirare i coni con forza, restano incollati. Per questo α non si fa piccolissimo: è un compromesso fra coppia alta e facilità di disinnesto. Con f = 0,3 serve α oltre 17° circa.`,
    },
  },
  racconto: r`All'orale dici che nella frizione conica le superfici sono tronchi di cono di semiangolo α, serrati da una forza assiale N′. Durante il serraggio su ogni elemento agiscono la pressione, normale, e l'attrito f p lungo la generatrice, opposto all'accostamento: la componente assiale è $p(\sin\alpha + f\cos\alpha)$. Con Reye $p = K/r$; l'equilibrio assiale lega K a N′, e la coppia d'attrito circonferenziale dà $C_f = fN'(r_e + r_i)/[2(\sin\alpha + f\cos\alpha)]$: la frizione piana con N amplificata. Aggiungi che l'amplificazione è limitata da 1/f e che per $\operatorname{tg}\alpha < f$ i coni non si staccano.`,
};

// ====================================================================================================== c3-frizione-centrifuga
export const frizioneCentrifugaLezione: LezioneArgomento = {
  perche: r`Accendi un tagliaerba a scoppio o una motosega: il motore gira al minimo e la lama è ferma; dai gas e la lama parte da sola. Nessuno ha premuto una frizione. Dentro c'è una frizione centrifuga: dei ceppi che, quando il motore accelera, vengono lanciati verso l'esterno contro un tamburo. È un innesto automatico che dipende solo dalla velocità. Le domande sono: **a che velocità del motore la frizione comincia a trasmettere, e come cresce la coppia oltre quella velocità?** Avvertenza: nella dispensa questo argomento non c'è, si usa il modello classico.`,
  idea:
    r`Il mozzo collegato al motore porta alcuni ceppi che possono scorrere in direzione radiale. Delle molle li tengono tirati verso l'asse. Quando il mozzo gira, ogni ceppo sente la forza centrifuga, che cresce con il quadrato della velocità: è la stessa che senti in curva in macchina. Finché la centrifuga è più piccola della forza della molla, il ceppo resta dentro e il motore gira a vuoto.` +
    '\n\n' +
    r`A una certa velocità la centrifuga eguaglia la molla: il ceppo si stacca e tocca il tamburo esterno, collegato all'utilizzatore. Oltre quella velocità la centrifuga in eccesso preme il ceppo contro il tamburo; nasce una forza d'attrito, f volte la pressione, che con il braccio R trascina il tamburo. Più il motore gira, più i ceppi premono, più coppia passa: la coppia cresce come la differenza dei quadrati delle velocità. Quando il tamburo raggiunge la velocità del motore, si passa all'aderenza come in ogni frizione.`,
  richiami: [
    { titolo: 'Accelerazione centripeta e forza centrifuga', testo: r`Un punto che gira a velocità angolare costante ω su una circonferenza di raggio r ha un'accelerazione diretta verso il centro, di modulo $\omega^2 r$. Con il principio di D'Alembert la si rappresenta come una forza d'inerzia uguale a massa per accelerazione cambiata di segno: la forza centrifuga $m\omega^2 r$, verso l'esterno.` },
    { titolo: 'Equilibrio lungo una direzione', testo: r`Un corpo in equilibrio ha somma nulla delle forze in ogni direzione. Per un ceppo che può muoversi solo radialmente, basta scrivere l'equilibrio lungo il raggio: le forze verso l'esterno bilanciano quelle verso l'interno. Le reazioni delle guide, perpendicolari, non entrano.` },
    { titolo: 'Momento di una forza tangente', testo: r`Una forza tangente a una circonferenza di raggio R centrata sull'asse ha momento $R$ per il modulo. Se ci sono n forze uguali, tutte tangenti e tutte nello stesso verso, i momenti si sommano: $nRF$.` },
  ],
  ipotesiPerche: [
    r`Servono il mozzo con i ceppi e le molle (lato motore) e il tamburo (lato condotto) per capire chi preme e chi è premuto. Il numero n di ceppi moltiplica la coppia.`,
    r`La centrifuga è la «forza di comando» di questa frizione. Trascurare il gioco permette di prendere la stessa distanza del baricentro e la stessa forza di molla prima e dopo il contatto.`,
    r`Finché c'è strisciamento vale Coulomb, attrito f volte la normale. Mettere le risultanti nel punto medio dell'arco, come nel freno a ceppi, dà braccio R per la forza d'attrito.`,
    r`La dispensa non tratta la frizione centrifuga: dichiararlo è onesto, e serve per sapere che le formule vengono da un modello classico e non dalle pagine del corso.`,
  ],
  disegnoGuida: r`Disegna un cerchio grande: è il tamburo esterno, collegato all'utilizzatore. Al centro disegna il mozzo motore con una freccia curva ω_m. Dal mozzo fai partire tre guide radiali e su ciascuna disegna un ceppo, un arco spesso vicino al tamburo. Disegna le molle che tirano ogni ceppo verso l'asse, con la forza F_m diretta verso il centro. Nel baricentro G di un ceppo disegna la forza centrifuga m r_G ω_m², radiale verso l'esterno, e quota la distanza r_G dall'asse. Sul punto di contatto disegna le forze del tamburo sul ceppo: la normale F_N verso il centro e l'attrito f F_N tangente, che si oppone allo strisciamento del ceppo rispetto al tamburo. Quota infine il raggio R del tamburo.`,
  mappa: [
    'Capisco chi preme i ceppi: la forza centrifuga, non un comando.',
    'Equilibrio radiale prima del contatto: la velocità d\'innesto.',
    'Dopo il contatto: la forza normale sul tamburo.',
    'Coppia trasmessa e suo andamento con la velocità.',
  ],
  dims: {
    d054: {
      introduzione: r`Studiamo un solo ceppo e poi moltiplichiamo. Scriviamo la forza centrifuga, poi l'equilibrio radiale del ceppo prima del contatto per trovare la velocità d'innesto. Dopo il contatto, lo stesso equilibrio ci dà la normale del tamburo. Con Coulomb passiamo alla forza d'attrito e alla coppia, e guardiamo come cresce con la velocità.`,
      riepilogo: r`I ceppi sono premuti dalla forza centrifuga $mr_G\omega_m^2$, contrastata dalle molle. L'innesto avviene quando le due forze si eguagliano: $\omega^* = \sqrt{F_m/(mr_G)}$. Oltre, la normale sul tamburo è l'eccesso di centrifuga, $mr_G(\omega_m^2 - \omega^{*2})$, e la coppia trasmessa è $nfR$ volte quella normale. La coppia è nulla sotto ω* e cresce in modo parabolico sopra; quando il tamburo raggiunge il motore si passa all'aderenza.`,
    },
  },
  passi: {
    'd054.1': {
      tappa: 0,
      prima: r`Guarda com'è fatta la frizione: chi è collegato al motore e chi all'utilizzatore? I ceppi stanno sul mozzo motore, liberi di scorrere verso l'esterno; le molle li richiamano verso l'asse; il tamburo esterno è sul lato condotto. Chiediti: in questa macchina c'è un pedale, una leva, qualcosa che spinga i ceppi?`,
      dopo: r`No: è un innesto **automatico**. La forza che preme i ceppi sul tamburo è la forza centrifuga, che cresce con la velocità del motore. La molla decide da che velocità in poi la frizione «si attacca».`,
    },
    'd054.2': {
      tappa: 0,
      prima: r`Il ceppo gira con il mozzo a velocità $\omega_m$. Il suo baricentro G descrive una circonferenza di raggio $r_G$. Che accelerazione ha un punto in moto circolare uniforme, e dove punta? Poi applica D'Alembert: forza d'inerzia uguale a massa per accelerazione cambiata di segno.`,
      dopo: r`Il baricentro ha accelerazione centripeta $\omega_m^2 r_G$ verso l'asse; la forza d'inerzia è $mr_G\omega_m^2$ verso l'esterno: la centrifuga. Cresce con il quadrato della velocità: raddoppiando i giri, la forza quadruplica.`,
    },
    'd054.3': {
      tappa: 1,
      prima: r`Prima del contatto il ceppo è fermo rispetto al mozzo, appoggiato a un arresto. Lungo il raggio agiscono tre forze: la centrifuga verso l'esterno, la molla verso l'interno, la reazione $R_v$ dell'arresto. A bassa velocità la molla vince e l'arresto la contrasta. Che cosa succede alla reazione dell'arresto quando la velocità cresce? Il ceppo si stacca quando quella reazione diventa zero.`,
      dopo: r`Con $R_v = 0$ la centrifuga eguaglia la molla, e la velocità d'innesto è $\omega^* = \sqrt{F_m/(mr_G)}$. Controllo: una molla più rigida ritarda l'innesto, ceppi più pesanti lo anticipano. È così che il progettista sceglie a quanti giri parte la lama.`,
    },
    'd054.4': {
      tappa: 2,
      prima: r`Sopra ω* il ceppo ha lasciato l'arresto e appoggia sul tamburo. Rifai l'equilibrio radiale: al posto della reazione dell'arresto c'è la normale del tamburo, che spinge il ceppo verso l'interno. Esprimi la forza della molla tramite ω*, usando la relazione appena trovata, e raccogli.`,
      dopo: r`La normale è l'eccesso di centrifuga sulla molla, $mr_G(\omega_m^2 - \omega^{*2})$. Controllo: a $\omega_m = \omega^*$ vale zero, cioè il ceppo tocca appena; poi cresce. Abbiamo supposto che il gioco sia trascurabile, così $r_G$ e $F_m$ non cambiano al contatto.`,
    },
    'd054.5': {
      tappa: 3,
      prima: r`Finché il tamburo gira più lento del mozzo, i ceppi strisciano sul tamburo. Per Coulomb ogni ceppo esercita una forza d'attrito f volte la normale, tangente al tamburo. Il braccio rispetto all'asse è il raggio R del tamburo. Quanti ceppi ci sono? Somma i momenti.`,
      dopo: r`La coppia trasmessa è $nfF_NR$, cioè $nfRmr_G(\omega_m^2 - \omega^{*2})$. È lo stesso ragionamento del freno a ceppi, con le risultanti nel punto medio dell'arco; qui però il «comando» è la centrifuga.`,
    },
    'd054.6': {
      tappa: 3,
      prima: r`Leggiamo la formula come funzione della velocità del motore. Raccogli in una costante K tutto ciò che è geometria e materiale. Che forma ha il grafico della coppia in funzione di $\omega_m$? Prova un numero: quanto vale la coppia quando il motore gira al doppio della velocità d'innesto?`,
      dopo: r`La coppia è $K(\omega_m^2 - \omega^{*2})$: zero fino a ω*, poi una parabola. Al doppio di ω* vale $3K\omega^{*2}$: raddoppiando i giri oltre l'innesto la coppia non raddoppia, triplica rispetto a $K\omega^{*2}$. Per questo l'innesto è dolce all'inizio e diventa deciso aumentando i giri.`,
    },
    'd054.7': {
      tappa: 3,
      prima: r`Che cosa succede nel tempo dopo l'innesto? Il motore sale di giri, la coppia d'attrito cresce e accelera l'utilizzatore. Le velocità di mozzo e tamburo si avvicinano. Ricorda che cosa succede in una frizione quando le velocità diventano uguali.`,
      dopo: r`A velocità uguali cessa lo strisciamento e si passa all'aderenza: la frizione trasmette la coppia richiesta, purché resti sotto la coppia d'attrito disponibile a quella velocità. Se il carico chiede di più, i ceppi slittano: la frizione protegge il motore.`,
    },
  },
  racconto: r`All'orale dici subito che nella dispensa la frizione centrifuga non c'è e che usi il modello classico. È un innesto automatico: sul mozzo motore ci sono ceppi trattenuti da molle, e la centrifuga $mr_G\omega_m^2$ li spinge contro il tamburo condotto. L'innesto inizia quando la centrifuga eguaglia la molla, $\omega^* = \sqrt{F_m/(mr_G)}$. Oltre, la normale è $mr_G(\omega_m^2 - \omega^{*2})$ e la coppia, con n ceppi, è $C_f = nfRmr_G(\omega_m^2 - \omega^{*2})$: parabolica. Chiudi dicendo che, raggiunta la velocità del motore, si passa all'aderenza, e citi gli esempi: motoseghe, scooter.`,
};

// ====================================================================================================== c3-partitore
export const partitoreLezione: LezioneArgomento = {
  perche: r`Quando freni forte in auto senti il muso abbassarsi: il peso si sposta in avanti. Le ruote anteriori sono premute di più a terra e possono frenare di più; le posteriori si alleggeriscono e, se frenano troppo, si bloccano, e un'auto con le ruote posteriori bloccate tende a girarsi. Il partitore di frenata è il dispositivo che decide quanta forza frenante dare dietro rispetto a davanti. Le domande sono: **come si distribuisce il carico fra gli assi in frenata, quale ripartizione permette la frenata più forte possibile, e perché serve un dispositivo che la adatti?**`,
  idea:
    r`In frenata il veicolo decelera. Con D'Alembert mettiamo nel baricentro una forza d'inerzia, massa per decelerazione, diretta in avanti. Il baricentro è in alto, a quota h: questa forza tende a far ribaltare il veicolo in avanti, come quando inchiodi in bicicletta. Risultato: l'asse anteriore riceve più carico, il posteriore meno, e il trasferimento è proporzionale alla decelerazione.` +
    '\n\n' +
    r`Ogni asse può frenare al massimo f_ad volte il suo carico. Per sfruttare tutta l'aderenza bisogna che entrambi gli assi arrivino al limite insieme, cioè che le forze frenanti stiano nello stesso rapporto dei carichi. Ma quel rapporto cambia con la decelerazione: più freni forte, più deve frenare l'anteriore. Un impianto con una ripartizione fissa va bene solo per una decelerazione: alle altre un asse blocca prima. Il partitore riduce la pressione ai freni posteriori quando serve, per inseguire la ripartizione ideale. Avvertenza: la dispensa non tratta il partitore; è una deduzione dalla dinamica del veicolo.`,
  richiami: [
    { titolo: 'Principio di D\'Alembert', testo: r`Un corpo che accelera si può studiare come se fosse in equilibrio, aggiungendo una forza d'inerzia uguale a massa per accelerazione, con verso opposto, applicata nel baricentro. In frenata l'accelerazione è all'indietro, quindi la forza d'inerzia è in avanti.` },
    { titolo: 'Equazioni cardinali nel piano', testo: r`Per un corpo rigido nel piano servono tre equazioni: equilibrio delle forze orizzontali, delle verticali e dei momenti rispetto a un polo. Conviene scegliere il polo dove passano più forze incognite: nel contatto di una ruota con il suolo le forze tangenziali e la normale di quella ruota hanno braccio zero.` },
    { titolo: 'Aderenza', testo: r`Una ruota che rotola senza strisciare può scambiare con il suolo una forza tangenziale al massimo uguale a $f_{ad}$ per la forza normale. Oltre questo limite la ruota slitta: si blocca. Più la ruota è premuta a terra, più forza frenante può dare.` },
  ],
  ipotesiPerche: [
    r`Modelliamo il veicolo come un unico corpo rigido: ci interessano le reazioni agli assi, non le sospensioni. Le distanze del baricentro dagli assi e la sua quota sono i bracci che decidono il trasferimento di carico.`,
    r`Frenando con tutte le ruote entrambe le forze frenanti compaiono nell'equilibrio. Trascurare rotolamento e aria isola l'effetto dei freni, come a p. 89.`,
    r`Con lo stesso $f_{ad}$ davanti e dietro, la condizione «entrambi al limite» è semplice. Al limite la forza tangenziale è $f_{ad}$ volte la normale: è il massimo che ogni asse può dare.`,
    r`La dispensa non parla del partitore: dichiararlo serve a far capire che la parte sulla ripartizione è una conseguenza ragionata della dinamica delle pp. 90–92, non un testo del corso.`,
  ],
  disegnoGuida: r`Disegna il profilo del veicolo con due ruote, A anteriore e B posteriore, e la strada orizzontale. Segna con una freccia il verso del moto V e, opposta, la decelerazione a. Metti il baricentro G a quota h dal suolo, con il peso Mg verso il basso e la forza d'inerzia Ma orizzontale, in avanti: è lei che trasferisce carico. Quota le distanze orizzontali l₁ da A a G e l₂ da G a B. Ai contatti con il suolo disegna le reazioni normali F_NA e F_NB, verso l'alto, facendo la prima più lunga; e le forze frenanti F_TA e F_TB, orizzontali, all'indietro. Sulle ruote puoi segnare le coppie frenanti C_fa e C_fp che le generano.`,
  mappa: [
    'Equilibrio dinamico del veicolo con la forza d\'inerzia nel baricentro.',
    'Reazioni normali: trasferimento di carico sull\'anteriore.',
    'Decelerazione massima con entrambi gli assi al limite.',
    'Ripartizione ideale delle forze frenanti.',
    'Ripartizione fissa: chi blocca prima e perché serve il partitore.',
  ],
  dims: {
    d051: {
      introduzione: r`Prima scriviamo le tre equazioni cardinali del veicolo in frenata, con la forza d'inerzia nel baricentro, e ricaviamo i carichi sugli assi. Poi cerchiamo la frenata più forte possibile e la ripartizione che la rende possibile. Infine vediamo che cosa succede con una ripartizione fissa: quale asse blocca prima e perché il partitore serve.`,
      riepilogo: r`Con la forza d'inerzia Ma in avanti a quota h, l'anteriore si carica di $Mah/(l_1 + l_2)$ e il posteriore si scarica della stessa quantità. Se entrambi gli assi sono al limite, la decelerazione è $f_{ad}g$. Per arrivarci insieme le forze frenanti devono stare nel rapporto dei carichi, che dipende da a: alla decelerazione massima la quota anteriore ideale è $\beta^* = (l_2 + f_{ad}h)/(l_1 + l_2)$. Con β fisso un asse blocca prima; se è il posteriore il veicolo diventa instabile, e il partitore limita la pressione dietro.`,
    },
  },
  passi: {
    'd051.1': {
      tappa: 0,
      prima: r`Disegna le forze sul veicolo e scrivi l'equilibrio delle forze. In orizzontale ci sono le due forze frenanti ai contatti, all'indietro, e la forza d'inerzia nel baricentro, in avanti. In verticale ci sono le due reazioni normali verso l'alto e il peso verso il basso. Scegli i segni con l'asse x nel verso del moto.`,
      dopo: r`Le forze frenanti insieme valgono Ma: sono loro che decelerano il veicolo. Le normali insieme valgono il peso Mg, qualunque sia la frenata. Due equazioni, ma quattro incognite: serve il momento per capire come si divide il peso fra gli assi.`,
    },
    'd051.2': {
      tappa: 1,
      prima: r`Equilibrio dei momenti. Scegli il polo nel contatto posteriore B: lì passano la normale e la forza frenante di B, e anche la forza frenante di A è al livello del suolo, quindi braccio zero. Restano tre momenti: la normale di A con braccio $l_1 + l_2$, il peso con braccio $l_2$, la forza d'inerzia con braccio h. Chiediti da che parte la forza d'inerzia fa ruotare il veicolo.`,
      dopo: r`La normale anteriore è $M(gl_2 + ah)/(l_1 + l_2)$. Il primo termine è il carico statico; il secondo, $Mah/(l_1+l_2)$, è il carico in più dovuto alla frenata: la forza d'inerzia in alto tende a far «picchiare» il muso. In accelerazione succede il contrario.`,
    },
    'd051.3': {
      tappa: 1,
      prima: r`La normale posteriore la ricavi senza un'altra equazione dei momenti: la somma delle due normali è il peso. Sottrai e semplifica. Chiamiamo poi ΔN il carico che passa da dietro a davanti.`,
      dopo: r`La normale posteriore è $M(gl_1 - ah)/(l_1 + l_2)$: cala quando freni. Il trasferimento $\Delta N = Mah/(l_1 + l_2)$ cresce con la decelerazione e con la quota del baricentro, e cala con il passo. Un furgone alto e corto trasferisce più carico di un'auto bassa e lunga.`,
    },
    'd051.4': {
      tappa: 2,
      prima: r`Qual è la frenata più forte possibile? Ogni asse può dare al massimo $f_{ad}$ volte il suo carico. Supponiamo che entrambi gli assi siano proprio al limite. Sostituisci le due forze frenanti nell'equilibrio orizzontale: la somma delle normali, l'abbiamo visto, è sempre Mg.`,
      dopo: r`La decelerazione massima è $f_{ad}g$: con aderenza 0,8 circa 7,8 m/s². Non dipende dalla posizione del baricentro! Ma attenzione: abbiamo supposto entrambi gli assi al limite insieme. La dispensa avverte che vale «se la frenata è ripartita correttamente».`,
    },
    'd051.5': {
      tappa: 3,
      prima: r`Che vuol dire ripartita correttamente? Vogliamo che i due assi arrivino al limite nello stesso momento, cioè che usino l'aderenza nella stessa misura: il rapporto forza frenante su carico deve essere uguale davanti e dietro. Allora che rapporto devono avere le forze frenanti?`,
      dopo: r`Lo stesso rapporto dei carichi: $(gl_2 + ah)/(gl_1 - ah)$. Ogni asse usa l'aderenza a/g. Il punto chiave: il rapporto **dipende dalla decelerazione**. Più freni forte, più carico va davanti, più deve frenare l'anteriore. Una ripartizione fissa non può essere ideale sempre.`,
    },
    'd051.6': {
      tappa: 3,
      prima: r`Diamo un nome alla ripartizione: β è la frazione della forza frenante totale affidata all'anteriore. Nella condizione ideale l'anteriore frena in proporzione al suo carico, quindi β è il carico anteriore diviso il peso. Valutalo alla decelerazione massima, $a = f_{ad}g$.`,
      dopo: r`La ripartizione ideale in frenata massima è $\beta^* = (l_2 + f_{ad}h)/(l_1 + l_2)$. Con baricentro a metà passo, $h/L$ = 0,25 e aderenza 0,8, viene 0,7: il 70 % della frenata deve stare davanti. Per questo i freni anteriori sono più grossi.`,
    },
    'd051.7': {
      tappa: 4,
      prima: r`Un impianto semplice ha β fisso. Per ogni asse chiediti: a quale decelerazione arriva al limite? Davanti, la forza frenante è β M a e il limite è $f_{ad}$ per il carico anteriore, che dipende da a. Uguaglia e risolvi per a; fai lo stesso dietro con 1 − β. La frenata si ferma alla più piccola delle due decelerazioni.`,
      dopo: r`Si ottengono due decelerazioni limite, $a_A$ e $a_B$, in generale diverse: l'asse che arriva prima al limite si blocca, e la decelerazione massima è minore di $f_{ad}g$. Le due coincidono, e valgono $f_{ad}g$, solo per β = β*.`,
    },
    'd051.8': {
      tappa: 4,
      prima: r`Supponi di dare troppa frenata al posteriore, cioè β minore di β*. Chi arriva prima al limite, sapendo che il posteriore in frenata si scarica? E che cosa succede a un veicolo con le ruote posteriori bloccate e le anteriori che ancora rotolano?`,
      dopo: r`Bloccano prima le posteriori, e il veicolo perde stabilità: il retrotreno tende a sbandare e l'auto a girarsi. Bloccare prima le anteriori è meno pericoloso (si perde sterzo, ma si va dritti). Il partitore riduce la pressione ai freni posteriori oltre una soglia, avvicinandosi alla curva ideale; oggi lo fa l'elettronica (EBD).`,
    },
  },
  racconto: r`All'orale dici che il partitore non è nella dispensa e che lo ricavi dalla dinamica del veicolo. In frenata la forza d'inerzia Ma, applicata nel baricentro a quota h, trasferisce carico sull'anteriore: $F_{N,A} = M(gl_2 + ah)/L$, $F_{N,B} = M(gl_1 - ah)/L$. Se entrambi gli assi sono al limite, $a_{max} = f_{ad}g$; per arrivarci le forze frenanti devono stare nel rapporto dei carichi, che cambia con la decelerazione. Con ripartizione fissa un asse blocca prima e si frena meno; se bloccano le posteriori il veicolo è instabile. Il partitore toglie pressione al posteriore per inseguire la ripartizione ideale.`,
};
