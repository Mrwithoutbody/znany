/* ============================================================
   care-deck — dane (mock). Ładowane PRZED app.js.
   Gamifikacja pitchu: talia=program, karta=wyzwanie,
   rzadka=influencer, zwykła=specjalista, Dom=krąg/frakcja (MTG).
   ============================================================ */

/* Talia rozłożona na DNI. Kolejność = dzień 1..N. role: start|common|rare|boss.
   inf = który patron (dla kart rzadkich/boss). Karty odkrywasz dzień po dniu. */
const PATH = [
  {id:'n1',  role:'start'},
  {id:'n2',  role:'common'},
  {id:'n3',  role:'common'},
  {id:'n4',  role:'rare', inf:'patron'},
  {id:'n5',  role:'common'},
  {id:'n6',  role:'common'},
  {id:'n7',  role:'rare', inf:'patron2'},
  {id:'n8',  role:'common'},
  {id:'n9',  role:'common'},
  {id:'n10', role:'common'},
  {id:'n11', role:'boss', inf:'patron'},
];

/* DOMY = kręgi wellness jako frakcje (kolor + herb + patroni-influencerzy). */
const HOUSES = [
  {
    id:'spokoj', name:'Dom Spokoju', domain:'Mindfulness & Sen',
    c:'#14b8a6', c2:'#0f766e', crest:'moon',
    patron:'oliwia', patron2:'queen',
    spec:{name:'Ewa Mazur · instruktor oddechu', icon:'wind', short:'oddech'},
    tagline:'Wycisz umysł, odzyskaj sen.',
    cards:[
      {t:'Pierwszy oddech',       d:'3 minuty świadomego oddechu.',        ic:'wind'},
      {t:'Poranne światło',       d:'10 minut dziennego światła.',         ic:'moon'},
      {t:'Cisza cyfrowa',         d:'30 minut bez telefonu.',              ic:'moon'},
      {t:'Reset Oliwii',          d:'Sygnaturowa medytacja 10 min.',       ic:'sparkles'},
      {t:'Oddech 4-7-8',          d:'Technika na zasypianie.',             ic:'wind'},
      {t:'Skan ciała',            d:'Rozluźnij napięcie partia po partii.',ic:'activity'},
      {t:'Rytuał Królowej',       d:'Wieczorny rytuał od @queen.',         ic:'sparkles'},
      {t:'Dziennik wdzięczności', d:'Zapisz 3 rzeczy z dnia.',             ic:'bookOpen'},
      {t:'Bez ekranu przed snem', d:'Godzina offline przed łóżkiem.',      ic:'moon'},
      {t:'Wieczorne wyciszenie',  d:'Oddech + lekkie rozciąganie.',        ic:'wind'},
      {t:'Mistrz Spokoju',        d:'7 dni rytuału snu z rzędu.',          ic:'crown'},
    ],
  },
  {
    id:'sila', name:'Dom Siły', domain:'Regeneracja & Trening',
    c:'#f97316', c2:'#b91c1c', crest:'dumbbell',
    patron:'najman', patron2:'sulecki',
    spec:{name:'Tomasz Lewandowski · fizjoterapeuta', icon:'activity', short:'fizjo'},
    tagline:'Zbuduj siłę, regeneruj jak wojownik.',
    cards:[
      {t:'Rozgrzewka',        d:'5 minut mobilizacji stawów.',     ic:'activity'},
      {t:'Mobilność bioder',  d:'8 minut otwarcia bioder.',        ic:'activity'},
      {t:'Plank',             d:'3 serie deski.',                  ic:'dumbbell'},
      {t:'Trening Najmana',   d:'Sygnaturowa seria siłowa.',       ic:'sparkles'},
      {t:'Rolowanie',         d:'Rozluźnienie mięśni po treningu.',ic:'activity'},
      {t:'Push 20 min',       d:'Klatka, barki, triceps.',         ic:'dumbbell'},
      {t:'Runda Suleckiego',  d:'Praca na worku, 6 rund.',         ic:'sparkles'},
      {t:'Nawodnienie',       d:'3L wody w ciągu dnia.',           ic:'droplet'},
      {t:'Mindset wojownika', d:'Wizualizacja przed treningiem.',  ic:'target'},
      {t:'Regeneracja',       d:'Sen 8h + rozciąganie.',           ic:'moon'},
      {t:'Mistrz Siły',       d:'Domknij tydzień bez opuszczenia.',ic:'crown'},
    ],
  },
  {
    id:'cialo', name:'Dom Ciała', domain:'Odżywianie',
    c:'#22c55e', c2:'#15803d', crest:'leaf',
    patron:'beti', patron2:'conan',
    spec:{name:'dr Anna Kowalczyk · dietetyk', icon:'leaf', short:'dietetyk'},
    tagline:'Jedz świadomie, zasil ciało.',
    cards:[
      {t:'Talerz zdrowia',  d:'Zbuduj zbilansowany talerz.',   ic:'leaf'},
      {t:'Szklanka wody',   d:'Zacznij dzień od wody.',        ic:'droplet'},
      {t:'Warzywa ×3',      d:'Warzywa do 3 posiłków.',        ic:'leaf'},
      {t:'Śniadanie Beti',  d:'Sygnaturowe śniadanie białkowe.',ic:'sparkles'},
      {t:'Czytaj etykiety', d:'Sprawdź skład 1 produktu.',     ic:'leaf'},
      {t:'Bez cukru do 12', d:'Przedpołudnie bez słodyczy.',   ic:'leaf'},
      {t:'Masa od Conana',  d:'Plan posiłków na dzień siłowy.',ic:'sparkles'},
      {t:'Białko w każdym', d:'Źródło białka w 3 posiłkach.',  ic:'leaf'},
      {t:'Mądra przekąska', d:'Zamień jedną przekąskę.',       ic:'leaf'},
      {t:'Stała pora',      d:'Zjedz o tej samej godzinie.',   ic:'clock'},
      {t:'Mistrz Ciała',    d:'7 dni czystego jadłospisu.',    ic:'crown'},
    ],
  },
  {
    id:'umysl', name:'Dom Umysłu', domain:'Psychika', locked:true,
    c:'#8b5cf6', c2:'#6d28d9', crest:'messageCircle',
    patron:'wioleta', patron2:'wioleta',
    spec:{name:'mgr Karolina Zięba · psycholog', icon:'messageCircle', short:'psycholog'},
    tagline:'Wkrótce — równowaga emocji.',
    cards:[],
  },
];
const houseById = id => HOUSES.find(h => h.id === id);

/* Ranking domów (collaborative: dom vs dom). Twój postęp dolicza się do wybranego domu. */
const HOUSE_BASE = { spokoj:1240, sila:1180, cialo:990, umysl:0 };

/* Influencerzy — tylko to, co potrzebne do kart rzadkich (zdjęcie + handle). */
const INFLUENCERS = {
  najman:  {name:'Marcin Najman',     handle:'@marcin.najman',    photo:'assets/najman.webp'},
  sulecki: {name:'Maciej Sulęcki',    handle:'@maciej.sulecki',   photo:'assets/sulecki.webp'},
  conan:   {name:'Conan Kaźmierski',  handle:'@conanbestia',      photo:'assets/conan.webp'},
  beti:    {name:'Beti Osomańska',    handle:'@beti.osa',         photo:'assets/beti.webp'},
  oliwia:  {name:'Oliwia Cymińska',   handle:'@oliwia_cyminska',  photo:'assets/oliwia.webp'},
  queen:   {name:'Dagmara Kaźmierska',handle:'@queen_of_life_77', photo:'assets/queen.webp'},
  wioleta: {name:'Wioleta Budnik-Juhlke', handle:'@wioletabudnikjuhlke', photo:'assets/wioleta.webp'},
};
