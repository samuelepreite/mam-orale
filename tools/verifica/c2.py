"""Verifica simbolica del capitolo C2 (attrito e aderenza). Modelli ricostruiti dai principi:
equilibri scritti come somme vettoriali di forze e di momenti (prodotti vettoriali), risolti con solve;
integrali con integrate; sviluppi con series. Nessuna formula è copiata dal TypeScript."""
from comune import Registro, sp

R = Registro('C2')
pi = sp.pi


def mom(p, f):
    """momento (componente z) della forza f = (fx, fy) applicata in p = (x, y) rispetto all'origine"""
    return p[0] * f[1] - p[1] * f[0]


# ---------------------------------------------------------------- d024 aderenza, attrito, cono (pp. 68–74)
M, g, F, fad, fatt, al = sp.symbols('M g F f_ad f_att alpha', positive=True)
FN, FT = sp.symbols('F_N F_T')
s = sp.solve([FN - M * g, FT - F], [FN, FT], dict=True)[0]  # corpo fermo: verticale e orizzontale
R.eq('d024.1', s[FN], M * g)
R.enunciato('d024.2', 'legge di Coulomb in aderenza (disuguaglianza)')
R.enunciato('d024.3', 'legge dell\'attrito di strisciamento')
alR = sp.atan(s[FT] / s[FN])
R.eq('d024.4', sp.tan(alR), s[FT] / s[FN])
R.eq('d024.5', sp.atan(fad * s[FN] / s[FN]), sp.atan(fad))
R.enunciato('d024.6', 'tan crescente: F_T <= f F_N equivale ad alpha <= phi')
R.eq('d024.7', sp.atan(fatt * s[FN] / s[FN]), sp.atan(fatt))
# piano inclinato: assi x normale, y lungo il piano verso l'alto; peso = Mg(-cos α, -sin α) nelle coordinate (x, y)
Fad, ay = sp.symbols('F_ad a_y')
sp_ = sp.solve([FN - M * g * sp.cos(al), Fad - M * g * sp.sin(al)], [FN, Fad], dict=True)[0]
R.eq('d024.8', sp_[Fad] / sp_[FN], sp.tan(al))
a_sol = sp.solve(sp.Eq(fatt * sp_[FN] - M * g * sp.sin(al), M * ay), ay)[0]
R.eq('d024.9', a_sol, g * (fatt * sp.cos(al) - sp.sin(al)))
R.risultato('d024', sp.atan(fad * s[FN] / s[FN]), sp.atan(fad))

# ---------------------------------------------------------------- d025 perno e cerchio d'attrito (pp. 81–83)
Rr, f = sp.symbols('R f', positive=True)
ph = sp.Symbol('phi', real=True)
RN, RT = sp.symbols('R_N R_T', positive=True)
RN0 = sp.solve(sp.Symbol('X') - F, sp.Symbol('X'))[0]  # perno fermo: R_N = F
R.eq('d025.1', RN0, F)
R.enunciato('d025.2', 'attrito di strisciamento R_T = f R_N, opposto a v_P')
Pp = (Rr * sp.sin(ph), -Rr * sp.cos(ph))          # contatto: OP inclinato di phi dalla verticale (a destra)
n = (-sp.sin(ph), sp.cos(ph))                       # normale verso O
t = (sp.cos(ph), sp.sin(ph))                        # tangente verso l'alto-destra (opposta a v_P)
ex = -RN * sp.sin(ph) + f * RN * sp.cos(ph)         # equilibrio orizzontale con R_T = f R_N
Tt = sp.Symbol('T')
rat = sp.simplify(ex / (RN * sp.cos(ph)))                # = f − tan φ (si divide per cos φ ≠ 0)
phi_s = sp.atan(sp.solve(rat.subs(sp.tan(ph), Tt), Tt)[0])
ey = RN * sp.cos(ph) + f * RN * sp.sin(ph) - F      # equilibrio verticale
RN_s = sp.simplify(sp.solve(ey.subs(ph, phi_s), RN)[0])
RT_s = f * RN_s
R.eq('d025.3', sp.sqrt(RN_s**2 + RT_s**2), F)
R.eq('d025.4', RT_s / RN_s, sp.tan(phi_s))
R.eq('d025.5', RT_s, F * sp.sin(phi_s))
Pps = tuple(c.subs(ph, phi_s) for c in Pp)
R.eq('d025.6', sp.Abs(mom(Pps, (0, 1))), Rr * sp.sin(phi_s))
Mr = mom(Pps, (0, F))                               # momento della risultante verticale R_P = F
R.eq('d025.7', Mr, F * Rr * sp.sin(phi_s))
ns, ts = tuple(c.subs(ph, phi_s) for c in n), tuple(c.subs(ph, phi_s) for c in t)
Mcomp = mom(Pps, (RN_s * ns[0], RN_s * ns[1])) + mom(Pps, (RT_s * ts[0], RT_s * ts[1]))
R.eq('d025.8', Mcomp, F * Rr * sp.sin(phi_s))
R.eq('d025.9', sp.series(sp.sin(sp.atan(f)), f, 0, 2).removeO(), f)
R.risultato('d025', Mr, F * Rr * sp.sin(sp.atan(f)))

