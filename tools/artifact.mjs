// Converte dist-single/index.html (npm run build:single) in dist-artifact/mam-orale.html, pubblicabile come Artifact
// e apribile anche da solo nel browser (senza sincronizzazione né Claude):
//  - in testa doctype, charset UTF-8 (le lettere accentate si leggono anche aprendo il file da disco), viewport e titolo;
//  - poi il contenuto del body; poi stili, caratteri e script inline (i moduli partono dopo il parsing).
// La pagina pubblicata dichiarerà capabilities: { db: {}, user: {}, downloads: true, sample: { images: true } }.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist-single/index.html', 'utf8');
const head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'));
const body = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
const title = (head.match(/<title>[^<]*<\/title>/) ?? ['<title>MAM I orale</title>'])[0];
const rest = head.replace(/<meta[^>]*>/g, '').replace(/<title>[^<]*<\/title>/, '');
const out = [
  '<!doctype html>',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
  title,
  body.trim(),
  rest.trim(),
  '',
].join('\n');
if (/<script[^>]+src=/.test(out)) throw new Error('script esterni nel file unico: controlla vite-plugin-singlefile');
mkdirSync('dist-artifact', { recursive: true });
writeFileSync('dist-artifact/mam-orale.html', out);
// versione da pubblicare: lo scheletro (doctype, charset, viewport) lo aggiunge la pubblicazione
writeFileSync('dist-artifact/mam-orale-pagina.html', [title, body.trim(), rest.trim(), ''].join('\n'));
console.log('dist-artifact/mam-orale.html', (Buffer.byteLength(out) / 1e6).toFixed(2), 'MB');
