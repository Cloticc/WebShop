import '../styles/ProductList.css';

import { useContext, useEffect, useState } from 'react';

import { CartContext } from '../context/CartContext';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product: Product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <img src={product.image} alt={product.title} />
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};