# Midjourney — prompty na portrety twórców (placeholdery do dema)

Generujemy **persony pasujące do niszy**, a nie podobizny konkretnych osób
(MJ blokuje nazwiska realnych ludzi + kwestia likeness). Set jest spójny dzięki
wspólnej „końcówce stylu" — dobrze leży na ciemnych coverach w apce.

**Format:** kwadrat (`--ar 1:1`), bo awatary są kadrowane na okrągło — twarz wyśrodkowana.
Na v7 podmień `--v 6.1` → `--v 7`. Dla mocniejszego realizmu zostaw `--style raw`.

Po wygenerowaniu zapisz plik pod nazwą z kolumny **plik** do folderu `assets/`.

---

### Wspólna końcówka stylu (jest już doklejona do każdego promptu poniżej)
```
, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

---

## Prompty (gotowe do wklejenia)

**assets/najman.jpg** — Marcin Najman / freak fight
```
Confident bald muscular man in his mid-40s, combat sports promoter, light stubble, intense charismatic expression, black t-shirt, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/conan.jpg** — Conan / lifestyle + siłownia
```
Young athletic man in his 20s, gym lifestyle influencer, short dark hair, arm tattoos, friendly confident smile, fitted black tank top, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/bigmajk.jpg** — Big Majk / kulturystyka
```
Massive muscular male bodybuilder in his 30s, very broad shoulders, short hair, friendly approachable smile, black gym t-shirt, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/sulecki.jpg** — Sulęcki / boks
```
Lean athletic professional boxer man in his 30s, short hair, focused determined look, boxing hand wraps visible, black athletic shirt, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/krolik.jpg** — Królik / fitness
```
Fit sporty man in his 30s, fitness trainer, short hair, warm friendly smile, grey athletic t-shirt, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/oliwia.jpg** — Oliwia / lifestyle + beauty
```
Elegant glamorous young woman in her late 20s, beauty and lifestyle influencer, long styled hair, polished natural makeup, soft confident smile, chic outfit, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/beti.jpg** — Beti / moda + lifestyle
```
Stylish fashionable woman in her 30s, fashion and lifestyle influencer, elegant hair, tasteful makeup, warm friendly smile, modern outfit, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/queen.jpg** — Dagmara / celebrytka (Królowe Życia)
```
Charismatic glamorous woman in her 50s, bold confident personality, voluminous styled hair, statement makeup and jewelry, warm expressive smile, elegant outfit, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/wioleta.jpg** — Wioleta / modelka + medycyna estetyczna
```
Elegant model woman in her 30s, soft glam beauty, long flowing hair, refined natural makeup, calm confident expression, aesthetic clinic vibe, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/rumniak.jpg** — Rumniak / trener personalny + MMA
```
Athletic male personal trainer in his late 30s, fit physique, short hair, energetic motivating smile, sport polo shirt, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

**assets/mehrstein.jpg** — Mehrstein / krav maga + samoobrona
```
Fit focused male krav maga self-defense instructor in his 30s, short hair, serious confident look, tactical black shirt, head-and-shoulders portrait, centered, looking at camera, soft cinematic studio lighting, clean dark neutral background, shallow depth of field, photorealistic, sharp focus, high detail, modern app profile photo --ar 1:1 --style raw --v 6.1
```

---

## Wskazówki
- **Spójność setu:** trzymaj tę samą końcówkę stylu dla wszystkich — wtedy roster wygląda jak jeden, profesjonalny zestaw.
- **Kadr:** awatary są okrągłe, a covery programów full-bleed — wybieraj ujęcia z twarzą na środku i miejscem nad głową.
- **Ciemne tło** celowo — ładnie wtapia się w ciemny gradient na coverach programów w apce.
- Po pobraniu eksportuj do kwadratu ~600×600 px, `.jpg`, nazwa = jak w nagłówku każdego promptu.

---

# Covery programów (tła kart)

Szerokie, **atmosferyczne tła bez ludzi i bez tekstu** (tytuł nakłada apka na dole,
więc zostaw dół spokojny). Klimat i kolor dobrane pod każdy program. Format `--ar 16:9`
(CSS i tak kadruje przez `object-fit: cover`). Zapisz do `assets/` pod nazwą z nagłówka.

> Żeby apka ich użyła, trzeba dodać pole `cover` w `INFLUENCERS`/`PACKAGES` —
> daj znać, podepnę (jedna mała zmiana w `index.html`).

### Wspólna końcówka stylu (doklejona do każdego promptu)
```
, cinematic atmospheric photography, soft depth of field, dark moody tones, minimal, calm empty space at the bottom for text, no people, no text, no words, no logo --ar 16:9 --style raw --v 6.1
```

**assets/cover-p1.jpg** — Regeneracja Wojownika (regeneracja · amber)
```
Dimly lit recovery and physio studio, foam roller and rolled towel, warm amber light, steam, moody calm atmosphere, cinematic atmospheric photography, soft depth of field, dark moody tones, minimal, calm empty space at the bottom for text, no people, no text, no words, no logo --ar 16:9 --style raw --v 6.1
```

**assets/cover-p2.jpg** — Masa i Balans (odżywianie + siła · red)
```
Dark moody gym with dumbbells and barbell on a rack, dramatic red-tinted rim light, healthy protein meal blurred in background, cinematic atmospheric photography, soft depth of field, dark moody tones, minimal, calm empty space at the bottom for text, no people, no text, no words, no logo --ar 16:9 --style raw --v 6.1
```

**assets/cover-p3.jpg** — Mindfulness Reset (mindfulness · teal)
```
Calm minimalist meditation space, soft teal morning light, single candle and green plant, serene zen atmosphere, cinematic atmospheric photography, soft depth of field, dark moody tones, minimal, calm empty space at the bottom for text, no people, no text, no words, no logo --ar 16:9 --style raw --v 6.1
```

**assets/cover-p4.jpg** — Spokojny Sen (sen · indigo)
```
Cozy dark bedroom at night, soft indigo blue and warm bedside lamp light, crisp linen bedding, restful calm nighttime mood, cinematic atmospheric photography, soft depth of field, dark moody tones, minimal, calm empty space at the bottom for text, no people, no text, no words, no logo --ar 16:9 --style raw --v 6.1
```

**assets/cover-p5.jpg** — Balans Emocji (psychika · pink)
```
Warm cozy interior corner, soft pink and golden light, open journal, cup of herbal tea, calm reflective intimate mood, cinematic atmospheric photography, soft depth of field, dark moody tones, minimal, calm empty space at the bottom for text, no people, no text, no words, no logo --ar 16:9 --style raw --v 6.1
```

**assets/cover-p6.jpg** — Reset Odżywiania (odżywianie · green)
```
Fresh healthy food on a dark wooden table, colorful vegetables, grains and bowls, natural green tones, moody top-down food photography, cinematic atmospheric, soft depth of field, dark moody tones, minimal, calm empty space at the bottom for text, no people, no text, no words, no logo --ar 16:9 --style raw --v 6.1
```

### Wskazówki do coverów
- **Bez ludzi i bez napisów** — inaczej pobije się z tytułem i twarzą twórcy nakładaną przez apkę.
- Trzymaj **spokojny, ciemniejszy dół** kadru (tam ląduje tytuł + gradient).
- Kolor promptu dobrany pod `--tint` karty w apce (amber/red/teal/indigo/pink/green) — zachowasz spójność z resztą UI.
- Eksport szeroki (np. 1280×720 px), `.jpg`, nazwa = `cover-pX.jpg`.
