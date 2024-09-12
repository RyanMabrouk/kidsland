import { SelectGeneric } from "@/app/ui/SelectGeneric";
import React, { useState } from "react";
import { State, states } from "../constants/statesAndCities";
import { useMutation } from "@tanstack/react-query";
import { handleClientAdress } from "@/api/handleClientAdress";
import { useToast } from "@/hooks/useToast";
import TextInput from "./TextInput";
import { useOrders } from "@/hooks/data/orders/useOrders";

export default function ClientAdressForm({ close }: { close: () => void }) {
  const [state, setState] = useState<State | undefined>(undefined);
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: handleClientAdress,
    onSuccess: () => {
      toast.success("Adresse modifiée avec succès");
      close();
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });

  return (
    <form action={mutate} className="flex flex-col gap-5 p-5">
      <div className="font-bold">Modifier l'adresse</div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <TextInput
            name="firstName"
            type="text"
            label="Prénom / nom de la société"
          />
        </div>
        <div className="col-span-6">
          <TextInput
            name="lastName"
            type="text"
            label="Nom / matricule fiscale-RNE"
          />
        </div>
        <div className="col-span-1">Préfixe +216</div>
        <div className="col-span-5">
          <TextInput name="telephone" type="number" label="Téléphone mobile" />
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
          <TextInput name="adress" type="email" label="Adresse" />
        </div>
        <div className="col-span-12">
          <TextInput
            name="addInfo"
            type="text"
            label="Informations Supplémentaires"
          />
        </div>
      </div>
      <div className="mb-3 flex items-center justify-around">
        <SelectGeneric
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
