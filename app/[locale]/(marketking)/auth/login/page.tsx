import CreateAccountForm from "@/app/_components/marketking/CreateAccountForm";
import LoginForm from "@/app/_components/marketking/LoginForm";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { getTranslations } from "next-intl/server";

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

function LoginPage() {
  const { t } = useTranslate();
  return (
    <>
      <h3 className="title">{t("Login")}</h3>

      <LoginForm />
    </>
  );
}

export default LoginPage;
