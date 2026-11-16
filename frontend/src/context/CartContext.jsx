import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const leerLista = (clave) => {
  try {
    const valor = JSON.parse(localStorage.getItem(clave) || '[]');
    return Array.isArray(valor) ? valor : [];
  } catch {
    return [];
  }
};

const combinarProductos = (carritoActual, productosNuevos) => {
  const combinado = [...carritoActual];

  productosNuevos.forEach((producto) => {
    const cantidadNueva = Math.max(1, Number(producto.cantidad) || 1);
    const indice = combinado.findIndex((item) => String(item.id) === String(producto.id));

    if (indice >= 0) {
      combinado[indice] = {
        ...combinado[indice],
        ...producto,
        cantidad: (Number(combinado[indice].cantidad) || 1) + cantidadNueva
      };
    } else {
      combinado.push({ ...producto, cantidad: cantidadNueva });
    }
  });

  return combinado;
};

export const CartProvider = ({ children, usuarioLogueado }) => {
  const [cart, setCart] = useState([]);
  const [loadedKey, setLoadedKey] = useState(null);
  const [cotizacionRecuperada, setCotizacionRecuperada] = useState(false);

  const usuarioId = usuarioLogueado?.id || usuarioLogueado?.email;
  const cartKey = usuarioId ? `cart_usuario_${usuarioId}` : 'cart_invitado';

  useEffect(() => {
    setLoadedKey(null);
    let carritoInicial = leerLista(cartKey);

    if (usuarioLogueado) {
      const cotizacionPendiente = leerLista('cotizacion_temporal');
      if (cotizacionPendiente.length > 0) {
        carritoInicial = combinarProductos(carritoInicial, cotizacionPendiente);
        localStorage.setItem(cartKey, JSON.stringify(carritoInicial));
        localStorage.removeItem('cotizacion_temporal');
        setCotizacionRecuperada(true);
      }
    }

    setCart(carritoInicial);
    setLoadedKey(cartKey);
  }, [cartKey, Boolean(usuarioLogueado)]);

  useEffect(() => {
    if (loadedKey === cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, cartKey, loadedKey]);

  const addToCart = (product) => {
    setCart((prevCart) => combinarProductos(prevCart, [{ ...product, cantidad: 1 }]));
  };

  const addItemsToCart = (products) => {
    setCart((prevCart) => combinarProductos(prevCart, products));
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => String(item.id) !== String(productId)));
  };

  const clearCart = () => {
    setCart([]);
    setCotizacionRecuperada(false);
  };

  const vaciarCarritoCompletamente = () => {
    setCart([]);
    localStorage.removeItem(cartKey);
    setCotizacionRecuperada(false);
  };

  const total = cart.reduce((acc, item) => acc + Number(item.precio) * Number(item.cantidad), 0);
  const totalItems = cart.reduce((acc, item) => acc + Number(item.cantidad), 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, addItemsToCart, removeFromCart, clearCart,
      vaciarCarritoCompletamente, cotizacionRecuperada, total, totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
