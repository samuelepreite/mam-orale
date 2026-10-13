/**
 * Meccanismi animati del capitolo C3 (freni e frizioni). Statica e cinematica in src/engine/c3.ts (pure, testate in
 * tests/meccanismi-c3.test.ts); qui si disegna e basta. Classi dw-* del tema (chiaro/scuro).
 */
import { useState, type ComponentType } from 'react';
import { ceppiEsterni, consumoCeppo, discoSettore, partitore, pattino, type Legge } from '../engine/c3';
import { fmt } from '../engine/num';
import { Arrow, Mech, Readout, Slider, Toggle, useCrank } from './anim';

const RAD = Math.PI / 180;
/** punto sulla circonferenza con angolo matematico (y verso il basso nello schermo) */
const P = (cx: number, cy: number, r: number, a: number): [number, number] => [cx + r * Math.cos(a), cy - r * Math.sin(a)];
const arcPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const [x0, y0] = P(cx, cy, r, a0), [x1, y1] = P(cx, cy, r, a1);
  return `M${x0},${y0} A${r},${r} 0 ${Math.abs(a1 - a0) > Math.PI ? 1 : 0} ${a1 > a0 ? 0 : 1} ${x1},${y1}`;
};
const norm180 = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;

// ------------------------------------------------------------------ consumo del ceppo (pp. 108, 123; d142)
function CeppoConsumoAnim() {
  const [alphaDeg, setAlpha] = useState(90);
  const [gammaDeg, setGamma] = useState(-90);
  const crank = useCrank(0.12);
  const cx = 140, cy = 128, R = 78, OCpx = 104;
  const alpha = alphaDeg * RAD, gamma = gammaDeg * RAD;
  const c = consumoCeppo({ OC: 1, gamma, omegaAcc: 1 });
  const thetas = Array.from({ length: 13 }, (_, k) => -alpha / 2 + (k * alpha) / 12);
  const vals = thetas.map((t) => Math.max(0, c.d(t)));
  const vmax = Math.max(1e-9, ...vals);
  const [Cx, Cy] = P(cx, cy, OCpx, gamma);
  const tm = norm180((c.thetaMax * 180) / Math.PI);
  const dentro = Math.abs(tm) <= alphaDeg / 2 + 1e-9;
  const staccato = vals.some((v) => v <= 0);
  const svgEl = (
    <svg viewBox="0 0 300 260" className="dw" role="img" aria-label="Consumo lungo l'arco del ceppo">
      <circle cx={cx} cy={cy} r={R} className="dw-l" />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const [x, y] = P(cx, cy, R * 0.85, -crank.theta + (k * Math.PI) / 3);
        return <line key={k} x1={cx} y1={cy} x2={x} y2={y} className="dw-m" />;
      })}
      <path d={arcPath(cx, cy, R + 5, -alpha / 2, alpha / 2)} className="dw-a" strokeWidth={6} fill="none" />
      {thetas.map((t, k) => {
        const L = (vals[k] / vmax) * 42;
        const [x1, y1] = P(cx, cy, R + 10 + L, t), [x2, y2] = P(cx, cy, R + 9, t);
        return L > 1 ? <Arrow key={k} x1={x1} y1={y1} x2={x2} y2={y2} c="a" w={2} size={6} /> : null;
      })}
      <line x1={cx} y1={cy} x2={Cx} y2={Cy} className="dw-d" />
      <circle cx={Cx} cy={Cy} r={5} className="dw-fill" />
      <text x={Cx + 8} y={Cy + 14} className="dw-t dw-tl">C</text>
      <circle cx={cx} cy={cy} r={3} className="dw-fill" />
      <text x={cx - 14} y={cy - 6} className="dw-t dw-tl">O</text>
      {dentro ? (() => {
        const [mx, my] = P(cx, cy, R, c.thetaMax);
        return <circle cx={mx} cy={my} r={5} className="dw-dot dw-dota" />;
      })() : null}
      <line x1={cx} y1={cy} x2={cx + R + 60} y2={cy} className="dw-d" />
    </svg>
  );
  return (
    <Mech
      title="Consumo del ceppo: dove è massimo dipende dal centro di rotazione"
      svg={svgEl}
      side={
        <>
          <Slider label="α (apertura del ceppo)" value={alphaDeg} min={30} max={140} step={5} onChange={setAlpha} unit="°" />
          <Slider label="γ (direzione di C da O)" value={gammaDeg} min={-180} max={180} step={5} onChange={setGamma} unit="°" />
          <Readout
            rows={[
              ['δ̇(θ) = ω_acc · OC · sin(θ − γ)', ''],
              ['massimo a θ =', `${fmt(tm, 3)}° ${dentro ? '(dentro l\'arco)' : '(fuori dall\'arco)'}`],
              ['δ̇(−α/2) / δ̇ max sull\'arco', fmt(Math.max(0, c.d(-alpha / 2)) / vmax, 3)],
              ['δ̇(+α/2) / δ̇ max sull\'arco', fmt(Math.max(0, c.d(alpha / 2)) / vmax, 3)],
              ['pressione (Reye)', staccato ? 'parte dell\'arco si stacca' : 'proporzionale al consumo'],
            ]}
          />
        </>
      }
      note="Tratteggio orizzontale: bisettrice dell'arco. Con C sotto O (γ = −90°, come O′ a p. 108) il massimo è sulla bisettrice e agli estremi vale cos(α/2): 0,71 per α = 90°. Spostando C il massimo si sposta: è perché la cerniera va sulla perpendicolare alla bisettrice (p. 123)."
    />
  );
}

