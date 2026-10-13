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

# ================================================================ c4-rapporto (pp. 131–139)
pos = dict(positive=True)
R1, R2, w1, w2, T1, T2, C1, C2, EA, V0, t = sp.symbols('R_1 R_2 omega_1 omega_2 T_1 T_2 C_1 C_2 EA V_0 t', **pos)

# ---- d055: cinematica della periferia, aderenza senza allungamento, equilibri delle pulegge
def velocita_periferica(Rp, wp):
    x, y = Rp * sp.cos(wp * t), Rp * sp.sin(wp * t)
    return sp.simplify(sp.sqrt(sp.diff(x, t) ** 2 + sp.diff(y, t) ** 2))
V1p = velocita_periferica(R1, w1)
w2s = sp.solve(sp.Eq(V1p, velocita_periferica(R2, w2)), w2)[0]  # stessa V su tutta la cinghia
C1s = sp.solve(sp.Eq(-T1 * R1 + C1 + T2 * R1, 0), C1)[0]  # II cardinale della motrice (bracci R₁)
C2s = sp.solve(sp.Eq(T1 * R2 - C2 - T2 * R2, 0), C2)[0]  # II cardinale della condotta
R.eq('d055.1', V1p, w1 * R1)
R.eq('d055.2', velocita_periferica(R2, w2s), V1p)
R.eq('d055.3', w1 * R1, w2s * R2)
R.eq('d055.4', w2s / w1, R1 / R2)
R.enunciato('d055.5')
R.eq('d055.6', C1s, (T1 - T2) * R1)
R.eq('d055.7', C2s, (T1 - T2) * R2)
R.eq('d055.8', C1s / C2s, w2s / w1)
R.risultato('d055', w2s / w1, C1s / C2s)

# ---- d056: accelerazione di un punto in moto circolare uniforme (posizione derivata due volte)
Rr_, Vb, m_, rho, dth = sp.symbols('R V m rho dtheta', **pos)
xx, yy = Rr_ * sp.cos(Vb * t / Rr_), Rr_ * sp.sin(Vb * t / Rr_)
an = sp.simplify(sp.sqrt(sp.diff(xx, t, 2) ** 2 + sp.diff(yy, t, 2) ** 2))
R.enunciato('d056.1')
R.enunciato('d056.2')
R.eq('d056.3', (Vb / Rr_) ** 2 * Rr_, an)
R.eq('d056.4', m_ * an, m_ * Vb ** 2 / Rr_)
R.enunciato('d056.5')
R.eq('d056.6', rho * Rr_ * dth * an, rho * Vb ** 2 * dth)
R.risultato('d056', an, Vb ** 2 / Rr_)

# ---- d058: T.F.V. del sistema; η definito come |C₂ω₂|/|C₁ω₁|
eta = sp.Symbol('eta', positive=True)
C2id = sp.solve(sp.Eq(C1 * w1 - C2 * w2s, 0), C2)[0]  # ideale, moduli
R.enunciato('d058.1')
R.eq('d058.2', C1 / C2id, w2s / w1)
R.eq('d058.3', C2id / C1, 1 / (w2s / w1))
etad = C2 * w2 / (C1 * w1)  # definizione (p. 135)
Wd = sp.solve(sp.Eq(C1 * w1 + (-C2) * w2 + sp.Symbol('W'), 0), sp.Symbol('W'))[0]  # bilancio con coppie algebriche
R.eq('d058.4', C1 * w1 + (-C2) * w2 + (-(1 - etad) * C1 * w1), 0)
R.eq('d058.5', Wd, -(1 - etad) * C1 * w1)
Calg = sp.solve(sp.Eq(eta * C1 * w1 + sp.Symbol('Ca') * w2, 0), sp.Symbol('Ca'))[0]
R.eq('d058.6', C1 / Calg, -(w2 / w1) / eta)
R.eq('d058.7', w2 / w1, etad * C1 / C2)
R.risultato('d058', w2 / w1, etad * C1 / C2)

