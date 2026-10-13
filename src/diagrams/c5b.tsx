/**
 * Meccanismi animati del capitolo C5, parte b (rotismi epicicloidali, differenziale, rendimenti, elicoidali, coniche).
 * Cinematica e statica in src/engine/c5b.ts (pura, testata in tests/meccanismi-c5b.test.ts): qui si disegna e basta.
 * Coordinate: i calcoli sono in coordinate matematiche (y verso l'alto, angoli antiorari); `S` le porta nel viewBox.
 */
import { useState, type ComponentType } from 'react';
import {
  avviamento, coniPrimitivi, contornoRuota, curvaRendimentoEpi, differenziale, epicicloidale, flussoCascata, forzeElicoidali,
  lineeContatto, numeroSatelliti, rendimentoCascata, rendimentoEpi, sfasamentiEpi, zFittizio, zMinElicoidale,
} from '../engine/c5b';
import { fmt, radOf } from '../engine/num';
import { Arrow, Mech, PlayBtn, Readout, Slider, Toggle, useClock } from './anim';

type Pt = [number, number];
const pts = (cx: number, cy: number, p: Pt[]) => p.map(([x, y]) => `${(cx + x).toFixed(1)},${(cy - y).toFixed(1)}`).join(' ');
const deg = (r: number) => (r * 180) / Math.PI;

