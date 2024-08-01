import AllProducts from "@/app/_components/marketking/AllProducts";
import FavoriteProductsListSkeleton from "@/app/_components/marketking/FavoriteProductsListSkeleton";
import FilterSheet from "@/app/_components/marketking/FilterSheet";
import Laptops from "@/app/_components/marketking/Laptops";
import Phones from "@/app/_components/marketking/Phones";
import Watches from "@/app/_components/marketking/Watches";
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
    title: `${t("Watches")}`,
  };
}
function LaptopsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: {
    "sort-price": string;
    "filter-price": string;
  };
}) {
  unstable_setRequestLocale(locale);
  const { t, isArabic } = useTranslate();
  return (
    <section className="container-layout py-3 min-h-[calc(100vh-122px)]">
      <div className="flex-between gap-3 mb-5">
        <div className="flex-items-center gap-3 ">
          <MyLink href="/">
            <IconButton>
              {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
            </IconButton>
          </MyLink>
          <h2 className="title ">{t("Watches")}</h2>
        </div>
        <FilterSheet />
      </div>

      <Suspense fallback={<FavoriteProductsListSkeleton />}>
        <Watches searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

export default LaptopsPage;