# ---- d059: elementino, congruenza, Hooke, conservazione della massa
z, dz, w0, eps0, Tt = sp.symbols('z dz w_0 epsilon_0 T', **pos)
wf = sp.Function('w')
dl_gen = (wf(z + dz) + z + dz) - (wf(z) + z)
R.eq('d059.1', dl_gen, dz + (wf(z + dz) - wf(z)))
wl = w0 + eps0 * z  # campo di spostamento di un tratto a tensione uniforme
R.eq('d059.2', (wl.subs(z, z + dz) - wl) / dz, sp.diff(wl, z))
R.enunciato('d059.3')
eps_T = sp.solve(sp.Eq(Tt, EA * sp.Symbol('e')), sp.Symbol('e'))[0]  # Hooke
dl = dl_gen.subs(wf(z + dz), wl.subs(z, z + dz)).subs(wf(z), wl).subs(eps0, eps_T)
R.eq('d059.4', dl, dz * (1 + Tt / EA))
Vt = sp.simplify(dl / (dz / V0))  # nello stesso dt passa la stessa lunghezza indeformata dz
R.eq('d059.5', Vt, V0 * (1 + Tt / EA))
R.eq('d059.6', Vt.subs(Tt, T1) / Vt.subs(Tt, T2), (1 + T1 / EA) / (1 + T2 / EA))
R.eq('d059.7', Vt.subs(Tt, T1) / (1 + T1 / EA), Vt.subs(Tt, T2) / (1 + T2 / EA))
R.risultato('d059', Vt, V0 * (1 + Tt / EA))

# ---- d060: aderenza all'ingresso (motrice col teso, condotta col lasco)
Vf = lambda T: Vt.subs(Tt, T)
V0s = sp.solve(sp.Eq(w1 * R1, Vf(T1)), V0)[0]
w2c = sp.solve(sp.Eq(w2 * R2, Vf(T2).subs(V0, V0s)), w2)[0]
tau = w2c / w1
R.eq('d060.1', w1 * R1, Vf(T1).subs(V0, V0s))
R.eq('d060.2', w2c * R2, Vf(T2).subs(V0, V0s))
R.eq('d060.3', tau, R1 / R2 * (1 + T2 / EA) / (1 + T1 / EA))
R.eq('d060.4', tau.subs(T1, T2), R1 / R2)
R.eq('d060.5', (tau / (R1 / R2)).subs(T1, T2 + C1 / R1), 1 - C1 / (R1 * (EA + T2 + C1 / R1)))
R.eq('d060.6', sp.limit(tau, EA, sp.oo), R1 / R2)
R.enunciato('d060.7')
R.risultato('d060', tau, R1 / R2 * (1 + T2 / EA) / (1 + T1 / EA))

# ---- d061: rendimento con le coppie dall'equilibrio e le velocità del modello elastico
eta61 = C2s * w2c / (C1s * w1)
R.enunciato('d061.1')
R.eq('d061.2', tau, eta61 * C1s / C2s)
R.eq('d061.3', C1s / C2s, R1 / R2)
R.eq('d061.4', eta61, (w2c * R2) / (w1 * R1))
R.eq('d061.5', eta61, (1 + T2 / EA) / (1 + T1 / EA))
R.eq('d061.6', C1s * w1 - C2s * w2c, (T1 - T2) * (w1 * R1 - w2c * R2))
R.eq('d061.7', -(C1s * w1 - C2s * w2c), -(1 - eta61) * C1s * w1)
R.risultato('d061', eta61, (1 + T2 / EA) / (1 + T1 / EA))

