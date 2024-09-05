"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useProductById from "@/hooks/data/products/useProductById";
import updateData from "@/api/updateData";

const schema = z.object({});

export default function Page() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { data : product } = useProductById(String(productId));
  const [preview, setPreview] = useState<string>( product?.data?.image_url||"");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const UpdateArticleMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // Extract form data
      const title = String(formData.get("title"));
      const price = String(formData.get("price"));
      const discount = String(formData.get("discount"));
      const stock = String(formData.get("stock"));
      const description = String(formData.get("description"));
      const subtitle = String(formData.get("subtitle"));
      const wholesale_price = String(formData.get("wholesale_price"));
  
      // Validate form data
      const result = schema.safeParse({
        title,
        price,
        discount,
        stock,
        description,
        subtitle,
        wholesale_price,
      });
  
      if (!result.success) {
        throw new Error("Validation error");
      }
  
      // Payload for updating the data
      const payload = {
        title,
        price,
        discount,
        stock,
        description,
        subtitle,
        wholesale_price,
      };
  
      // Match condition (you can change this to match your table structure)
      const match = {
        id: product?.data?.id
      };
  
      // Call the updateData function to update the record
      const { data, error } = await updateData({
        tableName: "products", // Replace with your actual table name
        payload,
        match,
      });
  
      if (error) {
        throw new Error(error.message || "Failed to update the article");
      }
  
      return data;
    },
    onSuccess: () => {
      alert("Success")
      queryClient.invalidateQueries({
        queryKey: ["products", productId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  

  return (
    <form
      action={UpdateArticleMutation.mutate}
      className="flex flex-col gap-5 m-auto w-[60rem] justify-center"
    >
      <div className="flex gap-10 m-auto w-full items-end">
        <div className="flex flex-col gap-5 mt-20">
          <div className="flex flex-row items-center gap-3">
            <Image
              src="/home/icons/flower_yellow.png"
              alt=""
              height={15}
              width={15}
            />
            <div className="text-2xl font-bold uppercase text-color5">
              Edit Article
            </div>
            <Image
              src="/home/icons/flower_yellow.png"
              alt=""
              height={15}
              width={15}
            />
          </div>
          <div className="text-sm font-semibold text-gray-900">
            Product Title
          </div>
          <input
            className="border-gray-200 border-[1px] px-4 py-2 w-[30rem] tx-lg text-gray-500 focus:outline-none"
            type="text"
            placeholder="Product Title..."
            name="title"
            defaultValue={product?.data?.title || ""}
          />
          <div className="text-sm font-semibold text-gray-900">
            Description
          </div>
          <input
            className="border-gray-200 border-[1px] px-4 py-2 w-[30rem] tx-lg text-gray-500 focus:outline-none"
            type="text"
            placeholder="Description..."
            name="description"
            defaultValue={product?.data?.description || ""}
          />
        </div>
        <div
          className="flex flex-col gap-2 bg-gray-200 h-[15rem] w-[15rem] justify-center py-2"
          onClick={() =>
            document
              .querySelector<HTMLInputElement>('input[name="filepicture"]')
              ?.click()
          }
        >
          <Image
            src={preview || "/noArticlePic.png"}
            width={150}
            height={150}
            alt="Article Picture"
            className="m-auto"
          />
          <input
            className=""
            name="filepicture"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div className="text-xs text-gray-500 w-48 mx-auto">
            Image size should be under 1MB and image ratio needs to be 1:1
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-5 m-auto w-full">
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-gray-900">
            Original Price :
          </div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Price..."
            name="price"
            defaultValue={product?.data?.price || ""}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-gray-900">Discount :</div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Price After Discount..."
            name="discount"
            defaultValue={product?.data?.discount || ""}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-gray-900">Stock :</div>
          <input
            className="border-gray-200 border-[1px] px-4 py-2 w-[45%] tx-lg text-gray-500 focus:outline-none"
            type="text"
            placeholder="Stock..."
            name="stock"
            defaultValue={product?.data?.stock || ""}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-gray-900">
            Wholesale Price :
          </div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Wholesale Price..."
            name="wholesale_price"
            defaultValue={product?.data?.wholesale_price || ""}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-sm font-semibold text-gray-900">Subtitle :</div>
        <select
          name="subtitle"
          className="border-gray-200 border-[1px] px-4 py-2 w-[15rem] tx-lg text-gray-500 focus:outline-none"
          id=""
          defaultValue={product?.data?.subtitle || ""}
        >
          <option defaultValue="">Select Subtitle</option>
          <option defaultValue="subtitle1">Subtitle 1</option>
          <option defaultValue="subtitle2">Subtitle 2</option>
        </select>
      </div>
      <button
        className="mt-5 w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-5 font-bold text-slate-700 duration-300 ease-in-out hover:!bg-slate-600 hover:!text-slate-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
