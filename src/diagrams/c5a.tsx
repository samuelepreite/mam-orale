/**
 * Meccanismi animati del capitolo C5, parte a (ruote dentate a denti dritti, rotismi ordinari).
 * Geometria e statica in src/engine/c5a.ts (pura, testata in tests/meccanismi-c5a.test.ts): qui si disegna e basta.
 */
import { useState, type ComponentType } from 'react';
import {
  contattoConAttrito, contatti, contornoRuota, evolvente, ingranaggio, interoMinimo, puntoRetta, rotRuota2, rotismoOrdinario,
  zMin, zMinComeDispensa, zMinDentiera,
} from '../engine/c5a';
import { fmt } from '../engine/num';
import { Mech, Readout, Slider, Toggle, Transport, useCrank } from './anim';

const DEG = Math.PI / 180;
type P2 = [number, number];
const path = (pts: P2[], close = true) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('') + (close ? 'Z' : '');

// ------------------------------------------------------------------ evolvente
/** Generazione dell'evolvente (pp. 158, 161): la retta rotola sulla fondamentale, il pennino traccia P; PQ è la normale. */
function EvolventeAnim() {
  const GMAX = 2.4;
  const crank = useCrank(0.08, GMAX);
  const g = crank.theta;
  const Rf = 60, ox = 120, oy = 150;
  const S = (p: P2): P2 => [ox + p[0], oy - p[1]];
  const e = evolvente(Rf, g);
  const traccia: P2[] = [];
  for (let k = 0; k <= 60; k++) traccia.push(S(evolvente(Rf, (g * k) / 60).P));
  const [Px, Py] = S(e.P), [Qx, Qy] = S(e.Q), [Hx, Hy] = S([Rf, 0]);
  // retta generatrice: tangente in Q, prolungata oltre P e dalla parte opposta
  const t: P2 = [Math.sin(g), -Math.cos(g)];
  const r1 = S([e.Q[0] - t[0] * 50, e.Q[1] - t[1] * 50]), r2 = S([e.Q[0] + t[0] * (Rf * g + 40), e.Q[1] + t[1] * (Rf * g + 40)]);
  const tgLen = 26, tn = Math.hypot(e.dP[0], e.dP[1]) || 1;
  const tg1 = S([e.P[0] - (e.dP[0] / tn) * tgLen, e.P[1] - (e.dP[1] / tn) * tgLen]), tg2 = S([e.P[0] + (e.dP[0] / tn) * tgLen, e.P[1] + (e.dP[1] / tn) * tgLen]);
  const svgEl = (
    <svg viewBox="0 0 340 260" className="dw" role="img" aria-label="Generazione dell'evolvente">
      <circle cx={ox} cy={oy} r={Rf} className="dw-l" />
      <circle cx={ox} cy={oy} r={3} className="dw-dot dw-dotl" />
      <text x={ox - 10} y={oy + 16} className="dw-t dw-tl">O</text>
      <line x1={ox} y1={oy} x2={Qx} y2={Qy} className="dw-m" strokeDasharray="4 3" />
      <path d={`M${Hx},${Hy} A${Rf},${Rf} 0 ${g > Math.PI ? 1 : 0} 0 ${Qx.toFixed(1)},${Qy.toFixed(1)}`} className="dw-v" strokeWidth={3} />
      <line x1={r1[0]} y1={r1[1]} x2={r2[0]} y2={r2[1]} className="dw-m" />
      <path d={path(traccia, false)} className="dw-a" strokeWidth={2.5} fill="none" />
      <line x1={Qx} y1={Qy} x2={Px} y2={Py} className="dw-v" strokeWidth={3} />
      <line x1={tg1[0]} y1={tg1[1]} x2={tg2[0]} y2={tg2[1]} className="dw-f" strokeDasharray="5 3" />
      <circle cx={Hx} cy={Hy} r={3} className="dw-dot dw-dotl" />
      <text x={Hx + 8} y={Hy + 4} className="dw-t dw-tl">H</text>
      <circle cx={Qx} cy={Qy} r={3.5} className="dw-dot dw-dotl" />
      <text x={Qx - 14} y={Qy - 6} className="dw-t dw-tv">Q</text>
      <circle cx={Px} cy={Py} r={4} className="dw-dot dw-dota" />
      <text x={Px + 8} y={Py - 6} className="dw-t dw-ta">P</text>
    </svg>
  );
  return (
    <Mech
      title="Evolvente: la retta che rotola sulla fondamentale è sempre normale alla curva"
      svg={svgEl}
      side={
        <>
          <Transport crank={crank} label="angolo di rotolamento γ" maxDeg={137} />
          <Readout
            rows={[
              ['segmento PQ', fmt(e.PQ / Rf, 4) + ' R_f'],
              ['arco HQ = R_f γ', fmt(e.arcoHQ / Rf, 4) + ' R_f'],
              ['angolo fra PQ e la tangente', g > 1e-3 ? `${fmt(Math.acos(Math.max(-1, Math.min(1, e.cosTgPQ))) / DEG, 3)}°` : '—'],
              ['raggio OP', fmt(e.r / Rf, 4) + ' R_f'],
            ]}
          />
        </>
      }
      note="Arco verde: arco HQ percorso dal contatto; segmento verde: PQ, uguale all'arco (niente strisciamento). Curva blu: l'evolvente tracciata da P. Tratteggio rosso: tangente all'evolvente in P, perpendicolare a PQ."
    />
  );
}

