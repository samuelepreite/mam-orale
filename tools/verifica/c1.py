"""Verifica simbolica del capitolo C1 (cinematica e dinamica dei meccanismi piani).

Il modello è ricostruito dai principi: leggi di posizione funzioni generiche del tempo, derivate con diff, vettori
piani con Matrix, equilibri risolti con solve. Ogni passo delle dimostrazioni dell'app (id 'd0NN.k') è controllato.
Le righe che sono approssimazioni (manovellismo, λ ≪ 1) sono controllate con lo sviluppo in serie.
"""
from comune import Registro, sp

R = Registro('C1')
t = sp.Symbol('t', real=True)
Mx = sp.Matrix


def kw(w, r):
    """(w k̂) ∧ r nel piano"""
    return Mx([-w * r[1], w * r[0]])


def cr(a, b):
    """componente z di a ∧ b"""
    return a[0] * b[1] - a[1] * b[0]


def eqv(pid, a, b, ass=None):
    """uguaglianza fra vettori piani: componente per componente"""
    ok1 = R.eq(pid, a[0], b[0], ass=ass)
    ok2 = R.eq(pid, a[1], b[1], ass=ass)
    if not (ok1 and ok2):
        R._dim(pid)[pid] = 'FALLITO'


def f(nome):
    return sp.Function(nome, real=True)(t)


d = lambda e, n=1: sp.diff(e, t, n)

# ================================================================ d001 velocità in coordinate polari (deduzione)
r, th = f('r'), f('theta')
er = Mx([sp.cos(th), sp.sin(th)])
et = Mx([-sp.sin(th), sp.cos(th)])
P = Mx([r * sp.cos(th), r * sp.sin(th)])  # posizione polare di p. 6
V = d(P)
eqv('d001.1', P, r * er)
eqv('d001.2', et, kw(1, er))
eqv('d001.3', d(er), d(th) * et)
eqv('d001.4', V, d(r) * er + r * d(er))
eqv('d001.5', V, d(r) * er + r * d(th) * et)
R.eq('d001.6', V.dot(V), d(r) ** 2 + r ** 2 * d(th) ** 2)
R.risultato('d001', (V - d(r) * er - r * d(th) * et).norm() ** 2, 0)

# ================================================================ d002 accelerazione tangenziale e normale (pp. 6–8)
x, y = f('x'), f('y')
m = sp.Symbol('m', positive=True)
Vv = Mx([d(x), d(y)])
a = d(Vv)
Vm = sp.sqrt(Vv.dot(Vv))
tau = Vv / Vm
N = cr(Vv, a)  # x'y'' − y'x'' (curva che gira a sinistra: N > 0)
Rc = Vm ** 3 / N  # raggio di curvatura della geometria differenziale
om = d(sp.atan2(d(y), d(x)))  # velocità con cui ruota la tangente
n = kw(1, tau)
eqv('d002.1', Vv, Vm * tau)
eqv('d002.2', a, d(Vm) * tau + Vm * d(tau))
R.eq('d002.3', Vm, Rc * om)
eqv('d002.4', d(tau), om * n)
R.eq('d002.5', a.dot(n), Vm ** 2 / Rc)
eqv('d002.6', a, d(Vm) * tau + Vm ** 2 / Rc * n)
R.eq('d002.7', -m * a.dot(n), -m * Vm ** 2 / Rc)
R.risultato('d002', (a - d(Vm) * tau - Vm ** 2 / Rc * n).applyfunc(sp.simplify).norm(), 0)

# ================================================================ d003 accelerazione in coordinate polari (deduzione)
A = d(P, 2)
eqv('d003.1', V, d(r) * er + r * d(th) * et)
eqv('d003.2', d(et), -d(th) * er)
eqv('d003.3', A, d(r, 2) * er + 2 * d(r) * d(th) * et + r * d(th, 2) * et - r * d(th) ** 2 * er)
eqv('d003.4', A, (d(r, 2) - r * d(th) ** 2) * er + (r * d(th, 2) + 2 * d(r) * d(th)) * et)
Rr = sp.Symbol('R', positive=True)
Pc = Rr * er
Ac = d(Pc, 2)
Vc = sp.sqrt(d(Pc).dot(d(Pc)))
R.eq('d003.5', Ac.dot(er), -Vc ** 2 / Rr)
R.risultato('d003', (A - (d(r, 2) - r * d(th) ** 2) * er - (r * d(th, 2) + 2 * d(r) * d(th)) * et).applyfunc(sp.simplify).norm(), 0)

# ================================================================ d004 Poisson (deduzione da p. 10)
ph = f('phi')
beta = sp.Symbol('beta', real=True)
e = Mx([sp.cos(ph), sp.sin(ph)])
e2 = Mx([sp.cos(ph + beta), sp.sin(ph + beta)])
R.eq('d004.1', e.dot(e), 1)
R.eq('d004.2', e.dot(d(e)), 0)
eqv('d004.3', d(e), d(ph) * Mx([-sp.sin(ph), sp.cos(ph)]))
eqv('d004.4', d(e), kw(d(ph), e))
eqv('d004.5', d(e2), kw(d(ph), e2))
R.risultato('d004', (d(e) - kw(d(ph), e)).norm(), 0)

# ================================================================ d005 formula fondamentale delle velocità (pp. 10–12)
AB = sp.Symbol('AB', positive=True)
PA = Mx([f('x_A'), f('y_A')])
PB = PA + AB * e  # rigidità: |B − A| = AB costante
w = d(ph)
R.eq('d005.1', (PB - PA)[0] + sp.sqrt(2) * (PB - PA)[1], PB[0] - PA[0] + sp.sqrt(2) * (PB[1] - PA[1]))
eqv('d005.2', PB - PA, AB * e)
eqv('d005.3', d(PB - PA), d(PB) - d(PA))
eqv('d005.4', AB * d(e), d(PB) - d(PA))
eqv('d005.5', AB * d(e), kw(w, PB - PA))
eqv('d005.6', d(PB), d(PA) + kw(w, PB - PA))
R.enunciato('d005.7', '3 GDL: conteggio')
R.risultato('d005', (d(PB) - d(PA) - kw(w, PB - PA)).norm(), 0)

