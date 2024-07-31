"use server";

import prisma from "@/app/_lib/db";

export async function fetchMoreProducts(skip: number) {
  const products = await prisma.product.findMany({
    skip,
    take: 6,
    orderBy: { createdAt: "desc" }, // Adjust ordering as needed
  });

  return products;
}
