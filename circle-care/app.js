/* ============================================================
   CARE DECK — logika i widoki. Ładowane PO assets/icons.js i data.js.
   Estetyka: shadcn/ui (neutral) + ikony liniowe (Lucide-style).
   Zero zależności runtime, zero build-stepu. Stan w localStorage.
   ============================================================ */

/* ikony (ICONS + icon()) siedzą w assets/icons.js — ładowane wcześniej */
document.getElementById('logo').innerHTML = icon('dumbbell',13);
document.getElementById('btn-info').innerHTML = icon('info',18);
document.getElementById('btn-user').innerHTML = icon('user',18);
document.getElementById('btn-info').onclick = openModel;
document.getElementById('btn-user').onclick = openPricing;

/* ---------- stan ---------- */
const DEFAULT = {activePackageId:null, dayIndex:1, completedToday:false, streak:0};
let state = load();
function load(){ try{ return Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem('circlecare')||'{}')); }catch(e){ return {...DEFAULT}; } }
function save(){ localStorage.setItem('circlecare', JSON.stringify(state)); }

/* ---------- nawigacja ---------- */
function go(hash){ location.hash = hash; }
const NAV = [
  {route:'discover',    icon:'compass',       label:'Odkrywaj'},
  {route:'roster',      icon:'sparkles',      label:'Twórcy'},
  {route:'today',       icon:'calendarCheck', label:'Dziś'},
  {route:'circle',      icon:'usersRound',    label:'Krąg'},
  {route:'specialists', icon:'heartPulse',    label:'Specjaliści'},
];
function renderNav(active){
  document.getElementById('nav').innerHTML = NAV.map(n=>
    `<button class="${n.route===active?'active':''}" onclick="go('#/${n.route}')">${icon(n.icon,22)}${n.label}</button>`).join('');
}

/* ---------- avatary ---------- */
// twórca: mock SVG (gdy brak zdjęcia) na kolorze marki; zdjęcie nakłada się na wierzch
function avatar(inf, size){
  size = size||46;
  return `<div class="ava-photo" style="width:${size}px;height:${size}px;background:${inf.c}">
    ${icon('userRound', Math.round(size*0.56))}<img src="${inf.photo}" alt="${inf.name}" onerror="this.remove()"></div>`;
}
function userAva(name, you, size){
  size = size||38;
  const l = (name.match(/[A-Za-zÀ-ž]/)||['?'])[0].toUpperCase();
  return `<div class="ava-init ${you?'me':''}" style="width:${size}px;height:${size}px;font-size:${Math.round(size*0.4)}px">${l}</div>`;
}
// specjalista: mock-awatar SVG (gdy brak zdjęcia) + ikonka kategorii w rogu
function specAvatar(s, size){
  size = size||46;
  const mock = `<span class="mock">${icon('userRound', Math.round(size*0.52))}</span>`;
  const photo = s.photo ? `<img src="${s.photo}" alt="${s.name}" onerror="this.remove()">` : '';
  const cat = s.icon ? `<span class="spec-cat" style="background:${s.c}">${icon(s.icon,11)}</span>` : '';
  return `<div class="spec-ava" style="width:${size}px;height:${size}px">${mock}${photo}${cat}</div>`;
}

/* ---------- helpery UI (jedno źródło prawdy, koniec z copy-paste) ---------- */
const youTag = ' <span class="sub" style="display:inline;margin:0">(Ty)</span>';
const frac = (a,b) => `${a}<span class="frac">/${b}</span>`;

// cover programu — wspólny dla karty / detalu / „Dziś"
function cover(p, o){
  o = o || {};
  const inf = INFLUENCERS[p.inf];
  const style = `--tint:${p.c}` + (o.tall ? ';height:188px;border-radius:var(--radius)' : '');
  return `<div class="program-cover" style="${style}">
      <span class="tint"></span>
      <img src="${inf.photo}" alt="" onerror="this.remove()">
      <img src="${p.cover}" alt="" onerror="this.remove()">
      <span class="grad"></span>
      ${o.badge ? `<span class="badge cover-badge">${o.badge}</span>` : ''}
      <div class="cover-text"${o.textStyle ? ` style="${o.textStyle}"` : ''}>${o.text}</div>
    </div>`;
}

