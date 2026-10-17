/** Lezioni discorsive del capitolo C7, parte b (docs/BRIEF_LEZIONI.md): forzate, eccentrica, vincolo, trasmissibilità. */
import type { LezioneArgomento } from '../types';

const r = String.raw;

// ------------------------------------------------------------------ c7-forzate
const forzate: LezioneArgomento = {
  perche: r`Pensa a una lavatrice che parte: a un certo numero di giri tutta la macchina trema e cammina sul pavimento, poi, salendo ancora di velocità, si calma. Oppure a un ponte su cui marcia un gruppo di persone al passo. In tutti questi casi c'è un sistema elastico (molla, massa, un po' di attrito) spinto da una forza che si ripete nel tempo. La domanda della lezione è: **se spingo una massa su una molla con una forza che oscilla, quanto si muove la massa, con quale ritardo, e perché a certe frequenze il movimento diventa enorme?** La risposta ti dà gli strumenti per progettare (o evitare) la risonanza.`,
  idea: r`Prendi una massa appesa a un elastico e muovi la mano su e giù. Se muovi la mano molto piano, la massa ti segue docile: si sposta quanto si sposterebbe se tu la tirassi con calma. Se muovi la mano velocissima, la massa quasi non si muove: non fa in tempo, la sua inerzia vince. In mezzo c'è una frequenza speciale, quella a cui la massa oscillerebbe da sola: lì ogni tua spinta arriva nel momento giusto, si somma alla precedente e la massa oscilla tantissimo. Questa è la **risonanza**.

C'è un secondo fatto, meno ovvio: a regime la massa oscilla sempre alla frequenza della tua mano, non alla sua. La sua frequenza naturale decide solo due cose: **quanto** si muove (l'amplificazione) e **con quanto ritardo** ti segue (la fase). Lo smorzamento, cioè l'attrito viscoso, è ciò che impedisce all'ampiezza di diventare infinita in risonanza. Tutta la lezione mette numeri su queste tre zone: sotto, dentro e sopra la risonanza.`,
  richiami: [
    { titolo: 'Equilibrio dinamico (D’Alembert)', testo: r`Invece di scrivere «massa per accelerazione uguale somma delle forze», aggiungi la forza d'inerzia $F_{in} = -m\ddot x$ e imponi che la somma di tutte le forze sia zero. Conviene disegnare ogni forza nel verso positivo dell'asse: il segno giusto lo mette la formula (molla $-Kx$, smorzatore $-c\dot x$).` },
    { titolo: 'Oscillatore libero smorzato', testo: r`Senza forza esterna la massa, spostata e lasciata, oscilla con pulsazione vicina a $\omega_m = \sqrt{K/m}$ e un'ampiezza che si spegne in modo esponenziale. Lo smorzamento si misura con il numero puro $\xi = c/(2m\omega_m)$, cioè $c$ diviso il valore critico: con $\xi$ piccolo si spegne lentamente, con $\xi$ grande in fretta.` },
    { titolo: 'Seno e coseno sfasati', testo: r`Un'oscillazione $X_0\sin(\omega t - \varphi)$ è un seno di ampiezza $X_0$ che arriva in ritardo di un angolo $\varphi$. Derivare un seno lo anticipa di un quarto di periodo (diventa coseno). Due oscillazioni sfasate di 90° si sommano come i due cateti di un triangolo rettangolo: l'ampiezza totale è la radice della somma dei quadrati.` },
    { titolo: 'Numeri complessi: modulo e argomento', testo: r`Un numero $a + ib$ è un punto del piano: il modulo $\sqrt{a^2 + b^2}$ è la sua distanza dall'origine, l'argomento $\operatorname{arctg}(b/a)$ è l'angolo. Dividendo due numeri complessi, i moduli si dividono e gli argomenti si sottraggono. Serve per leggere la rigidezza dinamica $p(i\omega)$.` },
  ],
  ipotesiPerche: [
    r`Con molla e smorzatore lineari l'equazione è lineare: la risposta a una somma di forze è la somma delle risposte, ed è questo che ci permette di studiare una forzante alla volta.`,
    r`Una forza periodica qualsiasi si scompone (serie di Fourier) in tante armoniche; studiata la risposta a una sola armonica $F_0\sin\omega t$, per la linearità sappiamo trattare tutte le altre.`,
    r`Con $\xi > 0$ il moto libero iniziale si spegne in pochi secondi; ci interessa ciò che resta dopo, la risposta permanente. Senza smorzamento il transitorio non sparirebbe mai.`,
  ],
  disegnoGuida: r`Parti da sinistra con la parete tratteggiata: è il riferimento fisso. Da lì disegna la molla K in alto e lo smorzatore c in basso, che arrivano al blocco m appoggiato su una guida: così si vede che la massa ha un solo grado di libertà, la x verso destra. Sul blocco metti la freccia della forzante $F_0\sin\omega t$ verso +x. Poi, a destra, i due grafici che servono all'orale: A in funzione di ρ (tutte le curve partono da 1, la curva ξ = 0 ha l'asintoto in ρ = 1, le altre hanno un picco sempre più basso al crescere di ξ e poi scendono verso 0) e la fase φ da 0 a π, con tutte le curve che passano per (1, π/2). I grafici sono metà della risposta: disegnali con cura.`,
  mappa: [
    'Scrivo l’equazione del moto con la forza e cerco la risposta a regime: ampiezza e ritardo.',
    'Misuro l’ampiezza in «spostamenti statici»: il fattore di amplificazione A(ξ,ρ).',
    'Cerco dove A è massimo: il picco di risonanza e quando sparisce.',
    'Guardo il ritardo φ fra forza e spostamento e chi lo comanda.',
    'Rileggo tutto come uscita su ingresso: FRF, guadagno e quality factor.',
  ],
  dims: {
    d122: {
      introduzione: r`Vogliamo l'ampiezza $X_0$ e il ritardo $\varphi$ con cui la massa risponde a regime. La strategia è quella «a mano», senza numeri complessi: scrivo l'equazione del moto, indovino la forma della risposta (un seno alla stessa ω, con due incognite $X_0$ e $\varphi$), la sostituisco e impongo che l'equazione valga in ogni istante. Ne escono due equazioni nelle due incognite.`,
      riepilogo: r`Abbiamo scritto l'equilibrio della massa con la forzante e scartato il transitorio, che lo smorzamento spegne. Abbiamo supposto una risposta alla stessa pulsazione della forza, con ampiezza e ritardo incogniti, e l'abbiamo sostituita. Imponendo che i coefficienti del seno e del coseno coincidano in ogni istante abbiamo ottenuto due equazioni: una dà il ritardo, la somma dei loro quadrati dà l'ampiezza, uguale alla forza divisa per il modulo della rigidezza dinamica.`,
    },
    d124: {
      introduzione: r`L'ampiezza $X_0$ dipende da cinque numeri ($F_0$, $m$, $c$, $K$, $\omega$): troppi per un grafico. L'idea è misurarla con un «metro» naturale, lo spostamento che la stessa forza darebbe se fosse applicata ferma, $F_0/K$. Dividendo per $K$ dentro la radice, i cinque numeri si riducono a due gruppi puri: $\rho$ e $\xi$.`,
      riepilogo: r`Abbiamo preso come unità di misura lo spostamento statico $F_0/K$ e diviso tutto per $K$. Il termine d'inerzia è diventato $\rho^2$, quello dello smorzatore $2\xi\rho$. Il rapporto fra ampiezza dinamica e statica, il fattore di amplificazione, dipende solo da ξ e ρ: vale 1 a frequenza nulla, esplode in risonanza se non c'è smorzamento e tende a zero ad alta frequenza come $1/\rho^2$.`,
    },
    d125: {
      introduzione: r`Con lo smorzamento l'ampiezza in risonanza non è più infinita, ma ha un massimo. Dove sta, quanto vale, e si può farlo sparire? La strategia è cercare il massimo di A derivando e ponendo la derivata uguale a zero, con un trucco: invece di derivare la radice, derivo il radicando, che è più semplice.`,
      riepilogo: r`Abbiamo osservato che A è massima dove il suo radicando è minimo, e abbiamo derivato il radicando. Raccogliendo $4\rho$ sono uscite due radici: $\rho = 0$ e $\rho_R = \sqrt{1 - 2\xi^2}$, un po' sotto la risonanza. Il valore del picco è $1/(2\xi\sqrt{1 - \xi^2})$. Se ξ supera circa 0,707 la radice non è più reale: il picco sparisce e A scende sempre.`,
    },
    d126: {
      introduzione: r`L'ampiezza non basta: la massa si muove anche in ritardo rispetto alla forza. Usiamo la scrittura complessa, in cui l'ampiezza complessa è forza divisa per rigidezza dinamica: l'argomento di un quoziente è la differenza degli argomenti, e da lì leggiamo il ritardo. Poi lo scriviamo con ξ e ρ e guardiamo i casi notevoli.`,
      riepilogo: r`La risposta è in ritardo sulla forza dell'angolo della rigidezza dinamica. Scritto con ξ e ρ è $\operatorname{arctg}(2\xi\rho/(1 - \rho^2))$, da prendere fra 0 e π aggiungendo π quando ρ > 1. In risonanza il ritardo è sempre π/2 qualunque sia ξ; senza smorzamento salta da 0 a π. La fase dice chi comanda: molla, smorzatore o massa.`,
    },
    d127: {
      introduzione: r`Finora abbiamo scritto «risposta per una forza data». Ora ribaltiamo il punto di vista: guardiamo il sistema come una scatola che riceve un ingresso (la forza) e restituisce un'uscita (il moto). Il rapporto uscita su ingresso, a ogni frequenza, è la funzione di risposta in frequenza: ha un modulo (il guadagno) e un argomento (il ritardo). Vediamo come si collega a quanto già trovato.`,
      riepilogo: r`Il complex gain è il reciproco della rigidezza dinamica. Il suo modulo, il guadagno, è l'ampiezza per unità di forza; moltiplicato per $K$ diventa proprio il fattore di amplificazione. Il suo argomento è $-\varphi$, un ritardo. Cambiando uscita (velocità, accelerazione) cambia la FRF di un fattore $i\omega$. In risonanza modulo e fase misurati danno $\omega_m$ e ξ: è così che si caratterizza un sistema in laboratorio.`,
    },
    d128: {
      introduzione: r`La dispensa dà il quality factor $Q = 1/(2\xi)$ senza ricavarlo. Qui scopriamo da dove viene: è il fattore di amplificazione calcolato esattamente in risonanza. Poi lo confrontiamo con il picco vero e ne diamo la lettura energetica, che è quella della definizione a parole.`,
      riepilogo: r`Valutando A in ρ = 1 si trova $1/(2\xi)$: è il quality factor. Il picco vero è un po' più alto, ma per smorzamento piccolo la differenza è trascurabile. Dal punto di vista energetico Q è $2\pi$ volte l'energia immagazzinata divisa per quella persa in un ciclo. Q alto vuol dire poco smorzamento, picco alto e oscillazioni che durano a lungo.`,
    },
  },
  passi: {
    'd122.1': {
      tappa: 0,
      prima: r`Il primo obiettivo è l'equazione del moto. Isola la massa e mettici sopra tutte le forze lungo x, disegnate nel verso positivo: la molla, che vale $-Kx$; lo smorzatore, $-c\dot x$; la forza d'inerzia, $-m\ddot x$; e la novità rispetto al caso libero, la forzante $F_0\sin\omega t$. La somma deve essere zero. Poi porta a destra il solo termine noto.`,
      dopo: r`A sinistra c'è il sistema (massa, smorzatore, molla), a destra ciò che lo eccita. È la stessa equazione delle vibrazioni libere con un secondo membro diverso da zero. Controllo: se $F_0 = 0$ ritrovi l'oscillatore libero smorzato. La dispensa scrive $-\bar F_{in}$ nella somma, ma la riga con $-m\ddot x$ è quella coerente.`,
    },
    'd122.2': {
      tappa: 0,
      prima: r`L'equazione ha un secondo membro: in matematica si chiama non omogenea. Ricorda come si risolvono: soluzione = soluzione generale dell'equazione «senza forza» più una qualsiasi soluzione particolare che tenga conto della forza. Chiediti che cosa è, fisicamente, la soluzione «senza forza»: è proprio la vibrazione libera smorzata che conosci già.`,
      dopo: r`La prima parte, $x_G$, è il moto libero che parte dalle condizioni iniziali: con $\xi > 0$ si spegne in pochi secondi. Dopo resta solo $x_p$, la risposta permanente, ed è quella che studiamo. Attenzione: qui il pedice G vuol dire «generale», non baricentro.`,
    },
    'd122.3': {
      tappa: 0,
      prima: r`Ora indoviniamo la forma di $x_p$. Fisicamente: se spingi con un ritmo regolare, a regime la massa si muove con lo stesso ritmo, ma con un'ampiezza sua e un po' in ritardo. Quindi scriviamo un seno con la stessa ω della forza, ampiezza $X_0$ e ritardo $\varphi$, entrambi da trovare. Per sostituirlo servono anche velocità e accelerazione: derivalo due volte.`,
      dopo: r`La velocità è un coseno con un fattore ω in più; l'accelerazione è di nuovo un seno, con $-\omega^2$ davanti. Leggila così: l'accelerazione è sempre opposta allo spostamento e cresce con il quadrato della frequenza. Questo segno meno è quello che, tra poco, metterà inerzia e molla una contro l'altra.`,
    },
    'd122.4': {
      tappa: 0,
      prima: r`Sostituisci le tre espressioni nell'equazione del moto. Guarda bene quali termini contengono il seno e quali il coseno: la molla porta $K X_0\sin$, l'inerzia $m$ per $-\omega^2 X_0\sin$, lo smorzatore $c\,\omega X_0\cos$. I due termini con il seno si possono raccogliere insieme. Che segno avrà il termine d'inerzia rispetto a quello della molla?`,
      dopo: r`Molla e inerzia stanno insieme davanti al seno, con segno opposto: $K - m\omega^2$. A bassa frequenza vince la molla, ad alta frequenza l'inerzia, e quando sono uguali si cancellano: è la risonanza. Lo smorzatore invece è sfasato di 90° (coseno): non può cancellarsi con gli altri due ed è l'unico che resta in risonanza.`,
    },
    'd122.5': {
      tappa: 0,
      prima: r`Abbiamo un'uguaglianza fra funzioni del tempo, ma i seni e coseni sono di $\omega t - \varphi$, mentre a destra c'è $\sin\omega t$. Sviluppa con le formule di sottrazione: $\sin(\omega t - \varphi) = \sin\omega t\cos\varphi - \cos\omega t\sin\varphi$, e analogamente il coseno. Poi ragiona così: se un'uguaglianza vale in ogni istante, i coefficienti di $\sin\omega t$ devono coincidere, e anche quelli di $\cos\omega t$.`,
      dopo: r`Due equazioni nelle due incognite $X_0$ e $\varphi$. La prima dice che la parte «in fase» della risposta bilancia la forza; la seconda che a destra non c'è coseno, quindi la parte in quadratura deve annullarsi. Controllo: con $c = 0$ la seconda dà $\sin\varphi = 0$, cioè niente ritardo (o mezzo periodo).`,
    },
    'd122.6': {
      tappa: 0,
      prima: r`Cominciamo dall'equazione più semplice, quella con zero a destra. Siccome la massa si muove davvero, $X_0 \neq 0$ e puoi dividerla via. Resta una relazione fra $\sin\varphi$ e $\cos\varphi$: porta un termine dall'altra parte e dividi per $\cos\varphi$, così compare la tangente.`,
      dopo: r`La tangente del ritardo è smorzatore diviso (molla meno inerzia). Senza smorzatore il ritardo è nullo o π; in risonanza il denominatore si annulla e il ritardo vale π/2. L'angolo va preso fra 0 e π: sopra la risonanza il denominatore è negativo, e l'arcotangente della calcolatrice darebbe un angolo negativo, sbagliato.`,
    },
    'd122.7': {
      tappa: 0,
      prima: r`Ora l'ampiezza. Ci serve un modo per far sparire φ. Ricorda che $\cos^2\varphi + \sin^2\varphi = 1$: se elevi al quadrato le due equazioni e le sommi, i doppi prodotti si cancellano e il ritardo scompare. Resta $X_0^2$ per una somma di quadrati uguale a $F_0^2$: poi estrai la radice.`,
      dopo: r`L'ampiezza è la forza divisa per il modulo della rigidezza dinamica, l'«opposizione» del sistema a una forza armonica. Controllo: per $\omega = 0$ ritrovi $F_0/K$, lo spostamento statico. Per $c = 0$ e $K = m\omega^2$ il denominatore si annulla: risonanza senza smorzamento, ampiezza infinita.`,
    },
    'd124.1': {
      tappa: 1,
      prima: r`Ci serve un'unità di misura per l'ampiezza. Immagina di applicare la stessa forza $F_0$ ma ferma, senza farla oscillare: quale formula ti dà lo spostamento della massa? In statica inerzia e smorzatore non lavorano, resta solo la molla. Equivale a porre $\omega = 0$ nella formula di $X_0$.`,
      dopo: r`È lo spostamento statico: quanto la molla cede sotto la forza ferma. Diventa il nostro metro: diremo «la massa si muove 3 volte lo spostamento statico». Controllo: è proprio $X_0$ con $\omega = 0$, perché al denominatore resta solo $K$.`,
    },
    'd124.2': {
      tappa: 1,
      prima: r`Ora dividiamo numeratore e denominatore di $X_0$ per $K$. Dentro la radice il primo termine diventa $1 - m\omega^2/K$. Chiediti a cosa è uguale $K/m$: è il quadrato della pulsazione naturale. Quindi $m/K = 1/\omega_m^2$, e il termine d'inerzia si riscrive come rapporto fra due pulsazioni.`,
      dopo: r`Il termine d'inerzia è il quadrato di ρ, il rapporto fra la pulsazione della forza e quella naturale. ρ è il protagonista della lezione: ρ < 1 vuol dire «spingo più lento di quanto la massa oscillerebbe da sola», ρ > 1 «più veloce». A ρ = 1 inerzia e molla si equivalgono.`,
    },
    'd124.3': {
      tappa: 1,
      prima: r`Stessa operazione per lo smorzatore: $c\omega/K$. Qui c'è un passaggio da fare: esprimi $c$ con lo smorzamento relativo, $c = 2\xi m\omega_m$ (cioè ξ volte il coefficiente critico). Poi usa ancora $m/K = 1/\omega_m^2$: una $\omega_m$ si semplifica e resta $\omega/\omega_m$.`,
      dopo: r`Il termine dello smorzatore diventa $2\xi\rho$: una sola potenza di ρ, perché lo smorzatore sente la velocità, che ha una sola ω. Controllo di dimensioni: entrambi i gruppi, $\rho^2$ e $2\xi\rho$, sono numeri puri, come deve essere dentro una radice che sommiamo a 1.`,
    },
    'd124.4': {
      tappa: 1,
      prima: r`Abbiamo i due pezzi; non resta che rimetterli nella formula di $X_0$ divisa per $K$. Al numeratore c'è $F_0/K$, al denominatore la radice della somma dei quadrati dei due gruppi adimensionali appena trovati. Nessun passaggio nuovo: solo sostituzione.`,
      dopo: r`Ora l'ampiezza è «spostamento statico diviso un numero che dipende solo da ξ e ρ». Il denominatore è piccolo vicino a ρ = 1 (la risposta cresce) e grande per ρ alto (la risposta cala). Controllo: con ρ = 0 vale 1 e $X_0 = F_0/K$.`,
    },
    'd124.5': {
      tappa: 1,
      prima: r`Il passo naturale è dividere l'ampiezza dinamica per quella statica: che cosa resta? Lo spostamento statico si semplifica e rimane solo la frazione con ξ e ρ. Questo rapporto ha un nome, fattore di amplificazione: dice quante volte il moto è più grande di quello che la stessa forza farebbe da ferma.`,
      dopo: r`Due soli parametri: ξ, che dipende dal sistema, e ρ, che dipende anche dalla forza. Per questo si disegna una famiglia di curve, una per ogni ξ. Attenzione a due errori della dispensa: la radice va tenuta (è un modulo) e dentro c'è $\rho^2$, non ρ.`,
    },
    'd124.6': {
      tappa: 1,
      prima: r`Leggiamo la formula nei casi estremi. Metti prima ξ = 0 (niente smorzatore): il termine $4\xi^2\rho^2$ sparisce e la radice di un quadrato è un valore assoluto. Poi chiediti quanto vale A per ρ = 0 e che cosa succede al denominatore quando ρ si avvicina a 1.`,
      dopo: r`A ρ = 0 A vale 1: condizioni statiche. A ρ = 1 il denominatore si annulla e A va all'infinito: la forza spinge esattamente al ritmo naturale e ogni spinta si somma alla precedente. È la risonanza. Infinito solo nel modello senza attrito: nella realtà l'ampiezza cresce nel tempo finché qualcosa si rompe o lo smorzamento la limita.`,
    },
    'd124.7': {
      tappa: 1,
      prima: r`E ad alta frequenza? Per ρ molto grande, dentro la radice il termine dominante è $(1 - \rho^2)^2 \approx \rho^4$, perché cresce più in fretta degli altri. Quindi la radice vale circa $\rho^2$. Per verificarlo in modo pulito moltiplica A per $\rho^2$ e guarda il limite.`,
      dopo: r`Ad alta frequenza A cala come $1/\rho^2$: raddoppiando la frequenza l'ampiezza si riduce di quattro volte. Fisicamente la massa non fa in tempo a seguire la forza: domina l'inerzia. È la mano che scuote velocissima l'elastico e la massa che quasi non si muove.`,
    },
    'd125.1': {
      tappa: 2,
      prima: r`Cerchiamo il massimo di A al variare di ρ. Derivare una radice al denominatore è scomodo. Osserva però che A è sempre positiva e vale 1 diviso la radice di un radicando: A è massima esattamente dove il radicando è minimo. Allora basta derivare il radicando, cioè $A^{-2}$.`,
      dopo: r`Abbiamo trasformato «massimo di A» in «minimo di un polinomio in ρ», molto più facile. È un trucco che vale sempre quando una grandezza positiva è 1 diviso qualcosa: gli estremi coincidono, cambiano solo massimo e minimo.`,
    },
    'd125.2': {
      tappa: 2,
      prima: r`Deriva il radicando termine per termine. Il primo è un quadrato, $(1 - \rho^2)^2$: la sua derivata è 2 per la base per la derivata della base (regola della catena), e la derivata di $1 - \rho^2$ è $-2\rho$. Il secondo, $4\xi^2\rho^2$, si deriva come $\rho^2$. Poi sviluppa i prodotti.`,
      dopo: r`Tre termini, tutti con un ρ: $-4\rho$, $+4\rho^3$, $+8\xi^2\rho$. Attenzione: $-4\rho$ per $-\rho^2$ dà $+4\rho^3$; la dispensa scrive $4\rho^2$ per una svista, ma poi arriva al risultato giusto. Controllo: con ξ = 0 la derivata si annulla a ρ = 1, dove A senza smorzamento è infinita.`,
    },
    'd125.3': {
      tappa: 2,
      prima: r`Poniamo la derivata uguale a zero. Tutti i termini contengono $4\rho$: raccoglilo. Un prodotto è zero se lo è uno dei fattori. Il primo fattore dà subito una soluzione; dall'altro, una parentesi con $\rho^2$, ricava ρ (prendendo la radice positiva, perché ρ è un rapporto fra pulsazioni).`,
      dopo: r`ρ = 0 è il punto di partenza della curva, dove A = 1. L'altra radice, $\rho_R = \sqrt{1 - 2\xi^2}$, è il picco: sta un po' sotto 1, quindi con smorzamento il massimo non è esattamente alla pulsazione naturale. Controllo: per ξ → 0 torna $\rho_R = 1$. Non confonderla con $\sqrt{1 - \xi^2}$, che riguarda le vibrazioni libere.`,
    },
    'd125.4': {
      tappa: 2,
      prima: r`Quanto è alto il picco? Sostituisci $\rho_R^2 = 1 - 2\xi^2$ nel radicando. Il primo termine diventa $(2\xi^2)^2 = 4\xi^4$, il secondo $4\xi^2(1 - 2\xi^2)$. Somma, raccogli $4\xi^2$ e prendi la radice: A è 1 diviso quel risultato.`,
      dopo: r`Il picco vale $1/(2\xi\sqrt{1 - \xi^2})$: più smorzamento, picco più basso. Con ξ = 0,1 viene circa 5, con ξ = 0,3 circa 1,75, come nel grafico della dispensa. La dispensa non scrive questa formula, ma è utile per controllare il disegno.`,
    },
    'd125.5': {
      tappa: 2,
      prima: r`Il picco esiste solo se $\rho_R$ è un numero reale, cioè se sotto la radice c'è qualcosa di positivo. Scrivi la condizione $1 - 2\xi^2 > 0$ e ricava ξ. Poi pensa al contrario: se voglio eliminare il picco, quanto smorzamento mi serve?`,
      dopo: r`Il picco esiste solo per ξ < $\sqrt{1/2}$ ≈ 0,707. Oltre questa soglia non c'è più amplificazione pericolosa vicino alla frequenza naturale. Attenzione a non confonderla con ξ = 1, lo smorzamento critico: quella soglia riguarda le vibrazioni libere (oscilla o non oscilla), questa la risposta forzata.`,
    },
    'd125.6': {
      tappa: 2,
      prima: r`Che forma ha la curva quando ξ supera 0,707? La derivata ha come unico zero ρ = 0, e la parentesi $\rho^2 - 1 + 2\xi^2$ è sempre positiva: quindi il radicando cresce sempre. Che cosa vuol dire per A, che è il suo reciproco?`,
      dopo: r`A scende sempre, partendo da 1: la massa non si muove mai più di quanto farebbe sotto la forza statica. Nel grafico è la curva ξ = 0,8. In pratica, con smorzamento così alto, la risonanza smette di essere un problema; ma vedremo con la trasmissibilità che tanto smorzamento ha un prezzo.`,
    },
    'd126.1': {
      tappa: 3,
      prima: r`Usiamo la scrittura complessa: l'ampiezza complessa è la forza complessa divisa per la rigidezza dinamica $p(i\omega)$. Ricorda la regola: quando dividi due numeri complessi gli argomenti (gli angoli) si sottraggono. Quindi l'angolo della risposta meno l'angolo della forza è uguale a meno l'angolo di $p$. Chiama φ l'angolo di $p$.`,
      dopo: r`La risposta è in ritardo sulla forza proprio dell'angolo della rigidezza dinamica: per questo si scrive $\sin(\omega t - \varphi)$. Ha senso: la massa risponde dopo che è stata spinta, non prima. La dispensa scrive $e^{+i\varphi}$, ma intende il ritardo, come mostra la riga successiva.`,
    },
    'd126.2': {
      tappa: 3,
      prima: r`L'angolo di $p = K - m\omega^2 + ic\omega$ è l'arcotangente di parte immaginaria su parte reale. Per renderlo adimensionale fai la stessa operazione usata per A: dividi sopra e sotto per $K$. Sai già in cosa si trasformano $c\omega/K$ e $m\omega^2/K$.`,
      dopo: r`Il ritardo dipende, come A, solo da ξ e ρ. Il numeratore $2\xi\rho$ viene dallo smorzatore, il denominatore $1 - \rho^2$ dalla gara fra molla e inerzia. Controllo: con ξ = 0 il numeratore è nullo e il ritardo è 0 o π, a seconda del segno del denominatore.`,
    },
    'd126.3': {
      tappa: 3,
      prima: r`Attenzione al quadrante. Il numeratore $2\xi\rho$ è sempre positivo. Il denominatore $1 - \rho^2$ è positivo sotto la risonanza e negativo sopra. L'arcotangente «principale» restituisce angoli fra $-\pi/2$ e $\pi/2$: per ρ > 1 darebbe un angolo negativo, cioè un anticipo, che fisicamente non ha senso. Come si corregge?`,
      dopo: r`Per ρ > 1 si aggiunge π: il ritardo sta sempre fra 0 e π. Il punto con parte immaginaria positiva e parte reale negativa sta nel secondo quadrante, fra π/2 e π. Il grafico della dispensa usa già il ramo giusto, con le curve che salgono verso π.`,
    },
    'd126.4': {
      tappa: 3,
      prima: r`Guardiamo la risonanza, ρ = 1. Cosa succede al denominatore $1 - \rho^2$? E quanto vale l'arcotangente di un numero positivo diviso per qualcosa che tende a zero dalla parte positiva? Nota che ξ compare solo al numeratore.`,
      dopo: r`In risonanza il ritardo è sempre π/2, un quarto di periodo, **qualunque sia lo smorzamento**: tutte le curve passano per (1, π/2). È un fatto utile in laboratorio: la frequenza a cui la fase vale π/2 è la frequenza naturale, anche se il picco di ampiezza è un po' spostato.`,
    },
    'd126.5': {
      tappa: 3,
      prima: r`Caso senza smorzamento, ξ = 0. Il numeratore è zero, quindi la tangente è zero: l'angolo può valere solo 0 oppure π. Quale dei due? Dipende dal segno della parte reale di $p$, cioè da $1 - \rho^2$: guardalo sotto e sopra la risonanza.`,
      dopo: r`Sotto la risonanza la massa va nello stesso verso della forza (fase 0), sopra va nel verso opposto (fase π). Il passaggio è un salto netto a ρ = 1. Pensa all'elastico: se muovi la mano lentamente la massa sale con la mano; se la muovi velocissima, quando la mano sale la massa scende.`,
    },
    'd126.6': {
      tappa: 3,
      prima: r`Con ξ > 0 il salto si ammorbidisce in una curva continua. Per leggerla, chiediti in ciascuna zona chi «comanda» la rigidezza dinamica $K - m\omega^2 + ic\omega$: a bassa frequenza è grande $K$, in risonanza $K$ e $m\omega^2$ si cancellano e resta $ic\omega$, ad alta frequenza vince $-m\omega^2$.`,
      dopo: r`Fase 0: domina la molla, che spinge in fase con lo spostamento. Fase π/2: domina lo smorzatore, sfasato di un quarto. Fase π: domina la massa, che si oppone. Più ξ è grande, più la transizione è dolce: sotto ρ = 1 la curva sale, sopra scende, come indicano le frecce del grafico.`,
    },
    'd127.1': {
      tappa: 4,
      prima: r`Torna alla soluzione complessa: ampiezza complessa uguale a forza divisa per $p(i\omega)$. Se dividi entrambi i membri per $F_0$ ottieni un rapporto «uscita su ingresso» che non dipende più dalla forza ma solo dal sistema e dalla frequenza. Che espressione ha?`,
      dopo: r`Il complex gain $G$ è il reciproco della rigidezza dinamica. Dice, per ogni frequenza, quanto il sistema amplifica o attenua e con quale sfasamento. Attenzione: per una riga la dispensa chiama $p$ questo reciproco; $p$ resta la rigidezza dinamica e $G = 1/p$.`,
    },
    'd127.2': {
      tappa: 4,
      prima: r`Calcoliamo il modulo di $G$: il modulo del reciproco è il reciproco del modulo, cioè 1 diviso la radice della somma dei quadrati di parte reale e immaginaria di $p$. Poi, per avere ξ e ρ, raccogli $K$ dentro la radice esattamente come per il fattore di amplificazione.`,
      dopo: r`Il guadagno è l'ampiezza della risposta per ogni newton di forza: si misura in metri al newton, come $1/K$. Dentro c'è la stessa radice di A. La dispensa perde la radice in una riga intermedia: è un modulo, quindi la radice ci vuole.`,
    },
    'd127.3': {
      tappa: 4,
      prima: r`Che legame c'è fra il guadagno e il fattore di amplificazione? L'ampiezza è forza per guadagno. Prova a dividere l'ampiezza per lo spostamento statico $F_0/K$: la forza si semplifica e resta $K$ per il guadagno. Confronta con la formula di $|G|$ appena scritta.`,
      dopo: r`Il guadagno reso adimensionale (moltiplicato per $K$) è proprio A. Sono la stessa informazione vista da due lati: uno in metri al newton, l'altro in «spostamenti statici». Controllo: a frequenza nulla $|G| = 1/K$, cioè la cedevolezza della molla.`,
    },
    'd127.4': {
      tappa: 4,
      prima: r`Ora l'argomento di $G$. Siccome $G = 1/p$, ricorda che l'argomento del reciproco è l'opposto dell'argomento: se $p$ ha angolo φ, $G$ ha angolo $-\varphi$. Scrivilo con le grandezze del sistema.`,
      dopo: r`L'argomento di $G$ è $-\varphi$: un angolo negativo, cioè un ritardo. La dispensa chiama $\alpha = -\varphi$ «fase associata al guadagno complesso». A p. 218 però scrive l'argomento della FRF con il segno più: quello è il valore del ritardo, non l'argomento.`,
    },
    'd127.5': {
      tappa: 4,
      prima: r`La FRF in generale è «uscita diviso ingresso» in frequenza. Ma quale uscita? Si può misurare lo spostamento, la velocità o l'accelerazione. Pensa a come passi dall'uno all'altro in forma complessa: derivare rispetto al tempo vuol dire moltiplicare per $i\omega$.`,
      dopo: r`Tre FRF: spostamento, velocità e accelerazione per unità di forza, che differiscono per un fattore $i\omega$ ciascuna. Il modulo della seconda è $\omega|G|$, della terza $\omega^2|G|$. In laboratorio si misura spesso l'accelerazione, perché si usa un accelerometro.`,
    },
    'd127.6': {
      tappa: 4,
      prima: r`Valutiamo $G$ in risonanza, ω = ω_m. Cosa succede alla parte reale $K - m\omega_m^2$? Resta solo la parte immaginaria $ic\omega_m$. Per esprimerla con ξ, usa $c = 2\xi m\omega_m$ e $m\omega_m^2 = K$.`,
      dopo: r`In risonanza il modulo vale $1/(2\xi K)$ e la fase è $-\pi/2$. Ecco come si misura un sistema: si cerca la frequenza a cui la fase vale $-\pi/2$ (è $\omega_m$) e lì dal modulo si ricava ξ. Una volta misurata la FRF si sa come risponde a qualsiasi frequenza, anche senza conoscere m, c, K.`,
    },
    'd128.1': {
      tappa: 4,
      prima: r`Calcola A esattamente in risonanza, ρ = 1. Nella radice il primo termine $(1 - \rho^2)^2$ si annulla; resta $4\xi^2$. La radice di $4\xi^2$ è $2\xi$ (ξ è positivo).`,
      dopo: r`In risonanza l'amplificazione dipende solo dallo smorzamento: $1/(2\xi)$. Con ξ = 0,05 la massa si muove dieci volte lo spostamento statico. Controllo: con ξ → 0 torna l'infinito del caso non smorzato.`,
    },
    'd128.2': {
      tappa: 4,
      prima: r`Confronta il valore appena trovato con il quality factor che la dispensa riquadra, $Q = 1/(2\xi)$. Sono la stessa cosa. Chiediti quindi che cosa misura Q in parole: quanto il sistema amplifica quando è eccitato alla sua frequenza naturale.`,
      dopo: r`Q è il fattore di amplificazione in risonanza. Dice quanto il sistema è «risonante»: quanto bene accumula energia oscillando rispetto a quanta ne dissipa a ogni ciclo. Un diapason ha Q altissimo, un ammortizzatore d'auto Q basso. Attenzione al verso: Q cresce quando ξ cala.`,
    },
    'd128.3': {
      tappa: 4,
      prima: r`Il picco vero però non è a ρ = 1 ma a $\rho_R$, con valore $1/(2\xi\sqrt{1 - \xi^2})$. Fai il rapporto fra picco e Q: il $2\xi$ si semplifica. Poi per ξ piccolo usa l'approssimazione $1/\sqrt{1 - x} \approx 1 + x/2$, valida per x vicino a zero.`,
      dopo: r`Il picco è Q diviso $\sqrt{1 - \xi^2}$, un po' più alto. Per ξ = 0,1 la differenza è lo 0,5%: per smorzamenti piccoli Q e picco si confondono. Non dire quindi che Q è «esattamente» il massimo di A: lo è solo approssimativamente.`,
    },
    'd128.4': {
      tappa: 4,
      prima: r`Diamo la lettura energetica. L'energia di un'oscillazione va come il quadrato dell'ampiezza. In un ciclo libero l'ampiezza si riduce di un fattore $e^{-\delta}$ (δ è il decremento logaritmico, circa $2\pi\xi$). Quanto si riduce allora l'energia? Calcola la frazione persa e approssima per δ piccolo, con $e^{-x} \approx 1 - x$.`,
      dopo: r`In un ciclo si perde circa la frazione $4\pi\xi$ dell'energia. Rovesciando, $2\pi$ volte energia immagazzinata su energia persa per ciclo dà $1/(2\xi)$, cioè Q. È la definizione a parole della dispensa resa quantitativa: questo conto non è nella dispensa, viene dalla definizione classica.`,
    },
    'd128.5': {
      tappa: 4,
      prima: r`Traduciamo in comportamento. Se Q è grande, ξ è piccolo: cosa ti aspetti dal picco di risonanza e da quanto dura un'oscillazione libera? E se Q è basso, ξ è grande: che cosa succede all'energia dopo una botta?`,
      dopo: r`Q alto: picco alto e stretto, oscillazioni che durano a lungo (campana, diapason). Q basso: energia dissipata subito, il sistema si ferma rapidamente (sospensione ben smorzata). È lo stesso numero visto in frequenza (altezza del picco) e nel tempo (durata delle oscillazioni).`,
    },
  },
  racconto: r`All'orale parti dal modello: massa, molla, smorzatore e una forza $F_0\sin\omega t$; scrivi $m\ddot x + c\dot x + Kx = F_0\sin\omega t$ e dici che il transitorio si spegne, quindi a regime la massa oscilla alla pulsazione della forza, con ampiezza $X_0$ e ritardo φ. Sostituisci, uguagli i coefficienti di seno e coseno e trovi $X_0 = F_0/|p|$. Dividi per lo spostamento statico e arrivi ad $A = 1/\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}$. Disegni il grafico e racconti le tre zone: molla, smorzatore, massa. Chiudi con il picco a $\sqrt{1 - 2\xi^2}$ che sparisce oltre ξ ≈ 0,7, la fase π/2 in risonanza per ogni ξ, e Q = 1/(2ξ).`,
};