# ================================================================ d006 Rivals (pp. 12–15)
eqv('d006.1', d(PB, 2), d(PA, 2) + kw(d(w), PB - PA) + kw(w, d(PB - PA)))
eqv('d006.2', d(PB - PA), kw(w, PB - PA))
eqv('d006.3', d(PB, 2), d(PA, 2) + kw(d(w), PB - PA) + kw(w, kw(w, PB - PA)))
rv = Mx(sp.symbols('r_x r_y', real=True))
ws = sp.Symbol('omega', real=True)
eqv('d006.4', kw(ws, kw(ws, rv)), -ws ** 2 * rv)
eqv('d006.5', d(PB, 2), d(PA, 2) + kw(d(w), PB - PA) - w ** 2 * (PB - PA))
OQ = sp.Symbol('OQ', positive=True)
Q = OQ * e
aQ = d(Q, 2)
R.eq('d006.6', aQ.dot(aQ), OQ ** 2 * (w ** 4 + d(w) ** 2))
R.eq('d006.7', cr(aQ, Q) ** 2 / aQ.dot(Q) ** 2, d(w) ** 2 / w ** 4)
R.risultato('d006', (d(PB, 2) - d(PA, 2) - kw(d(w), PB - PA) + w ** 2 * (PB - PA)).applyfunc(sp.simplify).norm(), 0)

# ================================================================ d007 CIR (pp. 17–18, 21–24, 39–40)
VA, VB = d(PA), d(PB)
Kx, Ky = sp.symbols('K_x K_y', real=True)
Ks = Mx([Kx, Ky])
solK = sp.solve(list(VA + kw(w, Ks - PA)), [Kx, Ky], dict=True)[0]  # V_K = 0
K = Ks.subs(solK)
R.enunciato('d007.1', 'definizione di CIR')
R.eq('d007.2', (VA - kw(w, PA - K))[0] + (VB - kw(w, PB - K))[0] + sp.sqrt(2) * ((VA - kw(w, PA - K))[1] + (VB - kw(w, PB - K))[1]), 0)
s1, s2 = sp.symbols('s_1 s_2', real=True)
sol = sp.solve(list(PA + s1 * kw(1, VA) - PB - s2 * kw(1, VB)), [s1, s2], dict=True)[0]
eqv('d007.3', PA + sol[s1] * kw(1, VA), K)
R.eq('d007.4', VA.dot(VA), w ** 2 * (PA - K).dot(PA - K))
# ruota che rotola: O = (R s, R), punto materiale all'angolo β − s(t)
Rr2 = sp.Symbol('R_d', positive=True)
sr = f('s')
bb = sp.Symbol('b', real=True)
Od = Mx([Rr2 * sr, Rr2])
Pd = Od + Rr2 * Mx([sp.cos(bb - sr), sp.sin(bb - sr)])
VP_, aP_ = d(Pd), d(Pd, 2)
VK = VP_.subs(bb, sr - sp.pi / 2)
VBd = VP_.subs(bb, sr + sp.pi)
aK = aP_.subs(bb, sr - sp.pi / 2)
R.eq('d007.5', VK.dot(VK), 0)
R.eq('d007.5', d(Od).dot(d(Od)), Rr2 ** 2 * d(sr) ** 2)
R.eq('d007.5', VBd.dot(VBd), 2 * Rr2 ** 2 * d(sr) ** 2)
# asta vincolata: y_A = L sin α con ẏ_A = −V_A costante, x_B = L cos α
La, VAs = sp.symbols('L V_A', positive=True)
al = f('alpha')
ad = -VAs / (La * sp.cos(al))  # da L cos α α̇ = −V_A
add = sp.diff(ad, t).subs(sp.Derivative(al, t), ad)
sub1 = lambda ex: ex.subs(sp.Derivative(al, (t, 2)), add).subs(sp.Derivative(al, t), ad)
xB_ = La * sp.cos(al)
R.eq('d007.6', sub1(d(La * sp.sin(al))), -VAs)
R.eq('d007.6', sub1(d(xB_)), VAs * sp.tan(al))
R.eq('d007.6', -ad, VAs / (La * sp.cos(al)))
eqv('d007.7', aK, -kw(-d(sr), d(Od)))
wa = -ad
R.eq('d007.8', sub1(d(xB_, 2)), -La * wa ** 2 / sp.cos(al))
R.eq('d007.8', -add, -wa ** 2 * sp.tan(al))
# quadrilatero (pp. 28–29): velocità angolari dal vincolo di chiusura derivato, CIR della biella = AB ∩ DC
q1, q2, q3, w1q, w2q, w3q = sp.symbols('q1 q2 q3 w1 w2 w3', real=True)
L1, L2, L3 = sp.symbols('L1 L2 L3', positive=True)
eq_ = lambda q: Mx([sp.cos(q), sp.sin(q)])
Bq_ = L1 * eq_(q1)
Cq_ = Bq_ + L2 * eq_(q2)
Dq_ = Cq_ + L3 * eq_(q3)  # D fisso: la derivata della chiusura è nulla
vinc = w1q * L1 * kw(1, eq_(q1)) + w2q * L2 * kw(1, eq_(q2)) + w3q * L3 * kw(1, eq_(q3))
solq = sp.solve(list(vinc), [w2q, w3q], dict=True)[0]
sq, uq_ = sp.symbols('s u', real=True)
solK = sp.solve(list(sq * eq_(q1) - Dq_ - uq_ * eq_(q3)), [sq, uq_], dict=True)[0]
Kq_ = solK[sq] * eq_(q1)
VBq = kw(w1q, Bq_)
VCq = kw(w3q, Cq_ - Dq_).subs(solq)
eqv('d007.9', VBq, kw(w2q, Bq_ - Kq_).subs(solq))
eqv('d007.9', VCq, kw(w2q, Cq_ - Kq_).subs(solq))
R.risultato('d007', VA.dot(VA) - w ** 2 * (PA - K).dot(PA - K), 0)

