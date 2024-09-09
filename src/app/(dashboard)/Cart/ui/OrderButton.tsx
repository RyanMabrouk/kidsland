import Link from "next/link";
import React, { useState } from "react";

export default function OrderButton({ total }: { total: number }) {
  const [hover, setHover] = useState(false);

  return (
    <Link href="/Cart/Payment">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="rounded-lg bg-red-300 p-3 transition-all duration-300 hover:bg-red-400"
      >
        Order ({total} TND)
      </div>
    </Link>
  );
}
