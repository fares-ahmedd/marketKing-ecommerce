"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { IUserIncludeFavorites } from "@/app/_utils/types";
import ProductList from "./ProductList";
function FavoriteProductsList({ user }: { user: IUserIncludeFavorites }) {
  const favoriteProducts: any = user?.favoriteProducts.map((fav: any) => ({
    ...fav.product,
  }));

  const { t } = useTranslate();
  return (
    <>
      {favoriteProducts[0]?.id ? (
        <ProductList productArr={favoriteProducts} user={user} />
      ) : (
        <h3 className="text-second-text font-bold  m-3">
          {t("no favorite products")}
        </h3>
      )}
    </>
  );
}

export default FavoriteProductsList;
