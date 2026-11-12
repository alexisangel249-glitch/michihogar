// =============================================
// RUTAS DE ADMINISTRACIÓN - CRUD COMPLETO
// Archivo: backend/src/router/admin.js
// =============================================

import { Router } from 'express';
import pool from '../../db.js';

const router = Router();

// =============================================
// CONTRASEÑA DE ADMINISTRADOR (simple, para proyecto escolar)
// En producción real se usaría JWT + bcrypt
// =============================================
const ADMIN_PASSWORD = 'michi2026';

// =============================================
// POST /api/admin/login - Verificar contraseña
// =============================================
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ ok: true, mensaje: 'Acceso concedido 🐱' });
  } else {
    res.status(401).json({ ok: false, mensaje: 'Contraseña incorrecta' });
  }
});

// =============================================
// GET /api/admin/estadisticas - Datos para el dashboard
// =============================================
router.get('/estadisticas', async (req, res) => {
  try {
    const [gatos] = await pool.query('SELECT COUNT(*) as total FROM gatos');
    const [productos] = await pool.query('SELECT COUNT(*) as total FROM productos');
    const [solicitudes] = await pool.query('SELECT COUNT(*) as total FROM solicitudes_adopcion');
    const [pedidos] = await pool.query('SELECT COUNT(*) as total FROM pedidos');
    const [disponibles] = await pool.query("SELECT COUNT(*) as total FROM gatos WHERE estado = 'Disponible'");
    
    res.json({
      gatos: gatos[0].total,
      productos: productos[0].total,
      solicitudes: solicitudes[0].total,
      pedidos: pedidos[0].total,
      disponibles: disponibles[0].total
    });
  } catch (error) {
    console.error('Error en estadísticas:', error);
    res.status(500).json({ mensaje: 'Error al obtener estadísticas' });
  }
});

// =============================================
// CRUD GATOS
// =============================================

// GET /api/admin/gatos - Obtener todos los gatos
router.get('/gatos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gatos ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al obtener gatos' });
  }
});

// POST /api/admin/gatos - Crear nuevo gato
router.post('/gatos', async (req, res) => {
  try {
    const { nombre, edad, raza, sexo, personalidad, descripcion, foto, estado } = req.body;
    const [result] = await pool.query(
      'INSERT INTO gatos (nombre, edad, raza, sexo, personalidad, descripcion, foto, estado, fecha_ingreso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE())',
      [nombre, edad, raza, sexo, personalidad, descripcion, foto, estado || 'Disponible']
    );
    res.status(201).json({ mensaje: 'Gato agregado exitosamente 🐱', id: result.insertId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al agregar gato' });
  }
});

// PUT /api/admin/gatos/:id - Actualizar gato
router.put('/gatos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, raza, sexo, personalidad, descripcion, foto, estado } = req.body;
    await pool.query(
      'UPDATE gatos SET nombre=?, edad=?, raza=?, sexo=?, personalidad=?, descripcion=?, foto=?, estado=? WHERE id=?',
      [nombre, edad, raza, sexo, personalidad, descripcion, foto, estado, id]
    );
    res.json({ mensaje: 'Gato actualizado ✏️' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al actualizar gato' });
  }
});

// DELETE /api/admin/gatos/:id - Eliminar gato
router.delete('/gatos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM gatos WHERE id = ?', [id]);
    res.json({ mensaje: 'Gato eliminado 🗑️' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al eliminar gato' });
  }
});

// =============================================
// CRUD PRODUCTOS
// =============================================

// GET /api/admin/productos
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
});

// POST /api/admin/productos
router.post('/productos', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen, fecha_alta) VALUES (?, ?, ?, ?, ?, ?, CURDATE())',
      [nombre, descripcion, precio, stock, categoria, imagen]
    );
    res.status(201).json({ mensaje: 'Producto agregado 🛒', id: result.insertId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al agregar producto' });
  }
});

// PUT /api/admin/productos/:id
router.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;
    await pool.query(
      'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, categoria=?, imagen=? WHERE id=?',
      [nombre, descripcion, precio, stock, categoria, imagen, id]
    );
    res.json({ mensaje: 'Producto actualizado ✏️' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
  }
});

// DELETE /api/admin/productos/:id
router.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Producto eliminado 🗑️' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
});

// =============================================
// VER SOLICITUDES Y PEDIDOS (solo lectura)
// =============================================

// GET /api/admin/solicitudes
router.get('/solicitudes', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT s.*, g.nombre as gato_nombre FROM solicitudes_adopcion s LEFT JOIN gatos g ON s.gato_id = g.id ORDER BY s.id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al obtener solicitudes' });
  }
});

