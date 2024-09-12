"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateData from '@/api/updateData';
import { Enums } from '@/types/database.types';

export default function EditOrderStatus({ id, status }: { id: number; status: Enums<"status_type_enum"> }) {
  const [selectedStatus, setSelectedStatus] = useState<string>(status || 'Select status...');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options = [
    { value: 'pending', label: 'Pending', color: 'text-color5' },
    { value: 'fulfilled', label: 'Fulfilled', color: 'text-green-600' },
    { value: 'cancelled', label: 'Canceled', color: 'text-color1' }
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
    <div className="relative inline-block w-[7rem] text-sm">
    <button
      className={`w-full bg-white p-2 px-3 font-semibold outline-none  rounded-md cursor-pointer ${getStatusTextColor()}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {selectedStatus.toUpperCase()}
    </button>

    {/* Dropdown Menu */}
    {isOpen && (
      <ul className="absolute z-10 w-full bg-white border rounded-md shadow-md">
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`p-2 cursor-pointer hover:bg-gray-200 ${option.color}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}
