/** Piccoli componenti condivisi: fonti cliccabili, barre, sicurezza, checklist, voce, mescolamento riproducibile. */
import { useEffect, useState, type ReactNode } from 'react';
import type { CapId, ElementoDisegno, Fonte } from '../../content/types';
import { canSpeak, speak, stopSpeaking } from '../speech';
import { useApp } from '../state';
import { Inline } from './Tex';

export const pagTesto = (pag: number | [number, number]) => (Array.isArray(pag) ? `${pag[0]}–${pag[1]}` : String(pag));
export const fonteBreve = (f: Fonte) => (f.tipo === 'dispensa' ? `D p. ${pagTesto(f.pag)}` : f.tipo === 'deduzione' ? 'deduzione' : 'fonte esterna');

/** «D p. 153» cliccabile: apre il dettaglio della fonte (pagina, equazione, figura; deduzione o fonte esterna). */
export function FonteTag({ f }: { f: Fonte }) {
  const [open, setOpen] = useState(false);
  const cls = f.tipo === 'dispensa' ? '' : f.tipo === 'deduzione' ? 'ded' : 'est';
  return (
    <>
      <button type="button" className={`fonte ${cls}`} aria-expanded={open} onClick={() => setOpen((o) => !o)} title="Fonte">
        {fonteBreve(f)}
      </button>
      {open && (
        <span className="fonte-pop" role="note">
          {f.tipo === 'dispensa' && (
            <>
              Dispensa, pagina PDF {pagTesto(f.pag)}
              {f.eq ? `, eq. ${f.eq}` : ''}
              {f.fig ? `, ${f.fig}` : ''}.
            </>
          )}
          {f.tipo === 'deduzione' && (
            <>
              Non scritto nella dispensa: si ricava da {f.da}. <Inline text={f.spiegazione} />
            </>
          )}
          {f.tipo === 'esterna' && (
            <>
              Fonte esterna: {f.ref}. <Inline text={f.nota} />
            </>
          )}
        </span>
      )}
    </>
  );
}

export const pct = (x: number) => `${Math.round(Math.max(0, Math.min(1, x)) * 100)} %`;

export function Bar({ v, label }: { v: number; label?: string }) {
  return (
    <div className="bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v * 100)} aria-label={label ?? 'padronanza'}>
      <span style={{ width: `${Math.round(Math.max(0, Math.min(1, v)) * 100)}%` }} />
    </div>
  );
}

export const CapChip = ({ cap }: { cap: CapId | string }) => <span className={`cap-chip cap-${cap}`}>{cap}</span>;

/** Sicurezza 1–5 (metacognizione), da dare prima di vedere la soluzione. */
export function Sicurezza({ value, onChange, label = 'Quanto sei sicuro?' }: { value?: number; onChange: (v: number) => void; label?: string }) {
  return (
    <div className="conf" role="group" aria-label={label}>
      <span className="small muted">{label}</span>
      {[1, 2, 3, 4, 5].map((c) => (
        <button key={c} type="button" className={value === c ? 'on' : ''} aria-pressed={value === c} onClick={() => onChange(c)} title={['per niente', 'poco', 'abbastanza', 'molto', 'del tutto'][c - 1]}>
          {c}
        </button>
      ))}
    </div>
  );
}

/** Checklist degli elementi del disegno (obbligatori in evidenza). */
export function Checklist({ elementi, value, onChange }: { elementi: ElementoDisegno[]; value: Record<string, boolean>; onChange: (v: Record<string, boolean>) => void }) {
  return (
    <ul className="checklist">
      {elementi.map((e) => (
        <li key={e.id} className={value[e.id] ? 'done' : ''}>
          <label className="check">
            <input type="checkbox" checked={!!value[e.id]} onChange={() => onChange({ ...value, [e.id]: !value[e.id] })} />
            <span>
              <Inline text={e.testo} /> {!e.obbligatorio && <span className="opt">(facoltativo)</span>}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

/** Lettura ad alta voce (se il browser la offre e la voce è attiva nelle impostazioni). */
export function SpeakButton({ text }: { text: string }) {
  const { state } = useApp();
  const [on, setOn] = useState(false);
  useEffect(() => () => stopSpeaking(), []);
  if (!state.settings.voce || !canSpeak() || !text) return null;
  return (
    <button
      type="button"
      className="link"
      aria-pressed={on}
      onClick={() => {
        if (on) {
          stopSpeaking();
          setOn(false);
        } else {
          setOn(true);
          speak(text, () => setOn(false));
        }
      }}
    >
      {on ? '■ ferma la voce' : '▶ ascolta'}
    </button>
  );
}

/** mescolamento riproducibile (stessa chiave → stesso ordine) */
export function shuffled<T>(xs: T[], key: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  const rnd = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Svg({ svg, label }: { svg: string; label?: string }) {
  return <div className="svg-host" role={label ? 'img' : undefined} aria-label={label} dangerouslySetInnerHTML={{ __html: svg }} />;
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}

export const fmtData = (iso: string) => new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
export const fmtDataOra = (iso: string) => new Date(iso).toLocaleString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
export const fmtDurata = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
