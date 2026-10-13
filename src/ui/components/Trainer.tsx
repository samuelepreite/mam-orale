/**
 * Allenatore di dimostrazioni a tre livelli (ARCHITETTURA §3).
 *  - Livello 2 «prossimo passaggio»: si nascondono prima i passi non chiave, poi tutti; per ogni passo nascosto si
 *    sceglie tra il passo giusto e i distrattori, oppure «lo scrivo io» con autocontrollo; sicurezza 1–5 facoltativa
 *    prima della soluzione.
 *  - Livello 3 «foglio bianco»: lavagna vuota, sicurezza 1–5 obbligatoria, poi confronto passo per passo: si tocca il
 *    passo dove ci si è fermati e quelli sbagliati; checklist del disegno.
 * Ogni passo va in FSRS (learning/actions.ts). Il ripasso della sessione parte dal primo passo scaduto (`da`) e mostra
 * i precedenti come già fatti.
 */
import { useCallback, useMemo, useState } from 'react';
import type { Argomento, Dimostrazione, Errore, Passo } from '../../content/types';
import { addPasso, addPassi, addRichiamo } from '../../learning/actions';
import { CATALOGO, dimsDi } from '../../learning/catalogo';
import { faseLivello2, livelloDim, passiNascosti, ultimiEsiti } from '../../learning/mastery';
import { newId, type Esito } from '../../storage/store';
import { useApp, useNow } from '../state';
import { Checklist, FonteTag, Sicurezza, Svg } from './bits';
import { Lavagna } from './Lavagna';
import { PassoLine, ProssimoPassaggio } from './Passo';
import { Inline, Tex } from './Tex';

const ESITO_TESTO: Record<Esito, string> = { giusto: 'giusto', esitante: 'esitante', sbagliato: 'sbagliato', fermato: 'non lo sapevo' };

