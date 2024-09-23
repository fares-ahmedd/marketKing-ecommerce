import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";
import Image from "next/image";
import { CATEGORIES } from "@/app/_utils/consistent";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

function CategoryPreviews() {
  const { t, isArabic } = useTranslate();

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
      {CATEGORIES.map(({ alt, href, span, src, title }) => (
        <MyLink
          href={href}
          key={title}
          className={`group rounded-xl overflow-hidden relative min-h-[300px] ${
            span && span
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            className="duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 duration-300 group-hover:to-transparent transition-all" />
          <div className="absolute bottom-3 start-3 px-4 duration-300 group-hover:bg-black/50 rounded-full  ">
            <h3 className="text-white title">{t(title)}</h3>
            <p className="text-white">{t("Shop Now")}</p>
          </div>

          <button
            className={`absolute bottom-3 end-3 text-3xl duration-300 ${
              isArabic ? "group-hover:rotate-45" : "group-hover:-rotate-45"
            } text-white animate-smooth group-hover:bg-black/50 rounded-full p-2 `}
          >
            {isArabic ? <IoMdArrowRoundBack /> : <IoMdArrowRoundForward />}
          </button>
        </MyLink>
      ))}
    </div>
  );
}

export default CategoryPreviews;
