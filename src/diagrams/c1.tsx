/**
 * Meccanismi animati del capitolo C1 (registrati in src/diagrams/registry.tsx). Cinematica e statica in src/engine/c1.ts:
 * qui si disegna e basta. Manovellismo con CIR e punti morti, glifo con rapido ritorno, pistone oleodinamico con
 * Coriolis, asta con due pattini (velocità lungo l'asta e, con params.dinamica, forze d'inerzia).
 */
import { useState, type ComponentType, type ReactNode } from 'react';
import { astaPattini, estremiGlifo, glifo, manovellismo, pistone, staticaManovellismo, sub, wedge, type V2 } from '../engine/c1';
import { fmt } from '../engine/num';
import { Arrow, Mech, Readout, Slider, Toggle, Transport, useCrank } from './anim';

const TAU = 2 * Math.PI;
const deg = (r: number) => (r * 180) / Math.PI;
const gradi = (r: number, d = 1) => `${fmt(deg(r), d + 2)}°`;

/** arco con freccia (rotazione) in coordinate schermo; verso: +1 antiorario, −1 orario (come appare sullo schermo) */
function Giro({ cx, cy, r, verso, c = 'v', label }: { cx: number; cy: number; r: number; verso: number; c?: string; label?: string }) {
  if (verso === 0) return label ? <text x={cx} y={cy - r - 4} textAnchor="middle" className="dw-t dw-tm" fontSize={12}>{label}</text> : null;
  const a0 = verso > 0 ? -0.3 : 3.4, a1 = verso > 0 ? 2.2 : 0.9; // radianti, angoli matematici
  const p = (a: number) => [cx + r * Math.cos(a), cy - r * Math.sin(a)] as const;
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  const sweep = verso > 0 ? 0 : 1;
  const [xt, yt] = p(a1 - verso * 0.25);
  return (
    <g>
      <path d={`M${x0},${y0} A${r},${r} 0 0 ${sweep} ${x1},${y1}`} className={`dw-${c}`} />
      <Arrow x1={xt} y1={yt} x2={x1} y2={y1} c={c} w={2} size={7} />
      {label ? <text x={cx + (r + 12) * Math.cos(a1 + 0.4)} y={cy - (r + 12) * Math.sin(a1 + 0.4)} textAnchor="middle" className={`dw-t dw-t${c === 'a' ? 'a' : 'v'}`} fontSize={12}>{label}</text> : null}
    </g>
  );
}

/** piccolo grafico y(x) con più serie e un indicatore sul valore corrente */
function MiniPlot({ serie, xMark, yLabel, xLabel, h = 110 }: { serie: { pts: [number, number][]; c: string; dash?: boolean }[]; xMark?: number; yLabel: string; xLabel: string; h?: number }) {
  const W = 400, H = h, m = { l: 34, r: 8, t: 10, b: 20 };
  const all = serie.flatMap((s) => s.pts);
  const x0 = Math.min(...all.map((p) => p[0])), x1 = Math.max(...all.map((p) => p[0]));
  let y0 = Math.min(...all.map((p) => p[1])), y1 = Math.max(...all.map((p) => p[1]));
  if (y1 - y0 < 1e-12) { y0 -= 1; y1 += 1; }
  const X = (x: number) => m.l + ((x - x0) / (x1 - x0)) * (W - m.l - m.r);
  const Y = (y: number) => m.t + (1 - (y - y0) / (y1 - y0)) * (H - m.t - m.b);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="dw" role="img" aria-label={`grafico di ${yLabel} in funzione di ${xLabel}`}>
      <line x1={m.l} y1={m.t} x2={m.l} y2={H - m.b} className="dw-m" />
      {y0 < 0 && y1 > 0 ? <line x1={m.l} y1={Y(0)} x2={W - m.r} y2={Y(0)} className="dw-m" /> : <line x1={m.l} y1={H - m.b} x2={W - m.r} y2={H - m.b} className="dw-m" />}
      {serie.map((s, k) => (
        <polyline key={k} points={s.pts.map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ')} className={`dw-${s.c}`} strokeDasharray={s.dash ? '5 4' : undefined} />
      ))}
      {xMark != null ? <line x1={X(xMark)} y1={m.t} x2={X(xMark)} y2={H - m.b} className="dw-d" /> : null}
      <text x={4} y={m.t + 6} className="dw-t dw-tm" fontSize={11}>{yLabel}</text>
      <text x={W - m.r} y={H - 4} textAnchor="end" className="dw-t dw-tm" fontSize={11}>{xLabel}</text>
    </svg>
  );
}

