/**
 * C5 parte a: figure di riferimento comuni (ridisegnate dalle figure delle pp. 159, 162, 166, 167, 169, 173).
 * Orientazione unica per tutto il capitolo, quella delle pp. 166–169: ruota 1 (grande) a sinistra, motrice e
 * antioraria; ruota 2 a destra, oraria; retta di pressione per C che sale verso destra, H₁ in basso a sinistra.
 */
import { angle, arrow, circle, dim, dot, line, poly, rot, svg, text } from '../svg';

const DEG = Math.PI / 180;
export const FIG = { ox: 130, oy: 150, R1: 110, R2: 80, a: 10, th: 22 * DEG };

/** punto in coordinate SVG a partire da coordinate matematiche relative a O₁ */
const S = (x: number, y: number): [number, number] => [FIG.ox + x, FIG.oy - y];

function quadretto(h: [number, number], d1: [number, number], d2: [number, number], k = 7) {
  const p1: [number, number] = [h[0] + d1[0] * k, h[1] + d1[1] * k];
  const p2: [number, number] = [h[0] + (d1[0] + d2[0]) * k, h[1] + (d1[1] + d2[1]) * k];
  const p3: [number, number] = [h[0] + d2[0] * k, h[1] + d2[1] * k];
  return poly([p1, p2, p3], 'm');
}

export interface OpzFig {
  teste?: boolean; // circonferenze di troncatura di testa e punti A, B
  AB?: boolean; // segmento dei contatti evidenziato
  simili?: boolean; // perpendicolari O₁H₁, O₂H₂ con gli angoli retti
  triangolo?: boolean; // triangolo O₁O₂H₂ (Carnot, interferenza)
  contatto?: 'P' | 'x'; // punto di contatto P (sopra C) o P in accesso a distanza x da C
  forze?: boolean; // F_N^{2,1}, F_T^{2,1}, V^rel_{1,2} nel punto P (accesso)
  titolo: string;
}

export function figIngranaggio(o: OpzFig): string {
  const { R1, R2, a, th } = FIG;
  const i = R1 + R2;
  const Rf1 = R1 * Math.cos(th), Rf2 = R2 * Math.cos(th);
  const u: [number, number] = [Math.sin(th), Math.cos(th)];
  const R = (s: number) => S(R1 + s * u[0], s * u[1]);
  const O1 = S(0, 0), O2 = S(i, 0), C = S(R1, 0);
  const CH1 = R1 * Math.sin(th), CH2 = R2 * Math.sin(th);
  const AC = Math.sqrt((R1 + a) ** 2 - Rf1 ** 2) - CH1;
  const BC = Math.sqrt((R2 + a) ** 2 - Rf2 ** 2) - CH2;
  const H1 = R(-CH1), H2 = R(CH2), A = R(AC), B = R(-BC);
  const parts: string[] = [];
  if (o.triangolo) parts.push(poly([O1, O2, H2], 'soft', true));
  parts.push(
    line(O1[0] - 20, O1[1], O2[0] + 30, O2[1], 'd'),
    circle(O1[0], O1[1], Rf1, 'l'), circle(O2[0], O2[1], Rf2, 'l'),
    circle(O1[0], O1[1], R1, 'd'), circle(O2[0], O2[1], R2, 'd'),
  );
  if (o.teste) parts.push(circle(O1[0], O1[1], R1 + a, 'm'), circle(O2[0], O2[1], R2 + a, 'm'));
  // retta di pressione, prolungata oltre H₁ e H₂
  const e1 = R(-CH1 - 30), e2 = R(CH2 + 34);
  parts.push(line(e1[0], e1[1], e2[0], e2[1], 'a', 2));
  if (o.AB) parts.push(line(B[0], B[1], A[0], A[1], 'f', 4));
  // perpendicolari dai centri
  const toO1: [number, number] = [(O1[0] - H1[0]) / Rf1, (O1[1] - H1[1]) / Rf1];
  const toO2: [number, number] = [(O2[0] - H2[0]) / Rf2, (O2[1] - H2[1]) / Rf2];
  const uS: [number, number] = [u[0], -u[1]];
  parts.push(line(O1[0], O1[1], H1[0], H1[1], o.simili ? 'l' : 'm', o.simili ? 2 : 1), line(O2[0], O2[1], H2[0], H2[1], o.simili ? 'l' : 'm', o.simili ? 2 : 1));
  parts.push(quadretto(H1, toO1, uS), quadretto(H2, toO2, [-uS[0], -uS[1]]));
  // verticale per C e angoli θ
  parts.push(line(C[0], C[1] - 70, C[0], C[1] + 40, 'd'));
  const thd = (th * 180) / Math.PI;
  parts.push(angle(C[0], C[1], 52, 90 - thd, 90, 'θ', 'a'));
  parts.push(angle(O1[0], O1[1], 40, -thd, 0, 'θ'));
  if (o.triangolo) parts.push(angle(O2[0], O2[1], 34, 180 - thd, 180, 'θ'));
  parts.push(
    dot(O1[0], O1[1], 'O₁', -14, -10), dot(O2[0], O2[1], 'O₂', 14, -10), dot(C[0], C[1], 'C', 12, 14, 'a'),
    dot(H1[0], H1[1], 'H₁', 14, 10), dot(H2[0], H2[1], 'H₂', 16, -6),
  );
  if (o.teste) parts.push(dot(A[0], A[1], 'A', -14, -2, 'a'), dot(B[0], B[1], 'B', 14, 4, 'a'));
  // raggi (quote) R₁ e R_f1
  parts.push(text(O1[0] + (o.forze ? 30 : 55), O1[1] - 10, 'R₁', { c: 'm', size: 13 }), text(O1[0] + 45, O1[1] + 32, 'R_f1', { c: 'm', size: 12 }));
  parts.push(text((O2[0] + H2[0]) / 2 + 6, (O2[1] + H2[1]) / 2 + 16, 'R_f2', { c: 'm', size: 12 }));
  parts.push(text(e2[0] + 6, e2[1] - 6, 'retta di pressione', { anchor: 'start', c: 'a', size: 12 }));
  if (o.contatto === 'P') {
    const P = R(13);
    parts.push(dot(P[0], P[1], 'P', -12, -4));
  }
  if (o.contatto === 'x' || o.forze) {
    const x = 15, P = R(-x);
    parts.push(dot(P[0], P[1], 'P', 14, 14));
    parts.push(dim(C[0], C[1], P[0], P[1], 'x', 16));
    if (o.forze) {
      const FN = R(-x - 38), kxu: [number, number] = [-u[1], u[0]]; // k ∧ u (verso dell'attrito sulla 1)
      parts.push(arrow(P[0], P[1], FN[0], FN[1], 'f', 'F_N²¹', -32, 2));
      parts.push(arrow(P[0], P[1], P[0] + kxu[0] * 34, P[1] - kxu[1] * 34, 'f', 'F_T²¹', -4, -14));
      parts.push(arrow(P[0], P[1], P[0] - kxu[0] * 30, P[1] + kxu[1] * 30, 'v', 'V^rel₁₂', 30, 8));
    }
  }
  parts.push(rot(O1[0], O1[1], 46, 140, 215, 'v', 'ω₁'), rot(O2[0], O2[1], 40, 40, -35, 'v', 'ω₂'));
  if (o.forze) parts.push(rot(O1[0], O1[1], 60, 220, 250, 'f', 'C₁'), rot(O2[0], O2[1], 54, -40, -10, 'f', 'C₂'));
  return svg(460, 300, parts, o.titolo);
}

