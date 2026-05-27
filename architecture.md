# znany.pl — architektura mikroserwisów

Diagram: [`architecture.svg`](./architecture.svg). Ten dokument opisuje każdy serwis i **wiąże go z ideą** (`ideas.md`, `pilot-znany-trener.md`, `wybor-wertykalu.md`).

Zasada porządkująca — jedna pętla, trzy nazwy bez kolizji:

> **Tworzenie** → **[bramka Compliance]** → **Landing** (klient kupuje) → **App** (klient używa) → **Sieć/LTV** (routing po kursie).

„Studio" w sensie *firma/operator* z `ideas.md` to model biznesowy, **nie ekran** — w architekturze nie nosi tej nazwy, żeby nie kolidować z narzędziem-kreatorem. Operatorską warstwę reprezentuje *Operacje Studio*.

**Tworzenie landingu jest celowo lekkie.** Ma dwa tryby (PILOT / SKALA), a jedyną twardą rzeczą w procesie jest podpis prawny — dlatego Compliance to **bramka publikacji**, a nie trzeci serwis twórczy. Szczegóły niżej w sekcji 01.

System jest **multi-tenant per projekt**: jeden tenant = jeden produkt (influencer × specjalista), izolacja treści, domen, rozliczeń i danych.

---

## Gateway

**API Gateway + Tożsamość** — jedno wejście, cztery role: klient, specjalista, influencer, operator. Auth, routing, rate-limit, kontekst tenanta (projektu). Wszystko poniżej jest za tą bramą.

---

## 01 · Tworzenie — *jak powstaje landing (lekko, w dwóch trybach)*

To **jeden** serwis o dwóch trybach, nie trzy klocki. Builder bez treści nie istnieje, więc „szablony i treść" to jego model danych, a nie osobny serwis.

| Tryb | Co to | Kiedy | Skąd w idei |
|---|---|---|---|
| **PILOT — Treść projektu** | Structured doc (jak `data.js` w satelitach). Operator/specjalista wypełnia treść, landing renderuje się z dokumentu. **Bez kreatora** — `makieta.html` dowodzi, że landing da się złożyć ręcznie. | teraz, 1 projekt | `ideas.md` §"studio, nie platforma"; pilot = 1 influencer × 1 specjalista |
| **SKALA — Studio / Kreator** | No-code: bloki, szablony i treść w jednym, podgląd live, specjalista buduje sam. Self-serve builder. | **dopiero po 3–5 projektach**, gdy gęstość specjalistów to uzasadnia | `ideas.md` §"sieć jest konsekwencją, nie warunkiem startu" |

Dlaczego nie builder od razu: no-code kreator dla *samodzielnego* składania to platformowy ruch — opłaca się przy wielu specjalistach budujących wiele landingów bez zespołu studia. Na pilocie to przerost; składa operator.

## Bramka Compliance — *między 01 a 02, nie obok*

Compliance nie jest równoległym serwisem twórczym — jest **gate'em na publikację**: landing nie wychodzi na świat bez zielonego światła.

| | Co | Skąd w idei |
|---|---|---|
| **Co sprawdza** | Walidacja merytoryczna specjalisty, oznaczenia reklam (UOKiK), uprawnienia KIF (fizjo), RODO/ToS, zgody. | `ideas.md` §"Insight regulacyjny"; `wybor-wertykalu.md` (KIF, UOKiK) |
| **Pilot** | Człowiek + checklista (specjalista/prawnik przeklepuje). | — |
| **Skala** | Część guardraili wbudowana w bloki kreatora, reszta jako review. | — |

To value prop, nie ozdoba — dlatego ma własny, twardy punkt w przepływie.

## 02 · Sprzedaż (Landing) — *jak produkt się sprzedaje*

| Serwis | Co robi | Skąd w idei |
|---|---|---|
| **Landing Renderer** | Renderuje opublikowaną stronę, white-label, custom domeny (`ania.znany.pl`), SEO/SSR. | `pilot` §"Format produktu" — white-label pod brand influencera |
| **Checkout & Płatności** | Koszyk, kohorty (limit miejsc, fale zapisów), kody rabatowe, płatność jednorazowa (nie subskrypcja). | `pilot` — kohortowy program 8–12 tyg., nie open-end |
| **Rozliczenia & Faktury** | Faktury, refundy, **rev-share split** studio · influencer · specjalista. | `ideas.md` §"Ekonomika"; `pilot` §"Ekonomika pilotu" |

