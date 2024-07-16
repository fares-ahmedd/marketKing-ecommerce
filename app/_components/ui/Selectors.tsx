"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { useState } from "react";

function Selectors({ chooses }: { chooses: string[] }) {
  const { t } = useTranslate();

  const [isActive, setIsActive] = useState<undefined | number>(undefined);
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
          />
          {t(choose)}
        </li>
      ))}
    </ul>
  );
}

export default Selectors;
