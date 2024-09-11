"use client";
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPen } from 'react-icons/fa';
import { SelectGeneric } from '@/app/ui/SelectGeneric';
import { Enums } from '@/types/database.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateData from '@/api/updateData';

export default function EditOrder({ id, status }: { id: number; status: Enums<"status_type_enum"> }) {
  const queryClient = useQueryClient();

  // Mutation for updating order status
  const UpdateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const newStatus = String(formData.get("newStatus"));
      const { error } = await updateData({
        tableName: "orders", 
        payload: { status: newStatus as Enums<"status_type_enum">}, 
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

  const Options: { label: string; value: string }[] = [
    { label: "fulfilled", value: "fulfilled" },
    { label: "pending", value: "pending" },
    { label: "cancelled", value: "cancelled" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    UpdateMutation.mutate(formData);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaPen className="hover:text-gray-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Status</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 items-center mt-5">
                <div className="text-base text-slate-900">Status:</div>
                <SelectGeneric
                  name="newStatus"
                  className="placeholder:text-sm placeholder:text-gray-300 w-full"
                  options={Options}
                  defaultValue={Options.find(option => option.value === status)}
                />
              </div>
              <div className="flex justify-between mt-2">
                <DialogTrigger asChild>
                  <button
                    className={`flex h-[2.5rem] w-[10rem] items-center justify-center rounded-r-sm border border-slate-700 bg-white px-3 py-2 text-center text-sm font-semibold capitalize text-slate-700 transition-all ease-linear hover:bg-slate-700 hover:text-white`}
                  >
                    Cancel
                  </button>
                </DialogTrigger>
                <button
                  type="submit"
                  className={`flex h-[2.5rem] w-[10rem] items-center justify-center rounded-r-sm border border-slate-700 px-3 py-2 text-center text-sm font-semibold capitalize transition-all ease-linear text-white bg-slate-700 hover:bg-white hover:text-slate-700`}
                >
                  Yes
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
