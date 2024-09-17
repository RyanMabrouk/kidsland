import { createContext, useContext, useState } from "react";

type FiltersType = Partial<{
  up: boolean;
  filter: string;
  setUp: (a: boolean) => void;
  setFilter: (a: string) => void;
}>;

const FiltersContext = createContext<FiltersType>({});

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [up, setUp] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Alphabetically");
  return (
    <FiltersContext.Provider value={{ up, setUp, filter, setFilter }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context || context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return {
    up: context.up!,
    setUp: context.setUp!,
    filter: context.filter!,
    setFilter: context.setFilter!,
  };
}
