import { useCart } from '../context/CartContext';

const Carrito = ({ navegarA }) => {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <section className="py-20 px-4 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-heading text-3xl font-bold text-michi-primary mb-4">Tu carrito está vacío</h2>
          <p className="font-body text-michi-text/70 mb-8">Aún no has agregado productos. ¡Ve a la tienda y consiente a tu michi!</p>
          <button 
            onClick={() => navegarA('tienda')}
            className="bg-michi-primary text-white font-heading font-bold px-8 py-3 rounded-xl hover:bg-michi-primary/90 transition-colors"
          >
            Ir a la Tienda
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-michi-primary mb-8 text-center">🛒 Tu Carrito de Compras</h2>
        
        <div className="bg-michi-bg rounded-3xl p-8 shadow-lg border-2 border-michi-accent">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b border-michi-accent/30 last:border-0">
              <div className="flex items-center gap-4 flex-1">
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <h3 className="font-heading font-bold text-michi-text">{item.nombre}</h3>
                  <p className="text-sm text-michi-text/70">${item.precio} x {item.cantidad}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-heading font-bold text-michi-primary">${item.precio * item.cantidad}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 pt-6 border-t-2 border-michi-accent">
            <div className="flex justify-between items-center mb-6">
              <span className="font-heading text-xl font-bold text-michi-text">Total a pagar:</span>
              <span className="font-heading text-3xl font-bold text-michi-primary">${total}</span>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={clearCart}
                className="flex-1 bg-gray-400 text-white font-heading font-bold py-3 rounded-xl hover:bg-gray-500 transition-colors"
              >
                🗑️ Vaciar Carrito
              </button>
              <button 
                onClick={() => navegarA('formularios')}
                className="flex-1 bg-michi-secondary text-white font-heading font-bold py-3 rounded-xl hover:bg-michi-secondary/90 transition-colors"
              >
                💳 Ir a Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carrito;