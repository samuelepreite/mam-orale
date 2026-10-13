/** Salvataggio e sincronizzazione tra dispositivi: fusione, documenti a blocchi, ciclo lettura → fusione → scrittura. */
import { describe, expect, it, vi } from 'vitest';
// i test dell'app usano un registro ridotto (mappa + freno a nastro): indipendenti dai capitoli in lavorazione
vi.mock('../src/content', () => import('./app-content-mock'));
import { defaultState, exportJSON, importJSON, load, migrate, save, STORAGE_KEY, type AppState, type PassoLog, type SimLog } from '../src/storage/store';
import { changedDocs, fromDocs, historyKey, mergeStates, PAS_CHUNK, SIM_CHUNK, SyncController, toDocs, type CloudStore, type Docs } from '../src/storage/sync';
import { addPasso, addSimulazione, azzera, lessonFeedback, lessonStep, rebuildAll, updateSimulazione } from '../src/learning/actions';
import { iso } from './app-fixture';

const pas = (id: string, at: string, extra: Partial<PassoLog> = {}): Omit<PassoLog, 'id' | 'at'> & { id: string; at: string } => ({
  id, at, passoId: 'd071.2', dimId: 'd071', argId: 'c4-freno-nastro', livello: 2, esito: 'giusto', ...extra,
});
const sim = (id: string, at: string, extra: Partial<SimLog> = {}): Omit<SimLog, 'id' | 'at'> & { id: string; at: string } => ({
  id, at, argId: 'c4-freno-nastro', q: 11, durataS: 120, conLavagna: false, correttore: 'auto', voci: { partenza: 1, chiave: 0.5 }, daNonDire: [], catena: [], ...extra,
});

function fakeStore(): CloudStore & { docs: Docs; writes: number } {
  const st = {
    docs: {} as Docs,
    writes: 0,
    async pull() {
      return JSON.parse(JSON.stringify(st.docs));
    },
    async push(d: Docs, ids: string[]) {
      for (const i of ids) {
        st.docs[i] = JSON.parse(JSON.stringify(d[i]));
        st.writes++;
      }
    },
  };
  return st;
}
function device(store: CloudStore, init: AppState) {
  let s = init;
  const c = new SyncController(store, () => s, (n) => (s = n), rebuildAll, () => {}, defaultState, 0);
  return { get: () => s, c };
}

describe('store', () => {
  it('chiave mam:v1, salvataggio senza schede, ricarica con le impostazioni di default', () => {
    const mem: Record<string, string> = {};
    const st = { getItem: (k: string) => mem[k] ?? null, setItem: (k: string, v: string) => void (mem[k] = v) };
    const s = addPasso(defaultState(), pas('p1', iso(0)));
    expect(Object.keys(s.srs)).toEqual(['passo:d071.2']);
    expect(save(s, st)).toBe(true);
    expect(Object.keys(mem)).toEqual([STORAGE_KEY]);
    expect(JSON.parse(mem[STORAGE_KEY]).srs).toEqual({});
    const back = load(st);
    expect(back.passi).toHaveLength(1);
    expect(back.settings).toEqual({ ripassiObiettivo: 3, minutiGiorno: 45, voce: true });
  });
  it('export/import, rifiuta altri file e versioni future, ripulisce impostazioni strane', () => {
    const s = addPasso(defaultState(), pas('p1', iso(0)));
    expect(importJSON(exportJSON(s)).passi[0].id).toBe('p1');
    expect(() => importJSON(JSON.stringify({ app: 'seimafi', version: 1 }))).toThrow();
    expect(() => migrate({ version: 99 })).toThrow();
    const m = migrate({ version: 1, settings: { ripassiObiettivo: 'x', minutiGiorno: 5000, dataOrale: 'domani' }, passi: [null, { passoId: 'd071.1', at: iso(0) }] });
    expect(m.settings.ripassiObiettivo).toBe(3);
    expect(m.settings.minutiGiorno).toBe(240);
    expect(m.settings.dataOrale).toBeUndefined();
    expect(m.passi).toHaveLength(1);
  });
});

