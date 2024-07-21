"use client";
import { Banner } from "@prisma/client";
import { useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslate } from "@/app/_hooks/useTranslate";
import Button from "../ui/Button";
import MyLink from "../ui/MyLink";
const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const bannerNavLinks = ["/phones", "/laptops", "/watches"];

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

function BannerSlider({ banners }: { banners: Banner[] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);
  const { t, isArabic } = useTranslate();

  const title =
    banners[imgIndex].title.charAt(0).toUpperCase() +
    banners[imgIndex].title.slice(1).toLowerCase();
  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === banners.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [banners.length, dragX]);

  useEffect(() => {
    dragX.set(0); // Reset dragX when imgIndex changes
  }, [imgIndex, dragX]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (
      isArabic
        ? x >= -DRAG_BUFFER && imgIndex < banners.length - 1
        : x <= -DRAG_BUFFER && imgIndex < banners.length - 1
    ) {
      setImgIndex((pv) => pv + 1);
    } else if (
      isArabic
        ? x <= DRAG_BUFFER && imgIndex > 0
        : x >= DRAG_BUFFER && imgIndex > 0
    ) {
      setImgIndex((pv) => pv - 1);
    } else {
      dragX.set(0); // Reset dragX if not enough drag
    }
  };

  return (
    <section className="relative overflow-x-hidden">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: isArabic ? `${imgIndex * 100}%` : `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing relative "
      >
        <Images imgIndex={imgIndex} banners={banners} />
      </motion.div>
      <span className="absolute bottom-6 start-2  sm:start-12   title  bg-black/40 text-white rounded-lg p-3">
        {t(title)}
      </span>

      <MyLink href={bannerNavLinks[imgIndex]}>
        <Button size={"lg"} className="absolute bottom-6 end-2 sm:end-12  ">
          {t("Shop Now")}
        </Button>
      </MyLink>
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} banners={banners} />
    </section>
  );
}

export default BannerSlider;

const Images = ({
  imgIndex,
  banners,
}: {
  imgIndex: number;
  banners: Banner[];
}) => {
  return (
    <>
      {banners.map((banner, idx) => {
        return (
          <motion.img
            key={banner.id}
            src={banner.imageString}
            draggable={false}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className=" w-screen h-[80vh] shrink-0 rounded-xl  "
          />
        );
      })}
    </>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
  banners,
}: {
  imgIndex: number;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
  banners: Banner[];
}) => {
  return (
    <div className="flex w-full justify-center gap-2 ">
      {banners.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-primary-bg-color" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};
