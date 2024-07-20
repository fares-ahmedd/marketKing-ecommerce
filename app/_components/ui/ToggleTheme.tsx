"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton from "./IconButton";
import { useTheme } from "next-themes";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdDevices,
} from "react-icons/md";

function ToggleTheme({ isDashboard = false }: { isDashboard?: boolean }) {
  const { setTheme, theme, systemTheme } = useTheme();

  const { t, isArabic } = useTranslate();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton
          className={`${!isDashboard && "max-md:hidden"} `}
          isClient={true}
        >
          {currentTheme === "dark" ? (
            <MdOutlineDarkMode />
          ) : (
            <MdOutlineLightMode />
          )}
        </IconButton>
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
  );
}

export default ToggleTheme;
