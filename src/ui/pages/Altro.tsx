/** «Altro»: impostazioni, export/import, azzera (con conferma nella pagina), sincronizzazione, come funziona. */
import { useRef, useState } from 'react';
import { exportJSON, importJSON, type Settings } from '../../storage/store';
import { azzera } from '../../learning/actions';
import { mergeStates } from '../../storage/sync';
import { SOGLIA_FADING, SOGLIA_GIRO, SOGLIA_PADRONANZA, SOGLIA_SIM } from '../../learning/mastery';
import { GIORNI_TRA_SIMULAZIONI, MIN } from '../../learning/session';
import { useApp } from '../state';
import { salvaFile } from '../claude';
import { canSpeak } from '../speech';

const SYNC_TEXT: Record<string, string> = {
  sincronizzato: 'I progressi sono salvati sul tuo account claude.ai e si sincronizzano tra telefono e computer.',
  errore: 'Sincronizzazione non riuscita: i progressi restano in questo browser e si riprova da soli.',
  collegamento: 'Collegamento all\'account in corso…',
  locale: 'I progressi sono salvati solo in questo browser (fuori da claude.ai non c\'è sincronizzazione): usa l\'esportazione per spostarli.',
};

export function Altro() {
  const { state, update, replace, sync, saveOk } = useApp();
  const s = state.settings;
  const set = (patch: Partial<Settings>) => update((x) => ({ ...x, settings: { ...x.settings, ...patch } }));
  const [msg, setMsg] = useState<string | null>(null);
  const [conferma, setConferma] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const esporta = async () => {
    const r = await salvaFile(`mam-orale-${new Date().toISOString().slice(0, 10)}.json`, exportJSON(state));
    setMsg(r === 'salvato' ? 'File dei progressi salvato.' : r === 'rifiutato' ? 'Salvataggio annullato.' : 'Non sono riuscito a salvare il file.');
  };
  const importa = async (f: File) => {
    try {
      const nuovo = importJSON(await f.text());
      replace(mergeStates(state, nuovo));
      setMsg('Progressi importati e uniti a quelli presenti.');
    } catch (e) {
      setMsg(`Import non riuscito: ${(e as Error).message}`);
    }
  };
  return (
    <div className="page">
      <h1>Altro</h1>
      <section className="card">
        <h2>Impostazioni</h2>
        <label className="field">
          Ripassi riusciti per argomento (obiettivo del piano)
          <input type="number" min={1} max={10} value={s.ripassiObiettivo} onChange={(e) => set({ ripassiObiettivo: Math.max(1, Math.min(10, Math.round(Number(e.target.value) || 1))) })} style={{ width: 100 }} />
          <span className="small muted">Ogni argomento conta come fatto quando lo hai ripassato con successo in tanti giorni diversi.</span>
        </label>
        <label className="field">
          Data dell&apos;orale (facoltativa)
          <span className="row">
            <input type="date" value={s.dataOrale ?? ''} onChange={(e) => set({ dataOrale: e.target.value || undefined })} />
            {s.dataOrale && (
              <button type="button" className="link" onClick={() => set({ dataOrale: undefined })}>
                togli la data
              </button>
            )}
          </span>
          <span className="small muted">Se c&apos;è, il piano dice se sei in tempo e l&apos;ultima settimana è dedicata alle simulazioni. Senza data il piano funziona lo stesso.</span>
        </label>
        <label className="field">
          Minuti di studio al giorno
          <input type="number" min={10} max={240} step={5} value={s.minutiGiorno} onChange={(e) => set({ minutiGiorno: Math.max(10, Math.min(240, Math.round(Number(e.target.value) || 45))) })} style={{ width: 100 }} />
        </label>
        <label className="check">
          <input type="checkbox" checked={s.voce} onChange={() => set({ voce: !s.voce })} />
          <span>
            Lettura ad alta voce delle lezioni (voce italiana del sistema){!canSpeak() && <span className="small muted"> — non disponibile in questo browser</span>}
          </span>
        </label>
        <div className="field">
          Tema
          <div className="seg" role="group" aria-label="tema">
            {([
              [undefined, 'automatico'],
              ['chiaro', 'chiaro'],
              ['scuro', 'scuro'],
            ] as [Settings['tema'], string][]).map(([v, t]) => (
              <button key={t} type="button" className={s.tema === v ? 'on' : ''} aria-pressed={s.tema === v} onClick={() => set({ tema: v })}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Salvataggio</h2>
        <p className={`sync-status sync-${sync.status}`}>
          <span className="sync-dot" /> {SYNC_TEXT[sync.status] ?? SYNC_TEXT.locale}
          {sync.detail ? ` (${sync.detail})` : ''}
        </p>
        {!saveOk && <p className="verdict warn small">Il browser non permette di salvare in locale (navigazione privata?): esporta i progressi prima di chiudere.</p>}
        <div className="row">
          {sync.status !== 'locale' && (
            <button type="button" onClick={sync.now}>
              Sincronizza ora
            </button>
          )}
          <button type="button" onClick={() => void esporta()}>
            Esporta i progressi (JSON)
          </button>
          <button type="button" onClick={() => file.current?.click()}>
            Importa…
          </button>
          <input
            ref={file}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void importa(f);
              e.target.value = '';
            }}
          />
        </div>
        {msg && <p className="small">{msg}</p>}
        <h3>Azzera</h3>
        {!conferma ? (
          <button type="button" className="danger" onClick={() => setConferma(true)}>
            Azzera tutti i progressi…
          </button>
        ) : (
          <div className="verdict ko">
            <p>
              Cancello lezioni, passi, simulazioni e ripetizioni su <b>tutti i dispositivi</b> (le impostazioni restano). Non si può annullare: se vuoi, esporta prima.
            </p>
            <div className="row">
              <button
                type="button"
                className="danger"
                onClick={() => {
                  update(azzera);
                  setConferma(false);
                  setMsg('Progressi azzerati.');
                }}
              >
                Sì, azzera
              </button>
              <button type="button" onClick={() => setConferma(false)}>
                Annulla
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Come funziona</h2>
        <ul>
          <li>
            <b>Lezione</b> (livello 1): l&apos;argomento costruito passo per passo come va detto all&apos;orale. I passi chiave li indovini prima di vederli. Non entra nella ripetizione.
          </li>
          <li>
            <b>Allena</b>: livello 2 «prossimo passaggio» (prima nascosti i passi non chiave, poi tutti) e livello 3 «foglio bianco» alla lavagna con confronto passo per passo. Ogni passo è una scheda della ripetizione distanziata (FSRS): sbagliato o fermato torna domani, esitante presto, giusto più avanti, giusto e sicuro (4–5) ancora più avanti.
          </li>
          <li>
            <b>Oggi</b>: recupero attivo di passi scaduti o deboli da capitoli diversi, un ripasso dal primo passo scaduto, un argomento nuovo nell&apos;ordine dei prerequisiti e una simulazione ogni {GIORNI_TRA_SIMULAZIONI} giorni (ogni giorno nell&apos;ultima settimana prima dell&apos;orale). Tempi stimati: {MIN.recupero} min per passo di recupero, {MIN.simulazione} min per simulazione.
          </li>
          <li>
            <b>Orale</b>: domanda estratta in base a quante volte è chiesta e a quanto la ricordi; risposta a voce (dettatura del browser o della tastiera); correzione con Claude sulla rubrica e sulla catena della dispensa (solo nella pagina su claude.ai, con il tuo piano) oppure autovalutazione guidata; poi domande a catena.
          </li>
          <li>
            <b>Padronanza</b>: media della ritenibilità dei passi (i chiave contano doppio) e delle voci della rubrica. Un argomento è padroneggiato con padronanza ≥ {SOGLIA_PADRONANZA * 100} % e i ripassi dell&apos;obiettivo. Un ripasso è riuscito con almeno il {SOGLIA_GIRO * 100} % dei passi giusti e nessun passo chiave sbagliato, o una simulazione ≥ {SOGLIA_SIM * 100} %. Il livello 3 si suggerisce quando i passi chiave hanno ritenibilità ≥ {SOGLIA_FADING}.
          </li>
          <li>
            <b>Fonti</b>: «D p. 153» è la pagina del PDF della dispensa; le righe con «la dispensa scrive…» sono errori verificati (note NF) e mostrano la riga corretta; «aggiunto» è un passaggio sottinteso nella dispensa. Gli argomenti «non nella dispensa» pesano metà nel piano e nell&apos;estrazione.
          </li>
        </ul>
        <p className="small muted">Soglie e tempi sono scelte didattiche, non vengono dalla dispensa.</p>
      </section>
    </div>
  );
}
