"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { ProductType } from "@/app/_utils/types";
import { useState } from "react";

function Selectors({
  chooses,
  categoryEl,
  product,
}: {
  chooses: string[];
  categoryEl: React.RefObject<HTMLInputElement>;
  product?: ProductType;
}) {
  function defaultActive() {
    if (product?.category === "phones") {
      return 0;
    }
    if (product?.category === "watches") {
      return 1;
    }
    if (product?.category === "laptops") {
      return 2;
    }
    return undefined;
  }
  const { t } = useTranslate();

  const [isActive, setIsActive] = useState<undefined | number>(defaultActive);
  return (
    <ul className="flex gap-2 flex-wrap">
      {chooses.map((choose, index) => (
        <li
          key={choose}
          className={`py-1 px-4 rounded-full relative border border-blue-500 cursor-pointer  text-lg duration-300 hover:bg-blue-900 hover:text-white ${
            index === isActive
              ? "bg-blue-900 text-white"
              : "bg-gray-300 text-black"
          }  `}
          onClick={() => setIsActive(index)}
        >
          <input
            type="radio"
            value={choose.toLocaleLowerCase()}
            className="absolute w-full h-full  left-0 top-0 cursor-pointer opacity-0   "
            name={"category"}
            ref={categoryEl}
            defaultChecked={index === isActive}
          />
          {t(choose)}
        </li>
      ))}
    </ul>
  );
}

export default Selectors;
