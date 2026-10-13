"""Verifica simbolica del capitolo C7 (meccanica delle vibrazioni). Modello ricostruito dai principi:
equilibri risolti con solve, equazioni differenziali con dsolve, radici dei polinomi caratteristici, derivate,
moduli e argomenti dei numeri complessi, limiti. Notazione della dispensa: ω_m, ξ, ρ, forzante in seno (NF-12)."""
from comune import Registro, sp

R = Registro('C7')
I, pi = sp.I, sp.pi


def tutte(pid, coppie):
    """registra 'ok' solo se TUTTE le uguaglianze (lhs, rhs) sono identità; altrimenti la prima che fallisce"""
    for l, r in coppie:
        d = sp.simplify(sp.sympify(l) - sp.sympify(r))
        if d != 0:
            d = sp.simplify(sp.expand(sp.powsimp(d, force=True)))
        if d != 0:
            return R.eq(pid, l, r)
    return R.eq(pid, 0, 0)


def zero_trig(expr, phi, P, Q):
    """espande sin/cos di (·−φ) e sostituisce cos φ = P/|p|, sin φ = Q/|p| (quadrante giusto per costruzione)"""
    M = sp.sqrt(P**2 + Q**2)
    e = sp.expand(sp.expand_trig(expr))
    return sp.simplify(e.subs({sp.cos(phi): P / M, sp.sin(phi): Q / M}))


t = sp.Symbol('t', real=True)
m, K, c, g, x0, v0 = sp.symbols('m K c g x_0 v_0', positive=True)
w, wm, xi, rho, F0, XV = sp.symbols('omega omega_m xi rho F_0 X_V', positive=True)
lam = sp.Symbol('lambda')
x = sp.Function('x')
X_ = x(t)
xd, xdd = X_.diff(t), X_.diff(t, 2)

# ================================================================ d111 equazione del moto (pp. 208–210)
R.enunciato('d111.1', 'legge della molla tra due corpi e forza d\'inerzia (p. 208)')
R.enunciato('d111.2', 'teorema dell\'energia cinetica con W^CONS = −dE_P/dt (NF-241)')
E = m * xd**2 / 2 + K * X_**2 / 2
R.eq('d111.3', E.diff(t), (m * xdd + K * X_) * xd)
a, v, xs = sp.symbols('a v x_s', real=True)
a_sol = sp.solve(sp.Eq((m * a + K * xs) * v, 0), a)[0]  # W^{N.C.} = 0 con v ≠ 0
R.eq('d111.4', m * a_sol + K * xs, 0)
a_dal = sp.solve(sp.Eq(-K * xs - m * a, 0), a)[0]  # d'Alembert: F_el + F_in = 0
R.eq('d111.5', -K * xs - m * a_dal, 0)
xst = sp.solve(sp.Eq(m * g - K * sp.Symbol('s'), 0), sp.Symbol('s'))[0]  # equilibrio statico verticale
R.eq('d111.6', K * xst, m * g)
xp = sp.Function('xp')(t)
eq_vert = -m * (xp + xst).diff(t, 2) - K * (xp + xst) + m * g  # x = x' + x^ST nell'equilibrio dinamico
R.eq('d111.7', eq_vert, -m * xp.diff(t, 2) - K * (xp + xst) + m * g)
R.eq('d111.8', -eq_vert, m * xp.diff(t, 2) + K * xp)
R.risultato('d111', m * a_sol + K * xs, 0)

# ================================================================ d112 pulsazione naturale (pp. 209–210)
R.enunciato('d112.1', 'ansatz esponenziale')
f = sp.exp(lam * t)
R.eq('d112.2', m * f.diff(t, 2) + K * f, (m * lam**2 + K) * f)
radici = sp.solve(m * lam**2 + K, lam)
Wm = sp.sqrt(K / m)
tutte('d112.3', [(radici[0] * radici[1], Wm**2), (radici[0] + radici[1], 0), (sp.expand(radici[0]**2), -K / m)])
R.eq('d112.4', sp.exp(I * Wm * t).rewrite(sp.cos), sp.cos(Wm * t) + I * sp.sin(Wm * t))
Tm = sp.periodicity(sp.cos(Wm * t), t)
R.eq('d112.5', 1 / Tm, Wm / (2 * pi))
R.eq('d112.6', Wm, sp.sqrt(g / (m * g / K)))
R.risultato('d112', sp.Abs(sp.im(radici[0])), Wm)

