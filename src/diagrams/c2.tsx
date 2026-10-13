/** Meccanismi animati del capitolo C2 (attrito e aderenza). Statica e cinematica in src/engine/c2.ts. */
import { useState, type ComponentType } from 'react';
import { cuscinettoCarico, cuscinettoCinematica, curva, impuntamento, perno, pianoInclinato, veicolo } from '../engine/c2';
import { fmt } from '../engine/num';
import { Arrow, Mech, Readout, Slider, Toggle, useCrank, useClock, PlayBtn } from './anim';

const RAD = Math.PI / 180;
type P2 = [number, number];
const add = (a: P2, b: P2, k = 1): P2 => [a[0] + k * b[0], a[1] + k * b[1]];
const pts = (p: P2[]) => p.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ');

/** Piano inclinato e cono d'aderenza (pp. 70–74): la risultante di contatto dentro o fuori dal cono. */
function ConoAnim() {
  const [aDeg, setA] = useState(20);
  const [fad, setFad] = useState(0.5);
  const [fatt, setFatt] = useState(0.35);
  const clock = useClock();
  const alpha = aDeg * RAD;
  const fa = Math.min(fatt, fad);
  const r = pianoInclinato({ M: 10, alpha, fad, fatt: fa });
  const X0 = 310, Y0 = 225, Ls = 280;
  const u: P2 = [-Math.cos(alpha), -Math.sin(alpha)]; // lungo il piano verso l'alto (y dello schermo in basso)
  const n: P2 = [Math.sin(alpha), -Math.cos(alpha)]; // normale uscente dal piano
  const span = 150;
  const s0 = 190;
  const d = r.aderenza ? s0 : s0 - ((0.5 * Math.abs(r.ay) * 6 * (clock.t % 3) ** 2) % span);
  const C = add([X0, Y0], u, d);
  const w = 46, H = 30;
  const blk = [add(C, u, -w / 2), add(C, u, w / 2), add(add(C, u, w / 2), n, H), add(add(C, u, -w / 2), n, H)];
  const L = 110;
  const cono = (sg: number): P2 => add(C, [n[0] * Math.cos(r.phiAd) + sg * u[0] * Math.sin(r.phiAd), n[1] * Math.cos(r.phiAd) + sg * u[1] * Math.sin(r.phiAd)], L);
  const Rlen = 90;
  const Rdir: P2 = r.aderenza ? [0, -1] : [n[0] * Math.cos(r.phiAtt) + u[0] * Math.sin(r.phiAtt), n[1] * Math.cos(r.phiAtt) + u[1] * Math.sin(r.phiAtt)];
  const Rend = add(C, Rdir, Rlen);
  const svgEl = (
    <svg viewBox="0 0 340 260" className="dw" role="img" aria-label="Piano inclinato con cono d'aderenza">
      <polygon points={pts([[X0, Y0], add([X0, Y0], u, Ls), [X0 + u[0] * Ls, Y0]])} className="dw-soft" />
      <line x1={X0} y1={Y0} x2={X0 + u[0] * Ls} y2={Y0 + u[1] * Ls} className="dw-l" strokeWidth={2.5} />
      <line x1={10} y1={Y0} x2={330} y2={Y0} className="dw-g" />
      <polygon points={pts(blk)} className="dw-fill" opacity={0.25} />
      <polygon points={pts(blk)} className="dw-l" fill="none" />
      <line x1={C[0]} y1={C[1]} x2={cono(1)[0]} y2={cono(1)[1]} className="dw-d" />
      <line x1={C[0]} y1={C[1]} x2={cono(-1)[0]} y2={cono(-1)[1]} className="dw-d" />
      <Arrow x1={C[0]} y1={C[1]} x2={C[0] + n[0] * 60 * Math.cos(alpha)} y2={C[1] + n[1] * 60 * Math.cos(alpha)} c="f" w={2} />
      <Arrow x1={C[0]} y1={C[1]} x2={C[0] + u[0] * 60 * (r.FT / (10 * 9.81))} y2={C[1] + u[1] * 60 * (r.FT / (10 * 9.81))} c="f" w={2} />
      <Arrow x1={C[0]} y1={C[1]} x2={Rend[0]} y2={Rend[1]} c="a" w={3} />
      <text x={Rend[0] + 6} y={Rend[1] - 4} className="dw-t dw-ta">R</text>
      <text x={X0 - 60} y={Y0 - 8} className="dw-t dw-tm">α = {aDeg}°</text>
      <text x={20} y={22} className={`dw-t ${r.aderenza ? 'dw-ta' : 'dw-tf'}`}>{r.aderenza ? 'aderenza: R dentro il cono' : 'strisciamento: R inclinata di φ_att'}</text>
    </svg>
  );
  return (
    <Mech
      title="Piano inclinato: la risultante di contatto e il cono d'aderenza"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="α" value={aDeg} min={0} max={50} step={1} onChange={setA} unit="°" />
          <Slider label="f_ad" value={fad} min={0.1} max={1} step={0.01} onChange={setFad} />
          <Slider label="f_att" value={fatt} min={0.05} max={1} step={0.01} onChange={setFatt} />
          <Readout
            rows={[
              ['tan α', fmt(Math.tan(alpha), 3)],
              ['φ_ad = atan f_ad', `${fmt(r.phiAd / RAD, 3)}°`],
              ['F_T / F_N', fmt(r.FT / r.FN, 3)],
              ['stato', r.aderenza ? 'fermo (tan α ≤ f_ad)' : 'scivola'],
              ['a_y = g(f_att cos α − sin α)', `${fmt(r.ay, 3)} m/s²`],
            ]}
          />
        </>
      }
      note={fatt > fad ? 'f_att è limitato a f_ad (deve essere f_att ≤ f_ad).' : 'Il cono ha asse la normale al piano e semiapertura φ_ad. In aderenza la risultante è verticale e forma con la normale l\'angolo α del piano.'}
    />
  );
}

