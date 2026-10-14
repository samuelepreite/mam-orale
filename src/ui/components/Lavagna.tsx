/**
 * Lavagna: tratto a mano libera con pointer events (dito, penna con pressione, mouse), tre colori, gomma (cancella i
 * tratti toccati), annulla/ripeti, cancella foglio, più fogli, schermo intero (in orizzontale sul telefono),
 * esportazione PNG. Accanto (o sotto): disegno di riferimento a scomparsa e checklist da spuntare.
 * I tratti sono in coordinate logiche 1000 × 700 (il foglio si ridisegna a ogni dimensione e tema).
 * Con una penna attiva i tocchi del dito vengono ignorati (appoggio del palmo).
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { ElementoDisegno } from '../../content/types';
import { Checklist, Svg } from './bits';

export const LW = 1000;
export const LH = 700;
type Colore = 'ink' | 'a' | 'r';
export interface Tratto {
  c: Colore;
  w: number;
  /** x, y, pressione (0–1) */
  p: [number, number, number][];
}
type Foglio = { tratti: Tratto[]; past: Tratto[][]; future: Tratto[][] };
const VAR: Record<Colore, string> = { ink: '--pen-ink', a: '--pen-a', r: '--pen-r' };
/** colori fissi dell'immagine esportata (fondo bianco, leggibile in ogni tema) */
const EXPORT: Record<Colore, string> = { ink: '#10202e', a: '#2346d8', r: '#c0392b' };

export interface LavagnaApi {
  /** PNG dei fogli non vuoti (impilati), o null se è tutto vuoto o il browser non sa esportare */
  toBlob(): Promise<Blob | null>;
  vuota(): boolean;
}

