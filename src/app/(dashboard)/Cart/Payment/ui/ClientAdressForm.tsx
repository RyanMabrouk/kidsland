import { SelectGeneric } from "@/app/ui/SelectGeneric";
import React, { useState } from "react";
import { State, states } from "../constants/statesAndCities";
import TextInput from "./TextInput";
import getLocalValues from "@/helpers/getLocalValues";
import postLocalValues from "@/helpers/postLocalValues";

export default function ClientAdressForm({
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
      <div className="font-bold">Modifier l'adresse</div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <TextInput
            defaultValue={defaultFormValues.firstName}
            name="firstName"
            type="text"
            label="Prénom / nom de la société"
          />
        </div>
        <div className="col-span-6">
          <TextInput
            defaultValue={defaultFormValues.lastName}
            name="lastName"
            type="text"
            label="Nom / matricule fiscale-RNE"
          />
        </div>
        <div className="col-span-1">Préfixe +216</div>
        <div className="col-span-5">
          <TextInput
            defaultValue={defaultFormValues.telephone}
            name="telephone"
            type="number"
            label="Téléphone mobile"
          />
        </div>
        <div className="col-span-1">Préfixe +216</div>
        <div className="col-span-5">
          <TextInput
            name="telephone2"
            type="number"
            label="Téléphone mobile supplémentaire"
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
        <div className="col-span-12">
          <TextInput
            defaultValue={defaultFormValues.addInfo}
            name="addInfo"
            type="text"
            label="Informations Supplémentaires"
          />
        </div>
      </div>
      <div className="mb-3 flex items-center justify-around">
        <SelectGeneric
          defaultValue={{ label: state?.state, value: state?.state ?? "" }}
          name="state"
          label="Region"
          onChange={(state: string) =>
            setState(states.find((e) => e.state === state))
          }
          options={states.map((e) => ({
            label: e.state,
            value: e.state,
          }))}
        />
        <SelectGeneric
          defaultValue={{
            label: defaultFormValues.city,
            value: defaultFormValues.city,
          }}
          label="City"
          name="city"
          group={true}
          options={
            state
              ? state.cities.map((e) => ({ label: e, value: e }))
              : [{ label: "", value: "", group_name: "select a state first" }]
          }
        />
      </div>
      <hr />
      <div className="flex justify-end gap-2">
        <button
          onClick={close}
          className="rounded-md bg-red-400 p-4 font-semibold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-sm hover:shadow-red-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded-md bg-orange-400 p-4 font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-sm hover:shadow-orange-500"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
