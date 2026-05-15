const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

//conexion a mysql
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'pnt_practica1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//middleware para leer json
app.use(express.json());

//servir archivos estaticos
app.use(express.static('public'));

//ruta principal
app.get('/', (req, res) => {
    res.send('Servidor funcionando con Express');
});

//inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});