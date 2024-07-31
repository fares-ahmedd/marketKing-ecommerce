import prisma from "@/app/_lib/db";
import ProductList from "./ProductList";
import { getUser } from "@/app/_utils/getUser";

async function AllProducts() {
  const initialProducts = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" }, // Adjust ordering as needed
  });

  const totalProducts = await prisma.product.count();
  const user: any = await getUser();
  return (
    <ProductList
      productArr={initialProducts}
      user={user}
      totalProducts={totalProducts}
    />
  );
}

export default AllProducts;
