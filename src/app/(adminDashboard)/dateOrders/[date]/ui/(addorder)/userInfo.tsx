import React from "react";

export default function UserInfo() {
  return (
    <form className="flex flex-col gap-5">
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
              required
            />
          </div>
          <div>
            <input
              className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              type="text"
              placeholder="last name..."
              name="last_name"
              required
            />
          </div>
        </div>
        <div className="text-sm font-semibold text-gray-900">phone</div>
        <input
          className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
          type="text"
          placeholder="phone number..."
          name="phone"
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
              required
            />
          </div>
          <div>
            <input
              className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
              type="text"
              placeholder="city..."
              name="city"
              required
            />
          </div>
        </div>
        
        <div className="text-sm font-semibold text-gray-900">Adresse</div>
        <input
          className="tx-lg w-full border-[1px] border-gray-200 px-4 py-2 text-gray-500 placeholder:text-sm placeholder:text-gray-300 focus:outline-none"
          type="text"
          placeholder="Username..."
          name="Adresse"
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
