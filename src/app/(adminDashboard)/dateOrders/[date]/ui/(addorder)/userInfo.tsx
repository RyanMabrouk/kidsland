import React from "react";
import { useOrder } from "./context/useOrder";
import { useStep } from "./context/useStep";
import { useToast } from "@/hooks/useToast";

export default function UserInfo() {
  const {order, setOrder } = useOrder();
  const {  setStep} = useStep()
  const { toast } = useToast();


  function saveOrderInfo(formData:FormData ) {
    const first_name = String(formData.get("first_name"));
    const last_name = String(formData.get("last_name"));
    const phone = String(formData.get("phone"));
    const address = String(formData.get("email"));
    const region = String(formData.get("region"));
    const city = String(formData.get("city"));
    const additional_info = String(formData.get("additional_info"));
    setOrder({
      id : 69,
      first_name : first_name,
      user_id : null,
      last_name : last_name,
      phone_number : phone,
      address : address,
      region : region,
      city : city,
      additional_info : additional_info,
      created_at : new Date().toISOString(),
      status : "pending",
      total_price : 69,
      wholesale_price :69,
      payment_method : "cash",
      cancel_reason : "none",})
      toast.success("User Information Saved Successfully!", "Continue Adding The Order Content");
      setStep(2);

    }

  return (
    <form action={saveOrderInfo} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-sm font-semibold text-gray-900">First Name</div>
          <div className="text-sm font-semibold text-gray-900">Last Name</div>
          <div>
            <input
              className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              type="text"
              placeholder="first name..."
              name="first_name"
              defaultValue={order?.first_name}
              required
            />
          </div>
          <div>
            <input
              className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              type="text"
              placeholder="last name..."
              name="last_name"
              defaultValue={order?.last_name}
              required
            />
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-900">Email</div>
        <input
          className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
          type="text"
          placeholder="email..."
          name="email"
          defaultValue={order?.address}

          required
        />
        <div className="text-sm font-semibold text-gray-900">Phone</div>
        <input
          className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
          type="text"
          placeholder="phone number..."
          name="phone"
          defaultValue={order?.phone_number}
          required
        />
         <div className="grid grid-cols-2 gap-3">
          <div className="text-sm font-semibold text-gray-900">Region</div>
          <div className="text-sm font-semibold text-gray-900">City</div>
          <div>
            <input
              className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              type="text"
              placeholder="region..."
              name="region"
              defaultValue={order?.region}
              required
            />
          </div>
          <div>
            <input
              className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              type="text"
              placeholder="city..."
              name="city"
              defaultValue={order?.city}
              required
            />
          </div>
        </div>
        
        <div className="text-sm font-semibold text-gray-900">Adress</div>
        <input
          className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
          type="text"
          placeholder="Username..."
          name="additional_info"
          defaultValue={order?.additional_info}
          required
        />

      </div>

      <button
        type="submit"
        className="right-0 mt-5 w-[10rem] rounded border border-slate-700 bg-slate-100 p-2 px-5 font-bold text-slate-700 duration-300 ease-in-out hover:bg-slate-600 hover:text-slate-200"
      >
        Save & Next
      </button>
    </form>
  );
}
