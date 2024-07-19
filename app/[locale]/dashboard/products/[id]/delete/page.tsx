import { deleteProduct } from "@/app/_actions/deleteProduct";
import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import SubmitButton from "@/app/_components/ui/SubmitButton";
import prisma from "@/app/_lib/db";
import { getTranslate } from "@/app/_utils/helpers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Delete")}`,
  };
}

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

async function page({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  unstable_setRequestLocale(locale);

  const product = await getProduct(id);

  const { t } = await getTranslate();
  return (
    <main className="container-layout h-[calc(100vh-60px)] flex-center animate-smooth overflow-auto">
      <section className="card w-[70%] mx-auto max-w-[600px] py-6 ">
        <h5 className="title mb-3 flex-center-items">
          {t("delete title")}{" "}
          <span className="text-base text-second-text">({product.name})</span>
        </h5>
        <p className="text-sm text-second-text mb-6">
          {t("delete title desc")}
        </p>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={250}
          height={250}
          priority
          className="rounded-lg mx-auto my-3 max-h-[250px]"
        />
        <div className="flex items-center gap-3 justify-end">
          <MyLink href={`/dashboard/products`}>
            <Button color={"black"} size={"md"}>
              {t("No")}
            </Button>
          </MyLink>
          <form action={deleteProduct}>
            <input type="hidden" name="productId" value={product.id} />
            <SubmitButton color="error" className="w-fit  ps-4" size="md">
              {t("Yes")}
            </SubmitButton>
          </form>
        </div>
      </section>
    </main>
  );
}

export default page;
