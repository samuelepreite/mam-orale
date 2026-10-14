/** «Progressi»: la dashboard di learning/stats.ts (la UI non calcola nulla). */
import { useMemo } from 'react';
import { CAPITOLI } from '../../content';
import { CATALOGO, argDi } from '../../learning/catalogo';
import { STATO_TESTO } from '../../learning/mastery';
import { dashboard, ERRORI_TESTO, serie } from '../../learning/stats';
import { useApp, useNow } from '../state';
import { Bar, CapChip, fmtData, pct } from '../components/bits';
import { Tex } from '../components/Tex';
import { Registro } from './Orale';

export function Progressi() {
  const { state } = useApp();
  const now = useNow();
  const d = useMemo(() => dashboard(state, now), [state, now]);
  const giorni = useMemo(() => serie(state, now), [state, now]);
  const maxF = Math.max(1, ...d.previsione);
  const startDay = new Date(now);
  return (
    <div className="page">
      <h1>Progressi</h1>
      <div className="stat-grid">
        <div className="stat">
          <b>{d.piano.completati}/{d.piano.argomenti}</b>
          <span>argomenti con {d.piano.obiettivo} ripassi riusciti</span>
        </div>
        <div className="stat">
          <b>{d.passiFatti}</b>
          <span>passi allenati</span>
        </div>
        <div className="stat">
          <b>{d.simulazioni.n}</b>
          <span>simulazioni{d.simulazioni.media !== null ? ` · media ${pct(d.simulazioni.media)}` : ''}</span>
        </div>
        <div className="stat">
          <b>{d.previsione[0]}</b>
          <span>ripassi in scadenza oggi</span>
        </div>
        <div className="stat">
          <b>{giorni}</b>
          <span>giorni di fila</span>
        </div>
      </div>

      <section className="card">
        <h2>Padronanza per capitolo</h2>
        <div className="cap-bars">
          {d.capitoli.map((c) => (
            <div key={c.cap} className={`cap-bar cap-${c.cap}`}>
              <CapChip cap={c.cap} />
              <div>
                <Bar v={c.padronanza} label={`padronanza ${c.cap}`} />
                <span className="small muted">
                  {CAPITOLI.find((x) => x.id === c.cap)?.titolo} · {c.pronti}/{c.totale} pronti
                </span>
              </div>
              <span className="v">{pct(c.padronanza)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Piano</h2>
        <p>
          Mancano <b className="num">{d.piano.ripassiMancanti}</b> ripassi riusciti.{' '}
          {d.piano.giorniStimati === null ? 'Ritmo non ancora stimabile.' : `Al ritmo attuale servono circa ${d.piano.giorniStimati} giorni.`}
          {d.piano.dataOrale && d.piano.giorniDisponibili !== undefined && (
            <>
              {' '}
              Giorni disponibili prima dell&apos;ultima settimana: {d.piano.giorniDisponibili}.{' '}
              <b className={d.piano.inTempo ? 'st-padroneggiato' : 'st-da-fare'}>{d.piano.inTempo ? 'In tempo.' : 'Non in tempo a questo ritmo.'}</b>
            </>
          )}
        </p>
        {d.piano.avvisi.map((w, i) => (
          <p key={i} className="small muted">
            {w}
          </p>
        ))}
        {d.piano.aRischio.length > 0 && (
          <>
            <h3>Argomenti a rischio</h3>
            <ul className="small">
              {d.piano.aRischio.slice(0, 12).map((id) => (
                <li key={id}>
                  <a href={`#/argomento/${id}`}>{argDi(CATALOGO, id)?.titolo ?? id}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="card">
        <h2>Passi dove mi blocco</h2>
        {d.blocchi.length === 0 ? (
          <p className="small muted">Ancora nessun passo sbagliato o lasciato a metà.</p>
        ) : (
          <ol className="passi-scheda">
            {d.blocchi.map((b) => (
              <li key={b.passoId}>
                <Tex tex={b.latex} display />
                <span className="small muted">
                  {b.n} volte · ultima {fmtData(b.ultimo)} · <a href={`#/argomento/${b.argId}/allena`}>{argDi(CATALOGO, b.argId)?.titolo}</a>
                </span>
              </li>
            ))}
          </ol>
        )}
        {d.errori.length > 0 && (
          <p className="small">
            <b>Errori per tipo:</b> {d.errori.map(([e, n]) => `${ERRORI_TESTO[e] ?? e} ${n}`).join(' · ')}
          </p>
        )}
      </section>

      <section className="card">
        <h2>Ripassi dei prossimi 14 giorni</h2>
        <div className="forecast" role="img" aria-label={`ripassi in scadenza: ${d.previsione.join(', ')}`}>
          {d.previsione.map((n, i) => {
            const g = new Date(startDay);
            g.setDate(g.getDate() + i);
            return (
              <div key={i} className="col" title={`${g.toLocaleDateString('it-IT')}: ${n}`}>
                <span>{n || ''}</span>
                <i style={{ height: `${(n / maxF) * 80}%` }} />
                <span>{i === 0 ? 'oggi' : g.getDate()}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card">
        <h2>Calibrazione</h2>
        <p className="small muted">Quanto riesci quando ti dichiari sicuro (sicurezza 1–5 prima della soluzione).</p>
        <div className="cap-bars">
          {d.calibrazione.map((c) => (
            <div key={c.sicurezza} className="cap-bar">
              <b>{c.sicurezza}</b>
              <Bar v={c.riuscita ?? 0} label={`riuscita con sicurezza ${c.sicurezza}`} />
              <span className="v small">{c.riuscita === null ? '—' : `${pct(c.riuscita)} (${c.n})`}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Argomenti</h2>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>argomento</th>
                <th>stato</th>
                <th>padronanza</th>
                <th>ripassi</th>
              </tr>
            </thead>
            <tbody>
              {d.argomenti
                .filter((r) => r.stato !== 'in-preparazione')
                .map((r) => (
                  <tr key={r.id}>
                    <td>
                      <CapChip cap={r.cap} /> <a href={`#/argomento/${r.id}`}>{r.titolo}</a>
                    </td>
                    <td className={`st-${r.stato}`}>{STATO_TESTO[r.stato]}</td>
                    <td className="num">{pct(r.padronanza)}</td>
                    <td className="num">
                      {r.ripassi}/{d.piano.obiettivo}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {d.argomenti.some((r) => r.stato === 'in-preparazione') && <p className="small muted">{d.argomenti.filter((r) => r.stato === 'in-preparazione').length} argomenti ancora in preparazione.</p>}
        {d.riscontriConfusi > 0 && <p className="small">Hai segnato «non ho capito» su {d.riscontriConfusi} passi delle lezioni: li trovi con le tue note nel ripasso, e puoi esportarli da «Altro».</p>}
      </section>

      <section className="card">
        <h2>Simulazioni</h2>
        <Registro />
      </section>
    </div>
  );
}
