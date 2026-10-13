/** «Oggi»: la sessione di learning/session.ts (recupero attivo → nuovo → ripasso → simulazione), con avanzamento. */
import { useEffect, useMemo, useState } from 'react';
import { CATALOGO, argDi } from '../../learning/catalogo';
import { avanzamento, pianoOggi } from '../../learning/session';
import { pianoStudio } from '../../learning/plan';
import { padronanze } from '../../learning/mastery';
import { useApp, useNow } from '../state';
import { Bar, CapChip, fmtData } from '../components/bits';
import { RecuperoPasso, Trainer } from '../components/Trainer';

function loadSkip(giorno: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(`mam:salta:${giorno}`) ?? '[]');
  } catch {
    return [];
  }
}
function saveSkip(giorno: string, v: string[]) {
  try {
    localStorage.setItem(`mam:salta:${giorno}`, JSON.stringify(v));
  } catch {
    /* solo comodità */
  }
}

export function Oggi() {
  const { state } = useApp();
  const now = useNow();
  const piano = useMemo(() => pianoOggi(state, now), [state, now]);
  const av = useMemo(() => avanzamento(state, piano, now), [state, piano, now]);
  const studio = useMemo(() => pianoStudio(state, now, CATALOGO, padronanze(state, now)), [state, now]);
  const [salta, setSalta] = useState<string[]>(() => loadSkip(piano.giorno));
  const [aperto, setAperto] = useState(false);
  const [rivedi, setRivedi] = useState(false);
  const [fineRip, setFineRip] = useState(false);
  const skip = (k: string) => {
    const v = [...salta, k];
    setSalta(v);
    saveSkip(piano.giorno, v);
  };
  const recIdx = av.recupero.findIndex((x) => !x);
  const recFatto = recIdx < 0 || salta.includes('recupero');
  const ripFatto = !piano.ripasso || av.ripasso || salta.includes('ripasso');
  const nuovoFatto = !piano.nuovo || av.nuovo || salta.includes('nuovo');
  const simFatta = !piano.simulazione || av.simulazione || salta.includes('simulazione');
  const base = !recFatto && piano.recupero.length ? 'recupero' : !ripFatto ? 'ripasso' : !nuovoFatto ? 'nuovo' : !simFatta ? 'simulazione' : 'fine';
  // il ripasso resta aperto finché lo studente non sceglie di continuare (anche dopo l'ultimo passo registrato)
  useEffect(() => {
    if (base === 'ripasso') setRivedi(true);
  }, [base]);
  const tappa = rivedi && piano.ripasso && !salta.includes('ripasso') ? 'ripasso' : base;
  const nuovo = piano.nuovo ? argDi(CATALOGO, piano.nuovo.argId) : undefined;
  const rip = piano.ripasso ? argDi(CATALOGO, piano.ripasso.argId) : undefined;
  const ripDim = piano.ripasso ? CATALOGO.dimostrazioni[piano.ripasso.dimId] : undefined;
  const pronti = CATALOGO.argomenti.filter((a) => a.contenuto).length;
  const voci: { k: string; titolo: string; sotto: string; fatto: boolean }[] = [
    ...(piano.recupero.length ? [{ k: 'recupero', titolo: 'Recupero attivo', sotto: `${piano.recupero.length} passi da ricordare a memoria, da capitoli diversi · ${av.recupero.filter(Boolean).length} fatti`, fatto: recFatto }] : []),
    ...(piano.ripasso && rip && ripDim ? [{ k: 'ripasso', titolo: 'Ripasso di una dimostrazione', sotto: `${ripDim.titolo} (${rip.cap}) dal passo ${piano.ripasso.da + 1}`, fatto: ripFatto }] : []),
    ...(nuovo ? [{ k: 'nuovo', titolo: 'Argomento nuovo', sotto: `${nuovo.titolo} (${nuovo.cap}) · lezione guidata`, fatto: nuovoFatto }] : []),
    ...(piano.simulazione ? [{ k: 'simulazione', titolo: 'Simulazione d\'orale', sotto: piano.simulazione.ultimaSettimana ? 'ultima settimana prima dell\'orale: una al giorno' : 'una domanda estratta, risposta a voce, correzione', fatto: simFatta }] : []),
  ];
  return (
    <div className="page">
      <h1>Oggi</h1>
      <p className="muted">
        {now.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })} · circa {Math.round(piano.minuti.totale)} minuti su {piano.minuti.disponibili} disponibili
      </p>
      {pronti === 0 ? (
        <div className="card">Nessun argomento ha ancora il suo contenuto: i capitoli sono in preparazione.</div>
      ) : (
        <>
          <div className="card">
            <div className="row">
              <b>
                Sessione: {av.fatti} di {av.totale} attività
              </b>
            </div>
            <Bar v={av.totale ? av.fatti / av.totale : 1} label="avanzamento della sessione" />
            <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10, marginTop: 14 }}>
              {voci.map((v, i) => (
                <li key={v.k} className={`today-step ${v.fatto ? 'done' : tappa === v.k ? 'now' : ''}`}>
                  <span className="n">{v.fatto ? '✓' : i + 1}</span>
                  <div>
                    <b>{v.titolo}</b>
                    <div className="small muted">{v.sotto}</div>
                  </div>
                </li>
              ))}
              {!voci.length && <li className="muted">Niente in programma oggi: puoi allenarti liberamente dagli argomenti.</li>}
            </ol>
          </div>

          {tappa === 'recupero' && recIdx >= 0 && (() => {
            const r = piano.recupero[recIdx];
            const a = argDi(CATALOGO, r.argId);
            const d = CATALOGO.dimostrazioni[r.dimId];
            if (!a || !d) return null;
            return (
              <section aria-label="recupero attivo">
                <h2>
                  Recupero attivo · {recIdx + 1} di {piano.recupero.length}
                </h2>
                <RecuperoPasso key={r.passoId} a={a} dim={d} i={r.i} onDone={() => undefined} />
                <button type="button" className="link" onClick={() => skip('recupero')}>
                  Salta il recupero di oggi
                </button>
              </section>
            );
          })()}

          {tappa === 'ripasso' && rip && ripDim && piano.ripasso && (
            <section aria-label="ripasso">
              <h2>Ripasso: {ripDim.titolo}</h2>
              <p className="small muted">
                <CapChip cap={rip.cap} /> {rip.titolo}
              </p>
              <Trainer a={rip} dimId={ripDim.id} livello={2} da={piano.ripasso.da} dove="ripasso" onDone={() => setFineRip(true)} />
              {fineRip ? (
                <button type="button" className="primary" onClick={() => { setRivedi(false); setFineRip(false); }}>
                  Continua con la sessione
                </button>
              ) : (
                <button type="button" className="link" onClick={() => { skip('ripasso'); setRivedi(false); }}>
                  Salta il ripasso di oggi
                </button>
              )}
            </section>
          )}

          {tappa === 'nuovo' && nuovo && (
            <section className={`card cap-border cap-${nuovo.cap}`} aria-label="argomento nuovo">
              <p className="kicker">Argomento nuovo · {nuovo.cap}</p>
              <h2>{nuovo.titolo}</h2>
              <p className="small muted">
                Dispensa pp. {nuovo.pagine} · circa {Math.round(piano.minuti.nuovo)} minuti
                {nuovo.formulazioni.length ? ` · chiesto in ${nuovo.formulazioni.length} domande d'orale` : ''}
              </p>
              <div className="row">
                <a className="button primary" href={`#/argomento/${nuovo.id}/lezione`}>
                  Inizia la lezione
                </a>
                <button type="button" className="link" onClick={() => skip('nuovo')}>
                  Un altro giorno
                </button>
              </div>
            </section>
          )}

          {tappa === 'simulazione' && (
            <section className="card" aria-label="simulazione">
              <p className="kicker">Simulazione d&apos;orale</p>
              <h2>Il professore ti fa una domanda</h2>
              <p className="small muted">Domanda estratta tra gli argomenti che hai studiato, pesata su quanto li ricordi. Rispondi a voce, poi correggi con Claude o con la rubrica.</p>
              <div className="row">
                <a className="button primary" href="#/orale">
                  Vai alla simulazione
                </a>
                <button type="button" className="link" onClick={() => skip('simulazione')}>
                  Non oggi
                </button>
              </div>
            </section>
          )}

          {tappa === 'fine' && (
            <div className="verdict ok">
              <p>
                <b>Sessione di oggi completata.</b> Se hai ancora tempo, allenati su un argomento o fai una simulazione in più.
              </p>
            </div>
          )}

          <section className="card">
            <h3 style={{ marginTop: 0 }}>Il piano</h3>
            <p>
              Obiettivo: ogni argomento ripassato con successo almeno <b>{studio.obiettivo}</b> volte. Completati <b className="num">{studio.completati}</b> su <b className="num">{studio.argomenti}</b>; mancano <b className="num">{studio.ripassiMancanti}</b> ripassi.
            </p>
            <p className="small">
              {studio.giorniStimati === null ? 'Il ritmo si stima dopo qualche ripasso riuscito.' : `Al ritmo attuale (${studio.ritmo.toLocaleString('it-IT', { maximumFractionDigits: 1 })} ripassi al giorno negli ultimi 14 giorni) servono circa ${studio.giorniStimati} giorni.`}
              {studio.dataOrale && studio.giorniAllOrale !== undefined && (
                <>
                  {' '}
                  Orale il {fmtData(studio.dataOrale + 'T12:00:00')} (tra {studio.giorniAllOrale} giorni, {studio.giorniDisponibili} per lo studio):{' '}
                  <b className={studio.inTempo ? 'st-padroneggiato' : 'st-da-fare'}>{studio.inTempo ? 'sei in tempo' : 'non sei in tempo a questo ritmo'}</b>
                  {studio.aRischio.length > 0 && ` · ${studio.aRischio.length} argomenti a rischio`}.
                </>
              )}
            </p>
            <button type="button" className="link" aria-expanded={aperto} onClick={() => setAperto((x) => !x)}>
              {aperto ? 'Nascondi l\'ordine' : 'Ordine consigliato degli argomenti'}
            </button>
            {aperto && (
              <ol className="small">
                {studio.ordine.slice(0, 12).map((v) => {
                  const a = argDi(CATALOGO, v.argId)!;
                  return (
                    <li key={v.argId}>
                      <a href={`#/argomento/${v.argId}`}>{a.titolo}</a> <span className="muted">({a.cap}{v.pronto ? `, ripassi ${v.ripassi}/${studio.obiettivo}` : ', in preparazione'})</span>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        </>
      )}
    </div>
  );
}
