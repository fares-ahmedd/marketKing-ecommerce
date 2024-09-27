"use client";

import { useTranslate } from "@/app/_hooks/useTranslate";
import { newPrice } from "@/app/_utils/helpers";

import FavButton from "../marketking/FavButton";
import LoginFirst from "../marketking/LoginFirst";
import Button from "./Button";
import MyLink from "./MyLink";
import { toggleFavProduct } from "@/app/_actions/toggleFavProduct";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import ImagesSlider from "./ImagesSlider";

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

function MarqueeProducts({
  items,
  user,
}: {
  items: ItemType[];
  user: User | null;
}) {
  const { t } = useTranslate();

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
    <Marquee
      pauseOnHover
      className="grid grid-flow-col auto-cols-max  text-ltr my-2"
    >
      {items?.concat(items)?.map((item, index) => (
        <div
          className="relative  w-[400px] h-[400px] max-sm:w-[250px] max-sm:h-[250px] bg-sec-background duration-300 group text-ltr mx-1 rounded-md "
          key={index}
        >
          <ImagesSlider item={item} />
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
          <div className=" px-3 h-[100px] flex flex-col justify-evenly duration-300 group-hover:bg-main-background">
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
                <MyLink href={`/product/${item.id}`}>{t("Details")}</MyLink>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </Marquee>
  );
}

export default MarqueeProducts;