describe('fusione', () => {
  it('unione di passi e simulazioni senza doppioni; vince la simulazione modificata dopo', () => {
    let a = addPasso(defaultState(), pas('x1', iso(0)));
    let b = addPasso(addPasso(defaultState(), pas('x1', iso(0))), pas('x2', iso(1)));
    a = addSimulazione(a, sim('s1', iso(0)));
    b = addSimulazione(b, sim('s1', iso(0)));
    b = updateSimulazione(b, 's1', { catena: [{ domanda: 'Perché θ* = β?', risposta: 'nastro fermo', voto: 1 }] });
    const m = mergeStates(a, b);
    expect(m.passi.map((x) => x.id)).toEqual(['x1', 'x2']);
    expect(m.simulazioni).toHaveLength(1);
    expect(m.simulazioni[0].catena[0].voto).toBe(1);
    expect(mergeStates(b, a).simulazioni[0].catena).toHaveLength(1);
  });
  it('lezioni: passo massimo e riscontro più recente; argomenti: prima visita, livello massimo', () => {
    let a = lessonStep(defaultState(), 'c4-freno-nastro', 3);
    let b = lessonStep(defaultState(), 'c4-freno-nastro', 8, true);
    a = lessonFeedback(a, 'c4-freno-nastro', 'disegno', 'confuso', 'non capisco β');
    b = { ...b, lezioni: { ...b.lezioni, 'c4-freno-nastro': { ...b.lezioni['c4-freno-nastro'], feedback: { disegno: { v: 'chiaro', at: '2020-01-01T00:00:00.000Z' } } } } };
    const m = mergeStates(a, b);
    expect(m.lezioni['c4-freno-nastro'].passo).toBe(8);
    expect(m.lezioni['c4-freno-nastro'].doneAt).toBeTruthy();
    expect(m.lezioni['c4-freno-nastro'].feedback.disegno.v).toBe('confuso');
    expect(m.argomenti['c4-freno-nastro'].livello).toBe(2);
  });
  it('vincono le impostazioni più recenti', () => {
    const a = { ...defaultState(), meta: { settingsAt: iso(1) } };
    a.settings.minutiGiorno = 30;
    const b = { ...defaultState(), meta: { settingsAt: iso(2) } };
    b.settings.minutiGiorno = 60;
    expect(mergeStates(a, b).settings.minutiGiorno).toBe(60);
    expect(mergeStates(b, a).settings.minutiGiorno).toBe(60);
  });
  it('«Azzera» scarta la storia precedente anche dall\'altro dispositivo', () => {
    const old0 = addSimulazione(addPasso(defaultState(), pas('x1', iso(0))), sim('s1', iso(0)));
    const old = { ...old0, lezioni: { 'c4-freno-nastro': { passo: 2, startedAt: iso(0), doneAt: iso(0), feedback: {} } } };
    const reset = azzera(old);
    const m = mergeStates(old, reset);
    expect(m.passi).toHaveLength(0);
    expect(m.simulazioni).toHaveLength(0);
    expect(m.lezioni).toEqual({});
    const later = addPasso(reset, pas('x9', new Date(Date.now() + 1000).toISOString()));
    expect(mergeStates(old, later).passi.map((x) => x.id)).toEqual(['x9']);
  });
});

