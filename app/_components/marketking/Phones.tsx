import prisma from "@/app/_lib/db";
import ProductList from "./ProductList";
import { getUser } from "@/app/_utils/getUser";

async function Phones({
  searchParams,
}: {
  searchParams: {
    "sort-price": string;
    "filter-price": string;
  };
}) {
  const sortPrice = searchParams["sort-price"] || "all";
  const filterPrice = searchParams["filter-price"] || "all";
  const phonesProducts = await prisma.product.findMany({
    where: { category: "phones" },
    orderBy: { createdAt: "desc" },
  });

  const totalProducts = phonesProducts?.length;
  const user: any = await getUser();

  return (
    <ProductList
      productArr={phonesProducts}
      user={user}
      totalProducts={totalProducts}
      sortPrice={sortPrice}
      filterPrice={filterPrice}
    />
  );
}

export default Phones;