# ================================================================ d113 soluzione con condizioni iniziali (pp. 209–210)
C1, C2 = sp.symbols('C_1 C_2')
A, al, C, be = sp.symbols('A alpha C beta', real=True)
xc = C1 * sp.exp(I * Wm * t) + C2 * sp.exp(-I * Wm * t)
R.eq('d113.1', sp.simplify(m * xc.diff(t, 2) + K * xc), 0)
xr = (A * sp.exp(I * al) * sp.exp(I * Wm * t) + A * sp.exp(-I * al) * sp.exp(-I * Wm * t))
R.eq('d113.2', sp.im(sp.expand_complex(xr)), 0)
R.eq('d113.3', sp.expand_complex(xr), 2 * A * sp.cos(Wm * t + al))
xg = C * sp.cos(Wm * t + al)
res0 = (xg.subs(t, 0) - x0)**2 + (xg.diff(t).subs(t, 0))**2
R.eq('d113.4', res0.subs({C: x0, al: 0}), 0)
R.eq('d113.5', x0 * sp.cos(Wm * t), x0 * sp.sin(Wm * t + pi / 2))
sol = sp.dsolve(m * xdd + K * X_, X_, ics={x(0): x0, xd.subs(t, 0): v0}).rhs
Cg = sp.sqrt(x0**2 + (v0 / Wm)**2)
tutte('d113.6', [(sol, x0 * sp.cos(Wm * t) + v0 / Wm * sp.sin(Wm * t)),
                 (sp.expand(sp.expand_trig(Cg * sp.cos(Wm * t + al))).subs({sp.cos(al): x0 / Cg, sp.sin(al): -v0 / Wm / Cg}), x0 * sp.cos(Wm * t) + v0 / Wm * sp.sin(Wm * t))])
R.risultato('d113', sp.dsolve(m * xdd + K * X_, X_, ics={x(0): x0, xd.subs(t, 0): 0}).rhs, x0 * sp.cos(Wm * t))

# ================================================================ d114 energia (p. 209)
xs_ = C * sp.cos(Wm * t + al)
R.eq('d114.1', m * xs_.diff(t, 2) + K * xs_, 0)
R.eq('d114.2', xd * (m * xdd + K * X_), m * xd * xdd + K * X_ * xd)
R.eq('d114.3', (m * xd**2 / 2).diff(t) + (K * X_**2 / 2).diff(t), m * xd * xdd + K * X_ * xd)
Es = (m * xs_.diff(t)**2 / 2 + K * xs_**2 / 2)
R.eq('d114.4', Es, K * C**2 / 2)
R.eq('d114.5', m * (Wm * C)**2 / 2, K * C**2 / 2)
R.eq('d114.6', E.diff(t).subs(xdd, (-c * xd - K * X_) / m), -c * xd**2)
R.risultato('d114', Es.diff(t), 0)

# ================================================================ d115 equazione caratteristica (p. 211)
a_s = sp.solve(sp.Eq(-m * a - c * v - K * xs, 0), a)[0]  # F_in + F_s + F_el = 0
R.eq('d115.1', m * a_s + c * v + K * xs, 0)
f0 = x0 * sp.exp(lam * t)
pol = m * lam**2 + c * lam + K
R.eq('d115.2', m * f0.diff(t, 2) + c * f0.diff(t) + K * f0, f0 * pol)
r1, r2 = sp.solve(pol, lam)
q1 = (-c + sp.sqrt(c**2 - 4 * m * K)) / (2 * m)
q2 = (-c - sp.sqrt(c**2 - 4 * m * K)) / (2 * m)
s1 = -c / (2 * m) + sp.sqrt((c / (2 * m))**2 - K / m)
tutte('d115.3', [(r1 + r2, q1 + q2), (sp.expand(r1 * r2), sp.expand(q1 * q2)), (sp.expand(pol.subs(lam, q1)), 0), (s1, q1)])
tutte('d115.4', [(sp.expand(r1 * r2), K / m), (r1 + r2, -c / m)])
A1, A2 = sp.symbols('A_1 A_2')
xgen = A1 * sp.exp(q1 * t) + A2 * sp.exp(q2 * t)
R.eq('d115.5', sp.expand(m * xgen.diff(t, 2) + c * xgen.diff(t) + K * xgen), 0)
R.risultato('d115', sp.expand(pol.subs(lam, q1)), 0)

# ================================================================ d116 smorzamento critico e ξ (p. 211)
cr = [s for s in sp.solve((sp.Symbol('c_r') / (2 * m))**2 - K / m, sp.Symbol('c_r')) if s.is_positive][0]
tutte('d116.1', [(cr, 2 * m * Wm), (cr, 2 * sp.sqrt(m * K))])
R.eq('d116.2', c / cr, c / (2 * m * Wm))
cx = xi * cr  # c = ξ c_r
R.eq('d116.3', cx / (2 * m), xi * Wm)
rr = sp.solve(pol.subs(c, cx), lam)
ql1, ql2 = Wm * (-xi + sp.sqrt(xi**2 - 1)), Wm * (-xi - sp.sqrt(xi**2 - 1))
tutte('d116.4', [(rr[0] + rr[1], ql1 + ql2), (sp.expand(rr[0] * rr[1]), sp.expand(ql1 * ql2)), (sp.expand(pol.subs({c: cx, lam: ql1})), 0)])
R.eq('d116.5', sp.expand(pol.subs(c, cx) / m), sp.expand(lam**2 + 2 * xi * Wm * lam + Wm**2))
R.eq('d116.6', sp.expand(cx**2 - 4 * m * K), sp.expand(4 * m**2 * Wm**2 * (xi**2 - 1)))
R.risultato('d116', cr, 2 * m * Wm)

