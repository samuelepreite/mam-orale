import katex from 'katex';
import { Fragment, useMemo } from 'react';

/** Formula LaTeX renderizzata con KaTeX. Gli errori di sintassi non bloccano la pagina. */
export function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = useMemo(() => katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore', output: 'html' }), [tex, display]);
  return display ? <div className="tex-display" dangerouslySetInnerHTML={{ __html: html }} /> : <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Testo con formule: `$…$` in linea, `$$…$$` a blocco, `**grassetto**`, paragrafi separati da riga vuota.
 * Volutamente minimale: i contenuti sono scritti da noi, non dall'utente.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const paras = text.split(/\n\s*\n/);
  return (
    <div className={className}>
      {/* un paragrafo con una formula in display non può essere un <p> (la formula è un <div>) */}
      {paras.map((p, i) =>
        p.includes('$$') ? (
          <div key={i} className="para">
            {inline(p)}
          </div>
        ) : (
          <p key={i}>{inline(p)}</p>
        ),
      )}
    </div>
  );
}

export function inline(src: string) {
  const out: React.ReactNode[] = [];
  const re = /\$\$([^$]+)\$\$|\$([^$]+)\$|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(<Fragment key={k++}>{src.slice(last, m.index)}</Fragment>);
    if (m[1] !== undefined) out.push(<Tex key={k++} tex={m[1]} display />);
    else if (m[2] !== undefined) out.push(<Tex key={k++} tex={m[2]} />);
    else out.push(<strong key={k++}>{m[3]}</strong>);
    last = re.lastIndex;
  }
  if (last < src.length) out.push(<Fragment key={k++}>{src.slice(last)}</Fragment>);
  return out;
}

export function Inline({ text }: { text: string }) {
  return <>{inline(text)}</>;
}
