import { RiCarLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineVpnLock } from "react-icons/md";
export default function Policies() {
  const policies = [
    {
      title: "FREE SHIPPING",
      description:
        "You pay the delivery to the courier when you pick up the package. Free home delivery for orders over 100 TND.",
      icon: <RiCarLine className="mt-1 size-[2rem] text-color8" />,
    },
    {
      title: "24/7 SUPPORT",
      description:
        "Our team is at your disposal every working day from 8 a.m. to 4 p.m. Phone: 067 071 999 or email: kidsland.online@donator.co.me.",
      icon: <MdOutlineSupportAgent className="mt-1 size-[2rem] text-color8" />,
    },
    {
      title: "14 DAY REFUND",
      description:
        "For all orders, you have a legal period of 14 days in which you can return the goods, respecting the conditions of purchase and the right of the buyer to unilaterally terminate the contract.",
      icon: <FaClockRotateLeft className="mt-1 size-[1.75rem] text-color8" />,
    },
    {
      title: "100% SECURE PAYMENT",
      description:
        "No matter which payment method you choose, your transaction will go through safely. In our business, we use the same security standards used by eBay, Amazon and other large web stores.",
      icon: <MdOutlineVpnLock className="mt-1 size-[2rem] text-color8" />,
    },
  ];
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-8">
      <div className="text-2xl font-extrabold uppercase text-slate-700">
        DELIVERY AND RETURN OF GOODS
      </div>
      <div className="mx-auto flex w-fit max-w-[75rem] flex-row items-start justify-center gap-8">
        {policies.map((policy, index) => (
          <div key={index} className="flex w-fit flex-row items-start gap-4">
            {policy.icon}
            <div className="flex w-[15rem] flex-col items-start justify-center">
              <span className="font-bold uppercase text-slate-700">
                {policy.title}
              </span>
              <span className="text-sm">{policy.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