# ---- d137: tangenti comuni (fonte esterna). O₁ = (0,0), O₂ = (a,0); n normale unitaria del ramo superiore
aa, g = sp.symbols('a gamma', positive=True)
n_ap = sp.Matrix([-sp.sin(g), sp.cos(g)])  # aperta: entrambe le pulegge dalla stessa parte del ramo
O2 = sp.Matrix([aa, 0])
# distanze con segno −R₁, −R₂ dalla retta; ramo superiore: n_y = cos γ > 0
g_ap = [s_ for s_ in sp.solve(sp.Eq(n_ap.dot(O2) - R1, -R2), g) if sp.cos(s_).subs({R1: 1, R2: 2, aa: 5}) > 0][0]
phi1 = sp.pi / 2 + g  # direzione di n = (cos φ₁, sin φ₁)
R.eq('d137.1', (2 * sp.pi - 2 * phi1) + 2 * phi1, 2 * sp.pi)
R.enunciato('d137.2')
R.eq('d137.3', sp.sin(g_ap), (R2 - R1) / aa)
R.eq('d137.4', (2 * sp.pi - 2 * phi1).subs(g, g_ap), sp.pi - 2 * sp.asin((R2 - R1) / aa))
P1 = R1 * n_ap
P2 = O2 + R2 * n_ap
Lr = sp.sqrt(((P2 - P1).T * (P2 - P1))[0]).subs(g, g_ap)
R.eq('d137.5', sp.simplify(Lr ** 2), aa ** 2 - (R2 - R1) ** 2)
n_cr = sp.Matrix([sp.sin(g), sp.cos(g)])  # incrociata: O₁ sotto il ramo, O₂ sopra
g_cr = [s_ for s_ in sp.solve(sp.Eq(n_cr.dot(O2) - R1, R2), g) if sp.cos(s_).subs({R1: 1, R2: 2, aa: 5}) > 0][0]
R.eq('d137.6', (2 * sp.pi - 2 * (sp.pi / 2 - g)).subs(g, g_cr), sp.pi + 2 * sp.asin((R1 + R2) / aa))
R.risultato('d137', sp.sin(g_ap), (R2 - R1) / aa)

# ================================================================ c4-eulero (pp. 140–151)
f_, p_, d_, th_, h_, bt = sp.symbols('f p d theta h beta', positive=True)  # p = ρV², d = T₂ − ρV² > 0
Tf = sp.Function('T')

# ---- d057: concio, forza centrifuga, equilibrio radiale
dm = rho * Rr_ * dth
dFc = dm * an.subs({Rr_: Rr_})
R.eq('d057.1', dm, rho * Rr_ * dth)
R.eq('d057.2', dFc, rho * Vb ** 2 * dth)
R.eq('d057.3', sp.limit(2 * Tt * sp.sin(h_ / 2) / h_, h_, 0), Tt)
dFN = sp.solve(sp.Eq(-Tt * dth + sp.Symbol('N') + dFc, 0), sp.Symbol('N'))[0]
R.eq('d057.4', dFN, (Tt - rho * Vb ** 2) * dth)
Vlim = sp.solve(sp.Eq(dFN.subs(Tt, T2), 0), Vb)[0]
R.eq('d057.5', rho * Vlim ** 2, T2)
R.risultato('d057', dFN, (Tt - rho * Vb ** 2) * dth)

# ---- d062: equilibrio del concio con T(θ) generica, limite dθ → 0 (serie), Coulomb al limite
R.enunciato('d062.1')
R.enunciato('d062.2')
R.eq('d062.3', rho * Rr_ * h_ * Vb ** 2 / Rr_ / h_, rho * Vb ** 2)
qT = sp.series((Tf(th_ + h_) - Tf(th_)) * sp.cos(h_ / 2) / h_, h_, 0, 1).removeO().doit()  # tangenziale per unità di dθ
R.eq('d062.4', Tf(th_).diff(th_), qT)
qR = sp.series((Tf(th_ + h_) + Tf(th_)) * sp.sin(h_ / 2) / h_, h_, 0, 1).removeO().doit()  # radiale delle tensioni
R.eq('d062.5', qR, Tf(th_))
qN = sp.solve(sp.Eq(-qR + sp.Symbol('qN') + rho * Vb ** 2, 0), sp.Symbol('qN'))[0]
R.eq('d062.6', qN, Tf(th_) - rho * Vb ** 2)
sol62 = sp.dsolve(sp.Eq(Tf(th_).diff(th_), f_ * qN), Tf(th_), ics={Tf(0): T2}).rhs
R.eq('d062.7', sol62.diff(th_), f_ * (sol62 - rho * Vb ** 2))
R.risultato('d062', sol62.diff(th_), f_ * (sol62 - rho * Vb ** 2))

