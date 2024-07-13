"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ADMIN_EMAIL } from "../utils/helpers";
import { redirect } from "next/navigation";

export async function createProduct(_: any, formData: FormData) {
  const product = formData.get("product") as string;
  const description = formData.get("description") as string;
  const featured = formData.get("featured") === "on";
  const status = formData.get("status");
  const image = formData.get("image");
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }
  let errors = {};

  if (!product || product.trim().length === 0) {
    // errors.product
  }
}
