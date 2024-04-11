import "../styles/ProductCard.css";

import { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
  addToCart: (product: Product) => void;
};

export function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div key={product.id} className="product-card">
      <h2>{product.title}</h2>
      <p>{product.price.toFixed(2)} $</p>
      <img src={product.image} alt={product.title} />
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
}