# ---- d063: integrazione (T₂ = p + d con d > 0: contatto)
sol = sp.dsolve(sp.Eq(Tf(th_).diff(th_), f_ * (Tf(th_) - p_)), Tf(th_), ics={Tf(0): p_ + d_}).rhs
u = sp.Symbol('u', positive=True)
R.enunciato('d063.1')
R.eq('d063.2', sol.diff(th_) / (sol - p_), f_)
Ileft = sp.integrate(1 / u, (u, d_, sol - p_))  # ∫ dT/(T − ρV²) da T₂ a T, con T − ρV² = u > 0
R.eq('d063.3', sp.expand_log(sp.log(sol - p_), force=True), f_ * th_ + sp.log(d_), note='ln|T−ρV²| = fθ + K')
R.eq('d063.3', sp.expand_log(Ileft, force=True), f_ * th_)
cc = sp.Symbol('c', positive=True)
R.eq('d063.4', sol - p_, sp.exp(sp.log(d_)) * sp.exp(f_ * th_))
R.eq('d063.5', sp.solve(sp.Eq(p_ + d_ - p_, cc * sp.exp(f_ * 0)), cc)[0], (p_ + d_) - p_)
R.eq('d063.6', (sol - p_) / ((p_ + d_) - p_), sp.exp(f_ * th_))
ts = sp.Symbol('theta_s', positive=True)
R.eq('d063.7', (sol.subs(th_, ts) - p_) / d_, sp.exp(f_ * ts))
soln = sp.dsolve(sp.Eq(Tf(th_).diff(th_), f_ * Tf(th_)), Tf(th_), ics={Tf(0): T2}).rhs
R.eq('d063.8', soln.subs(th_, bt) / T2, sp.exp(f_ * bt))
R.risultato('d063', (sol - p_) / d_, sp.exp(f_ * th_))

# ---- d064: legge a tratti, velocità relativa, pressione, coppia dall'attrito
T2e = p_ + d_
thS = sp.solve(sp.Eq(sol.subs(th_, sp.Symbol('x')), T1), sp.Symbol('x'))[0]  # fine dello scorrimento: T = T₁
R.enunciato('d064.1')
R.eq('d064.2', sol, p_ + (T2e - p_) * sp.exp(f_ * th_))
R.eq('d064.3', sol.subs(th_, thS), T1)
R.enunciato('d064.4')
R.enunciato('d064.5')
R.eq('d064.6', Vf(sol) / Vf(T1), (1 + sol / EA) / (1 + T1 / EA))
R.eq('d064.7', qN.subs({Tf(th_): sol, rho: p_ / Vb ** 2}), (T2e - p_) * sp.exp(f_ * th_))
Rr = sp.Symbol('R', positive=True)
R.eq('d064.8', Rr * sp.integrate(f_ * (sol - p_), (th_, 0, thS)), (T1 - T2e) * Rr)
R.risultato('d064', sol, p_ + (T2e - p_) * sp.exp(f_ * th_))

# ---- d065: arco di scorrimento
Cc = sp.Symbol('C', positive=True)
R.eq('d065.1', thS + (bt - thS), bt)
R.eq('d065.2', thS, sp.log((T1 - p_) / (T2e - p_)) / f_)
thC = thS.subs(T1, T2e + Cc / Rr)  # T₁ dalla coppia, C = (T₁ − T₂)R
R.eq('d065.3', thC, sp.log(1 + Cc / (Rr * (T2e - p_))) / f_)
R.eq('d065.4', thC.subs(Cc, 0), 0)
Cmax = (sol.subs(th_, bt) - T2e) * Rr
R.eq('d065.5', sp.expand_log(thC.subs(Cc, Cmax), force=True), bt)
R.enunciato('d065.6')
R.risultato('d065', thS, sp.log((T1 - p_) / (T2e - p_)) / f_)

