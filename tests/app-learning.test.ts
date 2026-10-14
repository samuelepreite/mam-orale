/** Apprendimento: esiti → voti FSRS, padronanza e fading, sessione «Oggi», piano con e senza data, rubrica standard, statistiche. */
import { describe, expect, it, vi } from 'vitest';
// i test dell'app usano un registro ridotto (mappa + freno a nastro): indipendenti dai capitoli in lavorazione
vi.mock('../src/content', () => import('./app-content-mock'));
import { defaultState, type AppState, type Esito } from '../src/storage/store';
import { addPasso, addPassi, addRichiamo, addSimulazione, lessonStep } from '../src/learning/actions';
import { card, dueCards, forecast, gradeEsito, gradePunti, rebuildSrs, Rating, retrievability } from '../src/learning/srs';
import { faseLivello2, giroRiuscito, livelloDim, padronanzaArgomento, padronanzaCapitoli, passiNascosti, ripassiRiusciti, statoArgomento } from '../src/learning/mastery';
import { avanzamento, ordineStudio, pianoOggi, prossimoNuovo } from '../src/learning/session';
import { pianoStudio } from '../src/learning/plan';
import { punteggio, rubricaDi, rubricaStandard, VOCI_STANDARD } from '../src/learning/rubrica';
import { dashboard, passiBlocco } from '../src/learning/stats';
import { catalogo, D071, D900, FN, iso, T } from './app-fixture';

const CAT = catalogo();
const CAT2 = catalogo(true);
const ARG = FN.id;

/** un giro completo di d071 al livello 2 con esiti dati */
function giro(s: AppState, at: (i: number) => string, esiti: Esito[] = D071.passi.map(() => 'giusto'), giroId = 'g' + at(0), dim = D071, argId = ARG): AppState {
  return addPassi(s, dim.passi.map((p, i) => ({ passoId: p.id, dimId: dim.id, argId, livello: 2 as const, esito: esiti[i], at: at(i), giro: giroId, dove: 'allena' as const })));
}

describe('srs', () => {
  it('esito → voto: sbagliato/fermato Again, esitante Hard, giusto Good, giusto sicuro Easy', () => {
    expect(gradeEsito('sbagliato')).toBe(Rating.Again);
    expect(gradeEsito('fermato', 5)).toBe(Rating.Again);
    expect(gradeEsito('esitante', 5)).toBe(Rating.Hard);
    expect(gradeEsito('giusto', 3)).toBe(Rating.Good);
    expect(gradeEsito('giusto')).toBe(Rating.Good);
    expect(gradeEsito('giusto', 4)).toBe(Rating.Easy);
    expect([gradePunti(0), gradePunti(0.5), gradePunti(1)]).toEqual([Rating.Again, Rating.Hard, Rating.Good]);
  });
  it('il livello 1 non programma; un errore torna domani; Easy va più lontano di Good', () => {
    let s = addPasso(defaultState(), { passoId: 'd071.2', dimId: 'd071', argId: ARG, livello: 1, esito: 'sbagliato', at: iso(0) });
    expect(Object.keys(s.srs)).toHaveLength(0);
    s = addPasso(s, { passoId: 'd071.2', dimId: 'd071', argId: ARG, livello: 2, esito: 'sbagliato', at: iso(0) });
    expect(new Date(card(s, 'passo:d071.2')!.due).getTime() - T(0).getTime()).toBe(86400000);
    s = addPasso(s, { passoId: 'd071.3', dimId: 'd071', argId: ARG, livello: 2, esito: 'giusto', sicurezza: 3, at: iso(0) });
    s = addPasso(s, { passoId: 'd071.4', dimId: 'd071', argId: ARG, livello: 2, esito: 'giusto', sicurezza: 5, at: iso(0) });
    expect(card(s, 'passo:d071.4')!.due > card(s, 'passo:d071.3')!.due).toBe(true);
    expect(dueCards(s, T(1, 11), 'passo').map((d) => d.id)).toEqual(['passo:d071.2']);
    expect(forecast(s, T(0)).reduce((a, b) => a + b, 0)).toBe(3);
  });
  it('simulazione: voci di rubrica e passo mancante entrano in FSRS; disegno programmato; ricostruzione uguale', () => {
    let s = addSimulazione(defaultState(), { argId: ARG, q: 11, durataS: 90, conLavagna: true, correttore: 'claude', voci: { partenza: 1, chiave: 0 }, daNonDire: [], passoMancante: 'd071.4', catena: [], at: iso(0) });
    s = addRichiamo(s, { qid: 'disegno:' + ARG, argId: ARG, corretto: false, at: iso(0) });
    s = addRichiamo(s, { qid: 'previsione:c4-fn-verso', argId: ARG, corretto: true, at: iso(0) });
    expect(Object.keys(s.srs).sort()).toEqual(['disegno:c4-freno-nastro', 'passo:d071.4', 'rubrica:c4-freno-nastro:chiave', 'rubrica:c4-freno-nastro:partenza']);
    expect(card(s, 'rubrica:c4-freno-nastro:chiave')!.lastGrade).toBe(Rating.Again);
    expect(rebuildSrs(s).srs).toEqual(s.srs);
    expect(Object.keys(rebuildSrs(s, iso(-1)).srs)).toHaveLength(0);
  });
});

