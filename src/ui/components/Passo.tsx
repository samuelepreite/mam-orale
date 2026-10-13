/** Una riga di dimostrazione (KaTeX + perché + fonte + «aggiunto» + riquadro «la dispensa scrive…») e la domanda «qual è il prossimo passaggio?». */
import { useMemo, useState } from 'react';
import type { Distrattore, Passo } from '../../content/types';
import { ERRORI_TESTO } from '../../learning/stats';
import { FonteTag, shuffled } from './bits';
import { RichText, Tex } from './Tex';

export function Correzione({ p }: { p: Passo }) {
  if (!p.correzione) return null;
  return (
    <div className="nf-box">
      <span className="small">
        <b>La dispensa scrive</b> ({p.correzione.nf}, errore verificato: qui sopra la riga corretta):
      </span>
      <Tex tex={p.correzione.dispensaScrive} display />
    </div>
  );
}

export function PassoLine({ p, perche = true, cls = '' }: { p: Passo; perche?: boolean; cls?: string }) {
  return (
    <div className={`deriv-line ${p.chiave ? 'key' : ''} ${cls}`}>
      <Tex tex={p.latex} display />
      <div className="meta">
        <FonteTag f={p.fonte} />
        {p.chiave && <span className="keybadge">passaggio chiave</span>}
        {p.aggiunto && <span className="added">aggiunto</span>}
      </div>
      {perche && <RichText text={p.perche} className="why" />}
      <Correzione p={p} />
    </div>
  );
}

export type Scelta = { giusto: true } | { giusto: false; d: Distrattore };

/** Scelta del prossimo passaggio tra il passo giusto e i distrattori (mescolati in modo riproducibile). */
export function ProssimoPassaggio({ p, onPick, domanda = 'Qual è il prossimo passaggio?' }: { p: Passo; onPick: (s: Scelta) => void; domanda?: string }) {
  const opts = useMemo(() => shuffled([{ latex: p.latex, d: null as Distrattore | null }, ...p.distrattori.map((d) => ({ latex: d.latex, d }))], p.id), [p]);
  const [pick, setPick] = useState<number | null>(null);
  const chosen = pick !== null ? opts[pick] : null;
  return (
    <div className="deriv-q">
      <p className="kicker">Prova tu</p>
      <p>
        <b>{domanda}</b>
      </p>
      <div className="options">
        {opts.map((o, i) => (
          <button
            key={i}
            type="button"
            disabled={pick !== null}
            className={`option ${pick === i ? 'on' : ''} ${pick !== null && o.d === null ? 'right' : ''} ${pick === i && o.d ? 'wrong' : ''}`}
            onClick={() => {
              setPick(i);
              onPick(o.d ? { giusto: false, d: o.d } : { giusto: true });
            }}
          >
            <Tex tex={o.latex} display />
          </button>
        ))}
      </div>
      {chosen && (
        <div className={chosen.d ? 'verdict ko' : 'verdict ok'}>
          {chosen.d ? (
            <>
              <p>
                <b>Non è questo: errore di {ERRORI_TESTO[chosen.d.errore] ?? chosen.d.errore}.</b>
              </p>
              <RichText text={chosen.d.spiega} />
            </>
          ) : (
            <p>
              <b>Esatto.</b>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
