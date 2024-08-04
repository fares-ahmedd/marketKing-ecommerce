import Button from "@/app/_components/ui/Button";
import IconButton from "@/app/_components/ui/IconButton";
import MyLink from "@/app/_components/ui/MyLink";
import PrintButton from "@/app/_components/ui/PrintButton";
import prisma from "@/app/_lib/db";
import { getUser } from "@/app/_utils/getUser";
import { getTranslate } from "@/app/_utils/helpers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Customer Order")}`,
  };
}

async function CustomerOrderPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const user = await getUser();

  const customerOrder = await prisma.order.findMany({
    where: { userId: user?.id ?? "" },
  });

  const { isArabic, t } = await getTranslate();
  return (
    <section className="container-layout py-3 min-h-[calc(100vh-122px)]">
      <div className="flex-items-center gap-3 mb-5">
        <MyLink href="/">
          <IconButton>
            {isArabic ? <IoMdArrowRoundForward /> : <IoMdArrowRoundBack />}
          </IconButton>
        </MyLink>
        <h2 className="title">{t("Customer Order")}</h2>
      </div>

      {customerOrder && customerOrder.length > 0 ? (
        <>
          <ul className="space-y-4 mb-3">
            {customerOrder.map((order) => (
              <li
                key={order.id}
                className="border rounded p-2 max-w-[350px] mx-auto"
              >
                <section>
                  <div className="text-center flex-center gap-2 mb-2">
                    <PiCurrencyCircleDollarFill />

                    <h6>
                      {" "}
                      {t("Bill")}#{order.amount}
                    </h6>
                  </div>

                  <span className="text-sm font-light block text-center">
                    {t(order.status)}
                  </span>

                  <div className="grid grid-cols-2 mt-3 justify-center">
                    <div className="text-center">
                      <span>{t("Date")}</span>
                      <p>
                        {Intl.DateTimeFormat(
                          isArabic ? "ar-EG" : "en-US",
                          {}
                        ).format(order.createdAt)}
                      </p>
                    </div>{" "}
                    <div className="text-center">
                      <span>{t("Total Price")}</span>
                      <p>
                        {new Intl.NumberFormat("en-Us").format(
                          order.amount / 100
                        )}
                      </p>
                    </div>
                  </div>

                  <hr className="my-3 opacity-60" />

                  <div className="grid grid-cols-2 mt-3 justify-center">
                    <div className="text-center">
                      <span>{t("Status")}</span>
                      <p>{t(order.status)}</p>
                    </div>{" "}
                    <div className="text-center">
                      <span>{t("Reference")}</span>
                      <p>{order.id.slice(0, 5)}</p>
                    </div>
                  </div>
                </section>
              </li>
            ))}
          </ul>
          <PrintButton />
        </>
      ) : (
        <div className="flex-items-center gap-2">
          <h3 className="title text-second-text">{t("No Orders Found")}</h3>
          <MyLink
            href="/products/all"
            className="font-bold text-primary-color flex-center-items gap-2 hover:underline   "
          >
            {t("Shop Now")}{" "}
            <span className="animate-pulse"> {isArabic ? "←" : "→"}</span>
          </MyLink>
        </div>
      )}
    </section>
  );
}

export default CustomerOrderPage;
