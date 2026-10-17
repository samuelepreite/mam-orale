/**
 * C3 · Frizioni centrifughe (domanda q43). ASSENTE nella dispensa (NF-07): modello classico a ceppi guidati
 * radialmente con molla di richiamo, dichiarato come fonte esterna; variante a ceppi incernierati (q43) come
 * approfondimento (NF-147). Usa solo strumenti della dispensa: forza d'inerzia (cap. 1), attrito coulombiano, ceppi.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { frizioneCentrifuga } from '../../engine/c3';
import { arc, arrow, circle, dim, dot, line, poly, pt, rot, svg, text } from '../svg';
import { D, EST } from './comune';

const ESTC = EST(
  'trattazione classica delle frizioni centrifughe (ceppi guidati radialmente sul lato motore, molla di richiamo, tamburo sul lato condotto)',
  'la dispensa non tratta le frizioni centrifughe; il modello usa solo la forza d\'inerzia centrifuga e l\'attrito coulombiano già visti nel corso',
);

// ------------------------------------------------------------------ disegno (schema classico)
function disegno() {
  const cx = 150, cy = 145, Rt = 108, ri = 84, re = 100;
  const parts: string[] = [
    circle(cx, cy, Rt + 8, 'l'), circle(cx, cy, Rt, 'l'), circle(cx, cy, 28, 'l'), dot(cx, cy, 'O', -12, -10),
    rot(cx, cy, 18, 200, 300, 'v', 'ω_m'),
    text(8, 268, 'tamburo (lato condotto)', { c: 'm', size: 12, anchor: 'start' }),
  ];
  for (const a of [90, 210, 330]) {
    const [g0x, g0y] = pt(cx, cy, 28, a), [g1x, g1y] = pt(cx, cy, ri, a);
    parts.push(line(g0x, g0y, g1x, g1y, 'd'));
    parts.push(arc(cx, cy, ri, a - 22, a + 22, 'a'), arc(cx, cy, re, a - 22, a + 22, 'a'));
    const [c1x, c1y] = pt(cx, cy, ri, a - 22), [c2x, c2y] = pt(cx, cy, re, a - 22), [c3x, c3y] = pt(cx, cy, ri, a + 22), [c4x, c4y] = pt(cx, cy, re, a + 22);
    parts.push(line(c1x, c1y, c2x, c2y, 'a'), line(c3x, c3y, c4x, c4y, 'a'));
    // molla a zig-zag accanto alla guida
    const zz: [number, number][] = [];
    for (let k = 0; k <= 8; k++) zz.push(pt(cx, cy, 32 + (k * (ri - 36)) / 8, a + (k % 2 ? 9 : 5)));
    parts.push(poly(zz, 'm'));
  }
  const [gx, gy] = pt(cx, cy, 92, 90), [fx, fy] = pt(cx, cy, 128, 90);
  parts.push(
    dot(gx, gy, 'G', 12, 2, 'a'), arrow(gx, gy - 4, fx, fy, 'f'), text(fx + 6, fy - 4, 'F_c = m r_G ω_m²', { c: 'f', size: 12, anchor: 'start' }),
    dim(cx, cy, gx, gy, 'r_G', 30),
    text(cx - 62, cy - 38, 'molla F_m', { c: 'm', size: 12 }),
  );
  const [nx, ny] = pt(cx, cy, 100, 330), [n2x, n2y] = pt(cx, cy, 76, 330), [t2x, t2y] = pt(cx + 0, cy, 100, 352);
  parts.push(arrow(nx, ny, n2x, n2y, 'f'), text(n2x - 6, n2y + 14, 'F_N', { c: 'f', size: 12 }), arrow(nx, ny, t2x, t2y, 'v'), text(t2x + 18, t2y + 4, 'f F_N', { c: 'v', size: 12 }));
  parts.push(text(150, 292, 'ω_m > ω*:  C_f = n f R m r_G (ω_m² − ω*²)', { c: 'a', size: 13 }));
  return svg(330, 305, parts, 'Frizione centrifuga: ceppi guidati radialmente sul mozzo motore, molle di richiamo, tamburo condotto');
}

// ------------------------------------------------------------------ d054
export const d054: Dimostrazione = {
  id: 'd054',
  titolo: 'Frizione centrifuga: velocità di innesto e coppia trasmessa',
  enunciato: 'Ricavare la velocità del lato motore alla quale i ceppi toccano il tamburo e la coppia trasmessa per attrito in funzione della velocità.',
  ipotesi: [
    'n ceppi di massa m, guidati radialmente sul mozzo motore (velocità ω_m), baricentro a distanza r_G dall\'asse',
    'molla di richiamo con forza F_m verso l\'asse; gioco fra ceppi e tamburo trascurabile (r_G e F_m non cambiano al contatto)',
    'tamburo di raggio R solidale all\'utilizzatore; attrito coulombiano f in strisciamento; gravità trascurata',
  ],
  sample: (rnd) => {
    const m = U(rnd, 0.1, 0.5), rG = U(rnd, 0.04, 0.1), Fm = U(rnd, 20, 200), R = rG + U(rnd, 0.01, 0.03), f = U(rnd, 0.2, 0.45);
    const n = 2 + Math.floor(rnd() * 3);
    const ws = Math.sqrt(Fm / (m * rG)), w = ws * U(rnd, 1.1, 3);
    const c = frizioneCentrifuga({ m, rG, Fm, R, f, n, omega: w });
    return { m, rG, Fm, R, f, n, ws, w, N: c.N, Cf: c.Cf, K: c.K };
  },
  passi: [
    {
      id: 'd054.1',
      latex: '\\text{lato motore: ceppi } (m, r_G) \\text{ + molle } F_m;\\quad \\text{lato condotto: tamburo } R',
      perche: 'È un innesto **automatico**: non c\'è forza di comando. La forza che preme i ceppi sul tamburo è la forza d\'inerzia centrifuga, che cresce con la velocità del motore.',
      fonte: ESTC,
      distrattori: [],
    },
    {
      id: 'd054.2',
      latex: '\\underline F_c = -m\\,\\underline a_G = m\\,r_G\\,\\omega_m^2\\ \\text{(radiale, verso l\'esterno)}',
      perche: 'Nel moto del ceppo con il mozzo a $\\omega_m$ costante il baricentro ha accelerazione centripeta $-\\omega_m^2 (G - O)$: la forza d\'inerzia (D\'Alembert) è centrifuga.',
      fonte: ESTC,
      distrattori: [],
    },
    {
      id: 'd054.3',
      latex: 'm r_G \\omega_m^2 - F_m + R_v = 0,\\quad R_v = 0 \\;\\Rightarrow\\; \\omega^* = \\sqrt{\\dfrac{F_m}{m\\,r_G}}',
      perche: 'Equilibrio radiale del ceppo prima del contatto: forza centrifuga (verso l\'esterno), molla (verso il centro) e reazione $R_v$ dell\'arresto interno sul mozzo, che spinge il ceppo verso l\'esterno. Alla velocità d\'innesto il ceppo sta per lasciare l\'arresto ($R_v = 0$) e tocca il tamburo.',
      fonte: ESTC,
      chiave: true,
      distrattori: [
        { latex: '\\omega^* = \\dfrac{F_m}{m\\,r_G}', errore: 'fattore', spiega: 'La centrifuga va con ω²: serve la radice (e così ω* ha le dimensioni di una velocità angolare).', num: (v) => [v.ws, v.Fm / (v.m * v.rG)] },
        { latex: '\\omega^* = \\sqrt{\\dfrac{F_m\\,r_G}{m}}', errore: 'indice', spiega: 'r_G sta al denominatore: più il ceppo è lontano dall\'asse, prima si innesta.', num: (v) => [v.ws, Math.sqrt((v.Fm * v.rG) / v.m)] },
      ],
      num: (v) => [v.m * v.rG * v.ws ** 2 - v.Fm, 0],
    },
    {
      id: 'd054.4',
      latex: '\\omega_m > \\omega^*:\\quad F_N = m r_G\\omega_m^2 - F_m = m r_G\\,(\\omega_m^2 - \\omega^{*2})',
      perche: 'Dopo il contatto il tamburo prende il posto dell\'arresto: la sua reazione normale è l\'eccesso di centrifuga sulla molla. Si usa $F_m = m r_G\\omega^{*2}$.',
      fonte: ESTC,
      chiave: true,
      distrattori: [
        { latex: 'F_N = m r_G\\,\\omega_m^2', errore: 'termine-perso', spiega: 'Una parte della centrifuga serve a vincere la molla: preme sul tamburo solo l\'eccesso.', num: (v) => [v.N, v.m * v.rG * v.w ** 2] },
        { latex: 'F_N = m r_G\\,(\\omega_m - \\omega^*)^2', errore: 'concetto', spiega: 'Si sottraggono le forze, cioè i quadrati delle velocità, non le velocità.', num: (v) => [v.N, v.m * v.rG * (v.w - v.ws) ** 2] },
      ],
      num: (v) => [v.m * v.rG * v.w ** 2 - v.Fm, v.m * v.rG * (v.w ** 2 - v.ws ** 2)],
    },
    {
      id: 'd054.5',
      latex: 'F_T = f F_N \\;\\Rightarrow\\; C_f = n\\,f\\,F_N\\,R = n f R\\,m r_G\\,(\\omega_m^2 - \\omega^{*2})',
      perche: 'Finché il tamburo è più lento dei ceppi c\'è strisciamento: ogni ceppo trasmette $f F_N$ con braccio $R$ (come nel freno a ceppi, con le risultanti nel punto medio).',
      fonte: ESTC,
      distrattori: [],
      num: (v) => [v.Cf, v.n * v.f * v.R * v.m * v.rG * (v.w ** 2 - v.ws ** 2)],
    },
    {
      id: 'd054.6',
      latex: 'C_f = K\\,(\\omega_m^2 - \\omega^{*2}),\\quad K = n f m r_G R;\\qquad \\omega_m = 2\\omega^*:\\ C_f = 3K\\omega^{*2}',
      perche: 'A geometria fissata la coppia cresce in modo **parabolico** con la velocità del motore oltre $\\omega^*$: sotto $\\omega^*$ è nulla.',
      fonte: ESTC,
      distrattori: [],
      num: (v) => [frizioneCentrifuga({ m: v.m, rG: v.rG, Fm: v.Fm, R: v.R, f: v.f, n: v.n, omega: 2 * v.ws }).Cf, 3 * v.K * v.ws ** 2],
    },
    {
      id: 'd054.7',
      latex: '\\text{aderenza se } C_f(\\omega_m) \\ge C_{richiesta}',
      perche: 'Il motore sale di giri quasi a vuoto, poi la coppia d\'attrito cresce e trascina l\'utilizzatore finché le velocità si uguagliano; da lì in poi è aderenza, come in ogni frizione (p. 117), purché la coppia richiesta non superi quella d\'attrito.',
      fonte: D(117),
      distrattori: [],
    },
  ],
  risultato: { latex: '\\omega^* = \\sqrt{\\dfrac{F_m}{m r_G}},\\qquad C_f = n f R\\,m r_G\\,(\\omega_m^2 - \\omega^{*2})\\quad (\\omega_m > \\omega^*)', fonte: ESTC },
  gancio: 'Innesto quando la centrifuga vince la molla; poi la coppia cresce come ω² − ω*².',
};

// ------------------------------------------------------------------ argomento
export const frizioneCentrifuga_: ArgomentoContenuto = {
  id: 'c3-frizione-centrifuga',
  cosaDireSubito:
    'La frizione centrifuga è un innesto automatico: sul lato motore ci sono dei ceppi trattenuti verso l\'asse da molle, e quando la velocità cresce la forza centrifuga li spinge sul tamburo del lato condotto. L\'innesto inizia quando m r_G ω² uguaglia la forza della molla, ω* = √(F_m/(m r_G)); poi la normale è m r_G(ω² − ω*²) e la coppia cresce in modo parabolico. Avverto che nella dispensa non c\'è: è il modello classico.',
  sistemaIpotesi: [
    'Sistema: mozzo motore con n ceppi guidati radialmente e molle di richiamo; tamburo condotto di raggio R.',
    'Forza d\'inerzia centrifuga m r_G ω_m² sul ceppo; gioco trascurabile.',
    'Attrito coulombiano in strisciamento; risultanti nel punto medio dell\'arco.',
    'Argomento assente nella dispensa: modello da fonte esterna (NF-07).',
  ],
  disegno: {
    svg: disegno(),
    didascalia: 'Schema classico di frizione centrifuga a tre ceppi (non nella dispensa): centrifuga, molla, normale e attrito del tamburo sul ceppo.',
    fonte: ESTC,
    elementi: [
      { id: 'tamburo', testo: 'tamburo esterno solidale al lato condotto', obbligatorio: true },
      { id: 'mozzo', testo: 'mozzo motore con ω_m e guide radiali dei ceppi', obbligatorio: true },
      { id: 'molle', testo: 'molle di richiamo F_m verso l\'asse', obbligatorio: true },
      { id: 'Fc', testo: 'forza centrifuga m r_G ω_m² nel baricentro G del ceppo', obbligatorio: true },
      { id: 'contatto', testo: 'normale F_N e attrito f F_N del tamburo sul ceppo', obbligatorio: false },
    ],
  },
  equazioneDiPartenza: {
    latex: 'm r_G\\,\\omega_m^2 - F_m - F_N = 0,\\qquad C_f = n\\,f\\,F_N\\,R',
    spiegazione: 'Equilibrio radiale del ceppo nel moto con il mozzo (centrifuga, molla, reazione del tamburo) e coppia d\'attrito dei ceppi.',
    fonte: ESTC,
  },
  dimostrazioni: ['d054'],
  significato:
    'La forza di serraggio la dà la velocità stessa del motore: sotto ω* il motore gira libero (avviamento a vuoto), sopra la coppia cresce con ω² − ω*². Si sceglie la molla per fissare la velocità d\'innesto; tipica dei piccoli motori (scooter, motoseghe).',
  fraseDaRicordare: 'Innesto quando la centrifuga vince la molla: ω* = √(F_m/(m r_G)); poi C_f ∝ ω² − ω*².',
  daNonDire: [
    { frase: 'È nella dispensa.', perche: 'Le pp. 103–128 non trattano le frizioni centrifughe: va detto che è il modello classico (NF-07).', fonte: ESTC },
    { frase: 'Tutta la forza centrifuga preme sul tamburo.', perche: 'Una parte equilibra la molla: preme solo m r_G(ω² − ω*²).', fonte: ESTC },
    { frase: 'La coppia cresce linearmente con la velocità.', perche: 'Cresce con ω² − ω*²: in modo parabolico.', fonte: ESTC },
    { frase: 'La velocità d\'innesto dipende dalla velocità del tamburo.', perche: 'Dipende dalla velocità del lato motore, su cui stanno i ceppi.', fonte: ESTC },
  ],
  approfondimenti: [
    { domanda: 'E se i ceppi sono incernierati invece che guidati?', tipo: 'collegamento', argomento: 'c3-ceppi', attesa: 'Si fa l\'equilibrio alla rotazione attorno alla cerniera, con bracci per centrifuga, molla, normale e attrito: compare un denominatore b_N/f − b_T come nel ceppo avvolgente (q43). Il verso di rotazione conta.', fonte: EST('trattazione classica (variante a ceppi incernierati, q43)', 'stessa struttura del ceppo avvolgente/svolgente della dispensa pp. 109–110') },
    { domanda: 'Che cosa succede dopo il contatto, nel tempo?', tipo: 'collegamento', argomento: 'c6-frizione', attesa: 'Come per ogni frizione: fase di slittamento con la coppia d\'attrito che accelera il condotto e frena il motore, poi sincronizzazione e aderenza.', fonte: D([117, 118]) },
    { domanda: 'Che differenza c\'è con la frizione piana?', tipo: 'collegamento', argomento: 'c3-frizione-piana', attesa: 'Nella piana la forza di serraggio N è imposta dal comando e la coppia è i f N r_m; qui la normale dipende da ω² e il contatto è su un tamburo.', fonte: D(120) },
    { domanda: 'Come scegli la velocità d\'innesto?', tipo: 'approfondimento', attesa: 'Con il precarico della molla: ω* = √(F_m/(m r_G)); più molla, innesto più tardi.', fonte: ESTC },
    { domanda: 'Quanto vale la coppia a 2ω*?', tipo: 'approfondimento', attesa: 'C_f = K(4ω*² − ω*²) = 3Kω*², con K = n f m r_G R.', fonte: ESTC },
  ],
  simboli: [
    { simbolo: '\\omega_m,\\ \\omega^*', significato: 'velocità del lato motore e velocità d\'innesto', altrove: 'ω_m* in q43' },
    { simbolo: 'm,\\ r_G', significato: 'massa del ceppo e distanza del suo baricentro dall\'asse', altrove: 'OG in q43' },
    { simbolo: 'F_m', significato: 'forza della molla di richiamo', altrove: 'F_e (q43), F_molla (d054)' },
    { simbolo: 'R', significato: 'raggio interno del tamburo', altrove: 'R_T in q43' },
    { simbolo: 'n,\\ f', significato: 'numero di ceppi, coefficiente d\'attrito', altrove: 'μ' },
  ],
  previsioni: [
    {
      id: 'c3-fcent-quad',
      domanda: 'Il motore passa da 1,5 ω* a 3 ω*. La coppia trasmessa in strisciamento diventa circa…',
      opzioni: ['il doppio', '4 volte', '6,4 volte', '9 volte'],
      corretta: 2,
      spiega: '(9 − 1)/(2,25 − 1) = 8/1,25 = 6,4: conta ω² − ω*², non ω².',
      verify: () => {
        const p = { m: 0.2, rG: 0.06, Fm: 80, R: 0.08, f: 0.3, n: 3 };
        const ws = frizioneCentrifuga({ ...p, omega: 0 }).omegaStar;
        const r = frizioneCentrifuga({ ...p, omega: 3 * ws }).Cf / frizioneCentrifuga({ ...p, omega: 1.5 * ws }).Cf;
        return Math.abs(r - 6.4) < 1e-6 ? 2 : Math.abs(r - 4) < 1e-6 ? 1 : Math.abs(r - 9) < 1e-6 ? 3 : 0;
      },
    },
  ],
  nf: ['NF-07', 'NF-147'],
};
