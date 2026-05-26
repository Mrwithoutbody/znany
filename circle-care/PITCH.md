# Circle Care — pitch (wersja Karpathy)

Zasady, wg których to piszę (popraw, jeśli miałeś co innego na myśli):
1. **Najgłupsza rzecz, która działa — najpierw.**
2. **Minimum zależności. Jeden plik. Hackowalne.**
3. **Pierwsze zasady, zero buzzwordów.**
4. **Pokaż działającą pętlę, nie slajdy.**
5. **Czytelność > spryt.**

---

## Co to jest

Cross-mix **dwóch platform**:

- **AGREGATOR SPECJALISTÓW** *(backstage)* — „ZnanyLekarz", ale dla szerszej grupy specjalistów
  wellness: dietetycy, fizjoterapeuci, psychologowie, trenerzy mentalni, coache snu, instruktorzy oddechu.
  **To oni dają wiedzę i wiarygodność.**
- **PACKAGE DECK** *(frontstage)* — konsumencka apka, gdzie fani kupują **konkretne pakiety**
  (talie = gotowe programy), prowadzone **twarzą influencera**, zaprojektowane **przez specjalistę**,
  robione **razem** w kręgach (collaborative wellness).

> Influencer = dystrybucja. Specjalista = treść i wiarygodność. Fan = przychód.

---

## Pętla (to monetyzujemy)

```
specjalista projektuje program
        ↓
influencer firmuje twarzą  →  powstaje PAKIET (talia)
        ↓
fan kupuje (subskrypcja)
        ↓
robi sesję dnia  →  wspiera krąg  →  wraca jutro  →  ZOSTAJE  →  MRR
        ↓
chce więcej  →  booking 1:1 specjalisty (agregator)  →  PROWIZJA
```

Dwa strumienie przychodu: **subskrypcja (pakiety)** + **take z marketplace (wizyty specjalistów)**.

---

## Dlaczego to mądrzejsze niż „karty influencera"

- Specjalista backstage rozwiązuje problem **wiarygodności i regulacji** — to wellness zaprojektowany
  przez fachowca, nie losowy fit-tip z rolki.
- **Pakiet = konkretny SKU** (np. „Spokojny Sen — 21 dni") — łatwy do sprzedania i opisania.
- **Dwustronny marketplace = moat** — trudniej skopiować niż sklep z koszulkami.

---

## Roster → pakiety (przykłady)

| Pakiet | Twarz (influencer) | Backstage (specjalista) |
|---|---|---|
| Regeneracja Wojownika | @marcin.najman | fizjoterapeuta sportowy |
| Masa i Balans | @conanbestia | dietetyk kliniczny |
| Mindfulness Reset | @oliwia_cyminska | instruktor oddechu / MBSR |
| Spokojny Sen | @queen_of_life77 | specjalista snu |
| Balans Emocji | @wioletabudnikjuhlke | psycholog |
| Reset Odżywiania | @beti.osa | dietetyk |

`@maciej_krolik`, `@maciej.sulecki`, `@bigmajkmikulewicz` → kolejne pakiety treningowe.
`@jacek_rumniak`, `@adrian_mehrstein` → do domknięcia, gdy podasz ich niszę.

---

## MRR (założenia do walidacji, nie obietnice)

~1 mln zaangażowanego zasięgu × **1%** konwersji × **39 zł** ≈ **390 000 zł/mc** (baza).
+ prowizja od wizyt specjalistów.

| Scenariusz | Konwersja | MRR gross |
|---|---|---|
| Konserwatywny | 0,3% | ~117 000 zł |
| Bazowy | 1,0% | ~390 000 zł |
| Optymistyczny | 2,0% | ~780 000 zł |

---

## MVP (już w repo)

`index.html` — **klikalny prototyp, zero zależności**, otwórz w przeglądarce.
Pokazuje całą pętlę i obie platformy. To jest „najgłupsza rzecz, która działa" —
demo dla managera, nie produkcja.

## Następny krok

Zielone światło na **pilotaż: 1 influencer + 1 specjalista + 1 pakiet**.
Resztę walidujemy danymi, nie slajdami.
