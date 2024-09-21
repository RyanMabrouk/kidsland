"use client";
import { useAddToCart } from "@/hooks/data/cart/addToCart";
import { cn } from "@/lib/utils";
import { FaShoppingCart } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "../../../../ui/Spinner";

export default function AddToCartBtn({
  product_id,
  isInCart,
  className,
}: {
  product_id: string;
  isInCart: boolean | undefined;
  className?: string;
}) {
  const { mutate: addToCart, isPending } = useAddToCart();
  return (
    <form className="flex justify-start items-start">
      {isInCart ? (
        <div
          className={cn(
            "absolute bottom-[5%] left-[17.5%] z-0 flex h-[2.5rem] w-[10rem] flex-row items-center justify-center gap-2 rounded-xl border border-green-700 bg-white px-3 py-2 text-center text-sm font-semibold capitalize text-green-700 opacity-0 transition-all ease-linear hover:bg-green-700 hover:text-white group-hover:opacity-100 max-[540px]:left-[10%] max-[540px]:w-[8rem] max-[540px]:text-sm",
            className,
          )}
        >
          <span>added</span>
          <FaCheckCircle className="size-[1rem]" />
        </div>
      ) : (
        <button
          className={cn(
            `absolute bottom-[5%] left-[17.5%] z-0 flex h-[2.5rem] w-[10rem] flex-row items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white px-3 py-2 text-center text-sm font-semibold capitalize text-slate-700 opacity-0 transition-all ease-linear hover:bg-slate-700 hover:text-white group-hover:opacity-100 max-[540px]:left-[10%] max-[540px]:w-[8rem]`,
            className,
          )}
          disabled={isPending}
          formAction={async () => {
            await addToCart({
              product_id,
            });
          }}
        >
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <span>add to cart</span>
              <FaShoppingCart className="size-[1rem]" />
            </>
          )}
        </button>
      )}
    </form>
  );
}
