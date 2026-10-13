/** Simulazione dell'orale: estrazione pesata, richiesta autosufficiente a Claude, lettura robusta delle risposte. */
import { describe, expect, it, vi } from 'vitest';
// i test dell'app usano un registro ridotto (mappa + freno a nastro): indipendenti dai capitoli in lavorazione
vi.mock('../src/content', () => import('./app-content-mock'));
import { defaultState } from '../src/storage/store';
import { addPassi, addSimulazione } from '../src/learning/actions';
import { approfondimentiDi, comeOggetto, costruisciRichiesta, costruisciRichiestaCatena, estraiDomanda, leggiCatena, leggiValutazione, messaggioErroreClaude, pesiEstrazione, puntiDa, scegliCatena } from '../src/learning/oral';
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

describe('richiesta a Claude', () => {
  const prompt = costruisciRichiesta(FN, FN.formulazioni[0].testo, 'Il freno a nastro… uso Eulero senza centrifuga, T1 = T2 e^{fβ}', { immagine: true, durataS: 95 }, CAT);
  it('è autosufficiente: istruzioni, domanda, rubrica, catena con pagine, da non dire, NF, approfondimenti, trascrizione, formato', () => {
    expect(prompt).toMatch(/professore di Meccanica Applicata alle Macchine I/);
    expect(prompt).toMatch(/italiano/);
    expect(prompt).toMatch(/Non dare un voto in trentesimi/);
    expect(prompt).toContain(FN.formulazioni[0].testo);
    for (const v of RUB) expect(prompt).toContain(`[${v.id}]`);
    for (const p of D071.passi) expect(prompt).toContain(`[${p.id}] (D p. 153)`);
    expect(prompt).toContain('[PASSAGGIO CHIAVE]');
    for (const d of FN.contenuto!.daNonDire) expect(prompt).toContain(d.frase);
    expect(prompt).toContain('NF-21 al passo d071.6');
    expect(prompt).toContain('NON va penalizzato');
    expect(prompt).toContain('[a1]');
    expect(prompt).toContain('T1 = T2 e^{fβ}');
    expect(prompt).toContain('IMMAGINE ALLEGATA');
    expect(prompt).toContain('"domandeACatena"');
    expect(new TextEncoder().encode(prompt).length).toBeLessThan(64 * 1024);
  });
  it('trascrizione vuota e lunghissima', () => {
    expect(costruisciRichiesta(FN, 'q', '', {}, CAT)).toContain('(nessun testo');
    expect(costruisciRichiesta(FN, 'q', 'x'.repeat(50000), {}, CAT).length).toBeLessThan(30000);
  });
  it('seconda chiamata per le domande a catena', () => {
    const p = costruisciRichiestaCatena(FN, 'q11', [{ domanda: 'Perché θ* = β?', attesa: 'striscia ovunque', risposta: 'perché il nastro è fermo' }]);
    expect(p).toContain('[0] Domanda: Perché θ* = β?');
    expect(p).toContain('"valutazioni"');
  });
});

describe('lettura della risposta', () => {
  const buona = {
    voci: RUB.map((v, i) => ({ id: v.id, punti: i % 3 === 0 ? 1 : i % 3 === 1 ? 0.5 : 0, motivo: 'ok' })),
    daNonDireDetti: ['il verso di rotazione non conta'],
    passoMancante: 'd071.4',
    commento: 'Bene la partenza; manca l\'equilibrio della leva.',
    domandeACatena: [{ id: 'a2', domanda: 'Come ricavi Eulero?' }, { id: 'zz', domanda: 'Altra?' }, { id: 'a1', domanda: 'Terza' }],
  };
  it('risposta corretta: voci, frase canonica del «da non dire», passo mancante, al massimo 2 domande', () => {
    const r = leggiValutazione(buona, FN, CAT);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(Object.keys(r.v.voci)).toHaveLength(RUB.length);
    expect(r.v.mancanti).toEqual([]);
    expect(r.v.daNonDireDetti).toEqual(['Il verso di rotazione non conta.']);
    expect(r.v.passoMancante).toBe('d071.4');
    expect(r.v.domandeACatena).toEqual([{ id: 'a2', domanda: 'Come ricavi Eulero?' }, { id: null, domanda: 'Altra?' }]);
  });
  it('risposte malformate: stringhe, recinti markdown, punti strani, voci mancanti o sconosciute', () => {
    const txt = 'Ecco la valutazione:\n```json\n' + JSON.stringify({ voci: { partenza: '0,5', chiave: { punti: 0.8, motivo: 'quasi' }, inventata: 1 }, passoMancante: 'null', domandeACatena: ['Perché?'] }) + '\n```';
    const r = leggiValutazione(txt, FN, CAT);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.v.voci.partenza.punti).toBe(0.5);
    expect(r.v.voci.chiave.punti).toBe(1);
    expect(r.v.voci).not.toHaveProperty('inventata');
    expect(r.v.mancanti).toContain('ipotesi');
    expect(r.v.passoMancante).toBeNull();
    expect(r.v.daNonDireDetti).toEqual([]);
    expect(r.v.domandeACatena).toEqual([{ id: null, domanda: 'Perché?' }]);
    expect(leggiValutazione('niente json qui', FN, CAT).ok).toBe(false);
    expect(leggiValutazione(null, FN, CAT).ok).toBe(false);
    expect(leggiValutazione([1, 2], FN, CAT).ok).toBe(false);
    expect(leggiValutazione({ voci: [{ id: 'x', punti: 1 }] }, FN, CAT).ok).toBe(false);
    expect(leggiValutazione({ voci: [{ id: 'partenza', punti: 'tanto' }] }, FN, CAT).ok).toBe(false);
    const testo = leggiValutazione({ voci: [{ id: 'partenza', punti: 1 }], passoMancante: 'la leva', commento: 42, daNonDireDetti: 'no' }, FN, CAT);
    expect(testo.ok && testo.v.passoMancante).toBe('la leva');
    expect(testo.ok && testo.v.commento).toBe('42');
  });
  it('punti: numeri, stringhe, percentuali, decimi, booleani', () => {
    expect([puntiDa(1), puntiDa(0.4), puntiDa('1'), puntiDa('½'), puntiDa(true), puntiDa(70), puntiDa(3), puntiDa(-2), puntiDa('x'), puntiDa(undefined)]).toEqual([1, 0.5, 1, 0.5, 1, 0.5, 0.5, 0, null, null]);
    expect(comeOggetto('{"a":1} grazie')).toEqual({ a: 1 });
  });
  it('domande a catena: indici, voti malformati', () => {
    const r = leggiCatena({ valutazioni: [{ indice: 1, voto: '1', commento: 'bene' }, { indice: 7, voto: 1 }, { voto: 'boh' }] }, 2);
    expect(r.ok && r.v).toEqual([null, { voto: 1, commento: 'bene' }]);
    expect(leggiCatena('{}', 2).ok).toBe(false);
    expect(leggiCatena([{ voto: 0 }], 1).ok && leggiCatena([{ voto: 0 }], 1)).toMatchObject({ v: [{ voto: 0 }] });
  });
  it('errori di sample → messaggi chiari', () => {
    expect(messaggioErroreClaude('not_granted').nascondi).toBe(true);
    expect(messaggioErroreClaude('rate_limited').testo).toMatch(/autovalutazione/);
    expect(messaggioErroreClaude('qualcosa').testo).toMatch(/autovalutazione/);
  });
});
