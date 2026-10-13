"""Verifica simbolica del capitolo C3 (freni e frizioni). Modello ricostruito dai principi.

Forze elementari integrate con integrate, equilibri scritti con prodotti vettoriali e risolti con solve, consumo
ricavato dalla velocità di accostamento, limiti con limit. Nessuna formula è copiata dal codice TypeScript.
"""
from comune import Registro, sp

R = Registro('C3')
pi, sin, cos, I = sp.pi, sp.sin, sp.cos, sp.I


def kx(w, v):
    """ω k ∧ v nel piano"""
    return sp.Matrix([-w * v[1], w * v[0]])


def cross(a, b):
    return a[0] * b[1] - a[1] * b[0]


def V(*c):
    return sp.Matrix(c)


def check(cond, msg):
    if not cond:
        R.errori.append(msg)


th = sp.Symbol('theta', real=True)
p0, Rr, B, al, f = sp.symbols('p0 R B alpha f', positive=True)

# ---------------------------------------------------------------- d038 risultante normale (p. 106)
n = V(-cos(th), -sin(th))
FNx = sp.integrate(p0 * Rr * B * n[0], (th, -al / 2, al / 2))
FNy = sp.integrate(p0 * Rr * B * n[1], (th, -al / 2, al / 2))
for k in (1, 2):
    R.enunciato(f'd038.{k}')
R.eq('d038.3', FNx, -2 * p0 * Rr * B * sin(al / 2))
R.eq('d038.4', FNy, 0)
R.eq('d038.5', FNx**2 + FNy**2, (2 * p0 * Rr * B * sin(al / 2))**2)
somma_moduli = sp.integrate(p0 * Rr * B, (th, -al / 2, al / 2))
R.eq('d038.6', -FNx / somma_moduli, sin(al / 2) / (al / 2))
R.risultato('d038', FNx, -2 * p0 * Rr * B * sin(al / 2))

# ---------------------------------------------------------------- d039 risultante tangenziale, cerchio d'attrito (p. 107)
et = V(-sin(th), cos(th))
FTx = sp.integrate(-f * p0 * Rr * B * et[0], (th, -al / 2, al / 2))
FTy = sp.integrate(-f * p0 * Rr * B * et[1], (th, -al / 2, al / 2))
R.enunciato('d039.1')
R.eq('d039.2', FTy + I * FTx, -2 * f * p0 * Rr * B * sin(al / 2))
R.eq('d039.3', -FTy, f * (-FNx))
R.eq('d039.4', sp.atan(FTy / FNx), sp.atan(f))
Mf_es = sp.integrate(Rr * f * p0 * Rr * B, (th, -al / 2, al / 2))  # ogni dF_T ha braccio R
R.eq('d039.5', Mf_es, f * p0 * Rr**2 * B * al)
Ff2 = FNx**2 + FTy**2
R.eq('d039.6', (FTy * Rr)**2, Ff2 * Rr**2 * sin(sp.atan(f))**2)
R.eq('d039.7', Mf_es / (-FTy * Rr), (al / 2) / sin(al / 2))
R.enunciato('d039.8')
R.risultato('d039', FTy, -2 * f * p0 * Rr * B * sin(al / 2))

# ---------------------------------------------------------------- d040 Reye nel tamburo (pp. 108–109)
k, w, pp, dA, wacc, d = sp.symbols('k omega p dA omega_acc d', positive=True)
dFT = -f * pp * dA * et
Vrel = w * Rr * et
dd = k * sp.Abs(dFT.dot(Vrel)) / dA
R.enunciato('d040.1')
R.enunciato('d040.2', 'ipotesi di Reye')
R.eq('d040.3', dd, k * f * pp * w * Rr)
R.eq('d040.4', dd / pp, k * f * w * Rr)
P = V(Rr * cos(th), Rr * sin(th))
Op = V(0, -d)
dacc = kx(wacc, P - Op).dot(n)
R.eq('d040.5', dacc, wacc * d * cos(th))
R.eq('d040.6', dacc.subs(th, al / 2) / dacc.subs(th, 0), cos(al / 2))
R.enunciato('d040.7', 'consumo approssimato uniforme')
R.risultato('d040', dd, k * f * w * Rr * pp)

