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

import Menu from "../ui/Menu";
import ChangeLanguage from "../ui/ChangeLanguage";

async function Auth() {
  const { t, isArabic } = await getTranslate();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="flex-center gap-2">
      {user ? (
        <IconButton className="relative ">
          <FaShoppingCart />
          <span className="bg-primary-bg-color text-main-text absolute -top-3 -start-1 text-sm px-1 rounded-lg">
            5
          </span>
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
      <ChangeLanguage />

      <Menu />
    </div>
  );
}
export default Auth;
