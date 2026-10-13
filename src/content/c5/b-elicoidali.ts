/**
 * C5 parte b · Ruote cilindriche a denti elicoidali (domande q23, q47, q26, q27). Dispensa pp. 185–189.
 *  - c5-elicoidali-presa: geometria (eliche primitiva e fondamentale, grandezze normali) e denti in presa: d095, d139
 *  - c5-elicoidali-zmin: ruota fittizia e numero minimo di denti: d096, d097
 *  - c5-elicoidali-forze: forze scambiate: d098
 * NOTAZIONE DELLA DISPENSA (NF-11): α = angolo d'elica sul cilindro PRIMITIVO, β = sul FONDAMENTALE (tg β = tg α cos θ).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U, radOf } from '../../engine/num';
import { angle, arrow, circle, dim, dot, line, poly, rect, svg, text } from '../svg';
import { dentiInPresa, forzeElicoidali, lineeContatto, zFittizio, zMinElicoidale } from '../../engine/c5b';

// ------------------------------------------------------------------ disegni
/** p. 185 (sviluppo dell'elica sul primitivo e sul fondamentale) e p. 187 (rettangolo dei contatti) */
function disegnoPresa() {
  const parts: string[] = [];
  // sviluppo: cateto orizzontale P_e (lungo l'asse), cateti verticali 2πr_f e 2πr
  const x0 = 24, y0 = 220, pe = 130, h = 150, hf = 0.72 * h; // R_f/R = cos θ, esagerato per leggibilità
  parts.push(
    line(x0, y0, x0 + pe, y0, 'l', 2), line(x0 + pe, y0, x0 + pe, y0 - h, 'l', 2), line(x0 + pe - 5, y0 - hf, x0 + pe + 5, y0 - hf, 'l', 2),
    line(x0, y0, x0 + pe, y0 - h, 'a', 2), line(x0, y0, x0 + pe, y0 - hf, 'd'),
    angle(x0, y0, 38, 0, (Math.atan2(h, pe) * 180) / Math.PI, 'α', 'a'),
    angle(x0, y0, 62, 0, (Math.atan2(hf, pe) * 180) / Math.PI, 'β'),
    text(x0 + pe / 2, y0 + 16, 'P_e passo dell\'elica', { size: 12, c: 'm' }),
    text(x0 + pe + 8, y0 - h + 8, '2πr', { anchor: 'start', size: 13 }),
    text(x0 + pe + 8, y0 - hf + 8, '2πr_f', { anchor: 'start', size: 13, c: 'm' }),
    text(x0 + 60, 40, 'tg β = tg α cos θ', { c: 'a', size: 13 }),
  );
  // rettangolo dei contatti: base b (asse), altezza δ (segmento dei contatti)
  const rx = 230, ry = 70, b = 150, dlt = 120, beta = radOf(22), t = Math.tan(beta);
  const X = (x: number) => rx + x, Y = (y: number) => ry + dlt - y;
  parts.push(rect(rx, ry, b, dlt, 'l'));
  // linee di contatto y = y0 + x tg β, passo pb lungo y
  const pb = 52;
  for (let y0 = dlt; y0 >= -b * t; y0 -= pb) {
    const xa = Math.max(0, -y0 / t), xb = Math.min(b, (dlt - y0) / t);
    if (xb > xa) parts.push(line(X(xa), Y(y0 + xa * t), X(xb), Y(y0 + xb * t), 'a', 2));
  }
  parts.push(
    line(X(0), Y(0), X(b), Y(b * t), 'd'),
    dot(X(0), Y(dlt), 'H', -12, -6), dot(X(b), Y(dlt), 'L', 10, -6), dot(X(0), Y(0), 'M', -12, 8), dot(X(b), Y(0), 'K', 10, 8),
    dot(X(0), Y(dlt - b * t), 'J', -12, 0), dot(X(b), Y(b * t), 'C', 12, 0),
    dim(X(0), ry - 4, X(b), ry - 4, 'b', -12),
    dim(X(0) - 40, Y(0), X(0) - 40, Y(dlt), 'δ', 10),
    dim(X(b) + 6, Y(0), X(b) + 6, Y(b * t), 'CK', 14),
    angle(X(0), Y(0), 30, 0, 22, 'β', 'a'),
    text(rx + b / 2, ry + dlt + 30, 'linee di contatto inclinate di β', { size: 12, c: 'a' }),
  );
  return svg(440, 260, parts, 'Sviluppo delle eliche primitiva e fondamentale; rettangolo dei contatti con linee inclinate di β');
}

/** p. 188: ellisse della sezione normale e circonferenza osculatrice */
function disegnoZmin() {
  const cx = 170, r = 58, al = radOf(35), a = r / Math.cos(al), R = r / Math.cos(al) ** 2;
  const top = 22, ecy = top + r, ccy = top + R;
  const ell: [number, number][] = [];
  for (let k = 0; k <= 72; k++) {
    const t = (k / 72) * 2 * Math.PI;
    ell.push([cx + a * Math.cos(t), ecy + r * Math.sin(t)]);
  }
  const ex = cx + R * Math.cos(radOf(-40)), ey = ccy - R * Math.sin(radOf(-40));
  return svg(400, 220, [
    circle(cx, ccy, R, 'd'),
    poly(ell, 'a', true),
    line(cx - a - 8, ecy, cx + a + 8, ecy, 'm', 1), line(cx, top - 8, cx, ccy + 6, 'm', 1),
    dot(cx, top, 'contatto', 34, -6, 'a'),
    dot(cx, ccy, ''), text(cx - 8, ccy + 2, 'centro osculatrice', { anchor: 'end', size: 12, c: 'm' }),
    text(cx + a / 2, ecy - 10, 'a = r/cos α', { size: 12 }),
    text(cx - 8, ecy - r / 2, 'b = r', { anchor: 'end', size: 12 }),
    line(cx, ccy, ex, ey, 'l'),
    text(ex + 6, ey - 4, 'R = a²/b = r/cos²α', { anchor: 'start', size: 13, c: 'a' }),
    text(cx + R + 6, ccy - 30, 'circonferenza', { anchor: 'start', size: 12, c: 'm' }), text(cx + R + 6, ccy - 14, 'osculatrice', { anchor: 'start', size: 12, c: 'm' }),
  ], 'Sezione normale del cilindro primitivo (ellisse) e circonferenza osculatrice nel punto di contatto');
}

/** p. 189: scomposizione della forza normale F (vista assonometrica) */
function disegnoForze() {
  const ox = 170, oy = 200, al = radOf(25);
  const T: [number, number] = [1, 0], A: [number, number] = [-0.62, -0.42], Rr: [number, number] = [0, -1];
  const P = (q: number, a: number, r: number): [number, number] => [ox + q * T[0] + a * A[0] + r * Rr[0], oy + q * T[1] + a * A[1] + r * Rr[1]];
  const Q = 140, Aa = Q * Math.tan(al), Rv = 70;
  const [qx, qy] = P(Q, 0, 0), [ax, ay] = P(0, Aa, 0), [hx, hy] = P(Q, Aa, 0), [fx, fy] = P(Q, Aa, Rv), [rx, ry] = P(0, 0, Rv);
  const [d1x, d1y] = P(-60 * Math.sin(al), -60 * Math.cos(al), 0), [d2x, d2y] = P(110 * Math.sin(al), 110 * Math.cos(al), 0);
  return svg(400, 260, [
    line(d1x, d1y, d2x, d2y, 'd'), text(d2x - 6, d2y - 8, 'direzione del dente (α dall\'asse)', { size: 11, c: 'm', anchor: 'end' }),
    line(qx, qy, hx, hy, 'd'), line(ax, ay, hx, hy, 'd'), line(hx, hy, fx, fy, 'd'), line(rx, ry, fx, fy, 'd'),
    arrow(ox, oy, qx, qy, 'f', 'Q', 10, 12), arrow(ox, oy, ax, ay, 'f', 'A', -12, -2), arrow(ox, oy, rx, ry, 'f', 'R', -12, 0),
    arrow(ox, oy, hx, hy, 'a', 'H″', 14, 6), arrow(ox, oy, fx, fy, 'a', 'F', 10, -8),
    dot(ox, oy, 'C', -12, 10),
    text(ox + 30, oy - 4, 'α', { c: 'm', size: 13 }), text(ox + 56, oy - 40, 'θ_m', { c: 'm', size: 13 }),
    text(200, 246, 'R = F sin θ_m,  H″ = F cos θ_m,  Q = H″ cos α,  A = H″ sin α', { size: 12 }),
  ], 'Forza normale F fra denti elicoidali scomposta in radiale R, tangenziale Q e assiale A');
}

// ------------------------------------------------------------------ d095 geometria delle elicoidali, modulo normale
const P185 = { tipo: 'dispensa', pag: 185 } as const;
const P186 = { tipo: 'dispensa', pag: 186 } as const;

