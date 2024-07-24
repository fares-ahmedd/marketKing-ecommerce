"use client";
import SubmitButton from "@/app/_components/ui/SubmitButton";
import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";
import { useFormState } from "react-dom";
import { createAccount } from "@/app/_actions/createAccount";

function CreateAccountForm() {
  const [state, formAction] = useFormState(createAccount, {});

  const { t } = useTranslate();

  return (
    <form className="px-2 w-full grid justify-center gap-2" action={formAction}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="first-name">* {t("First Name")}</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            className="max-w-[150px]"
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="last-name">* {t("Last Name")}</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            className="max-w-[150px]"
          />
        </div>
      </div>
      <label htmlFor="email">* {t("Email")}</label>
      <input type="email" name="email" id="email" className="max-w-[308px]" />
      <label htmlFor="password">* {t("password")}</label>
      <input
        type="password"
        name="password"
        id="password"
        className="max-w-[308px]"
      />
      <label htmlFor="confirmPassword">* {t("Confirm password")}</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        className="max-w-[308px]"
      />{" "}
      <SubmitButton color="primary" size="md" className="w-full my-2">
        {t("Sign Up")}
      </SubmitButton>
      <div className="my-2 flex-items-center gap-1">
        <p> {t("have account")}</p>{" "}
        <MyLink
          href="/auth/login"
          className="text-primary-color font-bold hover:underline"
        >
          {t("Login Now")}
        </MyLink>
      </div>
    </form>
  );
}

export default CreateAccountForm;
