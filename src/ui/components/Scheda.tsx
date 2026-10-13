/** Scheda di ripasso: tutto il contenuto dell'argomento in una pagina (simboli, fonti cliccabili, correzioni NF). */
import type { Argomento } from '../../content/types';
import { ARGOMENTI } from '../../content';
import { CATALOGO, dimsDi } from '../../learning/catalogo';
import { FonteTag, Svg } from './bits';
import { Correzione } from './Passo';
import { Inline, RichText, Tex } from './Tex';

export function Scheda({ a }: { a: Argomento }) {
  const c = a.contenuto;
  if (!c) return null;
  const dims = dimsDi(CATALOGO, a);
  const titolo = (id: string) => ARGOMENTI.find((x) => x.id === id)?.titolo ?? id;
  return (
    <div className="scheda">
      <section className="card">
        <p className="kicker">Cosa dire subito</p>
        <RichText text={c.cosaDireSubito} className="prof" />
        <h3>Sistema e ipotesi</h3>
        <ul>
          {c.sistemaIpotesi.map((h, i) => (
            <li key={i}>
              <Inline text={h} />
            </li>
          ))}
        </ul>
      </section>
      <div className="grid2">
        <figure className="figura" style={{ margin: 0 }}>
          <Svg svg={c.disegno.svg} />
          <figcaption>
            <Inline text={c.disegno.didascalia} /> <FonteTag f={c.disegno.fonte} />
          </figcaption>
        </figure>
        <section className="card" style={{ margin: 0 }}>
          <p className="kicker">Alla lavagna</p>
          <ul className="checklist">
            {c.disegno.elementi.map((e) => (
              <li key={e.id}>
                {e.obbligatorio ? '■' : '□'} <Inline text={e.testo} /> {!e.obbligatorio && <span className="opt">(facoltativo)</span>}
              </li>
            ))}
          </ul>
          <p className="kicker">Equazione di partenza</p>
          <Tex tex={c.equazioneDiPartenza.latex} display />
          <p className="small">
            <Inline text={c.equazioneDiPartenza.spiegazione} /> <FonteTag f={c.equazioneDiPartenza.fonte} />
          </p>
          {c.equazioneDiPartenza.correzione && <Correzione p={{ ...c.equazioneDiPartenza, id: 'eq', perche: '', distrattori: [] }} />}
        </section>
      </div>
      {c.simboli.length > 0 && (
        <section className="card">
          <p className="kicker">Simboli</p>
          <div className="tbl-wrap">
            <table className="tbl simboli">
              <thead>
                <tr>
                  <th>simbolo</th>
                  <th>significato</th>
                  <th>altrove</th>
                </tr>
              </thead>
              <tbody>
                {c.simboli.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <Tex tex={s.simbolo} />
                    </td>
                    <td>
                      <Inline text={s.significato} />
                    </td>
                    <td className="small muted">{s.altrove ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {dims.map((d) => (
        <section key={d.id} className="card">
          <p className="kicker">Dimostrazione {d.id}</p>
          <h3 style={{ marginTop: 0 }}>{d.titolo}</h3>
          <p>
            <Inline text={d.enunciato} />
          </p>
          {d.ipotesi.length > 0 && (
            <p className="small">
              <b>Ipotesi:</b>{' '}
              {d.ipotesi.map((h, i) => (
                <span key={i}>
                  {i ? '; ' : ''}
                  <Inline text={h} />
                </span>
              ))}
            </p>
          )}
          <ol className="passi-scheda">
            {d.passi.map((p) => (
              <li key={p.id} className={p.chiave ? 'key' : ''}>
                <Tex tex={p.latex} display />
                <div className="row small">
                  <FonteTag f={p.fonte} />
                  {p.chiave && <span className="keybadge">chiave</span>}
                  {p.aggiunto && <span className="added">aggiunto</span>}
                </div>
                <div className="small">
                  <Inline text={p.perche} />
                </div>
                <Correzione p={p} />
              </li>
            ))}
          </ol>
          <div className="verdict info">
            <p>
              <b>Risultato</b> <FonteTag f={d.risultato.fonte} />
            </p>
            <Tex tex={d.risultato.latex} display />
            <p className="small">
              <Inline text={d.gancio} />
            </p>
          </div>
        </section>
      ))}
      <section className="card">
        <p className="kicker">Significato</p>
        <RichText text={c.significato} />
        <p className="frase">
          <Inline text={c.fraseDaRicordare} />
        </p>
        <h3>Da non dire</h3>
        <ul className="nondire">
          {c.daNonDire.map((d, i) => (
            <li key={i}>
              <span className="frase-no">
                <Inline text={d.frase} />
              </span>{' '}
              — <Inline text={d.perche} /> {d.fonte && <FonteTag f={d.fonte} />}
            </li>
          ))}
        </ul>
        <h3>Domande a catena</h3>
        <ol>
          {c.approfondimenti.map((x, i) => (
            <li key={i}>
              <b>
                <Inline text={x.domanda} />
              </b>
              {x.argomento && (
                <>
                  {' '}
                  <a className="small" href={`#/argomento/${x.argomento}`}>
                    → {titolo(x.argomento)}
                  </a>
                </>
              )}
              <br />
              <span className="small">
                <Inline text={x.attesa} /> <FonteTag f={x.fonte} />
              </span>
            </li>
          ))}
        </ol>
        {(a.collegamenti.length > 0 || a.prerequisiti.length > 0) && (
          <p className="small">
            {a.prerequisiti.length > 0 && (
              <>
                <b>Prerequisiti:</b>{' '}
                {a.prerequisiti.map((p, i) => (
                  <span key={p}>
                    {i ? ', ' : ''}
                    <a href={`#/argomento/${p}`}>{titolo(p)}</a>
                  </span>
                ))}
                .{' '}
              </>
            )}
            {a.collegamenti.length > 0 && (
              <>
                <b>Collegamenti:</b>{' '}
                {a.collegamenti.map((p, i) => (
                  <span key={p}>
                    {i ? ', ' : ''}
                    <a href={`#/argomento/${p}`}>{titolo(p)}</a>
                  </span>
                ))}
                .
              </>
            )}
          </p>
        )}
        {c.nf && c.nf.length > 0 && <p className="small muted">Note sulle fonti: {c.nf.join(', ')} (errori o incongruenze verificati della dispensa).</p>}
      </section>
    </div>
  );
}
