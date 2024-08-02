import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { MdCancel } from "react-icons/md";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Cancel Payment")}`,
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
    <section className="container-layout py-3 min-h-[calc(100vh-122px)] flex-center  ">
      <div className="card w-[95%] max-w-[450px] ">
        <MdCancel className="text-5xl text-error mx-auto" />

        <h3 className="title text-center my-3">{t("Payment Cancelled")}</h3>

        <p className="text-second-text text-center mb-3">
          {t("payment cancel message")}{" "}
        </p>

        <Button color="black" size="md" className="mx-auto " asChild>
          <MyLink href="/">{t("Back To Homepage")}</MyLink>
        </Button>
      </div>
    </section>
  );
}

export default CancelPaymentPage;
