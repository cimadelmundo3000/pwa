importScripts('js/sw-utils.js');
// APP SHELL
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
const STATIC_CACHE = 'static-v1';
const INMUTABLE_CACHE = 'inmutable-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const APP_SHELL_ESTATICO = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/scripts.js',
    '/js/sw-utils.js',
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/img3.jpg',
    '/img/img4.jpg'
]

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap'
]

// INSTALACION DE CACHE
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
self.addEventListener('install',event=>{
    // Instalacion en Cache
    const INSTALL_SHELL_ESTATICO = caches.open(STATIC_CACHE).then(cache=>{return cache.addAll(APP_SHELL_ESTATICO);});
    const INSTALL_SHELL_INMUTABLE = caches.open(INMUTABLE_CACHE).then(cache=>{return cache.addAll(APP_SHELL_INMUTABLE);});
    // Activacion de Service Worker
    const ACTIVATION = new Promise((resolve, reject)=>{self.skipWaiting();resolve();});
    // Inicio de Instalacion en Cache
    event.waitUntil(Promise.all([INSTALL_SHELL_ESTATICO, INSTALL_SHELL_INMUTABLE, ACTIVATION]));
});

// LIMPIEZA DE CACHE
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
self.addEventListener('activate',event=>{
    const DELETING = caches.keys().then(key=>{ 
        key.forEach(k => {if(k!=STATIC_CACHE && k.includes('static')){return caches.delete(k);} });
    });
    event.waitUntil(DELETING);
});

// ESTRATEGIA DE CACHE (Caché Only)
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
self.addEventListener('fetch',e=>{
    const MYRESPONSE = caches.match(e.request).then(resp=>{
        if(resp){
            return resp;
        }else{
            // Update de Caché Dinámico.
            console.log('Adding Dynamic URL:', e.request.url);
            return fetch(e.request).then(newURLtoCache=>{
                return updatingDynamicCache(DYNAMIC_CACHE, e.request, newURLtoCache);
            })
        }
    })
    e.respondWith(MYRESPONSE);
});