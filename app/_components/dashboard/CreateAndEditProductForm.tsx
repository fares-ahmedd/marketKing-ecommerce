"use client";
import { createProduct } from "@/app/_actions/createProduct";
import useElementsForm from "@/app/_hooks/useElementsForm";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { UploadButton } from "@/app/_lib/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import ModalImage from "../ui/ModalImage";
import Switch from "../ui/Switch";
import Selectors from "../ui/Selectors";
import SubmitButton from "../ui/SubmitButton";
import { ProductType } from "@/app/_utils/types";
import { editProduct } from "@/app/_actions/editProduct";

function CreateAndEditProductForm({ product }: { product?: ProductType }) {
  const [state, formAction] = useFormState(
    product ? editProduct : createProduct,
    {}
  );

  const [isChecked, setIsChecked] = useState(product?.isFeatured);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const { descriptionEl, productEl, priceEl, statusEl, categoryEl } =
    useElementsForm(state);

  const { t, isArabic } = useTranslate();

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_: any, i) => i !== index));
  };

  return (
    <form className="grid gap-3 grid-cols-1 mb-2" action={formAction}>
      <label htmlFor="name">{t("category")}:</label>
      <Selectors
        chooses={["Phones", "Watches", "Laptops"]}
        categoryEl={categoryEl}
        product={product}
      />
      {state?.category && <ErrorMessage>{t(state.category)}</ErrorMessage>}

      <label htmlFor="name">{t("Name")}:</label>
      <input
        type="text"
        name="product"
        autoFocus
        placeholder={t("New Product placeholder")}
        id="name"
        ref={productEl}
        defaultValue={product?.name}
      />
      {state?.product && <ErrorMessage>{t(state.product)}</ErrorMessage>}
      <label htmlFor="description">{t("Description")}:</label>
      <textarea
        placeholder={t("Description placeholder")}
        id="description"
        rows={6}
        name="description"
        ref={descriptionEl}
        defaultValue={product?.description}
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
        defaultValue={product?.price}
      />
      {state?.price && <ErrorMessage>{t(state.price)}</ErrorMessage>}
      <label>{t("Featured")}:</label>
      <Switch
        checked={isChecked ?? false}
        onChange={(checked: boolean) => setIsChecked(checked)}
        product={product}
      />
      <label>{t("Status")}:</label>
      <select
        defaultValue={product?.status ? product.status : ""}
        className="mb-3"
        name="status"
        ref={statusEl}
      >
        <option value="" disabled className="text-second-text">
          {t("Status label")}
        </option>
        <option value="draft">{t("draft")}</option>
        <option value="published">{t("published")}</option>
        <option value="archived">{t("archived")}</option>
      </select>
      {state?.status && <ErrorMessage>{t(state.status)}</ErrorMessage>}

      {images.length < 1 && (
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
      )}
      {state?.image && <ErrorMessage>{t(state.image)}</ErrorMessage>}
      <input type="hidden" name="images" value={images || ""} />
      <input type="hidden" name="isArabic" value={isArabic ? "yes" : ""} />
      {images.length > 0 && (
        <>
          <h3 className="title">{t("image photo")}</h3>
          <ul className="flex gap-3 flex-wrap">
            {images.map((image, index) => (
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
      <SubmitButton className="w-fit mt-3" size="lg">
        {t("Edit Product")}
      </SubmitButton>
    </form>
  );
}

export default CreateAndEditProductForm;