/** Un passo nascosto: scelta tra passo giusto e distrattori, oppure scrittura libera con autocontrollo. */
export function PassoNascosto({ p, onEsito, domanda }: { p: Passo; onEsito: (e: Esito, errore?: Errore, sicurezza?: number) => void; domanda?: string }) {
  const [sic, setSic] = useState<number | undefined>();
  const [modo, setModo] = useState<'scelta' | 'scrivo'>(p.distrattori.length ? 'scelta' : 'scrivo');
  const [scelto, setScelto] = useState(false);
  const [testo, setTesto] = useState('');
  const [mostra, setMostra] = useState(false);
  const [fatto, setFatto] = useState<Esito | null>(null);
  const chiudi = (e: Esito, err?: Errore) => {
    setFatto(e);
    onEsito(e, err, sic);
  };
  return (
    <div className="deriv-next">
      {!scelto && !mostra && <Sicurezza value={sic} onChange={setSic} label="Sicurezza (facoltativa)" />}
      {modo === 'scelta' ? (
        <>
          {!mostra && (
            <ProssimoPassaggio
              p={p}
              domanda={domanda}
              onPick={(s) => {
                setScelto(true);
                chiudi(s.giusto ? 'giusto' : 'sbagliato', s.giusto ? undefined : s.d.errore);
              }}
            />
          )}
          {!scelto && (
            <div className="row">
              <button type="button" className="link" onClick={() => setModo('scrivo')}>
                Lo scrivo io
              </button>
              <button type="button" className="link" onClick={() => { setScelto(true); setMostra(true); chiudi('fermato'); }}>
                Non lo so
              </button>
            </div>
          )}
          {mostra && (
            <>
              <p className="small muted">Ecco il passo: torna nel recupero attivo già da domani.</p>
              <PassoLine p={p} />
            </>
          )}
        </>
      ) : (
        <>
          <p className="kicker">Prova tu</p>
          <p>
            <b>{domanda ?? 'Scrivi il prossimo passaggio'}</b> (qui, alla lavagna o su un foglio), poi confrontalo.
          </p>
          {!mostra && (
            <>
              <textarea aria-label="il tuo passaggio" value={testo} onChange={(e) => setTesto(e.target.value)} placeholder="Facoltativo: scrivi la riga come la scriveresti alla lavagna" style={{ minHeight: 70 }} />
              <div className="row">
                <button type="button" className="primary" onClick={() => setMostra(true)}>
                  Mostra il passo
                </button>
                {p.distrattori.length > 0 && (
                  <button type="button" className="link" onClick={() => setModo('scelta')}>
                    Scegli tra le opzioni
                  </button>
                )}
              </div>
            </>
          )}
          {mostra && (
            <>
              <PassoLine p={p} />
              {!fatto ? (
                <div className="row" role="group" aria-label="autocontrollo">
                  <span className="small muted">Com&apos;è andata?</span>
                  <button type="button" onClick={() => chiudi('giusto')}>
                    giusto
                  </button>
                  <button type="button" onClick={() => chiudi('esitante')}>
                    esitante
                  </button>
                  <button type="button" onClick={() => chiudi('sbagliato')}>
                    sbagliato
                  </button>
                  <button type="button" onClick={() => chiudi('fermato')}>
                    non lo sapevo
                  </button>
                </div>
              ) : (
                <p className="small muted">Registrato: {ESITO_TESTO[fatto]}.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

/** Livello 2: catena con passi nascosti, uno alla volta. */
function Livello2({ a, dim, nascosti, da = 0, dove, onFine }: { a: Argomento; dim: Dimostrazione; nascosti: Set<string>; da?: number; dove: 'allena' | 'ripasso'; onFine: (esiti: Record<string, Esito>) => void }) {
  const { update } = useApp();
  const giro = useMemo(() => newId(), []);
  const firstHidden = (from: number) => {
    let i = from;
    while (i < dim.passi.length && !nascosti.has(dim.passi[i].id)) i++;
    return i;
  };
  const [k, setK] = useState(() => firstHidden(da));
  const [esiti, setEsiti] = useState<Record<string, Esito>>({});
  const [attesa, setAttesa] = useState(false);
  const finito = k >= dim.passi.length;
  const avanti = () => {
    setAttesa(false);
    const nk = firstHidden(k + 1);
    setK(nk);
    if (nk >= dim.passi.length) onFine(esiti);
  };
  return (
    <div>
      {dim.passi.slice(0, Math.min(k, dim.passi.length)).map((p, i) => {
        const e = esiti[p.id];
        return <PassoLine key={p.id} p={p} perche={!e || e !== 'giusto'} cls={`trainer-line ${i < da ? 'given' : ''} ${e === 'giusto' ? 'ok' : e === 'esitante' ? 'mid' : e ? 'ko' : 'given'}`} />;
      })}
      {!finito && (
        <>
          <PassoNascosto
            key={dim.passi[k].id}
            p={dim.passi[k]}
            domanda={k === 0 ? 'Da dove parti? Qual è la prima riga?' : undefined}
            onEsito={(e, errore, sicurezza) => {
              const p = dim.passi[k];
              setEsiti((x) => ({ ...x, [p.id]: e }));
              update((s) => addPasso(s, { passoId: p.id, dimId: dim.id, argId: a.id, livello: 2, esito: e, errore, sicurezza, giro, dove }));
              setAttesa(true);
            }}
          />
          {attesa && (
            <button type="button" className="primary" onClick={avanti}>
              {firstHidden(k + 1) >= dim.passi.length ? 'Fine della catena' : 'Prossimo passo'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

/** Livello 3: foglio bianco, sicurezza, confronto passo per passo. */
function Livello3({ a, dim, onFine }: { a: Argomento; dim: Dimostrazione; onFine: (esiti: Record<string, Esito>) => void }) {
  const { update } = useApp();
  const c = a.contenuto!;
  const [sic, setSic] = useState<number | undefined>();
  const [fase, setFase] = useState<'scrivi' | 'confronto' | 'fatto'>('scrivi');
  const [segni, setSegni] = useState<Record<string, Esito>>({});
  const [stop, setStop] = useState<number | null>(null);
  const [check, setCheck] = useState<Record<string, boolean>>({});
  const esitoDi = (i: number): Esito => (stop !== null && i >= stop ? 'fermato' : segni[dim.passi[i].id] ?? 'giusto');
  const registra = () => {
    const giro = newId();
    const esiti = Object.fromEntries(dim.passi.map((p, i) => [p.id, esitoDi(i)]));
    update((s) => {
      let n = addPassi(s, dim.passi.map((p, i) => ({ passoId: p.id, dimId: dim.id, argId: a.id, livello: 3 as const, esito: esitoDi(i), sicurezza: sic, giro, dove: 'allena' as const })));
      if (Object.keys(check).length) n = addRichiamo(n, { qid: `disegno:${a.id}`, argId: a.id, corretto: c.disegno.elementi.filter((e) => e.obbligatorio).every((e) => check[e.id]) });
      return n;
    });
    setFase('fatto');
    onFine(esiti);
  };
  return (
    <div>
      <p>
        <b>Foglio bianco.</b> Scrivi tutta la dimostrazione alla lavagna, come all&apos;orale: partenza, disegno, equazione, passaggi, risultato.
      </p>
      <p className="small">
        <b>Enunciato.</b> <Inline text={dim.enunciato} />
      </p>
      <Lavagna titolo="Lavagna del foglio bianco" riferimento={fase !== 'scrivi' ? { svg: c.disegno.svg, didascalia: c.disegno.didascalia } : undefined} />
      {fase === 'scrivi' && (
        <div className="card tight">
          <Sicurezza value={sic} onChange={setSic} label="Prima di vedere la soluzione: quanto sei sicuro?" />
          <button type="button" className="primary" disabled={!sic} onClick={() => setFase('confronto')}>
            Confronta con la soluzione
          </button>
        </div>
      )}
      {fase !== 'scrivi' && (
        <div className="card">
          <h3>Confronto passo per passo</h3>
          <p className="small muted">Tocca il passo dove ti sei fermato e segna quelli sbagliati o incerti. Gli altri contano come giusti.</p>
          {dim.passi.map((p, i) => {
            const e = esitoDi(i);
            return (
              <div key={p.id} className={`cmp-row ${e === 'fermato' ? 'stop' : e === 'sbagliato' ? 'wrong' : ''}`}>
                <PassoLine p={p} perche={false} />
                {fase === 'confronto' && (
                  <div className="row" role="group" aria-label={`esito del passo ${i + 1}`}>
                    {(['giusto', 'esitante', 'sbagliato'] as Esito[]).map((x) => (
                      <button key={x} type="button" className={`chip ${e === x ? 'on' : ''}`} aria-pressed={e === x} disabled={stop !== null && i >= stop} onClick={() => setSegni((s) => ({ ...s, [p.id]: x }))}>
                        {x}
                      </button>
                    ))}
                    <button type="button" className={`chip ${stop === i ? 'on' : ''}`} aria-pressed={stop === i} onClick={() => setStop((s) => (s === i ? null : i))}>
                      mi sono fermato qui
                    </button>
                  </div>
                )}
                {fase === 'fatto' && <span className="small muted">{ESITO_TESTO[e]}</span>}
              </div>
            );
          })}
          <h4>Il disegno</h4>
          <Checklist elementi={c.disegno.elementi} value={check} onChange={setCheck} />
          {fase === 'confronto' && (
            <button type="button" className="primary" onClick={registra}>
              Registra il confronto
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Riepilogo({ dim, esiti, onAncora, onLivello3 }: { dim: Dimostrazione; esiti: Record<string, Esito>; onAncora: () => void; onLivello3?: () => void }) {
  const n = Object.values(esiti);
  const ok = n.filter((e) => e === 'giusto').length;
  const sbagliati = dim.passi.filter((p) => esiti[p.id] && esiti[p.id] !== 'giusto');
  return (
    <div className={sbagliati.length ? 'verdict warn' : 'verdict ok'}>
      <p>
        <b>
          {ok === 1 ? '1 passo giusto' : `${ok} passi giusti`} su {n.length}.
        </b>{' '}
        {sbagliati.length ? 'I passi da rivedere tornano nel recupero attivo già da domani.' : 'Catena ricostruita: i passi tornano più avanti nel tempo.'}
      </p>
      {sbagliati.length > 0 && (
        <ul className="small">
          {sbagliati.map((p) => (
            <li key={p.id}>
              <Tex tex={p.latex} /> — {ESITO_TESTO[esiti[p.id]]}
            </li>
          ))}
        </ul>
      )}
      <div className="row">
        <button type="button" onClick={onAncora}>
          Ancora una volta
        </button>
        {onLivello3 && (
          <button type="button" onClick={onLivello3}>
            Prova il foglio bianco
          </button>
        )}
      </div>
    </div>
  );
}

export function Trainer({ a, dimId, livello: forzato, da, dove = 'allena', onDone }: { a: Argomento; dimId?: string; livello?: 2 | 3; da?: number; dove?: 'allena' | 'ripasso'; onDone?: () => void }) {
  const { state } = useApp();
  const now = useNow();
  const dims = dimsDi(CATALOGO, a);
  const [sel, setSel] = useState(dimId ?? dims[0]?.id);
  const dim = dims.find((d) => d.id === sel) ?? dims[0];
  const ultimi = useMemo(() => ultimiEsiti(state), [state]);
  const suggerito = dim ? livelloDim(state, a.id, dim, now, ultimi) : 1;
  const [liv, setLiv] = useState<2 | 3>(forzato ?? (suggerito === 3 ? 3 : 2));
  const [run, setRun] = useState(0);
  const [fine, setFine] = useState<Record<string, Esito> | null>(null);
  // la fase del livello 2 si fissa all'inizio del giro
  const fase = useMemo(() => (dim ? (dove === 'ripasso' ? 'tutti' : faseLivello2(state, dim, ultimi)) : 'tutti'), [dim, run, dove]); // eslint-disable-line react-hooks/exhaustive-deps
  const nascosti = useMemo(() => (dim ? passiNascosti(dim, fase) : new Set<string>()), [dim, fase]);
  const finito = useCallback(
    (e: Record<string, Esito>) => {
      setFine(e);
      onDone?.();
    },
    [onDone],
  );
  if (!dim) return <p className="muted">Nessuna dimostrazione per questo argomento.</p>;
  const ricomincia = (l?: 2 | 3) => {
    if (l) setLiv(l);
    setFine(null);
    setRun((r) => r + 1);
  };
  return (
    <div className="trainer">
      {!forzato && (
        <div className="card tight">
          {dims.length > 1 && (
            <label className="field">
              Dimostrazione
              <select value={dim.id} onChange={(e) => { setSel(e.target.value); ricomincia(); }}>
                {dims.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.id} · {d.titolo}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="row">
            <div className="seg" role="group" aria-label="livello">
              <button type="button" className={liv === 2 ? 'on' : ''} aria-pressed={liv === 2} onClick={() => ricomincia(2)}>
                Livello 2 · prossimo passaggio
              </button>
              <button type="button" className={liv === 3 ? 'on' : ''} aria-pressed={liv === 3} onClick={() => ricomincia(3)}>
                Livello 3 · foglio bianco
              </button>
            </div>
            <span className="small muted">suggerito: livello {suggerito}{suggerito === 1 ? ' (fai prima la lezione)' : ''}</span>
          </div>
          {liv === 2 && <p className="small muted">{fase === 'non-chiave' ? 'Fase 1: sono nascosti i passi non chiave; i passi chiave sono scritti.' : 'Fase 2: sono nascosti tutti i passi.'}</p>}
        </div>
      )}
      <h3>
        {dim.titolo} <FonteTag f={dim.risultato.fonte} />
      </h3>
      {liv === 2 && (
        <>
          <p className="small">
            <b>Enunciato.</b> <Inline text={dim.enunciato} />
          </p>
          {da ? <p className="small muted">I primi {da} passi li hai già ricordati di recente: si riparte dal primo scaduto.</p> : null}
          <Livello2 key={`${dim.id}-${run}`} a={a} dim={dim} nascosti={nascosti} da={da} dove={dove} onFine={finito} />
        </>
      )}
      {liv === 3 && <Livello3 key={`${dim.id}-${run}`} a={a} dim={dim} onFine={finito} />}
      {fine && <Riepilogo dim={dim} esiti={fine} onAncora={() => ricomincia()} onLivello3={liv === 2 && !forzato ? () => ricomincia(3) : undefined} />}
      {fine && (
        <figure className="figura">
          <Svg svg={a.contenuto!.disegno.svg} />
          <figcaption>Risultato: <Tex tex={dim.risultato.latex} /></figcaption>
        </figure>
      )}
    </div>
  );
}

/** Recupero attivo (sessione «Oggi»): un passo isolato, dato il precedente. */
export function RecuperoPasso({ a, dim, i, onDone }: { a: Argomento; dim: Dimostrazione; i: number; onDone: () => void }) {
  const { update } = useApp();
  const p = dim.passi[i];
  const [esito, setEsito] = useState<{ e: Esito; errore?: Errore; sicurezza?: number } | null>(null);
  return (
    <div className={`card tight cap-border cap-${a.cap}`}>
      <p className="kicker">
        {a.cap} · {a.titolo}
      </p>
      <p className="small">
        <b>{dim.titolo}.</b> {i === 0 ? <>Enunciato: <Inline text={dim.enunciato} /></> : 'Il passaggio precedente è:'}
      </p>
      {i > 0 && <Tex tex={dim.passi[i - 1].latex} display />}
      <PassoNascosto
        p={p}
        domanda={i === 0 ? 'Qual è la prima riga?' : 'Qual è il prossimo passaggio?'}
        onEsito={(e, errore, sicurezza) => setEsito({ e, errore, sicurezza })}
      />
      {esito && (
        <button
          type="button"
          className="primary"
          onClick={() => {
            // si registra all'«Avanti»: così la spiegazione resta sullo schermo finché serve
            update((s) => addPasso(s, { passoId: p.id, dimId: dim.id, argId: a.id, livello: 2, esito: esito.e, errore: esito.errore, sicurezza: esito.sicurezza, dove: 'recupero' }));
            onDone();
          }}
        >
          Avanti
        </button>
      )}
    </div>
  );
}
