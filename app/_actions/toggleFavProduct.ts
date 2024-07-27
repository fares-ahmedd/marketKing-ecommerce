"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";

type User =
  | ({
      favoriteProducts: {
        productId: string;
      }[];
    } & {
      id: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      profileImage: string;
      createdAt: Date;
    })
  | null;

export async function toggleFavProduct({
  user,
  productId,
}: {
  user: User;
  productId: string;
}) {
  const isFavorite = user?.favoriteProducts.some(
    (fav) => fav.productId === productId
  );

  if (!isFavorite) {
    try {
      const favProduct = await prisma.favoriteProduct.create({
        data: { productId, userId: user?.id ?? "" },
        select: { product: true },
      });
      revalidatePath("/", "layout");

      return { success: true, favProduct: favProduct.product.name };
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const favProduct = await prisma.favoriteProduct.delete({
        where: {
          userId_productId: {
            userId: user?.id ?? "",
            productId: productId,
          },
        },
        select: { product: true },
      });
      revalidatePath("/", "layout");
      return { success: false, favProduct: favProduct.product.name };
    } catch (error) {
      console.log(error);
    }
  }
}
