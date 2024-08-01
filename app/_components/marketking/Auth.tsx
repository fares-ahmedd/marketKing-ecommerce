import { getTranslate } from "@/app/_utils/helpers";
import Button from "../ui/Button";

import { getUser } from "@/app/_utils/getUser";
import ChangeLanguage from "../ui/ChangeLanguage";
import MyLink from "../ui/MyLink";
import ToggleTheme from "../ui/ToggleTheme";
import User from "../ui/User";
import ShoppingCart from "./ShoppingCart";
import WhishList from "./WhishList";

async function Auth() {
  const { t } = await getTranslate();
  const user: any = await getUser();

  return (
    <div className="flex-center gap-2">
      <ChangeLanguage />
      <ToggleTheme />
      {user ? (
        <>
          <WhishList user={user} />
          <ShoppingCart userId={user.id} />
          <User />
        </>
      ) : (
        <div className="flex-center gap-3">
          <MyLink href="/auth/login">
            <Button size="sm" color="black" className="max-sm:text-xs py-2">
              {t("Login")}
            </Button>
          </MyLink>

          <MyLink href="/auth/sign-up">
            <Button
              size="sm"
              color="white"
              className="border max-sm:text-xs py-2"
            >
              {t("Sign Up")}
            </Button>
          </MyLink>
        </div>
      )}
    </div>
  );
}
export default Auth;
