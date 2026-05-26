/* ============================================================
   care-deck — logika i widoki. Ładowane PO icons.js i data.js.
   Pętla: Dom → ścieżka wyzwań → karta → ukończ → odblokuj → kolekcja/ranking.
   Zero zależności runtime. Stan w localStorage.
   ============================================================ */

/* ikony (ICONS + icon()) w assets/icons.js */
document.getElementById('logo').innerHTML = icon('sparkles',13,true);
document.getElementById('btn-info').innerHTML = icon('info',18);
document.getElementById('btn-info').onclick = openModel;

/* ---------- stan ---------- */
let state = load();
function load(){ try{ return Object.assign({house:null, done:{}}, JSON.parse(localStorage.getItem('caredeck')||'{}')); }catch(e){ return {house:null, done:{}}; } }
function save(){ localStorage.setItem('caredeck', JSON.stringify(state)); }
function doneSet(hid){ return new Set(state.done[hid] || []); }
function doneCount(hid){ return (state.done[hid]||[]).filter(id=>PATH.some(n=>n.id===id)).length; }
function markDone(hid, nid){ const a = state.done[hid] || (state.done[hid]=[]); if(!a.includes(nid)) a.push(nid); save(); }

/* ---------- helpery domeny ---------- */
function cardFor(h, node){ return h.cards[PATH.findIndex(n=>n.id===node.id)]; }
function isRare(node){ return node.role==='rare' || node.role==='boss'; }
function rareInf(h, node){ return INFLUENCERS[h[node.inf]]; }
function dayState(hid, node){
  const ds = doneSet(hid);
  if(ds.has(node.id)) return 'done';
  const next = PATH.find(n=>!ds.has(n.id));   // pierwszy nieodkryty = dzisiejszy
  return next && next.id===node.id ? 'today' : 'locked';
}
function dayNum(node){ return PATH.findIndex(n=>n.id===node.id)+1; }

/* ---------- nawigacja ---------- */
function go(hash){ location.hash = hash; }
const NAV = [
  {route:'houses',  icon:'shield',   label:'Domy'},
  {route:'path',    icon:'calendar', label:'Dni'},
  {route:'ranking', icon:'trophy',   label:'Ranking'},
];
function renderNav(active){
  document.getElementById('nav').innerHTML = NAV.map(n=>
    `<button class="${n.route===active?'active':''}" onclick="navGo('${n.route}')">${icon(n.icon,22)}${n.label}</button>`).join('');
}
function navGo(route){ route==='path' ? go(state.house ? '#/path/'+state.house : '#/houses') : go('#/'+route); }

/* ---------- DOMY ---------- */
function Houses(){
  return `
    <div class="page-head"><div class="eyebrow" style="color:var(--muted)">care·deck</div>
      <h2>Wybierz swój Dom</h2>
      <p class="sub">Kręgi wellness jako frakcje. Każdy Dom = talia wyzwań, patroni-influencerzy i ścieżka do mistrza.</p></div>
    ${HOUSES.map(HouseCard).join('')}
  `;
}
function patronAva(key){
  const inf = INFLUENCERS[key];
  return `<span class="ava">${inf?`<img src="${inf.photo}" alt="" onerror="this.remove()">`:''}</span>`;
}
function HouseCard(h){
  const total = h.cards.length || PATH.length, done = doneCount(h.id), pct = total?Math.round(done/total*100):0;
  const patrons = h.locked ? '' :
    `<div class="house-patrons">${patronAva(h.patron)}${h.patron2&&h.patron2!==h.patron?patronAva(h.patron2):''}</div>`;
  return `<div class="house ${h.locked?'locked':''}" style="--hc:${h.c};--hc2:${h.c2}" ${h.locked?'':`onclick="enterHouse('${h.id}')"`}>
    <div class="house-bg">
      <div class="house-top"><div class="house-crest">${icon(h.crest,22)}</div>${patrons}</div>
      <div><h3>${h.name}</h3><div class="dom">${h.domain}</div><div class="tag">${h.tagline}</div></div>
    </div>
    <div class="house-foot">
      ${h.locked
        ? `<div class="enter" style="color:var(--muted)">${icon('lock',15)} Wkrótce</div>`
        : `<div class="prog"><div class="lbl">${done}/${total} wyzwań</div><div class="bar"><div style="width:${pct}%;background:${h.c}"></div></div></div>
           <div class="enter">Wejdź ${icon('chevronRight',16)}</div>`}
    </div>
  </div>`;
}
function enterHouse(id){ state.house = id; save(); go('#/path/'+id); }

