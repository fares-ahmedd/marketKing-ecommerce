import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(_: any) {
  // Clear the user_info cookie
  cookies().delete("user_info");

  revalidatePath("/", "layout");
  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