// ------------------------------------------------------------------ c7-eccentrica
const eccentrica: LezioneArgomento = {
  perche: r`Metti dei panni bagnati tutti da una parte del cestello della lavatrice e fai partire la centrifuga: a una certa velocità la lavatrice sbatte e si sposta, poi, salendo ancora, si calma in modo quasi magico. Lo stesso succede a un motore con il rotore non perfettamente bilanciato, a una ruota d'auto senza contrappesi, a un ventilatore con una pala sporca. La domanda della lezione è: **che forza produce una massa che gira fuori asse, quanto fa vibrare la macchina che la porta, e perché ad alta velocità la vibrazione smette di crescere?**`,
  idea: r`Fai girare un sasso legato a una corda: senti la mano tirata verso il sasso, e la direzione di questo tiro gira con il sasso. È la forza centrifuga: vale massa per $\omega^2$ per raggio, quindi raddoppiando la velocità diventa quattro volte più grande. Se la mano è libera di muoversi solo avanti e indietro, la componente orizzontale del tiro la fa oscillare: è una forza armonica, esattamente come quella della lezione sulle vibrazioni forzate, solo che la sua ampiezza cresce con la velocità.

A bassa velocità la forza è piccola e la macchina quasi non si muove. Vicino alla frequenza naturale si ha la solita risonanza. Ad alta velocità succede una cosa bella: la macchina oscilla sempre con la stessa ampiezza, in opposizione alla massa che gira, in modo che il **baricentro di tutto il sistema resti fermo** sull'asse. Il sistema smette di «combattere» lo sbilanciamento e gli gira attorno: è l'autocentramento.`,
  richiami: [
    { titolo: 'Cinematica del corpo rigido', testo: r`Per due punti O e P di un corpo rigido vale $\vec V_P = \vec V_O + \vec\omega \wedge (P - O)$: P si muove come O più una rotazione attorno a O. Se ω è costante, P descrive attorno a O una circonferenza di raggio R con angolo $\omega t$, e la sua accelerazione rispetto a O è centripeta, di modulo $\omega^2R$, diretta verso O.` },
    { titolo: 'Forza d’inerzia', testo: r`Nell'equilibrio dinamico ogni massa porta la forza $-m\vec a$, dove $\vec a$ è la **sua** accelerazione assoluta. Se due corpi hanno accelerazioni diverse, ognuno ha la propria forza d'inerzia. Per un punto che gira, la parte centripeta dell'accelerazione dà la familiare forza centrifuga, rivolta verso l'esterno.` },
    { titolo: 'Risposta forzata e fattore A', testo: r`Per $M\ddot x + c\dot x + Kx = F_0\cos\omega t$ la risposta a regime è un coseno alla stessa ω, in ritardo di φ, con ampiezza $F_0/|p|$. In forma adimensionale l'ampiezza diviso $F_0/K$ è $A(\xi,\rho) = 1/\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}$, che tende a $1/\rho^2$ ad alta frequenza.` },
    { titolo: 'Baricentro di un sistema', testo: r`La posizione del baricentro di più masse è la media delle loro posizioni pesata con le masse: $x_{GLO} = (\sum m_i x_i)/(\sum m_i)$. Se nessuna forza esterna orizzontale netta agisce, il baricentro non accelera: è il principio che rende possibile l'autocentramento.` },
  ],
  ipotesiPerche: [
    r`La guida obbliga lo statore a muoversi solo lungo x: un solo grado di libertà. Molla e smorzatore verso il telaio fermo sono la sospensione della macchina.`,
    r`Ridurre il rotore a un punto con tutta la massa sbilanciata a distanza R semplifica la cinematica; con ω costante l'angolo è semplicemente $\omega t$ e non serve un'equazione per il rotore.`,
    r`Misurando dall'equilibrio statico il peso e la precompressione della molla si elidono. Massa totale, pulsazione naturale e smorzamento relativo vanno calcolati con M, perché è M che trasla.`,
  ],
  disegnoGuida: r`Disegna a sinistra il telaio fisso tratteggiato e da lì lo smorzatore c e la molla K che vanno allo statore, una piastra con un alloggiamento circolare, chiusa fra due guide orizzontali: le guide dicono che lo statore si muove solo lungo x, e segni l'asse $x_O$. Dentro il cerchio metti il centro O e un raggio verso il punto P, la massa $M_R$, a distanza R. Segna l'angolo ωt dall'orizzontale e la freccia curva di ω costante. Se vuoi, aggiungi su P la forza centrifuga radiale $M_R\omega^2R$ e la sua componente lungo x: è la forzante. Il disegno deve far capire che P trasla con lo statore e in più gira attorno a O.`,
  mappa: [
    'Scrivo dove sta il punto P del rotore e quanto accelera.',
    'Metto le forze lungo x, comprese le due forze d’inerzia, e ottengo l’equazione del moto.',
    'Riconosco una vibrazione forzata con forza M_R ω² R e la risolvo come già so.',
    'Rendo adimensionale e guardo bassa velocità, risonanza e alta velocità.',
    'Calcolo il baricentro globale ad alta velocità: autocentramento.',
  ],
  dims: {
    d134: {
      introduzione: r`Vogliamo l'equazione del moto dello statore. Le incognite di posizione sono due punti: O, che trasla con lo statore, e P, che trasla e in più gira. La strategia è: prima la cinematica di P (posizione e accelerazione in funzione di $x_O$), poi l'equilibrio lungo x con molla, smorzatore e due forze d'inerzia, una per lo statore e una per il rotore.`,
      riepilogo: r`Dalla cinematica del rigido abbiamo scritto $x_P = x_O + R\cos\omega t$ e, derivando due volte, l'accelerazione di P: quella dello statore più la parte centripeta. Nell'equilibrio lungo x la forza d'inerzia del rotore si è spezzata in due: una parte si somma all'inerzia dello statore, dando la massa totale M; l'altra passa a destra ed è una forzante armonica $M_R\omega^2R\cos\omega t$, la componente x della centrifuga.`,
    },
    d135: {
      introduzione: r`Ora abbiamo una vibrazione forzata già nota, con una sola differenza: l'ampiezza della forza dipende da ω. La strategia è usare la soluzione già pronta, renderla adimensionale facendo comparire ρ, e poi leggere il risultato ad alta velocità. Alla fine calcoliamo il baricentro globale per scoprire che resta fermo.`,
      riepilogo: r`La risposta è quella della forzata con $F_0 = M_R\omega^2R$. Facendo comparire $\omega_m^2 = K/M$ lo spostamento statico equivalente è $(M_R R/M)\rho^2$, quindi il rapporto adimensionale è $\rho^2 A$: nullo a bassa velocità, $1/(2\xi)$ in risonanza, 1 ad alta velocità con lo statore in opposizione. A quel punto il baricentro globale ha posizione zero: statore e rotore si compensano, autocentramento.`,
    },
  },
  passi: {
    'd134.1': {
      tappa: 0,
      prima: r`Ci serve sapere dove sta P. P appartiene al rotore, che è un corpo rigido: applica la formula fondamentale, velocità di P uguale velocità di O più la rotazione attorno a O. Con ω costante l'angolo del raggio OP è semplicemente $\omega t$. Allora P, rispetto a O, sta sulla circonferenza di raggio R: scrivi le sue coordinate come O più R per coseno e seno.`,
      dopo: r`P si sposta con lo statore lungo x e in più gira: la sua x è $x_O + R\cos\omega t$, la sua y è $R\sin\omega t$ (O non si muove in verticale). Controllo: a $\omega t = 0$ P è a destra di O di R; dopo mezzo giro a sinistra. Derivando la x trovi la velocità $\dot x_O - \omega R\sin\omega t$.`,
    },
    'd134.2': {
      tappa: 0,
      prima: r`Per la forza d'inerzia del rotore serve l'accelerazione di P lungo x. Deriva ancora la velocità: $\dot x_O$ diventa $\ddot x_O$; la derivata di $-\omega R\sin\omega t$, con ω costante, è $-\omega^2 R\cos\omega t$.`,
      dopo: r`L'accelerazione di P è quella dello statore più la componente x dell'accelerazione centripeta. Il segno meno dice che questa punta verso O: quando P è a destra di O ($\cos\omega t = 1$), accelera verso sinistra. È questa parte che, tra poco, diventerà la forzante.`,
    },
    'd134.3': {
      tappa: 1,
      prima: r`Facciamo l'elenco delle forze orizzontali sul sistema statore più rotore, tutte disegnate verso +x. La molla collega lo statore al telaio fermo, e così lo smorzatore. Poi ci sono due masse con accelerazioni diverse: ognuna ha la sua forza d'inerzia. Quale accelerazione usi per il rotore?`,
      dopo: r`Quattro forze: molla (con un'eventuale deformazione statica), smorzatore (il telaio è fermo, quindi conta solo $\dot x_O$), inerzia dello statore con $\ddot x_O$ e inerzia del rotore con la **sua** accelerazione $\ddot x_P$. È il punto chiave: il rotore non accelera come lo statore.`,
    },
    'd134.4': {
      tappa: 1,
      prima: r`Ora la somma delle quattro forze deve essere zero. Sostituisci nell'inerzia del rotore l'accelerazione di P trovata prima. Per la molla, ricorda che misuriamo $x_O$ dall'equilibrio statico: che cosa succede al termine con la deformazione statica?`,
      dopo: r`Il termine statico se ne va, perché a riposo la molla bilancia già le forze statiche. Dentro la parentesi del rotore c'è $\ddot x_O$, che si comporta come un'inerzia in più, e $-\omega^2R\cos\omega t$, che non dipende da $x_O$: è un termine noto. Controllo: con R = 0 resta l'oscillatore libero di massa totale.`,
    },
    'd134.5': {
      tappa: 1,
      prima: r`Metti ordine: raccogli tutti i termini con $\ddot x_O$ (ce ne sono due, statore e rotore) e porta a destra l'unico termine che non contiene $x_O$. Cambia i segni per avere i termini del sistema positivi a sinistra.`,
      dopo: r`È un'oscillatore forzato. In inerzia c'è la massa totale M, perché anche il rotore trasla con lo statore. A destra c'è una forza armonica di ampiezza $M_R\omega^2R$: raddoppiando la velocità la forza quadruplica. È la grande differenza rispetto alla forzata classica, dove $F_0$ era fissa.`,
    },
    'd134.6': {
      tappa: 2,
      prima: r`Diamo un senso fisico alla forzante. Pensa alla forza centrifuga del rotore: modulo $M_R\omega^2R$, direzione radiale, che gira con P. Scomponila lungo x e lungo y. Quale componente agisce sullo statore libero lungo x, e chi si prende l'altra?`,
      dopo: r`La forzante è la componente x della forza centrifuga; la componente y la reggono le guide. Si poteva quindi arrivare subito al risultato «proiettando la centrifuga». Il conto con la cinematica serve a vedere bene che in inerzia entra la massa totale.`,
    },
    'd135.1': {
      tappa: 2,
      prima: r`L'equazione è identica a quella della forzata, con M al posto di m, la forza in coseno invece che in seno e $F_0 = M_R\omega^2R$. Non serve rifare i conti: usa la soluzione nota, ampiezza uguale forza divisa per il modulo della rigidezza dinamica, con lo stesso ritardo φ. Attenzione a quale massa metti nella rigidezza dinamica.`,
      dopo: r`Lo statore oscilla come un coseno in ritardo di φ. L'ampiezza ha $\omega^2$ al numeratore (la forza cresce) e il solito denominatore con la massa totale. Controllo: a ω → 0 l'ampiezza va a zero, perché senza rotazione non c'è forza.`,
    },
    'd135.2': {
      tappa: 3,
      prima: r`Per usare A ci serve lo spostamento statico $F_0/K$. Qui $F_0/K = M_R R\omega^2/K$. Vogliamo far comparire ρ: ci serve $\omega^2/\omega_m^2$, con $\omega_m^2 = K/M$. Trucco: moltiplica e dividi per M, così compare $M\omega^2/K = \rho^2$.`,
      dopo: r`Lo spostamento statico equivalente è $(M_R R/M)\rho^2$: cresce con il quadrato della velocità. $M_R R/M$ è una lunghezza: la distanza fra O e il baricentro globale. Controllo dimensionale: masse su massa per lunghezza, quindi metri.`,
    },
    'd135.3': {
      tappa: 3,
      prima: r`Il fattore di amplificazione dice che ampiezza diviso spostamento statico vale A. Sostituisci lo spostamento statico appena trovato e porta il fattore $\rho^2$ dall'altra parte: a sinistra resta un gruppo adimensionale con $|X_O|$, $M$, $M_R$ e R.`,
      dopo: r`Il rapporto adimensionale è $\rho^2 A$: «ampiezza dello statore» confrontata con «eccentricità pesata con le masse». Attenzione: non è $|X_O|/R$, serve il rapporto delle masse. È la stessa funzione del moto relativo nell'eccitazione di vincolo, perché anche lì la forza era un'inerzia proporzionale a $\omega^2$.`,
    },
    'd135.4': {
      tappa: 3,
      prima: r`Leggiamo $\rho^2 A$ nei tre regimi. A bassa velocità $\rho^2$ è piccolissimo. In risonanza ρ = 1 e A vale $1/(2\xi)$. Ad alta velocità ricorda che A si comporta come $1/\rho^2$: che cosa resta del prodotto? E quanto vale lì la fase?`,
      dopo: r`A bassa velocità lo statore quasi non si muove; in risonanza l'ampiezza è limitata solo dallo smorzamento; ad alta velocità tutte le curve tendono a 1, qualunque sia ξ, con fase π. Cioè lo statore oscilla con ampiezza $M_R R/M$ dalla parte opposta del rotore. Al contrario di A, qui ad alta frequenza la risposta non va a zero.`,
    },
    'd135.5': {
      tappa: 3,
      prima: r`Dove sta il massimo di $\rho^2 A$? La dispensa non lo calcola. Si fa come per A: si deriva rispetto a ρ e si pone zero. Aspettati qualcosa di diverso da prima: il fattore $\rho^2$ fa crescere la curva con la velocità, quindi il massimo si sposta verso destra.`,
      dopo: r`Il massimo è a $\rho^* = 1/\sqrt{1 - 2\xi^2}$, sopra la pulsazione naturale (il reciproco di quello di A), ma con lo stesso valore $1/(2\xi\sqrt{1 - \xi^2})$. Controllo: per ξ → 0 torna a ρ = 1 con valore infinito.`,
    },
    'd135.6': {
      tappa: 4,
      prima: r`Scriviamo il moto dello statore ad alta velocità. Usa i due fatti appena trovati: ampiezza $M_R R/M$ e ritardo π. Ricorda poi che un coseno ritardato di mezzo periodo è il coseno cambiato di segno.`,
      dopo: r`Lo statore si muove come $-(M_R R/M)\cos\omega t$: quando P è a destra di O, lo statore va a sinistra, e viceversa. La dispensa scrive il fattore due volte (davanti e dentro Re): la riga corretta è questa, $x_O$ uguale alla parte reale dell'ampiezza complessa.`,
    },
    'd135.7': {
      tappa: 4,
      prima: r`Ora il baricentro dell'intero sistema. È la media delle posizioni pesata con le masse: statore, massa $M - M_R$, in $x_O$; rotore, massa $M_R$, in $x_P$. Dividi per la massa totale. Poi sostituisci $x_P = x_O + R\cos\omega t$ e semplifica.`,
      dopo: r`Il baricentro sta sempre a $(M_R/M)R\cos\omega t$ da O: sul raggio OP, molto più vicino a O che a P. Controllo: con $M_R = 0$ il baricentro coincide con lo statore. La dispensa dimentica la divisione per M nella prima scrittura: senza, otterresti un momento statico, non una posizione.`,
    },
    'd135.8': {
      tappa: 4,
      prima: r`Mettiamo insieme le ultime due righe: sostituisci il moto dello statore ad alta velocità nella formula del baricentro. Guarda i due termini in $\cos\omega t$: hanno lo stesso coefficiente? Che segni hanno?`,
      dopo: r`I due termini si cancellano: il baricentro globale resta fermo sull'asse. Lo statore non sta fermo; si muove proprio quanto serve per compensare il rotore. Il centro di rotazione diventa il baricentro: è l'**autocentramento**, quello che fa calmare la lavatrice quando la centrifuga supera la risonanza.`,
    },
  },
  racconto: r`All'orale parti dal disegno: statore su guida con molla e smorzatore, rotore schematizzato come massa $M_R$ a distanza R che gira a ω costante. Dalla cinematica del rigido scrivi $x_P = x_O + R\cos\omega t$, quindi l'accelerazione di P ha la parte centripeta. Nell'equilibrio lungo x l'inerzia del rotore dà due pezzi: la massa totale M in inerzia e la forzante $M_R\omega^2R\cos\omega t$. È una forzata con forza che cresce come $\omega^2$: il rapporto $M|X_O|/(M_R R)$ vale $\rho^2 A$. Chiudi con l'alta velocità: tende a 1 con fase π, lo statore compensa il rotore e il baricentro resta fermo, autocentramento.`,
};