# ================================================================ manovellismo (d010–d013, pp. 25–32)
rm, lm, wm = sp.symbols('r l omega_1', positive=True)
lam = rm / lm
thm = wm * t  # ω₁ costante
Bm = Mx([rm * sp.cos(thm), rm * sp.sin(thm)])
xs = sp.Symbol('x_s', real=True)
radici = sp.solve(sp.Eq((xs - Bm[0]) ** 2 + Bm[1] ** 2, lm ** 2), xs)  # |C − B| = l con C sull'asse x
xCm = [q for q in radici if sp.simplify(q - Bm[0] - sp.sqrt(lm ** 2 - Bm[1] ** 2)) == 0][0]
Cm = Mx([xCm, 0])
sg_, cg_ = Bm[1] / lm, (xCm - Bm[0]) / lm  # seno e coseno dell'angolo di biella letti dalla geometria
s2 = sp.sin(thm) ** 2
# d010 posizione
R.eq('d010.1', xCm, rm * sp.cos(thm) + lm * cg_)
R.enunciato('d010.2', 'θ = ω₁t: ipotesi di velocità costante')
R.eq('d010.3', lm * sg_, rm * sp.sin(thm))
R.eq('d010.4', cg_ ** 2, 1 - lam ** 2 * s2)
R.eq('d010.5', xCm, rm * sp.cos(thm) + lm * sp.sqrt(1 - lam ** 2 * s2))
R.eq('d010.5', xCm, rm * sp.cos(thm) + sp.sqrt(lm ** 2 - rm ** 2 * s2))
R.eq('d010.6', xCm.subs(t, 0) - xCm.subs(t, sp.pi / wm), 2 * rm)
R.risultato('d010', xCm, rm * sp.cos(thm) + lm * sp.sqrt(1 - lam ** 2 * s2))
# d013 legge approssimata: sviluppo in serie in λ (r = λ l)
Lm = sp.Symbol('lambda', positive=True)
S2 = sp.Symbol('S2', positive=True)  # sin²θ
R.eq('d013.1', cg_ ** 2, 1 - lam ** 2 * s2)
R.eq('d013.2', 1 - lam ** 2 * s2, (1 - lam ** 2 / 2 * s2) ** 2 - lam ** 4 / 4 * s2 ** 2)
R.eq('d013.3', sp.series(sp.sqrt(1 - Lm ** 2 * S2), Lm, 0, 4).removeO(), 1 - Lm ** 2 / 2 * S2)
xser = sp.series((Lm * lm * sp.cos(thm) + lm * sp.sqrt(1 - Lm ** 2 * sp.sin(thm) ** 2)), Lm, 0, 4).removeO()
xap = rm * sp.cos(thm) + lm * (1 - lam ** 2 / 2 * s2)  # legge approssimata (p. 32)
R.eq('d013.4', xser, xap.subs(rm, Lm * lm))
R.eq('d013.5', xap, lm - rm ** 2 / (4 * lm) + rm * sp.cos(thm) + rm ** 2 / (4 * lm) * sp.cos(2 * thm))
R.risultato('d013', xser, xap.subs(rm, Lm * lm))
# d011 velocità
R.eq('d011.1', d(xap), -rm * wm * sp.sin(thm) - lm * lam ** 2 * wm * sp.sin(thm) * sp.cos(thm))
R.eq('d011.2', d(xap), -rm * wm * (sp.sin(thm) + lam / 2 * sp.sin(2 * thm)))
gam = sp.asin(lam * sp.sin(thm))
R.eq('d011.3', d(gam), lam * wm * sp.cos(thm) / sp.sqrt(1 - lam ** 2 * s2))
R.eq('d011.4', d(xCm), -rm * wm * (sp.sin(thm) * sp.sqrt(1 - lam ** 2 * s2) + sp.cos(thm) * lam * sp.sin(thm)) / sp.sqrt(1 - lam ** 2 * s2))
R.eq('d011.4', sp.expand_trig(sp.sin(thm + gam)), sp.sin(thm) * sp.sqrt(1 - lam ** 2 * s2) + sp.cos(thm) * lam * sp.sin(thm))
Ky_ = sp.Symbol('K_y', real=True)
Kyv = sp.solve(sp.Eq(Ky_, xCm * sp.tan(thm)), Ky_)[0]  # retta AB (y = x tan θ) per x = x_C
Km = Mx([xCm, Kyv])
w2 = d(sp.atan((0 - Bm[1]) / (xCm - Bm[0])))  # velocità angolare della biella (x_C − x_B > 0)
eqv('d011.5', Mx([d(xCm), 0]), kw(w2, Cm - Km))
eqv('d011.5', d(Bm), kw(w2, Bm - Km))
R.eq('d011.6', d(xCm).subs(t, 0), 0)
R.eq('d011.6', d(xCm).subs(t, sp.pi / wm), 0)
R.risultato('d011', d(xap), -rm * wm * (sp.sin(thm) + lam / 2 * sp.sin(2 * thm)))
# d012 accelerazione
eqv('d012.1', d(Bm, 2), -wm ** 2 * Bm)
eqv('d012.2', Mx([d(xCm, 2), 0]), d(Bm, 2) + kw(d(w2), Cm - Bm) - w2 ** 2 * (Cm - Bm))
R.eq('d012.3', d(xap, 2), -rm * wm ** 2 * (sp.cos(thm) + lam * sp.cos(2 * thm)))
R.enunciato('d012.4', 'nomi delle due armoniche')
R.eq('d012.5', d(xCm, 2).subs(t, 0), -rm * wm ** 2 * (1 + lam))
R.eq('d012.5', d(xCm, 2).subs(t, sp.pi / wm), rm * wm ** 2 * (1 - lam))
R.risultato('d012', d(xap, 2), -rm * wm ** 2 * (sp.cos(thm) + lam * sp.cos(2 * thm)))

