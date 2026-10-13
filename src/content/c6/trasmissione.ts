/**
 * C6 · Accoppiamento motore–carico con trasmissione (domanda q09). Dispensa pp. 196, 201 (con l'esempio E4/2).
 * d105 inerzia riportata, d106 coppia riportata e rendimento, d107 rapporto ottimo (assente in D: deduzione, NF-29).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { line, rect, rot, svg } from '../svg';
import { tx } from './etichette';
import { DATI_E42, bisezione, omegaDotCarico, regimeE42, ridotte, tauOttimo } from '../../engine/c6';

// ------------------------------------------------------------------ disegno (p. 201: schema; sotto lo schema ridotto)
function disegno() {
  const y1 = 60, y2 = 200;
  const disco = (x: number, y: number, h = 64) => rect(x - 6, y - h / 2, 12, h, 'soft') + rect(x - 6, y - h / 2, 12, h, 'l');
  return svg(400, 270, [
    tx(200, 14, 'schema (p. 201)', { c: 'm', size: 12 }),
    rect(4, y1 - 22, 62, 44, 'l'), tx(35, y1, 'Motore', { size: 12 }),
    line(66, y1, 150, y1, 'l', 3), disco(104, y1), tx(104, y1 - 42, 'I_m', { size: 13 }),
    rect(150, y1 - 26, 84, 52, 'l'), tx(192, y1 - 8, 'Trasmissione', { size: 11 }), tx(192, y1 + 10, 'τ, η', { c: 'a', size: 13 }),
    line(234, y1, 330, y1, 'l', 3), disco(282, y1), tx(282, y1 - 42, 'I_u', { size: 13 }),
    rect(330, y1 - 22, 66, 44, 'l'), tx(363, y1, 'Utilizz.', { size: 12 }),
    rot(84, y1, 14, 120, 240, 'f'), tx(80, y1 + 30, 'C_m', { c: 'f', size: 12 }),
    rot(130, y1, 14, 120, 240, 'v'), tx(130, y1 + 30, 'ω_m', { c: 'v', size: 12 }),
    rot(256, y1, 14, 120, 240, 'v'), tx(256, y1 + 30, 'ω_u', { c: 'v', size: 12 }),
    rot(310, y1, 14, 240, 120, 'f'), tx(312, y1 + 30, 'C_u', { c: 'f', size: 12 }),
    tx(200, 122, 'ω_u = τ ω_m · ridotto all\'albero motore ↓', { c: 'm', size: 12 }),
    rect(4, y2 - 22, 62, 44, 'l'), tx(35, y2, 'Motore', { size: 12 }),
    line(66, y2, 330, y2, 'l', 3), disco(120, y2), tx(120, y2 - 42, 'I_m', { size: 13 }),
    disco(230, y2), tx(230, y2 - 42, 'τ² I_u / η', { c: 'a', size: 13 }),
    rect(330, y2 - 22, 66, 44, 'l'), tx(363, y2 - 7, 'C_u^* =', { size: 11 }), tx(363, y2 + 9, 'τ C_u / η', { c: 'a', size: 12 }),
    rot(92, y2, 14, 120, 240, 'f'), tx(88, y2 + 30, 'C_m', { c: 'f', size: 12 }),
    rot(170, y2, 14, 120, 240, 'v'), tx(170, y2 + 30, 'ω_m', { c: 'v', size: 12 }),
    rot(300, y2, 14, 240, 120, 'f'), tx(302, y2 + 30, 'C_u^*', { c: 'f', size: 12 }),
  ], 'Accoppiamento con trasmissione: schema reale e schema ridotto all\'albero motore');
}

// ------------------------------------------------------------------ d105
const P201 = { tipo: 'dispensa', pag: 201 } as const;

export const d105: Dimostrazione = {
  id: 'd105',
  titolo: 'Trasmissione: inerzia riportata e equazione del moto (η = 1)',
  enunciato: 'Ricavare l\'inerzia dell\'utilizzatore vista dall\'albero motore e l\'equazione del moto dell\'accoppiamento con una trasmissione ideale di rapporto τ.',
  ipotesi: [
    'τ = ω_u/ω_m costante (trasmissione senza scorrimenti, con il segno della dispensa)',
    'trasmissione ideale (η = 1) e senza inerzia propria (o con l\'inerzia ripartita fra I_m e I_u)',
    'C_u modulo della coppia resistente; inerzie costanti',
  ],
  sample: (rnd) => {
    const Cm = U(rnd, 20, 200), Cu = U(rnd, 5, 300), Im = U(rnd, 0.05, 2), Iu = U(rnd, 0.5, 20), tau = U(rnd, 0.1, 2), wm = U(rnd, 10, 300);
    const wu = tau * wm;
    const wmd = (Cm * wm - Cu * wu) / (Im * wm + Iu * tau * wu); // T.F.V. risolto direttamente
    const It = U(rnd, 0.5, 5), Mc = U(rnd, 200, 1500), Mk = U(rnd, 200, 1200), rt = U(rnd, 0.2, 0.6), wU = U(rnd, 1, 20);
    const Ek = 0.5 * Mc * (wU * rt) ** 2 + 0.5 * Mk * (wU * rt) ** 2 + 0.5 * It * wU ** 2;
    return { Cm, Cu, Im, Iu, tau, wm, wu, wmd, wud: tau * wmd, It, Mc, Mk, rt, wU, Ek };
  },
  passi: [
    {
      id: 'd105.1',
      latex: '\\tau = \\dfrac{\\omega_u}{\\omega_m} = \\text{cost} \\;\\Rightarrow\\; \\omega_u = \\tau\\,\\omega_m, \\quad \\dot\\omega_u = \\tau\\,\\dot\\omega_m',
      perche: 'Rapporto di trasmissione come nella dispensa: uscita su entrata. Essendo costante, si deriva e vale anche fra le accelerazioni.',
      fonte: P201,
      distrattori: [],
    },
    {
      id: 'd105.2',
      latex: '\\tfrac12\\,I_u\\,\\omega_u^2 = \\tfrac12\\,I_u^{*}\\,\\omega_m^2',
      perche: 'Equivalenza energetica (p. 196): l\'inerzia «ridotta» $I_u^*$ è quella che, girando con l\'albero motore, avrebbe la stessa energia cinetica dell\'utilizzatore.',
      fonte: { tipo: 'dispensa', pag: 196 },
      distrattori: [],
    },
    {
      id: 'd105.3',
      latex: 'I_u^{*} = I_u\\,\\dfrac{\\omega_u^2}{\\omega_m^2} = I_u\\,\\tau^2',
      perche: 'Si sostituisce $\\omega_u = \\tau\\omega_m$: l\'inerzia si riporta con il **quadrato** del rapporto, perché l\'energia cinetica è quadratica nella velocità.',
      fonte: { tipo: 'deduzione', da: 'p. 196 (metodo) e p. 201 (risultato)', spiegazione: 'La dispensa usa l\'equivalenza energetica nell\'esempio dell\'ascensore e trova I_u τ² a p. 201 dividendo il T.F.V. per ω_m; qui si applica il metodo di p. 196 alla trasmissione.' },
      chiave: true,
      distrattori: [
        { latex: 'I_u^{*} = \\dfrac{I_u}{\\tau^2}', errore: 'indice', spiega: 'Con i = ω_m/ω_u (fonti derivate) si scrive I_u/i², che è la stessa cosa; con il τ della dispensa è I_u τ² (NF-09).', num: (v) => [(v.Iu * v.wu ** 2) / v.wm ** 2, v.Iu / v.tau ** 2] },
        { latex: 'I_u^{*} = I_u\\,\\tau', errore: 'fattore', spiega: 'La coppia si riporta con τ (potenza ∝ ω), l\'inerzia con τ² (energia ∝ ω²).', num: (v) => [(v.Iu * v.wu ** 2) / v.wm ** 2, v.Iu * v.tau] },
      ],
      num: (v) => [(v.Iu * v.wu ** 2) / v.wm ** 2, v.Iu * v.tau ** 2],
    },
    {
      id: 'd105.4',
      latex: 'I_u = \\dfrac{2E_{K,TOT}}{\\omega_u^2} = I_t + (M_{cab} + M_{contr})\\,r_t^2',
      perche: 'Esempio dell\'ascensore (p. 196): cabina e contrappeso traslano con $V = \\omega_u r_t$, il tamburo ruota con $\\omega_u$; sommando le energie cinetiche e dividendo per $\\tfrac12\\omega_u^2$ si ha l\'inerzia dell\'utilizzatore al suo albero.',
      fonte: { tipo: 'dispensa', pag: 196 },
      distrattori: [],
      num: (v) => [(2 * v.Ek) / v.wU ** 2, v.It + (v.Mc + v.Mk) * v.rt ** 2],
    },
    {
      id: 'd105.5',
      latex: 'C_m\\,\\omega_m - C_u\\,\\omega_u = I_m\\,\\dot\\omega_m\\,\\omega_m + I_u\\,\\dot\\omega_u\\,\\omega_u',
      perche: 'Teorema delle forze vive con $\\eta = 1$: ora le due inerzie e le due coppie hanno velocità diverse, ognuna con la sua.',
      fonte: P201,
      distrattori: [],
      num: (v) => [v.Cm * v.wm - v.Cu * v.wu, v.Im * v.wmd * v.wm + v.Iu * v.wud * v.wu],
    },
    {
      id: 'd105.6',
      latex: 'C_m - C_u\\,\\tau = \\big(I_m + I_u\\,\\tau^2\\big)\\,\\dot\\omega_m',
      perche: 'Si divide per $\\omega_m$ e si usa $\\omega_u/\\omega_m = \\tau$, $\\dot\\omega_u = \\tau\\dot\\omega_m$: compaiono la coppia ridotta $\\tau C_u$ e l\'inerzia ridotta $\\tau^2 I_u$ (il $\\tau\\cdot\\tau\\dot\\omega_m$ annotato dalla dispensa).',
      fonte: P201,
      chiave: true,
      distrattori: [
        { latex: 'C_m - \\dfrac{C_u}{\\tau} = \\big(I_m + I_u\\,\\tau^2\\big)\\,\\dot\\omega_m', errore: 'indice', spiega: 'ω_u/ω_m = τ, non 1/τ: la coppia resistente ridotta è τ C_u.', num: (v) => [v.Cm - v.Cu / v.tau, (v.Im + v.Iu * v.tau ** 2) * v.wmd] },
        { latex: 'C_m - C_u\\,\\tau = \\big(I_m + I_u\\,\\tau\\big)\\,\\dot\\omega_m', errore: 'fattore', spiega: 'Nel termine inerziale τ compare due volte: una da ω̇_u = τω̇_m, una da ω_u/ω_m.', num: (v) => [v.Cm - v.Cu * v.tau, (v.Im + v.Iu * v.tau) * v.wmd] },
        { latex: 'C_m - C_u\\,\\tau = I_m\\,\\dot\\omega_m', errore: 'termine-perso', spiega: 'L\'inerzia dell\'utilizzatore resta, ridotta di τ².', num: (v) => [v.Cm - v.Cu * v.tau, v.Im * v.wmd] },
      ],
      num: (v) => [v.Cm - v.Cu * v.tau, (v.Im + v.Iu * v.tau ** 2) * v.wmd],
    },
    {
      id: 'd105.7',
      latex: '\\dot\\omega_m = \\dfrac{C_m - \\tau\\,C_u}{I_m + \\tau^2 I_u}',
      perche: 'Equazione differenziale del moto con riduttore o moltiplicatore di giri e $\\eta = 1$: è l\'accoppiamento diretto con le grandezze ridotte all\'albero motore.',
      fonte: P201,
      distrattori: [],
      num: (v) => [v.wmd, (v.Cm - v.tau * v.Cu) / (v.Im + v.tau ** 2 * v.Iu)],
    },
  ],
  risultato: { latex: '(I_m + \\tau^2 I_u)\\,\\dot\\omega_m = C_m - \\tau\\,C_u, \\qquad I_u^* = \\tau^2 I_u', fonte: P201 },
  gancio: 'Coppia con τ (potenza), inerzia con τ² (energia).',
};

// ------------------------------------------------------------------ d106
export const d106: Dimostrazione = {
  id: 'd106',
  titolo: 'Trasmissione: coppia riportata, rendimento e regime',
  enunciato: 'Riportare la coppia dell\'utilizzatore all\'albero motore, tenere conto del rendimento η della trasmissione in moto diretto e ricavare la condizione di regime (con l\'esempio E4/2).',
  ipotesi: [
    'τ = ω_u/ω_m costante; moto diretto: la potenza va dal motore all\'utilizzatore',
    'η rendimento della trasmissione: esce η volte la potenza che entra',
    'esempio E4/2: C_m = C_mo − k_m ω_m, C_u = k_u ω_u, η = 1',
  ],
  sample: (rnd) => {
    const Cm = U(rnd, 20, 200), Cu = U(rnd, 5, 300), Im = U(rnd, 0.05, 2), Iu = U(rnd, 0.5, 20), tau = U(rnd, 0.1, 2), eta = U(rnd, 0.6, 0.98), wm = U(rnd, 10, 300);
    const wu = tau * wm;
    const wmd = (eta * Cm - tau * Cu) / (eta * Im + tau ** 2 * Iu); // bilancio di potenza risolto in ω̇_m
    const Cmo = U(rnd, 20, 100), km = U(rnd, 0.02, 0.2), ku = U(rnd, 0.2, 2), tauE = U(rnd, 0.2, 1);
    const wmE = bisezione((x) => Cmo - km * x - tauE ** 2 * ku * x, 0, Cmo / km);
    return { Cm, Cu, Im, Iu, tau, eta, wm, wu, wmd, wud: tau * wmd, CmR: (tau * Cu) / eta, Cmo, km, ku, tauE, wmE, wuE: tauE * wmE };
  },
  passi: [
    {
      id: 'd106.1',
      latex: 'C_u^{*}\\,\\omega_m = C_u\\,\\omega_u \\;\\Rightarrow\\; C_u^{*} = \\tau\\,C_u',
      perche: 'La coppia ridotta all\'albero motore è quella che, alla velocità del motore, assorbe la stessa potenza dell\'utilizzatore (trasmissione ideale). È la $C_u^* = \\tau C_u$ dell\'esempio E4/2.',
      fonte: P201,
      distrattori: [],
      num: (v) => [(v.Cu * v.wu) / v.wm, v.tau * v.Cu],
    },
    {
      id: 'd106.2',
      latex: '\\eta\\,\\big(C_m - I_m\\dot\\omega_m\\big)\\,\\omega_m = \\big(C_u + I_u\\dot\\omega_u\\big)\\,\\omega_u',
      perche: 'Bilancio di potenza della trasmissione in moto diretto: entra la potenza del motore meno quella che serve ad accelerare $I_m$ (che non attraversa la trasmissione); ne esce $\\eta$ volte tanto, che deve vincere $C_u$ e accelerare $I_u$.',
      fonte: { tipo: 'deduzione', da: 'p. 201 (risultato finale)', spiegazione: 'La riga di partenza della dispensa con η non porta al suo risultato (verificato con SymPy); questa è l\'unica scrittura coerente con il risultato C_m − C_u τ/η = (I_m + I_u τ²/η) ω̇_m.' },
      chiave: true,
      correzione: { nf: 'NF-28', dispensaScrive: '\\eta\\,C_m\\omega_m - C_u\\omega_u = I_m\\dot\\omega_m\\omega_m + I_u\\dot\\omega_u\\omega_u' },
      distrattori: [
        { latex: '\\eta\\,C_m\\omega_m - C_u\\omega_u = I_m\\dot\\omega_m\\omega_m + I_u\\dot\\omega_u\\omega_u', errore: 'ipotesi', spiega: 'È la riga della dispensa (NF-28): applica η anche alla potenza che accelera I_m, che resta sul lato motore. Porta a ω̇_m = (ηC_m − τC_u)/(I_m + τ²I_u), diverso dal risultato della dispensa stessa.', num: (v) => [v.eta * v.Cm * v.wm - v.Cu * v.wu, v.Im * v.wmd * v.wm + v.Iu * v.wud * v.wu] },
        { latex: '\\big(C_m - I_m\\dot\\omega_m\\big)\\,\\omega_m = \\eta\\,\\big(C_u + I_u\\dot\\omega_u\\big)\\,\\omega_u', errore: 'convenzione', spiega: 'Così η sta sul lato utilizzatore: è il bilancio del moto retrogrado, quando la potenza va dall\'utilizzatore al motore.', num: (v) => [(v.Cm - v.Im * v.wmd) * v.wm, v.eta * (v.Cu + v.Iu * v.wud) * v.wu] },
      ],
      num: (v) => [v.eta * (v.Cm - v.Im * v.wmd) * v.wm, (v.Cu + v.Iu * v.wud) * v.wu],
    },
    {
      id: 'd106.3',
      latex: 'C_m - C_u\\,\\dfrac{\\tau}{\\eta} = \\Big(I_m + I_u\\,\\dfrac{\\tau^2}{\\eta}\\Big)\\,\\dot\\omega_m',
      perche: 'Si divide per $\\eta\\,\\omega_m$ e si sostituiscono $\\omega_u = \\tau\\omega_m$, $\\dot\\omega_u = \\tau\\dot\\omega_m$. Con $\\eta < 1$ il motore «vede» sia una coppia resistente sia un\'inerzia del carico più grandi di $1/\\eta$ (NF-225). È il risultato della dispensa.',
      fonte: P201,
      chiave: true,
      distrattori: [
        { latex: 'C_m - C_u\\,\\dfrac{\\tau}{\\eta} = \\big(I_m + I_u\\,\\tau^2\\big)\\,\\dot\\omega_m', errore: 'termine-perso', spiega: 'Anche la potenza che accelera I_u attraversa la trasmissione: l\'inerzia ridotta è τ²I_u/η, non solo la coppia (NF-225).', num: (v) => [v.Cm - (v.Cu * v.tau) / v.eta, (v.Im + v.Iu * v.tau ** 2) * v.wmd] },
        { latex: 'C_m - \\eta\\,\\tau\\,C_u = \\big(I_m + \\eta\\,\\tau^2 I_u\\big)\\,\\dot\\omega_m', errore: 'indice', spiega: 'Le perdite aumentano lo sforzo del motore: si divide per η, non si moltiplica.', num: (v) => [v.Cm - v.eta * v.tau * v.Cu, (v.Im + v.eta * v.tau ** 2 * v.Iu) * v.wmd] },
      ],
      num: (v) => [v.Cm - (v.Cu * v.tau) / v.eta, (v.Im + (v.Iu * v.tau ** 2) / v.eta) * v.wmd],
    },
    {
      id: 'd106.4',
      latex: '\\dot\\omega_m = 0 \\;\\Rightarrow\\; C_m = \\dfrac{\\tau}{\\eta}\\,C_u \\iff \\eta\\,C_m\\,\\omega_m = C_u\\,\\omega_u \\qquad (\\eta = 1:\\ C_m = C_u\\,\\tau)',
      perche: 'A regime l\'accelerazione è nulla. La dispensa scrive il caso ideale ($C_m\\omega_m - C_u\\omega_u = 0 \\Rightarrow C_m = C_u\\tau$); con $\\eta$ si pone $\\dot\\omega_m = 0$ nell\'equazione completa. Graficamente: intersezione di $C_m(\\omega_m)$ con la caratteristica ridotta $\\tau C_u(\\tau\\omega_m)/\\eta$.',
      fonte: P201,
      chiave: true,
      distrattori: [
        { latex: 'C_m = \\dfrac{C_u}{\\tau}', errore: 'indice', spiega: 'Un riduttore (τ < 1) riduce la coppia che il motore deve dare: C_m = τ C_u. C_u/τ si avrebbe con i = 1/τ al posto di τ (NF-09).', num: (v) => [v.CmR, v.Cu / v.tau] },
        { latex: 'C_m = \\eta\\,\\tau\\,C_u', errore: 'indice', spiega: 'Con le perdite il motore deve dare di più: C_m = τ C_u/η.', num: (v) => [v.CmR, v.eta * v.tau * v.Cu] },
      ],
      num: (v) => [v.eta * v.CmR * v.wm, v.Cu * v.wu],
    },
    {
      id: 'd106.5',
      latex: 'C_m = C_{mo} - k_m\\,\\omega_m = C_u^{*} = \\tau\\,k_u\\,\\omega_u = \\tau^2 k_u\\,\\omega_m',
      perche: 'Esempio E4/2 (scansione del libro, p. 201): si riduce la coppia resistente all\'asse del motore e si usa $\\omega_u = \\tau\\omega_m$; il regime è l\'uguaglianza fra la coppia del motore e quella ridotta.',
      fonte: P201,
      distrattori: [],
      num: (v) => [v.Cmo - v.km * v.wmE, v.tauE ** 2 * v.ku * v.wmE],
    },
    {
      id: 'd106.6',
      latex: '\\omega_m = \\dfrac{C_{mo}}{k_m + \\tau^2 k_u} = \\dfrac{45}{0{,}06 + 0{,}25\\cdot 0{,}8} = 173{,}1\\ \\text{rad/s}, \\qquad \\omega_u = \\tau\\,\\omega_m = 86{,}5\\ \\text{rad/s}',
      perche: 'Con i dati dell\'esempio ($C_{mo}$ = 45 N m, $k_m$ = 0,06 N m s/rad, $k_u$ = 0,8 N m s/rad, τ = 1/2): 1652,8 giri/min al motore, 826,4 all\'utilizzatore. La coppia del motore è $C_m = 34{,}62$ N m.',
      fonte: P201,
      chiave: true,
      distrattori: [
        { latex: '\\omega_m = \\dfrac{C_{mo}}{k_m + \\tau\\,k_u}', errore: 'fattore', spiega: 'C_u = k_u ω_u = k_u τ ω_m e poi si moltiplica ancora per τ: τ².', num: (v) => [v.wmE, v.Cmo / (v.km + v.tauE * v.ku)] },
        { latex: '\\omega_m = \\dfrac{C_{mo}}{k_m + k_u}', errore: 'ipotesi', spiega: 'Così si ignora la trasmissione: varrebbe con accoppiamento diretto (τ = 1).', num: (v) => [v.wmE, v.Cmo / (v.km + v.ku)] },
      ],
      num: (v) => [v.wmE, v.Cmo / (v.km + v.tauE ** 2 * v.ku)],
    },
    {
      id: 'd106.7',
      latex: 'W = C_m\\,\\omega_m = C_u\\,\\omega_u = 34{,}62 \\cdot 173{,}1 \\simeq 5{,}99\\ \\text{kW}',
      perche: 'Con $\\eta = 1$ la potenza trasmessa è la stessa ai due alberi: il riduttore scambia velocità con coppia ($C_u = 69{,}2$ N m, il doppio di $C_m$).',
      fonte: P201,
      distrattori: [],
      num: (v) => [(v.Cmo - v.km * v.wmE) * v.wmE, v.ku * v.wuE * v.wuE],
    },
  ],
  risultato: { latex: 'C_m - \\dfrac{\\tau}{\\eta}\\,C_u = \\Big(I_m + \\dfrac{\\tau^2}{\\eta}\\,I_u\\Big)\\dot\\omega_m; \\qquad \\text{regime: } C_m = \\dfrac{\\tau}{\\eta}\\,C_u', fonte: P201 },
  gancio: 'Il rendimento si paga due volte: sulla coppia del carico e sulla sua inerzia.',
};

// ------------------------------------------------------------------ d107 (assente nella dispensa: deduzione, NF-29)
const DED107 = { tipo: 'deduzione', da: 'equazione di p. 201 (d105)', spiegazione: 'La dispensa non tratta il rapporto ottimo: si massimizza rispetto a τ l\'accelerazione del carico ω̇_u = τ ω̇_m ricavata dall\'equazione di p. 201 con η = 1 (NF-29).' } as const;

type P107 = { Cm: number; Cu: number; Im: number; Iu: number };
const N107 = (t: number, v: P107) => (v.Cm - 2 * t * v.Cu) * (v.Im + t * t * v.Iu) - (t * v.Cm - t * t * v.Cu) * 2 * t * v.Iu;
const radice = (v: { Cm: number; Cu: number; Im: number; Iu: number }) => {
  let hi = 1;
  while (N107(hi, v) > 0) hi *= 2;
  return bisezione((t) => N107(t, v), 0, hi);
};

export const d107: Dimostrazione = {
  id: 'd107',
  titolo: 'Rapporto di trasmissione ottimo per l\'accelerazione del carico',
  enunciato: 'Fissati motore e utilizzatore, trovare il rapporto τ che rende massima l\'accelerazione dell\'utilizzatore (per esempio all\'avviamento).',
  ipotesi: [
    'η = 1; C_m e C_u assegnate nell\'istante considerato e indipendenti da τ (scelta di progetto)',
    'si massimizza l\'accelerazione del CARICO ω̇_u, non quella del motore (NF-29)',
    'τ > 0 variabile libera',
  ],
  sample: (rnd) => {
    const Cm = U(rnd, 20, 200), Im = U(rnd, 0.01, 1), Iu = U(rnd, 0.5, 50), Cu = U(rnd, 0.01, 0.5) * Cm, tau = U(rnd, 0.05, 2);
    const v = { Cm, Cu, Im, Iu };
    const tauNum = radice(v), tauNum0 = radice({ ...v, Cu: 0 });
    const wdm = (Cm - tau * Cu) / (Im + tau * tau * Iu);
    return { ...v, tau, tauNum, tauNum0, wdm };
  },
  passi: [
    {
      id: 'd107.1',
      latex: '\\dot\\omega_u = \\tau\\,\\dot\\omega_m = \\dfrac{\\tau\\,C_m - \\tau^2 C_u}{I_m + \\tau^2 I_u}',
      perche: 'Al carico interessa la **sua** accelerazione: si moltiplica per τ l\'equazione del moto ridotta (d105). Il compromesso è chiaro: τ piccolo riduce coppia e inerzia viste dal motore, ma l\'utilizzatore riceve solo τ volte l\'accelerazione del motore.',
      fonte: DED107,
      chiave: true,
      distrattori: [
        { latex: '\\max_\\tau\\ \\dot\\omega_m = \\max_\\tau \\dfrac{C_m - \\tau C_u}{I_m + \\tau^2 I_u}', errore: 'concetto', spiega: 'È l\'impostazione di d107 nel fascicolo (NF-29): ω̇_m cresce sempre al calare di τ, e il «massimo» è τ → 0, cioè il motore che gira a vuoto.' },
      ],
      num: (v) => [v.tau * v.wdm, (v.tau * v.Cm - v.tau ** 2 * v.Cu) / (v.Im + v.tau ** 2 * v.Iu)],
    },
    {
      id: 'd107.2',
      latex: '\\dfrac{\\partial\\dot\\omega_m}{\\partial\\tau} = \\dfrac{C_u I_u\\tau^2 - 2C_m I_u\\tau - C_u I_m}{(I_m + \\tau^2 I_u)^2} < 0 \\quad \\text{per } 0 \\le \\tau < \\dfrac{C_m}{C_u}',
      perche: 'Controllo del perché non si massimizza $\\dot\\omega_m$: nel campo utile ($\\dot\\omega_m > 0$) il numeratore è $I_u\\tau(C_u\\tau - 2C_m) - C_uI_m < 0$, quindi $\\dot\\omega_m$ è massima per τ → 0.',
      fonte: DED107,
      aggiunto: true,
      distrattori: [],
      num: (v) => [(-v.Cu * (v.Im + v.Iu * v.tau ** 2) - (v.Cm - v.Cu * v.tau) * 2 * v.Iu * v.tau) / (v.Im + v.tau ** 2 * v.Iu) ** 2, (v.Cu * v.Iu * v.tau ** 2 - 2 * v.Cm * v.Iu * v.tau - v.Cu * v.Im) / (v.Im + v.tau ** 2 * v.Iu) ** 2],
    },
    {
      id: 'd107.3',
      latex: '\\dfrac{\\partial\\dot\\omega_u}{\\partial\\tau} = \\dfrac{(C_m - 2\\tau C_u)(I_m + \\tau^2 I_u) - (\\tau C_m - \\tau^2 C_u)\\,2\\tau I_u}{(I_m + \\tau^2 I_u)^2} = \\dfrac{C_m I_m - 2C_u I_m\\tau - C_m I_u\\tau^2}{(I_m + \\tau^2 I_u)^2}',
      perche: 'Derivata del quoziente; nel numeratore i termini in $\\tau^3$ si cancellano ($-2C_uI_u\\tau^3 + 2C_uI_u\\tau^3$).',
      fonte: DED107,
      distrattori: [
        { latex: '\\dfrac{\\partial\\dot\\omega_u}{\\partial\\tau} = \\dfrac{C_m - 2\\tau C_u}{I_m + \\tau^2 I_u}', errore: 'termine-perso', spiega: 'Anche il denominatore dipende da τ: va derivato (regola del quoziente).', num: (v) => [(v.Cm - 2 * v.tau * v.Cu) / (v.Im + v.tau ** 2 * v.Iu), (v.Cm * v.Im - 2 * v.Cu * v.Im * v.tau - v.Cm * v.Iu * v.tau ** 2) / (v.Im + v.tau ** 2 * v.Iu) ** 2] },
      ],
      num: (v) => [N107(v.tau, v as unknown as P107) / (v.Im + v.tau ** 2 * v.Iu) ** 2, (v.Cm * v.Im - 2 * v.Cu * v.Im * v.tau - v.Cm * v.Iu * v.tau ** 2) / (v.Im + v.tau ** 2 * v.Iu) ** 2],
    },
    {
      id: 'd107.4',
      latex: 'C_m I_u\\,\\tau^2 + 2\\,C_u I_m\\,\\tau - C_m I_m = 0',
      perche: 'Si annulla il numeratore. È una parabola in τ rivolta verso l\'alto che vale $-C_mI_m < 0$ in τ = 0: la derivata di $\\dot\\omega_u$ è positiva prima della radice positiva e negativa dopo, quindi è un **massimo**.',
      fonte: DED107,
      chiave: true,
      distrattori: [
        { latex: 'C_m I_u\\,\\tau^2 + C_u I_m\\,\\tau - C_m I_m = 0', errore: 'fattore', spiega: 'Derivando τ²C_u si ottiene 2τC_u: il 2 resta.', num: (v) => [v.Cm * v.Iu * v.tauNum ** 2 + v.Cu * v.Im * v.tauNum - v.Cm * v.Im, 0] },
        { latex: 'C_m I_u\\,\\tau^2 - C_m I_m = 0', errore: 'ipotesi', spiega: 'Questo vale solo se il carico non ha coppia resistente (C_u = 0).', num: (v) => [v.Cm * v.Iu * v.tauNum ** 2 - v.Cm * v.Im, 0] },
      ],
      num: (v) => [v.Cm * v.Iu * v.tauNum ** 2 + 2 * v.Cu * v.Im * v.tauNum - v.Cm * v.Im, 0],
    },
    {
      id: 'd107.5',
      latex: '\\tau_{opt} = \\dfrac{-C_u I_m + \\sqrt{I_m\\,(C_m^2 I_u + C_u^2 I_m)}}{C_m I_u}',
      perche: 'Radice positiva dell\'equazione di secondo grado (l\'altra è negativa e non ha senso come rapporto di un riduttore).',
      fonte: DED107,
      chiave: true,
      distrattori: [
        { latex: '\\tau_{opt} = \\dfrac{-C_u I_m - \\sqrt{I_m\\,(C_m^2 I_u + C_u^2 I_m)}}{C_m I_u}', errore: 'segno', spiega: 'Questa radice è negativa.', num: (v) => [v.tauNum, (-v.Cu * v.Im - Math.sqrt(v.Im * (v.Cm ** 2 * v.Iu + v.Cu ** 2 * v.Im))) / (v.Cm * v.Iu)] },
        { latex: '\\tau_{opt} = \\sqrt{I_m/I_u}', errore: 'ipotesi', spiega: 'È il caso particolare C_u = 0; con coppia resistente l\'ottimo è un po\' più piccolo.', num: (v) => [v.tauNum, Math.sqrt(v.Im / v.Iu)] },
        { latex: '\\tau_{opt} \\to 0', errore: 'concetto', spiega: 'È il «massimo» di ω̇_m, non di ω̇_u: con τ = 0 il carico non si muove (NF-29).', num: (v) => [v.tauNum, 0] },
      ],
      num: (v) => [v.tauNum, (-v.Cu * v.Im + Math.sqrt(v.Im * (v.Cm ** 2 * v.Iu + v.Cu ** 2 * v.Im))) / (v.Cm * v.Iu)],
    },
    {
      id: 'd107.6',
      latex: 'C_u = 0:\\quad \\tau_{opt} = \\sqrt{\\dfrac{I_m}{I_u}} \\iff \\tau_{opt}^2\\,I_u = I_m',
      perche: '«Adattamento delle inerzie»: senza coppia resistente l\'accelerazione del carico è massima quando l\'inerzia del carico ridotta al motore è uguale a quella del motore.',
      fonte: DED107,
      chiave: true,
      distrattori: [
        { latex: '\\tau_{opt} = \\sqrt{I_u/I_m}', errore: 'indice', spiega: 'È il valore di i_opt = 1/τ_opt (fonti derivate con i = ω_m/ω_u, NF-09).', num: (v) => [v.tauNum0, Math.sqrt(v.Iu / v.Im)] },
        { latex: '\\tau_{opt} = I_m/I_u', errore: 'fattore', spiega: 'L\'inerzia si riporta con τ²: l\'uguaglianza τ²I_u = I_m dà la radice.', num: (v) => [v.tauNum0, v.Im / v.Iu] },
      ],
      num: (v) => [v.tauNum0, Math.sqrt(v.Im / v.Iu)],
    },
    {
      id: 'd107.7',
      latex: '\\dot\\omega_{u,max} = \\dfrac{C_m}{2\\sqrt{I_m I_u}} \\quad (C_u = 0)',
      perche: 'Si sostituisce $\\tau_{opt}$: metà della coppia motrice «va» a ciascuna delle due inerzie uguali.',
      fonte: DED107,
      distrattori: [],
      num: (v) => [(v.tauNum0 * v.Cm) / (v.Im + v.tauNum0 ** 2 * v.Iu), v.Cm / (2 * Math.sqrt(v.Im * v.Iu))],
    },
  ],
  risultato: { latex: '\\tau_{opt} = \\dfrac{-C_u I_m + \\sqrt{I_m(C_m^2 I_u + C_u^2 I_m)}}{C_m I_u} \\;\\xrightarrow{C_u = 0}\\; \\sqrt{I_m/I_u}', fonte: DED107 },
  gancio: 'Si accelera il carico, non il motore: ottimo quando τ²I_u = I_m.',
};

// ------------------------------------------------------------------ argomento
const E42 = regimeE42(DATI_E42);

export const trasmissione: ArgomentoContenuto = {
  id: 'c6-trasmissione',
  cosaDireSubito:
    'Con una trasmissione di rapporto τ = ω_u/ω_m motore e utilizzatore girano a velocità diverse, legate da ω_u = τ ω_m. Scrivo il teorema delle forze vive e divido per ω_m: tutto si riduce all\'albero motore, la coppia resistente moltiplicata per τ e l\'inerzia del carico per τ². Con rendimento η in moto diretto ottengo (I_m + τ²I_u/η) ω̇_m = C_m − τC_u/η e, a regime, C_m = τC_u/η.',
  sistemaIpotesi: [
    'Sistema: motore (I_m, C_m, ω_m) – organi di trasmissione (τ, η) – utilizzatore (I_u, C_u, ω_u).',
    'τ = ω_u/ω_m costante (riduttore se τ < 1, moltiplicatore se τ > 1), con il segno della dispensa.',
    'Moto diretto: la potenza va dal motore all\'utilizzatore; η rendimento della trasmissione.',
    'Trasmissione senza inerzia propria; C_u modulo della coppia resistente.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Accoppiamento con trasmissione (p. 201) e lo stesso sistema ridotto all\'albero motore: inerzia τ²I_u/η, coppia τC_u/η.',
    fonte: { tipo: 'dispensa', pag: 201, fig: 'schema motore–trasmissione–utilizzatore' },
    elementi: [
      { id: 'schema', testo: 'motore con I_m, organi di trasmissione (τ, η), utilizzatore con I_u', obbligatorio: true },
      { id: 'velocita', testo: 'ω_m sul lato motore, ω_u = τω_m sul lato utilizzatore', obbligatorio: true },
      { id: 'coppie', testo: 'C_m concorde con ω_m, C_u opposta a ω_u', obbligatorio: true },
      { id: 'ridotto', testo: 'schema ridotto: un solo albero con I_m + τ²I_u/η e coppia resistente τC_u/η', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'C_m\\,\\omega_m - C_u\\,\\omega_u = I_m\\,\\dot\\omega_m\\,\\omega_m + I_u\\,\\dot\\omega_u\\,\\omega_u \\quad (\\eta = 1); \\qquad \\eta\\,(C_m - I_m\\dot\\omega_m)\\,\\omega_m = (C_u + I_u\\dot\\omega_u)\\,\\omega_u',
    spiegazione: 'Teorema delle forze vive con le due velocità; con rendimento, bilancio di potenza della trasmissione in moto diretto (la riga con η della dispensa va corretta così, NF-28).',
    fonte: P201,
    correzione: { nf: 'NF-28', dispensaScrive: '\\eta\\,C_m\\omega_m - C_u\\omega_u = I_m\\dot\\omega_m\\omega_m + I_u\\dot\\omega_u\\omega_u' },
  },
  dimostrazioni: ['d105', 'd106', 'd107'],
  significato:
    'Ridurre all\'albero motore trasforma il problema nell\'accoppiamento diretto: valgono regime, stabilità e transitorio di prima, con C_u sostituita da τC_u/η e I_u da τ²I_u/η. Un riduttore (τ < 1) fa vedere al motore un carico molto più leggero, in coppia e ancora di più in inerzia, ed è per questo che permette di avviare carichi pesanti con motori piccoli e veloci; il rendimento peggiora entrambe le cose di 1/η. Il rapporto migliore per accelerare il carico rende l\'inerzia ridotta uguale a quella del motore.',
  fraseDaRicordare: 'Coppia ridotta τC_u/η, inerzia ridotta τ²I_u/η; a regime C_m = τC_u/η.',
  daNonDire: [
    { frase: 'L\'inerzia del carico si riporta al motore moltiplicandola per τ.', perche: 'Si riporta con τ² (energia cinetica quadratica nella velocità); è la coppia che si riporta con τ.', fonte: P201 },
    { frase: 'Con il rendimento scrivo η C_m ω_m − C_u ω_u = I_m ω̇_m ω_m + I_u ω̇_u ω_u.', perche: 'È la riga della dispensa, che non porta al suo risultato (NF-28): η va sulla potenza che attraversa la trasmissione, η(C_m − I_m ω̇_m)ω_m = (C_u + I_u ω̇_u)ω_u.', fonte: P201 },
    { frase: 'Il rendimento cambia solo la coppia riportata.', perche: 'Cambia anche l\'inerzia riportata: τ²I_u/η (NF-225).', fonte: P201 },
    { frase: 'Il rapporto ottimo è quello che massimizza ω̇_m.', perche: 'ω̇_m è massima per τ → 0, quando il carico non si muove: si massimizza ω̇_u = τ ω̇_m (NF-29).' , fonte: DED107 },
    { frase: 'A regime C_m = C_u.', perche: 'Con la trasmissione C_m = τ C_u (η = 1): le coppie sono uguali solo se τ = 1.', fonte: P201 },
    { frase: 'L\'inerzia ridotta è I_u/τ².', perche: 'Vale con i = ω_m/ω_u delle fonti derivate (I_u/i²); con il τ = ω_u/ω_m della dispensa è I_u τ² (NF-09).', fonte: P201 },
  ],
  approfondimenti: [
    { domanda: 'Perché la coppia si riporta con τ e l\'inerzia con τ²?', tipo: 'approfondimento', attesa: 'La coppia si riporta conservando la potenza, che è lineare in ω (C_u ω_u = τC_u ω_m); l\'inerzia conservando l\'energia cinetica, che è quadratica (½I_u ω_u² = ½ τ²I_u ω_m²).', fonte: { tipo: 'dispensa', pag: [196, 201] } },
    { domanda: 'Perché il rendimento divide anche l\'inerzia?', tipo: 'approfondimento', attesa: 'Anche la potenza che serve ad accelerare I_u passa per la trasmissione e ne perde una parte: il motore deve fornirne 1/η volte tanto. Solo I_m, che sta prima della trasmissione, non è toccata.', fonte: P201 },
    { domanda: 'E se il flusso di potenza si inverte (moto retrogrado)?', tipo: 'collegamento', argomento: 'c5-rendimento-ordinario', attesa: 'Il rendimento passa dall\'altra parte: (C_m − I_m ω̇_m)ω_m = η(C_u + I_u ω̇_u)ω_u, con le coppie con il loro segno; coppia e inerzia ridotte diventano ητC_u e ητ²I_u.', fonte: { tipo: 'deduzione', da: 'p. 201 e rotismi (moto diretto e retrogrado)', spiegazione: 'stesso bilancio di potenza con la potenza che entra nella trasmissione dal lato utilizzatore' } },
    { domanda: 'Mi fa l\'esempio numerico della dispensa?', tipo: 'approfondimento', attesa: `E4/2: τ = 1/2, C_m = 45 − 0,06 ω_m, C_u = 0,8 ω_u. Regime C_mo − k_m ω_m = τ²k_u ω_m ⇒ ω_m = 45/0,26 ≈ ${E42.wm.toFixed(1).replace('.', ',')} rad/s, ω_u ≈ ${E42.wu.toFixed(1).replace('.', ',')} rad/s, C_m ≈ ${E42.Cm.toFixed(2).replace('.', ',')} N m, W ≈ 5,99 kW.`, fonte: P201 },
    { domanda: 'Che rapporto scegli per accelerare al massimo il carico?', tipo: 'approfondimento', attesa: 'Quello che massimizza ω̇_u = τ(C_m − τC_u)/(I_m + τ²I_u); senza coppia resistente τ_opt = √(I_m/I_u), cioè inerzia del carico ridotta uguale a quella del motore. Non è nella dispensa.', fonte: DED107 },
    { domanda: 'Perché un riduttore aiuta l\'avviamento?', tipo: 'approfondimento', attesa: 'Con τ < 1 il motore vede la coppia resistente ridotta di τ e l\'inerzia ridotta di τ²: la condizione di avviamento C_m(0) > τC_u(0) è più facile e l\'accelerazione iniziale maggiore. È una deduzione: la dispensa non lo scrive (NF-226).', fonte: { tipo: 'deduzione', da: 'p. 201 e p. 197', spiegazione: 'condizione di avviamento dell\'accoppiamento diretto applicata alle grandezze ridotte' } },
    { domanda: 'Come calcoli l\'inerzia dell\'utilizzatore se ci sono masse che traslano?', tipo: 'approfondimento', attesa: 'Con l\'equivalenza energetica: nell\'ascensore I_u = I_t + (M_cab + M_contr) r_t², perché cabina e contrappeso si muovono con V = ω_u r_t.', fonte: { tipo: 'dispensa', pag: 196 } },
    { domanda: 'Con la frizione questa equazione vale sempre?', tipo: 'collegamento', argomento: 'c6-frizione', attesa: 'Solo dopo la sincronizzazione (aderenza): durante lo strisciamento lato motore e lato utilizzatore hanno velocità non legate da τ e si scrivono due equazioni separate.', fonte: { tipo: 'dispensa', pag: [205, 206] } },
  ],
  simboli: [
    { simbolo: '\\tau', significato: 'rapporto di trasmissione ω_u/ω_m (uscita su entrata)', altrove: 'i = ω_m/ω_u = 1/τ in d105–d107 (NF-09); «a_u» in q09 è un refuso per τ' },
    { simbolo: '\\eta', significato: 'rendimento della trasmissione in moto diretto' },
    { simbolo: '\\omega_m,\\ \\omega_u', significato: 'velocità lato motore e lato utilizzatore' },
    { simbolo: 'I_u^*,\\ C_u^*', significato: 'inerzia e coppia dell\'utilizzatore ridotte all\'albero motore: τ²I_u/η, τC_u/η', altrove: 'J_u,rif = J_u/i², C_u,rif = C_u/(ηi)' },
    { simbolo: 'I_{eq}', significato: 'I_m + τ²I_u (η = 1), come a p. 206 (NF-221)' },
    { simbolo: 'C_{mo},\\ k_m,\\ k_u', significato: 'dati dell\'esempio E4/2: C_m = C_mo − k_m ω_m, C_u = k_u ω_u' },
    { simbolo: '\\tau_{opt}', significato: 'rapporto che massimizza l\'accelerazione del carico (non in D)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c6-tau-ottimo' }, { kind: 'meccanismo', id: 'c6-transitorio', params: { trasmissione: 1 } }],
  previsioni: [
    {
      id: 'c6-tr-inerzia',
      domanda: 'Riduttore con τ = 1/2, rendimento 1: l\'inerzia del carico vista dal motore è…',
      opzioni: ['I_u', 'I_u/2', 'I_u/4', '4 I_u'],
      corretta: 2,
      spiega: 'Si riporta con τ² = 1/4: il motore «vede» un quarto dell\'inerzia del carico.',
      verify: () => {
        const r = ridotte({ Im: 0, Iu: 8, tau: 0.5, Cu: 1 }).IuRid / 8;
        return [1, 0.5, 0.25, 4].findIndex((x) => Math.abs(x - r) < 1e-12);
      },
    },
    {
      id: 'c6-tr-eta',
      domanda: 'Con η = 0,8, rispetto alla trasmissione ideale, l\'inerzia del carico ridotta al motore…',
      opzioni: ['non cambia', 'aumenta del 25 %', 'diminuisce del 20 %', 'aumenta del 20 %'],
      corretta: 1,
      spiega: 'È τ²I_u/η: dividere per 0,8 vuol dire moltiplicare per 1,25. Anche la coppia ridotta cresce del 25 %.',
      verify: () => {
        const a = ridotte({ Im: 0, Iu: 5, tau: 0.3, Cu: 1 }).IuRid, b = ridotte({ Im: 0, Iu: 5, tau: 0.3, eta: 0.8, Cu: 1 }).IuRid;
        return [1, 1.25, 0.8, 1.2].findIndex((x) => Math.abs(x - b / a) < 1e-12);
      },
    },
    {
      id: 'c6-tr-tauopt',
      domanda: 'Carico con coppia resistente trascurabile, I_m = 0,02 kg m², I_u = 2 kg m². Quale τ dà la massima accelerazione del carico?',
      opzioni: ['τ → 0', 'τ = 0,1', 'τ = 1', 'τ = 10'],
      corretta: 1,
      spiega: 'τ_opt = √(I_m/I_u) = √0,01 = 0,1: l\'inerzia ridotta τ²I_u = 0,02 è uguale a quella del motore. τ → 0 massimizza ω̇_m, non ω̇_u (NF-29).',
      verify: () => {
        const p = { Cm: 10, Cu: 0, Im: 0.02, Iu: 2 };
        const t = tauOttimo(p);
        const meglio = [1e-4, 0.1, 1, 10].map((x) => omegaDotCarico(x, p));
        return Math.abs(t - 0.1) < 1e-12 && meglio.indexOf(Math.max(...meglio)) === 1 ? 1 : -1;
      },
      visual: { kind: 'meccanismo', id: 'c6-tau-ottimo' },
    },
    {
      id: 'c6-tr-E42',
      domanda: 'Esempio E4/2: se il riduttore passa da τ = 1/2 a τ = 1/4, la velocità del motore a regime…',
      opzioni: ['aumenta', 'diminuisce', 'resta uguale'],
      corretta: 0,
      spiega: 'ω_m = C_mo/(k_m + τ²k_u): con τ più piccolo il carico ridotto è più leggero e il motore sale di giri (da 173 a circa 409 rad/s), e anche l\'utilizzatore va più veloce (ω_u da 86,5 a circa 102 rad/s).',
      verify: () => {
        const a = regimeE42(DATI_E42).wm, b = regimeE42({ ...DATI_E42, tau: 0.25 }).wm;
        return b > a ? 0 : b < a ? 1 : 2;
      },
    },
  ],
  nf: ['NF-09', 'NF-28', 'NF-29', 'NF-221', 'NF-225', 'NF-226'],
};
