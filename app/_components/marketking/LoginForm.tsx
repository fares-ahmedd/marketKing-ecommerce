"use client";
import SubmitButton from "@/app/_components/ui/SubmitButton";
import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";

function LoginForm() {
  const { t } = useTranslate();

  return (
    <form className="px-2 w-full grid justify-center gap-2">
      <label htmlFor="email">* {t("Email")}</label>
      <input
        type="email"
        name="email"
        id="email"
        className="max-w-[308px]"
        autoFocus
      />
      <label htmlFor="password">* {t("password")}</label>
      <input
        type="password"
        name="password"
        id="password"
        className="max-w-[308px]"
      />
      <SubmitButton color="primary" size="md" className="w-full my-2">
        {t("Login")}
      </SubmitButton>

      <div className="my-2 flex-items-center gap-1">
        <p> {t("don't have account")}</p>{" "}
        <MyLink
          href="/auth/sign-up"
          className="text-primary-color font-bold hover:underline"
        >
          {t("Sign Up Now")}
        </MyLink>
      </div>
    </form>
  );
}

export default LoginForm;
