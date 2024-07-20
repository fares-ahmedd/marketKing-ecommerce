import BannerSlider from "@/app/_components/marketking/BannerSlider";
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
    </div>
  );
}