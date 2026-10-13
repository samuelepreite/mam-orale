/**
 * C7 · Disegni di riferimento (figure della dispensa pp. 208–223 ridisegnate con src/content/svg.ts).
 * Pezzi comuni: parete, molla a zig-zag, smorzatore a pistone, blocco tra guide, grafici con curve calcolate dal motore.
 */
import { arrow, circle, dim, dot, ground, line, poly, rect, rot, svg, text, type Cls } from '../svg';
import { amplificazione, fase, libera, trasmissibilita } from '../../engine/c7';

// ------------------------------------------------------------------ pezzi
/** molla orizzontale a zig-zag da x1 a x2 alla quota y */
export function molla(x1: number, y: number, x2: number, n = 6, amp = 7, c: Cls = 'l') {
  const lead = Math.min(10, (x2 - x1) * 0.15);
  const a = x1 + lead, b = x2 - lead, step = (b - a) / (2 * n);
  const pts: [number, number][] = [[x1, y], [a, y]];
  for (let i = 0; i < 2 * n; i++) pts.push([a + step * (i + 0.5), y + (i % 2 ? amp : -amp)]);
  pts.push([b, y], [x2, y]);
  return poly(pts, c);
}
/** molla verticale da y1 a y2 alla x */
export function mollaV(x: number, y1: number, y2: number, n = 6, amp = 7) {
  const lead = Math.min(10, (y2 - y1) * 0.15);
  const a = y1 + lead, b = y2 - lead, step = (b - a) / (2 * n);
  const pts: [number, number][] = [[x, y1], [x, a]];
  for (let i = 0; i < 2 * n; i++) pts.push([x + (i % 2 ? amp : -amp), a + step * (i + 0.5)]);
  pts.push([x, b], [x, y2]);
  return poly(pts, 'l');
}
/** smorzatore viscoso orizzontale (cilindro aperto a destra, pistone collegato a x2) */
export function smorzatore(x1: number, y: number, x2: number) {
  const L = x2 - x1, xa = x1 + L * 0.25, xb = x1 + L * 0.62, xp = x1 + L * 0.5;
  return (
    line(x1, y, xa, y) +
    poly([[xb, y - 9], [xa, y - 9], [xa, y + 9], [xb, y + 9]], 'l') +
    line(xp, y - 6, xp, y + 6, 'l', 2.5) + line(xp, y, x2, y)
  );
}
/** parete verticale (telaio) con tratteggio a sinistra */
export const parete = (x: number, y1: number, y2: number) => ground(x, y1, x, y2);
/** pavimento con tratteggio sotto */
export const pavimento = (x1: number, x2: number, y: number) => ground(x1, y, x2, y);
/** guida superiore (tratteggio sopra) */
export const guidaSopra = (x1: number, x2: number, y: number) => ground(x2, y, x1, y);
/** blocco (massa) con etichetta */
export const blocco = (x: number, y: number, w: number, h: number, label: string) => rect(x, y, w, h, 'l') + text(x + w / 2, y + h / 2, label, { size: 15 });

