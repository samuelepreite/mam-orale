/**
 * Piccolo linguaggio per i disegni di riferimento (figure della dispensa ridisegnate).
 * Produce stringhe SVG che seguono il tema: i colori vengono dalle classi CSS `.dw-*` (styles.css), mai da colori
 * letterali. Coordinate in unità del viewBox, y verso il basso come in SVG; gli ANGOLI invece sono in gradi con la
 * convenzione matematica (0° = destra, 90° = in alto, antiorario positivo), così si leggono come alla lavagna.
 *
 * Classi di tratto: 'l' linea (inchiostro), 'a' accento (grandezza cercata), 'f' forza, 'v' velocità,
 * 'd' tratteggio (costruzione), 'm' muted (quote, assi secondari), 'g' telaio.
 */
export type Cls = 'l' | 'a' | 'f' | 'v' | 'd' | 'm' | 'g' | 'fill' | 'soft';

const r2 = (x: number) => Math.round(x * 10) / 10;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rad = (deg: number) => (deg * Math.PI) / 180;
/** punto sulla circonferenza (angolo matematico in gradi) */
export const pt = (cx: number, cy: number, r: number, deg: number): [number, number] => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];

export function svg(w: number, h: number, parts: string[], title = ''): string {
  return `<svg viewBox="0 0 ${w} ${h}" class="dw" role="img"${title ? ` aria-label="${esc(title)}"` : ''} xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`;
}

export const line = (x1: number, y1: number, x2: number, y2: number, c: Cls = 'l', w?: number) =>
  `<line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" class="dw-${c}"${w ? ` stroke-width="${w}"` : ''}/>`;

export const poly = (pts: [number, number][], c: Cls = 'l', closed = false) =>
  `<${closed ? 'polygon' : 'polyline'} points="${pts.map((p) => `${r2(p[0])},${r2(p[1])}`).join(' ')}" class="dw-${c}"/>`;

export const circle = (cx: number, cy: number, r: number, c: Cls = 'l') => `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}" class="dw-${c}"/>`;

export const rect = (x: number, y: number, w: number, h: number, c: Cls = 'l', rot = 0) =>
  `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" class="dw-${c}"${rot ? ` transform="rotate(${-rot} ${r2(x + w / 2)} ${r2(y + h / 2)})"` : ''}/>`;

/** arco da a0 a a1 (gradi, antiorario se a1 > a0) */
export function arc(cx: number, cy: number, r: number, a0: number, a1: number, c: Cls = 'l') {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 0 : 1;
  return `<path d="M${r2(x0)},${r2(y0)} A${r2(r)},${r2(r)} 0 ${large} ${sweep} ${r2(x1)},${r2(y1)}" class="dw-${c}"/>`;
}

function head(x1: number, y1: number, x2: number, y2: number, c: Cls, size = 8) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p = (da: number): [number, number] => [x2 - size * Math.cos(a + da), y2 - size * Math.sin(a + da)];
  return poly([[x2, y2], p(0.4), p(-0.4)], (c === 'l' || c === 'd' ? 'l' : c) as Cls, true).replace('class="dw-', 'class="dw-h dw-');
}

export const text = (x: number, y: number, s: string, opt: { anchor?: 'start' | 'middle' | 'end'; c?: 'l' | 'a' | 'f' | 'v' | 'm'; size?: number; it?: boolean } = {}) =>
  `<text x="${r2(x)}" y="${r2(y)}" text-anchor="${opt.anchor ?? 'middle'}" dominant-baseline="middle" class="dw-t dw-t${opt.c ?? 'l'}"${opt.size ? ` font-size="${opt.size}"` : ''}${opt.it ? ' font-style="italic"' : ''}>${esc(s)}</text>`;

