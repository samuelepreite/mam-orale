"""Verifica simbolica del capitolo C5, parte a (ruote dentate a denti dritti, rotismi ordinari).

Il modello è ricostruito dai principi: velocità dei moti rigidi con il prodotto vettoriale, condizione di contatto
risolta con solve, intersezioni retta–circonferenza risolte con solve, equilibri alla rotazione con i momenti
vettoriali, integrali con integrate, limiti con limit. Le formule della dispensa compaiono solo come secondo membro.
"""
from comune import Registro, sp

R = Registro('C5A')
M = sp.Matrix
k = M([0, 0, 1])


def v3(x, y):
    return M([x, y, 0])


def wedge(w, r):
    """ω k ∧ r (moto piano)"""
    return (w * k).cross(r)


def cz(a, b):
    return a[0] * b[1] - a[1] * b[0]


def nrm(a):
    return sp.sqrt(a[0] ** 2 + a[1] ** 2)


th = sp.Symbol('theta', positive=True)

# ---------------------------------------------------------------- d072 ruote di frizione (pp. 156–157)
R1, R2, w1, FN, f, C1 = sp.symbols('R1 R2 omega1 F_N f C1', positive=True)
w2 = sp.Symbol('omega2')
V1 = wedge(w1, v3(R1, 0))
V2 = wedge(w2, v3(-R2, 0))
w2s = sp.solve(sp.Eq(V1[1], V2[1]), w2)[0]  # niente velocità relativa in C
C2 = sp.solve(sp.Eq(C1 * w1 + sp.Symbol('C2') * w2s, 0), sp.Symbol('C2'))[0]  # T.F.V. in regime
tau = w2s / w1
R.eq('d072.1', V1[1], w1 * R1)
R.eq('d072.2', V2[1], -w2 * R2)
R.eq('d072.3', w1 * R1, -w2s * R2)
R.eq('d072.4', tau, -R1 / R2)
VRO2 = wedge(w2s - w1, v3(R2, 0))[1]  # V^R_C = 0, polo C
R.eq('d072.5', VRO2, -w1 * (R1 + R2))
R.eq('d072.6', tau, -C1 / C2)
R.eq('d072.7', C1 / C2, R1 / R2)
R.enunciato('d072.8', 'legge di Coulomb dell\'aderenza (disuguaglianza)')
R.risultato('d072', tau, -R1 / R2)

# ---------------------------------------------------------------- d073/d074 profili generici (pp. 158–160)
i, c = sp.symbols('i c', positive=True)  # 0 < c < i
s = sp.Symbol('s', real=True)
n = v3(sp.sin(th), sp.cos(th))
P1 = v3(c, 0) + s * n
P2 = P1 - v3(i, 0)
w2g = sp.Symbol('omega2')
V1g = wedge(w1, P1)
V2g = wedge(w2g, P2)
w2g_s = sp.solve(sp.Eq(V1g.dot(n), V2g.dot(n)), w2g)[0]  # componenti normali uguali
V2g = wedge(w2g_s, P2)
# angoli α_i: cos α_i = |V_i·n|/|V_i|; segni noti: c cos θ > 0, (c − i) cos θ < 0
mod_ratio = -w2g_s / w1  # |ω2|/|ω1| (ω2 opposta a ω1 perché 0 < c < i)
cosa1 = V1g.dot(n) / (w1 * nrm(P1))  # cos α_i = V_i·n / |V_i|, con |V_i| = |ω_i| O_iP_i
cosa2 = V2g.dot(n) / (mod_ratio * w1 * nrm(P2))
d1 = c * sp.cos(th)
d2 = (i - c) * sp.cos(th)
assert sp.simplify(cz(P1, n) - d1) == 0 and sp.simplify(cz(P2, n) + d2) == 0
R.eq('d073.1', nrm(V1g) ** 2, (w1 * nrm(P1)) ** 2)
R.eq('d073.2', V1g.dot(n), V2g.dot(n))
R.eq('d073.3', mod_ratio, (nrm(P1) * cosa1) / (nrm(P2) * cosa2))
R.eq('d073.4', mod_ratio, d1 / d2)
R.eq('d073.5', d1 / d2, c / (i - c))
R.eq('d073.6', w2g_s / w1, -c / (i - c))
R.risultato('d073', w2g_s / w1, -c / (i - c))

