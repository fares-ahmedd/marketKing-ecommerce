import FeaturedProducts from "@/app/_components/marketking/FeaturedProducts";
import RelatedProducts from "@/app/_components/marketking/RelatedProducts";
import prisma from "@/app/_lib/db";
import { getUser } from "@/app/_utils/getUser";
import { notFound } from "next/navigation";
import ProductInfo from "./ProductInfo";

async function ProductInfoLayout({ id }: { id: string }) {
  const product: any = await prisma.product.findUnique({ where: { id } });
  const user: any = await getUser();

  if (!product) notFound();
  return (
    <>
      <ProductInfo product={product} user={user} />
      <RelatedProducts type={product.category} />
      <FeaturedProducts />
    </>
  );
}

export default ProductInfoLayout;
