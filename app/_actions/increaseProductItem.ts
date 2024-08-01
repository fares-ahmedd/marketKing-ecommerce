"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";

export async function increaseProductItem({
  itemId,
  userId,
}: {
  itemId: string;
  userId: string;
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

  await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity: cartItem.quantity + 1 },
  });

  revalidatePath("/", "layout");
}
