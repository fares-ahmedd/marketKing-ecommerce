import Header from "@/app/components/header/Header";
import NavLinks from "@/app/components/header/NavLinks";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header>
        <NavLinks isDashboard={true} />
      </Header>
    </main>
  );
}