# ================================================================ glifo (d008–d009, pp. 64–65; rapido ritorno dedotto)
dg, dl_ = sp.symbols('d delta', positive=True)  # δ ∈ (0, π/2), r = d sin δ
rg = dg * sp.sin(dl_)
tg = sp.Symbol('theta', real=True)
Bg = Mx([rg * sp.cos(tg), rg * sp.sin(tg)])
Cg = Mx([0, -dg])
psi_g = sp.atan2(Bg[1] + dg, Bg[0])
dpsi = sp.simplify(sp.diff(psi_g, tg))
estremi = sp.solve(sp.Eq(sp.numer(sp.together(dpsi)), 0), tg)  # zeri di dψ/dθ
th1, th2 = -dl_, sp.pi + dl_
R.eq('d008.1', dpsi.subs(tg, th1), 0)
R.eq('d008.1', dpsi.subs(tg, th2), 0)
R.eq('d008.2', Bg.subs(tg, th1).dot((Bg - Cg).subs(tg, th1)), 0)
CA = -Cg
CBe = (Bg - Cg).subs(tg, th1)
R.eq('d008.3', cr(CA, CBe) ** 2 / (CA.dot(CA) * CBe.dot(CBe)), (rg / dg) ** 2)
estremi = [e.subs(sp.asin(sp.sin(dl_)), dl_) for e in estremi]  # δ ∈ (0, π/2) perché r < d
ok4 = all(any(sp.simplify(e - x) == 0 for e in estremi) for x in (th1, th2))
R.eq('d008.4', 1 if ok4 else 0, 1)
lenta, rapida = th2 - th1, 2 * sp.pi - (th2 - th1)
R.eq('d008.5', lenta, sp.pi + 2 * dl_)
R.eq('d008.5', rapida, sp.pi - 2 * dl_)
wg = sp.Symbol('omega_1', positive=True)
R.eq('d008.6', (lenta / wg) / (rapida / wg), (sp.pi + 2 * dl_) / (sp.pi - 2 * dl_))
# escursione del glifo uguale nei due versi: ψ₂ − ψ₁ = 2δ (tan ψ₁ = cot δ, tan ψ₂ = −cot δ)
CB2 = (Bg - Cg).subs(tg, th2)
R.eq('d008.7', CBe[1] / CBe[0], sp.cot(dl_))
R.eq('d008.7', CB2[1] / CB2[0], -sp.cot(dl_))
R.risultato('d008', (lenta / wg) / (rapida / wg), (sp.pi + 2 * dl_) / (sp.pi - 2 * dl_))

rG, dG, LG, wG = sp.symbols('r d L omega_1', positive=True)
thG = wG * t
BG = Mx([rG * sp.cos(thG), rG * sp.sin(thG)])
CG = Mx([0, -dG])
xg, yg = BG[0], BG[1] + dG
psiG = sp.atan2(yg, xg)
rhoG = sp.sqrt(xg ** 2 + yg ** 2)
uG = (BG - CG) / rhoG
eqv('d009.1', d(BG), kw(wG, BG))
eqv('d009.2', d(BG), kw(d(psiG), BG - CG) + d(rhoG) * uG)
R.eq('d009.3', d(psiG), wG * rG * sp.cos(thG - psiG) / rhoG)
R.eq('d009.3', d(rhoG), -wG * rG * sp.sin(thG - psiG))
DG = CG + LG * Mx([sp.cos(psiG), sp.sin(psiG)])
eqv('d009.4', d(DG), kw(d(psiG), DG - CG))
# biella DE e corsoio su y = y_E, con D(t) generico: |E − D| = l₃
l3s, yEs, Fs = sp.symbols('l_3 y_E F', positive=True)
Dx_, Dy_ = f('D_x'), f('D_y')
xE_ = Dx_ - sp.sqrt(l3s ** 2 - (Dy_ - yEs) ** 2)
b3 = sp.atan((yEs - Dy_) / (xE_ - Dx_))  # angolo della biella (E − D verso sinistra: stesso valore di tan)
R.eq('d009.5', d(xE_), d(Dx_) - d(b3) * (yEs - Dy_))
# forze vive verificate con la statica membro per membro (masse nulle, niente attrito) in una configurazione
# numerica esatta: corsoio → biella a due forze → glifo (perno ⊥ cava) → manovella
th0 = sp.Rational(7, 10)
val = {rG: sp.Rational(1, 2), dG: 1, LG: sp.Rational(11, 5), wG: sp.Rational(3, 2), t: th0 / sp.Rational(3, 2)}
Bn, Cn, Dn = BG.subs(val), CG.subs(val), DG.subs(val)
l3n, yEn, Fn = sp.Rational(6, 5), sp.Rational(9, 10) * sp.Rational(11, 5) - 1, sp.Integer(100)
En = Mx([Dn[0] - sp.sqrt(l3n ** 2 - (Dn[1] - yEn) ** 2), yEn])
eDE = (En - Dn) / l3n
Pb = sp.Symbol('P')  # spinta della biella sul corsoio lungo D→E
Pn = sp.solve(sp.Eq(Fn + Pb * eDE[0], 0), Pb)[0]  # equilibrio orizzontale del corsoio (R₄ verticale)
Nn_ = sp.Symbol('N')
nG = kw(1, (Bn - Cn) / sp.sqrt((Bn - Cn).dot(Bn - Cn)))
Nn = sp.solve(sp.Eq(cr(Dn - Cn, -Pn * eDE) + cr(Bn - Cn, Nn_ * nG), 0), Nn_)[0]  # momenti sul glifo rispetto a C
C1n = -cr(Bn, -Nn * nG)  # momenti sulla manovella rispetto ad A
VEn = sp.diff(DG[0] - sp.sqrt(l3s ** 2 - (DG[1] - yEs) ** 2), t).subs({l3s: l3n, yEs: yEn}).subs(val)
R.eq('d009.6', sp.nsimplify(sp.N(Fn * VEn + C1n * val[wG], 60), tolerance=1e-50), 0)
R.risultato('d009', d(psiG), wG * rG * sp.cos(thG - psiG) / rhoG)

