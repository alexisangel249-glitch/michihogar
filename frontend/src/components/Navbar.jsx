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

  const handleLogout = () => {
    vaciarCarritoCompletamente();
    if (onLogout) onLogout();
  };

  return (
    <nav className="michi-navbar">
      <div className="michi-navbar-inner">
        <button onClick={() => navegarA('home')} className="michi-brand font-heading">
          <span aria-hidden="true">🐱</span> MichiAdopta
        </button>

        <div className="michi-nav-links">
          {secciones.map((sec) => (
            <button
              key={sec.id}
              onClick={() => navegarA(sec.id)}
              className={paginaActual === sec.id ? 'michi-nav-link active' : 'michi-nav-link'}
            >
              {sec.nombre}
            </button>
          ))}
          <button onClick={() => navegarA('carrito')} className="michi-nav-cart" aria-label="Abrir carrito">
            🛒
            {totalItems > 0 && <span className="michi-cart-count">{totalItems}</span>}
          </button>
          {usuarioLogueado ? (
            <div className="michi-nav-user">
              <button onClick={() => navegarA('mensajes')} className="michi-nav-pill michi-nav-message">📬 Mensajes</button>
              <span>👋 {usuarioLogueado.nombre}</span>
              <button onClick={handleLogout} className="michi-nav-pill michi-nav-exit">🚪 Salir</button>
            </div>
          ) : (
            <button onClick={() => navegarA('login')} className="michi-nav-pill michi-nav-shop">🔐 Iniciar Sesión</button>
          )}
          <button onClick={onAdminClick} className="michi-nav-pill michi-nav-admin">🛡️ Admin</button>
        </div>

        <button className="michi-mobile-toggle" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menú">
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {menuAbierto && (
        <div className="michi-mobile-menu">
          {secciones.map((sec) => (
            <button key={sec.id} onClick={() => { navegarA(sec.id); setMenuAbierto(false); }}>{sec.nombre}</button>
          ))}
          <button onClick={() => { navegarA('carrito'); setMenuAbierto(false); }}>🛒 Carrito {totalItems > 0 && `(${totalItems})`}</button>
          {usuarioLogueado ? (
            <>
              <button onClick={() => { navegarA('mensajes'); setMenuAbierto(false); }}>📬 Mis Mensajes</button>
              <button onClick={() => { handleLogout(); setMenuAbierto(false); }}>🚪 Cerrar Sesión ({usuarioLogueado.nombre})</button>
            </>
          ) : (
            <button onClick={() => { navegarA('login'); setMenuAbierto(false); }}>🔐 Iniciar Sesión</button>
          )}
          <button onClick={() => { onAdminClick(); setMenuAbierto(false); }}>🛡️ Admin</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