/** Impuntamento (pp. 79–81): Q/F in funzione di e/h, asintoto a 1/(2f). */
function ImpuntamentoAnim() {
  const [eh, setEh] = useState(0.8);
  const [f, setF] = useState(0.25);
  const clock = useClock();
  const r = impuntamento({ F: 1, e: eh, h: 1, f });
  const cx = 95, cy = 140, hw = 38, hh = 62;
  const dy = r.bloccato ? 0 : -((clock.t * 25) % 40);
  const th = 3 * RAD;
  const corner = (sx: number, sy: number): P2 => {
    const x = sx * hw, y = sy * hh;
    return [cx + x * Math.cos(th) - y * Math.sin(th), cy + dy - (x * Math.sin(th) + y * Math.cos(th))];
  };
  const A = corner(-1, 1), B = corner(1, -1), Cc = corner(1, 1), D = corner(-1, -1);
  const k = 26;
  const Qlen = Math.min(k * r.Q, 120), Nlen = Math.min(k * r.FN, 70);
  // grafico Q/F (e/h)
  const gx0 = 200, gx1 = 370, gy0 = 225, gy1 = 30, xMax = 3, yMax = 10;
  const X = (x: number) => gx0 + ((gx1 - gx0) * x) / xMax;
  const Y = (y: number) => gy0 - ((gy0 - gy1) * (y - 0)) / yMax;
  const lim = r.limite;
  const curve: P2[] = [];
  for (let x = 0; x < Math.min(lim, xMax); x += 0.01) {
    const q = 1 / (1 - 2 * f * x);
    if (q > yMax) break;
    curve.push([X(x), Y(q)]);
  }
  const svgEl = (
    <svg viewBox="0 0 380 260" className="dw" role="img" aria-label="Corsoio nella guida e forza di comando in funzione dell'eccentricità">
      <line x1={A[0] - 2} y1={20} x2={A[0] - 2} y2={250} className="dw-g" strokeWidth={2} />
      <line x1={B[0] + 2} y1={20} x2={B[0] + 2} y2={250} className="dw-g" strokeWidth={2} />
      <polygon points={pts([A, Cc, B, D])} className="dw-fill" opacity={0.25} />
      <polygon points={pts([A, Cc, B, D])} className="dw-l" fill="none" />
      <Arrow x1={cx} y1={cy + dy} x2={cx} y2={cy + dy + 26} c="f" w={2} />
      <Arrow x1={cx + Math.min(eh, 1.4) * 26} y1={cy + dy - hh} x2={cx + Math.min(eh, 1.4) * 26} y2={cy + dy - hh - Qlen} c="a" w={2.5} />
      <text x={cx + Math.min(eh, 1.4) * 26 + 6} y={Math.max(14, cy + dy - hh - Qlen + 10)} className="dw-t dw-ta">Q</text>
      {!r.bloccato && (
        <>
          <Arrow x1={A[0]} y1={A[1]} x2={A[0] + Nlen} y2={A[1]} c="f" w={2} />
          <Arrow x1={B[0]} y1={B[1]} x2={B[0] - Nlen} y2={B[1]} c="f" w={2} />
        </>
      )}
      <line x1={gx0} y1={gy0} x2={gx1} y2={gy0} className="dw-m" />
      <line x1={gx0} y1={gy0} x2={gx0} y2={gy1} className="dw-m" />
      <text x={gx1} y={gy0 + 16} textAnchor="end" className="dw-t dw-tm">e/h</text>
      <text x={gx0 + 4} y={gy1 - 6} className="dw-t dw-tm">Q/F</text>
      <line x1={gx0} y1={Y(1)} x2={gx1} y2={Y(1)} className="dw-d" />
      {lim < xMax && <line x1={X(lim)} y1={gy0} x2={X(lim)} y2={gy1} className="dw-d" />}
      {lim < xMax && <text x={X(lim) + 4} y={gy1 + 12} className="dw-t dw-tm">1/(2f)</text>}
      <polyline points={pts(curve)} className="dw-a" fill="none" strokeWidth={2.5} />
      {!r.bloccato && r.Q <= yMax && <circle cx={X(eh)} cy={Y(r.Q)} r={5} className="dw-fill" />}
      {r.bloccato && <text x={cx} y={24} textAnchor="middle" className="dw-t dw-tf">impuntato</text>}
    </svg>
  );
  return (
    <Mech
      title="Impuntamento: la forza di comando diverge per e/h → 1/(2f)"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="e/h" value={eh} min={0} max={3} step={0.01} onChange={setEh} />
          <Slider label="f_att" value={f} min={0.1} max={0.5} step={0.01} onChange={setF} />
          <Readout
            rows={[
              ['limite 1/(2f)', fmt(r.limite, 3)],
              ['Q / F = 1/(1 − 2ef/h)', r.bloccato ? '∞ (impuntamento)' : fmt(r.Q, 3)],
              ['F_N / F = Q e/(F h)', r.bloccato ? '∞' : fmt(r.FN, 3)],
              ['attriti 2 f F_N / F', r.bloccato ? '∞' : fmt(2 * r.FT, 3)],
            ]}
          />
        </>
      }
      note="Il corsoio sale finché e/h < 1/(2f): le normali (e gli attriti) crescono con Q. Carico F = 1."
    />
  );
}

