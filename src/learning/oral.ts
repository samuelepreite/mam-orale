/**
 * Simulazione dell'orale (ARCHITETTURA §4): estrazione pesata della domanda, richiesta autosufficiente a Claude
 * (capability `sample`, il modello non ha memoria), lettura robusta della risposta, domande a catena.
 *
 * Estrazione (scelta didattica): peso di una formulazione = (1 − padronanza dell'argomento, almeno 0,1) ×
 * (1 + quota dei suoi passi scaduti) × (½ se l'argomento non è nella dispensa); così il peso di un argomento è
 * proporzionale al numero delle sue formulazioni. Niente ripetizioni ravvicinate: escluse le domande delle ultime 3
 * simulazioni e quelle degli ultimi 2 giorni; l'argomento dell'ultima simulazione pesa un quinto. Solo gli argomenti
 * con contenuto (gli altri non si possono correggere); un argomento senza domanda propria ha la formulazione
 * «Mi parli di …» (q = 0) con peso ½.
 */
import type { Argomento, Dimostrazione, VoceRubrica } from '../content/types';
import type { AppState } from '../storage/store';
import { CATALOGO, argDi, dimsDi, type Catalogo } from './catalogo';
import { padronanzaArgomento } from './mastery';
import { rubricaDi } from './rubrica';
import { card } from './srs';

const DAY = 86400000;
export const MAX_TRASCRIZIONE = 8000;

export interface Estratta {
  argId: string;
  q: number;
  testo: string;
}

export function formulazioniDi(a: Argomento): { q: number; testo: string }[] {
  return a.formulazioni.length ? a.formulazioni : [{ q: 0, testo: `Mi parli di: ${a.titolo.charAt(0).toLowerCase()}${a.titolo.slice(1)}.` }];
}

export function pesiEstrazione(state: AppState, now: Date = new Date(), cat: Catalogo = CATALOGO, soloArg?: string): (Estratta & { peso: number })[] {
  const recenti = [...state.simulazioni].sort((x, y) => y.at.localeCompare(x.at));
  const ultimi3 = new Set(recenti.slice(0, 3).map((s) => `${s.argId}|${s.q}`));
  const ultimi2g = new Set(recenti.filter((s) => now.getTime() - Date.parse(s.at) < 2 * DAY).map((s) => `${s.argId}|${s.q}`));
  const ultimoArg = recenti[0]?.argId;
  const out: (Estratta & { peso: number })[] = [];
  for (const a of cat.argomenti) {
    if (!a.contenuto || (soloArg && a.id !== soloArg)) continue;
    const pad = padronanzaArgomento(state, a, now, cat);
    const passi = dimsDi(cat, a).flatMap((d) => d.passi);
    const scaduti = passi.filter((p) => {
      const c = card(state, `passo:${p.id}`);
      return c && new Date(c.due) <= now;
    }).length;
    const urg = 1 + (passi.length ? scaduti / passi.length : 0);
    const base = Math.max(0.1, 1 - pad) * urg * (a.fonte === 'no' ? 0.5 : 1) * (a.id === ultimoArg && !soloArg ? 0.2 : 1);
    for (const f of formulazioniDi(a)) {
      const k = `${a.id}|${f.q}`;
      const fresca = !ultimi3.has(k) && !ultimi2g.has(k);
      out.push({ argId: a.id, q: f.q, testo: f.testo, peso: (fresca ? base : 0) * (a.formulazioni.length ? 1 : 0.5) });
    }
  }
  // se tutto è escluso (poche domande disponibili), si torna ai pesi senza esclusioni
  if (out.length && out.every((o) => o.peso === 0)) for (const o of out) o.peso = 1;
  return out;
}

export function estraiDomanda(state: AppState, rnd: () => number, now: Date = new Date(), cat: Catalogo = CATALOGO, soloArg?: string): Estratta | null {
  const pesi = pesiEstrazione(state, now, cat, soloArg);
  const tot = pesi.reduce((s, p) => s + p.peso, 0);
  if (!pesi.length || tot <= 0) return null;
  let x = rnd() * tot;
  for (const p of pesi) {
    x -= p.peso;
    if (x < 0 && p.peso > 0) return { argId: p.argId, q: p.q, testo: p.testo };
  }
  const last = [...pesi].reverse().find((p) => p.peso > 0)!;
  return { argId: last.argId, q: last.q, testo: last.testo };
}

