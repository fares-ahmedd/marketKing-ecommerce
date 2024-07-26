"use server";

import { redirect } from "next/navigation";
import prisma from "../_lib/db";
import { getTranslate } from "../_utils/helpers";

export async function deleteBanner(formData: FormData) {
  const bannerId = formData.get("bannerId") as string;

  const { isArabic } = await getTranslate();

  await prisma.banner.delete({
    where: { id: bannerId },
  });

  if (isArabic) {
    redirect("/ar/dashboard/banner");
  } else {
    redirect("/en/dashboard/banner");
  }
}
