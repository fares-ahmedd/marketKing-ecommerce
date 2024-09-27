import Banner from "@/app/_components/marketking/Banner";
import BannerSkeleton from "@/app/_components/marketking/BannerSkeleton";
import CategorySelection from "@/app/_components/marketking/CategorySelection";
import FeaturedProducts from "@/app/_components/marketking/FeaturedProducts";
import FeaturedProductsSkeleton from "@/app/_components/marketking/FeaturedProductsSkeleton";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <div className="container-layout py-3">
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>

      <CategorySelection />

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
