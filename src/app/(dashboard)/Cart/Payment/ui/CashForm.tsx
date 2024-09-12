import handleSaveCash from "@/api/handleSaveCash";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function CashForm() {
  const { mutate: saveCash } = useMutation({ mutationFn: handleSaveCash });

  return (
    <form
      className="flex h-[30rem] w-full flex-col gap-5 rounded-xl p-5 transition-all duration-300"
      action={saveCash}
    >
      <h1 className="text-center text-2xl">insert your informations here</h1>
      <div className="grid flex-1 grid-cols-12 gap-3">
        <div className="col-span-3 flex items-center">
          <label htmlFor="name" className="items-center">
            Name:
          </label>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="insert your name here"
          className="col-span-9 outline-none"
        />
        <div className="col-span-3 flex items-center">
          <label htmlFor="name" className="">
            E-mail:
          </label>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          className="col-span-9 outline-none"
        />

        <div className="col-span-3 flex items-center">
          <label htmlFor="telephone" className="items-center">
            Telephone Number:
          </label>
        </div>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="XX-XXX-XXX"
          className="col-span-9 outline-none"
        />

        <div className="col-span-3 flex items-center">
          <label htmlFor="location" className="items-center">
            Location:
          </label>
        </div>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="insert the location where to deliver your order"
          className="col-span-9 outline-none"
        />
        <div className="col-span-3 flex items-center">
          <label htmlFor="location" className="items-center">
            Additional Informations:
          </label>
        </div>
        <textarea
          id="addinfo"
          name="addinfo"
          placeholder="insert additional informations about your order here"
          rows={5}
          className="col-span-9 max-h-[10rem] border border-dashed border-black outline-none"
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
