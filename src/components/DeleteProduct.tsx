import { useState } from "react";

export const DeleteProduct = () => {
  const [id, setId] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Product ${id} deleted`);
    } else {
      console.log(`Failed to delete product ${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Product ID"
        required
      />
      <button type="submit">Delete Product</button>
    </form>
  );
};
