import User from "@/app/_components/ui/User";
import Header from "@/app/_components/header/Header";
import NavLinks from "@/app/_components/header/NavLinks";
import ChangeLanguage from "@/app/_components/ui/ChangeLanguage";
import Menu from "@/app/_components/ui/Menu";
import { unstable_setRequestLocale } from "next-intl/server";
import { getUser } from "@/app/_utils/getUser";
import { redirect } from "next/navigation";
import { getTranslate } from "@/app/_utils/helpers";
import ToggleTheme from "@/app/_components/ui/ToggleTheme";

export default async function DashBoardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const user = await getUser();
  const { isArabic } = await getTranslate();
  if (user?.email !== "faresahmed00001111@gmail.com") {
    redirect(isArabic ? "/ar" : "/en");
  }
  return (
    <main>
      <Header>
        <div className="flex-center gap-2">
          <Menu isDashboard={true} />
          <NavLinks isDashboard={true} />
        </div>

        <div className="flex-center gap-2">
          <ChangeLanguage isDashboard />
          <ToggleTheme isDashboard />

          <User />
        </div>
      </Header>

      {children}
    </main>
  );
}
