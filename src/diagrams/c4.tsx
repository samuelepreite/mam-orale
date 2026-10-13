/** Meccanismi animati del capitolo C4 (trasmissioni a cinghia). Cinematica e statica in src/engine/c4.ts. */
import { useState, type ComponentType } from 'react';
import { arcoAvvolto, avvolgimento, coppiaDaAttrito, frenoNastro, potenzaCinghia, trasmissioneReale } from '../engine/c4';
import { fmt } from '../engine/num';
import { Arrow, Mech, PlayBtn, Readout, Slider, Toggle, useClock, useCrank } from './anim';

/** Freno a nastro (p. 153): verso di rotazione, f e β; la leva fissa sempre il capo che le è collegato. */
function FrenoNastroAnim() {
  const [verso, setVerso] = useState<'orario' | 'antiorario'>('orario');
  const [f, setF] = useState(0.3);
  const [betaDeg, setBetaDeg] = useState(270);
  const crank = useCrank(0.15);
  const p = { F: 100, a: 0.5, c: 0.1, R: 0.15, f, beta: (betaDeg * Math.PI) / 180 };
  const r = frenoNastro({ ...p, verso });
  const altro = frenoNastro({ ...p, verso: verso === 'orario' ? 'antiorario' : 'orario' });
  const cx = 150, cy = 110, R = 60;
  const ang = (verso === 'orario' ? -1 : 1) * crank.theta;
  // capi: sinistro al fulcro, destro alla leva; spessore ∝ tensione
  const Tmax = Math.max(r.T1, r.T2);
  const wL = 2 + 8 * ((verso === 'orario' ? r.T1 : r.T2) / Tmax);
  const wR = 2 + 8 * ((verso === 'orario' ? r.T2 : r.T1) / Tmax);
  const svgEl = (
    <svg viewBox="0 0 320 260" className="dw" role="img" aria-label="Freno a nastro animato">
      <circle cx={cx} cy={cy} r={R} className="dw-l" />
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const a = ang + (k * Math.PI) / 3;
        return <line key={k} x1={cx} y1={cy} x2={cx + R * 0.85 * Math.cos(a)} y2={cy + R * 0.85 * Math.sin(a)} className="dw-m" />;
      })}
      <path d={`M${cx - R - 4},${cy + 10} A${R + 4},${R + 4} 0 1 1 ${cx + R + 4},${cy + 10}`} className="dw-a" strokeWidth={3} />
      <line x1={cx - R - 4} y1={cy + 10} x2={110} y2={215} className="dw-a" strokeWidth={wL} />
      <line x1={cx + R + 4} y1={cy + 10} x2={190} y2={215} className="dw-a" strokeWidth={wR} />
      <line x1={110} y1={215} x2={300} y2={215} className="dw-l" strokeWidth={4} />
      <circle cx={110} cy={215} r={5} className="dw-fill" />
      <Arrow x1={300} y1={212} x2={300} y2={250} />
      <text x={288} y={248} textAnchor="end" className="dw-t dw-tf">F</text>
      <text x={80} y={175} className="dw-t dw-tf">{verso === 'orario' ? 'T₁ teso' : 'T₂ lasco'}</text>
      <text x={232} y={175} className="dw-t dw-tf">{verso === 'orario' ? 'T₂ lasco' : 'T₁ teso'}</text>
      <text x={cx} y={cy + 4} textAnchor="middle" className="dw-t dw-tv">{verso === 'orario' ? '↻ ω' : '↺ ω'}</text>
    </svg>
  );
  return (
    <Mech
      title="Freno a nastro: il capo sulla leva deve essere il lasco"
      svg={svgEl}
      side={
        <>
          <Toggle value={verso} onChange={setVerso} label="verso di rotazione" options={[{ v: 'orario', t: 'ω oraria' }, { v: 'antiorario', t: 'ω antioraria' }]} />
          <Slider label="f" value={f} min={0.1} max={0.5} step={0.01} onChange={setF} />
          <Slider label="β" value={betaDeg} min={90} max={360} step={5} onChange={setBetaDeg} unit="°" />
          <Readout
            rows={[
              ['capo sulla leva', r.tesoSullaLeva ? 'teso (T₁ = F a/c)' : 'lasco (T₂ = F a/c)'],
              ['T₁ / T₂ = e^{fβ}', fmt(r.E, 3)],
              ['C_f con F = 100 N', `${fmt(r.Cf, 3)} N·m`],
              ['C_f nell\'altro verso', `${fmt(altro.Cf, 3)} N·m`],
            ]}
          />
        </>
      }
      note="Spessore dei capi proporzionale alla tensione. Dati fissi: F = 100 N, a = 0,5 m, c = 0,1 m, R = 0,15 m."
    />
  );
}

