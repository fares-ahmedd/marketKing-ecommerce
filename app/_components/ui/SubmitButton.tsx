"use client";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import { useTranslate } from "@/app/_hooks/useTranslate";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
}

function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const { t, isArabic } = useTranslate();
  return (
    <Button {...props} disabled={pending}>
      {pending ? (
        <div className={isArabic ? "loader-ar" : "loader-en"}>
          {t("Loading")}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
