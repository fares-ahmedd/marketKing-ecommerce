import Header from "@/app/_components/header/Header";
import Logo from "@/app/_components/header/Logo";
import NavLinks from "@/app/_components/header/NavLinks";
import Auth from "@/app/_components/marketking/Auth";
import { unstable_setRequestLocale } from "next-intl/server";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <main>Hello world</main>;
}
