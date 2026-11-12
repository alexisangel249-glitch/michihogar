import { useState, useEffect } from 'react';
import { API_URL } from '../api';
const CatGatos = ({ navegarA }) => {
  const [gatos, setGatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerGatos = async () => {
      try {
        const respuesta = await fetch('${API_URL}/api/gatos');
        const datos = await respuesta.json();
        setGatos(datos.filter(g => g.estado === 'Disponible'));
      } catch (error) {
        console.error('Error al obtener los gatos:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerGatos();
  }, []);

  const solicitarAdopcion = (gatoId) => {
    if (navegarA) {
      navegarA('formularios');
    }
  };

  return (
    <section id="adoptar" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-michi-primary mb-4">Michis buscando hogar 🏠</h2>
          <p className="font-body text-michi-text/70 max-w-2xl mx-auto">
            Conoce a nuestros rescatados. Cada uno tiene una personalidad única y está listo para llenar tu vida de ronroneos.
          </p>
        </div>

        {cargando ? (
          <p className="text-center text-michi-primary font-heading text-xl">Cargando michis...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gatos.map((gato) => (
              <div key={gato.id} className="bg-michi-bg rounded-3xl overflow-hidden shadow-lg border border-michi-accent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-64 overflow-hidden">
                  <img src={gato.foto} alt={gato.nombre} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'; }} />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-heading text-2xl font-bold text-michi-text">{gato.nombre}</h3>
                    <span className="bg-michi-secondary text-white text-xs font-bold px-3 py-1 rounded-full">{gato.estado}</span>
                  </div>
                  <p className="text-sm text-michi-text/70 font-body mb-2">📅 {gato.edad} años • {gato.raza}</p>
                  <p className="text-sm text-michi-text/70 font-body mb-4">📍 {gato.sexo} • {gato.personalidad}</p>
                  <button 
                    onClick={() => solicitarAdopcion(gato.id)}
                    className="w-full bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors cursor-pointer"
                  >
                    ❤️ Solicitar Adopción
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatGatos;