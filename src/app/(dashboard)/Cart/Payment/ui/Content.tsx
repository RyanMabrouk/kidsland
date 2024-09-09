"use client";

import handleSaveCash from "@/api/handleSaveCash";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Content() {
  const [cash, setCash] = useState(false);
  const [credit, setCredit] = useState(false);
  const { mutate: saveCash } = useMutation({ mutationFn: handleSaveCash });
  const { mutate: saveCredit } = useMutation({ mutationFn: handleSaveCash });

  return (
    <div className="flex w-full flex-col items-center gap-10">
      {cash || credit || (
        <>
          <button
            onClick={() => setCredit(true)}
            className="flex items-center gap-3 rounded-full bg-emerald-300 p-4 ring ring-emerald-200 ring-offset-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400 hover:ring-offset-1"
          >
            <img
              className="h-[2rem] w-[2rem]"
              src="/Cart/Payment/creditCard.png"
              alt=""
            />
            <div>Pay with Credit Card</div>
          </button>
          <button
            onClick={() => setCash(true)}
            className="flex items-center gap-3 rounded-full bg-sky-400 p-4 ring ring-sky-300 ring-offset-4 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500 hover:ring-offset-1"
          >
            <img
              className="h-[2rem] w-[2rem]"
              src="/Cart/Payment/cash.png"
              alt=""
            />
            <div>Payment with Cash</div>
          </button>
        </>
      )}
      {cash && (
        <form
          className="flex w-1/3 flex-col gap-5 rounded-xl border-dashed border-red-300 p-5 ring ring-pink-300 ring-offset-4 transition-all duration-300"
          action={saveCash}
        >
          <h1 className="text-center text-2xl">
            insert your informations here
          </h1>
          <div className="grid grid-cols-12 gap-3">
            <label htmlFor="name" className="col-span-4">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="insert your name here"
              className="col-span-8 outline-none"
            />
            <label htmlFor="name" className="col-span-4">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="col-span-8 outline-none"
            />

            <label htmlFor="telephone" className="col-span-4">
              Telephone Number:
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              placeholder="XX-XXX-XXX"
              className="col-span-8 outline-none"
            />

            <label htmlFor="location" className="col-span-4">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="insert the location where to deliver your order"
              className="col-span-8 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-xl bg-sky-400 p-4 px-10 ring ring-sky-300 ring-offset-4 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500 hover:ring-offset-1"
            >
              Pay
            </button>
          </div>
        </form>
      )}
      {credit && (
        <form
          className="flex w-1/3 flex-col gap-5 rounded-xl border-dashed border-red-300 p-5 ring ring-pink-300 ring-offset-4 transition-all duration-300"
          action={saveCredit}
        >
          <h1 className="text-center text-2xl">
            insert your informations here
          </h1>
          <div className="grid grid-cols-12 gap-3">
            <label htmlFor="name" className="col-span-4">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="insert your name here"
              className="col-span-8 outline-none"
            />
            <label htmlFor="name" className="col-span-4">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="col-span-8 outline-none"
            />

            <label htmlFor="telephone" className="col-span-4">
              Telephone Number:
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              placeholder="XX-XXX-XXX"
              className="col-span-8 outline-none"
            />

            <label htmlFor="location" className="col-span-4">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="insert the location where to deliver your order"
              className="col-span-8 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-xl bg-sky-400 p-4 px-10 ring ring-sky-300 ring-offset-4 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500 hover:ring-offset-1"
            >
              Pay
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
