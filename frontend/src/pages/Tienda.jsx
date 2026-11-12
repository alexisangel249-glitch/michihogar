import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Tienda = ({ usuarioLogueado, navegarA }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { addToCart } = useCart();

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) { 
      console.error('Error al obtener los productos:', error); 
    } finally { 
      setCargando(false); 
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleAgregarCarrito = (producto) => {
    if (!usuarioLogueado) {
      alert('🔐 Debes iniciar sesión para agregar al carrito. Te redirigiremos al login.');
      if (navegarA) navegarA('login');
      return;
    }
    addToCart(producto);
  };

  return (
    <section id="tienda" className="py-20 px-4 bg-michi-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-michi-primary mb-4">Tienda de Accesorios 🛒</h2>
          <p className="font-body text-michi-text/70 max-w-2xl mx-auto">
            Cada compra ayuda a financiar el rescate y cuidado de más michis. ¡Consiente a tu gatito con lo mejor!
          </p>
        </div>

        {cargando ? (
          <p className="text-center text-michi-primary font-heading text-xl">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-michi-card rounded-3xl overflow-hidden shadow-lg border border-michi-accent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen'; }} />
                </div>
                <div className="p-5">
                  <span className="inline-block bg-michi-accent text-michi-text text-xs font-bold px-3 py-1 rounded-full mb-2">{producto.categoria}</span>
                  <h3 className="font-heading text-lg font-bold text-michi-text mb-2">{producto.nombre}</h3>
                  <p className="text-sm text-michi-text/70 font-body mb-4 line-clamp-2">{producto.descripcion}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-heading text-2xl font-bold text-michi-primary">${producto.precio}</span>
                    {producto.stock > 0 ? (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${producto.stock > 10 ? 'bg-michi-secondary text-white' : 'bg-michi-accent text-michi-text'}`}>
                        {producto.stock > 10 ? `${producto.stock} disponibles` : `¡Solo ${producto.stock}!`}
                      </span>
                    ) : (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-500 text-white">
                        ❌ Agotado
                      </span>
                    )}
                  </div>
                  
                  {producto.stock > 0 ? (
                    <button 
                      onClick={() => handleAgregarCarrito(producto)}
                      className="w-full bg-michi-secondary text-white font-heading font-bold py-2 rounded-xl hover:bg-michi-secondary/90 transition-colors cursor-pointer"
                    >
                      🛒 Agregar al carrito
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="w-full bg-gray-400 text-white font-heading font-bold py-2 rounded-xl cursor-not-allowed opacity-50"
                    >
                      ❌ Agotado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tienda;