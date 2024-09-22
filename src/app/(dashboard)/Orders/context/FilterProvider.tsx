import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { orderSortFiltersValues } from "../constants/filters";

type FilterContextType = {
  filters?: orderSortFiltersValues;
  setFilters?: Dispatch<
    SetStateAction<
      | "additional_info"
      | "address"
      | "cancel_reason"
      | "city"
      | "created_at"
      | "first_name"
      | "id"
      | "last_name"
      | "payment_method"
      | "phone_number"
      | "region"
      | "status"
      | "total_price"
      | "user_id"
      | "wholesale_price"
    >
  >;
  isReversed?: boolean;
  setIsReversed?: Dispatch<SetStateAction<boolean>>;
};

const FilterContext = createContext<FilterContextType>({});

export function OrderFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<orderSortFiltersValues>("created_at");
  const [isReversed, setIsReversed] = useState(false);
  return (
    <FilterContext.Provider
      value={{ filters, setFilters, isReversed, setIsReversed }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useOrderFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useOrderFilters must be used within a OrderFilterProvider",
    );
  }
  return {
    filters: context.filters!,
    setFilters: context.setFilters!,
    isReversed: context.isReversed!,
    setIsReversed: context.setIsReversed!,
  };
}
