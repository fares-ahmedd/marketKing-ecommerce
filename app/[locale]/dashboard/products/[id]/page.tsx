import CreateAndEditProductForm from "@/app/_components/dashboard/CreateAndEditProductForm";
import IconButton from "@/app/_components/ui/IconButton";
import MyLink from "@/app/_components/ui/MyLink";
import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
import { notFound } from "next/navigation";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

async function getProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return notFound();
  }
  return product;
}

export default async function EditRoute({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  // console.log(product);

  const { t, isArabic } = await getTranslate();
  return (
    <main className="container-layout my-3 max-w-[1080px]">
      <div className="flex-items-center gap-3">
        <MyLink href="/dashboard/products">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title ">{t("Edit Product")}</h2>
      </div>

      <section className="card mt-6">
        <h3 className="title mb-2">{t("Product Details")}</h3>
        <p className="text-sm text-second-text mb-4">
          {t("Product Edit title")}
        </p>

        <CreateAndEditProductForm product={product} />
      </section>
    </main>
  );
}
