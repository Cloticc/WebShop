import { createContext, useState } from "react";

export const FilterContext = createContext({});

interface FilterProviderProps {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filters, setFilters] = useState({});

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
