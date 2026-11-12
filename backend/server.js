
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import gatosRouter from './src/router/gatos.js';
import productosRouter from './src/router/productos.js';
import solicitudesRouter from './src/router/solicitudes.js';
import pedidosRouter from './src/router/pedidos.js';
import adminRouter from './src/router/admin.js';
import usuariosRouter from './src/router/usuarios.js';
import mensajesRouter from './src/router/mensajes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// CONFIGURACION CORS
// ==========================================

const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://michiadoptashop.netlify.app'
];

const allowedOrigins = [
  ...new Set([
    ...defaultOrigins,
    ...(process.env.FRONTEND_URL || '')
      .split(',')
      .map(origin => origin.trim().replace(/\/$/, ''))
      .filter(Boolean)
  ])
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, '');

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.error('Origen rechazado por CORS:', origin);
    return callback(new Error('Origen no permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ==========================================
// MIDDLEWARES
// ==========================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// RUTAS DE LA API
// ==========================================

app.use('/api/gatos', gatosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/solicitudes', solicitudesRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/admin', adminRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/mensajes', mensajesRouter);

// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: 'API de MichiAdopta Shop funcionando'
  });
});

// ==========================================
// ESTADO DEL SERVIDOR
// ==========================================

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    servicio: 'michihogar-backend'
  });
});

// ==========================================
// COMPROBAR CONEXION CON TIDB
// ==========================================

app.get('/health/db', async (req, res) => {
  try {
    const db = (await import('./db.js')).default;

    await db.query('SELECT 1');

    res.status(200).json({
      ok: true,
      database: 'connected'
    });

  } catch (error) {
    console.error('Error de conexion con TiDB:', error.message);

    res.status(503).json({
      ok: false,
      database: 'disconnected',
      mensaje: 'No se pudo conectar con la base de datos'
    });
  }
});

// ==========================================
// MANEJO DE ERRORES
// ==========================================

app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err.message);

  if (err.message === 'Origen no permitido por CORS') {
    return res.status(403).json({
      ok: false,
      mensaje: 'Origen no autorizado por CORS'
    });
  }

  res.status(500).json({
    ok: false,
    mensaje: 'Error interno del servidor'
  });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor MichiAdopta corriendo en puerto ${PORT}`);
  console.log('Origenes autorizados:', allowedOrigins);
});
