"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../_lib/db";
import { ADMIN_EMAIL, getTranslate } from "../_utils/helpers";
import { BannerErrors } from "../_utils/types";
import { revalidatePath } from "next/cache";

export async function createBanner(_: any, formData: FormData) {
  const { isArabic } = await getTranslate();
  const banner = formData.get("banner") as string;
  let image = formData.get("image") as string;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }

  let errors: BannerErrors = {};

  if (!banner || banner.trim().length === 0) {
    errors.banner = "banner error message";
  }

  if (!image || image.trim().length === 0) {
    errors.image = "image error message";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  try {
    await prisma.banner.create({
      data: {
        title: banner,
        imageString: image,
      },
    });
    if (isArabic) {
      revalidatePath("/ar/dashboard", "layout");
    } else {
      revalidatePath("/en/dashboard", "layout");
    }

    return { success: true };
  } catch {
    return { success: false };
  }
}
