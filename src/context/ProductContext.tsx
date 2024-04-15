import { createContext, useEffect, useState } from "react";

import { Product } from "../types/Product";

interface ProductContextValue {
  products: Product[];
  createProduct: () => void;
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  addProduct: (product: Product) => void;
}

export const ProductContext = createContext<ProductContextValue>(
  {} as ProductContextValue
);

type ProductProviderProps = {
  children: React.ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({});

  const createProduct = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "https://fakestoreapi.com/products";

      const query = new URLSearchParams(filters).toString();
      console.log("filters", filters);
      console.log("query", query);
      if (query) {
        url += `?${query}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data);
    };

    fetchProducts();
  }, [filters]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };
  const value = {
    products,
    createProduct,
    filters,
    setFilters,
    addProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
