"""Argomenti d'orale di MAM I: raggruppamento delle 52 domande, mappa verso le 142 dimostrazioni e le pagine PDF
della dispensa. Fonte delle pagine reali: tools/testi/cap*_riscontro.md (riscontro pagina per pagina).

Uso: python3 tools/analisi/argomenti.py   → scrive tools/analisi/argomenti.json e tools/analisi/mappa.md
"""
import json, os, re

QUI = os.path.dirname(os.path.abspath(__file__))

CAPITOLI = [
    ("C1", "Cinematica e dinamica dei meccanismi piani", "5–66", "cap1a.md, cap1b.md"),
    ("C2", "Attrito e aderenza", "67–102", "cap2.md"),
    ("C3", "Freni e frizioni", "103–128", "cap3.md"),
    ("C4", "Trasmissioni a cinghia (flessibili)", "129–154", "cap4.md"),
    ("C5", "Ingranaggi e rotismi", "155–192", "cap5a.md, cap5b.md"),
    ("C6", "Accoppiamento motore–carico", "193–206", "cap6.md"),
    ("C7", "Meccanica delle vibrazioni", "207–223", "cap7.md"),
]

# Titoli brevi delle 52 domande (dall'indice di MAM_Orale_52_domande).
DOMANDE = {
    1: "Glifo oscillante: perché una corsa è più veloce dell'altra", 2: "Meccanismi: analisi delle velocità",
    3: "Manovellismo di spinta: attrito e punti morti", 4: "Vibrazioni forzate", 5: "Vibrazioni libere non smorzate",
    6: "Vibrazioni libere smorzate", 7: "Massa eccentrica rotante", 8: "Accoppiamento motore–utilizzatore diretto",
    9: "Accoppiamento M–U con trasmissione", 10: "Accoppiamento M–U con trasmissione e frizione",
    11: "Freno a nastro", 12: "Freno a pattino", 13: "Frizione piana", 14: "Rotismi ordinari",
    15: "Velocità ottima della cinghia", 16: "Riduttore di coppia", 17: "Differenziale automobilistico",
    18: "Attrito perno–boccola", 19: "Equazione di Eulero per la cinghia", 20: "Dinamica del veicolo: accelerazione massima",
    21: "Complex replacement", 22: "Ruote dentate: principio, evolvente, rapporto", 23: "Denti in presa: ruote elicoidali",
    24: "Denti in presa: ruote a denti dritti", 25: "Forze tra ruote dentate senza e con attrito",
    26: "Numero minimo di denti: ruote elicoidali", 27: "Forze scambiate: ruote elicoidali", 28: "Forze scambiate: ruote coniche",
    29: "Rotismi epicicloidali", 30: "Epicicloidali: velocità del satellite attorno al proprio asse",
    31: "Manovellismo di spinta: nomi delle aste e CIR", 32: "Attrito: descrizione, attrito radente e aderenza",
    33: "Attrito: ribaltamento", 34: "Attrito: impuntamento", 35: "Attrito volvente", 36: "Cuscinetti volventi",
    37: "Freni: ipotesi di Reye–Archard", 38: "Freno a pattino: accostamento rigido e libero",
    39: "Freno a ceppi: ceppo avvolgente e svolgente", 40: "Freni a disco", 41: "Partitore di frenata",
    42: "Frizioni coniche", 43: "Frizioni centrifughe", 44: "Cinghie: τ ideale e τ effettivo",
    45: "Cinghie: legge di variazione della tensione", 46: "Potenza e velocità ottima della cinghia",
    47: "Denti in presa: elicoidali (bis)", 48: "Interferenza: denti dritti", 49: "Oscillazione di vincolo",
    50: "Trasmissibilità", 51: "Rendimento di un rotismo ordinario", 52: "Rendimento di un rotismo epicicloidale",
}