# ================================================================ d117 pulsazione smorzata (p. 212)
R.eq('d117.1', (I * sp.sqrt(1 - xi**2))**2, xi**2 - 1)
Om = sp.Symbol('Omega', positive=True)
pn = lambda L: L**2 + 2 * xi * wm * L + wm**2
R.eq('d117.2', sp.expand(pn(-xi * wm + I * wm * sp.sqrt(1 - xi**2))), 0)
Om_sol = [s for s in sp.solve(sp.expand(pn(-xi * wm + I * Om)), Om) if s != 0]
wd = wm * sp.sqrt(1 - xi**2)
R.eq('d117.3', Om_sol[0], wd)
R.eq('d117.4', 2 * pi / wd, (2 * pi / wm) / sp.sqrt(1 - xi**2))
R.risultato('d117', Om_sol[0], wd)

# ================================================================ d118 soluzione sottosmorzata (p. 212)
WD = sp.Symbol('omega_d', positive=True)
Xa = sp.Symbol('X', positive=True)
l1, l2 = -xi * wm + I * WD, -xi * wm - I * WD
R.eq('d118.1', A1 * sp.exp(l1 * t) + A2 * sp.exp(l2 * t), sp.exp(-xi * wm * t) * (A1 * sp.exp(I * WD * t) + A2 * sp.exp(-I * WD * t)))
xu = sp.expand_complex(Xa / 2 * sp.exp(I * be) * sp.exp(l1 * t) + Xa / 2 * sp.exp(-I * be) * sp.exp(l2 * t))
tutte('d118.2', [(xu, Xa * sp.exp(-xi * wm * t) * sp.cos(WD * t + be)), (xu, Xa * sp.exp(-xi * wm * t) * sp.sin(WD * t + be + pi / 2))])
R.eq('d118.3', sp.expand_trig(Xa * sp.sin(WD * t + al)), Xa * sp.sin(al) * sp.cos(WD * t) + Xa * sp.cos(al) * sp.sin(WD * t))
aa, bb = sp.symbols('a b')
xab = sp.exp(-xi * wm * t) * (aa * sp.cos(WD * t) + bb * sp.sin(WD * t))
cst = sp.solve([xab.subs(t, 0) - x0, xab.diff(t).subs(t, 0) - v0], [aa, bb])
tutte('d118.4', [(cst[aa], x0), (cst[bb], (v0 + xi * wm * x0) / WD)])
R.enunciato('d118.5', 'inviluppo ±X e^{−ξω_m t} (lettura del grafico di p. 212)')
xsol = Xa * sp.exp(-xi * wm * t) * sp.sin(wd * t + al)
R.risultato('d118', sp.simplify(xsol.diff(t, 2) + 2 * xi * wm * xsol.diff(t) + wm**2 * xsol), 0)

# ================================================================ d119 decremento logaritmico (p. 212)
Td = 2 * pi / wd
env = lambda s: Xa * sp.exp(-xi * wm * s)
R.eq('d119.1', sp.expand_log(sp.log(env(t) / env(t + Td)), force=True), xi * wm * Td)
xx = lambda s: env(s) * sp.sin(wd * s + al)
R.eq('d119.2', xx(t) / xx(t + Td), sp.exp(xi * wm * Td))
R.eq('d119.3', xi * wm * Td, 2 * pi * xi / sp.sqrt(1 - xi**2))
dl = sp.Symbol('delta', positive=True)
xi_inv = [s for s in sp.solve(sp.Eq(dl, 2 * pi * xi / sp.sqrt(1 - xi**2)), xi)]
R.eq('d119.4', xi_inv[0], dl / sp.sqrt(4 * pi**2 + dl**2))
n = sp.Symbol('n', integer=True, positive=True)
R.eq('d119.5', sp.expand_log(sp.log(sp.simplify(xx(t) / xx(t + n * Td))), force=True) / n, 2 * pi * xi / sp.sqrt(1 - xi**2))
R.risultato('d119', sp.expand_log(sp.log(env(t) / env(t + Td)), force=True), 2 * pi * xi / sp.sqrt(1 - xi**2))

# ================================================================ d120 caso critico (p. 213, NF-32)
cc_ = 2 * m * wm
Kc = m * wm**2
pc = m * lam**2 + cc_ * lam + Kc
tutte('d120.1', [(pc.subs(lam, -wm), 0), (pc.diff(lam).subs(lam, -wm), 0)])
R.eq('d120.2', A1 * sp.exp(-wm * t) + A2 * sp.exp(-wm * t), (A1 + A2) * sp.exp(-wm * t))
y = t * sp.exp(-wm * t)
R.eq('d120.3', m * y.diff(t, 2) + cc_ * y.diff(t) + Kc * y, 0)
solc = sp.dsolve(m * xdd + cc_ * xd + Kc * X_, X_, ics={x(0): x0, xd.subs(t, 0): v0}).rhs
R.eq('d120.4', solc, (x0 + (v0 + wm * x0) * t) * sp.exp(-wm * t))
R.eq('d120.5', solc.subs(v0, 0), x0 * (1 + wm * t) * sp.exp(-wm * t))
R.risultato('d120', solc, (x0 + (v0 + wm * x0) * t) * sp.exp(-wm * t))