R.eq('d074.1', w2g_s / w1, -c / (i - c))
R.enunciato('d074.2', 'legge dell\'ingranamento: equivalenza logica (τ costante ⇔ C fisso)')
R.enunciato('d074.3', 'classificazione dei punti di contatto (definizione)')
Cp = v3(c, 0)
Vrel = V2g - V1g
somma = wedge(w2g_s, P1 - Cp) + wedge(w2g_s, Cp - v3(i, 0)) - wedge(w1, P1 - Cp) - wedge(w1, Cp)
R.eq('d074.4', Vrel[0], somma[0])
assert sp.simplify(wedge(w2g_s, Cp - v3(i, 0)) - wedge(w1, Cp)) == M([0, 0, 0])  # C punto di puro rotolamento
R.eq('d074.5', Vrel[1], wedge(w2g_s - w1, P1 - Cp)[1])
R.eq('d074.6', Vrel.dot(Vrel), ((w2g_s - w1) * s) ** 2)
R.risultato('d074', Vrel[0], wedge(w2g_s - w1, P1 - Cp)[0])

# ---------------------------------------------------------------- d075 evolvente (pp. 158, 161–162)
Rf, g = sp.symbols('R_f gamma', positive=True)
Q = v3(Rf * sp.cos(g), Rf * sp.sin(g))
# la retta generatrice, tangente in Q, ha rotolato di γ: il pennino partito da H = (R_f, 0) è a distanza R_f γ da Q
Pev = Q + Rf * g * v3(sp.sin(g), -sp.cos(g))
assert sp.simplify(Pev.subs(g, 0) - v3(Rf, 0)) == M([0, 0, 0])
dP = Pev.diff(g)
R.eq('d075.1', nrm(Pev - Q), Rf * g)
R.eq('d075.2', dP.dot(Pev - Q), 0)
R.enunciato('d075.3', 'normale comune = tangente comune alle fondamentali (conseguenza geometrica di d075.2)')
# due fondamentali di raggi Rf1, Rf2 a interasse i: retta per C=(c,0) di direzione (sinθ, cosθ) a distanza Rf1 da O1 e Rf2 da O2
Rf1, Rf2 = sp.symbols('R_f1 R_f2', positive=True)
cc, ct = sp.symbols('c_C cth', positive=True)
sol = sp.solve([sp.Eq(cc * ct, Rf1), sp.Eq((i - cc) * ct, Rf2)], [cc, ct], dict=True)[0]
R1g = sol[cc]  # raggio primitivo O1C
R2g = i - sol[cc]
cth = sol[ct]
R.eq('d075.4', Rf1, R1g * cth)
F21, w1b = sp.symbols('F21 omega1b', positive=True)
C1e, C2e = F21 * Rf1, F21 * Rf2  # equilibrio alla rotazione, braccio = raggio fondamentale
w2e = sp.solve(sp.Eq(C1e * w1b + C2e * sp.Symbol('W'), 0), sp.Symbol('W'))[0]
R.eq('d075.5', w2e / w1b, -Rf1 / Rf2)
R.eq('d075.6', -R1g / R2g, -Rf1 / Rf2)
i2 = sp.Symbol('i2', positive=True)
sol2 = sp.solve([sp.Eq(cc * ct, Rf1), sp.Eq((i2 - cc) * ct, Rf2)], [cc, ct], dict=True)[0]
R.eq('d075.7', -sol2[cc] / (i2 - sol2[cc]), -Rf1 / Rf2)
assert sp.simplify(sol2[ct] - (Rf1 + Rf2) / i2) == 0
R.risultato('d075', -R1g / R2g, -Rf1 / Rf2)

