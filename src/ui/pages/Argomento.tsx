/** Pagina di un argomento con quattro schede: Lezione · Scheda · Allena · Orale. Senza contenuto: «in preparazione». */
import { useMemo } from 'react';
import { argomento, CAPITOLI } from '../../content';
import { padronanzaArgomento, ripassiRiusciti, statoArgomento, STATO_TESTO } from '../../learning/mastery';
import { useApp, useNow } from '../state';
import { Bar, CapChip, pct } from '../components/bits';
import { LessonView } from '../components/Lesson';
import { Scheda } from '../components/Scheda';
import { Trainer } from '../components/Trainer';
import { OralSim } from '../components/OralSim';
import { FonteBadge } from './Argomenti';

const TABS = [
  { k: 'lezione', t: 'Lezione' },
  { k: 'scheda', t: 'Scheda' },
  { k: 'allena', t: 'Allena' },
  { k: 'orale', t: 'Orale' },
] as const;

export function ArgomentoPage({ id, tab }: { id: string; tab?: string }) {
  const { state } = useApp();
  const now = useNow();
  const a = argomento(id);
  const pad = useMemo(() => (a ? padronanzaArgomento(state, a, now) : 0), [state, a, now]);
  const rip = useMemo(() => ripassiRiusciti(state)[id] ?? 0, [state, id]);
  if (!a) return <div className="card">Argomento non trovato. <a href="#/argomenti">Tutti gli argomenti</a></div>;
  const cap = CAPITOLI.find((c) => c.id === a.cap);
  const st = statoArgomento(state, a, pad, rip);
  const visto = !!state.lezioni[a.id]?.doneAt;
  const cur = TABS.some((t) => t.k === tab) ? tab! : visto ? 'scheda' : 'lezione';
  return (
    <div className={`page cap-${a.cap}`}>
      <a href="#/argomenti" className="small">
        ← {cap?.titolo ?? 'Argomenti'}
      </a>
      <div className="row" style={{ marginTop: 6 }}>
        <CapChip cap={a.cap} />
        <span className={`badge st-${st}`}>{STATO_TESTO[st]}</span>
        <FonteBadge a={a} />
        {a.complemento && <span className="badge">complemento</span>}
      </div>
      <h1>{a.titolo}</h1>
      <p className="small muted">
        Dispensa pp. {a.pagine}
        {a.contenuto && (
          <>
            {' '}
            · padronanza {pct(pad)} · ripassi riusciti {rip}/{state.settings.ripassiObiettivo}
          </>
        )}
      </p>
      {a.contenuto && <Bar v={pad} />}
      {a.formulazioni.length > 0 && (
        <details open={!a.contenuto}>
          <summary className="small">Come lo chiedono all&apos;orale ({a.formulazioni.length})</summary>
          <ul className="small">
            {a.formulazioni.map((f) => (
              <li key={f.q}>
                <b>q{f.q}</b> {f.testo}
              </li>
            ))}
          </ul>
        </details>
      )}
      {(a.fonte !== 'sì' || !a.contenuto) && a.nota && <p className="small verdict warn">{a.nota}</p>}
      {!a.contenuto ? (
        <div className="card">
          <p>
            <b>In preparazione.</b> Il contenuto di questo argomento (lezione, dimostrazioni, scheda) è in lavorazione.
          </p>
          {a.prerequisiti.length > 0 && (
            <p className="small">
              Prerequisiti:{' '}
              {a.prerequisiti.map((p, i) => (
                <span key={p}>
                  {i ? ', ' : ''}
                  <a href={`#/argomento/${p}`}>{argomento(p)?.titolo ?? p}</a>
                </span>
              ))}
            </p>
          )}
        </div>
      ) : (
        <>
          <nav className="tabs" aria-label="schede dell'argomento">
            {TABS.map((t) => (
              <a key={t.k} href={`#/argomento/${a.id}/${t.k}`} className={cur === t.k ? 'on' : ''} aria-current={cur === t.k ? 'page' : undefined}>
                {t.t}
              </a>
            ))}
          </nav>
          {cur === 'lezione' && <LessonView key={a.id} a={a} />}
          {cur === 'scheda' && <Scheda a={a} />}
          {cur === 'allena' && <Trainer key={a.id} a={a} />}
          {cur === 'orale' && <OralSim key={a.id} argId={a.id} />}
        </>
      )}
    </div>
  );
}