/** punto su una circonferenza, angolo matematico in gradi (0° a destra, antiorario), y dello schermo verso il basso */
const P = (cx: number, cy: number, r: number, deg: number): [number, number] => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
const d2 = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');

/**
 * Tensione lungo l'arco avvolto sulla motrice (pp. 141–144): aderenza a tensione costante all'ingresso, scorrimento
 * esponenziale verso l'uscita, centrifuga che abbassa la pressione. T₂ fissata dal tenditore (100 N), R = 0,1 m.
 */
function TensioneArcoAnim() {
  const T2 = 100, R = 0.1;
  const [C, setC] = useState(8);
  const [rv, setRv] = useState(10);
  const [f, setF] = useState(0.3);
  const [bDeg, setBDeg] = useState(180);
  const clock = useClock();
  const beta = (bDeg * Math.PI) / 180;
  const s = arcoAvvolto({ T2, rhoV2: rv, f, beta, C, R });
  const Cattr = coppiaDaAttrito(s, f, R);
  // puleggia: avvolgimento simmetrico rispetto a 180°, P₁ ingresso in alto, Q₁ uscita in basso; θ dall'uscita
  const cx = 104, cy = 100, Rp = 58, Lb = 170;
  const phP = 180 - bDeg / 2, phQ = 180 + bDeg / 2;
  const Tref = Math.max(s.T1, T2) * 1.02;
  const wOf = (T: number) => 1.5 + 8 * (T / Tref);
  const N = 60;
  const segs = Array.from({ length: N }, (_, i) => {
    const a0 = phP + ((phQ - phP) * i) / N, a1 = phP + ((phQ - phP) * (i + 1)) / N;
    const th = ((phQ - (a0 + a1) / 2) * Math.PI) / 180; // θ misurato dall'uscita
    const [x0, y0] = P(cx, cy, Rp + 4, a0), [x1, y1] = P(cx, cy, Rp + 4, a1);
    return { x0, y0, x1, y1, th, T: s.T(th), slip: th <= s.thetaS };
  });
  const [pX, pY] = P(cx, cy, Rp + 4, phP), [qX, qY] = P(cx, cy, Rp + 4, phQ);
  const tP: [number, number] = [Math.sin((phP * Math.PI) / 180), Math.cos((phP * Math.PI) / 180)]; // direzione del ramo teso (schermo)
  const tQ: [number, number] = [-Math.sin((phQ * Math.PI) / 180), -Math.cos((phQ * Math.PI) / 180)];
  const [sX, sY] = P(cx, cy, Rp + 16, phQ - (s.thetaS * 180) / Math.PI);
  // elementi materiali che scorrono: ramo teso → arco → ramo lasco
  const Larc = (Rp + 4) * beta, Ltot = 2 * Lb + Larc;
  const dots = Array.from({ length: 14 }, (_, i) => {
    const u = (((clock.t * 40 + (i * Ltot) / 14) % Ltot) + Ltot) % Ltot;
    if (u < Lb) return [pX + tP[0] * (Lb - u), pY + tP[1] * (Lb - u)];
    if (u < Lb + Larc) return P(cx, cy, Rp + 4, phP + (((u - Lb) / Larc) * bDeg));
    const w = u - Lb - Larc;
    return [qX + tQ[0] * w, qY + tQ[1] * w];
  });
  // grafico T(θ)
  const gx = 40, gy = 318, GW = 270, GH = 110, Tmax = Math.max(s.T1, T2) * 1.15;
  const X = (th: number) => gx + (th / beta) * GW, Y = (T: number) => gy - (T / Tmax) * GH;
  const curva = Array.from({ length: 81 }, (_, i) => { const th = (beta * i) / 80; return [X(th), Y(s.T(th))] as [number, number]; });
  const svgEl = (
    <svg viewBox="0 0 340 340" className="dw" role="img" aria-label="Tensione lungo l'arco avvolto: aderenza e scorrimento">
      <circle cx={cx} cy={cy} r={Rp} className="dw-l" />
      <circle cx={cx} cy={cy} r={3} className="dw-dot dw-dotl" />
      <line x1={pX} y1={pY} x2={pX + tP[0] * Lb} y2={pY + tP[1] * Lb} className="dw-a" strokeWidth={wOf(s.T1)} />
      <line x1={qX} y1={qY} x2={qX + tQ[0] * Lb} y2={qY + tQ[1] * Lb} className="dw-a" strokeWidth={wOf(T2)} />
      {segs.map((g, i) => (
        <line key={i} x1={g.x0} y1={g.y0} x2={g.x1} y2={g.y1} className={g.slip ? 'dw-a' : 'dw-v'} strokeWidth={wOf(g.T)} />
      ))}
      {segs.filter((_, i) => i % 5 === 2).map((g, i) => {
        const a = phQ - (g.th * 180) / Math.PI, len = 4 + 26 * (s.pN(g.th) / Tref);
        const [x0, y0] = P(cx, cy, Rp - 2, a), [x1, y1] = P(cx, cy, Rp - 2 - len, a);
        return <line key={`n${i}`} x1={x0} y1={y0} x2={x1} y2={y1} className="dw-f" strokeWidth={1.5} />;
      })}
      {dots.map(([x, y], i) => <circle key={`d${i}`} cx={x} cy={y} r={2.2} className="dw-fill" />)}
      {!s.slitta && s.thetaS > 0.01 && <circle cx={sX} cy={sY} r={3.5} className="dw-dot dw-dota" />}
      {!s.slitta && s.thetaS > 0.01 && <text x={sX - 6} y={sY} textAnchor="end" className="dw-t dw-ta">S₁</text>}
      <text x={pX - 4} y={pY - 10} textAnchor="end" className="dw-t dw-tl">P₁</text>
      <text x={qX - 4} y={qY + 16} textAnchor="end" className="dw-t dw-tl">Q₁</text>
      <text x={pX + tP[0] * Lb} y={pY + tP[1] * Lb - 10} textAnchor="end" className="dw-t dw-tf">T₁ = {fmt(s.T1, 3)} N</text>
      <text x={qX + tQ[0] * Lb} y={qY + tQ[1] * Lb + 18} textAnchor="end" className="dw-t dw-tf">T₂ = {T2} N</text>
      <text x={cx} y={cy + 4} textAnchor="middle" className="dw-t dw-tv">↺ ω₁</text>
      {/* grafico */}
      <line x1={gx} y1={gy} x2={gx + GW + 8} y2={gy} className="dw-l" />
      <line x1={gx} y1={gy} x2={gx} y2={gy - GH - 8} className="dw-l" />
      <text x={gx + GW + 6} y={gy - GH - 10} textAnchor="end" className="dw-t dw-tm">θ dall&apos;uscita Q₁ →</text>
      <text x={gx - 4} y={gy - GH - 10} textAnchor="start" className="dw-t dw-tm">T(θ)</text>
      {rv > 0 && <line x1={gx} y1={Y(rv)} x2={gx + GW} y2={Y(rv)} className="dw-d" />}
      {rv > 0 && <text x={gx + GW} y={Y(rv) - 4} textAnchor="end" className="dw-t dw-tm">ρV²</text>}
      {!s.slitta && <line x1={X(s.thetaS)} y1={gy} x2={X(s.thetaS)} y2={gy - GH} className="dw-d" />}
      <path d={d2(curva)} className="dw-a" strokeWidth={2.5} />
      <text x={X(Math.min(s.thetaS, beta) / 2)} y={gy + 14} textAnchor="middle" className="dw-t dw-ta">θ*</text>
      {!s.slitta && s.alfa > 0.15 && <text x={X((s.thetaS + beta) / 2)} y={gy + 14} textAnchor="middle" className="dw-t dw-tv">α₁</text>}
      {s.slitta && <text x={gx + GW / 2} y={gy - GH + 4} textAnchor="middle" className="dw-t dw-ta">slittamento globale: C &gt; C_MAX</text>}
    </svg>
  );
  return (
    <Mech
      title="Tensione lungo l'arco: costante dove aderisce, esponenziale dove striscia"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="coppia C" value={C} min={0} max={40} step={0.5} onChange={setC} unit="N·m" />
          <Slider label="centrifuga ρV²" value={rv} min={0} max={60} step={1} onChange={setRv} unit="N" />
          <Slider label="f" value={f} min={0.1} max={0.5} step={0.01} onChange={setF} />
          <Slider label="β" value={bDeg} min={120} max={240} step={5} onChange={setBDeg} unit="°" />
          <Readout
            rows={[
              ['T₁ = T₂ + C/R', `${fmt(s.T1, 4)} N`],
              ['θ* (scorrimento)', s.slitta ? `= β: slitta` : `${fmt((s.thetaS * 180) / Math.PI, 3)}°`],
              ['α₁ = β − θ* (aderenza)', `${fmt(Math.max(0, (s.alfa * 180) / Math.PI), 3)}°`],
              ['C_MAX = (T₂ − ρV²)(e^{fβ} − 1)R', `${fmt(s.Cmax, 3)} N·m`],
              ['R ∫ f dF_N (coppia dell\'attrito)', `${fmt(Cattr, 4)} N·m`],
            ]}
          />
        </>
      }
      note="Spessore della cinghia proporzionale alla tensione; trattini interni proporzionali alla pressione dF_N/dθ = T − ρV². Verde: aderenza; accento: scorrimento. T₂ = 100 N, R = 0,1 m."
    />
  );
}