# ---------------------------------------------------------------- d076 passo e modulo (pp. 163, 165)
m, z, p = sp.symbols('m z p', positive=True)
Rp = sp.Symbol('R', positive=True)
psol = sp.solve(sp.Eq(p * z, 2 * sp.pi * Rp), p)[0]  # z passi sulla primitiva
R.eq('d076.1', psol * z, 2 * sp.pi * Rp)
R.enunciato('d076.2', 'condizione di ingranamento: stesso passo')
msol = psol / sp.pi
R.eq('d076.3', msol, psol / sp.pi)
Rsol = sp.solve(sp.Eq(m, msol), Rp)[0]
R.eq('d076.4', m * z, 2 * Rsol)
a_, d_ = m, sp.Rational(5, 4) * m
R.eq('d076.5', a_ + d_, sp.Rational(9, 4) * m)
R.eq('d076.6', Rsol + a_, m * (z + 2) / 2)
zs = sp.solve(sp.Eq(m * z / 2 - d_, m * z / 2 * sp.cos(th)), z)[0]
R.eq('d076.7', zs, 5 / (2 * (1 - sp.cos(th))))
R.risultato('d076', Rsol, m * z / 2)

# ---------------------------------------------------------------- d077 interasse (pp. 165, 167)
z1, z2 = sp.symbols('z1 z2', positive=True)
R1m, R2m = m * z1 / 2, m * z2 / 2
xO2 = sp.Symbol('x_O2', positive=True)
iO = sp.solve(sp.Eq(xO2 - R1m, R2m), xO2)[0]  # C = (R1, 0) a distanza R2 da O2 = (x, 0), dall'altra parte
R.eq('d077.1', iO, R1m + R2m)
R.eq('d077.2', R1m, m * z1 / 2)
R.eq('d077.3', R1m + R2m, m * (z1 + z2) / 2)
ta, X, Y = sp.symbols('tau_a X Y', positive=True)
sl = sp.solve([sp.Eq(X + Y, i), sp.Eq(X, ta * Y)], [X, Y], dict=True)[0]
R.eq('d077.4', sl[X], i * ta / (1 + ta))
R.eq('d077.5', R1m - R2m, m * (z1 - z2) / 2)
R.risultato('d077', R1m + R2m, m * (z1 + z2) / 2)

# ---------------------------------------------------------------- d078 τ con i denti (pp. 163–166, 172)
W2 = sp.Symbol('W2')
w2est = sp.solve(sp.Eq(wedge(w1, v3(R1m, 0))[1], wedge(W2, v3(-R2m, 0))[1]), W2)[0]
w2int = sp.solve(sp.Eq(wedge(w1, v3(R1m, 0))[1], wedge(W2, v3(R2m, 0))[1]), W2)[0]  # C dalla stessa parte dei centri
R.eq('d078.1', w2est / w1, -R1m / R2m)
R.eq('d078.2', -R1m / R2m, -(R1m * sp.cos(th)) / (R2m * sp.cos(th)))
R.eq('d078.3', w2est / w1, -z1 / z2)
R.eq('d078.4', w2int / w1, z1 / z2)
assert sp.limit(-R1 / R2, R2, sp.oo) == 0
R.enunciato('d078.5', 'limite R₂ → ∞ (pignone–dentiera), verificato con limit')
R.risultato('d078', w2est / w1, -z1 / z2)


