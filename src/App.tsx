import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Dashboard } from "./components/Dashboard";
import { FilterProvider } from "./context/FilterContext";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { ProductDetails } from "./components/ProductDetails";
import { ProductProvider } from "./context/ProductContext";
import { Shop } from "./components/Shop";
import { ShoppingCart } from "./components/ShoppingCart";
import { SignUp } from "./components/SignUp";

export function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route
                path="/cart"
                element={
                  <ShoppingCart
                    toggleCart={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                }
              />
              {/* <Route path="/product/:id" Component={ProductDetails} /> */}
              <Route path="/shop/product/:id" element={<ProductDetails />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </FilterProvider>
    </AuthProvider>
  );
}
