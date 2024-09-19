import { createContext, useContext, useState } from "react";
import { OpenPaymentFormType } from "../ui/Content";

type OpenType = Partial<{
  open: OpenPaymentFormType;
  setOpen: (a: OpenPaymentFormType) => void;
}>;

const OpenContext = createContext<OpenType>({});

export function OpenProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<OpenPaymentFormType>("clientAddress");
  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      {children}
    </OpenContext.Provider>
  );
}

export function useOpen() {
  const context = useContext(OpenContext);
  if (!context || context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return {
    open: context.open!,
    setOpen: context.setOpen!,
  };
}
