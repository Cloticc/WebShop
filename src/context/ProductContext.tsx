import { createContext, useEffect, useState } from "react";

import { Product } from "../types/Product";

interface ProductContextValue {
  products: Record<string, Product>;
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
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [filters, setFilters] = useState({});

  const createProduct = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    if (Array.isArray(data.products)) {
      const productsObject = data.products.reduce(
        (obj: Record<string, Product>, product: Product) => {
          obj[product.id] = product;
          return obj;
        },
        {}
      );

      setProducts(productsObject);
    } else {
      console.error(
        "API response does not contain an array of products:",
        data
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async (page = 1, limit = 1000) => {
      let url = `https://dummyjson.com/products?page=${page}&limit=${limit}`;

      const query = new URLSearchParams(filters).toString();
      if (query) {
        url += `&${query}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data.products)) {
        const productsObject = data.products.reduce(
          (obj: Record<string, Product>, product: Product) => {
            obj[product.id] = product;
            return obj;
          },
          {}
        );

        setProducts((prevProducts) => ({ ...prevProducts, ...productsObject }));
      } else {
        console.error(
          "API response does not contain an array of products:",
          data
        );
      }
    };

    fetchProducts();
  }, [filters]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => ({ ...prevProducts, [product.id]: product }));
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
