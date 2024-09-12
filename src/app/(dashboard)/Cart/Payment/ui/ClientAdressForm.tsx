import { SelectGeneric } from "@/app/ui/SelectGeneric";
import React, { useEffect, useState } from "react";
import { State, states } from "../constants/statesAndCities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addClientAdress } from "@/api/handleClientAdress";
import { useToast } from "@/hooks/useToast";
import TextInput from "./TextInput";
import { useOrder } from "@/hooks/data/orders/useOrder";
import { updateClientAdress } from "@/api/updateClientAdress";

export default function ClientAdressForm({
  close,
  next,
}: {
  close: () => void;
  next: () => void;
}) {
  const { data: a } = useOrder();
  const order = a?.data;
  const [state, setState] = useState<State | undefined>(
    states.find((e) => e.state === order?.region),
  );
  useEffect(() => {
    if (order !== undefined) {
      setState(states.find((e) => e.state === order.region));
    }
  }, [order, setState, states]);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: add } = useMutation({
    mutationFn: addClientAdress,
    onSuccess: () => {
      toast.success("Adresse insérée avec succès");
      queryClient.invalidateQueries({ queryKey: ["order"] });
      next();
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
  const { mutate: update } = useMutation({
    mutationFn: updateClientAdress,
    onSuccess: () => {
      toast.success("Adresse modifiée avec succès");
      queryClient.invalidateQueries({ queryKey: ["order"] });

      next();
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });

  return (
    <form
      action={order === undefined ? add : update}
      className="flex flex-col gap-5 p-5"
    >
      <div className="font-bold">Modifier l'adresse</div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <TextInput
            defaultValue={order?.first_name}
            name="firstName"
            type="text"
            label="Prénom / nom de la société"
          />
        </div>
        <div className="col-span-6">
          <TextInput
            defaultValue={order?.last_name}
            name="lastName"
            type="text"
            label="Nom / matricule fiscale-RNE"
          />
        </div>
        <div className="col-span-1">Préfixe +216</div>
        <div className="col-span-5">
          <TextInput
            name="telephone"
            defaultValue={order?.phone_number}
            type="number"
            label="Téléphone mobile"
          />
        </div>
        <div className="col-span-1">Préfixe +216</div>
        <div className="col-span-5">
          <TextInput
            defaultValue=""
            name="telephone2"
            type="number"
            label="Téléphone mobile supplémentaire"
          />
        </div>
        <div className="col-span-12">
          <TextInput
            name="adress"
            defaultValue={order?.address}
            type="email"
            label="Adresse"
          />
        </div>
        <div className="col-span-12">
          <TextInput
            defaultValue={order?.additional_info}
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
          defaultValue={{ label: order?.city, value: order?.city ?? "" }}
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
