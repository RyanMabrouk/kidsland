import useCreateOrder from "@/hooks/data/orders/createOrder";
import useCartPopulated from "@/hooks/data/cart/useCartPopulated";
import React from "react";
import { Spinner } from "@/app/ui/Spinner";
import getLocalValues from "@/helpers/getLocalValues";
import { redirect } from "next/navigation";

export default function OrderResume() {
  const { data: cart } = useCartPopulated();
  const clientAdressForm = getLocalValues("clientAddressForm");
  const paymentOptionsForm = getLocalValues("paymentOptionsForm");
  const orderDetails = {
    first_name: clientAdressForm.firstName,
    last_name: clientAdressForm.lastName,
    address: clientAdressForm.adress,
    region: clientAdressForm.state,
    city: clientAdressForm.city,
    phone_number: clientAdressForm.telephone,
    additional_info: clientAdressForm.addInfo,
    payment_method: paymentOptionsForm.paymentOption,
  };
  const { mutate, isPending } = useCreateOrder();
  if (cart.total_products_quantity === 0) redirect("/Cart");
  return (
    <form
      action={() => {
        mutate(orderDetails);
        redirect("/Cart");
      }}
      className="sticky top-20 flex h-fit w-[18rem] flex-col gap-2 rounded-xl bg-white p-4 shadow-2xl transition-all duration-300"
    >
      <h1 className="p-2 text-center">Order Resume</h1>
      <hr />
      <div className="flex justify-between p-2">
        <h1>Total Articles : ({cart.total_products_quantity})</h1>
        <h1>{cart.total_after_discount} TND</h1>
      </div>
      <hr />
      <div className="flex flex-row justify-between p-2">
        <h1>Delivery Costs :</h1>
        <div className="flex flex-row items-center gap-2">
          <span>{cart.delivery_cost} TND</span>
          {cart.isFreeDelivery && (
            <del className="text-color8">
              {cart.delivery_cost_before_discount} TND
            </del>
          )}
        </div>
      </div>
      <hr />
      <div className="flex justify-between p-2">
        <h1>Total :</h1>
        <h1 className="text-xl">{cart.total_with_delivery} TND</h1>
      </div>
      <hr />
      <button
        type="submit"
        className="flex items-center justify-center rounded-lg bg-color1 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-red-400"
      >
        {isPending ? <Spinner /> : "Confirm the Order"}
      </button>
      <h1 className="p-2">(complete the steps to continue)</h1>
    </form>
  );
}