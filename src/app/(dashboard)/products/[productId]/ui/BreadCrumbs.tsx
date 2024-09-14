"use client";
import useProductById from "@/hooks/data/products/useProductById";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BreadCrumbs() {
  const { productId } = useParams();
  const { data } = useProductById(String(productId));
  const product = data?.data;
  return (
    <div className="flex w-full items-center justify-center bg-gray-100">
      <div className="flex h-[3rem] w-full max-w-[75rem] flex-row items-center justify-start gap-3 px-6 text-sm capitalize">
        <Link
          href={"/home"}
          className="cursor-pointer leading-6 transition-all ease-linear hover:font-medium hover:text-slate-500 hover:underline"
        >
          home
        </Link>
        <span>{">"}</span>
        <Link
          href={"/products"}
          className="cursor-pointer leading-6 transition-all ease-linear hover:font-medium hover:text-slate-500 hover:underline"
        >
          toys
        </Link>
        {product?.title && (
          <>
            <span>{">"}</span>
            <Link
              href={`products/${productId}`}
              className="cursor-pointer leading-6 transition-all ease-linear hover:font-medium hover:text-slate-500 hover:underline"
            >
              {product?.title}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