/** vettore con punta in (x2,y2); etichetta facoltativa vicino alla punta (dx, dy di scostamento) */
export function arrow(x1: number, y1: number, x2: number, y2: number, c: Cls = 'f', label?: string, dx = 10, dy = -10) {
  return line(x1, y1, x2, y2, c) + head(x1, y1, x2, y2, c) + (label ? text(x2 + dx, y2 + dy, label, { c: c === 'f' || c === 'v' || c === 'a' ? c : 'l' }) : '');
}

/** freccia curva (rotazione): arco da a0 ad a1 con la punta in a1 */
export function rot(cx: number, cy: number, r: number, a0: number, a1: number, c: Cls = 'v', label?: string) {
  const [xa, ya] = pt(cx, cy, r, a1 - Math.sign(a1 - a0) * 4);
  const [xb, yb] = pt(cx, cy, r, a1);
  const [xl, yl] = pt(cx, cy, r + 14, (a0 + a1) / 2);
  return arc(cx, cy, r, a0, a1, c) + head(xa, ya, xb, yb, c, 7) + (label ? text(xl, yl, label, { c: c === 'f' || c === 'v' || c === 'a' ? c : 'l' }) : '');
}

/** segno d'angolo tra due direzioni (gradi) con etichetta */
export function angle(cx: number, cy: number, r: number, a0: number, a1: number, label: string, c: Cls = 'm') {
  const [xl, yl] = pt(cx, cy, r + 11, (a0 + a1) / 2);
  return arc(cx, cy, r, a0, a1, c) + text(xl, yl, label, { c: c === 'a' ? 'a' : 'm', size: 13 });
}

/** telaio tratteggiato lungo il segmento (lato tratteggi verso il basso/destra) */
export function ground(x1: number, y1: number, x2: number, y2: number) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  const nx = -uy, ny = ux;
  let s = line(x1, y1, x2, y2, 'g', 2);
  for (let d = 4; d < L; d += 9) {
    const px = x1 + ux * d, py = y1 + uy * d;
    s += line(px, py, px + (nx - ux) * 7, py + (ny - uy) * 7, 'g', 1);
  }
  return s;
}

/** cerniera fissa: cerchietto, triangolo e telaio */
export function pin(x: number, y: number, label?: string) {
  return poly([[x, y], [x - 11, y + 17], [x + 11, y + 17]], 'l', true) + ground(x - 17, y + 17, x + 17, y + 17) + circle(x, y, 4, 'fill') + (label ? text(x - 18, y - 6, label, { anchor: 'end' }) : '');
}

/** cerniera (coppia rotoidale) tra due membri */
export const hinge = (x: number, y: number, label?: string, dx = 10, dy = -12) => circle(x, y, 4.5, 'fill') + (label ? text(x + dx, y + dy, label) : '');

/** quota tra due punti, spostata di `off` sulla normale */
export function dim(x1: number, y1: number, x2: number, y2: number, label: string, off = 14) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
  const a1x = x1 + nx * off, a1y = y1 + ny * off, a2x = x2 + nx * off, a2y = y2 + ny * off;
  return (
    line(x1, y1, a1x + nx * 4, a1y + ny * 4, 'm', 1) +
    line(x2, y2, a2x + nx * 4, a2y + ny * 4, 'm', 1) +
    line(a1x, a1y, a2x, a2y, 'm', 1) + head(a2x, a2y, a1x, a1y, 'm', 6) + head(a1x, a1y, a2x, a2y, 'm', 6) +
    text((a1x + a2x) / 2 + nx * 10, (a1y + a2y) / 2 + ny * 10, label, { c: 'm', size: 13 })
  );
}

/** punto notevole (piccolo pieno) con etichetta */
export const dot = (x: number, y: number, label?: string, dx = 9, dy = -10, c: 'l' | 'a' = 'l') =>
  `<circle cx="${r2(x)}" cy="${r2(y)}" r="3" class="dw-dot dw-dot${c}"/>` + (label ? text(x + dx, y + dy, label, { c }) : '');
