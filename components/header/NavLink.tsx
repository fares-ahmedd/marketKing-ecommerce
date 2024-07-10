"use client";
import { useTranslate } from "@/hooks/useTranslate";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <Link href={`/${lang}${link.href}`}>{t(link.label)}</Link>
    </li>
  );
}

export default NavLink;