# ---------------------------------------------------------------- d041 pressione iperbolica (pp. 116, 120)
r, ri, re, N, Kc, Pp, dd0 = sp.symbols('r r_i r_e N K P ddot0', positive=True)
dFTd = -f * pp * dA * et
Vd = w * r * et
R.enunciato('d041.1')
R.enunciato('d041.2', 'accostamento traslatorio')
R.eq('d041.3', k * sp.Abs(dFTd.dot(Vd)) / dA, k * f * w * r * pp)
kp = k * f * w
p_sol = sp.solve(sp.Eq(kp * r * Pp, dd0), Pp)[0]
R.eq('d041.4', p_sol, (dd0 / kp) / r)
R.eq('d041.5', sp.integrate(sp.integrate(Kc / r * r, (r, ri, re)), (th, -al / 2, al / 2)), Kc * al * (re - ri))
Kn = sp.solve(sp.Eq(sp.integrate(Kc / r * 2 * pi * r, (r, ri, re)), N), Kc)[0]
R.eq('d041.6', Kn / r, N / (2 * pi * r * (re - ri)))
R.eq('d041.7', (Kn / ri) / (Kn / re), re / ri)
R.risultato('d041', p_sol, (dd0 / kp) / r)

# ---------------------------------------------------------------- d042 avvolgente / svolgente (pp. 109–110)
F, h, e, Nn = sp.symbols('F h e N_n', positive=True)
dd_ = f * Rr + e  # OO' > f R: il ceppo avvolgente non è bloccato
Opr = V(0, -dd_)
M_dx, M_sx = V(Rr, 0), V(-Rr, 0)
Om = sp.Symbol('Omega', positive=True)
vM_dx = kx(-Om, M_dx)  # tamburo orario
vM_sx = kx(-Om, M_sx)
# forze del tamburo sul ceppo: normale verso l'esterno, attrito concorde con la velocità del tamburo
Fdx = {'N': V(Nn, 0), 'T': f * Nn * vM_dx / Om / Rr}
Fsx = {'N': V(-Nn, 0), 'T': f * Nn * vM_sx / Om / Rr}
mom_dx = cross(V(0, h), V(-F, 0)) + cross(M_dx - Opr, Fdx['N']) + cross(M_dx - Opr, Fdx['T'])
mom_sx = cross(V(0, h), V(F, 0)) + cross(M_sx - Opr, Fsx['N']) + cross(M_sx - Opr, Fsx['T'])
R.enunciato('d042.1')
R.eq('d042.2', mom_dx, F * h - Nn * dd_ - f * Nn * Rr)
Ndx = sp.solve(sp.Eq(mom_dx, 0), Nn)[0]
Nsx = sp.solve(sp.Eq(mom_sx, 0), Nn)[0]
Tdx, Tsx = f * Ndx, f * Nsx
R.eq('d042.3', Tdx, F * h / (dd_ / f + Rr))
check(sp.simplify(mom_sx - (Nn * dd_ - f * Nn * Rr - F * h)) == 0, 'd042.4: equazione dei momenti del ceppo sinistro')
R.eq('d042.4', Tsx, F * h / (dd_ / f - Rr))
R.eq('d042.5', Tsx / Tdx, (dd_ / f + Rr) / (dd_ / f - Rr))
rho = Rr * sin(sp.atan(f))
R.eq('d042.6', (Tdx + Tsx) * Rr, (sp.sqrt(Ndx**2 + Tdx**2) + sp.sqrt(Nsx**2 + Tsx**2)) * rho)
R.enunciato('d042.7')
R.risultato('d042', Tsx, F * h / (dd_ / f - Rr))

