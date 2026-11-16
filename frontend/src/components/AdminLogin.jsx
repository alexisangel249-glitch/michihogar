/* ============================================= */
/* COMPONENTE: AdminLogin.jsx                    */
/* Acceso y recuperación protegida del admin     */
/* ============================================= */

import { useState } from 'react';
import { API_URL } from '../api';

const AdminLogin = ({ onLoginExitoso }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const datos = await respuesta.json();
      if (respuesta.ok) onLoginExitoso();
      else setError(datos.mensaje || 'No se pudo iniciar sesión');
    } catch {
      setError('Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  const handleRecuperacion = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeRecuperacion('');

    if (newPassword.length < 10) {
      setError('La nueva contraseña debe tener al menos 10 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/api/admin/recover-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recoveryKey, newPassword })
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo recuperar el acceso');
      setMensajeRecuperacion('Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.');
      setPassword('');
      setRecoveryKey('');
      setNewPassword('');
      setConfirmPassword('');
      setMostrarRecuperacion(false);
    } catch (err) {
      setError(err.message || 'Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="min-h-screen bg-michi-bg flex items-center justify-center px-4 py-8">
      <div className="bg-michi-card rounded-3xl p-8 shadow-2xl border-4 border-michi-primary max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="font-heading text-3xl font-bold text-michi-primary">
            Panel de Administración
          </h2>
          <p className="font-body text-michi-text/70 mt-2">
            {mostrarRecuperacion ? 'Recuperación segura del acceso' : 'Ingresa la contraseña de administrador'}
          </p>
        </div>

        {mostrarRecuperacion ? (
          <form onSubmit={handleRecuperacion} className="space-y-4">
            <div className="bg-amber-50 border border-amber-300 text-amber-800 rounded-xl p-3 text-sm font-body">
              Esta opción requiere la clave maestra privada entregada al responsable del sitio. No se puede recuperar el acceso solo con un correo o desde una cuenta normal.
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Clave maestra de recuperación</label>
              <input type="password" value={recoveryKey} onChange={(e) => setRecoveryKey(e.target.value)} required autoComplete="off"
                className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                placeholder="Clave privada" />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Nueva contraseña</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={10} autoComplete="new-password"
                className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                placeholder="Mínimo 10 caracteres" />
            </div>
            <div>
              <label className="block font-heading text-michi-text mb-2">Confirmar nueva contraseña</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={10} autoComplete="new-password"
                className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                placeholder="Repite la nueva contraseña" />
            </div>
            <button type="submit" disabled={cargando}
              className="w-full bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors disabled:opacity-50">
              {cargando ? 'Verificando...' : '🔑 Actualizar contraseña'}
            </button>
            <button type="button" onClick={() => { setMostrarRecuperacion(false); setError(''); setMensajeRecuperacion(''); }}
              className="w-full text-michi-primary font-body py-2">Volver al inicio de sesión</button>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-heading text-michi-text mb-2">Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
                  placeholder="••••••••" />
              </div>
              <button type="submit" disabled={cargando}
                className="w-full bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors disabled:opacity-50">
                {cargando ? 'Verificando...' : '🐱 Ingresar'}
              </button>
            </form>
            <button type="button" onClick={() => { setMostrarRecuperacion(true); setError(''); setMensajeRecuperacion(''); }}
              className="w-full text-center text-sm text-michi-primary hover:underline mt-5 font-body">
              ¿Olvidaste la contraseña? Recuperación segura
            </button>
          </>
        )}

        {error && <div className="bg-red-500 text-white p-3 rounded-xl text-center font-body mt-4">{error}</div>}
        {mensajeRecuperacion && <div className="bg-green-100 text-green-800 p-3 rounded-xl text-center font-body mt-4">{mensajeRecuperacion}</div>}
      </div>
    </section>
  );
};

export default AdminLogin;
