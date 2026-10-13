/**
 * Meccanismi animati del capitolo C7 (meccanica delle vibrazioni). Dinamica pura in src/engine/c7.ts.
 * Notazione della dispensa (NF-12): ω_m, ξ, ρ = ω/ω_m, A(ξ,ρ), forzante F₀ sin ωt, fasi come ritardi φ ∈ [0, π].
 */
import { useState, type ComponentType, type ReactNode } from 'react';
import {
  amplificazione, aMax, caso, decrementoLog, eccentrica, eccentricaStato, fase, faseVincolo, fmMaxIsolamento, forzaTrasmessa,
  forzataTotale, inviluppo, libera, motoRelativo, omegaD, qualityFactor, radici, rhoPicco, rhoPiccoRelativo, trasmissibilita,
  zonaForzata, zonaTrasm,
} from '../engine/c7';
import { fmt } from '../engine/num';
import { Arrow, Mech, PlayBtn, Readout, Slider, Toggle, useClock } from './anim';

type P = { params?: Record<string, number | string> };
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const gradi = (r: number) => `${fmt((r * 180) / Math.PI, 3)}°`;

// ------------------------------------------------------------------ pezzi di disegno
function Molla({ x1, x2, y, n = 7, amp = 6 }: { x1: number; x2: number; y: number; n?: number; amp?: number }) {
  const lead = Math.min(8, (x2 - x1) * 0.15), a = x1 + lead, b = x2 - lead, step = (b - a) / (2 * n);
  const pts: string[] = [`${x1},${y}`, `${a},${y}`];
  for (let i = 0; i < 2 * n; i++) pts.push(`${a + step * (i + 0.5)},${y + (i % 2 ? amp : -amp)}`);
  pts.push(`${b},${y}`, `${x2},${y}`);
  return <polyline points={pts.join(' ')} className="dw-l" />;
}
function Smorzatore({ x1, x2, y, off = false }: { x1: number; x2: number; y: number; off?: boolean }) {
  const L = x2 - x1, xa = x1 + Math.min(30, L * 0.3), xb = xa + 26, xp = xa + 14;
  const cls = off ? 'dw-d' : 'dw-l';
  return (
    <g>
      <line x1={x1} y1={y} x2={xa} y2={y} className={cls} />
      <polyline points={`${xb},${y - 8} ${xa},${y - 8} ${xa},${y + 8} ${xb},${y + 8}`} className={cls} />
      <line x1={xp} y1={y - 6} x2={xp} y2={y + 6} className={cls} strokeWidth={2.5} />
      <line x1={xp} y1={y} x2={x2} y2={y} className={cls} />
    </g>
  );
}
function Telaio({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const h: ReactNode[] = [];
  for (let y = y1 + 4; y < y2; y += 9) h.push(<line key={y} x1={x} y1={y} x2={x - 7} y2={y - 7} className="dw-g" strokeWidth={1} />);
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} className="dw-g" strokeWidth={2} />
      {h}
    </g>
  );
}
function Pavimento({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const h: ReactNode[] = [];
  for (let x = x1 + 4; x < x2; x += 9) h.push(<line key={x} x1={x} y1={y} x2={x - 7} y2={y + 7} className="dw-g" strokeWidth={1} />);
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} className="dw-g" strokeWidth={2} />
      {h}
    </g>
  );
}
/** riquadro di un grafico: trasforma (x, y) in pixel */
interface Box { x0: number; y0: number; w: number; h: number; xmax: number; ymax: number; ymin?: number }
const bx = (b: Box, x: number) => b.x0 + (x / b.xmax) * b.w;
const by = (b: Box, y: number) => b.y0 - ((clamp(y, b.ymin ?? 0, b.ymax) - (b.ymin ?? 0)) / (b.ymax - (b.ymin ?? 0))) * b.h;
function tracciato(b: Box, f: (x: number) => number, x1 = 0, x2 = b.xmax, n = 200) {
  let d = '', dentro = false;
  const lo = b.ymin ?? 0, hi = b.ymax, marg = 0.02 * (hi - lo);
  for (let i = 0; i <= n; i++) {
    const x = x1 + ((x2 - x1) * i) / n, y = f(x);
    const ok = Number.isFinite(y) && y <= hi + marg && y >= lo - marg;
    if (ok) d += `${dentro ? 'L' : 'M'}${bx(b, x).toFixed(1)},${by(b, y).toFixed(1)}`;
    dentro = ok;
  }
  return d;
}
function Assi({ b, xl, yl, xt = [], yt = [] }: { b: Box; xl: string; yl: string; xt?: number[]; yt?: number[] }) {
  const y0 = by(b, 0);
  return (
    <g>
      <line x1={b.x0} y1={b.y0} x2={b.x0} y2={b.y0 - b.h - 6} className="dw-m" />
      <line x1={b.x0} y1={y0} x2={b.x0 + b.w + 6} y2={y0} className="dw-m" />
      <text x={b.x0 + b.w + 6} y={y0 - 6} textAnchor="end" className="dw-t dw-tm" fontSize={11}>{xl}</text>
      <text x={b.x0 + 4} y={b.y0 - b.h - 8} className="dw-t dw-tm" fontSize={11}>{yl}</text>
      {xt.map((t) => (
        <g key={`x${t}`}>
          <line x1={bx(b, t)} y1={y0 - 3} x2={bx(b, t)} y2={y0 + 3} className="dw-m" strokeWidth={1} />
          <text x={bx(b, t)} y={y0 + 12} textAnchor="middle" className="dw-t dw-tm" fontSize={10}>{String(t).replace('.', ',')}</text>
        </g>
      ))}
      {yt.map((t) => (
        <g key={`y${t}`}>
          <line x1={b.x0 - 3} y1={by(b, t)} x2={b.x0 + 3} y2={by(b, t)} className="dw-m" strokeWidth={1} />
          <text x={b.x0 - 5} y={by(b, t) + 3} textAnchor="end" className="dw-t dw-tm" fontSize={10}>{String(t).replace('.', ',')}</text>
        </g>
      ))}
    </g>
  );
}

