import Checkbox from "@/app/ui/Checkbox";
import useTranslation from "@/translation/useTranslation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMemo } from "react";

export default function DiscountFilter({
  onChange,
  defaultValue,
}: {
  onChange: (value: number) => void;
  defaultValue?: number;
}) {
  const discount = useSearchParams().get("discount");

  const discount_options = useMemo(
    () => [
      {
        value: 10,
        label: ">10%",
      },
      {
        value: 30,
        label: ">30%",
      },
    ],
    [],
  );
  const [value, setValue] = useState<number | null>(null);
  useEffect(() => {
    setValue(discount ? discount_options[0].value : null);
  }, [discount, discount_options]);
  useEffect(() => {
    if (defaultValue && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  const { data: translation } = useTranslation();
  return (
    <div className="flex flex-col items-start justify-center bg-white">
      <span className="mb-1 text-sm font-medium uppercase">
        {translation?.lang["Discount"]} (%)
      </span>
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
