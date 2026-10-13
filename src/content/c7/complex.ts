/**
 * C7 · Complex replacement (domanda q21). Dispensa pp. 214–215 e 217.
 * Dimostrazione d123. Convenzione della dispensa (NF-12): forzante F₀ sin ωt, si prende la PARTE IMMAGINARIA;
 * con F₀ cos ωt (domande derivate) si prenderebbe la parte reale. Segno della fase: NF-34.
 */
import type { ArgomentoContenuto, Dimostrazione } from '../types';
import { U } from '../../engine/num';
import { regime } from '../../engine/c7';
import { figComplex } from './disegni';

const P214 = { tipo: 'dispensa', pag: 214 } as const;
const P215 = { tipo: 'dispensa', pag: 215 } as const;
const P217 = { tipo: 'dispensa', pag: 217 } as const;

const sampleForzato = (rnd: () => number) => {
  const m = U(rnd, 0.5, 20), K = U(rnd, 100, 5000), xi = U(rnd, 0.05, 0.8), wm = Math.sqrt(K / m), c = 2 * xi * m * wm;
  let rho = U(rnd, 0.2, 2.5);
  if (Math.abs(rho - 1) < 0.03) rho += 0.06;
  const w = rho * wm, F0 = U(rnd, 10, 500), t = U(rnd, 0, 1), al = U(rnd, -1.5, 1.5);
  const pRe = K - m * w * w, pIm = c * w, modP = Math.hypot(pRe, pIm), X = F0 / modP, phi = Math.atan2(pIm, pRe);
  return { m, K, xi, wm, c, rho, w, F0, t, al, pRe, pIm, modP, X, phi };
};