// ------------------------------------------------------------------ 1. vibrazioni libere (pp. 209–213)
const PRESET = [
  { v: '0', t: 'ξ = 0' },
  { v: '0.1', t: 'ξ = 0,1' },
  { v: '1', t: 'critico' },
  { v: '2', t: 'ξ = 2' },
];
function LibereAnim({ params }: P) {
  const [xi, setXi] = useState(Number(params?.xi ?? 0.1));
  const [v0on, setV0on] = useState<'zero' | 'v0'>('zero');
  const clock = useClock();
  const wm = 2 * Math.PI * 0.75, TL = 4; // T_m = 1,33 s, finestra di 3 periodi naturali
  const tt = clock.t % TL;
  const v0 = v0on === 'v0' ? wm * 0.8 : 0;
  const xOf = (s: number) => libera(xi, wm, 1, v0, s);
  const xNow = xOf(tt);
  const r = radici(xi, wm);
  const sotto = xi > 0 && xi < 1;
  const blockX = 175 + clamp(55 * xNow, -95, 95);
  const b: Box = { x0: 30, y0: 225, w: 310, h: 110, xmax: TL, ymax: 1.6, ymin: -1.6 };
  const lam = (re: number, im: number) => (im === 0 ? fmt(re / wm, 3) : `${fmt(re / wm, 3)} ${im > 0 ? '+' : '−'} ${fmt(Math.abs(im) / wm, 3)} i`);
  const svgEl = (
    <svg viewBox="0 0 360 245" className="dw" role="img" aria-label="Risposta libera di massa, molla e smorzatore">
      <Telaio x={20} y1={14} y2={96} />
      <Pavimento x1={20} x2={350} y={92} />
      <Molla x1={20} x2={blockX - 24} y={36} />
      <Smorzatore x1={20} x2={blockX - 24} y={72} off={xi === 0} />
      <rect x={blockX - 24} y={20} width={48} height={72} className="dw-l" />
      <text x={blockX} y={60} textAnchor="middle" className="dw-t dw-tl">m</text>
      <line x1={175} y1={10} x2={175} y2={100} className="dw-d" strokeWidth={1} />
      <Arrow x1={175} y1={8} x2={blockX} y2={8} c="a" w={2} size={7} />
      <Assi b={b} xl="t" yl="x/x₀" xt={[1, 2, 3, 4]} yt={[1, -1]} />
      {sotto && xi < 0.9 ? (
        <>
          <path d={tracciato(b, (s) => inviluppo(xi, wm, 1, v0, s))} className="dw-d" fill="none" />
          <path d={tracciato(b, (s) => -inviluppo(xi, wm, 1, v0, s))} className="dw-d" fill="none" />
        </>
      ) : null}
      {xi > 0 ? <path d={tracciato(b, (s) => libera(0, wm, 1, v0, s))} className="dw-m" fill="none" strokeWidth={1} opacity={0.6} /> : null}
      <path d={tracciato(b, xOf, 0, TL, 300)} className="dw-a" fill="none" strokeWidth={2} />
      <line x1={bx(b, tt)} y1={b.y0} x2={bx(b, tt)} y2={b.y0 - b.h} className="dw-m" strokeWidth={1} />
      <circle cx={bx(b, tt)} cy={by(b, xNow)} r={4} className="dw-dot dw-dota" />
    </svg>
  );
  return (
    <Mech
      title="Vibrazioni libere: lo smorzamento decide se la massa oscilla"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Toggle value={PRESET.find((p) => Number(p.v) === xi)?.v ?? ''} onChange={(v) => setXi(Number(v))} label="casi notevoli" options={PRESET} />
          <Slider label="ξ" value={xi} min={0} max={2.5} step={0.01} onChange={setXi} />
          <Toggle value={v0on} onChange={setV0on} label="condizioni iniziali" options={[{ v: 'zero', t: 'ẋ(0) = 0 (dispensa)' }, { v: 'v0', t: 'ẋ(0) = v₀' }]} />
          <Readout
            rows={[
              ['caso', caso(xi)],
              ['λ₁/ω_m', lam(r.re1, r.im1)],
              ['λ₂/ω_m', lam(r.re2, r.im2)],
              ['ω_d/ω_m', sotto ? fmt(omegaD(xi, wm) / wm, 3) : xi === 0 ? '1' : '— (non oscilla)'],
              ['δ = 2πξ/√(1−ξ²)', sotto ? fmt(decrementoLog(xi), 3) : '—'],
              ['x(t)/x₀', fmt(xNow, 3)],
            ]}
          />
        </>
      }
      note="x₀ = 1, ω_m = 1,5π rad/s. Curva chiara: il caso non smorzato; tratteggio: inviluppo ±X e^{−ξω_m t}. Al critico (ξ = 1) x = (A₁ + A₂t)e^{−ω_m t} (NF-32)."
    />
  );
}