// ====================================================================== 1. rotismo epicicloidale (p. 175)
function EpicicloidaleAnim() {
  const [fisso, setFisso] = useState<'corona' | 'solare'>('corona');
  const [z1, setZ1] = useState(18);
  const [z2, setZ2] = useState(18);
  const [prof, setProf] = useState<'si' | 'no'>('si');
  const [vel, setVel] = useState(0.5);
  const clock = useClock();
  const r = epicicloidale({ z1, z2, fisso, wIn: 1 });
  const N = numeroSatelliti(z1, z2);
  const { z3, offP, offR, psi } = sfasamentiEpi(z1, z2, N);
  const th = clock.t * vel; // angolo dell'albero d'entrata
  const f1 = r.w1 * th, f2 = r.w2 * th, f3 = r.w3 * th, fc = r.W * th;
  const cx = 150, cy = 150;
  const m = 132 / (z3 / 2 + 2.6);
  const R1 = (m * z1) / 2, R2 = (m * z2) / 2, R3 = (m * z3) / 2, a = R1 + R2;
  const ringOut = R3 + 1.25 * m + 6;
  const planets = Array.from({ length: N }, (_, n) => {
    const ang = psi(n) + fc;
    return { n, ang, x: a * Math.cos(ang), y: a * Math.sin(ang) };
  });
  // profilo delle velocità lungo il raggio del satellite 0 (velocità tangenziali con segno, antiorario positivo)
  const a0 = planets[0].ang, e: Pt = [Math.cos(a0), Math.sin(a0)], tg: Pt = [-Math.sin(a0), Math.cos(a0)];
  const vmax = Math.max(Math.abs(r.vC12), Math.abs(r.vO2), Math.abs(r.vC23)) || 1;
  const k = 58 / vmax;
  const prof3 = [
    { rr: R1, v: r.vC12 }, { rr: a, v: r.vO2 }, { rr: R3, v: r.vC23 },
  ].map((q) => ({ base: [q.rr * e[0], q.rr * e[1]] as Pt, tip: [q.rr * e[0] + k * q.v * tg[0], q.rr * e[1] + k * q.v * tg[1]] as Pt }));
  const hatch = [];
  if (fisso === 'corona') for (let q = 0; q < 36; q++) {
    const t = (q * Math.PI) / 18;
    hatch.push(<line key={q} x1={cx + ringOut * Math.cos(t)} y1={cy - ringOut * Math.sin(t)} x2={cx + (ringOut + 7) * Math.cos(t + 0.06)} y2={cy - (ringOut + 7) * Math.sin(t + 0.06)} className="dw-g" />);
  }
  const svgEl = (
    <svg viewBox="0 0 300 300" className="dw" role="img" aria-label="Rotismo epicicloidale animato: solare, satelliti, corona, portatreno">
      <circle cx={cx} cy={cy} r={ringOut} className="dw-l" />
      {hatch}
      <polygon points={pts(cx, cy, contornoRuota(z3, R3, m, f3 + offR, true))} className="dw-l" />
      <polygon points={pts(cx, cy, contornoRuota(z1, R1, m, f1))} className={fisso === 'solare' ? 'dw-g' : 'dw-l'} />
      <line x1={cx} y1={cy} x2={cx + 0.7 * R1 * Math.cos(f1)} y2={cy - 0.7 * R1 * Math.sin(f1)} className="dw-m" />
      {planets.map((p) => (
        <g key={p.n}>
          <line x1={cx} y1={cy} x2={cx + p.x} y2={cy - p.y} className="dw-a" strokeWidth={5} />
          <polygon points={pts(cx + p.x, cy - p.y, contornoRuota(z2, R2, m, f2 + offP[p.n]))} className="dw-l" />
          <line x1={cx + p.x} y1={cy - p.y} x2={cx + p.x + 0.7 * R2 * Math.cos(f2 + offP[p.n])} y2={cy - p.y - 0.7 * R2 * Math.sin(f2 + offP[p.n])} className="dw-m" />
          <circle cx={cx + p.x} cy={cy - p.y} r={3} className="dw-fill" />
        </g>
      ))}
      <circle cx={cx} cy={cy} r={4} className="dw-fill" />
      {prof === 'si' && (
        <g>
          {prof3.map((q, i) => (
            <Arrow key={i} x1={cx + q.base[0]} y1={cy - q.base[1]} x2={cx + q.tip[0]} y2={cy - q.tip[1]} c="v" w={2} size={7} />
          ))}
          <line x1={cx + prof3[0].tip[0]} y1={cy - prof3[0].tip[1]} x2={cx + prof3[2].tip[0]} y2={cy - prof3[2].tip[1]} className="dw-d" />
        </g>
      )}
      <text x={8} y={292} className="dw-t dw-tm" fontSize={12}>{fisso === 'corona' ? '3 corona ferma · entra 1 · esce P' : '1 solare fermo · entra 3 · esce P'}</text>
    </svg>
  );
  return (
    <Mech
      title="Rotismo epicicloidale: Willis e CIR del satellite"
      svg={svgEl}
      side={
        <>
          <Toggle value={fisso} onChange={setFisso} label="membro fisso" options={[{ v: 'corona', t: 'corona ferma' }, { v: 'solare', t: 'solare fermo' }]} />
          <Slider label="z₁ (solare)" value={z1} min={12} max={30} step={1} onChange={setZ1} />
          <Slider label="z₂ (satellite)" value={z2} min={10} max={30} step={1} onChange={setZ2} />
          <Toggle value={prof} onChange={setProf} label="profilo delle velocità" options={[{ v: 'si', t: 'profilo velocità' }, { v: 'no', t: 'nascondi' }]} />
          <div className="mech-controls">
            <PlayBtn clock={clock} />
            <Slider label="velocità d'entrata" value={vel} min={0.1} max={1.5} step={0.05} onChange={setVel} unit="rad/s" />
          </div>
          <Readout
            rows={[
              ['z₃ = z₁ + 2z₂', String(z3)],
              ['τ_W = −z₁/z₃', fmt(r.tauW, 3)],
              [fisso === 'corona' ? 'Ω/ω₁ = τ_W/(τ_W − 1)' : 'Ω/ω₃ = 1/(1 − τ_W)', fmt(r.tauGlob, 3)],
              ['satellite: ω₂ / ω_entrata', fmt(r.w2, 3)],
              ['rotazione relativa (ω₂ − Ω)/ω_entr.', fmt(r.rel2, 3)],
              ['CIR del satellite', fisso === 'corona' ? 'contatto con la corona' : 'contatto con il solare'],
              ['satelliti montabili', String(N)],
            ]}
          />
        </>
      }
      note="Frecce: velocità di C₁,₂, O₂ e C₂,₃ sul raggio del primo satellite; la retta tratteggiata passa per il CIR (velocità nulla). Antiorario positivo."
    />
  );
}

// ====================================================================== 2. differenziale (pp. 176–178)
function strisce(x: number, y: number, w: number, h: number, off: number, key: string, sp = 9) {
  const out = [];
  const n = Math.floor(h / sp);
  for (let j = 0; j < n; j++) {
    const yy = y + ((((off + j * sp) % (n * sp)) + n * sp) % (n * sp)) * (h / (n * sp));
    out.push(<line key={key + j} x1={x + 1} y1={yy} x2={x + w - 1} y2={yy} className="dw-m" />);
  }
  return out;
}

