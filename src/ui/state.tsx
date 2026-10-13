import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { defaultState, load, save, type AppState } from '../storage/store';
import { connectCloud, historyKey, SyncController, type SyncStatus } from '../storage/sync';
import { rebuildAll } from '../learning/actions';

interface Ctx {
  state: AppState;
  /** aggiorna lo stato (immutabile) e lo salva in localStorage */
  update: (fn: (s: AppState) => AppState) => void;
  replace: (s: AppState) => void;
  saveOk: boolean;
  /** stato della sincronizzazione con l'account ('locale' = solo questo browser) */
  sync: { status: SyncStatus; detail?: string; now: () => void };
}

const StateCtx = createContext<Ctx | null>(null);

export function StateProvider({ children, initial }: { children: ReactNode; initial?: AppState }) {
  const [state, setState] = useState<AppState>(() => rebuildAll(initial ?? load()));
  const [saveOk, setSaveOk] = useState(true);
  useEffect(() => {
    if (!initial) setSaveOk(save(state));
  }, [state, initial]);
  const update = useCallback(
    (fn: (s: AppState) => AppState) =>
      setState((s) => {
        const n = fn(s);
        // le impostazioni più recenti vincono nella fusione tra dispositivi
        return n.settings !== s.settings && n.meta === s.meta ? { ...n, meta: { ...n.meta, settingsAt: new Date().toISOString() } } : n;
      }),
    [],
  );
  const replace = useCallback((s: AppState) => setState(rebuildAll(s)), []);

  // tema: automatico, chiaro o scuro
  const tema = state.settings.tema;
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;
    if (tema === 'chiaro') el.setAttribute('data-theme', 'light');
    else if (tema === 'scuro') el.setAttribute('data-theme', 'dark');
    else el.removeAttribute('data-theme');
  }, [tema]);

  // ---- sincronizzazione con l'account (solo dentro claude.ai; altrove resta tutto nel browser)
  const [sync, setSync] = useState<{ status: SyncStatus; detail?: string }>({ status: 'locale' });
  const stateRef = useRef(state);
  stateRef.current = state;
  const ctrl = useRef<SyncController | null>(null);
  useEffect(() => {
    if (initial) return; // nei test non si sincronizza
    let alive = true;
    let onVis: (() => void) | null = null;
    void connectCloud().then((store) => {
      if (!store || !alive) return;
      setSync({ status: 'collegamento' });
      const c = new SyncController(store, () => stateRef.current, (s) => setState(s), rebuildAll, (status, detail) => alive && setSync({ status, detail }), defaultState);
      ctrl.current = c;
      void c.sync();
      onVis = () => document.visibilityState === 'visible' && void c.sync();
      document.addEventListener('visibilitychange', onVis);
    });
    return () => {
      alive = false;
      if (onVis) document.removeEventListener('visibilitychange', onVis);
    };
  }, [initial]);
  useEffect(() => {
    const c = ctrl.current;
    if (c && c.lastKey && historyKey(state) !== c.lastKey) c.schedule();
  }, [state]);
  const syncNow = useCallback(() => void ctrl.current?.sync(), []);

  const value = useMemo(() => ({ state, update, replace, saveOk, sync: { ...sync, now: syncNow } }), [state, update, replace, saveOk, sync, syncNow]);
  return <StateCtx.Provider value={value}>{children}</StateCtx.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(StateCtx);
  if (!c) throw new Error('useApp fuori da StateProvider');
  return c;
}

/** Router minimale basato sull'hash (funziona anche aprendo il file HTML singolo senza server). */
export function useRoute(): string[] {
  const read = () => (typeof location !== 'undefined' ? location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent) : []);
  const [r, setR] = useState<string[]>(read);
  useEffect(() => {
    const on = () => {
      setR(read());
      window.scrollTo?.(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}

export const go = (path: string) => {
  location.hash = '#/' + path;
};

/** «adesso», aggiornato ogni minuto (le scadenze cambiano col tempo) */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  return now;
}
