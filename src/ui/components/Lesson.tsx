/**
 * Lezione guidata (formato SEIMAFI approvato), generata dal contenuto dell'argomento, un passo per volta:
 * cosa dire subito → sistema e ipotesi → disegno (SVG + checklist) → equazione di partenza → dimostrazioni riga per riga
 * (sui passi chiave prima «qual è il prossimo passaggio?») → prova sul modello («prevedi, poi verifica») → significato e
 * frase da ricordare → da non dire → riassunto con le domande a catena. Voce italiana e riscontro per passo.
 * Computer: lezione a sinistra, disegno fisso a destra; telefono: tutto in colonna.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Argomento, Dimostrazione, Previsione, Visual } from '../../content/types';
import { addPasso, addRichiamo, lessonFeedback, lessonStep } from '../../learning/actions';
import { dimsDi, CATALOGO } from '../../learning/catalogo';
import type { Riscontro } from '../../storage/store';
import { VisualHost } from '../../diagrams/registry';
import { useApp } from '../state';
import { Checklist, FonteTag, SpeakButton, Svg } from './bits';
import { PassoLine, ProssimoPassaggio } from './Passo';
import { Inline, RichText, Tex } from './Tex';

export type LessonStepDef =
  | { id: string; kind: 'subito' | 'ipotesi' | 'disegno' | 'equazione' | 'prova' | 'significato' | 'nondire' | 'riassunto'; title: string }
  | { id: string; kind: 'dim'; title: string; dim: Dimostrazione };

/** passi della lezione per un argomento con contenuto */
export function lessonSteps(a: Argomento): LessonStepDef[] {
  const c = a.contenuto;
  if (!c) return [];
  const dims = dimsDi(CATALOGO, a);
  const prova = (c.previsioni?.length ?? 0) > 0 || (c.visuali?.length ?? 0) > 0;
  return [
    { id: 'subito', kind: 'subito', title: 'Cosa dire subito' },
    { id: 'ipotesi', kind: 'ipotesi', title: 'Sistema e ipotesi' },
    { id: 'disegno', kind: 'disegno', title: 'Il disegno alla lavagna' },
    { id: 'equazione', kind: 'equazione', title: 'Equazione di partenza' },
    ...dims.map((d) => ({ id: `dim-${d.id}`, kind: 'dim' as const, title: d.titolo, dim: d })),
    ...(prova ? [{ id: 'prova', kind: 'prova' as const, title: 'Prova sul modello' }] : []),
    { id: 'significato', kind: 'significato', title: 'Significato e frase da ricordare' },
    { id: 'nondire', kind: 'nondire', title: 'Da non dire' },
    { id: 'riassunto', kind: 'riassunto', title: 'Riassunto e domande a catena' },
  ];
}

const KICKER: Record<LessonStepDef['kind'], string> = { subito: 'Partenza', ipotesi: 'Ipotesi', disegno: 'Disegno', equazione: 'Equazione', dim: 'Dimostrazione', prova: 'Prevedi, poi verifica', significato: 'Significato', nondire: 'Attenzione', riassunto: 'Per chiudere' };

function speechOf(a: Argomento, s: LessonStepDef): string {
  const c = a.contenuto!;
  switch (s.kind) {
    case 'subito':
      return c.cosaDireSubito;
    case 'ipotesi':
      return c.sistemaIpotesi.join('. ');
    case 'disegno':
      return `${c.disegno.didascalia}. Elementi da disegnare: ${c.disegno.elementi.map((e) => e.testo).join('; ')}.`;
    case 'equazione':
      return `$${c.equazioneDiPartenza.latex}$. ${c.equazioneDiPartenza.spiegazione}`;
    case 'dim':
      return `${s.dim.enunciato} ${s.dim.passi.map((p) => p.perche).join(' ')} ${s.dim.gancio}`;
    case 'prova':
      return (c.previsioni ?? []).map((p) => p.domanda).join(' ');
    case 'significato':
      return `${c.significato} Frase da ricordare: ${c.fraseDaRicordare}`;
    case 'nondire':
      return c.daNonDire.map((d) => `Non dire: ${d.frase} Perché: ${d.perche}`).join(' ');
    case 'riassunto':
      return c.approfondimenti.map((x) => x.domanda).join(' ');
  }
}

const FEEDBACK: { v: Riscontro; label: string }[] = [
  { v: 'chiaro', label: 'chiaro' },
  { v: 'veloce', label: 'troppo veloce' },
  { v: 'lento', label: 'troppo lento' },
  { v: 'confuso', label: 'non ho capito' },
];