/* ---------- ŚCIEŻKA WYZWAŃ (skill-tree) ---------- */
function Path(hid){
  const h = houseById(hid); if(!h || h.locked) return Houses();
  if(state.house !== hid){ state.house = hid; save(); }
  const ds = doneSet(hid), total = PATH.length, done = PATH.filter(n=>ds.has(n.id)).length;
  const todayN = Math.min(done+1, total);

  const cells = PATH.map((n, i) => {
    const day = i+1, st = dayState(hid, n), rare = isRare(n), boss = n.role==='boss', card = cardFor(h, n);
    let inner = '', label = '';
    if(st === 'locked'){                              // karta zakryta (wciąż w talii)
      label = rare ? '★ rzadka' : '';
    } else if(rare){                                  // odkryta karta rzadka = influencer
      const inf = rareInf(h, n);
      inner = `<img src="${inf.photo}" alt="" onerror="this.remove()"><div class="veil"></div>`;
      label = `★ ${inf.name.split(' ')[0]}`;
    } else {                                          // odkryta karta zwykła = specjalista
      inner = `<span class="ci">${icon(card.ic,24)}</span>`;
      label = h.spec.short;
    }
    const badge  = boss ? `<span class="cbadge crown">${icon('crown',11,true)}</span>` : '';
    const corner = st==='done'   ? `<span class="cbadge chk">${icon('check',11)}</span>`
                 : st==='locked' ? `<span class="cbadge lock">${icon('lock',10)}</span>` : '';
    return `<div class="day ${st} ${rare?'rare':''} ${boss?'boss':''}" onclick="tapNode('${hid}','${n.id}')">
        ${inner}<span class="dnum">${day}</span>${badge}${corner}<span class="dlabel">${label}</span></div>`;
  }).join('');

  return `<div style="--hc:${h.c};--hc2:${h.c2}">
    <button class="back" onclick="go('#/houses')">${icon('arrowLeft',18)} Domy</button>
    <div class="path-head">
      <div class="house-crest">${icon(h.crest,20)}</div>
      <div class="meta"><div class="nm">${h.name}</div><div class="pr">Talia na dni · ${done}/${total}</div></div>
      <div class="deck"><div class="deck-stack"><span></span><span></span><span></span></div><div class="deck-n">${total-done}<br>w talii</div></div>
    </div>
    <p class="sub" style="margin:-2px 0 14px">Odkrywaj jedną kartę dziennie. Teraz: <b style="color:var(--ink)">dzień ${todayN}</b>.</p>
    <div class="daygrid">${cells}</div>
  </div>`;
}
function tapNode(hid, nid){
  const n = PATH.find(x=>x.id===nid);
  if(dayState(hid, n)==='locked'){ toast('🔒 Karta zakryta', `Odkryjesz ją w dniu ${dayNum(n)} — najpierw zalicz wcześniejsze dni.`); return; }
  go(`#/card/${hid}/${nid}`);
}

/* ---------- KARTA (wyzwanie) ---------- */
function Card(hid, nid){
  const h = houseById(hid); if(!h) return Houses();
  const n = PATH.find(x=>x.id===nid); if(!n) return Path(hid);
  const card = cardFor(h, n), rare = isRare(n), boss = n.role==='boss';
  const st = dayState(hid, n), day = dayNum(n);
  const inf = rare ? rareInf(h, n) : null;
  const rlabel = boss ? 'Legendarna' : (rare ? 'Rzadka' : 'Zwykła');

  const art = (rare && inf)
    ? `<img src="${inf.photo}" alt="" onerror="this.remove()"><div class="veil"></div>`
    : `<div class="veil"></div><div class="bigicon">${icon(card.ic,64)}</div>`;
  const by = (rare && inf)
    ? `<div class="ava"><img src="${inf.photo}" alt="" onerror="this.remove()"></div>
       <div class="who"><div class="k">Karta sygnowana</div><div class="v">${inf.handle}</div></div>`
    : `<div class="ava">${icon(h.spec.icon,18)}</div>
       <div class="who"><div class="k">Zaprojektował specjalista</div><div class="v">${h.spec.name}</div></div>`;

  let btn;
  if(st==='done')       btn = `<button class="btn btn-block" disabled>${icon('check',18)} Odkryta · w kolekcji</button>`;
  else if(st==='today') btn = `<button class="btn btn-accent btn-block" onclick="complete('${hid}','${nid}')">${icon('sparkles',18,true)} Odkryj kartę dnia</button>`;
  else                  btn = `<button class="btn btn-block" disabled>${icon('lock',16)} Zakryta — wróć w dniu ${day}</button>`;

  return `
    <button class="back" onclick="go('#/path/${hid}')">${icon('arrowLeft',18)} Ścieżka</button>
    <div class="gcard ${rare?'rare':''}" style="--hc:${h.c};--hc2:${h.c2}">
      <div class="art">${art}
        <span class="rarity ${rare?'rare':''}">${rare?icon('sparkles',11,true):''}${rlabel}</span>
        <div class="ctitle"><div class="t">${card.t}</div></div>
      </div>
      <div class="body">
        <div class="desc">${card.d}</div>
        <div class="by">${by}</div>
      </div>
    </div>
    <div class="mt">${btn}</div>
    <p class="sub" style="text-align:center;margin-top:12px">Dzień ${day} · ${h.name} · ${h.domain}</p>
  `;
}
function complete(hid, nid){
  markDone(hid, nid);
  const h = houseById(hid), card = cardFor(h, PATH.find(x=>x.id===nid));
  infoModal('Karta dnia odkryta!',
    `<b>${card.t}</b> trafia do kolekcji. Jutro odkryjesz kolejną — i dorzuciłeś punkty Domowi.`,
    `<button class="btn btn-accent btn-block" onclick="closeModal();go('#/path/${hid}')">Wróć do talii</button>`);
}