function DifferenzialeAnim() {
  const [modo, setModo] = useState<'rettilineo' | 'curva'>('curva');
  const [R, setR] = useState(8);
  const clock = useClock();
  const q = { VM: 10, R: modo === 'curva' ? R : Infinity, p: 1.5, d: 0.6, zs: 16, zp: 10 };
  const r = differenziale(q);
  const t = clock.t * 0.25;
  const kS = 2.2; // px per radiante (strisce)
  const spin = (r.rel2 * q.zs) / q.zp; // rotazione propria dei planetari (con segno)
  const kV = 40 / 12;
  const svgEl = (
    <svg viewBox="0 0 340 240" className="dw" role="img" aria-label="Differenziale: ruote, solari, portatreno e planetari">
      {modo === 'curva' && <text x={6} y={18} className="dw-t dw-tm" fontSize={12}>← centro della curva a R = {fmt(R, 2)} m</text>}
      {/* asse e semiassi */}
      <line x1={46} y1={130} x2={294} y2={130} className="dw-l" strokeWidth={3} />
      {/* ruote */}
      <rect x={20} y={85} width={26} height={90} className="dw-l" />
      {strisce(20, 85, 26, 90, r.w1 * t * kS * 6, 'w1', 10)}
      <rect x={294} y={85} width={26} height={90} className="dw-l" />
      {strisce(294, 85, 26, 90, r.w2 * t * kS * 6, 'w2', 10)}
      <Arrow x1={33} y1={78} x2={33} y2={78 - kV * r.V1} c="v" />
      <Arrow x1={307} y1={78} x2={307} y2={78 - kV * r.V2} c="v" />
      <text x={48} y={60} className="dw-t dw-tv">V₁</text>
      <text x={280} y={60} className="dw-t dw-tv" textAnchor="end">V₂</text>
      {/* portatreno (scatola) con la corona conica */}
      <rect x={128} y={88} width={84} height={84} className="dw-l" />
      {strisce(128, 88, 8, 84, r.W * t * kS * 6, 'c1')}
      {strisce(204, 88, 8, 84, r.W * t * kS * 6, 'c2')}
      <rect x={150} y={176} width={40} height={14} className="dw-l" />
      {strisce(150, 176, 40, 14, r.W * t * kS * 6, 'cor', 4)}
      <text x={170} y={204} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>corona (Ω)</text>
      {/* solari */}
      <rect x={142} y={104} width={12} height={52} className="dw-a" />
      {strisce(142, 104, 12, 52, r.w1 * t * kS * 6, 's1', 7)}
      <rect x={186} y={104} width={12} height={52} className="dw-a" />
      {strisce(186, 104, 12, 52, r.w2 * t * kS * 6, 's2', 7)}
      {/* planetari: rotazione propria */}
      {[100, 160].map((yy, i) => {
        const ang = (i === 0 ? 1 : -1) * spin * t * 4;
        return (
          <g key={yy}>
            <circle cx={170} cy={yy} r={11} className="dw-l" />
            <line x1={170} y1={yy} x2={170 + 10 * Math.cos(ang)} y2={yy - 10 * Math.sin(ang)} className="dw-a" strokeWidth={2} />
          </g>
        );
      })}
      <text x={33} y={196} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>1 interna</text>
      <text x={307} y={196} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>2 esterna</text>
    </svg>
  );
  return (
    <Mech
      title="Differenziale: il portatreno va alla media delle ruote"
      svg={svgEl}
      side={
        <>
          <Toggle value={modo} onChange={setModo} label="traiettoria" options={[{ v: 'rettilineo', t: 'rettilineo' }, { v: 'curva', t: 'curva' }]} />
          {modo === 'curva' && <Slider label="R (raggio della curva)" value={R} min={3} max={40} step={0.5} onChange={setR} unit="m" />}
          <PlayBtn clock={clock} />
          <Readout
            rows={[
              ['ω₁ ruota interna', `${fmt(r.w1, 4)} rad/s`],
              ['ω₂ ruota esterna', `${fmt(r.w2, 4)} rad/s`],
              ['Ω = (ω₁ + ω₂)/2', `${fmt(r.W, 4)} rad/s`],
              ['2V_M/d', `${fmt((2 * q.VM) / q.d, 4)} rad/s`],
              ['ω₁ − Ω = −(ω₂ − Ω)', `${fmt(r.rel1, 3)} rad/s`],
              ['rotazione propria planetari', `${fmt(r.spin, 3)} rad/s`],
              ['C₂/C₁ = −1/τ_w', '1'],
            ]}
          />
        </>
      }
      note="Dati fissi: V_M = 10 m/s, carreggiata p = 1,5 m, ruote d = 0,6 m, solari 16 denti, planetari 10. Le strisce scorrono con la velocità angolare di ciascun membro."
    />
  );
}

