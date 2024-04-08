import { Route, Routes } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { SignUp } from './components/SignUp';

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* other routes */}
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}