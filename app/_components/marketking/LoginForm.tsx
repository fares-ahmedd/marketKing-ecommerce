"use client";
import SubmitButton from "@/app/_components/ui/SubmitButton";
import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { loginAccount } from "@/app/_actions/loginAccount";
import toast from "react-hot-toast";
import ErrorMessage from "../ui/ErrorMessage";

function LoginForm() {
  const [state, formAction] = useFormState(loginAccount, {});
  const { t } = useTranslate();

  useEffect(() => {
    if (state.success === false) {
      toast.error(t("error login email"));
    }
  }, [state.success, t]);

  return (
    <form className="px-2 w-full grid justify-center gap-2" action={formAction}>
      <label htmlFor="email">* {t("Email")}</label>
      <input
        type="email"
        name="email"
        id="email"
        className="max-w-[308px]"
        required
        autoFocus
      />
      <label htmlFor="password">* {t("password")}</label>
      <input
        type="password"
        name="password"
        id="password"
        className="max-w-[308px]"
        required
      />

      <ul className="max-w-[308px]">
        <li>
          {state?.email && <ErrorMessage>{t(state.email)}</ErrorMessage>}{" "}
        </li>
        <li>
          {" "}
          {state?.password && (
            <ErrorMessage>{t(state.password)}</ErrorMessage>
          )}{" "}
        </li>
      </ul>

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
