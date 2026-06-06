const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. MIDDLEWARES (Configuraciones base) ---

// Permite que el frontend se comunique con el backend
app.use(cors());

// Permite que el servidor entienda datos JSON
app.use(express.json());

// Permite leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// Logger para ver qué pasa en la consola (peticiones)
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Servir los archivos de la carpeta public (HTML, CSS, JS del cliente)
app.use(express.static(path.join(__dirname, '..', 'public')));


// --- 2. RUTAS DE LOS RECURSOS (MVC) ---

const usuariosRouter = require('./Routers/usuarios');
const productosRouter = require('./Routers/productos');
const comprasRouter = require('./Routers/compras');

app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/compras', comprasRouter);


// --- 3. DOCUMENTACIÓN Y MANEJO DE ERRORES ---

// Ruta base para probar que el servidor sirve
app.get('/api', (req, res) => {
    res.json({
        status: 'success',
        message: 'API del Sistema de Compras Activa',
        version: '1.0.0'
    });
});

// Manejador para rutas NO encontradas (404)
// Corregido para evitar el error de Path-to-Regexp
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Ruta no encontrada'
    });
});

// Manejador de errores generales del servidor
app.use((err, req, res, next) => {
    console.error('Error interno:', err.message);
    res.status(500).json({
        status: 'error',
        message: 'Ocurrió un error en el servidor'
    });
});


// --- 4. LANZAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`\n✅ Servidor listo y escuchando en el puerto ${PORT}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`🚀 Presiona Ctrl + C para detenerlo\n`);
});