/**
 * C2 · Ribaltamento (domanda q33): blocco spinto (assente nella dispensa, dedotto da p. 68) e autoveicolo in curva
 * (pp. 93–95, 102). Dimostrazioni d027 (deduzione, NF-07) e d034.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { blocco, curva } from '../../engine/c2';
import { arrow, circle, dim, dot, ground, line, poly, svg, text } from '../svg';

// ------------------------------------------------------------------ disegno: blocco (p. 68) e auto vista da dietro (p. 94)
function disegno() {
  const y0 = 222;
  // blocco
  const x0 = 40, w = 110, hb = 110;
  const blk = [
    ground(14, y0, 190, y0),
    poly([[x0, y0], [x0 + w, y0], [x0 + w, y0 - hb], [x0, y0 - hb]], 'soft', true),
    poly([[x0, y0], [x0 + w, y0], [x0 + w, y0 - hb], [x0, y0 - hb]], 'l', true),
    dot(x0 + w / 2, y0 - hb / 2, 'G', 10, -8),
    arrow(x0 + w / 2, y0 - hb / 2, x0 + w / 2, y0 - hb / 2 + 44, 'f', 'Mg', 16, -4),
    arrow(x0 - 30, y0 - hb, x0, y0 - hb, 'f', 'F', -8, -12),
    dim(x0 - 10, y0, x0 - 10, y0 - hb, 'h', 8),
    arrow(x0 + w - 4, y0 + 46, x0 + w - 4, y0, 'f', 'F_N', 18, 30),
    arrow(x0 + w + 30, y0 - 4, x0 + w - 2, y0 - 4, 'f', 'F_T', 6, -12),
    dim(x0, y0 + 14, x0 + w, y0 + 14, 's', -10),
    line(x0 + w / 2, y0 + 4, x0 + w / 2, y0 + 28, 'm', 1),
    text(x0 + w / 2 + 28, y0 + 40, 'b = s/2', { c: 'a', size: 12 }),
    dot(x0 + w, y0, undefined, 0, 0, 'a'),
  ];
  // auto vista da dietro, curva a destra
  const ax = 260, bx = 390, gx = (ax + bx) / 2, gy = 120;
  const car = [
    ground(220, y0, 430, y0),
    poly([[ax - 18, y0 - 26], [ax - 10, gy - 30], [gx - 30, gy - 62], [gx + 30, gy - 62], [bx + 10, gy - 30], [bx + 18, y0 - 26]], 'l', true),
    circle(ax, y0 - 16, 16, 'l'), circle(bx, y0 - 16, 16, 'l'),
    dot(gx, gy, 'G', 10, -10),
    arrow(gx, gy, gx - 70, gy, 'f', 'Mv²/R', -12, -14),
    arrow(gx, gy, gx, gy + 48, 'f', 'Mg', 16, -4),
    dot(ax, y0, 'A', -12, 14), dot(bx, y0, 'B', -14, 14),
    arrow(ax, y0 + 52, ax, y0, 'f', 'F_NS', -26, 40),
    arrow(bx, y0 + 26, bx, y0, 'f', 'F_ND', 28, 14),
    arrow(ax - 34, y0 - 3, ax - 2, y0 - 3, 'f', 'F_TS', -40, -10),
    arrow(bx - 34, y0 - 3, bx - 2, y0 - 3, 'f', 'F_TD', -10, -14),
    dim(ax, y0 + 58, bx, y0 + 58, 'c', -10),
    dim(bx + 34, y0, bx + 34, gy, 'h', -8),
    text(gx, 22, 'curva a destra: D interna', { c: 'm', size: 12 }),
  ];
  return svg(440, 300, [...blk, ...car], 'Ribaltamento: blocco spinto con F a quota h, normale sullo spigolo; auto in curva vista da dietro con forza centrifuga, reazioni sulle ruote esterna (S) e interna (D)');
}

// ------------------------------------------------------------------ d027 ribaltamento del blocco (deduzione da p. 68)
const ded68 = { tipo: 'deduzione', da: 'p. 68 (spostamento della normale b = Fh/Mg)', spiegazione: 'la normale non può uscire dalla base: il limite b = s/2 non è scritto nella dispensa (NF-07, NF-128)' } as const;

export const d027: Dimostrazione = {
  id: 'd027',
  titolo: 'Ribaltamento di un blocco: condizione limite e confronto con lo slittamento',
  enunciato: 'Un blocco di peso Mg e base s è spinto da una forza orizzontale F applicata a quota h. Trovare la forza che lo ribalta e stabilire se ribalta prima di slittare.',
  ipotesi: [
    'blocco rigido su piano rigido, inizialmente fermo; F crescente lentamente (statica)',
    'le pressioni di contatto sono solo di compressione: la loro risultante normale cade dentro la base',
    'aderenza con coefficiente f_ad',
  ],
  sample: (rnd) => {
    const M = U(rnd, 1, 100), g = 9.81, s = U(rnd, 0.2, 1), h = U(rnd, 0.2, 1.5), fad = U(rnd, 0.2, 0.9);
    const Frib = (M * g * s) / (2 * h), Fslip = fad * M * g;
    const F = Math.min(Frib, Fslip) * U(rnd, 0.1, 0.9);
    return { M, g, s, h, fad, F, FN: M * g, b: (F * h) / (M * g), Frib, Fslip };
  },
  passi: [
    {
      id: 'd027.1',
      latex: 'F_T = F, \\qquad F_N = Mg',
      perche: 'Equilibrio alla traslazione del blocco fermo: l\'aderenza bilancia $F$, la normale bilancia il peso.',
      fonte: { tipo: 'dispensa', pag: 68 },
      distrattori: [],
      num: (v) => [v.FN, v.M * v.g],
    },
    {
      id: 'd027.2',
      latex: 'F_N\\,b - F\\,h = 0 \\;\\Rightarrow\\; b = \\dfrac{F\\,h}{Mg}',
      perche: 'Equilibrio alla rotazione rispetto al centro della base: $F$ e $F_T$ formano una coppia di braccio $h$ che va bilanciata spostando la normale di $b$ verso il lato opposto a $F$. La pressione cresce verso quel lato.',
      fonte: { tipo: 'dispensa', pag: 68 },
      chiave: true,
      distrattori: [
        { latex: 'F_N\\,b + F\\,h = 0', errore: 'segno', spiega: 'La normale si sposta dal lato opposto a quello da cui spinge F, proprio per dare un momento contrario a Fh.', num: (v) => [v.FN * v.b + v.F * v.h, 0] },
        { latex: 'b = \\dfrac{Mg\\,h}{F}', errore: 'indice', spiega: 'b cresce con F: è la coppia F h divisa per la normale Mg.', num: (v) => [v.b, (v.M * v.g * v.h) / v.F] },
      ],
      num: (v) => [v.FN * v.b - v.F * v.h, 0],
    },
    {
      id: 'd027.3',
      latex: 'b \\le \\dfrac s2',
      perche: 'Le pressioni sono solo di compressione: la loro risultante non può uscire dalla base. Quando $b$ arriva al bordo la pressione si concentra sullo spigolo e il resto della base si scarica.',
      fonte: ded68,
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: 'b \\le s', errore: 'fattore', spiega: 'b si misura dal centro della base: il bordo è a s/2.' },
        { latex: 'b \\le h', errore: 'concetto', spiega: 'Il limite è geometrico sulla base d\'appoggio, non sull\'altezza.' },
      ],
    },
    {
      id: 'd027.4',
      latex: 'b = \\dfrac s2 \\;\\Rightarrow\\; F_{rib}\\,h = Mg\\,\\dfrac s2 \\;\\Rightarrow\\; F_{rib} = \\dfrac{Mg\\,s}{2h}',
      perche: 'Al limite la normale passa per lo spigolo: è lo stesso che scrivere i momenti rispetto allo spigolo, dove il momento ribaltante $Fh$ uguaglia quello stabilizzante del peso $Mg\\,s/2$.',
      fonte: ded68,
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: 'F_{rib} = \\dfrac{Mg\\,s}{h}', errore: 'fattore', spiega: 'Il peso ha braccio s/2 rispetto allo spigolo, non s.', num: (v) => [v.Frib * v.h, v.M * v.g * v.s] },
        { latex: 'F_{rib} = \\dfrac{Mg\\,h}{2s}', errore: 'indice', spiega: 'Bracci scambiati: F ha braccio h, il peso s/2.', num: (v) => [v.Frib, (v.M * v.g * v.h) / (2 * v.s)] },
      ],
      num: (v) => [v.Frib * v.h, (v.M * v.g * v.s) / 2],
    },
    {
      id: 'd027.5',
      latex: 'F_{slip} = F_{ad,max} = f_{ad}\\,Mg',
      perche: 'L\'altro modo di perdere l\'equilibrio: la tangenziale richiesta $F_T = F$ raggiunge il limite di aderenza.',
      fonte: { tipo: 'dispensa', pag: 69 },
      distrattori: [],
      num: (v) => [v.Fslip, v.fad * v.M * v.g],
    },
    {
      id: 'd027.6',
      latex: '\\dfrac{F_{rib}}{F_{slip}} = \\dfrac{s}{2h\\,f_{ad}} \\;\\Rightarrow\\; \\text{ribalta prima se } \\dfrac{s}{2h} < f_{ad}',
      perche: 'Al crescere di $F$ avviene per primo il fenomeno con la forza critica più bassa. Blocco alto e stretto ($s/2h$ piccolo) su un piano con molta aderenza: ribalta; blocco basso e largo o piano scivoloso: slitta.',
      fonte: { tipo: 'deduzione', da: 'pp. 68–69', spiegazione: 'confronto delle due forze critiche ricavate sopra' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: '\\text{ribalta prima se } \\dfrac{s}{2h} > f_{ad}', errore: 'segno', spiega: 'Se s/2h è grande la forza di ribaltamento è grande: slitta prima.' },
        { latex: '\\text{ribalta prima se } \\dfrac{s}{h} < f_{ad}', errore: 'fattore', spiega: 'Il braccio del peso è s/2.', num: (v) => [v.Frib / v.Fslip, v.s / (v.h * v.fad)] },
      ],
      num: (v) => [v.Frib / v.Fslip, v.s / (2 * v.h * v.fad)],
    },
  ],
  risultato: { latex: 'F_{rib} = \\dfrac{Mg\\,s}{2h}, \\qquad \\text{ribalta prima di slittare se } \\dfrac{s}{2h} < f_{ad}', fonte: ded68 },
  gancio: 'La normale scappa verso lo spigolo di b = Fh/Mg: quando arriva a metà base, il blocco ruota attorno allo spigolo.',
};

// ------------------------------------------------------------------ d034 velocità di ribaltamento in curva (pp. 93–95, 102)
export const d034: Dimostrazione = {
  id: 'd034',
  titolo: 'Velocità limite di ribaltamento in curva',
  enunciato: 'Un autoveicolo percorre a velocità costante v una curva a destra di raggio R. Ricavare la reazione sulla ruota interna e la velocità alla quale il veicolo si ribalta.',
  ipotesi: [
    'moto circolare uniforme di raggio R (v costante); veicolo come corpo rigido visto da dietro',
    'baricentro G a quota h e a metà carreggiata c (braccio del peso c/2, ipotesi implicita nella figura)',
    'S = ruota sinistra = esterna (contatto A), D = ruota destra = interna (contatto B)',
  ],
  sample: (rnd) => {
    const M = U(rnd, 500, 3000), g = 9.81, R = U(rnd, 20, 200), c = U(rnd, 1.2, 2), h = U(rnd, 0.3, 1.5), f = U(rnd, 0.3, 1.1);
    const vrib = Math.sqrt((R * c * g) / (2 * h)), v = vrib * U(rnd, 0.1, 0.95);
    return { M, g, R, c, h, f, v, vrib, vslip: Math.sqrt(f * g * R), omega: v / R, FND: (M * g) / 2 - (M * v * v * h) / (R * c) };
  },
  passi: [
    {
      id: 'd034.1',
      latex: 'a = \\omega^2 R = \\dfrac{V^2}{R}, \\qquad F_{in} = M\\dfrac{V^2}{R}\\ \\text{verso l\'esterno}',
      perche: 'Con velocità costante su una circonferenza ($\\dot\\omega = 0$, centro fisso) la formula del corpo rigido dà la sola accelerazione centripeta $-\\omega^2(A - O)$. La forza d\'inerzia (centrifuga) è applicata in G e spinge verso l\'esterno della curva.',
      fonte: { tipo: 'dispensa', pag: [93, 102] },
      distrattori: [],
      num: (v) => [v.omega ** 2 * v.R, v.v ** 2 / v.R],
    },
    {
      id: 'd034.2',
      latex: 'A:\\ F_{ND}\\,c + M\\dfrac{v^2}{R}\\,h - Mg\\,\\dfrac c2 = 0',
      perche: 'Momenti rispetto al contatto della ruota esterna A (antiorario positivo, vista da dietro): la normale interna ha braccio $c$, la centrifuga braccio $h$ e tende a sollevare la ruota interna, il peso ha braccio $c/2$. Le forze laterali sono a terra e non danno momento.',
      fonte: { tipo: 'dispensa', pag: [94, 95] },
      chiave: true,
      distrattori: [
        { latex: 'F_{ND}\\,c - M\\dfrac{v^2}{R}\\,h - Mg\\,\\dfrac c2 = 0', errore: 'segno', spiega: 'La centrifuga, verso l\'esterno e applicata in alto, ha rispetto ad A lo stesso verso di F_ND: tende a scaricare la ruota interna.', num: (v) => [v.FND * v.c - (v.M * v.v ** 2 * v.h) / v.R - (v.M * v.g * v.c) / 2, 0] },
        { latex: 'F_{ND}\\,c + M\\dfrac{v^2}{R}\\,h - Mg\\,c = 0', errore: 'fattore', spiega: 'G è a metà carreggiata: il peso ha braccio c/2 rispetto ad A.', num: (v) => [v.FND * v.c + (v.M * v.v ** 2 * v.h) / v.R - v.M * v.g * v.c, 0] },
      ],
      num: (v) => [v.FND * v.c + (v.M * v.v ** 2 * v.h) / v.R - (v.M * v.g * v.c) / 2, 0],
    },
    {
      id: 'd034.3',
      latex: 'F_{ND} = \\dfrac{Mg}{2} - \\dfrac{M v^2 h}{R\\,c}',
      perche: 'Si risolve per la normale della ruota interna: parte da metà peso e cala con $v^2$.',
      fonte: { tipo: 'dispensa', pag: 95 },
      distrattori: [
        { latex: 'F_{ND} = \\dfrac{Mg}{2} + \\dfrac{M v^2 h}{R\\,c}', errore: 'convenzione', spiega: 'Questa è la ruota esterna (S). Nella dispensa la curva è a destra: D è l\'interna e si scarica (NF-39).', num: (v) => [v.FND, (v.M * v.g) / 2 + (v.M * v.v ** 2 * v.h) / (v.R * v.c)] },
      ],
      num: (v) => [v.FND, (v.M * v.g) / 2 - (v.M * v.v ** 2 * v.h) / (v.R * v.c)],
    },
    {
      id: 'd034.4',
      latex: 'F_{ND} = 0 \\;\\Rightarrow\\; \\dfrac{Mg}{2} = \\dfrac{M v_{max}^2 h}{R\\,c} \\;\\Rightarrow\\; v_{max} = \\sqrt{\\dfrac{R\\,c\\,g}{2h}}',
      perche: 'Incipiente ribaltamento: la ruota interna si scarica del tutto e il veicolo sta per ruotare attorno alla ruota esterna. La massa si semplifica.',
      fonte: { tipo: 'dispensa', pag: [94, 95] },
      chiave: true,
      distrattori: [
        { latex: 'F_{NS} = 0', errore: 'indice', spiega: 'La ruota esterna si carica: è l\'interna (D, curva a destra) a scaricarsi.' },
        { latex: 'v_{max} = \\sqrt{\\dfrac{R\\,c\\,g}{h}}', errore: 'fattore', spiega: 'Dal peso con braccio c/2 viene il 2 al denominatore.', num: (v) => [(v.M * v.g) / 2 - (v.M * ((v.R * v.c * v.g) / v.h) * v.h) / (v.R * v.c), 0] },
      ],
      num: (v) => [(v.M * v.g) / 2 - (v.M * v.vrib ** 2 * v.h) / (v.R * v.c), 0],
    },
    {
      id: 'd034.5',
      latex: 'v_{max} \\propto \\sqrt{\\dfrac ch}',
      perche: 'Più larga la carreggiata e più basso il baricentro, più alta la velocità di ribaltamento: le Formula 1 (baricentro basso) l\'hanno altissima, i camion (baricentro alto) bassa.',
      fonte: { tipo: 'dispensa', pag: [95, 102] },
      distrattori: [],
    },
    {
      id: 'd034.6',
      latex: '\\dfrac{v_{rib}^2}{v_{slip}^2} = \\dfrac{c}{2h\\,f_{ad}} \\;\\Rightarrow\\; \\text{ribalta prima se } \\dfrac{c}{2h} < f_{ad}',
      perche: 'L\'altra velocità limite è quella di slittamento $v_{slip} = \\sqrt{f_{ad}gR}$: si verifica prima il fenomeno con la velocità critica più bassa. È la stessa condizione del blocco, con la carreggiata al posto della base.',
      fonte: { tipo: 'deduzione', da: 'pp. 94–95', spiegazione: 'rapporto tra v_rib e v_slip, confronto che la dispensa non scrive (NF-123)' },
      aggiunto: true,
      distrattori: [
        { latex: '\\text{ribalta prima se } \\dfrac{c}{2h} > f_{ad}', errore: 'segno', spiega: 'c/2h grande vuol dire v_rib grande: slitta prima.' },
      ],
      num: (v) => [v.vrib ** 2 / v.vslip ** 2, v.c / (2 * v.h * v.f)],
    },
  ],
  risultato: { latex: 'F_{ND} = \\dfrac{Mg}{2} - \\dfrac{Mv^2h}{Rc}, \\qquad v_{max} = \\sqrt{\\dfrac{R\\,c\\,g}{2h}}', fonte: { tipo: 'dispensa', pag: 95 } },
  gancio: 'Ribaltamento = ruota interna scarica: momenti attorno alla ruota esterna, peso con braccio c/2 contro centrifuga con braccio h.',
};

// ------------------------------------------------------------------ argomento
export const ribaltamento: ArgomentoContenuto = {
  id: 'c2-ribaltamento',
  cosaDireSubito:
    'Un corpo appoggiato perde l\'equilibrio in due modi: slitta se la tangenziale richiesta supera f_ad F_N, ribalta se la risultante delle pressioni normali arriva al bordo dell\'appoggio. Per il blocco spinto la normale si sposta di b = Fh/(Mg) e ribalta per b = s/2; per l\'auto in curva la ruota interna si scarica e il ribaltamento arriva a v = √(R c g/2h). Avviene prima il fenomeno con la soglia più bassa.',
  sistemaIpotesi: [
    'Blocco: base s, forza F orizzontale a quota h, peso Mg; aderenza f_ad.',
    'Auto: curva a destra di raggio R a v costante, carreggiata c, baricentro a quota h e a metà carreggiata.',
    'Statica (o dinamica con la forza d\'inerzia in G); pressioni di contatto solo di compressione.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Blocco al limite di ribaltamento (normale sullo spigolo, deduzione da p. 68) e auto in curva vista da dietro (dispensa p. 94).',
    fonte: { tipo: 'dispensa', pag: [68, 94], fig: 'corpo con F (p. 68), veicolo da dietro (p. 94)' },
    elementi: [
      { id: 'blocco', testo: 'blocco con F a quota h, peso Mg in G, base s', obbligatorio: true },
      { id: 'normale', testo: 'normale F_N spostata di b; al limite sullo spigolo (b = s/2)', obbligatorio: true },
      { id: 'auto', testo: 'auto da dietro: G a quota h, carreggiata c, contatti A (esterna) e B (interna)', obbligatorio: true },
      { id: 'centrifuga', testo: 'forza centrifuga Mv²/R in G verso l\'esterno, peso Mg', obbligatorio: true },
      { id: 'reazioni', testo: 'normali F_NS, F_ND e forze laterali F_TS, F_TD verso l\'interno della curva', obbligatorio: true },
      { id: 'polo', testo: 'polo dei momenti nella ruota esterna A', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'F_N\\,b = F\\,h \\quad (b \\le s/2); \\qquad F_{ND}\\,c + M\\dfrac{v^2}{R}h - Mg\\dfrac c2 = 0',
    spiegazione: 'Equilibrio alla rotazione: del blocco rispetto al centro della base (p. 68) e dell\'auto rispetto alla ruota esterna (p. 94). Il ribaltamento è il limite in cui la normale arriva al bordo (blocco) o si annulla sulla ruota interna (auto).',
    fonte: { tipo: 'dispensa', pag: [68, 94] },
  },
  dimostrazioni: ['d027', 'd034'],
  significato:
    'Il ribaltamento è un limite geometrico, lo slittamento un limite d\'attrito: il confronto è sempre tra un rapporto geometrico (s/2h, c/2h) e f_ad. Un veicolo alto e stretto su asfalto con buona aderenza rischia di ribaltarsi prima di slittare; un\'auto bassa slitta prima.',
  fraseDaRicordare: 'Ribalta prima di slittare se (metà base)/(altezza) < f_ad; in curva v_rib = √(R c g/2h), con la ruota interna scarica.',
  daNonDire: [
    { frase: 'Nella dispensa c\'è il ribaltamento del blocco.', perche: 'Non c\'è (NF-07): c\'è solo lo spostamento della normale b = Fh/Mg (p. 68) e il ribaltamento del veicolo in curva. Il blocco si deduce da lì.', fonte: { tipo: 'dispensa', pag: 68 } },
    { frase: 'In curva si scarica la ruota esterna.', perche: 'Si scarica l\'interna: la centrifuga in G spinge verso l\'esterno e carica la ruota esterna.', fonte: { tipo: 'dispensa', pag: 95 } },
    { frase: 'v_rib = √(R c g/h).', perche: 'Il peso ha braccio c/2 rispetto alla ruota esterna: v_rib = √(R c g/2h).', fonte: { tipo: 'dispensa', pag: 95 } },
    { frase: 'Il ribaltamento dipende dalla massa.', perche: 'Nella condizione F_ND = 0 la massa si semplifica: contano R, c, h.', fonte: { tipo: 'dispensa', pag: 95 } },
    { frase: 'Con 4 incognite non si possono trovare le normali.', perche: 'Con l\'equazione dei momenti le normali si trovano; resta indeterminata solo la ripartizione delle forze laterali, che non serve (NF-122).', fonte: { tipo: 'dispensa', pag: 94 } },
  ],
  approfondimenti: [
    {
      domanda: 'Come scrivi la condizione di ribaltamento del blocco senza passare da b?',
      tipo: 'approfondimento',
      attesa: 'Momenti rispetto allo spigolo verso cui ribalta, con il resto della base scarico: F h = Mg s/2, quindi F_rib = Mg s/(2h).',
      fonte: { tipo: 'deduzione', da: 'p. 68', spiegazione: 'polo nello spigolo: la normale vi passa al limite e non dà momento' },
    },
    {
      domanda: 'Che significato ha il rapporto c/h? Esempi?',
      tipo: 'approfondimento',
      attesa: 'v_rib cresce con √(c/h): le Formula 1, con baricentro basso, hanno velocità di ribaltamento altissima; i camion, con baricentro alto, bassa.',
      fonte: { tipo: 'dispensa', pag: [95, 102] },
    },
    {
      domanda: 'Prima di ribaltarsi, come varia la reazione sulla ruota interna?',
      tipo: 'approfondimento',
      attesa: 'F_ND = Mg/2 − Mv²h/(Rc): cala linearmente con v²; quella esterna cresce della stessa quantità, F_NS = Mg/2 + Mv²h/(Rc).',
      fonte: { tipo: 'dispensa', pag: 95 },
    },
    {
      domanda: 'E la moto in curva, perché non si ribalta?',
      tipo: 'approfondimento',
      attesa: 'Le forze agiscono solo in G e nel contatto P: per l\'equilibrio alla rotazione la risultante del contatto deve passare per G, quindi la moto si inclina dell\'angolo di piega con tan α = v²/(gR). Il limite è solo di aderenza: α = φ_ad, v_max = √(f_ad g R).',
      fonte: { tipo: 'dispensa', pag: [95, 96] },
    },
    {
      domanda: 'Come leggi il confronto ribaltamento/slittamento del blocco con il cono d\'aderenza?',
      tipo: 'approfondimento',
      attesa: 'Al limite di ribaltamento la risultante di contatto passa per lo spigolo inclinata di atan(F/Mg) = atan(s/2h): se è dentro il cono (s/2h < f_ad) il blocco non slitta e ribalta.',
      fonte: { tipo: 'deduzione', da: 'pp. 68, 74', spiegazione: 'inclinazione della risultante al limite di ribaltamento confrontata con φ_ad' },
    },
    {
      domanda: 'Qual è l\'altra velocità limite in curva e quale arriva prima?',
      tipo: 'collegamento',
      argomento: 'c2-veicolo',
      attesa: 'Lo slittamento laterale, v_slip = √(f_ad g R), dalla somma delle aderenze; ribalta prima se c/(2h) < f_ad.',
      fonte: { tipo: 'dispensa', pag: 94 },
    },
  ],
  simboli: [
    { simbolo: 'b', significato: 'spostamento della normale dal centro della base (p. 68)', altrove: 'q33 usa b per la larghezza della base' },
    { simbolo: 's', significato: 'larghezza della base del blocco (simbolo dell\'app: la dispensa non tratta il caso)', altrove: 'b in q33' },
    { simbolo: 'h', significato: 'quota di F (blocco) o del baricentro (auto)' },
    { simbolo: 'c', significato: 'carreggiata' },
    { simbolo: 'R', significato: 'raggio della curva', altrove: 'R_v a p. 94 e 96; R_c nelle dimostrazioni' },
    { simbolo: 'F_{NS},\\ F_{ND}', significato: 'normali sulla ruota sinistra (esterna) e destra (interna)', altrove: 'N_int, N_est in q33; d033 tratta D come esterna (NF-39)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c2-curva' }],
  previsioni: [
    {
      id: 'c2-rib-camion',
      domanda: 'Camion con c = 2 m e baricentro a h = 1,5 m su una curva di raggio 50 m con f_ad = 0,8. Aumentando la velocità, che cosa succede prima?',
      opzioni: ['slitta', 'si ribalta', 'i due limiti coincidono', 'nessuno dei due: la massa è grande'],
      corretta: 1,
      spiega: 'c/(2h) = 0,67 < 0,8: v_rib = √(50·2·9,81/3) ≈ 18,1 m/s, v_slip = √(0,8·9,81·50) ≈ 19,8 m/s.',
      verify: () => {
        const r = curva({ M: 10000, R: 50, c: 2, h: 1.5, f: 0.8, v: 10 });
        return r.primo === 'ribaltamento' ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c2-curva' },
    },
    {
      id: 'c2-rib-blocco',
      domanda: 'Blocco con base 0,4 m spinto a 0,5 m d\'altezza su un piano con f_ad = 0,6: aumentando F…',
      opzioni: ['slitta', 'si ribalta', 'slitta e si ribalta insieme', 'non succede nulla'],
      corretta: 1,
      spiega: 's/(2h) = 0,4 < 0,6: la forza di ribaltamento (0,4 Mg) arriva prima di quella di slittamento (0,6 Mg).',
      verify: () => (blocco({ M: 10, s: 0.4, h: 0.5, fad: 0.6, F: 1 }).primo === 'ribalta' ? 1 : 0),
    },
  ],
  nf: ['NF-07', 'NF-39', 'NF-122', 'NF-123', 'NF-128'],
};