# ---------------------------------------------------------------- d043 autobloccaggio (p. 110)
T, dO = sp.symbols('T d_O', positive=True)
fs = sp.Symbol('f_s', positive=True)
Fsol = sp.solve(sp.Eq(T, F * h / (dO / fs - Rr)), F)[0]
R.eq('d043.1', Fsol, T / h * (dO / fs - Rr))
R.enunciato('d043.2', 'denominatore che si annulla')
flim = sp.solve(sp.Eq(Fsol, 0), fs)
check(len(flim) == 1, 'd043.3: una sola soluzione attesa')
R.eq('d043.3', flim[0], dO / Rr)
dist_num = cross(V(0, -dO) - V(-Rr, 0), V(-1, fs))
R.eq('d043.4', dist_num.subs(fs, flim[0]), 0)
R.enunciato('d043.5')
R.enunciato('d043.6')
R.risultato('d043', flim[0], dO / Rr)

# ---------------------------------------------------------------- d142 consumo massimo (pp. 108, 123)
OC, ga = sp.symbols('OC gamma', real=True)
OC = sp.Symbol('OC', positive=True)
C = V(OC * cos(ga), OC * sin(ga))
cons_PC = kx(wacc, P - C).dot(n)
cons_OC = kx(wacc, -C).dot(n)
R.enunciato('d142.1')
R.enunciato('d142.2')
R.eq('d142.3', cons_PC, cons_OC)
R.eq('d142.4', cons_OC, wacc * OC * sin(th - ga))
der = sp.diff(cons_OC, th)
check(sp.simplify(der.subs(th, ga + pi / 2)) == 0, 'd142.5: derivata non nulla nel massimo')
check(sp.simplify(sp.diff(cons_OC, th, 2).subs(th, ga + pi / 2)) != 0, 'd142.5: punto stazionario degenere')
R.eq('d142.5', cons_OC.subs(th, ga + pi / 2), wacc * OC)
R.eq('d142.6', cons_OC.subs(ga, -pi / 2), wacc * OC * cos(th))
R.enunciato('d142.7')
R.risultato('d142', cons_PC, wacc * OC * sin(th - ga))

# ---------------------------------------------------------------- d044 pattino rigido (pp. 114–115)
x, s, l, kb, Vn, k1, Caz, FT_ = sp.symbols("x s l kbar V k1 C_az F_T", positive=True)
Pp_ = V(x, 0); O_ = V(0, h); m_ = V(0, -1)
Vacc = kx(wacc, Pp_ - O_)
check(sp.simplify(kx(wacc, V(0, 0) - O_).dot(m_)) == 0, "d044.2: ω_acc∧(O*−O) dovrebbe essere parallela al nastro")
R.enunciato('d044.1')
R.eq('d044.2', sp.Abs(Vacc.dot(m_)), wacc * x)
R.eq('d044.3', kb * sp.Abs((-f * pp * dA) * Vn) / dA, kb * f * Vn * pp)
psol = sp.solve(sp.Eq(kb * f * Vn * Pp, wacc * x), Pp)[0]
R.eq('d044.4', psol, wacc / (kb * f * Vn) * x)
FNp = sp.integrate(k1 * x * B, (x, s, s + l))
S2, S3 = (s + l)**2 - s**2, (s + l)**3 - s**3
R.eq('d044.5', FNp, B * k1 / 2 * S2)
FTp = sp.integrate(f * k1 * x * B, (x, s, s + l))
R.eq('d044.6', FTp, f * FNp)
x0 = sp.integrate(x * k1 * x * B, (x, s, s + l)) / FNp
R.eq('d044.7', x0, sp.Rational(2, 3) * S3 / S2)
# momenti rispetto a O delle forze del nastro sul pattino (normale +y, attrito lungo +x nel verso della figura)
Mz = sp.integrate(cross(V(x, -h), V(0, k1 * x * B)) + cross(V(x, -h), V(f * k1 * x * B, 0)), (x, s, s + l))
R.eq('d044.8', Mz, FNp * x0 + FTp * h)  # la coppia di accostamento deve valere Mz in modulo
FTc = sp.solve(sp.Eq(Caz, FT_ / f * x0 + FT_ * h), FT_)[0]
check(sp.simplify(FTc - Caz / (x0 / f + h)) == 0, 'd044.9: verso «contro»')
Mz_a = sp.integrate(cross(V(x, -h), V(0, k1 * x * B)) + cross(V(x, -h), V(-f * k1 * x * B, 0)), (x, s, s + l))
check(sp.simplify(Mz_a - (FNp * x0 - FTp * h)) == 0, 'd044.9: momento con attrito invertito')
FTa = sp.solve(sp.Eq(Caz, FT_ / f * x0 - FT_ * h), FT_)[0]
R.eq('d044.9', FTa * x0 / f - FTa * h, Caz)
R.risultato('d044', x0, sp.Rational(2, 3) * S3 / S2)

