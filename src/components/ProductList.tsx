import "../styles/ProductList.css";

import { useContext, useEffect, useState } from "react";

import { FilterContext } from "../context/FilterContext";
import { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";
import { ProductContext } from "../context/ProductContext";

export const ProductList = () => {
  const { products } = useContext(ProductContext);
  const { filters } = useContext(FilterContext);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log("Fetching products based on filters", filters);

    const newFilteredProducts = products.filter((product: Product) => {
      return filters.category ? product.category === filters.category : true;
    });

    setFilteredProducts(newFilteredProducts);
  }, [filters, products]);

  return (
    <>
      <h1>Product List</h1>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