// ------------------------------------------------------------------ ingranamento
/** Due ruote a evolvente in presa (pp. 162–168): retta di pressione, segmento dei contatti, contatti attivi, interferenza. */
function IngranamentoAnim({ params }: { params?: Record<string, number | string> }) {
  const vista = params?.vista === 'interferenza' ? 'interferenza' : params?.vista === 'presa' ? 'presa' : 'base';
  const [z1, setZ1] = useState(vista === 'interferenza' ? 40 : 30);
  const [z2, setZ2] = useState(vista === 'interferenza' ? 10 : 18);
  const [thDeg, setThDeg] = useState(20);
  const [zoom, setZoom] = useState<'intera' | 'zoom'>(vista === 'base' ? 'intera' : 'zoom');
  const crank = useCrank(0.05);
  const th = thDeg * DEG;
  const g = ingranaggio({ z1, z2, m: 1, theta: th });
  const phi1 = crank.theta;
  const k0 = Math.min(340 / (z1 + z2 + 2.5), 240 / (z1 + 2));
  const k = zoom === 'zoom' ? Math.max(k0, 200 / (g.CH1 + g.CH2 + 6)) : k0;
  const ox = zoom === 'zoom' ? 180 - g.R1 * k : 10 + g.Rt1 * k, oy = 130;
  const S = (p: P2): P2 => [ox + p[0] * k, oy - p[1] * k];
  const ruota1 = contornoRuota(z1, 1, th, phi1, 5).map(S);
  const ruota2 = contornoRuota(z2, 1, th, rotRuota2(z1, z2, phi1), 5).map((p) => S([p[0] + g.i, p[1]]));
  const att = contatti(g, phi1);
  const L = (s: number) => S(puntoRetta(g.R1, th, s));
  const [H1, H2, Ap, Bp, Cp] = [L(-g.CH1), L(g.CH2), L(g.AC), L(-g.BC), L(0)];
  const e1 = L(-g.CH1 - 4), e2 = L(g.CH2 + 4);
  const O2 = S([g.i, 0]);
  const svgEl = (
    <svg viewBox="0 0 360 260" className="dw" role="img" aria-label="Due ruote a evolvente in presa" overflow="hidden">
      <path d={path(ruota1)} className="dw-soft" />
      <path d={path(ruota1)} className="dw-l" fill="none" />
      <path d={path(ruota2)} className="dw-soft" />
      <path d={path(ruota2)} className="dw-l" fill="none" />
      <circle cx={ox} cy={oy} r={g.Rf1 * k} className="dw-m" fill="none" />
      <circle cx={O2[0]} cy={O2[1]} r={g.Rf2 * k} className="dw-m" fill="none" />
      <circle cx={ox} cy={oy} r={g.R1 * k} className="dw-d" fill="none" />
      <circle cx={O2[0]} cy={O2[1]} r={g.R2 * k} className="dw-d" fill="none" />
      <line x1={ox} y1={oy} x2={O2[0]} y2={O2[1]} className="dw-d" />
      <line x1={e1[0]} y1={e1[1]} x2={e2[0]} y2={e2[1]} className="dw-a" />
      <line x1={Bp[0]} y1={Bp[1]} x2={Ap[0]} y2={Ap[1]} className="dw-f" strokeWidth={4} opacity={0.75} />
      {[['H₁', H1], ['H₂', H2]].map(([t, p]) => (
        <g key={t as string}>
          <circle cx={(p as P2)[0]} cy={(p as P2)[1]} r={3} className="dw-dot dw-dotl" />
          <text x={(p as P2)[0] + 6} y={(p as P2)[1] + (t === 'H₁' ? 12 : -6)} className="dw-t dw-tl">{t as string}</text>
        </g>
      ))}
      <text x={Ap[0] - 12} y={Ap[1] - 2} className="dw-t dw-tf">A</text>
      <text x={Bp[0] + 6} y={Bp[1] + 10} className="dw-t dw-tf">B</text>
      <circle cx={Cp[0]} cy={Cp[1]} r={3} className="dw-dot dw-dota" />
      <text x={Cp[0] + 5} y={Cp[1] + 13} className="dw-t dw-ta">C</text>
      {att.map((s, j) => {
        const p = L(s);
        return <circle key={j} cx={p[0]} cy={p[1]} r={5} className="dw-dot dw-dota" />;
      })}
      <circle cx={ox} cy={oy} r={3} className="dw-dot dw-dotl" />
      <circle cx={O2[0]} cy={O2[1]} r={3} className="dw-dot dw-dotl" />
      <text x={ox - 6} y={oy + 16} className="dw-t dw-tl">O₁</text>
      <text x={O2[0] + 4} y={O2[1] + 16} className="dw-t dw-tl">O₂</text>
    </svg>
  );
  const interf = g.interfA || g.interfB;
  const zm = zMin(z1 / z2, th);
  return (
    <Mech
      title={vista === 'interferenza' ? 'Interferenza: la testa della ruota grande non deve superare H₂' : 'Ingranamento: i contatti corrono sulla retta di pressione fra B e A'}
      svg={svgEl}
      side={
        <>
          <Toggle value={zoom} onChange={setZoom} label="inquadratura" options={[{ v: 'intera', t: 'ruote intere' }, { v: 'zoom', t: 'zoom su C' }]} />
          <Transport crank={crank} label="rotazione della ruota 1" />
          <Slider label="z₁ (ruota grande)" value={z1} min={12} max={80} step={1} onChange={(v) => setZ1(Math.max(v, z2))} />
          <Slider label="z₂ (ruota piccola)" value={z2} min={6} max={40} step={1} onChange={(v) => setZ2(Math.min(v, z1))} />
          <Slider label="θ" value={thDeg} min={14} max={30} step={0.5} onChange={setThDeg} unit="°" />
          <Readout
            rows={[
              ['τ = −z₁/z₂', fmt(g.tau, 4)],
              ['AB / m', fmt(g.AB, 4)],
              ['z_p = AB/(p cos θ)', fmt(g.zp, 3)],
              ['coppie in presa ora', String(att.length)],
              ['z₂ minimo (|τ| = z₁/z₂)', `${fmt(zm, 4)} → ${interoMinimo(zm)}`],
              ['interferenza', interf ? (g.interfA ? 'sì: A oltre H₂' : 'sì: B oltre H₁') : 'no'],
            ]}
          />
        </>
      }
      note="Ruota 1 motrice antioraria. In rosso il segmento dei contatti AB; i pallini sono le coppie di denti in contatto, distanti il passo di base p cos θ. Con interferenza A cade oltre H₂ e la testa della 1 entra nel fianco non evolvente della 2."
    />
  );
}