export const d095: Dimostrazione = {
  id: 'd095',
  titolo: 'Ruote elicoidali: angoli d\'elica, passo e modulo normale, angolo di pressione normale',
  enunciato: 'Ricavare il legame fra l\'angolo d\'elica sul cilindro primitivo α e quello sul fondamentale β, il passo e il modulo normali, e l\'angolo di pressione normale θ_m.',
  ipotesi: [
    'il dente è generato da una retta r solidale al piano Π che rotola sul cilindro fondamentale, inclinata rispetto alle generatrici',
    'stesso passo dell\'elica P_e su tutti i cilindri coassiali (la superficie del dente è elicoidale)',
    'R_f = R cos θ (cilindro fondamentale); α primitivo, β fondamentale (notazione della dispensa, NF-11)',
  ],
  sample: (rnd) => {
    const R = U(rnd, 0.03, 0.15), R2 = U(rnd, 0.03, 0.2), th = radOf(U(rnd, 15, 25)), al = radOf(U(rnd, 8, 35));
    const Pe = (2 * Math.PI * R) / Math.tan(al), Rf = R * Math.cos(th), be = Math.atan((2 * Math.PI * Rf) / Pe);
    const P = U(rnd, 0.005, 0.02), z1 = (2 * Math.PI * R) / P, z2 = (2 * Math.PI * R2) / P, m = P / Math.PI;
    const Pm = P * Math.cos(al), mm = Pm / Math.PI;
    const XY = U(rnd, 1, 2), YZ = XY * Math.tan(th), YT = YZ * Math.cos(al), thm = Math.atan(YT / XY);
    return { R, R2, th, al, Pe, Rf, be, P, z1, z2, m, Pm, mm, XY, YZ, YT, thm };
  },
  passi: [
    {
      id: 'd095.1',
      latex: 'P z_1 = 2\\pi R_1,\\ \\ P z_2 = 2\\pi R_2 \\;\\Rightarrow\\; |\\tau| = \\dfrac{\\omega_2}{\\omega_1} = \\dfrac{R_1}{R_2} = \\dfrac{z_1}{z_2}',
      perche: 'Le relazioni dei denti dritti restano: nel piano frontale (⊥ all\'asse) la ruota elicoidale è una ruota a evolvente come le altre. Il segno, che la dispensa non indica, è quello delle ruote cilindriche (negativo per l\'ingranamento esterno).',
      fonte: P185,
      distrattori: [],
      num: (v) => [v.R / v.R2, v.z1 / v.z2],
    },
    {
      id: 'd095.2',
      latex: '\\operatorname{tg}\\alpha = \\dfrac{2\\pi R}{P_e}',
      perche: 'Si sviluppa il cilindro primitivo sul piano: un giro dell\'elica diventa l\'ipotenusa di un triangolo rettangolo con cateti $2\\pi R$ (circonferenza) e $P_e$ (passo dell\'elica, lungo l\'asse). $\\alpha$ è l\'angolo rispetto all\'asse.',
      fonte: P185,
      distrattori: [],
      num: (v) => [Math.tan(v.al), (2 * Math.PI * v.R) / v.Pe],
    },
    {
      id: 'd095.3',
      latex: '\\operatorname{tg}\\beta = \\dfrac{2\\pi R_f}{P_e}',
      perche: 'Lo stesso sul cilindro fondamentale: la superficie del dente è elicoidale, quindi il passo dell\'elica è lo stesso, ma la circonferenza è più piccola.',
      fonte: P185,
      distrattori: [],
      num: (v) => [Math.tan(v.be), (2 * Math.PI * v.Rf) / v.Pe],
    },
    {
      id: 'd095.4',
      latex: '\\dfrac{R}{R_f} = \\dfrac{\\operatorname{tg}\\alpha}{\\operatorname{tg}\\beta} = \\dfrac{1}{\\cos\\theta} \\;\\Rightarrow\\; \\operatorname{tg}\\beta = \\operatorname{tg}\\alpha\\cos\\theta',
      perche: 'Si dividono le due righe e si usa $R_f = R\\cos\\theta$. L\'elica sul fondamentale è meno inclinata di quella sul primitivo. Attenzione: è la notazione della dispensa, opposta a quella usuale (β primitivo, β_b di base).',
      fonte: P185,
      chiave: true,
      distrattori: [
        { latex: '\\operatorname{tg}\\alpha = \\operatorname{tg}\\beta\\cos\\theta', errore: 'indice', spiega: 'Nella dispensa α è sul primitivo (il cilindro più grande, elica più inclinata): tg β = tg α cos θ (NF-11).', num: (v) => [Math.tan(v.be), Math.tan(v.al) / Math.cos(v.th)] },
        { latex: '\\beta = \\alpha', errore: 'concetto', spiega: 'Il passo dell\'elica è lo stesso, le circonferenze no: l\'inclinazione cambia con il raggio.', num: (v) => [v.be, v.al] },
        { latex: '\\cos\\beta = \\cos\\alpha\\cos\\theta', errore: 'concetto', spiega: 'Il rapporto R_f/R = cos θ lega le tangenti (cateti 2πR e 2πR_f sullo stesso P_e), non i coseni.', num: (v) => [Math.cos(v.be), Math.cos(v.al) * Math.cos(v.th)] },
      ],
      num: (v) => [Math.tan(v.be), Math.tan(v.al) * Math.cos(v.th)],
    },
    {
      id: 'd095.5',
      latex: 'P_m = P\\cos\\alpha',
      perche: 'Si guarda la dentiera limite (denti inclinati di $\\alpha$ sul piano primitivo, figura b di p. 186): la distanza fra due denti successivi misurata perpendicolarmente ai denti è la proiezione del passo frontale $P$.',
      fonte: P186,
      chiave: true,
      distrattori: [
        { latex: 'P_m = \\dfrac{P}{\\cos\\alpha}', errore: 'fattore', spiega: 'Il passo normale è il più corto: è la proiezione di P, non il contrario.', num: (v) => [v.Pm, v.P / Math.cos(v.al)] },
        { latex: 'P_m = P\\cos\\beta', errore: 'indice', spiega: 'Il passo si misura sul primitivo, con l\'angolo α della dispensa. È la formula di d095 letta con il β della dispensa (NF-11).', num: (v) => [v.Pm, v.P * Math.cos(v.be)] },
      ],
      num: (v) => [v.Pm, v.P * Math.cos(v.al)],
    },
    {
      id: 'd095.6',
      latex: 'm_m = \\dfrac{P_m}{\\pi} = m\\cos\\alpha',
      perche: 'Modulo normale, misurato perpendicolarmente al dente; $m = P/\\pi$ è quello frontale (⊥ all\'asse della ruota).',
      fonte: P186,
      distrattori: [],
      num: (v) => [v.mm, v.m * Math.cos(v.al)],
    },
    {
      id: 'd095.7',
      latex: '\\overline{YZ} = \\overline{XY}\\operatorname{tg}\\theta,\\ \\ \\overline{YT} = \\overline{XY}\\operatorname{tg}\\theta_m,\\ \\ \\overline{YT} = \\overline{YZ}\\cos\\alpha \\;\\Rightarrow\\; \\operatorname{tg}\\theta_m = \\operatorname{tg}\\theta\\cos\\alpha',
      perche: 'Prisma di p. 186 (figura a): con la stessa altezza $\\overline{XY}$, il segmento nel piano frontale ($\\overline{YZ}$) e quello nel piano normale ($\\overline{YT}$) stanno come $1 : \\cos\\alpha$. L\'angolo di pressione normale è minore di quello frontale.',
      fonte: P186,
      chiave: true,
      distrattori: [
        { latex: '\\operatorname{tg}\\theta_m = \\dfrac{\\operatorname{tg}\\theta}{\\cos\\alpha}', errore: 'fattore', spiega: '$\\overline{YT}$ è la proiezione di $\\overline{YZ}$ sulla normale al dente: è più corto, quindi θ_m < θ.', num: (v) => [Math.tan(v.thm), Math.tan(v.th) / Math.cos(v.al)] },
        { latex: '\\theta_m = \\theta\\cos\\alpha', errore: 'concetto', spiega: 'Si proiettano segmenti, non angoli: la relazione è fra le tangenti.', num: (v) => [v.thm, v.th * Math.cos(v.al)] },
      ],
      num: (v) => [Math.tan(v.thm), Math.tan(v.th) * Math.cos(v.al)],
    },
  ],
  risultato: { latex: '\\operatorname{tg}\\beta = \\operatorname{tg}\\alpha\\cos\\theta,\\quad P_m = P\\cos\\alpha,\\quad m_m = m\\cos\\alpha,\\quad \\operatorname{tg}\\theta_m = \\operatorname{tg}\\theta\\cos\\alpha', fonte: { tipo: 'dispensa', pag: [185, 186] } },
  gancio: 'Tutto ciò che è «normale» si ottiene dal frontale con cos α; l\'elica sul fondamentale è più dritta: tg β = tg α cos θ.',
};

// ------------------------------------------------------------------ d139 denti in presa
const P187 = { tipo: 'dispensa', pag: 187 } as const;

