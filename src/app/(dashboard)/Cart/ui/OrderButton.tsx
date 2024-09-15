import Link from "next/link";

export default function OrderButton({ total }: { total: number }) {

  return (
    <Link href="/Cart/Payment" className="w-full">
      <div className="rounded-lg bg-color1 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-red-400">
        Order ({Math.round(total * 100) / 100} TND)
      </div>
    </Link>
  );
}
