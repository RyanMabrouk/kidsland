"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the filter state
export interface ProductsFilterType {
  minDiscount: number;
  priceRange: [number, number];
  category_id: number | null;
}

// Define the type for the context value
interface ProductsFilterContextType {
  filters: ProductsFilterType;
  setFilters: React.Dispatch<React.SetStateAction<ProductsFilterType>>;
}

// Create the context with a default value
const ProductsFilterContext = createContext<
  ProductsFilterContextType | undefined
>(undefined);

// Create the provider component
export const ProductsFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFilters] = useState<ProductsFilterType>({
    minDiscount: 0,
    priceRange: [5, 999],
    category_id: null,
  });

  return (
    <ProductsFilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </ProductsFilterContext.Provider>
  );
};

// Create a custom hook to use the ProductsFilterContext
export const useProductsFilter = () => {
  const context = useContext(ProductsFilterContext);
  if (context === undefined) {
    throw new Error(
      "useProductsFilter must be used within a ProductsFilterProvider",
    );
  }
  return context;
};
