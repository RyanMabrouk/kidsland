import { useState } from "react";

export default function TextInput({
  type,
  name,
  label,
  defaultValue,
}: {
  type: string;
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="static flex h-[4rem] flex-col">
      <label
        htmlFor="input"
        className={`relative top-2 ml-[7px] mt-0 w-fit bg-white px-[3px] text-xs font-bold transition-all duration-700 ${
          isFocused ? "text-color1" : "text-gray-400"
        }`}
      >
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        id="input"
        type={type}
        placeholder="Write here..."
        name={name}
        className="rounded-md border-2 border-gray-400 p-[14px] pl-[10px] text-xs transition-all duration-200 focus:border-color1 focus:outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}