import React, { useContext, useEffect, useState } from "react";

import { FilterContext } from "../context/FilterContext";

export const Filters = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const { setFilters } = useContext(FilterContext);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((json: string[]) => setCategories(json));
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }));
  };

  return (
    <div>
      <h1>Filters</h1>
      <select onChange={handleFilterChange}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
