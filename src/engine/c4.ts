/**
 * Capitolo C4 (trasmissioni a cinghia): funzioni pure usate da animazioni, previsioni e test.
 * Fonte: dispensa pp. 140–154 (tools/testi/cap4.md).
 */

/**
 * Freno a nastro semplice (p. 153): un capo al fulcro della leva, l'altro sulla leva a braccio c; forza F a braccio a.
 * Tutto l'arco β è in strisciamento e il nastro è fermo (niente termine centrifugo): T_teso/T_lasco = e^{fβ}.
 * verso 'orario' (figura della dispensa): il capo sulla leva è il lasco T₂ = F a/c.
 * verso 'antiorario': il capo sulla leva è il teso T₁ = F a/c, quindi T₂ = T₁ e^{−fβ} (NF-21).
 */
export function frenoNastro(p: { F: number; a: number; c: number; R: number; f: number; beta: number; verso: 'orario' | 'antiorario' }) {
  const E = Math.exp(p.f * p.beta);
  const Tleva = (p.F * p.a) / p.c;
  const [T1, T2] = p.verso === 'orario' ? [Tleva * E, Tleva] : [Tleva, Tleva / E];
  return { T1, T2, Cf: (T1 - T2) * p.R, tesoSullaLeva: p.verso === 'antiorario', E };
}

/** Tensione lungo l'arco di scorrimento (pp. 141–142): T(θ) = ρV² + (T₂ − ρV²) e^{fθ}, θ dalla sezione d'uscita. */
export const tensioneArco = (T2: number, rhoV2: number, f: number, theta: number) => rhoV2 + (T2 - rhoV2) * Math.exp(f * theta);