# ================================================================ moto relativo (d014–d015, pp. 33–39)
O1 = Mx([f('O_x'), f('O_y')])
thr, xr, yr = f('theta_r'), f('x_r'), f('y_r')
i1 = Mx([sp.cos(thr), sp.sin(thr)])
j1 = Mx([-sp.sin(thr), sp.cos(thr)])
PO = xr * i1 + yr * j1
Pr = O1 + PO
wr = d(thr)
Vrel = d(xr) * i1 + d(yr) * j1
arel = d(xr, 2) * i1 + d(yr, 2) * j1
eqv('d014.1', Pr, O1 + PO)
eqv('d014.2', Pr - O1, xr * i1 + yr * j1)
eqv('d014.3', d(Pr), d(O1) + d(xr) * i1 + xr * d(i1) + d(yr) * j1 + yr * d(j1))
eqv('d014.4', xr * d(i1) + yr * d(j1), kw(wr, PO))
eqv('d014.5', d(Pr), d(O1) + kw(wr, PO) + Vrel)
R.enunciato('d014.6', 'continuità (olio incomprimibile): q = S dx/dt')
# pistone del ribaltabile: cassone φ₃(t) attorno a O, cilindro attorno ad A
bP, xAP, yAP = sp.symbols('b x_A y_A', real=True)
ph3 = f('phi_3')
BP = bP * Mx([sp.cos(ph3), sp.sin(ph3)])
AP = Mx([xAP, yAP])
BAP = BP - AP
ellP = sp.sqrt(BAP.dot(BAP))
psi1 = sp.atan2(BAP[1], BAP[0])
uP = BAP / ellP
eqv('d014.7', d(BP), d(ellP) * uP + kw(d(psi1), BAP))
eqv('d014.8', d(ellP) * uP + kw(d(psi1), BAP), kw(d(ph3), BP))
R.risultato('d014', (d(Pr) - d(O1) - kw(wr, PO) - Vrel).applyfunc(sp.simplify).norm(), 0)

eqv('d015.1', d(Pr, 2), d(O1, 2) + kw(d(wr), PO) + kw(wr, d(PO)) + d(xr, 2) * i1 + d(xr) * d(i1) + d(yr, 2) * j1 + d(yr) * d(j1))
eqv('d015.2', d(PO), kw(wr, PO) + Vrel)
eqv('d015.3', d(xr) * d(i1) + d(yr) * d(j1), kw(wr, Vrel))
eqv('d015.4', kw(wr, kw(wr, PO)), -wr ** 2 * PO)
aP_r = d(O1, 2) + kw(d(wr), PO) - wr ** 2 * PO + arel + 2 * kw(wr, Vrel)
eqv('d015.5', d(Pr, 2), aP_r)
eqv('d015.6', d(Pr, 2), aP_r)
# portata costante: ℓ̈ = 0 fissa φ̈₃; poi le due espressioni di a_B coincidono
p3dd = sp.Symbol('p3dd')
ell2 = sp.diff(ellP, t, 2).subs(sp.Derivative(ph3, (t, 2)), p3dd)
p3sol = sp.solve(sp.Eq(ell2, 0), p3dd)[0]
sub3 = lambda e: e.subs(sp.Derivative(ph3, (t, 2)), p3sol)
lhs7 = kw(sub3(d(psi1, 2)), BAP) - d(psi1) ** 2 * BAP + 2 * kw(d(psi1), d(ellP) * uP)
rhs7 = kw(p3sol, BP) - d(ph3) ** 2 * BP
eqv('d015.7', lhs7, rhs7)
acor = 2 * kw(d(psi1), d(ellP) * uP)
R.eq('d015.8', acor.dot(acor), 4 * d(psi1) ** 2 * d(ellP) ** 2)
R.risultato('d015', (d(Pr, 2) - aP_r).applyfunc(sp.simplify).norm(), 0)

# ================================================================ cinematica analitica (d016, pp. 40–44)
I = sp.I
Vs = sp.symbols('V_1:5', positive=True)
p1, p2, p3 = f('varphi_1'), f('varphi_2'), f('varphi_3')
p4 = sp.Symbol('varphi_4', real=True)
phs = [p1, p2, p3, p4]
Vg, pg = sp.symbols('V varphi', real=True)
R.eq('d016.1', sp.expand_complex(Vg * sp.exp(I * pg)), Vg * sp.cos(pg) + I * Vg * sp.sin(pg))
# chiusura geometrica: i vettori AB, BC, CD, DA sommano a zero (A, B, C, D punti qualsiasi)
zA, zB, zC, zD = sp.symbols('z_A z_B z_C z_D')
R.eq('d016.2', (zB - zA) + (zC - zB) + (zD - zC) + (zA - zD), 0)
chi = sum(Vj * sp.exp(I * q) for Vj, q in zip(Vs, phs))
Re_, Im_ = sum(Vj * sp.cos(q) for Vj, q in zip(Vs, phs)), sum(Vj * sp.sin(q) for Vj, q in zip(Vs, phs))
R.eq('d016.3', sp.re(sp.expand_complex(chi)), Re_)
R.eq('d016.3', sp.im(sp.expand_complex(chi)), Im_)
R.enunciato('d016.4', 'conteggio delle incognite')
R.eq('d016.5', d(Re_), sum(-Vj * sp.sin(q) * d(q) for Vj, q in zip(Vs[:3], phs[:3])))
R.eq('d016.5', d(Im_), sum(Vj * sp.cos(q) * d(q) for Vj, q in zip(Vs[:3], phs[:3])))
a2, a3, a1 = sp.symbols('a_2 a_3 a_1', real=True)
P1, P2, P3 = sp.symbols('P_1 P_2 P_3', real=True)
solv = sp.solve([-Vs[0] * sp.sin(P1) * a1 - Vs[1] * sp.sin(P2) * a2 - Vs[2] * sp.sin(P3) * a3,
                 Vs[0] * sp.cos(P1) * a1 + Vs[1] * sp.cos(P2) * a2 + Vs[2] * sp.cos(P3) * a3], [a2, a3], dict=True)[0]
