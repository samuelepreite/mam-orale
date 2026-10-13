"""Verifica simbolica del capitolo C5, parte b (rotismi epicicloidali, rendimenti, elicoidali, coniche).

Il modello è ricostruito dai principi, indipendentemente dal codice TS:
 - epicicloidali: vincoli di rotolamento senza strisciamento nei contatti (velocità dei punti di contatto uguali sui due
   membri), risolti con solve; coppie da equilibrio + bilancio delle potenze;
 - rendimenti: bilanci delle potenze con le perdite (definizione η = −W_u/W_m), risolti con solve;
 - elicoidali: elica parametrica (derivate), sezione del cilindro con il piano normale e curvatura, forze come vettori;
 - coniche: geometria vettoriale dei coni (prodotti vettoriali per raggi e momenti).
"""
from comune import Registro, sp

R = Registro('C5B')
pos = dict(positive=True)

# ====================================================================== d089 Willis (Fig. 5-47 a, satellite doppio 3–4)
w1, W, R1, R3, R4, m = sp.symbols('omega1 Omega R1 R3 R4 m', **pos)
R2 = R1 + R3 - R4                      # coassialità: stesso interasse a = R1 + R3 = R2 + R4
a = R1 + R3
w2, w3 = sp.symbols('omega2 omega3')
# rotolamento: punto di contatto 1–3 (raggio R1 dall'asse) e 4–2 (raggio R2), satellite 3 = 4 solidali
sol = sp.solve([sp.Eq(w1 * R1, W * a - w3 * R3), sp.Eq(w2 * R2, W * a - w3 * R4)], [w2, w3], dict=True)[0]
W2, W3 = sol[w2], sol[w3]
R.eq('d089.1', w1, (w1 - W) + W)
# nel moto relativo il portatreno è fermo e i vincoli sono quelli di un ordinario (contatto 1–3 a velocità relative)
R.eq('d089.2', (w1 - W) * R1, -(W3 - W) * R3)
tauW = (W2 - W) / (w1 - W)
R.eq('d089.3', tauW, (W2 - W) / (w1 - W))
R.enunciato('d089.4', 'una equazione in tre incognite: 2 g.d.l.')
z1, z2, z3, z4 = [2 * x / m for x in (R1, R2, R3, R4)]
R.eq('d089.5', tauW, (z1 / z3) * (z4 / z2))
R.eq('d089.6', z1 + z3, z2 + z4)
# riduttore di p. 175: solare r, satellite r (R2 = R1), corona 3r ferma
r, ws2, Ws = sp.symbols('r omega_s2 Omega_s')
s175 = sp.solve([sp.Eq(w1 * r, Ws * 2 * r - ws2 * r), sp.Eq(0 * 3 * r, Ws * 2 * r + ws2 * r)], [Ws, ws2], dict=True)[0]
R.eq('d089.7', s175[Ws], w1 / 4)
tc = sp.Rational(-1, 3)
R.eq('d089.7', s175[Ws], w1 * tc / (tc - 1))
R.risultato('d089', W2 - W, tauW * (w1 - W))

# ====================================================================== d090 velocità del satellite (p. 175, R1, R2 generici)
r1, r2, w1p, w3p = sp.symbols('r1 r2 omega1 omega3', **pos)
r3 = r1 + 2 * r2
Wc, wc2, wc3 = sp.symbols('W_c w_c2 w_c3')


def planetario(om1, om3):
    """rotolamento nei contatti solare–satellite (raggio r1) e satellite–corona (raggio r3)"""
    s = sp.solve([sp.Eq(om1 * r1, Wc * (r1 + r2) - wc2 * r2), sp.Eq(om3 * r3, Wc * (r1 + r2) + wc2 * r2)], [Wc, wc2], dict=True)[0]
    return s[Wc], s[wc2]


