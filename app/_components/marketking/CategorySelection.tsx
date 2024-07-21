import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";
import laptopsPreview from "@/public/laptops-preview.jpg";
import phonesPreview from "@/public/phones-preview.jpg";
import watchesPreview from "@/public/watches-preview.jpg";
import Image from "next/image";
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
          href="/all-products"
          className="group  rounded-xl overflow-hidden  relative min-h-[300px] sm:col-span-2 sm:row-span-2"
        >
          <Image
            src={phonesPreview}
            alt="Phones Products"
            fill
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 duration-300 group-hover:to-transparent transition-all" />
          <div className="p-6 flex items-end">
            <div>
              <h3 className="text-white title">{t("Phones")}</h3>
              <p>{t("Shop Now")}</p>
            </div>
          </div>
        </MyLink>

        <MyLink
          href="/all-products"
          className="group  rounded-xl overflow-hidden relative min-h-[300px] "
        >
          <Image
            src={phonesPreview}
            alt="Phones Products"
            fill
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55  duration-300 group-hover:to-transparent transition-all" />
          <div className="p-6 flex items-end">
            <div>
              <h3 className="text-white title">{t("Phones")}</h3>
              <p>{t("Shop Now")}</p>
            </div>
          </div>
        </MyLink>
        <MyLink
          href="/all-products"
          className="group  rounded-xl overflow-hidden relative min-h-[300px] "
        >
          <Image
            src={phonesPreview}
            alt="Phones Products"
            fill
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55  duration-300 group-hover:to-transparent transition-all" />
          <div className="p-6 flex items-end">
            <div>
              <h3 className="text-white title">{t("Phones")}</h3>
              <p>{t("Shop Now")}</p>
            </div>
          </div>
        </MyLink>
      </div>
    </section>
  );
}

export default CategorySelection;
