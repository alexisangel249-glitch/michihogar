import { Router } from 'express';
import pool from '../../db.js';

const router = Router();

// GET /api/mensajes/usuario/:usuarioId - Obtener mensajes de un usuario
router.get('/usuario/:usuarioId', async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM mensajes WHERE usuario_id = ? ORDER BY fecha_envio DESC',
      [usuarioId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// POST /api/mensajes - Enviar mensaje (desde admin)
router.post('/', async (req, res) => {
  try {
    const { usuario_id, tipo, referencia_id, asunto, mensaje } = req.body;

    const [result] = await pool.query(
      'INSERT INTO mensajes (usuario_id, tipo, referencia_id, asunto, mensaje) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, tipo, referencia_id, asunto, mensaje]
    );

    res.status(201).json({ 
      mensaje: '✅ Mensaje enviado exitosamente',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// PUT /api/mensajes/:id/leido - Marcar mensaje como leído
router.put('/:id/leido', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE mensajes SET leido = TRUE WHERE id = ?', [id]);
    res.json({ mensaje: '✅ Mensaje marcado como leído' });
  } catch (error) {
    console.error('Error al marcar mensaje:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

export default router;