// ------------------------------------------------------------------ grafici
export interface Assi { x0: number; y0: number; w: number; h: number; xmax: number; ymax: number; ymin?: number }
const X = (a: Assi, x: number) => a.x0 + (x / a.xmax) * a.w;
const Y = (a: Assi, y: number) => a.y0 - ((y - (a.ymin ?? 0)) / (a.ymax - (a.ymin ?? 0))) * a.h;
export function assi(a: Assi, xl: string, yl: string, xt: number[] = [], yt: number[] = []) {
  const y0 = Y(a, 0);
  let s = arrow(a.x0, Math.max(y0, a.y0 - a.h) , a.x0, a.y0 - a.h - 10, 'm') + arrow(a.x0, y0, a.x0 + a.w + 10, y0, 'm');
  if ((a.ymin ?? 0) < 0) s += line(a.x0, a.y0, a.x0, y0, 'm', 1);
  s += text(a.x0 + a.w + 10, y0 - 10, xl, { c: 'm', size: 12, anchor: 'end' }) + text(a.x0 + 6, a.y0 - a.h - 12, yl, { c: 'm', size: 12, anchor: 'start' });
  for (const t of xt) s += line(X(a, t), y0 - 3, X(a, t), y0 + 3, 'm', 1) + text(X(a, t), y0 + 12, String(t).replace('.', ','), { c: 'm', size: 10 });
  for (const t of yt) s += line(a.x0 - 3, Y(a, t), a.x0 + 3, Y(a, t), 'm', 1) + text(a.x0 - 6, Y(a, t), String(t).replace('.', ','), { c: 'm', size: 10, anchor: 'end' });
  return s;
}
/** curva y = f(x) su [x1, x2], tagliata a ymax (spezzata in più tratti dove esce dal riquadro) */
export function curva(a: Assi, f: (x: number) => number, c: Cls = 'a', x1 = 0, x2 = a.xmax, n = 160) {
  const tratti: [number, number][][] = [];
  let cur: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const x = x1 + ((x2 - x1) * i) / n, y = f(x);
    if (!Number.isFinite(y) || y > a.ymax * 1.02 || y < (a.ymin ?? 0) - 0.02 * a.ymax) {
      if (cur.length > 1) tratti.push(cur);
      cur = [];
      continue;
    }
    cur.push([X(a, x), Y(a, y)]);
  }
  if (cur.length > 1) tratti.push(cur);
  return tratti.map((t) => poly(t, c)).join('');
}
export const etichettaCurva = (a: Assi, x: number, y: number, s: string, c: 'a' | 'm' | 'l' = 'm') => text(X(a, x), Y(a, y), s, { c, size: 11 });
export const puntoGrafico = (a: Assi, x: number, y: number, label?: string, dx = 10, dy = -10) => dot(X(a, x), Y(a, y), label, dx, dy, 'a');
export const lineaGrafico = (a: Assi, x1: number, y1: number, x2: number, y2: number, c: Cls = 'd') => line(X(a, x1), Y(a, y1), X(a, x2), Y(a, y2), c, 1);

// ------------------------------------------------------------------ figure dei capitoli

/** pp. 209–210: oscillatore orizzontale (con forze) e oscillatore verticale (riposo / equilibrio statico) */
export function figLibere() {
  const s: string[] = [];
  // orizzontale (p. 209)
  s.push(parete(30, 40, 130), guidaSopra(30, 250, 52), pavimento(30, 250, 128));
  s.push(molla(30, 90, 130), blocco(130, 58, 70, 70, 'm'), dot(165, 104, 'G', 10, 6));
  s.push(arrow(130, 74, 92, 74, 'f', 'Fₑₗ', -6, -8), arrow(200, 74, 238, 74, 'f', 'Fᵢₙ', 4, -9));
  s.push(arrow(165, 104, 165, 148, 'f', 'mg', 16, -2), arrow(150, 128, 150, 108, 'f'), text(140, 116, 'Fₙ', { c: 'f', size: 12, anchor: 'end' }));
  s.push(arrow(130, 34, 172, 34, 'm', 'x, î', 18, 0), line(130, 28, 130, 40, 'm', 1));
  s.push(text(140, 168, 'p. 209: x da molla a riposo', { c: 'm', size: 11 }));
  // verticale (p. 210)
  const vx = 340;
  s.push(guidaSopra(290, 400, 30), mollaV(vx, 30, 112), rect(vx - 30, 112, 60, 50, 'l'), text(vx - 12, 128, 'm', { size: 15 }), dot(vx, 145, 'G', 12, 0));
  s.push(rect(vx - 30, 82, 60, 50, 'd'));
  s.push(arrow(vx, 162, vx, 196, 'f', 'mg', 16, -4), arrow(vx + 46, 36, vx + 46, 74, 'm', 'x', 10, 0));
  s.push(dim(vx - 46, 30, vx - 46, 82, 'l₀', 10), dim(vx - 46, 82, vx - 46, 112, 'xˢᵀ', 12), text(vx + 38, 128, 'xˢᵀ = mg/K', { size: 12, anchor: 'start' }));
  s.push(text(vx, 214, 'p. 210: x = x′ + xˢᵀ', { c: 'm', size: 11 }));
  return svg(420, 230, s, 'Oscillatore armonico orizzontale con le forze e oscillatore verticale con la freccia statica');
}