Wa, w2a = planetario(w1p, 0)          # corona fissa
R.enunciato('d090.1', 'corona ferma: il contatto C23 ha velocità nulla, CIR del satellite')
# velocità del punto C23 del satellite: nulla (controllo del CIR)
assert sp.simplify(Wa * (r1 + r2) + w2a * r2) == 0
R.eq('d090.2', w1p * r1, (-w2a) * 2 * r2)
R.eq('d090.3', -w2a, w1p * r1 / (2 * r2))
R.eq('d090.4', Wa * (r1 + r2), (-w2a) * r2)
R.eq('d090.5', Wa, w1p * r1 / (2 * (r1 + r2)))
R.eq('d090.5', Wa.subs(r2, r1), w1p / 4)
R.eq('d090.6', (w2a - Wa) / (w1p - Wa), -r1 / r2)
R.eq('d090.6', w2a, Wa - (r1 / r2) * (w1p - Wa))
Wb, w2b = planetario(0, w3p)          # solare fisso
R.eq('d090.7', Wb, w3p * r3 / (2 * (r1 + r2)))
R.eq('d090.7', w2b * 2 * r2, w3p * r3)
R.eq('d090.7', Wb.subs(r2, r1), sp.Rational(3, 4) * w3p)
Wg, w2g = planetario(w1p, sp.Symbol('omega3g'))
R.risultato('d090', w2g, Wg - (r1 / r2) * (w1p - Wg))

# ====================================================================== d091 coppie (p. 179)
tW = sp.Symbol('tau_W')
C1, C2, Cp = sp.symbols('C1 C2 C_p')
w2w = W + tW * (w1 - W)                 # Willis
sc = sp.solve([sp.Eq(C1 + C2 + Cp, 0), sp.Eq(C1 * w1 + C2 * w2w + Cp * W, 0)], [C2, Cp], dict=True)[0]
C2s, Cps = sc[C2], sc[Cp]
R.eq('d091.1', C1 + C2s + Cps, 0)
R.eq('d091.2', C1 * w1 + C2s * w2w + Cps * W, 0)
R.eq('d091.3', C1 * (w1 - W) + C2s * (w2w - W), 0)
R.eq('d091.4', C1 / C2s, -tW)
R.eq('d091.5', C1 * (w1 - W) + C2s * (w2w - W) + Cps * (W - W), 0)
R.eq('d091.6', Cps / C1, (1 - tW) / tW)
R.enunciato('d091.7', 'i rapporti non contengono velocità')
assert all(sp.simplify(sp.diff(e, x)) == 0 for e in (C2s / C1, Cps / C1) for x in (w1, W))
R.risultato('d091', C1 / C2s, -tW)

# ====================================================================== d092 rendimento dell'ingranaggio e cascata (pp. 181, 184)
t, e1 = sp.symbols('t eta1', **pos)
tau = -t                                # cilindrico esterno
om1, Cm, wm = sp.symbols('omega1 C_m omega_m', **pos)
om2 = tau * om1
C2x = sp.Symbol('C2x')
C2v = sp.solve(sp.Eq(e1, -C2x * om2 / (C1 * om1)), C2x)[0]   # definizione η = −W_u/W_m con 1 movente
Wm_, Wu_ = C1 * om1, C2v * om2
Wd_ = -(Wm_ + Wu_)                      # bilancio W_m + W_u + W_diss = 0
R.eq('d092.1', Wm_ + Wu_ + Wd_, 0)
R.eq('d092.2', e1, -(C2v / C1) * tau)
R.eq('d092.3', C1 / C2v, -tau / e1)
R.eq('d092.4', Wd_, -(1 - e1) * C1 * om1)
R.eq('d092.5', sp.Abs(C1 / C2v).subs(C1, 1), (t / e1))
eI, eII, eIII = sp.symbols('eta_I eta_II eta_III', **pos)
t1, t2, t3 = sp.symbols('t1 t2 t3')
X = sp.Symbol('X')
wu1 = t1 * wm
Cu1 = sp.solve(sp.Eq(eI * Cm * wm + X * wu1, 0), X)[0]          # S1
wm1, Cm1 = wu1, -Cu1                                            # azione e reazione sull'albero
wu2 = t2 * wm1
Cu2 = sp.solve(sp.Eq(eII * Cm1 * wm1 + X * wu2, 0), X)[0]       # S2
wm2, Cm2 = wu2, -Cu2
wu = t3 * wm2
Cu = sp.solve(sp.Eq(eIII * Cm2 * wm2 + X * wu, 0), X)[0]        # S3
R.eq('d092.6', eI * Cm * wm + Cu1 * wu1, 0)
R.eq('d092.7', Cm1 * wm1, -Cu1 * wu1)
R.eq('d092.8', eI * eII * Cm * wm, Cm2 * wm2)
R.eq('d092.9', eI * eII * eIII * Cm * wm + Cu * wu, 0)
R.eq('d092.10', -(Cu * wu) / (Cm * wm), eI * eII * eIII)
R.risultato('d092', -(Cu * wu) / (Cm * wm), eI * eII * eIII)

