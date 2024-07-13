"use client";
import { useTranslate } from "@/app/hooks/useTranslate";
import Switch from "../ui/Switch";
import { useState } from "react";
import { UploadButton, UploadDropzone } from "@/app/utils/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";

function CreateProductForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const { t } = useTranslate();
  return (
    <form className="grid gap-3 grid-cols-1 mb-2">
      <label htmlFor="name">{t("Name")}:</label>
      <input
        type="text"
        autoFocus
        placeholder={t("New Product placeholder")}
        id="name"
      />
      <label htmlFor="description">{t("Description")}:</label>
      <textarea
        placeholder={t("Description placeholder")}
        id="description"
        rows={6}
      />
      <label htmlFor="price">{t("Price")}:</label>
      <input type="number" placeholder={t("Price placeholder")} id="price" />

      <label>{t("Featured")}:</label>
      <Switch
        checked={isChecked}
        onChange={(checked: boolean) => setIsChecked(checked)}
      />

      <label>{t("Status")}:</label>
      <select defaultValue={""} className="mb-3">
        <option value="" disabled className="text-second-text">
          {t("Status label")}
        </option>
        <option value="draft">{t("Draft")}</option>
        <option value="published">{t("Published")}</option>
        <option value="archived">{t("Archived")}</option>
      </select>

      <label>{t("Images")}:</label>
      {/* <UploadDropzone
        endpoint="imageUploader"
        content={{
          label: t("Choose files or drag and drop"),
          allowedContent: t("Images up to 4MB, max 10"),
        }}
        onClientUploadComplete={() => {
          toast.success(t("Finish Upload"));
        }}
        onUploadError={() => {
          toast.error(t("Failed Upload"));
        }}
      /> */}
      <section className="flex flex-col h-[300px] justify-center items-center p-12 border-2 border-dashed border-primary/50 rounded mt-4 relative  hover:border mb-3 ">
        {image && <Image src={image} alt="Product Img" fill />}
        <UploadButton
          endpoint="imageUploader"
          content={{
            allowedContent: t("Images up to 4MB, max 10"),
            button: t("Choose Product Image"),
          }}
          onClientUploadComplete={(res) => {
            setImage(res[0].url);

            toast.success(t("Finish Upload"));
          }}
          onUploadError={() => {
            toast.error(t("Failed Upload"));
          }}
        />
      </section>

      <Button className="w-fit " size="lg">
        {t("Create Product")}
      </Button>
      <ErrorMessage>الامور لما تحدث كما متوقع</ErrorMessage>
    </form>
  );
}

export default CreateProductForm;
