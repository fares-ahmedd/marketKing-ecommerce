"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ADMIN_EMAIL } from "../utils/helpers";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }
}