# ====================================================================== d093 rendimento dell'epicicloidale (fonte esterna)
eo = sp.Symbol('eta_o', positive=True)
C3x, Cpx = sp.symbols('C3x Cpx')
# caso 1: solare 3 fisso, Willis τ_W(ω1 − Ω) = 0 − Ω
W1 = sp.solve(sp.Eq(tW * (w1 - X), 0 - X), X)[0]
WdM = -(1 - eo) * C1 * (w1 - W1)        # nel moto relativo 1 è movente: perdita sulla sua potenza relativa
C3v = sp.solve(sp.Eq(C1 * (w1 - W1) + C3x * (0 - W1) + WdM, 0), C3x)[0]   # bilancio relativo (portatreno fermo)
Cpv = -(C1 + C3v)                       # equilibrio
etaE = -Cpv * W1 / (C1 * w1)
WdF = -(C1 * w1 + Cpv * W1)             # bilancio assoluto: perdita vista da fermo
R.enunciato('d093.1', 'la potenza dissipata dipende dagli strisciamenti relativi')
R.eq('d093.2', WdF, -(1 - etaE) * C1 * w1)
R.eq('d093.2', WdF, WdM)                # le due perdite coincidono davvero nel modello
R.eq('d093.3', C1 * (w1 - W1) + C3v * (0 - W1) + WdM, 0)
R.eq('d093.4', (1 - etaE) * w1, (1 - eo) * (w1 - W1))
R.eq('d093.5', 1 - W1 / w1, -1 / (tW - 1))
R.eq('d093.6', etaE, (tW - eo) / (tW - 1))
R.eq('d093.7', etaE.subs({tW: sp.Rational(-1, 3), eo: sp.Rational(98, 100)}), sp.Rational(985, 1000))
# caso 2: nel moto relativo 1 è cedente, movente il solare fisso
C3w = sp.solve(sp.Eq(eo * C3x * (0 - W1) + C1 * (w1 - W1), 0), C3x)[0]
WdM2 = -(1 - eo) * C3w * (0 - W1)
R.eq('d093.8', WdM2, (1 - eo) / eo * C1 * (w1 - W1))
Cpw = -(C1 + C3w)
# il bilancio relativo con la perdita deve tornare: C1(ω1−Ω) + C3(0−Ω) + W_d = 0
assert sp.simplify(C1 * (w1 - W1) + C3w * (0 - W1) + WdM2) == 0
etaE2 = -Cpw * W1 / (C1 * w1)
R.eq('d093.8', etaE2, (eo * tW - 1) / (eo * (tW - 1)))
R.enunciato('d093.9', 'segno delle formule: η ≤ 0 ⇒ moto impossibile')
R.risultato('d093', etaE, (tW - eo) / (tW - 1))

