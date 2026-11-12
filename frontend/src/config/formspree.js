// =============================================
// CONFIGURACIÓN DE FORMSPREE - MICHIADOPTA
// =============================================

export const FORMSPREE_ADOPCION = 'https://formspree.io/f/xkjrnbll';
export const FORMSPREE_PEDIDO = 'https://formspree.io/f/xrpqgkng';
export const FORMSPREE_REGISTRO = 'https://formspree.io/f/xkjrnbll'; 

export const enviarEmailAdopcion = async (datos) => {
  try {
    const respuesta = await fetch(FORMSPREE_ADOPCION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: datos.usuario_nombre,
        email: datos.usuario_email,
        telefono: datos.usuario_telefono,
        gato_nombre: datos.gato_nombre,
        motivo: datos.motivo,
        _subject: '🐱 Nueva Solicitud de Adopción - MichiAdopta'
      })
    });
    return respuesta.ok;
  } catch (error) {
    console.error('Error al enviar email de adopción:', error);
    return false;
  }
};

export const enviarEmailPedido = async (datos) => {
  try {
    const respuesta = await fetch(FORMSPREE_PEDIDO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: datos.cliente_nombre,
        email: datos.cliente_email,
        productos: datos.productos,
        total: datos.total,
        _subject: '🛒 Nuevo Pedido - MichiAdopta'
      })
    });
    return respuesta.ok;
  } catch (error) {
    console.error('Error al enviar email de pedido:', error);
    return false;
  }
};

export const enviarEmailRegistro = async (datos) => {
  try {
    const respuesta = await fetch(FORMSPREE_REGISTRO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        _subject: '🐱 Nuevo Usuario Registrado - MichiAdopta'
      })
    });
    return respuesta.ok;
  } catch (error) {
    console.error('Error al enviar email de registro:', error);
    return false;
  }
};