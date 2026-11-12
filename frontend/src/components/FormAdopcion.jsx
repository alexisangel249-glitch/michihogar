import { useState, useEffect } from 'react';
import { enviarEmailAdopcion } from '../config/formspree';
import { API_URL } from '../api';
const FormAdopcion = ({ compacto = false }) => {
  const [formData, setFormData] = useState({
    usuario_nombre: '', usuario_email: '', usuario_telefono: '', gato_id: '', motivo: ''
  });
  const [gatos, setGatos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    const cargarGatos = async () => {
      try {
        const respuesta = await fetch('${API_URL}/api/gatos');
        const datos = await respuesta.json();
        setGatos(datos.filter(g => g.estado === 'Disponible'));
      } catch (error) { console.error('Error al cargar gatos:', error); }
    };
    cargarGatos();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setMostrarConfirmacion(true); };
  const cancelarEnvio = () => setMostrarConfirmacion(false);
  const gatoSeleccionado = gatos.find(g => g.id === parseInt(formData.gato_id));

  // 🟢 NUEVO: Función para cancelar y limpiar el formulario
  const cancelarFormulario = () => {
    setFormData({ usuario_nombre: '', usuario_email: '', usuario_telefono: '', gato_id: '', motivo: '' });
    setMensaje('');
    setMostrarConfirmacion(false);
  };

  const confirmarEnvio = async () => {
    setEnviando(true);
    setMensaje('');
    setMostrarConfirmacion(false);

    try {
      const respuesta = await fetch('${API_URL}/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const datos = await respuesta.json();

      if (respuesta.ok) {
        await enviarEmailAdopcion({
          ...formData,
          gato_nombre: gatoSeleccionado?.nombre || 'No especificado'
        });
        
        setMensaje('✅ ¡Solicitud enviada con éxito! El refugio te contactará pronto. 🐱');
        setFormData({ usuario_nombre: '', usuario_email: '', usuario_telefono: '', gato_id: '', motivo: '' });
      } else {
        setMensaje('❌ Error: ' + datos.mensaje);
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor.');
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="contacto" className={compacto ? "" : "py-20 px-4 bg-white"}>
      <div className="max-w-2xl mx-auto">
        {!compacto && (
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-michi-primary mb-4">Solicita una Adopción 🐾</h2>
            <p className="font-body text-michi-text/70">Llena el formulario y nos pondremos en contacto contigo.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-michi-bg rounded-3xl p-8 shadow-lg border-2 border-michi-accent">
          <div className="mb-4">
            <label className="block font-heading text-michi-text mb-2">Nombre completo *</label>
            <input type="text" name="usuario_nombre" value={formData.usuario_nombre} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-card focus:outline-none focus:border-michi-primary" placeholder="Tu nombre" />
          </div>
          <div className="mb-4">
            <label className="block font-heading text-michi-text mb-2">Correo electrónico *</label>
            <input type="email" name="usuario_email" value={formData.usuario_email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-card focus:outline-none focus:border-michi-primary" placeholder="tucorreo@ejemplo.com" />
          </div>
          <div className="mb-4">
            <label className="block font-heading text-michi-text mb-2">Teléfono</label>
            <input type="tel" name="usuario_telefono" value={formData.usuario_telefono} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-card focus:outline-none focus:border-michi-primary" placeholder="55 1234 5678" />
          </div>
          <div className="mb-4">
            <label className="block font-heading text-michi-text mb-2">¿Qué michi te interesa? *</label>
            <select name="gato_id" value={formData.gato_id} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-card focus:outline-none focus:border-michi-primary">
              <option value="">-- Selecciona un gato --</option>
              {gatos.map((gato) => (<option key={gato.id} value={gato.id}>{gato.nombre} ({gato.edad} años, {gato.raza})</option>))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block font-heading text-michi-text mb-2">¿Por qué quieres adoptarlo? *</label>
            <textarea name="motivo" value={formData.motivo} onChange={handleChange} required rows="4" className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-card focus:outline-none focus:border-michi-primary resize-none" placeholder="Cuéntanos sobre tu hogar..."></textarea>
          </div>
          
          {/* 🟢 BOTONES: Enviar y Cancelar */}
          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors">
              📋 Revisar y Confirmar Solicitud
            </button>
            <button 
              type="button" 
              onClick={cancelarFormulario}
              className="bg-gray-400 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-gray-500 transition-colors"
            >
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
              <p className="font-body text-michi-text/70">¿Prefieres contactarnos directamente?</p>
              <a
                href="https://wa.me/525575025031?text=Hola%20MichiAdopta!%20Acabo%20de%20enviar%20una%20solicitud%20de%20adopción"
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

        {mostrarConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-michi-bg rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-michi-primary">
              <h3 className="font-heading text-2xl font-bold text-michi-primary mb-6 text-center">📋 Confirma tu Solicitud</h3>
              <div className="space-y-3 mb-6">
                <div className="bg-michi-card p-4 rounded-xl"><p className="text-sm text-michi-text/70">Nombre:</p><p className="font-heading text-michi-text font-bold">{formData.usuario_nombre}</p></div>
                <div className="bg-michi-card p-4 rounded-xl"><p className="text-sm text-michi-text/70">Email:</p><p className="font-heading text-michi-text font-bold">{formData.usuario_email}</p></div>
                {formData.usuario_telefono && (<div className="bg-michi-card p-4 rounded-xl"><p className="text-sm text-michi-text/70">Teléfono:</p><p className="font-heading text-michi-text font-bold">{formData.usuario_telefono}</p></div>)}
                <div className="bg-michi-card p-4 rounded-xl"><p className="text-sm text-michi-text/70">Gato seleccionado:</p><p className="font-heading text-michi-primary font-bold text-lg">🐱 {gatoSeleccionado?.nombre} ({gatoSeleccionado?.edad} años, {gatoSeleccionado?.raza})</p></div>
                <div className="bg-michi-card p-4 rounded-xl"><p className="text-sm text-michi-text/70">Motivo:</p><p className="font-body text-michi-text">{formData.motivo}</p></div>
              </div>
              <div className="flex gap-4">
                <button onClick={cancelarEnvio} className="flex-1 bg-gray-400 text-white font-heading font-bold py-3 rounded-xl hover:bg-gray-500">✏️ Editar</button>
                <button onClick={confirmarEnvio} disabled={enviando} className="flex-1 bg-michi-secondary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-secondary/90 disabled:opacity-50">{enviando ? 'Enviando...' : '✅ Confirmar Envío'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormAdopcion;