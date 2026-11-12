// =============================================
// RUTAS PARA SOLICITUDES DE ADOPCIÓN - API REST
// Archivo: backend/src/router/solicitudes.js
// =============================================

import { Router } from 'express';
import pool from '../../db.js';

const router = Router();

// =============================================
// POST /api/solicitudes - Crear una nueva solicitud de adopción
// =============================================
router.post('/', async (req, res) => {
  try {
    // Obtiene los datos del cuerpo de la petición (enviados desde React)
    const { usuario_nombre, usuario_email, usuario_telefono, gato_id, motivo } = req.body;
    
    // Consulta SQL para insertar la solicitud en la BD
    const [result] = await pool.query(
      'INSERT INTO solicitudes_adopcion (usuario_nombre, usuario_email, usuario_telefono, gato_id, motivo, estado, fecha_solicitud) VALUES (?, ?, ?, ?, ?, "Pendiente", CURDATE())',
      [usuario_nombre, usuario_email, usuario_telefono, gato_id, motivo]
    );
    
    // Envía respuesta exitosa con el ID de la solicitud creada
    res.status(201).json({ 
      mensaje: 'Solicitud de adopción creada exitosamente',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al crear solicitud:', error);
    res.status(500).json({ mensaje: 'Error al crear la solicitud' });
  }
});

// =============================================
// GET /api/solicitudes - Obtener todas las solicitudes
// =============================================
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM solicitudes_adopcion');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ mensaje: 'Error al obtener las solicitudes' });
  }
});

export default router;