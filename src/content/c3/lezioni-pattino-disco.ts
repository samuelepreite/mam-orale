/** Lezioni discorsive C3: freno a pattino e freno a disco (docs/BRIEF_LEZIONI.md). */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ====================================================================================================== c3-pattino
export const pattinoLezione: LezioneArgomento = {
  perche: r`Immagina un nastro trasportatore che deve fermarsi, o una fune che scorre: non c'è niente che giri, c'è qualcosa che trasla. Per frenarlo si usa un pattino, un blocchetto di ferodo incernierato a un telaio, che una coppia preme sul nastro. Sembra un problema banale, ma il pattino non preme in modo uniforme: preme di più da una parte. E a seconda del verso in cui corre il nastro, lo stesso pattino frena poco, frena tanto oppure si impunta. La domanda è: **come si distribuisce la pressione sotto il pattino, quanto frena e perché il verso del nastro conta così tanto?**`,
  idea:
    r`Il pattino è un ceppo con il tamburo diventato piatto: un raggio infinito. Il ragionamento è lo stesso del tamburo, con Reye. Il nastro striscia sotto il pattino alla stessa velocità in ogni punto, quindi la pressione è proporzionale al consumo. Il consumo lo dà la cinematica: il pattino, consumandosi, ruota un pochino attorno alla cerniera O, come una porta che si chiude. I punti lontani dalla cerniera si muovono di più, quelli vicini quasi niente. Quindi il consumo, e con lui la pressione, cresce in linea retta con la distanza dal piede della cerniera sul nastro.` +
    '\n\n' +
    r`Con la pressione nota si sommano le forze e si trova dove agisce la risultante: un po' oltre il centro del pattino, dalla parte dove si preme di più. Poi si scrive l'equilibrio del pattino attorno alla cerniera. Come nel ceppo, l'attrito del nastro può opporsi alla coppia di accostamento o aiutarla, a seconda del verso del nastro; se la aiuta troppo, il pattino si impunta. Nell'accostamento libero, invece, la statica basta da sola: il pattino è un corpo a due forze.`,
  richiami: [
    { titolo: 'Ipotesi di Reye in breve', testo: r`Il volume di ferodo asportato al secondo è proporzionale alla potenza dissipata dall'attrito: $\dot\delta\,dA = k\,|d\underline F_T\cdot\underline V|$. Se la velocità di strisciamento è la stessa ovunque, il consumo è proporzionale alla pressione. Il consumo lo leggi come componente normale della velocità con cui il pezzo si avvicina alla superficie.` },
    { titolo: 'Integrali di potenze', testo: r`La primitiva di $x^n$ è $x^{n+1}/(n+1)$. Quindi $\int_s^{s+l}x\,dx = [(s+l)^2 - s^2]/2$ e $\int_s^{s+l}x^2\,dx = [(s+l)^3 - s^3]/3$. Il primo è l'area sotto una retta, il secondo serve per i momenti di una forza distribuita linearmente.` },
    { titolo: 'Teorema di Varignon', testo: r`Il momento della risultante di un sistema di forze è uguale alla somma dei momenti delle singole forze. Serve per trovare dove applicare la risultante di una forza distribuita: la si mette nel punto in cui produce lo stesso momento dell'insieme. Per forze parallele il punto è una «media pesata» delle posizioni.` },
    { titolo: 'Corpo a due forze', testo: r`Se su un corpo in equilibrio agiscono solo due forze, queste sono uguali, opposte e sulla stessa retta. Altrimenti formerebbero una coppia e il corpo ruoterebbe. Un'asta incernierata agli estremi e caricata solo lì trasmette quindi una forza lungo il suo asse.` },
  ],
  ipotesiPerche: [
    r`Le grandezze geometriche (s, l, B, h) sono quelle che compariranno negli integrali e nei bracci: senza di esse non si scrivono né le risultanti né l'equilibrio attorno a O.`,
    r`Il tipo di accostamento decide il metodo. Rigido: un solo grado di libertà, il centro di rotazione è noto (O) e la pressione si ricava con Reye. Libero: due gradi di libertà, il pattino è un corpo a due forze e basta la statica.`,
    r`Reye serve per chiudere il problema iperstatico. Che la velocità del nastro sia la stessa ovunque rende il consumo proporzionale alla sola pressione; Coulomb dà l'attrito locale $f\,p\,dA$.`,
    r`L'attrito del nastro sul pattino ha il verso del nastro: invertendo il nastro il suo momento rispetto a O cambia segno e passa dall'opporsi alla coppia all'aiutarla. È il «±» della formula finale.`,
  ],
  disegnoGuida: r`Disegna il nastro come una linea orizzontale e segna con una freccia il verso di V_nastro: deciderà il segno finale. In alto a destra disegna la cerniera fissa O con il telaio, e scendi in verticale fino al nastro: il piede è O*, origine dell'asse x lungo il nastro, e la distanza O–O* è h. Disegna il pattino appoggiato sul nastro fra x = s e x = s + l, collegato a O da una leva, e metti la coppia di accostamento C_az attorno a O. Sotto il pattino disegna la pressione come un trapezio che cresce allontanandosi da O*: p = k′x. In un punto P disegna la velocità di accostamento, perpendicolare a OP, e la sua componente verso il nastro. Infine segna le risultanti F_N e F_T applicate in x₀, un po' oltre il centro del pattino.`,
  mappa: [
    'Capisco perché la statica non basta e che cosa cambia rispetto al tamburo.',
    'Ricavo il consumo dalla rotazione attorno a O e, con Reye, la pressione lineare.',
    'Integro: forza normale, forza tangenziale e punto di applicazione.',
    'Equilibrio del pattino attorno alla cerniera: forza frenante e freno di sicurezza.',
    'Accostamento libero: corpo a due forze, retta per la cerniera inclinata di φ.',
  ],
  dims: {
    d044: {
      introduzione: r`È la dimostrazione principale. Prima contiamo i gradi di libertà e scopriamo che serve Reye. Poi calcoliamo il consumo dalla rotazione attorno a O e lo uguagliamo a quello di Reye: viene una pressione lineare. Integrando troviamo le risultanti e il loro punto di applicazione. Infine l'equilibrio alla rotazione attorno a O lega la forza frenante alla coppia di comando.`,
      riepilogo: r`Il pattino ad accostamento rigido è iperstatico di un grado, quindi serve Reye. Il pattino ruota attorno a O e il consumo cresce linearmente con la distanza x da O*; la velocità del nastro è uguale ovunque, quindi la pressione è proporzionale al consumo: $p = k'x$. Integrando si trovano $F_N$, $F_T = fF_N$ e, con Varignon, il punto $x_0$ oltre il centro. L'equilibrio attorno a O dà $F_T = C_{az}/(x_0/f \pm h)$: con il segno meno l'attrito aiuta la coppia e il pattino può impuntarsi.`,
    },
    d045: {
      introduzione: r`Ora il pattino non è più incernierato direttamente al telaio, ma a un'asta che porta la coppia di comando. Due gradi di libertà: il centro di rotazione non è noto e non possiamo usare Reye per la pressione. In compenso la statica è semplicissima, perché sul pattino agiscono solo due forze. Troviamo la retta d'azione, poi il modulo dall'equilibrio dell'asta.`,
      riepilogo: r`Pattino e asta con due cerniere danno due gradi di libertà: accostamento libero. Sul pattino agiscono solo la forza del nastro e la reazione in A, quindi sono collineari: la forza frenante passa per A. Non c'è cerchio d'attrito, ma la forza è inclinata di φ sulla normale, dalla parte del moto del nastro. Il modulo si ricava dall'equilibrio dell'asta, $C/d_{\bar O}$; le componenti sono $F_N$ e $fF_N$. Se la retta passasse per Ō il pattino si impunterebbe.`,
    },
    d046: {
      introduzione: r`Dove è applicata la risultante delle pressioni? Il metodo è sempre Varignon: la risultante va messa dove produce lo stesso momento della distribuzione. Lo applichiamo al pattino con pressione lineare e al pattino del freno a disco con pressione iperbolica, e confrontiamo con il tamburo. Scopriremo che la risultante normale e quella tangenziale, in generale, non passano per lo stesso punto.`,
      riepilogo: r`Varignon dice che il punto di applicazione è il rapporto fra il momento delle forze e la loro somma. Nel pattino, con $p = k'x$, la risultante cade oltre il centro di $l^2/[6(2s+l)]$, verso il lato più premuto. Nel disco, con $p = K''/r$, la risultante normale sta sulla bisettrice a distanza $b_m < r_m$, la tangenziale ha braccio $b_t > r_m$, e il loro prodotto è $r_m^2$. Anche nel tamburo applicare tutto in M è un'approssimazione.`,
    },
    d050: {
      introduzione: r`Il pattino è davvero un ceppo con raggio infinito? Lo verifichiamo facendo crescere il raggio a lunghezza di contatto fissata. Scriviamo una legge unica per il consumo che valga sia sul cerchio sia sulla retta, e vediamo che cosa diventa nei due casi. Poi guardiamo che fine fanno la risultante normale e il cerchio d'attrito.`,
      riepilogo: r`A lunghezza fissata, se il raggio cresce l'arco si appiattisce e l'apertura tende a zero. Il consumo è sempre $\omega_{acc}$ per la distanza tangenziale da C. Sul tamburo la tangente ruota e questa distanza va come cos θ, quasi costante; sul nastro la tangente è fissa e la distanza è x, quindi consumo e pressione lineari. Le normali diventano parallele e la risultante diventa pressione per area. Il cerchio d'attrito diventa infinito: resta solo l'inclinazione φ.`,
    },
  },
  passi: {
    'd044.1': {
      tappa: 0,
      prima: r`Prima di calcolare, chiediti se la statica basta. Il pattino, con la sola cerniera O, può fare un solo movimento: ruotare. Il contatto con il nastro, esteso su una superficie, gli impedirebbe di affondare e di ruotare: toglie altri due gradi di libertà. Confronta: quanti movimenti possibili, quanti vincoli?`,
      dopo: r`Un grado di libertà e due vincoli: il pattino è iperstatico di un grado. Le equazioni di equilibrio non bastano a dire come si distribuisce la pressione, servono informazioni in più. Come nel tamburo, l'informazione in più viene dall'ipotesi dell'usura di Reye.`,
    },
    'd044.2': {
      tappa: 1,
      prima: r`Il consumo nel punto P è quanto P si avvicina al nastro, al secondo. Il pattino ruota attorno a O, quindi P ha velocità $\underline\omega_{acc}\wedge(P-O)$. Spezza $(P-O)$ passando per O*: un pezzo verticale da O a O*, uno orizzontale da O* a P, lungo x. Ruotare un vettore verticale dà un vettore orizzontale, parallelo al nastro. Che componente ha verso il nastro?`,
      dopo: r`Il pezzo verticale dà una velocità parallela al nastro, che non avvicina niente: sparisce. Resta il pezzo orizzontale, che ruotato diventa verticale e vale $\omega_{acc}x$. Il consumo cresce **linearmente** con x: zero sotto la cerniera, massimo all'estremo lontano. La dispensa trova $-\omega_{acc}x$ per come orienta l'asse x; conta il modulo.`,
    },
    'd044.3': {
      tappa: 1,
      prima: r`Ora Reye: portata uguale a una costante per la potenza dissipata. La forza d'attrito sull'areola è $f\,p\,dA$ lungo il nastro, contro il suo moto; la velocità di strisciamento è quella del nastro, V, lungo la stessa retta. Fai il prodotto scalare, togli il segno con il modulo e semplifica dA. Chiediti: la velocità V cambia da punto a punto?`,
      dopo: r`Il consumo è $\bar k f V p$. Siccome il nastro trasla, V è la stessa in ogni punto: l'unica cosa che varia lungo il pattino è la pressione. Quindi consumo e pressione sono proporzionali, esattamente come nel tamburo e a differenza del disco.`,
    },
    'd044.4': {
      tappa: 1,
      prima: r`Abbiamo due espressioni dello stesso consumo: dalla cinematica $\omega_{acc}x$, da Reye $\bar k f V p$. Uguagliale e ricava la pressione. Tutto ciò che non dipende da x raccoglilo in una costante k′.`,
      dopo: r`La pressione è lineare: $p = k'x$. Nulla sotto la cerniera, cresce allontanandosi da O*. Quindi il pattino preme di più all'estremo lontano dalla cerniera e lì si consuma di più. Controllo: se il pattino traslasse invece di ruotare, il consumo sarebbe uniforme e la pressione costante.`,
    },
    'd044.5': {
      tappa: 2,
      prima: r`Forza normale totale. Le forze normali elementari sono tutte perpendicolari al nastro, quindi parallele fra loro: la risultante è la somma dei moduli, senza scomporre niente. L'areola è una striscia larga dx e profonda B. Integra $k'x\,B\,dx$ da s a s + l.`,
      dopo: r`Viene $\tfrac{Bk'}{2}[(s+l)^2 - s^2]$: è l'area del trapezio delle pressioni moltiplicata per la profondità B. Controllo: allontanando il pattino dalla cerniera (s più grande) la forza cresce, perché lì la pressione è più alta a parità di k′.`,
    },
    'd044.6': {
      tappa: 2,
      prima: r`Forza tangenziale totale. Anche le forze d'attrito sono tutte parallele, lungo il nastro, e ognuna è f volte la normale corrispondente. Che cosa ti aspetti dalla somma di tante forze tutte parallele, ognuna uguale a f volte un'altra?`,
      dopo: r`La risultante tangenziale è esattamente f volte la normale. Qui vale senza approssimazioni, perché tutte le forze sono parallele: la dispensa scrive «verificato». Nel disco invece le tangenziali girano e non varrà. La forza del pattino sul nastro è opposta alla velocità del nastro.`,
    },
    'd044.7': {
      tappa: 2,
      prima: r`Dove applichiamo la risultante normale? Usiamo Varignon con il polo in O*: la risultante, a distanza $x_0$, deve dare lo stesso momento di tutte le forzine, ognuna con braccio x. Quindi a destra c'è l'integrale di x per $k'x\,B\,dx$, con $x^2$ dentro. Poi dividi per $|F_N|$ e semplifica B e k′.`,
      dopo: r`$x_0$ dipende solo dalla geometria. Siccome la pressione cresce con x, la risultante è spostata **oltre** il centro del pattino, verso l'estremo lontano da O*. Controllo con s = 0 (pattino che parte da O*): $x_0 = 2l/3$, il baricentro di un triangolo, come ci si aspetta da una distribuzione triangolare.`,
    },
    'd044.8': {
      tappa: 3,
      prima: r`Ora l'equilibrio del pattino attorno alla cerniera O, così la reazione della cerniera sparisce. Le forze con momento sono: la coppia di accostamento, la risultante normale con braccio $x_0$ (distanza orizzontale da O), la risultante tangenziale con braccio h (è sul nastro, a quota h sotto O). Guarda la figura: con il nastro nel verso della dispensa, normale e attrito girano il pattino nello stesso verso?`,
      dopo: r`Sì: nel verso della figura i due momenti si sommano e la coppia deve vincerli entrambi, $C_{az} = |F_N|x_0 + |F_T|h$. La dispensa nel passaggio fra due righe perde un segno su $C_{az}$ (NF-142); la versione con i moduli evita il problema.`,
    },
    'd044.9': {
      tappa: 3,
      prima: r`Vogliamo la forza frenante in funzione della coppia. Sostituisci $|F_N| = F_T/f$, raccogli $F_T$ e dividi. Poi chiediti che cosa succede se il nastro corre al contrario: l'attrito cambia verso, e il suo momento rispetto a O passa dall'opporsi alla coppia all'aiutarla. Quale segno cambia nella formula?`,
      dopo: r`$F_T = C_{az}/(x_0/f \pm h)$: il più quando l'attrito si oppone, il meno quando aiuta. Con il meno, se $x_0/f$ si avvicina a h, il denominatore va a zero e la forza frenante esplode: il pattino si impunta. La dispensa lo chiama «freno di sicurezza». È la stessa struttura del ceppo avvolgente.`,
    },
    'd045.1': {
      tappa: 4,
      prima: r`Contiamo i gradi di libertà del meccanismo, tolto il nastro. Ogni corpo libero nel piano ha tre gradi di libertà; ogni cerniera ne toglie due. Qui i corpi mobili sono il pattino e l'asta, le cerniere sono Ō (asta a terra) e A (asta sul pattino).`,
      dopo: r`Due per tre meno due per due fa due: due gradi di libertà, accostamento libero, come il ceppo libero di p. 112. Conseguenza: il pattino può adattarsi al nastro in più modi e non abbiamo un centro di rotazione fisso da cui calcolare il consumo.`,
    },
    'd045.2': {
      tappa: 4,
      prima: r`Quali forze agiscono sul pattino? La coppia di comando sta sull'asta, non sul pattino. Sul pattino restano l'azione del nastro (normale più attrito, sommate in una forza) e la reazione della cerniera A. Ricorda la regola dei corpi a due forze.`,
      dopo: r`Le due forze sono uguali, opposte e collineari: la retta della forza frenante deve passare per A. È la prima informazione sulla retta d'azione. Ne serve una seconda per fissarla del tutto: la sua inclinazione.`,
    },
    'd045.3': {
      tappa: 4,
      prima: r`Nel tamburo la seconda informazione era il cerchio d'attrito, di raggio R sin φ. Qui il «tamburo» è piatto, raggio infinito: che fine fa quel cerchio? Ragiona invece sull'inclinazione: normale più attrito, con l'attrito f volte la normale, danno una forza che fa un angolo fisso con la normale. Da che parte si inclina la forza del nastro sul pattino?`,
      dopo: r`Il cerchio d'attrito diventa infinito e non serve più; resta che la forza è inclinata di φ = arctg f sulla normale. La forza del nastro sul pattino tira nel verso del moto del nastro, quindi si inclina da quella parte. Ora la retta è fissata: passa per A con inclinazione φ.`,
    },
    'd045.4': {
      tappa: 4,
      prima: r`Dove questa retta incontra il nastro? A è a quota a sopra il nastro. Scendendo di a lungo una retta inclinata di φ rispetto alla verticale, ci si sposta orizzontalmente di a tg φ, cioè a f. Il punto di arrivo è dove deve cadere la risultante delle pressioni.`,
      dopo: r`Il centro di pressione è a $x_A - af$: scendendo da A fino al nastro la retta si sposta orizzontalmente di af, dalla parte imposta dal verso del nastro. Controllo di progetto: questo punto deve cadere dentro il pattino, altrimenti il pattino si alzerebbe da una parte e la pressione non potrebbe equilibrarlo.`,
    },
    'd045.5': {
      tappa: 4,
      prima: r`Conosciamo la retta, non il modulo. Il modulo lo dà l'asta: su di essa agiscono la coppia C e le reazioni in Ō e in A. Scrivi l'equilibrio alla rotazione dell'asta con polo Ō: la reazione in Ō sparisce, resta la coppia contro il momento della forza in A, il cui braccio è la distanza di Ō dalla retta trovata.`,
      dopo: r`La forza vale la coppia divisa per la distanza $d_{\bar O}$. Più la retta passa vicino a Ō, più forza si ottiene con la stessa coppia: la geometria fa da leva. Per azione e reazione, la forza del nastro sul pattino ha lo stesso modulo della reazione in A.`,
    },
    'd045.6': {
      tappa: 4,
      prima: r`Abbiamo la forza totale e il suo angolo φ con la normale. Per conoscere quanto frena il nastro serve la componente lungo il nastro; per il carico sul nastro, la componente normale. Scomponi con seno e coseno di φ.`,
      dopo: r`La componente normale è $|F_f|\cos\varphi$, quella tangenziale $|F_f|\sin\varphi$, e il loro rapporto è tg φ = f, come deve essere. La componente tangenziale è la forza frenante sul nastro.`,
    },
    'd045.7': {
      tappa: 4,
      prima: r`Che cosa cambia se aumenti la coppia di comando? Chiediti che cosa dipende da C nelle formule: il modulo, sì. E l'angolo? L'angolo viene da f, che per Coulomb dipende solo dai materiali.`,
      dopo: r`La forza cresce ma la retta resta la stessa: non si inclina di più. Nota anche la differenza con il rigido: lì conoscevamo il centro di rotazione e ricavavamo la pressione prima della statica; qui prima si risolve la statica, e la pressione resta incognita.`,
    },
    'd045.8': {
      tappa: 4,
      prima: r`Variante: l'asta non porta una coppia, e la forza di comando agisce direttamente sul pattino. Un'asta caricata solo agli estremi trasmette una forza lungo il suo asse. Quante forze agiscono ora sul pattino, e come si trovano tre forze in equilibrio?`,
      dopo: r`Tre forze: comando, reazione lungo l'asta, forza del nastro. Tre forze in equilibrio passano per uno stesso punto e formano un triangolo chiuso: si risolve con il poligono delle forze. Regola pratica della dispensa: con una forza conviene la cerniera vicino all'estremo, con una coppia A vicino al centro del pattino.`,
    },
    'd045.9': {
      tappa: 4,
      prima: r`Guarda la formula $|F_f| = C/d_{\bar O}$. Che cosa succede se la retta d'azione, per A e inclinata di φ, passa proprio per Ō? Pensa al denominatore e al significato fisico.`,
      dopo: r`La distanza è zero e la forza sarebbe infinita con una coppia finita: il pattino si serra da solo, si impunta. È la versione «libera» dell'autobloccaggio; la dispensa lo dice solo per il rigido (NF-149). In progetto si tiene la retta lontana da Ō.`,
    },
    'd046.1': {
      tappa: 2,
      prima: r`Vogliamo una ricetta generale per il punto di applicazione. La risultante è la somma delle forze. Il punto è quello in cui la risultante, da sola, produce lo stesso momento di tutte le forze distribuite. Scrivi le due uguaglianze: una per la forza, una per il momento rispetto a un polo.`,
      dopo: r`La forza è l'integrale di $dF_N$, il momento è l'integrale di x per $dF_N$, e $x_0$ è il loro rapporto: una media delle posizioni pesata con le forze. È il teorema di Varignon, che la dispensa enuncia come «eguaglio il momento risultante con la risultante dei momenti».`,
    },
    'd046.2': {
      tappa: 2,
      prima: r`Calcoliamo il momento nel pattino. La forza elementare è pressione per area, $k'x\,B\,dx$, e il suo braccio rispetto a O* è x. Moltiplica e integra da s a s + l: dentro c'è $x^2$.`,
      dopo: r`Il momento vale $\tfrac{Bk'}{3}[(s+l)^3 - s^3]$. Compare il cubo perché la pressione cresce con x e in più il braccio è x. Controllo delle unità: pressione per lunghezza al quadrato per lunghezza è una forza per lunghezza, un momento.`,
    },
    'd046.3': {
      tappa: 2,
      prima: r`Ora dividi il momento per la forza normale, che sappiamo essere $\tfrac{Bk'}{2}[(s+l)^2 - s^2]$. Guarda che cosa si semplifica: la profondità B e la costante k′ compaiono sopra e sotto.`,
      dopo: r`$x_0$ dipende solo da s e l: la posizione della risultante non dipende da quanto premi né dal materiale, solo dalla geometria. Controllo con s = 0: $x_0 = \tfrac{2}{3}l$, il baricentro del triangolo delle pressioni.`,
    },
    'd046.4': {
      tappa: 2,
      prima: r`Di quanto la risultante è spostata rispetto al centro del pattino, che sta a s + l/2? Sottrai il centro da $x_0$ e porta tutto a denominatore comune $6(2s+l)$: molti termini si cancellano.`,
      dopo: r`Lo scarto è $l^2/[6(2s+l)]$, sempre positivo: la risultante è oltre il centro, verso il lato più premuto. Cresce con la lunghezza del pattino e cala se il pattino è lontano dalla cerniera, dove la pressione è più uniforme in proporzione.`,
    },
    'd046.5': {
      tappa: 2,
      prima: r`Ora il pattino del disco, con pressione $K''/r$. Per simmetria la risultante normale sta sulla bisettrice del settore. A che distanza dal centro? Usa Varignon con un asse perpendicolare alla bisettrice: il braccio della forzina in (r, θ) è la sua proiezione sulla bisettrice, $r\cos\theta$. Moltiplica per $K''/r$ e per $dA = r\,dr\,d\theta$, poi dividi per la forza normale.`,
      dopo: r`Viene $b_m = r_m\,\sin(\alpha/2)/(\alpha/2)$, più piccolo del raggio medio: la risultante normale è spostata verso il centro del disco, dove la pressione è più alta. Controllo: per α che tende a zero il fattore tende a 1 e $b_m$ diventa $r_m$.`,
    },
    'd046.6': {
      tappa: 2,
      prima: r`E la risultante tangenziale? Il suo braccio $b_t$ si definisce come momento frenante diviso per il modulo della risultante tangenziale. Dal freno a disco sappiamo che il momento è $fF_Nr_m$ e che la risultante tangenziale ha il fattore $\sin(\alpha/2)/(\alpha/2)$. Fai il rapporto, e poi moltiplica $b_m$ per $b_t$.`,
      dopo: r`$b_t$ ha il fattore inverso, quindi è più grande di $r_m$, e il prodotto $b_m b_t$ vale esattamente $r_m^2$: i due bracci sono «speculari». Conclusione: normale e tangenziale passano per punti diversi, e coincidono solo per α che tende a zero.`,
    },
    'd046.7': {
      tappa: 2,
      prima: r`Torniamo al tamburo con pressione uniforme. Anche lì possiamo chiederci a che distanza da O passa la risultante tangenziale: momento esatto diviso modulo della risultante. I due valori li abbiamo già: $f p_0 R^2 B\alpha$ e $2fp_0RB\sin(\alpha/2)$.`,
      dopo: r`Il braccio è R per $(\alpha/2)/\sin(\alpha/2)$: un po' più di R. Quindi anche nel tamburo applicare le risultanti nel punto medio M è solo una prima approssimazione, con un errore dell'11 % per archi di 90°. Il fenomeno è lo stesso del disco.`,
    },
    'd050.1': {
      tappa: 0,
      prima: r`Immagina un ceppo con una lunghezza di contatto fissa, L, e fai crescere il raggio del tamburo. L'apertura dell'arco è lunghezza diviso raggio. Che cosa succede all'arco quando R diventa enorme? Pensa a un pezzo di equatore lungo un metro: sembra dritto.`,
      dopo: r`L'apertura α = L/R tende a zero: l'arco si appiattisce e diventa un segmento. Il tamburo, al limite, è una superficie piana che trasla, cioè il nastro. È la frase della dispensa: «un ceppo esteso all'infinito sarà un pattino piano».`,
    },
    'd050.2': {
      tappa: 1,
      prima: r`Ci serve una legge del consumo che valga sia sul cerchio sia sulla retta. Il consumo è $\underline\omega_{acc}\wedge(P-C)\cdot\underline n$. C'è un prodotto misto, e nei prodotti misti si possono ruotare i fattori. Riscrivilo in modo che (P − C) sia moltiplicato scalarmente per un versore: quale versore nasce da $\underline n\wedge\underline k$?`,
      dopo: r`$\underline n\wedge\underline k$ è il versore tangente $\underline t$ alla superficie. Quindi il consumo è $\omega_{acc}$ per la distanza di P da C misurata **lungo la tangente**. È una legge unica: tamburo e pattino sono due casi, che si distinguono per come si comporta la tangente.`,
    },
    'd050.3': {
      tappa: 1,
      prima: r`Caso tamburo, con C = O′. Spezza $(P-O')$ in $(P-O) + (O-O')$. Il raggio (P − O) è perpendicolare alla tangente $\underline e_\theta$: che contributo dà? Resta $(O-O')$, un vettore verticale fisso, proiettato su una tangente che ruota con θ.`,
      dopo: r`Il raggio non contribuisce e resta $\omega_{acc}\overline{OO'}\cos\theta$: la legge di p. 108. Sul cerchio la tangente gira, e la distanza tangenziale dalla cerniera varia solo come cos θ: per archi fino a 90° il consumo è quasi uniforme.`,
    },
    'd050.4': {
      tappa: 1,
      prima: r`Caso pattino, con C = O. Sul nastro piano la tangente è sempre la stessa direzione. Spezza $(P-O)$ in $(P-O^*) + (O^*-O)$: il secondo pezzo è verticale, perpendicolare alla tangente. Che cosa resta, e come dipende dalla posizione di P?`,
      dopo: r`Resta $\omega_{acc}x$, con x la distanza da O*: il consumo è **lineare**. La differenza con il tamburo è tutta qui: sul cerchio la tangente ruota e compensa, sul piano no. Per questo la dispensa dice che nel pattino il consumo «non si può considerare uniforme».`,
    },
    'd050.5': {
      tappa: 2,
      prima: r`Che fine fa la risultante normale del ceppo, $2p_0RB\sin(\alpha/2)$, quando R cresce? Sostituisci α = L/R. Per angoli piccoli il seno è circa uguale all'angolo: $\sin(L/2R) \approx L/2R$. Moltiplica.`,
      dopo: r`R si semplifica e resta $p_0BL$: pressione per area. Le forze normali sono diventate parallele, e la risultante è la somma dei moduli, come nel calcolo delle risultanti del pattino. Il fattore «ventaglio» $\sin(\alpha/2)/(\alpha/2)$ è diventato 1.`,
    },
    'd050.6': {
      tappa: 4,
      prima: r`E il cerchio d'attrito, di raggio R sin φ? Se R va all'infinito, anche ρ va all'infinito: il cerchio non è più uno strumento utile. Che cosa resta dell'informazione che dava? Ricorda da dove veniva: dall'inclinazione della forza sulla normale.`,
      dopo: r`Resta solo che la forza frenante è inclinata di φ sulla normale. Nel pattino libero la retta passa per la cerniera dell'asta e ha questa inclinazione: due informazioni che bastano, come abbiamo visto in d045.`,
    },
    'd050.7': {
      tappa: 1,
      prima: r`Ultima domanda: si potrebbe avere pressione uniforme sotto il pattino? Per Reye, con velocità di strisciamento uguale ovunque, la pressione segue il consumo. Che moto di accostamento servirebbe per avere lo stesso consumo in ogni punto?`,
      dopo: r`Servirebbe una traslazione pura perpendicolare al nastro, cioè tutti i punti alla stessa velocità verso il nastro. Con una cerniera non è possibile: il pattino ruota e il consumo è lineare, quindi $p = k'x$. È esattamente il caso del disco, dove la pinza fa traslare il pattino.`,
    },
  },
  racconto: r`All'orale dici che il pattino frena un nastro e che, con la sola cerniera, è iperstatico di un grado: serve Reye. Il pattino ruota attorno a O, quindi il consumo è $\omega_{acc}x$, lineare con la distanza da O*; la velocità del nastro è la stessa ovunque, quindi $p = k'x$. È il ceppo con raggio infinito: sul piano la tangente non ruota più. Integri: $F_N = \tfrac{Bk'}{2}[(s+l)^2 - s^2]$, $F_T = fF_N$ esatto, e con Varignon $x_0$ oltre il centro. L'equilibrio attorno a O dà $F_T = C_{az}/(x_0/f \pm h)$; con il meno è il freno di sicurezza, che si impunta. Nel libero: due forze, retta per A inclinata di φ.`,
};