/** p. 211: modello massa–molla–smorzatore, schema di corpo libero, risposte libere nei casi di p. 212–213 */
export function figSmorzate() {
  const s: string[] = [];
  s.push(parete(20, 30, 130), guidaSopra(20, 200, 34), pavimento(20, 200, 126));
  s.push(molla(20, 58, 120), smorzatore(20, 104, 120), blocco(120, 40, 66, 86, 'M'));
  s.push(text(70, 44, 'K', { size: 13 }), text(70, 122, 'c', { size: 13 }));
  // corpo libero (forze tutte positive verso +x, p. 211)
  s.push(rect(230, 52, 54, 54, 'l'), text(257, 79, 'm'));
  s.push(arrow(196, 62, 230, 62, 'f', 'Fₑₗ', -26, -8), arrow(196, 96, 230, 96, 'f', 'Fₛ', -26, 10), arrow(284, 70, 318, 70, 'f', 'Fᵢₙ', 4, -10));
  s.push(arrow(240, 30, 280, 30, 'm', 'x', 10, 0));
  // risposte libere (x₀ = 1, v₀ = 0, ω_m = 2π)
  const a: Assi = { x0: 40, y0: 278, w: 340, h: 100, xmax: 3.25, ymax: 1.05, ymin: -1.05 };
  const wm = 2 * Math.PI;
  s.push(assi({ ...a }, 't/Tₘ', 'x/x₀', [1, 2, 3], []));
  s.push(curva(a, (t) => libera(0.1, wm, 1, 0, t), 'a', 0, 3, 300), curva(a, (t) => Math.exp(-0.1 * wm * t), 'd', 0, 3), curva(a, (t) => -Math.exp(-0.1 * wm * t), 'd', 0, 3));
  s.push(curva(a, (t) => libera(1, wm, 1, 0, t), 'f', 0, 3), curva(a, (t) => libera(2, wm, 1, 0, t), 'v', 0, 3));
  for (const [i, [lab, cl]] of ([['ξ = 0,1 (sotto)', 'a'], ['ξ = 1 (critico)', 'f'], ['ξ = 2 (sovra)', 'v']] as const).entries()) s.push(line(250, 150 + 14 * i, 272, 150 + 14 * i, cl, 2.4), text(278, 150 + 14 * i, lab, { size: 11, anchor: 'start' }));
  return svg(420, 300, s, 'Massa, molla e smorzatore, schema di corpo libero e risposte libere sotto, critico e sovrasmorzate');
}

