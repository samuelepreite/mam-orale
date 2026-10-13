/**
 * Accesso alle capability della pagina pubblicata su claude.ai (`sample`, `downloads`).
 * Fuori da claude.ai `window.claude` non c'è: tutto risolve `null` e l'app usa le alternative
 * (autovalutazione guidata, download diretto del browser).
 */
export interface SampleLike {
  json<T = unknown>(input: string, options?: { images?: Blob[]; modelTier?: 'default' | 'complex' | 'quick'; signal?: AbortSignal; cache?: boolean }): Promise<T>;
  limits(): Promise<{ maxPromptBytes: number; images?: { maxCount: number; maxInputBytes: number; mediaTypes: string[] } }>;
}
interface DownloadsLike {
  save(r: { filename: string; data: string | Blob }): Promise<{ status: string }>;
}
interface ClaudeLike {
  use(name: string): Promise<unknown>;
}

const claude = () => (typeof window !== 'undefined' ? (window as unknown as { claude?: ClaudeLike }).claude : undefined);

let cache: { c: ClaudeLike | undefined; p: Promise<SampleLike | null> } | null = null;
/** la funzione `sample` (null se la pagina non può chiedere a Claude); `use()` è memorizzato dalla piattaforma */
export function getSample(): Promise<SampleLike | null> {
  const c = claude();
  if (!cache || cache.c !== c) cache = { c, p: c?.use ? c.use('sample').then((x) => (x as SampleLike | null) ?? null).catch(() => null) : Promise.resolve(null) };
  return cache.p;
}

/** la pagina può inviare immagini a Claude? */
export async function canSendImages(s: SampleLike | null): Promise<boolean> {
  if (!s) return false;
  try {
    const l = await s.limits();
    return !!l?.images && l.images.mediaTypes.includes('image/png');
  } catch {
    return false;
  }
}

/** Salva un file: con la capability `downloads` (in claude.ai) o con un link di download del browser. */
export async function salvaFile(filename: string, data: string, mime = 'application/json'): Promise<'salvato' | 'rifiutato' | 'errore'> {
  const c = claude();
  if (c?.use) {
    try {
      const d = (await c.use('downloads')) as DownloadsLike | null;
      if (d) {
        await d.save({ filename, data });
        return 'salvato';
      }
    } catch (e) {
      const code = (e as { code?: string })?.code;
      if (code === 'declined') return 'rifiutato';
      if (code && code !== 'unavailable' && code !== 'not_granted' && code !== 'capability_disabled' && code !== 'capability_removed') return 'errore';
    }
  }
  try {
    const url = URL.createObjectURL(new Blob([data], { type: mime }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    return 'salvato';
  } catch {
    return 'errore';
  }
}
