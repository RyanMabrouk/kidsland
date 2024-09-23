import OrderItem from "./OrderItem";
import { OrderProduct } from "@/hooks/data/Orders/OrderByIdQuery";

export default function OrderProducts({
  products,
}: {
  products: OrderProduct[];
}) {
  if (!products) return null;
  console.log(products);
  return (
    <div className="flex flex-col gap-3 bg-gray-100 p-5">
      {products.map((item) => {
        return <OrderItem item={item} />;
      })}
    </div>
  );
}