// ------------------------------------------------------------------ approfondimenti (domande a catena)

export interface ApprofondimentoId {
  id: string;
  domanda: string;
  attesa: string;
  tipo: string;
  argomento?: string;
}
export const approfondimentiDi = (a: Argomento): ApprofondimentoId[] => (a.contenuto?.approfondimenti ?? []).map((x, i) => ({ id: `a${i + 1}`, domanda: x.domanda, attesa: x.attesa, tipo: x.tipo, argomento: x.argomento }));

/** 1–2 domande a catena scelte tra gli approfondimenti curati (un approfondimento e un collegamento, se ci sono). */
export function scegliCatena(a: Argomento, rnd: () => number, n = 2): ApprofondimentoId[] {
  const all = approfondimentiDi(a);
  const pick = (xs: ApprofondimentoId[]) => (xs.length ? xs[Math.floor(rnd() * xs.length) % xs.length] : undefined);
  const first = pick(all.filter((x) => x.tipo === 'approfondimento')) ?? pick(all);
  const rest = all.filter((x) => x !== first);
  const second = pick(rest.filter((x) => x.tipo !== first?.tipo)) ?? pick(rest);
  return [first, second].filter((x): x is ApprofondimentoId => !!x).slice(0, n);
}

// ------------------------------------------------------------------ richiesta a Claude

const fonteBreve = (f: { tipo: string; pag?: number | [number, number]; da?: string; ref?: string }) =>
  f.tipo === 'dispensa' ? `D p. ${Array.isArray(f.pag) ? `${f.pag[0]}–${f.pag[1]}` : f.pag}` : f.tipo === 'deduzione' ? `deduzione da ${f.da}` : `fonte esterna: ${f.ref}`;

function catenaTesto(d: Dimostrazione): string {
  const righe = d.passi.map((p) => `  [${p.id}] (${fonteBreve(p.fonte)})${p.chiave ? ' [PASSAGGIO CHIAVE]' : ''}${p.aggiunto ? ' [aggiunto: sottinteso nella dispensa]' : ''}  ${p.latex}`);
  return [`${d.id} — ${d.titolo}`, `  Enunciato: ${d.enunciato}`, `  Ipotesi: ${d.ipotesi.join('; ')}`, ...righe, `  Risultato: ${d.risultato.latex} (${fonteBreve(d.risultato.fonte)})`].join('\n');
}

export interface RichiestaOpts {
  /** c'è un'immagine della lavagna allegata */
  immagine?: boolean;
  durataS?: number;
}

