const express = require('express');
const router = express.Router();
const db = require('../DB/database');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT p.*, e1.nombre AS local, e2.nombre AS visitante 
            FROM partidos p
            JOIN equipos e1 ON p.id_equipo_local = e1.id
            JOIN equipos e2 ON p.id_equipo_visitante = e2.id
            ORDER BY p.fecha_partido DESC
        `;
        const [rows] = await db.query(query);
        res.json({ data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { id_equipo_local, id_equipo_visitante, goles_local, goles_visitante } = req.body;
    const ahora = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato MySQL DATETIME

    try {
        await db.query(
            'INSERT INTO partidos (id_equipo_local, id_equipo_visitante, goles_local, goles_visitante, fecha_partido) VALUES (?, ?, ?, ?, ?)',
            [id_equipo_local, id_equipo_visitante, goles_local, goles_visitante, ahora]
        );
        res.status(201).json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;