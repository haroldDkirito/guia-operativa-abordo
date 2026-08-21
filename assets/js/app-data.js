"use strict";

const STORAGE = {
  theme:"abordo-guide-theme",
  checklist:"abordo-guide-checklist-v8"
};

const quickCards = [
  {id:"antes",icon:"1",title:"Antes de salir",desc:"Asistencia, unidad, documentos, Samsara y Nexus App.",category:"antes",feature:true,tag:"Preparación",topic:"antes"},
  {id:"durante",icon:"2",title:"Durante el servicio",desc:"Confirmación, comunicación, retrasos, incidencias y evidencias.",category:"durante",feature:true,tag:"Ejecución",topic:"durante"},
  {id:"casos",icon:"3",title:"Casos clave y cierre",desc:"No Show, objetos, formatos, combustible, TIA y entrega.",category:"casos",feature:true,tag:"Resolución",topic:"casos"},
  {id:"checklist-card",icon:"✓",title:"Checklist final",desc:"Verifica cinco puntos antes de iniciar o cerrar la operación.",category:"checklist",tag:"Control",scroll:"checklist"},
  {id:"reglas-card",icon:"!",title:"Puntos no negociables",desc:"Conductas prohibidas y reglas que protegen la operación.",category:"reglas",tag:"Seguridad",scroll:"reglas"},
  {id:"infografias-card",icon:"▧",title:"Infografías y avisos",desc:"Material visual de seguridad para consulta inmediata.",category:"media",tag:"Material visual",tab:"media"},
  {id:"videos-card",icon:"▶",title:"Videos de capacitación",desc:"Consulta contenidos visuales de apoyo al operador.",category:"media",tag:"Capacitación",tab:"videos"}
];

const topics = {
  antes:{
    title:"Antes de salir",
    intro:"Completa esta secuencia antes de comenzar la operación.",
    steps:[
      ["Repórtate con Mesa de Control","Confirma tu llegada y recibe las indicaciones del turno."],
      ["Registra tu asistencia","Realiza el registro establecido antes de salir."],
      ["Recibe material, unidad y documentos","Verifica llaves, documentación y materiales requeridos."],
      ["Revisa la unidad","Comprueba limpieza, combustible y condiciones visibles de seguridad."],
      ["Descarga y revisa tus servicios","Valida Nexus App, horarios, rutas y operaciones asignadas."],
      ["Valida herramientas","Confirma que Samsara y las aplicaciones operativas estén disponibles en el celular corporativo."]
    ]
  },
  durante:{
    title:"Durante el servicio",
    intro:"La prioridad es operar con seguridad, comunicar a tiempo y dejar evidencia cuando corresponda.",
    steps:[
      ["Confirma información antes de moverte","Revisa horario, hotel, pasajero, ruta y observaciones."],
      ["Mantén comunicación operativa","Usa exclusivamente los canales oficiales para dudas o cambios."],
      ["Reporta retrasos e incidencias","Informa de inmediato; no esperes al cierre del servicio."],
      ["Conduce dentro de los límites","Samsara registra ubicación, velocidad y eventos de seguridad."],
      ["No improvises cambios","Si la información es contradictoria, confirma con Mesa de Control antes de modificar la operación."]
    ]
  },
  casos:{
    title:"Casos clave y cierre",
    intro:"Ante casos especiales, documenta y sigue el canal definido antes de tomar una decisión.",
    steps:[
      ["No Show","Reporta por el canal oficial y espera instrucción antes de retirarte."],
      ["Objetos olvidados","Informa de inmediato y sigue el protocolo de resguardo/entrega."],
      ["Combustible y TIA","Valida los controles operativos antes del cierre de turno."],
      ["Formatos y evidencias","Entrega completos los formatos requeridos y conserva la evidencia solicitada."],
      ["Entrega de unidad","Reporta condiciones relevantes y realiza el cierre conforme a las indicaciones."]
    ]
  }
};

const checklistItems = [
  "Uniforme limpio y completo, gafete visible y presentación personal adecuada.",
  "Celular corporativo disponible, cargado y con acceso a las aplicaciones requeridas.",
  "Unidad verificada: limpieza, combustible, documentación y condiciones de seguridad.",
  "Servicios descargados y revisados antes de iniciar la operación.",
  "Formatos y materiales operativos disponibles."
];

const rules = [
  ["💸","No pedir ni promover propinas."],
  ["🎟️","No vender ni promocionar tours."],
  ["🏨","No ingresar a hoteles sin motivo operativo."],
  ["🧊","No utilizar hieleras."],
  ["💬","No enviar stickers, memes o mensajes ajenos a la operación."],
  ["🚦","Respetar límites de velocidad y restricciones operativas."]
];

