"use server";

import { cookies } from "next/headers";
import getUser from "../getUser";
import deleteData from "../deleteData";

async function handleDeleteCartItem(id: string) {
  const {
    data: { user },
  } = await getUser();
  await deleteData({
    tableName: "cart",
    match: { user_id: user.id, product_id: id },
  });
}

export default handleDeleteCartItem;
