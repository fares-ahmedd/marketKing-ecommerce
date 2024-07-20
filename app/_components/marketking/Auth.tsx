import { getTranslate } from "@/app/_utils/helpers";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Button from "../ui/Button";

import ChangeLanguage from "../ui/ChangeLanguage";
import Menu from "../ui/Menu";
import ShoppingCart from "./ShoppingCart";
import User from "../ui/User";
import ToggleTheme from "../ui/ToggleTheme";

async function Auth() {
  const { t } = await getTranslate();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="flex-center gap-2">
      <ChangeLanguage />
      <ToggleTheme />
      <Menu />
      {user ? (
        <>
          <ShoppingCart />
          <User />
        </>
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
    </div>
  );
}
export default Auth;
