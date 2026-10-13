"""Verifica simbolica del capitolo C6 (accoppiamento motore–carico). Modello ricostruito dai principi:
teorema delle forze vive (T.F.V.) scritto come bilancio di potenze, equazioni differenziali risolte con dsolve,
massimi con diff/solve, integrali con integrate. Nessuna formula è copiata dal codice TypeScript.
Dispensa pp. 193–206; libro (scansione) pp. 117–119 per l'energia dell'innesto."""
from comune import Registro, sp

R = Registro('C6')
t = sp.Symbol('t', nonnegative=True)
Im, Iu, I = sp.symbols('I_m I_u I', positive=True)
w = sp.Function('omega')

# ================================================================ d101 equazione dell'accoppiamento diretto (p. 197)
Cm, Cu = sp.symbols('C_m C_u', real=True)
W = sp.Symbol('omega', positive=True)
Wd = sp.Symbol('omegadot', real=True)
# T.F.V.: somma delle potenze = derivata dell'energia cinetica; collegamento rigido: una sola ω
E = sp.Rational(1, 2) * (Im + Iu) * w(t) ** 2
dEdt = sp.diff(E, t).subs(sp.Derivative(w(t), t), Wd).subs(w(t), W)
R.enunciato('d101.1', 'collegamento rigido: ω_m = ω_u')
R.enunciato('d101.2', 'teorema delle forze vive')
R.eq('d101.3', Cm * W - Cu * W, Im * Wd * W + Iu * Wd * W, ass={Wd: sp.solve(sp.Eq(Cm * W - Cu * W, dEdt), Wd)[0]})
wd101 = sp.solve(sp.Eq(Cm * W - Cu * W, dEdt), Wd)[0]
R.eq('d101.4', wd101, (Cm - Cu) / (Im + Iu))
R.eq('d101.5', (Im + Iu) * wd101, Cm - Cu)
R.risultato('d101', wd101, (Cm - Cu) / (Im + Iu))

# ================================================================ d102 punto di regime e avviamento (pp. 197–199)
Cm0, Km, Cu0, wS, CA = sp.symbols('C_m0 K_m C_u0 omega_S C_A', positive=True)
# ω̇ = (C_m(ω) − C_u(ω))/I: a regime ω̇ = 0
Cmf, Cuf = sp.Function('C_m'), sp.Function('C_u')
R.eq('d102.1', I * ((Cmf(W) - Cuf(W)) / I), Cmf(W) - Cuf(W))
wR = sp.Symbol('omega_R', positive=True)
# punto di regime del caso lineare (motore c.c. e carico costante): ω̇(ω_R) = 0 risolto
wP = sp.solve(sp.Eq((Cm0 - Km * W - Cu0) / I, 0), W)[0]
R.eq('d102.2', Cm0 - Km * wP, Cu0)  # C_m(ω_R) = C_u(ω_R)
# avviamento: ω̇(0) con le caratteristiche valutate a ω = 0
R.eq('d102.3', I * ((CA - Cu0) / I), CA - Cu0)
# retta del motore c.c.: passa per (0, C_m0) e (ω_S, 0); K_m = modulo della pendenza
pend = sp.solve(sp.Eq(Cm0 + sp.Symbol('k') * wS, 0), sp.Symbol('k'))[0]
R.eq('d102.4', -pend, Cm0 / wS)
R.eq('d102.5', wP, (Cm0 - Cu0) / Km)
R.enunciato('d102.6', 'più intersezioni: Q e P (p. 198)')
R.risultato('d102', wP, (Cm0 - Cu0) / Km)

# ================================================================ d103 stabilità (pp. 197–199)
wPs = sp.Symbol('omega_P', positive=True)
Om, Om0 = sp.symbols('Omega Omega_0', real=True)
x = sp.Symbol('x', real=True)
# sviluppo di Taylor al 1° ordine delle due caratteristiche in P (series di SymPy)
KmS, KuS, CP = sp.symbols('K_m K_u C_P', real=True)


def lineare(F, K):
    """sviluppo di Taylor al 1° ordine di F in ω_P (series di SymPy), con F'(ω_P) = K e F(ω_P) = C_P"""
    s = sp.series(F(x), x, wPs, 2).removeO()
    s = s.subs({a: K for a in s.atoms(sp.Subs)})
    return sp.expand(s.subs(F(wPs), CP))  # P punto di regime: C_m,P = C_u,P = C_P