// ====================================================================== 3. avviamento: condizione (*) (p. 182)
function AvviamentoAnim() {
  const [tau, setTau] = useState(0.5);
  const [eta1, setEta1] = useState(0.9);
  const [eta2, setEta2] = useState(0.85);
  const [lr, setLr] = useState(Math.log10(0.5));
  const clock = useClock();
  const rC = 10 ** lr;
  const a = avviamento({ tau, eta1, eta2, rC });
  const L0 = Math.log10(0.05), L1 = Math.log10(10), x0 = 20, W = 300;
  const X = (v: number) => x0 + ((Math.log10(v) - L0) / (L1 - L0)) * W;
  const verso = a.stato === '1-movente' ? 1 : a.stato === '2-movente' ? -1 : 0;
  const ang = verso * clock.t * 1.2;
  const R2v = Math.max(8, Math.min(45, 20 / tau)); // raggio disegnato della ruota 2 (τ = R₁/R₂)
  const ruota = (cx: number, cy: number, R: number, ph: number) => (
    <g>
      <circle cx={cx} cy={cy} r={R} className="dw-l" />
      {[0, 1, 2].map((k) => <line key={k} x1={cx} y1={cy} x2={cx + R * Math.cos(ph + (k * 2 * Math.PI) / 3)} y2={cy - R * Math.sin(ph + (k * 2 * Math.PI) / 3)} className="dw-m" />)}
    </g>
  );
  const svgEl = (
    <svg viewBox="0 0 340 200" className="dw" role="img" aria-label="Fascia di quiete dell'ingranaggio all'avviamento">
      {ruota(40, 50, 20, ang)}
      {ruota(60 + R2v, 50, R2v, -ang * tau)}
      <text x={40} y={84} className="dw-t" textAnchor="middle">1</text>
      <text x={60 + 2 * R2v + 8} y={54} className="dw-t" textAnchor="start">2</text>
      <line x1={x0} y1={150} x2={x0 + W} y2={150} className="dw-l" />
      <rect x={X(a.lo)} y={138} width={Math.max(1, X(a.hi) - X(a.lo))} height={24} className="dw-soft" />
      {[0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={150} x2={X(v)} y2={156} className="dw-m" />
          <text x={X(v)} y={172} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>{String(v).replace('.', ',')}</text>
        </g>
      ))}
      <line x1={X(tau)} y1={132} x2={X(tau)} y2={168} className="dw-d" />
      <text x={X(tau)} y={126} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>τ</text>
      <Arrow x1={X(rC)} y1={112} x2={X(rC)} y2={146} c="a" />
      <text x={X(rC)} y={106} className="dw-t dw-ta" textAnchor="middle" fontSize={12}>|C₁|/|C₂|</text>
      <text x={20} y={194} className="dw-t dw-tm" fontSize={11}>fascia di quiete: τη₂ … τ/η₁ (scala logaritmica)</text>
    </svg>
  );
  return (
    <Mech
      title="Ingranaggio inizialmente fermo: quando parte?"
      svg={svgEl}
      side={
        <>
          <Slider label="τ = ω₂/ω₁ (modulo)" value={tau} min={0.2} max={3} step={0.05} onChange={setTau} />
          <Slider label="η₁ (1 movente)" value={eta1} min={0.5} max={0.99} step={0.01} onChange={setEta1} />
          <Slider label="η₂ (2 movente)" value={eta2} min={0.3} max={0.99} step={0.01} onChange={setEta2} />
          <Slider label="|C₁|/|C₂| applicato" value={lr} min={Math.log10(0.05)} max={1} step={0.01} onChange={setLr} show={(v) => fmt(10 ** v, 3)} />
          <PlayBtn clock={clock} />
          <Readout
            rows={[
              ['τη₂', fmt(a.lo, 3)],
              ['τ/η₁', fmt(a.hi, 3)],
              ['stato', a.stato === 'quiete' ? 'resta in quiete' : a.stato === '1-movente' ? 'parte: 1 movente (moto diretto)' : 'parte: 2 movente (moto retrogrado)'],
            ]}
          />
        </>
      }
      note="Condizione (*) di p. 182: τη₂ < |C₁|/|C₂| < τ/η₁ ⇒ gli ingranaggi restano in quiete. Senza attrito la fascia si riduce al solo valore τ."
    />
  );
}

