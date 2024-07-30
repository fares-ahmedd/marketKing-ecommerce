import ProductList from "./ProductList";
import { getUser } from "@/app/_utils/getUser";
import { getTranslate } from "@/app/_utils/helpers";
import { redirect } from "next/navigation";
async function FavoriteProductsList() {
  const user: any = await getUser();
  const { isArabic, t } = await getTranslate();
  if (!user) redirect(isArabic ? "/ar" : "/en");

  const favoriteProducts: any = user?.favoriteProducts.map((fav: any) => ({
    ...fav.product,
  }));

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
