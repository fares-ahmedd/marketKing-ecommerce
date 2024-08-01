"use server";

import { Product } from "@prisma/client";
import prisma from "../_lib/db";
import { revalidatePath } from "next/cache";
import { getTranslate } from "../_utils/helpers";

export async function createAndUpdateCart({
  userId,
  product,
  quantity,
}: {
  userId: string;
  product: Product;
  quantity: number;
}) {
  // const { isArabic } = await getTranslate();
  let cart = await prisma.cart.findUnique({
    where: { userId: userId },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: userId },
      include: { items: true },
    });
  }

  const existingItem = cart.items.find((item) => item.productId === product.id);

  if (existingItem) {
    // await prisma.cartItem.update({
    //   where: { id: existingItem.id },
    //   data: { quantity: existingItem.quantity + quantity },
    // });
    return { isExist: "exist", name: existingItem.name };
  } else {
    const createdCartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity: quantity,
        price: product.price,
        discount: product.discount,
        imageString: product.images[0],
        name: product.name,
      },
    });
    revalidatePath("/", "layout");

    return {
      isExist: "created",
      name: createdCartItem.name,
      quantity: createdCartItem.quantity,
    };
  }
}
