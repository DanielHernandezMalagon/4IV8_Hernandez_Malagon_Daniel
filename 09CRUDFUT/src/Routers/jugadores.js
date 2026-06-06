const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// Obtener todos los jugadores con su equipo
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT j.*, e.nombre AS equipo_actual 
            FROM jugadores j
            LEFT JOIN equipos e ON j.id_equipo = e.id
        `;
        const [rows] = await db.query(query);
        res.json({ data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Registrar nuevo jugador
router.post('/', async (req, res) => {
    const { nombre, posicion, nacionalidad } = req.body;
    try {
        await db.query(
            'INSERT INTO jugadores (nombre, posicion, nacionalidad) VALUES (?, ?, ?)',
            [nombre, posicion, nacionalidad]
        );
        res.status(201).json({ message: 'Jugador creado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar jugador
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM jugadores WHERE id = ?', [req.params.id]);
        res.json({ message: 'Jugador eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;