describe('padronanza e fading', () => {
  it('passi mai fatti = 0; dopo un giro giusto cresce; un errore su un passo chiave lo azzera', () => {
    const s0 = lessonStep(defaultState(), ARG, 9, true);
    expect(padronanzaArgomento(s0, FN, T(0), CAT)).toBe(0);
    const s1 = giro(s0, () => iso(0));
    const p1 = padronanzaArgomento(s1, FN, T(1), CAT);
    expect(p1).toBeGreaterThan(0.9);
    const s2 = addPasso(s1, { passoId: 'd071.2', dimId: 'd071', argId: ARG, livello: 2, esito: 'sbagliato', at: iso(1) });
    expect(padronanzaArgomento(s2, FN, T(1, 12), CAT)).toBeLessThan(p1 - 0.15);
    expect(padronanzaArgomento(s2, FN, T(30), CAT)).toBeLessThan(padronanzaArgomento(s2, FN, T(1, 12), CAT));
  });
  it('livello: 1 → 2 dopo la lezione → 3 con i chiave ricordati → 2 dopo un errore su un chiave', () => {
    expect(livelloDim(defaultState(), ARG, D071, T(0))).toBe(1);
    const s0 = lessonStep(defaultState(), ARG, 9, true);
    expect(livelloDim(s0, ARG, D071, T(0))).toBe(2);
    const s1 = giro(s0, () => iso(0));
    expect(livelloDim(s1, ARG, D071, T(0, 12))).toBe(3);
    const s2 = addPasso(s1, { passoId: 'd071.4', dimId: 'd071', argId: ARG, livello: 3, esito: 'fermato', at: iso(0, 13) });
    expect(livelloDim(s2, ARG, D071, T(0, 14))).toBe(2);
    // un errore su un passo NON chiave non fa scendere
    const s3 = addPasso(s1, { passoId: 'd071.1', dimId: 'd071', argId: ARG, livello: 3, esito: 'sbagliato', at: iso(0, 13) });
    expect(livelloDim(s3, ARG, D071, T(0, 14))).toBe(3);
  });
  it('livello 2: prima si nascondono i non chiave, poi tutti', () => {
    const s0 = lessonStep(defaultState(), ARG, 9, true);
    expect(faseLivello2(s0, D071)).toBe('non-chiave');
    const nc = passiNascosti(D071, 'non-chiave');
    expect([...nc]).toEqual(D071.passi.filter((p) => !p.chiave).map((p) => p.id));
    const s1 = addPassi(s0, D071.passi.filter((p) => !p.chiave).map((p) => ({ passoId: p.id, dimId: 'd071', argId: ARG, livello: 2 as const, esito: 'giusto' as const, at: iso(0) })));
    expect(faseLivello2(s1, D071)).toBe('tutti');
    expect(passiNascosti(D071, 'tutti').size).toBe(D071.passi.length);
  });
  it('ripassi riusciti: giorni distinti; giro con un chiave sbagliato non conta; simulazione ≥ 60 % conta', () => {
    let s = lessonStep(defaultState(), ARG, 9, true);
    s = giro(s, () => iso(0));
    s = giro(s, (i) => iso(0, 11 + i * 0.01)); // stesso giorno: non conta due volte
    const sbagli = D071.passi.map((p) => (p.id === 'd071.4' ? 'sbagliato' : 'giusto')) as Esito[];
    s = giro(s, () => iso(1), sbagli, 'gx');
    expect(giroRiuscito(s.passi.filter((p) => p.giro === 'gx'), D071)).toBe(false);
    expect(ripassiRiusciti(s, CAT)[ARG]).toBe(1);
    const tutte = Object.fromEntries(rubricaDi(FN, CAT).map((v) => [v.id, 1 as const]));
    s = addSimulazione(s, { argId: ARG, q: 11, durataS: 60, conLavagna: false, correttore: 'auto', voci: tutte, daNonDire: [], catena: [], at: iso(2) });
    expect(ripassiRiusciti(s, CAT)[ARG]).toBe(2);
    expect(statoArgomento(s, FN, 0.95, 2)).toBe('in-corso');
    expect(statoArgomento(s, FN, 0.95, 3)).toBe('padroneggiato');
    expect(statoArgomento(defaultState(), FN, 0, 0)).toBe('da-fare');
    expect(statoArgomento(defaultState(), CAT.argomenti.find((a) => a.id === 'c4-eulero')!, 0, 0)).toBe('in-preparazione');
  });
  it('padronanza di capitolo: gli argomenti in preparazione contano 0', () => {
    const s = giro(lessonStep(defaultState(), ARG, 9, true), () => iso(0));
    const c4 = padronanzaCapitoli(s, T(0, 12), CAT).find((c) => c.cap === 'C4')!;
    expect(c4.pronti).toBe(1);
    expect(c4.totale).toBeGreaterThan(1);
    expect(c4.padronanza).toBeGreaterThan(0);
    expect(c4.padronanza).toBeLessThan(padronanzaArgomento(s, FN, T(0, 12), CAT));
  });
});

