import useOrders from "@/hooks/data/Orders/useOrders";
import OrderItem from "./OrderItem";
import { useOrderFilters } from "../context/FilterProvider";

export default function OrdersHistory() {
  const { filters, isReversed } = useOrderFilters();
  const { data: orders } = useOrders();
  const sortedOrders = orders?.sort((a, b) => {
    if (filters === "created_at") {
      return isReversed
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (filters === "status") {
      return isReversed
        ? ["approved", "pending", "fulfilled", "cancelled"].indexOf(b.status) -
            ["approved", "pending", "fulfilled", "cancelled"].indexOf(a.status)
        : ["approved", "pending", "fulfilled", "cancelled"].indexOf(a.status) -
            ["approved", "pending", "fulfilled", "cancelled"].indexOf(b.status);
    } else if (filters === "total_price") {
      return isReversed
        ? b.total_price - a.total_price
        : a.total_price - b.total_price;
    }
    return 0;
  });
  return (
    <div className="flex flex-col gap-10">
      {sortedOrders?.map((item) => {
        return <OrderItem key={item.id} order={item} />;
      })}
    </div>
  );
}
