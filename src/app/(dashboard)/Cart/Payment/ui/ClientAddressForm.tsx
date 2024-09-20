import { SelectGeneric } from "@/app/ui/SelectGeneric";
import React, { useState } from "react";
import { State, states } from "../constants/statesAndCities";
import TextInput from "./TextInput";
import getLocalValues from "@/helpers/getLocalValues";
import postLocalValues from "@/helpers/postLocalValues";
import Textarea from "./Textarea";

export default function ClientAddressForm({
  close,
  next,
}: {
  close: () => void;
  next: () => void;
}) {
  const defaultFormValues = getLocalValues("clientAddressForm");
  const [state, setState] = useState<State | undefined>(
    states.find((e) => e.state === defaultFormValues.state),
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    postLocalValues("clientAddressForm", event);
    next();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-6">
          <TextInput
            defaultValue={defaultFormValues.firstName}
            name="firstName"
            type="text"
            label="First Name"
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <TextInput
            defaultValue={defaultFormValues.lastName}
            name="lastName"
            type="text"
            label="Last Name"
          />
        </div>
        <div className="col-span-1 mt-3 hidden text-gray-500 xl:block">
          Prefix +216
        </div>
        <div className="col-span-12 xl:col-span-5">
          <TextInput
            defaultValue={defaultFormValues.telephone}
            name="telephone"
            type="number"
            label="Phone number"
          />
        </div>
        <div className="col-span-6 flex items-end justify-center xl:col-span-3">
          <SelectGeneric
            variant="oversized"
            defaultValue={
              state ? { label: state?.state, value: state?.state } : undefined
            }
            name="state"
            inputLabel="State"
            onChange={(state: string) =>
              setState(states.find((e) => e.state === state))
            }
            options={states.map((e) => ({
              label: e.state,
              value: e.state,
            }))}
          />
        </div>
        <div className="col-span-6 flex items-end justify-center xl:col-span-3">
          <SelectGeneric
            variant="oversized"
            defaultValue={
              defaultFormValues.city
                ? {
                    label: defaultFormValues.city,
                    value: defaultFormValues.city,
                  }
                : undefined
            }
            name="city"
            inputLabel={state ? "City" : "Select a state"}
            group={true}
            options={state?.cities.map((e) => ({ label: e, value: e })) ?? []}
          />
        </div>
        <div className="col-span-12">
          <TextInput
            defaultValue={defaultFormValues.adress}
            name="adress"
            type="email"
            label="Adresse"
          />
        </div>
        <div className="col-span-12 row-span-2">
          <Textarea
            defaultValue={defaultFormValues.addInfo}
            name="addInfo"
            type="text"
            label="Additional information"
          />
        </div>
      </div>
      <div className="mb-3 flex items-center justify-around"></div>
      <hr />
      <div className="flex flex-col gap-2 sm:flex-row-reverse">
        <button
          onClick={close}
          className="rounded-md bg-red-400 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-sm hover:shadow-red-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
