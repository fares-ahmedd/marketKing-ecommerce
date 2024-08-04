import { getUser } from "@/app/_utils/getUser";
import { getTranslate } from "@/app/_utils/helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import unknown from "@/public/unknownUser.jpg";
import LogoutButton from "./LogoutButton";
import MyLink from "./MyLink";

async function User() {
  const user = await getUser();
  const { t } = await getTranslate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.profileImage ? user.profileImage : unknown.src}
          />
          <AvatarFallback className="w-[40px] h-[40px] rounded-full bg-main-background animate-skeleton"></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>
          <p className={`capitalize text-center`}>
            {user?.firstName} {user?.lastName}
          </p>
          <p
            className={`mt-2 text-xs text-second-text leading-none text-center  `}
          >
            {user?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user?.email === "faresahmed00001111@gmail.com" && (
          <>
            <DropdownMenuItem asChild className="justify-center cursor-pointer">
              <MyLink href="/">{t("Home")}</MyLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="justify-center cursor-pointer">
              <MyLink href="/dashboard">{t("Dashboard")}</MyLink>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="justify-center cursor-pointer">
          <MyLink href="/customer-order">{t("My purchases")}</MyLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="justify-center cursor-pointer">
          <MyLink href="/edit-profile">{t("Edit Profile")}</MyLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default User;