/** Perno nella boccola (pp. 81–83): contatto spostato di φ_att, cerchio d'attrito r* = R sin φ. */
function PernoAnim() {
  const [verso, setVerso] = useState<'orario' | 'antiorario'>('orario');
  const [f, setF] = useState(0.3);
  const crank = useCrank(0.2);
  const R = 80, cx = 150, cy = 125;
  const r = perno({ F: 1, R: 1, f, verso });
  const P: P2 = [cx + R * r.P[0], cy - R * r.P[1]];
  const rs = R * r.rStar;
  const ang = (verso === 'orario' ? 1 : -1) * crank.theta; // orario sullo schermo = angolo crescente con y in basso
  const toO: P2 = [(cx - P[0]) / R, (cy - P[1]) / R];
  const s = verso === 'orario' ? 1 : -1;
  const tan: P2 = [s * -toO[1], s * toO[0]]; // tangente nel verso dell'attrito sul perno (verso l'alto dal lato del contatto)
  const k = 70;
  const svgEl = (
    <svg viewBox="0 0 300 260" className="dw" role="img" aria-label="Perno nella boccola con cerchio d'attrito">
      <circle cx={cx} cy={cy} r={R + 7} className="dw-g" fill="none" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={R} className="dw-l" fill="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = ang + (i * Math.PI) / 3;
        return <line key={i} x1={cx} y1={cy} x2={cx + 0.8 * R * Math.cos(a)} y2={cy + 0.8 * R * Math.sin(a)} className="dw-m" />;
      })}
      <circle cx={cx} cy={cy} r={rs} className="dw-d" fill="none" />
      <line x1={P[0]} y1={P[1] + 14} x2={P[0]} y2={cy - R - 18} className="dw-d" />
      <Arrow x1={cx} y1={cy} x2={cx} y2={cy + 50} c="f" w={2} />
      <text x={cx - 10} y={cy + 52} textAnchor="end" className="dw-t dw-tf">F</text>
      <Arrow x1={P[0]} y1={P[1]} x2={P[0] + toO[0] * k * r.RN} y2={P[1] + toO[1] * k * r.RN} c="f" w={2} />
      <Arrow x1={P[0]} y1={P[1]} x2={P[0] + tan[0] * k * r.RT} y2={P[1] + tan[1] * k * r.RT} c="f" w={2} />
      <Arrow x1={P[0]} y1={P[1]} x2={P[0]} y2={P[1] - k} c="a" w={3} />
      <text x={P[0] + 6 * s} y={P[1] - k - 6} textAnchor="middle" className="dw-t dw-ta">R_P</text>
      <circle cx={P[0]} cy={P[1]} r={3.5} className="dw-fill" />
      <text x={cx} y={20} textAnchor="middle" className="dw-t dw-tv">{verso === 'orario' ? '↻ ω' : '↺ ω'}</text>
    </svg>
  );
  return (
    <Mech
      title="Perno: il contatto sale di φ_att e la reazione sfiora il cerchio d'attrito"
      svg={svgEl}
      side={
        <>
          <Toggle value={verso} onChange={setVerso} label="verso di rotazione" options={[{ v: 'orario', t: 'ω oraria' }, { v: 'antiorario', t: 'ω antioraria' }]} />
          <Slider label="f_att" value={f} min={0.02} max={0.6} step={0.01} onChange={setF} />
          <Readout
            rows={[
              ['φ_att = atan f', `${fmt(r.phi / RAD, 3)}°`],
              ['r*/R = sin φ_att', fmt(r.rStar, 3)],
              ['M_r / (F R)', fmt(r.M, 3)],
              ['approssimazione f', fmt(r.Mapprox, 3)],
              ['errore di f F R', `${fmt(100 * (r.Mapprox / r.M - 1), 2)} %`],
            ]}
          />
        </>
      }
      note="Il gioco è esagerato e non disegnato: conta la posizione del contatto. R_P è verticale e uguale a F."
    />
  );
}

