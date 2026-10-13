/**
 * Infrastruttura comune delle animazioni (da SEIMAFI): manovella animata, orologio continuo, comandi.
 * I disegni usano le stesse classi dei disegni di riferimento (`dw-*`, src/content/svg.ts): seguono il tema.
 * La cinematica sta in src/engine/cX.ts (pura, testata): qui si disegna e basta.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
export { useClock, PlayBtn } from './clock';

const TAU = 2 * Math.PI;
const reduceMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** angolo che avanza nel tempo (giri al secondo = speed); rispetta «riduci movimento» */
export function useCrank(initialSpeed = 0.25, period = TAU, start = 0) {
  const [theta, setTheta] = useState(start);
  const [play, setPlay] = useState(!reduceMotion());
  const [speed, setSpeed] = useState(initialSpeed);
  const last = useRef<number | null>(null);
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const tick = (t: number) => {
      if (last.current != null) {
        const dt = Math.min(0.05, (t - last.current) / 1000);
        setTheta((th) => (th + TAU * speed * dt) % period);
      }
      last.current = t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      last.current = null;
    };
  }, [play, speed, period]);
  return { theta, setTheta, play, setPlay, speed, setSpeed };
}

export function Transport({ crank, label = 'angolo di manovella θ', maxDeg = 359 }: { crank: ReturnType<typeof useCrank>; label?: string; maxDeg?: number }) {
  const d = Math.round((crank.theta * 180) / Math.PI);
  return (
    <div className="mech-controls">
      <button type="button" className="mech-btn" onClick={() => crank.setPlay(!crank.play)} aria-label={crank.play ? 'pausa' : 'avvia'}>
        {crank.play ? '❚❚ pausa' : '▶ avvia'}
      </button>
      <label className="slider">
        <span>
          {label} = <b>{d}°</b>
        </span>
        <input type="range" min={0} max={maxDeg} step={1} value={d} onChange={(e) => { crank.setPlay(false); crank.setTheta((parseFloat(e.target.value) * Math.PI) / 180); }} />
      </label>
      <label className="slider small">
        <span>velocità</span>
        <select value={crank.speed} onChange={(e) => crank.setSpeed(parseFloat(e.target.value))}>
          <option value={0.08}>molto lenta</option>
          <option value={0.25}>lenta</option>
          <option value={0.6}>normale</option>
        </select>
      </label>
    </div>
  );
}

export function Slider({ label, value, min, max, step, onChange, unit, show }: { label: ReactNode; value: number; min: number; max: number; step: number; onChange: (v: number) => void; unit?: string; show?: (v: number) => string }) {
  return (
    <label className="slider">
      <span>
        {label} = <b>{show ? show(value) : +value.toFixed(4)}</b>
        {unit ? ` ${unit}` : ''}
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </label>
  );
}

export function Toggle<T extends string>({ value, options, onChange, label }: { value: T; options: { v: T; t: string }[]; onChange: (v: T) => void; label?: string }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button type="button" key={o.v} className={o.v === value ? 'on' : ''} aria-pressed={o.v === value} onClick={() => onChange(o.v)}>
          {o.t}
        </button>
      ))}
    </div>
  );
}

/** riquadro di valori letti dal motore (tabular-nums) */
export function Readout({ rows }: { rows: [ReactNode, string][] }) {
  return (
    <dl className="readout">
      {rows.map(([k, v], i) => (
        <div key={i}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** contenitore standard: disegno a sinistra, comandi e valori a destra (sotto, su telefono) */
export function Mech({ title, svg, side, note }: { title: string; svg: ReactNode; side: ReactNode; note?: ReactNode }) {
  return (
    <figure className="mech">
      <figcaption>{title}</figcaption>
      <div className="mech-body">
        <div className="mech-svg">{svg}</div>
        <div className="mech-side">{side}</div>
      </div>
      {note ? <p className="mech-note">{note}</p> : null}
    </figure>
  );
}

/** punta di freccia come poligono (niente marker: segue il tema con le classi dw-h) */
export function Arrow({ x1, y1, x2, y2, c = 'f', w = 2.5, size = 9 }: { x1: number; y1: number; x2: number; y2: number; c?: string; w?: number; size?: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (da: number) => `${x2 - size * Math.cos(a + da)},${y2 - size * Math.sin(a + da)}`;
  if (Math.hypot(x2 - x1, y2 - y1) < 1) return null;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className={`dw-${c}`} strokeWidth={w} />
      <polygon points={`${x2},${y2} ${p(0.4)} ${p(-0.4)}`} className={`dw-h dw-${c}`} />
    </g>
  );
}