// ------------------------------------------------------------------ 2. vibrazioni forzate (pp. 214–217)
function ForzateAnim({ params }: P) {
  const [rho, setRho] = useState(Number(params?.rho ?? 0.8));
  const [xi, setXi] = useState(Number(params?.xi ?? 0.2));
  const [mode, setMode] = useState<'regime' | 'transitorio'>('regime');
  const [t0, setT0] = useState(0);
  const clock = useClock();
  const wm = 2 * Math.PI * 0.4, w = rho * wm, tt = clock.t - t0;
  const A = amplificazione(rho, xi), phi = fase(rho, xi);
  const x = forzataTotale(rho, xi, wm, tt, mode === 'transitorio');
  const F = Math.sin(w * tt);
  const blockX = 120 + clamp(12 * x, -70, 70);
  const rR = rhoPicco(xi);
  const ba: Box = { x0: 28, y0: 290, w: 140, h: 120, xmax: 3, ymax: 6 };
  const bf: Box = { x0: 205, y0: 290, w: 140, h: 120, xmax: 3, ymax: Math.PI };
  const bt: Box = { x0: 205, y0: 120, w: 140, h: 80, xmax: 2 * Math.PI * 2, ymax: 1.2, ymin: -1.2 };
  const th = (w * tt) % (4 * Math.PI);
  const svgEl = (
    <svg viewBox="0 0 360 310" className="dw" role="img" aria-label="Oscillatore forzato: ampiezza e fase al variare di ρ e ξ">
      <Telaio x={14} y1={22} y2={110} />
      <Pavimento x1={14} x2={196} y={106} />
      <Molla x1={14} x2={blockX - 22} y={45} n={6} />
      <Smorzatore x1={14} x2={blockX - 22} y={85} off={xi === 0} />
      <rect x={blockX - 22} y={30} width={44} height={76} className="dw-l" />
      <text x={blockX} y={72} textAnchor="middle" className="dw-t dw-tl">m</text>
      <Arrow x1={blockX + 22} y1={68} x2={blockX + 22 + 34 * F} y2={68} c="f" w={2.5} />
      <text x={100} y={16} textAnchor="middle" className="dw-t dw-tf" fontSize={11}>F₀ sin ωt</text>
      {/* tracce nel tempo: forza e risposta normalizzate (si vede il ritardo φ) */}
      <Assi b={bt} xl="ωt" yl="" />
      <path d={tracciato(bt, (s) => Math.sin(s))} className="dw-f" fill="none" />
      <path d={tracciato(bt, (s) => Math.sin(s - phi))} className="dw-a" fill="none" strokeWidth={2} />
      <line x1={bx(bt, th)} y1={bt.y0} x2={bx(bt, th)} y2={bt.y0 - bt.h} className="dw-m" strokeWidth={1} />
      <text x={bt.x0 + 4} y={bt.y0 - bt.h - 6} className="dw-t dw-tf" fontSize={10}>F/F₀</text>
      <text x={bt.x0 + 54} y={bt.y0 - bt.h - 6} className="dw-t dw-ta" fontSize={10}>x/X₀ (in ritardo di φ)</text>
      {/* A(ρ) e φ(ρ) */}
      <Assi b={ba} xl="ρ" yl="A" xt={[1, 2, 3]} yt={[1, 3, 5]} />
      <path d={tracciato(ba, (r) => amplificazione(r, 0))} className="dw-d" fill="none" />
      <path d={tracciato(ba, (r) => amplificazione(r, xi))} className="dw-a" fill="none" strokeWidth={2} />
      <circle cx={bx(ba, rho)} cy={by(ba, A)} r={4} className="dw-dot dw-dota" />
      {rR !== null ? <line x1={bx(ba, rR)} y1={ba.y0} x2={bx(ba, rR)} y2={by(ba, aMax(xi))} className="dw-d" strokeWidth={1} /> : null}
      <Assi b={bf} xl="ρ" yl="φ" xt={[1, 2, 3]} />
      <text x={bf.x0 - 4} y={by(bf, Math.PI) + 3} textAnchor="end" className="dw-t dw-tm" fontSize={10}>π</text>
      <text x={bf.x0 - 4} y={by(bf, Math.PI / 2) + 3} textAnchor="end" className="dw-t dw-tm" fontSize={10}>π/2</text>
      <line x1={bf.x0} y1={by(bf, Math.PI / 2)} x2={bx(bf, 1)} y2={by(bf, Math.PI / 2)} className="dw-d" strokeWidth={1} />
      <path d={tracciato(bf, (r) => fase(r, xi), 0, 3, 300)} className="dw-a" fill="none" strokeWidth={2} />
      <circle cx={bx(bf, rho)} cy={by(bf, phi)} r={4} className="dw-dot dw-dota" />
    </svg>
  );
  return (
    <Mech
      title="Vibrazioni forzate: amplificazione e ritardo al variare di ρ e ξ"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="ρ = ω/ω_m" value={rho} min={0.05} max={3} step={0.01} onChange={(v) => { setRho(v); setT0(clock.t); }} />
          <Slider label="ξ" value={xi} min={0} max={1} step={0.01} onChange={(v) => { setXi(v); setT0(clock.t); }} />
          <Toggle value={mode} onChange={(v) => { setMode(v); setT0(clock.t); }} label="risposta" options={[{ v: 'regime', t: 'solo regime' }, { v: 'transitorio', t: 'da fermo (con transitorio)' }]} />
          <Readout
            rows={[
              ['A = X₀/(F₀/K)', A > 1e3 ? '∞ (risonanza, ξ = 0)' : fmt(A, 3)],
              ['φ (ritardo)', gradi(phi)],
              ['picco ρ_R = √(1−2ξ²)', rR === null ? 'nessuno (ξ ≥ 0,707)' : fmt(rR, 3)],
              ['A_max', xi === 0 ? '∞' : fmt(aMax(xi), 3)],
              ['Q = 1/(2ξ) = A(1)', xi === 0 ? '∞' : fmt(qualityFactor(xi), 3)],
              ['domina', zonaForzata(rho)],
            ]}
          />
        </>
      }
      note="Con ξ = 0 e ρ = 1 l'ampiezza nel modello è infinita (curva tratteggiata). A ρ = 1 il ritardo è π/2 per ogni ξ. Spostamento disegnato 12 px per x^STA, tagliato a ±70 px."
    />
  );
}

