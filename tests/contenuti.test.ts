/** Struttura e tracciabilità dei contenuti (ARCHITETTURA §2 e §7). */
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ARGOMENTI, CONTENUTI, DIMOSTRAZIONI } from '../src/content';
import { MAPPA, dimId } from '../src/content/mappa';
import type { Fonte } from '../src/content/types';
import { inCapArg, inCapDim } from './cap';

// note sulle fonti: NOTE_FONTI.md più le note nuove dei capitoli (docs/nf/cX.md, da unire a NOTE_FONTI)
const nfText = [readFileSync('NOTE_FONTI.md', 'utf8'), ...readdirSync('docs/nf').filter((f) => f.endsWith('.md')).map((f) => readFileSync(`docs/nf/${f}`, 'utf8'))].join('\n');
const NF = new Set([...nfText.matchAll(/\|\s*(NF-\d+)\s*\|/g)].map((m) => m[1]));
const fonteOk = (f: Fonte | undefined, where: string) => {
  expect(f, `${where}: manca la fonte`).toBeTruthy();
  if (!f) return;
  if (f.tipo === 'dispensa') {
    const pp = Array.isArray(f.pag) ? f.pag : [f.pag];
    for (const p of pp) expect(p >= 1 && p <= 223, `${where}: pagina ${p} fuori dalla dispensa`).toBe(true);
  } else if (f.tipo === 'deduzione') expect(f.spiegazione.length > 5 && f.da.length > 0, `${where}: deduzione senza spiegazione`).toBe(true);
  else expect(f.nota.length > 5 && f.ref.length > 0, `${where}: fonte esterna senza nota`).toBe(true);
};

describe('mappa', () => {
  it('copre le 52 domande e le 142 dimostrazioni', () => {
    expect([...new Set(MAPPA.flatMap((a) => a.domande))].sort((a, b) => a - b)).toEqual(Array.from({ length: 52 }, (_, i) => i + 1));
    expect(MAPPA.flatMap((a) => a.dimostrazioni).sort((a, b) => a - b)).toEqual(Array.from({ length: 142 }, (_, i) => i + 1));
  });
});

describe('contenuti', () => {
  for (const [id, c] of Object.entries(CONTENUTI).filter(([k]) => inCapArg(k))) {
    const m = MAPPA.find((x) => x.id === id);
    it(`${id}: è nella mappa e copre le sue dimostrazioni`, () => {
      expect(m, `${id} non è nella mappa`).toBeTruthy();
      expect([...c.dimostrazioni].sort()).toEqual(m!.dimostrazioni.map(dimId).sort());
      for (const d of c.dimostrazioni) expect(DIMOSTRAZIONI[d], `${id}: dimostrazione ${d} non registrata`).toBeTruthy();
    });
    it(`${id}: campi completi e fonti`, () => {
      expect(c.cosaDireSubito.length).toBeGreaterThan(80);
      expect(c.sistemaIpotesi.length).toBeGreaterThan(0);
      expect(c.disegno.svg.startsWith('<svg')).toBe(true);
      expect(c.disegno.elementi.filter((e) => e.obbligatorio).length).toBeGreaterThan(1);
      fonteOk(c.disegno.fonte, `${id}.disegno`);
      fonteOk(c.equazioneDiPartenza.fonte, `${id}.equazioneDiPartenza`);
      expect(c.significato.length).toBeGreaterThan(40);
      expect(c.fraseDaRicordare.length).toBeGreaterThan(15);
      expect(c.daNonDire.length).toBeGreaterThan(1);
      expect(c.approfondimenti.length).toBeGreaterThan(1);
      expect(c.simboli.length).toBeGreaterThan(0);
      c.approfondimenti.forEach((a, i) => fonteOk(a.fonte, `${id}.approfondimenti[${i}]`));
      for (const a of c.approfondimenti) if (a.argomento) expect(MAPPA.some((x) => x.id === a.argomento), `${id}: collegamento a ${a.argomento} inesistente`).toBe(true);
      for (const n of c.nf ?? []) expect(NF.has(n), `${id}: ${n} non è in NOTE_FONTI`).toBe(true);
    });
    it(`${id}: previsioni coerenti col motore`, () => {
      for (const p of c.previsioni ?? []) {
        expect(p.corretta >= 0 && p.corretta < p.opzioni.length).toBe(true);
        if (p.verify) expect(p.verify(), `${p.id}: il motore dà un'altra risposta`).toBe(p.corretta);
      }
    });
  }
});

describe('dimostrazioni', () => {
  const ids = new Set<string>();
  for (const d of Object.values(DIMOSTRAZIONI).filter((x) => inCapDim(x.id))) {
    it(`${d.id}: passi univoci, fonti, correzioni`, () => {
      expect(d.passi.length).toBeGreaterThan(1);
      expect(d.passi.some((p) => p.chiave), `${d.id}: nessun passaggio chiave`).toBe(true);
      fonteOk(d.risultato.fonte, `${d.id}.risultato`);
      d.passi.forEach((p, i) => {
        expect(p.id.startsWith(d.id + '.'), `${p.id} deve iniziare con ${d.id}.`).toBe(true);
        expect(ids.has(p.id), `id ripetuto ${p.id}`).toBe(false);
        ids.add(p.id);
        fonteOk(p.fonte, p.id);
        expect(p.perche.length, `${p.id}: manca il perché`).toBeGreaterThan(15);
        if (p.correzione) expect(NF.has(p.correzione.nf), `${p.id}: ${p.correzione.nf} non è in NOTE_FONTI`).toBe(true);
        if (i > 0 && p.chiave) expect(p.distrattori.length, `${p.id}: un passo chiave ha almeno 2 distrattori`).toBeGreaterThanOrEqual(2);
      });
    });
  }
});

describe('verifica simbolica (tools/verifica)', () => {
  const esiti: Record<string, Record<string, string>> = {};
  for (const f of readdirSync('tests/data').filter((x) => /^verifica_.*\.json$/.test(x))) Object.assign(esiti, JSON.parse(readFileSync(`tests/data/${f}`, 'utf8')));
  for (const d of Object.values(DIMOSTRAZIONI).filter((x) => inCapDim(x.id))) {
    it(`${d.id}: ogni passo verificato in SymPy`, () => {
      const e = esiti[d.id];
      expect(e, `${d.id}: nessuna verifica simbolica`).toBeTruthy();
      expect(e.risultato, `${d.id}: risultato non verificato`).toBe('ok');
      for (const p of d.passi) {
        expect(e[p.id], `${p.id}: assente dalla verifica simbolica`).toBeTruthy();
        if (p.num) expect(e[p.id], `${p.id}: è un'uguaglianza, serve 'ok'`).toBe('ok');
      }
    });
  }
});

it('ARGOMENTI unisce mappa e contenuti', () => {
  expect(ARGOMENTI.length).toBe(MAPPA.length);
});