// kafelek statystyki — wspólny dla „Dziś" i „Krąg"
function stat(ic, label, val){
  return `<div class="stat"><div class="lbl">${ic} ${label}</div><div class="val">${val}</div></div>`;
}

// modal z ikoną + tytułem + treścią + przyciskami (wspólny dla akcji)
function infoModal(iconName, filled, title, body, buttons){
  modal(`<div class="success"><div class="ic">${icon(iconName,28,filled)}</div>
    <h3>${title}</h3><p>${body}</p></div>${buttons}`);
}

/* ---------- ekrany ---------- */
function Discover(filter){
  filter = filter || 'Wszystkie';
  const cats = ['Wszystkie', ...new Set(PACKAGES.map(p=>p.cat))];
  const list = filter==='Wszystkie' ? PACKAGES : PACKAGES.filter(p=>p.cat===filter);
  const ap = state.activePackageId ? pkgById(state.activePackageId) : null;
  return `
    <div class="page-head">
      <div class="eyebrow">Programy wellness</div>
      <h2>Trenuj i regeneruj się — razem.</h2>
      <p class="sub">Twarz influencera × wiedza specjalisty. Dołącz do kręgu i działaj codziennie.</p>
    </div>
    ${ap ? `<div class="resume" onclick="go('#/today')">
      ${avatar(INFLUENCERS[ap.inf],44)}
      <div class="info"><div class="k">KONTYNUUJ</div><div class="t">${ap.title}</div></div>
      <span class="resume-go">${icon('play',17,true)}</span></div>` : ''}
    <div class="chips">${cats.map(c=>`<button class="chip ${c===filter?'active':''}" onclick="rerenderDiscover('${c}')">${c}</button>`).join('')}</div>
    <div class="sec"><h3>Programy</h3><span class="count">${list.length}</span></div>
    ${list.map(ProgramCard).join('')}
  `;
}
function rerenderDiscover(cat){ document.getElementById('view').innerHTML = Discover(cat); document.getElementById('view').scrollTop=0; }

function ProgramCard(p){
  const inf = INFLUENCERS[p.inf], sp = specById(p.spec);
  return `
    <div class="program" onclick="go('#/package/${p.id}')">
      ${cover(p,{badge:p.cat, text:`<div class="t">${p.title}</div><div class="s">${avatar(inf,22)} ${inf.handle}</div>`})}
      <div class="program-foot">
        <div class="l">${icon('heartPulse',15)}<span>${sp.spec}</span></div>
        <div class="r">${icon('clock',14)} ${p.days} dni ${icon('chevronRight',16)}</div>
      </div>
    </div>`;
}

function PackageDetail(id){
  const p = pkgById(id); if(!p) return Discover();
  const inf = INFLUENCERS[p.inf], sp = specById(p.spec);
  const active = state.activePackageId===id;
  return `
    <button class="back" onclick="go('#/discover')">${icon('arrowLeft',18)} Programy</button>
    ${cover(p,{tall:true, badge:`${p.cat} · ${p.days} dni`,
      text:`<div class="t" style="font-size:24px">${p.title}</div><div class="s">${avatar(inf,22)} prowadzi ${inf.handle}</div>`})}
    <div class="info-pair">
      <div class="info-tile">
        <div style="display:flex;justify-content:center">${avatar(inf,44)}</div>
        <div class="lbl">TWARZ</div><div class="v">${inf.handle}</div>
      </div>
      <div class="info-tile">
        <div style="display:flex;justify-content:center">${specAvatar(sp,44)}</div>
        <div class="lbl">BACKSTAGE · <span class="rate">${icon('star',11,true)} ${sp.rating}</span></div>
        <div class="v">${sp.spec}</div>
      </div>
    </div>
    <div class="sec"><h3>W programie — przykładowy dzień</h3><span class="count">${p.sessions.length} sesji</span></div>
    <div class="list">${p.sessions.map((s,i)=>Session(s,i+1)).join('')}</div>
    <div style="margin-top:18px;display:flex;flex-direction:column;gap:10px">
      ${active
        ? `<button class="btn btn-primary btn-block" onclick="go('#/today')">${icon('play',18,true)} Kontynuuj program</button>`
        : `<button class="btn btn-primary btn-block" onclick="joinPackage('${id}')">${icon('play',18,true)} Rozpocznij program</button>`}
      <button class="btn btn-outline btn-block" onclick="go('#/specialists')">${icon('heartPulse',18)} Konsultacja 1:1 ze specjalistą</button>
    </div>
    <p class="sub" style="text-align:center;margin-top:14px">Programy w abonamencie · od 39 zł/mc</p>
  `;
}
function Session(s, n){
  return `<div class="list-item">
      <div class="num">${n}</div>
      <div style="flex:1">
        <div class="li-title">${s.t}</div>
        <span class="badge ${s.by==='inf'?'tag-inf':'tag-spec'}" style="margin-top:6px">${s.by==='inf'?'influencer':'specjalista'}</span>
      </div>
    </div>`;
}

