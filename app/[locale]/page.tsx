import Header from "@/components/header/Header";
import { useTranslate } from "@/hooks/useTranslate";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { t } = useTranslate();
  return (
    <main>
      <Header />

      {t("Hello Next")}
    </main>
  );
}
