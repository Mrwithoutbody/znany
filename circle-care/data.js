/* ============================================================
   CARE DECK — dane (mock). Ładowane PRZED app.js.
   Globalne const z tego pliku są widoczne w app.js
   (klasyczne skrypty współdzielą globalny zakres).
   ============================================================ */

const INFLUENCERS = {
  najman:  {name:'Marcin Najman',          handle:'@marcin.najman',       niche:'Freak fight / MMA',        followers:'',      c:'#f97316', photo:'assets/najman.webp'},
  conan:   {name:'Conan Kaźmierski',       handle:'@conanbestia',         niche:'Lifestyle / siłownia',     followers:'286K',  c:'#ef4444', photo:'assets/conan.webp'},
  bigmajk: {name:'Michał „Big Majk” Mikulewicz', handle:'@bigmajkmikulewicz', niche:'Kulturystyka / fitness', followers:'108K', c:'#dc2626', photo:'assets/bigmajk.webp'},
  sulecki: {name:'Maciej Sulęcki',         handle:'@maciej.sulecki',      niche:'Boks zawodowy',            followers:'27K',   c:'#ea580c', photo:'assets/sulecki.webp'},
  krolik:  {name:'Maciej Królik',          handle:'@maciej_krolik',       niche:'Fitness (do potwierdz.)',  followers:'',      c:'#16a34a', photo:'assets/krolik.webp'},
  oliwia:  {name:'Oliwia Cymińska',        handle:'@oliwia_cyminska',     niche:'Lifestyle / beauty',       followers:'126K',  c:'#14b8a6', photo:'assets/oliwia.webp'},
  beti:    {name:'Beata „Beti” Osomańska', handle:'@beti.osa',            niche:'Moda / lifestyle',         followers:'',      c:'#22c55e', photo:'assets/beti.webp'},
  queen:   {name:'Dagmara Kaźmierska',     handle:'@queen_of_life_77',    niche:'Celebrytka (Królowe Życia)', followers:'1M',  c:'#6366f1', photo:'assets/queen.webp'},
  wioleta: {name:'Wioleta Budnik-Juhlke',  handle:'@wioletabudnikjuhlke', niche:'Modelka / med. estetyczna',followers:'47K',   c:'#ec4899', photo:'assets/wioleta.webp'},
  rumniak: {name:'Jacek Rumniak',          handle:'@jacek_rumniak',       niche:'Trener personalny / MMA',  followers:'',      c:'#0ea5e9', photo:'assets/rumniak.webp'},
  mehrstein:{name:'Adrian Mehrstein',      handle:'@adrian_mehrstein',    niche:'Krav Maga / samoobrona',   followers:'',      c:'#8b5cf6', photo:'assets/mehrstein.webp'},
};

const SPECIALISTS = [
  {id:'s1', name:'dr Anna Kowalczyk',   spec:'Dietetyk kliniczny',        cred:'mgr · 8 lat praktyki', rating:4.9, price:180, slot:'jutro 10:00', icon:'leaf',          c:'#22c55e', photo:''},
  {id:'s2', name:'Tomasz Lewandowski',  spec:'Fizjoterapeuta sportowy',   cred:'mgr fizjoterapii',     rating:4.8, price:160, slot:'dziś 18:30',  icon:'activity',      c:'#f97316', photo:''},
  {id:'s3', name:'mgr Karolina Zięba',  spec:'Psycholog',                 cred:'psychoterapeuta',      rating:5.0, price:200, slot:'pon 12:00',   icon:'messageCircle', c:'#ec4899', photo:''},
  {id:'s4', name:'Piotr Nowak',         spec:'Trener mentalny',           cred:'cert. coach ICF',      rating:4.7, price:150, slot:'jutro 16:00', icon:'target',        c:'#6366f1', photo:''},
  {id:'s5', name:'dr Magda Wiśniewska', spec:'Specjalista snu',           cred:'lek. med.',            rating:4.9, price:220, slot:'śr 09:00',    icon:'moon',          c:'#0ea5e9', photo:''},
  {id:'s6', name:'Ewa Mazur',           spec:'Instruktor oddechu / MBSR', cred:'cert. mindfulness',    rating:4.8, price:120, slot:'dziś 20:00',  icon:'wind',          c:'#14b8a6', photo:''},
];
const specById = id => SPECIALISTS.find(s=>s.id===id);

