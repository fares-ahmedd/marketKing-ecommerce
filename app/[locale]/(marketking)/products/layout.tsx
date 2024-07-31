import Filter from "@/app/_components/ui/Filter";
import { unstable_setRequestLocale } from "next-intl/server";
function layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <section className="container-layout py-3 min-h-[calc(100vh-122px)] flex gap-2">
      <Filter />

      {children}
    </section>
  );
}

export default layout;
