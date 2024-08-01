import FavoriteProductsList from "@/app/_components/marketking/FavoriteProductsList";
import FavoriteProductsListSkeleton from "@/app/_components/marketking/FavoriteProductsListSkeleton";
import IconButton from "@/app/_components/ui/IconButton";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { getUser } from "@/app/_utils/getUser";
import { getTranslate } from "@/app/_utils/helpers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Favorite Products")}`,
  };
}
function FavoriteProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const { t, isArabic } = useTranslate();

  return (
    <section className="container-layout py-3 min-h-[calc(100vh-122px)]">
      <div className="flex-items-center gap-3">
        <MyLink href="/">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title ">{t("Favorite Products")}</h2>
      </div>

      <Suspense key={Math.random()} fallback={<FavoriteProductsListSkeleton />}>
        <FavoriteProductsList />
      </Suspense>
    </section>
  );
}

export default FavoriteProductsPage;