/** Rotismo ordinario a quattro ruote (p. 173): 1–2 esterno, 2 e 3 solidali, 3–4 esterno; sotto, lo schema unifilare. */
export function figRotismo(): string {
  const y = 105, ra = 26, rb = 52, rc = 22, rd = 58;
  const xa = 60, xb = xa + ra + rb, xd = xb + rc + rd;
  const parts: string[] = [
    line(xa - 40, y, xd + rd + 12, y, 'd'),
    circle(xa, y, ra, 'l'), circle(xb, y, rb, 'l'), circle(xb, y, rc, 'l'), circle(xd, y, rd, 'd'),
    dot(xa, y), dot(xb, y), dot(xd, y),
    text(xa + 10, y - 10, '1', { size: 13 }), text(xb - rb + 10, y - rb + 4, '2', { size: 13 }), text(xb - 8, y - rc + 8, '3', { size: 12 }),
    text(xd + rd - 8, y - rd + 4, '4', { size: 13 }),
    rot(xa, y, ra + 9, 120, 60, 'v', 'ω₁'), rot(xb, y, rb + 9, 120, 60, 'v', 'ω₂ = ω₃'), rot(xd, y, rd + 9, 60, 120, 'v', 'ω₄'),
    rot(xa, y, ra + 9, 240, 300, 'f', 'C₁'), rot(xd, y, rd + 9, 300, 240, 'f', 'C₄'),
  ];
  // schema unifilare
  const y1 = 232, y2 = 272;
  parts.push(
    line(xa, y1 - 22, xa, y1 + 12, 'l', 2), line(xb, y1 - 12, xb, y2 + 18, 'l', 2), line(xd, y2 - 12, xd, y2 + 22, 'l', 2),
    line(xa - ra, y1, xa + ra, y1, 'l', 4), line(xb - rb, y1, xb + rb, y1, 'l', 4),
    line(xb - rc, y2, xb + rc, y2, 'l', 4), line(xd - rd, y2, xd + rd, y2, 'l', 4),
    text(xd + rd + 6, y1 - 14, 'schema unifilare', { anchor: 'end', c: 'm', size: 12 }),
    text(xa - ra - 8, y1, '1', { anchor: 'end', size: 12 }), text(xb + rb + 8, y1, '2', { anchor: 'start', size: 12 }),
    text(xb - rc - 8, y2, '3', { anchor: 'end', size: 12 }), text(xd + rd + 8, y2, '4', { anchor: 'start', size: 12 }),
  );
  return svg(420, 300, parts, 'Rotismo ordinario: ruote 1, 2–3 solidali, 4; vista frontale e schema unifilare');
}