/** pp. 214–215, 217: piano complesso con i fasori della rigidezza dinamica e la proiezione sull'asse immaginario */
export function figComplex() {
  const rho = 0.8, xi = 0.25;
  const A = amplificazione(rho, xi), phi = fase(rho, xi);
  const cx = 120, cy = 128, S = 58; // F₀ (e F₀/K per lo spostamento) → 58 px
  const th = 0.75; // angolo ωt del fasore della forza
  const P = (r: number, a: number): [number, number] => [cx + S * r * Math.cos(a), cy - S * r * Math.sin(a)];
  const [fx, fy] = P(1, th);
  // catena delle forze in unità di F₀: K X̂ (∥ X̂), i c ω X̂ a +90°, −m ω² X̂ opposta: la somma chiude su F̂
  const k = A, d = 2 * xi * rho * A, mm = rho * rho * A;
  const p1 = P(k, th - phi);
  const p2: [number, number] = [p1[0] + S * d * Math.cos(th - phi + Math.PI / 2), p1[1] - S * d * Math.sin(th - phi + Math.PI / 2)];
  const p3: [number, number] = [p2[0] + S * mm * Math.cos(th - phi + Math.PI), p2[1] - S * mm * Math.sin(th - phi + Math.PI)];
  const s: string[] = [
    arrow(cx - 100, cy, cx + 175, cy, 'm', 'Re', -2, -10), arrow(cx, cy + 70, cx, cy - 115, 'm', 'Im', 14, 4),
    arrow(cx, cy, p1[0], p1[1], 'a'), arrow(p1[0], p1[1], p2[0], p2[1], 'v'), arrow(p2[0], p2[1], p3[0], p3[1], 'l'),
    arrow(cx, cy, fx, fy, 'f'),
    text(fx - 6, fy - 12, 'F̂', { c: 'f', size: 14 }),
    text((cx + p1[0]) / 2, (cy + p1[1]) / 2 + 16, 'K X̂', { c: 'a', size: 12 }),
    text((p1[0] + p2[0]) / 2 + 10, (p1[1] + p2[1]) / 2 + 4, 'icω X̂', { c: 'v', size: 12, anchor: 'start' }),
    text((p2[0] + p3[0]) / 2 + 6, (p2[1] + p3[1]) / 2 - 12, '−mω² X̂', { size: 12, anchor: 'start' }),
    line(fx, fy, cx + 190, fy, 'd', 1), line(p1[0], p1[1], cx + 190, p1[1], 'd', 1),
    dot(cx, fy), dot(cx, p1[1], undefined, 0, 0, 'a'),
    text(cx + 194, fy, 'Im → F₀ sin ωt', { c: 'f', size: 11, anchor: 'start' }),
    text(cx + 194, p1[1], 'Im → K x(t)', { c: 'a', size: 11, anchor: 'start' }),
    text(cx + 30, cy - 16, 'φ', { c: 'a', size: 13 }),
    rot(cx, cy, 26, 200, 250, 'v', 'ω'),
  ];
  return svg(420, 210, s, 'Fasori del complex replacement: forza, risposta in ritardo di φ e catena molla–smorzatore–massa');
}

/** p. 214 modello forzato e p. 215–216 diagrammi di A(ξ,ρ) e φ(ξ,ρ) */
export function figForzate() {
  const s: string[] = [];
  s.push(parete(20, 30, 120), guidaSopra(20, 170, 34), pavimento(20, 170, 116));
  s.push(molla(20, 55, 100), smorzatore(20, 96, 100), blocco(100, 40, 60, 76, 'm'));
  s.push(arrow(160, 78, 205, 78, 'f', 'F₀ sin ωt', 0, -14), arrow(100, 24, 140, 24, 'm', 'x', 10, 0));
  const a: Assi = { x0: 230, y0: 128, w: 170, h: 100, xmax: 3.25, ymax: 6 };
  s.push(assi(a, 'ρ', 'A', [1, 2, 3], [1, 3, 5]));
  for (const [xi, c] of [[0.1, 'a'], [0.3, 'f'], [0.5, 'v'], [0.8, 'm']] as const) s.push(curva(a, (r) => amplificazione(r, xi), c, 0, 3));
  s.push(curva(a, (r) => amplificazione(r, 0), 'd', 0, 3), etichettaCurva(a, 1.75, 4.6, 'ξ = 0,1', 'a'), etichettaCurva(a, 2.1, 1.3, 'ξ ↑', 'm'));
  const b: Assi = { x0: 230, y0: 262, w: 170, h: 90, xmax: 3.25, ymax: Math.PI };
  s.push(assi(b, 'ρ', 'φ', [1, 2, 3], []), text(b.x0 - 6, b.y0 - b.h, 'π', { c: 'm', size: 11, anchor: 'end' }), text(b.x0 - 6, b.y0 - b.h / 2, 'π/2', { c: 'm', size: 11, anchor: 'end' }));
  for (const [xi, c] of [[0.1, 'a'], [0.3, 'f'], [0.5, 'v'], [0.8, 'm']] as const) s.push(curva(b, (r) => fase(r, xi), c, 0, 3));
  s.push(lineaGrafico(b, 1, 0, 1, Math.PI / 2), lineaGrafico(b, 0, Math.PI / 2, 1, Math.PI / 2), puntoGrafico(b, 1, Math.PI / 2), etichettaCurva(b, 2.15, 0.55, '(1, π/2) per ogni ξ', 'm'));
  s.push(text(100, 160, 'A(ξ,ρ) = X₀/(F₀/K)', { size: 12 }), text(100, 182, 'φ = arctg 2ξρ/(1−ρ²)', { size: 12 }), text(100, 204, 'picco a ρ_R = √(1−2ξ²)', { c: 'm', size: 11 }));
  return svg(420, 285, s, 'Oscillatore forzato e diagrammi del fattore di amplificazione e della fase');
}

