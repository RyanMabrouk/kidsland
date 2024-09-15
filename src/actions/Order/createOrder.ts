import postData from "@/api/postData";
import getLocalValues from "@/helpers/getLocalValues";
import getData from "@/api/getData";
import { ICartResponse } from "../../hooks/data/cart/cartPopulatedQuery";
import { TablesInsert } from "@/types/database.types";

export default async function createOrder() {
  const clientAdressForm = getLocalValues("clientAddressForm");
  const paymentOptionsForm = getLocalValues("paymentOptionsForm");
  const {
    first_name,
    last_name,
    address,
    region,
    city,
    phone_number,
    additional_info,
  } = {
    first_name: clientAdressForm?.firstName,
    last_name: clientAdressForm?.lastName,
    address: clientAdressForm?.adress,
    region: clientAdressForm?.state,
    city: clientAdressForm?.city,
    phone_number: clientAdressForm?.telephone,
    additional_info: clientAdressForm?.addInfo,
  };
  const { payment_method } = {
    payment_method: paymentOptionsForm?.paymentOption,
  };
  const { data: cart } = await getData<"cart", ICartResponse[]>({
    tableName: "cart",
    column: "*,products(*)",
    user: true,
  });
  const user_id = cart?.[0]?.user_id ?? "";
  const total_price =
    cart?.reduce(
      (a, b) =>
        a +
        b.quantity *
          (b.products.discount_type === "fixed"
            ? b.products.price - b.products.discount
            : b.products.price * (1 - b.products.discount / 100)),
      0,
    ) ?? 0;
  const wholesale_price =
    cart?.reduce((a, b) => a + b.quantity * b.products.wholesale_price, 0) ?? 0;

  if (!total_price) throw new Error("Cart is empty");
  if (
    !first_name ||
    !last_name ||
    !address ||
    !region ||
    !city ||
    !phone_number ||
    !payment_method ||
    !user_id ||
    !wholesale_price
  )
    throw new Error("Missing required fields");
  else {
    const { data } = await postData<"orders">({
      tableName: "orders",
      payload: [
        {
          wholesale_price,
          status: "pending",
          first_name,
          last_name,
          address,
          region,
          city,
          phone_number,
          additional_info,
          payment_method,
          total_price,
          user_id,
        },
      ],
    });
    if (!data) throw new Error("Failed to create order");
    const { error } = await postData<"order_products">({
      tableName: "order_products",
      payload:
        cart?.map(
          (item) =>
            ({
              discount_type: item.products.discount_type,
              discount: item.products.discount,
              price_before_discount: item.products.price,
              wholesale_price: item.products.wholesale_price,
              order_id: data[0].id,
              product_id: item.product_id,
              quantity: item.quantity,
            }) as TablesInsert<"order_products">,
        ) ?? [],
    });
    if (error) throw new Error(error.message);
  }
  return user_id;
}
