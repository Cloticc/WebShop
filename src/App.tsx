import { Route, Routes } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Dashboard } from "./components/Dashboard";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Shop } from "./components/Shop";
import { SignUp } from './components/SignUp';

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}