// =============================================
// 🟢 MEJORADO: PUT /api/admin/solicitudes/:id/estado
// Ahora también crea un mensaje automático para el usuario
// =============================================
router.put('/solicitudes/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Obtener la solicitud para saber el email del usuario
    const [solicitud] = await pool.query('SELECT * FROM solicitudes_adopcion WHERE id = ?', [id]);
    
    if (solicitud.length === 0) {
      return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    }

    const sol = solicitud[0];

    // Actualizar el estado
    await pool.query('UPDATE solicitudes_adopcion SET estado=? WHERE id=?', [estado, id]);

    // 🟢 BUSCAR USUARIO POR EMAIL Y CREAR MENSAJE AUTOMÁTICO
    const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [sol.usuario_email]);
    
    if (usuarios.length > 0) {
      const usuarioId = usuarios[0].id;
      const asunto = `📋 Solicitud de adopción: ${estado}`;
      const mensajeTexto = `Hola ${sol.usuario_nombre}, tu solicitud de adopción del michi "${sol.gato_nombre || 'ID ' + sol.gato_id}" ha cambiado a estado: ${estado}. ${
        estado === 'Aprobada' ? '¡Felicidades! Nos pondremos en contacto contigo muy pronto para coordinar la entrega. ' : 
        estado === 'Rechazada' ? 'Lamentamos no poder aprobarla en esta ocasión. Gracias por tu interés en nuestros michis. 💔' : 
        'Estamos revisando tu solicitud con mucho cariño. Te avisaremos pronto. ⏳'
      }`;

      await pool.query(
        'INSERT INTO mensajes (usuario_id, tipo, referencia_id, asunto, mensaje) VALUES (?, ?, ?, ?, ?)',
        [usuarioId, 'solicitud', id, asunto, mensajeTexto]
      );
      console.log(`✅ Mensaje automático enviado al usuario ${usuarioId} sobre solicitud ${id}`);
    } else {
      console.log(`⚠️ No se encontró usuario registrado con email: ${sol.usuario_email}`);
    }

    res.json({ mensaje: 'Estado actualizado y mensaje enviado al usuario 📬' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al actualizar estado' });
  }
});

// GET /api/admin/pedidos
router.get('/pedidos', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT p.*, pr.nombre as producto_nombre FROM pedidos p LEFT JOIN productos pr ON p.producto_id = pr.id ORDER BY p.id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
});

// =============================================
// 🟢 MEJORADO: PUT /api/admin/pedidos/:id/estado
// Ahora también crea un mensaje automático para el usuario
// =============================================
router.put('/pedidos/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Obtener el pedido para saber el email del usuario
    const [pedido] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
    
    if (pedido.length === 0) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    const ped = pedido[0];

    // Actualizar el estado
    await pool.query('UPDATE pedidos SET estado=? WHERE id=?', [estado, id]);

    // 🟢 BUSCAR USUARIO POR EMAIL Y CREAR MENSAJE AUTOMÁTICO
    const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [ped.cliente_email]);
    
    if (usuarios.length > 0) {
      const usuarioId = usuarios[0].id;
      const asunto = `🛒 Pedido #${id}: ${estado}`;
      const mensajeTexto = `Hola ${ped.cliente_nombre}, tu pedido #${id} (${ped.producto_nombre || 'producto'} x${ped.cantidad}) ha cambiado a estado: ${estado}. ${
        estado === 'Completado' ? '¡Gracias por tu compra! Tu pedido está listo. Cada compra ayuda a rescatar más michis. 🐾' : 
        estado === 'Cancelado' ? 'Lamentamos los inconvenientes. Si tienes dudas, contáctanos por WhatsApp. 💔' : 
        'Estamos procesando tu pedido con mucho cariño. Te avisaremos pronto. ⏳'
      }`;

      await pool.query(
        'INSERT INTO mensajes (usuario_id, tipo, referencia_id, asunto, mensaje) VALUES (?, ?, ?, ?, ?)',
        [usuarioId, 'pedido', id, asunto, mensajeTexto]
      );
      console.log(`✅ Mensaje automático enviado al usuario ${usuarioId} sobre pedido ${id}`);
    } else {
      console.log(`⚠️ No se encontró usuario registrado con email: ${ped.cliente_email}`);
    }

    res.json({ mensaje: 'Estado actualizado y mensaje enviado al usuario 📬' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ mensaje: 'Error al actualizar estado' });
  }
});

export default router;