describe('documenti', () => {
  it('andata e ritorno con più blocchi; schede ricalcolate identiche', () => {
    let s = defaultState();
    for (let i = 0; i < PAS_CHUNK * 2 + 3; i++) s = addPasso(s, pas(`p${i}`, new Date(Date.UTC(2026, 0, 1) + i * 3600000).toISOString(), { esito: i % 3 ? 'giusto' : 'sbagliato' }));
    for (let i = 0; i < SIM_CHUNK + 1; i++) s = addSimulazione(s, sim(`s${i}`, new Date(Date.UTC(2026, 1, 1) + i * 3600000).toISOString()));
    const docs = toDocs(s);
    expect(Object.keys(docs).filter((k) => k.startsWith('pas-'))).toHaveLength(3);
    expect(Object.keys(docs).filter((k) => k.startsWith('sim-'))).toHaveLength(2);
    const back = rebuildAll(fromDocs(docs, defaultState())!);
    expect(historyKey(back)).toBe(historyKey(s));
    expect(JSON.stringify(back.srs)).toBe(JSON.stringify(rebuildAll(s).srs));
  });
  it('ogni documento resta sotto 256 KiB (blocchi pieni, trascrizioni lunghe)', () => {
    let s = defaultState();
    for (let i = 0; i < PAS_CHUNK; i++) s.passi.push({ ...pas(`p${i}`, iso(0)), errore: 'termine-perso', sicurezza: 4, giro: 'abcdefghijklmnop', dove: 'allena' } as PassoLog);
    for (let i = 0; i < SIM_CHUNK; i++) s = addSimulazione(s, sim(`s${i}`, iso(0), { testo: 'è'.repeat(20000), nota: 'n'.repeat(500), catena: [{ domanda: 'd'.repeat(300), risposta: 'r'.repeat(3000), voto: 1 }, { domanda: 'd'.repeat(300), risposta: 'r'.repeat(3000) }] }));
    for (const [k, d] of Object.entries(toDocs(s))) expect(new TextEncoder().encode(JSON.stringify(d)).length, k).toBeLessThan(256 * 1024);
  });
  it('si riscrivono solo i documenti cambiati', () => {
    const s = defaultState();
    for (let i = 0; i < PAS_CHUNK + 1; i++) s.passi.push(pas(`p${i}`, iso(0)) as PassoLog);
    const known = Object.fromEntries(Object.entries(toDocs(s)).map(([k, v]) => [k, JSON.stringify(v)]));
    s.passi.push(pas('nuovo', iso(1)) as PassoLog);
    expect(changedDocs(toDocs(s), known)).toEqual(['pas-1']);
  });
  it('documenti malformati ignorati', () => {
    expect(fromDocs({}, defaultState())).toBeNull();
    const s = fromDocs({ core: { settings: { minutiGiorno: 20 } }, 'pas-0': { items: 'rotto' }, 'sim-0': {} } as unknown as Docs, defaultState())!;
    expect(s.passi).toEqual([]);
    expect(s.settings.minutiGiorno).toBe(20);
  });
});

describe('due dispositivi', () => {
  it('telefono e computer convergono sulla stessa storia e sulle stesse schede', async () => {
    const store = fakeStore();
    const phone = device(store, addPasso(defaultState(), pas('p1', iso(0))));
    const laptop = device(store, addSimulazione(addPasso(defaultState(), pas('l1', iso(1), { passoId: 'd071.4', esito: 'sbagliato' })), sim('s1', iso(2), { passoMancante: 'd071.6' })));
    await phone.c.sync();
    await laptop.c.sync();
    await phone.c.sync();
    expect(phone.get().passi.map((a) => a.id)).toEqual(['p1', 'l1']);
    expect(historyKey(phone.get())).toBe(historyKey(laptop.get()));
    expect(JSON.stringify(phone.get().srs)).toBe(JSON.stringify(laptop.get().srs));
    expect(Object.keys(phone.get().srs).sort()).toEqual(['passo:d071.2', 'passo:d071.4', 'passo:d071.6', 'rubrica:c4-freno-nastro:chiave', 'rubrica:c4-freno-nastro:partenza']);
  });
  it('senza modifiche un nuovo ciclo non scrive nulla', async () => {
    const store = fakeStore();
    const d = device(store, addPasso(defaultState(), pas('p1', iso(0))));
    await d.c.sync();
    const w = store.writes;
    await d.c.sync();
    expect(store.writes).toBe(w);
  });
  it('un dispositivo nuovo scarica tutto senza cancellare il server; un errore non perde i dati', async () => {
    const store = fakeStore();
    const old = device(store, addPasso(addPasso(defaultState(), pas('p1', iso(0))), pas('p2', iso(1))));
    await old.c.sync();
    const fresh = device(store, defaultState());
    await fresh.c.sync();
    expect(fresh.get().passi).toHaveLength(2);
    expect(fromDocs(store.docs, defaultState())!.passi).toHaveLength(2);
    const broken: CloudStore = { pull: async () => Promise.reject({ code: 'unavailable' }), push: async () => {} };
    let status = '';
    let s = addPasso(defaultState(), pas('p1', iso(0)));
    const c = new SyncController(broken, () => s, (n) => (s = n), rebuildAll, (st) => (status = st), defaultState, 0);
    await c.sync();
    expect(status).toBe('errore');
    expect(s.passi).toHaveLength(1);
  });
});