Cm_lin, Cu_lin = lineare(Cmf, KmS), lineare(Cuf, KuS)
R.enunciato('d103.1', 'sviluppo di Taylor al primo ordine')
R.enunciato('d103.2', 'definizione dello scostamento Ω')
rhs103 = sp.simplify((Cm_lin - Cu_lin).subs(x, wPs + Om) / I)
R.eq('d103.3', rhs103, (KmS - KuS) * Om / I)
Omf = sp.Function('Omega')
sol103 = sp.dsolve(sp.Eq(Omf(t).diff(t), (KmS - KuS) * Omf(t) / I), Omf(t), ics={Omf(0): Om0}).rhs
R.eq('d103.4', sp.expand_log(sp.log(sol103 / Om0), force=True), (KmS - KuS) * t / I)
R.eq('d103.5', sol103, Om0 * sp.exp((KmS - KuS) * t / I))
a_pos = sp.Symbol('a', positive=True)
R.eq('d103.6', sp.limit(Om0 * sp.exp(-a_pos * t / I), t, sp.oo), 0)  # K_m − K_u = −a < 0 ⇒ Ω → 0
R.enunciato('d103.7', 'lettura del punto Q (p. 198)')
R.risultato('d103', sol103, Om0 * sp.exp((KmS - KuS) * t / I))

# ================================================================ d104 transitorio da fermo e t_% (pp. 199–200)
Ieq = sp.Symbol('I_eq', positive=True)
q = sp.Symbol('q', positive=True)  # q = 1 − %, con 0 < q < 1
pc = 1 - q
sol104 = sp.dsolve(sp.Eq(Ieq * w(t).diff(t), Cm0 - Km * w(t) - Cu0), w(t), ics={w(0): 0}).rhs
R.eq('d104.1', Ieq * sp.diff(sol104, t), Cm0 - Km * sol104 - Cu0)
lhs2 = -1 / Km * sp.log((Cm0 - Cu0 - Km * sol104) / (Cm0 - Cu0))
R.eq('d104.2', sp.simplify(sp.expand_log(lhs2, force=True)), t / Ieq)
wP104 = (Cm0 - Cu0) / Km
R.eq('d104.3', sol104, wP104 * (1 - sp.exp(-Km * t / Ieq)))
R.eq('d104.4', sp.limit(sol104, t, sp.oo), wP104)
t90 = sp.solve(sp.Eq(sol104, sp.Rational(9, 10) * wP104), t)[0]
R.eq('d104.5', sp.log(1 - sp.Rational(9, 10)), -Km * t90 / Ieq)
tp = sp.solve(sp.Eq(sol104, pc * wP104), t)[0]
R.eq('d104.6', tp, -Ieq / Km * sp.log(1 - pc))
R.eq('d104.7', t90, Ieq / Km * sp.log(10))
R.risultato('d104', tp, -Ieq / Km * sp.log(1 - pc))

# ================================================================ d105 inerzia riportata (pp. 196, 201)
tau, eta = sp.symbols('tau eta', positive=True)
wm, wmd = sp.symbols('omega_m omegadot_m', real=True)
wu, wud = tau * wm, tau * wmd  # rapporto costante
Iu_rid = sp.Symbol('I_u_star', positive=True)
R.enunciato('d105.1', 'definizione di τ')
R.enunciato('d105.2', 'equivalenza energetica')
R.eq('d105.3', sp.solve(sp.Eq(sp.Rational(1, 2) * Iu * wu ** 2, sp.Rational(1, 2) * Iu_rid * wm ** 2), Iu_rid)[0], Iu * tau ** 2)
# ascensore: energia di cabina, contrappeso (V = ω_u r_t) e tamburo
It, Mc, Mk, rt, wU = sp.symbols('I_t M_cab M_contr r_t omega_u', positive=True)
Ek = sp.Rational(1, 2) * Mc * (wU * rt) ** 2 + sp.Rational(1, 2) * Mk * (wU * rt) ** 2 + sp.Rational(1, 2) * It * wU ** 2
R.eq('d105.4', 2 * Ek / wU ** 2, It + (Mc + Mk) * rt ** 2)
# T.F.V. con η = 1 e risoluzione in ω̇_m
tfv = sp.Eq(Cm * wm - Cu * wu, Im * wmd * wm + Iu * wud * wu)
wmd105 = sp.solve(tfv, wmd)[0]
R.eq('d105.5', (Cm * wm - Cu * wu) - (Im * wmd * wm + Iu * wud * wu), 0, ass={wmd: wmd105})
R.eq('d105.6', Cm - Cu * tau, (Im + Iu * tau ** 2) * wmd105)
R.eq('d105.7', wmd105, (Cm - tau * Cu) / (Im + tau ** 2 * Iu))
R.risultato('d105', wmd105, (Cm - tau * Cu) / (Im + tau ** 2 * Iu))

