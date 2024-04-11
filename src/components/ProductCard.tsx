import "../styles/ProductCard.css";

import { useEffect, useState } from "react";

import { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
};

export function ProductCard({ product, addToCart }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="product-card product-card--loading">
        <div className="product-card-h2 skeleton-loader"></div>
        <div className="product-card-para skeleton-loader"></div>
        <div className="product-card-img skeleton-loader"></div>
        <div className="fake-star skeleton-loader"></div>
        <div className="product-card-btn skeleton-loader"></div>
      </div>
    );
  }

  return (
    <div key={product.id} className="product-card">
      <h2 className="product-card-h2">{product.title}</h2>
      <p className="product-card-para">{product.price.toFixed(2)} $</p>
      <img
        className="product-card-img"
        src={product.image}
        alt={product.title}
      />
      <span className="fake-star"></span>
      <button className="product-card-btn" onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}
