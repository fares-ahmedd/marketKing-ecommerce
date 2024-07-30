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
    <section className="container-layout flex-1 grid grid-cols-1 sm:grid-cols-2">
      test
    </section>
  );
}

export default layout;
