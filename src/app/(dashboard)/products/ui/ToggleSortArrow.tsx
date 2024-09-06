import { useState } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";

export function ToggleSortArrow({
  setSortDescending,
}: {
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [toggleDirection, setToggleDirection] = useState(false);
  return (
    <FaLongArrowAltDown
      className={`size-7 cursor-pointer rounded-full border p-1 shadow-sm transition-all ease-linear hover:shadow-md ${
        toggleDirection ? "rotate-180" : ""
      }`}
      onClick={() => {
        setSortDescending((prev) => !prev);
        setToggleDirection((prev) => !prev);
      }}
    />
  );
}
