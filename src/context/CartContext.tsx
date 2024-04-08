/* eslint-disable @typescript-eslint/no-explicit-any */
// CartContext.tsx

import React, { createContext, useState } from 'react';

interface CartContextType {
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const CartContext = createContext<CartContextType | null>(null);
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const value = { cartItems, setCartItems };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};