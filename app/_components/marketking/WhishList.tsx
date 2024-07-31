import React from "react";
import IconButton from "../ui/IconButton";
import { FaHeart } from "react-icons/fa";
import { IUserIncludeFavorites } from "@/app/_utils/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslate } from "@/app/_hooks/useTranslate";
import MyLink from "../ui/MyLink";
import Image from "next/image";
import Button from "../ui/Button";
import { newPrice, oldPrice } from "@/app/_utils/helpers";

import { FaHeartBroken } from "react-icons/fa";

async function WhishList({ user }: { user: IUserIncludeFavorites }) {
  const whishCount = user?.favoriteProducts.length || 0;
  const { t, isArabic } = useTranslate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton className="relative ">
          <FaHeart />
          {whishCount > 0 && (
            <span className="bg-error text-white absolute -top-3 -start-1 text-sm px-1 rounded-lg">
              {whishCount}
            </span>
          )}
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="max-w-[320px] max-h-[400px] overflow-y-auto m-1"
      >
        <DropdownMenuLabel className={`${isArabic && "text-rtl"}`}>
          {t("WhishList")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user?.favoriteProducts?.length ? (
          <>
            <ul className="grid grid-cols-1 gap-2 mb-2">
              {user.favoriteProducts.map((fav) => (
                <li className="last:border-b" key={fav.product.id}>
                  <DropdownMenuItem
                    className={`${
                      isArabic && "text-rtl"
                    } cursor-pointer hover:bg-sec-background`}
                    asChild
                  >
                    <MyLink
                      href={`/product/${fav.product.id}`}
                      className="flex-between gap-1  w-full"
                    >
                      <div className="h-[80px] w-[80px] rounded-md relative">
                        <Image
                          src={fav.product.images[0]}
                          alt={fav.product.name}
                          fill
                          sizes="(max-width: 80px) 100vw, 80px"
                        />
                      </div>
                      <h3
                        className="max-w-[100px] text-sm line-clamp-3"
                        title={fav.product.name}
                      >
                        {fav.product.name}
                      </h3>
                      <span className="flex flex-col-reverse gap-1 justify-between items-center">
                        ${newPrice(fav.product.price, fav.product.discount)}
                        {oldPrice(fav.product.price, fav.product.discount) && (
                          <del className="text-error">
                            ($
                            {oldPrice(fav.product.price, fav.product.discount)})
                          </del>
                        )}
                        {fav.product.isFeatured && (
                          <strong className="text-indigo-50 bg-indigo-700 px-2 py-1 rounded-full text-sm font-medium">
                            {t("Featured")}
                          </strong>
                        )}
                      </span>
                    </MyLink>
                  </DropdownMenuItem>
                </li>
              ))}
            </ul>
            <DropdownMenuItem
              asChild
              className="bg-transparent hover:bg-transparent"
            >
              <MyLink href="/favorite-products">
                <Button size="lg" className="w-full ">
                  {t("Go To Favorite Page")}
                </Button>
              </MyLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <FaHeartBroken className=" text-7xl m-auto text-error mb-2" />
            <h2>{t("no favorite")}</h2>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WhishList;
