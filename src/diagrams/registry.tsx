/** Registro dei meccanismi animati: id → componente. Ogni capitolo esporta il suo dizionario da src/diagrams/cX.tsx. */
import type { ComponentType } from 'react';
import { MECCANISMI_C1 } from './c1';
import { MECCANISMI_C2 } from './c2';
import { MECCANISMI_C3 } from './c3';
import { MECCANISMI_C4 } from './c4';
import { MECCANISMI_C5 } from './c5';
import { MECCANISMI_C6 } from './c6';
import { MECCANISMI_C7 } from './c7';
import type { Visual } from '../content/types';

export const MECCANISMI: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = {
  ...MECCANISMI_C1, ...MECCANISMI_C2, ...MECCANISMI_C3, ...MECCANISMI_C4, ...MECCANISMI_C5, ...MECCANISMI_C6, ...MECCANISMI_C7,
};

export function VisualHost({ v }: { v: Visual }) {
  const C = MECCANISMI[v.id];
  if (!C) return <p className="muted">Animazione «{v.id}» non ancora disponibile.</p>;
  return <C params={v.params} />;
}