const PACKAGES = [
  {id:'p1', cover:'assets/cover-p1.webp', title:'Regeneracja Wojownika', inf:'najman', spec:'s2', days:14, cat:'Regeneracja', price:'w abonamencie', c:'#f97316',
   sessions:[
     {t:'Mobilność bioder — 8 min', by:'inf'},{t:'Oddech regeneracyjny — 6 min', by:'spec'},
     {t:'Rolowanie i rozciąganie', by:'spec'},{t:'Rytuał wieczorny — sen', by:'spec'},
     {t:'Lekki trening mobilności', by:'inf'},
   ]},
  {id:'p2', cover:'assets/cover-p2.webp', title:'Masa i Balans', inf:'conan', spec:'s1', days:21, cat:'Odżywianie', price:'w abonamencie', c:'#ef4444',
   sessions:[
     {t:'Plan posiłków na dzień', by:'spec'},{t:'Trening push — 35 min', by:'inf'},
     {t:'Nawodnienie: 3L wody', by:'spec'},{t:'Suplementacja — co i kiedy', by:'spec'},
     {t:'Mindset: dyscyplina', by:'inf'},
   ]},
  {id:'p3', cover:'assets/cover-p3.webp', title:'Mindfulness Reset', inf:'oliwia', spec:'s6', days:14, cat:'Mindfulness', price:'w abonamencie', c:'#14b8a6',
   sessions:[
     {t:'Poranna medytacja — 10 min', by:'inf'},{t:'Oddech 4-7-8', by:'spec'},
     {t:'Skanowanie ciała', by:'spec'},{t:'Dziennik wdzięczności', by:'inf'},
     {t:'Cisza cyfrowa — 1h', by:'spec'},
   ]},
  {id:'p4', cover:'assets/cover-p4.webp', title:'Spokojny Sen', inf:'queen', spec:'s5', days:21, cat:'Sen', price:'w abonamencie', c:'#6366f1',
   sessions:[
     {t:'Higiena snu — checklist', by:'spec'},{t:'Wyciszenie wieczorne', by:'inf'},
     {t:'Bez ekranu 1h przed snem', by:'spec'},{t:'Oddech do zasypiania', by:'spec'},
     {t:'Poranne światło — 10 min', by:'spec'},
   ]},
  {id:'p5', cover:'assets/cover-p5.webp', title:'Balans Emocji', inf:'wioleta', spec:'s3', days:28, cat:'Psychika', price:'Premium+', c:'#ec4899',
   sessions:[
     {t:'Mapa emocji dnia', by:'spec'},{t:'Technika uziemienia', by:'spec'},
     {t:'Rozmowa ze sobą — ćwiczenie', by:'inf'},{t:'Granice: jak mówić nie', by:'spec'},
     {t:'Mały rytuał radości', by:'inf'},
   ]},
  {id:'p6', cover:'assets/cover-p6.webp', title:'Reset Odżywiania', inf:'beti', spec:'s1', days:21, cat:'Odżywianie', price:'w abonamencie', c:'#22c55e',
   sessions:[
     {t:'Talerz zdrowego żywienia', by:'spec'},{t:'Przepis: śniadanie białkowe', by:'inf'},
     {t:'Czytanie etykiet', by:'spec'},{t:'Warzywa do każdego posiłku', by:'spec'},
     {t:'Słodycze pod kontrolą', by:'inf'},
   ]},
];
const pkgById = id => PACKAGES.find(p=>p.id===id);

const CIRCLE = {
  name:'Wojownicy Balansu',
  members:[
    {name:'Ty', done:false, you:true},{name:'Kasia', done:true},
    {name:'Bartek', done:true},{name:'Ola', done:true},{name:'Marek', done:false},
  ],
  groupStreak:7,
  leaderboard:[
    {name:'Wojownicy Balansu', pts:842, you:true},
    {name:'Poranne Wilki', pts:910},
    {name:'Spokój i Siła', pts:760},
  ],
};
