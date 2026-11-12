import { useState } from 'react';
import { useCart } from '../context/CartContext';

// URL del backend (desde variable de entorno o localhost por defecto)
const API_URL = import.meta.env.VITE_API_URL || '${API_URL}';

const Login = ({ onLoginExitoso, navegarA }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const { addToCart } = useCart();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      const respuesta = await fetch(`${API_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem('usuario', JSON.stringify(datos.usuario));
        setMensaje('✅ ¡Bienvenido de vuelta!');

        if (onLoginExitoso) {
          onLoginExitoso(datos.usuario);
        }

        const cotizacionGuardada = localStorage.getItem('cotizacion_temporal');

        if (cotizacionGuardada) {
          const cotizacion = JSON.parse(cotizacionGuardada);

          cotizacion.forEach(producto => {
            for (let i = 0; i < producto.cantidad; i++) {
              addToCart(producto);
            }
          });

          localStorage.removeItem('cotizacion_temporal');

          setMensaje('✅ ¡Bienvenido! Tu cotización se agregó al carrito. Redirigiendo...');

          setTimeout(() => {
            navegarA('carrito');
          }, 1500);
        }
      } else {
        setMensaje('❌ ' + (datos.mensaje || 'Error al iniciar sesión'));
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('❌ Error del servidor. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🐱 Iniciar Sesión</h1>
        <p className="login-subtitle">Accede a tu cuenta de MichiAdopta</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo electrónico *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@correo.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          {mensaje && (
            <div className={`mensaje ${mensaje.includes('❌') ? 'error' : 'exito'}`}>
              {mensaje}
            </div>
          )}

          <button type="submit" className="btn-login" disabled={cargando}>
            {cargando ? '⏳ Iniciando...' : '🔐 Iniciar Sesión'}
          </button>
        </form>

        <div className="login-links">
          <a href="#" onClick={() => navegarA('recuperar-password')}>
            🔑 ¿Olvidaste tu contraseña?
          </a>
          <p>
            ¿No tienes cuenta?{' '}
            <a href="#" onClick={() => navegarA('registro')}>
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;