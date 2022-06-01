var url = window.location.href;
var serviceWorkerLocation = '/pwa/sw.js';
if(navigator.serviceWorker){
    // Localizacion del SW en produccion
    if(url.includes('localhost')){serviceWorkerLocation='/sw.js';}
    // Registro del SW
    navigator.serviceWorker.register(serviceWorkerLocation);
}