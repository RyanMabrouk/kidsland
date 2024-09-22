import useOrders from "@/hooks/data/Orders/useOrders";
import OrderItem from "./OrderItem";

export default function OrdersHistory() {
  const { data: orders } = useOrders();
  return (
    <div className="flex flex-col gap-10 p-5">
      {orders?.map((item) => {
        return <OrderItem key={item.id} order={item} />;
      })}
    </div>
  );
}
