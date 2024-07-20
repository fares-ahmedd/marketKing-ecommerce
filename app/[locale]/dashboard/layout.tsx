import User from "@/app/_components/dashboard/User";
import Header from "@/app/_components/header/Header";
import NavLinks from "@/app/_components/header/NavLinks";
import ChangeLanguage from "@/app/_components/ui/ChangeLanguage";
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
        <div className="flex-center gap-2">
          <Menu isDashboard={true} />
          <ChangeLanguage isDashboard={true} />
          <NavLinks isDashboard={true} />
        </div>

        <User />
      </Header>

      {children}
    </main>
  );
}
