/**
 * C3 · Freno a pattino: accostamento rigido e libero (domande q12, q38).
 * Dispensa pp. 114–115 (manoscritto), 124–125 (appunti del 28/04/2025); collegamenti pp. 103, 112–113, 128.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { pattino as pat, simpson, simpson2 } from '../../engine/c3';
import { arrow, dim, dot, ground, line, pin, poly, rect, rot, svg, text } from '../svg';
import { D, DED, cz, dot as dt, wk } from './comune';

// ------------------------------------------------------------------ disegno (p. 114: pattino incernierato in O sul nastro)
function disegno() {
  const ox = 300, oy = 62, ny = 196; // cerniera O e quota del nastro
  const sp = 40, lp = 150; // s e l in pixel
  const xa = ox - sp - lp, xb = ox - sp; // estremi del pattino
  const kx = (x: number) => 0.33 * (ox - x);
  const S2 = (sp + lp) ** 2 - sp ** 2, S3 = (sp + lp) ** 3 - sp ** 3;
  const x0 = ox - ((2 / 3) * S3) / S2, xc = ox - sp - lp / 2;
  return svg(400, 320, [
    line(20, ny, 385, ny, 'l', 3), ground(20, ny + 2, 60, ny + 2),
    arrow(110, ny + 14, 50, ny + 14, 'v', 'V_nastro', -6, 12),
    pin(ox, oy, 'O'), line(ox, oy, ox, ny, 'd'), dot(ox, ny, 'O*', 14, 12),
    rect(xa, ny - 18, lp, 18, 'soft'), rect(xa, ny - 18, lp, 18, 'l'),
    line(ox, oy, xb - 6, ny - 18, 'l', 3), line(ox, oy, xa + 30, ny - 18, 'l', 3),
    rot(ox, oy, 30, 120, 190, 'f', 'C_az'),
    dim(ox + 22, oy, ox + 22, ny, 'h', -10),
    // distribuzione lineare della pressione sotto il nastro
    poly([[xb, ny + 26], [xb, ny + 26 + kx(xb)], [xa, ny + 26 + kx(xa)], [xa, ny + 26]], 'soft', true),
    poly([[xb, ny + 26], [xb, ny + 26 + kx(xb)], [xa, ny + 26 + kx(xa)], [xa, ny + 26]], 'a', true),
    text(xa - 6, ny + 64, 'p(x) = k′x', { c: 'a', anchor: 'end', size: 13 }),
    line(xc, ny - 26, xc, ny + 26 + kx(xc), 'd'), text(xc, ny - 32, 's + l/2', { c: 'm', size: 11 }),
    arrow(x0, ny + 24, x0, ny + 2, 'f'), text(x0 + 6, ny + 14, 'F_N', { c: 'f', size: 12, anchor: 'start' }),
    line(x0, ny + 26, x0, 296, 'd'),
    arrow(x0, ny - 4, x0 - 38, ny - 4, 'f', 'F_T', -6, -10),
    arrow(ox, 300, 40, 300, 'm'), text(34, 300, 'x', { c: 'm', it: true }),
    line(xb, 294, xb, 306, 'm'), line(xa, 294, xa, 306, 'm'), line(x0, 296, x0, 304, 'a'),
    text(xb, 288, 's', { c: 'm', size: 12 }), text(xa, 288, 's + l', { c: 'm', size: 12 }), text(x0, 288, 'x₀', { c: 'a', size: 12 }),
  ], 'Freno a pattino ad accostamento rigido: cerniera O, proiezione O*, pressione lineare p = k′x, risultante in x₀');
}

// ------------------------------------------------------------------ campione del pattino rigido
const samplePattino = (rnd: () => number) => {
  const s = U(rnd, 0.02, 0.1), l = U(rnd, 0.05, 0.2), B = U(rnd, 0.03, 0.1), f = U(rnd, 0.2, 0.45), Caz = U(rnd, 50, 500);
  const S2 = (s + l) ** 2 - s ** 2, S3 = (s + l) ** 3 - s ** 3, x0 = ((2 / 3) * S3) / S2;
  const h = (x0 / f) * U(rnd, 0.2, 0.8);
  const r = pat({ s, l, B, f, h, Caz, verso: 'contro' });
  const ra = pat({ s, l, B, f, h, Caz, verso: 'aiuta' });
  const x = U(rnd, s, s + l), wacc = U(rnd, 0.01, 0.1), kb = U(rnd, 0.5, 2), V = U(rnd, 1, 10), p = U(rnd, 1e5, 1e6), dA = U(rnd, 1e-5, 1e-4);
  return { s, l, B, f, Caz, S2, S3, x0, h, FT: r.FT, FN: r.FN, k1: r.k1, FTa: ra.FT, x, wacc, kb, V, p, dA, kk: wacc / (kb * f * V) };
};

// ------------------------------------------------------------------ d044 · accostamento rigido (pp. 114–115)
export const d044: Dimostrazione = {
  id: 'd044',
  titolo: 'Freno a pattino ad accostamento rigido: pressione lineare e forza frenante',
  enunciato: 'Per un pattino incernierato in O e premuto da una coppia C_az su un nastro che trasla, ricavare la distribuzione di pressione, le risultanti, il loro punto di applicazione e la forza frenante.',
  ipotesi: [
    'cerniera O a quota h sul nastro; O* proiezione di O sul nastro; asse x lungo il nastro da O*; pattino fra x = s e x = s + l, profondità B',
    'ipotesi di Reye; velocità del nastro V uguale in tutti i punti; attrito coulombiano f',
    'verso del nastro della figura di p. 114 (dal lato di O* verso il pattino): l\'attrito si oppone alla coppia di accostamento',
  ],
  sample: samplePattino,
  passi: [
    {
      id: 'd044.1',
      latex: '\\text{gdl: } 1\\ (\\text{cerniera } O) - 2\\ (\\text{contatto esteso}) \\;\\Rightarrow\\; \\text{iperstatico di un grado}',
      perche: 'Il pattino può solo ruotare attorno a O; il contatto con il nastro su una superficie estesa toglierebbe altri due gradi di libertà. La statica non basta a trovare $p(x)$: serve l\'ipotesi dell\'usura (p. 114).',
      fonte: D(114),
      distrattori: [],
    },
    {
      id: 'd044.2',
      latex: '\\dot\\delta = \\underline V_{acc}\\cdot\\underline m = \\underline\\omega_{acc}\\wedge\\big[(O^* - O) + (P - O^*)\\big]\\cdot\\underline m = \\underline\\omega_{acc}\\wedge(P - O^*)\\cdot\\underline m = \\omega_{acc}\\,x',
      perche: 'Come nel tamburo, il consumo è la componente normale della velocità di accostamento. $(O^* - O)$ è perpendicolare al nastro, quindi $\\underline\\omega_{acc}\\wedge(O^*-O)$ è **parallela** al nastro e sparisce nel prodotto con $\\underline m$; resta il termine con $x$ (la dispensa scrive il determinante e trova $-\\omega_{acc}x$, segno legato all\'asse x verso sinistra; in modulo $\\omega_{acc}x$). Il consumo cresce **linearmente** con la distanza da $O^*$.',
      fonte: D(114),
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta = \\omega_{acc}\\,h', errore: 'termine-perso', spiega: 'È il termine sbagliato: ω_acc∧(O*−O) è parallelo al nastro e non consuma. Con questo il consumo verrebbe uniforme.', num: (v) => [Math.abs(dt(wk(v.wacc, v.x, -v.h), [0, -1])), v.wacc * v.h] },
        { latex: '\\dot\\delta = \\omega_{acc}\\sqrt{x^2 + h^2}', errore: 'concetto', spiega: 'Il consumo è solo la componente della velocità di accostamento normale al nastro, non il suo modulo.', num: (v) => [Math.abs(dt(wk(v.wacc, v.x, -v.h), [0, -1])), v.wacc * Math.hypot(v.x, v.h)] },
      ],
      num: (v) => [Math.abs(dt(wk(v.wacc, v.x - 0, 0 - v.h), [0, -1])), v.wacc * v.x],
    },
    {
      id: 'd044.3',
      latex: '\\dot\\delta\\,dA = \\bar k\\,\\big|d\\underline F_T\\cdot\\underline V_{nastro}\\big| = \\bar k\\,\\big|(-f\\,p\\,dA)\\,\\underline i\\cdot V\\,\\underline i\\big| \\;\\Rightarrow\\; \\dot\\delta = \\bar k f V p',
      perche: 'Reye: la portata è proporzionale alla potenza dissipata. La velocità di strisciamento è quella del nastro, **uguale in ogni punto**: quindi il consumo è proporzionale alla sola pressione.',
      fonte: D(114),
      distrattori: [],
      num: (v) => [(v.kb * Math.abs(-v.f * v.p * v.dA * v.V)) / v.dA, v.kb * v.f * v.V * v.p],
    },
    {
      id: 'd044.4',
      latex: '\\bar k f V\\,p = \\omega_{acc}\\,x \\;\\Rightarrow\\; p(x) = \\underbrace{\\dfrac{\\omega_{acc}}{\\bar k f V}}_{k\'}\\,x = k\'\\,x',
      perche: 'Uguagliando le due espressioni del consumo: la pressione è **lineare** in $x$, nulla in $O^*$ e massima all\'estremo del pattino più lontano dalla cerniera.',
      fonte: D(114),
      chiave: true,
      distrattori: [
        { latex: 'p(x) = p_0\\ \\text{(uniforme come nel tamburo)}', errore: 'ipotesi', spiega: 'Nel tamburo il consumo era quasi uniforme (cos θ con α ≤ 90°); qui la normale non ruota e il consumo è lineare in x.', num: (v) => [v.kk * v.x, v.kk * (v.s + v.l / 2)] },
        { latex: 'p(x) = \\dfrac{k\'}{x}', errore: 'concetto', spiega: 'L\'iperbole è del disco (velocità ∝ r, consumo uniforme). Qui la velocità è costante e il consumo cresce con x.', num: (v) => [v.kk * v.x, v.kk / v.x] },
      ],
      num: (v) => [(v.wacc * v.x) / (v.kb * v.f * v.V), v.kk * v.x],
    },
    {
      id: 'd044.5',
      latex: '|\\underline F_N| = \\int_s^{s+l} k\'x\\,B\\,dx = Bk\'\\,\\dfrac{x^2}{2}\\Big|_s^{s+l} = \\dfrac{Bk\'}{2}\\big[(s+l)^2 - s^2\\big]',
      perche: 'Le forze normali elementari sono tutte **parallele** (perpendicolari al nastro): la risultante è la somma dei moduli. $dA = B\\,dx$.',
      fonte: D(114),
      distrattori: [],
      num: (v) => [simpson((x) => v.k1 * x * v.B, v.s, v.s + v.l), v.FN],
    },
    {
      id: 'd044.6',
      latex: '|\\underline F_T| = \\int_s^{s+l} f\\,k\'x\\,B\\,dx = f\\,|\\underline F_N|',
      perche: 'Anche le tangenziali sono parallele (lungo il nastro): qui $|F_T| = f|F_N|$ vale esattamente («verificato», p. 114). La forza del pattino sul nastro è opposta alla velocità del nastro.',
      fonte: D([114, 124]),
      distrattori: [],
      num: (v) => [simpson((x) => v.f * v.k1 * x * v.B, v.s, v.s + v.l), v.f * v.FN],
    },
    {
      id: 'd044.7',
      latex: '|\\underline F_N|\\,x_0 = \\int_s^{s+l} x\\,dF_N = Bk\'\\,\\dfrac{x^3}{3}\\Big|_s^{s+l} \\;\\Rightarrow\\; x_0 = \\dfrac{2}{3}\\,\\dfrac{(s+l)^3 - s^3}{(s+l)^2 - s^2}',
      perche: 'Teorema di Varignon: il momento della risultante uguaglia la risultante dei momenti. La pressione cresce con $x$, quindi $x_0$ è **oltre** il centro del pattino, verso l\'estremo lontano da $O^*$.',
      fonte: D([114, 125]),
      chiave: true,
      correzione: { nf: 'NF-142', dispensaScrive: 'x_0 = \\dfrac{k\'B\\,\\frac{x^3}{3}\\big|_s^{s+l}}{Bk\'\\,\\frac{x^4}{2}\\big|_s^{s+l}}\\ \\text{(lettura incerta)}' },
      distrattori: [
        { latex: 'x_0 = s + \\dfrac{l}{2}', errore: 'ipotesi', spiega: 'Il centro del pattino è il punto della risultante solo con pressione uniforme; qui la pressione è triangolare/trapezia.', num: (v) => [simpson((x) => x * v.k1 * x * v.B, v.s, v.s + v.l) / v.FN, v.s + v.l / 2] },
        { latex: 'x_0 = \\dfrac{1}{2}\\,\\dfrac{(s+l)^3 - s^3}{(s+l)^2 - s^2}', errore: 'fattore', spiega: 'Il rapporto fra 1/3 (dal momento) e 1/2 (dalla forza) dà 2/3.', num: (v) => [v.x0, (0.5 * v.S3) / v.S2] },
      ],
      num: (v) => [simpson((x) => x * v.k1 * x * v.B, v.s, v.s + v.l) / v.FN, ((2 / 3) * v.S3) / v.S2],
    },
    {
      id: 'd044.8',
      latex: '\\sum M_O = 0:\\quad C_{az} = |\\underline F_N|\\,x_0 + |\\underline F_T|\\,h',
      perche: 'Equilibrio alla rotazione del pattino attorno a $O$ (II eq. cardinale). La normale ha braccio $x_0$, l\'attrito (lungo il nastro, a quota $-h$) braccio $h$. Nel verso del nastro della figura i due momenti hanno lo stesso verso e la coppia di accostamento deve vincerli entrambi. La dispensa perde un segno su $C_{az}$ fra la prima e la seconda riga (NF-142).',
      fonte: D([114, 115]),
      correzione: { nf: 'NF-142', dispensaScrive: 'C_{az} + k\'B\\frac{x^3}{3}\\Big|_s^{s+l} + fk\'Bh\\frac{x^2}{2}\\Big|_s^{s+l} = 0' },
      distrattori: [
        { latex: 'C_{az} = |\\underline F_N|\\,x_0', errore: 'termine-perso', spiega: 'L\'attrito agisce sul nastro, a distanza h dalla cerniera: ha momento rispetto a O e non si può trascurare.', num: (v) => [v.Caz, v.FN * v.x0] },
      ],
      num: (v) => [v.Caz, v.FN * v.x0 + v.FT * v.h],
    },
    {
      id: 'd044.9',
      latex: 'F_T = \\dfrac{C_{az}}{\\dfrac{x_0}{f} \\pm h}\\qquad (\\text{«}-\\text{» freno di sicurezza})',
      perche: 'Con $F_N = F_T/f$ si esplicita la forza frenante. Se il nastro va nel verso opposto l\'attrito cambia verso e il suo momento **aiuta** la coppia: compare il «$-$» (p. 115). Allora per $x_0/f \\to h$ la forza frenante cresce senza limite: è il «freno di sicurezza», che «causa l\'impuntamento» (p. 125).',
      fonte: D([115, 125]),
      chiave: true,
      distrattori: [
        { latex: 'F_T = \\dfrac{f\\,C_{az}}{x_0}', errore: 'termine-perso', spiega: 'Manca il braccio h dell\'attrito: è proprio quel termine che rende il freno diverso nei due versi.', num: (v) => [v.FT, (v.f * v.Caz) / v.x0] },
        { latex: 'F_T = \\dfrac{C_{az}}{x_0 f \\pm h}', errore: 'fattore', spiega: 'F_N = F_T/f: x₀ va diviso per f.', num: (v) => [v.FT, v.Caz / (v.x0 * v.f + v.h)] },
      ],
      num: (v) => [v.FTa * (v.x0 / v.f) - v.FTa * v.h, v.Caz],
    },
  ],
  risultato: { latex: 'p = k\'x,\\quad x_0 = \\dfrac{2}{3}\\dfrac{(s+l)^3 - s^3}{(s+l)^2 - s^2},\\quad F_T = \\dfrac{C_{az}}{x_0/f \\pm h}', fonte: D([114, 115]) },
  gancio: 'Il pattino ruota attorno a O: consumo lineare, pressione triangolare, segno meno = freno di sicurezza.',
};

// ------------------------------------------------------------------ d045 · accostamento libero (pp. 103, 112–113, 125)
export const d045: Dimostrazione = {
  id: 'd045',
  titolo: 'Freno a pattino ad accostamento libero: corpo a due forze',
  enunciato: 'Per un pattino collegato a un\'asta Ō–A comandata da una coppia C, trovare retta d\'azione, modulo e componenti della forza frenante.',
  ipotesi: [
    'pattino incernierato in A a un\'asta incernierata a terra in Ō, su cui agisce la coppia C; masse trascurate',
    'nastro che trasla (verso noto); attrito coulombiano f = tg φ',
  ],
  sample: (rnd) => {
    const f = U(rnd, 0.2, 0.5), a = U(rnd, 0.03, 0.1), xA = U(rnd, 0, 0.1), xO = xA + U(rnd, 0.05, 0.2), yO = a + U(rnd, 0.05, 0.25), C = U(rnd, 10, 100);
    const ux = f / Math.hypot(1, f), uy = 1 / Math.hypot(1, f); // direzione della forza del nastro sul pattino (T, N)
    const d = Math.abs(cz(xO - xA, yO - a, ux, uy));
    const Ff = C / d, FN = Ff * uy, FT = Ff * ux;
    return { f, a, xA, xO, yO, C, ux, uy, d, Ff, FN, FT };
  },
  passi: [
    {
      id: 'd045.1',
      latex: 'l = 2\\cdot 3 - 2\\cdot 2 = 2 \\;\\Rightarrow\\; \\text{accostamento libero}',
      perche: 'Due corpi mobili (pattino e asta) e due cerniere (Ō e A): due gradi di libertà, come nel ceppo libero di p. 112.',
      fonte: D([112, 125]),
      distrattori: [],
      num: () => [2 * 3 - 2 * 2, 2],
    },
    {
      id: 'd045.2',
      latex: '\\underline F_f^{(N,P)} + \\underline\\Phi_A = 0,\\quad \\text{collineari} \\;\\Rightarrow\\; \\text{la retta di } \\underline F_f \\text{ passa per } A',
      perche: 'L\'asta porta la coppia: sul pattino agiscono **solo due forze**, quella del nastro e la reazione in A. Due forze in equilibrio sono uguali, opposte e collineari (pp. 103, 112, 125).',
      fonte: D([103, 125]),
      chiave: true,
      distrattori: [
        { latex: '\\text{tre forze concorrenti in } Z', errore: 'ipotesi', spiega: 'Le tre forze concorrenti si hanno quando la forza di comando è applicata al pattino (p. 113) o nell\'accostamento rigido. Con la coppia sull\'asta le forze sul pattino sono due.' },
        { latex: '\\underline F_f\\ \\text{applicata al centro del pattino}', errore: 'ipotesi', spiega: 'Nel libero la posizione della risultante non si conosce a priori: la impone l\'equilibrio, passando per A.' },
      ],
    },
    {
      id: 'd045.3',
      latex: '\\rho = R\\sin\\varphi \\xrightarrow{R\\to\\infty} \\infty \\;\\Rightarrow\\; \\angle(\\underline F_f, \\underline n) = \\varphi,\\quad \\operatorname{tg}\\varphi = \\dfrac{F_T}{F_N} = f',
      perche: 'Nel pattino non c\'è il cerchio d\'attrito: il raggio del «tamburo» è infinito. Si sa però che la forza è inclinata di $\\varphi$ sulla normale, dalla parte del moto del nastro (la forza del nastro sul pattino è concorde con $V_{nastro}$) (p. 125).',
      fonte: D(125),
      chiave: true,
      distrattori: [
        { latex: '\\underline F_f\\ \\text{tangente al cerchio d\'attrito } R\\sin\\varphi', errore: 'concetto', spiega: 'Il nastro è piano: R → ∞ e il cerchio d\'attrito non esiste.' },
        { latex: '\\underline F_f \\perp \\text{nastro}', errore: 'termine-perso', spiega: 'Così si dimentica l\'attrito: in strisciamento la forza è inclinata di φ.', num: (v) => [Math.atan(v.FT / v.FN), 0] },
      ],
      num: (v) => [Math.atan(v.FT / v.FN), Math.atan(v.f)],
    },
    {
      id: 'd045.4',
      latex: 'x_c = x_A - a\\,f',
      perche: 'La retta per $A$ (a quota $a$ sul nastro) inclinata di $\\varphi$ incontra il nastro nel **centro di pressione** $x_c$: è lì che l\'equilibrio impone la risultante delle pressioni, che deve cadere dentro il pattino.',
      fonte: DED('p. 125', 'intersezione col nastro della retta per A inclinata di φ sulla normale'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.xA - (v.a * v.ux) / v.uy, v.xA - v.a * v.f],
    },
    {
      id: 'd045.5',
      latex: '\\sum M_{\\bar O}(\\text{asta}) = 0:\\quad C = |\\underline\\Phi_A|\\,d_{\\bar O} \\;\\Rightarrow\\; |\\underline F_f| = \\dfrac{C}{d_{\\bar O}}',
      perche: 'Il modulo si ricava dall\'equilibrio alla rotazione dell\'asta attorno a Ō (pp. 112, 123): $d_{\\bar O}$ è la distanza di Ō dalla retta d\'azione trovata.',
      fonte: D([112, 123]),
      distrattori: [],
      num: (v) => [v.Ff * Math.abs(cz(v.xO - v.xA, v.yO - v.a, v.ux, v.uy)), v.C],
    },
    {
      id: 'd045.6',
      latex: 'F_N = |\\underline F_f|\\cos\\varphi,\\qquad F_T = |\\underline F_f|\\sin\\varphi = f\\,F_N',
      perche: 'Si scompone la forza lungo la normale e lungo il nastro: la componente tangenziale è la forza frenante sul nastro.',
      fonte: D(125),
      distrattori: [],
      num: (v) => [v.FT, v.Ff * Math.sin(Math.atan(v.f))],
    },
    {
      id: 'd045.7',
      latex: 'C \\uparrow \\;\\Rightarrow\\; |\\underline F_f| \\uparrow,\\ \\varphi\\ \\text{invariato}',
      perche: 'Con una coppia maggiore la forza frenante cresce in modulo ma non si inclina di più: nel modello coulombiano $f$ dipende solo dai materiali (p. 125). E nel libero il profilo di pressione non si conosce a priori: prima si risolve la statica.',
      fonte: D(125),
      distrattori: [],
    },
    {
      id: 'd045.8',
      latex: '\\text{asta senza coppia, } F \\text{ sul pattino}: \\ \\underline\\Phi_A \\parallel \\text{asta},\\ \\text{poligono } (\\underline F, \\underline\\Phi_A, \\underline F_f)',
      perche: 'Se l\'asta è caricata solo agli estremi la reazione è lungo l\'asta; con la forza di comando sul pattino le forze sono tre e concorrenti: si risolve col poligono delle forze. Conviene la cerniera vicina all\'estremo se si carica una forza, A vicino al centro del pattino se si usa una coppia (p. 125).',
      fonte: D([113, 125]),
      distrattori: [],
    },
    {
      id: 'd045.9',
      latex: 'd_{\\bar O} \\to 0 \\;\\Rightarrow\\; |\\underline F_f| = \\dfrac{C}{d_{\\bar O}} \\to \\infty',
      perche: 'Se la retta d\'azione (per A, inclinata di $\\varphi$) passa per Ō, una coppia finita darebbe una forza infinita: il pattino si serra da solo. È la versione «libera» dell\'impuntamento di cui parla q38; la dispensa lo dice solo per il rigido (NF-149).',
      fonte: DED('pp. 115, 125', 'stessa struttura del freno di sicurezza: un braccio che si annulla al denominatore'),
      aggiunto: true,
      distrattori: [],
    },
  ],
  risultato: { latex: '\\underline F_f^{(N,P)}\\ \\text{per } A,\\ \\text{inclinata di } \\varphi;\\quad |\\underline F_f| = \\dfrac{C}{d_{\\bar O}},\\quad F_T = f F_N', fonte: D(125) },
  gancio: 'Libero = due forze: la retta passa per A ed è inclinata di φ; il modulo lo dà l\'asta.',
};

// ------------------------------------------------------------------ d046 · Varignon (pp. 114–115, 125, 128)
export const d046: Dimostrazione = {
  id: 'd046',
  titolo: 'Punto di applicazione della risultante: teorema di Varignon nel pattino e nel disco',
  enunciato: 'Determinare dove è applicata la risultante delle pressioni nel pattino (p = k′x) e nel pattino del freno a disco (p = K″/r), e confrontare con il tamburo.',
  ipotesi: [
    'Varignon: un sistema di forze e la sua risultante hanno lo stesso momento rispetto a ogni polo',
    'pattino: p = k′x fra s e s + l; disco: settore α fra r_i e r_e con p = K″/r; tamburo: p = p₀',
  ],
  sample: (rnd) => {
    const s = U(rnd, 0.02, 0.1), l = U(rnd, 0.05, 0.2), B = U(rnd, 0.03, 0.1), k1 = U(rnd, 1e6, 1e7);
    const ri = U(rnd, 0.05, 0.1), re = ri + U(rnd, 0.03, 0.1), alpha = U(rnd, Math.PI / 6, Math.PI), K = U(rnd, 1e4, 1e5), f = U(rnd, 0.2, 0.5);
    const p0 = U(rnd, 2e5, 1e6), R = U(rnd, 0.1, 0.25);
    const S2 = (s + l) ** 2 - s ** 2, S3 = (s + l) ** 3 - s ** 3, FN = (B * k1 * S2) / 2, x0 = ((2 / 3) * S3) / S2;
    const FNd = K * alpha * (re - ri), rm = (re + ri) / 2;
    const bm = simpson2((r, t) => r * Math.cos(t) * (K / r) * r, ri, re, -alpha / 2, alpha / 2, 200) / FNd;
    const Mf = (f * K * alpha * (re * re - ri * ri)) / 2, FT = f * K * (re - ri) * 2 * Math.sin(alpha / 2), bt = Mf / FT;
    return { s, l, B, k1, S2, S3, FN, x0, ri, re, alpha, K, f, FNd, rm, bm, Mf, FT, bt, p0, R };
  },
  passi: [
    {
      id: 'd046.1',
      latex: '|\\underline F_N| = \\int dF_N,\\qquad |\\underline F_N|\\,x_0 = \\int x\\,dF_N',
      perche: '«Eguaglio il momento risultante con la risultante dei momenti» (p. 125): la risultante va applicata dove produce lo stesso momento delle forze distribuite.',
      fonte: D([115, 125]),
      distrattori: [],
    },
    {
      id: 'd046.2',
      latex: '\\int_s^{s+l} x\\,(k\'x\\,B\\,dx) = \\dfrac{Bk\'}{3}\\big[(s+l)^3 - s^3\\big]',
      perche: 'Nel pattino la forza elementare è $k\'x\\,B\\,dx$ e il suo braccio rispetto a $O^*$ è $x$: compare $x^2$ sotto integrale.',
      fonte: D(115),
      distrattori: [],
      num: (v) => [simpson((x) => x * v.k1 * x * v.B, v.s, v.s + v.l), (v.B * v.k1 * v.S3) / 3],
    },
    {
      id: 'd046.3',
      latex: 'x_0 = \\dfrac{\\int x\\,dF_N}{\\int dF_N} = \\dfrac{2}{3}\\,\\dfrac{(s+l)^3 - s^3}{(s+l)^2 - s^2}',
      perche: 'Si divide per $|F_N| = \\tfrac{Bk\'}{2}[(s+l)^2 - s^2]$: $B$ e $k\'$ si semplificano, $x_0$ dipende solo dalla geometria.',
      fonte: D(115),
      chiave: true,
      distrattori: [
        { latex: 'x_0 = s + \\dfrac{l}{2}', errore: 'ipotesi', spiega: 'È il baricentro dell\'area del pattino: coincide con il punto della risultante solo se la pressione è uniforme.', num: (v) => [simpson((x) => x * v.k1 * x * v.B, v.s, v.s + v.l) / v.FN, v.s + v.l / 2] },
        { latex: 'x_0 = \\dfrac{\\int x^2\\,dF_N}{\\int dF_N}', errore: 'fattore', spiega: 'Il braccio compare una volta sola: x dF_N, non x² dF_N (che non è nemmeno una lunghezza).', num: (v) => [simpson((x) => x * v.k1 * x * v.B, v.s, v.s + v.l) / v.FN, simpson((x) => x * x * v.k1 * x * v.B, v.s, v.s + v.l) / v.FN] },
      ],
      num: (v) => [simpson((x) => x * v.k1 * x * v.B, v.s, v.s + v.l) / simpson((x) => v.k1 * x * v.B, v.s, v.s + v.l), v.x0],
    },
    {
      id: 'd046.4',
      latex: 'x_0 - \\Big(s + \\dfrac{l}{2}\\Big) = \\dfrac{l^2}{6\\,(2s + l)} > 0',
      perche: 'La risultante è spostata oltre il centro, verso l\'estremo lontano da $O^*$, dove la pressione è maggiore. Lo scarto cresce con la lunghezza del pattino.',
      fonte: DED('p. 115', 'differenza fra x₀ di p. 115 e il centro del pattino, semplificata'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.x0 - (v.s + v.l / 2), (v.l * v.l) / (6 * (2 * v.s + v.l))],
    },
    {
      id: 'd046.5',
      latex: '|\\underline F_N|\\,b_m = \\int_{-\\alpha/2}^{\\alpha/2}\\!\\!\\int_{r_i}^{r_e} r\\cos\\theta\\,\\dfrac{K\'\'}{r}\\,r\\,dr\\,d\\theta \\;\\Rightarrow\\; b_m = r_m\\,\\dfrac{\\sin(\\alpha/2)}{\\alpha/2}',
      perche: 'Nel disco la risultante normale sta sulla bisettrice del settore (simmetria) a distanza $b_m$ dal centro: il braccio della forza elementare rispetto all\'asse perpendicolare alla bisettrice è $r\\cos\\theta$. $b_m < r_m$: la risultante è «più in basso», più vicina al centro (p. 128).',
      fonte: DED('pp. 116, 128', 'Varignon citato a p. 128 con la pressione di p. 116; la dispensa non scrive b_m'),
      chiave: true,
      distrattori: [
        { latex: 'b_m = r_m', errore: 'ipotesi', spiega: 'Il punto medio del settore non è il centro di pressione: la pressione è più alta all\'interno e il settore è curvo.', num: (v) => [v.bm, v.rm] },
        { latex: 'b_m = r_m\\,\\dfrac{\\alpha/2}{\\sin(\\alpha/2)}', errore: 'indice', spiega: 'Questo è il braccio b_t della risultante tangenziale: i due sono «speculari».', num: (v) => [v.bm, (v.rm * v.alpha) / 2 / Math.sin(v.alpha / 2)] },
      ],
      num: (v) => [v.bm, (v.rm * Math.sin(v.alpha / 2)) / (v.alpha / 2)],
    },
    {
      id: 'd046.6',
      latex: 'b_t = \\dfrac{M_f}{|\\underline F_T|} = r_m\\,\\dfrac{\\alpha/2}{\\sin(\\alpha/2)} \\;\\Rightarrow\\; b_m\\,b_t = r_m^2',
      perche: 'La risultante tangenziale ha un braccio maggiore di $r_m$; i due bracci sono «speculari»: al crescere di uno diminuisce l\'altro (p. 128). $F_N$ e $F_T$ sono applicate nello stesso punto solo se $\\alpha \\to 0$.',
      fonte: D([127, 128]),
      distrattori: [],
      num: (v) => [v.bm * v.bt, v.rm * v.rm],
    },
    {
      id: 'd046.7',
      latex: '\\text{tamburo } (p = p_0):\\quad \\dfrac{|\\underline M_f|}{|\\underline F_T|} = \\dfrac{f p_0 R^2 B\\alpha}{2 f p_0 R B\\sin(\\alpha/2)} = R\\,\\dfrac{\\alpha/2}{\\sin(\\alpha/2)}',
      perche: 'Stesso fenomeno nel tamburo: la retta della risultante tangenziale dista da O un po\' più di R. Applicare le risultanti in m è una «prima approssimazione» (p. 107; NF-141).',
      fonte: DED('pp. 107, 128', 'momento esatto delle tangenziali diviso il modulo della loro risultante'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [(v.f * v.p0 * v.R * v.R * v.B * v.alpha) / (2 * v.f * v.p0 * v.R * v.B * Math.sin(v.alpha / 2)), (v.R * v.alpha) / 2 / Math.sin(v.alpha / 2)],
    },
  ],
  risultato: { latex: 'x_0 = \\dfrac{\\int x\\,dF}{\\int dF};\\quad \\text{pattino: } x_0 = \\dfrac{2}{3}\\dfrac{(s+l)^3 - s^3}{(s+l)^2 - s^2};\\quad \\text{disco: } b_m b_t = r_m^2', fonte: D([115, 128]) },
  gancio: 'Stessa forza e stesso momento: la risultante va dove pesa di più la pressione.',
};

// ------------------------------------------------------------------ d050 · pattino come limite del ceppo (pp. 114, 124–125)
export const d050: Dimostrazione = {
  id: 'd050',
  titolo: 'Il pattino piano come limite del ceppo (R → ∞)',
  enunciato: 'Mostrare che il pattino che frena un nastro è il caso limite del ceppo con raggio infinito, e che cosa cambia: consumo, pressione e cerchio d\'attrito.',
  ipotesi: ['ceppo di raggio R con arco di lunghezza L fissata; si fa tendere R → ∞', 'consumo dalla velocità di accostamento attorno al centro di rotazione C; Reye'],
  sample: (rnd) => {
    const L = U(rnd, 0.1, 0.3), p0 = U(rnd, 2e5, 1e6), B = U(rnd, 0.03, 0.08), w = U(rnd, 0.01, 0.1);
    const psi = U(rnd, -Math.PI, Math.PI), Px = U(rnd, -1, 1), Py = U(rnd, -1, 1), Cx = U(rnd, -1, 1), Cy = U(rnd, -1, 1);
    const R = U(rnd, 0.1, 0.25), d = U(rnd, 0.1, 0.3), theta = U(rnd, -0.8, 0.8), x = U(rnd, 0.02, 0.3), h = U(rnd, 0.05, 0.2);
    return { L, Rb: 1e4 * L, p0, B, w, nx: Math.cos(psi), ny: Math.sin(psi), Px, Py, Cx, Cy, R, d, theta, x, h };
  },
  passi: [
    {
      id: 'd050.1',
      latex: '\\alpha = \\dfrac{L}{R} \\xrightarrow{R\\to\\infty} 0',
      perche: '«Un ceppo esteso all\'infinito sarà un pattino piano che frena un dispositivo traslante» (p. 124): a lunghezza di contatto fissata, l\'arco si appiattisce e la sua apertura tende a zero.',
      fonte: D([114, 124]),
      distrattori: [],
    },
    {
      id: 'd050.2',
      latex: '\\dot\\delta = \\underline\\omega_{acc}\\wedge(P - C)\\cdot\\underline n = \\omega_{acc}\\,(P - C)\\cdot\\underline t,\\qquad \\underline t = \\underline n\\wedge\\underline k',
      perche: 'Legge unica del consumo: per la proprietà del prodotto misto, la componente normale di $\\underline\\omega_{acc}\\wedge(P-C)$ è $\\omega_{acc}$ per la **distanza di $P$ da $C$ misurata lungo la tangente** alla superficie di contatto. Tamburo e pattino sono due casi di questa legge.',
      fonte: DED('pp. 108 e 114', 'le due espressioni del consumo della dispensa riscritte con il prodotto misto'),
      aggiunto: true,
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta = \\omega_{acc}\\,|P - C|', errore: 'concetto', spiega: 'Il modulo della velocità di accostamento non è il consumo: conta solo la parte normale alla superficie.', num: (v) => [dt(wk(v.w, v.Px - v.Cx, v.Py - v.Cy), [v.nx, v.ny]), v.w * Math.hypot(v.Px - v.Cx, v.Py - v.Cy)] },
        { latex: '\\dot\\delta = \\omega_{acc}\\,(P - C)\\cdot\\underline n', errore: 'convenzione', spiega: 'Ruotare di 90° (prodotto con k) porta la normale sulla tangente: la distanza che conta è quella lungo la superficie.', num: (v) => [dt(wk(v.w, v.Px - v.Cx, v.Py - v.Cy), [v.nx, v.ny]), v.w * dt([v.Px - v.Cx, v.Py - v.Cy], [v.nx, v.ny])] },
      ],
      num: (v) => [dt(wk(v.w, v.Px - v.Cx, v.Py - v.Cy), [v.nx, v.ny]), v.w * dt([v.Px - v.Cx, v.Py - v.Cy], [v.ny, -v.nx])],
    },
    {
      id: 'd050.3',
      latex: '\\text{tamburo: } (P - O)\\cdot\\underline e_\\theta = 0 \\;\\Rightarrow\\; \\dot\\delta = \\omega_{acc}(O - O\')\\cdot\\underline e_\\theta = \\omega_{acc}\\overline{OO\'}\\cos\\theta',
      perche: 'Sul tamburo la tangente $\\underline e_\\theta$ ruota con il punto e la distanza tangenziale da $O\'$ varia solo come $\\cos\\theta$: consumo quasi uniforme per $\\alpha \\le 90°$ (p. 108).',
      fonte: D(108),
      distrattori: [],
      num: (v) => [dt(wk(v.w, v.R * Math.cos(v.theta), v.R * Math.sin(v.theta) + v.d), [-Math.cos(v.theta), -Math.sin(v.theta)]), v.w * v.d * Math.cos(v.theta)],
    },
    {
      id: 'd050.4',
      latex: '\\text{pattino: } \\underline t = \\text{cost},\\ (O - O^*)\\cdot\\underline t = 0 \\;\\Rightarrow\\; \\dot\\delta = \\omega_{acc}(P - O^*)\\cdot\\underline t = \\omega_{acc}\\,x',
      perche: 'Sul nastro piano la tangente non ruota più: la distanza tangenziale dalla cerniera è la $x$ misurata da $O^*$, e il consumo diventa **lineare**. «Nel freno a tamburo il consumo risultava uniforme… qui non si può considerare uniforme perché dipende dalla distanza» (p. 124).',
      fonte: D([114, 124]),
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta = \\text{cost}\\ \\text{come nel tamburo}', errore: 'concetto', spiega: 'Il consumo quasi uniforme del tamburo veniva dalla rotazione della normale con α ≤ 90°: sul piano la normale è fissa.' },
        { latex: '\\dot\\delta = \\omega_{acc}\\,h', errore: 'termine-perso', spiega: '(O−O*) è perpendicolare al nastro: la quota h della cerniera non entra nel consumo.', num: (v) => [Math.abs(dt(wk(v.w, v.x, -v.h), [0, -1])), v.w * v.h] },
      ],
      num: (v) => [Math.abs(dt(wk(v.w, v.x, -v.h), [0, -1])), v.w * v.x],
    },
    {
      id: 'd050.5',
      latex: '|\\underline F_N| = 2p_0RB\\sin\\dfrac{L}{2R} \\xrightarrow{R\\to\\infty} p_0BL',
      perche: 'Le normali elementari diventano parallele e la risultante tende alla somma dei moduli (pressione per area): è il calcolo delle risultanti del pattino (p. 114).',
      fonte: DED('pp. 106 e 114', 'limite di |F_N| di p. 106 per α = L/R → 0'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [2 * v.p0 * v.Rb * v.B * Math.sin(v.L / (2 * v.Rb)), v.p0 * v.B * v.L],
    },
    {
      id: 'd050.6',
      latex: '\\rho = R\\sin\\varphi \\xrightarrow{R\\to\\infty} \\infty \\;\\Rightarrow\\; \\text{niente cerchio d\'attrito: } \\underline F_f\\ \\text{inclinata di } \\varphi \\text{ sulla normale}',
      perche: 'Il cerchio d\'attrito degenera; resta solo l\'informazione sull\'inclinazione della forza (p. 125). Nel libero la retta passa per la cerniera dell\'asta e ha inclinazione $\\varphi$.',
      fonte: D(125),
      distrattori: [],
    },
    {
      id: 'd050.7',
      latex: 'p = k\'x\\ \\text{(non uniforme)};\\quad \\text{consumo uniforme solo con accostamento traslatorio} \\perp \\text{nastro}',
      perche: 'Per Reye la pressione segue il consumo: lineare. Per averla uniforme servirebbe un moto di accostamento puramente traslatorio normale al pattino, «e non sarebbe possibile» con la cerniera (p. 114).',
      fonte: D(114),
      distrattori: [],
    },
  ],
  risultato: { latex: '\\text{ceppo} \\xrightarrow{R\\to\\infty} \\text{pattino}:\\ \\dot\\delta = \\omega_{acc}x,\\ p = k\'x,\\ \\rho \\to \\infty', fonte: D([114, 125]) },
  gancio: 'Il pattino è un ceppo su un tamburo infinito: la normale non ruota più e il consumo diventa lineare.',
};

// ------------------------------------------------------------------ argomento
export const pattino: ArgomentoContenuto = {
  id: 'c3-pattino',
  cosaDireSubito:
    'Il freno a pattino frena un nastro che trasla: un pattino incernierato in O è premuto sul nastro da una coppia C_az. Nell\'accostamento rigido è iperstatico di un grado, quindi uso Reye: il consumo, dalla rotazione attorno a O, cresce linearmente con la distanza x da O*, e così la pressione, p = k′x. Poi F_N, F_T = f F_N, il punto x₀ con Varignon e F_T = C_az/(x₀/f ± h), dove il segno meno è il freno di sicurezza.',
  sistemaIpotesi: [
    'Sistema: nastro con velocità V; pattino di lunghezza l e profondità B fra s e s + l da O*; cerniera O a quota h.',
    'Accostamento rigido (1 gdl, iperstatico di un grado) oppure libero (asta Ō–A con coppia: 2 gdl).',
    'Ipotesi di Reye; velocità di strisciamento uguale in tutti i punti; attrito coulombiano f.',
    'Verso del nastro dichiarato: decide se l\'attrito si oppone o aiuta la coppia di accostamento.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Freno a pattino ad accostamento rigido (dispensa pp. 114–115): pressione lineare con la distanza da O*, risultante oltre il centro del pattino.',
    fonte: D(114, { fig: 'schizzi manoscritti del pattino e del calcolo delle forze' }),
    elementi: [
      { id: 'nastro', testo: 'nastro con il verso di V_nastro', obbligatorio: true },
      { id: 'O', testo: 'cerniera O, sua proiezione O* sul nastro, quota h', obbligatorio: true },
      { id: 'pattino', testo: 'pattino fra x = s e x = s + l, asse x da O*', obbligatorio: true },
      { id: 'Caz', testo: 'coppia di accostamento C_az (e ω_acc)', obbligatorio: true },
      { id: 'p', testo: 'distribuzione lineare p(x) = k′x', obbligatorio: true },
      { id: 'x0', testo: 'risultanti F_N e F_T applicate in x₀ (oltre il centro)', obbligatorio: true },
      { id: 'vacc', testo: 'velocità di accostamento di P e sua componente normale al nastro', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: '\\dot\\delta = \\underline\\omega_{acc}\\wedge(P - O^*)\\cdot\\underline m = \\omega_{acc}x,\\qquad \\dot\\delta\\,dA = \\bar k\\,|d\\underline F_T\\cdot\\underline V_{nastro}|,\\qquad \\sum M_O = 0',
    spiegazione: 'Cinematica del consumo, ipotesi di Reye, equilibrio alla rotazione del pattino attorno alla cerniera.',
    fonte: D([114, 115]),
  },
  dimostrazioni: ['d044', 'd045', 'd046', 'd050'],
  significato:
    'Il pattino mostra che la pressione non è uniforme in generale: è la cinematica di accostamento a deciderla. Il risultato pratico è che la forza frenante dipende dal verso del nastro: con l\'attrito che aiuta la coppia il freno è più efficace, ma per x₀/f = h si impunta (freno di sicurezza). Nel libero invece la statica basta: due forze, retta per la cerniera inclinata di φ.',
  fraseDaRicordare: 'Pattino: consumo lineare, pressione triangolare, risultante oltre il centro; il segno meno è il freno di sicurezza.',
  daNonDire: [
    { frase: 'Il pattino frena un tamburo con C_f = μN R_eff.', perche: 'Nella dispensa il pattino frena un nastro che trasla: la grandezza utile è la forza frenante F_T = C_az/(x₀/f ± h) (NF-41).', fonte: D([114, 115]) },
    { frase: 'La pressione sul pattino è uniforme.', perche: 'Il consumo è lineare con la distanza da O*: p = k′x. L\'uniforme è del tamburo con α ≤ 90°.', fonte: D(114) },
    { frase: 'La risultante è applicata al centro del pattino.', perche: 'x₀ = (2/3)[(s+l)³ − s³]/[(s+l)² − s²] è oltre il centro, verso l\'estremo lontano da O*.', fonte: D(115) },
    { frase: 'Nel pattino libero la forza frenante è tangente al cerchio d\'attrito.', perche: 'Il cerchio d\'attrito non esiste (R → ∞): la retta passa per A ed è inclinata di φ sulla normale.', fonte: D(125) },
    { frase: 'L\'impuntamento è una proprietà del pattino libero.', perche: 'La dispensa lega il freno di sicurezza all\'accostamento rigido (x₀/f = h). Nel libero c\'è un analogo solo se la retta d\'azione passa per Ō (NF-149).', fonte: D([115, 125]) },
  ],
  approfondimenti: [
    { domanda: 'Che relazione c\'è con il freno a ceppi?', tipo: 'collegamento', argomento: 'c3-ceppi', attesa: 'Il pattino è un ceppo con R → ∞: le normali diventano parallele, il consumo da quasi uniforme diventa lineare, il cerchio d\'attrito sparisce. Il freno d\'emergenza del ceppo (OO′/f = R) corrisponde al freno di sicurezza (x₀/f = h).', fonte: D([110, 124]) },
    { domanda: 'Il «freno di sicurezza» ricorda qualcosa del capitolo sull\'attrito?', tipo: 'collegamento', argomento: 'c2-impuntamento', attesa: 'È un impuntamento: un denominatore del tipo braccio/f − braccio che si annulla, come nel corsoio che si impunta. L\'attrito genera da solo il momento che serve a serrare.', fonte: D(125) },
    { domanda: 'Perché il pattino rigido è iperstatico?', tipo: 'approfondimento', attesa: 'Ha 1 gdl (la cerniera) e il contatto esteso ne toglierebbe altri due: iperstatico di un grado. La legge di Reye dà l\'equazione mancante, cioè la forma di p(x).', fonte: D(114) },
    { domanda: 'Se nel libero aumento la coppia, che cosa cambia?', tipo: 'approfondimento', attesa: 'Cresce il modulo della forza frenante, non la sua inclinazione: φ dipende solo da f, cioè dai materiali.', fonte: D(125) },
    { domanda: 'Perché non si può avere consumo uniforme sul pattino?', tipo: 'approfondimento', attesa: 'Servirebbe un accostamento traslatorio normale al nastro; con una cerniera il pattino ruota e il consumo è proporzionale alla distanza da O*.', fonte: D(114) },
    { domanda: 'Dove conviene mettere la cerniera A nel libero?', tipo: 'approfondimento', attesa: 'Con una coppia di azionamento A vicino al centro del pattino; con un\'asta senza coppia caricata da una forza, la cerniera vicina all\'estremo (p. 125).', fonte: D(125) },
  ],
  simboli: [
    { simbolo: 'O,\\ O^*', significato: 'cerniera del pattino e sua proiezione sul nastro', altrove: 'q12 chiama O′ la proiezione; gli appunti di p. 124–125 dicono O′ per la cerniera' },
    { simbolo: 'x,\\ s,\\ l,\\ x_0', significato: 'ascissa da O*, inizio e lunghezza del pattino, ascissa della risultante' },
    { simbolo: 'k\'', significato: 'costante della pressione p = k′x', altrove: 'K in q12, q38' },
    { simbolo: 'C_{az}', significato: 'coppia di accostamento (azionamento)', altrove: 'C in q12' },
    { simbolo: 'h', significato: 'quota della cerniera sul nastro (braccio della forza d\'attrito)' },
    { simbolo: '\\underline m', significato: 'versore normale al nastro (in figura n)' },
    { simbolo: 'f,\\ \\varphi', significato: 'coefficiente e angolo d\'attrito', altrove: 'μ nelle domande' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c3-pattino' }],
  previsioni: [
    {
      id: 'c3-pattino-x0',
      domanda: 'Pattino con s = 2 cm e l = 10 cm: la risultante delle pressioni rispetto al centro del pattino (7 cm da O*) è…',
      opzioni: ['più vicina a O*', 'proprio al centro', 'più lontana da O*'],
      corretta: 2,
      spiega: 'p = k′x cresce con x: x₀ = (2/3)(12³ − 2³)/(12² − 2²) ≈ 8,19 cm > 7 cm.',
      verify: () => {
        const r = pat({ s: 0.02, l: 0.1, B: 0.05, f: 0.3, h: 0.1, Caz: 100, verso: 'contro' });
        return r.x0 > r.centro + 1e-12 ? 2 : r.x0 < r.centro - 1e-12 ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c3-pattino' },
    },
    {
      id: 'c3-pattino-verso',
      domanda: 'A parità di coppia C_az, inverti il verso del nastro in modo che l\'attrito aiuti la coppia. La forza frenante…',
      opzioni: ['cala', 'resta uguale', 'cresce'],
      corretta: 2,
      spiega: 'Il denominatore passa da x₀/f + h a x₀/f − h: la forza frenante aumenta (e per x₀/f = h il pattino si impunta).',
      verify: () => {
        const p = { s: 0.02, l: 0.1, B: 0.05, f: 0.3, h: 0.1, Caz: 100 };
        const a = pat({ ...p, verso: 'contro' }).FT, b = pat({ ...p, verso: 'aiuta' }).FT;
        return b > a ? 2 : b < a ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c3-pattino' },
    },
  ],
  nf: ['NF-41', 'NF-142', 'NF-149'],
};