// ====================================================================================================== c3-disco
export const discoLezione: LezioneArgomento = {
  perche: r`Il freno a disco è quello che vedi dietro i raggi di una moto o di un'auto: un disco d'acciaio che gira con la ruota e una pinza che lo stringe con due pastiglie. Per dimensionarlo serve sapere quale momento frenante si ottiene con una certa forza della pinza. La pastiglia però tocca il disco su un settore esteso, e i suoi punti strisciano a velocità diverse: più veloci fuori, più lenti dentro. Le domande sono: **quanto momento frenante dà una pastiglia premuta con forza F_N, come si distribuisce la pressione, e perché la forza tangenziale totale non è semplicemente f F_N?**`,
  idea:
    r`Ogni pezzettino di pastiglia spinge sul disco perpendicolarmente e lo gratta lungo la direzione del moto, cioè lungo la circonferenza. La forza di grattamento, per Coulomb, è f volte quella di spinta, e il suo braccio rispetto all'asse è la distanza r dal centro. Il momento frenante è la somma di tutti questi f p dA r. Per calcolarlo serve la pressione.` +
    '\n\n' +
    r`Per la pressione ci sono due ipotesi. Disco nuovo: tocca dappertutto allo stesso modo, pressione uniforme. Disco rodato: entra in gioco Reye. La pinza fa traslare la pastiglia, quindi la pastiglia si consuma uguale ovunque; ma fuori si striscia più veloce, quindi a parità di consumo fuori si preme meno: pressione che cala come 1/r. Con questa pressione il momento viene bellissimo: f per la forza normale per il raggio medio. Infine una sorpresa: le forze d'attrito puntano in direzioni diverse lungo il settore, e la loro somma vettoriale è più piccola di f F_N; per una corona completa è zero, ma il momento no: è una coppia pura.`,
  richiami: [
    { titolo: 'Coordinate polari', testo: r`Un punto del piano si individua con la distanza r dal centro e l'angolo θ. Un'areola delimitata da r, r + dr, θ e θ + dθ è quasi un rettangolino di lati dr e $r\,d\theta$, quindi $dA = r\,dr\,d\theta$. I versori $\underline e_r$ (radiale) ed $\underline e_\theta$ (tangente) ruotano con il punto.` },
    { titolo: 'Momento di una forza', testo: r`Il momento di una forza rispetto a un punto O è $(P-O)\wedge\underline F$. Se la forza è tangente a una circonferenza di raggio r centrata in O, il momento ha modulo $r|\underline F|$ ed è diretto lungo l'asse. Momenti tutti diretti lungo lo stesso asse si sommano come numeri.` },
    { titolo: 'Ipotesi di Reye nel disco', testo: r`Il consumo è proporzionale a pressione per velocità di strisciamento. Nel disco la velocità è ωr. Se la pastiglia trasla, il consumo è uguale ovunque, quindi $r\,p$ è costante e $p = K''/r$: pressione alta all'interno, bassa all'esterno.` },
    { titolo: 'Differenza di quadrati', testo: r`$r_e^2 - r_i^2 = (r_e - r_i)(r_e + r_i)$. Serve a riconoscere, dentro il momento, la forza normale $K''\alpha(r_e - r_i)$ moltiplicata per un raggio medio $(r_e + r_i)/2$.` },
  ],
  ipotesiPerche: [
    r`Il settore fra $r_i$ e $r_e$ con apertura α è la forma della pastiglia: fissa gli estremi degli integrali. La pinza flottante con due pastiglie spinge da entrambi i lati, così il disco non si piega e le superfici d'attrito sono due.`,
    r`La pastiglia scorre in una guida (coppia prismatica): trasla senza ruotare, tutti i suoi punti si avvicinano al disco alla stessa velocità, quindi il consumo è uguale ovunque. È il dato cinematico che serve a Reye.`,
    r`Con consumo uniforme e velocità ωr, Reye impone $r\,p$ costante: pressione iperbolica. Coulomb dà l'attrito locale $f\,p\,dA$, da cui il momento elementare.`,
    r`Il disco nuovo non ha ancora un consumo a regime: è ragionevole che tocchi dappertutto con la stessa pressione. Confrontare le due ipotesi mostra quale stima è più prudente.`,
  ],
  disegnoGuida: r`Fai due viste. Nella vista frontale disegna il disco con centro O e una freccia curva per ω. Traccia l'asse x come bisettrice e disegna la pastiglia come un settore di corona circolare fra $r_i$ e $r_e$, con apertura α simmetrica rispetto a x. Prendi un punto P a raggio r e angolo θ, disegna l'areola dA = r dr dθ e i versori e_r ed e_θ. Disegna in P la velocità V_P lungo e_θ e, opposta, la forza d'attrito dF_T della pastiglia sul disco. Nella vista laterale disegna il disco come una linea verticale, l'asse di rotazione z, la pastiglia premuta dalla pressione di comando uniforme e, sul lato del disco, la pressione di contatto più alta verso il raggio interno. Aggiungi la pinza con le due pastiglie opposte.`,
  mappa: [
    'Scrivo velocità, forza normale, attrito e momento di un pezzettino di pastiglia.',
    'Trovo la pressione: disco nuovo (uniforme) oppure rodato (Reye, K″/r).',
    'Integro: forza normale e momento frenante.',
    'Leggo il risultato: raggio medio e confronto fra le due ipotesi.',
    'Guardo la risultante tangenziale: non è f F_N, e per la corona completa è zero.',
  ],
  dims: {
    d047: {
      introduzione: r`Partiamo dal caso più semplice da integrare: il disco nuovo, con pressione uguale ovunque. Scriviamo l'areola in coordinate polari, integriamo la pressione per avere la forza e la pressione per il braccio per avere il momento. Poi eliminiamo la pressione per esprimere il momento in funzione della forza della pinza, e vediamo perché questa ipotesi non dura.`,
      riepilogo: r`Con pressione uniforme la forza normale è $p_0$ per l'area del settore e il momento ha un cubo, perché il braccio r si aggiunge alla r dell'area. Eliminando $p_0$ il momento è $fF_N$ per un raggio equivalente $\tfrac{2}{3}(r_e^3 - r_i^3)/(r_e^2 - r_i^2)$. Ma con pressione uniforme Reye dice che fuori si consuma di più, quindi la distribuzione cambia e va verso $K''/r$: la pressione uniforme vale solo all'inizio.`,
    },
    d048: {
      introduzione: r`Ora il caso a regime, quello della dispensa. Scriviamo forza e momento elementari come vettori, ricaviamo la pressione con Reye (consumo uniforme, quindi $K''/r$) e integriamo. Il risultato finale sarà una delle formule più eleganti del capitolo: momento uguale a f per forza normale per raggio medio.`,
      riepilogo: r`La pastiglia spinge il disco lungo l'asse e lo gratta contro il moto; ogni momento elementare è diretto contro ω e i momenti si sommano senza cancellarsi. Reye con accostamento traslatorio dà $p = K''/r$. Integrando, nella forza la r della pressione si semplifica con quella dell'area: $F_N = K''\alpha(r_e - r_i)$. Nel momento resta una r, e con la differenza di quadrati si riconosce $M_f = fF_Nr_m$. Con la pinza flottante le superfici sono due e il momento raddoppia.`,
    },
    d049: {
      introduzione: r`Abbiamo due momenti, uno per ipotesi. Per confrontarli definiamo un «raggio equivalente», il braccio a cui andrebbe concentrata tutta la forza d'attrito. Poi affrontiamo la domanda della dispensa: la risultante delle forze tangenziali vale f F_N? Scopriremo di no, e capiremo che il raggio equivalente e il braccio della risultante tangenziale sono due cose diverse.`,
      riepilogo: r`Il raggio equivalente è momento diviso f F_N: con usura uniforme è il raggio medio aritmetico, con pressione uniforme è un po' più grande, quindi il calcolo a usura uniforme è quello prudente. La risultante tangenziale invece è più piccola di f F_N, del fattore $\sin(\alpha/2)/(\alpha/2)$, perché le forze girano lungo il settore. Il suo braccio è quindi maggiore di $r_m$. Per un settore puntiforme tutto coincide; per la corona completa la risultante è zero ma il momento no: coppia pura.`,
    },
  },
  passi: {
    'd047.1': {
      tappa: 1,
      prima: r`Che pressione ci aspettiamo su una pastiglia appena montata? Non ha ancora subito usura: le superfici sono piane e combaciano. La dispensa, parlando della figura 5-62 a, dice che in queste condizioni l'ipotesi più ragionevole è la più semplice possibile.`,
      dopo: r`Pressione uguale in ogni punto, $p_0$. È l'ipotesi alternativa a Reye: vale per il disco nuovo. La useremo per vedere quanto cambia il risultato rispetto all'usura stabilizzata.`,
    },
    'd047.2': {
      tappa: 0,
      prima: r`Prepariamo gli ingredienti del pezzettino di pastiglia. L'area in coordinate polari è $r\,dr\,d\theta$. La forza normale è pressione per area. La forza d'attrito è f volte la normale, tangente alla circonferenza; rispetto all'asse del disco il suo braccio è la distanza r. Scrivi il momento elementare.`,
      dopo: r`Il momento elementare è $r\,f\,p_0\,dA$: braccio per forza d'attrito. Nota che, rispetto alla forza normale, il momento ha una r in più: da questa r nasceranno i cubi.`,
    },
    'd047.3': {
      tappa: 2,
      prima: r`Integriamo la pressione costante su tutto il settore. Siccome $p_0$ è costante esce dall'integrale. Restano due integrali separati: θ da −α/2 a α/2 dà α, e r da $r_i$ a $r_e$ dell'integrando r dà una differenza di quadrati diviso 2.`,
      dopo: r`La forza normale è $p_0$ per l'area del settore, $\alpha(r_e^2 - r_i^2)/2$. Controllo: con α = 2π l'area è $\pi(r_e^2 - r_i^2)$, l'area di una corona, come si impara alle medie.`,
    },
    'd047.4': {
      tappa: 2,
      prima: r`Ora il momento: integriamo $f\,p_0\,r$ per $dA = r\,dr\,d\theta$. Le due r si moltiplicano e danno $r^2$. Integrando $r^2$ fra i raggi si ottiene una differenza di cubi diviso 3; θ dà ancora α.`,
      dopo: r`Il momento è $f p_0\alpha(r_e^3 - r_i^3)/3$. Il cubo dice che le zone esterne contano moltissimo: lì l'area è più grande e il braccio è più lungo. Con pressione uniforme il bordo esterno lavora più di tutto il resto.`,
    },
    'd047.5': {
      tappa: 2,
      prima: r`Caso della corona completa, come in una frizione o in un disco con pastiglia anulare che tocca tutto il giro. Che cosa cambia nei conti? Solo l'integrale in θ, che ora va su tutto l'angolo giro: basta mettere α = 2π nella formula appena trovata.`,
      dopo: r`Il momento è $\tfrac{2\pi f p_0}{3}(r_e^3 - r_i^3)$: è la formula che si trova di solito nei manuali per la pressione uniforme. Ricorda che vale per una superficie appena montata.`,
    },
    'd047.6': {
      tappa: 3,
      prima: r`Nella pratica si conosce la forza della pinza, non la pressione. Allora dalla forza normale ricava $p_0$ (forza diviso area del settore) e sostituiscilo nel momento. Guarda che cosa si semplifica: α, $p_0$, un fattore numerico.`,
      dopo: r`Il momento è $fF_N$ per un raggio equivalente, $\tfrac{2}{3}(r_e^3 - r_i^3)/(r_e^2 - r_i^2)$: rapporto fra un cubo e un quadrato, che ha le dimensioni di una lunghezza. Controllo: se $r_i$ si avvicina a $r_e$ il raggio equivalente tende proprio a $r_e$.`,
    },
    'd047.7': {
      tappa: 1,
      prima: r`Questa pressione uniforme è stabile? Chiedilo a Reye: il consumo è $k f\omega$ per r per p. Se p è la stessa ovunque, come varia il consumo con r? E se fuori si consuma di più, che cosa succede col tempo allo spessore e alla pressione fuori?`,
      dopo: r`Il consumo cresce con r: fuori la pastiglia si assottiglia di più (figura 5-62 c), lì preme meno, e la pressione si ridistribuisce verso $K''/r$. Quindi la pressione uniforme vale solo all'inizio. Con $r_e = 2r_i$, fuori ci si consuma il doppio.`,
    },
    'd048.1': {
      tappa: 0,
      prima: r`Scriviamo i tre vettori del pezzettino. La velocità del punto del disco: ruota con ω, quindi $\omega r$ lungo $\underline e_\theta$. La forza normale della pastiglia sul disco: lungo l'asse, verso il disco, cioè $-\hat k$. L'attrito della pastiglia sul disco: f volte la normale, opposto alla velocità del disco.`,
      dopo: r`La normale è $-p\,dA\,\hat k$ («entrante» nel disco) e l'attrito è $-f\,p\,dA\,\underline e_\theta$: il meno dice che si oppone al moto. L'apice (P,D) ricorda che sono le azioni della pastiglia sul disco.`,
    },
    'd048.2': {
      tappa: 0,
      prima: r`Il momento elementare rispetto a O è il prodotto vettoriale fra il raggio $r\,\underline e_r$ e la forza d'attrito. Ricorda che $\underline e_r\wedge\underline e_\theta = \hat k$. Quale direzione ha il risultato, e ha sempre la stessa direzione per tutti i pezzettini?`,
      dopo: r`Il momento elementare è $-f\,p\,dA\,r\,\hat k$: diretto lungo $-\hat k$, opposto a ω, per **tutti** i pezzettini. Quindi i momenti si sommano senza cancellazioni. La frase battuta di p. 126 dice «versore k», ma la formula di p. 116 ha il segno giusto (NF-143).`,
    },
    'd048.3': {
      tappa: 1,
      prima: r`Per integrare ci serve p. La pastiglia, nella pinza, scorre in una guida e trasla perpendicolarmente al disco: che consumo dà una traslazione? E Reye, con velocità ωr, che legame impone fra consumo, r e p?`,
      dopo: r`Traslazione significa consumo uniforme; Reye dice che il consumo è $k'r\,p$; quindi $r\,p$ è costante e $p = K''/r$. È esattamente il risultato di d041. La pressione è alta al raggio interno e cala verso l'esterno.`,
    },
    'd048.4': {
      tappa: 2,
      prima: r`Forza normale totale. Le forze normali sono tutte lungo l'asse, parallele: basta sommare i moduli. Integra $K''/r$ per $r\,dr\,d\theta$ e guarda che cosa succede alle due r.`,
      dopo: r`Le due r si semplificano e la forza è $K''\alpha(r_e - r_i)$. Questa forza è proprio quella che la pinza deve esercitare: è equilibrata dalla forza di azionamento. Controllo: dipende solo dalla larghezza radiale, perché la pressione più bassa fuori compensa l'area maggiore.`,
    },
    'd048.5': {
      tappa: 2,
      prima: r`Momento frenante. L'integrando è $f$ per $K''/r$ per il braccio r per l'area $r\,dr\,d\theta$. Conta le r: una al denominatore, due al numeratore. Che potenza di r resta da integrare?`,
      dopo: r`Resta una sola r, che integrata dà $(r_e^2 - r_i^2)/2$. Il momento è $fK''\alpha(r_e^2 - r_i^2)/2$. Rispetto al disco nuovo non c'è più il cubo: con pressione iperbolica le zone esterne pesano meno.`,
    },
    'd048.6': {
      tappa: 3,
      prima: r`Ora vogliamo il momento in funzione della forza normale. Guarda $r_e^2 - r_i^2$: è una differenza di quadrati. Scomponila e cerca dentro il momento l'espressione della forza normale che abbiamo appena trovato. Che cosa avanza?`,
      dopo: r`Avanza $(r_e + r_i)/2$, il raggio medio: $M_f = fF_Nr_m$. A parole: il momento è come se tutta la forza d'attrito $fF_N$ fosse concentrata a metà fra raggio interno ed esterno. Formula lineare: raddoppi la forza della pinza, raddoppi il momento, senza effetti autoenergizzanti.`,
    },
    'd048.7': {
      tappa: 3,
      prima: r`Nella pinza reale le pastiglie sono due, una per lato. Perché? Pensa a che cosa succederebbe al disco spinto da un lato solo. E se ci sono due superfici d'attrito, ognuna con lo stesso momento, che cosa succede al momento totale?`,
      dopo: r`La pinza flottante si auto-centra e spinge con due forze uguali e opposte, così il disco non si piega. Le superfici d'attrito sono due e il momento raddoppia: $2fF_Nr_m$. Con F_N = 5000 N, f = 0,4 e $r_m$ = 0,1 m si ottengono 400 N·m.`,
    },
    'd049.1': {
      tappa: 3,
      prima: r`Vogliamo confrontare le due ipotesi con un solo numero. Idea: se tutta la forza d'attrito disponibile, f F_N (somma dei moduli), fosse concentrata a un certo raggio, quale raggio darebbe lo stesso momento? Basta dividere il momento per f F_N.`,
      dopo: r`$R_m = M_f/(fF_N)$ è il raggio equivalente. Attenzione: si divide per f F_N, **non** per il modulo della risultante tangenziale; vedremo fra poco che le due cose sono diverse. È un braccio «medio» delle forze d'attrito.`,
    },
    'd049.2': {
      tappa: 3,
      prima: r`Caso usura uniforme, quello della dispensa. Il momento l'abbiamo già trovato in d048: è f per la forza normale per il raggio medio. Applica la definizione appena data: prendi $M_f = fF_Nr_m$ e dividi per $fF_N$. Che cosa resta?`,
      dopo: r`$R_m$ è il raggio medio aritmetico $(r_e + r_i)/2$. È la (5.84) del libro per la frizione. Controllo: con $r_i$ = 0,06 m e $r_e$ = 0,12 m viene 0,09 m, a metà fra i due.`,
    },
    'd049.3': {
      tappa: 3,
      prima: r`Caso pressione uniforme, il disco nuovo di d047. Lì, eliminando $p_0$, il momento era $fF_N$ moltiplicato per il rapporto fra una differenza di cubi e una differenza di quadrati. Dividi per $fF_N$ e leggi che cosa resta.`,
      dopo: r`$R_m$ è $\tfrac{2}{3}(r_e^3 - r_i^3)/(r_e^2 - r_i^2)$. Con gli stessi raggi di prima (0,06 e 0,12 m) vale circa 0,093 m: poco più del raggio medio. La differenza è piccola, ma ha sempre lo stesso segno.`,
    },
    'd049.4': {
      tappa: 3,
      prima: r`Quale dei due raggi è più grande? Sottrai il raggio medio dal raggio della pressione uniforme e porta a denominatore comune $6(r_e + r_i)$. Dovresti riconoscere un quadrato perfetto al numeratore.`,
      dopo: r`La differenza è $(r_e - r_i)^2/[6(r_e + r_i)]$, sempre positiva: il disco nuovo frena un po' di più, perché con pressione uniforme le forze sono spostate verso fuori. Quindi nel progetto si usa l'usura uniforme: dà il momento più piccolo, la stima prudente.`,
    },
    'd049.5': {
      tappa: 4,
      prima: r`La domanda della dispensa: la risultante delle forze tangenziali vale f F_N? Le forze d'attrito sono tutte lungo $\underline e_\theta$, che cambia direzione lungo il settore, come le stecche di un ventaglio. Scomponi $\underline e_\theta$ in $\underline i$ e $\underline j$: quale componente si cancella per simmetria? Poi moltiplica e dividi per α per far comparire $F_N$.`,
      dopo: r`Si salva solo la componente perpendicolare alla bisettrice, e la risultante vale $fF_N\sin(\alpha/2)/(\alpha/2)$, più piccola di $fF_N$. La dispensa: «quindi no!». Le forze d'attrito non sono parallele e in parte si compensano. Con α = 90° il fattore vale 0,90.`,
    },
    'd049.6': {
      tappa: 4,
      prima: r`Se volessimo scrivere il momento come risultante tangenziale per un braccio, quale braccio servirebbe? Dividi il momento $fF_Nr_m$ per il modulo della risultante appena trovato.`,
      dopo: r`Il braccio è $b_t = r_m(\alpha/2)/\sin(\alpha/2)$, più grande del raggio medio: la risultante è più piccola, quindi per dare lo stesso momento deve passare più lontano dal centro. $R_m$ e $b_t$ sono due cose diverse: uno si riferisce alla somma dei moduli, l'altro alla somma dei vettori.`,
    },
    'd049.7': {
      tappa: 4,
      prima: r`Guardiamo i due casi estremi. Settore piccolissimo, α che tende a zero: quanto valgono il fattore $\sin(\alpha/2)/(\alpha/2)$ e $b_t$? Corona completa, α = 2π: quanto vale $\sin\pi$? Pensa anche al disegno: ogni forza d'attrito ha la sua «gemella» dalla parte opposta del disco.`,
      dopo: r`Con α che tende a zero si ritrova la forza concentrata, $fF_N$ con braccio $r_m$. Con α = 2π la risultante è zero, ma il momento no: le forze opposte si cancellano come vettori ma i loro momenti si sommano. È una **coppia pura**, che non dipende dal polo: la frizione piana.`,
    },
  },
  racconto: r`All'orale dici che il freno a disco è una pastiglia a settore premuta da una pinza su un disco che ruota. La pinza fa traslare la pastiglia, quindi il consumo è uniforme; la velocità di strisciamento è ωr; per Reye $p = K''/r$, massima al raggio interno. Integrando in coordinate polari: $F_N = K''\alpha(r_e - r_i)$ e $M_f = fF_Nr_m$ con il raggio medio aritmetico; con la pinza flottante si raddoppia. Se ti chiedono il disco nuovo, con pressione uniforme il raggio equivalente è il rapporto cubico, un po' più grande, quindi l'usura uniforme è la stima prudente. Chiudi con la sorpresa: $|F_T| = fF_N\sin(\alpha/2)/(\alpha/2)$, e per la corona completa è zero: coppia pura.`,
};
