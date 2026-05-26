# Circle Care — prototyp MVP

Klikalny prototyp. **Zero zależności, zero build-stepu.** (wg zasad Karpathego)

## Uruchom

Dwuklik na `index.html` — albo:

```bash
python3 -m http.server 8000   # potem otwórz http://localhost:8000
```

## Co jest w środku (wszystko mockowane)

- **10 influencerów** z rosteru (frontstage / dystrybucja)
- **~6 specjalistów** — agregator typu ZnanyLekarz (backstage / wiarygodność)
- **~6 pakietów** (talie = gotowe programy: influencer × specjalista)
- **Pętla:** Odkryj pakiet → Dołącz → Sesja dnia → Krąg (collaborative wellness) → Booking specjalisty

Stan trzymany w `localStorage`, więc klikanie „pamięta" postęp. Dane są zmyślone — to demo.

## Pitch

Zobacz [`PITCH.md`](./PITCH.md).