// ------------------------------------------------------------------ due ceppi esterni (pp. 109–110)
function CeppiAnim() {
  const [verso, setVerso] = useState<'orario' | 'antiorario'>('orario');
  const [f, setF] = useState(0.35);
  const crank = useCrank(0.15);
  const geo = { F: 300, h: 0.3, d: 0.12, R: 0.15 };
  const r = ceppiEsterni({ ...geo, f, verso });
  const cx = 180, cy = 112, R = 62, oy = 228;
  const ang = (verso === 'orario' ? -1 : 1) * crank.theta;
  const Nref = Math.max(r.FNdx, Number.isFinite(r.FNsx) ? r.FNsx : r.FNdx, 1e-9);
  const len = (N: number) => (Number.isFinite(N) ? Math.min(70, (N / Nref) * 60) : 70);
  const sgnT = verso === 'orario' ? 1 : -1; // tamburo orario: in M destro il tamburo trascina il ceppo in basso
  const shoe = (side: 1 | -1) => {
    const N = side === 1 ? r.FNdx : r.FNsx, T = side === 1 ? r.FTdx : r.FTsx;
    const Mx = cx + side * R;
    const ln = len(N), lt = Number.isFinite(T) ? Math.min(60, (T / Nref) * 60) : 60;
    const av = r.avvolgente === (side === 1 ? 'dx' : 'sx');
    return (
      <g key={side}>
        <path d={side === 1 ? arcPath(cx, cy, R + 5, -0.7, 0.7) : arcPath(cx, cy, R + 5, Math.PI - 0.7, Math.PI + 0.7)} className={av ? 'dw-a' : 'dw-l'} strokeWidth={6} fill="none" />
        <line x1={cx + side * (R + 16)} y1={cy - 80} x2={cx + side * (R + 16)} y2={cy + 50} className="dw-l" strokeWidth={3} />
        <line x1={cx + side * (R + 16)} y1={cy + 50} x2={cx + side * 6} y2={oy - 3} className="dw-l" strokeWidth={3} />
        <line x1={cx + side * (R + 9) * Math.cos(0.5)} y1={cy - (R + 9) * Math.sin(0.5)} x2={cx + side * (R + 16)} y2={cy - (R + 9) * Math.sin(0.5)} className="dw-l" strokeWidth={2} />
        <line x1={cx + side * (R + 9) * Math.cos(0.5)} y1={cy + (R + 9) * Math.sin(0.5)} x2={cx + side * (R + 16)} y2={cy + (R + 9) * Math.sin(0.5)} className="dw-l" strokeWidth={2} />
        <Arrow x1={cx + side * (R + 60)} y1={cy - 80} x2={cx + side * (R + 18)} y2={cy - 80} c="f" />
        <Arrow x1={Mx} y1={cy} x2={Mx + side * ln} y2={cy} c="f" />
        <Arrow x1={Mx} y1={cy} x2={Mx} y2={cy + side * sgnT * lt} c="v" />
        <text x={cx + side * (R + 40)} y={20} textAnchor="middle" className={`dw-t ${av ? 'dw-ta' : 'dw-tm'}`}>{av ? 'avvolgente' : 'svolgente'}</text>
      </g>
    );
  };
  const svgEl = (
    <svg viewBox="0 0 360 250" className="dw" role="img" aria-label="Freno a due ceppi esterni">
      <circle cx={cx} cy={cy} r={R} className="dw-l" />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const [x, y] = P(cx, cy, R * 0.85, ang + (k * Math.PI) / 3);
        return <line key={k} x1={cx} y1={cy} x2={x} y2={y} className="dw-m" />;
      })}
      {shoe(1)}
      {shoe(-1)}
      <circle cx={cx} cy={oy} r={5} className="dw-fill" />
      <text x={cx + 10} y={oy + 4} className="dw-t dw-tl">O′</text>
      <text x={cx} y={cy + 5} textAnchor="middle" className="dw-t dw-tv">{verso === 'orario' ? '↻ ω' : '↺ ω'}</text>
      {r.bloccato ? <text x={cx} y={246} textAnchor="middle" className="dw-t dw-ta">autobloccaggio: f ≥ OO′/R</text> : null}
    </svg>
  );
  const v = (x: number) => (Number.isFinite(x) ? `${fmt(x, 3)} N` : '∞ (bloccato)');
  return (
    <Mech
      title="Ceppo avvolgente e svolgente: conta il verso dell'attrito"
      svg={svgEl}
      side={
        <>
          <Toggle value={verso} onChange={setVerso} label="verso del tamburo" options={[{ v: 'orario', t: 'ω oraria' }, { v: 'antiorario', t: 'ω antioraria' }]} />
          <Slider label="f" value={f} min={0.1} max={1} step={0.01} onChange={setF} />
          <Readout
            rows={[
              ['ceppo avvolgente (attrito con F)', r.avvolgente === 'dx' ? 'destro' : 'sinistro'],
              ['F_T destro', v(r.FTdx)],
              ['F_T sinistro', v(r.FTsx)],
              ['F_T,av / F_T,sv', Number.isFinite(r.rapporto) ? fmt(r.rapporto, 3) : '∞'],
              ['f limite = OO′/R', fmt(r.fLim, 3)],
            ]}
          />
        </>
      }
      note="F = 300 N, h = 0,3 m, OO′ = 0,12 m, R = 0,15 m. Frecce: forze del tamburo sul ceppo (normale e attrito), lunghezza proporzionale al modulo. La dispensa (pp. 109–110) chiama «svolgente» il ceppo avvolgente (NF-18)."
    />
  );
}

