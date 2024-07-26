"use client";
import SubmitButton from "@/app/_components/ui/SubmitButton";
import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";
import { useFormState } from "react-dom";
import { createAccount } from "@/app/_actions/createAccount";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function CreateAccountForm() {
  const [state, formAction] = useFormState(createAccount, {});
  const router = useRouter();
  const { t, isArabic } = useTranslate();

  useEffect(() => {
    if (state.success === false) {
      toast.error(t("error create email"));
    }
    // if (state.success === true) {
    //   toast.success(t("success create email"));
    //   localStorage.setItem(
    //     "user_info",
    //     JSON.stringify({
    //       email: state?.storeEmail,
    //       password: state.storePassword,
    //       userId: state.storeUserId,
    //     })
    //   );
    //   isArabic ? router.push("/ar") : router.push("/en");
    // }
  }, [
    state.success,
    t,
    // isArabic,
    // router,
    // state.storeEmail,
    // state.storePassword,
    // state.storeUserId,
  ]);
  return (
    <form className="px-2 w-full grid justify-center gap-2" action={formAction}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="first-name">* {t("First Name")}</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            className={`max-w-[150px]`}
            autoFocus
            required
          />
        </div>
        <div>
          <label htmlFor="last-name">* {t("Last Name")}</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            className="max-w-[150px]"
            required
          />
        </div>
      </div>
      <label htmlFor="email">* {t("Email")}</label>
      <input
        type="email"
        name="email"
        id="email"
        className="max-w-[308px]"
        required
      />
      <label htmlFor="password">* {t("password")}</label>
      <input
        type="password"
        name="password"
        id="password"
        className="max-w-[308px]"
        required
      />
      <label htmlFor="confirmPassword">* {t("Confirm password")}</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        className="max-w-[308px]"
        required
      />{" "}
      <ul className="max-w-[308px]">
        <li>
          {state?.firstName && (
            <ErrorMessage>{t(state.firstName)}</ErrorMessage>
          )}
        </li>
        <li>
          {state?.lastName && <ErrorMessage>{t(state.lastName)}</ErrorMessage>}
        </li>
        <li>
          {state?.email && <ErrorMessage>{t(state.email)}</ErrorMessage>}{" "}
        </li>
        <li>
          {" "}
          {state?.password && (
            <ErrorMessage>{t(state.password)}</ErrorMessage>
          )}{" "}
        </li>
        <li>
          {" "}
          {state?.confirmPassword && (
            <ErrorMessage>{t(state.confirmPassword)}</ErrorMessage>
          )}{" "}
        </li>
      </ul>
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