/* ---------- RANKING DOMÓW ---------- */
function Ranking(){
  const rows = HOUSES.map(h => ({ h, pts:(HOUSE_BASE[h.id]||0) + doneCount(h.id)*30, you:state.house===h.id }))
                     .sort((a,b)=>b.pts-a.pts);
  return `
    <div class="page-head"><div class="eyebrow" style="color:var(--muted)">Ranking domów</div>
      <h2>Dom vs Dom</h2>
      <p class="sub">Collaborative wellness: Twój postęp dolicza się do wybranego Domu. Wspinacie się razem.</p></div>
    ${rows.map((r,i)=>`<div class="row ${r.you?'you':''}">
      <div class="rk">${i+1}</div>
      <div class="rcrest" style="background:${r.h.c}">${icon(r.h.crest,18)}</div>
      <div class="rn">${r.h.name}${r.you?' · <span style="color:var(--gold)">Twój dom</span>':''}</div>
      <div class="rp">${r.pts.toLocaleString('pl-PL')}</div>
    </div>`).join('')}
  `;
}

/* ---------- modale ---------- */
function modal(html){
  closeModal();
  const o = document.createElement('div'); o.className='overlay'; o.id='overlay';
  o.onclick = e=>{ if(e.target===o) closeModal(); };
  o.innerHTML = `<div class="modal">${html}</div>`;
  document.body.appendChild(o);
}
function closeModal(){ const o=document.getElementById('overlay'); if(o) o.remove(); }
function toast(title, body){ modal(`<h3>${title}</h3><p>${body}</p><button class="btn btn-block btn-ghost" onclick="closeModal()">OK</button>`); }
function infoModal(title, body, buttons){ modal(`<h3>${title}</h3><p>${body}</p>${buttons}`); }
function openModel(){
  modal(`<h3>care·deck = gamifikacja pitchu</h3>
    <p><b>Talia</b> = program · <b>karta</b> = wyzwanie · <b>rzadka</b> = influencer (twarz) · <b>zwykła</b> = specjalista (wiedza) · <b>Dom</b> = krąg wellness (frakcja).</p>
    <div class="code-block">wybierz Dom → talia rozłożona na dni
   ↓
karta dnia → odkryj → jutro kolejna
   ↓
odkrywaj dzień po dniu → wspinaj Dom w rankingu → MRR</div>
    <p>Karty rzadkie są <b>sygnowane</b> (influencer), zwykłe <b>zaprojektowane przez specjalistę</b> — wiarygodność jak w pitchu, zero gacha.</p>
    <button class="btn btn-block btn-ghost" onclick="closeModal()">Jasne</button>`);
}

/* ---------- router ---------- */
function render(){
  const parts = (location.hash || '#/houses').replace(/^#\//,'').split('/');
  const r = parts[0] || 'houses';
  const v = document.getElementById('view');
  if(r==='path')         v.innerHTML = Path(parts[1]);
  else if(r==='card')    v.innerHTML = Card(parts[1], parts[2]);
  else if(r==='ranking') v.innerHTML = Ranking();
  else                   v.innerHTML = Houses();
  renderNav(r==='card' ? 'path' : (['path','ranking'].includes(r) ? r : 'houses'));
  v.scrollTop = 0;
}
window.addEventListener('hashchange', render);
render();
