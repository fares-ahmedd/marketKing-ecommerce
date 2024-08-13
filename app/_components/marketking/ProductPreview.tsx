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
import { FaShoppingCart } from "react-icons/fa";
import SubmitButton from "../ui/SubmitButton";
import { useOptimistic, useState } from "react";
import Button from "../ui/Button";
import { createAndUpdateCart } from "@/app/_actions/createAndUpdateCart";

function ProductPreview({
  product,
  user,
}: {
  product: Product;
  user: IUserIncludeFavorites;
}) {
  const { t } = useTranslate();
  const [quantity, setQuantity] = useState(1);
  const initialIsFavorite = user?.favoriteProducts.some(
    (userFav: any) => userFav.productId === product.id
  );

  const [optimisticIsFavorite, setOptimisticIsFavorite] =
    useOptimistic(initialIsFavorite);

  async function favProduct({
    user,
    productId,
  }: {
    user: any;
    productId: string;
  }) {
    // Optimistically update the UI
    setOptimisticIsFavorite(!optimisticIsFavorite);

    const res = await toggleFavProduct({ user, productId });

    if (res?.success && res?.favProduct) {
      toast.success(t("add fav success", { favProduct: res.favProduct }));
    } else if (res?.success === false && res?.favProduct) {
      toast.success(t("remove fav success", { favProduct: res.favProduct }));
    } else {
      // If the server request fails, revert the optimistic update
      setOptimisticIsFavorite(optimisticIsFavorite);
      toast.error(t("error updating favorite"));
    }
  }

  function handleIncrease() {
    setQuantity((q) => q + 1);
  }
  function handleDecrease() {
    setQuantity((q) => (q === 1 ? 1 : q - 1));
  }

  async function addToCart() {
    const isCreated = await createAndUpdateCart({
      userId: user?.id ?? "",
      product,
      quantity,
    });

    setQuantity(1);
    if (isCreated.isExist === "exist") {
      toast.success(t("Item Already Exist", { name: isCreated.name }));
    }
    if (isCreated.isExist === "created") {
      toast.success(
        t("Add New Item", {
          name: isCreated.name,
          quantity: isCreated.quantity,
        })
      );
    }
  }

  return (
    <article>
      <div className="flex-between my-2 gap-1">
        <h2 className="title line-clamp-1 text-ltr" title={product.name}>
          {product.name}
        </h2>
        {user ? (
          <FavButton
            isFav={optimisticIsFavorite}
            onClick={() => {
              favProduct({ user, productId: product.id });
            }}
          />
        ) : (
          <LoginFirst>
            <FavButton />
          </LoginFirst>
        )}
      </div>

      <p className="flex-items-center gap-2 text-primary-color">
        <span className="text-main-text">{t("Price")} : </span>$
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

      <div className="flex-items-center gap-2 my-4 ">
        <span className="text-main-text">{t("Quantity")} : </span>{" "}
        <div className="card flex-items-center text-rtl ">
          <Button
            color="info"
            size="sm"
            className="w-[35px] "
            onClick={handleIncrease}
          >
            <span className="text-xl"> + </span>
          </Button>
          <span className="mx-3">{quantity}</span>
          <Button
            color="info"
            size="sm"
            className="w-[35px] "
            disabled={quantity === 1}
            onClick={handleDecrease}
          >
            <span className="text-xl"> - </span>
          </Button>{" "}
        </div>
      </div>
      {user ? (
        <form action={addToCart}>
          <SubmitButton
            size="md"
            color="primary"
            className="my-3 mx-auto flex-items-center "
          >
            {t("Add To Cart")} <FaShoppingCart />
          </SubmitButton>
        </form>
      ) : (
        <LoginFirst>
          {" "}
          <SubmitButton
            size="md"
            color="primary"
            className="my-3 mx-auto flex-items-center "
          >
            {t("Add To Cart")} <FaShoppingCart />
          </SubmitButton>{" "}
        </LoginFirst>
      )}
    </article>
  );
}

export default ProductPreview;