/** Veicolo: trasferimento di carico e accelerazione massima (pp. 89–92, 100–101). */
function VeicoloAnim() {
  const [modo, setModo] = useState<'anteriore' | 'posteriore' | 'frenata'>('anteriore');
  const [f, setF] = useState(0.9);
  const [hL, setHL] = useState(0.22);
  const [p, setP] = useState(0.55); // quota statica sull'anteriore = l2/L
  const [frac, setFrac] = useState(0.8);
  const M = 1200, L = 2.6, g = 9.81;
  const v = veicolo({ M, l1: L * (1 - p), l2: L * p, h: hL * L, f });
  const aMax = modo === 'anteriore' ? v.aMaxAnt : modo === 'posteriore' ? v.aMaxPost : v.decMax;
  const a = (modo === 'frenata' ? -1 : 1) * frac * aMax;
  const N = v.normali(a);
  const ax = 70, bx = 270, y0 = 200, gxp = ax + (bx - ax) * (1 - p), gyp = y0 - 120 * hL * 2.2;
  const kN = 110 / (M * g);
  const pitch = (a / g) * 4; // gradi, solo visivo: muso su in accelerazione, giù in frenata
  const svgEl = (
    <svg viewBox="0 0 340 260" className="dw" role="img" aria-label="Autoveicolo con trasferimento di carico">
      <line x1={10} y1={y0} x2={330} y2={y0} className="dw-g" strokeWidth={2} />
      <g transform={`rotate(${pitch.toFixed(2)} ${(ax + bx) / 2} ${y0 - 20})`}>
        <polygon points={pts([[ax - 40, y0 - 22], [ax - 34, y0 - 52], [ax + 30, y0 - 64], [ax + 70, y0 - 104], [bx - 10, y0 - 108], [bx + 40, y0 - 76], [bx + 44, y0 - 22]])} className="dw-l" fill="none" />
        <circle cx={gxp} cy={gyp} r={4} className="dw-fill" />
        <text x={gxp + 8} y={gyp - 6} className="dw-t">G</text>
      </g>
      <circle cx={ax} cy={y0 - 20} r={20} className="dw-l" fill="none" />
      <circle cx={bx} cy={y0 - 20} r={20} className="dw-l" fill="none" />
      <Arrow x1={gxp} y1={gyp} x2={gxp} y2={gyp + 40} c="f" w={2} />
      {a !== 0 && <Arrow x1={gxp} y1={gyp} x2={gxp + Math.sign(a) * Math.min(70, (Math.abs(a) / g) * 80)} y2={gyp} c="f" w={2} />}
      <Arrow x1={ax} y1={y0 + Math.max(0, N.NA) * kN} x2={ax} y2={y0} c="a" w={3} />
      <Arrow x1={bx} y1={y0 + Math.max(0, N.NB) * kN} x2={bx} y2={y0} c="a" w={3} />
      <text x={ax - 8} y={y0 + 40} textAnchor="end" className="dw-t dw-ta">F_NA</text>
      <text x={bx + 8} y={y0 + 40} className="dw-t dw-ta">F_NB</text>
      <Arrow x1={60} y1={24} x2={14} y2={24} c="v" w={2} />
      <text x={64} y={28} className="dw-t dw-tv">moto</text>
      <text x={ax} y={y0 - 16} textAnchor="middle" className="dw-t dw-tm">A</text>
      <text x={bx} y={y0 - 16} textAnchor="middle" className="dw-t dw-tm">B</text>
    </svg>
  );
  const rows: [string, string][] = [
    [modo === 'frenata' ? 'decelerazione massima' : 'a_max', `${fmt(aMax, 3)} m/s² = ${fmt(aMax / g, 3)} g`],
    ['F_NA / Mg (anteriore)', fmt(N.NA / (M * g), 3)],
    ['F_NB / Mg (posteriore)', fmt(N.NB / (M * g), 3)],
    ['trasferimento M|a|h/L', `${fmt((M * Math.abs(a) * hL * L) / L / (M * g), 3)} Mg`],
  ];
  if (modo === 'posteriore') {
    rows.push(['formula di p. 91 (NF-16)', `${fmt(v.aMaxPostDispensa, 3)} m/s²`]);
    if (v.impennata) rows.push(['f_ad ≥ l₂/h', `si impenna: a = g l₂/h = ${fmt(v.aDragster, 3)}`]);
  }
  if (modo === 'frenata') rows.push(['ripartizione ideale F_TA/F_TB', v.stoppie ? '—' : fmt(v.ripartizioneIdeale, 3)]);
  if (modo !== 'frenata') rows.push(['l\'altra trazione', `${fmt(modo === 'anteriore' ? v.aMaxPost : v.aMaxAnt, 3)} m/s²`]);
  return (
    <Mech
      title="Veicolo: trasferimento di carico e limite d'aderenza"
      svg={svgEl}
      side={
        <>
          <Toggle value={modo} onChange={setModo} label="caso" options={[{ v: 'anteriore', t: 'trazione ant.' }, { v: 'posteriore', t: 'trazione post.' }, { v: 'frenata', t: 'frenata' }]} />
          <Slider label="a / a_max" value={frac} min={0} max={1} step={0.01} onChange={setFrac} />
          <Slider label="f_ad" value={f} min={0.3} max={1.2} step={0.01} onChange={setF} />
          <Slider label="h / L" value={hL} min={0.1} max={0.45} step={0.01} onChange={setHL} />
          <Slider label="peso statico sull'anteriore l₂/L" value={p} min={0.4} max={0.7} step={0.01} onChange={setP} />
          <Readout rows={rows} />
        </>
      }
      note="Frecce delle normali proporzionali al carico. Accelerando si carica il posteriore, frenando l'anteriore. M = 1200 kg, L = 2,6 m."
    />
  );
}

