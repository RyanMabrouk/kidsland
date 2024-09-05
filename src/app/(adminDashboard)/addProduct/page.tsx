"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadFile } from "@/api/uploadFile";
import postData from "@/api/postData";

// Define the schema for form validation
const schema = z.object({

});

export default function Page() {
  const [preview, setPreview] = useState<string>("");
  const queryClient = useQueryClient();
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
      const price = String(formData.get("price"));
      const priceAfterDiscount = String(formData.get("priceAfterDiscount"));
      const stock = String(formData.get("stock"));
      const description = String(formData.get("description"));
      const subtitle = String(formData.get("subtitle"));
      const wholesalePrice = String(formData.get("wholesalePrice"));

      // Validate form data
      const result = schema.safeParse({
        title,
        price,
        priceAfterDiscount,
        stock,
        description,
        subtitle,
        wholesalePrice,
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
        tableName: "products",
        payload: {
          title,
          price,
          priceAfterDiscount,
          stock,
          description,
          subtitle,
          wholesalePrice,
          image_url,
        },
      });
      
    },
    onSuccess: () => {
      alert("Success")
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        AddArticleMutation.mutate(formData);
      }}
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
              Add A New Article
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
            className="border-gray-200 border-[1px] px-4 py-2 w-[30rem] text-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Product Title..."
            name="title"
          />
          <div className="text-sm font-semibold text-gray-900">
            Description
          </div>
          <textarea
           className="border-gray-200 border-[1px] px-4 py-2 w-[30rem] text-base text-gray-500 focus:outline-none"
           placeholder="Description..."
           name="description">

          </textarea>
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
            className="border-gray-100 border-[1px] px-4 py-2 text-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Price..."
            name="price"
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-gray-900">Discount :</div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 text-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Price After Discount..."
            name="priceAfterDiscount"
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-gray-900">Stock :</div>
          <input
            className="border-gray-200 border-[1px] px-4 py-2 w-[45%] text-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Stock..."
            name="stock"
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm font-semibold text-gray-900">
            Wholesale Price :
          </div>
          <input
            className="border-gray-100 border-[1px] px-4 py-2 text-base text-gray-500 focus:outline-none"
            type="text"
            placeholder="Wholesale Price..."
            name="wholesalePrice"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-sm font-semibold text-gray-900">Subtitle :</div>
        <select
          name="subtitle"
          className="border-gray-200 border-[1px] px-4 py-2 w-[15rem] text-base text-gray-500 focus:outline-none"
        >
          <option value="">Select Subtitle</option>
          <option value="subtitle1">Subtitle 1</option>
          <option value="subtitle2">Subtitle 2</option>
        </select>
      </div>
      <button
        className="mt-5 w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-5 font-bold text-slate-700 duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