function Feedback({ argId, stepId }: { argId: string; stepId: string }) {
  const { state, update } = useApp();
  const cur = state.lezioni[argId]?.feedback[stepId];
  const [note, setNote] = useState(cur?.note ?? '');
  return (
    <div className="lesson-fb">
      <span className="small muted">Com&apos;era questo passo?</span>
      {FEEDBACK.map((f) => (
        <button key={f.v} type="button" className={`chip ${cur?.v === f.v ? 'on' : ''}`} aria-pressed={cur?.v === f.v} onClick={() => update((s) => lessonFeedback(s, argId, stepId, f.v, note))}>
          {f.label}
        </button>
      ))}
      {cur && cur.v !== 'chiaro' && (
        <textarea
          aria-label="nota sul passo"
          placeholder="Che cosa non va? (facoltativo: serve a correggere la lezione)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => update((s) => lessonFeedback(s, argId, stepId, cur.v, note))}
        />
      )}
    </div>
  );
}

/** Dimostrazione riga per riga; sui passi chiave prima la domanda «qual è il prossimo passaggio?». */
function DimView({ a, dim, done, onComplete }: { a: Argomento; dim: Dimostrazione; done: boolean; onComplete: () => void }) {
  const { update } = useApp();
  const [k, setK] = useState(done ? dim.passi.length : 0);
  const [picked, setPicked] = useState(false);
  const finished = k >= dim.passi.length;
  useEffect(() => {
    if (finished) onComplete();
  }, [finished, onComplete]);
  const next = dim.passi[k];
  const chiede = !!next && !!next.chiave && next.distrattori.length > 0;
  const reveal = () => {
    setK((x) => x + 1);
    setPicked(false);
  };
  return (
    <>
      <p>
        <b>Enunciato.</b> <Inline text={dim.enunciato} />
      </p>
      {dim.ipotesi.length > 0 && (
        <ul className="small">
          {dim.ipotesi.map((h, i) => (
            <li key={i}>
              <Inline text={h} />
            </li>
          ))}
        </ul>
      )}
      <div className="deriv">
        {dim.passi.slice(0, k).map((p) => (
          <PassoLine key={p.id} p={p} />
        ))}
        {!finished && next && (
          <div className="deriv-next">
            {chiede ? (
              <>
                <ProssimoPassaggio
                  key={next.id}
                  p={next}
                  onPick={(s) => {
                    setPicked(true);
                    update((st) => addPasso(st, { passoId: next.id, dimId: dim.id, argId: a.id, livello: 1, esito: s.giusto ? 'giusto' : 'sbagliato', errore: s.giusto ? undefined : s.d.errore, dove: 'lezione' }));
                  }}
                />
                {picked && (
                  <button type="button" onClick={reveal}>
                    Scrivi il passaggio
                  </button>
                )}
              </>
            ) : (
              <button type="button" onClick={reveal}>
                {k === 0 ? 'Cominciamo' : 'Passaggio successivo'}
              </button>
            )}
          </div>
        )}
      </div>
      {finished && (
        <div className="verdict info">
          <p>
            <b>Risultato</b> <FonteTag f={dim.risultato.fonte} />
          </p>
          <Tex tex={dim.risultato.latex} display />
          <p className="small">
            <b>Per ricordarlo:</b> <Inline text={dim.gancio} />
          </p>
        </div>
      )}
    </>
  );
}

