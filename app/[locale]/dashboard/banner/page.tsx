import BannerTable from "@/app/_components/dashboard/BannerTable";
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
    title: `${t("Banner")}`,
  };
}

function BannerPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const { t } = useTranslate();

  return (
    <main className="container-layout my-3">
      <MyLink href="/dashboard/banner/create" className=" block w-fit ms-auto">
        <Button className="flex-items-center gap-2 ms-auto my-3" size="md">
          <span>{t("Add Banner")}</span> <IoMdAddCircleOutline />{" "}
        </Button>
      </MyLink>
      <BannerTable />
    </main>
  );
}

export default BannerPage;
