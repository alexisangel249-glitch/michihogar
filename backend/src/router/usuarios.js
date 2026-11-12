import { Router } from 'express';
import pool from '../../db.js';
import bcrypt from 'bcrypt';

const router = Router();

// POST /api/usuarios - Registrar nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;
    
    const [existe] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ mensaje: '❌ Este correo ya está registrado' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)',
      [nombre, email, telefono, passwordHash]
    );

    res.status(201).json({ 
      mensaje: '✅ Usuario registrado exitosamente', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// GET /api/usuarios - Ver todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, email, telefono, fecha_registro FROM usuarios ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

// POST /api/usuarios/login - Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    if (usuarios.length === 0) {
      return res.status(401).json({ mensaje: '❌ Email o contraseña incorrectos' });
    }

    const usuario = usuarios[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValida) {
      return res.status(401).json({ mensaje: '❌ Email o contraseña incorrectos' });
    }

    res.json({
      mensaje: '✅ Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// POST /api/usuarios/recuperar - Recuperar/Restablecer contraseña
router.post('/recuperar', async (req, res) => {
  try {
    const { email, nuevaPassword } = req.body;

    const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    
    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: '❌ No existe una cuenta con ese correo' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(nuevaPassword, saltRounds);

    await pool.query('UPDATE usuarios SET password = ? WHERE email = ?', [passwordHash, email]);

    res.json({ mensaje: '✅ Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al recuperar contraseña:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

export default router;