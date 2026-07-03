
const DATA_PATHS = {
  trip: 'data/trip-config.json',
  itinerary: 'data/itinerary.json',
  places: 'data/places.json',
  friends: 'data/friends.json'
};
let ENGINE = {trip:{}, itinerary:[], places:{}, friends:{}};
const $ = (id)=>document.getElementById(id);
async function loadJSON(path){ const r = await fetch(path, {cache:'no-store'}); if(!r.ok) throw new Error(path); return r.json(); }
async function loadEngine(){
  const [trip,itinerary,places,friends]=await Promise.all([loadJSON(DATA_PATHS.trip),loadJSON(DATA_PATHS.itinerary),loadJSON(DATA_PATHS.places),loadJSON(DATA_PATHS.friends)]);
  ENGINE={trip,itinerary,places,friends};
  document.title = document.title.replace('Travel Engine', trip.tripName || 'Travel Engine');
  document.querySelectorAll('[data-brand]').forEach(e=>e.textContent=trip.tripName || 'Travel Engine');
  document.querySelectorAll('[data-friend-label]').forEach(e=>e.textContent=getFriendLabel());
}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function getFriend(){return localStorage.getItem((ENGINE.trip.trip_id||'trip')+'_friend')||'crystal';}
function getFriendLabel(){const f=ENGINE.friends[getFriend()]||ENGINE.friends.crystal||{emoji:'👓',name:'Crystal'};return `${f.emoji} ${f.name}`;}
function setFriend(k){localStorage.setItem((ENGINE.trip.trip_id||'trip')+'_friend',k);closeFriendModal();document.querySelectorAll('[data-friend-label]').forEach(e=>e.textContent=getFriendLabel());}
function openFriendModal(){ $('mamaModal')?.classList.add('show'); }
function closeFriendModal(){ $('mamaModal')?.classList.remove('show'); }
function friendButtons(){return Object.values(ENGINE.friends).map(f=>`<button onclick="setFriend('${esc(f.id)}')">${esc(f.emoji)} ${esc(f.name)}</button>`).join('');}
function closeMiniMenus(){document.querySelectorAll('.mini-menu').forEach(m=>m.classList.remove('show'));}
function toggleMenu(id){const m=$(id); const open=m&&m.classList.contains('show'); closeMiniMenus(); if(m&&!open)m.classList.add('show');}
function toggleTripMenu(){toggleMenu('tripMenu')} function toggleGuideMenu(){toggleMenu('guideMenu')} function toggleDays(){toggleMenu('daysMenu')}
document.addEventListener('click',e=>{if(!e.target.closest('.mini-menu')&&!e.target.closest('.trip-trigger')&&!e.target.closest('.guide-trigger')&&!e.target.closest('.days-trigger')) closeMiniMenus();});
function categoryGroups(){
 const groups={}; Object.entries(ENGINE.places).forEach(([key,p])=>{const cat=p.cat||'GUIDE'; (groups[cat] ||= []).push({...p,key});}); return groups;
}
function renderMenus(){
 const guide=$('guideMenu'); if(guide){
   const cats=categoryGroups();
   const labels={'ATTRACTIONS':'📍 ATTRACTIONS','CAFÉS':'☕ CAFÉS','EXPERIENCE':'🍳 EXPERIENCE','RESTAURANTS':'🍽 RESTAURANTS','SHOP':'🛍 SHOP','SPA':'💆 SPA','STAY':'🏨 STAY'};
   guide.innerHTML=Object.keys(labels).filter(c=>cats[c]?.length).map(c=>`<button onclick="openGuideCategory('${c}')"><span><span class="menu-title">${labels[c]}</span></span><span>›</span></button>`).join('');
 }
 const days=$('daysMenu'); if(days){days.innerHTML=ENGINE.itinerary.map(d=>`<a href="day.html?day=${d.day}"><span><span class="menu-title">${esc(d.emoji)} Day ${d.day}</span><span class="menu-sub">${esc(d.title)}<br/>${esc(d.date)}</span></span><span>›</span></a>`).join('');}
 const friends=$('friendChoiceList'); if(friends) friends.innerHTML=friendButtons();
}
function openGuideCategory(cat){
 const list=(categoryGroups()[cat]||[]).sort((a,b)=>String(a.title).localeCompare(String(b.title)));
 if(list.length===1){closeMiniMenus();openGuideModal(list[0].key);return;}
 $('guideModalContent').innerHTML=`<p class="kicker">Guide</p><h2>${esc(cat)}</h2><div class="category-pop-list">${list.map(i=>`<button onclick="openGuideModal('${esc(i.key)}')"><span><span class="guide-list-title">${esc(i.emoji)} ${esc(i.title)}</span><span class="guide-list-sub">${esc(i.sub||'')}</span></span><span>›</span></button>`).join('')}</div>`;
 closeMiniMenus(); $('guideModal').classList.add('show');
}
function visitDayHTML(key){
 const visits=ENGINE.itinerary.filter(d=>d.stops.some(s=>s.placeId===key||s.id===key));
 if(!visits.length) return '';
 return `<div class="quick-info-row visit-row"><span class="quick-info-icon">📅</span><span><span class="quick-info-label">Visit Day</span><span class="quick-info-value day-link-row">${visits.map(d=>`<a class="day-jump-button" href="day.html?day=${d.day}#${esc(key)}">Day ${d.day} →</a>`).join('')}</span></span></div>`;
}
function openGuideModal(key){
 const g=ENGINE.places[key]; if(!g)return;
 const sig=(g.signature||g.highlights||[]).map(x=>`<li>${esc(x)}</li>`).join('');
 const worth=(g.worth||g.tips||[]).map(x=>`<li>${esc(x)}</li>`).join('');
 $('guideModalContent').innerHTML=`<p class="kicker">Guide</p><h2>${esc(g.emoji)} ${esc(g.title)}</h2><p><strong>${esc(g.sub||'')}</strong></p><div class="quick-info-card"><div class="quick-info-top"><span class="category-tag">${esc(g.categoryLabel||g.cat||'Guide')}</span></div><div class="quick-info-grid"><div class="quick-info-row"><span class="quick-info-icon">📍</span><span><span class="quick-info-label">Address</span><span class="quick-info-value">${esc(g.address||'Check before visit')}</span></span></div><div class="quick-info-row"><span class="quick-info-icon">🕘</span><span><span class="quick-info-label">Hours</span><span class="quick-info-value">${esc(g.hours||'Check before visit')}</span></span></div><div class="quick-info-row"><span class="quick-info-icon">💰</span><span><span class="quick-info-label">Price</span><span class="quick-info-value">${esc(g.price||'Varies')}</span></span></div>${visitDayHTML(key)}</div><div class="quick-info-actions"><a class="map-button" href="${esc(g.maps||'#')}" target="_blank" rel="noopener">🗺 Open Google Maps</a><button class="moment-button" onclick="openMomentsModal('${esc(key)}')">✨</button></div></div><p>${esc(g.desc||'')}</p>${sig?`<h3>Highlights</h3><ul>${sig}</ul>`:''}${worth?`<h3>Good to Know</h3><ul>${worth}</ul>`:''}`;
 $('guideModal').classList.add('show');
}
function closeGuideModal(){ $('guideModal')?.classList.remove('show'); }
function openMomentsModal(key){ currentMomentKey=key; const g=ENGINE.places[key]||{title:key}; $('momentsTitle').textContent=g.title; $('momentsFriend').textContent=getFriendLabel(); $('momentsText').value=''; $('momentsModal')?.classList.add('show'); }
function closeMomentsModal(){ $('momentsModal')?.classList.remove('show'); }
let currentMomentKey=''; function saveMoments(){ const key=currentMomentKey; if(!key)return; const arr=JSON.parse(localStorage.getItem((ENGINE.trip.trip_id||'trip')+'_moments')||'[]'); const g=ENGINE.places[key]||{title:key}; arr.push({itemKey:key,itemTitle:g.title,friendLabel:getFriendLabel(),text:$('momentsText').value,createdAt:new Date().toISOString()}); localStorage.setItem((ENGINE.trip.trip_id||'trip')+'_moments',JSON.stringify(arr)); closeMomentsModal(); }
function renderHome(){
 const t=ENGINE.trip, days=ENGINE.itinerary;
 $('app').innerHTML=`<main class="dashboard home-premium home-v37"><section aria-label="${esc(t.tripName)} home" class="home-brand-card v37-dashboard-home"><div aria-hidden="true" class="home-single-watermark"></div><p class="home-since">${esc(t.since||'')}</p><h1>${esc(t.destinationShort||t.destination)}<br/><em>Companion</em></h1><p class="home-tagline">${esc(t.tagline||'Guide · Itinerary')}</p><div class="home-trip-line"><span>${esc(t.dateRange)}</span><span>${esc(t.destination)}</span></div><div class="home-live-grid"><div class="live-card live-countdown"><span class="live-icon">⏳</span><small>Countdown</small><strong id="countdownText">Counting down...</strong></div><div class="live-card live-time"><span class="live-icon">🕒</span><small>${esc(t.destinationShort||t.destination)}</small><strong id="localTime">--:--</strong></div><div class="live-card live-weather"><span class="live-icon">☀️</span><small>Weather</small><strong>${esc(t.weatherLabel)}</strong><em>${esc(t.weatherNote)}</em></div><div class="live-card live-rate"><span class="live-icon">💱</span><small>Exchange</small><strong>1 ${esc(t.baseCurrency)} ≈ ${Number(t.exchangeRate||0).toLocaleString()} ${esc(t.currency)}</strong></div></div><a class="home-day-button" href="day.html?day=1">Open Day 1 →</a></section></main>`;
 updateHomeDash(); setInterval(updateHomeDash,30000);
}
function updateHomeDash(){ const t=ENGINE.trip; const target=new Date(t.startDate); const now=new Date(); const diff=Math.ceil((target-now)/(1000*60*60*24)); const c=$('countdownText'); if(c)c.textContent=diff>1?`${diff} days to go`:diff===1?'Pack your bags':diff===0?`Welcome to ${t.destinationShort}`:'Thanks for the moments'; const lt=$('localTime'); if(lt) lt.textContent=new Intl.DateTimeFormat('en-AU',{timeZone:t.timezone||'UTC',hour:'2-digit',minute:'2-digit',hour12:false}).format(now)+' '+(t.timezoneLabel||''); }
function getDayNumber(){ return Number(new URLSearchParams(location.search).get('day')||'1'); }
function renderDay(){
 const n=getDayNumber(); const d=ENGINE.itinerary.find(x=>Number(x.day)===n)||ENGINE.itinerary[0]; if(!d){$('app').innerHTML='<main class="page"><p>Day not found.</p></main>';return;}
 document.title=`Day ${d.day} · ${ENGINE.trip.tripName}`;
 const prev=ENGINE.itinerary.find(x=>x.day===d.day-1); const next=ENGINE.itinerary.find(x=>x.day===d.day+1);
 $('app').innerHTML=`<main class="page day-page"><section class="hero-card"><p class="kicker">Day ${d.day} · ${esc(d.date)}</p><h1>${esc(d.title)}</h1><p>${esc(d.summary||'')}</p><div class="day-switcher">${prev?`<a class="pill" href="day.html?day=${prev.day}">‹ Day ${prev.day}</a>`:''}${next?`<a class="pill" href="day.html?day=${next.day}">Day ${next.day} ›</a>`:''}</div></section><section class="timeline">${d.stops.map(stop=>{const p=ENGINE.places[stop.placeId]||{};return `<div class="timeline-item" id="${esc(stop.id)}"><div class="timeline-time">${esc(stop.time)}</div><div class="timeline-main"><h3>${esc(stop.title)}</h3>${(stop.notes||[]).map(x=>`<p>${esc(x)}</p>`).join('')}${stop.routeHint?`<div class="route-hint">${esc(stop.routeHint).replace(/\n/g,'<br/>')}</div>`:''}<div class="timeline-actions">${stop.placeId?`<button onclick="openGuideModal('${esc(stop.placeId)}')">Guide</button>`:''}${(stop.map||p.maps)?`<a href="${esc(stop.map||p.maps)}" target="_blank">Map</a>`:''}${stop.placeId?`<button onclick="openMomentsModal('${esc(stop.placeId)}')">Moment</button>`:''}</div></div></div>`}).join('')}</section></main>`;
}
async function boot(page){ try{ await loadEngine(); renderMenus(); if(page==='home')renderHome(); if(page==='day')renderDay(); } catch(e){ console.error(e); $('app').innerHTML='<main class="page"><h1>Engine data failed to load</h1><p>Please check JSON files.</p></main>'; }}
