"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { UploadButton } from "@/app/_lib/uploadthing";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../ui/SubmitButton";
import { useFormState } from "react-dom";
import { editProfile } from "@/app/_actions/editProfile";
import ErrorMessage from "../ui/ErrorMessage";

function EditProfileForm({ user }: { user: User }) {
  const [image, setImage] = useState<string>(user.profileImage);
  const [state, formAction] = useFormState(editProfile, {});

  const { t } = useTranslate();

  return (
    <form className="grid gap-3 grid-cols-1 mb-2" action={formAction}>
      <label htmlFor="email">{t("Email")}:</label>
      <input
        type="email"
        placeholder={t("Not Allowed email")}
        id="email"
        value={user.email}
        disabled
      />

      <div className="flex-items-center flex-wrap gap-4">
        <div>
          <label htmlFor="firstName" className="mb-1">
            {t("First Name")}:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={user.firstName}
            className="max-w-[250px]"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1">
            {t("Last Name")}:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={user.lastName}
            className="max-w-[250px]"
            required
          />
        </div>
      </div>

      <label>{t("Change Image Profile")}</label>
      <section className="flex flex-col h-[300px] justify-center items-center p-12 border-2 border-dashed border-primary/50 rounded  relative  hover:border mb-3 ">
        <UploadButton
          endpoint="bannerImageRoute"
          content={{
            allowedContent: t("Images up to 4MB, max 1"),
            button: t("Choose Product Image"),
          }}
          onClientUploadComplete={(res) => {
            console.log("uploaded done!");

            setImage(res[0].url);
            toast.success(t("Finish Upload Banner"));
          }}
          onUploadError={(e) => {
            console.log(e);

            toast.error(t("failed Upload Banner"));
          }}
        />
      </section>

      <div className="h-[180px] w-[180px] rounded-full relative mt-5 mx-auto">
        <Image
          src={image}
          alt={`${user.firstName} ${user.lastName}`}
          fill
          sizes="(max-width: 180px) 100vw, 1800px"
          className="rounded-full"
        />
      </div>
      <input type="hidden" name="image" value={image || ""} />
      <input type="hidden" name="userId" value={user.id || ""} />

      <ul className="max-w-[308px]">
        <li>
          {state?.firstName && (
            <ErrorMessage>{t(state.firstName)}</ErrorMessage>
          )}
        </li>
        <li>
          {state?.lastName && <ErrorMessage>{t(state.lastName)}</ErrorMessage>}
        </li>{" "}
        <li>{state?.image && <ErrorMessage>{t(state.image)}</ErrorMessage>}</li>
      </ul>

      <SubmitButton className="w-fit mt-3 mx-auto" size="lg">
        {t("Edit Profile")}
      </SubmitButton>
    </form>
  );
}

export default EditProfileForm;
