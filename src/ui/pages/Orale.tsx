/** «Orale»: simulazione su una domanda estratta tra tutti gli argomenti pronti, più il registro delle simulazioni. */
import { useMemo } from 'react';
import { CATALOGO, argDi } from '../../learning/catalogo';
import { riepilogoSimulazioni } from '../../learning/stats';
import { useApp } from '../state';
import { fmtDataOra, fmtDurata, pct } from '../components/bits';
import { OralSim } from '../components/OralSim';

export function Registro({ argId }: { argId?: string }) {
  const { state } = useApp();
  const r = useMemo(() => riepilogoSimulazioni(state), [state]);
  const righe = r.righe.filter((x) => !argId || x.argId === argId);
  if (!righe.length) return <p className="small muted">Nessuna simulazione registrata.</p>;
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>
            <th>quando</th>
            <th>argomento</th>
            <th>durata</th>
            <th>rubrica</th>
            <th>correzione</th>
          </tr>
        </thead>
        <tbody>
          {righe.slice(0, 30).map((x) => (
            <tr key={x.id}>
              <td className="num">{fmtDataOra(x.at)}</td>
              <td>
                <a href={`#/argomento/${x.argId}/orale`}>{argDi(CATALOGO, x.argId)?.titolo ?? x.argId}</a>
                {x.q ? <span className="small muted"> · q{x.q}</span> : null}
              </td>
              <td className="num">{fmtDurata(x.durataS)}</td>
              <td className="num">{pct(x.punteggio)}</td>
              <td>autovalutazione</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Orale() {
  const { state } = useApp();
  const r = useMemo(() => riepilogoSimulazioni(state), [state]);
  return (
    <div className="page">
      <h1>Simulazione dell&apos;orale</h1>
      <p className="muted">Il professore virtuale estrae una domanda: più spesso quelle chieste di frequente e quelle che ricordi meno, mai la stessa a breve distanza.</p>
      <OralSim />
      <section className="card">
        <h2>Registro</h2>
        <p className="small muted">
          {r.n} simulazioni{r.media !== null ? ` · media della rubrica ${pct(r.media)}` : ''}
        </p>
        <Registro />
      </section>
    </div>
  );
}
