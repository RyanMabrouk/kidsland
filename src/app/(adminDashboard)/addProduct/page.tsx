"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import Image from "next/image";
import { uploadFile } from "@/api/uploadFile";
import postData from "@/api/postData";
import { TablesInsert } from "@/types/database.types";
import { SelectGeneric } from "@/app/ui/SelectGeneric";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  priceAfterDiscount: z.number().optional(),
  stock: z.number().positive("Stock must be a positive number"),
  description: z.string().min(1, "Description is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  wholesalePrice: z.number().positive("Wholesale price must be a positive number"),
  category_id: z.enum(["1", "2", "3"], { message: "Invalid category" }),
});

export default function Page() {
  const [preview, setPreview] = useState<string>("");
  const queryClient = useQueryClient();
  const Options: { label: string; value: string }[] = [
    {
      label: "Concentration Games",
      value: "1",
    },
    {
      label: "Social",
      value: "2",
    },
    {
      label: "Construction",
      value: "3",
    }
  ];
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };


  // Mutation to add a new article
  const AddArticleMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const title = String(formData.get("title"));
      const price = Number(formData.get("price"));
      const priceAfterDiscount = Number(formData.get("priceAfterDiscount"));
      const stock = Number(formData.get("stock"));
      const description = String(formData.get("description"));
      const subtitle = String(formData.get("subtitle"));
      const wholesalePrice = Number(formData.get("wholesalePrice"));
      const category_id = Number(formData.get("category_id"));
      
      const result = schema.safeParse({
        title,
        price,
        priceAfterDiscount,
        stock,
        description,
        subtitle,
        wholesalePrice,
        category_id
      });

      if (!result.success) {
        throw new Error("Validation error");
      }

      // Upload image and post data
      const image_url = await uploadFile({
        formData,
        name: "filepicture",
        title: title,
      });

      await postData({
        payload: [
          {
            title,
            price,
            stock,
            description,
            subtitle,
            wholesale_price: wholesalePrice,
            image_url,
            category_id
          },
        ],
        tableName: "products",
      });
    },
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
<form
  action={AddArticleMutation.mutate}
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
      Add A New Article
    </div>
    <Image
      src="/home/icons/flower_yellow.png"
      alt=""
      height={15}
      width={15}
    />
  </div>

  <div className="flex flex-col lg:flex-row gap-10 m-auto w-full items-start ">
    <div className="h-[15rem] flex flex-col gap-5 w-full lg:w-[30rem]">
      <div className="flex flex-col gap-3">
        <div className="text-sm font-semibold text-gray-900">
          Product Title
        </div>
        <input
          className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 w-full tx-lg text-gray-500 focus:outline-none"
          type="text"
          placeholder="Product Title..."
          name="title"
        />
      </div>
      <div className="flex flex-col gap-3 h-full">
        <div className="text-sm font-semibold text-gray-900">
          Description
        </div>
        <textarea
          className="placeholder:text-sm placeholder:text-gray-300 border-[1px] border-gray-200 px-4 py-2 text-base text-gray-500 focus:outline-none h-full"
          placeholder="Description..."
          name="description"
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
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Discount :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="text"
      placeholder="Price After Discount..."
      name="discount"
    />

    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Stock :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-lg text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="text"
      placeholder="Stock..."
      name="stock"
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Wholesale Price :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 text-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="text"
      placeholder="Wholesale Price..."
      name="wholesale_price"
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Subtitle :
    </div>
    <SelectGeneric
      name="category_id"
      className="placeholder:text-sm placeholder:text-gray-300 sm:col-span-4 w-full"
      inputLabel="Select Subtitle..."
      options={Options}
    />
  </div>

  <button
    className="mt-5  w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-5 font-bold text-slate-700 duration-300 ease-in-out hover:!bg-slate-600 hover:!text-slate-200"
    type="submit"
  >
    Submit
  </button>
</form>


  );
}
