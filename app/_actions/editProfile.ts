"use server";

import { revalidatePath } from "next/cache";
import prisma from "../_lib/db";
import { getTranslate } from "../_utils/helpers";
import { EditProfileErrors } from "../_utils/types";
import { redirect } from "next/navigation";

export async function editProfile(_: any, formData: FormData) {
  const { isArabic } = await getTranslate();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const userId = formData.get("userId") as string;
  const image = formData.get("image") as string;
  let errors: EditProfileErrors = {};

  if (!firstName || firstName.trim().length < 3) {
    errors.firstName = "firstName error message";
  }
  if (!lastName || lastName.trim().length < 3) {
    errors.lastName = "lastName error message";
  }
  if (!image || image.trim().length === 0) {
    errors.lastName = "image error message";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  await prisma.user.update({
    where: { id: userId ?? "" },
    data: {
      firstName,
      lastName,
      profileImage: image,
    },
  });

  revalidatePath("/", "layout");

  redirect(isArabic ? "/ar" : "/en");
}