# ====================================================================== d094 rotismo combinato (p. 180)
mz = sp.Symbol('m_z', positive=True)
Z1, Z2, Z4, Z5, Z6, Z7, Z8, w5, C5 = sp.symbols('z1 z2 z4 z5 z6 z7 z8 omega5 C5', **pos)
Z3 = Z1 + Z2 - Z4                        # stesso modulo: z1 + z2 = z3 + z4
Rr = {k: mz * v / 2 for k, v in dict(r1=Z1, r2=Z2, r3=Z3, r4=Z4, r5=Z5, r6=Z6, r7=Z7, r8=Z8).items()}
o6, oW, o2, o7 = sp.symbols('o6 oW o2 o7')
eqs = [
    sp.Eq(w5 * Rr['r5'], -o6 * Rr['r6']),                                    # 5–6 esterno
    sp.Eq(o6 * Rr['r1'], oW * (Rr['r1'] + Rr['r2']) - o2 * Rr['r2']),         # 1–2 (ω1 = ω6)
    sp.Eq(0 * Rr['r4'], oW * (Rr['r3'] + Rr['r4']) - o2 * Rr['r3']),          # 3–4 (ω3 = ω2, ω4 = 0)
    sp.Eq(oW * Rr['r8'], -o7 * Rr['r7']),                                    # 8–7 esterno (ω8 = Ω)
]
sk = sp.solve(eqs, [o6, oW, o2, o7], dict=True)[0]
O6, OW, O7 = sk[o6], sk[oW], sk[o7]
O1 = O6
tWc = (0 - OW) / (O1 - OW)
R.eq('d094.1', 2 * 1 + 2 - 3, 1)
R.enunciato('d094.2', 'vincoli')
R.eq('d094.3', O6 / w5, -Z5 / Z6)
R.eq('d094.4', OW / O1, tWc / (tWc - 1))
R.eq('d094.5', tWc, Z1 * Z3 / (Z2 * Z4))
R.eq('d094.6', O7 / OW, -Z8 / Z7)
R.eq('d094.7', O7 / w5, (Z5 * Z8) / (Z6 * Z7) * tWc / (tWc - 1))
C7 = sp.solve(sp.Eq(C5 * w5 + X * O7, 0), X)[0]
R.eq('d094.8', C7 / C5, -1 / (O7 / w5))
C56 = sp.solve(sp.Eq(C5 * w5 + X * O6, 0), X)[0]    # ordinario in entrata: coppia su 6 dal lato epicicloidale
C61 = -C56                                          # azione e reazione sull'albero 6 = 1
C4s, C8s = sp.symbols('C4s C8s')
sr = sp.solve([sp.Eq(C61 + C8s + C4s, 0), sp.Eq(C61 * O1 + C8s * OW + C4s * 0, 0)], [C4s, C8s], dict=True)[0]
R.eq('d094.9', C61 + sr[C8s] + sr[C4s], 0)
R.eq('d094.10', sr[C4s], -C61 / tWc)
R.eq('d094.10', sr[C8s], C61 * (1 - tWc) / tWc)
# coerenza con l'ordinario in uscita: (−C8p)Ω + C7ω7 = 0
assert sp.simplify(-sr[C8s] * OW + C7 * O7) == 0
R.risultato('d094', O7 / w5, (Z5 * Z8) / (Z6 * Z7) * (Z1 * Z3 / (Z2 * Z4)) / (Z1 * Z3 / (Z2 * Z4) - 1))

# ====================================================================== d095 geometria delle elicoidali (pp. 185–186)
Rp, Pe, th, al, P = sp.symbols('R P_e theta alpha P', **pos)
ph = sp.Symbol('phi')


def tg_elica(rho):
    """tangente dell'angolo fra l'elica x = ρcosφ, y = ρsinφ, z = P_eφ/2π e l'asse z"""
    c = sp.Matrix([rho * sp.cos(ph), rho * sp.sin(ph), Pe * ph / (2 * sp.pi)])
    d = c.diff(ph)
    return sp.simplify(sp.sqrt(d[0] ** 2 + d[1] ** 2) / d[2])


rho_ = sp.Symbol('rho', positive=True)
tg_r = tg_elica(rho_)                            # 2πρ/P_e per ogni cilindro di raggio ρ
tga = tg_r.subs(rho_, Rp)
Rf = Rp * sp.cos(th)                             # cilindro fondamentale
tgb = tg_r.subs(rho_, Rf)
R2b = sp.Symbol('R_2', positive=True)
R.eq('d095.1', Rp / R2b, (2 * sp.pi * Rp / P) / (2 * sp.pi * R2b / P))
R.eq('d095.2', tga, 2 * sp.pi * Rp / Pe)
R.eq('d095.3', tgb, 2 * sp.pi * Rf / Pe)
alpha_from = sp.atan(2 * sp.pi * Rp / Pe)       # α definito dalla geometria
R.eq('d095.4', tgb, sp.tan(alpha_from) * sp.cos(th))
# passo normale: distanza fra due denti della dentiera inclinati di α sull'asse, distanti P in direzione frontale
d_dir = sp.Matrix([sp.sin(al), sp.cos(al)])       # (frontale, assiale)
off = sp.Matrix([P, 0])
Pm = -(d_dir[0] * off[1] - d_dir[1] * off[0])   # |d × off| con 0 < α < 90°: distanza fra le due rette
R.eq('d095.5', Pm, P * sp.cos(al))
R.eq('d095.6', Pm / sp.pi, (P / sp.pi) * sp.cos(al))
XY = sp.Symbol('XY', positive=True)
YZ = XY * sp.tan(th)
YT = YZ * sp.cos(al)                             # proiezione sul piano normale
R.eq('d095.7', YT / XY, sp.tan(th) * sp.cos(al))
R.risultato('d095', tgb, sp.tan(alpha_from) * sp.cos(th))