# ---- d066: coppia massima (θ* = β), T₂ e ρV² indipendenti
solT = sp.dsolve(sp.Eq(Tf(th_).diff(th_), f_ * (Tf(th_) - p_)), Tf(th_), ics={Tf(0): T2}).rhs
T1b = solT.subs(th_, bt)
Cm = (T1b - T2) * Rr
R.enunciato('d066.1')
R.eq('d066.2', T1b - p_, sp.exp(f_ * bt) * (T2 - p_))
R.eq('d066.3', T1b - T2, (T2 - p_) * (sp.exp(f_ * bt) - 1))
R.eq('d066.4', Cm, (T2 - p_) * (sp.exp(f_ * bt) - 1) * Rr)
R.eq('d066.5', Cm.subs(p_, 0), T2 * (sp.exp(f_ * bt) - 1) * Rr)
R.eq('d066.6', sp.diff(Cm, p_), -(sp.exp(f_ * bt) - 1) * Rr)
R.risultato('d066', Cm, (T2 - p_) * (sp.exp(f_ * bt) - 1) * Rr)

# ---- d067: puleggia limitante; tre pulegge
f1, f2, b1, dl_ = sp.symbols('f_1 f_2 beta_1 delta', positive=True)
rr = (T1 - p_) / (T2e - p_)
th1, th2 = sp.log(rr) / f1, sp.log(rr) / f2
R.eq('d067.1', th1.subs(f1, f_), th2.subs(f2, f_))
CmB = lambda b: (solT.subs(th_, b) - T2) * Rr
R.eq('d067.2', CmB(b1 + dl_) - CmB(b1), (T2 - p_) * Rr * sp.exp(f_ * b1) * (sp.exp(f_ * dl_) - 1))  # C_MAX cresce con β: limita β_min
R.enunciato('d067.3')
R.eq('d067.4', f1 * th1, f2 * th2)
a1, a2, a3 = sp.symbols('a_1 a_2 a_3', positive=True)  # T'' = p + a1, T''' = p + a1 + a2, T' = p + a1 + a2 + a3
Tm_, Ti_, TM_ = p_ + a1, p_ + a1 + a2, p_ + a1 + a2 + a3
X = sp.Symbol('X')
C1t = sp.solve(sp.Eq(TM_ * Rr - Tm_ * Rr - X, 0), X)[0]  # puleggia 1 (p. 150)
C3t = sp.solve(sp.Eq(Tm_ * Rr + X - Ti_ * Rr, 0), X)[0]  # puleggia 3
C2t = sp.solve(sp.Eq(X + Ti_ * Rr - TM_ * Rr, 0), X)[0]  # puleggia 2
R.eq('d067.5', C1t, C2t + C3t)
t1 = sp.log((TM_ - p_) / (Tm_ - p_)) / f_
t2 = sp.log((TM_ - p_) / (Ti_ - p_)) / f_
t3 = sp.log((Ti_ - p_) / (Tm_ - p_)) / f_
R.eq('d067.6', sp.expand_log(t1, force=True), sp.expand_log(t2 + t3, force=True))
R.enunciato('d067.7')
R.risultato('d067', f1 * th1, f2 * th2)

# ================================================================ c4-velocita-ottima (pp. 143, 148, 152, 154)
A_, Fp, al, Tamm = sp.symbols('A F_p alpha T_amm', positive=True)

# ---- d068: tensione massima, tenditore lasco/teso, resistenza
T1c = sp.solve(sp.Eq(Cc, (T1 - T2) * Rr), T1)[0]
R.eq('d068.1', T1c, T2 + Cc / Rr)
thSg = sp.solve(sp.Eq(solT.subs(th_, sp.Symbol('x')), T1c), sp.Symbol('x'))[0]
R.eq('d068.2', solT.subs(th_, thSg), T1c)  # la legge crescente arriva a T₁ e poi resta costante: massimo = T₁
T2rullo = sp.solve(sp.Eq(Fp, 2 * T2 * sp.sin(al / 2)), T2)[0]  # equilibrio del rullo tenditore (p. 148)
R.eq('d068.3', T1c.subs(T2, T2rullo), Fp / (2 * sp.sin(al / 2)) + Cc / Rr)
Cl = (solT.subs({T2: A_, th_: bt}) - A_) * Rr
R.eq('d068.4', Cl, (A_ - p_) * (sp.exp(f_ * bt) - 1) * Rr)
T2t = sp.solve(sp.Eq(solT.subs({T2: X, th_: bt}), A_), X)[0]  # tenditore sul teso: T₁ = A
Ct = (A_ - T2t) * Rr
R.eq('d068.5', Ct, (A_ - p_) * (1 - 1 / sp.exp(f_ * bt)) * Rr)
R.eq('d068.6', Cl / Ct, sp.exp(f_ * bt))
R.eq('d068.7', ((T1 - T2) * Rr).subs(T1, Tamm), (Tamm - T2) * Rr)
R.enunciato('d068.8')
R.risultato('d068', T1c, T2 + Cc / Rr)

