import CartItem from "@/app/(dashboard)/Cart/ui/CartItem";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import { formatProduct } from "@/hooks/data/products/formatProducts";
import { Tables } from "@/types/database.types";
import OrderItem from "./OrderItem";

export default function OrderProducts({
  products,
}: {
  products: Tables<"order_products">[] | null;
}) {
  if (!products) return null;
  console.log(products);
  return (
    <div className="flex flex-col gap-2">
      {products.length} ***
      {products.map((item) => {
        return (
          <div className="">
            <OrderItem item={item} />
          </div>
        );
      })}
    </div>
  );
}