/** p. 223: statore tra guide con molla e smorzatore, rotore con massa puntiforme P a distanza R */
export function figEccentrica() {
  const s: string[] = [];
  s.push(parete(20, 30, 170), guidaSopra(20, 330, 34), pavimento(20, 330, 166));
  s.push(smorzatore(20, 62, 130), molla(20, 136, 130));
  s.push(text(75, 44, 'c', { size: 13 }), text(75, 154, 'K', { size: 13 }));
  s.push(rect(130, 40, 150, 126, 'l'), text(160, 156, 'statore M_S', { size: 11, anchor: 'start' }));
  const cx = 220, cy = 100, R = 42, th = (35 * Math.PI) / 180;
  const px = cx + R * Math.cos(th), py = cy - R * Math.sin(th);
  s.push(circle(cx, cy, 52, 'l'), dot(cx, cy, 'O', -12, 12), line(cx, cy, px, py, 'a', 2.5), circle(px, py, 7, 'fill'));
  s.push(text(px - 4, py - 14, 'P', { c: 'a', size: 12 }), text((cx + px) / 2 - 2, (cy + py) / 2 + 12, 'R', { c: 'a', size: 12 }));
  s.push(line(cx, cy, cx + 60, cy, 'd', 1), text(cx + 40, cy + 12, 'ωt', { c: 'm', size: 12 }), rot(cx, cy, 24, 110, 200, 'v', 'ω'));
  s.push(arrow(px, py, px + 30 * Math.cos(th), py - 30 * Math.sin(th), 'f'), text(px + 30 * Math.cos(th) + 6, py - 30 * Math.sin(th) - 2, 'M_R ω²R', { c: 'f', size: 12, anchor: 'start' }));
  s.push(arrow(130, 22, 175, 22, 'm', 'x_O', 14, 0), line(130, 16, 130, 28, 'm', 1));
  s.push(text(250, 196, 'M = M_S + M_R', { size: 12 }), text(115, 196, 'x_P = x_O + R cos ωt', { size: 12 }));
  return svg(420, 210, s, 'Massa eccentrica rotante: statore con molla e smorzatore, rotore con massa puntiforme a distanza R');
}

