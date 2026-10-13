"""Verifica simbolica del capitolo C4 (trasmissioni a cinghia). Modello ricostruito dai principi."""
from comune import Registro, sp

R = Registro('C4')

# ---------------------------------------------------------------- d071 freno a nastro (p. 153)
F, a, c, Rr, f, beta, th = sp.symbols('F a c R f beta theta', positive=True)
T = sp.Function('T')
# Eulero senza centrifuga, ricavato di nuovo: dT/dθ = f T con T(0) = T_lasco (sezione d'uscita)
Tl = sp.Symbol('T_l', positive=True)
sol = sp.dsolve(sp.Eq(T(th).diff(th), f * T(th)), T(th), ics={T(0): Tl}).rhs
# verso orario: la leva (equilibrio rispetto al fulcro) fissa il capo lasco
T2 = sp.solve(sp.Eq(sp.Symbol('X') * c, F * a), sp.Symbol('X'))[0]
T1 = sol.subs({Tl: T2, th: beta})
Cf = (T1 - T2) * Rr
R.eq('d071.1', Cf, (T1 - T2) * Rr)
R.eq('d071.2', T1, T2 * sp.exp(f * beta))
R.eq('d071.3', Cf, (sp.exp(f * beta) - 1) * T2 * Rr)
R.eq('d071.4', T2 * c, F * a)
R.eq('d071.5', Cf, a * Rr / c * F * (sp.exp(f * beta) - 1))
# verso antiorario: la leva fissa il capo teso; il lasco è all'uscita: T1 = T2 e^{fβ}
T1a = T2  # stesso equilibrio della leva, ora sul capo teso
T2a = sp.solve(sp.Eq(sol.subs({Tl: sp.Symbol('Y'), th: beta}), T1a), sp.Symbol('Y'))[0]
Cfa = (T1a - T2a) * Rr
R.eq('d071.6', Cfa, F * a / c * Rr * (1 - sp.exp(-f * beta)))
R.eq('d071.7', Cf / Cfa, sp.exp(f * beta))
R.risultato('d071', Cf, a * Rr / c * F * (sp.exp(f * beta) - 1))

R.salva()
