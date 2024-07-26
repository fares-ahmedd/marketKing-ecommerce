"use server";

import { ProductStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";
import { ProductErrors } from "../_utils/types";

export async function createProduct(_: any, formData: FormData) {
  const isArabic = formData.get("isArabic");
  const product = formData.get("product") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const discount = formData.get("discount");
  const category = formData.get("category") as string;
  const featured = formData.get("featured") === "on";
  const status = formData.get("status") as ProductStatus;
  let images = formData.get("images") as string | string[];
  let errors: ProductErrors = {};

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
  if (Number(discount) > Number(price)) {
    errors.discount = "discount error message";
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

  try {
    await prisma.product.create({
      data: {
        name: product,
        description,
        status,
        price: Number(price),
        images,
        category,
        isFeatured: featured,
        discount: Number(discount) < 0 ? 0 : Number(discount),
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
