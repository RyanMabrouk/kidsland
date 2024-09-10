import getData from "@/api/getData";

const cartQuery = () => ({
  queryKey: [
    "cart",
    {
      user: true,
    },
  ],
  queryFn: async () => {
    const res = await getData<"cart">({
      tableName: "cart",
      user: true,
    });
    return { ...res, data: res.data?.map((e) => e.product_id) };
  },
});

export { cartQuery };
