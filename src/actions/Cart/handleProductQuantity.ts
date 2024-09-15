import getUser from "../../api/getUser";
import updateData from "@/api/updateData";

async function handleProductQuantity(id: string, quantity: number) {
  if (quantity < 0) {
    throw new Error("Quantity must be positive");
  }
  const {
    data: { user },
  } = await getUser();
  const { data, error } = await updateData<"cart">({
    tableName: "cart",
    payload: { quantity },
    match: { user_id: user.id, product_id: id },
  });
  if (error) {
    throw new Error(error.message);
  }
}

export default handleProductQuantity;
