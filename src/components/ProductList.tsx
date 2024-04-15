import "../styles/ProductList.css";

import { useContext, useEffect, useState } from "react";

import { FilterContext } from "../context/FilterContext";
import { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { filters } = useContext(FilterContext);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "https://fakestoreapi.com/products";
      if (filters.category) {
        url += `/category/${filters.category}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [filters]);

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
