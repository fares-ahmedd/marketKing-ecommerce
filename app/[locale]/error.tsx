"use client";

import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: ErrorComponentProps) {
  const { t } = useTranslate();
  return (
    <main className="flex justify-center items-center flex-col gap-6 container container-layout mx-auto">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg text-sec-text mb-5">{error.message}</p>

      <Button color="black" size="lg" asChild>
        <MyLink href={`/`}>{t("Home")}</MyLink>
      </Button>
    </main>
  );
}
