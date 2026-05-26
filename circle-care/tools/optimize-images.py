#!/usr/bin/env python3
"""
Optymalizacja grafik pod WEB: PNG (z Midjourney) -> lekki JPG, zmniejszony.

Wymaga:  pip install pillow   (u Ciebie już jest)
Użycie:  python3 tools/optimize-images.py

Co robi:
  - portrety (assets/<klucz>.png/.jpg)  -> max 600 px, JPG q80
  - covery   (assets/cover-pX.png/.jpg) -> max 1280 px, JPG q80
  - usuwa metadane (EXIF), zapisuje progresywnie
  - po konwersji usuwa źródłowy PNG (zostaje sam .jpg)

NIE konwertujemy do WebP (świadomie — projekt używa .jpg).
Jeśli kiedyś zechcesz WebP: zmień FORMAT='WEBP' i EXT='.webp' poniżej.
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Brak Pillow. Zainstaluj:  pip install pillow")

ASSETS = Path(__file__).resolve().parent.parent / "assets"
FORMAT, EXT, QUALITY = "WEBP", ".webp", 80
PORTRAIT_MAX, COVER_MAX = 600, 1280
SRC_EXT = {".png", ".jpeg", ".jpg", ".webp"}

def target_size(name: str) -> int:
    return COVER_MAX if name.lower().startswith("cover") else PORTRAIT_MAX

def main():
    if not ASSETS.exists():
        sys.exit(f"Brak folderu {ASSETS}")
    files = [p for p in ASSETS.iterdir() if p.suffix.lower() in SRC_EXT]
    if not files:
        print("Brak grafik w assets/ (wrzuć PNG-i z Midjourney i odpal ponownie).")
        return
    total_before = total_after = 0
    for src in sorted(files):
        out = src.with_suffix(EXT)
        # nie nadpisuj sam siebie zanim policzymy; pracujemy na kopii w pamięci
        before = src.stat().st_size
        try:
            img = Image.open(src)
            img = img.convert("RGB")
            mx = target_size(src.name)
            img.thumbnail((mx, mx), Image.LANCZOS)
            kw = {"quality": QUALITY}
            if FORMAT == "JPEG": kw.update(optimize=True, progressive=True)
            elif FORMAT == "WEBP": kw.update(method=6)
            img.save(out, FORMAT, **kw)
        except Exception as e:
            print(f"  ✗ {src.name}: {e}")
            continue
        after = out.stat().st_size
        total_before += before; total_after += after
        # usuń źródłowy PNG/inny, jeśli nazwa pliku się zmieniła
        if src.suffix.lower() != EXT and src.exists():
            src.unlink()
        print(f"  ✓ {src.name:24s} -> {out.name:24s} {before//1024:5d} KB -> {after//1024:4d} KB")
    if total_before:
        print(f"\nRazem: {total_before//1024} KB -> {total_after//1024} KB "
              f"({100 - total_after*100//total_before}% mniej). Odśwież index.html.")

if __name__ == "__main__":
    main()
