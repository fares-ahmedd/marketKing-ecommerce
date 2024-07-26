import LoginForm from "@/app/_components/marketking/LoginForm";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Login")}`,
  };
}

function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const { t } = useTranslate();
  return (
    <>
      <h3 className="title">{t("Login")}</h3>

      <LoginForm />
    </>
  );
}

export default LoginPage;
