/**
 * Dettatura con la Web Speech API (it-IT), se il browser la offre. Nell'iframe di claude.ai il microfono può essere
 * negato: ogni errore diventa un messaggio e l'app propone la dettatura della tastiera del telefono.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

interface Rec {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecCtor = new () => Rec;

export function recognitionCtor(): RecCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: RecCtor; webkitSpeechRecognition?: RecCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const ERRORI_DETTATURA: Record<string, string> = {
  'not-allowed': 'Il microfono non è consentito in questa pagina: usa la dettatura della tastiera del telefono (il tasto del microfono) o scrivi.',
  'service-not-allowed': 'La dettatura del browser non è disponibile qui: usa quella della tastiera del telefono o scrivi.',
  'no-speech': 'Non ho sentito nulla: riprova, oppure usa la dettatura della tastiera.',
  'audio-capture': 'Nessun microfono disponibile: usa la tastiera.',
  network: 'La dettatura del browser richiede la connessione: usa quella della tastiera.',
};

/** `onText(finale)` riceve solo i pezzi definitivi; `parziale` è il testo ancora in ascolto. */
export function useDettatura(onText: (t: string) => void) {
  const Ctor = recognitionCtor();
  const [attiva, setAttiva] = useState(false);
  const [parziale, setParziale] = useState('');
  const [errore, setErrore] = useState<string | null>(null);
  const rec = useRef<Rec | null>(null);
  const cb = useRef(onText);
  cb.current = onText;
  useEffect(() => () => rec.current?.abort(), []);
  const avvia = useCallback(() => {
    if (!Ctor) return;
    setErrore(null);
    try {
      const r = new Ctor();
      r.lang = 'it-IT';
      r.continuous = true;
      r.interimResults = true;
      r.onresult = (e) => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const x = e.results[i];
          if (x.isFinal) cb.current(x[0].transcript.trim());
          else interim += x[0].transcript;
        }
        setParziale(interim);
      };
      r.onerror = (e) => {
        setErrore(ERRORI_DETTATURA[e.error] ?? 'La dettatura del browser si è interrotta: usa la dettatura della tastiera o scrivi.');
        setAttiva(false);
      };
      r.onend = () => {
        setAttiva(false);
        setParziale('');
      };
      r.start();
      rec.current = r;
      setAttiva(true);
    } catch {
      setErrore('La dettatura del browser non è partita: usa la dettatura della tastiera del telefono o scrivi.');
      setAttiva(false);
    }
  }, [Ctor]);
  const ferma = useCallback(() => {
    try {
      rec.current?.stop();
    } catch {
      /* già ferma */
    }
    setAttiva(false);
  }, []);
  return { disponibile: !!Ctor, attiva, parziale, errore, avvia, ferma };
}
