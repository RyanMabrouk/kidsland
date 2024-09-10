"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useProductById from "@/hooks/data/products/useProductById";
import updateData from "@/api/updateData";
import { SelectGeneric } from "@/app/ui/SelectGeneric";

const schema = z.object({});

export default function Page() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { data: product } = useProductById(String(productId));
  const [preview, setPreview] = useState<string>(
    product?.data?.image_url || "",
  );
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };
  const Options: { label: string; value: string }[] = [
    {
      label: "subtitle1",
      value: "subtitle1",
    },
    {
      label: "subtitle2",
      value: "subtitle2",
    },
  ];

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
        id: product?.data?.id,
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
      alert("Success");
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
  className="flex flex-col gap-10 m-auto w-full max-w-[50rem] justify-center mt-20 px-4 pb-4 sm:px-10"
>
  <div className="flex flex-row items-center gap-3 justify-center">
    <Image
      src="/home/icons/flower_yellow.png"
      alt=""
      height={15}
      width={15}
    />
    <div className="text-xl sm:text-2xl font-bold uppercase text-color5">
      Edit Article
    </div>
    <Image
      src="/home/icons/flower_yellow.png"
      alt=""
      height={15}
      width={15}
    />
  </div>

  <div className="flex flex-col lg:flex-row gap-10 m-auto w-full items-start ">
  <div className=" flex flex-col gap-5 w-full lg:w-[30rem]">
      <div className="flex flex-col gap-3 ">
        <div className="text-sm font-semibold text-gray-900">
          Product Title:
        </div>
        <input
          className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 w-full tx-lg text-gray-500 focus:outline-none"
          type="text"
          placeholder="Product Title..."
          name="title"
          defaultValue={product?.data?.title || ""}
        />
      </div>
      <div className="flex flex-col gap-3 h-full">
        <div className="text-sm font-semibold text-gray-900">
          Description:
        </div>
        <textarea
          className="placeholder:text-sm placeholder:text-gray-300 border-[1px] border-gray-200 px-4 py-2 text-base text-gray-500 focus:outline-none h-full"
          placeholder="Description..."
          name="description"
          defaultValue={product?.data?.description || ""}
        ></textarea>
      </div>
    </div>

    <div
      className="flex flex-col gap-2 bg-gray-200 h-[15rem] w-full max-w-[15rem] justify-center py-2 cursor-pointer"
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
      <div className="text-xs text-gray-500 w-48 mx-auto text-center">
        Image size should be under 1MB and image ratio needs to be 1:1
      </div>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 w-full items-center">
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Original Price :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="text"
      placeholder="Price..."
      name="price"
      defaultValue={product?.data?.price || ""}
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Discount :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="text"
      placeholder="Price After Discount..."
      name="discount"
      defaultValue={product?.data?.discount || ""}
    />

    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Stock :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-lg text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="text"
      placeholder="Stock..."
      name="stock"
      defaultValue={product?.data?.stock || ""}
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Wholesale Price :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 text-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="text"
      placeholder="Wholesale Price..."
      name="wholesale_price"
      defaultValue={product?.data?.wholesale_price || ""}
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Subtitle :
    </div>
    <SelectGeneric
      className="placeholder:text-sm placeholder:text-gray-300 sm:col-span-4 w-full"
      inputLabel="Select Subtitle..."
      options={Options}
      defaultValue={Options.find(option => option.value === product?.data?.subtitle)} 
    />
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
