import Checkbox from "@/app/ui/Checkbox";
import useCategories from "@/hooks/data/categories/useCategories";
import useTranslation from "@/translation/useTranslation";
import { useSearchParams } from "next/navigation";
import {  useEffect, useState } from "react";

export default function CategoriesFilter({
  defaultValue,
  onChange,
}: {
  onChange: (value: number | null) => void;
  defaultValue?: number | null;
}) {
  const categoryName = useSearchParams().get("category");
  const { data: categories } = useCategories();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const currentCategory =
    categories?.data?.find((e) => e.name == categoryName) ?? null;
  useEffect(() => {
    setCategoryId(currentCategory?.name ?? null);
  }, [categoryName, categories?.data?.length]);
  useEffect(() => {
    if (defaultValue && currentCategory?.name !== categoryId) {
      setCategoryId(
        categories?.data?.find((e) => e.id == defaultValue)?.name ?? null,
      );
    }
  }, [defaultValue, categories?.data?.length]);
  const { data: translation } = useTranslation();
  return (
    <div className="flex flex-col items-start justify-center bg-white">
      <span className="mb-1 text-sm font-medium uppercase">
        {translation?.lang["Category"]}
      </span>
      {categories?.data?.map((e) => (
        <Checkbox
          key={e.name}
          name="discount_options"
          label={e.name}
          checked={categoryId === e.name}
          onChange={() => {
            setCategoryId(e.name === categoryId ? null : e.name);
            onChange(e.name === categoryId ? null : e.id);
          }}
        />
      ))}
    </div>
  );
}
