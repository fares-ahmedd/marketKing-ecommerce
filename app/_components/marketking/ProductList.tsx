"use client";
import { toggleFavProduct } from "@/app/_actions/toggleFavProduct";
import React from "react";
import toast from "react-hot-toast";
import FavButton from "./FavButton";
import { newPrice, oldPrice } from "@/app/_utils/helpers";
import Button from "../ui/Button";
import MyLink from "../ui/MyLink";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslate } from "@/app/_hooks/useTranslate";
import Image from "next/image";
import { IUserIncludeFavorites } from "@/app/_utils/types";
function ProductList({
  productArr,
  user,
}: {
  productArr: any;
  user: IUserIncludeFavorites;
}) {
  const { t } = useTranslate();

  async function favProduct({
    user,
    productId,
  }: {
    user: any;
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

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 flex-wrap mt-6">
      {productArr.map((product: any) => (
        <li key={product.id}>
          <div className="card  relative  w-full ">
            <Carousel dir="ltr">
              <CarouselContent>
                {product?.images?.map((image: any) => (
                  <CarouselItem key={image}>
                    <div className="relative   w-full h-[300px]   ">
                      <Image
                        src={image}
                        fill
                        alt="Product preview"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ms-16" />
              <CarouselNext className="me-16" />
            </Carousel>
            <form
              className="absolute top-3 right-3"
              action={favProduct.bind(null, {
                user: user,
                productId: product.id,
              })}
            >
              <FavButton
                isFav={user?.favoriteProducts.some(
                  (fav: any) => fav.productId === product.id
                )}
              />
            </form>
            <h5
              className="text-lg line-clamp-1 my-2  text-ltr text-center"
              title={product.name}
            >
              {product.name}
            </h5>

            <p
              className="text-start text-ltr text-second-text line-clamp-2"
              title={product.description}
            >
              {product.description}
            </p>

            <div className="flex-between text-ltr my-2 border-b pb-3">
              <div className="flex-items-center  gap-2 text-primary-color font-bold">
                ${newPrice(product.price, product.discount)}
                {oldPrice(product.price, product.discount) && (
                  <del className="text-error">
                    (${oldPrice(product.price, product.discount)})
                  </del>
                )}
              </div>

              <div className="flex-items-center  gap-2">
                {product.isFeatured && (
                  <strong className="text-indigo-50 bg-indigo-700 px-2 py-1 rounded-full text-sm font-medium">
                    {t("Featured")}
                  </strong>
                )}
                {product.discount > 0 && (
                  <strong className="text-red-50 bg-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                    {t("discount label")}
                  </strong>
                )}
              </div>
            </div>

            <MyLink href={`/product/${product.id}`}>
              <Button size="md" className="w-full">
                {t("Buy Now")}
              </Button>
            </MyLink>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;