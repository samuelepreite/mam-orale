/** Icone a tratto (24×24, stroke = currentColor), disegnate a mano. */
const P: Record<string, string> = {
  oggi: 'M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z',
  argomenti: 'M7 4.5h10.5V20H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2zM5 17a2 2 0 0 1 2-2h10.5M9 8.5h5',
  orale: 'M12 4a3 3 0 0 1 3 3v4a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3zM6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20M9 20h6',
  progressi: 'M5 20V12M10 20V6M15 20v-9M20 20V4',
  altro: 'M5 12h.01M12 12h.01M19 12h.01',
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name] ?? P.altro} />
    </svg>
  );
}

/** Marchio: due pulegge con la cinghia (il flessibile della dispensa); gira piano mentre si sincronizza. */
export function Logo({ size = 28, spinning = false }: { size?: number; spinning?: boolean }) {
  return (
    <svg className={`logo ${spinning ? 'spin' : ''}`} width={size} height={size} viewBox="-16 -16 32 32" aria-hidden="true">
      <circle r="15" className="l-ring" />
      <path d="M-7 -6.5 L6 -3.5 M-7 6.5 L6 3.5" className="l-belt" />
      <circle cx="-6.5" r="6.5" className="l-belt" />
      <circle cx="6" r="3.5" className="l-belt" />
      <circle cx="-6.5" r="1.6" className="l-hub" />
    </svg>
  );
}
