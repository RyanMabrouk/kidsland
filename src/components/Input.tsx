"use client";
import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  type,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative flex h-11 items-center rounded-md border px-4">
        <input
          type={
            type.toUpperCase() === "PASSWORD"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full text-gray-800 outline-none"
        />
        {type.toUpperCase() === "PASSWORD" && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>
    </div>
  );
}
