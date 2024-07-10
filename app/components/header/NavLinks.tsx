import NavLink from "./NavLink";

const homeNavLinks = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/all-products" },
  { label: "Phones", href: "/phones" },
  { label: "Laptops", href: "/laptops" },
  { label: "Watches", href: "/watches" },
];
const dashboardNavLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Products", href: "/dashboard/products" },
  { label: "Banner Picture", href: "/dashboard/banner-picture" },
];
type Props = {
  isDashboard?: boolean;
};

function NavLinks({ isDashboard = false }: Props) {
  const navLinks = isDashboard ? dashboardNavLinks : homeNavLinks;
  return (
    <nav className="max-sm:hidden">
      <ul className={`flex-center ${isDashboard ? "gap-6" : " gap-3"} `}>
        {navLinks.map((link) => (
          <NavLink key={link.label} link={link} />
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
