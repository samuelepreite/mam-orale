/** Lezioni discorsive C5 parte b: rotismi epicicloidali e differenziale (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

export const epicicloidali: LezioneArgomento = {
  perche:
    "Apri un avvitatore a batteria o il cambio automatico di un'auto: dentro trovi una ruota centrale, tre ruotine attorno che girano su sé stesse e intanto le fanno il giro, e una corona dentata esterna. È un rotismo epicicloidale: in poco spazio dà forti riduzioni, e può anche sommare due moti o dividerne uno. Il guaio è che gli assi delle ruotine si muovono, quindi le regole dei rotismi ordinari (rapporto uguale al rapporto dei denti) non valgono più. La domanda della lezione è: **come calcolo velocità e coppie quando alcuni assi girano?**",
  idea:
    "Il trucco è cambiare punto di vista. Immagina di sederti sul portatreno, il braccio che porta in giro gli assi dei satelliti, come su una giostra. Da lì il portatreno ti sembra fermo, gli assi dei satelliti sono fissi e il rotismo è diventato un normale rotismo ordinario: per lui sai tutto, il rapporto è quello dei denti. Basta ricordare che da lì vedi le velocità **relative**, cioè quelle assolute meno la velocità della giostra, $\\Omega$.\n\nNe esce un'unica equazione, la formula di Willis, che lega tre velocità: dei due solari e del portatreno. Un'equazione in tre incognite lascia due gradi di libertà: se blocchi un membro ottieni un riduttore compatto, se li lasci liberi combini due moti (il differenziale). Per le coppie, invece, la geometria decide da sola come si dividono, qualunque siano le velocità.",
  richiami: [
    { titolo: "Composizione delle velocità angolari", testo: "Se un corpo ruota rispetto a una giostra che a sua volta ruota, con assi paralleli, la sua velocità angolare assoluta è la somma della velocità relativa alla giostra e di quella della giostra: $\\omega = \\omega^{Rel} + \\Omega$. Con assi paralleli i vettori si sommano come numeri con segno." },
    { titolo: "Rapporto di un rotismo ordinario", testo: "Ad assi fissi, per ogni ingranamento il rapporto è $-z_{motrice}/z_{condotta}$ se esterno (versi opposti) e $+z_{motrice}/z_{condotta}$ se interno (corona, stesso verso). Per più ingranamenti in fila i rapporti si moltiplicano; due ruote sullo stesso albero hanno la stessa velocità." },
    { titolo: "Centro di istantanea rotazione", testo: "In ogni istante un corpo rigido piano ruota attorno a un punto fermo, il CIR. La velocità di un punto è $\\omega$ per la distanza dal CIR, perpendicolare al raggio. Se una ruota rotola senza strisciare su una ruota ferma, il CIR è il punto di contatto: lì le velocità dei due corpi sono uguali, e una è zero." },
    { titolo: "Equilibrio e bilancio delle potenze", testo: "Per un corpo in equilibrio la somma dei momenti attorno a un asse è zero (seconda cardinale): le reazioni dei supporti che passano per l'asse non contano. A regime e senza perdite, inoltre, la somma delle potenze delle coppie esterne è zero: $\\sum C_i\\omega_i = 0$." },
  ],
  ipotesiPerche: [
    "Servono i nomi dei pezzi: due solari e il portatreno girano attorno allo stesso asse fisso, e sono i tre alberi che collegano il rotismo al resto della macchina. Il satellite invece non esce: lavora dentro.",
    "Le velocità devono stare nello stesso riferimento e con il segno, altrimenti la differenza $\\omega_i - \\Omega$ non ha senso. Il contatto senza strisciamento dice che sulle primitive le due ruote hanno la stessa velocità.",
    "I satelliti devono ingranare con entrambi i solari, che sono coassiali: gli interassi devono coincidere. Con lo stesso modulo, il raggio è proporzionale ai denti e la condizione si scrive con i denti.",
    "Per le coppie usiamo l'equilibrio e il bilancio delle potenze senza perdite: a regime non ci sono inerzie, e con η = 1 non compare la potenza dissipata.",
  ],
  disegnoGuida:
    "Disegna un cerchio piccolo al centro: è il solare 1, con centro O₁. Attorno, un cerchio grande tratteggiato: la corona 3, ferma (tratteggio = membro bloccato). Fra i due, tangente a entrambi, un cerchio di raggio uguale a quello del solare: il satellite 2, con centro O₂. Controlla a occhio che $R_3 = R_1 + 2R_2$. Traccia il portatreno come un segmento da O₁ a O₂ e segna la sua $\\Omega$. Metti i punti di contatto: $C_{1,2}$ fra solare e satellite, $C_{2,3}$ fra satellite e corona. Infine i versi: $\\omega_1$ e $\\Omega$ nello stesso verso, il satellite al contrario. Se vuoi il profilo delle velocità, disegnalo lungo il diametro verticale del satellite: zero in $C_{2,3}$, $\\omega_1R_1$ in $C_{1,2}$, metà in O₂.",
  mappa: [
    "Mi siedo sul portatreno: scrivo le velocità relative.",
    "Dal portatreno il rotismo è ordinario: il suo rapporto è τ_W (Willis).",
    "Uso Willis: satellite doppio e riduttore a corona fissa.",
    "Controllo con il centro di istantanea rotazione: satellite e portatreno.",
    "Coppie: equilibrio più bilancio delle potenze, il rotismo divide la coppia.",
    "Rotismo combinato: conto i gradi di libertà, spezzo in blocchi, ricucio.",
  ],
  dims: {
    d089: {
      introduzione:
        "Vogliamo un legame fra le velocità dei due solari e del portatreno. La strategia è il cambio di osservatore: scriviamo le velocità viste dal portatreno, dove il rotismo è ordinario, e per il rotismo ordinario usiamo ciò che sappiamo già, il rapporto dei denti. Poi applichiamo la formula a due casi della dispensa: il satellite doppio e il riduttore con la corona ferma.",
      riepilogo:
        "Abbiamo scritto ogni velocità come relativa al portatreno più quella del portatreno. Visto da lì il portatreno è fermo, il rotismo è ordinario e il rapporto fra le velocità relative, $\\tau_W$, si calcola con i denti. Willis è una sola equazione in tre velocità: due gradi di libertà. Con il satellite doppio $\\tau_W$ è il prodotto di due rapporti; con la corona ferma Willis diventa un riduttore con $\\Omega = \\omega_1/4$.",
    },
    d090: {
      introduzione:
        "Ritroviamo il riduttore a corona fissa senza Willis, con un ragionamento solo geometrico: il satellite rotola sulla corona ferma, quindi il punto di contatto è il suo centro di istantanea rotazione. La strategia è uguagliare la velocità di uno stesso punto calcolata come appartenente a due corpi diversi: prima il contatto con il solare, poi il centro del satellite, che sta anche sul portatreno. Alla fine controlliamo con Willis e guardiamo il caso a solare fermo.",
      riepilogo:
        "Con la corona ferma il contatto satellite–corona è il CIR del satellite. Uguagliando la velocità nel contatto con il solare abbiamo trovato la rotazione del satellite; il suo centro va a metà velocità, e poiché sta anche sul portatreno ci ha dato $\\Omega = \\omega_1/4$. Willis ha confermato il modulo e aggiunto il segno: il satellite gira al contrario del solare. Con il solare fermo il ragionamento è lo stesso, con il CIR nell'altro contatto, e dà $\\Omega = 3\\omega_3/4$.",
    },
    d091: {
      introduzione:
        "Ora le coppie: quanto vale la coppia su ciascuno dei tre alberi? Abbiamo tre incognite e due strumenti: l'equilibrio alla rotazione dell'intero rotismo e il bilancio delle potenze. Usiamo l'equilibrio per eliminare la coppia del portatreno; nel bilancio compariranno da sole le velocità relative, cioè Willis. Alla fine ritroviamo lo stesso risultato con una via più rapida, il bilancio visto dal portatreno.",
      riepilogo:
        "L'equilibrio dice che le tre coppie esterne si annullano; il bilancio dice che le loro potenze si annullano. Togliendo la coppia del portatreno sono comparse le velocità relative e abbiamo trovato $C_1/C_2 = -\\tau_W$, come per un ordinario. Dallo stesso equilibrio è venuta la coppia del portatreno. Nessuna velocità compare nei risultati: le coppie si dividono solo secondo la geometria, e il rotismo è un partitore di coppia.",
    },
    d094: {
      introduzione:
        "Il rotismo di p. 180 mette insieme un ordinario in entrata, un epicicloidale e un ordinario in uscita. Sembra complicato, ma la strategia è da muratore: prima conto i gradi di libertà, per sapere quanti dati servono; poi tratto ogni blocco da solo, con i suoi rapporti; infine ricucio i blocchi usando gli alberi che hanno in comune. Per le coppie c'è una sorpresa: per l'epicicloidale il bilancio delle potenze non basta.",
      riepilogo:
        "Contando i gradi di libertà (quattro dei blocchi meno tre vincoli) abbiamo visto che ne resta uno: il rotismo ha un unico rapporto. Abbiamo scritto il rapporto di ogni blocco, con Willis per l'epicicloidale a solare fermo, e li abbiamo moltiplicati grazie agli alberi comuni. Per le coppie il bilancio globale dà il rapporto fra entrata e uscita, ma nell'epicicloidale serve anche l'equilibrio, perché la coppia sul solare fermo non fa potenza eppure esiste.",
    },
  },
  passi: {
    "d089.1": {
      tappa: 0,
      prima: "Siediti sul portatreno, che gira con velocità $\\Omega$. Il solare 1, visto da terra, gira a $\\omega_1$. Visto da te, quanto gira? Usa la composizione dei moti: la velocità assoluta è la relativa più quella di trascinamento, cioè della giostra. Gli assi sono tutti paralleli, quindi i vettori si sommano come numeri con segno. Ricava la velocità relativa.",
      dopo: "La velocità che vedi dal portatreno è quella assoluta meno $\\Omega$. Controllo: se il solare girasse insieme al portatreno ($\\omega_1 = \\Omega$) lo vedresti fermo, come un passeggero seduto accanto a te sulla giostra.",
    },
    "d089.2": {
      tappa: 0,
      prima: "Ripeti lo stesso ragionamento per l'altro solare. E il portatreno stesso, visto da chi ci sta seduto sopra? Fai la stessa sottrazione. Poi chiediti che cosa vuol dire per gli assi dei satelliti, che sono fissati al portatreno.",
      dopo: "Il portatreno, visto da sé stesso, è fermo: la sua velocità relativa è zero. Quindi gli assi dei satelliti, nel moto relativo, sono fissi. Un rotismo con tutti gli assi fissi è un rotismo ordinario: abbiamo trasformato il problema difficile in uno che sappiamo risolvere.",
    },
    "d089.3": {
      tappa: 1,
      prima: "Per il rotismo ordinario sai scrivere il rapporto di trasmissione: velocità di uscita diviso velocità di entrata, con il segno. Qui le velocità da usare sono quelle relative al portatreno, perché è in quel moto che il rotismo è ordinario. Metti il solare 2 come uscita e l'1 come entrata, e sostituisci le espressioni delle due righe precedenti.",
      dopo: "È la formula di Willis: $\\tau_W$ è il rapporto del rotismo reso ordinario, e si calcola con i denti come sempre. Attenzione all'ordine: uscita al numeratore. Controllo: con il portatreno fermo ($\\Omega = 0$) ritrovi il rapporto ordinario $\\omega_2/\\omega_1$.",
    },
    "d089.4": {
      tappa: 1,
      prima: "Conta le incognite. Willis contiene tre velocità: $\\omega_1$, $\\omega_2$, $\\Omega$. Quante equazioni hai? Una sola. Chiediti allora quanti dati servono per conoscere tutto, e come può essere collegato il rotismo al resto della macchina attraverso i suoi tre alberi.",
      dopo: "Con un'equazione e tre incognite servono due dati: il rotismo ha due gradi di libertà. Si può usare con due motori e un'uscita (somma di moti), un motore e due uscite (il differenziale), oppure con un membro bloccato, che lascia un grado di libertà: un riduttore.",
    },
    "d089.5": {
      tappa: 2,
      prima: "Primo esempio: il rotismo con satellite doppio (Fig. 5-47 a), in cui il solare 1 ingrana con la ruota 3, la 3 è solidale alla 4 e la 4 ingrana con il solare 2. A portatreno fermo è un rotismo ordinario in due stadi. Spezza $\\tau_W$ in due rapporti moltiplicando e dividendo per la stessa velocità relativa ($\\omega_3 = \\omega_4$), poi scrivi ogni rapporto con i denti e il segno.",
      dopo: "Due ingranamenti esterni danno due segni meno, che si annullano: $\\tau_W$ è positivo, il solare 2 gira (nel moto relativo) nello stesso verso dell'1. Il valore è il prodotto dei rapporti, come in ogni rotismo ordinario in serie.",
    },
    "d089.6": {
      tappa: 2,
      prima: "C'è un vincolo geometrico che non abbiamo ancora usato. I due solari sono coassiali e i satelliti 3 e 4 stanno sullo stesso perno. Chiediti: quanto dista il perno dall'asse dei solari, misurato attraverso il primo ingranamento? E attraverso il secondo? Devono essere uguali.",
      dopo: "La somma dei raggi del primo ingranamento è uguale a quella del secondo: stessa distanza fra gli assi. Con lo stesso modulo il raggio è $mz/2$ e la condizione passa ai denti. Con una corona interna la condizione cambia: la corona deve avere il raggio del solare più due satelliti.",
    },
    "d089.7": {
      tappa: 2,
      prima: "Secondo esempio: il riduttore di p. 175, con il solare 1, il satellite 2 e la corona 3 ferma. Con satellite e solare uguali la corona ha raggio $3R_1$. A portatreno fermo il moto va 1 → 2 (esterno) → 3 (interno): calcola $\\tau_W$ fra solare e corona. Poi scrivi Willis con $\\omega_3 = 0$ e risolvi rispetto a $\\Omega$.",
      dopo: "Il portatreno gira a un quarto del solare, nello stesso verso: un riduttore 4:1 in poco spazio. Controllo di buon senso: il segno meno di $\\tau_W$ (un solo ingranamento esterno) diventa un rapporto globale positivo. La dispensa scrive $R_3 = 3R_1$ senza dire che ha preso $R_2 = R_1$: è l'ipotesi nascosta.",
    },
    "d090.1": {
      tappa: 3,
      prima: "Ritroviamo il riduttore guardando il satellite come un corpo rigido che si muove nel piano. La corona è ferma. Il satellite la tocca in un punto e ci rotola sopra senza strisciare. Chiediti: che velocità ha il punto del satellite che in questo istante tocca la corona? Ricorda come si definisce il centro di istantanea rotazione.",
      dopo: "Il punto di contatto ha velocità zero, perché è uguale a quella della corona ferma. Quindi il satellite, in questo istante, ruota attorno a $C_{2,3}$: è il suo CIR. È come una ruota di bicicletta che rotola sull'asfalto: il punto a terra è fermo.",
    },
    "d090.2": {
      tappa: 3,
      prima: "Ora guarda l'altro contatto, $C_{1,2}$, fra satellite e solare. Lì non c'è strisciamento, quindi il punto ha la stessa velocità se lo pensi sul solare o sul satellite. Sul solare la velocità è facile: $\\omega_1$ per il raggio. Sul satellite è la sua velocità angolare per la distanza dal CIR. Quanto dista $C_{1,2}$ da $C_{2,3}$? Un diametro del satellite.",
      dopo: "La riga uguaglia le due espressioni della stessa velocità. È il passaggio chiave: un punto, due corpi, due modi di calcolarne la velocità. Il fattore $2R_2$ viene dal fatto che i due contatti sono agli estremi opposti di un diametro.",
    },
    "d090.3": {
      tappa: 3,
      prima: "Dalla riga precedente l'unica incognita è la velocità del satellite. Dividi entrambi i membri per $2R_2$ e isolala. Poi prova il caso della dispensa, satellite e solare uguali.",
      dopo: "Il satellite gira, in modulo, alla metà del solare quando i raggi sono uguali. Per ora abbiamo solo il modulo: il verso lo troveremo con Willis. Controllo: un satellite più grande gira più piano, come ci si aspetta.",
    },
    "d090.4": {
      tappa: 3,
      prima: "Ci interessa il portatreno, che è collegato al satellite nel suo centro O₂. Calcola la velocità di O₂ come punto del satellite: velocità angolare per la distanza dal CIR. Quanto dista O₂ da $C_{2,3}$? Un raggio, cioè metà della distanza di $C_{1,2}$.",
      dopo: "Il centro va a metà velocità del contatto con il solare: nella figura il profilo delle velocità lungo il diametro è un triangolo, zero nel CIR, massimo in $C_{1,2}$, metà in O₂. È lo stesso della bicicletta: il mozzo va a metà velocità del punto più alto della ruota.",
    },
    "d090.5": {
      tappa: 3,
      prima: "Il centro O₂ appartiene anche al portatreno, che ruota attorno a O₁ con velocità $\\Omega$. Quanto dista O₂ da O₁? Il raggio del solare più quello del satellite. Scrivi la velocità di O₂ come punto del portatreno e uguagliala a quella trovata come punto del satellite: ricavi $\\Omega$.",
      dopo: "Ritroviamo $\\Omega = \\omega_1/4$ con raggi uguali, lo stesso risultato di Willis per un'altra strada. Due metodi diversi che danno lo stesso numero sono il miglior controllo possibile. Il fattore 4 viene da un 2 (il centro va a metà) e da un altro 2 (il braccio del portatreno è doppio del raggio del solare).",
    },
    "d090.6": {
      tappa: 3,
      prima: "Controlliamo con Willis, che dà anche il segno. Scegli come coppia di ruote il solare e il satellite: a portatreno fermo sono un ingranamento esterno, con rapporto $-R_1/R_2$. Scrivi Willis fra questi due, risolvi rispetto a $\\omega_2$, poi sostituisci il valore di $\\Omega$ trovato e semplifica.",
      dopo: "Esce lo stesso modulo e in più il segno meno: il satellite gira al contrario del solare. È la velocità assoluta del satellite, somma del trascinamento $\\Omega$ e della rotazione relativa. Per questo non bisogna dire che il satellite gira a $\\Omega$: quella è la velocità del suo asse.",
    },
    "d090.7": {
      tappa: 3,
      prima: "Ora blocchiamo il solare e facciamo muovere la corona. Il ragionamento è identico, a parti scambiate: il contatto con il solare fermo, $C_{1,2}$, diventa il CIR del satellite, e la velocità nota è quella della corona in $C_{2,3}$, a un diametro di distanza. Uguaglia lì, trova la velocità del satellite, poi quella del centro e infine $\\Omega$.",
      dopo: "Con i raggi della dispensa il portatreno gira ai tre quarti della corona: è ancora un riduttore, ma molto meno spinto. Controllo: la corona è più grande del solare, quindi a parità di velocità di entrata trascina il portatreno più velocemente.",
    },
    "d091.1": {
      tappa: 4,
      prima: "Prendi tutto il rotismo come un unico corpo. Dall'esterno gli arrivano tre coppie, sui tre alberi, più le reazioni dei supporti. Scrivi l'equilibrio alla rotazione attorno all'asse del rotismo. Chiediti quali forze hanno momento attorno a quell'asse: le reazioni dei supporti passano per l'asse e non ne hanno.",
      dopo: "Le tre coppie esterne si annullano: una qualunque è l'opposta della somma delle altre due. È l'analogo, per i momenti, di tre forze in equilibrio. Le coppie fra i denti, interne, non compaiono.",
    },
    "d091.2": {
      tappa: 4,
      prima: "Il secondo strumento è il bilancio delle potenze. Siamo a regime (niente inerzie) e senza perdite (η = 1): quale relazione lega le potenze delle tre coppie esterne? Ricorda che la potenza di una coppia è coppia per velocità angolare del suo albero.",
      dopo: "La somma delle tre potenze è zero: tutto ciò che entra esce. Controllo: in un riduttore a corona ferma la potenza della corona è zero, e la riga dice che la potenza del solare va tutta al portatreno.",
    },
    "d091.3": {
      tappa: 4,
      prima: "Vogliamo eliminare la coppia del portatreno, che compare in entrambe le righe. Dall'equilibrio ricavi $C_p = -(C_1 + C_2)$. Sostituiscila nel bilancio delle potenze e raccogli $C_1$ e $C_2$: guarda che cosa compare fra parentesi.",
      dopo: "Compaiono da sole le velocità relative al portatreno, $\\omega_1 - \\Omega$ e $\\omega_2 - \\Omega$. Non è un caso: le coppie lavorano solo attraverso i moti relativi. Attenzione: la dispensa scrive $C_p = -C_1 + C_2$, un refuso; il segno giusto è quello della riga.",
    },
    "d091.4": {
      tappa: 4,
      prima: "Dalla riga precedente vogliamo il rapporto $C_1/C_2$. Porta il termine di $C_2$ a destra e dividi entrambi i membri per $C_2(\\omega_1 - \\Omega)$. Guarda il rapporto fra velocità relative che resta: lo hai già incontrato.",
      dopo: "Il rapporto delle coppie è $-\\tau_W$: la stessa legge del rotismo ordinario, $C_1/C_2 = -\\tau$, con il rapporto del rotismo reso ordinario. Controllo: nel riduttore con $\\tau_W = -1/3$ si ha $C_3 = 3C_1$, la corona regge tre volte la coppia del solare.",
    },
    "d091.5": {
      tappa: 4,
      prima: "La dispensa mostra una via più breve. Fai il bilancio delle potenze dal portatreno: le coppie sono le stesse (non dipendono dall'osservatore), le velocità sono quelle relative. Quanto vale la velocità relativa del portatreno? E quindi quanta potenza fa la sua coppia in questo moto?",
      dopo: "Il portatreno, fermo nel moto relativo, non fa potenza: il suo termine sparisce e si arriva subito alla riga di prima, senza passare per l'equilibrio. È lo stesso trucco di Willis: dal portatreno tutto è più semplice.",
    },
    "d091.6": {
      tappa: 4,
      prima: "Manca la coppia del portatreno. Riprendi l'equilibrio e dividilo per $C_1$: ottieni $C_p/C_1$ come $-1$ meno $C_2/C_1$. Poi usa il rapporto appena trovato, capovolto: $C_2/C_1 = -1/\\tau_W$. Metti a denominatore comune.",
      dopo: "Anche la coppia del portatreno dipende solo da $\\tau_W$. Controllo con il riduttore: $\\tau_W = -1/3$ dà $C_p/C_1 = -4$. Il portatreno, che gira quattro volte più piano, ha coppia quattro volte più grande e frena: la potenza torna.",
    },
    "d091.7": {
      tappa: 4,
      prima: "Rileggi i tre risultati: rapporto fra le coppie dei solari, rapporto fra portatreno e solare, equilibrio. Chiediti che cosa ci compare dentro. Ci sono velocità? O solo $\\tau_W$, che dipende dai denti?",
      dopo: "Solo $\\tau_W$: le coppie si ripartiscono secondo la geometria, qualunque siano le velocità. Per questo l'epicicloidale si chiama partitore di coppia. Nel differenziale questo vorrà dire coppie uguali sulle due ruote anche in curva.",
    },
    "d094.1": {
      tappa: 5,
      prima: "Prima di calcolare, conta. Ogni rotismo ordinario ha un grado di libertà, ogni epicicloidale due. Qui ci sono un epicicloidale e due ordinari. Poi conta i vincoli che li legano: il solare 4 è bloccato, le ruote 6 e 1 sono sullo stesso albero, la ruota 8 è sul portatreno. Ogni vincolo semplice toglie un grado di libertà.",
      dopo: "Resta un solo grado di libertà: basta la velocità del motore per conoscere tutto, e c'è un unico rapporto di trasmissione fra entrata e uscita. È il controllo da fare sempre prima di cercare un rapporto: se i gradi fossero due, un rapporto unico non esisterebbe.",
    },
    "d094.2": {
      tappa: 5,
      prima: "I tre vincoli contati a parole vanno scritti come equazioni fra velocità, perché sono loro che ci permetteranno di passare da un blocco all'altro. Per ciascuno chiediti: quale velocità è nulla, quali velocità sono uguali perché due ruote sono sullo stesso albero?",
      dopo: "Tre uguaglianze semplici: il solare fermo, la ruota 6 che gira con il solare 1, la ruota 8 che gira con il portatreno. Sono le «cuciture» fra i blocchi: le useremo per moltiplicare i rapporti.",
    },
    "d094.3": {
      tappa: 5,
      prima: "Primo blocco: l'ordinario in entrata, con la ruota 5 del motore che ingrana con la 6. È un solo ingranamento esterno. Scrivi il rapporto come uscita su entrata, con il segno e con i denti.",
      dopo: "Il rapporto è $-z_5/z_6$: il segno meno dice che la 6 gira al contrario della 5. Niente di nuovo: è un rotismo ordinario a un solo stadio.",
    },
    "d094.4": {
      tappa: 5,
      prima: "Secondo blocco: l'epicicloidale, con il solare 1 che entra, il solare 4 bloccato e il portatreno che esce. Scrivi Willis con il solare 4 come uscita del rotismo reso ordinario e metti $\\omega_4 = 0$. Poi risolvi rispetto a $\\Omega/\\omega_1$: moltiplica in croce e raccogli $\\Omega$.",
      dopo: "Il rapporto fra portatreno e solare è $\\tau_W/(\\tau_W - 1)$, la stessa forma del riduttore a corona fissa. Con l'ipotesi della dispensa $\\tau_W > 1$ il rapporto è positivo: il portatreno gira nello stesso verso del solare.",
    },
    "d094.5": {
      tappa: 5,
      prima: "Quanto vale $\\tau_W$ per questo epicicloidale? A portatreno fermo il moto va dal solare 1 al satellite 2, la 2 è solidale alla 3, la 3 ingrana con il solare 4. Spezza il rapporto in due stadi come per il satellite doppio, con un segno per ogni ingranamento esterno.",
      dopo: "Due ingranamenti esterni, due segni meno: $\\tau_W$ è positivo ed è il prodotto dei rapporti dei denti. Per avere $\\tau_W > 1$, come suppone la dispensa, serve $z_1z_3 > z_2z_4$.",
    },
    "d094.6": {
      tappa: 5,
      prima: "Terzo blocco: l'ordinario in uscita. La ruota 8 è calettata sul portatreno e ingrana con la 7 dell'utilizzatore. Un ingranamento esterno: scrivi il rapporto uscita su entrata, con il segno.",
      dopo: "Il rapporto è $-z_8/z_7$. Come nel primo blocco, il segno meno dice che le due ruote girano in versi opposti.",
    },
    "d094.7": {
      tappa: 5,
      prima: "Ora ricuciamo. Il rapporto globale $\\omega_7/\\omega_5$ si può scrivere come prodotto di tre frazioni che si semplificano a catena, se al posto di $\\omega_6$ metti $\\omega_1$ e al posto di $\\omega_8$ metti $\\Omega$, usando i vincoli. Scrivi il prodotto dei tre rapporti trovati e cura i segni.",
      dopo: "Il rapporto globale è il prodotto dei tre: i due segni meno degli ordinari si compensano. Se viene minore di 1 il rotismo è un riduttore, se maggiore un moltiplicatore. Controllo: le velocità intermedie sono sparite, resta solo la geometria.",
    },
    "d094.8": {
      tappa: 5,
      prima: "Passiamo alle coppie. Per l'intero rotismo, a regime e senza perdite, quali coppie esterne fanno potenza? Quella del motore sulla 5 e quella dell'utilizzatore sulla 7. Il solare 4 ha una coppia, ma è fermo. Scrivi il bilancio delle potenze e ricava $C_7/C_5$ usando il rapporto globale.",
      dopo: "La coppia d'uscita sta a quella d'entrata come $-1/\\tau$: come in un ingranaggio ideale. Le coppie interne, scambiate fra i blocchi, non compaiono. Volendo si può scrivere un bilancio per ogni blocco, con le coppie di azione e reazione fra blocchi.",
    },
    "d094.9": {
      tappa: 5,
      prima: "Ma per il blocco epicicloidale il bilancio delle potenze non dice tutto. Sul solare 4 c'è una coppia: il telaio lo tiene fermo. Poiché è fermo, la sua potenza è zero e nel bilancio non compare. Chiediti: con quale equazione la recuperi? Quella che guarda le coppie, non le potenze.",
      dopo: "L'equilibrio del blocco epicicloidale lega le tre coppie: quella che arriva dall'albero 6–1, quella sul portatreno e quella di reazione del telaio sul solare fermo. È la «II ECD» di cui parla la dispensa: senza di lei non sapresti quanto deve reggere il telaio.",
    },
    "d094.10": {
      tappa: 5,
      prima: "Per calcolare le due coppie usa le relazioni generali dell'epicicloidale, con il solare 4 al posto del solare 2. Ma valgono anche se il solare 4 è fermo? Ricorda che cosa abbiamo visto: i rapporti fra le coppie dipendono solo da $\\tau_W$, non dalle velocità.",
      dopo: "La coppia sul solare fermo è $-C_{6,1}/\\tau_W$, quella sul portatreno viene dall'equilibrio. Valgono anche con $\\omega_4 = 0$, proprio perché nei rapporti fra coppie le velocità non compaiono: è il partitore di coppia al lavoro.",
    },
  },
  racconto:
    "All'orale partirei dalla definizione: due solari e un portatreno coassiali, satelliti con l'asse portato dal portatreno, due gradi di libertà. Poi l'idea chiave: mi siedo sul portatreno, lo vedo fermo, il rotismo diventa ordinario e il rapporto fra le velocità relative è $\\tau_W = (\\omega_2 - \\Omega)/(\\omega_1 - \\Omega)$, uscita al numeratore. Applico al riduttore a corona fissa: $\\tau_W = -1/3$ e $\\Omega = \\omega_1/4$, e lo controllo col CIR del satellite sulla corona. Per le coppie scrivo equilibrio e bilancio delle potenze, elimino $C_p$ e ottengo $C_1/C_2 = -\\tau_W$: un partitore di coppia che dipende solo dai denti.",
};

export const differenziale: LezioneArgomento = {
  perche:
    "Quando un'auto curva, la ruota esterna percorre un arco più lungo dell'interna nello stesso tempo: deve girare più veloce. Se le due ruote motrici fossero sullo stesso albero rigido, una delle due dovrebbe strisciare sull'asfalto: gomme consumate, auto che non vuole curvare. Eppure il motore è uno solo. La domanda della lezione è: **come fa un unico motore a far girare due ruote a velocità diverse, e quanta coppia riceve ciascuna?** La risposta è il differenziale, un rotismo epicicloidale.",
  idea:
    "Il differenziale è un epicicloidale con le ruote coniche. I due solari sono uguali e sono attaccati ai due semiassi delle ruote. Fra loro ci sono i planetari (i satelliti), su un perno che gira insieme alla scatola, cioè al portatreno. Il motore fa girare la scatola.\n\nSe la scatola fosse ferma e girassi una ruota con la mano, l'altra girerebbe al contrario, alla stessa velocità: il planetario fa da ponte e inverte il verso. Questo vuol dire $\\tau_w = -1$. Con Willis ne esce che la scatola gira alla **media** delle due ruote. In rettilineo le ruote vanno uguali, e tutto gira come un blocco. In curva i planetari cominciano a ruotare sul proprio perno: tolgono velocità alla ruota interna e la danno all'esterna, mantenendo la media. Le coppie, invece, si dividono sempre a metà.",
  richiami: [
    { titolo: "Formula di Willis", testo: "Visto dal portatreno, che gira a $\\Omega$, l'epicicloidale è un rotismo ordinario: il rapporto fra le velocità relative dei solari è $\\tau_w = (\\omega_2 - \\Omega)/(\\omega_1 - \\Omega)$, e si calcola con i denti come in un ordinario." },
    { titolo: "Coppie in un epicicloidale", testo: "A regime e senza perdite i rapporti fra le coppie dipendono solo dalla geometria: $C_1/C_2 = -\\tau_w$ e $C_1 + C_2 + C_p = 0$ (equilibrio alla rotazione dell'intero rotismo). Le velocità non compaiono: vale in qualunque condizione di moto." },
    { titolo: "Rotolamento senza strisciamento", testo: "Una ruota di raggio $d/2$ che rotola senza strisciare ha il centro che avanza alla velocità $V = \\omega\\,d/2$: in un giro il centro percorre esattamente la circonferenza. Il punto a terra è fermo." },
    { titolo: "Corpo rigido che ruota", testo: "Se un corpo rigido ruota attorno a un punto con velocità angolare $\\omega_V$, ogni suo punto ha velocità $\\omega_V$ per la distanza da quel punto: le velocità crescono linearmente allontanandosi dal centro, come i cavalli di una giostra." },
  ],
  ipotesiPerche: [
    "Solari uguali vuol dire che, a scatola ferma, le due ruote girano alla stessa velocità in versi opposti: è questo che dà $\\tau_w = -1$. Il portatreno solidale alla corona conica è il punto in cui entra il motore.",
    "Ci servono le dimensioni del veicolo per passare dalle velocità dei centri delle ruote alle loro velocità angolari; il rotolamento senza strisciamento è proprio la condizione che vogliamo rispettare.",
    "In curva tutto il veicolo ruota attorno al centro della traiettoria: è il modo più semplice per avere le velocità delle due ruote, che stanno a distanze diverse da quel centro.",
    "Come per ogni epicicloidale, a regime e senza perdite i rapporti fra le coppie dipendono solo dalla geometria.",
  ],
  disegnoGuida:
    "Disegna l'asse posteriore dell'auto in pianta: un segmento orizzontale con una ruota a ciascun estremo, la 1 (interna alla curva) a sinistra, la 2 (esterna) a destra, a distanza p (carreggiata). Segna il punto medio M. Più a sinistra, sulla stessa retta, metti il centro della traiettoria con la sua $\\omega_V$, a distanza R da M. Poi disegna le velocità: frecce verticali in 1, M e 2, sempre più lunghe allontanandoti dal centro, con gli estremi allineati su una retta che parte dal centro. Se vuoi, aggiungi lo schema del differenziale: due solari conici sui semiassi, i planetari sul perno della scatola, la corona conica con il pignone.",
  mappa: [
    "Rendo ordinario il differenziale: i solari uguali danno $\\tau_w = -1$.",
    "Willis: la scatola gira alla media delle due ruote.",
    "Coppie: sempre uguali sulle due ruote.",
    "Rettilineo: tutto gira come un blocco.",
    "Curva: velocità delle ruote e della scatola, e il lavoro dei planetari.",
  ],
  dims: {
    d141: {
      introduzione:
        "Vogliamo legare la velocità della scatola a quelle dei due semiassi, poi trovare le coppie, poi vedere cosa succede in rettilineo e in curva. La strategia è usare tutto ciò che sappiamo degli epicicloidali: Willis con il valore particolare $\\tau_w = -1$, e le relazioni fra le coppie che non dipendono dalle velocità. Per la curva aggiungiamo la cinematica del veicolo che ruota attorno al centro della traiettoria.",
      riepilogo:
        "A scatola ferma i solari uguali girano in versi opposti: $\\tau_w = -1$, e Willis dice che la scatola gira alla media delle due ruote. Le relazioni fra le coppie danno coppie sempre uguali, ciascuna metà di quella della scatola. In rettilineo il differenziale gira come un blocco. In curva le ruote girano a velocità diverse, proporzionali alla distanza dal centro, ma la media resta quella di una ruota nel punto medio: sono i planetari, ruotando sul proprio perno, a spostare la differenza.",
    },
  },
  passi: {
    "d141.1": {
      tappa: 0,
      prima: "Rendiamo ordinario il differenziale: immagina la scatola ferma, come se tenessi l'auto sollevata e la scatola bloccata. Giri una ruota con la mano. Il moto passa dal solare 1 al planetario e dal planetario al solare 2. I due solari sono uguali. Chiediti: a che velocità gira il solare 2? E in che verso, guardando lungo l'asse comune dei semiassi?",
      dopo: "Il solare 2 gira alla stessa velocità dell'1, ma al contrario: $\\tau_w = -1$. Il planetario fa da ponte e inverte il verso, come quando giri una ruota dell'auto sollevata e l'altra gira al contrario. È tutto ciò che serve sapere della geometria del differenziale.",
    },
    "d141.2": {
      tappa: 1,
      prima: "Ora che conosci $\\tau_w$, moltiplica Willis per il denominatore: ottieni un'uguaglianza fra le due velocità relative, una l'opposta dell'altra. Porta i termini con $\\Omega$ da una parte e quelli con le velocità delle ruote dall'altra, poi dividi per 2.",
      dopo: "La scatola gira alla semisomma delle velocità delle due ruote: la media. Controllo: se una ruota è ferma (per esempio sollevata e frenata) l'altra gira al doppio della scatola. È proprio quello che si vede sollevando un'auto con una ruota bloccata.",
    },
    "d141.3": {
      tappa: 2,
      prima: "Passiamo alle coppie. Per ogni epicicloidale, a regime e senza perdite, il rapporto fra le coppie dei solari è $-\\tau_W$. Qui $\\tau_w = -1$. Capovolgi la relazione per avere $C_2/C_1$ e sostituisci.",
      dopo: "Le due coppie sono uguali, sempre: in rettilineo e in curva. È il punto da non sbagliare: la ruota esterna gira più veloce, ma non riceve più coppia. La potenza è diversa (coppia uguale, velocità diversa), la coppia no. Ne segue una conseguenza nota, ma non scritta nella dispensa: se una ruota slitta sul ghiaccio e trasmette poca coppia, anche l'altra ne riceve poca.",
    },
    "d141.4": {
      tappa: 2,
      prima: "Quanta coppia arriva a ciascuna ruota rispetto a quella che arriva dalla corona? Scrivi l'equilibrio alla rotazione dell'intero rotismo: la somma delle tre coppie esterne è zero. Ricava $C_p$ e usa il fatto che $C_1 = C_2$.",
      dopo: "La coppia della scatola si divide in due parti uguali sui semiassi: ciascuna ruota ne riceve metà. Il segno meno dice che la coppia del motore e quelle di reazione delle ruote sono opposte, come deve essere per l'equilibrio.",
    },
    "d141.5": {
      tappa: 3,
      prima: "In rettilineo le due ruote percorrono la stessa strada nello stesso tempo, quindi girano alla stessa velocità. Mettilo nella formula della media: a che velocità gira la scatola? E quanto vale la velocità relativa dei solari rispetto alla scatola?",
      dopo: "Le ruote e la scatola girano tutte insieme e la velocità relativa è zero: i planetari non ruotano sul proprio perno, sono solo trascinati. Il differenziale gira come un blocco unico, come se le due ruote fossero sullo stesso albero.",
    },
    "d141.6": {
      tappa: 4,
      prima: "In curva tutto il veicolo ruota attorno al centro della traiettoria con velocità angolare $\\omega_V$. Ogni punto ha velocità $\\omega_V$ per la distanza dal centro. Il punto medio dell'asse dista R; la ruota interna dista R meno mezza carreggiata, l'esterna R più mezza carreggiata. Scrivi le tre velocità.",
      dopo: "Le velocità crescono linearmente con la distanza dal centro: nella figura gli estremi delle tre frecce stanno su una retta che passa per il centro della curva. La ruota esterna va più veloce dell'interna di $\\omega_V\\,p$.",
    },
    "d141.7": {
      tappa: 4,
      prima: "Ci servono le velocità angolari delle ruote, perché sono quelle dei solari. Ogni ruota rotola senza strisciare: velocità del centro uguale a velocità angolare per raggio, cioè per $d/2$. Dividi ciascuna velocità per $d/2$, poi raccogli $V_M = \\omega_V R$ per far comparire il rapporto $p/(2R)$.",
      dopo: "La ruota interna gira più piano della media, l'esterna più veloce, della stessa quantità relativa $p/(2R)$. Controllo: in una curva larghissima ($R$ enorme) la differenza sparisce e torni al rettilineo. Senza differenziale una delle due ruote dovrebbe strisciare.",
    },
    "d141.8": {
      tappa: 4,
      prima: "Che velocità ha la scatola in curva? Usa la formula della media e sostituisci le due velocità angolari appena trovate. Guarda i termini con $p/(2R)$: uno ha il più, l'altro il meno.",
      dopo: "I termini della curva si elidono: la scatola gira come girerebbe una ruota messa nel punto medio dell'asse. Il motore vede solo la velocità del veicolo; la differenza fra le ruote la gestisce il differenziale da solo, senza che il motore se ne accorga.",
    },
    "d141.9": {
      tappa: 4,
      prima: "Chi realizza questa differenza? Calcola la velocità relativa di ciascun solare rispetto alla scatola, sottraendo $\\Omega$ alle velocità delle ruote. Poi chiediti chi deve girare, dentro la scatola, perché i solari abbiano velocità relative opposte: il planetario che li collega, con il rapporto dei denti fra solare e planetario.",
      dopo: "Le due velocità relative sono opposte: il solare interno rallenta e quello esterno accelera della stessa quantità. Questo lo fanno i planetari, che in curva ruotano sul proprio perno, oltre a essere trascinati dalla scatola. In rettilineo questa rotazione è zero.",
    },
  },
  racconto:
    "All'orale partirei dal problema: in curva la ruota esterna fa più strada e deve girare più veloce, ma il motore è uno. Poi descrivo il differenziale: epicicloidale conico, solari uguali sui semiassi, planetari sul perno della scatola, che è il portatreno mosso dalla corona conica. A scatola ferma i solari girano al contrario, quindi $\\tau_w = -1$ e Willis dà $\\Omega = (\\omega_1 + \\omega_2)/2$. Dico che le coppie sono sempre uguali, $C_1 = C_2 = -C_p/2$. Infine la curva: $\\omega_{1,2} = \\frac{2V_M}{d}(1 \\mp \\frac{p}{2R})$, la media è $2V_M/d$ e sono i planetari, ruotando sul proprio perno, a spostare la differenza.",
};