# ================================================================ d106 coppia riportata e rendimento (p. 201)
Cu_rid = sp.Symbol('C_u_star', real=True)
R.eq('d106.1', sp.solve(sp.Eq(Cu_rid * wm, Cu * wu), Cu_rid)[0], tau * Cu)
# moto diretto: la potenza che entra nella trasmissione è quella del motore meno quella che accelera I_m;
# ne esce η volte tanto, e serve a vincere C_u e ad accelerare I_u
bil = sp.Eq(eta * (Cm - Im * wmd) * wm, (Cu + Iu * wud) * wu)
wmd106 = sp.solve(bil, wmd)[0]
R.eq('d106.2', eta * (Cm - Im * wmd) * wm - (Cu + Iu * wud) * wu, 0, ass={wmd: wmd106})
R.eq('d106.3', Cm - Cu * tau / eta, (Im + Iu * tau ** 2 / eta) * wmd106)
# regime: ω̇_m = 0
CmR = sp.solve(sp.Eq(wmd106, 0), Cm)[0]
R.eq('d106.4', eta * CmR * wm, Cu * wu)
# Esempio E4/2: C_m = C_mo − k_m ω_m, C_u = k_u ω_u, η = 1
Cmo, km, ku = sp.symbols('C_mo k_m k_u', positive=True)
wmE = sp.solve(sp.Eq(Cmo - km * W, tau * ku * tau * W), W)[0]
R.eq('d106.5', Cmo - km * wmE, tau ** 2 * ku * wmE)
R.eq('d106.6', wmE, Cmo / (km + tau ** 2 * ku))
R.eq('d106.7', (Cmo - km * wmE) * wmE, Cmo ** 2 * tau ** 2 * ku / (km + tau ** 2 * ku) ** 2)
num = {Cmo: 45, km: sp.Rational(6, 100), ku: sp.Rational(8, 10), tau: sp.Rational(1, 2)}
assert abs(float(wmE.subs(num)) - 173.0769) < 1e-3 and abs(float(((Cmo - km * wmE) * wmE).subs(num)) - 5991.12) < 1e-1
R.risultato('d106', wmd106, (Cm - tau * Cu / eta) / (Im + tau ** 2 * Iu / eta))

# ================================================================ d107 rapporto ottimo (deduzione, NF-29)
Cmp, Cup = sp.symbols('C_m C_u', positive=True)
T = sp.Symbol('tau', positive=True)
wdm = (Cmp - T * Cup) / (Im + T ** 2 * Iu)  # dalla d105
wdu = T * wdm
R.eq('d107.1', wdu, (T * Cmp - T ** 2 * Cup) / (Im + T ** 2 * Iu))
R.eq('d107.2', sp.diff(wdm, T), (Cup * Iu * T ** 2 - 2 * Cmp * Iu * T - Cup * Im) / (Im + T ** 2 * Iu) ** 2)
dwu = sp.diff(wdu, T)
R.eq('d107.3', dwu, ((Cmp - 2 * T * Cup) * (Im + T ** 2 * Iu) - (T * Cmp - T ** 2 * Cup) * 2 * T * Iu) / (Im + T ** 2 * Iu) ** 2)
numer = sp.factor(sp.together(dwu)).as_numer_denom()[0]
R.eq('d107.4', sp.expand(-numer), sp.expand(Cmp * Iu * T ** 2 + 2 * Cup * Im * T - Cmp * Im))
radici = sp.solve(sp.Eq(Cmp * Iu * T ** 2 + 2 * Cup * Im * T - Cmp * Im, 0), T)  # T positivo: resta la radice +
assert len(radici) == 1
tau_opt = radici[0]
R.eq('d107.5', tau_opt, (-Cup * Im + sp.sqrt(Im * (Cmp ** 2 * Iu + Cup ** 2 * Im))) / (Cmp * Iu))
tau0 = sp.simplify(tau_opt.subs(Cup, 0))
R.eq('d107.6', tau0, sp.sqrt(Im / Iu))
R.eq('d107.7', sp.simplify(wdu.subs(Cup, 0).subs(T, tau0)), Cmp / (2 * sp.sqrt(Im * Iu)))
# è un massimo: la derivata cambia segno da + a − (numeratore = parabola rivolta verso il basso, positiva in 0)
assert sp.simplify((-sp.expand(Cmp * Iu * T ** 2 + 2 * Cup * Im * T - Cmp * Im)).subs(T, 0)) == Cmp * Im
R.risultato('d107', tau_opt, (-Cup * Im + sp.sqrt(Im * (Cmp ** 2 * Iu + Cup ** 2 * Im))) / (Cmp * Iu))