function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <polygon points={`${x},${y} ${x - 9},${y + 14} ${x + 9},${y + 14}`} className="dw-l" />
      <line x1={x - 14} y1={y + 14} x2={x + 14} y2={y + 14} className="dw-g" />
      <circle cx={x} cy={y} r={3.5} className="dw-fill" />
    </g>
  );
}
const Hinge = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r={4} className="dw-fill" />;
const Label = ({ x, y, c = 'l', children, anchor = 'middle', size }: { x: number; y: number; c?: string; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; size?: number }) => (
  <text x={x} y={y} textAnchor={anchor} dominantBaseline="middle" className={`dw-t dw-t${c}`} fontSize={size}>{children}</text>
);

// ------------------------------------------------------------------ manovellismo di spinta (pp. 25–27, 31–32, 47–49)
function ManovellismoAnim() {
  const crank = useCrank(0.12);
  const [lam, setLam] = useState(1 / 3);
  const [vista, setVista] = useState<'cinematica' | 'statica'>('cinematica');
  const [f, setF] = useState(0);
  const r = 0.03, l = r / lam, w = (1000 * TAU) / 60; // esempio di p. 32
  const th = crank.theta;
  const m = manovellismo({ r, l, theta: th, omega1: w });
  const st = staticaManovellismo({ r, l, theta: th, F: 1000, f });
  const k = 290 / (r + l); // px per metro
  const A: V2 = [70, 150];
  const S = (p: V2): V2 => [A[0] + k * p[0], A[1] - k * p[1]];
  const [Bx, By] = S(m.B), [Cx, Cy] = S(m.C);
  const vb = 46, vScale = vb / (r * w);
  const K = m.K ? S(m.K) : null;
  const Kin = K && K[1] > -40 && K[1] < 300;
  const pm = Math.abs(Math.sin(th)) < 0.02 ? (Math.cos(th) > 0 ? 'PMS (θ = 0)' : 'PMI (θ = π)') : '';
  const serie = (fn: (t: number) => number) => Array.from({ length: 181 }, (_, i) => [(i * 360) / 180, fn((i * TAU) / 180)] as [number, number]);
  const ex = serie((t) => manovellismo({ r, l, theta: t, omega1: w }).VC);
  const ap = serie((t) => manovellismo({ r, l, theta: t, omega1: w }).VCapprox);
  const u = sub(m.C, m.B);
  const ul = Math.hypot(u[0], u[1]);
  const svgEl = (
    <>
      <svg viewBox="0 0 400 250" className="dw" role="img" aria-label="Manovellismo di spinta animato con il CIR della biella">
        <line x1={20} y1={A[1]} x2={390} y2={A[1]} className="dw-d" />
        <line x1={A[0] + k * (l - r) - 30} y1={A[1] - 18} x2={A[0] + k * (l + r) + 30} y2={A[1] - 18} className="dw-g" />
        <line x1={A[0] + k * (l - r) - 30} y1={A[1] + 18} x2={A[0] + k * (l + r) + 30} y2={A[1] + 18} className="dw-g" />
        <circle cx={A[0]} cy={A[1]} r={k * r} className="dw-d" />
        {K && Kin && vista === 'cinematica' ? (
          <g>
            <line x1={A[0]} y1={A[1]} x2={K[0]} y2={K[1]} className="dw-d" />
            <line x1={Cx} y1={Cy} x2={K[0]} y2={K[1]} className="dw-d" />
            <circle cx={K[0]} cy={K[1]} r={4} className="dw-dot dw-dota" />
            <Label x={K[0] + 12} y={K[1]} c="a">K</Label>
          </g>
        ) : null}
        <rect x={Cx - 20} y={Cy - 15} width={40} height={30} className="dw-soft" />
        <rect x={Cx - 20} y={Cy - 15} width={40} height={30} className="dw-l" />
        <line x1={A[0]} y1={A[1]} x2={Bx} y2={By} className="dw-l" strokeWidth={5} />
        <line x1={Bx} y1={By} x2={Cx} y2={Cy} className="dw-l" strokeWidth={4} />
        <Pin x={A[0]} y={A[1]} />
        <Hinge x={Bx} y={By} />
        <Hinge x={Cx} y={Cy} />
        <Label x={A[0] - 14} y={A[1] - 12}>A</Label>
        <Label x={Bx} y={By - 16}>B</Label>
        <Label x={Cx} y={Cy + 28}>C</Label>
        {vista === 'cinematica' ? (
          <g>
            <Arrow x1={Bx} y1={By} x2={Bx + vScale * m.VB[0]} y2={By - vScale * m.VB[1]} c="v" />
            <Arrow x1={Cx} y1={Cy} x2={Cx + vScale * m.VC} y2={Cy} c="v" />
            <Label x={Bx + vScale * m.VB[0] - 14} y={By - vScale * m.VB[1] - 10} c="v">V_B</Label>
            {Math.abs(m.VC) > 1e-6 ? <Label x={Cx + vScale * m.VC + (m.VC < 0 ? -16 : 16)} y={Cy - 10} c="v">V_C</Label> : null}
            <Giro cx={(Bx + Cx) / 2} cy={(By + Cy) / 2 - 30} r={14} verso={Math.abs(m.omega2) < 1e-6 ? 0 : Math.sign(m.omega2)} c="a" label={Math.abs(m.omega2) < 1e-6 ? 'ω₂ = 0' : 'ω₂'} />
          </g>
        ) : (
          <g>
            <Arrow x1={Cx + 60} y1={Cy} x2={Cx + 22} y2={Cy} c="f" />
            <Label x={Cx + 52} y={Cy - 12} c="f">F</Label>
            <Arrow x1={Bx + (u[0] / ul) * 34} y1={By - (u[1] / ul) * 34} x2={Bx + (u[0] / ul) * 5} y2={By - (u[1] / ul) * 5} c="f" />
            <Label x={Bx + (u[0] / ul) * 36 + 10} y={By - (u[1] / ul) * 36} c="f" size={12}>F₂,₁</Label>
            {Math.abs(st.N) > 1e-6 ? <Arrow x1={Cx} y1={Cy + Math.sign(st.N) * 50} x2={Cx} y2={Cy + Math.sign(st.N) * 17} c="f" /> : null}
            <Label x={Cx + 22} y={Cy + Math.sign(st.N || 1) * 42} c="f" size={12}>R₃</Label>
            <Giro cx={A[0]} cy={A[1]} r={20} verso={Math.abs(st.C1) < 1e-6 ? 0 : Math.sign(st.C1)} c="a" label={Math.abs(st.C1) < 1e-6 ? 'C₁ = 0' : 'C₁'} />
          </g>
        )}
        <Giro cx={A[0]} cy={A[1]} r={11} verso={1} c="v" />
        {pm ? <Label x={200} y={232} c="a">{pm}: K ≡ C, V_C = 0, braccio nullo</Label> : null}
      </svg>
      <MiniPlot serie={[{ pts: ex, c: 'v' }, { pts: ap, c: 'a', dash: true }]} xMark={(deg(th) + 360) % 360} yLabel="V_C [m/s]" xLabel="θ [°]  (— esatta, - - approssimata)" />
    </>
  );
  return (
    <Mech
      title="Manovellismo di spinta: CIR della biella, punti morti, velocità del pistone"
      svg={svgEl}
      side={
        <>
          <Transport crank={crank} />
          <Toggle value={vista} onChange={setVista} label="vista" options={[{ v: 'cinematica', t: 'velocità e CIR' }, { v: 'statica', t: 'forze (F = 1 kN)' }]} />
          <Slider label="λ = r/l" value={lam} min={0.15} max={0.45} step={0.01} onChange={setLam} show={(x) => fmt(x, 2)} />
          {vista === 'statica' ? <Slider label="attrito pistone–guida f" value={f} min={0} max={0.3} step={0.01} onChange={setF} show={(x) => fmt(x, 2)} /> : null}
          {vista === 'cinematica' ? (
            <Readout
              rows={[
                ['angolo di biella γ', gradi(m.gamma)],
                ['x_C', `${fmt(m.xC, 4)} m`],
                ['V_C esatta', `${fmt(m.VC, 3)} m/s`],
                ['V_C approssimata (p. 32)', `${fmt(m.VCapprox, 3)} m/s`],
                ['a_C esatta', `${fmt(m.aC, 4)} m/s²`],
                ['ω₂ (biella)', `${fmt(m.omega2, 3)} rad/s ${Math.abs(m.omega2) < 1e-6 ? '' : m.omega2 < 0 ? 'oraria' : 'antioraria'}`],
                ['CIR K della biella', m.cirAllInfinito ? 'all\'infinito (biella trasla)' : Kin ? 'nel disegno' : 'fuori dal disegno'],
              ]}
            />
          ) : (
            <Readout
              rows={[
                ['spinta in biella P', `${fmt(st.P, 4)} N`],
                ['reazione della guida N', `${fmt(st.N, 3)} N`],
                ['attrito T = f N', `${fmt(st.T, 3)} N`],
                ['braccio b = r sin(θ+γ)', `${fmt(st.braccio * 1000, 3)} mm`],
                ['coppia C₁ (equilibrante)', `${fmt(st.C1, 3)} N·m ${Math.abs(st.C1) < 1e-6 ? '' : st.C1 < 0 ? 'oraria' : 'antioraria'}`],
              ]}
            />
          )}
        </>
      }
      note="Dati dell'esempio di p. 32: r = 0,03 m, 1000 giri/min (con λ = 1/3: a_C(0) ≈ −438,6 m/s², a_C(π) ≈ +219,3 m/s²). Ai punti morti il pistone si ferma, ma la biella ruota (ω₂ = ∓λω₁). A θ = 90° la biella trasla. Con attrito: deduzione (NF-108)."
    />
  );
}

