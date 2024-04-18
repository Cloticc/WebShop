import "../styles/ProductCard.css";
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-toastify/dist/ReactToastify.css';

import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { toast } from 'react-toastify';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  function StarRating({ rating }: { rating: number }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star star-full"></i>);
      } else if (i - rating < 0.5 && i - rating >= 0) {
        stars.push(<i key={i} className="fas fa-star-half-alt star-half"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star star-empty"></i>);
      }
    }
    return <div className="star-container">{stars}</div>;
  }

  return (
    <div key={product.id} className="product-card">
      <Link to={`/shop/product/${product.id}`}>
        <img
          className={`product-card-img ${imageLoaded ? "loaded" : ""}`}
          src={product.thumbnail}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="title-container">
          <h2 className="product-card-title">{product.title}</h2>
        </div>
        {/* <p className="product-rating">rating: {product.rating}</p> */}
        <StarRating rating={product.rating} />
        {/* <StarRating rating={Math.floor(product.rating)} /> */}
        {/* <p className="product-card-quantity">Quantity: {product.quantity}</p> */}
        {/* <p className="product-card-description"> Description: {product.description} </p> */}
        {/* <p className="product-card-category">Category: {product.category}</p> */}
        {/* <p className="product-card-brand">Brand: {product.brand}</p> */}
        <div className="discount-container">
          <p className="product-card-discount">{Math.round(product.discountPercentage)}% OFF</p>
        </div>
        {/* <p className="product-card-stock">Stock: {product.stock}</p> */}
        {/* <div className="price-container">
          <p className="product-card-price">{product.price.toFixed(0)}$</p>
        </div> */}
        <div className="price-container">
          <p className="product-card-original-price">{product.price.toFixed(0)}$</p>
          <p className="product-card-price">
            {(product.price * (1 - product.discountPercentage / 100)).toFixed(0)}$
          </p>
        </div>
      </Link>
      <div className="button-container">
        <button className="product-card-btn" onClick={() => { addToCart(product); toast.success('Item added to cart successfully!'); }}>
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
}
