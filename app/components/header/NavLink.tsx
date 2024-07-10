"use client";
import { useTranslate } from "@/hooks/useTranslate";
import { usePathname } from "next/navigation";
import MyLink from "../ui/Link";

function NavLink({ link }: { link: { href: string; label: string } }) {
  const pathname = usePathname();
  const { t, lang } = useTranslate();

  const isActive = pathname === `/${lang}${link.href === "/" ? "" : link.href}`;

  return (
    <li
      className={`text-second-text hover:underline font-bold ${
        isActive && "override-main-text text-shadow"
      }`}
    >
      <MyLink href={`${link.href}`}>{t(link.label)}</MyLink>
    </li>
  );
}

export default NavLink;
