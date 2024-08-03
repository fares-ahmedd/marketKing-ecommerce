import prisma from "@/app/_lib/db";
import { stripe } from "@/app/_lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata?.userId,
        },
      });

      const userCart = await prisma.cart.findUnique({
        where: {
          userId: session.metadata?.userId ?? "",
        },
      });

      await prisma.cartItem.deleteMany({
        where: {
          cartId: userCart?.id ?? "",
        },
      });

      break;
    }
    default: {
      console.log("Unhandled Event");
    }
  }

  return new Response(null, { status: 200 });
}