# ---------------------------------------------------------------- d045 pattino libero (pp. 112, 125)
a_, xA, xO, yO, Cc, Ff = sp.symbols('a x_A x_O y_O C F_f', positive=True)
u = V(f, 1) / sp.sqrt(1 + f**2)
R.eq('d045.1', 2 * 3 - 2 * 2, 2)
R.enunciato('d045.2')
FNl, FTl = Ff * u[1], Ff * u[0]
R.eq('d045.3', FTl / FNl, f)
t = sp.Symbol('t')
tc = sp.solve(sp.Eq(a_ + t * u[1], 0), t)[0]
R.eq('d045.4', xA + tc * u[0], xA - a_ * f)
cr = cross(V(xA, a_) - V(xO, yO), u)
Ffs = sp.solve(sp.Eq(Cc + Ff * cr, 0), Ff)[0]  # equilibrio alla rotazione dell'asta attorno a Ō
R.eq('d045.5', Ffs * cr, -Cc)
R.eq('d045.6', FTl, Ff * sin(sp.atan(f)))
for k_ in (7, 8, 9):
    R.enunciato(f'd045.{k_}')
R.risultato('d045', FTl / FNl, f)

# ---------------------------------------------------------------- d046 Varignon (pp. 115, 128)
Kd = sp.Symbol('K', positive=True)
R.enunciato('d046.1')
R.eq('d046.2', sp.integrate(x * k1 * x * B, (x, s, s + l)), B * k1 * S3 / 3)
R.eq('d046.3', x0, sp.Rational(2, 3) * S3 / S2)
R.eq('d046.4', x0 - (s + l / 2), l**2 / (6 * (2 * s + l)))
FNd = sp.integrate(sp.integrate(Kd / r * r, (r, ri, re)), (th, -al / 2, al / 2))
bm = sp.integrate(sp.integrate(r * cos(th) * Kd / r * r, (r, ri, re)), (th, -al / 2, al / 2)) / FNd
rm = (re + ri) / 2
R.eq('d046.5', bm, rm * sin(al / 2) / (al / 2))
Mfd = sp.integrate(sp.integrate(f * Kd / r * r * r, (r, ri, re)), (th, -al / 2, al / 2))
FTd = -sp.integrate(sp.integrate(-f * Kd / r * cos(th) * r, (r, ri, re)), (th, -al / 2, al / 2))
bt = Mfd / FTd
R.eq('d046.6', bm * bt, rm**2)
R.eq('d046.7', Mf_es / (-FTy), Rr * (al / 2) / sin(al / 2))
R.risultato('d046', x0, sp.Rational(2, 3) * S3 / S2)

