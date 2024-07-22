import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";
import laptopsPreview from "@/public/laptops-preview.jpg";
import phonesPreview from "@/public/phones-preview.jpg";
import watchesPreview from "@/public/watches-prview.webp";
import Image from "next/image";
import IconButton from "../ui/IconButton";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
function CategorySelection() {
  const { t, isArabic } = useTranslate();
  return (
    <section className="py-24 sm:py-32">
      <div className="flex-between">
        <h2 className="text-base md:text-2xl">{t("Shop By")}</h2>
        <MyLink
          href="/all-products"
          className="font-bold text-primary-color flex-center-items gap-2 hover:underline   "
        >
          {t("Browse All")}{" "}
          <span className="animate-pulse"> {isArabic ? "←" : "→"}</span>
        </MyLink>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <MyLink
          href="/phones"
          className="group  rounded-xl overflow-hidden  relative min-h-[300px] row-span-full"
        >
          <Image
            src={phonesPreview}
            alt="Phones Products"
            fill
            placeholder="blur"
            className="duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 duration-300 group-hover:to-transparent transition-all" />
          <div className="absolute bottom-3 start-3 px-4 duration-300 group-hover:bg-black/50 rounded-full  ">
            <h3 className="text-white title">{t("Phones")}</h3>
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

        <MyLink
          href="/watches"
          className="group  rounded-xl overflow-hidden  relative min-h-[300px]"
        >
          <Image
            src={watchesPreview}
            alt="watches Products"
            fill
            placeholder="blur"
            className="duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 duration-300 group-hover:to-transparent transition-all" />
          <div className="absolute bottom-3 start-3 px-4 duration-300 group-hover:bg-black/50 rounded-full  ">
            <h3 className="text-white title">{t("Watches")}</h3>
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
        <MyLink
          href="/laptops"
          className="group  rounded-xl overflow-hidden  relative min-h-[300px]"
        >
          <Image
            src={laptopsPreview}
            alt="laptops Products"
            fill
            placeholder="blur"
            className="duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 duration-300 group-hover:to-transparent transition-all" />
          <div className="absolute bottom-3 start-3 px-4 duration-300 group-hover:bg-black/50 rounded-full  ">
            <h3 className="text-white title">{t("Laptops")}</h3>
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
      </div>
    </section>
  );
}

export default CategorySelection;
