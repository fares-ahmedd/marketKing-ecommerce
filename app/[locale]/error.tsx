"use client";

import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorComponentProps) {
  const { t } = useTranslate();
  return (
    <main className="flex-center flex-col    min-h-screen">
      <Image src={logo} alt="App Logo" priority />
      <h1 className="text-3xl font-semibold my-3">Something went wrong</h1>
      <p className=" text-sec-text mb-5 text-center text-sm">{error.message}</p>

      <div className="flex items-center gap-4">
        <Button color="black" size="lg" onClick={reset}>
          {t("Try Again")}
        </Button>
        <Button color="white" size="lg" asChild>
          <Link href={"/"}>{t("Home")}</Link>
        </Button>
      </div>
    </main>
  );
}