// ------------------------------------------------------------------ d123
export const d123: Dimostrazione = {
  id: 'd123',
  titolo: 'Complex replacement nella risposta armonica',
  enunciato: 'Ricavare la risposta a regime dell\'oscillatore forzato da F₀ sin ωt sostituendo la forzante con un esponenziale complesso, e tornare alla grandezza fisica.',
  ipotesi: [
    'equazione lineare a coefficienti reali e costanti m ẍ + c ẋ + K x = F₀ sin ωt',
    'si cerca solo la risposta a regime (integrale particolare); il transitorio si è smorzato',
    'convenzione della dispensa: forzante in seno, quindi parte immaginaria',
  ],
  sample: sampleForzato,
  passi: [
    {
      id: 'd123.1',
      latex: 'F_0\\sin\\omega t = \\operatorname{Im}\\{F_0\\,e^{i\\omega t}\\}',
      perche: 'Per Eulero $e^{i\\omega t} = \\cos\\omega t + i\\sin\\omega t$: la forzante reale è la parte immaginaria di un esponenziale complesso (p. 214: $\\sin\\omega t = \\operatorname{Im}\\{e^{i\\omega t}\\}$, $\\cos\\omega t = \\operatorname{Re}\\{e^{i\\omega t}\\}$).',
      fonte: P214,
      distrattori: [],
    },
    {
      id: 'd123.2',
      latex: 'm\\ddot z + c\\dot z + Kz = F_0\\,e^{i\\omega t}, \\qquad x(t) = \\operatorname{Im}\\{z(t)\\}',
      perche: 'Si risolve il problema complesso al posto di quello reale. Funziona perché l\'equazione è lineare a coefficienti reali: la parte immaginaria passa attraverso derivate e costanti reali, quindi $\\operatorname{Im}\\{z\\}$ risolve l\'equazione con $F_0\\sin\\omega t$. Non cambia la fisica: è un artificio di calcolo.',
      fonte: P217,
      chiave: true,
      distrattori: [
        { latex: 'x(t) = \\operatorname{Re}\\{z(t)\\}', errore: 'convenzione', spiega: 'La parte reale risolve l\'equazione con F₀ cos ωt (convenzione delle domande): con la forzante in seno della dispensa serve Im (NF-12).', num: (v) => [v.F0 * Math.sin(v.w * v.t), v.X * ((v.K - v.m * v.w ** 2) * Math.cos(v.w * v.t - v.phi) - v.c * v.w * Math.sin(v.w * v.t - v.phi))] },
        { latex: '\\text{vale anche se } c \\text{ o } K \\text{ dipendono da } x \\text{ o } \\dot x', errore: 'ipotesi', spiega: 'Serve la linearità a coefficienti costanti e reali: con una molla non lineare Im{z²} ≠ (Im z)² e il metodo non regge.' },
      ],
      num: (v) => {
        const x = v.X * Math.sin(v.w * v.t - v.phi), xd = v.X * v.w * Math.cos(v.w * v.t - v.phi), xdd = -v.w * v.w * x;
        return [v.m * xdd + v.c * xd + v.K * x, v.F0 * Math.sin(v.w * v.t)];
      },
    },
    {
      id: 'd123.3',
      latex: 'z_p = z_0\\,e^{i\\omega t}:\\quad \\dot z_p = i\\omega\\,z_0 e^{i\\omega t}, \\quad \\ddot z_p = (i\\omega)^2 z_0 e^{i\\omega t} = -\\omega^2 z_0 e^{i\\omega t}',
      perche: 'La risposta particolare ha la stessa pulsazione della forzante. Derivare un esponenziale complesso equivale a moltiplicarlo per $i\\omega$: l\'equazione differenziale diventerà algebrica.',
      fonte: { tipo: 'dispensa', pag: [214, 217] },
      distrattori: [
        { latex: '\\ddot z_p = +\\omega^2 z_0 e^{i\\omega t}', errore: 'segno', spiega: '(iω)² = i²ω² = −ω²: la massa entra con segno meno nella rigidezza dinamica.' },
      ],
    },
    {
      id: 'd123.4',
      latex: '\\big(-m\\omega^2 + ic\\omega + K\\big)\\,z_0 e^{i\\omega t} = F_0 e^{i\\omega t} \\;\\Rightarrow\\; z_0 = \\dfrac{F_0}{p(i\\omega)}, \\quad p(i\\omega) = K - m\\omega^2 + ic\\omega',
      perche: 'Si sostituisce e si semplifica $e^{i\\omega t}$ da entrambi i membri. $p(i\\omega)$ è la **rigidezza dinamica**: quantità complessa che lega la forza applicata alla risposta in spostamento. Molla e massa stanno sull\'asse reale con segni opposti, lo smorzatore sull\'asse immaginario. (A p. 215 la dispensa dimentica $e^{i\\omega t}$ al secondo membro.)',
      fonte: { tipo: 'dispensa', pag: [215, 217] },
      chiave: true,
      correzione: { nf: 'NF-243', dispensaScrive: '-\\omega^2 m\\hat X_G e^{i\\omega t} + ci\\omega\\hat X_G e^{i\\omega t} + k\\hat X_G e^{i\\omega t} = \\hat F_0 e^{i\\alpha}' },
      distrattori: [
        { latex: 'p(i\\omega) = K + m\\omega^2 + ic\\omega', errore: 'segno', spiega: '(iω)² = −ω²: l\'inerzia si sottrae alla rigidezza, ed è per questo che esiste la risonanza.', num: (v) => [v.X, v.F0 / Math.hypot(v.K + v.m * v.w ** 2, v.c * v.w)] },
        { latex: 'p(i\\omega) = K - m\\omega^2 + c\\omega', errore: 'concetto', spiega: 'Lo smorzatore è proporzionale alla velocità, sfasata di 90° rispetto allo spostamento: porta la i.', num: (v) => [v.X, v.F0 / Math.abs(v.K - v.m * v.w ** 2 + v.c * v.w)] },
      ],
      num: (v) => [v.X * Math.hypot(v.K - v.m * v.w ** 2, v.c * v.w), v.F0],
    },
    {
      id: 'd123.5',
      latex: 'z_0 = |z_0|\\,e^{-i\\varphi}, \\quad |z_0| = \\dfrac{F_0}{\\sqrt{(K - m\\omega^2)^2 + (c\\omega)^2}}, \\quad \\varphi = \\arg p(i\\omega) = \\operatorname{arctg}\\dfrac{c\\omega}{K - m\\omega^2} \\in [0, \\pi]',
      perche: 'Il modulo di un quoziente è il quoziente dei moduli; l\'argomento di $1/p$ è $-\\arg p$. Quindi la risposta è **in ritardo** di $\\varphi$ sulla forza. La dispensa scrive $|X_G|e^{+i\\varphi}$ (NF-34), ma subito dopo usa correttamente $\\sin(\\omega t - \\varphi)$. L\'arcotangente va presa nel quadrante giusto: per $K < m\\omega^2$ il ritardo supera $\\pi/2$.',
      fonte: P215,
      chiave: true,
      correzione: { nf: 'NF-34', dispensaScrive: '\\hat X_G = |X_G|\\,e^{i\\varphi}' },
      distrattori: [
        { latex: 'z_0 = |z_0|\\,e^{+i\\varphi}', errore: 'segno', spiega: 'È la riga della dispensa (NF-34): così la risposta sarebbe in anticipo, sin(ωt + φ).', num: (v) => [v.X * Math.sin(v.w * v.t - v.phi), v.X * Math.sin(v.w * v.t + v.phi)] },
        { latex: '|z_0| = \\dfrac{F_0}{K - m\\omega^2 + c\\omega}', errore: 'concetto', spiega: 'Parte reale e immaginaria sono in quadratura: il modulo è la radice della somma dei quadrati.', num: (v) => [v.X, v.F0 / (v.K - v.m * v.w ** 2 + v.c * v.w)] },
      ],
      num: (v) => [v.X, v.F0 / Math.sqrt((v.K - v.m * v.w ** 2) ** 2 + (v.c * v.w) ** 2)],
    },
    {
      id: 'd123.6',
      latex: 'x(t) = \\operatorname{Im}\\big\\{|z_0|\\,e^{-i\\varphi}\\,e^{i\\omega t}\\big\\} = |z_0|\\sin(\\omega t - \\varphi)',
      perche: 'Si torna alla grandezza fisica prendendo la parte immaginaria, come si era fatto con la forzante. La risposta ha la pulsazione della forzante, ampiezza $F_0/|p|$ e ritardo $\\varphi$.',
      fonte: { tipo: 'dispensa', pag: [215, 217] },
      distrattori: [
        { latex: 'x(t) = |z_0|\\cos(\\omega t - \\varphi)', errore: 'convenzione', spiega: 'È la parte reale: risponderebbe a F₀ cos ωt, non a F₀ sin ωt.', num: (v) => [v.X * Math.sin(v.w * v.t - v.phi), v.X * Math.cos(v.w * v.t - v.phi)] },
      ],
      num: (v) => [v.X * (Math.cos(v.phi) * Math.sin(v.w * v.t) - Math.sin(v.phi) * Math.cos(v.w * v.t)), v.X * Math.sin(v.w * v.t - v.phi)],
    },
    {
      id: 'd123.7',
      latex: 'F_0\\sin(\\omega t + \\alpha) \\to \\hat F_0 = F_0\\,e^{i\\alpha}:\\quad x(t) = |z_0|\\sin(\\omega t + \\alpha - \\varphi)',
      perche: 'Se la forzante ha una fase iniziale $\\alpha$, la si ingloba nell\'ampiezza complessa $\\hat F_0$: la risposta ha la stessa fase spostata del ritardo $\\varphi$ (p. 214–215). Servirà nell\'eccitazione di vincolo, dove le forzanti sono due e sfasate.',
      fonte: { tipo: 'dispensa', pag: [214, 215] },
      distrattori: [],
      num: (v) => {
        const x = v.X * Math.sin(v.w * v.t + v.al - v.phi), xd = v.X * v.w * Math.cos(v.w * v.t + v.al - v.phi), xdd = -v.w * v.w * x;
        return [v.m * xdd + v.c * xd + v.K * x, v.F0 * Math.sin(v.w * v.t + v.al)];
      },
    },
    {
      id: 'd123.8',
      latex: 'G(i\\omega) = \\dfrac{z_0}{F_0} = \\dfrac{1}{p(i\\omega)} = \\dfrac{1}{K - m\\omega^2 + ic\\omega}',
      perche: '**Complex gain**: rapporto tra risposta e ingresso armonico. Dice quanto il sistema amplifica o attenua a una data frequenza e con quale sfasamento. A p. 217 la dispensa chiama per una riga $p(\\lambda)$ il reciproco: $p$ resta la rigidezza dinamica, $G = 1/p$.',
      fonte: P217,
      correzione: { nf: 'NF-243', dispensaScrive: 'p(\\lambda) = \\dfrac{1}{-m\\omega^2 + k + i\\omega c}' },
      distrattori: [],
      num: (v) => [v.X / v.F0, 1 / v.modP],
    },
  ],
  risultato: { latex: 'z_0 = \\dfrac{F_0}{K - m\\omega^2 + ic\\omega}, \\qquad x(t) = \\operatorname{Im}\\{z_0 e^{i\\omega t}\\} = \\dfrac{F_0}{|p(i\\omega)|}\\sin(\\omega t - \\varphi)', fonte: { tipo: 'dispensa', pag: [215, 217] }, correzione: { nf: 'NF-34', dispensaScrive: '\\hat X_G = |X_G|e^{i\\varphi}' } },
  gancio: 'Con e^{iωt} derivare diventa moltiplicare per iω: l\'equazione diventa algebrica. Seno → parte immaginaria, coseno → parte reale.',
};

