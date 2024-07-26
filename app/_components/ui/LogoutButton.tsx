"use client";

import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTranslate } from "@/app/_hooks/useTranslate";

export default function LogoutButton() {
  const router = useRouter();
  const { t } = useTranslate();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className="cursor-pointer justify-center"
    >
      {t("Logout")}
    </DropdownMenuItem>
  );
}
