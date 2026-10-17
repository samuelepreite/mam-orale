/** Lezioni discorsive del capitolo C4 (docs/BRIEF_LEZIONI.md): argomento → testo della lezione. */
import type { LezioneArgomento } from '../types';

const frenoNastro: LezioneArgomento = {
  perche:
    'Pensa a un tamburo che gira, per esempio quello di un argano che fa scendere un carico. Vuoi fermarlo, ma con la mano non ce la faresti mai. Il freno a nastro risolve il problema con un trucco semplice: avvolgi attorno al tamburo una fascia ruvida e la tiri con una leva. Con una forza piccola sulla leva ottieni una coppia frenante grande. La domanda che guida la lezione è proprio questa: **quanta coppia frenante ottengo con una certa forza sulla leva, e perché il freno funziona molto meglio in un verso di rotazione che nell\'altro?**',
  idea:
    'L\'idea è la stessa della corda avvolta attorno a un palo, quella che i marinai usano per tenere una nave con poca forza. Se avvolgi una corda attorno a un palo e tiri un capo, l\'altro capo può reggere una forza molto più grande: l\'attrito, lungo tutto il tratto avvolto, «aiuta» il capo debole. Ogni pezzettino di corda a contatto aggiunge un po\' di attrito, e questo attrito è proporzionale a quanto la corda è tirata in quel punto. Per questo la tensione non cresce in modo lineare ma **esponenziale** con l\'angolo avvolto.\n\nNel freno il palo è il tamburo che gira e la corda è il nastro, fermo. Il tamburo striscia sotto il nastro e, con l\'attrito, cerca di trascinarlo con sé. I due capi del nastro, quindi, non sono tirati allo stesso modo: uno è molto teso, l\'altro poco. La differenza fra le due tensioni, moltiplicata per il raggio, è proprio la coppia che frena il tamburo. Il resto della lezione serve a mettere numeri su questa idea e a capire quale capo conviene collegare alla leva.',
  richiami: [
    { titolo: 'Attrito radente (Coulomb)', testo: 'Quando due superfici strisciano una sull\'altra nasce una forza tangenziale che si oppone allo strisciamento. Il suo valore è $f$ volte la forza normale che le preme insieme: $F_T = f\\,F_N$. Più le premi, più attrito c\'è; $f$ dipende dai materiali.' },
    { titolo: 'Equilibrio alla rotazione', testo: 'Un corpo che non accelera ruotando ha somma dei momenti nulla rispetto a qualsiasi punto. Il momento di una forza è forza per braccio, dove il braccio è la distanza fra il punto e la retta su cui agisce la forza. Una forza che passa per il punto scelto ha braccio zero e non compare nell\'equazione: per questo conviene scegliere il punto furbo.' },
    { titolo: 'La formula di Eulero per i flessibili', testo: 'Per una fune avvolta su una superficie cilindrica per un angolo $\\beta$, con strisciamento su tutto il tratto avvolto, il rapporto fra la tensione del capo teso e quella del capo lasco vale $e^{f\\beta}$. Viene dall\'equilibrio di un pezzettino di fune: la normale su quel pezzetto è proporzionale alla tensione, l\'attrito pure, quindi la tensione cresce in proporzione a se stessa, cioè in modo esponenziale. La ricavi per bene nell\'argomento «Equazione di Eulero».' },
  ],
  ipotesiPerche: [
    'Mettiamo in fila gli oggetti del problema e diamo un nome a ciascuno: senza questo non si può scrivere nessun equilibrio.',
    'Nella cinghia di trasmissione la cinghia si muove e ogni pezzetto subisce la forza centrifuga. Qui il nastro è fermo: la centrifuga sparisce e la formula di Eulero si semplifica.',
    'Nella trasmissione a cinghia una parte dell\'arco è in aderenza; nel freno invece il tamburo striscia sotto tutto il nastro, quindi possiamo usare tutto l\'angolo avvolto β. È il caso più favorevole: il rapporto delle tensioni è il massimo possibile.',
    'Servono per poter scrivere $F_T = f F_N$ con un solo $f$ e per poter trattare leva e nastro come corpi in equilibrio senza forze d\'inerzia.',
  ],
  disegnoGuida:
    'Comincia dal tamburo: un cerchio con il centro O e il raggio R. Segna subito il verso di rotazione ω con una freccia curva, perché è lui che decide quale capo sarà teso. Poi avvolgi il nastro sulla parte alta del tamburo e segna l\'angolo avvolto β: è il dato che finirà nell\'esponente. Fai scendere i due capi: quello di sinistra va al fulcro della leva (una cerniera fissa), quello di destra si attacca alla leva un po\' più in là. Disegna la leva orizzontale, il fulcro con il simbolo del telaio, e la forza F all\'estremo. Infine le quote: c è il braccio del capo collegato alla leva rispetto al fulcro, a quello della forza F. Scrivi T₁ sul capo al fulcro e T₂ su quello alla leva.',
  mappa: [
    'Guardo il tamburo: la coppia frenante è la differenza delle tensioni per il raggio.',
    'Uso Eulero per legare le due tensioni fra loro.',
    'Guardo la leva: la forza F fissa la tensione del capo collegato.',
    'Metto insieme e confronto i due versi di rotazione.',
  ],
  dims: {
    d071: {
      introduzione:
        'Abbiamo tre incognite: le due tensioni e la coppia frenante. Ci servono quindi tre equazioni, e ognuna viene da un pezzo diverso del freno: il tamburo (equilibrio alla rotazione), il nastro (Eulero) e la leva (equilibrio alla rotazione attorno al fulcro). La strategia è scrivere le tre equazioni una alla volta e poi sostituire, fino ad avere la coppia in funzione della sola forza F.',
      riepilogo:
        'Siamo partiti dal tamburo e abbiamo visto che la coppia frenante è la differenza delle tensioni per il raggio. Eulero ci ha detto che il capo teso è $e^{f\\beta}$ volte il capo lasco. La leva fissa la tensione del capo che le è collegato, $F a/c$. Mettendo insieme, la coppia cresce linearmente con F ed esponenzialmente con $f\\beta$. Infine, invertendo il verso, il capo sulla leva diventa quello teso e la stessa F frena $e^{f\\beta}$ volte di meno: ecco la direzione preferenziale.',
    },
  },
  passi: {
    'd071.1': {
      tappa: 0,
      prima: 'Cominciamo dal tamburo, che è l\'oggetto da frenare. Chiediti: quali forze del nastro hanno un momento rispetto al centro O? Il nastro tocca il tamburo lungo tutto l\'arco, ma possiamo vedere nastro e tamburo come un unico blocco e guardare solo le due forze che arrivano dall\'esterno: le tensioni dei due capi. Ciascuna è tangente al tamburo, quindi il suo braccio rispetto a O è esattamente il raggio R.',
      dopo: 'La riga dice che la coppia che frena il tamburo è la differenza fra le due tensioni, moltiplicata per il raggio. Controllo di buon senso: se i due capi fossero tirati allo stesso modo ($T_1 = T_2$) non ci sarebbe nessuna coppia, come quando una corda è appoggiata su un palo e tirata uguale da entrambe le parti. La frenata nasce proprio dalla differenza.',
    },
    'd071.2': {
      tappa: 1,
      prima: 'Ora ci serve un legame fra $T_1$ e $T_2$. È esattamente il caso della corda sul palo: nastro avvolto per un angolo β, strisciamento su tutto l\'arco, nastro fermo (quindi nessun termine centrifugo). Quale formula conosci che lega le tensioni dei due capi in questa situazione? Pensa a come cresce la tensione lungo l\'arco.',
      dopo: 'Il capo teso è $e^{f\\beta}$ volte il capo lasco. Con valori tipici, $f = 0{,}3$ e un giro quasi completo, $e^{f\\beta}$ vale circa 6: un capo tira sei volte l\'altro. Quale capo è teso? Quello che **trattiene** il nastro contro il trascinamento del tamburo. Con ω oraria la parte alta del tamburo va verso destra e trascina il nastro verso destra; a trattenerlo è il capo di sinistra, quello al fulcro. Se f fosse zero il rapporto sarebbe 1: niente attrito, nessuna differenza, nessuna frenata.',
    },
    'd071.3': {
      tappa: 1,
      prima: 'Abbiamo due equazioni: la coppia in funzione delle due tensioni e il rapporto fra le tensioni. Conviene eliminare $T_1$ e scrivere tutto in funzione di $T_2$, perché tra poco scopriremo che è proprio $T_2$ quella che la leva controlla. Sostituisci dunque $T_1 = T_2 e^{f\\beta}$ nella prima riga e raccogli $T_2$.',
      dopo: 'La coppia è il capo lasco moltiplicato per $(e^{f\\beta} - 1)$ e per il raggio. Il fattore $(e^{f\\beta}-1)$ è l\'«amplificazione» dell\'attrito: con $e^{f\\beta}\\approx 6$ la coppia vale cinque volte $T_2 R$. Il «−1» ricorda che la coppia nasce dalla differenza fra i capi.',
    },
    'd071.4': {
      tappa: 2,
      prima: 'Resta da capire quanto vale $T_2$, e qui entra la leva. Guardala come un corpo in equilibrio e scegli il fulcro come polo dei momenti: così la reazione del fulcro sparisce. Quali forze restano? Il capo $T_1$ passa per il fulcro e quindi non dà momento. Restano il capo $T_2$, con braccio c, e la forza F, con braccio a. I due momenti devono bilanciarsi.',
      dopo: 'La leva moltiplica la forza: siccome a è più grande di c, la tensione $T_2$ è più grande di F di un fattore $a/c$. È la stessa leva di quando apri una porta spingendo lontano dai cardini. Controllo: se attaccassi il nastro più vicino al fulcro (c più piccolo), con la stessa F otterresti una tensione maggiore.',
    },
    'd071.5': {
      tappa: 3,
      prima: 'Ora abbiamo tutti i pezzi: la coppia scritta in funzione di $T_2$ e $T_2$ scritta in funzione della forza F. Basta sostituire $T_2 = F a/c$ nell\'espressione della coppia, e così la coppia frenante dipende solo da ciò che decidiamo noi: la forza e la geometria.',
      dopo: 'Questo è il risultato principale. La coppia frenante cresce in proporzione alla forza F, alla leva $a/c$ e al raggio R, e cresce in modo esponenziale con $f\\beta$: avvolgere un po\' di più il nastro conta moltissimo. Ecco perché con poca forza si frena tanto.',
    },
    'd071.6': {
      tappa: 3,
      prima: 'Cosa cambia se il tamburo gira al contrario? L\'attrito trascina ora il nastro nell\'altro verso, quindi a trattenerlo è l\'altro capo: il capo teso diventa quello collegato alla leva. La leva quindi fissa adesso la tensione maggiore, $T_1 = F a/c$, e il capo lasco si ricava dividendo per $e^{f\\beta}$. Attenzione al verso della divisione: il lasco è più piccolo del teso.',
      dopo: 'Con la stessa F la coppia è molto più piccola: invece di $(e^{f\\beta}-1)$ compare $(1-e^{-f\\beta})$, che è sempre minore di 1. La dispensa a p. 153 qui sbaglia e scrive $T_2 = T_1 e^{f\\beta}$, che darebbe un lasco più grande del teso e una coppia negativa: un risultato assurdo, che ti accorgi subito essere sbagliato proprio con questo controllo di buon senso.',
    },
    'd071.7': {
      tappa: 3,
      prima: 'Per capire quanto conta il verso, facciamo il rapporto fra le due coppie a parità di forza F. Scrivi le due espressioni una sopra l\'altra e semplifica: $F a R / c$ si cancella e resta solo il rapporto fra i due fattori esponenziali.',
      dopo: 'Il freno è $e^{f\\beta}$ volte più efficace in un verso che nell\'altro: con i valori di prima, circa sei volte. La regola pratica è quindi: **il capo collegato alla leva deve essere quello lasco** nel verso in cui serve frenare. È la «direzione preferenziale» di cui parla la dispensa.',
    },
  },
  racconto:
    'All\'orale parti dall\'idea: il nastro avvolto sul tamburo funziona come una corda su un palo, l\'attrito rende i due capi diversi e la loro differenza per il raggio è la coppia frenante. Dici subito le due semplificazioni rispetto alla cinghia (nastro fermo, quindi niente centrifuga; strisciamento su tutto l\'arco, quindi θ* = β). Poi fai il disegno con il verso di rotazione, scrivi le tre equazioni (tamburo, Eulero, leva), arrivi a $C_f = \\frac{aR}{c}F(e^{f\\beta}-1)$ e chiudi con la direzione preferenziale: invertendo il verso la coppia cala di $e^{f\\beta}$ volte, quindi il capo sulla leva deve essere il lasco.',
};

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c4-freno-nastro': frenoNastro,
};
