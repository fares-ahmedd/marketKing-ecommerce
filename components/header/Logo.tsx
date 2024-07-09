import { useTranslate } from "@/hooks/useTranslate";
import { FaCrown } from "react-icons/fa";

function Logo() {
  const { t, isArabic } = useTranslate();

  return (
    <h1 className="text-xl md:text-2xl tracking-wide relative text-rtl ">
      {t("Market")}
      <span className="text-primary-text font-bold">
        {isArabic && " "}
        {t("King")}
      </span>
      <FaCrown
        className={`absolute text-primary-text -top-3 ${
          isArabic ? "left-[14px]" : "left-[1px]"
        }  text-lg md:text-xl `}
      />
    </h1>
  );
}

export default Logo;