# ---------------------------------------------------------------- d080 segmento dei contatti (p. 166)
z1, z2, m = sp.symbols('z1 z2 m', positive=True)
sn, cs = sp.sin(th), sp.cos(th)
u = v3(sn, cs)
R1d, R2d, a_d = m * z1 / 2, m * z2 / 2, m
Rt1, Rt2, Rf1d, Rf2d = R1d + a_d, R2d + a_d, R1d * cs, R2d * cs
ss = sp.Symbol('s', real=True)
C0 = v3(R1d, 0)
O2d = v3(R1d + R2d, 0)
radA = sp.solve(sp.Eq((C0 + ss * u - v3(0, 0)).dot(C0 + ss * u), Rt1 ** 2), ss)
radB = sp.solve(sp.Eq((C0 + ss * u - O2d).dot(C0 + ss * u - O2d), Rt2 ** 2), ss)
num_ = {z1: 30, z2: 20, m: 1, th: sp.pi / 9}
sA = [r for r in radA if sp.N(r.subs(num_)) > 0][0]  # A: dalla parte di H₂
sB = [r for r in radB if sp.N(r.subs(num_)) < 0][0]  # B: dalla parte di H₁
sH1 = (v3(0, 0) - C0).dot(u)  # piede della perpendicolare da O₁
sH2 = (O2d - C0).dot(u)
AH1, BH2, CH1, CH2 = sA - sH1, sH2 - sB, -sH1, sH2
AC, BC, AB = sA, -sB, sA - sB
R.enunciato('d080.1', 'definizione di A e B')
R.eq('d080.2', AB, (AH1 - CH1) + (BH2 - CH2))
R.eq('d080.3', AH1 ** 2, Rt1 ** 2 - Rf1d ** 2)
assert sp.N((AH1 - sp.sqrt(Rt1 ** 2 - Rf1d ** 2)).subs(num_)) == 0 or abs(sp.N((AH1 - sp.sqrt(Rt1 ** 2 - Rf1d ** 2)).subs(num_))) < 1e-12
R.eq('d080.4', CH1, R1d * sn)
R.eq('d080.5', AC, R1d * (sp.sqrt((1 + a_d / R1d) ** 2 - cs ** 2) - sn))
R.eq('d080.6', AC, m * z1 / 2 * (sp.sqrt((1 + 2 / z1) ** 2 - cs ** 2) - sn))
assert sp.simplify(BC - m * z2 / 2 * (sp.sqrt((1 + 2 / z2) ** 2 - cs ** 2) - sn)) == 0
ABf = m / 2 * (z1 * sp.sqrt((1 + 2 / z1) ** 2 - cs ** 2) + z2 * sp.sqrt((1 + 2 / z2) ** 2 - cs ** 2) - (z1 + z2) * sn)
R.eq('d080.7', AB, ABf)
R.eq('d080.8', AB, sp.sqrt(Rt1 ** 2 - Rf1d ** 2) + sp.sqrt(Rt2 ** 2 - Rf2d ** 2) - (R1d + R2d) * sn)
R.risultato('d080', AB, ABf)

# ---------------------------------------------------------------- d079 arco d'azione (pp. 161, 166)
lam, tt, phi = sp.symbols('lambda t phi', real=True)
Rfs = sp.Symbol('R_f', positive=True)
mu = lam - tt  # evolvente svolta in verso antiorario: punto di tangenza ad angolo λ − t
Pinv = Rfs * v3(sp.cos(mu), sp.sin(mu)) + Rfs * tt * v3(-sp.sin(mu), sp.cos(mu))
# la retta di pressione è la tangente in H₁ (angolo −θ): l'evolvente la taglia per λ − t = −θ, a distanza R_f(λ + θ) da H₁
H1v = Rfs * v3(sp.cos(-th), sp.sin(-th))
Pcross = Pinv.subs(tt, lam + th)
assert sp.simplify(Pcross - H1v - Rfs * (lam + th) * u) == M([0, 0, 0])
Lfun = lambda ph, l0: Rfs * (l0 + ph + th)  # la ruota ruotata di φ porta l'origine in λ₀ + φ
l0 = sp.Symbol('lambda0', real=True)
LB, LC, LA = sB - sH1, -sH1, sA - sH1  # distanze da H₁ dei punti B, C, A
sub = {Rfs: Rf1d}
phB = sp.solve(sp.Eq(Lfun(phi, l0).subs(sub), LB), phi)[0]
phC = sp.solve(sp.Eq(Lfun(phi, l0).subs(sub), LC), phi)[0]
phA = sp.solve(sp.Eq(Lfun(phi, l0).subs(sub), LA), phi)[0]
RS = Rf1d * (phC - phB)
MC = R1d * (phC - phB)
MpC = R1d * (phA - phC)
R.enunciato('d079.1', 'definizione di arco d\'azione')
R.eq('d079.2', MC / R1d, RS / Rf1d)
R.eq('d079.3', BC, RS)
R.eq('d079.4', MC, BC / cs)
R.eq('d079.5', MpC, AC / cs)
ell = MC + MpC
R.eq('d079.6', ell, AB / cs)
pp = sp.pi * m
R.eq('d079.7', ell / pp, AB / (pp * cs))
zp = AB / (pp * cs)
R.eq('d079.8', zp, zp.subs(m, 1))
R.risultato('d079', ell / pp, AB / (pp * cs))