// ------------------------------------------------------------------ 3. fasori del complex replacement (pp. 214–217)
function FasoriAnim({ params }: P) {
  const [rho, setRho] = useState(Number(params?.rho ?? 0.7));
  const [xi, setXi] = useState(Number(params?.xi ?? 0.25));
  const [conv, setConv] = useState<'sin' | 'cos'>('sin');
  const clock = useClock();
  const th = (2 * Math.PI * 0.25 * clock.t) % (2 * Math.PI);
  const A = amplificazione(rho, xi), phi = fase(rho, xi);
  const kx = A, cx = 2 * xi * rho * A, mx = rho * rho * A; // in unità di F₀
  const S = 62 / Math.max(1, kx, mx, cx);
  const ox = 105, oy = 120;
  const P = (r: number, a: number): [number, number] => [ox + S * r * Math.cos(a), oy - S * r * Math.sin(a)];
  const tF = P(1, th), tX = P(A, th - phi);
  const p1 = P(kx, th - phi);
  const p2: [number, number] = [p1[0] + S * cx * Math.cos(th - phi + Math.PI / 2), p1[1] - S * cx * Math.sin(th - phi + Math.PI / 2)];
  const p3: [number, number] = [p2[0] + S * mx * Math.cos(th - phi + Math.PI), p2[1] - S * mx * Math.sin(th - phi + Math.PI)];
  const proj = (q: [number, number]): [number, number] => (conv === 'sin' ? [ox, q[1]] : [q[0], oy]);
  const b: Box = { x0: 230, y0: 175, w: 120, h: 110, xmax: 2 * Math.PI, ymax: 1.25, ymin: -1.25 };
  const fis = (a: number) => (conv === 'sin' ? Math.sin(a) : Math.cos(a));
  const svgEl = (
    <svg viewBox="0 0 360 240" className="dw" role="img" aria-label="Fasori di forza, risposta, molla, smorzatore e massa nel piano complesso">
      <line x1={ox - 95} y1={oy} x2={ox + 100} y2={oy} className="dw-m" />
      <line x1={ox} y1={oy + 95} x2={ox} y2={oy - 100} className="dw-m" />
      <text x={ox + 100} y={oy + 14} textAnchor="end" className="dw-t dw-tm" fontSize={11}>Re</text>
      <text x={ox + 6} y={oy - 92} className="dw-t dw-tm" fontSize={11}>Im</text>
      <Arrow x1={ox} y1={oy} x2={p1[0]} y2={p1[1]} c="l" w={2} size={7} />
      <Arrow x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} c="v" w={2} size={7} />
      <Arrow x1={p2[0]} y1={p2[1]} x2={p3[0]} y2={p3[1]} c="m" w={2} size={7} />
      <Arrow x1={ox} y1={oy} x2={tF[0]} y2={tF[1]} c="f" w={3} />
      <Arrow x1={ox} y1={oy} x2={tX[0]} y2={tX[1]} c="a" w={3} />
      <line x1={tF[0]} y1={tF[1]} x2={proj(tF)[0]} y2={proj(tF)[1]} className="dw-d" strokeWidth={1} />
      <line x1={tX[0]} y1={tX[1]} x2={proj(tX)[0]} y2={proj(tX)[1]} className="dw-d" strokeWidth={1} />
      <circle cx={proj(tF)[0]} cy={proj(tF)[1]} r={3.5} className="dw-dot dw-dotl" />
      <circle cx={proj(tX)[0]} cy={proj(tX)[1]} r={3.5} className="dw-dot dw-dota" />
      <text x={tF[0] + 6} y={tF[1] - 6} className="dw-t dw-tf" fontSize={11}>F̂</text>
      <text x={tX[0] + 6} y={tX[1] + 12} className="dw-t dw-ta" fontSize={11}>X̂ (×K/F₀)</text>
      <Assi b={b} xl="ωt" yl={conv === 'sin' ? 'Im' : 'Re'} />
      <path d={tracciato(b, (a) => fis(a))} className="dw-f" fill="none" />
      <path d={tracciato(b, (a) => fis(a - phi) * Math.min(1, A))} className="dw-a" fill="none" strokeWidth={2} />
      <line x1={bx(b, th)} y1={b.y0} x2={bx(b, th)} y2={b.y0 - b.h} className="dw-m" strokeWidth={1} />
      <text x={b.x0} y={b.y0 + 26} className="dw-t dw-tm" fontSize={10}>{conv === 'sin' ? 'forzante in seno → parte immaginaria' : 'forzante in coseno → parte reale'}</text>
    </svg>
  );
  return (
    <Mech
      title="Complex replacement: i fasori ruotano, la fisica è la proiezione"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="ρ" value={rho} min={0.1} max={2.5} step={0.01} onChange={setRho} />
          <Slider label="ξ" value={xi} min={0.02} max={1} step={0.01} onChange={setXi} />
          <Toggle value={conv} onChange={setConv} label="convenzione" options={[{ v: 'sin', t: 'F₀ sin ωt → Im (dispensa)' }, { v: 'cos', t: 'F₀ cos ωt → Re' }]} />
          <Readout
            rows={[
              ['|K X̂|/F₀ = A', fmt(kx, 3)],
              ['|icω X̂|/F₀ = 2ξρA', fmt(cx, 3)],
              ['|mω² X̂|/F₀ = ρ²A', fmt(mx, 3)],
              ['φ = arg p(iω)', gradi(phi)],
            ]}
          />
        </>
      }
      note="Nero: K X̂ (in fase con lo spostamento); verde: icω X̂ (+90°); grigio: −mω² X̂ (opposta). La catena chiude sempre su F̂: è l'equazione (K − mω² + icω)X̂ = F̂. A ρ = 1 molla e massa si annullano."
    />
  );
}

