"use server";

import { SignUpErrors } from "../_utils/types";

export async function createAccount(_: any, formData: FormData) {
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  let errors: SignUpErrors = {};

  if (!firstName || firstName.trim().length === 0) {
    errors.firstName = "firstName error message";
  }
  if (!lastName || lastName.trim().length === 0) {
    errors.lastName = "lastName error message";
  }
}
