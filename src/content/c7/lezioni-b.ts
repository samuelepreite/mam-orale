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

export const LEZIONI: Record<string, LezioneArgomento> = {
  'c7-forzate': forzate,
  'c7-eccentrica': eccentrica,
};
