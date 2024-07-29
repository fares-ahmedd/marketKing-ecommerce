import prisma from "@/app/_lib/db";
import { getUser } from "@/app/_utils/getUser";
import { getTranslate } from "@/app/_utils/helpers";
import { Category } from "@prisma/client";
import React from "react";
import Marquee from "../ui/Marquee";

async function RelatedProducts({ type }: { type: Category }) {
  const items = await prisma.product.findMany({
    where: { category: type ?? "laptops" },
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
    take: 10,
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
      <h4 className="title ">{t("Related Products")}</h4>
      <Marquee items={items} user={userDetails} />
    </section>
  );
}

export default RelatedProducts;
