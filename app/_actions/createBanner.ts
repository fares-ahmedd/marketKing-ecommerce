"use server";

import { redirect } from "next/navigation";
import { ADMIN_EMAIL, getTranslate } from "../_utils/helpers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BannerErrors } from "../_utils/types";

export async function createBanner(_: any, formData: FormData) {
  const { isArabic } = await getTranslate();
  const banner = formData.get("banner") as string;
  let images = formData.get("images") as string | string[];

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }

  let errors: BannerErrors = {};

  if (!banner || banner.trim().length === 0) {
    errors.banner = "banner error message";
  }

  if (!images || images.length === 0) {
    errors.image = "image error message";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  images = typeof images === "string" ? images.split(",") : [""];

  console.log(banner);
  console.log(images);
}
