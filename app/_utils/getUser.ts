import { cookies } from "next/headers";
import prisma from "../_lib/db";

export async function getUser() {
  const userInfoCookie = cookies().get("user_info");
  let user = null;

  if (userInfoCookie) {
    const userInfo = JSON.parse(userInfoCookie.value);
    user = await prisma.user.findUnique({
      where: { email: userInfo.email, id: userInfo.userId },
    });
  }

  return user;
}
