/** Meccanismi animati del capitolo C4 (trasmissioni a cinghia). Cinematica e statica in src/engine/c4.ts. */
import { useState, type ComponentType } from 'react';
import { frenoNastro } from '../engine/c4';
import { fmt } from '../engine/num';
import { Arrow, Mech, Readout, Slider, Toggle, useCrank } from './anim';

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

export const MECCANISMI_C4: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c4-freno-nastro': FrenoNastroAnim,
};
