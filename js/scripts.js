var url = window.location.href;
var serviceWorkerLocation = '/pwa/sw.js';
if(navigator.serviceWorker){
    // Localizacion del SW en produccion
    if(url.includes('localhost')){serviceWorkerLocation='/sw.js';}
    // Registro del SW
    navigator.serviceWorker.register(serviceWorkerLocation);
}

let d = document;

d.getElementById('btn').addEventListener('click',()=>{

    d.getElementById('container').innerHTML=Math.round(Math.random() * 1000000);


})