// ------------------------------------------------------------------ numero minimo di denti
/** z₂ minimo in funzione di |τ| = z₁/z₂ (pp. 167–168), con l'asintoto della dentiera 2/sin²θ e la formula errata di p. 168. */
function ZminAnim() {
  const [thDeg, setThDeg] = useState(20);
  const [tau, setTau] = useState(2);
  const [errata, setErrata] = useState<'no' | 'si'>('no');
  const th = thDeg * DEG;
  const W = 320, H = 220, x0 = 40, y0 = 190, tmax = 10, zmax = 40;
  const X = (t: number) => x0 + ((t - 1) / (tmax - 1)) * (W - x0 - 10);
  const Y = (z: number) => y0 - (Math.min(z, zmax) / zmax) * (y0 - 15);
  const curva = (fn: (t: number) => number) => {
    const pts: P2[] = [];
    for (let j = 0; j <= 90; j++) { const t = 1 + ((tmax - 1) * j) / 90; pts.push([X(t), Y(fn(t))]); }
    return path(pts, false);
  };
  const zd = zMinDentiera(th), zt = zMin(tau, th);
  const svgEl = (
    <svg viewBox={`0 0 ${W} ${H}`} className="dw" role="img" aria-label="Numero minimo di denti in funzione del rapporto">
      <line x1={x0} y1={y0} x2={W - 5} y2={y0} className="dw-l" />
      <line x1={x0} y1={y0} x2={x0} y2={10} className="dw-l" />
      {[0, 10, 20, 30, 40].map((z) => (
        <g key={z}>
          <line x1={x0 - 4} y1={Y(z)} x2={x0} y2={Y(z)} className="dw-m" />
          <text x={x0 - 8} y={Y(z) + 4} textAnchor="end" className="dw-t dw-tm" fontSize={11}>{z}</text>
        </g>
      ))}
      {[1, 2, 4, 6, 8, 10].map((t) => (
        <text key={t} x={X(t)} y={y0 + 14} textAnchor="middle" className="dw-t dw-tm" fontSize={11}>{t}</text>
      ))}
      <text x={W - 8} y={y0 - 6} textAnchor="end" className="dw-t dw-tm" fontSize={11}>|τ| = z₁/z₂</text>
      <line x1={x0} y1={Y(zd)} x2={W - 5} y2={Y(zd)} className="dw-d" />
      <text x={W - 8} y={Y(zd) - 5} textAnchor="end" className="dw-t dw-tm" fontSize={11}>2/sin²θ (dentiera)</text>
      <path d={curva((t) => zMin(t, th))} className="dw-a" strokeWidth={2.5} fill="none" />
      {errata === 'si' ? <path d={curva((t) => zMinComeDispensa(t, th))} className="dw-f" strokeDasharray="5 4" fill="none" /> : null}
      <circle cx={X(tau)} cy={Y(zt)} r={4.5} className="dw-dot dw-dota" />
    </svg>
  );
  return (
    <Mech
      title="Numero minimo di denti della ruota piccola: cresce con |τ| fino al limite della dentiera"
      svg={svgEl}
      side={
        <>
          <Slider label="|τ| = z₁/z₂" value={tau} min={1} max={10} step={0.1} onChange={setTau} />
          <Slider label="θ" value={thDeg} min={14} max={25} step={0.5} onChange={setThDeg} unit="°" />
          <Toggle value={errata} onChange={setErrata} label="formula di p. 168" options={[{ v: 'no', t: 'solo corretta' }, { v: 'si', t: 'mostra p. 168 (sin θ)' }]} />
          <Readout
            rows={[
              ['z₂ ≥ (formula esatta)', `${fmt(zt, 4)} → ${interoMinimo(zt)} denti`],
              ['dentiera 2/sin²θ', `${fmt(zd, 4)} → ${interoMinimo(zd)} denti`],
              ['come scrive p. 168 (NF-23)', fmt(zMinComeDispensa(tau, th), 3)],
            ]}
          />
        </>
      }
      note="Curva piena: z₂ ≥ 2/(√(τ² + (2|τ|+1) sin²θ) − |τ|). La formula della dentiera è un maggiorante per tutte le ruote esterne. Tratteggio rosso: la stessa formula con sin θ al posto di sin²θ (errore di p. 168)."
    />
  );
}