# ================================================================ d121 sovrasmorzato (p. 213)
xo = sp.Symbol('xi_o', positive=True)  # ξ > 1: ξ = 1 + η
eta = sp.Symbol('eta', positive=True)
xi_o = 1 + eta
sq = sp.sqrt(xi_o**2 - 1)
L1, L2 = -wm * (xi_o + sq), -wm * (xi_o - sq)
rs = sp.solve(lam**2 + 2 * xi_o * wm * lam + wm**2, lam)
tutte('d121.1', [(rs[0] + rs[1], L1 + L2), (sp.expand(rs[0] * rs[1]), sp.expand(L1 * L2))])
tutte('d121.2', [(sp.expand(L1 * L2), wm**2), (L1 + L2, -2 * xi_o * wm)])
xov = A1 * sp.exp(L1 * t) + A2 * sp.exp(L2 * t)
R.eq('d121.3', sp.expand(xov.diff(t, 2) + 2 * xi_o * wm * xov.diff(t) + wm**2 * xov), 0)
Aso = sp.solve([A1 + A2 - x0, L1 * A1 + L2 * A2 - v0], [A1, A2])
tutte('d121.4', [(Aso[A1], (L2 * x0 - v0) / (L2 - L1)), (Aso[A2], (v0 - L1 * x0) / (L2 - L1))])
R.eq('d121.5', wm * (xi_o - sq), wm / (xi_o + sq))
R.enunciato('d121.6', 'confronto qualitativo dei tempi di assestamento (NF-244)')
R.risultato('d121', sp.expand(xov.diff(t, 2) + 2 * xi_o * wm * xov.diff(t) + wm**2 * xov), 0)

# ================================================================ modello forzato comune (pp. 214–218)
phi = sp.Symbol('varphi', real=True)
X0 = sp.Symbol('X_0', positive=True)
P, Q = K - m * w**2, c * w
Mp = sp.sqrt(P**2 + Q**2)
sub_adim = {c: 2 * xi * m * wm, w: rho * wm}
K_m = {K: m * wm**2}
adim = lambda e: sp.simplify(e.subs(sub_adim).subs(K_m))
Dn = (1 - rho**2)**2 + 4 * xi**2 * rho**2
Aad = 1 / sp.sqrt(Dn)

# ================================================================ d122 risposta stazionaria (pp. 214–215)
a_f = sp.solve(sp.Eq(-K * xs - c * v - m * a + F0 * sp.sin(w * t), 0), a)[0]
R.eq('d122.1', m * a_f + c * v + K * xs, F0 * sp.sin(w * t))
R.enunciato('d122.2', 'il transitorio libero smorzato tende a zero (d118–d121)')
xpp = X0 * sp.sin(w * t - phi)
tutte('d122.3', [(xpp.diff(t), w * X0 * sp.cos(w * t - phi)), (xpp.diff(t, 2), -w**2 * X0 * sp.sin(w * t - phi))])
R.eq('d122.4', m * xpp.diff(t, 2) + c * xpp.diff(t) + K * xpp, P * X0 * sp.sin(w * t - phi) + c * w * X0 * sp.cos(w * t - phi))
res = sp.expand(sp.expand_trig(P * X0 * sp.sin(w * t - phi) + Q * X0 * sp.cos(w * t - phi) - F0 * sp.sin(w * t)))
cs_, cc_s = res.coeff(sp.sin(w * t)), res.coeff(sp.cos(w * t))
tutte('d122.5', [(cs_, X0 * (P * sp.cos(phi) + Q * sp.sin(phi)) - F0), (cc_s, X0 * (-P * sp.sin(phi) + Q * sp.cos(phi)))])
R.eq('d122.6', zero_trig(cc_s, phi, P, Q), 0)
R.eq('d122.7', zero_trig(cs_, phi, P, Q).subs(X0, F0 / Mp), 0)
R.risultato('d122', zero_trig(m * xpp.diff(t, 2) + c * xpp.diff(t) + K * xpp - F0 * sp.sin(w * t), phi, P, Q).subs(X0, F0 / Mp), 0)

