import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = await prisma.user.findUnique({
    where: {
      id: user?.id ?? "",
    },
    select: {
      id: true,
    },
  });

  const { t } = await getTranslate();
  return (
    <section className="mb-3">
      <h4 className="title ">{t("Featured Items")}</h4>
      <Marquee items={items} userId={userId?.id} />
    </section>
  );
}

export default FeaturedProducts;
