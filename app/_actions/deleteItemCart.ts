"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";

export async function deleteItemCart({
  userId,
  itemId,
}: {
  userId: string;
  itemId: string;
}) {
  const cart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: { items: true },
  });

  if (!cart) {
    throw new Error("Cart not found for this user");
  }

  const cartItem = cart.items.find((item) => item.id === itemId);

  if (!cartItem) {
    throw new Error("Cart item not found in this user's cart");
  }

  await prisma.cartItem.delete({
    where: { id: itemId },
  });

  revalidatePath("/", "layout");
}
