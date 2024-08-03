"use server";

import prisma from "@/app/_lib/db";

export async function fetchMoreProducts(skip: number) {
  const products = await prisma.product.findMany({
    skip,
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return products;
}

export async function fetchMorePhones(skip: number) {
  const products = await prisma.product.findMany({
    skip,
    take: 6,
    where: { category: "phones" },
    orderBy: { createdAt: "desc" },
  });

  return products;
}

export async function fetchMoreWatches(skip: number) {
  const products = await prisma.product.findMany({
    skip,
    take: 6,
    where: { category: "watches" },
    orderBy: { createdAt: "desc" },
  });

  return products;
}
export async function fetchMoreLaptops(skip: number) {
  const products = await prisma.product.findMany({
    skip,
    take: 6,
    where: { category: "laptops" },
    orderBy: { createdAt: "desc" },
  });

  return products;
}
