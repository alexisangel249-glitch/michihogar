
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { API_URL } from '../api';

const Cotizacion = ({ navegarA, usuarioLogueado }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cotizacion, setCotizacion] = useState([]);
  const { addItemsToCart } = useCart();

  // Recuperar cotización guardada
  useEffect(() => {
    try {
      const cotizacionGuardada = localStorage.getItem('cotizacion_temporal');

      if (cotizacionGuardada) {
        setCotizacion(JSON.parse(cotizacionGuardada));
      }
    } catch (error) {
      console.error('Error al recuperar cotización:', error);
      localStorage.removeItem('cotizacion_temporal');
    }
  }, []);

  // Cargar productos del servidor
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/productos`);

      if (!respuesta.ok) {
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      const datos = await respuesta.json();

      if (!Array.isArray(datos)) {
        throw new Error('La respuesta no contiene una lista de productos');
      }

      setProductos(datos);

    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };

  // Guardar cotización
  const guardarCotizacion = (nuevaCotizacion) => {
    setCotizacion(nuevaCotizacion);
    localStorage.setItem(
      'cotizacion_temporal',
      JSON.stringify(nuevaCotizacion)
    );
  };

  // Agregar producto a cotización
  const agregarACotizacion = (producto) => {
    if (producto.stock <= 0) {
      alert('Este producto está agotado.');
      return;
    }

    const existe = cotizacion.find(p => p.id === producto.id);

    if (existe) {
      const nuevaCotizacion = cotizacion.map(p =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      );

      guardarCotizacion(nuevaCotizacion);

    } else {
      const nuevaCotizacion = [
        ...cotizacion,
        { ...producto, cantidad: 1 }
      ];

      guardarCotizacion(nuevaCotizacion);
    }
  };

  // Quitar producto
  const quitarDeCotizacion = (productoId) => {
    const nuevaCotizacion = cotizacion.filter(
      p => p.id !== productoId
    );

    guardarCotizacion(nuevaCotizacion);
  };

  // Calcular total
  const total = cotizacion.reduce(
    (acc, item) => acc + Number(item.precio) * item.cantidad,
    0
  );

  // Comprar cotización
  const comprarCotizacion = () => {
    if (cotizacion.length === 0) {
      alert('Agrega al menos un producto a tu cotización.');
      return;
    }

    if (!usuarioLogueado) {
      localStorage.setItem(
        'cotizacion_temporal',
        JSON.stringify(cotizacion)
      );

      alert(
        '🔐 Debes iniciar sesión para comprar. Tu cotización se guardará.'
      );

      navegarA('login');
      return;
    }

    // Agregar la cotización completa respetando la cantidad de cada producto.
    addItemsToCart(cotizacion);

    localStorage.removeItem('cotizacion_temporal');
    setCotizacion([]);

    alert('✅ Productos agregados al carrito. Continúa con tu compra.');

    navegarA('carrito');
  };

  return (
    <section className="py-20 px-4 bg-michi-bg min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-michi-primary mb-4">
            📋 Cotización de Productos
          </h1>

          <p className="font-body text-michi-text/70">
            Agrega productos para cotizar. No necesitas iniciar sesión para cotizar.
          </p>
        </div>

        {cargando ? (
          <p className="text-center text-michi-primary font-heading text-xl">
            Cargando productos...
          </p>
        ) : productos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-michi-text text-lg mb-4">
              🐱 No hay productos disponibles en este momento.
            </p>

            <button
              onClick={() => {
                setCargando(true);
                cargarProductos();
              }}
              className="bg-michi-secondary text-white font-bold px-6 py-3 rounded-xl"
            >
              🔄 Volver a intentar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Productos disponibles */}
            <div className="lg:col-span-2">

              <h2 className="font-heading text-2xl font-bold text-michi-text mb-6">
                Productos disponibles
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {productos.map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-michi-card rounded-2xl p-4 shadow-lg border border-michi-accent"
                  >

                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-32 object-cover rounded-xl mb-3"
                      onError={(e) => {
                        e.target.src =
                          'https://placehold.co/400x300?text=Sin+Imagen';
                      }}
                    />

                    <h3 className="font-heading font-bold text-michi-text">
                      {producto.nombre}
                    </h3>

                    <p className="text-sm text-michi-text/70 mb-2">
                      {producto.descripcion}
                    </p>

                    <div className="flex justify-between items-center mb-3">

                      <span className="font-heading text-xl font-bold text-michi-primary">
                        ${producto.precio}
                      </span>

                      <span className="text-xs text-michi-text/70">
                        Stock: {producto.stock}
                      </span>

                    </div>

                    {producto.stock > 0 ? (
                      <button
                        onClick={() => agregarACotizacion(producto)}
                        className="w-full bg-michi-accent text-michi-text font-heading font-bold py-2 rounded-xl hover:bg-michi-accent/80"
                      >
                        ➕ Agregar a cotización
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white font-bold py-2 rounded-xl opacity-60"
                      >
                        ❌ Agotado
                      </button>
                    )}

                  </div>
                ))}

              </div>
            </div>

            {/* Resumen de cotización */}
            <div className="lg:col-span-1">

              <div className="bg-michi-card rounded-2xl p-6 shadow-lg border-2 border-michi-primary sticky top-20">

                <h2 className="font-heading text-2xl font-bold text-michi-primary mb-4">
                  📋 Tu Cotización
                </h2>

                {cotizacion.length === 0 ? (

                  <p className="text-michi-text/70 text-center py-8">
                    Agrega productos para cotizar.
                  </p>

                ) : (

                  <>

                    <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">

                      {cotizacion.map((item) => (

                        <div
                          key={item.id}
                          className="bg-michi-bg p-3 rounded-xl"
                        >

                          <div className="flex justify-between items-start mb-2">

                            <div className="flex-1">

                              <p className="font-heading font-bold text-sm text-michi-text">
                                {item.nombre}
                              </p>

                              <p className="text-xs text-michi-text/70">
                                Cantidad: {item.cantidad}
                              </p>

                            </div>

                            <button
                              onClick={() => quitarDeCotizacion(item.id)}
                              className="text-red-500 text-sm hover:text-red-700"
                            >
                              ✕
                            </button>

                          </div>

                          <p className="font-heading font-bold text-michi-primary text-sm">
                            ${(Number(item.precio) * item.cantidad).toFixed(2)}
                          </p>

                        </div>

                      ))}

                    </div>

                    <div className="border-t-2 border-michi-accent pt-4 mb-4">

                      <div className="flex justify-between items-center">

                        <span className="font-heading font-bold text-michi-text">
                          Total:
                        </span>

                        <span className="font-heading text-2xl font-bold text-michi-primary">
                          ${total.toFixed(2)}
                        </span>

                      </div>

                    </div>

                    <button
                      onClick={comprarCotizacion}
                      className="w-full bg-michi-secondary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-secondary/90"
                    >
                      🛒 Comprar Cotización
                    </button>

                  </>

                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default Cotizacion;
