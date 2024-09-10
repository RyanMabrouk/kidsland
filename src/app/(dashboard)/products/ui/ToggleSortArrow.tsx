import { useEffect, useState } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";

export function ToggleSortArrow({
  onClick,
}: {
  onClick: (value: boolean) => void;
}) {
  const [toggleDirection, setToggleDirection] = useState(false);
  useEffect(() => {
    onClick(toggleDirection);
  }, [toggleDirection, onClick]);
  return (
    <FaLongArrowAltDown
      className={`size-7 cursor-pointer rounded-full border p-1 shadow-sm transition-all ease-linear hover:shadow-md ${
        toggleDirection ? "rotate-180" : ""
      }`}
      onClick={(e) => {
        setToggleDirection((prev) => !prev);
      }}
    />
  );
}
