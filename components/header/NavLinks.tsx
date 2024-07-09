import NavLink from "./NavLink";

const navLinksArray = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/all-products" },
  { label: "Phones", href: "/phones" },
  { label: "Laptops", href: "/laptops" },
  { label: "Watches", href: "/watches" },
];

function NavLinks() {
  return (
    <nav>
      <ul className="flex-center gap-3">
        {navLinksArray.map((link) => (
          <NavLink key={link.label} link={link} />
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