function disegna(ctx: CanvasRenderingContext2D, tratti: Tratto[], color: (c: Colore) => string, scale: number, ox = 0, oy = 0) {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const t of tratti) {
    ctx.strokeStyle = color(t.c);
    ctx.fillStyle = color(t.c);
    if (t.p.length === 1) {
      const [x, y, pr] = t.p[0];
      ctx.beginPath();
      ctx.arc(ox + x * scale, oy + y * scale, (t.w * (0.6 + pr) * scale) / 2, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    for (let i = 1; i < t.p.length; i++) {
      const [x0, y0] = t.p[i - 1];
      const [x1, y1, pr] = t.p[i];
      ctx.lineWidth = t.w * (0.6 + pr) * scale;
      ctx.beginPath();
      ctx.moveTo(ox + x0 * scale, oy + y0 * scale);
      ctx.lineTo(ox + x1 * scale, oy + y1 * scale);
      ctx.stroke();
    }
  }
}

const vicino = (t: Tratto, x: number, y: number, r: number) => t.p.some(([px, py]) => (px - x) ** 2 + (py - y) ** 2 <= r * r);

export function Lavagna({ riferimento, elementi, onApi, onCheck, aside, titolo = 'Lavagna' }: { riferimento?: { svg: string; didascalia?: string }; elementi?: ElementoDisegno[]; onApi?: (api: LavagnaApi) => void; onCheck?: (v: Record<string, boolean>) => void; aside?: ReactNode; titolo?: string }) {
  const [fogli, setFogli] = useState<Foglio[]>([{ tratti: [], past: [], future: [] }]);
  const [cur, setCur] = useState(0);
  const [colore, setColore] = useState<Colore>('ink');
  const [gomma, setGomma] = useState(false);
  const [full, setFull] = useState(false);
  const [rif, setRif] = useState(false);
  const [check, setCheck] = useState<Record<string, boolean>>({});
  const canvas = useRef<HTMLCanvasElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const live = useRef<Tratto | null>(null);
  const penna = useRef(false);
  const fogliRef = useRef(fogli);
  fogliRef.current = fogli;
  const foglio = fogli[cur];

  // geometria: coordinate logiche → pixel del canvas (letterbox se il rapporto non è 10:7)
  const geo = useCallback(() => {
    const el = canvas.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const scale = Math.min(r.width / LW, r.height / LH) || 1;
    return { r, scale, ox: (r.width - LW * scale) / 2, oy: (r.height - LH * scale) / 2 };
  }, []);

  const redraw = useCallback(() => {
    const el = canvas.current;
    const g = geo();
    if (!el || !g) return;
    const ctx = el.getContext?.('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.round(g.r.width * dpr));
    const h = Math.max(1, Math.round(g.r.height * dpr));
    if (el.width !== w || el.height !== h) {
      el.width = w;
      el.height = h;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, g.r.width, g.r.height);
    const cs = getComputedStyle(el);
    const col = (c: Colore) => cs.getPropertyValue(VAR[c]).trim() || EXPORT[c];
    // bordo del foglio logico (visibile solo in schermo intero, se c'è letterbox)
    if (g.ox > 1 || g.oy > 1) {
      ctx.strokeStyle = cs.getPropertyValue('--line').trim() || '#ccc';
      ctx.lineWidth = 1;
      ctx.strokeRect(g.ox, g.oy, LW * g.scale, LH * g.scale);
    }
    disegna(ctx, [...fogliRef.current[cur].tratti, ...(live.current ? [live.current] : [])], col, g.scale, g.ox, g.oy);
  }, [cur, geo]);

  useEffect(() => {
    redraw();
  }, [fogli, cur, full, redraw]);
  useEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => redraw()) : null;
    ro?.observe(el);
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const on = () => redraw();
    mq?.addEventListener?.('change', on);
    const mo = typeof MutationObserver !== 'undefined' ? new MutationObserver(on) : null;
    mo?.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      ro?.disconnect();
      mq?.removeEventListener?.('change', on);
      mo?.disconnect();
    };
  }, [redraw]);

  // API per l'esportazione
  useEffect(() => {
    onApi?.({
      vuota: () => fogliRef.current.every((f) => f.tratti.length === 0),
      toBlob: () =>
        new Promise((resolve) => {
          const pieni = fogliRef.current.filter((f) => f.tratti.length).slice(0, 3);
          if (!pieni.length) return resolve(null);
          try {
            const c = document.createElement('canvas');
            const S = 1.2;
            c.width = LW * S;
            c.height = LH * S * pieni.length;
            const ctx = c.getContext('2d');
            if (!ctx || !c.toBlob) return resolve(null);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, c.width, c.height);
            pieni.forEach((f, i) => {
              if (i) {
                ctx.strokeStyle = '#c8d0d8';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, i * LH * S);
                ctx.lineTo(c.width, i * LH * S);
                ctx.stroke();
              }
              disegna(ctx, f.tratti, (k) => EXPORT[k], S, 0, i * LH * S);
            });
            c.toBlob((b) => resolve(b), 'image/png');
          } catch {
            resolve(null);
          }
        }),
    });
  }, [onApi]);

  const setFoglio = (fn: (f: Foglio) => Foglio) => setFogli((fs) => fs.map((f, i) => (i === cur ? fn(f) : f)));
  const commit = (tratti: Tratto[]) => setFoglio((f) => ({ tratti, past: [...f.past, f.tratti].slice(-80), future: [] }));
  const logico = (e: React.PointerEvent) => {
    const g = geo();
    if (!g) return null;
    const x = (e.clientX - g.r.left - g.ox) / g.scale;
    const y = (e.clientY - g.r.top - g.oy) / g.scale;
    return [Math.max(0, Math.min(LW, x)), Math.max(0, Math.min(LH, y))] as [number, number];
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'pen') penna.current = true;
    if (penna.current && e.pointerType === 'touch') return;
    const q = logico(e);
    if (!q) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    e.preventDefault();
    if (gomma) {
      live.current = { c: 'ink', w: 0, p: [[q[0], q[1], 0]] };
      const rest = foglio.tratti.filter((t) => !vicino(t, q[0], q[1], 14));
      if (rest.length !== foglio.tratti.length) commit(rest);
      return;
    }
    const pr = e.pointerType === 'pen' && e.pressure > 0 ? e.pressure : 0.5;
    live.current = { c: colore, w: colore === 'ink' ? 3.2 : 3.6, p: [[q[0], q[1], pr]] };
    redraw();
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const t = live.current;
    if (!t) return;
    if (penna.current && e.pointerType === 'touch') return;
    const q = logico(e);
    if (!q) return;
    if (gomma) {
      const fs = fogliRef.current[cur];
      const rest = fs.tratti.filter((x) => !vicino(x, q[0], q[1], 14));
      if (rest.length !== fs.tratti.length) commit(rest);
      return;
    }
    const [lx, ly] = t.p[t.p.length - 1];
    if ((q[0] - lx) ** 2 + (q[1] - ly) ** 2 < 2.5) return;
    t.p.push([q[0], q[1], e.pointerType === 'pen' && e.pressure > 0 ? e.pressure : 0.5]);
    redraw();
  };
  const up = () => {
    const t = live.current;
    live.current = null;
    if (!t || gomma) return;
    commit([...fogliRef.current[cur].tratti, t]);
  };

  const undo = () => setFoglio((f) => (f.past.length ? { tratti: f.past[f.past.length - 1], past: f.past.slice(0, -1), future: [f.tratti, ...f.future] } : f));
  const redo = () => setFoglio((f) => (f.future.length ? { tratti: f.future[0], past: [...f.past, f.tratti], future: f.future.slice(1) } : f));

  const tools = (
    <div className="lav-tools" role="toolbar" aria-label="strumenti della lavagna">
      {(['ink', 'a', 'r'] as Colore[]).map((c) => (
        <button key={c} type="button" className={!gomma && colore === c ? 'on' : ''} aria-pressed={!gomma && colore === c} aria-label={`penna ${c === 'ink' ? 'inchiostro' : c === 'a' ? 'blu' : 'rossa'}`} onClick={() => { setColore(c); setGomma(false); }}>
          <i className={`swatch ${c === 'ink' ? 'ink' : c === 'a' ? 'acc' : 'red'}`} />
        </button>
      ))}
      <button type="button" className={gomma ? 'on' : ''} aria-pressed={gomma} onClick={() => setGomma((g) => !g)}>
        gomma
      </button>
      <button type="button" onClick={undo} disabled={!foglio.past.length} aria-label="annulla">
        ↶ annulla
      </button>
      <button type="button" onClick={redo} disabled={!foglio.future.length} aria-label="ripeti">
        ↷ ripeti
      </button>
      <button type="button" onClick={() => commit([])} disabled={!foglio.tratti.length}>
        cancella
      </button>
      <span className="spacer" />
      <button type="button" onClick={() => setFull((f) => !f)} aria-pressed={full}>
        {full ? 'chiudi' : 'schermo intero'}
      </button>
    </div>
  );
  const pages = (
    <div className="lav-pages" aria-label="fogli">
      {fogli.map((_, i) => (
        <button key={i} type="button" className={i === cur ? 'on' : ''} aria-pressed={i === cur} onClick={() => setCur(i)}>
          foglio {i + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={() => {
          setFogli((fs) => [...fs, { tratti: [], past: [], future: [] }]);
          setCur(fogli.length);
        }}
        disabled={fogli.length >= 6}
      >
        + foglio
      </button>
      {full && <span className="small muted">Gira il telefono in orizzontale per avere più spazio.</span>}
    </div>
  );
  const side =
    riferimento || elementi?.length || aside ? (
      <div className="lav-side">
        {aside}
        {elementi && elementi.length > 0 && (
          <div className="card tight">
            <p className="kicker">Checklist del disegno</p>
            <Checklist
              elementi={elementi}
              value={check}
              onChange={(v) => {
                setCheck(v);
                onCheck?.(v);
              }}
            />
          </div>
        )}
        {riferimento && (
          <div className="card tight">
            <button type="button" className="link" aria-expanded={rif} onClick={() => setRif((r) => !r)}>
              {rif ? 'Nascondi il disegno di riferimento' : 'Mostra il disegno di riferimento'}
            </button>
            {rif && (
              <figure className="figura">
                <Svg svg={riferimento.svg} />
                {riferimento.didascalia && <figcaption>{riferimento.didascalia}</figcaption>}
              </figure>
            )}
          </div>
        )}
      </div>
    ) : null;
  return (
    <div className={`lav-wrap ${side ? 'with-side' : ''}`}>
      <div className={`lavagna ${full ? 'full' : ''}`} aria-label={titolo}>
        {tools}
        <div ref={sheet} className={`lav-sheet ${gomma ? 'erase' : ''}`}>
          <canvas ref={canvas} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={(e) => e.buttons === 0 && up()} aria-label="foglio della lavagna: disegna con il dito, la penna o il mouse" role="img" />
        </div>
        {pages}
      </div>
      {side}
    </div>
  );
}
