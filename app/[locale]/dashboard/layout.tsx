import Header from "@/app/components/header/Header";
import NavLinks from "@/app/components/header/NavLinks";
import Menu from "@/app/components/ui/Menu";
import { getTranslations } from "next-intl/server";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header>
        <NavLinks isDashboard={true} />
        <Menu />
      </Header>

      {children}
    </main>
  );
}
