import { useTranslate } from "@/app/hooks/useTranslate";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import IconButton from "./IconButton";
import NavLink from "../header/NavLink";
import Logo from "../header/Logo";
const dashboardNavLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Products", href: "/dashboard/products" },
  { label: "Banner Picture", href: "/dashboard/banner-picture" },
];

function Menu() {
  const { isArabic } = useTranslate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton className="sm:hidden">
          <FaBars className="h-5 w-5" />
        </IconButton>
      </SheetTrigger>
      <SheetContent side={isArabic ? "right" : "left"}>
        <Logo isLink={false} />
        <nav className="mt-4">
          <ul className="text-lg font-bold space-y-6">
            {dashboardNavLinks.map((link) => (
              <NavLink link={link} key={link.label} />
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default Menu;
