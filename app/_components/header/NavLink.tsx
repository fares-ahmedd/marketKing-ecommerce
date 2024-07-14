"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { usePathname } from "next/navigation";
import MyLink from "../ui/MyLink";

function NavLink({ link }: { link: { href: string; label: string } }) {
  const pathname = usePathname();
  const { t, lang } = useTranslate();

  const isActive = pathname === `/${lang}${link.href === "/" ? "" : link.href}`;

  return (
    <li
      className={`text-second-text hover:underline font-bold ${
        isActive && "override-main-text text-shadow hover:no-underline"
      }`}
    >
      <MyLink href={`${link.href}`}>{t(link.label)}</MyLink>
    </li>
  );
}

export default NavLink;
