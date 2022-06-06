let url = window.location.href;
let w = window;
let contenedorData='';
let serviceWorkerLocation = '/pwa/sw.js';
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

const consultaRemota = async () => {
    /*
    contenedorData='';
    const request = await fetch(
        "http://tangerix.com:3000/lectura"
    );
    // console.log(request);
    const response = await request.json();
    response.data.forEach(i => {
        contenedorData += `${i.nombre} - ${i.edad}<br>`;
    });
    document.querySelector('.contenedor-data').innerHTML=contenedorData;
    document.querySelector('.ori span').innerHTML="Base de Datos Remota ;)";*/
    const request = await fetch(
        "https://tangerix.com:3000/" 
    );
    const response = await request.json();
    console.log(response);
}






// BD Local
let db = new Dexie("dbLocal");
// Indexacion
//////////////////////////////////////////////////////
db.version(1).stores({familia: `++id,edad`});
// Apertura de Base de Datos
//////////////////////////////////////////////////////
db.open();
// Consulta de Datos.
//////////////////////////////////////////////////////
function consultaLocal(){
    const query = db.familia.where("edad").aboveOrEqual(5).reverse().sortBy('nombre');
    query.then(result=>{
        if(result.length!=0){
            contenedorData='';
            result.forEach(i => {
                contenedorData += `${i.nombre} - ${i.edad}<br>`;
            });
            document.querySelector('.contenedor-data').innerHTML=contenedorData;
            document.querySelector('.ori span').innerHTML="Base de Datos Local :)";
        }else{
            db.familia.add({nombre:"Angel",edad:39})
            db.familia.add({nombre:"Janeth",edad:39})
            db.familia.add({nombre:"Matias",edad:10})
            db.familia.add({nombre:"Eli",edad:5})
            consultaLocal();
        }  
    });
}
// consultaLocal();



// Control de Conexión
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
function conectionChecker(){
    if(navigator.onLine){
        document.querySelector('p').innerHTML="<span class='online'>En Linea</span>";
        consultaRemota();
    }else{
        document.querySelector('p').innerHTML="<span class='offline'>Fuera de Linea</span>";
        consultaLocal();
    }
    return false;
}
w.addEventListener('online', conectionChecker, false);
w.addEventListener('offline', conectionChecker, false);
conectionChecker();

//////////// USO DE MEMORIA


navigator.storage.estimate().then(function(estimate) {
      document.querySelector('.uso').innerHTML=(Math.round((estimate.usage/1000).toFixed(2)))+' Bites';
});