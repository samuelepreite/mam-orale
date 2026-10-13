"""Esegue tutte le verifiche simboliche dei capitoli (tools/verifica/c*.py)."""
import glob, os, subprocess, sys
QUI = os.path.dirname(os.path.abspath(__file__))
rc = 0
for f in sorted(glob.glob(os.path.join(QUI, 'c[1-7]*.py'))):
    r = subprocess.run([sys.executable, f], cwd=QUI)
    rc |= r.returncode
sys.exit(rc)
