function renderQuickCards(){
  const grid=$("#quickGrid");
  const visible=quickCards.filter(x=>state.filter==="all"||x.category===state.filter);
  grid.innerHTML=visible.map(x=>`
    <article class="quick-card ${x.feature?"feature":""}" data-id="${x.id}">
      <div class="ico">${x.icon}</div>
      <strong>${escapeHtml(x.title)}</strong>
      <div class="desc">${escapeHtml(x.desc)}</div>
      <span class="tag">${escapeHtml(x.tag)}</span>
    </article>`).join("");
  $$(".quick-card").forEach(card=>{
    card.addEventListener("click",()=>{
      const item=quickCards.find(x=>x.id===card.dataset.id);
      if(item) handleQuickAction(item);
    });
  });
}
function handleQuickAction(item){
  if(item.topic) openTopic(item.topic);
  else if(item.scroll){activateTab("guide",item.scroll)}
  else if(item.tab) activateTab(item.tab);
}

function renderChecklist(){
  const saved=JSON.parse(localStorage.getItem(STORAGE.checklist)||"{}");
  $("#checklistList").innerHTML=checklistItems.map((text,i)=>`
    <label class="check-item ${saved[i]?"done":""}" data-check="${i}">
      <input type="checkbox" ${saved[i]?"checked":""}>
      <span class="check-circle">✓</span><span>${escapeHtml(text)}</span>
    </label>`).join("");
  $$("#checklistList input").forEach(input=>input.addEventListener("change",()=>{
    const label=input.closest(".check-item"); label.classList.toggle("done",input.checked);
    persistChecklist();updateProgress();
  }));
  updateProgress();
}
function persistChecklist(){
  const obj={}; $$("#checklistList input").forEach((input,i)=>obj[i]=input.checked);
  localStorage.setItem(STORAGE.checklist,JSON.stringify(obj));
}
function updateProgress(){
  const total=checklistItems.length;
  const done=$$("#checklistList input:checked").length;
  const pct=Math.round((done/total)*100);
  $("#progressText").textContent=`${done} de ${total} completados`;
  $("#progressBar").style.width=`${pct}%`;
  $("#progressBar").setAttribute("aria-valuenow",pct);
}
function renderRules(){
  $("#rulesList").innerHTML=rules.map(([ico,text],i)=>`
    <div class="rule visible" style="animation-delay:${i*.055}s">
      <div class="rule-ico">${ico}</div>
      <span>${escapeHtml(text)}</span>
    </div>`).join("");
}
function renderGallery(){
  const visible=infographics.filter(x=>state.infoFilter==="all"||x.category===state.infoFilter);
  $("#gallery").innerHTML=visible.map(x=>`
    <button class="media-card" type="button" data-image="${x.id}" data-category="${x.category||"general"}">
      <div class="media-thumb">
        <img src="${x.src}" alt="${escapeHtml(x.title)}" loading="lazy">
        <span class="zoom-badge">Ampliar</span>
      </div>
      <div class="media-copy">
        <strong>${escapeHtml(x.title)}</strong>
        <span>${escapeHtml(x.caption)}</span>
      </div>
    </button>`).join("");

  $("#galleryStatus").textContent=`Mostrando ${visible.length} de ${infographics.length} materiales`;

  $$("[data-image]").forEach(b=>{
    b.addEventListener("click",()=>{
      openMedia("image",infographics.find(x=>x.id===b.dataset.image));
    });
  });
}
function renderVideos(){
  $("#videosGrid").innerHTML=videos.map(x=>`
    <button class="media-card video-card" data-video="${x.id}">
      <div class="media-thumb">
        <img src="${x.poster}" alt="Vista previa de ${escapeHtml(x.title)}" loading="lazy">
        <span class="video-duration">${escapeHtml(x.duration||"")}</span>
      </div>
      <div class="media-copy"><strong>${escapeHtml(x.title)}</strong><span>${escapeHtml(x.caption)}</span></div>
    </button>`).join("");
  $$("[data-video]").forEach(b=>b.addEventListener("click",()=>openMedia("video",videos.find(x=>x.id===b.dataset.video))));
}