R.eq('d016.6', solv[a2], -Vs[0] * a1 * sp.sin(P1 - P3) / (Vs[1] * sp.sin(P2 - P3)))
R.eq('d016.6', solv[a3], -Vs[0] * a1 * sp.sin(P1 - P2) / (Vs[2] * sp.sin(P3 - P2)))
R.eq('d016.7', d(Re_, 2), sum(-Vj * sp.cos(q) * d(q) ** 2 - Vj * sp.sin(q) * d(q, 2) for Vj, q in zip(Vs[:3], phs[:3])))
V3m = f('V_3')
Rem = Vs[0] * sp.cos(p1) + Vs[1] * sp.cos(p2) + V3m * sp.cos(sp.pi)
Imm = Vs[0] * sp.sin(p1) + Vs[1] * sp.sin(p2) + V3m * sp.sin(sp.pi)
R.eq('d016.8', d(Rem), -Vs[0] * sp.sin(p1) * d(p1) - Vs[1] * sp.sin(p2) * d(p2) + d(V3m) * sp.cos(sp.pi))
R.eq('d016.8', d(Imm), Vs[0] * sp.cos(p1) * d(p1) + Vs[1] * sp.cos(p2) * d(p2) + d(V3m) * sp.sin(sp.pi))
R.risultato('d016', sp.re(sp.expand_complex(chi)), Re_)

# ================================================================ statica (d017–d018, pp. 45–54)
rs, ls, Fs_, ws_ = sp.symbols('r l F omega_1', positive=True)
ths = sp.Symbol('theta', positive=True)  # 0 < θ < π
Bs = Mx([rs * sp.cos(ths), rs * sp.sin(ths)])
xCs = Bs[0] + sp.sqrt(ls ** 2 - Bs[1] ** 2)
Cs = Mx([xCs, 0])
us = (Cs - Bs) / ls
cgs, sgs = us[0], -us[1]  # cos γ e sin γ della geometria
R.enunciato('d017.1', 'equazioni cardinali della statica')
R.enunciato('d017.2', 'conteggio delle equazioni')
# corpo a due forze (biella): incognite F₁₂ in B e F₃₂ in C, tre equazioni
f12x, f12y, f32x, f32y = sp.symbols('f12x f12y f32x f32y')
sol2 = sp.solve([f12x + f32x, f12y + f32y, cr(Cs - Bs, Mx([f32x, f32y]))], [f12x, f12y, f32y], dict=True)[0]
F32s = Mx([f32x, sol2[f32y]])
R.eq('d017.3', cr(Cs - Bs, F32s), 0)
# corpo a tre forze (forza F_v in P₂ sulla biella, F₃₂ verticale in C, F₁₂ in B)
P2x, P2y, Fvx, Fvy, Bx_, By_, Cx_ = sp.symbols('P2x P2y Fvx Fvy Bx By Cx', real=True)
q32 = sp.Symbol('q32')
sol3 = sp.solve([f12x + Fvx, f12y + Fvy + q32, cr(Mx([P2x - Bx_, P2y - By_]), Mx([Fvx, Fvy])) + cr(Mx([Cx_ - Bx_, -By_]), Mx([0, q32]))], [f12x, f12y, q32], dict=True)[0]
tH = (Cx_ - P2x) / Fvx
Hs = Mx([P2x + tH * Fvx, P2y + tH * Fvy])
R.eq('d017.4', cr(Mx([sol3[f12x], sol3[f12y]]), Hs - Mx([Bx_, By_])), 0)
# pistone: −F x̂ + P û + N ŷ = 0
Pp_, Np_ = sp.symbols('P N')
solp = sp.solve([-Fs_ + Pp_ * us[0], Pp_ * us[1] + Np_], [Pp_, Np_], dict=True)[0]
R.eq('d017.5', solp[Pp_], Fs_ / cgs)
R.eq('d017.5', solp[Np_], Fs_ * sgs / cgs)
F21s = -solp[Pp_] * us
C1s_ = sp.Symbol('C1')
C1s = sp.solve(cr(Bs, F21s) + C1s_, C1s_)[0]  # momenti sulla manovella rispetto ad A
R.eq('d017.6', C1s, -solp[Pp_] * rs * (sp.sin(ths) * cgs + sp.cos(ths) * sgs))
R.eq('d017.6', -cr(us, -Bs), rs * (sp.sin(ths) * cgs + sp.cos(ths) * sgs))  # braccio b = |u ∧ (A − B)|
xCt = xCs.subs(ths, ws_ * t)
R.eq('d017.7', C1s.subs(ths, ws_ * t) * ws_, Fs_ * d(xCt))
R.risultato('d017', C1s, -Fs_ / cgs * rs * (sp.sin(ths) * cgs + sp.cos(ths) * sgs))

