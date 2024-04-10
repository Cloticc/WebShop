import "../styles/ShoppingCart.css";

import { useContext, useEffect, useRef } from "react";

import { CartContext } from "../context/CartContext";

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
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as Node)
      ) {
        toggleCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleCart]);

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems: Product[]) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const moveCheckout = () => {
    console.log("Move to checkout");
  };

  return (
    <>
      <div className="backdrop" onClick={toggleCart}>
        {" "}
      </div>
      <div className="cart-modal" ref={modalRef}>
        <h1 className="cart-title">Shopping Cart</h1>
        {cartItems.map((item: Product) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h2>{item.title}</h2>
              <p>{(item.price * item.quantity).toFixed(2)} $</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button
              className="btn-remove"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <h2>
          Total:{" "}
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}{" "}
          $
        </h2>

        <div className="btn-wrapper">
          <button className="btn-close" onClick={toggleCart}>
            Close
          </button>
          <button className="btn-continue" onClick={toggleCart}>
            Continue shopping
          </button>
          <button className="btn-checkout" onClick={moveCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