/** Potenza trasmissibile in funzione di V (p. 152) con la velocità ottima; variante delle domande con T₁ fissata. */
function PotenzaVAnim() {
  const rho = 0.3, f = 0.3;
  const [modello, setModello] = useState<'dispensa' | 'variante'>('dispensa');
  const [T, setT] = useState(300);
  const [bDeg, setBDeg] = useState(180);
  const [V, setV] = useState(12);
  const clock = useClock();
  const beta = (bDeg * Math.PI) / 180;
  const base = { modello, T, rho, f, beta };
  const ref = potenzaCinghia({ ...base, T: 600, V: 0 }); // scala fissa rispetto a T: si vede come crescono V* e W^MAX
  const o0 = potenzaCinghia({ ...base, V: 0 });
  const Vc = clock.play ? o0.Vzero * (0.5 - 0.5 * Math.cos(clock.t * 0.5)) : Math.min(V, o0.Vzero);
  const o = potenzaCinghia({ ...base, V: Vc });
  const x0 = 46, y0 = 205, GW = 270, GH = 170, Vmax = ref.Vzero, Wtop = ref.Wmax * 1.08;
  const X = (v: number) => x0 + (v / Vmax) * GW, Y = (w: number) => y0 - (w / Wtop) * GH;
  const curva = Array.from({ length: 101 }, (_, i) => { const v = (o0.Vzero * i) / 100; return [X(v), Y(potenzaCinghia({ ...base, V: v }).W)] as [number, number]; });
  const svgEl = (
    <svg viewBox="0 0 340 240" className="dw" role="img" aria-label="Potenza trasmissibile in funzione della velocità della cinghia">
      <Arrow x1={x0} y1={y0} x2={x0 + GW + 14} y2={y0} c="l" w={1.5} size={7} />
      <Arrow x1={x0} y1={y0} x2={x0} y2={y0 - GH - 14} c="l" w={1.5} size={7} />
      <text x={x0 + GW + 12} y={y0 + 16} textAnchor="end" className="dw-t dw-tl">V</text>
      <text x={x0 + 6} y={y0 - GH - 10} className="dw-t dw-tl">W</text>
      <path d={d2(curva)} className="dw-a" strokeWidth={2.5} />
      <line x1={X(o.Vopt)} y1={y0} x2={X(o.Vopt)} y2={Y(o.Wmax)} className="dw-d" />
      <line x1={x0} y1={Y(o.Wmax)} x2={X(o.Vopt)} y2={Y(o.Wmax)} className="dw-d" />
      <text x={X(o.Vopt)} y={y0 + 15} textAnchor="middle" className="dw-t dw-ta">V*</text>
      <text x={X(o.Vzero)} y={y0 + 15} textAnchor="middle" className="dw-t dw-tm">√3 V*</text>
      <circle cx={X(o.Vzero)} cy={y0} r={3} className="dw-dot dw-dotl" />
      <line x1={X(Vc)} y1={y0} x2={X(Vc)} y2={Y(o.W)} className="dw-v" strokeWidth={1.5} />
      <circle cx={X(Vc)} cy={Y(o.W)} r={5} className="dw-dot dw-dota" />
      <text x={x0 + GW} y={y0 - GH + 4} textAnchor="end" className="dw-t dw-tm">
        {modello === 'dispensa' ? 'T₂ fissata (dispensa)' : 'T₁ = T_max (variante)'}
      </text>
    </svg>
  );
  return (
    <Mech
      title="Potenza in funzione della velocità: il massimo è dove ρV² vale un terzo della tensione fissata"
      svg={svgEl}
      side={
        <>
          <Toggle value={modello} onChange={setModello} label="modello" options={[{ v: 'dispensa', t: 'T₂ fissata (D)' }, { v: 'variante', t: 'T₁ = T_max' }]} />
          <PlayBtn clock={clock} />
          <Slider label="V" value={Math.round(Vc * 10) / 10} min={0} max={Math.floor(o0.Vzero * 10) / 10} step={0.1} onChange={(x) => { clock.setPlay(false); setV(x); }} unit="m/s" />
          <Slider label={modello === 'dispensa' ? 'T₂ (tenditore)' : 'T_max'} value={T} min={100} max={600} step={10} onChange={setT} unit="N" />
          <Slider label="β" value={bDeg} min={120} max={240} step={5} onChange={setBDeg} unit="°" />
          <Readout
            rows={[
              ['W', `${fmt(o.W / 1000, 3)} kW`],
              ['ρV²', `${fmt(o.rhoV2, 3)} N`],
              ['T₁ / T₂', `${fmt(o.T1, 4)} / ${fmt(o.T2, 4)} N`],
              ['V* = √(T/3ρ)', `${fmt(o.Vopt, 3)} m/s`],
              ['W^MAX', `${fmt(o.Wmax / 1000, 3)} kW`],
              ['ρV*²', `${fmt(rho * o.Vopt * o.Vopt, 4)} N = ${modello === 'dispensa' ? 'T₂' : 'T_max'}/3`],
              ['potenza nulla a √(T/ρ)', `${fmt(o.Vzero, 3)} m/s`],
            ]}
          />
        </>
      }
      note="ρ = 0,3 kg/m, f = 0,3. Scala fissa: si vede come crescono V* e W^MAX con la tensione fissata. Il modello della dispensa è T₂ fissata dal tenditore (p. 152); la variante con T₁ = T_max è quella delle domande (NF-22)."
    />
  );
}

