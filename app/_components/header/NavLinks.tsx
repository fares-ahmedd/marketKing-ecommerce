import { dashboardNavLinks, homeNavLinks } from "@/app/_utils/helpers";
import NavLink from "./NavLink";

type Props = {
  isDashboard?: boolean;
};

function NavLinks({ isDashboard = false }: Props) {
  const navLinks = isDashboard ? dashboardNavLinks : homeNavLinks;
  return (
    <nav className="max-md:hidden">
      <ul className={`flex-center ${isDashboard ? "gap-6" : " gap-3"} `}>
        {navLinks.map((link) => (
          <NavLink key={link.label} link={link} />
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
