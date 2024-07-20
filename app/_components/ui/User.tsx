import { ADMIN_EMAIL, getTranslate } from "@/app/_utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import unknown from "@/public/unknownUser.jpg";
async function User() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const { t, isArabic } = await getTranslate();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={"" ?? unknown.src} />
          <AvatarFallback className="w-[40px] h-[40px] rounded-full bg-main-background animate-skeleton"></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>
          <p className={`capitalize text-center`}>
            {user.given_name} {user.family_name}
          </p>
          <p className={`mt-2 text-xs text-second-text leading-none  `}>
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <LogoutLink className={`${isArabic && "text-rtl"} `}>
            {t("Logout")}
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default User;