# ---------------------------------------------------------------- d138 passo di base (deduzione)
zz = sp.Symbol('z', positive=True)
Rz = m * zz / 2
Rfz = Rz * cs
pb = 2 * sp.pi * Rfz / zz  # arco di fondamentale fra due profili omologhi
R.eq('d138.1', pb * zz, 2 * sp.pi * Rfz)
R.eq('d138.2', pb, sp.pi * m * cs)
dL = Lfun(0, l0 + 2 * sp.pi / zz) - Lfun(0, l0)  # due evolventi omologhe successive
R.eq('d138.3', dL.subs(Rfs, Rfz), pb)
R.eq('d138.4', AB / (pp * cs), AB / (sp.pi * m * cs))
R.enunciato('d138.5', 'interpretazione del numero di coppie in presa')
R.risultato('d138', pb, sp.pi * m * cs)

# ---------------------------------------------------------------- d081 interferenza: condizione (p. 167)
R1s, R2s, a_s = sp.symbols('R1 R2 a', positive=True)
Cg = v3(R1s, 0)
O2g = v3(R1s + R2s, 0)
sH2g = (O2g - Cg).dot(u)
H2g = Cg + sH2g * u
O1H2q = sp.expand(H2g.dot(H2g))
radAg = sp.solve(sp.Eq((Cg + ss * u).dot(Cg + ss * u), (R1s + a_s) ** 2), ss)
Ag = Cg + radAg[1] * u
R.enunciato('d081.1', 'definizione di interferenza')
R.enunciato('d081.2', 'contatto a evolvente solo fra H₁ e H₂')
R.enunciato('d081.3', 'caso critico per la ruota grande')
R.eq('d081.4', Ag.dot(Ag), (R1s + a_s) ** 2)
ii, Rf2g = R1s + R2s, R2s * cs
R.eq('d081.5', O1H2q, ii ** 2 + Rf2g ** 2 - 2 * ii * Rf2g * cs)
R.eq('d081.6', O1H2q, (R1s + R2s) ** 2 + R2s ** 2 * cs ** 2 - 2 * (R1s + R2s) * R2s * cs ** 2)
R.enunciato('d081.7', 'disuguaglianza (condizione)')
R.eq('d081.8', O1H2q, (R1s * cs) ** 2 + ((R1s + R2s) * sn) ** 2)
R.risultato('d081', O1H2q, (R1s + R2s) ** 2 + R2s ** 2 * cs ** 2 - 2 * (R1s + R2s) * R2s * cs ** 2)

# ---------------------------------------------------------------- d082 numero minimo di denti (pp. 167–168)
ta = sp.Symbol('tau_a', positive=True)  # |τ| = z1/z2
z2s = sp.Symbol('z2', positive=True)
sub82 = {R1s: m * ta * z2s / 2, R2s: m * z2s / 2, a_s: m}
L1, Q1 = R1s + a_s, O1H2q  # R1 + a ≤ sqrt(Q1)
R.eq('d082.1', Q1, (R1s + R2s) ** 2 + R2s ** 2 * cs ** 2 - 2 * (R1s + R2s) * R2s * cs ** 2)
L2 = ta * z2s / 2 + 1
Q2 = (ta * z2s + z2s) ** 2 / 4 + z2s ** 2 / 4 * cs ** 2 - 2 * (ta * z2s + z2s) * z2s / 4 * cs ** 2
assert sp.simplify(L1.subs(sub82) / m - L2) == 0
R.eq('d082.2', Q1.subs(sub82) / m ** 2, Q2)
L3 = ta + 2 / z2s
Q3 = (ta + 1) ** 2 + cs ** 2 - 2 * (ta + 1) * cs ** 2
assert sp.simplify(L2 * 2 / z2s - L3) == 0
R.eq('d082.3', Q2 * 4 / z2s ** 2, Q3)
Q4 = ta ** 2 + (2 * ta + 1) * sn ** 2
R.eq('d082.4', Q3, Q4)
zb_ = sp.solve(sp.Eq(L3, sp.sqrt(Q4)), z2s)
fz = 2 / (sp.sqrt(Q4) - ta)
assert len(zb_) == 1
R.eq('d082.5', zb_[0], fz)
R.eq('d082.6', fz, 2 * (sp.sqrt(Q4) + ta) / ((2 * ta + 1) * sn ** 2))
assert sp.simplify(sp.limit(fz, ta, sp.oo) - 2 / sn ** 2) == 0
# dentiera: primitiva = retta per C, testa parallela a distanza a; la retta di pressione la taglia in s sinθ = a
sCA = sp.solve(sp.Eq(ss * sn, a_s), ss)[0]
R.eq('d082.7', sCA, a_s / sn)
assert sp.simplify((v3(R2s, 0) - v3(0, 0)).dot(u) - R2s * sn) == 0  # CH₂ con O₂ = (R₂, 0), C nell'origine
zr = sp.solve(sp.Eq(m / sn, m * z2s / 2 * sn), z2s)[0]
R.eq('d082.8', zr, 2 / sn ** 2)
deg20 = sp.pi / 9
R.eq('d082.9', sp.ceiling(sp.N(fz.subs({ta: 2, th: deg20}), 30)), 15)
assert abs(sp.N(fz.subs({ta: 2, th: deg20})) - sp.Float('14.1607591')) < 1e-6
R.eq('d082.10', sp.ceiling(sp.N((2 / sn ** 2).subs(th, deg20), 30)), 18)
R.enunciato('d082.11', 'tabella d\'uso delle due formule (p. 168)')
R.risultato('d082', zb_[0], fz)

