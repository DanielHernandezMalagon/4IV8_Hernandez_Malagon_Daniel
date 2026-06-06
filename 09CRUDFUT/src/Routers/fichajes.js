const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// Registrar un fichaje y mover al jugador
router.post('/', async (req, res) => {
    const { id_jugador, id_equipo, monto_fichaje } = req.body;
    const fecha_hoy = new Date().toISOString().split('T')[0];

    try {
        // 1. Guardar en el historial de fichajes
        await db.query(
            'INSERT INTO fichajes (id_jugador, id_equipo, monto_fichaje, fecha_contrato) VALUES (?, ?, ?, ?)',
            [id_jugador, id_equipo, monto_fichaje, fecha_hoy]
        );

        // 2. Actualizar la tabla de jugadores (el traspaso real)
        await db.query(
            'UPDATE jugadores SET id_equipo = ? WHERE id = ?',
            [id_equipo, id_jugador]
        );

        res.status(201).json({ message: 'Fichaje exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Obtener historial de fichajes
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT f.*, j.nombre AS jugador, e.nombre AS equipo 
            FROM fichajes f
            JOIN jugadores j ON f.id_jugador = j.id
            JOIN equipos e ON f.id_equipo = e.id
            ORDER BY f.id DESC
        `;
        const [rows] = await db.query(query);
        res.json({ data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;