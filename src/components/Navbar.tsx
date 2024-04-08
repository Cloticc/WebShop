import '../styles/Navbar.css';

import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link className="navbar-item" to="/">Home</Link>
      <Link className="navbar-item" to="/shop">Shop</Link>
      {isAuthenticated ? (
        <button className="navbar-item" onClick={logout}>Logout</button>
      ) : (
        <Link className="navbar-item" to="/login">Login</Link>
      )}
      <Link className="navbar-item" to="/cart">Cart ({cartItems.length})</Link>
    </nav>
  );
};