// ------------------------------------------------------------------ 4. massa eccentrica rotante (p. 223)
function EccentricaAnim({ params }: P) {
  const [rho, setRho] = useState(Number(params?.rho ?? 0.6));
  const [xi, setXi] = useState(Number(params?.xi ?? 0.15));
  const [mr, setMr] = useState(Number(params?.mr ?? 0.2));
  const clock = useClock();
  const wm = 2 * Math.PI * 0.3, Rpx = 34;
  const s = eccentricaStato({ rho, xi, mr, R: 1, wm, t: clock.t });
  const xO = 150 + clamp(Rpx * s.xO, -80, 80);
  const pX = xO + Rpx * Math.cos(s.theta), pY = 70 - Rpx * Math.sin(s.theta);
  const gX = 150 + clamp(Rpx * s.xGLO, -80, 80);
  const b: Box = { x0: 30, y0: 275, w: 310, h: 115, xmax: 5, ymax: 4 };
  const ratio = eccentrica(rho, xi);
  const rs = rhoPiccoRelativo(xi);
  const svgEl = (
    <svg viewBox="0 0 360 295" className="dw" role="img" aria-label="Statore con rotore sbilanciato: oscillazione e baricentro globale">
      <Telaio x={14} y1={18} y2={128} />
      <Pavimento x1={14} x2={346} y={124} />
      <Smorzatore x1={14} x2={xO - 60} y={40} off={xi === 0} />
      <Molla x1={14} x2={xO - 60} y={100} n={6} />
      <rect x={xO - 60} y={22} width={120} height={102} className="dw-l" />
      <circle cx={xO} cy={70} r={Rpx + 8} className="dw-l" />
      <line x1={xO} y1={70} x2={pX} y2={pY} className="dw-a" strokeWidth={2.5} />
      <circle cx={pX} cy={pY} r={6} className="dw-fill" />
      <circle cx={xO} cy={70} r={3} className="dw-dot dw-dotl" />
      <line x1={gX} y1={10} x2={gX} y2={132} className="dw-d" strokeWidth={1} />
      <text x={gX + 4} y={16} className="dw-t dw-ta" fontSize={11}>x_GLO</text>
      <line x1={150} y1={128} x2={150} y2={140} className="dw-m" strokeWidth={1} />
      <Assi b={b} xl="ρ" yl="M|X_O|/(M_R R)" xt={[1, 2, 3, 4, 5]} yt={[1, 2, 3]} />
      <line x1={b.x0} y1={by(b, 1)} x2={b.x0 + b.w} y2={by(b, 1)} className="dw-d" strokeWidth={1} />
      <path d={tracciato(b, (r) => eccentrica(r, xi), 0, 5, 300)} className="dw-a" fill="none" strokeWidth={2} />
      <circle cx={bx(b, rho)} cy={by(b, ratio)} r={4} className="dw-dot dw-dota" />
      {rs !== null && rs < 5 ? <line x1={bx(b, rs)} y1={b.y0} x2={bx(b, rs)} y2={by(b, eccentrica(rs, xi))} className="dw-d" strokeWidth={1} /> : null}
    </svg>
  );
  return (
    <Mech
      title="Massa eccentrica rotante: forzante ∝ ω² e autocentramento"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="ρ = ω/ω_m" value={rho} min={0.05} max={5} step={0.01} onChange={setRho} />
          <Slider label="ξ" value={xi} min={0.02} max={1} step={0.01} onChange={setXi} />
          <Slider label="M_R/M" value={mr} min={0.05} max={0.3} step={0.01} onChange={setMr} />
          <Readout
            rows={[
              ['M|X_O|/(M_R R) = ρ²A', fmt(ratio, 3)],
              ['φ (statore–forzante)', gradi(s.phi)],
              ['ampiezza x_GLO / R', fmt(s.ampGLO, 3)],
              ['massimo a ρ = 1/√(1−2ξ²)', rs === null ? 'nessuno' : fmt(rs, 3)],
            ]}
          />
        </>
      }
      note="R = eccentricità (34 px). La linea tratteggiata in alto è il baricentro globale statore + rotore: ad alta velocità (ρ ≫ 1) resta fermo sull'asse mentre statore e rotore si muovono in opposizione."
    />
  );
}

