import { useTranslate } from "@/app/hooks/useTranslate";

export default function OrdersPage() {
  const { t } = useTranslate();
  return (
    <main className="container-layout my-3">
      <div className="card">
        <h3 className="title mb-2">{t("Orders")}</h3>
        <p className="text-sm text-second-text mb-8">{t("Orders label")}</p>

        <table className="border border-main-text rounded-lg overflow-x-auto w-full max-w-[1080px] mx-auto">
          <thead className=" border-b border-second-text">
            <tr className="flex-between p-2">
              <th className="th-with-border">Customer</th>
              <th className="th-with-border">Type</th>
              <th className="th-with-border">Status</th>
              <th className="th-with-border">Date</th>
              <th className="th-with-border">Amount</th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  );
}
