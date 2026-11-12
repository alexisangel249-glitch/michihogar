import { useState } from 'react';
import { enviarEmailRegistro } from '../config/formspree';
import { API_URL } from '../api';
const Registro = ({ navegarA }) => {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', password: '', confirmarPassword: '' });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const cancelarFormulario = () => {
    setFormData({ nombre: '', email: '', telefono: '', password: '', confirmarPassword: '' });
    setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');
    
    if (formData.password !== formData.confirmarPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      setCargando(false);
      return;
    }

    try {
      const respuesta = await fetch('${API_URL}/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password
        })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        await enviarEmailRegistro(formData);
        
        setMensaje('✅ ¡Registro exitoso! Redirigiendo al login...');
        setFormData({ nombre: '', email: '', telefono: '', password: '', confirmarPassword: '' });
        
        // 🟢 REDIRIGIR AL LOGIN DESPUÉS DE 2 SEGUNDOS
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
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="font-heading text-3xl font-bold text-michi-primary mb-2">Crear Cuenta</h1>
          <p className="font-body text-michi-text/70">Únete a la familia MichiAdopta</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-michi-card rounded-3xl p-8 shadow-lg border-2 border-michi-accent">
          <div className="space-y-4">
            <div>
              <label className="block font-heading text-michi-text mb-2">Nombre completo *</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Correo electrónico *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="tucorreo@ejemplo.com" />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Teléfono</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="55 1234 5678" />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Contraseña *</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="••••••••" />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Confirmar contraseña *</label>
              <input type="password" name="confirmarPassword" value={formData.confirmarPassword} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="••••••••" />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" disabled={cargando} className="flex-1 bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors disabled:opacity-50">
              {cargando ? 'Registrando...' : '🐱 Crear Cuenta'}
            </button>
            <button type="button" onClick={cancelarFormulario} className="bg-gray-400 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-gray-500 transition-colors">
              ❌ Cancelar
            </button>
          </div>

          {mensaje && (
            <div className={`mt-4 p-4 rounded-xl text-center font-body ${mensaje.includes('✅') ? 'bg-michi-secondary text-white' : 'bg-red-500 text-white'}`}>
              {mensaje}
            </div>
          )}

          {mensaje && mensaje.includes('✅') && (
            <div className="mt-4 text-center space-y-3">
              <p className="font-body text-michi-text/70">¿Quieres contactarnos?</p>
              <a
                href="https://wa.me/525575025031?text=Hola%20MichiAdopta!%20Acabo%20de%20crear%20mi%20cuenta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
              >
                <span>💬</span>
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Registro;