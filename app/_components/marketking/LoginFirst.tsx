import React from "react";
import Modal from "../ui/Modal";

import { useTranslate } from "@/app/_hooks/useTranslate";
import Button from "../ui/Button";
import MyLink from "../ui/MyLink";

function LoginFirst({ children }: { children: React.ReactNode }) {
  const { t } = useTranslate();
  return (
    <Modal>
      <Modal.OpenModal id="login-modal">{children}</Modal.OpenModal>
      <Modal.Content id="login-modal">
        {() => (
          <>
            <h2 className="title text-center px-2">{t("login message")}</h2>

            <div className="flex-center gap-5 mt-3">
              <MyLink
                href="/auth/login"
                className=" py-3 px-6 bg-black text-white rounded-lg"
              >
                {t("Login")}
              </MyLink>

              <MyLink
                href="/auth/sign-up"
                className=" py-3 px-6 bg-white text-black rounded-lg"
              >
                {t("Sign Up")}
              </MyLink>
            </div>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
}

export default LoginFirst;
