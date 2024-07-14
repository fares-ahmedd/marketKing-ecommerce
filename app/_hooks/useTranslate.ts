import { useLocale, useTranslations } from "next-intl";

export function useTranslate() {
  const t = useTranslations("Index");
  const locale = useLocale();

  const isArabic = locale === "ar";
  return {
    t: (value: string, params?: Record<string, any>) => t(value, params),
    isArabic,
    lang: locale,
  };
}