# ====================================================================== d139 denti in presa (p. 187)
bb, dl, be = sp.symbols('b delta beta', **pos)
y0, xx = sp.symbols('y0 x')
# la retta y = y0 + x tg β tocca il rettangolo [0,b]×[0,δ] per y0 ∈ [−b tg β, δ]
y_lo = sp.solve(sp.Eq(y0 + bb * sp.tan(be), 0), y0)[0]   # ultima: esce dal vertice K (b, 0)
y_hi = dl                                                # prima: entra dal vertice H (0, δ)
CK = (0 + bb * sp.tan(be)) - 0                           # retta da M(0,0): quota in x = b
dE = y_hi - y_lo
R.eq('d139.1', dl / (P * sp.cos(th)), dl / (P * sp.cos(th)))
R.enunciato('d139.2', 'linee inclinate di β')
R.eq('d139.3', CK, bb * sp.tan(be))
R.eq('d139.4', dE, dl + CK)
zp = dE / (P * sp.cos(th))
R.eq('d139.5', zp, dl / (P * sp.cos(th)) + bb * sp.tan(be) / (P * sp.cos(th)))
beta_al = sp.atan(sp.tan(al) * sp.cos(th))
R.eq('d139.6', (bb * sp.tan(be) / (P * sp.cos(th))).subs(be, beta_al), bb * sp.tan(al) / P)
R.eq('d139.7', zp.subs(be, beta_al), dl / (P * sp.cos(th)) + bb * sp.tan(al) / P)
R.risultato('d139', zp.subs(be, beta_al), dl / (P * sp.cos(th)) + bb * sp.tan(al) / P)

# ====================================================================== d096 ruota fittizia (pp. 187–188)
rr, mf, zz = sp.symbols('r m z', **pos)
# piano per (r,0,0) normale all'elica h = (0, sin α, cos α); intersezione con il cilindro x² + y² = r²
h = sp.Matrix([0, sp.sin(al), sp.cos(al)])
pt = sp.Matrix([rr * sp.cos(ph), rr * sp.sin(ph), -rr * sp.tan(al) * sp.sin(ph)])
assert sp.simplify(h.dot(pt - sp.Matrix([rr, 0, 0]))) == 0
e1v, e2v = sp.Matrix([1, 0, 0]), sp.Matrix([0, sp.cos(al), -sp.sin(al)])
u = sp.simplify(pt.dot(e1v)); v = sp.simplify(pt.dot(e2v))
semi_b = u.subs(ph, 0)                               # lungo e1: r
semi_a = sp.simplify(v.subs(ph, sp.pi / 2))          # lungo e2: r/cos α
up, vp, upp, vpp = u.diff(ph), v.diff(ph), u.diff(ph, 2), v.diff(ph, 2)
rho = sp.simplify(((up ** 2 + vp ** 2) ** sp.Rational(3, 2) / sp.Abs(up * vpp - vp * upp)).subs(ph, 0))
mm = mf * sp.cos(al)                                 # modulo normale (d095)
zf = 2 * rho / mm
R.eq('d096.1', semi_a, rr / sp.cos(al))
R.eq('d096.1', semi_b, rr)
R.eq('d096.2', rho, semi_a ** 2 / semi_b)
R.eq('d096.3', rho, rr / sp.cos(al) ** 2)
R.eq('d096.4', zf, 2 * rho / mm)
R.eq('d096.5', mm.subs(mf, 2 * rr / zz), (2 * rr / zz) * sp.cos(al))
R.eq('d096.6', zf.subs(mf, 2 * rr / zz), zz / sp.cos(al) ** 3)
R.risultato('d096', zf.subs(mf, 2 * rr / zz), zz / sp.cos(al) ** 3)

