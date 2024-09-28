"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import Image from "next/image";
import { uploadFile } from "@/api/uploadFile";
import postData from "@/api/postData";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { useToast } from "@/hooks/useToast";
import { v4 as uuidv4 } from 'uuid';
import PictureUploader from "./ui/additional_pictures_uploader/picture_uploader";


const schema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  discount: z.number().optional(),
  stock: z.number().positive("Stock must be a positive number"),
  wholesalePrice: z.number().positive("Wholesale price must be a positive number"),
  category_id: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ], { message: "Invalid category" }),
});


export default function Page() {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const queryClient = useQueryClient();

  const Options: { label: string; value: string }[] = [
    { label: "Concentration Games", value: "1" },
    { label: "Social", value: "2" },
    { label: "Construction", value: "3" },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const AddArticleMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const title = String(formData.get("title"));
      const price = Number(formData.get("price"));
      const discount = Number(formData.get("discount"));
      const stock = Number(formData.get("stock"));
      const description = String(formData.get("description"));
      const subtitle = String(formData.get("subtitle"));
      const wholesalePrice = Number(formData.get("wholesalePrice"));
      const category_id = Number(formData.get("category_id"));
      const filepicture = formData.get("filepicture") as File;
      const result = schema.safeParse({
        title,
        price,
        discount,
        stock,
        description,
        subtitle,
        wholesalePrice,
        category_id,
      });

      if (!result.success) {
        throw new Error("Validation error");
      }

      let image_url = "";
      if (filepicture.size > 0) {
        image_url = await uploadFile({
          formData,
          name: "filepicture",
          title:uuidv4(),
        });
      } else {
        throw new Error("Product Image is Required.");
      }

      let extra_images_urls: string[] = [];
      if (images.length > 0) {
        Promise.all(
          images.map(async (image) => {
            const formDataImage = new FormData();
            formDataImage.append("file", image);
            const uploadedUrl = await uploadFile({
              formData: formDataImage,
              name: "file",
              title: uuidv4(),
            });
            extra_images_urls.push(uploadedUrl);
          }),
        );
      }

    const {error} =  await postData({
        payload: [
          {
            title,
            price,
            stock,
            description,
            subtitle,
            discount,
            discount_type: "fixed",
            wholesale_price: wholesalePrice,
            image_url: image_url || "",
            extra_images_urls,
            category_id,
          },
        ],
        tableName: "products",
      });
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Article added successfully!", "The product was created.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(
        "Error",
        error.message || "An error occurred while adding the article.",
      );
    },
  });

  return (
    <form
      action={AddArticleMutation.mutate}
      className="m-auto mt-20 flex w-full max-w-[50rem] flex-col justify-center gap-5 px-3 pb-4 sm:px-10"
    >
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-lg font-bold uppercase text-color5 sm:text-2xl">
          Add A New Article
        </div>
        <Image
          src="/home/icons/flower_yellow.png"
          alt=""
          height={15}
          width={15}
        />
      </div>

      <div className="m-auto flex w-full flex-col items-start gap-10 lg:flex-row mt-5" >
        <div className="flex h-[15rem] w-full flex-col gap-5 lg:w-[30rem]">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-gray-900">
              Product Title
            </div>
            <input
              className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              type="text"
              placeholder="Product Title..."
              name="title"
            />
          </div>
          <div className="flex h-full flex-col gap-3">
            <div className="text-sm font-semibold text-gray-900">
              Description
            </div>
            <textarea
              className="h-full border-[1px] border-gray-200 px-4 py-2 text-base text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              placeholder="Description..."
              name="description"
            ></textarea>
          </div>
        </div>

        <div
          className="flex h-[15rem] w-full max-w-[15rem] cursor-pointer flex-col justify-center gap-2 bg-gray-200 py-2"
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
          <div className="mx-auto w-48 text-center text-xs text-gray-500">
            Image size should be under 1MB and image ratio needs to be 1:1
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="text-sm font-semibold text-gray-900">
          Product Subtitle:
        </div>
        <input
          className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 w-full tx-lg text-gray-500 focus:outline-none"
          type="text"
          placeholder="Product Subtitle..."
          name="subtitle"
        />
      </div>

      <div className="grid w-full grid-cols-1 items-center gap-3 sm:grid-cols-12">
        <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
          Original Price :
        </div>
        <input
          className="tx-base w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none sm:col-span-4"
          type="number"
          placeholder="Price..."
          name="price"
        />
        <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
          Discount :
        </div>
        <input
          className="tx-base w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none sm:col-span-4"
          type="number"
          placeholder="Price After Discount..."
          name="discount"
        />

        <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
          Stock :
        </div>
        <input
          className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none sm:col-span-4"
          type="number"
          placeholder="Stock..."
          name="stock"
        />
        <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
          Wholesale Price :
        </div>
        <input
          className="w-full border-[1px] border-gray-200 px-4 py-2 text-base text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none sm:col-span-4"
          type="number"
          placeholder="Wholesale Price..."
          name="wholesalePrice"
        />
        <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
          Subtitle :
        </div>
        <SelectGeneric
          name="category_id"
          className="w-full placeholder:text-sm placeholder:text-gray-300 sm:col-span-4"
          inputLabel="Select Subtitle..."
          options={Options}
        />
      </div>
      <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
        Additional pictures:
      </div>
      <PictureUploader images={images} setImages={setImages} />

      <button
        className="mt-5 w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-5 font-bold text-slate-700 duration-300 ease-in-out hover:!bg-slate-600 hover:!text-slate-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
