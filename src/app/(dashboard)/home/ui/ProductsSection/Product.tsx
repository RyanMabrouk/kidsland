"use client";
import TooltipGeneric from "@/app/ui/InsightGeneric";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { WishlistHart } from "./WishListHart";
type ProductProps = {
  title: string;
  price: number;
  discount: number;
  image_url: string | null;
  price_after_discount: number;
  id: string;
  isInCart: boolean;
  isInWishlist: boolean;
};

export default function Product({
  title,
  price,
  price_after_discount,
  discount,
  image_url,
  id,
  isInCart,
  isInWishlist,
}: Partial<ProductProps>) {
  return (
    <div className="relative flex h-[25rem] w-[15rem] flex-col items-center justify-center gap-4 overflow-hidden">
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
        <Link href={`/products/${id}`}>
          <Image
            src={image_url ?? ""}
            alt=""
            width={2000}
            height={2000}
            className=".preserve-3d h-full w-full cursor-pointer rounded-md object-scale-down transition-all ease-linear group-hover:scale-[120%] group-hover:brightness-75"
          />
        </Link>
        <AddToCartBtn product_id={id ?? ""} isInCart={isInCart} />
      </div>
      <div className="fle z-20 w-full flex-col items-center justify-center gap-6 text-lg">
        <WishlistHart product_id={id} isInWishlist={isInWishlist}  variant="absolute"/>
        <TooltipGeneric tip={title ?? ""}>
          <span className="z-0 mr-9 line-clamp-1 text-left">{title}</span>
        </TooltipGeneric>
        <div className="flex flex-row items-center justify-start gap-4">
          {!!discount && (
            <span className="text-color8">{price_after_discount} TND</span>
          )}
          {!!discount ? <del>{price} TND</del> : <span>{price} TND</span>}
        </div>
      </div>
    </div>
  );
}
