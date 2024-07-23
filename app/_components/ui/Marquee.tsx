"use client";

import Image from "next/image";
import { useEffect, useRef, useState, RefObject, useOptimistic } from "react";
import MyLink from "./MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import Button from "./Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { newPrice } from "@/app/_utils/helpers";
import FavButton from "../marketking/FavButton";
import toast from "react-hot-toast";
import Modal from "./Modal";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import LoginFirst from "../marketking/LoginFirst";

type ItemType = {
  id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
};

function Marquee({
  items,
  userId,
}: {
  items: ItemType[];
  userId: string | undefined;
}) {
  // const [optimisticItems, updateOptimisticItems] = useOptimistic(
  //   items,
  //   (prevItems, userAndProductId) => {}
  // );
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef: RefObject<HTMLDivElement> = useRef(null);
  const { t } = useTranslate();
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.error("Login first ");
  }
  if (items.length < 1)
    return (
      <h6 className="text-second-text m-4">{t("No Featured Products")}</h6>
    );
  return (
    <div
      className="w-full overflow-x-auto my-2 text-ltr"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={marqueeRef}
        className={`grid grid-flow-col auto-cols-max gap-2 
          animate-marquee  text-ltr
         `}
        style={{ width: "max-content" }}
      >
        {items.concat(items).map((item, index) => (
          <div
            className={`relative block w-[400px] h-[400px] bg-sec-background duration-300 hover:w-[450px] group hover:scale-95  text-ltr `}
            key={index}
          >
            <Carousel>
              <CarouselContent>
                {item.images.map((image) => (
                  <CarouselItem key={image}>
                    <div className="relative   w-full h-[300px] overflow-hidden ">
                      <Image src={image} fill alt={`${item.name}`} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ms-16" />
              <CarouselNext className="me-16" />
            </Carousel>
            {userId ? (
              <form className="absolute top-3 end-3">
                <FavButton />
              </form>
            ) : (
              <LoginFirst>
                <FavButton className="absolute top-3 end-3" />
              </LoginFirst>
            )}
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
                  ${newPrice(item.price, item.discount)}
                </data>

                <MyLink href={`/product/${item.id}`}>
                  <Button size="md">{t("Buy Now")}</Button>
                </MyLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
