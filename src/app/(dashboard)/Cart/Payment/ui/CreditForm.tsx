import handleSaveCredit from "@/api/handleSaveCredit";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function CreditForm() {
  const { mutate: saveCredit } = useMutation({ mutationFn: handleSaveCredit });

  return (
    <form
      className="flex w-full flex-col gap-5 rounded-xl p-5 transition-all duration-300"
      action={saveCredit}
    >
      <h1 className="text-center text-2xl">insert your informations here</h1>
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
  );
}
