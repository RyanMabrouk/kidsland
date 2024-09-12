import React from "react";

export default function PaymentButtons() {
  return (
    <>
      <div>
        <button className="flex items-center gap-3 rounded-full bg-emerald-300 p-4 ring ring-emerald-200 ring-offset-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400 hover:ring-offset-1">
          <img
            className="h-[2rem] w-[2rem]"
            src="/Cart/Payment/creditCard.png"
            alt=""
          />
          <div>Pay with Credit Card</div>
        </button>
      </div>
      <div>
        <button className="flex items-center gap-3 rounded-full bg-sky-400 p-4 ring ring-sky-300 ring-offset-4 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500 hover:ring-offset-1">
          <img
            className="h-[2rem] w-[2rem]"
            src="/Cart/Payment/cash.png"
            alt=""
          />
          <div>Payment with Cash</div>
        </button>
      </div>
    </>
  );
}
