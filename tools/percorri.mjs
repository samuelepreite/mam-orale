// Percorso automatico dell'app (Playwright): per ogni argomento con contenuto percorre la lezione fino alla fine,
// l'allenatore (livello 2 e 3) e una simulazione (autovalutazione guidata), in tema chiaro e scuro, su telefono e
// computer. Segnala NaN/undefined nel testo, scroll orizzontale, errori della console, passi bloccati.
// uso: node tools/percorri.mjs [file.html] [cartella screenshot]
//   default: dist-single/index.html (npm run build:single), screenshot in /home/claude/work/screen
//   IDS=c4-freno-nastro,c3-ceppi per un sottoinsieme; SOLO=computer-light per una sola combinazione
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.argv[2] ?? 'dist-single/index.html');
const out = process.argv[3] ?? '/home/claude/work/screen';
mkdirSync(out, { recursive: true });
const base = `file://${file}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const report = [];
let problemi = 0;
const SHOTS = new Set(['computer-light-lezione', 'telefono-dark-allena', 'computer-dark-orale', 'telefono-light-oggi']);

async function controlla(page, dove) {
  const r = await page.evaluate(() => {
    const t = document.body.innerText;
    const w = document.documentElement.scrollWidth > window.innerWidth + 1;
    const cul = [];
    if (w) for (const el of document.querySelectorAll('body *')) { const b = el.getBoundingClientRect(); if (b.right > window.innerWidth + 1 && cul.length < 4) cul.push(el.tagName + '.' + String(el.className).slice(0, 40) + ':' + Math.round(b.right)); }
    return { nan: /\bNaN\b/.test(t), und: /\bundefined\b/.test(t), hscroll: w, cul };
  });
  const msg = [];
  if (r.nan) msg.push('NaN nel testo');
  if (r.und) msg.push('undefined nel testo');
  if (r.hscroll) msg.push('scroll orizzontale ' + r.cul.join(' '));
  if (msg.length) {
    problemi++;
    report.push(`  ✗ ${dove}: ${msg.join('; ')}`);
  }
}

async function shot(page, key) {
  if (!SHOTS.has(key)) return;
  SHOTS.delete(key);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/${key}.png`, fullPage: false });
}

async function lezione(page, id, tag) {
  await page.goto(`${base}#/argomento/${id}/lezione`);
  await page.waitForSelector('.lesson-step');
  for (let guard = 0; guard < 500; guard++) {
    const active = page.locator('.lesson-step.active');
    const opt = active.locator('.deriv-next .option:not([disabled])');
    if (await opt.count()) { await opt.first().click(); continue; }
    const prev = active.locator('.card .option:not([disabled])');
    if (await prev.count()) { await prev.first().click(); continue; }
    const nx = active.locator('.deriv-next button:not(.option)');
    if (await nx.count()) { await nx.last().click(); continue; }
    const nav = page.locator('.lesson-nav button.primary');
    if (!(await nav.count())) break;
    const txt = (await nav.textContent()) ?? '';
    if (txt.includes('Ho finito')) { await shot(page, `${tag}-lezione`); await nav.click(); break; }
    if (await nav.isEnabled()) { await nav.click(); await page.waitForTimeout(30); continue; }
    problemi++;
    report.push(`  ✗ ${id} lezione bloccata: «${txt.trim()}»`);
    break;
  }
  const ok = await page.locator('text=Lezione completata').count();
  if (!ok) { problemi++; report.push(`  ✗ ${id}: lezione non finita`); }
  await controlla(page, `${id} lezione`);
}

async function allena(page, id, tag) {
  await page.goto(`${base}#/argomento/${id}/allena`);
  await page.waitForSelector('.trainer');
  const sel = page.locator('.trainer select');
  const nDim = (await sel.count()) ? await sel.locator('option').count() : 1;
  for (let d = 0; d < nDim; d++) {
    if (nDim > 1) await sel.selectOption({ index: d });
    await page.locator('button', { hasText: 'Livello 2' }).click();
    for (let guard = 0; guard < 200; guard++) {
      const opt = page.locator('.trainer .deriv-next .option:not([disabled])');
      if (await opt.count()) { await opt.first().click(); continue; }
      const mostra = page.locator('button', { hasText: 'Mostra il passo' });
      if (await mostra.count()) { await mostra.click(); await page.locator('button', { hasText: /^giusto$/ }).first().click(); continue; }
      const nx = page.locator('button', { hasText: /Prossimo passo|Fine della catena/ });
      if (await nx.count()) { await nx.click(); continue; }
      break;
    }
    if (!(await page.locator('text=/pass[io] giust[io] su/').count())) { problemi++; report.push(`  ✗ ${id} livello 2 (dim ${d + 1}) non finito`); }
    await shot(page, `${tag}-allena`);
    await controlla(page, `${id} livello 2`);
    await page.locator('button', { hasText: 'Livello 3' }).click();
    const canvas = page.locator('.lav-sheet canvas').first();
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 20, box.y + 20);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await page.mouse.up();
    }
    await page.locator('.conf button', { hasText: '3' }).first().click();
    await page.locator('button', { hasText: 'Confronta con la soluzione' }).click();
    await page.locator('.cmp-row button', { hasText: 'mi sono fermato qui' }).last().click();
    await page.locator('button', { hasText: 'Registra il confronto' }).click();
    await controlla(page, `${id} livello 3`);
  }
}