# ---------------------------------------------------------------- d026 impuntamento (pp. 79–81)
e, h, a = sp.symbols('e h a', positive=True)
NA_, NB_, Q = sp.symbols('F_NA F_NB Q')
A_, B_ = (-a / 2, h / 2), (a / 2, -h / 2)
forze = [(A_, (NA_, 0)), (A_, (0, -f * NA_)), (B_, (-NB_, 0)), (B_, (0, -f * NB_)), ((0, 0), (0, -F)), ((e, h / 2), (0, Q))]
Fx = sum(fz[0] for _, fz in forze); Fy = sum(fz[1] for _, fz in forze); Mo = sum(mom(p, fz) for p, fz in forze)
R.enunciato('d026.1', 'attriti di strisciamento verso il basso in A e B')
sol = sp.solve([Fx, Fy, Mo], [NA_, NB_, Q], dict=True)[0]
R.eq('d026.2', sol[NA_] - sol[NB_], 0)
R.eq('d026.3', (Q - F - 2 * f * NA_).subs(sol), 0)
R.eq('d026.4', Mo, -NA_ * h / 2 - NB_ * h / 2 + f * NA_ * a / 2 - f * NB_ * a / 2 + Q * e)
FNs = sp.Symbol('F_N')
R.eq('d026.5', Mo.subs({NA_: FNs, NB_: FNs}), -FNs * h + Q * e)
R.eq('d026.6', sol[NA_], (sol[Q] - F) / (2 * f))
R.eq('d026.7', sol[Q], F / (1 - 2 * e * f / h))
R.eq('d026.8', sp.denom(sp.together(sol[Q])).subs(e, h / (2 * f)), 0)
R.risultato('d026', sol[Q], F / (1 - 2 * e * f / h))

# ---------------------------------------------------------------- d027 ribaltamento del blocco (deduzione da p. 68)
sb = sp.Symbol('s', positive=True)
b, FT2, FN2 = sp.symbols('b F_T2 F_N2')
fb = [((-sb / 2, h), (F, 0)), ((0, h / 2), (0, -M * g)), ((b, 0), (0, FN2)), ((b, 0), (-FT2, 0))]
so = sp.solve([sum(x[1][0] for x in fb), sum(x[1][1] for x in fb), sum(mom(p, q) for p, q in fb)], [FT2, FN2, b], dict=True)[0]
R.eq('d027.1', so[FN2], M * g)
R.eq('d027.2', so[FN2] * so[b] - F * h, 0)
R.enunciato('d027.3', 'la risultante delle pressioni (solo compressione) resta nella base')
Frib = sp.solve(sp.Eq(so[b], sb / 2), F)[0]
R.eq('d027.4', Frib * h, M * g * sb / 2)
Fslip = fad * so[FN2]
R.eq('d027.5', Fslip, fad * M * g)
R.eq('d027.6', Frib / Fslip, sb / (2 * h * fad))
R.risultato('d027', Frib, M * g * sb / (2 * h))