# ================================================================ d123 complex replacement (pp. 214–215, 217)
R.eq('d123.1', sp.im(F0 * sp.exp(I * w * t)), F0 * sp.sin(w * t))
Z = sp.Symbol('Z')
z0 = sp.solve((-m * w**2 + I * c * w + K) * Z - F0, Z)[0]
xim = sp.im(sp.expand_complex(z0 * sp.exp(I * w * t)))
R.eq('d123.2', sp.simplify(m * xim.diff(t, 2) + c * xim.diff(t) + K * xim - F0 * sp.sin(w * t)), 0)
zz = Z * sp.exp(I * w * t)
tutte('d123.3', [(zz.diff(t), I * w * zz), (zz.diff(t, 2), -w**2 * zz)])
R.eq('d123.4', z0, F0 / (K - m * w**2 + I * c * w))
modz = sp.sqrt(sp.simplify(sp.expand_complex(z0 * sp.conjugate(z0))))
tutte('d123.5', [(modz, F0 / Mp), (sp.expand_complex(z0 * Mp / F0), (P - I * Q) / Mp)])
Xs = sp.Symbol('X', positive=True)
R.eq('d123.6', sp.im(sp.expand_complex(Xs * sp.exp(-I * phi) * sp.exp(I * w * t))), Xs * sp.sin(w * t - phi))
xa = (F0 / Mp) * sp.sin(w * t + al - phi)
R.eq('d123.7', zero_trig(m * xa.diff(t, 2) + c * xa.diff(t) + K * xa - F0 * sp.sin(w * t + al), phi, P, Q), 0)
R.eq('d123.8', z0 / F0, 1 / (K - m * w**2 + I * c * w))
R.risultato('d123', z0, F0 / (K - m * w**2 + I * c * w))

# ================================================================ d124 fattore di amplificazione (p. 215)
xsta = sp.solve(K * sp.Symbol('u') - F0, sp.Symbol('u'))[0]
R.eq('d124.1', K * xsta, F0)
R.eq('d124.2', adim(m * w**2 / K), rho**2)
R.eq('d124.3', adim(c * w / K), 2 * xi * rho)
X0d = F0 / Mp
R.eq('d124.4', adim(X0d), (F0 / K).subs(K_m) / sp.sqrt(Dn))
R.eq('d124.5', adim(X0d / xsta), Aad)
R.eq('d124.6', Aad.subs(xi, 0), 1 / sp.Abs(1 - rho**2))
R.eq('d124.7', sp.limit(rho**2 * Aad, rho, sp.oo), 1)
R.risultato('d124', adim(X0d / xsta), Aad)

# ================================================================ d125 picco (p. 216)
R.eq('d125.1', 1 / Aad**2, Dn)
dD = Dn.diff(rho)
R.eq('d125.2', dD, -4 * rho + 4 * rho**3 + 8 * xi**2 * rho)
rR = sp.sqrt(1 - 2 * xi**2)
tutte('d125.3', [(sp.factor(dD), 4 * rho * (rho**2 - 1 + 2 * xi**2)), (dD.subs(rho, rR), 0)])
R.eq('d125.4', Aad.subs(rho, rR), 1 / (2 * xi * sp.sqrt(1 - xi**2)))
R.eq('d125.5', [s for s in sp.solve(1 - 2 * xi**2, xi) if s.is_positive][0], sp.sqrt(sp.Rational(1, 2)))
R.enunciato('d125.6', 'per ξ² > 1/2 dA⁻²/dρ = 4ρ(ρ² − 1 + 2ξ²) > 0: monotonia')
R.risultato('d125', dD.subs(rho, rR), 0)

# ================================================================ d126 fase (pp. 215–216, 221)
cphi, sphi = P / Mp, Q / Mp
Ginv = 1 / (P + I * Q)
tutte('d126.1', [(sp.re(sp.expand_complex(Ginv)) * Mp, cphi / Mp * Mp), (sp.simplify(sp.re(sp.expand_complex(Ginv)) * Mp), cphi), (sp.simplify(sp.im(sp.expand_complex(Ginv)) * Mp), -sphi)])
R.eq('d126.2', adim(Q / P), 2 * xi * rho / (1 - rho**2))
num_cases = []
for rv, xv in [(sp.Rational(2), sp.Rational(3, 10)), (sp.Rational(1, 2), sp.Rational(3, 10)), (sp.Rational(3), sp.Rational(1, 10))]:
    at2 = sp.atan2(2 * xv * rv, 1 - rv**2)
    num_cases.append((at2, sp.atan(2 * xv * rv / (1 - rv**2)) + (pi if rv > 1 else 0)))
tutte('d126.3', num_cases)
R.eq('d126.4', sp.atan2(2 * xi, 0), pi / 2)
tutte('d126.5', [(sp.atan2(0, 1 - sp.Rational(1, 4)), 0), (sp.atan2(0, 1 - 4), pi)])
tutte('d126.6', [(sp.limit(sp.atan(2 * xi * rho / (1 - rho**2)), rho, 0), 0), (sp.limit(pi + sp.atan(2 * xi * rho / (1 - rho**2)), rho, sp.oo), pi)])
R.risultato('d126', sp.atan2(2 * xi, 0), pi / 2)

