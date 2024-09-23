"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useProductById from "@/hooks/data/products/useProductById";
import updateData from "@/api/updateData";
import { SelectGeneric } from "@/app/ui/SelectGeneric";
import { uploadFile } from "@/api/uploadFile";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/useToast";
import PictureUploader from "./ui/picture_uploader";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  discount: z.number().optional(),
  stock: z.number().positive("Stock must be a positive number"),
  wholesale_price: z.number().positive("Wholesale price must be a positive number"),
  category_id: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ], { message: "Invalid category" }),
});
export default function Page() {
  const { productId } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: product } = useProductById(String(productId));
  const [preview, setPreview] = useState<string>("/noArticlePic.png");
  const [images, setImages] = useState<File[]>([]);
  const [savedImages, setSavedImages] = useState<string[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };
  useEffect(() => {
    if (product?.data) {
      if (product.data.image_url) {
        setPreview(product.data.image_url);
      }
  
      if (product.data.extra_images_urls) {
        setSavedImages(product.data.extra_images_urls);
      }
    }
  }, [product?.data]);
  const Options: { label: string; value: string }[] = [
    { label: "Concentration Games", value: "1" },
    { label: "Social", value: "2" },
    { label: "Construction", value: "3" },
  ];
  const UpdateArticleMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const title = String(formData.get("title"));
      const subtitle = String(formData.get("subtitle"));
      const price = Number(formData.get("price"));
      const discount = Number(formData.get("discount"));
      const stock = Number(formData.get("stock"));
      const description = String(formData.get("description"));
      const category_id = Number(formData.get("category_id"));
      const wholesale_price = Number(formData.get("wholesale_price"));
      const filepicture = formData.get("filepicture") as File ;      
      const result = schema.safeParse({
        title,
        subtitle,
        price,
        discount,
        stock,
        description,
        category_id: category_id,
        wholesale_price,
      });
      if (!result.success) {
        throw new Error("Validation error");
      }
      let image_url = product?.data?.image_url  ;
      if (filepicture.size > 0) {
        image_url = await uploadFile({
          formData,
          name: "filepicture",
          title:uuidv4(),
        });
      }
      if (images.length > 0) { 
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const formDataImage = new FormData();
          formDataImage.append("file", file);
          const uploadedUrl = await uploadFile({
            formData: formDataImage,
            name: "file",
            title: uuidv4(),
          });
        savedImages.push(uploadedUrl);
        }
      }
      setImages([]);
      
      const payload = {
        image_url,
        title,
        subtitle,
        price,
        discount,
        stock,
        description,
        category_id: category_id,
        wholesale_price,
        extra_images_urls: savedImages,
      };
      const match = {
        id: product?.data?.id,
      };
      const { data, error } = await updateData({
        tableName: "products", 
        payload,
        match,
      });
      if (error) {
        throw new Error(error.message || "Failed to update the article");
      }
      return data;
    },
    onSuccess: async() => {
      toast.success( "Success!" , "Product Updated successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["products", productId],
      });
      setSavedImages(product.data?.extra_images_urls || []);
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
  action={UpdateArticleMutation.mutate}
  className="flex flex-col gap-5 m-auto w-full max-w-[50rem] justify-center mt-20 px-4 pb-4 sm:px-10"
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

  <div className="flex flex-col lg:flex-row gap-10 m-auto w-full items-start mt-5 ">
  <div className="flex h-[15rem] w-full flex-col gap-5 lg:w-[30rem]">
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
        src={preview}
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
  <div className="flex flex-col gap-3 ">
        <div className="text-sm font-semibold text-gray-900">
          Product Subtitle:
        </div>
        <input
          className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 w-full tx-lg text-gray-500 focus:outline-none"
          type="text"
          placeholder="Product Subtitle..."
          name="subtitle"
          defaultValue={product?.data?.subtitle || ""}
        />
      </div>

  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 w-full items-center">
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Original Price :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="number"
      placeholder="Price..."
      name="price"
      defaultValue={product?.data?.price || ""}
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Discount :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="number"
      placeholder="Price After Discount..."
      name="discount"
      defaultValue={product?.data?.discount || ""}
    />

    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Stock :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 tx-lg text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="number"
      placeholder="Stock..."
      name="stock"
      defaultValue={product?.data?.stock || ""}
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Wholesale Price :
    </div>
    <input
      className="placeholder:text-sm placeholder:text-gray-300 border-gray-200 border-[1px] px-4 py-2 text-base text-gray-500 focus:outline-none sm:col-span-4 w-full"
      type="number"
      placeholder="Wholesale Price..."
      name="wholesale_price"
      defaultValue={product?.data?.wholesale_price || ""}
    />
    <div className="text-sm font-semibold text-gray-900 sm:col-span-2">
      Subtitle :
    </div>
    <SelectGeneric
      name="category_id"
      className="placeholder:text-sm placeholder:text-gray-300 sm:col-span-4 w-full"
      inputLabel="Select Subtitle..."
      options={Options}
      defaultValue={Options.find(option => option.value === String(product?.data?.category_id))} 
    />
  </div>
  <PictureUploader images={images} setImages={setImages} savedImages={product.data?.extra_images_urls as string[]} productId={product.data?.id as string} />
  <button
    className="mt-5 w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-5 font-bold text-slate-700 duration-300 ease-in-out hover:!bg-slate-600 hover:!text-slate-200"
    type="submit"
  >
    Submit
  </button>
</form>


  );
}