# ---------------------------------------------------------------- d034 ribaltamento in curva (pp. 93–95, 102)
Rc, c, v, om = sp.symbols('R_c c v omega', positive=True)
# accelerazione del punto A in moto circolare: a = a_O + ω̇∧(A−O) − ω²(A−O), con a_O = 0, ω̇ = 0
AO = sp.Matrix([Rc, 0, 0]); w = sp.Matrix([0, 0, om])
aA = w.cross(w.cross(AO))
R.eq('d034.1', aA.norm().subs(om, v / Rc), v**2 / Rc)
ND, NS = sp.symbols('F_ND F_NS')
Fc = M * v**2 / Rc
fc = [((sp.Integer(0), 0), (0, NS)), ((c, 0), (0, ND)), ((c / 2, h), (0, -M * g)), ((c / 2, h), (-Fc, 0))]  # A = ruota esterna (sinistra)
MA = sum(mom(p, q) for p, q in fc)
R.eq('d034.2', MA, ND * c + M * v**2 / Rc * h - M * g * c / 2)
ND_s = sp.solve(MA, ND)[0]
R.eq('d034.3', ND_s, M * g / 2 - M * v**2 * h / (Rc * c))
vrib = [x for x in sp.solve(ND_s, v) if x.is_positive][0]
R.eq('d034.4', vrib, sp.sqrt(Rc * c * g / (2 * h)))
R.enunciato('d034.5', 'osservazione sul rapporto c/h')
vslip = [x for x in sp.solve(Fc - fad * M * g, v) if x.is_positive][0]
R.eq('d034.6', vrib**2 / vslip**2, c / (2 * h * fad))
R.risultato('d034', vrib, sp.sqrt(Rc * c * g / (2 * h)))

# ---------------------------------------------------------------- d028 attrito volvente (pp. 84–88)
th, u, Rw = sp.symbols('theta u R_w', positive=True)
tsol = [x for x in sp.solve(sp.Eq(Rw * sp.cos(th), h), th)]
R.eq('d028.1', sp.cos(tsol[0]), h / Rw)
for k in ('d028.2', 'd028.3', 'd028.4'):
    R.enunciato(k, 'modello a molle, isteresi, spostamento della risultante (descrizione)')
FTv = sp.Symbol('F_T')
Mv = mom((-u, -h), (0, FN)) + mom((-u, -h), (FTv, 0))   # F_N avanti di u (moto verso sinistra), F_T al suolo verso destra
R.eq('d028.5', Mv, -FN * u + FTv * h)
FT_s = sp.solve(Mv, FTv)[0]
R.eq('d028.6', FT_s, u / h * FN)
R.eq('d028.7', (u / Rw) * FN, FN * u / Rw)
R.enunciato('d028.8', 'valori tabellati')
R.risultato('d028', FT_s, FN * u / h)

# ---------------------------------------------------------------- dinamica longitudinale (pp. 89–92, 100–101)
l1, l2, Rr2, acc = sp.symbols('l_1 l_2 R_r a', positive=True)
L = l1 + l2
NA, NB, FTm = sp.symbols('N_A N_B F_Tm')


def longitudinale(a_, motrice, polo):
    """x avanti; B (posteriore) in x = 0, G in x = l2, A (anteriore) in x = L; inerzia −M a in G.
    a_ > 0 accelerazione, a_ < 0 frenata (in frenata le forze al suolo si passano a parte)."""
    G = (l2, h)
    fl = [((L, 0), (0, NA)), ((0, 0), (0, NB)), (G, (0, -M * g)), (G, (-M * a_, 0))]
    fl.append(((L if motrice == 'A' else 0, 0), (FTm, 0)))
    p0 = (0, 0) if polo == 'B' else (L, 0)
    Mp = sum(mom((p[0] - p0[0], p[1] - p0[1]), q) for p, q in fl)
    eqs = [sum(q[0] for _, q in fl), sum(q[1] for _, q in fl), Mp]
    return sp.solve(eqs, [NA, NB, FTm], dict=True)[0], Mp


