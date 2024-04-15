// fetch("https://fakestoreapi.com/products", {
//   method: "POST",
//   body: JSON.stringify({
//     title: "test product",
//     price: 13.5,
//     description: "lorem ipsum set",
//     image: "https://i.pravatar.cc",
//     category: "electronic",
//   }),
// })
//   .then((res) => res.json())
//   .then((json) => console.log(json));

import { useState } from "react";

export const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title,
        price: parseFloat(price),
        description,
        image,
        category,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        onChange={(e) => setPrice(e.target.value)}
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
