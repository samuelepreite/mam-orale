/** «Argomenti»: per capitolo (pagine PDF, padronanza), ogni argomento con il suo stato, le formulazioni d'orale e i badge. */
import { useMemo } from 'react';
import { CAPITOLI } from '../../content';
import type { Argomento } from '../../content/types';
import { CATALOGO } from '../../learning/catalogo';
import { padronanzaCapitoli, padronanze, ripassiRiusciti, statoArgomento, STATO_TESTO } from '../../learning/mastery';
import { useApp, useNow } from '../state';
import { Bar, CapChip, pct } from '../components/bits';

export function FonteBadge({ a }: { a: Argomento }) {
  if (a.fonte === 'no') return <span className="badge" title={a.nota}>integrato oltre la dispensa</span>;
  if (a.fonte === 'parziale') return <span className="badge" title={a.nota}>in parte integrato</span>;
  return null;
}

export function Argomenti() {
  const { state } = useApp();
  const now = useNow();
  const pad = useMemo(() => padronanze(state, now), [state, now]);
  const rip = useMemo(() => ripassiRiusciti(state), [state]);
  const caps = useMemo(() => padronanzaCapitoli(state, now, CATALOGO, pad), [state, now, pad]);
  return (
    <div className="page">
      <h1>Argomenti</h1>
      <p className="muted">
        {CATALOGO.argomenti.filter((a) => a.contenuto).length} argomenti pronti su {CATALOGO.argomenti.length}. Le pagine sono quelle del PDF della dispensa.
      </p>
      {CAPITOLI.map((cap) => {
        const cp = caps.find((x) => x.cap === cap.id)!;
        const as = CATALOGO.argomenti.filter((a) => a.cap === cap.id);
        return (
          <section key={cap.id} className={`card cap-${cap.id}`} id={`cap-${cap.id}`}>
            <div className="cap-head">
              <CapChip cap={cap.id} />
              <h2>{cap.titolo}</h2>
              <span className="small muted">
                pp. {cap.pagine} · {cp.pronti}/{cp.totale} pronti · padronanza {pct(cp.padronanza)}
              </span>
            </div>
            <Bar v={cp.padronanza} label={`padronanza del capitolo ${cap.id}`} />
            <div style={{ marginTop: 8 }}>
              {as.map((a) => {
                const st = statoArgomento(state, a, pad[a.id] ?? 0, rip[a.id] ?? 0);
                return (
                  <a key={a.id} className="arg-row" href={`#/argomento/${a.id}`}>
                    <span className="t">{a.titolo}</span>
                    <span className="r">
                      <FonteBadge a={a} />
                      {a.complemento && <span className="badge">complemento</span>}
                      <span className={`badge st-${st}`}>{STATO_TESTO[st]}</span>
                      {a.contenuto && <span className="small num muted">{pct(pad[a.id] ?? 0)}</span>}
                    </span>
                    <span className="q">
                      pp. {a.pagine}
                      {a.formulazioni.length > 0 && <> · {a.formulazioni.map((f) => `q${f.q}`).join(', ')}: {a.formulazioni[0].testo}{a.formulazioni.length > 1 ? ' …' : ''}</>}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