describe('sessione «Oggi»', () => {
  it('studente nuovo: solo l\'argomento nuovo con contenuto, niente recupero né simulazione', () => {
    const p = pianoOggi(defaultState(), T(0), CAT);
    expect(p.recupero).toHaveLength(0);
    expect(p.nuovo?.argId).toBe(ARG);
    expect(p.ripasso).toBeUndefined();
    expect(p.simulazione).toBeUndefined();
    expect(p.minuti.totale).toBeGreaterThan(0);
  });
  it('il giorno dopo la lezione: recupero 3–6 passi (max 2 per dimostrazione), ripasso dal primo passo scaduto, simulazione', () => {
    const s = { ...lessonStep(defaultState(), ARG, 9, true) };
    s.lezioni[ARG] = { ...s.lezioni[ARG], doneAt: iso(-1) };
    s.argomenti[ARG] = { vistoAt: iso(-1), livello: 2 };
    const p = pianoOggi(s, T(0), CAT);
    expect(p.recupero.length).toBe(2); // una sola dimostrazione vista: al massimo 2 passi
    expect(p.ripasso).toEqual({ argId: ARG, dimId: 'd071', da: 0 });
    expect(p.recupero.every((r) => r.dimId === 'd071')).toBe(true);
    expect(p.nuovo).toBeUndefined(); // nessun altro argomento con contenuto
    expect(p.simulazione).toBeTruthy();
  });
  it('interleaving tra capitoli e ripasso dal primo passo scaduto (i precedenti già fatti)', () => {
    let s = defaultState();
    for (const a of [ARG, 'c2-attrito']) s = { ...s, argomenti: { ...s.argomenti, [a]: { vistoAt: iso(-10), livello: 2 } } };
    // d071 tutto giusto 10 giorni fa tranne d071.5 sbagliato ieri; d900 fatto 10 giorni fa
    s = giro(s, () => iso(-10), undefined, 'a');
    s = giro(s, () => iso(-10), undefined, 'b', D900, 'c2-attrito');
    s = addPasso(s, { passoId: 'd071.5', dimId: 'd071', argId: ARG, livello: 2, esito: 'sbagliato', at: iso(-1) });
    const p = pianoOggi({ ...s, settings: { ...s.settings, minutiGiorno: 60 } }, T(0), CAT2);
    expect(p.recupero.length).toBeGreaterThanOrEqual(3);
    expect(p.recupero.length).toBeLessThanOrEqual(6);
    expect(new Set(p.recupero.map((r) => r.cap)).size).toBe(2);
    expect(p.recupero.slice(0, 2).map((r) => r.cap).sort()).toEqual(['C2', 'C4']);
    for (const d of ['d071', 'd900']) expect(p.recupero.filter((r) => r.dimId === d).length).toBeLessThanOrEqual(2);
    expect(p.ripasso).toBeTruthy();
    expect(p.ripasso!.da).toBeGreaterThanOrEqual(0);
  });
  it('il piano resta lo stesso durante la giornata e l\'avanzamento si legge dagli eventi di oggi', () => {
    let s = defaultState();
    s.argomenti[ARG] = { vistoAt: iso(-3), livello: 2 };
    s = giro(s, () => iso(-3), D071.passi.map(() => 'sbagliato'), 'z');
    const p = pianoOggi(s, T(0, 9), CAT);
    const r0 = p.recupero[0];
    s = addPasso(s, { passoId: r0.passoId, dimId: r0.dimId, argId: ARG, livello: 2, esito: 'giusto', at: iso(0, 9.5), dove: 'recupero' });
    const p2 = pianoOggi(s, T(0, 12), CAT);
    expect(p2.recupero).toEqual(p.recupero);
    const av = avanzamento(s, p2, T(0, 12), CAT);
    expect(av.recupero[0]).toBe(true);
    expect(av.fatti).toBe(1);
    // ripasso fatto: tutti i passi dal primo scaduto con dove = 'ripasso'
    s = addPassi(s, D071.passi.slice(p.ripasso!.da).map((x) => ({ passoId: x.id, dimId: 'd071', argId: ARG, livello: 2 as const, esito: 'giusto' as const, at: iso(0, 10), dove: 'ripasso' as const, giro: 'r' })));
    expect(avanzamento(s, p2, T(0, 12), CAT).ripasso).toBe(true);
  });
  it('ultima settimana prima dell\'orale: simulazione sempre; ordine di studio con i prerequisiti prima', () => {
    let s = defaultState();
    s.argomenti[ARG] = { vistoAt: iso(-3), livello: 2 };
    s = addSimulazione(s, { argId: ARG, q: 11, durataS: 60, conLavagna: false, correttore: 'auto', voci: {}, daNonDire: [], catena: [], at: iso(-1) });
    expect(pianoOggi(s, T(0), CAT).simulazione).toBeUndefined();
    s = { ...s, settings: { ...s.settings, dataOrale: '2026-10-18' } };
    expect(pianoOggi(s, T(0), CAT).simulazione).toEqual({ ultimaSettimana: true });
    const ord = ordineStudio(CAT).map((a) => a.id);
    for (const a of CAT.argomenti) for (const p of a.prerequisiti) if (ord.includes(p)) expect(ord.indexOf(p), `${p} prima di ${a.id}`).toBeLessThan(ord.indexOf(a.id));
    expect(prossimoNuovo(defaultState(), iso(0), CAT)?.id).toBe(ARG);
  });
});