// ------------------------------------------------------------------ pattino rigido (pp. 114–115)
function PattinoAnim() {
  const [verso, setVerso] = useState<'contro' | 'aiuta'>('contro');
  const [s, setS] = useState(0.03);
  const [l, setL] = useState(0.15);
  const [f, setF] = useState(0.35);
  const crank = useCrank(0.3);
  const h = 0.12, Caz = 100, B = 0.05;
  const r = pattino({ s, l, B, f, h, Caz, verso });
  const altro = pattino({ s, l, B, f, h, Caz, verso: verso === 'contro' ? 'aiuta' : 'contro' });
  const sc = 1000, ox = 340, oy = 46, ny = 160;
  const X = (x: number) => ox - sc * x;
  const shift = ((crank.theta / (2 * Math.PI)) * 40 * (verso === 'contro' ? -1 : 1)) % 20;
  const kpx = 0.18;
  const svgEl = (
    <svg viewBox="0 0 380 250" className="dw" role="img" aria-label="Freno a pattino ad accostamento rigido">
      <line x1={10} y1={ny} x2={375} y2={ny} className="dw-l" strokeWidth={3} />
      {Array.from({ length: 20 }, (_, k) => {
        const x = 10 + ((k * 20 + shift + 400) % 400);
        return x < 370 ? <line key={k} x1={x} y1={ny + 4} x2={x + 8} y2={ny + 4} className="dw-m" /> : null;
      })}
      <Arrow x1={verso === 'contro' ? 90 : 30} y1={ny + 16} x2={verso === 'contro' ? 30 : 90} y2={ny + 16} c="v" />
      <text x={60} y={ny + 34} textAnchor="middle" className="dw-t dw-tv">V nastro</text>
      <line x1={ox} y1={oy} x2={ox} y2={ny} className="dw-d" />
      <circle cx={ox} cy={oy} r={5} className="dw-fill" />
      <text x={ox + 8} y={oy - 6} className="dw-t dw-tl">O</text>
      <text x={ox + 6} y={ny + 16} className="dw-t dw-tl">O*</text>
      <rect x={X(s + l)} y={ny - 16} width={sc * l} height={16} className="dw-soft" />
      <rect x={X(s + l)} y={ny - 16} width={sc * l} height={16} className="dw-l" />
      <line x1={ox} y1={oy} x2={X(s) - 4} y2={ny - 16} className="dw-l" strokeWidth={3} />
      <line x1={ox} y1={oy} x2={X(s + l) + 20} y2={ny - 16} className="dw-l" strokeWidth={3} />
      <polygon points={`${X(s)},${ny + 30} ${X(s)},${ny + 30 + kpx * sc * s} ${X(s + l)},${ny + 30 + kpx * sc * (s + l)} ${X(s + l)},${ny + 30}`} className="dw-soft" />
      <polygon points={`${X(s)},${ny + 30} ${X(s)},${ny + 30 + kpx * sc * s} ${X(s + l)},${ny + 30 + kpx * sc * (s + l)} ${X(s + l)},${ny + 30}`} className="dw-a" fill="none" />
      <line x1={X(r.centro)} y1={ny - 26} x2={X(r.centro)} y2={ny + 34 + kpx * sc * r.centro} className="dw-d" />
      <line x1={X(r.x0)} y1={ny + 28} x2={X(r.x0)} y2={ny + 34 + kpx * sc * r.x0} className="dw-a" />
      <Arrow x1={X(r.x0)} y1={ny + 28} x2={X(r.x0)} y2={ny + 2} c="f" />
      <text x={X(r.x0) + 6} y={ny + 22} className="dw-t dw-tf">F_N (x₀)</text>
      <text x={X(r.centro)} y={ny - 30} textAnchor="middle" className="dw-t dw-tm">s + l/2</text>
      {r.bloccato ? <text x={190} y={24} textAnchor="middle" className="dw-t dw-ta">freno di sicurezza: si impunta (x₀/f ≤ h)</text> : null}
    </svg>
  );
  return (
    <Mech
      title="Freno a pattino: pressione lineare e verso del nastro"
      svg={svgEl}
      side={
        <>
          <Toggle value={verso} onChange={setVerso} label="verso del nastro" options={[{ v: 'contro', t: 'via da O* (figura)' }, { v: 'aiuta', t: 'verso O*' }]} />
          <Slider label="s" value={s} min={0.005} max={0.08} step={0.005} onChange={setS} unit="m" />
          <Slider label="l" value={l} min={0.04} max={0.2} step={0.005} onChange={setL} unit="m" />
          <Slider label="f" value={f} min={0.1} max={0.9} step={0.01} onChange={setF} />
          <Readout
            rows={[
              ['x₀ (Varignon)', `${fmt(r.x0 * 100, 4)} cm`],
              ['centro s + l/2', `${fmt(r.centro * 100, 4)} cm`],
              ['x₀/f  confronto con h', `${fmt(r.x0 / f, 3)} m  /  ${fmt(h, 2)} m`],
              ['F_T = C_az/(x₀/f ± h)', r.bloccato ? '∞ (impuntamento)' : `${fmt(r.FT, 3)} N`],
              ['F_T nell\'altro verso', altro.bloccato ? '∞ (impuntamento)' : `${fmt(altro.FT, 3)} N`],
            ]}
          />
        </>
      }
      note="C_az = 100 N·m, h = 0,12 m. La pressione cresce con la distanza da O*: la risultante cade oltre il centro del pattino. Con il nastro verso O* l'attrito aiuta la coppia (segno «−»)."
    />
  );
}

