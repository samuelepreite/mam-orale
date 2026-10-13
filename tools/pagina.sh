#!/usr/bin/env bash
# Rasterizza la pagina N (numerazione PDF globale 1–223) della dispensa MAM TEORIA COMPLETO.
# Uso: tools/pagina.sh N [dpi=110] [cartella=/home/claude/work/pagine]  → stampa il percorso del PNG (scala di grigi)
# Ritaglio: tools/pagina.sh N dpi cartella x y w h   (coordinate in pixel alla dpi scelta)
set -e
N=$1; DPI=${2:-110}; OUT=${3:-/home/claude/work/pagine}
U=${MAM_PDF_DIR:-/root/.claude/uploads/5bc34fb5-6ef3-5faa-a85b-b2331bdcb06f}
mkdir -p "$OUT"
for s in 1:91:544cdaf7 92:104:427cf4de 105:114:1f2b0a2d 115:140:986d96d1 141:159:ff307c0c 160:171:18d275f2 172:179:5deb16d9 180:190:d41f0508 191:202:eb103627 203:213:9b6ae860 214:219:b97ca005 220:223:27e47db4; do
  IFS=: read a b id <<<"$s"
  if [ "$N" -ge "$a" ] && [ "$N" -le "$b" ]; then
    f=$(ls "$U"/$id-*.pdf); i=$((N-a+1))
    if [ -n "$4" ]; then
      o="$OUT/p$(printf %03d $N)_${DPI}_$4_$5.png"
      pdftoppm -f $i -l $i -r $DPI -gray -x $4 -y $5 -W $6 -H $7 -png -singlefile "$f" "${o%.png}" 2>/dev/null
    else
      o="$OUT/p$(printf %03d $N)_$DPI.png"
      [ -f "$o" ] || pdftoppm -f $i -l $i -r $DPI -gray -png -singlefile "$f" "${o%.png}" 2>/dev/null
    fi
    echo "$o"; exit 0
  fi
done
echo "pagina fuori intervallo" >&2; exit 1