/** p. 219: base mobile x_V, molla tra A′ e A, smorzatore tra B′ e B, massa su guida prismatica */
export function figVincolo() {
  const s: string[] = [];
  s.push(rect(36, 34, 14, 120, 'soft'), rect(36, 34, 14, 120, 'l'));
  s.push(arrow(43, 172, 90, 172, 'a', 'x_V = X_V sin ωt', 40, 12), line(43, 160, 43, 180, 'a', 1));
  s.push(guidaSopra(150, 330, 40), pavimento(150, 330, 148));
  s.push(molla(50, 66, 170), smorzatore(50, 120, 170));
  s.push(dot(50, 66, 'A′', -18, -10), dot(170, 66, 'A', 6, -12), dot(50, 120, 'B′', -18, 12), dot(170, 120, 'B', 6, 14));
  s.push(blocco(170, 44, 90, 104, 'm'), dot(215, 110, 'G', 10, 6));
  s.push(text(110, 50, 'K', { size: 13 }), text(110, 102, 'c', { size: 13 }));
  s.push(arrow(170, 24, 215, 24, 'm', 'x_G', 14, 0), line(170, 18, 170, 30, 'm', 1));
  s.push(text(300, 72, 'F_el = −K(x_G − x_V)', { size: 11, anchor: 'start' }), text(300, 92, 'F_c = −c(ẋ_G − ẋ_V)', { size: 11, anchor: 'start' }));
  s.push(text(300, 124, 'x_G^R = x_G − x_V', { c: 'm', size: 11, anchor: 'start' }));
  return svg(420, 200, s, 'Eccitazione di vincolo: base mobile con molla e smorzatore collegati alla massa su guida');
}

/** pp. 220–222: forza trasmessa al muro e curve di trasmissibilità con il punto comune (√2, 1) */
export function figTrasmissibilita() {
  const s: string[] = [];
  s.push(parete(30, 30, 130), guidaSopra(90, 200, 36), pavimento(90, 200, 124));
  s.push(molla(30, 58, 110), smorzatore(30, 100, 110), line(110, 50, 110, 108, 'l', 3), line(110, 80, 130, 80, 'l', 3));
  s.push(blocco(130, 42, 60, 80, 'm'), arrow(190, 82, 228, 82, 'f', 'F₀ sin ωt', 0, -14));
  s.push(arrow(28, 58, 4, 58, 'a'), arrow(28, 100, 4, 100, 'a'), text(16, 144, 'F_T = Kx + cẋ', { c: 'a', size: 12, anchor: 'start' }));
  const a: Assi = { x0: 240, y0: 210, w: 160, h: 170, xmax: 3.2, ymax: 4 };
  s.push(assi(a, 'ρ', 'T_R', [1, 2, 3], [1, 2, 3]));
  s.push(`<rect x="${(240 + (Math.SQRT2 / 3.2) * 160).toFixed(1)}" y="${(210 - 170 / 4).toFixed(1)}" width="${((3 - Math.SQRT2) / 3.2 * 160).toFixed(1)}" height="${(170 / 4).toFixed(1)}" class="dw-soft"/>`);
  for (const [xi, c] of [[0.1, 'a'], [0.2, 'f'], [0.5, 'v'], [1, 'm']] as const) s.push(curva(a, (r) => trasmissibilita(r, xi), c, 0, 3));
  s.push(curva(a, (r) => trasmissibilita(r, 0), 'd', 0, 3));
  s.push(lineaGrafico(a, 0, 1, 3, 1), lineaGrafico(a, Math.SQRT2, 0, Math.SQRT2, 3.6), puntoGrafico(a, Math.SQRT2, 1, '(√2, 1)', 26, -12));
  s.push(text(240 + (0.7 / 3.2) * 160, 236, 'amplifica', { c: 'm', size: 11 }), text(240 + (2.2 / 3.2) * 160, 236, 'isola', { c: 'a', size: 11 }), etichettaCurva(a, 2.75, 0.95, 'ξ ↑', 'm'));
  s.push(text(120, 176, 'T_R = |F_T|/F₀ = |x_G|/X_V', { size: 12 }), text(120, 198, 'isolamento: ρ > √2', { c: 'a', size: 12 }));
  return svg(420, 248, s, 'Forza trasmessa al muro e curve di trasmissibilità che passano tutte per (√2, 1)');
}