// ------------------------------------------------------------------ 5. eccitazione di vincolo (pp. 219–221)
function VincoloAnim({ params }: P) {
  const [rho, setRho] = useState(Number(params?.rho ?? 0.6));
  const [xi, setXi] = useState(Number(params?.xi ?? 0.15));
  const [vista, setVista] = useState<'assoluto' | 'relativo'>('assoluto');
  const clock = useClock();
  const wm = 2 * Math.PI * 0.35, th = rho * wm * clock.t, XV = 18;
  const T = trasmissibilita(rho, xi), ax = faseVincolo(rho, xi);
  const xV = XV * Math.sin(th), xG = clamp(XV * T * Math.sin(th + ax), -80, 80);
  const baseX = 40 + xV, mX = 200 + xG;
  const b: Box = { x0: 30, y0: 290, w: 300, h: 105, xmax: 3.15, ymax: 4 };
  const f = vista === 'assoluto' ? (r: number) => trasmissibilita(r, xi) : (r: number) => motoRelativo(r, xi);
  const svgEl = (
    <svg viewBox="0 0 360 305" className="dw" role="img" aria-label="Base mobile che eccita la massa attraverso molla e smorzatore">
      <rect x={baseX - 8} y={18} width={14} height={104} className="dw-soft" />
      <rect x={baseX - 8} y={18} width={14} height={104} className="dw-l" />
      <Pavimento x1={150} x2={346} y={122} />
      <Molla x1={baseX + 6} x2={mX - 30} y={44} n={7} />
      <Smorzatore x1={baseX + 6} x2={mX - 30} y={98} off={xi === 0} />
      <rect x={mX - 30} y={26} width={60} height={96} className="dw-l" />
      <text x={mX} y={78} textAnchor="middle" className="dw-t dw-tl">m</text>
      <line x1={40} y1={130} x2={40} y2={142} className="dw-m" strokeWidth={1} />
      <line x1={200} y1={130} x2={200} y2={142} className="dw-m" strokeWidth={1} />
      <Arrow x1={40} y1={136} x2={baseX} y2={136} c="v" w={2} size={6} />
      <Arrow x1={200} y1={136} x2={mX} y2={136} c="a" w={2} size={6} />
      <text x={40} y={154} textAnchor="middle" className="dw-t dw-tv" fontSize={11}>x_V</text>
      <text x={200} y={154} textAnchor="middle" className="dw-t dw-ta" fontSize={11}>x_G</text>
      <Assi b={b} xl="ρ" yl={vista === 'assoluto' ? 'T_R = |x_G|/X_V' : '|x_G^R|/X_V = ρ²A'} xt={[1, 2, 3]} yt={[1, 2, 3]} />
      <line x1={b.x0} y1={by(b, 1)} x2={b.x0 + b.w} y2={by(b, 1)} className="dw-d" strokeWidth={1} />
      {vista === 'assoluto' ? <line x1={bx(b, Math.SQRT2)} y1={b.y0} x2={bx(b, Math.SQRT2)} y2={b.y0 - b.h} className="dw-d" strokeWidth={1} /> : null}
      <path d={tracciato(b, f, 0, 3, 300)} className="dw-a" fill="none" strokeWidth={2} />
      <circle cx={bx(b, rho)} cy={by(b, f(rho))} r={4} className="dw-dot dw-dota" />
    </svg>
  );
  return (
    <Mech
      title="Eccitazione di vincolo: la base forza la massa attraverso molla e smorzatore"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="ρ" value={rho} min={0.05} max={3} step={0.01} onChange={setRho} />
          <Slider label="ξ" value={xi} min={0} max={1} step={0.01} onChange={setXi} />
          <Toggle value={vista} onChange={setVista} label="grandezza" options={[{ v: 'assoluto', t: 'massa / base (T_R)' }, { v: 'relativo', t: 'moto relativo (ρ²A)' }]} />
          <Readout
            rows={[
              ['T_R = |x_G|/X_V', T > 1e3 ? '∞' : fmt(T, 3)],
              ['α_x (fase massa–base)', gradi(ax)],
              ['|x_G^R|/X_V = ρ²A', fmt(motoRelativo(rho, xi), 3)],
              ['zona', zonaTrasm(rho)],
            ]}
          />
        </>
      }
      note="x_V = X_V sin ωt (X_V = 18 px). α_x = arctg 2ξρ − φ è sempre negativa: la massa insegue la base. Spostamento della massa tagliato a ±80 px."
    />
  );
}

