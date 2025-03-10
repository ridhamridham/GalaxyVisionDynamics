import React, { createContext, useState } from "react";

// Create a Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Add to Cart
  const addToCart = (dish) => {
    setCart((prevCart) => [...prevCart, dish]);
    setTotal((prevTotal) => prevTotal + dish.price);
  };

  // Remove from Cart
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const removedItem = updatedCart.splice(index, 1)[0];
      setTotal((prevTotal) => prevTotal - removedItem.price);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
