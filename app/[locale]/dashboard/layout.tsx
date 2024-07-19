import User from "@/app/_components/dashboard/User";
import Header from "@/app/_components/header/Header";
import NavLinks from "@/app/_components/header/NavLinks";
import Menu from "@/app/_components/ui/Menu";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function DashBoardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Header>
        <NavLinks isDashboard={true} />
        <Menu />
        <User />
      </Header>

      {children}
    </main>
  );
}
