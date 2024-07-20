"use client";

import { useTranslate } from "@/app/_hooks/useTranslate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, isArabic } = useTranslate();
  const changeLocale = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    const newPathname = segments.join("/");
    const queryString = searchParams.toString();
    const url = queryString ? `${newPathname}?${queryString}` : newPathname;
    router.push(url);
  };

  return (
    <>
      {isArabic ? (
        <button
          onClick={() => changeLocale("en")}
          className="block w-full text-start"
        >
          {t("English")}
        </button>
      ) : (
        <button
          onClick={() => changeLocale("ar")}
          className="block w-full text-start"
        >
          {t("Arabic")}
        </button>
      )}
    </>
  );
}
