"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const existingFavorite = await prisma.favoriteProduct.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: productId,
        },
      },
    });

    if (!existingFavorite) {
      const favProduct = await prisma.favoriteProduct.upsert({
        where: {
          userId_productId: {
            userId: user.id,
            productId: productId,
          },
        },
        update: {},
        create: { productId, userId: user.id },
        select: { product: true },
      });

      revalidatePath("/", "layout");
      return { success: true, favProduct: favProduct.product.name };
    } else {
      // If the favorite exists, delete it
      try {
        const favProduct = await prisma.favoriteProduct.delete({
          where: {
            userId_productId: {
              userId: user.id,
              productId: productId,
            },
          },
          select: { product: true },
        });

        revalidatePath("/", "layout");
        return { success: false, favProduct: favProduct.product.name };
      } catch (deleteError) {
        if (
          deleteError instanceof PrismaClientKnownRequestError &&
          deleteError.code === "P2025"
        ) {
          // Record was already deleted, treat as success
          revalidatePath("/", "layout");
          return { success: false, message: "Favorite already removed" };
        }
        throw deleteError;
      }
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return {
      success: false,
      message: "An error occurred while updating favorite",
    };
  }
}
