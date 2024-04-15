import { createContext, useState } from "react";

interface FilterContextValue {
  filters: Record<string, string>;
  setFilters: (
    update: (prevFilters: Record<string, string>) => Record<string, string>
  ) => void;
}

export const FilterContext = createContext({} as FilterContextValue);

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
