#!/usr/bin/env bash
# ----------------------------------------------------------------------
# Pobiera zdjęcia profilowe z Instagrama do assets/ (na potrzeby DEMA).
#
# Wymaga:  pip install instaloader
# Użycie:  bash tools/get-photos.sh
#
# UWAGA: to są chronione zdjęcia profilowe konkretnych osób.
# Do produkcyjnej wersji produktu użyj OFICJALNYCH fotek, do których
# manager ma prawa. Ten skrypt służy do szybkiego dema.
#
# Jeśli Instagram zażąda logowania, dopisz flagę --login=TWOJ_LOGIN
# do polecenia instaloader poniżej (IG czasem blokuje anonimowe pobieranie).
# ----------------------------------------------------------------------
set -u

# handle na Instagramie  ->  nazwa pliku (klucz z index.html / INFLUENCERS)
MAP=(
  "marcin.najman:najman"
  "conanbestia:conan"
  "bigmajkmikulewicz:bigmajk"
  "maciej.sulecki:sulecki"
  "maciej_krolik:krolik"
  "oliwia_cyminska:oliwia"
  "beti.osa:beti"
  "queen_of_life_77:queen"
  "wioletabudnikjuhlke:wioleta"
  "jacek_rumniak:rumniak"
  "streetkravmagamehrstein:mehrstein"
)

command -v instaloader >/dev/null || { echo "Brak instaloader. Zainstaluj:  pip install instaloader"; exit 1; }

cd "$(dirname "$0")/.." || exit 1
mkdir -p assets

for pair in "${MAP[@]}"; do
  handle="${pair%%:*}"
  key="${pair##*:}"
  echo "→ @$handle  →  assets/${key}.jpg"
  rm -rf .ig_tmp
  # --profile-pic-only: tylko zdjęcie profilowe; --dirname-pattern: do tymczasowego folderu
  instaloader --quiet --no-metadata-json --profile-pic-only \
              --dirname-pattern=".ig_tmp" "$handle" 2>/dev/null \
    || { echo "   ✗ nie udało się (prywatny? login? literówka w handle?)"; continue; }
  pic="$(ls -t .ig_tmp/*.jpg 2>/dev/null | head -1)"
  if [ -n "$pic" ]; then cp "$pic" "assets/${key}.jpg"; echo "   ✓ zapisano"; else echo "   ✗ brak pliku"; fi
done

rm -rf .ig_tmp
echo
echo "Gotowe. Odśwież index.html — zdjęcia podmienią się automatycznie."