export const d139: Dimostrazione = {
  id: 'd139',
  titolo: 'Numero di denti in presa delle ruote elicoidali (ricoprimento totale)',
  enunciato: 'Ricavare il numero di denti contemporaneamente in presa di una coppia di ruote elicoidali e confrontarlo con quello dei denti dritti.',
  ipotesi: [
    'rettangolo dei contatti: base b (larghezza di fascia, lungo l\'asse), altezza δ (segmento dei contatti AB sulla retta d\'azione)',
    'linee di contatto inclinate di β (angolo d\'elica sul fondamentale) rispetto all\'asse',
    'due linee di contatto successive distano P cos θ lungo la retta d\'azione',
  ],
  sample: (rnd) => {
    const P = U(rnd, 5, 15), th = radOf(U(rnd, 15, 25)), al = radOf(U(rnd, 10, 30));
    const be = Math.atan(Math.tan(al) * Math.cos(th));
    const b = U(rnd, 10, 60), delta = U(rnd, 1.2, 1.9) * P * Math.cos(th);
    const lc = lineeContatto({ delta, b, beta: be, pb: P * Math.cos(th), s: 0 });
    const CK = lc.deltaE - delta; // dalla geometria del rettangolo (motore)
    const dE = delta + CK, zp = dE / (P * Math.cos(th)), zD = delta / (P * Math.cos(th));
    return { P, th, al, be, b, delta, CK, dE, zp, zD, ea: zD, eb: (b * Math.tan(al)) / P };
  },
  passi: [
    {
      id: 'd139.1',
      latex: 'z_{presa} = \\dfrac{\\overline{AB}}{P\\cos\\theta} \\quad (\\text{denti dritti})',
      perche: 'Richiamo dai denti dritti: lungo la retta d\'azione due coppie di denti successive distano $P\\cos\\theta$; il segmento dei contatti $\\overline{AB}$ ne contiene $z_{presa}$ in media. In 3D le linee di contatto sono parallele all\'asse.',
      fonte: P186,
      distrattori: [],
      num: (v) => [v.zD, v.delta / (v.P * Math.cos(v.th))],
    },
    {
      id: 'd139.2',
      latex: '\\text{linee di contatto inclinate di } \\beta:\\ \\text{il contatto non avviene più contemporaneamente}',
      perche: 'Nell\'elicoidale il dente entra in presa da un\'estremità (punto H) e solo più tardi su tutta la lunghezza (J); comincia a disimpegnarsi in M e finisce in K. «Se entro in presa avanti, non sono ancora entrato dietro.»',
      fonte: P187,
      distrattori: [],
    },
    {
      id: 'd139.3',
      latex: '\\overline{CK} = b\\operatorname{tg}\\beta',
      perche: '$\\overline{CK}$ è il tratto che deve ancora entrare in presa quando il segmento $\\delta$ è finito «avanti»: è il cateto opposto a $\\beta$ nel triangolo di base $b$.',
      fonte: P187,
      distrattori: [],
      num: (v) => [v.CK, v.b * Math.tan(v.be)],
    },
    {
      id: 'd139.4',
      latex: '\\delta_e = \\delta + \\overline{CK} = \\delta + b\\operatorname{tg}\\beta',
      perche: 'Lunghezza effettiva del segmento dei contatti: una linea è in contatto finché tocca il rettangolo, cioè per un\'escursione $\\delta + \\overline{CK}$ lungo la retta d\'azione.',
      fonte: P187,
      chiave: true,
      distrattori: [
        { latex: '\\delta_e = b\\operatorname{tg}\\beta', errore: 'convenzione', spiega: 'In q23/q47 δ_e è il solo allungamento (NF-45); nella dispensa δ_e è la lunghezza effettiva δ + CK.', num: (v) => [v.dE, v.b * Math.tan(v.be)] },
        { latex: '\\delta_e = \\delta + b\\operatorname{tg}\\alpha', errore: 'indice', spiega: 'Le linee di contatto stanno sul piano d\'azione, tangente al cilindro fondamentale: sono inclinate di β, non di α.', num: (v) => [v.dE, v.delta + v.b * Math.tan(v.al)] },
      ],
      num: (v) => [v.dE, v.delta + v.b * Math.tan(v.be)],
    },
    {
      id: 'd139.5',
      latex: 'z_{presa} = \\dfrac{\\delta_e}{P\\cos\\theta} = \\underbrace{\\dfrac{\\delta}{P\\cos\\theta}}_{\\text{denti dritti}} + \\underbrace{\\dfrac{b\\operatorname{tg}\\beta}{P\\cos\\theta}}_{\\text{termine aggiuntivo}}',
      perche: 'Stesso ragionamento dei denti dritti con la lunghezza effettiva: il primo termine è il numero di denti in presa se la ruota fosse a denti dritti, il secondo è l\'aumento dovuto all\'elica.',
      fonte: P187,
      chiave: true,
      distrattori: [
        { latex: 'z_{presa} = \\dfrac{\\delta + b\\operatorname{tg}\\beta}{P}', errore: 'termine-perso', spiega: 'Lungo la retta d\'azione la distanza fra due contatti successivi è P cos θ, non P.', num: (v) => [v.zp, (v.delta + v.b * Math.tan(v.be)) / v.P] },
        { latex: 'z_{presa} = \\dfrac{\\delta}{P\\cos\\theta} + \\dfrac{b\\operatorname{tg}\\alpha}{P\\cos\\theta}', errore: 'indice', spiega: 'Con l\'angolo primitivo α il termine aggiuntivo viene troppo grande di 1/cos θ (NF-207).', num: (v) => [v.zp, v.delta / (v.P * Math.cos(v.th)) + (v.b * Math.tan(v.al)) / (v.P * Math.cos(v.th))] },
      ],
      num: (v) => [v.zp, v.delta / (v.P * Math.cos(v.th)) + (v.b * Math.tan(v.be)) / (v.P * Math.cos(v.th))],
    },
    {
      id: 'd139.6',
      latex: '\\dfrac{b\\operatorname{tg}\\beta}{P\\cos\\theta} = \\dfrac{b\\operatorname{tg}\\alpha}{P}',
      perche: 'Con $\\operatorname{tg}\\beta = \\operatorname{tg}\\alpha\\cos\\theta$ (p. 185) il $\\cos\\theta$ si semplifica: il termine aggiuntivo è la larghezza di fascia «vista» lungo la primitiva, $b\\operatorname{tg}\\alpha$, divisa per il passo.',
      fonte: { tipo: 'deduzione', da: 'pp. 185 e 187', spiegazione: 'sostituendo tg β = tg α cos θ nel termine aggiuntivo di p. 187' },
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{b\\operatorname{tg}\\beta}{P\\cos\\theta} = \\dfrac{b\\operatorname{tg}\\alpha}{P\\cos^2\\theta}', errore: 'fattore', spiega: 'tg β = tg α cos θ: un cos θ si semplifica e non ne resta nessuno.', num: (v) => [(v.b * Math.tan(v.be)) / (v.P * Math.cos(v.th)), (v.b * Math.tan(v.al)) / (v.P * Math.cos(v.th) ** 2)] },
        { latex: '\\dfrac{b\\operatorname{tg}\\beta}{P\\cos\\theta} = \\dfrac{b\\operatorname{tg}\\beta}{P}', errore: 'indice', spiega: 'Togliendo il cos θ bisogna passare all\'angolo primitivo α.', num: (v) => [(v.b * Math.tan(v.be)) / (v.P * Math.cos(v.th)), (v.b * Math.tan(v.be)) / v.P] },
      ],
      num: (v) => [(v.b * Math.tan(v.be)) / (v.P * Math.cos(v.th)), (v.b * Math.tan(v.al)) / v.P],
    },
    {
      id: 'd139.7',
      latex: '\\varepsilon_\\gamma = \\varepsilon_\\alpha + \\varepsilon_\\beta, \\qquad \\varepsilon_\\alpha = \\dfrac{\\delta}{P\\cos\\theta},\\ \\ \\varepsilon_\\beta = \\dfrac{b\\operatorname{tg}\\alpha}{P}',
      perche: 'Nomi usuali (non della dispensa): ricoprimento di profilo $\\varepsilon_\\alpha$ e di fascia $\\varepsilon_\\beta$; la loro somma è il ricoprimento totale, cioè lo $z_{presa}$ della dispensa.',
      fonte: { tipo: 'esterna', ref: 'nomenclatura usuale dei rapporti di ricoprimento (profilo, fascia, totale)', nota: 'la dispensa non usa ε: scrive z_presa come somma di due termini (p. 187); le lettere ε_α, ε_β non hanno niente a che fare con gli angoli α, β della dispensa' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.zp, v.ea + v.eb],
    },
  ],
  risultato: { latex: 'z_{presa} = \\dfrac{\\delta + b\\operatorname{tg}\\beta}{P\\cos\\theta} = \\dfrac{\\delta}{P\\cos\\theta} + \\dfrac{b\\operatorname{tg}\\alpha}{P}', fonte: P187 },
  gancio: 'L\'elica allunga il segmento dei contatti di b tg β: più denti in presa, carico che cambia gradualmente.',
};