// ------------------------------------------------------------------ 6. trasmissibilità e isolamento (pp. 220–222)
function TrasmissibilitaAnim({ params }: P) {
  const [rho, setRho] = useState(Number(params?.rho ?? 2));
  const [xi, setXi] = useState(Number(params?.xi ?? 0.1));
  const [colpi, setColpi] = useState(120);
  const clock = useClock();
  const wm = 2 * Math.PI * 0.3, tt = clock.t, th = rho * wm * tt;
  const T = trasmissibilita(rho, xi);
  const FT = clamp(forzaTrasmessa(rho, xi, wm, tt), -4, 4);
  const b: Box = { x0: 30, y0: 290, w: 300, h: 150, xmax: 3.15, ymax: 4 };
  const fam = [0, 0.1, 0.2, 0.5, 1];
  const f = colpi / 60, fm = fmMaxIsolamento(f), xst = 9.81 / (2 * Math.PI * fm) ** 2;
  const svgEl = (
    <svg viewBox="0 0 360 320" className="dw" role="img" aria-label="Curve di trasmissibilità con il punto comune (√2, 1) e forza trasmessa al muro">
      <rect x={bx(b, Math.SQRT2)} y={by(b, 1)} width={bx(b, 3) - bx(b, Math.SQRT2)} height={b.y0 - by(b, 1)} className="dw-soft" />
      <Assi b={b} xl="ρ" yl="T_R" xt={[1, 2, 3]} yt={[1, 2, 3]} />
      <line x1={b.x0} y1={by(b, 1)} x2={b.x0 + b.w} y2={by(b, 1)} className="dw-d" strokeWidth={1} />
      <line x1={bx(b, Math.SQRT2)} y1={b.y0} x2={bx(b, Math.SQRT2)} y2={b.y0 - b.h} className="dw-d" strokeWidth={1} />
      {fam.map((z) => (
        <path key={z} d={tracciato(b, (r) => trasmissibilita(r, z), 0, 3, 240)} className={z === 0 ? 'dw-d' : 'dw-m'} fill="none" strokeWidth={1} />
      ))}
      <path d={tracciato(b, (r) => trasmissibilita(r, xi), 0, 3, 300)} className="dw-a" fill="none" strokeWidth={2.5} />
      <circle cx={bx(b, rho)} cy={by(b, T)} r={4.5} className="dw-dot dw-dota" />
      <text x={bx(b, Math.SQRT2) + 4} y={by(b, 1) - 6} className="dw-t dw-tm" fontSize={10}>(√2, 1)</text>
      <text x={bx(b, 2.2)} y={b.y0 + 26} textAnchor="middle" className="dw-t dw-ta" fontSize={11}>isolamento</text>
      <text x={bx(b, 0.7)} y={b.y0 + 26} textAnchor="middle" className="dw-t dw-tm" fontSize={11}>amplificazione</text>
      {/* forza applicata e forza trasmessa al muro, in unità di F₀ */}
      <Telaio x={40} y1={20} y2={96} />
      <rect x={150} y={30} width={50} height={56} className="dw-l" />
      <Molla x1={40} x2={150} y={44} n={6} />
      <Smorzatore x1={40} x2={150} y={72} off={xi === 0} />
      <Arrow x1={200} y1={58} x2={200 + 26 * Math.sin(th)} y2={58} c="f" w={2.5} />
      <Arrow x1={38} y1={58} x2={38 - 26 * FT} y2={58} c="a" w={3} />
      <text x={240} y={40} className="dw-t dw-tf" fontSize={11}>F₀ sin ωt</text>
      <text x={8} y={114} className="dw-t dw-ta" fontSize={11}>F_T al muro</text>
    </svg>
  );
  return (
    <Mech
      title="Trasmissibilità: si isola solo oltre ρ = √2"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="ρ" value={rho} min={0.05} max={3} step={0.01} onChange={setRho} />
          <Slider label="ξ" value={xi} min={0} max={1} step={0.01} onChange={setXi} />
          <Readout
            rows={[
              ['T_R = |F_T|/F₀', T > 1e3 ? '∞' : fmt(T, 3)],
              ['zona', zonaTrasm(rho)],
              ['T_R con ξ = 0,1 / 0,5', `${fmt(trasmissibilita(rho, 0.1), 3)} / ${fmt(trasmissibilita(rho, 0.5), 3)}`],
            ]}
          />
          <Slider label="pressa: colpi/min" value={colpi} min={30} max={600} step={10} onChange={setColpi} />
          <Readout
            rows={[
              ['f della pressa', `${fmt(f, 3)} Hz`],
              ['f_m < f/√2', `${fmt(fm, 3)} Hz`],
              ['freccia statica minima g/ω_m²', `${fmt(xst * 100, 3)} cm`],
            ]}
          />
        </>
      }
      note="Curve grigie: ξ = 0,1; 0,2; 0,5; 1 (tratteggio: ξ = 0). Tutte passano per (√2, 1). A destra di √2 le curve con più smorzamento stanno più in alto: lo smorzamento peggiora l'isolamento (NF-33)."
    />
  );
}

export const MECCANISMI_C7: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c7-libere': LibereAnim,
  'c7-forzate': ForzateAnim,
  'c7-fasori': FasoriAnim,
  'c7-eccentrica': EccentricaAnim,
  'c7-vincolo': VincoloAnim,
  'c7-trasmissibilita': TrasmissibilitaAnim,
};
