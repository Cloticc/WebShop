import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { CreateProduct } from "./CreateProduct";
import { DeleteProduct } from "./DeleteProduct";
import { UpdateProduct } from "./UpdateProduct";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      console.log("You must be logged in to view this page");
    } else {
      // Fetch products and orders
      console.log("Fetching products and orders");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "admin" && (
        // This content will only be visible to admin users
        <div>
          <h2>Admin Content</h2>
          <CreateProduct />
          <UpdateProduct />
          <DeleteProduct />
        </div>
      )}
    </div>
  );
};
