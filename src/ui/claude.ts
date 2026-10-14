/**
 * Accesso alla capability `downloads` della pagina pubblicata su claude.ai (salvataggio dell'esportazione).
 * Fuori da claude.ai `window.claude` non c'è: si usa il download diretto del browser.
 * L'app non usa servizi di intelligenza artificiale: nessuna chiamata consuma il piano dello studente.
 */
interface DownloadsLike {
  save(r: { filename: string; data: string | Blob }): Promise<{ status: string }>;
}
interface ClaudeLike {
  use(name: string): Promise<unknown>;
}

const claude = () => (typeof window !== 'undefined' ? (window as unknown as { claude?: ClaudeLike }).claude : undefined);

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
