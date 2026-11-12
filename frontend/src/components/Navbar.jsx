import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onAdminClick, navegarA, paginaActual, usuarioLogueado, onLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { totalItems, vaciarCarritoCompletamente } = useCart();

  const secciones = [
    { nombre: 'Inicio', id: 'home' },
    { nombre: 'Adoptar', id: 'adoptar' },
    { nombre: 'Tienda', id: 'tienda' },
    { nombre: 'Cotización', id: 'cotizacion' },
    { nombre: 'Formularios', id: 'formularios' },
    { nombre: 'Nosotros', id: 'nosotros' },
  ];

  // 🟢 NUEVO: Función que limpia el carrito al cerrar sesión
  const handleLogout = () => {
    vaciarCarritoCompletamente();
    if (onLogout) onLogout();
  };

  return (
    <nav className="bg-michi-card shadow-md sticky top-0 z-50 border-b-2 border-michi-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => navegarA('home')} className="font-heading text-2xl font-bold text-michi-primary">
            🐱 MichiAdopta
          </button>

          <div className="hidden md:flex items-center space-x-3">
            {secciones.map((sec) => (
              <button
                key={sec.id}
                onClick={() => navegarA(sec.id)}
                className={`font-body font-semibold transition-colors duration-300 text-sm ${
                  paginaActual === sec.id ? 'text-michi-primary border-b-2 border-michi-primary' : 'text-michi-text hover:text-michi-primary'
                }`}
              >
                {sec.nombre}
              </button>
            ))}
            
            <button 
              onClick={() => navegarA('carrito')}
              className="relative bg-michi-primary text-white p-2 rounded-full hover:bg-michi-primary/90 transition-colors"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {usuarioLogueado ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navegarA('mensajes')}
                  className="bg-michi-accent text-michi-text font-heading font-bold px-3 py-2 rounded-full hover:bg-michi-accent/80 text-sm"
                >
                  📬 Mensajes
                </button>
                <span className="font-body text-sm text-michi-text">
                  👋 {usuarioLogueado.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-400 text-white font-heading font-bold px-3 py-2 rounded-full hover:bg-gray-500 text-sm"
                >
                  🚪 Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => navegarA('login')}
                className="bg-michi-secondary text-white font-heading font-bold px-4 py-2 rounded-full hover:bg-michi-secondary/90 text-sm"
              >
                🔐 Iniciar Sesión
              </button>
            )}

            <button onClick={onAdminClick} className="bg-gray-700 text-white font-heading font-bold px-3 py-2 rounded-full hover:bg-gray-800 text-sm">
              🛡️ Admin
            </button>
          </div>

          <button className="md:hidden text-michi-text text-2xl" onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="md:hidden bg-michi-card border-t border-michi-accent px-4 py-4 space-y-3">
          {secciones.map((sec) => (
            <button key={sec.id} onClick={() => { navegarA(sec.id); setMenuAbierto(false); }} className={`block w-full text-left font-body font-semibold ${paginaActual === sec.id ? 'text-michi-primary' : 'text-michi-text hover:text-michi-primary'}`}>
              {sec.nombre}
            </button>
          ))}
          <button onClick={() => { navegarA('carrito'); setMenuAbierto(false); }} className="block w-full text-left font-body font-semibold text-michi-text hover:text-michi-primary">
            🛒 Carrito {totalItems > 0 && `(${totalItems})`}
          </button>
          {usuarioLogueado ? (
            <>
              <button onClick={() => { navegarA('mensajes'); setMenuAbierto(false); }} className="block w-full text-left font-body font-semibold text-michi-text hover:text-michi-primary">
                📬 Mis Mensajes
              </button>
              <button onClick={() => { handleLogout(); setMenuAbierto(false); }} className="block w-full text-left font-body font-semibold text-michi-text hover:text-michi-primary">
                🚪 Cerrar Sesión ({usuarioLogueado.nombre})
              </button>
            </>
          ) : (
            <button onClick={() => { navegarA('login'); setMenuAbierto(false); }} className="block w-full text-left font-body font-semibold text-michi-text hover:text-michi-primary">
              🔐 Iniciar Sesión
            </button>
          )}
          <button onClick={() => { onAdminClick(); setMenuAbierto(false); }} className="w-full bg-gray-700 text-white font-heading font-bold px-4 py-2 rounded-full">
            🛡️ Admin
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;