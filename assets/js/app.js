(()=>{
  const files=["assets/js/app-data.js","assets/js/app-render.js","assets/js/app-interactions.js"];
  let i=0;
  const next=()=>{
    if(i>=files.length){
      if(document.readyState!=="loading" && typeof init==="function") init();
      return;
    }
    const s=document.createElement("script");
    s.src=files[i++];
    s.async=false;
    s.onload=next;
    s.onerror=()=>console.error("No se pudo cargar",s.src);
    document.head.appendChild(s);
  };
  next();
})();
