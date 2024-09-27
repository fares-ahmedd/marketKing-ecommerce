import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
import { getUser } from "@/app/_utils/getUser";
import MarqueeProducts from "../ui/Marquee";

async function FeaturedProducts() {
  const items = await prisma.product.findMany({
    where: { isFeatured: true },
    select: {
      id: true,
      name: true,
      images: true,
      price: true,
      discount: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const user = await getUser();
  const userDetails = await prisma.user.findUnique({
    where: {
      id: user?.id ?? "",
    },
    include: {
      favoriteProducts: { select: { productId: true } },
    },
  });

  const { t } = await getTranslate();
  return (
    <section className="mb-3">
      <h4 className="title ">{t("Featured Items")}</h4>
      <MarqueeProducts items={items} user={userDetails} />
    </section>
  );
}

export default FeaturedProducts;
