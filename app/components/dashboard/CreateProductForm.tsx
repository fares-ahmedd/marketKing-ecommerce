"use client";
import { useTranslate } from "@/app/hooks/useTranslate";
import Switch from "../ui/Switch";
import { useState } from "react";

function CreateProductForm() {
  const [isChecked, setIsChecked] = useState(false);

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
      <select defaultValue={""}>
        <option value="" disabled className="text-second-text">
          {t("Status label")}
        </option>
        <option value="draft">{t("Draft")}</option>
        <option value="published">{t("Published")}</option>
        <option value="archived">{t("Archived")}</option>
      </select>
    </form>
  );
}

export default CreateProductForm;
