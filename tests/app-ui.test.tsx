// @vitest-environment jsdom
/**
 * Interfaccia (smoke) con il contenuto C4 del freno a nastro: ogni pagina si apre senza NaN/undefined; lezione fino in
 * fondo; allenatore livello 2 e 3; simulazione con autovalutazione e con Claude finto (risposta valida ed errore);
 * lavagna (tratto, annulla, esportazione).
 */
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
// i test dell'app usano un registro ridotto (mappa + freno a nastro): indipendenti dai capitoli in lavorazione
vi.mock('../src/content', () => import('./app-content-mock'));
// animazioni: un modello finto con un comando (i meccanismi veri si provano con tools/percorri.mjs)
vi.mock('../src/diagrams/registry', () => ({
  MECCANISMI: {},
  VisualHost: ({ v }: { v: { id: string } }) => (
    <figure className="mech">
      <figcaption>modello {v.id}</figcaption>
      <button type="button">comando</button>
    </figure>
  ),
}));
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { StateProvider, useApp } from '../src/ui/state';
import { Shell } from '../src/ui/App';
import { OralSim } from '../src/ui/components/OralSim';
import { Lavagna, type LavagnaApi } from '../src/ui/components/Lavagna';
import { lessonSteps } from '../src/ui/components/Lesson';
import { defaultState, type AppState } from '../src/storage/store';
import { rubricaDi } from '../src/learning/rubrica';
import { FN, D071 } from './app-fixture';
import { ARGOMENTI } from './app-content-mock';

const ARG = FN.id;
let probe: AppState | null = null;
function Probe() {
  probe = useApp().state;
  return null;
}

