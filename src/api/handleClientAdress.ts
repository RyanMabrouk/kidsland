"use server";

import { TablesInsert } from "@/types/database.types";
import getUser from "./getUser";
import { postOrder } from "./postOrder";
import { useCart } from "@/hooks/data/products/useCart";

export async function handleClientAdress(formData: FormData) {
  console.log(1);
  const { data: cart } = useCart();
  console.log(2);
  const user = (await getUser()).data?.user;
  const user_id = user?.id;
  const wholesale_price =
    cart?.reduce((a, b) => a + b.product.wholesale_price * b.quantity, 0) ?? 0;
  const total_price =
    cart?.reduce(
      (a, b) => a + b.product.price_after_discount * b.quantity,
      0,
    ) ?? 0;

  const {
    firstName,
    lastName,
    telephone,
    telephone2, // TODO: the field doesn't exist in the database
    adress,
    addInfo,
    state,
    city,
  } = Object.fromEntries(formData);
  const newOrder: TablesInsert<"orders"> = {
    total_price,
    user_id,
    status: "pending", // TODO
    username: "", // TODO
    wholesale_price,
    first_name: firstName as string,
    last_name: lastName as string,
    phone_number: telephone as string,
    address: adress as string,
    additional_info: addInfo as string,
    region: state as string,
    city: city as string,
    payment_method: "cash", // TODO: not always it is like this, maybe it should be null
  };
  const { data } = await postOrder(newOrder);

  return;
}