/** Curva: slittamento e ribaltamento dell'auto, angolo di piega della moto (pp. 93–96, 102). */
function CurvaAnim() {
  const [modo, setModo] = useState<'auto' | 'moto'>('auto');
  const [vk, setVk] = useState(60);
  const [R, setR] = useState(60);
  const [f, setF] = useState(0.9);
  const [h, setH] = useState(0.6);
  const [c, setC] = useState(1.5);
  const M = 1000, g = 9.81;
  const r = curva({ M, R, c, h, f, v: vk / 3.6 });
  const y0 = 210, svgEl =
    modo === 'auto' ? (
      (() => {
        const ax = 90, bx = ax + 120 * (c / 1.5), gx = (ax + bx) / 2, gy = y0 - 90 * (h / 0.6) * 0.7;
        const kN = 100 / (M * g);
        const tilt = r.FND <= 0 ? -8 : 0;
        return (
          <svg viewBox="0 0 320 260" className="dw" role="img" aria-label="Auto in curva vista da dietro">
            <line x1={10} y1={y0} x2={310} y2={y0} className="dw-g" strokeWidth={2} />
            <g transform={`rotate(${tilt} ${ax} ${y0})`}>
              <polygon points={pts([[ax - 16, y0 - 18], [ax - 10, gy - 20], [gx - 24, gy - 46], [gx + 24, gy - 46], [bx + 10, gy - 20], [bx + 16, y0 - 18]])} className="dw-l" fill="none" />
              <circle cx={gx} cy={gy} r={4} className="dw-fill" />
              <circle cx={ax} cy={y0 - 13} r={13} className="dw-l" fill="none" />
              <circle cx={bx} cy={y0 - 13} r={13} className="dw-l" fill="none" />
            </g>
            <Arrow x1={gx} y1={gy} x2={gx - Math.min(90, (r.Fc / (M * g)) * 60)} y2={gy} c="f" w={2} />
            <Arrow x1={gx} y1={gy} x2={gx} y2={gy + 40} c="f" w={2} />
            <Arrow x1={ax} y1={y0 + Math.max(0, r.FNS) * kN} x2={ax} y2={y0} c="a" w={3} />
            <Arrow x1={bx} y1={y0 + Math.max(0, r.FND) * kN} x2={bx} y2={y0} c="a" w={3} />
            <text x={ax - 6} y={y0 + 44} textAnchor="end" className="dw-t dw-ta">F_NS (est.)</text>
            <text x={bx + 6} y={y0 + 44} className="dw-t dw-ta">F_ND (int.)</text>
            <text x={160} y={24} textAnchor="middle" className={`dw-t ${r.stato === 'ok' ? 'dw-tm' : 'dw-tf'}`}>{r.stato === 'ok' ? 'curva a destra: tiene' : r.stato === 'ribaltamento' ? 'si ribalta (F_ND = 0)' : 'slitta lateralmente'}</text>
          </svg>
        );
      })()
    ) : (
      (() => {
        const P: P2 = [160, y0];
        const Lm = 150;
        const al = r.alphaMoto;
        const G: P2 = [P[0] + Lm * 0.75 * Math.sin(al), P[1] - Lm * 0.75 * Math.cos(al)];
        const top: P2 = [P[0] + Lm * Math.sin(al), P[1] - Lm * Math.cos(al)];
        const fuori = al > r.phiAd;
        return (
          <svg viewBox="0 0 320 260" className="dw" role="img" aria-label="Motociclo in piega con cono d'aderenza">
            <line x1={10} y1={y0} x2={310} y2={y0} className="dw-g" strokeWidth={2} />
            <line x1={P[0]} y1={P[1]} x2={P[0] + 130 * Math.sin(r.phiAd)} y2={P[1] - 130 * Math.cos(r.phiAd)} className="dw-d" />
            <line x1={P[0]} y1={P[1]} x2={P[0] - 130 * Math.sin(r.phiAd)} y2={P[1] - 130 * Math.cos(r.phiAd)} className="dw-d" />
            <line x1={P[0]} y1={P[1]} x2={top[0]} y2={top[1]} className="dw-l" strokeWidth={5} />
            <circle cx={G[0]} cy={G[1]} r={4} className="dw-fill" />
            <Arrow x1={P[0]} y1={P[1]} x2={P[0] + 110 * Math.sin(al)} y2={P[1] - 110 * Math.cos(al)} c={fuori ? 'f' : 'a'} w={3} />
            <text x={P[0] - 10} y={P[1] + 18} className="dw-t dw-tm">P</text>
            <text x={160} y={24} textAnchor="middle" className={`dw-t ${fuori ? 'dw-tf' : 'dw-tm'}`}>{fuori ? 'α > φ_ad: slitta' : 'risultante nel cono: tiene'}</text>
          </svg>
        );
      })()
    );
  return (
    <Mech
      title="Curva: slittamento, ribaltamento e angolo di piega"
      svg={svgEl}
      side={
        <>
          <Toggle value={modo} onChange={setModo} label="veicolo" options={[{ v: 'auto', t: 'autoveicolo' }, { v: 'moto', t: 'motociclo' }]} />
          <Slider label="v" value={vk} min={0} max={200} step={1} onChange={setVk} unit="km/h" />
          <Slider label="R" value={R} min={15} max={300} step={1} onChange={setR} unit="m" />
          <Slider label="f_ad" value={f} min={0.2} max={1.2} step={0.01} onChange={setF} />
          {modo === 'auto' && <Slider label="h" value={h} min={0.3} max={1.8} step={0.01} onChange={setH} unit="m" />}
          {modo === 'auto' && <Slider label="c" value={c} min={1.2} max={2.2} step={0.01} onChange={setC} unit="m" />}
          <Readout
            rows={
              modo === 'auto'
                ? [
                    ['v_slip = √(f g R)', `${fmt(r.vSlip * 3.6, 3)} km/h`],
                    ['v_rib = √(R c g/2h)', `${fmt(r.vRib * 3.6, 3)} km/h`],
                    ['arriva prima', r.primo],
                    ['F_ND / Mg (interna)', fmt(r.FND / (M * g), 3)],
                    ['F_NS / Mg (esterna)', fmt(r.FNS / (M * g), 3)],
                  ]
                : [
                    ['α = atan(v²/gR)', `${fmt(r.alphaMoto / RAD, 3)}°`],
                    ['φ_ad = atan f_ad', `${fmt(r.phiAd / RAD, 3)}°`],
                    ['v_max = √(f g R)', `${fmt(r.vSlip * 3.6, 3)} km/h`],
                  ]
            }
          />
        </>
      }
      note={modo === 'auto' ? 'Curva a destra vista da dietro: S esterna, D interna, G a metà carreggiata.' : 'L\'angolo di piega è l\'inclinazione della risultante di contatto: deve restare nel cono d\'aderenza.'}
    />
  );
}

