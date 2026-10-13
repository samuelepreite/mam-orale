/**
 * Simulazione dell'orale: il professore virtuale estrae una domanda (learning/oral.ts), si risponde ad alta voce
 * (dettatura del browser se c'è, altrimenti quella della tastiera, oppure «ho risposto a voce»), lavagna facoltativa;
 * poi «Correggi con Claude» (capability `sample`, solo su gesto esplicito) o autovalutazione guidata sulla rubrica;
 * poi 1–2 domande a catena; poi esito, voci mancate, passo mancante e collegamenti alla lezione.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Argomento } from '../../content/types';
import { addSimulazione, updateSimulazione } from '../../learning/actions';
import { CATALOGO, argDi, dimsDi } from '../../learning/catalogo';
import { approfondimentiDi, costruisciRichiesta, costruisciRichiestaCatena, estraiDomanda, leggiCatena, leggiValutazione, messaggioErroreClaude, scegliCatena, type Estratta, type Punti } from '../../learning/oral';
import { punteggio, rubricaDi, vociMancate } from '../../learning/rubrica';
import { canSendImages, getSample, type SampleLike } from '../claude';
import { useDettatura } from '../dettatura';
import { useApp } from '../state';
import { fmtDurata, pct } from './bits';
import { Lavagna, type LavagnaApi } from './Lavagna';
import { Inline, Tex } from './Tex';

type Fase = 'estrai' | 'risposta' | 'correzione' | 'catena' | 'esito';
interface DomCatena {
  id: string | null;
  domanda: string;
  attesa?: string;
}

function useSample() {
  const [s, setS] = useState<SampleLike | null>(null);
  const [img, setImg] = useState(false);
  useEffect(() => {
    let alive = true;
    void getSample().then(async (x) => {
      if (!alive) return;
      setS(x);
      setImg(await canSendImages(x));
    });
    return () => {
      alive = false;
    };
  }, []);
  return { sample: s, immagini: img };
}

function Timer({ t0, stop }: { t0: number; stop?: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (stop) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [stop]);
  return <span className="timer" aria-label="tempo trascorso">{fmtDurata(((stop ?? now) - t0) / 1000)}</span>;
}

/** Campo di risposta con dettatura del browser (se c'è) e invito alla dettatura della tastiera. */
function Risposta({ value, onChange, label, rows = 7 }: { value: string; onChange: (v: string) => void; label: string; rows?: number }) {
  const ref = useRef(value);
  ref.current = value;
  const d = useDettatura((t) => onChange((ref.current ? ref.current.trimEnd() + ' ' : '') + t));
  return (
    <div>
      {d.disponibile && (
        <div className="row">
          {!d.attiva ? (
            <button type="button" onClick={d.avvia}>
              Detta la risposta
            </button>
          ) : (
            <button type="button" className="primary" onClick={d.ferma}>
              <span className="rec-dot" /> Sto ascoltando… ferma
            </button>
          )}
          {d.parziale && <span className="small muted">{d.parziale}</span>}
        </div>
      )}
      {d.errore && <p className="verdict warn small">{d.errore}</p>}
      <label className="field">
        {label}
        <span className="small muted">Parla come all&apos;orale. Sul telefono puoi usare il microfono della tastiera per dettare qui dentro.</span>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
      </label>
    </div>
  );
}

function PuntiBtns({ v, onChange, label }: { v?: Punti; onChange: (p: Punti) => void; label: string }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {([0, 0.5, 1] as Punti[]).map((p) => (
        <button key={p} type="button" className={v === p ? 'on' : ''} aria-pressed={v === p} onClick={() => onChange(p)}>
          {p === 0 ? 'no' : p === 0.5 ? 'in parte' : 'sì'}
        </button>
      ))}
    </div>
  );
}

