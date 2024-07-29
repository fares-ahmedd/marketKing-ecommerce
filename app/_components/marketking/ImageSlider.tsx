"use client";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { useState } from "react";

type Props = {
  images: string[];
};

function ImageSlider({ images }: Props) {
  const [mainIndex, setMainIndex] = useState(0);
  const { isArabic } = useTranslate();

  function handlePrev() {
    setMainIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }
  function handleNext() {
    setMainIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }
  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg w-full h-[400px]">
        <Image
          src={images[mainIndex]}
          alt="Product img"
          fill
          sizes="(max-width: 100%) 100vw, 400px"
          className="rounded-lg  "
        />

        <div className="absolute inset-0 flex-between px-4">
          <button
            className="text-white p-1 rounded-lg border text-2xl bg-black/50"
            onClick={handlePrev}
          >
            {isArabic ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </button>

          <button
            className="text-white p-1 rounded-lg border text-2xl bg-black/50"
            onClick={handleNext}
          >
            {isArabic ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5  gap-4 w-full h-[150px] sm:h-[150px]">
        {images.map((image, index) => (
          <div key={index} className="rounded-lg relative">
            <Image
              src={image}
              alt="Product Img"
              fill
              className={`rounded-lg cursor-pointer ${
                index === mainIndex && "border-2 border-primary-bg-color"
              }`}
              onClick={() => setMainIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
