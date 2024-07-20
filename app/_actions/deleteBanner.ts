"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ADMIN_EMAIL, getTranslate } from "../_utils/helpers";
import { redirect } from "next/navigation";
import prisma from "../_lib/db";

export async function deleteBanner(formData: FormData) {
  const bannerId = formData.get("bannerId") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { isArabic } = await getTranslate();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: { id: bannerId },
  });

  if (isArabic) {
    redirect("/ar/dashboard/banner");
  } else {
    redirect("/en/dashboard/banner");
  }
}
