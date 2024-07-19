import CreateBanner from "@/app/_components/dashboard/CreateBanner";
import IconButton from "@/app/_components/ui/IconButton";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Create Banner")}`,
  };
}

function BannerCreatePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const { t, isArabic } = useTranslate();

  return (
    <main className="container-layout my-3">
      <div className="flex-items-center gap-3">
        <MyLink href="/dashboard/products/banner">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title">{t("New Banner")}</h2>
      </div>
      <section className="card mt-6">
        <h3 className="title mb-2">{t("Banner Details")}</h3>
        <p className="text-sm text-second-text mb-4">
          {t("Banner Details title")}
        </p>

        <CreateBanner />
      </section>
    </main>
  );
}

export default BannerCreatePage;