// ====================================================================== 4. cascata di ingranaggi (p. 184)
function CascataAnim() {
  const [e, setE] = useState([0.98, 0.98, 0.98]);
  const set = (i: number) => (v: number) => setE((o) => o.map((x, j) => (j === i ? v : x)));
  const f = flussoCascata(e);
  const H = 140, base = 175, xs = [30, 105, 180, 255];
  const svgEl = (
    <svg viewBox="0 0 320 200" className="dw" role="img" aria-label="Potenza che attraversa una cascata di tre ingranaggi">
      <line x1={10} y1={base} x2={310} y2={base} className="dw-l" />
      {f.map((w, i) => (
        <g key={i}>
          <rect x={xs[i]} y={base - H * w} width={34} height={H * w} className="dw-soft" />
          <rect x={xs[i]} y={base - H * w} width={34} height={H * w} className="dw-v" fill="none" />
          {i > 0 && <rect x={xs[i]} y={base - H * f[i - 1]} width={34} height={H * (f[i - 1] - w)} className="dw-f" />}
          <text x={xs[i] + 17} y={base - H * w - 6} className="dw-t" textAnchor="middle" fontSize={11}>{fmt(w, 3)}</text>
          <text x={xs[i] + 17} y={base + 16} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>{['M', 'dopo I', 'dopo II', 'U'][i]}</text>
        </g>
      ))}
    </svg>
  );
  return (
    <Mech
      title="Rendimento in serie: ogni stadio passa la sua frazione"
      svg={svgEl}
      side={
        <>
          {['η^I', 'η^II', 'η^III'].map((l, i) => <Slider key={l} label={l} value={e[i]} min={0.6} max={1} step={0.01} onChange={set(i)} />)}
          <Readout rows={[['η_TOT = η^I η^II η^III', fmt(rendimentoCascata(e), 4)], ['potenza persa', `${fmt(100 * (1 - rendimentoCascata(e)), 3)} %`], ['stadio peggiore', fmt(Math.min(...e), 3)]]} />
        </>
      }
      note="Barre: potenza che arriva a ogni albero con W_m = 1; in rosso la parte persa nello stadio. η_TOT è sempre minore del rendimento dello stadio peggiore."
    />
  );
}

// ====================================================================== 5. rendimento dell'epicicloidale (fonte esterna)
function RendimentoEpiAnim() {
  const [eo, setEo] = useState(0.98);
  const [tw, setTw] = useState(-1 / 3);
  const curve = curvaRendimentoEpi(eo);
  const x0 = 34, y0 = 20, W = 270, H = 160, tmin = -3, tmax = 4, emin = -0.6, emax = 1.2;
  const X = (t: number) => x0 + ((t - tmin) / (tmax - tmin)) * W;
  const Y = (v: number) => y0 + ((emax - v) / (emax - emin)) * H;
  const tratti: string[] = [];
  let cur: string[] = [];
  let prev: number | null = null;
  for (const p of curve) {
    const ok = p.eta >= emin && p.eta <= emax && (prev === null || Math.abs(p.tauW - prev) < 0.05);
    if (!ok && cur.length) { tratti.push(cur.join(' ')); cur = []; }
    if (p.eta >= emin && p.eta <= emax) cur.push(`${X(p.tauW).toFixed(1)},${Y(p.eta).toFixed(1)}`);
    prev = p.tauW;
  }
  if (cur.length) tratti.push(cur.join(' '));
  const r = Math.abs(tw - 1) < 0.02 ? null : rendimentoEpi(tw, eo);
  const svgEl = (
    <svg viewBox="0 0 320 210" className="dw" role="img" aria-label="Rendimento dell'epicicloidale in funzione di τ_W">
      <line x1={x0} y1={Y(0)} x2={x0 + W} y2={Y(0)} className="dw-l" />
      <line x1={X(0)} y1={y0} x2={X(0)} y2={y0 + H} className="dw-m" />
      <line x1={X(1)} y1={y0} x2={X(1)} y2={y0 + H} className="dw-d" />
      <line x1={x0} y1={Y(eo)} x2={x0 + W} y2={Y(eo)} className="dw-d" />
      <line x1={x0} y1={Y(1)} x2={x0 + W} y2={Y(1)} className="dw-m" />
      {tratti.map((s, i) => <polyline key={i} points={s} className="dw-a" fill="none" strokeWidth={2.5} />)}
      {[-3, -2, -1, 0, 1, 2, 3, 4].map((t) => <text key={t} x={X(t)} y={y0 + H + 14} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>{t}</text>)}
      {[-0.5, 0, 0.5, 1].map((v) => <text key={v} x={x0 - 4} y={Y(v)} className="dw-t dw-tm" textAnchor="end" fontSize={11}>{String(v).replace('.', ',')}</text>)}
      <text x={x0 + W} y={Y(eo) - 6} className="dw-t dw-tm" textAnchor="end" fontSize={11}>η_o</text>
      <text x={x0 + W / 2} y={y0 + H + 30} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>τ_W</text>
      {r && r.eta >= emin && r.eta <= emax && <circle cx={X(tw)} cy={Y(r.eta)} r={5} className="dw-fill" />}
    </svg>
  );
  return (
    <Mech
      title="Rendimento dell'epicicloidale (fonte esterna, non nella dispensa)"
      svg={svgEl}
      side={
        <>
          <Slider label="η_o (ordinario equivalente)" value={eo} min={0.85} max={0.995} step={0.005} onChange={setEo} />
          <Slider label="τ_W" value={tw} min={-3} max={4} step={0.01} onChange={setTw} show={(v) => fmt(v, 3)} />
          <Readout
            rows={[
              ['Ω/ω₁ = τ_W/(τ_W − 1)', r ? fmt(r.r, 3) : '—'],
              ['nel moto relativo il solare 1 è', r ? (r.caso === 'relativo-diretto' ? 'movente (τ_W < 1)' : 'cedente (τ_W > 1)') : '—'],
              ['η_EPI', r ? fmt(r.eta, 4) : '—'],
              ['esito', r ? (r.eta <= 0 ? 'η ≤ 0: moto impossibile' : r.eta > eo ? 'meglio dell\'ordinario' : 'peggio dell\'ordinario') : 'τ_W = 1: rotismo bloccato'],
            ]}
          />
        </>
      }
      note="Solare 1 motore, un solare fisso, portatreno condotto. τ_W < 1: η = (τ_W − η_o)/(τ_W − 1); τ_W > 1: η = (η_oτ_W − 1)/(η_o(τ_W − 1))."
    />
  );
}

