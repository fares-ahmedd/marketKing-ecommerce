"use server";

import { redirect } from "next/navigation";
import prisma from "../_lib/db";
import { getTranslate } from "../_utils/helpers";

export async function deleteProduct(formData: FormData) {
  const productId = formData.get("productId") as string;

  const { isArabic } = await getTranslate();

  await prisma.product.delete({
    where: { id: productId },
  });

  if (isArabic) {
    redirect("/ar/dashboard/products");
  } else {
    redirect("/en/dashboard/products");
  }
}
