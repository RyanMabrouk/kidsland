"use client";
import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Enums } from '@/types/database.types';

export default function EditOrderStatus({
  selectedStatus,
  setSelectedStatus,
}: {
  selectedStatus: Enums<"status_type_enum">;
  setSelectedStatus: React.Dispatch<React.SetStateAction<Enums<"status_type_enum">>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [
    { value: 'pending', label: 'Pending', color: 'text-color5' },
    { value: 'fulfilled', label: 'Fulfilled', color: 'text-green-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-color1' },
  ];

  const handleSelect = (value: Enums<"status_type_enum">) => {
    setSelectedStatus(value);
    setIsOpen(false);
  };

  const getStatusTextColor = () => {
    switch (selectedStatus) {
      case 'pending':
        return 'text-color5';
      case 'fulfilled':
        return 'text-green-600';
      case 'cancelled':
        return 'text-color1';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="relative inline-block w-[9rem]">
      <button
        className={`w-full bg-white p-2 px-3 font-semibold outline-none justify-center items-center rounded-md cursor-pointer flex gap-2 ${getStatusTextColor()}`}
        onClick={() => setIsOpen(!isOpen)}
        type='button'
      >
        {selectedStatus.toUpperCase()}
        {isOpen ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute w-full bg-white border rounded-md shadow-md">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value as Enums<"status_type_enum">)}
              className={`text-start p-2 px-5 cursor-pointer hover:bg-gray-200 ${option.color}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
