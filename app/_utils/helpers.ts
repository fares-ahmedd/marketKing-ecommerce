import { getLocale, getTranslations } from "next-intl/server";

export const ADMIN_EMAIL = "faresahmed00001111@gmail.com";

export async function getTranslate() {
  const t = await getTranslations("Index");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return { t, isArabic };
}

export async function formatDate(date: Date) {
  const { isArabic } = await getTranslate();
  return new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}