r1, t1, xD, yD, a3, c3, t3 = sp.symbols('r_1 t_1 x_D y_D a_3 c_3 t_3', real=True)
Bq = Mx([r1 * sp.cos(t1), r1 * sp.sin(t1)])
Dq = Mx([xD, yD])
e3 = Mx([sp.cos(a3), sp.sin(a3)])
Cq, Tq = Dq + c3 * e3, Dq + t3 * e3
uq = (Cq - Bq) / sp.sqrt((Cq - Bq).dot(Cq - Bq))
Pq_ = sp.Symbol('P')
Pq = sp.solve(cr(Tq - Dq, -Fs_ * uq) + cr(Cq - Dq, Pq_ * uq), Pq_)[0]  # momenti sul corpo 3 rispetto a D
R.enunciato('d018.1', 'terzo principio della dinamica')
sol2q = sp.solve([f12x + f32x, f12y + f32y, cr(Cq - Bq, Mx([f32x, f32y]))], [f12x, f12y, f32y], dict=True)[0]
R.eq('d018.2', cr(Mx([f32x, sol2q[f32y]]), Cq - Bq), 0)
RDq = -(-Fs_ * uq + Pq * uq)
R.eq('d018.3', cr(RDq, uq), 0)
R.eq('d018.4', Pq, Fs_ * t3 / c3)
R.eq('d018.4', cr(uq, Tq - Dq) / cr(uq, Cq - Dq), t3 / c3)  # b_f / b
R.eq('d018.5', RDq.dot(RDq), (Pq - Fs_) ** 2)
C1q_ = sp.Symbol('C1')
C1q = sp.solve(cr(Bq, Pq * -uq) + C1q_, C1q_)[0]
R.eq('d018.6', C1q, Pq * cr(Bq, uq))
R.risultato('d018', Pq, Fs_ * t3 / c3)

# ================================================================ dinamica (d019–d020, pp. 55–61)
Ld, VAd, Md, IGd, gd_ = sp.symbols('L V_A M I_G g', positive=True)
ald = f('alpha')
add_ = -VAd / (Ld * sp.cos(ald))
addd = sp.diff(add_, t).subs(sp.Derivative(ald, t), add_)
sb = lambda e: e.subs(sp.Derivative(ald, (t, 2)), addd).subs(sp.Derivative(ald, t), add_)
Ad = Mx([0, Ld * sp.sin(ald)])
Bd = Mx([Ld * sp.cos(ald), 0])
Gd = (Ad + Bd) / 2
aGd = Mx([sb(d(Gd[0], 2)), sb(d(Gd[1], 2))])
w2d = -add_  # ω₂ = −α̇
w2dd = -addd
g1, g2, g3 = sp.symbols('F12x F12y F32')
solNE = sp.solve([g1 - Md * aGd[0], g2 + g3 - Md * gd_ - Md * aGd[1], cr(Ad - Gd, Mx([g1, g2])) + cr(Bd - Gd, Mx([0, g3])) - IGd * w2dd], [g1, g2, g3], dict=True)[0]
R.enunciato('d019.1', 'equazioni cardinali della dinamica')
R.eq('d019.2', solNE[g1] - Md * aGd[0] + sp.sqrt(2) * (solNE[g2] + solNE[g3] - Md * gd_ - Md * aGd[1]), 0)
R.eq('d019.3', w2d, VAd / (Ld * sp.cos(ald)))
R.eq('d019.3', sb(d(Bd[0])), VAd * sp.tan(ald))
R.eq('d019.4', sb(d(Bd[0], 2)), -VAd ** 2 / (Ld * sp.cos(ald) ** 3))
R.eq('d019.4', w2dd, -VAd ** 2 * sp.sin(ald) / (Ld ** 2 * sp.cos(ald) ** 3))
eqv('d019.5', aGd, Mx([sb(d(Bd[0], 2)) / 2, 0]))
Fin_, Cin_ = -Md * aGd[0], -IGd * w2dd
AGd, ABd = Ld / 2, Ld
R.eq('d019.6', solNE[g3], (Md * gd_ * AGd * sp.cos(ald) - Fin_ * AGd * sp.sin(ald) - Cin_) / (ABd * sp.cos(ald)))
R.eq('d019.7', solNE[g1], -Fin_)
R.eq('d019.7', solNE[g2], Md * gd_ - solNE[g3])
R.risultato('d019', solNE[g3], (Md * gd_ * AGd * sp.cos(ald) - Fin_ * AGd * sp.sin(ald) - Cin_) / (ABd * sp.cos(ald)))

phO = f('phi')
ms_ = sp.symbols('m_1:4', positive=True)
rh = sp.symbols('rho_1:4', positive=True)
bt = sp.symbols('beta_1:4', real=True)
Pk = [rh[k] * Mx([sp.cos(phO + bt[k]), sp.sin(phO + bt[k])]) for k in range(3)]
MO = sum(ms_)
GO = sum((ms_[k] * Pk[k] for k in range(3)), Mx([0, 0])) / MO
aGO = d(GO, 2)
IGO = sum(ms_[k] * (Pk[k] - GO).dot(Pk[k] - GO) for k in range(3))
IOO = sum(ms_[k] * Pk[k].dot(Pk[k]) for k in range(3))
Cvero = sum(cr(Pk[k], -ms_[k] * d(Pk[k], 2)) for k in range(3))
wO, wdO = d(phO), d(phO, 2)
eqv('d020.1', aGO, -wO ** 2 * GO + kw(wdO, GO))
eqv('d020.2', -MO * aGO, MO * wO ** 2 * GO - MO * kw(wdO, GO))
R.eq('d020.3', Cvero, -IGO * wdO + cr(GO, -MO * aGO))
R.eq('d020.4', cr(GO, MO * wO ** 2 * GO), 0)
R.eq('d020.4', cr(GO, -MO * kw(wdO, GO)), -MO * GO.dot(GO) * wdO)
R.eq('d020.5', Cvero, -(IGO + MO * GO.dot(GO)) * wdO)
R.eq('d020.5', IOO, IGO + MO * GO.dot(GO))
R.risultato('d020', Cvero, -IOO * wdO)

