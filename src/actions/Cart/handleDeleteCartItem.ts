"use server";

import getUser from "../../api/getUser";
import deleteData from "../../api/deleteData";

async function handleDeleteCartItem(id: string) {
  const {
    data: { user },
  } = await getUser();
  await deleteData<"cart">({
    tableName: "cart",
    match: { user_id: user.id, product_id: id },
  });
}

export default handleDeleteCartItem;
