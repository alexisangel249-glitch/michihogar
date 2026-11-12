import { useState, useEffect } from 'react';

const MisMensajes = ({ usuarioLogueado, navegarA }) => {
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (usuarioLogueado) {
      cargarMensajes();
    }
  }, [usuarioLogueado]);

  const cargarMensajes = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3001/api/mensajes/usuario/${usuarioLogueado.id}`);
      const datos = await respuesta.json();
      setMensajes(datos);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    } finally {
      setCargando(false);
    }
  };

  const marcarLeido = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/mensajes/${id}/leido`, { method: 'PUT' });
      cargarMensajes();
    } catch (error) {
      console.error('Error al marcar como leído:', error);
    }
  };

  if (!usuarioLogueado) {
    return (
      <section className="py-20 px-4 bg-michi-bg min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="font-heading text-3xl font-bold text-michi-primary mb-4">Debes iniciar sesión</h2>
          <p className="font-body text-michi-text/70 mb-8">Para ver tus mensajes, necesitas tener una cuenta.</p>
          <button 
            onClick={() => navegarA('login')}
            className="bg-michi-primary text-white font-heading font-bold px-8 py-3 rounded-xl hover:bg-michi-primary/90"
          >
            Iniciar Sesión
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-michi-bg min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-michi-primary mb-4">📬 Mis Mensajes</h1>
          <p className="font-body text-michi-text/70">Respuestas del administrador sobre tus solicitudes y pedidos</p>
        </div>

        {cargando ? (
          <p className="text-center text-michi-primary font-heading text-xl">Cargando mensajes...</p>
        ) : mensajes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="font-body text-michi-text/70">No tienes mensajes aún</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mensajes.map((msg) => (
              <div 
                key={msg.id} 
                className={`bg-michi-card rounded-2xl p-6 shadow-lg border-2 ${
                  msg.leido ? 'border-michi-accent' : 'border-michi-primary'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-heading font-bold text-michi-text text-lg">{msg.asunto}</h3>
                    <p className="text-xs text-michi-text/70">
                      {new Date(msg.fecha_envio).toLocaleString('es-MX')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    msg.tipo === 'solicitud' ? 'bg-michi-secondary text-white' :
                    msg.tipo === 'pedido' ? 'bg-michi-primary text-white' :
                    'bg-gray-400 text-white'
                  }`}>
                    {msg.tipo}
                  </span>
                </div>
                <p className="font-body text-michi-text/80 mb-4">{msg.mensaje}</p>
                {!msg.leido && (
                  <button 
                    onClick={() => marcarLeido(msg.id)}
                    className="text-sm text-michi-primary font-bold hover:underline"
                  >
                    ✓ Marcar como leído
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MisMensajes;