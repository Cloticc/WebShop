import "../styles/ProductList.css";

import { useEffect, useState } from "react";

import { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <h1>Product List</h1>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
