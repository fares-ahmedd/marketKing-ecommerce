import BannerSlider from "@/app/_components/marketking/BannerSlider";
import CategorySelection from "@/app/_components/marketking/CategorySelection";
import FeaturedProducts from "@/app/_components/marketking/FeaturedProducts";
import prisma from "@/app/_lib/db";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const banners = await prisma.banner.findMany();

  return (
    <div className="container-layout py-3">
      <BannerSlider banners={banners} />
      <CategorySelection />
      <FeaturedProducts />
    </div>
  );
}