// ------------------------------------------------------------------ d096 ruota fittizia
const P188 = { tipo: 'dispensa', pag: 188 } as const;

export const d096: Dimostrazione = {
  id: 'd096',
  titolo: 'Ruota fittizia e numero di denti equivalente',
  enunciato: 'Sostituire la ruota elicoidale, nel piano normale al dente, con una ruota a denti dritti equivalente e ricavarne il numero di denti.',
  ipotesi: [
    'piano perpendicolare all\'elica primitiva (inclinata di α) in un punto generico: taglia il cilindro primitivo in un\'ellisse',
    'contatto supposto all\'estremo dell\'asse minore dell\'ellisse; vicino al contatto l\'ellisse si confonde con la circonferenza osculatrice',
    'nel piano normale il passo è quello normale: modulo m_m = m cos α',
  ],
  sample: (rnd) => {
    const r = U(rnd, 0.03, 0.15), al = radOf(U(rnd, 8, 35)), m = U(rnd, 0.001, 0.005), z = (2 * r) / m;
    const a = r / Math.cos(al), b = r;
    // raggio di curvatura dell'ellisse x = a cos t, y = b sin t nel punto t = π/2 (estremo dell'asse minore)
    const t = Math.PI / 2, rho = (a * a * Math.sin(t) ** 2 + b * b * Math.cos(t) ** 2) ** 1.5 / (a * b);
    const mm = m * Math.cos(al), zf = (2 * rho) / mm;
    return { r, al, m, z, a, b, rho, mm, zf };
  },
  passi: [
    {
      id: 'd096.1',
      latex: 'b = r, \\qquad a = \\dfrac{r}{\\cos\\alpha}',
      perche: 'Il piano normale all\'elica è inclinato di $\\alpha$ rispetto al piano frontale: l\'asse minore dell\'ellisse resta il raggio $r$ del cilindro primitivo, quello maggiore si allunga di $1/\\cos\\alpha$. Due ruote elicoidali in presa sono rappresentabili come due ellissi tangenti.',
      fonte: { tipo: 'dispensa', pag: 187 },
      distrattori: [],
      num: (v) => [v.a, v.r / Math.cos(v.al)],
    },
    {
      id: 'd096.2',
      latex: 'R = \\dfrac{a^2}{b}',
      perche: 'Raggio della circonferenza osculatrice, tangente internamente all\'ellisse nel punto di contatto (estremo dell\'asse minore): è il raggio di curvatura dell\'ellisse in quel punto.',
      fonte: P188,
      chiave: true,
      distrattori: [
        { latex: 'R = \\dfrac{b^2}{a}', errore: 'indice', spiega: 'b²/a è il raggio di curvatura all\'estremo dell\'asse maggiore (dove l\'ellisse è più curva); il contatto è all\'estremo dell\'asse minore.', num: (v) => [v.rho, (v.b * v.b) / v.a] },
        { latex: 'R = a', errore: 'concetto', spiega: 'Il semiasse non è il raggio di curvatura: all\'estremo dell\'asse minore l\'ellisse è più piatta di una circonferenza di raggio a.', num: (v) => [v.rho, v.a] },
      ],
      num: (v) => [v.rho, (v.a * v.a) / v.b],
    },
    {
      id: 'd096.3',
      latex: 'R = \\dfrac{r^2}{\\cos^2\\alpha}\\cdot\\dfrac{1}{r} = \\dfrac{r}{\\cos^2\\alpha}',
      perche: 'Si sostituiscono i semiassi.',
      fonte: P188,
      distrattori: [],
      num: (v) => [v.rho, v.r / Math.cos(v.al) ** 2],
    },
    {
      id: 'd096.4',
      latex: 'm_m\\,z_{fitt} = 2R \\;\\Rightarrow\\; z_{fitt} = \\dfrac{2R}{m_m}',
      perche: 'La circonferenza osculatrice coincide con la primitiva della ruota a denti dritti fittizia; nel piano normale il passo è quello normale, quindi il modulo è $m_m$.',
      fonte: P188,
      chiave: true,
      distrattori: [
        { latex: 'z_{fitt} = \\dfrac{2R}{m}', errore: 'indice', spiega: 'La ruota fittizia sta nel piano normale al dente: il suo modulo è quello normale m_m = m cos α.', num: (v) => [v.zf, (2 * v.rho) / v.m] },
        { latex: 'z_{fitt} = \\dfrac{R}{m_m}', errore: 'fattore', spiega: 'm z = 2R: il diametro primitivo è 2R.', num: (v) => [v.zf, v.rho / v.mm] },
      ],
      num: (v) => [v.zf, (2 * v.rho) / v.mm],
    },
    {
      id: 'd096.5',
      latex: 'm_m = m\\cos\\alpha, \\qquad m = \\dfrac{2r}{z}',
      perche: 'Modulo normale (p. 186) e definizione del modulo frontale della ruota elicoidale ($m z = 2r$).',
      fonte: P188,
      distrattori: [],
      num: (v) => [v.mm, ((2 * v.r) / v.z) * Math.cos(v.al)],
    },
    {
      id: 'd096.6',
      latex: 'z_{fitt} = \\dfrac{2r}{\\cos^2\\alpha}\\cdot\\dfrac{1}{m\\cos\\alpha} = \\dfrac{2r}{m\\cos^3\\alpha} = \\dfrac{z}{\\cos^3\\alpha}',
      perche: 'Si sostituisce: due coseni vengono dal raggio di curvatura, uno dal modulo normale. La ruota fittizia ha **più** denti di quella reale.',
      fonte: P188,
      chiave: true,
      distrattori: [
        { latex: 'z_{fitt} = \\dfrac{z}{\\cos^2\\alpha}', errore: 'termine-perso', spiega: 'Manca il coseno del modulo normale: m_m = m cos α sta al denominatore.', num: (v) => [v.zf, v.z / Math.cos(v.al) ** 2] },
        { latex: 'z_{fitt} = z\\cos^3\\alpha', errore: 'indice', spiega: 'La circonferenza osculatrice è più grande della primitiva reale: z_fitt > z.', num: (v) => [v.zf, v.z * Math.cos(v.al) ** 3] },
        { latex: 'z_{fitt} = \\dfrac{z}{\\cos\\alpha}', errore: 'termine-perso', spiega: 'Mancano i due coseni del raggio di curvatura r/cos²α.', num: (v) => [v.zf, v.z / Math.cos(v.al)] },
      ],
      num: (v) => [v.zf, v.z / Math.cos(v.al) ** 3],
    },
  ],
  risultato: { latex: 'z_{fitt} = \\dfrac{z}{\\cos^3\\alpha}', fonte: P188 },
  gancio: 'Due coseni dalla curvatura dell\'ellisse, uno dal modulo normale: z/cos³α.',
};

// ------------------------------------------------------------------ d097 numero minimo di denti
export const d097: Dimostrazione = {
  id: 'd097',
  titolo: 'Numero minimo di denti delle ruote elicoidali',
  enunciato: 'Ricavare il numero minimo di denti di una ruota elicoidale per evitare l\'interferenza, a partire da quello dei denti dritti.',
  ipotesi: [
    'l\'interferenza si studia sulla ruota fittizia a denti dritti, con l\'angolo di pressione e il modulo normali',
    'z*_min = numero minimo della ruota a denti dritti (dall\'interferenza, pp. 167–168)',
    'α angolo d\'elica sul primitivo',
  ],
  sample: (rnd) => {
    const zs = U(rnd, 14, 32), al = radOf(U(rnd, 8, 35));
    return { zs, al, zmin: zs * Math.cos(al) ** 3 };
  },
  passi: [
    {
      id: 'd097.1',
      latex: 'z_{fitt} \\ge z^{*}_{min}',
      perche: 'Si sfrutta il risultato dei denti dritti: non c\'è interferenza se la ruota a denti dritti equivalente ha almeno $z^*_{min}$ denti.',
      fonte: P188,
      chiave: true,
      distrattori: [],
    },
    {
      id: 'd097.2',
      latex: '\\dfrac{z_{min}}{\\cos^3\\alpha} = z^{*}_{min}',
      perche: 'Al limite la ruota fittizia ha esattamente $z^*_{min}$ denti; con $z_{fitt} = z/\\cos^3\\alpha$ si ricava il numero reale.',
      fonte: P188,
      chiave: true,
      distrattori: [
        { latex: 'z_{min}\\cos^3\\alpha = z^{*}_{min}', errore: 'indice', spiega: 'È la fittizia ad avere più denti della reale: z_fitt = z/cos³α, non z cos³α.', num: (v) => [v.zmin * Math.cos(v.al) ** 3, v.zs] },
        { latex: '\\dfrac{z_{min}}{\\cos\\alpha} = z^{*}_{min}', errore: 'termine-perso', spiega: 'Il numero di denti equivalente ha cos³α (due dalla curvatura, uno dal modulo).', num: (v) => [v.zmin / Math.cos(v.al), v.zs] },
      ],
      num: (v) => [v.zmin / Math.cos(v.al) ** 3, v.zs],
    },
    {
      id: 'd097.3',
      latex: 'z_{min} = z^{*}_{min}\\cos^3\\alpha',
      perche: 'Poiché $\\cos^3\\alpha < 1$, una ruota elicoidale può avere meno denti di una a denti dritti senza interferenza: ruote più piccole a parità di modulo.',
      fonte: P188,
      distrattori: [],
      num: (v) => [v.zmin, v.zs * Math.cos(v.al) ** 3],
    },
    {
      id: 'd097.4',
      latex: '\\theta = 20^\\circ,\\ z^*_{min} = \\dfrac{2}{\\sin^2\\theta} = 17{,}1;\\ \\alpha = 20^\\circ:\\ z_{min} = 17{,}1\\cdot 0{,}830 = 14{,}2 \\Rightarrow 15',
      perche: 'Esempio con il minimo della dentiera di p. 168 (con il $\\sin^2\\theta$ corretto, NF-23). Il numero di denti è intero: si arrotonda **per eccesso** (la dispensa non lo dice, ma è ovvio).',
      fonte: { tipo: 'deduzione', da: 'p. 188 con z*_min di pp. 167–168 (NF-23)', spiegazione: 'z*_min = 2/sin²20° = 17,10 e cos³20° = 0,830; arrotondamento all\'intero superiore' },
      aggiunto: true,
      distrattori: [],
      num: () => [Math.ceil(zMinElicoidale(2 / Math.sin(radOf(20)) ** 2, radOf(20))), 15],
    },
  ],
  risultato: { latex: 'z_{min} = z^{*}_{min}\\cos^3\\alpha', fonte: P188 },
  gancio: 'La fittizia ha z/cos³α denti: basta che sia lei a non interferire, quindi la vera può averne cos³α volte meno.',
};