// ====================================================================== 6. linee di contatto delle elicoidali (p. 187)
function ContattiAnim() {
  const [betaDeg, setBeta] = useState(15);
  const [bR, setBR] = useState(2);
  const [dR, setDR] = useState(1.5);
  const clock = useClock();
  const pb = Math.min(60, 200 / (bR + 0.0001), 120 / dR);
  const b = bR * pb, delta = dR * pb, beta = radOf(betaDeg);
  const s = (clock.t * 0.35 * pb) % pb;
  const lc = lineeContatto({ delta, b, beta, pb, s });
  const x0 = 30, y0 = 20;
  const X = (x: number) => x0 + x, Y = (y: number) => y0 + delta - y;
  // contatto totale in funzione della posizione (sparkline)
  const nS = 80, Ls = Array.from({ length: nS }, (_, i) => lineeContatto({ delta, b, beta, pb, s: (i / nS) * pb }).Ltot / b);
  const Lmax = Math.max(...Ls, 1e-9), sy0 = y0 + delta + 40, sh = 40, sw = 220;
  const svgEl = (
    <svg viewBox={`0 0 280 ${Math.ceil(sy0 + sh + 20)}`} className="dw" role="img" aria-label="Rettangolo dei contatti con le linee di contatto in movimento">
      <rect x={x0} y={y0} width={b} height={delta} className="dw-l" />
      {lc.segs.map((g, i) => <line key={i} x1={X(g.x1)} y1={Y(g.y1)} x2={X(g.x2)} y2={Y(g.y2)} className="dw-a" strokeWidth={3} />)}
      <text x={x0 - 6} y={y0 + 4} className="dw-t" textAnchor="end" fontSize={12}>H</text>
      <text x={x0 - 6} y={y0 + delta} className="dw-t" textAnchor="end" fontSize={12}>M</text>
      <text x={x0 + b + 6} y={y0 + delta} className="dw-t" textAnchor="start" fontSize={12}>K</text>
      <text x={x0 + b / 2} y={y0 - 6} className="dw-t dw-tm" textAnchor="middle" fontSize={11}>b</text>
      <text x={x0 + b + 8} y={y0 + delta / 2} className="dw-t dw-tm" fontSize={11}>δ</text>
      <polyline points={Ls.map((L, i) => `${(x0 + (i / (nS - 1)) * sw).toFixed(1)},${(sy0 + sh - (L / Lmax) * sh).toFixed(1)}`).join(' ')} className="dw-v" fill="none" />
      <circle cx={x0 + (s / pb) * sw} cy={sy0 + sh - (lc.Ltot / b / Lmax) * sh} r={4} className="dw-fill" />
      <line x1={x0} y1={sy0 + sh} x2={x0 + sw} y2={sy0 + sh} className="dw-m" />
      <text x={x0} y={sy0 - 6} className="dw-t dw-tm" fontSize={11}>lunghezza di contatto totale lungo un passo</text>
    </svg>
  );
  return (
    <Mech
      title="Denti in presa: linee di contatto inclinate di β"
      svg={svgEl}
      side={
        <>
          <Slider label="β (elica sul fondamentale)" value={betaDeg} min={0} max={40} step={1} onChange={setBeta} unit="°" />
          <Slider label="b / (P cos θ)" value={bR} min={0.5} max={4} step={0.1} onChange={setBR} />
          <Slider label="δ / (P cos θ)" value={dR} min={1.1} max={2} step={0.05} onChange={setDR} />
          <PlayBtn clock={clock} />
          <Readout
            rows={[
              ['denti dritti δ/(P cos θ)', fmt(lc.zDritti, 3)],
              ['termine aggiuntivo b tg β/(P cos θ)', fmt(lc.zPresa - lc.zDritti, 3)],
              ['z_presa = δ_e/(P cos θ)', fmt(lc.zPresa, 3)],
              ['linee in contatto ora', String(lc.n)],
              ['contatto totale ora / b', fmt(lc.Ltot / b, 3)],
            ]}
          />
        </>
      }
      note="Con β = 0 le linee entrano e escono intere (il carico cambia a scatti); con l'elica entrano da H ed escono da K gradualmente e la lunghezza di contatto totale varia meno."
    />
  );
}