function Today(){
  if(!state.activePackageId){
    return `<div class="empty"><div class="ic">${icon('dumbbell',26)}</div>
      <h2 style="color:var(--fg)">Brak aktywnego programu</h2>
      <p class="sub">Wybierz program, dołącz do kręgu i zacznij swoją podróż.</p>
      <button class="btn btn-primary mt" style="margin:18px auto 0" onclick="go('#/discover')">${icon('compass',18)} Odkryj programy</button></div>`;
  }
  const p = pkgById(state.activePackageId);
  const sess = p.sessions[(state.dayIndex-1) % p.sessions.length];
  const pct = Math.min(100, Math.round((state.dayIndex/p.days)*100));
  return `
    <div class="page-head"><div class="eyebrow">${p.title}</div><h2>Dziś</h2></div>
    <div class="stat-row">
      ${stat(icon('flame',13,true),'Streak',`<span class="accent">${state.streak}</span>`)}
      ${stat(icon('calendarCheck',13),'Dzień',frac(state.dayIndex,p.days))}
      ${stat(icon('layers',13),'Postęp',`${pct}<span style="font-size:14px">%</span>`)}
    </div>
    <div class="progress" style="margin-bottom:6px"><div style="width:${pct}%"></div></div>
    <div class="sec"><h3>Sesja na dziś</h3></div>
    <div class="program" style="cursor:default">
      ${cover(p,{textStyle:'width:100%;display:flex;align-items:flex-end;justify-content:space-between',
        text:`<div><div class="t" style="font-size:17px">${sess.t}</div><div class="s">${sess.by==='inf'?'prowadzi influencer':'zaprojektował specjalista'}</div></div><span class="resume-go" style="background:rgba(255,255,255,.2)">${icon('play',18,true)}</span>`})}
    </div>
    ${state.completedToday
      ? `<button class="btn btn-outline btn-block mt" disabled>${icon('check',18)} Zrobione — wróć jutro</button>
         <button class="btn btn-primary btn-block mt" onclick="go('#/circle')">${icon('usersRound',18)} Zobacz swój krąg</button>`
      : `<button class="btn btn-primary btn-block mt" onclick="completeToday()">${icon('check',18)} Oznacz jako zrobione</button>`}
    <p class="sub" style="text-align:center;margin-top:12px">${icon('usersRound',13)} 4 osoby z Twojego kręgu ćwiczyły dziś</p>
  `;
}

function Circle(){
  const c = CIRCLE, done = c.members.filter(m=>m.done).length;
  return `
    <div class="page-head"><div class="eyebrow">Collaborative wellness</div><h2>${c.name}</h2>
      <p class="sub">Robicie to razem. To dlatego ludzie zostają — a to napędza MRR.</p></div>
    <div class="stat-row">
      ${stat(icon('flame',13,true),'Streak grupy',`<span class="accent">${c.groupStreak}</span>`)}
      ${stat(icon('check',13),'Dziś',frac(done,c.members.length))}
    </div>
    <div class="progress"><div style="width:${(done/c.members.length)*100}%"></div></div>
    <div class="sec"><h3>Krąg</h3><span class="count">${c.members.length} osób</span></div>
    <div class="list">
      ${c.members.map(m=>`<div class="list-item">${userAva(m.name,m.you)}
        <div class="li-title" style="flex:1">${m.name}${m.you?youTag:''}</div>
        ${m.done?`<span class="badge tag-spec">${icon('check',12)} zrobione</span>`:`<span class="badge">czeka</span>`}</div>`).join('')}
    </div>
    <button class="btn btn-primary btn-block mt" onclick="cheer()">${icon('clap',18)} Wyślij wsparcie kręgowi</button>
    <div class="sec"><h3>Ranking kręgów</h3></div>
    <div class="list">
      ${c.leaderboard.slice().sort((a,b)=>b.pts-a.pts).map((l,i)=>`<div class="list-item">
        <div class="num" style="${i===0?'background:var(--fg);color:#fff':''}">${i+1}</div>
        <div class="li-title" style="flex:1">${l.name}${l.you?youTag:''}</div>
        <span style="font-weight:700;font-size:13px">${l.pts} pkt</span></div>`).join('')}
    </div>
  `;
}

