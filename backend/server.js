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

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/gatos', gatosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/solicitudes', solicitudesRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/admin', adminRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/mensajes', mensajesRouter);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de MichiAdopta Shop funcionando 🐾' });
});

app.listen(PORT, () => {
  console.log(`🐱 Servidor corriendo en http://localhost:${PORT}`);
});