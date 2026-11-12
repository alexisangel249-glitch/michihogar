import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import Home from './pages/Home';
import Adoptar from './pages/Adoptar';
import TiendaPage from './pages/Tienda';
import FormulariosPage from './pages/Formularios';
import Nosotros from './pages/Nosotros';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import MisMensajes from './pages/MisMensajes';
import Cotizacion from './pages/Cotizacion';
import RecuperarPassword from './pages/RecuperarPassword';

function App() {
  const [adminLogueado, setAdminLogueado] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [paginaActual, setPaginaActual] = useState('home');
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuarioLogueado(JSON.parse(usuarioGuardado));
    }
  }, []);

  const irAlAdmin = () => setMostrarAdmin(true);

  const navegarA = (pagina) => {
    const requiereLogin = ['carrito', 'formularios'];
    
    if (requiereLogin.includes(pagina) && !usuarioLogueado) {
      alert('🔐 Debes iniciar sesión para acceder a esta sección. Te redirigiremos al login.');
      setPaginaActual('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setPaginaActual(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginExitoso = (usuario) => {
    setUsuarioLogueado(usuario);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuarioLogueado(null);
    navegarA('home');
  };

  if (mostrarAdmin) {
    if (!adminLogueado) return <AdminLogin onLoginExitoso={() => setAdminLogueado(true)} />;
    return <AdminPanel onLogout={() => { setAdminLogueado(false); setMostrarAdmin(false); }} />;
  }

  return (
    // 🟢 IMPORTANTE: Pasar usuarioLogueado al CartProvider
    <CartProvider usuarioLogueado={usuarioLogueado}>
      <div className="min-h-screen bg-michi-bg font-body text-michi-text">
        <Navbar 
          onAdminClick={irAlAdmin} 
          navegarA={navegarA} 
          paginaActual={paginaActual}
          usuarioLogueado={usuarioLogueado}
          onLogout={handleLogout}
        />
        <main>
          {paginaActual === 'home' && <Home navegarA={navegarA} />}
          {paginaActual === 'adoptar' && <Adoptar navegarA={navegarA} />}
          {paginaActual === 'tienda' && <TiendaPage usuarioLogueado={usuarioLogueado} navegarA={navegarA} />}
          {paginaActual === 'carrito' && <Carrito navegarA={navegarA} />}
          {paginaActual === 'formularios' && <FormulariosPage />}
          {paginaActual === 'nosotros' && <Nosotros />}
          {paginaActual === 'registro' && <Registro navegarA={navegarA} />}
          {paginaActual === 'login' && <Login onLoginExitoso={handleLoginExitoso} navegarA={navegarA} />}
          {paginaActual === 'recuperar' && <RecuperarPassword navegarA={navegarA} />}
          {paginaActual === 'mensajes' && <MisMensajes usuarioLogueado={usuarioLogueado} navegarA={navegarA} />}
          {paginaActual === 'cotizacion' && <Cotizacion navegarA={navegarA} usuarioLogueado={usuarioLogueado} />}
        </main>
        <Footer onAdminClick={irAlAdmin} navegarA={navegarA} />
      </div>
    </CartProvider>
  );
}

export default App;