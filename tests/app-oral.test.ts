/** Simulazione dell'orale: estrazione pesata, domande a catena, aiuto locale alla correzione. */
import { describe, expect, it, vi } from 'vitest';
// i test dell'app usano un registro ridotto (mappa + freno a nastro): indipendenti dai capitoli in lavorazione
vi.mock('../src/content', () => import('./app-content-mock'));
import { defaultState } from '../src/storage/store';
import { addPassi, addSimulazione } from '../src/learning/actions';
import { approfondimentiDi, estraiDomanda, paroleChiave, pesiEstrazione, scegliCatena, sospettiDaNonDire, suggerisciPunti } from '../src/learning/oral';
import { rubricaDi } from '../src/learning/rubrica';
import { seeded } from '../src/engine/num';
import { catalogo, D071, FN, iso, T } from './app-fixture';

const CAT = catalogo();
const CAT2 = catalogo(true);
const ARG = FN.id;
const RUB = rubricaDi(FN, CAT);

describe('estrazione', () => {
  it('solo argomenti con contenuto; peso proporzionale alle formulazioni e a (1 − padronanza)', () => {
    const p = pesiEstrazione(defaultState(), T(0), CAT);
    expect(p.length).toBe(FN.formulazioni.length);
    expect(p.every((x) => x.argId === ARG && x.peso > 0)).toBe(true);
    const bravo = addPassi(defaultState(), D071.passi.map((x) => ({ passoId: x.id, dimId: 'd071', argId: ARG, livello: 2 as const, esito: 'giusto' as const, at: iso(0) })));
    const p2 = pesiEstrazione(bravo, T(0, 12), CAT);
    expect(p2[0].peso).toBeLessThan(p[0].peso);
    expect(estraiDomanda(defaultState(), seeded(3), T(0), CAT)).toMatchObject({ argId: ARG, q: FN.formulazioni[0].q });
  });
  it('niente ripetizioni ravvicinate: l\'argomento dell\'ultima simulazione pesa meno, le domande recenti sono escluse', () => {
    let s = defaultState();
    s = addSimulazione(s, { argId: 'c2-attrito', q: 0, durataS: 60, conLavagna: false, correttore: 'auto', voci: {}, daNonDire: [], catena: [], at: iso(-1) });
    const p = pesiEstrazione(s, T(0), CAT2);
    const a = p.filter((x) => x.argId === 'c2-attrito');
    const b = p.filter((x) => x.argId === ARG);
    expect(a.length).toBeGreaterThan(0);
    expect(b.every((x) => x.peso > 0)).toBe(true);
    // la formulazione appena chiesta è esclusa
    const c2 = CAT2.argomenti.find((x) => x.id === 'c2-attrito')!;
    const chiesta = c2.formulazioni.length ? c2.formulazioni[0].q : 0;
    s = addSimulazione(defaultState(), { argId: 'c2-attrito', q: chiesta, durataS: 60, conLavagna: false, correttore: 'auto', voci: {}, daNonDire: [], catena: [], at: iso(-1) });
    expect(pesiEstrazione(s, T(0), CAT2).find((x) => x.argId === 'c2-attrito' && x.q === chiesta)!.peso).toBe(0);
    // su molte estrazioni escono entrambi gli argomenti
    const rnd = seeded(7);
    const usciti = new Set(Array.from({ length: 40 }, () => estraiDomanda(defaultState(), rnd, T(0), CAT2)!.argId));
    expect(usciti).toEqual(new Set([ARG, 'c2-attrito']));
    // estrazione limitata a un argomento: le esclusioni non lasciano senza domanda
    let solo = defaultState();
    for (const f of FN.formulazioni) solo = addSimulazione(solo, { argId: ARG, q: f.q, durataS: 1, conLavagna: false, correttore: 'auto', voci: {}, daNonDire: [], catena: [], at: iso(0) });
    expect(estraiDomanda(solo, seeded(1), T(0, 12), CAT, ARG)?.argId).toBe(ARG);
  });
  it('domande a catena dagli approfondimenti curati, con id', () => {
    const ap = approfondimentiDi(FN);
    expect(ap.map((x) => x.id)).toEqual(FN.contenuto!.approfondimenti.map((_, i) => `a${i + 1}`));
    const c = scegliCatena(FN, seeded(2));
    expect(c).toHaveLength(2);
    expect(c[0].id).not.toBe(c[1].id);
    expect(c.some((x) => x.tipo === 'approfondimento')).toBe(true);
  });
});

describe('aiuto alla correzione (parole chiave, locale)', () => {
  it('estrae parole chiave senza formule né parole vuote', () => {
    expect(paroleChiave('Il nastro è fermo: $\\rho V^2 = 0$ quindi niente centrifuga')).toEqual(['nastro', 'fermo', 'niente', 'centrifuga']);
  });
  it('una risposta che ripete le attese ha punti pieni, una vuota zero', () => {
    const tutto = RUB.flatMap((v) => v.attese).join('. ');
    const pieno = suggerisciPunti(tutto, RUB);
    expect(Object.values(pieno).filter((x) => x.totali > 0).every((x) => x.punti === 1)).toBe(true);
    const vuoto = suggerisciPunti('buongiorno professore', RUB);
    expect(Object.values(vuoto).every((x) => x.punti === 0)).toBe(true);
  });
  it('riconosce una frase da non dire detta con parole simili', () => {
    const frasi = FN.contenuto!.daNonDire.map((d) => d.frase);
    expect(sospettiDaNonDire('allora qui il verso di rotazione non conta proprio', frasi)).toContain('Il verso di rotazione non conta.');
    expect(sospettiDaNonDire('il tamburo frena', frasi)).toEqual([]);
  });
});

describe('argomenti disattivati', () => {
  it('spariscono dall\'estrazione e dal catalogo attivo, ma restano interrogabili se aperti apposta', async () => {
    const { attivo } = await import('../src/learning/catalogo');
    const s = { ...defaultState(), settings: { ...defaultState().settings, disattivati: ['c2-attrito'] } };
    expect(attivo(s, CAT2).argomenti.some((a) => a.id === 'c2-attrito')).toBe(false);
    expect(attivo(defaultState(), CAT2)).toBe(CAT2);
    expect(pesiEstrazione(s, T(0), CAT2).every((x) => x.argId !== 'c2-attrito')).toBe(true);
    expect(pesiEstrazione(s, T(0), CAT2, 'c2-attrito').length).toBeGreaterThan(0);
    const { pianoOggi } = await import('../src/learning/session');
    const { dashboard } = await import('../src/learning/stats');
    expect(JSON.stringify(pianoOggi(s, T(0), CAT2))).not.toContain('c2-attrito');
    expect(dashboard(s, T(0), CAT2).argomenti.some((a) => a.id === 'c2-attrito')).toBe(false);
  });
});