# ================================================================ d108 frizione: strisciamento (pp. 202–204)
f, FN, ri, re, m, wI, Cfr = sp.symbols('f F_N r_i r_e m omega_I C_fr', positive=True)
R.eq('d108.1', f * FN * (ri + re) / 2 * m, f * FN * m * (ri + re) / 2)
R.enunciato('d108.2', 'aderenza: disuguaglianza')
# lato motore: la frizione è un utilizzatore fittizio a coppia costante; motore linearizzato (K_m modulo)
wM = sp.dsolve(sp.Eq(Im * w(t).diff(t), Cm0 - Km * w(t) - Cfr), w(t), ics={w(0): wI}).rhs
R.eq('d108.3', Cm0 - Km * wM - Cfr, Im * sp.diff(wM, t))
R.enunciato('d108.4', 'linearizzazione del motore in P')
R.eq('d108.5', wM, ((Cm0 - Cfr) - (Cm0 - Cfr - Km * wI) * sp.exp(-Km * t / Im)) / Km)
R.eq('d108.6', sp.limit(wM, t, sp.oo), (Cm0 - Cfr) / Km)
# lato utilizzatore: T.F.V. con la frizione come motore fittizio (I del disco condotto trascurata), ω_u = τ ω_c
wc = sp.Function('omega_c')
tfv_c = sp.Eq(Cfr * wc(t) - Cu0 * tau * wc(t), Iu * tau * wc(t).diff(t) * tau * wc(t))
wcd = sp.solve(tfv_c, wc(t).diff(t))[0]
R.eq('d108.7', Cfr - tau * Cu0, tau ** 2 * Iu * wcd)
wC = sp.dsolve(sp.Eq(wc(t).diff(t), wcd), wc(t), ics={wc(0): 0}).rhs
R.eq('d108.8', wC, (Cfr - tau * Cu0) / (tau ** 2 * Iu) * t)
R.risultato('d108', wM, ((Cm0 - Cfr) - (Cm0 - Cfr - Km * wI) * sp.exp(-Km * t / Im)) / Km)

# ================================================================ d109 sincronizzazione e aderenza (pp. 205–206)
tQ, wQ = sp.symbols('t_Q omega_Q', positive=True)
R.eq('d109.1', (wM - wC).subs(t, tQ), wM.subs(t, tQ) - wC.subs(t, tQ))  # definizione di Q: Δω(t_Q) = 0
lhs109 = ((Cm0 - Cfr) - (Cm0 - Cfr - Km * wI) * sp.exp(-Km * tQ / Im)) / Km
rhs109 = (Cfr - tau * Cu0) / (tau ** 2 * Iu) * tQ
R.eq('d109.2', (lhs109 - wM.subs(t, tQ)) ** 2 + (rhs109 - wC.subs(t, tQ)) ** 2, 0)
# coppia motrice costante (K_m → 0): rette, t_Q risolto
CmC = sp.Symbol('C_mc', positive=True)
wMc = sp.dsolve(sp.Eq(Im * w(t).diff(t), CmC - Cfr), w(t), ics={w(0): wI}).rhs
tQc = sp.solve(sp.Eq(wMc, wC), t)[0]
R.eq('d109.3', tQc, wI / ((Cfr - CmC) / Im + (Cfr - tau * Cu0) / (tau ** 2 * Iu)))
R.enunciato('d109.4', 'aderenza: accoppiamento con riduttore (p. 206)')
Ieq2 = Im + tau ** 2 * Iu
td = sp.Symbol('t', real=True)
wAd = sp.dsolve(sp.Eq(Ieq2 * w(td).diff(td), Cm0 - Km * w(td) - tau * Cu0), w(td), ics={w(tQ): wQ}).rhs
R.eq('d109.5', wAd, ((Cm0 - tau * Cu0) - (Cm0 - Km * wQ - tau * Cu0) * sp.exp(-Km * (td - tQ) / Ieq2)) / Km)
R.eq('d109.6', sp.limit(wAd, td, sp.oo), (Cm0 - tau * Cu0) / Km)
# coppia nella frizione in aderenza: equilibrio del lato motore = equilibrio del lato utilizzatore
wdAd = sp.diff(wAd, td)
R.eq('d109.7', (Cm0 - Km * wAd) - Im * wdAd, tau * Cu0 + tau ** 2 * Iu * wdAd)
R.risultato('d109', wAd, ((Cm0 - tau * Cu0) - (Cm0 - Km * wQ - tau * Cu0) * sp.exp(-Km * (td - tQ) / Ieq2)) / Km)

