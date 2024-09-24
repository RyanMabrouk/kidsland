"use client";
import { useAddToCart } from "@/hooks/data/cart/addToCart";
import { cn } from "@/lib/utils";
import { FaShoppingCart } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "../../../../ui/Spinner";
import useTranslation from "@/translation/useTranslation";

export default function AddToCartBtn({
  product_id,
  isInCart,
  className,
  available,
}: {
  product_id: string;
  isInCart: boolean | undefined;
  className?: string;
  available: boolean | undefined;
}) {
  const { data: translation } = useTranslation();
  const { mutate: addToCart, isPending } = useAddToCart();
  return (
    <form className="flex items-start justify-start">
      <button
        disabled={isPending || isInCart || !available}
        formAction={async () => {
          await addToCart({
            product_id,
          });
        }}
        className={cn(
          `absolute bottom-[5%] left-[17.5%] z-0 flex h-[2.5rem] w-[10rem] flex-row items-center justify-center gap-2 rounded-xl border bg-white px-3 py-2 text-center text-sm font-semibold capitalize opacity-0 transition-all ease-linear hover:text-white group-hover:opacity-100 max-[540px]:left-[10%] max-[540px]:w-[8rem] max-[540px]:text-sm ${
            available
              ? isInCart
                ? "border-green-700 text-green-700 hover:bg-green-700"
                : "border-slate-700 text-slate-700 hover:bg-slate-700"
              : "border-red-700 text-red-700 hover:bg-red-700"
          }`,
          className,
        )}
      >
        {available ? (
          isInCart ? (
            <>
              <span>{translation?.lang["added"]}</span>
              <FaCheckCircle className="size-[1rem]" />{" "}
            </>
          ) : isPending ? (
            <Spinner />
          ) : (
            <>
              <span className="block min-w-max max-[830px]:hidden">
                {translation?.lang["add to cart"]}
              </span>
              <span className="hidden min-w-max max-[830px]:block">
                {translation?.lang["Cart"]}
              </span>
              <FaShoppingCart className="size-[1rem]" />
            </>
          )
        ) : (
          <span>{translation?.lang["Out of stock"]}</span>
        )}
      </button>
    </form>
  );
}
