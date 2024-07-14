import StatusItem from "@/app/_components/dashboard/StatusItem";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { AiFillDollarCircle } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import GraphCard from "@/app/_components/dashboard/GraphCard";
import RecentSalesCard from "@/app/_components/dashboard/RecentSalesCard";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: `${t("Dashboard")}`,
  };
}

async function Dashboard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main className="container-layout mt-4 mb-2">
      <ol className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatusItem
          icon={<AiFillDollarCircle />}
          title="Total Revenue"
          label="basedOnChanges"
          statusValue={`$25`}
        />
        <StatusItem
          icon={<FcSalesPerformance />}
          title="Total Sales"
          label="Total Sales label"
          statusValue={`+8`}
        />
        <StatusItem
          icon={<MdProductionQuantityLimits />}
          title="Total Products"
          label="Total Products label"
          statusValue={`5`}
        />
        <StatusItem
          icon={<FaUsers />}
          title="Total Users"
          label="Total Users label"
          statusValue={`+1`}
        />
      </ol>

      <section className="grid gap-4 md:ga-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <GraphCard />
        <RecentSalesCard />
      </section>
    </main>
  );
}

export default Dashboard;
