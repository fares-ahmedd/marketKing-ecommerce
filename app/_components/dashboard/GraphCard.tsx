import { useTranslate } from "@/app/_hooks/useTranslate";

function GraphCard() {
  const { t } = useTranslate();
  return (
    <div className="card xl:col-span-2">
      <h3 className="title mb-2">{t("Transitions")}</h3>
      <p className="text-sm text-second-text">{t("Transitions label")}</p>
    </div>
  );
}

export default GraphCard;