# ================================================================ d127 FRF, complex gain (pp. 217–218)
G = z0 / F0
R.eq('d127.1', G, 1 / (K - m * w**2 + I * c * w))
modG = sp.sqrt(sp.simplify(sp.expand_complex(G * sp.conjugate(G))))
tutte('d127.2', [(modG, 1 / Mp), (adim(modG), (1 / K).subs(K_m) / sp.sqrt(Dn))])
R.eq('d127.3', adim(K * modG), Aad)
tutte('d127.4', [(sp.simplify(sp.re(sp.expand_complex(G)) * Mp), cphi), (sp.simplify(sp.im(sp.expand_complex(G)) * Mp), -sphi)])
R.eq('d127.5', sp.simplify(sp.expand_complex((I * w * G) * sp.conjugate(I * w * G))), w**2 / Mp**2)
R.eq('d127.6', adim((1 / Mp).subs(w, wm)), adim(1 / (2 * xi * K)))
R.risultato('d127', G, 1 / (K - m * w**2 + I * c * w))

# ================================================================ d128 quality factor (p. 217)
R.eq('d128.1', Aad.subs(rho, 1), 1 / (2 * xi))
R.eq('d128.2', 1 / (2 * xi), Aad.subs(rho, 1))
R.eq('d128.3', (1 / (2 * xi * sp.sqrt(1 - xi**2))) / (1 / (2 * xi)), 1 / sp.sqrt(1 - xi**2))
dlt = 2 * pi * xi / sp.sqrt(1 - xi**2)
tutte('d128.4', [(1 - sp.exp(-dlt)**2, 1 - sp.exp(-2 * dlt)), (sp.series(1 - sp.exp(-2 * dlt), xi, 0, 2).removeO(), 4 * pi * xi)])
R.enunciato('d128.5', 'lettura qualitativa di Q (p. 217)')
R.risultato('d128', Aad.subs(rho, 1), 1 / (2 * xi))

# ================================================================ d129 eccitazione di vincolo (pp. 219, 221)
R.enunciato('d129.1', 'leggi di molla e smorzatore tra due corpi (p. 208) con gli estremi sulla base')
vV, xV_, xstA = sp.symbols('v_V x_V x_st', real=True)
somma = -m * a - c * (v - vV) - K * (xs - xV_ + xstA)
R.eq('d129.2', somma, -m * a - c * v + c * vV - K * xs + K * xV_ - K * xstA)
a_v = sp.solve(sp.Eq(somma.subs(xstA, 0), 0), a)[0]
R.eq('d129.3', m * a_v + c * v + K * xs, c * vV + K * xV_)
xVt = XV * sp.sin(w * t)
R.eq('d129.4', c * xVt.diff(t) + K * xVt, c * w * XV * sp.sin(w * t + pi / 2) + K * XV * sp.sin(w * t))
x1 = (c * w * XV / Mp) * sp.sin(w * t + pi / 2 - phi)  # A F₀/K con F₀ = cωX_V e A/K = 1/|p|
R.eq('d129.5', zero_trig(m * x1.diff(t, 2) + c * x1.diff(t) + K * x1 - c * w * XV * sp.sin(w * t + pi / 2), phi, P, Q), 0)
xGt = (K * XV / Mp) * ((c * w / K) * sp.cos(w * t - phi) + sp.sin(w * t - phi))
R.eq('d129.6', zero_trig(m * xGt.diff(t, 2) + c * xGt.diff(t) + K * xGt - (c * xVt.diff(t) + K * xVt), phi, P, Q), 0)
Akx = (K / Mp)
R.eq('d129.7', adim(Akx * XV * sp.sqrt(1 + (c * w / K)**2)), Aad * XV * sp.sqrt(1 + 4 * xi**2 * rho**2))
xR = sp.Function('xR')(t)
piena = m * (xR + xVt).diff(t, 2) + c * (xR + xVt).diff(t) + K * (xR + xVt) - (c * xVt.diff(t) + K * xVt)
R.eq('d129.8', piena, m * xR.diff(t, 2) + c * xR.diff(t) + K * xR - m * w**2 * XV * sp.sin(w * t))
R.eq('d129.9', adim(m * w**2 * XV / Mp), rho**2 * Aad * XV)
R.risultato('d129', m * a_v + c * v + K * xs, c * vV + K * xV_)

# ================================================================ d131 fase nell'eccitazione di vincolo (p. 221)
Mn = sp.sqrt(K**2 + Q**2)
tutte('d131.1', [(adim(Q / K), 2 * xi * rho)])
tutte('d131.2', [(adim(Q / P), 2 * xi * rho / (1 - rho**2))])
# argomento del quoziente (K + icω)/p: coseno e seno dell'angolo risultante = formule di sottrazione
rap = sp.expand_complex((K + I * Q) / (P + I * Q))
cos_x, sin_x = sp.re(rap) * Mp / Mn, sp.im(rap) * Mp / Mn
caF, saF, cph, sph = K / Mn, Q / Mn, P / Mp, Q / Mp
tutte('d131.3', [(sp.simplify(cos_x), sp.simplify(caF * cph + saF * sph)), (sp.simplify(sin_x), sp.simplify(saF * cph - caF * sph))])
R.eq('d131.4', 2 * xi * rho / (1 - rho**2) - 2 * xi * rho, 2 * xi * rho**3 / (1 - rho**2))
tutte('d131.5', [(sp.atan(2 * xi) - sp.atan2(2 * xi, 0), sp.atan(2 * xi) - pi / 2),
                 (sp.limit(sp.atan(2 * xi * rho) - (pi + sp.atan(2 * xi * rho / (1 - rho**2))), rho, sp.oo), -pi / 2)])
