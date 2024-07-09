import { useTranslate } from "@/hooks/useTranslate";

export default function Home() {
  const { t } = useTranslate();
  return <main>{t("Hello Next")}</main>;
}
