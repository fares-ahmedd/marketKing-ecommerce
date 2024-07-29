import { IUserIncludeFavorites } from "@/app/_utils/types";
import { Product } from "@prisma/client";
import ImageSlider from "./ImageSlider";
import ProductPreview from "./ProductPreview";

function ProductInfo({
  product,
  user,
}: {
  product: Product;
  user: IUserIncludeFavorites;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 mb-3">
      <ImageSlider images={product.images} />

      <ProductPreview product={product} user={user} />
    </div>
  );
}

export default ProductInfo;
