"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import IconButton from "./IconButton";
import Logo from "../header/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { dashboardNavLinks, homeNavLinks } from "@/app/_utils/helpers";

function Menu({ isDashboard = false }: { isDashboard?: boolean }) {
  const { isArabic, t, lang } = useTranslate();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = isDashboard ? dashboardNavLinks : homeNavLinks;

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton className="block md:hidden ">
          <FaBars className="h-5 w-5" />
        </IconButton>
      </SheetTrigger>
      <SheetContent side={isArabic ? "right" : "left"}>
        <Logo isLink={false} />
        <nav className="mt-4">
          <ul className="text-lg font-bold flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive =
                pathname === `/${lang}${link.href === "/" ? "" : link.href}`;
              return (
                <li
                  key={link.label}
                  className={`text-second-text hover:underline font-bold ${
                    isActive &&
                    "override-main-text text-shadow hover:no-underline"
                  }`}
                >
                  <Link href={`/${lang}${link.href}`} onClick={handleLinkClick}>
                    {t(link.label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default Menu;