const infographics = [
  {id:"personal",title:"Apoyo con transporte de personal",caption:"Al solicitar apoyo, incluye hora de cita y ubicación en tiempo real.",src:"assets/img/aviso-transporte-personal.jpg",category:"operacion"},
  {id:"llantas",title:"Presión de llantas",caption:"Revisión preventiva de presión antes de cada servicio.",src:"assets/img/presion-llantas.jpg",category:"seguridad"},
  {id:"testigos",title:"Testigos de alerta",caption:"Señales rojas de emergencia y amarillas de prevención.",src:"assets/img/testigos-alerta.jpg",category:"seguridad"},
  {id:"plumas",title:"Alto total en plumas de acceso",caption:"Detente por completo y cuenta antes de avanzar.",src:"assets/img/alto-plumas-acceso.jpg",category:"seguridad"},
  {id:"no-show",title:"Protocolo No Show",caption:"Tiempos de cortesía, evidencia, GPS y requisitos para documentar correctamente un No Show.",src:"assets/img/protocolo-no-show.jpg",category:"operacion"},
  {id:"lomas-cupones",title:"Cupones Lomas Travel",caption:"Recordatorio para solicitar y validar los cupones de Lomas Travel en llegadas y salidas.",src:"assets/img/cupones-lomas-travel.jpg",category:"agencias"},
  {id:"uniformes",title:"Uniformes obligatorios",caption:"Lineamientos de uniforme para Unidades B y Unidades N, gafete y presentación personal.",src:"assets/img/uniformes-obligatorios.jpg",category:"presentacion"},
  {id:"alcoholemia",title:"Alcoholimetría — cero tolerancia",caption:"Recordatorio de cero tolerancia al alcohol para la conducción de unidades.",src:"assets/img/alcoholemia-cero-tolerancia.jpg",category:"seguridad"},
  {id:"fin-turno",title:"Al finalizar tu turno",caption:"Carga de gasolina y Gas LP, y procedimiento cuando el tanque de gasolina ya está lleno.",src:"assets/img/finalizar-turno-combustible.jpg",category:"operacion"},
  {id:"comunicacion",title:"Comunicación operativa",caption:"Orden correcto de comunicación: operador, monitorista y supervisor de monitoreo cuando aplique.",src:"assets/img/comunicacion-operativa.jpg",category:"operacion"},
  {id:"playacar",title:"Velocidad máxima en Playacar",caption:"Recordatorio de velocidad máxima de 30 km/h y respeto a los sentidos de circulación.",src:"assets/img/velocidad-playacar.jpg",category:"seguridad"},
  {id:"tia",title:"Portación de TIA",caption:"La tarjeta de identificación aeroportuaria forma parte del uniforme y debe portarse conforme al procedimiento.",src:"assets/img/portacion-tia.jpg",category:"aeropuerto"},
  {id:"salidas",title:"Servicios de salida",caption:"Validación de asignación, protocolo No Show, identificación de pasajeros y terminal correcta.",src:"assets/img/servicios-de-salida.jpg",category:"operacion"}
];

const videos = [
  {id:"nexus-app",title:"NEXUS — Uso de la app de servicios",caption:"Flujo visual para aceptar el servicio, reportar estados y realizar acciones operativas como No Show, En camino y Llegué.",poster:"assets/img/poster-nexus-app.jpg",src:"assets/video/nexus-app-servicios.mp4",duration:"1:56"},
  {id:"amstar-on-demand",title:"AMSTAR — On Demand",caption:"Consulta y actualización de servicios On Demand, con cambios de estado y confirmaciones de llegada.",poster:"assets/img/poster-amstar-on-demand.jpg",src:"assets/video/amstar-on-demand.mp4",duration:"1:39"}
];

const searchIndex = [
  ...quickCards.map(x=>({type:"Acceso",title:x.title,text:x.desc,action:()=>handleQuickAction(x)})),
  ...Object.entries(topics).map(([id,x])=>({type:"Guía",title:x.title,text:[x.intro,...x.steps.flat()].join(" "),action:()=>openTopic(id)})),
  ...infographics.map(x=>({type:"Infografía",title:x.title,text:x.caption,action:()=>openMedia("image",x)})),
  ...videos.map(x=>({type:"Video",title:x.title,text:x.caption,action:()=>openMedia("video",x)})),
  ...rules.map(x=>({type:"Regla",title:"Punto no negociable",text:x[1],action:()=>activateTab("guide","reglas")})),
  {type:"Contacto",title:"Mesa de Control",text:"+52 1 998 109 8697 WhatsApp Mesa de Control apoyo operativo",action:()=>window.open("https://wa.me/5219981098697?text=Hola%2C%20Mesa%20de%20Control.%20Requiero%20apoyo%20con%20la%20operaci%C3%B3n.","_blank","noopener")}
];

const state = {filter:"all",infoFilter:"all"};
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

function escapeHtml(str){return String(str??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function norm(str){return String(str||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}
function highlight(text,q){if(!q)return escapeHtml(text);const safe=escapeHtml(text);const words=q.trim().split(/\s+/).filter(Boolean).map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));if(!words.length)return safe;return safe.replace(new RegExp(`(${words.join("|")})`,"gi"),"<mark>$1</mark>");}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),1900);}
