"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useProducts from "@/hooks/data/products/useProducts";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import Image from "next/image";
import { Tables } from "@/types/database.types";

type SelectedProduct = Tables<"products"> & {
    quantity: number;
  };

export default function AddOrder() {
  const Options: { label: string; value: string }[] = [
    { label: "fulfilled", value: "fulfilled" },
    { label: "pending", value: "pending" },
    { label: "cancelled", value: "cancelled" },
  ];

  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]); 

  const { data: products, isLoading } = useProducts({
    page: 1,
    limit: 4,
    search: { column: "title", value: searchQuery },
  });

  const handleSelectProduct = (product: Tables<"products"> | null) => {
    if (product) {
        if (!selectedProducts.find((p) => p.id === product.id)) {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
          }
          setSearchQuery(""); 
    }

  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const filteredProducts: (Tables<"products"> | null)[] =
    products?.data?.filter((product: Tables<"products"> | null) =>
      !selectedProducts.find((p) => p.id === product?.id)
    ) || [];

  return (
    <Dialog>
      <DialogTrigger>
        <button className=" w-[7rem] rounded border border-slate-700 bg-slate-100 p-2 px-4 font-bold text-slate-700 duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-200">Add Order</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row items-center justify-center gap-3">
              <Image
                src="/home/icons/flower_yellow.png"
                alt="Decorative flower"
                height={15}
                width={15}
              />
              <div className="text-xl font-bold uppercase text-color5 sm:text-2xl">
                Add Order
              </div>
              <Image
                src="/home/icons/flower_yellow.png"
                alt="Decorative flower"
                height={15}
                width={15}
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <div className="text-sm font-semibold text-gray-900">Username</div>
                <input
                  className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 w-full tx-lg text-gray-500 focus:outline-none"
                  type="text"
                  placeholder="Username..."
                  name="username"
                  required
                />
              </div>
              <SelectGeneric
                inputLabel="Order Status"
                name="status"
                className="placeholder:text-sm  placeholder:text-gray-900 placeholder:font-semibold w-full"
                options={Options}
              />
              <div className="flex flex-col">
                <div className="flex max-w-full items-center gap-1 rounded-lg border-2 border-gray-200 sm:max-w-[40rem] px-2">
                  <Image
                    src="/MagnifyingGlass.Png"
                    alt="Search Icon"
                    width={20}
                    height={20}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 focus:outline-none sm:w-96"
                  />
                </div>
                <div className="flex flex-col">
                  {searchQuery && filteredProducts?.map((product) => (
                    <div
                      key={product?.id}
                      className="cursor-pointer p-2 border-b"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <div className="flex gap-4 items-center">
                        <Image
                          src={product?.image_url || "/path/to/default-image.png"}
                          alt={product?.title || "yes"}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div>{product?.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProducts.length > 0 && (
  <div className="flex flex-col gap-2">
    <h4 className="text-sm font-semibold text-gray-900">Selected Products:</h4>
    <div
      className={`space-y-2 w-[70%] ${
        selectedProducts.length > 3 ? "h-[13rem] overflow-y-auto" : ""
      }`}
    >
        {selectedProducts.map((product) => (
                    <div key={product.id} className="grid grid-cols-4 items-center">
                    <Image
                        src={product.image_url || "/path/to/default-image.png"}
                        alt={product.title}
                        width={60}
                        height={60}
                        className="rounded-md"
                    />
                    <span>{product.title}</span>
                    <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                        handleQuantityChange(product.id, Number(e.target.value))
                        }
                        min="1"
                        className="w-10 border px-2 py-1 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-color1"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                </div>
            </div>
            )}
              <button
                type="submit"
                className="mt-5 w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-5 font-bold text-slate-700 duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-200"
              >
                Submit Order
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