# d029 coppia massima
Cm = sp.Symbol('C_m')
sA, _ = longitudinale(acc, 'A', 'B')
aAnt = sp.solve(sp.Eq(M * acc, f * sA[NA]), acc)[0]
Cm_s = sp.solve(Cm - FTm * Rr2, Cm)[0]
R.eq('d029.1', Cm_s, FTm * Rr2)
R.enunciato('d029.2', 'limite di aderenza sulla normale dell\'asse motore')
R.eq('d029.3', (M * acc * Rr2).subs(acc, aAnt), (f * sA[NA] * Rr2).subs(acc, aAnt))
R.eq('d029.4', (f * sA[NA] * Rr2).subs(acc, aAnt), M * aAnt * Rr2)
R.enunciato('d029.5', 'oltre il limite la ruota pattina (f_att < f_ad)')
R.risultato('d029', Cm_s.subs(FTm, M * aAnt), M * aAnt * Rr2)

# d030 schema generale
sA, MB = longitudinale(acc, 'A', 'B')
R.enunciato('d030.1', 'resistenze al moto trascurate in partenza')
R.eq('d030.2', sA[FTm], M * acc)
R.eq('d030.3', sA[NA] + sA[NB], M * g)
R.eq('d030.4', sA[NA], M * (g * l2 - acc * h) / L)
R.eq('d030.5', sA[NB], M * (g * l1 + acc * h) / L)
R.enunciato('d030.6', 'condizione di incipiente slittamento sull\'asse motore')
R.risultato('d030', sA[NA], M * (g * l2 - acc * h) / L)

# d031 trazione anteriore
R.eq('d031.1', sA[NA], M * (g * l2 - acc * h) / L)
R.eq('d031.2', M * aAnt, (f * sA[NA]).subs(acc, aAnt))
R.eq('d031.3', aAnt, f * g * l2 / (l1 + l2 + f * h))
R.eq('d031.4', aAnt / (f * g * l2 / L), L / (L + f * h))
R.risultato('d031', aAnt, f * g * l2 / (l1 + l2 + f * h))

# d032 trazione posteriore (momenti rispetto ad A)
sB, MA_ = longitudinale(acc, 'B', 'A')
R.eq('d032.1', sB[NB], M * (g * l1 + acc * h) / L)
aPost = sp.solve(sp.Eq(M * acc, f * sB[NB]), acc)[0]
R.eq('d032.2', M * aPost, (f * sB[NB]).subs(acc, aPost))
R.eq('d032.3', aPost, f * g * l1 / (l1 + l2 - f * h))
fLim = sp.solve(sp.Eq(sB[NA].subs(acc, aPost), 0), f)[0]
R.eq('d032.4', aPost.subs(f, fLim), g * l2 / h)
aDrag = sp.solve(sp.Eq(sB[NA], 0), acc)[0]
R.eq('d032.5', aDrag, g * l2 / h)
R.eq('d032.6', aPost / aAnt, l1 * (L + f * h) / (l2 * (L - f * h)))
R.risultato('d032', aPost, f * g * l1 / (l1 + l2 - f * h))

# d033 / d035 curva (pp. 93–96, 102)
TD, TS = sp.symbols('F_TD F_TS')
fcv = fc + [((sp.Integer(0), 0), (TS, 0)), ((c, 0), (TD, 0))]
eqs = [sum(q[0] for _, q in fcv), sum(q[1] for _, q in fcv), sum(mom(p, q) for p, q in fcv)]
sc = sp.solve(eqs, [TS, NS, ND], dict=True)[0]   # TD resta libero: iperstatico
R.eq('d033.1', (TD + TS).subs(sc), M * v**2 / Rc)
R.enunciato('d033.2', 'la ripartizione F_TD/F_TS è indeterminata (iperstatica)')
R.eq('d033.3', sc[ND], M * g / 2 - M * v**2 * h / (Rc * c))
R.eq('d033.4', sc[NS], M * g / 2 + M * v**2 * h / (Rc * c))
R.eq('d033.5', sc[NS] - sc[ND], 2 * M * v**2 * h / (Rc * c))
R.risultato('d033', sc[ND], M * g / 2 - M * v**2 * h / (Rc * c))