/** L'unica richiesta autosufficiente per la correzione (stringa per `sample.json`). */
export function costruisciRichiesta(a: Argomento, domanda: string, trascrizione: string, opts: RichiestaOpts = {}, cat: Catalogo = CATALOGO): string {
  const c = a.contenuto;
  if (!c) throw new Error('Argomento senza contenuto');
  const rub = rubricaDi(a, cat);
  const dims = dimsDi(cat, a);
  const nf = dims.flatMap((d) => d.passi.filter((p) => p.correzione).map((p) => `- ${p.correzione!.nf} al passo ${p.id}: la dispensa scrive «${p.correzione!.dispensaScrive}»; la riga corretta è «${p.latex}».`));
  const testo = trascrizione.trim().slice(0, MAX_TRASCRIZIONE);
  const ids = rub.map((v) => `"${v.id}"`).join(', ');
  return [
    'Sei il professore di Meccanica Applicata alle Macchine I e stai interrogando uno studente all\'esame orale.',
    'Valuti la sua risposta SOLO contro la rubrica e la catena di dimostrazione qui sotto, che vengono dalla dispensa del corso (pagine indicate come «D p.»). Non usare altre fonti e non introdurre richieste che non sono qui.',
    'Scrivi in italiano. Non dare un voto in trentesimi: dai i punti per voce come richiesto. La correzione è un aiuto allo studio, non un voto d\'esame.',
    '',
    `DOMANDA DEL PROFESSORE: «${domanda}»`,
    `ARGOMENTO: ${a.titolo} (capitolo ${a.cap}, dispensa pp. ${a.pagine})`,
    '',
    'RUBRICA (per ogni voce: id, che cosa deve comparire nella risposta, peso):',
    ...rub.map((v) => `- [${v.id}] ${v.testo} (peso ${v.peso}). Attese: ${v.attese.join(' | ')}`),
    '',
    'CATENA CORRETTA DELLA DIMOSTRAZIONE (righe in LaTeX, con la fonte):',
    ...dims.map(catenaTesto),
    '',
    'DA NON DIRE (se lo studente dice una di queste cose, riportala in daNonDireDetti copiando il testo della frase come è scritto qui):',
    ...c.daNonDire.map((d) => `- «${d.frase}» — perché: ${d.perche}`),
    '',
    'ERRORI NOTI DELLA DISPENSA (note NF): se lo studente segue la riga della dispensa invece di quella corretta NON va penalizzato; segnalalo nel commento.',
    ...(nf.length ? nf : ['- nessuno per questo argomento.']),
    '',
    'APPROFONDIMENTI CURATI (domande a catena tra cui scegliere, con la risposta attesa):',
    ...approfondimentiDi(a).map((x) => `- [${x.id}] ${x.domanda} — attesa: ${x.attesa}`),
    '',
    opts.durataS ? `Durata della risposta: circa ${Math.round(opts.durataS)} secondi.` : '',
    'TRASCRIZIONE DELLA RISPOSTA (spesso dettata a voce: può contenere errori del riconoscimento vocale e formule dette a parole, interpretale con buon senso):',
    '"""',
    testo || '(nessun testo: lo studente ha risposto solo a voce o solo alla lavagna)',
    '"""',
    opts.immagine ? 'IMMAGINE ALLEGATA: è la lavagna dello studente. Usala per la voce «disegno» (elementi obbligatori) e per le formule scritte.' : 'Nessuna immagine della lavagna.',
    '',
    'Rispondi SOLO con un oggetto JSON, senza altro testo, di questa forma:',
    '{"voci":[{"id":"partenza","punti":1,"motivo":"..."}],"daNonDireDetti":[],"passoMancante":null,"commento":"...","domandeACatena":[{"id":"a1","domanda":"..."}]}',
    `Regole: una voce per ciascuno di questi id: ${ids}; "punti" vale solo 0, 0.5 o 1; "motivo" è una frase breve; "passoMancante" è l'id del primo passo della catena che lo studente salta o sbaglia (per esempio "${dims[0]?.passi[0]?.id ?? 'd000.1'}") oppure null; "commento" sono 2–4 frasi rivolte allo studente con la cosa più importante da sistemare; "domandeACatena" sono 1 o 2 domande da fare subito dopo, preferibilmente tra gli approfondimenti curati (con il loro id), altrimenti con id null e una domanda che resta dentro la dispensa.`,
  ]
    .filter((x) => x !== '')
    .join('\n');
}

/** Seconda chiamata facoltativa: valutazione delle risposte alle domande a catena. */
export function costruisciRichiestaCatena(a: Argomento, domanda: string, items: { domanda: string; attesa?: string; risposta: string }[]): string {
  return [
    'Sei il professore di Meccanica Applicata alle Macchine I all\'esame orale. Dopo la domanda principale hai fatto delle domande a catena.',
    'Valuta ogni risposta SOLO contro la risposta attesa indicata (che viene dalla dispensa del corso); se l\'attesa manca, resta dentro gli argomenti della dispensa. Italiano, niente voto in trentesimi.',
    `Argomento: ${a.titolo}. Domanda principale: «${domanda}».`,
    '',
    ...items.flatMap((x, i) => [`[${i}] Domanda: ${x.domanda}`, `    Attesa: ${x.attesa ?? '(non indicata)'}`, `    Risposta dello studente: """${x.risposta.trim().slice(0, 3000) || '(nessuna risposta)'}"""`]),
    '',
    'Rispondi SOLO con un oggetto JSON: {"valutazioni":[{"indice":0,"voto":1,"commento":"..."}]} — una valutazione per domanda, "voto" vale 0, 0.5 o 1, "commento" una o due frasi.',
  ].join('\n');
}

// ------------------------------------------------------------------ lettura robusta delle risposte

