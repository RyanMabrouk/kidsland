"use client";
import { useAddToWishlist } from "@/hooks/data/wishlist/addToWishlist";
import { useRemoveFromWishlist } from "@/hooks/data/wishlist/removeFromWishlist";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export function WishlistHart({
  isInWishlist,
  product_id,
  variant,
}: {
  isInWishlist: boolean | undefined;
  product_id: string | undefined;
  variant: "absolute" | "relative";
}) {
  const { mutate: addToWishlist, isPending: isPending1 } = useAddToWishlist();
  const { mutate: removeFromWishlist, isPending: isPending2 } =
    useRemoveFromWishlist();
  const isPending = isPending1 || isPending2;
  return (
    <>
      <FaRegHeart
        onClick={async () => {
          if (product_id && !isPending && !isInWishlist) {
            addToWishlist({ product_id });
          }
          if (product_id && !isPending && isInWishlist) {
            removeFromWishlist({ product_id });
          }
        }}
        data-tip={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={`peer tooltip tooltip-top z-50 h-6 w-6 cursor-pointer bg-clip-text text-color8 opacity-100 transition-all ease-linear hover:scale-110 ${isInWishlist || isPending ? "opacity-0" : "hover:opacity-0"} ${
          variant === "absolute" ? "absolute bottom-9 right-3" : "mt-2"
        }`}
      />
      <FaHeart
        data-tip={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={`tooltip tooltip-top z-30 h-6 w-6 cursor-pointer text-color8 transition-all ease-linear peer-hover:scale-110 peer-hover:opacity-100 ${isInWishlist || isPending ? "opacity-100" : "opacity-0"} ${
          variant === "absolute"
            ? "absolute bottom-9 right-3"
            : "-ml-[2rem] mt-2"
        }`}
      />
    </>
  );
}