R.enunciato('d035.1', 'incipiente slittamento laterale su entrambe le ruote')
ey_lim = (fad * sc[ND] + fad * sc[NS]) - M * v**2 / Rc      # equazione y con F_T = f_ad F_N su entrambe
vmax = [x for x in sp.solve(ey_lim, v) if x.is_positive][0]
R.eq('d035.2', M * vmax**2 / Rc, fad * M * g)
R.eq('d035.3', vmax**2, fad * g * Rc)
alm, ell = sp.symbols('alpha_m ell', positive=True)
Gm = (ell * sp.sin(alm), ell * sp.cos(alm))                  # moto inclinata verso l'interno
Mp_moto = mom(Gm, (-Fc, 0)) + mom(Gm, (0, -M * g))           # le forze in P non danno momento rispetto a P
ratm = sp.simplify(Mp_moto / (ell * sp.cos(alm)))         # = Fc − Mg tan α
al_s = sp.atan(sp.solve(ratm.subs(sp.tan(alm), Tt), Tt)[0])
R.eq('d035.4', sp.tan(al_s), v**2 / (g * Rc))
vm2 = [x for x in sp.solve(sp.Eq(sp.tan(al_s), sp.tan(sp.atan(fad))), v) if x.is_positive][0]
R.eq('d035.5', vm2**2 / (Rc * g), fad)
R.risultato('d035', vm2, sp.sqrt(fad * g * Rc))

# d136 decelerazione massima: a = decelerazione > 0, inerzia +M a in avanti, forze frenanti all'indietro
dec = sp.Symbol('d', positive=True)
TA, TB = sp.symbols('F_TA F_TB')
G = (l2, h)
ff = [((L, 0), (0, NA)), ((0, 0), (0, NB)), (G, (0, -M * g)), (G, (M * dec, 0)), ((L, 0), (-TA, 0)), ((0, 0), (-TB, 0))]
eqx = sum(q[0] for _, q in ff); eqy = sum(q[1] for _, q in ff); eqm = sum(mom(p, q) for p, q in ff)
sn = sp.solve([eqy, eqm], [NA, NB], dict=True)[0]
amax = sp.solve(eqx.subs({TA: f * NA, TB: f * NB}).subs(sn), dec)[0]
R.eq('d136.1', eqx.subs({TA: f * sn[NA], TB: f * sn[NB]}).subs(dec, amax), 0)
R.eq('d136.2', sn[NA] + sn[NB], M * g)
R.eq('d136.3', amax, f * g)
R.eq('d136.4', sn[NA], M * (g * l2 + dec * h) / L)
R.eq('d136.5', (sn[NA] / sn[NB]).subs(dec, amax), (l2 + f * h) / (l1 - f * h))
R.risultato('d136', amax, f * g)