// ------------------------------------------------------------------ c7-vincolo
const vincolo: LezioneArgomento = {
  perche: r`Un'auto passa su una strada ondulata: nessuno spinge direttamente la carrozzeria, eppure si muove, perché le ruote salgono e scendono e trascinano la cassa attraverso molle e ammortizzatori. Lo stesso per uno strumento appoggiato su un banco che vibra, o per un edificio durante un terremoto: è il terreno a muoversi. La domanda della lezione è: **se è la base a muoversi con una legge assegnata, come si muove la massa che ci è attaccata con molla e smorzatore? Di più o di meno della base, e con quale ritardo?**`,
  idea: r`Prendi in mano un elastico con un peso appeso e muovi la mano su e giù: la mano è la base. Il peso non sente direttamente la tua mano, sente solo quanto l'elastico si allunga, cioè la **differenza** fra la posizione del peso e quella della mano. Se mano e peso si spostano insieme, l'elastico non cambia e non c'è forza. Lo stesso vale per lo smorzatore, che sente solo la velocità relativa.

Allora muovere la base equivale a spingere la massa con due forze: una attraverso la molla, proporzionale allo spostamento della base, e una attraverso lo smorzatore, proporzionale alla sua velocità. Queste due spinte sono sfasate di un quarto di periodo, e la massa risponde a entrambe. In alternativa si può guardare la massa «dal punto di vista della base»: allora la base sembra ferma e sulla massa compare una sola forza d'inerzia, come quella che ti spinge contro il sedile quando l'auto accelera. Sono due modi equivalenti di leggere lo stesso problema.`,
  richiami: [
    { titolo: 'Molla e smorzatore fra due corpi', testo: r`Una molla fra due punti A e A′ esercita una forza proporzionale al suo allungamento, cioè alla differenza degli spostamenti dei due estremi: $-K(x_A - x_{A'})$. Lo smorzatore allo stesso modo sente la differenza delle velocità: $-c(\dot x_B - \dot x_{B'})$. Se gli estremi si muovono insieme, nessuna forza.` },
    { titolo: 'Sovrapposizione degli effetti', testo: r`In un'equazione lineare, se la forzante è una somma di due termini, la risposta è la somma delle risposte a ciascun termine preso da solo. Permette di spezzare un problema difficile in due problemi già risolti.` },
    { titolo: 'Risposta a una forzante sfasata', testo: r`Dalla lezione sulle vibrazioni forzate: a una forza $F_0\sin(\omega t + \alpha_F)$ il sistema risponde con ampiezza $A(\xi,\rho)\,F_0/K$ e con la stessa fase della forza meno il ritardo φ del sistema: $\sin(\omega t + \alpha_F - \varphi)$. A e φ dipendono solo da ξ e ρ.` },
    { titolo: 'Moto relativo per traslazione', testo: r`Se un riferimento trasla senza ruotare, l'accelerazione assoluta di un punto è la sua accelerazione relativa più quella del riferimento: $\ddot x = \ddot x^R + \ddot x_V$. Non ci sono termini centripeti né di Coriolis, che nascono solo quando il riferimento ruota.` },
  ],
  ipotesiPerche: [
    r`Il sistema è fatto di base, sospensione (molla e smorzatore) e massa su guida: la massa può solo traslare lungo x, ed è la sua posizione che vogliamo trovare.`,
    r`Il moto della base è dato, non è un'incognita: per questo, anche se i corpi sono due, i gradi di libertà sono uno solo e basta l'equilibrio della massa.`,
    r`In orizzontale il peso non deforma la molla: a riposo la molla è scarica e il termine statico è zero, così l'equazione resta pulita.`,
    r`Il riferimento della base si sposta senza ruotare: nel moto relativo l'unica forza apparente è l'inerzia di trascinamento $-m\ddot x_V$.`,
  ],
  disegnoGuida: r`Comincia dalla base mobile a sinistra: una piastra verticale con il suo asse $x_V$ e la legge $x_V = X_V\sin\omega t$ scritta accanto, perché è il dato del problema. Sulla piastra segna due punti, A′ in alto e B′ in basso: da A′ parte la molla K verso il punto A della massa, da B′ lo smorzatore c verso il punto B. Disegna la massa con il baricentro G fra due guide tratteggiate e il suo asse $x_G$ verso destra. Infine metti le forze $F_{el}$ e $F_c$ sulla massa, entrambe verso +x: il segno lo metterà la formula. Il disegno deve far vedere che molla e smorzatore hanno un estremo che si muove.`,
  mappa: [
    'Scrivo molla e smorzatore con il moto relativo massa–base.',
    'Equilibrio della massa: la base diventa due forzanti in quadratura.',
    'Risolvo ogni forzante con A e φ già noti e sommo (sovrapposizione).',
    'Riscrivo nel moto relativo: una sola forzante d’inerzia, ρ²A.',
    'Calcolo la fase: la massa è sempre in ritardo sulla base.',
  ],
  dims: {
    d129: {
      introduzione: r`Vogliamo l'equazione del moto della massa e la sua risposta. Strategia: scrivo le forze di molla e smorzatore ricordando che il loro estremo sinistro si muove; faccio l'equilibrio della sola massa; sostituisco la legge della base e ottengo due forzanti sfasate; le risolvo una per volta con A e φ e sommo. Infine riscrivo tutto nel moto relativo, dove la forzante diventa una sola.`,
      riepilogo: r`Molla e smorzatore sentono solo il moto relativo, quindi nell'equilibrio della massa i termini della base passano a destra come forzanti: $c\dot x_V + Kx_V$. Con la base sinusoidale sono due sinusoidi in quadratura. Risolvendole separatamente con A e φ e sommando, l'ampiezza della massa è $A\sqrt{1 + 4\xi^2\rho^2}$ volte quella della base. Nel moto relativo le due forzanti si cancellano e resta l'inerzia $m\omega^2X_V$: il rapporto relativo è $\rho^2 A$.`,
    },
    d131: {
      introduzione: r`Sappiamo quanto si muove la massa; ora vogliamo sapere quando, cioè la sua fase rispetto alla base. Con i numeri complessi la forzante è un unico numero $X_V(K + ic\omega)$, che ha un suo angolo; il sistema aggiunge il ritardo φ. La fase della massa è la differenza dei due angoli. Poi dimostriamo che è sempre negativa.`,
      riepilogo: r`La forzante equivalente è in anticipo sulla base di $\operatorname{arctg}(2\xi\rho)$, per via dello smorzatore. Il sistema ritarda di φ. La fase della massa è la differenza, e confrontando le tangenti si vede che φ vince sempre: la massa è in ritardo per ogni ρ. A bassa frequenza il ritardo è quasi nullo, ad alta tende a un quarto di periodo. Con ampiezza e fase si scrive la risposta completa.`,
    },
  },
  passi: {
    'd129.1': {
      tappa: 0,
      prima: r`Partiamo dalla molla. Di quanto si allunga? Il suo estremo A sulla massa si sposta di $x_G$, ma anche l'estremo A′ sulla base si sposta, di $x_V$. Pensa all'elastico in mano: conta la differenza. Aggiungi l'eventuale deformazione statica. Poi fai lo stesso ragionamento per lo smorzatore, con le velocità.`,
      dopo: r`Molla e smorzatore vedono solo il moto relativo: $x_G - x_V$ e $\dot x_G - \dot x_V$. Controllo: se massa e base si muovono insieme, entrambe le forze sono nulle, come deve essere. È la riga da cui dipende tutto il resto: sbagliare qui (scrivere solo $-Kx_G$) vuol dire perdere l'eccitazione.`,
    },
    'd129.2': {
      tappa: 1,
      prima: r`I corpi sono due, ma la base ha moto assegnato: non serve la sua equazione. Basta l'equilibrio della massa: inerzia più smorzatore più molla uguale zero, con tutte le forze disegnate positive. Sviluppa le parentesi delle due forze appena scritte, separando i termini della massa da quelli della base.`,
      dopo: r`Sei termini: inerzia, smorzatore e molla della massa con segno meno; due termini della base, $+c\dot x_V$ e $+Kx_V$, con segno più; e il termine statico. I termini della base non dipendono dall'incognita: sono loro, tra poco, la forzante.`,
    },
    'd129.3': {
      tappa: 1,
      prima: r`Prima togliamo il termine statico: in quiete base e massa sono ferme e il moto è orizzontale, quindi la molla è a riposo. Poi metti a sinistra i termini con l'incognita $x_G$ e a destra quelli noti, cambiando i segni in modo che inerzia, smorzatore e molla siano positivi.`,
      dopo: r`A sinistra l'oscillatore di sempre, a destra la forzante: il moto della base agisce come due forze, una viscosa $c\dot x_V$ e una elastica $Kx_V$. Controllo: con la base ferma torni al moto libero. Con $c = 0$ la forza sarebbe solo $Kx_V$, cioè la base tira la massa attraverso la molla.`,
    },
    'd129.4': {
      tappa: 1,
      prima: r`Sostituiamo la legge della base, $x_V = X_V\sin\omega t$. Serve anche la sua velocità: la derivata del seno è il coseno, e un coseno è un seno anticipato di un quarto di periodo, $\pi/2$. Scrivi così le due forzanti entrambe come seni, per vedere le ampiezze e le fasi.`,
      dopo: r`Due sinusoidi: quella viscosa, di ampiezza $c\omega X_V$, anticipata di $\pi/2$; quella elastica, di ampiezza $KX_V$, in fase con la base. Sono in quadratura. Nota che la viscosa cresce con ω: ad alta frequenza lo smorzatore trascina di più. Per una riga la dispensa chiama $X_0$ l'ampiezza della base.`,
    },
    'd129.5': {
      tappa: 2,
      prima: r`Risolviamo senza numeri complessi. Sai già come risponde il sistema a una forza $F_0\sin(\omega t + \alpha_F)$: ampiezza A volte lo spostamento statico $F_0/K$, fase della forza meno il ritardo φ. Applicalo due volte. Per la prima forzante $F_0 = c\omega X_V$ e $\alpha_F = \pi/2$; per la seconda $F_0 = KX_V$ e $\alpha_F = 0$.`,
      dopo: r`La prima risposta ha ampiezza $A\,c\omega X_V/K$ e fase $\pi/2 - \varphi$; la seconda ampiezza $AX_V$ e fase $-\varphi$. Controllo: nella seconda la K si semplifica, e infatti se ci fosse solo la molla la massa si muoverebbe A volte la base. Attenzione a non dimenticare il $\pi/2$ della prima.`,
    },
    'd129.6': {
      tappa: 2,
      prima: r`Il sistema è lineare: la risposta alla somma delle forzanti è la somma delle risposte. Somma le due espressioni e raccogli $AX_V$. Per rendere più leggibile la prima, ricorda che un seno anticipato di $\pi/2$ è un coseno: $\sin(\omega t + \pi/2 - \varphi) = \cos(\omega t - \varphi)$.`,
      dopo: r`La massa si muove con un seno e un coseno dello stesso argomento $\omega t - \varphi$: il seno viene dalla molla, il coseno, pesato con $c\omega/K$, dallo smorzatore. La somma risolve l'equazione completa. Con $c = 0$ resta $AX_V\sin(\omega t - \varphi)$.`,
    },
    'd129.7': {
      tappa: 2,
      prima: r`Quanto vale l'ampiezza della somma? Un seno e un coseno dello stesso angolo sono due oscillazioni sfasate di 90°, e si compongono come i cateti di un triangolo rettangolo: ampiezza totale uguale alla radice della somma dei quadrati delle ampiezze. Poi usa $c\omega/K = 2\xi\rho$.`,
      dopo: r`La massa si muove $A\sqrt{1 + 4\xi^2\rho^2}$ volte la base: il fattore in più rispetto alla forza diretta viene dallo smorzatore. È la trasmissibilità di spostamento. Controllo: a ρ = 0 vale 1, la massa segue la base; senza smorzamento coincide con A.`,
    },
    'd129.8': {
      tappa: 3,
      prima: r`Cambiamo punto di vista: guardiamo la massa dalla base, con lo spostamento relativo $x_G^R = x_G - x_V$. La base trasla senza ruotare, quindi l'accelerazione assoluta è relativa più quella della base, senza altri termini. Sostituisci $x_G = x_G^R + x_V$ nell'equazione del moto e guarda cosa succede ai termini $c\dot x_V$ e $Kx_V$.`,
      dopo: r`I termini della base compaiono a sinistra e a destra e si cancellano: resta un oscillatore in $x_G^R$ forzato da $-m\ddot x_V$, l'inerzia di trascinamento. Con la base sinusoidale, $\ddot x_V = -\omega^2X_V\sin\omega t$, quindi la forza è $m\omega^2X_V\sin\omega t$. È la forza che ti spinge sul sedile quando l'auto accelera.`,
    },
    'd129.9': {
      tappa: 3,
      prima: r`Ora è una forzata classica con $F_0 = m\omega^2X_V$. Applica il fattore di amplificazione: ampiezza uguale A per $F_0/K$. Per scrivere $F_0/K$ con ρ usa $m/K = 1/\omega_m^2$. Poi dividi per $X_V$.`,
      dopo: r`Il moto relativo, misurato in ampiezze della base, è $\rho^2 A$. Rispetto alla forza diretta c'è il fattore $\rho^2$: più alta la frequenza, più grande l'accelerazione della base. Ad alta frequenza tende a 1: la massa resta ferma nello spazio e la base le scorre sotto. È il principio del sismografo.`,
    },
    'd131.1': {
      tappa: 4,
      prima: r`Passiamo ai numeri complessi: la forzante equivalente, molla più smorzatore trascinati dalla base, è $X_V(K + ic\omega)e^{i\omega t}$. Il suo angolo rispetto alla base è l'argomento di $K + ic\omega$: arcotangente di parte immaginaria su parte reale. Poi esprimi $c\omega/K$ con ξ e ρ.`,
      dopo: r`La forzante è in anticipo sulla base di un angolo $\alpha_F$ fra 0 e π/2, per colpa della parte viscosa, in quadratura. Senza smorzamento sarebbe in fase. Attenzione: a margine la dispensa dimentica una ω, ma il risultato $2\xi\rho$ è giusto.`,
    },
    'd131.2': {
      tappa: 4,
      prima: r`Il sistema introduce il suo ritardo, lo stesso visto nella forzata: l'argomento della rigidezza dinamica $p(i\omega)$. Scrivilo con ξ e ρ dividendo per $K$, e ricorda la regola del quadrante per ρ > 1.`,
      dopo: r`È lo stesso φ di sempre, fra 0 e π: piccolo a bassa frequenza, π/2 in risonanza, vicino a π ad alta frequenza. Non dipende dall'eccitazione ma solo dal sistema, perché il denominatore è sempre la rigidezza dinamica.`,
    },
    'd131.3': {
      tappa: 4,
      prima: r`La risposta complessa è forzante divisa per rigidezza dinamica. L'argomento di un quoziente è la differenza degli argomenti: argomento del numeratore $K + ic\omega$ meno argomento del denominatore $p$. Scrivi la fase della massa con i due angoli appena trovati.`,
      dopo: r`La fase iniziale della massa è $\alpha_F - \varphi$: l'anticipo della forzante meno il ritardo del sistema. Controllo: nella forza diretta sulla massa $\alpha_F = 0$ e ritrovi $-\varphi$. Ora la domanda è: chi vince fra i due angoli?`,
    },
    'd131.4': {
      tappa: 4,
      prima: r`Per confrontare due angoli fra 0 e π/2 basta confrontare le tangenti, perché la tangente cresce. Calcola $\operatorname{tg}\varphi - \operatorname{tg}\alpha_F$ con lo stesso denominatore $1 - \rho^2$. Poi ragiona a parte per ρ ≥ 1: dove sta φ rispetto a π/2, e dove sta $\alpha_F$?`,
      dopo: r`Per ρ < 1 la differenza vale $2\xi\rho^3/(1 - \rho^2)$, positiva: φ è più grande. Per ρ ≥ 1 φ è almeno π/2 mentre $\alpha_F$ è sempre sotto π/2. Quindi φ supera $\alpha_F$ per ogni ρ, come afferma la dispensa senza conto.`,
    },
    'd131.5': {
      tappa: 4,
      prima: r`Dalla riga precedente, che segno ha $\alpha_x = \alpha_F - \varphi$? Poi calcolalo in due punti notevoli: in risonanza, dove φ = π/2, e ad alta frequenza, dove $\alpha_F$ tende a π/2 (la tangente $2\xi\rho$ va all'infinito) e φ tende a π.`,
      dopo: r`La massa è sempre in ritardo sulla base: segue, non anticipa mai. A bassa frequenza il ritardo è quasi zero, la massa va con la base; ad alta frequenza tende a un quarto di periodo. In risonanza vale $\operatorname{arctg}(2\xi) - \pi/2$.`,
    },
    'd131.6': {
      tappa: 4,
      prima: r`Abbiamo ampiezza e fase: possiamo scrivere la risposta completa. L'ampiezza è la trasmissibilità per l'ampiezza della base, la fase è $\alpha_x$. Mettile in un seno alla pulsazione ω.`,
      dopo: r`È la risposta della massa in una riga: ampiezza $T_R X_V$, fase $\alpha_x$ negativa. Coincide con la somma delle due risposte trovata senza numeri complessi: i due metodi dicono la stessa cosa, uno con la trigonometria, l'altro con gli angoli dei numeri complessi.`,
    },
  },
  racconto: r`All'orale dici subito che sulla massa non agisce nessuna forza esterna: è la base a muoversi con legge $x_V = X_V\sin\omega t$. Molla e smorzatore sentono solo il moto relativo, quindi l'equilibrio della massa dà $m\ddot x_G + c\dot x_G + Kx_G = c\dot x_V + Kx_V$: due forzanti in quadratura. Le risolvi con A e φ, sommi e trovi l'ampiezza $A\sqrt{1 + 4\xi^2\rho^2}\,X_V$. Poi mostri la scrittura relativa: i termini della base si cancellano e resta la forza d'inerzia $m\omega^2X_V$, quindi $\rho^2 A$. Chiudi con la fase: $\operatorname{arctg}(2\xi\rho) - \varphi$, sempre negativa, la massa insegue la base.`,
};

