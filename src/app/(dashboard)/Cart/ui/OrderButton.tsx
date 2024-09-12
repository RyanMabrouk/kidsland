import Link from "next/link";
import React, { useState } from "react";

export default function OrderButton({ total }: { total: number }) {
  const [hover, setHover] = useState(false);

  return (
    <Link href="/Cart/Payment" className="w-full">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="rounded-lg bg-color1 p-3 text-center text-xl font-semibold text-white transition-all duration-300 hover:bg-red-400"
      >
        Order ({total} TND)
      </div>
    </Link>
  );
}