# ---------------------------------------------------------------- d036 cinematica del cuscinetto (p. 98)
Ri, rr = sp.symbols('R_i r', positive=True)
wi, we, wv, VGs, wg = sp.symbols('omega_i omega_e omega_v V_G omega_g', real=True)
Re = Ri + 2 * rr; Rg = (Re + Ri) / 2
k3 = sp.Matrix([0, 0, 1])
cr = lambda wz, p: (wz * k3).cross(sp.Matrix([p[0], p[1], 0]))
tt = k3.cross(sp.Matrix([0, 1, 0]))             # t̂ = k̂ ∧ ĵ
VE = cr(we, (0, Re)); VI = cr(wi, (0, Ri))       # punti delle piste (centro Ω fermo)
VG = VGs * tt
eqE = VE - (VG + cr(wv, (0, rr))); eqI = VI - (VG + cr(wv, (0, -rr)))
sk = sp.solve([eqE[0], eqI[0]], [VGs, wv], dict=True)[0]
VEs, VIs = VE.dot(tt), VI.dot(tt)
R.eq('d036.1', VEs, we * Re)
R.eq('d036.2', sk[VGs] + sk[wv] * rr, VEs)
R.eq('d036.3', sk[VGs] - sk[wv] * rr, VIs)
R.eq('d036.4', sk[VGs], (VEs + VIs) / 2)
R.eq('d036.5', sk[wv], (we * Re - wi * Ri) / (Re - Ri))
wg_s = sp.solve((cr(wg, (0, Rg)) - sk[VGs] * tt)[0], wg)[0]
R.eq('d036.6', wg_s, (we * Re + wi * Ri) / (2 * Rg))
R.eq('d036.7', wg_s, (we * Re + wi * Ri) / (Re + Ri))
R.eq('d036.8', (wg_s / wi).subs(we, 0), Ri / (Re + Ri))
R.risultato('d036', wg_s, (we * Re + wi * Ri) / (Re + Ri))

# ---------------------------------------------------------------- d037 carico e attrito nel cuscinetto (pp. 98–99)
d0, kk, gam, Qq, z, fv, Rg2 = sp.symbols('delta_0 k gamma Q z f_v R_g', positive=True)
i = sp.Symbol('i', integer=True)
R.enunciato('d037.1', 'anelli rigidi, schiacciamento nella metà inferiore')
rad_i = sp.Matrix([sp.sin(i * gam), -sp.cos(i * gam)])          # radiale verso l'esterno del rullo i (dalla verticale in basso)
di = sp.Matrix([0, -d0]).dot(rad_i)                             # componente radiale dello spostamento verticale
R.eq('d037.2', di, d0 * sp.cos(i * gam))
Pi = di / kk; P0 = d0 / kk
R.eq('d037.3', Pi, P0 * sp.cos(i * gam))
R.eq('d037.4', Pi * sp.cos(i * gam), P0 * sp.cos(i * gam)**2)   # termine per termine della somma
R.enunciato('d037.5', 'somma sostituita dal numero di elementi per il valor medio (z grande)')
x = sp.Symbol('x')
mean2 = sp.integrate(sp.cos(x)**2, (x, -pi / 2, pi / 2)) / pi
R.eq('d037.6', mean2, sp.Rational(1, 2))
R.eq('d037.7', Qq / (z / 2 * mean2), 4 * Qq / z)
R.enunciato('d037.8', 'valore per le sfere dato senza derivazione')
R.enunciato('d037.9', 'sin α = u/R = f_v (attrito volvente sull\'elemento)')
alpha = sp.asin(fv)
d_line = sp.Abs(mom((0, -Rg2), (sp.sin(alpha), sp.cos(alpha))))  # distanza di Ω dalla retta per G inclinata di α
R.eq('d037.10', d_line, Rg2 * fv)
rho = Rg2 * sp.sin(alpha)
R.eq('d037.11', Pi / sp.cos(alpha) * rho, Pi / sp.cos(alpha) * Rg2 * fv)
mean1 = sp.integrate(sp.cos(x), (x, -pi / 2, pi / 2)) / pi
R.eq('d037.12', P0 * z / 2 * mean1, P0 * z / pi)
R.eq('d037.13', (5 * Qq / z) * (z / pi) * Rg2 * fv, 5 / pi * Qq * Rg2 * fv)
R.enunciato('d037.14', 'confronto con il radente (valori di f)')
# controllo numerico della somma esatta (z = 16): P0 = Q / Σcos² = Q/4 = 4Q/z
z16 = 16; g16 = 2 * pi / z16
S2 = sum(sp.cos(j * g16)**2 for j in range(-3, 4))
assert sp.nsimplify(sp.simplify(S2)) == 4, S2
R.risultato('d037', Qq / (z / 2 * mean2), 4 * Qq / z)

R.salva()
