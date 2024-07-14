"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ADMIN_EMAIL } from "../_utils/helpers";
import { redirect } from "next/navigation";
import { ProductErrors } from "../_utils/types";

export async function createProduct(_: any, formData: FormData) {
  const product = formData.get("product") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const featured = formData.get("featured") === "on";
  const status = formData.get("status") as string;
  const image = formData.get("image") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }
  let errors: ProductErrors = {};

  if (!product || product.trim().length === 0) {
    errors.product = "product error message";
  }
  if (!description || description.trim().length === 0) {
    errors.description = "description error message";
  }
  if (!price || Number(price) <= 0) {
    errors.price = "price error message";
  }
  if (!image || image.trim().length === 0) {
    errors.image = "image error message";
  }
  if (!status || status.trim().length === 0) {
    errors.status = "status error message";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
}
