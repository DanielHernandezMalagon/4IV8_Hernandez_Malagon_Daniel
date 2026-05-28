/*
Vamos a tener una estructura mediante la cual implementamos el modelo vista controlador, en donde a partir del uso de una API podemos consumir los elementos por parte del front para obtener sus datos como petición o como respuesta del back
*/

//panel de utilidades compartidas
const apiMetodo = document.getElementById('api-metodo');
const apiURL = document.getElementById('api-url');
const apiCodigo = document.getElementById('api-codigo');
const notificacionDiv = document.getElementById('notificacion');

//vamos a crear la api fetch para podernos conectar

async function fetchAPI(url, opciones = {}) {
    //primero vamos a definir el metodo para la obtención de rutas
    const method = opciones.method || 'GET';

    apiMetodo.textContent = method;
    apiMetodo.className = `badge badge-${method.toLowerCase()}`;
    apiURL.textContent = url;
    apiCodigo.textContent = '...';
    apiCodigo.className = `badge badge-natural`;

    try{

        const respuesta = await fetch(url, opciones);
        apiCodigo.textContent = `${respuesta.status}`;
        apiCodigo.className = `badge ${respuesta.ok ? 'badge-success' : 'badge-error'}`;

        const datos = await respuesta.json();
        if(!respuesta.ok){
            throw new Error(datos.message || `Error ${respuesta.status}`);
        }
        return datos;
    }catch(error){
        if(apiCodigo.textContent === '...'){
            apiCodigo.textContent = 'Error';
            apiCodigo.className = 'badge badge-error';
        }
        throw error;
    }
}

//todos los datos del usuario
const formUsuario = document.getElementById('form-usurio');
const inputUsuarioId = document.getElementById('usuario-id');
const inputUsuarioNombre = document.getElementById('usuario-nombre');
const inputUsuarioEmail = document.getElementById('usuario-email');
const TituloUsuario = document.getElementById('form-titulo-usuario');
const btnGuardarUsuario = document.getElementById('btn-guardar-usuario');
const btnCancelarUsuario = document.getElementById('btn-cancelar-usuario');
const tbodyUsuarios = document.getElementById('tbody-usuarios');
const tablaUsuarios = document.getElementById('tabla-usuarios');
const cargaUsuarios = document.getElementById('carga-usuarios');
const contadorUsuarios = document.getElementById('contador-usuarios');
const errorUsuarioNombre = document.getElementById('error-usuario-nombre');
const errorUsuarioEmail = document.getElementById('error-usuario-email');

async function cargarUsuarios() {
    try{

        const resp = await fetchAPI('/api/usuarios');
        cargaUsuarios.style.display = 'none';

        if(res.data.length === 0){
            tablaUsuarios.style.display = 'none';
            cargaUsuarios.textContent = 'No hay usuarios solo juguito contigo';
            cargaUsuarios.style.display = 'block';
        }else{
            tablaUsuarios.style.display = 'table';
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${u.id}</td>
                
            `
        }
    }
    
}