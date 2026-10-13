/**
 * C3 · Freno a ceppi: risultanti, ceppo avvolgente e svolgente (domanda q39).
 * Dispensa pp. 103, 106–113 (manoscritto + appunti battuti), 123. Nomenclatura avvolgente/svolgente: NF-18.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { ceppiEsterni, consumoCeppo, risultantiCeppo, simpson } from '../../engine/c3';
import { arc, arrow, circle, dim, dot, line, pin, pt, rot, svg, text } from '../svg';
import { D, DED, dot as dt, wk } from './comune';

// ------------------------------------------------------------------ disegno (p. 109: due ceppi esterni, tamburo orario)
function disegno() {
  const cx = 200, cy = 118, R = 64, f = 0.4;
  const rho = R * Math.sin(Math.atan(f));
  const oy = cy + 112;
  const xr = cx + R + 16, xl = cx - R - 16, yF = cy - 80;
  const u = 1 / Math.hypot(1, f);
  const Mx = cx + R, Mlx = cx - R;
  return svg(400, 315, [
    line(cx - R - 40, cy, cx + R + 40, cy, 'd'), line(cx, cy - R - 14, cx, oy, 'd'),
    circle(cx, cy, R, 'l'), circle(cx, cy, rho, 'd'),
    arc(cx, cy, R + 5, -38, 38, 'a'), arc(cx, cy, R + 5, 142, 218, 'a'),
    // leve
    line(xr, yF, xr, cy + 52, 'l', 3), line(xr, cy + 52, cx + 6, oy - 3, 'l', 3),
    line(xl, yF, xl, cy + 52, 'l', 3), line(xl, cy + 52, cx - 6, oy - 3, 'l', 3),
    line(...pt(cx, cy, R + 8, 28), xr, cy - R * 0.47, 'l', 2), line(...pt(cx, cy, R + 8, -28), xr, cy + R * 0.47, 'l', 2),
    line(...pt(cx, cy, R + 8, 152), xl, cy - R * 0.47, 'l', 2), line(...pt(cx, cy, R + 8, 208), xl, cy + R * 0.47, 'l', 2),
    pin(cx, oy, "O'"),
    arrow(xr + 44, yF, xr + 3, yF, 'f', 'F', 8, -12), arrow(xl - 44, yF, xl - 3, yF, 'f', 'F', -8, -12),
    dim(xr + 58, yF, xr + 58, oy, 'h', -12),
    dot(cx, cy, 'O', -12, -10), dot(Mx, cy, 'M', 9, 13), dot(Mlx, cy, '', 0, 0),
    rot(cx, cy, 34, 125, 55, 'v', 'ω'),
    text(cx + 12, cy + 26, 'ρ', { c: 'm', it: true }),
    // rette della forza frenante tamburo→ceppo, tangenti al cerchio d'attrito
    line(Mx - 150 * u, cy - 150 * u * f, Mx + 40 * u, cy + 40 * u * f, 'd'),
    arrow(Mx, cy, Mx + 48 * u, cy + 48 * u * f, 'f'), text(Mx + 44, cy + 36, 'F_f^(T,C)', { c: 'f', size: 12 }),
    line(Mlx + 150 * u, cy + 150 * u * f, Mlx - 40 * u, cy - 40 * u * f, 'd'),
    arrow(Mlx, cy, Mlx - 48 * u, cy - 48 * u * f, 'f'), text(Mlx - 52, cy - 30, 'F_f^(T,C)', { c: 'f', size: 12 }),
    text(cx + 6, oy - 26, 'OO′', { c: 'm', size: 12, anchor: 'start' }),
    text(xr + 10, 268, 'dx: attrito contro F', { c: 'm', size: 12 }), text(xr + 10, 283, '(D: «avvolgente»)', { c: 'm', size: 11 }),
    text(xl - 10, 268, 'sx: attrito con F = avvolgente', { c: 'a', size: 12 }), text(xl - 10, 283, '(D: «svolgente»)', { c: 'm', size: 11 }),
    text(cx, 305, 'F_T = Fh / (OO′/f ± R): «−» dove l\'attrito aiuta il comando', { c: 'a', size: 12 }),
  ], 'Freno a due ceppi esterni con tamburo orario: forze frenanti tangenti al cerchio d\'attrito');
}

// ------------------------------------------------------------------ campione comune a d038–d039
const sampleTamburo = (rnd: () => number) => {
  const p0 = U(rnd, 2e5, 1e6), R = U(rnd, 0.1, 0.25), B = U(rnd, 0.03, 0.08), alpha = U(rnd, Math.PI / 4, (2 * Math.PI) / 3), f = U(rnd, 0.2, 0.5);
  const r = risultantiCeppo({ p0, R, B, alpha, f });
  return { p0, R, B, alpha, f, FN: r.FN, FT: r.FT, Ff: r.Ff, phi: r.phi, rho: r.rho, Mf: r.Mf };
};

// ------------------------------------------------------------------ d038 · risultante normale (p. 106)
export const d038: Dimostrazione = {
  id: 'd038',
  titolo: 'Freno a ceppo: risultante delle forze normali',
  enunciato: 'Integrare le forze normali elementari che il ceppo scambia con il tamburo e trovarne la risultante con pressione uniforme.',
  ipotesi: [
    'ceppo esterno, arco di contatto di ampiezza α simmetrico rispetto all\'asse x (bisettrice); profondità B',
    'pressione uniforme p(θ) = p₀ (giustificata da Reye per α ≤ 90°, pp. 108–109)',
    'forze del ceppo C sul tamburo T, apice (C,T)',
  ],
  sample: sampleTamburo,
  passi: [
    {
      id: 'd038.1',
      latex: '\\underline n = -\\dfrac{(P-O)}{R} = -\\cos\\theta\\,\\underline i - \\sin\\theta\\,\\underline j,\\qquad dA = R\\,d\\theta\\,B,\\qquad d\\underline F_N^{(C,T)} = p\\,dA\\,\\underline n',
      perche: 'Il ceppo spinge il tamburo verso il centro: la forza normale elementare ha il verso di $\\underline n = -\\underline e_r$. L\'area elementare è una striscia di arco $R\\,d\\theta$ per la profondità $B$.',
      fonte: D(106),
      distrattori: [],
    },
    {
      id: 'd038.2',
      latex: '\\underline F_N^{(C,T)} = \\int_S d\\underline F_N^{(C,T)} = \\int_{-\\alpha/2}^{+\\alpha/2} p(\\theta)\\,R\\,B\\,\\underline n(\\theta)\\,d\\theta',
      perche: 'Le forze elementari sono complanari: la risultante è il loro integrale **vettoriale** sull\'arco. Si integra componente per componente perché $\\underline n$ cambia direzione da punto a punto.',
      fonte: D(106),
      distrattori: [],
    },
    {
      id: 'd038.3',
      latex: 'F_{N,x} = -p_0RB\\int_{-\\alpha/2}^{\\alpha/2}\\cos\\theta\\,d\\theta = -2p_0RB\\sin\\dfrac{\\alpha}{2}',
      perche: 'Con $p = p_0$ costante si porta fuori dall\'integrale; la primitiva di $\\cos\\theta$ è $\\sin\\theta$, valutata fra $-\\alpha/2$ e $\\alpha/2$.',
      fonte: D(106),
      chiave: true,
      distrattori: [
        { latex: 'F_{N,x} = -p_0RB\\,\\alpha', errore: 'concetto', spiega: 'È la somma dei moduli: le dF_N non sono parallele, le componenti lungo x di quelle laterali sono più piccole.', num: (v) => [-2 * v.p0 * v.R * v.B * Math.sin(v.alpha / 2), -v.p0 * v.R * v.B * v.alpha] },
        { latex: 'F_{N,x} = -2p_0RB\\cos\\dfrac{\\alpha}{2}', errore: 'indice', spiega: 'La primitiva di cos θ è sin θ, non cos θ.', num: (v) => [-2 * v.p0 * v.R * v.B * Math.sin(v.alpha / 2), -2 * v.p0 * v.R * v.B * Math.cos(v.alpha / 2)] },
      ],
      num: (v) => [simpson((t) => -v.p0 * v.R * v.B * Math.cos(t), -v.alpha / 2, v.alpha / 2), -2 * v.p0 * v.R * v.B * Math.sin(v.alpha / 2)],
    },
    {
      id: 'd038.4',
      latex: 'F_{N,y} = -p_0RB\\int_{-\\alpha/2}^{\\alpha/2}\\sin\\theta\\,d\\theta = 0',
      perche: 'Simmetria: preso il punto $P$ e il suo simmetrico rispetto a $x$, le componenti $\\underline j$ si elidono e quelle $\\underline i$ si sommano (integrale di una funzione dispari su un intervallo simmetrico).',
      fonte: D(106),
      distrattori: [],
      num: (v) => [simpson((t) => -v.p0 * v.R * v.B * Math.sin(t), -v.alpha / 2, v.alpha / 2), 0],
    },
    {
      id: 'd038.5',
      latex: '\\underline F_N^{(C,T)} = -\\underbrace{2p_0RB\\sin\\tfrac{\\alpha}{2}}_{|\\underline F_N|}\\,\\underline i',
      perche: 'La risultante normale è diretta lungo la bisettrice dell\'arco, verso il centro. Con $p$ uniforme si può pensare applicata nel punto medio m dell\'arco ($\\theta = 0$), «in prima approssimazione» (p. 107).',
      fonte: D([106, 107]),
      distrattori: [],
      num: (v) => [Math.hypot(simpson((t) => v.p0 * v.R * v.B * Math.cos(t), -v.alpha / 2, v.alpha / 2), simpson((t) => v.p0 * v.R * v.B * Math.sin(t), -v.alpha / 2, v.alpha / 2)), v.FN],
    },
    {
      id: 'd038.6',
      latex: '\\dfrac{|\\underline F_N|}{\\int_S |d\\underline F_N|} = \\dfrac{2p_0RB\\sin(\\alpha/2)}{p_0RB\\,\\alpha} = \\dfrac{\\sin(\\alpha/2)}{\\alpha/2} < 1',
      perche: 'Confronto con la somma dei moduli: la risultante è più piccola perché le forze elementari si «aprono a ventaglio». Per $\\alpha \\to 0$ il rapporto tende a 1: è il caso del pattino (normali parallele).',
      fonte: DED('p. 106 (risultato) e p. 124 (pattino come limite)', 'rapporto fra la risultante di p. 106 e il semplice prodotto pressione × area'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.FN / (v.p0 * v.R * v.B * v.alpha), Math.sin(v.alpha / 2) / (v.alpha / 2)],
    },
  ],
  risultato: { latex: '\\underline F_N^{(C,T)} = -2p_0RB\\sin\\dfrac{\\alpha}{2}\\,\\underline i', fonte: D(106) },
  gancio: 'Ventaglio di normali: si salvano le componenti lungo la bisettrice, 2 sin(α/2) invece di α.',
};

// ------------------------------------------------------------------ d039 · risultante tangenziale e momento frenante (p. 107)
export const d039: Dimostrazione = {
  id: 'd039',
  titolo: 'Freno a ceppo: risultante tangenziale, forza frenante e cerchio d\'attrito',
  enunciato: 'Integrare le forze d\'attrito elementari sul ceppo, comporre la forza frenante e calcolare il momento frenante sul tamburo.',
  ipotesi: [
    'come d038: arco α simmetrico, p = p₀, profondità B',
    'tamburo antiorario (figura di p. 106); attrito coulombiano dF_T = f |dF_N| opposto alla velocità del punto del tamburo',
  ],
  sample: sampleTamburo,
  passi: [
    {
      id: 'd039.1',
      latex: 'd\\underline F_T^{(C,T)} = -f\\,|d\\underline F_N|\\,\\dfrac{\\underline V_P|_{\\rm rel}}{|\\underline V_P|_{\\rm rel}|} = -f\\,p\\,dA\\,\\underline e_\\theta,\\qquad \\underline e_\\theta = -\\sin\\theta\\,\\underline i + \\cos\\theta\\,\\underline j',
      perche: 'L\'attrito del ceppo sul tamburo si oppone alla velocità del punto del tamburo, $\\underline V_P = \\omega R\\,\\underline e_\\theta$; il modulo è $f$ volte quello normale.',
      fonte: D(106),
      distrattori: [],
    },
    {
      id: 'd039.2',
      latex: 'F_{T,y} = -f p_0RB\\int_{-\\alpha/2}^{\\alpha/2}\\cos\\theta\\,d\\theta = -2fp_0RB\\sin\\dfrac{\\alpha}{2},\\qquad F_{T,x} = -fp_0RB\\int_{-\\alpha/2}^{\\alpha/2}(-\\sin\\theta)\\,d\\theta = 0',
      perche: 'Si scompone $\\underline e_\\theta$: la parte lungo $\\underline i$ è dispari e si annulla per simmetria, resta quella lungo $\\underline j$, cioè perpendicolare alla bisettrice.',
      fonte: D(107),
      chiave: true,
      distrattori: [
        { latex: 'F_{T,y} = -f\\,p_0RB\\,\\alpha', errore: 'concetto', spiega: 'Anche le tangenziali non sono parallele: si sommano solo le componenti lungo j, da qui 2 sin(α/2).', num: (v) => [-2 * v.f * v.p0 * v.R * v.B * Math.sin(v.alpha / 2), -v.f * v.p0 * v.R * v.B * v.alpha] },
        { latex: '\\underline F_T = -2fp_0RB\\sin\\tfrac{\\alpha}{2}\\,\\underline i', errore: 'convenzione', spiega: 'La risultante tangenziale è perpendicolare alla bisettrice (lungo j); lungo i c\'è la normale.' },
      ],
      num: (v) => [simpson((t) => -v.f * v.p0 * v.R * v.B * Math.cos(t), -v.alpha / 2, v.alpha / 2), -2 * v.f * v.p0 * v.R * v.B * Math.sin(v.alpha / 2)],
    },
    {
      id: 'd039.3',
      latex: '|\\underline F_T| = 2fp_0RB\\sin\\dfrac{\\alpha}{2} = f\\,|\\underline F_N|',
      perche: 'Nel tamburo con pressione uniforme normali e tangenziali hanno lo stesso fattore $2\\sin(\\alpha/2)$: le risultanti stanno nel rapporto $f$. **Non** è una regola generale: nel disco non vale (p. 116).',
      fonte: D(107),
      distrattori: [],
      num: (v) => [2 * v.f * v.p0 * v.R * v.B * Math.sin(v.alpha / 2), v.f * v.FN],
    },
    {
      id: 'd039.4',
      latex: '\\underline F_f^{(C,T)} = \\underline F_N + \\underline F_T = -|\\underline F_N|\\,\\underline i - f|\\underline F_N|\\,\\underline j,\\qquad \\varphi = \\operatorname{arctg}\\dfrac{|\\underline F_T|}{|\\underline F_N|} = \\operatorname{arctg} f',
      perche: 'La forza frenante (azione totale del ceppo sul tamburo) è inclinata sulla normale dell\'angolo d\'attrito $\\varphi$. Se $\\omega$ cambia verso, cambia il verso della componente tangenziale.',
      fonte: D(107),
      chiave: true,
      distrattori: [
        { latex: '\\varphi = \\operatorname{arctg}\\dfrac{1}{f}', errore: 'indice', spiega: 'φ si misura dalla normale: tg φ = F_T/F_N = f. arctg(1/f) è l\'angolo con la tangente.', num: (v) => [Math.atan(v.FT / v.FN), Math.atan(1 / v.f)] },
        { latex: '\\varphi = f', errore: 'concetto', spiega: 'f è la tangente dell\'angolo d\'attrito, non l\'angolo (coincidono solo per f piccolo).', num: (v) => [Math.atan(v.FT / v.FN), v.f] },
      ],
      num: (v) => [Math.atan(v.FT / v.FN), Math.atan(v.f)],
    },
    {
      id: 'd039.5',
      latex: '|\\underline M_f| = \\int_S R\\,|d\\underline F_T| = f p_0 R^2 B\\,\\alpha',
      perche: 'Il momento frenante è il momento rispetto a $O$ delle azioni del ceppo sul tamburo: le normali passano per $O$, ogni tangenziale elementare ha braccio esattamente $R$. Questo è il valore esatto con $p = p_0$ (NF-141).',
      fonte: DED('pp. 106–107', 'momento rispetto a O delle dF_T di p. 107 con p = p₀: ogni forza elementare è tangente all\'arco di raggio R'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [simpson(() => v.R * v.f * v.p0 * v.R * v.B, -v.alpha / 2, v.alpha / 2), v.Mf],
    },
    {
      id: 'd039.6',
      latex: '|\\underline M_f| \\simeq |\\underline F_T|\\,R = |\\underline F_f|\\,\\underbrace{R\\sin\\varphi}_{\\rho}',
      perche: 'Applicando le risultanti nel punto medio m (prima approssimazione di p. 107) il momento è $|F_T|R$. Poiché $|F_T| = |F_f|\\sin\\varphi$, la forza frenante ha braccio $\\rho = R\\sin\\varphi$: è **tangente al cerchio d\'attrito**, e si sceglie la tangente che dà momento resistente alla rotazione del tamburo.',
      fonte: D(107),
      chiave: true,
      distrattori: [
        { latex: '|\\underline M_f| = |\\underline F_T|\\,\\rho', errore: 'fattore', spiega: 'È la riga di p. 110 (NF-143): il braccio ρ va con la forza frenante intera F_f, il braccio R con la sola F_T.', num: (v) => [v.FT * v.R, v.FT * v.rho] },
        { latex: '|\\underline M_f| = |\\underline F_f|\\,R', errore: 'fattore', spiega: 'La retta di F_f non passa per M perpendicolare al raggio: è inclinata di φ e dista ρ = R sin φ da O.', num: (v) => [v.FT * v.R, v.Ff * v.R] },
      ],
      num: (v) => [v.FT * v.R, v.Ff * v.R * Math.sin(v.phi)],
    },
    {
      id: 'd039.7',
      latex: '\\dfrac{f p_0R^2B\\,\\alpha}{|\\underline F_T|\\,R} = \\dfrac{\\alpha/2}{\\sin(\\alpha/2)} \\quad (\\alpha = 90°:\\ 1{,}11)',
      perche: 'Quanto vale l\'approssimazione: il momento esatto supera $|F_T|R$ del fattore $(\\alpha/2)/\\sin(\\alpha/2)$, l\'11 % per $\\alpha = 90°$. È lo stesso fattore del braccio $b_t$ del freno a disco (p. 127): la retta d\'azione della risultante taglia la bisettrice poco oltre m.',
      fonte: DED('pp. 107 e 127', 'rapporto fra il momento esatto (d039.5) e |F_T|R; confronto con b_t del disco'),
      aggiunto: true,
      distrattori: [],
      num: (v) => [v.Mf / (v.FT * v.R), v.alpha / 2 / Math.sin(v.alpha / 2)],
    },
    {
      id: 'd039.8',
      latex: '\\underline\\omega\\cdot\\underline k > 0 \\;\\Rightarrow\\; \\underline M_f\\cdot\\underline k = -|\\underline F_T|R,\\qquad \\underline\\omega\\cdot\\underline k < 0 \\;\\Rightarrow\\; \\underline M_f\\cdot\\underline k = +|\\underline F_T|R',
      perche: 'Il momento frenante ha sempre verso opposto a $\\underline\\omega$: per questo, nel metodo grafico, la tangente giusta al cerchio d\'attrito (superiore o inferiore) dipende dal verso di rotazione e dalla geometria del freno (p. 113).',
      fonte: D([107, 113]),
      distrattori: [],
    },
  ],
  risultato: { latex: '\\underline F_T^{(C,T)} = -2fp_0RB\\sin\\tfrac{\\alpha}{2}\\,\\underline j,\\qquad |\\underline M_f| \\simeq |\\underline F_T|R = |\\underline F_f|\\,\\rho,\\quad \\rho = R\\sin\\varphi', fonte: D(107) },
  gancio: 'La forza frenante è inclinata di φ sulla normale: tangente al cerchio di raggio R sin φ, dalla parte che frena.',
};

// ------------------------------------------------------------------ campione ceppi esterni (pp. 109–110)
const sampleCeppi = (rnd: () => number) => {
  const F = U(rnd, 100, 1000), h = U(rnd, 0.2, 0.5), R = U(rnd, 0.1, 0.2), d = R * U(rnd, 0.6, 1.2), f = (d / R) * U(rnd, 0.3, 0.8);
  const c = ceppiEsterni({ F, h, d, R, f, verso: 'orario' });
  return { F, h, R, d, f, Tdx: c.FTdx, Tsx: c.FTsx, Ndx: c.FNdx, Nsx: c.FNsx, Mf: c.Mf, flim: d / R, rho: R * Math.sin(Math.atan(f)) };
};

// ------------------------------------------------------------------ d042 · avvolgente e svolgente (pp. 109–110)
export const d042: Dimostrazione = {
  id: 'd042',
  titolo: 'Ceppo avvolgente e svolgente: equilibrio alla rotazione attorno alla cerniera',
  enunciato: 'Per un freno a due ceppi esterni ad accostamento rigido, ricavare la forza tangenziale di ciascun ceppo in funzione della forza di comando e riconoscere il ceppo avvolgente.',
  ipotesi: [
    'ceppi esterni incernierati in O′ sulla verticale per O, a distanza OO′; forza di comando F orizzontale a braccio h da O′',
    'risultanti applicate nel punto medio M dell\'arco (p ≃ p₀): braccio di F_N rispetto a O′ = OO′, di F_T = R',
    'F_T = f F_N; tamburo orario come nella figura di p. 109; «avvolgente» nel senso usuale: l\'attrito aiuta il comando (NF-18)',
  ],
  sample: sampleCeppi,
  passi: [
    {
      id: 'd042.1',
      latex: '\\sum M_{O\'} = 0:\\quad \\underline F\\ (\\text{braccio } h),\\quad \\underline F_N\\ (\\text{braccio } \\overline{OO\'}),\\quad \\underline F_T\\ (\\text{braccio } R),\\quad \\underline\\Phi_{O\'}\\ (\\text{nessun momento})',
      perche: 'Sul ceppo agiscono tre forze: il comando, la forza frenante del tamburo sul ceppo (opposta a quella del ceppo sul tamburo) e la reazione della cerniera. Con il polo in $O\'$ la reazione sparisce (II equazione cardinale, p. 110).',
      fonte: D([109, 110]),
      distrattori: [],
    },
    {
      id: 'd042.2',
      latex: '\\text{ceppo dx:}\\quad +F h - F_{N}\\,\\overline{OO\'} - F_{T}\\,R = 0',
      perche: 'Tamburo orario: in M il tamburo «gratta» il ceppo destro verso il basso. La normale (verso destra) e l\'attrito (verso il basso) hanno momento dello stesso verso rispetto a $O\'$, opposto a quello di $F$: **l\'attrito si oppone al comando**. Con la definizione usuale questo ceppo è svolgente; la dispensa lo chiama «avvolgente (compresso)» (NF-18).',
      fonte: D(110),
      chiave: true,
      correzione: { nf: 'NF-18', dispensaScrive: '\\text{Ceppo avvolgente: } +Fh - F_{N,A}\\overline{OO\'} - F_{T,A}R = 0' },
      distrattori: [
        { latex: '+F h - F_{N}\\,\\overline{OO\'} + F_{T}\\,R = 0', errore: 'segno', spiega: 'Nel ceppo destro con tamburo orario l\'attrito tira verso il basso: il suo momento rispetto a O′ ha lo stesso verso di quello della normale.', num: (v) => [v.F * v.h - v.Ndx * v.d + v.Tdx * v.R, 0] },
        { latex: '+F h - F_{N}\\,R - F_{T}\\,\\overline{OO\'} = 0', errore: 'indice', spiega: 'Bracci scambiati: la normale è orizzontale per M e dista OO′ da O′; la tangenziale è verticale per M e dista R.', num: (v) => [v.F * v.h - v.Ndx * v.R - v.Tdx * v.d, 0] },
      ],
      num: (v) => [v.F * v.h - v.Ndx * v.d - v.Tdx * v.R, 0],
    },
    {
      id: 'd042.3',
      latex: 'F_T = f F_N \\;\\Rightarrow\\; F_{T,dx}\\Big(\\dfrac{\\overline{OO\'}}{f} + R\\Big) = F h \\;\\Rightarrow\\; F_{T,dx} = \\dfrac{F h}{\\dfrac{\\overline{OO\'}}{f} + R}',
      perche: 'Si esplicita $F_T$ sostituendo $F_N = F_T/f$. Il momento frenante del ceppo è $M_f = F_T R$ (p. 110).',
      fonte: D(110),
      distrattori: [],
      num: (v) => [v.Tdx, (v.F * v.h) / (v.d / v.f + v.R)],
    },
    {
      id: 'd042.4',
      latex: '\\text{ceppo sx:}\\quad F_N\\,\\overline{OO\'} - F_T\\,R - F h = 0 \\;\\Rightarrow\\; F_{T,sx} = \\dfrac{F h}{\\dfrac{\\overline{OO\'}}{f} - R}',
      perche: 'Nel ceppo sinistro il tamburo lo trascina verso l\'alto: il momento dell\'attrito ha lo stesso verso di quello di $F$ e si oppone solo la normale. **L\'attrito aiuta il comando**: con la definizione usuale (e con quella che la dispensa stessa dà a p. 110 per il ceppo interno) è il ceppo avvolgente; la dispensa qui lo chiama «svolgente (teso)».',
      fonte: D(110),
      chiave: true,
      correzione: { nf: 'NF-18', dispensaScrive: '\\text{Ceppo svolgente: } F_{T,S} = \\dfrac{Fh}{\\overline{OO\'}/f - R}' },
      distrattori: [
        { latex: 'F_{T,sx} = \\dfrac{F h}{\\overline{OO\'}/f + R}', errore: 'segno', spiega: 'Qui il momento dell\'attrito sta dalla parte del comando: nel denominatore R si sottrae.', num: (v) => [v.Tsx, (v.F * v.h) / (v.d / v.f + v.R)] },
        { latex: 'F_{T,sx} = \\dfrac{F h}{\\overline{OO\'}\\,f - R}', errore: 'fattore', spiega: 'Da F_N = F_T/f il braccio OO′ va diviso per f, non moltiplicato.', num: (v) => [v.Tsx, (v.F * v.h) / (v.d * v.f - v.R)] },
      ],
      num: (v) => [v.Nsx * v.d - v.Tsx * v.R - v.F * v.h, 0],
    },
    {
      id: 'd042.5',
      latex: '\\dfrac{F_{T,av}}{F_{T,sv}} = \\dfrac{\\overline{OO\'}/f + R}{\\overline{OO\'}/f - R} > 1',
      perche: 'Criterio da dire all\'orale: si guarda il **momento dell\'attrito del tamburo sul ceppo rispetto alla cerniera**. Se è concorde con quello del comando il ceppo è avvolgente (autoenergizzante) e frena di più; se è discorde è svolgente. Non c\'è simmetria fra i due ceppi (p. 109).',
      fonte: D([109, 110]),
      chiave: true,
      distrattori: [
        { latex: '\\text{avvolgente} = \\text{ceppo compresso, frena di meno}', errore: 'convenzione', spiega: 'È la nomenclatura della dispensa a pp. 109–110 (NF-18): la fisica è giusta, il nome è invertito rispetto all\'uso comune e alla stessa p. 110 in basso.' },
        { latex: 'F_{T,av} = F_{T,sv}\\ \\text{(simmetria)}', errore: 'concetto', spiega: 'La dispensa lo dice esplicitamente: la simmetria fra i due ceppi non esiste, perché l\'attrito cambia verso relativo al comando.', num: (v) => [v.Tsx / v.Tdx, 1] },
      ],
      num: (v) => [v.Tsx / v.Tdx, (v.d / v.f + v.R) / (v.d / v.f - v.R)],
    },
    {
      id: 'd042.6',
      latex: '|\\underline M_f| = (F_{T,dx} + F_{T,sx})\\,R = \\big(|\\underline F_f^{dx}| + |\\underline F_f^{sx}|\\big)\\,\\rho',
      perche: 'Con due ceppi si calcolano entrambi i momenti frenanti e si sommano (schema di p. 113); ogni forza frenante ha braccio $\\rho$ rispetto a $O$.',
      fonte: D(113),
      distrattori: [],
      num: (v) => [v.Mf, (Math.hypot(v.Ndx, v.Tdx) + Math.hypot(v.Nsx, v.Tsx)) * v.rho],
    },
    {
      id: 'd042.7',
      latex: '\\underline\\omega \\to -\\underline\\omega:\\quad \\text{ceppo dx} \\leftrightarrow \\text{ceppo sx}',
      perche: 'Invertendo il verso di rotazione si invertono le tangenziali: il destro diventa avvolgente e il sinistro svolgente. Per questo non si memorizza «destro» o «sinistro»: si ragiona sul momento.',
      fonte: D([107, 109]),
      distrattori: [],
    },
  ],
  risultato: { latex: 'F_{T,av} = \\dfrac{F h}{\\overline{OO\'}/f - R},\\qquad F_{T,sv} = \\dfrac{F h}{\\overline{OO\'}/f + R},\\qquad M_f = (F_{T,av} + F_{T,sv})R', fonte: D(110), correzione: { nf: 'NF-18', dispensaScrive: 'F_{T,A} = \\dfrac{Fh}{\\overline{OO\'}/f + R}\\ (\\text{«avvolgente»}),\\quad F_{T,S} = \\dfrac{Fh}{\\overline{OO\'}/f - R}\\ (\\text{«svolgente»})' } },
  gancio: 'Avvolgente = l\'attrito gira il ceppo come il comando: R si sottrae nel denominatore.',
};

// ------------------------------------------------------------------ d043 · autofrenatura («freno d'emergenza», p. 110)
export const d043: Dimostrazione = {
  id: 'd043',
  titolo: 'Autobloccaggio del ceppo avvolgente («freno d\'emergenza»)',
  enunciato: 'Trovare la condizione per cui il ceppo avvolgente frena senza forza di comando e darne la lettura geometrica.',
  ipotesi: ['stesso schema di d042: ceppo avvolgente con F_T = Fh/(OO′/f − R)', 'f costante (Coulomb); bracci OO′ e R invariati'],
  sample: (rnd) => {
    const s = sampleCeppi(rnd);
    return { ...s, T: s.Tsx };
  },
  passi: [
    {
      id: 'd043.1',
      latex: 'F_{T,av} = \\dfrac{F h}{\\overline{OO\'}/f - R} \\;\\Longleftrightarrow\\; F = \\dfrac{F_{T,av}}{h}\\Big(\\dfrac{\\overline{OO\'}}{f} - R\\Big)',
      perche: 'Si parte dall\'equilibrio del ceppo avvolgente (d042) e lo si legge al contrario: quanta forza serve per avere una certa forza frenante.',
      fonte: D(110),
      distrattori: [],
      num: (v) => [v.F, (v.T / v.h) * (v.d / v.f - v.R)],
    },
    {
      id: 'd043.2',
      latex: '\\dfrac{\\overline{OO\'}}{f} \\to R \\;\\Rightarrow\\; F_{T,av} \\to \\infty\\ \\text{con } F \\text{ finita}',
      perche: 'Il denominatore si annulla: basta una forza piccolissima per una forza frenante enorme. La dispensa la chiama «condizione di **freno d\'emergenza**» (p. 110).',
      fonte: D(110),
      chiave: true,
      distrattori: [
        { latex: '\\dfrac{\\overline{OO\'}}{f} + R \\to 0', errore: 'convenzione', spiega: 'Il denominatore con «+» è del ceppo svolgente e non si annulla mai: l\'autobloccaggio riguarda solo il ceppo in cui l\'attrito aiuta il comando.' },
        { latex: 'F_{T,av} \\to 0', errore: 'segno', spiega: 'Quando il denominatore va a zero la forza frenante cresce senza limite, non si annulla.' },
      ],
    },
    {
      id: 'd043.3',
      latex: 'F = 0 \\ \\text{con}\\ F_{T,av} \\neq 0 \\;\\Longleftrightarrow\\; f = f_{lim} = \\dfrac{\\overline{OO\'}}{R}',
      perche: 'Forma equivalente (quella delle fonti derivate, $\\mu_{lim} = b_N/b_T$): il comando si annulla quando il momento dell\'attrito $F_T R$ equilibra da solo quello della normale $F_N\\overline{OO\'}$.',
      fonte: D(110),
      chiave: true,
      distrattori: [
        { latex: 'f_{lim} = \\dfrac{R}{\\overline{OO\'}}', errore: 'indice', spiega: 'Rapporto capovolto: il limite è OO′/R, cioè braccio della normale su braccio della tangenziale.', num: (v) => [(v.T / v.h) * (v.d / (v.R / v.d) - v.R), 0] },
        { latex: 'f_{lim} = \\overline{OO\'}\\cdot R', errore: 'fattore', spiega: 'f è adimensionale: deve essere un rapporto di lunghezze.', num: (v) => [(v.T / v.h) * (v.d / (v.d * v.R) - v.R), 0] },
      ],
      num: (v) => [(v.T / v.h) * (v.d / v.flim - v.R), 0],
    },
    {
      id: 'd043.4',
      latex: 'f = f_{lim}:\\quad \\operatorname{dist}\\big(O\',\\ \\text{retta di } \\underline F_f^{(T,C)}\\big) = \\dfrac{|R f - \\overline{OO\'}|}{\\sqrt{1 + f^2}} = 0',
      perche: 'Lettura grafica: la forza frenante passa per M ed è inclinata di $\\varphi$ sulla normale. Al limite la sua retta d\'azione **passa per la cerniera**: non ha più momento, e il ceppo resta in equilibrio anche con $F = 0$. Con $f$ maggiore il momento cambierebbe verso: il ceppo si serra da solo.',
      fonte: DED('pp. 109–110', 'distanza di O′ dalla retta della forza frenante (per M, direzione −i + f j) nel ceppo avvolgente'),
      aggiunto: true,
      distrattori: [],
      num: (v) => {
        // ceppo sx: M = (−R, 0), O′ = (0, −d), direzione della forza del tamburo sul ceppo (−1, f)
        const ux = -1 / Math.hypot(1, v.flim), uy = v.flim / Math.hypot(1, v.flim);
        return [Math.abs((0 + v.R) * uy - (-v.d - 0) * ux), 0];
      },
    },
    {
      id: 'd043.5',
      latex: 'f > \\dfrac{\\overline{OO\'}}{R}:\\ F < 0\\ \\text{(il ceppo si serra da solo)};\\qquad \\text{progetto: } \\overline{OO\'} > f_{max}\\,R',
      perche: 'Oltre il limite servirebbe tirare il ceppo via dal tamburo: è l\'autobloccaggio. In progetto si tiene $\\overline{OO\'}/R$ con margine sopra il massimo $f$ prevedibile (f varia con temperatura e usura).',
      fonte: DED('p. 110', 'segno di F nell\'equilibrio del ceppo avvolgente per f oltre il limite'),
      aggiunto: true,
      distrattori: [],
    },
    {
      id: 'd043.6',
      latex: '\\text{pattino: } F_T = \\dfrac{C_{az}}{x_0/f - h} \\to \\infty\\ \\text{per}\\ \\dfrac{x_0}{f} = h\\ \\text{(«freno di sicurezza»)}',
      perche: 'Stessa struttura nel freno a pattino (pp. 115, 125): il braccio della normale diviso $f$ meno il braccio dell\'attrito. La dispensa lì lo chiama «freno di sicurezza», che «causa l\'impuntamento».',
      fonte: D([115, 125]),
      distrattori: [],
    },
  ],
  risultato: { latex: 'f_{lim} = \\dfrac{\\overline{OO\'}}{R}\\quad (\\overline{OO\'}/f = R:\\ F_{T,av} \\to \\infty)', fonte: D(110) },
  gancio: 'Autobloccaggio: la retta della forza frenante passa per la cerniera.',
};

// ------------------------------------------------------------------ d142 · consumo massimo e scelta della cerniera (pp. 108, 112, 123)
export const d142: Dimostrazione = {
  id: 'd142',
  titolo: 'Consumo massimo del ceppo e scelta geometrica del centro di rotazione',
  enunciato: 'Trovare dove il ceppo si consuma di più in funzione della posizione del suo centro di rotazione, e dove va messo il centro perché il massimo cada nel punto medio dell\'arco.',
  ipotesi: [
    'ceppo che ruota con ω_acc attorno a un centro C (la cerniera O′ nell\'accostamento rigido); C a distanza OC da O nella direzione γ',
    'Reye: δ̇ = k′p con la stessa velocità di strisciamento ωR su tutto l\'arco',
  ],
  sample: (rnd) => {
    const R = U(rnd, 0.1, 0.25), OC = U(rnd, 0.05, 0.3), gamma = U(rnd, -Math.PI, Math.PI), wacc = U(rnd, 0.01, 0.1), theta = U(rnd, -Math.PI, Math.PI);
    return { R, OC, gamma, wacc, theta };
  },
  passi: [
    {
      id: 'd142.1',
      latex: '\\dot\\delta = k\'\\,p \\quad (v = \\omega R\\ \\text{su tutto l\'arco})',
      perche: 'Nel tamburo la velocità di strisciamento è la stessa in ogni punto: per Reye la pressione è proporzionale al consumo. Dove il ceppo si consuma di più, preme di più (d040).',
      fonte: D(109),
      distrattori: [],
    },
    {
      id: 'd142.2',
      latex: '\\dot\\delta = \\underline V_{acc}(P)\\cdot\\underline n,\\qquad \\underline V_{acc}(P) = \\underline\\omega_{acc}\\wedge(P - C)',
      perche: 'Il consumo è la componente normale della velocità di accostamento del punto $P$ del ceppo, che ruota attorno al suo centro di rotazione $C$ (a p. 108 $C = O\'$).',
      fonte: D(108),
      distrattori: [],
    },
    {
      id: 'd142.3',
      latex: '(P - C) = (P - O) + (O - C),\\quad \\underline\\omega_{acc}\\wedge(P-O)\\perp\\underline n \\;\\Rightarrow\\; \\dot\\delta = \\underline\\omega_{acc}\\wedge(O - C)\\cdot\\underline n',
      perche: 'Come a p. 108: il termine con $(P - O)$ è tangente all\'arco e non contribuisce. Resta un vettore **costante**, $\\underline\\omega_{acc}\\wedge(O - C)$, proiettato su una normale che ruota con $\\theta$.',
      fonte: DED('p. 108', 'stessa scomposizione di p. 108 con un centro di rotazione C generico al posto di O′'),
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta = \\underline\\omega_{acc}\\wedge(P - O)\\cdot\\underline n', errore: 'termine-perso', spiega: 'È il termine che si annulla (tangente all\'arco): tenendo questo il consumo verrebbe zero ovunque.', num: (v) => {
          const P: [number, number] = [v.R * Math.cos(v.theta), v.R * Math.sin(v.theta)], n: [number, number] = [-Math.cos(v.theta), -Math.sin(v.theta)];
          const C: [number, number] = [v.OC * Math.cos(v.gamma), v.OC * Math.sin(v.gamma)];
          return [dt(wk(v.wacc, -C[0], -C[1]), n), dt(wk(v.wacc, P[0], P[1]), n)];
        } },
        { latex: '\\dot\\delta = \\omega_{acc}\\,|P - C|', errore: 'concetto', spiega: 'Il consumo è la sola componente normale della velocità di accostamento, non il suo modulo.', num: (v) => {
          const P: [number, number] = [v.R * Math.cos(v.theta), v.R * Math.sin(v.theta)], n: [number, number] = [-Math.cos(v.theta), -Math.sin(v.theta)];
          const C: [number, number] = [v.OC * Math.cos(v.gamma), v.OC * Math.sin(v.gamma)];
          return [dt(wk(v.wacc, -C[0], -C[1]), n), v.wacc * Math.hypot(P[0] - C[0], P[1] - C[1])];
        } },
      ],
      num: (v) => {
        const P: [number, number] = [v.R * Math.cos(v.theta), v.R * Math.sin(v.theta)], n: [number, number] = [-Math.cos(v.theta), -Math.sin(v.theta)];
        const C: [number, number] = [v.OC * Math.cos(v.gamma), v.OC * Math.sin(v.gamma)];
        return [dt(wk(v.wacc, P[0] - C[0], P[1] - C[1]), n), dt(wk(v.wacc, -C[0], -C[1]), n)];
      },
    },
    {
      id: 'd142.4',
      latex: 'C = O + \\overline{OC}\\,(\\cos\\gamma\\,\\underline i + \\sin\\gamma\\,\\underline j) \\;\\Rightarrow\\; \\dot\\delta(\\theta) = \\omega_{acc}\\,\\overline{OC}\\,\\sin(\\theta - \\gamma)',
      perche: 'Si svolge il prodotto con $\\underline n = -\\cos\\theta\\,\\underline i - \\sin\\theta\\,\\underline j$. Con $\\gamma = -90°$ (cerniera sotto O) si ritrova $\\sin(\\theta + 90°) = \\cos\\theta$ di p. 108.',
      fonte: DED('p. 108', 'generalizzazione di δ̇ = ω_acc OO′ cos θ a un centro di rotazione in direzione γ qualsiasi'),
      chiave: true,
      distrattori: [
        { latex: '\\dot\\delta(\\theta) = \\omega_{acc}\\,\\overline{OC}\\cos(\\theta - \\gamma)', errore: 'convenzione', spiega: 'Con C sotto O (γ = −90°) questa darebbe −sin θ, non il cos θ di p. 108.', num: (v) => [v.wacc * v.OC * Math.sin(v.theta - v.gamma), v.wacc * v.OC * Math.cos(v.theta - v.gamma)] },
        { latex: '\\dot\\delta(\\theta) = \\omega_{acc}\\,R\\,\\sin(\\theta - \\gamma)', errore: 'termine-perso', spiega: 'Il braccio è la distanza OC del centro di rotazione, non il raggio del tamburo.', num: (v) => [v.wacc * v.OC * Math.sin(v.theta - v.gamma), v.wacc * v.R * Math.sin(v.theta - v.gamma)] },
      ],
      num: (v) => [consumoCeppo({ OC: v.OC, gamma: v.gamma, omegaAcc: v.wacc }).d(v.theta), dt(wk(v.wacc, -v.OC * Math.cos(v.gamma), -v.OC * Math.sin(v.gamma)), [-Math.cos(v.theta), -Math.sin(v.theta)])],
    },
    {
      id: 'd142.5',
      latex: '\\dfrac{d\\dot\\delta}{d\\theta} = \\omega_{acc}\\overline{OC}\\cos(\\theta - \\gamma) = 0 \\;\\Rightarrow\\; \\theta_{max} = \\gamma + \\dfrac{\\pi}{2}:\\quad \\dot\\delta_{max} = \\omega_{acc}\\,\\overline{OC}',
      perche: 'Il massimo del consumo cade nel punto $P$ per cui $OP \\perp OC$: lì la velocità di accostamento è tutta normale all\'arco.',
      fonte: DED('pp. 108, 123', 'derivata della legge di d142.4 (la dispensa individua il massimo per simmetria, non con la derivata)'),
      distrattori: [],
      num: (v) => [consumoCeppo({ OC: v.OC, gamma: v.gamma, omegaAcc: v.wacc }).d(v.gamma + Math.PI / 2), v.wacc * v.OC],
    },
    {
      id: 'd142.6',
      latex: '\\theta_{max} = 0\\ (\\text{punto medio}) \\;\\Longleftrightarrow\\; \\gamma = -\\dfrac{\\pi}{2}:\\quad \\dot\\delta(\\theta) = \\dot\\delta(0)\\cos\\theta',
      perche: 'Perché il massimo cada sulla bisettrice dell\'arco il centro di rotazione deve stare sulla **retta per O perpendicolare alla bisettrice** («il centro di rotazione si troverà sulla normale rispetto alla bisettrice», p. 123). È il caso di p. 108, con O′ sotto O: consumo simmetrico e massimo al centro.',
      fonte: D([108, 123]),
      chiave: true,
      distrattori: [
        { latex: 'C\\ \\text{sulla bisettrice}\\ (\\gamma = 0)', errore: 'concetto', spiega: 'Con C sulla bisettrice il consumo va come sin θ: nullo al centro dell\'arco, e cambia segno da una parte all\'altra.', num: (v) => [consumoCeppo({ OC: v.OC, gamma: -Math.PI / 2, omegaAcc: v.wacc }).d(v.theta), consumoCeppo({ OC: v.OC, gamma: 0, omegaAcc: v.wacc }).d(v.theta)] },
        { latex: '\\text{il massimo è sempre al centro, qualunque sia } C', errore: 'ipotesi', spiega: 'La posizione del massimo dipende da dove sta il centro di rotazione: è proprio per questo che si sceglie la cerniera.' },
      ],
      num: (v) => [consumoCeppo({ OC: v.OC, gamma: -Math.PI / 2, omegaAcc: v.wacc }).d(v.theta), v.wacc * v.OC * Math.cos(v.theta)],
    },
    {
      id: 'd142.7',
      latex: '\\text{accostamento libero: } A \\in \\text{retta per M tangente al cerchio d\'attrito}',
      perche: 'Nell\'accostamento libero il ceppo è un corpo a due forze: la forza frenante passa per la cerniera A. Per avere la risultante nel punto medio M (consumo massimo al centro e simmetrico) si traccia la retta per M tangente al cerchio d\'attrito e si mette A su quella retta, cioè «più in alto» (pp. 112, 123).',
      fonte: D([112, 123]),
      distrattori: [],
    },
  ],
  risultato: { latex: '\\dot\\delta(\\theta) = \\omega_{acc}\\,\\overline{OC}\\sin(\\theta - \\gamma),\\quad \\theta_{max}: OP \\perp OC;\\qquad \\text{massimo al centro} \\Leftrightarrow C \\perp \\text{bisettrice per } O', fonte: DED('pp. 108, 112, 123', 'legge generale del consumo ricavata come a p. 108 e confrontata con la regola di p. 123') },
  gancio: 'Il ceppo consuma di più dove il raggio è perpendicolare a OC: metti C di fianco alla bisettrice.',
};

// ------------------------------------------------------------------ argomento
export const ceppi: ArgomentoContenuto = {
  id: 'c3-ceppi',
  cosaDireSubito:
    'Nel freno a tamburo uno o più ceppi di materiale d\'attrito sono premuti sul tamburo che ruota. Con pressione uniforme le risultanti valgono |F_N| = 2p₀RB sin(α/2) e |F_T| = f|F_N|; la forza frenante è inclinata di φ = arctg f ed è tangente al cerchio d\'attrito di raggio R sin φ. Poi scrivo l\'equilibrio del ceppo attorno alla cerniera: se il momento dell\'attrito aiuta il comando il ceppo è avvolgente e frena di più, fino all\'autobloccaggio.',
  sistemaIpotesi: [
    'Sistema: tamburo di centro O e raggio R; ceppo esterno o interno con arco α e profondità B; cerniera O′ (accostamento rigido, 1 gdl) o asta (libero, 2 gdl).',
    'Pressione uniforme p₀ (Reye con α ≤ 90°), risultanti nel punto medio M dell\'arco in prima approssimazione.',
    'Attrito coulombiano f = tg φ; inerzia del ceppo trascurata (equilibrio statico).',
    'Verso di rotazione del tamburo dichiarato: decide la tangente giusta e quale ceppo è avvolgente.',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Due ceppi esterni con cerniera O′ sotto O e tamburo orario (dispensa p. 109): forze frenanti tamburo→ceppo tangenti al cerchio d\'attrito; a sinistra l\'attrito aiuta il comando.',
    fonte: D(109, { fig: 'schizzo manoscritto con poligoni delle forze' }),
    elementi: [
      { id: 'tamburo', testo: 'tamburo con centro O, raggio R e verso di ω', obbligatorio: true },
      { id: 'ceppi', testo: 'ceppi con arco α, leve e cerniera O′; quote OO′ e h', obbligatorio: true },
      { id: 'F', testo: 'forze di comando F', obbligatorio: true },
      { id: 'M', testo: 'punto medio M dell\'arco di contatto', obbligatorio: true },
      { id: 'cerchio', testo: 'cerchio d\'attrito di raggio ρ = R sin φ concentrico al tamburo', obbligatorio: true },
      { id: 'Ff', testo: 'forza frenante tamburo→ceppo per M, tangente al cerchio d\'attrito dalla parte giusta', obbligatorio: true },
      { id: 'Z', testo: 'punto Z (incontro delle rette di F e F_f) e retta Z–O′ della reazione', obbligatorio: false },
      { id: 'poligono', testo: 'poligono delle forze F, F_f, Φ_O′', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'd\\underline F_N^{(C,T)} = p\\,dA\\,\\underline n,\\quad d\\underline F_T^{(C,T)} = -f\\,p\\,dA\\,\\underline e_\\theta;\\qquad \\sum M_{O\'}:\\ F h - F_N\\overline{OO\'} \\mp F_T R = 0',
    spiegazione: 'Forze elementari sul tamburo (da integrare), poi equilibrio alla rotazione del ceppo attorno alla cerniera: il segno del termine d\'attrito dice se il ceppo è avvolgente.',
    fonte: D([106, 110]),
  },
  dimostrazioni: ['d038', 'd039', 'd042', 'd043', 'd142'],
  significato:
    'Il freno a ceppi non è simmetrico: a parità di comando, il ceppo in cui l\'attrito gira il ceppo nello stesso verso del comando preme di più e frena di più, e se OO′/f scende fino a R si autoblocca. Per questo il verso di rotazione va sempre dichiarato e la cerniera si progetta con margine; la posizione del centro di rotazione decide anche dove il ceppo si consuma.',
  fraseDaRicordare: 'Avvolgente è il ceppo in cui l\'attrito aiuta il comando: si guarda il momento rispetto alla cerniera, non il lato.',
  daNonDire: [
    { frase: 'Il ceppo avvolgente è quello compresso e frena di meno.', perche: 'È la nomenclatura invertita di pp. 109–110 (NF-18). Avvolgente, nel senso usuale e in D p. 110 in basso, è quello in cui l\'attrito aiuta il comando: frena di più.', fonte: D([109, 110]) },
    { frase: 'I due ceppi frenano allo stesso modo per simmetria.', perche: 'La dispensa lo esclude: F_T,av/F_T,sv = (OO′/f + R)/(OO′/f − R) > 1.', fonte: D(109) },
    { frase: '|M_f| = |F_T| ρ.', perche: 'Il braccio ρ va con la forza frenante intera: |M_f| = |F_f|ρ = |F_T|R (refuso di p. 110, NF-143).', fonte: D([107, 110]) },
    { frase: 'La forza frenante è tangente al tamburo.', perche: 'È inclinata di φ sulla normale per M: è tangente al cerchio d\'attrito di raggio R sin φ.', fonte: D(107) },
    { frase: 'In ogni freno la risultante tangenziale vale f volte la normale.', perche: 'Vale nel tamburo con p uniforme; nel freno a disco con settore finito |F_T| < f|F_N| (NF-37).', fonte: D(116) },
  ],
  approfondimenti: [
    { domanda: 'Perché si può prendere la pressione uniforme sul ceppo?', tipo: 'collegamento', argomento: 'c3-reye', attesa: 'Per Reye p ∝ consumo; il consumo viene dalla rotazione attorno a O′ ed è δ̇(0) cos θ, al più −30 % agli estremi per α ≤ 90°: si trascura.', fonte: D([108, 109]) },
    { domanda: 'Che cosa cambia nel freno a pattino?', tipo: 'collegamento', argomento: 'c3-pattino', attesa: 'È il ceppo con R → ∞ che frena un nastro: il consumo diventa lineare (p = k′x), non c\'è più cerchio d\'attrito e il «freno d\'emergenza» diventa il «freno di sicurezza» x₀/f = h.', fonte: D([114, 124]) },
    { domanda: 'Una ganascia vincolata a traslare è avvolgente o svolgente?', tipo: 'approfondimento', attesa: 'Né l\'una né l\'altra: trasla, il suo CIR è improprio e non c\'è un momento rispetto a un centro finito. Sulla ganascia: comando, forza frenante e reazione della guida prismatica, concorrenti.', fonte: D([103, 111]) },
    { domanda: 'Come distingui accostamento rigido e libero?', tipo: 'approfondimento', attesa: 'Contando i gdl dopo aver tolto il tamburo: l = 1 rigido (cerniera, quadrilatero 3·3 − 4·2 = 1), l = 2 libero (asta più ceppo, 2·3 − 2·2 = 2). Nel libero con coppia sull\'asta il ceppo ha due forze, uguali, opposte e collineari.', fonte: D([106, 113]) },
    { domanda: 'Il cerchio d\'attrito l\'hai già visto?', tipo: 'collegamento', argomento: 'c2-perno', attesa: 'Sì, nel perno: la reazione è inclinata di φ sulla normale ed è tangente a un cerchio di raggio r sin φ. Qui il raggio è quello del tamburo.', fonte: D(107) },
    { domanda: 'Qual è lo schema di risoluzione di un freno a tamburo?', tipo: 'approfondimento', attesa: '1) gdl: rigido o libero; 2) rigido: F_f per M tangente al cerchio d\'attrito (tangente scelta con verso di ω e geometria), equilibrio a 3 o 2 forze, M_f = |F_f|ρ, con due ceppi si sommano; 3) libero: F_f tangente al cerchio d\'attrito e passante per la cerniera dell\'asta.', fonte: D(113) },
    { domanda: 'Che cos\'è un freno e con che criteri lo dimensioni?', tipo: 'approfondimento', attesa: 'Un organo che trasforma energia cinetica in calore e lo dissipa. Si dimensiona sulla massima azione resistente richiesta e sulla quantità di calore da smaltire. Quelli ad attrito (tamburo, nastro, disco) frenano anche a sistema fermo, a differenza di quelli a fluido o elettromagnetici.', fonte: D(105) },
    { domanda: 'C\'è un\'analogia con il freno a nastro?', tipo: 'collegamento', argomento: 'c4-freno-nastro', attesa: 'Sì: in entrambi il verso di rotazione conta, perché l\'attrito può aiutare o contrastare il comando; il freno a nastro è e^{fβ} volte più efficace nel verso giusto.', fonte: D(153) },
  ],
  simboli: [
    { simbolo: 'f,\\ \\varphi', significato: 'coefficiente e angolo d\'attrito, φ = arctg f', altrove: 'μ nelle domande (q39)' },
    { simbolo: '\\rho = R\\sin\\varphi', significato: 'raggio del cerchio d\'attrito' },
    { simbolo: 'B', significato: 'profondità (larghezza) del tamburo', altrove: 'b nelle dimostrazioni derivate' },
    { simbolo: '\\alpha', significato: 'angolo di avvolgimento (apertura) del ceppo' },
    { simbolo: '\\overline{OO\'},\\ R,\\ h', significato: 'bracci di F_N, F_T e F rispetto alla cerniera O′', altrove: 'b_N, b_T, h_F in q39' },
    { simbolo: '(C,T),\\ (T,C)', significato: 'forza del ceppo sul tamburo / del tamburo sul ceppo' },
    { simbolo: 'M,\\ m', significato: 'punto medio dell\'arco di contatto' },
    { simbolo: 'F_{T,av},\\ F_{T,sv}', significato: 'forza tangenziale del ceppo avvolgente / svolgente (senso usuale)', altrove: 'la dispensa a p. 110 chiama F_{T,A} il nostro svolgente e F_{T,S} il nostro avvolgente (NF-18)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c3-ceppi' }, { kind: 'meccanismo', id: 'c3-ceppo-consumo' }],
  previsioni: [
    {
      id: 'c3-ceppi-chi',
      domanda: 'Due ceppi esterni con cerniera sotto O e tamburo orario (figura di p. 109). Con la stessa F, quale frena di più?',
      opzioni: ['il destro', 'il sinistro', 'frenano uguale'],
      corretta: 1,
      spiega: 'Nel sinistro il tamburo trascina il ceppo verso l\'alto: l\'attrito aiuta il comando (avvolgente nel senso usuale, «svolgente» per la dispensa).',
      verify: () => {
        const c = ceppiEsterni({ F: 300, h: 0.3, d: 0.12, R: 0.15, f: 0.35, verso: 'orario' });
        return c.FTsx > c.FTdx ? 1 : c.FTdx > c.FTsx ? 0 : 2;
      },
      visual: { kind: 'meccanismo', id: 'c3-ceppi' },
    },
    {
      id: 'c3-ceppi-verso',
      domanda: 'Ora inverti il verso del tamburo (antiorario). Quale ceppo diventa avvolgente?',
      opzioni: ['il destro', 'il sinistro', 'nessuno dei due'],
      corretta: 0,
      spiega: 'Le tangenziali cambiano verso: i ruoli si scambiano.',
      verify: () => (ceppiEsterni({ F: 300, h: 0.3, d: 0.12, R: 0.15, f: 0.35, verso: 'antiorario' }).avvolgente === 'dx' ? 0 : 1),
      visual: { kind: 'meccanismo', id: 'c3-ceppi' },
    },
    {
      id: 'c3-ceppi-blocco',
      domanda: 'Con OO′ = 0,12 m e R = 0,15 m, da quale f in su il ceppo avvolgente si autoblocca?',
      opzioni: ['f = 0,4', 'f = 0,8', 'f = 1,25', 'mai'],
      corretta: 1,
      spiega: 'f_lim = OO′/R = 0,8: il denominatore OO′/f − R si annulla.',
      verify: () => {
        const l = ceppiEsterni({ F: 300, h: 0.3, d: 0.12, R: 0.15, f: 0.3, verso: 'orario' }).fLim;
        return Math.abs(l - 0.8) < 1e-9 ? 1 : Math.abs(l - 1.25) < 1e-9 ? 2 : 3;
      },
      visual: { kind: 'meccanismo', id: 'c3-ceppi' },
    },
  ],
  nf: ['NF-18', 'NF-37', 'NF-141', 'NF-143'],
};
