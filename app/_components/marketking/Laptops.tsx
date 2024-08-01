import prisma from "@/app/_lib/db";
import ProductList from "./ProductList";
import { getUser } from "@/app/_utils/getUser";

async function Laptops({
  searchParams,
}: {
  searchParams: {
    "sort-price": string;
    "filter-price": string;
  };
}) {
  const sortPrice = searchParams["sort-price"] || "all";
  const filterPrice = searchParams["filter-price"] || "all";
  const laptopsProducts = await prisma.product.findMany({
    where: { category: "laptops" },
    orderBy: { createdAt: "desc" },
  });

  const totalProducts = laptopsProducts?.length;
  const user: any = await getUser();

  return (
    <ProductList
      productArr={laptopsProducts}
      user={user}
      totalProducts={totalProducts}
      sortPrice={sortPrice}
      filterPrice={filterPrice}
    />
  );
}

export default Laptops;
