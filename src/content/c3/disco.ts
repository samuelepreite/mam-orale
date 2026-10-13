/**
 * C3 · Freni a disco (domanda q40). Dispensa p. 116 (manoscritto), pp. 126–128 (appunti del 29/04/2025), p. 108 (Fig. 5-62).
 * Pressione uniforme (d047, parte di d049): assente nella dispensa, fonte esterna dichiarata (NF-07).
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { discoSettore, simpson2 } from '../../engine/c3';
import { angle, arc, arrow, circle, dot, line, poly, pt, rect, rot, svg, text } from '../svg';
import { D, DED, EST, cz } from './comune';

// ------------------------------------------------------------------ disegno (p. 116: vista frontale e laterale)
function disegno() {
  const cx = 130, cy = 160, Rd = 118, ri = 52, re = 100, a0 = 60, a1 = 120;
  const [p1x, p1y] = pt(cx, cy, ri, a0), [p2x, p2y] = pt(cx, cy, re, a0), [p3x, p3y] = pt(cx, cy, ri, a1), [p4x, p4y] = pt(cx, cy, re, a1);
  const thP = 100, rP = 78;
  const [px, py] = pt(cx, cy, rP, thP);
  const er = pt(px, py, 26, thP), et = pt(px, py, 26, thP + 90), ft = pt(px, py, 30, thP - 90);
  const sx = 300, sy = cy; // vista laterale: disco come segmento verticale, asse z orizzontale
  const prof: [number, number][] = [];
  for (let r = ri; r <= re + 0.01; r += 4) prof.push([sx - 4 - 1500 / r, sy - r]);
  return svg(410, 300, [
    circle(cx, cy, Rd, 'l'), line(cx, cy + Rd + 10, cx, cy - Rd - 14, 'd'), text(cx + 8, cy - Rd - 14, 'x', { c: 'm', it: true }),
    arc(cx, cy, ri, a0, a1, 'a'), arc(cx, cy, re, a0, a1, 'a'), line(p1x, p1y, p2x, p2y, 'a'), line(p3x, p3y, p4x, p4y, 'a'),
    line(cx, cy, p1x, p1y, 'd'), line(cx, cy, p3x, p3y, 'd'),
    angle(cx, cy, 30, a0, a1, 'α', 'a'),
    dot(cx, cy, 'O', -12, 10), rot(cx, cy, Rd - 16, 200, 250, 'v', 'ω'),
    line(cx, cy, px, py, 'm'), dot(px, py, 'P', -12, -8, 'a'),
    arrow(px, py, er[0], er[1], 'm'), text(er[0] + 4, er[1] - 8, 'e_r', { c: 'm', size: 12 }),
    arrow(px, py, et[0], et[1], 'v'), text(et[0] - 8, et[1] - 10, 'V_P', { c: 'v', size: 12 }),
    arrow(px, py, ft[0], ft[1], 'f'), text(ft[0] + 18, ft[1] + 2, 'dF_T', { c: 'f', size: 12 }),
    text(...pt(cx, cy, re + 12, 50), 'r_e', { c: 'm', size: 12 }), text(...pt(cx, cy, ri - 12, 48), 'r_i', { c: 'm', size: 12 }),
    text(cx, cy + 40, 'dA = r dr dθ', { c: 'm', size: 12 }),
    // vista laterale
    line(sx, cy - Rd, sx, cy + Rd, 'l', 3), line(sx - 80, sy, sx + 100, sy, 'd'), text(sx + 104, sy - 8, 'z', { c: 'm', it: true }),
    rect(sx + 3, sy - re, 14, re - ri, 'soft'), rect(sx + 3, sy - re, 14, re - ri, 'l'),
    arrow(sx + 60, sy - re + 8, sx + 20, sy - re + 8, 'f'), arrow(sx + 60, sy - (re + ri) / 2, sx + 20, sy - (re + ri) / 2, 'f'), arrow(sx + 60, sy - ri - 8, sx + 20, sy - ri - 8, 'f'),
    text(sx + 64, sy - ri + 10, 'p_AZ', { c: 'f', size: 12, anchor: 'start' }),
    poly([[sx - 4, sy - ri], ...prof, [sx - 4, sy - re]], 'soft', true), poly(prof, 'a'),
    text(sx - 50, sy - re - 14, 'p = K″/r', { c: 'a', size: 13 }),
    text(205, 290, 'M_f = f F_N r_m,   |F_T| = f F_N · sin(α/2)/(α/2)', { c: 'a', size: 13 }),
  ], 'Freno a disco: pattino a settore di apertura α fra r_i e r_e; pressione iperbolica sul disco');
}

// ------------------------------------------------------------------ campioni
const sampleCorona = (rnd: () => number) => {
  const ri = U(rnd, 0.05, 0.1), re = ri + U(rnd, 0.03, 0.1), alpha = U(rnd, Math.PI / 6, Math.PI / 2), f = U(rnd, 0.2, 0.5);
  return { ri, re, alpha, f, rm: (re + ri) / 2, Ru: ((2 / 3) * (re ** 3 - ri ** 3)) / (re ** 2 - ri ** 2) };
};

// ------------------------------------------------------------------ d047 · pressione uniforme (esterna)
const EST_UNIF = EST('trattazione classica dei freni a disco e delle frizioni a pressione uniforme (disco nuovo)', 'la dispensa cita la pressione costante del disco nuovo solo a parole (p. 108, Fig. 5-62 a) e non la integra');

export const d047: Dimostrazione = {
  id: 'd047',
  titolo: 'Freno a disco con pressione uniforme (disco nuovo)',
  enunciato: 'Calcolare forza normale e momento frenante di un pattino a settore (o di una corona) supponendo la pressione costante.',
  ipotesi: ['disco nuovo: p = p₀ costante su tutto il pattino (Fig. 5-62 a)', 'settore di apertura α fra r_i e r_e (α = 2π: corona completa); attrito coulombiano f'],
  sample: (rnd) => {
    const c = sampleCorona(rnd), p0 = U(rnd, 2e5, 1e6), w = U(rnd, 10, 100), k = U(rnd, 0.5, 2);
    const FN = (p0 * c.alpha * (c.re ** 2 - c.ri ** 2)) / 2, Mf = (c.f * p0 * c.alpha * (c.re ** 3 - c.ri ** 3)) / 3;
    return { ...c, p0, w, k, FN, Mf };
  },
  passi: [
    {
      id: 'd047.1',
      latex: 'p(r,\\theta) = p_0',
      perche: 'Quando il disco è nuovo «è ragionevole assumere che la pressione si mantenga costante in tutti i punti di contatto» (p. 108). È l\'ipotesi alternativa a Reye.',
      fonte: D(108, { fig: '5-62 a' }),
      distrattori: [],
    },
    {
      id: 'd047.2',
      latex: 'dA = r\\,dr\\,d\\theta,\\qquad dF_N = p_0\\,dA,\\qquad dM_f = r\\,dF_T = r\\,f\\,p_0\\,dA',
      perche: 'Elemento d\'area in coordinate polari; ogni forza tangenziale elementare ha braccio $r$ rispetto all\'asse del disco.',
      fonte: D(116),
      distrattori: [],
    },
    {
      id: 'd047.3',
      latex: 'F_N = \\int_{-\\alpha/2}^{\\alpha/2}\\!\\!\\int_{r_i}^{r_e} p_0\\,r\\,dr\\,d\\theta = p_0\\,\\alpha\\,\\dfrac{r_e^2 - r_i^2}{2}',
      perche: 'Integrale della pressione costante sull\'area del settore.',
      fonte: EST_UNIF,
      distrattori: [],
      num: (v) => [simpson2((r) => v.p0 * r, v.ri, v.re, -v.alpha / 2, v.alpha / 2, 40), v.FN],
    },
    {
      id: 'd047.4',
      latex: 'M_f = \\int_{-\\alpha/2}^{\\alpha/2}\\!\\!\\int_{r_i}^{r_e} f\\,p_0\\,r^2\\,dr\\,d\\theta = f\\,p_0\\,\\alpha\\,\\dfrac{r_e^3 - r_i^3}{3}',
      perche: 'Nel momento compare una $r$ in più (il braccio) rispetto alla forza: da qui il cubo.',
      fonte: EST_UNIF,
      chiave: true,
      distrattori: [
        { latex: 'M_f = f\\,p_0\\,\\alpha\\,\\dfrac{r_e^2 - r_i^2}{2}', errore: 'termine-perso', spiega: 'Manca il braccio r della forza elementare: questa è f·F_N, non un momento.', num: (v) => [v.Mf, (v.f * v.p0 * v.alpha * (v.re ** 2 - v.ri ** 2)) / 2] },
        { latex: 'M_f = f\\,p_0\\,\\alpha\\,\\dfrac{r_e^3 - r_i^3}{2}', errore: 'fattore', spiega: 'La primitiva di r² è r³/3.', num: (v) => [v.Mf, (v.f * v.p0 * v.alpha * (v.re ** 3 - v.ri ** 3)) / 2] },
      ],
      num: (v) => [simpson2((r) => v.f * v.p0 * r * r, v.ri, v.re, -v.alpha / 2, v.alpha / 2, 40), v.Mf],
    },
    {
      id: 'd047.5',
      latex: '\\alpha = 2\\pi:\\quad M_f = \\dfrac{2\\pi f p_0}{3}\\,(r_e^3 - r_i^3)',
      perche: 'Corona completa (frizione o disco con pattino anulare): è la formula che di solito si cita per la pressione uniforme.',
      fonte: EST_UNIF,
      distrattori: [],
      num: (v) => [(v.f * v.p0 * 2 * Math.PI * (v.re ** 3 - v.ri ** 3)) / 3, ((2 * Math.PI * v.f * v.p0) / 3) * (v.re ** 3 - v.ri ** 3)],
    },
    {
      id: 'd047.6',
      latex: 'M_f = f\\,F_N\\,\\dfrac{2}{3}\\,\\dfrac{r_e^3 - r_i^3}{r_e^2 - r_i^2}',
      perche: 'Si elimina $p_0$ con la forza normale: il «raggio equivalente» è il rapporto cubico/quadratico.',
      fonte: EST_UNIF,
      chiave: true,
      distrattori: [
        { latex: 'M_f = f\\,F_N\\,\\dfrac{r_e + r_i}{2}', errore: 'ipotesi', spiega: 'Il raggio medio aritmetico viene dall\'usura uniforme (p = K″/r), non dalla pressione uniforme.', num: (v) => [v.Mf, v.f * v.FN * v.rm] },
        { latex: 'M_f = f\\,F_N\\,\\dfrac{r_e^3 - r_i^3}{r_e^2 - r_i^2}', errore: 'fattore', spiega: 'Si perde il 2/3 che nasce da (1/3)/(1/2).', num: (v) => [v.Mf, (v.f * v.FN * (v.re ** 3 - v.ri ** 3)) / (v.re ** 2 - v.ri ** 2)] },
      ],
      num: (v) => [v.Mf, v.f * v.FN * v.Ru],
    },
    {
      id: 'd047.7',
      latex: 'p = p_0 \\;\\Rightarrow\\; \\dot\\delta = k f\\omega\\,r\\,p_0 \\propto r:\\quad \\dfrac{\\dot\\delta(r_e)}{\\dot\\delta(r_i)} = \\dfrac{r_e}{r_i}',
      perche: 'Con la pressione uniforme Reye dice che si consuma di più all\'esterno: il disco diventa «più sottile in corrispondenza del diametro esterno» (p. 108, Fig. 5-62 c) e la pressione si ridistribuisce verso $K\'\'/r$. La pressione uniforme vale solo all\'inizio.',
      fonte: D(108, { fig: '5-62 c' }),
      distrattori: [],
      num: (v) => [(v.k * v.f * v.w * v.re * v.p0) / (v.k * v.f * v.w * v.ri * v.p0), v.re / v.ri],
    },
  ],
  risultato: { latex: 'M_f = \\dfrac{2}{3}\\,f F_N\\,\\dfrac{r_e^3 - r_i^3}{r_e^2 - r_i^2}\\qquad (\\alpha = 2\\pi:\\ M_f = \\tfrac{2\\pi f p_0}{3}(r_e^3 - r_i^3))', fonte: EST_UNIF },
  gancio: 'Pressione uniforme: r² nel momento, raggio cubico/quadratico; ma dura poco, il disco si consuma fuori.',
};

// ------------------------------------------------------------------ d048 · usura uniforme (p. 116)
export const d048: Dimostrazione = {
  id: 'd048',
  titolo: 'Freno a disco con usura uniforme: M_f = f F_N r_m',
  enunciato: 'Con l\'ipotesi di Reye calcolare la risultante normale e il momento frenante di un pattino a settore premuto su un disco.',
  ipotesi: [
    'pattino a settore di apertura α fra r_i e r_e, accostamento rigido traslatorio (pinza): consumo uniforme',
    'Reye: p = K″/r (d041); attrito coulombiano f; azioni del pattino P sul disco D, apice (P,D)',
  ],
  sample: (rnd) => {
    const c = sampleCorona(rnd), FN = U(rnd, 1000, 10000), K = FN / (c.alpha * (c.re - c.ri));
    const r = U(rnd, c.ri, c.re), theta = U(rnd, -c.alpha / 2, c.alpha / 2), dA = U(rnd, 1e-5, 1e-4);
    return { ...c, FN, K, r, theta, dA, p: K / r, Mf: (c.f * K * c.alpha * (c.re ** 2 - c.ri ** 2)) / 2 };
  },
  passi: [
    {
      id: 'd048.1',
      latex: '\\underline V_P = \\omega r\\,\\underline e_\\theta,\\qquad d\\underline F_N = -p\\,dA\\,\\hat k,\\qquad d\\underline F_T = -f\\,|d\\underline F_N|\\,\\dfrac{\\underline V_P}{|\\underline V_P|} = -f\\,p\\,dA\\,\\underline e_\\theta',
      perche: 'Il pattino spinge sul disco lungo l\'asse (−k̂, «entrante»); l\'attrito del pattino sul disco si oppone alla velocità del punto del disco (p. 116).',
      fonte: D([116, 126]),
      distrattori: [],
    },
    {
      id: 'd048.2',
      latex: 'd\\underline M_f = (P - O)\\wedge d\\underline F_T = r\\,\\underline e_r\\wedge(-f p\\,dA\\,\\underline e_\\theta) = -f\\,p\\,dA\\,r\\,\\hat k',
      perche: 'Ogni momento elementare è diretto lungo $-\\hat k$, opposto a $\\underline\\omega$: si sommano tutti senza cancellazioni (la frase battuta di p. 126 dice «versore k», la formula di p. 116 ha il segno giusto, NF-143).',
      fonte: D(116),
      distrattori: [],
      num: (v) => {
        const e: [number, number] = [-Math.sin(v.theta), Math.cos(v.theta)];
        return [cz(v.r * Math.cos(v.theta), v.r * Math.sin(v.theta), -v.f * v.p * v.dA * e[0], -v.f * v.p * v.dA * e[1]), -v.f * v.p * v.dA * v.r];
      },
    },
    {
      id: 'd048.3',
      latex: '\\text{accostamento traslatorio} \\Rightarrow \\dot\\delta\\ \\text{uniforme} \\Rightarrow p(r) = \\dfrac{K\'\'}{r}',
      perche: 'Per integrare serve la pressione, e la si ricava dall\'ipotesi dell\'usura: il pattino trasla nella pinza, il consumo è uniforme e $\\dot\\delta = k\'r\\,p$, quindi $p = K\'\'/r$ (d041).',
      fonte: D([116, 127]),
      chiave: true,
      distrattori: [
        { latex: 'p = p_0\\ \\text{perché l\'olio di comando spinge uniformemente}', errore: 'ipotesi', spiega: 'Dal lato del comando la pressione è uniforme, dal lato del disco è iperbolica: la differenza dà una coppia sul pattino, ripresa dalla coppia prismatica (p. 127).' },
        { latex: 'p = K\'\'\\,r', errore: 'indice', spiega: 'Consumo uniforme con velocità ∝ r vuol dire pressione ∝ 1/r.' },
      ],
    },
    {
      id: 'd048.4',
      latex: '|\\underline F_N| = \\int_{-\\alpha/2}^{\\alpha/2}\\!\\!\\int_{r_i}^{r_e} \\dfrac{K\'\'}{r}\\,r\\,dr\\,d\\theta = K\'\'\\,\\alpha\\,(r_e - r_i)',
      perche: 'Le forze normali sono tutte parallele (lungo l\'asse): la risultante è la somma; la $r$ della pressione si semplifica con quella dell\'area. La risultante normale è equilibrata dalla forza di azionamento (p. 127).',
      fonte: D([116, 127]),
      distrattori: [],
      num: (v) => [simpson2((r) => (v.K / r) * r, v.ri, v.re, -v.alpha / 2, v.alpha / 2, 40), v.FN],
    },
    {
      id: 'd048.5',
      latex: '|\\underline M_f| = \\int_{-\\alpha/2}^{\\alpha/2}\\!\\!\\int_{r_i}^{r_e} f\\,\\dfrac{K\'\'}{r}\\,r\\cdot r\\,dr\\,d\\theta = f K\'\'\\alpha\\,\\dfrac{r_e^2 - r_i^2}{2}',
      perche: 'Si integra il momento elementare: resta una sola $r$ sotto integrale.',
      fonte: D(116),
      chiave: true,
      distrattori: [
        { latex: '|\\underline M_f| = f K\'\'\\alpha\\,\\dfrac{r_e^3 - r_i^3}{3}', errore: 'ipotesi', spiega: 'Così si usa p costante (r² sotto integrale): con p = K″/r una r si semplifica.', num: (v) => [v.Mf, (v.f * v.K * v.alpha * (v.re ** 3 - v.ri ** 3)) / 3] },
        { latex: '|\\underline M_f| = f K\'\'\\alpha\\,(r_e^2 - r_i^2)', errore: 'fattore', spiega: 'La primitiva di r è r²/2.', num: (v) => [v.Mf, v.f * v.K * v.alpha * (v.re ** 2 - v.ri ** 2)] },
      ],
      num: (v) => [simpson2((r) => v.f * (v.K / r) * r * r, v.ri, v.re, -v.alpha / 2, v.alpha / 2, 40), v.Mf],
    },
    {
      id: 'd048.6',
      latex: '|\\underline M_f| = f\\,\\underbrace{K\'\'\\alpha(r_e - r_i)}_{|\\underline F_N|}\\,\\underbrace{\\dfrac{r_e + r_i}{2}}_{r_m} = f\\,F_N\\,r_m',
      perche: 'Si scompone $r_e^2 - r_i^2 = (r_e - r_i)(r_e + r_i)$ e si riconosce $F_N$: il momento frenante è $f$ per la forza di comando per il **raggio medio** aritmetico.',
      fonte: D(116),
      chiave: true,
      distrattori: [
        { latex: '|\\underline M_f| = f\\,F_N\\,r_e', errore: 'concetto', spiega: 'Il braccio equivalente è il raggio medio, non quello esterno: le forze elementari sono distribuite fra r_i e r_e.', num: (v) => [v.Mf, v.f * v.FN * v.re] },
        { latex: '|\\underline M_f| = f\\,F_N\\,\\dfrac{2}{3}\\,\\dfrac{r_e^3 - r_i^3}{r_e^2 - r_i^2}', errore: 'ipotesi', spiega: 'È il risultato con pressione uniforme (disco nuovo, d047), non con l\'usura stabilizzata.', num: (v) => [v.Mf, v.f * v.FN * v.Ru] },
      ],
      num: (v) => [v.Mf, v.f * v.FN * v.rm],
    },
    {
      id: 'd048.7',
      latex: 'M_{f,tot} = 2\\,f\\,F_N\\,r_m\\quad \\text{(pinza flottante, due pattini)}',
      perche: 'La pinza flottante spinge il disco da entrambi i lati con forze uguali, opposte e collineari (altrimenti il disco si inflette, p. 126): ci sono due superfici d\'attrito e i momenti si sommano.',
      fonte: DED('p. 126', 'due pattini simmetrici premuti con la stessa forza: somma dei due momenti di p. 116'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [2 * v.Mf, 2 * v.f * v.FN * v.rm],
    },
  ],
  risultato: { latex: '|\\underline F_N| = K\'\'\\alpha(r_e - r_i),\\qquad M_f = f\\,F_N\\,r_m,\\quad r_m = \\dfrac{r_e + r_i}{2}', fonte: D(116) },
  gancio: 'Usura uniforme: p = K″/r, una r si semplifica, braccio = raggio medio.',
};

// ------------------------------------------------------------------ d049 · raggio medio equivalente (pp. 116, 127–128)
export const d049: Dimostrazione = {
  id: 'd049',
  titolo: 'Raggio medio equivalente e braccio della risultante tangenziale',
  enunciato: 'Definire il raggio equivalente R_m = M_f/(f F_N), calcolarlo nelle due ipotesi di pressione e confrontarlo con il braccio b_t della risultante tangenziale.',
  ipotesi: ['pattino a settore α fra r_i e r_e; F_N risultante normale (forza di comando)', 'usura uniforme p = K″/r (dispensa) oppure pressione uniforme (disco nuovo, fonte esterna)'],
  sample: (rnd) => {
    const c = sampleCorona(rnd), FN = U(rnd, 1000, 10000), K = FN / (c.alpha * (c.re - c.ri));
    const du = discoSettore({ ri: c.ri, re: c.re, alpha: c.alpha, f: c.f, FN, legge: 'usura' });
    const dp = discoSettore({ ri: c.ri, re: c.re, alpha: c.alpha, f: c.f, FN, legge: 'uniforme' });
    return { ...c, FN, K, Mu: du.Mf, Mp: dp.Mf, FT: du.FT, bt: du.bt };
  },
  passi: [
    {
      id: 'd049.1',
      latex: 'R_m = \\dfrac{M_f}{f\\,F_N}',
      perche: 'Il raggio equivalente è il braccio che darebbe lo stesso momento se tutta la forza d\'attrito $f F_N$ (somma dei moduli) fosse concentrata lì. Si divide per $f F_N$, **non** per il modulo della risultante tangenziale.',
      fonte: D([116, 120]),
      distrattori: [],
    },
    {
      id: 'd049.2',
      latex: '\\text{usura uniforme: } R_m = r_m = \\dfrac{r_e + r_i}{2}',
      perche: 'Dal momento di d048 diviso $f F_N$: è la (5.84) del libro per la frizione.',
      fonte: D([116, 120], { eq: '(5.84)' }),
      distrattori: [],
      num: (v) => [v.Mu / (v.f * v.FN), v.rm],
    },
    {
      id: 'd049.3',
      latex: '\\text{pressione uniforme: } R_m = \\dfrac{2}{3}\\,\\dfrac{r_e^3 - r_i^3}{r_e^2 - r_i^2}',
      perche: 'Dal momento di d047 diviso $f F_N$.',
      fonte: EST_UNIF,
      distrattori: [],
      num: (v) => [v.Mp / (v.f * v.FN), v.Ru],
    },
    {
      id: 'd049.4',
      latex: 'R_{m,\\,unif} - r_m = \\dfrac{(r_e - r_i)^2}{6\\,(r_e + r_i)} > 0',
      perche: 'Con la pressione uniforme le forze sono spostate verso l\'esterno rispetto all\'usura uniforme: il disco nuovo frena (o trasmette) un po\' di più. Per questo nel progetto si usa l\'usura uniforme: è la stima cautelativa.',
      fonte: DED('d047 e p. 116', 'differenza fra i due raggi equivalenti, semplificata'),
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: 'R_{m,\\,unif} - r_m = -\\dfrac{(r_e - r_i)^2}{6\\,(r_e + r_i)}', errore: 'segno', spiega: 'Con p uniforme la parte esterna, a braccio maggiore, pesa di più: il raggio equivalente cresce.', num: (v) => [v.Ru - v.rm, -((v.re - v.ri) ** 2) / (6 * (v.re + v.ri))] },
        { latex: 'R_{m,\\,unif} = r_m', errore: 'concetto', spiega: 'Coincidono solo per una corona sottilissima (r_e → r_i).', num: (v) => [v.Ru - v.rm, 0] },
      ],
      num: (v) => [v.Ru - v.rm, (v.re - v.ri) ** 2 / (6 * (v.re + v.ri))],
    },
    {
      id: 'd049.5',
      latex: '\\underline F_T = \\int -f\\,\\dfrac{K\'\'}{r}\\,\\underline e_\\theta\\,r\\,dr\\,d\\theta = -fK\'\'(r_e - r_i)\\,2\\sin\\dfrac{\\alpha}{2}\\,\\underline j \\;\\Rightarrow\\; |\\underline F_T| = f F_N\\,\\dfrac{\\sin(\\alpha/2)}{\\alpha/2}',
      perche: '«Vale la relazione $|F_T| = \\mu|F_N|$? Quindi no!» (p. 116): le tangenziali elementari non sono parallele, si scompone $\\underline e_\\theta$ e per simmetria resta solo la componente perpendicolare alla bisettrice. Si moltiplica e divide per $\\alpha$ e si riconosce $F_N$.',
      fonte: D([116, 127]),
      chiave: true,
      distrattori: [
        { latex: '|\\underline F_T| = f\\,F_N', errore: 'concetto', spiega: 'Vale solo per α → 0 (pattino puntiforme). È la generalizzazione indebita delle fonti derivate (NF-37).', num: (v) => [v.FT, v.f * v.FN] },
        { latex: '|\\underline F_T| = f F_N\\,\\dfrac{\\alpha/2}{\\sin(\\alpha/2)}', errore: 'indice', spiega: 'Rapporto capovolto: la risultante è minore della somma dei moduli, quindi il fattore è < 1.', num: (v) => [v.FT, (v.f * v.FN * v.alpha) / 2 / Math.sin(v.alpha / 2)] },
      ],
      num: (v) => [Math.abs(simpson2((r, t) => -v.f * (v.K / r) * Math.cos(t) * r, v.ri, v.re, -v.alpha / 2, v.alpha / 2, 200)), (v.f * v.FN * Math.sin(v.alpha / 2)) / (v.alpha / 2)],
    },
    {
      id: 'd049.6',
      latex: 'b_t = \\dfrac{M_f}{|\\underline F_T|} = r_m\\,\\dfrac{\\alpha/2}{\\sin(\\alpha/2)} \\;\\neq\\; R_m',
      perche: 'Se si scrive il momento con la risultante tangenziale, il suo braccio $b_t$ è maggiore del raggio medio (p. 127): $R_m$ e $b_t$ sono due cose diverse.',
      fonte: D(127),
      distrattori: [
        { latex: 'b_t = r_m', errore: 'concetto', spiega: 'Sarebbe vero se |F_T| = f F_N, cioè solo per α → 0.', num: (v) => [v.bt, v.rm] },
      ],
      num: (v) => [v.bt, (v.rm * v.alpha) / 2 / Math.sin(v.alpha / 2)],
    },
    {
      id: 'd049.7',
      latex: '\\alpha \\to 0:\\ |\\underline F_T| \\to fF_N,\\ b_t \\to r_m;\\qquad \\alpha = 2\\pi:\\ |\\underline F_T| = 0,\\ b_t \\to \\infty\\ (\\text{coppia pura})',
      perche: 'Casi di p. 116 e 127–128: con il settore ridotto a un punto si ritrova la forza concentrata; con la corona completa (frizione piana) le tangenziali si fanno equilibrio a due a due, la risultante è nulla ma il momento no: è una **coppia pura**, che non dipende dal polo.',
      fonte: D([116, 128]),
      distrattori: [],
      num: (v) => [discoSettore({ ri: v.ri, re: v.re, alpha: 2 * Math.PI, f: v.f, FN: v.FN, legge: 'usura' }).FT, 0],
    },
  ],
  risultato: { latex: 'R_m = \\dfrac{M_f}{fF_N} = \\begin{cases} \\dfrac{r_e + r_i}{2} & \\text{usura unif.}\\\\[1mm] \\dfrac{2}{3}\\dfrac{r_e^3 - r_i^3}{r_e^2 - r_i^2} & \\text{press. unif.}\\end{cases}\\qquad b_t = r_m\\dfrac{\\alpha/2}{\\sin(\\alpha/2)}', fonte: D([116, 127]) },
  gancio: 'R_m divide per f F_N; b_t divide per |F_T|: sul settore non sono la stessa cosa.',
};

// ------------------------------------------------------------------ argomento
export const disco: ArgomentoContenuto = {
  id: 'c3-disco',
  cosaDireSubito:
    'Nel freno a disco un pattino a settore, fra r_i e r_e e di apertura α, è premuto sul disco rotante da una pinza. L\'accostamento è una traslazione, quindi il consumo è uniforme e per Reye la pressione è iperbolica, p = K″/r. Integrando: F_N = K″α(r_e − r_i) e M_f = f F_N r_m, con r_m = (r_e + r_i)/2; ma la risultante tangenziale non è f F_N, è f F_N sin(α/2)/(α/2), e per α = 2π si annulla: coppia pura.',
  sistemaIpotesi: [
    'Sistema: disco che ruota con ω; pattino a settore α fra r_i e r_e; pinza flottante con due pattini simmetrici.',
    'Accostamento rigido traslatorio (coppia prismatica): consumo uniforme.',
    'Ipotesi di Reye ⇒ p = K″/r; attrito coulombiano f.',
    'Variante: disco nuovo con pressione uniforme (non nella dispensa).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Freno a disco (dispensa p. 116): vista frontale con il settore del pattino e l\'elemento dA = r dr dθ; vista laterale con la pressione di comando uniforme e quella sul disco iperbolica.',
    fonte: D(116, { fig: 'schizzo manoscritto in due viste' }),
    elementi: [
      { id: 'disco', testo: 'disco di centro O con il verso di ω', obbligatorio: true },
      { id: 'settore', testo: 'pattino a settore di apertura α fra r_i e r_e, simmetrico rispetto all\'asse x', obbligatorio: true },
      { id: 'P', testo: 'punto P a raggio r e angolo θ con dA = r dr dθ', obbligatorio: true },
      { id: 'versori', testo: 'versori e_r, e_θ; V_P lungo e_θ e dF_T opposta', obbligatorio: true },
      { id: 'laterale', testo: 'vista laterale: dF_N lungo l\'asse z, pressione iperbolica (più alta all\'interno)', obbligatorio: true },
      { id: 'pinza', testo: 'pinza flottante con due pattini opposti', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'd\\underline F_N = -p\\,dA\\,\\hat k,\\quad d\\underline F_T = -f p\\,dA\\,\\underline e_\\theta,\\quad d\\underline M_f = (P - O)\\wedge d\\underline F_T,\\quad p = \\dfrac{K\'\'}{r}',
    spiegazione: 'Forze elementari del pattino sul disco, momento elementare, pressione da Reye con consumo uniforme.',
    fonte: D(116),
  },
  dimostrazioni: ['d047', 'd048', 'd049'],
  significato:
    'Il momento frenante è proporzionale alla forza di comando con un braccio fisso, r_m: il freno è lineare e non autoenergizzante, quindi ha un\'azione frenante più costante del tamburo, ma a parità di dimensioni chiede una forza di comando più intensa. Il fattore sin(α/2)/(α/2) ricorda che con un settore esteso le forze tangenziali non si sommano come scalari.',
  fraseDaRicordare: 'Disco: consumo uniforme, pressione K″/r, momento f F_N r_m; ma |F_T| ≠ f F_N se α è finito.',
  daNonDire: [
    { frase: '|F_T| = f |F_N| per il pattino del disco.', perche: 'Con un settore finito |F_T| = f F_N sin(α/2)/(α/2) < f F_N; per α = 2π vale zero (NF-37).', fonte: D(116) },
    { frase: 'Il raggio equivalente è la coppia divisa per la forza tangenziale totale.', perche: 'R_m = M_f/(f F_N). M_f/|F_T| è il braccio b_t, maggiore di r_m (NF-145).', fonte: D(127) },
    { frase: 'La pressione sul disco è uniforme perché l\'olio di comando spinge uniformemente.', perche: 'Il comando è uniforme da un lato, la pressione sul disco è iperbolica dall\'altro: la differenza è una coppia sul pattino ripresa dalla coppia prismatica.', fonte: D(127) },
    { frase: 'La pressione è massima al raggio esterno.', perche: 'p = K″/r: è massima al raggio interno.', fonte: D([108, 116]) },
    { frase: 'Il freno a disco a parità di dimensioni frena più del tamburo con la stessa forza.', perche: 'La dispensa dice il contrario: più costanza nell\'azione frenante, ma serve una forza di comando più intensa per lo stesso momento.', fonte: D(116) },
  ],
  approfondimenti: [
    { domanda: 'Perché la pressione è iperbolica?', tipo: 'collegamento', argomento: 'c3-reye', attesa: 'Il pattino trasla nella pinza: consumo uniforme. Per Reye δ̇ = k f ω r p: con δ̇ costante, r·p costante.', fonte: D([116, 127]) },
    { domanda: 'Che differenza c\'è con la frizione piana?', tipo: 'collegamento', argomento: 'c3-frizione-piana', attesa: 'La frizione assiale semplice è un freno a disco ad accostamento rigido con α = 2π; l\'unica differenza è che entrambi i dischi ruotano durante l\'innesto. Stessa coppia f N r_m.', fonte: D([116, 119]) },
    { domanda: 'Perché la pinza è flottante?', tipo: 'approfondimento', attesa: 'Per spingere il disco da entrambi i lati con forze uguali, opposte e collineari: spingendolo da un lato solo si inflette. La pinza si autocentra.', fonte: D([126, 127]) },
    { domanda: 'Dove è applicata la risultante delle forze normali?', tipo: 'approfondimento', attesa: 'Sulla bisettrice, più vicino al centro del punto medio del pattino (pressione più alta all\'interno): con Varignon b_m = r_m sin(α/2)/(α/2), e b_m·b_t = r_m². F_N e F_T sono nello stesso punto solo per α → 0.', fonte: D(128) },
    { domanda: 'E se il disco è nuovo?', tipo: 'approfondimento', attesa: 'Pressione circa uniforme: M_f = (2/3) f F_N (r_e³ − r_i³)/(r_e² − r_i²), un po\' più di f F_N r_m. Poi si consuma di più all\'esterno e si torna a K″/r. Non è nella dispensa.', fonte: EST_UNIF },
    { domanda: 'Che succede alla risultante tangenziale per α = 2π?', tipo: 'approfondimento', attesa: 'È nulla e il braccio infinito: il momento resta finito, è una coppia pura, indipendente dal polo.', fonte: D(128) },
  ],
  simboli: [
    { simbolo: 'r_i,\\ r_e,\\ r_m', significato: 'raggi interno, esterno e medio del pattino', altrove: 'R_i, R_o nelle dimostrazioni derivate' },
    { simbolo: 'r', significato: 'raggio corrente del punto P', altrove: 'la dispensa a p. 116 scrive anche R' },
    { simbolo: 'K\'\'', significato: 'costante della pressione iperbolica p = K″/r', altrove: 'K nelle domande' },
    { simbolo: '\\alpha', significato: 'apertura del settore del pattino' },
    { simbolo: 'F_N,\\ F_T', significato: 'risultanti normale e tangenziale del pattino sul disco (apice (P,D))', altrove: 'N, T con μ nelle domande' },
    { simbolo: 'b_t,\\ b_m', significato: 'bracci della risultante tangenziale e normale' },
    { simbolo: 'R_m', significato: 'raggio equivalente M_f/(f F_N)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c3-disco' }],
  previsioni: [
    {
      id: 'c3-disco-2pi',
      domanda: 'Allarga il pattino fino alla corona completa (α = 2π). La risultante delle forze tangenziali…',
      opzioni: ['vale f F_N', 'vale f F_N/2', 'è nulla', 'diverge'],
      corretta: 2,
      spiega: 'Le tangenziali si equilibrano a due a due: |F_T| = f F_N sin(π)/π = 0. Il momento f F_N r_m resta: coppia pura.',
      verify: () => {
        const r = discoSettore({ ri: 0.06, re: 0.12, alpha: 2 * Math.PI, f: 0.35, FN: 3000, legge: 'usura' });
        return Math.abs(r.FT) < 1e-9 && r.Mf > 0 ? 2 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c3-disco' },
    },
    {
      id: 'c3-disco-nuovo',
      domanda: 'A pari forza F_N, il disco nuovo (pressione uniforme) rispetto a quello rodato (usura uniforme) frena…',
      opzioni: ['meno', 'uguale', 'un po\' di più'],
      corretta: 2,
      spiega: 'R_m,unif − r_m = (r_e − r_i)²/(6(r_e + r_i)) > 0: le forze sono più verso l\'esterno.',
      verify: () => {
        const p = { ri: 0.06, re: 0.12, alpha: 1, f: 0.35, FN: 3000 };
        const a = discoSettore({ ...p, legge: 'uniforme' }).Mf, b = discoSettore({ ...p, legge: 'usura' }).Mf;
        return a > b ? 2 : a < b ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c3-disco' },
    },
  ],
  nf: ['NF-37', 'NF-07', 'NF-143', 'NF-145'],
};

export { EST_UNIF };