# ================================================================ d110 energia dissipata (libro pp. 117–118)
I1, I2, w10, Cr, Cf, Cmk = sp.symbols('I_1 I_2 omega_10 C_r C_f C_mk', positive=True)
w20 = sp.Symbol('omega_20', nonnegative=True)
w1f, w2f = sp.Function('omega_1'), sp.Function('omega_2')
# equilibri dinamici dei due alberi (p. 118) con coppie costanti
s1 = sp.dsolve(sp.Eq(I1 * w1f(t).diff(t), Cmk - Cf), w1f(t), ics={w1f(0): w10}).rhs
s2 = sp.dsolve(sp.Eq(I2 * w2f(t).diff(t), Cf - Cr), w2f(t), ics={w2f(0): w20}).rhs
tS = sp.solve(sp.Eq(s1, s2), t)[0]
wf = s1.subs(t, tS)
Lf = sp.integrate(Cf * (s1 - s2), (t, 0, tS))  # lavoro delle forze d'attrito cambiato di segno
R.enunciato('d110.1', 'equazione dell\'energia (3.55)')
rhs582 = sp.Rational(1, 2) * (I1 * w10 ** 2 + I2 * w20 ** 2 - (I1 + I2) * wf ** 2) + sp.integrate(Cmk * s1, (t, 0, tS)) - sp.integrate(Cr * s2, (t, 0, tS))
R.eq('d110.2', Lf, rhs582)
# potenza dissipata: dalle due equazioni moltiplicate per ω₁ e ω₂
Ekin = sp.Rational(1, 2) * I1 * s1 ** 2 + sp.Rational(1, 2) * I2 * s2 ** 2
R.eq('d110.3', Cmk * s1 - Cr * s2 - sp.diff(Ekin, t), Cf * (s1 - s2))
R.eq('d110.4', Lf, Cf * (w10 - w20) * tS / 2)
# innesto impulsivo: senza coppie esterne (C_m = C_r = 0) si conserva il momento della quantità di moto
s1i, s2i = s1.subs(Cmk, 0), s2.subs(Cr, 0)
tSi = sp.solve(sp.Eq(s1i, s2i), t)[0]
wfi = sp.simplify(s1i.subs(t, tSi))
R.enunciato('d110.5', 'conservazione del momento della quantità di moto (3.65)')
R.eq('d110.6', wfi, (I1 * w10 + I2 * w20) / (I1 + I2))
Lfi = sp.integrate(Cf * (s1i - s2i), (t, 0, tSi))
R.eq('d110.7', Lfi, I1 * I2 * (w10 - w20) ** 2 / (2 * (I1 + I2)))
assert sp.simplify(sp.Rational(1, 2) * (I1 * w10 ** 2 + I2 * w20 ** 2 - (I1 + I2) * wfi ** 2) - Lfi) == 0
# collegamento con il modello del cap. 6: velocità relativa = ω_m − ω_c (disco condotto)
Edis = sp.integrate(Cfr * (wM - wC), (t, 0, tQ))
A_, B_ = Cm0 - Cfr, Cm0 - Cfr - Km * wI
chiusa = Cfr * ((A_ * tQ + B_ * Im / Km * (sp.exp(-Km * tQ / Im) - 1)) / Km - (Cfr - tau * Cu0) / (tau ** 2 * Iu) * tQ ** 2 / 2)
R.eq('d110.8', Edis, chiusa)
R.risultato('d110', Lfi, I1 * I2 * (w10 - w20) ** 2 / (2 * (I1 + I2)))

R.salva()
