/** Orologio delle animazioni a tempo continuo e pulsante avvia/pausa (meccanismi M6, M6C7, M1). */
import { useEffect, useRef, useState } from 'react';

export function useClock() {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [t, setT] = useState(0);
  const [play, setPlay] = useState(!reduce);
  const last = useRef<number | null>(null);
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const tick = (now: number) => {
      if (last.current != null) {
        const dt = Math.min(0.05, (now - last.current) / 1000);
        setT((x) => x + dt);
      }
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      last.current = null;
    };
  }, [play]);
  return { t, play, setPlay };
}

export function PlayBtn({ clock }: { clock: ReturnType<typeof useClock> }) {
  return (
    <button type="button" className="mech-btn" onClick={() => clock.setPlay(!clock.play)} aria-label={clock.play ? 'pausa' : 'avvia'}>
      {clock.play ? '❚❚ pausa' : '▶ avvia'}
    </button>
  );
}

/** freccia per i vettori dei triangoli (marker SVG) */
export function ArrowDef({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M0,0 L8,4 L0,8 z" className="arrowhead" />
      </marker>
    </defs>
  );
}
