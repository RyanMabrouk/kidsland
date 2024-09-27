"use server";
import postData from "@/api/postData";
import getData from "@/api/getData";
import { ICartResponse } from "../../hooks/data/cart/cartPopulatedQuery";
import { Tables } from "@/types/database.types";
import { OrderStatusEnum } from "@/types/database.tables.types";
import { formatProduct } from "@/hooks/data/products/formatProducts";
import getTranslation from "@/translation/getTranslation";

export default async function confirmOrder({
  order,
}: {
  order: Omit<
    Tables<"orders">,
    | "cancel_reason"
    | "created_at"
    | "id"
    | "status"
    | "total_price"
    | "user_id"
    | "wholesale_price"
  >;
}) {
  const translation = await getTranslation("fr");
  const { data: cart } = await getData<"cart", ICartResponse[]>({
    tableName: "cart",
    column: "*,products(*)",
    user: true,
  });
  if (!cart || cart.length === 0)
    throw new Error(translation.lang["Cart is empty"]);
  const user_id = cart[0].user_id;
  const total_price = cart
    .map((cartItem) => ({
      ...cartItem,
      product: formatProduct(cartItem.products, {
        wishlist: [],
        cart: cart.reduce((acc: string[], b) => [...acc, b.product_id], []),
      }),
    }))
    .reduce((acc, cartItem) => {
      if (!cartItem.product) {
        throw new Error(translation.lang["Product not found"]);
      }
      if (cartItem.product.stock < cartItem.quantity) {
        throw new Error(
          translation.lang["Not enough stock for ${PRODUCT_NAME}"].replace(
            "${PRODUCT_NAME}",
            cartItem.product.title,
          ),
        );
      }
      return acc + cartItem.quantity * cartItem.product?.price_after_discount;
    }, 0);
  const wholesale_price = cart.reduce(
    (acc, b) => acc + b.quantity * b.products.wholesale_price,
    0,
  );
  const { data: newOrder, error: ordersError } = await postData<"orders">({
    tableName: "orders",
    payload: [
      {
        ...order,
        wholesale_price,
        status: OrderStatusEnum.PENDING,
        total_price,
        user_id,
      },
    ],
  });
  if (ordersError || !newOrder || newOrder.length === 0)
    throw new Error(translation.lang["Failed to submit order"]);
  const { error: orderProductsError } = await postData<"order_products">({
    tableName: "order_products",
    payload: cart.map((item) => ({
      discount_type: item.products.discount_type,
      discount: item.products.discount,
      price_before_discount: item.products.price,
      wholesale_price: item.products.wholesale_price,
      order_id: newOrder[0].id,
      product_id: item.product_id,
      quantity: item.quantity,
    })),
  });
  if (orderProductsError)
    throw new Error(translation.lang["Something went wrong while ordering"]);
  return user_id;
}
