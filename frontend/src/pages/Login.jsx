import { useState } from 'react';
import { useCart } from '../context/CartContext';

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
      const respuesta = await fetch('http://localhost:3001/api/usuarios/login', {
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
        } else {
          setTimeout(() => navegarA('home'), 1000);
        }
      } else {
        setMensaje(datos.mensaje);
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor.');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-michi-bg min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="font-heading text-3xl font-bold text-michi-primary mb-2">Iniciar Sesión</h1>
          <p className="font-body text-michi-text/70">Accede a tu cuenta de MichiAdopta</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-michi-card rounded-3xl p-8 shadow-lg border-2 border-michi-accent">
          <div className="space-y-4">
            <div>
              <label className="block font-heading text-michi-text mb-2">Correo electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Contraseña *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors mt-6 disabled:opacity-50"
          >
            {cargando ? 'Iniciando sesión...' : '🔐 Iniciar Sesión'}
          </button>

          {mensaje && (
            <div className={`mt-4 p-4 rounded-xl text-center font-body ${
              mensaje.includes('✅') ? 'bg-michi-secondary text-white' : 'bg-red-500 text-white'
            }`}>
              {mensaje}
            </div>
          )}

          {/* 🟢 NUEVO: Enlace para recuperar contraseña */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navegarA && navegarA('recuperar')}
              className="text-sm text-michi-primary font-bold hover:underline"
            >
              🔑 ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="font-body text-sm text-michi-text/70">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => navegarA && navegarA('registro')}
                className="text-michi-primary font-bold hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;