// ------------------------------------------------------------------ argomento
export const complexRepl: ArgomentoContenuto = {
  id: 'c7-complex',
  cosaDireSubito:
    'Il complex replacement è un artificio di calcolo: sostituisco la forzante reale F₀ sin ωt con F₀e^{iωt}, di cui è la parte immaginaria, e cerco la risposta come z₀e^{iωt}. Derivare diventa moltiplicare per iω e l\'equazione differenziale diventa algebrica: z₀ = F₀/p(iω), con p(iω) = K − mω² + icω rigidezza dinamica. Il modulo dà l\'ampiezza, l\'argomento il ritardo; alla fine prendo la parte immaginaria.',
  sistemaIpotesi: [
    'Sistema lineare a un grado di libertà con coefficienti reali e costanti (m, c, K).',
    'Forzante armonica F₀ sin ωt (eventualmente con fase α); si studia il regime.',
    'Convenzione della dispensa: seno → parte immaginaria. Con il coseno (domande) → parte reale.',
  ],
  disegno: {
    svg: figComplex(),
    didascalia: 'Piano complesso (ρ = 0,8, ξ = 0,25): il fasore della forza F̂e^{iωt} ruota con ω; la risposta, parallela a K X̂, lo segue in ritardo di φ. K X̂, icωX̂ e −mω²X̂ chiudono la catena sulla forza. La grandezza fisica è la proiezione sull\'asse immaginario.',
    fonte: { tipo: 'deduzione', da: 'pp. 214–215, 217', spiegazione: 'rappresentazione grafica dell\'equazione (−mω² + icω + K)X̂ = F̂₀ della dispensa (che non ha una figura dei fasori)' },
    elementi: [
      { id: 'assi', testo: 'asse reale e asse immaginario', obbligatorio: true },
      { id: 'forza', testo: 'fasore F̂ e^{iωt} che ruota con ω', obbligatorio: true },
      { id: 'risposta', testo: 'risposta X̂ e^{iωt} (parallela a K X̂) in ritardo di φ su F̂', obbligatorio: true },
      { id: 'catena', testo: 'K X̂ lungo X̂, icωX̂ a +90°, −mω²X̂ opposto: la somma chiude su F̂', obbligatorio: false },
      { id: 'proiezione', testo: 'proiezione sull\'asse immaginario = grandezza fisica (forzante in seno)', obbligatorio: true },
    ],
  },
  equazioneDiPartenza: {
    latex: 'm\\ddot x + c\\dot x + Kx = F_0\\sin\\omega t \\;\\longrightarrow\\; m\\ddot z + c\\dot z + Kz = F_0\\,e^{i\\omega t}, \\quad x = \\operatorname{Im}\\{z\\}',
    spiegazione: 'Il problema reale è la parte immaginaria di quello complesso; la risposta a regime si cerca come z = z₀e^{iωt}.',
    fonte: P217,
  },
  dimostrazioni: ['d123'],
  significato:
    'Nel piano complesso molla, smorzatore e massa diventano tre vettori: K X̂ in fase con lo spostamento, icωX̂ in anticipo di 90°, −mω²X̂ in opposizione; la loro somma deve chiudere sulla forza. Da qui si legge tutto: ampiezza F₀/|p| e ritardo arg p. A bassa frequenza domina la molla (risposta in fase), a ρ = 1 molla e massa si cancellano e resta lo smorzatore (90°), ad alta frequenza domina la massa (quasi 180°).',
  fraseDaRicordare: 'Derivare = moltiplicare per iω; X̂ = F̂/p(iω) con p = K − mω² + icω; seno → Im, coseno → Re.',
  daNonDire: [
    { frase: 'Alla fine prendo la parte reale.', perche: 'Con la forzante in seno della dispensa si prende la parte immaginaria (p. 217); la parte reale vale per F₀ cos ωt (NF-12).', fonte: P217 },
    { frase: 'X̂ = |X| e^{iφ}, con φ l\'argomento di p.', perche: 'È il refuso della dispensa (NF-34): X̂ = F̂/p ha argomento −φ, la risposta è in ritardo.', fonte: P215 },
    { frase: 'Il metodo vale per qualsiasi sistema.', perche: 'Solo per sistemi lineari a coefficienti reali e costanti: la parte immaginaria deve passare attraverso l\'equazione.', fonte: { tipo: 'deduzione', da: 'p. 217', spiegazione: 'Im commuta con derivate e costanti reali, non con termini non lineari' } },
    { frase: 'È come i numeri complessi della cinematica dei meccanismi.', perche: 'No (NF-43): nelle equazioni di chiusura si annullano entrambe le parti, reale e immaginaria; nel complex replacement se ne tiene una sola.', fonte: { tipo: 'dispensa', pag: [40, 44] } },
    { frase: 'La risposta oscilla alla pulsazione naturale.', perche: 'A regime la risposta ha la pulsazione della forzante ω; ω_m entra solo in ampiezza e fase.', fonte: P214 },
  ],
  approfondimenti: [
    { domanda: 'Come arrivi al fattore di amplificazione?', tipo: 'collegamento', argomento: 'c7-forzate', attesa: '|z₀| = F₀/√((K − mω²)² + (cω)²); dividendo per K e usando mω²/K = ρ², cω/K = 2ξρ si ha X₀/(F₀/K) = 1/√((1−ρ²)² + 4ξ²ρ²).', fonte: P215 },
    { domanda: 'Che differenza c\'è con l\'uso dei numeri complessi nell\'analisi cinematica dei meccanismi?', tipo: 'collegamento', argomento: 'c1-cinematica-analitica', attesa: 'Lì l\'equazione di chiusura complessa vale come due equazioni reali, parte reale e immaginaria entrambe nulle; qui la grandezza fisica è una sola delle due parti e l\'altra è un ausilio di calcolo (NF-43).', fonte: { tipo: 'dispensa', pag: [40, 44] } },
    { domanda: 'E se la forzante fosse F₀ cos ωt?', tipo: 'approfondimento', attesa: 'Stesso z₀; si prende la parte reale: x = |z₀| cos(ωt − φ). Ampiezza e fase non cambiano.', fonte: { tipo: 'dispensa', pag: 214 } },
    { domanda: 'Perché la parte immaginaria della soluzione complessa risolve l\'equazione reale?', tipo: 'approfondimento', attesa: 'Perché m, c, K sono reali e l\'equazione è lineare: Im{m z̈ + c ż + K z} = m Im{z}̈ + c Im{z}̇ + K Im{z}, e Im{F₀e^{iωt}} = F₀ sin ωt.', fonte: { tipo: 'deduzione', da: 'p. 217', spiegazione: 'linearità e coefficienti reali' } },
    { domanda: 'Cos\'è il complex gain?', tipo: 'approfondimento', attesa: 'G(iω) = z₀/F₀ = 1/p(iω): il suo modulo è il guadagno (ampiezza per unità di forza), il suo argomento −φ la fase associata.', fonte: P217 },
    { domanda: 'Come lo usi se la base si muove?', tipo: 'collegamento', argomento: 'c7-vincolo', attesa: 'Con x_V = X_V e^{iωt} la forzante equivalente è X_V(K + icω)e^{iωt}: stessa p(iω) al denominatore, numeratore complesso con fase arctg 2ξρ.', fonte: { tipo: 'dispensa', pag: [219, 221] } },
  ],
  simboli: [
    { simbolo: 'z,\\ z_0\\ (\\hat X_G)', significato: 'risposta complessa e sua ampiezza complessa', altrove: 'x̃, X̂ in q21' },
    { simbolo: 'p(i\\omega)', significato: 'rigidezza dinamica K − mω² + icω (a p. 211 p(λ) è il polinomio caratteristico)', altrove: 'Z(ω) in q21, Z_d in d127' },
    { simbolo: 'G(i\\omega)', significato: 'complex gain 1/p(iω)', altrove: 'H(ω) in d123' },
    { simbolo: '\\varphi\\ (= \\alpha_{DS})', significato: 'ritardo della risposta, argomento di p(iω)', altrove: 'φ = arg Z in q21' },
    { simbolo: '\\operatorname{Im},\\ \\operatorname{Re}', significato: 'parte immaginaria (forzante in seno, dispensa) o reale (forzante in coseno, domande)' },
  ],
  visuali: [{ kind: 'meccanismo', id: 'c7-fasori' }],
  previsioni: [
    {
      id: 'c7-cr-risonanza',
      domanda: 'A ρ = 1 (ω = ω_m), cosa fanno i fasori di molla K X̂ e di massa −mω²X̂?',
      opzioni: ['si sommano e raddoppiano', 'si annullano: la forza è equilibrata solo dallo smorzatore', 'sono entrambi in fase con la forza'],
      corretta: 1,
      spiega: 'K − mω_m² = 0: resta icω_m X̂, che deve uguagliare F̂. Per questo il ritardo è esattamente π/2 e l\'ampiezza F₀/(cω_m).',
      verify: () => {
        const m = 2, K = 800, c = 8, r = regime({ m, c, K, F0: 1, omega: Math.sqrt(K / m) });
        return Math.abs(r.pRe) < 1e-9 && Math.abs(r.phi - Math.PI / 2) < 1e-9 ? 1 : 0;
      },
      visual: { kind: 'meccanismo', id: 'c7-fasori' },
    },
    {
      id: 'c7-cr-coseno',
      domanda: 'Se la forzante fosse F₀ cos ωt, quale parte della soluzione complessa prenderesti?',
      opzioni: ['la parte reale', 'la parte immaginaria', 'il modulo'],
      corretta: 0,
      spiega: 'F₀ cos ωt = Re{F₀e^{iωt}}: con coefficienti reali la parte reale di z risolve il problema. Con il seno (dispensa) si prende Im.',
      verify: () => {
        // con la stessa z₀, la parte reale X cos(ωt − φ) risolve l'equazione con F₀ cos ωt
        const m = 2, K = 800, c = 8, w = 15, t = 0.37, r = regime({ m, c, K, F0: 1, omega: w });
        const x = r.X0 * Math.cos(w * t - r.phi), xd = -r.X0 * w * Math.sin(w * t - r.phi), xdd = -w * w * x;
        return Math.abs(m * xdd + c * xd + K * x - Math.cos(w * t)) < 1e-9 ? 0 : 1;
      },
      visual: { kind: 'meccanismo', id: 'c7-fasori' },
    },
  ],
  nf: ['NF-12', 'NF-34', 'NF-43', 'NF-243'],
};
