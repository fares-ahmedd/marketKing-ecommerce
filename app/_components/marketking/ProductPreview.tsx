"use client";
import { Product } from "@prisma/client";
import FavButton from "./FavButton";
import LoginFirst from "./LoginFirst";
import { IUserIncludeFavorites } from "@/app/_utils/types";
import { toggleFavProduct } from "@/app/_actions/toggleFavProduct";
import toast from "react-hot-toast";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { newPrice, oldPrice } from "@/app/_utils/helpers";
import { FaStar } from "react-icons/fa";
import Button from "../ui/Button";
import { FaShoppingCart } from "react-icons/fa";
import SubmitButton from "../ui/SubmitButton";

function ProductPreview({
  product,
  user,
}: {
  product: Product;
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
    <article>
      <div className="flex-between my-2 gap-1">
        <h2 className="title line-clamp-1 text-ltr" title={product.name}>
          {product.name}
        </h2>
        {user ? (
          <form
            action={favProduct.bind(null, {
              user: user,
              productId: product.id,
            })}
          >
            <FavButton
              isFav={user.favoriteProducts.some(
                (userFav: any) => userFav.productId === product.id
              )}
            />
          </form>
        ) : (
          <LoginFirst>
            <FavButton />
          </LoginFirst>
        )}
      </div>

      <p className="flex-items-center gap-2 text-primary-color">
        <span className="text-main-text">{t("Price")}: </span>$
        {newPrice(product.price, product.discount)}
        {oldPrice(product.price, product.discount) && (
          <>
            <span className="text-sm text-second-text">{t("instead")}</span>
            <del className="text-error">
              (${oldPrice(product.price, product.discount)})
            </del>
          </>
        )}
      </p>

      <ol className="flex-items-center gap-2 my-3">
        {Array.from({ length: 5 }, (_, index) => (
          <li
            key={index}
            className="text-xl text-yellow-500 dark:text-yellow-400  "
          >
            <FaStar />
          </li>
        ))}
      </ol>

      <p className="line-clamp-3 text-second-text text-center">
        {product.description}
      </p>

      <SubmitButton
        size="md"
        color="primary"
        className="my-3 mx-auto flex-items-center "
      >
        {t("Add To Cart")} <FaShoppingCart />
      </SubmitButton>
    </article>
  );
}

export default ProductPreview;
