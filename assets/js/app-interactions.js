function activateTab(id,scrollId=""){
  $$(".tab").forEach(b=>{
    const active=b.dataset.tab===id;
    b.classList.toggle("active",active);
    b.setAttribute("aria-selected",String(active));
    b.tabIndex=active?0:-1;
  });
  $$(".tab-panel").forEach(p=>p.classList.toggle("active",p.id===`panel-${id}`));

  if(id==="guide"){
    $$(".rule").forEach(el=>el.classList.add("visible"));
  }

  if(scrollId){
    setTimeout(()=>document.getElementById(scrollId)?.scrollIntoView({behavior:"smooth",block:"start"}),70);
  }else{
    document.querySelector(".tabs-wrap")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
}
function bindTabs(){
  const tabs=$$(".tab");
  tabs.forEach((b,index)=>{
    b.addEventListener("click",()=>activateTab(b.dataset.tab));
    b.addEventListener("keydown",e=>{
      if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key)) return;
      e.preventDefault();
      let next=index;
      if(e.key==="ArrowRight") next=(index+1)%tabs.length;
      if(e.key==="ArrowLeft") next=(index-1+tabs.length)%tabs.length;
      if(e.key==="Home") next=0;
      if(e.key==="End") next=tabs.length-1;
      tabs[next].focus();
      activateTab(tabs[next].dataset.tab);
    });
  });
}

function openTopic(id){
  const topic=topics[id]; if(!topic) return;
  $("#modalTitle").textContent=topic.title;
  $("#modalBody").innerHTML=`
    <div class="accordion-content" style="padding:4px 2px 2px;color:var(--text)">
      <p style="color:var(--muted);margin-top:0">${escapeHtml(topic.intro)}</p>
      <ol>${topic.steps.map(([t,d])=>`<li><strong style="color:var(--navy)">${escapeHtml(t)}</strong><br><span style="color:var(--muted)">${escapeHtml(d)}</span></li>`).join("")}</ol>
    </div>`;
  openModal();
}
function openMedia(type,item){
  if(!item) return;
  $("#modalTitle").textContent=item.title;
  if(type==="image"){
    $("#modalBody").innerHTML=`<img class="modal-image" src="${item.src}" alt="${escapeHtml(item.title)}"><div class="modal-caption">${escapeHtml(item.caption)}</div>`;
  }else{
    $("#modalBody").innerHTML=item.src
      ?`<video class="modal-video" controls playsinline preload="metadata" src="${item.src}" poster="${item.poster||""}"></video><div class="modal-caption">${escapeHtml(item.caption)}</div>`
      :`<div class="video-placeholder"><div><b>${escapeHtml(item.title)}</b><span>${escapeHtml(item.caption)}<br><br>El reproductor ya está preparado: agrega la URL o archivo del video vigente en el arreglo <code>videos</code>.</span></div></div>`;
  }
  openModal();
}
function openModal(){
  $("#modalBg").classList.add("open");$("#modal").classList.add("open");document.body.style.overflow="hidden";$("#modalClose").focus();
}
function closeModal(){
  $("#modalBg").classList.remove("open");$("#modal").classList.remove("open");document.body.style.overflow="";setTimeout(()=>$("#modalBody").innerHTML="",220);
}
$("#modalClose").addEventListener("click",closeModal);
$("#modalBg").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

function bindFilters(){
  $$("[data-filter]").forEach(b=>b.addEventListener("click",()=>{
    state.filter=b.dataset.filter;
    $$("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));
    renderQuickCards();
  }));
}

function bindGalleryFilters(){
  $$("[data-info-filter]").forEach(b=>b.addEventListener("click",()=>{
    state.infoFilter=b.dataset.infoFilter;
    $$("[data-info-filter]").forEach(x=>x.classList.toggle("active",x===b));
    renderGallery();
  }));
}
function bindSearch(){
  const input=$("#searchInput"),results=$("#searchResults");
  function run(){
    const q=input.value.trim(); const nq=norm(q);
    if(!q){results.classList.remove("show");results.innerHTML="";return;}
    const matches=searchIndex.filter(x=>norm(`${x.title} ${x.text}`).includes(nq)||nq.split(/\s+/).every(w=>norm(`${x.title} ${x.text}`).includes(w))).slice(0,9);
    results.innerHTML=matches.length?matches.map((x,i)=>`<button class="result" data-result="${i}"><strong>${highlight(x.title,q)}</strong><span>${escapeHtml(x.type)} · ${highlight(x.text.slice(0,105),q)}</span></button>`).join(""):'<div class="result"><strong>Sin coincidencias</strong><span>Prueba con otra palabra: llantas, Samsara, No Show, TIA…</span></div>';
    results.classList.add("show");
    $$("[data-result]",results).forEach(b=>b.addEventListener("click",()=>{matches[Number(b.dataset.result)].action();results.classList.remove("show");}));
  }
  input.addEventListener("input",run);
  $("#searchBtn").addEventListener("click",run);
  document.addEventListener("click",e=>{if(!e.target.closest(".search-shell"))results.classList.remove("show")});
}

function bindTheme(){
  const saved=localStorage.getItem(STORAGE.theme);
  const preferred=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  setTheme(saved||preferred);
  $("#themeToggle").addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
}
function setTheme(theme){
  document.documentElement.dataset.theme=theme;localStorage.setItem(STORAGE.theme,theme);
  $("#themeToggle").textContent=theme==="dark"?"☀":"☾";$("#themeToggle").setAttribute("aria-label",theme==="dark"?"Activar modo claro":"Activar modo oscuro");
}

function bindAccordion(){
  $$(".accordion-btn").forEach(b=>b.addEventListener("click",()=>{
    const item=b.closest(".accordion-item"),open=item.classList.toggle("open");b.setAttribute("aria-expanded",open);
  }));
}
function observeRules(){
  if(!("IntersectionObserver" in window)) return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("visible");
    });
  },{threshold:.08});
  $$(".rule").forEach(el=>obs.observe(el));
}
function bindNavigation(){
  $("#backTop").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  window.addEventListener("scroll",()=>$("#backTop").classList.toggle("show",scrollY>520),{passive:true});
  $$("[data-nav]").forEach(b=>b.addEventListener("click",()=>activateTab(b.dataset.nav,b.dataset.scroll||"")));
}

function init(){
  renderQuickCards();
  renderChecklist();
  renderRules();
  renderGallery();
  renderVideos();
  bindTabs();
  bindFilters();
  bindGalleryFilters();
  bindSearch();
  bindTheme();
  bindAccordion();
  bindNavigation();
  observeRules();
}
document.addEventListener("DOMContentLoaded",init);
