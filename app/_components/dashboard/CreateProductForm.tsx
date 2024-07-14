"use client";
import { createProduct } from "@/app/_actions/createProduct";
import useElementsForm from "@/app/_hooks/useElementsForm";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { UploadButton } from "@/app/_lib/uploadthing";
import { useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import Switch from "../ui/Switch";
import Image from "next/image";
import ModalImage from "../ui/ModalImage";
import { IoIosCloseCircle } from "react-icons/io";
import IconButton from "../ui/IconButton";

function CreateProductForm() {
  const [state, formAction] = useFormState(createProduct, {});

  const [isChecked, setIsChecked] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const { descriptionEl, productEl, priceEl, statusEl } =
    useElementsForm(state);

  const { t } = useTranslate();

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_: any, i) => i !== index));
  };
  return (
    <form className="grid gap-3 grid-cols-1 mb-2" action={formAction}>
      <label htmlFor="name">{t("Name")}:</label>
      <input
        type="text"
        name="product"
        autoFocus
        placeholder={t("New Product placeholder")}
        id="name"
        ref={productEl}
      />
      {state?.product && <ErrorMessage>{t(state.product)}</ErrorMessage>}
      <label htmlFor="description">{t("Description")}:</label>
      <textarea
        placeholder={t("Description placeholder")}
        id="description"
        rows={6}
        name="description"
        ref={descriptionEl}
      />
      {state?.description && (
        <ErrorMessage>{t(state.description)}</ErrorMessage>
      )}
      <label htmlFor="price">{t("Price")}:</label>
      <input
        type="number"
        placeholder={t("Price placeholder")}
        id="price"
        name="price"
        ref={priceEl}
      />
      {state?.price && <ErrorMessage>{t(state.price)}</ErrorMessage>}
      <label>{t("Featured")}:</label>
      <Switch
        checked={isChecked}
        onChange={(checked: boolean) => setIsChecked(checked)}
      />
      <label>{t("Status")}:</label>
      <select defaultValue={""} className="mb-3" name="status" ref={statusEl}>
        <option value="" disabled className="text-second-text">
          {t("Status label")}
        </option>
        <option value="draft">{t("Draft")}</option>
        <option value="published">{t("Published")}</option>
        <option value="archived">{t("Archived")}</option>
      </select>
      {state?.status && <ErrorMessage>{t(state.status)}</ErrorMessage>}

      <section className="flex flex-col h-[300px] justify-center items-center p-12 border-2 border-dashed border-primary/50 rounded mt-4 relative  hover:border mb-3 ">
        <UploadButton
          endpoint="imageUploader"
          content={{
            allowedContent: t("Images up to 4MB, max 10"),
            button: t("Choose Product Image"),
          }}
          onClientUploadComplete={(res) => {
            setImages((prevImages) => [
              ...prevImages,
              ...res.map((r) => r.url),
            ]);
            toast.success(t("Finish Upload"));
          }}
          onUploadError={() => {
            toast.error(t("Failed Upload"));
          }}
        />
      </section>
      {state?.image && <ErrorMessage>{t(state.image)}</ErrorMessage>}
      <input type="hidden" name="image" value={images || ""} />
      {images.length > 0 && (
        <>
          <h3 className="title">{t("image photo")}</h3>
          <ul className="grid-layout">
            {images.map((image, index) => (
              <ModalImage
                image={
                  <li>
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
                      className="rounded-lg"
                    />
                  </li>
                }
                className="relative h-[300px]  rounded-lg "
                modalId={`${index}`}
                key={index}
              />
            ))}
          </ul>
        </>
      )}
      {/* <Button className="w-fit " size="lg" disabled={!image}> */}
      <Button className="w-fit mt-3" size="lg">
        {t("Create Product")}
      </Button>
    </form>
  );
}

export default CreateProductForm;