## 03 · Dostarczenie (App) — *co klient dostaje po zakupie*

| Serwis | Co robi | Skąd w idei |
|---|---|---|
| **Silnik Programu / Kohorty** | Talia na dni, harmonogram, postęp, streak, ukończenie; zarządzanie kohortą 8–12 tyg. | `ideas.md` §"Warstwa produktu" — mechanika „talia na dni" |
| **App Konsumencka** | Sama appka (circle-care / care-deck), wyzwanie dzień po dniu, jawne autorstwo (rzadka karta = influencer, zwykła = specjalista). | istniejące prototypy `circle-care/`, `care-deck/` |
| **Powiadomienia** | Email/SMS/push, przypomnienia, follow-up, **handoff do warstwy LTV** po zakończeniu programu. | `pilot` §"Warstwa 3" — moment, gdy ~80% klientów znika |

## 04 · Sieć / LTV — *warstwa 2 i 3, najtrwalsza wartość*

| Serwis | Co robi | Skąd w idei |
|---|---|---|
| **Routing 1:1 (warstwa 2)** | Edge cases z kohorty → specjalista w mieście klienta. Specjalista dostaje **płacącego klienta, zanim wejdzie do sieci**. | `pilot` §"Warstwa 2 — edge cases 1:1" |
| **Sieć Partnerów Wellness (w. 3)** | Routing post-kurs: fizjo, dietetyk, regeneracja, recovery; revenue share od skierowania. **Największe aktywo długoterminowe.** | `pilot` §"Warstwa 3 — ścieżka po kursie (LTV)" |
| **Rezerwacje & Kalendarz** | Umawianie sesji 1:1 i wizyt, dostępność partnerów, sync kalendarza. | konsekwencja warstw 2/3 |

## 05 · Dane & Operacje — *przekrojowe*

| Serwis | Co robi | Skąd w idei |
|---|---|---|
| **Performance Marketing** | Kampanie pod produkt influencera, atrybucja, CAC, piksele (Meta/Google). | `pilot` §"Problem 1: zerowy ruch" — ruch z dystrybucji influencera, nie z katalogu |
| **Analityka & Ścieżka Klienta** | Co kupuje klient **po** kursie — dane, których nie ma konkurent; LTV, retencja, baza decyzyjna pod kolejne projekty. | `pilot` §"Bonus" + §"Co znany.pl wynosi z pilotu" |
| **Operacje Studio** | Panel operatora znany.pl: zarządzanie projektami i splitami, support/helpdesk, refundy. To warstwa „znany.pl jako operator". | `ideas.md` §"Co robimy" — operacje produktu |

## Integration Hub

Zewnętrzne: **Stripe / Przelewy24** (płatności), **Fakturownia / inFakt** (faktury), **Postmark + SMS** (powiadomienia), **DNS/domeny** (white-label), **Meta / Google Ads**, **rejestr KIF** (weryfikacja uprawnień), **CEIDG** (typowanie specjalistów do outboundu — jako narzędzie operacyjne, nie produkt; `ideas.md` §"CEIDG").

---

## Co świadomie NIE jest osobnym serwisem (parking z `ideas.md`)

- **Marketplace / katalog specjalistów** — sieć jest *konsekwencją* udanych projektów, nie warunkiem startu. Reprezentują ją serwisy warstwy 04, aktywowane pod skierowania, a nie katalog na sucho.
- **Domy / kręgi / ranking dom-vs-dom, subskrypcja wielu talii** — warstwa społecznościowa parkowana do czasu gęstości userów. Brak w architekturze startowej celowo.

## Minimalny zakres pod pilot (gdyby ciąć do kości)

Treść projektu (doc) → **bramka Compliance** (człowiek) → Landing Renderer + Checkout + Rozliczenia → Silnik Programu + App + Powiadomienia. **Bez kreatora** — ten wchodzi dopiero w fazie SKALA. Warstwę 04 (Sieć/LTV) odpala się już od pierwszej kohorty, bo to ona — wg `pilot-znany-trener.md` — jest właściwą metryką sukcesu, nie ROI z samego kursu.
