import getLocalValues from "@/helpers/getLocalValues";
import postLocalValues from "@/helpers/postLocalValues";
import React, { useState } from "react";

export default function PaymentOptionsForm({ close }: { close: () => void }) {
  const defaultValues = getLocalValues("paymentOptionsForm");
  const [selectedOption, setSelectedOption] = useState<
    "cash" | "online" | undefined
  >(defaultValues.paymentOption);

  const cash = selectedOption === "cash";
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    postLocalValues("paymentOptionsForm", event);
    close();
  };

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <div className="mb-4 border-b pb-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentOption"
            value="cash"
            id="cash"
            checked={cash}
            onChange={() => setSelectedOption("cash")}
            className="h-5 w-5 transform rounded-full border-0 transition duration-300 ease-out checked:scale-125"
          />
          <label htmlFor="cash" className="text-lg font-semibold">
            Payez plus tard à la livraison par carte bancaire ou par cash
          </label>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Paiement au moment de la livraison ou à nos points de relais une fois
          que votre commande est livrée
        </p>
        {cash && (
          <div className="mt-3 rounded bg-gray-100 p-3">
            <p className="text-sm text-gray-700">
              Payez plus tard en espèces ou par carte bancaire au moment de la
              livraison ou au niveau des points relais, une fois que votre
              commande est livrée.
              <a href="#" className="ml-1 text-indigo-500">
                Détails
              </a>
            </p>
            <div className="mt-2 flex items-center justify-end">
              <span className="mr-2 text-sm text-gray-500">
                Nous acceptons:
              </span>
              <span className="text-2xl text-yellow-400">💳</span>
              <span className="ml-2 text-2xl text-yellow-400">💵</span>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentOption"
            value="online"
            id="online"
            checked={!cash}
            onChange={() => setSelectedOption("online")}
            className="h-5 w-5 transform rounded-full border-2 border-gray-300 text-orange-500 transition duration-300 ease-out checked:scale-125"
          />
          <label htmlFor="online" className="text-lg font-semibold">
            Payez en ligne maintenant !
          </label>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Réglez vos achats à travers JumiaPay, en utilisant votre carte
          Mastercard ou Visa.
        </p>
        {!cash && (
          <div className="mt-3 rounded bg-gray-100 p-3">
            <h1 className="mb-3 w-fit rounded-md bg-color1 p-2 text-white">
              Credit balance KidsLand : 0.00TND
            </h1>
            <hr />
            <p className="mt-2 text-sm text-gray-700">
              Réglez vos achats à travers Kidsland, en utilisant votre carte
              Mastercard ou Visa. Vous serez re-dirigé vers notre plateforme de
              paiement JumiaPay afin de compléter votre achat. Assurez-vous que
              vos détails de paiement sont bien à jour et que vous disposez des
              fonds nécessaires.
              <a href="#" className="ml-1 text-indigo-500">
                Détails
              </a>
            </p>
            <div className="mt-2 flex items-center justify-end">
              <span className="mr-2 text-sm text-gray-500">
                Nous acceptons:
              </span>
              <span className="text-2xl text-yellow-400">💳</span>
              <span className="ml-2 text-2xl text-yellow-400">💵</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 text-right">
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
          CONFIRM PAYMENT METHOD
        </button>
      </div>
    </form>
  );
}