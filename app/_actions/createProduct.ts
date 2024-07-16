"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ADMIN_EMAIL } from "../_utils/helpers";
import { redirect } from "next/navigation";
import { ProductErrors, ProductStatus } from "../_utils/types";
import prisma from "../_lib/db";

export async function createProduct(_: any, formData: FormData) {
  const isArabic = formData.get("isArabic");
  const product = formData.get("product") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const category = formData.get("category") as string;
  const featured = formData.get("featured") === "on";
  const status = formData.get("status") as ProductStatus;
  let images = formData.get("images") as string | string[];
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }
  let errors: ProductErrors = {};

  console.log(category);

  if (!product || product.trim().length === 0) {
    errors.product = "product error message";
  }
  if (!category || category.trim().length === 0) {
    errors.category = "category error message";
  }
  if (!description || description.trim().length === 0) {
    errors.description = "description error message";
  }
  if (!price || Number(price) <= 0) {
    errors.price = "price error message";
  }
  if (!images || images.length === 0) {
    errors.image = "image error message";
  }
  if (!status || status.trim().length === 0) {
    errors.status = "status error message";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  if (category !== "laptops" && category !== "watches" && category !== "phones")
    return;
  images = typeof images === "string" ? images.split(",") : [""];

  await prisma.product.create({
    data: {
      name: product,
      description,
      status,
      price: Number(price),
      images,
      category,
      isFeatured: featured,
    },
  });

  if (isArabic) {
    redirect("/ar/dashboard/products");
  } else {
    redirect("/en/dashboard/products");
  }
}
