"use client";

import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorComponentProps) {
  const { t } = useTranslate();
  return (
    <main className="flex-center flex-col    min-h-screen">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className=" text-sec-text mb-5 text-center text-sm">{error.message}</p>

      <Button color="black" size="lg" onClick={reset}>
        {t("Try Again")}
      </Button>
    </main>
  );
}