# ====================================================================== d097 numero minimo di denti (p. 188)
zs = sp.Symbol('z_star', positive=True)
zmin = sp.solve(sp.Eq((zz / sp.cos(al) ** 3), zs), zz)[0]
R.enunciato('d097.1', 'z_fitt ≥ z*_min')
R.eq('d097.2', zmin / sp.cos(al) ** 3, zs)
R.eq('d097.3', zmin, zs * sp.cos(al) ** 3)
ex = (zs * sp.cos(al) ** 3).subs({zs: 2 / sp.sin(sp.pi / 9) ** 2, al: sp.pi / 9})
R.eq('d097.4', sp.ceiling(sp.N(ex, 30)), 15)
R.risultato('d097', zmin, zs * sp.cos(al) ** 3)

# ====================================================================== d098 forze nelle elicoidali (p. 189)
Cc, Ff, thm = sp.symbols('C F theta_m', **pos)
# terna: n = x̂ radiale, t = ŷ tangenziale, a = ẑ assiale; punto di contatto r n
n_, t_, a_ = sp.Matrix([1, 0, 0]), sp.Matrix([0, 1, 0]), sp.Matrix([0, 0, 1])
hd = sp.sin(al) * t_ + sp.cos(al) * a_              # direzione del dente (α dall'asse)
uu = sp.cos(al) * t_ - sp.sin(al) * a_              # nel piano tangente, ⊥ al dente
assert sp.simplify(hd.dot(uu)) == 0
Fv = Ff * (sp.cos(thm) * uu + sp.sin(thm) * n_)     # F nel piano normale (⊥ hd)
assert sp.simplify(Fv.dot(hd)) == 0
Qf, Af, Rf_, Hf = Fv.dot(t_), -Fv.dot(a_), Fv.dot(n_), Fv.dot(uu)
Mz = (rr * n_).cross(Fv).dot(a_)                    # momento rispetto all'asse della ruota
R.eq('d098.1', Rf_, Ff * sp.sin(thm))
R.eq('d098.1', Hf, Ff * sp.cos(thm))
R.eq('d098.2', Af, Hf * sp.sin(al))
R.eq('d098.2', Qf, Hf * sp.cos(al))
R.eq('d098.3', Qf, Ff * sp.cos(thm) * sp.cos(al))
R.eq('d098.4', Mz, Qf * rr)
Fsol = sp.solve(sp.Eq(Mz, Cc), Ff)[0]
R.eq('d098.5', Af.subs(Ff, Fsol), Cc / rr * sp.tan(al))
R.eq('d098.5', Rf_.subs(Ff, Fsol), Cc / rr * sp.tan(thm) / sp.cos(al))
R.eq('d098.5', Qf.subs(Ff, Fsol), Cc / rr)
thm_th = sp.atan(sp.tan(th) * sp.cos(al))
R.eq('d098.6', Rf_.subs(Ff, Fsol).subs(thm, thm_th), Cc / rr * sp.tan(th))
R.eq('d098.7', (Rf_.subs(Ff, Fsol).subs(thm, thm_th)).subs(al, 0), (Cc / rr) * sp.tan(th))
R.eq('d098.7', Af.subs(al, 0), 0)
R.eq('d098.8', Ff ** 2, Qf ** 2 + Rf_ ** 2 + Af ** 2)
R.risultato('d098', Af.subs(Ff, Fsol), Cc / rr * sp.tan(al))

