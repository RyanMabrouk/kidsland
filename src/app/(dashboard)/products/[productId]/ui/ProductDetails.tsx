"use client";
import AddToCartBtn from "@/app/(dashboard)/home/ui/ProductsSection/AddToCartBtn";
import useProductById from "@/hooks/data/products/useProductById";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { productId } = useParams();
  const { data } = useProductById(String(productId));
  const product = data?.data;
  return (
    <div className="flex flex-row gap-20 py-8 dark:bg-gray-800 md:flex-col">
      <div className="mx-auto flex max-w-6xl flex-row gap-20 px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 flex flex-row items-center gap-20">
          <div className="w-full px-4 md:flex-1">
            <div className="rounded-lg dark:bg-gray-700">
              <Image
                className="w-full object-scale-down"
                width={2000}
                height={1000}
                src={product?.image_url ?? ""}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="self-center px-4 md:flex-1">
            <h2 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
              {product?.title}
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              {product?.subtitle}
            </p>
            <div className="mb-4 flex flex-col items-start gap-2">
              <div className="mr-4 flex flex-row items-center gap-2">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <div className="flex flex-row items-center justify-start gap-4">
                  {!!product?.discount && (
                    <span className="text-color8">
                      {product.price_after_discount} TND
                    </span>
                  )}
                  {!!product?.discount ? (
                    <del>{product.price} TND</del>
                  ) : (
                    <span>{product?.price} TND</span>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span
                  className={`text-gray-600 dark:text-gray-300 ${
                    product?.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product?.available ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <div className="mb-4 flex">
              <div className="">
                <AddToCartBtn
                  product_id={product?.id ?? ""}
                  isInCart={product?.isInCart}
                  className="relative bottom-0 left-0 flex h-[2.5rem] w-[10rem] items-center justify-center opacity-100"
                />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
