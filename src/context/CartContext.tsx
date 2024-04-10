import React, { createContext, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const defaultCartContext: CartContextType = {
  cartItems: [],
  setCartItems: () => {}, // provide a default function
};

export const CartContext = createContext<CartContextType>(defaultCartContext);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const value = { cartItems, setCartItems };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};