describe('piano di studio', () => {
  it('senza data: ripassi mancanti, ritmo non stimabile, ordine per priorità con prerequisiti prima', () => {
    const p = pianoStudio(defaultState(), T(0), CAT);
    expect(p.dataOrale).toBeUndefined();
    expect(p.inTempo).toBeUndefined();
    expect(p.giorniStimati).toBeNull();
    expect(p.ripassiMancanti).toBe(3 * p.argomenti);
    expect(p.argomenti).toBe(CAT.argomenti.filter((a) => !a.complemento).length);
    const ord = p.ordine.map((v) => v.argId);
    for (const id of ord) for (const pr of CAT.argomenti.find((a) => a.id === id)!.prerequisiti) if (ord.includes(pr)) expect(ord.indexOf(pr)).toBeLessThan(ord.indexOf(id));
    // gli argomenti integrati oltre la dispensa pesano come gli altri (decisione del 14/10, NF-07)
    const no = CAT.argomenti.find((a) => a.fonte === 'no' && a.formulazioni.length);
    if (no) expect(p.ordine.find((v) => v.argId === no.id)!.priorita).toBeCloseTo(no.formulazioni.length);
  });
  it('con ritmo e data: giorni stimati, in tempo o no, argomenti a rischio', () => {
    let s = lessonStep(defaultState(), ARG, 9, true);
    for (let d = -6; d <= 0; d++) s = giro(s, () => iso(d), undefined, 'g' + d);
    const senza = pianoStudio({ ...s, settings: { ...s.settings, ripassiObiettivo: 3 } }, T(0, 20), CAT);
    expect(senza.ritmo).toBeCloseTo(7 / 14);
    expect(senza.completati).toBe(1);
    expect(senza.giorniStimati).toBe(Math.ceil(senza.ripassiMancanti / senza.ritmo));
    const vicino = pianoStudio({ ...s, settings: { ...s.settings, dataOrale: '2026-10-25' } }, T(0, 20), CAT);
    expect(vicino.giorniAllOrale).toBe(12);
    expect(vicino.giorniDisponibili).toBe(6);
    expect(vicino.inTempo).toBe(false);
    expect(vicino.aRischio.length).toBeGreaterThan(0);
    expect(vicino.aRischio).not.toContain(ARG);
    const lontano = pianoStudio({ ...s, settings: { ...s.settings, ripassiObiettivo: 1, dataOrale: '2027-12-01' } }, T(0, 20), CAT);
    expect(lontano.inTempo).toBe(true);
  });
});

