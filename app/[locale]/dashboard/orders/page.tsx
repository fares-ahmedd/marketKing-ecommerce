import { useTranslate } from "@/app/_hooks/useTranslate";
import prisma from "@/app/_lib/db";
import { formatDate, getTranslate } from "@/app/_utils/helpers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

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

export default async function OrdersPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const orders = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const { t } = await getTranslate();
  return (
    <section className="container-layout my-3">
      <div className="card overflow-auto">
        <h3 className="title mb-2">{t("Orders")}</h3>
        <p className="text-sm text-second-text mb-8">{t("Orders label")}</p>

        {orders && orders.length > 0 ? (
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
            <tbody className="  border-second-text text-second-text rounded-lg ">
              {orders.map((order) => (
                <tr
                  className="grid grid-cols-5 p-2  overflow-hidden hover:bg-main-background items-center border-b"
                  key={order.id}
                >
                  <th className="flex flex-col gap-2 px-1">
                    <span
                      className={"line-clamp-1 text-ltr text-main-text"}
                      title={`${order.User?.firstName} ${order.User?.lastName}`}
                    >
                      {order.User?.firstName} {order.User?.lastName}
                    </span>
                    <span
                      title={order.User?.email}
                      className="text-ltr line-clamp-1 text-sm"
                    >
                      {order.User?.email}
                    </span>
                  </th>
                  <th className="border-custom-x">{t("Order")}</th>
                  <th>{t(order.status)}</th>
                  <th className="border-custom-x px-1">
                    {formatDate(order.createdAt)}
                  </th>
                  <th>
                    ${new Intl.NumberFormat("en-Us").format(order.amount / 100)}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="title text-center my-6 text-second-text">
            {t("not found orders")}
          </h2>
        )}
      </div>
    </section>
  );
}
