"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ link }: { link: { href: string; label: string } }) {
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <li
      className={`text-second-text hover:underline ${
        isActive && "override-main-text text-shadow"
      }`}
    >
      <Link href={link.href}>{link.label}</Link>
    </li>
  );
}

export default NavLink;