/** Scorrimento elastico (pp. 135–139): la condotta perde giri rispetto all'ideale; η = τ/τ^ID = V₂/V₁. */
function CreepAnim() {
  const R1 = 0.08, R2 = 0.16, T2 = 150, omega1 = 150;
  const [C1, setC1] = useState(15);
  const [EAk, setEAk] = useState(5);
  const clock = useClock();
  const r = trasmissioneReale({ R1, R2, EA: EAk * 1000, T2, C1, omega1 });
  // disegno: due pulegge, cinghia aperta (scala 500 px/m)
  const k = 500, x1 = 70, x2 = 250, y = 100, r1 = R1 * k, r2 = R2 * k;
  const g = avvolgimento({ R1: r1, R2: r2, a: x2 - x1, tipo: 'aperta' });
  const ph = (g.phi1 * 180) / Math.PI;
  const [p1x, p1y] = P(x1, y, r1, ph), [q1x, q1y] = P(x1, y, r1, -ph), [p2x, p2y] = P(x2, y, r2, ph), [q2x, q2y] = P(x2, y, r2, -ph);
  const Tm = Math.max(r.T1, T2);
  const w = (T: number) => 1.5 + 7 * (T / Tm);
  // rotazione mostrata: 0,4 giri/s per la motrice; condotta reale (τ) e ideale (τ^ID, tratteggio)
  const a1 = clock.t * 0.4 * 360, a2 = a1 * r.tau, a2id = a1 * r.tauId;
  const spoke = (cx: number, rr: number, a: number, cls: string, key: string) => {
    const [x, yy] = P(cx, y, rr * 0.9, a);
    return <line key={key} x1={cx} y1={y} x2={x} y2={yy} className={cls} strokeWidth={2.5} />;
  };
  const arcoD = (cx: number, rr: number, a0: number, a1: number) => {
    const [xa, ya] = P(cx, y, rr, a0), [xb, yb] = P(cx, y, rr, a1);
    return `M${xa},${ya} A${rr},${rr} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${xb},${yb}`;
  };
  const my1 = (p1y + p2y) / 2, my2 = (q1y + q2y) / 2;
  const half = (x: number) => Math.min(70, 18 + 300 * (x - 1)); // semilunghezza delle frecce: differenza di velocità esagerata
  const svgEl = (
    <svg viewBox="0 0 340 220" className="dw" role="img" aria-label="Scorrimento elastico: la condotta resta indietro rispetto all'ideale">
      <circle cx={x1} cy={y} r={r1} className="dw-l" />
      <circle cx={x2} cy={y} r={r2} className="dw-l" />
      <path d={arcoD(x1, r1 + 2, ph, 360 - ph)} className="dw-a" strokeWidth={2} />
      <path d={arcoD(x2, r2 + 2, -ph, ph)} className="dw-a" strokeWidth={2} />
      <line x1={p1x} y1={p1y} x2={p2x} y2={p2y} className="dw-a" strokeWidth={w(r.T1)} />
      <line x1={q1x} y1={q1y} x2={q2x} y2={q2y} className="dw-a" strokeWidth={w(T2)} />
      {spoke(x1, r1, a1, 'dw-v', 's1')}
      {spoke(x2, r2, a2id, 'dw-d', 's2i')}
      {spoke(x2, r2, a2, 'dw-v', 's2')}
      <Arrow x1={(p1x + p2x) / 2 + half(r.V1 / r.V0)} y1={my1 - 18} x2={(p1x + p2x) / 2 - half(r.V1 / r.V0)} y2={my1 - 18} c="v" w={2} size={8} />
      <Arrow x1={(q1x + q2x) / 2 - half(r.V2 / r.V0)} y1={my2 + 18} x2={(q1x + q2x) / 2 + half(r.V2 / r.V0)} y2={my2 + 18} c="v" w={2} size={8} />
      <text x={(p1x + p2x) / 2} y={my1 - 30} textAnchor="middle" className="dw-t dw-tv">V₁ (teso, T₁)</text>
      <text x={(q1x + q2x) / 2} y={my2 + 38} textAnchor="middle" className="dw-t dw-tv">V₂ (lasco, T₂)</text>
      <text x={x1} y={y + r1 + 20} textAnchor="middle" className="dw-t dw-tm">motrice</text>
      <text x={x2} y={y + r2 + 20} textAnchor="middle" className="dw-t dw-tm">condotta</text>
    </svg>
  );
  return (
    <Mech
      title="Scorrimento elastico: la condotta resta indietro rispetto alla cinghia ideale"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="coppia C₁" value={C1} min={0} max={30} step={0.5} onChange={setC1} unit="N·m" />
          <Slider label="rigidezza EA" value={EAk} min={2} max={50} step={1} onChange={setEAk} unit="kN" />
          <Readout
            rows={[
              ['T₁ = T₂ + C₁/R₁', `${fmt(r.T1, 4)} N`],
              ['V₁ / V₂', `${fmt(r.V1, 4)} / ${fmt(r.V2, 4)} m/s`],
              ['τ^ID = R₁/R₂', fmt(r.tauId, 4)],
              ['τ = τ^ID (1+T₂/EA)/(1+T₁/EA)', fmt(r.tau, 4)],
              ['η = τ/τ^ID = V₂/V₁', fmt(r.eta, 4)],
              ['potenza persa (T₁−T₂)(V₁−V₂)', `${fmt(-r.Wdiss, 3)} W`],
              ['ritardo per giro della motrice', `${fmt(360 * (r.tauId - r.tau), 3)}°`],
            ]}
          />
        </>
      }
      note="Raggio pieno: posizione reale della condotta; tratteggio: dove sarebbe con la cinghia ideale. EA è volutamente piccola per vedere l'effetto; frecce di velocità esagerate. R₁ = 8 cm, R₂ = 16 cm, T₂ = 150 N, ω₁ = 150 rad/s."
    />
  );
}

export const MECCANISMI_C4: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c4-freno-nastro': FrenoNastroAnim,
  'c4-tensione-arco': TensioneArcoAnim,
  'c4-potenza-v': PotenzaVAnim,
  'c4-creep': CreepAnim,
};
