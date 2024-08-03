import { useTranslate } from "@/app/_hooks/useTranslate";
import Chart from "./Chart";
import { getTranslate } from "@/app/_utils/helpers";
import prisma from "@/app/_lib/db";

async function GraphCard() {
  const now = new Date();
  const sevenDaysAge = new Date();

  sevenDaysAge.setDate(now.getDate() - 7);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAge,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const result = orders.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100,
  }));

  const { t } = await getTranslate();

  return (
    <div className="card xl:col-span-2">
      <h3 className="title mb-2">{t("Transitions")}</h3>
      <p className="text-sm text-second-text">{t("Transitions label")}</p>

      <Chart result={result} />
    </div>
  );
}

export default GraphCard;
