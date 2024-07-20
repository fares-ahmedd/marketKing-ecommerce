import { getTranslate } from "@/app/_utils/helpers";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Button from "../ui/Button";
import { FaShoppingCart } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import { TbWorld } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function Auth() {
  const { t, isArabic } = await getTranslate();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="flex-center gap-2">
      {user ? (
        <IconButton>
          <FaShoppingCart />
        </IconButton>
      ) : (
        <div className="flex-center gap-3">
          <Button size="sm" color="black" className="max-sm:text-sm">
            <LoginLink>{t("Login")}</LoginLink>
          </Button>
          <Button size="sm" color="white" className="border max-sm:text-sm">
            <RegisterLink>{t("Sign Up")}</RegisterLink>
          </Button>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton>
            <TbWorld />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel className={`${isArabic && "text-rtl"}`}>
            {t("Choose Your Language")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={`${isArabic && "text-rtl"} cursor-pointer`}
          >
            {isArabic ? t("English") : t("Arabic")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default Auth;