// ------------------------------------------------------------------ disco e frizione: Reye contro pressione uniforme
function DiscoAnim({ params }: { params?: Record<string, number | string> }) {
  const a0 = typeof params?.alpha === 'number' ? params.alpha : 60;
  const [alphaDeg, setAlpha] = useState(a0);
  const [rapp, setRapp] = useState(0.5);
  const [legge, setLegge] = useState<Legge>('usura');
  const re = 0.12, ri = rapp * re, f = 0.35, FN = 3000;
  const alpha = Math.min(alphaDeg, 359.999) * RAD;
  const p = { ri, re, alpha, f, FN };
  const r = discoSettore({ ...p, legge });
  const u = discoSettore({ ...p, legge: 'usura' }), q = discoSettore({ ...p, legge: 'uniforme' });
  const rm = (re + ri) / 2;
  const cx = 110, cy = 125, sc = 800;
  const Rd = sc * 0.135;
  const full = alphaDeg >= 360;
  const sector = full
    ? `M${cx + sc * re},${cy} A${sc * re},${sc * re} 0 1 0 ${cx - sc * re},${cy} A${sc * re},${sc * re} 0 1 0 ${cx + sc * re},${cy} M${cx + sc * ri},${cy} A${sc * ri},${sc * ri} 0 1 1 ${cx - sc * ri},${cy} A${sc * ri},${sc * ri} 0 1 1 ${cx + sc * ri},${cy}`
    : (() => {
        const [x1, y1] = P(cx, cy, sc * ri, Math.PI / 2 - alpha / 2), [x2, y2] = P(cx, cy, sc * re, Math.PI / 2 - alpha / 2);
        const [x3, y3] = P(cx, cy, sc * re, Math.PI / 2 + alpha / 2), [x4, y4] = P(cx, cy, sc * ri, Math.PI / 2 + alpha / 2);
        const big = alpha > Math.PI ? 1 : 0;
        return `M${x1},${y1} L${x2},${y2} A${sc * re},${sc * re} 0 ${big} 0 ${x3},${y3} L${x4},${y4} A${sc * ri},${sc * ri} 0 ${big} 1 ${x1},${y1} Z`;
      })();
  // grafico p(r)
  const gx0 = 240, gx1 = 370, gy0 = 210, gy1 = 50;
  const pmax = Math.max(u.pr(ri), q.pr(ri)) * 1.1;
  const GX = (rr: number) => gx0 + ((rr - ri) / (re - ri)) * (gx1 - gx0);
  const GY = (pp: number) => gy0 - (pp / pmax) * (gy0 - gy1);
  const curve = (fn: (x: number) => number) => Array.from({ length: 31 }, (_, k) => ri + ((re - ri) * k) / 30).map((x) => `${GX(x)},${GY(fn(x))}`).join(' ');
  const finite = Number.isFinite(r.bt) && r.bt < 1;
  const svgEl = (
    <svg viewBox="0 0 380 240" className="dw" role="img" aria-label="Pattino del freno a disco e distribuzione di pressione">
      <circle cx={cx} cy={cy} r={Rd} className="dw-l" />
      <path d={sector} className="dw-soft" fillRule="evenodd" />
      <path d={sector} className="dw-a" fill="none" />
      <circle cx={cx} cy={cy} r={sc * rm} className="dw-d" fill="none" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - Rd - 6} className="dw-d" />
      <circle cx={cx} cy={cy - sc * r.bm} r={4} className="dw-dot dw-dotl" />
      <text x={cx + 8} y={cy - sc * r.bm + 4} className="dw-t dw-tm">b_m</text>
      {finite ? (
        <>
          <circle cx={cx} cy={cy - sc * r.bt} r={4} className="dw-dot dw-dota" />
          <text x={cx - 8} y={cy - sc * r.bt + 4} textAnchor="end" className="dw-t dw-ta">b_t</text>
        </>
      ) : null}
      <circle cx={cx} cy={cy} r={3} className="dw-fill" />
      <line x1={gx0} y1={gy0} x2={gx1 + 6} y2={gy0} className="dw-m" />
      <line x1={gx0} y1={gy0} x2={gx0} y2={gy1 - 10} className="dw-m" />
      <text x={gx1 + 4} y={gy0 + 16} className="dw-t dw-tm">r</text>
      <text x={gx0 - 4} y={gy1 - 14} className="dw-t dw-tm">p</text>
      <text x={gx0} y={gy0 + 16} textAnchor="middle" className="dw-t dw-tm">r_i</text>
      <text x={gx1} y={gy0 + 16} textAnchor="middle" className="dw-t dw-tm">r_e</text>
      <polyline points={curve(u.pr)} className={legge === 'usura' ? 'dw-a' : 'dw-d'} fill="none" strokeWidth={legge === 'usura' ? 3 : 1.5} />
      <polyline points={curve(q.pr)} className={legge === 'uniforme' ? 'dw-a' : 'dw-d'} fill="none" strokeWidth={legge === 'uniforme' ? 3 : 1.5} />
      <text x={gx0 + 6} y={GY(u.pr(ri)) - 6} className="dw-t dw-tm">K″/r</text>
      <text x={gx1 - 4} y={GY(q.pr(re)) - 6} textAnchor="end" className="dw-t dw-tm">p₀</text>
    </svg>
  );
  return (
    <Mech
      title="Freno a disco e frizione: usura uniforme (Reye) o pressione uniforme"
      svg={svgEl}
      side={
        <>
          <Toggle value={legge} onChange={setLegge} label="legge di pressione" options={[{ v: 'usura', t: 'usura uniforme (Reye)' }, { v: 'uniforme', t: 'pressione uniforme' }]} />
          <Slider label="α" value={alphaDeg} min={10} max={360} step={5} onChange={setAlpha} unit="°" />
          <Slider label="r_i / r_e" value={rapp} min={0.2} max={0.9} step={0.05} onChange={setRapp} />
          <Readout
            rows={[
              ['R_m = M_f/(f F_N)', `${fmt(r.Rm * 1000, 4)} mm`],
              ['r_m = (r_e + r_i)/2', `${fmt(rm * 1000, 4)} mm`],
              ['|F_T| / (f F_N)', fmt(r.FT / (f * FN), 3)],
              ['b_t (braccio di F_T)', finite ? `${fmt(r.bt * 1000, 4)} mm` : '∞ (coppia pura)'],
              ['b_m (punto di F_N)', `${fmt(r.bm * 1000, 4)} mm`],
            ]}
          />
        </>
      }
      note="F_N = 3000 N, f = 0,35, r_e = 120 mm. Con α = 360° è la frizione piana: la risultante tangenziale si annulla e resta una coppia pura. La pressione uniforme non è nella dispensa."
    />
  );
}

