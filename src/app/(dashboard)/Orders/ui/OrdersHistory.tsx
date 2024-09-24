import OrderItem from "./OrderItem";
import { useOrderFilters } from "../context/FilterProvider";
import { OrderStatusEnum } from "@/types/database.tables.types";
import useUserOrders from "@/hooks/data/orders/useUserOrders";

export default function OrdersHistory() {
  const { sortBy, isReversed, filters } = useOrderFilters();
  const { data: orders } = useUserOrders();
  const statuses = ["pending", "approved", "cancelled", "fulfilled"] as const;
  const sortedOrders = orders?.sort((a, b) => {
    if (sortBy === "created_at") {
      return isReversed
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortBy === "status") {
      return isReversed
        ? statuses.indexOf(b.status) - statuses.indexOf(a.status)
        : statuses.indexOf(a.status) - statuses.indexOf(b.status);
    } else if (sortBy === "total_price") {
      return isReversed
        ? b.total_price - a.total_price
        : a.total_price - b.total_price;
    }
    return 0;
  });
  const finalOrders = sortedOrders?.filter((order) => {
    if (
      filters[OrderStatusEnum.CANCELLED] &&
      order.status === OrderStatusEnum.CANCELLED
    )
      return order;
    if (
      filters[OrderStatusEnum.PENDING] &&
      order.status === OrderStatusEnum.PENDING
    )
      return order;
    if (
      filters[OrderStatusEnum.APPROVED] &&
      order.status === OrderStatusEnum.APPROVED
    )
      return order;
    if (
      filters[OrderStatusEnum.FULFILLED] &&
      order.status === OrderStatusEnum.FULFILLED
    )
      return order;
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
