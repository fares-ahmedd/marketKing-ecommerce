import { useTranslate } from "@/app/_hooks/useTranslate";
import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
import Marquee from "../ui/Marquee";

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

  const { t } = await getTranslate();
  return (
    <section className="mb-3">
      <h4 className="title ">{t("Featured Items")}</h4>
      <Marquee items={items} />
    </section>
  );
}

export default FeaturedProducts;
