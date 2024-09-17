import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import Link from "next/link";

export default function OrderButton() {
  const { data: cart } = useCartPopulated();
  const quantity = cart?.data?.reduce((acc, item) => acc + item.quantity, 0);

  if (cart?.data?.length === 0) {
    return (
      <Link
        href="products"
        className="w-full rounded-lg cursor-not-allowed bg-color1 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-gray-800"
      >
        Order Some Products first
      </Link>
    );
  }
  if (quantity === 0) {
    return (
      <div className="w-full rounded-lg bg-gray-600 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-gray-800">
        Select a quantity
      </div>
    );
  }

  return (
    <Link
      href="/Cart/Payment"
      className="w-full rounded-lg bg-color1 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-red-400"
    >
      Order ({cart.total_after_discount} TND)
    </Link>
  );
}
