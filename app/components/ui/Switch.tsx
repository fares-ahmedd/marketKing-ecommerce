"use client";

import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
}) => {
  return (
    <label className="relative inline-block w-14 h-8">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span
        className={`
        absolute cursor-pointer top-0 left-0 right-0 bottom-0
        bg-white border border-gray-400 rounded-full transition-all duration-400
        before:absolute before:content-[''] before:h-6 before:w-6 
        before:left-1 before:bottom-1 before:bg-gray-400 
        before:rounded-full before:transition-all before:duration-400
        ${checked ? "bg-blue-500 border-blue-500" : ""}
        ${
          checked
            ? "before:transform before:translate-x-6 before:bg-blue-600"
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
