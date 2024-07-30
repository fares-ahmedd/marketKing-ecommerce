import ProductInfoLayout from "@/app/_components/marketking/ProductInfoLayout";
import ProductInfoSkeleton from "@/app/_components/marketking/ProductInfoSkeleton";
import IconButton from "@/app/_components/ui/IconButton";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Product Details")}`,
  };
}

function ProductDetailsPage({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { t, isArabic } = useTranslate();

  return (
    <section className="container-layout py-3 min-h-[calc(100vh-122px)]">
      <div className="flex-items-center gap-3 mb-5">
        <MyLink href="/">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title ">{t("Product Details")}</h2>
      </div>

      <Suspense key={id} fallback={<ProductInfoSkeleton />}>
        <ProductInfoLayout id={id} />
      </Suspense>
    </section>
  );
}

export default ProductDetailsPage;
