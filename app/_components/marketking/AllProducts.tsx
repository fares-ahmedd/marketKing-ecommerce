import prisma from "@/app/_lib/db";
import ProductList from "./ProductList";
import { getUser } from "@/app/_utils/getUser";

async function AllProducts({
  searchParams,
}: {
  searchParams: {
    "sort-price": string;
    "filter-price": string;
  };
}) {
  const sortPrice = searchParams["sort-price"] || "all";
  const filterPrice = searchParams["filter-price"] || "all";
  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  const totalProducts = await prisma.product.count();
  const user: any = await getUser();

  return (
    <ProductList
      productArr={allProducts}
      user={user}
      totalProducts={totalProducts}
      sortPrice={sortPrice}
      filterPrice={filterPrice}
    />
  );
}

export default AllProducts;