# ---------------------------------------------------------------- d083–d086 forze (pp. 162, 169–170)
R1f, R2f, Nn, C1f, ff, x, w1f = sp.symbols('R1 R2 N C1 f x omega1', positive=True)
Cf_ = v3(R1f, 0)
O2f = v3(R1f + R2f, 0)
kxu = v3(-cs, sn)  # k ∧ u
w2f = -w1f * R1f / R2f
sN = sp.Symbol('Nsol')
# d083: contatto liscio, P qualsiasi sulla retta
Pf = Cf_ + ss * u
N0 = sp.solve(sp.Eq(C1f + cz(Pf, -sN * u), 0), sN)[0]
C2_0 = sp.solve(sp.Eq(sp.Symbol('C2') + cz(Pf - O2f, sN * u).subs(sN, N0), 0), sp.Symbol('C2'))[0]
F21_0 = -N0 * u
Q0 = -F21_0[1]  # componente tangente alla primitiva in C (lungo −j)
Rr0 = -F21_0[0]  # componente radiale (verso O₁)
R.enunciato('d083.1', 'contatto liscio: forza normale ai profili')
R.eq('d083.2', C1f, N0 * R1f * cs)
R.eq('d083.3', C1f, Q0 * R1f)
R.eq('d083.4', Rr0, Q0 * sp.tan(th))
R.eq('d083.5', C1f / C2_0, (R1f * cs) / (R2f * cs))
R.eq('d083.6', N0, C1f / (R1f * cs))
R.risultato('d083', C1f, Q0 * R1f)


def contatto(sgn):
    """sgn = −1 accesso (P fra B e C), +1 recesso; restituisce N, C2, η, V^rel_{1,2} e la forza d'attrito su 1"""
    P = Cf_ + sgn * x * u
    V1 = wedge(w1f, P)
    V2 = wedge(w2f, P - O2f)
    V12 = V1 - V2
    # verso della velocità relativa: V12 = (ω1 − ω2) k ∧ (P − C), con ω1 − ω2 > 0
    assert sp.simplify(V12 - (w1f - w2f) * sgn * x * kxu) == M([0, 0, 0])
    e = sgn * kxu  # versore di V^rel_{1,2}
    F21 = -sN * u - ff * sN * e  # normale verso H₁ + attrito opposto a V^rel_{1,2}
    N = sp.solve(sp.Eq(C1f + cz(P, F21), 0), sN)[0]
    C2 = sp.solve(sp.Eq(sp.Symbol('C2') + cz(P - O2f, -F21.subs(sN, N)), 0), sp.Symbol('C2'))[0]
    eta = -(C2 * w2f) / (C1f * w1f)
    return dict(P=P, V1=V1, V2=V2, V12=V12, N=N, C2=C2, eta=eta, FT=(-ff * sN * e).subs(sN, N))


