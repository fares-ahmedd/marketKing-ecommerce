import Header from "@/app/components/header/Header";
import { useTranslate } from "@/hooks/useTranslate";
import { unstable_setRequestLocale } from "next-intl/server";
import Logo from "../components/header/Logo";
import NavLinks from "../components/header/NavLinks";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { t } = useTranslate();
  return (
    <main>
      <Header>
        <Logo />
        <NavLinks />
      </Header>

      {t("Hello Next")}
    </main>
  );
}
