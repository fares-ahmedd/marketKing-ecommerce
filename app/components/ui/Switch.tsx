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
    <div className="checkbox-apple">
      <input
        type="checkbox"
        className="yep"
        id="check-apple"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <label
        className={`
          block w-full h-full rounded-full cursor-pointer transition-all duration-300 
          bg-gradient-to-b from-gray-300 to-gray-200
          peer-checked:bg-gradient-to-b peer-checked:from-green-400 peer-checked:to-green-500
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        htmlFor="check-apple"
      ></label>
    </div>
  );
};

export default Switch;
