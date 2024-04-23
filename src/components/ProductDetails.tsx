import "../styles/ProductDetails.css";

import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { Product } from "../types/Product";
import { useParams } from "react-router-dom";

export const ProductDetails = () => {
  const id = useParams<{ id: string }>().id;
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct({ ...data, quantity: 1 }));
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="details-container">
      <img className="details-img" src={product.images[0]} alt={product.title} />
      <div className="details-content">
        <h1 className="details-title">{product.title} </h1>
        <p className="details-description">{product.description}</p>
        <p className="details-category">category: {product.category}</p>
        <p className="details-rating">rating: {product.rating}</p>
        {/* <p className="details-quantity">quantity: {product.quantity}</p> */}
        <p className="details-price">price {product.price.toFixed(2)} $</p>
        <button className="details-card-btn" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};
