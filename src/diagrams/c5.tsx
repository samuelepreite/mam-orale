/** Meccanismi animati del capitolo C5 (due parti). */
import type { ComponentType } from 'react';
import { MECCANISMI_C5A } from './c5a';
import { MECCANISMI_C5B } from './c5b';

export const MECCANISMI_C5: Record<string, ComponentType<{ params?: Record<string, number | string> }>> = { ...MECCANISMI_C5A, ...MECCANISMI_C5B };
