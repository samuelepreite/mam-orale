"""Registro delle verifiche simboliche (SymPy), indipendente dal codice TypeScript.

Ogni capitolo ha uno script tools/verifica/cX.py che ricostruisce il MODELLO dai principi (equilibri risolti con
solve, equazioni differenziali con dsolve, integrali con integrate…) e controlla ogni passo delle dimostrazioni
dell'app per id ('d071.3'). L'esito va in tests/data/verifica_cX.json; tests/verifica.test.ts controlla che ogni passo
con controllo numerico nell'app abbia qui l'esito 'ok' e che ogni dimostrazione sia presente.

Esiti: 'ok' (identità verificata), 'enunciato' (ipotesi, definizione o legge assunta: niente da dimostrare),
'FALLITO' (lo script termina con errore).
"""
import json, os, sys
import sympy as sp

QUI = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(QUI, '..', '..', 'tests', 'data')


class Registro:
    def __init__(self, cap):
        self.cap = cap
        self.esiti = {}
        self.errori = []

    def _dim(self, pid):
        return self.esiti.setdefault(pid.split('.')[0], {})

    def eq(self, pid, lhs, rhs, *, ass=None, note=''):
        """verifica lhs == rhs (simbolicamente); `ass` = sostituzioni del modello"""
        d = sp.simplify((sp.sympify(lhs) - sp.sympify(rhs)).subs(ass or {}))
        if d != 0:
            d = sp.simplify(sp.expand(sp.powsimp(d, force=True)))
        ok = d == 0
        self._dim(pid)[pid] = 'ok' if ok else 'FALLITO'
        if not ok:
            self.errori.append(f'{pid}: differenza {d} {note}')
        return ok

    def enunciato(self, pid, motivo=''):
        self._dim(pid)[pid] = 'enunciato'

    def risultato(self, did, lhs, rhs, *, ass=None):
        d = sp.simplify((sp.sympify(lhs) - sp.sympify(rhs)).subs(ass or {}))
        self.esiti.setdefault(did, {})['risultato'] = 'ok' if d == 0 else 'FALLITO'
        if d != 0:
            self.errori.append(f'{did} risultato: differenza {d}')

    def salva(self):
        os.makedirs(DATA, exist_ok=True)
        p = os.path.join(DATA, f'verifica_{self.cap.lower()}.json')
        json.dump(self.esiti, open(p, 'w'), indent=1, sort_keys=True)
        n = sum(len(v) for v in self.esiti.values())
        print(f'{self.cap}: {len(self.esiti)} dimostrazioni, {n} voci, {len(self.errori)} errori -> {os.path.relpath(p)}')
        if self.errori:
            print('\n'.join(self.errori))
            sys.exit(1)