// ------------------------------------------------------------------ rendimento istantaneo
/** Rendimento istantaneo e potenza dissipata lungo il segmento dei contatti (pp. 169–170). */
function RendimentoAnim() {
  const [f, setF] = useState(0.1);
  const [thDeg, setThDeg] = useState(20);
  const crank = useCrank(0.15);
  const th = thDeg * DEG;
  const g = ingranaggio({ z1: 40, z2: 20, m: 1, theta: th });
  const base = { R1: g.R1, R2: g.R2, theta: th, f, C1: 100, w1: 10 };
  const s = -g.BC + (g.AB * crank.theta) / (2 * Math.PI);
  const W = 320, H = 220, x0 = 36, x1 = W - 12, yE0 = 100, yW0 = 205;
  const X = (ss: number) => x0 + ((ss + g.BC) / g.AB) * (x1 - x0);
  const etaMin = 0.9;
  const YE = (eta: number) => yE0 - ((eta - etaMin) / (1 - etaMin)) * 85;
  const Wmax = Math.max(Math.abs(contattoConAttrito({ ...base, s: -g.BC }).Wdiss), Math.abs(contattoConAttrito({ ...base, s: g.AC }).Wdiss)) || 1;
  const YW = (w: number) => yW0 - (w / Wmax) * 80;
  const ptsE: P2[] = [], ptsW: P2[] = [];
  for (let j = 0; j <= 80; j++) {
    const ss = -g.BC + (g.AB * j) / 80, r = contattoConAttrito({ ...base, s: ss });
    ptsE.push([X(ss), YE(r.eta)]);
    ptsW.push([X(ss), YW(Math.abs(r.Wdiss))]);
  }
  const r = contattoConAttrito({ ...base, s });
  const svgEl = (
    <svg viewBox={`0 0 ${W} ${H}`} className="dw" role="img" aria-label="Rendimento istantaneo e potenza dissipata lungo AB">
      <line x1={x0} y1={yE0} x2={x1} y2={yE0} className="dw-m" />
      <line x1={x0} y1={yW0} x2={x1} y2={yW0} className="dw-l" />
      <line x1={X(0)} y1={10} x2={X(0)} y2={yW0} className="dw-d" />
      <text x={X(-g.BC)} y={yW0 + 13} textAnchor="middle" className="dw-t dw-tl" fontSize={12}>B</text>
      <text x={X(0)} y={yW0 + 13} textAnchor="middle" className="dw-t dw-ta" fontSize={12}>C</text>
      <text x={X(g.AC)} y={yW0 + 13} textAnchor="middle" className="dw-t dw-tl" fontSize={12}>A</text>
      <text x={x0 + 2} y={YE(1) - 4} className="dw-t dw-tm" fontSize={11}>η = 1</text>
      <text x={x0 + 2} y={yE0 - 4} className="dw-t dw-tm" fontSize={11}>η = {etaMin}</text>
      <text x={x1} y={yW0 - 84} textAnchor="end" className="dw-t dw-tm" fontSize={11}>|W_diss|</text>
      <text x={(X(-g.BC) + X(0)) / 2} y={yW0 - 4} textAnchor="middle" className="dw-t dw-tm" fontSize={11}>accesso</text>
      <text x={(X(0) + X(g.AC)) / 2} y={yW0 - 4} textAnchor="middle" className="dw-t dw-tm" fontSize={11}>recesso</text>
      <path d={path(ptsE, false)} className="dw-a" strokeWidth={2.5} fill="none" />
      <path d={path(ptsW, false)} className="dw-f" strokeWidth={2.5} fill="none" />
      <circle cx={X(s)} cy={YE(r.eta)} r={4.5} className="dw-dot dw-dota" />
      <circle cx={X(s)} cy={YW(Math.abs(r.Wdiss))} r={4.5} className="dw-dot dw-dota" />
    </svg>
  );
  return (
    <Mech
      title="Rendimento istantaneo: 1 in C, cala verso A e B; la potenza persa cresce con la distanza da C"
      svg={svgEl}
      side={
        <>
          <Transport crank={crank} label="avanzamento del contatto" />
          <Slider label="f" value={f} min={0} max={0.2} step={0.01} onChange={setF} />
          <Slider label="θ" value={thDeg} min={14} max={25} step={0.5} onChange={setThDeg} unit="°" />
          <Readout
            rows={[
              ['fase', s < 0 ? 'accesso (B → C)' : 'recesso (C → A)'],
              ['x = CP (in moduli)', fmt(Math.abs(s), 3)],
              ['η istantaneo', fmt(r.eta, 5)],
              ['F_N / F_N liscio', fmt(r.N / (100 / g.Rf1), 4)],
              ['|V_rel| = (|ω₁|+|ω₂|) x', fmt(r.vrel, 3)],
              ['|W_diss| esatta / K x', r.Kx > 0 ? fmt(Math.abs(r.Wdiss) / r.Kx, 4) : '—'],
            ]}
          />
        </>
      }
      note="z₁ = 40, z₂ = 20, m = 1, C₁ = 100, ω₁ = 10 (ruota 1 motrice). Curva blu: η istantaneo (statica vettoriale con l'attrito opposto alla velocità relativa); curva rossa: |W_diss|, il diagramma a V di p. 170."
    />
  );
}

