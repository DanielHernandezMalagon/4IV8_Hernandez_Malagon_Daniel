const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// GET: Obtener todos los productos formateados para app.js
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        
        // Enviamos el formato que app.js espera: { data: [], count: 0 }
        res.json({
            data: rows,
            count: rows.length
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ data: [], count: 0, error: error.message });
    }
});

// POST: Agregar producto
router.post('/', async (req, res) => {
    const { nombre, precio, stock } = req.body;
    try {
        await db.query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', 
        [nombre, precio, stock || 0]);
        res.status(201).json({ message: 'Producto creado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar' });
    }
});
// DELETE: Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Intentamos eliminar el producto
        const [result] = await db.query('DELETE FROM productos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        // Si el producto tiene compras asociadas, MySQL no dejará borrarlo por la FK
        res.status(500).json({ 
            error: 'No se puede eliminar el producto porque tiene compras relacionadas.' 
        });
    }
});
module.exports = router;