"use client";

import { useTranslate } from "@/app/_hooks/useTranslate";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import MyLink from "../ui/MyLink";
import { IoLinkSharp, IoSettings } from "react-icons/io5";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../header/Logo";
import { homeNavLinks } from "@/app/_utils/helpers";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbWorld } from "react-icons/tb";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import Button from "../ui/Button";
import { useTheme } from "next-themes";
import {
  MdDevices,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
function BottomNavigation() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { setTheme, theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const { scrollY } = useScroll();
  const { t, isArabic, lang } = useTranslate();
  const pathname = usePathname();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;
    if (latest > prev && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex-center bg-sec-background pt-4 pb-2 h-[60px] w-full container-layout   fixed start-0 bottom-0 hover-border z-50 md:hidden"
    >
      <ul className="flex-center gap-2 ">
        <li>
          <MyLink
            href={"/"}
            className="flex-items-center gap-1 bg-third-background rounded-full py-2 px-4 duration-300 hover:bg-main-background "
          >
            {" "}
            <span>{t("Home")}</span> <FaHome />
          </MyLink>
        </li>

        <li>
          <Sheet>
            <SheetTrigger className="flex-items-center gap-1 bg-third-background rounded-full py-2 px-4 duration-300 hover:bg-main-background  ">
              <span>{t("Links")}</span> <IoLinkSharp />
            </SheetTrigger>

            <SheetContent side={isArabic ? "right" : "left"}>
              <Logo isLink={false} />
              <nav className="mt-4">
                <ul className="text-lg font-bold flex flex-col gap-4">
                  {homeNavLinks.map((link) => {
                    const isActive =
                      pathname ===
                      `/${lang}${link.href === "/" ? "" : link.href}`;
                    return (
                      <li
                        key={link.label}
                        className={`text-second-text hover:underline font-bold ${
                          isActive &&
                          "override-main-text text-shadow hover:no-underline"
                        }`}
                      >
                        <SheetClose asChild>
                          <Link
                            href={`/${lang}${link.href}`}
                            onClick={handleLinkClick}
                          >
                            {t(link.label)}
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </li>

        <li>
          <Sheet>
            <SheetTrigger className="flex-items-center gap-1 bg-third-background rounded-full py-2 px-4 duration-300 hover:bg-main-background  ">
              <span>{t("Settings")}</span> <IoSettings />
            </SheetTrigger>

            <SheetContent side={isArabic ? "right" : "left"}>
              <section className="p-5">
                <h3 className="title mb-3">{t("Settings")}</h3>

                <div className="flex-between gap-3 mb-3 max-w-[250px]">
                  <h5>{t("Choose Your Language")}: </h5>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        color="info"
                        size="sm"
                        className="flex-items-center gap-2"
                      >
                        {t("Language")} <TbWorld />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      <DropdownMenuLabel
                        className={`${isArabic && "text-rtl"}`}
                      >
                        {t("Choose Your Language")}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={`${isArabic && "text-rtl"} cursor-pointer`}
                      >
                        <LanguageSwitcher />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex-between gap-3 mb-3 max-w-[250px] ">
                  <h5>{t("Select Your Theme")}: </h5>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        color="info"
                        size="sm"
                        className="flex-items-center gap-2"
                      >
                        {t("Select")}
                        {currentTheme === "dark" ? (
                          <MdOutlineDarkMode />
                        ) : (
                          <MdOutlineLightMode />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      <DropdownMenuItem
                        className={`${
                          isArabic && "text-rtl"
                        } cursor-pointer flex-center gap-2 ${
                          theme === "light" ? "bg-accent" : ""
                        }`}
                        onClick={() => setTheme("light")}
                      >
                        {t("Light Mode")} <MdOutlineLightMode />
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className={`${
                          isArabic && "text-rtl"
                        } cursor-pointer flex-center gap-2  ${
                          theme === "dark" ? "bg-accent" : ""
                        }`}
                        onClick={() => setTheme("dark")}
                      >
                        {t("Dark Mode")} <MdOutlineDarkMode />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className={`${
                          isArabic && "text-rtl"
                        } cursor-pointer flex-center gap-2  ${
                          theme === "system" ? "bg-accent" : ""
                        }`}
                        onClick={() => setTheme("system")}
                      >
                        {t("System")} <MdDevices />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </section>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </motion.div>
  );
}

export default BottomNavigation;
