import Header from "@/app/_components/header/Header";
import Logo from "@/app/_components/header/Logo";
import NavLinks from "@/app/_components/header/NavLinks";
import Auth from "@/app/_components/marketking/Auth";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export default function MarkKingLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Header>
        <Logo />
        <NavLinks />
        <Auth />
      </Header>

      {children}
    </>
  );
}
