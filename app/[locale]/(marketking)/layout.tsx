import Header from "@/app/_components/header/Header";
import Logo from "@/app/_components/header/Logo";
import NavLinks from "@/app/_components/header/NavLinks";
import Auth from "@/app/_components/marketking/Auth";
import Footer from "@/app/_components/marketking/Footer";
import { unstable_setRequestLocale } from "next-intl/server";

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
      <main className="min-h-[calc(100vh-60px)] overflow-y-auto flex flex-col justify-between">
        {children}
        <Footer />
      </main>
    </>
  );
}
