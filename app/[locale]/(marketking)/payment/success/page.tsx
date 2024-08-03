import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { BsFillCartCheckFill } from "react-icons/bs";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Success Payment")}`,
  };
}

function CancelPaymentPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const { t } = useTranslate();

  return (
    <section className="container-layout py-3 min-h-[calc(100vh-122px)] flex-center animate-smooth  ">
      <div className="card w-[95%] max-w-[450px] ">
        <BsFillCartCheckFill className="text-5xl text-primary-color mx-auto" />

        <h3 className="title text-center my-3">{t("Payment Success")}</h3>

        <p className="text-second-text text-center mb-3">
          {t("payment Success message")}{" "}
        </p>

        <Button color="primary" size="md" className="mx-auto " asChild>
          <MyLink href="/">{t("Back To Homepage")}</MyLink>
        </Button>
      </div>
    </section>
  );
}

export default CancelPaymentPage;
