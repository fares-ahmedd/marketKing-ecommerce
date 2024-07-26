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

async function User() {
  const user = await getUser();

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
          <p className={`mt-2 text-xs text-second-text leading-none  `}>
            {user?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default User;