# fonte: "sì" = la dispensa sviluppa l'argomento; "parziale" = parte chiesta assente; "no" = assente dalla dispensa.
# compl = argomento di complemento (nessuna delle 52 domande, ma dimostrazioni ricavabili dalla dispensa).
A = [
 # id, cap, titolo, domande, dimostrazioni, pagine PDF, fonte, nota, prerequisiti, collegamenti
 ("c1-cinematica-punto","C1","Cinematica del punto: velocità e accelerazione",[],[1,2,3],"5–9","parziale",
  "Coordinate polari (d001, d003) assenti: la dispensa usa il versore tangente.",[],["c1-velocita"],True),
 ("c1-velocita","C1","Corpo rigido: formula fondamentale, accelerazioni e CIR",[2],[4,5,6,7],"10–18, 21–23, 39–40","sì",
  "CIR all'infinito per la traslazione non scritto; accelerazione del CIR a pp. 39–40.",[],["c1-manovellismo","c1-moto-relativo","c5-ruote-dentate"],False),
 ("c1-manovellismo","C1","Manovellismo di spinta: cinematica, CIR, punti morti",[3,31],[10,11,12,13],"25–27, 30–32, 47–49","parziale",
  "Attrito nella coppia prismatica assente; derivata esatta di x(θ) non fatta (solo legge approssimata).",["c1-velocita"],["c1-statica-dinamica","c2-attrito"],False),
 ("c1-glifo","C1","Glifo oscillante: rapido ritorno e forze vive",[1],[8,9],"64–65","parziale",
  "Nella dispensa il glifo (6 membri) è solo l'esempio delle forze vive; il rapido ritorno non è dimostrato.",["c1-velocita","c1-statica-dinamica"],["c1-manovellismo"],False),
 ("c1-moto-relativo","C1","Moto relativo e accelerazione di Coriolis (pistone oleodinamico)",[],[14,15],"33–39","sì","",["c1-velocita"],["c1-manovellismo"],True),
 ("c1-cinematica-analitica","C1","Cinematica analitica con i numeri complessi",[],[16],"40–44","sì",
  "Da non confondere con il complex replacement delle vibrazioni (NF-43).",["c1-velocita"],["c7-complex"],True),
 ("c1-statica-dinamica","C1","Statica e dinamica dei meccanismi: equazioni cardinali, forze d'inerzia, forze vive",[],[17,18,19,20,21,22,23],"45–66","sì",
  "D'Alembert usato ma non nominato; forze vive enunciate in forma di potenza, non dimostrate.",["c1-velocita"],["c1-glifo","c6-diretto"],True),

 ("c2-attrito","C2","Attrito radente e aderenza, cono d'aderenza",[32],[24],"67–79","sì",
  "Leggi di Coulomb e microgiunzioni (q32) assenti.",[],["c2-perno","c2-impuntamento","c4-eulero"],False),
 ("c2-ribaltamento","C2","Ribaltamento (blocco e veicolo in curva)",[33],[27,34],"68, 94–95, 102","parziale",
  "Ribaltamento del blocco assente; presente quello del veicolo in curva.",["c2-attrito"],["c2-veicolo"],False),
 ("c2-impuntamento","C2","Impuntamento del corsoio",[34],[26],"79–81","sì","Solo trattazione analitica (Q = F/(1−2e f/h)).",["c2-attrito"],["c1-manovellismo"],False),
 ("c2-perno","C2","Attrito perno–boccola e cerchio d'attrito",[18],[25],"81–83","sì","r* = R sin φ; ρ ≈ μR non è nella dispensa.",["c2-attrito"],["c3-ceppi"],False),
 ("c2-volvente","C2","Attrito volvente",[35],[28],"83–88","sì","",["c2-attrito"],["c2-cuscinetti"],False),
 ("c2-cuscinetti","C2","Cuscinetti volventi: cinematica, carico, attrito",[36],[36,37],"88, 97–99","sì","§2.4 della dispensa mancante: pagine manoscritte.",["c2-volvente","c1-velocita"],[],False),
 ("c2-veicolo","C2","Dinamica del veicolo: accelerazione e decelerazione massima, curva",[20],[29,30,31,32,33,35,136],"89–96, 100–102","sì",
  "Errore a p. 91 (trazione posteriore), corretto a p. 101 (NF-16).",["c2-attrito","c1-statica-dinamica"],["c3-partitore","c2-ribaltamento"],False),

 ("c3-reye","C3","Ipotesi di Reye–Archard e distribuzione di pressione",[37],[40,41],"108–109, 114, 116","sì","",["c2-attrito"],["c3-ceppi","c3-pattino","c3-disco","c3-frizione-piana"],False),
 ("c3-ceppi","C3","Freno a ceppi: risultanti, ceppo avvolgente e svolgente",[39],[38,39,42,43,142],"103, 106–113, 123","sì",
  "Nomi avvolgente/svolgente invertiti nella dispensa per i ceppi esterni (NF-18).",["c3-reye","c2-perno"],["c3-pattino"],False),
 ("c3-pattino","C3","Freno a pattino: accostamento rigido e libero",[12,38],[44,45,46,50],"114–115, 124–125","sì","Il pattino frena un nastro traslante.",["c3-reye"],["c3-ceppi","c2-impuntamento"],False),
 ("c3-disco","C3","Freni a disco",[40],[47,48,49],"116, 126–128","sì","Pressione uniforme (d047) assente.",["c3-reye"],["c3-frizione-piana"],False),
 ("c3-frizione-piana","C3","Frizione piana (usura uniforme e pressione uniforme)",[13],[52],"116, 117–120","parziale","Ipotesi di pressione uniforme assente.",["c3-reye","c3-disco"],["c3-frizione-conica","c6-frizione"],False),
 ("c3-frizione-conica","C3","Frizioni coniche",[42],[53],"121–122","sì","Formula (5.88) diversa da q42/d053 (NF-19).",["c3-frizione-piana"],[],False),
 ("c3-frizione-centrifuga","C3","Frizioni centrifughe",[43],[54],"—","no","Assente dalla dispensa.",["c3-frizione-piana"],[],False),
 ("c3-partitore","C3","Partitore di frenata",[41],[51],"(92, 101 per a_max)","no","Assente; collegato alla decelerazione massima del cap. 2.",["c2-veicolo"],[],False),

 ("c4-rapporto","C4","Cinghia: rapporto ideale ed effettivo, scorrimento elastico, rendimento",[44],[55,56,58,59,60,61,137],"131–139","sì","d137 (geometria dell'avvolgimento) assente.",[],["c4-eulero"],False),
 ("c4-eulero","C4","Equazione di Eulero, legge della tensione, arco di scorrimento, coppia massima",[19,45],[57,62,63,64,65,66,67],"140–147, 150–151","sì",
  "Casi di θ* sbagliati a pp. 142, 146 (NF-20).",["c2-attrito","c4-rapporto"],["c4-velocita-ottima","c4-freno-nastro"],False),
 ("c4-velocita-ottima","C4","Potenza trasmessa e velocità ottima",[15,46],[68,69,70],"143, 152, 154","sì",
  "Dispensa: T2 fissato (V = √(T2/3ρ)); domande: T1 fissato (Tc = Tmax/3) (NF-22).",["c4-eulero"],[],False),
 ("c4-freno-nastro","C4","Freno a nastro",[11],[71],"153","sì","Errore nel verso antiorario (NF-21).",["c4-eulero"],["c3-ceppi"],False),

 ("c5-ruote-dentate","C5","Ruote dentate: legge dell'ingranamento, evolvente, rapporto",[22],[72,73,74,75,76,77,78],"156–166","sì","",["c1-velocita"],["c5-denti-presa","c5-forze-dritti"],False),
 ("c5-denti-presa","C5","Denti in presa: ruote a denti dritti",[24],[79,80,138],"166","sì","Passo di base mai definito.",["c5-ruote-dentate"],["c5-interferenza","c5-elicoidali-presa"],False),
 ("c5-interferenza","C5","Interferenza e numero minimo di denti (denti dritti)",[48],[81,82],"165, 167–168","sì","Errori a p. 168 (sin θ per sin²θ) (NF-23).",["c5-denti-presa"],["c5-elicoidali-zmin"],False),
 ("c5-forze-dritti","C5","Forze tra denti dritti con e senza attrito, rendimento istantaneo",[25],[83,84,85,86],"162, 169–170","sì","",["c5-ruote-dentate","c2-attrito"],["c5-rendimento-ordinario"],False),
 ("c5-rotismi-ordinari","C5","Rotismi ordinari: rapporto globale, ruota oziosa, coppie",[14],[87,88],"171–173","sì","Segni delle coppie sbagliati a pp. 172–173 (NF-24).",["c5-ruote-dentate"],["c5-epicicloidali","c5-rendimento-ordinario"],False),
 ("c5-rendimento-ordinario","C5","Rendimento dell'ingranaggio e del rotismo ordinario; riduttore di coppia",[16,51],[92,140],"180–184, 201","sì","",["c5-rotismi-ordinari"],["c5-rendimento-epi","c6-trasmissione"],False),
 ("c5-epicicloidali","C5","Rotismi epicicloidali: Willis, velocità del satellite, coppie, rotismo combinato",[29,30],[89,90,91,94],"174–175, 179–180","sì","",["c5-rotismi-ordinari","c1-velocita"],["c5-differenziale","c5-rendimento-epi"],False),
 ("c5-differenziale","C5","Differenziale automobilistico",[17],[141],"176–178","sì","",["c5-epicicloidali"],["c2-veicolo"],False),
 ("c5-rendimento-epi","C5","Rendimento di un rotismo epicicloidale",[52],[93],"—","no","Assente dalla dispensa.",["c5-rendimento-ordinario","c5-epicicloidali"],[],False),
 ("c5-elicoidali-presa","C5","Ruote elicoidali: geometria e denti in presa",[23,47],[95,139],"185–187","sì","Conflitto α/β per l'angolo d'elica (NF-11).",["c5-denti-presa"],["c5-elicoidali-zmin","c5-elicoidali-forze"],False),
 ("c5-elicoidali-zmin","C5","Ruote elicoidali: ruota fittizia e numero minimo di denti",[26],[96,97],"187–188","sì","",["c5-interferenza","c5-elicoidali-presa"],[],False),
 ("c5-elicoidali-forze","C5","Ruote elicoidali: forze scambiate",[27],[98],"186, 189","sì","",["c5-forze-dritti","c5-elicoidali-presa"],["c5-coniche"],False),
 ("c5-coniche","C5","Ruote coniche: rapporto e forze",[28],[99,100],"190–191","sì","",["c5-forze-dritti"],["c5-differenziale"],False),

 ("c6-diretto","C6","Accoppiamento diretto: equazione, regime, stabilità, transitorio",[8],[101,102,103,104],"193–200","sì","",["c1-statica-dinamica"],["c6-trasmissione"],False),
 ("c6-trasmissione","C6","Accoppiamento con trasmissione: grandezze ridotte, rendimento",[9],[105,106,107],"196, 201","sì","d107 assente e impostata male (NF-29).",["c6-diretto","c5-rendimento-ordinario"],["c6-frizione"],False),
 ("c6-frizione","C6","Accoppiamento con frizione: slittamento, sincronizzazione, energia",[10],[108,109,110],"117–119, 202–206","parziale",
  "Energia dissipata solo nel libro (5.82–5.83); t_Q non in forma chiusa (NF-30, NF-38).",["c6-trasmissione","c3-frizione-piana"],[],False),

 ("c7-libere","C7","Vibrazioni libere non smorzate",[5],[111,112,113,114],"208–210","sì","Solo condizioni iniziali con velocità nulla.",[],["c7-smorzate"],False),
 ("c7-smorzate","C7","Vibrazioni libere smorzate",[6],[115,116,117,118,119,120,121],"211–213","sì","Errori su radici e caso critico (NF-31, NF-32).",["c7-libere"],["c7-forzate"],False),
 ("c7-complex","C7","Complex replacement",[21],[123],"214–215, 217","sì","Dispensa: forzante in seno, parte immaginaria (NF-12).",["c7-libere"],["c7-forzate","c1-cinematica-analitica"],False),
 ("c7-forzate","C7","Vibrazioni forzate: amplificazione, risonanza, fase, FRF",[4],[122,124,125,126,127,128],"214–218","sì","",["c7-smorzate","c7-complex"],["c7-eccentrica","c7-vincolo"],False),
 ("c7-eccentrica","C7","Massa eccentrica rotante",[7],[134,135],"223","sì","",["c7-forzate"],["c7-trasmissibilita"],False),
 ("c7-vincolo","C7","Oscillazione (eccitazione) di vincolo",[49],[129,131],"219–221","sì","",["c7-forzate"],["c7-trasmissibilita"],False),
 ("c7-trasmissibilita","C7","Trasmissibilità e isolamento",[50],[130,132,133],"220–222","sì","Refusi e zone etichettate male (NF-33).",["c7-vincolo"],[],False),
]