# ================================================================ lavoro, potenza, forze vive, energia cinetica (d021–d023, pp. 61–66)
Fx_, Fy_, Vx_, Vy_, dt_ = sp.symbols('F_x F_y V_x V_y dt', real=True)
Fv_, Vv_ = Mx([Fx_, Fy_]), Mx([Vx_, Vy_])
cth2 = Fv_.dot(Vv_) ** 2 / (cr(Fv_, Vv_) ** 2 + Fv_.dot(Vv_) ** 2)  # cos²θ con θ = atan2(F∧V, F·V)
R.enunciato('d021.1', 'definizione di lavoro')
R.eq('d021.2', (Fv_.dot(Vv_) * dt_) ** 2, Fv_.dot(Fv_) * Vv_.dot(Vv_) * dt_ ** 2 * cth2)
R.eq('d021.3', Fv_.dot(Vv_) ** 2, Fv_.dot(Fv_) * Vv_.dot(Vv_) * cth2)
Gx_, Gy_, VGx_, VGy_, om_, Px_, Py_, Qx_, Qy_ = sp.symbols('G_x G_y V_Gx V_Gy omega P_x P_y Q_x Q_y', real=True)
Gv, VGv, Pv_, Qv_ = Mx([Gx_, Gy_]), Mx([VGx_, VGy_]), Mx([Px_, Py_]), Mx([Qx_, Qy_])
VPv, VQv = VGv + kw(om_, Pv_ - Gv), VGv + kw(om_, Qv_ - Gv)
R.eq('d021.4', Fv_.dot(VPv) - Fv_.dot(VQv), cr(Pv_ - Qv_, Fv_) * om_)
R.risultato('d021', Fv_.dot(VPv) - Fv_.dot(VQv), cr(Pv_ - Qv_, Fv_) * om_)

kk = sp.Symbol('k', real=True)
R.enunciato('d022.1', 'enunciato del teorema (p. 63)')
R.eq('d022.2', (kk * (Pv_ - Qv_)).dot(kw(om_, Pv_ - Qv_)), 0)
Mv, Iv = sp.symbols('M I_G', positive=True)
VGt = Mx([f('V_Gx'), f('V_Gy')])
omt = f('omega')
Ecin = Mv / 2 * VGt.dot(VGt) + Iv / 2 * omt ** 2
R.eq('d022.3', d(Ecin), Mv * VGt.dot(d(VGt)) + Iv * omt * d(omt))
Fk = [Mx(sp.symbols(f'F{k}x F{k}y', real=True)) for k in range(3)]
Pkk = [Mx(sp.symbols(f'P{k}x P{k}y', real=True)) for k in range(3)]
Cc = sp.Symbol('C', real=True)
aGv = sum(Fk, Mx([0, 0])) / Mv
wdv = (sum(cr(Pkk[k] - Gv, Fk[k]) for k in range(3)) + Cc) / Iv  # cardinali della dinamica
potv = sum(Fk[k].dot(VGv + kw(om_, Pkk[k] - Gv)) for k in range(3)) + Cc * om_
R.eq('d022.4', potv, Mv * VGv.dot(aGv) + Iv * om_ * wdv)
R.eq('d022.5', potv, Mv * VGv.dot(aGv) + Iv * om_ * wdv)
hh_, ll_ = sp.symbols('h ell', positive=True)
Hp = ll_ * Mx([sp.cos(phO), sp.sin(phO)])
Ep = Hp - Mx([0, hh_])
R.eq('d022.6', d(sp.atan2((Hp - Ep)[1], (Hp - Ep)[0])), 0)
R.risultato('d022', potv, Mv * VGv.dot(aGv) + Iv * om_ * wdv)

mm = sp.symbols('mu_1:4', positive=True)
Pe = [Mx(sp.symbols(f'X{k} Y{k}', real=True)) for k in range(3)]
VOx_, VOy_ = sp.symbols('V_Ox V_Oy', real=True)
Vk = [Mx([VOx_, VOy_]) + kw(om_, Pe[k]) for k in range(3)]  # moto rigido
Me = sum(mm)
Ge = sum((mm[k] * Pe[k] for k in range(3)), Mx([0, 0])) / Me
VGe = sum((mm[k] * Vk[k] for k in range(3)), Mx([0, 0])) / Me
Ee = sum(mm[k] * Vk[k].dot(Vk[k]) for k in range(3)) / 2
IGe = sum(mm[k] * (Pe[k] - Ge).dot(Pe[k] - Ge) for k in range(3))
mista_ = sum(mm[k] * VGe.dot(kw(om_, Pe[k] - Ge)) for k in range(3))
quad_ = sum(mm[k] * kw(om_, Pe[k] - Ge).dot(kw(om_, Pe[k] - Ge)) for k in range(3))
R.enunciato('d023.1', 'definizione di energia cinetica')
eqv('d023.2', Vk[0], VGe + kw(om_, Pe[0] - Ge))
R.eq('d023.3', 2 * Ee, Me * VGe.dot(VGe) + 2 * mista_ + quad_)
eqv('d023.4', sum((mm[k] * (Pe[k] - Ge) for k in range(3)), Mx([0, 0])), Mx([0, 0]))
R.eq('d023.4', mista_, 0)
R.eq('d023.5', quad_, om_ ** 2 * IGe)
R.eq('d023.6', Ee, Me * VGe.dot(VGe) / 2 + IGe * om_ ** 2 / 2)
R.risultato('d023', Ee, Me * VGe.dot(VGe) / 2 + IGe * om_ ** 2 / 2)

R.salva()
