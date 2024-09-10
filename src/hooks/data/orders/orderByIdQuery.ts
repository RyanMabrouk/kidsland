import getOrdersById from "@/api/Orders/getOrderById";
const ordersByIdQuery = (orderId: number) => ({
  queryKey: [
    "orders",
    {
      orderId,
    },
  ],
  queryFn: async () => {
    return await getOrdersById(orderId);  
  },
  enabled: !!orderId, 
});

export default ordersByIdQuery;
