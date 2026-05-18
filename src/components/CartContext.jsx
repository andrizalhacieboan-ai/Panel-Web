import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

// Helper untuk Session ID Permanen
const getOrCreateSessionId = () => {
  let id = localStorage.getItem('andri_session_id');
  if (!id) {
    id = 'SESS-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    localStorage.setItem('andri_session_id', id);
  }
  return id;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sessionId = getOrCreateSessionId();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${sessionId}`);
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, [sessionId]);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(`cart_${sessionId}`, JSON.stringify(cartItems));
  }, [cartItems, sessionId]);

  const addToCart = (ownerName, paket) => {
    const newItem = {
      cartId: Date.now(), // Unique ID for cart item
      sessionId,
      ownerName,
      paket
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isDrawerOpen, setIsDrawerOpen, sessionId }}>
      {children}
    </CartContext.Provider>
  );
};