# ---------------------------------------------------------------- d050 pattino come limite del ceppo (pp. 114, 124)
L_, ps = sp.symbols('L psi', positive=True)
Px, Py, Cx, Cy = sp.symbols('P_x P_y C_x C_y', real=True)
nn = V(cos(ps), sin(ps))
tt = V(nn[1], -nn[0])  # n ∧ k
R.enunciato('d050.1')
R.eq('d050.2', kx(wacc, V(Px - Cx, Py - Cy)).dot(nn), wacc * V(Px - Cx, Py - Cy).dot(tt))
R.eq('d050.3', kx(wacc, P - Op).dot(n), wacc * (V(0, 0) - Op).dot(et))
R.eq('d050.4', sp.Abs(kx(wacc, V(x, 0) - V(0, h)).dot(m_)), wacc * x)
R.eq('d050.5', sp.limit(2 * p0 * Rr * B * sin(L_ / (2 * Rr)), Rr, sp.oo), p0 * B * L_)
R.enunciato('d050.6')
R.enunciato('d050.7')
R.risultato('d050', sp.Abs(kx(wacc, V(x, 0) - V(0, h)).dot(m_)), wacc * x)

# ---------------------------------------------------------------- d047 pressione uniforme (esterna)
FNu = sp.integrate(sp.integrate(p0 * r, (r, ri, re)), (th, -al / 2, al / 2))
Mfu = sp.integrate(sp.integrate(f * p0 * r * r, (r, ri, re)), (th, -al / 2, al / 2))
Ru = sp.Rational(2, 3) * (re**3 - ri**3) / (re**2 - ri**2)
R.enunciato('d047.1')
R.enunciato('d047.2')
R.eq('d047.3', FNu, p0 * al * (re**2 - ri**2) / 2)
R.eq('d047.4', Mfu, f * p0 * al * (re**3 - ri**3) / 3)
R.eq('d047.5', Mfu.subs(al, 2 * pi), 2 * pi * f * p0 / 3 * (re**3 - ri**3))
R.eq('d047.6', Mfu, f * FNu * Ru)
R.eq('d047.7', (k * f * w * re * p0) / (k * f * w * ri * p0), re / ri)
R.risultato('d047', Mfu, f * FNu * Ru)

# ---------------------------------------------------------------- d048 usura uniforme (p. 116)
er_ = V(cos(th), sin(th))
R.enunciato('d048.1')
R.eq('d048.2', cross(r * er_, -f * pp * dA * et), -f * pp * dA * r)
R.enunciato('d048.3', 'p = K/r da d041')
FNw = sp.integrate(sp.integrate(Kd / r * r, (r, ri, re)), (th, -al / 2, al / 2))
Mfw = sp.integrate(sp.integrate(f * Kd / r * r * r, (r, ri, re)), (th, -al / 2, al / 2))
R.eq('d048.4', FNw, Kd * al * (re - ri))
R.eq('d048.5', Mfw, f * Kd * al * (re**2 - ri**2) / 2)
R.eq('d048.6', Mfw, f * FNw * rm)
R.eq('d048.7', 2 * Mfw, 2 * f * FNw * rm)
R.risultato('d048', Mfw, f * FNw * rm)

# ---------------------------------------------------------------- d049 raggio equivalente e b_t (pp. 116, 127–128)
FN_ = sp.Symbol('F_N', positive=True)
Kw = sp.solve(sp.Eq(FNw, FN_), Kd)[0]
p0w = sp.solve(sp.Eq(FNu, FN_), p0)[0]
R.enunciato('d049.1')
R.eq('d049.2', (Mfw / (f * FN_)).subs(Kd, Kw), rm)
R.eq('d049.3', (Mfu / (f * FN_)).subs(p0, p0w), Ru)
R.eq('d049.4', Ru - rm, (re - ri)**2 / (6 * (re + ri)))
FTwx = sp.integrate(sp.integrate(-f * Kd / r * et[0] * r, (r, ri, re)), (th, -al / 2, al / 2))
FTwy = sp.integrate(sp.integrate(-f * Kd / r * et[1] * r, (r, ri, re)), (th, -al / 2, al / 2))
R.eq('d049.5', (-FTwy + I * FTwx).subs(Kd, Kw), f * FN_ * sin(al / 2) / (al / 2))
R.eq('d049.6', Mfw / (-FTwy), rm * (al / 2) / sin(al / 2))
R.eq('d049.7', FTwy.subs(al, 2 * pi), 0)
R.risultato('d049', (Mfw / (f * FN_)).subs(Kd, Kw), rm)

