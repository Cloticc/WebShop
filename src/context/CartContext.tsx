import React, { createContext, useState } from "react";

import { getAdditionalUserInfo } from "firebase/auth";

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
  addToCart: (product: Product) => void;
}

const defaultCartContext: CartContextType = {
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
};

export const CartContext = createContext<CartContextType>(defaultCartContext);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const value = {
    cartItems,
    setCartItems,
    addToCart: (product: Product) => {
      const existingProduct = cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems((prevItems) => [
          ...prevItems,
          { ...product, quantity: 1 },
        ]);
      }
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
