/**
 * C5 parte b · Differenziale automobilistico (domanda q17). Dispensa pp. 176–178 (scansione del libro, Fig. 5-52, 5-53),
 * con le coppie di p. 177 (richiamo alla (5.59), cioè alle relazioni di p. 179). Dimostrazione d141.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { arc, arrow, dim, dot, line, rect, rot, svg, text } from '../svg';
import { differenziale as diff } from '../../engine/c5b';

// ------------------------------------------------------------------ disegno (Fig. 5-53, p. 178)
function disegno() {
  const ox = 46, oy = 250, s = 1.0;
  const R = 200 * s, p = 116 * s, k = 0.62;
  const x1 = ox + R - p / 2, xm = ox + R, x2 = ox + R + p / 2;
  const parts: string[] = [
    line(ox - 8, oy, ox + 8, oy, 'l', 2), line(ox, oy - 8, ox, oy + 8, 'l', 2),
    text(ox, oy + 20, 'centro', { c: 'm', size: 12 }),
    rot(ox, oy, 26, 10, 80, 'v', 'ω_V'),
    // traiettorie (archi centrati nel centro della curva)
    arc(ox, oy, R - p / 2, 0, 38, 'd'), arc(ox, oy, R, 0, 38, 'd'), arc(ox, oy, R + p / 2, 0, 34, 'd'),
    line(ox, oy, x2 + 6, oy, 'm', 1),
    // ruote in pianta
    rect(x1 - 7, oy - 22, 14, 44, 'l'), rect(x2 - 7, oy - 22, 14, 44, 'l'),
    line(x1 + 7, oy, x2 - 7, oy, 'l', 3),
    dot(xm, oy, 'M', 0, 16),
    // velocità dei centri: distribuzione lineare con la distanza dal centro
    arrow(x1, oy, x1, oy - k * (R - p / 2), 'v', 'V₁', -16, 4),
    arrow(xm, oy, xm, oy - k * R, 'v', 'V_M', -18, 4),
    arrow(x2, oy, x2, oy - k * (R + p / 2), 'v', 'V₂', 16, 4),
    line(ox, oy, x2 + 20, oy - k * (R + p / 2 + 20), 'd'),
    text(x1, oy + 36, '1 interna', { size: 12 }), text(x2, oy + 36, '2 esterna', { size: 12 }),
    dim(x1, oy + 48, x2, oy + 48, 'p', 12),
    dim(ox, oy + 74, xm, oy + 74, 'R', 12),
    dim(x2 + 14, oy - 22, x2 + 14, oy + 22, 'd', -12),
  ];
  return svg(400, 350, parts, 'Velocità dei centri delle ruote di un veicolo in curva: V₁ < V_M < V₂, distribuzione lineare');
}

// ------------------------------------------------------------------ d141
const P176 = { tipo: 'dispensa', pag: 176 } as const;
const P177 = { tipo: 'dispensa', pag: 177 } as const;

export const d141: Dimostrazione = {
  id: 'd141',
  titolo: 'Differenziale automobilistico',
  enunciato: 'Ricavare la velocità del portatreno di un differenziale in funzione di quelle dei due semiassi, le coppie sui solari e le velocità delle ruote motrici in rettilineo e in curva.',
  ipotesi: [
    'rotismo epicicloidale ad ingranaggi conici: solari 1 e 2 uguali (ruote dei semiassi), planetari 3 e 4 identici su un perno del portatreno P',
    'il portatreno è solidale alla corona conica mossa dal pignone del motore',
    'ruote che rotolano senza strisciare, diametro d, carreggiata p; R raggio della traiettoria del punto medio M',
    'per le coppie: regime e η = 1 (relazioni di p. 179)',
  ],
  sample: (rnd) => {
    const VM = U(rnd, 3, 30), R = U(rnd, 4, 60), p = U(rnd, 1.2, 1.8), d = U(rnd, 0.5, 0.8);
    const zs = U(rnd, 14, 22), zp = U(rnd, 9, 13);
    const r = diff({ VM, R, p, d, zs, zp });
    const wV = VM / R, V1 = wV * (R - p / 2), V2 = wV * (R + p / 2);
    const w1 = (2 * V1) / d, w2 = (2 * V2) / d;
    const W = (w2 + w1) / 2; // dal Willis con τ_w = −1
    const C1 = U(rnd, 50, 400), tw = -1, C2 = -C1 / tw, Cp = -(C1 + C2);
    const wr = (2 * VM) / d; // rettilineo
    return { VM, R, p, d, zs, zp, wV, V1, V2, w1, w2, W, C1, C2, Cp, tw, wr, Wr: (wr + wr) / 2, spin: r.spin, Wengine: r.W };
  },
  passi: [
    {
      id: 'd141.1',
      latex: '\\tau_w = \\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega} = -1 \\quad (\\text{portatreno fisso})',
      perche: 'Reso ordinario (portatreno fermo), il moto passa dal solare 1 al planetario e da questo al solare 2: i due solari sono uguali e, visti lungo il loro asse comune, girano in versi opposti. Il rapporto vale $-1$.',
      fonte: P176,
      distrattori: [],
      num: (v) => [(v.w2 - v.W) / (v.w1 - v.W), v.tw],
    },
    {
      id: 'd141.2',
      latex: '\\omega_2 - \\Omega = -(\\omega_1 - \\Omega) \\;\\Rightarrow\\; \\Omega = \\dfrac{\\omega_1 + \\omega_2}{2}',
      perche: 'Si risolve Willis rispetto a $\\Omega$: $2\\Omega = \\omega_1 + \\omega_2$. La velocità del portatreno è la **semisomma** di quelle delle due ruote.',
      fonte: P176,
      chiave: true,
      distrattori: [
        { latex: '\\Omega = \\dfrac{\\omega_2 - \\omega_1}{2}', errore: 'segno', spiega: 'Portando −Ω a destra: ω₂ + ω₁ = 2Ω. La semidifferenza è la velocità relativa dei solari rispetto al portatreno, non Ω.', num: (v) => [v.W, (v.w2 - v.w1) / 2] },
        { latex: '\\Omega = \\omega_1 + \\omega_2', errore: 'fattore', spiega: 'Da ω₂ − Ω = −ω₁ + Ω si ha 2Ω = ω₁ + ω₂: manca il fattore ½.', num: (v) => [v.W, v.w1 + v.w2] },
        { latex: '\\Omega = \\dfrac{\\omega_1 + \\omega_2}{2} \\text{ con } \\tau_w = +1', errore: 'concetto', spiega: 'Con τ_w = +1 Willis darebbe ω₁ = ω₂ sempre: niente differenziale. I solari, a portatreno fermo, girano in versi opposti: τ_w = −1.' },
      ],
      num: (v) => [v.W, (v.w1 + v.w2) / 2],
    },
    {
      id: 'd141.3',
      latex: '\\dfrac{C_2}{C_1} = -\\dfrac{1}{\\tau_w} = 1',
      perche: 'Dalla relazione fra le coppie di un epicicloidale qualunque ($C_1/C_2 = -\\tau_W$, p. 179; la dispensa la richiama come (5.59)): a regime le coppie sulle due ruote sono **sempre uguali**, in rettilineo e in curva.',
      fonte: P177,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{C_2}{C_1} = \\dfrac{\\omega_1}{\\omega_2}', errore: 'concetto', spiega: 'I rapporti fra le coppie non dipendono dalle velocità (partitore di coppia): la ruota esterna, più veloce, non riceve meno coppia.', num: (v) => [v.C2 / v.C1, v.w1 / v.w2] },
        { latex: '\\dfrac{C_2}{C_1} = -1', errore: 'segno', spiega: 'C₂/C₁ = −1/τ_w con τ_w = −1: le due coppie hanno lo stesso segno, spingono entrambe le ruote.', num: (v) => [v.C2 / v.C1, -1] },
      ],
      num: (v) => [v.C2 / v.C1, 1],
    },
    {
      id: 'd141.4',
      latex: 'C_p = -(C_1 + C_2) = -2C_1',
      perche: 'Equilibrio alla rotazione dell\'intero rotismo: la coppia del portatreno (che arriva dalla corona conica) si divide in parti uguali sui due semiassi.',
      fonte: P177,
      distrattori: [
        { latex: 'C_p = -C_1', errore: 'fattore', spiega: 'Il portatreno equilibra entrambe le coppie dei solari: C_p = −(C₁ + C₂) = −2C₁.', num: (v) => [v.Cp, -v.C1] },
      ],
      num: (v) => [v.Cp, -2 * v.C1],
    },
    {
      id: 'd141.5',
      latex: '\\text{rettilineo: } \\omega_1 = \\omega_2 \\;\\Rightarrow\\; \\omega_1 = \\omega_2 = \\Omega,\\ \\ \\omega_1 - \\Omega = 0',
      perche: 'Le due ruote percorrono lo stesso spazio: uguali le velocità dei solari, quindi uguali a quella del portatreno. I planetari non ruotano attorno al proprio asse: sono solo trascinati, e il differenziale gira come un blocco unico.',
      fonte: P177,
      distrattori: [],
      num: (v) => [v.wr, v.Wr],
    },
    {
      id: 'd141.6',
      latex: 'V_1 = \\omega_V\\Big(R - \\dfrac p2\\Big), \\qquad V_M = \\omega_V R, \\qquad V_2 = \\omega_V\\Big(R + \\dfrac p2\\Big)',
      perche: 'In curva il veicolo ruota attorno al centro della traiettoria con velocità $\\omega_V$: le velocità dei centri delle ruote e del punto medio dell\'asse crescono linearmente con la distanza dal centro (Fig. 5-53).',
      fonte: P177,
      distrattori: [],
      num: (v) => [v.V1 + v.V2, 2 * v.wV * v.R],
    },
    {
      id: 'd141.7',
      latex: '\\omega_1 = \\dfrac{2V_1}{d} = \\dfrac{2V_M}{d}\\Big(1 - \\dfrac{p}{2R}\\Big), \\qquad \\omega_2 = \\dfrac{2V_2}{d} = \\dfrac{2V_M}{d}\\Big(1 + \\dfrac{p}{2R}\\Big)',
      perche: 'Rotolamento senza strisciamento di ciascuna ruota di raggio $d/2$: $V = \\omega\\,d/2$. Si raccoglie $V_M = \\omega_V R$. La ruota interna deve girare più piano dell\'esterna: senza differenziale una delle due striscerebbe.',
      fonte: P177,
      chiave: true,
      distrattori: [
        { latex: '\\omega_1 = \\dfrac{V_1}{d}', errore: 'fattore', spiega: 'd è il diametro: il raggio di rotolamento è d/2, quindi ω = 2V/d.', num: (v) => [v.w1, v.V1 / v.d] },
        { latex: '\\omega_1 = \\dfrac{2V_M}{d}\\Big(1 - \\dfrac{p}{R}\\Big)', errore: 'fattore', spiega: 'Ogni ruota dista p/2 dal punto medio, non p.', num: (v) => [v.w1, ((2 * v.VM) / v.d) * (1 - v.p / v.R)] },
      ],
      num: (v) => [v.w1, ((2 * v.VM) / v.d) * (1 - v.p / (2 * v.R))],
    },
    {
      id: 'd141.8',
      latex: '\\Omega = \\dfrac{\\omega_1 + \\omega_2}{2} = \\dfrac{2V_M}{d}',
      perche: 'Sommando: i termini in $p/2R$ si elidono. Il portatreno gira come girerebbe una ruota posta nel punto medio: il motore «vede» la velocità del veicolo, il differenziale ripartisce la differenza.',
      fonte: P177,
      chiave: true,
      distrattori: [
        { latex: '\\Omega = \\dfrac{2V_2}{d}', errore: 'concetto', spiega: 'Il portatreno va alla media delle due ruote, non alla più veloce.', num: (v) => [v.W, (2 * v.V2) / v.d] },
        { latex: '\\Omega = \\dfrac{2V_M}{d}\\Big(1 + \\dfrac{p}{2R}\\Big)', errore: 'termine-perso', spiega: 'Nella semisomma i termini ±p/2R si elidono.', num: (v) => [v.W, ((2 * v.VM) / v.d) * (1 + v.p / (2 * v.R))] },
      ],
      num: (v) => [v.W, (2 * v.VM) / v.d],
    },
    {
      id: 'd141.9',
      latex: '\\omega_1 - \\Omega = -(\\omega_2 - \\Omega) = -\\dfrac{2V_M}{d}\\,\\dfrac{p}{2R}, \\qquad |\\omega_{3}^{Rel}| = \\dfrac{z_1}{z_3}\\,|\\omega_1 - \\Omega|',
      perche: 'In curva i planetari, oltre a essere trascinati, ruotano attorno al proprio asse: rallentano il solare della ruota interna e accelerano quello della ruota esterna della stessa quantità. La loro rotazione relativa al portatreno è quella del solare scalata dal rapporto dei denti.',
      fonte: { tipo: 'deduzione', da: 'p. 178 (testo) e pp. 174, 177', spiegazione: 'la dispensa lo dice a parole; le velocità relative si ricavano dalle righe precedenti e il planetario ingrana con il solare (rapporto z₁/z₃ in modulo)' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.spin, (v.zs / v.zp) * ((2 * v.VM) / v.d) * (v.p / (2 * v.R))],
    },
  ],
  risultato: { latex: '\\Omega = \\dfrac{\\omega_1 + \\omega_2}{2} = \\dfrac{2V_M}{d}, \\qquad C_1 = C_2 = -\\dfrac{C_p}{2}', fonte: { tipo: 'dispensa', pag: [176, 177] } },
  gancio: 'τ_w = −1: il portatreno va alla media delle ruote e divide la coppia a metà.',
};

// ------------------------------------------------------------------ argomento
export const differenzialeArg: ArgomentoContenuto = {
  id: 'c5-differenziale',
  cosaDireSubito:
    'Il differenziale è un rotismo epicicloidale a ingranaggi conici: i due solari uguali sono calettati sui semiassi, i planetari girano su un perno del portatreno, e il portatreno è solidale alla corona conica mossa dal pignone. Serve perché in curva la ruota interna deve girare più piano dell\'esterna senza strisciare. A portatreno fermo τ_w = −1, quindi Ω = (ω₁ + ω₂)/2.',
  sistemaIpotesi: [
    'Sistema: solari conici 1 e 2 uguali (semiassi), planetari 3 e 4 identici, portatreno P solidale alla corona conica.',
    'Ruote del veicolo di diametro d, carreggiata p, rotolamento senza strisciamento.',
    'Curva: rotazione ω_V attorno al centro della traiettoria, R raggio del punto medio dell\'asse.',
    'Coppie a regime, η = 1.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Velocità dei centri delle ruote in curva (Fig. 5-53, p. 178): distribuzione lineare dal centro della traiettoria, V₁ < V_M < V₂.',
    fonte: { tipo: 'dispensa', pag: 178, fig: 'Fig. 5-53' },
    elementi: [
      { id: 'centro', testo: 'centro della traiettoria con ω_V', obbligatorio: true },
      { id: 'ruote', testo: 'due ruote in pianta, interna 1 ed esterna 2, carreggiata p', obbligatorio: true },
      { id: 'M', testo: 'punto medio M dell\'asse a distanza R dal centro', obbligatorio: true },
      { id: 'velocita', testo: 'V₁, V_M, V₂ con gli estremi allineati sulla retta dal centro', obbligatorio: true },
      { id: 'd', testo: 'diametro d delle ruote', obbligatorio: false },
      { id: 'schema', testo: 'schema del rotismo: solari 1, 2 sui semiassi, planetari 3, 4, portatreno con corona conica (Fig. 5-52)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\dfrac{\\omega_2 - \\Omega}{\\omega_1 - \\Omega} = \\tau_w = -1',
    spiegazione: 'Willis per il rotismo reso ordinario: i solari uguali, attraverso il planetario, girano in versi opposti.',
    fonte: { tipo: 'dispensa', pag: 176 },
  },
  dimostrazioni: ['d141'],
  significato:
    'Il portatreno impone solo la media delle velocità delle ruote: in rettilineo il differenziale gira come un blocco, in curva i planetari ruotano sul proprio asse e spostano velocità dalla ruota interna all\'esterna. Le coppie invece restano sempre uguali sulle due ruote: il differenziale divide la coppia a metà, qualunque sia la curva.',
  fraseDaRicordare: 'Ω = (ω₁ + ω₂)/2 = 2V_M/d e C₁ = C₂: il differenziale media le velocità e divide la coppia a metà.',
  daNonDire: [
    { frase: 'In curva la ruota esterna riceve più coppia perché gira più veloce.', perche: 'C₂/C₁ = −1/τ_w = 1 sempre: i rapporti fra le coppie non dipendono dalle velocità (p. 179).', fonte: { tipo: 'dispensa', pag: 177 } },
    { frase: 'A portatreno fermo i due solari girano nello stesso verso (τ_w = +1).', perche: 'Il planetario inverte il verso: τ_w = −1. Con +1 le ruote non potrebbero avere velocità diverse.', fonte: { tipo: 'dispensa', pag: 176 } },
    { frase: 'In rettilineo i satelliti girano sul proprio asse.', perche: 'In rettilineo ω₁ = ω₂ = Ω: i planetari sono solo trascinati dal portatreno.', fonte: { tipo: 'dispensa', pag: 177 } },
    { frase: 'La limitazione della ruota sul ghiaccio è nella dispensa.', perche: 'Non c\'è (NF-07): è una conseguenza delle coppie uguali che si può dire come deduzione, dichiarandola.', fonte: { tipo: 'dispensa', pag: [176, 178] } },
  ],
  approfondimenti: [
    { domanda: 'Perché la ruota interna deve girare più piano?', tipo: 'collegamento', argomento: 'c2-veicolo', attesa: 'In curva il veicolo ruota attorno al centro della traiettoria: V₁ = ω_V(R − p/2) < V₂ = ω_V(R + p/2). Con il rotolamento senza strisciamento ω₁ = 2V₁/d < ω₂.', fonte: { tipo: 'dispensa', pag: [177, 178] } },
    { domanda: 'Da dove viene τ_w = −1 e che relazione usi per le coppie?', tipo: 'collegamento', argomento: 'c5-epicicloidali', attesa: 'Willis a portatreno fermo con solari uguali (versi opposti). Le coppie da C₁/C₂ = −τ_W di p. 179, che con τ_w = −1 dà C₂ = C₁ e C_p = −2C₁.', fonte: { tipo: 'dispensa', pag: [177, 179] } },
    { domanda: 'Che tipo di ingranaggi ci sono e perché?', tipo: 'collegamento', argomento: 'c5-coniche', attesa: 'Ingranaggi conici: il moto arriva dall\'albero di trasmissione longitudinale e va ai semiassi trasversali, assi concorrenti a 90°. Pignone conico → corona conica solidale al portatreno; solari e planetari conici.', fonte: { tipo: 'dispensa', pag: [176, 190] } },
    { domanda: 'Se una ruota motrice è sollevata e frenata ferma, quanto gira l\'altra?', tipo: 'approfondimento', attesa: 'Con ω₁ = 0, Ω = ω₂/2: l\'altra gira al doppio del portatreno.', fonte: { tipo: 'deduzione', da: 'p. 176', spiegazione: 'Ω = (ω₁ + ω₂)/2 con ω₁ = 0' } },
    { domanda: 'Che succede se una ruota è sul ghiaccio?', tipo: 'approfondimento', attesa: 'Le coppie sono uguali: la ruota sul ghiaccio trasmette poca coppia e quindi anche l\'altra ne riceve poca; la ruota sul ghiaccio slitta. Servono bloccaggi o differenziali autobloccanti. Non è nella dispensa.', fonte: { tipo: 'esterna', ref: 'trattazione classica del differenziale aperto (limitazione di trazione)', nota: 'conseguenza di C₁ = C₂ (p. 177), non trattata nella dispensa (NF-07)' } },
    { domanda: 'Che cosa fanno i planetari in curva?', tipo: 'approfondimento', attesa: 'Oltre a essere trascinati dal portatreno ruotano attorno al proprio asse, diminuendo la velocità del solare della ruota interna e aumentando quella dell\'esterna della stessa quantità.', fonte: { tipo: 'dispensa', pag: 178 } },
  ],
  simboli: [
    { simbolo: '\\omega_1,\\ \\omega_2', significato: 'velocità dei solari 1 e 2 (ruota interna ed esterna)', altrove: 'ω_L, ω_R in q17 e d141' },
    { simbolo: '\\Omega', significato: 'velocità del portatreno (scatola, solidale alla corona)', altrove: 'ω_c in d141' },
    { simbolo: '\\tau_w', significato: 'rapporto di Willis del differenziale, −1' },
    { simbolo: '\\omega_V', significato: 'velocità di rotazione del veicolo attorno al centro della traiettoria' },
    { simbolo: 'V_1,\\ V_M,\\ V_2', significato: 'velocità dei centri delle ruote e del punto medio dell\'asse' },
    { simbolo: 'R,\\ p,\\ d', significato: 'raggio della traiettoria di M, carreggiata, diametro delle ruote' },
    { simbolo: '3,\\ 4', significato: 'planetari (i satelliti del differenziale)', altrove: '«satelliti conici» in q17; nell\'immagine della dispensa «satelliti» e «ruota planetaria» per il solare' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5b-differenziale' }],
  previsioni: [
    {
      id: 'c5b-diff-rettilineo',
      domanda: 'In rettilineo, i planetari del differenziale…',
      opzioni: ['ruotano sul proprio asse più veloci del portatreno', 'non ruotano sul proprio asse: sono solo trascinati', 'sono fermi rispetto al telaio', 'ruotano in verso opposto al portatreno'],
      corretta: 1,
      spiega: 'ω₁ = ω₂ = Ω: le velocità relative dei solari sono nulle, quindi anche quelle dei planetari.',
      verify: () => (diff({ VM: 20, R: Infinity, p: 1.5, d: 0.6 }).spin < 1e-12 ? 1 : 0),
      visual: { kind: 'meccanismo', id: 'c5b-differenziale' },
    },
    {
      id: 'c5b-diff-coppie',
      domanda: 'In curva stretta la ruota esterna gira più veloce. La coppia che riceve è…',
      opzioni: ['maggiore di quella della ruota interna', 'minore', 'uguale', 'nulla'],
      corretta: 2,
      spiega: 'C₂/C₁ = −1/τ_w = 1: le coppie non dipendono dalle velocità.',
      verify: () => {
        const tw = diff({ VM: 10, R: 8, p: 1.5, d: 0.6 }).tauW;
        const C2suC1 = -1 / tw;
        return Math.abs(C2suC1 - 1) < 1e-9 ? 2 : C2suC1 > 1 ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c5b-differenziale' },
    },
    {
      id: 'c5b-diff-portatreno',
      domanda: 'Il veicolo entra in curva a velocità V_M costante. La velocità del portatreno…',
      opzioni: ['aumenta', 'diminuisce', 'resta 2V_M/d', 'diventa quella della ruota esterna'],
      corretta: 2,
      spiega: 'Ω = (ω₁ + ω₂)/2 = 2V_M/d: i termini ±p/2R si elidono.',
      verify: () => {
        const a = diff({ VM: 10, R: Infinity, p: 1.5, d: 0.6 }), b = diff({ VM: 10, R: 6, p: 1.5, d: 0.6 });
        return Math.abs(a.W - b.W) < 1e-9 ? 2 : b.W > a.W ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c5b-differenziale' },
    },
  ],
  nf: ['NF-07', 'NF-09', 'NF-204'],
};
