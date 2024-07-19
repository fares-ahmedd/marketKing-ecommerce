"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../_lib/db";
import { ADMIN_EMAIL, getTranslate } from "../_utils/helpers";

export async function deleteProduct(formData: FormData) {
  const productId = formData.get("productId") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { isArabic } = await getTranslate();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  if (isArabic) {
    redirect("/ar/dashboard/products");
  } else {
    redirect("/en/dashboard/products");
  }
}