ax = sp.Symbol('alpha_x', real=True)
TX = (Mn / Mp) * XV * sp.sin(w * t + ax)
TXe = sp.expand(sp.expand_trig(TX)).subs({sp.cos(ax): sp.simplify(cos_x), sp.sin(ax): sp.simplify(sin_x)})
R.eq('d131.6', sp.simplify(zero_trig(xGt, phi, P, Q) - TXe), 0)
R.risultato('d131', 2 * xi * rho / (1 - rho**2) - 2 * xi * rho, 2 * xi * rho**3 / (1 - rho**2))

# ================================================================ d130 trasmissibilità di spostamento (pp. 219–220)
xVc = XV * sp.exp(I * w * t)
R.eq('d130.1', c * xVc.diff(t) + K * xVc, XV * (K + I * w * c) * sp.exp(I * w * t))
XG = sp.solve((K - m * w**2 + I * w * c) * Z - XV * (K + I * w * c), Z)[0]
R.eq('d130.2', XG, XV * (K + I * w * c) / (K - w**2 * m + I * w * c))
F0h = XV * (K + I * w * c)
mod = lambda e: sp.sqrt(sp.simplify(sp.expand_complex(e * sp.conjugate(e))))
tutte('d130.3', [(mod(F0h), XV * sp.sqrt((c * w)**2 + K**2)), (mod(K - m * w**2 + I * w * c), Mp)])
TR_dim = mod(XG) / XV
R.eq('d130.4', TR_dim**2, (sp.sqrt((c * w)**2 + K**2) / Mp)**2)  # grandezze positive: si confrontano i quadrati
Tad = sp.sqrt(1 + 4 * xi**2 * rho**2) / sp.sqrt(Dn)
R.eq('d130.5', adim(TR_dim**2), Tad**2)
tutte('d130.6', [(Tad.subs(xi, 0), 1 / sp.Abs(1 - rho**2)), (Tad.subs(rho, 0), 1), (Tad.subs(rho, 1), sp.sqrt(1 + 4 * xi**2) / (2 * xi))])
R.eq('d130.7', sp.limit(Tad, xi, sp.oo), 1)
R.eq('d130.8', Tad.subs(rho, sp.sqrt(2)), 1)
R.eq('d130.9', Tad**2 - 1, rho**2 * (2 - rho**2) / Dn)
R.risultato('d130', adim(TR_dim**2), Tad**2)

# ================================================================ d132 trasmissibilità di forza (pp. 221–222)
R.enunciato('d132.1', 'molla e smorzatore verso il muro fermo')
FK, Fc = -K * xs, -c * v
R.eq('d132.2', -(FK + Fc), K * xs + c * v)
th = w * t - phi
aF = sp.Symbol('alpha_F', real=True)
MFT = sp.sqrt(K**2 + (c * w)**2)
lhs_ = X0 * (K * sp.sin(th) + c * w * sp.cos(th))
rhs_ = sp.expand(sp.expand_trig(X0 * MFT * sp.sin(th + aF))).subs({sp.cos(aF): K / MFT, sp.sin(aF): c * w / MFT})
R.eq('d132.3', sp.expand(sp.expand_trig(lhs_)), sp.expand(sp.expand_trig(rhs_)))
FTm = (F0 / Mp) * MFT
R.eq('d132.4', FTm, F0 * mod(K + I * w * c) / Mp)
R.eq('d132.5', adim(FTm / F0), Tad)
R.eq('d132.6', adim((FTm / F0)**2), adim(TR_dim**2))
R.risultato('d132', adim(FTm / F0), Tad)

# ================================================================ d133 isolamento (pp. 220, 222)
R.enunciato('d133.1', 'T_R > 0: T_R < 1 equivale a T_R² < 1')
R.eq('d133.2', Tad**2 - 1, rho**2 * (2 - rho**2) / Dn)
tutte('d133.3', [(Tad.subs(rho, sp.sqrt(2)), 1), ([s for s in sp.solve(sp.numer(sp.together(Tad**2 - 1)), rho) if s.is_positive][0], sp.sqrt(2))])
s2 = sp.Symbol('s', positive=True)  # s = ξ²
T2s = (1 + 4 * s2 * rho**2) / ((1 - rho**2)**2 + 4 * s2 * rho**2)
R.eq('d133.4', T2s.diff(s2), 4 * rho**4 * (rho**2 - 2) / ((1 - rho**2)**2 + 4 * s2 * rho**2)**2)
fr = sp.Symbol('f', positive=True)
R.eq('d133.5', fr / (fr / sp.sqrt(2)), sp.sqrt(2))
R.eq('d133.6', g / (2 * pi * fr / sp.sqrt(2))**2, 2 * g / (2 * pi * fr)**2)
R.risultato('d133', Tad.subs(rho, sp.sqrt(2)), 1)

