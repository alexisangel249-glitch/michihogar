import { useState } from 'react';

const RecuperarPassword = ({ navegarA }) => {
  const [formData, setFormData] = useState({ email: '', nuevaPassword: '', confirmarPassword: '' });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    if (formData.nuevaPassword !== formData.confirmarPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      setCargando(false);
      return;
    }

    if (formData.nuevaPassword.length < 6) {
      setMensaje('❌ La contraseña debe tener al menos 6 caracteres');
      setCargando(false);
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3001/api/usuarios/recuperar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          nuevaPassword: formData.nuevaPassword
        })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        setMensaje('✅ ¡Contraseña actualizada! Redirigiendo al login...');
        setFormData({ email: '', nuevaPassword: '', confirmarPassword: '' });
        
        setTimeout(() => {
          if (navegarA) navegarA('login');
        }, 2000);
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
          <div className="text-6xl mb-4">🔑</div>
          <h1 className="font-heading text-3xl font-bold text-michi-primary mb-2">Recuperar Contraseña</h1>
          <p className="font-body text-michi-text/70">Restablece tu contraseña de MichiAdopta</p>
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
              <p className="text-xs text-michi-text/60 mt-1">Ingresa el correo con el que te registraste</p>
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Nueva contraseña *</label>
              <input
                type="password"
                name="nuevaPassword"
                value={formData.nuevaPassword}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Confirmar nueva contraseña *</label>
              <input
                type="password"
                name="confirmarPassword"
                value={formData.confirmarPassword}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors mt-6 disabled:opacity-50"
          >
            {cargando ? 'Actualizando...' : '🔑 Restablecer Contraseña'}
          </button>

          {mensaje && (
            <div className={`mt-4 p-4 rounded-xl text-center font-body ${
              mensaje.includes('✅') ? 'bg-michi-secondary text-white' : 'bg-red-500 text-white'
            }`}>
              {mensaje}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-michi-text/70">
              ¿Ya recordaste tu contraseña?{' '}
              <button
                type="button"
                onClick={() => navegarA && navegarA('login')}
                className="text-michi-primary font-bold hover:underline"
              >
                Iniciar Sesión
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RecuperarPassword;