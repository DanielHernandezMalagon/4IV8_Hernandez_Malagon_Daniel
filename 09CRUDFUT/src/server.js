const express = require('express');
const cors = require('cors');
const app = express(); // <--- ESTA ES LA LÍNEA QUE TE DABA EL ERROR

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

// Importar Rutas
const equiposRoutes = require('./Routers/equipos');
const jugadoresRoutes = require('./Routers/jugadores');
const fichajesRoutes = require('./Routers/fichajes');
const partidosRoutes = require('./Routers/partidos');

// Usar Rutas
app.use('/api/equipos', equiposRoutes);
app.use('/api/jugadores', jugadoresRoutes);
app.use('/api/fichajes', fichajesRoutes);
app.use('/api/partidos', partidosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor de LaLiga corriendo en http://localhost:${PORT}`);
});