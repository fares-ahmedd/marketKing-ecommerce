"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";
import { SignUpErrors } from "../_utils/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslate } from "../_utils/helpers";
// todo: REGEX
const MAIL_REGEX = /^[a-z0-9]+@[a-z0-9]+\.(?!$)[a-z]{1,}(?:\.[a-z]{1,})*$/;
const PASSWORD_REGEX = /^.{8,}$/;

export async function createAccount(_: any, formData: FormData) {
  const { isArabic } = await getTranslate();
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  let errors: SignUpErrors = {};

  if (!firstName || firstName.trim().length === 0) {
    errors.firstName = "firstName error message";
  }
  if (!lastName || lastName.trim().length === 0) {
    errors.lastName = "lastName error message";
  }

  if (!MAIL_REGEX.test(email) || email.trim().length === 0) {
    errors.email = "email error message";
  }

  if (!PASSWORD_REGEX.test(password) || password.trim().length === 0) {
    errors.password = "password error message";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "confirmPassword error message";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const emails = await prisma.user.findMany({ select: { email: true } });

  const isEmailExist = emails.find((item) => item.email === email);

  if (isEmailExist) {
    errors.success = false;

    return errors;
  }

  const createdUser = await prisma.user.create({
    data: {
      email,
      firstName,
      password,
      lastName,
      profileImage: `https://avatar.vercel.sh/${email}.svg?text=${firstName.charAt(
        0
      )}${lastName.charAt(0)}`,
    },
  });

  if (createdUser) {
    revalidatePath("/");

    cookies().set(
      "user_info",
      JSON.stringify({
        email: createdUser.email,
        userId: createdUser.id,
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
