import '../styles/ShoppingCart.css';

import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type ShoppingCartProps = {
  toggleCart: () => void;
};

export const ShoppingCart = ({ toggleCart }: ShoppingCartProps) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems: Product[]) => prevItems.filter(item => item.id !== productId));
  };

    const moveCheckout = () => {
        console.log('Move to checkout');
    };

  return (
    <div className="cart-modal">
      <h1>Shopping Cart</h1>
      {cartItems.map((item: Product) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div>
            <h2>{item.title}</h2>
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={toggleCart}>Close</button>
      <button onClick={moveCheckout} >Checkout</button>
    </div>
  );
};