/** Prevedi, poi verifica: i comandi del modello si sbloccano dopo la previsione. */
function PrevisioneView({ a, p, fallback, onDone }: { a: Argomento; p: Previsione; fallback?: Visual; onDone: () => void }) {
  const { state, update } = useApp();
  const fatta = state.richiami.some((r) => r.qid === `previsione:${p.id}`);
  const [pick, setPick] = useState<number | null>(null);
  const answered = pick !== null || fatta;
  useEffect(() => {
    if (answered) onDone();
  }, [answered, onDone]);
  const visual = p.visual ?? fallback;
  return (
    <div className="card tight">
      <p>
        <b>Prevedi:</b> <Inline text={p.domanda} />
      </p>
      <div className="options">
        {p.opzioni.map((o, i) => (
          <button
            key={i}
            type="button"
            disabled={answered}
            className={`option ${pick === i ? 'on' : ''} ${answered && i === p.corretta ? 'right' : ''} ${pick === i && i !== p.corretta ? 'wrong' : ''}`}
            onClick={() => {
              setPick(i);
              update((s) => addRichiamo(s, { qid: `previsione:${p.id}`, argId: a.id, corretto: i === p.corretta }));
            }}
          >
            <Inline text={o} />
          </button>
        ))}
      </div>
      {answered && (
        <div className={pick === null || pick === p.corretta ? 'verdict ok' : 'verdict ko'}>
          <p>
            <b>{pick === null ? 'Già prevista.' : pick === p.corretta ? 'Previsione giusta.' : 'Non proprio.'}</b> <Inline text={p.spiega} />
          </p>
          <p className="small">Ora verifica sul modello.</p>
        </div>
      )}
      {visual && (
        <div className={answered ? '' : 'locked-veil'}>
          <div className={answered ? '' : 'veil-content'} aria-hidden={!answered} inert={!answered}>
            <VisualHost v={visual} />
          </div>
          {!answered && (
            <div className="veil-msg">
              <span>Prima la previsione, poi i comandi del modello</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProvaView({ a, onComplete }: { a: Argomento; onComplete: () => void }) {
  const c = a.contenuto!;
  const prev = c.previsioni ?? [];
  const [fatte, setFatte] = useState<Record<string, boolean>>({});
  const all = prev.every((p) => fatte[p.id]);
  useEffect(() => {
    if (all) onComplete();
  }, [all, onComplete]);
  const usati = new Set(prev.map((p) => p.visual?.id).filter(Boolean));
  const liberi = (c.visuali ?? []).filter((v) => !usati.has(v.id));
  return (
    <>
      {prev.map((p) => (
        <PrevisioneView key={p.id} a={a} p={p} fallback={c.visuali?.[0]} onDone={() => setFatte((f) => (f[p.id] ? f : { ...f, [p.id]: true }))} />
      ))}
      {(prev.length === 0 || all) && liberi.length > 0 && (
        <>
          <p className="small muted">Modello libero: prova a cambiare i parametri.</p>
          {liberi.map((v, i) => (
            <VisualHost key={i} v={v} />
          ))}
        </>
      )}
    </>
  );
}

function StepView({ a, step, index, active, wasDone, onComplete }: { a: Argomento; step: LessonStepDef; index: number; active: boolean; wasDone: boolean; onComplete: () => void }) {
  const c = a.contenuto!;
  const [check, setCheck] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (step.kind !== 'dim' && step.kind !== 'prova') onComplete();
  }, [step.kind, onComplete]);
  return (
    <section className={`lesson-step ${active ? 'active' : ''}`} id={`passo-${index}`} aria-current={active ? 'step' : undefined}>
      <div className="lesson-step-head">
        <span className="kicker">
          {index + 1}. {KICKER[step.kind]}
        </span>
        <SpeakButton text={speechOf(a, step)} />
      </div>
      <h3>{step.title}</h3>
      {step.kind === 'subito' && (
        <>
          <RichText text={c.cosaDireSubito} className="prof" />
          <p className="small muted">Sono le prime frasi da dire all&apos;orale: circa venti secondi, prima di scrivere qualsiasi cosa.</p>
        </>
      )}
      {step.kind === 'ipotesi' && (
        <ul>
          {c.sistemaIpotesi.map((h, i) => (
            <li key={i}>
              <Inline text={h} />
            </li>
          ))}
        </ul>
      )}
      {step.kind === 'disegno' && (
        <>
          <figure className="figura only-narrow">
            <Svg svg={c.disegno.svg} />
            <figcaption>
              <Inline text={c.disegno.didascalia} /> <FonteTag f={c.disegno.fonte} />
            </figcaption>
          </figure>
          <p className="small muted">Disegnalo su un foglio (o sulla lavagna dell&apos;allenatore) e spunta gli elementi man mano:</p>
          <Checklist elementi={c.disegno.elementi} value={check} onChange={setCheck} />
        </>
      )}
      {step.kind === 'equazione' && (
        <>
          <Tex tex={c.equazioneDiPartenza.latex} display />
          <p>
            <Inline text={c.equazioneDiPartenza.spiegazione} /> <FonteTag f={c.equazioneDiPartenza.fonte} />
          </p>
          {c.simboli.length > 0 && (
            <details>
              <summary>Simboli</summary>
              <table className="tbl simboli">
                <tbody>
                  {c.simboli.map((s, i) => (
                    <tr key={i}>
                      <td>
                        <Tex tex={s.simbolo} />
                      </td>
                      <td>
                        <Inline text={s.significato} />
                        {s.altrove && <span className="small muted"> · altrove: {s.altrove}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          )}
        </>
      )}
      {step.kind === 'dim' && <DimView a={a} dim={step.dim} done={wasDone} onComplete={onComplete} />}
      {step.kind === 'prova' && <ProvaView a={a} onComplete={onComplete} />}
      {step.kind === 'significato' && (
        <>
          <RichText text={c.significato} className="prof" />
          <p className="frase">
            <Inline text={c.fraseDaRicordare} />
          </p>
        </>
      )}
      {step.kind === 'nondire' && (
        <ul className="nondire">
          {c.daNonDire.map((d, i) => (
            <li key={i}>
              <span className="frase-no">
                <Inline text={d.frase} />
              </span>
              <br />
              <span className="small">
                <Inline text={d.perche} /> {d.fonte && <FonteTag f={d.fonte} />}
              </span>
            </li>
          ))}
        </ul>
      )}
      {step.kind === 'riassunto' && (
        <>
          <p>
            <b>In una frase:</b> <Inline text={c.fraseDaRicordare} />
          </p>
          <h4>Il professore può continuare con</h4>
          <ol>
            {c.approfondimenti.map((x, i) => (
              <li key={i}>
                <Inline text={x.domanda} />{' '}
                <details>
                  <summary className="small">risposta attesa</summary>
                  <p className="small">
                    <Inline text={x.attesa} /> <FonteTag f={x.fonte} />
                  </p>
                </details>
              </li>
            ))}
          </ol>
        </>
      )}
      {(active || wasDone) && <Feedback argId={a.id} stepId={step.id} />}
    </section>
  );
}

export function LessonView({ a }: { a: Argomento }) {
  const steps = useMemo(() => lessonSteps(a), [a]);
  const { state, update } = useApp();
  const saved = state.lezioni[a.id];
  const startAt = useRef(Math.min(saved?.passo ?? 0, Math.max(0, steps.length - 1)));
  const [cur, setCur] = useState(startAt.current);
  const [ok, setOk] = useState<Record<number, boolean>>({});
  const doneIdx = useRef(new Map<number, () => void>());
  useEffect(() => {
    if (steps.length && !saved) update((s) => lessonStep(s, a.id, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.id]);
  if (!a.contenuto || !steps.length) return <p className="muted">Lezione in preparazione.</p>;
  const c = a.contenuto;
  const last = steps.length - 1;
  const complete = (i: number) => {
    let f = doneIdx.current.get(i);
    if (!f) {
      f = () => setOk((o) => (o[i] ? o : { ...o, [i]: true }));
      doneIdx.current.set(i, f);
    }
    return f;
  };
  const advance = () => {
    const nx = Math.min(cur + 1, last);
    setCur(nx);
    update((s) => lessonStep(s, a.id, nx));
    setTimeout(() => document.getElementById(`passo-${nx}`)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' }), 60);
  };
  const done = !!state.lezioni[a.id]?.doneAt;
  return (
    <div className="lesson">
      <div className="steps-progress" aria-label={`passo ${cur + 1} di ${steps.length}`}>
        {steps.map((s, i) => (
          <button key={s.id} type="button" className={`dot ${i < cur ? 'past' : ''} ${i === cur ? 'now' : ''}`} disabled={i > cur} title={`${i + 1}. ${s.title}`} aria-label={`vai al passo ${i + 1}`} onClick={() => document.getElementById(`passo-${i}`)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })} />
        ))}
      </div>
      <div className="lesson-grid">
        <div className="lesson-col">
          {steps.slice(0, cur + 1).map((s, i) => (
            <StepView key={s.id} a={a} step={s} index={i} active={i === cur} wasDone={i < startAt.current || done} onComplete={complete(i)} />
          ))}
          <div className="lesson-nav">
            {cur < last ? (
              <button type="button" className="primary" disabled={!ok[cur]} onClick={advance}>
                {ok[cur] ? 'Avanti' : steps[cur].kind === 'prova' ? 'Fai la previsione per andare avanti' : 'Completa il passo per andare avanti'}
              </button>
            ) : !done ? (
              <button type="button" className="primary" onClick={() => update((s) => lessonStep(s, a.id, last, true))}>
                Ho finito la lezione
              </button>
            ) : (
              <div className="lesson-end" style={{ width: '100%' }}>
                <div className="verdict ok">
                  <p>
                    <b>Lezione completata.</b> Da domani i suoi passi entrano nel recupero attivo di «Oggi». Ora fissala con l&apos;allenatore.
                  </p>
                </div>
                <div className="row">
                  <a className="button primary" href={`#/argomento/${a.id}/allena`}>
                    Allenati sulla dimostrazione
                  </a>
                  <a className="button" href={`#/argomento/${a.id}/scheda`}>
                    Scheda di ripasso
                  </a>
                  <a className="button" href={`#/argomento/${a.id}/orale`}>
                    Simula l&apos;orale
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <aside className="lesson-visual" aria-label="disegno di riferimento">
          <figure className="figura">
            <Svg svg={c.disegno.svg} />
            <figcaption>
              <Inline text={c.disegno.didascalia} /> <FonteTag f={c.disegno.fonte} />
            </figcaption>
          </figure>
          <div className="card tight">
            <p className="kicker">Equazione di partenza</p>
            <Tex tex={c.equazioneDiPartenza.latex} display />
          </div>
        </aside>
      </div>
    </div>
  );
}