# ====================================================================== d099 coniche: rapporto (p. 190)
p1, p2, L, wo1 = sp.symbols('phi1 phi2 L omega1', **pos)
u1 = sp.Matrix([-sp.sin(p1), sp.cos(p1), 0])
u2 = sp.Matrix([sp.sin(p2), sp.cos(p2), 0])
Pp = sp.Matrix([0, L, 0])                            # generatrice comune lungo ŷ
rc1 = sp.simplify(sp.sqrt(sp.simplify(Pp.cross(u1).dot(Pp.cross(u1)))))
rc2 = sp.simplify(sp.sqrt(sp.simplify(Pp.cross(u2).dot(Pp.cross(u2)))))
rc1, rc2 = sp.simplify(rc1.subs(sp.Abs(sp.sin(p1)), sp.sin(p1))), sp.simplify(rc2.subs(sp.Abs(sp.sin(p2)), sp.sin(p2)))
wo2 = sp.solve(sp.Eq(wo1 * rc1, X * rc2), X)[0]      # rotolamento in P: stessa velocità sui due coni
tc_ = wo2 / wo1
R.eq('d099.1', wo1 * rc1, wo2 * rc2)
R.eq('d099.2', rc1 / sp.sin(p1), rc2 / sp.sin(p2))
R.eq('d099.2', rc1 / sp.sin(p1), L)
R.eq('d099.3', tc_, sp.sin(p1) / sp.sin(p2))
psi = sp.acos(sp.simplify(u1.dot(u2)))               # angolo fra gli assi
R.eq('d099.4', sp.cos(psi), sp.cos(p1 + p2))         # (angoli in (0, π))
ps = p1 + p2
# identità trigonometriche: si sviluppano sin(φ1+φ2), cos(φ1+φ2) prima di semplificare
def num_trig(e):
    n, _ = sp.fraction(sp.together(sp.expand_trig(e)))
    return sp.simplify(sp.expand(sp.expand_trig(n)))


R.eq('d099.5', num_trig(sp.tan(p1) - sp.sin(ps) / (1 / tc_ + sp.cos(ps))), 0)
R.eq('d099.6', num_trig(sp.tan(p2) - sp.sin(ps) / (tc_ + sp.cos(ps))), 0)
R.eq('d099.7', (sp.sin(ps) / (1 / tc_ + sp.cos(ps))).subs(p2, sp.pi / 2 - p1), tc_.subs(p2, sp.pi / 2 - p1))
R.eq('d099.8', tc_, (2 * rc1 / mf) / (2 * rc2 / mf))
R.eq('d099.9', wo2.subs(p2, sp.pi / 2), wo1 * sp.sin(p1))
R.risultato('d099', tc_, sp.sin(p1) / sp.sin(p2))

# ====================================================================== d100 coniche: forze (p. 191)
C1c = sp.Symbol('C1c', positive=True)
gz = sp.Matrix([0, 0, 1])                            # tangenziale: ⊥ al piano degli assi
nn = sp.Matrix([-1, 0, 0])                           # nel piano degli assi, ⊥ alla generatrice, verso l'asse 1
Fc = Ff * (sp.cos(th) * gz + sp.sin(th) * nn)        # F nel piano Π ⊥ generatrice
Qc = Fc.dot(gz)
Fss = Ff * sp.sin(th)
assert sp.simplify(Fc[0] ** 2 + Fc[1] ** 2 - Fss ** 2) == 0
M1 = -(Pp.cross(Fc).dot(u1))                        # momento rispetto all'asse 1 (in modulo: il segno dà il verso)
M2 = Pp.cross(Fc).dot(u2)                            # momento rispetto all'asse 2 (in modulo)
A1 = Fc.dot(u1)
Rv1 = Fc - A1 * u1
R1c2 = sp.simplify(Rv1.dot(Rv1) - Fc[2] ** 2)        # parte nel piano degli assi, al quadrato
R.eq('d100.1', Qc, Ff * sp.cos(th))
R.eq('d100.1', Fss, Ff * sp.sin(th))
R.eq('d100.2', M1, Qc * rc1)
R.eq('d100.2', M2, Qc * rc2)
Fsc = sp.solve(sp.Eq(M1, C1c), Ff)[0]
R.eq('d100.2', Fsc, C1c / (rc1 * sp.cos(th)))
R.eq('d100.3', A1, Fss * sp.sin(p1))
R.eq('d100.3', R1c2, (Fss * sp.cos(p1)) ** 2)
R.eq('d100.4', A1.subs(Ff, Fsc), C1c / rc1 * sp.tan(th) * sp.sin(p1))
R.eq('d100.4', (Fss * sp.cos(p1)).subs(Ff, Fsc), C1c / rc1 * sp.tan(th) * sp.cos(p1))
A2 = (-Fc).dot(u2)
R.eq('d100.5', A2.subs(p2, sp.pi / 2 - p1), Fss * sp.cos(p1))
R.enunciato('d100.6', 'spinta assiale sui cuscinetti')
R.risultato('d100', A1.subs(Ff, Fsc), C1c / rc1 * sp.tan(th) * sp.sin(p1))

