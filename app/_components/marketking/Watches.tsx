import prisma from "@/app/_lib/db";
import ProductList from "./ProductList";
import { getUser } from "@/app/_utils/getUser";

async function Watches({
  searchParams,
}: {
  searchParams: {
    "sort-price": string;
    "filter-price": string;
  };
}) {
  const sortPrice = searchParams["sort-price"] || "all";
  const filterPrice = searchParams["filter-price"] || "all";
  const watchesProducts = await prisma.product.findMany({
    where: { category: "watches" },
    orderBy: { createdAt: "desc" },
  });

  const totalProducts = watchesProducts?.length;
  const user: any = await getUser();

  return (
    <ProductList
      productArr={watchesProducts}
      user={user}
      totalProducts={totalProducts}
      sortPrice={sortPrice}
      filterPrice={filterPrice}
      category="watches"
    />
  );
}

export default Watches;
