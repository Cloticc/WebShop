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
    }, 500);
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
      <Link to={`/shop/product/${product.id}`}>
        <h2 className="product-card-h2">{product.title}</h2>
        <img
          className="product-card-img"
          src={product.image}
          alt={product.title}
        />
        <p className="product-rating">rating: {product.rating?.rate}</p>

        <p className="product-card-para">Price {product.price?.toFixed(2)} $</p>
      </Link>
      <button className="product-card-btn" onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}
