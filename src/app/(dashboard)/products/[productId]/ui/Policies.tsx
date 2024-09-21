import { RiCarLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineVpnLock } from "react-icons/md";
import { EMAIL, PHONE_NUMBER } from "@/constants/Admin";
import CustomSwiper from "@/app/ui/Swiper";
export default function Policies() {
  const className =
    "mt-1 size-[1.75rem] text-color8 max-[1170px]:size-[1.5rem]";
  const policies = [
    {
      title: "FREE SHIPPING",
      description:
        "You pay the delivery to the courier when you pick up the package. Free home delivery for orders over 100 TND.",
      icon: <RiCarLine className={className} />,
    },
    {
      title: "24/7 SUPPORT",
      description: `Our team is at your disposal every working day from 8 a.m. to 4 p.m. Phone: ${PHONE_NUMBER} or email: ${EMAIL}.`,
      icon: <MdOutlineSupportAgent className={className} />,
    },
    {
      title: "14 DAY REFUND",
      description:
        "For all orders, you have a legal period of 14 days in which you can return the goods, respecting the conditions of purchase and the right of the buyer to unilaterally terminate the contract.",
      icon: <FaClockRotateLeft className={className} />,
    },
    {
      title: "100% SECURE PAYMENT",
      description:
        "No matter which payment method you choose, your transaction will go through safely. In our business, we use the same security standards used by eBay, Amazon and other large web stores.",
      icon: <MdOutlineVpnLock className={className} />,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-2xl font-extrabold uppercase text-slate-700 max-[420px]:text-lg">
        DELIVERY AND RETURN OF GOODS
      </div>
      <div className="mx-auto flex w-fit max-w-[75rem] flex-row items-start justify-between gap-2 px-2 max-[800px]:grid max-[800px]:grid-cols-2 max-[800px]:grid-rows-2 max-[420px]:gap-0">
        {policies.map((policy, index) => (
          <Policy key={index} {...policy} />
        ))}
      </div>
    </div>
  );
}

function Policy(policy: {
  title: string;
  description: string;
  icon: JSX.Element;
}) {
  return (
    <div className="flex w-fit flex-row items-start gap-4 max-[1170px]:gap-2">
      {policy.icon}
      <div className="flex w-[15rem] flex-col items-start justify-center max-[1170px]:w-[10rem] max-[420px]:w-[7.5rem]">
        <span className="font-bold uppercase text-slate-700 max-[1170px]:text-sm">
          {policy.title}
        </span>
        <span className="text-sm max-[1170px]:text-[0.65rem]">
          {policy.description}
        </span>
      </div>
    </div>
  );
}