// ------------------------------------------------------------------ rotismo ordinario
/** Rotismo ordinario (pp. 171–173): composto con ruote solidali oppure con ruota oziosa; velocità e coppie con il segno. */
function RotismoAnim() {
  const [tipo, setTipo] = useState<'composto' | 'oziosa'>('composto');
  const [za, setZa] = useState(15);
  const [zb, setZb] = useState(36);
  const [zc, setZc] = useState(14);
  const [zd, setZd] = useState(40);
  const crank = useCrank(0.1);
  const t = crank.theta; // angolo della ruota a
  const ing = tipo === 'composto'
    ? [{ zMotrice: za, zCondotta: zb }, { zMotrice: zc, zCondotta: zd }]
    : [{ zMotrice: za, zCondotta: zb }, { zMotrice: zb, zCondotta: zc }];
  const r = rotismoOrdinario(ing, 10, 1);
  const tot = tipo === 'composto' ? za + zb + zc + zd : za + 2 * zb + zc;
  const k = Math.min(330 / tot, 200 / (2 * Math.max(za, zb, zc, zd)));
  const y = 115;
  type Ruota = { x: number; z: number; ang: number; nome: string; tr?: boolean };
  const ruote: Ruota[] = [];
  const xa = 15 + (za * k) / 2;
  ruote.push({ x: xa, z: za, ang: t, nome: 'a' });
  const xb = xa + ((za + zb) * k) / 2;
  ruote.push({ x: xb, z: zb, ang: t * r.taus[0], nome: 'b' });
  if (tipo === 'composto') {
    ruote.push({ x: xb, z: zc, ang: t * r.taus[0], nome: 'c' });
    ruote.push({ x: xb + ((zc + zd) * k) / 2, z: zd, ang: t * r.tau, nome: 'd', tr: true });
  } else ruote.push({ x: xb + ((zb + zc) * k) / 2, z: zc, ang: t * r.tau, nome: 'c' });
  const svgEl = (
    <svg viewBox="0 0 360 230" className="dw" role="img" aria-label="Rotismo ordinario">
      <line x1={5} y1={y} x2={355} y2={y} className="dw-d" />
      {ruote.map((w, j) => {
        const R = (w.z * k) / 2;
        return (
          <g key={j}>
            <circle cx={w.x} cy={y} r={R} className={w.tr ? 'dw-d' : 'dw-l'} fill="none" />
            {[0, 1, 2].map((q) => {
              const a = -w.ang + (q * 2 * Math.PI) / 3; // angolo matematico antiorario → y SVG verso il basso
              return <line key={q} x1={w.x} y1={y} x2={w.x + R * 0.9 * Math.cos(a)} y2={y + R * 0.9 * Math.sin(a)} className={j % 2 ? 'dw-v' : 'dw-a'} strokeWidth={2} />;
            })}
            <text x={w.x} y={w.nome === 'c' && tipo === 'composto' ? y + R + 12 : y - R - 6} textAnchor="middle" className="dw-t dw-tl" fontSize={13}>{w.nome}</text>
          </g>
        );
      })}
    </svg>
  );
  const nomi = tipo === 'composto' ? ['τ_ab = −z_a/z_b', 'τ_cd = −z_c/z_d'] : ['τ_ab = −z_a/z_b', 'τ_bc = −z_b/z_c'];
  return (
    <Mech
      title={tipo === 'composto' ? 'Rotismo composto: b e c solidali, i rapporti si moltiplicano' : 'Ruota oziosa: z_b si semplifica, cambia solo il verso'}
      svg={svgEl}
      side={
        <>
          <Toggle value={tipo} onChange={setTipo} label="schema" options={[{ v: 'composto', t: 'a–b, c–d (b ≡ c)' }, { v: 'oziosa', t: 'a–b–c (b oziosa)' }]} />
          <Transport crank={crank} label="rotazione della ruota a" />
          <Slider label="z_a" value={za} min={10} max={40} step={1} onChange={setZa} />
          <Slider label="z_b" value={zb} min={10} max={60} step={1} onChange={setZb} />
          <Slider label="z_c" value={zc} min={10} max={60} step={1} onChange={setZc} />
          {tipo === 'composto' ? <Slider label="z_d" value={zd} min={10} max={60} step={1} onChange={setZd} /> : null}
          <Readout
            rows={[
              [nomi[0], fmt(r.taus[0], 4)],
              [nomi[1], fmt(r.taus[1], 4)],
              ['τ globale = ω_u/ω_a', fmt(r.tau, 4)],
              ['coppia d\'uscita con C_a = 10 N·m', `${fmt(r.Cout, 4)} N·m`],
            ]}
          />
        </>
      }
      note="Velocità angolari con verso positivo comune (antiorario). C_u = −C_a/τ dalla T.F.V. in regime senza perdite: con τ > 0 la coppia d'uscita è opposta a quella d'ingresso."
    />
  );
}

export const MECCANISMI_C5A: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c5a-evolvente': EvolventeAnim,
  'c5a-ingranamento': IngranamentoAnim,
  'c5a-zmin': ZminAnim,
  'c5a-rendimento': RendimentoAnim,
  'c5a-rotismo': RotismoAnim,
};