# ---------------------------------------------------------------- d052 frizione piana (pp. 117–120)
i_, j_ = sp.symbols('i j', positive=True, integer=True)
I1, I2, w10, w20, wf, J = sp.symbols('I_1 I_2 omega_10 omega_20 omega_f J', positive=True)
R.enunciato('d052.1')
Nint = sp.integrate(Kd / r * 2 * pi * r, (r, ri, re))
R.eq('d052.2', Nint, 2 * pi * Kd * (re - ri))
Kf = sp.solve(sp.Eq(Nint, N), Kd)[0]
check(sp.simplify(Kf / r - N / (2 * pi * r * (re - ri))) == 0, 'd052.2: pressione (5.85)')
Cf1 = sp.integrate(f * Kd / r * r * 2 * pi * r, (r, ri, re))
R.eq('d052.3', Cf1, 2 * pi * f * Kd * (re**2 - ri**2) / 2)
R.eq('d052.4', Cf1.subs(Kd, Kf), f * N * rm)
R.eq('d052.5', sp.Sum(Cf1.subs(Kd, Kf), (j_, 1, i_)).doit(), i_ * f * N * rm)
R.enunciato('d052.6')
R.enunciato('d052.7', 'equazioni di p. 118')
# urto: integrando I1 ω̇1 = −C_f e I2 ω̇2 = C_f sulla durata (C_m, C_r trascurabili), J = ∫ C_f dt
sol = sp.solve([sp.Eq(I1 * (wf - w10), -J), sp.Eq(I2 * (wf - w20), J)], [wf, J], dict=True)[0]
R.eq('d052.8', I1 * w10 + I2 * w20, (I1 + I2) * sol[wf])
Lf = sp.Rational(1, 2) * (I1 * w10**2 + I2 * w20**2 - (I1 + I2) * sol[wf]**2)
R.eq('d052.9', Lf, I1 * I2 / (2 * (I1 + I2)) * (w10 - w20)**2)
R.risultato('d052', sp.Sum(Cf1.subs(Kd, Kf), (j_, 1, i_)).doit(), i_ * f * N * rm)

# ---------------------------------------------------------------- d053 frizione conica (pp. 121–122)
a = sp.Symbol('alpha_c', positive=True)
Np = sp.Symbol("N'", positive=True)
sa, ca = sin(a), cos(a)
dAc = 2 * pi * r / sa  # area effettiva per unità di dr
R.eq('d053.1', sp.integrate(dAc, (r, ri, re)), pi * (re + ri) * (re - ri) / sa)
R.enunciato('d053.2')
# forza per unità d'area sul cono maschio che avanza lungo +z: normale (−sin α, cos α), attrito −f p (cos α, sin α)
pa = -(pp * (-sa) + (-f * pp * ca))
R.eq('d053.3', pa, pp * (sa + f * ca))
R.enunciato('d053.4', 'p = K/r (Reye)')
Nc = sp.integrate(Kd / r * (sa + f * ca) * dAc, (r, ri, re))
R.eq('d053.5', Nc, 2 * pi * Kd * (re - ri) * (sa + f * ca) / sa)
Kcn = sp.solve(sp.Eq(Nc, Np), Kd)[0]
R.eq('d053.6', Kcn / r, Np * sa / (2 * pi * r * (re - ri) * (sa + f * ca)))
Cc_ = sp.integrate(f * Kd / r * r * dAc, (r, ri, re))
R.eq('d053.7', Cc_, 2 * pi * f * Kd / sa * (re**2 - ri**2) / 2)
Cf588 = f * Np * (re + ri) / (2 * (sa + f * ca))
R.eq('d053.8', Cc_.subs(Kd, Kcn), Cf588)
R.eq('d053.9', sp.limit(Cf588, a, 0), Np * rm)
Ndis = sp.integrate(Kd / r * (sa - f * ca) * dAc, (r, ri, re)).subs(Kd, Kcn)
R.eq('d053.10', Ndis, Np * (sa - f * ca) / (sa + f * ca))
R.risultato('d053', Cc_.subs(Kd, Kcn), Cf588)

