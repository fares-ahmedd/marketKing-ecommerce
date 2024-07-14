import CreateProductForm from "@/app/_components/dashboard/CreateProductForm";
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
    title: `${t("New Product")}`,
  };
}

function ProductCreateRoute({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { t, isArabic } = useTranslate();
  return (
    <main className="container-layout my-3 max-w-[1080px]">
      <div className="flex-items-center gap-3">
        <MyLink href="/dashboard/products">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title ">{t("New Product")}</h2>
      </div>

      <section className="card mt-6">
        <h3 className="title mb-2">{t("Product Details")}</h3>
        <p className="text-sm text-second-text mb-4">
          {t("Product Details title")}
        </p>

        <CreateProductForm />
      </section>
    </main>
  );
}

export default ProductCreateRoute;