/** Cuscinetto volvente (pp. 98–99): gabbia e rotazione propria; carico sui rulli. */
function CuscinettoAnim() {
  const [wi, setWi] = useState(0.5);
  const [we, setWe] = useState(0);
  const [z, setZ] = useState(12);
  const clock = useClock();
  const Ri = 46, Re = 76, cx = 95, cy = 120;
  const k = cuscinettoCinematica({ omegaI: wi, omegaE: we, Ri, Re });
  const car = cuscinettoCarico({ Q: 1, z });
  const T = 2 * Math.PI * clock.t * 0.4;
  const zv = 10;
  const svgEl = (
    <svg viewBox="0 0 360 250" className="dw" role="img" aria-label="Cuscinetto volvente: gabbia, elementi e distribuzione del carico">
      <circle cx={cx} cy={cy} r={Re + 8} className="dw-g" fill="none" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={Re} className="dw-l" fill="none" />
      <circle cx={cx} cy={cy} r={Ri} className="dw-l" fill="none" />
      <circle cx={cx} cy={cy} r={Ri - 8} className="dw-g" fill="none" strokeWidth={2} />
      {[0, 1, 2, 3].map((j) => {
        const a = -(we * T) + (j * Math.PI) / 2;
        return <line key={`e${j}`} x1={cx + (Re + 1) * Math.cos(a)} y1={cy + (Re + 1) * Math.sin(a)} x2={cx + (Re + 8) * Math.cos(a)} y2={cy + (Re + 8) * Math.sin(a)} className="dw-a" strokeWidth={3} />;
      })}
      {[0, 1, 2, 3].map((j) => {
        const a = -(wi * T) + (j * Math.PI) / 2;
        return <line key={`i${j}`} x1={cx} y1={cy} x2={cx + (Ri - 8) * Math.cos(a)} y2={cy + (Ri - 8) * Math.sin(a)} className="dw-m" />;
      })}
      {Array.from({ length: zv }, (_, j) => {
        const a = -(k.omegaG * T) + (j * 2 * Math.PI) / zv;
        const gx = cx + k.Rg * Math.cos(a), gy = cy + k.Rg * Math.sin(a);
        const s = -(k.omegaV * T);
        return (
          <g key={j}>
            <circle cx={gx} cy={gy} r={k.r - 1.5} className="dw-l" fill="none" />
            <line x1={gx} y1={gy} x2={gx + (k.r - 2) * Math.cos(s)} y2={gy + (k.r - 2) * Math.sin(s)} className="dw-v" strokeWidth={2} />
          </g>
        );
      })}
      <text x={cx} y={16} textAnchor="middle" className="dw-t dw-tm">anelli, gabbia, elementi</text>
      {/* distribuzione del carico */}
      <line x1={200} y1={200} x2={350} y2={200} className="dw-m" />
      {car.idx.map((i, j) => {
        const x = 200 + ((j + 0.5) * 150) / car.idx.length;
        const hgt = 140 * Math.cos(i * car.gamma);
        return <rect key={i} x={x - 4} y={200 - hgt} width={8} height={hgt} className="dw-a" />;
      })}
      <text x={275} y={218} textAnchor="middle" className="dw-t dw-tm">P_i / P₀ = cos iγ</text>
      <text x={275} y={40} textAnchor="middle" className="dw-t dw-tm">{car.idx.length} elementi caricati su {z}</text>
    </svg>
  );
  return (
    <Mech
      title="Cuscinetto: velocità della gabbia, rotazione propria e carico sui rulli"
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="ω_i" value={wi} min={-1} max={1} step={0.05} onChange={setWi} unit="(rel.)" />
          <Slider label="ω_e" value={we} min={-1} max={1} step={0.05} onChange={setWe} unit="(rel.)" />
          <Slider label="z (carico)" value={z} min={8} max={40} step={1} onChange={setZ} />
          <Readout
            rows={[
              ['ω_g = (ω_eR_e + ω_iR_i)/(R_e + R_i)', fmt(k.omegaG, 3)],
              ['ω_v = (ω_eR_e − ω_iR_i)/(R_e − R_i)', fmt(k.omegaV, 3)],
              ['ω_g / ω_i', wi !== 0 ? fmt(k.omegaG / wi, 3) : '—'],
              ['P₀ esatto (Q = 1)', fmt(car.P0, 4)],
              ['P₀ ≃ 4Q/z', fmt(car.P0approx, 4)],
            ]}
          />
        </>
      }
      note="Il trattino su ogni elemento mostra la sua rotazione propria. Con anello esterno fermo la gabbia gira a meno di metà dell'albero e l'elemento in verso opposto."
    />
  );
}

export const MECCANISMI_C2: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c2-cono': ConoAnim,
  'c2-impuntamento': ImpuntamentoAnim,
  'c2-perno': PernoAnim,
  'c2-veicolo': VeicoloAnim,
  'c2-curva': CurvaAnim,
  'c2-cuscinetto': CuscinettoAnim,
};
