import CreateAccountForm from "@/app/_components/marketking/CreateAccountForm";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Sign Up")}`,
  };
}

function SignUpPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const { t } = useTranslate();
  return (
    <>
      <h3 className="title">{t("Sign Up")}</h3>

      <CreateAccountForm />
    </>
  );
}

export default SignUpPage;
