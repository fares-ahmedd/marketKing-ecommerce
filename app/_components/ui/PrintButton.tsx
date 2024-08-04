"use client";
import { useTranslate } from "@/app/_hooks/useTranslate";
import Button from "./Button";

function PrintButton() {
  const { t } = useTranslate();

  const handlePrint = () => {
    window.print();
  };
  return (
    <div>
      <Button color="info" size="md" className="m-auto" onClick={handlePrint}>
        {t("Print")}
      </Button>
    </div>
  );
}

export default PrintButton;