async function orale(page, id, tag) {
  await page.goto(`${base}#/argomento/${id}/orale`);
  await page.locator('button', { hasText: 'Inizia a rispondere' }).click();
  await page.locator('textarea').first().fill('Risposta di prova dettata: partenza, ipotesi, disegno, equazione, passaggio chiave, significato.');
  await page.locator('button', { hasText: 'Ho finito' }).click();
  const gruppi = page.locator('.voce-row .seg');
  const n = await gruppi.count();
  for (let i = 0; i < n; i++) await gruppi.nth(i).locator('button', { hasText: 'in parte' }).click();
  await page.locator('button', { hasText: 'Conferma la correzione' }).click();
  await page.locator('button', { hasText: 'Mostra le risposte attese' }).click();
  const voti = page.locator('[aria-label^="voto della domanda"]');
  for (let i = 0; i < (await voti.count()); i++) await voti.nth(i).locator('button', { hasText: 'sì' }).click();
  await page.locator('button', { hasText: /Vedi l.esito/ }).click();
  if (!(await page.locator('text=Esito della simulazione').count())) { problemi++; report.push(`  ✗ ${id}: simulazione non arrivata all'esito`); }
  await shot(page, `${tag}-orale`);
  await controlla(page, `${id} orale`);
}

for (const [dev, viewport] of [['computer', { width: 1440, height: 900 }], ['telefono', { width: 390, height: 844 }]]) {
  for (const theme of ['light', 'dark']) {
    const tag = `${dev}-${theme}`;
    const ctx = await browser.newContext({ viewport, colorScheme: theme, isMobile: dev === 'telefono', hasTouch: dev === 'telefono' });
    if (process.env.SOLO && process.env.SOLO !== tag) { await ctx.close(); continue; }
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
    const page = await ctx.newPage();
    page.setDefaultTimeout(6000);
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => m.type() === 'error' && !/fonts\.g|ERR_|net::/.test(m.text()) && errors.push(m.text()));
    await page.goto(`${base}#/argomenti`);
    await page.waitForSelector('.arg-row');
    const tutti = await page.$$eval('.arg-row', (rows) => rows.filter((r) => !r.querySelector('.st-in-preparazione')).map((r) => r.getAttribute('href').split('/').pop()));
    const ids = process.env.IDS ? tutti.filter((x) => process.env.IDS.split(',').includes(x)) : tutti;
    report.push(`${tag}: ${ids.length} argomenti con contenuto`);
    for (const p of ['#/', '#/argomenti', '#/orale', '#/progressi', '#/altro']) {
      await page.goto(`${base}${p}`);
      await page.waitForTimeout(80);
      if (p === '#/') await shot(page, `${tag}-oggi`);
      await controlla(page, `pagina ${p}`);
    }
    let fase = '';
    for (const id of ids) {
      const t0 = Date.now();
      try {
        fase = 'lezione';
        await lezione(page, id, tag);
        fase = 'allena';
        await allena(page, id, tag);
        fase = 'orale';
        await orale(page, id, tag);
        process.stderr.write(`${tag} ${id} ${((Date.now() - t0) / 1000).toFixed(1)} s\n`);
      } catch (e) {
        problemi++;
        report.push(`  ✗ ${id} (${fase}): ${String(e).split('\n').slice(0, 3).join(' ')}`);
        await page.screenshot({ path: `${out}/errore-${tag}-${id}.png`, fullPage: true }).catch(() => {});
      }
    }
    for (const p of ['#/', '#/progressi']) {
      await page.goto(`${base}${p}`);
      await page.waitForTimeout(80);
      await controlla(page, `pagina ${p} (dopo)`);
    }
    if (errors.length) {
      problemi++;
      report.push(`  ✗ errori della console: ${[...new Set(errors)].slice(0, 6).join(' | ')}`);
    }
    await ctx.close();
  }
}
await browser.close();
console.log(report.join('\n'));
console.log(problemi ? `\n${problemi} problemi` : '\nnessun problema');
process.exit(problemi ? 1 : 0);
