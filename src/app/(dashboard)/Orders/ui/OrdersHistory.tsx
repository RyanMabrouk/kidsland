import useOrders from "@/hooks/data/Orders/useOrders";
import OrderItem from "./OrderItem";
import { useOrderFilters } from "../context/FilterProvider";

export default function OrdersHistory() {
  const { sortBy, isReversed, filters } = useOrderFilters();
  const { data: orders } = useOrders();
  const sortedOrders = orders?.sort((a, b) => {
    if (sortBy === "created_at") {
      return isReversed
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortBy === "status") {
      return isReversed
        ? ["approved", "pending", "fulfilled", "cancelled"].indexOf(b.status) -
            ["approved", "pending", "fulfilled", "cancelled"].indexOf(a.status)
        : ["approved", "pending", "fulfilled", "cancelled"].indexOf(a.status) -
            ["approved", "pending", "fulfilled", "cancelled"].indexOf(b.status);
    } else if (sortBy === "total_price") {
      return isReversed
        ? b.total_price - a.total_price
        : a.total_price - b.total_price;
    }
    return 0;
  });
  const finalOrders = sortedOrders?.filter((order) => {
    if (filters.cancelled && order.status === "cancelled") return order;
    if (filters.pending && order.status === "pending") return order;
    if (filters.approved && order.status === "approved") return order;
    if (filters.fulfilled && order.status === "fulfilled") return order;
    return null;
  });
  return (
    <div className="flex flex-col gap-10">
      {finalOrders?.map((item) => {
        return <OrderItem key={item.id} order={item} />;
      })}
    </div>
  );
}