describe('rubrica standard', () => {
  it('costruita dal contenuto: sette voci, chiave con peso 2 e i passi chiave, da non dire', () => {
    const r = rubricaStandard(FN, CAT);
    expect(r.map((v) => v.id)).toEqual([...VOCI_STANDARD]);
    expect(r.find((v) => v.id === 'chiave')!.peso).toBe(2);
    expect(r.find((v) => v.id === 'chiave')!.attese).toHaveLength(D071.passi.filter((p) => p.chiave).length);
    expect(r.find((v) => v.id === 'disegno')!.attese).toEqual(FN.contenuto!.disegno.elementi.filter((e) => e.obbligatorio).map((e) => e.testo));
    expect(r.find((v) => v.id === 'da-non-dire')!.attese).toHaveLength(FN.contenuto!.daNonDire.length);
    expect(rubricaDi(FN, CAT)).toEqual(r);
    const custom = { ...FN, contenuto: { ...FN.contenuto!, rubrica: [{ id: 'x', testo: 'x', peso: 1, attese: ['x'] }] } };
    expect(rubricaDi(custom, CAT).map((v) => v.id)).toEqual(['x']);
    expect(punteggio(r, Object.fromEntries(r.map((v) => [v.id, 1])))).toBe(1);
    expect(punteggio(r, { chiave: 1 })).toBeCloseTo(2 / 8);
  });
});

describe('statistiche', () => {
  it('passi dove mi blocco, calibrazione, simulazioni, previsione', () => {
    let s = lessonStep(defaultState(), ARG, 9, true);
    s = giro(s, () => iso(-2), D071.passi.map((p) => (p.id === 'd071.6' ? 'sbagliato' : 'giusto')), 'a');
    s = addPasso(s, { passoId: 'd071.6', dimId: 'd071', argId: ARG, livello: 3, esito: 'fermato', sicurezza: 5, at: iso(-1) });
    s = addSimulazione(s, { argId: ARG, q: 11, durataS: 60, conLavagna: false, correttore: 'auto', voci: { partenza: 1 }, daNonDire: [], passoMancante: 'd071.4', catena: [], at: iso(-1) });
    const b = passiBlocco(s, CAT);
    expect(b[0]).toMatchObject({ passoId: 'd071.6', n: 2 });
    expect(b.map((x) => x.passoId)).toContain('d071.4');
    const d = dashboard(s, T(0), CAT);
    expect(d.calibrazione.find((c) => c.sicurezza === 5)).toMatchObject({ n: 1, riuscita: 0 });
    expect(d.simulazioni.n).toBe(1);
    expect(d.previsione).toHaveLength(14);
    expect(d.argomenti.find((a) => a.id === ARG)!.stato).toBe('in-corso');
    expect(Number.isFinite(d.capitoli[3].padronanza)).toBe(true);
    expect(retrievability(undefined, T(0))).toBe(0);
  });
});