function Specialists(filter){
  filter = filter || 'Wszyscy';
  const cats = ['Wszyscy', ...new Set(SPECIALISTS.map(s=>s.spec))];
  const list = filter==='Wszyscy' ? SPECIALISTS : SPECIALISTS.filter(s=>s.spec===filter);
  return `
    <div class="page-head"><div class="eyebrow">Agregator · backstage</div><h2>Specjaliści</h2>
      <p class="sub">Ci sami fachowcy, którzy projektują programy. Umów konsultację 1:1 (model ZnanyLekarz).</p></div>
    <div class="chips">${cats.map(c=>`<button class="chip ${c===filter?'active':''}" onclick="rerenderSpecs('${c}')">${c}</button>`).join('')}</div>
    <div class="list mt">
      ${list.map(s=>`<div class="list-item">
        ${specAvatar(s,46)}
        <div style="flex:1;min-width:0">
          <div class="li-title" style="display:flex;align-items:center;gap:7px">${s.name}<span class="rate">${icon('star',12,true)} ${s.rating}</span></div>
          <div class="sub" style="margin:2px 0 0">${s.spec} · ${s.cred}</div>
          <div class="sub" style="margin-top:3px;display:flex;align-items:center;gap:5px">${icon('clock',13)} ${s.slot} · ${s.price} zł</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="book('${s.id}')">Umów</button>
      </div>`).join('')}
    </div>
    <p class="sub" style="text-align:center;margin-top:10px">Platforma pobiera prowizję od każdej wizyty.</p>
  `;
}
function rerenderSpecs(cat){ document.getElementById('view').innerHTML = Specialists(cat); renderNav('specialists'); document.getElementById('view').scrollTop=0; }

function Roster(){
  const entries = Object.entries(INFLUENCERS);
  return `
    <div class="page-head"><div class="eyebrow">Konstelacja</div><h2>Twój roster</h2>
      <p class="sub">${entries.length} twórców w jednym produkcie. Każdy = twarz programów, wsparty przez specjalistę backstage.</p></div>
    ${entries.map(([k,inf])=>{
      const pkgs = PACKAGES.filter(p=>p.inf===k);
      return `<div class="list" style="margin-bottom:10px"><div class="list-item">
        ${avatar(inf,50)}
        <div style="flex:1;min-width:0">
          <div class="li-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${inf.name}</div>
          <div class="sub" style="margin:1px 0 0">${inf.handle}${inf.followers?` · ${icon('users',12)} ${inf.followers}`:''}</div>
          <span class="badge badge-outline" style="margin-top:6px">${inf.niche}</span>
        </div>
        ${pkgs.length
          ? `<button class="btn btn-outline btn-sm" onclick="go('#/package/${pkgs[0].id}')">Program ${icon('chevronRight',14)}</button>`
          : `<span class="badge">wkrótce</span>`}
      </div></div>`;
    }).join('')}
    <p class="sub" style="text-align:center;margin-top:12px">Zdjęcia: wrzuć pliki do <code>assets/</code> — patrz <code>assets/README.md</code>.</p>
  `;
}