export type Punti = 0 | 0.5 | 1;
export interface Valutazione {
  voci: Record<string, { punti: Punti; motivo: string }>;
  /** voci della rubrica che la risposta non ha valutato (vanno autovalutate) */
  mancanti: string[];
  daNonDireDetti: string[];
  passoMancante: string | null;
  commento: string;
  domandeACatena: { id: string | null; domanda: string }[];
}
export type Esito<T> = { ok: true; v: T } | { ok: false; errore: string };

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[«»"'“”.,;:!?()]/g, ' ').replace(/\s+/g, ' ').trim();
const str = (x: unknown, max = 1200) => (typeof x === 'string' ? x.trim().slice(0, max) : typeof x === 'number' ? String(x) : '');

export function puntiDa(x: unknown): Punti | null {
  let n: number;
  if (typeof x === 'number') n = x;
  else if (typeof x === 'string') {
    const t = x.trim().replace(',', '.');
    if (t === '½') n = 0.5;
    else n = parseFloat(t);
  } else if (typeof x === 'boolean') n = x ? 1 : 0;
  else return null;
  if (!Number.isFinite(n)) return null;
  if (n > 1 && n <= 100) n = n / (n > 10 ? 100 : 10); // 7/10, 70 (%): portati a 0–1
  n = Math.max(0, Math.min(1, n));
  return n < 0.25 ? 0 : n < 0.75 ? 0.5 : 1;
}

/** accetta un oggetto, una stringa JSON o una stringa con un JSON dentro */
export function comeOggetto(raw: unknown): Record<string, unknown> | null {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw as Record<string, unknown>;
  if (typeof raw !== 'string') return null;
  const tryParse = (t: string) => {
    try {
      const v = JSON.parse(t);
      return v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  };
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const i = raw.indexOf('{');
  const j = raw.lastIndexOf('}');
  return tryParse(raw) ?? (fence ? tryParse(fence[1]) : null) ?? (i >= 0 && j > i ? tryParse(raw.slice(i, j + 1)) : null);
}

export function leggiValutazione(raw: unknown, a: Argomento, cat: Catalogo = CATALOGO, rub: VoceRubrica[] = rubricaDi(a, cat)): Esito<Valutazione> {
  const o = comeOggetto(raw);
  if (!o) return { ok: false, errore: 'La risposta di Claude non è un oggetto JSON leggibile.' };
  const ids = new Set(rub.map((v) => v.id));
  const voci: Valutazione['voci'] = {};
  const put = (id: unknown, p: unknown, motivo: unknown) => {
    const k = str(id, 80);
    const pt = puntiDa(p);
    if (!ids.has(k) || pt === null || voci[k]) return;
    voci[k] = { punti: pt, motivo: str(motivo, 600) };
  };
  if (Array.isArray(o.voci)) {
    for (const v of o.voci) {
      if (!v || typeof v !== 'object') continue;
      const r = v as Record<string, unknown>;
      put(r.id, r.punti, r.motivo);
    }
  } else if (o.voci && typeof o.voci === 'object') {
    for (const [k, v] of Object.entries(o.voci as Record<string, unknown>)) {
      if (v && typeof v === 'object') put(k, (v as Record<string, unknown>).punti, (v as Record<string, unknown>).motivo);
      else put(k, v, '');
    }
  }
  if (!Object.keys(voci).length) return { ok: false, errore: 'La risposta di Claude non contiene voci della rubrica riconoscibili.' };

  const frasi = a.contenuto?.daNonDire.map((d) => d.frase) ?? [];
  const dnd = new Set<string>();
  for (const x of Array.isArray(o.daNonDireDetti) ? o.daNonDireDetti : []) {
    const s = str(x, 300);
    if (!s) continue;
    const ns = norm(s);
    const canon = frasi.find((f) => {
      const nf = norm(f);
      return nf === ns || nf.includes(ns) || ns.includes(nf);
    });
    dnd.add(canon ?? s);
    if (dnd.size >= 10) break;
  }

  const passi = new Set(dimsDi(cat, a).flatMap((d) => d.passi.map((p) => p.id)));
  let passoMancante: string | null = null;
  const pm = str(o.passoMancante, 300);
  if (pm && !/^(null|nessuno|none|-)$/i.test(pm)) {
    const m = pm.match(/d\d{3}\.\d+/);
    passoMancante = m && passi.has(m[0]) ? m[0] : pm;
  }

  const appr = new Set(approfondimentiDi(a).map((x) => x.id));
  const domande: Valutazione['domandeACatena'] = [];
  for (const x of Array.isArray(o.domandeACatena) ? o.domandeACatena : []) {
    if (domande.length >= 2) break;
    if (typeof x === 'string') {
      if (x.trim()) domande.push({ id: null, domanda: x.trim().slice(0, 600) });
      continue;
    }
    if (!x || typeof x !== 'object') continue;
    const r = x as Record<string, unknown>;
    const d = str(r.domanda, 600);
    const id = str(r.id, 20);
    if (d) domande.push({ id: appr.has(id) ? id : null, domanda: d });
  }

  return {
    ok: true,
    v: { voci, mancanti: rub.map((v) => v.id).filter((id) => !voci[id]), daNonDireDetti: [...dnd], passoMancante, commento: str(o.commento, 2000), domandeACatena: domande },
  };
}

export function leggiCatena(raw: unknown, n: number): Esito<({ voto: Punti; commento: string } | null)[]> {
  const o = comeOggetto(raw);
  const lista = o && Array.isArray(o.valutazioni) ? o.valutazioni : Array.isArray(raw) ? raw : null;
  if (!lista) return { ok: false, errore: 'La risposta di Claude non contiene valutazioni leggibili.' };
  const out: ({ voto: Punti; commento: string } | null)[] = Array.from({ length: n }, () => null);
  lista.forEach((x: unknown, k: number) => {
    if (!x || typeof x !== 'object') return;
    const r = x as Record<string, unknown>;
    const i = r.indice !== undefined ? Math.round(Number(r.indice)) : k;
    const v = puntiDa(r.voto);
    if (Number.isInteger(i) && i >= 0 && i < n && v !== null && !out[i]) out[i] = { voto: v, commento: str(r.commento, 600) };
  });
  if (out.every((x) => x === null)) return { ok: false, errore: 'Nessuna valutazione valida nella risposta di Claude.' };
  return { ok: true, v: out };
}

/** Messaggio per lo studente a partire dal codice d'errore di `sample` (si decide sul codice, mai sul messaggio). */
export function messaggioErroreClaude(code: string | undefined): { testo: string; nascondi: boolean } {
  switch (code) {
    case 'not_granted':
      return { testo: 'Non hai consentito a questa pagina di usare Claude: correggi con l\'autovalutazione guidata.', nascondi: true };
    case 'sampling_disabled':
    case 'not_declared':
    case 'capability_disabled':
    case 'capability_removed':
      return { testo: 'Claude non è disponibile qui: correggi con l\'autovalutazione guidata.', nascondi: true };
    case 'rate_limited':
      return { testo: 'Hai fatto troppe richieste a Claude o hai raggiunto il limite del tuo piano: riprova più tardi, intanto usa l\'autovalutazione.', nascondi: false };
    case 'session_expired':
      return { testo: 'La sessione di claude.ai è scaduta: accedi di nuovo e riprova, oppure usa l\'autovalutazione.', nascondi: false };
    case 'images_unavailable':
    case 'image_rejected':
      return { testo: 'L\'immagine della lavagna non si può inviare: riprova senza lavagna o con l\'autovalutazione.', nascondi: false };
    case 'invalid_json':
      return { testo: 'Claude ha risposto in un formato che l\'app non sa leggere: riprova oppure usa l\'autovalutazione.', nascondi: false };
    case 'prompt_too_large':
      return { testo: 'La risposta è troppo lunga da inviare: accorciala oppure usa l\'autovalutazione.', nascondi: false };
    case 'refused':
      return { testo: 'Claude non ha voluto valutare questa risposta: usa l\'autovalutazione.', nascondi: false };
    case 'cancelled':
      return { testo: 'Correzione annullata.', nascondi: false };
    default:
      return { testo: 'Correzione con Claude non riuscita (problema di connessione o del servizio): riprova più tardi o usa l\'autovalutazione.', nascondi: false };
  }
}

export { argDi };
