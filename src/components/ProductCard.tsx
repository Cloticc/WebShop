import "../styles/ProductCard.css";

import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
    <Link to={`/product/${product.id}`}>
      <div key={product.id} className="product-card">
        <h2 className="product-card-h2">{product.title}</h2>
        <img
          className="product-card-img"
          src={product.image}
          alt={product.title}
        />
        <p className="product-card-para">Price {product.price.toFixed(2)} $</p>
        <span className="fake-star"></span>
        <button className="product-card-btn" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </Link>
  );
}