// ------------------------------------------------------------------ partitore di frenata (deduzione da p. 92)
function PartitoreAnim() {
  const geo = { M: 1200, g: 9.81, l1: 1.2, l2: 1.5, h: 0.55, f: 0.8 };
  const [ag, setAg] = useState(0.5);
  const [beta, setBeta] = useState(0.6);
  const r = partitore({ ...geo, a: ag * geo.g, beta });
  const Mg = geo.M * geo.g;
  const yg = 170, xA = 70, xB = 245, xG = 70 + (175 * geo.l1) / (geo.l1 + geo.l2);
  const bar = (u: number, x: number, label: string) => {
    const H = 120, hb = Math.min(1.25, u / geo.f) * H * 0.8;
    return (
      <g>
        <rect x={x} y={yg + 40 - H} width={22} height={H} className="dw-soft" />
        <rect x={x} y={yg + 40 - hb} width={22} height={hb} className={u >= geo.f - 1e-9 ? 'dw-a' : 'dw-l'} />
        <text x={x + 11} y={yg + 56} textAnchor="middle" className="dw-t dw-tm">{label}</text>
      </g>
    );
  };
  const svgEl = (
    <svg viewBox="0 0 380 240" className="dw" role="img" aria-label="Veicolo in frenata e aderenza utilizzata dagli assi">
      <line x1={10} y1={yg} x2={290} y2={yg} className="dw-g" />
      <polygon points={`30,${yg - 26} 34,${yg - 58} 80,${yg - 66} 110,${yg - 98} 210,${yg - 100} 250,${yg - 64} 278,${yg - 58} 280,${yg - 26}`} className="dw-l" fill="none" />
      <circle cx={xA} cy={yg - 20} r={20} className="dw-l" />
      <circle cx={xB} cy={yg - 20} r={20} className="dw-l" />
      <circle cx={xG} cy={yg - 80} r={4} className="dw-dot dw-dota" />
      <Arrow x1={xG} y1={yg - 80} x2={xG - 20 - 50 * ag} y2={yg - 80} c="f" />
      <text x={xG - 30} y={yg - 90} className="dw-t dw-tf">Ma</text>
      <Arrow x1={xA} y1={yg} x2={xA} y2={yg - (r.NA / Mg) * 140} c="f" />
      <Arrow x1={xB} y1={yg} x2={xB} y2={yg - Math.max(0, r.NB / Mg) * 140} c="f" />
      <text x={xA + 6} y={yg - (r.NA / Mg) * 140} className="dw-t dw-tf">N_A</text>
      <text x={xB + 6} y={yg - Math.max(0, r.NB / Mg) * 140} className="dw-t dw-tf">N_B</text>
      <text x={150} y={20} textAnchor="middle" className="dw-t dw-tv">← V</text>
      {bar(r.uA, 310, 'ant.')}
      {bar(r.uB, 345, 'post.')}
      <line x1={304} y1={yg + 40 - 120 * 0.8} x2={372} y2={yg + 40 - 120 * 0.8} className="dw-a" strokeDasharray="4 3" />
      <text x={338} y={yg + 40 - 120 * 0.8 - 6} textAnchor="middle" className="dw-t dw-ta">f_ad</text>
    </svg>
  );
  const pct = (x: number) => `${fmt(100 * x, 3)} %`;
  return (
    <Mech
      title="Partitore di frenata: il carico va avanti, la frenata deve seguirlo"
      svg={svgEl}
      side={
        <>
          <Slider label="decelerazione a/g" value={ag} min={0} max={geo.f} step={0.01} onChange={setAg} />
          <Slider label="β (frazione di frenata davanti)" value={beta} min={0.3} max={0.9} step={0.01} onChange={setBeta} />
          <Readout
            rows={[
              ['N_A / Mg,  N_B / Mg', `${pct(r.NA / Mg)}  /  ${pct(r.NB / Mg)}`],
              ['β ideale a questa decelerazione', fmt(r.betaIdeale, 3)],
              ['β* (a = f_ad g)', fmt(r.betaStar, 3)],
              ['aderenza usata ant. / post.', `${fmt(r.uA, 3)}  /  ${fmt(r.uB, 3)}`],
              ['bloccano prima', r.primo === 'insieme' ? 'insieme' : `le ${r.primo === 'anteriore' ? 'anteriori' : 'posteriori'} (a = ${fmt(r.aLim / geo.g, 3)} g)`],
            ]}
          />
        </>
      }
      note="M = 1200 kg, l₁ = 1,2 m, l₂ = 1,5 m, h = 0,55 m, f_ad = 0,8. Barre: F_T/F_N di ciascun asse con la ripartizione fissa β; un asse blocca quando la sua barra tocca f_ad. Non è nella dispensa: deduzione da p. 92."
    />
  );
}

export const MECCANISMI_C3: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c3-ceppo-consumo': CeppoConsumoAnim,
  'c3-ceppi': CeppiAnim,
  'c3-pattino': PattinoAnim,
  'c3-disco': DiscoAnim,
  'c3-partitore': PartitoreAnim,
};
