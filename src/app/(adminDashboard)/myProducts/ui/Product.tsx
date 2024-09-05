"use client";
import TooltipGeneric from "@/app/ui/InsightGeneric";
import Image from "next/image";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

type ProductProps = {
  title: string;
  price: number;
  discount: number;
  image_url: string | null;
  price_after_discount: number;
  id: string;
};

export default function Product({
  title,
  price,
  price_after_discount,
  discount,
  image_url,
  id,
}: Partial<ProductProps>) {
  return (
    <Link
      href={`/products/${id}`}
      className="relative flex h-[25rem] w-[15rem] flex-col items-center justify-center gap-4 overflow-hidden"
    >
      <div className="group h-full w-full overflow-hidden rounded-md border transition-all ease-linear hover:backdrop-brightness-75">
        {!!discount && (
          <Image
            src={"/home/icons/promo.png"}
            alt=""
            width={1000}
            height={1000}
            className=".preserve-3d absolute -left-[9px] -top-[10px] h-[6rem] w-[6rem] rounded-tl-lg border-t transition-all duration-200 ease-out group-hover:-left-[7px] group-hover:-top-[8px] group-hover:opacity-0"
          />
        )}
        <Image
          src={image_url ?? ""}
          alt=""
          width={2000}
          height={2000}
          className=".preserve-3d h-full w-full cursor-pointer rounded-md object-scale-down transition-all ease-linear group-hover:scale-[120%] group-hover:brightness-75"
        />
        <Link href={`/editProduct/${id}`}>
        <button
          className={`absolute bottom-[5%] left-[17.5%] flex h-[2.5rem] w-[10rem] flex-row items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white px-3 py-2 text-center text-sm font-semibold capitalize text-slate-700 opacity-0 transition-all ease-linear hover:bg-slate-700 hover:text-white group-hover:opacity-100`}

               >
          <span>Edit Artcile</span>
          <FaPen className="size-[1rem]" />
        </button>
        </Link>
      </div>

      <div className="fle w-full flex-col items-center justify-center gap-6 text-lg">
        <TooltipGeneric tip={title ?? ""}>
          <span className="line-clamp-1 text-left">{title}</span>
        </TooltipGeneric>
        <div className="flex flex-row items-center justify-start gap-4">
          {!!discount && (
            <span className="text-color8">{price_after_discount} TND</span>
          )}
          {!!discount ? <del>{price} TND</del> : <span>{price} TND</span>}
        </div>
      </div>
    </Link>
  );
}
