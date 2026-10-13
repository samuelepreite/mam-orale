import { useMemo } from 'react';
import { CAPITOLI } from '../content';
import { CATALOGO } from '../learning/catalogo';
import { padronanzaCapitoli } from '../learning/mastery';
import { StateProvider, useApp, useNow, useRoute } from './state';
import { Icon, Logo } from './components/Icon';
import { CapChip } from './components/bits';
import { Oggi } from './pages/Oggi';
import { Argomenti } from './pages/Argomenti';
import { ArgomentoPage } from './pages/Argomento';
import { Orale } from './pages/Orale';
import { Progressi } from './pages/Progressi';
import { Altro } from './pages/Altro';
import type { AppState } from '../storage/store';

const NAV: { to: string; label: string; icon: string; also?: string[] }[] = [
  { to: '', label: 'Oggi', icon: 'oggi' },
  { to: 'argomenti', label: 'Argomenti', icon: 'argomenti', also: ['argomento'] },
  { to: 'orale', label: 'Orale', icon: 'orale' },
  { to: 'progressi', label: 'Progressi', icon: 'progressi' },
  { to: 'altro', label: 'Altro', icon: 'altro' },
];

const SYNC_TEXT: Record<string, string> = {
  sincronizzato: 'Salvato sul tuo account',
  errore: 'Sincronizzazione non riuscita: progressi nel browser',
  collegamento: 'Collegamento all\'account…',
  locale: 'Salvato in questo browser',
};

function SyncStatus({ compact = false }: { compact?: boolean }) {
  const { sync } = useApp();
  const text = SYNC_TEXT[sync.status] ?? SYNC_TEXT.locale;
  return (
    <a href="#/altro" className={`sync-status sync-${sync.status}`} title={text} aria-label={`Stato del salvataggio: ${text}`}>
      <span className="sync-dot" />
      {!compact && <span>{text}</span>}
    </a>
  );
}

function Sidebar() {
  const r = useRoute();
  const { state, sync } = useApp();
  const now = useNow();
  const cur = r[0] ?? '';
  const caps = useMemo(() => padronanzaCapitoli(state, now, CATALOGO), [state, now]);
  return (
    <aside className="sidebar">
      <a href="#/" className="brand">
        <Logo spinning={sync.status === 'collegamento'} />
        <span>
          MAM I <small>orale</small>
        </span>
      </a>
      <nav className="side-nav" aria-label="Sezioni">
        {NAV.map((n) => {
          const on = cur === n.to || !!n.also?.includes(cur);
          return (
            <a key={n.to} href={`#/${n.to}`} className={on ? 'on' : ''} aria-current={on ? 'page' : undefined}>
              <Icon name={n.icon} />
              {n.label}
            </a>
          );
        })}
      </nav>
      <div aria-label="Capitoli">
        <p className="side-title">Capitoli</p>
        {CAPITOLI.map((c) => {
          const p = caps.find((x) => x.cap === c.id)!;
          return (
            <a key={c.id} href="#/argomenti" onClick={(e) => { e.preventDefault(); location.hash = '#/argomenti'; setTimeout(() => document.getElementById(`cap-${c.id}`)?.scrollIntoView?.({ block: 'start' }), 80); }} className={`side-cap cap-${c.id}`} title={`${c.titolo}: ${p.pronti}/${p.totale} argomenti pronti`}>
              <CapChip cap={c.id} />
              <span className="side-cap-title">{c.titolo}</span>
              <span className="mini-bar">
                <span style={{ width: `${Math.round(p.padronanza * 100)}%` }} />
              </span>
            </a>
          );
        })}
      </div>
      <div className="side-foot">
        <SyncStatus />
      </div>
    </aside>
  );
}

function MobileBar() {
  const { sync } = useApp();
  return (
    <header className="mobilebar">
      <a href="#/" className="brand">
        <Logo size={24} spinning={sync.status === 'collegamento'} />
        <span>
          MAM I <small>orale</small>
        </span>
      </a>
      <SyncStatus compact />
    </header>
  );
}

function TabBar() {
  const r = useRoute();
  const cur = r[0] ?? '';
  return (
    <nav className="tabbar" aria-label="Sezioni">
      {NAV.map((t) => {
        const on = cur === t.to || !!t.also?.includes(cur);
        return (
          <a key={t.to} href={`#/${t.to}`} className={on ? 'on' : ''} aria-current={on ? 'page' : undefined}>
            <Icon name={t.icon} size={22} />
            <span>{t.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function Router() {
  const [a, b, c] = useRoute();
  switch (a) {
    case 'argomenti':
      return <Argomenti />;
    case 'argomento':
      return <ArgomentoPage key={b} id={b ?? ''} tab={c} />;
    case 'orale':
      return <Orale />;
    case 'progressi':
      return <Progressi />;
    case 'altro':
      return <Altro />;
    default:
      return <Oggi />;
  }
}

export function Shell() {
  const r = useRoute();
  const wide = r[0] === 'argomento' && (r[2] === 'lezione' || r[2] === 'allena');
  return (
    <div className="shell">
      <Sidebar />
      <MobileBar />
      <main key={r.join('/')} className={`route ${wide ? 'wide' : ''}`}>
        <Router />
        <footer className="small muted">MAM I orale · dalla dispensa di Meccanica Applicata alle Macchine I. Le correzioni con Claude sono un aiuto allo studio, non un voto.</footer>
      </main>
      <TabBar />
    </div>
  );
}

export default function App({ initial }: { initial?: AppState }) {
  return (
    <StateProvider initial={initial}>
      <Shell />
    </StateProvider>
  );
}