// ------------------------------------------------------------------ glifo oscillante (pp. 64–65; rapido ritorno dedotto)
function GlifoAnim() {
  const crank = useCrank(0.1);
  const [rd, setRd] = useState(0.5);
  const d = 1, r = rd * d, L = 2.2, l3 = 1.2, yE = -1 + 2.2 * 0.97, w = 1, F = 100;
  const th = crank.theta;
  const G = glifo({ r, d, L, l3, yE, theta: th, omega1: w, F });
  const e = estremiGlifo(r, d);
  const k = 68, X0 = 222, Y0 = 196;
  const S = (p: V2): V2 => [X0 + k * p[0], Y0 - k * p[1]];
  const [A, B, C, D, E] = [G.A, G.B, G.C, G.D, G.E].map(S);
  // fase: lenta fra −δ e π + δ (B lontano da C), rapida nel resto
  const rel = ((th - e.thDestra) % TAU + TAU) % TAU;
  const lenta = rel < e.lenta;
  const arcPath = (a0: number, a1: number, R: number) => {
    const p = (a: number) => [A[0] + R * Math.cos(a), A[1] - R * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${x0},${y0} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 0 ${x1},${y1}`;
  };
  const ext = (psi: number) => S([L * Math.cos(psi), -d + L * Math.sin(psi)]);
  const [e1, e2] = [ext(Math.PI / 2 - e.delta), ext(Math.PI / 2 + e.delta)];
  const u: V2 = [Math.cos(G.psi), -Math.sin(G.psi)], n: V2 = [-u[1] * 4, u[0] * 4];
  const pts = Array.from({ length: 241 }, (_, i) => {
    const t = e.thDestra + (i * TAU) / 240;
    return [(i * 360) / 240, glifo({ r, d, L, l3, yE, theta: t, omega1: w }).E[0]] as [number, number];
  });
  const iL = Math.round((e.lenta / TAU) * 240);
  const svgEl = (
    <>
      <svg viewBox="0 0 400 300" className="dw" role="img" aria-label="Glifo oscillante animato con corsa lenta e ritorno rapido">
        <circle cx={A[0]} cy={A[1]} r={k * r} className="dw-d" />
        <path d={arcPath(-e.delta, Math.PI + e.delta, k * r + 8)} className="dw-a" strokeWidth={lenta ? 4 : 2} />
        <path d={arcPath(Math.PI + e.delta, TAU - e.delta, k * r + 8)} className="dw-v" strokeWidth={lenta ? 2 : 4} />
        <line x1={C[0]} y1={C[1]} x2={e1[0]} y2={e1[1]} className="dw-d" />
        <line x1={C[0]} y1={C[1]} x2={e2[0]} y2={e2[1]} className="dw-d" />
        <line x1={C[0] + n[0]} y1={C[1] + n[1]} x2={D[0] + n[0]} y2={D[1] + n[1]} className="dw-l" />
        <line x1={C[0] - n[0]} y1={C[1] - n[1]} x2={D[0] - n[0]} y2={D[1] - n[1]} className="dw-l" />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="dw-l" strokeWidth={5} />
        <line x1={D[0]} y1={D[1]} x2={E[0]} y2={E[1]} className="dw-l" strokeWidth={4} />
        <line x1={10} y1={E[1] - 12} x2={390} y2={E[1] - 12} className="dw-g" />
        <line x1={10} y1={E[1] + 12} x2={390} y2={E[1] + 12} className="dw-g" />
        <rect x={E[0] - 18} y={E[1] - 10} width={36} height={20} className="dw-soft" />
        <rect x={E[0] - 18} y={E[1] - 10} width={36} height={20} className="dw-l" />
        <Arrow x1={E[0] - 58} y1={E[1]} x2={E[0] - 20} y2={E[1]} c="f" />
        <Label x={E[0] - 52} y={E[1] - 13} c="f">F</Label>
        <Pin x={A[0]} y={A[1]} />
        <Pin x={C[0]} y={C[1]} />
        <Hinge x={B[0]} y={B[1]} />
        <Hinge x={D[0]} y={D[1]} />
        <Hinge x={E[0]} y={E[1]} />
        <Label x={A[0] - 14} y={A[1] - 10}>A</Label>
        <Label x={C[0] - 14} y={C[1] - 8}>C</Label>
        <Label x={B[0] + 12} y={B[1] - 8}>B</Label>
        <Label x={D[0] + 12} y={D[1] - 8}>D</Label>
        <Label x={A[0]} y={A[1] - k * r - 22} c="a" size={12}>π + 2δ</Label>
        <Label x={A[0] + k * r + 28} y={A[1] + k * r * 0.7 + 8} c="v" size={12}>π − 2δ</Label>
        <Label x={200} y={290} c={lenta ? 'a' : 'v'}>{lenta ? 'corsa lenta: B lontano da C' : 'ritorno rapido: B vicino a C'}</Label>
      </svg>
      <MiniPlot
        serie={[{ pts: pts.slice(0, iL + 1), c: 'a' }, { pts: pts.slice(iL), c: 'v' }]}
        xMark={(rel * 360) / TAU}
        yLabel="x_E (corsoio)"
        xLabel="rotazione della manovella dalla posizione estrema [°]"
      />
    </>
  );
  return (
    <Mech
      title="Glifo oscillante: stessa corsa, angoli di manovella diversi"
      svg={svgEl}
      side={
        <>
          <Transport crank={crank} />
          <Slider label="r/d" value={rd} min={0.2} max={0.8} step={0.01} onChange={setRd} show={(x) => fmt(x, 2)} />
          <Readout
            rows={[
              ['δ = arcsin(r/d)', gradi(e.delta)],
              ['arco corsa lenta π + 2δ', gradi(e.lenta)],
              ['arco ritorno π − 2δ', gradi(e.rapida)],
              ['t_lenta / t_rapida', fmt(e.rapporto, 3)],
              ['ω₂ / ω₁ (glifo)', fmt(G.omega2 / w, 3)],
              ['V_rel del perno / (ω₁ r)', fmt(G.Vrel / (w * r), 3)],
              ['C₁ con F = 100 N (forze vive)', `${fmt(G.C1, 3)} N·m`],
            ]}
          />
        </>
      }
      note="ω₁ costante: il tempo è proporzionale all'angolo di manovella. Agli estremi (tratteggiati, tangenti alla circonferenza di B) il glifo si ferma: V_B è tutta relativa. La coppia viene da F·V_E + C₁ω₁ = 0 (masse e attrito trascurati, p. 65)."
    />
  );
}

// ------------------------------------------------------------------ pistone oleodinamico del ribaltabile (pp. 36–39)
function PistoneAnim() {
  const crank = useCrank(0.08);
  const [Vrel, setVrel] = useState(0.12);
  const [vista, setVista] = useState<'velocita' | 'accelerazioni'>('velocita');
  const pmin = (6 * Math.PI) / 180, pmax = (50 * Math.PI) / 180;
  const ph = pmin + ((pmax - pmin) * (1 - Math.cos(crank.theta))) / 2;
  const g = { xA: 1.6, yA: -0.3, b: 2.2 };
  const P = pistone({ ...g, phi3: ph, Vrel });
  const k = 105, X0 = 40, Y0 = 228;
  const S = (p: V2): V2 => [X0 + k * p[0], Y0 - k * p[1]];
  const O = S(P.O), A = S(P.A), B = S(P.B);
  const e: V2 = [Math.cos(ph), Math.sin(ph)], nn: V2 = [-Math.sin(ph), Math.cos(ph)];
  const corner = (s: number, h: number) => S([s * e[0] + h * nn[0], s * e[1] + h * nn[1]]);
  const cass = [corner(0, 0), corner(3.2, 0), corner(3.2, 0.5), corner(0, 0.5)];
  const cyl = (s: number, h: number) => S([P.A[0] + s * P.u[0] + h * P.n[0], P.A[1] + s * P.u[1] + h * P.n[1]]);
  const Lc = 0.6;
  const body = [cyl(0, 0.09), cyl(Lc, 0.09), cyl(Lc, -0.09), cyl(0, -0.09)];
  const rodStart = cyl(Lc, 0);
  const sv = 70 / Math.max(Math.hypot(...P.VB), 1e-9);
  const V = (v: V2, s: number): V2 => [v[0] * s, -v[1] * s];
  const vr = V([P.u[0] * Vrel, P.u[1] * Vrel], sv), vt = V(P.Vt, sv), vb = V(P.VB, sv);
  const BA = sub(P.B, P.A);
  const acc = { cen: V([-(P.omega1 ** 2) * BA[0], -(P.omega1 ** 2) * BA[1]], 1), tan: V(wedge(P.omega1dot, BA), 1), cor: V(P.aCor, 1) };
  const amax = Math.max(Math.hypot(...acc.cen), Math.hypot(...acc.tan), Math.hypot(...acc.cor), 1e-9);
  const sa = 70 / amax;
  const sc = (v: V2): V2 => [v[0] * sa, v[1] * sa];
  const [c1, t1, k1] = [sc(acc.cen), sc(acc.tan), sc(acc.cor)];
  const svgEl = (
    <svg viewBox="0 0 400 290" className="dw" role="img" aria-label="Pistone oleodinamico del cassone ribaltabile con velocità e accelerazione di Coriolis">
      <line x1={10} y1={Y0 + 16} x2={390} y2={Y0 + 16} className="dw-g" />
      <polygon points={cass.map((p) => p.join(',')).join(' ')} className="dw-soft" />
      <polygon points={cass.map((p) => p.join(',')).join(' ')} className="dw-l" />
      <polygon points={body.map((p) => p.join(',')).join(' ')} className="dw-soft" />
      <polygon points={body.map((p) => p.join(',')).join(' ')} className="dw-l" />
      <line x1={rodStart[0]} y1={rodStart[1]} x2={B[0]} y2={B[1]} className="dw-l" strokeWidth={4} />
      <Pin x={O[0]} y={O[1]} />
      <Pin x={A[0]} y={A[1]} />
      <Hinge x={B[0]} y={B[1]} />
      <Label x={O[0] - 4} y={O[1] - 14}>O</Label>
      <Label x={A[0] + 16} y={A[1] + 2}>A</Label>
      <Label x={B[0] - 16} y={B[1] + 4}>B</Label>
      {vista === 'velocita' ? (
        <g>
          <Arrow x1={B[0]} y1={B[1]} x2={B[0] + vr[0]} y2={B[1] + vr[1]} c="a" />
          <Arrow x1={B[0] + vr[0]} y1={B[1] + vr[1]} x2={B[0] + vr[0] + vt[0]} y2={B[1] + vr[1] + vt[1]} c="v" />
          <Arrow x1={B[0]} y1={B[1]} x2={B[0] + vb[0]} y2={B[1] + vb[1]} c="f" />
          <Label x={B[0] + vr[0] + 26} y={B[1] + vr[1] + 10} c="a" size={12}>V_rel</Label>
          <Label x={B[0] + vb[0] - 18} y={B[1] + vb[1] - 12} c="f" size={12}>V_B</Label>
          <Label x={B[0] + vr[0] + vt[0] / 2 + 44} y={B[1] + vr[1] + vt[1] / 2 - 10} c="v" size={12}>ω₁∧(B−A)</Label>
        </g>
      ) : (
        <g>
          <Arrow x1={B[0]} y1={B[1]} x2={B[0] + c1[0]} y2={B[1] + c1[1]} c="m" />
          <Arrow x1={B[0] + c1[0]} y1={B[1] + c1[1]} x2={B[0] + c1[0] + t1[0]} y2={B[1] + c1[1] + t1[1]} c="v" />
          <Arrow x1={B[0] + c1[0] + t1[0]} y1={B[1] + c1[1] + t1[1]} x2={B[0] + c1[0] + t1[0] + k1[0]} y2={B[1] + c1[1] + t1[1] + k1[1]} c="a" w={3.5} />
          <Label x={B[0] + c1[0] + t1[0] + k1[0] + 14} y={B[1] + c1[1] + t1[1] + k1[1] - 8} c="a" size={12}>2ω₁∧V_rel</Label>
          <Label x={B[0] + c1[0] / 2 + 30} y={B[1] + c1[1] / 2} c="l" size={12}>−ω₁²(B−A)</Label>
        </g>
      )}
      <Giro cx={O[0] + 4} cy={O[1] - 4} r={30} verso={Math.sign(P.omega3)} c="v" label="ω₃" />
    </svg>
  );
  return (
    <Mech
      title="Pistone oleodinamico: trascinamento, relativa e Coriolis"
      svg={svgEl}
      side={
        <>
          <Transport crank={crank} label="fase di sollevamento" />
          <Toggle value={vista} onChange={setVista} label="vista" options={[{ v: 'velocita', t: 'velocità' }, { v: 'accelerazioni', t: 'accelerazioni' }]} />
          <Slider label="V_rel = q/S" value={Vrel} min={0.04} max={0.3} step={0.01} onChange={setVrel} unit="m/s" show={(x) => fmt(x, 2)} />
          <Readout
            rows={[
              ['angolo del cassone φ₃', gradi(ph)],
              ['ω₁ (cilindro)', `${fmt(P.omega1, 3)} rad/s`],
              ['ω₃ (cassone)', `${fmt(P.omega3, 3)} rad/s`],
              ['|a_cc| = 2ω₁V_rel', `${fmt(2 * Math.abs(P.omega1) * Vrel, 3)} m/s²`],
              ['ω̇₁', `${fmt(P.omega1dot, 3)} rad/s²`],
              ['ω̇₃', `${fmt(P.omega3dot, 3)} rad/s²`],
            ]}
          />
        </>
      }
      note="Portata costante: a_rel = 0. Riferimento mobile sul cilindro 1, punto B dello stelo. Raddoppiando q raddoppiano V_rel e ω₁: Coriolis quadruplica. Geometria: OB = 2,2 m, A = (1,6; −0,3) m."
    />
  );
}

// ------------------------------------------------------------------ asta con due pattini (pp. 21–24 e 56–60)
function AstaAnim({ params }: { params?: Record<string, number | string> }) {
  const dinamica = !!params?.dinamica;
  const crank = useCrank(0.06);
  const [VA, setVA] = useState(1);
  const amax = (70 * Math.PI) / 180, amin = (12 * Math.PI) / 180;
  const al = amax - ((amax - amin) * crank.theta) / TAU;
  const Lr = 1, M = 5;
  const s = astaPattini({ L: Lr, alpha: al, VA, M, IG: (M * Lr * Lr) / 12 });
  const k = 220, X0 = 80, Y0 = 240;
  const S = (p: V2): V2 => [X0 + k * p[0], Y0 - k * p[1]];
  const A = S(s.A), B = S(s.B), K = S(s.K), G = S([(s.A[0] + s.B[0]) / 2, (s.A[1] + s.B[1]) / 2]);
  const sv = Math.min(40 / VA, 150 / Math.max(...[0, 1].map((t) => Math.hypot(...s.vel(t)))));
  const punti = Array.from({ length: 8 }, (_, i) => i / 7);
  const Pm = S([s.A[0] + s.sMin * (s.B[0] - s.A[0]), s.A[1] + s.sMin * (s.B[1] - s.A[1])]);
  const fs = 3; // px per newton
  const svgEl = (
    <svg viewBox="0 0 400 300" className="dw" role="img" aria-label="Asta con due pattini: CIR e velocità lungo l'asta">
      <line x1={X0 - 12} y1={10} x2={X0 - 12} y2={Y0 + 12} className="dw-g" />
      <line x1={X0 + 12} y1={10} x2={X0 + 12} y2={Y0 - 14} className="dw-g" />
      <line x1={X0 + 12} y1={Y0 - 12} x2={390} y2={Y0 - 12} className="dw-g" />
      <line x1={X0 - 12} y1={Y0 + 12} x2={390} y2={Y0 + 12} className="dw-g" />
      {!dinamica ? (
        <g>
          <line x1={A[0]} y1={A[1]} x2={K[0]} y2={K[1]} className="dw-d" />
          <line x1={B[0]} y1={B[1]} x2={K[0]} y2={K[1]} className="dw-d" />
          <line x1={K[0]} y1={K[1]} x2={Pm[0]} y2={Pm[1]} className="dw-d" />
          <circle cx={K[0]} cy={K[1]} r={4} className="dw-dot dw-dota" />
          <Label x={K[0] + 12} y={K[1] - 8} c="a">K</Label>
          <Giro cx={K[0]} cy={K[1]} r={16} verso={1} c="a" label="ω" />
        </g>
      ) : null}
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} className="dw-l" strokeWidth={4} />
      <rect x={A[0] - 10} y={A[1] - 14} width={20} height={28} className="dw-soft" />
      <rect x={A[0] - 10} y={A[1] - 14} width={20} height={28} className="dw-l" />
      <rect x={B[0] - 14} y={B[1] - 10} width={28} height={20} className="dw-soft" />
      <rect x={B[0] - 14} y={B[1] - 10} width={28} height={20} className="dw-l" />
      <Hinge x={A[0]} y={A[1]} />
      <Hinge x={B[0]} y={B[1]} />
      <Label x={A[0] - 22} y={A[1]}>A</Label>
      <Label x={B[0]} y={B[1] + 24}>B</Label>
      {!dinamica
        ? punti.map((t, i) => {
            const P = S([s.A[0] + t * (s.B[0] - s.A[0]), s.A[1] + t * (s.B[1] - s.A[1])]);
            const v = s.vel(t);
            return <Arrow key={i} x1={P[0]} y1={P[1]} x2={P[0] + sv * v[0]} y2={P[1] - sv * v[1]} c="v" w={2} size={7} />;
          })
        : (
          <g>
            <circle cx={G[0]} cy={G[1]} r={3.5} className="dw-dot dw-dota" />
            <Label x={G[0] - 14} y={G[1] - 10} c="a">G</Label>
            <Arrow x1={G[0]} y1={G[1]} x2={G[0]} y2={G[1] + Math.min(80, fs * M * 9.81)} c="f" />
            <Label x={G[0] + 16} y={G[1] + 50} c="f" size={12}>Mg</Label>
            <Arrow x1={G[0]} y1={G[1]} x2={G[0] + Math.min(90, fs * s.Fin)} y2={G[1]} c="a" />
            <Label x={G[0] + Math.min(90, fs * s.Fin) + 18} y={G[1] - 8} c="a" size={12}>F_in</Label>
            <Giro cx={G[0]} cy={G[1]} r={22} verso={Math.sign(s.Cin)} c="a" label="C_in" />
            <Arrow x1={B[0] + 26} y1={B[1] + (s.F32 > 0 ? 44 : -44)} x2={B[0] + 26} y2={B[1] + (s.F32 > 0 ? 8 : -8)} c="f" />
            <Label x={B[0] + 48} y={B[1] + (s.F32 > 0 ? 30 : -30)} c="f" size={12}>F₃₂</Label>
            <Arrow x1={A[0] - 28} y1={A[1] + (s.F > 0 ? 50 : -10)} x2={A[0] - 28} y2={A[1] + (s.F > 0 ? 10 : 30)} c="f" />
            <Label x={A[0] - 44} y={A[1] + 30} c="f" size={12}>F</Label>
          </g>
        )}
      <Arrow x1={A[0] + 18} y1={A[1]} x2={A[0] + 18} y2={A[1] + 40} c="v" />
      <Label x={A[0] + 40} y={A[1] + 30} c="v" size={12}>V_A</Label>
    </svg>
  );
  return (
    <Mech
      title={dinamica ? 'Asta con due pattini: forze d\'inerzia e forza sul pattino (p. 60)' : 'Asta vincolata in due punti: CIR e velocità lungo l\'asta'}
      svg={svgEl}
      side={
        <>
          <Transport crank={crank} label="avanzamento del pattino A" />
          <Slider label="V_A" value={VA} min={0.2} max={2} step={0.05} onChange={setVA} unit="m/s" show={(x) => fmt(x, 2)} />
          <Readout
            rows={
              dinamica
                ? [
                    ['α', gradi(al)],
                    ['a_G (verso sinistra)', `${fmt(s.aG, 3)} m/s²`],
                    ['F_in = M |a_G|', `${fmt(s.Fin, 3)} N`],
                    ['C_in = I_G |ω̇|', `${fmt(s.Cin, 3)} N·m`],
                    ['F₃₂ (pattino B)', `${fmt(s.F32, 4)} N`],
                    ['F sul pattino A', `${fmt(s.F, 4)} N`],
                  ]
                : [
                    ['α', gradi(al)],
                    ['ω = V_A/(AB cos α), antioraria', `${fmt(s.omega, 3)} rad/s`],
                    ['V_B = V_A tan α', `${fmt(s.VB, 3)} m/s`],
                    ['V minima = V_A sin α', `${fmt(s.Vmin, 3)} m/s`],
                    ['a_B (verso sinistra)', `${fmt(s.aB, 3)} m/s²`],
                    ['ω̇ (oraria: l\'asta rallenta)', `${fmt(s.omegaDot, 3)} rad/s²`],
                  ]
            }
          />
        </>
      }
      note={dinamica ? 'AB = 1 m, M = 5 kg, I_G = M AB²/12, g = 9,81 m/s². Masse dei pattini trascurate. Versi come nel disegno di p. 60 (NF-107).' : 'AB = 1 m. Le velocità sono perpendicolari alla congiungente con K e proporzionali alla distanza: la minima è nel piede della perpendicolare da K (rendering di p. 22).'}
    />
  );
}

export const MECCANISMI_C1: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c1-manovellismo': ManovellismoAnim,
  'c1-glifo': GlifoAnim,
  'c1-pistone': PistoneAnim,
  'c1-asta': AstaAnim,
};
