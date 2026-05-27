# znany.pl

Studio operacyjne, które wypuszcza pojedyncze produkty cyfrowe pod nazwiskiem influencera, z merytoryką specjalisty. **Nie platforma** — szczegóły w [`ideas.md`](./ideas.md).

## Słownik (żeby nazwy nie kolidowały)

Jedna pętla produktu, trzy nazwy:

> **Tworzenie** → **[bramka Compliance]** → **Landing** (klient kupuje) → **App** (klient używa) → **Sieć/LTV** (routing po kursie)

- **Landing studia** = strona `znany.pl` dla twórców (front door repo).
- **Landing produktu** = strona sprzedażowa jednego projektu pod brandem influencera (np. `ania.znany.pl`).
- **App** = to, co klient dostaje po zakupie (talia/program dzień po dniu).

## Struktura repo

```
index.html            ← LANDING STUDIA (front door: studio.znany.pl — dla twórców)
landing/
  index.html          ← LANDING PRODUKTU (przykład: ania.znany.pl — 8 tyg. siły)
  img/                ← obrazki landingu produktu
circle-care/          ← APP · satelita #1 (wellness, estetyka shadcn)
care-deck/            ← APP · satelita #2 (grywalna talia na dni)
pitch/
  index.html          ← prezentacja design-thinking (dla jednego odbiorcy)
  reader.html         ← czytnik dokumentów strategicznych (fazy 1–3)
archive/
  makieta2.html       ← stara eksploracja (FORM — AI recovery, alt mockup)
architecture.svg/.md  ← architektura mikroserwisów (z kotwicą do idei)
ideas.md              ← koncepcja (studio, nie platforma)
wybor-wertykalu.md    ← wybór wertykalu pod pilot (rekomendacja: fizjo)
pilot-znany-trener.md ← model pilotu (3 warstwy produktu, ekonomika)
```

## Uruchomienie

Czysty HTML/CSS/JS, bez build-stepu. Otwórz dowolny `index.html` w przeglądarce
albo serwuj statycznie, np.:

```
python3 -m http.server 8000
```

Deploy idzie na GitHub Pages. **Domena `znany.pl` nie jest jeszcze podpięta** — brak
pliku `CNAME` w roocie. Po decyzji o domenie (`znany.pl` vs `studio.znany.pl`)
dodać `CNAME` i wskazać DNS na Pages.
