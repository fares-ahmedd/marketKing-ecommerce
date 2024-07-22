import Image from "next/image";
import placeholderBanner from "@/public/placeholder-banner.png";
import { useTranslate } from "@/app/_hooks/useTranslate";

function PlaceholderBanner() {
  const { t } = useTranslate();
  return (
    <section className="min-h-[70vh] w-full relative  rounded-xl">
      <Image
        src={placeholderBanner}
        fill
        alt="Banner Placeholder "
        className="rounded-xl"
      />
      <h3 className="title absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-stone-800 text-center ">
        {t("Placeholder Banner")}
      </h3>
    </section>
  );
}

export default PlaceholderBanner;
