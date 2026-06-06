const API_URL = 'http://localhost:3000/api';

// 1. MANEJO DE VISTAS
function mostrarSeccion(seccion) {
    document.querySelectorAll('.modulo').forEach(sec => sec.style.display = 'none');
    document.getElementById(`sec-${seccion}`).style.display = 'block';
    
    if (seccion === 'jugadores') cargarJugadores();
    if (seccion === 'equipos') cargarEquipos();
    if (seccion === 'fichajes') { cargarFichajes(); cargarSelects(); }
    if (seccion === 'partidos') { cargarPartidos(); cargarSelects(); }
    if (seccion === 'clasificacion') cargarClasificacion();
}

// 2. CARGA DE DATOS (READ)
async function cargarJugadores() {
    const res = await fetch(`${API_URL}/jugadores`);
    const { data } = await res.json();
    document.querySelector('#tabla-jugadores tbody').innerHTML = data.map(j => `
        <tr>
            <td>${j.id}</td><td>${j.nombre}</td><td>${j.posicion}</td><td>${j.nacionalidad}</td>
            <td><strong>${j.equipo_actual || 'Agente Libre'}</strong></td>
            <td><button onclick="eliminar('jugadores', ${j.id})">Eliminar</button></td>
        </tr>
    `).join('');
}

async function cargarEquipos() {
    const res = await fetch(`${API_URL}/equipos`);
    const { data } = await res.json();
    document.querySelector('#tabla-equipos tbody').innerHTML = data.map(e => `
        <tr>
            <td>${e.id}</td><td>${e.nombre}</td><td>${e.ciudad}</td><td>${e.estadio}</td>
            <td><button onclick="verPlantilla('${e.nombre}')">Ver Plantilla</button></td>
        </tr>
    `).join('');
}

async function cargarClasificacion() {
    const res = await fetch(`${API_URL}/equipos`);
    const { data } = await res.json();
    // Los datos ya vienen ordenados por puntos desde el Backend
    document.querySelector('#tabla-puntos tbody').innerHTML = data.map((e, index) => `
        <tr>
            <td><strong>${index + 1}º</strong></td>
            <td>${e.nombre}</td>
            <td><b style="color: #2ecc71;">${e.puntos || 0} pts</b></td>
        </tr>
    `).join('');
}

async function cargarFichajes() {
    const res = await fetch(`${API_URL}/fichajes`);
    const { data } = await res.json();
    document.querySelector('#tabla-fichajes tbody').innerHTML = data.map(f => `
        <tr><td>${f.jugador}</td><td>${f.equipo}</td><td>€${f.monto_fichaje}</td><td>${new Date(f.fecha_contrato).toLocaleDateString()}</td></tr>
    `).join('');
}

async function cargarPartidos() {
    const res = await fetch(`${API_URL}/partidos`);
    const { data } = await res.json();
    document.querySelector('#tabla-partidos tbody').innerHTML = data.map(p => `
        <tr>
            <td>${new Date(p.fecha_partido).toLocaleDateString()}</td>
            <td>${p.local}</td><td><strong>${p.goles_local} - ${p.goles_visitante}</strong></td><td>${p.visitante}</td>
        </tr>
    `).join('');
}

// 3. SELECTS DINÁMICOS
async function cargarSelects() {
    const resJ = await fetch(`${API_URL}/jugadores`);
    const dataJ = await resJ.json();
    const resE = await fetch(`${API_URL}/equipos`);
    const dataE = await resE.json();

    document.getElementById('sel-jugador').innerHTML = '<option value="">Selecciona Jugador...</option>' + 
        dataJ.data.map(j => `<option value="${j.id}">${j.nombre}</option>`).join('');

    const equipoOptions = '<option value="">Selecciona Equipo...</option>' + 
        dataE.data.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('');
    
    document.getElementById('sel-equipo').innerHTML = equipoOptions;
    if(document.getElementById('p-local')) document.getElementById('p-local').innerHTML = equipoOptions;
    if(document.getElementById('p-visitante')) document.getElementById('p-visitante').innerHTML = equipoOptions;
}

// 4. ENVÍO DE DATOS CON VALIDACIONES
document.getElementById('form-jugadores').onsubmit = async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('j-nombre').value;
    const res = await fetch(`${API_URL}/jugadores`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nombre: nombre,
            posicion: document.getElementById('j-posicion').value,
            nacionalidad: document.getElementById('j-nacionalidad').value
        })
    });
    if(!res.ok) alert(`❌ Error: El jugador "${nombre}" ya existe.`);
    else { e.target.reset(); cargarJugadores(); }
};

document.getElementById('form-fichajes').onsubmit = async (e) => {
    e.preventDefault();
    const monto = document.getElementById('f-monto').value;
    if(monto < 0) return alert("❌ El monto no puede ser negativo.");

    const res = await fetch(`${API_URL}/fichajes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id_jugador: document.getElementById('sel-jugador').value,
            id_equipo: document.getElementById('sel-equipo').value,
            monto_fichaje: monto
        })
    });
    if(res.ok) { alert("✅ Fichaje completado"); e.target.reset(); cargarFichajes(); cargarJugadores(); }
    else alert("❌ Error al procesar el fichaje.");
};

document.getElementById('form-partidos').onsubmit = async (e) => {
    e.preventDefault();
    const gL = document.getElementById('p-goles-l').value;
    const gV = document.getElementById('p-goles-v').value;
    const local = document.getElementById('p-local').value;
    const visitante = document.getElementById('p-visitante').value;

    if(local === visitante) return alert("❌ Un equipo no puede jugar contra sí mismo.");
    if(gL < 0 || gV < 0) return alert("❌ Los goles no pueden ser negativos.");

    await fetch(`${API_URL}/partidos`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id_equipo_local: local,
            id_equipo_visitante: visitante,
            goles_local: gL,
            goles_visitante: gV
        })
    });
    e.target.reset(); cargarPartidos();
};

// 5. UTILIDADES
async function verPlantilla(nombreEquipo) {
    const res = await fetch(`${API_URL}/jugadores`);
    const { data } = await res.json();
    const filtrados = data.filter(j => j.equipo_actual === nombreEquipo);
    alert(`Plantilla de ${nombreEquipo}:\n` + (filtrados.length > 0 ? filtrados.map(j => `- ${j.nombre} (${j.posicion})`).join('\n') : "No hay jugadores registrados."));
}

async function eliminar(ruta, id) {
    if(confirm('¿Deseas eliminar este registro?')) {
        await fetch(`${API_URL}/${ruta}/${id}`, { method: 'DELETE' });
        cargarJugadores();
    }
}

window.onload = () => mostrarSeccion('jugadores');