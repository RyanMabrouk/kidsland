import getData from "@/api/getData";
const productByIdQuery = ({ id }: { id: string }) => ({
  queryKey: ["products", {id}],
  queryFn: async () => {
    return await getData<"products">({
      tableName: "products",
      match: { id },
    });
  },
  enabled: id !== undefined && id !== null && id !== "undefined",
});

export { productByIdQuery };