// ====================================================================== 7. ellisse e circonferenza osculatrice (p. 188)
function OsculatriceAnim() {
  const [aDeg, setA] = useState(25);
  const al = radOf(aDeg), r = 52, a = r / Math.cos(al), R = r / Math.cos(al) ** 2;
  const cx = 150, top = 20;
  const ell: Pt[] = Array.from({ length: 73 }, (_, k) => [a * Math.cos((k / 72) * 2 * Math.PI), r * Math.sin((k / 72) * 2 * Math.PI)]);
  const svgEl = (
    <svg viewBox="0 0 300 220" className="dw" role="img" aria-label="Ellisse della sezione normale e circonferenza osculatrice">
      <circle cx={cx} cy={top + R} r={R} className="dw-d" />
      <polygon points={pts(cx, top + r, ell)} className="dw-a" fill="none" />
      <circle cx={cx} cy={top} r={3.5} className="dw-fill" />
      <line x1={cx} y1={top + r} x2={cx + a} y2={top + r} className="dw-m" />
      <line x1={cx} y1={top + r} x2={cx} y2={top} className="dw-m" />
      <text x={cx + 6} y={top + r + 14} className="dw-t dw-tm" textAnchor="start" fontSize={11}>a = r/cos α</text>
      <text x={cx - 6} y={top + r / 2} className="dw-t dw-tm" textAnchor="end" fontSize={11}>b = r</text>
    </svg>
  );
  return (
    <Mech
      title="Ruota fittizia: la circonferenza osculatrice cresce come 1/cos²α"
      svg={svgEl}
      side={
        <>
          <Slider label="α (elica sul primitivo)" value={aDeg} min={0} max={40} step={1} onChange={setA} unit="°" />
          <Readout
            rows={[
              ['a/r = 1/cos α', fmt(a / r, 3)],
              ['R/r = 1/cos²α', fmt(R / r, 3)],
              ['z_fitt per z = 20', fmt(zFittizio(20, al), 3)],
              ['z_min con z* = 17,1', `${fmt(zMinElicoidale(17.1, al), 3)} → ${Math.ceil(zMinElicoidale(17.1, al))}`],
            ]}
          />
        </>
      }
      note="Il contatto è all'estremo dell'asse minore: lì il raggio di curvatura dell'ellisse è a²/b. Con α = 0 ellisse e circonferenza coincidono con la primitiva."
    />
  );
}

// ====================================================================== 8. forze nelle elicoidali (p. 189)
function ForzeElicoidaliAnim() {
  const [aDeg, setA] = useState(20);
  const [tDeg, setT] = useState(20);
  const f = forzeElicoidali({ C: 1, r: 1, theta: radOf(tDeg), alpha: radOf(aDeg) });
  const rows: [string, number, string][] = [['Q', f.Q, 'dw-f'], ['R', f.R, 'dw-f'], ['A', f.A, 'dw-a'], ['F', f.F, 'dw-l']];
  const k = 150;
  const svgEl = (
    <svg viewBox="0 0 300 170" className="dw" role="img" aria-label="Componenti della forza fra denti elicoidali al variare dell'elica">
      {rows.map(([l, v, c], i) => (
        <g key={l}>
          <text x={24} y={30 + i * 36} className="dw-t" textAnchor="end">{l}</text>
          <rect x={32} y={18 + i * 36} width={Math.max(1, k * v)} height={22} className={c} />
          <text x={38 + k * v} y={30 + i * 36} className="dw-t dw-tm" fontSize={11} textAnchor="start">{fmt(v, 3)}</text>
        </g>
      ))}
    </svg>
  );
  return (
    <Mech
      title="Forze nelle elicoidali (C/r = 1)"
      svg={svgEl}
      side={
        <>
          <Slider label="α (elica)" value={aDeg} min={0} max={40} step={1} onChange={setA} unit="°" />
          <Slider label="θ (pressione frontale)" value={tDeg} min={14.5} max={25} step={0.5} onChange={setT} unit="°" />
          <Readout rows={[['θ_m (tg θ_m = tg θ cos α)', `${fmt(deg(f.thetaM), 3)}°`], ['A = (C/r) tg α', fmt(f.A, 3)], ['R = (C/r) tg θ', fmt(f.R, 3)], ['F = Q/(cos θ_m cos α)', fmt(f.F, 3)]]} />
        </>
      }
      note="Q = C/r non cambia con l'elica; R resta quella dei denti dritti con l'angolo frontale; cresce la spinta assiale A."
    />
  );
}

