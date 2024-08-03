"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";
import { LoginErrors } from "../_utils/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslate } from "../_utils/helpers";

export async function loginAccount(_: any, formData: FormData) {
  const { isArabic } = await getTranslate();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: LoginErrors = {};

  if (!email || email.trim().length === 0) {
    errors.email = "email error message";
  }

  if (!password || password.trim().length === 0) {
    errors.password = "password error message";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const existEmail = await prisma.user.findUnique({
    where: { email, password },
  });

  if (existEmail) {
    revalidatePath("/", "layout");

    cookies().set(
      "user_info",
      JSON.stringify({
        email: existEmail.email,
        userId: existEmail.id,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      }
    );

    if (isArabic) {
      redirect("/ar");
    } else {
      redirect("/en");
    }
  }

  return { success: false };
}