# ====================================================================== d140 riduttore di coppia (pp. 180–182, 201)
e2, C2r, wmm, eta = sp.symbols('eta2 C2r omega_m eta', **pos)
C2d = sp.solve(sp.Eq(e1 * C1 * om1 + X * om2, 0), X)[0]           # moto diretto
R.eq('d140.1', e1 * C1 * om1 + C2d * om2, 0)
R.eq('d140.2', C1 / C2d, -tau / e1)
R.eq('d140.2', C2d, e1 * C1 / t)                                   # C2 > 0 con C1 > 0, cioè |C2| = η1|C1|/|τ|
R.enunciato('d140.3', '|C2|/|C1| = η1/|τ|')
C1r = sp.solve(sp.Eq(e2 * C2r * om2 + X * om1, 0), X)[0]           # moto retrogrado: 2 movente
R.eq('d140.4', C1r / C2r, -tau * e2)
R.enunciato('d140.5', 'condizione (*)')
assert sp.simplify((t / e1 - t * e2).subs({e1: sp.Rational(9, 10), e2: sp.Rational(9, 10)})) > 0
R.enunciato('d140.6', 'η ≤ 0: moto retrogrado impossibile')
wuu = t * wmm
Cu0 = sp.solve(sp.Eq(Cm * wmm - X * wuu, 0), X)[0]                 # regime, η = 1, C_u in modulo
R.eq('d140.7', Cm, Cu0 * t)
Cue = sp.solve(sp.Eq(eta * Cm * wmm, X * wuu), X)[0]
R.eq('d140.8', Cue, eta * Cm / t)
R.risultato('d140', C2d, e1 * C1 / t)

# ====================================================================== d141 differenziale (pp. 176–178)
VM, Rt, pc, dd, zs_, zp_, Cd1 = sp.symbols('V_M R p d z_s z_p C_d1', **pos)
wV = sp.Symbol('omega_V', positive=True)
# cinematica del veicolo: centro della traiettoria nell'origine, ruote a R ∓ p/2 sul raggio
V1 = wV * (Rt - pc / 2); V2 = wV * (Rt + pc / 2); Vm = wV * Rt
wr1 = sp.solve(sp.Eq(V1, X * dd / 2), X)[0]                        # rotolamento senza strisciamento
wr2 = sp.solve(sp.Eq(V2, X * dd / 2), X)[0]
tw = -zs_ / zs_                                                    # solari uguali, versi opposti a portatreno fermo
Wd = sp.solve(sp.Eq((wr2 - X) / (wr1 - X), tw), X)[0]
R.eq('d141.1', (wr2 - Wd) / (wr1 - Wd), -1)
R.eq('d141.2', Wd, (wr1 + wr2) / 2)
scd = sp.solve([sp.Eq(Cd1 + C2 + Cp, 0), sp.Eq(Cd1 * wr1 + C2 * wr2 + Cp * Wd, 0)], [C2, Cp], dict=True)[0]
R.eq('d141.3', scd[C2] / Cd1, -1 / tw)
R.eq('d141.4', scd[Cp], -2 * Cd1)
ws = sp.solve(sp.Eq(VM, X * dd / 2), X)[0]                         # rettilineo: stessa V sulle due ruote
Wr = sp.solve(sp.Eq(ws - X, tw * (ws - X)), X)[0]                 # Willis in forma lineare con ω1 = ω2
R.eq('d141.5', Wr, ws)
R.eq('d141.6', V1 + V2, 2 * Vm)
sub = {wV: VM / Rt}
R.eq('d141.7', wr1.subs(sub), 2 * VM / dd * (1 - pc / (2 * Rt)))
R.eq('d141.7', wr2.subs(sub), 2 * VM / dd * (1 + pc / (2 * Rt)))
R.eq('d141.8', Wd.subs(sub), 2 * VM / dd)
# planetario: rotolamento sul solare nel moto relativo, raggi proporzionali ai denti
spin = (zs_ / zp_) * sp.Abs(wr1 - Wd)
R.eq('d141.9', (wr1 - Wd).subs(sub), -(wr2 - Wd).subs(sub))
R.eq('d141.9', spin.subs(sub), (zs_ / zp_) * (2 * VM / dd) * (pc / (2 * Rt)))
R.risultato('d141', Wd.subs(sub), 2 * VM / dd)

R.salva()
