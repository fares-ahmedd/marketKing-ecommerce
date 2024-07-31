import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  iconOnly?: boolean;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  color?: "primary" | "black" | "white" | "info" | "warning" | "error";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  active,
  disabled,
  className = "",
  iconOnly,
  beforeContent,
  afterContent,
  size,
  variant = "primary",
  color = "primary",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "transition-all duration-250 flex items-center justify-center border-none font-medium cursor-pointer rounded-lg gap-1 ";
  const sizeStyles = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };
  const colorStyles = {
    primary:
      "bg-primary-bg-color   hover:bg-primary-color-hover  disabled:bg-green-700  text-black dark:text-white",
    black:
      "bg-black   hover:bg-black/80  disabled:bg-stone-700 text-white dark:hover:bg-black/50 ",
    white:
      "bg-white   hover:bg-white/50  disabled:bg-stone-700 text-black  dark:hover:bg-white/80 ",

    info: "bg-blue-500 text-white border-blue-400 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200",
    warning:
      "bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 disabled:bg-yellow-300",
    error:
      "bg-red-500 dark:bg-red-600 text-white border-red-500 dark:border-red-600 hover:bg-red-600 dark:hover:bg-red-700 active:bg-red-700 dark:active:bg-red-800 disabled:bg-red-300 dark:disabled:bg-red-400",
  };
  const variantStyles = {
    primary: "",
    secondary: "border-2",
  };
  const activeStyles = active ? "shadow-inner" : "";
  const iconOnlyStyles = iconOnly ? "p-1 aspect-square" : "";
  const disabledStyles = disabled ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      className={clsx(
        baseStyles,
        size && sizeStyles[size],
        color && colorStyles[color],
        variant && variantStyles[variant],
        activeStyles,
        iconOnlyStyles,
        disabledStyles,
        className,
        "active:scale-95 disabled:cursor-default "
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
