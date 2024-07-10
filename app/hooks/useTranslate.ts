import { useLocale, useTranslations } from "next-intl";

export function useTranslate() {
  const t = useTranslations("Index");
  const locale = useLocale();

  const isArabic = locale === "ar";
  return { t: (value: string) => t(value), isArabic, lang: locale };
}
