"use client";
import { createBanner } from "@/app/_actions/createBanner";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { UploadButton } from "@/app/_lib/uploadthing";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "../ui/Button";
import ModalImage from "../ui/ModalImage";
import SubmitButton from "../ui/SubmitButton";
import ErrorMessage from "../ui/ErrorMessage";
import { useRouter } from "next/navigation";

function CreateBanner() {
  const [image, setImage] = useState<string[]>([]);
  const [state, formAction] = useFormState(createBanner, {});
  const { t, isArabic } = useTranslate();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(t("create success banner"));
      router.push(isArabic ? "/ar/dashboard/banner" : "/en/dashboard/banner");
    } else if (state?.success === false) {
      toast.error(t("create failed banner"));
    }
  }, [state?.success, t, router, isArabic]);

  const handleDeleteImage = (index: number) => {
    setImage(image.filter((_: any, i) => i !== index));
  };
  return (
    <form className="grid gap-3 grid-cols-1 mb-2" action={formAction}>
      <label htmlFor="name">{t("Name")}:</label>
      <input
        type="text"
        name="banner"
        autoFocus
        placeholder={t("New Banner placeholder")}
        id="name"
      />
      {state?.banner && <ErrorMessage>{t(state.banner)}</ErrorMessage>}

      {image.length < 1 && (
        <section className="flex flex-col h-[300px] justify-center items-center p-12 border-2 border-dashed border-primary/50 rounded mt-4 relative  hover:border mb-3 ">
          <UploadButton
            endpoint="bannerImageRoute"
            content={{
              allowedContent: t("Images up to 4MB, max 1"),
              button: t("Choose Product Image"),
            }}
            onClientUploadComplete={(res) => {
              console.log("uploaded done!");

              setImage((prevImage) => [...prevImage, ...res.map((r) => r.url)]);
              toast.success(t("Finish Upload Banner"));
            }}
            onUploadError={(e) => {
              console.log(e);

              toast.error(t("failed Upload Banner"));
            }}
          />
        </section>
      )}
      <input type="hidden" name="image" value={image[0] || ""} />

      {image.length > 0 && (
        <>
          <h3 className="title">{t("Banner Image")}</h3>
          <ul className="flex gap-3 flex-wrap">
            {image.map((image, index) => (
              <ModalImage
                image={
                  <li className="relative min-w-[200px] min-h-[300px] h-full">
                    <Button
                      className="m-1 relative z-30 "
                      color="error"
                      size="sm"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(index);
                      }}
                    >
                      <IoIosCloseCircle className="text-xl" />
                    </Button>
                    <Image
                      src={image}
                      alt="Product Img"
                      fill
                      className="rounded-lg "
                    />
                  </li>
                }
                className="relative min-h-[300px] max-w-[200px]  rounded-lg "
                modalId={`${index}`}
                key={index}
              />
            ))}
          </ul>
        </>
      )}
      {state?.image && <ErrorMessage>{t(state.image)}</ErrorMessage>}

      <SubmitButton className="w-fit mt-3" size="lg">
        {t("Create Banner")}
      </SubmitButton>
    </form>
  );
}

export default CreateBanner;
