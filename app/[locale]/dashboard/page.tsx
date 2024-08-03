import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import GraphCard from "@/app/_components/dashboard/GraphCard";
import RecentSalesCard from "@/app/_components/dashboard/RecentSalesCard";
import StatusList from "@/app/_components/dashboard/StatusList";
import prisma from "@/app/_lib/db";

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

function Dashboard({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <section className="container-layout mt-4 mb-2">
      <StatusList />
      <section className="grid gap-4 md:ga-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <GraphCard />
        <RecentSalesCard />
      </section>
    </section>
  );
}

export default Dashboard;
