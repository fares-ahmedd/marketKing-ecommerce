import AllProducts from "@/app/_components/marketking/AllProducts";
import FavoriteProductsListSkeleton from "@/app/_components/marketking/FavoriteProductsListSkeleton";
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
    title: `${t("All Products")}`,
  };
}
function AllProductsPage({
  params: { locale },
}: {
  params: { locale: string };
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
        <h2 className="title ">{t("All Products")}</h2>
      </div>

      <Suspense fallback={<FavoriteProductsListSkeleton />}>
        <AllProducts />
      </Suspense>
    </section>
  );
}

export default AllProductsPage;