// ====================================================================== 9. coni primitivi (p. 190)
function ConicheAnim() {
  const [lt, setLt] = useState(0);
  const [psiDeg, setPsi] = useState(90);
  const tau = 2 ** lt;
  const { phi1, phi2 } = coniPrimitivi(tau, radOf(psiDeg));
  const ox = 160, oy = 210, L = 160;
  // generatrice comune verticale; asse 1 a sinistra (φ₁), asse 2 a destra (φ₂)
  const P: Pt = [0, L];
  const refl = (u: Pt): Pt => { const k = P[0] * u[0] + P[1] * u[1]; return [2 * k * u[0] - P[0], 2 * k * u[1] - P[1]]; };
  const u1: Pt = [-Math.sin(phi1), Math.cos(phi1)], u2: Pt = [Math.sin(phi2), Math.cos(phi2)];
  const P1 = refl(u1), P2 = refl(u2);
  const svgEl = (
    <svg viewBox="0 0 320 240" className="dw" role="img" aria-label="Coni primitivi di due ruote coniche">
      <polygon points={pts(ox, oy, [[0, 0], P, P1])} className="dw-l" fill="none" />
      <polygon points={pts(ox, oy, [[0, 0], P, P2])} className="dw-l" fill="none" />
      <line x1={ox} y1={oy} x2={ox + 1.15 * L * u1[0]} y2={oy - 1.15 * L * u1[1]} className="dw-m" />
      <line x1={ox} y1={oy} x2={ox + 1.15 * L * u2[0]} y2={oy - 1.15 * L * u2[1]} className="dw-m" />
      <line x1={ox} y1={oy} x2={ox} y2={oy - L} className="dw-a" strokeWidth={2.5} />
      <circle cx={ox} cy={oy} r={3} className="dw-fill" />
      <text x={ox} y={oy + 16} className="dw-t" textAnchor="middle">O</text>
      <text x={ox + 8} y={oy - L - 4} className="dw-t dw-ta">P</text>
      <text x={ox - 60} y={oy - 30} className="dw-t dw-tm" fontSize={12}>φ₁ = {fmt(deg(phi1), 3)}°</text>
      <text x={ox + 20} y={oy - 30} className="dw-t dw-tm" fontSize={12}>φ₂ = {fmt(deg(phi2), 3)}°</text>
    </svg>
  );
  return (
    <Mech
      title="Coni primitivi: noti τ e ψ, le aperture"
      svg={svgEl}
      side={
        <>
          <Slider label="τ = ω₂/ω₁" value={lt} min={-2} max={2} step={0.05} onChange={setLt} show={(v) => fmt(2 ** v, 3)} />
          <Slider label="ψ (angolo fra gli assi)" value={psiDeg} min={30} max={150} step={1} onChange={setPsi} unit="°" />
          <Readout
            rows={[
              ['tg φ₁ = sin ψ/(1/τ + cos ψ)', `φ₁ = ${fmt(deg(phi1), 4)}°`],
              ['tg φ₂ = sin ψ/(τ + cos ψ)', `φ₂ = ${fmt(deg(phi2), 4)}°`],
              ['sin φ₁/sin φ₂ (= τ)', fmt(Math.sin(phi1) / Math.sin(phi2), 4)],
              ['A₁/R₁ = tg φ₁', fmt(Math.tan(phi1), 3)],
            ]}
          />
        </>
      }
      note="La ruota con il cono più stretto (φ piccolo) è la più veloce e ha meno spinta assiale rispetto alla radiale."
    />
  );
}

export const MECCANISMI_C5B: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c5b-epicicloidale': EpicicloidaleAnim,
  'c5b-differenziale': DifferenzialeAnim,
  'c5b-avviamento': AvviamentoAnim,
  'c5b-cascata': CascataAnim,
  'c5b-rendimento-epi': RendimentoEpiAnim,
  'c5b-contatti': ContattiAnim,
  'c5b-osculatrice': OsculatriceAnim,
  'c5b-forze-elicoidali': ForzeElicoidaliAnim,
  'c5b-coniche': ConicheAnim,
};