// ------------------------------------------------------------------ c7-trasmissibilita
const trasmissibilita: LezioneArgomento = {
  perche: r`Accanto a un ufficio c'è una pressa che batte 120 colpi al minuto: il pavimento trema e gli oggetti si spostano sulle scrivanie. Come la monti perché al pavimento arrivi meno forza di quella che produce? Oppure: vuoi proteggere un microscopio dalle vibrazioni del pavimento. Sono due facce dello stesso problema, l'isolamento. La domanda della lezione è: **quanto di una vibrazione passa attraverso una sospensione, e come va progettata la sospensione perché ne passi meno?** La risposta sorprende: bisogna rendere il supporto più morbido, e lo smorzamento, oltre una certa frequenza, peggiora le cose.`,
  idea: r`Pensa al sedile di un'auto con la molla molto morbida: le vibrazioni veloci del motore non arrivano a te, perché la molla si deforma e tu, con la tua inerzia, resti quasi fermo. Se invece la molla fosse rigida, ogni vibrazione ti arriverebbe intera. Se poi il motore vibrasse proprio alla frequenza naturale del sedile, verresti scosso più del motore stesso.

La trasmissibilità mette un numero su questa intuizione: è il rapporto fra ciò che esce dalla sospensione e ciò che entra. Se è maggiore di 1 la sospensione amplifica, se è minore di 1 isola. Scopriremo che la soglia è sempre la stessa, una frequenza di eccitazione $\sqrt2$ volte quella naturale, qualunque sia lo smorzamento. E che sopra questa soglia lo smorzatore, che è un collegamento in più fra le due parti, fa passare più vibrazione invece di meno.`,
  richiami: [
    { titolo: 'Modulo di un quoziente complesso', testo: r`Per un numero $a + ib$ il modulo è $\sqrt{a^2 + b^2}$, la lunghezza della freccia nel piano complesso. Il modulo di un quoziente è il quoziente dei moduli: per sapere quanto è grande la risposta complessa basta dividere il modulo della forzante per quello della rigidezza dinamica.` },
    { titolo: 'Eccitazione di vincolo', testo: r`Se la base si muove con $x_V = X_V\sin\omega t$, molla e smorzatore sentono il moto relativo e l'equazione della massa diventa $m\ddot x_G + c\dot x_G + Kx_G = c\dot x_V + Kx_V$. In complesso la forzante è $X_V(K + i\omega c)e^{i\omega t}$.` },
    { titolo: 'Gruppi adimensionali', testo: r`Dividendo per K: $m\omega^2/K = \rho^2$, con $\rho = \omega/\omega_m$ rapporto fra pulsazione dell'eccitazione e pulsazione naturale, e $c\omega/K = 2\xi\rho$, con ξ smorzamento relativo. Tutto il comportamento dipende solo da questi due numeri.` },
    { titolo: 'Azione e reazione', testo: r`Se la molla spinge la massa con una forza, spinge il muro con una forza uguale e opposta. Quindi la forza che arriva al muro è l'opposto della forza che molla e smorzatore esercitano sulla massa.` },
  ],
  ipotesiPerche: [
    r`Il modello lineare a un grado di libertà a regime ci permette di usare tutte le formule della forzata: rigidezza dinamica, A, φ.`,
    r`I due problemi sono diversi (la base che si muove, oppure la forza sulla massa con base ferma) e vanno tenuti distinti, anche se alla fine danno la stessa funzione.`,
    r`Al muro arriva solo ciò che passa per molla e smorzatore: la forzante agisce sulla massa e non tocca direttamente il muro.`,
  ],
  disegnoGuida: r`Fai due disegni. A sinistra il muro fisso con i punti A′ e B′, la molla K e lo smorzatore c che vanno alla massa su guida, la forza $F_0\sin\omega t$ sulla massa e, sul muro, le due forze $F_{el}$ e $F_c$ rivolte verso il muro: sono la forza trasmessa. A destra il grafico di $T_R$ in funzione di ρ: tutte le curve partono da 1, hanno un picco vicino a ρ = 1, più basso con ξ maggiore, e si incrociano tutte nel punto $(\sqrt2, 1)$. Traccia la retta orizzontale a quota 1 e la verticale a $\sqrt2$, scrivi «amplificazione» a sinistra e «isolamento» a destra, e fai vedere che a destra le curve con ξ grande stanno sopra.`,
  mappa: [
    'Base che si muove: rapporto fra ampiezza della massa e ampiezza della base.',
    'Base ferma e forza sulla massa: forza che arriva al muro su forza applicata.',
    'È la stessa funzione: quando è minore di 1? Il punto (√2, 1).',
    'Effetto dello smorzamento e regola di progetto della pressa.',
  ],
  dims: {
    d130: {
      introduzione: r`Vogliamo il rapporto fra l'ampiezza della massa e quella della base. Con i numeri complessi è un solo passaggio: la risposta è forzante divisa per rigidezza dinamica, e il rapporto delle ampiezze è il rapporto dei moduli. Poi rendiamo tutto adimensionale e leggiamo la curva nei punti notevoli.`,
      riepilogo: r`La base equivale a una forzante complessa $X_V(K + i\omega c)$; la risposta è questa forzante divisa per la rigidezza dinamica. Il rapporto dei moduli, diviso per K, è la trasmissibilità $\sqrt{1 + 4\xi^2\rho^2}/\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}$. Vale 1 a frequenza nulla, ha il picco vicino alla risonanza, tende a 1 se lo smorzatore è rigidissimo, e tutte le curve passano per $(\sqrt2, 1)$: sotto si amplifica, sopra si isola.`,
    },
    d132: {
      introduzione: r`Ora il problema rovesciato: la base è ferma, la forza agisce sulla massa. Quanta forza arriva al muro? Strategia: scrivo che cosa trasmettono molla e smorzatore, sostituisco la risposta della forzata, calcolo l'ampiezza della forza trasmessa e la divido per quella applicata.`,
      riepilogo: r`Con il muro fermo molla e smorzatore dipendono solo dal moto della massa. Al muro arriva $Kx_G + c\dot x_G$: due termini in quadratura, di ampiezza totale $X_0\sqrt{K^2 + (c\omega)^2}$. Dividendo per $F_0$ e usando l'ampiezza della forzata si ottiene esattamente la stessa funzione della trasmissibilità di spostamento. Cambia solo il significato: forza al muro su forza applicata.`,
    },
    d133: {
      introduzione: r`Abbiamo una sola funzione per due problemi. Ora la domanda di progetto: per quali ρ la trasmissibilità è minore di 1? Lavoriamo sul quadrato, per togliere le radici, e guardiamo il segno di $T_R^2 - 1$. Poi vediamo come lo smorzamento sposta le curve e traduciamo tutto in una regola pratica per la pressa.`,
      riepilogo: r`Nel conto di $T_R^2 - 1$ lo smorzamento sparisce dal numeratore: il segno dipende solo da $2 - \rho^2$. Quindi si isola per ρ > $\sqrt2$, qualunque sia ξ. La derivata rispetto a $\xi^2$ mostra che sopra $\sqrt2$ più smorzamento vuol dire più trasmissione. Per la pressa da 2 Hz il supporto deve avere frequenza naturale sotto 1,41 Hz, cioè cedere staticamente almeno 12 cm circa.`,
    },
  },
  passi: {
    'd130.1': {
      tappa: 0,
      prima: r`Ripartiamo dall'equazione dell'eccitazione di vincolo e usiamo il complex replacement: sostituiamo la base con $X_Ve^{i\omega t}$. La sua velocità è $i\omega$ volte la posizione. Allora la somma $c\dot x_V + Kx_V$ si raccoglie in un unico numero complesso per $e^{i\omega t}$: quale?`,
      dopo: r`Le due forzanti della base diventano una sola forzante complessa, $X_V(K + i\omega c)$: la parte reale è la molla, quella immaginaria lo smorzatore, sfasato di 90°. Si risolve cercando una risposta della stessa forma, $\hat X_Ge^{i\omega t}$.`,
    },
    'd130.2': {
      tappa: 0,
      prima: r`Sostituisci la risposta di prova: ogni derivata porta un fattore $i\omega$. A sinistra raccogli $\hat X_G$ e trovi la rigidezza dinamica $p(i\omega)$, la stessa della forzata. Poi dividi.`,
      dopo: r`Ampiezza complessa uguale forzante complessa diviso rigidezza dinamica, esattamente come nella forzata: cambia solo il numeratore. Il numeratore rappresenta il collegamento fra base e massa, il denominatore la dinamica della massa. Attenzione al segno di $\omega^2 m$: senza il meno non ci sarebbe risonanza.`,
    },
    'd130.3': {
      tappa: 0,
      prima: r`Ci interessano le ampiezze, cioè i moduli. Per ciascun numero complesso prendi la radice della somma dei quadrati di parte reale e parte immaginaria. Al numeratore puoi portare $X_V$ fuori dalla radice.`,
      dopo: r`Il modulo della forzante è $X_V\sqrt{(c\omega)^2 + K^2}$: cresce con la frequenza per via dello smorzatore. Il modulo di $p$ è l'opposizione del sistema, la stessa radice della forzata. Controllo: con $\omega = 0$ entrambi valgono K (per $X_V$).`,
    },
    'd130.4': {
      tappa: 0,
      prima: r`Il modulo di un quoziente è il quoziente dei moduli. Scrivi quindi l'ampiezza della massa come rapporto dei due moduli appena calcolati e dividi per l'ampiezza della base: $X_V$ si semplifica.`,
      dopo: r`Il rapporto delle ampiezze non dipende da quanto si muove la base: è una proprietà del sistema e della frequenza. Controllo: a $\omega = 0$ vale $K/K = 1$, la massa segue la base.`,
    },
    'd130.5': {
      tappa: 0,
      prima: r`Rendiamo il rapporto adimensionale dividendo sopra e sotto per K, dentro le radici. Al numeratore $K/K = 1$ e $c\omega/K = 2\xi\rho$; al denominatore $\omega^2m/K = \rho^2$. Sono le stesse sostituzioni del fattore di amplificazione.`,
      dopo: r`È la trasmissibilità: dice se il moto della base viene amplificato o attenuato. Il denominatore è lo stesso di A; il numeratore $\sqrt{1 + 4\xi^2\rho^2}$ viene dallo smorzatore. Attenzione al refuso della dispensa nella riga dopo: scrive $(1 + \rho^2)^2$, che farebbe sparire la risonanza. Si scrive $(1 - \rho^2)^2$.`,
    },
    'd130.6': {
      tappa: 0,
      prima: r`Leggiamo la curva nei punti notevoli. Metti ξ = 0: il numeratore vale 1. Poi ρ = 0: quanto vale il rapporto? Infine ρ = 1: il termine $(1 - \rho^2)^2$ si annulla, e resta un rapporto con solo ξ.`,
      dopo: r`Senza smorzamento la trasmissibilità coincide con A. A frequenza nulla vale 1: la massa si sposta quanto il vincolo, come un blocco unico. In risonanza il picco è finito se ξ > 0: circa 5,1 per ξ = 0,1, come nel grafico stampato della dispensa.`,
    },
    'd130.7': {
      tappa: 0,
      prima: r`E se lo smorzamento diventa enorme? Per ξ molto grande, dentro le due radici dominano i termini $4\xi^2\rho^2$, uguali sopra e sotto. Che cosa resta del rapporto? Pensa anche al significato fisico di uno smorzatore infinitamente duro.`,
      dopo: r`La trasmissibilità tende a 1. Uno smorzatore che non si lascia comprimere è come un'asta rigida: massa e base diventano un blocco unico. La massa segue perfettamente il vincolo: non amplifica, ma neanche isola.`,
    },
    'd130.8': {
      tappa: 2,
      prima: r`Cerchiamo il punto speciale del grafico: c'è un ρ in cui il valore non dipende da ξ? Servirebbe che numeratore e denominatore fossero uguali, cioè $(1 - \rho^2)^2 = 1$. Risolvi: oltre a ρ = 0, quale valore positivo funziona?`,
      dopo: r`A $\rho = \sqrt2$ la trasmissibilità vale 1 per ogni smorzamento: tutte le curve passano per il punto $(\sqrt2, 1)$. È il confine fra le due zone. Non confonderlo con ρ = 1, che è la risonanza, dove la trasmissibilità è massima.`,
    },
    'd130.9': {
      tappa: 2,
      prima: r`Ai due lati del punto $(\sqrt2, 1)$ le curve stanno sopra o sotto 1? Guarda il grafico: a ρ = 0 valgono 1 e poi salgono verso il picco, quindi prima di $\sqrt2$ stanno sopra. Dopo $\sqrt2$ scendono. Che nome dai alle due zone?`,
      dopo: r`Sotto $\sqrt2$ la sospensione amplifica, sopra isola. Il manoscritto scrive il contrario per la prima zona e dice anche che sopra $\sqrt2$ più smorzamento riduce l'ampiezza: entrambi errori. Il grafico e il testo battuto della stessa pagina sono giusti; la dimostrazione è nella d133.`,
    },
    'd132.1': {
      tappa: 1,
      prima: r`Ora la base è un muro fermo e la forza agisce sulla massa. Riscrivi molla e smorzatore con la regola della differenza fra gli estremi. Che cosa fanno gli estremi A′ e B′ attaccati al muro? E la deformazione statica, in orizzontale?`,
      dopo: r`Con il muro fermo i termini della base spariscono: la molla vale $-Kx_G$ e lo smorzatore $-c\dot x_G$, come nella forzata classica. È il caso particolare delle formule generali con $x_V = 0$.`,
    },
    'd132.2': {
      tappa: 1,
      prima: r`Quale forza arriva al muro? La forzante agisce sulla massa e non tocca il muro: al muro arriva solo ciò che passa attraverso molla e smorzatore. Per azione e reazione, sul muro agisce l'opposto della forza che questi esercitano sulla massa.`,
      dopo: r`La forza trasmessa è $Kx_G + c\dot x_G$: la molla trasmette in proporzione allo spostamento, lo smorzatore alla velocità. È la forza che può rompere i supporti: i duomi delle sospensioni di un'auto su una buca, o il pavimento sotto la pressa. Controllo: con la massa ferma il muro non riceve nulla.`,
    },
    'd132.3': {
      tappa: 1,
      prima: r`Sostituisci la risposta a regime della forzata, $x_G = X_0\sin(\omega t - \varphi)$, e la sua velocità. La molla dà un seno, lo smorzatore un coseno con un fattore ω. Due oscillazioni in quadratura: si compongono in un'unica sinusoide con ampiezza uguale alla radice della somma dei quadrati.`,
      dopo: r`La forza trasmessa è una sinusoide di ampiezza $X_0\sqrt{K^2 + (c\omega)^2}$, sfasata di un angolo in più dovuto allo smorzatore. In complesso è $\hat X(K + i\omega c)e^{i\omega t}$: lo stesso numeratore della trasmissibilità di spostamento. È il primo indizio che le due funzioni coincideranno.`,
    },
    'd132.4': {
      tappa: 1,
      prima: r`Ci serve l'ampiezza della forza trasmessa in funzione della forza applicata. Prendi l'ampiezza appena trovata e sostituisci $X_0$ con la sua espressione dalla forzata: forza diviso modulo della rigidezza dinamica.`,
      dopo: r`Ora la forza trasmessa è espressa con i dati: $F_0$ per un rapporto di due radici. A frequenza nulla vale $F_0$: tutta la forza statica va al muro, come ti aspetti quando spingi una massa appoggiata a una molla.`,
    },
    'd132.5': {
      tappa: 1,
      prima: r`Dividi l'ampiezza della forza trasmessa per $F_0$: resta il rapporto delle due radici. Poi dividi sopra e sotto per K, con le solite sostituzioni $c\omega/K = 2\xi\rho$ e $\omega^2m/K = \rho^2$. Confronta il risultato con quello della d130.`,
      dopo: r`È esattamente la stessa espressione della trasmissibilità di spostamento. Anche qui la dispensa ha il refuso $(1 + \rho^2)^2$ al denominatore. Controllo: se contassi solo la molla otterresti A; il numeratore $\sqrt{1 + 4\xi^2\rho^2}$ è la forza che passa per lo smorzatore.`,
    },
    'd132.6': {
      tappa: 2,
      prima: r`Abbiamo due problemi diversi e una formula identica. Chiediti che cosa vuol dire: le due funzioni hanno lo stesso numeratore (il collegamento $K + i\omega c$) e lo stesso denominatore (la rigidezza dinamica). Cosa cambia allora fra i due casi?`,
      dopo: r`Cambia solo il significato: in un caso spostamento della massa su spostamento della base, nell'altro forza al muro su forza applicata. Le zone di amplificazione e di isolamento e il punto $(\sqrt2, 1)$ valgono per entrambi. Una sola teoria serve a proteggere sia lo strumento dal pavimento sia il pavimento dalla macchina.`,
    },
    'd133.1': {
      tappa: 2,
      prima: r`Isolare vuol dire che esce meno di quanto entra: $T_R < 1$. Le radici sono scomode. Siccome $T_R$ è positivo, essere minore di 1 equivale ad avere il quadrato minore di 1. Così si lavora con un rapporto di polinomi.`,
      dopo: r`Ora basta studiare il segno di $T_R^2 - 1$: negativo vuol dire isolamento, positivo amplificazione. Elevare al quadrato è lecito perché entrambi i membri sono positivi e l'ordine si conserva.`,
    },
    'd133.2': {
      tappa: 2,
      prima: r`Calcola $T_R^2 - 1$ mettendo tutto sullo stesso denominatore. Al numeratore resta $1 + 4\xi^2\rho^2$ meno il denominatore. Guarda bene: i termini con lo smorzamento si eliminano. Sviluppa poi $1 - (1 - \rho^2)^2$ ricordando il doppio prodotto, e raccogli $\rho^2$.`,
      dopo: r`Il numeratore è $\rho^2(2 - \rho^2)$, senza ξ; il denominatore è sempre positivo. Quindi il segno di $T_R - 1$ dipende solo da $2 - \rho^2$, non dallo smorzamento. È per questo che tutte le curve si incrociano nello stesso punto.`,
    },
    'd133.3': {
      tappa: 2,
      prima: r`Leggi il segno: $\rho^2$ è positivo, quindi tutto dipende da $2 - \rho^2$. Quando è negativo? Quando è zero? Traduci ogni caso in isolamento o amplificazione.`,
      dopo: r`Si isola solo per ρ > $\sqrt2$, per qualunque smorzamento; a $\sqrt2$ la trasmissibilità vale esattamente 1; sotto si amplifica sempre. La dispensa chiama «zona di isolamento» la zona sotto $\sqrt2$: è sbagliato, e ora sai dimostrarlo. Non confondere la soglia con la risonanza ρ = 1.`,
    },
    'd133.4': {
      tappa: 3,
      prima: r`Ora: come agisce lo smorzamento? Deriviamo $T_R^2$ rispetto a $\xi^2$, che compare sopra e sotto con lo stesso coefficiente $4\rho^2$. Usa la regola del quoziente: derivata del numeratore per denominatore meno numeratore per derivata del denominatore, tutto sul denominatore al quadrato. Poi guarda il segno.`,
      dopo: r`La derivata ha il segno di $\rho^2 - 2$. Sotto $\sqrt2$ è negativa: lo smorzamento abbassa il picco, bene. Sopra $\sqrt2$ è positiva: più smorzamento, più trasmissione. Lo smorzatore è un collegamento rigido in più. A ρ = 2: 0,36 con ξ = 0,1 e 0,62 con ξ = 0,5. Il manoscritto dice il contrario; il testo battuto ha ragione.`,
    },
    'd133.5': {
      tappa: 3,
      prima: r`Traduciamo in regola di progetto. ρ è il rapporto fra pulsazioni, ma anche fra frequenze: $\rho = f/f_m$, con f la frequenza della sorgente e $f_m$ quella naturale del supporto. La sorgente è data. Imponi ρ > $\sqrt2$ e ricava che cosa deve fare $f_m$.`,
      dopo: r`La frequenza naturale del supporto deve stare sotto $f/\sqrt2$: per isolare si **ammorbidisce** la sospensione, non la si irrigidisce. Per la pressa da 120 colpi al minuto, cioè 2 Hz, serve un supporto sotto 1,41 Hz.`,
    },
    'd133.6': {
      tappa: 3,
      prima: r`Come si riconosce un supporto abbastanza morbido? Ricorda che la pulsazione naturale si legge dalla freccia statica, quanto il supporto cede sotto il peso: $\omega_m^2 = g/x^{ST}$. Sostituisci nella condizione $\omega_m^2 < \omega^2/2$ e ricava $x^{ST}$. Poi metti i numeri della pressa, $\omega = 4\pi$ rad/s.`,
      dopo: r`Il supporto deve cedere staticamente più di $2g/\omega^2$: per la pressa più di circa 12 cm. Ecco perché gli isolatori sono molle morbide. In zona di isolamento conviene poco smorzamento, ma un po' serve: all'avviamento la macchina attraversa la risonanza, e lì lo smorzamento limita il picco.`,
    },
  },
  racconto: r`All'orale dici che la trasmissibilità misura quanto di una vibrazione passa attraverso la sospensione, e che vale in due problemi: base che si muove (spostamento della massa su spostamento della base) e forza sulla massa con base ferma (forza al muro su forza applicata). In entrambi è il rapporto dei moduli di $K + i\omega c$ e della rigidezza dinamica, cioè $T_R = \sqrt{1 + 4\xi^2\rho^2}/\sqrt{(1 - \rho^2)^2 + 4\xi^2\rho^2}$. Disegni il grafico con il punto $(\sqrt2, 1)$, mostri che $T_R^2 - 1 = \rho^2(2 - \rho^2)/D$, quindi si isola solo per ρ > $\sqrt2$, cioè $f_m < f/\sqrt2$, e chiudi con lo smorzamento che lì peggiora l'isolamento. Esempio: la pressa.`,
};

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c7-forzate': forzate,
  'c7-eccentrica': eccentrica,
  'c7-vincolo': vincolo,
  'c7-trasmissibilita': trasmissibilita,
};
