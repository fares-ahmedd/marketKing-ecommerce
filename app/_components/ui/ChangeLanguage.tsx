import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useTranslate } from "@/app/_hooks/useTranslate";
import { TbWorld } from "react-icons/tb";
import IconButton from "./IconButton";
function ChangeLanguage({ isDashboard = false }: { isDashboard?: boolean }) {
  const { t, isArabic } = useTranslate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton className={`${!isDashboard && "max-md:hidden"} `}>
          <TbWorld />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel className={`${isArabic && "text-rtl"}`}>
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
  );
}

export default ChangeLanguage;