/* ---------- akcje ---------- */
function joinPackage(id){
  state.activePackageId = id; state.dayIndex = 1; state.completedToday = false; state.streak = 0;
  save(); go('#/today');
}
function completeToday(){
  if(state.completedToday) return;
  state.completedToday = true; state.streak += 1; state.dayIndex += 1; save();
  infoModal('flame', true, 'Sesja zaliczona!',
    `Streak: <b>${state.streak}</b> ${state.streak===1?'dzień':'dni'}. Twój krąg to widzi.`,
    `<button class="btn btn-primary btn-block mt" onclick="closeModal();go('#/circle')">Zobacz krąg</button>
     <button class="btn btn-outline btn-block mt" onclick="closeModal();render()">OK</button>`);
}
function cheer(){
  infoModal('clap', false, 'Wsparcie wysłane!',
    'Krąg dostał powiadomienie. Tak budujemy retencję — a retencja = MRR.',
    `<button class="btn btn-primary btn-block" onclick="closeModal()">Zamknij</button>`);
}
function book(id){
  const s = specById(id);
  modal(`<h3>Umów wizytę 1:1</h3>
    <div class="list-item" style="border:1px solid var(--border);border-radius:var(--radius);margin-bottom:14px">
      ${specAvatar(s,44)}<div style="flex:1"><div class="li-title">${s.name}</div>
      <div class="sub" style="margin:1px 0 0">${s.spec} · ${icon('clock',12)} ${s.slot}</div></div></div>
    <p>Cena wizyty: <b>${s.price} zł</b> · platforma pobiera prowizję ~20%.</p>
    <button class="btn btn-primary btn-block mt" onclick="confirmBook('${id}')">Potwierdź rezerwację</button>
    <button class="btn btn-outline btn-block mt" onclick="closeModal()">Anuluj</button>`);
}
function confirmBook(id){
  const s = specById(id);
  infoModal('check', false, 'Zarezerwowano!',
    `Wizyta u <b>${s.name}</b> (${s.slot}) potwierdzona. Drugi strumień przychodu działa.`,
    `<button class="btn btn-primary btn-block" onclick="closeModal()">Super</button>`);
}

/* ---------- modale informacyjne ---------- */
function openModel(){
  modal(`<h3>Model: cross-mix 2 platform</h3>
    <p><b>Agregator specjalistów</b> (backstage) — ZnanyLekarz dla wellness: dietetycy, fizjoterapeuci, psychologowie, coache snu, instruktorzy oddechu. Dają wiedzę i wiarygodność.</p>
    <p><b>Package Deck</b> (frontstage) — fani kupują konkretne programy, firmowane twarzą influencera, robione razem w kręgach.</p>
    <div class="code-block">specjalista projektuje program
   ↓
influencer firmuje twarzą → PROGRAM
   ↓
fan kupuje (sub) → sesja → krąg → wraca jutro → MRR
   ↓
chce więcej → booking 1:1 → PROWIZJA</div>
    <p>Dwa strumienie: <b>subskrypcja</b> (programy) + <b>take z marketplace</b> (wizyty).</p>
    <button class="btn btn-primary btn-block mt" onclick="closeModal()">Jasne</button>`);
}
function openPricing(){
  modal(`<h3>Wybierz plan</h3>
    <div class="tier"><div class="top"><span class="tn">Free</span><span class="tp">0 zł</span></div>
      <div class="td">1 krąg, ograniczone programy, podgląd</div></div>
    <div class="tier hot"><div class="top"><span class="tn">${icon('sparkles',15)} Premium</span><span class="tp">39 zł/mc</span></div>
      <div class="td">Wszystkie programy, pełne kręgi, tracking, streaki</div></div>
    <div class="tier"><div class="top"><span class="tn">Premium+</span><span class="tp">119 zł/mc</span></div>
      <div class="td">Live grupowe, ekskluzywne dropy, zniżki na wizyty 1:1</div></div>
    <button class="btn btn-primary btn-block mt" onclick="closeModal()">Wybieram Premium</button>`);
}

/* ---------- modal infra ---------- */
function modal(html){
  closeModal();
  const o = document.createElement('div'); o.className='overlay'; o.id='overlay';
  o.onclick = e=>{ if(e.target===o) closeModal(); };
  o.innerHTML = `<div class="modal"><div class="grab"></div>${html}</div>`;
  document.body.appendChild(o);
}
function closeModal(){ const o=document.getElementById('overlay'); if(o) o.remove(); }

/* ---------- router ---------- */
function render(){
  const hash = location.hash || '#/discover';
  const parts = hash.replace(/^#\//,'').split('/');
  const route = parts[0] || 'discover';
  const view = document.getElementById('view');
  if(route==='package')          view.innerHTML = PackageDetail(parts[1]);
  else if(route==='roster')      view.innerHTML = Roster();
  else if(route==='today')       view.innerHTML = Today();
  else if(route==='circle')      view.innerHTML = Circle();
  else if(route==='specialists') view.innerHTML = Specialists();
  else                           view.innerHTML = Discover();
  renderNav(route==='package' ? 'discover' : route);
  view.scrollTop = 0;
}
window.addEventListener('hashchange', render);

render();
