import Checkbox from "@/app/ui/Checkbox";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMemo } from "react";

export default function DiscountFilter({
  onChange,
}: {
  onChange: (value: number) => void;
}) {
  const discount = useSearchParams().get("discount");
  
  const discount_options = useMemo(() => [
    {
      value: 10,
      label: "10% and more",
    },
    {
      value: 30,
      label: "30% and more",
    },
  ], []);
  const [value, setValue] = useState<number | null>(null);
  useEffect(() => {
    setValue(discount ? discount_options[0].value : null);
  }, [discount, discount_options]);
  return (
    <div className="flex flex-col items-start justify-center bg-white">
      <span className="mb-1 text-sm font-medium uppercase">Discount (%)</span>
      {discount_options.map((e) => (
        <Checkbox
          key={e.value}
          name="discount_options"
          label={e.label}
          checked={value === e.value}
          onChange={() => {
            setValue(e.value === value ? 0 : e.value);
            onChange(e.value === value ? 0 : e.value);
          }}
        />
      ))}
    </div>
  );
}
