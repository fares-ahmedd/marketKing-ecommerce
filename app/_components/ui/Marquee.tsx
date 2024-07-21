"use client";

import Image from "next/image";
import { useEffect, useRef, useState, RefObject } from "react";
import MyLink from "./MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import Button from "./Button";

type ItemType = {
  id: string;
  name: string;
  price: number;
  images: string[];
};

function Marquee({ items }: { items: ItemType[] }) {
  const [isPaused, setIsPaused] = useState(false);
  const [active, setActive] = useState(null);
  const marqueeRef: RefObject<HTMLDivElement> = useRef(null);
  const { isArabic, t } = useTranslate();
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    if (isPaused) {
      const computedStyle = window.getComputedStyle(marquee);
      const matrix = new DOMMatrix(computedStyle.transform);
      marquee.style.transform = `translateX(${matrix.m41}px)`;
      marquee.style.animationPlayState = "paused";
    } else {
      const currentTransform = marquee.style.transform;
      const match = currentTransform.match(/translateX\(([-\d.]+)px\)/);
      const currentPosition = match ? parseFloat(match[1]) : 0;

      marquee.style.animation = "none";
      void marquee.offsetHeight;
      marquee.style.animation = "";
      marquee.style.animationDelay = `${
        (currentPosition / marquee.offsetWidth) * 20
      }s`;
      marquee.style.animationPlayState = "running";
    }
  }, [isPaused]);

  return (
    <div
      className="w-full overflow-x-auto my-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={marqueeRef}
        className={`grid grid-flow-col auto-cols-max gap-2 ${
          isArabic ? "animate-marquee-rtl" : "animate-marquee"
        } `}
        style={{ width: "max-content" }}
      >
        {items.concat(items).map((item, index) => (
          <MyLink
            href={`/${item.name}`}
            className={`relative block w-[400px] h-[400px] bg-sec-background duration-300 hover:w-[450px] group hover:scale-95 `}
            key={item.id}
          >
            <div className="relative   w-full h-[300px] overflow-hidden ">
              <Image
                src={item.images[0]}
                fill
                alt={`${item.name}`}
                className="group-hover:scale-110"
              />
            </div>

            <div className=" px-3 h-[100px] flex flex-col justify-evenly">
              <h5
                title={item.name}
                className="font bold text-lg md:text-2xl truncate "
              >
                {item.name}
              </h5>

              <div className="flex-between">
                <data
                  value={`${item.price}`}
                  className="bg-blue-800 text-blue-200 p-3 rounded-full"
                >
                  ${item.price}
                </data>

                <Button size="sm">{t("Buy Now")}</Button>
              </div>
            </div>
          </MyLink>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
