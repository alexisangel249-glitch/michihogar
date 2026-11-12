// =============================================
// RUTAS PARA GATOS - API REST
// Archivo: backend/src/router/gatos.js
// =============================================

// Importa Express Router para crear rutas modulares
import { Router } from 'express';

// Importa el pool de conexiones a MySQL desde db.js
import pool from '../../db.js';

// Crea una instancia del router
const router = Router();

// =============================================
// GET /api/gatos - Obtener todos los gatos
// =============================================
router.get('/', async (req, res) => {
  try {
    // Consulta SQL para obtener todos los gatos de la BD
    const [rows] = await pool.query('SELECT * FROM gatos');
    // Envía la lista de gatos como respuesta JSON
    res.json(rows);
  } catch (error) {
    // Si hay error, lo registra y envía mensaje de error
    console.error('Error al obtener gatos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los gatos' });
  }
});

// =============================================
// GET /api/gatos/:id - Obtener un gato por su ID
// =============================================
router.get('/:id', async (req, res) => {
  try {
    // Obtiene el ID de los parámetros de la URL
    const { id } = req.params;
    // Consulta SQL filtrando por ID
    const [rows] = await pool.query('SELECT * FROM gatos WHERE id = ?', [id]);
    
    // Si no encuentra el gato, envía error 404
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Gato no encontrado' });
    }
    
    // Envía el gato encontrado
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener gato:', error);
    res.status(500).json({ mensaje: 'Error al obtener el gato' });
  }
});

// Exporta el router para usarlo en server.js
export default router;