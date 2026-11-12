const Ticket = ({ pedido, onClose }) => {
  const handlePrint = () => {
    // Agregar clase temporal para estilos de impresión
    document.body.classList.add('printing');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing');
    }, 100);
  };

  const fecha = new Date().toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getMetodoPagoIcono = (metodo) => {
    switch(metodo) {
      case 'Efectivo': return '💵';
      case 'Tarjeta de débito': return '💳';
      case 'Tarjeta de crédito': return '💳';
      case 'Transferencia bancaria': return '🏦';
      case 'PayPal': return '🅿️';
      default: return '💰';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl my-8">
        
        {/* Header del ticket */}
        <div className="text-center mb-6 border-b-2 border-dashed border-gray-300 pb-4">
          <div className="text-4xl mb-2">🐱</div>
          <h2 className="font-heading text-2xl font-bold text-michi-primary">MichiAdopta Shop</h2>
          <p className="text-sm text-gray-600">Ticket de Compra</p>
          <p className="text-xs text-gray-500 mt-2">{fecha}</p>
        </div>

        {/* Datos del cliente */}
        <div className="mb-6">
          <h3 className="font-heading font-bold text-sm text-gray-700 mb-2">CLIENTE:</h3>
          <p className="text-sm"><strong>Nombre:</strong> {pedido.cliente_nombre}</p>
          <p className="text-sm"><strong>Email:</strong> {pedido.cliente_email}</p>
          {pedido.cliente_telefono && (
            <p className="text-sm"><strong>Teléfono:</strong> {pedido.cliente_telefono}</p>
          )}
        </div>

        {/* Productos */}
        <div className="mb-6 border-t-2 border-dashed border-gray-300 pt-4">
          <h3 className="font-heading font-bold text-sm text-gray-700 mb-3">PRODUCTOS:</h3>
          <div className="space-y-2">
            {pedido.productos.map((producto, index) => (
              <div key={index} className="flex justify-between text-sm border-b border-gray-200 pb-2">
                <div className="flex-1">
                  <p className="font-bold">{producto.nombre}</p>
                  <p className="text-xs text-gray-600">Cantidad: {producto.cantidad}</p>
                </div>
                <p className="font-bold">${producto.precio * producto.cantidad}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Método de pago */}
        <div className="mb-6 border-t-2 border-dashed border-gray-300 pt-4">
          <h3 className="font-heading font-bold text-sm text-gray-700 mb-2">MÉTODO DE PAGO:</h3>
          <p className="text-sm font-bold">
            {getMetodoPagoIcono(pedido.metodo_pago)} {pedido.metodo_pago}
          </p>
        </div>

        {/* Total */}
        <div className="mb-6 border-t-2 border-dashed border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-lg">TOTAL:</span>
            <span className="font-heading text-2xl font-bold text-michi-primary">${pedido.total}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 border-t-2 border-dashed border-gray-300 pt-4">
          <p>¡Gracias por tu compra! 🐾</p>
          <p className="mt-1">Cada compra ayuda a rescatar más michis</p>
        </div>

        {/* Botones - SIEMPRE VISIBLES */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrint}
            className="flex-1 bg-michi-primary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-primary/90 transition-colors"
          >
            🖨️ Imprimir / Guardar PDF
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white font-heading font-bold px-6 py-3 rounded-xl hover:bg-gray-500 transition-colors"
          >
            ❌ Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;