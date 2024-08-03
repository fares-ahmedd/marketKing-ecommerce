"use server";
import { redirect } from "next/navigation";
import { getUser } from "../_utils/getUser";
import prisma from "../_lib/db";
import { stripe } from "../_lib/stripe";
import Stripe from "stripe";
import { getTranslate } from "../_utils/helpers";

export async function checkout() {
  const user = await getUser();
  const { isArabic } = await getTranslate();
  if (!user?.id) {
    return redirect("/");
  }

  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: true,
    },
  });

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: (item.price - item.discount) * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `http://localhost:3000/${
        isArabic ? "ar" : "en"
      }/payment/success`,
      cancel_url: `http://localhost:3000/${
        isArabic ? "ar" : "en"
      }/payment/cancel`,
      metadata: {
        userId: user.id,
      },
      locale: "auto",
    });

    return redirect(session.url as string);
  }
}
