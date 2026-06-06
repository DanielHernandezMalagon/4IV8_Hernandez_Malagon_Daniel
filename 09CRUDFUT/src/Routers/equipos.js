const express = require('express');
const router = express.Router();
const db = require('../DB/database');

//Obtener todos los equipos
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                e.id, 
                e.nombre, 
                e.ciudad, 
                e.estadio,
                (SELECT COUNT(*) FROM partidos WHERE (id_equipo_local = e.id AND goles_local > goles_visitante) OR (id_equipo_visitante = e.id AND goles_visitante > goles_local)) * 3 +
                (SELECT COUNT(*) FROM partidos WHERE (id_equipo_local = e.id OR id_equipo_visitante = e.id) AND goles_local = goles_visitante AND (SELECT COUNT(*) FROM partidos p2 WHERE p2.id = partidos.id) > 0) * 1 AS puntos
            FROM equipos e
            ORDER BY puntos DESC, nombre ASC
        `;
        const [rows] = await db.query(query);
        res.json({ data: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Agregar un equipo
router.post('/', async (req, res) => {
    const { nombre, ciudad, estadio } = req.body;
    try {
        await db.query(
            'INSERT INTO equipos (nombre, ciudad, estadio) VALUES (?, ?, ?)',
            [nombre, ciudad, estadio]
        );
        res.status(201).json({ message: 'Equipo registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Eliminar equipo
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM equipos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;