acc, rec = contatto(-1), contatto(+1)
V21 = acc['V2'] - acc['V1']
R.eq('d084.1', V21[0], wedge(w2f - w1f, acc['P'] - Cf_)[0])
R.enunciato('d084.2', 'verso dell\'attrito (opposto alla velocità relativa)')
Na = acc['N']
R.eq('d084.3', C1f, Na * R1f * cs - ff * Na * (R1f * sn - x))
R.eq('d084.4', Na, C1f / (R1f * cs - ff * (R1f * sn - x)))
R.eq('d084.5', acc['C2'], Na * (R2f * cs - ff * (R2f * sn + x)))
R.eq('d084.6', acc['C2'] / C1f, (R2f * cs - ff * (R2f * sn + x)) / (R1f * cs - ff * (R1f * sn - x)))
tg = sp.tan(th)
etaA_D = (1 - ff * (tg + x / (R2f * cs))) / (1 - ff * (tg - x / (R1f * cs)))
etaR_D = (1 + ff * (tg - x / (R2f * cs))) / (1 + ff * (tg + x / (R1f * cs)))
R.eq('d084.7', acc['eta'], etaA_D)
R.eq('d084.8', rec['N'], C1f / (R1f * cs + ff * (R1f * sn + x)))
R.eq('d084.9', rec['eta'], etaR_D)
R.eq('d084.10', acc['eta'].subs(x, 0), 1)
assert sp.simplify(rec['eta'].subs(x, 0) - 1) == 0
R.risultato('d084', acc['eta'], etaA_D)

# d085: P generico (s con segno)
Pg = Cf_ + ss * u
V21g = wedge(w2f, Pg - O2f) - wedge(w1f, Pg)
R.eq('d085.1', V21g[1], wedge(w2f - w1f, Pg - Cf_)[1])
R.eq('d085.2', w1f - w2f, w1f + w1f * R1f / R2f)  # |ω2 − ω1| con ω1 > 0 > ω2
R.eq('d085.3', V21g.dot(V21g), ((w1f + w1f * R1f / R2f) * ss) ** 2)
assert sp.simplify(V21g.dot(u)) == 0  # perpendicolare alla retta di pressione
R.enunciato('d085.4', 'annullamento in C e cambio di verso')
R.eq('d085.5', V21g.dot(V21g), (w1f * (1 + R1f / R2f) * ss) ** 2)
R.risultato('d085', V21g.dot(V21g), ((w1f + w1f * R1f / R2f) * ss) ** 2)

# d086: potenza dissipata in accesso
W = acc['FT'].dot(acc['V12'])
R.eq('d086.1', W, cz(acc['P'] - Cf_, acc['FT']) * (w1f - w2f))
R.eq('d086.2', -W, ff * Na * (w1f + w1f * R1f / R2f) * x)
K = ff * N0 * (w1f + w1f * R1f / R2f)  # F_N del contatto liscio
R.eq('d086.3', K * x, ff * C1f / (R1f * cs) * (w1f + w1f * R1f / R2f) * x)
R.eq('d086.4', sp.diff(Lfun(phi, l0), phi).subs(Rfs, R1f * cs) * w1f, R1f * cs * w1f)
tvar, BCs, ACs = sp.symbols('t BC AC', positive=True)
vP = R1f * cs * w1f
Eint = sp.integrate(K * (BCs - vP * tvar), (tvar, 0, BCs / vP)) + sp.integrate(K * vP * tvar, (tvar, 0, ACs / vP))
R.eq('d086.5', Eint, K * (BCs ** 2 + ACs ** 2) / (2 * R1f * cs * w1f))
R.risultato('d086', -W, ff * Na * (w1f + w1f * R1f / R2f) * x)

