"use client";

import { useTranslate } from "@/app/hooks/useTranslate";
import React from "react";
import toast from "react-hot-toast";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  const { t } = useTranslate();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
    if (e.target.checked) {
      toast.success(t("Featured Mode"));
    } else {
      toast.error(t("Featured Mode disabled"));
    }
  }

  return (
    <label className="relative inline-block w-14 h-8">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span
        className={`
        absolute cursor-pointer top-0 left-0 right-0 bottom-0
        bg-white border border-gray-400 rounded-full transition-all duration-400
        before:absolute before:content-[''] before:h-6 before:w-6 
        before:left-1 before:bottom-1 before:bg-gray-400 
        before:rounded-full before:transition-all before:duration-400
        ${checked ? "bg-blue-950 border-blue-500" : ""}
        ${
          checked
            ? "before:transform before:translate-x-6 before:bg-blue-700"
            : ""
        }
        ${!checked ? "before:bg-gray-400" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        focus-within:shadow-[0_0_1px_#007bff]
      `}
      ></span>
    </label>
  );
};

export default Switch;
