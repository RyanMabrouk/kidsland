"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateData from '@/api/updateData';
import { Enums } from '@/types/database.types';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function EditOrderStatus({ id, status }: { id: number; status: Enums<"status_type_enum"> }) {
  const [selectedStatus, setSelectedStatus] = useState<string>(status || 'Select status...');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [
    { value: 'pending', label: 'Pending', color: 'text-color5' },
    { value: 'fulfilled', label: 'Fulfilled', color: 'text-green-600' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-color1' }
  ];


  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await updateData({
        tableName: "orders",
        payload: { status: selectedStatus as Enums<"status_type_enum"> },
        match: { id },
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", id],
      });
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleSelect = (value: string) => {
    setSelectedStatus(value);
    setIsOpen(false);
    updateMutation.mutate();
  };

  const getStatusTextColor = () => {
    switch (selectedStatus) {
      case "pending":
        return "text-color5";  // Customize the class based on your design
      case "fulfilled":
        return "text-green-600";
      case "cancelled":
        return "text-color1";
      default:
        return "text-gray-500"; // Default text color when nothing is selected
    }
  };


  return (
    <div className="relative inline-block w-[9rem]  ">
    <button
      className={`w-full bg-white p-2 px-3 font-semibold outline-none justify-center  items-center rounded-md cursor-pointer flex gap-2 ${getStatusTextColor()}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {selectedStatus.toUpperCase()}
      {isOpen
       ? <FaArrowUp className=" text-xs" />
        : <FaArrowDown className=" text-xs" />
       }
      
    </button>

    {/* Dropdown Menu */}
    {isOpen && (
      <ul className="  w-full bg-white border rounded-md shadow-md">
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={` text-start p-2  px-5 cursor-pointer  hover:bg-gray-200 ${option.color}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}
