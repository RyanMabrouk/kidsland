import Checkbox from "@/app/ui/Checkbox";
import useCategories from "@/hooks/data/categories/useCategories";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function CategoriesFilter({
  onChange,
}: {
  onChange: (value: number | null) => void;
}) {
  const category = useSearchParams().get("category");
  const { data: categories } = useCategories();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(categories?.data?.find((e) => e.name == category)?.name ?? null);
  }, [category, categories?.data?.length]);
  return (
    <div className="flex flex-col items-start justify-center bg-white">
      <span className="mb-1 text-sm font-medium uppercase">Category</span>
      {categories?.data?.map((e) => (
        <Checkbox
          key={e.name}
          name="discount_options"
          label={e.name}
          checked={value === e.name}
          onChange={() => {
            setValue(e.name === value ? null : e.name);
            onChange(e.name === value ? null : e.id);
          }}
        />
      ))}
    </div>
  );
}
