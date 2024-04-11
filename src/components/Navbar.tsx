import "../styles/Navbar.css";

import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "./ShoppingCart";

export const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img
          className="navbar-logo"
          src="https://cdn-icons-png.flaticon.com/512/3443/3443338.png"
          alt=""
        />
        <h1 className="navbar-title">E-Commerce</h1>
      </div>

      <div className="navbar-container">
        <Link className="navbar-item" to="/">
          Home
        </Link>
        <Link className="navbar-item" to="/shop">
          Shop
        </Link>
        {isAuthenticated ? (
          <>
            <Link className="navbar-item" to="/dashboard">
              Dashboard
            </Link>
            <button className="navbar-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="navbar-item" to="/login">
            Login
          </Link>
        )}
        <button className="navbar-button" onClick={toggleCart}>
          Cart ({totalQuantity})
        </button>
        {cartVisible && <ShoppingCart toggleCart={toggleCart} />}
      </div>
    </nav>
  );
};