export function OralSim({ argId }: { argId?: string }) {
  const { state, update } = useApp();
  const { sample, immagini } = useSample();
  const [nascondiClaude, setNascondiClaude] = useState(false);
  const [fase, setFase] = useState<Fase>('estrai');
  const [dom, setDom] = useState<Estratta | null>(() => estraiDomanda(state, Math.random, new Date(), CATALOGO, argId));
  const a: Argomento | undefined = dom ? argDi(CATALOGO, dom.argId) : undefined;
  const rub = useMemo(() => (a ? rubricaDi(a) : []), [a]);
  const [t0, setT0] = useState(0);
  const [t1, setT1] = useState(0);
  const [testo, setTesto] = useState('');
  const [conLavagna, setConLavagna] = useState(false);
  const lav = useRef<LavagnaApi | null>(null);
  const [voci, setVoci] = useState<Record<string, Punti>>({});
  const [motivi, setMotivi] = useState<Record<string, string>>({});
  const [daClaude, setDaClaude] = useState<Set<string>>(new Set());
  const [detti, setDetti] = useState<string[]>([]);
  const [mancante, setMancante] = useState<string>('');
  const [commento, setCommento] = useState('');
  const [correttore, setCorrettore] = useState<'claude' | 'auto'>('auto');
  const [modo, setModo] = useState<'scegli' | 'auto' | 'claude'>('scegli');
  const [attesa, setAttesa] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);
  const ctl = useRef<AbortController | null>(null);
  const [catena, setCatena] = useState<DomCatena[]>([]);
  const [risposte, setRisposte] = useState<string[]>([]);
  const [voti, setVoti] = useState<(Punti | undefined)[]>([]);
  const [commentiCatena, setCommentiCatena] = useState<string[]>([]);
  const [mostraAttese, setMostraAttese] = useState(false);
  const [simId, setSimId] = useState<string | null>(null);
  useEffect(() => () => ctl.current?.abort(), []);

  if (!dom || !a?.contenuto) {
    return (
      <div className="card">
        <p>Non ci sono ancora argomenti con contenuto da cui estrarre una domanda.</p>
      </div>
    );
  }
  const c = a.contenuto;
  const durataS = t0 ? ((t1 || Date.now()) - t0) / 1000 : 0;
  const passi = dimsDi(CATALOGO, a).flatMap((d) => d.passi.map((p) => ({ d, p })));
  const puoClaude = !!sample && !nascondiClaude && (testo.trim().length >= 20 || (conLavagna && !!lav.current && !lav.current.vuota()));
  const tutteDate = rub.every((v) => voci[v.id] !== undefined);

  const nuova = () => {
    ctl.current?.abort();
    setDom(estraiDomanda(state, Math.random, new Date(), CATALOGO, argId));
    setFase('estrai');
    setT0(0);
    setT1(0);
    setTesto('');
    setConLavagna(false);
    setVoci({});
    setMotivi({});
    setDaClaude(new Set());
    setDetti([]);
    setMancante('');
    setCommento('');
    setCorrettore('auto');
    setModo('scegli');
    setErrore(null);
    setCatena([]);
    setRisposte([]);
    setVoti([]);
    setCommentiCatena([]);
    setMostraAttese(false);
    setSimId(null);
  };

  const correggiConClaude = async () => {
    if (!sample) return;
    setModo('claude');
    setAttesa(true);
    setErrore(null);
    const ac = new AbortController();
    ctl.current = ac;
    try {
      const blob = conLavagna && immagini && lav.current ? await lav.current.toBlob() : null;
      const prompt = costruisciRichiesta(a, dom.testo, testo, { immagine: !!blob, durataS });
      const raw = await sample.json(prompt, { modelTier: 'default', signal: ac.signal, ...(blob ? { images: [blob] } : {}) });
      const r = leggiValutazione(raw, a);
      if (!r.ok) {
        setErrore(`${r.errore} Correggi con l'autovalutazione qui sotto.`);
        setModo('auto');
        return;
      }
      const v = r.v;
      setVoci(Object.fromEntries(Object.entries(v.voci).map(([k, x]) => [k, x.punti])));
      setMotivi(Object.fromEntries(Object.entries(v.voci).map(([k, x]) => [k, x.motivo])));
      setDaClaude(new Set(Object.keys(v.voci)));
      setDetti(v.daNonDireDetti);
      setMancante(v.passoMancante ?? '');
      setCommento(v.commento);
      setCorrettore('claude');
      const ap = approfondimentiDi(a);
      const dc = v.domandeACatena.map((q) => ({ id: q.id, domanda: q.domanda, attesa: ap.find((x) => x.id === q.id)?.attesa }));
      setCatena(dc.length ? dc : scegliCatena(a, Math.random).map((x) => ({ id: x.id, domanda: x.domanda, attesa: x.attesa })));
    } catch (e) {
      const code = (e as { code?: string })?.code;
      const m = messaggioErroreClaude(code);
      if (code !== 'cancelled') setErrore(m.testo);
      if (m.nascondi) setNascondiClaude(true);
      setModo('auto');
    } finally {
      setAttesa(false);
      ctl.current = null;
    }
  };

  const conferma = () => {
    const cat = catena.length ? catena : scegliCatena(a, Math.random).map((x) => ({ id: x.id, domanda: x.domanda, attesa: x.attesa }));
    setCatena(cat);
    setRisposte(cat.map(() => ''));
    setVoti(cat.map(() => undefined));
    const id = `sim-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    update((s) =>
      addSimulazione(s, {
        id,
        argId: a.id,
        q: dom.q,
        durataS: Math.round(durataS),
        testo: testo.trim() || undefined,
        conLavagna,
        correttore,
        voci,
        daNonDire: detti,
        passoMancante: mancante || undefined,
        catena: cat.map((x) => ({ domanda: x.domanda })),
        nota: commento.trim() || undefined,
      }),
    );
    setSimId(id);
    setFase('catena');
  };

  const valutaCatenaClaude = async () => {
    if (!sample) return;
    setAttesa(true);
    setErrore(null);
    const ac = new AbortController();
    ctl.current = ac;
    try {
      const raw = await sample.json(costruisciRichiestaCatena(a, dom.testo, catena.map((x, i) => ({ domanda: x.domanda, attesa: x.attesa, risposta: risposte[i] ?? '' }))), { modelTier: 'default', signal: ac.signal });
      const r = leggiCatena(raw, catena.length);
      if (!r.ok) setErrore(`${r.errore} Valuta tu confrontando con la risposta attesa.`);
      else {
        setVoti((vs) => r.v.map((x, i) => x?.voto ?? vs[i]));
        setCommentiCatena(r.v.map((x) => x?.commento ?? ''));
      }
      setMostraAttese(true);
    } catch (e) {
      const code = (e as { code?: string })?.code;
      const m = messaggioErroreClaude(code);
      if (code !== 'cancelled') setErrore(m.testo);
      if (m.nascondi) setNascondiClaude(true);
      setMostraAttese(true);
    } finally {
      setAttesa(false);
      ctl.current = null;
    }
  };

  const chiudiCatena = (salta = false) => {
    if (simId)
      update((s) =>
        updateSimulazione(s, simId, {
          catena: catena.map((x, i) => ({ domanda: x.domanda, risposta: salta ? undefined : risposte[i]?.trim() || undefined, voto: salta ? undefined : voti[i] })),
        }),
      );
    setFase('esito');
  };

  const score = punteggio(rub, voci);
  const mancate = vociMancate(rub, voci);
  const passoMancante = passi.find((x) => x.p.id === mancante);

  return (
    <div className={`oral cap-${a.cap}`}>
      <div className="card">
        <div className="row">
          <span className="kicker">Il professore chiede{dom.q ? ` · domanda ${dom.q}` : ''}</span>
          <span className="spacer" />
          {t0 > 0 && <Timer t0={t0} stop={t1 || undefined} />}
        </div>
        <p className="prof-q">
          <Inline text={dom.testo} />
        </p>
        {fase !== 'estrai' && (
          <p className="small muted">
            Argomento: {a.titolo} ({a.cap}, pp. {a.pagine})
          </p>
        )}
        {fase === 'estrai' && (
          <div className="row">
            <button type="button" className="primary" onClick={() => { setT0(Date.now()); setFase('risposta'); }}>
              Inizia a rispondere
            </button>
            <button type="button" onClick={nuova}>
              Un&apos;altra domanda
            </button>
          </div>
        )}
      </div>

      {fase === 'risposta' && (
        <div className="card">
          <p>
            Rispondi <b>ad alta voce</b>, come davanti al professore: cosa dici subito, ipotesi, disegno, equazione di partenza, passaggio chiave, significato.
          </p>
          <Risposta value={testo} onChange={setTesto} label="La tua risposta (trascrizione)" />
          <label className="check">
            <input type="checkbox" checked={conLavagna} onChange={() => setConLavagna((x) => !x)} /> Uso la lavagna{immagini ? ' (l\'immagine può andare a Claude con la correzione)' : ''}
          </label>
          {conLavagna && <Lavagna titolo="Lavagna dell'orale" onApi={(x) => (lav.current = x)} />}
          <div className="row">
            <button type="button" className="primary" disabled={!testo.trim() && !conLavagna} onClick={() => { setT1(Date.now()); setFase('correzione'); }}>
              Ho finito
            </button>
            <button type="button" onClick={() => { setT1(Date.now()); setFase('correzione'); setModo('auto'); }}>
              Ho risposto a voce (senza testo)
            </button>
          </div>
        </div>
      )}

      {fase === 'correzione' && (
        <div className="card">
          <h3>Correzione</h3>
          {errore && <p className="verdict warn">{errore}</p>}
          {modo === 'scegli' && (
            <>
              {puoClaude ? (
                <p className="small muted">Claude legge la tua risposta e la confronta con la rubrica e la catena della dispensa. Usa il tuo piano Claude; la prima volta chiede il consenso. È un aiuto allo studio, non un voto.</p>
              ) : (
                <p className="small muted">
                  {!sample || nascondiClaude
                    ? 'La correzione con Claude è disponibile solo nella pagina pubblicata su claude.ai: qui si usa l\'autovalutazione guidata sulla rubrica.'
                    : 'Per la correzione con Claude serve la trascrizione (almeno qualche frase) o la lavagna: altrimenti autovalutazione.'}
                </p>
              )}
              <div className="row">
                {puoClaude && (
                  <button type="button" className="primary" onClick={() => void correggiConClaude()}>
                    Correggi con Claude
                  </button>
                )}
                <button type="button" className={puoClaude ? '' : 'primary'} onClick={() => setModo('auto')}>
                  Autovalutazione guidata
                </button>
              </div>
            </>
          )}
          {attesa && (
            <div className="row">
              <span className="thinking">Claude sta leggendo la tua risposta…</span>
              <button type="button" onClick={() => ctl.current?.abort()}>
                Ferma
              </button>
            </div>
          )}
          {(modo === 'auto' || (modo === 'claude' && !attesa)) && (
            <>
              {correttore === 'claude' && commento && (
                <div className="verdict info">
                  <p>
                    <b>Il commento di Claude:</b> {commento}
                  </p>
                </div>
              )}
              <p className="small muted">{correttore === 'claude' ? 'Punti proposti da Claude: puoi cambiarli. Le voci senza punti le valuti tu.' : 'Confronta la tua risposta con ciò che doveva esserci e dai i punti a ogni voce.'}</p>
              {rub.map((v) => (
                <div key={v.id} className="voce-row">
                  <div className="row">
                    <b>{v.testo}</b>
                    {v.peso !== 1 && <span className="badge">peso {v.peso}</span>}
                    {daClaude.has(v.id) && <span className="badge accent">Claude</span>}
                    <span className="spacer" />
                    <PuntiBtns v={voci[v.id]} label={v.testo} onChange={(p) => setVoci((x) => ({ ...x, [v.id]: p }))} />
                  </div>
                  {motivi[v.id] && <span className="small">{motivi[v.id]}</span>}
                  <details className="attese">
                    <summary className="small">che cosa doveva esserci</summary>
                    <ul>
                      {v.attese.map((t, i) => (
                        <li key={i}>
                          <Inline text={t} />
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              ))}
              <h4>Da non dire: ne hai detta qualcuna?</h4>
              {c.daNonDire.map((d) => (
                <label key={d.frase} className="check">
                  <input type="checkbox" checked={detti.includes(d.frase)} onChange={() => setDetti((x) => (x.includes(d.frase) ? x.filter((y) => y !== d.frase) : [...x, d.frase]))} />
                  <span>
                    <Inline text={d.frase} />
                  </span>
                </label>
              ))}
              <label className="field">
                Il primo passo che hai saltato o sbagliato
                <select value={passi.some((x) => x.p.id === mancante) || !mancante ? mancante : '__testo'} onChange={(e) => setMancante(e.target.value === '__testo' ? mancante : e.target.value)}>
                  <option value="">nessuno</option>
                  {passi.map(({ d, p }) => (
                    <option key={p.id} value={p.id}>
                      {d.id} · passo {d.passi.indexOf(p) + 1}
                      {p.chiave ? ' (chiave)' : ''} — {p.latex.replace(/\\[a-zA-Z]+|[{}]/g, ' ').replace(/\s+/g, ' ').slice(0, 38)}
                    </option>
                  ))}
                  {mancante && !passi.some((x) => x.p.id === mancante) && <option value="__testo">{mancante.slice(0, 60)}</option>}
                </select>
              </label>
              <button type="button" className="primary" disabled={!tutteDate} onClick={conferma}>
                {tutteDate ? 'Conferma la correzione' : 'Dai i punti a tutte le voci'}
              </button>
            </>
          )}
        </div>
      )}

      {fase === 'catena' && (
        <div className="card">
          <h3>Domande a catena</h3>
          <p className="small muted">Il professore continua. Rispondi a voce o per scritto.</p>
          {errore && <p className="verdict warn">{errore}</p>}
          {catena.map((q, i) => (
            <div key={i} className="voce-row">
              <p className="prof-q" style={{ fontSize: '1.05rem' }}>
                <Inline text={q.domanda} />
              </p>
              <Risposta value={risposte[i] ?? ''} onChange={(t) => setRisposte((r) => r.map((x, j) => (j === i ? t : x)))} label={`Risposta ${i + 1}`} rows={3} />
              {mostraAttese && (
                <>
                  {q.attesa && (
                    <p className="small">
                      <b>Risposta attesa:</b> <Inline text={q.attesa} />
                    </p>
                  )}
                  {commentiCatena[i] && <p className="small">Claude: {commentiCatena[i]}</p>}
                  <div className="row">
                    <span className="small muted">Com&apos;è andata?</span>
                    <PuntiBtns v={voti[i]} label={`voto della domanda ${i + 1}`} onChange={(p) => setVoti((vs) => vs.map((x, j) => (j === i ? p : x)))} />
                  </div>
                </>
              )}
            </div>
          ))}
          {attesa && (
            <div className="row">
              <span className="thinking">Claude sta valutando…</span>
              <button type="button" onClick={() => ctl.current?.abort()}>
                Ferma
              </button>
            </div>
          )}
          {!mostraAttese ? (
            <div className="row">
              {sample && !nascondiClaude && risposte.some((r) => r.trim().length >= 10) && (
                <button type="button" className="primary" disabled={attesa} onClick={() => void valutaCatenaClaude()}>
                  Valuta con Claude
                </button>
              )}
              <button type="button" onClick={() => setMostraAttese(true)}>
                Mostra le risposte attese
              </button>
              <button type="button" className="link" onClick={() => chiudiCatena(true)}>
                Salta le domande a catena
              </button>
            </div>
          ) : (
            <button type="button" className="primary" disabled={attesa || voti.some((v) => v === undefined)} onClick={() => chiudiCatena()}>
              Vedi l&apos;esito
            </button>
          )}
        </div>
      )}

      {fase === 'esito' && (
        <div className="card">
          <h3>Esito della simulazione</h3>
          <p>
            <span className="score">{pct(score)}</span> <span className="muted">della rubrica · {fmtDurata(durataS)} · {correttore === 'claude' ? 'corretta con Claude' : 'autovalutazione'}</span>
          </p>
          {mancate.length > 0 ? (
            <>
              <h4>Voci da sistemare</h4>
              <ul>
                {mancate.map((v) => (
                  <li key={v.id}>
                    {v.testo} — {voci[v.id] === 0.5 ? 'in parte' : 'mancata'}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="verdict ok">Tutte le voci della rubrica ci sono.</p>
          )}
          {detti.length > 0 && (
            <>
              <h4>Hai detto cose da non dire</h4>
              <ul>
                {detti.map((d) => (
                  <li key={d}>
                    <Inline text={d} /> — {c.daNonDire.find((x) => x.frase === d)?.perche ?? ''}
                  </li>
                ))}
              </ul>
            </>
          )}
          {mancante && (
            <div className="verdict warn">
              <p>
                <b>Passo mancante:</b> {passoMancante ? <Tex tex={passoMancante.p.latex} /> : mancante}
              </p>
              {passoMancante && <p className="small">Torna nel recupero attivo già da domani.</p>}
            </div>
          )}
          {voti.some((v) => v !== undefined) && (
            <p className="small">
              Domande a catena: {voti.filter((v) => v === 1).length} su {voti.length} complete.
            </p>
          )}
          <div className="row">
            <a className="button" href={`#/argomento/${a.id}/lezione`}>
              Rivedi la lezione
            </a>
            <a className="button" href={`#/argomento/${a.id}/allena`}>
              Allena la dimostrazione
            </a>
            <button type="button" className="primary" onClick={nuova}>
              Nuova simulazione
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
