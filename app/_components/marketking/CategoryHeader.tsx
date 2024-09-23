import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";

function CategoryHeader() {
  const { isArabic, t } = useTranslate();
  return (
    <header className="flex-between">
      <h2 className="text-base md:text-2xl">{t("Shop By")}</h2>
      <MyLink
        href="/products/all"
        className="font-bold text-primary-color flex-center-items gap-2 hover:underline   "
      >
        {t("Browse All")}{" "}
        <span className="animate-pulse"> {isArabic ? "←" : "→"}</span>
      </MyLink>
    </header>
  );
}

export default CategoryHeader;
