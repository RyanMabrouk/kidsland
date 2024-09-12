import { useState, useEffect, useCallback } from "react";
import { Slider } from "@mui/material";
import debounce from "lodash.debounce";

export default function PriceRangeFilter({
  onChange,
}: {
  onChange: (value: number[]) => void;
}) {
  const [value, setValue] = useState<number[]>([5, 999]);

  const debouncedOnChange = useCallback(
    debounce((newValue: number[]) => {
      onChange(newValue);
    }, 1500),
    [onChange],
  );

  useEffect(() => {
    debouncedOnChange(value);
    return () => {
      debouncedOnChange.cancel();
    };
  }, value);

  return (
    <div className="flex flex-col items-start justify-center">
      <span className="mb-1 text-sm font-medium uppercase">Price (TND)</span>
      <Slider
        className="mx-1 text-color8"
        onChange={(e, newValue) => {
          setValue(newValue as number[]);
        }}
        value={value}
        defaultValue={[5, 999]}
        max={999}
        min={5}
        aria-label="Price range"
        valueLabelDisplay="auto"
        getAriaValueText={(value) => String(value)}
      />
      <div className="mt-2 flex flex-row items-center justify-between">
        <input
          type="number"
          value={value[0]}
          className="h-[2rem] w-full rounded-sm border border-gray-500 text-center focus:outline-color8"
          onChange={(e) => {
            const newValue = Math.max(
              5,
              Math.min(Number(e.target.value), value[1]),
            );
            setValue([newValue, value[1]]);
          }}
        />
        <span className="mx-4 text-lg font-bold">-</span>
        <input
          type="number"
          value={value[1]}
          className="h-[2rem] w-full rounded-sm border border-gray-500 text-center focus:outline-color8"
          onChange={(e) => {
            const newValue = Math.min(
              999,
              Math.max(Number(e.target.value), value[0]),
            );
            setValue([value[0], newValue]);
          }}
        />
      </div>
    </div>
  );
}