// ------------------------------------------------------------------ d098 forze scambiate
const P189 = { tipo: 'dispensa', pag: 189 } as const;

export const d098: Dimostrazione = {
  id: 'd098',
  titolo: 'Forze scambiate dalle ruote elicoidali',
  enunciato: 'Scomporre la forza scambiata fra due denti elicoidali in componente radiale, tangenziale e assiale, ed esprimerle in funzione della coppia trasmessa.',
  ipotesi: [
    'attrito fra i denti trascurato: la forza F è perpendicolare alla superficie del dente e giace nel piano normale',
    'θ_m angolo di pressione normale (tg θ_m = tg θ cos α), α angolo d\'elica sul primitivo',
    'forza applicata sul cilindro primitivo di raggio r; C coppia sulla ruota',
  ],
  sample: (rnd) => {
    const C = U(rnd, 10, 500), r = U(rnd, 0.03, 0.15), th = radOf(U(rnd, 15, 25)), al = radOf(U(rnd, 8, 35));
    const thm = Math.atan(Math.tan(th) * Math.cos(al));
    // geometria vettoriale: assi (t tangenziale, a assiale, n radiale); dente lungo h = (sin α, cos α, 0) nel piano tangente
    // F nel piano normale al dente: F = F (cos θ_m · u + sin θ_m · n), u = (cos α, −sin α, 0) ⊥ h nel piano tangente
    const Q = C / r, F = Q / (Math.cos(thm) * Math.cos(al));
    const Fv = [F * Math.cos(thm) * Math.cos(al), -F * Math.cos(thm) * Math.sin(al), F * Math.sin(thm)];
    const H = F * Math.cos(thm);
    const e = forzeElicoidali({ C, r, theta: th, alpha: al });
    return { C, r, th, al, thm, F, Qv: Fv[0], Av: Math.abs(Fv[1]), Rv: Fv[2], H, Re: e.R, Ae: e.A, R0: forzeElicoidali({ C, r, theta: th, alpha: 0 }).R, A0: forzeElicoidali({ C, r, theta: th, alpha: 0 }).A };
  },
  passi: [
    {
      id: 'd098.1',
      latex: 'R = F\\sin\\theta_m, \\qquad H\'\' = F\\cos\\theta_m',
      perche: 'La forza normale al dente giace nel piano normale: si scompone in una componente radiale $R$ e in una $H\'\'$ tangente al cilindro primitivo (ancora nel piano normale), con l\'angolo di pressione normale $\\theta_m$.',
      fonte: P189,
      distrattori: [],
      num: (v) => [v.Rv, v.F * Math.sin(v.thm)],
    },
    {
      id: 'd098.2',
      latex: 'Q = H\'\'\\cos\\alpha, \\qquad A = H\'\'\\sin\\alpha',
      perche: '$H\'\'$ sta nel piano tangente ed è perpendicolare al dente, che è inclinato di $\\alpha$ sull\'asse: quindi forma l\'angolo $\\alpha$ con la direzione tangenziale. Si scompone in tangenziale $Q$ e assiale $A$. È l\'inclinazione del dente a far nascere la spinta assiale.',
      fonte: P189,
      chiave: true,
      distrattori: [
        { latex: 'Q = H\'\'\\sin\\alpha, \\quad A = H\'\'\\cos\\alpha', errore: 'indice', spiega: 'Con α = 0 (denti dritti) la spinta assiale deve sparire: A va con sin α.', num: (v) => [v.Av, v.H * Math.cos(v.al)] },
        { latex: 'A = H\'\'\\operatorname{tg}\\alpha', errore: 'fattore', spiega: 'A è una componente di H″: sin α, non tg α (A = Q tg α, invece, è giusta).', num: (v) => [v.Av, v.H * Math.tan(v.al)] },
      ],
      num: (v) => [v.Av, v.H * Math.sin(v.al)],
    },
    {
      id: 'd098.3',
      latex: 'Q = F\\cos\\theta_m\\cos\\alpha, \\qquad A = F\\cos\\theta_m\\sin\\alpha, \\qquad R = F\\sin\\theta_m',
      perche: 'Si mettono insieme le due scomposizioni.',
      fonte: P189,
      distrattori: [],
      num: (v) => [v.Qv, v.F * Math.cos(v.thm) * Math.cos(v.al)],
    },
    {
      id: 'd098.4',
      latex: '|C| = |Q|\\,r = |F|\\cos\\theta_m\\cos\\alpha\\,r',
      perche: 'Seconda equazione cardinale rispetto all\'asse della ruota: $R$ passa per l\'asse e $A$ gli è parallela, quindi l\'unica componente che dà momento è $Q$, con braccio $r$.',
      fonte: P189,
      chiave: true,
      correzione: { nf: 'NF-27', dispensaScrive: '|C| = |Q|R_1 = |F|\\cos\\theta_m\\cos\\alpha' },
      distrattori: [
        { latex: '|C| = |F|\\cos\\theta_m\\cos\\alpha', errore: 'termine-perso', spiega: 'È la riga della dispensa (NF-27): manca il braccio r.', num: (v) => [v.C, v.F * Math.cos(v.thm) * Math.cos(v.al)] },
        { latex: '|C| = |F|\\,r', errore: 'concetto', spiega: 'Solo la componente tangenziale ha momento rispetto all\'asse.', num: (v) => [v.C, v.F * v.r] },
      ],
      num: (v) => [v.C, v.Qv * v.r],
    },
    {
      id: 'd098.5',
      latex: 'Q = \\dfrac{C}{r}, \\qquad R = \\dfrac{C}{r}\\,\\dfrac{\\operatorname{tg}\\theta_m}{\\cos\\alpha}, \\qquad A = \\dfrac{C}{r}\\operatorname{tg}\\alpha',
      perche: 'Nota la coppia si trova $Q$, poi $F = Q/(\\cos\\theta_m\\cos\\alpha)$ e da questa $R$ e $A$. La spinta assiale è semplicemente $Q\\operatorname{tg}\\alpha$.',
      fonte: P189,
      chiave: true,
      distrattori: [
        { latex: 'A = \\dfrac{C}{r}\\,\\dfrac{\\operatorname{tg}\\alpha}{\\cos\\theta}', errore: 'indice', spiega: 'È la formula di q27 (A = Q tg β / cos θ) letta con l\'angolo primitivo α: va bene solo con l\'angolo di base, tg β = tg α cos θ. Con α è troppo grande di 1/cos θ (NF-11).', num: (v) => [v.Av, ((v.C / v.r) * Math.tan(v.al)) / Math.cos(v.th)] },
        { latex: 'R = \\dfrac{C}{r}\\operatorname{tg}\\theta_m', errore: 'termine-perso', spiega: 'R = F sin θ_m con F = Q/(cos θ_m cos α): resta un 1/cos α.', num: (v) => [v.Rv, (v.C / v.r) * Math.tan(v.thm)] },
      ],
      num: (v) => [v.Av, (v.C / v.r) * Math.tan(v.al)],
    },
    {
      id: 'd098.6',
      latex: '\\operatorname{tg}\\theta_m = \\operatorname{tg}\\theta\\cos\\alpha \\;\\Rightarrow\\; R = \\dfrac{C}{r}\\operatorname{tg}\\theta',
      perche: 'Con l\'angolo di pressione normale di p. 186 la componente radiale è la stessa dei denti dritti con l\'angolo di pressione frontale: è la forma di d098 ($F_r = F_t\\operatorname{tg}\\alpha_t$, con altri simboli).',
      fonte: { tipo: 'deduzione', da: 'pp. 186 e 189', spiegazione: 'sostituendo tg θ_m = tg θ cos α in R = (C/r) tg θ_m / cos α' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Re, (v.C / v.r) * Math.tan(v.th)],
    },
    {
      id: 'd098.7',
      latex: '\\alpha = 0:\\ A = 0,\\ \\ R = Q\\operatorname{tg}\\theta',
      perche: 'Con l\'elica nulla si ritrovano le forze dei denti dritti: niente spinta assiale.',
      fonte: P189,
      distrattori: [],
      num: (v) => [v.R0, (v.C / v.r) * Math.tan(v.th)],
    },
    {
      id: 'd098.8',
      latex: 'F^2 = Q^2 + R^2 + A^2',
      perche: 'Controllo: le tre componenti sono ortogonali e ricompongono la forza normale.',
      fonte: { tipo: 'deduzione', da: 'p. 189', spiegazione: 'somma dei quadrati delle tre componenti ortogonali' },
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.F ** 2, v.Qv ** 2 + v.Rv ** 2 + v.Av ** 2],
    },
  ],
  risultato: { latex: 'Q = \\dfrac{C}{r},\\quad R = \\dfrac{C}{r}\\,\\dfrac{\\operatorname{tg}\\theta_m}{\\cos\\alpha} = \\dfrac{C}{r}\\operatorname{tg}\\theta,\\quad A = \\dfrac{C}{r}\\operatorname{tg}\\alpha', fonte: P189 },
  gancio: 'F nel piano normale: sin θ_m dà R; cos θ_m dà H″, che l\'inclinazione α divide in Q e A = Q tg α.',
};

