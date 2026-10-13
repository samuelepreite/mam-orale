/**
 * Meccanismi animati del capitolo C6 (accoppiamento motore–carico). Tutti i numeri vengono da src/engine/c6.ts.
 *  - c6-regime: le due caratteristiche, punti di regime e loro stabilità, il sistema che si muove (pp. 197–199)
 *  - c6-transitorio: avviamento da fermo e t_90% (pp. 199–200), anche con trasmissione (p. 201)
 *  - c6-tau-ottimo: accelerazione del carico e del motore in funzione di τ (d107, NF-29)
 *  - c6-frizione: dallo strisciamento alla sincronizzazione in Q, poi aderenza (pp. 202–206)
 */
import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import {
  CARICO_P197, CARICO_P198, DATI_FRIZIONE, MOTORE_ASINCRONO, cmAsincrono, cuParabolico, dcmAsincrono, dcuParabolico,
  frizione, omegaDotCarico, omegaDotDiretto, omegaDotMotore, passoDiretto, puntiDiRegime, ridotte, tauOttimo, transitorioCC,
} from '../engine/c6';
import { fmt } from '../engine/num';
import { Arrow, Mech, PlayBtn, Readout, Slider, Toggle, useClock } from './anim';
import { conDy } from '../content/c6/etichette';

type Pt = [number, number];
const path = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');
const campiona = (f: (x: number) => number, a: number, b: number, n = 120): [number, number][] => Array.from({ length: n + 1 }, (_, k) => { const x = a + ((b - a) * k) / n; return [x, f(x)]; });

/** testo SVG con pedici e apici («C_m», «ω_m^I») */
function Lab({ x, y, s, textAnchor, className = 'dw-t dw-tl' }: { x: number; y: number; s: string; textAnchor?: 'start' | 'middle' | 'end'; className?: string }) {
  return (
    <text x={x} y={y} textAnchor={textAnchor} className={className}>
      {conDy(s).map((p, i) => <tspan key={i} fontSize={p.s < 1 ? `${Math.round(p.s * 100)}%` : undefined} dy={p.dy ? `${p.dy.toFixed(3)}em` : undefined}>{p.t}</tspan>)}
    </text>
  );
}

/** assi di un grafico con etichette (classi dw-*) */
function Assi({ x0, y0, w, h, xl, yl }: { x0: number; y0: number; w: number; h: number; xl: string; yl: string }) {
  return (
    <g>
      <Arrow x1={x0} y1={y0} x2={x0 + w + 10} y2={y0} c="l" w={1.5} size={7} />
      <Arrow x1={x0} y1={y0} x2={x0} y2={y0 - h - 10} c="l" w={1.5} size={7} />
      <Lab x={x0 + w + 10} y={y0 + 16} textAnchor="middle" s={xl} />
      <Lab x={x0 - 6} y={y0 - h - 6} textAnchor="end" s={yl} />
    </g>
  );
}

const reduceMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// ================================================================== c6-regime
function RegimeAnim() {
  const M = MOTORE_ASINCRONO, I = 2;
  const [es, setEs] = useState<'p197' | 'p198'>('p197');
  const [Cu0, setCu0] = useState(CARICO_P197.Cu0);
  const [tang, setTang] = useState<'si' | 'no'>('si');
  const k2 = es === 'p197' ? CARICO_P197.k2 : CARICO_P198.k2;
  const C = { Cu0, k2 };
  const cm = (w: number) => cmAsincrono(w, M), cu = (w: number) => cuParabolico(w, C);
  const punti = useMemo(() => puntiDiRegime(cm, cu, M.omegaS, (w) => dcmAsincrono(w, M), (w) => dcuParabolico(w, C)), [Cu0, k2]); // eslint-disable-line react-hooks/exhaustive-deps
  // stato dinamico: ω e storia ω(t) in ref; un contatore forza il ridisegno a ogni fotogramma
  const wRef = useRef(0);
  const [, setFrame] = useState(0);
  const [play, setPlay] = useState(!reduceMotion());
  const storia = useRef<Pt[]>([[0, 0]]);
  const tempo = useRef(0);
  const ref = useRef({ cm, cu });
  ref.current = { cm, cu };
  useEffect(() => {
    if (!play) return;
    let raf = 0, last: number | null = null;
    const tick = (now: number) => {
      if (last != null) {
        const dt = Math.min(0.05, (now - last) / 1000);
        let y = wRef.current;
        for (let k = 0; k < 5; k++) y = passoDiretto(y, dt / 5, ref.current.cm, ref.current.cu, I);
        wRef.current = y;
        tempo.current += dt;
        storia.current.push([tempo.current, y]);
        if (storia.current.length > 900) storia.current.shift();
        setFrame((n) => n + 1);
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play]);
  const w = wRef.current;
  const vai = (nuova: number, azzera = false) => {
    if (azzera) { tempo.current = 0; storia.current = []; }
    storia.current.push([tempo.current, nuova]);
    wRef.current = nuova;
    setFrame((n) => n + 1);
  };
  const cambiaEs = (v: 'p197' | 'p198') => {
    setEs(v);
    setCu0(v === 'p197' ? CARICO_P197.Cu0 : CARICO_P198.Cu0);
    // nell'esempio di p. 198 da fermo non si parte: si mette il sistema appena sopra Q
    const nuovo = v === 'p197' ? 0 : 20;
    vai(nuovo, true);
  };
  // grafico C–ω
  const x0 = 34, y0 = 178, W = 290, H = 160, wMax = M.omegaS * 1.04, cMax = 120;
  const sx = (x: number) => x0 + (x / wMax) * W, sy = (c: number) => y0 - (Math.max(-5, Math.min(cMax, c)) / cMax) * H;
  const cmw = cm(w), cuw = cu(w), wd = omegaDotDiretto(w, cm, cu, I);
  // grafico ω(t) degli ultimi secondi
  const tx0 = 34, ty0 = 292, TW = 290, TH = 80, finestra = 15;
  const tFine = Math.max(finestra, tempo.current);
  const tr = storia.current.filter(([t]) => t >= tFine - finestra).map(([t, x]) => [tx0 + ((t - (tFine - finestra)) / finestra) * TW, ty0 - (x / wMax) * TH] as Pt);
  const svgEl = (
    <svg viewBox="0 0 340 314" className="dw" role="img" aria-label="Caratteristiche del motore e dell'utilizzatore con il punto di regime">
      <Assi x0={x0} y0={y0} w={W} h={H} xl="ω" yl="C" />
      <path d={path(campiona(cm, 0, M.omegaS).map(([x, c]) => [sx(x), sy(c)]))} className="dw-l" />
      <path d={path(campiona(cu, 0, wMax).map(([x, c]) => [sx(x), sy(c)]))} className="dw-a" />
      <Lab x={sx(30)} y={sy(cm(30)) - 10} className="dw-t dw-tl" s="C_m" />
      <Lab x={sx(wMax) - 4} y={sy(cu(wMax)) + (cu(wMax) > cMax ? 14 : -8)} textAnchor="end" className="dw-t dw-ta" s="C_u" />
      {tang === 'si' && punti.map((p, i) => (
        <g key={`t${i}`}>
          <line x1={sx(p.omega - 12)} y1={sy(p.C - 12 * p.Km)} x2={sx(p.omega + 12)} y2={sy(p.C + 12 * p.Km)} className="dw-d" />
          <line x1={sx(p.omega - 12)} y1={sy(p.C - 12 * p.Ku)} x2={sx(p.omega + 12)} y2={sy(p.C + 12 * p.Ku)} className="dw-d" />
        </g>
      ))}
      {punti.map((p, i) => (
        <g key={i}>
          <circle cx={sx(p.omega)} cy={sy(p.C)} r={5} className={p.stabile ? 'dw-dot dw-dota' : 'dw-l'} />
          <text x={sx(p.omega) + (p.stabile ? -10 : 8)} y={sy(p.C) - 10} className="dw-t dw-ta">{p.stabile ? 'P' : 'Q'}</text>
        </g>
      ))}
      {/* stato attuale: segmento fra le due coppie, freccia del segno di ω̇ */}
      <line x1={sx(w)} y1={sy(cmw)} x2={sx(w)} y2={sy(cuw)} className={cmw >= cuw ? 'dw-v' : 'dw-f'} strokeWidth={3} />
      <line x1={sx(w)} y1={sy(Math.max(cmw, cuw))} x2={sx(w)} y2={y0} className="dw-m" />
      <circle cx={sx(w)} cy={y0} r={4.5} className="dw-dot dw-dota" />
      {Math.abs(wd) > 0.05 && <Arrow x1={sx(w)} y1={y0 - 8} x2={sx(w) + Math.sign(wd) * Math.min(40, 6 + 2 * Math.abs(wd))} y2={y0 - 8} c={wd > 0 ? 'v' : 'f'} w={2} size={7} />}
      {/* ω(t) */}
      <Assi x0={tx0} y0={ty0} w={TW} h={TH} xl="t" yl="ω" />
      {punti.filter((p) => p.stabile).map((p, i) => <line key={i} x1={tx0} y1={ty0 - (p.omega / wMax) * TH} x2={tx0 + TW} y2={ty0 - (p.omega / wMax) * TH} className="dw-d" />)}
      {tr.length > 1 && <path d={path(tr)} className="dw-v" />}
    </svg>
  );
  const avvia = cm(0) > Cu0;
  return (
    <Mech
      title="Punto di regime e stabilità: dove si incrociano le caratteristiche"
      svg={svgEl}
      side={
        <>
          <Toggle value={es} onChange={cambiaEs} label="esempio" options={[{ v: 'p197', t: 'p. 197: un punto' }, { v: 'p198', t: 'p. 198: Q e P' }]} />
          <Slider label="C_u0" value={Cu0} min={0} max={90} step={1} onChange={setCu0} unit="N·m" />
          <div className="mech-controls">
            <button type="button" className="mech-btn" onClick={() => setPlay(!play)} aria-label={play ? 'pausa' : 'avvia'}>{play ? '❚❚ pausa' : '▶ avvia'}</button>
            <button type="button" className="mech-btn" onClick={() => vai(0, true)}>da fermo</button>
            <button type="button" className="mech-btn" onClick={() => vai(Math.max(0, w - 8))}>perturba −</button>
            <button type="button" className="mech-btn" onClick={() => vai(w + 8)}>perturba +</button>
          </div>
          <Toggle value={tang} onChange={setTang} label="rette tangenti" options={[{ v: 'si', t: 'tangenti' }, { v: 'no', t: 'senza' }]} />
          <Readout
            rows={[
              ['ω', `${fmt(w, 3)} rad/s`],
              ['C_m − C_u', `${fmt(cmw - cuw, 3)} N·m`],
              ['ω̇ = (C_m − C_u)/I', `${fmt(wd, 3)} rad/s²`],
              ['avviamento', avvia ? `C_A = ${fmt(cm(0), 3)} > C_u0: parte` : `C_A = ${fmt(cm(0), 3)} < C_u0: da fermo non parte`],
              ...punti.map((p, i) => [`${p.stabile ? 'P' : 'Q'}${punti.length > 2 ? i + 1 : ''}: ω = ${fmt(p.omega, 3)}`, `K_m − K_u = ${fmt(p.Km - p.Ku, 3)} → ${p.stabile ? 'stabile' : 'instabile'}`] as [string, string]),
              ...(punti.length === 0 ? [['regime', 'nessuna intersezione: il sistema si ferma'] as [string, string]] : []),
            ]}
          />
        </>
      }
      note="Motore asincrono (forma di Kloss: C_max = 100 N·m, ω_s = 100 rad/s), utilizzatore C_u = C_u0 + k ω², inerzia totale I = 2 kg·m². Pallino pieno = stabile, vuoto = instabile."
    />
  );
}

// ================================================================== c6-transitorio
function TransitorioAnim({ params }: { params?: Record<string, number | string> }) {
  const conTr = Number(params?.trasmissione ?? 0) === 1;
  const Cm0 = 100;
  const [Km, setKm] = useState(1.5);
  const [Ieq0, setIeq0] = useState(3);
  const [Cu0, setCu0] = useState(conTr ? 120 : 40);
  const [Iu, setIu] = useState(20);
  const [tau, setTau] = useState(0.4);
  const [eta, setEta] = useState(0.9);
  const Im = 0.5;
  const rid = ridotte({ Im, Iu, tau, eta, Cu: Cu0 });
  const Ieq = conTr ? rid.Ieq : Ieq0, CuR = conTr ? rid.CuRid : Cu0;
  const parte = CuR < Cm0;
  const r = transitorioCC({ Cm0, Km, Cu0: CuR, Ieq });
  const t90 = r.tPerc(0.9);
  const Tend = parte ? Math.max(1, 2.2 * t90) : 1;
  const clock = useClock();
  const t = parte ? clock.t % (Tend + 1.2) : 0;
  const tv = Math.min(t, Tend);
  // grafici
  const ax = 30, ay = 170, AW = 120, AH = 120, wS = Cm0 / Km;
  const asx = (w: number) => ax + (w / (wS * 1.05)) * AW, asy = (c: number) => ay - (c / (Cm0 * 1.1)) * AH;
  const bx = 190, by = 170, BW = 140, BH = 120, wTop = Math.max(10, r.wP * 1.15);
  const bsx = (s: number) => bx + (s / Tend) * BW, bsy = (w: number) => by - (Math.max(0, w) / wTop) * BH;
  const svgEl = (
    <svg viewBox="0 0 350 200" className="dw" role="img" aria-label="Transitorio di avviamento verso la velocità di regime">
      <Assi x0={ax} y0={ay} w={AW} h={AH} xl="ω" yl="C" />
      <line x1={asx(0)} y1={asy(Cm0)} x2={asx(wS)} y2={asy(0)} className="dw-l" />
      <line x1={asx(0)} y1={asy(CuR)} x2={asx(wS * 1.05)} y2={asy(CuR)} className="dw-a" />
      <Lab x={asx(0) + 4} y={asy(Cm0) - 6} className="dw-t dw-tl" s="C_m" />
      <Lab x={asx(wS * 1.05)} y={asy(CuR) - 6} textAnchor="end" className="dw-t dw-ta" s={conTr ? 'τC_u/η' : 'C_u0'} />
      {parte && <circle cx={asx(r.wP)} cy={asy(CuR)} r={4.5} className="dw-dot dw-dota" />}
      {parte && <circle cx={asx(r.omega(tv))} cy={ay} r={4} className="dw-dot dw-dotl" />}
      <Assi x0={bx} y0={by} w={BW} h={BH} xl="t" yl={conTr ? 'ω_m' : 'ω'} />
      {parte && (
        <>
          <line x1={bx} y1={bsy(r.wP)} x2={bx + BW} y2={bsy(r.wP)} className="dw-d" />
          <line x1={bx} y1={bsy(0.9 * r.wP)} x2={bx + BW} y2={bsy(0.9 * r.wP)} className="dw-m" />
          <Lab x={bx + BW} y={bsy(r.wP) - 5} textAnchor="end" className="dw-t dw-tm" s="ω_P" />
          <Lab x={bx + BW} y={bsy(0.9 * r.wP) + 12} textAnchor="end" className="dw-t dw-tm" s="0,9 ω_P" />
          <line x1={bsx(t90)} y1={bsy(0.9 * r.wP)} x2={bsx(t90)} y2={by} className="dw-d" />
          <Lab x={bsx(t90)} y={by + 15} textAnchor="middle" className="dw-t dw-ta" s="t_90" />
          <path d={path(campiona(r.omega, 0, Tend).map(([s, x]) => [bsx(s), bsy(x)]))} className="dw-m" />
          <path d={path(campiona(r.omega, 0, tv, 80).map(([s, x]) => [bsx(s), bsy(x)]))} className="dw-v" strokeWidth={2.5} />
          <circle cx={bsx(tv)} cy={bsy(r.omega(tv))} r={4} className="dw-dot dw-dota" />
        </>
      )}
    </svg>
  );
  return (
    <Mech
      title={conTr ? 'Avviamento con trasmissione: tutto ridotto all\'albero motore' : 'Avviamento da fermo: ω tende a ω_P, al 90 % dopo 2,3 costanti di tempo'}
      svg={svgEl}
      side={
        <>
          <PlayBtn clock={clock} />
          <Slider label="K_m" value={Km} min={0.5} max={3} step={0.05} onChange={setKm} unit="N·m·s" />
          {conTr ? (
            <>
              <Slider label="τ" value={tau} min={0.1} max={1} step={0.01} onChange={setTau} />
              <Slider label="η" value={eta} min={0.6} max={1} step={0.01} onChange={setEta} />
              <Slider label="I_u" value={Iu} min={2} max={60} step={1} onChange={setIu} unit="kg·m²" />
              <Slider label="C_u0" value={Cu0} min={0} max={300} step={5} onChange={setCu0} unit="N·m" />
            </>
          ) : (
            <>
              <Slider label="I_eq" value={Ieq0} min={0.5} max={8} step={0.1} onChange={setIeq0} unit="kg·m²" />
              <Slider label="C_u0" value={Cu0} min={0} max={95} step={1} onChange={setCu0} unit="N·m" />
            </>
          )}
          <Readout
            rows={[
              ...(conTr ? ([['I_eq = I_m + τ²I_u/η', `${fmt(Ieq, 3)} kg·m²`], ['C_u* = τC_u/η', `${fmt(CuR, 3)} N·m`]] as [string, string][]) : []),
              ['ω_P = (C_m0 − C_u)/K_m', parte ? `${fmt(r.wP, 3)} rad/s` : 'non parte'],
              ...(conTr && parte ? ([['ω_u a regime = τ ω_P', `${fmt(tau * r.wP, 3)} rad/s`]] as [string, string][]) : []),
              ['costante di tempo I_eq/K_m', `${fmt(r.T, 3)} s`],
              ['t₉₀ = (I_eq/K_m) ln 10', parte ? `${fmt(t90, 3)} s` : '—'],
              ['riga di D senza ln (NF-28)', `${fmt(-r.tPercDispensa(0.9), 3)} s ✗`],
              ['t', `${fmt(tv, 3)} s`],
            ]}
          />
        </>
      }
      note={conTr ? 'Motore c.c. C_m = 100 − K_m ω_m, I_m = 0,5 kg·m², utilizzatore a coppia costante C_u0 ridotto con τ/η.' : 'Motore c.c. C_m = 100 − K_m ω (K_m modulo della pendenza), utilizzatore a coppia costante.'}
    />
  );
}

// ================================================================== c6-tau-ottimo
function TauOttimoAnim() {
  const Cm = 10, Im = 0.02;
  const [Iu, setIu] = useState(2);
  const [Cu, setCu] = useState(0);
  const [tau, setTau] = useState(0.05);
  const p = { Cm, Cu, Im, Iu };
  const to = tauOttimo(p), t0 = Math.sqrt(Im / Iu);
  const tMax = 3 * t0;
  const wu = (x: number) => omegaDotCarico(x, p), wm = (x: number) => omegaDotMotore(x, p);
  const wuMax = Math.max(...campiona(wu, 0, tMax, 200).map(([, y]) => y)) * 1.15 || 1;
  const wmMax = Cm / Im;
  const x0 = 34, W = 290;
  const sx = (x: number) => x0 + (x / tMax) * W;
  const ay = 120, AH = 95, by = 250, BH = 95;
  const asy = (y: number) => ay - (Math.max(-0.1 * wuMax, y) / wuMax) * AH, bsy = (y: number) => by - (Math.max(-0.1 * wmMax, y) / wmMax) * BH;
  const tv = Math.min(tau, tMax);
  const svgEl = (
    <svg viewBox="0 0 340 270" className="dw" role="img" aria-label="Accelerazione del carico e del motore in funzione del rapporto di trasmissione">
      <Assi x0={x0} y0={ay} w={W} h={AH} xl="τ" yl="ω̇_u" />
      <path d={path(campiona(wu, 0, tMax).map(([x, y]) => [sx(x), asy(y)]))} className="dw-a" />
      <line x1={sx(to)} y1={asy(wu(to))} x2={sx(to)} y2={ay} className="dw-d" />
      <circle cx={sx(to)} cy={asy(wu(to))} r={4.5} className="dw-dot dw-dota" />
      <Lab x={sx(to)} y={ay + 13} textAnchor="middle" className="dw-t dw-ta" s="τ_opt" />
      <circle cx={sx(tv)} cy={asy(wu(tv))} r={4} className="dw-dot dw-dotl" />
      <Assi x0={x0} y0={by} w={W} h={BH} xl="τ" yl="ω̇_m" />
      <path d={path(campiona(wm, 0, tMax).map(([x, y]) => [sx(x), bsy(y)]))} className="dw-m" />
      <circle cx={sx(tv)} cy={bsy(wm(tv))} r={4} className="dw-dot dw-dotl" />
      <text x={sx(tMax)} y={by - BH + 4} textAnchor="end" className="dw-t dw-tm">ω̇ₘ è massima per τ → 0 (NF-29)</text>
    </svg>
  );
  return (
    <Mech
      title="Rapporto ottimo: si massimizza l'accelerazione del carico, non del motore"
      svg={svgEl}
      side={
        <>
          <Slider label="τ" value={tau} min={0.001} max={tMax} step={tMax / 300} onChange={setTau} show={(v) => fmt(v, 3)} />
          <Slider label="I_u" value={Iu} min={0.2} max={20} step={0.1} onChange={setIu} unit="kg·m²" />
          <Slider label="C_u" value={Cu} min={0} max={40} step={0.5} onChange={setCu} unit="N·m" />
          <Readout
            rows={[
              ['τ_opt', fmt(to, 4)],
              ['√(I_m/I_u) (vale se C_u = 0)', fmt(t0, 4)],
              ['ω̇_u(τ)', `${fmt(wu(tv), 3)} rad/s²`],
              ['ω̇_u(τ_opt)', `${fmt(wu(to), 3)} rad/s²`],
              ['ω̇_m(τ)', `${fmt(wm(tv), 3)} rad/s²`],
              ['τ² I_u confrontato con I_m', `${fmt(tv * tv * Iu, 3)} / ${fmt(Im, 3)}`],
            ]}
          />
        </>
      }
      note="C_m = 10 N·m, I_m = 0,02 kg·m², η = 1. Non è nella dispensa: deduzione dall'equazione di p. 201."
    />
  );
}

// ================================================================== c6-frizione
function FrizioneAnim() {
  const [Cfr, setCfr] = useState(DATI_FRIZIONE.Cfr);
  const [Iu, setIu] = useState(DATI_FRIZIONE.Iu);
  const [tau, setTau] = useState(DATI_FRIZIONE.tau);
  const p = { ...DATI_FRIZIONE, Cfr, Iu, tau };
  const F = useMemo(() => frizione(p), [Cfr, Iu, tau]); // eslint-disable-line react-hooks/exhaustive-deps
  const fine = F.stallo ? F.tStallo : isFinite(F.tQ) ? F.tQ + 3.5 * F.Teq : 5 * F.Tm;
  const clock = useClock();
  const [t0, setT0] = useState(0);
  const lento = 0.6; // secondi simulati per secondo reale
  const t = Math.min(fine, Math.max(0, (clock.t - t0) * lento));
  const fase = F.fase(t);
  const wm = fase === 'stallo' ? 0 : F.omegaM(t), wc = F.omegaC(t);
  const th = F.angoli(t);
  const vis = 0.05; // scala delle rotazioni disegnate
  // dischi
  const disco = (cx: number, cy: number, r: number, ang: number, cls: string, nome: string, sym: string) => (
    <g>
      <circle cx={cx} cy={cy} r={r} className={cls} />
      {[0, 1, 2, 3].map((k) => { const a = -ang * vis + (k * Math.PI) / 2; return <line key={k} x1={cx} y1={cy} x2={cx + r * 0.9 * Math.cos(a)} y2={cy + r * 0.9 * Math.sin(a)} className={cls} />; })}
      <text x={cx} y={cy + r + 14} textAnchor="middle" className="dw-t dw-tm" fontSize={11}>{nome}</text>
      <Lab x={cx} y={cy + r + 30} textAnchor="middle" s={sym} />
    </g>
  );
  // grafico ω(t)
  const x0 = 36, y0 = 308, W = 290, H = 150, wTop = Math.max(p.wI, F.wReg) * 1.08;
  const sx = (s: number) => x0 + (s / fine) * W, sy = (w: number) => y0 - (Math.max(0, w) / wTop) * H;
  const tQv = Math.min(F.tQ, fine);
  const svgEl = (
    <svg viewBox="0 0 340 330" className="dw" role="img" aria-label="Innesto della frizione: velocità dei due dischi fino alla sincronizzazione">
      {disco(60, 62, 36, th.m, 'dw-v', 'disco motore', 'ω_m')}
      {disco(160, 62, 36, th.c, 'dw-a', 'disco condotto', 'ω_c')}
      {disco(275, 62, 26, tau * th.c, 'dw-l', 'utilizzatore', 'ω_u = τ ω_c')}
      <text x={110} y={18} textAnchor="middle" className="dw-t dw-tf">{fase === 'strisciamento' ? 'strisciano' : fase === 'aderenza' ? 'aderenza' : 'motore spento'}</text>
      <Assi x0={x0} y0={y0} w={W} h={H} xl="t" yl="ω" />
      {isFinite(F.wReg) && !F.stallo && <line x1={x0} y1={sy(F.wReg)} x2={x0 + W} y2={sy(F.wReg)} className="dw-d" />}
      <path d={path(campiona(F.omegaMs, 0, tQv).map(([s, w]) => [sx(s), sy(w)]))} className="dw-m" />
      <path d={path(campiona(F.omegaCs, 0, tQv).map(([s, w]) => [sx(s), sy(w)]))} className="dw-m" />
      {isFinite(F.tQ) && F.tQ < fine && <path d={path(campiona(F.omegaAd, F.tQ, fine).map(([s, w]) => [sx(s), sy(w)]))} className="dw-m" />}
      <path d={path(campiona(F.omegaM, 0, Math.max(1e-6, t), 90).map(([s, w]) => [sx(s), sy(w)]))} className="dw-v" strokeWidth={2.5} />
      <path d={path(campiona(F.omegaC, 0, Math.max(1e-6, t), 90).map(([s, w]) => [sx(s), sy(w)]))} className="dw-a" strokeWidth={2.5} />
      {isFinite(F.tQ) && F.tQ < fine && (
        <g>
          <line x1={sx(F.tQ)} y1={sy(F.wQ)} x2={sx(F.tQ)} y2={y0} className="dw-d" />
          <circle cx={sx(F.tQ)} cy={sy(F.wQ)} r={5} className="dw-dot dw-dota" />
          <text x={sx(F.tQ) + 8} y={sy(F.wQ) + 16} className="dw-t dw-ta">Q</text>
          <Lab x={sx(F.tQ)} y={y0 + 13} textAnchor="middle" className="dw-t dw-tl" s="t_Q" />
        </g>
      )}
      <line x1={sx(t)} y1={y0} x2={sx(t)} y2={y0 - H} className="dw-m" />
      <Lab x={x0 + 4} y={sy(p.wI) - 6} className="dw-t dw-tv" s="ω_m" />
    </svg>
  );
  const Cnow = fase === 'strisciamento' ? Cfr : fase === 'aderenza' ? F.CfrAder(t) : 0;
  return (
    <Mech
      title="Frizione: dallo strisciamento alla sincronizzazione"
      svg={svgEl}
      side={
        <>
          <div className="mech-controls">
            <PlayBtn clock={clock} />
            <button type="button" className="mech-btn" onClick={() => setT0(clock.t)}>rilascia di nuovo</button>
          </div>
          <Slider label="C_fr" value={Cfr} min={40} max={280} step={5} onChange={setCfr} unit="N·m" />
          <Slider label="I_u" value={Iu} min={2} max={200} step={1} onChange={setIu} unit="kg·m²" />
          <Slider label="τ" value={tau} min={0.2} max={1} step={0.01} onChange={setTau} />
          <Readout
            rows={[
              ['t', `${fmt(t, 3)} s · ${fase}`],
              ['ω_m · ω_c', `${fmt(wm, 3)} · ${fmt(wc, 3)} rad/s`],
              ['velocità relativa', `${fmt(fase === 'strisciamento' ? wm - wc : 0, 3)} rad/s`],
              ['coppia nella frizione', `${fmt(Cnow, 3)} N·m${fase === 'aderenza' ? ` (limite ${fmt(F.limite, 3)})` : ''}`],
              ['t_Q · ω_Q', isFinite(F.tQ) ? `${fmt(F.tQ, 3)} s · ${fmt(F.wQ, 3)} rad/s` : 'non si sincronizza'],
              ['ω_m,REG = (C_m0 − τC_u)/K_m', `${fmt(F.wReg, 3)} rad/s`],
              ['energia dissipata', `${fmt(F.energia(t) / 1000, 3)} kJ`],
              ['innesto impulsivo (5.83)', `${fmt(F.Eimp / 1000, 3)} kJ`],
              ...(!F.caricoParte ? ([['attenzione', 'C_fr ≤ τC_u: il carico non parte']] as [string, string][]) : []),
              ...(F.stallo ? ([['attenzione', `il motore scende sotto ω_MIN a t = ${fmt(F.tStallo, 3)} s: si spegne`]] as [string, string][]) : []),
              ...(!F.aderenzaTiene ? ([['attenzione', 'in Q la coppia richiesta supera il limite: tornerebbe a slittare']] as [string, string][]) : []),
            ]}
          />
        </>
      }
      note="Motore linearizzato C_m = 300 − 2 ω_m (ω_m^I = 150 rad/s, ω_MIN = 25 rad/s), I_m = 1 kg·m², carico a coppia costante C_u = 40 N·m, f_att/f = 1,25. Tempo rallentato."
    />
  );
}

export const MECCANISMI_C6: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  'c6-regime': RegimeAnim,
  'c6-transitorio': TransitorioAnim,
  'c6-tau-ottimo': TauOttimoAnim,
  'c6-frizione': FrizioneAnim,
};