# ---- d069: potenza
om = Vb / Rr
R.enunciato('d069.1')
R.eq('d069.2', ((T1 - T2) * Rr) * om, (T1 - T2) * Vb)
Cth = (solT.subs(th_, ts) - T2) * Rr
W69 = (Cth * om).subs(p_, rho * Vb ** 2)
R.eq('d069.3', W69, (sp.exp(f_ * ts) - 1) * (T2 - rho * Vb ** 2) * Vb)
R.eq('d069.4', W69, (sp.exp(f_ * ts) - 1) * (T2 * Vb - rho * Vb ** 3))
Vz = sp.solve(sp.Eq(T2 - rho * Vb ** 2, 0), Vb)[0]
R.eq('d069.5', rho * Vz ** 2, T2)
R.eq('d069.6', om * Rr, Vb)
R.risultato('d069', W69, (sp.exp(f_ * ts) - 1) * (T2 - rho * Vb ** 2) * Vb)

# ---- d070: massimo di W(V), modello della dispensa (T₂ fissata) e variante (T₁ = T_max, fonte esterna)
Tmax = sp.Symbol('T_max', positive=True)
k = sp.exp(f_ * bt) - 1
W = ((solT.subs(th_, bt) - T2) * Rr * om).subs(p_, rho * Vb ** 2)
R.enunciato('d070.1')
R.eq('d070.2', W, k * (T2 * Vb - rho * Vb ** 3))
dW = sp.diff(W, Vb)
R.eq('d070.3', dW, k * (T2 - 3 * rho * Vb ** 2))
Vs = sp.solve(sp.Eq(dW, 0), Vb)[0]
R.eq('d070.4', 3 * rho * Vs ** 2, T2)
R.eq('d070.5', sp.diff(W, Vb, 2).subs(Vb, Vs), -6 * k * rho * Vs)
Vz0 = [r_ for r_ in sp.solve(sp.Eq(W, 0), Vb) if r_ != 0][0]
R.eq('d070.6', Vz0 / Vs, sp.sqrt(3))
R.eq('d070.7', W.subs(Vb, Vs), sp.Rational(2, 3) * k * T2 * sp.sqrt(T2 / (3 * rho)))
R.eq('d070.8', solT.subs({th_: bt, p_: rho * Vs ** 2}), T2 / 3 * (1 + 2 * sp.exp(f_ * bt)))
T2v = sp.solve(sp.Eq(solT.subs({T2: X, th_: bt, p_: rho * Vb ** 2}), Tmax), X)[0]
R.eq('d070.9', T2v - rho * Vb ** 2, (Tmax - rho * Vb ** 2) * sp.exp(-f_ * bt))
Wv = (Tmax - T2v) * Vb
R.eq('d070.10', Wv, (Tmax - rho * Vb ** 2) * (1 - sp.exp(-f_ * bt)) * Vb)
Vv = sp.solve(sp.Eq(sp.diff(Wv, Vb), 0), Vb)[0]
R.eq('d070.11', 3 * rho * Vv ** 2, Tmax)
R.eq('d070.12', Wv.subs(Vb, Vv), sp.Rational(2, 3) * Tmax * (1 - sp.exp(-f_ * bt)) * sp.sqrt(Tmax / (3 * rho)))
R.risultato('d070', Vs, sp.sqrt(T2 / (3 * rho)))

R.salva()
