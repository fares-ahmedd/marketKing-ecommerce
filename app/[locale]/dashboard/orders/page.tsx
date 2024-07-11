import { useTranslate } from "@/app/hooks/useTranslate";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Orders")}`,
  };
}

export default function OrdersPage() {
  const { t } = useTranslate();
  return (
    <main className="container-layout my-3">
      <div className="card overflow-auto">
        <h3 className="title mb-2">{t("Orders")}</h3>
        <p className="text-sm text-second-text mb-8">{t("Orders label")}</p>

        <table className="border border-main-text rounded-lg  w-full  max-w-[1080px] mx-auto max-sm:w-[450px] overflow-x-auto">
          <thead className=" border-b border-second-text bg-third-background rounded-lg">
            <tr className="grid grid-cols-5 p-2  overflow-hidden">
              <th>{t("Customer")}</th>
              <th className="border-custom-x">{t("Type")}</th>
              <th>{t("Status")}</th>
              <th className="border-custom-x">{t("Date")}</th>
              <th>{t("Amount")}</th>
            </tr>
          </thead>
          <tbody className=" border-b border-second-text text-second-text rounded-lg ">
            <tr className="grid grid-cols-5 p-2  overflow-hidden hover:bg-main-background items-center">
              <th className="flex flex-col gap-2">
                <span>Fares Ahmed</span>
                <span>fares@gmail.com</span>
              </th>
              <th className="border-custom-x">{t("Sale")}</th>
              <th>{t("Success")}</th>
              <th className="border-custom-x">2024/7/30</th>
              <th>$250.00</th>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