def carica_dims():
    p = os.path.join(QUI, 'dimostrazioni_riscontro.json')
    return {int(k): v for k, v in json.load(open(p)).items()} if os.path.exists(p) else {}

def pagine_sbagliate(d):
    """True se la prima pagina reale non cade nell'intervallo dichiarato."""
    dich = [int(x) for x in re.findall(r'\d+', d['dich'])]
    reali = [int(x) for x in re.findall(r'\b(\d{1,3})\b', d['reali'].split('(')[0]) if 1 <= int(x) <= 223]
    if not dich or not reali: return None
    lo, hi = dich[0], dich[-1]
    return not any(lo <= r <= hi for r in reali)

def main():
    dims = carica_dims()
    tutte_q = sorted(q for a in A for q in a[3]); tutte_d = sorted(d for a in A for d in a[4])
    assert tutte_q == list(range(1, 53)), "ogni domanda in un solo argomento"
    assert tutte_d == list(range(1, 143)), set(range(1, 143)) ^ set(tutte_d)
    ids = {a[0] for a in A}
    for a in A:
        for x in a[8] + a[9]: assert x in ids, (a[0], x)
    out = []
    for a in A:
        out.append(dict(id=a[0], cap=a[1], titolo=a[2], domande=a[3], dimostrazioni=a[4], pagine=a[5], fonte=a[6],
                        nota=a[7], prerequisiti=a[8], collegamenti=a[9], complemento=a[10], peso=len(a[3])))
    json.dump(dict(capitoli=[dict(id=c[0], titolo=c[1], pagine=c[2], trascrizione=c[3]) for c in CAPITOLI],
                   domande=DOMANDE, argomenti=out), open(os.path.join(QUI, 'argomenti.json'), 'w'), ensure_ascii=False, indent=1)

    L = []
    core = [a for a in out if not a['complemento']]
    L.append(f"Argomenti d'orale: **{len(core)}** (dalle 52 domande) + **{len(out)-len(core)}** di complemento (solo dimostrazioni). "
             f"Argomenti chiesti con due formulazioni: {sum(1 for a in core if a['peso'] > 1)}.\n")
    for c in CAPITOLI:
        L.append(f"\n### {c[0]} · {c[1]} (PDF pp. {c[2]})\n")
        L.append("| Argomento | Domande | Dimostrazioni | Pagine PDF | Nella dispensa | Prerequisiti |")
        L.append("|---|---|---|---|---|---|")
        for a in out:
            if a['cap'] != c[0]: continue
            q = ", ".join(f"q{n:02d}" for n in a['domande']) or "— (complemento)"
            d = ", ".join(f"d{n:03d}" for n in a['dimostrazioni'])
            fonte = a['fonte'] + (f" — {a['nota']}" if a['nota'] else "")
            L.append(f"| `{a['id']}` {a['titolo']} | {q} | {d} | {a['pagine']} | {fonte} | {', '.join(a['prerequisiti']) or '—'} |")
    # stato dimostrazioni
    if dims:
        from collections import Counter
        cnt = Counter()
        for n, d in dims.items():
            p = d['pres'].lower()
            cnt['no' if p.startswith('no') else 'parziale' if p.startswith('parz') else 'sì'] += 1
        wrong = [n for n, d in dims.items() if pagine_sbagliate(d)]
        diverge = [n for n, d in dims.items() if d['coincide'].lower().startswith(('no', 'la fonte'))]
        L.append(f"\n### Le 142 dimostrazioni contro la dispensa\n")
        L.append(f"- presenti: **{cnt['sì']}**, parziali: **{cnt['parziale']}**, assenti: **{cnt['no']}** "
                 f"({', '.join('d%03d' % n for n in sorted(n for n,d in dims.items() if d['pres'].lower().startswith('no')))});")
        L.append(f"- pagine dichiarate che non contengono la dimostrazione: **{len(wrong)}** su 142 (la tabella vera è in "
                 f"`tools/testi/cap*_riscontro.md`, colonna «pagine reali»);")
        L.append(f"- risultato diverso dalla dispensa (convenzione, ipotesi o formula): "
                 f"{', '.join('d%03d' % n for n in sorted(diverge))}.")
    open(os.path.join(QUI, 'mappa.md'), 'w').write("\n".join(L) + "\n")
    print("\n".join(L[:2])); print(len(out), 'argomenti')

if __name__ == '__main__':
    main()
