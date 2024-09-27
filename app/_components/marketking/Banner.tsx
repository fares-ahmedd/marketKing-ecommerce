import prisma from "@/app/_lib/db";
import BannerSlider from "./BannerSlider";

async function Banner() {
  await new Promise((res) => setTimeout(res, 10000));
  const banners = await prisma?.banner?.findMany();

  return <BannerSlider banners={banners} />;
}

export default Banner;
