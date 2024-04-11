import "../styles/ProductList.css";

import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product: Product) => {
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
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <>
      <h1>Product List</h1>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
};
