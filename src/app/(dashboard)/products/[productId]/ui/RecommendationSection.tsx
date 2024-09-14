"use client";
import useProductById from "@/hooks/data/products/useProductById";
import useProducts from "@/hooks/data/products/useProducts";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ProductSwiper } from "./ProductSwiper";

export default function RecommendationSection() {
  const { productId } = useParams();
  const { data } = useProductById(String(productId));
  const product = data?.data;
  const limit = 12;
  const page = 1;
  const { data: products } = useProducts({
    page,
    limit,
    match: { category_id: product?.category_id },
  });
  return (
    <div className="mt-20 flex flex-col gap-12">
      <div className="flex flex-row items-center justify-center gap-3">
        <Image
          src="/home/icons/blue-flower.png"
          alt=""
          height={15}
          width={15}
        />
        <div className="text-2xl font-bold uppercase text-slate-700">
          We recommend
        </div>
        <Image
          src="/home/icons/blue-flower.png"
          alt=""
          height={15}
          width={15}
        />
      </div>
      <ProductSwiper products={products?.data} />
    </div>
  );
}
