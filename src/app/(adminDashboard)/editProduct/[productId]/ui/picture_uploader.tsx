"use client";
import { DeleteFromBucket } from "@/api/deleteFromBucket";
import updateData from "@/api/updateData";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export default function PictureUploader({
  productId,
  savedImages,
  images,
  setImages,
  setSavedImages,
}: {
  savedImages: string[]  ;
  productId: string;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setSavedImages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (url: string) => {
      setSavedImages(savedImages.filter((savedImage) => savedImage !== url));
      const { error } = await updateData({
        tableName: "products",
        payload:{
        extra_images_urls: savedImages,
      },
        match:{
          id: productId,
        },
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: async() => {
      toast.success("Success!", "Image Deleted successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["products", productId],
      });
    },
    onError: (error) => {
      toast.error(
        "Error",
        error.message || "An error occurred while deleting the Picture.",
      );
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.filter(
        (file) =>
          !images.some(
            (existingFile) =>
              existingFile.name === file.name &&
              existingFile.size === file.size,
          ),
      );
      if (newFiles.length > 0) {
        setImages((prevImages) => [...prevImages, ...newFiles]);
      } else {
        toast.error("Error", "This Image already exists.");
      }
    },
    [images, setImages, toast],
  );

  const removeImage = (fileName: string) => {
    setImages((prevImages) =>
      prevImages.filter((file) => file.name !== fileName),
    );
  };

  const renderImages = () => {
    const combinedImages = [...images, ...savedImages];
    return combinedImages.map((file, index) => (
      <div
        key={index}
        className="relative m-2 h-32 w-32 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={file instanceof File ? URL.createObjectURL(file) : file}
          alt={file instanceof File ? file.name : `Saved image ${index}`}
          className="h-full w-full rounded-md object-cover"
          width={500}
          height={500}
          draggable={false}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (file instanceof File) {
              removeImage(file.name);
            } else {
              deleteMutation.mutate(file);
            }
          }}
          className="absolute right-0 top-0 cursor-pointer rounded-full bg-red-500 px-2 py-1 text-sm text-white"
        >
          X
        </div>
      </div>
    ));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col gap-5 rounded-lg border-4 border-dashed p-8 text-center ${
          images.length > 0 || (savedImages && savedImages?.length > 0)
            ? "pb-0"
            : ""
        } ${isDragActive ? "border-green-500" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-green-500">Drop the images here ...</p>
        ) : (
          <p className="text-gray-500">
            Drag and drop some images here, or click to select images
          </p>
        )}
        <div className="m-auto mt-4 flex w-full flex-wrap justify-center">
          {renderImages()}
        </div>
      </div>
    </div>
  );
}
