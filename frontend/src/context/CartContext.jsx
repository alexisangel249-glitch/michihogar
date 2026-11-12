import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children, usuarioLogueado }) => {
  const [cart, setCart] = useState([]);

  // 🟢 Obtener la clave única del carrito según el usuario
  const getCartKey = () => {
    if (usuarioLogueado && usuarioLogueado.id) {
      return `cart_usuario_${usuarioLogueado.id}`;
    }
    return 'cart_invitado';
  };

  // 🟢 Cargar carrito del localStorage al iniciar o cambiar de usuario
  useEffect(() => {
    const cartKey = getCartKey();
    const carritoGuardado = localStorage.getItem(cartKey);
    
    if (carritoGuardado) {
      setCart(JSON.parse(carritoGuardado));
    } else {
      setCart([]);
    }
  }, [usuarioLogueado]);

  // 🟢 Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, usuarioLogueado]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // 🟢 NUEVO: Limpiar carrito completamente (para logout)
  const vaciarCarritoCompletamente = () => {
    setCart([]);
    const cartKey = getCartKey();
    localStorage.removeItem(cartKey);
  };

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      vaciarCarritoCompletamente,
      total, 
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);