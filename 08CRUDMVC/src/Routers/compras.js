const express = require('express');
const router = express.Router();
const db = require('../DB/database');

// ==========================================
// 1. GET: Listar todas las compras (Historial)
// ==========================================
router.get('/', async (req, res) => {
    try {
        // Usamos JOIN para traer nombres en lugar de IDs y calculamos el total
        const query = `
            SELECT 
                c.id, 
                u.nombre AS usuario_nombre, 
                p.nombre AS producto_nombre, 
                p.precio AS producto_precio, 
                c.cantidad, 
                (p.precio * c.cantidad) AS total, 
                c.fecha_compra 
            FROM compras c
            JOIN usuarios u ON c.id_usuario = u.id
            JOIN productos p ON c.id_producto = p.id
            ORDER BY c.fecha_compra DESC
        `;
        const [rows] = await db.query(query);
        
        // Enviamos 'data' para que app.js pueda leer .length sin errores
        res.json({ 
            data: rows, 
            count: rows.length 
        });
    } catch (error) {
        console.error('Error al cargar historial:', error.message);
        res.status(500).json({ data: [], error: error.message });
    }
});

// ==========================================
// 2. GET: Ver compras de un usuario específico
// (Soluciona el error 404 del botón verde "Compras")
// ==========================================
router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Buscamos el nombre del usuario
        const [usuario] = await db.query('SELECT nombre FROM usuarios WHERE id = ?', [id]);
        
        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscamos sus compras con nombres de productos y totales
        const [compras] = await db.query(`
            SELECT p.nombre AS producto, c.cantidad, (p.precio * c.cantidad) AS total 
            FROM compras c
            JOIN productos p ON c.id_producto = p.id
            WHERE c.id_usuario = ?
        `, [id]);

        // Calculamos el resumen para la alerta del frontend
        const totalGastado = compras.reduce((acc, c) => acc + parseFloat(c.total), 0);

        res.json({
            data: {
                usuario: usuario[0],
                compras: compras,
                total_compras: compras.length,
                total_gastado: totalGastado.toFixed(2)
            }
        });
    } catch (error) {
        console.error("Error en compras por usuario:", error);
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// 3. POST: Registrar una nueva compra
// ==========================================
router.post('/', async (req, res) => {
    // Recibimos los datos que envía el fetch de app.js
    const { usuario_id, producto_id, cantidad } = req.body;

    try {
        // Insertamos en la tabla compras (asegúrate que la columna 'cantidad' exista en MySQL)
        const sqlInsert = 'INSERT INTO compras (id_usuario, id_producto, cantidad) VALUES (?, ?, ?)';
        await db.query(sqlInsert, [usuario_id, producto_id, cantidad || 1]);

        // Obtenemos info para la notificación de éxito en el frontend
        const queryInfo = `
            SELECT u.nombre AS usuario, p.nombre AS producto, (p.precio * ?) AS total 
            FROM usuarios u, productos p 
            WHERE u.id = ? AND p.id = ?
        `;
        const [[info]] = await db.query(queryInfo, [cantidad, usuario_id, producto_id]);

        res.status(201).json({ 
            message: 'Compra registrada con éxito',
            data: { 
                usuario: info.usuario, 
                producto: info.producto, 
                cantidad: cantidad,
                total: info.total
            } 
        });
    } catch (error) {
        console.error('Error al registrar compra:', error.message);
        res.status(500).json({ error: 'Error al procesar la compra en la base de datos' });
    }
});

// ==========================================
// 4. DELETE: Eliminar una compra
// ==========================================
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM compras WHERE id = ?', [id]);
        res.json({ message: 'Compra eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;