# ================================================================ d134 massa eccentrica: forzante (p. 223)
MS, MR, Re_ = sp.symbols('M_S M_R R', positive=True)
xO = sp.Function('x_O')(t)
rPO = sp.Matrix([Re_ * sp.cos(w * t), Re_ * sp.sin(w * t), 0])
VP = sp.Matrix([xO.diff(t), 0, 0]) + sp.Matrix([0, 0, w]).cross(rPO)
xP = xO + Re_ * sp.cos(w * t)
R.eq('d134.1', xP.diff(t), VP[0])
R.eq('d134.2', xP.diff(t, 2), xO.diff(t, 2) - w**2 * Re_ * sp.cos(w * t))
R.enunciato('d134.3', 'forze elastica, viscosa e d\'inerzia di statore e rotore')
somma_e = -K * xO - c * xO.diff(t) - MS * xO.diff(t, 2) - MR * xP.diff(t, 2)
R.eq('d134.4', somma_e, -K * xO - c * xO.diff(t) - MS * xO.diff(t, 2) - MR * (xO.diff(t, 2) - w**2 * Re_ * sp.cos(w * t)))
Mt = MS + MR
R.eq('d134.5', -somma_e, Mt * xO.diff(t, 2) + c * xO.diff(t) + K * xO - MR * w**2 * Re_ * sp.cos(w * t))
R.eq('d134.6', sp.sqrt((MR * w**2 * Re_ * sp.cos(w * t))**2 + (MR * w**2 * Re_ * sp.sin(w * t))**2), MR * w**2 * Re_)
R.risultato('d134', -somma_e, Mt * xO.diff(t, 2) + c * xO.diff(t) + K * xO - MR * w**2 * Re_ * sp.cos(w * t))

# ================================================================ d135 risposta e autocentramento (p. 223)
M = sp.Symbol('M', positive=True)
Pm, Qm = K - M * w**2, c * w
Mpm = sp.sqrt(Pm**2 + Qm**2)
xOs = (MR * w**2 * Re_ / Mpm) * sp.cos(w * t - phi)
R.eq('d135.1', zero_trig(M * xOs.diff(t, 2) + c * xOs.diff(t) + K * xOs - MR * w**2 * Re_ * sp.cos(w * t), phi, Pm, Qm), 0)
subM = {c: 2 * xi * M * wm, w: rho * wm}
KM = {K: M * wm**2}
adM = lambda e: sp.simplify(e.subs(subM).subs(KM))
R.eq('d135.2', adM(MR * Re_ * w**2 / K), MR * Re_ / M * rho**2)
ratio = adM(M * (MR * w**2 * Re_ / Mpm) / (MR * Re_))
R.eq('d135.3', ratio, rho**2 * Aad)
tutte('d135.4', [((rho**2 * Aad).subs(rho, 1), 1 / (2 * xi)), (sp.limit(rho**2 * Aad, rho, sp.oo), 1), (sp.limit(rho**2 * Aad, rho, 0), 0)])
rst = 1 / sp.sqrt(1 - 2 * xi**2)
tutte('d135.5', [(sp.simplify((rho**4 / Dn).diff(rho).subs(rho, rst)), 0), ((rho**4 / Dn).subs(rho, rst), 1 / (4 * xi**2 * (1 - xi**2)))])  # quadrati: ρ²A > 0
R.eq('d135.6', (MR * Re_ / M) * sp.cos(w * t - pi), -(MR * Re_ / M) * sp.cos(w * t))
xOg = sp.Symbol('x_Og', real=True)
xGLO = ((M - MR) * xOg + MR * (xOg + Re_ * sp.cos(w * t))) / M
R.eq('d135.7', xGLO, xOg + MR / M * Re_ * sp.cos(w * t))
R.eq('d135.8', xGLO.subs(xOg, -(MR * Re_ / M) * sp.cos(w * t)), 0)
R.risultato('d135', ratio, rho**2 * Aad)

# ================================================================ controlli sulle righe sbagliate della dispensa (devono FALLIRE come identità)
assert sp.simplify(sp.expand(pol.subs(lam, -c / (2 * m) + I * sp.sqrt(c**2 - 4 * m * K) / (2 * m)))) != 0, 'NF-31'
assert sp.simplify(((1 - xi**2) - (xi**2 - 1))) != 0, 'NF-31 √(ξ²−1) = −√(1−ξ²)'
assert sp.simplify(m * (t * 0 + 1) * 0 + (pc.subs(lam, -wm))) == 0  # radice doppia
assert sp.simplify(Tad - sp.sqrt(1 + 4 * xi**2 * rho**2) / sp.sqrt((1 + rho**2)**2 + 4 * xi**2 * rho**2)) != 0, 'NF-33'
assert sp.simplify(Tad.subs({rho: 2, xi: sp.Rational(1, 2)}) - Tad.subs({rho: 2, xi: sp.Rational(1, 10)})) > 0, 'NF-33 ξ in isolamento'

R.salva()
