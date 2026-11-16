import { useState } from 'react';
import { API_URL } from '../api';

// URL del backend (desde variable de entorno o localhost por defecto)


const Login = ({ onLoginExitoso, navegarA }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

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

        let tieneCotizacionPendiente = false;
        try {
          const cotizacionGuardada = JSON.parse(localStorage.getItem('cotizacion_temporal') || '[]');
          tieneCotizacionPendiente = Array.isArray(cotizacionGuardada) && cotizacionGuardada.length > 0;
        } catch (error) {
          console.error('No se pudo leer la cotización pendiente:', error);
        }

        if (tieneCotizacionPendiente) {
          setMensaje('✅ ¡Bienvenido! Estamos recuperando tu cotización para que puedas comprarla...');
          setTimeout(() => navegarA('carrito'), 900);
        } else {
          setTimeout(() => navegarA('home'), 700);
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
    <section className="min-h-[70vh] bg-michi-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-michi-card rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-michi-accent">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐱</div>
          <h1 className="font-heading text-3xl font-bold text-michi-primary">Iniciar Sesión</h1>
          <p className="font-body text-michi-text/70 mt-2">Accede a tu cuenta de MichiAdopta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block font-heading text-michi-text mb-2">Correo electrónico *</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              className="w-full box-border px-4 py-3 rounded-xl border-2 border-michi-accent bg-white text-michi-text focus:outline-none focus:border-michi-primary focus:ring-2 focus:ring-michi-primary/20"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block font-heading text-michi-text mb-2">Contraseña *</label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full box-border px-4 py-3 rounded-xl border-2 border-michi-accent bg-white text-michi-text focus:outline-none focus:border-michi-primary focus:ring-2 focus:ring-michi-primary/20"
            />
          </div>

          {mensaje && (
            <div role="status" className={`p-3 rounded-xl text-sm text-center font-body ${mensaje.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {mensaje}
            </div>
          )}

          <button type="submit" disabled={cargando} className="w-full bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {cargando ? '⏳ Iniciando...' : '🔐 Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3 font-body text-sm">
          <button type="button" onClick={() => navegarA('recuperar')} className="block w-full text-michi-primary font-bold hover:underline">
            🔑 ¿Olvidaste tu contraseña?
          </button>
          <p className="text-michi-text/70">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={() => navegarA('registro')} className="text-michi-primary font-bold hover:underline">
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;