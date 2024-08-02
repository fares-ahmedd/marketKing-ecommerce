"use client";

import { useTranslate } from "@/app/_hooks/useTranslate";
import { newPrice } from "@/app/_utils/helpers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import FavButton from "../marketking/FavButton";
import LoginFirst from "../marketking/LoginFirst";
import Button from "./Button";
import MyLink from "./MyLink";
import { toggleFavProduct } from "@/app/_actions/toggleFavProduct";
import toast from "react-hot-toast";

type ItemType = {
  id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
  isFav?: boolean;
};

type User =
  | ({
      favoriteProducts: {
        productId: string;
      }[];
    } & {
      id: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      profileImage: string;
      createdAt: Date;
    })
  | null;

function Marquee({ items, user }: { items: ItemType[]; user: User | null }) {
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

  async function favProduct({
    user,
    productId,
  }: {
    user: User;
    productId: string;
  }) {
    const res = await toggleFavProduct({ user, productId });

    if (res?.success && res?.favProduct) {
      toast.success(t("add fav success", { favProduct: res.favProduct }));
    }
    if (res?.success === false && res?.favProduct) {
      toast.success(t("remove fav success", { favProduct: res.favProduct }));
    }
  }

  if (items.length < 1)
    return (
      <h6 className="text-second-text m-4">{t("No Featured Products")}</h6>
    );
  return (
    <div
      className="w-full overflow-x-auto my-2 text-ltr px-6"
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
        {items?.concat(items)?.map((item, index) => (
          <div
            className={`relative block w-[400px] h-[400px] max-sm:w-[250px] max-sm:h-[250px] bg-sec-background duration-300 hover:w-[450px] max-sm:hover:w-[300px] group hover:scale-95  text-ltr `}
            key={index}
          >
            <Carousel>
              <CarouselContent>
                {item.images.map((image) => (
                  <CarouselItem key={image}>
                    <div className="relative   w-full h-[300px] max-sm:h-[150px] overflow-hidden ">
                      <Image
                        src={image}
                        fill
                        alt={`${item.name}`}
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ms-16" />
              <CarouselNext className="me-16" />
            </Carousel>
            {user ? (
              <form
                className="absolute top-3 end-3"
                action={favProduct.bind(null, {
                  user: user,
                  productId: item.id,
                })}
              >
                <FavButton
                  isFav={user.favoriteProducts.some(
                    (product) => product.productId === item.id
                  )}
                />
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

                <Button size="md" asChild>
                  <MyLink href={`/product/${item.id}`}>{t("Buy Now")}</MyLink>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
