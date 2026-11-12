/* ============================================= */
/* COMPONENTE: AdminLogin.jsx                    */
/* Login para acceder al panel de administración */
/* ============================================= */

import { useState } from 'react';

const AdminLogin = ({ onLoginExitoso }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        onLoginExitoso();
      } else {
        setError(datos.mensaje);
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="min-h-screen bg-michi-bg flex items-center justify-center px-4">
      <div className="bg-michi-card rounded-3xl p-8 shadow-2xl border-4 border-michi-primary max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="font-heading text-3xl font-bold text-michi-primary">
            Panel de Administración
          </h2>
          <p className="font-body text-michi-text/70 mt-2">
            Ingresa la contraseña de administrador
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-heading text-michi-text mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-xl text-center font-body">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors disabled:opacity-50"
          >
            {cargando ? 'Verificando...' : '🐱 Ingresar'}
          </button>
        </form>

        <p className="text-center text-xs text-michi-text/50 mt-6 font-body">
          Contraseña de prueba: michi2026
        </p>
      </div>
    </section>
  );
};

export default AdminLogin;