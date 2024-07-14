import { useTranslate } from "@/app/_hooks/useTranslate";
import { FaCrown } from "react-icons/fa";
import MyLink from "../ui/MyLink";

interface LogoProps {
  isLink?: boolean;
}

function Logo({ isLink = true }: LogoProps) {
  const { t, isArabic } = useTranslate();

  const logoContent = (
    <h1 className="text-xl md:text-2xl tracking-wide relative text-rtl">
      {t("Market")}
      <span
        className={`text-primary-color ${
          isArabic ? "font-normal italic" : "font-bold"
        } `}
      >
        {isArabic && " "}
        {t("King")}
      </span>
      <FaCrown
        className={`absolute text-primary-color -top-3 ${
          isArabic ? "left-[14px]" : "left-[1px]"
        }  text-lg md:text-xl `}
      />
    </h1>
  );

  return isLink ? <MyLink href="/">{logoContent}</MyLink> : logoContent;
}

export default Logo;
