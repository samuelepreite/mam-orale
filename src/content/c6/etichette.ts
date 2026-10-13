/**
 * Etichette con pedici e apici per i disegni del capitolo C6 («C_m», «ω_m^I», «C_u0»): la stessa resa nei disegni di
 * riferimento (stringhe SVG, stesse classi di src/content/svg.ts) e nelle animazioni (src/diagrams/c6.tsx).
 * Si usano tspan con dy (non baseline-shift, che alcuni browser ignorano).
 */
export interface Pezzo { t: string; o: number; s: number }

const SUB = 0.3, SUP = -0.45, PICCOLO = 0.72;

/** divide «C_m^I» in pezzi con scostamento verticale (in em del testo base) e scala */
export function pezzi(label: string): Pezzo[] {
  const out: Pezzo[] = [];
  const re = /([_^])([A-Za-z0-9*,]+)/g;
  let k = 0, m: RegExpExecArray | null;
  while ((m = re.exec(label))) {
    if (m.index > k) out.push({ t: label.slice(k, m.index), o: 0, s: 1 });
    out.push({ t: m[2], o: m[1] === '_' ? SUB : SUP, s: PICCOLO });
    k = m.index + m[0].length;
  }
  if (k < label.length) out.push({ t: label.slice(k), o: 0, s: 1 });
  return out;
}

/** dy (in em del pezzo) per passare dallo scostamento precedente a quello del pezzo */
export function conDy(label: string): (Pezzo & { dy: number })[] {
  let cur = 0;
  return pezzi(label).map((p) => {
    const dy = (p.o - cur) / p.s;
    cur = p.o;
    return { ...p, dy };
  });
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const r1 = (x: number) => Math.round(x * 10) / 10;

/** come text() di svg.ts, ma con pedici/apici */
export function tx(x: number, y: number, label: string, opt: { anchor?: 'start' | 'middle' | 'end'; c?: 'l' | 'a' | 'f' | 'v' | 'm'; size?: number } = {}) {
  const inner = conDy(label)
    .map((p) => `<tspan${p.s < 1 ? ` font-size="${Math.round(p.s * 100)}%"` : ''}${p.dy ? ` dy="${p.dy.toFixed(3)}em"` : ''}>${esc(p.t)}</tspan>`)
    .join('');
  return `<text x="${r1(x)}" y="${r1(y)}" text-anchor="${opt.anchor ?? 'middle'}" dominant-baseline="middle" class="dw-t dw-t${opt.c ?? 'l'}"${opt.size ? ` font-size="${opt.size}"` : ''}>${inner}</text>`;
}
