import "../styles/CreateProduct.css";

import { useContext, useState } from "react";

import { Product } from "../types/Product";
import { ProductContext } from "../context/ProductContext";
import { v4 as uuidv4 } from "uuid";

export const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const { addProduct } = useContext(ProductContext);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!title || !price || !description || !image || !category) {
      return;
    }

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title,
        price: price.toString(),
        description,
        image,
        category,
      }),
    });

    const data = await response.json();
    console.log(data);

    // Generate a unique ID for the new product and ensure it has all the necessary properties
    const newProduct = {
      id: uuidv4(),
      title,
      price: price.toString(),
      description,
      image,
      category,
      rating: { rate: 0, count: 0 },
    };

    addProduct(newProduct as unknown as Product);
  };

  return (
    <form className="create-product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <button type="submit">Create Product</button>
    </form>
  );
};
