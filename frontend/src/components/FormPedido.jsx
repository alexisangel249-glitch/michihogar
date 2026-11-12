import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { enviarEmailPedido } from '../config/formspree';
import Ticket from './Ticket';

const FormPedido = ({ compacto = false }) => {
  const { cart, clearCart, total } = useCart();
  const [formData, setFormData] = useState({ 
    cliente_nombre: '', 
    cliente_email: '', 
    cliente_telefono: '',
    metodo_pago: 'Efectivo'
  });
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarTicket, setMostrarTicket] = useState(false);
  const [pedidoCompletado, setPedidoCompletado] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setMostrarConfirmacion(true); };
  const cancelarEnvio = () => setMostrarConfirmacion(false);

  const cancelarFormulario = () => {
    setFormData({ cliente_nombre: '', cliente_email: '', cliente_telefono: '', metodo_pago: 'Efectivo' });
    setMensaje('');
    setMostrarConfirmacion(false);
  };

  const confirmarEnvio = async () => {
    setEnviando(true);
    setMensaje('');
    setMostrarConfirmacion(false);

    // VALIDAR STOCK ANTES DE COMPRAR
    for (const producto of cart) {
      if (producto.cantidad > producto.stock) {
        setMensaje(`❌ No hay suficiente stock de "${producto.nombre}". Solo quedan ${producto.stock} unidades.`);
        setEnviando(false);
        setMostrarConfirmacion(false);
        return;
      }
    }

    try {
      // Crear una COPIA del carrito antes de limpiarlo
      const productosACopiar = [...cart];
      
      const promesas = productosACopiar.map((producto) =>
        fetch('http://localhost:3001/api/pedidos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cliente_nombre: formData.cliente_nombre,
            cliente_email: formData.cliente_email,
            producto_id: producto.id,
            cantidad: producto.cantidad,
            total: producto.precio * producto.cantidad
          })
        })
      );

      const respuestas = await Promise.all(promesas);
      const todasOk = respuestas.every((r) => r.ok);

      if (todasOk) {
        await enviarEmailPedido({
          cliente_nombre: formData.cliente_nombre,
          cliente_email: formData.cliente_email,
          productos: productosACopiar.map((p) => `${p.nombre} x${p.cantidad} = $${p.precio * p.cantidad}`).join('\n'),
          total: total,
          metodo_pago: formData.metodo_pago
        });

        // GUARDAR LOS DATOS DEL PEDIDO ANTES DE LIMPIAR
        const datosPedido = {
          cliente_nombre: formData.cliente_nombre,
          cliente_email: formData.cliente_email,
          cliente_telefono: formData.cliente_telefono,
          productos: productosACopiar.map((p) => ({
            nombre: p.nombre,
            cantidad: p.cantidad,
            precio: p.precio
          })),
          total: total,
          metodo_pago: formData.metodo_pago
        };

        // Limpiar formulario y carrito
        setFormData({ cliente_nombre: '', cliente_email: '', cliente_telefono: '', metodo_pago: 'Efectivo' });
        clearCart();
        
        // MOSTRAR EL TICKET
        setPedidoCompletado(datosPedido);
        setMostrarTicket(true);
        
        setMensaje('✅ ¡Pedido realizado con éxito! 🛒');
      } else {
        setMensaje('❌ Error al procesar algunos productos. Intenta de nuevo.');
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor.');
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  // Si el carrito está vacío y no hay ticket mostrando
  if (cart.length === 0 && !mostrarTicket) {
    return (
      <section className={compacto ? "py-10 px-4" : "py-20 px-4 bg-michi-bg"}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-heading text-2xl font-bold text-michi-primary mb-4">Tu carrito está vacío</h2>
          <p className="font-body text-michi-text/70">Agrega productos desde la tienda para realizar tu pedido.</p>
        </div>
      </section>
    );
  }

  // Si hay ticket mostrando, no mostrar el formulario
  if (mostrarTicket && pedidoCompletado) {
    return <Ticket pedido={pedidoCompletado} onClose={() => setMostrarTicket(false)} />;
  }

  return (
    <section id="pedido" className={compacto ? "py-10 px-4" : "py-20 px-4 bg-michi-bg"}>
      <div className="max-w-2xl mx-auto">
        {!compacto && (
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-michi-primary mb-4">Finaliza tu Pedido 🛒</h2>
            <p className="font-body text-michi-text/70">Revisa tus productos y completa tus datos.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-michi-card rounded-3xl p-8 shadow-lg border-2 border-michi-accent">
          
          <div className="mb-6">
            <h3 className="font-heading text-xl font-bold text-michi-primary mb-4">📦 Productos en tu carrito:</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((producto) => (
                <div key={producto.id} className="bg-michi-bg p-4 rounded-xl border border-michi-accent flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <img src={producto.imagen} alt={producto.nombre} className="w-14 h-14 object-cover rounded-lg" />
                    <div>
                      <p className="font-heading font-bold text-michi-text text-sm">{producto.nombre}</p>
                      <p className="text-xs text-michi-text/70">Cantidad: {producto.cantidad}</p>
                    </div>
                  </div>
                  <p className="font-heading font-bold text-michi-primary">${producto.precio * producto.cantidad}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-michi-primary/10 rounded-xl border-2 border-michi-primary">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-michi-text">Total a pagar:</span>
                <span className="font-heading text-2xl font-bold text-michi-primary">${total}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-heading text-michi-text mb-2">Nombre completo *</label>
            <input type="text" name="cliente_nombre" value={formData.cliente_nombre} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="Tu nombre" />
          </div>
          <div className="mb-4">
            <label className="block font-heading text-michi-text mb-2">Correo electrónico *</label>
            <input type="email" name="cliente_email" value={formData.cliente_email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="tucorreo@ejemplo.com" />
          </div>
          <div className="mb-4">
            <label className="block font-heading text-michi-text mb-2">Teléfono</label>
            <input type="tel" name="cliente_telefono" value={formData.cliente_telefono} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary" placeholder="55 1234 5678" />
          </div>

          <div className="mb-6">
            <label className="block font-heading text-michi-text mb-2">Método de pago *</label>
            <select 
              name="metodo_pago" 
              value={formData.metodo_pago} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-xl border-2 border-michi-accent bg-michi-bg focus:outline-none focus:border-michi-primary"
            >
              <option value="Efectivo">💵 Efectivo</option>
              <option value="Tarjeta de débito">💳 Tarjeta de débito</option>
              <option value="Tarjeta de crédito">💳 Tarjeta de crédito</option>
              <option value="Transferencia bancaria">🏦 Transferencia bancaria</option>
              <option value="PayPal">🅿️ PayPal</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-michi-secondary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-secondary/90 transition-colors">
              📋 Revisar y Confirmar Pedido
            </button>
            <button type="button" onClick={cancelarFormulario} className="bg-gray-400 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-gray-500 transition-colors">
              ❌ Cancelar
            </button>
          </div>

          {mensaje && (
            <div className={`mt-4 p-4 rounded-xl text-center font-body ${mensaje.includes('✅') ? 'bg-michi-secondary text-white' : 'bg-red-500 text-white'}`}>
              {mensaje}
            </div>
          )}

          {mensaje && mensaje.includes('✅') && (
            <div className="mt-4 text-center space-y-3">
              <p className="font-body text-michi-text/70">¿Prefieres contactarnos directamente?</p>
              <a
                href="https://wa.me/525575025031?text=Hola%20MichiAdopta!%20Acabo%20de%20realizar%20un%20pedido"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
              >
                <span>💬</span>
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          )}
        </form>

        {mostrarConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-michi-bg rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-michi-primary max-h-[90vh] overflow-y-auto">
              <h3 className="font-heading text-2xl font-bold text-michi-primary mb-6 text-center">📋 Confirma tu Pedido</h3>
              
              <div className="space-y-3 mb-6">
                <div className="bg-michi-card p-4 rounded-xl"><p className="text-sm text-michi-text/70">Nombre:</p><p className="font-heading text-michi-text font-bold">{formData.cliente_nombre}</p></div>
                <div className="bg-michi-card p-4 rounded-xl"><p className="text-sm text-michi-text/70">Email:</p><p className="font-heading text-michi-text font-bold">{formData.cliente_email}</p></div>
                
                <div className="bg-michi-card p-4 rounded-xl">
                  <p className="text-sm text-michi-text/70 mb-2">Productos:</p>
                  {cart.map((p) => (
                    <div key={p.id} className="flex justify-between text-sm py-1 border-b border-michi-accent/20 last:border-0">
                      <span>{p.nombre} x{p.cantidad}</span>
                      <span className="font-bold">${p.precio * p.cantidad}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-michi-card p-4 rounded-xl">
                  <p className="text-sm text-michi-text/70">Método de pago:</p>
                  <p className="font-heading text-michi-text font-bold">
                    {formData.metodo_pago === 'Efectivo' && '💵 '}
                    {formData.metodo_pago === 'Tarjeta de débito' && '💳 '}
                    {formData.metodo_pago === 'Tarjeta de crédito' && '💳 '}
                    {formData.metodo_pago === 'Transferencia bancaria' && '🏦 '}
                    {formData.metodo_pago === 'PayPal' && '🅿️ '}
                    {formData.metodo_pago}
                  </p>
                </div>

                <div className="bg-michi-primary p-4 rounded-xl text-white">
                  <p className="text-sm opacity-90">Total a pagar:</p>
                  <p className="font-heading text-3xl font-bold">${total}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={cancelarEnvio} className="flex-1 bg-gray-400 text-white font-heading font-bold py-3 rounded-xl hover:bg-gray-500">✏️ Editar</button>
                <button onClick={confirmarEnvio} disabled={enviando} className="flex-1 bg-michi-secondary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-secondary/90 disabled:opacity-50">
                  {enviando ? 'Procesando...' : '✅ Confirmar Envío'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormPedido;