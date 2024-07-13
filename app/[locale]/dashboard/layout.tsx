import User from "@/app/components/dashboard/User";
import Header from "@/app/components/header/Header";
import NavLinks from "@/app/components/header/NavLinks";
import Menu from "@/app/components/ui/Menu";
import { ADMIN_EMAIL } from "@/app/utils/helpers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
