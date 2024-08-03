import OrderTable from "@/app/_components/dashboard/OrderTable";
import Button from "@/app/_components/ui/Button";
import MyLink from "@/app/_components/ui/MyLink";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { IoMdAddCircleOutline } from "react-icons/io";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Products")}`,
  };
}

function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const { t } = useTranslate();
  return (
    <section className="container-layout my-3">
      <Button
        className="flex-items-center gap-2 ms-auto mt-3"
        size="md"
        asChild
      >
        <MyLink
          href="/dashboard/products/create"
          className=" block w-fit ms-auto"
        >
          <span>{t("Add Products")}</span> <IoMdAddCircleOutline />{" "}
        </MyLink>
      </Button>
      <section className="mt-3 card overflow-auto max-sm:text-sm">
        <h3 className="title mb-2">{t("Products")}</h3>
        <p className="text-sm text-second-text mb-4">{t("Products title")}</p>
        <OrderTable />
      </section>
    </section>
  );
}

export default ProductsPage;
