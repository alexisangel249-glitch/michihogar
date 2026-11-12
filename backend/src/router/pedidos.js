import { Router } from 'express';
import pool from '../../db.js';

const router = Router();

// POST /api/pedidos - Crear pedido y descontar stock
router.post('/', async (req, res) => {
  try {
    const { cliente_nombre, cliente_email, producto_id, cantidad, total } = req.body;

    console.log(`🛒 Creando pedido: producto_id=${producto_id}, cantidad=${cantidad}`);

    // 1. Verificar que el producto existe y tiene stock
    const [producto] = await pool.query('SELECT stock FROM productos WHERE id = ?', [producto_id]);
    
    if (producto.length === 0) {
      return res.status(404).json({ mensaje: '❌ Producto no encontrado' });
    }

    if (producto[0].stock < cantidad) {
      return res.status(400).json({ mensaje: `❌ No hay suficiente stock. Solo quedan ${producto[0].stock}` });
    }

    // 2. Insertar el pedido
    const [result] = await pool.query(
      'INSERT INTO pedidos (cliente_nombre, cliente_email, producto_id, cantidad, total, estado, fecha_pedido) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [cliente_nombre, cliente_email, producto_id, cantidad, total, 'Pendiente']
    );

    // 3. DESCONTAR EL STOCK DIRECTAMENTE
    await pool.query(
      'UPDATE productos SET stock = stock - ? WHERE id = ?',
      [cantidad, producto_id]
    );

    const [nuevoStock] = await pool.query('SELECT stock FROM productos WHERE id = ?', [producto_id]);
    console.log(`✅ Stock actualizado: ${nuevoStock[0].stock}`);

    res.status(201).json({ 
      mensaje: '✅ Pedido realizado exitosamente', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// GET /api/pedidos - Ver todos los pedidos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
});

export default router;