# ---------------------------------------------------------------- d087 rotismo ordinario (pp. 171–173)
zs4 = sp.symbols('z1:5', positive=True)
Rr = [m * z / 2 for z in zs4]
w1r, C1r = sp.symbols('omega1 C1', nonzero=True)
W_ = sp.Symbol('W')
# contatto esterno: V del punto primitivo uguale sulle due ruote (centri da parti opposte)
w2r = sp.solve(sp.Eq(wedge(w1r, v3(Rr[0], 0))[1], wedge(W_, v3(-Rr[1], 0))[1]), W_)[0]
w3r = w2r  # ruote solidali
w4r = sp.solve(sp.Eq(wedge(w3r, v3(Rr[2], 0))[1], wedge(W_, v3(-Rr[3], 0))[1]), W_)[0]
taur = w4r / w1r
Qs = sp.symbols('Q21 Q12 Q43 Q34')
C4s = sp.Symbol('C4')
solF = sp.solve([C1r - Qs[0] * Rr[0], Qs[1] * Rr[1] + Qs[2] * Rr[2], C4s - Qs[3] * Rr[3], Qs[1] + Qs[0], Qs[3] + Qs[2]], [*Qs, C4s], dict=True)[0]
C4tfv = sp.solve(sp.Eq(C1r * w1r + C4s * w4r, 0), C4s)[0]
R.enunciato('d087.1', 'convenzione dei segni')
R.eq('d087.2', w2r / w1r, -zs4[0] / zs4[1])
R.eq('d087.3', w3r, w2r)
R.eq('d087.4', w4r / w3r, -zs4[2] / zs4[3])
R.eq('d087.5', taur, zs4[0] * zs4[2] / (zs4[1] * zs4[3]))
R.eq('d087.6', C4tfv, -C1r / taur)
R.eq('d087.7', (Qs[1] * Rr[1] + Qs[2] * Rr[2]).subs(solF), 0)
R.eq('d087.8', solF[C4s], -C1r * Rr[1] * Rr[3] / (Rr[0] * Rr[2]))
assert sp.simplify(solF[C4s] - C4tfv) == 0
# 3–4 interno (p. 173): centri dalla stessa parte di C
w4i = sp.solve(sp.Eq(wedge(w3r, v3(Rr[2], 0))[1], wedge(W_, v3(Rr[3], 0))[1]), W_)[0]
taui = w4i / w1r
solI = sp.solve([C1r + Qs[0] * Rr[0], -Qs[1] * Rr[1] + Qs[2] * Rr[2], C4s + Qs[3] * Rr[3], Qs[1] + Qs[0], Qs[3] + Qs[2]], [*Qs, C4s], dict=True)[0]
assert sp.simplify(taui + zs4[0] * zs4[2] / (zs4[1] * zs4[3])) == 0
R.eq('d087.9', solI[C4s], -C1r / taui)
R.risultato('d087', taur, zs4[0] * zs4[2] / (zs4[1] * zs4[3]))

# ---------------------------------------------------------------- d088 ruota oziosa (p. 173)
za, zb, zc, zb2 = sp.symbols('z_a z_b z_c z_b2', positive=True)
Ra, Rb, Rc = m * za / 2, m * zb / 2, m * zc / 2
wa = sp.Symbol('omega_a', positive=True)
wb = sp.solve(sp.Eq(wedge(wa, v3(Ra, 0))[1], wedge(W_, v3(-Rb, 0))[1]), W_)[0]
wc = sp.solve(sp.Eq(wedge(wb, v3(Rb, 0))[1], wedge(W_, v3(-Rc, 0))[1]), W_)[0]
tau88 = wc / wa
Qo = sp.symbols('Qba Qab Qcb Qbc')
C3s = sp.Symbol('C3')
solO = sp.solve([C1r + Ra * Qo[0], -Rb * Qo[1] + Rb * Qo[2], C3s - Rc * Qo[3], Qo[1] + Qo[0], Qo[3] + Qo[2]], [*Qo, C3s], dict=True)[0]
R.eq('d088.1', wb / wa, -za / zb)
R.eq('d088.2', tau88, za / zc)
R.eq('d088.3', tau88, tau88.subs(zb, zb2))
R.eq('d088.4', solO[C3s] / C1r, -1 / tau88)
assert sp.simplify(sp.solve(sp.Eq(C1r * wa + C3s * wc, 0), C3s)[0] - solO[C3s]) == 0
wcd = sp.solve(sp.Eq(wedge(wa, v3(Ra, 0))[1], wedge(W_, v3(-Rc, 0))[1]), W_)[0]
R.eq('d088.5', -wcd / wa, tau88)  # stesso modulo, segno opposto
R.eq('d088.6', (Ra + Rb) + (Rb + Rc), Ra + 2 * Rb + Rc)
R.risultato('d088', tau88, za / zc)

R.salva()