beforeAll(() => {
  // jsdom non ha canvas, ResizeObserver, scrollIntoView: stub minimi
  const ctx = new Proxy({}, { get: (_t, k) => (k === 'canvas' ? null : () => undefined) });
  HTMLCanvasElement.prototype.getContext = (() => ctx) as unknown as HTMLCanvasElement['getContext'];
  HTMLCanvasElement.prototype.toBlob = function (cb: BlobCallback) {
    cb(new Blob(['png'], { type: 'image/png' }));
  };
  Element.prototype.scrollIntoView = () => {};
  if (!window.requestAnimationFrame) window.requestAnimationFrame = ((cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
});
afterEach(() => {
  cleanup();
  delete (window as unknown as { claude?: unknown }).claude;
  probe = null;
});

function app(hash: string, initial: AppState = defaultState()) {
  window.location.hash = hash;
  return render(
    <StateProvider initial={initial}>
      <Shell />
      <Probe />
    </StateProvider>,
  );
}
const testoPulito = () => {
  const t = document.body.textContent ?? '';
  expect(t, 'NaN nel testo').not.toMatch(/\bNaN\b/);
  expect(t, 'undefined nel testo').not.toMatch(/\bundefined\b/);
};
const btn = (name: RegExp | string) => screen.getByRole('button', { name });
const qbtn = (name: RegExp | string) => screen.queryByRole('button', { name });

describe('pagine', () => {
  it('ogni pagina si apre, in chiaro e in scuro, senza NaN né undefined', () => {
    const visto = { ...defaultState() };
    visto.lezioni[ARG] = { passo: 9, startedAt: '2026-10-01T10:00:00.000Z', doneAt: '2026-10-01T10:00:00.000Z', feedback: {} };
    visto.argomenti[ARG] = { vistoAt: '2026-10-01T10:00:00.000Z', livello: 2 };
    for (const tema of [undefined, 'scuro'] as const)
      for (const h of ['#/', '#/argomenti', `#/argomento/${ARG}/lezione`, `#/argomento/${ARG}/scheda`, `#/argomento/${ARG}/allena`, `#/argomento/${ARG}/orale`, '#/argomento/c4-eulero', '#/orale', '#/progressi', '#/altro']) {
        const { unmount } = app(h, { ...visto, settings: { ...visto.settings, tema } });
        expect(document.querySelector('main')!.textContent!.length, h).toBeGreaterThan(50);
        testoPulito();
        unmount();
      }
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
  it('argomento senza contenuto: «in preparazione» con domande e pagine dalla mappa', () => {
    const vuoto = ARGOMENTI.find((a) => !a.contenuto);
    if (!vuoto) return; // tutti i capitoli pronti
    app(`#/argomento/${vuoto.id}`);
    expect(screen.getByText(/In preparazione/)).toBeTruthy();
    expect(screen.getByText(/Dispensa pp\./)).toBeTruthy();
  });
  it('«Oggi» per uno studente nuovo propone la lezione del freno a nastro', () => {
    app('#/');
    expect(screen.getAllByText(/Argomento nuovo/).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Inizia la lezione' }).getAttribute('href')).toContain('/lezione');
  });
  it('«Altro»: impostazioni salvate, data facoltativa, azzera con conferma nella pagina', () => {
    app('#/altro');
    const n = screen.getByLabelText(/Ripassi riusciti/) as HTMLInputElement;
    fireEvent.change(n, { target: { value: '5' } });
    expect(probe!.settings.ripassiObiettivo).toBe(5);
    expect(probe!.meta.settingsAt).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Data dell/), { target: { value: '2026-12-01' } });
    expect(probe!.settings.dataOrale).toBe('2026-12-01');
    fireEvent.click(btn('togli la data'));
    expect(probe!.settings.dataOrale).toBeUndefined();
    fireEvent.click(btn('scuro'));
    expect(probe!.settings.tema).toBe('scuro');
    fireEvent.click(btn(/Azzera tutti/));
    fireEvent.click(btn('Sì, azzera'));
    expect(probe!.meta.resetAt).toBeTruthy();
    expect(probe!.settings.ripassiObiettivo).toBe(5);
  });
});

describe('lezione', () => {
  it('si percorre fino in fondo: domande sui passi chiave, previsione che sblocca il modello, riscontri, fine', () => {
    const steps = lessonSteps(FN);
    expect(steps.map((s) => s.kind)).toEqual(['subito', 'ipotesi', 'disegno', 'equazione', 'dim', 'prova', 'significato', 'nondire', 'riassunto']);
    app(`#/argomento/${ARG}/lezione`);
    fireEvent.click(screen.getAllByRole('button', { name: 'non ho capito' })[0]);
    const nota = screen.getByLabelText('nota sul passo');
    fireEvent.change(nota, { target: { value: 'troppo in fretta' } });
    fireEvent.blur(nota);
    expect(probe!.lezioni[ARG].feedback.subito).toMatchObject({ v: 'confuso', note: 'troppo in fretta' });
    for (let guard = 0; guard < 200; guard++) {
      const active = document.querySelector('.lesson-step.active')!;
      const opt = active.querySelector('.deriv-next .option:not([disabled])') as HTMLButtonElement | null;
      if (opt) {
        fireEvent.click(opt);
        continue;
      }
      const prev = active.querySelector('.card .option:not([disabled])') as HTMLButtonElement | null;
      if (prev) {
        expect(active.querySelector('.locked-veil')).toBeTruthy();
        fireEvent.click(prev);
        expect(active.querySelector('.locked-veil')).toBeNull();
        continue;
      }
      const nx = active.querySelector('.deriv-next button:not(.option)') as HTMLButtonElement | null;
      if (nx) {
        fireEvent.click(nx);
        continue;
      }
      const av = qbtn(/^Avanti$/);
      if (av) {
        fireEvent.click(av);
        continue;
      }
      break;
    }
    fireEvent.click(btn('Ho finito la lezione'));
    expect(probe!.lezioni[ARG].doneAt).toBeTruthy();
    expect(probe!.argomenti[ARG].vistoAt).toBeTruthy();
    const chiave = D071.passi.filter((p) => p.chiave && p.distrattori.length);
    expect(probe!.passi.filter((p) => p.livello === 1).map((p) => p.passoId)).toEqual(chiave.map((p) => p.id));
    expect(Object.keys(probe!.srs).filter((k) => k.startsWith('passo:'))).toHaveLength(0); // il livello 1 non programma
    expect(probe!.richiami.some((r) => r.qid === 'previsione:c4-fn-verso')).toBe(true);
    expect(screen.getByText(/Lezione completata/)).toBeTruthy();
    expect(document.querySelectorAll('.nf-box').length).toBeGreaterThan(0); // «la dispensa scrive…» (NF-21)
    testoPulito();
  });
});

/** risponde a tutti i passi nascosti del livello 2: scelta (prima opzione) o autocontrollo */
function percorriLivello2(esitoScritto: RegExp = /^giusto$/) {
  for (let guard = 0; guard < 100; guard++) {
    const opt = document.querySelector('.trainer .deriv-next .option:not([disabled])') as HTMLButtonElement | null;
    if (opt) {
      fireEvent.click(opt);
      continue;
    }
    const mostra = qbtn('Mostra il passo');
    if (mostra) {
      fireEvent.click(mostra);
      fireEvent.click(btn(esitoScritto));
      continue;
    }
    const nx = qbtn(/Prossimo passo|Fine della catena/);
    if (nx) {
      fireEvent.click(nx);
      continue;
    }
    break;
  }
}

describe('allenatore', () => {
  it('livello 2: fase 1 nasconde i passi non chiave, ogni passo va in FSRS con lo stesso giro', () => {
    app(`#/argomento/${ARG}/allena`);
    expect(screen.getByText(/Fase 1/)).toBeTruthy();
    percorriLivello2();
    const nonChiave = D071.passi.filter((p) => !p.chiave).map((p) => p.id);
    const log = probe!.passi.filter((p) => p.livello === 2);
    expect(log.map((p) => p.passoId)).toEqual(nonChiave);
    expect(new Set(log.map((p) => p.giro)).size).toBe(1);
    for (const id of nonChiave) expect(probe!.srs[`passo:${id}`]).toBeTruthy();
    expect(screen.getByText(/pass[io] giust[io] su/)).toBeTruthy();
    testoPulito();
  });
  it('livello 2 fase 2 dopo la fase 1 riuscita: nascosti tutti i passi', () => {
    const s = defaultState();
    s.passi = D071.passi.filter((p) => !p.chiave).map((p, i) => ({ id: `x${i}`, passoId: p.id, dimId: 'd071', argId: ARG, at: '2026-10-01T10:00:00.000Z', livello: 2 as const, esito: 'giusto' as const }));
    app(`#/argomento/${ARG}/allena`, s);
    expect(screen.getByText(/Fase 2/)).toBeTruthy();
    percorriLivello2();
    expect(probe!.passi.filter((p) => p.livello === 2).length).toBe(s.passi.length + D071.passi.length);
  });
  it('livello 3: foglio bianco, sicurezza obbligatoria, confronto con passo fermato e sbagliato, checklist del disegno', () => {
    app(`#/argomento/${ARG}/allena`);
    fireEvent.click(btn(/Livello 3/));
    expect(document.querySelector('.lav-sheet canvas')).toBeTruthy();
    expect((btn('Confronta con la soluzione') as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(btn('4'));
    fireEvent.click(btn('Confronta con la soluzione'));
    const righe = document.querySelectorAll('.cmp-row');
    expect(righe.length).toBe(D071.passi.length);
    fireEvent.click(Array.from(righe[1].querySelectorAll('button')).find((b) => b.textContent === 'sbagliato')!);
    fireEvent.click(Array.from(righe[4].querySelectorAll('button')).find((b) => b.textContent === 'mi sono fermato qui')!);
    for (const e of FN.contenuto!.disegno.elementi.filter((x) => x.obbligatorio)) fireEvent.click(screen.getAllByRole('checkbox', { name: new RegExp(e.testo.slice(0, 12).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })[0]);
    fireEvent.click(btn('Registra il confronto'));
    const log = probe!.passi.filter((p) => p.livello === 3);
    expect(log.map((p) => p.esito)).toEqual(D071.passi.map((_, i) => (i === 1 ? 'sbagliato' : i >= 4 ? 'fermato' : 'giusto')));
    expect(log.every((p) => p.sicurezza === 4)).toBe(true);
    expect(probe!.richiami.find((r) => r.qid === `disegno:${ARG}`)?.corretto).toBe(true);
    expect(probe!.srs[`disegno:${ARG}`]).toBeTruthy();
  });
});

describe('simulazione', () => {
  function rispondi() {
    fireEvent.click(btn('Inizia a rispondere'));
    fireEvent.change(screen.getByLabelText(/La tua risposta/), { target: { value: 'Il freno a nastro: nastro avvolto per beta, Eulero senza centrifuga, T1 = T2 e^{f beta}, leva T2 c = F a.' } });
    fireEvent.click(btn('Ho finito'));
  }
  it('con autovalutazione: rubrica, da non dire, passo mancante, domande a catena, registro', () => {
    render(
      <StateProvider initial={defaultState()}>
        <OralSim argId={ARG} />
        <Probe />
      </StateProvider>,
    );
    expect(screen.getByText(FN.formulazioni[0].testo)).toBeTruthy();
    rispondi();
    expect(qbtn('Correggi con Claude')).toBeNull(); // fuori da claude.ai
    fireEvent.click(btn('Autovalutazione guidata'));
    const rub = rubricaDi(FN);
    expect((btn('Dai i punti a tutte le voci') as HTMLButtonElement).disabled).toBe(true);
    for (const v of rub) {
      const g = screen.getByRole('group', { name: v.testo });
      fireEvent.click(Array.from(g.querySelectorAll('button')).find((b) => b.textContent === (v.id === 'chiave' ? 'in parte' : 'sì'))!);
    }
    fireEvent.click(screen.getByRole('checkbox', { name: FN.contenuto!.daNonDire[0].frase }));
    fireEvent.change(screen.getByLabelText(/primo passo che hai saltato/), { target: { value: 'd071.4' } });
    fireEvent.click(btn('Conferma la correzione'));
    const sim = probe!.simulazioni[0];
    expect(sim).toMatchObject({ argId: ARG, correttore: 'auto', passoMancante: 'd071.4', conLavagna: false });
    expect(sim.voci.chiave).toBe(0.5);
    expect(sim.daNonDire).toEqual([FN.contenuto!.daNonDire[0].frase]);
    expect(probe!.srs['rubrica:c4-freno-nastro:chiave']).toBeTruthy();
    expect(probe!.srs['passo:d071.4']).toBeTruthy();
    // domande a catena
    expect(screen.getByText('Domande a catena')).toBeTruthy();
    fireEvent.click(btn('Mostra le risposte attese'));
    for (const g of screen.getAllByRole('group', { name: /voto della domanda/ })) fireEvent.click(Array.from(g.querySelectorAll('button')).find((b) => b.textContent === 'sì')!);
    fireEvent.click(btn(/Vedi l.esito/));
    expect(probe!.simulazioni[0].catena.every((c) => c.voto === 1)).toBe(true);
    expect(probe!.simulazioni[0].aggiornatoAt).toBeTruthy();
    expect(screen.getByText(/Esito della simulazione/)).toBeTruthy();
    expect(screen.getByText(/Passo mancante/)).toBeTruthy();
    testoPulito();
  });

  it('con Claude: richiesta con la trascrizione, voci proposte, domande a catena dagli approfondimenti', async () => {
    const rub = rubricaDi(FN);
    const json = vi.fn(async (prompt: string, _opts?: unknown) => {
      expect(prompt).toContain('T1 = T2 e^{f beta}');
      return { voci: rub.map((v) => ({ id: v.id, punti: v.id === 'disegno' ? 0 : 1, motivo: `motivo ${v.id}` })), daNonDireDetti: [], passoMancante: null, commento: 'Manca il disegno.', domandeACatena: [{ id: 'a2', domanda: 'Come ricavi Eulero?' }] };
    });
    (window as unknown as { claude: unknown }).claude = { use: async (n: string) => (n === 'sample' ? { json, limits: async () => ({ maxPromptBytes: 262144 }) } : null) };
    render(
      <StateProvider initial={defaultState()}>
        <OralSim argId={ARG} />
        <Probe />
      </StateProvider>,
    );
    await act(async () => {});
    rispondi();
    fireEvent.click(await screen.findByRole('button', { name: 'Correggi con Claude' }));
    await waitFor(() => expect(screen.getByText(/Manca il disegno/)).toBeTruthy());
    expect(json).toHaveBeenCalledTimes(1);
    expect(json.mock.calls[0][1]).toMatchObject({ modelTier: 'default' });
    expect(screen.getByText('motivo disegno')).toBeTruthy();
    fireEvent.click(btn('Conferma la correzione'));
    expect(probe!.simulazioni[0]).toMatchObject({ correttore: 'claude', voci: expect.objectContaining({ disegno: 0, partenza: 1 }) });
    expect(screen.getByText('Come ricavi Eulero?')).toBeTruthy();
    fireEvent.click(btn('Salta le domande a catena'));
    expect(screen.getByText(/corretta con Claude/)).toBeTruthy();
  });

  it('Claude non disponibile (rate_limited) o non consentito: messaggio chiaro e autovalutazione', async () => {
    const json = vi.fn(async () => Promise.reject({ code: 'rate_limited', message: 'x' }));
    (window as unknown as { claude: unknown }).claude = { use: async () => ({ json, limits: async () => ({ maxPromptBytes: 1 }) }) };
    render(
      <StateProvider initial={defaultState()}>
        <OralSim argId={ARG} />
      </StateProvider>,
    );
    await act(async () => {});
    rispondi();
    fireEvent.click(await screen.findByRole('button', { name: 'Correggi con Claude' }));
    await waitFor(() => expect(screen.getByText(/troppe richieste a Claude/)).toBeTruthy());
    expect(screen.getByText('Dai i punti a tutte le voci')).toBeTruthy();
  });
});

describe('lavagna', () => {
  it('tratto con il puntatore, annulla/ripeti, cancella, fogli, esportazione PNG', async () => {
    let api: LavagnaApi | null = null;
    render(<StateProvider initial={defaultState()}><Lavagna onApi={(x) => (api = x)} elementi={FN.contenuto!.disegno.elementi} riferimento={{ svg: FN.contenuto!.disegno.svg }} /></StateProvider>);
    const cv = document.querySelector('canvas')!;
    cv.getBoundingClientRect = () => ({ left: 0, top: 0, width: 500, height: 350, right: 500, bottom: 350, x: 0, y: 0, toJSON: () => ({}) });
    expect(api!.vuota()).toBe(true);
    expect(await api!.toBlob()).toBeNull();
    fireEvent.pointerDown(cv, { clientX: 10, clientY: 10, pointerId: 1, pointerType: 'mouse' });
    fireEvent.pointerMove(cv, { clientX: 60, clientY: 40, pointerId: 1, pointerType: 'mouse' });
    fireEvent.pointerUp(cv, { pointerId: 1 });
    expect(api!.vuota()).toBe(false);
    expect((btn('annulla') as HTMLButtonElement).disabled).toBe(false);
    const blob = await api!.toBlob();
    expect(blob?.type).toBe('image/png');
    fireEvent.click(btn('annulla'));
    expect(api!.vuota()).toBe(true);
    fireEvent.click(btn('ripeti'));
    expect(api!.vuota()).toBe(false);
    fireEvent.click(btn('+ foglio'));
    expect(btn('foglio 2').getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(btn('foglio 1'));
    fireEvent.click(btn('cancella'));
    expect(api!.vuota()).toBe(true);
    fireEvent.click(btn('Mostra il disegno di riferimento'));
    expect(document.querySelector('.figura svg')).toBeTruthy();
    fireEvent.click(btn('schermo intero'));
    expect(document.querySelector('.lavagna.full')).toBeTruthy();
  });
});
