import prisma from "@/app/_lib/db";
import BannerSlider from "./BannerSlider";

async function Banner() {
  const banners = await prisma?.banner?.findMany();

  return <BannerSlider banners={banners} />;
}

export default Banner;
