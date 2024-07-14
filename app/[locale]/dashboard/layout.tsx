import User from "@/app/_components/dashboard/User";
import Header from "@/app/_components/header/Header";
import NavLinks from "@/app/_components/header/NavLinks";
import Menu from "@/app/_components/ui/Menu";
import { ADMIN_EMAIL } from "@/app/_utils/helpers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return redirect("/");
  }
  return (
    <main>
      <Header>
        <NavLinks isDashboard={true} />
        <Menu />
        <User user={user} />
      </Header>

      {children}
    </main>
  );
}
