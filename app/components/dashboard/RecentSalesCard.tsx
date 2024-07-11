import { useTranslate } from "@/app/hooks/useTranslate";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function RecentSalesCard() {
  const { t } = useTranslate();
  return (
    <div className="card">
      <h3 className="title mb-2">{t("Recent Sales")}</h3>

      <ul className="flex flex-col gap-8">
        <li className="flex items-center gap-4">
          <Avatar className="max-sm:hidden flex h-9 w-9">
            <AvatarFallback className="w-[40px] h-[40px] rounded-full bg-main-background animate-skeleton"></AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="font-bold">Fares Ahmed</p>
            <p className="text-sm text-second-text">Test@test.com</p>
          </div>
          <p className="ms-auto text-lg font-extrabold">+$1,999.00</p>
        </li>
        <li className="flex items-center gap-4">
          <Avatar className="max-sm:hidden flex h-9 w-9">
            <AvatarFallback className="w-[40px] h-[40px] rounded-full bg-main-background animate-skeleton"></AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="font-bold">Fares Ahmed</p>
            <p className="text-sm text-second-text">Test@test.com</p>
          </div>
          <p className="ms-auto text-lg font-extrabold">+$1,999.00</p>
        </li>
        <li className="flex items-center gap-4">
          <Avatar className="max-sm:hidden flex h-9 w-9">
            <AvatarFallback className="w-[40px] h-[40px] rounded-full bg-main-background animate-skeleton"></AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="font-bold">Fares Ahmed</p>
            <p className="text-sm text-second-text">Test@test.com</p>
          </div>
          <p className="ms-auto text-lg font-extrabold">+$1,999.00</p>
        </li>
      </ul>
    </div>
  );
}

export default RecentSalesCard;