// ------------------------------------------------------------------ argomenti
const SIMB_ELICA = [
  { simbolo: '\\alpha', significato: 'angolo d\'elica sul cilindro primitivo (rispetto all\'asse)', altrove: 'β in d095–d098 e nei testi usuali (NF-11)' },
  { simbolo: '\\beta', significato: 'angolo d\'elica sul cilindro fondamentale = inclinazione delle linee di contatto', altrove: 'β_b nei testi usuali; q27 lo usa senza dirlo' },
  { simbolo: '\\theta,\\ \\theta_m', significato: 'angolo di pressione frontale e normale', altrove: 'α_t, α_n in d098 (ϑ, ϑ_n nella scansione del libro)' },
  { simbolo: 'P,\\ P_m,\\ P_e', significato: 'passo frontale, passo normale, passo dell\'elica', altrove: 'p, p_n nella figura del libro' },
  { simbolo: 'm,\\ m_m', significato: 'modulo frontale e normale', altrove: 'm_t, m_n in d095, q26 e nella parte battuta di p. 188' },
];

export const elicoidaliPresa: ArgomentoContenuto = {
  id: 'c5-elicoidali-presa',
  cosaDireSubito:
    'Le ruote elicoidali nascono dalle ruote a scalini facendo tendere a infinito le suddivisioni del dente: il dente diventa un\'elica, inclinata di α sul cilindro primitivo e di β sul fondamentale, con tg β = tg α cos θ. Le relazioni cinematiche dei denti dritti restano, ma le linee di contatto sono inclinate di β: il contatto non avviene più contemporaneamente su tutta la fascia, il segmento dei contatti si allunga di b tg β e i denti in presa aumentano.',
  sistemaIpotesi: [
    'Sistema: coppia di ruote cilindriche a denti elicoidali, assi paralleli, eliche di verso opposto (una destrorsa, una sinistrorsa) se l\'ingranamento è esterno.',
    'Denti generati dalla stessa retta r solidale al piano Π che rotola sul cilindro fondamentale.',
    'Notazione della dispensa: α elica sul primitivo, β sul fondamentale, θ pressione frontale, θ_m normale (NF-11).',
    'Rettangolo dei contatti: base b (fascia), altezza δ (segmento dei contatti).',
  ],
  disegno: {
    svg: disegnoPresa(),
    didascalia: 'A sinistra lo sviluppo delle eliche sul primitivo (α) e sul fondamentale (β) (p. 185); a destra il rettangolo dei contatti con le linee inclinate di β e i punti H, J, M, K, C (p. 187).',
    fonte: { tipo: 'dispensa', pag: [185, 187], fig: 'sviluppo dell\'elica (scansione) e rettangolo dei contatti (manoscritto)' },
    elementi: [
      { id: 'sviluppo', testo: 'triangolo dello sviluppo: P_e lungo l\'asse, 2πr e 2πr_f, angoli α e β', obbligatorio: true },
      { id: 'rettangolo', testo: 'rettangolo dei contatti di base b e altezza δ', obbligatorio: true },
      { id: 'linee', testo: 'linee di contatto parallele inclinate di β', obbligatorio: true },
      { id: 'punti', testo: 'H inizio contatto, J contatto su tutta la fascia, M inizio disimpegno, K fine contatto', obbligatorio: false },
      { id: 'CK', testo: 'segmento CK = b tg β sul lato destro', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: 'z_{presa} = \\dfrac{\\delta_e}{P\\cos\\theta}, \\qquad \\delta_e = \\delta + b\\operatorname{tg}\\beta',
    spiegazione: 'Come per i denti dritti, ma con la lunghezza effettiva del segmento dei contatti, allungata dall\'inclinazione delle linee di contatto.',
    fonte: { tipo: 'dispensa', pag: 187 },
  },
  dimostrazioni: ['d095', 'd139'],
  significato:
    'Con i denti dritti il carico passa da una coppia di denti all\'altra di colpo, su tutta la fascia: urti, rumore, vibrazioni. Con l\'elica ogni dente entra in presa gradualmente e ci sono più denti in presa (b tg α/P in più): il carico varia in modo graduale. Il prezzo è la spinta assiale.',
  fraseDaRicordare: 'z_presa = δ/(P cos θ) + b tg β/(P cos θ): il secondo termine, uguale a b tg α/P, è il guadagno dell\'elica.',
  daNonDire: [
    { frase: 'L\'angolo d\'elica è β e tg α = tg β cos θ.', perche: 'Nella dispensa α è l\'elica sul primitivo e β quella sul fondamentale: tg β = tg α cos θ (NF-11).', fonte: { tipo: 'dispensa', pag: 185 } },
    { frase: 'δ_e = b tg β è la lunghezza effettiva.', perche: 'b tg β è solo l\'allungamento CK; la lunghezza effettiva è δ_e = δ + CK (NF-45).', fonte: { tipo: 'dispensa', pag: 187 } },
    { frase: 'Il termine aggiuntivo è b tg α/(P cos θ).', perche: 'Le linee di contatto sono inclinate di β: b tg β/(P cos θ) = b tg α/P. Con α e cos θ insieme si sbaglia di 1/cos θ (NF-207).', fonte: { tipo: 'dispensa', pag: 187 } },
    { frase: 'Il passo normale è P/cos α.', perche: 'È la proiezione del passo frontale: P_m = P cos α, più corto.', fonte: { tipo: 'dispensa', pag: 186 } },
  ],
  approfondimenti: [
    { domanda: 'Ricorda il numero di denti in presa dei denti dritti.', tipo: 'collegamento', argomento: 'c5-denti-presa', attesa: 'z_presa = AB/(P cos θ): segmento dei contatti diviso il passo misurato sulla retta d\'azione (passo base).', fonte: { tipo: 'dispensa', pag: 186 } },
    { domanda: 'Da dove vengono le ruote elicoidali?', tipo: 'approfondimento', attesa: 'Dalle ruote a scalini: dente diviso in n parti sfasate di P/n; per n → ∞ le sezioni ruotano di quantità infinitesime e il fianco diventa una superficie elicoidale.', fonte: { tipo: 'dispensa', pag: 185 } },
    { domanda: 'Perché si usano grandezze normali e che cosa è θ_m?', tipo: 'approfondimento', attesa: 'Perché il dente è inclinato: si misurano perpendicolarmente all\'elica primitiva. P_m = P cos α, m_m = m cos α, tg θ_m = tg θ cos α (θ_m nel piano normale alla superficie del dente).', fonte: { tipo: 'dispensa', pag: 186 } },
    { domanda: 'Come si sceglie il numero minimo di denti di un\'elicoidale?', tipo: 'collegamento', argomento: 'c5-elicoidali-zmin', attesa: 'Con la ruota fittizia a denti dritti nel piano normale: z_fitt = z/cos³α ≥ z*_min, quindi z_min = z*_min cos³α.', fonte: { tipo: 'dispensa', pag: 188 } },
    { domanda: 'Qual è lo svantaggio delle elicoidali?', tipo: 'collegamento', argomento: 'c5-elicoidali-forze', attesa: 'La spinta assiale A = (C/r) tg α: i cuscinetti devono reggere carichi assiali; si compensa con ingranaggi a freccia o Citroën.', fonte: { tipo: 'dispensa', pag: 189 } },
    { domanda: 'Come devono essere le eliche di due ruote che ingranano esternamente?', tipo: 'approfondimento', attesa: 'Stesso angolo d\'inclinazione e verso di avvolgimento opposto: una destrorsa e una sinistrorsa. La ruota limite è una dentiera con denti inclinati di α.', fonte: { tipo: 'dispensa', pag: 186 } },
  ],
  simboli: [
    ...SIMB_ELICA,
    { simbolo: '\\delta,\\ \\delta_e,\\ \\overline{CK}', significato: 'segmento dei contatti (AB), lunghezza effettiva δ + CK, allungamento b tg β', altrove: 'AB, AE = AB + b tg β e δ_e = b tg β in q23/q47 (NF-45)' },
    { simbolo: 'b', significato: 'larghezza di fascia (profondità del dente)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5b-contatti' }],
  previsioni: [
    {
      id: 'c5b-pres-zero',
      domanda: 'Con β = 0 (denti dritti) e δ = 1,6 P cos θ, quante linee di contatto ci sono nel rettangolo, istante per istante?',
      opzioni: ['sempre 1,6', 'a scatti: 1 o 2', 'sempre 2', 'sempre 1'],
      corretta: 1,
      spiega: 'Con i denti dritti le linee entrano ed escono intere: il numero salta fra 1 e 2, e la media è 1,6.',
      verify: () => {
        const pb = 1, n = new Set<number>();
        for (let k = 0; k < 200; k++) n.add(lineeContatto({ delta: 1.6, b: 3, beta: 0, pb, s: (k + 0.5) / 200 }).n);
        return n.size === 2 && n.has(1) && n.has(2) ? 1 : n.size === 1 && n.has(2) ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c5b-contatti' },
    },
    {
      id: 'c5b-pres-fascia',
      domanda: 'Raddoppi la larghezza di fascia b. Il numero di denti in presa…',
      opzioni: ['raddoppia', 'aumenta solo del termine aggiuntivo, che raddoppia', 'non cambia', 'diminuisce'],
      corretta: 1,
      spiega: 'z_presa = δ/(P cos θ) + b tg β/(P cos θ): solo il secondo termine è proporzionale a b.',
      verify: () => {
        const th = radOf(20), be = radOf(15), z1 = dentiInPresa(10, 20, be, 6, th), z2 = dentiInPresa(10, 40, be, 6, th), z0 = dentiInPresa(10, 0, be, 6, th);
        return Math.abs(z2 - 2 * z1) < 1e-9 ? 0 : Math.abs(z2 - z0 - 2 * (z1 - z0)) < 1e-9 ? 1 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5b-contatti' },
    },
  ],
  nf: ['NF-11', 'NF-45', 'NF-207'],
};

export const elicoidaliZmin: ArgomentoContenuto = {
  id: 'c5-elicoidali-zmin',
  cosaDireSubito:
    'Per l\'interferenza delle elicoidali sfrutto il risultato dei denti dritti. Taglio il cilindro primitivo con un piano normale all\'elica: ottengo un\'ellisse di semiassi r e r/cos α. Vicino al contatto la sostituisco con la circonferenza osculatrice, di raggio a²/b = r/cos²α: è la primitiva di una ruota a denti dritti fittizia, con il modulo normale. Ha z/cos³α denti, quindi z_min = z*_min cos³α.',
  sistemaIpotesi: [
    'Sistema: ruota elicoidale di raggio primitivo r, z denti, modulo frontale m, angolo d\'elica α sul primitivo.',
    'Piano normale all\'elica primitiva: ellisse con b = r, a = r/cos α; contatto all\'estremo dell\'asse minore.',
    'Ruota fittizia a denti dritti nel piano normale, con modulo normale m_m = m cos α.',
    'z*_min dei denti dritti noto dall\'interferenza.',
  ],
  disegno: {
    svg: disegnoZmin(),
    didascalia: 'Sezione normale del cilindro primitivo: ellisse con semiassi r e r/cos α, e circonferenza osculatrice di raggio R = r/cos²α nel punto di contatto (p. 188).',
    fonte: { tipo: 'dispensa', pag: [187, 188], fig: 'ellisse e circonferenza osculatrice' },
    elementi: [
      { id: 'ellisse', testo: 'ellisse della sezione normale: b = r (verticale), a = r/cos α', obbligatorio: true },
      { id: 'contatto', testo: 'punto di contatto all\'estremo dell\'asse minore', obbligatorio: true },
      { id: 'osculatrice', testo: 'circonferenza osculatrice tangente internamente, raggio R = a²/b', obbligatorio: true },
      { id: 'cilindro', testo: 'cilindro primitivo tagliato dal piano normale all\'elica (schizzo 3D)', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'R = \\dfrac{a^2}{b} = \\dfrac{r}{\\cos^2\\alpha}, \\qquad z_{fitt} = \\dfrac{2R}{m_m}',
    spiegazione: 'Raggio di curvatura dell\'ellisse nel punto di contatto e numero di denti della ruota fittizia con il modulo normale.',
    fonte: { tipo: 'dispensa', pag: 188 },
  },
  dimostrazioni: ['d096', 'd097'],
  significato:
    'Nel piano normale la ruota elicoidale «sembra» più grande di quella vera: ha z/cos³α denti. Poiché l\'interferenza si decide lì, la ruota vera può avere cos³α volte meno denti di una a denti dritti: pignoni più piccoli a parità di modulo.',
  fraseDaRicordare: 'z_fitt = z/cos³α, quindi z_min = z*_min cos³α.',
  daNonDire: [
    { frase: 'Il raggio della ruota fittizia è r/cos α.', perche: 'r/cos α è il semiasse maggiore; il raggio di curvatura all\'estremo dell\'asse minore è a²/b = r/cos²α.', fonte: { tipo: 'dispensa', pag: 188 } },
    { frase: 'Nella ruota fittizia uso il modulo frontale m.', perche: 'La ruota fittizia sta nel piano normale: modulo m_m = m cos α.', fonte: { tipo: 'dispensa', pag: 188 } },
    { frase: 'z_min = z*_min / cos³α.', perche: 'È la fittizia ad avere più denti: la reale ne può avere meno, z_min = z*_min cos³α.', fonte: { tipo: 'dispensa', pag: 188 } },
  ],
  approfondimenti: [
    { domanda: 'Da dove viene z*_min dei denti dritti?', tipo: 'collegamento', argomento: 'c5-interferenza', attesa: 'Dalla condizione che il punto di contatto estremo non superi il punto di tangenza della retta d\'azione con la fondamentale: per la dentiera z*_min = 2a/(m sin²θ), 17,1 → 18 denti con θ = 20° (NF-23 per il sin²θ).', fonte: { tipo: 'dispensa', pag: [167, 168] } },
    { domanda: 'Perché il raggio di curvatura all\'estremo dell\'asse minore è a²/b?', tipo: 'approfondimento', attesa: 'Per l\'ellisse x = a cos t, y = b sin t il raggio di curvatura è (a²sin²t + b²cos²t)^{3/2}/(ab); in t = π/2 vale a³/(ab) = a²/b. Lì l\'ellisse è più piatta.', fonte: { tipo: 'deduzione', da: 'p. 188', spiegazione: 'formula del raggio di curvatura di una curva in forma parametrica, valutata all\'estremo dell\'asse minore' } },
    { domanda: 'Con α = 30° e z*_min = 17, quanti denti al minimo?', tipo: 'approfondimento', attesa: '17 · cos³30° = 17 · 0,650 = 11,04 → 12 denti.', fonte: { tipo: 'deduzione', da: 'p. 188', spiegazione: 'z_min = z*_min cos³α con arrotondamento per eccesso' } },
    { domanda: 'Che cosa cambia nella sezione normale rispetto a quella frontale?', tipo: 'collegamento', argomento: 'c5-elicoidali-presa', attesa: 'Passo e modulo si riducono di cos α (P_m = P cos α), l\'angolo di pressione diventa θ_m con tg θ_m = tg θ cos α, e la primitiva diventa un\'ellisse.', fonte: { tipo: 'dispensa', pag: 186 } },
  ],
  simboli: [
    SIMB_ELICA[0], SIMB_ELICA[4],
    { simbolo: 'a,\\ b', significato: 'semiassi dell\'ellisse della sezione normale (qui b non è la fascia)' },
    { simbolo: 'R', significato: 'raggio della circonferenza osculatrice (primitiva della ruota fittizia)', altrove: 'ρ in d096' },
    { simbolo: 'z_{fitt},\\ z^{*}_{min}', significato: 'denti della ruota fittizia, minimo dei denti dritti', altrove: 'z_v e z_min,dritti in d096–d097, z_min,d in q26' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5b-osculatrice' }],
  previsioni: [
    {
      id: 'c5b-zmin-30',
      domanda: 'Con α = 30° e z*_min = 17, il numero minimo di denti dell\'elicoidale è…',
      opzioni: ['17', '15', '12', '9'],
      corretta: 2,
      spiega: '17 cos³30° = 11,04: servono 12 denti.',
      verify: () => [17, 15, 12, 9].indexOf(Math.ceil(zMinElicoidale(17, radOf(30)))),
      visual: { kind: 'meccanismo', id: 'c5b-osculatrice' },
    },
    {
      id: 'c5b-zmin-fitt',
      domanda: 'Una ruota elicoidale con 20 denti e α = 25°: la sua ruota fittizia ne ha circa…',
      opzioni: ['18', '20', '22', '27'],
      corretta: 3,
      spiega: 'z/cos³α = 20/0,744 ≈ 26,9.',
      verify: () => [18, 20, 22, 27].findIndex((x) => Math.abs(x - zFittizio(20, radOf(25))) < 0.6),
      visual: { kind: 'meccanismo', id: 'c5b-osculatrice' },
    },
  ],
  nf: ['NF-11', 'NF-23'],
};

export const elicoidaliForze: ArgomentoContenuto = {
  id: 'c5-elicoidali-forze',
  cosaDireSubito:
    'Nelle elicoidali il dente è inclinato di α sull\'asse, quindi oltre alle componenti radiale R e tangenziale Q nasce una componente assiale A. La forza F, normale al dente, sta nel piano normale: R = F sin θ_m e H″ = F cos θ_m; H″ si divide in Q = H″ cos α e A = H″ sin α. Solo Q dà momento: Q = C/r, e quindi A = (C/r) tg α.',
  sistemaIpotesi: [
    'Sistema: dente elicoidale sul cilindro primitivo di raggio r, coppia C sulla ruota.',
    'Attrito trascurato: F perpendicolare alla superficie del dente, nel piano normale.',
    'θ_m angolo di pressione normale, α angolo d\'elica sul primitivo (NF-11).',
  ],
  disegno: {
    svg: disegnoForze(),
    didascalia: 'Scomposizione della forza normale F (p. 189): R radiale, H″ nel piano tangente perpendicolare al dente, poi Q tangenziale e A assiale.',
    fonte: { tipo: 'dispensa', pag: 189, fig: 'scansione del libro: parallelepipedo delle forze' },
    elementi: [
      { id: 'dente', testo: 'dente inclinato di α rispetto all\'asse sul cilindro primitivo', obbligatorio: true },
      { id: 'F', testo: 'forza F perpendicolare al dente nel punto di contatto C', obbligatorio: true },
      { id: 'RH', testo: 'R radiale e H″ nel piano tangente, angolo θ_m fra F e H″', obbligatorio: true },
      { id: 'QA', testo: 'Q tangenziale e A assiale, angolo α fra H″ e Q', obbligatorio: true },
      { id: 'parallelepipedo', testo: 'linee di costruzione del parallelepipedo', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'Q = F\\cos\\theta_m\\cos\\alpha,\\quad A = F\\cos\\theta_m\\sin\\alpha,\\quad R = F\\sin\\theta_m;\\qquad C = Q\\,r',
    spiegazione: 'Doppia scomposizione della forza normale e seconda cardinale rispetto all\'asse della ruota.',
    fonte: { tipo: 'dispensa', pag: 189 },
  },
  dimostrazioni: ['d098'],
  significato:
    'La componente tangenziale è quella dei denti dritti (Q = C/r) e anche la radiale coincide, R = (C/r) tg θ con l\'angolo di pressione frontale; in più c\'è la spinta assiale A = Q tg α, che cresce con l\'elica. I cuscinetti devono reggerla, oppure la si annulla con due eliche opposte (ingranaggi a freccia, Citroën).',
  fraseDaRicordare: 'Q = C/r, R = (C/r) tg θ_m / cos α, A = (C/r) tg α: l\'elica aggiunge la spinta assiale.',
  daNonDire: [
    { frase: '|C| = |F| cos θ_m cos α.', perche: 'È il refuso di p. 189 (NF-27): manca il braccio, |C| = |Q| r.', fonte: { tipo: 'dispensa', pag: 189 } },
    { frase: 'A = Q tg α / cos θ.', perche: 'È la formula di q27 con l\'angolo sbagliato: vale con l\'angolo di base (tg β = tg α cos θ). Con α la forma giusta è A = Q tg α (NF-11).', fonte: { tipo: 'dispensa', pag: [185, 189] } },
    { frase: 'La componente radiale è (C/r) tg θ_m.', perche: 'Manca 1/cos α: R = (C/r) tg θ_m/cos α, che è uguale a (C/r) tg θ.', fonte: { tipo: 'dispensa', pag: 189 } },
    { frase: 'Anche R e A danno momento rispetto all\'asse.', perche: 'R passa per l\'asse, A gli è parallela: solo Q ha momento.', fonte: { tipo: 'dispensa', pag: 189 } },
  ],
  approfondimenti: [
    { domanda: 'Che succede con α = 0?', tipo: 'collegamento', argomento: 'c5-forze-dritti', attesa: 'A = 0 e R = Q tg θ: si ritrovano le forze dei denti dritti.', fonte: { tipo: 'dispensa', pag: 189 } },
    { domanda: 'Come si elimina la spinta assiale?', tipo: 'approfondimento', attesa: 'Con due eliche opposte sulla stessa ruota: ingranaggi a freccia (le due componenti assiali sono opposte; asse in trazione per evitare instabilità da carico di punta) o Citroën.', fonte: { tipo: 'dispensa', pag: 189 } },
    { domanda: 'Perché R coincide con quella dei denti dritti?', tipo: 'approfondimento', attesa: 'Perché tg θ_m = tg θ cos α (p. 186): R = (C/r) tg θ_m/cos α = (C/r) tg θ, con l\'angolo di pressione frontale.', fonte: { tipo: 'deduzione', da: 'pp. 186 e 189', spiegazione: 'sostituendo tg θ_m nella formula di R' } },
    { domanda: 'E nelle ruote coniche c\'è spinta assiale?', tipo: 'collegamento', argomento: 'c5-coniche', attesa: 'Sì: la componente F sin θ che interseca gli assi si divide in radiale F sin θ cos φ₁ e assiale F sin θ sin φ₁; anche lì i cuscinetti devono reggere forze assiali.', fonte: { tipo: 'dispensa', pag: 191 } },
    { domanda: 'Quanto vale la forza totale F?', tipo: 'approfondimento', attesa: 'F = Q/(cos θ_m cos α) = C/(r cos θ_m cos α), e F² = Q² + R² + A².', fonte: { tipo: 'dispensa', pag: 189 } },
  ],
  simboli: [
    SIMB_ELICA[0], SIMB_ELICA[2],
    { simbolo: 'F,\\ R,\\ H\'\',\\ Q,\\ A', significato: 'forza normale; radiale; componente nel piano normale tangente al primitivo; tangenziale; assiale', altrove: 'F_n, F_r, F_t, F_a in d098; H in q27 è la risultante nel piano trasversale' },
    { simbolo: 'r', significato: 'raggio primitivo (R₁ nella riga di p. 189)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c5b-forze-elicoidali' }],
  previsioni: [
    {
      id: 'c5b-forze-alpha',
      domanda: 'A coppia costante porti α da 15° a 30°. La componente tangenziale Q…',
      opzioni: ['raddoppia', 'resta C/r', 'diminuisce', 'si annulla'],
      corretta: 1,
      spiega: 'Q = C/r non dipende dall\'elica: cresce la spinta assiale A = Q tg α (più del doppio: tg 30°/tg 15° = 2,15).',
      verify: () => {
        const a = forzeElicoidali({ C: 100, r: 0.1, theta: radOf(20), alpha: radOf(15) }), b = forzeElicoidali({ C: 100, r: 0.1, theta: radOf(20), alpha: radOf(30) });
        return Math.abs(a.Q - b.Q) < 1e-9 ? 1 : b.Q > a.Q ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5b-forze-elicoidali' },
    },
    {
      id: 'c5b-forze-radiale',
      domanda: 'La componente radiale di un\'elicoidale, rispetto a una ruota a denti dritti con lo stesso angolo di pressione frontale θ e la stessa coppia, è…',
      opzioni: ['più grande di 1/cos α', 'uguale: (C/r) tg θ', 'più piccola di cos α', 'nulla'],
      corretta: 1,
      spiega: 'R = (C/r) tg θ_m/cos α e tg θ_m = tg θ cos α: R = (C/r) tg θ.',
      verify: () => {
        const e = forzeElicoidali({ C: 100, r: 0.1, theta: radOf(20), alpha: radOf(25) }), d = forzeElicoidali({ C: 100, r: 0.1, theta: radOf(20), alpha: 0 });
        return Math.abs(e.R - d.R) < 1e-9 ? 1 : e.R > d.R ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c5b-forze-elicoidali' },
    },
  ],
  nf: ['NF-11', 'NF-27'],
};
