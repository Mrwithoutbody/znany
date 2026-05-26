# care·deck — gamifikacja pitchu (satelita #2)

To **ta sama substancja co Circle Care**, tylko w skórze gry. Zgodne z `circle-care/PITCH.md`.

## Mapowanie pojęć (1:1 z pitchem)

| Pitch | care·deck |
|---|---|
| Pakiet / program (talia) | **Dom** + jego ścieżka wyzwań |
| Sesja dnia | **Karta = wyzwanie** |
| Influencer (twarz, dystrybucja) | **Karta rzadka** (złota, foil, zdjęcie) |
| Specjalista (wiedza, wiarygodność) | **Karta zwykła** (zaprojektowana, podpisana) |
| Krąg wellness (collaborative) | **Dom** = frakcja (styl MTG: kolor + herb + patroni) |
| Retencja (wracaj jutro → MRR) | **Ścieżka wyzwań** (skill-tree): ukończ → odblokuj → zbieraj → wspinaj Dom |
| Marketplace / booking 1:1 | premium: odblokowanie Domów, sygnatury, konsultacje |

## Pętla
```
wybierz Dom → ścieżka wyzwań (skill-tree)
   ↓
karta (wyzwanie) → ukończ → odblokuj sąsiednie węzły
   ↓
zbieraj karty (kolekcja) → Twój postęp wbija punkty Domowi (ranking dom vs dom)
   ↓
wracasz po kolejne → ZOSTAJESZ → MRR
```

## Decyzje projektowe (design thinking)
- **Wiarygodność > hype:** karty rzadkie są *sygnowane* przez influencera, ale zwykłe (większość) **projektuje specjalista** — utrzymujemy filar pitchu (regulacje, zaufanie). **Zero lootboxów/gacha** — zdrowie to nie hazard.
- **Dom = krąg jako frakcja:** collaborative wellness staje się rywalizacją *dom vs dom* (ranking) — silnik retencji.
- **Ścieżka wyzwań:** skill-tree (jak `example.png`) zamiast listy — postęp jest widoczny, kolejne węzły kuszą.

## MVP (w tym folderze)
`index.html` — klikalny prototyp, **zero zależności**, ciemna estetyka „gry". 4 Domy (3 grywalne + 1 wkrótce),
wspólny szkielet ścieżki (11 węzłów: start → rozgałęzienia → 2 rzadkie → boss), kolekcja, ranking.

## Relacja do Circle Care
To **dwa satelity tego samego produktu**: `circle-care/` = czysty, „dorosły" wellness (shadcn, jasny);
`care-deck/` = grywalny, retencyjny hook (ciemny, kolekcjonerski). Ten sam roster, ci sami specjaliści, ten sam pitch.