# ---------------------------------------------------------------- d054 frizione centrifuga (esterna)
m, rG, Fm, Rt, nc, wm, X = sp.symbols('m r_G F_m R_t n omega_m X', positive=True)
R.enunciato('d054.1')
R.enunciato('d054.2', 'forza d\'inerzia centrifuga')
ws = sp.solve(sp.Eq(m * rG * X**2 - Fm, 0), X)
check(len(ws) == 1, 'd054.3: una sola radice positiva')
ws = ws[0]
R.eq('d054.3', ws, sp.sqrt(Fm / (m * rG)))
FNc = sp.solve(sp.Eq(m * rG * wm**2 - Fm - X, 0), X)[0]
R.eq('d054.4', FNc, m * rG * (wm**2 - ws**2))
Cfc = nc * f * FNc * Rt
R.eq('d054.5', Cfc, nc * f * Rt * m * rG * (wm**2 - ws**2))
Kc_ = nc * f * m * rG * Rt
R.eq('d054.6', Cfc.subs(wm, 2 * ws), 3 * Kc_ * ws**2)
R.enunciato('d054.7')
R.risultato('d054', Cfc, Kc_ * (wm**2 - ws**2))

# ---------------------------------------------------------------- d051 partitore (deduzione da pp. 90–92)
M, g, l1, l2, hh, aa, beta = sp.symbols('M g l_1 l_2 h a beta', positive=True)
NA, NB, FTA, FTB = sp.symbols('N_A N_B F_TA F_TB')
Lp = l1 + l2
# x verso il posteriore: A in 0, G in (l1, h), B in (L, 0); inerzia −M·(+a) in avanti
mB = cross(V(-Lp, 0), V(0, NA)) + cross(V(l1 - Lp, hh), V(0, -M * g)) + cross(V(l1 - Lp, hh), V(-M * aa, 0))
sNA = sp.solve(sp.Eq(mB, 0), NA)[0]
sNB = sp.solve(sp.Eq(NA + NB - M * g, 0), NB)[0].subs(NA, sNA)
R.eq('d051.1', sNA + sNB - M * g, 0)
check(sp.simplify(mB - (-NA * Lp + M * g * l2 + M * aa * hh)) == 0, 'd051.2: momenti rispetto a B')
R.eq('d051.2', sNA, M * (g * l2 + aa * hh) / Lp)
R.eq('d051.3', sNB, M * (g * l1 - aa * hh) / Lp)
amax = sp.solve(sp.Eq(f * sNA + f * sNB - M * aa, 0), aa)
check(len(amax) == 1, 'd051.4: una soluzione')
R.eq('d051.4', amax[0], f * g)
R.eq('d051.5', sNA / sNB, (g * l2 + aa * hh) / (g * l1 - aa * hh))
bstar = (sNA / (M * g)).subs(aa, f * g)
R.eq('d051.6', bstar, (l2 + f * hh) / Lp)
aA = sp.solve(sp.Eq(beta * M * aa, f * sNA), aa)[0]
aB = sp.solve(sp.Eq((1 - beta) * M * aa, f * sNB), aa)[0]
check(sp.simplify(aA - f * g * l2 / (beta * Lp - f * hh)) == 0, 'd051.7: a_A')
check(sp.simplify(aA.subs(beta, bstar) - f * g) == 0 and sp.simplify(aB.subs(beta, bstar) - f * g) == 0, 'd051.7: con β* entrambi a f g')
R.eq('d051.7', aB, f * g * l1 / ((1 - beta) * Lp + f * hh))
R.enunciato('d051.8')
R.risultato('d051', sNA / sNB, (g * l2 + aa * hh) / (g * l1 - aa * hh))

R.salva()
